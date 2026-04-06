import type { RiverHistoryDaySummary } from '@paddletoday/api-contract';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/tokens';

export function HistoryBars({ days }: { days: RiverHistoryDaySummary[] }) {
  if (days.length === 0) {
    return <Text style={styles.empty}>History is still building for this route.</Text>;
  }

  const recentDays = days.slice(-7);
  const maxScore = Math.max(100, ...recentDays.map((day) => day.maxScore));

  return (
    <View style={styles.wrap}>
      <View style={styles.chart}>
        {recentDays.map((day) => {
          const barHeight = Math.max(12, Math.round((day.avgScore / maxScore) * 120));
          return (
            <View key={day.date} style={styles.column}>
              <Text style={styles.scoreLabel}>{day.avgScore}</Text>
              <View style={[styles.bar, { height: barHeight }, barTone(day.latestRating)]} />
              <Text style={styles.dayLabel}>
                {new Date(`${day.date}T12:00:00`).toLocaleDateString('en-US', {
                  weekday: 'short',
                })}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function barTone(rating: RiverHistoryDaySummary['latestRating']) {
  if (rating === 'Strong') return { backgroundColor: colors.strong };
  if (rating === 'Good') return { backgroundColor: colors.good };
  if (rating === 'Fair') return { backgroundColor: colors.fair };
  return { backgroundColor: colors.noGo };
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  scoreLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  bar: {
    width: '100%',
    borderRadius: 12,
    minHeight: 12,
  },
  dayLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  empty: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
