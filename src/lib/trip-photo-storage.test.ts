import { createHash, randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { newTripPlan } from '@paddletoday/api-contract';
import { BlobPreconditionError, type JsonStorage } from './blob-storage';
import { memoryBinaryStorage } from './binary-storage.test-fixture';
import { TripStorage } from './trip-storage';

const hash = (uid: string) => createHash('sha256').update(uid).digest('hex');
const owner = hash('alice');
function jsonStorage(): JsonStorage {
  const entries = new Map<string, { value: unknown; revision: number }>();
  return {
    kind: 'local',
    async readJson<T>(key: string) { return structuredClone(entries.get(key)?.value ?? null) as T | null; },
    async readJsonWithEtag<T>(key: string) { const entry = entries.get(key); return { value: structuredClone(entry?.value ?? null) as T | null, etag: entry ? String(entry.revision) : null }; },
    async writeJson(key, value, options) { const previous = entries.get(key); if (options?.ifNoneMatch && previous || options?.ifMatch && options.ifMatch !== String(previous?.revision)) throw new BlobPreconditionError(); entries.set(key, { value: structuredClone(value), revision: (previous?.revision ?? 0) + 1 }); },
    async deleteJson(key) { entries.delete(key); },
    async listJsonNames(prefix = '') { return [...entries.keys()].filter(key => key.startsWith(prefix)); },
    async listJsonPage(prefix = '', cursor = null, pageSize = 100) {
      const remaining = [...entries.keys()].filter(key => key.startsWith(prefix) && (cursor === null || key > cursor)).sort();
      const names = remaining.slice(0, pageSize);
      return { names, nextCursor: remaining.length > names.length ? names.at(-1)! : null };
    },
  };
}
async function fixture() {
  const store = new TripStorage(jsonStorage(), memoryBinaryStorage());
  const id = randomUUID(), photoId = randomUUID();
  const route = newTripPlan({ name: 'Private river', slug: 'private-river' }).route;
  await store.log('alice', id, { operationId: randomUUID(), baseRevision: 0, value: { sourceTripId: null, route, date: '2026-10-06', time: '', timeZone: 'UTC', notes: '', paddleAgain: '', water: [] } });
  const input = await sharp({ create: { width: 40, height: 30, channels: 3, background: '#234c37' } }).png().toBuffer();
  return { store, id, photoId, input: input.toString('base64'), key: `trip-photo-bytes/${owner}/${id}/${photoId}.jpg`, logKey: `logs/${owner}/${id}.json`, indexKey: `trip-index/${owner}.json` };
}
function pauseWrite(store: TripStorage) {
  const original = store.binary.write.bind(store.binary);
  let entered!: () => void, release!: () => void;
  const started = new Promise<void>(resolve => { entered = resolve; });
  const gate = new Promise<void>(resolve => { release = resolve; });
  store.binary.write = async (name, bytes) => { entered(); await gate; await original(name, bytes); };
  return { started, release };
}

describe('binary private-photo lifecycle and legacy compatibility', () => {
  it('resumes paged account deletion without deleting another owner’s binary objects', async () => {
    const { store, id } = await fixture();
    for (let i = 0; i < 30; i++) await store.binary.write(`trip-photo-bytes/${owner}/${id}/${randomUUID()}.jpg`, Buffer.from([255,216]));
    const other = `trip-photo-bytes/${hash('bob')}/${randomUUID()}/${randomUUID()}.jpg`;
    await store.binary.write(other, Buffer.from([255,216]));
    const complete = await store.deleteAccount('alice');
    expect(complete).toBe(false);
    expect((await store.binary.list(`trip-photo-bytes/${owner}/`)).length).toBeGreaterThan(0);
    await store.maintenance();
    expect(await store.binary.list(`trip-photo-bytes/${owner}/`)).toEqual([]);
    expect(await store.binary.read(other)).not.toBeNull();
    await expect(store.list('alice')).rejects.toMatchObject({ status: 410 });
  });
  it('keeps JPEG quality, metadata, ownership and byte-based quota while removing the base64 document', async () => {
    const { store, id, photoId, input, key, indexKey } = await fixture();
    const log = await store.photo('alice', id, photoId, input, 'Private caption');
    const bytes = await store.binary.read(key);
    expect(log.photos[0]).toMatchObject({ id: photoId, caption: 'Private caption', bytes: bytes!.length, width: 40, height: 30 });
    expect((await sharp(bytes!).metadata()).format).toBe('jpeg');
    expect(await store.storage.listJsonNames('trip-photos/')).toEqual([]);
    expect(await store.storage.readJson(indexKey)).toMatchObject({ photos: { [`${id}/${photoId}`]: bytes!.length } });
    const restarted = new TripStorage(store.storage, store.binary);
    expect(await restarted.readPhoto('alice', id, photoId)).toEqual(bytes);
    await expect(restarted.readPhoto('bob', id, photoId)).rejects.toMatchObject({ status: 404 });
    await restarted.removePhoto('alice', id, photoId);
    expect(await store.binary.read(key)).toBeNull();
    expect(await store.storage.readJson(indexKey)).toMatchObject({ photos: {} });
  });

  it('reads and deletes existing JSON photos without migrating or exposing them', async () => {
    const { store, id, photoId, input, key, logKey } = await fixture();
    await store.photo('alice', id, photoId, input, 'Legacy');
    const bytes = await store.binary.read(key);
    await store.binary.delete(key);
    const legacy = `trip-photos/${owner}/${id}/${photoId}.json`;
    await store.storage.writeJson(legacy, { kind: 'photo', uid: 'alice', logId: id, id: photoId, at: '2026-10-01T00:00:00Z', data: bytes!.toString('base64') });
    const doc = await store.storage.readJson<any>(logKey); delete doc.uploads; await store.storage.writeJson(logKey, doc);
    expect(await store.readPhoto('alice', id, photoId)).toEqual(bytes);
    await store.photo('alice', id, photoId, input, 'Legacy retry');
    expect(await store.binary.read(key)).toBeNull();
    await expect(store.readPhoto('bob', id, photoId)).rejects.toMatchObject({ status: 404 });
    await store.removePhoto('alice', id, photoId);
    expect(await store.storage.readJson(legacy)).toBeNull();
  });

  it.each(['photo', 'log', 'account'])('removes a late binary write when the %s is deleted during upload', async kind => {
    const { store, id, photoId, input, key, indexKey } = await fixture();
    const gate = pauseWrite(store);
    const uploading = store.photo('alice', id, photoId, input, '').then(() => null, error => error);
    await gate.started;
    if (kind === 'photo') await store.removePhoto('alice', id, photoId);
    else if (kind === 'log') await store.log('alice', id, { operationId: randomUUID(), baseRevision: 1, value: null });
    else await store.deleteAccount('alice');
    gate.release();
    expect(await uploading).toMatchObject({ status: kind === 'log' ? 404 : 410 });
    expect(await store.binary.read(key)).toBeNull();
    expect(await store.storage.readJson(indexKey)).toMatchObject({ photos: {} });
    await expect(store.readPhoto('alice', id, photoId)).rejects.toMatchObject({ status: kind === 'account' ? 410 : 404 });
  });

  it('coalesces accounting for duplicate uploads and rejects a different image using a pending ID', async () => {
    const { store, id, photoId, input, key, indexKey } = await fixture();
    const gate = pauseWrite(store);
    const uploading = store.photo('alice', id, photoId, input, ''); await gate.started;
    const different = (await sharp({ create: { width: 8, height: 8, channels: 3, background: '#ff0000' } }).png().toBuffer()).toString('base64');
    await expect(store.photo('alice', id, photoId, different, '')).rejects.toMatchObject({ status: 409 });
    const duplicate = store.photo('alice', id, photoId, input, '');
    gate.release(); await Promise.all([uploading, duplicate]);
    expect((await store.getLog('alice', id)).photos).toHaveLength(1);
    const index = await store.storage.readJson<any>(indexKey);
    expect(Object.values(index.photos)).toEqual([(await store.binary.read(key))!.length]);
  });

  it('recovers the same queued upload after an ambiguous storage failure without double charging', async () => {
    const { store, id, photoId, input, key, indexKey } = await fixture();
    const write = store.binary.write.bind(store.binary); let failed = false;
    store.binary.write = async (name, bytes) => { await write(name, bytes); if (!failed) { failed = true; throw new Error('Lost upload reply'); } };
    await expect(store.photo('alice', id, photoId, input, '')).rejects.toThrow('Lost upload reply');
    const restarted = new TripStorage(store.storage, store.binary);
    await restarted.photo('alice', id, photoId, input, 'Recovered');
    expect((await restarted.getLog('alice', id)).photos).toHaveLength(1);
    expect(Object.values((await store.storage.readJson<any>(indexKey)).photos)).toEqual([(await store.binary.read(key))!.length]);
  });

  it('collects old unfinalized binary objects and releases expired quota while preserving ready photos', async () => {
    const { store, id, photoId, input, key, logKey, indexKey } = await fixture();
    await store.photo('alice', id, photoId, input, '');
    const orphan = `trip-photo-bytes/${owner}/${randomUUID()}/${randomUUID()}.jpg`;
    await store.binary.write(orphan, Buffer.from('orphan'));
    const list = store.binary.list.bind(store.binary);
    store.binary.list = async prefix => (await list(prefix)).map(entry => ({ ...entry, modifiedAt: '2000-01-01T00:00:00Z' }));
    await store.maintenance();
    expect(await store.binary.read(orphan)).toBeNull();
    expect(await store.binary.read(key)).not.toBeNull();
    const doc = await store.storage.readJson<any>(logKey);
    doc.log.photos = []; doc.uploads[photoId] = { state: 'pending', startedAt: '2000-01-01T00:00:00Z' };
    await store.storage.writeJson(logKey, doc);
    await store.maintenance();
    expect(await store.binary.read(key)).toBeNull();
    expect(await store.storage.readJson(indexKey)).toMatchObject({ photos: {} });
    await expect(store.photo('alice', id, photoId, input, '')).rejects.toMatchObject({ status: 410 });
  });

  it('resumes interrupted account deletion and deletes both binary and legacy objects', async () => {
    const { store, id, photoId, input, key } = await fixture();
    await store.photo('alice', id, photoId, input, '');
    const legacy = `trip-photos/${owner}/${id}/${randomUUID()}.json`;
    await store.storage.writeJson(legacy, { kind: 'photo', uid: 'alice', logId: id, id: randomUUID(), at: '2000-01-01T00:00:00Z', data: 'YWJj' });
    const remove = store.binary.delete.bind(store.binary); let failed = false;
    store.binary.delete = async name => { if (!failed) { failed = true; throw new Error('Temporary delete failure'); } await remove(name); };
    await expect(store.deleteAccount('alice')).rejects.toThrow('Temporary delete failure');
    await store.maintenance();
    expect(await store.binary.read(key)).toBeNull();
    expect(await store.storage.readJson(legacy)).toBeNull();
    await expect(store.list('alice')).rejects.toMatchObject({ status: 410 });
  });

  it('enforces existing photo and account quotas using processed JPEG bytes', async () => {
    const { store, id, input, indexKey } = await fixture();
    for (let n = 0; n < 10; n++) await store.photo('alice', id, randomUUID(), input, '');
    await expect(store.photo('alice', id, randomUUID(), input, '')).rejects.toMatchObject({ code: 'photo_limit' });
    const second = await fixture();
    const index = await second.store.storage.readJson<any>(second.indexKey);
    index.photos.other = 100 * 1024 * 1024; await second.store.storage.writeJson(second.indexKey, index);
    await expect(second.store.photo('alice', second.id, second.photoId, second.input, '')).rejects.toMatchObject({ code: 'photo_quota' });
    expect(await second.store.binary.read(second.key)).toBeNull();
    expect(Object.values((await store.storage.readJson<any>(indexKey)).photos)).toHaveLength(10);
  });
});
