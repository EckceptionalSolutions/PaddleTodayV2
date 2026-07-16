import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { FeedbackSheet } from './feedback-sheet';
import {
  openFeedbackForm,
  subscribeToFeedbackForm,
  type FeedbackFormRequest,
} from '../lib/feedback-controller';
import {
  feedbackExperienceDecision,
  markFeedbackPromptShown,
  markReviewAttempted,
  markReviewRequested,
} from '../lib/feedback-usage';
import { captureAppException, trackAppEvent } from '../lib/observability';
import {
  currentAppVersion,
  requestAutomaticStoreReview,
} from '../lib/store-review';

export function FeedbackExperience({ pathname }: { pathname: string }) {
  const [request, setRequest] = useState<FeedbackFormRequest | null>(null);
  const evaluationRunning = useRef(false);

  useEffect(() => subscribeToFeedbackForm(setRequest), []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void evaluateExperience(pathname);
    }, 1600);
    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        void evaluateExperience(pathname);
      }
    });
    return () => subscription.remove();
  }, [pathname]);

  async function evaluateExperience(currentPathname: string) {
    if (
      evaluationRunning.current ||
      request ||
      !isSafePromptScreen(currentPathname)
    ) {
      return;
    }

    evaluationRunning.current = true;
    try {
      const appVersion = currentAppVersion();
      const decision = await feedbackExperienceDecision(appVersion);

      if (decision.showFeedback) {
        await markFeedbackPromptShown();
        trackAppEvent('app_feedback_prompt_shown', {
          source: currentPathname,
        });
        openFeedbackForm(currentPathname, { automatic: true });
        return;
      }

      if (decision.requestReview) {
        const requested = await requestAutomaticStoreReview();
        if (requested) {
          await markReviewRequested(appVersion);
        } else {
          await markReviewAttempted();
        }
        trackAppEvent('store_review_requested', {
          source: currentPathname,
          available: requested,
        });
      }
    } catch (error) {
      captureAppException(error, {
        name: 'feedback_experience_failed',
        extra: {
          pathname: currentPathname,
        },
      });
    } finally {
      evaluationRunning.current = false;
    }
  }

  return (
    <FeedbackSheet
      visible={Boolean(request)}
      source={request?.source ?? pathname}
      automatic={request?.automatic === true}
      onClose={() => setRequest(null)}
    />
  );
}

function isSafePromptScreen(pathname: string) {
  return pathname === '/' || pathname === '/more';
}
