import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { localTripTime, mergeTripTime, parseTripTime } from '../lib/trip-time';
import type { TripTimePickerProps } from './trip-time-picker.types';
import { colors, radius, spacing } from '../theme/tokens';

export function TripTimePicker({ label, value, onChange, disabled, dateOnly = false }: TripTimePickerProps) {
  const [mode, setMode] = useState<'date' | 'time' | null>(null);
  const [error, setError] = useState(false);
  const request = useRef<object | null>(null);
  const androidMode = useRef<'date' | 'time'>('date');
  const date = parseTripTime(dateOnly ? `${value} 12:00` : value);
  const commit = (next: string) => onChange(dateOnly ? next.slice(0, 10) : next);
  function dismissOwnedPicker() {
    if (Platform.OS === 'android' && request.current) {
      request.current = null;
      void DateTimePickerAndroid.dismiss(androidMode.current).catch(() => {});
    }
  }
  useEffect(() => () => { dismissOwnedPicker(); }, []);
  useEffect(() => { if (disabled) { dismissOwnedPicker(); setMode(null); } }, [disabled]);
  function open(nextMode: 'date' | 'time') {
    if (disabled || request.current) return;
    const initial = date ?? new Date();
    setError(false);
    if (Platform.OS !== 'android') { setMode(nextMode); return; }
    const token = {}; request.current = token;
    androidMode.current = nextMode;
    try {
      DateTimePickerAndroid.open({ value: initial, mode: nextMode,
        onChange: (event, selected) => {
          if (request.current !== token) return;
          request.current = null;
          if (event.type === 'set' && selected) commit(mergeTripTime(initial, selected, nextMode));
        },
        onError: () => { if (request.current === token) { request.current = null; setError(true); } },
      });
    } catch { request.current = null; setError(true); }
  }
  return <View style={styles.container}>
    <View style={styles.row}>
      <Pressable accessibilityRole="button" accessibilityLabel={`Choose ${label.toLowerCase()}${dateOnly ? '' : ' date'}`} disabled={disabled} accessibilityState={{ disabled }} style={styles.button} onPress={() => open('date')}>
        <Text style={styles.caption}>Date</Text><Text style={styles.value}>{date ? date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Choose date'}</Text>
      </Pressable>
      {!dateOnly ? <Pressable accessibilityRole="button" accessibilityLabel={`Choose ${label.toLowerCase()} time`} disabled={disabled} accessibilityState={{ disabled }} style={styles.button} onPress={() => open('time')}>
        <Text style={styles.caption}>Time</Text><Text style={styles.value}>{date ? date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : 'Choose time'}</Text>
      </Pressable> : null}
    </View>
    {mode && Platform.OS === 'ios' ? <View>
      <DateTimePicker value={date ?? new Date()} mode={mode} display="spinner" themeVariant="light" onChange={(event, selected) => {
        if (!disabled && event.type === 'set' && selected) commit(date ? mergeTripTime(date, selected, mode) : localTripTime(selected));
      }} />
      <Pressable accessibilityRole="button" accessibilityLabel={`Done choosing ${label.toLowerCase()}`} style={styles.done} onPress={() => setMode(null)}><Text style={styles.value}>Done</Text></Pressable>
    </View> : null}
    {error ? <Text accessibilityLiveRegion="polite" style={styles.caption}>The picker could not open. Use manual entry below.</Text> : null}
  </View>;
}
const styles = StyleSheet.create({
  container: { gap: spacing.xs }, row: { flexDirection: 'row', gap: spacing.sm },
  button: { flex: 1, minHeight: 56, gap: 4, padding: spacing.sm, backgroundColor: colors.surfaceStrong, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md },
  caption: { color: colors.textMuted, fontSize: 12 }, value: { color: colors.accentDeep, fontSize: 15, fontWeight: '700' },
  done: { minHeight: 44, alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: spacing.sm },
});
