import type { RiverDetailApiResult, ScoreBreakdown } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRiverGeometryQuery, useRiverGroupQuery } from '../api/queries';
import { RoutePlotMap, type RoutePlotPoint } from '../components/route-plot-map';
import { SaveToggleButton } from '../components/save-toggle-button';
import { SectionCard } from '../components/section-card';
import { StatusPill } from '../components/status-pill';
import { normalizeApiText, verdictForRating } from '../lib/format';
import { photoForRiver } from '../lib/route-photos';
import { routePreviewFactLine } from '../lib/route-facts';
import { endpointSnappedRouteCoordinates } from '../lib/river-geometry';
import { androidBottomInset } from '../lib/safe-area';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, shadow, spacing } from '../theme/tokens';

const SORT_MODES = ['Best', 'Shortest', 'Easiest', 'Confidence'] as const;
type SortMode = (typeof SORT_MODES)[number];
type MapCoordinate = { latitude: number; longitude: number };
type HubAccessPoint = NonNullable<RiverDetailApiResult['river']['accessPoints']>[number];

export default function RiverHubScreen() {
  const params = useLocalSearchParams<{ riverId?: string | string[] }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [expandedRoutes, setExpandedRoutes] = useState<Set<string>>(() => new Set());
  const [selectedRouteSlug, setSelectedRouteSlug] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('Best');
  const listRef = useRef<FlatList<RiverDetailApiResult> | null>(null);
  const riverId = Array.isArray(params.riverId) ? params.riverId[0] : params.riverId ?? '';
  const groupQuery = useRiverGroupQuery(riverId);
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const result = groupQuery.data?.result ?? null;
  const allRoutes = result?.routes ?? [];
  const bestRoute = useMemo(() => [...allRoutes].sort(compareBestRoute)[0] ?? null, [allRoutes]);
  const routes = useMemo(() => sortedRoutes(allRoutes, sortMode), [allRoutes, sortMode]);
  const routePoints = useMemo(() => routeMapPoints(allRoutes), [allRoutes]);
  const selectedGeometryQuery = useRiverGeometryQuery(selectedRouteSlug ?? '');
  const selectedRoute = allRoutes.find((route) => route.river.slug === selectedRouteSlug) ?? null;
  const selectedCanonicalSpan = useMemo(
    () => (selectedRoute ? endpointSnappedRouteCoordinates(selectedGeometryQuery.data, routeSpanCoordinates(selectedRoute)) : null),
    [selectedGeometryQuery.data, selectedRoute]
  );
  const canonicalSpans = useMemo(
    () => (selectedRouteSlug && selectedCanonicalSpan ? new Map([[selectedRouteSlug, selectedCanonicalSpan]]) : undefined),
    [selectedCanonicalSpan, selectedRouteSlug]
  );

  useEffect(() => {
    if (routes.length === 0) {
      setSelectedRouteSlug(null);
      return;
    }

    setSelectedRouteSlug((current) => {
      if (current && routes.some((route) => route.river.slug === current)) {
        return current;
      }

      return bestRoute?.river.slug ?? routes[0].river.slug;
    });
  }, [bestRoute?.river.slug, routes]);

  if (!riverId) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.stateTitle}>River hub is missing.</Text>
      </View>
    );
  }

  if (groupQuery.isLoading && !result) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.stateTitle}>Loading river hub</Text>
        <Text style={styles.stateBody}>Comparing the routes on this river.</Text>
      </View>
    );
  }

  if (groupQuery.isError && !result) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.stateTitle}>This river hub did not load.</Text>
        <Text style={styles.stateBody}>Couldn't load river routes. Pull to retry from the previous screen.</Text>
      </View>
    );
  }

  if (!result) {
    return null;
  }

  const summary = routeStatusSummary(allRoutes);
  const planningStats = routePlanningStats(allRoutes);
  const bottomContentInset = androidBottomInset(insets.bottom);

  function toggleExpandedRoute(slug: string) {
    setExpandedRoutes((current) => {
      const next = new Set(current);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  function selectRouteFromMap(slug: string) {
    setSelectedRouteSlug(slug);
    const index = routes.findIndex((route) => route.river.slug === slug);
    if (index >= 0) {
      listRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.2 });
    }
  }

  function renderRoute({ item: route, index }: { item: RiverDetailApiResult; index: number }) {
    return (
      <RouteChoiceCard
        route={route}
        rank={index + 1}
        recommended={index === 0}
        selected={route.river.slug === selectedRouteSlug}
        saved={isSaved(route.river.slug)}
        expanded={expandedRoutes.has(route.river.slug)}
        onToggleExpanded={() => toggleExpandedRoute(route.river.slug)}
        onToggleSaved={() =>
          void toggleSavedRiver({
            slug: route.river.slug,
            riverId: route.river.riverId,
            name: route.river.name,
            reach: route.river.reach,
          })
        }
        onOpen={() => router.push({ pathname: '/river/[slug]', params: { slug: route.river.slug } })}
      />
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: result.group.name }} />
      <FlatList
        ref={listRef}
        data={routes}
        keyExtractor={(route) => route.river.slug}
        renderItem={renderRoute}
        style={styles.screen}
        contentContainerStyle={[styles.content, { paddingBottom: spacing.xl + bottomContentInset }]}
        initialNumToRender={8}
        maxToRenderPerBatch={6}
        windowSize={7}
        removeClippedSubviews
        onScrollToIndexFailed={({ index, averageItemLength }) => {
          listRef.current?.scrollToOffset({
            offset: Math.max(0, averageItemLength * index),
            animated: true,
          });
        }}
        refreshControl={
          <RefreshControl
            tintColor={colors.accent}
            refreshing={groupQuery.isRefetching}
            onRefresh={() => groupQuery.refetch()}
          />
        }
        ListHeaderComponent={
          <>
            <View style={styles.hero}>
              <Text style={styles.kicker}>{result.group.stateSummary}</Text>
              <Text style={styles.title}>{result.group.name} Routes</Text>
              <Text style={styles.subtitle}>{hubStatusLine(summary, result.group.routeCount)}</Text>
              <View style={styles.heroMeta}>
                <MetricPill label="Routes" value={String(result.group.routeCount)} />
                <MetricPill label="Paddleable" value={String(summary.paddleable)} />
                <MetricPill label="Skip" value={String(summary.skip)} />
              </View>
            </View>

            <View style={styles.mapSection}>
              <SectionCard title="Route map" subtitle="Tap a score to jump to that stretch.">
                <View style={styles.mapFrame}>
                  <RoutePlotMap
                    points={routePoints}
                    selectedId={selectedRouteSlug}
                    canonicalSpans={canonicalSpans}
                    height={220}
                    fitToAllOnReady
                    fullBleed
                    onSelectPoint={(point) => selectRouteFromMap(point.id)}
                  />
                </View>
              </SectionCard>
            </View>

            <View style={styles.listIntro}>
              <Text style={styles.listIntroTitle}>Choose a stretch</Text>
              <Text style={styles.listIntroSubtitle}>{comparisonSubtitle(summary)}</Text>
              <View style={styles.sortTabs}>
                {SORT_MODES.map((mode) => (
                  <Pressable
                    key={mode}
                    style={[styles.sortTab, sortMode === mode ? styles.sortTabSelected : null]}
                    onPress={() => setSortMode(mode)}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: sortMode === mode }}
                  >
                    <MaterialCommunityIcons name={sortIcon(mode) as never} color={sortMode === mode ? colors.surfaceStrong : colors.accent} size={15} />
                    <Text style={[styles.sortTabText, sortMode === mode ? styles.sortTabTextSelected : null]}>{mode}</Text>
                  </Pressable>
                ))}
              </View>
              <View style={styles.planningGrid}>
                <PlanningStat label="Best score" value={planningStats.bestScoreLabel} />
                <PlanningStat label="Shortest" value={planningStats.shortestLabel} />
                <PlanningStat label="Easiest" value={planningStats.easyCountLabel} />
                <PlanningStat label="Paddleable" value={planningStats.paddleableLabel} />
              </View>
            </View>
          </>
        }
      />
    </>
  );
}

