import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRiverSummaryQuery } from '../api/queries';
import { RiverCard } from '../components/river-card';
import { SectionCard } from '../components/section-card';
import { useStoredLocation } from '../hooks/use-stored-location';
import { formatRelativeTime, normalizeApiText, verdictForRating } from '../lib/format';
import { formatTravelTime } from '../lib/location';
import { mapUrlForAccessPoint } from '../lib/maps';
import {
  buildBoardSnapshot,
  selectNearbyPicks,
  selectTopPicks,
  type NearbyRiverPick,
} from '../lib/ranking';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, shadow, spacing } from '../theme/tokens';

export default function HomeScreen() {
  const router = useRouter();
  const summaryQuery = useRiverSummaryQuery();
  const { location, status, requestLocation, clearLocation } = useStoredLocation();
  const { savedRivers, isSaved, toggleSavedRiver } = useSavedRivers();

  const rivers = summaryQuery.data?.rivers ?? [];
  const snapshot = buildBoardSnapshot(rivers);
  const topPicks = selectTopPicks(rivers, 6);
  const nearbyPicks = location ? selectNearbyPicks(rivers, location, 5) : [];
  const bestPick = nearbyPicks[0] ?? topPicks[0] ?? null;
  const savedRiverLookup = new Map(savedRivers.map((river) => [river.slug, river]));
  const savedPicks = rivers
    .filter((river) => savedRiverLookup.has(river.river.slug))
    .sort(
      (left, right) =>
        (savedRiverLookup.get(right.river.slug)?.savedAt ?? '').localeCompare(
          savedRiverLookup.get(left.river.slug)?.savedAt ?? ''
        )
    )
    .slice(0, 3);

  if (summaryQuery.isLoading && rivers.length === 0) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.stateTitle}>Loading today's river board</Text>
        <Text style={styles.stateBody}>Pulling the latest snapshot-backed calls.</Text>
      </View>
    );
  }

  if (summaryQuery.isError && rivers.length === 0) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.stateTitle}>The river board did not load.</Text>
        <Text style={styles.stateBody}>Couldn't load river data. Pull to retry.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          tintColor={colors.accent}
          refreshing={summaryQuery.isRefetching}
          onRefresh={() => summaryQuery.refetch()}
        />
      }
    >
      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={styles.kicker}>Paddle Today</Text>
          <Text style={styles.title}>Today's best paddle call</Text>
          <Text style={styles.subtitle}>
            The first card is the route most worth checking right now. Add location to make the call practical.
          </Text>
        </View>
        <Text style={styles.freshness}>{formatRelativeTime(summaryQuery.data?.generatedAt)}</Text>
      </View>

      <View style={styles.snapshotRow}>
        <SnapshotStat label="Paddleable" value={snapshot.paddleable} tone={styles.snapshotStrong} />
        <SnapshotStat label="Watch" value={snapshot.watch} tone={styles.snapshotFair} />
        <SnapshotStat label="Skip" value={snapshot.skip} tone={styles.snapshotNoGo} />
      </View>

      {bestPick ? (
        <BestPickCard
          river={bestPick}
          locationActive={Boolean(location)}
          travelLabel={'travelMinutes' in bestPick ? formatTravelTime(bestPick.travelMinutes) : undefined}
          saved={isSaved(bestPick.river.slug)}
          onOpen={() => router.push({ pathname: '/river/[slug]', params: { slug: bestPick.river.slug } })}
          onToggleSaved={() => void toggleSavedRiver(toSavedRiver(bestPick))}
          onDirections={() => void openRouteDirections(bestPick)}
        />
      ) : (
        <SectionCard title="No current pick" subtitle="The river board did not return any routes. Pull to refresh." />
      )}

      <SectionCard
        title={location ? `Nearby from ${location.label}` : 'Unlock nearby picks'}
        subtitle={
          location
            ? 'Distance trims the score so the list stays useful on a real trip day.'
            : 'Use device location to put drive time into the recommendation.'
        }
        accessory={
          location ? (
            <Pressable onPress={() => void clearLocation()}>
              <Text style={styles.linkText}>Clear</Text>
            </Pressable>
          ) : undefined
        }
      >
        {location ? (
          nearbyPicks.length > 0 ? (
            <View style={styles.list}>
              {nearbyPicks.slice(bestPick ? 1 : 0, 4).map((river) => (
                <RiverCard
                  key={river.river.slug}
                  river={river}
                  saved={isSaved(river.river.slug)}
                  travelLabel={formatTravelTime(river.travelMinutes)}
                  onToggleSaved={() => void toggleSavedRiver(toSavedRiver(river))}
                  onPress={() => router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug } })}
                />
              ))}
              {nearbyPicks.length <= 1 ? (
                <Text style={styles.emptyText}>No additional nearby routes fit the current day-trip window.</Text>
              ) : null}
            </View>
          ) : (
            <Text style={styles.emptyText}>No routes are ranking inside a 3-hour day-trip window yet.</Text>
          )
        ) : (
          <LocationCallout status={status} onRequest={() => void requestLocation()} />
        )}
      </SectionCard>

      {savedPicks.length > 0 ? (
        <SectionCard title="Saved routes" subtitle="Your repeat checks stay close to the top.">
          <View style={styles.list}>
            {savedPicks.map((river) => (
              <RiverCard
                key={river.river.slug}
                river={river}
                saved={isSaved(river.river.slug)}
                onToggleSaved={() => void toggleSavedRiver(toSavedRiver(river))}
                onPress={() => router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug } })}
              />
            ))}
          </View>
        </SectionCard>
      ) : null}

      <SectionCard
        title="Top routes today"
        subtitle="The strongest current calls by live data, confidence, and score."
      >
        <View style={styles.list}>
          {topPicks
            .filter((river) => river.river.slug !== bestPick?.river.slug)
            .slice(0, 4)
            .map((river) => (
              <RiverCard
                key={river.river.slug}
                river={river}
                saved={isSaved(river.river.slug)}
                onToggleSaved={() => void toggleSavedRiver(toSavedRiver(river))}
                onPress={() => router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug } })}
              />
          ))}
        </View>
      </SectionCard>

      <Pressable style={styles.requestRouteCallout} onPress={() => router.push('/request-route')}>
        <View style={styles.requestRouteCopy}>
          <Text style={styles.requestRouteLabel}>Missing a route?</Text>
          <Text style={styles.requestRouteTitle}>Request a river or route</Text>
          <Text style={styles.requestRouteBody}>
            Send the basics and any source links you know so it can be reviewed for Paddle Today.
          </Text>
        </View>
        <Text style={styles.requestRouteAction}>Open</Text>
      </Pressable>
    </ScrollView>
  );
}

