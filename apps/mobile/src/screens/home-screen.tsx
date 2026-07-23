import {
  formatRouteSegmentLabel,
  routeSegmentSummary,
  type RiverSummaryApiItem,
} from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import type { ComponentProps, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRiverSummaryQuery } from '../api/queries';
import { AppErrorState, AppLoadingState, AppRefreshNotice } from '../components/app-state';
import { RatingPill, ratingColors } from '../components/rating-pill';
import { SaveToggleButton } from '../components/save-toggle-button';
import { useStoredLocation } from '../hooks/use-stored-location';
import { resolveApiBaseUrl } from '../lib/api-base-url';
import { normalizeApiText, verdictForRating } from '../lib/format';
import { formatTravelTime } from '../lib/location';
import { type ExploreIntentId } from '../lib/explore-intents';
import { photoForRiver } from '../lib/route-photos';
import { buildRouteGroupMeta, routeGroupMetaForRoute, uniqueRoutesByRiver } from '../lib/route-groups';
import { androidBottomInset } from '../lib/safe-area';
import { isRecord, parseJson } from '../lib/storage';
import { routeDecisionLine, routePreviewFactItems, routePreviewFactLine } from '../lib/route-facts';
import {
  buildBoardSnapshot,
  selectBestNowPicks,
  selectNearbyPicks,
  type NearbyRiverPick,
} from '../lib/ranking';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

const ANDROID_NAV_CONTROL_MIN_INSET = 40;
const TAB_BAR_SAFE_SPACE = 72;

type BoardMode = 'best' | 'closest' | 'score' | 'certain';
type BoardItem = RiverSummaryApiItem | NearbyRiverPick;

interface BoardPreferences {
  mode: BoardMode;
}

const BOARD_PREFERENCES_STORAGE_KEY = 'paddletoday:board-preferences';

const modeLabels: Record<BoardMode, string> = {
  best: 'Recommended',
  closest: 'Closest',
  score: 'Score ranking',
  certain: 'Confidence first',
};

