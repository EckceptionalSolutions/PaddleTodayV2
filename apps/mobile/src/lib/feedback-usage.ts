import AsyncStorage from '@react-native-async-storage/async-storage';
import { isRecord, parseJson } from './storage';

const STORAGE_KEY = 'paddletoday:feedback-usage:v1';
const DAY_MS = 24 * 60 * 60 * 1000;
const FEEDBACK_MIN_AGE_MS = 7 * DAY_MS;
const FEEDBACK_SNOOZE_MS = 30 * DAY_MS;
const FEEDBACK_SUBMITTED_SNOOZE_MS = 120 * DAY_MS;
const REVIEW_MIN_AGE_MS = 10 * DAY_MS;
const EXPERIENCE_SPACING_MS = 14 * DAY_MS;

interface FeedbackUsageState {
  firstOpenedAt: number;
  openCount: number;
  meaningfulActionCount: number;
  lastMeaningfulActionAt?: number;
  pendingReviewOpportunityAt?: number;
  nextFeedbackPromptAt?: number;
  lastFeedbackPromptAt?: number;
  lastExperienceAt?: number;
  feedbackSubmittedAt?: number;
  reviewRequestedVersion?: string;
}

export interface FeedbackExperienceDecision {
  showFeedback: boolean;
  requestReview: boolean;
}

let writeQueue = Promise.resolve();

export function recordFeedbackUsageEvent(
  name: string,
  properties: Record<string, boolean | number | string | null | undefined> = {}
) {
  if (name === 'app_opened') {
    return updateState((state, now) => ({
      ...state,
      firstOpenedAt: state.firstOpenedAt || now,
      openCount: state.openCount + 1,
    }));
  }

  const meaningful = isMeaningfulAction(name, properties);
  const reviewOpportunity = isReviewOpportunity(name, properties);
  if (!meaningful && !reviewOpportunity) {
    return Promise.resolve();
  }

  return updateState((state, now) => ({
    ...state,
    meaningfulActionCount: meaningful ? state.meaningfulActionCount + 1 : state.meaningfulActionCount,
    lastMeaningfulActionAt: meaningful ? now : state.lastMeaningfulActionAt,
    pendingReviewOpportunityAt: reviewOpportunity ? now : state.pendingReviewOpportunityAt,
  }));
}

export async function feedbackExperienceDecision(appVersion: string, now = Date.now()): Promise<FeedbackExperienceDecision> {
  const state = await readState(now);
  const debug = process.env.EXPO_PUBLIC_FEEDBACK_PROMPT_DEBUG === '1';
  const oldEnoughForFeedback = debug || now - state.firstOpenedAt >= FEEDBACK_MIN_AGE_MS;
  const enoughUsageForFeedback = debug || (state.openCount >= 5 && state.meaningfulActionCount >= 3);
  const feedbackDue = !state.nextFeedbackPromptAt || state.nextFeedbackPromptAt <= now;
  const showFeedback = oldEnoughForFeedback && enoughUsageForFeedback && feedbackDue;

  if (showFeedback) {
    return {
      showFeedback: true,
      requestReview: false,
    };
  }

  const oldEnoughForReview = debug || now - state.firstOpenedAt >= REVIEW_MIN_AGE_MS;
  const enoughUsageForReview = debug || (state.openCount >= 8 && state.meaningfulActionCount >= 6);
  const reviewOpportunity = Boolean(state.pendingReviewOpportunityAt);
  const differentVersion = state.reviewRequestedVersion !== appVersion;
  const spacedFromOtherPrompt = !state.lastExperienceAt || now - state.lastExperienceAt >= EXPERIENCE_SPACING_MS;

  return {
    showFeedback: false,
    requestReview:
      oldEnoughForReview &&
      enoughUsageForReview &&
      reviewOpportunity &&
      differentVersion &&
      spacedFromOtherPrompt,
  };
}

export function markFeedbackPromptShown(now = Date.now()) {
  return updateState((state) => ({
    ...state,
    lastFeedbackPromptAt: now,
    lastExperienceAt: now,
    nextFeedbackPromptAt: now + FEEDBACK_SNOOZE_MS,
  }));
}

export function snoozeFeedbackPrompt(now = Date.now()) {
  return updateState((state) => ({
    ...state,
    nextFeedbackPromptAt: now + FEEDBACK_SNOOZE_MS,
  }));
}

export function markFeedbackSubmitted(now = Date.now()) {
  return updateState((state) => ({
    ...state,
    feedbackSubmittedAt: now,
    lastExperienceAt: now,
    nextFeedbackPromptAt: now + FEEDBACK_SUBMITTED_SNOOZE_MS,
  }));
}

export function markReviewRequested(appVersion: string, now = Date.now()) {
  return updateState((state) => ({
    ...state,
    reviewRequestedVersion: appVersion,
    pendingReviewOpportunityAt: undefined,
    lastExperienceAt: now,
  }));
}

export function markReviewAttempted(now = Date.now()) {
  return updateState((state) => ({
    ...state,
    lastExperienceAt: now,
  }));
}

async function updateState(
  updater: (state: FeedbackUsageState, now: number) => FeedbackUsageState
) {
  writeQueue = writeQueue
    .catch(() => undefined)
    .then(async () => {
      const now = Date.now();
      const state = await readState(now);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updater(state, now)));
    })
    .catch(() => undefined);
  return writeQueue;
}

async function readState(now: number): Promise<FeedbackUsageState> {
  const parsed = parseJson(await AsyncStorage.getItem(STORAGE_KEY));
  if (!isRecord(parsed)) {
    return defaultState(now);
  }

  return {
    firstOpenedAt: numericValue(parsed.firstOpenedAt, now),
    openCount: numericValue(parsed.openCount, 0),
    meaningfulActionCount: numericValue(parsed.meaningfulActionCount, 0),
    lastMeaningfulActionAt: optionalNumericValue(parsed.lastMeaningfulActionAt),
    pendingReviewOpportunityAt: optionalNumericValue(parsed.pendingReviewOpportunityAt),
    nextFeedbackPromptAt: optionalNumericValue(parsed.nextFeedbackPromptAt),
    lastFeedbackPromptAt: optionalNumericValue(parsed.lastFeedbackPromptAt),
    lastExperienceAt: optionalNumericValue(parsed.lastExperienceAt),
    feedbackSubmittedAt: optionalNumericValue(parsed.feedbackSubmittedAt),
    reviewRequestedVersion:
      typeof parsed.reviewRequestedVersion === 'string' ? parsed.reviewRequestedVersion : undefined,
  };
}

function defaultState(now: number): FeedbackUsageState {
  return {
    firstOpenedAt: now,
    openCount: 0,
    meaningfulActionCount: 0,
  };
}

function numericValue(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function optionalNumericValue(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function isMeaningfulAction(
  name: string,
  properties: Record<string, boolean | number | string | null | undefined>
) {
  if (name === 'saved_river_toggled') {
    return properties.saved === true;
  }

  return new Set([
    'route_opened',
    'directions_opened',
    'native_alert_create_succeeded',
    'route_report_submitted',
    'route_photo_contribution_submitted',
    'route_share_completed',
  ]).has(name);
}

function isReviewOpportunity(
  name: string,
  properties: Record<string, boolean | number | string | null | undefined>
) {
  if (name === 'saved_river_toggled') {
    return properties.saved === true;
  }

  return new Set([
    'native_alert_create_succeeded',
    'route_report_submitted',
    'route_photo_contribution_submitted',
    'route_share_completed',
  ]).has(name);
}
