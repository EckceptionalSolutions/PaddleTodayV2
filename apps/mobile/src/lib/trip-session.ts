import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { createTripsClient, TripRepository } from '@paddletoday/api-client';
import { resolveApiBaseUrl } from './api-base-url';
import { importGuestPlans } from './guest-trip-plans';
import { tripDeviceStorage } from './trip-device-storage';

export type TripUser = { uid: string; getIdToken(): Promise<string> };
let current: TripRepository | null = null, owner: string | null = null, loading: Promise<void> | null = null;
const listeners = new Set<() => void>();
export const tripSession = () => current;
export const subscribeTripSession = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
export async function activateTripSession(user: TripUser | null) {
  if (owner === (user?.uid ?? null) && (loading || current || !user)) {
    if (loading) await loading;
    else if (current) {
      const repo = current;
      await importGuestPlans(repo, () => current === repo);
    }
    return current;
  }
  const previous = current;
  current?.dispose(); current = null; owner = user?.uid ?? null;
  listeners.forEach(fn => fn());
  if (previous && !user) {
    await previous.settle();
    const keys = (await AsyncStorage.getAllKeys()).filter(key => key === previous.storageKey || key.startsWith(previous.storageKey + ':'));
    for (const key of keys) await tripDeviceStorage.removeItem(key);
    await tripDeviceStorage.clearAccountFiles(previous.storageKey);
  }
  if (!user) return null;
  const captured = user;
  const client = createTripsClient(resolveApiBaseUrl(), async () => {
    if (owner !== captured.uid) throw new Error('This account session has ended.');
    return captured.getIdToken();
  });
  const next = new TripRepository(user.uid, client, tripDeviceStorage, Crypto.randomUUID);
  loading = (async () => {
    await next.load();
    if (owner !== captured.uid) { next.dispose(); return; }
    current = next; listeners.forEach(fn => fn());
    await importGuestPlans(next, () => current === next);
  })();
  const started = loading;
  try { await started; } finally { if (loading === started) loading = null; }
  return current;
}
export async function syncTrips() {
  const repo = current;
  if (!repo) return;
  try {
    await importGuestPlans(repo, () => current === repo);
  } finally {
    if (current === repo) await repo.sync();
  }
}
export function hasPendingTrips() { return Boolean(current?.getSnapshot().pending.length); }
