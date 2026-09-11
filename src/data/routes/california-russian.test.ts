import { describe, expect, it } from 'vitest';
import { californiaRussianRoutes } from './california-russian';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('California Russian River starter routes', () => {
  it('keeps three scored Forestville sections on the direct Healdsburg gauge', () => {
    expect(californiaRussianRoutes).toHaveLength(3);
    expect(californiaRussianRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(californiaRussianRoutes.every(route => route.gaugeSource?.siteId === '11464000')).toBe(true);
    expect(californiaRussianRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(californiaRussianRoutes)).toEqual([]);
  });
});
