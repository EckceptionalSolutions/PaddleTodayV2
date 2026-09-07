import { describe, expect, it } from 'vitest';
import { parseRequestUrl } from './server-runtime';

describe('request target parsing', () => {
  it.each(['/api/rivers/%.json', '/api/rivers/%GG.json', '/api/rivers/%E0%A4.json'])('rejects malformed path encoding in %s', (target) => {
    expect(() => parseRequestUrl(target, 'localhost:4322')).toThrow();
  });

  it.each(['bad host', 'example.com/route', 'user@example.com', '[invalid'])('rejects invalid Host %s', (host) => {
    expect(() => parseRequestUrl('/api/health', host)).toThrow();
  });

  it('preserves valid encoded path segments and query values', () => {
    const url = parseRequestUrl('/api/rivers/caf%C3%A9%2Fcreek.json?name=100%25', '[::1]:4322');
    expect(url.pathname).toBe('/api/rivers/caf%C3%A9%2Fcreek.json');
    expect(url.searchParams.get('name')).toBe('100%');
    expect(url.hostname).toBe('paddletoday.internal');
  });

  it('defaults an absent target to the home page', () => {
    expect(parseRequestUrl(undefined, undefined).pathname).toBe('/');
  });
});
