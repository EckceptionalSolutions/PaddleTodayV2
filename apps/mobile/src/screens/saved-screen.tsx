import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { RiverAlertThreshold } from '@paddletoday/api-contract';
import { PaddleTodayApiError } from '@paddletoday/api-client';
import { useCreateRiverAlertMutation, useRiverSummaryQuery } from '../api/queries';
import { RiverCard } from '../components/river-card';
import { SectionCard } from '../components/section-card';
import { alertMutationMessage, alertThresholdLabel, isValidEmailAddress } from '../lib/alerts';
import { useAlertPreferences } from '../providers/alert-preferences-provider';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

export default function SavedScreen() {
  const router = useRouter();
  const summaryQuery = useRiverSummaryQuery();
  const createAlertMutation = useCreateRiverAlertMutation();
  const { email: storedEmail, isHydrated: isAlertPrefsHydrated, setEmail } = useAlertPreferences();
  const { savedRivers, isHydrated, isSaved, toggleSavedRiver } = useSavedRivers();
  const [draftEmail, setDraftEmail] = useState(storedEmail);
  const [activeAlertKey, setActiveAlertKey] = useState<string | null>(null);
  const [alertMessages, setAlertMessages] = useState<Record<string, string>>({});

  const rivers = summaryQuery.data?.rivers ?? [];
  const riverLookup = new Map(rivers.map((river) => [river.river.slug, river]));
  const savedSummaries = savedRivers
    .map((savedRiver) => riverLookup.get(savedRiver.slug))
    .filter((river): river is NonNullable<typeof river> => Boolean(river));

  useEffect(() => {
    setDraftEmail(storedEmail);
  }, [storedEmail]);

  if (!isHydrated || !isAlertPrefsHydrated) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.stateTitle}>Loading saved rivers</Text>
      </View>
    );
  }

  async function submitAlert(args: {
    slug: string;
    riverName: string;
    reach: string;
    threshold: RiverAlertThreshold;
  }) {
    const email = draftEmail.trim().toLowerCase();
    if (!isValidEmailAddress(email)) {
      setAlertMessages((current) => ({
        ...current,
        [args.slug]: 'Enter a valid email address before turning on alerts.',
      }));
      return;
    }

    const requestKey = `${args.slug}:${args.threshold}`;
    setActiveAlertKey(requestKey);

    try {
      await setEmail(email);
      const response = await createAlertMutation.mutateAsync({
        email,
        riverSlug: args.slug,
        threshold: args.threshold,
      });

      setAlertMessages((current) => ({
        ...current,
        [args.slug]: alertMutationMessage(response, args.threshold),
      }));
    } catch (error) {
      const message =
        error instanceof PaddleTodayApiError && error.message
          ? error.message
          : `Could not save the ${alertThresholdLabel(args.threshold)} alert right now.`;
      setAlertMessages((current) => ({
        ...current,
        [args.slug]: message,
      }));
    } finally {
      setActiveAlertKey(null);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>Saved and alerts</Text>
      <Text style={styles.title}>Keep your repeat trips close at hand.</Text>
      <Text style={styles.subtitle}>
        Saved rivers stay on this device. Email alerts can watch for Good or Strong route conditions.
      </Text>

      <SectionCard
        title="Alert email"
        subtitle="Use one email address here, then turn on Good or Strong alerts for any saved route."
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={draftEmail}
          onChangeText={setDraftEmail}
        />
        <Text style={styles.body}>
          Alerts only email on a new threshold crossing, so repeat updates do not keep sending for the same condition.
        </Text>
      </SectionCard>

      {savedRivers.length === 0 ? (
        <SectionCard
          title="No saved rivers yet"
          subtitle="Save a river from the Today board or a river detail screen to build a quicker personal shortlist."
        >
          <Text style={styles.body}>
            Save a route from Today, Weekend, or river detail. Once it is saved, this screen becomes the repeat-use shortlist and alert surface.
          </Text>
        </SectionCard>
      ) : null}

      {savedSummaries.length > 0 ? (
        <SectionCard
          title="Saved rivers"
          subtitle="These are live cards, backed by the same summary API as the home screen."
        >
          <View style={styles.list}>
            {savedSummaries.map((river) => (
              <View key={river.river.slug} style={styles.savedCardWrap}>
                <RiverCard
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
                <AlertActions
                  pendingKey={activeAlertKey}
                  message={alertMessages[river.river.slug]}
                  onSubmit={(threshold) =>
                    void submitAlert({
                      slug: river.river.slug,
                      riverName: river.river.name,
                      reach: river.river.reach,
                      threshold,
                    })
                  }
                  slug={river.river.slug}
                />
              </View>
            ))}
          </View>
        </SectionCard>
      ) : null}

      {savedRivers.length > 0 && savedSummaries.length !== savedRivers.length ? (
        <SectionCard
          title="Saved routes waiting on live data"
          subtitle="These are saved locally, but the current summary board did not include them."
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
                      Live summary data is not available for this route right now.
                    </Text>
                  </View>
                  <AlertActions
                    pendingKey={activeAlertKey}
                    message={alertMessages[river.slug]}
                    onSubmit={(threshold) =>
                      void submitAlert({
                        slug: river.slug,
                        riverName: river.name,
                        reach: river.reach,
                        threshold,
                      })
                    }
                    slug={river.slug}
                  />
                </View>
              ))}
          </View>
        </SectionCard>
      ) : null}

      {summaryQuery.isError ? (
        <Text style={styles.footnote}>
          Live saved-river cards could not refresh. Local saved routes and alert signup still work.
        </Text>
      ) : null}

      <Pressable style={styles.requestCallout} onPress={() => router.push('/request-route')}>
        <View style={styles.requestCalloutCopy}>
          <Text style={styles.requestCalloutLabel}>Regular route missing?</Text>
          <Text style={styles.requestCalloutTitle}>Request a route</Text>
          <Text style={styles.requestCalloutBody}>
            Send the river, stretch, and any gauge or access links you know.
          </Text>
        </View>
        <Text style={styles.requestCalloutAction}>Open</Text>
      </Pressable>
    </ScrollView>
  );
}

