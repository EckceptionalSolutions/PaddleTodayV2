import { FormExitGuard } from '../components/form-exit-guard';
import { CharacterCount } from '../components/character-count';
import { submissionFailureMessage } from '../lib/submission-results';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState, type Ref } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCreateRiverRequestMutation } from '../api/queries';
import { AppButton } from '../components/app-button';
import { SectionCard } from '../components/section-card';
import { isValidEmailAddress } from '../lib/alerts';
import { androidBottomInset } from '../lib/safe-area';
import { colors, radius, spacing } from '../theme/tokens';

export default function RequestRouteScreen() {
  const params = useLocalSearchParams<{ name?: string | string[] }>();
  const requestedName = (Array.isArray(params.name) ? params.name[0] : params.name)?.trim().slice(0, 240) ?? '';
  const prefillApplied = useRef(false);
  const insets = useSafeAreaInsets();
  const bottomContentInset = androidBottomInset(insets.bottom);
  const createRequestMutation = useCreateRiverRequestMutation();
  const submitting = useRef(false);
  const riverInput = useRef<TextInput>(null);
  const areaInput = useRef<TextInput>(null);
  const emailInput = useRef<TextInput>(null);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [riverName, setRiverName] = useState('');
  const [initialName, setInitialName] = useState('');
  const [area, setArea] = useState('');
  const [accessPoints, setAccessPoints] = useState('');
  const [notes, setNotes] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [status, setStatus] = useState('City, state, access points, and gauge links help most.');

  useEffect(() => {
    if (!requestedName || prefillApplied.current) return;
    prefillApplied.current = true;
    if (!riverName) { setInitialName(requestedName); setRiverName(requestedName); }
  }, [requestedName, riverName]);

  const errors = validationAttempted ? {
    river: riverName.trim().length < 3 ? 'Add a river or route name with at least three characters.' : undefined,
    area: !area.trim() ? 'Add a state, city, or general area. A state abbreviation is enough.' : undefined,
    email: replyEmail.trim() && !isValidEmailAddress(replyEmail.trim()) ? 'Enter a valid email address or leave this field blank.' : undefined,
  } : {};

  async function submitRequest() {
    if (submitting.current) return;
    setValidationAttempted(true);
    const cleanRiverName = riverName.trim();
    const cleanArea = area.trim();
    const cleanAccessPoints = accessPoints.trim();
    const cleanNotes = notes.trim();

    if (cleanRiverName.length < 3) {
      setStatus('Add a river or route name with at least three characters.');
      riverInput.current?.focus();
      return;
    }
    if (!cleanArea) {
      setStatus('Add a state, city, or general area. A state abbreviation is enough.');
      areaInput.current?.focus();
      return;
    }

    const cleanReplyEmail = replyEmail.trim().toLowerCase();
    if (cleanReplyEmail && !isValidEmailAddress(cleanReplyEmail)) {
      setStatus('Enter a valid email address or leave the email field blank.');
      emailInput.current?.focus();
      return;
    }

    submitting.current = true;
    setStatus('Sending your request…');
    try {
      await createRequestMutation.mutateAsync({
        routeName: cleanRiverName,
        state: cleanArea,
        putIn: cleanAccessPoints,
        takeOut: '',
        sources: '',
        notes: cleanNotes,
        replyEmail: cleanReplyEmail,
      });

      setStatus('Request received. Thanks for the lead.');
      setValidationAttempted(false);

      setInitialName('');
      setRiverName('');
      setArea('');
      setAccessPoints('');
      setNotes('');
      setReplyEmail('');
    } catch (error) {
      setStatus(submissionFailureMessage(error, 'Could not send this request. Your entries are still here; please try again.'));
    } finally {
      submitting.current = false;
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Request route' }} />
      <FormExitGuard title="Leave route request?" busy={createRequestMutation.isPending}
        hasChanges={riverName !== initialName || [area, accessPoints, notes, replyEmail].some(value => Boolean(value.trim()))} />
      <KeyboardAvoidingView style={styles.keyboardWrap} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={styles.screen}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.content,
            {
              paddingTop: spacing.lg + insets.top,
              paddingBottom: spacing.xl + bottomContentInset,
            },
          ]}
        >
        <View style={styles.hero}>
          <Text style={styles.kicker}>Route request</Text>
          <Text accessibilityRole="header" style={styles.title}>Request a route</Text>
          <Text style={styles.subtitle}>
            Clear access points and source notes make review faster.
          </Text>
        </View>

        <SectionCard title="Route basics" subtitle="Required fields are marked.">
          <View style={styles.form}>
            <Field maxLength={240} error={errors.river} label="River name *" value={riverName} onChangeText={setRiverName} placeholder="St. Croix River" inputRef={riverInput} editable={!createRequestMutation.isPending} />
            <Field
              label="City, state, or general area *"
              maxLength={64}
              error={errors.area}
              inputRef={areaInput}
              editable={!createRequestMutation.isPending}
              value={area}
              onChangeText={setArea}
              placeholder="Taylors Falls, MN / Osceola, WI"
            />
            <Field
              label="Access points"
              maxLength={240}
              editable={!createRequestMutation.isPending}
              value={accessPoints}
              onChangeText={setAccessPoints}
              placeholder="Put-ins, take-outs, launches, parks, or bridges"
              multiline
            />
            <Field
              label="Notes"
              maxLength={4000}
              editable={!createRequestMutation.isPending}
              value={notes}
              onChangeText={setNotes}
              placeholder="Optional: distance, hazards, shuttle notes, gauge links, or local demand."
              multiline
            />
            <Field
              label="Your email"
              maxLength={240}
              error={errors.email}
              inputRef={emailInput}
              editable={!createRequestMutation.isPending}
              value={replyEmail}
              onChangeText={setReplyEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <AppButton label="Send request" busyLabel="Sending…" busy={createRequestMutation.isPending}
              style={styles.submitButton} onPress={() => void submitRequest()} />
            <Text style={styles.statusText} accessibilityLiveRegion="polite">{status}</Text>
          </View>
        </SectionCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType,
  autoCapitalize,
  inputRef,
  editable = true,
  error,
  maxLength,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  inputRef?: Ref<TextInput>;
  editable?: boolean;
  error?: string;
  maxLength: number;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        ref={inputRef}
        editable={editable}
        maxLength={maxLength}
        style={[styles.input, multiline ? styles.textarea : null, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        accessibilityLabel={label.replace(' *', '')}
        accessibilityHint={[error, label.includes('*') ? 'Required field.' : '', `Up to ${maxLength} characters.`].filter(Boolean).join(' ')}
        aria-required={label.includes('*')}
        aria-invalid={Boolean(error)}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={keyboardType === 'email-address' ? false : undefined}
      />
      <CharacterCount value={value} limit={maxLength} />
      {error ? <Text style={styles.fieldError} accessibilityLiveRegion="polite">{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardWrap: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  hero: {
    gap: spacing.sm,
  },
  kicker: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    gap: spacing.md,
  },
  field: {
    gap: 7,
  },
  fieldLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  textarea: {
    minHeight: 110,
    lineHeight: 22,
  },
  inputError: { borderColor: colors.noGo },
  fieldError: { color: colors.noGo, fontSize: 13, lineHeight: 18 },
  submitButton: { alignSelf: 'flex-start' },
  statusText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
