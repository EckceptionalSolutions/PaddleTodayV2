import type { CreateRiverAlertResponse, RiverAlertThreshold } from '@paddletoday/api-contract';

export function isValidEmailAddress(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function alertThresholdLabel(value: RiverAlertThreshold) {
  return value === 'strong' ? 'Strong' : 'Good';
}

export function alertMutationMessage(
  response: CreateRiverAlertResponse,
  threshold: RiverAlertThreshold
) {
  const thresholdLabel = alertThresholdLabel(threshold);
  if (response.duplicate) {
    return `Already watching this route for ${thresholdLabel}.`;
  }

  if (response.reactivated) {
    return `${thresholdLabel} alert turned back on.`;
  }

  return `Alert saved. You will get emailed on the next ${thresholdLabel} crossing.`;
}
