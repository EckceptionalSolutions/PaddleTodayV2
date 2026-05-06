import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRiverSummaryQuery } from '../api/queries';
import { RatingPill } from '../components/rating-pill';
import { SaveToggleButton } from '../components/save-toggle-button';
import { useStoredLocation } from '../hooks/use-stored-location';
import { resolveApiBaseUrl, resolveApiUrl } from '../lib/api-base-url';
import { normalizeApiText, verdictForRating } from '../lib/format';
import { formatTravelTime } from '../lib/location';
import { isRecord, parseJson } from '../lib/storage';
import { routeFactItems, routeFactLine } from '../lib/route-facts';
import {
  buildBoardSnapshot,
  selectBestNowPicks,
  selectNearbyPicks,
  type NearbyRiverPick,
} from '../lib/ranking';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

type BoardMode = 'best' | 'closest' | 'score' | 'certain';
type BoardItem = RiverSummaryApiItem | NearbyRiverPick;

interface BoardPreferences {
  mode: BoardMode;
}

const BOARD_PREFERENCES_STORAGE_KEY = 'paddletoday:board-preferences';

const modeLabels: Record<BoardMode, string> = {
  best: 'Recommended',
  closest: 'Closest',
  score: 'Score',
  certain: 'Most certain',
};

export default function HomeScreen() {
  const router = useRouter();
  const summaryQuery = useRiverSummaryQuery();
  const { location, status, requestLocation, clearLocation } = useStoredLocation();
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const [mode, setMode] = useState<BoardMode>('best');
  const [preferencesHydrated, setPreferencesHydrated] = useState(false);

  const rivers = summaryQuery.data?.rivers ?? [];
  const snapshot = buildBoardSnapshot(rivers);
  const bestPicks = useMemo(() => selectBestNowPicks(rivers, location, 12), [rivers, location]);
  const nearbyPicks = useMemo(
    () => (location ? selectNearbyPicks(rivers, location, rivers.length) : []),
    [rivers, location]
  );
  const scorePicks = useMemo(
    () => [...rivers].sort(compareHomeScore).slice(0, 12),
    [rivers]
  );
  const certainPicks = useMemo(
    () => [...rivers].sort(compareHomeCertainty).slice(0, 12),
    [rivers]
  );
  const closestPicks = useMemo(
    () => nearbyPicks.slice().sort((left, right) => left.travelMinutes - right.travelMinutes).slice(0, 12),
    [nearbyPicks]
  );

  const data = mode === 'closest' ? closestPicks : mode === 'score' ? scorePicks : mode === 'certain' ? certainPicks : bestPicks;
  const headline = data[0] ?? bestPicks[0] ?? null;

  useEffect(() => {
    void hydrateBoardPreferences();
  }, []);

  useEffect(() => {
    if (!preferencesHydrated) {
      return;
    }

    void AsyncStorage.setItem(
      BOARD_PREFERENCES_STORAGE_KEY,
      JSON.stringify({ mode })
    );
  }, [mode, preferencesHydrated]);

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
        <Text style={styles.stateMeta} numberOfLines={3}>
          {errorDetailForSummaryQuery(summaryQuery.error)}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.listContent}
      refreshControl={
        <RefreshControl
          tintColor={colors.accent}
          refreshing={summaryQuery.isRefetching}
          onRefresh={() => summaryQuery.refetch()}
        />
      }
    >
      <View style={styles.headerStack}>
        <BoardHero
          headline={headline}
          snapshot={snapshot}
          saved={headline ? isSaved(headline.river.slug) : false}
          onToggleSaved={
            headline
              ? () => void toggleSavedRiver(toSavedRiver(headline))
              : undefined
          }
          onOpen={
            headline
              ? () => router.push({ pathname: '/river/[slug]', params: { slug: headline.river.slug } })
              : undefined
          }
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
            best: bestPicks.length,
            closest: location ? closestPicks.length : 0,
            score: scorePicks.length,
            certain: certainPicks.length,
          }}
          hasLocation={Boolean(location)}
          onChange={setMode}
        />
        <BoardIntro mode={mode} locationLabel={location?.label ?? null} />
      </View>

      {data.length > 0 ? (
        <>
          <RiverCarousel
            mode={mode}
            rivers={data}
            isSaved={isSaved}
            onToggleSaved={(river) => void toggleSavedRiver(toSavedRiver(river))}
            onOpen={(river) => router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug } })}
          />
          <QuickScanList
            mode={mode}
            rivers={data.slice(0, 5)}
            isSaved={isSaved}
            onToggleSaved={(river) => void toggleSavedRiver(toSavedRiver(river))}
            onOpen={(river) => router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug } })}
          />
        </>
      ) : (
        <EmptyMode mode={mode} hasLocation={Boolean(location)} />
      )}
    </ScrollView>
  );

  async function hydrateBoardPreferences() {
    try {
      const parsed = parseJson(await AsyncStorage.getItem(BOARD_PREFERENCES_STORAGE_KEY));
      if (isBoardPreferences(parsed)) {
        setMode(parsed.mode);
      }
    } catch {
      // Keep the default board if local preferences are unavailable.
    } finally {
      setPreferencesHydrated(true);
    }
  }
}

