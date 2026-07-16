import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { ServerResponse } from 'node:http';
import type { AppFeedbackCategory } from '@paddletoday/api-contract';
import { sendFeedbackNotificationEmail } from '../../lib/feedback-email';
import type { ApiRequest } from '../http';
import { clean, readJsonBody, sendBodyLimitResponse, sendJson } from '../http';
import { getIp, isRateLimited } from '../rate-limit';

const FEEDBACK_CATEGORIES = new Set<AppFeedbackCategory>([
  'route_coverage',
  'river_calls',
  'maps',
  'alerts',
  'usability',
  'other',
]);

export async function handleAppFeedback(
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
    const category = clean(body?.category, 40) as AppFeedbackCategory;
    const message = clean(body?.message, 4000);
    const replyEmail = clean(body?.replyEmail, 240).toLowerCase();
    const sourceScreen = clean(body?.sourceScreen, 160);
    const appVersion = clean(body?.appVersion, 80);
    const platform = clean(body?.platform, 40);
    const honeypot = clean(body?.company, 240);

    if (honeypot) {
      return sendJson(response, 202, { requestId, ok: true, stored: false }, includeBody, 'no-store');
    }

    if (!FEEDBACK_CATEGORIES.has(category) || message.length < 8) {
      return sendJson(
        response,
        400,
        {
          requestId,
          error: 'missing_required_fields',
          message: 'Choose a feedback category and add a little more detail.',
        },
        includeBody,
        'no-store'
      );
    }

    if (replyEmail && !isValidEmail(replyEmail)) {
      return sendJson(
        response,
        400,
        { requestId, error: 'invalid_email', message: 'Enter a valid email address or leave it blank.' },
        includeBody,
        'no-store'
      );
    }

    const payload = {
      submittedAt: new Date().toISOString(),
      category,
      message,
      replyEmail,
      sourceScreen,
      appVersion,
      platform,
      meta: {
        ip,
        ua: clean(request.headers['user-agent'], 240),
        referer: clean(request.headers.referer, 500),
      },
    };

    const containerSas = parseContainerSas(
      process.env.FEEDBACK_CONTAINER_SAS_URL ||
        process.env.ROUTE_REQUESTS_CONTAINER_SAS_URL ||
        ''
    );
    const prefix = clean(process.env.FEEDBACK_BLOB_PREFIX || 'app-feedback', 120).replace(/^\/+|\/+$/g, '');
    const fileName = `${Date.now()}-${Math.random().toString(16).slice(2, 10)}.json`;
    let storage = 'azure';

    if (!containerSas) {
      const localDir = resolve(process.cwd(), '.local', prefix || 'app-feedback');
      await mkdir(localDir, { recursive: true });
      await writeFile(resolve(localDir, fileName), JSON.stringify(payload, null, 2), 'utf8');
      storage = 'local';
    } else {
      const blobName = `${prefix}/${fileName}`;
      const upstream = await fetch(putBlobUrl(containerSas, blobName), {
        method: 'PUT',
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'content-type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload, null, 2),
      });

      if (!upstream.ok) {
        console.error('[feedback] blob upload failed', { status: upstream.status, requestId });
        return sendJson(
          response,
          502,
          { requestId, error: 'storage_write_failed', message: 'Could not store feedback.' },
          includeBody,
          'no-store'
        );
      }
    }

    let notificationSent = false;
    try {
      const notification = await sendFeedbackNotificationEmail(payload);
      notificationSent = notification.provider !== 'disabled';
    } catch (error) {
      console.error('[feedback] notification email failed', { requestId, error });
    }

    return sendJson(
      response,
      202,
      { requestId, ok: true, stored: true, storage, notificationSent },
      includeBody,
      'no-store'
    );
  } catch (error) {
    const bodyLimitResponse = sendBodyLimitResponse(error, response, requestId, includeBody);
    if (bodyLimitResponse) return bodyLimitResponse;

    console.error('[feedback] request failed', { requestId, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Could not send feedback.' },
      includeBody,
      'no-store'
    );
  }
}

function parseContainerSas(urlRaw: string) {
  const raw = clean(urlRaw, 4000);
  if (!raw) {
    return null;
  }

  const parsed = new URL(raw);
  const query = parsed.search || '';
  parsed.search = '';

  return {
    base: parsed.toString().replace(/\/$/, ''),
    query,
  };
}

function putBlobUrl(container: { base: string; query: string }, blobName: string) {
  return `${container.base}/${blobName}${container.query}`;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