function AlertActions({
  slug,
  pendingKey,
  message,
  onSubmit,
}: {
  slug: string;
  pendingKey: string | null;
  message?: string;
  onSubmit: (threshold: RiverAlertThreshold) => void;
}) {
  return (
    <View style={styles.alertPanel}>
      <Text style={styles.alertPanelLabel}>Email alerts</Text>
      <View style={styles.alertButtonRow}>
        {(['good', 'strong'] as const).map((threshold) => {
          const isPending = pendingKey === `${slug}:${threshold}`;
          return (
            <Pressable
              key={threshold}
              style={[styles.alertButton, isPending ? styles.alertButtonDisabled : null]}
              disabled={isPending}
              onPress={() => onSubmit(threshold)}
            >
              <Text style={styles.alertButtonText}>
                {isPending ? 'Saving...' : `Notify at ${alertThresholdLabel(threshold)}`}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.alertHelpText}>
        {message ?? 'Turn on alerts when this route reaching Good or Strong would change your plan.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
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
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  list: {
    gap: spacing.sm,
  },
  bullet: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  body: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  savedCardWrap: {
    gap: spacing.sm,
  },
  savedFallbackCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
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
  alertPanel: {
    backgroundColor: colors.canvasMuted,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  alertPanelLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  alertButtonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  alertButton: {
    flex: 1,
    minWidth: 140,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  alertButtonDisabled: {
    opacity: 0.6,
  },
  alertButtonText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '700',
  },
  alertHelpText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  footnote: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  requestCallout: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  requestCalloutCopy: {
    flex: 1,
    gap: 4,
  },
  requestCalloutLabel: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  requestCalloutTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  requestCalloutBody: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  requestCalloutAction: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '900',
  },
  centerState: {
    flex: 1,
    backgroundColor: colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.xl,
  },
  stateTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
});
