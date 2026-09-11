import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { southCarolinaRoutes } from './south-carolina';
import { listRivers } from '../../lib/rivers';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('South Carolina scored starter', () => {
  it('publishes the reviewed direct-stage route in both discovery and scoring', () => {
    const route = southCarolinaRoutes[0];
    expect(listRivers().find(r => r.slug === route.slug)?.scoreEligibility).toBe('scored');
    expect(rivers.some(r => r.slug === route.slug)).toBe(true);
    expect(auditRouteSafety(southCarolinaRoutes)).toEqual([]);
    // Guard against confusing local gage height with the station's NAVD elevation series.
    expect(route.gaugeSource).toMatchObject({ siteId: '02132000', metric: 'gage_height_ft', unit: 'ft', kind: 'direct' });
    expect(route.profile).toMatchObject({ tooLow: 2, idealMin: 2, idealMax: 9, tooHigh: 9 });
  });
  it('keeps the river trace continuous, correctly oriented, and above the US 378 take-out', () => {
    const route = southCarolinaRoutes[0];
    const feature = JSON.parse(readFileSync(`public/data/canonical-river-geometries/routes/${route.slug}.json`, 'utf8'));
    expect(feature.geometry.coordinates).toHaveLength(1);
    const line: number[][] = feature.geometry.coordinates[0];
    const miles = (a: number[], b: number[]) => Math.hypot((a[0]-b[0])*Math.cos((a[1]+b[1])*Math.PI/360), a[1]-b[1])*69;
    expect(miles(line[0], [route.putIn!.longitude!, route.putIn!.latitude!])*5280).toBeLessThan(150);
    expect(miles(line.at(-1)!, [route.takeOut!.longitude!, route.takeOut!.latitude!])*5280).toBeLessThan(150);
    const length = line.slice(1).reduce((sum,p,i)=>sum+miles(p,line[i]),0);
    expect(length).toBeGreaterThan(4.5);
    expect(length).toBeLessThan(5.7);
    expect(Math.min(...line.map(p=>p[1]))).toBeGreaterThan(33.9208);
  });
});
