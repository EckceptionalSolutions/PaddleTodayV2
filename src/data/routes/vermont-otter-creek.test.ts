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
      for (const point of [route.putIn, route.takeOut]) {
        if (point?.name === 'Otter Creek–Kwonumosk public access area') {
          // The official access-area anchor is not a surveyed water entry.
          expect(point).toMatchObject({ latitude: 44.086, longitude: -73.2472 });
          expect(point.name).not.toContain('water-entry edge');
        } else {
          expect(point?.name).toContain('water-entry edge');
        }
      }
      expect(route.sourceLinks.length).toBeGreaterThanOrEqual(5);
    }
  });
});
