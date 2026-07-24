import type { ServerResponse } from 'node:http';
import { gunzipSync } from 'node:zlib';
import { describe, expect, it, vi } from 'vitest';
import { sendEmpty, sendJson } from './http';

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
});
