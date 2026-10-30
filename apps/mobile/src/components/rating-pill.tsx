import type { DecisionReadinessStatus, ScoreRating } from '@paddletoday/api-contract';
import { StyleSheet, Text, View } from 'react-native';
import { callStateForDecision, qualityForDecision, qualityForRating } from '../lib/format';
import { radius, type AppColors, lightColors } from '../theme/tokens';
import { useAppTheme, useThemedStyles } from '../theme/theme-provider';

export function RatingPill({ rating }: { rating: ScoreRating }) {
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createStyles);
  const tone = ratingColors(rating, colors);

  return (
    <View style={[styles.pill, { backgroundColor: tone.backgroundColor }]}>
      <Text style={[styles.label, { color: tone.textColor }]}>{qualityForRating(rating)}</Text>
    </View>
  );
}

/** Tier label when evidence is ready; otherwise repeats the gated public call. */
export function QualityPill({ rating, readiness = 'ready' }: { rating: ScoreRating; readiness?: DecisionReadinessStatus }) {
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createStyles);
  const tone = decisionColors(rating, readiness, colors);

  return (
    <View style={[styles.pill, styles.qualityPill, { backgroundColor: tone.backgroundColor }]}>
      <Text style={[styles.label, { color: tone.textColor }]}>{qualityForDecision(rating, readiness)}</Text>
    </View>
  );
}

export function decisionColors(rating: ScoreRating, readiness: DecisionReadinessStatus, colors: AppColors = lightColors) {
  const call = callStateForDecision(rating, readiness);
  if (call === 'unavailable') return { backgroundColor: colors.canvasMuted, textColor: colors.textMuted };
  return ratingColors(call === 'skip' ? 'No-go' : call === 'watch' ? 'Fair' : rating, colors);
}

export function ratingColors(rating: string | null | undefined, colors: AppColors = lightColors) {
  if (rating === 'Strong') {
    return {
      backgroundColor: colors.strongSoft,
      textColor: colors.strong,
    };
  }

  if (rating === 'Good') {
    return {
      backgroundColor: colors.goodSoft,
      textColor: colors.good,
    };
  }

  if (rating === 'Fair') {
    return {
      backgroundColor: colors.fairSoft,
      textColor: colors.fair,
    };
  }

  return {
    backgroundColor: colors.noGoSoft,
    textColor: colors.noGo,
  };
}

const createStyles = (_colors: AppColors) => StyleSheet.create({
  pill: {
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  qualityPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
