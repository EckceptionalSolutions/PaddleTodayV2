import { describe, expect, it } from 'vitest';
import { alabamaLocustForkRoutes } from './alabama-locust-fork';
import { routeInventory } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Alabama Locust Fork scored section', () => {
  it('registers the public Five Points to Kings Bend reach', () => {
    expect(alabamaLocustForkRoutes).toHaveLength(5);
    for (const route of alabamaLocustForkRoutes) {
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource?.siteId).toBe('02455000');
      expect(route.accessPoints?.every(point => point.latitude && point.longitude)).toBe(true);
      expect(routeInventory.some(candidate => candidate.id === route.id)).toBe(true);
    }
    expect(auditRouteSafety(alabamaLocustForkRoutes)).toEqual([]);
  });
});
