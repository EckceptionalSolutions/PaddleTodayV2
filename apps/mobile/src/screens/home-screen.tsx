import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ImageBackground,
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
import { AppErrorState, AppLoadingState } from '../components/app-state';
import { RatingPill } from '../components/rating-pill';
import { SaveToggleButton } from '../components/save-toggle-button';
import { useStoredLocation } from '../hooks/use-stored-location';
import { resolveApiBaseUrl } from '../lib/api-base-url';
import { normalizeApiText, verdictForRating } from '../lib/format';
import { formatTravelTime } from '../lib/location';
import { photoForRiver } from '../lib/route-photos';
import { buildRouteGroupMeta, routeGroupMetaForRoute, uniqueRoutesByRiver } from '../lib/route-groups';
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
  const summaryQuery = useRiverSummaryQuery();
  const { location, status, requestLocation, clearLocation } = useStoredLocation();
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const [mode, setMode] = useState<BoardMode>('best');
  const [routeQuery, setRouteQuery] = useState('');
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
  const snapshotContext = location ? `In range near ${location.label}` : 'Across supported routes';
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
    () => findKnownRouteMatches(rivers, routeQuery, 6),
    [rivers, routeQuery]
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
      <AppLoadingState title="Loading today’s routes" body="Checking launch calls." />
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
          paddingBottom: spacing.xl + TAB_BAR_SAFE_SPACE + Math.max(insets.bottom, ANDROID_NAV_CONTROL_MIN_INSET),
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
        <KnownRouteSearch
          query={routeQuery}
          results={knownRouteMatches}
          routeCounts={routeCounts}
          onChange={setRouteQuery}
          onOpen={(river) => {
            setRouteQuery('');
            openBoardRoute(river);
          }}
          onExplore={() => router.push('/explore')}
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
          locationStatus={status}
          onChange={(nextMode) => {
            setMode(nextMode);
            if (nextMode === 'closest' && !location) {
              void requestLocation();
            }
          }}
        />
        {zeroReady ? (
          <ZeroReadyActions
            onWeekend={() => router.push('/weekend')}
            onExplore={() => {
              setMode('score');
              router.push('/explore');
            }}
            onSaved={() => router.push('/saved')}
          />
        ) : null}
      </View>

      {locationOutOfRange ? (
        <OutOfRangeState
          locationLabel={location?.label ?? 'your area'}
          onRequestRoute={() => router.push('/request-route')}
          onBrowseRoutes={() => router.push('/explore')}
        />
      ) : data.length > 0 ? (
        <QuickScanList
          mode={mode}
          rivers={data.slice(0, 10)}
          routeCounts={routeCounts}
          isSaved={isSaved}
          onToggleSaved={(river) => void toggleSavedRiver(toSavedRiver(river))}
          onOpen={openBoardRoute}
        />
      ) : (
          <EmptyMode mode={mode} hasLocation={Boolean(location)} locationStatus={status} />
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
}

function BoardHero({
  mode,
  headline,
  snapshot,
  snapshotContext,
  saved,
  onToggleSaved,
  onOpen,
}: {
  mode: BoardMode;
  headline: BoardItem | null;
  snapshot: ReturnType<typeof buildBoardSnapshot>;
  snapshotContext: string;
  saved: boolean;
  onToggleSaved?: () => void;
  onOpen?: () => void;
}) {
  const imageUri = headline ? photoForRiver(headline.river) : photoForRiver({ slug: 'fallback' });

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
                <Text style={styles.headlineKicker}>{headlineLabelForMode(mode, headline)}</Text>
                <Text style={styles.headlineName}>{headline.river.name}</Text>
                <Text style={styles.headlineReach} numberOfLines={1}>{routeReachWithState(headline)}</Text>
                <Text style={styles.headlineText} numberOfLines={2}>
                  {verdictForRating(headline.rating)} - {normalizeApiText(headline.summary.shortExplanation)}
                </Text>
              </View>
            </Pressable>
          ) : null}
        </View>
      </ImageBackground>

      <View style={styles.snapshotSummary}>
        <Text style={styles.snapshotContext}>{snapshotContext}</Text>
        <View style={styles.snapshotRow}>
          <SnapshotPill label="Paddle" value={snapshot.paddleable} tone={styles.snapshotStrong} />
          <SnapshotPill label="Watch" value={snapshot.watch} tone={styles.snapshotFair} />
          <SnapshotPill label="Skip" value={snapshot.skip} tone={styles.snapshotNoGo} />
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
}: {
  mode: BoardMode;
  rivers: BoardItem[];
  routeCounts: ReadonlyMap<string, number>;
  isSaved: (slug: string) => boolean;
  onToggleSaved: (river: BoardItem) => void;
  onOpen: (river: BoardItem) => void;
}) {
  return (
    <View style={styles.sectionStack}>
      <SectionHeading title={boardIntroTitleForMode(mode)} subtitle={sectionSubtitleForMode(mode)} />
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
}: {
  mode: BoardMode;
  rivers: BoardItem[];
  routeCounts: ReadonlyMap<string, number>;
  isSaved: (slug: string) => boolean;
  onToggleSaved: (river: BoardItem) => void;
  onOpen: (river: BoardItem) => void;
}) {
  return (
    <View style={styles.sectionStack}>
      <SectionHeading title={boardIntroTitleForMode(mode)} subtitle={sectionSubtitleForMode(mode)} />
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
          {locationLabel ?? (status === 'denied' ? 'Location access denied' : 'Find routes near me')}
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

function KnownRouteSearch({
  query,
  results,
  routeCounts,
  onChange,
  onOpen,
  onExplore,
}: {
  query: string;
  results: RiverSummaryApiItem[];
  routeCounts: ReadonlyMap<string, number>;
  onChange: (query: string) => void;
  onOpen: (river: RiverSummaryApiItem) => void;
  onExplore: () => void;
}) {
  const active = query.trim().length > 0;

  return (
    <View style={styles.knownSearchCard}>
      <Text style={styles.knownSearchLabel}>Know where you want to go?</Text>
      <View style={styles.knownSearchInputRow}>
        <MaterialCommunityIcons name="magnify" color={colors.accent} size={18} />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={query}
          onChangeText={onChange}
          placeholder="River, reach, region, or state"
          placeholderTextColor={colors.textMuted}
          returnKeyType="search"
          onSubmitEditing={() => {
            if (results[0]) {
              onOpen(results[0]);
              return;
            }

            onExplore();
          }}
          style={styles.knownSearchInput}
        />
        {active ? (
          <Pressable hitSlop={10} onPress={() => onChange('')}>
            <MaterialCommunityIcons name="close-circle" color={colors.textMuted} size={18} />
          </Pressable>
        ) : null}
      </View>
      {active ? (
        <View style={styles.knownSearchResults}>
          {results.length > 0 ? (
            results.map((river) => {
              const routeCount = routeGroupMetaForRoute(river, routeCounts).routeCount;
              return (
                <Pressable key={river.river.slug} style={styles.knownSearchResult} onPress={() => onOpen(river)}>
                  <View style={styles.knownSearchScore}>
                    <Text style={styles.knownSearchScoreText}>{river.score}</Text>
                  </View>
                  <View style={styles.knownSearchCopy}>
                    <Text style={styles.knownSearchName} numberOfLines={1}>{river.river.name}</Text>
                    <Text style={styles.knownSearchMeta} numberOfLines={1}>
                      {[routeReachWithState(river), river.river.region, river.rating, routeCount > 1 ? `${routeCount} routes` : null].filter(Boolean).join(' - ')}
                    </Text>
                  </View>
                </Pressable>
              );
            })
          ) : (
            <View style={styles.knownSearchEmpty}>
              <Text style={styles.knownSearchEmptyTitle}>No supported route found</Text>
              <Pressable onPress={onExplore}>
                <Text style={styles.knownSearchEmptyAction}>Open Explore map</Text>
              </Pressable>
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
}

function ZeroReadyActions({
  onWeekend,
  onExplore,
  onSaved,
}: {
  onWeekend: () => void;
  onExplore: () => void;
  onSaved: () => void;
}) {
  return (
    <View style={styles.zeroReadyCard}>
      <Text style={styles.zeroReadyTitle}>No clean paddles right now</Text>
      <Text style={styles.zeroReadyText}>
        Today is in recheck mode. Use these routes for monitoring, not as go-now recommendations.
      </Text>
      <View style={styles.zeroReadyActions}>
        <Pressable style={styles.zeroReadyPrimary} onPress={onWeekend}>
          <Text style={styles.zeroReadyPrimaryText}>Check Weekend</Text>
        </Pressable>
        <Pressable style={styles.zeroReadySecondary} onPress={onExplore}>
          <Text style={styles.zeroReadySecondaryText}>Browse Rechecks</Text>
        </Pressable>
        <Pressable style={styles.zeroReadySecondary} onPress={onSaved}>
          <Text style={styles.zeroReadySecondaryText}>Saved</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ModeTabs({
  mode,
  counts,
  hasLocation,
  locationStatus,
  onChange,
}: {
  mode: BoardMode;
  counts: Record<BoardMode, number>;
  hasLocation: boolean;
  locationStatus: string;
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
              {modeLabels[item]}
            </Text>
            <Text style={[styles.modeCount, active ? styles.modeCountActive : null]}>
              {item === 'closest' && !hasLocation ? 'GPS' : counts[item]}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
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
            ? 'Location is off. You can still use Recommended, Score ranking, or Confidence first.'
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
      <Text style={styles.emptyTitle}>No supported routes near {locationLabel}</Text>
      <Text style={styles.emptyText}>
        PaddleToday supports select Midwest rivers. Browse the list or request one near you.
      </Text>
      <View style={styles.emptyActions}>
        <Pressable style={styles.emptyPrimaryButton} onPress={onRequestRoute}>
          <Text style={styles.emptyPrimaryButtonText}>Request a Route</Text>
        </Pressable>
        <Pressable style={styles.emptySecondaryButton} onPress={onBrowseRoutes}>
          <Text style={styles.emptySecondaryButtonText}>Browse Supported Rivers</Text>
        </Pressable>
      </View>
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

function routeReachWithState(river: BoardItem | RiverSummaryApiItem) {
  return [river.river.reach, stateAbbreviation(river.river.state)].filter(Boolean).join(' - ');
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
  if (mode === 'certain') return 'High-confidence calls first, then score.';
  return 'Best mix of score, confidence, and drive time. Skip calls stay visible for rechecks.';
}

function headlineLabelForMode(mode: BoardMode, headline: BoardItem | null) {
  if (!headline) return 'Today';
  if (headline.rating === 'No-go') return isNearbyPick(headline) ? 'Best recheck nearby' : 'Best recheck today';
  if (headline.rating === 'Fair') return isNearbyPick(headline) ? 'Maybe nearby with caution' : 'Maybe with caution';
  if (mode === 'closest') return 'Best nearby';
  if (mode === 'score') return 'Best conditions';
  if (mode === 'certain') return 'Confidence pick';
  return isNearbyPick(headline) ? 'Best mix today' : 'Best conditions today';
}

function quickScanSubtitleForMode(mode: BoardMode) {
  if (mode === 'closest') return 'Nearby routes with key trip facts.';
  if (mode === 'score') return 'Rivers ordered by score.';
  if (mode === 'certain') return 'High-confidence calls first, then score.';
  return 'Compact calls for today, including skips worth rechecking.';
}

function boardIntroTitleForMode(mode: BoardMode) {
  if (mode === 'closest') return 'Closest routes';
  if (mode === 'score') return 'Rivers ordered by score';
  if (mode === 'certain') return 'Highest-confidence calls';
  return 'Today\'s route calls';
}

function emptyTitleForMode(mode: BoardMode, hasLocation: boolean, locationStatus: string) {
  if (mode === 'closest' && !hasLocation) {
    return locationStatus === 'requesting' ? 'Finding nearby routes' : 'Location needed';
  }

  return 'Nothing here yet';
}

function homeFactItems(river: BoardItem) {
  return routeFactItems(river.river, {
    travelMinutes: isNearbyPick(river) ? river.travelMinutes : null,
    includeNoCamping: true,
    campingAvailableLabel: 'Camping info',
  }).concat(isNearbyPick(river) ? [distanceLabelForRiver(river)] : []);
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
  knownSearchResults: {
    gap: spacing.xs,
  },
  knownSearchResult: {
    minHeight: 54,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
  },
  knownSearchScore: {
    width: 38,
    height: 38,
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
  },
  knownSearchName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  knownSearchMeta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
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
