import { describe, expect, it } from 'vitest';
import { newHampshireMerrimackFranklinExpansionRoutes } from './new-hampshire-merrimack-franklin-expansion';
import { publicRivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('New Hampshire Franklin Merrimack expansion routes', () => {
  it('publishes distinct scored routes with direct flow evidence and complete metadata', () => {
    expect(newHampshireMerrimackFranklinExpansionRoutes).toHaveLength(5);
    expect(new Set(newHampshireMerrimackFranklinExpansionRoutes.map((route) => route.id)).size).toBe(5);
    for (const route of newHampshireMerrimackFranklinExpansionRoutes) {
      expect(publicRivers.some((candidate) => candidate.id === route.id)).toBe(true);
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource).toMatchObject({ siteId: '01081500', kind: 'direct' });
      expect(route.profile.tooLow).toBe(400);
      expect(route.profile.idealMin).toBe(1500);
      expect(route.accessPoints).toHaveLength(2);
      expect(route.accessPoints?.every((point) => point.name.toLowerCase().includes('water-entry edge'))).toBe(true);
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(auditRouteSafety([route])).toEqual([]);
    }
  });
});
