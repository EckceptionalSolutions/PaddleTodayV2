import {
  buildSourceStrengthViewModel,
  friendlyCapReason,
  signedPoints,
  type RiverDetailApiResult,
  type ScoreBreakdown,
} from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRiverGeometryQuery, useRiverGroupQuery } from '../api/queries';
import { RoutePlotMap, type RoutePlotPoint } from '../components/route-plot-map';
import { SaveToggleButton } from '../components/save-toggle-button';
import { SectionCard } from '../components/section-card';
import { StatusPill } from '../components/status-pill';
import { normalizeApiText, verdictForRating } from '../lib/format';
import { resolveApiUrl } from '../lib/api-base-url';
import { photoForRiver } from '../lib/route-photos';
import { routePreviewFactLine } from '../lib/route-facts';
import { endpointSnappedRouteCoordinates } from '../lib/river-geometry';
import {
  conditionScoreKey,
  coverageAnchorForRoute,
  coverageCenter,
  groupRoutesByConditionScore,
} from '../lib/river-coverage';
import {
  activeRiverHubFilterCount,
  filterRiverHubRoutes,
  routeDistanceMiles,
  type HubDifficultyFilter,
  type HubDistanceFilter,
} from '../lib/river-hub-filters';
import { androidBottomInset } from '../lib/safe-area';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { trackAppEvent } from '../lib/observability';
import { colors, radius, shadow, spacing } from '../theme/tokens';

const SORT_MODES = ['Best', 'Shortest', 'Easiest', 'Confidence'] as const;
const DISTANCE_FILTERS: Array<{ value: HubDistanceFilter; label: string }> = [
  { value: 'all', label: 'Any length' },
  { value: 'under-5', label: 'Under 5 mi' },
  { value: '5-10', label: '5–10 mi' },
  { value: '10-plus', label: '10+ mi' },
];
const DIFFICULTY_FILTERS: Array<{ value: HubDifficultyFilter; label: string }> = [
  { value: 'all', label: 'All difficulty' },
  { value: 'easy', label: 'Easy' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'hard', label: 'Hard' },
];
type SortMode = (typeof SORT_MODES)[number];
type MapCoordinate = { latitude: number; longitude: number };
type HubAccessPoint = NonNullable<RiverDetailApiResult['river']['accessPoints']>[number];

