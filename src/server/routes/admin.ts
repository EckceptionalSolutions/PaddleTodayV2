import type { ServerResponse } from 'node:http';
import type { ApiRequest } from '../http';
import { clean, readJsonBody, sendBinary, sendBodyLimitResponse, sendJson } from '../http';
import { contentTypeFor } from '../static-route';
import {
  adminAuthConfigured,
  clearAdminSessionCookie,
  createAdminSessionCookie,
  getContributionFilePreviewUrl,
  isAdminRequestAuthorized,
  listRouteContributionSubmissions,
  readContributionSubmissionFile,
  reviewRouteContributionSubmission,
  verifyAdminPassword,
} from '../../lib/route-contributions';
import { sendRouteRequestReplyEmail } from '../../lib/route-request-replies';
import { appendRouteRequestReply, getRouteRequestByStorageKey, listRouteRequests } from '../../lib/route-requests';
import { listRouteAudits, updateRouteAudit } from '../../lib/route-audits';
import { getRiverBySlug } from '../../lib/rivers';
import { listRiverAlerts } from '../../lib/alerts';

export async function handleAdminSessionStatus(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  return sendJson(
    response,
    200,
    { requestId, ok: true, authenticated: isAdminRequestAuthorized(request.headers.cookie), configured: adminAuthConfigured() },
    includeBody,
    'no-store'
  );
}

