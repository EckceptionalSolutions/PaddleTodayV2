import type { RiverSummaryApiItem, RouteType, ScoreRating } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  GestureResponderEvent,
  Linking,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRiverSummaryQuery } from '../api/queries';
import { RiverCard } from '../components/river-card';
import { RoutePlotMap, type RoutePlotMapHandle, type RoutePlotPoint } from '../components/route-plot-map';
import { useStoredLocation } from '../hooks/use-stored-location';
import { formatRelativeTime } from '../lib/format';
import { distanceMiles, formatTravelTime } from '../lib/location';
import { mapUrlForAccessPoint } from '../lib/maps';
import { isRecord, parseJson } from '../lib/storage';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

type ExploreSort = 'best' | 'nearest' | 'confidence' | 'score' | 'name';
type DifficultyFilter = 'any' | 'easy' | 'moderate' | 'hard';
type RouteTypeFilter = 'non-whitewater' | 'whitewater' | 'all';
type RatingFilter = 'any' | ScoreRating;
type DistanceFilter = 'any' | '50' | '100' | '150' | '200';
type PaddleTimeFilter = 'any' | 'up-to-3' | '3-to-5' | '5-to-7' | '7-plus';
type ExploreViewMode = 'list' | 'map';
type MapSheetSnap = 'peek' | 'half' | 'full';

interface ExploreFilters {
  sort: ExploreSort;
  query: string;
  state: string;
  difficulty: DifficultyFilter;
  routeType: RouteTypeFilter;
  rating: RatingFilter;
  distance: DistanceFilter;
  paddleTime: PaddleTimeFilter;
}

interface ExploreRiver extends RiverSummaryApiItem {
  distanceMiles: number | null;
  travelLabel: string | null;
}

interface ExplorePreferences {
  filters: ExploreFilters;
  viewMode: ExploreViewMode;
}

const EXPLORE_PREFERENCES_STORAGE_KEY = 'paddletoday:explore-preferences:v2';

const defaultFilters: ExploreFilters = {
  sort: 'best',
  query: '',
  state: '',
  difficulty: 'any',
  routeType: 'non-whitewater',
  rating: 'any',
  distance: 'any',
  paddleTime: 'any',
};

const ratingOptions: Array<{ value: RatingFilter; label: string }> = [
  { value: 'any', label: 'Any score' },
  { value: 'Strong', label: 'Strong' },
  { value: 'Good', label: 'Good' },
  { value: 'Fair', label: 'Fair' },
  { value: 'No-go', label: 'No-go' },
];

const difficultyOptions: Array<{ value: DifficultyFilter; label: string }> = [
  { value: 'any', label: 'Any difficulty' },
  { value: 'easy', label: 'Easy' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'hard', label: 'Hard' },
];

const routeTypeOptions: Array<{ value: RouteTypeFilter; label: string }> = [
  { value: 'non-whitewater', label: 'Rec routes' },
  { value: 'whitewater', label: 'Whitewater' },
  { value: 'all', label: 'All routes' },
];

const distanceOptions: Array<{ value: DistanceFilter; label: string }> = [
  { value: 'any', label: 'Any drive' },
  { value: '50', label: '50 mi' },
  { value: '100', label: '100 mi' },
  { value: '150', label: '150 mi' },
  { value: '200', label: '200 mi' },
];

const paddleTimeOptions: Array<{ value: PaddleTimeFilter; label: string }> = [
  { value: 'any', label: 'Any time' },
  { value: 'up-to-3', label: 'Under 3h' },
  { value: '3-to-5', label: '3-5h' },
  { value: '5-to-7', label: '5-7h' },
  { value: '7-plus', label: '7h+' },
];

const presetOptions: Array<{ id: string; label: string; apply: (filters: ExploreFilters) => ExploreFilters }> = [
  {
    id: 'quick-float',
    label: 'Quick float',
    apply: (filters) => ({
      ...filters,
      difficulty: 'easy',
      routeType: 'non-whitewater',
      paddleTime: 'up-to-3',
      rating: 'any',
      sort: 'best',
    }),
  },
  {
    id: 'full-day',
    label: 'Full day',
    apply: (filters) => ({
      ...filters,
      difficulty: 'any',
      routeType: 'all',
      paddleTime: '5-to-7',
      rating: 'Good',
      sort: 'score',
    }),
  },
  {
    id: 'best-nearby',
    label: 'Best nearby',
    apply: (filters) => ({
      ...filters,
      distance: '100',
      rating: 'Good',
      sort: 'nearest',
    }),
  },
];