export default function RiverHubScreen() {
  const params = useLocalSearchParams<{ riverId?: string | string[] }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [expandedRoutes, setExpandedRoutes] = useState<Set<string>>(() => new Set());
  const [selectedRouteSlug, setSelectedRouteSlug] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('Best');
  const [distanceFilter, setDistanceFilter] = useState<HubDistanceFilter>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<HubDifficultyFilter>('all');
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [mapZoomLevel, setMapZoomLevel] = useState(5);
  const listRef = useRef<FlatList<RiverDetailApiResult> | null>(null);
  const routeCardScrollRequestRef = useRef<{ index: number; retries: number } | null>(null);
  const trackedHubIdRef = useRef<string | null>(null);
  const riverId = Array.isArray(params.riverId) ? params.riverId[0] : params.riverId ?? '';
  const groupQuery = useRiverGroupQuery(riverId);
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const result = groupQuery.data?.result ?? null;
  const allRoutes = result?.routes ?? [];
  const filters = useMemo(() => ({
    distance: distanceFilter,
    difficulty: difficultyFilter,
    region: regionFilter,
  }), [difficultyFilter, distanceFilter, regionFilter]);
  const filteredRoutes = useMemo(() => filterRiverHubRoutes(allRoutes, filters), [allRoutes, filters]);
  const bestRoute = useMemo(() => [...filteredRoutes].sort(compareBestRoute)[0] ?? null, [filteredRoutes]);
  const routes = useMemo(() => sortedRoutes(filteredRoutes, sortMode), [filteredRoutes, sortMode]);
  const routePoints = useMemo(() => routeMapPoints(routes, mapZoomLevel), [routes, mapZoomLevel]);
  const coverageSpans = useMemo(
    () => routes.map(routeSpanCoordinates).filter((span): span is MapCoordinate[] => Boolean(span && span.length >= 2)),
    [routes]
  );
  const selectedGeometryQuery = useRiverGeometryQuery(selectedRouteSlug ?? '');
  const selectedRoute = allRoutes.find((route) => route.river.slug === selectedRouteSlug) ?? null;
  const selectedMapPointId = useMemo(
    () => mapPointIdForRoute(selectedRoute, routes),
    [routes, selectedRoute]
  );
  const filterCount = activeRiverHubFilterCount(filters);
  const regions = result?.group.regions
    ?? [...new Set(allRoutes.map((route) => route.river.region))].sort();
  const selectedCanonicalSpan = useMemo(
    () => (selectedRoute ? endpointSnappedRouteCoordinates(selectedGeometryQuery.data, routeSpanCoordinates(selectedRoute)) : null),
    [selectedGeometryQuery.data, selectedRoute]
  );
  const canonicalSpans = useMemo(
    () => (selectedMapPointId && selectedCanonicalSpan ? new Map([[selectedMapPointId, selectedCanonicalSpan]]) : undefined),
    [selectedCanonicalSpan, selectedMapPointId]
  );

  useEffect(() => {
    if (routes.length === 0) {
      setSelectedRouteSlug(null);
      return;
    }

    setSelectedRouteSlug((current) => {
      if (current && routes.some((route) => route.river.slug === current)) {
        return current;
      }

      return bestRoute?.river.slug ?? routes[0].river.slug;
    });
  }, [bestRoute?.river.slug, routes]);

  useEffect(() => {
    if (!result || trackedHubIdRef.current === riverId) {
      return;
    }

    trackedHubIdRef.current = riverId;
    trackAppEvent('river_hub_viewed', {
      river_id: riverId,
      river: result.group.name,
      state: allRoutes[0]?.river.state,
      region: allRoutes[0]?.river.region,
      trip_option_count: allRoutes.length,
    });
  }, [allRoutes.length, result, riverId]);

  if (!riverId) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.stateTitle}>River hub is missing.</Text>
      </View>
    );
  }

  if (groupQuery.isLoading && !result) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.stateTitle}>Loading river hub</Text>
        <Text style={styles.stateBody}>Comparing the routes on this river.</Text>
      </View>
    );
  }

  if (groupQuery.isError && !result) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.stateTitle}>This river hub did not load.</Text>
        <Text style={styles.stateBody}>Couldn't load river routes. Pull to retry from the previous screen.</Text>
      </View>
    );
  }

  if (!result) {
    return null;
  }

  const summary = routeStatusSummary(allRoutes);
  const heroPhoto = result.group.heroPhoto;
  const bottomContentInset = androidBottomInset(insets.bottom);

  function toggleExpandedRoute(slug: string) {
    setExpandedRoutes((current) => {
      const next = new Set(current);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  function selectRouteFromMap(slug: string) {
    setSelectedRouteSlug(slug);
  }

  function viewRouteCard(slug: string) {
    const index = routes.findIndex((route) => route.river.slug === slug);
    if (index >= 0) {
      routeCardScrollRequestRef.current = { index, retries: 0 };
      listRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.08 });
    }
  }

  function openHubRoute(route: RiverDetailApiResult, source: 'river_hub_list') {
    trackAppEvent('corridor_trip_selected', {
      corridor_id: route.river.corridorId ?? route.river.conditionZoneId ?? route.river.riverId,
      slug: route.river.slug,
      grouped_reach_count: groupedReachCountForRoute(route, allRoutes),
      river: route.river.name,
      state: route.river.state,
      region: route.river.region,
      source,
    });
    router.push({ pathname: '/river/[slug]', params: { slug: route.river.slug, source: 'river-hub' } });
  }

  function renderRoute({ item: route, index }: { item: RiverDetailApiResult; index: number }) {
    return (
      <RouteChoiceCard
        route={route}
        groupedReachCount={groupedReachCountForRoute(route, allRoutes)}
        rank={index + 1}
        recommended={route.river.slug === bestRoute?.river.slug}
        selected={route.river.slug === selectedRouteSlug}
        saved={isSaved(route.river.slug)}
        expanded={expandedRoutes.has(route.river.slug)}
        onToggleExpanded={() => toggleExpandedRoute(route.river.slug)}
        onToggleSaved={() =>
          void toggleSavedRiver({
            slug: route.river.slug,
            riverId: route.river.riverId,
            name: route.river.name,
            reach: route.river.reach,
          })
        }
        onOpen={() => {
          openHubRoute(route, 'river_hub_list');
        }}
      />
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: result.group.name }} />
      <FlatList
        ref={listRef}
        data={routes}
        keyExtractor={(route) => route.river.slug}
        renderItem={renderRoute}
        style={styles.screen}
        contentContainerStyle={[styles.content, { paddingBottom: spacing.xl + bottomContentInset }]}
        initialNumToRender={8}
        maxToRenderPerBatch={6}
        windowSize={7}
        removeClippedSubviews
        onScrollToIndexFailed={({ index, averageItemLength }) => {
          listRef.current?.scrollToOffset({
            offset: Math.max(0, averageItemLength * index),
            animated: true,
          });
          const request = routeCardScrollRequestRef.current;
          if (!request || request.index !== index || request.retries >= 1) {
            return;
          }

          request.retries += 1;
          setTimeout(() => {
            listRef.current?.scrollToIndex({
              index,
              animated: true,
              viewPosition: 0.08,
            });
          }, 180);
        }}
        refreshControl={
          <RefreshControl
            tintColor={colors.accent}
            refreshing={groupQuery.isRefetching}
            onRefresh={() => groupQuery.refetch()}
          />
        }
        ListHeaderComponent={
          <View style={styles.headerStack}>
            <View style={styles.hero}>
              <ImageBackground
                source={{ uri: heroPhoto ? resolveApiUrl(heroPhoto.src) : photoForRiver(allRoutes[0].river) }}
                style={styles.heroPhoto}
                imageStyle={styles.heroPhotoImage}
                accessibilityRole="image"
                accessibilityLabel={heroPhoto?.alt ?? `${result.group.name} river`}
              >
                <View style={styles.heroPhotoScrim} />
                {heroPhoto ? (
                  <View style={styles.heroPhotoCaption}>
                    <Text style={styles.heroPhotoCaptionText}>{heroPhoto.caption}</Text>
                    <Text style={styles.heroPhotoCredit}>{heroPhoto.credit} · {heroPhoto.licenseLabel}</Text>
                  </View>
                ) : null}
              </ImageBackground>
              <View style={styles.heroCopy}>
                <Text style={styles.kicker}>{result.group.stateSummary} · River guide</Text>
                <Text style={styles.title}>{result.group.name}</Text>
                <Text style={styles.subtitle}>
                  {riverHubChoiceLine(result.group.routeCount, regions.length)} Compare paddle length, difficulty, and today’s conditions.
                </Text>
                <Text style={styles.routeCalls}>{hubStatusLine(summary, result.group.routeCount)}</Text>
              </View>
            </View>

            <View style={styles.listIntro}>
              <Text style={styles.listIntroTitle}>Choose a route</Text>
              <Text style={styles.listIntroSubtitle}>Start with paddle length, then narrow by difficulty or paddle area.</Text>
              <PaddleLengthOptions
                value={distanceFilter}
                onChange={(value) => {
                  setDistanceFilter(value);
                  trackAppEvent('river_hub_filter_applied', { river_id: riverId, filter: 'distance', value });
                }}
              />
              <View style={styles.filterActions}>
                <Pressable
                  style={[styles.moreFiltersButton, showMoreFilters ? styles.moreFiltersButtonActive : null]}
                  onPress={() => setShowMoreFilters((current) => !current)}
                  accessibilityRole="button"
                  accessibilityState={{ expanded: showMoreFilters }}
                >
                  <MaterialCommunityIcons name="tune-variant" color={colors.accent} size={16} />
                  <Text style={styles.moreFiltersButtonText}>
                    More filters{filterCount > Number(distanceFilter !== 'all') ? ` (${filterCount - Number(distanceFilter !== 'all')})` : ''}
                  </Text>
                </Pressable>
                {filterCount > 0 ? (
                  <Pressable
                    onPress={() => {
                      setDistanceFilter('all');
                      setDifficultyFilter('all');
                      setRegionFilter(null);
                    }}
                    accessibilityRole="button"
                  >
                    <Text style={styles.clearFiltersText}>Clear</Text>
                  </Pressable>
                ) : null}
              </View>
              {showMoreFilters ? (
                <View style={styles.moreFiltersPanel}>
                  <Text style={styles.filterLabel}>Difficulty</Text>
                  <View style={styles.filterChips}>
                    {DIFFICULTY_FILTERS.map((option) => (
                      <FilterChip
                        key={option.value}
                        label={option.label}
                        selected={difficultyFilter === option.value}
                        onPress={() => {
                          setDifficultyFilter(option.value);
                          trackAppEvent('river_hub_filter_applied', { river_id: riverId, filter: 'difficulty', value: option.value });
                        }}
                      />
                    ))}
                  </View>
                  {regions.length > 1 ? (
                    <>
                      <Text style={styles.filterLabel}>Paddle area</Text>
                      <View style={styles.filterChips}>
                        <FilterChip label="All areas" selected={!regionFilter} onPress={() => setRegionFilter(null)} />
                        {regions.map((region) => (
                          <FilterChip
                            key={region}
                            label={region}
                            selected={regionFilter === region}
                            onPress={() => {
                              setRegionFilter(region);
                              trackAppEvent('river_hub_filter_applied', { river_id: riverId, filter: 'region', value: region });
                            }}
                          />
                        ))}
                      </View>
                    </>
                  ) : null}
                </View>
              ) : null}
              <Text style={styles.resultCount}>
                Showing {routes.length} of {allRoutes.length} routes
                {filterCount ? ` · ${filterCount} active ${filterCount === 1 ? 'filter' : 'filters'}` : ''}
              </Text>
              <View style={styles.sortTabs}>
                {SORT_MODES.map((mode) => (
                  <Pressable
                    key={mode}
                    style={[styles.sortTab, sortMode === mode ? styles.sortTabSelected : null]}
                    onPress={() => setSortMode(mode)}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: sortMode === mode }}
                  >
                    <MaterialCommunityIcons name={sortIcon(mode) as never} color={sortMode === mode ? colors.surfaceStrong : colors.accent} size={15} />
                    <Text style={[styles.sortTabText, sortMode === mode ? styles.sortTabTextSelected : null]}>{mode}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {routes.length > 0 ? (
              <View style={styles.mapSection}>
                <SectionCard title="Compare on the map" subtitle="Tap a score to focus its route, then choose when to view the card.">
                  <View style={styles.mapFrame}>
                    <RoutePlotMap
                      points={routePoints}
                      selectedId={selectedMapPointId}
                      backgroundSpanSegments={coverageSpans}
                      canonicalSpans={canonicalSpans}
                      height={260}
                      fitToAllOnReady
                      fitToAllEdgePadding={24}
                      focusOnSelect
                      showAllControl
                      fullBleed
                      onSelectPoint={(point) => selectRouteFromMap(point.id)}
                      onViewSelected={(point) => viewRouteCard(point.id)}
                      onZoomLevelChange={setMapZoomLevel}
                    />
                  </View>
                </SectionCard>
              </View>
            ) : null}
          </View>
        }
        ListEmptyComponent={(
          <View style={styles.emptyResults}>
            <MaterialCommunityIcons name="filter-remove-outline" color={colors.textMuted} size={30} />
            <Text style={styles.emptyResultsTitle}>No routes match</Text>
            <Text style={styles.emptyResultsBody}>Clear a filter to see more of this river.</Text>
          </View>
        )}
      />
    </>
  );
}

