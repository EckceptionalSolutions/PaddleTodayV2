import type { DecisionReadinessStatus, ScoreRating } from '@paddletoday/api-contract';
import { StyleSheet, Text, View } from 'react-native';
import { callStateForDecision, qualityForDecision, qualityForRating } from '../lib/format';
import { colors, radius } from '../theme/tokens';

export function RatingPill({ rating }: { rating: ScoreRating }) {
  const tone = ratingColors(rating);

  return (
    <View style={[styles.pill, { backgroundColor: tone.backgroundColor }]}>
      <Text style={[styles.label, { color: tone.textColor }]}>{qualityForRating(rating)}</Text>
    </View>
  );
}

/** Tier label when evidence is ready; otherwise repeats the gated public call. */
export function QualityPill({ rating, readiness = 'ready' }: { rating: ScoreRating; readiness?: DecisionReadinessStatus }) {
  const tone = decisionColors(rating, readiness);

  return (
    <View style={[styles.pill, styles.qualityPill, { backgroundColor: tone.backgroundColor }]}>
      <Text style={[styles.label, { color: tone.textColor }]}>{qualityForDecision(rating, readiness)}</Text>
    </View>
  );
}

export function decisionColors(rating: ScoreRating, readiness: DecisionReadinessStatus) {
  const call = callStateForDecision(rating, readiness);
  if (call === 'unavailable') return { backgroundColor: colors.canvasMuted, textColor: colors.textMuted };
  return ratingColors(call === 'skip' ? 'No-go' : call === 'watch' ? 'Fair' : rating);
}

export function ratingColors(rating: string | null | undefined) {
  if (rating === 'Strong') {
    return {
      backgroundColor: '#E0EFE9',
      textColor: colors.strong,
    };
  }

  if (rating === 'Good') {
    return {
      backgroundColor: '#E8EFD9',
      textColor: colors.good,
    };
  }

  if (rating === 'Fair') {
    return {
      backgroundColor: '#F3E8CC',
      textColor: colors.fair,
    };
  }

  return {
    backgroundColor: '#F2DDD6',
    textColor: colors.noGo,
  };
}

const styles = StyleSheet.create({
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
