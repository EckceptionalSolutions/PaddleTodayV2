import { describe, expect, it } from 'vitest';
import { isWebFeatureEnabled } from './web-feature-flags';

describe('public web rollout flags', () => {
  it('only enables an explicitly true build value', () => {
    expect(isWebFeatureEnabled('1')).toBe(true);
    expect(isWebFeatureEnabled('true')).toBe(true);
    expect(isWebFeatureEnabled('0')).toBe(false);
    expect(isWebFeatureEnabled(undefined)).toBe(false);
  });
});
