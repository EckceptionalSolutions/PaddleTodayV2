import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { ServerResponse } from 'node:http';
import type { ApiRequest } from '../http';
import { clean, readJsonBody, sendBodyLimitResponse, sendJson } from '../http';
import { getIp, isRateLimited } from '../rate-limit';

export async function handleRiverRequest(
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
    const bodyLimitResponse = sendBodyLimitResponse(error, response, requestId, includeBody);
    if (bodyLimitResponse) return bodyLimitResponse;

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