function BoardHero({
  headline,
  snapshot,
  saved,
  onToggleSaved,
  onOpen,
}: {
  headline: BoardItem | null;
  snapshot: ReturnType<typeof buildBoardSnapshot>;
  saved: boolean;
  onToggleSaved?: () => void;
  onOpen?: () => void;
}) {
  const imageUri = headline ? photoForRiver(headline) : resolveApiUrl(placeholderImages[0]);

  return (
    <View style={styles.heroShell}>
      <ImageBackground source={{ uri: imageUri }} style={styles.heroImage} imageStyle={styles.heroImageRadius}>
        <View style={styles.heroOverlay}>
          <View style={styles.topBar}>
            <View>
              <Text style={styles.appName}>Today</Text>
              <Text style={styles.freshness}>Score, confidence, drive time</Text>
            </View>
            <View style={styles.liveBadge}>
              <Text style={styles.liveBadgeText}>{snapshot.paddleable} ready</Text>
            </View>
          </View>

          {headline ? (
            <Pressable style={styles.heroContent} onPress={onOpen} android_ripple={{ color: 'rgba(255,255,255,0.16)' }}>
              <View style={styles.heroScoreRow}>
                <View style={styles.scoreOrb}>
                  <Text style={styles.scoreValue}>{headline.score}</Text>
                  <Text style={styles.scoreLabel}>{headline.rating}</Text>
                </View>
                {onToggleSaved ? <SaveToggleButton compact saved={saved} onPress={onToggleSaved} /> : null}
              </View>
              <View style={styles.headlineCopy}>
                <Text style={styles.headlineKicker}>Recommended today</Text>
                <Text style={styles.headlineName}>{headline.river.name}</Text>
                <Text style={styles.headlineReach} numberOfLines={1}>{headline.river.reach}</Text>
                <Text style={styles.headlineText} numberOfLines={2}>
                  {verdictForRating(headline.rating)} - {normalizeApiText(headline.summary.shortExplanation)}
                </Text>
              </View>
            </Pressable>
          ) : null}
        </View>
      </ImageBackground>

      <View style={styles.snapshotRow}>
        <SnapshotPill label="Good+" value={snapshot.paddleable} tone={styles.snapshotStrong} />
        <SnapshotPill label="Watch" value={snapshot.watch} tone={styles.snapshotFair} />
        <SnapshotPill label="Skip" value={snapshot.skip} tone={styles.snapshotNoGo} />
      </View>
    </View>
  );
}

