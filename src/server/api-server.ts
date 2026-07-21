import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { sendEmpty, sendJson } from './http';
import { createRequestId, readArgValue, shouldLogRequest } from './server-runtime';
import { resolvePublicAssetFile, resolveStaticFile, sendStatic } from './static-route';
import {
  handleHealth,
  handleReady,
  handleRiverDetail,
  handleRiverGroup,
  handleRiverHistory,
  handleRiverSummary,
  handleWeekendSummary,
} from './routes/public-rivers';
import { handleRiverRequest } from './routes/route-requests';
import { handleAppFeedback } from './routes/feedback';
import {
  handleCommunityPhoto,
  handleRouteCommunity,
  handleRoutePhotoSubmission,
} from './routes/route-contributions';
import {
  handleAdminContributionFile,
  handleAdminContributionList,
  handleAdminContributionReview,
  handleAdminLogout,
  handleAdminRouteAuditList,
  handleAdminRouteAuditUpdate,
  handleAdminRouteRequestList,
  handleAdminRouteRequestMarkReplied,
  handleAdminRouteRequestReply,
  handleAdminSessionCreate,
  handleAdminSessionStatus,
  handleAdminStats,
} from './routes/admin';
import { handleRiverAlertCreate, handleRiverAlertUnsubscribe } from './routes/alerts';
import { handleRiverGeometry } from './routes/river-geometry';
import { handleHistorySnapshot, handleRiverSnapshotRefresh } from './routes/snapshots';
import { decodeRouteRequestStorageKeyParam } from '../lib/route-request-storage-key';

const host = process.env.CANOE_API_HOST || '0.0.0.0';
const staticDirArg = readArgValue('--static');
const staticDir = staticDirArg ? resolve(process.cwd(), staticDirArg) : null;
const publicDir = resolve(process.cwd(), 'public');
const port = Number(
  readArgValue('--port') || process.env.CANOE_API_PORT || process.env.PORT || (staticDir ? 4321 : 4322)
);
const startedAt = Date.now();

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

  try {
    if (request.method === 'OPTIONS') {
      const optionsResponse = handleOptions(requestUrl.pathname, response);
      if (optionsResponse) return optionsResponse;
    }

    const writeResponse = await handleWriteRoutes(request, response, requestUrl, requestId, includeBody);
    if (writeResponse) return writeResponse;

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return sendJson(response, 405, { requestId, error: 'method_not_allowed' }, includeBody);
    }

    if (requestUrl.pathname === '/health' || requestUrl.pathname === '/api/health') {
      return handleHealth(response, requestId, includeBody, { staticDir, startedAt });
    }

    if (requestUrl.pathname === '/health/ready' || requestUrl.pathname === '/api/health/ready') {
      return handleReady(response, requestId, includeBody, staticDir);
    }

    if (requestUrl.pathname === '/api/rivers/summary.json') {
      return handleRiverSummary(response, requestId, includeBody);
    }

    if (requestUrl.pathname === '/api/weekend/summary.json') {
      return handleWeekendSummary(response, requestId, includeBody);
    }

    const detailMatch = requestUrl.pathname.match(/^\/api\/rivers\/([^/]+)\.json$/);
    if (detailMatch) {
      return handleRiverDetail(response, requestId, includeBody, decodeURIComponent(detailMatch[1] || ''));
    }

    const historyMatch = requestUrl.pathname.match(/^\/api\/rivers\/([^/]+)\/history\.json$/);
    if (historyMatch) {
      return handleRiverHistory(
        requestUrl,
        request,
        response,
        requestId,
        includeBody,
        decodeURIComponent(historyMatch[1] || '')
      );
    }

    const geometryMatch = requestUrl.pathname.match(/^\/api\/rivers\/([^/]+)\/geometry\.json$/);
    if (geometryMatch) {
      return handleRiverGeometry(
        response,
        requestId,
        includeBody,
        decodeURIComponent(geometryMatch[1] || ''),
      );
    }

    const groupMatch = requestUrl.pathname.match(/^\/api\/river-groups\/([^/]+)\.json$/);
    if (groupMatch) {
      return handleRiverGroup(response, requestId, includeBody, decodeURIComponent(groupMatch[1] || ''));
    }

    const riverCommunityMatch = requestUrl.pathname.match(/^\/api\/rivers\/([^/]+)\/community\.json$/);
    if (riverCommunityMatch) {
      return handleRouteCommunity(
        request,
        response,
        requestId,
        includeBody,
        decodeURIComponent(riverCommunityMatch[1])
      );
    }

    const communityPhotoMatch = requestUrl.pathname.match(/^\/api\/community-photos\/([^/]+)\/([^/]+)\/([^/]+)$/);
    if (communityPhotoMatch) {
      return handleCommunityPhoto(
        request,
        response,
        requestId,
        decodeURIComponent(communityPhotoMatch[1]),
        decodeURIComponent(communityPhotoMatch[2]),
        decodeURIComponent(communityPhotoMatch[3])
      );
    }

    const publicAsset = resolvePublicAssetFile(requestUrl.pathname, publicDir);
    if (publicAsset) {
      return sendStatic(response, publicAsset, includeBody);
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
    return sendJson(response, 502, { requestId, error: 'live_data_unavailable' }, includeBody);
  }
});

server.listen(port, host, () => {
  if (staticDir) {
    console.log(`canoe-adventures-v2 app+api listening on http://${host}:${port} using ${staticDir}`);
  } else {
    console.log(`canoe-adventures-v2 API listening on http://${host}:${port}`);
  }
});

