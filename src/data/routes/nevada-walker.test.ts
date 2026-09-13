import { describe, expect, it } from 'vitest';
import { nevadaWalkerRoutes } from './nevada-walker';

describe('Nevada East Walker River routes', () => {
  it('publishes three scored water-trail reaches with direct telemetry and public water access', () => {
    expect(nevadaWalkerRoutes).toHaveLength(3);
    for (const route of nevadaWalkerRoutes) {
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource).toMatchObject({ siteId: '10293500', kind: 'direct' });
      expect(route.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 200, idealMin: 201, idealMax: 500 });
      expect(route.accessPoints).toHaveLength(2);
      expect(route.accessPoints?.every((point) => point.name.toLowerCase().includes('water-entry edge'))).toBe(true);
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.safetyProfile?.hazards).toContain('dam');
      expect(route.sourceLinks?.length).toBeGreaterThanOrEqual(4);
    }
  });
});
