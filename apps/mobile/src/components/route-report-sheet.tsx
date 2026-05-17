import type { CreateRouteContributionRequest } from '@paddletoday/api-contract';
import { useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  type LayoutChangeEvent,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../theme/tokens';

export interface SelectedReportPhoto {
  id: string;
  uri: string;
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

interface RouteReportSheetProps {
  visible: boolean;
  name: string;
  email: string;
  tripDate: string;
  sentiment: CreateRouteContributionRequest['tripSentiment'];
  report: string;
  notes: string;
  photos: SelectedReportPhoto[];
  maxPhotos: number;
  photoRightsConfirmed: boolean;
  contactConsentConfirmed: boolean;
  isSubmitting: boolean;
  status: string;
  onClose: () => void;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onTripDateChange: (value: string) => void;
  onSentimentChange: (value: CreateRouteContributionRequest['tripSentiment']) => void;
  onReportChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onPickPhotos: () => void;
  onRemovePhoto: (id: string) => void;
  onTogglePhotoRights: () => void;
  onToggleContactConsent: () => void;
  onSubmit: () => void;
}

export function RouteReportSheet({
  visible,
  name,
  email,
  tripDate,
  sentiment,
  report,
  notes,
  photos,
  maxPhotos,
  photoRightsConfirmed,
  contactConsentConfirmed,
  isSubmitting,
  status,
  onClose,
  onNameChange,
  onEmailChange,
  onTripDateChange,
  onSentimentChange,
  onReportChange,
  onNotesChange,
  onPickPhotos,
  onRemovePhoto,
  onTogglePhotoRights,
  onToggleContactConsent,
  onSubmit,
}: RouteReportSheetProps) {
  const photoLimitReached = photos.length >= maxPhotos;
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView | null>(null);
  const formOffset = useRef(0);
  const inputOffsets = useRef<Record<string, number>>({});
  const keyboardBottomPadding = Platform.OS === 'android' ? 280 : 180 + insets.bottom;

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.sheetScrim}>
        <KeyboardAvoidingView
          style={styles.keyboardWrap}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
        >
        <View style={[styles.reportSheet, { paddingBottom: spacing.md + insets.bottom }]}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHeader}>
            <View style={styles.sheetTitleCopy}>
              <Text style={styles.sheetTitle}>Send a route report</Text>
              <Text style={styles.sheetSubtitle}>Share what would help another paddler make the call.</Text>
            </View>
            <Pressable style={styles.sheetCloseButton} onPress={onClose}>
              <Text style={styles.sheetCloseText}>Close</Text>
            </Pressable>
          </View>
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
            contentContainerStyle={[styles.sheetContent, { paddingBottom: keyboardBottomPadding }]}
          >
            <View style={styles.reviewPanel}>
              <Text style={styles.reviewTitle}>Reviewed first</Text>
              <Text style={styles.reviewText}>
                Your email is only for follow-up. Reports and photos stay private until reviewed.
              </Text>
            </View>
            <View
              style={styles.reportForm}
              onLayout={(event) => {
                formOffset.current = event.nativeEvent.layout.y;
              }}
            >
              <View style={styles.reportGrid}>
                <TextInput
                  autoCapitalize="words"
                  placeholder="Name or paddling handle"
                  placeholderTextColor={colors.textMuted}
                  style={styles.reportInput}
                  value={name}
                  onChangeText={onNameChange}
                  onFocus={() => scrollFocusedInputIntoView('name')}
                  onLayout={(event) => recordInputOffset('name', event)}
                />
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  placeholder="you@example.com"
                  placeholderTextColor={colors.textMuted}
                  style={styles.reportInput}
                  value={email}
                  onChangeText={onEmailChange}
                  onFocus={() => scrollFocusedInputIntoView('email')}
                  onLayout={(event) => recordInputOffset('email', event)}
                />
              </View>
              <TextInput
                placeholder="Trip date, optional"
                placeholderTextColor={colors.textMuted}
                style={styles.reportInput}
                value={tripDate}
                onChangeText={onTripDateChange}
                onFocus={() => scrollFocusedInputIntoView('tripDate')}
                onLayout={(event) => recordInputOffset('tripDate', event)}
              />
              <SentimentPicker value={sentiment ?? ''} onChange={onSentimentChange} />
              <TextInput
                multiline
                placeholder="What did you see? Access, wood, level, crowding, pace, or anything useful."
                placeholderTextColor={colors.textMuted}
                style={[styles.reportInput, styles.reportTextArea]}
                value={report}
                onChangeText={onReportChange}
                onFocus={() => scrollFocusedInputIntoView('report')}
                onLayout={(event) => recordInputOffset('report', event)}
                textAlignVertical="top"
              />
              <TextInput
                multiline
                placeholder="Extra notes, optional"
                placeholderTextColor={colors.textMuted}
                style={[styles.reportInput, styles.reportNotesArea]}
                value={notes}
                onChangeText={onNotesChange}
                onFocus={() => scrollFocusedInputIntoView('notes')}
                onLayout={(event) => recordInputOffset('notes', event)}
                textAlignVertical="top"
              />
              <View style={styles.reportPhotoPanel}>
                <View style={styles.reportPhotoHeader}>
                  <View style={styles.reportPhotoCopy}>
                    <Text style={styles.reportPhotoTitle}>Route photos</Text>
                    <Text style={styles.reportPhotoMeta}>
                      {photos.length}/{maxPhotos} attached
                    </Text>
                  </View>
                  <Pressable
                    style={[styles.reportPhotoButton, photoLimitReached ? styles.reportPhotoButtonDisabled : null]}
                    disabled={photoLimitReached}
                    onPress={onPickPhotos}
                  >
                    <Text style={styles.reportPhotoButtonText}>Add</Text>
                  </Pressable>
                </View>
                {photos.length > 0 ? (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.reportPhotoStrip}>
                    {photos.map((photo) => (
                      <View key={photo.id} style={styles.reportPhotoThumbCard}>
                        <Image source={{ uri: photo.uri }} style={styles.reportPhotoThumb} resizeMode="cover" />
                        <Pressable style={styles.reportPhotoRemove} onPress={() => onRemovePhoto(photo.id)}>
                          <Text style={styles.reportPhotoRemoveText}>Remove</Text>
                        </Pressable>
                      </View>
                    ))}
                  </ScrollView>
                ) : (
                  <Text style={styles.reportPhotoEmpty}>
                    Optional. Useful for strainers, access changes, water clarity, and gauge checks.
                  </Text>
                )}
              </View>
              {photos.length > 0 ? (
                <Pressable style={styles.reportConsentRow} onPress={onTogglePhotoRights}>
                  <View style={[styles.checkbox, photoRightsConfirmed ? styles.checkboxChecked : null]}>
                    {photoRightsConfirmed ? <Text style={styles.checkboxMark}>✓</Text> : null}
                  </View>
                  <Text style={styles.reportConsentText}>
                    I own these photos or have permission to share them with Paddle Today.
                  </Text>
                </Pressable>
              ) : null}
              <Pressable style={styles.reportConsentRow} onPress={onToggleContactConsent}>
                <View style={[styles.checkbox, contactConsentConfirmed ? styles.checkboxChecked : null]}>
                  {contactConsentConfirmed ? <Text style={styles.checkboxMark}>✓</Text> : null}
                </View>
                <Text style={styles.reportConsentText}>
                  It is okay to contact me if more detail is needed.
                </Text>
              </Pressable>
              <Pressable
                style={[styles.reportSubmitButton, isSubmitting ? styles.reportSubmitButtonDisabled : null]}
                disabled={isSubmitting}
                onPress={onSubmit}
              >
                <Text style={styles.reportSubmitText}>{isSubmitting ? 'Sending...' : 'Send report'}</Text>
              </Pressable>
              <Text style={styles.reportStatus}>{status}</Text>
            </View>
          </ScrollView>
        </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );

  function recordInputOffset(key: string, event: LayoutChangeEvent) {
    inputOffsets.current[key] = formOffset.current + event.nativeEvent.layout.y;
  }

  function scrollFocusedInputIntoView(key: string) {
    const fieldOffset = inputOffsets.current[key] ?? 0;
    const targetY = Math.max(0, fieldOffset - 80);
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: targetY, animated: true });
    }, 80);
  }
}

function SentimentPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: CreateRouteContributionRequest['tripSentiment']) => void;
}) {
  const options = [
    { value: '', label: 'No rating' },
    { value: 'great', label: 'Great' },
    { value: 'good', label: 'Good' },
    { value: 'mixed', label: 'Mixed' },
    { value: 'rough', label: 'Rough' },
  ] as const;

  return (
    <View style={styles.sentimentRow}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <Pressable
            key={option.value || 'none'}
            style={[styles.sentimentChip, selected ? styles.sentimentChipSelected : null]}
            onPress={() => onChange(option.value)}
          >
            <Text style={[styles.sentimentChipText, selected ? styles.sentimentChipTextSelected : null]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  sheetScrim: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(10, 24, 29, 0.34)',
  },
  keyboardWrap: {
    maxHeight: '88%',
  },
  reportSheet: {
    maxHeight: '100%',
    backgroundColor: colors.canvas,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 42,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  sheetTitleCopy: {
    flex: 1,
    gap: 3,
  },
  sheetTitle: {
    color: colors.text,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '900',
  },
  sheetSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  sheetCloseButton: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  sheetCloseText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  sheetContent: {
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  reportForm: {
    gap: spacing.sm,
  },
  reviewPanel: {
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: '#BFD6CC',
    padding: spacing.md,
    gap: 3,
  },
  reviewTitle: {
    color: colors.accentDeep,
    fontSize: 13,
    fontWeight: '900',
  },
  reviewText: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 17,
  },
  reportGrid: {
    gap: spacing.sm,
  },
  reportInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  reportTextArea: {
    minHeight: 112,
  },
  reportNotesArea: {
    minHeight: 78,
  },
  reportPhotoPanel: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  reportPhotoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  reportPhotoCopy: {
    flex: 1,
    gap: 3,
  },
  reportPhotoTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  reportPhotoMeta: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  reportPhotoButton: {
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  reportPhotoButtonDisabled: {
    opacity: 0.55,
  },
  reportPhotoButtonText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  reportPhotoStrip: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  reportPhotoThumbCard: {
    width: 104,
    gap: 6,
  },
  reportPhotoThumb: {
    width: 104,
    height: 82,
    borderRadius: radius.md,
    backgroundColor: colors.canvasMuted,
  },
  reportPhotoRemove: {
    alignItems: 'center',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    backgroundColor: colors.surfaceStrong,
  },
  reportPhotoRemoveText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
  reportPhotoEmpty: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  sentimentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sentimentChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceStrong,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  sentimentChipSelected: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
  },
  sentimentChipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  sentimentChipTextSelected: {
    color: colors.accentDeep,
  },
  reportConsentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  checkboxMark: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '900',
  },
  reportConsentText: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
  },
  reportSubmitButton: {
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingVertical: 12,
    alignItems: 'center',
  },
  reportSubmitButtonDisabled: {
    opacity: 0.65,
  },
  reportSubmitText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '900',
  },
  reportStatus: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
});
