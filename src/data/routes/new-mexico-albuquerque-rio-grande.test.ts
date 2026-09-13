import { describe, expect, it } from 'vitest';
import { newMexicoAlbuquerqueRioGrandeRoutes } from './new-mexico-albuquerque-rio-grande';
import { routeInventory } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('New Mexico Albuquerque Rio Grande routes', () => {
  it('has three scored direct-gauge reaches with public access and complete safety metadata', () => {
    expect(newMexicoAlbuquerqueRioGrandeRoutes).toHaveLength(3);
    expect(new Set(newMexicoAlbuquerqueRioGrandeRoutes.map(route => route.id)).size).toBe(3);
    expect(newMexicoAlbuquerqueRioGrandeRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(newMexicoAlbuquerqueRioGrandeRoutes.every(route => route.gaugeSource?.siteId === '08329918')).toBe(true);
    expect(newMexicoAlbuquerqueRioGrandeRoutes.every(route => route.accessPoints?.length === 2)).toBe(true);
    expect(newMexicoAlbuquerqueRioGrandeRoutes.every(route => routeInventory.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(newMexicoAlbuquerqueRioGrandeRoutes)).toEqual([]);
  });
});
