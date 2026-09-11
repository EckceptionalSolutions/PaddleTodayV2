import { describe, expect, it } from 'vitest';
import { floridaRoutes } from './florida';
import { oregonRoutes } from './oregon';
import { listRivers } from '../../lib/rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { rivers as scoredRoutes } from '../rivers';
import { readFileSync } from 'node:fs';

describe('starter planning publication', () => {
  it('exposes reviewed starter trips without admitting them into scored routes', () => {
    const publicRoutes = listRivers();
    for (const route of [...floridaRoutes, ...oregonRoutes]) {
      const published = publicRoutes.find(item => item.slug === route.slug);
      expect(published?.scoreEligibility).toBe('planning');
      expect(published?.logistics?.distanceLabel).toBeTruthy();
      expect(published?.accessPoints).toHaveLength(2);
      expect(scoredRoutes.some(item => item.slug === route.slug)).toBe(false);
    }
  });

  it('passes the safety audit including routes outside the scored audit scope', () => {
    expect(auditRouteSafety([...floridaRoutes, ...oregonRoutes])).toEqual([]);
  });

  it('publishes continuous traces bounded by each trip’s actual endpoints', () => {
    const miles = (a: number[], b: number[]) => Math.hypot(
      (a[0] - b[0]) * Math.cos((a[1] + b[1]) * Math.PI / 360), a[1] - b[1],
    ) * 69;
    const paths = floridaRoutes.map(route => {
      const feature = JSON.parse(readFileSync(`public/data/canonical-river-geometries/routes/${route.slug}.json`, 'utf8'));
      expect(feature.geometry.coordinates).toHaveLength(1);
      const line: number[][] = feature.geometry.coordinates[0];
      expect(miles(line[0], [route.putIn!.longitude!, route.putIn!.latitude!]) * 5280).toBeLessThan(150);
      expect(miles(line.at(-1)!, [route.takeOut!.longitude!, route.takeOut!.latitude!]) * 5280).toBeLessThan(150);
      const length = line.slice(1).reduce((sum, point, i) => sum + miles(line[i], point), 0);
      const documentedMiles = route.accessPoints!.at(-1)!.mileFromStart!;
      expect(length).toBeGreaterThan(documentedMiles * 0.75);
      expect(length).toBeLessThan(documentedMiles * 1.25);
      return line;
    });
    // Adjacent Santa Fe trips share their landing, with no duplicated interior.
    const firstInterior = new Set(paths[0].slice(0, -1).map(point => JSON.stringify(point)));
    expect(paths[1].slice(1).some(point => firstInterior.has(JSON.stringify(point)))).toBe(false);
  });

  it('keeps Oregon traces within their launch boundaries and preserves the Peoria alcove', () => {
    const distance = (a: number[], b: number[]) => Math.hypot((a[0]-b[0])*Math.cos((a[1]+b[1])*Math.PI/360),a[1]-b[1])*69;
    const lines = oregonRoutes.map(route => {
      const feature = JSON.parse(readFileSync(`public/data/canonical-river-geometries/routes/${route.slug}.json`,'utf8'));
      expect(feature.geometry.coordinates).toHaveLength(1);
      const line:number[][]=feature.geometry.coordinates[0];
      expect(distance(line[0],[route.putIn!.longitude!,route.putIn!.latitude!])*5280).toBeLessThan(300);
      expect(distance(line.at(-1)!,[route.takeOut!.longitude!,route.takeOut!.latitude!])*5280).toBeLessThan(300);
      const length=line.slice(1).reduce((sum,p,i)=>sum+distance(line[i],p),0);
      const miles=route.accessPoints!.at(-1)!.mileFromStart!;
      expect(length).toBeGreaterThan(miles*.75);
      expect(length).toBeLessThan(miles*1.25);
      return line;
    });
    // The put-in is east of the island; the trace must follow the alcove north.
    expect(lines[0].filter(p=>p[1]<44.4555).every(p=>p[0]>-123.2106)).toBe(true);
    const first=new Set(lines[0].map(p=>JSON.stringify(p)));
    expect(lines[1].some(p=>first.has(JSON.stringify(p)))).toBe(false);
    expect(new Set(oregonRoutes.map(r=>r.riverId)).size).toBe(2);
  });
});
