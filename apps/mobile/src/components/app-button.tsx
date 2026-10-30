import { useState, type ComponentProps } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { usePressMotion } from '../hooks/use-press-motion';
import { radius, spacing, typography, type AppColors } from '../theme/tokens';
import { useAppTheme, useThemedStyles } from '../theme/theme-provider';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function AppButton({ label, accessibilityLabel = label, hint, onPress, disabled = false, busy = false, expanded,
  busyLabel = label, variant = 'primary', icon, style, selected }: {
  label: string; accessibilityLabel?: string; hint?: string; onPress: () => void;
  disabled?: boolean; busy?: boolean; expanded?: boolean; busyLabel?: string; variant?: 'primary' | 'secondary';
  selected?: boolean;
  icon?: ComponentProps<typeof MaterialCommunityIcons>['name']; style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createStyles);
  const inactive = disabled || busy;
  const motion = usePressMotion(inactive);
  const [pressed, setPressed] = useState(false);
  const foreground = variant === 'primary' ? colors.onAccent : colors.accentDeep;
  return <AnimatedPressable accessibilityRole="button" accessibilityLabel={accessibilityLabel} accessibilityHint={hint}
    accessibilityState={{ disabled: inactive, busy, expanded, selected }} aria-expanded={expanded} aria-busy={busy} disabled={inactive} onPress={onPress}
    onPressIn={() => { setPressed(true); motion.onPressIn(); }} onPressOut={() => { setPressed(false); motion.onPressOut(); }}
    style={[styles.button, variant === 'secondary' ? styles.secondary : styles.primary,
      pressed && !inactive ? styles.pressed : null, inactive ? styles.disabled : null, style, motion.style]}>
    {busy ? <ActivityIndicator color={foreground} size="small" accessibilityElementsHidden importantForAccessibility="no" />
      : icon ? <MaterialCommunityIcons name={icon} size={18} color={foreground} accessible={false} /> : null}
    <Text style={[styles.label, { color: foreground }]}>{busy ? busyLabel : label}</Text>
  </AnimatedPressable>;
}
const createStyles = (colors: AppColors) => StyleSheet.create({
  button: { minHeight: 44, maxWidth: '100%', paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radius.pill,
    borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs },
  primary: { backgroundColor: colors.accent, borderColor: colors.accent },
  secondary: { backgroundColor: colors.surfaceStrong, borderColor: colors.accent },
  pressed: { opacity: 0.75 }, disabled: { opacity: 0.6 },
  label: { ...typography.label, flexShrink: 1, textAlign: 'center' },
});
