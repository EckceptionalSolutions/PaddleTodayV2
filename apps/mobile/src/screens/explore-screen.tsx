import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRiverSummaryQuery } from '../api/queries';
import {
  ExploreSearchBar,
  ExploreSortFilterBar,
  type ExploreSort,
} from '../components/explore-controls';
import {
  ActiveFilterStrip,
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
import { RiverCard } from '../components/river-card';
import { RoutePlotMap, type RoutePlotMapHandle, type RoutePlotPoint } from '../components/route-plot-map';
import { useStoredLocation } from '../hooks/use-stored-location';
import { formatRelativeTime } from '../lib/format';
import { distanceMiles, formatTravelTime } from '../lib/location';
import { isRecord, parseJson } from '../lib/storage';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

type ExploreViewMode = 'list' | 'map';

interface ExploreRiver extends RiverSummaryApiItem {
  distanceMiles: number | null;
  travelLabel: string | null;
}

interface ExplorePreferences {
  filters: ExploreFilters;
  viewMode: ExploreViewMode;
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
  const [viewMode, setViewMode] = useState<ExploreViewMode>('map');
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
      JSON.stringify({ filters, viewMode })
    );
  }, [filters, preferencesHydrated, viewMode]);

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
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.stateTitle}>Loading explore board</Text>
        <Text style={styles.stateBody}>Preparing routes, filters, and live reads.</Text>
      </View>
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

  if (viewMode === 'map') {
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
          topInset={insets.top}
          userLocation={location}
          onClearLocation={() => void clearLocation()}
          onFilterPress={() => setFiltersOpen(true)}
          onOpenRoute={(slug) => router.push({ pathname: '/river/[slug]', params: { slug } })}
          onRefresh={() => summaryQuery.refetch()}
          onSearchChange={(query) => setFilters((current) => ({ ...current, query }))}
          onSelectSlug={setSelectedSlug}
          onSetViewMode={setViewMode}
          onSortChange={(sort) => setFilters((current) => ({ ...current, sort }))}
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
  }

  return (
    <>
      <FlatList
        style={styles.screen}
        contentContainerStyle={styles.content}
        data={results}
        keyExtractor={(river) => river.river.slug}
        refreshControl={
          <RefreshControl
            tintColor={colors.accent}
            refreshing={summaryQuery.isRefetching}
            onRefresh={() => summaryQuery.refetch()}
          />
        }
        ListHeaderComponent={
          <View style={styles.headerStack}>
            <ExploreSearchBar
              query={filters.query}
              onQueryChange={(query) => setFilters((current) => ({ ...current, query }))}
            />

            <ExploreSortFilterBar
              sort={filters.sort}
              activeFilterCount={activeFilterCount}
              onFilterPress={() => setFiltersOpen(true)}
              onSortChange={(sort) => setFilters((current) => ({ ...current, sort }))}
            />

            {summaryQuery.isError ? (
              <View style={styles.statusBanner}>
                <Text style={styles.statusBannerTitle}>Refresh failed</Text>
                <Text style={styles.statusBannerText}>Showing the last cached board if one is available.</Text>
              </View>
            ) : null}

            <View style={styles.mapBottomBar}>
              <View style={styles.resultSummary}>
                <Text style={styles.resultSummaryTitle}>{results.length} routes</Text>
                <Text style={styles.resultSummaryText}>{formatRelativeTime(summaryQuery.data?.generatedAt)}</Text>
              </View>
              <View style={styles.viewToggleCompact}>
                <SegmentButton
                  label="Map"
                  icon="map-outline"
                  selected={false}
                  onPress={() => setViewMode('map')}
                />
                <SegmentButton
                  label="List"
                  icon="format-list-bulleted"
                  selected
                  onPress={() => setViewMode('list')}
                />
              </View>
            </View>

            <ActiveFilterStrip filters={filters} locationReady={Boolean(location)} />

            <LocationControl
              locationLabel={location?.label ?? null}
              status={status}
              onUseLocation={() => void requestLocation()}
              onClear={() => void clearLocation()}
            />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No routes match</Text>
            <Text style={styles.emptyText}>Clear filters or broaden distance, difficulty, and score.</Text>
            <Pressable style={styles.resetButton} onPress={() => setFilters(defaultFilters)}>
              <Text style={styles.resetButtonText}>Reset filters</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <RiverCard
            river={item}
            travelLabel={item.travelLabel ?? undefined}
            saved={isSaved(item.river.slug)}
            onToggleSaved={() =>
              void toggleSavedRiver({
                slug: item.river.slug,
                riverId: item.river.riverId,
                name: item.river.name,
                reach: item.river.reach,
              })
            }
            onPress={() => router.push({ pathname: '/river/[slug]', params: { slug: item.river.slug } })}
          />
        )}
      />

      {filterModal}
    </>
  );

  async function hydrateExplorePreferences() {
    try {
      const parsed = parseJson(await AsyncStorage.getItem(EXPLORE_PREFERENCES_STORAGE_KEY));
      if (isExplorePreferences(parsed)) {
        setFilters(parsed.filters);
        setViewMode(parsed.viewMode);
      }
    } catch {
      // Leave the default Explore setup if local preferences are unavailable.
    } finally {
      setPreferencesHydrated(true);
    }
  }
}