const sortOptions: Array<{ value: ExploreSort; label: string }> = [
  { value: 'best', label: 'Best now' },
  { value: 'nearest', label: 'Nearest' },
  { value: 'confidence', label: 'Confidence' },
  { value: 'score', label: 'Score' },
  { value: 'name', label: 'A-Z' },
];

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
    <Modal
      animationType="slide"
      transparent
      visible={filtersOpen}
      onRequestClose={() => setFiltersOpen(false)}
    >
      <View style={styles.sheetScrim}>
        <View style={styles.filterSheet}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHeader}>
            <View style={styles.sheetTitleCopy}>
              <Text style={styles.sheetTitle}>Filters</Text>
              <Text style={styles.sheetSubtitle}>{results.length} routes match this setup</Text>
            </View>
            <Pressable style={styles.sheetDoneButton} onPress={() => setFiltersOpen(false)}>
              <Text style={styles.sheetDoneText}>Done</Text>
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetContent}>
            <FilterPanel
              filters={filters}
              states={states}
              locationReady={Boolean(location)}
              onChange={setFilters}
              onReset={() => setFilters(defaultFilters)}
              onApplyPreset={(apply) => setFilters((current) => apply(current))}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
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
            <View style={styles.searchBar}>
              <MaterialCommunityIcons name="magnify" color={colors.textMuted} size={20} />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Search river, reach, region"
                placeholderTextColor={colors.textMuted}
                value={filters.query}
                onChangeText={(query) => setFilters((current) => ({ ...current, query }))}
                onChange={(event) => {
                  const query = textFromInputEvent(event);
                  setFilters((current) => ({ ...current, query }));
                }}
                {...webInputProps((query) => setFilters((current) => ({ ...current, query })))}
                style={styles.searchInput}
                returnKeyType="search"
              />
              {filters.query.trim() ? (
                <Pressable
                  hitSlop={10}
                  onPress={() => setFilters((current) => ({ ...current, query: '' }))}
                >
                  <MaterialCommunityIcons name="close-circle" color={colors.textMuted} size={18} />
                </Pressable>
              ) : null}
            </View>

            <View style={styles.toolbar}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortStrip}>
                {sortOptions.map((option) => (
                  <ChoiceChip
                    key={option.value}
                    label={option.label}
                    selected={filters.sort === option.value}
                    onPress={() => setFilters((current) => ({ ...current, sort: option.value }))}
                  />
                ))}
              </ScrollView>
              <Pressable
                style={[styles.filterButton, activeFilterCount > 0 ? styles.filterButtonActive : null]}
                onPress={() => setFiltersOpen(true)}
                android_ripple={{ color: colors.canvasMuted }}
              >
                <MaterialCommunityIcons
                  name="tune-variant"
                  color={activeFilterCount > 0 ? colors.surfaceStrong : colors.accent}
                  size={18}
                />
                <Text style={[styles.filterButtonText, activeFilterCount > 0 ? styles.filterButtonTextActive : null]}>
                  Filters{activeFilterCount > 0 ? ` ${activeFilterCount}` : ''}
                </Text>
              </Pressable>
            </View>

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
  const sheetGesture = useMapSheetPanResponder(sheetSnap, setSheetSnap);
  const mapRef = useRef<RoutePlotMapHandle | null>(null);
  const selectedDirectionsUrl = mapUrlForAccessPoint(selectedRiver?.river.putIn);
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
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" color={colors.textMuted} size={20} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Search river, reach, region"
            placeholderTextColor={colors.textMuted}
            value={filters.query}
            onChangeText={onSearchChange}
            onChange={(event) => onSearchChange(textFromInputEvent(event))}
            {...webInputProps(onSearchChange)}
            style={styles.searchInput}
            returnKeyType="search"
          />
          {filters.query.trim() ? (
            <Pressable hitSlop={10} onPress={() => onSearchChange('')}>
              <MaterialCommunityIcons name="close-circle" color={colors.textMuted} size={18} />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.fullMapToolbar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortStrip}>
            {sortOptions.map((option) => (
              <ChoiceChip
                key={option.value}
                label={option.label}
                selected={filters.sort === option.value}
                onPress={() => onSortChange(option.value)}
              />
            ))}
          </ScrollView>
          <Pressable
            style={[styles.filterButton, activeFilterCount > 0 ? styles.filterButtonActive : null]}
            onPress={onFilterPress}
          >
            <MaterialCommunityIcons
              name="tune-variant"
              color={activeFilterCount > 0 ? colors.surfaceStrong : colors.accent}
              size={18}
            />
            <Text style={[styles.filterButtonText, activeFilterCount > 0 ? styles.filterButtonTextActive : null]}>
              {activeFilterCount > 0 ? String(activeFilterCount) : 'Filters'}
            </Text>
          </Pressable>
        </View>
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
        <View style={[styles.mapSheet, styles.fullMapSheet, sheetHeightStyle(sheetSnap, sheetGesture.dragOffset)]}>
          <View
            style={styles.mapSheetHandleWrap}
            collapsable={false}
            {...sheetGesture.panHandlers}
          >
            <View style={styles.mapSheetHandle} />
          </View>
          <View style={styles.mapPreviewHeader}>
            <View style={styles.mapPreviewDragRegion} collapsable={false} {...sheetGesture.panHandlers}>
              <View style={styles.mapPreviewScore}>
                <Text style={styles.mapPreviewScoreText} selectable={false}>{selectedRiver.score}</Text>
              </View>
              <View style={styles.mapPreviewCopy}>
                <Text style={styles.mapPreviewLabel} selectable={false}>{selectedRiver.rating}</Text>
                <Text style={styles.mapPreviewTitle} numberOfLines={1} selectable={false}>{selectedRiver.river.name}</Text>
                <Text style={styles.mapPreviewMeta} numberOfLines={1} selectable={false}>
                  {[selectedRiver.river.reach, selectedRiver.travelLabel].filter(Boolean).join(' - ')}
                </Text>
              </View>
            </View>
            <Pressable style={styles.mapPreviewSave} onPress={() => onToggleSaved(selectedRiver)} hitSlop={8}>
              <MaterialCommunityIcons
                name={isSaved(selectedRiver.river.slug) ? 'bookmark' : 'bookmark-outline'}
                color={colors.accent}
                size={22}
              />
            </Pressable>
          </View>
          <View style={styles.mapSheetActions}>
            {selectedDirectionsUrl ? (
              <Pressable style={styles.mapDirectionsButton} onPress={() => void Linking.openURL(selectedDirectionsUrl)}>
                <MaterialCommunityIcons name="directions" color={colors.accent} size={18} />
                <Text style={styles.mapDirectionsText}>Directions</Text>
              </Pressable>
            ) : null}
            <Pressable style={styles.mapPreviewOpenButton} onPress={() => onOpenRoute(selectedRiver.river.slug)}>
              <Text style={styles.mapPreviewOpenText}>Open route</Text>
            </Pressable>
            <Pressable style={styles.mapSheetSnapButton} onPress={() => setSheetSnap(nextSheetSnap(sheetSnap))}>
              <Text style={styles.mapSheetSnapText}>{sheetSnap === 'full' ? 'Less' : 'More'}</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.mapRouteStrip}>
            {results.slice(0, 12).map((river) => {
              const selected = river.river.slug === selectedSlug;
              return (
                <Pressable
                  key={river.river.slug}
                  style={[styles.mapRouteChip, selected ? styles.mapRouteChipSelected : null]}
                  onPress={() => onSelectSlug(river.river.slug)}
                >
                  <Text style={[styles.mapRouteChipScore, selected ? styles.mapRouteChipScoreSelected : null]}>
                    {river.score}
                  </Text>
                  <Text style={[styles.mapRouteChipText, selected ? styles.mapRouteChipTextSelected : null]} numberOfLines={1}>
                    {river.river.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
          {sheetSnap !== 'peek' ? (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mapSheetList}>
              {results.slice(0, sheetSnap === 'full' ? 10 : 4).map((river) => (
                <MapSheetRouteRow
                  key={river.river.slug}
                  river={river}
                  selected={river.river.slug === selectedSlug}
                  saved={isSaved(river.river.slug)}
                  onSelect={() => onSelectSlug(river.river.slug)}
                  onOpen={() => onOpenRoute(river.river.slug)}
                  onDirections={() => {
                    const url = mapUrlForAccessPoint(river.river.putIn);
                    if (url) void Linking.openURL(url);
                  }}
                />
              ))}
            </ScrollView>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

function ExploreMapPanel({
  results,
  selectedRiver,
  selectedSlug,
  userLocation,
  onSelectSlug,
  onOpenRoute,
  isSaved,
  onFocusNearest,
  onToggleSaved,
}: {
  results: ExploreRiver[];
  selectedRiver: ExploreRiver | null;
  selectedSlug: string | null;
  userLocation: { latitude: number; longitude: number; label: string } | null;
  onSelectSlug: (slug: string) => void;
  onOpenRoute: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  onFocusNearest: () => void;
  onToggleSaved: (river: ExploreRiver) => void;
}) {
  const [sheetSnap, setSheetSnap] = useState<MapSheetSnap>('half');
  const sheetGesture = useMapSheetPanResponder(sheetSnap, setSheetSnap);
  const selectedDirectionsUrl = mapUrlForAccessPoint(selectedRiver?.river.putIn);
  const mapRef = useRef<RoutePlotMapHandle | null>(null);
  const points = useExploreMapPoints(results);

  if (results.length === 0) {
    return (
      <View style={styles.mapEmptyState}>
        <MaterialCommunityIcons name="map-search-outline" color={colors.textMuted} size={28} />
        <Text style={styles.mapEmptyTitle}>No routes on this map</Text>
        <Text style={styles.mapEmptyText}>Broaden filters or clear search to bring routes back.</Text>
      </View>
    );
  }

  return (
    <View style={styles.immersiveMapStack}>
      <RoutePlotMap
        ref={mapRef}
        points={points}
        selectedId={selectedSlug}
        userLocation={userLocation}
        onSelectPoint={(point) => onSelectSlug(point.id)}
        height={620}
        showFooter={false}
      />
      <View style={styles.mapOverlayTop}>
        <View style={styles.mapPill}>
          <Text style={styles.mapPillText}>{results.length} routes</Text>
        </View>
        {userLocation ? (
          <View style={styles.mapPill}>
            <MaterialCommunityIcons name="crosshairs-gps" color={colors.accentDeep} size={14} />
            <Text style={styles.mapPillText}>Near you</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.mapOverlayActions}>
        <Pressable style={styles.mapFab} onPress={() => mapRef.current?.focusSelected()}>
          <MaterialCommunityIcons name="crosshairs" color={colors.accent} size={20} />
        </Pressable>
        <Pressable style={styles.mapFab} onPress={() => mapRef.current?.focusAll()}>
          <MaterialCommunityIcons name="map-marker-multiple" color={colors.accent} size={20} />
        </Pressable>
        <Pressable style={styles.mapFab} onPress={onFocusNearest}>
          <MaterialCommunityIcons name="crosshairs-gps" color={colors.accent} size={20} />
        </Pressable>
      </View>
      <View style={[styles.mapSheet, sheetHeightStyle(sheetSnap, sheetGesture.dragOffset)]}>
        <View
          style={styles.mapSheetHandleWrap}
          collapsable={false}
          {...sheetGesture.panHandlers}
        >
          <View style={styles.mapSheetHandle} />
        </View>
        {selectedRiver ? (
          <View style={styles.mapPreviewHeader}>
            <View style={styles.mapPreviewDragRegion} collapsable={false} {...sheetGesture.panHandlers}>
              <View style={styles.mapPreviewScore}>
                <Text style={styles.mapPreviewScoreText} selectable={false}>{selectedRiver.score}</Text>
              </View>
              <View style={styles.mapPreviewCopy}>
                <Text style={styles.mapPreviewLabel} selectable={false}>{selectedRiver.rating}</Text>
                <Text style={styles.mapPreviewTitle} numberOfLines={1} selectable={false}>{selectedRiver.river.name}</Text>
                <Text style={styles.mapPreviewMeta} numberOfLines={1} selectable={false}>
                  {[selectedRiver.river.reach, selectedRiver.travelLabel].filter(Boolean).join(' - ')}
                </Text>
              </View>
            </View>
            <Pressable
              style={styles.mapPreviewSave}
              onPress={() => onToggleSaved(selectedRiver)}
              hitSlop={8}
            >
              <MaterialCommunityIcons
                name={isSaved(selectedRiver.river.slug) ? 'bookmark' : 'bookmark-outline'}
                color={colors.accent}
                size={22}
              />
            </Pressable>
          </View>
        ) : null}
        <View style={styles.mapSheetActions}>
          {selectedDirectionsUrl ? (
            <Pressable style={styles.mapDirectionsButton} onPress={() => void Linking.openURL(selectedDirectionsUrl)}>
              <MaterialCommunityIcons name="directions" color={colors.accent} size={18} />
              <Text style={styles.mapDirectionsText}>Directions</Text>
            </Pressable>
          ) : null}
          {selectedRiver ? (
            <Pressable style={styles.mapPreviewOpenButton} onPress={() => onOpenRoute(selectedRiver.river.slug)}>
              <Text style={styles.mapPreviewOpenText}>Open route</Text>
            </Pressable>
          ) : null}
          <Pressable style={styles.mapSheetSnapButton} onPress={() => setSheetSnap(nextSheetSnap(sheetSnap))}>
            <Text style={styles.mapSheetSnapText}>{sheetSnap === 'full' ? 'Less' : 'More'}</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.mapRouteStrip}
        >
          {results.slice(0, 12).map((river) => {
            const selected = river.river.slug === selectedSlug;
            return (
              <Pressable
                key={river.river.slug}
                style={[styles.mapRouteChip, selected ? styles.mapRouteChipSelected : null]}
                onPress={() => onSelectSlug(river.river.slug)}
              >
                <Text style={[styles.mapRouteChipScore, selected ? styles.mapRouteChipScoreSelected : null]}>
                  {river.score}
                </Text>
                <Text style={[styles.mapRouteChipText, selected ? styles.mapRouteChipTextSelected : null]} numberOfLines={1}>
                  {river.river.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        {sheetSnap !== 'peek' ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mapSheetList}>
            {results.slice(0, sheetSnap === 'full' ? 10 : 4).map((river) => (
              <MapSheetRouteRow
                key={river.river.slug}
                river={river}
                selected={river.river.slug === selectedSlug}
                saved={isSaved(river.river.slug)}
                onSelect={() => onSelectSlug(river.river.slug)}
                onOpen={() => onOpenRoute(river.river.slug)}
                onDirections={() => {
                  const url = mapUrlForAccessPoint(river.river.putIn);
                  if (url) void Linking.openURL(url);
                }}
              />
            ))}
          </ScrollView>
        ) : null}
      </View>
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

function MapSheetRouteRow({
  river,
  selected,
  saved,
  onSelect,
  onOpen,
  onDirections,
}: {
  river: ExploreRiver;
  selected: boolean;
  saved: boolean;
  onSelect: () => void;
  onOpen: () => void;
  onDirections: () => void;
}) {
  function handleDirections(event: GestureResponderEvent) {
    event.stopPropagation();
    onDirections();
  }

  function handleOpen(event: GestureResponderEvent) {
    event.stopPropagation();
    onOpen();
  }

  return (
    <Pressable style={[styles.mapSheetRow, selected ? styles.mapSheetRowSelected : null]} onPress={onSelect}>
      <View style={styles.mapSheetRowScore}>
        <Text style={styles.mapSheetRowScoreText}>{river.score}</Text>
      </View>
      <View style={styles.mapSheetRowCopy}>
        <Text style={styles.mapSheetRowTitle} numberOfLines={1}>{river.river.name}</Text>
        <Text style={styles.mapSheetRowMeta} numberOfLines={1}>
          {[river.river.reach, river.travelLabel, river.rating].filter(Boolean).join(' - ')}
        </Text>
      </View>
      {saved ? <MaterialCommunityIcons name="bookmark" color={colors.accent} size={17} /> : null}
      <Pressable style={styles.mapSheetRowDirections} onPress={handleDirections}>
        <MaterialCommunityIcons name="directions" color={colors.accent} size={18} />
      </Pressable>
      <Pressable style={styles.mapSheetRowOpen} onPress={handleOpen}>
        <MaterialCommunityIcons name="chevron-right" color={colors.surfaceStrong} size={18} />
      </Pressable>
    </Pressable>
  );
}

function useMapSheetPanResponder(
  sheetSnap: MapSheetSnap,
  setSheetSnap: Dispatch<SetStateAction<MapSheetSnap>>
) {
  const [dragOffset, setDragOffset] = useState(0);
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_event, gestureState) => Math.abs(gestureState.dy) > 3,
        onMoveShouldSetPanResponderCapture: (_event, gestureState) => Math.abs(gestureState.dy) > 3,
        onPanResponderGrant: () => setDragOffset(0),
        onPanResponderMove: (_event, gestureState) => {
          setDragOffset(clampSheetDragOffset(sheetSnap, -gestureState.dy));
        },
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: (_event, gestureState) => {
          setDragOffset(0);
          if (Math.abs(gestureState.dy) < 8) {
            setSheetSnap(nextSheetSnap(sheetSnap));
            return;
          }

          setSheetSnap(snapSheetAfterDrag(sheetSnap, gestureState.dy));
        },
        onPanResponderTerminate: () => setDragOffset(0),
      }),
    [setSheetSnap, sheetSnap]
  );

  return { panHandlers: panResponder.panHandlers, dragOffset };
}

function sheetHeightStyle(value: MapSheetSnap, dragOffset = 0) {
  return { height: clampSheetHeight(sheetHeightValue(value) + dragOffset) };
}

function sheetHeightValue(value: MapSheetSnap) {
  if (value === 'full') return 430;
  if (value === 'half') return 296;
  return 168;
}

function nextSheetSnap(value: MapSheetSnap): MapSheetSnap {
  if (value === 'peek') return 'half';
  if (value === 'half') return 'full';
  return 'peek';
}

function snapSheetAfterDrag(value: MapSheetSnap, dragY: number): MapSheetSnap {
  if (dragY < -36) {
    if (value === 'peek') return 'half';
    return 'full';
  }

  if (dragY > 36) {
    if (value === 'full') return 'half';
    return 'peek';
  }

  return value;
}

function clampSheetDragOffset(value: MapSheetSnap, dragOffset: number) {
  const baseHeight = sheetHeightValue(value);
  return clampSheetHeight(baseHeight + dragOffset) - baseHeight;
}

function clampSheetHeight(height: number) {
  return Math.min(sheetHeightValue('full'), Math.max(sheetHeightValue('peek'), height));
}

function FilterPanel({
  filters,
  states,
  locationReady,
  onChange,
  onReset,
  onApplyPreset,
}: {
  filters: ExploreFilters;
  states: string[];
  locationReady: boolean;
  onChange: (filters: ExploreFilters) => void;
  onReset: () => void;
  onApplyPreset: (apply: (filters: ExploreFilters) => ExploreFilters) => void;
}) {
  return (
    <View style={styles.filterPanel}>
      <View style={styles.filterPanelHeader}>
        <Text style={styles.filterPanelTitle}>Setup</Text>
        <Pressable onPress={onReset} hitSlop={10}>
          <Text style={styles.resetLink}>Reset</Text>
        </Pressable>
      </View>

      <FilterGroup title="Presets">
        {presetOptions.map((preset) => (
          <ChoiceChip
            key={preset.id}
            label={preset.label}
            selected={false}
            onPress={() => onApplyPreset(preset.apply)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Score">
        {ratingOptions.map((option) => (
          <ChoiceChip
            key={option.value}
            label={option.label}
            selected={filters.rating === option.value}
            onPress={() => onChange({ ...filters, rating: option.value })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Difficulty">
        {difficultyOptions.map((option) => (
          <ChoiceChip
            key={option.value}
            label={option.label}
            selected={filters.difficulty === option.value}
            onPress={() => onChange({ ...filters, difficulty: option.value })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Route type">
        {routeTypeOptions.map((option) => (
          <ChoiceChip
            key={option.value}
            label={option.label}
            selected={filters.routeType === option.value}
            onPress={() => onChange({ ...filters, routeType: option.value })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Paddle time">
        {paddleTimeOptions.map((option) => (
          <ChoiceChip
            key={option.value}
            label={option.label}
            selected={filters.paddleTime === option.value}
            onPress={() => onChange({ ...filters, paddleTime: option.value })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="State">
        <ChoiceChip
          label="All states"
          selected={!filters.state}
          onPress={() => onChange({ ...filters, state: '' })}
        />
        {states.map((state) => (
          <ChoiceChip
            key={state}
            label={state}
            selected={filters.state === state}
            onPress={() => onChange({ ...filters, state })}
          />
        ))}
      </FilterGroup>

      {locationReady ? (
        <FilterGroup title="Distance">
          {distanceOptions.map((option) => (
            <ChoiceChip
              key={option.value}
              label={option.label}
              selected={filters.distance === option.value}
              onPress={() => onChange({ ...filters, distance: option.value })}
            />
          ))}
        </FilterGroup>
      ) : null}
    </View>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.filterGroup}>
      <Text style={styles.filterGroupTitle}>{title}</Text>
      <View style={styles.chipWrap}>{children}</View>
    </View>
  );
}

function ActiveFilterStrip({ filters, locationReady }: { filters: ExploreFilters; locationReady: boolean }) {
  const active = activeFilterLabels(filters, locationReady);
  if (active.length === 0) {
    return <Text style={styles.filterHint}>Default view hides whitewater and ranks practical picks first.</Text>;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.activeFilters}>
      {active.map((label) => (
        <View key={label} style={styles.activeFilterPill}>
          <Text style={styles.activeFilterText}>{label}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function ChoiceChip({
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
      style={[styles.choiceChip, selected ? styles.choiceChipSelected : null]}
      onPress={onPress}
      android_ripple={{ color: colors.canvasMuted, borderless: true }}
    >
      <Text style={[styles.choiceChipText, selected ? styles.choiceChipTextSelected : null]}>{label}</Text>
    </Pressable>
  );
}

function textFromInputEvent(event: { nativeEvent?: { text?: string }; target?: unknown }) {
  const target = event.target as { value?: string } | null | undefined;
  return event.nativeEvent?.text ?? target?.value ?? '';
}

function webInputProps(onText: (value: string) => void) {
  if (Platform.OS !== 'web') {
    return {};
  }

  return {
    onInput: (event: { target?: { value?: string } }) => onText(event.target?.value ?? ''),
  };
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

function routeTypeMatches(routeType: RouteType, filter: RouteTypeFilter) {
  if (filter === 'all') return true;
  if (filter === 'whitewater') return routeType === 'whitewater';
  return routeType !== 'whitewater';
}

function paddleTimeMatches(label: string, filter: PaddleTimeFilter) {
  if (filter === 'any') return true;

  const hours = parsePaddleHours(label);
  if (hours === null) return false;

  if (filter === 'up-to-3') return hours <= 3;
  if (filter === '3-to-5') return hours > 3 && hours <= 5;
  if (filter === '5-to-7') return hours > 5 && hours <= 7;
  return hours > 7;
}

function parsePaddleHours(label: string) {
  const matches = [...label.matchAll(/(\d+(?:\.\d+)?)/g)].map((match) => Number(match[1]));
  const finite = matches.filter((value) => Number.isFinite(value));
  if (finite.length === 0) return null;

  return Math.max(...finite);
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

function countActiveFilters(filters: ExploreFilters) {
  return [
    filters.query.trim(),
    filters.state,
    filters.difficulty !== defaultFilters.difficulty,
    filters.routeType !== defaultFilters.routeType,
    filters.rating !== defaultFilters.rating,
    filters.distance !== defaultFilters.distance,
    filters.paddleTime !== defaultFilters.paddleTime,
  ].filter(Boolean).length;
}

function activeFilterLabels(filters: ExploreFilters, locationReady: boolean) {
  const labels: string[] = [];
  if (filters.query.trim()) labels.push(`Search: ${filters.query.trim()}`);
  if (filters.state) labels.push(filters.state);
  if (filters.rating !== 'any') labels.push(filters.rating);
  if (filters.difficulty !== 'any') labels.push(capitalize(filters.difficulty));
  if (filters.routeType === 'whitewater') labels.push('Whitewater');
  if (filters.routeType === 'all') labels.push('All route types');
  if (filters.paddleTime !== 'any') {
    labels.push(paddleTimeOptions.find((option) => option.value === filters.paddleTime)?.label ?? 'Paddle time');
  }
  if (locationReady && filters.distance !== 'any') labels.push(`Within ${filters.distance} mi`);
  return labels;
}

function isExplorePreferences(value: unknown): value is ExplorePreferences {
  return (
    isRecord(value) &&
    isExploreFilters(value.filters) &&
    isExploreViewMode(value.viewMode)
  );
}

function isExploreFilters(value: unknown): value is ExploreFilters {
  return (
    isRecord(value) &&
    isExploreSort(value.sort) &&
    typeof value.query === 'string' &&
    typeof value.state === 'string' &&
    isDifficultyFilter(value.difficulty) &&
    isRouteTypeFilter(value.routeType) &&
    isRatingFilter(value.rating) &&
    isDistanceFilter(value.distance) &&
    isPaddleTimeFilter(value.paddleTime)
  );
}

function isExploreSort(value: unknown): value is ExploreSort {
  return sortOptions.some((option) => option.value === value);
}

function isExploreViewMode(value: unknown): value is ExploreViewMode {
  return value === 'list' || value === 'map';
}

function isDifficultyFilter(value: unknown): value is DifficultyFilter {
  return difficultyOptions.some((option) => option.value === value);
}

function isRouteTypeFilter(value: unknown): value is RouteTypeFilter {
  return routeTypeOptions.some((option) => option.value === value);
}

function isRatingFilter(value: unknown): value is RatingFilter {
  return ratingOptions.some((option) => option.value === value);
}

function isDistanceFilter(value: unknown): value is DistanceFilter {
  return distanceOptions.some((option) => option.value === value);
}

function isPaddleTimeFilter(value: unknown): value is PaddleTimeFilter {
  return paddleTimeOptions.some((option) => option.value === value);
}

function capitalize(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
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
  fullMapSheet: {
    bottom: 0,
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
  searchBar: {
    minHeight: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    paddingVertical: 10,
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
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
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
  immersiveMapStack: {
    position: 'relative',
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  mapOverlayTop: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  mapSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surfaceStrong,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 16,
    zIndex: 20,
  },
  mapSheetHandleWrap: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    minHeight: 32,
  },
  mapSheetHandle: {
    width: 42,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
  mapPreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  mapPreviewDragRegion: {
    flex: 1,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  mapPreviewScore: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPreviewScoreText: {
    color: colors.accentDeep,
    fontSize: 17,
    fontWeight: '900',
  },
  mapPreviewCopy: {
    flex: 1,
    gap: 2,
  },
  mapPreviewLabel: {
    color: colors.accentDeep,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  mapPreviewTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  mapPreviewMeta: {
    color: colors.textMuted,
    fontSize: 12,
  },
  mapPreviewSave: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.canvasMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPreviewOpenButton: {
    flex: 1,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPreviewOpenText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  mapDirectionsButton: {
    flex: 1,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.surfaceStrong,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  mapDirectionsText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  mapSheetActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  mapSheetSnapButton: {
    minWidth: 74,
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapSheetSnapText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  mapRouteStrip: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  mapRouteChip: {
    maxWidth: 150,
    minHeight: 38,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  mapRouteChipSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  mapRouteChipScore: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '900',
  },
  mapRouteChipScoreSelected: {
    color: colors.surfaceStrong,
  },
  mapRouteChipText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
    maxWidth: 104,
  },
  mapRouteChipTextSelected: {
    color: colors.surfaceStrong,
  },
  mapSheetList: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  mapSheetRow: {
    minHeight: 58,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  mapSheetRowSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  mapSheetRowScore: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapSheetRowScoreText: {
    color: colors.accentDeep,
    fontSize: 14,
    fontWeight: '900',
  },
  mapSheetRowCopy: {
    flex: 1,
    gap: 2,
  },
  mapSheetRowTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  mapSheetRowMeta: {
    color: colors.textMuted,
    fontSize: 12,
  },
  mapSheetRowOpen: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapSheetRowDirections: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
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
  sortStrip: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  filterButton: {
    minHeight: 38,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    backgroundColor: colors.surfaceStrong,
  },
  filterButtonActive: {
    backgroundColor: colors.accent,
  },
  filterButtonText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '800',
  },
  filterButtonTextActive: {
    color: colors.surfaceStrong,
  },
  sheetScrim: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(10, 24, 29, 0.34)',
  },
  filterSheet: {
    maxHeight: '88%',
    backgroundColor: colors.canvas,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 42,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  sheetTitleCopy: {
    flex: 1,
    gap: 3,
  },
  sheetTitle: {
    color: colors.text,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '900',
  },
  sheetSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  sheetDoneButton: {
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 15,
    paddingVertical: 9,
  },
  sheetDoneText: {
    color: colors.surfaceStrong,
    fontSize: 12,
    fontWeight: '900',
  },
  sheetContent: {
    paddingBottom: spacing.lg,
  },
  filterPanel: {
    gap: spacing.md,
  },
  filterPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterPanelTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  resetLink: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '800',
  },
  filterGroup: {
    gap: spacing.sm,
  },
  filterGroupTitle: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  choiceChip: {
    minHeight: 36,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceChipSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  choiceChipText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '800',
  },
  choiceChipTextSelected: {
    color: colors.accentDeep,
  },
  activeFilters: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  activeFilterPill: {
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  activeFilterText: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '800',
  },
  filterHint: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
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
