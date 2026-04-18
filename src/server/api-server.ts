import { createServer, type ServerResponse } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import {
  serializeDetailResult,
  serializeRiverGroupResult,
  serializeRiverHistoryResult,
  serializeSummaryResult,
  serializeWeekendSummaryResult,
} from '../lib/api-contract';
import { verifyRiverAlertActionToken } from '../lib/alert-links';
import {
  createRiverThresholdAlert,
  getRiverAlertById,
  listRiverAlerts,
  updateRiverAlert,
  type RiverAlertThreshold,
  type RiverAlertState,
} from '../lib/alerts';
import { captureHistorySnapshotForResults, getRiverHistory } from '../lib/history';
import {
  captureRiverSnapshots,
  getStoredRiverDetailSnapshot,
  getStoredRiverGroupSnapshot,
  getStoredRiverSummarySnapshot,
  getStoredWeekendSummarySnapshot,
} from '../lib/river-snapshots';
import {
  adminAuthConfigured,
  clearAdminSessionCookie,
  createAdminSessionCookie,
  createRouteContributionSubmission,
  getApprovedCommunityForRoute,
  getContributionFilePreviewUrl,
  isAdminRequestAuthorized,
  listRouteContributionSubmissions,
  readApprovedCommunityPhoto,
  readContributionSubmissionFile,
  reviewRouteContributionSubmission,
  verifyAdminPassword,
} from '../lib/route-contributions';
import { listRouteRequests } from '../lib/route-requests';
import { getAllRiverScores, getRiverBySlug, getRiverGroupScores, getRiverScore, listRivers } from '../lib/rivers';
import { getCacheStats } from '../lib/server-cache';
import { parseQueryNumber, parseRiverAlertThreshold } from './request-parsers';

