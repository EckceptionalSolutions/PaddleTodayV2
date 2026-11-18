import { beforeEach, expect, it, vi } from 'vitest';
import { createTripsClient, TripRepository } from '@paddletoday/api-client';
import { newTripPlan } from '@paddletoday/api-contract';
import { randomUUID } from 'node:crypto';

const values = vi.hoisted(() => new Map<string, string>());
const storage = vi.hoisted(() => ({
  getAllKeys: async () => [...values.keys()],
  multiGet: async (keys: string[]) => keys.map(key => [key, values.get(key) ?? null]),
  getItem: async (key: string) => values.get(key) ?? null,
  setItem: async (key: string, value: string) => { values.set(key, value); },
  removeItem: vi.fn(async (key: string) => { values.delete(key); }),
}));
vi.mock('@react-native-async-storage/async-storage', () => ({ default: storage }));
import { importGuestPlans, pendingGuestPlans, saveGuestPlan } from './guest-trip-plans';

beforeEach(() => { values.clear(); storage.removeItem.mockClear(); });
it('recovers legacy and new plans exactly once across an interrupted import', async () => {
  const make = (name: string, launch: string) => {
    const plan = newTripPlan({ name, putInName: name + ' put-in', takeOutName: name + ' take-out' });
    plan.date = '2030-06-12';
    plan.launch = launch;
    plan.expected = '17:00';
    plan.preparation!.note = 'Private note for ' + name;
    plan.itinerary = [{ id: randomUUID(), location: name + ' stop', time: '12:00', note: 'Meet crew' }];
    return plan;
  };
  const a = make('Reach A', '09:00'), b = make('Reach B', '10:30');
  const idA = randomUUID(), idB = randomUUID();
  await storage.setItem('paddletoday:trip-guest-draft', JSON.stringify({ id: idA, plan: a }));
  await saveGuestPlan(idB, b);
  expect((await pendingGuestPlans()).map(r => r.plan)).toEqual([a, b]);
  const client = createTripsClient('http://localhost', async () => '');
  const first = new TripRepository('fixture-owner', client, storage, randomUUID);
  await first.load();
  storage.removeItem.mockRejectedValueOnce(new Error('interrupted after local commit'));
  await expect(importGuestPlans(first, () => true)).rejects.toThrow('interrupted');
  expect(Object.keys(first.getSnapshot().trips)).toEqual([idA]);
  first.dispose();
  const reopened = new TripRepository('fixture-owner', client, storage, randomUUID);
  await reopened.load();
  await Promise.all([importGuestPlans(reopened, () => true), importGuestPlans(reopened, () => true)]);
  const { trips, pending } = reopened.getSnapshot();
  expect(Object.keys(trips)).toEqual([idA, idB]);
  expect(trips[idA]).toMatchObject(a);
  expect(trips[idB]).toMatchObject(b);
  expect(pending.map(work => work.id)).toEqual([idA, idB]);
  expect(await pendingGuestPlans()).toEqual([]);
  expect([...values.keys()]).toEqual([reopened.storageKey]);
});

it('imports a valid plan even if an older record cannot be read', async () => {
  await storage.setItem('paddletoday:trip-guest-draft', '{');
  const id = randomUUID(), plan = newTripPlan({ name: 'Evening paddle' });
  await saveGuestPlan(id, plan);
  const repo = new TripRepository('fixture-owner', createTripsClient('http://localhost', async () => ''), storage, randomUUID);
  await repo.load();
  await expect(importGuestPlans(repo, () => true)).rejects.toThrow('still on this device');
  expect(repo.getSnapshot().trips[id]).toMatchObject(plan);
  expect(await storage.getItem('paddletoday:trip-guest-draft')).toBe('{');
});
