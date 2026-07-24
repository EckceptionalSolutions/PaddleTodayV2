import { type IncomingMessage, type ServerResponse } from 'node:http';
import { gzipSync } from 'node:zlib';

const DEFAULT_JSON_BODY_LIMIT_BYTES = 1 * 1024 * 1024;
const JSON_COMPRESSION_THRESHOLD_BYTES = 1024;

export type ApiRequest = IncomingMessage;

export class RequestBodyTooLargeError extends Error {
  constructor(readonly limitBytes: number) {
    super(`Request body exceeds ${limitBytes} bytes.`);
    this.name = 'RequestBodyTooLargeError';
  }
}

export function sendJson(
  response: ServerResponse,
  status: number,
  payload: unknown,
  includeBody = true,
  cacheControl = 'public, max-age=30, stale-while-revalidate=120'
) {
  const body = JSON.stringify(payload);
  const bodyBuffer = Buffer.from(body);
  const acceptsGzip = /\bgzip\b/i.test(String(response.req?.headers['accept-encoding'] ?? ''));
  const compressedBody = acceptsGzip && bodyBuffer.length >= JSON_COMPRESSION_THRESHOLD_BYTES
    ? gzipSync(bodyBuffer)
    : null;
  const responseBody = compressedBody ?? bodyBuffer;
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': cacheControl,
    'content-length': responseBody.length,
    ...(compressedBody ? { 'content-encoding': 'gzip', vary: 'Accept-Encoding' } : {}),
    'x-request-id': requestIdFromPayload(payload),
    'access-control-allow-origin': '*',
  });
  response.end(includeBody ? responseBody : undefined);
  return response;
}

export function sendEmpty(response: ServerResponse, status: number, headers: Record<string, string>) {
  response.writeHead(status, headers);
  response.end();
  return response;
}

export function sendBinary(response: ServerResponse, status: number, payload: Buffer, contentType: string, cacheControl = 'no-store') {
  response.writeHead(status, {
    'content-type': contentType,
    'content-length': payload.length,
    'cache-control': cacheControl,
    'access-control-allow-origin': '*',
  });
  response.end(payload);
  return response;
}

export function requestIdFromPayload(payload: unknown): string {
  if (payload && typeof payload === 'object' && 'requestId' in payload) {
    const requestId = payload.requestId;
    if (typeof requestId === 'string') {
      return requestId;
    }
  }

  return 'unknown';
}

export async function readJsonBody(
  request: ApiRequest,
  limitBytes = DEFAULT_JSON_BODY_LIMIT_BYTES
) {
  const chunks: Buffer[] = [];
  let totalBytes = 0;

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    totalBytes += buffer.length;
    if (totalBytes > limitBytes) {
      throw new RequestBodyTooLargeError(limitBytes);
    }

    chunks.push(buffer);
  }

  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) {
    return {};
  }

  return JSON.parse(raw);
}

export function clean(value: unknown, max = 5000) {
  return String(value || '').trim().slice(0, max);
}

export function sendBodyLimitResponse(
  error: unknown,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  if (!(error instanceof RequestBodyTooLargeError)) {
    return null;
  }

  return sendJson(
    response,
    413,
    {
      requestId,
      error: 'request_body_too_large',
      message: 'This submission is too large. Try fewer or smaller photos.',
    },
    includeBody,
    'no-store'
  );
}
