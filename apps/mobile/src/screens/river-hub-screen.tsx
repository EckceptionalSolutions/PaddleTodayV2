import type { RiverDetailApiResult, ScoreBreakdown } from '@paddletoday/api-contract';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, ImageBackground, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRiverGroupQuery } from '../api/queries';
import { RoutePlotMap, type RoutePlotPoint } from '../components/route-plot-map';
import { SectionCard } from '../components/section-card';
import { StatusPill } from '../components/status-pill';
import { formatRelativeTime, normalizeApiText, verdictForRating } from '../lib/format';
import { photoForRiver } from '../lib/route-photos';
import { colors, radius, shadow, spacing } from '../theme/tokens';

export default function RiverHubScreen() {
  const params = useLocalSearchParams<{ riverId?: string | string[] }>();
  const router = useRouter();
  const [expandedRoutes, setExpandedRoutes] = useState<Set<string>>(() => new Set());
  const riverId = Array.isArray(params.riverId) ? params.riverId[0] : params.riverId ?? '';
  const groupQuery = useRiverGroupQuery(riverId);
  const result = groupQuery.data?.result ?? null;
  const allRoutes = result?.routes ?? [];
  const bestRoute = useMemo(() => [...allRoutes].sort(compareBestRoute)[0] ?? null, [allRoutes]);
  const routes = useMemo(() => [...allRoutes].sort(compareBestRoute), [allRoutes]);
  const routePoints = useMemo(() => routeMapPoints(allRoutes), [allRoutes]);

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

  return (
    <>
      <Stack.Screen options={{ title: result.group.name }} />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            tintColor={colors.accent}
            refreshing={groupQuery.isRefetching}
            onRefresh={() => groupQuery.refetch()}
          />
        }
      >
        <View style={styles.hero}>
          <Text style={styles.kicker}>{result.group.stateSummary}</Text>
          <Text style={styles.title}>{result.group.name} Routes</Text>
          <Text style={styles.subtitle}>{hubStatusLine(summary)}</Text>
          <View style={styles.heroMeta}>
            <MetricPill label="Routes" value={String(result.group.routeCount)} />
            <MetricPill label="Updated" value={compactUpdatedLabel(groupQuery.data?.generatedAt)} />
            <MetricPill label="Paddleable" value={String(summary.paddleable)} />
            <MetricPill label="Skip" value={String(summary.skip)} />
          </View>
        </View>

        <SectionCard title="Choose a stretch" subtitle={comparisonSubtitle(summary)}>
          <View style={styles.routeList}>
            {routes.map((route, index) => (
              <RouteChoiceCard
                key={route.river.slug}
                route={route}
                rank={index + 1}
                recommended={index === 0}
                expanded={expandedRoutes.has(route.river.slug)}
                onToggleExpanded={() => toggleExpandedRoute(route.river.slug)}
                onOpen={() => router.push({ pathname: '/river/[slug]', params: { slug: route.river.slug } })}
              />
            ))}
          </View>
        </SectionCard>

        <SectionCard title="Route score map" subtitle="Approximate put-ins by today's score.">
          <View style={styles.mapFrame}>
            <RoutePlotMap points={routePoints} selectedId={bestRoute?.river.slug ?? null} height={158} showFooter={false} fullBleed />
          </View>
        </SectionCard>
      </ScrollView>
    </>
  );
}

function RouteChoiceCard({
  route,
  rank,
  recommended = false,
  expanded,
  onToggleExpanded,
  onOpen,
}: {
  route: RiverDetailApiResult;
  rank?: number;
  recommended?: boolean;
  expanded: boolean;
  onToggleExpanded: () => void;
  onOpen: () => void;
}) {
  return (
    <View style={[styles.routeCard, recommended ? styles.routeCardRecommended : null]}>
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
  return routes.map((route) => ({
    id: route.river.slug,
    label: route.river.reach,
    latitude: route.river.latitude,
    longitude: route.river.longitude,
    score: route.score,
    rating: route.rating,
    meta: `${route.score} ${route.rating}`,
  }));
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

function hubStatusLine(summary: { paddleable: number; skip: number }) {
  const paddleable = `${summary.paddleable} paddleable today`;
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

function comparableDistance(route: RiverDetailApiResult) {
  const match = route.river.distanceLabel.match(/(\d+(?:\.\d+)?)/);
  const value = match ? Number(match[1]) : Number.POSITIVE_INFINITY;
  return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
}

function compactUpdatedLabel(value: string | undefined) {
  return formatRelativeTime(value).replace(/^Updated\s+/i, '');
}

function compactPaddleTime(value: string) {
  if (!value) return 'Unknown';
  return value
    .replace(/^About\s+/i, '')
    .replace(/roughly\s+/i, '')
    .replace(/\s+depending.*$/i, '')
    .replace(/\s+longer.*$/i, '')
    .replace(/\s+hr\b/gi, 'h')
    .replace(/\s+min\b/gi, 'm')
    .replace(/\s+to\s+/gi, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function routeMetaLine(route: RiverDetailApiResult) {
  return [route.river.distanceLabel, compactPaddleTime(route.river.estimatedPaddleTime), capitalize(route.river.profile.difficulty)]
    .filter(Boolean)
    .join(' - ');
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

  if (/Near-freezing air caps today at 70\./i.test(normalized)) {
    return 'Cold air keeps today from scoring higher, even if the river itself looks good.';
  }

  if (/High wind caps today at 75\./i.test(normalized)) {
    return 'Strong wind puts a ceiling on today, even if the gauge is in range.';
  }

  if (/Imminent heavy rain caps today at 65\./i.test(normalized)) {
    return 'Rain is expected soon, so today stays in the cautious range.';
  }

  if (/Minimum-only guidance caps the trip score at 74\./i.test(normalized)) {
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

function capitalize(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
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
    padding: spacing.md,
    gap: spacing.sm,
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
    fontSize: 27,
    lineHeight: 32,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
  },
  heroMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metricPill: {
    backgroundColor: colors.canvasMuted,
    borderRadius: radius.pill,
    paddingHorizontal: 11,
    paddingVertical: 7,
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
    fontSize: 13,
    fontWeight: '900',
  },
  mapFrame: {
    height: 160,
    overflow: 'hidden',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.canvasMuted,
  },
  routeList: {
    gap: spacing.sm,
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
