import type { PropsWithChildren } from 'react';
import type { RouteType, ScoreRating } from '@paddletoday/api-contract';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChoiceChip, isExploreSort, type ExploreSort } from './explore-controls';
import { isRecord } from '../lib/storage';
import { colors, radius, spacing } from '../theme/tokens';

export type DifficultyFilter = 'any' | 'easy' | 'moderate' | 'hard';
export type RouteTypeFilter = 'non-whitewater' | 'whitewater' | 'all';
export type RatingFilter = 'any' | ScoreRating;
export type DistanceFilter = 'any' | '50' | '100' | '150' | '200';
export type PaddleTimeFilter = 'any' | 'up-to-3' | '3-to-5' | '5-to-7' | '7-plus';

export interface ExploreFilters {
  sort: ExploreSort;
  query: string;
  state: string;
  difficulty: DifficultyFilter;
  routeType: RouteTypeFilter;
  rating: RatingFilter;
  distance: DistanceFilter;
  paddleTime: PaddleTimeFilter;
}

export const defaultFilters: ExploreFilters = {
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

export function ExploreFilterSheet({
  visible,
  matchCount,
  filters,
  states,
  locationReady,
  onClose,
  onChange,
  onReset,
  onApplyPreset,
}: {
  visible: boolean;
  matchCount: number;
  filters: ExploreFilters;
  states: string[];
  locationReady: boolean;
  onClose: () => void;
  onChange: (filters: ExploreFilters) => void;
  onReset: () => void;
  onApplyPreset: (apply: (filters: ExploreFilters) => ExploreFilters) => void;
}) {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.sheetScrim}>
        <View style={styles.filterSheet}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHeader}>
            <View style={styles.sheetTitleCopy}>
              <Text style={styles.sheetTitle}>Filters</Text>
              <Text style={styles.sheetSubtitle}>{matchCount} routes match this setup</Text>
            </View>
            <Pressable style={styles.sheetDoneButton} onPress={onClose}>
              <Text style={styles.sheetDoneText}>Done</Text>
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetContent}>
            <FilterPanel
              filters={filters}
              states={states}
              locationReady={locationReady}
              onChange={onChange}
              onReset={onReset}
              onApplyPreset={onApplyPreset}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
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
        <ChoiceChip label="All states" selected={!filters.state} onPress={() => onChange({ ...filters, state: '' })} />
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

function FilterGroup({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <View style={styles.filterGroup}>
      <Text style={styles.filterGroupTitle}>{title}</Text>
      <View style={styles.chipWrap}>{children}</View>
    </View>
  );
}

export function ActiveFilterStrip({ filters, locationReady }: { filters: ExploreFilters; locationReady: boolean }) {
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

export function countActiveFilters(filters: ExploreFilters) {
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

export function activeFilterLabels(filters: ExploreFilters, locationReady: boolean) {
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

export function isExploreFilters(value: unknown): value is ExploreFilters {
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

export function routeTypeMatches(routeType: RouteType, filter: RouteTypeFilter) {
  if (filter === 'all') return true;
  if (filter === 'whitewater') return routeType === 'whitewater';
  return routeType !== 'whitewater';
}

export function paddleTimeMatches(label: string, filter: PaddleTimeFilter) {
  if (filter === 'any') return true;

  const hours = parsePaddleHours(label);
  if (hours === null) return false;

  if (filter === 'up-to-3') return hours <= 3;
  if (filter === '3-to-5') return hours > 3 && hours <= 5;
  if (filter === '5-to-7') return hours > 5 && hours <= 7;
  return hours > 7;
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

function parsePaddleHours(label: string) {
  const matches = [...label.matchAll(/(\d+(?:\.\d+)?)/g)].map((match) => Number(match[1]));
  const finite = matches.filter((value) => Number.isFinite(value));
  if (finite.length === 0) return null;

  return Math.max(...finite);
}

function capitalize(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
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
