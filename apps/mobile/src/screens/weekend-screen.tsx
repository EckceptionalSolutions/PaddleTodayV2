import { LocationStorageNotice } from '../components/location-storage-notice';
import { AppButton } from '../components/app-button';
import { ManualLocationModal } from '../components/manual-location-modal';
import {
  hasCampingSupport as classificationHasCampingSupport,
  type WeekendSummaryApiItem,
} from '@paddletoday/api-contract';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWeekendSummaryQuery } from '../api/queries';
import { AppErrorState, AppLoadingState, AppRefreshNotice } from '../components/app-state';
import { RoutePlotMap, type RoutePlotPoint, type RouteSpanCoordinate } from '../components/route-plot-map';
import { SectionCard } from '../components/section-card';
import { WeekendRiverCard } from '../components/weekend-river-card';
import { useStoredLocation } from '../hooks/use-stored-location';
import { requestFailureMessage } from '../lib/request-failure';
import { distanceMiles, distancePenalty, estimateTravelMinutes, formatTravelTime, type StoredLocation } from '../lib/location';
import { androidBottomInset } from '../lib/safe-area';
import { radioKeyboardProps, tabKeyboardProps } from '../lib/selection-keyboard';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

interface WeekendRoute extends WeekendSummaryApiItem {
  distanceMiles: number | null;
  travelMinutes: number | null;
  travelLabel: string | null;
  weekendRank: number;
}

