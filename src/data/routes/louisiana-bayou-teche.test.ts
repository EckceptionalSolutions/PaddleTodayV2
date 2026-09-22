import { describe, expect, it } from 'vitest';
import { louisianaBayouTecheRoutes } from './louisiana-bayou-teche';
import { routeInventory } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Louisiana Bayou Teche starter', () => {
  it('publishes the official dock reaches as planning routes until scoring can use a verified current metric', () => {
    expect(louisianaBayouTecheRoutes).toHaveLength(44);
    expect(louisianaBayouTecheRoutes.every(route => route.scoreEligibility === 'planning')).toBe(true);
    expect(louisianaBayouTecheRoutes.every(route => route.profile.thresholdSourceStrength === 'official')).toBe(true);
    expect(louisianaBayouTecheRoutes.every(route => routeInventory.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(louisianaBayouTecheRoutes.every(route => route.gaugeSource?.siteId === '07385450')).toBe(true);
    expect(louisianaBayouTecheRoutes.every(route => route.gaugeSource?.metric === 'gage_height_ft')).toBe(true);
    expect(louisianaBayouTecheRoutes.every(route => route.profile.idealMin === undefined && route.profile.tooLow === undefined)).toBe(true);
    expect(louisianaBayouTecheRoutes.every(route => route.evidenceNotes.some(note => note.label === 'Gauge limitation'))).toBe(true);
    expect(auditRouteSafety(louisianaBayouTecheRoutes)).toEqual([]);
  });
});
