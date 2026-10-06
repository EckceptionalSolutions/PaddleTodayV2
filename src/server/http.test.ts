import type { ServerResponse } from 'node:http';
import { gunzipSync } from 'node:zlib';
import { describe, expect, it, vi } from 'vitest';
import { sendBinary, sendEmpty, sendJson } from './http';
import { jsonCompression } from './json-response';

function mockResponse() {
  return {
    writeHead: vi.fn(),
    end: vi.fn(),
  } as unknown as ServerResponse;
}

describe('server response helpers', () => {
  it('uses small compressed bodies when identity is rejected', async () => {
    const response = Object.assign(mockResponse(), { req: { headers: { 'accept-encoding': 'gzip, identity;q=0' } } });
    sendJson(response, 200, { requestId: 'small' });
    await vi.waitFor(() => expect(response.end).toHaveBeenCalled());
    expect(JSON.parse(gunzipSync(vi.mocked(response.end).mock.calls[0][0] as Buffer).toString())).toEqual({ requestId: 'small' });
  });
  it('falls back to identity under pressure only when identity is accepted', async () => {
    const compress = vi.spyOn(jsonCompression, 'compress').mockResolvedValue(null);
    try {
      for (const encoding of ['gzip', 'gzip, identity;q=0']) {
        const response = Object.assign(mockResponse(), { req: { headers: { 'accept-encoding': encoding } } });
        sendJson(response, 200, { requestId: 'pressure', value: 'river '.repeat(500) });
        await vi.waitFor(() => expect(response.end).toHaveBeenCalled());
        expect(vi.mocked(response.writeHead).mock.calls[0][0]).toBe(encoding.includes('identity') ? 503 : 200);
      }
    } finally { compress.mockRestore(); }
  });
  it('rejects an encoding request that allows neither supported representation', () => {
    const response = Object.assign(mockResponse(), { req: { headers: { 'accept-encoding': 'br, gzip;q=0, identity;q=0' } } });
    sendJson(response, 200, { requestId: 'not-acceptable' });
    expect(response.writeHead).toHaveBeenCalledWith(406, expect.objectContaining({ vary: 'Accept-Encoding', 'cache-control': 'no-store' }));
  });
  it('does not write a compressed result to a disconnected client', async () => {
    const response = Object.assign(mockResponse(), { destroyed: true, req: { headers: { 'accept-encoding': 'gzip' } } });
    sendJson(response, 200, { value: 'river '.repeat(500) });
    await vi.waitFor(() => expect(jsonCompression.stats().active).toBe(0));
    expect(response.writeHead).not.toHaveBeenCalled();
  });
  it('reports the same compressed representation length for GET and HEAD of the same payload', async () => {
    const payload = { requestId: 'same-id', rivers: ['river '.repeat(2000)] };
    const get = Object.assign(mockResponse(), { req: { headers: { 'accept-encoding': 'gzip' } } });
    const head = Object.assign(mockResponse(), { req: { headers: { 'accept-encoding': 'gzip' } } });
    sendJson(get, 200, payload, true, 'public, max-age=30', {}, { immutableFields: ['rivers'] });
    sendJson(head, 200, payload, false, 'public, max-age=30', {}, { immutableFields: ['rivers'] });
    await vi.waitFor(() => expect(head.end).toHaveBeenCalled());
    await vi.waitFor(() => expect(get.end).toHaveBeenCalled());
    const headers = vi.mocked(head.writeHead).mock.calls[0][1] as Record<string, unknown>;
    expect(headers['content-length']).toBe((vi.mocked(get.end).mock.calls[0][0] as Buffer).length);
    expect(head.end).toHaveBeenCalledWith(undefined);
  });
  it('returns the response after sending JSON so route dispatch can stop', () => {
    const response = mockResponse();

    const result = sendJson(response, 200, { requestId: 'req_test', ok: true });

    expect(result).toBe(response);
  });

  it('compresses larger JSON responses when the client accepts gzip without blocking dispatch', async () => {
    const response = {
      req: { headers: { 'accept-encoding': 'gzip, deflate' } },
      writeHead: vi.fn(),
      end: vi.fn(),
    } as unknown as ServerResponse;
    const payload = { requestId: 'req_gzip', value: 'river '.repeat(500) };

    sendJson(response, 200, payload);
    expect(response.writeHead).not.toHaveBeenCalled();
    await vi.waitFor(() => expect(response.end).toHaveBeenCalled());

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

  it.each(['GZIP; Q=0.5', '*;q=0.8', '*;q=0, gzip;q=1'])('negotiates compressed HEAD headers for %s', async (encoding) => {
    const response = Object.assign(mockResponse(), { req: { headers: { 'accept-encoding': encoding } } });
    sendJson(response, 200, { value: 'river '.repeat(500) }, false);
    await vi.waitFor(() => expect(response.end).toHaveBeenCalled());
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