type WeekendFilter = 'all' | 'day-trips' | 'camping' | 'rechecks';
const weekendFilterOrder: WeekendFilter[] = ['all', 'day-trips', 'camping', 'rechecks'];
type WeekendAccessPoint = NonNullable<WeekendSummaryApiItem['river']['accessPoints']>[number];

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
  const { width: windowWidth } = useWindowDimensions();
  const compactHeader = windowWidth < 360;
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomContentInset = androidBottomInset(insets.bottom);
  const weekendQuery = useWeekendSummaryQuery();
  const isStale = weekendQuery.data?.snapshotStatus === 'stale';
  const { location, status, requestLocation, clearLocation, searchLocations, selectPlanningLocation, cancelLocationRequest } = useStoredLocation();
  const [locationSearchOpen, setLocationSearchOpen] = useState(false);
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const [distanceLimit, setDistanceLimit] = useState<number | null>(DEFAULT_WEEKEND_DISTANCE_LIMIT);
  const [distanceSaveError, setDistanceSaveError] = useState(false);
  const distanceChanged = useRef(false);
  const distanceWriteQueue = useRef(Promise.resolve());
  const distanceWriteVersion = useRef(0);
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
  const nearbyWatch = topPicks.length === 0
    ? inRangeRivers.filter((river) => river.weekend.rating === 'Fair').slice(0, 5)
    : [];
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
  const campingPicks = inRangeRivers.filter(hasWeekendCampingSupport).slice(0, 4);
  const visibleCampingRoutes = weekendFilter === 'camping' ? campingPicks : campingFriendlyRoutes;
  const shownSlugs = slugSet([...topPicks, ...lowerCommitment, ...campingFriendlyRoutes, ...nearbyWatch]);
  const watchList = inRangeRivers
    .filter((river) => !shownSlugs.has(river.river.slug))
    .filter((river) => river.weekend.rating === 'Fair')
    .slice(0, 5);
  const skipList = inRangeRivers
    .filter((river) => river.weekend.rating === 'No-go')
    .slice(0, 5);
  const allWeekendRoutes = uniqueWeekendRoutes([
    ...topPicks, ...lowerCommitment, ...nearbyWatch, ...expandedPicks,
    ...campingFriendlyRoutes, ...watchList, ...skipList,
  ]);
  const weekendMapRoutes = uniqueWeekendRoutes(
    weekendFilter === 'day-trips'
      ? [...topPicks, ...lowerCommitment, ...expandedPicks]
      : weekendFilter === 'camping'
        ? campingPicks
        : weekendFilter === 'rechecks'
          ? [...(!hasWeekendPlan ? nearbyWatch : []), ...watchList]
          : allWeekendRoutes
  );
  const weekendMapPoints = weekendRouteMapPoints(weekendMapRoutes, isStale);
  const weekendMapSpans = weekendMapPoints.flatMap((point) => point.spanSegments ?? []);
  const locationLabel = location?.label ?? null;

  useEffect(() => {
    let active = true;
    void AsyncStorage.getItem(WEEKEND_DISTANCE_STORAGE_KEY).then(raw => {
      const parsed = parseDistanceLimit(raw);
      if (active && !distanceChanged.current && parsed !== undefined) setDistanceLimit(parsed);
    }).catch(() => { /* Keep the default without overwriting the stored preference. */ });
    return () => { active = false; distanceWriteVersion.current++; };
  }, []);

  function chooseDistance(value: number | null) {
    distanceChanged.current = true;
    setDistanceLimit(value);
    const version = ++distanceWriteVersion.current;
    setDistanceSaveError(false);
    distanceWriteQueue.current = distanceWriteQueue.current.then(async () => {
      try {
        await AsyncStorage.setItem(WEEKEND_DISTANCE_STORAGE_KEY, JSON.stringify(value));
      } catch {
        if (version === distanceWriteVersion.current) setDistanceSaveError(true);
      }
    });
  }

  if (weekendQuery.isPending && !weekendQuery.data) {
    return (
      <AppLoadingState title="Loading weekend routes" body="Checking the weekend outlook." />
    );
  }

  if (weekendQuery.isError && !weekendQuery.data) {
    return (
      <AppErrorState
        title="Weekend outlook did not load"
        body={requestFailureMessage(weekendQuery.error)}
        retrying={weekendQuery.isFetching}
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
      <LocationStorageNotice />
      <AppRefreshNotice
        isError={weekendQuery.isRefetchError}
        isStale={weekendQuery.data?.snapshotStatus === 'stale'}
        dataUpdatedAt={weekendQuery.dataUpdatedAt}
        retrying={weekendQuery.isFetching}
        onRetry={() => void weekendQuery.refetch()}
      />
      <View style={styles.hero}>
        <Text accessibilityRole="header" style={styles.title}>{isStale ? 'Saved weekend outlook' : 'Plan the weekend'}</Text>
        <Text style={styles.subtitle}>
          {isStale ? 'These forecasts need a fresh update before you make a plan.' : location
            ? 'Sorted by forecast, river conditions, and drive time.'
            : 'Add your location to sort by drive time.'}
        </Text>

        <WeekendLocationStrip
          locationLabel={locationLabel}
          status={status}
          onUseLocation={() => void requestLocation()}
          onClear={() => void clearLocation()}
          onChooseCity={() => { cancelLocationRequest(); setLocationSearchOpen(true); }}
        />

        {location ? (
          <WeekendFilters
            distance={distanceLimit}
            onSelectDistance={chooseDistance}
            totalRoutes={allWeekendRoutes.length}
            dayTrips={topPicks.length + lowerCommitment.length + expandedPicks.length}
            campingRoutes={campingPicks.length}
            rechecks={nearbyWatch.length + watchList.length}
            selectedRouteType={weekendFilter}
            onSelectRouteType={setWeekendFilter}
          />
        ) : null}

        {distanceSaveError ? <View style={{ gap: spacing.sm }}>
          <Text style={styles.emptyText} accessibilityLiveRegion="polite">Your range is applied, but could not be saved on this device.</Text>
          <AppButton label="Retry saving range" variant="secondary" onPress={() => chooseDistance(distanceLimit)} />
        </View> : null}

        <View style={styles.heroPanel}>
          <View style={[styles.heroHeader, compactHeader ? styles.heroHeaderCompact : null]}>
            <Text style={styles.heroLabel} numberOfLines={compactHeader ? 2 : 1}>
              {location ? `Near ${location.label}` : hasWeekendPlan ? (weekendQuery.data?.label ?? 'Weekend outlook') : 'Across available routes'}
            </Text>
            <Text style={styles.heroFreshness}>{isStale ? 'Previous forecast counts' : location ? rangeFreshnessLabel(distanceLimit) : hasWeekendPlan ? 'Forecast included' : 'No Paddle plan'}</Text>
          </View>

          <View style={styles.snapshotRow}>
            <SnapshotStat label="Paddle" value={inRangeRivers.filter((river) => river.weekend.rating === 'Strong' || river.weekend.rating === 'Good').length} tone={styles.snapshotStrong} />
            <SnapshotStat label="Watch" value={nearbyWatch.length + watchList.length} tone={styles.snapshotWatch} />
            <SnapshotStat label="Skip" value={inRangeRivers.filter((river) => river.weekend.rating === 'No-go').length} tone={styles.snapshotNoGo} />
          </View>

          {!hasWeekendPlan && featured ? (
            <Pressable
              style={styles.featuredBlock}
              accessibilityRole="button"
              accessibilityLabel={`View route: ${featured.river.name}, ${featured.river.reach}`}
              onPress={() => router.push({ pathname: '/river/[slug]', params: { slug: featured.river.slug } })}
              android_ripple={{ color: colors.canvasMuted }}
            >
              <Text style={styles.featuredLabel}>{expandedPicks.length > 0 ? 'Next closest option' : 'No Paddle weekend plan'}</Text>
              <Text style={styles.featuredName}>{featured.river.name}</Text>
              <Text style={styles.featuredReach}>{featured.river.reach}</Text>
              <View style={styles.featuredFacts}>
                {weekendFacts(featured).map((fact) => (
                  <Text key={fact} style={styles.featuredFact} numberOfLines={1}>{fact}</Text>
                ))}
              </View>
              <Text style={styles.featuredSummary}>
                {expandedPicks.length > 0
                  ? 'No Paddle routes are inside your selected range. This is the best option after expanding the drive.'
                  : 'No Paddle routes are inside your selected range. Recheck nearby Watch routes before planning.'}
              </Text>
            </Pressable>
          ) : !featured ? (
            <Text style={styles.emptyText}>
              No strong weekend options right now. Check Today or Explore for current routes.
            </Text>
          ) : null}
        </View>
      </View>

      {!location && hasWeekendPlan ? (
        <WeekendPlanLanes
          totalRoutes={allWeekendRoutes.length}
          dayTrips={topPicks.length + lowerCommitment.length + expandedPicks.length}
          campingRoutes={campingPicks.length}
          rechecks={nearbyWatch.length + watchList.length}
          selected={weekendFilter}
          onSelect={setWeekendFilter}
        />
      ) : null}

      {weekendMapPoints.length > 0 ? (
        <SectionCard
          title={isStale ? 'Saved forecast on the map' : 'Weekend routes on the map'}
          subtitle={isStale ? 'Scores are from the previous forecast. Tap a route to review its details.' : `Showing all ${weekendMapPoints.length} ${weekendFilter === 'all' ? 'weekend routes below' : `${weekendFilterLabel(weekendFilter)} routes`}. Tap a score to open the route.`}
        >
          <View style={styles.mapFrame}>
            <RoutePlotMap
              points={weekendMapPoints}
              backgroundSpanSegments={weekendMapSpans}
              height={270}
              showFooter={false}
              fitToAllOnReady
              fullBleed
              onSelectPoint={(point) => router.push({ pathname: '/river/[slug]', params: { slug: point.id } })}
            />
          </View>
        </SectionCard>
      ) : null}

      {weekendFilter !== 'all' && weekendMapRoutes.length === 0 ? (
        <SectionCard title={`No ${weekendFilterLabel(weekendFilter)} routes`}>
          <Text style={styles.emptyText} accessibilityLiveRegion="polite">
            {location && distanceLimit !== null
              ? 'No routes match this weekend category within your range. Choose All or increase the range above.'
              : 'No routes match this weekend category right now. Choose All above to see the other weekend options.'}
          </Text>
        </SectionCard>
      ) : null}

      {(weekendFilter === 'all' || weekendFilter === 'day-trips') && topPicks.length > 0 ? (
        <SectionCard
          title={isStale ? 'Top routes in the saved forecast' : location ? 'Best near you' : 'Best weekend'}
          subtitle={isStale ? 'Previous rankings, awaiting a current forecast.' : location ? 'Paddle this weekend options with drive time included.' : 'Paddle this weekend options.'}
        >
          <View style={styles.list}>
            {topPicks.map((river) => (
              <WeekendRiverCard
                key={river.river.slug}
                river={river}
                isStale={isStale}
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
          title="Shorter or easier routes"
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
          subtitle="Routes to watch within your range."
        >
          <View style={styles.list}>
            {nearbyWatch.map((river) => renderWeekendCard(river))}
          </View>
        </SectionCard>
      ) : null}

      {(weekendFilter === 'all' || weekendFilter === 'day-trips') && expandedPicks.length > 0 ? (
        <SectionCard
          title="Expand the drive"
          subtitle={`No Paddle routes inside ${rangeFreshnessLabel(distanceLimit)}. These are farther options.`}
        >
          <View style={styles.list}>
            {expandedPicks.map((river) => renderWeekendCard(river))}
          </View>
        </SectionCard>
      ) : null}

      {(weekendFilter === 'all' || weekendFilter === 'camping') && visibleCampingRoutes.length > 0 ? (
        <SectionCard
          title="Camping-friendly"
          subtitle="Paddle this weekend routes with camping nearby or along the way."
        >
          <View style={styles.list}>
            {visibleCampingRoutes.map((river) => renderWeekendCard(river))}
          </View>
        </SectionCard>
      ) : null}

      {(weekendFilter === 'all' || weekendFilter === 'rechecks') && watchList.length > 0 ? (
        <SectionCard
          title="Watch list"
          subtitle="Watch routes as the forecast settles."
        >
          <View style={styles.list}>
            {watchList.map((river) => renderWeekendCard(river))}
          </View>
        </SectionCard>
      ) : null}

      {weekendFilter === 'all' && skipList.length > 0 ? (
        <SectionCard
          title="Skip this weekend"
          subtitle="These routes are below the current launch threshold."
        >
          <View style={styles.list}>
            {skipList.map((river) => renderWeekendCard(river))}
          </View>
        </SectionCard>
      ) : null}

      <ManualLocationModal visible={locationSearchOpen}
        subtitle="Enter a city or ZIP code to plan weekend routes and estimate drive times."
        onDismiss={() => { cancelLocationRequest(); setLocationSearchOpen(false); }}
        onSearch={searchLocations} onSelect={selectPlanningLocation} />
    </ScrollView>
  );

  function renderWeekendCard(river: WeekendSummaryApiItem) {
    const route = river as WeekendRoute;
    return (
      <WeekendRiverCard
        key={river.river.slug}
        river={river}
        isStale={isStale}
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
  onChooseCity,
}: {
  locationLabel: string | null;
  status: string;
  onUseLocation: () => void;
  onClear: () => void;
  onChooseCity: () => void;
}) {
  const requesting = status === 'requesting';

  return (
    <View style={styles.locationStrip}>
      <View style={styles.locationRow}>
      <View style={styles.locationCopy}>
        <Text style={styles.locationLabel}>
          {locationLabel ? `Planning from ${locationLabel}` : 'Plan from your location'}
        </Text>
        <Text style={styles.locationHint} accessibilityLiveRegion="polite">
          {locationLabel ? 'Drive times included.'
            : requesting ? 'Finding your location to estimate drive times.'
              : status === 'denied' ? 'Location permission was denied. Choose a city below or allow location access and retry.'
                : status === 'error' ? 'Could not find your location. Try again or choose a city below.'
                  : 'Use GPS or choose a city to sort by drive time.'}
        </Text>
      </View>
      <Pressable
        style={[styles.locationButton, requesting ? styles.locationButtonDisabled : null]}
        disabled={requesting}
        onPress={locationLabel ? onClear : onUseLocation}
        accessibilityRole="button"
        accessibilityLabel={locationLabel ? 'Clear weekend planning location' : 'Use location for weekend routes'}
        accessibilityState={{ disabled: requesting, busy: requesting }}
        aria-busy={requesting}
      >
        <Text style={styles.locationButtonText}>
          {requesting ? 'Finding' : locationLabel ? 'Clear' : status === 'denied' || status === 'error' ? 'Retry' : 'Use'}
        </Text>
      </Pressable>
      </View>
      <AppButton label={locationLabel ? 'Change planning city' : 'Choose a city or ZIP'} variant="secondary" icon="map-search-outline" onPress={onChooseCity} />
    </View>
  );
}

function WeekendFilters({
  distance,
  onSelectDistance,
  totalRoutes,
  dayTrips,
  campingRoutes,
  rechecks,
  selectedRouteType,
  onSelectRouteType,
}: {
  distance: number | null;
  onSelectDistance: (value: number | null) => void;
  totalRoutes: number;
  dayTrips: number;
  campingRoutes: number;
  rechecks: number;
  selectedRouteType: WeekendFilter;
  onSelectRouteType: (filter: WeekendFilter) => void;
}) {
  const selectedIndex = weekendDistanceOptions.findIndex((option) => option.value === distance);

  return (
    <View style={styles.weekendFilters}>
      <Text style={styles.filterTitle}>Weekend filters</Text>

      <View style={styles.filterSection}>
        <View style={styles.filterLabelRow}>
          <Text style={styles.filterLabel}>Range</Text>
          <Text style={styles.filterValue}>{rangeFreshnessLabel(distance)}</Text>
        </View>
        <View style={styles.rangeControl}>
          <View style={styles.rangeTrack} />
          <View
            style={[
              styles.rangeTrackActive,
              { width: `${Math.max(0, selectedIndex) * 20}%` },
            ]}
          />
          <View style={styles.rangeStops} accessibilityRole="radiogroup" accessibilityLabel="Weekend range">
            {weekendDistanceOptions.map((option, index) => {
              const active = index <= selectedIndex;
              const selected = index === selectedIndex;
              return (
                <Pressable
                  key={option.label}
                  style={styles.rangeStopButton}
                  onPress={() => onSelectDistance(option.value)}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected }}
                  aria-checked={selected}
                  {...radioKeyboardProps(index, selected, weekendDistanceOptions.length, (nextIndex) => onSelectDistance(weekendDistanceOptions[nextIndex].value))}
                  accessibilityLabel={`Weekend range ${option.label}`}
                >
                  <View style={[styles.rangeStop, active ? styles.rangeStopActive : null, selected ? styles.rangeThumb : null]} />
                  <Text style={[styles.rangeStopLabel, selected ? styles.rangeStopLabelActive : null]}>{option.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.filterDivider} />

      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Route type</Text>
        <View style={styles.routeTypeRow} accessibilityRole="tablist" accessibilityLabel="Weekend route type">
          <RouteTypeChip index={0} onSelectIndex={(next) => onSelectRouteType(weekendFilterOrder[next])} label="All" value={totalRoutes} active={selectedRouteType === 'all'} onPress={() => onSelectRouteType('all')} />
          <RouteTypeChip index={1} onSelectIndex={(next) => onSelectRouteType(weekendFilterOrder[next])} label="Day trips" value={dayTrips} active={selectedRouteType === 'day-trips'} onPress={() => onSelectRouteType('day-trips')} />
          <RouteTypeChip index={2} onSelectIndex={(next) => onSelectRouteType(weekendFilterOrder[next])} label="Camping" value={campingRoutes} active={selectedRouteType === 'camping'} onPress={() => onSelectRouteType('camping')} />
          <RouteTypeChip index={3} onSelectIndex={(next) => onSelectRouteType(weekendFilterOrder[next])} label="Watch" value={rechecks} active={selectedRouteType === 'rechecks'} onPress={() => onSelectRouteType('rechecks')} />
        </View>
      </View>
    </View>
  );
}

function RouteTypeChip({ label, value, active, onPress, index, onSelectIndex }: { label: string; value: number; active: boolean; onPress: () => void; index: number; onSelectIndex: (index: number) => void }) {
  return (
    <Pressable
      style={[styles.routeTypeChip, active ? styles.routeTypeChipActive : null]}
      onPress={onPress}
      android_ripple={{ color: colors.canvasMuted }}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      aria-selected={active}
      {...tabKeyboardProps(index, active, weekendFilterOrder.length, onSelectIndex)}
      accessibilityLabel={`${label}, ${value} routes`}
    >
      <Text style={[styles.routeTypeCount, active ? styles.routeTypeTextActive : null]}>{value}</Text>
      <Text style={[styles.routeTypeLabel, active ? styles.routeTypeTextActive : null]} numberOfLines={1}>{label}</Text>
    </Pressable>
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
  totalRoutes,
  dayTrips,
  campingRoutes,
  rechecks,
  selected,
  onSelect,
}: {
  totalRoutes: number;
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
      <View style={styles.planLaneGrid} accessibilityRole="tablist" accessibilityLabel="Weekend route type">
        <PlanLane index={0} onSelectIndex={(next) => onSelect(weekendFilterOrder[next])} label="All" value={totalRoutes} active={selected === 'all'} onPress={() => onSelect('all')} />
        <PlanLane index={1} onSelectIndex={(next) => onSelect(weekendFilterOrder[next])} label="Day trips" value={dayTrips} active={selected === 'day-trips'} onPress={() => onSelect('day-trips')} />
        <PlanLane index={2} onSelectIndex={(next) => onSelect(weekendFilterOrder[next])} label="Camping" value={campingRoutes} active={selected === 'camping'} onPress={() => onSelect('camping')} />
        <PlanLane index={3} onSelectIndex={(next) => onSelect(weekendFilterOrder[next])} label="Watch" value={rechecks} active={selected === 'rechecks'} onPress={() => onSelect('rechecks')} />
      </View>
    </View>
  );
}

function PlanLane({ label, value, active, onPress, index, onSelectIndex }: { label: string; value: number; active: boolean; onPress: () => void; index: number; onSelectIndex: (index: number) => void }) {
  return (
    <Pressable
      style={[styles.planLane, active ? styles.planLaneActive : null]}
      onPress={onPress}
      android_ripple={{ color: colors.canvasMuted }}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      aria-selected={active}
      {...tabKeyboardProps(index, active, weekendFilterOrder.length, onSelectIndex)}
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

function uniqueWeekendRoutes(rivers: WeekendSummaryApiItem[]) {
  const seen = new Set<string>();
  return rivers.filter((river) => {
    if (seen.has(river.river.slug)) {
      return false;
    }
    seen.add(river.river.slug);
    return true;
  });
}

function weekendFilterLabel(filter: WeekendFilter) {
  if (filter === 'day-trips') return 'day trip';
  if (filter === 'camping') return 'camping-friendly';
  if (filter === 'rechecks') return 'watch';
  return 'weekend';
}

function weekendRouteMapPoints(rivers: WeekendSummaryApiItem[], isStale: boolean): RoutePlotPoint[] {
  return rivers.map((river) => {
    const span = weekendRouteSpan(river);
    const center = span.length > 0
      ? {
          latitude: span.reduce((sum, point) => sum + point.latitude, 0) / span.length,
          longitude: span.reduce((sum, point) => sum + point.longitude, 0) / span.length,
        }
      : { latitude: river.river.latitude, longitude: river.river.longitude };

    return {
      id: river.river.slug,
      label: river.river.name,
      latitude: center.latitude,
      longitude: center.longitude,
      score: river.weekend.score,
      rating: isStale ? 'stale' : river.weekend.rating,
      markerAccessibilityLabel: `${river.river.reach}, ${isStale ? 'saved forecast, update needed, ' : ''}weekend score ${river.weekend.score}`,
      spanSegments: span.length >= 2 ? [span] : [],
      meta: [river.river.reach, river.river.distanceLabel].filter(Boolean).join(' - '),
    };
  });
}

function weekendRouteSpan(river: WeekendSummaryApiItem): RouteSpanCoordinate[] {
  const accessPoints = river.river.accessPoints
    ?.map((point) => ({ point, coordinate: weekendAccessCoordinate(point) }))
    .filter(hasMappedWeekendAccessCoordinate)
    .sort((left, right) => left.point.mileFromStart - right.point.mileFromStart);
  const chain = [
    weekendAccessCoordinate(river.river.putIn),
    ...(accessPoints?.map((entry) => entry.coordinate) ?? []),
    weekendAccessCoordinate(river.river.takeOut),
  ].filter(isWeekendMapCoordinate);

  return dedupeAdjacentCoordinates(chain);
}

function weekendAccessCoordinate(
  point: { latitude?: number; longitude?: number } | null | undefined
): RouteSpanCoordinate | null {
  if (!point || !Number.isFinite(point.latitude) || !Number.isFinite(point.longitude)) {
    return null;
  }

  return {
    latitude: point.latitude as number,
    longitude: point.longitude as number,
  };
}

function hasMappedWeekendAccessCoordinate(
  entry: { point: WeekendAccessPoint; coordinate: RouteSpanCoordinate | null }
): entry is { point: WeekendAccessPoint; coordinate: RouteSpanCoordinate } {
  return entry.coordinate !== null;
}

function isWeekendMapCoordinate(
  coordinate: RouteSpanCoordinate | null
): coordinate is RouteSpanCoordinate {
  return coordinate !== null;
}

function dedupeAdjacentCoordinates(coordinates: RouteSpanCoordinate[]) {
  return coordinates.filter((coordinate, index) => (
    index === 0
    || coordinate.latitude !== coordinates[index - 1].latitude
    || coordinate.longitude !== coordinates[index - 1].longitude
  ));
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
  return classificationHasCampingSupport(classification);
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

function capitalize(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
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
    gap: spacing.md,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
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
    minHeight: 44,
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
  weekendFilters: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  filterTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  filterSection: {
    gap: spacing.sm,
  },
  filterLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  filterValue: {
    color: colors.accentDeep,
    fontSize: 13,
    fontWeight: '900',
  },
  filterDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  rangeControl: {
    height: 52,
    justifyContent: 'flex-start',
    paddingTop: 2,
    marginHorizontal: 2,
  },
  rangeTrack: {
    position: 'absolute',
    top: 11,
    left: '10%',
    right: '10%',
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
  rangeTrackActive: {
    position: 'absolute',
    top: 11,
    left: '10%',
    maxWidth: '80%',
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
  },
  rangeStops: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeStopButton: {
    width: '20%',
    minHeight: 48,
    alignItems: 'center',
    gap: 7,
  },
  rangeStop: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
  },
  rangeStopActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  rangeThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: colors.surfaceStrong,
    backgroundColor: colors.accent,
    shadowColor: '#0F172A',
    shadowOpacity: 0.18,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  rangeStopLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  rangeStopLabelActive: {
    color: colors.accentDeep,
    fontWeight: '900',
  },
  routeTypeRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  routeTypeChip: {
    flex: 1,
    minWidth: 0,
    minHeight: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    gap: 1,
    overflow: 'hidden',
  },
  routeTypeChipActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  routeTypeCount: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  routeTypeLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
  },
  routeTypeTextActive: {
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
  mapFrame: {
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  heroHeaderCompact: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
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
  snapshotWatch: {
    backgroundColor: '#F3E8CC',
  },
  snapshotNoGo: {
    backgroundColor: '#F2DDD6',
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
    gap: spacing.xs,
  },
  planLane: {
    flex: 1,
    minWidth: 0,
    minHeight: 56,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 6,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    elevation: 1,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  planLaneActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  planLaneValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  planLaneValueActive: {
    color: colors.surfaceStrong,
  },
  planLaneLabel: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.25,
    textAlign: 'center',
  },
  planLaneLabelActive: {
    color: colors.surfaceStrong,
  },
});
