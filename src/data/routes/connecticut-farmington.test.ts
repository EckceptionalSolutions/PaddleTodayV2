import { describe, expect, it } from 'vitest';
import { connecticutFarmingtonRoutes } from './connecticut-farmington';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Connecticut Farmington scored starter', () => {
  it('registers three direct-gauge Wild & Scenic itineraries', () => {
    expect(connecticutFarmingtonRoutes).toHaveLength(3);
    expect(connecticutFarmingtonRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(connecticutFarmingtonRoutes.every(route => rivers.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(connecticutFarmingtonRoutes.every(route => route.gaugeSource?.siteId === '01186000')).toBe(true);
    expect(auditRouteSafety(connecticutFarmingtonRoutes)).toEqual([]);
  });
});
