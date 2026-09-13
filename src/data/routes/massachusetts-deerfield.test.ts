import { describe, expect, it } from 'vitest';
import { massachusettsDeerfieldDrywayRoutes, massachusettsDeerfieldLowerRoutes, massachusettsDeerfieldRoutes } from './massachusetts-deerfield';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Massachusetts Deerfield scored starter', () => {
  it('registers six direct-gauge public-access reaches', () => {
    expect(massachusettsDeerfieldRoutes).toHaveLength(6);
    expect(massachusettsDeerfieldRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(massachusettsDeerfieldRoutes.every(route => rivers.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(massachusettsDeerfieldRoutes.every(route => route.gaugeSource?.siteId === '01168500')).toBe(true);
    expect(auditRouteSafety(massachusettsDeerfieldRoutes)).toEqual([]);
  });

  it('registers the release-dependent Dryway segment with explicit endpoint and safety evidence', () => {
    expect(massachusettsDeerfieldDrywayRoutes).toHaveLength(1);
    expect(massachusettsDeerfieldDrywayRoutes[0].scoreEligibility).toBe('planning');
    expect(massachusettsDeerfieldDrywayRoutes[0].routeType).toBe('whitewater');
    expect(massachusettsDeerfieldDrywayRoutes[0].putIn?.latitude).toBeCloseTo(42.721936, 5);
    expect(massachusettsDeerfieldDrywayRoutes[0].takeOut?.latitude).toBeCloseTo(42.696041, 5);
    expect(auditRouteSafety(massachusettsDeerfieldDrywayRoutes)).toEqual([]);
  });

  it('registers the lower Deerfield direct-gauge section and mandatory dam portage', () => {
    expect(massachusettsDeerfieldLowerRoutes).toHaveLength(1);
    const [route] = massachusettsDeerfieldLowerRoutes;
    expect(route.scoreEligibility).toBe('scored');
    expect(route.gaugeSource?.siteId).toBe('01170000');
    expect(route.accessPoints?.some(point => point.name.includes('portage'))).toBe(true);
    expect(auditRouteSafety(massachusettsDeerfieldLowerRoutes)).toEqual([]);
  });
});
