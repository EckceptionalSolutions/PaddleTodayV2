import { createHmac, timingSafeEqual } from 'node:crypto';

import type { RiverThresholdAlert } from './alerts';

export type RiverAlertLinkAction = 'unsubscribe';

export function createRiverAlertActionToken(
  alert: Pick<RiverThresholdAlert, 'id' | 'email' | 'threshold' | 'createdAt'>,
  action: RiverAlertLinkAction = 'unsubscribe'
) {
  const secret = alertSigningSecret();
  return createHmac('sha256', secret).update(alertTokenPayload(alert, action)).digest('base64url');
}

export function verifyRiverAlertActionToken(
  alert: Pick<RiverThresholdAlert, 'id' | 'email' | 'threshold' | 'createdAt'>,
  token: string,
  action: RiverAlertLinkAction = 'unsubscribe'
) {
  if (!token) {
    return false;
  }

  const expected = createRiverAlertActionToken(alert, action);
  const left = Buffer.from(expected);
  const right = Buffer.from(token);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export function riverAlertManageUrl(
  alert: Pick<RiverThresholdAlert, 'id' | 'email' | 'threshold' | 'createdAt' | 'riverSlug' | 'riverName'>,
  action: RiverAlertLinkAction = 'unsubscribe'
) {
  const siteUrl = process.env.SITE_URL || 'https://paddletoday.com';
  const url = new URL('/alerts/unsubscribe/', siteUrl);
  url.searchParams.set('alert', alert.id);
  url.searchParams.set('token', createRiverAlertActionToken(alert, action));
  url.searchParams.set('river', alert.riverName);
  url.searchParams.set('slug', alert.riverSlug);
  url.searchParams.set('threshold', alert.threshold);
  return url.toString();
}

function alertTokenPayload(
  alert: Pick<RiverThresholdAlert, 'id' | 'email' | 'threshold' | 'createdAt'>,
  action: RiverAlertLinkAction
) {
  return [action, alert.id, alert.email.trim().toLowerCase(), alert.threshold, alert.createdAt].join('|');
}

function alertSigningSecret() {
  const configured = String(process.env.ALERTS_SIGNING_SECRET || '').trim();
  if (configured) {
    return configured;
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'paddletoday-dev-alert-signing-secret';
  }

  throw new Error('Missing ALERTS_SIGNING_SECRET for alert management links.');
}
