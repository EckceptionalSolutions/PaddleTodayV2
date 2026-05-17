import { PaddleTodayApiError } from '@paddletoday/api-client';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useCreateRiverRequestMutation } from '../api/queries';
import { SectionCard } from '../components/section-card';
import { colors, radius, spacing } from '../theme/tokens';

export default function RequestRouteScreen() {
  const createRequestMutation = useCreateRiverRequestMutation();
  const [riverName, setRiverName] = useState('');
  const [area, setArea] = useState('');
  const [accessPoints, setAccessPoints] = useState('');
  const [notes, setNotes] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [status, setStatus] = useState('City, state, access points, and gauge links help most.');

  async function submitRequest() {
    const cleanRiverName = riverName.trim();
    const cleanArea = area.trim();
    const cleanAccessPoints = accessPoints.trim();
    const cleanNotes = notes.trim();

    if (cleanRiverName.length < 3 || cleanArea.length < 3 || cleanNotes.length < 12) {
      setStatus('Add a river name, city/state or area, and at least a sentence of detail.');
      return;
    }

    try {
      const response = await createRequestMutation.mutateAsync({
        routeName: cleanRiverName,
        state: cleanArea,
        putIn: cleanAccessPoints,
        takeOut: '',
        sources: '',
        notes: cleanNotes,
        replyEmail: replyEmail.trim().toLowerCase(),
      });

      if (!response.stored) {
        setStatus('Request received.');
      } else {
        setStatus('Request received. Thanks for the lead.');
      }

      setRiverName('');
      setArea('');
      setAccessPoints('');
      setNotes('');
      setReplyEmail('');
    } catch (error) {
      setStatus(
        error instanceof PaddleTodayApiError && error.message
          ? error.message
          : 'Could not send this request.'
      );
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Request route' }} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>Route request</Text>
          <Text style={styles.title}>Request a route</Text>
          <Text style={styles.subtitle}>
            Clear access points and source notes make review faster.
          </Text>
        </View>

        <SectionCard title="Route basics" subtitle="Required fields are marked.">
          <View style={styles.form}>
            <Field label="River name *" value={riverName} onChangeText={setRiverName} placeholder="St. Croix River" />
            <Field
              label="City, state, or general area *"
              value={area}
              onChangeText={setArea}
              placeholder="Taylors Falls, MN / Osceola, WI"
            />
            <Field
              label="Access points"
              value={accessPoints}
              onChangeText={setAccessPoints}
              placeholder="Put-ins, take-outs, launches, parks, or bridges"
              multiline
            />
            <Field
              label="Notes *"
              value={notes}
              onChangeText={setNotes}
              placeholder="Distance, hazards, shuttle notes, gauge links, or local demand."
              multiline
            />
            <Field
              label="Your email"
              value={replyEmail}
              onChangeText={setReplyEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Pressable
              style={[styles.submitButton, createRequestMutation.isPending ? styles.submitButtonDisabled : null]}
              disabled={createRequestMutation.isPending}
              onPress={() => void submitRequest()}
            >
              <Text style={styles.submitButtonText}>{createRequestMutation.isPending ? 'Sending...' : 'Send request'}</Text>
            </Pressable>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </SectionCard>
      </ScrollView>
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
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline ? styles.textarea : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={keyboardType === 'email-address' ? false : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    padding: spacing.lg,
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
  submitButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  submitButtonDisabled: {
    opacity: 0.65,
  },
  submitButtonText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '900',
  },
  statusText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
