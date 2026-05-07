import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';

export type ExploreSort = 'best' | 'nearest' | 'confidence' | 'score' | 'name';

const sortOptions: Array<{ value: ExploreSort; label: string }> = [
  { value: 'best', label: 'Recommended' },
  { value: 'nearest', label: 'Nearest' },
  { value: 'confidence', label: 'Confidence' },
  { value: 'score', label: 'Score' },
  { value: 'name', label: 'A-Z' },
];

const exploreSortValues = new Set<ExploreSort>(sortOptions.map((option) => option.value));

export function isExploreSort(value: unknown): value is ExploreSort {
  return typeof value === 'string' && exploreSortValues.has(value as ExploreSort);
}

export function ExploreSearchBar({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (query: string) => void;
}) {
  return (
    <View style={styles.searchBar}>
      <MaterialCommunityIcons name="magnify" color={colors.textMuted} size={20} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search river, reach, region"
        placeholderTextColor={colors.textMuted}
        value={query}
        onChangeText={onQueryChange}
        onChange={(event) => onQueryChange(textFromInputEvent(event))}
        {...webInputProps(onQueryChange)}
        style={styles.searchInput}
        returnKeyType="search"
      />
      {query.trim() ? (
        <Pressable hitSlop={10} onPress={() => onQueryChange('')}>
          <MaterialCommunityIcons name="close-circle" color={colors.textMuted} size={18} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function ExploreSortFilterBar({
  sort,
  activeFilterCount,
  compactFilterLabel = false,
  showSortOptions = true,
  onFilterPress,
  onSortChange,
}: {
  sort: ExploreSort;
  activeFilterCount: number;
  compactFilterLabel?: boolean;
  showSortOptions?: boolean;
  onFilterPress: () => void;
  onSortChange: (sort: ExploreSort) => void;
}) {
  const filterActive = activeFilterCount > 0;

  return (
    <View style={styles.toolbar}>
      {showSortOptions ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortStrip}>
          {sortOptions.map((option) => (
            <ChoiceChip
              key={option.value}
              label={option.label}
              selected={sort === option.value}
              onPress={() => onSortChange(option.value)}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.toolbarSpacer} />
      )}
      <Pressable
        style={[styles.filterButton, filterActive ? styles.filterButtonActive : null]}
        onPress={onFilterPress}
        android_ripple={{ color: colors.canvasMuted }}
      >
        <MaterialCommunityIcons
          name="tune-variant"
          color={filterActive ? colors.surfaceStrong : colors.accent}
          size={18}
        />
        <Text style={[styles.filterButtonText, filterActive ? styles.filterButtonTextActive : null]}>
          {filterButtonLabel(activeFilterCount, compactFilterLabel)}
        </Text>
      </Pressable>
    </View>
  );
}

export function ChoiceChip({
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
      android_ripple={{ color: colors.canvasMuted }}
    >
      <Text style={[styles.choiceChipText, selected ? styles.choiceChipTextSelected : null]}>{label}</Text>
    </Pressable>
  );
}

function filterButtonLabel(activeFilterCount: number, compactFilterLabel: boolean) {
  if (activeFilterCount === 0) {
    return 'Filters';
  }

  return compactFilterLabel ? String(activeFilterCount) : `Filters ${activeFilterCount}`;
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
    // React Native Web can miss onChangeText in some nested scroll layouts.
    onInput: (event: { currentTarget?: { value?: string } }) => onText(event.currentTarget?.value ?? ''),
  };
}

const styles = StyleSheet.create({
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
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sortStrip: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  toolbarSpacer: {
    flex: 1,
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
  choiceChip: {
    minHeight: 34,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceChipSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  choiceChipText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '800',
  },
  choiceChipTextSelected: {
    color: colors.surfaceStrong,
  },
});
