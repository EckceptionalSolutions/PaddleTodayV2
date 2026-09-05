import {
  buildRoutePlannerParams,
  callStateForDecision,
  formatRouteSegmentLabel,
  routeMatchesPaddleFilters,
  routeSegmentSummary,
  selectRouteSegment,
  type RouteSegment,
  type RiverSummaryApiItem,
} from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { riverDetailQueryOptions, riverGroupQueryOptions, useRiverGeometryQuery, useRiverSummaryQuery } from '../api/queries';
import { AppErrorState, AppLoadingState, AppRefreshNotice } from '../components/app-state';
import { ExploreSearchBar } from '../components/explore-controls';
import {
  ExploreFilterSheet,
  campingMatches,
  countActiveFilters,
  defaultFilters,
  difficultyMatches,
  isExploreFilters,
  paddleTimeMatches,
  routeTypeMatches,
  statusMatches,
  type ExploreFilters,
} from '../components/explore-filter-sheet';
import {
  ExploreRouteDrawer,
  sheetHeightValue,
  type MapSheetSnap,
} from '../components/explore-route-drawer';
import { RoutePlotMap, type RoutePlotMapHandle } from '../components/route-plot-map';
import { RiverCard } from '../components/river-card';
import { useStoredLocation } from '../hooks/use-stored-location';
import { resolveApiBaseUrl } from '../lib/api-base-url';
import { androidBottomInset } from '../lib/safe-area';
import { distanceMiles, distancePenalty, formatTravelTime } from '../lib/location';
import {
  EXPLORE_PREFERENCES_STORAGE_KEY,
  filtersForExploreIntent,
  isExploreIntentId,
  type ExploreIntentId,
} from '../lib/explore-intents';
import { trackAppEvent } from '../lib/observability';
import { endpointSnappedRouteCoordinates } from '../lib/river-geometry';
import { buildExploreMapPoints, dedupeExploreRoutes, routeSpanCoordinatesForRiver, type ExploreRiver } from '../lib/explore-map-model';
import { exploreCameraAction, type ExploreCameraState } from '../lib/explore-camera';
import { individualRoutesAtZoom } from '../lib/map-viewport';
import {
  buildRouteGroupMeta,
  routeGroupMetaForRoute,
} from '../lib/route-groups';
import { isRecord, parseJson } from '../lib/storage';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

interface ExplorePreferences {
  filters: ExploreFilters;
  viewMode?: 'list' | 'map';
}

const confidenceRank = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const liveRank = {
  live: 3,
  degraded: 2,
  offline: 1,
};

