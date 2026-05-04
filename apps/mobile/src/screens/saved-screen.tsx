import { useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRiverSummaryQuery } from '../api/queries';
import { RiverCard } from '../components/river-card';
import { SectionCard } from '../components/section-card';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

export default function SavedScreen() {
  const router = useRouter();
  const summaryQuery = useRiverSummaryQuery();
  const { savedRivers, isHydrated, isSaved, toggleSavedRiver } = useSavedRivers();

  const rivers = summaryQuery.data?.rivers ?? [];
  const riverLookup = new Map(rivers.map((river) => [river.river.slug, river]));
  const savedSummaries = savedRivers
    .map((savedRiver) => riverLookup.get(savedRiver.slug))
    .filter((river): river is NonNullable<typeof river> => Boolean(river));

  if (!isHydrated) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.stateTitle}>Loading saved rivers</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>Saved</Text>
      <Text style={styles.title}>Keep your repeat trips close at hand.</Text>
      <Text style={styles.subtitle}>
        Saved rivers stay on this device for faster repeat checks.
      </Text>

      {savedRivers.length === 0 ? (
        <SectionCard
          title="No saved rivers yet"
          subtitle="Save a river from the Today board or a river detail screen to build a quicker personal shortlist."
        >
          <Text style={styles.body}>
            Save a route from Today, Explore, Weekend, or river detail. Once it is saved, this screen becomes your repeat-use shortlist.
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
                </View>
              ))}
          </View>
        </SectionCard>
      ) : null}

      {summaryQuery.isError ? (
        <Text style={styles.footnote}>
          Live saved-river cards could not refresh. Local saved routes still work.
        </Text>
      ) : null}

    </ScrollView>
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
  list: {
    gap: spacing.sm,
  },
  body: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
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
