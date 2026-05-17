import { PaddleTodayApiError } from '@paddletoday/api-client';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
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
  normalizeReportPhotoAsset,
  ROUTE_REPORT_MAX_PHOTOS,
} from '../lib/report-photos';
import { useAlertPreferences } from '../providers/alert-preferences-provider';
import { colors, radius, spacing } from '../theme/tokens';

export default function ContributePhotoScreen() {
  const params = useLocalSearchParams<{ slug?: string | string[] }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView | null>(null);
  const formPanelOffset = useRef(0);
  const inputOffsets = useRef<Record<string, number>>({});
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? '';
  const detailQuery = useRiverDetailQuery(slug);
  const createContributionMutation = useCreateRouteContributionMutation();
  const { email: storedEmail, setEmail } = useAlertPreferences();
  const [name, setName] = useState('');
  const [email, setEmailDraft] = useState(storedEmail);
  const [caption, setCaption] = useState('');
  const [photos, setPhotos] = useState<SelectedReportPhoto[]>([]);
  const [rightsConfirmed, setRightsConfirmed] = useState(false);
  const [contactConsent, setContactConsent] = useState(false);
  const [status, setStatus] = useState('Photos are reviewed before they appear publicly.');

  const detail = detailQuery.data?.result ?? null;

  useEffect(() => {
    setEmailDraft((current) => current || storedEmail);
  }, [storedEmail]);

  if (!slug) {
    return <AppErrorState title="Route is missing" body="Open photo contribution from a route." />;
  }

  if (detailQuery.isLoading && !detail) {
    return <AppLoadingState title="Loading route" body="Loading the photo form." />;
  }

  if (detailQuery.isError && !detail) {
    return (
      <AppErrorState
        title="This route did not load"
        body="Check your connection, then try again."
        onRetry={() => detailQuery.refetch()}
      />
    );
  }

  if (!detail) {
    return null;
  }

  async function pickPhotos(source: 'camera' | 'library') {
    const remainingSlots = ROUTE_REPORT_MAX_PHOTOS - photos.length;
    if (remainingSlots <= 0) {
      setStatus(`You can attach up to ${ROUTE_REPORT_MAX_PHOTOS} photos.`);
      return;
    }

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
            base64: true,
            mediaTypes: ['images'],
            quality: 0.82,
          })
        : await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: true,
            base64: true,
            mediaTypes: ['images'],
            orderedSelection: true,
            quality: 0.82,
            selectionLimit: remainingSlots,
          });

      if (result.canceled) {
        return;
      }

      const selected: SelectedReportPhoto[] = [];
      let skipped = 0;
      for (const [index, asset] of result.assets.slice(0, remainingSlots).entries()) {
        const normalized = await normalizeReportPhotoAsset(asset, index);
        if (normalized) {
          selected.push(normalized);
        } else {
          skipped += 1;
        }
      }

      if (selected.length > 0) {
        setPhotos((current) => [...current, ...selected].slice(0, ROUTE_REPORT_MAX_PHOTOS));
        setStatus(skipped > 0 ? 'Some photos could not be added.' : 'Photo added.');
      } else if (skipped > 0) {
        setStatus('Those photos could not be added.');
      }
    } catch {
      setStatus(source === 'camera' ? 'The camera could not be opened.' : 'Photos could not be opened.');
    }
  }

  function removePhoto(id: string) {
    setPhotos((current) => current.filter((photo) => photo.id !== id));
  }

  async function submitPhotos() {
    const contributorName = name.trim();
    const contributorEmail = email.trim().toLowerCase();
    const cleanCaption = caption.trim();

    if (photos.length === 0) {
      setStatus('Add at least one route photo.');
      return;
    }

    if (contributorName.length < 2) {
      setStatus('Add your name or paddling handle.');
      return;
    }

    if (!isValidEmailAddress(contributorEmail)) {
      setStatus('Enter a valid email address for follow-up questions.');
      return;
    }

    if (!rightsConfirmed) {
      setStatus('Confirm that you own or have permission to share these photos.');
      return;
    }

    if (!contactConsent) {
      setStatus("Confirm that it's okay to contact you about this contribution.");
      return;
    }

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
      setTimeout(() => router.back(), 700);
    } catch (error) {
      captureAppException(error, {
        name: 'route_photo_contribution_failed',
        extra: { slug, photoCount: photos.length },
      });
      setStatus(
        error instanceof PaddleTodayApiError && error.message
          ? error.message
          : 'Could not send these photos.'
      );
    }
  }

  const photoLimitReached = photos.length >= ROUTE_REPORT_MAX_PHOTOS;
  const keyboardBottomPadding = Platform.OS === 'android' ? 280 : 180 + insets.bottom;

  return (
    <>
      <Stack.Screen options={{ title: 'Contribute photos' }} />
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
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        >
          <RoutePhotoCard
            river={detail.river}
            height={164}
            onContributePhotos={() => void pickPhotos('library')}
          />

          <View style={styles.panel}>
            <Text style={styles.title}>Add route photos</Text>
            <Text style={styles.body}>
              Photos help paddlers spot access points, conditions, strainers, and route character.
            </Text>

            <View style={styles.actionRow}>
              <Pressable
                style={[styles.sourceButton, photoLimitReached ? styles.disabledButton : null]}
                disabled={photoLimitReached}
                onPress={() => void pickPhotos('camera')}
              >
                <MaterialCommunityIcons name="camera" color={colors.surfaceStrong} size={18} />
                <Text style={styles.sourceButtonText}>Take photo</Text>
              </Pressable>
              <Pressable
                style={[styles.sourceButtonSecondary, photoLimitReached ? styles.disabledButton : null]}
                disabled={photoLimitReached}
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
                    <Pressable style={styles.removeButton} onPress={() => removePhoto(photo.id)}>
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
            <TextInput
              autoCapitalize="sentences"
              multiline
              placeholder="What should paddlers know? Access, level, obstacles, or date."
              placeholderTextColor={colors.textMuted}
              style={[styles.input, styles.captionInput]}
              value={caption}
              onChangeText={setCaption}
              onFocus={() => scrollFocusedInputIntoView('caption')}
              onLayout={(event) => recordInputOffset('caption', event)}
              textAlignVertical="top"
            />
            <TextInput
              autoCapitalize="words"
              placeholder="Name or paddling handle"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              value={name}
              onChangeText={setName}
              onFocus={() => scrollFocusedInputIntoView('name')}
              onLayout={(event) => recordInputOffset('name', event)}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="you@example.com"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              value={email}
              onChangeText={setEmailDraft}
              onFocus={() => scrollFocusedInputIntoView('email')}
              onLayout={(event) => recordInputOffset('email', event)}
            />

            <ConsentRow
              checked={rightsConfirmed}
              label="I own these photos or have permission to share them."
              onPress={() => setRightsConfirmed((current) => !current)}
            />
            <ConsentRow
              checked={contactConsent}
              label="It is okay to contact me if more detail is needed."
              onPress={() => setContactConsent((current) => !current)}
            />

            <Pressable
              style={[styles.submitButton, createContributionMutation.isPending ? styles.disabledButton : null]}
              disabled={createContributionMutation.isPending}
              onPress={() => void submitPhotos()}
            >
              <Text style={styles.submitButtonText}>
                {createContributionMutation.isPending ? 'Sending...' : 'Submit photos'}
              </Text>
            </Pressable>
            <Text style={styles.status}>{status}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );

  function recordInputOffset(key: string, event: LayoutChangeEvent) {
    inputOffsets.current[key] = formPanelOffset.current + event.nativeEvent.layout.y;
  }

  function scrollFocusedInputIntoView(key: string) {
    const fieldOffset = inputOffsets.current[key] ?? 0;
    const targetY = Math.max(0, fieldOffset - 80);
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: targetY, animated: true });
    }, 80);
  }
}

function ConsentRow({
  checked,
  label,
  onPress,
}: {
  checked: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.consentRow} onPress={onPress}>
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
    minHeight: 42,
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
    minHeight: 42,
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
    minHeight: 30,
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
  input: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    minHeight: 46,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
    fontWeight: '700',
  },
  captionInput: {
    minHeight: 92,
    lineHeight: 20,
  },
  consentRow: {
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
