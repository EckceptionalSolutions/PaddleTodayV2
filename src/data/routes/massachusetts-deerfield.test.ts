import { describe, expect, it } from 'vitest';
import { massachusettsDeerfieldRoutes } from './massachusetts-deerfield';
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
});
