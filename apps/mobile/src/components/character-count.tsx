import { StyleSheet, Text } from 'react-native';
import { colors, typography } from '../theme/tokens';

export function CharacterCount({ value, limit }: { value: string; limit: number }) {
  if (value.length < limit * 0.8) return null;
  const reached = value.length >= limit;
  return <Text style={styles.count} accessibilityLiveRegion={reached ? 'polite' : 'none'}>
    {value.length}/{limit} characters{reached ? ' · Limit reached' : ''}
  </Text>;
}

const styles = StyleSheet.create({ count: { ...typography.caption, color: colors.textMuted } });
