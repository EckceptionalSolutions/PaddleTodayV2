import { describe, expect, it } from 'vitest';
import { californiaRussianRoutes } from './california-russian';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('California Russian River starter routes', () => {
  it('keeps the scored Russian River sections with direct upper and lower gauges', () => {
    expect(californiaRussianRoutes).toHaveLength(21);
    expect(californiaRussianRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(californiaRussianRoutes.every(route => ['11464000', '11467000'].includes(route.gaugeSource?.siteId ?? ''))).toBe(true);
    expect(californiaRussianRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(californiaRussianRoutes)).toEqual([]);
  });
});
