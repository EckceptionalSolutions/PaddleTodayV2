import { Readable } from 'node:stream';
import type { ServerResponse } from 'node:http';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { InvalidJsonBodyError, RequestBodyTooLargeError, readJsonBody, sendRequestBodyErrorResponse, type ApiRequest } from './http';
import { handleRiverRequest } from './routes/route-requests';
import { handleAppFeedback } from './routes/feedback';
import { handleRiverAlertCreate, handleRiverAlertUnsubscribe } from './routes/alerts';
import { handleAreaNotificationCreate, handleAreaNotificationPatch } from './routes/area-notifications';
import { handleRoutePhotoSubmission } from './routes/route-contributions';

afterEach(() => vi.unstubAllEnvs());

function request(chunks: string[]): ApiRequest {
  return Object.assign(Readable.from(chunks), { headers: {}, socket: { remoteAddress: 'qa-invalid-body' } }) as unknown as ApiRequest;
}

function response(): ServerResponse {
  return { writeHead: vi.fn(), end: vi.fn() } as unknown as ServerResponse;
}

describe('JSON request body failures', () => {
  it('distinguishes malformed JSON from other request errors', async () => {
    await expect(readJsonBody(request(['{"routeName":']))).rejects.toBeInstanceOf(InvalidJsonBodyError);
    expect(sendRequestBodyErrorResponse(new Error('storage failure'), response(), 'qa', true)).toBeNull();
  });

  it('retains valid chunked JSON and empty-body behavior', async () => {
    await expect(readJsonBody(request(['{"route', 'Name":"Creek"}']))).resolves.toEqual({ routeName: 'Creek' });
    await expect(readJsonBody(request(['  ']))).resolves.toEqual({});
  });

  it('retains the separate body-size failure', async () => {
    await expect(readJsonBody(request(['12345']), 4)).rejects.toBeInstanceOf(RequestBodyTooLargeError);
    const target = response();
    sendRequestBodyErrorResponse(new RequestBodyTooLargeError(4), target, 'qa', false);
    expect(target.writeHead).toHaveBeenCalledWith(413, expect.objectContaining({ 'cache-control': 'no-store' }));
    expect(target.end).toHaveBeenCalledWith(undefined);
  });

  it.each([['route request', handleRiverRequest], ['feedback', handleAppFeedback], ['river alert', handleRiverAlertCreate], ['unsubscribe', handleRiverAlertUnsubscribe], ['nearby alert', handleAreaNotificationCreate], ['photo contribution', handleRoutePhotoSubmission]] as const)(
    'returns a noncached 400 for malformed %s input before storage', async (_label, handler) => {
      vi.stubEnv('AREA_NOTIFICATIONS_ENABLED', 'true');
      const target = response();
      await handler(request(['{"invalid":']), target, 'qa-invalid-json', true);
      expect(target.writeHead).toHaveBeenCalledWith(400, expect.objectContaining({ 'cache-control': 'no-store' }));
      const body = vi.mocked(target.end).mock.calls[0][0] as Buffer;
      expect(JSON.parse(body.toString())).toMatchObject({ error: 'invalid_json', requestId: 'qa-invalid-json' });
    },
  );
  it('rejects a malformed nearby-alert update before looking up a subscription', async () => {
    vi.stubEnv('AREA_NOTIFICATIONS_ENABLED', 'true');
    const target = response();
    await handleAreaNotificationPatch(request(['{']), target, 'qa-update', true, 'qa-missing');
    expect(target.writeHead).toHaveBeenCalledWith(400, expect.objectContaining({ 'cache-control': 'no-store' }));
  });

});
