import type { ServerResponse } from 'node:http';
import { gunzipSync } from 'node:zlib';
import { describe, expect, it, vi } from 'vitest';
import { sendBinary, sendEmpty, sendJson } from './http';

function mockResponse() {
  return {
    writeHead: vi.fn(),
    end: vi.fn(),
  } as unknown as ServerResponse;
}

describe('server response helpers', () => {
  it('returns the response after sending JSON so route dispatch can stop', () => {
    const response = mockResponse();

    const result = sendJson(response, 200, { requestId: 'req_test', ok: true });

    expect(result).toBe(response);
  });

  it('compresses larger JSON responses when the client accepts gzip', () => {
    const response = {
      req: { headers: { 'accept-encoding': 'gzip, deflate' } },
      writeHead: vi.fn(),
      end: vi.fn(),
    } as unknown as ServerResponse;
    const payload = { requestId: 'req_gzip', value: 'river '.repeat(500) };

    sendJson(response, 200, payload);

    expect(response.writeHead).toHaveBeenCalledWith(200, expect.objectContaining({
      'content-encoding': 'gzip',
      vary: 'Accept-Encoding',
    }));
    const compressed = vi.mocked(response.end).mock.calls[0]?.[0] as Buffer;
    expect(JSON.parse(gunzipSync(compressed).toString('utf8'))).toEqual(payload);
  });

  it('returns the response after sending empty responses so route dispatch can stop', () => {
    const response = mockResponse();

    const result = sendEmpty(response, 204, {});

    expect(result).toBe(response);
  });

  it.each(['gzip;q=0', '*;q=1, gzip;q=0', 'br', '', 'gzip;q=invalid', 'not-gzip'])('preserves plain JSON and cache variation for %s', (encoding) => {
    const response = Object.assign(mockResponse(), { req: { headers: { 'accept-encoding': encoding } } });
    const payload = { value: 'river '.repeat(500) };
    sendJson(response, 200, payload);
    const headers = vi.mocked(response.writeHead).mock.calls[0][1] as Record<string, unknown>;
    expect(headers['content-encoding']).toBeUndefined();
    expect(headers.vary).toBe('Accept-Encoding');
    expect(JSON.parse((vi.mocked(response.end).mock.calls[0][0] as Buffer).toString())).toEqual(payload);
  });

  it.each(['GZIP; Q=0.5', '*;q=0.8', '*;q=0, gzip;q=1'])('negotiates compressed HEAD headers for %s', (encoding) => {
    const response = Object.assign(mockResponse(), { req: { headers: { 'accept-encoding': encoding } } });
    sendJson(response, 200, { value: 'river '.repeat(500) }, false);
    expect(response.writeHead).toHaveBeenCalledWith(200, expect.objectContaining({ 'content-encoding': 'gzip', vary: 'Accept-Encoding' }));
    expect(response.end).toHaveBeenCalledWith(undefined);
  });

  it('adds baseline browser security headers to API responses', () => {
    const response = mockResponse();

    sendJson(response, 200, { requestId: 'req_headers', ok: true });

    expect(response.writeHead).toHaveBeenCalledWith(200, expect.objectContaining({
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'strict-origin-when-cross-origin',
      'permissions-policy': 'geolocation=(self), microphone=(), camera=()',
    }));
  });

  it('adds HSTS when the API is running in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    try {
      const response = mockResponse();
      sendJson(response, 200, { requestId: 'req_hsts', ok: true });
      expect(response.writeHead).toHaveBeenCalledWith(200, expect.objectContaining({
        'strict-transport-security': 'max-age=31536000; includeSubDomains',
      }));
    } finally {
      vi.unstubAllEnvs();
    }
  });

  it('preserves headers while omitting the body for HEAD responses', () => {
    const response = mockResponse();
    const result = sendBinary(response, 200, Buffer.from('gpx'), 'application/gpx+xml', 'no-store', false, {
      'content-disposition': 'attachment; filename="route.gpx"',
      'x-request-id': 'req_binary',
    });

    expect(result).toBe(response);
    expect(response.writeHead).toHaveBeenCalledWith(200, expect.objectContaining({
      'content-type': 'application/gpx+xml',
      'content-disposition': 'attachment; filename="route.gpx"',
      'x-request-id': 'req_binary',
    }));
    expect(response.end).toHaveBeenCalledWith(undefined);
  });
});
