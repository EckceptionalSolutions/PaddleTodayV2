import { describe, expect, it } from 'vitest';
import { routeInventory } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { alabamaCoosaRoutes } from './alabama-coosa';

describe('Alabama Coosa routes', () => {
  it('contains three unique scored public reaches on the direct Wetumpka gauge', () => {
    expect(alabamaCoosaRoutes).toHaveLength(3);
    expect(new Set(alabamaCoosaRoutes.map(route => route.id)).size).toBe(3);
    expect(alabamaCoosaRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(alabamaCoosaRoutes.every(route => route.gaugeSource?.siteId === '02411600')).toBe(true);
    expect(alabamaCoosaRoutes.every(route => route.logistics?.campingClassification === 'none')).toBe(true);
    expect(alabamaCoosaRoutes.every(route => route.accessPoints?.every(point => point.latitude !== undefined && point.longitude !== undefined))).toBe(true);
    expect(alabamaCoosaRoutes.every(route => routeInventory.some(candidate => candidate.id === route.id))).toBe(true);
  });

  it('keeps the whitewater, dam and cold-water safety package complete', () => {
    expect(auditRouteSafety(alabamaCoosaRoutes)).toEqual([]);
    expect(alabamaCoosaRoutes.every(route => route.safetyProfile?.hazards.includes('whitewater'))).toBe(true);
    expect(alabamaCoosaRoutes.every(route => route.safetyProfile?.hazards.includes('dam'))).toBe(true);
  });
});
