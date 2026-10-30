import { Pressable, StyleSheet, Text, View } from 'react-native';
import { usePaddlingPreferences } from '../providers/paddling-preferences-provider';
import { paddlingPreferenceSummary } from '../lib/paddling-preferences';
import { radius, spacing, type AppColors } from '../theme/tokens';
import { useThemedStyles } from '../theme/theme-provider';
import { AppButton } from './app-button';

export function PaddlingPreferenceControl({ variant = 'today', showingAll = false, onToggleAll }: {
  variant?: 'today' | 'weekend' | 'more'; showingAll?: boolean; onToggleAll?: () => void;
}) {
  const { preferences, ready, loadError, dismissed, openPreferences, retryLoad } = usePaddlingPreferences();
  const styles = useThemedStyles(createStyles);
  if (!ready || (!loadError && !preferences && (dismissed || variant === 'weekend'))) return variant === 'more'
    ? <AppButton label="Your paddling" hint="Set your experience and preferred water types" variant="secondary" onPress={openPreferences} disabled={!ready} /> : null;
  if (loadError) return <View style={styles.control}>
    <Text style={styles.body}>Paddling preferences could not load.</Text>
    <AppButton label="Retry preferences" variant="secondary" onPress={retryLoad} />
    <AppButton label="Set preferences again" variant="secondary" onPress={openPreferences} />
  </View>;
  return <View style={styles.control}>
    <Pressable accessibilityRole="button" accessibilityLabel={preferences ? 'Edit your paddling preferences' : 'Set up your paddling preferences'}
      onPress={openPreferences} style={styles.edit}>
      <Text style={styles.title}>{variant === 'more' ? 'Your paddling' : preferences ? showingAll ? 'Showing all routes' : 'For you' : 'What’s your paddling experience?'}</Text>
      <Text style={styles.body}>{preferences ? `${paddlingPreferenceSummary(preferences)} · Edit` : 'Help us find routes that suit you. Set up →'}</Text>
    </Pressable>
    {preferences && onToggleAll ? <AppButton label={showingAll ? 'For me' : 'All routes'} accessibilityLabel={showingAll ? 'Use my paddling preferences' : 'Show all routes'} variant="secondary" onPress={onToggleAll} /> : null}
  </View>;
}
const createStyles = (colors: AppColors) => StyleSheet.create({
  control: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: spacing.xs, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.sm, backgroundColor: colors.surfaceStrong },
  edit: { flexGrow: 1, flexBasis: 180, minHeight: 48, justifyContent: 'center', gap: spacing.xs, padding: spacing.xs },
  title: { color: colors.text, fontSize: 15, fontWeight: '700' }, body: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
});