function RouteChoiceCard({
  route,
  groupedReachCount,
  rank,
  recommended = false,
  selected,
  saved,
  expanded,
  onToggleExpanded,
  onToggleSaved,
  onOpen,
}: {
  route: RiverDetailApiResult;
  groupedReachCount: number;
  rank?: number;
  recommended?: boolean;
  selected: boolean;
  saved: boolean;
  expanded: boolean;
  onToggleExpanded: () => void;
  onToggleSaved: () => void;
  onOpen: () => void;
}) {
  return (
    <View style={[styles.routeCard, recommended ? styles.routeCardRecommended : null, selected ? styles.routeCardSelected : null]}>
      <Pressable style={styles.routeMainRow} onPress={onOpen} android_ripple={{ color: colors.canvasMuted }}>
        <View style={styles.routeThumb}>
          <ImageBackground
            source={{ uri: photoForRiver(route.river) }}
            style={styles.routeThumbImage}
            imageStyle={styles.routeThumbRadius}
          >
            <View style={[styles.routeThumbScore, route.river.scoreEligibility === 'planning' ? styles.routeThumbScorePlanning : toneScoreBox(route.rating)]}>
              <Text style={styles.routeThumbScoreValue}>{route.river.scoreEligibility === 'planning' ? '—' : route.score}</Text>
              <Text style={styles.routeThumbScoreLabel}>{route.river.scoreEligibility === 'planning' ? 'Planning' : 'Score'}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.routeCopy}>
          <View style={styles.routeBadgeRow}>
            {recommended ? <Text style={styles.recommendedBadge}>Recommended today</Text> : null}
            {rank ? <Text style={styles.routeRank}>Rank #{rank}</Text> : null}
            <SaveToggleButton compact saved={saved} onPress={onToggleSaved} />
          </View>
          {recommended ? <Text style={styles.recommendationReason}>{recommendationReason(route)}</Text> : null}
          <Text style={styles.routeVerdict}>{route.river.scoreEligibility === 'planning' ? 'Not scored today' : verdictForRating(route.rating)}</Text>
          <Text style={styles.routeName} numberOfLines={2}>{route.river.reach}</Text>
          <Text style={styles.routeMeta} numberOfLines={2}>
            {groupedReachCount} {groupedReachCount === 1 ? 'route uses' : 'routes share'} these conditions · {routeMetaLine(route)}
          </Text>
        </View>
      </Pressable>

      <View style={styles.reasonChips}>
        {route.river.scoreEligibility !== 'planning' ? <StatusPill status={route.liveData.overall} /> : null}
        <ReasonChip label={normalizeApiText(route.gaugeBandLabel)} />
        {route.river.scoreEligibility !== 'planning' ? <ReasonChip label={`${route.confidence.label} confidence`} /> : null}
        <ReasonChip label={buildSourceStrengthViewModel(route.river.profile.thresholdSourceStrength).waterLevelLabel} />
        {route.weather?.windMph ? <ReasonChip label={`${Math.round(route.weather.windMph)} mph wind`} /> : null}
      </View>

      {expanded && route.river.scoreEligibility !== 'planning' ? <ScoreBreakdownPanel route={route} /> : null}

      <View style={styles.routeFooter}>
        <Pressable onPress={onToggleExpanded} hitSlop={8}>
          <Text style={styles.whyButton}>{route.river.scoreEligibility === 'planning' ? 'View planning details' : expanded ? 'Hide score details' : 'Why this score?'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ScoreBreakdownPanel({ route }: { route: RiverDetailApiResult }) {
  const breakdown = route.scoreBreakdown;
  const rows = scoreBreakdownRows(breakdown);
  const capReasons = breakdown.capReasons
    .map((reason) => friendlyCapReason(reason))
    .filter((reason) => reason.length > 0);

  return (
    <View style={styles.scoreBreakdownPanel}>
      <Text style={styles.scoreBreakdownSummary}>
        River quality starts at {breakdown.riverQuality}. Weather shifts it to {breakdown.finalScore} today.
      </Text>
      <View style={styles.scoreBreakdownRows}>
        {rows.map((row) => (
          <View key={row.label} style={styles.scoreBreakdownRow}>
            <Text style={styles.scoreBreakdownLabel}>{row.label}</Text>
            <Text style={[styles.scoreBreakdownValue, scoreBreakdownValueTone(row.value)]}>
              {signedPoints(row.value)}
            </Text>
          </View>
        ))}
      </View>
      {capReasons.length > 0 ? (
        <View style={styles.scoreCapPanel}>
          <Text style={styles.scoreCapTitle}>What held today's score back</Text>
          {capReasons.map((reason) => (
            <Text key={reason} style={styles.scoreCapText}>- {reason}</Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function ReasonChip({ label }: { label: string }) {
  return (
    <View style={styles.reasonChip}>
      <Text style={styles.reasonChipText}>{label}</Text>
    </View>
  );
}

function PaddleLengthOptions({
  value,
  onChange,
}: {
  value: HubDistanceFilter;
  onChange: (value: HubDistanceFilter) => void;
}) {
  return (
    <View>
      <Text style={styles.filterLabel}>Paddle length</Text>
      <View style={styles.filterChips}>
        {DISTANCE_FILTERS.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            selected={value === option.value}
            onPress={() => onChange(option.value)}
          />
        ))}
      </View>
    </View>
  );
}

function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.filterChip, selected ? styles.filterChipSelected : null]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.filterChipText, selected ? styles.filterChipTextSelected : null]}>{label}</Text>
    </Pressable>
  );
}

function routeMapPoints(routes: RiverDetailApiResult[], zoomLevel = 5): RoutePlotPoint[] {
  routes = routes.filter((route) => route.river.scoreEligibility !== 'planning');
  if (zoomLevel >= 8.5) {
    return routes.map((route) => {
      const span = routeSpanCoordinates(route);
      const markerCoordinate = coverageAnchorForRoute(route, span) ?? mapMarkerCoordinate(route, span);
      return {
        id: route.river.slug,
        label: route.river.reach,
        latitude: markerCoordinate.latitude,
        longitude: markerCoordinate.longitude,
        score: route.score,
        rating: route.rating,
        markerAccessibilityLabel: `${route.river.reach}, score ${route.score}`,
        routeCount: 1,
        spanSegments: span ? [span] : [],
        meta: [route.river.reach, `${route.score} ${route.rating}`].filter(Boolean).join(' - '),
      };
    });
  }

  return groupRoutesByConditionScore(routes).map((group) => {
    const route = group.representative;
    const spanSegments = group.routes
      .map(routeSpanCoordinates)
      .filter((span): span is MapCoordinate[] => Boolean(span && span.length >= 2));
    const markerCoordinate = coverageAnchorForRoute(route, routeSpanCoordinates(route)) ?? mapMarkerCoordinate(route, routeSpanCoordinates(route));
    return {
      id: route.river.slug,
      label: group.regions.join(', ') || route.river.reach,
      latitude: markerCoordinate.latitude,
      longitude: markerCoordinate.longitude,
      score: route.score,
      rating: route.rating,
      markerAccessibilityLabel: `${group.routes.length} ${group.routes.length === 1 ? 'route shares' : 'routes share'} score ${route.score}`,
      routeCount: group.routes.length,
      spanSegments,
      meta: [
        `${group.routes.length} ${group.routes.length === 1 ? 'route' : 'routes'}`,
        accessPointCountLabel(route),
        `${route.score} ${route.rating}`,
      ]
        .filter(Boolean)
        .join(' - '),
    };
  });
}

function riverHubChoiceLine(_routeCount: number, areaCount: number) {
  const areaLabel = `${areaCount} ${areaCount === 1 ? 'paddle area' : 'paddle areas'}`;
  return `Choose a route across ${areaLabel}.`;
}

function mapPointIdForRoute(
  route: RiverDetailApiResult | null,
  routes: RiverDetailApiResult[]
) {
  if (!route) return null;
  const direct = routes.find((candidate) => candidate.river.slug === route.river.slug);
  if (direct) return direct.river.slug;
  const group = groupRoutesByConditionScore(routes).find((candidate) => (
    candidate.key === conditionScoreKey(route)
  ));
  return group?.representative.river.slug ?? route.river.slug;
}

function mapMarkerCoordinate(route: RiverDetailApiResult, spanCoordinates: MapCoordinate[] | null): MapCoordinate {
  if (spanCoordinates && spanCoordinates.length >= 2) {
    const start = spanCoordinates[0];
    const end = spanCoordinates[spanCoordinates.length - 1];
    return {
      latitude: (start.latitude + end.latitude) / 2,
      longitude: (start.longitude + end.longitude) / 2,
    };
  }

  return {
    latitude: route.river.latitude,
    longitude: route.river.longitude,
  };
}

function routeSpanCoordinates(route: RiverDetailApiResult): MapCoordinate[] | null {
  const accessPoints = route.river.accessPoints
    ?.map((point) => ({ point, coordinate: accessCoordinate(point) }))
    .filter(hasMappedAccessCoordinate)
    .sort((left, right) => left.point.mileFromStart - right.point.mileFromStart);

  if (accessPoints && accessPoints.length >= 2) {
    return accessPoints.map((entry) => entry.coordinate);
  }

  const endpoints = [accessCoordinate(route.river.putIn), accessCoordinate(route.river.takeOut)].filter(isMapCoordinate);
  if (endpoints.length >= 2) {
    return endpoints;
  }

  return null;
}

function accessPointCountLabel(route: RiverDetailApiResult) {
  const accessPointCount = route.river.accessPoints?.filter((point) => accessCoordinate(point)).length ?? 0;
  if (accessPointCount > 2) {
    return `${accessPointCount} access points`;
  }

  return null;
}

function accessCoordinate(point: { latitude?: number; longitude?: number } | null | undefined): MapCoordinate | null {
  if (!point || !Number.isFinite(point.latitude) || !Number.isFinite(point.longitude)) {
    return null;
  }

  return {
    latitude: point.latitude as number,
    longitude: point.longitude as number,
  };
}

function isMapCoordinate(coordinate: MapCoordinate | null): coordinate is MapCoordinate {
  return coordinate !== null;
}

function hasMappedAccessCoordinate(
  entry: { point: HubAccessPoint; coordinate: MapCoordinate | null }
): entry is { point: HubAccessPoint; coordinate: MapCoordinate } {
  return entry.coordinate !== null;
}

function routeStatusSummary(routes: RiverDetailApiResult[]) {
  return routes.reduce(
    (summary, route) => {
      if (route.river.scoreEligibility === 'planning') {
        summary.planning += 1;
        return summary;
      }
      if (route.rating === 'Strong' || route.rating === 'Good') {
        summary.paddleable += 1;
      } else if (route.rating === 'Fair') {
        summary.watch += 1;
      } else {
        summary.skip += 1;
      }
      return summary;
    },
    { paddleable: 0, watch: 0, skip: 0, planning: 0 }
  );
}

function hubStatusLine(summary: { paddleable: number; watch: number; skip: number; planning: number }, _total: number) {
  const planning = summary.planning > 0 ? ` · ${summary.planning} planning` : '';
  return `Today: ${summary.paddleable} good · ${summary.watch} watch · ${summary.skip} skip${planning}`;
}

function compareBestRoute(left: RiverDetailApiResult, right: RiverDetailApiResult) {
  if (left.river.scoreEligibility === 'planning') return 1;
  if (right.river.scoreEligibility === 'planning') return -1;
  return right.score - left.score || right.confidence.score - left.confidence.score || comparableDistance(left) - comparableDistance(right);
}

function sortedRoutes(routes: RiverDetailApiResult[], sortMode: SortMode) {
  const sorted = [...routes];
  if (sortMode === 'Shortest') {
    return sorted.sort((left, right) => comparableDistance(left) - comparableDistance(right) || compareBestRoute(left, right));
  }

  if (sortMode === 'Easiest') {
    return sorted.sort((left, right) => difficultyRank(left) - difficultyRank(right) || compareBestRoute(left, right));
  }

  if (sortMode === 'Confidence') {
    return sorted.sort((left, right) => right.confidence.score - left.confidence.score || compareBestRoute(left, right));
  }

  return sorted.sort(compareBestRoute);
}

function comparableDistance(route: RiverDetailApiResult) {
  return routeDistanceMiles(route) ?? Number.POSITIVE_INFINITY;
}

function difficultyRank(route: RiverDetailApiResult) {
  if (route.river.profile.difficulty === 'easy') return 0;
  if (route.river.profile.difficulty === 'moderate') return 1;
  return 2;
}

function distanceRangeForRoutes(routes: RiverDetailApiResult[]) {
  const distances = routes
    .map(routeDistanceMiles)
    .filter((distance): distance is number => distance !== null);
  if (distances.length === 0) {
    return null;
  }

  const min = Math.min(...distances);
  const max = Math.max(...distances);
  return `${formatDistance(min)}–${formatDistance(max)} mi`;
}

function formatDistance(distance: number) {
  return Number.isInteger(distance) ? String(distance) : String(Number(distance.toFixed(1)));
}

function difficultySummary(difficulties: Array<'easy' | 'moderate' | 'hard'>) {
  const present = new Set(difficulties);
  return (['easy', 'moderate', 'hard'] as const)
    .filter((difficulty) => present.has(difficulty))
    .map((difficulty) => `${difficulty.charAt(0).toUpperCase()}${difficulty.slice(1)}`)
    .join(' · ') || 'Varies';
}

function sortIcon(sortMode: SortMode) {
  if (sortMode === 'Shortest') return 'map-marker-distance';
  if (sortMode === 'Easiest') return 'waves';
  if (sortMode === 'Confidence') return 'shield-check-outline';
  return 'star-outline';
}

function corridorKey(route: RiverDetailApiResult) {
  return route.river.continuityStatus === 'condition-family'
    ? route.river.conditionZoneId || route.river.slug
    : route.river.corridorId || route.river.conditionZoneId || route.river.riverId || route.river.slug;
}

function groupedReachCountForRoute(route: RiverDetailApiResult, routes: RiverDetailApiResult[]) {
  const key = corridorKey(route);
  return routes.filter((candidate) => corridorKey(candidate) === key).length;
}

function routeMetaLine(route: RiverDetailApiResult) {
  return routePreviewFactLine(route.river);
}

function recommendationReason(route: RiverDetailApiResult) {
  return [
    route.gaugeBandLabel ? normalizeApiText(route.gaugeBandLabel) : null,
    route.weather?.windMph ? `${Math.round(route.weather.windMph)} mph wind` : null,
    route.confidence?.label ? `${route.confidence.label} confidence` : null,
  ].filter(Boolean).join(' Â· ');
}

function scoreBreakdownRows(breakdown: ScoreBreakdown) {
  const rows = [
    { label: 'River quality', value: breakdown.riverQuality },
    { label: 'Wind', value: breakdown.windAdjustment },
    { label: 'Temperature', value: breakdown.temperatureAdjustment },
    { label: 'Rain timing', value: breakdown.rainAdjustment },
  ];

  if (breakdown.comfortAdjustment !== 0) {
    rows.push({ label: 'Other', value: breakdown.comfortAdjustment });
  }

  if (breakdown.finalScore !== breakdown.rawTripScore) {
    rows.push({ label: 'Limit applied', value: breakdown.finalScore - breakdown.rawTripScore });
  }

  return rows;
}

function scoreBreakdownValueTone(value: number) {
  if (value > 0) {
    return { color: colors.accentDeep };
  }

  if (value < 0) {
    return { color: colors.noGo };
  }

  return { color: colors.textMuted };
}

function toneScoreBox(rating: RiverDetailApiResult['rating']) {
  if (rating === 'Strong' || rating === 'Good') {
    return { backgroundColor: colors.accentSoft };
  }

  if (rating === 'Fair') {
    return { backgroundColor: '#EFE7D0' };
  }

  return { backgroundColor: '#F0DDD3' };
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
  headerStack: {
    gap: spacing.md,
  },
  hero: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadow,
  },
  heroPhoto: {
    height: 190,
    justifyContent: 'flex-end',
    backgroundColor: colors.canvasMuted,
  },
  heroPhotoImage: {
    resizeMode: 'cover',
  },
  heroPhotoScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 24, 31, 0.22)',
  },
  heroPhotoCaption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'rgba(9, 24, 31, 0.62)',
    gap: 1,
  },
  heroPhotoCaptionText: {
    color: colors.surfaceStrong,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '900',
  },
  heroPhotoCredit: {
    color: 'rgba(255, 255, 255, 0.82)',
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '700',
  },
  heroCopy: {
    padding: spacing.lg,
    gap: 9,
  },
  kicker: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
  },
  heroFacts: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
  },
  heroFactsCompact: {
    flexWrap: 'wrap',
    rowGap: spacing.sm,
  },
  heroFact: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: 8,
    justifyContent: 'center',
    gap: 2,
  },
  heroFactCompact: {
    flexBasis: '46%',
    minWidth: '46%',
  },
  heroFactLabel: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  heroFactValue: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '900',
  },
  routeCalls: {
    color: colors.accentDeep,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '900',
    marginTop: -2,
  },
  mapSection: {
    ...shadow,
  },
  mapFrame: {
    overflow: 'hidden',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.canvasMuted,
  },
  listIntro: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 3,
    ...shadow,
  },
  listIntroTitle: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '900',
  },
  listIntroSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  filterLabel: {
    color: colors.textMuted,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.sm,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 5,
  },
  filterChip: {
    minHeight: 36,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  filterChipSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  filterChipText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  filterChipTextSelected: {
    color: colors.surfaceStrong,
  },
  filterActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  moreFiltersButton: {
    minHeight: 36,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  moreFiltersButtonActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  moreFiltersButtonText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  clearFiltersText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
    padding: 8,
  },
  moreFiltersPanel: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  resultCount: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  sortTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: spacing.sm,
  },
  sortTab: {
    minHeight: 34,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  sortTabSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  sortTabText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  sortTabTextSelected: {
    color: colors.surfaceStrong,
  },
  emptyResults: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    gap: 5,
  },
  emptyResultsTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  emptyResultsBody: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
  },
  routeCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
    gap: 7,
    overflow: 'hidden',
  },
  routeCardRecommended: {
    backgroundColor: colors.accentSoft,
    borderColor: '#BFD6CC',
  },
  routeCardSelected: {
    borderColor: colors.accent,
  },
  routeMainRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  routeThumb: {
    width: 76,
    height: 76,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.canvasMuted,
  },
  routeThumbImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 6,
  },
  routeThumbRadius: {
    borderRadius: radius.md,
  },
  routeThumbScore: {
    minWidth: 36,
    minHeight: 32,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  routeThumbScorePlanning: {
    backgroundColor: colors.canvasMuted,
  },
  routeThumbScoreValue: {
    color: colors.accentDeep,
    fontSize: 18,
    lineHeight: 19,
    fontWeight: '900',
  },
  routeThumbScoreLabel: {
    color: colors.accentDeep,
    fontSize: 8,
    lineHeight: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  routeCopy: {
    flex: 1,
    gap: 3,
    paddingTop: 1,
  },
  routeBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  recommendedBadge: {
    color: colors.accentDeep,
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.pill,
    overflow: 'hidden',
    paddingHorizontal: 7,
    paddingVertical: 2,
    fontSize: 10,
    fontWeight: '900',
  },
  recommendationReason: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
  },
  routeName: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '900',
  },
  routeVerdict: {
    color: colors.accentDeep,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '900',
  },
  routeMeta: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
  },
  routeRank: {
    color: colors.accentDeep,
    fontSize: 11,
    fontWeight: '900',
  },
  reasonChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  reasonChip: {
    minHeight: 23,
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  reasonChipText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
  },
  factRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
  },
  factText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  routeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: spacing.md,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  whyButton: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  scoreBreakdownPanel: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  scoreBreakdownSummary: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
  },
  scoreBreakdownRows: {
    gap: 6,
  },
  scoreBreakdownRow: {
    minHeight: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  scoreBreakdownLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
  },
  scoreBreakdownValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  scoreCapPanel: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    gap: 4,
  },
  scoreCapTitle: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  scoreCapText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
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
    fontWeight: '800',
    textAlign: 'center',
  },
  stateBody: {
    color: colors.textMuted,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
