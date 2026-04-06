import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { GestureResponderEvent } from 'react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';

export function SaveToggleButton({
  saved,
  onPress,
  compact = false,
}: {
  saved: boolean;
  onPress: () => void;
  compact?: boolean;
}) {
  function handlePress(event: GestureResponderEvent) {
    event.stopPropagation();
    onPress();
  }

  if (compact) {
    return (
      <Pressable style={styles.compactButton} onPress={handlePress} hitSlop={10}>
        <MaterialCommunityIcons
          name={saved ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color={saved ? colors.accent : colors.textMuted}
        />
      </Pressable>
    );
  }

  return (
    <Pressable style={[styles.button, saved ? styles.buttonSaved : null]} onPress={handlePress}>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name={saved ? 'bookmark' : 'bookmark-outline'}
          size={18}
          color={saved ? colors.surfaceStrong : colors.accent}
        />
        <Text style={[styles.label, saved ? styles.labelSaved : null]}>
          {saved ? 'Saved' : 'Save river'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
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
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
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
