import type { WeekendSummaryApiItem } from '@paddletoday/api-contract';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWeekendSummaryQuery } from '../api/queries';
import { AppErrorState, AppLoadingState } from '../components/app-state';
import { SectionCard } from '../components/section-card';
import { WeekendRiverCard } from '../components/weekend-river-card';
import { useStoredLocation } from '../hooks/use-stored-location';
import { resolveApiBaseUrl } from '../lib/api-base-url';
import { normalizeApiText } from '../lib/format';
import { distanceMiles, distancePenalty, estimateTravelMinutes, formatTravelTime, type StoredLocation } from '../lib/location';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

interface WeekendRoute extends WeekendSummaryApiItem {
  distanceMiles: number | null;
  travelMinutes: number | null;
  travelLabel: string | null;
  weekendRank: number;
}

const weekendConfidenceRank = {
  High: 3,
  Medium: 2,
  Low: 1,
};

export default function WeekendScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const weekendQuery = useWeekendSummaryQuery();
  const { location, status, requestLocation, clearLocation } = useStoredLocation();
  const { isSaved, toggleSavedRiver } = useSavedRivers();

  const rivers = useMemo(
    () => rankWeekendRoutes(weekendQuery.data?.rivers ?? [], location),
    [weekendQuery.data?.rivers, location]
  );
  const topPicks = rivers.filter((river) => river.weekend.rating === 'Strong' || river.weekend.rating === 'Good').slice(0, 5);
  const featured = topPicks[0] ?? rivers[0];
  const hasWeekendPlan = topPicks.length > 0;
  const topPickSlugs = slugSet(topPicks);
  const lowerCommitment = rivers
    .filter((river) => !topPickSlugs.has(river.river.slug))
    .filter(isLowerCommitmentRoute)
    .slice(0, 4);
  const secondarySlugs = slugSet([...topPicks, ...lowerCommitment]);
  const campingRoutes = rivers
    .filter((river) => !secondarySlugs.has(river.river.slug))
    .filter((river) => location ? isWorthLongerDriveRoute(river) : hasOvernightCampingSupport(river))
    .slice(0, 4);
  const shownSlugs = slugSet([...topPicks, ...lowerCommitment, ...campingRoutes]);
  const watchList = rivers
    .filter((river) => !shownSlugs.has(river.river.slug))
    .filter((river) => river.weekend.rating === 'Fair')
    .slice(0, 5);
  const locationLabel = location?.label ?? null;

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
      contentContainerStyle={[styles.content, { paddingTop: spacing.md + insets.top }]}
      refreshControl={
        <RefreshControl
          tintColor={colors.accent}
          refreshing={weekendQuery.isRefetching}
          onRefresh={() => weekendQuery.refetch()}
        />
      }
    >
      <View style={styles.hero}>
        <Text style={styles.title}>Plan the weekend</Text>
        <Text style={styles.subtitle}>
          {location
            ? 'Ranked by forecast, river shape, confidence, and drive time.'
            : 'Add location to rank realistic drives first.'}
        </Text>

        <WeekendLocationStrip
          locationLabel={locationLabel}
          status={status}
          onUseLocation={() => void requestLocation()}
          onClear={() => void clearLocation()}
        />

        <View style={styles.heroPanel}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroLabel} numberOfLines={1}>
              {location ? `Near ${location.label}` : hasWeekendPlan ? (weekendQuery.data?.label ?? 'Weekend outlook') : 'Across supported routes'}
            </Text>
            <Text style={styles.heroFreshness}>{location ? 'Drive-aware' : hasWeekendPlan ? 'Forecast-aware' : 'No clean plan'}</Text>
          </View>

          <View style={styles.snapshotRow}>
            <SnapshotStat label="Strong" value={rivers.filter((river) => river.weekend.rating === 'Strong').length} tone={styles.snapshotStrong} />
            <SnapshotStat label="Good" value={rivers.filter((river) => river.weekend.rating === 'Good').length} tone={styles.snapshotGood} />
            <SnapshotStat label="Watch" value={watchList.length} tone={styles.snapshotWatch} />
          </View>

          {featured && hasWeekendPlan ? (
            <View style={styles.featuredBlock}>
              <Text style={styles.featuredLabel}>{location ? 'Top nearby weekend pick' : 'Top weekend pick'}</Text>
              <Text style={styles.featuredName}>{featured.river.name}</Text>
              <Text style={styles.featuredReach}>{featured.river.reach}</Text>
              <View style={styles.featuredFacts}>
                {weekendFacts(featured).map((fact) => (
                  <Text key={fact} style={styles.featuredFact}>{fact}</Text>
                ))}
              </View>
              <Text style={styles.featuredSummary}>{weekendHeroSummary(featured)}</Text>
            </View>
          ) : featured ? (
            <View style={styles.featuredBlock}>
              <Text style={styles.featuredLabel}>No clean weekend plan</Text>
              <Text style={styles.featuredName}>{featured.river.name}</Text>
              <Text style={styles.featuredReach}>{featured.river.reach}</Text>
              <View style={styles.featuredFacts}>
                {weekendFacts(featured).map((fact) => (
                  <Text key={fact} style={styles.featuredFact}>{fact}</Text>
                ))}
              </View>
              <Text style={styles.featuredSummary}>No Good routes yet. Recheck before planning.</Text>
            </View>
          ) : (
            <Text style={styles.emptyText}>
              No strong weekend picks are available right now. Use Today or Explore for current route calls and check back as the forecast changes.
            </Text>
          )}
        </View>
      </View>

      {hasWeekendPlan ? (
        <WeekendPlanLanes
          dayTrips={topPicks.length + lowerCommitment.length}
          longerDrives={campingRoutes.length}
          rechecks={watchList.length}
          hasWeekendPlan={hasWeekendPlan}
        />
      ) : null}

      {topPicks.length > 0 ? (
        <SectionCard
          title={location ? 'Best near you' : 'Best weekend'}
          subtitle={location ? 'Good weekend calls with drive time included.' : 'Good options if the forecast holds.'}
        >
          <View style={styles.list}>
            {topPicks.map((river) => (
              <WeekendRiverCard
                key={river.river.slug}
                river={river}
                travelLabel={river.travelLabel}
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
          subtitle={location ? 'Easier or shorter options after the top nearby picks.' : 'Shorter, easier routes.'}
        >
          <View style={styles.list}>
            {lowerCommitment.map((river) => renderWeekendCard(river))}
          </View>
        </SectionCard>
      ) : null}

      {campingRoutes.length > 0 ? (
        <SectionCard
          title={location ? 'Overnight-friendly drives' : 'Overnight-friendly'}
          subtitle={location ? 'Good weekend calls with stronger camping support.' : 'Routes with on-route or overnight camping support.'}
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
            ? 'Possible options to re-check as the forecast settles.'
            : 'No watch-list routes right now.'
        }
      >
        {watchList.length > 0 ? (
          <View style={styles.list}>
            {watchList.map((river) => (
              renderWeekendCard(river)
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>No weekend routes are in the maybe range right now.</Text>
        )}
      </SectionCard>

    </ScrollView>
  );

  function renderWeekendCard(river: WeekendSummaryApiItem) {
    const route = river as WeekendRoute;
    return (
      <WeekendRiverCard
        key={river.river.slug}
        river={river}
        travelLabel={route.travelLabel}
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

function WeekendLocationStrip({
  locationLabel,
  status,
  onUseLocation,
  onClear,
}: {
  locationLabel: string | null;
  status: string;
  onUseLocation: () => void;
  onClear: () => void;
}) {
  const requesting = status === 'requesting';

  return (
    <View style={styles.locationStrip}>
      <View style={styles.locationCopy}>
        <Text style={styles.locationLabel} numberOfLines={1}>
          {locationLabel ? `Planning from ${locationLabel}` : 'Plan from your location'}
        </Text>
        <Text style={styles.locationHint}>
          {locationLabel ? 'Drive times included.' : 'Use location for drive-aware picks.'}
        </Text>
      </View>
      <Pressable
        style={[styles.locationButton, requesting ? styles.locationButtonDisabled : null]}
        disabled={requesting}
        onPress={locationLabel ? onClear : onUseLocation}
      >
        <Text style={styles.locationButtonText}>
          {requesting ? 'Finding' : locationLabel ? 'Clear' : status === 'denied' ? 'Retry' : 'Use'}
        </Text>
      </Pressable>
    </View>
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

function WeekendPlanLanes({
  dayTrips,
  longerDrives,
  rechecks,
  hasWeekendPlan,
}: {
  dayTrips: number;
  longerDrives: number;
  rechecks: number;
  hasWeekendPlan: boolean;
}) {
  return (
    <View style={styles.planLanes}>
      <Text style={styles.planLanesTitle}>Plan lanes</Text>
      <View style={styles.planLaneGrid}>
        <PlanLane label="Day trips" value={dayTrips} active={dayTrips > 0} />
        <PlanLane label="Longer drives" value={longerDrives} active={longerDrives > 0} />
        <PlanLane label={hasWeekendPlan ? 'Rechecks' : 'Recheck later'} value={rechecks} active={!hasWeekendPlan || rechecks > 0} />
      </View>
    </View>
  );
}

function PlanLane({ label, value, active }: { label: string; value: number; active: boolean }) {
  return (
    <View style={[styles.planLane, active ? styles.planLaneActive : null]}>
      <Text style={styles.planLaneValue}>{value}</Text>
      <Text style={styles.planLaneLabel}>{label}</Text>
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

  const route = river as WeekendRoute;
  const distance = parseFloat(river.river.distanceLabel);
  return (
    river.river.difficulty === 'easy' ||
    (Number.isFinite(distance) && distance <= 8) ||
    (route.travelMinutes !== null && route.travelMinutes <= 120)
  );
}

function isWorthLongerDriveRoute(river: WeekendSummaryApiItem) {
  const route = river as WeekendRoute;
  return (
    (river.weekend.rating === 'Strong' || river.weekend.rating === 'Good') &&
    route.travelMinutes !== null &&
    route.travelMinutes > 120 &&
    hasOvernightCampingSupport(river)
  );
}

function hasWeekendCampingSupport(river: WeekendSummaryApiItem) {
  if (river.weekend.rating !== 'Strong' && river.weekend.rating !== 'Good') {
    return false;
  }

  const classification = river.river.logistics?.campingClassification;
  return classification !== undefined && classification !== 'none' && classification !== 'unknown';
}

function hasOvernightCampingSupport(river: WeekendSummaryApiItem) {
  if (!hasWeekendCampingSupport(river)) {
    return false;
  }

  const classification = river.river.logistics?.campingClassification;
  return (
    classification === 'overnight_capable' ||
    classification === 'on_route_campsite' ||
    classification === 'sandbar_or_gravel_bar'
  );
}

function weekendFacts(river: WeekendSummaryApiItem) {
  const route = river as WeekendRoute;
  return [
    route.travelLabel || null,
    river.river.distanceLabel || null,
    river.river.estimatedPaddleTime || null,
    `${capitalize(river.river.difficulty)} difficulty`,
    campingFact(river),
  ].filter(Boolean) as string[];
}

function campingFact(river: WeekendSummaryApiItem) {
  const classification = river.river.logistics?.campingClassification;
  if (classification === 'nearby_basecamp') return 'Camp nearby';
  if (classification === 'endpoint_campground') return 'Campground access';
  if (classification === 'sandbar_or_gravel_bar') return 'Sandbar camping';
  if (classification === 'on_route_campsite' || classification === 'overnight_capable') return 'Overnight-friendly';
  return null;
}

function rankWeekendRoutes(rivers: WeekendSummaryApiItem[], location: StoredLocation | null): WeekendRoute[] {
  return rivers
    .map((river) => {
      const miles = location
        ? distanceMiles(location.latitude, location.longitude, river.river.latitude, river.river.longitude)
        : null;
      const travelMinutes = miles === null ? null : estimateTravelMinutes(miles);
      const confidenceBonus = (weekendConfidenceRank[river.weekend.confidence] ?? 0) * 3;
      const travelPenalty = travelMinutes === null ? 0 : distancePenalty(travelMinutes);
      const weekendRank = river.weekend.score + confidenceBonus - travelPenalty;

      return {
        ...river,
        distanceMiles: miles,
        travelMinutes,
        travelLabel: travelMinutes === null ? null : formatTravelTime(travelMinutes),
        weekendRank,
      };
    })
    .sort((left, right) => {
      if (left.weekendRank !== right.weekendRank) {
        return right.weekendRank - left.weekendRank;
      }

      if (left.travelMinutes !== null && right.travelMinutes !== null && left.travelMinutes !== right.travelMinutes) {
        return left.travelMinutes - right.travelMinutes;
      }

      return right.weekend.score - left.weekend.score;
    });
}

function weekendHeroSummary(river: WeekendSummaryApiItem) {
  const summary = normalizeApiText(river.weekend.summary);
  return summary;
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
  locationStrip: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  locationCopy: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  locationLabel: {
    minWidth: 0,
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  locationHint: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  locationButton: {
    flexShrink: 0,
    minHeight: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationButtonDisabled: {
    opacity: 0.64,
  },
  locationButtonText: {
    color: colors.surfaceStrong,
    fontSize: 12,
    fontWeight: '900',
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
    alignItems: 'center',
    gap: spacing.md,
  },
  heroLabel: {
    flex: 1,
    minWidth: 0,
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  heroFreshness: {
    flexShrink: 0,
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
  planLanes: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  planLanesTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  planLaneGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  planLane: {
    flex: 1,
    minHeight: 70,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.sm,
    justifyContent: 'center',
    gap: 3,
  },
  planLaneActive: {
    backgroundColor: '#F3E8CC',
  },
  planLaneValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  planLaneLabel: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.25,
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
