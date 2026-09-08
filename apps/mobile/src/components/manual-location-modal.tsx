import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import type { StoredLocation } from '../lib/location';
import { AppButton } from './app-button';
import { colors, radius, spacing } from '../theme/tokens';

export function ManualLocationModal({
  visible,
  onDismiss,
  onSearch,
  onSelect,
  subtitle = 'Enter a city or ZIP code to rank nearby routes.',
}: {
  visible: boolean;
  subtitle?: string;
  onDismiss: () => void;
  onSearch: (query: string) => Promise<StoredLocation[]>;
  onSelect: (location: StoredLocation) => Promise<boolean>;
}) {
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [candidates, setCandidates] = useState<StoredLocation[]>([]);
  const submission = useRef<object | null>(null);
  const reducedMotion = useReducedMotion();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    submission.current = null;
    if (visible) {
      setQuery('');
      setMessage('');
      setSubmitting(false);
      setCandidates([]);
    }
    return () => { submission.current = null; };
  }, [visible]);

  async function submitLocation() {
    if (!query.trim() || submission.current) return;
    const request = {};
    submission.current = request;
    setSubmitting(true);
    setMessage('');
    try {
      const matches = await onSearch(query);
      if (submission.current !== request) return;
      if (matches.length === 1) {
        const selected = await onSelect(matches[0]);
        if (submission.current !== request) return;
        if (selected) onDismiss();
        else setMessage('This location could not be selected. Please try again.');
      } else if (matches.length) setCandidates(matches);
      else setMessage("We couldn't find that city or ZIP code.");
    } catch {
      if (submission.current === request) setMessage('Location search is unavailable. Please try again.');
    } finally {
      if (submission.current === request) {
        submission.current = null;
        setSubmitting(false);
      }
    }
  }

  async function choose(candidate: StoredLocation) {
    if (submission.current) return;
    const request = {};
    submission.current = request;
    setSubmitting(true);
    setMessage('');
    try {
      const selected = await onSelect(candidate);
      if (submission.current !== request) return;
      if (selected) onDismiss();
      else setMessage('This location could not be selected. Please try again.');
    } catch {
      if (submission.current === request) setMessage('This location could not be selected. Please try again.');
    } finally {
      if (submission.current === request) { submission.current = null; setSubmitting(false); }
    }
  }

  return (
    <Modal visible={visible} transparent animationType={reducedMotion ? 'none' : 'fade'} onRequestClose={onDismiss}>
      <KeyboardAvoidingView style={styles.locationModalScrim} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.locationModalScroll, { paddingTop: spacing.lg + insets.top, paddingBottom: spacing.lg + insets.bottom }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} accessible={false} focusable={false} aria-hidden />
        <View style={styles.locationModalCard}>
          <View style={styles.locationModalHeader}>
            <View style={styles.locationModalHeaderCopy}>
              <Text accessibilityRole="header" style={styles.locationModalTitle}>Set your planning location</Text>
              <Text style={styles.locationModalSubtitle}>{subtitle}</Text>
            </View>
            <Pressable style={styles.locationModalClose} onPress={onDismiss} accessibilityRole="button" accessibilityLabel="Close location search">
              <MaterialCommunityIcons name="close" color={colors.textMuted} size={22} />
            </Pressable>
          </View>
          <View style={styles.locationModalInputRow}>
            <MaterialCommunityIcons name="map-marker-outline" color={colors.accent} size={19} />
            <TextInput
              autoFocus
              value={query}
              onChangeText={value => { setQuery(value); setCandidates([]); setMessage(''); }}
              placeholder="City, state, or ZIP code"
              accessibilityLabel="City, state, or ZIP code"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="search"
              editable={!submitting}
              onSubmitEditing={() => void submitLocation()}
              style={styles.locationModalInput}
            />
          </View>
          {message ? <Text style={styles.locationModalMessage} accessibilityLiveRegion="polite">{message}</Text> : null}
          {candidates.length ? <View style={styles.locationChoices}>
            <Text accessibilityLiveRegion="polite" style={styles.locationModalSubtitle}>Several places match. Choose your planning location.</Text>
            {candidates.map(candidate => <AppButton key={`${candidate.latitude},${candidate.longitude}`}
              label={candidate.label} accessibilityLabel={`Use ${candidate.label}`} variant="secondary" disabled={submitting}
              onPress={() => void choose(candidate)} />)}
          </View> :
          <Pressable
            style={[styles.locationModalSubmit, (!query.trim() || submitting) ? styles.heroActionDisabled : null]}
            disabled={!query.trim() || submitting}
            accessibilityState={{ disabled: !query.trim() || submitting, busy: submitting }}
            accessibilityLabel="Use this location"
            aria-busy={submitting}
            onPress={() => void submitLocation()}
            accessibilityRole="button"
          >
            <Text style={styles.locationModalSubmitText}>{submitting ? 'Finding location' : 'Use this location'}</Text>
          </Pressable>
          }
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  locationChoices: { gap: spacing.sm },
  locationModalScrim: {
    flex: 1,
    backgroundColor: 'rgba(10, 24, 29, 0.52)',
  },
  locationModalScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  locationModalClose: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  locationModalCard: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceStrong,
    padding: spacing.lg,
    gap: spacing.md,
  },
  locationModalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  locationModalHeaderCopy: {
    flex: 1,
    gap: 3,
  },
  locationModalTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
  },
  locationModalSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  locationModalInputRow: {
    minHeight: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  locationModalInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  locationModalMessage: {
    color: colors.noGo,
    fontSize: 12,
    fontWeight: '700',
  },
  locationModalSubmit: {
    minHeight: 46,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  locationModalSubmitText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '900',
  },
  heroActionDisabled: { opacity: 0.65 },
});
