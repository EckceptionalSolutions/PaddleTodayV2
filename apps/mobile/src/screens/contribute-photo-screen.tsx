import { AlertPreferencesNotice } from '../components/alert-preferences-notice';
import { FormExitGuard } from '../components/form-exit-guard';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import { CharacterCount } from '../components/character-count';
import { submissionFailureMessage } from '../lib/submission-results';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  type LayoutChangeEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCreateRouteContributionMutation, useRiverDetailQuery } from '../api/queries';
import { AppErrorState, AppLoadingState } from '../components/app-state';
import { RoutePhotoCard } from '../components/route-photo-card';
import type { SelectedReportPhoto } from '../components/route-report-sheet';
import { isValidEmailAddress } from '../lib/alerts';
import { captureAppException, trackAppEvent } from '../lib/observability';
import {
  normalizeReportPhotoBatch,
  ROUTE_REPORT_MAX_PHOTOS,
} from '../lib/report-photos';
import { useAlertPreferences } from '../providers/alert-preferences-provider';
import { colors, radius, spacing } from '../theme/tokens';
import { selectionKeyboardProps } from '../lib/selection-keyboard';

type PhotoValidationField = 'photos' | 'name' | 'email' | 'rights' | 'contact';
const PHOTO_FORM_GUIDANCE = 'Photos are reviewed before they appear publicly.';