export default function ExploreScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isFocused = useIsFocused();
  const navigationPendingRef = useRef(false);
  const params = useLocalSearchParams<{ intent?: string; intentKey?: string; reset?: string; state?: string; transientIntent?: string }>();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const summaryQuery = useRiverSummaryQuery();
  const { location, status, requestLocation } = useStoredLocation();
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<ExploreFilters>(defaultFilters);
  const [draftFilters, setDraftFilters] = useState<ExploreFilters>(defaultFilters);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [preferencesHydrated, setPreferencesHydrated] = useState(false);
  const appliedStoredLocationDefaultRef = useRef(false);
  const appliedIntentRef = useRef<string | null>(null);
  const transientIntentFiltersRef = useRef<ExploreFilters | null>(null);
  const appliedResetRef = useRef<string | null>(null);
  const appliedStateRef = useRef<string | null>(null);
  const requestedIntent = isExploreIntentId(params.intent) ? params.intent : null;
  const requestedReset = params.reset === '1';
  const requestedState = typeof params.state === 'string' && params.state.trim() ? params.state.trim() : null;
  const locationReady = Boolean(location);
  const requestedIntentKey = requestedIntent ? `${requestedIntent}:${params.intentKey ?? 'initial'}:${locationReady ? 'location' : 'no-location'}` : null;
  const requestedResetKey = requestedReset ? `reset:${params.intentKey ?? 'initial'}` : null;
  const requestedStateKey = requestedState ? `state:${requestedState}:${params.intentKey ?? 'initial'}` : null;

  const rivers = summaryQuery.data?.rivers ?? [];
  const routeCounts = useMemo(() => buildRouteGroupMeta(rivers), [rivers]);
  const states = useMemo(
    () => [...new Set(rivers.map((river) => river.river.state))].sort(),
    [rivers]
  );
  const nearestSupportedState = useMemo(
    () => nearestStateForLocation(rivers, location),
    [rivers, location]
  );
  const results = useMemo(
    () => applyExploreFilters(rivers, filters, location),
    [rivers, filters, location]
  );
  const draftResults = useMemo(
    () => filtersOpen ? applyExploreFilters(rivers, draftFilters, location) : results,
    [rivers, draftFilters, location, filtersOpen, results]
  );
  const selectedRiver = selectedSlug ? results.find((river) => river.river.slug === selectedSlug) ?? null : null;
  const activeFilterCount = countActiveFilters(filters);
  const bottomContentInset = androidBottomInset(insets.bottom);

  useFocusEffect(useCallback(() => {
    navigationPendingRef.current = false;
  }, []));

  // Warm only a settled selection, never every marker in the viewport. The
  // detail screen shares this query key and joins an in-flight request.
  useEffect(() => {
    if (!selectedSlug || !isFocused || viewMode !== 'map') return;
    const timeout = setTimeout(() => {
      void queryClient.prefetchQuery(riverDetailQueryOptions(selectedSlug));
    }, 200);
    return () => clearTimeout(timeout);
  }, [isFocused, queryClient, selectedSlug, viewMode]);

  useEffect(() => {
    void hydrateExplorePreferences();
  }, []);

  useEffect(() => {
    if (!filtersOpen) {
      return;
    }

    setDraftFilters(filters);
  }, [filters, filtersOpen]);

  useEffect(() => {
    if (!preferencesHydrated || requestedIntent || requestedReset || !location || appliedStoredLocationDefaultRef.current) {
      return;
    }

    appliedStoredLocationDefaultRef.current = true;
    setFilters((current) => {
      if (current.sort !== defaultFilters.sort || countActiveFilters(current) > 0) {
        return current;
      }

      return {
        ...current,
        sort: 'nearest',
        state: nearestSupportedState ?? current.state,
      };
    });
  }, [location, nearestSupportedState, preferencesHydrated, requestedIntent, requestedReset]);

  useEffect(() => {
    if (!preferencesHydrated || !requestedResetKey || appliedResetRef.current === requestedResetKey) {
      return;
    }

    appliedResetRef.current = requestedResetKey;
    setSelectedSlug(null);
    setFilters(defaultFilters);
    setDraftFilters(defaultFilters);
  }, [preferencesHydrated, requestedResetKey]);

  useEffect(() => {
    if (!preferencesHydrated || !requestedIntent || !requestedIntentKey || appliedIntentRef.current === requestedIntentKey) {
      return;
    }

    const intentFilters = filtersForExploreIntent(requestedIntent, { locationReady });
    appliedIntentRef.current = requestedIntentKey;
    if (params.transientIntent === '1') {
      transientIntentFiltersRef.current = intentFilters;
    }
    setSelectedSlug(null);
    setFilters(intentFilters);
    setDraftFilters(intentFilters);
  }, [locationReady, params.transientIntent, preferencesHydrated, requestedIntent, requestedIntentKey]);

  useEffect(() => {
    if (!preferencesHydrated || requestedIntent || requestedReset || !requestedState || !requestedStateKey || appliedStateRef.current === requestedStateKey) {
      return;
    }

    appliedStateRef.current = requestedStateKey;
    const stateFilters = {
      ...defaultFilters,
      state: requestedState,
    };
    setSelectedSlug(null);
    setFilters(stateFilters);
    setDraftFilters(stateFilters);
  }, [preferencesHydrated, requestedIntent, requestedReset, requestedState, requestedStateKey]);

  useEffect(() => {
    if (!preferencesHydrated) {
      return;
    }

    if (transientIntentFiltersRef.current) {
      if (filters === transientIntentFiltersRef.current) {
        transientIntentFiltersRef.current = null;
      }
      return;
    }

    void AsyncStorage.setItem(
      EXPLORE_PREFERENCES_STORAGE_KEY,
      JSON.stringify({ filters, viewMode })
    );
  }, [filters, preferencesHydrated, viewMode]);

  useEffect(() => {
    if (results.length === 0) {
      setSelectedSlug(null);
      return;
    }

    if (selectedSlug && !results.some((river) => river.river.slug === selectedSlug)) {
      setSelectedSlug(null);
    }
  }, [results, selectedSlug]);

  if (summaryQuery.isLoading && rivers.length === 0) {
    return (
      <AppLoadingState title="Loading explore map" body="Loading routes and filters." />
    );
  }

  if (summaryQuery.isError && rivers.length === 0) {
    return (
      <AppErrorState
        title="Explore did not load"
        body="The map needs the latest route updates."
        detail={errorDetailForExploreQuery(summaryQuery.error)}
        onRetry={() => summaryQuery.refetch()}
      />
    );
  }

  const filterModal = (
    <ExploreFilterSheet
      visible={filtersOpen}
      matchCount={draftResults.length}
      filters={draftFilters}
      states={states}
      locationReady={Boolean(location)}
      onDismiss={() => setFiltersOpen(false)}
      onApply={() => {
        setFilters(draftFilters);
        setFiltersOpen(false);
        trackAppEvent('explore_filter_applied', {
          paddle_length: draftFilters.paddleLength,
          paddle_time: draftFilters.paddleTime,
          active_filter_count: countActiveFilters(draftFilters),
        });
      }}
      onChange={setDraftFilters}
      onReset={() => setDraftFilters(defaultFilters)}
      onApplyPreset={(apply) => setDraftFilters((current) => apply(current))}
    />
  );

  return (
    <>
      <FullScreenExploreMap
        activeFilterCount={activeFilterCount}
        filters={filters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        mapHeight={windowHeight}
        results={results}
        selectedRiver={selectedRiver}
        selectedSlug={selectedSlug}
        status={status}
        bottomInset={bottomContentInset}
        topInset={insets.top}
        userLocation={location}
        routeCounts={routeCounts}
        isRefetchError={summaryQuery.isRefetchError}
        dataUpdatedAt={summaryQuery.dataUpdatedAt}
        onRetry={() => void summaryQuery.refetch()}
        onFilterPress={() => setFiltersOpen(true)}
        onContributePhotos={(slug) => {
          trackAppEvent('route_photo_contribution_started', { slug, source: 'explore_tray' });
          router.push({ pathname: '/contribute-photo/[slug]', params: { slug } });
        }}
        onOpenRiverRoutes={openExploreRiverRoutes}
        onOpenRoute={openExploreRoute}
        onPrepareRoute={prepareExploreRoute}
        onSearchChange={(query) => setFilters((current) => ({ ...current, query }))}
        onSelectSlug={setSelectedSlug}
        onUseLocation={() => void requestLocation()}
        isSaved={isSaved}
        onFocusNearest={() => {
          setFilters((current) => ({ ...current, sort: 'nearest' }));
          void requestLocation();
        }}
        onToggleSaved={(river) =>
          void toggleSavedRiver({
            slug: river.river.slug,
            riverId: river.river.riverId,
            name: river.river.name,
            reach: river.river.reach,
          })
        }
      />

      {filterModal}
    </>
  );

  async function hydrateExplorePreferences() {
    try {
      const parsed = parseJson(await AsyncStorage.getItem(EXPLORE_PREFERENCES_STORAGE_KEY));
      if (isExplorePreferences(parsed) && !requestedIntent && !requestedReset && !requestedState) {
        setFilters(normalizeExploreFilters(parsed.filters));
        setViewMode(parsed.viewMode ?? 'map');
      }
    } catch {
      // Leave the default Explore setup if local preferences are unavailable.
    } finally {
      setPreferencesHydrated(true);
    }
  }

  function openExploreRiverRoutes(route: ExploreRiver) {
    if (route.selectedSegment) {
      openExploreRoute(route);
      return;
    }

    const routeCount = routeGroupMetaForRoute(route, routeCounts).routeCount;
    if (route.river.riverId && routeCount > 1) {
      if (navigationPendingRef.current) return;
      navigationPendingRef.current = true;
      router.push({ pathname: '/river-hub/[riverId]', params: { riverId: route.river.riverId } });
    }
  }

  function openExploreRoute(route: ExploreRiver) {
    if (navigationPendingRef.current) return;
    navigationPendingRef.current = true;
    if (route.selectedSegment) {
      trackAppEvent('route_planner_opened_from_filter', {
        slug: route.river.slug,
        river_id: route.river.riverId,
        put_in_id: route.selectedSegment.putIn.id,
        take_out_id: route.selectedSegment.takeOut.id,
        segment_distance_miles: route.selectedSegment.distanceMiles,
        source: 'explore_card',
      });
    }

    router.push({
      pathname: '/river/[slug]',
      params: {
        slug: route.river.slug,
        ...buildRoutePlannerParams(route.selectedSegment),
      },
    });
  }

  function prepareExploreRoute(route: ExploreRiver) {
    const grouped = !route.selectedSegment && route.river.riverId && routeGroupMetaForRoute(route, routeCounts).routeCount > 1;
    if (grouped) {
      void queryClient.prefetchQuery(riverGroupQueryOptions(route.river.riverId!));
    } else {
      void queryClient.prefetchQuery(riverDetailQueryOptions(route.river.slug));
    }
  }
}

