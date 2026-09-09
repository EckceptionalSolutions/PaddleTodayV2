import { stateAbbreviation } from '../lib/state-labels';
import { RouteSearchModal } from '../components/route-search-modal';
import { LocationStorageNotice } from '../components/location-storage-notice';
import {
  formatRouteSegmentLabel,
  normalizeSearchText,
  routeSegmentSummary,
  type RiverSummaryApiItem,
} from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import type { ComponentProps, ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ImageBackground,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRiverSummaryQuery } from '../api/queries';
import { AppErrorState, AppLoadingState, AppRefreshNotice } from '../components/app-state';
import { ManualLocationModal } from '../components/manual-location-modal';
import { AppButton } from '../components/app-button';
import { decisionColors } from '../components/rating-pill';
import { SaveToggleButton } from '../components/save-toggle-button';
import { useStoredLocation, type LocationRequestResult } from '../hooks/use-stored-location';
import { requestFailureMessage } from '../lib/request-failure';
import { normalizeApiText } from '../lib/format';
import { routeDecisionPresentation } from '../lib/map-decision';
import { type ExploreIntentId } from '../lib/explore-intents';
import { photoForRiver } from '../lib/route-photos';
import { buildRouteGroupMeta, routeGroupMetaForRoute, uniqueRoutesByRiver } from '../lib/route-groups';
import { androidBottomInset } from '../lib/safe-area';
import { isRecord, parseJson } from '../lib/storage';
import { routePreviewFactItems } from '../lib/route-facts';
import {
  buildBoardSnapshot,
  HOME_NEARBY_DISTANCE_MILES,
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
  certain: 'Evidence first',
};

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomContentInset = androidBottomInset(insets.bottom, ANDROID_NAV_CONTROL_MIN_INSET);
  const summaryQuery = useRiverSummaryQuery();
  const { location, status, requestLocation, searchLocations, selectPlanningLocation, cancelLocationRequest } = useStoredLocation();
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const [mode, setMode] = useState<BoardMode>('best');
  const [routeQuery, setRouteQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [locationSearchOpen, setLocationSearchOpen] = useState(false);
  const [modeSaveError, setModeSaveError] = useState(false);
  const modeChosen = useRef(false);
  const modeWrites = useRef(Promise.resolve());
  const modeWriteVersion = useRef(0);

  const rivers = summaryQuery.data?.rivers ?? [];
  const routeCounts = useMemo(() => buildRouteGroupMeta(rivers), [rivers]);
  const nearbyPicks = useMemo(
    () => (location ? selectNearbyPicks(rivers, location, rivers.length) : []),
    [rivers, location]
  );
  const scopedRoutes = location ? nearbyPicks : rivers;
  const snapshotRoutes = scopedRoutes;
  const snapshot = buildBoardSnapshot(snapshotRoutes);
  const snapshotContext = location
    ? `Within ${HOME_NEARBY_DISTANCE_MILES} mi of ${location.label}`
    : 'Across available routes';
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
    () => uniqueRoutesByRiver(findKnownRouteMatches(rivers, routeQuery)).slice(0, 10),
    [rivers, routeQuery]
  );
  const supportedStates = useMemo(
    () => [...new Set(rivers.map((river) => river.river.state))].sort((left, right) => left.localeCompare(right)),
    [rivers]
  );
  const locationOutOfRange = Boolean(location && rivers.length > 0 && nearbyPicks.length === 0);
  const zeroReady = !locationOutOfRange && scopedRoutes.length > 0 && snapshot.paddleable === 0;

  useEffect(() => {
    let active = true;
    void AsyncStorage.getItem(BOARD_PREFERENCES_STORAGE_KEY).then(raw => {
      const parsed = parseJson(raw);
      if (active && !modeChosen.current && isBoardPreferences(parsed)) setMode(parsed.mode);
    }).catch(() => { /* Keep defaults without overwriting the stored choice. */ });
    return () => { active = false; modeWriteVersion.current++; };
  }, []);

  function chooseMode(nextMode: BoardMode) {
    modeChosen.current = true;
    setMode(nextMode);
    setModeSaveError(false);
    const version = ++modeWriteVersion.current;
    modeWrites.current = modeWrites.current.then(async () => {
      try { await AsyncStorage.setItem(BOARD_PREFERENCES_STORAGE_KEY, JSON.stringify({ mode: nextMode })); }
      catch { if (version === modeWriteVersion.current) setModeSaveError(true); }
    });
  }

  if (summaryQuery.isPending && !summaryQuery.data) {
    return (
      <AppLoadingState title="Loading today’s routes" body="Checking river conditions." />
    );
  }

  if (summaryQuery.isError && !summaryQuery.data) {
    return (
      <AppErrorState
        title="Today’s routes did not load"
        body={requestFailureMessage(summaryQuery.error)}
        retrying={summaryQuery.isFetching}
        onRetry={() => summaryQuery.refetch()}
      />
    );
  }

  const modeTabs = <ModeTabs mode={mode} hasLocation={Boolean(location)} locationStatus={status}
    saveError={modeSaveError} onRetrySave={() => chooseMode(mode)}
    onChange={(nextMode) => {
      chooseMode(nextMode);
      if (nextMode === 'closest' && !location) void requestLocation();
    }} />;

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
      keyboardDismissMode={Platform.OS === 'web' ? 'none' : 'on-drag'}
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
        <LocationStorageNotice />
        <AppRefreshNotice
          isError={summaryQuery.isRefetchError}
          isStale={summaryQuery.data?.snapshotStatus === 'stale'}
          dataUpdatedAt={summaryQuery.dataUpdatedAt}
          retrying={summaryQuery.isFetching}
          onRetry={() => void summaryQuery.refetch()}
        />
        <BoardHero
          mode={headlineMode}
          headline={headline}
          routeCount={headline ? routeGroupMetaForRoute(headline, routeCounts).routeCount : 1}
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
              ? () => openBoardRoute(headline)
              : undefined
          }
          onOpenStatus={(statusIntent) => openExploreIntent(statusIntent)}
          hasLocation={Boolean(location)}
          locationStatus={status}
          onUseLocation={() => void requestLocation()}
          onSetLocation={() => setLocationSearchOpen(true)}
        />
        {locationOutOfRange ? (
          <OutOfRangeState
            locationLabel={location?.label ?? 'your area'}
            onRequestRoute={() => router.push('/request-route')}
            onBrowseRoutes={() => router.push('/explore')}
          />
        ) : (
          <RiverCarousel
            mode={mode}
            rivers={data.slice(0, 10)}
            routeCounts={routeCounts}
            isSaved={isSaved}
            onToggleSaved={(river) => void toggleSavedRiver(toSavedRiver(river))}
            onOpen={openBoardRoute}
            emptyState={<EmptyMode mode={mode} hasLocation={Boolean(location)} locationStatus={status} />}
          >
            {modeTabs}
          </RiverCarousel>
        )}
        {zeroReady ? (
          <ZeroReadyActions
            watchCount={snapshot.watch}
            unavailableCount={snapshot.unavailable}
            onWeekend={() => router.push('/weekend')}
            onExplore={() => openExploreIntent(snapshot.watch > 0 ? 'watch' : snapshot.unavailable > 0 ? 'no-call' : 'skip')}
          />
        ) : null}
        <ExploreActionStrip
          hasLocation={Boolean(location)}
          locationStatus={status}
          onUseLocation={requestLocation}
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
          openRiverGroup(river);
        }}
        onExplore={() => {
          setSearchOpen(false);
          setRouteQuery('');
          router.push('/explore');
        }}
        onRequestRoute={() => {
          setSearchOpen(false);
          router.push({ pathname: '/request-route', params: { name: routeQuery.trim() } });
        }}
        onExploreState={(state) => {
          setSearchOpen(false);
          setRouteQuery('');
          router.push({ pathname: '/explore', params: { state, intentKey: Date.now().toString() } });
        }}
      />
      <ManualLocationModal
        visible={locationSearchOpen}
        onDismiss={() => {
          cancelLocationRequest();
          setLocationSearchOpen(false);
        }}
        onSearch={searchLocations}
        onSelect={selectPlanningLocation}
      />
    </ScrollView>
  );

  function openBoardRoute(river: BoardItem) {
    router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug, source: 'today' } });
  }

  function openRiverGroup(river: BoardItem) {
    if (river.river.riverId && routeGroupMetaForRoute(river, routeCounts).routeCount > 1) {
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
  routeCount,
  snapshot,
  snapshotContext,
  saved,
  onToggleSaved,
  onOpen,
  onOpenStatus,
  hasLocation,
  locationStatus,
  onUseLocation,
  onSetLocation,
}: {
  mode: BoardMode;
  headline: BoardItem | null;
  routeCount: number;
  snapshot: ReturnType<typeof buildBoardSnapshot>;
  snapshotContext: string;
  saved: boolean;
  onToggleSaved?: () => void;
  onOpen?: () => void;
  onOpenStatus: (intent: ExploreIntentId) => void;
  hasLocation: boolean;
  locationStatus: string;
  onUseLocation: () => void;
  onSetLocation: () => void;
}) {
  const imageUri = headline ? photoForRiver(headline.river) : photoForRiver({ slug: 'fallback' });
  const requestingLocation = locationStatus === 'requesting';

  return (
    <View style={styles.heroShell}>
      <ImageBackground source={{ uri: imageUri }} style={[styles.heroImage, !headline && styles.heroImageEmpty]} imageStyle={styles.heroImageRadius}>
        <View style={[styles.heroOverlay, !headline && styles.heroOverlayEmpty]}>
          <View style={styles.topBar}>
            <View style={styles.topBarCopy}>
              <Text style={styles.appName}>Today</Text>
              <Text style={styles.freshness}>Score, reliability, and drive time</Text>
            </View>
            <View style={styles.liveBadge}>
              <Text style={styles.liveBadgeText}>{snapshot.unavailable > 0 && snapshot.paddleable === 0 && snapshot.watch === 0 && snapshot.skip === 0 ? 'Calls unavailable' : `${snapshot.paddleable} routes to paddle`}</Text>
            </View>
          </View>

          {headline ? (
            <Pressable accessibilityRole="button" accessibilityLabel={`View ${headline.river.name}: ${headline.river.reach}`} style={styles.heroContent} onPress={onOpen} android_ripple={{ color: 'rgba(255,255,255,0.16)' }}>
              <View style={styles.heroScoreRow}>
                <View style={[styles.scoreOrb, { backgroundColor: decisionColors(headline.rating, routeDecisionPresentation(headline).readiness).backgroundColor }]}>
                  <Text style={[styles.heroVerdictText, { color: decisionColors(headline.rating, routeDecisionPresentation(headline).readiness).textColor }]}>
                    {routeDecisionPresentation(headline).label}
                  </Text>
                  <Text style={[styles.heroVerdictMeta, { color: decisionColors(headline.rating, routeDecisionPresentation(headline).readiness).textColor }]}>{routeDecisionPresentation(headline).scoreLabel}</Text>
                </View>
                {onToggleSaved ? <SaveToggleButton routeSlug={headline.river.slug} routeLabel={`${headline.river.name}: ${headline.river.reach}`} compact saved={saved} onPress={onToggleSaved} /> : null}
              </View>
              <View style={styles.headlineCopy}>
                <Text style={styles.headlineKicker}>{routeDecisionPresentation(headline).call === 'unavailable' ? 'Route details to review' : hasLocation ? headlineLabelForMode(mode, headline) : 'Best across all routes'}</Text>
                <Text style={styles.headlineName}>{headline.river.name}</Text>
                <Text style={styles.headlineReach} numberOfLines={2}>
                  {routeCount > 1
                    ? `${routeChoiceLabelForMode(mode)}: ${routeReachWithState(headline)}`
                    : routeReachWithState(headline)}
                </Text>
                <Text style={styles.headlineText} numberOfLines={2}>
                  {routeDecisionPresentation(headline).call === 'unavailable' ? 'A current call is unavailable. Open the route to review its evidence and access details.' : normalizeApiText(headline.summary.shortExplanation)}
                </Text>
              </View>
            </Pressable>
          ) : null}
        </View>
      </ImageBackground>

      {!hasLocation ? (
        <View style={styles.heroLocationPrompt}>
          <View style={styles.heroLocationIcon}>
            <MaterialCommunityIcons name="map-marker-radius-outline" color={colors.accentDeep} size={22} />
          </View>
          <View style={styles.heroLocationCopy}>
            <Text style={styles.heroLocationTitle}>Find the best paddles near you</Text>
            <Text style={styles.heroLocationPromptText}>
              {locationStatus === 'denied'
                ? 'Location access is off, so this recommendation covers every route.'
                : 'Set a starting point to rank routes and counts within 100 miles.'}
            </Text>
            <View style={styles.heroLocationActions}>
              <AppButton
                label="Use my location"
                busy={requestingLocation}
                busyLabel="Finding you…"
                icon="crosshairs-gps"
                onPress={onUseLocation}
              />
              <AppButton
                label="City or ZIP"
                variant="secondary"
                onPress={onSetLocation}
                accessibilityLabel="Set city or ZIP code"
              />
            </View>
          </View>
        </View>
      ) : null}

      <View style={styles.snapshotSummary}>
        <View style={styles.snapshotContextRow}>
          <Text style={styles.snapshotContext}>{snapshotContext}</Text>
          {hasLocation ? <AppButton label="Change" accessibilityLabel="Change planning location" variant="secondary" onPress={onSetLocation} /> : null}
        </View>
        <View style={styles.snapshotRow}>
          <SnapshotPill label="Paddle" value={snapshot.paddleable} tone={styles.snapshotStrong} onPress={() => onOpenStatus('clean-now')} />
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
  emptyState,
}: {
  mode: BoardMode;
  rivers: BoardItem[];
  routeCounts: ReadonlyMap<string, number>;
  isSaved: (slug: string) => boolean;
  onToggleSaved: (river: BoardItem) => void;
  onOpen: (river: BoardItem) => void;
  children: ReactNode;
  emptyState: ReactNode;
}) {
  return (
    <View style={styles.todayCallsSection}>
      <SectionHeading
        title={boardIntroTitleForMode(mode)}
        subtitle={sectionSubtitleForMode(mode)}
      />
      {children}
      {rivers.length > 0 ? <ScrollView
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
      </ScrollView> : emptyState}
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
    <Pressable accessibilityRole="button" accessibilityLabel={`View ${river.river.name}: ${river.river.reach}`} style={styles.imageCard} onPress={onOpen} android_ripple={{ color: colors.canvasMuted }}>
      <ImageBackground
        source={{ uri: photoForRiver(river.river) }}
        style={styles.imageCardMedia}
        imageStyle={styles.imageCardImage}
      >
        <View style={styles.imageCardOverlay}>
          <View style={styles.imageCardTop}>
            <View style={styles.imageScore}>
              <Text style={styles.imageVerdictText}>{routeDecisionPresentation(river).label}</Text>
              <Text style={styles.imageScoreLabel}>{routeDecisionPresentation(river).scoreLabel}</Text>
            </View>
            <SaveToggleButton routeSlug={river.river.slug} routeLabel={`${river.river.name}: ${river.river.reach}`} compact saved={saved} onPress={onToggleSaved} />
          </View>
          <View style={styles.imageCardCopy}>
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
          {routeDecisionPresentation(river).call === 'unavailable' ? 'A current call is unavailable. Review the route evidence before choosing it.' : normalizeApiText(river.summary.shortExplanation)}
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

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.sectionHeading}>
      <View style={styles.sectionHeadingTop}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>{title}</Text>

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
  onUseLocation: () => Promise<LocationRequestResult>;
  onOpenExplore: () => void;
  onOpenIntent: (intent: ExploreIntentId) => void;
}) {
  const nearbyRequest = useRef<object | null>(null);
  const [nearbyMessage, setNearbyMessage] = useState('');
  useFocusEffect(useCallback(() => () => { nearbyRequest.current = null; }, []));
  const requestingLocation = locationStatus === 'requesting';
  const nearbyLabel = requestingLocation ? 'Finding nearby' : 'Best nearby';

  async function openNearby() {
    if (nearbyRequest.current) return;
    if (hasLocation) return onOpenIntent('best-nearby');
    const request = {};
    nearbyRequest.current = request;
    setNearbyMessage('');
    try {
      const result = await onUseLocation();
      if (nearbyRequest.current !== request) return;
      if (result.location) onOpenIntent('best-nearby');
      else setNearbyMessage('Could not find your location. Try again or set a city or ZIP code above.');
    } catch {
      if (nearbyRequest.current === request) setNearbyMessage('Could not find your location. Try again or set a city or ZIP code above.');
    } finally {
      if (nearbyRequest.current === request) nearbyRequest.current = null;
    }
  }

  return (
    <View style={styles.exploreActions}>
      <View style={styles.exploreActionsHeader}>
        <Text accessibilityRole="header" style={styles.exploreActionsTitle}>Plan a paddle</Text>
        <Text style={styles.exploreActionsSubtitle}>Choose a view.</Text>
      </View>
      <View style={styles.exploreActionGrid}>
        <ExploreActionChip
          label={nearbyLabel}
          icon="crosshairs-gps"
          disabled={requestingLocation}
          onPress={() => void openNearby()}
        />
        <ExploreActionChip label="Paddle now" icon="check-circle-outline" onPress={() => onOpenIntent('clean-now')} />
        <ExploreActionChip label="Camping" icon="tent" onPress={() => onOpenIntent('camping')} />
        <ExploreActionChip label="Quick float" icon="timer-outline" onPress={() => onOpenIntent('quick-float')} />
        <ExploreActionChip label="Full day" icon="sun-clock-outline" onPress={() => onOpenIntent('full-day')} />
        <ExploreActionChip label="All routes" icon="map-search-outline" onPress={onOpenExplore} />
      </View>
      {!hasLocation && nearbyMessage ? <Text accessibilityLiveRegion="polite" style={styles.exploreActionsSubtitle}>{nearbyMessage}</Text> : null}
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
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: Boolean(disabled), busy: Boolean(disabled) }}
      aria-busy={Boolean(disabled)}
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
    <Pressable accessibilityRole="button" accessibilityLabel="Search for a river or route" style={styles.knownSearchCard} onPress={onOpen} android_ripple={{ color: colors.canvasMuted }}>
      <Text style={styles.knownSearchLabel}>Know where you want to go?</Text>
      <View style={styles.knownSearchInputRow}>
        <MaterialCommunityIcons name="magnify" color={colors.accent} size={18} />
        <Text style={styles.knownSearchPlaceholder}>River, route, region, or state</Text>
      </View>
    </Pressable>
  );
}

