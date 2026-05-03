import type { RiverDetailApiResult } from '@paddletoday/api-contract';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, type Region } from 'react-native-maps';
import { useRiverGroupQuery } from '../api/queries';
import { RatingPill } from '../components/rating-pill';
import { SectionCard } from '../components/section-card';
import { StatusPill } from '../components/status-pill';
import { formatGaugeValue, formatRelativeTime, normalizeApiText, verdictForRating } from '../lib/format';
import { colors, radius, shadow, spacing } from '../theme/tokens';

export default function RiverHubScreen() {
  const params = useLocalSearchParams<{ riverId?: string | string[] }>();
  const router = useRouter();
  const riverId = Array.isArray(params.riverId) ? params.riverId[0] : params.riverId ?? '';
  const groupQuery = useRiverGroupQuery(riverId);
  const result = groupQuery.data?.result ?? null;
  const routes = [...(result?.routes ?? [])].sort((left, right) => right.score - left.score);
  const bestRoute = routes[0] ?? null;
  const region = mapRegionForRoutes(routes);

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
          <Text style={styles.kicker}>{result.group.stateSummary} / {result.group.regionSummary}</Text>
          <Text style={styles.title}>{result.group.name}</Text>
          <Text style={styles.subtitle}>
            Compare every tracked stretch on this river. Same river, different scores, gauges, access, and route difficulty.
          </Text>
          <View style={styles.heroMeta}>
            <MetricPill label="Routes" value={String(result.group.routeCount)} />
            <MetricPill label="Updated" value={formatRelativeTime(groupQuery.data?.generatedAt)} />
            {bestRoute ? <MetricPill label="Best now" value={`${bestRoute.score} ${bestRoute.rating}`} /> : null}
          </View>
        </View>

        {bestRoute ? (
          <SectionCard title="Best stretch right now" subtitle={normalizeApiText(bestRoute.explanation)}>
            <RouteChoiceCard route={bestRoute} featured onOpen={() => router.push({ pathname: '/river/[slug]', params: { slug: bestRoute.river.slug } })} />
          </SectionCard>
        ) : null}

        <SectionCard title="Route map" subtitle="Put-ins are plotted for each tracked stretch. Open a route for full access details.">
          <View style={styles.mapFrame}>
            <MapView style={styles.map} initialRegion={region} scrollEnabled={false} zoomEnabled={false} rotateEnabled={false} pitchEnabled={false}>
              {routes.map((route) => (
                <Marker
                  key={route.river.slug}
                  coordinate={{ latitude: route.river.latitude, longitude: route.river.longitude }}
                  pinColor={markerColor(route.rating)}
                  title={route.river.reach}
                  description={`${route.score} ${route.rating}`}
                />
              ))}
            </MapView>
          </View>
        </SectionCard>

        <SectionCard title="All route options" subtitle="Pick the stretch that matches today, your group, and your shuttle plan.">
          <View style={styles.routeList}>
            {routes.map((route) => (
              <RouteChoiceCard
                key={route.river.slug}
                route={route}
                onOpen={() => router.push({ pathname: '/river/[slug]', params: { slug: route.river.slug } })}
              />
            ))}
          </View>
        </SectionCard>
      </ScrollView>
    </>
  );
}

function RouteChoiceCard({
  route,
  featured = false,
  onOpen,
}: {
  route: RiverDetailApiResult;
  featured?: boolean;
  onOpen: () => void;
}) {
  return (
    <Pressable style={[styles.routeCard, featured ? styles.routeCardFeatured : null]} onPress={onOpen}>
      <View style={styles.routeHeader}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreValue}>{route.score}</Text>
          <Text style={styles.scoreLabel}>Score</Text>
        </View>
        <View style={styles.routeCopy}>
          <View style={styles.routeTitleRow}>
            <Text style={styles.routeName}>{route.river.reach}</Text>
            <RatingPill rating={route.rating} />
          </View>
          <Text style={styles.routeVerdict}>
            {verdictForRating(route.rating)} - {normalizeApiText(route.gaugeBandLabel)}
          </Text>
          <Text style={styles.routeSummary}>{normalizeApiText(route.explanation)}</Text>
        </View>
      </View>

      <View style={styles.factRow}>
        <StatusPill status={route.liveData.overall} />
        <Text style={styles.factText}>{route.gauge ? formatGaugeValue(route.gauge.current, route.gauge.unit) : 'Gauge unavailable'}</Text>
        <Text style={styles.factText}>{route.confidence.label} confidence</Text>
        <Text style={styles.factText}>{capitalize(route.river.profile.difficulty)}</Text>
      </View>

      <View style={styles.routeFooter}>
        <Text style={styles.routeFooterText}>{route.river.distanceLabel || 'Distance unavailable'}</Text>
        <Text style={styles.routeFooterLink}>View route</Text>
      </View>
    </Pressable>
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

function mapRegionForRoutes(routes: RiverDetailApiResult[]): Region {
  if (routes.length === 0) {
    return {
      latitude: 44.95,
      longitude: -93.2,
      latitudeDelta: 2,
      longitudeDelta: 2,
    };
  }

  const latitudes = routes.map((route) => route.river.latitude);
  const longitudes = routes.map((route) => route.river.longitude);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLon = Math.min(...longitudes);
  const maxLon = Math.max(...longitudes);

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLon + maxLon) / 2,
    latitudeDelta: Math.max(0.35, (maxLat - minLat) * 1.9),
    longitudeDelta: Math.max(0.35, (maxLon - minLon) * 1.9),
  };
}

function markerColor(rating: RiverDetailApiResult['rating']) {
  if (rating === 'Strong') return colors.strong;
  if (rating === 'Good') return colors.good;
  if (rating === 'Fair') return colors.fair;
  return colors.noGo;
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
    padding: spacing.lg,
    gap: spacing.lg,
  },
  hero: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
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
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  heroMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metricPill: {
    backgroundColor: colors.canvasMuted,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
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
    fontSize: 13,
    fontWeight: '900',
  },
  mapFrame: {
    height: 240,
    overflow: 'hidden',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.canvasMuted,
  },
  map: {
    flex: 1,
  },
  routeList: {
    gap: spacing.md,
  },
  routeCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  routeCardFeatured: {
    backgroundColor: colors.accentSoft,
    borderColor: '#BFD6CC',
  },
  routeHeader: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  scoreBox: {
    width: 66,
    height: 66,
    borderRadius: 19,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    color: colors.accentDeep,
    fontSize: 27,
    fontWeight: '900',
  },
  scoreLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  routeCopy: {
    flex: 1,
    gap: 5,
  },
  routeTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  routeName: {
    flex: 1,
    color: colors.text,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '900',
  },
  routeVerdict: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  routeSummary: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
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
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  routeFooterText: {
    color: colors.textMuted,
    fontSize: 13,
    flex: 1,
  },
  routeFooterLink: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
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
