import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRiverSummaryQuery } from '../api/queries';
import { RiverCard } from '../components/river-card';
import { RoutePlotMap, type RoutePlotPoint } from '../components/route-plot-map';
import { useStoredLocation } from '../hooks/use-stored-location';
import { formatRelativeTime, normalizeApiText, verdictForRating } from '../lib/format';
import { formatTravelTime } from '../lib/location';
import { isRecord, parseJson } from '../lib/storage';
import {
  buildBoardSnapshot,
  selectNearbyPicks,
  selectTopPicks,
  type NearbyRiverPick,
} from '../lib/ranking';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

type BoardMode = 'best' | 'saved' | 'nearby';
type BoardViewMode = 'list' | 'map';
type BoardItem = RiverSummaryApiItem | NearbyRiverPick;

interface BoardPreferences {
  mode: BoardMode;
  viewMode: BoardViewMode;
}

const BOARD_PREFERENCES_STORAGE_KEY = 'paddletoday:board-preferences';

const modeLabels: Record<BoardMode, string> = {
  best: 'Best',
  saved: 'Saved',
  nearby: 'Nearby',
};

export default function HomeScreen() {
  const router = useRouter();
  const summaryQuery = useRiverSummaryQuery();
  const { location, status, requestLocation, clearLocation } = useStoredLocation();
  const { savedRivers, isSaved, toggleSavedRiver } = useSavedRivers();
  const [mode, setMode] = useState<BoardMode>('best');
  const [viewMode, setViewMode] = useState<BoardViewMode>('list');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [preferencesHydrated, setPreferencesHydrated] = useState(false);

  const rivers = summaryQuery.data?.rivers ?? [];
  const snapshot = buildBoardSnapshot(rivers);
  const savedRiverLookup = useMemo(
    () => new Map(savedRivers.map((river) => [river.slug, river])),
    [savedRivers]
  );
  const topPicks = useMemo(() => selectTopPicks(rivers, 12), [rivers]);
  const nearbyPicks = useMemo(
    () => (location ? selectNearbyPicks(rivers, location, 12) : []),
    [rivers, location]
  );
  const savedPicks = useMemo(
    () =>
      rivers
        .filter((river) => savedRiverLookup.has(river.river.slug))
        .sort((left, right) =>
          (savedRiverLookup.get(right.river.slug)?.savedAt ?? '').localeCompare(
            savedRiverLookup.get(left.river.slug)?.savedAt ?? ''
          )
        ),
    [rivers, savedRiverLookup]
  );

  const data = mode === 'nearby' ? nearbyPicks : mode === 'saved' ? savedPicks : topPicks;
  const headline = data[0] ?? topPicks[0] ?? null;
  const selectedRiver = data.find((river) => river.river.slug === selectedSlug) ?? data[0] ?? null;

  useEffect(() => {
    void hydrateBoardPreferences();
  }, []);

  useEffect(() => {
    if (!preferencesHydrated) {
      return;
    }

    void AsyncStorage.setItem(
      BOARD_PREFERENCES_STORAGE_KEY,
      JSON.stringify({ mode, viewMode })
    );
  }, [mode, preferencesHydrated, viewMode]);

  useEffect(() => {
    if (data.length === 0) {
      setSelectedSlug(null);
      return;
    }

    if (!selectedSlug || !data.some((river) => river.river.slug === selectedSlug)) {
      setSelectedSlug(data[0].river.slug);
    }
  }, [data, selectedSlug]);

  if (summaryQuery.isLoading && rivers.length === 0) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.stateTitle}>Loading river board</Text>
        <Text style={styles.stateBody}>Getting the latest launch calls.</Text>
      </View>
    );
  }

  if (summaryQuery.isError && rivers.length === 0) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.stateTitle}>The board did not load.</Text>
        <Text style={styles.stateBody}>Pull down to retry when the connection is back.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.listContent}
      data={viewMode === 'list' ? data : []}
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
          <BoardHeader
            freshness={formatRelativeTime(summaryQuery.data?.generatedAt)}
            headline={headline}
            snapshot={snapshot}
          />
          <LocationStrip
            locationLabel={location?.label ?? null}
            status={status}
            onUseLocation={() => void requestLocation()}
            onClear={() => void clearLocation()}
          />
          <ModeTabs
            mode={mode}
            counts={{
              best: topPicks.length,
              saved: savedPicks.length,
              nearby: location ? nearbyPicks.length : 0,
            }}
            onChange={setMode}
          />
          <ViewToggle mode={viewMode} onChange={setViewMode} />
          <BoardIntro mode={mode} locationLabel={location?.label ?? null} />
          {viewMode === 'map' ? (
            <HomeMapPanel
              data={data}
              selectedRiver={selectedRiver}
              selectedSlug={selectedSlug}
              userLocation={location}
              onSelectSlug={setSelectedSlug}
              isSaved={isSaved}
              onToggleSaved={(river) => void toggleSavedRiver(toSavedRiver(river))}
              onOpenRoute={(slug) => router.push({ pathname: '/river/[slug]', params: { slug } })}
            />
          ) : null}
        </View>
      }
      ListEmptyComponent={<EmptyMode mode={mode} hasLocation={Boolean(location)} />}
      renderItem={({ item }) => (
        <RiverCard
          river={item}
          travelLabel={isNearbyPick(item) ? formatTravelTime(item.travelMinutes) : undefined}
          saved={isSaved(item.river.slug)}
          onToggleSaved={() => void toggleSavedRiver(toSavedRiver(item))}
          onPress={() => router.push({ pathname: '/river/[slug]', params: { slug: item.river.slug } })}
        />
      )}
    />
  );

  async function hydrateBoardPreferences() {
    try {
      const parsed = parseJson(await AsyncStorage.getItem(BOARD_PREFERENCES_STORAGE_KEY));
      if (isBoardPreferences(parsed)) {
        setMode(parsed.mode);
        setViewMode(parsed.viewMode);
      }
    } catch {
      // Keep the default board if local preferences are unavailable.
    } finally {
      setPreferencesHydrated(true);
    }
  }
}

