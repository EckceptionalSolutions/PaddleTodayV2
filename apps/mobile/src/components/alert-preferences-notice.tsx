import { StyleSheet, Text, View } from 'react-native';
import { useAlertPreferences } from '../providers/alert-preferences-provider';
import { colors, radius, spacing } from '../theme/tokens';
import { AppButton } from './app-button';

export function AlertPreferencesNotice() {
  const { loadError, saveError, busy, retryStorage } = useAlertPreferences();
  if (!loadError && !saveError) return null;
  return <View style={styles.notice}>
    <Text accessibilityRole="header" style={styles.title}>
      {loadError ? 'Local alert preferences unavailable' : 'Remember this on your device'}
    </Text>
    <Text accessibilityLiveRegion="polite" style={styles.body}>
      {loadError
        ? 'Your saved alert choices and contact email could not be read. Existing data is preserved. Retry to restore it and remember any new choices.'
        : 'This device could not remember your latest alert choices or contact email. Retrying saves them locally; it does not resend a subscription or contribution.'}
    </Text>
    <AppButton label={loadError ? 'Retry loading local preferences' : 'Retry saving local preferences'}
      busy={busy} busyLabel="Retrying…" variant="secondary" onPress={() => void retryStorage()} />
  </View>;
}
const styles = StyleSheet.create({
  notice: { padding: spacing.md, gap: spacing.sm, backgroundColor: colors.canvasMuted, borderColor: colors.border, borderWidth: 1, borderRadius: radius.md },
  title: { color: colors.text, fontSize: 15, lineHeight: 20, fontWeight: '800' },
  body: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
});