function ZeroReadyActions({
  watchCount,
  unavailableCount,
  onWeekend,
  onExplore,
}: {
  watchCount: number;
  unavailableCount: number;
  onWeekend: () => void;
  onExplore: () => void;
}) {
  return (
    <View style={styles.zeroReadyCard}>
      <Text style={styles.zeroReadyTitle}>{watchCount === 0 && unavailableCount > 0 ? 'Current calls need more evidence' : 'No Paddle calls right now'}</Text>
      <Text style={styles.zeroReadyText}>{watchCount > 0 ? 'Watch routes need a closer look at levels and weather.' : unavailableCount > 0 ? 'Review the routes and check current sources before planning a launch.' : 'Review the reasons to skip before choosing another window.'}</Text>
      <View style={styles.zeroReadyActions}>
        <AppButton label="Check Weekend" onPress={onWeekend} />
        <AppButton label={watchCount > 0 ? 'Explore watch routes' : unavailableCount > 0 ? 'Review routes without a call' : 'Review skip reasons'} variant="secondary" onPress={onExplore} />
      </View>
    </View>
  );
}

function ModeTabs({
  mode,
  hasLocation,
  locationStatus,
  onChange,
  saveError,
  onRetrySave,
}: {
  mode: BoardMode;
  hasLocation: boolean;
  locationStatus: string;
  onChange: (mode: BoardMode) => void;
  saveError: boolean;
  onRetrySave: () => void;
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
              disabled={Platform.OS !== 'web' && requestingLocation}
              accessibilityRole="button"
              accessibilityState={{ selected: active, disabled: requestingLocation }}
              aria-disabled={requestingLocation}
              aria-busy={requestingLocation}
              aria-pressed={active}
              onPress={() => { if (!requestingLocation) onChange(item); }}
              android_ripple={{ color: colors.border, borderless: true }}
            >
              <Text style={[styles.modeTabText, active ? styles.modeTabTextActive : null]}>
                {item === 'closest' && !hasLocation ? 'Nearest' : modeLabels[item]}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      {saveError ? <>
        <Text style={styles.emptyText} accessibilityLiveRegion="polite">Your sort is applied, but could not be saved on this device.</Text>
        <AppButton label="Retry saving sort" variant="secondary" onPress={onRetrySave} />
      </> : null}
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
            ? 'Location is off. Choose another sort above or set a city to find nearby routes.'
            : 'Choose another sort above or set a city to find nearby routes.'
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
        Browse supported rivers or request a route near you.
      </Text>
      <View style={styles.emptyActions}>
        <Pressable accessibilityRole="button" style={styles.emptyPrimaryButton} onPress={onRequestRoute}>
          <Text style={styles.emptyPrimaryButtonText}>Request a Route</Text>
        </Pressable>
        <Pressable accessibilityRole="button" style={styles.emptySecondaryButton} onPress={onBrowseRoutes}>
          <Text style={styles.emptySecondaryButtonText}>Browse all rivers</Text>
        </Pressable>
      </View>
    </View>
  );
}

