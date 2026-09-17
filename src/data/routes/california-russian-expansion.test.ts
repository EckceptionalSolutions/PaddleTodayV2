import { describe, expect, it } from 'vitest';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { publicRivers } from '../rivers';
import { californiaRussianExpansionRoutes } from './california-russian-expansion';

describe('California Russian River expansion routes', () => {
  it('publishes distinct cards with reviewed access and safety metadata', () => {
    expect(californiaRussianExpansionRoutes).toHaveLength(16);
    for (const route of californiaRussianExpansionRoutes) {
      expect(publicRivers.some((candidate) => candidate.id === route.id)).toBe(true);
      expect(route.state).toBe('California');
      if (route.id === 'russian-river-del-rio-healdsburg' || route.id === 'russian-river-alexander-healdsburg' || route.id === 'russian-river-alexander-del-rio') {
        expect(route.scoreEligibility).toBe('scored');
        expect(route.gaugeSource).toMatchObject({ siteId: '11464000', kind: 'direct' });
        expect(route.profile.tooLow).toBe(300);
        expect(route.profile.idealMax).toBe(1500);
      } else {
        expect(route.scoreEligibility).toBe('planning');
        expect(route.gaugeSource).toMatchObject({ siteId: '11464000', kind: 'proxy' });
      }
      expect(route.accessPoints).toHaveLength(2);
      expect(route.accessPoints?.every((point) => point.name.toLowerCase().includes('water-entry edge'))).toBe(true);
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(auditRouteSafety([route])).toEqual([]);
    }
  });
});
