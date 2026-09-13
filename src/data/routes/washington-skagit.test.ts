import { describe, expect, it } from 'vitest';
import { washingtonSkagitRoutes } from './washington-skagit';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Washington Skagit starter routes', () => {
  it('provides five scored direct-gauge public-access reaches', () => {
    expect(washingtonSkagitRoutes).toHaveLength(6);
    expect(washingtonSkagitRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(washingtonSkagitRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(washingtonSkagitRoutes.every(route => ['12178000', '12181000'].includes(route.gaugeSource?.siteId ?? ''))).toBe(true);
    expect(auditRouteSafety(washingtonSkagitRoutes)).toEqual([]);
  });
});
