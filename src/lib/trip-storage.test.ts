import { describe, it, expect, beforeEach } from 'vitest';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { newTripPlan, tripPlan, type TripMutation, type TripCommand, type Trip, type PaddleLogInput } from '@paddletoday/api-contract';
import { TripStorage } from './trip-storage';
import { BlobPreconditionError, type JsonStorage } from './blob-storage';

function memory(): JsonStorage {
  const values = new Map<string, { value: unknown; revision: number }>();
  return {
    kind: 'local',
    async listJsonNames(prefix = '') { return [...values.keys()].filter(k => k.startsWith(prefix)); },
    async listJsonPage(prefix = '', cursor = null, pageSize = 100) {
      const all = [...values.keys()].filter(k => k.startsWith(prefix) && (!cursor || k > cursor)).sort();
      const names = all.slice(0, pageSize);
      return { names, nextCursor: all.length > names.length ? names.at(-1) ?? null : null };
    },
    async readJson<T>(name: string) { return structuredClone(values.get(name)?.value ?? null) as T | null; },
    async readJsonWithEtag<T>(name: string) { const entry = values.get(name); return { value: structuredClone(entry?.value ?? null) as T | null, etag: entry ? String(entry.revision) : null }; },
    async writeJson(name, value, options) { const old = values.get(name); if (options?.ifNoneMatch && old || options?.ifMatch && options.ifMatch !== String(old?.revision)) throw new BlobPreconditionError(); values.set(name, { value: structuredClone(value), revision: (old?.revision ?? 0) + 1 }); },
    async deleteJson(name) { values.delete(name); },
  };
}
let store: TripStorage;
const plan = () => ({ ...newTripPlan({ slug: 'test-river', name: 'Test River', putInId: 'upper', putInName: 'Upper', takeOutId: 'lower', takeOutName: 'Lower' }), date: '2026-10-10', launch: '09:00', timeZone: 'America/Chicago' });
const mutation = (t: Trip | null, command: TripCommand): TripMutation => ({ operationId: randomUUID(), baseRevision: t?.revision ?? 0, command });
async function create() { const id = randomUUID(); return (await store.mutate('alice', 'Alice', id, mutation(null, { type: 'create', plan: plan() })))!; }
async function join(trip: Trip) {
  const token = 'a'.repeat(64);
  const t = (await store.mutate('alice', 'Alice', trip.id, mutation(trip, { type: 'link', purpose: 'invite', token })))!;
  return (await store.mutate('bob', 'Bob', t.id, mutation(null, { type: 'join', token })))!;
}
beforeEach(() => { store = new TripStorage(memory()); });
describe('private trips and collaborative planning', () => {
  it('keeps repeated outings distinct and retries create idempotently', async () => {
    const first = await create(), second = await create();
    expect((await store.list('alice')).trips.map(t => t.id).sort()).toEqual([first.id, second.id].sort());
    const id = randomUUID(), op = mutation(null, { type: 'create', plan: plan() });
    const a = await store.mutate('alice', 'Alice', id, op), b = await store.mutate('alice', 'Alice', id, op);
    expect(a?.revision).toBe(b?.revision);
  });
  it('does not disclose private trips to other users', async () => {
    const t = await create();
    await expect(store.get('bob', t.id)).rejects.toMatchObject({ status: 404 });
    expect((await store.list('bob')).trips).toEqual([]);
  });
  it('links show only the public projection and revoke immediately', async () => {
    let t = await create(); const token = 'b'.repeat(64);
    t = (await store.mutate('alice', 'Alice', t.id, mutation(t, { type: 'link', purpose: 'view', token })))!;
    const view = await store.publicView(t.id, token);
    expect(view).not.toHaveProperty('members'); expect(view).not.toHaveProperty('shuttle'); expect(view).not.toHaveProperty('ownerUid');
    await expect(store.mutate('bob', 'Bob', t.id, mutation(null, { type: 'join', token }))).rejects.toMatchObject({ status: 404 });
    await store.mutate('alice', 'Alice', t.id, mutation(t, { type: 'revoke', purpose: 'view' }));
    await expect(store.publicView(t.id, token)).rejects.toMatchObject({ status: 404 });
  });
  it('allows independent plan changes and rejects overwriting the same field', async () => {
    let t = await join(await create()); const baseline = tripPlan(t);
    t = (await store.mutate('alice', 'Alice', t.id, mutation(t, { type: 'plan', baseline, plan: { ...baseline, title: 'New title' } })))!;
    t = (await store.mutate('bob', 'Bob', t.id, { ...mutation(t, { type: 'plan', baseline, plan: { ...baseline, launch: '10:00' } }), baseRevision: t.revision - 1 }))!;
    expect(t.title).toBe('New title'); expect(t.launch).toBe('10:00');
    await expect(store.mutate('bob', 'Bob', t.id, mutation(t, { type: 'plan', baseline, plan: { ...baseline, title: 'Overwritten' } }))).rejects.toMatchObject({ status: 409 });
  });
  it('rejects removed member offline edits', async () => {
    const t = await join(await create());
    await store.mutate('alice', 'Alice', t.id, mutation(t, { type: 'remove-member', uid: 'bob' }));
    await expect(store.mutate('bob', 'Bob', t.id, mutation(t, { type: 'plan', baseline: tripPlan(t), plan: { ...tripPlan(t), title: 'Offline edit' } }))).rejects.toMatchObject({ status: 404 });
    expect((await store.list('bob')).trips).toEqual([]);
  });
  it('protects the final shuttle seat against concurrent claims', async () => {
    let t = await join(await create());
    t = (await store.mutate('cara', 'Cara', t.id, mutation(null, { type: 'join', token: 'a'.repeat(64) })))!;
    const vehicleId = randomUUID();
    t = (await store.mutate('alice', 'Alice', t.id, mutation(t, { type: 'vehicle', vehicle: { id: vehicleId, driverUid: 'alice', seats: 1, passengers: [], label: 'Blue car', meeting: 'Take-out', time: '08:00', parkedAt: 'Put-in', note: '' } })))!;
    const results = await Promise.allSettled(['bob', 'cara'].map(uid => store.mutate(uid, uid, t.id, mutation(t, { type: 'seat', vehicleId }))));
    expect(results.filter(r => r.status === 'fulfilled')).toHaveLength(1);
    expect((await store.get('alice', t.id)).shuttle[0]?.passengers).toHaveLength(1);
  });
  it('never exposes private logs or photos to trip partners; retains their logs on organizer deletion', async () => {
    const t = await join(await create());
    const input: PaddleLogInput = { sourceTripId: t.id, route: t.route, date: '2026-10-10', time: '09:00', timeZone: t.timeZone, notes: 'Private note', paddleAgain: 'yes', water: [] };
    await store.log('bob', t.id, { operationId: randomUUID(), baseRevision: 0, value: input });
    await expect(store.getLog('alice', t.id)).rejects.toMatchObject({ status: 404 });
    const photoId = randomUUID();
    const data = await sharp({ create: { width: 8, height: 8, channels: 3, background: '#234c37' } }).png().toBuffer();
    const result = await store.photo('bob', t.id, photoId, data.toString('base64'), 'River');
    expect(result.photos).toHaveLength(1);
    expect((await store.readPhoto('bob', t.id, photoId)).length).toBeGreaterThan(0);
    await expect(store.readPhoto('alice', t.id, photoId)).rejects.toMatchObject({ status: 404 });
    await store.deleteAccount('alice');
    expect((await store.getLog('bob', t.id)).notes).toBe('Private note');
    await expect(store.get('bob', t.id)).rejects.toMatchObject({ status: 404 });
  });
  it('keeps deleted trips deleted after retries and stale writes', async () => {
    const t = await create();
    await store.mutate('alice', 'Alice', t.id, mutation(t, { type: 'delete' }));
    await expect(store.mutate('alice', 'Alice', t.id, mutation(null, { type: 'create', plan: plan() }))).rejects.toMatchObject({ status: 410 });
  });
  it('keeps removed photos removed when an upload is retried', async () => {
    const t = await create(), id = randomUUID();
    await store.log('alice', t.id, { operationId: randomUUID(), baseRevision: 0, value: { sourceTripId: t.id, route: t.route, date: '2026-10-10', time: '', timeZone: 'UTC', notes: '', paddleAgain: '', water: [] } });
    const data = (await sharp({ create: { width: 8, height: 8, channels: 3, background: '#234c37' } }).png().toBuffer()).toString('base64');
    await store.photo('alice', t.id, id, data, '');
    await store.photo('alice', t.id, id, data, '');
    expect((await store.getLog('alice', t.id)).photos).toHaveLength(1);
    await store.removePhoto('alice', t.id, id);
    await expect(store.photo('alice', t.id, id, data, '')).rejects.toMatchObject({ status: 410 });
    await expect(store.readPhoto('alice', t.id, id)).rejects.toMatchObject({ status: 404 });
  });
  it('releases photo capacity after invalid images instead of blocking future uploads', async () => {
    const t = await create();
    await store.log('alice', t.id, { operationId: randomUUID(), baseRevision: 0, value: { sourceTripId: t.id, route: t.route, date: '2026-10-10', time: '', timeZone: 'UTC', notes: '', paddleAgain: '', water: [] } });
    for (let i = 0; i < 11; i++) await expect(store.photo('alice', t.id, randomUUID(), 'YWJj', '')).rejects.toMatchObject({ code: 'invalid_photo' });
    const data = (await sharp({ create: { width: 8, height: 8, channels: 3, background: '#234c37' } }).png().toBuffer()).toString('base64');
    expect((await store.photo('alice', t.id, randomUUID(), data, '')).photos).toHaveLength(1);
  });
  it('migrates an old draft once and preserves private original fields without sharing them', async () => {
    const draft = { target: { routeSlug: 'test-river', putInId: 'upper', takeOutId: 'lower' }, draft: { launch: '2026-10-10 09:00', expected: '2026-10-10 12:00', checkIn: '2026-10-10 13:00', groupSize: '2', boat: 'Canoe', vehicle: 'Private car', note: 'Private notes' }, savedAt: new Date().toISOString() };
    await store.migrate('alice', 'Alice', [draft]); await store.migrate('alice', 'Alice', [draft]);
    const list = await store.list('alice'); expect(list.trips).toHaveLength(1);
    expect(JSON.stringify(list.trips)).not.toContain('Private notes');
    expect(Object.values(await store.migrationRecovery('alice'))[0]).toContain('Private notes');
  });
  it('repairs an index after a crash between the authoritative trip write and index update', async () => {
    const original = store.storage.writeJson.bind(store.storage); let tripWritten = false, failed = false;
    store.storage.writeJson = async (key, value, options) => {
      if (tripWritten && key.startsWith('trip-index/') && !failed) { failed = true; throw new Error('temporary storage outage'); }
      await original(key, value, options); if (key.startsWith('trips/')) tripWritten = true;
    };
    await expect(create()).rejects.toThrow('temporary storage outage');
    await store.maintenance();
    expect((await store.list('alice')).trips).toHaveLength(1);
    const key = (await store.storage.listJsonNames('trips/'))[0]!;
    expect(await store.storage.readJson(key)).toMatchObject({ pendingIndex: [] });
  });
  it('expires an interrupted photo reservation and rejects late retries', async () => {
    const t = await create(), id = randomUUID();
    await store.log('alice', t.id, { operationId: randomUUID(), baseRevision: 0, value: { sourceTripId: t.id, route: t.route, date: '2026-10-10', time: '', timeZone: 'UTC', notes: '', paddleAgain: '', water: [] } });
    const key = (await store.storage.listJsonNames('logs/'))[0]!;
    const doc = await store.storage.readJson<Record<string, unknown>>(key);
    await store.storage.writeJson(key, { ...doc, uploads: { [id]: { state: 'pending', startedAt: '2000-01-01T00:00:00Z' } } });
    await store.maintenance();
    await expect(store.photo('alice', t.id, id, 'YWJj', '')).rejects.toMatchObject({ status: 410 });
  });
  it('resumes account deletion after an interrupted photo or log removal', async () => {
    const t = await create();
    await store.log('alice', t.id, { operationId: randomUUID(), baseRevision: 0, value: { sourceTripId: t.id, route: t.route, date: '2026-10-10', time: '', timeZone: 'UTC', notes: '', paddleAgain: '', water: [] } });
    const original = store.storage.deleteJson.bind(store.storage); let failed = false;
    store.storage.deleteJson = async key => { if (!failed && key.startsWith('logs/')) { failed = true; throw new Error('temporary storage outage'); } await original(key); };
    await expect(store.deleteAccount('alice')).rejects.toThrow('temporary storage outage');
    await store.maintenance();
    expect(await store.storage.listJsonNames('logs/')).toEqual([]);
    await expect(store.list('alice')).rejects.toMatchObject({ status: 410 });
  });
  it('continues account deletion through durable bounded trip pages', async () => {
    const first = await create(), second = await create();
    let complete = await store.deleteAccount('alice', 1);
    expect(complete).toBe(false);
    const tripDocs = await Promise.all((await store.storage.listJsonNames('trips/')).map(name => store.storage.readJson<{ trip: Trip; deleted: boolean }>(name)));
    expect(tripDocs.filter(doc => doc?.deleted)).toHaveLength(1);
    expect(tripDocs.filter(doc => !doc?.deleted)).toHaveLength(1);
    for (let attempt = 0; attempt < 10 && !complete; attempt += 1) complete = await store.deleteAccount('alice', 1);
    expect(complete).toBe(true);
    expect((await store.storage.readJson<{ deletionComplete?: boolean }>((await store.storage.listJsonNames('trip-index/'))[0]!))?.deletionComplete).toBe(true);
    const deletedTrips = await Promise.all((await store.storage.listJsonNames('trips/')).map(name => store.storage.readJson<{ deleted: boolean }>(name)));
    expect(deletedTrips.every(doc => doc?.deleted)).toBe(true);
  });
  it('persists bounded maintenance cursors and advances across pages', async () => {
    for (let i = 0; i < 101; i += 1) {
      await store.storage.writeJson(`trip-index/${String(i).padStart(3, '0')}.json`, {
        kind: 'trip-index', uid: `user-${i}`, trips: [], logs: [], photos: {}, deleting: false, migration: {},
      });
    }
    await store.maintenance();
    expect(await store.storage.readJson('maintenance/trip-maintenance.json')).toMatchObject({
      cursors: { 'trip-index/': 'trip-index/099.json' },
    });
    await store.maintenance();
    expect(await store.storage.readJson('maintenance/trip-maintenance.json')).toMatchObject({
      cursors: { 'trip-index/': null },
    });
  });
  it('cleans expired photo uploads from log metadata without reading photo bytes', async () => {
    const t = await create(), id = randomUUID();
    await store.log('alice', t.id, { operationId: randomUUID(), baseRevision: 0, value: {
      sourceTripId: t.id, route: t.route, date: '2026-10-10', time: '', timeZone: 'UTC', notes: '', paddleAgain: '', water: [],
    } });
    const data = (await sharp({ create: { width: 8, height: 8, channels: 3, background: '#234c37' } }).png().toBuffer()).toString('base64');
    await store.photo('alice', t.id, id, data, 'River');
    const logKey = (await store.storage.listJsonNames('logs/'))[0]!;
    const log = await store.storage.readJson<Record<string, unknown>>(logKey);
    await store.storage.writeJson(logKey, { ...log, uploads: { [id]: { state: 'pending', startedAt: '2000-01-01T00:00:00Z' } } });
    const readJson = store.storage.readJson.bind(store.storage);
    store.storage.readJson = async name => {
      if (name.startsWith('trip-photos/')) throw new Error('maintenance must not download photo payloads');
      return readJson(name);
    };
    await store.maintenance();
    store.storage.readJson = readJson;
    await expect(store.readPhoto('alice', t.id, id)).rejects.toMatchObject({ status: 404 });
  });
});
