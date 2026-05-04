import { PaddleTodayApiError } from '@paddletoday/api-client';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useCreateRiverRequestMutation } from '../api/queries';
import { SectionCard } from '../components/section-card';
import { colors, radius, spacing } from '../theme/tokens';

export default function RequestRouteScreen() {
  const createRequestMutation = useCreateRiverRequestMutation();
  const [routeName, setRouteName] = useState('');
  const [state, setState] = useState('');
  const [putIn, setPutIn] = useState('');
  const [takeOut, setTakeOut] = useState('');
  const [sources, setSources] = useState('');
  const [notes, setNotes] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [status, setStatus] = useState('Include the best details you know. Put-in, take-out, and gauge links help most.');

  async function submitRequest() {
    const cleanRouteName = routeName.trim();
    const cleanState = state.trim();
    const cleanNotes = notes.trim();

    if (cleanRouteName.length < 3 || !cleanState || cleanNotes.length < 12) {
      setStatus('Add a route or river name, state, and at least a sentence of detail.');
      return;
    }

    try {
      const response = await createRequestMutation.mutateAsync({
        routeName: cleanRouteName,
        state: cleanState,
        putIn: putIn.trim(),
        takeOut: takeOut.trim(),
        sources: sources.trim(),
        notes: cleanNotes,
        replyEmail: replyEmail.trim().toLowerCase(),
      });

      if (!response.stored) {
        setStatus('Request received.');
      } else {
        setStatus('Request received. Thanks for helping expand the route list.');
      }

      setRouteName('');
      setState('');
      setPutIn('');
      setTakeOut('');
      setSources('');
      setNotes('');
      setReplyEmail('');
    } catch (error) {
      setStatus(
        error instanceof PaddleTodayApiError && error.message
          ? error.message
          : 'Could not send this request right now.'
      );
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Request route' }} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>Route request</Text>
          <Text style={styles.title}>Ask us to add a route.</Text>
          <Text style={styles.subtitle}>
            Send the basics. The fastest routes to review have a clear put-in, take-out, and matching gauge source.
          </Text>
        </View>

        <SectionCard title="Route basics" subtitle="Start with whatever you know. Required fields are marked in the labels.">
          <View style={styles.form}>
            <Field label="River or route name *" value={routeName} onChangeText={setRouteName} placeholder="St. Croix River - Taylors Falls to Osceola" />
            <Field label="State *" value={state} onChangeText={setState} placeholder="MN, WI, IA, etc." autoCapitalize="characters" />
            <Field label="Put-in name" value={putIn} onChangeText={setPutIn} placeholder="Launch or access name" />
            <Field label="Take-out name" value={takeOut} onChangeText={setTakeOut} placeholder="Exit or access name" />
            <Field
              label="Known links"
              value={sources}
              onChangeText={setSources}
              placeholder="USGS, DNR, park, club, or outfitter URLs"
              multiline
            />
            <Field
              label="Additional information *"
              value={notes}
              onChangeText={setNotes}
              placeholder="Distance, hazards, shuttle notes, gauge context, local demand, or anything useful."
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