function RiverCarousel({
  mode,
  rivers,
  isSaved,
  onToggleSaved,
  onOpen,
}: {
  mode: BoardMode;
  rivers: BoardItem[];
  isSaved: (slug: string) => boolean;
  onToggleSaved: (river: BoardItem) => void;
  onOpen: (river: BoardItem) => void;
}) {
  return (
    <View style={styles.sectionStack}>
      <SectionHeading title="Choose your water" subtitle={sectionSubtitleForMode(mode)} />
      <ScrollView
        key={mode}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselTrack}
        snapToInterval={278}
        decelerationRate="fast"
      >
        {rivers.map((river) => (
          <RiverImageCard
            key={river.river.slug}
            river={river}
            saved={isSaved(river.river.slug)}
            onToggleSaved={() => onToggleSaved(river)}
            onOpen={() => onOpen(river)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function RiverImageCard({
  river,
  saved,
  onToggleSaved,
  onOpen,
}: {
  river: BoardItem;
  saved: boolean;
  onToggleSaved: () => void;
  onOpen: () => void;
}) {
  return (
    <Pressable style={styles.imageCard} onPress={onOpen} android_ripple={{ color: colors.canvasMuted }}>
      <ImageBackground
        source={{ uri: photoForRiver(river) }}
        style={styles.imageCardMedia}
        imageStyle={styles.imageCardImage}
      >
        <View style={styles.imageCardOverlay}>
          <View style={styles.imageCardTop}>
            <View style={styles.imageScore}>
              <Text style={styles.imageScoreValue}>{river.score}</Text>
            </View>
            <SaveToggleButton compact saved={saved} onPress={onToggleSaved} />
          </View>
          <View style={styles.imageCardCopy}>
            <RatingPill rating={river.rating} />
            <Text style={styles.imageCardTitle} numberOfLines={1}>{river.river.name}</Text>
            <Text style={styles.imageCardMeta} numberOfLines={1}>
              {[river.river.reach, travelLabelForRiver(river)].filter(Boolean).join(' - ')}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.imageCardBody}>
        <Text style={styles.imageCardReason} numberOfLines={2}>
          {normalizeApiText(river.summary.shortExplanation)}
        </Text>
        <View style={styles.imageCardFooter}>
          {homeFactItems(river).slice(0, 3).map((fact) => (
            <Text key={fact} style={styles.homeFactChip} numberOfLines={1}>{fact}</Text>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

function QuickScanList({
  mode,
  rivers,
  isSaved,
  onToggleSaved,
  onOpen,
}: {
  mode: BoardMode;
  rivers: BoardItem[];
  isSaved: (slug: string) => boolean;
  onToggleSaved: (river: BoardItem) => void;
  onOpen: (river: BoardItem) => void;
}) {
  return (
    <View style={styles.sectionStack}>
      <SectionHeading title="Fast scan" subtitle={quickScanSubtitleForMode(mode)} />
      <View key={mode} style={styles.quickList}>
        {rivers.map((river) => (
          <CompactRiverRow
            key={river.river.slug}
            river={river}
            saved={isSaved(river.river.slug)}
            onToggleSaved={() => onToggleSaved(river)}
            onOpen={() => onOpen(river)}
          />
        ))}
      </View>
    </View>
  );
}

function CompactRiverRow({
  river,
  saved,
  onToggleSaved,
  onOpen,
}: {
  river: BoardItem;
  saved: boolean;
  onToggleSaved: () => void;
  onOpen: () => void;
}) {
  return (
    <Pressable style={styles.quickRow} onPress={onOpen} android_ripple={{ color: colors.canvasMuted }}>
      <View style={styles.quickThumb}>
        <ImageBackground source={{ uri: photoForRiver(river) }} style={styles.quickThumbImage} imageStyle={styles.quickThumbRadius}>
          <View style={styles.quickScore}>
            <Text style={styles.quickScoreText}>{river.score}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.quickCopy}>
        <Text style={styles.quickName} numberOfLines={1}>{river.river.name}</Text>
        <Text style={styles.quickMeta} numberOfLines={1}>
          {[river.river.reach, travelLabelForRiver(river)].filter(Boolean).join(' - ')}
        </Text>
        <Text style={styles.quickReason} numberOfLines={1}>{homeFactLine(river)}</Text>
      </View>
      <View style={styles.quickActions}>
        <RatingPill rating={river.rating} />
        <SaveToggleButton compact saved={saved} onPress={onToggleSaved} />
      </View>
    </Pressable>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
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
  hasLocation,
  onChange,
}: {
  mode: BoardMode;
  counts: Record<BoardMode, number>;
  hasLocation: boolean;
  onChange: (mode: BoardMode) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.modeTabs}
    >
      {(['best', 'closest', 'score', 'certain'] as const).map((item) => {
        const active = item === mode;
        const disabled = item === 'closest' && !hasLocation;
        return (
          <Pressable
            key={item}
            style={[styles.modeTab, active ? styles.modeTabActive : null, disabled ? styles.modeTabDisabled : null]}
            disabled={disabled}
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
    </ScrollView>
  );
}

function BoardIntro({ mode, locationLabel }: { mode: BoardMode; locationLabel: string | null }) {
  const copy =
    mode === 'closest'
        ? locationLabel
          ? `Shortest drives from ${locationLabel}.`
          : 'Turn on location to sort by closest launch.'
        : mode === 'score'
          ? 'Highest scores first, regardless of drive time.'
          : mode === 'certain'
            ? 'High-confidence calls first, then score.'
            : locationLabel
              ? `Score, confidence, and drive time from ${locationLabel}.`
              : 'Score and confidence first. Turn on location to include drive time.';

  return (
    <View style={styles.boardIntro}>
      <Text style={styles.boardIntroTitle}>{modeLabels[mode]} rivers</Text>
      <Text style={styles.boardIntroCopy}>{copy}</Text>
    </View>
  );
}

function EmptyMode({ mode, hasLocation }: { mode: BoardMode; hasLocation: boolean }) {
  const message =
    mode === 'closest' && !hasLocation
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

function travelLabelForRiver(river: BoardItem) {
  return isNearbyPick(river) ? formatTravelTime(river.travelMinutes) : river.river.region;
}

const routeGalleryImages: Record<string, string[]> = {
  'blue-earth-river-rapidan-county-road-90': [
    '/gallery/blue-earth-river-rapidan-county-road-90/blue-earth-mankato.jpg',
  ],
  'rice-creek-peltier-to-long-lake': [
    '/gallery/rice-creek-peltier-to-long-lake/rice-creek-1.jpg',
    '/gallery/rice-creek-peltier-to-long-lake/rice-creek-2.jpg',
  ],
  'minnehaha-creek-grays-bay-longfellow-lagoon': [
    '/gallery/minnehaha-creek-grays-bay-longfellow-lagoon/minnehaha-creek-oct-2017.jpg',
  ],
  'minnesota-river-judson-land-of-memories': [
    '/gallery/minnesota-river-judson-land-of-memories/land-of-memories-park.jpg',
  ],
  'cannon-river-welch': [
    '/gallery/cannon-river-welch/cannon-welch.jpg',
  ],
  'cannon-river-faribault-dundas': [
    '/gallery/cannon-river-faribault-dundas/cannon-northfield.jpg',
  ],
  'kettle-river-lower-kettle-5-to-6': [
    '/gallery/kettle-river-lower-kettle-5-to-6/kettle-banning-state-park.jpg',
  ],
  'root-river-lanesboro-peterson': [
    '/gallery/root-river-lanesboro-peterson/root-near-peterson.jpg',
  ],
  'root-river-rushford-houston': [
    '/gallery/root-river-rushford-houston/root-river-houston.jpg',
  ],
  'st-croix-river-fox-highway-70': [
    '/gallery/st-croix-river-fox-highway-70/vantage.jpg',
    '/gallery/st-croix-river-fox-highway-70/bluffs-with-branches.jpg',
    '/gallery/st-croix-river-fox-highway-70/lower-lake.jpg',
  ],
  'namekagon-river-big-bend-trego': [
    '/gallery/namekagon-river-big-bend-trego/namekagon-mirror.jpg',
  ],
  'mississippi-river-east-river-flats-hidden-falls': [
    '/gallery/mississippi-river-east-river-flats-hidden-falls/minneapolis-skyline.jpg',
  ],
  'minnesota-river-henderson-belle-plaine': [
    '/gallery/minnesota-river-henderson-belle-plaine/minnesota-valley-refuge.jpg',
  ],
  'kickapoo-river-ontario-rockton': [
    '/gallery/kickapoo-river-ontario-rockton/kickapoo-river-valley.jpg',
  ],
  'wisconsin-river-muscoda-blue-river': [
    '/gallery/wisconsin-river-muscoda-blue-river/wisconsin-river-muscoda-nara.jpg',
  ],
  'milwaukee-river-newburg-fredonia': [
    '/gallery/milwaukee-river-newburg-fredonia/milwaukee-river-january-2026.jpg',
  ],
};

const placeholderImages = [
  '/gallery/fallbacks/river-fallback-stream.jpg',
  '/gallery/fallbacks/river-fallback-wide.jpg',
  '/gallery/fallbacks/river-fallback-marsh.jpg',
];

function photoForRiver(river: BoardItem) {
  const key = `${river.river.riverId}:${river.river.slug}`;
  const routeImages = routeGalleryImages[river.river.slug];
  const images = routeImages?.length ? routeImages : placeholderImages;
  let hash = 0;
  for (let index = 0; index < key.length; index += 1) {
    hash = (hash * 31 + key.charCodeAt(index)) % images.length;
  }
  return resolveApiUrl(images[hash]);
}

function isBoardPreferences(value: unknown): value is BoardPreferences {
  return isRecord(value) && isBoardMode(value.mode);
}

function isBoardMode(value: unknown): value is BoardMode {
  return value === 'best' || value === 'closest' || value === 'score' || value === 'certain';
}

const homeConfidenceWeight = {
  High: 3,
  Medium: 2,
  Low: 1,
};

function compareHomeScore(left: RiverSummaryApiItem, right: RiverSummaryApiItem) {
  if (left.score !== right.score) {
    return right.score - left.score;
  }

  return left.river.name.localeCompare(right.river.name);
}

function compareHomeCertainty(left: RiverSummaryApiItem, right: RiverSummaryApiItem) {
  const leftConfidence = homeConfidenceWeight[left.confidence.label] ?? 0;
  const rightConfidence = homeConfidenceWeight[right.confidence.label] ?? 0;
  if (leftConfidence !== rightConfidence) {
    return rightConfidence - leftConfidence;
  }

  return compareHomeScore(left, right);
}

function sectionSubtitleForMode(mode: BoardMode) {
  if (mode === 'closest') return 'Shortest practical drives first.';
  if (mode === 'score') return 'Highest condition scores first.';
  if (mode === 'certain') return 'The calls with the strongest supporting data.';
  return 'Best mix of score, confidence, and drive time.';
}

function quickScanSubtitleForMode(mode: BoardMode) {
  if (mode === 'closest') return 'Nearby routes with the facts that affect the trip.';
  if (mode === 'score') return 'Raw condition score, then route fit.';
  if (mode === 'certain') return 'Confidence first, with route facts alongside it.';
  return 'A compact recommendation list for today.';
}

function homeFactItems(river: BoardItem) {
  return routeFactItems(river.river, {
    travelMinutes: isNearbyPick(river) ? river.travelMinutes : null,
    includeNoCamping: true,
    campingAvailableLabel: 'Camping info',
  });
}

function homeFactLine(river: BoardItem) {
  return routeFactLine(river.river, {
    travelMinutes: isNearbyPick(river) ? river.travelMinutes : null,
    includeNoCamping: true,
    campingAvailableLabel: 'Camping info',
  });
}

function errorDetailForSummaryQuery(error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown request error';
  return `${resolveApiBaseUrl()} - ${message}`;
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
  heroShell: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    gap: spacing.md,
  },
  heroImage: {
    minHeight: 310,
  },
  heroImageRadius: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  heroOverlay: {
    minHeight: 310,
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: 'rgba(15, 25, 22, 0.34)',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  appName: {
    color: colors.surfaceStrong,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '900',
  },
  freshness: {
    color: 'rgba(255, 255, 255, 0.82)',
    fontSize: 12,
    marginTop: 2,
    fontWeight: '700',
  },
  liveBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  liveBadgeText: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '800',
  },
  heroContent: {
    gap: spacing.md,
  },
  heroScoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  scoreOrb: {
    width: 66,
    height: 66,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
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
    gap: 4,
  },
  headlineKicker: {
    color: 'rgba(255, 255, 255, 0.78)',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  headlineName: {
    color: colors.surfaceStrong,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '900',
  },
  headlineReach: {
    color: 'rgba(255, 255, 255, 0.86)',
    fontSize: 14,
    fontWeight: '700',
  },
  headlineText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  snapshotRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
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
    gap: spacing.sm,
    paddingRight: spacing.md,
  },
  modeTab: {
    minHeight: 38,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 14,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modeTabActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  modeTabDisabled: {
    opacity: 0.48,
  },
  modeTabText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '800',
  },
  modeTabTextActive: {
    color: colors.surfaceStrong,
  },
  modeCount: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
  },
  modeCountActive: {
    color: colors.surfaceStrong,
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
  sectionStack: {
    gap: spacing.sm,
  },
  sectionHeading: {
    paddingHorizontal: 2,
    gap: 2,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
  },
  sectionSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  carouselTrack: {
    gap: spacing.md,
    paddingRight: spacing.md,
  },
  imageCard: {
    width: 266,
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  imageCardMedia: {
    height: 190,
  },
  imageCardImage: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  imageCardOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: 'rgba(12, 22, 19, 0.28)',
  },
  imageCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  imageScore: {
    minWidth: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  imageScoreValue: {
    color: colors.accentDeep,
    fontSize: 20,
    fontWeight: '900',
  },
  imageCardCopy: {
    gap: 4,
  },
  imageCardTitle: {
    color: colors.surfaceStrong,
    fontSize: 21,
    lineHeight: 25,
    fontWeight: '900',
  },
  imageCardMeta: {
    color: 'rgba(255, 255, 255, 0.86)',
    fontSize: 12,
    fontWeight: '700',
  },
  imageCardBody: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  imageCardReason: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  imageCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  homeFactChip: {
    maxWidth: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  quickList: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  quickRow: {
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  quickThumb: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.canvasMuted,
  },
  quickThumbImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 6,
  },
  quickThumbRadius: {
    borderRadius: radius.md,
  },
  quickScore: {
    minWidth: 28,
    height: 24,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  quickScoreText: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '900',
  },
  quickCopy: {
    flex: 1,
    gap: 2,
  },
  quickName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  quickMeta: {
    color: colors.textMuted,
    fontSize: 12,
  },
  quickReason: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  quickActions: {
    alignItems: 'flex-end',
    gap: spacing.xs,
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
  stateMeta: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 17,
  },
});