function BestPickCard({
  river,
  locationActive,
  travelLabel,
  saved,
  onOpen,
  onToggleSaved,
  onDirections,
}: {
  river: RiverSummaryApiItem | NearbyRiverPick;
  locationActive: boolean;
  travelLabel?: string;
  saved: boolean;
  onOpen: () => void;
  onToggleSaved: () => void;
  onDirections: () => void;
}) {
  return (
    <View style={styles.bestCard}>
      <View style={styles.bestHeader}>
        <View style={styles.bestHeaderCopy}>
          <Text style={styles.bestLabel}>{locationActive ? "Today's Best Nearby" : "Today's Best"}</Text>
          <Text style={styles.bestName}>{river.river.name}</Text>
          <Text style={styles.bestReach}>{river.river.reach}</Text>
        </View>
        <View style={styles.bestScore}>
          <Text style={styles.bestScoreValue}>{river.score}</Text>
          <Text style={styles.bestScoreLabel}>{river.rating}</Text>
        </View>
      </View>

      <Text style={styles.bestVerdict}>
        {verdictForRating(river.rating)} - {normalizeApiText(river.summary.shortExplanation)}
      </Text>

      <View style={styles.bestMetaGrid}>
        <MiniMetric label="Gauge" value={river.summary.gaugeNow} />
        <MiniMetric label="Confidence" value={`${river.confidence.label} confidence`} />
        <MiniMetric label="Data" value={river.summary.freshnessText} />
        <MiniMetric label="Distance" value={travelLabel ?? river.river.region} />
      </View>

      <Text style={styles.bestReason}>{normalizeApiText(river.summary.cardText)}</Text>

      <View style={styles.bestActions}>
        <Pressable style={styles.primaryButton} onPress={onOpen}>
          <Text style={styles.primaryButtonText}>View route</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={onToggleSaved}>
          <Text style={styles.secondaryButtonText}>{saved ? 'Saved' : 'Save'}</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={onDirections}>
          <Text style={styles.secondaryButtonText}>Directions</Text>
        </Pressable>
      </View>
    </View>
  );
}

