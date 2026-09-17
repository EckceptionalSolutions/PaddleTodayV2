import { describe, expect, it } from 'vitest';
import { mississippiPascagoulaRoutes } from './mississippi-pascagoula';

describe('Mississippi Pascagoula River planning routes', () => {
  it('publishes distinct public-access cards with reviewed safety and logistics', () => {
    expect(mississippiPascagoulaRoutes).toHaveLength(12);
    expect(new Set(mississippiPascagoulaRoutes.map((route) => route.id)).size).toBe(12);
    for (const route of mississippiPascagoulaRoutes) {
      expect(route.state).toBe('Mississippi');
      expect(route.riverId).toBe('pascagoula-river-mississippi');
      expect(route.scoreEligibility).toBe('planning');
      expect(route.gaugeSource).toMatchObject({ siteId: '02479310', kind: 'direct' });
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.accessPoints).toHaveLength(2);
      expect(route.accessPoints?.every((point) => point.name.toLowerCase().includes('water-entry edge'))).toBe(true);
      expect(route.sourceLinks.length).toBeGreaterThanOrEqual(7);
    }
  });
});