function LocationControl({
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
    <View style={styles.locationRow}>
      <MaterialCommunityIcons name="map-marker-radius-outline" color={colors.accent} size={20} />
      <View style={styles.locationCopy}>
        <Text style={styles.locationTitle}>{locationLabel ?? 'Add location for distance filters'}</Text>
        <Text style={styles.locationSubtitle}>
          {locationLabel ? 'Nearest sort and drive filters are active.' : 'Distance filters stay hidden until location is set.'}
        </Text>
      </View>
      <Pressable
        style={[styles.locationButton, requesting ? styles.locationButtonDisabled : null]}
        disabled={requesting}
        onPress={locationLabel ? onClear : onUseLocation}
      >
        <Text style={styles.locationButtonText}>
          {locationLabel ? 'Clear' : requesting ? 'Finding' : 'Use'}
        </Text>
      </Pressable>
    </View>
  );
}

function SegmentButton({
  label,
  icon,
  selected,
  onPress,
}: {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.segmentButton, selected ? styles.segmentButtonSelected : null]}
      onPress={onPress}
      android_ripple={{ color: colors.canvasMuted, borderless: true }}
    >
      <MaterialCommunityIcons
        name={icon}
        color={selected ? colors.surfaceStrong : colors.accent}
        size={17}
      />
      <Text style={[styles.segmentButtonText, selected ? styles.segmentButtonTextSelected : null]}>
        {label}
      </Text>
    </Pressable>
  );
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
  topInset,
  userLocation,
  onClearLocation,
  onFilterPress,
  onFocusNearest,
  onOpenRoute,
  onRefresh,
  onSearchChange,
  onSelectSlug,
  onSetViewMode,
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
  topInset: number;
  userLocation: { latitude: number; longitude: number; label: string } | null;
  onClearLocation: () => void;
  onFilterPress: () => void;
  onFocusNearest: () => void;
  onOpenRoute: (slug: string) => void;
  onRefresh: () => void;
  onSearchChange: (query: string) => void;
  onSelectSlug: (slug: string) => void;
  onSetViewMode: (mode: ExploreViewMode) => void;
  onSortChange: (sort: ExploreSort) => void;
  onToggleSaved: (river: ExploreRiver) => void;
  onUseLocation: () => void;
  isSaved: (slug: string) => boolean;
}) {
  const [sheetSnap, setSheetSnap] = useState<MapSheetSnap>('peek');
  const mapRef = useRef<RoutePlotMapHandle | null>(null);
  const points = useExploreMapPoints(results);
  const requesting = status === 'requesting';
  const floatingControlBottom = sheetHeightValue(sheetSnap) + spacing.md;

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
          onFilterPress={onFilterPress}
          onSortChange={onSortChange}
        />
      </View>

      <View style={[styles.fullMapPills, { top: topInset + 118 }]}>
        <View style={styles.mapPill}>
          <Text style={styles.mapPillText}>{results.length} routes</Text>
        </View>
        <View style={styles.mapPill}>
          <Text style={styles.mapPillText}>{formatRelativeTime(generatedAt)}</Text>
        </View>
      </View>

      <View style={[styles.mapOverlayActions, { top: topInset + 176 }]}>
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

      <View style={[styles.fullMapModeToggle, { bottom: floatingControlBottom }]}>
        <View style={styles.viewToggleCompact}>
          <SegmentButton
            label="Map"
            icon="map-outline"
            selected
            onPress={() => onSetViewMode('map')}
          />
          <SegmentButton
            label="List"
            icon="format-list-bulleted"
            selected={false}
            onPress={() => onSetViewMode('list')}
          />
        </View>
      </View>

      {!userLocation ? (
        <Pressable
          style={[styles.fullMapLocationPrompt, { bottom: floatingControlBottom }]}
          disabled={requesting}
          onPress={onUseLocation}
        >
          <MaterialCommunityIcons name="map-marker-radius-outline" color={colors.accent} size={18} />
          <Text style={styles.fullMapLocationText}>{requesting ? 'Finding location' : 'Use location'}</Text>
        </Pressable>
      ) : (
        <Pressable style={[styles.fullMapLocationPrompt, { bottom: floatingControlBottom }]} onPress={onClearLocation}>
          <MaterialCommunityIcons name="crosshairs-gps" color={colors.accent} size={18} />
          <Text style={styles.fullMapLocationText}>Near you</Text>
        </Pressable>
      )}

      {selectedRiver ? (
        <ExploreRouteDrawer
          results={results}
          selectedRiver={selectedRiver}
          selectedSlug={selectedSlug}
          sheetSnap={sheetSnap}
          setSheetSnap={setSheetSnap}
          isSaved={isSaved}
          onOpenRoute={onOpenRoute}
          onSelectSlug={onSelectSlug}
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
  return (
    (liveRank[right.liveData.overall] ?? 0) - (liveRank[left.liveData.overall] ?? 0) ||
    (confidenceRank[right.confidence.label] ?? 0) - (confidenceRank[left.confidence.label] ?? 0) ||
    right.score - left.score
  );
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

function isExplorePreferences(value: unknown): value is ExplorePreferences {
  return (
    isRecord(value) &&
    isExploreFilters(value.filters) &&
    isExploreViewMode(value.viewMode)
  );
}

function isExploreViewMode(value: unknown): value is ExploreViewMode {
  return value === 'list' || value === 'map';
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
  fullMapToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
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
  fullMapModeToggle: {
    position: 'absolute',
    left: spacing.md,
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
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
  headerStack: {
    gap: spacing.sm,
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  appHeaderCopy: {
    flex: 1,
    gap: 2,
  },
  kicker: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    color: colors.text,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '900',
  },
  freshness: {
    color: colors.textMuted,
    fontSize: 12,
  },
  countBadge: {
    minWidth: 62,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  countValue: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
  },
  countLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  locationCopy: {
    flex: 1,
    gap: 2,
  },
  locationTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  locationSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  locationButton: {
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  locationButtonDisabled: {
    opacity: 0.65,
  },
  locationButtonText: {
    color: colors.surfaceStrong,
    fontSize: 12,
    fontWeight: '800',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: colors.canvasMuted,
    borderRadius: radius.pill,
    padding: 4,
    gap: 4,
  },
  mapBottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  resultSummary: {
    flex: 1,
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: 2,
  },
  resultSummaryTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  resultSummaryText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  viewToggleCompact: {
    width: 156,
    flexDirection: 'row',
    backgroundColor: colors.canvasMuted,
    borderRadius: radius.pill,
    padding: 4,
    gap: 4,
  },
  segmentButton: {
    flex: 1,
    minHeight: 40,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  segmentButtonSelected: {
    backgroundColor: colors.accent,
  },
  segmentButtonText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  segmentButtonTextSelected: {
    color: colors.surfaceStrong,
  },
  mapStack: {
    gap: spacing.sm,
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
  mapEmptyState: {
    minHeight: 380,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
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
  selectedCardWrap: {
    gap: spacing.xs,
  },
  selectedCardLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  statusBanner: {
    backgroundColor: '#F3E8CC',
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 2,
  },
  statusBannerTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  statusBannerText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  emptyCard: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  resetButton: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  resetButtonText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '800',
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
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  stateBody: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
