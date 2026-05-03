import type { RiverSummaryApiItem, ScoreRating } from '@paddletoday/api-contract';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Callout, Marker, type Region } from 'react-native-maps';
import { useRiverSummaryQuery } from '../api/queries';
import { RatingPill } from '../components/rating-pill';
import { useStoredLocation } from '../hooks/use-stored-location';
import { formatRelativeTime, normalizeApiText } from '../lib/format';
import { formatTravelTime } from '../lib/location';
import { selectNearbyPicks, selectTopPicks, type NearbyRiverPick } from '../lib/ranking';
import { colors, radius, shadow, spacing } from '../theme/tokens';

type RatingFilter = ScoreRating | 'All';
type DifficultyFilter = RiverSummaryApiItem['river']['difficulty'] | 'all';

const DEFAULT_REGION: Region = {
  latitude: 44.95,
  longitude: -93.2,
  latitudeDelta: 6.4,
  longitudeDelta: 7.2,
};

const ratingFilters: RatingFilter[] = ['All', 'Strong', 'Good', 'Fair', 'No-go'];
const difficultyFilters: Array<{ value: DifficultyFilter; label: string }> = [
  { value: 'all', label: 'Any difficulty' },
  { value: 'easy', label: 'Easy' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'hard', label: 'Hard' },
];

