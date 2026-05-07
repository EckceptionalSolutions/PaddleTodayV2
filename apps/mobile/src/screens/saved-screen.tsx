import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRiverSummaryQuery } from '../api/queries';
import { AppLoadingState } from '../components/app-state';
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
      <AppLoadingState title="Loading saved rivers" />
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>Saved</Text>
      <Text style={styles.title}>Your saved routes</Text>
      <Text style={styles.subtitle}>
        Quick access to rivers you check often.
      </Text>

      {savedRivers.length === 0 ? (
        <View style={styles.emptyPanel}>
          <View style={styles.emptyIcon}>
            <MaterialCommunityIcons name="bookmark-outline" color={colors.accent} size={26} />
          </View>
          <Text style={styles.emptyTitle}>No saved rivers yet</Text>
          <Text style={styles.emptyBody}>
            Save routes you check often. This becomes a quick list for repeat trips and local favorites.
          </Text>
          <View style={styles.emptyActions}>
            <Pressable style={styles.primaryButton} onPress={() => router.push('/')}>
              <Text style={styles.primaryButtonText}>Find today’s picks</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => router.push('/explore')}>
              <Text style={styles.secondaryButtonText}>Open map</Text>
            </Pressable>
          </View>
        </View>
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
          title="Saved routes without a current call"
          subtitle="They are still saved here, but today’s route list did not include a current call."
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
                      A current call is not available for this route right now.
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
            Saved route calls could not refresh. Your saved list is still available.
          </Text>
        </View>
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
