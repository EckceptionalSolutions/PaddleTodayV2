import { describe, expect, it } from 'vitest';
import { SavedRoutesRepository, type SavedRoutesTransport } from './saved-routes-repository';
import { AccountSyncStorage } from './account-sync-storage';
import type { JsonStorage } from './blob-storage';
import type { SyncedRoute } from '@paddletoday/api-contract';
function localStorageFixture() {
  const values = new Map<string, string>();
  return { get length() { return values.size; }, key: (i: number) => [...values.keys()][i] || null,
    getItem: (k: string) => values.get(k) ?? null, setItem: (k: string, v: string) => { values.set(k, v); },
    removeItem: (k: string) => { values.delete(k); }, clear: () => values.clear() } satisfies Storage;
}
function serverFixture() {
  const values = new Map<string, unknown>(); let revision = 0;
  const storage: JsonStorage = { kind: 'local', deleteJson: async k => { values.delete(k); }, listJsonNames: async () => [...values.keys()],
    readJson: async <T>(k: string) => structuredClone(values.get(k) ?? null) as T | null,
    readJsonWithEtag: async <T>(k: string) => ({ value: structuredClone(values.get(k) ?? null) as T | null, etag: values.has(k) ? String(revision) : null }),
    writeJson: async (k, value) => { values.set(k, structuredClone(value)); revision++; } };
  const server = new AccountSyncStorage(storage);
  const transport = (uid = 'alice'): SavedRoutesTransport => ({ get: async () => (await server.sync(uid, 1, [])).snapshot, apply: async op => server.sync(uid, op.epoch, [op]) });
  return { server, transport };
}
const route: SyncedRoute = { slug: 'river', name: 'River', reach: 'Upper to lower', savedAt: '2026-09-29T10:00:00Z', notes: 'Original' };
describe('web saved routes using the mobile account protocol', () => {
  it('syncs additions, notes, and deletions in both directions without touching mobile drafts', async () => {
    const { transport, server } = serverFixture();
    const web = new SavedRoutesRepository('alice', localStorageFixture(), transport());
    const phone = new SavedRoutesRepository('alice', localStorageFixture(), transport());
    await web.sync(); web.set(route.slug, route); await web.sync(); await phone.sync();
    expect(phone.routes()).toEqual([route]);
    phone.set(route.slug, { ...route, notes: 'From phone' }); await phone.sync(); await web.sync();
    expect(web.routes()[0].notes).toBe('From phone');
    web.set(route.slug, null); await web.sync(); await phone.sync(); expect(phone.routes()).toEqual([]);
    expect((await server.sync('alice', 1, [])).snapshot.entityRevisions.routes.river).toBeGreaterThan(0);
  });
  it('keeps simultaneous notes for explicit resolution', async () => {
    const { transport } = serverFixture();
    const web = new SavedRoutesRepository('alice', localStorageFixture(), transport());
    const phone = new SavedRoutesRepository('alice', localStorageFixture(), transport());
    await web.sync(); web.set(route.slug, route); await web.sync(); await phone.sync();
    web.set(route.slug, { ...route, notes: 'Web note' }); phone.set(route.slug, { ...route, notes: 'Phone note' });
    await phone.sync(); await web.sync();
    expect(web.conflicts()[0]).toMatchObject({ local: { notes: 'Web note' }, cloud: { notes: 'Phone note' } });
    web.resolve(route.slug, 'local'); await web.sync(); await phone.sync();
    expect(web.conflicts()).toHaveLength(0); expect(phone.routes()[0].notes).toBe('Web note');
  });
  it('retries the exact operation after a committed response is lost', async () => {
    const { transport } = serverFixture(), api = transport(), storage = localStorageFixture();
    let lost = true; const ids: string[] = [];
    const network = { ...api, apply: async (op: Parameters<SavedRoutesTransport['apply']>[0]) => { ids.push(op.operationId); const result = await api.apply(op); if (lost) { lost = false; throw new Error('Connection lost'); } return result; } };
    const web = new SavedRoutesRepository('alice', storage, network);
    await web.sync(); web.set(route.slug, route); await expect(web.sync()).rejects.toThrow('Connection lost');
    const reopened = new SavedRoutesRepository('alice', storage, network); await reopened.sync();
    expect(ids[0]).toBe(ids[1]); expect(reopened.pending()).toHaveLength(0); expect(reopened.routes()).toEqual([route]);
  });
  it('chains repeated offline edits and retains edits made during a request', async () => {
    const { transport } = serverFixture(), api = transport(), storage = localStorageFixture();
    let during: (() => void) | undefined;
    const web = new SavedRoutesRepository('alice', storage, { ...api, apply: async op => { const result = await api.apply(op); during?.(); during = undefined; return result; } });
    await web.sync(); web.set(route.slug, route); web.set(route.slug, { ...route, notes: 'Second' });
    during = () => web.set(route.slug, { ...route, notes: 'Third' });
    await web.sync(); expect(web.routes()[0].notes).toBe('Third'); await web.sync();
    expect(web.conflicts()).toHaveLength(0); expect(web.pending()).toHaveLength(0); expect((await api.get()).routes[0].notes).toBe('Third');
  });
  it('keeps account namespaces separate and ignores responses after account switches', async () => {
    const { transport } = serverFixture(), storage = localStorageFixture(); let active = true;
    const alice = new SavedRoutesRepository('alice', storage, transport(), () => active);
    await alice.sync(); alice.set(route.slug, route); active = false;
    const bob = new SavedRoutesRepository('bob', storage, transport('bob')); await bob.sync();
    expect(bob.routes()).toEqual([]); await expect(alice.sync()).rejects.toThrow('account changed');
    active = true; await alice.sync(); expect(alice.routes()).toEqual([route]);
  });
  it('deduplicates repeated imports and retains conflicting browser notes', async () => {
    const { transport } = serverFixture(), storage = localStorageFixture(); const web = new SavedRoutesRepository('alice', storage, transport());
    await web.sync(); web.set(route.slug, route); await web.sync();
    web.importRoutes([{ ...route, notes: 'Browser note' }]); web.importRoutes([{ ...route, notes: 'Browser note' }]);
    expect(web.pending()).toHaveLength(1); expect(web.conflicts()[0].cloud?.notes).toBe('Original');
    web.resolve(route.slug, 'cloud'); await web.sync(); web.importRoutes([{ ...route, notes: 'Browser note' }]);
    expect(web.pending()).toHaveLength(0); expect(web.routes()[0].notes).toBe('Original');
  });
  it('preserves deletions when another device edits and protects unreadable storage', async () => {
    const { transport } = serverFixture(), storage = localStorageFixture(); const web = new SavedRoutesRepository('alice', storage, transport());
    const phone = new SavedRoutesRepository('alice', localStorageFixture(), transport());
    await web.sync(); web.set(route.slug, route); await web.sync(); await phone.sync();
    web.set(route.slug, null); phone.set(route.slug, { ...route, notes: 'Changed' }); await phone.sync(); await web.sync();
    expect(web.conflicts()[0]).toMatchObject({ local: null, cloud: { notes: 'Changed' } });
    storage.setItem(web.prefix + 'snapshot', '{bad');
    expect(() => web.set(route.slug, route)).toThrow(); expect(storage.getItem(web.prefix + 'snapshot')).toBe('{bad');
  });
  it('restarts a partially recorded import without duplicating its queued operation', async () => {
    const { transport } = serverFixture(), storage = localStorageFixture();
    const web = new SavedRoutesRepository('alice', storage, transport()); await web.sync();
    const write = storage.setItem; let fail = true;
    storage.setItem = (key, value) => { if (fail && key.includes(':import:')) { fail = false; throw new Error('Storage interrupted'); } write(key, value); };
    expect(() => web.importRoutes([route])).toThrow('Storage interrupted');
    expect(web.pending()).toHaveLength(1);
    const restarted = new SavedRoutesRepository('alice', storage, transport()); restarted.importRoutes([route]);
    expect(restarted.pending()).toHaveLength(1); await restarted.sync(); expect(restarted.routes()).toEqual([route]);
  });
  it('keeps concurrent tab edits separate and requires review after the observed revision changes', async () => {
    const { transport } = serverFixture(), storage = localStorageFixture();
    const a = new SavedRoutesRepository('alice', storage, transport()), b = new SavedRoutesRepository('alice', storage, transport());
    await a.sync(); a.set(route.slug, route); await a.sync();
    const observed = a.observe(route.slug);
    b.set(route.slug, { ...route, notes: 'Other tab' }); await b.sync();
    a.set(route.slug, { ...route, notes: 'This tab' }, undefined, false, observed); await a.sync();
    expect(a.conflicts()[0]).toMatchObject({ local: { notes: 'This tab' }, cloud: { notes: 'Other tab' } });
  });
  it('keeps old-epoch work for review instead of replaying it into a new epoch', async () => {
    const { transport } = serverFixture(), api = transport(); let epoch = 1, writes = 0;
    const web = new SavedRoutesRepository('alice', localStorageFixture(), { get: async () => ({ ...await api.get(), epoch }), apply: async op => { writes++; return api.apply(op); } });
    await web.sync(); web.set(route.slug, route); epoch = 2; await web.sync();
    expect(writes).toBe(0); expect(web.conflicts()[0].local).toEqual(route);
  });
  it('does not persist malformed successful responses over a working cache', async () => {
    const { transport } = serverFixture(), api = transport(), storage = localStorageFixture(); let malformed = false;
    const web = new SavedRoutesRepository('alice', storage, { ...api, get: async () => malformed ? undefined as any : api.get() });
    await web.sync(); web.set(route.slug, route); await web.sync();
    const original = storage.getItem(web.prefix + 'snapshot'); malformed = true;
    await expect(web.sync()).rejects.toThrow('account response could not be read');
    expect(storage.getItem(web.prefix + 'snapshot')).toBe(original); expect(web.routes()).toEqual([route]);
  });
});