export default function ContributePhotoScreen() {
  const reducedMotion = useReducedMotion();
  const focusScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (focusScrollTimer.current !== null) clearTimeout(focusScrollTimer.current);
    focusScrollTimer.current = null;
  }, [reducedMotion]);
  const params = useLocalSearchParams<{ slug?: string | string[] }>();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView | null>(null);
  const nameInput = useRef<TextInput | null>(null);
  const emailInput = useRef<TextInput | null>(null);
  const submissionInFlight = useRef(false);
  const pickerInFlight = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [pickingPhotos, setPickingPhotos] = useState(false);
  const formPanelOffset = useRef(0);
  const inputOffsets = useRef<Record<string, number>>({});
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? '';
  const detailQuery = useRiverDetailQuery(slug);
  const createContributionMutation = useCreateRouteContributionMutation();
  const { email: storedEmail, setEmail } = useAlertPreferences();
  const [name, setName] = useState('');
  const [email, setEmailDraft] = useState(storedEmail);
  const [initialEmail, setInitialEmail] = useState(storedEmail);
  const [caption, setCaption] = useState('');
  const [photos, setPhotos] = useState<SelectedReportPhoto[]>([]);
  const [rightsConfirmed, setRightsConfirmed] = useState(false);
  const [contactConsent, setContactConsent] = useState(false);
  const [status, setStatus] = useState(PHOTO_FORM_GUIDANCE);
  const [validation, setValidation] = useState<PhotoValidationField | null>(null);
  const validationErrors = {
    photos: photos.length === 0 ? 'Add at least one route photo.' : '',
    name: name.trim().length < 2 ? 'Add your name or paddling handle.' : '',
    email: !isValidEmailAddress(email.trim()) ? 'Enter a valid email address for follow-up questions.' : '',
    rights: !rightsConfirmed ? 'Confirm that you own or have permission to share these photos.' : '',
    contact: !contactConsent ? "Confirm that it's okay to contact you about this contribution." : '',
  };
  const validationMessage = validation ? validationErrors[validation] : '';
  function showValidation(field: PhotoValidationField) {
    setValidation(field);
    setStatus(PHOTO_FORM_GUIDANCE);
  }

  const detail = detailQuery.data?.result ?? null;

  useEffect(() => {
    if (!email) {
      setEmailDraft(storedEmail);
      setInitialEmail(storedEmail);
    }
  }, [storedEmail]);

  if (!slug) {
    return <AppErrorState title="Route is missing" body="Open photo contribution from a route." />;
  }

  if (detailQuery.isPending && !detail) {
    return <AppLoadingState title="Loading route" body="Loading the photo form." />;
  }

  if (detailQuery.isError && !detail) {
    return (
      <AppErrorState
        title="This route did not load"
        body="Check your connection, then try again."
        retrying={detailQuery.isFetching}
        onRetry={() => detailQuery.refetch()}
      />
    );
  }

  if (!detail) {
    return null;
  }

  async function pickPhotos(source: 'camera' | 'library') {
    if (pickerInFlight.current || submissionInFlight.current) return;
    const remainingSlots = ROUTE_REPORT_MAX_PHOTOS - photos.length;
    if (remainingSlots <= 0) {
      setStatus(`You can attach up to ${ROUTE_REPORT_MAX_PHOTOS} photos.`);
      return;
    }

    pickerInFlight.current = true;
    setPickingPhotos(true);
    try {
      const permission = source === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        setStatus(source === 'camera'
          ? 'Camera access is off. You can still choose photos from your library.'
          : 'Photo library access is off. You can still take a new photo if camera access is enabled.');
        return;
      }

      const result = source === 'camera'
          ? await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            quality: 0.82,
          })
          : await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: true,
            mediaTypes: ['images'],
            orderedSelection: true,
            quality: 0.82,
            selectionLimit: remainingSlots,
          });

      if (result.canceled) {
        return;
      }

      const { selected, skipped } = await normalizeReportPhotoBatch(result.assets, remainingSlots);

      if (selected.length > 0) {
        setPhotos((current) => [...current, ...selected].slice(0, ROUTE_REPORT_MAX_PHOTOS));
        setStatus(skipped > 0 ? 'Some photos could not be added.' : 'Photo added.');
      } else if (skipped > 0) {
        setStatus('Those photos could not be added.');
      }
    } catch {
      setStatus(source === 'camera' ? 'The camera could not be opened.' : 'Photos could not be opened.');
    } finally {
      pickerInFlight.current = false;
      setPickingPhotos(false);
    }
  }

  function removePhoto(id: string) {
    if (submissionInFlight.current) return;
    setPhotos((current) => current.filter((photo) => photo.id !== id));
  }

  async function submitPhotos() {
    if (submissionInFlight.current || pickerInFlight.current) return;
    const contributorName = name.trim();
    const contributorEmail = email.trim().toLowerCase();
    const cleanCaption = caption.trim();

    if (photos.length === 0) {
      showValidation('photos');
      return;
    }

    if (contributorName.length < 2) {
      showValidation('name');
      nameInput.current?.focus();
      return;
    }

    if (!isValidEmailAddress(contributorEmail)) {
      showValidation('email');
      emailInput.current?.focus();
      return;
    }

    if (!rightsConfirmed) {
      showValidation('rights');
      return;
    }

    if (!contactConsent) {
      showValidation('contact');
      return;
    }

    setValidation(null);
    submissionInFlight.current = true;
    setSubmitting(true);
    try {
      setStatus('Sending photos...');
      trackAppEvent('route_photo_contribution_submitted', {
        slug,
        photoCount: photos.length,
      });
      await setEmail(contributorEmail);
      await createContributionMutation.mutateAsync({
        riverSlug: slug,
        contributorName,
        contributorEmail,
        tripDate: '',
        tripSentiment: '',
        tripReport: cleanCaption || 'Route photo contribution.',
        notes: cleanCaption,
        reviewConsent: contactConsent,
        rightsConfirmed,
        files: photos.map((photo) => ({
          name: photo.name,
          type: photo.type,
          size: photo.size,
          dataUrl: photo.dataUrl,
        })),
      });
      setStatus('Thank you. Your photos were sent for review.');
      setPhotos([]);
      setCaption('');
      setName('');
      setEmailDraft(contributorEmail);
      setInitialEmail(contributorEmail);
      setRightsConfirmed(false);
      setContactConsent(false);
    } catch (error) {
      captureAppException(error, {
        name: 'route_photo_contribution_failed',
        extra: { slug, photoCount: photos.length },
      });
      setStatus(submissionFailureMessage(error, 'Could not send these photos. Your entries and photos are still here; please try again.'));
    } finally {
      submissionInFlight.current = false;
      setSubmitting(false);
    }
  }

  const photoLimitReached = photos.length >= ROUTE_REPORT_MAX_PHOTOS;
  const keyboardBottomPadding = Platform.OS === 'android' ? 280 : 180 + insets.bottom;

  return (
    <>
      <Stack.Screen options={{ title: 'Contribute photos' }} />
      <FormExitGuard title="Leave photo contribution?" busy={submitting}
        hasChanges={photos.length > 0 || Boolean(name.trim() || caption.trim()) || email !== initialEmail || rightsConfirmed || contactConsent} />
      <KeyboardAvoidingView
        style={styles.keyboardWrap}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.screen}
          contentContainerStyle={[styles.content, { paddingBottom: keyboardBottomPadding }]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'web' ? 'none' : Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        >
          <AlertPreferencesNotice />
          <RoutePhotoCard
            river={detail.river}
            height={164}
            onContributePhotos={() => void pickPhotos('library')}
          />

          <View style={styles.panel}>
            <Text accessibilityRole="header" style={styles.title}>Add route photos</Text>
            <Text style={styles.body}>
              Photos help paddlers spot access points, conditions, strainers, and route character.
            </Text>

            <View style={styles.actionRow}>
              <Pressable
                style={[styles.sourceButton, photoLimitReached || pickingPhotos || submitting ? styles.disabledButton : null]}
                disabled={photoLimitReached || pickingPhotos || submitting}
                accessibilityRole="button"
                accessibilityLabel="Take photo"
                onPress={() => void pickPhotos('camera')}
              >
                <MaterialCommunityIcons name="camera" color={colors.surfaceStrong} size={18} />
                <Text style={styles.sourceButtonText}>Take photo</Text>
              </Pressable>
              <Pressable
                style={[styles.sourceButtonSecondary, photoLimitReached || pickingPhotos || submitting ? styles.disabledButton : null]}
                disabled={photoLimitReached || pickingPhotos || submitting}
                accessibilityRole="button"
                accessibilityLabel="Upload photos"
                onPress={() => void pickPhotos('library')}
              >
                <MaterialCommunityIcons name="image-multiple" color={colors.accent} size={18} />
                <Text style={styles.sourceButtonSecondaryText}>Upload</Text>
              </Pressable>
            </View>

            <Text style={styles.photoCount}>{photos.length}/{ROUTE_REPORT_MAX_PHOTOS} attached</Text>
            {photos.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photoStrip}>
                {photos.map((photo) => (
                  <View key={photo.id} style={styles.photoThumbCard}>
                    <Image source={{ uri: photo.uri }} style={styles.photoThumb} resizeMode="cover" />
                    <Pressable
                      style={styles.removeButton}
                      onPress={() => removePhoto(photo.id)}
                      accessibilityRole="button"
                      accessibilityLabel={`Remove ${photo.name}`}
                      disabled={submitting}
                    >
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.emptyPhotos}>
                <MaterialCommunityIcons name="image-outline" color={colors.textMuted} size={24} />
                <Text style={styles.emptyPhotosText}>Add photos from the route or access area.</Text>
              </View>
            )}
          </View>

          <View style={styles.panel} onLayout={(event) => {
            formPanelOffset.current = event.nativeEvent.layout.y;
          }}>
            <Text style={styles.fieldLabel}>Photo caption (optional)</Text>
            <TextInput
              autoCapitalize="sentences"
              multiline
              placeholder="What should paddlers know? Access, level, obstacles, or date."
              placeholderTextColor={colors.textMuted}
              style={[styles.input, styles.captionInput]}
              value={caption}
              accessibilityLabel="Photo caption (optional)"
              accessibilityHint="Up to 1200 characters."
              maxLength={1200}
              editable={!submitting}
              onChangeText={setCaption}
              onFocus={() => scrollFocusedInputIntoView('caption')}
              onLayout={(event) => recordInputOffset('caption', event)}
              textAlignVertical="top"
            />
            <CharacterCount value={caption} limit={1200} />
            <Text style={styles.fieldLabel}>Name or paddling handle *</Text>
            <TextInput
              autoCapitalize="words"
              placeholder="Name or paddling handle"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              value={name}
              ref={nameInput}
              accessibilityLabel="Name or paddling handle"
              aria-invalid={validation === 'name' && Boolean(validationErrors.name)}
              accessibilityHint="Required field. Up to 120 characters."
              maxLength={120}
              aria-required
              editable={!submitting}
              onChangeText={setName}
              onFocus={() => scrollFocusedInputIntoView('name')}
              onLayout={(event) => recordInputOffset('name', event)}
            />
            <CharacterCount value={name} limit={120} />
            {validation === 'name' && validationErrors.name ? <Text style={styles.fieldError} accessibilityLiveRegion="polite">{validationErrors.name}</Text> : null}
            <Text style={styles.fieldLabel}>Email for follow-up questions *</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="you@example.com"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              value={email}
              ref={emailInput}
              accessibilityLabel="Email for follow-up questions"
              aria-invalid={validation === 'email' && Boolean(validationErrors.email)}
              accessibilityHint="Required field. Up to 160 characters."
              maxLength={160}
              aria-required
              editable={!submitting}
              onChangeText={setEmailDraft}
              onFocus={() => scrollFocusedInputIntoView('email')}
              onLayout={(event) => recordInputOffset('email', event)}
            />
            <CharacterCount value={email} limit={160} />
            {validation === 'email' && validationErrors.email ? <Text style={styles.fieldError} accessibilityLiveRegion="polite">{validationErrors.email}</Text> : null}

            <ConsentRow
              checked={rightsConfirmed}
              disabled={submitting}
              label="I own these photos or have permission to share them."
              onPress={() => setRightsConfirmed((current) => !current)}
            />
            <ConsentRow
              checked={contactConsent}
              disabled={submitting}
              label="I agree to follow-up questions."
              onPress={() => setContactConsent((current) => !current)}
            />

            <Pressable
              style={[styles.submitButton, submitting || pickingPhotos ? styles.disabledButton : null]}
              disabled={submitting || pickingPhotos}
              accessibilityRole="button"
              aria-busy={submitting}
              accessibilityState={{ disabled: submitting || pickingPhotos, busy: submitting }}
              onPress={() => void submitPhotos()}
            >
              <Text style={styles.submitButtonText}>
                {submitting ? 'Sending...' : pickingPhotos ? 'Preparing photos...' : 'Submit photos'}
              </Text>
            </Pressable>
            <Text accessibilityLiveRegion="polite" style={styles.status}>{validationMessage || status}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );

  function recordInputOffset(key: string, event: LayoutChangeEvent) {
    inputOffsets.current[key] = formPanelOffset.current + event.nativeEvent.layout.y;
  }

  function scrollFocusedInputIntoView(key: string) {
    if (focusScrollTimer.current !== null) clearTimeout(focusScrollTimer.current);
    const fieldOffset = inputOffsets.current[key] ?? 0;
    const targetY = Math.max(0, fieldOffset - 80);
    focusScrollTimer.current = setTimeout(() => {
      focusScrollTimer.current = null;
      scrollRef.current?.scrollTo({ y: targetY, animated: !reducedMotion });
    }, 80);
  }
}

