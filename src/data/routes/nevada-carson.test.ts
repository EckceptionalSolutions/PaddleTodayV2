import { describe, expect, it } from 'vitest';
import { nevadaCarsonRoutes } from './nevada-carson';

describe('Nevada Carson River routes', () => {
  it('publishes four scored routes with direct telemetry and public water access', () => {
    expect(nevadaCarsonRoutes).toHaveLength(6);
    for (const route of nevadaCarsonRoutes) {
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource).toMatchObject({ siteId: '10311000', kind: 'direct' });
      expect(route.accessPoints).toHaveLength(2);
      expect(route.accessPoints?.every((point) => point.name.toLowerCase().includes('water-entry edge') || point.name.toLowerCase().includes('boat launch'))).toBe(true);
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.sourceLinks?.length).toBeGreaterThanOrEqual(5);
      expect(route.safetyProfile?.hazards).toContain('dam');
    }
  });

  it('uses the higher documented planning floor for the lower Carson reach', () => {
    const lower = nevadaCarsonRoutes.filter((route) => route.id.includes('santa-maria'));
    expect(lower).toHaveLength(3);
    expect(lower.every((route) => route.profile?.tooLow === 1000)).toBe(true);
  });
});
