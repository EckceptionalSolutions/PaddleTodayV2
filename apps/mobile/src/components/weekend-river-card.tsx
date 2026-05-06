import type { WeekendSummaryApiItem } from '@paddletoday/api-contract';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { normalizeApiText } from '../lib/format';
import { routeFactItems } from '../lib/route-facts';
import { colors, radius, spacing } from '../theme/tokens';
import { RatingPill } from './rating-pill';
import { SaveToggleButton } from './save-toggle-button';

export function WeekendRiverCard({
  river,
  saved = false,
  onToggleSaved,
  onPress,
}: {
  river: WeekendSummaryApiItem;
  saved?: boolean;
  onToggleSaved?: () => void;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress} android_ripple={{ color: colors.canvasMuted }}>
      <View style={styles.header}>
        <View style={styles.scoreBlock}>
          <Text style={styles.score}>{river.weekend.score}</Text>
          <Text style={styles.scoreLabel}>Weekend</Text>
        </View>
        <View style={styles.copy}>
          <View style={styles.topRow}>
            <Text style={styles.name}>{river.river.name}</Text>
            <View style={styles.actions}>
              {onToggleSaved ? <SaveToggleButton compact saved={saved} onPress={onToggleSaved} /> : null}
              <RatingPill rating={river.weekend.rating} />
            </View>
          </View>
          <Text style={styles.reach}>{river.river.reach}</Text>
          <Text style={styles.summary}>{normalizeApiText(river.weekend.summary)}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        {weekendFactItems(river).map((fact) => (
          <Text key={fact} style={styles.factChip} numberOfLines={1}>{fact}</Text>
        ))}
      </View>

      <View style={[styles.riskPanel, riskToneStyle(river)]}>
        <Text style={styles.riskLabel}>{planRiskLabel(river)}</Text>
        <Text style={styles.explanation}>{normalizeApiText(river.weekend.explanation)}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{river.river.region}</Text>
        <Text style={styles.footerText}>{river.weekend.label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  scoreBlock: {
    width: 62,
    height: 62,
    borderRadius: 17,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    color: colors.accentDeep,
    fontSize: 24,
    fontWeight: '800',
  },
  scoreLabel: {
    color: colors.textMuted,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  name: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  reach: {
    color: colors.textMuted,
    fontSize: 14,
  },
  summary: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
  },
  factChip: {
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  riskPanel: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: 4,
  },
  riskStable: {
    backgroundColor: '#E0EFE9',
  },
  riskWeather: {
    backgroundColor: '#F3E8CC',
  },
  riskUncertain: {
    backgroundColor: '#F2DDD6',
  },
  riskLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  explanation: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 12,
    flex: 1,
  },
});

function weekendFactItems(river: WeekendSummaryApiItem) {
  return routeFactItems(river.river, { includePaddleTime: true });
}

function planRiskLabel(river: WeekendSummaryApiItem) {
  if (river.weekend.confidence === 'High' && river.weekend.rating === river.current.rating) {
    return 'Stable plan';
  }

  const explanation = normalizeApiText(`${river.weekend.explanation} ${river.weekend.signalLine}`).toLowerCase();
  if (explanation.includes('rain') || explanation.includes('storm') || explanation.includes('wind') || explanation.includes('forecast')) {
    return 'Weather dependent';
  }

  return river.weekend.confidence === 'Low' ? 'Gauge uncertain' : 'Recheck before committing';
}

function riskToneStyle(river: WeekendSummaryApiItem) {
  const label = planRiskLabel(river);
  if (label === 'Stable plan') return styles.riskStable;
  if (label === 'Weather dependent' || label === 'Recheck before committing') return styles.riskWeather;
  return styles.riskUncertain;
}
