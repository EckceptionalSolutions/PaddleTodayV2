import { describe, expect, it } from 'vitest';
import { upstreamCacheLimit } from './upstream-cache-policy';

describe('catalog sized upstream cache limits', () => {
  it('fits the working set and bounds oversized catalogs', () => {
    expect(upstreamCacheLimit(1732)).toBe(1732);
    expect(upstreamCacheLimit(3)).toBe(256);
    expect(upstreamCacheLimit(50000)).toBe(20000);
  });
  it('accepts positive configuration within the ceiling and ignores invalid values', () => {
    expect(upstreamCacheLimit(1000, '1500')).toBe(1500);
    expect(upstreamCacheLimit(1000, '50000')).toBe(20000);
    for (const value of ['', ' ', '0', '-1', 'NaN', '1.5']) expect(upstreamCacheLimit(1000, value)).toBe(1000);
  });
});
