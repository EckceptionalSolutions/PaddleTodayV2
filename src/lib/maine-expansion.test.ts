import { describe, expect, it } from 'vitest';
import { getRoutePreviewPhoto } from '../data/route-gallery';
import { maineRoutes } from '../data/routes/maine';
import { maineBatchTwoRoutes } from '../data/routes/maine-batch-two';
import { maineBatchThreeRoutes } from '../data/routes/maine-batch-three';
import { isPublicRoute } from '../data/route-publication';

const expectedFirstBatchIds = [
  'allagash-river-churchill-dam-umsaskis',
  'allagash-river-michaud-farm-allagash-falls',
  'allagash-river-allagash-falls-twin-brook',
  'saco-river-fryeburg-route-302-route-160',
  'saco-river-route-160-brownfield',
  'androscoggin-river-hanover-bethel',
  'androscoggin-river-mexico-rumford',
  'kennebec-river-skowhegan-norridgewock',
  'presumpscot-river-gorham-falmouth',
  'saint-croix-river-baileyville-calais',
  'aroostook-river-washburn-fort-fairfield',
];
const expectedSecondBatchIds = [
  'penobscot-river-medway-lincoln',
  'penobscot-river-lincoln-passadumkeag',
  'penobscot-river-passadumkeag-milford',
  'penobscot-river-milford-bangor',
  'penobscot-river-bangor-verona',
  'west-branch-penobscot-river-t3r11-t2r10',
  'st-john-river-saint-francis-fort-kent',
  'st-john-river-fort-kent-frenchville',
  'st-john-river-frenchville-madawaska',
  'kennebec-river-solon-norridgewock',
  'kennebec-river-waterville-augusta',
  'kennebec-river-augusta-gardiner',
  'kennebec-river-gardiner-bath',
  'saco-river-brownfield-dayton',
  'saco-river-dayton-biddeford',
  'machias-river-t31md-machias',
  'chamberlain-lake-dacf-remote-loop',
  'chesuncook-lake-t3r12-remote-loop',
  'lake-onawa-difw-access-loop',
  'lake-george-skowhegan-access-loop',
  'webb-lake-dacf-access-loop',
];
const expectedIds = [...expectedFirstBatchIds, ...expectedSecondBatchIds, ...maineBatchThreeRoutes.map((route) => route.id)];
const allMaineRoutes = [...maineRoutes, ...maineBatchTwoRoutes, ...maineBatchThreeRoutes];

describe('Maine expansion coverage', () => {
  it('publishes the expected reviewed planning batch with unique IDs and slugs', () => {
    expect(allMaineRoutes).toHaveLength(100);
    expect(allMaineRoutes).toHaveLength(expectedIds.length);
    expect(allMaineRoutes.map((route) => route.id)).toEqual(expectedIds);
    expect(new Set(allMaineRoutes.map((route) => route.id)).size).toBe(allMaineRoutes.length);
    expect(new Set(allMaineRoutes.map((route) => route.slug)).size).toBe(allMaineRoutes.length);
    expect(allMaineRoutes.every((route) => route.state === 'Maine')).toBe(true);
    expect(allMaineRoutes.every((route) => route.scoreEligibility === 'planning')).toBe(true);
    expect(allMaineRoutes.every((route) => isPublicRoute(route))).toBe(true);
  });

  it('covers the intended basins and gauge posture', () => {
    expect(new Set(allMaineRoutes.map((route) => route.riverId))).toEqual(new Set([
      'allagash-river', 'saco-river', 'androscoggin-river', 'kennebec-river', 'presumpscot-river', 'saint-croix-river', 'aroostook-river',
      'penobscot-river', 'west-branch-penobscot-river', 'st-john-river', 'machias-river', 'chamberlain-lake', 'chesuncook-lake', 'lake-onawa', 'lake-george', 'webb-lake',
      'moosehead-lake', 'flagstaff-lake', 'pleasant-river', 'piscataquis-river', 'sebec-lake',
    ]));
    expect(allMaineRoutes.filter((route) => route.gaugeSource.kind === 'direct')).toHaveLength(31);
    expect(allMaineRoutes.filter((route) => route.gaugeSource.kind === 'proxy')).toHaveLength(69);
    expect(allMaineRoutes.every((route) => route.gaugeSource.provider === 'usgs' && route.gaugeSource.siteId.length > 0)).toBe(true);
  });

  it('has named public endpoints, safety/camping evidence, and non-placeholder imagery', () => {
    for (const route of allMaineRoutes) {
      expect(route.putIn?.name).toBeTruthy();
      expect(route.takeOut?.name).toBeTruthy();
      expect(route.accessPoints?.length).toBeGreaterThanOrEqual(2);
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route.safetyProfile?.hazards.length).toBeGreaterThan(0);
      expect(route.logistics?.campingClassification).toBeTruthy();
      expect(route.evidenceNotes.length).toBeGreaterThanOrEqual(6);
      const photo = getRoutePreviewPhoto(route);
      expect(photo.isPlaceholder).toBe(false);
      expect(photo.src).toMatch(/^https?:\/\//);
    }
  });

  it('marks consolidation candidates without treating intentional overlaps as duplicates', () => {
    const routesById = new Map(allMaineRoutes.map((route) => [route.id, route]));
    const marked = allMaineRoutes.filter((route) => route.consolidation);
    expect(marked.map((route) => route.id)).toEqual([
      'penobscot-river-milford-bangor',
      'kennebec-river-solon-norridgewock',
      'aroostook-river-masardis-washburn',
      'saco-river-fryeburg-dayton',
      'saint-croix-river-lambert-baileyville',
    ]);
    for (const route of marked) {
      expect(route.evidenceNotes.find((note) => note.label === 'Overlap decision')?.value).toContain(route.consolidation?.role);
      for (const relatedId of route.consolidation?.relatedRouteIds ?? []) {
        expect(routesById.has(relatedId)).toBe(true);
      }
    }
  });
});
