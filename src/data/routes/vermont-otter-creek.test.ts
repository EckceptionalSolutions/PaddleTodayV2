import { describe, expect, it } from 'vitest';
import { vermontOtterCreekRoutes } from './vermont-otter-creek';

describe('Vermont Otter Creek expansion', () => {
  it('keeps seven reviewed public-access planning reaches', () => {
    expect(vermontOtterCreekRoutes).toHaveLength(7);
    for (const route of vermontOtterCreekRoutes) {
      expect(route.scoreEligibility).toBe('planning');
      expect(route.gaugeSource?.siteId).toBe('04282500');
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.putIn?.name).toContain('water-entry edge');
      expect(route.takeOut?.name).toContain('water-entry edge');
      expect(route.sourceLinks.length).toBeGreaterThanOrEqual(5);
    }
  });
});
