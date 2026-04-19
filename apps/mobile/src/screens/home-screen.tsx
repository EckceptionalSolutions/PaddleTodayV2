import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import { useRiverSummaryQuery } from '../api/queries';
import { RiverCard } from '../components/river-card';
import { SectionCard } from '../components/section-card';
import { useStoredLocation } from '../hooks/use-stored-location';
import { formatRelativeTime, normalizeApiText, verdictForRating } from '../lib/format';
import { formatTravelTime } from '../lib/location';
import { buildBoardSnapshot, selectNearbyPicks, selectTopPicks } from '../lib/ranking';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

type HomePanel = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  content: ReactNode;
};

export default function HomeScreen() {
  const router = useRouter();
  const summaryQuery = useRiverSummaryQuery();
  const { location, status, requestLocation, clearLocation } = useStoredLocation();
  const { savedRivers, isSaved, toggleSavedRiver } = useSavedRivers();

  const rivers = summaryQuery.data?.rivers ?? [];
  const snapshot = buildBoardSnapshot(rivers);
  const topPicks = selectTopPicks(rivers, 5);
  const nearbyPicks = location ? selectNearbyPicks(rivers, location, 4) : [];
  const headline = topPicks[0];
  const savedRiverLookup = new Map(savedRivers.map((river) => [river.slug, river]));
  const savedPicks = rivers
    .filter((river) => savedRiverLookup.has(river.river.slug))
    .sort(
      (left, right) =>
        (savedRiverLookup.get(right.river.slug)?.savedAt ?? '').localeCompare(
          savedRiverLookup.get(left.river.slug)?.savedAt ?? ''
        )
    )
    .slice(0, 4);

  const panels = useMemo<HomePanel[]>(() => {
    const nextPanels: HomePanel[] = [];

    if (savedPicks.length > 0) {
      nextPanels.push({
        id: 'saved',
        label: 'Saved',
        title: 'Saved rivers',
        subtitle: 'Your repeat routes stay close to the top so the app gets faster over time.',
        content: (
          <View style={styles.list}>
            {savedPicks.map((river) => (
              <HomeRiverCard
                key={river.river.slug}
                river={river}
                saved={isSaved(river.river.slug)}
                onToggleSaved={() => void toggleSavedRiver(toSavedRiver(river))}
                onOpen={() => router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug } })}
              />
            ))}
          </View>
        ),
      });
    }

    nextPanels.push({
      id: 'best',
      label: 'Top picks',
      title: 'Top picks today',
      subtitle: 'The strongest current calls first, favoring live reads, confidence, then score.',
      content: (
        <View style={styles.list}>
          {topPicks.map((river) => (
            <HomeRiverCard
              key={river.river.slug}
              river={river}
              saved={isSaved(river.river.slug)}
              onToggleSaved={() => void toggleSavedRiver(toSavedRiver(river))}
              onOpen={() => router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug } })}
            />
          ))}
        </View>
      ),
    });

    nextPanels.push({
      id: 'nearby',
      label: 'Nearby',
      title: 'Nearby picks',
      subtitle: location
        ? `Ranked from ${location.label}. Distance trims the score so the list stays practical.`
        : 'Turn on location to surface realistic day-trip options.',
      content: location ? (
        nearbyPicks.length > 0 ? (
          <View style={styles.list}>
            {nearbyPicks.map((river) => (
              <HomeRiverCard
                key={river.river.slug}
                river={river}
                saved={isSaved(river.river.slug)}
                travelLabel={formatTravelTime(river.travelMinutes)}
                onToggleSaved={() => void toggleSavedRiver(toSavedRiver(river))}
                onOpen={() => router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug } })}
              />
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>
            Nothing is ranking as a realistic nearby option inside a 3-hour day-trip window yet.
          </Text>
        )
      ) : (
        <View style={styles.locationCallout}>
          <Text style={styles.locationTitle}>
            {status === 'denied' ? 'Location access was denied.' : 'Use my location'}
          </Text>
          <Text style={styles.locationBody}>
            Show the best routes that are actually close enough to matter on a trip day.
          </Text>
          <Pressable
            style={[styles.primaryButton, status === 'requesting' ? styles.primaryButtonDisabled : null]}
            onPress={() => void requestLocation()}
            disabled={status === 'requesting'}
          >
            <Text style={styles.primaryButtonText}>
              {status === 'requesting' ? 'Checking location...' : 'Find nearby picks'}
            </Text>
          </Pressable>
          {location ? (
            <Pressable style={styles.secondaryButton} onPress={() => void clearLocation()}>
              <Text style={styles.secondaryButtonText}>Clear location</Text>
            </Pressable>
          ) : null}
        </View>
      ),
    });

    nextPanels.push({
      id: 'about',
      label: 'Foundation',
      title: 'What is already wired',
      subtitle: 'This MVP stays small on purpose.',
      content: (
        <View style={styles.bulletList}>
          <Text style={styles.bullet}>- Summary API wired to the home board.</Text>
          <Text style={styles.bullet}>- Detail and history APIs ready behind each river card.</Text>
          <Text style={styles.bullet}>- Query cache persists between launches for a faster reopen.</Text>
          <Text style={styles.bullet}>- Saved rivers persist locally, and email alerts are now live from Saved or river detail.</Text>
        </View>
      ),
    });

    return nextPanels;
  }, [
    savedPicks,
    topPicks,
    nearbyPicks,
    isSaved,
    location,
    status,
    router,
    toggleSavedRiver,
    clearLocation,
    requestLocation,
  ]);

  const [activePanelId, setActivePanelId] = useState<string | null>(null);
  const previousPanelIndexRef = useRef(0);
  const activePanelIndex = Math.max(
    0,
    panels.findIndex((panel) => panel.id === (activePanelId ?? panels[0]?.id))
  );
  const activePanel = panels[activePanelIndex] ?? null;
  const panelTranslateX = useState(() => new Animated.Value(0))[0];
  const panelOpacity = useState(() => new Animated.Value(1))[0];

  useEffect(() => {
    if (!panels.length) {
      setActivePanelId(null);
      return;
    }

    if (!activePanelId || !panels.some((panel) => panel.id === activePanelId)) {
      setActivePanelId(panels[0].id);
    }
  }, [activePanelId, panels]);

  useEffect(() => {
    if (!activePanel) {
      return;
    }

    const previousIndex = previousPanelIndexRef.current;
    const direction = activePanelIndex > previousIndex ? 1 : activePanelIndex < previousIndex ? -1 : 0;
    previousPanelIndexRef.current = activePanelIndex;

    panelTranslateX.stopAnimation();
    panelOpacity.stopAnimation();
    panelTranslateX.setValue(direction * 28);
    panelOpacity.setValue(direction === 0 ? 1 : 0.55);

    Animated.parallel([
      Animated.timing(panelTranslateX, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(panelOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [activePanel, activePanelIndex, panelOpacity, panelTranslateX]);

  if (summaryQuery.isLoading && rivers.length === 0) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.stateTitle}>Loading today&apos;s river board</Text>
        <Text style={styles.stateBody}>Pulling the latest snapshot-backed calls.</Text>
      </View>
    );
  }

  if (summaryQuery.isError && rivers.length === 0) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.stateTitle}>The river board did not load.</Text>
        <Text style={styles.stateBody}>Check the local API server, then pull to retry.</Text>
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
        <Text style={styles.kicker}>PaddleToday mobile MVP</Text>
        <Text style={styles.title}>Where should I paddle today?</Text>
        <Text style={styles.subtitle}>
          Start with the clearest live options. Drill into the river only when the call deserves it.
        </Text>

        <View style={styles.heroPanel}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroLabel}>Board snapshot</Text>
            <Text style={styles.heroFreshness}>{formatRelativeTime(summaryQuery.data?.generatedAt)}</Text>
          </View>

          <View style={styles.snapshotRow}>
            <SnapshotStat label="Paddleable" value={snapshot.paddleable} tone={styles.snapshotStrong} />
            <SnapshotStat label="Watch" value={snapshot.watch} tone={styles.snapshotFair} />
            <SnapshotStat label="Skip" value={snapshot.skip} tone={styles.snapshotNoGo} />
          </View>

          {headline ? (
            <View style={styles.headlineBlock}>
              <Text style={styles.headlineLabel}>Best read right now</Text>
              <Text style={styles.headlineName}>{headline.river.name}</Text>
              <Text style={styles.headlineReach}>{headline.river.reach}</Text>
              <Text style={styles.headlineSummary}>
                {verdictForRating(headline.rating)} - {normalizeApiText(headline.summary.shortExplanation)}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      {activePanel ? (
        <View style={styles.deck}>
          <Animated.View
            style={[
              styles.deckAnimated,
              {
                opacity: panelOpacity,
                transform: [{ translateX: panelTranslateX }],
              },
            ]}
          >
            <View style={styles.deckHeader}>
              <View style={styles.deckHeaderCopy}>
                <Text style={styles.deckKicker}>Home sections</Text>
                <Text style={styles.deckTitle}>{activePanel.title}</Text>
              </View>
              <Text style={styles.deckCount}>
                {activePanelIndex + 1} / {panels.length}
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.jumpStrip}
            >
              {panels.map((panel) => {
                const active = panel.id === activePanel.id;
                return (
                  <Pressable
                    key={panel.id}
                    style={[styles.jumpPill, active ? styles.jumpPillActive : null]}
                    onPress={() => setActivePanelId(panel.id)}
                  >
                    <Text style={[styles.jumpPillText, active ? styles.jumpPillTextActive : null]}>
                      {panel.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <SectionCard
              title={activePanel.title}
              subtitle={activePanel.subtitle}
              accessory={
                activePanel.id === 'nearby' && location ? (
                  <Pressable onPress={() => void clearLocation()}>
                    <Text style={styles.linkText}>Clear</Text>
                  </Pressable>
                ) : undefined
              }
            >
              {activePanel.content}
            </SectionCard>

            <View style={styles.deckControls}>
              <Pressable
                style={[styles.deckButton, activePanelIndex === 0 ? styles.deckButtonDisabled : null]}
                disabled={activePanelIndex === 0}
                onPress={() => setActivePanelId(panels[Math.max(0, activePanelIndex - 1)]?.id ?? activePanel.id)}
              >
                <Text style={styles.deckButtonText}>Previous</Text>
              </Pressable>
              <Pressable
                style={[styles.deckButton, activePanelIndex === panels.length - 1 ? styles.deckButtonDisabled : null]}
                disabled={activePanelIndex === panels.length - 1}
                onPress={() =>
                  setActivePanelId(panels[Math.min(panels.length - 1, activePanelIndex + 1)]?.id ?? activePanel.id)
                }
              >
                <Text style={styles.deckButtonText}>Next</Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      ) : null}
    </ScrollView>
  );
}

function HomeRiverCard({
  river,
  saved,
  travelLabel,
  onToggleSaved,
  onOpen,
}: {
  river: RiverSummaryApiItem;
  saved: boolean;
  travelLabel?: string;
  onToggleSaved: () => void;
  onOpen: () => void;
}) {
  return (
    <RiverCard
      river={river}
      saved={saved}
      travelLabel={travelLabel}
      onToggleSaved={onToggleSaved}
      onPress={onOpen}
    />
  );
}

function SnapshotStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: object;
}) {
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
    gap: spacing.md,
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
  heroPanel: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  heroLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  heroFreshness: {
    color: colors.textMuted,
    fontSize: 13,
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
  headlineBlock: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 2,
  },
  headlineLabel: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  headlineName: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  headlineReach: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  headlineSummary: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  deck: {
    gap: spacing.md,
  },
  deckAnimated: {
    gap: spacing.md,
  },
  deckHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: spacing.md,
  },
  deckHeaderCopy: {
    flex: 1,
    gap: 2,
  },
  deckKicker: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    fontWeight: '700',
  },
  deckTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  deckCount: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  jumpStrip: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  jumpPill: {
    backgroundColor: colors.canvasMuted,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  jumpPillActive: {
    backgroundColor: colors.accent,
  },
  jumpPillText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  jumpPillTextActive: {
    color: colors.surfaceStrong,
  },
  deckControls: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  deckButton: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: 12,
    alignItems: 'center',
  },
  deckButtonDisabled: {
    opacity: 0.4,
  },
  deckButtonText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '700',
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
    fontWeight: '700',
  },
  locationBody: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginTop: spacing.sm,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryButton: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  linkText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '700',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  bulletList: {
    gap: spacing.sm,
  },
  bullet: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
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
