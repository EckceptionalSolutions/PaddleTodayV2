import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { createTripDraftSession, TripDraft, TripDraftState } from '../lib/trip-drafts';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { AppButton } from './app-button';

export function TripDraftNotice({ state, session, defaults, locked, onClose, onReset }: {
  state: TripDraftState; session: ReturnType<typeof createTripDraftSession>; defaults: TripDraft;
  locked: boolean; onClose: () => void; onReset: () => void;
}) {
  const [confirmReset, setConfirmReset] = useState(false);
  useEffect(() => setConfirmReset(false), [session]);
  function replace() {
    session.startFresh(defaults);
    setConfirmReset(false);
    onReset();
  }
  const status = state.phase === 'loading' ? 'Loading saved draft…'
    : state.phase === 'load-error' ? 'Your saved draft could not be read. It has not been replaced.'
      : state.saveError ? 'Your changes could not be saved on this device.'
        : state.saving ? 'Saving draft…'
          : state.dirty ? 'Unsaved changes'
            : state.savedAt ? 'Draft saved on this device. Review the dates before sharing.'
              : 'Your timing and group details will be saved on this device.';
  return <View style={styles.notice}>
    <Text accessibilityLiveRegion="polite" style={styles.help}>{status}</Text>
    {state.phase === 'load-error' ? <View style={styles.actions}>
      <AppButton label="Retry loading draft" onPress={() => void session.load()} disabled={locked} />
      <AppButton label="Replace with a new draft" variant="secondary" onPress={replace} disabled={locked} />
    </View> : null}
    {state.saveError ? <View style={styles.actions}>
      <AppButton label="Retry saving draft" onPress={() => void session.save()} disabled={locked} />
      <AppButton label="Discard unsaved changes and close" variant="secondary" disabled={locked || state.saving}
        onPress={() => { session.discardUnsaved(); onClose(); }} />
    </View> : null}
    {state.phase === 'ready' && state.savedAt && !state.saveError ? confirmReset ? <View style={styles.actions}>
      <Text style={styles.help}>Replace this draft’s timing and group details with a new plan? Your saved routes and alerts will stay as they are.</Text>
      <AppButton label="Replace trip draft" onPress={replace} disabled={locked || state.saving} />
      <AppButton label="Keep this draft" variant="secondary" onPress={() => setConfirmReset(false)} disabled={locked} />
    </View> : <AppButton label="Start a new draft" variant="secondary" onPress={() => setConfirmReset(true)} disabled={locked || state.saving} /> : null}
  </View>;
}
const styles = StyleSheet.create({
  notice: { padding: spacing.md, gap: spacing.sm, borderRadius: radius.md, backgroundColor: colors.surfaceStrong, borderWidth: 1, borderColor: colors.border },
  actions: { gap: spacing.sm }, help: { ...typography.caption, color: colors.textMuted },
});
