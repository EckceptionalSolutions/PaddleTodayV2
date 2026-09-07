import { openFeedbackForm } from './feedback-controller';
import { feedbackExperienceDecision, markFeedbackPromptShown, markReviewAttempted, markReviewRequested } from './feedback-usage';
import { trackAppEvent } from './observability';
import { currentAppVersion, requestAutomaticStoreReview } from './store-review';

export async function evaluateFeedbackPrompt(pathname: string, isCurrent: () => boolean) {
  const appVersion = currentAppVersion();
  const decision = await feedbackExperienceDecision(appVersion);
  if (!isCurrent()) return;

  if (decision.showFeedback) {
    await markFeedbackPromptShown();
    if (!isCurrent()) return;
    trackAppEvent('app_feedback_prompt_shown', { source: pathname });
    openFeedbackForm(pathname, { automatic: true });
    return;
  }

  if (decision.requestReview) {
    const requested = await requestAutomaticStoreReview(isCurrent);
    if (!requested && !isCurrent()) return;
    if (requested) await markReviewRequested(appVersion);
    else await markReviewAttempted();
    trackAppEvent('store_review_requested', { source: pathname, available: requested });
  }
}
