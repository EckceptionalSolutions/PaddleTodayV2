import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { southCarolinaSaludaRoutes } from './south-carolina-saluda';
import { listRivers } from '../../lib/rivers';
import { publicRivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Lower Saluda upper reach', () => {
  it('publishes one planning-only reach with two documented launch choices', () => {
    expect(southCarolinaSaludaRoutes).toHaveLength(1);
    for (const route of southCarolinaSaludaRoutes) {
      expect(listRivers().find(r => r.slug === route.slug)?.scoreEligibility).toBe('planning');
      expect(publicRivers.some(r => r.slug === route.slug)).toBe(true);
      expect(auditRouteSafety([route])).toEqual([]);
      expect(route.gaugeSource).toMatchObject({ siteId: '02168504', metric: 'discharge_cfs', unit: 'cfs', kind: 'direct' });
      expect(route.reach).toContain('Hope Ferry Landing');
      expect(route.profile.idealMin).toBeUndefined();
      expect(route.profile.idealMax).toBeUndefined();
      expect(route.profile.tooLow).toBeUndefined();
      expect(route.profile.tooHigh).toBeUndefined();
      expect(route.evidenceNotes?.find(note => note.label === 'Published daily flow range')?.value).toBe('400–20,000 cfs');
    }
  });

  it('keeps generated traces continuous, downstream and within published mileage bands', () => {
    const miles = (a: number[], b: number[]) => Math.hypot((a[0] - b[0]) * Math.cos((a[1] + b[1]) * Math.PI / 360), a[1] - b[1]) * 69;
    for (const route of southCarolinaSaludaRoutes) {
      const feature = JSON.parse(readFileSync(`public/data/canonical-river-geometries/routes/${route.slug}.json`, 'utf8'));
      expect(feature.geometry.coordinates).toHaveLength(1);
      const line: number[][] = feature.geometry.coordinates[0];
      expect(miles(line[0], [route.putIn!.longitude!, route.putIn!.latitude!]) * 5280).toBeLessThan(500);
      expect(miles(line.at(-1)!, [route.takeOut!.longitude!, route.takeOut!.latitude!]) * 5280).toBeLessThan(500);
      const length = line.slice(1).reduce((sum, p, i) => sum + miles(p, line[i]), 0);
      const expected = Number(route.logistics?.distanceLabel?.match(/[\d.]+/)?.[0] ?? 0);
      expect(length).toBeGreaterThan(expected * 0.75);
      expect(length).toBeLessThan(expected * 1.3);
    }
  });
});
