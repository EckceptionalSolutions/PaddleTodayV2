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
import { androidBottomInset } from '../lib/safe-area';
import { selectionKeyboardProps } from '../lib/selection-keyboard';
import { TripTimeField, type TripTimeFieldHandle } from './trip-time-field';
import { CharacterCount } from './character-count';
import type { RouteReportValidationError, RouteReportValidationField } from '../lib/route-report-validation';
import { useReducedMotion } from '../hooks/use-reduced-motion';
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
  validationError: RouteReportValidationError | null;
  visible: boolean;
  name: string;
  email: string;
  tripDate: string;
  sentiment: CreateRouteContributionRequest['tripSentiment'];
  observedWaterLevel: NonNullable<CreateRouteContributionRequest['scoringOutcome']>['observedWaterLevel'] | '';
  tripCompletion: NonNullable<CreateRouteContributionRequest['scoringOutcome']>['tripCompletion'] | '';
  overallVerdict: NonNullable<CreateRouteContributionRequest['scoringOutcome']>['overallVerdict'] | '';
  report: string;
  notes: string;
  photos: SelectedReportPhoto[];
  maxPhotos: number;
  photoRightsConfirmed: boolean;
  contactConsentConfirmed: boolean;
  isSubmitting: boolean;
  isPickingPhotos: boolean;
  status: string;
  onClose: () => void;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onTripDateChange: (value: string) => void;
  onSentimentChange: (value: CreateRouteContributionRequest['tripSentiment']) => void;
  onObservedWaterLevelChange: (value: NonNullable<CreateRouteContributionRequest['scoringOutcome']>['observedWaterLevel'] | '') => void;
  onTripCompletionChange: (value: NonNullable<CreateRouteContributionRequest['scoringOutcome']>['tripCompletion'] | '') => void;
  onOverallVerdictChange: (value: NonNullable<CreateRouteContributionRequest['scoringOutcome']>['overallVerdict'] | '') => void;
  onReportChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onPickPhotos: () => void;
  onRemovePhoto: (id: string) => void;
  onTogglePhotoRights: () => void;
  onToggleContactConsent: () => void;
  onSubmit: () => Promise<RouteReportValidationField | void>;
}