function BoardHeader({
  freshness,
  headline,
  snapshot,
}: {
  freshness: string;
  headline: BoardItem | null;
  snapshot: ReturnType<typeof buildBoardSnapshot>;
}) {
  return (
    <View style={styles.boardHeader}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.appName}>Paddle Today</Text>
          <Text style={styles.freshness}>{freshness}</Text>
        </View>
        <View style={styles.liveBadge}>
          <Text style={styles.liveBadgeText}>{snapshot.paddleable} ready</Text>
        </View>
      </View>

      {headline ? (
        <View style={styles.headlineRow}>
          <View style={styles.scoreOrb}>
            <Text style={styles.scoreValue}>{headline.score}</Text>
            <Text style={styles.scoreLabel}>{headline.rating}</Text>
          </View>
          <View style={styles.headlineCopy}>
            <Text style={styles.headlineKicker}>Best read now</Text>
            <Text style={styles.headlineName}>{headline.river.name}</Text>
            <Text style={styles.headlineText} numberOfLines={2}>
              {verdictForRating(headline.rating)} - {normalizeApiText(headline.summary.shortExplanation)}
            </Text>
          </View>
        </View>
      ) : null}

      <View style={styles.snapshotRow}>
        <SnapshotPill label="Good+" value={snapshot.paddleable} tone={styles.snapshotStrong} />
        <SnapshotPill label="Watch" value={snapshot.watch} tone={styles.snapshotFair} />
        <SnapshotPill label="Skip" value={snapshot.skip} tone={styles.snapshotNoGo} />
      </View>
    </View>
  );
}