function handleOptions(pathname: string, response: Parameters<typeof sendEmpty>[0]) {
  if (pathname === '/api/river-request' || pathname === '/api/route-request') {
    return sendCorsOptions(response, 'POST, OPTIONS', 'content-type, accept');
  }

  if (pathname === '/api/feedback') {
    return sendCorsOptions(response, 'POST, OPTIONS', 'content-type, accept');
  }

  if (pathname === '/api/route-contributions' || pathname === '/api/route-photo-submissions') {
    return sendCorsOptions(response, 'POST, OPTIONS', 'content-type, accept');
  }

  if (pathname === '/api/admin/session') {
    return sendCorsOptions(response, 'GET, POST, OPTIONS', 'content-type, accept');
  }

  if (pathname === '/api/alerts' || pathname === '/api/alerts/unsubscribe') {
    return sendCorsOptions(response, 'POST, OPTIONS', 'content-type, accept');
  }

  if (pathname === '/api/history/snapshot' || pathname === '/api/snapshots/refresh') {
    return sendCorsOptions(response, 'POST, OPTIONS', 'content-type, accept, authorization, x-history-token');
  }

  return null;
}

async function handleWriteRoutes(
  request: Parameters<typeof createServer>[0],
  response: Parameters<typeof sendEmpty>[0],
  requestUrl: URL,
  requestId: string,
  includeBody: boolean
) {
  const pathname = requestUrl.pathname;

  if ((pathname === '/api/river-request' || pathname === '/api/route-request') && request.method === 'POST') {
    return handleRiverRequest(request, response, requestId, includeBody);
  }

  if (pathname === '/api/feedback' && request.method === 'POST') {
    return handleAppFeedback(request, response, requestId, includeBody);
  }

  if ((pathname === '/api/route-contributions' || pathname === '/api/route-photo-submissions') && request.method === 'POST') {
    return handleRoutePhotoSubmission(request, response, requestId, includeBody);
  }

  if (pathname === '/api/admin/session' && request.method === 'GET') {
    return handleAdminSessionStatus(request, response, requestId, includeBody);
  }

  if (pathname === '/api/admin/session' && request.method === 'POST') {
    return handleAdminSessionCreate(request, response, requestId, includeBody);
  }

  if (pathname === '/api/admin/logout' && request.method === 'POST') {
    return handleAdminLogout(response, requestId, includeBody);
  }

  if (pathname === '/api/admin/route-contributions' && request.method === 'GET') {
    return handleAdminContributionList(request, response, requestId, includeBody);
  }

  if (pathname === '/api/admin/route-requests' && request.method === 'GET') {
    return handleAdminRouteRequestList(request, response, requestId, includeBody);
  }

  const adminRouteRequestReplyMatch = pathname.match(/^\/api\/admin\/route-requests\/(.+)\/reply$/);
  if (adminRouteRequestReplyMatch && request.method === 'POST') {
    return handleAdminRouteRequestReply(
      request,
      response,
      requestId,
      includeBody,
      decodeRouteRequestStorageKeyParam(adminRouteRequestReplyMatch[1])
    );
  }

  const adminRouteRequestMarkRepliedMatch = pathname.match(/^\/api\/admin\/route-requests\/(.+)\/mark-replied$/);
  if (adminRouteRequestMarkRepliedMatch && request.method === 'POST') {
    return handleAdminRouteRequestMarkReplied(
      request,
      response,
      requestId,
      includeBody,
      decodeRouteRequestStorageKeyParam(adminRouteRequestMarkRepliedMatch[1])
    );
  }

  if (pathname === '/api/admin/route-audits' && request.method === 'GET') {
    return handleAdminRouteAuditList(request, response, requestId, includeBody);
  }

  const adminRouteAuditMatch = pathname.match(/^\/api\/admin\/route-audits\/([^/]+)$/);
  if (adminRouteAuditMatch && request.method === 'POST') {
    return handleAdminRouteAuditUpdate(
      request,
      response,
      requestId,
      includeBody,
      decodeURIComponent(adminRouteAuditMatch[1])
    );
  }

  if (pathname === '/api/admin/stats' && request.method === 'GET') {
    return handleAdminStats(request, response, requestId, includeBody);
  }

  const adminContributionReviewMatch = pathname.match(/^\/api\/admin\/route-contributions\/([^/]+)\/review$/);
  if (adminContributionReviewMatch && request.method === 'POST') {
    return handleAdminContributionReview(
      request,
      response,
      requestId,
      includeBody,
      decodeURIComponent(adminContributionReviewMatch[1])
    );
  }

  const adminContributionFileMatch = pathname.match(/^\/api\/admin\/route-contributions\/files\/([^/]+)\/([^/]+)$/);
  if (adminContributionFileMatch && request.method === 'GET') {
    return handleAdminContributionFile(
      request,
      response,
      requestId,
      decodeURIComponent(adminContributionFileMatch[1]),
      decodeURIComponent(adminContributionFileMatch[2])
    );
  }

  if (pathname === '/api/alerts' && request.method === 'POST') {
    return handleRiverAlertCreate(request, response, requestId, includeBody);
  }

  if (pathname === '/api/alerts/unsubscribe' && request.method === 'POST') {
    return handleRiverAlertUnsubscribe(request, response, requestId, includeBody);
  }

  if (pathname === '/api/history/snapshot' && request.method === 'POST') {
    return handleHistorySnapshot(request, response, requestId, includeBody);
  }

  if (pathname === '/api/snapshots/refresh' && request.method === 'POST') {
    return handleRiverSnapshotRefresh(request, response, requestId, includeBody);
  }

  return null;
}

function sendCorsOptions(response: Parameters<typeof sendEmpty>[0], methods: string, headers: string) {
  return sendEmpty(response, 204, {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': methods,
    'access-control-allow-headers': headers,
    'access-control-max-age': '86400',
    'cache-control': 'no-store',
  });
}