export function RouteReportSheet({
  validationError,
  visible,
  name,
  email,
  tripDate,
  sentiment,
  observedWaterLevel,
  tripCompletion,
  overallVerdict,
  report,
  notes,
  photos,
  maxPhotos,
  photoRightsConfirmed,
  contactConsentConfirmed,
  isSubmitting,
  isPickingPhotos,
  status,
  onClose,
  onNameChange,
  onEmailChange,
  onTripDateChange,
  onSentimentChange,
  onObservedWaterLevelChange,
  onTripCompletionChange,
  onOverallVerdictChange,
  onReportChange,
  onNotesChange,
  onPickPhotos,
  onRemovePhoto,
  onTogglePhotoRights,
  onToggleContactConsent,
  onSubmit,
}: RouteReportSheetProps) {
  const dateInput = useRef<TripTimeFieldHandle>(null);
  const reducedMotion = useReducedMotion();
  const photoLimitReached = photos.length >= maxPhotos;
  const insets = useSafeAreaInsets();
  const bottomSheetInset = androidBottomInset(insets.bottom);
  const scrollRef = useRef<ScrollView | null>(null);
  const nameInput = useRef<TextInput | null>(null);
  const emailInput = useRef<TextInput | null>(null);
  const reportInput = useRef<TextInput | null>(null);
  const formOffset = useRef(0);
  const inputOffsets = useRef<Record<string, number>>({});
  const keyboardBottomPadding = Platform.OS === 'android' ? 280 : 180 + insets.bottom;
  const errorFor = (field: RouteReportValidationField) => validationError?.field === field ? validationError.message : '';
  const fieldError = (field: RouteReportValidationField) => errorFor(field)
    ? <Text accessibilityLiveRegion="polite" style={styles.fieldError}>{errorFor(field)}</Text> : null;

  return (
    <Modal animationType={reducedMotion ? "none" : "slide"} transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.sheetScrim}>
        <KeyboardAvoidingView
          style={styles.keyboardWrap}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
        >
        <View style={[styles.reportSheet, { paddingBottom: spacing.md + bottomSheetInset }]}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHeader}>
            <View style={styles.sheetTitleCopy}>
              <Text style={styles.sheetTitle}>Send a route report</Text>
              <Text style={styles.sheetSubtitle}>Share what would help another paddler make the call.</Text>
            </View>
            <Pressable style={styles.sheetCloseButton} accessibilityRole="button" accessibilityLabel="Close route report" onPress={onClose}>
              <Text style={styles.sheetCloseText}>Close</Text>
            </Pressable>
          </View>
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode={Platform.OS === 'web' ? 'none' : Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
            contentContainerStyle={[styles.sheetContent, { paddingBottom: keyboardBottomPadding }]}
          >
            <View style={styles.reviewPanel}>
              <Text style={styles.reviewTitle}>Reviewed first</Text>
              <Text style={styles.reviewText}>
                Your email is only for follow-up. Reports and photos stay private until reviewed.
              </Text>
              <Text style={styles.reviewText}>Required fields are marked *.</Text>
            </View>
            <View
              style={styles.reportForm}
              onLayout={(event) => {
                formOffset.current = event.nativeEvent.layout.y;
              }}
            >
              <View style={styles.reportGrid}>
                <Text style={styles.choiceLabel}>Name or paddling handle *</Text>
                <TextInput
                  autoCapitalize="words"
                  placeholder="Name or paddling handle"
                  placeholderTextColor={colors.textMuted}
                  style={styles.reportInput}
                  accessibilityLabel="Contributor name or paddling handle"
                  aria-invalid={Boolean(errorFor('name'))}
                  accessibilityHint="Required. Up to 120 characters."
                  maxLength={120}
                  aria-required
                  value={name}
                  ref={nameInput}
                  editable={!isSubmitting}
                  onChangeText={onNameChange}
                  onFocus={() => scrollFocusedInputIntoView('name')}
                  onLayout={(event) => recordInputOffset('name', event)}
                />
                <CharacterCount value={name} limit={120} />
                {fieldError('name')}
                <Text style={styles.choiceLabel}>Email for follow-up *</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  placeholder="you@example.com"
                  placeholderTextColor={colors.textMuted}
                  style={styles.reportInput}
                  accessibilityLabel="Email address"
                  aria-invalid={Boolean(errorFor('email'))}
                  accessibilityHint="Required. Up to 160 characters."
                  maxLength={160}
                  aria-required
                  value={email}
                  ref={emailInput}
                  editable={!isSubmitting}
                  onChangeText={onEmailChange}
                  onFocus={() => scrollFocusedInputIntoView('email')}
                  onLayout={(event) => recordInputOffset('email', event)}
                />
                <CharacterCount value={email} limit={160} />
                {fieldError('email')}
              </View>
              <View onLayout={(event) => recordInputOffset('tripDate', event)}>
                <TripTimeField label="Trip date" manualLabel="Trip date (optional)" value={tripDate} onChange={onTripDateChange}
                  editable={visible && !isSubmitting} inputRef={dateInput} optional dateOnly error={errorFor('tripDate')} />
              </View>
              <Text style={styles.choiceLabel}>Trip experience (optional)</Text>
              <SentimentPicker value={sentiment ?? ''} disabled={isSubmitting} onChange={onSentimentChange} />
              <ChoicePicker
                label="Observed water level"
                error={errorFor('waterLevel')}
                onLayout={event => recordInputOffset('waterLevel', event)}
                disabled={isSubmitting}
                value={observedWaterLevel}
                options={[
                  { value: 'too-low', label: 'Too low' },
                  { value: 'low', label: 'Low' },
                  { value: 'ideal', label: 'Ideal' },
                  { value: 'high', label: 'High' },
                  { value: 'unsafe', label: 'Unsafe' },
                  { value: 'unknown', label: 'Unknown' },
                ]}
                onChange={onObservedWaterLevelChange}
              />
              <ChoicePicker
                label="Trip outcome"
                error={errorFor('completion')}
                onLayout={event => recordInputOffset('completion', event)}
                disabled={isSubmitting}
                value={tripCompletion}
                options={[
                  { value: 'completed', label: 'Completed' },
                  { value: 'shortened', label: 'Shortened' },
                  { value: 'aborted', label: 'Aborted' },
                  { value: 'not-launched', label: 'No launch' },
                ]}
                onChange={onTripCompletionChange}
              />
              <ChoicePicker
                label="Overall verdict"
                error={errorFor('verdict')}
                onLayout={event => recordInputOffset('verdict', event)}
                disabled={isSubmitting}
                value={overallVerdict}
                options={[
                  { value: 'excellent', label: 'Excellent' },
                  { value: 'good', label: 'Good' },
                  { value: 'fair', label: 'Fair' },
                  { value: 'poor', label: 'Poor' },
                  { value: 'unsafe', label: 'Unsafe' },
                ]}
                onChange={onOverallVerdictChange}
              />
              <Text style={styles.choiceLabel}>Route report</Text>
              <Text style={styles.reviewText}>Write at least a sentence, or attach photos below.</Text>
              <TextInput
                multiline
                placeholder="What did you see? Access, wood, level, crowding, pace, or anything useful."
                placeholderTextColor={colors.textMuted}
                style={[styles.reportInput, styles.reportTextArea]}
                accessibilityLabel="Route report"
                aria-invalid={Boolean(errorFor('report'))}
                accessibilityHint="Up to 1800 characters."
                maxLength={1800}
                value={report}
                ref={reportInput}
                editable={!isSubmitting}
                onChangeText={onReportChange}
                onFocus={() => scrollFocusedInputIntoView('report')}
                onLayout={(event) => recordInputOffset('report', event)}
                textAlignVertical="top"
              />
              <CharacterCount value={report} limit={1800} />
              {fieldError('report')}
              <Text style={styles.choiceLabel}>Extra notes (optional)</Text>
              <TextInput
                multiline
                placeholder="Add any other details"
                placeholderTextColor={colors.textMuted}
                style={[styles.reportInput, styles.reportNotesArea]}
                accessibilityLabel="Extra notes, optional"
                accessibilityHint="Up to 1200 characters."
                maxLength={1200}
                value={notes}
                editable={!isSubmitting}
                onChangeText={onNotesChange}
                onFocus={() => scrollFocusedInputIntoView('notes')}
                onLayout={(event) => recordInputOffset('notes', event)}
                textAlignVertical="top"
              />
              <CharacterCount value={notes} limit={1200} />
              <View style={styles.reportPhotoPanel}>
                <View style={styles.reportPhotoHeader}>
                  <View style={styles.reportPhotoCopy}>
                    <Text style={styles.reportPhotoTitle}>Route photos</Text>
                    <Text style={styles.reportPhotoMeta}>
                      {photos.length}/{maxPhotos} attached
                    </Text>
                  </View>
                  <Pressable
                    style={[styles.reportPhotoButton, photoLimitReached || isSubmitting || isPickingPhotos ? styles.reportPhotoButtonDisabled : null]}
                    disabled={photoLimitReached || isSubmitting || isPickingPhotos}
                    accessibilityRole="button"
                    accessibilityLabel="Add report photos"
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
                        <Pressable style={styles.reportPhotoRemove} disabled={isSubmitting} accessibilityRole="button" accessibilityLabel={`Remove ${photo.name}`} onPress={() => onRemovePhoto(photo.id)}>
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
                <Pressable
                  style={styles.reportConsentRow}
                  onPress={onTogglePhotoRights}
                  accessibilityRole="checkbox"
                  accessibilityLabel="I own these photos or have permission to share them with Paddle Today."
                  accessibilityState={{ checked: photoRightsConfirmed }}
                  aria-checked={photoRightsConfirmed}
                  aria-invalid={Boolean(errorFor('rights'))}
                  onLayout={event => recordInputOffset('rights', event)}
                  disabled={isSubmitting}
                  {...selectionKeyboardProps(onTogglePhotoRights, isSubmitting)}
                >
                  <View style={[styles.checkbox, photoRightsConfirmed ? styles.checkboxChecked : null]}>
                    {photoRightsConfirmed ? <Text style={styles.checkboxMark}>✓</Text> : null}
                  </View>
                  <Text style={styles.reportConsentText}>
                    I own these photos or have permission to share them with Paddle Today.
                  </Text>
                </Pressable>
              ) : null}
              {fieldError('rights')}
              <Pressable
                style={styles.reportConsentRow}
                onPress={onToggleContactConsent}
                accessibilityRole="checkbox"
                accessibilityLabel="I agree to follow-up questions."
                accessibilityState={{ checked: contactConsentConfirmed }}
                aria-checked={contactConsentConfirmed}
                aria-invalid={Boolean(errorFor('consent'))}
                onLayout={event => recordInputOffset('consent', event)}
                disabled={isSubmitting}
                {...selectionKeyboardProps(onToggleContactConsent, isSubmitting)}
              >
                <View style={[styles.checkbox, contactConsentConfirmed ? styles.checkboxChecked : null]}>
                  {contactConsentConfirmed ? <Text style={styles.checkboxMark}>✓</Text> : null}
                </View>
                <Text style={styles.reportConsentText}>
                  I agree to follow-up questions.
                </Text>
              </Pressable>
              {fieldError('consent')}
              <Pressable
                style={[styles.reportSubmitButton, isSubmitting || isPickingPhotos ? styles.reportSubmitButtonDisabled : null]}
                disabled={isSubmitting || isPickingPhotos}
                onPress={() => void submitAndFocusInvalidField()}
                accessibilityRole="button"
                aria-busy={isSubmitting || isPickingPhotos}
                accessibilityState={{ busy: isSubmitting || isPickingPhotos, disabled: isSubmitting || isPickingPhotos }}
              >
                <Text style={styles.reportSubmitText}>{isSubmitting ? 'Sending...' : isPickingPhotos ? 'Preparing photos...' : 'Send report'}</Text>
              </Pressable>
              <Text accessibilityLiveRegion="polite" style={styles.reportStatus}>{status}</Text>
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

  async function submitAndFocusInvalidField() {
    const invalidField = await onSubmit();
    if (invalidField === 'name') nameInput.current?.focus();
    if (invalidField === 'email') emailInput.current?.focus();
    if (invalidField === 'report') reportInput.current?.focus();
    if (invalidField === 'tripDate') dateInput.current?.focus();
    if (invalidField && !['name', 'email', 'report'].includes(invalidField)) scrollFocusedInputIntoView(invalidField);
  }

  function scrollFocusedInputIntoView(key: string) {
    const fieldOffset = inputOffsets.current[key] ?? 0;
    const targetY = Math.max(0, fieldOffset - 80);
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: targetY, animated: !reducedMotion });
    }, 80);
  }
}

