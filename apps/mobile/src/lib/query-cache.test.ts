import { describe, expect, it } from 'vitest';
import { queryCacheBuster } from './query-cache';

describe('mobile query cache versioning', () => {
  it('changes when the native app version changes', () => {
    expect(queryCacheBuster('1.0.10', '16')).not.toBe(queryCacheBuster('1.0.11', '17'));
  });

  it('is stable for the same release', () => {
    expect(queryCacheBuster(' 1.0.11 ', ' 17 ')).toBe(queryCacheBuster('1.0.11', '17'));
  });

  it('remains deterministic when native version metadata is unavailable', () => {
    expect(queryCacheBuster(null, undefined)).toBe(
      'paddletoday-mobile:schema-1:unknown:unknown'
    );
  });
});