function LocationStrip({
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
  const isRequesting = status === 'requesting';

  return (
    <View style={styles.locationStrip}>
      <View style={styles.locationCopy}>
        <Text style={styles.locationLabel}>{locationLabel ? 'Current area' : 'Nearby picks'}</Text>
        <Text style={styles.locationValue} numberOfLines={1}>
          {locationLabel ?? (status === 'denied' ? 'Location access denied' : 'Use location for drive-aware picks')}
        </Text>
      </View>
      <Pressable
        style={[styles.locationButton, isRequesting ? styles.locationButtonDisabled : null]}
        disabled={isRequesting}
        onPress={locationLabel ? onClear : onUseLocation}
        android_ripple={{ color: colors.accentSoft }}
      >
        <Text style={styles.locationButtonText}>
          {locationLabel ? 'Clear' : isRequesting ? 'Finding' : 'Use'}
        </Text>
      </Pressable>
    </View>
  );
}

function ModeTabs({
  mode,
  counts,
  onChange,
}: {
  mode: BoardMode;
  counts: Record<BoardMode, number>;
  onChange: (mode: BoardMode) => void;
}) {
  return (
    <View style={styles.modeTabs}>
      {(['best', 'saved', 'nearby'] as const).map((item) => {
        const active = item === mode;
        return (
          <Pressable
            key={item}
            style={[styles.modeTab, active ? styles.modeTabActive : null]}
            onPress={() => onChange(item)}
            android_ripple={{ color: colors.border, borderless: true }}
          >
            <Text style={[styles.modeTabText, active ? styles.modeTabTextActive : null]}>
              {modeLabels[item]}
            </Text>
            <Text style={[styles.modeCount, active ? styles.modeCountActive : null]}>{counts[item]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function ViewToggle({
  mode,
  onChange,
}: {
  mode: BoardViewMode;
  onChange: (mode: BoardViewMode) => void;
}) {
  return (
    <View style={styles.viewToggle}>
      {(['list', 'map'] as const).map((item) => {
        const active = item === mode;
        return (
          <Pressable
            key={item}
            style={[styles.viewToggleButton, active ? styles.viewToggleButtonActive : null]}
            onPress={() => onChange(item)}
            android_ripple={{ color: colors.border, borderless: true }}
          >
            <Text style={[styles.viewToggleText, active ? styles.viewToggleTextActive : null]}>
              {item === 'list' ? 'List' : 'Map'}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function HomeMapPanel({
  data,
  selectedRiver,
  selectedSlug,
  userLocation,
  onSelectSlug,
  isSaved,
  onToggleSaved,
  onOpenRoute,
}: {
  data: BoardItem[];
  selectedRiver: BoardItem | null;
  selectedSlug: string | null;
  userLocation: { latitude: number; longitude: number; label: string } | null;
  onSelectSlug: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  onToggleSaved: (river: BoardItem) => void;
  onOpenRoute: (slug: string) => void;
}) {
  const points = useMemo<RoutePlotPoint[]>(
    () =>
      data.map((river) => ({
        id: river.river.slug,
        label: river.river.name,
        latitude: river.river.latitude,
        longitude: river.river.longitude,
        score: river.score,
        rating: river.rating,
        meta: [
          river.river.reach,
          isNearbyPick(river) ? formatTravelTime(river.travelMinutes) : river.river.region,
        ]
          .filter(Boolean)
          .join(' - '),
      })),
    [data]
  );

  if (data.length === 0) {
    return null;
  }

  return (
    <View style={styles.mapStack}>
      <RoutePlotMap
        points={points}
        selectedId={selectedSlug}
        userLocation={userLocation}
        onSelectPoint={(point) => onSelectSlug(point.id)}
      />
      {selectedRiver ? (
        <View style={styles.selectedCardWrap}>
          <Text style={styles.selectedCardLabel}>Selected route</Text>
          <RiverCard
            river={selectedRiver}
            travelLabel={isNearbyPick(selectedRiver) ? formatTravelTime(selectedRiver.travelMinutes) : undefined}
            saved={isSaved(selectedRiver.river.slug)}
            onToggleSaved={() => onToggleSaved(selectedRiver)}
            onPress={() => onOpenRoute(selectedRiver.river.slug)}
          />
        </View>
      ) : null}
    </View>
  );
}

function BoardIntro({ mode, locationLabel }: { mode: BoardMode; locationLabel: string | null }) {
  const copy =
    mode === 'saved'
      ? 'Your repeat routes, sorted by most recently saved.'
      : mode === 'nearby'
        ? locationLabel
          ? `Drive-aware picks from ${locationLabel}.`
          : 'Turn on location to fill this list.'
        : 'Live reads sorted by data status, confidence, then score.';

  return (
    <View style={styles.boardIntro}>
      <Text style={styles.boardIntroTitle}>{modeLabels[mode]} rivers</Text>
      <Text style={styles.boardIntroCopy}>{copy}</Text>
    </View>
  );
}

function EmptyMode({ mode, hasLocation }: { mode: BoardMode; hasLocation: boolean }) {
  const message =
    mode === 'saved'
      ? 'Save rivers from any card or detail screen to build a faster repeat-trip list.'
      : mode === 'nearby' && !hasLocation
        ? 'Use location above to show routes within a practical day-trip range.'
        : 'No routes match this view right now.';

  return (
    <View style={styles.emptyCard}>
      <Text style={styles.emptyTitle}>Nothing here yet</Text>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

function SnapshotPill({ label, value, tone }: { label: string; value: number; tone: object }) {
  return (
    <View style={[styles.snapshotPill, tone]}>
      <Text style={styles.snapshotValue}>{value}</Text>
      <Text style={styles.snapshotLabel}>{label}</Text>
    </View>
  );
}

function toSavedRiver(river: BoardItem) {
  return {
    slug: river.river.slug,
    riverId: river.river.riverId,
    name: river.river.name,
    reach: river.river.reach,
  };
}

function isNearbyPick(river: BoardItem): river is NearbyRiverPick {
  return 'travelMinutes' in river;
}

function isBoardPreferences(value: unknown): value is BoardPreferences {
  return isRecord(value) && isBoardMode(value.mode) && isBoardViewMode(value.viewMode);
}

function isBoardMode(value: unknown): value is BoardMode {
  return value === 'best' || value === 'saved' || value === 'nearby';
}

function isBoardViewMode(value: unknown): value is BoardViewMode {
  return value === 'list' || value === 'map';
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  listContent: {
    padding: spacing.md,
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
  headerStack: {
    gap: spacing.sm,
  },
  boardHeader: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  appName: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  freshness: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  liveBadge: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  liveBadgeText: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '800',
  },
  headlineRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },
  scoreOrb: {
    width: 66,
    height: 66,
    borderRadius: 19,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    color: colors.accentDeep,
    fontSize: 28,
    fontWeight: '900',
  },
  scoreLabel: {
    color: colors.accentDeep,
    fontSize: 10,
    fontWeight: '800',
  },
  headlineCopy: {
    flex: 1,
    gap: 2,
  },
  headlineKicker: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  headlineName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  headlineText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  snapshotRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  snapshotPill: {
    flex: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  snapshotStrong: {
    backgroundColor: '#E0EFE9',
  },
  snapshotFair: {
    backgroundColor: '#F3E8CC',
  },
  snapshotNoGo: {
    backgroundColor: '#F2DDD6',
  },
  snapshotValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  snapshotLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  locationStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  locationCopy: {
    flex: 1,
  },
  locationLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  locationValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  locationButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
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
  modeTabs: {
    flexDirection: 'row',
    backgroundColor: colors.canvasMuted,
    borderRadius: radius.pill,
    padding: 4,
    gap: 4,
  },
  modeTab: {
    flex: 1,
    minHeight: 42,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  modeTabActive: {
    backgroundColor: colors.surfaceStrong,
  },
  modeTabText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '800',
  },
  modeTabTextActive: {
    color: colors.text,
  },
  modeCount: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
  },
  modeCountActive: {
    color: colors.accentDeep,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: colors.canvasMuted,
    borderRadius: radius.pill,
    padding: 4,
    gap: 4,
  },
  viewToggleButton: {
    flex: 1,
    minHeight: 38,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewToggleButtonActive: {
    backgroundColor: colors.accent,
  },
  viewToggleText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  viewToggleTextActive: {
    color: colors.surfaceStrong,
  },
  mapStack: {
    gap: spacing.sm,
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
  boardIntro: {
    paddingHorizontal: 2,
    gap: 2,
  },
  boardIntroTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  boardIntroCopy: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  emptyCard: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
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
    textAlign: 'center',
    lineHeight: 20,
  },
});