const stateAbbreviations: Record<string, string> = {
  illinois: 'IL',
  indiana: 'IN',
  iowa: 'IA',
  michigan: 'MI',
  minnesota: 'MN',
  missouri: 'MO',
  'north dakota': 'ND',
  ohio: 'OH',
  'south dakota': 'SD',
  wisconsin: 'WI',
};

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomContentInset = androidBottomInset(insets.bottom, ANDROID_NAV_CONTROL_MIN_INSET);
  const summaryQuery = useRiverSummaryQuery();
  const { location, status, requestLocation } = useStoredLocation();
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const [mode, setMode] = useState<BoardMode>('best');
  const [routeQuery, setRouteQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [preferencesHydrated, setPreferencesHydrated] = useState(false);

  const rivers = summaryQuery.data?.rivers ?? [];
  const routeCounts = useMemo(() => buildRouteGroupMeta(rivers), [rivers]);
  const nearbyPicks = useMemo(
    () => (location ? selectNearbyPicks(rivers, location, rivers.length) : []),
    [rivers, location]
  );
  const scopedRoutes = location ? nearbyPicks : rivers;
  const snapshotRoutes = scopedRoutes;
  const snapshot = buildBoardSnapshot(snapshotRoutes);
  const snapshotContext = location ? `In range near ${location.label}` : 'Across available routes';
  const bestPicks = useMemo(
    () => selectBestNowPicks(scopedRoutes, undefined, 24),
    [scopedRoutes]
  );
  const scorePicks = useMemo(
    () => [...scopedRoutes].sort(compareHomeScore).slice(0, 24),
    [scopedRoutes]
  );
  const certainPicks = useMemo(
    () => [...scopedRoutes].sort(compareHomeCertainty).slice(0, 24),
    [scopedRoutes]
  );
  const closestPicks = useMemo(
    () => nearbyPicks.slice().sort((left, right) => left.travelMinutes - right.travelMinutes).slice(0, 24),
    [nearbyPicks]
  );

  const data = useMemo(
    () => uniqueRoutesByRiver(mode === 'closest' ? closestPicks : mode === 'score' ? scorePicks : mode === 'certain' ? certainPicks : bestPicks),
    [bestPicks, certainPicks, closestPicks, mode, scorePicks]
  );
  const headline = data[0] ?? uniqueRoutesByRiver(bestPicks)[0] ?? null;
  const headlineMode = data[0] ? mode : 'best';
  const knownRouteMatches = useMemo(
    () => uniqueRoutesByRiver(findKnownRouteMatches(rivers, routeQuery, 18)).slice(0, 10),
    [rivers, routeQuery]
  );
  const supportedStates = useMemo(
    () => [...new Set(rivers.map((river) => river.river.state))].sort((left, right) => left.localeCompare(right)),
    [rivers]
  );
  const locationOutOfRange = Boolean(location && rivers.length > 0 && nearbyPicks.length === 0);
  const zeroReady = !locationOutOfRange && scopedRoutes.length > 0 && snapshot.paddleable === 0;

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
      <AppLoadingState title="Loading today’s routes" body="Checking river conditions." />
    );
  }

  if (summaryQuery.isError && rivers.length === 0) {
    return (
      <AppErrorState
        title="Today’s routes did not load"
        body="Check your connection, then try again."
        detail={errorDetailForSummaryQuery(summaryQuery.error)}
        onRetry={() => summaryQuery.refetch()}
      />
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.listContent,
        {
          paddingTop: spacing.md + Math.max(insets.top, 0),
          paddingBottom: spacing.xl + TAB_BAR_SAFE_SPACE + bottomContentInset,
        },
      ]}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl
          tintColor={colors.accent}
          refreshing={summaryQuery.isRefetching}
          onRefresh={() => summaryQuery.refetch()}
        />
      }
    >
      <View style={styles.headerStack}>
        <AppRefreshNotice
          isError={summaryQuery.isRefetchError}
          dataUpdatedAt={summaryQuery.dataUpdatedAt}
          onRetry={() => void summaryQuery.refetch()}
        />
        <BoardHero
          mode={headlineMode}
          headline={headline}
          snapshot={snapshot}
          snapshotContext={snapshotContext}
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
          onOpenStatus={(statusIntent) => openExploreIntent(statusIntent)}
          hasLocation={Boolean(location)}
          locationStatus={status}
          onUseLocation={() => void requestLocation()}
          onOpenExplore={() => router.push('/explore')}
        />
        {locationOutOfRange ? (
          <OutOfRangeState
            locationLabel={location?.label ?? 'your area'}
            onRequestRoute={() => router.push('/request-route')}
            onBrowseRoutes={() => router.push('/explore')}
          />
        ) : data.length > 0 ? (
          <RiverCarousel
            mode={mode}
            rivers={data.slice(0, 10)}
            routeCounts={routeCounts}
            isSaved={isSaved}
            onToggleSaved={(river) => void toggleSavedRiver(toSavedRiver(river))}
            onOpen={openBoardRoute}
          >
            <ModeTabs
              mode={mode}
              hasLocation={Boolean(location)}
              locationStatus={status}
              onChange={(nextMode) => {
                setMode(nextMode);
                if (nextMode === 'closest' && !location) {
                  void requestLocation();
                }
              }}
            />
          </RiverCarousel>
        ) : (
          <EmptyMode mode={mode} hasLocation={Boolean(location)} locationStatus={status} />
        )}
        {zeroReady ? (
          <ZeroReadyActions
            onWeekend={() => router.push('/weekend')}
            onExplore={() => openExploreIntent('watch')}
          />
        ) : null}
        <ExploreActionStrip
          hasLocation={Boolean(location)}
          locationStatus={status}
          onUseLocation={() => void requestLocation()}
          onOpenExplore={() => router.push({ pathname: '/explore', params: { reset: '1', intentKey: Date.now().toString() } })}
          onOpenIntent={openExploreIntent}
        />
        <KnownRouteSearch
          onOpen={() => setSearchOpen(true)}
        />
      </View>
      <RouteSearchModal
        visible={searchOpen}
        query={routeQuery}
        results={knownRouteMatches}
        routeCounts={routeCounts}
        states={supportedStates}
        topInset={Math.max(insets.top, 0)}
        bottomInset={bottomContentInset}
        onChange={setRouteQuery}
        onClose={() => {
          setSearchOpen(false);
          setRouteQuery('');
        }}
        onOpenRiver={(river) => {
          setSearchOpen(false);
          setRouteQuery('');
          openBoardRoute(river);
        }}
        onExplore={() => {
          setSearchOpen(false);
          setRouteQuery('');
          router.push('/explore');
        }}
        onRequestRoute={() => {
          setSearchOpen(false);
          router.push('/request-route');
        }}
        onExploreState={(state) => {
          setSearchOpen(false);
          setRouteQuery('');
          router.push({ pathname: '/explore', params: { state, intentKey: Date.now().toString() } });
        }}
      />
    </ScrollView>
  );

  async function hydrateBoardPreferences() {
    try {
      const parsed = parseJson(await AsyncStorage.getItem(BOARD_PREFERENCES_STORAGE_KEY));
      if (isBoardPreferences(parsed)) {
        setMode(parsed.mode);
      }
    } catch {
      // Keep the default route view if local preferences are unavailable.
    } finally {
      setPreferencesHydrated(true);
    }
  }

  function openBoardRoute(river: BoardItem) {
    const routeCount = routeGroupMetaForRoute(river, routeCounts).routeCount;
    if (river.river.riverId && routeCount > 1) {
      router.push({ pathname: '/river-hub/[riverId]', params: { riverId: river.river.riverId } });
      return;
    }

    router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug } });
  }

  function openExploreIntent(intent: ExploreIntentId) {
    router.push({ pathname: '/explore', params: { intent, intentKey: Date.now().toString() } });
  }
}

