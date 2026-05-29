import type { ServerResponse } from 'node:http';
import type { RiverAlertThreshold, RiverAlertState } from '../../lib/alerts';
import type { ApiRequest } from '../http';
import { clean, readJsonBody, sendBodyLimitResponse, sendJson } from '../http';
import { getIp, isRateLimited } from '../rate-limit';
import { parseRiverAlertThreshold } from '../request-parsers';
import { verifyRiverAlertActionToken } from '../../lib/alert-links';
import {
  createRiverThresholdAlert,
  getRiverAlertById,
  updateRiverAlert,
} from '../../lib/alerts';
import { getStoredRiverDetailSnapshot } from '../../lib/river-snapshots';
import { getRiverBySlug } from '../../lib/rivers';

export async function handleRiverAlertCreate(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return sendJson(
      response,
      429,
      {
        requestId,
        error: 'too_many_requests',
        message: 'Too many requests. Please try again later.',
      },
      includeBody,
      'no-store'
    );
  }

  try {
    const body = await readJsonBody(request);
    const email = clean(body?.email, 240).toLowerCase();
    const expoPushToken = clean(body?.expoPushToken, 320);
    const deliveryMethod = body?.deliveryMethod === 'push' ? 'push' : 'email';
    const riverSlug = clean(body?.riverSlug, 160);
    const threshold = parseRiverAlertThreshold(body?.threshold);
    const honeypot = clean(body?.company, 240);

    if (honeypot) {
      return sendJson(response, 202, { requestId, ok: true, stored: false }, includeBody, 'no-store');
    }

    if (!riverSlug || !threshold || (deliveryMethod === 'email' && !email) || (deliveryMethod === 'push' && !expoPushToken)) {
      return sendJson(
        response,
        400,
        { requestId, error: 'missing_required_fields', message: 'Missing required alert fields.' },
        includeBody,
        'no-store'
      );
    }

    if (deliveryMethod === 'email' && !isValidEmail(email)) {
      return sendJson(
        response,
        400,
        { requestId, error: 'invalid_email', message: 'Enter a valid email address.' },
        includeBody,
        'no-store'
      );
    }

    const river = getRiverBySlug(riverSlug);
    if (!river) {
      return sendJson(
        response,
        404,
        { requestId, error: 'not_found', message: 'That river route could not be found.' },
        includeBody,
        'no-store'
      );
    }

    const snapshot = await getStoredRiverDetailSnapshot(river.slug).catch(() => null);
    const initialState = snapshot && meetsAlertThreshold(snapshot.result.rating, threshold)
      ? 'at_or_above_threshold'
      : 'below_threshold';

    const created = await createRiverThresholdAlert({
      email,
      expoPushToken,
      deliveryMethod,
      riverId: river.riverId,
      riverSlug: river.slug,
      riverName: river.name,
      riverReach: river.reach,
      threshold,
      initialState,
    });

    console.log('[alerts] created', {
      requestId,
      alertId: created.alert.id,
      riverSlug: river.slug,
      threshold,
      duplicate: created.duplicate,
      reactivated: created.reactivated,
      deliveryMethod,
    });

    return sendJson(
      response,
      created.duplicate ? 200 : 202,
      {
        requestId,
        ok: true,
        duplicate: created.duplicate,
        reactivated: created.reactivated,
        alert: {
          id: created.alert.id,
          threshold: created.alert.threshold,
          riverSlug: created.alert.riverSlug,
          lastState: created.alert.lastState,
          deliveryMethod: created.alert.deliveryMethod ?? 'email',
        },
      },
      includeBody,
      'no-store'
    );
  } catch (error) {
    const bodyLimitResponse = sendBodyLimitResponse(error, response, requestId, includeBody);
    if (bodyLimitResponse) return bodyLimitResponse;

    console.error('[alerts] create failed', { requestId, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'alert_create_failed', message: 'Could not save this alert right now.' },
      includeBody,
      'no-store'
    );
  }
}

export async function handleRiverAlertUnsubscribe(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  try {
    const body = await readJsonBody(request);
    const alertId = clean(body?.alertId, 240);
    const token = clean(body?.token, 400);

    if (!alertId || !token) {
      return sendJson(
        response,
        400,
        { requestId, error: 'missing_required_fields', message: 'Missing alert unsubscribe link details.' },
        includeBody,
        'no-store'
      );
    }

    const alert = await getRiverAlertById(alertId);
    if (!alert) {
      return sendJson(
        response,
        404,
        { requestId, error: 'not_found', message: 'This alert no longer exists.' },
        includeBody,
        'no-store'
      );
    }

    if (!verifyRiverAlertActionToken(alert, token, 'unsubscribe')) {
      return sendJson(
        response,
        401,
        { requestId, error: 'invalid_alert_link', message: 'This alert link is invalid or expired.' },
        includeBody,
        'no-store'
      );
    }

    if (!alert.isActive) {
      return sendJson(
        response,
        200,
        {
          requestId,
          ok: true,
          alreadyInactive: true,
          alert: {
            id: alert.id,
            riverSlug: alert.riverSlug,
            riverName: alert.riverName,
            threshold: alert.threshold,
          },
        },
        includeBody,
        'no-store'
      );
    }

    await updateRiverAlert(alert.id, {
      isActive: false,
      updatedAt: new Date().toISOString(),
    });

    console.log('[alerts] unsubscribed', {
      requestId,
      alertId: alert.id,
      riverSlug: alert.riverSlug,
      threshold: alert.threshold,
    });

    return sendJson(
      response,
      200,
      {
        requestId,
        ok: true,
        unsubscribed: true,
        alert: {
          id: alert.id,
          riverSlug: alert.riverSlug,
          riverName: alert.riverName,
          threshold: alert.threshold,
        },
      },
      includeBody,
      'no-store'
    );
  } catch (error) {
    console.error('[alerts] unsubscribe failed', { requestId, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'alert_unsubscribe_failed', message: 'Could not update this alert right now.' },
      includeBody,
      'no-store'
    );
  }
}


function meetsAlertThreshold(rating: string, threshold: RiverAlertThreshold): RiverAlertState {
  return ratingRank(rating) >= (threshold === 'strong' ? 3 : 2) ? 'at_or_above_threshold' : 'below_threshold';
}

function ratingRank(rating: string) {
  if (rating === 'Strong') return 3;
  if (rating === 'Good') return 2;
  if (rating === 'Fair') return 1;
  return 0;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
