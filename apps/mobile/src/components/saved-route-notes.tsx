import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { type SavedRiverRecord, useSavedRivers } from '../providers/saved-rivers-provider';
import { colors } from '../theme/tokens';

export function SavedRouteNotes({ river, onEdit }: { river: SavedRiverRecord; onEdit: (river: SavedRiverRecord) => void }) {
  return <View style={styles.preview}>
    {river.notes ? <Text style={styles.note}>{river.notes}</Text> : null}
    <Pressable accessibilityRole="button" accessibilityLabel={`${river.notes ? 'Edit' : 'Add'} personal note: ${river.name}`} style={styles.button} onPress={() => onEdit(river)}>
      <Text style={styles.buttonText}>{river.notes ? 'Edit personal note' : 'Add personal note'}</Text>
    </Pressable>
  </View>;
}

export function SavedRouteNotesEditor({ river, onClose }: { river: SavedRiverRecord; onClose: () => void }) {
  const { updateSavedRiverNotes } = useSavedRivers();
  const [draft, setDraft] = useState(river.notes || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const insets = useSafeAreaInsets();
  async function save() {
    if (saving) return;
    setSaving(true);
    const saved = await updateSavedRiverNotes(river.slug, draft);
    setSaving(false);
    if (saved) onClose();
    else setError('Could not save your note. Your draft is still here. Please try again.');
  }
  return (
      <Modal visible animationType="slide" presentationStyle="pageSheet" onRequestClose={() => { if (!saving) onClose(); }}>
        <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.editor, { paddingTop: Math.max(24, insets.top), paddingBottom: Math.max(24, insets.bottom) }]}>
            <Text accessibilityRole="header" style={styles.title}>Notes for {river.name}</Text>
            <Text style={styles.help}>Only stored on this device. Add parking, shuttle, or launch reminders.</Text>
            <Text style={styles.label}>Your note</Text>
            <TextInput accessibilityLabel="Your note" style={styles.input} value={draft} onChangeText={setDraft} multiline maxLength={2000} autoFocus editable={!saving} textAlignVertical="top" placeholder="Parking, shuttle arrangements, preferred launch…" placeholderTextColor={colors.textMuted} />
            <Text style={styles.help}>{draft.length}/2,000 characters. Clear the note and save to remove it.</Text>
            {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
            <View style={styles.actions}>
              <Pressable accessibilityRole="button" disabled={saving} style={styles.button} onPress={() => onClose()}><Text style={styles.buttonText}>Cancel</Text></Pressable>
              <Pressable accessibilityRole="button" disabled={saving} accessibilityState={{ busy: saving, disabled: saving }} style={styles.button} onPress={() => void save()}><Text style={styles.buttonText}>{saving ? 'Saving…' : 'Save note'}</Text></Pressable>
            </View>
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
  editor: { padding: 24, gap: 16 },
  title: { color: colors.text, fontSize: 22, fontWeight: '700' },
  label: { color: colors.text, fontWeight: '600' },
  help: { color: colors.textMuted, fontSize: 14, lineHeight: 21 },
  input: { minHeight: 160, padding: 12, borderWidth: 1, borderColor: colors.textMuted, borderRadius: 10, color: colors.text, fontSize: 16 },
  error: { color: colors.noGo, fontSize: 14 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 16 },
});
