import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AreaNotificationCard } from '../components/area-notification-card';
import { useStoredLocation } from '../hooks/use-stored-location';
import { androidBottomInset } from '../lib/safe-area';
import { colors, radius, spacing } from '../theme/tokens';

export default function NotificationSettingsScreen() {
  const insets = useSafeAreaInsets();
  const bottomContentInset = androidBottomInset(insets.bottom);
  const { location, status, requestLocation } = useStoredLocation();
  const requestingLocation = status === 'requesting';

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: spacing.xl + bottomContentInset },
      ]}
    >
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <MaterialCommunityIcons name="bell-outline" color={colors.accentDeep} size={26} />
        </View>
        <View style={styles.heroCopy}>
          <Text style={styles.kicker}>Settings</Text>
          <Text style={styles.title}>Paddle alerts, your way</Text>
          <Text style={styles.subtitle}>
            Nearby alerts start with both Today and Weekend updates. Change either one here whenever you like.
          </Text>
        </View>
      </View>

      {!location ? (
        <View style={styles.locationCard}>
          <MaterialCommunityIcons name="map-marker-radius-outline" color={colors.accentDeep} size={22} />
          <View style={styles.locationCopy}>
            <Text style={styles.locationTitle}>Choose an alert area</Text>
            <Text style={styles.locationBody}>
              Alerts use your planning location. You can use this device now or set a city or ZIP from Today.
            </Text>
            <Pressable
              style={[styles.primaryButton, requestingLocation ? styles.buttonDisabled : null]}
              disabled={requestingLocation}
              onPress={() => void requestLocation()}
              accessibilityRole="button"
            >
              <MaterialCommunityIcons name="crosshairs-gps" color={colors.surfaceStrong} size={18} />
              <Text style={styles.primaryButtonText}>{requestingLocation ? 'Finding you…' : 'Use my location'}</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      <AreaNotificationCard location={location} />

      <Pressable
        style={styles.systemSettingsRow}
        onPress={() => void Linking.openSettings()}
        accessibilityRole="button"
        accessibilityLabel="Open device notification settings"
      >
        <View style={styles.systemSettingsIcon}>
          <MaterialCommunityIcons name="cellphone-cog" color={colors.textMuted} size={20} />
        </View>
        <View style={styles.systemSettingsCopy}>
          <Text style={styles.systemSettingsTitle}>Device notification settings</Text>
          <Text style={styles.systemSettingsBody}>Manage system permission, sounds, and delivery.</Text>
        </View>
        <MaterialCommunityIcons name="open-in-new" color={colors.textMuted} size={18} />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  content: { padding: spacing.md, gap: spacing.md },
  hero: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
  },
  heroCopy: { flex: 1, gap: 4 },
  kicker: { color: colors.accent, fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5 },
  title: { color: colors.text, fontSize: 23, lineHeight: 28, fontWeight: '900' },
  subtitle: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
  },
  locationCopy: { flex: 1, gap: 5 },
  locationTitle: { color: colors.text, fontSize: 15, fontWeight: '900' },
  locationBody: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  primaryButton: {
    alignSelf: 'flex-start',
    minHeight: 42,
    marginTop: 4,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  buttonDisabled: { opacity: 0.6 },
  primaryButtonText: { color: colors.surfaceStrong, fontSize: 12, fontWeight: '900' },
  systemSettingsRow: {
    minHeight: 72,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  systemSettingsIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.canvasMuted,
  },
  systemSettingsCopy: { flex: 1, gap: 2 },
  systemSettingsTitle: { color: colors.text, fontSize: 14, fontWeight: '900' },
  systemSettingsBody: { color: colors.textMuted, fontSize: 12, lineHeight: 16 },
});
