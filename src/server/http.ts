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

export class InvalidJsonBodyError extends Error {
  constructor() {
    super('Request body is not valid JSON.');
    this.name = 'InvalidJsonBodyError';
  }
}

export function sendJson(
  response: ServerResponse,
  status: number,
  payload: unknown,
  includeBody = true,
  cacheControl = 'public, max-age=30, stale-while-revalidate=120',
  extraHeaders: Record<string, string> = {}
) {
  const body = JSON.stringify(payload);
  const bodyBuffer = Buffer.from(body);
  const acceptsGzip = acceptsGzipEncoding(String(response.req?.headers['accept-encoding'] ?? ''));
  const compressedBody = acceptsGzip && bodyBuffer.length >= JSON_COMPRESSION_THRESHOLD_BYTES
    ? gzipSync(bodyBuffer)
    : null;
  const responseBody = compressedBody ?? bodyBuffer;
  response.writeHead(status, {
    ...securityHeaders(response),
    'content-type': 'application/json; charset=utf-8',
    'cache-control': cacheControl,
    'content-length': responseBody.length,
    ...(bodyBuffer.length >= JSON_COMPRESSION_THRESHOLD_BYTES ? { vary: 'Accept-Encoding' } : {}),
    ...(compressedBody ? { 'content-encoding': 'gzip' } : {}),
    'x-request-id': requestIdFromPayload(payload),
    'access-control-allow-origin': '*',
    ...extraHeaders,
  });
  response.end(includeBody ? responseBody : undefined);
  return response;
}

function acceptsGzipEncoding(header: string): boolean {
  let wildcard = false;
  for (const entry of header.split(',')) {
    const [rawName, ...parameters] = entry.trim().toLowerCase().split(';');
    const name = rawName.trim();
    if (name !== 'gzip' && name !== '*') continue;
    const qualityParameter = parameters.map((part) => part.trim()).find((part) => /^q\s*=/.test(part));
    const quality = qualityParameter === undefined ? 1 : Number(qualityParameter.split('=')[1]?.trim());
    const accepted = Number.isFinite(quality) && quality > 0 && quality <= 1;
    if (name === 'gzip') return accepted;
    wildcard = accepted;
  }
  return wildcard;
}

export function sendEmpty(response: ServerResponse, status: number, headers: Record<string, string>) {
  response.writeHead(status, { ...securityHeaders(response), ...headers });
  response.end();
  return response;
}

export function sendBinary(
  response: ServerResponse,
  status: number,
  payload: Buffer,
  contentType: string,
  cacheControl = 'no-store',
  includeBody = true,
  extraHeaders: Record<string, string> = {},
) {
  response.writeHead(status, {
    ...securityHeaders(response),
    'content-type': contentType,
    'content-length': payload.length,
    'cache-control': cacheControl,
    'access-control-allow-origin': '*',
    ...extraHeaders,
  });
  response.end(includeBody ? payload : undefined);
  return response;
}

export function securityHeaders(response: ServerResponse): Record<string, string> {
  const forwardedProto = String(response.req?.headers['x-forwarded-proto'] ?? '')
    .split(',')[0]
    .trim()
    .toLowerCase();
  const isTls = process.env.NODE_ENV === 'production' || forwardedProto === 'https';
  return {
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'strict-origin-when-cross-origin',
    // Nearby-route controls need same-origin location access; the browser still
    // asks for permission. Embedded third-party pages do not inherit access.
    'permissions-policy': 'geolocation=(self), microphone=(), camera=()',
    ...(isTls ? { 'strict-transport-security': 'max-age=31536000; includeSubDomains' } : {}),
  };
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

  try {
    return JSON.parse(raw);
  } catch {
    throw new InvalidJsonBodyError();
  }
}

export function clean(value: unknown, max = 5000) {
  return String(value || '').trim().slice(0, max);
}

export function sendRequestBodyErrorResponse(
  error: unknown,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  if (error instanceof InvalidJsonBodyError) {
    return sendJson(response, 400, {
      requestId,
      error: 'invalid_json',
      message: 'This submission could not be read. Please try again.',
    }, includeBody, 'no-store');
  }

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
