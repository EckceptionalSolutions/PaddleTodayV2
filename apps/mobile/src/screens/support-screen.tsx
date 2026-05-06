import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../components/section-card';
import { appDiagnosticRows } from '../lib/app-diagnostics';
import { resolveApiBaseUrl, resolveApiUrl } from '../lib/api-base-url';
import { captureAppException, observabilityStatus, trackAppEvent } from '../lib/observability';
import { colors, radius, spacing } from '../theme/tokens';

type DiagnosticState = 'idle' | 'checking' | 'ok' | 'error';

export default function SupportScreen() {
  const [diagnosticState, setDiagnosticState] = useState<DiagnosticState>('idle');
  const [diagnosticText, setDiagnosticText] = useState(`API: ${resolveApiBaseUrl()}`);

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
      setDiagnosticText(error instanceof Error ? error.message : 'Could not reach the PaddleToday API.');
      captureAppException(error, {
        name: 'api_diagnostic_failed',
        extra: {
          apiBaseUrl: resolveApiBaseUrl(),
        },
      });
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>More</Text>
        <Text style={styles.title}>Safety, support, and app checks.</Text>
        <Text style={styles.subtitle}>
          Important release surfaces stay easy to find without adding noise to the main paddling workflow.
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
          <ActionRow icon="bug-outline" title="Email app diagnostics" body="Send build, API, and environment details." onPress={() => openUrl(buildDiagnosticsEmailUrl())} />
          <ActionRow icon="plus-circle-outline" title="Request a route" body="Send put-in, take-out, and source notes." onPress={() => openUrl('https://paddletoday.com/request-river/')} />
          <ActionRow icon="shield-check-outline" title="Privacy policy" body="How app and route information is handled." onPress={() => openUrl('https://paddletoday.com/privacy/')} />
          <ActionRow icon="file-document-outline" title="Terms and safety" body="Use, safety, and submission terms." onPress={() => openUrl('https://paddletoday.com/terms/')} />
        </View>
      </SectionCard>

      <SectionCard title="API diagnostic" subtitle="Use this when a native build opens but the boards do not load.">
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

      <SectionCard title="Observability" subtitle="Release builds report errors only after Sentry is configured.">
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
  if (state === 'ok') return 'API is reachable';
  if (state === 'error') return 'API check failed';
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
