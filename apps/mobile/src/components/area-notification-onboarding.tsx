import { useEffect, useRef } from 'react';
import { useUpdateAreaNotificationSubscriptionMutation } from '../api/queries';
import { useStoredLocation } from '../hooks/use-stored-location';
import { captureAppException, trackAppEvent } from '../lib/observability';
import {
  areaNotificationPreferencesFromResponse,
  useAreaNotificationPreferences,
} from '../providers/area-notification-preferences-provider';

export function AreaNotificationOnboarding({ active }: { active: boolean }) {
  const { location } = useStoredLocation();
  const { preferences, isHydrated, loadError, savePreferences, setLocationSync, locationSyncRetry } = useAreaNotificationPreferences();
  const updateMutation = useUpdateAreaNotificationSubscriptionMutation();
  const lastLocationSyncAttempt = useRef('');

  useEffect(() => {
    if (
      !active ||
      !isHydrated ||
      loadError ||
      !location ||
      !preferences?.isActive ||
      preferences.locationLabel === location.label ||
      updateMutation.isPending
    ) return;

    const syncKey = `${preferences.id}:${location.latitude}:${location.longitude}:${locationSyncRetry}`;
    if (lastLocationSyncAttempt.current === syncKey) return;
    lastLocationSyncAttempt.current = syncKey;
    const target = { subscriptionId: preferences.id, locationLabel: location.label };
    setLocationSync({ ...target, status: 'pending' });

    void updateMutation.mutateAsync({
      subscriptionId: preferences.id,
      managementToken: preferences.managementToken,
      latitude: location.latitude,
      longitude: location.longitude,
      locationLabel: location.label,
    }).then(async (response) => {
      // The server may accept an update even if local preference storage fails.
      await savePreferences(areaNotificationPreferencesFromResponse(response)).catch(error => {
        captureAppException(error, { name: 'area_notification_location_persistence_failed' });
      });
      if (lastLocationSyncAttempt.current === syncKey) setLocationSync({ status: 'idle' });
      trackAppEvent('area_notification_location_updated', { source: 'planning_location' });
    }).catch((error) => {
      if (lastLocationSyncAttempt.current === syncKey) setLocationSync({ ...target, status: 'error' });
      captureAppException(error, { name: 'area_notification_location_update_failed' });
    });
  }, [active, isHydrated, loadError, location, preferences, savePreferences, updateMutation, locationSyncRetry, setLocationSync]);

  return null;
}