function ConsentRow({
  checked,
  disabled,
  label,
  onPress,
}: {
  checked: boolean;
  disabled: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={styles.consentRow}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked, disabled }}
      aria-checked={checked}
      {...selectionKeyboardProps(onPress, disabled)}
    >
      <View style={[styles.checkbox, checked ? styles.checkboxChecked : null]}>
        {checked ? <MaterialCommunityIcons name="check" color={colors.surfaceStrong} size={15} /> : null}
      </View>
      <Text style={styles.consentText}>{label}</Text>
    </Pressable>
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
    padding: spacing.lg,
    gap: spacing.lg,
  },
  panel: {
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '900',
  },
  body: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sourceButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
  },
  sourceButtonText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  sourceButtonSecondary: {
    flex: 1,
    minHeight: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
  },
  sourceButtonSecondaryText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  disabledButton: {
    opacity: 0.62,
  },
  photoCount: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  photoStrip: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  photoThumbCard: {
    width: 128,
    gap: 6,
  },
  photoThumb: {
    width: 128,
    height: 94,
    borderRadius: radius.md,
    backgroundColor: colors.canvasMuted,
  },
  removeButton: {
    minHeight: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  emptyPhotos: {
    minHeight: 92,
    borderRadius: radius.md,
    backgroundColor: colors.canvasMuted,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: spacing.md,
  },
  emptyPhotosText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  fieldError: { color: colors.noGo, fontSize: 13, lineHeight: 18, marginTop: -spacing.sm },
  fieldLabel: { color: colors.text, fontSize: 14, fontWeight: '800', marginBottom: -spacing.sm },
  input: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    minHeight: 46,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    fontWeight: '700',
  },
  captionInput: {
    minHeight: 92,
    lineHeight: 20,
  },
  consentRow: {
    minHeight: 44,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  consentText: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  submitButton: {
    minHeight: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '900',
  },
  status: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
  },
});
