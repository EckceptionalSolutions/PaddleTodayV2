import { describe, expect, it } from 'vitest';
import { incomingRouteLink } from './incoming-route-link';

describe('incoming route links', () => {
  it.each(['https://paddletoday.com/rivers/rice-creek/', '/rivers/rice-creek'])('maps %s to the native route', path => {
    expect(incomingRouteLink(path)).toBe('/river/rice-creek');
  });
  it('preserves access choices and drops the website handoff flag', () => {
    const result = incomingRouteLink('https://paddletoday.com/rivers/rice-creek/?putin=upper%20landing&takeout=lower&openApp=1');
    const url = new URL(result, 'https://paddletoday.com');
    expect(url.pathname).toBe('/river/rice-creek');
    expect(url.searchParams.get('putin')).toBe('upper landing');
    expect(url.searchParams.get('takeout')).toBe('lower');
    expect(url.searchParams.has('openApp')).toBe(false);
  });
  it.each(['paddletoday://river/rice-creek?putin=upper', '/river/rice-creek', 'https://example.com/rivers/rice-creek', 'https://paddletoday.com.evil.test/rivers/rice-creek', 'https://paddletoday.com/rivers/', 'https://[broken'])('leaves unrelated or malformed paths unchanged: %s', path => {
    expect(incomingRouteLink(path)).toBe(path);
  });
});
