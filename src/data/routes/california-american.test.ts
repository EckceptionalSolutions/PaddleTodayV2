import { describe, expect, it } from 'vitest';
import { californiaAmericanRoutes } from './california-american';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('California American scored starter', () => {
  it('registers three direct-gauge Parkway itineraries', () => {
    expect(californiaAmericanRoutes).toHaveLength(4);
    expect(californiaAmericanRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(californiaAmericanRoutes.every(route => rivers.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(californiaAmericanRoutes.every(route => route.gaugeSource?.siteId === '11446500')).toBe(true);
    expect(auditRouteSafety(californiaAmericanRoutes)).toEqual([]);
  });
});
