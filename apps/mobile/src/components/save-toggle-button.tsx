import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useRef } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { ActivityIndicator, Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { usePressMotion } from '../hooks/use-press-motion';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function SaveToggleButton({
  saved,
  routeLabel,
  routeSlug,
  onPress,
  compact = false,
  primary = false,
}: {
  saved: boolean;
  routeLabel: string;
  routeSlug: string;
  onPress: () => void;
  compact?: boolean;
  primary?: boolean;
}) {
  const { isUpdatingSavedRiver } = useSavedRivers();
  const busy = isUpdatingSavedRiver(routeSlug);
  const motion = usePressMotion(busy);
  const iconScale = useRef(new Animated.Value(1)).current;
  const requestedSave = useRef<string | null>(null);
  useEffect(() => {
    const justSaved = requestedSave.current === routeSlug && saved;
    if (!busy) requestedSave.current = null;
    iconScale.stopAnimation();
    iconScale.setValue(1);
    // The provider changes saved state after persistence succeeds. Never
    // celebrate a tap, failed write, or saved-state hydration.
    if (!justSaved || busy || motion.reducedMotion) return;
    const animation = Animated.sequence([
      Animated.timing(iconScale, { toValue: 1.2, duration: 110, useNativeDriver: Platform.OS !== 'web', isInteraction: false }),
      Animated.spring(iconScale, { toValue: 1, stiffness: 320, damping: 18, mass: 0.6, useNativeDriver: Platform.OS !== 'web', isInteraction: false }),
    ]);
    animation.start();
    return () => { animation.stop(); iconScale.setValue(1); };
  }, [busy, iconScale, motion.reducedMotion, routeSlug, saved]);
  function handlePress(event: GestureResponderEvent) {
    event.stopPropagation();
    if (!busy) {
      requestedSave.current = saved ? null : routeSlug;
      onPress();
    }
  }

  if (compact) {
    return (
      <AnimatedPressable
        style={[styles.compactButton, primary ? styles.compactButtonPrimary : null, saved ? styles.compactButtonSaved : null, motion.style]}
        onPressIn={motion.onPressIn} onPressOut={motion.onPressOut}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={`${saved ? 'Remove saved route' : 'Save route'}: ${routeLabel}`}
        accessibilityHint={saved ? 'Removes this route from Saved routes.' : 'Adds this route to Saved routes.'}
        disabled={busy}
        aria-busy={busy}
        accessibilityState={{ selected: saved, disabled: busy, busy }}
        aria-pressed={saved}
        android_ripple={{ color: colors.canvasMuted, borderless: true }}
      >
        <Animated.View style={{ transform: [{ scale: iconScale }] }} pointerEvents="none">
        {busy ? <ActivityIndicator size="small" color={saved ? colors.surfaceStrong : colors.accent} /> : <MaterialCommunityIcons
          name={saved ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color={saved ? colors.surfaceStrong : primary ? colors.accent : colors.textMuted}
        />}
        </Animated.View>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      style={[styles.button, saved ? styles.buttonSaved : null, motion.style]}
      onPressIn={motion.onPressIn} onPressOut={motion.onPressOut}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${saved ? 'Remove saved route' : 'Save route'}: ${routeLabel}`}
      accessibilityHint={saved ? 'Removes this route from Saved routes.' : 'Adds this route to Saved routes.'}
      disabled={busy}
      aria-busy={busy}
      accessibilityState={{ selected: saved, disabled: busy, busy }}
      aria-pressed={saved}
      android_ripple={{ color: colors.accentSoft }}
    >
      <View style={styles.row}>
        <Animated.View style={{ transform: [{ scale: iconScale }] }} pointerEvents="none">
        {busy ? <ActivityIndicator size="small" color={saved ? colors.surfaceStrong : colors.accent} /> : <MaterialCommunityIcons
          name={saved ? 'bookmark' : 'bookmark-outline'}
          size={18}
          color={saved ? colors.surfaceStrong : colors.accent}
        />}
        </Animated.View>
        <Text style={[styles.label, saved ? styles.labelSaved : null]}>
          {busy ? saved ? 'Removing…' : 'Saving…' : saved ? 'Saved' : 'Save'}
        </Text>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  buttonSaved: {
    backgroundColor: colors.accent,
  },
  compactButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  compactButtonPrimary: {
    borderColor: colors.accent,
  },
  compactButtonSaved: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  label: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  labelSaved: {
    color: colors.surfaceStrong,
  },
});
