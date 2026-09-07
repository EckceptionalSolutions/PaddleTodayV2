import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { FeedbackSheet } from './feedback-sheet';
import {
  subscribeToFeedbackForm,
  type FeedbackFormRequest,
} from '../lib/feedback-controller';
import { captureAppException } from '../lib/observability';
import { evaluateFeedbackPrompt } from '../lib/feedback-prompt';

export function FeedbackExperience({ pathname }: { pathname: string }) {
  const [request, setRequest] = useState<FeedbackFormRequest | null>(null);
  const evaluationRunning = useRef(false);
  const revision = useRef(0);
  const currentRequest = useRef(request);
  const appActive = useRef(AppState.currentState !== 'background' && AppState.currentState !== 'inactive');
  currentRequest.current = request;

  useEffect(() => subscribeToFeedbackForm((next) => {
    revision.current++;
    currentRequest.current = next;
    setRequest(next);
  }), []);

  useEffect(() => {
    revision.current++;
    const timeout = setTimeout(() => {
      void evaluateExperience(pathname);
    }, 1600);
    return () => {
      revision.current++;
      clearTimeout(timeout);
    };
  }, [pathname]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      revision.current++;
      appActive.current = state === 'active';
      if (state === 'active') {
        void evaluateExperience(pathname);
      }
    });
    return () => subscription.remove();
  }, [pathname]);

  async function evaluateExperience(currentPathname: string) {
    if (
      evaluationRunning.current ||
      !appActive.current ||
      currentRequest.current ||
      !isSafePromptScreen(currentPathname)
    ) {
      return;
    }

    evaluationRunning.current = true;
    const startedRevision = revision.current;
    try {
      await evaluateFeedbackPrompt(currentPathname, () => revision.current === startedRevision && !currentRequest.current);
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
      onClose={() => {
        revision.current++;
        currentRequest.current = null;
        setRequest(null);
      }}
    />
  );
}

function isSafePromptScreen(pathname: string) {
  return pathname === '/' || pathname === '/more';
}
