import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { routeAccessReviewHolds } from '../data/route-access-review-holds';
import { getRiverBySlug, listAllRiversForAudit, listScoredRivers } from './rivers';

const slugs = ['baltimore-blueway-canton', 'baltimore-blueway-inner-harbor-heritage'];
const fells = { latitude: 39.2804218, longitude: -76.5939127 };
const feature = (slug: string) => JSON.parse(readFileSync(`public/data/canonical-river-geometries/routes/${slug}.json`, 'utf8'));

describe('Baltimore Blueway source review', () => {
  it.each(slugs)('retains %s as a distinct unscored itinerary with the public Fells dock approach', slug => {
    const route = getRiverBySlug(slug)!;
    expect(route).toBeDefined();
    expect(route.scoreEligibility).toBe('planning');
    expect(listScoredRivers().some(scored => scored.slug === slug)).toBe(false);
    expect(route.gaugeSource).toMatchObject({ kind: 'proxy', siteId: '01589035' });
    expect(route.takeOut).toMatchObject(fells);
    expect(route.accessPoints?.at(-1)).toMatchObject(fells);
    expect(route.accessPoints?.at(-1)?.note).toContain('gangway');
    expect(route.logistics?.distanceLabel).toContain('one way');
    expect(route.logistics?.shuttle).toContain('one-way');
    expect(route.sourceLinks.some(source => source.url === 'https://cantonkayakclub.com/fells-point/')).toBe(true);
    expect(route.evidenceNotes.some(note => note.sourceUrl.endsWith(slug.endsWith('canton') ? '/canton-water-trail' : '/inner-harbor-heritage-water-trail'))).toBe(true);
  });

  it('keeps the corrected lines in their intended harbor corridors and aligned with both public access anchors', () => {
    for (const slug of slugs) {
      const route = getRiverBySlug(slug)!;
      const geometry = feature(slug);
      expect(geometry.properties.traceMode).toBe('curated-access-fallback');
      expect(geometry.properties.source).toContain('generalized planning line');
      expect(geometry.properties.generalizedPlanningLine).toBe(true);
      const line = geometry.geometry.coordinates[0] as [number, number][];
      expect(line[0][0]).toBeCloseTo(route.putIn!.longitude, 5);
      expect(line[0][1]).toBeCloseTo(route.putIn!.latitude, 5);
      expect(line.at(-1)![0]).toBeCloseTo(fells.longitude, 5);
      expect(line.at(-1)![1]).toBeCloseTo(fells.latitude, 5);
      expect(Math.min(...line.map(point => point[0]))).toBeGreaterThan(-76.613);
      if (slug.endsWith('inner-harbor-heritage')) {
        expect(Math.min(...line.map(point => point[1]))).toBeGreaterThan(39.278);
        expect(route.accessPoints?.[0].note).toContain('approximate dock-area anchor');
        expect(route.accessPoints?.[0].note).toContain('Rusty Scupper');
      } else {
        expect(Math.min(...line.map(point => point[0]))).toBeGreaterThan(-76.595);
      }
    }
  });

  it('withholds the unsupported Domino return loop without deleting its research record', () => {
    const slug = 'baltimore-blueway-domino-sugar';
    expect(routeAccessReviewHolds[slug]).toContain('point-to-point');
    expect(getRiverBySlug(slug)).toBeUndefined();
    const research = listAllRiversForAudit().find(route => route.slug === slug)!;
    expect(research).toBeDefined();
    expect(research.takeOut).toMatchObject({ latitude: research.putIn!.latitude, longitude: research.putIn!.longitude });
    expect(research.sourceLinks.length).toBeGreaterThan(0);
    expect(feature(slug).properties.routeId).toBe(slug);
  });
});
