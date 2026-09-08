import { PaddleTodayApiError } from '@paddletoday/api-client';
import type { AreaNotificationSubscriptionResponse } from '@paddletoday/api-contract';

export function submissionFailureMessage(error: unknown, fallback: string): string {
  if (!(error instanceof PaddleTodayApiError)) return fallback;
  if (error.code === 'request_timeout') {
    return 'No confirmation arrived in time. Your entries are still here. Check your connection before trying again.';
  }
  if (error.status >= 200 && error.status < 300) {
    return 'We could not confirm whether your submission was received. Your entries are still here.';
  }
  return error.message || fallback;
}

export function requireConfirmedAreaSubscription<T extends AreaNotificationSubscriptionResponse>(response: T): T {
  const subscription = response?.subscription;
  if (
    response?.ok !== true ||
    typeof subscription?.id !== 'string' || !subscription.id.trim() ||
    typeof subscription?.managementToken !== 'string' || !subscription.managementToken.trim() ||
    typeof subscription?.locationLabel !== 'string' ||
    !Number.isFinite(subscription?.maxTravelMinutes) ||
    typeof subscription?.todayEnabled !== 'boolean' ||
    typeof subscription?.weekendEnabled !== 'boolean' ||
    typeof subscription?.isActive !== 'boolean'
  ) {
    throw new PaddleTodayApiError({
      message: 'We could not confirm your nearby alert settings. Please try again.',
      status: 502,
      code: 'area_subscription_not_confirmed',
      requestId: response?.requestId,
    });
  }
  return response;
}

export function requireStoredSubmission<T extends { ok: boolean; stored: boolean; requestId?: string }>(response: T): T {
  if (response?.ok !== true || response?.stored !== true) {
    throw new PaddleTodayApiError({
      message: 'Your submission was not saved. Please try again.',
      status: 502,
      code: 'submission_not_stored',
      requestId: response?.requestId,
    });
  }
  return response;
}

export function requireSavedAlert<T extends { ok: boolean; alert: { id: string }; requestId?: string }>(response: T): T {
  if (response?.ok !== true || !response?.alert?.id) {
    throw new PaddleTodayApiError({
      message: 'Your alert was not saved. Please try again.',
      status: 502,
      code: 'alert_not_stored',
      requestId: response?.requestId,
    });
  }
  return response;
}
