import type { ServerResponse } from 'node:http';
import type { ApiRequest } from '../http';
import { clean, readJsonBody, sendJson } from '../http';
import { consumeRateLimit, getIp, rateLimitHeaders } from '../rate-limit';
import {
  createAreaNotificationManagementToken,
  createOrUpdateAreaNotificationSubscription,
  DEFAULT_AREA_NOTIFICATION_TRAVEL_MINUTES,
  getAreaNotificationSubscription,
  isAreaNotificationsEnabled,
  updateAreaNotificationSubscription,
  verifyAreaNotificationManagementToken,
} from '../../lib/area-notifications';

export async function handleAreaNotificationCreate(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
) {
  if (!isAreaNotificationsEnabled()) {
    return sendJson(response, 404, { requestId, error: 'not_found' }, includeBody, 'no-store');
  }

  const rateLimit = consumeRateLimit('alerts', getIp(request));
  if (rateLimit.limited) {
    return sendJson(response, 429, { requestId, error: 'too_many_requests', message: 'Too many requests. Please try again later.' }, includeBody, 'no-store', rateLimitHeaders(rateLimit));
  }

  try {
    const body = await readJsonBody(request);
    const input = parseCreateInput(body);
    if (!input.ok) {
      return sendJson(response, 400, { requestId, error: 'invalid_subscription', message: input.message }, includeBody, 'no-store');
    }

    const result = await createOrUpdateAreaNotificationSubscription(input.value);
    return sendJson(response, result.created ? 202 : 200, {
      requestId,
      ok: true,
      created: result.created,
      subscription: subscriptionResponse(result.subscription),
    }, includeBody, 'no-store');
  } catch (error) {
    console.error('[area-notifications] create failed', { requestId, error });
    return sendJson(response, 502, { requestId, error: 'subscription_create_failed', message: 'Could not save nearby alerts right now.' }, includeBody, 'no-store');
  }
}

export async function handleAreaNotificationPatch(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
  subscriptionId: string,
) {
  if (!isAreaNotificationsEnabled()) {
    return sendJson(response, 404, { requestId, error: 'not_found' }, includeBody, 'no-store');
  }

  const rateLimit = consumeRateLimit('alerts', getIp(request));
  if (rateLimit.limited) {
    return sendJson(response, 429, { requestId, error: 'too_many_requests', message: 'Too many requests. Please try again later.' }, includeBody, 'no-store', rateLimitHeaders(rateLimit));
  }

  try {
    const body = await readJsonBody(request);
    const managementToken = clean(body?.managementToken, 400);
    const subscription = await getAreaNotificationSubscription(subscriptionId);
    if (!subscription || !managementToken || !verifyAreaNotificationManagementToken(subscription, managementToken)) {
      return sendJson(response, 401, { requestId, error: 'invalid_subscription_token', message: 'This nearby-alert subscription could not be verified.' }, includeBody, 'no-store');
    }

    const patch = parsePatchInput(body);
    if (!patch.ok) {
      return sendJson(response, 400, { requestId, error: 'invalid_subscription', message: patch.message }, includeBody, 'no-store');
    }

    const locationChanged = patch.value.latitude !== undefined
      || patch.value.longitude !== undefined
      || patch.value.locationLabel !== undefined;
    const updated = await updateAreaNotificationSubscription(subscription.id, locationChanged
      ? { ...patch.value, lastTodayEligibleSlugs: [], lastWeekendKey: null }
      : patch.value);
    if (!updated) {
      return sendJson(response, 404, { requestId, error: 'not_found' }, includeBody, 'no-store');
    }

    return sendJson(response, 200, {
      requestId,
      ok: true,
      created: false,
      subscription: subscriptionResponse(updated),
    }, includeBody, 'no-store');
  } catch (error) {
    console.error('[area-notifications] patch failed', { requestId, subscriptionId, error });
    return sendJson(response, 502, { requestId, error: 'subscription_update_failed', message: 'Could not update nearby alerts right now.' }, includeBody, 'no-store');
  }
}

