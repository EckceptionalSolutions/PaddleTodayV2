import { StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useStoredLocation } from '../hooks/use-stored-location';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { AppButton } from './app-button';

export function LocationStorageNotice() {
  const { location, storageState, retryLocationSave } = useStoredLocation();
  const focused = useIsFocused();
  if (!focused || !storageState.error) return null;
  return <View style={styles.notice}>
    <Text accessibilityLiveRegion="polite" style={styles.message}>{location
      ? `${location.label} is in use, but could not be saved on this device. It may be lost after restarting.`
      : 'The location is cleared for this session, but could not be removed from this device. It may return after restarting.'}</Text>
    <AppButton label="Retry saving location" busy={storageState.saving} busyLabel="Saving location…" onPress={() => void retryLocationSave()} />
  </View>;
}
const styles = StyleSheet.create({
  notice: { padding: spacing.md, gap: spacing.sm, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.canvasMuted },
  message: { ...typography.supporting, color: colors.text },
});
