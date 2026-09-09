import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import { normalizeSearchText } from '@paddletoday/api-contract';
import { stateAbbreviation } from '../lib/state-labels';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { AppButton } from './app-button';

type StateOption = { value: string; label: string; count: number };

export function SupportedStatePicker({ options, value, onChange }: {
  options: StateOption[]; value: string; onChange: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');
  const trigger = useRef<View>(null);
  const input = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const selected = options.find(option => option.value === value);
  const search = normalizeSearchText(query);
  const postalCode = search.length === 2 ? stateAbbreviation(search) : '';
  const matches = /^[A-Z]{2}$/.test(postalCode)
    ? options.filter(option => stateAbbreviation(option.value) === postalCode)
    : options.filter(option => normalizeSearchText(option.label).includes(search));
  function close() {
    setVisible(false);
    setQuery('');
    requestAnimationFrame(() => trigger.current?.focus());
  }
  return <>
    <Pressable ref={trigger} style={styles.trigger} accessibilityRole="button"
      accessibilityLabel={`Choose supported state, ${selected?.label ?? 'none selected'}`} accessibilityState={{ expanded: visible }} aria-expanded={visible}
      onPress={() => setVisible(true)}>
      <View style={styles.triggerCopy}><Text style={styles.state}>{selected?.label ?? 'Choose a state'}</Text><Text style={styles.hint}>Change state</Text></View>
      <MaterialCommunityIcons name="chevron-down" size={22} color={colors.accent} accessible={false} />
    </Pressable>
    <Modal transparent visible={visible} animationType={reducedMotion ? 'none' : 'fade'} onRequestClose={close}>
      <View style={[styles.scrim, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.md }]}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text accessibilityRole="header" style={styles.title}>Choose a state</Text>
            <AppButton label="Close" accessibilityLabel="Close state chooser" variant="secondary" onPress={close} />
          </View>
          <View style={styles.search}>
            <TextInput ref={input} style={styles.input} accessibilityLabel="Search supported states" placeholder="State name or abbreviation"
              value={query} onChangeText={setQuery} autoCapitalize="none" autoCorrect={false} placeholderTextColor={colors.textMuted} />
            {query ? <AppButton label="Clear state search" variant="secondary" onPress={() => { setQuery(''); input.current?.focus(); }} /> : null}
          </View>
          <ScrollView keyboardShouldPersistTaps="handled" style={styles.list} contentContainerStyle={styles.listContent}>
            {matches.map(option => <Pressable key={option.value} style={[styles.option, option.value === value && styles.selected]}
              accessibilityRole="button" accessibilityState={{ selected: option.value === value }}
              accessibilityLabel={`Use ${option.label}, ${option.count} ${option.count === 1 ? 'river' : 'rivers'}`}
              onPress={() => { onChange(option.value); close(); }}>
              <View style={styles.optionCopy}><Text style={styles.state}>{option.label}</Text><Text style={styles.hint}>{option.count} {option.count === 1 ? 'river' : 'rivers'}</Text></View>
              {option.value === value ? <MaterialCommunityIcons name="check" size={22} color={colors.accent} accessible={false} /> : null}
            </Pressable>)}
            {matches.length === 0 ? <Text style={styles.empty}>No supported states match “{query.trim()}”. Try a state name or abbreviation.</Text> : null}
          </ScrollView>
        </View>
      </View>
    </Modal>
  </>;
}

const styles = StyleSheet.create({
  trigger: { minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.sm, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  triggerCopy: { flex: 1, gap: 2 },
  state: { ...typography.label, color: colors.text },
  hint: { ...typography.supporting, color: colors.textMuted },
  scrim: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.md, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: { width: '100%', maxWidth: 480, maxHeight: '100%', borderRadius: radius.lg, backgroundColor: colors.surfaceStrong, overflow: 'hidden' },
  header: { padding: spacing.md, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  title: { ...typography.section, color: colors.text, flex: 1 },
  search: { paddingHorizontal: spacing.md, paddingBottom: spacing.sm, gap: spacing.xs },
  input: { minHeight: 48, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.sm, fontSize: 16, color: colors.text, backgroundColor: colors.surface },
  list: { flexShrink: 1 },
  listContent: { padding: spacing.md, gap: spacing.xs },
  option: { minHeight: 56, padding: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, borderRadius: radius.md },
  optionCopy: { flex: 1, gap: 2 },
  selected: { backgroundColor: colors.accentSoft },
  empty: { ...typography.body, color: colors.textMuted },
});
