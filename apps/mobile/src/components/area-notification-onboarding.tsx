import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import {
  useCreateAreaNotificationSubscriptionMutation,
  useUpdateAreaNotificationSubscriptionMutation,
} from '../api/queries';
import { useStoredLocation } from '../hooks/use-stored-location';
import { registerForAreaNotificationPushNotifications } from '../lib/native-notifications';
import { captureAppException, trackAppEvent } from '../lib/observability';
import {
  areaNotificationPreferencesFromResponse,
  useAreaNotificationPreferences,
} from '../providers/area-notification-preferences-provider';

const PERMISSION_PROMPTED_STORAGE_KEY = 'paddletoday:notification-permission-prompted:v1';
const AUTO_ENABLE_PENDING_STORAGE_KEY = 'paddletoday:area-notifications-auto-enable-pending:v1';
const DEFAULT_TRAVEL_MINUTES = 120;

export function AreaNotificationOnboarding({ active }: { active: boolean }) {
  const { location } = useStoredLocation();
  const { preferences, isHydrated, savePreferences } = useAreaNotificationPreferences();
  const createMutation = useCreateAreaNotificationSubscriptionMutation();
  const updateMutation = useUpdateAreaNotificationSubscriptionMutation();
  const permissionAttemptStarted = useRef(false);
  const subscriptionAttemptStarted = useRef(false);
  const lastLocationSyncAttempt = useRef('');
  const [autoEnablePending, setAutoEnablePending] = useState(false);

  useEffect(() => {
    if (!active || Platform.OS === 'web' || permissionAttemptStarted.current) return;
    permissionAttemptStarted.current = true;
    let cancelled = false;

    void AsyncStorage.multiGet([
      PERMISSION_PROMPTED_STORAGE_KEY,
      AUTO_ENABLE_PENDING_STORAGE_KEY,
    ]).then(async ([promptedEntry, pendingEntry]) => {
      if (cancelled) return;

      if (pendingEntry[1] === '1') {
        setAutoEnablePending(true);
      }
      if (promptedEntry[1] === '1') return;

      await AsyncStorage.setItem(PERMISSION_PROMPTED_STORAGE_KEY, '1');
      trackAppEvent('area_notification_permission_prompted', { source: 'first_open' });
      const registration = await registerForAreaNotificationPushNotifications();
      trackAppEvent('area_notification_permission_result', {
        source: 'first_open',
        result: registration.ok ? 'granted' : 'denied',
      });

      if (registration.ok && !cancelled) {
        await AsyncStorage.setItem(AUTO_ENABLE_PENDING_STORAGE_KEY, '1');
        setAutoEnablePending(true);
      }
    }).catch((error) => {
      captureAppException(error, { name: 'area_notification_first_open_prompt_failed' });
    });

    return () => {
      cancelled = true;
    };
  }, [active]);

  useEffect(() => {
    if (!active || !autoEnablePending || !isHydrated || !location || createMutation.isPending) return;

    if (preferences) {
      setAutoEnablePending(false);
      void AsyncStorage.removeItem(AUTO_ENABLE_PENDING_STORAGE_KEY);
      return;
    }
    if (subscriptionAttemptStarted.current) return;
    subscriptionAttemptStarted.current = true;

    void registerForAreaNotificationPushNotifications().then(async (registration) => {
      if (!registration.ok || !registration.expoPushToken) {
        return;
      }

      const response = await createMutation.mutateAsync({
        expoPushToken: registration.expoPushToken,
        latitude: location.latitude,
        longitude: location.longitude,
        locationLabel: location.label,
        maxTravelMinutes: DEFAULT_TRAVEL_MINUTES,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        todayEnabled: true,
        weekendEnabled: true,
      });
      await savePreferences(areaNotificationPreferencesFromResponse(response));
      await AsyncStorage.removeItem(AUTO_ENABLE_PENDING_STORAGE_KEY);
      setAutoEnablePending(false);
      trackAppEvent('area_notification_subscription_created', {
        created: response.created,
        source: 'first_open',
      });
    }).catch((error) => {
      captureAppException(error, { name: 'area_notification_auto_enable_failed' });
    });
  }, [active, autoEnablePending, createMutation, isHydrated, location, preferences, savePreferences]);

  useEffect(() => {
    if (
      !active ||
      !isHydrated ||
      !location ||
      !preferences?.isActive ||
      preferences.locationLabel === location.label ||
      updateMutation.isPending
    ) return;

    const syncKey = `${preferences.id}:${location.latitude}:${location.longitude}`;
    if (lastLocationSyncAttempt.current === syncKey) return;
    lastLocationSyncAttempt.current = syncKey;

    void updateMutation.mutateAsync({
      subscriptionId: preferences.id,
      managementToken: preferences.managementToken,
      latitude: location.latitude,
      longitude: location.longitude,
      locationLabel: location.label,
    }).then(async (response) => {
      await savePreferences(areaNotificationPreferencesFromResponse(response));
      trackAppEvent('area_notification_location_updated', { source: 'planning_location' });
    }).catch((error) => {
      captureAppException(error, { name: 'area_notification_location_update_failed' });
    });
  }, [active, isHydrated, location, preferences, savePreferences, updateMutation]);

  return null;
}
