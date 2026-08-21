import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { PaddleTodayApiError } from '@paddletoday/api-client';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useCreateAreaNotificationSubscriptionMutation, useUpdateAreaNotificationSubscriptionMutation } from '../api/queries';
import type { StoredLocation } from '../lib/location';
import { registerForAreaNotificationPushNotifications } from '../lib/native-notifications';
import { captureAppException, trackAppEvent } from '../lib/observability';
import { useAreaNotificationPreferences, areaNotificationPreferencesFromResponse } from '../providers/area-notification-preferences-provider';
import { colors, radius, spacing } from '../theme/tokens';

const DEFAULT_TRAVEL_MINUTES = 120;

export function AreaNotificationCard({ location }: { location: StoredLocation | null }) {
  const createMutation = useCreateAreaNotificationSubscriptionMutation();
  const updateMutation = useUpdateAreaNotificationSubscriptionMutation();
  const { preferences, isHydrated, savePreferences } = useAreaNotificationPreferences();
  const [message, setMessage] = useState('');
  const promptTracked = useRef(false);
  const selectedLocation = location;
  const active = Boolean(preferences?.isActive);
  const busy = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!selectedLocation || !preferences?.isActive || preferences.locationLabel === selectedLocation.label || updateMutation.isPending) return;
    let cancelled = false;
    void updateMutation.mutateAsync({
      subscriptionId: preferences.id,
      managementToken: preferences.managementToken,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      locationLabel: selectedLocation.label,
    }).then(async (response) => {
      if (!cancelled) await savePreferences(areaNotificationPreferencesFromResponse(response));
    }).catch(() => undefined);
    return () => { cancelled = true; };
  }, [preferences?.id, preferences?.isActive, preferences?.locationLabel, preferences?.managementToken, selectedLocation?.label, selectedLocation?.latitude, selectedLocation?.longitude, updateMutation.isPending]);

  useEffect(() => {
    if (isHydrated && selectedLocation && !preferences?.isActive && !promptTracked.current) {
      promptTracked.current = true;
      trackAppEvent('area_notification_prompt_shown', { source: 'today' });
    }
  }, [isHydrated, preferences?.isActive, selectedLocation]);

  if (!isHydrated || (!location && !preferences?.isActive)) return null;

  async function enable() {
    setMessage('');
    trackAppEvent('area_notification_prompt_accepted', { source: 'today', has_location: true });
    if (!selectedLocation) {
      setMessage('Set a planning location before turning on nearby alerts.');
      return;
    }
    const registration = await registerForAreaNotificationPushNotifications();
    if (!registration.ok || !registration.expoPushToken) {
      setMessage(registration.message);
      trackAppEvent('area_notification_permission_result', { result: 'denied' });
      if (registration.message.toLowerCase().includes('settings')) void Linking.openSettings();
      return;
    }
    trackAppEvent('area_notification_permission_result', { result: 'granted' });
    try {
      const response = await createMutation.mutateAsync({
        expoPushToken: registration.expoPushToken,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        locationLabel: selectedLocation.label,
        maxTravelMinutes: DEFAULT_TRAVEL_MINUTES,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        todayEnabled: true,
        weekendEnabled: true,
      });
      await savePreferences(areaNotificationPreferencesFromResponse(response));
      trackAppEvent('area_notification_subscription_created', { created: response.created });
      setMessage('Nearby paddle alerts are on.');
    } catch (error) {
      captureAppException(error, { name: 'area_notification_subscription_failed' });
      setMessage(error instanceof PaddleTodayApiError ? error.message : 'Nearby alerts could not be enabled right now.');
    }
  }

  async function update(patch: { todayEnabled?: boolean; weekendEnabled?: boolean; isActive?: boolean }) {
    if (!preferences) return;
    try {
      const response = await updateMutation.mutateAsync({
        subscriptionId: preferences.id,
        managementToken: preferences.managementToken,
        ...patch,
      });
      await savePreferences(areaNotificationPreferencesFromResponse(response));
      setMessage(patch.isActive === false ? 'Nearby paddle alerts are off.' : 'Nearby alert settings updated.');
      trackAppEvent('area_notification_subscription_updated', patch.isActive === false ? { active: false } : patch);
    } catch (error) {
      setMessage(error instanceof PaddleTodayApiError ? error.message : 'Nearby alert settings could not be updated.');
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.icon}><MaterialCommunityIcons name="bell-ring-outline" color={colors.accentDeep} size={20} /></View>
      <View style={styles.copy}>
        <Text style={styles.title}>{active ? 'Nearby paddle alerts' : `Get alerts near ${selectedLocation?.label ?? 'your planning location'}`}</Text>
        <Text style={styles.body}>
          {active ? 'We will check routes within about 2 hours of your planning location.' : 'We’ll let you know when routes within about 2 hours look good. Usually no more than twice a week.'}
        </Text>
        {active ? (
          <View style={styles.controls}>
            <Toggle label="Today" value={preferences?.todayEnabled ?? false} disabled={busy} onPress={() => void update({ todayEnabled: !(preferences?.todayEnabled ?? false) })} />
            <Toggle label="Weekend" value={preferences?.weekendEnabled ?? false} disabled={busy} onPress={() => void update({ weekendEnabled: !(preferences?.weekendEnabled ?? false) })} />
            <Pressable disabled={busy} onPress={() => void update({ isActive: false })}><Text style={styles.disableText}>Turn off</Text></Pressable>
          </View>
        ) : (
          <Pressable style={[styles.button, busy ? styles.buttonDisabled : null]} disabled={busy} onPress={() => void enable()}>
            <Text style={styles.buttonText}>{busy ? 'Turning on...' : 'Turn on alerts'}</Text>
          </Pressable>
        )}
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  );
}

function Toggle({ label, value, disabled, onPress }: { label: string; value: boolean; disabled: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.toggle, value ? styles.toggleOn : null]} disabled={disabled} onPress={onPress} accessibilityRole="switch" accessibilityState={{ checked: value }}>
      <Text style={[styles.toggleText, value ? styles.toggleTextOn : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md, borderRadius: radius.md, borderWidth: 1, borderColor: '#BFD6CC', backgroundColor: colors.accentSoft },
  icon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceStrong },
  copy: { flex: 1, gap: 5 },
  title: { color: colors.accentDeep, fontSize: 15, lineHeight: 19, fontWeight: '900' },
  body: { color: colors.text, fontSize: 12, lineHeight: 17 },
  button: { alignSelf: 'flex-start', marginTop: 4, paddingHorizontal: 14, paddingVertical: 9, borderRadius: radius.pill, backgroundColor: colors.accent },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: colors.surfaceStrong, fontSize: 12, fontWeight: '900' },
  controls: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, flexWrap: 'wrap', marginTop: 3 },
  toggle: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: radius.pill, backgroundColor: colors.surfaceStrong, borderWidth: 1, borderColor: colors.border },
  toggleOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  toggleText: { color: colors.textMuted, fontSize: 11, fontWeight: '800' },
  toggleTextOn: { color: colors.surfaceStrong },
  disableText: { color: colors.textMuted, fontSize: 11, fontWeight: '800', padding: 7 },
  message: { color: colors.textMuted, fontSize: 11, lineHeight: 15 },
});
