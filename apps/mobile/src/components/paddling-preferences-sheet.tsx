import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RouteType } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import { experienceOptions, type PaddlingExperience, type PaddlingPreferences } from '../lib/paddling-preferences';
import { androidBottomInset } from '../lib/safe-area';
import { radioKeyboardProps, selectionKeyboardProps } from '../lib/selection-keyboard';
import { radius, spacing, type AppColors } from '../theme/tokens';
import { useAppTheme, useThemedStyles } from '../theme/theme-provider';
import { AppButton } from './app-button';

export function PaddlingPreferencesSheet({ visible, initial, busy, error, loadError, onClose, onSave, onSkip, onReset }: {
  visible: boolean; initial: PaddlingPreferences | null; busy: boolean; error: string; loadError: boolean;
  onClose: () => void; onSave: (value: PaddlingPreferences) => void; onSkip: () => void; onReset: () => void;
}) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const [experience, setExperience] = useState<PaddlingExperience>('unspecified');
  const [waterTypes, setWaterTypes] = useState<RouteType[]>([]);
  useEffect(() => {
    if (visible) { setExperience(initial?.experience ?? 'unspecified'); setWaterTypes(initial?.waterTypes ?? []); }
  }, [visible, initial]);
  return <Modal visible={visible} transparent animationType={reducedMotion ? 'none' : 'slide'} onRequestClose={onClose}>
    <View style={[styles.scrim, { paddingTop: insets.top + spacing.md }]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessible={false} focusable={false} />
      <View style={styles.sheet} accessibilityViewIsModal onAccessibilityEscape={onClose}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text accessibilityRole="header" style={styles.title}>Your paddling</Text>
            <Text style={styles.body}>A few details for Today and Weekend picks that suit you.</Text>
          </View>
          <AppButton label="Close" accessibilityLabel="Close paddling preferences" variant="secondary" disabled={busy} onPress={onClose} />
        </View>
        <ScrollView style={{ flexShrink: 1 }} contentContainerStyle={styles.questions} keyboardShouldPersistTaps="handled">
          {loadError ? <Text accessibilityRole="alert" style={styles.error}>Saved preferences could not be read. Saving here will replace them on this device.</Text> : null}
          <Text accessibilityRole="header" style={styles.question}>How much paddling have you done?</Text>
          <View accessibilityRole="radiogroup" accessibilityLabel="Paddling experience" style={styles.options}>
            {experienceOptions.map((option, index) => <Pressable key={option.value} accessibilityRole="radio"
              accessibilityLabel={option.label} accessibilityHint={option.detail} accessibilityState={{ checked: experience === option.value, disabled: busy }}
              aria-checked={experience === option.value}
              disabled={busy} onPress={() => setExperience(option.value)}
              {...(busy ? {} : radioKeyboardProps(index, experience === option.value, experienceOptions.length, next => setExperience(experienceOptions[next].value)))}
              style={[styles.option, experience === option.value && styles.selected]}>
              <MaterialCommunityIcons name={experience === option.value ? 'radiobox-marked' : 'radiobox-blank'} size={22} color={colors.accent} accessible={false} />
              <View style={styles.optionCopy}><Text style={styles.optionTitle}>{option.label}</Text><Text style={styles.body}>{option.detail}</Text></View>
            </Pressable>)}
          </View>
          <Text accessibilityRole="header" style={styles.question}>What kind of paddling do you enjoy?</Text>
          <Text style={styles.body}>Choose either or both. You can change this anytime.</Text>
          <View style={styles.options}>
            {([{ value: 'recreational', label: 'Recreational paddling', detail: 'River outings outside the whitewater category.' },
              { value: 'whitewater', label: 'Whitewater', detail: 'Routes classified for whitewater paddling.' }] as const).map(option => {
              const checked = waterTypes.includes(option.value);
              return <Pressable key={option.value} accessibilityRole="checkbox" accessibilityLabel={option.label}
                accessibilityState={{ checked, disabled: busy }} aria-checked={checked} disabled={busy}
                onPress={() => setWaterTypes(current => checked ? current.filter(type => type !== option.value) : [...current, option.value])}
                {...selectionKeyboardProps(() => setWaterTypes(current => checked ? current.filter(type => type !== option.value) : [...current, option.value]), busy)}
                style={[styles.option, checked && styles.selected]}>
                <MaterialCommunityIcons name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={22} color={colors.accent} accessible={false} />
                <View style={styles.optionCopy}><Text style={styles.optionTitle}>{option.label}</Text><Text style={styles.body}>{option.detail}</Text></View>
              </Pressable>;
            })}
            <Pressable accessibilityRole="checkbox" accessibilityLabel="Still figuring it out" accessibilityState={{ checked: waterTypes.length === 0, disabled: busy }}
              aria-checked={waterTypes.length === 0}
              {...selectionKeyboardProps(() => setWaterTypes([]), busy)}
              disabled={busy} onPress={() => setWaterTypes([])} style={[styles.option, waterTypes.length === 0 && styles.selected]}>
              <MaterialCommunityIcons name={waterTypes.length === 0 ? 'checkbox-marked' : 'checkbox-blank-outline'} size={22} color={colors.accent} accessible={false} />
              <View style={styles.optionCopy}><Text style={styles.optionTitle}>Still figuring it out</Text><Text style={styles.body}>Keep both water types available.</Text></View>
            </Pressable>
          </View>
          <Text style={styles.body}>Saved on this device, with or without an account. These choices narrow routes by difficulty and type; review each route’s hazards and current conditions.</Text>
        </ScrollView>
        <View style={[styles.footer, { paddingBottom: spacing.md + androidBottomInset(insets.bottom) }]}>
          {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
          <AppButton label={initial ? 'Save preferences' : 'Show my picks'} busy={busy} busyLabel="Saving preferences…"
            onPress={() => onSave({ experience, waterTypes })} />
          <AppButton label={initial ? 'Reset paddling preferences' : 'Maybe later'} variant="secondary" disabled={busy} onPress={initial ? onReset : onSkip} />
        </View>
      </View>
    </View>
  </Modal>;
}
const createStyles = (colors: AppColors) => StyleSheet.create({
  scrim: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.48)' },
  sheet: { maxHeight: '100%', backgroundColor: colors.canvas, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, overflow: 'hidden' },
  header: { padding: spacing.md, flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start', borderBottomWidth: 1, borderColor: colors.border },
  headerCopy: { flex: 1, gap: spacing.xs }, title: { color: colors.text, fontSize: 24, fontWeight: '800' },
  body: { color: colors.textMuted, fontSize: 14, lineHeight: 21 },
  questions: { padding: spacing.md, gap: spacing.sm }, question: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: spacing.sm },
  options: { gap: spacing.sm }, option: { flexDirection: 'row', alignItems: 'center', minHeight: 48, padding: spacing.md, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, gap: spacing.sm, backgroundColor: colors.surfaceStrong },
  optionCopy: { flex: 1, gap: spacing.xs },
  selected: { borderColor: colors.accent, backgroundColor: colors.accentSoft }, optionTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  footer: { padding: spacing.md, gap: spacing.sm, borderTopWidth: 1, borderColor: colors.border }, error: { color: colors.noGo, fontSize: 14, lineHeight: 21 },
});
