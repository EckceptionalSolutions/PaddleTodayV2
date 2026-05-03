import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useWeekendSummaryQuery } from '../api/queries';
import { SectionCard } from '../components/section-card';
import { WeekendRiverCard } from '../components/weekend-river-card';
import { formatRelativeTime, normalizeApiText } from '../lib/format';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

export default function WeekendScreen() {
  const router = useRouter();
  const weekendQuery = useWeekendSummaryQuery();
  const { isSaved, toggleSavedRiver } = useSavedRivers();

  const rivers = [...(weekendQuery.data?.rivers ?? [])].sort((left, right) => right.weekend.score - left.weekend.score);
  const featured = rivers[0];
  const topPicks = rivers.filter((river) => river.weekend.rating === 'Strong' || river.weekend.rating === 'Good').slice(0, 5);
  const watchList = rivers.filter((river) => river.weekend.rating === 'Fair').slice(0, 5);

  if (weekendQuery.isLoading && rivers.length === 0) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.stateTitle}>Loading weekend board</Text>
        <Text style={styles.stateBody}>Pulling the latest stored weekend outlook.</Text>
      </View>
    );
  }

  if (weekendQuery.isError && rivers.length === 0) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.stateTitle}>Weekend outlook did not load.</Text>
        <Text style={styles.stateBody}>Couldn't load weekend data. Pull to retry.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          tintColor={colors.accent}
          refreshing={weekendQuery.isRefetching}
          onRefresh={() => weekendQuery.refetch()}
        />
      }
    >
      <View style={styles.hero}>
        <Text style={styles.kicker}>Weekend planning</Text>
        <Text style={styles.title}>Best picks this weekend</Text>
        <Text style={styles.subtitle}>
          Use the weekend board for shortlist planning. Conclusions first, forecast caveats second.
        </Text>

        <View style={styles.heroPanel}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroLabel}>{weekendQuery.data?.label ?? 'Weekend outlook'}</Text>
            <Text style={styles.heroFreshness}>{formatRelativeTime(weekendQuery.data?.generatedAt)}</Text>
          </View>

          <View style={styles.snapshotRow}>
            <SnapshotStat label="Strong" value={rivers.filter((river) => river.weekend.rating === 'Strong').length} tone={styles.snapshotStrong} />
            <SnapshotStat label="Good" value={rivers.filter((river) => river.weekend.rating === 'Good').length} tone={styles.snapshotGood} />
            <SnapshotStat label="Watch" value={weekendQuery.data?.withheldCount ?? 0} tone={styles.snapshotWatch} />
          </View>

          {featured ? (
            <View style={styles.featuredBlock}>
              <Text style={styles.featuredLabel}>Top weekend pick</Text>
              <Text style={styles.featuredName}>{featured.river.name}</Text>
              <Text style={styles.featuredReach}>{featured.river.reach}</Text>
              <Text style={styles.featuredSummary}>{normalizeApiText(featured.weekend.summary)}</Text>
            </View>
          ) : (
            <Text style={styles.emptyText}>No supported weekend picks are available yet.</Text>
          )}
        </View>
      </View>

      {topPicks.length > 0 ? (
        <SectionCard
          title="Weekend shortlist"
          subtitle="Routes that already look actionable if the forecast holds."
        >
          <View style={styles.list}>
            {topPicks.map((river) => (
              <WeekendRiverCard
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

      <SectionCard
        title="Watch list"
        subtitle={
          watchList.length > 0
            ? 'Promising routes that still need cleaner support before they become a recommendation.'
            : 'Nothing is sitting in the middle right now.'
        }
      >
        {watchList.length > 0 ? (
          <View style={styles.list}>
            {watchList.map((river) => (
              <WeekendRiverCard
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
        ) : (
          <Text style={styles.emptyText}>The board is either clearly good or still too weak to support a watch list.</Text>
        )}
      </SectionCard>

      <Pressable style={styles.requestCallout} onPress={() => router.push('/request-route')}>
        <View style={styles.requestCalloutCopy}>
          <Text style={styles.requestCalloutLabel}>Missing a weekend route?</Text>
          <Text style={styles.requestCalloutTitle}>Request a river or route</Text>
          <Text style={styles.requestCalloutBody}>
            Send a stretch you paddle and any gauge or access links that would help review it.
          </Text>
        </View>
        <Text style={styles.requestCalloutAction}>Open</Text>
      </Pressable>
    </ScrollView>
  );
}

function SnapshotStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: object;
}) {
  return (
    <View style={[styles.snapshotCard, tone]}>
      <Text style={styles.snapshotValue}>{value}</Text>
      <Text style={styles.snapshotLabel}>{label}</Text>
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
  hero: {
    gap: spacing.md,
  },
  kicker: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  heroPanel: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  heroLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  heroFreshness: {
    color: colors.textMuted,
    fontSize: 13,
  },
  snapshotRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  snapshotCard: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 4,
  },
  snapshotStrong: {
    backgroundColor: '#E0EFE9',
  },
  snapshotGood: {
    backgroundColor: '#E6EDD9',
  },
  snapshotWatch: {
    backgroundColor: '#F3E8CC',
  },
  snapshotValue: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  snapshotLabel: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  featuredBlock: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 4,
  },
  featuredLabel: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  featuredName: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  featuredReach: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  featuredSummary: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  list: {
    gap: spacing.md,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
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
  stateBody: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
