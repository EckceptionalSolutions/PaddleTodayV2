import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { createTripsClient, TripRepository } from '@paddletoday/api-client';
import { resolveApiBaseUrl } from './api-base-url';
import { tripDeviceStorage } from './trip-device-storage';

export type TripUser = { uid: string; getIdToken(): Promise<string> };
let current: TripRepository | null = null, owner: string | null = null, loading: Promise<void> | null = null;
const listeners = new Set<() => void>();
export const tripSession = () => current;
export const subscribeTripSession = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
export async function activateTripSession(user: TripUser | null) {
  if (owner === (user?.uid ?? null)) { await loading; return current; }
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
    const raw = await AsyncStorage.getItem('paddletoday:trip-guest-draft');
    if (raw) {
      const guest = JSON.parse(raw);
      await next.savePlan(guest.plan, guest.id);
      await AsyncStorage.removeItem('paddletoday:trip-guest-draft');
    }
  })();
  await loading;
  return current;
}
export const TRIP_RETURN_KEY = 'paddletoday:trip-return';
export async function syncTrips() { await current?.sync(); }
export function hasPendingTrips() { return Boolean(current?.getSnapshot().pending.length); }