function FullScreenExploreMap({
  activeFilterCount,
  filters,
  viewMode,
  onViewModeChange,
  mapHeight,
  results,
  selectedRiver,
  selectedSlug,
  status,
  bottomInset,
  topInset,
  userLocation,
  routeCounts,
  isRefetchError,
  dataUpdatedAt,
  onRetry,
  onFilterPress,
  onFocusNearest,
  onContributePhotos,
  onOpenRiverRoutes,
  onOpenRoute,
  onPrepareRoute,
  onSearchChange,
  onSelectSlug,
  onToggleSaved,
  onUseLocation,
  isSaved,
}: {
  activeFilterCount: number;
  filters: ExploreFilters;
  viewMode: 'map' | 'list';
  onViewModeChange: (mode: 'map' | 'list') => void;
  mapHeight: number;
  results: ExploreRiver[];
  selectedRiver: ExploreRiver | null;
  selectedSlug: string | null;
  status: string;
  bottomInset: number;
  topInset: number;
  userLocation: { latitude: number; longitude: number; label: string } | null;
  routeCounts: ReadonlyMap<string, number>;
  isRefetchError: boolean;
  dataUpdatedAt?: number;
  onRetry: () => void;
  onFilterPress: () => void;
  onFocusNearest: () => void;
  onContributePhotos: (slug: string) => void;
  onOpenRiverRoutes: (route: ExploreRiver) => void;
  onOpenRoute: (route: ExploreRiver) => void;
  onPrepareRoute: (route: ExploreRiver) => void;
  onSearchChange: (query: string) => void;
  onSelectSlug: (slug: string | null) => void;
  onToggleSaved: (river: RiverSummaryApiItem) => void;
  onUseLocation: () => void;
  isSaved: (slug: string) => boolean;
}) {
  const [sheetSnap, setSheetSnap] = useState<MapSheetSnap>('half');
  const mapRef = useRef<RoutePlotMapHandle | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const onMapReady = useCallback(() => setMapReady(true), []);
  const isFocused = useIsFocused();
  const [individualRoutes, setIndividualRoutes] = useState(false);
  const cameraStateRef = useRef<ExploreCameraState | null>(null);
  const selectedRouteCount = selectedRiver ? routeGroupMetaForRoute(selectedRiver, routeCounts).routeCount : 0;
  // Load the representative route geometry for grouped results too. Without
  // this, a grouped river selection only had access-point chords to draw,
  // which can visibly cut across bends instead of following the river.
  const selectedGeometryQuery = useRiverGeometryQuery(selectedSlug ?? '', isFocused && viewMode === 'map');
  const points = useMemo(
    () => buildExploreMapPoints(results, routeCounts, results, individualRoutes),
    [routeCounts, results, individualRoutes]
  );
  const onMapZoomChange = useCallback((zoom: number) => setIndividualRoutes((current) => individualRoutesAtZoom(current, zoom)), []);
  const matchingRiverCount = useMemo(() => dedupeExploreRoutes(results).length, [results]);
  const selectedMapPointId = useMemo(
    () => points.find((point) => point.routeSlugs.includes(selectedSlug ?? ''))?.id ?? null,
    [points, selectedSlug]
  );
  const selectedCanonicalSpan = useMemo(
    () => (selectedRiver ? endpointSnappedRouteCoordinates(selectedGeometryQuery.data, routeSpanCoordinatesForRiver(selectedRiver)) ?? routeSpanCoordinatesForRiver(selectedRiver) : null),
    [selectedGeometryQuery.data, selectedRiver]
  );
  const canonicalSpans = useMemo(
    () => (selectedMapPointId && selectedCanonicalSpan ? new Map([[selectedMapPointId, selectedCanonicalSpan]]) : undefined),
    [selectedCanonicalSpan, selectedMapPointId]
  );
  const requesting = status === 'requesting';
  const floatingControlBottom = (selectedRiver ? sheetHeightValue(sheetSnap) : 0) + spacing.md;
  const userOutOfRange = Boolean(userLocation && results.length === 0 && activeFilterCount === 0);
  const filterFocusSignature = [
    filters.query,
    filters.state,
    filters.difficulty,
    filters.routeType,
    filters.status,
    filters.rating,
    filters.paddleTime,
    filters.paddleLength,
    filters.distance,
    filters.camping,
    filters.sort,
  ].join('|');
  const overlayTop = topInset + 216;

  const cameraContext = `${filterFocusSignature}|${userLocation?.latitude ?? ''}|${userLocation?.longitude ?? ''}`;
  const hasPoints = points.length > 0;
  useEffect(() => {
    if (viewMode !== 'map' || !hasPoints) {
      setMapReady(false);
      cameraStateRef.current = null;
    }
  }, [hasPoints, viewMode]);
  useEffect(() => {
    if (!isFocused || viewMode !== 'map' || !hasPoints || !mapReady) return;
    const frame = requestAnimationFrame(() => {
      const next = { context: cameraContext, selectedSlug };
      const action = exploreCameraAction(cameraStateRef.current, next, activeFilterCount > 0, Boolean(userLocation));
      cameraStateRef.current = next;
      if (action === 'all') mapRef.current?.focusAll();
      else if (action === 'user') mapRef.current?.focusUserArea();
    });
    return () => cancelAnimationFrame(frame);
  }, [activeFilterCount, cameraContext, hasPoints, isFocused, mapReady, selectedSlug, viewMode]);

  function handleGpsFocus() {
    if (userLocation) {
      mapRef.current?.focusUserArea();
    }

    onFocusNearest();
  }

  if (viewMode === 'list') {
    return (
      <ExploreListView
        activeFilterCount={activeFilterCount}
        bottomInset={bottomInset}
        dataUpdatedAt={dataUpdatedAt}
        filters={filters}
        isRefetchError={isRefetchError}
        results={results}
        routeCounts={routeCounts}
        topInset={topInset}
        onFilterPress={onFilterPress}
        onSearchChange={onSearchChange}
        onOpenRoute={onOpenRoute}
        onPrepareRoute={onPrepareRoute}
        onOpenRiverRoutes={onOpenRiverRoutes}
        onRetry={onRetry}
        onToggleSaved={onToggleSaved}
        onViewModeChange={onViewModeChange}
        isSaved={isSaved}
      />
    );
  }

  return (
    <View style={styles.fullMapScreen}>
      {results.length > 0 ? (
          <RoutePlotMap
            ref={mapRef}
            onReady={onMapReady}
            points={points}
            selectedId={selectedMapPointId}
            canonicalSpans={canonicalSpans}
            selectedFocusBottomInset={selectedRiver ? sheetHeightValue(sheetSnap) + bottomInset : 0}
          userLocation={userLocation}
            onSelectPoint={(point) => {
            if (!selectedSlug) setSheetSnap('half');
            onSelectSlug(points.find((candidate) => candidate.id === point.id)?.routeSlug ?? null);
          }}
          height={mapHeight}
          showFooter={false}
          fullBleed
          clusterMarkers
          dimUnselectedMarkers={false}
          refitOnPointChanges={false}
          onZoomLevelChange={onMapZoomChange}
        />
      ) : (
        <View style={[styles.fullMapEmptyCanvas, { height: mapHeight }]}>
          <MaterialCommunityIcons name="map-search-outline" color={colors.textMuted} size={32} />
          <Text style={styles.mapEmptyTitle}>No routes on this map</Text>
          <Text style={styles.mapEmptyText}>Broaden filters or clear search.</Text>
        </View>
      )}

      <View style={[styles.fullMapTopControls, { paddingTop: topInset + spacing.md }]}>
        <AppRefreshNotice
          isError={isRefetchError}
          dataUpdatedAt={dataUpdatedAt}
          onRetry={onRetry}
        />
        <ExploreSearchBar query={filters.query} onQueryChange={onSearchChange} />
        <View style={styles.mapUnderSearchRow}>
          <Pressable
            style={[styles.mapFilterButton, activeFilterCount > 0 ? styles.mapFilterButtonActive : null]}
            onPress={onFilterPress}
            accessibilityRole="button"
            accessibilityLabel={activeFilterCount > 0 ? `${activeFilterCount} active filters` : 'Filters'}
          >
            <MaterialCommunityIcons
              name="tune-variant"
              color={activeFilterCount > 0 ? colors.surfaceStrong : colors.accent}
              size={19}
            />
            <Text style={[styles.mapFilterButtonText, activeFilterCount > 0 ? styles.mapFilterButtonTextActive : null]}>
              Filters
            </Text>
            {activeFilterCount > 0 ? (
              <View style={styles.mapFilterCount}>
                <Text style={styles.mapFilterCountText}>{activeFilterCount}</Text>
              </View>
            ) : null}
          </Pressable>
          <View
            style={styles.mapStatusChip}
            accessibilityRole="text"
             accessibilityLabel={`${results.length} matching routes across ${matchingRiverCount} rivers. Nearby map locations cluster together; tap a cluster to zoom in.`}
            >
              <Text style={styles.mapStatusChipText} numberOfLines={1}>
                {`${results.length} ${results.length === 1 ? 'route' : 'routes'} · ${matchingRiverCount} ${matchingRiverCount === 1 ? 'river' : 'rivers'}`}
              </Text>
           </View>
         </View>
        <ExploreViewToggle mode={viewMode} onChange={onViewModeChange} />
      </View>

      {userOutOfRange ? (
        <View style={[styles.coverageBanner, { top: overlayTop }]}>
          <MaterialCommunityIcons name="map-marker-distance" color={colors.accent} size={18} />
          <Text style={styles.coverageBannerText}>
            PaddleToday covers selected Midwest rivers.
          </Text>
        </View>
      ) : null}

      <View style={[styles.mapOverlayActions, { top: overlayTop + (userOutOfRange ? 56 : 0) }]}>
        {selectedRiver ? <Pressable
          style={styles.mapFab}
          onPress={() => mapRef.current?.focusSelected()}
          accessibilityRole="button"
          accessibilityLabel="Center selected route"
        >
          <MaterialCommunityIcons name="crosshairs" color={colors.accent} size={20} />
        </Pressable> : null}
        <Pressable
          style={styles.mapFab}
          onPress={() => mapRef.current?.focusAll()}
          accessibilityRole="button"
          accessibilityLabel="Show all rivers"
        >
          <MaterialCommunityIcons name="map-marker-multiple" color={colors.accent} size={20} />
        </Pressable>
        <Pressable
          style={styles.mapFab}
          onPress={handleGpsFocus}
          accessibilityRole="button"
          accessibilityLabel="Focus nearest rivers"
        >
          <MaterialCommunityIcons name="crosshairs-gps" color={colors.accent} size={20} />
        </Pressable>
      </View>

      {!userLocation ? (
        <Pressable
          style={[styles.fullMapLocationPrompt, { bottom: floatingControlBottom }]}
          disabled={requesting}
          onPress={onUseLocation}
          accessibilityRole="button"
          accessibilityLabel={requesting ? 'Finding location' : status === 'denied' ? 'Location off' : 'Use location'}
        >
          <MaterialCommunityIcons name="map-marker-radius-outline" color={colors.accent} size={18} />
          <Text style={styles.fullMapLocationText}>
            {requesting ? 'Finding location' : status === 'denied' ? 'Location off' : 'Use location'}
          </Text>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.fullMapLocationPrompt, { bottom: floatingControlBottom }]}
          onPress={handleGpsFocus}
          accessibilityRole="button"
          accessibilityLabel="Focus nearest rivers"
        >
          <MaterialCommunityIcons name="crosshairs-gps" color={colors.accent} size={18} />
          <Text style={styles.fullMapLocationText}>Near you</Text>
        </Pressable>
      )}

      {selectedRiver ? (
        <ExploreRouteDrawer
          selectedRiver={selectedRiver}
          sheetSnap={sheetSnap}
          setSheetSnap={setSheetSnap}
          bottomInset={bottomInset}
          routeCount={selectedRouteCount}
          isSaved={isSaved}
          onClose={() => {
            setSheetSnap('half');
            onSelectSlug(null);
          }}
          onOpenRoute={() => {
            if (selectedRiver) {
              onOpenRoute(selectedRiver);
            }
          }}
          onOpenRiverRoutes={() => {
            if (selectedRiver) {
              onOpenRiverRoutes(selectedRiver);
            }
          }}
          onContributePhotos={onContributePhotos}
          onToggleSaved={onToggleSaved}
        />
      ) : null}
    </View>
  );
}

