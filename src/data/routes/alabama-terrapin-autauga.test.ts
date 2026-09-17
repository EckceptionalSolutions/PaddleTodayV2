import { describe, expect, it } from 'vitest';
import { publicRivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { alabamaTerrapinAutaugaRoutes } from './alabama-terrapin-autauga';

describe('Alabama Terrapin and Autauga expansion', () => {
  it('registers seven distinct, water-edge route cards', () => {
    expect(alabamaTerrapinAutaugaRoutes).toHaveLength(7);
    expect(new Set(alabamaTerrapinAutaugaRoutes.map(route => route.id)).size).toBe(7);
    for (const route of alabamaTerrapinAutaugaRoutes) {
      expect(publicRivers.some(candidate => candidate.id === route.id)).toBe(true);
      expect(route.putIn?.name).toMatch(/water|launch|access|park|City Hall/i);
      expect(route.takeOut?.name).toMatch(/water|launch|access|park|campground|Ellisville|City Hall/i);
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route.logistics?.campingClassification).toBeTruthy();
      expect(route.accessPoints?.every(point => point.latitude !== undefined && point.longitude !== undefined)).toBe(true);
    }
  });

  it('keeps the lower Terrapin cards scored against the direct Ellisville gauge', () => {
    const scored = alabamaTerrapinAutaugaRoutes.filter(route => route.scoreEligibility === 'scored');
    expect(scored).toHaveLength(2);
    expect(scored.every(route => route.gaugeSource?.siteId === '02400100')).toBe(true);
    expect(auditRouteSafety(alabamaTerrapinAutaugaRoutes)).toEqual([]);
  });
});
