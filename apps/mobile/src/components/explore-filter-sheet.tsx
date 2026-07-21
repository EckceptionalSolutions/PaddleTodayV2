import { useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react';
import type { PaddleLengthFilter as SharedPaddleLengthFilter, RouteType, ScoreRating } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Animated, Modal, PanResponder, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChoiceChip, isExploreSort, type ExploreSort } from './explore-controls';
import { androidBottomInset } from '../lib/safe-area';
import { isRecord } from '../lib/storage';
import { colors, radius, spacing } from '../theme/tokens';

export type DifficultyFilter = 'any' | 'easy' | 'easy-moderate' | 'moderate' | 'hard';
export type RouteTypeFilter = 'non-whitewater' | 'whitewater' | 'all';
export type StatusFilter = 'any' | 'clean' | 'watch' | 'skip';
export type RatingFilter = 'any' | ScoreRating;
export type DistanceFilter = 'any' | '50' | '100' | '150' | '200';
export type PaddleTimeFilter = 'any' | 'up-to-3' | '3-to-5' | '5-to-7' | 'full-day' | '7-plus';
export type PaddleLengthFilter = 'any' | Exclude<SharedPaddleLengthFilter, ''>;
export type CampingFilter = 'any' | 'supported' | 'overnight';

export interface ExploreFilters {
  sort: ExploreSort;
  query: string;
  state: string;
  difficulty: DifficultyFilter;
  routeType: RouteTypeFilter;
  status: StatusFilter;
  rating: RatingFilter;
  distance: DistanceFilter;
  paddleTime: PaddleTimeFilter;
  paddleLength: PaddleLengthFilter;
  camping: CampingFilter;
}

export const defaultFilters: ExploreFilters = {
  sort: 'best',
  query: '',
  state: '',
  difficulty: 'any',
  routeType: 'all',
  status: 'any',
  rating: 'any',
  distance: 'any',
  paddleTime: 'any',
  paddleLength: 'any',
  camping: 'any',
};

const ratingOptions: Array<{ value: RatingFilter; label: string }> = [
  { value: 'any', label: 'Any score' },
  { value: 'Strong', label: 'Strong' },
  { value: 'Good', label: 'Good' },
  { value: 'Fair', label: 'Fair' },
  { value: 'No-go', label: 'No-go' },
];

const statusOptions: Array<{ value: StatusFilter; label: string }> = [
  { value: 'any', label: 'Any call' },
  { value: 'clean', label: 'Clean' },
  { value: 'watch', label: 'Watch' },
  { value: 'skip', label: 'Skip' },
];

const difficultyOptions: Array<{ value: DifficultyFilter; label: string }> = [
  { value: 'any', label: 'Any difficulty' },
  { value: 'easy', label: 'Easy' },
  { value: 'easy-moderate', label: 'Easy/Moderate' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'hard', label: 'Hard' },
];

const routeTypeOptions: Array<{ value: RouteTypeFilter; label: string }> = [
  { value: 'all', label: 'All routes' },
  { value: 'non-whitewater', label: 'Rec routes' },
  { value: 'whitewater', label: 'Whitewater' },
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
  { value: 'full-day', label: 'Full day' },
  { value: '7-plus', label: '7h+' },
];

const paddleLengthOptions: Array<{ value: PaddleLengthFilter; label: string }> = [
  { value: 'any', label: 'Any length' },
  { value: 'under-5', label: 'Under 5 mi' },
  { value: '5-to-10', label: '5–10 mi' },
  { value: '10-plus', label: '10+ mi' },
];

const campingOptions: Array<{ value: CampingFilter; label: string }> = [
  { value: 'any', label: 'Any camping' },
  { value: 'supported', label: 'Camping' },
  { value: 'overnight', label: 'Overnight' },
];