function LocationCallout({ status, onRequest }: { status: string; onRequest: () => void }) {
  return (
    <View style={styles.locationCallout}>
      <Text style={styles.locationTitle}>
        {status === 'denied' ? 'Location access was denied.' : 'Find the best route near you.'}
      </Text>
      <Text style={styles.locationBody}>
        Nearby mode ranks routes by current score and realistic drive time, then keeps anything outside a day-trip window out of the way.
      </Text>
      <Pressable
        style={[styles.primaryButton, status === 'requesting' ? styles.primaryButtonDisabled : null]}
        onPress={onRequest}
        disabled={status === 'requesting'}
      >
        <Text style={styles.primaryButtonText}>
          {status === 'requesting' ? 'Checking location...' : 'Use my location'}
        </Text>
      </Pressable>
    </View>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.miniMetric}>
      <Text style={styles.miniMetricLabel}>{label}</Text>
      <Text style={styles.miniMetricValue} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

function SnapshotStat({ label, value, tone }: { label: string; value: number; tone: object }) {
  return (
    <View style={[styles.snapshotCard, tone]}>
      <Text style={styles.snapshotValue}>{value}</Text>
      <Text style={styles.snapshotLabel}>{label}</Text>
    </View>
  );
}

function toSavedRiver(river: RiverSummaryApiItem) {
  return {
    slug: river.river.slug,
    riverId: river.river.riverId,
    name: river.river.name,
    reach: river.river.reach,
  };
}

async function openRouteDirections(river: RiverSummaryApiItem) {
  const url = mapUrlForAccessPoint(river.river.putIn) ?? mapUrlForAccessPoint(river.river.takeOut);
  if (url) {
    await Linking.openURL(url);
  }
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  heroCopy: {
    flex: 1,
    gap: spacing.sm,
  },
  kicker: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  freshness: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    maxWidth: 96,
  },
  snapshotRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  snapshotCard: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 4,
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
    fontSize: 28,
    fontWeight: '800',
  },
  snapshotLabel: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  bestCard: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadow,
  },
  bestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  bestHeaderCopy: {
    flex: 1,
    gap: 2,
  },
  bestLabel: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  bestName: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 33,
    fontWeight: '900',
    marginTop: 4,
  },
  bestReach: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  bestScore: {
    width: 82,
    height: 82,
    borderRadius: 24,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bestScoreValue: {
    color: colors.accentDeep,
    fontSize: 34,
    fontWeight: '900',
  },
  bestScoreLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  bestVerdict: {
    color: colors.text,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '800',
  },
  bestMetaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  miniMetric: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 4,
  },
  miniMetricLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  miniMetricValue: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '700',
  },
  bestReason: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  bestActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryButton: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 11,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '800',
  },
  list: {
    gap: spacing.md,
  },
  locationCallout: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  locationTitle: {
    color: colors.accentDeep,
    fontSize: 18,
    fontWeight: '800',
  },
  locationBody: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  linkText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '800',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  requestRouteCallout: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  requestRouteCopy: {
    flex: 1,
    gap: 4,
  },
  requestRouteLabel: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  requestRouteTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  requestRouteBody: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  requestRouteAction: {
    color: colors.accent,
    fontSize: 14,
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
    fontWeight: '700',
    textAlign: 'center',
  },
  stateBody: {
    color: colors.textMuted,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
