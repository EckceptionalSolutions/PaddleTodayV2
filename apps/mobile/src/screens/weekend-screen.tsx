import type { WeekendSummaryApiItem } from '@paddletoday/api-contract';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWeekendSummaryQuery } from '../api/queries';
import { AppErrorState, AppLoadingState, AppRefreshNotice } from '../components/app-state';
import { SectionCard } from '../components/section-card';
import { WeekendRiverCard } from '../components/weekend-river-card';
import { useStoredLocation } from '../hooks/use-stored-location';
import { resolveApiBaseUrl } from '../lib/api-base-url';
import { normalizeApiText } from '../lib/format';
import { distanceMiles, distancePenalty, estimateTravelMinutes, formatTravelTime, type StoredLocation } from '../lib/location';
import { androidBottomInset } from '../lib/safe-area';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

interface WeekendRoute extends WeekendSummaryApiItem {
  distanceMiles: number | null;
  travelMinutes: number | null;
  travelLabel: string | null;
  weekendRank: number;
}

type WeekendFilter = 'all' | 'day-trips' | 'camping' | 'rechecks';

const weekendConfidenceRank = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const weekendDistanceOptions = [
  { label: '100 mi', value: 100 },
  { label: '200 mi', value: 200 },
  { label: '300 mi', value: 300 },
  { label: '500 mi', value: 500 },
  { label: 'Any', value: null },
];

const DEFAULT_WEEKEND_DISTANCE_LIMIT = 300;
const WEEKEND_DISTANCE_STORAGE_KEY = 'paddletoday:weekend-distance-limit:v1';

