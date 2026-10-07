import { describe, expect, it } from 'vitest';
import { listRivers, WITHHELD_ROUTE_SLUGS } from '../../lib/rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { arizonaVerdeExpansionRoutes } from './arizona-verde-expansion';

describe('Arizona Verde expansion', () => {
  it('registers the twenty-seven mapped forward reaches', () => {
    expect(arizonaVerdeExpansionRoutes).toHaveLength(27);
    expect(new Set(arizonaVerdeExpansionRoutes.map(route => route.id)).size).toBe(27);
    const published = listRivers();
    for (const route of arizonaVerdeExpansionRoutes) {
      expect(published.some(candidate => candidate.id === route.id)).toBe(!WITHHELD_ROUTE_SLUGS.has(route.id));
      expect(route.putIn?.name).toMatch(/RAP|water-entry/i);
      expect(route.takeOut?.name).toMatch(/RAP|water-entry/i);
      expect(route.gaugeSource?.kind).toBe('direct');
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route.scoreEligibility).toBe('planning');
      expect(route.profile.tooLow).toBeUndefined();
      expect(route.profile.tooHigh).toBeUndefined();
      expect(route.profile.idealMin).toBeUndefined();
      expect(route.profile.idealMax).toBeUndefined();
    }
  });

  it('passes the reviewed safety audit', () => {
    expect(auditRouteSafety(arizonaVerdeExpansionRoutes)).toEqual([]);
  });
});
