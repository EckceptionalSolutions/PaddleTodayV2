import { describe, expect, it } from 'vitest';
import { nevadaTruckeeExpansionRoutes } from './nevada-truckee-expansion';

describe('Nevada Truckee expansion routes', () => {
  it('publishes four scored, access-bounded Reno reaches', () => {
    expect(nevadaTruckeeExpansionRoutes).toHaveLength(9);
    for (const route of nevadaTruckeeExpansionRoutes) {
      expect(route.scoreEligibility).toBe('scored');
      expect(route.state).toBe('Nevada');
      expect(route.accessPoints).toHaveLength(2);
      expect(route.profile?.thresholdSourceStrength).toBe('community');
      expect(route.safetyProfile?.safetyNotes.length).toBeGreaterThanOrEqual(3);
      expect(route.logistics?.camping).toBeTruthy();
    }
  });
});
