import { describe, expect, it } from 'vitest';
import { louisianaBogueChittoRoutes } from './louisiana-bogue-chitto';
import { routeInventory } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Louisiana Bogue Chitto starter', () => {
  it('registers three access-backed scored reaches with direct gauge context', () => {
    expect(louisianaBogueChittoRoutes).toHaveLength(6);
    expect(louisianaBogueChittoRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(louisianaBogueChittoRoutes.every(route => route.profile.thresholdSourceStrength === 'community')).toBe(true);
    expect(louisianaBogueChittoRoutes.every(route => routeInventory.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(louisianaBogueChittoRoutes.every(route => route.gaugeSource?.siteId === '02492000')).toBe(true);
    expect(auditRouteSafety(louisianaBogueChittoRoutes)).toEqual([]);
  });
});