function ExploreListView({
  activeFilterCount,
  bottomInset,
  dataUpdatedAt,
  filters,
  isRefetchError,
  results,
  routeCounts,
  topInset,
  onFilterPress,
  onOpenRoute,
  onPrepareRoute,
  onOpenRiverRoutes,
  onRetry,
  onSearchChange,
  onToggleSaved,
  onViewModeChange,
  isSaved,
}: {
  activeFilterCount: number;
  bottomInset: number;
  dataUpdatedAt?: number;
  filters: ExploreFilters;
  isRefetchError: boolean;
  results: ExploreRiver[];
  routeCounts: ReadonlyMap<string, number>;
  topInset: number;
  onFilterPress: () => void;
  onOpenRoute: (route: ExploreRiver) => void;
  onPrepareRoute: (route: ExploreRiver) => void;
  onOpenRiverRoutes: (route: ExploreRiver) => void;
  onRetry: () => void;
  onSearchChange: (query: string) => void;
  onToggleSaved: (river: RiverSummaryApiItem) => void;
  onViewModeChange: (mode: 'map' | 'list') => void;
  isSaved: (slug: string) => boolean;
}) {
  const groupedResults = useMemo(() => dedupeExploreRoutes(results), [results]);

  function openRoute(route: ExploreRiver) {
    if (route.selectedSegment) {
      onOpenRoute(route);
      return;
    }

    if (route.river.riverId && routeGroupMetaForRoute(route, routeCounts).routeCount > 1) {
      onOpenRiverRoutes(route);
      return;
    }

    onOpenRoute(route);
  }

  return (
    <View style={styles.exploreListScreen}>
      <FlatList
        data={groupedResults}
        keyExtractor={(item) => item.river.slug}
        contentContainerStyle={[
          styles.exploreListContent,
          { paddingTop: topInset + spacing.md, paddingBottom: spacing.xl + bottomInset },
        ]}
        ListHeaderComponent={(
          <View style={styles.exploreListHeader}>
            <AppRefreshNotice
              isError={isRefetchError}
              dataUpdatedAt={dataUpdatedAt}
              onRetry={onRetry}
            />
            <View style={styles.exploreListTitleRow}>
              <View style={styles.exploreListTitleCopy}>
                <Text style={styles.exploreListTitle}>Explore routes</Text>
                <Text style={styles.exploreListSubtitle}>
                  {groupedResults.length} matching {groupedResults.length === 1 ? 'river' : 'rivers'}
                </Text>
              </View>
              <ExploreViewToggle mode="list" onChange={onViewModeChange} />
            </View>
            <ExploreSearchBar query={filters.query} onQueryChange={onSearchChange} />
            <Pressable
              style={[styles.listFilterButton, activeFilterCount > 0 ? styles.listFilterButtonActive : null]}
              onPress={onFilterPress}
              accessibilityRole="button"
              accessibilityLabel={activeFilterCount > 0 ? `${activeFilterCount} active filters` : 'Filters'}
            >
              <MaterialCommunityIcons name="tune-variant" color={activeFilterCount > 0 ? colors.surfaceStrong : colors.accent} size={18} />
              <Text style={[styles.listFilterButtonText, activeFilterCount > 0 ? styles.listFilterButtonTextActive : null]}>
                {activeFilterCount > 0 ? `Filters ${activeFilterCount}` : 'Filters'}
              </Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={(
          <View style={styles.exploreListEmpty}>
            <MaterialCommunityIcons name="map-search-outline" color={colors.textMuted} size={32} />
            <Text style={styles.mapEmptyTitle}>No matching routes</Text>
            <Text style={styles.mapEmptyText}>Broaden filters or clear search.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <RiverCard
            river={item}
            travelLabel={item.travelLabel ?? undefined}
            showPhoto
            saved={isSaved(item.river.slug)}
            onToggleSaved={() => onToggleSaved(item)}
            onPress={() => openRoute(item)}
            onPressIn={() => onPrepareRoute(item)}
            segmentLabel={formatRouteSegmentLabel(item.segmentSummary, item.selectedSegment)}
            segmentEndpointLabel={segmentEndpointLabel(item.selectedSegment)}
            routeCount={item.selectedSegment ? 1 : routeGroupMetaForRoute(item, routeCounts).routeCount}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.exploreListSeparator} />}
      />
    </View>
  );
}

function ExploreViewToggle({
  mode,
  onChange,
}: {
  mode: 'map' | 'list';
  onChange: (mode: 'map' | 'list') => void;
}) {
  return (
    <View style={styles.viewModeToggle} accessibilityRole="tablist">
      {(['map', 'list'] as const).map((option) => {
        const selected = mode === option;
        return (
          <Pressable
            key={option}
            style={[styles.viewModeButton, selected ? styles.viewModeButtonSelected : null]}
            onPress={() => onChange(option)}
            accessibilityRole="tab"
            accessibilityLabel={`${option} view`}
            accessibilityState={{ selected }}
          >
            <MaterialCommunityIcons
              name={option === 'map' ? 'map-outline' : 'format-list-bulleted'}
              color={selected ? colors.surfaceStrong : colors.accent}
              size={16}
            />
            <Text style={[styles.viewModeButtonText, selected ? styles.viewModeButtonTextSelected : null]}>
              {option === 'map' ? 'Map' : 'List'}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function applyExploreFilters(
  rivers: RiverSummaryApiItem[],
  filters: ExploreFilters,
  location: { latitude: number; longitude: number } | null
): ExploreRiver[] {
  const query = filters.query.trim().toLowerCase();
  const distanceLimit = filters.distance === 'any' ? null : Number(filters.distance);
  const segmentFilters = {
    paddleLength: filters.paddleLength === 'any' ? '' : filters.paddleLength,
    paddleTime: filters.paddleTime === 'any' || filters.paddleTime === 'full-day' ? '' : filters.paddleTime,
  } as const;

  const sortedResults = rivers
    .map((river) => {
      const miles = location
        ? distanceMiles(location.latitude, location.longitude, river.river.latitude, river.river.longitude)
        : null;
      return {
        ...river,
        distanceMiles: miles,
        travelLabel: miles === null ? null : formatTravelTime(estimateDriveMinutes(miles)),
        selectedSegment: selectRouteSegment(river, segmentFilters),
        segmentSummary: routeSegmentSummary(river.river),
      };
    })
    .filter((river) => {
      if (query && !searchBlob(river).includes(query)) return false;
      if (filters.state && river.river.state !== filters.state) return false;
      if (!difficultyMatches(river.river.difficulty, filters.difficulty)) return false;
      if (!routeTypeMatches(river.river.routeType, filters.routeType)) return false;
      if (!statusMatches(river.rating, river.readiness.status, filters.status)) return false;
      if (filters.rating !== 'any' && river.rating !== filters.rating) return false;
      if (filters.paddleTime === 'full-day') {
        if (!paddleTimeMatches(river.river.estimatedPaddleTime, filters.paddleTime, river.river.logistics?.campingClassification)) return false;
      } else if (!routeMatchesPaddleFilters(river, segmentFilters)) {
        return false;
      }
      if (!campingMatches(river.river.logistics?.campingClassification, filters.camping)) return false;
      if (distanceLimit !== null && (river.distanceMiles === null || river.distanceMiles > distanceLimit)) return false;
      return true;
    })
    .sort((left, right) => compareExploreRivers(left, right, filters.sort));

  return sortedResults;
}

function segmentEndpointLabel(segment: RouteSegment | null) {
  return segment ? `${segment.putIn.name} → ${segment.takeOut.name}` : '';
}

function nearestStateForLocation(
  rivers: RiverSummaryApiItem[],
  location: { latitude: number; longitude: number } | null
) {
  if (!location || rivers.length === 0) {
    return null;
  }

  const nearest = rivers
    .map((river) => ({
      state: river.river.state,
      miles: distanceMiles(location.latitude, location.longitude, river.river.latitude, river.river.longitude),
    }))
    .filter((candidate) => candidate.state && Number.isFinite(candidate.miles))
    .sort((left, right) => left.miles - right.miles)[0];

  return nearest?.state ?? null;
}

function compareExploreRivers(left: ExploreRiver, right: ExploreRiver, sort: ExploreFilters['sort']) {
  if (sort === 'nearest') {
    return nullableNumber(left.distanceMiles) - nullableNumber(right.distanceMiles) || compareBest(left, right);
  }

  if (sort === 'confidence') {
    return (
      (confidenceRank[right.confidence.label] ?? 0) - (confidenceRank[left.confidence.label] ?? 0) ||
      compareBest(left, right)
    );
  }

  if (sort === 'score') {
    return right.score - left.score || compareBest(left, right);
  }

  if (sort === 'name') {
    return `${left.river.name} ${left.river.reach}`.localeCompare(`${right.river.name} ${right.river.reach}`);
  }

  return compareBest(left, right);
}

function compareBest(left: ExploreRiver, right: ExploreRiver) {
  const leftRank = recommendationRank(left);
  const rightRank = recommendationRank(right);
  if (leftRank !== rightRank) {
    return rightRank - leftRank;
  }

  return (
    right.score - left.score ||
    (confidenceRank[right.confidence.label] ?? 0) - (confidenceRank[left.confidence.label] ?? 0) ||
    `${left.river.name} ${left.river.reach}`.localeCompare(`${right.river.name} ${right.river.reach}`)
  );
}

function recommendationRank(river: ExploreRiver) {
  const call = callStateForDecision(river.rating, river.readiness.status);
  const callBonus = call === 'paddle' ? 600 : call === 'watch' ? 400 : call === 'unavailable' ? 200 : 0;
  const confidenceBonus = (confidenceRank[river.confidence.label] ?? 0) * 4;
  const travelPenalty = river.distanceMiles === null ? 0 : distancePenalty(estimateDriveMinutes(river.distanceMiles));
  const statusPenalty = river.liveData.overall === 'offline' ? 12 : river.liveData.overall === 'degraded' ? 4 : 0;
  return callBonus + river.score + confidenceBonus - travelPenalty - statusPenalty;
}

function searchBlob(river: RiverSummaryApiItem) {
  return [
    river.river.name,
    river.river.reach,
    river.river.state,
    river.river.region,
    river.rating,
    river.gaugeBandLabel,
    river.summary.primaryFactor,
    river.summary.secondaryFactor,
  ]
    .join(' ')
    .toLowerCase();
}

function estimateDriveMinutes(miles: number) {
  return Math.max(5, Math.round(((miles / 50) * 60) / 5) * 5);
}

function nullableNumber(value: number | null) {
  return typeof value === 'number' && Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
}

function errorDetailForExploreQuery(error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown request error';
  return `${resolveApiBaseUrl()} - ${message}`;
}

function normalizeExploreFilters(filters: ExploreFilters): ExploreFilters {
  return {
    ...defaultFilters,
    ...filters,
    status: filters.status ?? 'any',
    camping: filters.camping ?? 'any',
  };
}

function isExplorePreferences(value: unknown): value is ExplorePreferences {
  return (
    isRecord(value) &&
    isExploreFilters(value.filters)
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  fullMapScreen: {
    flex: 1,
    backgroundColor: colors.canvas,
    position: 'relative',
    overflow: 'hidden',
  },
  fullMapEmptyCanvas: {
    backgroundColor: colors.canvasMuted,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.xl,
  },
  fullMapTopControls: {
    position: 'absolute',
    top: 0,
    left: spacing.md,
    right: spacing.md,
    gap: spacing.sm,
  },
  mapUnderSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  mapFilterButton: {
    minHeight: 42,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 4,
  },
  mapFilterButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  mapFilterButtonText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  mapFilterButtonTextActive: {
    color: colors.surfaceStrong,
  },
  mapFilterCount: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.noGo,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.surfaceStrong,
  },
  mapFilterCountText: {
    color: colors.surfaceStrong,
    fontSize: 11,
    fontWeight: '900',
  },
  mapStatusChip: {
    minHeight: 34,
    maxWidth: '58%',
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  mapStatusChipText: {
    flexShrink: 1,
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  viewModeToggle: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderWidth: 1,
    borderColor: colors.border,
    padding: 3,
    gap: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  viewModeButton: {
    minHeight: 44,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  viewModeButtonSelected: {
    backgroundColor: colors.accent,
  },
  viewModeButtonText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '900',
  },
  viewModeButtonTextSelected: {
    color: colors.surfaceStrong,
  },
  exploreListScreen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  exploreListContent: {
    paddingHorizontal: spacing.md,
  },
  exploreListHeader: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  exploreListTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  exploreListTitleCopy: {
    flex: 1,
    gap: 3,
  },
  exploreListTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  exploreListSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
  },
  listFilterButton: {
    minHeight: 42,
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  listFilterButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  listFilterButtonText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  listFilterButtonTextActive: {
    color: colors.surfaceStrong,
  },
  exploreListSeparator: {
    height: spacing.md,
  },
  exploreListEmpty: {
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.xl,
  },
  fullMapLocationPrompt: {
    position: 'absolute',
    right: spacing.md,
    minHeight: 40,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 4,
  },
  fullMapLocationText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  mapOverlayActions: {
    position: 'absolute',
    right: spacing.sm,
    top: 52,
    gap: spacing.sm,
  },
  mapFab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 4,
  },
  coverageBanner: {
    position: 'absolute',
    left: spacing.md,
    right: 62,
    minHeight: 42,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  coverageBannerText: {
    flex: 1,
    color: colors.text,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '800',
  },
  mapEmptyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  mapEmptyText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
});