const host = process.env.CANOE_API_HOST || '0.0.0.0';
const staticDirArg = readArgValue('--static');
const staticDir = staticDirArg ? resolve(process.cwd(), staticDirArg) : null;
const port = Number(
  readArgValue('--port') || process.env.CANOE_API_PORT || process.env.PORT || (staticDir ? 4321 : 4322)
);
const startedAt = Date.now();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const rateByIp = new Map<string, number[]>();

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host || `${host}:${port}`}`);
  const includeBody = request.method !== 'HEAD';
  const requestStartedAt = Date.now();
  const requestId = createRequestId();

  response.on('finish', () => {
    if (shouldLogRequest(requestUrl.pathname, response.statusCode)) {
      console.log(
        `[${new Date().toISOString()}] ${requestId} ${request.method ?? 'GET'} ${requestUrl.pathname} ${response.statusCode} ${Date.now() - requestStartedAt}ms`
      );
    }
  });

  const isRiverRequestPath =
    requestUrl.pathname === '/api/river-request' || requestUrl.pathname === '/api/route-request';
  const isRoutePhotoSubmissionPath = requestUrl.pathname === '/api/route-photo-submissions';
  const isAlertsPath = requestUrl.pathname === '/api/alerts';
  const isAlertUnsubscribePath = requestUrl.pathname === '/api/alerts/unsubscribe';
  const isHistorySnapshotPath = requestUrl.pathname === '/api/history/snapshot';
  const isRiverSnapshotPath = requestUrl.pathname === '/api/snapshots/refresh';
  const riverCommunityMatch = requestUrl.pathname.match(/^\/api\/rivers\/([^/]+)\/community\.json$/);
  const communityPhotoMatch = requestUrl.pathname.match(/^\/api\/community-photos\/([^/]+)\/([^/]+)\/([^/]+)$/);
  const adminContributionFileMatch = requestUrl.pathname.match(/^\/api\/admin\/route-contributions\/files\/([^/]+)\/([^/]+)$/);
  const adminContributionReviewMatch = requestUrl.pathname.match(/^\/api\/admin\/route-contributions\/([^/]+)\/review$/);
  const isAdminSessionPath = requestUrl.pathname === '/api/admin/session';
  const isAdminLogoutPath = requestUrl.pathname === '/api/admin/logout';
  const isAdminContributionsPath = requestUrl.pathname === '/api/admin/route-contributions';
  const isAdminRouteRequestsPath = requestUrl.pathname === '/api/admin/route-requests';
  const isAdminStatsPath = requestUrl.pathname === '/api/admin/stats';

  if (isRiverRequestPath && request.method === 'OPTIONS') {
    return sendEmpty(response, 204, {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type, accept',
      'access-control-max-age': '86400',
      'cache-control': 'no-store',
    });
  }

  if (isRiverRequestPath && request.method === 'POST') {
    return handleRiverRequest(request, response, requestId, includeBody);
  }

  if (isRoutePhotoSubmissionPath && request.method === 'OPTIONS') {
    return sendEmpty(response, 204, {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type, accept',
      'access-control-max-age': '86400',
      'cache-control': 'no-store',
    });
  }

  if (isRoutePhotoSubmissionPath && request.method === 'POST') {
    return handleRoutePhotoSubmission(request, response, requestId, includeBody);
  }

  if (riverCommunityMatch && request.method === 'GET') {
    return handleRouteCommunity(request, response, requestId, includeBody, decodeURIComponent(riverCommunityMatch[1]));
  }

  if (communityPhotoMatch && request.method === 'GET') {
    return handleCommunityPhoto(
      request,
      response,
      requestId,
      decodeURIComponent(communityPhotoMatch[1]),
      decodeURIComponent(communityPhotoMatch[2]),
      decodeURIComponent(communityPhotoMatch[3])
    );
  }

  if (isAdminSessionPath && request.method === 'OPTIONS') {
    return sendEmpty(response, 204, {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, OPTIONS',
      'access-control-allow-headers': 'content-type, accept',
      'access-control-max-age': '86400',
      'cache-control': 'no-store',
    });
  }

  if (isAdminSessionPath && request.method === 'GET') {
    return handleAdminSessionStatus(request, response, requestId, includeBody);
  }

  if (isAdminSessionPath && request.method === 'POST') {
    return handleAdminSessionCreate(request, response, requestId, includeBody);
  }

  if (isAdminLogoutPath && request.method === 'POST') {
    return handleAdminLogout(response, requestId, includeBody);
  }

  if (isAdminContributionsPath && request.method === 'GET') {
    return handleAdminContributionList(request, response, requestId, includeBody);
  }

  if (isAdminRouteRequestsPath && request.method === 'GET') {
    return handleAdminRouteRequestList(request, response, requestId, includeBody);
  }

  if (isAdminStatsPath && request.method === 'GET') {
    return handleAdminStats(request, response, requestId, includeBody);
  }

  if (adminContributionReviewMatch && request.method === 'POST') {
    return handleAdminContributionReview(
      request,
      response,
      requestId,
      includeBody,
      decodeURIComponent(adminContributionReviewMatch[1])
    );
  }

  if (adminContributionFileMatch && request.method === 'GET') {
    return handleAdminContributionFile(
      request,
      response,
      requestId,
      decodeURIComponent(adminContributionFileMatch[1]),
      decodeURIComponent(adminContributionFileMatch[2])
    );
  }

  if (isAlertsPath && request.method === 'OPTIONS') {
    return sendEmpty(response, 204, {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type, accept',
      'access-control-max-age': '86400',
      'cache-control': 'no-store',
    });
  }

  if (isAlertsPath && request.method === 'POST') {
    return handleRiverAlertCreate(request, response, requestId, includeBody);
  }

  if (isAlertUnsubscribePath && request.method === 'OPTIONS') {
    return sendEmpty(response, 204, {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type, accept',
      'access-control-max-age': '86400',
      'cache-control': 'no-store',
    });
  }

  if (isAlertUnsubscribePath && request.method === 'POST') {
    return handleRiverAlertUnsubscribe(request, response, requestId, includeBody);
  }

  if (isHistorySnapshotPath && request.method === 'OPTIONS') {
    return sendEmpty(response, 204, {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type, accept, authorization, x-history-token',
      'access-control-max-age': '86400',
      'cache-control': 'no-store',
    });
  }

  if (isHistorySnapshotPath && request.method === 'POST') {
    return handleHistorySnapshot(request, response, requestId, includeBody);
  }

  if (isRiverSnapshotPath && request.method === 'OPTIONS') {
    return sendEmpty(response, 204, {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type, accept, authorization, x-history-token',
      'access-control-max-age': '86400',
      'cache-control': 'no-store',
    });
  }

  if (isRiverSnapshotPath && request.method === 'POST') {
    return handleRiverSnapshotRefresh(request, response, requestId, includeBody);
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return sendJson(response, 405, {
      requestId,
      error: 'method_not_allowed',
    }, includeBody);
  }

  try {
    if (requestUrl.pathname === '/health') {
      return sendJson(response, 200, {
        requestId,
        ok: true,
        mode: staticDir ? 'one-origin' : 'api-only',
        uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
        startedAt: new Date(startedAt).toISOString(),
        riverCount: listRivers().length,
        cache: getCacheStats(),
      }, includeBody, 'no-store');
    }

    if (requestUrl.pathname === '/health/ready') {
      const indexFile = staticDir ? resolveStaticFile('/', staticDir) : null;
      const ready = staticDir ? Boolean(indexFile) : true;

      return sendJson(response, ready ? 200 : 503, {
        requestId,
        ok: ready,
        mode: staticDir ? 'one-origin' : 'api-only',
        staticDir: staticDir ?? null,
        staticIndexReady: staticDir ? ready : null,
        riverCount: listRivers().length,
        cache: getCacheStats(),
      }, includeBody, 'no-store');
    }

    if (requestUrl.pathname === '/api/rivers/summary.json') {
      const snapshot = await getStoredRiverSummarySnapshot().catch(() => null);
      if (snapshot) {
        return sendJson(response, 200, {
          requestId,
          generatedAt: snapshot.generatedAt,
          riverCount: snapshot.riverCount,
          rivers: snapshot.rivers,
        }, includeBody);
      }

      const generatedAt = new Date().toISOString();
      const rivers = (await getAllRiverScores()).map((result) => serializeSummaryResult({
        ...result,
        generatedAt,
      }));
      return sendJson(response, 200, {
        requestId,
        generatedAt,
        riverCount: rivers.length,
        rivers,
      }, includeBody);
    }

    if (requestUrl.pathname === '/api/weekend/summary.json') {
      const snapshot = await getStoredWeekendSummarySnapshot().catch(() => null);
      if (snapshot) {
        return sendJson(response, 200, {
          requestId,
          generatedAt: snapshot.generatedAt,
          label: snapshot.label,
          riverCount: snapshot.riverCount,
          withheldCount: snapshot.withheldCount,
          rivers: snapshot.rivers,
        }, includeBody);
      }

      const generatedAt = new Date().toISOString();
      const results = await getAllRiverScores();
      const rivers = results
        .map((result) => serializeWeekendSummaryResult({
          ...result,
          generatedAt,
        }))
        .filter(Boolean);

      return sendJson(response, 200, {
        requestId,
        generatedAt,
        label: rivers[0]?.weekend.label ?? 'Weekend',
        riverCount: rivers.length,
        withheldCount: Math.max(0, results.length - rivers.length),
        rivers,
      }, includeBody);
    }

    const detailMatch = requestUrl.pathname.match(/^\/api\/rivers\/([^/]+)\.json$/);
    if (detailMatch) {
      const slug = decodeURIComponent(detailMatch[1] || '');
      const snapshot = await getStoredRiverDetailSnapshot(slug).catch(() => null);
      if (snapshot) {
        return sendJson(response, 200, {
          requestId,
          generatedAt: snapshot.generatedAt,
          result: snapshot.result,
        }, includeBody);
      }

      const result = await getRiverScore(slug);

      if (!result) {
        return sendJson(response, 404, {
          requestId,
          error: 'not_found',
        }, includeBody);
      }

      const generatedAt = new Date().toISOString();
      return sendJson(response, 200, {
        requestId,
        generatedAt,
        result: serializeDetailResult({
          ...result,
          generatedAt,
        }),
      }, includeBody);
    }

    const historyMatch = requestUrl.pathname.match(/^\/api\/rivers\/([^/]+)\/history\.json$/);
    if (historyMatch) {
      const slug = decodeURIComponent(historyMatch[1] || '');
      const river = getRiverBySlug(slug);

      if (!river) {
        return sendJson(response, 404, {
          requestId,
          error: 'not_found',
        }, includeBody);
      }

      const days = parseQueryNumber(requestUrl.searchParams.get('days'), 7);
      const history = await getRiverHistory({
        slug,
        days,
      });

      return sendJson(response, 200, {
        requestId,
        generatedAt: new Date().toISOString(),
        result: serializeRiverHistoryResult({
          river,
          history,
        }),
      }, includeBody);
    }

    const groupMatch = requestUrl.pathname.match(/^\/api\/river-groups\/([^/]+)\.json$/);
    if (groupMatch) {
      const riverId = decodeURIComponent(groupMatch[1] || '');
      const snapshot = await getStoredRiverGroupSnapshot(riverId).catch(() => null);
      if (snapshot) {
        return sendJson(response, 200, {
          requestId,
          generatedAt: snapshot.generatedAt,
          result: snapshot.result,
        }, includeBody);
      }

      const results = await getRiverGroupScores(riverId);

      if (!results) {
        return sendJson(response, 404, {
          requestId,
          error: 'not_found',
        }, includeBody);
      }

      const generatedAt = new Date().toISOString();
      return sendJson(response, 200, {
        requestId,
        generatedAt,
        result: serializeRiverGroupResult({
          riverId,
          routes: results.map((route) => ({
            ...route,
            generatedAt,
          })),
        }),
      }, includeBody);
    }

    if (staticDir) {
      const staticFile = resolveStaticFile(requestUrl.pathname, staticDir);
      if (staticFile) {
        return sendStatic(response, staticFile, includeBody);
      }
    }

    return sendJson(response, 404, { requestId, error: 'not_found' }, includeBody);
  } catch (error) {
    console.error('API server request failed.', {
      requestId,
      method: request.method ?? 'GET',
      path: requestUrl.pathname,
      error,
    });
    return sendJson(response, 502, {
      requestId,
      error: 'live_data_unavailable',
    }, includeBody);
  }
});

server.listen(port, host, () => {
  if (staticDir) {
    console.log(`canoe-adventures-v2 app+api listening on http://${host}:${port} using ${staticDir}`);
  } else {
    console.log(`canoe-adventures-v2 API listening on http://${host}:${port}`);
  }
});

