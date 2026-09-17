import { describe, expect, it } from 'vitest';
import { alabamaBartramRoutes } from './alabama-bartram';

describe('Alabama Bartram Canoe Trail routes', () => {
  it('publishes the documented day and overnight access set', () => {
    expect(alabamaBartramRoutes).toHaveLength(13);
    expect(new Set(alabamaBartramRoutes.map((route) => route.id)).size).toBe(13);
    for (const route of alabamaBartramRoutes) {
      expect(route.state).toBe('Alabama');
      expect(['scored', 'planning']).toContain(route.scoreEligibility);
      expect(route.gaugeSource).toMatchObject({ siteId: '02428400', kind: 'direct' });
      expect(route.profile?.thresholdSourceStrength).toBe('official');
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route.logistics?.campingClassification).toMatch(/basecamp|campsite/);
      expect(route.accessPoints).toHaveLength(2);
      expect(route.accessPoints?.every((point) => point.name.toLowerCase().includes('water-entry edge'))).toBe(true);
      expect(route.sourceLinks.length).toBeGreaterThanOrEqual(5);
    }
    expect(alabamaBartramRoutes.filter((route) => route.scoreEligibility === 'scored')).toHaveLength(11);
    expect(alabamaBartramRoutes.filter((route) => route.scoreEligibility === 'planning')).toHaveLength(2);
    expect(alabamaBartramRoutes.filter((route) => route.logistics?.campingClassification === 'on_route_campsite')).toHaveLength(7);
  });
});
