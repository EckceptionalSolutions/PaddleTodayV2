import {
  isValidEmailAddress,
  type CreateRiverAlertResponse,
  type RiverAlertThreshold,
} from '@paddletoday/api-contract';

export { isValidEmailAddress };

export function alertThresholdLabel(value: RiverAlertThreshold) {
  return value === 'strong' ? 'Strong' : 'Good';
}

export function alertMutationMessage(
  response: CreateRiverAlertResponse,
  threshold: RiverAlertThreshold,
  deliveryMethod: 'email' | 'push' = 'email'
) {
  const thresholdLabel = alertThresholdLabel(threshold);
  const alertLabel = deliveryMethod === 'push' ? 'phone alert' : 'alert';
  if (response.duplicate) {
    return `Already watching this route for ${thresholdLabel} with this ${alertLabel}.`;
  }

  if (response.reactivated) {
    return `${thresholdLabel} ${alertLabel} turned back on.`;
  }

  if (deliveryMethod === 'push') {
    return `${thresholdLabel} phone alert is on. You will get notified when this route reaches ${thresholdLabel}.`;
  }

  return `Alert saved. You will get emailed on the next ${thresholdLabel} crossing, with an unsubscribe link in the email.`;
}
