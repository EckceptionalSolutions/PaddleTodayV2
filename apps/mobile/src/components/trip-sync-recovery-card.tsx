import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { PendingTripWork } from '@paddletoday/api-client';
import { tripSyncRecovery } from '../lib/trip-sync-recovery';
import { AppButton } from './app-button';
import { SectionCard } from './section-card';
import { colors, spacing, typography } from '../theme/tokens';

export function TripSyncRecoveryCard({ work, busy, onRetry, onDiscard, onShare, onClose }: {
  work: PendingTripWork; busy: boolean; onRetry: () => void; onDiscard: () => void; onShare: (text: string) => void; onClose: () => void;
}) {
  const summary = tripSyncRecovery(work);
  const [more, setMore] = useState(false);
  return <SectionCard title="Saved on this device" subtitle={summary.title}>
    <Text style={styles.copy}>{summary.error || summary.detail}</Text>
    {summary.facts.map((fact, index) => <View key={index} style={styles.fact}>
      <Text style={styles.label}>{fact.label}</Text><Text selectable style={styles.value}>{fact.value}</Text>
    </View>)}
    <AppButton label="Retry sync" icon="cloud-sync-outline" disabled={busy} onPress={onRetry} />
    <AppButton label="Keep changes & close" variant="secondary" disabled={busy} onPress={onClose} />
    <AppButton label="More options" variant="secondary" expanded={more} disabled={busy} onPress={() => setMore(!more)} />
    {more ? <>
      {summary.facts.length ? <AppButton label="Share saved details" variant="secondary" disabled={busy} onPress={() => onShare(summary.shareText)} /> : null}
      <Text style={styles.copy}>Discard removes only this unsynced change. The latest synced version will be kept.</Text>
      <AppButton label={work.kind === 'photo' ? 'Discard photo upload' : 'Discard local change'} variant="secondary" disabled={busy} onPress={onDiscard} />
    </> : null}
  </SectionCard>;
}
const styles = StyleSheet.create({
  copy: { ...typography.supporting, color: colors.textMuted },
  fact: { gap: 4, paddingVertical: spacing.xs },
  label: { ...typography.label, color: colors.textMuted },
  value: { ...typography.body, color: colors.text },
});