function RouteChoiceCard({
  route,
  rank,
  recommended = false,
  selected,
  saved,
  expanded,
  onToggleExpanded,
  onToggleSaved,
  onOpen,
}: {
  route: RiverDetailApiResult;
  rank?: number;
  recommended?: boolean;
  selected: boolean;
  saved: boolean;
  expanded: boolean;
  onToggleExpanded: () => void;
  onToggleSaved: () => void;
  onOpen: () => void;
}) {
  return (
    <View style={[styles.routeCard, recommended ? styles.routeCardRecommended : null, selected ? styles.routeCardSelected : null]}>
      <Pressable style={styles.routeMainRow} onPress={onOpen} android_ripple={{ color: colors.canvasMuted }}>
        <View style={styles.routeThumb}>
          <ImageBackground
            source={{ uri: photoForRiver(route.river) }}
            style={styles.routeThumbImage}
            imageStyle={styles.routeThumbRadius}
          >
            <View style={[styles.routeThumbScore, toneScoreBox(route.rating)]}>
              <Text style={styles.routeThumbScoreValue}>{route.score}</Text>
              <Text style={styles.routeThumbScoreLabel}>{route.rating}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.routeCopy}>
          <View style={styles.routeBadgeRow}>
            {recommended ? <Text style={styles.recommendedBadge}>Best today</Text> : null}
            {rank ? <Text style={styles.routeRank}>Rank #{rank}</Text> : null}
            <SaveToggleButton compact saved={saved} onPress={onToggleSaved} />
          </View>
          <Text style={styles.routeName} numberOfLines={2}>{route.river.reach}</Text>
          <Text style={styles.routeVerdict}>{verdictForRating(route.rating)}</Text>
          <Text style={styles.routeMeta} numberOfLines={1}>{routeMetaLine(route)}</Text>
        </View>
      </Pressable>

      <View style={styles.reasonChips}>
        <StatusPill status={route.liveData.overall} />
        <ReasonChip label={normalizeApiText(route.gaugeBandLabel)} />
        <ReasonChip label={`${route.confidence.label} confidence`} />
        <ReasonChip label={sourceStrengthLabel(route)} />
        {route.weather?.windMph ? <ReasonChip label={`${Math.round(route.weather.windMph)} mph wind`} /> : null}
      </View>

      {expanded ? <ScoreBreakdownPanel route={route} /> : null}

      <View style={styles.routeFooter}>
        <Pressable onPress={onToggleExpanded} hitSlop={8}>
          <Text style={styles.whyButton}>{expanded ? 'Hide score details' : 'Why this score?'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ScoreBreakdownPanel({ route }: { route: RiverDetailApiResult }) {
  const breakdown = route.scoreBreakdown;
  const rows = scoreBreakdownRows(breakdown);
  const capReasons = breakdown.capReasons
    .map((reason) => friendlyCapReason(reason))
    .filter((reason) => reason.length > 0);

  return (
    <View style={styles.scoreBreakdownPanel}>
      <Text style={styles.scoreBreakdownSummary}>
        River quality starts at {breakdown.riverQuality}. Weather shifts it to {breakdown.finalScore} today.
      </Text>
      <View style={styles.scoreBreakdownRows}>
        {rows.map((row) => (
          <View key={row.label} style={styles.scoreBreakdownRow}>
            <Text style={styles.scoreBreakdownLabel}>{row.label}</Text>
            <Text style={[styles.scoreBreakdownValue, scoreBreakdownValueTone(row.value)]}>
              {signedPoints(row.value)}
            </Text>
          </View>
        ))}
      </View>
      {capReasons.length > 0 ? (
        <View style={styles.scoreCapPanel}>
          <Text style={styles.scoreCapTitle}>What held today's score back</Text>
          {capReasons.map((reason) => (
            <Text key={reason} style={styles.scoreCapText}>- {reason}</Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function ReasonChip({ label }: { label: string }) {
  return (
    <View style={styles.reasonChip}>
      <Text style={styles.reasonChipText}>{label}</Text>
    </View>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricPill}>
      <Text style={styles.metricPillLabel}>{label}</Text>
      <Text style={styles.metricPillValue}>{value}</Text>
    </View>
  );
}

function routeMapPoints(routes: RiverDetailApiResult[]): RoutePlotPoint[] {
  return routes.map((route) => {
    const spanCoordinates = routeSpanCoordinates(route);
    const markerCoordinate = mapMarkerCoordinate(route, spanCoordinates);

    return {
      id: route.river.slug,
      label: route.river.reach,
      latitude: markerCoordinate.latitude,
      longitude: markerCoordinate.longitude,
      score: route.score,
      rating: route.rating,
      spanCoordinates,
      meta: [accessPointCountLabel(route), `${route.score} ${route.rating}`].filter(Boolean).join(' - '),
    };
  });
}

function mapMarkerCoordinate(route: RiverDetailApiResult, spanCoordinates: MapCoordinate[] | null): MapCoordinate {
  if (spanCoordinates && spanCoordinates.length >= 2) {
    const start = spanCoordinates[0];
    const end = spanCoordinates[spanCoordinates.length - 1];
    return {
      latitude: (start.latitude + end.latitude) / 2,
      longitude: (start.longitude + end.longitude) / 2,
    };
  }

  return {
    latitude: route.river.latitude,
    longitude: route.river.longitude,
  };
}

function routeSpanCoordinates(route: RiverDetailApiResult): MapCoordinate[] | null {
  const accessPoints = route.river.accessPoints
    ?.map((point) => ({ point, coordinate: accessCoordinate(point) }))
    .filter(hasMappedAccessCoordinate)
    .sort((left, right) => left.point.mileFromStart - right.point.mileFromStart);

  if (accessPoints && accessPoints.length >= 2) {
    return accessPoints.map((entry) => entry.coordinate);
  }

  const endpoints = [accessCoordinate(route.river.putIn), accessCoordinate(route.river.takeOut)].filter(isMapCoordinate);
  if (endpoints.length >= 2) {
    return endpoints;
  }

  return null;
}

function accessPointCountLabel(route: RiverDetailApiResult) {
  const accessPointCount = route.river.accessPoints?.filter((point) => accessCoordinate(point)).length ?? 0;
  if (accessPointCount > 2) {
    return `${accessPointCount} access points`;
  }

  return null;
}

function accessCoordinate(point: { latitude?: number; longitude?: number } | null | undefined): MapCoordinate | null {
  if (!point || !Number.isFinite(point.latitude) || !Number.isFinite(point.longitude)) {
    return null;
  }

  return {
    latitude: point.latitude as number,
    longitude: point.longitude as number,
  };
}

function isMapCoordinate(coordinate: MapCoordinate | null): coordinate is MapCoordinate {
  return coordinate !== null;
}

function hasMappedAccessCoordinate(
  entry: { point: HubAccessPoint; coordinate: MapCoordinate | null }
): entry is { point: HubAccessPoint; coordinate: MapCoordinate } {
  return entry.coordinate !== null;
}

function PlanningStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.planningStat}>
      <Text style={styles.planningStatLabel}>{label}</Text>
      <Text style={styles.planningStatValue} numberOfLines={1}>{value}</Text>
    </View>
  );
}

function routeStatusSummary(routes: RiverDetailApiResult[]) {
  return routes.reduce(
    (summary, route) => {
      if (route.rating === 'Strong' || route.rating === 'Good') {
        summary.paddleable += 1;
      } else {
        summary.skip += 1;
      }
      return summary;
    },
    { paddleable: 0, skip: 0 }
  );
}

function hubStatusLine(summary: { paddleable: number; skip: number }, total: number) {
  const paddleable = `${summary.paddleable} of ${total} paddleable today`;
  const skips = `${summary.skip} skip${summary.skip === 1 ? '' : 's'}`;
  return [paddleable, skips].join(' - ');
}

function comparisonSubtitle(summary: { paddleable: number; skip: number }) {
  const paddleableLabel = `${summary.paddleable} paddleable`;
  const skipLabel = `${summary.skip} skip${summary.skip === 1 ? '' : 's'}`;
  return `${paddleableLabel}, ${skipLabel}. Ranked by today's score.`;
}

function compareBestRoute(left: RiverDetailApiResult, right: RiverDetailApiResult) {
  return right.score - left.score || right.confidence.score - left.confidence.score || comparableDistance(left) - comparableDistance(right);
}

function sortedRoutes(routes: RiverDetailApiResult[], sortMode: SortMode) {
  const sorted = [...routes];
  if (sortMode === 'Shortest') {
    return sorted.sort((left, right) => comparableDistance(left) - comparableDistance(right) || compareBestRoute(left, right));
  }

  if (sortMode === 'Easiest') {
    return sorted.sort((left, right) => difficultyRank(left) - difficultyRank(right) || compareBestRoute(left, right));
  }

  if (sortMode === 'Confidence') {
    return sorted.sort((left, right) => right.confidence.score - left.confidence.score || compareBestRoute(left, right));
  }

  return sorted.sort(compareBestRoute);
}

function comparableDistance(route: RiverDetailApiResult) {
  const match = route.river.distanceLabel.match(/(\d+(?:\.\d+)?)/);
  const value = match ? Number(match[1]) : Number.POSITIVE_INFINITY;
  return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
}

function difficultyRank(route: RiverDetailApiResult) {
  if (route.river.profile.difficulty === 'easy') return 0;
  if (route.river.profile.difficulty === 'moderate') return 1;
  return 2;
}

function routePlanningStats(routes: RiverDetailApiResult[]) {
  const shortest = [...routes].sort((left, right) => comparableDistance(left) - comparableDistance(right))[0];
  const easyCount = routes.filter((route) => route.river.profile.difficulty === 'easy').length;
  const bestScore = [...routes].sort(compareBestRoute)[0]?.score;
  const summary = routeStatusSummary(routes);

  return {
    bestScoreLabel: typeof bestScore === 'number' ? String(bestScore) : 'Unknown',
    shortestLabel: shortest?.river.distanceLabel || 'Unknown',
    easyCountLabel: `${easyCount} easy`,
    paddleableLabel: `${summary.paddleable}/${routes.length}`,
  };
}

function sortIcon(sortMode: SortMode) {
  if (sortMode === 'Shortest') return 'map-marker-distance';
  if (sortMode === 'Easiest') return 'waves';
  if (sortMode === 'Confidence') return 'shield-check-outline';
  return 'star-outline';
}

function sourceStrengthLabel(route: RiverDetailApiResult) {
  const strength = route.river.profile.thresholdSourceStrength;
  if (strength === 'official') return 'Official thresholds';
  if (strength === 'mixed') return 'Mixed sources';
  if (strength === 'derived') return 'Derived thresholds';
  return 'Community thresholds';
}

function routeMetaLine(route: RiverDetailApiResult) {
  return routePreviewFactLine(route.river);
}

function scoreBreakdownRows(breakdown: ScoreBreakdown) {
  const rows = [
    { label: 'River quality', value: breakdown.riverQuality },
    { label: 'Wind', value: breakdown.windAdjustment },
    { label: 'Temperature', value: breakdown.temperatureAdjustment },
    { label: 'Rain timing', value: breakdown.rainAdjustment },
  ];

  if (breakdown.comfortAdjustment !== 0) {
    rows.push({ label: 'Other', value: breakdown.comfortAdjustment });
  }

  if (breakdown.finalScore !== breakdown.rawTripScore) {
    rows.push({ label: 'Limit applied', value: breakdown.finalScore - breakdown.rawTripScore });
  }

  return rows;
}

function signedPoints(value: number) {
  if (value > 0) return `+${value}`;
  return String(value);
}

function scoreBreakdownValueTone(value: number) {
  if (value > 0) {
    return { color: colors.accentDeep };
  }

  if (value < 0) {
    return { color: colors.noGo };
  }

  return { color: colors.textMuted };
}

function friendlyCapReason(reason: string) {
  const normalized = String(reason || '').trim();
  if (!normalized) {
    return '';
  }

  if (/Near-freezing air caps today at 70\.|Cold air limits today's score to 70 or lower\./i.test(normalized)) {
    return 'Cold air keeps today from scoring higher, even if the river itself looks good.';
  }

  if (/High wind caps today at 75\.|Strong wind limits today's score to 75 or lower\./i.test(normalized)) {
    return 'Strong wind puts a ceiling on today, even if the gauge is in range.';
  }

  if (/Imminent heavy rain caps today at 65\.|Heavy rain or storms likely soon limit the score to 65\.|Heavy rain or storms likely soon limit today's score to 65 or lower\./i.test(normalized)) {
    return 'Heavy rain or storms likely within 3 hours limit the score to 65.';
  }

  if (/Minimum-only guidance caps the trip score at 74\.|This route has minimum-only gauge guidance, so today's score is limited to 74 or lower\./i.test(normalized)) {
    return 'This route only has a reliable low-water floor, so the score stops short of the top range.';
  }

  return normalized;
}

function toneScoreBox(rating: RiverDetailApiResult['rating']) {
  if (rating === 'Strong' || rating === 'Good') {
    return { backgroundColor: colors.accentSoft };
  }

  if (rating === 'Fair') {
    return { backgroundColor: '#EFE7D0' };
  }

  return { backgroundColor: '#F0DDD3' };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
  },
  hero: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: 10,
    ...shadow,
  },
  kicker: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
  },
  heroMeta: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: spacing.sm,
  },
  metricPill: {
    flex: 1,
    backgroundColor: colors.canvasMuted,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 9,
    gap: 2,
  },
  metricPillLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  metricPillValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  mapSection: {
    ...shadow,
  },
  mapFrame: {
    overflow: 'hidden',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.canvasMuted,
  },
  listIntro: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 3,
    ...shadow,
  },
  listIntroTitle: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '900',
  },
  listIntroSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  sortTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: spacing.sm,
  },
  sortTab: {
    minHeight: 34,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  sortTabSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  sortTabText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  sortTabTextSelected: {
    color: colors.surfaceStrong,
  },
  planningGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  planningStat: {
    flexGrow: 1,
    flexBasis: '47%',
    minHeight: 50,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    gap: 3,
  },
  planningStatLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  planningStatValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  routeCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
    gap: 7,
    overflow: 'hidden',
  },
  routeCardRecommended: {
    backgroundColor: colors.accentSoft,
    borderColor: '#BFD6CC',
  },
  routeCardSelected: {
    borderColor: colors.accent,
  },
  routeMainRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  routeThumb: {
    width: 76,
    height: 76,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.canvasMuted,
  },
  routeThumbImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 6,
  },
  routeThumbRadius: {
    borderRadius: radius.md,
  },
  routeThumbScore: {
    minWidth: 36,
    minHeight: 32,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  routeThumbScoreValue: {
    color: colors.accentDeep,
    fontSize: 18,
    lineHeight: 19,
    fontWeight: '900',
  },
  routeThumbScoreLabel: {
    color: colors.accentDeep,
    fontSize: 8,
    lineHeight: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  routeCopy: {
    flex: 1,
    gap: 3,
    paddingTop: 1,
  },
  routeBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  recommendedBadge: {
    color: colors.accentDeep,
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.pill,
    overflow: 'hidden',
    paddingHorizontal: 7,
    paddingVertical: 2,
    fontSize: 10,
    fontWeight: '900',
  },
  routeName: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '900',
  },
  routeVerdict: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  routeMeta: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
  },
  routeRank: {
    color: colors.accentDeep,
    fontSize: 11,
    fontWeight: '900',
  },
  reasonChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  reasonChip: {
    minHeight: 23,
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  reasonChipText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
  },
  factRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
  },
  factText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  routeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: spacing.md,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  whyButton: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  scoreBreakdownPanel: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  scoreBreakdownSummary: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
  },
  scoreBreakdownRows: {
    gap: 6,
  },
  scoreBreakdownRow: {
    minHeight: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  scoreBreakdownLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
  },
  scoreBreakdownValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  scoreCapPanel: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    gap: 4,
  },
  scoreCapTitle: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  scoreCapText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
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
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  stateBody: {
    color: colors.textMuted,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
