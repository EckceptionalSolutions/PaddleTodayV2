import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import { AppButton } from './app-button';
import { type SavedRiverRecord, useSavedRivers } from '../providers/saved-rivers-provider';
import { colors } from '../theme/tokens';

export function SavedRouteNotes({ river, onEdit }: { river: SavedRiverRecord; onEdit: (river: SavedRiverRecord) => void }) {
  return <View style={styles.preview}>
    {river.notes ? <Text style={styles.note}>{river.notes}</Text> : null}
    <Pressable accessibilityRole="button" accessibilityLabel={`${river.notes ? 'Edit' : 'Add'} personal note: ${river.name}${river.reach ? `, ${river.reach}` : ''}`} style={styles.button} onPress={() => onEdit(river)}>
      <Text style={styles.buttonText}>{river.notes ? 'Edit personal note' : 'Add personal note'}</Text>
    </Pressable>
  </View>;
}

export function SavedRouteNotesEditor({ river, onClose }: { river: SavedRiverRecord; onClose: () => void }) {
  const { updateSavedRiverNotes } = useSavedRivers();
  const [draft, setDraft] = useState(river.notes || '');
  const [saving, setSaving] = useState(false);
  const savingInFlight = useRef(false);
  const [error, setError] = useState('');
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const reducedMotion = useReducedMotion();
  const insets = useSafeAreaInsets();
  function requestClose() {
    if (savingInFlight.current) return;
    if (draft.trim() !== (river.notes || '').trim()) setConfirmDiscard(true);
    else onClose();
  }
  async function save() {
    if (savingInFlight.current) return;
    savingInFlight.current = true;
    setSaving(true);
    setError('');
    try {
      const saved = await updateSavedRiverNotes(river.slug, draft);
      if (saved) onClose();
      else setError('Could not save your note. Your draft is still here. Please try again.');
    } catch {
      setError('Could not save your note. Your draft is still here. Please try again.');
    } finally {
      savingInFlight.current = false;
      setSaving(false);
    }
  }
  return (
      <Modal visible animationType={reducedMotion ? 'none' : 'slide'} presentationStyle="pageSheet" onRequestClose={requestClose}>
        <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.editor, { paddingTop: Math.max(24, insets.top), paddingBottom: Math.max(24, insets.bottom) }]}>
            <Text accessibilityRole="header" style={styles.title}>Notes for {river.name}</Text>
            <Text style={styles.help}>{river.reach}</Text>
            {confirmDiscard ? <View style={styles.confirmation}>
              <Text accessibilityRole="header" style={styles.label}>Discard your unsaved changes?</Text>
              <Text style={styles.help}>Your previously saved note will stay as it was.</Text>
              <AppButton label="Keep editing" onPress={() => setConfirmDiscard(false)} />
              <AppButton label="Discard changes" variant="secondary" onPress={onClose} />
            </View> : <>
            <Text style={styles.help}>Only stored on this device. Add parking, shuttle, or launch reminders.</Text>
            <Text style={styles.label}>Your note</Text>
            <TextInput accessibilityLabel="Your note" style={styles.input} value={draft} onChangeText={setDraft} multiline maxLength={2000} autoFocus editable={!saving} textAlignVertical="top" placeholder="Parking, shuttle arrangements, preferred launch…" placeholderTextColor={colors.textMuted} />
            <Text style={styles.help}>{draft.length}/2,000 characters. Clear the note and save to remove it.</Text>
            {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
            <View style={styles.actions}>
              <AppButton label="Cancel" variant="secondary" disabled={saving} onPress={requestClose} />
              <AppButton label="Save note" busy={saving} busyLabel="Saving…" onPress={() => void save()} />
            </View>
            </>}
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  preview: { padding: 12, gap: 8 },
  note: { color: colors.text, fontSize: 14, lineHeight: 21 },
  button: { minHeight: 44, paddingHorizontal: 12, justifyContent: 'center', alignSelf: 'flex-start' },
  buttonText: { color: colors.accent, fontSize: 14, fontWeight: '700' },
  editor: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 24, gap: 16 },
  title: { color: colors.text, fontSize: 22, fontWeight: '700' },
  label: { color: colors.text, fontWeight: '600' },
  help: { color: colors.textMuted, fontSize: 14, lineHeight: 21 },
  input: { minHeight: 160, padding: 12, borderWidth: 1, borderColor: colors.textMuted, borderRadius: 10, color: colors.text, fontSize: 16 },
  error: { color: colors.noGo, fontSize: 14 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 12 },
  confirmation: { gap: 16 },
});
