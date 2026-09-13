import { describe, expect, it, vi } from 'vitest';
import type { RiverDetailApiResult, RiverGeometryResponse } from '@paddletoday/api-contract';
import { downloadOfflineTrip, listOfflineTrips, loadOfflineTrip, removeOfflineTrip, retryOfflineGeometry } from './offline-trips';
import type { TripDraft } from './trip-drafts';

function memory() {
  const values = new Map<string, string>();
  return {
    values,
    getItem: vi.fn(async (key: string) => values.get(key) ?? null),
    setItem: vi.fn(async (key: string, value: string) => { values.set(key, value); }),
    removeItem: vi.fn(async (key: string) => { values.delete(key); }),
    getAllKeys: vi.fn(async () => [...values.keys()]),
  };
}

const draft: TripDraft = { launch: '2030-06-15 09:00', expected: '2030-06-15 12:00', checkIn: '', groupSize: '3', boat: 'Canoe', vehicle: 'Shuttle', note: 'Meet at the landing' };
const detail = {
  generatedAt: '2026-09-12T10:00:00.000Z',
  river: {
    slug: 'river-a', name: 'River A', reach: 'North to South', distanceLabel: '12 miles', estimatedPaddleTime: '4 hours',
    putIn: { id: 'put-in', name: 'North Landing', latitude: 45.1, longitude: -93.1 },
    takeOut: { id: 'take-out', name: 'South Landing', latitude: 45.0, longitude: -93.0 },
    accessPoints: [
      { id: 'put-in', name: 'North Landing', latitude: 45.1, longitude: -93.1, mileFromStart: 0, segmentKind: 'creek', note: 'Park by the sign' },
      { id: 'take-out', name: 'South Landing', latitude: 45.0, longitude: -93.0, mileFromStart: 12, segmentKind: 'creek' },
    ],
    logistics: { distanceLabel: '12 miles', estimatedPaddleTime: '4 hours', shuttle: 'Leave one vehicle at South Landing', permits: 'None', camping: 'None', summary: 'Simple shuttle', accessCaveats: ['Seasonal parking'], watchFor: ['Strainers'] },
    safetyProfile: { safetyNotes: ['Wear a PFD'] },
  },
} as unknown as RiverDetailApiResult;
const geometry: RiverGeometryResponse = { requestId: 'req', routeId: 'river-a', state: 'MN', source: 'canonical', geometry: { type: 'LineString', coordinates: [[-93.1, 45.1], [-93.05, 45.05], [-93.0, 45.0]] } };
const signal = () => new AbortController().signal;

describe('offline trip packets', () => {
  it('commits a complete reference packet and reopens it from storage', async () => {
    const storage = memory();
    const packet = await downloadOfflineTrip(storage, { detail, putIn: detail.river.accessPoints![0], takeOut: detail.river.accessPoints![1], draft }, async () => geometry, signal());
    expect(packet.missing).toEqual([]);
    expect(packet.geometry?.lines[0]).toHaveLength(3);
    expect(packet.draft.note).toBe('Meet at the landing');
    expect(JSON.stringify(packet)).not.toContain('gauge');
    expect(JSON.stringify(packet)).not.toContain('forecast');
    const reopened = await loadOfflineTrip(storage, packet.target);
    expect(reopened).toMatchObject({ putIn: { id: 'put-in' }, takeOut: { id: 'take-out' }, geometry: packet.geometry });
    expect((await listOfflineTrips(storage)).records).toHaveLength(1);
  });

  it('keeps a prior complete packet when an update cannot download geometry', async () => {
    const storage = memory();
    const first = await downloadOfflineTrip(storage, { detail, putIn: detail.river.accessPoints![0], takeOut: detail.river.accessPoints![1], draft }, async () => geometry, signal());
    await expect(downloadOfflineTrip(storage, { detail, putIn: detail.river.accessPoints![0], takeOut: detail.river.accessPoints![1], draft: { ...draft, note: 'New note' } }, async () => { throw new Error('offline'); }, signal())).rejects.toThrow('previous complete offline trip');
    expect((await loadOfflineTrip(storage, first.target))?.draft.note).toBe('Meet at the landing');
  });

  it('keeps the previous packet when the visible pointer cannot be committed', async () => {
    const storage = memory();
    const first = await downloadOfflineTrip(storage, { detail, putIn: detail.river.accessPoints![0], takeOut: detail.river.accessPoints![1], draft }, async () => geometry, signal());
    const originalSetItem = storage.setItem;
    let failPointer = false;
    storage.setItem = vi.fn(async (key: string, value: string) => {
      if (failPointer && key.startsWith('paddletoday:offline-trip:v1:')) throw new Error('storage unavailable');
      return originalSetItem(key, value);
    });
    failPointer = true;
    await expect(downloadOfflineTrip(storage, { detail, putIn: detail.river.accessPoints![0], takeOut: detail.river.accessPoints![1], draft: { ...draft, note: 'Edited after first download' } }, async () => geometry, signal())).rejects.toThrow('storage unavailable');
    expect((await loadOfflineTrip(storage, first.target))?.draft.note).toBe('Meet at the landing');
    expect((await listOfflineTrips(storage)).records).toHaveLength(1);
  });

  it('marks missing geometry and retries it without losing the packet', async () => {
    const storage = memory();
    const partial = await downloadOfflineTrip(storage, { detail, putIn: detail.river.accessPoints![0], takeOut: detail.river.accessPoints![1], draft }, async () => { throw new Error('offline'); }, signal());
    expect(partial.missing).toContain('Route geometry');
    const retried = await retryOfflineGeometry(storage, partial.target, async () => geometry, signal());
    expect(retried.missing).not.toContain('Route geometry');
    expect((await loadOfflineTrip(storage, partial.target))?.geometry?.source).toBe('canonical');
  });

  it('removes only the packet and leaves the normal trip draft store untouched', async () => {
    const storage = memory();
    const packet = await downloadOfflineTrip(storage, { detail, putIn: detail.river.accessPoints![0], takeOut: detail.river.accessPoints![1], draft }, async () => geometry, signal());
    const draftKey = 'paddletoday:trip-draft:v1:["river-a","put-in","take-out"]';
    await storage.setItem(draftKey, JSON.stringify({ version: 1, target: packet.target, draft, savedAt: new Date().toISOString() }));
    await removeOfflineTrip(storage, packet.target);
    expect(await loadOfflineTrip(storage, packet.target)).toBeNull();
    expect(await storage.getItem(draftKey)).toBeTruthy();
  });
});