function BoardHero({
  mode,
  headline,
  snapshot,
  snapshotContext,
  saved,
  onToggleSaved,
  onOpen,
  onOpenStatus,
  hasLocation,
  locationStatus,
  onUseLocation,
  onOpenExplore,
}: {
  mode: BoardMode;
  headline: BoardItem | null;
  snapshot: ReturnType<typeof buildBoardSnapshot>;
  snapshotContext: string;
  saved: boolean;
  onToggleSaved?: () => void;
  onOpen?: () => void;
  onOpenStatus: (intent: ExploreIntentId) => void;
  hasLocation: boolean;
  locationStatus: string;
  onUseLocation: () => void;
  onOpenExplore: () => void;
}) {
  const imageUri = headline ? photoForRiver(headline.river) : photoForRiver({ slug: 'fallback' });
  const requestingLocation = locationStatus === 'requesting';

  return (
    <View style={styles.heroShell}>
      <ImageBackground source={{ uri: imageUri }} style={styles.heroImage} imageStyle={styles.heroImageRadius}>
        <View style={styles.heroOverlay}>
          <View style={styles.topBar}>
            <View>
              <Text style={styles.appName}>Today</Text>
              <Text style={styles.freshness}>Score, reliability, and drive time</Text>
            </View>
            <View style={styles.liveBadge}>
              <Text style={styles.liveBadgeText}>{snapshot.paddleable} ready</Text>
            </View>
          </View>

          {!hasLocation ? (
            <View style={styles.heroContent}>
              <View style={styles.headlineCopy}>
                <Text style={styles.headlineKicker}>
                  {locationStatus === 'denied' ? 'Location is off' : "Today's strongest routes"}
                </Text>
                <Text style={styles.headlineName}>
                  {locationStatus === 'denied' ? 'Browse today, add nearby when ready' : 'Start with a strong route today'}
                </Text>
                <Text style={styles.headlineText} numberOfLines={3}>
                  {locationStatus === 'denied'
                    ? 'Today still works without location. Turn it on to see nearby routes first.'
                    : 'Add your location to see nearby routes first.'}
                </Text>
              </View>
              <View style={styles.heroActionRow}>
                <Pressable
                  style={[styles.heroPrimaryAction, requestingLocation ? styles.heroActionDisabled : null]}
                  disabled={requestingLocation}
                  onPress={onUseLocation}
                  android_ripple={{ color: colors.accentSoft }}
                >
                  <MaterialCommunityIcons name="crosshairs-gps" color={colors.accentDeep} size={18} />
                  <Text style={styles.heroPrimaryActionText}>{requestingLocation ? 'Finding' : 'Use location'}</Text>
                </Pressable>
                <Pressable style={styles.heroSecondaryAction} onPress={onOpenExplore} android_ripple={{ color: 'rgba(255,255,255,0.16)' }}>
                  <MaterialCommunityIcons name="map-search-outline" color={colors.surfaceStrong} size={18} />
                  <Text style={styles.heroSecondaryActionText}>Explore all</Text>
                </Pressable>
              </View>
            </View>
          ) : headline ? (
            <Pressable style={styles.heroContent} onPress={onOpen} android_ripple={{ color: 'rgba(255,255,255,0.16)' }}>
              <View style={styles.heroScoreRow}>
                <View style={[styles.scoreOrb, { backgroundColor: ratingColors(headline.rating).backgroundColor }]}>
                  <Text style={[styles.scoreValue, { color: ratingColors(headline.rating).textColor }]}>{headline.score}</Text>
                  <Text style={[styles.scoreLabel, { color: ratingColors(headline.rating).textColor }]}>{headline.rating}</Text>
                </View>
                {onToggleSaved ? <SaveToggleButton compact saved={saved} onPress={onToggleSaved} /> : null}
              </View>
              <View style={styles.headlineCopy}>
                <Text style={styles.headlineKicker}>{headlineLabelForMode(mode, headline)}</Text>
                <Text style={styles.headlineName}>{headline.river.name}</Text>
                <Text style={styles.headlineReach} numberOfLines={1}>{routeReachWithState(headline)}</Text>
                <Text style={styles.headlineText} numberOfLines={2}>
                  {routeDecisionLine(verdictForRating(headline.rating), headline.summary.shortExplanation)}
                </Text>
              </View>
            </Pressable>
          ) : null}
        </View>
      </ImageBackground>

      <View style={styles.snapshotSummary}>
        <Text style={styles.snapshotContext}>{snapshotContext}</Text>
        <View style={styles.snapshotRow}>
          <SnapshotPill label="Clean" value={snapshot.paddleable} tone={styles.snapshotStrong} onPress={() => onOpenStatus('clean-now')} />
          <SnapshotPill label="Watch" value={snapshot.watch} tone={styles.snapshotFair} onPress={() => onOpenStatus('watch')} />
          <SnapshotPill label="Skip" value={snapshot.skip} tone={styles.snapshotNoGo} onPress={() => onOpenStatus('skip')} />
        </View>
      </View>
    </View>
  );
}

