import type { CreateRiverAlertResponse, RiverAlertThreshold } from '@paddletoday/api-contract';

export function isValidEmailAddress(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function alertThresholdLabel(value: RiverAlertThreshold) {
  return value === 'strong' ? 'Strong' : 'Good';
}

export function alertMutationMessage(
  response: CreateRiverAlertResponse,
  threshold: RiverAlertThreshold,
  deliveryMethod: 'email' | 'push' = 'email'
) {
  const thresholdLabel = alertThresholdLabel(threshold);
  const alertLabel = deliveryMethod === 'push' ? 'native alert' : 'alert';
  if (response.duplicate) {
    return `Already watching this route for ${thresholdLabel} with this ${alertLabel}.`;
  }

  if (response.reactivated) {
    return `${thresholdLabel} ${alertLabel} turned back on.`;
  }

  if (deliveryMethod === 'push') {
    return `Native alert saved. You will get notified on the next ${thresholdLabel} crossing.`;
  }

  return `Alert saved. You will get emailed on the next ${thresholdLabel} crossing, with an unsubscribe link in the email.`;
}