function sendJson(
  response: ServerResponse,
  status: number,
  payload: unknown,
  includeBody = true,
  cacheControl = 'public, max-age=30, stale-while-revalidate=120'
) {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': cacheControl,
    'content-length': Buffer.byteLength(body),
    'x-request-id': requestIdFromPayload(payload),
  });
  response.end(includeBody ? body : undefined);
}

function sendEmpty(response: ServerResponse, status: number, headers: Record<string, string>) {
  response.writeHead(status, headers);
  response.end();
}

function sendStatic(response: ServerResponse, filePath: string, includeBody = true) {
  const stats = statSync(filePath);
  response.writeHead(200, {
    'content-type': contentTypeFor(filePath),
    'cache-control': isAsset(filePath) ? 'public, max-age=31536000, immutable' : 'no-cache',
    'content-length': stats.size,
  });

  if (!includeBody) {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}

function sendBinary(response: ServerResponse, status: number, payload: Buffer, contentType: string, cacheControl = 'no-store') {
  response.writeHead(status, {
    'content-type': contentType,
    'content-length': payload.length,
    'cache-control': cacheControl,
  });
  response.end(payload);
}

function resolveStaticFile(pathname: string, rootDir: string): string | null {
  const normalizedPath = pathname === '/' ? '/index.html' : pathname;
  const candidates = normalizedPath.endsWith('/')
    ? [`${normalizedPath}index.html`]
    : [normalizedPath, `${normalizedPath}.html`, `${normalizedPath}/index.html`];

  for (const candidate of candidates) {
    const filePath = safeResolve(rootDir, candidate);
    if (filePath && existsSync(filePath) && statSync(filePath).isFile()) {
      return filePath;
    }
  }

  return null;
}

function safeResolve(rootDir: string, relativePath: string): string | null {
  const filePath = resolve(rootDir, `.${relativePath}`);
  return filePath.startsWith(rootDir) ? filePath : null;
}

function contentTypeFor(filePath: string): string {
  switch (extname(filePath).toLowerCase()) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.webp':
      return 'image/webp';
    case '.woff2':
      return 'font/woff2';
    default:
      return 'application/octet-stream';
  }
}

