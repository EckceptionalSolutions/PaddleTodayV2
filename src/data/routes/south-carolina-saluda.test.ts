import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { southCarolinaSaludaRoutes } from './south-carolina-saluda';
import { listRivers } from '../../lib/rivers';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Lower Saluda scored starter', () => {
  it('publishes three direct-gauge scored routes with the official flow envelope', () => {
    expect(southCarolinaSaludaRoutes).toHaveLength(6);
    for (const route of southCarolinaSaludaRoutes) {
      expect(listRivers().find(r => r.slug === route.slug)?.scoreEligibility).toBe('scored');
      expect(rivers.some(r => r.slug === route.slug)).toBe(true);
      expect(auditRouteSafety([route])).toEqual([]);
      expect(route.gaugeSource).toMatchObject({ siteId: '02168504', metric: 'discharge_cfs', unit: 'cfs', kind: 'direct' });
      expect(route.profile).toMatchObject({ tooLow: 400, idealMin: 400, idealMax: 18000, tooHigh: 18000 });
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
