import AsyncStorage from '@react-native-async-storage/async-storage';

export const WELCOME_COMPLETED_STORAGE_KEY = 'paddletoday:welcome-completed:v1';
const LEGACY_TRIP_INTENT_STORAGE_KEY = 'paddletoday:trip-intent:v1';
const ONBOARDING_STORAGE_MIGRATED_KEY = 'paddletoday:onboarding-storage-migrated:v2';
const FIRST_ROUTE_OPEN_PENDING_KEY = 'paddletoday:first-route-open-pending:v1';

export async function hasCompletedWelcome() {
  return (await AsyncStorage.getItem(WELCOME_COMPLETED_STORAGE_KEY)) === '1';
}

export async function completeWelcome(options: { trackFirstRouteOpen?: boolean } = {}) {
  const writes = [AsyncStorage.setItem(WELCOME_COMPLETED_STORAGE_KEY, '1')];
  if (options.trackFirstRouteOpen) {
    // Analytics metadata must not prevent entering the app after progress saves.
    writes.push(AsyncStorage.setItem(FIRST_ROUTE_OPEN_PENDING_KEY, '1').catch(() => {}));
  }
  await Promise.all(writes);
}

export async function resetWelcome() {
  await AsyncStorage.removeItem(WELCOME_COMPLETED_STORAGE_KEY);
}

export async function migrateOnboardingStorage() {
  try {
    if ((await AsyncStorage.getItem(ONBOARDING_STORAGE_MIGRATED_KEY)) === '1') {
      return;
    }

    await AsyncStorage.multiRemove([LEGACY_TRIP_INTENT_STORAGE_KEY]);
    await AsyncStorage.setItem(ONBOARDING_STORAGE_MIGRATED_KEY, '1');
  } catch {
    // This only removes obsolete preferences. Retry on the next launch.
  }
}

export async function consumeFirstRouteOpenPending() {
  try {
    if ((await AsyncStorage.getItem(FIRST_ROUTE_OPEN_PENDING_KEY)) !== '1') {
      return false;
    }

    await AsyncStorage.removeItem(FIRST_ROUTE_OPEN_PENDING_KEY);
    return true;
  } catch {
    return false;
  }
}