export default function MapScreen() {
  const router = useRouter();
  const summaryQuery = useRiverSummaryQuery();
  const { location } = useStoredLocation();
  const [activeFilter, setActiveFilter] = useState<RatingFilter>('All');
  const [activeDifficulty, setActiveDifficulty] = useState<DifficultyFilter>('all');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const rivers = summaryQuery.data?.rivers ?? [];
  const filteredRivers = useMemo(
    () =>
      rivers.filter((river) => {
        const matchesRating = activeFilter === 'All' || river.rating === activeFilter;
        const matchesDifficulty = activeDifficulty === 'all' || river.river.difficulty === activeDifficulty;
        return matchesRating && matchesDifficulty;
      }),
    [activeDifficulty, activeFilter, rivers]
  );
  const selectedRiver =
    filteredRivers.find((river) => river.river.slug === selectedSlug) ?? filteredRivers[0] ?? null;
  const nearbyPicks = location ? selectNearbyPicks(filteredRivers, location, 4) : [];
  const fallbackPicks = selectTopPicks(filteredRivers, 4);
  const shortlist = nearbyPicks.length > 0 ? nearbyPicks : fallbackPicks;
  const region = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 4.6,
        longitudeDelta: 4.6,
      }
    : DEFAULT_REGION;

  if (summaryQuery.isLoading && rivers.length === 0) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.stateTitle}>Loading route map</Text>
        <Text style={styles.stateBody}>Pulling current route locations and scores.</Text>
      </View>
    );
  }

  if (summaryQuery.isError && rivers.length === 0) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.stateTitle}>The map did not load.</Text>
        <Text style={styles.stateBody}>Couldn't load route data. Pull to retry.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={Boolean(location)}
        showsMyLocationButton={Boolean(location)}
        mapPadding={{ top: 118, right: 20, bottom: 280, left: 20 }}
      >
        {filteredRivers.map((river) => (
          <Marker
            key={river.river.slug}
            coordinate={{
              latitude: river.river.latitude,
              longitude: river.river.longitude,
            }}
            pinColor={markerColor(river.rating)}
            title={river.river.name}
            description={river.river.reach}
            onPress={() => setSelectedSlug(river.river.slug)}
          >
            <Callout tooltip={false} onPress={() => router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug } })}>
              <View style={styles.callout}>
                <Text style={styles.calloutName}>{river.river.name}</Text>
                <Text style={styles.calloutReach}>{river.river.reach}</Text>
                <Text style={styles.calloutMeta}>{river.score} · {river.rating}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.topPanel}>
        <View style={styles.topPanelHead}>
          <View style={styles.topPanelCopy}>
            <Text style={styles.kicker}>Route map</Text>
            <Text style={styles.title}>All tracked routes</Text>
          </View>
          <Text style={styles.freshness}>{formatRelativeTime(summaryQuery.data?.generatedAt)}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterStrip}>
          {ratingFilters.map((filter) => {
            const active = filter === activeFilter;
            return (
              <Pressable
                key={filter}
                style={[styles.filterButton, active ? styles.filterButtonActive : null]}
                onPress={() => {
                  setActiveFilter(filter);
                  setSelectedSlug(null);
                }}
              >
                <Text style={[styles.filterButtonText, active ? styles.filterButtonTextActive : null]}>
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterStrip}>
          {difficultyFilters.map((filter) => {
            const active = filter.value === activeDifficulty;
            return (
              <Pressable
                key={filter.value}
                style={[styles.filterButton, active ? styles.filterButtonActive : null]}
                onPress={() => {
                  setActiveDifficulty(filter.value);
                  setSelectedSlug(null);
                }}
              >
                <Text style={[styles.filterButtonText, active ? styles.filterButtonTextActive : null]}>
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.bottomSheet}
        contentContainerStyle={styles.bottomSheetContent}
        refreshControl={
          <RefreshControl
            tintColor={colors.accent}
            refreshing={summaryQuery.isRefetching}
            onRefresh={() => summaryQuery.refetch()}
          />
        }
      >
        <View style={styles.sheetHandle} />
        <View style={styles.sheetHeader}>
          <View>
            <Text style={styles.sheetKicker}>
              {location && nearbyPicks.length > 0 ? `Nearest useful picks from ${location.label}` : 'Best routes on this map'}
            </Text>
            <Text style={styles.sheetTitle}>{filteredRivers.length} route{filteredRivers.length === 1 ? '' : 's'} shown</Text>
          </View>
        </View>

        {selectedRiver ? (
          <SelectedRouteCard
            river={selectedRiver}
            travelLabel={travelLabelFor(selectedRiver, nearbyPicks)}
            onOpen={() => router.push({ pathname: '/river/[slug]', params: { slug: selectedRiver.river.slug } })}
          />
        ) : null}

        <View style={styles.shortlist}>
          {shortlist.map((river) => (
            <Pressable
              key={river.river.slug}
              style={[
                styles.shortlistItem,
                river.river.slug === selectedRiver?.river.slug ? styles.shortlistItemActive : null,
              ]}
              onPress={() => setSelectedSlug(river.river.slug)}
            >
              <View style={styles.shortlistScore}>
                <Text style={styles.shortlistScoreValue}>{river.score}</Text>
              </View>
              <View style={styles.shortlistCopy}>
                <Text style={styles.shortlistName}>{river.river.name}</Text>
                <Text style={styles.shortlistReach} numberOfLines={1}>{river.river.reach}</Text>
                <Text style={styles.shortlistMeta}>{shortlistTravelLabel(river)}</Text>
              </View>
              <RatingPill rating={river.rating} />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.requestCallout} onPress={() => router.push('/request-route')}>
          <View style={styles.requestCalloutCopy}>
            <Text style={styles.requestCalloutLabel}>Missing a route?</Text>
            <Text style={styles.requestCalloutTitle}>Request one for review</Text>
          </View>
          <Text style={styles.requestCalloutAction}>Open</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function SelectedRouteCard({
  river,
  travelLabel,
  onOpen,
}: {
  river: RiverSummaryApiItem;
  travelLabel?: string;
  onOpen: () => void;
}) {
  return (
    <View style={styles.selectedCard}>
      <View style={styles.selectedHeader}>
        <View style={styles.selectedScore}>
          <Text style={styles.selectedScoreValue}>{river.score}</Text>
          <Text style={styles.selectedScoreLabel}>Score</Text>
        </View>
        <View style={styles.selectedCopy}>
          <View style={styles.selectedTitleRow}>
            <Text style={styles.selectedName}>{river.river.name}</Text>
            <RatingPill rating={river.rating} />
          </View>
          <Text style={styles.selectedReach}>{river.river.reach}</Text>
          <Text style={styles.selectedSummary}>{normalizeApiText(river.summary.shortExplanation)}</Text>
        </View>
      </View>
      <View style={styles.selectedFacts}>
        <Text style={styles.selectedFact}>{river.summary.gaugeNow}</Text>
        <Text style={styles.selectedFact}>{river.confidence.label} confidence</Text>
        <Text style={styles.selectedFact}>{travelLabel ?? river.river.region}</Text>
      </View>
      <Pressable style={styles.primaryButton} onPress={onOpen}>
        <Text style={styles.primaryButtonText}>View route</Text>
      </Pressable>
    </View>
  );
}

function markerColor(rating: ScoreRating) {
  if (rating === 'Strong') return colors.strong;
  if (rating === 'Good') return colors.good;
  if (rating === 'Fair') return colors.fair;
  return colors.noGo;
}

function travelLabelFor(river: RiverSummaryApiItem, nearbyPicks: Array<RiverSummaryApiItem & { travelMinutes: number }>) {
  const nearby = nearbyPicks.find((pick) => pick.river.slug === river.river.slug);
  return nearby ? formatTravelTime(nearby.travelMinutes) : undefined;
}

function shortlistTravelLabel(river: RiverSummaryApiItem | NearbyRiverPick) {
  return 'travelMinutes' in river && typeof river.travelMinutes === 'number'
    ? formatTravelTime(river.travelMinutes)
    : river.river.region;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  topPanel: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
    ...shadow,
  },
  topPanelHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  topPanelCopy: {
    flex: 1,
    gap: 2,
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
    fontSize: 24,
    fontWeight: '900',
  },
  freshness: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'right',
    maxWidth: 96,
  },
  filterStrip: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  filterButton: {
    backgroundColor: colors.canvasMuted,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  filterButtonActive: {
    backgroundColor: colors.accent,
  },
  filterButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  filterButtonTextActive: {
    color: colors.surfaceStrong,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '46%',
    backgroundColor: colors.surfaceStrong,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.border,
  },
  bottomSheetContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  sheetKicker: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  sheetTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 2,
  },
  selectedCard: {
    backgroundColor: colors.canvasMuted,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.md,
  },
  selectedHeader: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  selectedScore: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedScoreValue: {
    color: colors.accentDeep,
    fontSize: 26,
    fontWeight: '900',
  },
  selectedScoreLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  selectedCopy: {
    flex: 1,
    gap: 4,
  },
  selectedTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  selectedName: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  selectedReach: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  selectedSummary: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  selectedFacts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  selectedFact: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  primaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  primaryButtonText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '800',
  },
  shortlist: {
    gap: spacing.sm,
  },
  shortlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  shortlistItemActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  shortlistScore: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortlistScoreValue: {
    color: colors.accentDeep,
    fontSize: 18,
    fontWeight: '900',
  },
  shortlistCopy: {
    flex: 1,
    gap: 2,
  },
  shortlistName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  shortlistReach: {
    color: colors.textMuted,
    fontSize: 13,
  },
  shortlistMeta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  requestCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.canvasMuted,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  requestCalloutCopy: {
    flex: 1,
    gap: 2,
  },
  requestCalloutLabel: {
    color: colors.accentDeep,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  requestCalloutTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  requestCalloutAction: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  callout: {
    width: 210,
    gap: 4,
  },
  calloutName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  calloutReach: {
    color: colors.textMuted,
    fontSize: 13,
  },
  calloutMeta: {
    color: colors.accentDeep,
    fontSize: 13,
    fontWeight: '800',
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
