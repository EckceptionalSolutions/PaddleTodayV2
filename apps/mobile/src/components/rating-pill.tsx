import type { ScoreRating } from '@paddletoday/api-contract';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme/tokens';

export function RatingPill({ rating }: { rating: ScoreRating }) {
  const tone = ratingTone(rating);

  return (
    <View style={[styles.pill, tone.pill]}>
      <Text style={[styles.label, tone.label]}>{rating}</Text>
    </View>
  );
}

function ratingTone(rating: ScoreRating) {
  if (rating === 'Strong') {
    return {
      pill: { backgroundColor: '#E0EFE9' },
      label: { color: colors.strong },
    };
  }

  if (rating === 'Good') {
    return {
      pill: { backgroundColor: '#E8EFD9' },
      label: { color: colors.good },
    };
  }

  if (rating === 'Fair') {
    return {
      pill: { backgroundColor: '#F3E8CC' },
      label: { color: colors.fair },
    };
  }

  return {
    pill: { backgroundColor: '#F2DDD6' },
    label: { color: colors.noGo },
  };
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
