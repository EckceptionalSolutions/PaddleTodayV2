import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRef } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import { routePreviewFactItems } from '../lib/route-facts';
import { routeDecisionPresentation } from '../lib/map-decision';
import { routeGroupMetaForRoute } from '../lib/route-groups';
import { colors, radius, spacing } from '../theme/tokens';
import { AppButton } from './app-button';
import { QualityPill, decisionColors } from './rating-pill';

export function RouteSearchModal({
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
  const reducedMotion = useReducedMotion();
  const inputRef = useRef<TextInput>(null);
  const active = query.trim().length > 0;

  return (
    <Modal visible={visible} animationType={reducedMotion ? 'none' : 'slide'} presentationStyle="fullScreen" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.searchModalScreen}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.searchModalContent, { paddingTop: spacing.md + topInset, paddingBottom: spacing.md + bottomInset }]}>
          <View style={styles.searchModalHeader}>
            <View style={styles.searchModalHeaderCopy}>
              <Text accessibilityRole="header" style={styles.searchModalTitle}>Find a route</Text>
              <Text style={styles.searchModalSubtitle}>Search rivers, routes, states, and access points.</Text>
            </View>
            <Pressable style={styles.searchModalClose} onPress={onClose} accessibilityRole="button" accessibilityLabel="Close route search">
              <MaterialCommunityIcons name="close" color={colors.accent} size={20} />
            </Pressable>
          </View>

          <View style={styles.searchModalInputRow}>
            <MaterialCommunityIcons name="magnify" color={colors.accent} size={19} />
            <TextInput
              ref={inputRef}
              autoFocus
              autoCapitalize="none"
              autoCorrect={false}
              value={query}
              onChangeText={onChange}
              placeholder="River, route, region, or state"
              accessibilityLabel="Search rivers and routes"
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
              <Pressable style={styles.searchModalClear} onPress={() => { onChange(''); inputRef.current?.focus(); }} accessibilityRole="button" accessibilityLabel="Clear search">
                <MaterialCommunityIcons name="close-circle" color={colors.textMuted} size={19} />
              </Pressable>
            ) : null}
          </View>

          <ScrollView
            style={styles.searchModalResults}
            contentContainerStyle={styles.searchModalResultsContent}
            keyboardDismissMode={Platform.OS === 'web' ? 'none' : 'on-drag'}
            keyboardShouldPersistTaps="handled"
          >
            {!active ? (
              <>
                <View style={styles.searchModalEmpty}>
                  <Text style={styles.searchModalEmptyTitle}>Start typing to search routes</Text>
                  <Text style={styles.searchModalEmptyText}>Try a river name, nearby city, state, put-in, or take-out.</Text>
                </View>
                <View style={styles.searchStateSection}>
                  <Text accessibilityRole="header" style={styles.searchStateTitle}>Browse by state</Text>
                  <View style={styles.searchStateGrid}>
                    {states.map((state) => (
                      <Pressable
                        key={state}
                        accessibilityRole="button"
                        accessibilityLabel={`Browse ${stateLabel(state)} routes`}
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
                    <Pressable accessibilityRole="button" accessibilityLabel={`View ${river.river.name}: ${river.river.reach}`} key={river.river.slug} style={styles.knownSearchResult} onPress={() => onOpenRiver(river)}>
                      <View style={[styles.knownSearchScore, searchScoreTone(river).score]}>
                        <Text style={[styles.knownSearchScoreText, searchScoreTone(river).text]}>{routeDecisionPresentation(river).score ?? '—'}</Text>
                      </View>
                      <View style={styles.knownSearchCopy}>
                        <View style={styles.knownSearchTopLine}>
                          <Text style={styles.knownSearchName}>{river.river.name}</Text>
                          <QualityPill rating={river.rating} readiness={routeDecisionPresentation(river).readiness} />
                        </View>
                        <Text style={styles.knownSearchMeta}>
                          {[
                            stateLabel(river.river.state),
                            river.river.region,
                            routeCount > 1 ? `${routeDecisionPresentation(river).scoreLabel} · ${routeCount} routes` : '1 route',
                          ].filter(Boolean).join(' - ')}
                        </Text>
                        <Text style={styles.knownSearchReach}>{river.river.reach}</Text>
                        <View style={styles.knownSearchFacts}>
                          {routePreviewFactItems(river.river).map(fact => <Text key={fact} style={styles.knownSearchFact}>{fact}</Text>)}
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
                <AppButton label="Open Explore map" variant="secondary" onPress={onExplore} />
                <AppButton label="Request a Route" onPress={onRequestRoute} />
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function searchScoreTone(river: RiverSummaryApiItem) {
  const tone = decisionColors(river.rating, river.river.scoreEligibility === 'planning' ? 'withheld' : river.readiness.status);
  return { score: { backgroundColor: tone.backgroundColor }, text: { color: tone.textColor } };
}

function stateLabel(state: string) {
  return state
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const styles = StyleSheet.create({
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
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  knownSearchName: {
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
  searchModalScreen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  searchModalContent: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    flex: 1,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  searchModalHeaderCopy: { flex: 1, minWidth: 0 },
  searchModalClear: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
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
    width: 44,
    height: 44,
    borderRadius: 22,
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
    minHeight: 44,
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
});
