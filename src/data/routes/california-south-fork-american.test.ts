import { describe, expect, it } from 'vitest';
import { californiaSouthForkAmericanRoutes } from './california-american';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('California South Fork American starter routes', () => {
  it('provides three scored direct-gauge Coloma–Lotus routes', () => {
    expect(californiaSouthForkAmericanRoutes).toHaveLength(3);
    expect(californiaSouthForkAmericanRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(californiaSouthForkAmericanRoutes.every(route => route.gaugeSource?.siteId === '11444500')).toBe(true);
    expect(californiaSouthForkAmericanRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(californiaSouthForkAmericanRoutes)).toEqual([]);
  });
});
