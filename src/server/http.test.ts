import type { ServerResponse } from 'node:http';
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

  it('returns the response after sending empty responses so route dispatch can stop', () => {
    const response = mockResponse();

    const result = sendEmpty(response, 204, {});

    expect(result).toBe(response);
  });
});
