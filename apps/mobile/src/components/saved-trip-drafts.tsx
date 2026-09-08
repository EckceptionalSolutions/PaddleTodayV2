import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { listTripDrafts, removeTripDraft, tripDraftKey, type TripDraftRecord } from '../lib/trip-drafts';
import { parseTripTime } from '../lib/trip-time';
import { colors, spacing, typography } from '../theme/tokens';
import { AppButton } from './app-button';
import { SectionCard } from './section-card';

export function SavedTripDrafts({ routeNames, onResume }: { routeNames: Record<string, string>; onResume: (record: TripDraftRecord) => void }) {
  const [records, setRecords] = useState<TripDraftRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [unreadable, setUnreadable] = useState(0);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);
  const [opening, setOpening] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [feedback, setFeedback] = useState('');
  const epoch = useRef(0), focused = useRef(false), removal = useRef(false);
  const navigation = useRef(false);
  const refresh = useCallback(async () => {
    const request = ++epoch.current;
    setLoading(true);
    try {
      const result = await listTripDrafts(AsyncStorage);
      if (epoch.current !== request || !focused.current) return;
      setRecords(result.records); setUnreadable(result.unreadable); setError(false);
    } catch { if (epoch.current === request && focused.current) setError(true); }
    finally { if (epoch.current === request && focused.current) setLoading(false); }
  }, []);
  useFocusEffect(useCallback(() => {
    focused.current = true;
    navigation.current = false;
    setOpening(false);
    setConfirmRemove(null);
    if (!removal.current) setRemoving(null);
    void refresh();
    return () => { focused.current = false; epoch.current += 1; };
  }, [refresh]));
  function resume(record: TripDraftRecord) {
    if (navigation.current) return;
    navigation.current = true;
    setOpening(true);
    try { onResume(record); }
    catch { navigation.current = false; setOpening(false); setFeedback('This route could not be opened. Please try again.'); }
  }
  async function remove(record: TripDraftRecord) {
    if (removal.current) return;
    removal.current = true;
    const key = tripDraftKey(record.target);
    setRemoving(key); setFeedback('');
    try {
      await removeTripDraft(AsyncStorage, record.target);
      if (focused.current) {
        epoch.current += 1;
        setLoading(false);
        setRecords(current => current.filter(item => tripDraftKey(item.target) !== key));
        setConfirmRemove(null); setFeedback('Trip draft removed from this device.');
      }
    } catch { if (focused.current) setFeedback('Could not remove this draft. It is still saved; please try again.'); }
    finally { removal.current = false; if (focused.current) setRemoving(null); }
  }
  if (!records.length && !error && !unreadable && !feedback) return null;
  return <SectionCard title="Trip drafts" subtitle="Timing and group details saved on this device. Check current conditions before you go.">
    {error || unreadable ? <View style={styles.feedback}>
      <Text accessibilityLiveRegion="polite" style={styles.body}>{error ? 'Trip drafts could not be loaded. Nothing has been removed.' : 'Some trip drafts could not be read. They have not been removed.'}</Text>
      <AppButton label="Retry trip drafts" onPress={() => void refresh()} busy={loading} busyLabel="Loading drafts…" disabled={Boolean(removing)} />
    </View> : null}
    {feedback ? <Text accessibilityLiveRegion="polite" style={styles.body}>{feedback}</Text> : null}
    {(expanded ? records : records.slice(0, 3)).map(record => {
      const key = tripDraftKey(record.target);
      const name = record.target.routeName || routeNames[record.target.routeSlug] || record.target.routeSlug.replace(/-/g, ' ');
      const accessLabel = record.target.putInName && record.target.takeOutName ? `${record.target.putInName} to ${record.target.takeOutName}` : 'Saved access selection';
      const actionLabel = accessLabel === 'Saved access selection' ? name : `${name}: ${accessLabel}`;
      const launch = parseTripTime(record.draft.launch);
      const label = launch ? `${launch < new Date() ? 'Past launch date' : 'Planned launch'}: ${launch.toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}` : 'Review the launch date';
      return <View key={key} style={styles.draft}>
        <Text accessibilityRole="header" style={styles.name}>{name}</Text>
        <Text style={styles.body}>{accessLabel}</Text>
        <Text style={styles.body}>{label}</Text>
        {confirmRemove === key ? <View style={styles.feedback}>
          <Text style={styles.body}>Remove this draft’s timing and group details from this device?</Text>
          <AppButton label="Remove this draft" onPress={() => void remove(record)} busy={removing === key} busyLabel="Removing draft…" disabled={Boolean(removing)} />
          <AppButton label="Keep draft" variant="secondary" onPress={() => setConfirmRemove(null)} disabled={Boolean(removing)} />
        </View> : <View style={styles.actions}>
          <AppButton label="Resume" accessibilityLabel={`Resume trip draft for ${actionLabel}`} onPress={() => resume(record)} disabled={Boolean(removing) || loading || opening} style={styles.action} />
          <AppButton label="Remove" accessibilityLabel={`Remove trip draft for ${actionLabel}`} variant="secondary" onPress={() => { setConfirmRemove(key); setFeedback(''); }} disabled={Boolean(removing) || loading || opening} style={styles.action} />
        </View>}
      </View>;
    })}
    {records.length > 3 ? <AppButton label={expanded ? 'Show fewer trip drafts' : `Show all ${records.length} trip drafts`}
      variant="secondary" expanded={expanded} disabled={Boolean(removing) || loading || opening}
      onPress={() => { setExpanded(value => !value); setConfirmRemove(null); }} /> : null}
  </SectionCard>;
}
const styles = StyleSheet.create({
  draft: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md, gap: spacing.xs },
  name: { ...typography.label, color: colors.text }, body: { ...typography.supporting, color: colors.textMuted },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xs }, action: { flexGrow: 1, flexBasis: 100 },
  feedback: { gap: spacing.sm },
});
