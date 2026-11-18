import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TripRepository } from '@paddletoday/api-client';
import { isTripPlan, type TripPlan } from '@paddletoday/api-contract';

const legacyKey = 'paddletoday:trip-guest-draft';
const prefix = 'paddletoday:trip-guest-plan:v1:';
type GuestPlan = { id: string; plan: TripPlan; owner?: string };

export function saveGuestPlan(id: string, plan: TripPlan) {
  return AsyncStorage.setItem(prefix + id, JSON.stringify({ id, plan }));
}

async function readGuestPlans() {
  const keys = (await AsyncStorage.getAllKeys()).filter(key => key === legacyKey || key.startsWith(prefix));
  const plans: (GuestPlan & { key: string })[] = [];
  let unreadable = false;
  for (const [key, raw] of keys.length ? await AsyncStorage.multiGet(keys) : []) {
    if (!raw) continue;
    try {
      const record: GuestPlan = JSON.parse(raw);
      if (typeof record?.id === 'string' && record.id && isTripPlan(record.plan)) {
        plans.push({ ...record, key });
        continue;
      }
    } catch {
      // Leave damaged records in storage and continue importing other plans.
    }
    unreadable = true;
  }
  return { plans, unreadable };
}

export async function pendingGuestPlans() {
  return (await readGuestPlans()).plans.filter(record => !record.owner);
}

// Serialize import attempts across focus, reconnect, and account changes. Claim
// each plan before copying it so a retry can only finish under the same account.
let importing = Promise.resolve();
export function importGuestPlans(repo: TripRepository, isCurrent: () => boolean) {
  const work = importing.then(async () => {
    const { plans, unreadable } = await readGuestPlans();
    for (const { key, id, plan, owner } of plans) {
      if (!isCurrent()) return;
      if (owner && owner !== repo.uid) continue;
      if (!owner) await AsyncStorage.setItem(key, JSON.stringify({ id, plan, owner: repo.uid }));
      if (!isCurrent()) return;
      if (!repo.getSnapshot().trips[id]) await repo.savePlan(plan, id);
      if (!isCurrent()) return;
      await AsyncStorage.removeItem(key);
    }
    if (unreadable) throw new Error('A saved guest plan could not be read. It is still on this device.');
  });
  importing = work.catch(() => {});
  return work;
}
