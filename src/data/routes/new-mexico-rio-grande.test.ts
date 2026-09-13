import { describe, expect, it } from 'vitest';
import { newMexicoRioGrandeRoutes } from './new-mexico-rio-grande';
import { publicRivers, routeInventory } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('New Mexico Rio Grande starter routes', () => {
  it('provides six scored routes plus a reviewed high-consequence planning reach', () => {
    expect(newMexicoRioGrandeRoutes).toHaveLength(7);
    expect(newMexicoRioGrandeRoutes.filter((route) => route.scoreEligibility === 'scored')).toHaveLength(6);
    expect(newMexicoRioGrandeRoutes.find((route) => route.id === 'rio-grande-john-dunn-taos-junction')?.scoreEligibility).toBe('planning');
    expect(newMexicoRioGrandeRoutes.every((route) => route.gaugeSource?.siteId === '08276500')).toBe(true);
    expect(newMexicoRioGrandeRoutes.every((route) => routeInventory.some((candidate) => candidate.id === route.id))).toBe(true);
    expect(publicRivers.some((route) => route.id === 'rio-grande-john-dunn-taos-junction')).toBe(true);
    expect(auditRouteSafety(newMexicoRioGrandeRoutes)).toEqual([]);
  });
});
