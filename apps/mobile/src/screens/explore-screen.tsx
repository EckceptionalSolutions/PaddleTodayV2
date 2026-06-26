import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRiverSummaryQuery } from '../api/queries';
import { AppErrorState, AppLoadingState } from '../components/app-state';
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
import { RoutePlotMap, type RoutePlotMapHandle, type RoutePlotPoint } from '../components/route-plot-map';
import { useStoredLocation } from '../hooks/use-stored-location';
import { resolveApiBaseUrl } from '../lib/api-base-url';
import { distanceMiles, distancePenalty, formatTravelTime } from '../lib/location';
import {
  descriptionForExploreIntent,
  EXPLORE_PREFERENCES_STORAGE_KEY,
  filtersForExploreIntent,
  isExploreIntentId,
  labelForExploreIntent,
  type ExploreIntentId,
} from '../lib/explore-intents';
import { trackAppEvent } from '../lib/observability';
import { buildRouteGroupMeta, routeGroupMetaForRoute } from '../lib/route-groups';
import { isRecord, parseJson } from '../lib/storage';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

interface ExploreRiver extends RiverSummaryApiItem {
  distanceMiles: number | null;
  travelLabel: string | null;
}

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
  const params = useLocalSearchParams<{ intent?: string; intentKey?: string; reset?: string; state?: string }>();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const summaryQuery = useRiverSummaryQuery();
  const { location, status, requestLocation } = useStoredLocation();
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<ExploreFilters>(defaultFilters);
  const [draftFilters, setDraftFilters] = useState<ExploreFilters>(defaultFilters);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [preferencesHydrated, setPreferencesHydrated] = useState(false);
  const appliedStoredLocationDefaultRef = useRef(false);
  const appliedIntentRef = useRef<string | null>(null);
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
    () => applyExploreFilters(rivers, draftFilters, location),
    [rivers, draftFilters, location]
  );
  const selectedRiver = results.find((river) => river.river.slug === selectedSlug) ?? results[0] ?? null;
  const activeFilterCount = countActiveFilters(filters);

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
    setSelectedSlug(null);
    setFilters(intentFilters);
    setDraftFilters(intentFilters);
  }, [locationReady, preferencesHydrated, requestedIntent, requestedIntentKey]);

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

    void AsyncStorage.setItem(
      EXPLORE_PREFERENCES_STORAGE_KEY,
      JSON.stringify({ filters, viewMode: 'map' })
    );
  }, [filters, preferencesHydrated]);

  useEffect(() => {
    if (results.length === 0) {
      setSelectedSlug(null);
      return;
    }

    if (!selectedSlug || !results.some((river) => river.river.slug === selectedSlug)) {
      setSelectedSlug(results[0].river.slug);
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
        body="The map needs current calls."
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
        requestedIntent={requestedIntent}
        mapHeight={windowHeight}
        results={results}
        selectedRiver={selectedRiver}
        selectedSlug={selectedSlug}
        status={status}
        bottomInset={insets.bottom}
        topInset={insets.top}
        userLocation={location}
        routeCounts={routeCounts}
        onFilterPress={() => setFiltersOpen(true)}
        onContributePhotos={(slug) => {
          trackAppEvent('route_photo_contribution_started', { slug, source: 'explore_tray' });
          router.push({ pathname: '/contribute-photo/[slug]', params: { slug } });
        }}
        onOpenRiverRoutes={openExploreRiverRoutes}
        onOpenRoute={(route) => router.push({ pathname: '/river/[slug]', params: { slug: route.river.slug } })}
        onClearIntent={() => {
          setFilters(defaultFilters);
          setDraftFilters(defaultFilters);
          setSelectedSlug(null);
          router.replace('/explore');
        }}
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
      }
    } catch {
      // Leave the default Explore setup if local preferences are unavailable.
    } finally {
      setPreferencesHydrated(true);
    }
  }

  function openExploreRiverRoutes(route: ExploreRiver) {
    const routeCount = routeGroupMetaForRoute(route, routeCounts).routeCount;
    if (route.river.riverId && routeCount > 1) {
      router.push({ pathname: '/river-hub/[riverId]', params: { riverId: route.river.riverId } });
    }
  }
}

