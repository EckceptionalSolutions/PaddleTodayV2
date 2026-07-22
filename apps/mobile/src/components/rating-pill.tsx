import type { ScoreRating } from '@paddletoday/api-contract';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme/tokens';

export function RatingPill({ rating }: { rating: ScoreRating }) {
  const tone = ratingColors(rating);

  return (
    <View style={[styles.pill, { backgroundColor: tone.backgroundColor }]}>
      <Text style={[styles.label, { color: tone.textColor }]}>{rating}</Text>
    </View>
  );
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
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