const callQualityOptions: Array<{
  value: string;
  label: string;
  apply: (filters: ExploreFilters) => ExploreFilters;
  selected: (filters: ExploreFilters) => boolean;
}> = [
  {
    value: 'any',
    label: 'Any call',
    apply: (filters) => ({ ...filters, status: 'any', rating: 'any' }),
    selected: (filters) => filters.status === 'any' && filters.rating === 'any',
  },
  {
    value: 'good-plus',
    label: 'Good+',
    apply: (filters) => ({ ...filters, status: 'clean', rating: 'any' }),
    selected: (filters) => filters.status === 'clean' && filters.rating === 'any',
  },
  {
    value: 'strong',
    label: 'Strong',
    apply: (filters) => ({ ...filters, status: 'any', rating: 'Strong' }),
    selected: (filters) => filters.rating === 'Strong',
  },
  {
    value: 'good',
    label: 'Good',
    apply: (filters) => ({ ...filters, status: 'any', rating: 'Good' }),
    selected: (filters) => filters.rating === 'Good',
  },
  {
    value: 'fair',
    label: 'Fair',
    apply: (filters) => ({ ...filters, status: 'watch', rating: 'any' }),
    selected: (filters) => filters.status === 'watch' && filters.rating === 'any',
  },
  {
    value: 'no-go',
    label: 'No-go',
    apply: (filters) => ({ ...filters, status: 'skip', rating: 'any' }),
    selected: (filters) => filters.status === 'skip' && filters.rating === 'any',
  },
];

const ANDROID_NAV_CONTROL_MIN_INSET = 40;

type PresetApply = (filters: ExploreFilters, context: { locationReady: boolean }) => ExploreFilters;

const presetOptions: Array<{ id: string; label: string; apply: PresetApply }> = [
  {
    id: 'quick-float',
    label: 'Quick float',
    apply: (filters) => ({
      ...filters,
      difficulty: 'easy-moderate',
      routeType: 'non-whitewater',
      paddleTime: 'up-to-3',
      status: 'any',
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
      paddleTime: 'full-day',
      status: 'any',
      rating: 'any',
      sort: 'score',
    }),
  },
  {
    id: 'best-nearby',
    label: 'Best nearby',
    apply: (filters, context) => ({
      ...filters,
      distance: context.locationReady ? '100' : 'any',
      status: 'any',
      rating: 'any',
      sort: 'nearest',
    }),
  },
  {
    id: 'camping',
    label: 'Camping',
    apply: (filters, context) => ({
      ...filters,
      camping: 'supported',
      status: 'any',
      rating: 'any',
      distance: context.locationReady ? '150' : 'any',
      sort: context.locationReady ? 'nearest' : 'best',
    }),
  },
];

export function ExploreFilterSheet({
  visible,
  matchCount,
  filters,
  states,
  locationReady,
  onDismiss,
  onApply,
  onChange,
  onReset,
  onApplyPreset,
}: {
  visible: boolean;
  matchCount: number;
  filters: ExploreFilters;
  states: string[];
  locationReady: boolean;
  onDismiss: () => void;
  onApply: () => void;
  onChange: (filters: ExploreFilters) => void;
  onReset: () => void;
  onApplyPreset: (apply: (filters: ExploreFilters) => ExploreFilters) => void;
}) {
  const insets = useSafeAreaInsets();
  const bottomInset = androidBottomInset(insets.bottom, ANDROID_NAV_CONTROL_MIN_INSET);
  const translateY = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 6 && Math.abs(gesture.dy) > Math.abs(gesture.dx),
      onPanResponderMove: (_, gesture) => {
        translateY.setValue(Math.max(0, gesture.dy));
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 90 || gesture.vy > 0.9) {
          translateY.setValue(0);
          onDismiss();
          return;
        }

        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 190,
        }).start();
      },
      onPanResponderTerminate: () => {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 190,
        }).start();
      },
    })
  ).current;

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onDismiss}>
      <View style={styles.sheetScrim}>
        <Animated.View style={[styles.filterSheet, { transform: [{ translateY }] }]}>
          <View style={styles.sheetDragZone} {...panResponder.panHandlers}>
            <View style={styles.sheetHandle} />
          </View>
          <View style={styles.sheetHeader} {...panResponder.panHandlers}>
            <View style={styles.sheetTitleCopy}>
              <Text style={styles.sheetTitle}>Filters</Text>
              <Text style={styles.sheetSubtitle}>{matchCount} routes match this setup</Text>
            </View>
            <Pressable style={styles.sheetCancelButton} onPress={onDismiss}>
              <Text style={styles.sheetCancelText}>Cancel</Text>
            </Pressable>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[styles.sheetContent, { paddingBottom: spacing.lg + bottomInset }]}
          >
            <FilterPanel
              filters={filters}
              states={states}
              locationReady={locationReady}
              onChange={onChange}
              onApplyPreset={onApplyPreset}
            />
          </ScrollView>
          <View style={[styles.sheetFooter, { paddingBottom: bottomInset }]}>
            <Pressable style={styles.sheetResetButton} onPress={onReset}>
              <Text style={styles.sheetResetText}>Clear filters</Text>
            </Pressable>
            <Pressable style={styles.sheetShowButton} onPress={onApply}>
              <Text style={styles.sheetShowText}>Show {matchCount} routes</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