function isAsset(filePath: string): boolean {
  return filePath.includes(`${resolve(process.cwd(), 'dist')}${process.platform === 'win32' ? '\\' : '/'}_astro`);
}

function readArgValue(flag: string): string | null {
  const args = process.argv.slice(2);
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] ?? null : null;
}

function shouldLogRequest(pathname: string, statusCode: number): boolean {
  return pathname === '/' || pathname.startsWith('/api/') || pathname.startsWith('/health') || statusCode >= 400;
}

function createRequestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function requestIdFromPayload(payload: unknown): string {
  if (payload && typeof payload === 'object' && 'requestId' in payload) {
    const requestId = payload.requestId;
    if (typeof requestId === 'string') {
      return requestId;
    }
  }

  return 'unknown';
}

async function handleRiverRequest(
  request: Parameters<typeof createServer>[0],
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
    const routeName = clean(body?.routeName, 240);
    const state = clean(body?.state, 64);
    const putIn = clean(body?.putIn, 240);
    const takeOut = clean(body?.takeOut, 240);
    const sources = clean(body?.sources, 4000);
    const notes = clean(body?.notes, 4000);
    const replyEmail = clean(body?.replyEmail, 240);
    const honeypot = clean(body?.company, 240);

    if (!routeName || !state || !notes) {
      return sendJson(
        response,
        400,
        { requestId, error: 'missing_required_fields', message: 'Missing required fields.' },
        includeBody,
        'no-store'
      );
    }

    if (notes.length < 12 || routeName.length < 3) {
      return sendJson(
        response,
        400,
        { requestId, error: 'not_enough_detail', message: 'Please provide more detail.' },
        includeBody,
        'no-store'
      );
    }

    if (honeypot) {
      return sendJson(response, 202, { requestId, ok: true, stored: false }, includeBody, 'no-store');
    }

    const payload = {
      submittedAt: new Date().toISOString(),
      routeName,
      state,
      putIn,
      takeOut,
      sources,
      notes,
      replyEmail,
      meta: {
        ip,
        ua: clean(request.headers['user-agent'], 240),
        referer: clean(request.headers.referer, 500),
      },
    };

    const containerSas = parseContainerSas(process.env.ROUTE_REQUESTS_CONTAINER_SAS_URL || '');
    const prefix = clean(process.env.ROUTE_REQUESTS_BLOB_PREFIX || 'route-requests', 120).replace(/^\/+|\/+$/g, '');
    const stamp = Date.now();
    const rand = Math.random().toString(16).slice(2, 10);

    if (!containerSas) {
      const localDir = resolve(process.cwd(), '.local', prefix || 'route-requests');
      const localFile = resolve(localDir, `${stamp}-${rand}.json`);
      await mkdir(localDir, { recursive: true });
      await writeFile(localFile, JSON.stringify(payload, null, 2), 'utf8');
      return sendJson(
        response,
        202,
        { requestId, ok: true, stored: true, storage: 'local' },
        includeBody,
        'no-store'
      );
    }

    const blobName = `${prefix}/${stamp}-${rand}.json`;
    const blobUrl = putBlobUrl(containerSas, blobName);
    const payloadText = JSON.stringify(payload, null, 2);

    const upstream = await fetch(blobUrl, {
      method: 'PUT',
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'content-type': 'application/json; charset=utf-8',
      },
      body: payloadText,
    });

    if (!upstream.ok) {
      console.error('[river-request] blob upload failed', { status: upstream.status, requestId });
      return sendJson(
        response,
        502,
        { requestId, error: 'storage_write_failed', message: 'Failed to store request.' },
        includeBody,
        'no-store'
      );
    }

    return sendJson(
      response,
      202,
      { requestId, ok: true, stored: true },
      includeBody,
      'no-store'
    );
  } catch (error) {
    console.error('[river-request] request failed', { requestId, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Failed to store request.' },
      includeBody,
      'no-store'
    );
  }
}

