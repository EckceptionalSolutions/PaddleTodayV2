import { describe, expect, it, vi } from 'vitest';
import { ensureWorkersSubdomain } from './account-subdomain.mjs';
const accountId = 'c8681e05144a6862baf7fbd582f6dbcc', subdomain = 'paddletoday-c8681e05';
const response = (body: any, status = 200) => new Response(JSON.stringify(body), { status });
describe('Workers account onboarding', () => {
  it('preserves an existing account subdomain without writes', async () => {
    const fetchImpl = vi.fn(async () => response({ success: true, result: { subdomain: 'existing-account' } }));
    expect(await ensureWorkersSubdomain({ accountId, token: 'fixture', fetchImpl })).toEqual({ subdomain: 'existing-account', created: false });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
  it.each([400, 404])('registers only a confirmed absent subdomain and verifies readback (HTTP %i)', async status => {
    const fetchImpl = vi.fn().mockResolvedValueOnce(response({ success: false, errors: [{ code: 10007 }] }, status))
      .mockResolvedValueOnce(response({ success: true, result: { subdomain } }))
      .mockResolvedValueOnce(response({ success: true, result: { subdomain } }));
    expect(await ensureWorkersSubdomain({ accountId, token: 'fixture', fetchImpl })).toEqual({ subdomain, created: true });
    expect(fetchImpl.mock.calls.map(([, options]) => options.method)).toEqual(['GET', 'PUT', 'GET']);
    expect(JSON.parse(fetchImpl.mock.calls[1][1].body)).toEqual({ subdomain });
  });
  it.each([response({ success: false, errors: [{ code: 10000 }] }, 403),
    response({ success: true, result: {} }), response({ success: false, errors: [{ code: 10007 }] }, 403)])(
    'refuses to register after permission or malformed-response failures', async result => {
      const fetchImpl = vi.fn(async () => result);
      await expect(ensureWorkersSubdomain({ accountId, token: 'fixture', fetchImpl })).rejects.toThrow('no account change');
      expect(fetchImpl).toHaveBeenCalledTimes(1);
    });
});
