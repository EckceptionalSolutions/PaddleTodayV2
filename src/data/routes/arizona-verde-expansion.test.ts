import { describe, expect, it } from 'vitest';
import { publicRivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { arizonaVerdeExpansionRoutes } from './arizona-verde-expansion';

describe('Arizona Verde expansion', () => {
  it('registers the twenty-seven mapped forward reaches', () => {
    expect(arizonaVerdeExpansionRoutes).toHaveLength(27);
    expect(new Set(arizonaVerdeExpansionRoutes.map(route => route.id)).size).toBe(27);
    for (const route of arizonaVerdeExpansionRoutes) {
      expect(publicRivers.some(candidate => candidate.id === route.id)).toBe(true);
      expect(route.putIn?.name).toMatch(/RAP|water-entry/i);
      expect(route.takeOut?.name).toMatch(/RAP|water-entry/i);
      expect(route.gaugeSource?.kind).toBe('direct');
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
    }
  });

  it('passes the reviewed safety audit', () => {
    expect(auditRouteSafety(arizonaVerdeExpansionRoutes)).toEqual([]);
  });
});
