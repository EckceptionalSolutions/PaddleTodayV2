import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { PaddleTrackingSession } from '../lib/paddle-tracking';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { AppButton } from './app-button';
import { PaddleStats } from './paddle-stats';

export function PaddleRecordingCard({ session, elapsedSeconds, busy, onPause, onResume, onFinish, onDiscard, onOpen }: {
  session: PaddleTrackingSession; elapsedSeconds: number; busy: boolean;
  onPause: () => void; onResume: () => void; onFinish: () => void; onDiscard: () => void; onOpen?: () => void;
}) {
  const recording = session.status === 'recording', finished = session.status === 'finished';
  const status = recording ? 'Recording' : finished ? 'Ready to save' : 'Paused';
  return <View style={styles.card}>
    <View style={styles.topline}>
      <View style={[styles.status, !recording && styles.statusQuiet]}>
        <MaterialCommunityIcons name={recording ? 'record-circle' : finished ? 'check-circle-outline' : 'pause-circle-outline'} size={18} color={recording ? '#B44734' : colors.accentDeep} />
        <Text style={styles.statusText}>{status}</Text>
      </View>
      <View style={styles.privacy}><MaterialCommunityIcons name="lock-outline" size={14} color={colors.textMuted} /><Text style={styles.privacyText}>Only you</Text></View>
    </View>
    <Text accessibilityRole="header" style={styles.route}>{session.route.name}</Text>
    <PaddleStats distanceMeters={session.distanceMeters} elapsedSeconds={elapsedSeconds} live />
    <Text style={styles.copy}>{recording ? 'Keep paddling. Recording continues with your screen locked.' : finished ? 'GPS recording has ended. Save the track to keep this paddle.' : 'Location recording is paused. Resume when you’re ready to paddle.'}</Text>
    {session.interruptedAt ? <View style={styles.interruption}><MaterialCommunityIcons name="information-outline" size={18} color={colors.accentDeep} /><Text style={styles.copy}>Recording stopped while the app was closed. No location was recorded during that time.</Text></View> : null}
    <View style={styles.actions}>
      {!finished ? <AppButton label={recording ? 'Pause' : 'Resume'} icon={recording ? 'pause' : 'play'} variant="secondary" disabled={busy} onPress={recording ? onPause : onResume} style={styles.action} /> : null}
      <AppButton label={finished ? 'Save paddle' : 'Finish paddle'} icon={finished ? 'check' : 'stop'} disabled={busy} onPress={onFinish} style={styles.action} />
    </View>
    {onOpen ? <AppButton label="Open recording" icon="arrow-right" variant="secondary" disabled={busy} onPress={onOpen} /> : <Text style={styles.copy}>{recording ? 'You can leave this screen and return to these controls.' : finished ? 'If saving fails, the track stays on this device so you can retry.' : 'Paused time is excluded from your paddle time.'}</Text>}
    <Pressable accessibilityRole="button" accessibilityLabel="Discard unsaved recording" disabled={busy} onPress={onDiscard} style={styles.discard}><Text style={styles.discardText}>Discard recording</Text></Pressable>
  </View>;
}
const styles = StyleSheet.create({
  card: { gap: spacing.md, padding: spacing.md, borderRadius: radius.lg, borderWidth: 1.5, borderColor: colors.accent, backgroundColor: colors.surfaceStrong },
  topline: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  status: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: radius.pill, backgroundColor: '#FBE7E0' },
  statusQuiet: { backgroundColor: colors.accentSoft },
  statusText: { ...typography.label, color: colors.text },
  privacy: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  privacyText: { ...typography.caption, color: colors.textMuted },
  route: { ...typography.title, color: colors.text },
  copy: { ...typography.supporting, color: colors.textMuted, flexShrink: 1 },
  interruption: { flexDirection: 'row', gap: 8, padding: spacing.sm, borderRadius: radius.sm, backgroundColor: colors.canvas },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  action: { flex: 1, minWidth: 115, minHeight: 52 },
  discard: { minHeight: 44, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', paddingHorizontal: spacing.md },
  discardText: { ...typography.supporting, color: colors.textMuted, textDecorationLine: 'underline' },
});
