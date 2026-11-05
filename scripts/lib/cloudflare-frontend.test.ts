import { describe, expect, it } from 'vitest';
import { translateStaticConfig } from './cloudflare-frontend.mjs';
describe('static frontend migration', () => {
  it('excludes the canary from indexing while preserving production indexability', () => {
    const config = { globalHeaders: { 'X-Content-Type-Options': 'nosniff' } };
    expect(translateStaticConfig(config, { noIndex: true }).headers).toContain('X-Robots-Tag: noindex, nofollow');
    expect(translateStaticConfig(config).headers).not.toContain('X-Robots-Tag');
    expect(config.globalHeaders).toEqual({ 'X-Content-Type-Options': 'nosniff' });
  });
  it('preserves security headers, redirects, fragments, and clean HTML rewrites', () => {
    const result = translateStaticConfig({ globalHeaders: { 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload' },
      routes: [{ route: '/gallery/*', redirect: 'https://assets.test/legacy/gallery/{*path}', statusCode: 302 },
        { route: '/old-trip', redirect: '/rivers/current/#trip-example', statusCode: 301 },
        { route: '/rivers/current', rewrite: '/rivers/current/index.html' },
        { route: '/.well-known/*', headers: { 'Content-Type': 'application/json' } }],
      responseOverrides: { '404': { rewrite: '/404.html', statusCode: 404 } } });
    expect(result.redirects).toBe('/old-trip /rivers/current/#trip-example 301\n/old-trip/ /rivers/current/#trip-example 301\n/gallery/* https://assets.test/legacy/gallery/:splat 302\n');
    expect(result.headers).toContain('/*\n  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
    expect(result.headers).toContain('/.well-known/*\n  Content-Type: application/json');
  });
  it.each([
    { navigationFallback: { rewrite: '/index.html' } },
    { routes: [{ route: '/private', allowedRoles: ['authenticated'] }] },
    { routes: [{ route: '/old', rewrite: '/different.html' }] },
    { routes: [{ route: '/old', redirect: 'javascript:alert(1)' }] },
    { globalHeaders: { 'X-Unsafe': 'a\r\nb' } },
    { responseOverrides: { '401': { redirect: '/login' } } },
  ])('refuses unsupported policies instead of silently dropping them', config => {
    expect(() => translateStaticConfig(config)).toThrow();
  });
});
