import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { southCarolinaLittlePeeDeeRoutes } from './south-carolina-little-pee-dee';
import { listRivers } from '../../lib/rivers';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';
describe('Little Pee Dee scored starter', () => {
  it('uses the exact guide-linked direct gauge and is score eligible', () => { const route=southCarolinaLittlePeeDeeRoutes[0]; expect(listRivers().find(r=>r.slug===route.slug)?.scoreEligibility).toBe('scored'); expect(rivers.some(r=>r.slug===route.slug)).toBe(true); expect(auditRouteSafety(southCarolinaLittlePeeDeeRoutes)).toEqual([]); expect(route.gaugeSource).toMatchObject({siteId:'02135000',metric:'gage_height_ft',kind:'direct'}); expect(route.profile).toMatchObject({thresholdModel:'two-sided',tooLow:2,idealMin:2,idealMax:9,tooHigh:9}); });
  it('keeps the trace at the six-mile guide distance and both endpoint bounds', () => { const route=southCarolinaLittlePeeDeeRoutes[0]; const line:number[][]=JSON.parse(readFileSync(`public/data/canonical-river-geometries/routes/${route.slug}.json`,'utf8')).geometry.coordinates[0]; const miles=(a:number[],b:number[])=>Math.hypot((a[0]-b[0])*Math.cos((a[1]+b[1])*Math.PI/360),a[1]-b[1])*69; expect(miles(line[0],[route.putIn!.longitude!,route.putIn!.latitude!])*5280).toBeLessThan(450); expect(miles(line.at(-1)!,[route.takeOut!.longitude!,route.takeOut!.latitude!])*5280).toBeLessThan(250); const length=line.slice(1).reduce((sum,p,i)=>sum+miles(p,line[i]),0); expect(length).toBeGreaterThan(5.2); expect(length).toBeLessThan(6.8); });
});
