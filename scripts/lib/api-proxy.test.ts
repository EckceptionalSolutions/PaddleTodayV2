import { describe, expect, it, vi } from 'vitest';
import { API_ORIGIN, PROXY_VERSION, proxyApi } from '../../infra/cloudflare/api-proxy.mjs';
import worker from '../../infra/cloudflare/frontend-worker.mjs';

describe('same-origin API proxy', () => {
  it('serves a missed static request through the asset binding without an API dependency', async () => {
    const assets = { fetch: vi.fn(async () => new Response('static page')) };
    const response = await worker.fetch(new Request('https://paddletoday.com/explore/'), { ASSETS: assets });
    expect(await response.text()).toBe('static page'); expect(assets.fetch).toHaveBeenCalledTimes(1);
  });
  it('pins the upstream and preserves path/query while ignoring client-selected destinations', async () => {
    const upstream = vi.fn(async () => new Response('{}', { headers: { 'cache-control': 'public, max-age=60' } }));
    const response = await proxyApi(new Request('https://paddletoday.com/api/rivers/summary.json?target=https://evil.test&days=7',
      { headers: { host: 'evil.test', 'x-forwarded-host': 'evil.test', 'x-forwarded-for': 'fake', 'cf-connecting-ip': '192.0.2.1' } }), upstream);
    const request = upstream.mock.calls[0][0];
    expect(request.url).toBe(API_ORIGIN + '/api/rivers/summary.json?target=https://evil.test&days=7');
    expect(request.headers.has('host')).toBe(false);
    expect(request.headers.get('x-forwarded-host')).toBe('paddletoday.com');
    expect(request.headers.get('x-forwarded-for')).toBe('192.0.2.1');
    expect(upstream.mock.calls[0][1]).toEqual({ redirect: 'manual', cache: 'no-store' });
    expect(response.headers.get('cache-control')).toBe('public, max-age=60');
    expect(response.headers.get('x-paddletoday-api-proxy')).toBe(PROXY_VERSION);
  });

  it('streams credentials, cookies, CSRF origin, and a mutation body exactly once', async () => {
    const upstream = vi.fn(async request => {
      expect(request.method).toBe('POST'); expect(await request.text()).toBe('{"title":"Test trip"}');
      expect(request.headers.get('authorization')).toBe('Bearer fixture-only');
      expect(request.headers.get('cookie')).toBe('session=fixture');
      expect(request.headers.get('origin')).toBe('https://paddletoday.com');
      expect(request.headers.get('content-type')).toBe('application/json');
      return new Response('created', { status: 201, headers: { 'set-cookie': 'session=fixture; Secure; HttpOnly; Path=/', 'cache-control': 'public, max-age=3600' } });
    });
    const response = await proxyApi(new Request('https://paddletoday.com/api/trips', { method: 'POST', body: '{"title":"Test trip"}',
      headers: { authorization: 'Bearer fixture-only', cookie: 'session=fixture', origin: 'https://paddletoday.com', 'content-type': 'application/json' } }), upstream);
    expect(upstream).toHaveBeenCalledTimes(1); expect(response.status).toBe(201);
    expect(response.headers.get('set-cookie')).toContain('HttpOnly');
    expect(response.headers.get('cache-control')).toBe('private, no-store');
    expect(response.headers.get('cloudflare-cdn-cache-control')).toBe('no-store');
  });

  it('does not follow upstream redirects or forward credentials to the redirect target', async () => {
    const upstream = vi.fn(async () => new Response(null, { status: 307, headers: { location: 'https://external.test/sign-in' } }));
    const response = await proxyApi(new Request('https://paddletoday.com/api/account', { headers: { authorization: 'Bearer fixture-only' } }), upstream);
    expect(upstream).toHaveBeenCalledTimes(1); expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('https://external.test/sign-in');
    expect(response.headers.get('cache-control')).toBe('private, no-store');
  });

  it('rewrites same-upstream redirects to the public origin and preserves HEAD/OPTIONS behavior', async () => {
    const redirect = await proxyApi(new Request('https://www.paddletoday.com/api/health', { method: 'HEAD' }),
      async () => new Response(null, { status: 301, headers: { location: API_ORIGIN + '/api/health/ready?check=1' } }));
    expect(redirect.headers.get('location')).toBe('https://www.paddletoday.com/api/health/ready?check=1');
    expect(await redirect.text()).toBe('');
    const options = await proxyApi(new Request('https://paddletoday.com/api/account', { method: 'OPTIONS' }),
      async request => { expect(request.method).toBe('OPTIONS'); return new Response(null, { status: 204,
        headers: { 'access-control-allow-headers': 'authorization,content-type' } }); });
    expect(options.status).toBe(204); expect(options.headers.get('access-control-allow-headers')).toContain('authorization');
  });

  it('does not proxy frontend, lookalike prefixes, or encoded path escapes', async () => {
    const upstream = vi.fn();
    for (const path of ['/', '/account/', '/apiculture', '/api/../account', '/api/%2e%2e/account']) {
      expect((await proxyApi(new Request('https://paddletoday.com' + path), upstream)).status).toBe(404);
    }
    expect(upstream).not.toHaveBeenCalled();
  });

  it('returns one bounded error without leaking upstream exceptions or retrying mutations', async () => {
    const upstream = vi.fn(async () => { throw new Error('private diagnostic fixture'); });
    const response = await proxyApi(new Request('https://paddletoday.com/api/trips', { method: 'POST', body: '{}' }), upstream);
    expect(response.status).toBe(502); expect(await response.text()).toBe('{"error":"upstream_unavailable"}');
    expect(upstream).toHaveBeenCalledTimes(1);
  });

  it('prevents caching private or credentialed GETs even with incorrect public origin headers', async () => {
    for (const [path, headers] of [['/api/trips', {}], ['/api/rivers/summary.json', { authorization: 'Bearer fixture-only' }],
      ['/api/rivers/summary.json', { cookie: 'session=fixture' }], ['/api/admin/session', {}]] as const) {
      const response = await proxyApi(new Request('https://paddletoday.com' + path, { headers }),
        async () => new Response('{}', { headers: { 'cache-control': 'public, max-age=3600', expires: 'Wed, 31 Dec 2030 12:00:00 GMT' } }));
      expect(response.headers.get('cache-control')).toBe('private, no-store'); expect(response.headers.has('expires')).toBe(false);
    }
  });
});
