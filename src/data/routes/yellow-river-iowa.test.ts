import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getRiverBySlug, getRiverScore, listScoredRivers } from '../../lib/rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { areDocumentedRouteAlternatives } from '../../lib/route-data-audit-policy';

const slugs = ['yellow-river-stonebrook-volney', 'yellow-river-smithfield-volney'];
const distance = (a: number[], b: number[]) => Math.hypot(
  (a[0] - b[0]) * Math.cos((a[1] + b[1]) * Math.PI / 360), a[1] - b[1],
) * 69;

describe('upper Yellow River requested itineraries', () => {
  it('publishes both reviewed options without treating trip observations as a scoring range', async () => {
    for (const slug of slugs) {
      const route = getRiverBySlug(slug)!;
      expect(route, slug).toBeDefined();
      expect(route.scoreEligibility).toBe('planning');
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route.gaugeSource.siteId).toBe('05389000');
      for (const key of ['tooLow', 'idealMin', 'idealMax', 'tooHigh'] as const) {
        expect(route.profile[key], `${slug}: ${key}`).toBeUndefined();
      }
      expect(listScoredRivers().some(r => r.slug === slug)).toBe(false);
      expect(await getRiverScore(slug)).toBeNull();
      expect(auditRouteSafety([route])).toEqual([]);
      expect(route.logistics?.campingClassification).toBe('none');
    }
  });

  it('uses the guide-listed Smithfield landing and a shared Volney public take-out', () => {
    const long = getRiverBySlug(slugs[0])!;
    const short = getRiverBySlug(slugs[1])!;
    // Smithfield Drive crosses the river twice. The named guide access is
    // the upstream crossing, not the downstream crossing near 43.1482/-91.431.
    expect(short.putIn).toMatchObject({ latitude: 43.15059709, longitude: -91.44194283 });
    expect(long.accessPoints?.[1]).toMatchObject({ ...short.putIn, mileFromStart: 5.42 });
    expect(long.takeOut).toEqual(short.takeOut);
    const downstream = getRiverBySlug('yellow-river-volney-sixteen-bridge')!;
    expect(long.takeOut?.latitude).toBe(downstream.putIn?.latitude);
    expect(long.takeOut?.longitude).toBe(downstream.putIn?.longitude);
    expect(areDocumentedRouteAlternatives(long, short)).toBe(true);
  });

  it('serves continuous endpoint-bounded river traces with the guide distance, rather than the 14-mile summary', () => {
    for (const [index, slug] of slugs.entries()) {
      const route = getRiverBySlug(slug)!;
      const feature = JSON.parse(readFileSync(`public/data/canonical-river-geometries/routes/${slug}.json`, 'utf8'));
      expect(feature.geometry.coordinates).toHaveLength(1);
      const line: number[][] = feature.geometry.coordinates[0];
      expect(line.length).toBeGreaterThan(100);
      const legs = line.slice(1).map((p, i) => distance(line[i], p));
      expect(Math.max(...legs)).toBeLessThan(0.1);
      const documentedMiles = index === 0 ? 11.97 : 6.55;
      expect(route.accessPoints?.at(-1)?.mileFromStart).toBe(documentedMiles);
      expect(Math.abs(legs.reduce((a, b) => a + b, 0) - documentedMiles)).toBeLessThan(0.4);
      expect(distance(line[0], [route.putIn!.longitude!, route.putIn!.latitude!]) * 5280).toBeLessThan(50);
      expect(distance(line.at(-1)!, [route.takeOut!.longitude!, route.takeOut!.latitude!]) * 5280).toBeLessThan(50);
    }
  });
});
