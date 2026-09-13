import { describe, expect, it } from 'vitest';
import { louisianaBayouTecheRoutes } from './louisiana-bayou-teche';
import { routeInventory } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Louisiana Bayou Teche starter', () => {
  it('registers twenty-four official dock reaches with direct gauge context', () => {
    expect(louisianaBayouTecheRoutes).toHaveLength(24);
    expect(louisianaBayouTecheRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(louisianaBayouTecheRoutes.every(route => route.profile.thresholdSourceStrength === 'official')).toBe(true);
    expect(louisianaBayouTecheRoutes.every(route => routeInventory.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(louisianaBayouTecheRoutes.every(route => route.gaugeSource?.siteId === '07385450')).toBe(true);
    expect(auditRouteSafety(louisianaBayouTecheRoutes)).toEqual([]);
  });
});