function SnapshotPill({ label, value, tone, onPress }: { label: string; value: number; tone: object; onPress: () => void }) {
  return (
    <Pressable style={[styles.snapshotPill, tone]} onPress={onPress} android_ripple={{ color: colors.canvasMuted }}
      accessibilityRole="button" accessibilityLabel={`${value} ${label} ${value === 1 ? 'route' : 'routes'}`} accessibilityHint={`Show ${label.toLowerCase()} routes in Explore.`}>
      <View>
        <Text style={styles.snapshotValue}>{value}</Text>
        <Text style={styles.snapshotLabel}>{label}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" color={colors.textMuted} size={17} />
    </Pressable>
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

function routeReachWithState(river: BoardItem | RiverSummaryApiItem) {
  return [river.river.reach, stateAbbreviation(river.river.state)].filter(Boolean).join(' - ');
}



function isNearbyPick(river: BoardItem): river is NearbyRiverPick {
  return 'travelMinutes' in river;
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

function findKnownRouteMatches(rivers: RiverSummaryApiItem[], query: string) {
  const normalized = normalizeSearchText(query);
  if (!normalized) {
    return [];
  }

  return rivers
    .filter((river) => searchableRouteText(river).includes(normalized))
    .sort((left, right) => {
      return searchRank(left, normalized) - searchRank(right, normalized) || compareHomeScore(left, right);
    });
}

function searchableRouteText(river: RiverSummaryApiItem) {
  return normalizeSearchText([
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
    .join(' '));
}

function searchRank(river: RiverSummaryApiItem, query: string) {
  const name = normalizeSearchText(river.river.name);
  const reach = normalizeSearchText(river.river.reach);
  const region = normalizeSearchText(river.river.region);
  const state = normalizeSearchText(river.river.state);
  const stateAbbr = normalizeSearchText(stateAbbreviation(river.river.state));
  const access = normalizeSearchText([river.river.putIn?.name, river.river.takeOut?.name].filter(Boolean).join(' '));

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
  if (mode === 'certain') return 'Stronger evidence first, then score.';
  return 'Best routes first. Routes to skip stay visible to check again later.';
}

function headlineLabelForMode(mode: BoardMode, headline: BoardItem | null) {
  if (!headline) return 'Today';
  const call = routeDecisionPresentation(headline).call;
  if (call === 'skip') return isNearbyPick(headline) ? 'Best recheck nearby' : 'Best recheck today';
  if (call === 'unavailable') return 'Call unavailable';
  if (call === 'watch') return isNearbyPick(headline) ? 'Watch nearby' : 'Watch closely';
  if (mode === 'closest') return 'Best nearby';
  if (mode === 'score') return 'Best conditions';
  if (mode === 'certain') return 'Strongest evidence';
  return isNearbyPick(headline) ? 'Best mix today' : 'Best conditions today';
}

function routeChoiceLabelForMode(mode: BoardMode) {
  if (mode === 'closest') return 'Closest route on this river';
  if (mode === 'score') return 'Highest-scoring route on this river';
  if (mode === 'certain') return 'Strongest evidence on this river';
  return 'Best route on this river';
}

function boardIntroTitleForMode(mode: BoardMode) {
  if (mode === 'closest') return 'Closest routes';
  if (mode === 'score') return 'Rivers ordered by score';
  if (mode === 'certain') return 'Routes by evidence strength';
  return 'Today\'s Calls';
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
    backgroundColor: colors.accentDeep,
  },
  heroImageEmpty: {
    minHeight: 110,
  },
  heroImageRadius: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  heroOverlay: {
    minHeight: 310,
    gap: spacing.md,
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: 'rgba(15, 25, 22, 0.34)',
  },
  heroOverlayEmpty: {
    minHeight: 110,
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  topBarCopy: { flexGrow: 1, minWidth: 0, maxWidth: '100%' },
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
    maxWidth: '100%',
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
    minWidth: 132,
    minHeight: 60,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  heroVerdictText: {
    fontSize: 16,
    fontWeight: '900',
  },
  heroVerdictMeta: {
    fontSize: 10,
    fontWeight: '800',
    marginTop: 2,
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
  snapshotSummary: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.xs,
  },
  snapshotContext: {
    flexGrow: 1,
    flexBasis: 140,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  snapshotContextRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: spacing.sm },
  snapshotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  snapshotPill: {
    flexGrow: 1,
    flexBasis: '45%',
    minWidth: 92,
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
  exploreActionDisabled: {
    opacity: 0.65,
  },
  exploreActionText: {
    color: colors.text,
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
  knownSearchPlaceholder: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 15,
    paddingVertical: 9,
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
    backgroundColor: colors.accentDeep,
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
    minWidth: 112,
    minHeight: 48,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  imageVerdictText: {
    color: colors.accentDeep,
    fontSize: 13,
    fontWeight: '900',
  },
  heroLocationPrompt: {
    marginHorizontal: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#BFD6CC',
    backgroundColor: colors.accentSoft,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  heroLocationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLocationCopy: {
    flex: 1,
    gap: 5,
  },
  heroLocationTitle: {
    color: colors.accentDeep,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '900',
  },
  heroLocationPromptText: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 17,
  },
  heroLocationActions: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  imageScoreLabel: {
    color: colors.accentDeep,
    fontSize: 9,
    lineHeight: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.1,
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
