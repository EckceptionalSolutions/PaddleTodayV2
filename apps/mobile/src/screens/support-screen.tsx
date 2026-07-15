import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import { useRiverSummaryQuery } from '../api/queries';
import { SectionCard } from '../components/section-card';
import { appDiagnosticRows } from '../lib/app-diagnostics';
import { resolveApiBaseUrl, resolveApiUrl } from '../lib/api-base-url';
import { captureAppException, observabilityStatus, trackAppEvent } from '../lib/observability';
import { buildRouteGroupMeta, routeGroupMetaForRoute, uniqueRoutesByRiver } from '../lib/route-groups';
import { androidBottomInset } from '../lib/safe-area';
import { colors, radius, spacing } from '../theme/tokens';

type DiagnosticState = 'idle' | 'checking' | 'ok' | 'error';

export default function SupportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomContentInset = androidBottomInset(insets.bottom);
  const summaryQuery = useRiverSummaryQuery();
  const [diagnosticState, setDiagnosticState] = useState<DiagnosticState>('idle');
  const [diagnosticText, setDiagnosticText] = useState('Ready to check the route feed.');
  const [selectedSupportedState, setSelectedSupportedState] = useState<string | null>(null);
  const rivers = summaryQuery.data?.rivers ?? [];
  const routeCounts = useMemo(() => buildRouteGroupMeta(rivers), [rivers]);
  const supportedStates = useMemo(() => supportedRiverStates(rivers), [rivers]);
  const activeSupportedState = supportedStates.find((state) => state.state === selectedSupportedState) ?? supportedStates[0] ?? null;

  useEffect(() => {
    if (!activeSupportedState || selectedSupportedState === activeSupportedState.state) {
      return;
    }

    setSelectedSupportedState(activeSupportedState.state);
  }, [activeSupportedState, selectedSupportedState]);

  async function runDiagnostic() {
    trackAppEvent('api_diagnostic_started', {
      apiBaseUrl: resolveApiBaseUrl(),
    });
    setDiagnosticState('checking');
    setDiagnosticText(`Checking ${resolveApiBaseUrl()}`);

    const startedAt = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(resolveApiUrl('/api/rivers/summary.json'), {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      const text = await response.text();
      const elapsed = Date.now() - startedAt;
      clearTimeout(timeout);

      if (!response.ok) {
        setDiagnosticState('error');
        setDiagnosticText(`HTTP ${response.status} from ${resolveApiBaseUrl()} in ${elapsed}ms`);
        trackAppEvent('api_diagnostic_failed', {
          status: response.status,
          elapsedMs: elapsed,
        });
        return;
      }

      const parsed = JSON.parse(text) as { riverCount?: unknown };
      setDiagnosticState('ok');
      setDiagnosticText(
        `Connected in ${elapsed}ms. Routes: ${typeof parsed.riverCount === 'number' ? parsed.riverCount : 'unknown'}.`
      );
      trackAppEvent('api_diagnostic_succeeded', {
        elapsedMs: elapsed,
        riverCount: typeof parsed.riverCount === 'number' ? parsed.riverCount : null,
      });
    } catch (error) {
      clearTimeout(timeout);
      setDiagnosticState('error');
      setDiagnosticText(error instanceof Error ? error.message : 'Could not reach PaddleToday.');
      captureAppException(error, {
        name: 'api_diagnostic_failed',
        extra: {
          apiBaseUrl: resolveApiBaseUrl(),
        },
      });
    }
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: spacing.md + insets.top,
          paddingBottom: spacing.xl + bottomContentInset,
        },
      ]}
    >
      <View style={styles.hero}>
        <Text style={styles.kicker}>More</Text>
        <Text style={styles.title}>Safety, support, and app checks</Text>
        <Text style={styles.subtitle}>
          Key safety notes, feedback links, and troubleshooting stay out of the main paddling flow.
        </Text>
      </View>

      <SectionCard title="Before you launch" subtitle="PaddleToday is a planning aid. Conditions still need a field check.">
        <View style={styles.list}>
          <SafetyRow icon="waves" title="Check official sources" body="Confirm gauges, weather, closures, and access status before launching." />
          <SafetyRow icon="weather-lightning" title="Conditions change fast" body="Strainers, storms, construction, and water levels can change after the app refreshes." />
          <SafetyRow icon="shield-check-outline" title="Match the route to your group" body="Bring proper gear and skip trips that do not fit the paddlers, season, or current conditions." />
        </View>
      </SectionCard>

      <SectionCard title="Support" subtitle="Fast links for feedback, route requests, and release paperwork.">
        <View style={styles.actionList}>
          <ActionRow icon="email-outline" title="Email support" body="hello@paddletoday.com" onPress={() => openUrl('mailto:hello@paddletoday.com')} />
          <ActionRow icon="bug-outline" title="Email app diagnostics" body="Send build, connection, and environment details." onPress={() => openUrl(buildDiagnosticsEmailUrl())} />
          <ActionRow icon="plus-circle-outline" title="Request a route" body="Send river, area, access, and notes." onPress={() => router.push('/request-route')} />
          <ActionRow icon="shield-check-outline" title="Privacy policy" body="How app and route information is handled." onPress={() => router.push('/privacy')} />
          <ActionRow icon="file-document-outline" title="Terms and safety" body="Use, safety, and submission terms." onPress={() => router.push('/terms')} />
        </View>
      </SectionCard>

      <SectionCard title="Supported rivers" subtitle="Browse PaddleToday coverage by state.">
        {summaryQuery.isLoading && rivers.length === 0 ? (
          <Text style={styles.supportedEmptyText}>Loading supported rivers.</Text>
        ) : summaryQuery.isError && rivers.length === 0 ? (
          <Text style={styles.supportedEmptyText}>Supported rivers could not load. Use the connection check below.</Text>
        ) : (
          <View style={styles.supportedStates}>
            <View style={styles.supportedSummary}>
              <Text style={styles.supportedSummaryValue}>{rivers.length}</Text>
              <Text style={styles.supportedSummaryText}>
                live route calls across {supportedStates.length} supported states
              </Text>
            </View>
            <View style={styles.supportedStateChips}>
              {supportedStates.map((state) => {
                const active = state.state === activeSupportedState?.state;
                return (
                  <Pressable
                    key={state.state}
                    style={[styles.supportedStateChip, active ? styles.supportedStateChipActive : null]}
                    onPress={() => setSelectedSupportedState(state.state)}
                    android_ripple={{ color: colors.canvasMuted }}
                  >
                    <Text style={[styles.supportedStateChipText, active ? styles.supportedStateChipTextActive : null]}>
                      {stateLabel(state.state)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {activeSupportedState ? (
              <View style={styles.supportedStateGroup}>
                <View style={styles.supportedStateHeader}>
                  <Text style={styles.supportedStateTitle}>{stateLabel(activeSupportedState.state)}</Text>
                  <Text style={styles.supportedStateCount}>{activeSupportedState.rivers.length} rivers</Text>
                </View>
                <View style={styles.supportedRiverList}>
                  {activeSupportedState.rivers.map((river) => {
                    const routeCount = routeGroupMetaForRoute(river, routeCounts).routeCount;
                    return (
                      <Pressable
                        key={river.river.riverId ?? river.river.slug}
                        style={styles.supportedRiverRow}
                        onPress={() => openSupportedRiver(router, river, routeCount)}
                        android_ripple={{ color: colors.canvasMuted }}
                      >
                        <View style={[styles.supportedScore, supportScoreTone(river.rating).score]}>
                          <Text style={[styles.supportedScoreText, supportScoreTone(river.rating).text]}>{river.score}</Text>
                        </View>
                        <View style={styles.supportedRiverCopy}>
                          <Text style={styles.supportedRiverName} numberOfLines={1}>{river.river.name}</Text>
                          <Text style={styles.supportedRiverMeta} numberOfLines={1}>
                            {[river.river.region, routeCount > 1 ? `${routeCount} routes` : '1 route', river.rating].join(' - ')}
                          </Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" color={colors.textMuted} size={21} />
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ) : null}
          </View>
        )}
      </SectionCard>

      <SectionCard title="Connection check" subtitle="Use this when routes do not load.">
        <View style={styles.diagnosticCard}>
          <View style={[styles.diagnosticIcon, diagnosticTone(diagnosticState)]}>
            <MaterialCommunityIcons name={diagnosticIcon(diagnosticState)} color={colors.surfaceStrong} size={20} />
          </View>
          <View style={styles.diagnosticCopy}>
            <Text style={styles.diagnosticTitle}>{diagnosticTitle(diagnosticState)}</Text>
            <Text style={styles.diagnosticText}>{diagnosticText}</Text>
          </View>
        </View>
        <Pressable
          style={[styles.primaryButton, diagnosticState === 'checking' ? styles.primaryButtonDisabled : null]}
          disabled={diagnosticState === 'checking'}
          onPress={() => void runDiagnostic()}
        >
          <MaterialCommunityIcons name="refresh" color={colors.surfaceStrong} size={18} />
          <Text style={styles.primaryButtonText}>{diagnosticState === 'checking' ? 'Checking...' : 'Check connection'}</Text>
        </Pressable>
      </SectionCard>

      <SectionCard title="Observability" subtitle="Release diagnostics are not configured yet.">
        <View style={styles.observabilityCard}>
          <Text style={styles.observabilityLabel}>Status</Text>
          <Text style={styles.observabilityValue}>
            {observabilityStatus().enabled ? 'Enabled' : 'Not configured'}
          </Text>
          <Text style={styles.observabilityMeta}>
            {observabilityStatus().environment} · {observabilityStatus().release}
          </Text>
        </View>
      </SectionCard>

      <SectionCard title="Build details" subtitle="Share these values when a TestFlight or Play test build has an issue.">
        <View style={styles.diagnosticTable}>
          {appDiagnosticRows().map((row) => (
            <View key={row.label} style={styles.diagnosticRow}>
              <Text style={styles.diagnosticRowLabel}>{row.label}</Text>
              <Text selectable style={styles.diagnosticRowValue}>{row.value}</Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </ScrollView>
  );
}

function SafetyRow({
  icon,
  title,
  body,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  body: string;
}) {
  return (
    <View style={styles.safetyRow}>
      <View style={styles.rowIcon}>
        <MaterialCommunityIcons name={icon} color={colors.accent} size={19} />
      </View>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowBody}>{body}</Text>
      </View>
    </View>
  );
}

function ActionRow({
  icon,
  title,
  body,
  onPress,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  body: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.actionRow} onPress={onPress}>
      <View style={styles.rowIcon}>
        <MaterialCommunityIcons name={icon} color={colors.accent} size={19} />
      </View>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowBody}>{body}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" color={colors.textMuted} size={22} />
    </Pressable>
  );
}

function diagnosticTitle(state: DiagnosticState) {
  if (state === 'checking') return 'Checking connection';
  if (state === 'ok') return 'Route feed is reachable';
  if (state === 'error') return 'Connection check failed';
  return 'Ready to check';
}

function diagnosticIcon(state: DiagnosticState): keyof typeof MaterialCommunityIcons.glyphMap {
  if (state === 'checking') return 'progress-clock';
  if (state === 'ok') return 'check';
  if (state === 'error') return 'alert-outline';
  return 'server-network';
}

function diagnosticTone(state: DiagnosticState) {
  if (state === 'ok') return styles.diagnosticOk;
  if (state === 'error') return styles.diagnosticError;
  return styles.diagnosticIdle;
}

function openUrl(url: string) {
  trackAppEvent('support_link_opened', {
    target: url.startsWith('mailto:') ? 'email' : url,
  });
  void Linking.openURL(url);
}

function buildDiagnosticsEmailUrl() {
  const diagnostics = appDiagnosticRows()
    .map((row) => `${row.label}: ${row.value}`)
    .join('\n');
  const body = [
    'What happened?',
    '',
    '',
    'What did you expect?',
    '',
    '',
    'Diagnostics:',
    diagnostics,
  ].join('\n');

  return `mailto:hello@paddletoday.com?subject=${encodeURIComponent('PaddleToday app issue')}&body=${encodeURIComponent(body)}`;
}

function supportedRiverStates(rivers: RiverSummaryApiItem[]) {
  const uniqueRivers = uniqueRoutesByRiver(rivers);
  const grouped = new Map<string, RiverSummaryApiItem[]>();

  uniqueRivers.forEach((river) => {
    const state = river.river.state;
    grouped.set(state, [...(grouped.get(state) ?? []), river]);
  });

  return [...grouped.entries()]
    .map(([state, stateRivers]) => ({
      state,
      rivers: stateRivers.sort((left, right) => left.river.name.localeCompare(right.river.name)),
    }))
    .sort((left, right) => left.state.localeCompare(right.state));
}

function openSupportedRiver(
  router: ReturnType<typeof useRouter>,
  river: RiverSummaryApiItem,
  routeCount: number
) {
  if (river.river.riverId && routeCount > 1) {
    router.push({ pathname: '/river-hub/[riverId]', params: { riverId: river.river.riverId } });
    return;
  }

  router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug } });
}

function stateLabel(state: string) {
  return state
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function supportScoreTone(rating: RiverSummaryApiItem['rating']) {
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  hero: {
    gap: spacing.sm,
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
    fontSize: 14,
    lineHeight: 20,
  },
  list: {
    gap: spacing.md,
  },
  actionList: {
    gap: spacing.sm,
  },
  supportedStates: {
    gap: spacing.md,
  },
  supportedSummary: {
    minHeight: 54,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  supportedSummaryValue: {
    color: colors.accentDeep,
    fontSize: 22,
    fontWeight: '900',
  },
  supportedSummaryText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  supportedStateChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  supportedStateChip: {
    minHeight: 32,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportedStateChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  supportedStateChipText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '900',
  },
  supportedStateChipTextActive: {
    color: colors.surfaceStrong,
  },
  supportedStateGroup: {
    gap: spacing.sm,
  },
  supportedStateHeader: {
    minHeight: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  supportedStateTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  supportedStateCount: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  supportedRiverList: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  supportedRiverRow: {
    minHeight: 66,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
  },
  supportedScore: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportedScoreText: {
    fontSize: 16,
    fontWeight: '900',
  },
  supportedRiverCopy: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  supportedRiverName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  supportedRiverMeta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  supportedEmptyText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  safetyRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionRow: {
    minHeight: 62,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCopy: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  rowBody: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  diagnosticCard: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  diagnosticIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diagnosticIdle: {
    backgroundColor: colors.accent,
  },
  diagnosticOk: {
    backgroundColor: colors.strong,
  },
  diagnosticError: {
    backgroundColor: colors.noGo,
  },
  diagnosticCopy: {
    flex: 1,
    gap: 2,
  },
  diagnosticTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  diagnosticText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  primaryButton: {
    alignSelf: 'flex-start',
    minHeight: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: spacing.md,
  },
  primaryButtonDisabled: {
    opacity: 0.64,
  },
  primaryButtonText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '900',
  },
  observabilityCard: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: 3,
  },
  observabilityLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  observabilityValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  observabilityMeta: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  diagnosticTable: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  diagnosticRow: {
    minHeight: 46,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: 3,
  },
  diagnosticRowLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.35,
    textTransform: 'uppercase',
  },
  diagnosticRowValue: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
});