function subscriptionResponse(subscription: Awaited<ReturnType<typeof createOrUpdateAreaNotificationSubscription>>['subscription']) {
  return {
    id: subscription.id,
    managementToken: createAreaNotificationManagementToken(subscription),
    locationLabel: subscription.locationLabel,
    maxTravelMinutes: subscription.maxTravelMinutes,
    todayEnabled: subscription.todayEnabled,
    weekendEnabled: subscription.weekendEnabled,
    isActive: subscription.isActive,
  };
}

function parseCreateInput(body: Record<string, any> | null):
  | { ok: true; value: Parameters<typeof createOrUpdateAreaNotificationSubscription>[0] }
  | { ok: false; message: string } {
  const expoPushToken = clean(body?.expoPushToken, 320);
  const locationLabel = clean(body?.locationLabel, 120);
  const timeZone = clean(body?.timeZone, 80);
  const latitude = finiteNumber(body?.latitude);
  const longitude = finiteNumber(body?.longitude);
  const maxTravelMinutes = finiteNumber(body?.maxTravelMinutes ?? DEFAULT_AREA_NOTIFICATION_TRAVEL_MINUTES);
  if (!expoPushToken || !locationLabel || !timeZone || latitude === null || longitude === null || maxTravelMinutes === null) {
    return { ok: false, message: 'Push token, location, range, and timezone are required.' };
  }
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180 || maxTravelMinutes < 30 || maxTravelMinutes > 360) {
    return { ok: false, message: 'Location or travel range is outside the supported range.' };
  }
  return {
    ok: true,
    value: {
      expoPushToken,
      latitude,
      longitude,
      locationLabel,
      maxTravelMinutes,
      timeZone,
      todayEnabled: body?.todayEnabled !== false,
      weekendEnabled: body?.weekendEnabled !== false,
    },
  };
}

function parsePatchInput(body: Record<string, any> | null):
  | { ok: true; value: Parameters<typeof updateAreaNotificationSubscription>[1] }
  | { ok: false; message: string } {
  const value: Parameters<typeof updateAreaNotificationSubscription>[1] = {};
  if (body?.expoPushToken !== undefined) value.expoPushToken = clean(body.expoPushToken, 320);
  if (body?.locationLabel !== undefined) value.locationLabel = clean(body.locationLabel, 120);
  if (body?.timeZone !== undefined) value.timeZone = clean(body.timeZone, 80);
  if (body?.latitude !== undefined) value.latitude = finiteNumber(body.latitude) ?? undefined;
  if (body?.longitude !== undefined) value.longitude = finiteNumber(body.longitude) ?? undefined;
  if (body?.maxTravelMinutes !== undefined) value.maxTravelMinutes = finiteNumber(body.maxTravelMinutes) ?? undefined;
  if (body?.todayEnabled !== undefined) value.todayEnabled = Boolean(body.todayEnabled);
  if (body?.weekendEnabled !== undefined) value.weekendEnabled = Boolean(body.weekendEnabled);
  if (body?.isActive !== undefined) value.isActive = Boolean(body.isActive);

  if (value.expoPushToken === '') return { ok: false, message: 'Push token cannot be empty.' };
  if (value.locationLabel === '') return { ok: false, message: 'Location label cannot be empty.' };
  if (value.timeZone === '') return { ok: false, message: 'Timezone cannot be empty.' };
  if (value.latitude !== undefined && (value.latitude < -90 || value.latitude > 90)) return { ok: false, message: 'Latitude is invalid.' };
  if (value.longitude !== undefined && (value.longitude < -180 || value.longitude > 180)) return { ok: false, message: 'Longitude is invalid.' };
  if (value.maxTravelMinutes !== undefined && (value.maxTravelMinutes < 30 || value.maxTravelMinutes > 360)) return { ok: false, message: 'Travel range is invalid.' };
  return { ok: true, value };
}

function finiteNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}
