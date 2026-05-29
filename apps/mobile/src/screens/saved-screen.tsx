import type { RiverAlertThreshold, RiverSummaryApiItem } from '@paddletoday/api-contract';
import { PaddleTodayApiError } from '@paddletoday/api-client';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCreateRiverAlertMutation, useRiverSummaryQuery } from '../api/queries';
import { AppLoadingState } from '../components/app-state';
import { RiverCard } from '../components/river-card';
import { SectionCard } from '../components/section-card';
import { alertMutationMessage, alertThresholdLabel, isValidEmailAddress } from '../lib/alerts';
import { useAlertPreferences, type SavedRouteAlertRecord } from '../providers/alert-preferences-provider';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

export default function SavedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const summaryQuery = useRiverSummaryQuery();
  const createAlertMutation = useCreateRiverAlertMutation();
  const { savedRivers, isHydrated, isSaved, toggleSavedRiver } = useSavedRivers();
  const { email: storedEmail, setEmail, routeAlerts, recordRouteAlert, alertForRiver } = useAlertPreferences();
  const [draftEmail, setDraftEmail] = useState(storedEmail);
  const [alertStatus, setAlertStatus] = useState('Saved route alerts use the same email for each route on this device.');
  const [pendingAlertKey, setPendingAlertKey] = useState<string | null>(null);

  const rivers = summaryQuery.data?.rivers ?? [];
  const riverLookup = new Map(rivers.map((river) => [river.river.slug, river]));
  const savedSummaries = savedRivers
    .map((savedRiver) => riverLookup.get(savedRiver.slug))
    .filter((river): river is NonNullable<typeof river> => Boolean(river));
  const savedAlertCount = useMemo(
    () => savedRivers.filter((river) => alertForRiver(river.slug)).length,
    [alertForRiver, savedRivers, routeAlerts]
  );

  useEffect(() => {
    setDraftEmail(storedEmail);
  }, [storedEmail]);

  async function submitSavedRouteAlert(river: RiverSummaryApiItem, threshold: RiverAlertThreshold) {
    const email = draftEmail.trim().toLowerCase();
    if (!isValidEmailAddress(email)) {
      setAlertStatus('Enter a valid email before saving route alerts.');
      return;
    }

    const key = `${river.river.slug}:${threshold}`;
    setPendingAlertKey(key);
    setAlertStatus(`Saving ${alertThresholdLabel(threshold)} alert for ${river.river.name}...`);
    try {
      await setEmail(email);
      const response = await createAlertMutation.mutateAsync({
        email,
        riverSlug: river.river.slug,
        threshold,
      });
      await recordRouteAlert({ riverSlug: river.river.slug, threshold, deliveryMethod: 'email' });
      setAlertStatus(alertMutationMessage(response, threshold));
    } catch (error) {
      setAlertStatus(
        error instanceof PaddleTodayApiError && error.message
          ? error.message
          : `Could not save the ${alertThresholdLabel(threshold)} alert right now.`
      );
    } finally {
      setPendingAlertKey(null);
    }
  }

  if (!isHydrated) {
    return (
      <AppLoadingState title="Loading saved rivers" />
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: spacing.md + insets.top }]}>
      <Text style={styles.kicker}>Saved</Text>
      <Text style={styles.title}>Your saved routes</Text>
      <Text style={styles.subtitle}>
        Quick access to rivers you check often.
      </Text>

      {savedRivers.length > 0 ? (
        <View style={styles.savedOverview}>
          <OverviewTile icon="bookmark-check-outline" label="Saved" value={String(savedRivers.length)} />
          <OverviewTile icon="bell-ring-outline" label="Watched" value={`${savedAlertCount}/${savedRivers.length}`} />
          <OverviewTile icon="waves" label="Current calls" value={`${savedSummaries.length}/${savedRivers.length}`} />
        </View>
      ) : null}

      {savedRivers.length === 0 ? (
        <View style={styles.emptyPanel}>
          <View style={styles.emptyIcon}>
            <MaterialCommunityIcons name="bookmark-outline" color={colors.accent} size={26} />
          </View>
          <Text style={styles.emptyTitle}>No saved rivers yet</Text>
          <Text style={styles.emptyBody}>
            Save repeat trips and local favorites here.
          </Text>
          <View style={styles.emptyActions}>
            <Pressable style={styles.primaryButton} onPress={() => router.push('/')}>
              <Text style={styles.primaryButtonText}>Find today's picks</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => router.push('/explore')}>
              <Text style={styles.secondaryButtonText}>Open map</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      {savedSummaries.length > 0 ? (
        <SectionCard
          title="Saved alerts"
          subtitle="Turn on Good or Strong email alerts for repeat routes."
        >
          <View style={styles.alertEmailRow}>
            <MaterialCommunityIcons name="email-outline" color={colors.accent} size={18} />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="you@example.com"
              placeholderTextColor={colors.textMuted}
              style={styles.alertInput}
              value={draftEmail}
              onChangeText={setDraftEmail}
            />
          </View>
          <View style={styles.alertRouteList}>
            {savedSummaries.map((river) => (
              <SavedAlertRow
                key={river.river.slug}
                river={river}
                alert={alertForRiver(river.river.slug)}
                pendingAlertKey={pendingAlertKey}
                onOpen={() => router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug } })}
                onSubmitAlert={(threshold) => void submitSavedRouteAlert(river, threshold)}
              />
            ))}
          </View>
          <Text style={styles.alertStatus}>{alertStatus}</Text>
        </SectionCard>
      ) : null}

      {savedSummaries.length > 0 ? (
        <SectionCard
          title="Saved rivers"
          subtitle="Current calls for your repeat trips."
        >
          <View style={styles.list}>
            {savedSummaries.map((river) => (
              <RiverCard
                key={river.river.slug}
                river={river}
                saved={isSaved(river.river.slug)}
                onToggleSaved={() =>
                  void toggleSavedRiver({
                    slug: river.river.slug,
                    riverId: river.river.riverId,
                    name: river.river.name,
                    reach: river.river.reach,
                  })
                }
                onPress={() => router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug } })}
              />
            ))}
          </View>
        </SectionCard>
      ) : null}

      {savedRivers.length > 0 && savedSummaries.length !== savedRivers.length ? (
        <SectionCard
          title="Saved routes without a call"
          subtitle="Still saved, but missing from today's calls."
        >
          <View style={styles.list}>
            {savedRivers
              .filter((river) => !riverLookup.has(river.slug))
              .map((river) => (
                <View key={river.slug} style={styles.savedFallbackCard}>
                  <View style={styles.savedFallbackCopy}>
                    <Text style={styles.savedFallbackName}>{river.name}</Text>
                    <Text style={styles.savedFallbackReach}>{river.reach}</Text>
                    <Text style={styles.savedFallbackNote}>
                      No call is available today.
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        </SectionCard>
      ) : null}

      {summaryQuery.isError ? (
        <View style={styles.offlineNote}>
          <MaterialCommunityIcons name="wifi-off" color={colors.noGo} size={18} />
          <Text style={styles.footnote}>
            Saved calls did not refresh. Your list is still here.
          </Text>
        </View>
      ) : null}

    </ScrollView>
  );
}

function OverviewTile({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.overviewTile}>
      <MaterialCommunityIcons name={icon as never} color={colors.accent} size={18} />
      <View style={styles.overviewCopy}>
        <Text style={styles.overviewLabel}>{label}</Text>
        <Text style={styles.overviewValue}>{value}</Text>
      </View>
    </View>
  );
}

