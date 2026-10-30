import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';
import { spacing, type AppColors } from '../theme/tokens';
import { useAppTheme, useThemedStyles } from '../theme/theme-provider';

export function RoutePhotoFallback({ compact = false, label = 'No photo yet' }: { compact?: boolean; label?: string }) {
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.placeholder}>
      <MaterialCommunityIcons name="waves" size={compact ? 26 : 36} color={colors.textMuted} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.canvasMuted,
    padding: spacing.sm,
  },
  label: { color: colors.textMuted, fontSize: 12, fontWeight: '500', textAlign: 'center' },
});