function FilterPanel({
  filters,
  states,
  locationReady,
  onChange,
  onApplyPreset,
}: {
  filters: ExploreFilters;
  states: string[];
  locationReady: boolean;
  onChange: (filters: ExploreFilters) => void;
  onApplyPreset: (apply: (filters: ExploreFilters) => ExploreFilters) => void;
}) {
  const [statePickerOpen, setStatePickerOpen] = useState(false);

  return (
    <View style={styles.filterPanel}>
      <View style={styles.filterPanelHeader}>
        <Text style={styles.filterPanelTitle}>Quick filters</Text>
      </View>

      <FilterGroup title="Quick picks">
        {presetOptions.map((preset) => (
          <PresetChip
            key={preset.id}
            label={preset.label}
            selected={presetIsActive(preset.id, filters, locationReady)}
            onPress={() => onApplyPreset((current) => preset.apply(current, { locationReady }))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Route call">
        {callQualityOptions.map((option) => (
          <ChoiceChip
            key={option.value}
            label={option.label}
            selected={option.selected(filters)}
            onPress={() => onChange(option.apply(filters))}
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

      <FilterGroup title="Paddle length">
        {paddleLengthOptions.map((option) => (
          <ChoiceChip
            key={option.value}
            label={option.label}
            selected={filters.paddleLength === option.value}
            onPress={() => onChange({ ...filters, paddleLength: option.value })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="State" wrap={false}>
        <Pressable
          style={({ pressed }) => [styles.selectorRow, pressed ? styles.selectorRowPressed : null]}
          onPress={() => setStatePickerOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Choose state"
        >
          <View style={styles.selectorCopy}>
            <Text style={styles.selectorLabel}>State</Text>
            <Text style={styles.selectorValue}>{filters.state || 'All states'}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-down" color={colors.accent} size={20} />
        </Pressable>
      </FilterGroup>

      <StatePickerModal
        visible={statePickerOpen}
        selectedState={filters.state}
        states={states}
        onSelect={(state) => {
          onChange({ ...filters, state });
          setStatePickerOpen(false);
        }}
        onDismiss={() => setStatePickerOpen(false)}
      />

      <FilterGroup title="Camping">
        {campingOptions.map((option) => (
          <ChoiceChip
            key={option.value}
            label={option.label}
            selected={filters.camping === option.value}
            onPress={() => onChange({ ...filters, camping: option.value })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Distance" wrap={false}>
        {locationReady ? (
          <DistanceSelector
            value={filters.distance}
            onChange={(distance) => onChange({ ...filters, distance })}
          />
        ) : (
          <View style={styles.disabledSelectorRow}>
            <View style={styles.selectorCopy}>
              <Text style={styles.selectorLabel}>Drive range</Text>
              <Text style={styles.selectorValue}>Use location on the map</Text>
            </View>
            <MaterialCommunityIcons name="map-marker-radius-outline" color={colors.textMuted} size={20} />
          </View>
        )}
      </FilterGroup>
    </View>
  );
}

function DistanceSelector({ value, onChange }: { value: DistanceFilter; onChange: (value: DistanceFilter) => void }) {
  return (
    <View style={styles.distanceRail}>
      {distanceOptions.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            style={[styles.distanceStop, selected ? styles.distanceStopSelected : null]}
            onPress={() => onChange(option.value)}
            accessibilityRole="button"
            accessibilityLabel={`Drive distance ${option.label}`}
            accessibilityState={{ selected }}
          >
            <Text style={[styles.distanceStopText, selected ? styles.distanceStopTextSelected : null]}>
              {option.value === 'any' ? 'Any' : option.value}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function StatePickerModal({
  visible,
  selectedState,
  states,
  onSelect,
  onDismiss,
}: {
  visible: boolean;
  selectedState: string;
  states: string[];
  onSelect: (state: string) => void;
  onDismiss: () => void;
}) {
  const [query, setQuery] = useState('');
  useEffect(() => {
    if (visible) {
      setQuery('');
    }
  }, [visible]);

  const filteredStates = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return states;
    return states.filter((state) => state.toLowerCase().includes(normalized));
  }, [query, states]);

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onDismiss}>
      <View style={styles.pickerScrim}>
        <View style={styles.statePicker}>
          <View style={styles.statePickerHeader}>
            <Text style={styles.statePickerTitle}>Choose state</Text>
            <Pressable hitSlop={10} onPress={onDismiss} accessibilityRole="button" accessibilityLabel="Close state picker">
              <MaterialCommunityIcons name="close" color={colors.textMuted} size={22} />
            </Pressable>
          </View>
          <View style={styles.stateSearch}>
            <MaterialCommunityIcons name="magnify" color={colors.textMuted} size={18} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search states"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="characters"
              autoCorrect={false}
              style={styles.stateSearchInput}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <StatePickerOption label="All states" selected={!selectedState} onPress={() => onSelect('')} />
            {filteredStates.map((state) => (
              <StatePickerOption
                key={state}
                label={state}
                selected={selectedState === state}
                onPress={() => onSelect(state)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function StatePickerOption({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable style={styles.stateOption} onPress={onPress} accessibilityRole="button" accessibilityState={{ selected }}>
      <Text style={[styles.stateOptionText, selected ? styles.stateOptionTextSelected : null]}>{label}</Text>
      {selected ? <MaterialCommunityIcons name="check" color={colors.accent} size={19} /> : null}
    </Pressable>
  );
}

function FilterGroup({
  title,
  children,
  wrap = true,
}: PropsWithChildren<{ title: string; wrap?: boolean }>) {
  return (
    <View style={styles.filterGroup}>
      <Text style={styles.filterGroupTitle}>{title}</Text>
      <View style={wrap ? styles.chipWrap : styles.controlStack}>{children}</View>
    </View>
  );
}

function PresetChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.presetChip,
        selected ? styles.presetChipSelected : null,
        pressed ? styles.presetChipPressed : null,
      ]}
      onPress={onPress}
      android_ripple={{ color: colors.accentSoft }}
    >
      <View style={[styles.presetIcon, selected ? styles.presetIconSelected : null]}>
        <MaterialCommunityIcons
          name={selected ? 'check' : 'lightning-bolt-outline'}
          color={selected ? colors.accent : colors.accentDeep}
          size={14}
        />
      </View>
      <Text style={[styles.presetChipText, selected ? styles.presetChipTextSelected : null]}>{label}</Text>
    </Pressable>
  );
}

export function ActiveFilterStrip({ filters, locationReady }: { filters: ExploreFilters; locationReady: boolean }) {
  const active = activeFilterLabels(filters, locationReady);
  if (active.length === 0) {
    return <Text style={styles.filterHint}>Default view shows every route and ranks good picks first.</Text>;
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

export function countActiveFilters(filters: ExploreFilters) {
  return [
    filters.query.trim(),
    filters.state,
    filters.difficulty !== defaultFilters.difficulty,
    filters.routeType !== defaultFilters.routeType,
    filters.status !== defaultFilters.status,
    filters.rating !== defaultFilters.rating,
    filters.distance !== defaultFilters.distance,
    filters.paddleTime !== defaultFilters.paddleTime,
    filters.paddleLength !== defaultFilters.paddleLength,
    filters.camping !== defaultFilters.camping,
  ].filter(Boolean).length;
}

export function activeFilterLabels(filters: ExploreFilters, locationReady: boolean) {
  const labels: string[] = [];
  if (filters.query.trim()) labels.push(`Search: ${filters.query.trim()}`);
  if (filters.state) labels.push(filters.state);
  if (filters.status === 'clean') labels.push('Good+');
  if (filters.status === 'watch') labels.push('Fair');
  if (filters.status === 'skip') labels.push('No-go');
  if (filters.rating !== 'any') labels.push(filters.rating);
  if (filters.difficulty === 'easy-moderate') {
    labels.push('Easy/Moderate');
  } else if (filters.difficulty !== 'any') {
    labels.push(capitalize(filters.difficulty));
  }
  if (filters.routeType === 'whitewater') labels.push('Whitewater');
  if (filters.paddleTime !== 'any') {
    labels.push(paddleTimeOptions.find((option) => option.value === filters.paddleTime)?.label ?? 'Paddle time');
  }
  if (filters.paddleLength !== 'any') {
    labels.push(paddleLengthOptions.find((option) => option.value === filters.paddleLength)?.label ?? 'Paddle length');
  }
  if (filters.camping === 'supported') labels.push('Camping');
  if (filters.camping === 'overnight') labels.push('Overnight');
  if (locationReady && filters.distance !== 'any') labels.push(`Within ${filters.distance} mi`);
  return labels;
}

export function isExploreFilters(value: unknown): value is ExploreFilters {
  return (
    isRecord(value) &&
    isExploreSort(value.sort) &&
    typeof value.query === 'string' &&
    typeof value.state === 'string' &&
    isDifficultyFilter(value.difficulty) &&
    isRouteTypeFilter(value.routeType) &&
    (value.status === undefined || isStatusFilter(value.status)) &&
    isRatingFilter(value.rating) &&
    isDistanceFilter(value.distance) &&
    isPaddleTimeFilter(value.paddleTime) &&
    (value.paddleLength === undefined || isPaddleLengthFilter(value.paddleLength)) &&
    (value.camping === undefined || isCampingFilter(value.camping))
  );
}

export function routeTypeMatches(routeType: RouteType, filter: RouteTypeFilter) {
  if (filter === 'all') return true;
  if (filter === 'whitewater') return routeType === 'whitewater';
  return routeType !== 'whitewater';
}

export function difficultyMatches(difficulty: 'easy' | 'moderate' | 'hard', filter: DifficultyFilter) {
  if (filter === 'any') return true;
  if (filter === 'easy-moderate') return difficulty === 'easy' || difficulty === 'moderate';
  return difficulty === filter;
}

export function statusMatches(rating: ScoreRating, filter: StatusFilter) {
  if (filter === 'any') return true;
  if (filter === 'clean') return rating === 'Strong' || rating === 'Good';
  if (filter === 'watch') return rating === 'Fair';
  return rating === 'No-go';
}

export function paddleTimeMatches(label: string, filter: PaddleTimeFilter, campingClassification?: string | null) {
  if (filter === 'any') return true;

  const hours = parsePaddleHours(label);
  if (hours === null) return false;

  if (filter === 'up-to-3') return hours <= 3;
  if (filter === '3-to-5') return hours > 3 && hours <= 5;
  if (filter === '5-to-7') return hours > 5 && hours <= 7;
  if (filter === 'full-day') return hours >= 5 && !isMultiDayRoute(label, campingClassification);
  return hours > 7 && !isMultiDayRoute(label, campingClassification);
}

export function campingMatches(
  classification: string | null | undefined,
  filter: CampingFilter
) {
  if (filter === 'any') return true;
  if (!classification || classification === 'none' || classification === 'unknown') return false;
  if (filter === 'supported') return true;
  return (
    classification === 'overnight_capable' ||
    classification === 'on_route_campsite' ||
    classification === 'sandbar_or_gravel_bar'
  );
}

function isDifficultyFilter(value: unknown): value is DifficultyFilter {
  return difficultyOptions.some((option) => option.value === value);
}

function isRouteTypeFilter(value: unknown): value is RouteTypeFilter {
  return routeTypeOptions.some((option) => option.value === value);
}

function isStatusFilter(value: unknown): value is StatusFilter {
  return statusOptions.some((option) => option.value === value);
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

function isPaddleLengthFilter(value: unknown): value is PaddleLengthFilter {
  return paddleLengthOptions.some((option) => option.value === value);
}

function isCampingFilter(value: unknown): value is CampingFilter {
  return campingOptions.some((option) => option.value === value);
}

function parsePaddleHours(label: string) {
  const matches = [...label.matchAll(/(\d+(?:\.\d+)?)/g)].map((match) => Number(match[1]));
  const finite = matches.filter((value) => Number.isFinite(value));
  if (finite.length === 0) return null;

  return Math.max(...finite);
}

function isMultiDayRoute(label: string, campingClassification?: string | null) {
  if (
    campingClassification === 'overnight_capable' ||
    campingClassification === 'on_route_campsite' ||
    campingClassification === 'sandbar_or_gravel_bar'
  ) {
    return true;
  }

  return /multi-day|two-day|overnight|split as an overnight|best planned as an overnight|light overnight/i.test(label);
}

function capitalize(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}

function presetIsActive(id: string, filters: ExploreFilters, locationReady: boolean) {
  if (id === 'quick-float') {
    return (
      filters.difficulty === 'easy-moderate' &&
      filters.routeType === 'non-whitewater' &&
      filters.paddleTime === 'up-to-3' &&
      filters.status === 'any' &&
      filters.rating === 'any' &&
      filters.sort === 'best'
    );
  }

  if (id === 'full-day') {
    return (
      filters.difficulty === 'any' &&
      filters.routeType === 'all' &&
      filters.paddleTime === 'full-day' &&
      filters.status === 'any' &&
      filters.rating === 'any' &&
      filters.sort === 'score'
    );
  }

  if (id === 'best-nearby') {
    return (
      filters.distance === (locationReady ? '100' : 'any') &&
      filters.status === 'any' &&
      filters.rating === 'any' &&
      filters.sort === 'nearest'
    );
  }

  if (id === 'camping') {
    return (
      filters.camping === 'supported' &&
      filters.status === 'any' &&
      filters.rating === 'any' &&
      filters.distance === (locationReady ? '150' : 'any') &&
      filters.sort === (locationReady ? 'nearest' : 'best')
    );
  }

  return false;
}

const styles = StyleSheet.create({
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
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  sheetDragZone: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: spacing.sm,
  },
  sheetHandle: {
    width: 42,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.border,
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
  sheetCancelButton: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    paddingHorizontal: 15,
    paddingVertical: 9,
  },
  sheetCancelText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  sheetContent: {
    paddingBottom: spacing.lg,
  },
  sheetFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  sheetResetButton: {
    minHeight: 44,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
  },
  sheetResetText: {
    color: colors.accentDeep,
    fontSize: 13,
    fontWeight: '900',
  },
  sheetShowButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  sheetShowText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '900',
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
  controlStack: {
    gap: spacing.sm,
  },
  selectorRow: {
    alignSelf: 'stretch',
    minHeight: 54,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  selectorRowPressed: {
    opacity: 0.82,
  },
  disabledSelectorRow: {
    alignSelf: 'stretch',
    minHeight: 54,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.canvasMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    opacity: 0.82,
  },
  selectorCopy: {
    flex: 1,
    gap: 2,
  },
  selectorLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  selectorValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  distanceRail: {
    alignSelf: 'stretch',
    minHeight: 44,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    flexDirection: 'row',
    padding: 3,
    gap: 3,
  },
  distanceStop: {
    flex: 1,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    minWidth: 0,
  },
  distanceStopSelected: {
    backgroundColor: colors.accent,
  },
  distanceStopText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
  },
  distanceStopTextSelected: {
    color: colors.surfaceStrong,
  },
  pickerScrim: {
    flex: 1,
    backgroundColor: 'rgba(10, 24, 29, 0.38)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  statePicker: {
    maxHeight: '72%',
    borderRadius: radius.lg,
    backgroundColor: colors.canvas,
    padding: spacing.md,
    gap: spacing.md,
  },
  statePickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  statePickerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  stateSearch: {
    minHeight: 44,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stateSearchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    paddingVertical: 0,
  },
  stateOption: {
    minHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  stateOptionText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  stateOptionTextSelected: {
    color: colors.accentDeep,
    fontWeight: '900',
  },
  presetChip: {
    minHeight: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#BFD6CC',
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  presetChipPressed: {
    opacity: 0.82,
  },
  presetChipSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  presetIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetIconSelected: {
    backgroundColor: colors.surfaceStrong,
  },
  presetChipText: {
    color: colors.accentDeep,
    fontSize: 13,
    fontWeight: '900',
  },
  presetChipTextSelected: {
    color: colors.surfaceStrong,
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
});
