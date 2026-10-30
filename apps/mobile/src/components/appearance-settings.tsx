import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from './section-card';
import { useAppTheme, useThemedStyles } from '../theme/theme-provider';
import { radius, spacing, typography, type AppColors } from '../theme/tokens';
import type { AppearancePreference } from '../theme/appearance';
import { radioKeyboardProps } from '../lib/selection-keyboard';

const choices = [
  { value: 'system', label: 'System', detail: 'Follow your device', icon: 'theme-light-dark' },
  { value: 'light', label: 'Light', detail: 'Warm and bright', icon: 'white-balance-sunny' },
  { value: 'dark', label: 'Dark', detail: 'Easy on the eyes', icon: 'weather-night' },
] as const;

export function AppearanceSettings() {
  const { preference, setPreference, ready, storageError } = useAppTheme();
  const styles = useThemedStyles(createStyles);
  return <SectionCard title="Appearance" subtitle="Choose how PaddleToday looks on this device.">
    <View accessibilityRole="radiogroup" accessibilityLabel="Appearance" style={styles.choices}>
      {choices.map((choice, index) => <AppearanceChoice key={choice.value} {...choice} selected={preference === choice.value}
        disabled={!ready} index={index} onSelectIndex={next => { if (ready) setPreference(choices[next].value); }}
        onSelect={() => setPreference(choice.value)} />)}
    </View>
    {storageError ? <Text accessibilityLiveRegion="polite" style={styles.notice}>Your choice works for this session. It could not be saved on this device; select it again to retry.</Text> : null}
  </SectionCard>;
}

function AppearanceChoice({ label, detail, icon, selected, disabled, onSelect, index, onSelectIndex }: {
  value: AppearancePreference; label: string; detail: string;
  icon: typeof choices[number]['icon']; selected: boolean; disabled: boolean; onSelect: () => void;
  index: number; onSelectIndex: (index: number) => void;
}) {
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createStyles);
  return <Pressable accessibilityRole="radio" accessibilityLabel={`${label} appearance`}
    accessibilityHint={detail} accessibilityState={{ checked: selected, disabled }} aria-checked={selected} disabled={disabled}
    {...radioKeyboardProps(index, selected, choices.length, onSelectIndex)}
    onPress={onSelect} style={[styles.choice, selected && styles.selected]}>
    <MaterialCommunityIcons name={icon} size={22} color={selected ? colors.accentDeep : colors.textMuted} accessible={false} />
    <View style={styles.copy}><Text style={styles.label}>{label}</Text><Text style={styles.detail}>{detail}</Text></View>
    <MaterialCommunityIcons name={selected ? 'radiobox-marked' : 'radiobox-blank'} size={22}
      color={selected ? colors.accent : colors.textMuted} accessible={false} />
  </Pressable>;
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  choices: { gap: spacing.xs },
  choice: { minHeight: 64, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.sm,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceStrong },
  selected: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
  copy: { flex: 1, gap: 2 },
  label: { ...typography.label, color: colors.text },
  detail: { ...typography.supporting, color: colors.textMuted },
  notice: { ...typography.supporting, color: colors.fair },
});
