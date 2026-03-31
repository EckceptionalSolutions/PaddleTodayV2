import { createServer, type ServerResponse } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { serializeDetailResult, serializeRiverGroupResult, serializeSummaryResult } from '../lib/api-contract';
import { getAllRiverScores, getRiverGroupScores, getRiverScore, listRivers } from '../lib/rivers';
import { getCacheStats } from '../lib/server-cache';

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
      const rivers = (await getAllRiverScores()).map(serializeSummaryResult);
      return sendJson(response, 200, {
        requestId,
        generatedAt: new Date().toISOString(),
        riverCount: rivers.length,
        rivers,
      }, includeBody);
    }

    const detailMatch = requestUrl.pathname.match(/^\/api\/rivers\/([^/]+)\.json$/);
    if (detailMatch) {
      const slug = decodeURIComponent(detailMatch[1] || '');
      const result = await getRiverScore(slug);

      if (!result) {
        return sendJson(response, 404, {
          requestId,
          error: 'not_found',
        }, includeBody);
      }

      return sendJson(response, 200, {
        requestId,
        generatedAt: new Date().toISOString(),
        result: serializeDetailResult(result),
      }, includeBody);
    }

    const groupMatch = requestUrl.pathname.match(/^\/api\/river-groups\/([^/]+)\.json$/);
    if (groupMatch) {
      const riverId = decodeURIComponent(groupMatch[1] || '');
      const results = await getRiverGroupScores(riverId);

      if (!results) {
        return sendJson(response, 404, {
          requestId,
          error: 'not_found',
        }, includeBody);
      }

      return sendJson(response, 200, {
        requestId,
        generatedAt: new Date().toISOString(),
        result: serializeRiverGroupResult({
          riverId,
          routes: results,
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

    if (!containerSas) {
      console.error('[river-request] missing ROUTE_REQUESTS_CONTAINER_SAS_URL');
      return sendJson(
        response,
        500,
        { requestId, error: 'storage_not_configured', message: 'Storage is not configured.' },
        includeBody,
        'no-store'
      );
    }

    const stamp = Date.now();
    const rand = Math.random().toString(16).slice(2, 10);
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

function clean(value: unknown, max = 5000) {
  return String(value || '').trim().slice(0, max);
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
