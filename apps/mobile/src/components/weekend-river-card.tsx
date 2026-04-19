import type { WeekendSummaryApiItem } from '@paddletoday/api-contract';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { normalizeApiText } from '../lib/format';
import { colors, radius, spacing } from '../theme/tokens';
import { RatingPill } from './rating-pill';
import { SaveToggleButton } from './save-toggle-button';
import { StatusPill } from './status-pill';

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
    <Pressable style={styles.card} onPress={onPress}>
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
        <StatusPill status={river.liveData.overall} />
        <Text style={styles.metaText}>Today {river.current.score}</Text>
        <Text style={styles.metaText}>{river.weekend.confidence} confidence</Text>
      </View>

      <Text style={styles.explanation}>{normalizeApiText(river.weekend.explanation)}</Text>
      <Text style={styles.signalLine}>{normalizeApiText(river.weekend.signalLine)}</Text>

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
    padding: spacing.lg,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  scoreBlock: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    color: colors.accentDeep,
    fontSize: 30,
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
    fontSize: 18,
    fontWeight: '800',
  },
  reach: {
    color: colors.textMuted,
    fontSize: 14,
  },
  summary: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    alignItems: 'center',
  },
  metaText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  explanation: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  signalLine: {
    color: colors.textMuted,
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
