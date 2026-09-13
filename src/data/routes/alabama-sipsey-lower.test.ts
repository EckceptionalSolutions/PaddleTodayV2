import { describe, expect, it } from 'vitest';
import { alabamaSipseyLowerRoutes } from './alabama-sipsey-lower';
import { routeInventory } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Alabama Sipsey lower scored section', () => {
  it('registers the public Highway 33 to County Road B15 reach', () => {
    expect(alabamaSipseyLowerRoutes).toHaveLength(1);
    const [route] = alabamaSipseyLowerRoutes;
    expect(route.scoreEligibility).toBe('scored');
    expect(route.gaugeSource?.siteId).toBe('02450250');
    expect(route.accessPoints?.every(point => point.latitude && point.longitude)).toBe(true);
    expect(routeInventory.some(candidate => candidate.id === route.id)).toBe(true);
    expect(auditRouteSafety(alabamaSipseyLowerRoutes)).toEqual([]);
  });
});
