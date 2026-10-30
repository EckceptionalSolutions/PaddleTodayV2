import type { LiveDataOverall } from '@paddletoday/api-contract';
import { StyleSheet, Text, View } from 'react-native';
import { radius, type AppColors } from '../theme/tokens';
import { useAppTheme, useThemedStyles } from '../theme/theme-provider';

export function StatusPill({ status }: { status: LiveDataOverall }) {
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createStyles);
  const tone = toneForStatus(status, colors);

  return (
    <View style={[styles.pill, tone.pill]}>
      <Text style={[styles.label, tone.label]}>{status}</Text>
    </View>
  );
}

function toneForStatus(status: LiveDataOverall, colors: AppColors) {
  if (status === 'live') {
    return {
      pill: { backgroundColor: colors.strongSoft },
      label: { color: colors.live },
    };
  }

  if (status === 'degraded') {
    return {
      pill: { backgroundColor: colors.fairSoft },
      label: { color: colors.degraded },
    };
  }

  return {
    pill: { backgroundColor: colors.noGoSoft },
    label: { color: colors.offline },
  };
}

const createStyles = (_colors: AppColors) => StyleSheet.create({
  pill: {
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
