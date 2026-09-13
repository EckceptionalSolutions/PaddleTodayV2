import { describe, expect, it } from 'vitest';
import { alabamaTallapoosaRoutes } from './alabama-tallapoosa';
import { routeInventory } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Alabama Tallapoosa starter routes', () => {
  it('publishes the three Harold Banks sections as scored, direct-gauge routes', () => {
    expect(alabamaTallapoosaRoutes).toHaveLength(7);
    expect(new Set(alabamaTallapoosaRoutes.map(route => route.id)).size).toBe(7);
    expect(alabamaTallapoosaRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(alabamaTallapoosaRoutes.every(route => route.gaugeSource.kind === 'direct')).toBe(true);
    expect(alabamaTallapoosaRoutes.every(route => route.logistics?.campingClassification === 'on_route_campsite')).toBe(true);
    expect(alabamaTallapoosaRoutes.every(route => route.putIn && route.takeOut && route.putIn.latitude !== route.takeOut.latitude)).toBe(true);
  });

  it('is registered and carries the required safety evidence', () => {
    for (const route of alabamaTallapoosaRoutes) {
      expect(routeInventory.some(candidate => candidate.id === route.id)).toBe(true);
      expect(auditRouteSafety([route])).toEqual([]);
      expect(route.accessPoints?.every(point => point.note && point.note.length > 20)).toBe(true);
      expect(route.evidenceNotes.some(note => note.label === 'Flow scoring cues')).toBe(true);
      expect(route.safetyProfile?.hazards).toContain('private_banks');
    }
  });
});
