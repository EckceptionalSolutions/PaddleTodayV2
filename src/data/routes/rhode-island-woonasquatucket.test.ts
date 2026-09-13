import { describe, expect, it } from 'vitest';
import { rhodeIslandWoonasquatucketRoutes } from './rhode-island-woonasquatucket';

describe('Rhode Island Woonasquatucket routes', () => {
  it('publishes scored public-access reaches with gauge evidence', () => {
    expect(rhodeIslandWoonasquatucketRoutes.length).toBeGreaterThanOrEqual(11);
    for (const route of rhodeIslandWoonasquatucketRoutes) {
      expect(route.state).toBe('Rhode Island');
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource?.siteId).toBe('01114500');
      expect(route.profile?.thresholdModel).toBe('minimum-only');
      expect(route.accessPoints).toHaveLength(2);
      expect(route.safetyProfile?.safetyNotes.length).toBeGreaterThanOrEqual(3);
      expect(route.logistics?.camping).toBeTruthy();
    }
  });
});
