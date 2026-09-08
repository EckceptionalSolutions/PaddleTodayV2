import type { RiverAlertThreshold } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import { alertThresholdLabel } from '../lib/alerts';
import { useAlertPreferences } from '../providers/alert-preferences-provider';
import { AlertPreferencesNotice } from './alert-preferences-notice';
import { colors, radius, spacing } from '../theme/tokens';

export function AlertSetupSheet({
  visible,
  routeName,
  routeSlug,
  routeReach,
  status,
  bottomInset,
  pendingThreshold,
  onClose,
  onNativeAlert,
}: {
  visible: boolean;
  routeName: string;
  routeSlug: string;
  routeReach: string;
  status: string;
  bottomInset: number;
  pendingThreshold: RiverAlertThreshold | null;
  onClose: () => void;
  onNativeAlert: (threshold: RiverAlertThreshold) => void;
}) {
  const reducedMotion = useReducedMotion();
  const { routeAlerts, isHydrated, loadError } = useAlertPreferences();
  const savedThresholds = isHydrated && !loadError ? (['good', 'strong'] as const).filter(threshold =>
    routeAlerts.some(alert => alert.riverSlug === routeSlug && alert.deliveryMethod === 'push' && alert.threshold === threshold)) : [];

  return (
    <Modal animationType={reducedMotion ? "none" : "slide"} transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.alertSheetScrim}>
        <View style={styles.alertSheet}>
          <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: spacing.md + bottomInset }]}>
            <View style={styles.alertSheetHandle} />
            <View style={styles.alertSheetHeader}>
              <View style={styles.alertSheetTitleWrap}>
                <Text style={styles.alertSheetKicker}>{routeName}</Text>
                <Text accessibilityRole="header" style={styles.alertSheetTitle}>Route alerts</Text>
                <Text style={styles.alertSheetSubtitle}>
                  Get notified when {routeReach} reaches Good or Strong.
                </Text>
              </View>
              <Pressable style={styles.alertSheetClose} onPress={onClose} accessibilityRole="button" accessibilityLabel="Close route alerts">
                <MaterialCommunityIcons name="close" color={colors.textMuted} size={20} />
              </Pressable>
            </View>

            <AlertPreferencesNotice />
            <View style={styles.alertSheetSection}>
              <Text accessibilityRole="header" style={styles.alertSheetSectionTitle}>Phone notifications</Text>
              {!isHydrated ? <Text style={styles.alertStatus}>Loading saved alert choices…</Text> : null}
              {savedThresholds.length ? <Text style={styles.alertStatus}>Saved phone alerts: {savedThresholds.map(alertThresholdLabel).join(', ')}.</Text> : null}
              <Text style={styles.alertStatus}>{savedThresholds.length ? 'Tap a saved alert to check phone permission and confirm it again.' : 'Choose Good, Strong, or both.'}</Text>
              <View style={styles.alertButtonRow}>
                {(['good', 'strong'] as const).map((threshold) => {
                  const saved = savedThresholds.includes(threshold);
                  const isPending = pendingThreshold === threshold;
                  const busy = pendingThreshold !== null;
                  return (
                    <Pressable
                      key={`native-${threshold}`}
                      style={[styles.alertButton, busy ? styles.alertButtonDisabled : null]}
                      disabled={busy}
                      accessibilityRole="button"
                      accessibilityLabel={`Phone alert at ${alertThresholdLabel(threshold)}`}
                      accessibilityHint={saved ? 'Confirms this phone alert again.' : 'Enables this phone alert.'}
                      accessibilityState={{ disabled: busy, busy: isPending, selected: saved }}
                      aria-pressed={saved}
                      aria-busy={isPending}
                      onPress={() => onNativeAlert(threshold)}
                    >
                      <MaterialCommunityIcons name={saved ? "check" : "bell-ring-outline"} color={colors.surfaceStrong} size={16} />
                      <Text style={styles.alertButtonText}>
                        {isPending ? 'Saving...' : `At ${alertThresholdLabel(threshold)}${saved ? ' · Saved' : ''}`}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {status ? <Text accessibilityLiveRegion="polite" style={styles.alertStatus}>{status}</Text> : null}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  alertSheetScrim: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(10, 24, 29, 0.34)',
  },
  alertSheet: {
    maxHeight: '88%',
    backgroundColor: colors.surfaceStrong,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  alertSheetHandle: {
    alignSelf: 'center',
    width: 42,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.border,
  },
  alertSheetHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  alertSheetTitleWrap: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  alertSheetKicker: {
    color: colors.accentDeep,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  alertSheetTitle: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '900',
  },
  alertSheetSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  alertSheetClose: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertSheetSection: {
    gap: spacing.sm,
  },
  alertSheetSectionTitle: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '900',
  },
  alertButtonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  alertButton: {
    minHeight: 44,
    flex: 1,
    minWidth: 140,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  alertButtonDisabled: {
    opacity: 0.6,
  },
  alertButtonText: {
    flexShrink: 1,
    textAlign: 'center',
    lineHeight: 18,
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  scroll: { flexGrow: 0 },
  content: { padding: spacing.md, gap: spacing.md },
  alertStatus: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
});
