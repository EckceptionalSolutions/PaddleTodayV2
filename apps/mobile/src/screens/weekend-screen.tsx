import type { WeekendSummaryApiItem } from '@paddletoday/api-contract';
import { useRouter } from 'expo-router';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useWeekendSummaryQuery } from '../api/queries';
import { AppErrorState, AppLoadingState } from '../components/app-state';
import { SectionCard } from '../components/section-card';
import { WeekendRiverCard } from '../components/weekend-river-card';
import { resolveApiBaseUrl } from '../lib/api-base-url';
import { normalizeApiText } from '../lib/format';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

export default function WeekendScreen() {
  const router = useRouter();
  const weekendQuery = useWeekendSummaryQuery();
  const { isSaved, toggleSavedRiver } = useSavedRivers();

  const rivers = [...(weekendQuery.data?.rivers ?? [])].sort((left, right) => right.weekend.score - left.weekend.score);
  const featured = rivers[0];
  const topPicks = rivers.filter((river) => river.weekend.rating === 'Strong' || river.weekend.rating === 'Good').slice(0, 5);
  const topPickSlugs = slugSet(topPicks);
  const lowerCommitment = rivers
    .filter((river) => !topPickSlugs.has(river.river.slug))
    .filter(isLowerCommitmentRoute)
    .slice(0, 4);
  const secondarySlugs = slugSet([...topPicks, ...lowerCommitment]);
  const campingRoutes = rivers
    .filter((river) => !secondarySlugs.has(river.river.slug))
    .filter(hasCamping)
    .slice(0, 4);
  const shownSlugs = slugSet([...topPicks, ...lowerCommitment, ...campingRoutes]);
  const watchList = rivers
    .filter((river) => !shownSlugs.has(river.river.slug))
    .filter((river) => river.weekend.rating === 'Fair')
    .slice(0, 5);

  if (weekendQuery.isLoading && rivers.length === 0) {
    return (
      <AppLoadingState title="Loading weekend routes" body="Checking the weekend outlook." />
    );
  }

  if (weekendQuery.isError && rivers.length === 0) {
    return (
      <AppErrorState
        title="Weekend outlook did not load"
        body="Check your connection, then try again."
        detail={errorDetailForWeekendQuery(weekendQuery.error)}
        onRetry={() => weekendQuery.refetch()}
      />
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
        <Text style={styles.title}>Plan the weekend</Text>
        <Text style={styles.subtitle}>
          Start with strong options, then narrow by trip size, camping, and forecast risk.
        </Text>

        <View style={styles.heroPanel}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroLabel}>{weekendQuery.data?.label ?? 'Weekend outlook'}</Text>
            <Text style={styles.heroFreshness}>Forecast-aware</Text>
          </View>

          <View style={styles.snapshotRow}>
            <SnapshotStat label="Strong" value={rivers.filter((river) => river.weekend.rating === 'Strong').length} tone={styles.snapshotStrong} />
            <SnapshotStat label="Good" value={rivers.filter((river) => river.weekend.rating === 'Good').length} tone={styles.snapshotGood} />
            <SnapshotStat label="Watch" value={watchList.length} tone={styles.snapshotWatch} />
          </View>

          {featured ? (
            <View style={styles.featuredBlock}>
              <Text style={styles.featuredLabel}>Top weekend pick</Text>
              <Text style={styles.featuredName}>{featured.river.name}</Text>
              <Text style={styles.featuredReach}>{featured.river.reach}</Text>
              <View style={styles.featuredFacts}>
                {weekendFacts(featured).map((fact) => (
                  <Text key={fact} style={styles.featuredFact}>{fact}</Text>
                ))}
              </View>
              <Text style={styles.featuredSummary}>{normalizeApiText(featured.weekend.summary)}</Text>
            </View>
          ) : (
            <Text style={styles.emptyText}>No supported weekend picks are available yet.</Text>
          )}
        </View>
      </View>

      {topPicks.length > 0 ? (
        <SectionCard
          title="Best weekend"
          subtitle="Good options if the forecast holds."
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

      {lowerCommitment.length > 0 ? (
        <SectionCard
          title="Lower commitment"
          subtitle="Shorter, easier routes."
        >
          <View style={styles.list}>
            {lowerCommitment.map((river) => renderWeekendCard(river))}
          </View>
        </SectionCard>
      ) : null}

      {campingRoutes.length > 0 ? (
        <SectionCard
          title="Camping possible"
          subtitle="Routes with camping notes."
        >
          <View style={styles.list}>
            {campingRoutes.map((river) => renderWeekendCard(river))}
          </View>
        </SectionCard>
      ) : null}

      <SectionCard
        title="Watch list"
        subtitle={
          watchList.length > 0
            ? 'Possible options that need another check.'
            : 'No maybe routes today.'
        }
      >
        {watchList.length > 0 ? (
          <View style={styles.list}>
            {watchList.map((river) => (
              renderWeekendCard(river)
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>No weekend routes are in the maybe range.</Text>
        )}
      </SectionCard>

    </ScrollView>
  );

  function renderWeekendCard(river: WeekendSummaryApiItem) {
    return (
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
    );
  }
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

function slugSet(rivers: WeekendSummaryApiItem[]) {
  return new Set(rivers.map((river) => river.river.slug));
}

function isLowerCommitmentRoute(river: WeekendSummaryApiItem) {
  if (river.weekend.rating !== 'Strong' && river.weekend.rating !== 'Good') {
    return false;
  }

  const distance = parseFloat(river.river.distanceLabel);
  return river.river.difficulty === 'easy' || (Number.isFinite(distance) && distance <= 8);
}

function hasCamping(river: WeekendSummaryApiItem) {
  if (river.weekend.rating !== 'Strong' && river.weekend.rating !== 'Good') {
    return false;
  }

  const camping = normalizeApiText(river.river.logistics?.camping).toLowerCase();
  return camping.length > 0 && !camping.startsWith('none') && !camping.startsWith('no ');
}

function weekendFacts(river: WeekendSummaryApiItem) {
  return [
    river.river.distanceLabel || null,
    river.river.estimatedPaddleTime || null,
    `${capitalize(river.river.difficulty)} difficulty`,
    hasCamping(river) ? 'Camping possible' : null,
  ].filter(Boolean) as string[];
}

function capitalize(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}

function errorDetailForWeekendQuery(error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown request error';
  return `${resolveApiBaseUrl()} - ${message}`;
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
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  heroPanel: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
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
    fontSize: 22,
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
    fontSize: 19,
    fontWeight: '800',
  },
  featuredReach: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  featuredFacts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: spacing.xs,
  },
  featuredFact: {
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 9,
    paddingVertical: 5,
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
});
