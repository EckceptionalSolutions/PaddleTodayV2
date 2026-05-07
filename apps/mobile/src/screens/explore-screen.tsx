import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRiverSummaryQuery } from '../api/queries';
import { AppErrorState, AppLoadingState } from '../components/app-state';
import {
  ExploreSearchBar,
  ExploreSortFilterBar,
  type ExploreSort,
} from '../components/explore-controls';
import {
  ExploreFilterSheet,
  countActiveFilters,
  defaultFilters,
  isExploreFilters,
  paddleTimeMatches,
  routeTypeMatches,
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
import { formatRelativeTime } from '../lib/format';
import { distanceMiles, distancePenalty, formatTravelTime } from '../lib/location';
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

const EXPLORE_PREFERENCES_STORAGE_KEY = 'paddletoday:explore-preferences:v2';

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
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const summaryQuery = useRiverSummaryQuery();
  const { location, status, requestLocation, clearLocation } = useStoredLocation();
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<ExploreFilters>(defaultFilters);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [preferencesHydrated, setPreferencesHydrated] = useState(false);

  const rivers = summaryQuery.data?.rivers ?? [];
  const states = useMemo(
    () => [...new Set(rivers.map((river) => river.river.state))].sort(),
    [rivers]
  );
  const results = useMemo(
    () => applyExploreFilters(rivers, filters, location),
    [rivers, filters, location]
  );
  const selectedRiver = results.find((river) => river.river.slug === selectedSlug) ?? results[0] ?? null;
  const activeFilterCount = countActiveFilters(filters);

  useEffect(() => {
    void hydrateExplorePreferences();
  }, []);

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
      <AppLoadingState title="Loading explore map" body="Preparing routes, filters, and current calls." />
    );
  }

  if (summaryQuery.isError && rivers.length === 0) {
    return (
      <AppErrorState
        title="Explore did not load"
        body="The map needs current route calls before it can render."
        detail={errorDetailForExploreQuery(summaryQuery.error)}
        onRetry={() => summaryQuery.refetch()}
      />
    );
  }

  const filterModal = (
    <ExploreFilterSheet
      visible={filtersOpen}
      matchCount={results.length}
      filters={filters}
      states={states}
      locationReady={Boolean(location)}
      onClose={() => setFiltersOpen(false)}
      onChange={setFilters}
      onReset={() => setFilters(defaultFilters)}
      onApplyPreset={(apply) => setFilters((current) => apply(current))}
    />
  );

  return (
    <>
      <FullScreenExploreMap
        activeFilterCount={activeFilterCount}
        filters={filters}
        generatedAt={summaryQuery.data?.generatedAt}
        mapHeight={windowHeight}
        results={results}
        selectedRiver={selectedRiver}
        selectedSlug={selectedSlug}
        status={status}
        bottomInset={insets.bottom}
        topInset={insets.top}
        userLocation={location}
        onClearLocation={() => void clearLocation()}
        onFilterPress={() => setFiltersOpen(true)}
        onOpenRoute={(slug) => router.push({ pathname: '/river/[slug]', params: { slug } })}
        onRefresh={() => summaryQuery.refetch()}
        onSearchChange={(query) => setFilters((current) => ({ ...current, query }))}
        onSelectSlug={setSelectedSlug}
        onSortChange={(sort) => {
          setFilters((current) => ({ ...current, sort }));
          if (sort === 'nearest' && !location) {
            void requestLocation();
          }
        }}
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
      if (isExplorePreferences(parsed)) {
        setFilters(parsed.filters);
      }
    } catch {
      // Leave the default Explore setup if local preferences are unavailable.
    } finally {
      setPreferencesHydrated(true);
    }
  }
}

