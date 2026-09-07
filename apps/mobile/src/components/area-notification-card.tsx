import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { PaddleTodayApiError } from '@paddletoday/api-client';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useCreateAreaNotificationSubscriptionMutation, useUpdateAreaNotificationSubscriptionMutation } from '../api/queries';
import type { StoredLocation } from '../lib/location';
import { openDeviceSettings } from '../lib/external-links';
import { selectionKeyboardProps } from '../lib/selection-keyboard';
import { registerForAreaNotificationPushNotifications } from '../lib/native-notifications';
import { captureAppException, trackAppEvent } from '../lib/observability';
import { useAreaNotificationPreferences, areaNotificationPreferencesFromResponse } from '../providers/area-notification-preferences-provider';
import { colors, radius, spacing } from '../theme/tokens';

const DEFAULT_TRAVEL_MINUTES = 120;

export function AreaNotificationCard({ location }: { location: StoredLocation | null }) {
  const createMutation = useCreateAreaNotificationSubscriptionMutation();
  const updateMutation = useUpdateAreaNotificationSubscriptionMutation();
  const { preferences, isHydrated, storageError, loadError, loadingPreferences, retryLoad, savePreferences } = useAreaNotificationPreferences();
  const [message, setMessage] = useState('');
  const [operationPending, setOperationPending] = useState(false);
  const operationInFlight = useRef(false);
  const promptTracked = useRef(false);
  const selectedLocation = location;
  const active = Boolean(preferences?.isActive);
  const busy = operationPending || createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (isHydrated && !loadError && selectedLocation && !preferences?.isActive && !promptTracked.current) {
      promptTracked.current = true;
      trackAppEvent('area_notification_prompt_shown', { source: 'settings' });
    }
  }, [isHydrated, loadError, preferences?.isActive, selectedLocation]);

  if (!isHydrated) return null;

  async function enable() {
    if (operationInFlight.current || loadError) return;
    setMessage('');
    trackAppEvent('area_notification_prompt_accepted', { source: 'settings', has_location: Boolean(selectedLocation) });
    if (!selectedLocation) {
      setMessage('Set a planning location before turning on nearby alerts.');
      return;
    }
    operationInFlight.current = true;
    setOperationPending(true);
    try {
      const registration = await registerForAreaNotificationPushNotifications();
      if (!registration.ok || !registration.expoPushToken) {
        setMessage(registration.message);
        trackAppEvent('area_notification_permission_result', { result: 'denied' });
        if (registration.message.toLowerCase().includes('settings')) void openDeviceSettings();
        return;
      }
      trackAppEvent('area_notification_permission_result', { result: 'granted' });
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
      await rememberPreferences(areaNotificationPreferencesFromResponse(response));
      trackAppEvent('area_notification_subscription_created', { created: response.created });
      setMessage('Nearby paddle alerts are on.');
    } catch (error) {
      captureAppException(error, { name: 'area_notification_subscription_failed' });
      setMessage(error instanceof PaddleTodayApiError ? error.message : 'Nearby alerts could not be enabled right now.');
    } finally {
      operationInFlight.current = false;
      setOperationPending(false);
    }
  }

  async function update(patch: { todayEnabled?: boolean; weekendEnabled?: boolean; isActive?: boolean }) {
    if (!preferences || operationInFlight.current) return;
    operationInFlight.current = true;
    setOperationPending(true);
    setMessage('');
    try {
      const response = await updateMutation.mutateAsync({
        subscriptionId: preferences.id,
        managementToken: preferences.managementToken,
        ...patch,
      });
      await rememberPreferences(areaNotificationPreferencesFromResponse(response));
      setMessage(patch.isActive === false ? 'Nearby paddle alerts are off.' : 'Nearby alert settings updated.');
      trackAppEvent('area_notification_subscription_updated', patch.isActive === false ? { active: false } : patch);
    } catch (error) {
      setMessage(error instanceof PaddleTodayApiError ? error.message : 'Nearby alert settings could not be updated.');
    } finally {
      operationInFlight.current = false;
      setOperationPending(false);
    }
  }

  async function rememberPreferences(value: NonNullable<typeof preferences>) {
    try {
      await savePreferences(value);
      return true;
    } catch {
      // The server already accepted the change. The provider exposes a local
      // persistence warning so the user can retry without another API update.
      return false;
    }
  }

  async function retryDeviceSave() {
    if (!preferences || operationInFlight.current) return;
    operationInFlight.current = true;
    setOperationPending(true);
    try {
      if (await rememberPreferences(preferences)) setMessage('Alert settings saved on this device.');
    } finally {
      operationInFlight.current = false;
      setOperationPending(false);
    }
  }

  if (loadError) return (
    <View style={styles.card}>
      <View style={styles.copy}>
        <Text style={styles.title}>Alert settings could not load</Text>
        <Text style={styles.body} accessibilityLiveRegion="polite">This device could not read your saved alert settings. Retry to manage your existing alerts.</Text>
        <Pressable
          style={styles.button}
          accessibilityRole="button"
          accessibilityLabel="Retry loading alert settings"
          accessibilityState={{ disabled: loadingPreferences, busy: loadingPreferences }}
          aria-busy={loadingPreferences}
          disabled={loadingPreferences}
          onPress={() => void retryLoad()}
        >
          <Text style={styles.buttonText}>{loadingPreferences ? 'Loading…' : 'Retry loading'}</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.card}>
      <View style={styles.icon}><MaterialCommunityIcons name="bell-ring-outline" color={colors.accentDeep} size={20} /></View>
      <View style={styles.copy}>
        <Text style={styles.title}>{active ? 'Nearby paddle alerts' : selectedLocation ? `Get alerts near ${selectedLocation.label}` : 'Nearby paddle alerts'}</Text>
        <Text style={styles.body}>
          {active ? 'We will check routes within about 2 hours of your planning location.' : 'We’ll let you know when routes within about 2 hours look good. Usually no more than twice a week.'}
        </Text>
        {active ? (
          <View style={styles.controls}>
            <Toggle label="Today" value={preferences?.todayEnabled ?? false} disabled={busy} onPress={() => void update({ todayEnabled: !(preferences?.todayEnabled ?? false) })} />
            <Toggle label="Weekend" value={preferences?.weekendEnabled ?? false} disabled={busy} onPress={() => void update({ weekendEnabled: !(preferences?.weekendEnabled ?? false) })} />
            <Pressable style={styles.disableButton} accessibilityRole="button" accessibilityLabel="Turn off nearby alerts" aria-busy={busy} accessibilityState={{ disabled: busy, busy }} disabled={busy} onPress={() => void update({ isActive: false })}><Text style={styles.disableText}>Turn off</Text></Pressable>
          </View>
        ) : (
          <Pressable
            style={[styles.button, busy || !selectedLocation ? styles.buttonDisabled : null]}
            disabled={busy || !selectedLocation}
            onPress={() => void enable()}
            accessibilityRole="button"
            accessibilityState={{ disabled: busy || !selectedLocation, busy }}
            aria-busy={busy}
          >
            <Text style={styles.buttonText}>
              {!selectedLocation ? 'Set a location first' : busy ? 'Turning on...' : 'Turn on alerts'}
            </Text>
          </Pressable>
        )}
        {message ? <Text accessibilityLiveRegion="polite" style={styles.message}>{message}</Text> : null}
        {storageError ? (
          <View style={styles.controls}>
            <Text accessibilityLiveRegion="polite" style={styles.message}>
              Your alert change was received, but this device could not remember it. Retry saving before closing the app so you can manage these alerts later.
            </Text>
            <Pressable
              style={styles.button}
              accessibilityRole="button"
              accessibilityLabel="Retry saving alert settings on this device"
              accessibilityState={{ disabled: busy, busy }}
              aria-busy={busy}
              disabled={busy}
              onPress={() => void retryDeviceSave()}
            >
              <Text style={styles.buttonText}>{busy ? 'Saving…' : 'Retry saving on device'}</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function Toggle({ label, value, disabled, onPress }: { label: string; value: boolean; disabled: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.toggle, value ? styles.toggleOn : null]} disabled={disabled} onPress={onPress} accessibilityRole="switch" accessibilityLabel={`${label} alerts`} aria-checked={value} accessibilityState={{ checked: value, disabled }} {...selectionKeyboardProps(onPress, disabled)}>
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
  button: { alignSelf: 'flex-start', minHeight: 44, justifyContent: 'center', marginTop: 4, paddingHorizontal: 14, paddingVertical: 9, borderRadius: radius.pill, backgroundColor: colors.accent },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: colors.surfaceStrong, fontSize: 12, fontWeight: '900' },
  controls: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, flexWrap: 'wrap', marginTop: 3 },
  toggle: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 7, borderRadius: radius.pill, backgroundColor: colors.surfaceStrong, borderWidth: 1, borderColor: colors.border },
  disableButton: { minHeight: 44, justifyContent: 'center' },
  toggleOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  toggleText: { color: colors.textMuted, fontSize: 11, fontWeight: '800' },
  toggleTextOn: { color: colors.surfaceStrong },
  disableText: { color: colors.textMuted, fontSize: 11, fontWeight: '800', padding: 7 },
  message: { color: colors.textMuted, fontSize: 11, lineHeight: 15 },
});