function RiverCarousel({
  mode,
  rivers,
  routeCounts,
  isSaved,
  onToggleSaved,
  onOpen,
  children,
}: {
  mode: BoardMode;
  rivers: BoardItem[];
  routeCounts: ReadonlyMap<string, number>;
  isSaved: (slug: string) => boolean;
  onToggleSaved: (river: BoardItem) => void;
  onOpen: (river: BoardItem) => void;
  children: ReactNode;
}) {
  return (
    <View style={styles.todayCallsSection}>
      <SectionHeading
        title={boardIntroTitleForMode(mode)}
        subtitle={sectionSubtitleForMode(mode)}
      />
      {children}
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
            routeCount={routeGroupMetaForRoute(river, routeCounts).routeCount}
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
  routeCount,
  saved,
  onToggleSaved,
  onOpen,
}: {
  river: BoardItem;
  routeCount: number;
  saved: boolean;
  onToggleSaved: () => void;
  onOpen: () => void;
}) {
  return (
    <Pressable style={styles.imageCard} onPress={onOpen} android_ripple={{ color: colors.canvasMuted }}>
      <ImageBackground
        source={{ uri: photoForRiver(river.river) }}
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
              {[routeReachWithState(river), distanceLabelForRiver(river), routeCount > 1 ? `${routeCount} routes` : null].filter(Boolean).join(' - ')}
            </Text>
            {routeSegmentSummary(river.river) ? (
              <Text style={styles.imageCardSegment} numberOfLines={1}>
                {formatRouteSegmentLabel(routeSegmentSummary(river.river), null)}
              </Text>
            ) : null}
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
  routeCounts,
  isSaved,
  onToggleSaved,
  onOpen,
  onViewAll,
}: {
  mode: BoardMode;
  rivers: BoardItem[];
  routeCounts: ReadonlyMap<string, number>;
  isSaved: (slug: string) => boolean;
  onToggleSaved: (river: BoardItem) => void;
  onOpen: (river: BoardItem) => void;
  onViewAll: () => void;
}) {
  return (
    <View style={styles.sectionStack}>
      <SectionHeading
        title={boardIntroTitleForMode(mode)}
        subtitle={sectionSubtitleForMode(mode)}
        actionLabel="View all"
        onAction={onViewAll}
      />
      <View key={mode} style={styles.quickList}>
        {rivers.map((river) => (
          <CompactRiverRow
            key={river.river.slug}
            river={river}
            routeCount={routeGroupMetaForRoute(river, routeCounts).routeCount}
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
  routeCount,
  saved,
  onToggleSaved,
  onOpen,
}: {
  river: BoardItem;
  routeCount: number;
  saved: boolean;
  onToggleSaved: () => void;
  onOpen: () => void;
}) {
  return (
    <Pressable style={styles.quickRow} onPress={onOpen} android_ripple={{ color: colors.canvasMuted }}>
      <View style={styles.quickThumb}>
        <ImageBackground source={{ uri: photoForRiver(river.river) }} style={styles.quickThumbImage} imageStyle={styles.quickThumbRadius}>
          <View style={styles.quickScore}>
            <Text style={styles.quickScoreText}>{river.score}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.quickCopy}>
        <Text style={styles.quickName} numberOfLines={1}>{river.river.name}</Text>
        <Text style={styles.quickMeta} numberOfLines={1}>
          {[routeReachWithState(river), distanceLabelForRiver(river), routeCount > 1 ? `${routeCount} routes` : null].filter(Boolean).join(' - ')}
        </Text>
        {routeSegmentSummary(river.river) ? (
          <Text style={styles.quickSegment} numberOfLines={1}>
            {formatRouteSegmentLabel(routeSegmentSummary(river.river), null)}
          </Text>
        ) : null}
        <Text style={styles.quickReason} numberOfLines={1}>{homeFactLine(river)}</Text>
      </View>
      <View style={styles.quickActions}>
        <RatingPill rating={river.rating} />
        <SaveToggleButton compact saved={saved} onPress={onToggleSaved} />
      </View>
    </Pressable>
  );
}

function SectionHeading({
  title,
  subtitle,
  actionLabel,
  onAction,
}: {
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeading}>
      <View style={styles.sectionHeadingTop}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {actionLabel && onAction ? (
          <Pressable style={styles.sectionAction} onPress={onAction} android_ripple={{ color: colors.canvasMuted }}>
            <MaterialCommunityIcons name="map-outline" color={colors.accent} size={15} />
            <Text style={styles.sectionActionText}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
    </View>
  );
}

function ExploreActionStrip({
  hasLocation,
  locationStatus,
  onUseLocation,
  onOpenExplore,
  onOpenIntent,
}: {
  hasLocation: boolean;
  locationStatus: string;
  onUseLocation: () => void | Promise<void>;
  onOpenExplore: () => void;
  onOpenIntent: (intent: ExploreIntentId) => void;
}) {
  const requestingLocation = locationStatus === 'requesting';
  const nearbyLabel = requestingLocation ? 'Finding nearby' : 'Best nearby';

  return (
    <View style={styles.exploreActions}>
      <View style={styles.exploreActionsHeader}>
        <Text style={styles.exploreActionsTitle}>Plan a paddle</Text>
        <Text style={styles.exploreActionsSubtitle}>Choose a view.</Text>
      </View>
      <View style={styles.exploreActionGrid}>
        <ExploreActionChip
          label={nearbyLabel}
          icon="crosshairs-gps"
          disabled={requestingLocation}
          onPress={hasLocation ? () => onOpenIntent('best-nearby') : () => {
            void Promise.resolve(onUseLocation()).finally(() => onOpenIntent('best-nearby'));
          }}
        />
        <ExploreActionChip label="Clean now" icon="check-circle-outline" onPress={() => onOpenIntent('clean-now')} />
        <ExploreActionChip label="Camping" icon="tent" onPress={() => onOpenIntent('camping')} />
        <ExploreActionChip label="Quick float" icon="timer-outline" onPress={() => onOpenIntent('quick-float')} />
        <ExploreActionChip label="Full day" icon="sun-clock-outline" onPress={() => onOpenIntent('full-day')} />
        <ExploreActionChip label="All routes" icon="map-search-outline" onPress={onOpenExplore} />
      </View>
    </View>
  );
}

function ExploreActionChip({
  label,
  icon,
  disabled,
  onPress,
}: {
  label: string;
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.exploreActionChip, disabled ? styles.exploreActionDisabled : null]}
      disabled={disabled}
      onPress={onPress}
      android_ripple={{ color: colors.canvasMuted }}
    >
      <MaterialCommunityIcons name={icon} color={colors.accent} size={16} />
      <Text style={styles.exploreActionText}>{label}</Text>
    </Pressable>
  );
}

function KnownRouteSearch({ onOpen }: { onOpen: () => void }) {
  return (
    <Pressable style={styles.knownSearchCard} onPress={onOpen} android_ripple={{ color: colors.canvasMuted }}>
      <Text style={styles.knownSearchLabel}>Know where you want to go?</Text>
      <View style={styles.knownSearchInputRow}>
        <MaterialCommunityIcons name="magnify" color={colors.accent} size={18} />
        <Text style={styles.knownSearchPlaceholder}>River, reach, region, or state</Text>
      </View>
    </Pressable>
  );
}

function RouteSearchModal({
  visible,
  query,
  results,
  routeCounts,
  states,
  topInset,
  bottomInset,
  onChange,
  onClose,
  onOpenRiver,
  onExplore,
  onRequestRoute,
  onExploreState,
}: {
  visible: boolean;
  query: string;
  results: RiverSummaryApiItem[];
  routeCounts: ReadonlyMap<string, number>;
  states: string[];
  topInset: number;
  bottomInset: number;
  onChange: (query: string) => void;
  onClose: () => void;
  onOpenRiver: (river: RiverSummaryApiItem) => void;
  onExplore: () => void;
  onRequestRoute: () => void;
  onExploreState: (state: string) => void;
}) {
  const active = query.trim().length > 0;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.searchModalScreen}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.searchModalContent, { paddingTop: spacing.md + topInset, paddingBottom: spacing.md + bottomInset }]}>
          <View style={styles.searchModalHeader}>
            <View>
              <Text style={styles.searchModalTitle}>Find a route</Text>
              <Text style={styles.searchModalSubtitle}>Search rivers, reaches, states, and access points.</Text>
            </View>
            <Pressable style={styles.searchModalClose} onPress={onClose} accessibilityRole="button" accessibilityLabel="Close route search">
              <MaterialCommunityIcons name="close" color={colors.accent} size={20} />
            </Pressable>
          </View>

          <View style={styles.searchModalInputRow}>
            <MaterialCommunityIcons name="magnify" color={colors.accent} size={19} />
            <TextInput
              autoFocus
              autoCapitalize="none"
              autoCorrect={false}
              value={query}
              onChangeText={onChange}
              placeholder="River, reach, region, or state"
              placeholderTextColor={colors.textMuted}
              returnKeyType="search"
              onSubmitEditing={() => {
                if (results[0]) {
                  onOpenRiver(results[0]);
                  return;
                }

                onExplore();
              }}
              style={styles.searchModalInput}
            />
            {active ? (
              <Pressable hitSlop={10} onPress={() => onChange('')} accessibilityRole="button" accessibilityLabel="Clear search">
                <MaterialCommunityIcons name="close-circle" color={colors.textMuted} size={19} />
              </Pressable>
            ) : null}
          </View>

          <ScrollView
            style={styles.searchModalResults}
            contentContainerStyle={styles.searchModalResultsContent}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
          >
            {!active ? (
              <>
                <View style={styles.searchModalEmpty}>
                  <Text style={styles.searchModalEmptyTitle}>Start typing to search routes</Text>
                  <Text style={styles.searchModalEmptyText}>Try a river name, nearby city, state, put-in, or take-out.</Text>
                </View>
                <View style={styles.searchStateSection}>
                  <Text style={styles.searchStateTitle}>Browse by state</Text>
                  <View style={styles.searchStateGrid}>
                    {states.map((state) => (
                      <Pressable
                        key={state}
                        style={styles.searchStateChip}
                        onPress={() => onExploreState(state)}
                        android_ripple={{ color: colors.canvasMuted }}
                      >
                        <Text style={styles.searchStateText}>{stateLabel(state)}</Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </>
            ) : results.length > 0 ? (
              <View style={styles.knownSearchResults}>
                {results.map((river) => {
                  const routeCount = routeGroupMetaForRoute(river, routeCounts).routeCount;
                  return (
                    <Pressable key={river.river.slug} style={styles.knownSearchResult} onPress={() => onOpenRiver(river)}>
                      <View style={[styles.knownSearchScore, searchScoreTone(river.rating).score]}>
                        <Text style={[styles.knownSearchScoreText, searchScoreTone(river.rating).text]}>{river.score}</Text>
                      </View>
                      <View style={styles.knownSearchCopy}>
                        <View style={styles.knownSearchTopLine}>
                          <Text style={styles.knownSearchName} numberOfLines={1}>{river.river.name}</Text>
                          <RatingPill rating={river.rating} />
                        </View>
                        <Text style={styles.knownSearchMeta} numberOfLines={1}>
                          {[stateLabel(river.river.state), river.river.region, routeCount > 1 ? `${routeCount} routes` : '1 route'].filter(Boolean).join(' - ')}
                        </Text>
                        <Text style={styles.knownSearchReach} numberOfLines={1}>{river.river.reach}</Text>
                        <View style={styles.knownSearchFacts}>
                          <Text style={styles.knownSearchFact} numberOfLines={1}>{river.river.estimatedPaddleTime}</Text>
                          <Text style={styles.knownSearchFact} numberOfLines={1}>{river.river.difficulty}</Text>
                          <Text style={styles.knownSearchFact} numberOfLines={1}>{river.gaugeBandLabel}</Text>
                        </View>
                      </View>
                      <MaterialCommunityIcons name="chevron-right" color={colors.textMuted} size={21} />
                    </Pressable>
                  );
                })}
              </View>
            ) : (
              <View style={styles.knownSearchEmpty}>
                <Text style={styles.knownSearchEmptyTitle}>No route found</Text>
                <Text style={styles.searchModalEmptyText}>Open Explore to browse all rivers.</Text>
                <Pressable onPress={onExplore}>
                  <Text style={styles.knownSearchEmptyAction}>Open Explore map</Text>
                </Pressable>
                <Pressable style={styles.knownSearchRequestButton} onPress={onRequestRoute}>
                  <Text style={styles.knownSearchRequestText}>Request a Route</Text>
                </Pressable>
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function ZeroReadyActions({
  onWeekend,
  onExplore,
}: {
  onWeekend: () => void;
  onExplore: () => void;
}) {
  return (
    <View style={styles.zeroReadyCard}>
      <Text style={styles.zeroReadyTitle}>No clean paddles nearby right now</Text>
      <Text style={styles.zeroReadyText}>Watch routes may improve as levels and weather change.</Text>
      <View style={styles.zeroReadyActions}>
        <Pressable style={styles.zeroReadyPrimary} onPress={onWeekend}>
          <Text style={styles.zeroReadyPrimaryText}>Check Weekend</Text>
        </Pressable>
        <Pressable style={styles.zeroReadySecondary} onPress={onExplore}>
          <Text style={styles.zeroReadySecondaryText}>Explore Watch Routes</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ModeTabs({
  mode,
  hasLocation,
  locationStatus,
  onChange,
}: {
  mode: BoardMode;
  hasLocation: boolean;
  locationStatus: string;
  onChange: (mode: BoardMode) => void;
}) {
  return (
    <View style={styles.previewSortCard}>
      <Text style={styles.previewSortLabel}>Sort today’s routes</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.modeTabs}
      >
        {(['best', 'closest', 'score', 'certain'] as const).map((item) => {
          const active = item === mode;
          const requestingLocation = item === 'closest' && !hasLocation && locationStatus === 'requesting';
          return (
            <Pressable
              key={item}
              style={[
                styles.modeTab,
                active ? styles.modeTabActive : null,
                requestingLocation ? styles.modeTabDisabled : null,
              ]}
              disabled={requestingLocation}
              onPress={() => onChange(item)}
              android_ripple={{ color: colors.border, borderless: true }}
            >
              <Text style={[styles.modeTabText, active ? styles.modeTabTextActive : null]}>
                {item === 'closest' && !hasLocation ? 'Nearest' : modeLabels[item]}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

function EmptyMode({
  mode,
  hasLocation,
  locationStatus,
}: {
  mode: BoardMode;
  hasLocation: boolean;
  locationStatus: string;
}) {
  const message =
    mode === 'closest' && !hasLocation
        ? locationStatus === 'requesting'
          ? 'Finding nearby routes.'
          : locationStatus === 'denied'
            ? 'Location is off. You can still use Recommended, Score, or Most reliable first.'
            : 'Allow location to show nearby routes.'
        : 'No routes match this view.';

  return (
    <View style={styles.emptyCard}>
      <Text style={styles.emptyTitle}>{emptyTitleForMode(mode, hasLocation, locationStatus)}</Text>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

function OutOfRangeState({
  locationLabel,
  onRequestRoute,
  onBrowseRoutes,
}: {
  locationLabel: string;
  onRequestRoute: () => void;
  onBrowseRoutes: () => void;
}) {
  return (
    <View style={styles.outOfRangeCard}>
      <Text style={styles.emptyTitle}>No routes near {locationLabel}</Text>
      <Text style={styles.emptyText}>
        PaddleToday covers selected Midwest rivers. Browse the list or request one near you.
      </Text>
      <View style={styles.emptyActions}>
        <Pressable style={styles.emptyPrimaryButton} onPress={onRequestRoute}>
          <Text style={styles.emptyPrimaryButtonText}>Request a Route</Text>
        </Pressable>
        <Pressable style={styles.emptySecondaryButton} onPress={onBrowseRoutes}>
          <Text style={styles.emptySecondaryButtonText}>Browse all rivers</Text>
        </Pressable>
      </View>
    </View>
  );
}

function SnapshotPill({ label, value, tone, onPress }: { label: string; value: number; tone: object; onPress: () => void }) {
  return (
    <Pressable style={[styles.snapshotPill, tone]} onPress={onPress} android_ripple={{ color: colors.canvasMuted }}>
      <View>
        <Text style={styles.snapshotValue}>{value}</Text>
        <Text style={styles.snapshotLabel}>{label}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" color={colors.textMuted} size={17} />
    </Pressable>
  );
}

function searchScoreTone(rating: RiverSummaryApiItem['rating']) {
  if (rating === 'Strong') {
    return {
      score: { backgroundColor: '#E0EFE9' },
      text: { color: colors.strong },
    };
  }

  if (rating === 'Good') {
    return {
      score: { backgroundColor: '#E8EFD9' },
      text: { color: colors.good },
    };
  }

  if (rating === 'Fair') {
    return {
      score: { backgroundColor: '#F3E8CC' },
      text: { color: colors.fair },
    };
  }

  return {
    score: { backgroundColor: '#F2DDD6' },
    text: { color: colors.noGo },
  };
}

function toSavedRiver(river: BoardItem) {
  return {
    slug: river.river.slug,
    riverId: river.river.riverId,
    name: river.river.name,
    reach: river.river.reach,
  };
}

function routeReachWithState(river: BoardItem | RiverSummaryApiItem) {
  return [river.river.reach, stateAbbreviation(river.river.state)].filter(Boolean).join(' - ');
}

function stateLabel(state: string) {
  return state
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function stateAbbreviation(state: string) {
  const normalized = state.trim().toLowerCase();
  return stateAbbreviations[normalized] ?? state;
}

function isNearbyPick(river: BoardItem): river is NearbyRiverPick {
  return 'travelMinutes' in river;
}

function travelLabelForRiver(river: BoardItem) {
  return isNearbyPick(river) ? formatTravelTime(river.travelMinutes) : river.river.region;
}

function distanceLabelForRiver(river: BoardItem) {
  if (!isNearbyPick(river)) {
    return river.river.region;
  }

  return `${river.distanceMiles.toFixed(river.distanceMiles < 10 ? 1 : 0)} mi away`;
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

function compareHomeScore(left: BoardItem, right: BoardItem) {
  if (left.score !== right.score) {
    return right.score - left.score;
  }

  return left.river.name.localeCompare(right.river.name);
}

function compareHomeCertainty(left: BoardItem, right: BoardItem) {
  const leftConfidence = homeConfidenceWeight[left.confidence.label] ?? 0;
  const rightConfidence = homeConfidenceWeight[right.confidence.label] ?? 0;
  if (leftConfidence !== rightConfidence) {
    return rightConfidence - leftConfidence;
  }

  return compareHomeScore(left, right);
}

function findKnownRouteMatches(rivers: RiverSummaryApiItem[], query: string, limit: number) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  return rivers
    .filter((river) => searchableRouteText(river).includes(normalized))
    .sort((left, right) => {
      return searchRank(left, normalized) - searchRank(right, normalized) || compareHomeScore(left, right);
    })
    .slice(0, limit);
}

function searchableRouteText(river: RiverSummaryApiItem) {
  return [
    river.river.name,
    river.river.reach,
    river.river.region,
    river.river.state,
    stateAbbreviation(river.river.state),
    river.river.difficulty,
    river.river.routeType,
    river.river.distanceLabel,
    river.river.estimatedPaddleTime,
    river.river.putIn?.name,
    river.river.takeOut?.name,
    river.rating,
    river.gaugeBandLabel,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function searchRank(river: RiverSummaryApiItem, query: string) {
  const name = river.river.name.toLowerCase();
  const reach = river.river.reach.toLowerCase();
  const region = river.river.region.toLowerCase();
  const state = river.river.state.toLowerCase();
  const stateAbbr = stateAbbreviation(river.river.state).toLowerCase();
  const access = [river.river.putIn?.name, river.river.takeOut?.name].filter(Boolean).join(' ').toLowerCase();

  if (name === query) return 0;
  if (name.startsWith(query)) return 1;
  if (reach.startsWith(query)) return 2;
  if (region.startsWith(query) || state === query || stateAbbr === query) return 3;
  if (access.includes(query)) return 4;
  return 5;
}
function sectionSubtitleForMode(mode: BoardMode) {
  if (mode === 'closest') return 'Shortest drives first.';
  if (mode === 'score') return 'Rivers ordered by score.';
  if (mode === 'certain') return 'Most reliable routes first, then score.';
  return 'Best routes first. Routes to skip stay visible to check again later.';
}

function headlineLabelForMode(mode: BoardMode, headline: BoardItem | null) {
  if (!headline) return 'Today';
  if (headline.rating === 'No-go') return isNearbyPick(headline) ? 'Best recheck nearby' : 'Best recheck today';
  if (headline.rating === 'Fair') return isNearbyPick(headline) ? 'Watch nearby' : 'Watch closely';
  if (mode === 'closest') return 'Best nearby';
  if (mode === 'score') return 'Best conditions';
  if (mode === 'certain') return 'Most reliable pick';
  return isNearbyPick(headline) ? 'Best mix today' : 'Best conditions today';
}

function quickScanSubtitleForMode(mode: BoardMode) {
  if (mode === 'closest') return 'Nearby routes with key trip facts.';
  if (mode === 'score') return 'Rivers ordered by score.';
  if (mode === 'certain') return 'Most reliable routes first, then score.';
  return 'Today\'s routes, including ones to check again.';
}

function boardIntroTitleForMode(mode: BoardMode) {
  if (mode === 'closest') return 'Closest routes';
  if (mode === 'score') return 'Rivers ordered by score';
  if (mode === 'certain') return 'Most reliable routes';
  return 'Today\'s Calls';
}

function exploreIntentForMode(mode: BoardMode, hasLocation: boolean): ExploreIntentId {
  if (mode === 'closest') return 'best-nearby';
  if (mode === 'score') return 'clean-now';
  if (mode === 'certain') return 'clean-now';
  return hasLocation ? 'best-nearby' : 'clean-now';
}

function emptyTitleForMode(mode: BoardMode, hasLocation: boolean, locationStatus: string) {
  if (mode === 'closest' && !hasLocation) {
    return locationStatus === 'requesting' ? 'Finding nearby routes' : 'Location needed';
  }

  return 'Nothing here yet';
}

function homeFactItems(river: BoardItem) {
  return routePreviewFactItems(river.river, {
    travelMinutes: isNearbyPick(river) ? river.travelMinutes : null,
    includeNoCamping: true,
    driveDistanceLabel: isNearbyPick(river) ? distanceLabelForRiver(river) : null,
  });
}

function homeFactLine(river: BoardItem) {
  return routePreviewFactLine(river.river, {
    travelMinutes: isNearbyPick(river) ? river.travelMinutes : null,
    includeNoCamping: true,
    driveDistanceLabel: isNearbyPick(river) ? distanceLabelForRiver(river) : null,
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
  heroActionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  heroPrimaryAction: {
    minHeight: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceStrong,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingHorizontal: spacing.md,
  },
  heroSecondaryAction: {
    minHeight: 44,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingHorizontal: spacing.md,
  },
  heroActionDisabled: {
    opacity: 0.65,
  },
  heroPrimaryActionText: {
    color: colors.accentDeep,
    fontSize: 13,
    fontWeight: '900',
  },
  heroSecondaryActionText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  snapshotSummary: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.xs,
  },
  snapshotContext: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
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
    minHeight: 62,
    borderWidth: 1,
    borderColor: 'rgba(21, 49, 43, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
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
  exploreActions: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  exploreActionsHeader: {
    gap: 2,
  },
  exploreActionsTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  exploreActionsSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  exploreActionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  exploreActionChip: {
    minHeight: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  exploreActionPrimary: {
    minHeight: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.accent,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  exploreActionDisabled: {
    opacity: 0.65,
  },
  exploreActionText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  exploreActionPrimaryText: {
    color: colors.surfaceStrong,
    fontSize: 12,
    fontWeight: '900',
  },
  knownSearchCard: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  knownSearchLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  knownSearchInputRow: {
    minHeight: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  knownSearchInput: {
    flex: 1,
    minWidth: 0,
    color: colors.text,
    fontSize: 15,
    paddingVertical: 9,
  },
  knownSearchPlaceholder: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 15,
    paddingVertical: 9,
  },
  knownSearchResults: {
    gap: spacing.xs,
  },
  knownSearchResult: {
    minHeight: 92,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
  },
  knownSearchScore: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  knownSearchScoreText: {
    color: colors.accentDeep,
    fontSize: 16,
    fontWeight: '900',
  },
  knownSearchCopy: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  knownSearchTopLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  knownSearchName: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  knownSearchMeta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  knownSearchReach: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  knownSearchFacts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 2,
  },
  knownSearchFact: {
    maxWidth: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  knownSearchEmpty: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: 4,
  },
  knownSearchEmptyTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  knownSearchEmptyAction: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  knownSearchRequestButton: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 13,
    paddingVertical: 8,
    marginTop: 4,
  },
  knownSearchRequestText: {
    color: colors.surfaceStrong,
    fontSize: 12,
    fontWeight: '900',
  },
  searchModalScreen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  searchModalContent: {
    flex: 1,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  searchModalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  searchModalTitle: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '900',
  },
  searchModalSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    marginTop: 3,
  },
  searchModalClose: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchModalInputRow: {
    minHeight: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  searchModalInput: {
    flex: 1,
    minWidth: 0,
    color: colors.text,
    fontSize: 16,
    paddingVertical: 10,
  },
  searchModalResults: {
    flex: 1,
  },
  searchModalResultsContent: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  searchModalEmpty: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  searchModalEmptyTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  searchModalEmptyText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  searchStateSection: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    padding: spacing.md,
    gap: spacing.sm,
  },
  searchStateTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  searchStateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  searchStateChip: {
    minHeight: 36,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchStateText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  zeroReadyCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#D7C6A2',
    backgroundColor: '#F3E8CC',
    padding: spacing.md,
    gap: spacing.sm,
  },
  zeroReadyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  zeroReadyText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  zeroReadyActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  zeroReadyPrimary: {
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  zeroReadyPrimaryText: {
    color: colors.surfaceStrong,
    fontSize: 12,
    fontWeight: '900',
  },
  zeroReadySecondary: {
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  zeroReadySecondaryText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  previewSortCard: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  previewSortLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    paddingHorizontal: 4,
  },
  modeTabs: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingRight: spacing.md,
  },
  modeTab: {
    minHeight: 34,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
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
    fontSize: 12,
    fontWeight: '800',
  },
  modeTabTextActive: {
    color: colors.surfaceStrong,
  },
  todayCallsSection: {
    gap: spacing.sm,
  },
  sectionStack: {
    gap: spacing.sm,
  },
  sectionHeading: {
    paddingHorizontal: 2,
    gap: 2,
  },
  sectionHeadingTop: {
    minHeight: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  sectionTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
  },
  sectionAction: {
    minHeight: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 10,
  },
  sectionActionText: {
    color: colors.accent,
    fontSize: 12,
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
  imageCardSegment: {
    color: colors.accentSoft,
    fontSize: 11,
    fontWeight: '900',
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
  quickSegment: {
    color: colors.accentDeep,
    fontSize: 11,
    fontWeight: '900',
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
  outOfRangeCard: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
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
  emptyActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  emptyPrimaryButton: {
    minHeight: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyPrimaryButtonText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  emptySecondaryButton: {
    minHeight: 42,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySecondaryButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
});
