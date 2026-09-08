import { useImperativeHandle, useRef, useState, type RefObject } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { TripTimePicker } from './trip-time-picker';
import { colors, radius, spacing } from '../theme/tokens';

export interface TripTimeFieldHandle { focus: () => void }
export function TripTimeField({ label, manualLabel, value, onChange, editable, inputRef, optional = false, dateOnly = false }: {
  label: string; manualLabel: string; value: string; onChange: (value: string) => void; editable: boolean;
  inputRef: RefObject<TripTimeFieldHandle | null>; optional?: boolean; dateOnly?: boolean;
}) {
  const [manual, setManual] = useState(false);
  const input = useRef<TextInput>(null);
  useImperativeHandle(inputRef, () => ({ focus: () => { setManual(true); requestAnimationFrame(() => input.current?.focus()); } }), []);
  return <View style={styles.field}>
    <Text style={styles.label}>{label}{optional ? ' (optional)' : ''}</Text>
    {manual ? <TextInput ref={input} accessibilityLabel={manualLabel} value={value} onChangeText={onChange} editable={editable}
      autoFocus autoCorrect={false} autoCapitalize="none" placeholder={dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD HH:MM"} style={styles.input} />
      : <TripTimePicker dateOnly={dateOnly} label={label} value={value} onChange={onChange} disabled={!editable} />}
    <View style={styles.actions}>
      <Pressable accessibilityRole="button" accessibilityLabel={`${manual ? 'Use picker for' : 'Enter manually:'} ${label.toLowerCase()}`} disabled={!editable}
        accessibilityState={{ disabled: !editable }} style={styles.action} onPress={() => setManual(current => !current)}>
        <Text style={styles.actionText}>{manual ? dateOnly ? 'Use date picker' : 'Use date and time picker' : 'Enter manually'}</Text>
      </Pressable>
      {optional && value ? <Pressable accessibilityRole="button" accessibilityLabel={`Clear ${label.toLowerCase()}`} disabled={!editable} accessibilityState={{ disabled: !editable }} style={styles.action} onPress={() => onChange('')}><Text style={styles.actionText}>Clear</Text></Pressable> : null}
    </View>
  </View>;
}
const styles = StyleSheet.create({
  field: { gap: spacing.xs }, label: { color: colors.textMuted, fontSize: 12, fontWeight: '800' },
  input: { minHeight: 48, padding: spacing.sm, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceStrong, color: colors.text, fontSize: 16 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: spacing.sm },
  action: { minHeight: 44, justifyContent: 'center' }, actionText: { color: colors.accentDeep, fontSize: 12, fontWeight: '700' },
});