export default function WeekendScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomContentInset = androidBottomInset(insets.bottom);
  const weekendQuery = useWeekendSummaryQuery();
  const { location, status, requestLocation, clearLocation } = useStoredLocation();
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const [distanceLimit, setDistanceLimit] = useState<number | null>(DEFAULT_WEEKEND_DISTANCE_LIMIT);
  const [distanceHydrated, setDistanceHydrated] = useState(false);
  const [weekendFilter, setWeekendFilter] = useState<WeekendFilter>('all');

  const rivers = useMemo(
    () => rankWeekendRoutes(weekendQuery.data?.rivers ?? [], location),
    [weekendQuery.data?.rivers, location]
  );
  const inRangeRivers = location ? rivers.filter((river) => isWithinDistanceLimit(river, distanceLimit)) : rivers;
  const outOfRangeRivers = location && distanceLimit !== null
    ? rivers.filter((river) => !isWithinDistanceLimit(river, distanceLimit))
    : [];
  const topPicks = inRangeRivers.filter(isCleanWeekendRoute).slice(0, 5);
  const expandedPicks = topPicks.length === 0 ? outOfRangeRivers.filter(isCleanWeekendRoute).slice(0, 4) : [];
  const nearbyWatch = inRangeRivers.filter((river) => river.weekend.rating === 'Fair').slice(0, 5);
  const featured = topPicks[0] ?? nearbyWatch[0] ?? expandedPicks[0] ?? inRangeRivers[0] ?? rivers[0];
  const hasWeekendPlan = topPicks.length > 0;
  const topPickSlugs = slugSet(topPicks);
  const lowerCommitment = inRangeRivers
    .filter((river) => !topPickSlugs.has(river.river.slug))
    .filter(isLowerCommitmentRoute)
    .slice(0, 4);
  const primaryPlanSlugs = slugSet([...topPicks, ...lowerCommitment]);
  const campingFriendlyRoutes = inRangeRivers
    .filter((river) => !primaryPlanSlugs.has(river.river.slug))
    .filter(hasWeekendCampingSupport)
    .slice(0, 4);
  const shownSlugs = slugSet([...topPicks, ...lowerCommitment, ...campingFriendlyRoutes, ...nearbyWatch]);
  const watchList = inRangeRivers
    .filter((river) => !shownSlugs.has(river.river.slug))
    .filter((river) => river.weekend.rating === 'Fair')
    .slice(0, 5);
  const locationLabel = location?.label ?? null;

  useEffect(() => {
    void hydrateDistanceLimit();
  }, []);

  useEffect(() => {
    if (!distanceHydrated) {
      return;
    }

    void AsyncStorage.setItem(WEEKEND_DISTANCE_STORAGE_KEY, JSON.stringify(distanceLimit));
  }, [distanceHydrated, distanceLimit]);

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
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: spacing.md + insets.top,
          paddingBottom: spacing.xl + bottomContentInset,
        },
      ]}
      refreshControl={
        <RefreshControl
          tintColor={colors.accent}
          refreshing={weekendQuery.isRefetching}
          onRefresh={() => weekendQuery.refetch()}
        />
      }
    >
      <AppRefreshNotice
        isError={weekendQuery.isRefetchError}
        dataUpdatedAt={weekendQuery.dataUpdatedAt}
        onRetry={() => void weekendQuery.refetch()}
      />
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

        {location ? (
          <WeekendDistanceSelector
            selected={distanceLimit}
            onSelect={(value) => setDistanceLimit(value)}
          />
        ) : null}

        <View style={styles.heroPanel}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroLabel} numberOfLines={1}>
              {location ? `Near ${location.label}` : hasWeekendPlan ? (weekendQuery.data?.label ?? 'Weekend outlook') : 'Across supported routes'}
            </Text>
            <Text style={styles.heroFreshness}>{location ? rangeFreshnessLabel(distanceLimit) : hasWeekendPlan ? 'Forecast-aware' : 'No clean plan'}</Text>
          </View>

          <View style={styles.snapshotRow}>
            <SnapshotStat label="Strong" value={inRangeRivers.filter((river) => river.weekend.rating === 'Strong').length} tone={styles.snapshotStrong} />
            <SnapshotStat label="Good" value={inRangeRivers.filter((river) => river.weekend.rating === 'Good').length} tone={styles.snapshotGood} />
            <SnapshotStat label="Watch" value={nearbyWatch.length + watchList.length} tone={styles.snapshotWatch} />
          </View>

          {featured && hasWeekendPlan ? (
            <Pressable
              style={styles.featuredBlock}
              onPress={() => router.push({ pathname: '/river/[slug]', params: { slug: featured.river.slug } })}
              android_ripple={{ color: colors.canvasMuted }}
            >
              <Text style={styles.featuredLabel}>{location ? 'Top nearby weekend pick' : 'Top weekend pick'}</Text>
              <Text style={styles.featuredName}>{featured.river.name}</Text>
              <Text style={styles.featuredReach}>{featured.river.reach}</Text>
              <View style={styles.featuredFacts}>
                {weekendFacts(featured).map((fact) => (
                  <Text key={fact} style={styles.featuredFact} numberOfLines={1}>{fact}</Text>
                ))}
              </View>
              <Text style={styles.featuredSummary}>{weekendHeroSummary(featured)}</Text>
            </Pressable>
          ) : featured ? (
            <Pressable
              style={styles.featuredBlock}
              onPress={() => router.push({ pathname: '/river/[slug]', params: { slug: featured.river.slug } })}
              android_ripple={{ color: colors.canvasMuted }}
            >
              <Text style={styles.featuredLabel}>{expandedPicks.length > 0 ? 'Nearest expanded option' : 'No clean weekend plan'}</Text>
              <Text style={styles.featuredName}>{featured.river.name}</Text>
              <Text style={styles.featuredReach}>{featured.river.reach}</Text>
              <View style={styles.featuredFacts}>
                {weekendFacts(featured).map((fact) => (
                  <Text key={fact} style={styles.featuredFact} numberOfLines={1}>{fact}</Text>
                ))}
              </View>
              <Text style={styles.featuredSummary}>
                {expandedPicks.length > 0
                  ? 'No Good routes are inside your selected range. This is the best option after expanding the drive.'
                  : 'No Good routes are inside your selected range. Recheck nearby watch routes before planning.'}
              </Text>
            </Pressable>
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
          campingRoutes={campingFriendlyRoutes.length}
          rechecks={watchList.length}
          selected={weekendFilter}
          onSelect={setWeekendFilter}
        />
      ) : null}

      {(weekendFilter === 'all' || weekendFilter === 'day-trips') && topPicks.length > 0 ? (
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

      {(weekendFilter === 'all' || weekendFilter === 'day-trips') && lowerCommitment.length > 0 ? (
        <SectionCard
          title="Lower commitment"
          subtitle={location ? 'Easier or shorter options after the top nearby picks.' : 'Shorter, easier routes.'}
        >
          <View style={styles.list}>
            {lowerCommitment.map((river) => renderWeekendCard(river))}
          </View>
        </SectionCard>
      ) : null}

      {(weekendFilter === 'all' || weekendFilter === 'rechecks') && !hasWeekendPlan && nearbyWatch.length > 0 ? (
        <SectionCard
          title={location ? 'Worth watching nearby' : 'Worth watching'}
          subtitle="Fair calls inside your selected range."
        >
          <View style={styles.list}>
            {nearbyWatch.map((river) => renderWeekendCard(river))}
          </View>
        </SectionCard>
      ) : null}

      {(weekendFilter === 'all' || weekendFilter === 'day-trips') && expandedPicks.length > 0 ? (
        <SectionCard
          title="Expand the drive"
          subtitle={`No Good routes inside ${rangeFreshnessLabel(distanceLimit)}. These are farther options.`}
        >
          <View style={styles.list}>
            {expandedPicks.map((river) => renderWeekendCard(river))}
          </View>
        </SectionCard>
      ) : null}

      {(weekendFilter === 'all' || weekendFilter === 'camping') && campingFriendlyRoutes.length > 0 ? (
        <SectionCard
          title="Camping-friendly"
          subtitle="Good weekend calls with campground, base-camp, or overnight support."
        >
          <View style={styles.list}>
            {campingFriendlyRoutes.map((river) => renderWeekendCard(river))}
          </View>
        </SectionCard>
      ) : null}

      {weekendFilter === 'all' || weekendFilter === 'rechecks' ? (
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
      ) : null}

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

  async function hydrateDistanceLimit() {
    try {
      const raw = await AsyncStorage.getItem(WEEKEND_DISTANCE_STORAGE_KEY);
      const parsed = parseDistanceLimit(raw);
      if (parsed !== undefined) {
        setDistanceLimit(parsed);
      }
    } catch {
      // Keep the default range if saved preferences are unavailable.
    } finally {
      setDistanceHydrated(true);
    }
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

function WeekendDistanceSelector({
  selected,
  onSelect,
}: {
  selected: number | null;
  onSelect: (value: number | null) => void;
}) {
  return (
    <View style={styles.distanceSelector}>
      <Text style={styles.distanceLabel}>Weekend range</Text>
      <View style={styles.distanceOptions}>
        {weekendDistanceOptions.map((option) => {
          const active = selected === option.value;
          return (
            <Pressable
              key={option.label}
              style={[styles.distanceChip, active ? styles.distanceChipActive : null]}
              onPress={() => onSelect(option.value)}
            >
              <Text style={[styles.distanceChipText, active ? styles.distanceChipTextActive : null]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
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
  campingRoutes,
  rechecks,
  selected,
  onSelect,
}: {
  dayTrips: number;
  campingRoutes: number;
  rechecks: number;
  selected: WeekendFilter;
  onSelect: (filter: WeekendFilter) => void;
}) {
  return (
    <View style={styles.planLanes}>
      <Text style={styles.planLanesTitle}>Filter weekend routes</Text>
      <Text style={styles.planLanesHint}>Choose what you want to see first.</Text>
      <View style={styles.planLaneGrid}>
        <PlanLane label="All" value={dayTrips + campingRoutes + rechecks} active={selected === 'all'} onPress={() => onSelect('all')} />
        <PlanLane label="Day trips" value={dayTrips} active={selected === 'day-trips'} onPress={() => onSelect('day-trips')} />
        <PlanLane label="Camping" value={campingRoutes} active={selected === 'camping'} onPress={() => onSelect('camping')} />
        <PlanLane label="Rechecks" value={rechecks} active={selected === 'rechecks'} onPress={() => onSelect('rechecks')} />
      </View>
    </View>
  );
}

function PlanLane({ label, value, active, onPress }: { label: string; value: number; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      style={[styles.planLane, active ? styles.planLaneActive : null]}
      onPress={onPress}
      android_ripple={{ color: colors.canvasMuted }}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`${label}, ${value} routes`}
    >
      <Text style={[styles.planLaneValue, active ? styles.planLaneValueActive : null]}>{value}</Text>
      <Text style={[styles.planLaneLabel, active ? styles.planLaneLabelActive : null]}>{label}</Text>
    </Pressable>
  );
}

function slugSet(rivers: WeekendSummaryApiItem[]) {
  return new Set(rivers.map((river) => river.river.slug));
}

function isLowerCommitmentRoute(river: WeekendSummaryApiItem) {
  if (!isCleanWeekendRoute(river)) {
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

function hasWeekendCampingSupport(river: WeekendSummaryApiItem) {
  if (!isCleanWeekendRoute(river)) {
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

function isCleanWeekendRoute(river: WeekendSummaryApiItem) {
  return river.weekend.rating === 'Strong' || river.weekend.rating === 'Good';
}

function isWithinDistanceLimit(river: WeekendRoute, distanceLimit: number | null) {
  if (distanceLimit === null) {
    return true;
  }

  return river.distanceMiles !== null && river.distanceMiles <= distanceLimit;
}

function rangeFreshnessLabel(distanceLimit: number | null) {
  return distanceLimit === null ? 'All distances' : `${distanceLimit} mi`;
}

function parseDistanceLimit(raw: string | null) {
  if (raw === null) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (parsed === null) {
      return null;
    }

    if (typeof parsed === 'number' && weekendDistanceOptions.some((option) => option.value === parsed)) {
      return parsed;
    }
  } catch {
    return undefined;
  }

  return undefined;
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
  distanceSelector: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  distanceLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  distanceOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  distanceChip: {
    minHeight: 36,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  distanceChipActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  distanceChipText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  distanceChipTextActive: {
    color: colors.surfaceStrong,
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
    lineHeight: 15,
    fontWeight: '800',
    paddingHorizontal: 9,
    paddingVertical: 4,
    flexShrink: 1,
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
  planLanesHint: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  planLaneGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  planLane: {
    flexGrow: 1,
    flexBasis: '22%',
    minWidth: 64,
    minHeight: 70,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.sm,
    justifyContent: 'center',
    gap: 3,
    elevation: 1,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  planLaneActive: {
    backgroundColor: '#F3E8CC',
    borderColor: colors.fair,
  },
  planLaneValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  planLaneValueActive: {
    color: colors.fair,
  },
  planLaneLabel: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.25,
  },
  planLaneLabelActive: {
    color: colors.fair,
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