function FullScreenExploreMap({
  activeFilterCount,
  filters,
  requestedIntent,
  mapHeight,
  results,
  selectedRiver,
  selectedSlug,
  status,
  bottomInset,
  topInset,
  userLocation,
  routeCounts,
  onFilterPress,
  onFocusNearest,
  onContributePhotos,
  onOpenRiverRoutes,
  onOpenRoute,
  onClearIntent,
  onSearchChange,
  onSelectSlug,
  onToggleSaved,
  onUseLocation,
  isSaved,
}: {
  activeFilterCount: number;
  filters: ExploreFilters;
  requestedIntent: ExploreIntentId | null;
  mapHeight: number;
  results: ExploreRiver[];
  selectedRiver: ExploreRiver | null;
  selectedSlug: string | null;
  status: string;
  bottomInset: number;
  topInset: number;
  userLocation: { latitude: number; longitude: number; label: string } | null;
  routeCounts: ReadonlyMap<string, number>;
  onFilterPress: () => void;
  onFocusNearest: () => void;
  onContributePhotos: (slug: string) => void;
  onOpenRiverRoutes: (route: ExploreRiver) => void;
  onOpenRoute: (route: ExploreRiver) => void;
  onClearIntent: () => void;
  onSearchChange: (query: string) => void;
  onSelectSlug: (slug: string) => void;
  onToggleSaved: (river: ExploreRiver) => void;
  onUseLocation: () => void;
  isSaved: (slug: string) => boolean;
}) {
  const [sheetSnap, setSheetSnap] = useState<MapSheetSnap>('peek');
  const mapRef = useRef<RoutePlotMapHandle | null>(null);
  const points = useExploreMapPoints(results, routeCounts);
  const requesting = status === 'requesting';
  const floatingControlBottom = sheetHeightValue(sheetSnap) + spacing.md;
  const userOutOfRange = Boolean(userLocation && results.length === 0 && activeFilterCount === 0);
  const selectedRouteCount = selectedRiver ? routeGroupMetaForRoute(selectedRiver, routeCounts).routeCount : 0;
  const searchResultSignature = points.map((point) => point.id).join('|');
  const mapResultKey = searchResultSignature || 'empty';
  const intentBanner = requestedIntent
    ? {
        title: labelForExploreIntent(requestedIntent),
        body: descriptionForExploreIntent(requestedIntent, Boolean(userLocation)),
      }
    : null;
  const overlayTop = topInset + (intentBanner ? 222 : 154);

  useEffect(() => {
    if (!filters.query.trim() || points.length === 0) {
      return;
    }

    const timeout = setTimeout(() => {
      mapRef.current?.focusAll();
    }, 500);

    return () => clearTimeout(timeout);
  }, [filters.query, points.length, searchResultSignature]);

  useEffect(() => {
    if (!userLocation || points.length === 0 || filters.query.trim()) {
      return;
    }

    const timeout = setTimeout(() => {
      mapRef.current?.focusUserArea();
    }, 500);

    return () => clearTimeout(timeout);
  }, [filters.query, points.length, searchResultSignature, userLocation]);

  function handleGpsFocus() {
    if (userLocation) {
      mapRef.current?.focusUserArea();
    }

    onFocusNearest();
  }

  return (
    <View style={styles.fullMapScreen}>
      {results.length > 0 ? (
        <RoutePlotMap
          key={mapResultKey}
          ref={mapRef}
          points={points}
          selectedId={selectedSlug}
          userLocation={userLocation}
          onSelectPoint={(point) => onSelectSlug(point.id)}
          height={mapHeight}
          showFooter={false}
          fullBleed
        />
      ) : (
        <View style={[styles.fullMapEmptyCanvas, { height: mapHeight }]}>
          <MaterialCommunityIcons name="map-search-outline" color={colors.textMuted} size={32} />
          <Text style={styles.mapEmptyTitle}>No routes on this map</Text>
          <Text style={styles.mapEmptyText}>Broaden filters or clear search.</Text>
        </View>
      )}

      <View style={[styles.fullMapTopControls, { paddingTop: topInset + spacing.md }]}>
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
            accessibilityLabel={`${results.length} routes`}
          >
            <Text style={styles.mapStatusChipText} numberOfLines={1}>
              {results.length} routes
            </Text>
          </View>
        </View>
        {intentBanner ? (
          <View style={styles.intentBanner}>
            <View style={styles.intentBannerCopy}>
              <Text style={styles.intentBannerTitle}>{intentBanner.title}</Text>
              <Text style={styles.intentBannerBody} numberOfLines={1}>{intentBanner.body}</Text>
            </View>
            <Pressable style={styles.intentBannerClear} onPress={onClearIntent} accessibilityRole="button" accessibilityLabel="Clear Home filters">
              <MaterialCommunityIcons name="close" color={colors.accent} size={17} />
            </Pressable>
          </View>
        ) : null}
      </View>

      {userOutOfRange ? (
        <View style={[styles.coverageBanner, { top: overlayTop }]}>
          <MaterialCommunityIcons name="map-marker-distance" color={colors.accent} size={18} />
          <Text style={styles.coverageBannerText}>
            PaddleToday supports select Midwest rivers.
          </Text>
        </View>
      ) : null}

      <View style={[styles.mapOverlayActions, { top: overlayTop + (userOutOfRange ? 56 : 0) }]}>
        <Pressable
          style={styles.mapFab}
          onPress={() => mapRef.current?.focusSelected()}
          accessibilityRole="button"
          accessibilityLabel="Center selected route"
        >
          <MaterialCommunityIcons name="crosshairs" color={colors.accent} size={20} />
        </Pressable>
        <Pressable
          style={styles.mapFab}
          onPress={() => mapRef.current?.focusAll()}
          accessibilityRole="button"
          accessibilityLabel="Show all routes"
        >
          <MaterialCommunityIcons name="map-marker-multiple" color={colors.accent} size={20} />
        </Pressable>
        <Pressable
          style={styles.mapFab}
          onPress={handleGpsFocus}
          accessibilityRole="button"
          accessibilityLabel="Focus nearest routes"
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
          accessibilityLabel="Focus nearest routes"
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

function useExploreMapPoints(results: ExploreRiver[], routeCounts: ReadonlyMap<string, number>) {
  return useMemo<RoutePlotPoint[]>(
    () =>
      results.map((river) => {
        const routeCount = routeGroupMetaForRoute(river, routeCounts).routeCount;
        return {
          id: river.river.slug,
          label: river.river.name,
          latitude: river.river.latitude,
          longitude: river.river.longitude,
          score: river.score,
          rating: river.rating,
          routeCount,
          meta: [routeCount > 1 ? `${routeCount} route options` : '1 route', river.travelLabel ? `${river.travelLabel} drive` : null]
            .filter(Boolean)
            .join(' - '),
        };
      }),
    [results, routeCounts]
  );
}

function applyExploreFilters(
  rivers: RiverSummaryApiItem[],
  filters: ExploreFilters,
  location: { latitude: number; longitude: number } | null
): ExploreRiver[] {
  const query = filters.query.trim().toLowerCase();
  const distanceLimit = filters.distance === 'any' ? null : Number(filters.distance);

  const sortedResults = rivers
    .map((river) => {
      const miles = location
        ? distanceMiles(location.latitude, location.longitude, river.river.latitude, river.river.longitude)
        : null;
      return {
        ...river,
        distanceMiles: miles,
        travelLabel: miles === null ? null : formatTravelTime(estimateDriveMinutes(miles)),
      };
    })
    .filter((river) => {
      if (query && !searchBlob(river).includes(query)) return false;
      if (filters.state && river.river.state !== filters.state) return false;
      if (!difficultyMatches(river.river.difficulty, filters.difficulty)) return false;
      if (!routeTypeMatches(river.river.routeType, filters.routeType)) return false;
      if (!statusMatches(river.rating, filters.status)) return false;
      if (filters.rating !== 'any' && river.rating !== filters.rating) return false;
      if (!paddleTimeMatches(river.river.estimatedPaddleTime, filters.paddleTime, river.river.logistics?.campingClassification)) return false;
      if (!campingMatches(river.river.logistics?.campingClassification, filters.camping)) return false;
      if (distanceLimit !== null && (river.distanceMiles === null || river.distanceMiles > distanceLimit)) return false;
      return true;
    })
    .sort((left, right) => compareExploreRivers(left, right, filters.sort));

  return sortedResults;
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
  const confidenceBonus = (confidenceRank[river.confidence.label] ?? 0) * 4;
  const travelPenalty = river.distanceMiles === null ? 0 : distancePenalty(estimateDriveMinutes(river.distanceMiles));
  const statusPenalty = river.liveData.overall === 'offline' ? 12 : river.liveData.overall === 'degraded' ? 4 : 0;
  return river.score + confidenceBonus - travelPenalty - statusPenalty;
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
  intentBanner: {
    minHeight: 50,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 9,
    elevation: 3,
  },
  intentBannerCopy: {
    flex: 1,
    minWidth: 0,
  },
  intentBannerTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  intentBannerBody: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  intentBannerClear: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 38,
    height: 38,
    borderRadius: 19,
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
