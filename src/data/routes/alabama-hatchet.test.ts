import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { alabamaHatchetRoutes } from './alabama-hatchet';
import { listRivers } from '../../lib/rivers';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';
describe('Alabama Hatchet scored starter', () => {
  it('registers the three distinct published itineraries', () => {
    expect(alabamaHatchetRoutes.map(route => route.slug)).toEqual([
      'hatchet-creek-highway-280-highway-231',
      'hatchet-creek-highway-280-kings-bridge',
      'hatchet-creek-highway-231-kings-bridge',
    ]);
    for (const route of alabamaHatchetRoutes) expect(rivers.some(candidate => candidate.slug === route.slug)).toBe(true);
  });

  it('uses the direct Rockford gauge and preserves the official low-water floor', () => { const route=alabamaHatchetRoutes[0]; expect(listRivers().find(r=>r.slug===route.slug)?.scoreEligibility).toBe('scored'); expect(rivers.some(r=>r.slug===route.slug)).toBe(true); expect(auditRouteSafety(alabamaHatchetRoutes)).toEqual([]); expect(route.gaugeSource).toMatchObject({siteId:'02408540',metric:'discharge_cfs',unit:'cfs',kind:'direct'}); expect(route.profile).toMatchObject({thresholdModel:'minimum-only',tooLow:400,idealMin:400}); });
  it('keeps the route trace within the named bridges and its published distance', () => { const route=alabamaHatchetRoutes[0]; const line:number[][]=JSON.parse(readFileSync(`public/data/canonical-river-geometries/routes/${route.slug}.json`,'utf8')).geometry.coordinates[0]; const miles=(a:number[],b:number[])=>Math.hypot((a[0]-b[0])*Math.cos((a[1]+b[1])*Math.PI/360),a[1]-b[1])*69; expect(miles(line[0],[route.putIn!.longitude!,route.putIn!.latitude!])*5280).toBeLessThan(500); expect(miles(line.at(-1)!,[route.takeOut!.longitude!,route.takeOut!.latitude!])*5280).toBeLessThan(500); const length=line.slice(1).reduce((sum,p,i)=>sum+miles(p,line[i]),0); expect(length).toBeGreaterThan(11); expect(length).toBeLessThan(15); });
});
