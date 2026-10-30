import { StyleSheet, Text } from 'react-native';
import { typography, type AppColors } from '../theme/tokens';
import { useThemedStyles } from '../theme/theme-provider';

export function CharacterCount({ value, limit }: { value: string; limit: number }) {
  const styles = useThemedStyles(createStyles);
  if (value.length < limit * 0.8) return null;
  const reached = value.length >= limit;
  return <Text style={styles.count} accessibilityLiveRegion={reached ? 'polite' : 'none'}>
    {value.length}/{limit} characters{reached ? ' · Limit reached' : ''}
  </Text>;
}

const createStyles = (colors: AppColors) => StyleSheet.create({ count: { ...typography.caption, color: colors.textMuted } });
