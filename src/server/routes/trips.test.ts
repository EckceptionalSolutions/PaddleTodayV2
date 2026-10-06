import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { createServer, type Server } from 'node:http';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { newTripPlan, type Trip } from '@paddletoday/api-contract';
import { TripStorage } from '../../lib/trip-storage';
import { BlobPreconditionError, type JsonStorage } from '../../lib/blob-storage';
import { memoryBinaryStorage } from '../../lib/binary-storage.test-fixture';
import { handleTrips } from './trips';

vi.mock('../account-auth', () => ({ verifyAccountIdToken: async (header: string) => header === 'Bearer test-alice' ? { uid: 'alice', name: 'Alice' } : header === 'Bearer test-bob' ? { uid: 'bob', name: 'Bob' } : null }));
vi.mock('../../lib/account-sync-storage', () => ({ accountSyncStorage: () => ({ isDeleted: async () => false, read: async () => ({ document: { drafts: {} } }) }) }));
const holder = vi.hoisted(() => ({ store: null as unknown as TripStorage }));
vi.mock('../../lib/trip-storage', async load => ({ ...await load<typeof import('../../lib/trip-storage')>(), tripStorage: () => holder.store }));

let server: Server, origin: string;
beforeAll(async () => {
  const data = new Map<string, { value: unknown; etag: string }>(); let revision = 0;
  const storage: JsonStorage = {
    kind: 'local', async listJsonNames(prefix = '') { return [...data.keys()].filter(k => k.startsWith(prefix)); },
    async listJsonPage(prefix = '', cursor = null, pageSize = 100) {
      const all = [...data.keys()].filter(k => k.startsWith(prefix) && (!cursor || k > cursor)).sort();
      const names = all.slice(0, pageSize);
      return { names, nextCursor: all.length > names.length ? names.at(-1) ?? null : null };
    },
    async readJson<T>(k: string) { return structuredClone(data.get(k)?.value ?? null) as T | null; },
    async readJsonWithEtag<T>(k: string) { return { value: structuredClone(data.get(k)?.value ?? null) as T | null, etag: data.get(k)?.etag ?? null }; },
    async writeJson(k, v, options) { if (options?.ifMatch && options.ifMatch !== data.get(k)?.etag || options?.ifNoneMatch && data.has(k)) throw new BlobPreconditionError(); data.set(k, { value: structuredClone(v), etag: String(++revision) }); },
    async deleteJson(k) { data.delete(k); },
  };
  holder.store = new TripStorage(storage, memoryBinaryStorage());
  server = createServer((request, response) => { void handleTrips(request, response, new URL(request.url!, 'http://localhost'), randomUUID(), true); });
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address(); origin = `http://127.0.0.1:${typeof address === 'object' ? address!.port : 0}`;
});
afterAll(async () => { await new Promise<void>((resolve, reject) => server.close(e => e ? reject(e) : resolve())); });
async function request(path: string, token = 'test-alice', body?: unknown) {
  return fetch(origin + path, { method: body === undefined ? 'GET' : 'POST', headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body) });
}
async function create() {
  const id = randomUUID();
  const response = await request(`/api/trips/${id}`, 'test-alice', { operationId: randomUUID(), baseRevision: 0, command: { type: 'create', plan: newTripPlan({ name: 'Private river' }) } });
  expect(response.status).toBe(200); return (await response.json()).trip as Trip;
}
describe('trip HTTP authorization boundary', () => {
  it('accepts the existing queued-photo upload contract and privately serves binary JPEGs', async () => {
    const id = randomUUID(), photoId = randomUUID();
    const value = { sourceTripId: null, route: newTripPlan({ name: 'Private river' }).route, date: '2026-10-06', time: '', timeZone: 'UTC', notes: '', paddleAgain: '', water: [] };
    expect((await request(`/api/paddle-logs/${id}`, 'test-alice', { operationId: randomUUID(), baseRevision: 0, value })).status).toBe(200);
    const data = (await sharp({ create: { width: 8, height: 8, channels: 3, background: '#234c37' } }).png().toBuffer()).toString('base64');
    const path = `/api/paddle-logs/${id}/photos/${photoId}`;
    const upload = await request(path, 'test-alice', { data, caption: 'Private' });
    expect(upload.status).toBe(200); expect((await upload.json()).log.photos).toHaveLength(1);
    const photo = await request(path);
    expect(photo.status).toBe(200); expect(photo.headers.get('content-type')).toBe('image/jpeg');
    expect(photo.headers.get('cache-control')).toBe('no-store');
    const bytes = Buffer.from(await photo.arrayBuffer()); expect((await sharp(bytes).metadata()).format).toBe('jpeg');
    expect((await request(path, 'test-bob')).status).toBe(404);
    expect((await request(path, 'invalid')).status).toBe(401);
  });
  it('requires authentication and marks private responses no-store', async () => {
    const response = await request('/api/trips', 'invalid'); expect(response.status).toBe(401);
    expect(response.headers.get('cache-control')).toBe('no-store');
  });
  it('does not trust a requested trip ID as authorization', async () => {
    const trip = await create();
    expect((await request(`/api/trips/${trip.id}`, 'test-bob')).status).toBe(404);
    expect((await request(`/api/trips/${trip.id}`)).status).toBe(200);
  });
  it('rejects invalid mutations without creating a trip', async () => {
    const id = randomUUID();
    const response = await request(`/api/trips/${id}`, 'test-alice', { operationId: randomUUID(), baseRevision: 0, command: { type: 'create', plan: { title: 'Incomplete' } } });
    expect(response.status).toBe(400); expect((await request(`/api/trips/${id}`)).status).toBe(404);
  });
  it('public viewing is token-scoped and does not leak membership data', async () => {
    const trip = await create(), token = 'view-token-' + randomUUID();
    await request(`/api/trips/${trip.id}`, 'test-alice', { operationId: randomUUID(), baseRevision: trip.revision, command: { type: 'link', purpose: 'view', token } });
    const response = await request('/api/trips/view', '', { id: trip.id, token });
    expect(response.status).toBe(200); const value = await response.json();
    expect(value.trip.title).toBe('Private river'); expect(value.trip).not.toHaveProperty('members');
    expect((await request('/api/trips/view', '', { id: trip.id, token: 'bad-token-'.repeat(6) })).status).toBe(404);
  });
  it('malformed JSON and oversized operations fail before storage writes', async () => {
    const id = randomUUID();
    const response = await fetch(origin + `/api/trips/${id}`, { method: 'POST', headers: { authorization: 'Bearer test-alice', 'content-type': 'application/json' }, body: '{broken' });
    expect(response.status).toBe(400);
    expect((await request(`/api/trips/${id}`, 'test-alice', { data: 'x'.repeat(65000) })).status).toBe(413);
  });
  it('accepts a bounded GPS recap with JSON-escaped track data and rejects oversized logs', async () => {
    const id = randomUUID();
    const value = { sourceTripId: null, route: newTripPlan({ name: 'Private river' }).route, date: '2026-10-05', time: '', timeZone: 'UTC', notes: '', paddleAgain: '', water: [],
      track: { startedAt: '2026-10-05T12:00:00Z', endedAt: '2026-10-05T13:00:00Z', elapsedSeconds: 3600, distanceMeters: 1000, polylines: ['\\'.repeat(48000)] } };
    const response = await request(`/api/paddle-logs/${id}`, 'test-alice', { operationId: randomUUID(), baseRevision: 0, value });
    expect(response.status).toBe(200);
    expect((await response.json()).log.track.polylines).toEqual(value.track.polylines);
    expect((await request(`/api/paddle-logs/${id}`, 'test-alice', { data: 'x'.repeat(129000) })).status).toBe(413);
  });
});
