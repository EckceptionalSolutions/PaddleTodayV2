import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ExploreIntentId } from './explore-intents';

export const WELCOME_COMPLETED_STORAGE_KEY = 'paddletoday:welcome-completed:v1';
export const TRIP_INTENT_STORAGE_KEY = 'paddletoday:trip-intent:v1';

export async function hasCompletedWelcome() {
  return (await AsyncStorage.getItem(WELCOME_COMPLETED_STORAGE_KEY)) === '1';
}

export async function completeWelcome(intent?: ExploreIntentId) {
  const writes = [AsyncStorage.setItem(WELCOME_COMPLETED_STORAGE_KEY, '1')];

  if (intent) {
    writes.push(AsyncStorage.setItem(TRIP_INTENT_STORAGE_KEY, intent));
  }

  await Promise.all(writes);
}

export async function resetWelcome() {
  await AsyncStorage.removeItem(WELCOME_COMPLETED_STORAGE_KEY);
}
