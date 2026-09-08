import { useNavigation, usePreventRemove, type NavigationAction } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Keyboard, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { AppButton } from './app-button';

export function FormExitGuard({ hasChanges, busy, title, message, stayLabel }: {
  hasChanges: boolean; busy: boolean; title: string; message?: string; stayLabel?: string;
}) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const [pending, setPending] = useState<NavigationAction | null>(null);
  usePreventRemove(hasChanges || busy, ({ data }) => {
    Keyboard.dismiss();
    setPending(current => current ?? data.action);
  });
  useEffect(() => {
    // A confirmed submission can finish a Back action that was waiting for it.
    if (pending && !hasChanges && !busy) {
      setPending(null);
      navigation.dispatch(pending);
    }
  }, [busy, hasChanges, navigation, pending]);
  function leave() {
    if (!pending || busy) return;
    const action = pending;
    setPending(null);
    navigation.dispatch(action);
  }
  return <Modal transparent visible={Boolean(pending)} animationType={reducedMotion ? 'none' : 'fade'} onRequestClose={() => setPending(null)}>
    <View style={[styles.scrim, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.md }]}>
      <ScrollView style={styles.sheet} contentContainerStyle={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>{busy ? 'Submission in progress' : title}</Text>
        <Text style={styles.body}>{busy ? 'Your submission is still sending. Wait for it to finish before leaving.' : message ?? 'Your entries have not been sent. Leaving this form will discard them.'}</Text>
        <AppButton label={stayLabel ?? (busy ? 'Stay on this form' : 'Keep editing')} onPress={() => setPending(null)} />
        {!busy ? <AppButton label="Discard changes" variant="secondary" onPress={leave} /> : null}
      </ScrollView>
    </View>
  </Modal>;
}

const styles = StyleSheet.create({
  scrim: { flex: 1, paddingHorizontal: spacing.md, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: { width: '100%', maxWidth: 480, maxHeight: '100%', flexGrow: 0, borderRadius: radius.lg, backgroundColor: colors.surfaceStrong },
  content: { padding: spacing.lg, gap: spacing.md },
  title: { ...typography.section, color: colors.text },
  body: { ...typography.body, color: colors.textMuted },
});