export async function handleAdminSessionCreate(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  if (!adminAuthConfigured()) {
    return sendJson(
      response,
      503,
      { requestId, error: 'admin_not_configured', message: 'Admin access is not configured yet.' },
      includeBody,
      'no-store'
    );
  }

  try {
    const body = await readJsonBody(request);
    const password = clean(body?.password, 240);
    if (!verifyAdminPassword(password)) {
      return sendJson(response, 401, { requestId, error: 'invalid_password', message: 'Invalid password.' }, includeBody, 'no-store');
    }

    response.setHeader('set-cookie', createAdminSessionCookie());
    return sendJson(response, 200, { requestId, ok: true, authenticated: true }, includeBody, 'no-store');
  } catch (error) {
    console.error('[admin-session] create failed', { requestId, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Could not start admin session.' },
      includeBody,
      'no-store'
    );
  }
}

export async function handleAdminLogout(response: ServerResponse, requestId: string, includeBody: boolean) {
  response.setHeader('set-cookie', clearAdminSessionCookie());
  return sendJson(response, 200, { requestId, ok: true, authenticated: false }, includeBody, 'no-store');
}

export async function handleAdminContributionList(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  if (!isAdminRequestAuthorized(request.headers.cookie)) {
    return sendJson(response, 401, { requestId, error: 'unauthorized', message: 'Admin login required.' }, includeBody, 'no-store');
  }

  try {
    const statusRaw = clean(new URL(request.url || '/', 'http://localhost').searchParams.get('status') || '', 24);
    const status =
      statusRaw === 'pending' || statusRaw === 'approved' || statusRaw === 'rejected'
        ? statusRaw
        : undefined;
    const submissions = await listRouteContributionSubmissions({ status });
    const payload = submissions.map((submission) => ({
      ...submission,
      files: submission.files.map((file) => ({
        ...file,
        previewUrl: getContributionFilePreviewUrl(submission.id, file.fileName),
      })),
    }));
    return sendJson(response, 200, { requestId, submissions: payload }, includeBody, 'no-store');
  } catch (error) {
    console.error('[admin-contributions] list failed', { requestId, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Could not load submissions.' },
      includeBody,
      'no-store'
    );
  }
}

export async function handleAdminRouteRequestList(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  if (!isAdminRequestAuthorized(request.headers.cookie)) {
    return sendJson(response, 401, { requestId, error: 'unauthorized', message: 'Admin login required.' }, includeBody, 'no-store');
  }

  try {
    const requests = await listRouteRequests();
    return sendJson(response, 200, { requestId, requests }, includeBody, 'no-store');
  } catch (error) {
    console.error('[admin-route-requests] list failed', { requestId, error });
    return sendJson(
      response,
      200,
      {
        requestId,
        requests: [],
        warning: 'route_request_storage_unavailable',
        message: 'Route request storage is unavailable. Check the production storage SAS has List and Read permissions.',
      },
      includeBody,
      'no-store'
    );
  }
}

export async function handleAdminRouteRequestReply(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
  storageKey: string
) {
  if (!isAdminRequestAuthorized(request.headers.cookie)) {
    return sendJson(response, 401, { requestId, error: 'unauthorized', message: 'Admin login required.' }, includeBody, 'no-store');
  }

  try {
    const routeRequest = await getRouteRequestByStorageKey(storageKey);
    if (!routeRequest) {
      return sendJson(
        response,
        404,
        { requestId, error: 'not_found', message: 'Route request not found.' },
        includeBody,
        'no-store'
      );
    }

    if (!isValidEmail(routeRequest.replyEmail)) {
      return sendJson(
        response,
        400,
        { requestId, error: 'missing_reply_email', message: 'This request does not have a valid reply email.' },
        includeBody,
        'no-store'
      );
    }

    const body = await readJsonBody(request);
    const subject = clean(body?.subject, 180);
    const message = clean(body?.message, 8000);

    if (!subject || !message || message.length < 8) {
      return sendJson(
        response,
        400,
        { requestId, error: 'missing_required_fields', message: 'Add a subject and reply message.' },
        includeBody,
        'no-store'
      );
    }

    const emailResult = await sendRouteRequestReplyEmail({
      routeRequest,
      subject,
      message,
    });

    const updated = await appendRouteRequestReply(storageKey, {
      sentAt: new Date().toISOString(),
      to: routeRequest.replyEmail.trim().toLowerCase(),
      from: emailResult.from,
      replyTo: emailResult.replyTo || undefined,
      subject,
      provider: emailResult.provider,
      providerId: emailResult.id,
    });

    return sendJson(
      response,
      200,
      {
        requestId,
        ok: true,
        provider: emailResult.provider,
        emailId: emailResult.id,
        routeRequest: updated,
      },
      includeBody,
      'no-store'
    );
  } catch (error) {
    console.error('[admin-route-requests] reply failed', { requestId, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: error instanceof Error ? error.message : 'Could not send route request reply.' },
      includeBody,
      'no-store'
    );
  }
}

export async function handleAdminRouteRequestMarkReplied(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
  storageKey: string
) {
  if (!isAdminRequestAuthorized(request.headers.cookie)) {
    return sendJson(response, 401, { requestId, error: 'unauthorized', message: 'Admin login required.' }, includeBody, 'no-store');
  }

  try {
    const routeRequest = await getRouteRequestByStorageKey(storageKey);
    if (!routeRequest) {
      return sendJson(
        response,
        404,
        { requestId, error: 'not_found', message: 'Route request not found.' },
        includeBody,
        'no-store'
      );
    }

    const body = await readJsonBody(request).catch(() => ({}));
    const note = clean(body?.note, 500);
    const updated = await appendRouteRequestReply(storageKey, {
      sentAt: new Date().toISOString(),
      to: routeRequest.replyEmail.trim().toLowerCase(),
      from: 'Admin',
      subject: note || 'Marked replied manually',
      provider: 'manual',
      providerId: `manual_${Date.now()}`,
    });

    return sendJson(
      response,
      200,
      {
        requestId,
        ok: true,
        routeRequest: updated,
      },
      includeBody,
      'no-store'
    );
  } catch (error) {
    console.error('[admin-route-requests] mark replied failed', { requestId, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: error instanceof Error ? error.message : 'Could not mark route request replied.' },
      includeBody,
      'no-store'
    );
  }
}

export async function handleAdminRouteAuditList(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  if (!isAdminRequestAuthorized(request.headers.cookie)) {
    return sendJson(response, 401, { requestId, error: 'unauthorized', message: 'Admin login required.' }, includeBody, 'no-store');
  }

  try {
    const audits = await listRouteAudits();
    return sendJson(response, 200, { requestId, audits }, includeBody, 'no-store');
  } catch (error) {
    console.error('[admin-route-audits] list failed', { requestId, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Could not load route audits.' },
      includeBody,
      'no-store'
    );
  }
}

export async function handleAdminRouteAuditUpdate(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
  routeSlug: string
) {
  if (!isAdminRequestAuthorized(request.headers.cookie)) {
    return sendJson(response, 401, { requestId, error: 'unauthorized', message: 'Admin login required.' }, includeBody, 'no-store');
  }

  const river = getRiverBySlug(routeSlug);
  if (!river) {
    return sendJson(response, 404, { requestId, error: 'not_found', message: 'Route not found.' }, includeBody, 'no-store');
  }

  try {
    const body = await readJsonBody(request);
    const audited = body?.audited === true;
    const reviewer = clean(body?.reviewer, 120) || 'Admin';
    const notes = clean(body?.notes, 1200);
    const audit = await updateRouteAudit({
      routeSlug: river.slug,
      audited,
      reviewer,
      notes,
    });
    return sendJson(response, 200, { requestId, ok: true, audit }, includeBody, 'no-store');
  } catch (error) {
    const bodyLimitResponse = sendBodyLimitResponse(error, response, requestId, includeBody);
    if (bodyLimitResponse) return bodyLimitResponse;

    console.error('[admin-route-audits] update failed', { requestId, routeSlug, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Could not update route audit.' },
      includeBody,
      'no-store'
    );
  }
}

export async function handleAdminStats(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  if (!isAdminRequestAuthorized(request.headers.cookie)) {
    return sendJson(response, 401, { requestId, error: 'unauthorized', message: 'Admin login required.' }, includeBody, 'no-store');
  }

  try {
    const alerts = await listRiverAlerts();
    const activeAlerts = alerts.filter((alert) => alert.isActive);
    const evaluatedActiveAlerts = activeAlerts.filter((alert) => typeof alert.lastEvaluatedAt === 'string' && alert.lastEvaluatedAt);
    const evaluatedTimestamps = evaluatedActiveAlerts
      .map((alert) => Date.parse(alert.lastEvaluatedAt || ''))
      .filter((timestamp) => Number.isFinite(timestamp))
      .sort((left, right) => left - right);
    const stats = {
      riverAlerts: {
        total: alerts.length,
        active: activeAlerts.length,
        inactive: alerts.length - activeAlerts.length,
        strong: activeAlerts.filter((alert) => alert.threshold === 'strong').length,
        good: activeAlerts.filter((alert) => alert.threshold === 'good').length,
        riversCovered: new Set(activeAlerts.map((alert) => alert.riverSlug)).size,
        neverEvaluated: activeAlerts.filter((alert) => !alert.lastEvaluatedAt).length,
        latestEvaluationAt:
          evaluatedTimestamps.length > 0 ? new Date(evaluatedTimestamps[evaluatedTimestamps.length - 1]).toISOString() : null,
        stalestEvaluationAt:
          evaluatedTimestamps.length > 0 ? new Date(evaluatedTimestamps[0]).toISOString() : null,
      },
    };
    return sendJson(response, 200, { requestId, stats }, includeBody, 'no-store');
  } catch (error) {
    console.error('[admin-stats] request failed', { requestId, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Could not load alert stats.' },
      includeBody,
      'no-store'
    );
  }
}

export async function handleAdminContributionReview(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
  submissionId: string
) {
  if (!isAdminRequestAuthorized(request.headers.cookie)) {
    return sendJson(response, 401, { requestId, error: 'unauthorized', message: 'Admin login required.' }, includeBody, 'no-store');
  }

  try {
    const body = await readJsonBody(request);
    const action = clean(body?.action, 24);
    if (action !== 'approve' && action !== 'reject') {
      return sendJson(response, 400, { requestId, error: 'invalid_action', message: 'Choose approve or reject.' }, includeBody, 'no-store');
    }

    const reviewer = clean(body?.reviewer, 120) || 'Admin';
    const note = clean(body?.note, 600);
    const submission = await reviewRouteContributionSubmission({
      id: submissionId,
      action,
      reviewer,
      note,
    });
    if (!submission) {
      return sendJson(response, 404, { requestId, error: 'not_found', message: 'Submission not found.' }, includeBody, 'no-store');
    }

    return sendJson(response, 200, { requestId, ok: true, submission }, includeBody, 'no-store');
  } catch (error) {
    console.error('[admin-contributions] review failed', { requestId, submissionId, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Could not review submission.' },
      includeBody,
      'no-store'
    );
  }
}

export async function handleAdminContributionFile(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  submissionId: string,
  fileName: string
) {
  if (!isAdminRequestAuthorized(request.headers.cookie)) {
    return sendJson(response, 401, { requestId, error: 'unauthorized', message: 'Admin login required.' }, true, 'no-store');
  }

  try {
    const asset = await readContributionSubmissionFile(submissionId, fileName);
    if (!asset) {
      return sendJson(response, 404, { requestId, error: 'not_found', message: 'File not found.' }, true, 'no-store');
    }
    return sendBinary(response, 200, asset.buffer, asset.contentType || contentTypeFor(fileName), 'no-store');
  } catch (error) {
    console.error('[admin-contributions] file request failed', { requestId, submissionId, fileName, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Could not load file preview.' },
      true,
      'no-store'
    );
  }
}
