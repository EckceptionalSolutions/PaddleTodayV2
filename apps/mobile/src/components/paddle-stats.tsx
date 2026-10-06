import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';

export function PaddleStats({ distanceMeters, elapsedSeconds, live = false }: { distanceMeters: number; elapsedSeconds: number; live?: boolean }) {
  const seconds = Math.max(0, Math.floor(elapsedSeconds));
  const hours = Math.floor(seconds / 3600), minutes = Math.floor(seconds / 60) % 60;
  const duration = live ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
    : hours ? `${hours} hr ${minutes} min` : seconds < 60 ? `${seconds} sec` : `${minutes} min`;
  const miles = distanceMeters / 1609.344;
  return <View style={styles.row}>
    <View style={styles.stat} accessible accessibilityLabel={`Recorded distance: ${miles.toFixed(1)} miles`}>
      <Text style={styles.value}>{miles < 10 ? miles.toFixed(1) : Math.round(miles)}<Text style={styles.unit}> mi</Text></Text>
      <Text style={styles.label}>Recorded distance</Text>
    </View>
    <View style={styles.stat} accessible accessibilityLabel={`Paddle time: ${hours} hours, ${minutes} minutes, ${seconds % 60} seconds`}>
      <Text style={[styles.value, live && styles.clock]}>{duration}</Text>
      <Text style={styles.label}>Paddle time</Text>
    </View>
  </View>;
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  stat: { flex: 1, minWidth: 110, padding: spacing.sm, gap: 4, borderRadius: radius.md, backgroundColor: colors.canvas },
  value: { color: colors.accentDeep, fontSize: 26, lineHeight: 34, fontWeight: '800', fontVariant: ['tabular-nums'] },
  clock: { fontSize: 23 },
  unit: { ...typography.label, color: colors.textMuted },
  label: { ...typography.caption, color: colors.textMuted },
});
