import type { LiveDataOverall } from '@paddletoday/api-contract';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme/tokens';

export function StatusPill({ status }: { status: LiveDataOverall }) {
  const tone = toneForStatus(status);

  return (
    <View style={[styles.pill, tone.pill]}>
      <Text style={[styles.label, tone.label]}>{status}</Text>
    </View>
  );
}

function toneForStatus(status: LiveDataOverall) {
  if (status === 'live') {
    return {
      pill: { backgroundColor: '#E0EFE9' },
      label: { color: colors.live },
    };
  }

  if (status === 'degraded') {
    return {
      pill: { backgroundColor: '#F3E8CC' },
      label: { color: colors.degraded },
    };
  }

  return {
    pill: { backgroundColor: '#F2DDD6' },
    label: { color: colors.offline },
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
    textTransform: 'capitalize',
  },
});