function FullScreenExploreMap({
  activeFilterCount,
  filters,
  generatedAt,
  mapHeight,
  results,
  selectedRiver,
  selectedSlug,
  status,
  bottomInset,
  topInset,
  userLocation,
  onClearLocation,
  onFilterPress,
  onFocusNearest,
  onOpenRoute,
  onRefresh,
  onSearchChange,
  onSelectSlug,
  onSortChange,
  onToggleSaved,
  onUseLocation,
  isSaved,
}: {
  activeFilterCount: number;
  filters: ExploreFilters;
  generatedAt?: string;
  mapHeight: number;
  results: ExploreRiver[];
  selectedRiver: ExploreRiver | null;
  selectedSlug: string | null;
  status: string;
  bottomInset: number;
  topInset: number;
  userLocation: { latitude: number; longitude: number; label: string } | null;
  onClearLocation: () => void;
  onFilterPress: () => void;
  onFocusNearest: () => void;
  onOpenRoute: (slug: string) => void;
  onRefresh: () => void;
  onSearchChange: (query: string) => void;
  onSelectSlug: (slug: string) => void;
  onSortChange: (sort: ExploreSort) => void;
  onToggleSaved: (river: ExploreRiver) => void;
  onUseLocation: () => void;
  isSaved: (slug: string) => boolean;
}) {
  const [sheetSnap, setSheetSnap] = useState<MapSheetSnap>('peek');
  const mapRef = useRef<RoutePlotMapHandle | null>(null);
  const points = useExploreMapPoints(results);
  const requesting = status === 'requesting';
  const floatingControlBottom = sheetHeightValue(sheetSnap) + bottomInset + spacing.md;

  return (
    <View style={styles.fullMapScreen}>
      {results.length > 0 ? (
        <RoutePlotMap
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
          <Text style={styles.mapEmptyText}>Broaden filters or clear search to bring routes back.</Text>
        </View>
      )}

      <View style={[styles.fullMapTopControls, { paddingTop: topInset + spacing.sm }]}>
        <ExploreSearchBar query={filters.query} onQueryChange={onSearchChange} />

        <ExploreSortFilterBar
          sort={filters.sort}
          activeFilterCount={activeFilterCount}
          compactFilterLabel
          showSortOptions={false}
          onFilterPress={onFilterPress}
          onSortChange={onSortChange}
        />
      </View>

      <View style={[styles.fullMapPills, { top: topInset + 102 }]}>
        <View style={styles.mapPill}>
          <Text style={styles.mapPillText}>{results.length} routes</Text>
        </View>
        <View style={styles.mapPill}>
          <Text style={styles.mapPillText}>{formatRelativeTime(generatedAt)}</Text>
        </View>
      </View>

      <View style={[styles.mapOverlayActions, { top: topInset + 154 }]}>
        <Pressable style={styles.mapFab} onPress={() => mapRef.current?.focusSelected()}>
          <MaterialCommunityIcons name="crosshairs" color={colors.accent} size={20} />
        </Pressable>
        <Pressable style={styles.mapFab} onPress={() => mapRef.current?.focusAll()}>
          <MaterialCommunityIcons name="map-marker-multiple" color={colors.accent} size={20} />
        </Pressable>
        <Pressable style={styles.mapFab} onPress={onFocusNearest}>
          <MaterialCommunityIcons name="crosshairs-gps" color={colors.accent} size={20} />
        </Pressable>
        <Pressable style={styles.mapFab} onPress={onRefresh}>
          <MaterialCommunityIcons name="refresh" color={colors.accent} size={20} />
        </Pressable>
      </View>

      {!userLocation ? (
        <Pressable
          style={[styles.fullMapLocationPrompt, { bottom: floatingControlBottom }]}
          disabled={requesting}
          onPress={onUseLocation}
        >
          <MaterialCommunityIcons name="map-marker-radius-outline" color={colors.accent} size={18} />
          <Text style={styles.fullMapLocationText}>
            {requesting ? 'Finding location' : status === 'denied' ? 'Location off' : 'Use location'}
          </Text>
        </Pressable>
      ) : (
        <Pressable style={[styles.fullMapLocationPrompt, { bottom: floatingControlBottom }]} onPress={onClearLocation}>
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
          isSaved={isSaved}
          onOpenRoute={onOpenRoute}
          onToggleSaved={onToggleSaved}
        />
      ) : null}
    </View>
  );
}

function useExploreMapPoints(results: ExploreRiver[]) {
  return useMemo<RoutePlotPoint[]>(
    () =>
      results.map((river) => ({
        id: river.river.slug,
        label: river.river.name,
        latitude: river.river.latitude,
        longitude: river.river.longitude,
        score: river.score,
        rating: river.rating,
        meta: [river.river.reach, river.travelLabel].filter(Boolean).join(' - '),
      })),
    [results]
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
      if (filters.difficulty !== 'any' && river.river.difficulty !== filters.difficulty) return false;
      if (!routeTypeMatches(river.river.routeType, filters.routeType)) return false;
      if (filters.rating !== 'any' && river.rating !== filters.rating) return false;
      if (!paddleTimeMatches(river.river.estimatedPaddleTime, filters.paddleTime)) return false;
      if (distanceLimit !== null && (river.distanceMiles === null || river.distanceMiles > distanceLimit)) return false;
      return true;
    })
    .sort((left, right) => compareExploreRivers(left, right, filters.sort));

  return uniqueExploreRiversBySlug(sortedResults);
}

function uniqueExploreRiversBySlug(rivers: ExploreRiver[]) {
  const seen = new Set<string>();
  return rivers.filter((river) => {
    if (seen.has(river.river.slug)) {
      return false;
    }

    seen.add(river.river.slug);
    return true;
  });
}

function compareExploreRivers(left: ExploreRiver, right: ExploreRiver, sort: ExploreSort) {
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
  fullMapPills: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
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
  mapPill: {
    minHeight: 32,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  mapPillText: {
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
    width: 42,
    height: 42,
    borderRadius: 21,
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
