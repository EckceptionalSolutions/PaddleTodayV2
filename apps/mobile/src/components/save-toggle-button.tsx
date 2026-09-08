import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { GestureResponderEvent } from 'react-native';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

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
  function handlePress(event: GestureResponderEvent) {
    event.stopPropagation();
    if (!busy) onPress();
  }

  if (compact) {
    return (
      <Pressable
        style={[styles.compactButton, primary ? styles.compactButtonPrimary : null, saved ? styles.compactButtonSaved : null]}
        onPress={handlePress}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel={`${saved ? 'Remove saved route' : 'Save route'}: ${routeLabel}`}
        accessibilityHint={saved ? 'Removes this route from Saved routes.' : 'Adds this route to Saved routes.'}
        disabled={busy}
        aria-busy={busy}
        accessibilityState={{ selected: saved, disabled: busy, busy }}
        aria-pressed={saved}
        android_ripple={{ color: colors.canvasMuted, borderless: true }}
      >
        {busy ? <ActivityIndicator size="small" color={saved ? colors.surfaceStrong : colors.accent} /> : <MaterialCommunityIcons
          name={saved ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color={saved ? colors.surfaceStrong : primary ? colors.accent : colors.textMuted}
        />}
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[styles.button, saved ? styles.buttonSaved : null]}
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
        {busy ? <ActivityIndicator size="small" color={saved ? colors.surfaceStrong : colors.accent} /> : <MaterialCommunityIcons
          name={saved ? 'bookmark' : 'bookmark-outline'}
          size={18}
          color={saved ? colors.surfaceStrong : colors.accent}
        />}
        <Text style={[styles.label, saved ? styles.labelSaved : null]}>
          {busy ? saved ? 'Removing…' : 'Saving…' : saved ? 'Saved' : 'Save'}
        </Text>
      </View>
    </Pressable>
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
    width: 44,
    height: 44,
    borderRadius: 22,
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
