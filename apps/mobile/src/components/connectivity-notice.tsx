import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnlineStatus } from '../hooks/use-online-status';
import { colors, spacing } from '../theme/tokens';

export function ConnectivityNotice() {
  const online = useOnlineStatus();
  const insets = useSafeAreaInsets();
  if (online) return null;
  return <View style={[styles.notice, { paddingTop: spacing.sm + (Platform.OS === 'web' ? 0 : insets.top) }]}
    accessibilityRole="alert" accessibilityLiveRegion="polite">
    <MaterialCommunityIcons name="wifi-off" size={18} color={colors.text} accessible={false} />
    <Text style={styles.copy}>You’re offline. Saved plans stay on this device; backup and river data refresh when you reconnect.</Text>
  </View>;
}

const styles = StyleSheet.create({
  notice: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm, backgroundColor: colors.canvasMuted, borderBottomWidth: 1, borderBottomColor: colors.border },
  copy: { flex: 1, color: colors.text, fontSize: 12, lineHeight: 17, fontWeight: '600' },
});
