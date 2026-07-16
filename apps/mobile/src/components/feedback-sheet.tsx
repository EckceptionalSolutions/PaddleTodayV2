import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { PaddleTodayApiError } from '@paddletoday/api-client';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
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
import { useCreateAppFeedbackMutation } from '../api/queries';
import { isValidEmailAddress } from '../lib/alerts';
import { markFeedbackSubmitted, snoozeFeedbackPrompt } from '../lib/feedback-usage';
import { captureAppException, trackAppEvent } from '../lib/observability';
import {
  openStoreReviewPage,
  openWebStoreReviewPage,
  webStoreDestination,
  type WebStoreDestination,
} from '../lib/store-review';
import { colors, radius, spacing } from '../theme/tokens';

type FeedbackView = 'choice' | 'form' | 'success';

export function FeedbackSheet({
  visible,
  source,
  automatic,
  onClose,
}: {
  visible: boolean;
  source: string;
  automatic: boolean;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  const mutation = useCreateAppFeedbackMutation();
  const [view, setView] = useState<FeedbackView>('choice');
  const [message, setMessage] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [status, setStatus] = useState('');
  const [storeChooserVisible, setStoreChooserVisible] = useState(false);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setView('choice');
    setMessage('');
    setReplyEmail('');
    setStatus('');
    setStoreChooserVisible(false);
  }, [visible]);

  async function submitFeedback() {
    const cleanMessage = message.trim();
    const cleanReplyEmail = replyEmail.trim().toLowerCase();

    if (cleanMessage.length < 8) {
      setStatus('Add a little more detail so the feedback is actionable.');
      return;
    }
    if (cleanReplyEmail && !isValidEmailAddress(cleanReplyEmail)) {
      setStatus('Enter a valid email address or leave it blank.');
      return;
    }

    try {
      await mutation.mutateAsync({
        category: 'other',
        message: cleanMessage,
        replyEmail: cleanReplyEmail,
        sourceScreen: source,
        appVersion: Constants.expoConfig?.version ?? '0.0.0',
        platform: Platform.OS,
      });
      await markFeedbackSubmitted();
      trackAppEvent('app_feedback_submitted', {
        source,
        automatic,
      });
      setView('success');
      setStatus('');
    } catch (error) {
      setStatus(
        error instanceof PaddleTodayApiError && error.message
          ? error.message
          : 'Could not send feedback right now. Please try again.'
      );
    }
  }

  function dismiss() {
    if (automatic && view !== 'success') {
      void snoozeFeedbackPrompt();
      trackAppEvent('app_feedback_dismissed', { source });
    }
    onClose();
  }

  async function openReview() {
    if (Platform.OS === 'web') {
      const destination = webStoreDestination();
      if (destination === 'choose') {
        setStoreChooserVisible(true);
        trackAppEvent('store_review_chooser_shown', {
          source: 'feedback_sheet',
        });
        return;
      }

      await openSelectedWebStore(destination);
      return;
    }

    try {
      const opened = await openStoreReviewPage();
      trackAppEvent('store_review_page_opened', {
        source: 'feedback_sheet',
        available: opened,
      });

      if (opened) {
        dismiss();
        return;
      }
    } catch (error) {
      captureAppException(error, {
        name: 'store_review_page_failed',
        extra: {
          source: 'feedback_sheet',
        },
      });
    }

    Alert.alert(
      'Review link unavailable',
      'The store review link is not available in this build yet.'
    );
  }

  async function openSelectedWebStore(store: Exclude<WebStoreDestination, 'choose'>) {
    try {
      await openWebStoreReviewPage(store);
      trackAppEvent('store_review_page_opened', {
        source: 'feedback_sheet',
        store,
        available: true,
      });
      dismiss();
    } catch (error) {
      captureAppException(error, {
        name: 'store_review_page_failed',
        extra: {
          source: 'feedback_sheet',
          store,
        },
      });
      Alert.alert('Review link unavailable', 'The store review page could not be opened.');
    }
  }

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={dismiss}>
      <KeyboardAvoidingView
        style={styles.modal}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={styles.backdrop} onPress={dismiss} accessibilityLabel="Close feedback form" />
        <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
          <View style={styles.handle} />
          <View style={styles.header}>
            {view === 'form' ? (
              <Pressable
                style={styles.headerButton}
                onPress={() => {
                  setStatus('');
                  setView('choice');
                }}
                accessibilityLabel="Back to feedback choices"
              >
                <MaterialCommunityIcons name="arrow-left" color={colors.textMuted} size={21} />
              </Pressable>
            ) : null}
            <View style={styles.headerCopy}>
              <Text style={styles.kicker}>{headerKicker(view, automatic)}</Text>
              <Text style={styles.title}>{headerTitle(view)}</Text>
              <Text style={styles.subtitle}>
                {headerSubtitle(view)}
              </Text>
            </View>
            <Pressable style={styles.headerButton} onPress={dismiss} accessibilityLabel="Close feedback form">
              <MaterialCommunityIcons name="close" color={colors.textMuted} size={22} />
            </Pressable>
          </View>

          {view === 'success' ? (
            <View style={styles.successPanel}>
              <View style={styles.successIcon}>
                <MaterialCommunityIcons name="check" color={colors.surfaceStrong} size={26} />
              </View>
              <Text style={styles.successTitle}>Feedback received</Text>
              <Text style={styles.successText}>
                Thanks for helping make PaddleToday more useful for paddlers.
              </Text>
              <Pressable style={styles.primaryButton} onPress={onClose}>
                <Text style={styles.primaryButtonText}>Done</Text>
              </Pressable>
            </View>
          ) : view === 'choice' ? (
            <View style={styles.choiceContent}>
              <Pressable
                style={[styles.choiceCard, styles.feedbackChoiceCard]}
                onPress={() => {
                  trackAppEvent('app_feedback_form_started', { source, automatic });
                  setView('form');
                }}
                accessibilityRole="button"
                accessibilityLabel="Send private feedback"
              >
                <View style={[styles.choiceIcon, styles.feedbackChoiceIcon]}>
                  <MaterialCommunityIcons name="message-text-outline" color={colors.accent} size={24} />
                </View>
                <View style={styles.choiceCopy}>
                  <Text style={styles.choiceTitle}>Send feedback</Text>
                  <Text style={styles.choiceText}>
                    Send a private note directly to the developer behind PaddleToday.
                  </Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" color={colors.accent} size={22} />
              </Pressable>

              <Pressable
                style={[styles.choiceCard, styles.reviewChoiceCard]}
                onPress={() => void openReview()}
                accessibilityRole="button"
                accessibilityLabel="Rate PaddleToday in the app store"
              >
                <View style={[styles.choiceIcon, styles.reviewChoiceIcon]}>
                  <MaterialCommunityIcons name="star" color={colors.fair} size={24} />
                </View>
                <View style={styles.choiceCopy}>
                  <Text style={styles.choiceTitle}>Rate PaddleToday</Text>
                  <Text style={styles.choiceText}>
                    Leave a public rating in the App Store or Google Play.
                  </Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" color={colors.fair} size={22} />
              </Pressable>

              {storeChooserVisible ? (
                <View style={styles.storeChooser}>
                  <Text style={styles.storeChooserTitle}>Choose your store</Text>
                  <Text style={styles.storeChooserText}>
                    We could not confidently detect a mobile device.
                  </Text>
                  <View style={styles.storeChooserActions}>
                    <Pressable
                      style={styles.storeButton}
                      onPress={() => void openSelectedWebStore('apple')}
                      accessibilityRole="button"
                      accessibilityLabel="Open Apple App Store review page"
                    >
                      <MaterialCommunityIcons name="apple" color={colors.text} size={19} />
                      <Text style={styles.storeButtonText}>App Store</Text>
                    </Pressable>
                    <Pressable
                      style={styles.storeButton}
                      onPress={() => void openSelectedWebStore('google')}
                      accessibilityRole="button"
                      accessibilityLabel="Open Google Play review page"
                    >
                      <MaterialCommunityIcons name="google-play" color={colors.text} size={19} />
                      <Text style={styles.storeButtonText}>Google Play</Text>
                    </Pressable>
                  </View>
                </View>
              ) : null}

              <Pressable style={styles.secondaryButton} onPress={dismiss}>
                <Text style={styles.secondaryButtonText}>{automatic ? 'Not now' : 'Close'}</Text>
              </Pressable>
            </View>
          ) : (
            <ScrollView
              style={styles.formScroll}
              contentContainerStyle={styles.form}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.field}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>What should we know?</Text>
                  <Text style={styles.requiredLabel}>Required</Text>
                </View>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="What worked, what was confusing, or what would you change?"
                  placeholderTextColor={colors.textMuted}
                  multiline
                  maxLength={4000}
                  textAlignVertical="top"
                />
                <Text style={styles.characterCount}>{message.length}/4000</Text>
              </View>

              <View style={styles.field}>
                <View style={styles.labelRow}>
                  <MaterialCommunityIcons name="email-outline" color={colors.textMuted} size={18} />
                  <Text style={styles.label}>Email for follow-up</Text>
                  <Text style={styles.optionalLabel}>Optional</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={replyEmail}
                  onChangeText={setReplyEmail}
                  placeholder="you@example.com (optional)"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {status ? <Text style={styles.status}>{status}</Text> : null}

              <View style={styles.actions}>
                <Pressable
                  style={[styles.primaryButton, mutation.isPending ? styles.buttonDisabled : null]}
                  disabled={mutation.isPending}
                  onPress={() => void submitFeedback()}
                >
                  <Text style={styles.primaryButtonText}>
                    {mutation.isPending ? 'Sending...' : 'Send feedback'}
                  </Text>
                </Pressable>
                <Pressable style={styles.secondaryButton} onPress={() => setView('choice')}>
                  <Text style={styles.secondaryButtonText}>Back</Text>
                </Pressable>
              </View>
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function headerKicker(view: FeedbackView, automatic: boolean) {
  if (view === 'form') return 'Private feedback';
  if (view === 'success') return 'Thank you';
  return automatic ? 'A quick question' : 'Help PaddleToday';
}

function headerTitle(view: FeedbackView) {
  if (view === 'form') return 'Send feedback';
  if (view === 'success') return 'Feedback sent';
  return 'How would you like to help?';
}

function headerSubtitle(view: FeedbackView) {
  if (view === 'form') {
    return "I'm Jeff, the developer behind PaddleToday. I value your feedback and will follow up ASAP if you include your email.";
  }
  if (view === 'success') {
    return 'Your note will help guide future improvements.';
  }
  return 'Share a private note with the developer or leave a public store rating.';
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 31, 25, 0.42)',
  },
  sheet: {
    maxHeight: '88%',
    backgroundColor: colors.surfaceStrong,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.lg,
  },
  handle: {
    width: 42,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  headerCopy: {
    flex: 1,
    gap: 4,
  },
  kicker: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 23,
    lineHeight: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  headerButton: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formScroll: {
    flexGrow: 0,
  },
  form: {
    gap: spacing.lg,
    paddingBottom: spacing.sm,
  },
  choiceContent: {
    gap: spacing.md,
    paddingBottom: spacing.sm,
  },
  choiceCard: {
    minHeight: 92,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  feedbackChoiceCard: {
    borderColor: '#BED5C9',
    backgroundColor: colors.accentSoft,
  },
  reviewChoiceCard: {
    borderColor: '#E1D1A8',
    backgroundColor: '#FBF4E3',
  },
  choiceIcon: {
    width: 46,
    height: 46,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackChoiceIcon: {
    backgroundColor: colors.surfaceStrong,
  },
  reviewChoiceIcon: {
    backgroundColor: '#F3E3B8',
  },
  choiceCopy: {
    flex: 1,
    gap: 3,
  },
  choiceTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  choiceText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  storeChooser: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.xs,
  },
  storeChooserTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
  },
  storeChooserText: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
  storeChooserActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  storeButton: {
    flex: 1,
    minHeight: 42,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceStrong,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  storeButtonText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  field: {
    gap: spacing.sm,
  },
  labelRow: {
    minHeight: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  requiredLabel: {
    marginLeft: 'auto',
    color: colors.noGo,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  optionalLabel: {
    marginLeft: 'auto',
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 15,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  textarea: {
    minHeight: 150,
  },
  characterCount: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: 'right',
  },
  status: {
    color: colors.noGo,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  actions: {
    gap: spacing.sm,
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  primaryButtonText: {
    color: colors.surfaceStrong,
    fontSize: 15,
    fontWeight: '900',
  },
  secondaryButton: {
    minHeight: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '800',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  successPanel: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  successIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  successText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
});
