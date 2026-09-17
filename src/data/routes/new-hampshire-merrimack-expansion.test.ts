import { describe, expect, it } from 'vitest';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { publicRivers } from '../rivers';
import { newHampshireMerrimackExpansionRoutes } from './new-hampshire-merrimack-expansion';

describe('New Hampshire Merrimack expansion routes', () => {
  it('publishes distinct planning cards with reviewed access and safety metadata', () => {
    expect(newHampshireMerrimackExpansionRoutes).toHaveLength(11);
    for (const route of newHampshireMerrimackExpansionRoutes) {
      expect(publicRivers.some((candidate) => candidate.id === route.id)).toBe(true);
      expect(route.state).toBe('New Hampshire');
      expect(route.scoreEligibility).toBe('planning');
      expect(route.gaugeSource).toMatchObject({ siteId: '01081500', kind: 'proxy' });
      expect(route.accessPoints).toHaveLength(2);
      expect(route.accessPoints?.every((point) => point.name.toLowerCase().includes('water-entry edge'))).toBe(true);
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(auditRouteSafety([route])).toEqual([]);
    }
  });
});
