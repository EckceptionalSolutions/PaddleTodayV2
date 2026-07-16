export interface FeedbackFormRequest {
  source: string;
  automatic?: boolean;
}

type FeedbackFormListener = (request: FeedbackFormRequest) => void;

const listeners = new Set<FeedbackFormListener>();

export function openFeedbackForm(source: string, options: { automatic?: boolean } = {}) {
  const request = {
    source,
    automatic: options.automatic,
  };
  listeners.forEach((listener) => listener(request));
}

export function subscribeToFeedbackForm(listener: FeedbackFormListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
