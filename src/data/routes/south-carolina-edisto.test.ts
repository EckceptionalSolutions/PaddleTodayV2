import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { southCarolinaEdistoRoutes } from './south-carolina-edisto';
import { listRivers } from '../../lib/rivers';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('North Fork Edisto scored starter', () => {
  it('uses direct Orangeburg telemetry with the published minimum-only floor', () => {
    const route = southCarolinaEdistoRoutes[0];
    expect(listRivers().find(r => r.slug === route.slug)?.scoreEligibility).toBe('scored');
    expect(rivers.some(r => r.slug === route.slug)).toBe(true);
    expect(auditRouteSafety(southCarolinaEdistoRoutes)).toEqual([]);
    expect(route.gaugeSource).toMatchObject({ siteId: '02173500', metric: 'gage_height_ft', unit: 'ft', kind: 'direct' });
    expect(route.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 3.5 });
  });
  it('keeps the generated trace within the guide endpoints and mileage', () => {
    const route = southCarolinaEdistoRoutes[0];
    const feature = JSON.parse(readFileSync(`public/data/canonical-river-geometries/routes/${route.slug}.json`, 'utf8'));
    const line: number[][] = feature.geometry.coordinates[0];
    const miles = (a: number[], b: number[]) => Math.hypot((a[0]-b[0])*Math.cos((a[1]+b[1])*Math.PI/360), a[1]-b[1])*69;
    expect(miles(line[0], [route.putIn!.longitude!, route.putIn!.latitude!])*5280).toBeLessThan(250);
    expect(miles(line.at(-1)!, [route.takeOut!.longitude!, route.takeOut!.latitude!])*5280).toBeLessThan(250);
    const length = line.slice(1).reduce((sum,p,i)=>sum+miles(p,line[i]),0);
    expect(length).toBeGreaterThan(8.2);
    expect(length).toBeLessThan(10.2);
  });
});