function SavedAlertRow({
  river,
  alert,
  pendingAlertKey,
  onOpen,
  onSubmitAlert,
}: {
  river: RiverSummaryApiItem;
  alert?: SavedRouteAlertRecord;
  pendingAlertKey: string | null;
  onOpen: () => void;
  onSubmitAlert: (threshold: RiverAlertThreshold) => void;
}) {
  return (
    <View style={styles.savedAlertRow}>
      <Pressable style={styles.savedAlertCopy} onPress={onOpen}>
        <Text style={styles.savedAlertName}>{river.river.name}</Text>
        <Text style={styles.savedAlertReach} numberOfLines={1}>{river.river.reach}</Text>
        <Text style={styles.savedAlertState}>
          {alert ? `${alertThresholdLabel(alert.threshold)} ${alert.deliveryMethod} alert on` : 'No saved alert on this device'}
        </Text>
      </Pressable>
      <View style={styles.savedAlertActions}>
        {(['good', 'strong'] as const).map((threshold) => {
          const pending = pendingAlertKey === `${river.river.slug}:${threshold}`;
          const selected = alert?.threshold === threshold && alert.deliveryMethod === 'email';
          return (
            <Pressable
              key={threshold}
              style={[styles.alertMiniButton, selected ? styles.alertMiniButtonSelected : null, pending ? styles.alertMiniButtonDisabled : null]}
              disabled={pending}
              onPress={() => onSubmitAlert(threshold)}
            >
              <Text style={[styles.alertMiniButtonText, selected ? styles.alertMiniButtonTextSelected : null]}>
                {pending ? '...' : alertThresholdLabel(threshold)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
  },
  kicker: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  savedOverview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  overviewTile: {
    flexGrow: 1,
    flexBasis: '30%',
    minHeight: 58,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  overviewCopy: {
    gap: 2,
  },
  overviewLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  overviewValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  list: {
    gap: spacing.sm,
  },
  body: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  alertEmailRow: {
    minHeight: 46,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  alertInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    paddingVertical: spacing.sm,
  },
  alertRouteList: {
    gap: spacing.sm,
  },
  savedAlertRow: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  savedAlertCopy: {
    flex: 1,
    gap: 2,
  },
  savedAlertName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  savedAlertReach: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  savedAlertState: {
    color: colors.accentDeep,
    fontSize: 11,
    fontWeight: '800',
  },
  savedAlertActions: {
    flexDirection: 'row',
    gap: 6,
  },
  alertMiniButton: {
    minWidth: 54,
    minHeight: 34,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  alertMiniButtonSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  alertMiniButtonDisabled: {
    opacity: 0.6,
  },
  alertMiniButtonText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  alertMiniButtonTextSelected: {
    color: colors.surfaceStrong,
  },
  alertStatus: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  emptyPanel: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyBody: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  emptyActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  primaryButton: {
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  primaryButtonText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  secondaryButton: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  secondaryButtonText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  savedFallbackCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  savedFallbackCopy: {
    gap: 4,
  },
  savedFallbackName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  savedFallbackReach: {
    color: colors.textMuted,
    fontSize: 14,
  },
  savedFallbackNote: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  footnote: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    flex: 1,
  },
  offlineNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: '#F2DDD6',
    padding: spacing.md,
  },
});