function SentimentPicker({
  value,
  disabled,
  onChange,
}: {
  value: string;
  disabled: boolean;
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
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={`Trip rating: ${option.label}`}
            aria-pressed={selected}
              accessibilityState={{ selected, disabled }}
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

function ChoicePicker<T extends string>({
  label,
  error,
  onLayout,
  disabled,
  value,
  options,
  onChange,
}: {
  label: string;
  error?: string;
  onLayout?: (event: LayoutChangeEvent) => void;
  disabled: boolean;
  value: T | '';
  options: ReadonlyArray<{ value: T; label: string }>;
  onChange: (value: T | '') => void;
}) {
  return (
    <View style={styles.choiceGroup} onLayout={onLayout}>
      <Text style={styles.choiceLabel}>{label} *</Text>
      {error ? <Text style={styles.fieldError} accessibilityLiveRegion="polite">{error}</Text> : null}
      <View style={styles.sentimentRow}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <Pressable
              key={option.value}
              style={[styles.sentimentChip, selected ? styles.sentimentChipSelected : null]}
              onPress={() => onChange(option.value)}
              disabled={disabled}
              accessibilityRole="button"
              accessibilityLabel={`${label}: ${option.label}`}
              aria-pressed={selected}
              accessibilityState={{ selected, disabled }}
            >
              <Text style={[styles.sentimentChipText, selected ? styles.sentimentChipTextSelected : null]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldError: { color: colors.noGo, fontSize: 13, lineHeight: 19 },
  sheetScrim: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(10, 24, 29, 0.34)',
  },
  keyboardWrap: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
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
    minHeight: 44,
    justifyContent: 'center',
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
  choiceGroup: {
    gap: spacing.xs,
  },
  choiceLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
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
