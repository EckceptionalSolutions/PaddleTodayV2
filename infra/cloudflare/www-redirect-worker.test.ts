import { describe, expect, it } from 'vitest';
import worker from './www-redirect-worker.mjs';
describe('canonical www hostname', () => {
  it.each(['/', '/explore/?utm_source=fixture', '/api/account', '/.well-known/assetlinks.json'])('preserves the existing permanent redirect for %s', path => {
    const response = worker.fetch(new Request('https://www.paddletoday.com' + path));
    expect(response.status).toBe(301); expect(response.headers.get('location')).toBe('https://paddletoday.com' + path);
  });
  it('has no upstream dependency and returns no body for HEAD', async () => {
    const response = worker.fetch(new Request('http://www.paddletoday.com/explore/', { method: 'HEAD' }));
    expect(response.headers.get('location')).toBe('https://paddletoday.com/explore/'); expect(await response.text()).toBe('');
  });
  it('does not turn unrelated hostnames into an open redirect', () => {
    expect(worker.fetch(new Request('https://other.test/')).status).toBe(404);
  });
});
