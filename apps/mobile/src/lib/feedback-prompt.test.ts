import { beforeEach, expect, it, vi } from 'vitest';
const dependencies = vi.hoisted(() => ({
  decision: vi.fn(), markShown: vi.fn(), open: vi.fn(), review: vi.fn(),
  markRequested: vi.fn(), markAttempted: vi.fn(), track: vi.fn(),
}));
vi.mock('./feedback-controller', () => ({ openFeedbackForm: dependencies.open }));
vi.mock('./feedback-usage', () => ({
  feedbackExperienceDecision: dependencies.decision, markFeedbackPromptShown: dependencies.markShown,
  markReviewAttempted: dependencies.markAttempted, markReviewRequested: dependencies.markRequested,
}));
vi.mock('./observability', () => ({ trackAppEvent: dependencies.track }));
vi.mock('./store-review', () => ({ currentAppVersion: () => 'qa-version', requestAutomaticStoreReview: dependencies.review }));
import { evaluateFeedbackPrompt } from './feedback-prompt';

beforeEach(() => {
  vi.resetAllMocks();
  dependencies.markShown.mockResolvedValue(undefined);
});

it.each(['feedback', 'review'])('does not start a stale %s prompt after eligibility resolves', async (kind) => {
  let finish!: (value: { showFeedback: boolean; requestReview: boolean }) => void;
  dependencies.decision.mockReturnValue(new Promise((resolve) => { finish = resolve; }));
  let current = true;
  const running = evaluateFeedbackPrompt('/', () => current);
  current = false;
  finish({ showFeedback: kind === 'feedback', requestReview: kind === 'review' });
  await running;
  expect(dependencies.open).not.toHaveBeenCalled();
  expect(dependencies.review).not.toHaveBeenCalled();
  expect(dependencies.markShown).not.toHaveBeenCalled();
});

it('does not open feedback when navigation changes while prompt bookkeeping is pending', async () => {
  dependencies.decision.mockResolvedValue({ showFeedback: true, requestReview: false });
  let finish!: () => void;
  dependencies.markShown.mockReturnValue(new Promise<void>((resolve) => { finish = resolve; }));
  let current = true;
  const running = evaluateFeedbackPrompt('/', () => current);
  await vi.waitFor(() => expect(dependencies.markShown).toHaveBeenCalledOnce());
  current = false;
  finish();
  await running;
  expect(dependencies.open).not.toHaveBeenCalled();
  expect(dependencies.track).not.toHaveBeenCalled();
});

it('opens eligible feedback when the original screen remains current', async () => {
  dependencies.decision.mockResolvedValue({ showFeedback: true, requestReview: false });
  await evaluateFeedbackPrompt('/more', () => true);
  expect(dependencies.open).toHaveBeenCalledWith('/more', { automatic: true });
});

it('does not record a cancelled review opportunity as an attempt', async () => {
  dependencies.decision.mockResolvedValue({ showFeedback: false, requestReview: true });
  let current = true;
  dependencies.review.mockImplementation(async () => { current = false; return false; });
  await evaluateFeedbackPrompt('/', () => current);
  expect(dependencies.markAttempted).not.toHaveBeenCalled();
  expect(dependencies.markRequested).not.toHaveBeenCalled();
});