async function handleRoutePhotoSubmission(
  request: Parameters<typeof createServer>[0],
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
    const riverSlug = clean(body?.riverSlug, 160);
    const contributorName = clean(body?.contributorName, 120);
    const contributorEmail = clean(body?.contributorEmail, 160).toLowerCase();
    const tripDate = clean(body?.tripDate, 40);
    const tripSentiment = clean(body?.tripSentiment, 40);
    const tripReport = clean(body?.tripReport, 1800);
    const notes = clean(body?.notes, 1200);
    const rightsConfirmed = body?.rightsConfirmed === true;
    const reviewConsent = body?.reviewConsent === true;
    const honeypot = clean(body?.company, 240);
    const files = Array.isArray(body?.files) ? body.files : [];

    if (honeypot) {
      return sendJson(response, 202, { requestId, ok: true, stored: false }, includeBody, 'no-store');
    }

    if (!riverSlug || !contributorName || !contributorEmail || !reviewConsent) {
      return sendJson(
        response,
        400,
        { requestId, error: 'missing_required_fields', message: 'Missing required contribution fields.' },
        includeBody,
        'no-store'
      );
    }

    if (!isValidEmail(contributorEmail)) {
      return sendJson(
        response,
        400,
        { requestId, error: 'invalid_email', message: 'Enter a valid email address.' },
        includeBody,
        'no-store'
      );
    }

    if (files.length > 12) {
      return sendJson(
        response,
        400,
        { requestId, error: 'too_many_files', message: 'Upload up to 12 photos at a time.' },
        includeBody,
        'no-store'
      );
    }

    const hasPhotos = files.length > 0;
    if (!hasPhotos && tripReport.length < 12) {
      return sendJson(
        response,
        400,
        { requestId, error: 'not_enough_detail', message: 'Add a trip review or upload at least one photo.' },
        includeBody,
        'no-store'
      );
    }

    if (hasPhotos && !rightsConfirmed) {
      return sendJson(
        response,
        400,
        { requestId, error: 'rights_required', message: 'Confirm that the uploaded photos are yours or shared with permission.' },
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

    const decodedFiles = [];

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const originalName = clean(file?.name, 240) || `photo-${index + 1}`;
      const decoded = decodeImageDataUrl(clean(file?.dataUrl, 8_000_000));
      const byteSize = Number(file?.size);

      if (!decoded || !isSupportedPhotoMime(decoded.mimeType)) {
        return sendJson(
          response,
          400,
          { requestId, error: 'invalid_photo_type', message: 'Photos must be JPG, PNG, or WebP.' },
          includeBody,
          'no-store'
        );
      }

      if (!Number.isFinite(byteSize) || byteSize <= 0 || byteSize > 4 * 1024 * 1024 || decoded.buffer.length > 4 * 1024 * 1024) {
        return sendJson(
          response,
          400,
          { requestId, error: 'file_too_large', message: 'Each photo must be 4 MB or smaller.' },
          includeBody,
          'no-store'
        );
      }

      const extension = extensionForPhotoMime(decoded.mimeType);
      const fileName = `${String(index + 1).padStart(2, '0')}-${sanitizeFileSegment(originalName, 'photo')}${extension}`;
      decodedFiles.push({
        fileName,
        originalName,
        mimeType: decoded.mimeType,
        size: byteSize,
        buffer: decoded.buffer,
        caption: clean(file?.caption, 240),
      });
    }

    const result = await createRouteContributionSubmission({
      river: {
        slug: river.slug,
        name: river.name,
        reach: river.reach,
        state: river.state,
        region: river.region,
      },
      contributor: {
        name: contributorName,
        email: contributorEmail,
      },
      trip: {
        date: tripDate,
        sentiment: tripSentiment,
        report: tripReport,
      },
      notes,
      rightsConfirmed,
      reviewConsent,
      files: decodedFiles,
      meta: {
        ip,
        ua: clean(request.headers['user-agent'], 240),
        referer: clean(request.headers.referer, 500),
      },
    });

    return sendJson(
      response,
      202,
      { requestId, ok: true, stored: true, storage: result.storage, submissionId: result.submission.id },
      includeBody,
      'no-store'
    );
  } catch (error) {
    console.error('[route-photo-submission] request failed', { requestId, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Failed to store photo submission.' },
      includeBody,
      'no-store'
    );
  }
}

async function handleRouteCommunity(
  _request: Parameters<typeof createServer>[0],
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
  slug: string
) {
  try {
    const community = await getApprovedCommunityForRoute(slug);
    return sendJson(response, 200, { requestId, riverSlug: slug, ...community }, includeBody, 'no-store');
  } catch (error) {
    console.error('[route-community] request failed', { requestId, slug, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Failed to load route community content.' },
      includeBody,
      'no-store'
    );
  }
}

async function handleCommunityPhoto(
  _request: Parameters<typeof createServer>[0],
  response: ServerResponse,
  requestId: string,
  slug: string,
  submissionId: string,
  fileName: string
) {
  try {
    const asset = await readApprovedCommunityPhoto(slug, submissionId, fileName);
    if (!asset) {
      return sendJson(response, 404, { requestId, error: 'not_found', message: 'Photo not found.' }, true, 'no-store');
    }

    return sendBinary(response, 200, asset.buffer, asset.contentType || contentTypeFor(fileName), 'public, max-age=3600');
  } catch (error) {
    console.error('[route-community] photo request failed', { requestId, slug, submissionId, fileName, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Failed to load photo.' },
      true,
      'no-store'
    );
  }
}

async function handleAdminSessionStatus(
  request: Parameters<typeof createServer>[0],
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

async function handleAdminSessionCreate(
  request: Parameters<typeof createServer>[0],
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

async function handleAdminLogout(response: ServerResponse, requestId: string, includeBody: boolean) {
  response.setHeader('set-cookie', clearAdminSessionCookie());
  return sendJson(response, 200, { requestId, ok: true, authenticated: false }, includeBody, 'no-store');
}

async function handleAdminContributionList(
  request: Parameters<typeof createServer>[0],
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

async function handleAdminRouteRequestList(
  request: Parameters<typeof createServer>[0],
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
      502,
      { requestId, error: 'request_failed', message: 'Could not load route requests.' },
      includeBody,
      'no-store'
    );
  }
}

async function handleAdminStats(
  request: Parameters<typeof createServer>[0],
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

async function handleAdminContributionReview(
  request: Parameters<typeof createServer>[0],
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

async function handleAdminContributionFile(
  request: Parameters<typeof createServer>[0],
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

async function handleRiverAlertCreate(
  request: Parameters<typeof createServer>[0],
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
    const riverSlug = clean(body?.riverSlug, 160);
    const threshold = parseRiverAlertThreshold(body?.threshold);
    const honeypot = clean(body?.company, 240);

    if (honeypot) {
      return sendJson(response, 202, { requestId, ok: true, stored: false }, includeBody, 'no-store');
    }

    if (!email || !riverSlug || !threshold) {
      return sendJson(
        response,
        400,
        { requestId, error: 'missing_required_fields', message: 'Missing required alert fields.' },
        includeBody,
        'no-store'
      );
    }

    if (!isValidEmail(email)) {
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
        },
      },
      includeBody,
      'no-store'
    );
  } catch (error) {
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

async function handleRiverAlertUnsubscribe(
  request: Parameters<typeof createServer>[0],
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

async function handleHistorySnapshot(
  request: Parameters<typeof createServer>[0],
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  if (!requestHasRefreshToken(request, process.env.HISTORY_SNAPSHOT_TOKEN)) {
    return sendJson(
      response,
      401,
      {
        requestId,
        error: 'unauthorized',
        message: 'Missing or invalid history snapshot token.',
      },
      includeBody,
      'no-store'
    );
  }

  const results = await getAllRiverScores();
  const captured = await captureHistorySnapshotForResults({ results });

  return sendJson(
    response,
    200,
    {
      requestId,
      ok: true,
      captured,
    },
    includeBody,
    'no-store'
  );
}

async function handleRiverSnapshotRefresh(
  request: Parameters<typeof createServer>[0],
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  const configuredToken = clean(process.env.SNAPSHOT_REFRESH_TOKEN || process.env.HISTORY_SNAPSHOT_TOKEN, 240);
  if (!requestHasRefreshToken(request, configuredToken)) {
    return sendJson(
      response,
      401,
      {
        requestId,
        error: 'unauthorized',
        message: 'Missing or invalid snapshot refresh token.',
      },
      includeBody,
      'no-store'
    );
  }

  const results = await getAllRiverScores();
  const captured = await captureRiverSnapshots({ results });

  return sendJson(
    response,
    200,
    {
      requestId,
      ok: true,
      captured,
    },
    includeBody,
    'no-store'
  );
}

async function readJsonBody(request: Parameters<typeof createServer>[0]) {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) {
    return {};
  }

  return JSON.parse(raw);
}

function requestHasRefreshToken(
  request: Parameters<typeof createServer>[0],
  configuredToken: string
) {
  const providedToken =
    clean(request.headers['x-history-token'], 240) ||
    clean(request.headers.authorization?.replace(/^Bearer\s+/i, ''), 240);

  if (!configuredToken) {
    return true;
  }

  return providedToken === configuredToken;
}

function clean(value: unknown, max = 5000) {
  return String(value || '').trim().slice(0, max);
}

function sanitizeFileSegment(value: string, fallback = 'file') {
  const normalized = clean(value, 120)
    .toLowerCase()
    .replace(/\.[a-z0-9]{2,5}$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || fallback;
}

function isSupportedPhotoMime(value: string) {
  return value === 'image/jpeg' || value === 'image/png' || value === 'image/webp';
}

function extensionForPhotoMime(value: string) {
  switch (value) {
    case 'image/png':
      return '.png';
    case 'image/webp':
      return '.webp';
    case 'image/jpeg':
    default:
      return '.jpg';
  }
}

function decodeImageDataUrl(value: string) {
  const match = value.match(/^data:(image\/(?:jpeg|png|webp));base64,([a-z0-9+/=]+)$/i);
  if (!match) {
    return null;
  }

  try {
    return {
      mimeType: match[1].toLowerCase(),
      buffer: Buffer.from(match[2], 'base64'),
    };
  } catch {
    return null;
  }
}

function getIp(request: Parameters<typeof createServer>[0]) {
  const forwardedFor = clean(request.headers['x-forwarded-for'], 240);
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return clean(request.headers['x-client-ip'], 240) || 'unknown';
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const previous = rateByIp.get(ip) || [];
  const recent = previous.filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  recent.push(now);
  rateByIp.set(ip, recent);
  return recent.length > RATE_MAX;
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
