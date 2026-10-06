import { describe, it, expect, vi } from 'vitest';
import { TripRepository, type TripLocalStorage } from './trip-repository';
import { TripApiError, type TripsClient } from './trips';
import { newTripPlan, type Trip } from '@paddletoday/api-contract';

function fixture() {
  const values = new Map<string, string>(); let counter = 0;
  const storage: TripLocalStorage = { async getItem(k) { return values.get(k) ?? null; }, async setItem(k, v) { values.set(k, v); }, async removeItem(k) { values.delete(k); } };
  const remote: Record<string, Trip> = {};
  const api = {
    migrate: vi.fn(async () => ({ migrated: true, recovery: {} })),
    list: vi.fn(async () => ({ trips: Object.values(remote), logs: [], nextCursor: null })),
    mutate: vi.fn(async (id, op) => {
      const plan = op.command.plan;
      remote[id] = { ...plan, id, ownerUid: 'alice', revision: (remote[id]?.revision ?? 0) + 1, status: 'planned', members: [], shuttle: [], activity: [], updatedAt: '', updatedBy: 'alice' };
      return { trip: remote[id] };
    }),
    uploadPhoto: vi.fn(async () => ({ log: null })),
  } as unknown as TripsClient;
  const make = () => new TripRepository('alice', api, storage, () => `operation-id-${String(++counter).padStart(10, '0')}`);
  return { make, values, storage, api, remote };
}
describe('trip offline persistence', () => {
  it('shows and persists vehicle additions, edits, and removal while sync is unavailable', async () => {
    const f = fixture(), repo = f.make(); await repo.load();
    const id = 'trip-id-1234567890';
    await repo.savePlan(newTripPlan({ name: 'River' }), id); await repo.sync();
    const vehicle = { id: 'vehicle-id-1234567890', driverUid: 'alice', label: 'Blue car', meeting: 'Bridge', time: '', parkedAt: '', note: '', seats: 0, passengers: [] };
    vi.mocked(f.api.mutate).mockRejectedValue(new Error('Offline'));
    await repo.command(id, { type: 'vehicle', vehicle });
    await expect(repo.sync()).rejects.toThrow('Offline');
    const restored = f.make(); await restored.load();
    expect(restored.getSnapshot().trips[id]?.shuttle).toEqual([vehicle]);
    await restored.command(id, { type: 'vehicle', vehicle: { ...vehicle, meeting: 'Lower landing' } });
    expect(restored.getSnapshot().trips[id]?.shuttle).toEqual([{ ...vehicle, meeting: 'Lower landing' }]);
    await restored.command(id, { type: 'remove-vehicle', vehicleId: vehicle.id });
    expect(restored.getSnapshot().trips[id]?.shuttle).toEqual([]);
    expect(restored.getSnapshot().pending.filter(p => p.kind === 'trip').map(p => p.input.baseRevision)).toEqual([1, 2, 3]);
  });
  it('keeps group details when an older service acknowledges but drops them, then retries with a fresh baseline', async () => {
    const f = fixture(), repo = f.make(); await repo.load();
    const id = 'trip-id-1234567890', plan = newTripPlan({ name: 'River' });
    plan.preparation!.groupSize = 2; plan.preparation!.note = 'Bring water';
    const apply = f.api.mutate;
    vi.mocked(f.api.mutate).mockImplementationOnce(async (tripId, input, age) => {
      const result = await apply(tripId, input, age);
      delete result.trip!.preparation; return result;
    });
    await repo.savePlan(plan, id);
    const original = repo.getSnapshot().pending[0]!;
    await repo.sync();
    expect(repo.getSnapshot().trips[id]?.preparation).toEqual(plan.preparation);
    expect(repo.getSnapshot().pending[0]?.error).toContain('Group details did not sync');
    const restored = f.make(); await restored.load();
    const retry = restored.getSnapshot().pending[0]!;
    expect(retry.key).not.toBe(original.key);
    expect(retry.kind === 'trip' && retry.input).toMatchObject({ baseRevision: 1, command: { type: 'plan', baseline: { title: plan.title } } });
    await restored.retry(retry.key);
    expect(restored.getSnapshot().pending).toEqual([]);
    expect(restored.getSnapshot().trips[id]?.preparation).toEqual(plan.preparation);
  });
  it('does not lose a GPS track when an older service drops its metadata', async () => {
    const f = fixture(), repo = f.make(); await repo.load();
    const value = { sourceTripId: null, route: newTripPlan({ name: 'River' }).route, date: '2026-10-05', time: '', timeZone: 'UTC', notes: '', paddleAgain: '' as const, water: [],
      track: { startedAt: '2026-10-05T16:00:00Z', endedAt: '2026-10-05T16:02:00Z', elapsedSeconds: 120, distanceMeters: 20, polylines: ['_p~iF~ps|U_ulLnnqC'] } };
    const id = 'paddle-log-1234567890';
    const remote = { ...value, id, ownerUid: 'alice', revision: 1, updatedAt: '', photos: [] };
    delete (remote as Partial<typeof remote>).track;
    f.api.log = vi.fn(async () => ({ log: remote }));
    await repo.saveLog(value, id); await repo.sync();
    expect(repo.getSnapshot().logs[id]?.track).toEqual(value.track);
    expect(repo.getSnapshot().pending[0]?.error).toContain('GPS track did not sync');
    const restored = f.make(); await restored.load();
    f.api.log = vi.fn(async () => ({ log: { ...remote, track: value.track, revision: 2 } }));
    f.api.list = vi.fn(async () => ({ trips: [], logs: [{ ...remote, track: value.track, revision: 2 }], nextCursor: null }));
    await restored.retry(restored.getSnapshot().pending[0]!.key);
    expect(restored.getSnapshot().pending).toEqual([]);
    expect(restored.getSnapshot().logs[id]?.track).toEqual(value.track);
  });
  it('persists the plan and outbox together and restores them after restart', async () => {
    const f = fixture(), first = f.make(); await first.load();
    await first.savePlan(newTripPlan({ name: 'River' }), 'trip-id-1234567890');
    const restored = f.make(); await restored.load();
    expect(restored.getSnapshot().trips['trip-id-1234567890']?.route.name).toBe('River');
    expect(restored.getSnapshot().pending).toHaveLength(1);
    await restored.sync(); expect(restored.getSnapshot().pending).toHaveLength(0);
  });
  it('keeps offline changes and conflict copies through failed sync', async () => {
    const f = fixture(), repo = f.make(); await repo.load(); await repo.savePlan(newTripPlan({ name: 'River' }), 'trip-id-1234567890');
    vi.mocked(f.api.mutate).mockRejectedValueOnce(new Error('offline'));
    await expect(repo.sync()).rejects.toThrow('offline'); expect(repo.getSnapshot().pending).toHaveLength(1);
    vi.mocked(f.api.mutate).mockRejectedValueOnce(new TripApiError(409, 'trip_conflict', 'Review both versions'));
    await repo.sync(); expect(repo.getSnapshot().pending[0]?.error).toBe('Review both versions');
    const restored = f.make(); await restored.load(); expect(restored.getSnapshot().pending).toHaveLength(1);
  });
  it('does not show a successful local save when storage failed', async () => {
    const f = fixture(), repo = f.make(); await repo.load();
    f.storage.setItem = async () => { throw new Error('disk full'); };
    await expect(repo.savePlan(newTripPlan({ name: 'River' }))).rejects.toThrow('disk full');
    expect(repo.getSnapshot().pending).toEqual([]); expect(repo.getSnapshot().trips).toEqual({});
  });
  it('stores photo bytes outside the state record in Android-safe chunks and retries after restart', async () => {
    const f = fixture(), repo = f.make(); await repo.load(); const data = 'a'.repeat(900000);
    await repo.photo('log-id-1234567890', data);
    expect(f.values.get(repo.storageKey)!.length).toBeLessThan(2000);
    expect([...f.values.values()].every(v => v.length <= 131072)).toBe(true);
    const restored = f.make(); await restored.load(); await restored.sync();
    expect(f.api.uploadPhoto).toHaveBeenCalledWith('log-id-1234567890', expect.any(String), data, '', expect.any(Number));
    expect([...f.values.keys()].filter(k => k.includes(':photo:'))).toEqual([]);
  });
  it('does not apply late responses after account disposal', async () => {
    const f = fixture(), repo = f.make(); await repo.load();
    await repo.savePlan(newTripPlan({ name: 'Private river' }), 'trip-id-1234567890');
    let finish!: (v: { trip: Trip | null }) => void;
    vi.mocked(f.api.mutate).mockImplementationOnce(() => new Promise(resolve => { finish = resolve; }));
    const sync = repo.sync();
    await vi.waitFor(() => expect(finish).toBeTypeOf('function'));
    repo.dispose(); finish({ trip: null });
    await expect(sync).rejects.toThrow('session');
    expect(repo.getSnapshot().pending).toHaveLength(1);
  });
  it('does not let a rejected photo block another photo or a text log edit', async () => {
    const f = fixture(), repo = f.make(); await repo.load();
    const id = 'log-id-1234567890';
    await repo.photo(id, 'YWJj'); await repo.photo(id, 'ZGVm');
    await repo.saveLog({ sourceTripId: null, route: newTripPlan({ name: 'River' }).route, date: '2026-10-10', time: '', timeZone: 'UTC', notes: 'Still saved', paddleAgain: '', water: [] }, id);
    vi.mocked(f.api.uploadPhoto).mockRejectedValueOnce(new TripApiError(400, 'invalid_photo', 'Invalid image'));
    f.api.log = vi.fn(async () => ({ log: null }));
    await repo.sync();
    expect(f.api.uploadPhoto).toHaveBeenCalledTimes(2);
    expect(f.api.log).toHaveBeenCalledTimes(1);
    expect(repo.getSnapshot().pending).toHaveLength(1);
    expect(repo.getSnapshot().pending[0]?.error).toBe('Invalid image');
  });
});
