import AsyncStorage from '@react-native-async-storage/async-storage';

export const WELCOME_COMPLETED_STORAGE_KEY = 'paddletoday:welcome-completed:v1';
export const WELCOME_CHOICE_STORAGE_KEY = 'paddletoday:welcome-choice:v1';
export const ACCOUNT_BACKUP_INVITATION_DISMISSED_KEY = 'paddletoday:account-backup-invitation-dismissed:v1';
export const PENDING_LAUNCH_TARGET_KEY = 'paddletoday:pending-launch-target:v1';
const LEGACY_TRIP_INTENT_STORAGE_KEY = 'paddletoday:trip-intent:v1';
const ONBOARDING_STORAGE_MIGRATED_KEY = 'paddletoday:onboarding-storage-migrated:v2';
const FIRST_ROUTE_OPEN_PENDING_KEY = 'paddletoday:first-route-open-pending:v1';

export async function hasCompletedWelcome() {
  return (await AsyncStorage.getItem(WELCOME_COMPLETED_STORAGE_KEY)) === '1';
}

export async function completeWelcome(options: { trackFirstRouteOpen?: boolean; choice?: 'guest' | 'account' } = {}) {
  const writes = [AsyncStorage.setItem(WELCOME_COMPLETED_STORAGE_KEY, '1')];
  if (options.choice) writes.push(AsyncStorage.setItem(WELCOME_CHOICE_STORAGE_KEY, options.choice));
  if (options.trackFirstRouteOpen) {
    // Analytics metadata must not prevent entering the app after progress saves.
    writes.push(AsyncStorage.setItem(FIRST_ROUTE_OPEN_PENDING_KEY, '1').catch(() => {}));
  }
  await Promise.all(writes);
}

export async function resetWelcome() {
  await AsyncStorage.removeItem(WELCOME_COMPLETED_STORAGE_KEY);
  await AsyncStorage.removeItem(WELCOME_CHOICE_STORAGE_KEY);
}

export async function savePendingLaunchTarget(target: string) {
  if (!target.startsWith('/') || target.startsWith('//') || target.startsWith('/welcome') || target.startsWith('/sign-in')) return;
  await AsyncStorage.setItem(PENDING_LAUNCH_TARGET_KEY, target);
}

export async function consumePendingLaunchTarget() {
  const target = await AsyncStorage.getItem(PENDING_LAUNCH_TARGET_KEY);
  await AsyncStorage.removeItem(PENDING_LAUNCH_TARGET_KEY);
  return target && target.startsWith('/') && !target.startsWith('//') ? target : null;
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
