import { describe, expect, it } from 'vitest';
import { connecticutWillimanticRoutes } from './connecticut-willimantic';

describe('Connecticut Willimantic River routes', () => {
  it('publishes seventeen scored, access-bounded water-trail reaches', () => {
    expect(connecticutWillimanticRoutes).toHaveLength(17);
    for (const route of connecticutWillimanticRoutes) {
      expect(route.scoreEligibility).toBe('scored');
      expect(route.state).toBe('Connecticut');
      expect(route.accessPoints).toHaveLength(2);
      expect(route.gaugeSource?.kind).toBe('direct');
      expect(route.profile?.thresholdModel).toBe('minimum-only');
      expect(route.profile?.thresholdSourceStrength).toBe('community');
      expect(route.safetyProfile?.safetyNotes.length).toBeGreaterThanOrEqual(4);
      expect(route.logistics?.camping).toBeTruthy();
    }
  });
});
