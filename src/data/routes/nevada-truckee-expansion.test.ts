import { describe, expect, it } from 'vitest';
import { nevadaTruckeeExpansionRoutes } from './nevada-truckee-expansion';
import { getRouteGalleryPhotos } from '../route-gallery';

describe('Nevada Truckee expansion routes', () => {
  it('publishes scored, access-bounded Reno and Lower Truckee reaches', () => {
    expect(nevadaTruckeeExpansionRoutes).toHaveLength(18);
    for (const route of nevadaTruckeeExpansionRoutes) {
      expect(route.scoreEligibility).toBe('scored');
      expect(route.state).toBe('Nevada');
      expect(route.accessPoints).toHaveLength(2);
      expect(['community', 'official']).toContain(route.profile?.thresholdSourceStrength);
      expect(route.safetyProfile?.safetyNotes.length).toBeGreaterThanOrEqual(3);
      expect(route.logistics?.camping).toBeTruthy();
    }
    for (const id of ['truckee-river-crystal-peak-crissie-caughlin', 'truckee-river-mayberry-crissie-caughlin', 'truckee-river-crissie-caughlin-idlewild']) {
      const route = nevadaTruckeeExpansionRoutes.find((candidate) => candidate.id === id);
      expect(route).toBeDefined();
      expect(route!.logistics?.campingClassification).toBe('none');
      expect(route!.logistics?.camping).toContain('No overnight camping');
      expect(route!.safetyProfile?.reviewStatus).toBe('reviewed');
    }

    const lowerReach = nevadaTruckeeExpansionRoutes.find((route) => route.id === 'truckee-river-lockwood-usa-parkway');
    expect(lowerReach).toMatchObject({ state: 'Nevada', region: 'Washoe and Storey Counties / Lockwood–McCarran Ranch' });
    expect(lowerReach?.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 400, idealMin: 400, thresholdSourceStrength: 'official' });
    expect(lowerReach?.gaugeSource).toMatchObject({ siteId: '10350000', kind: 'direct' });
    expect(lowerReach?.putIn?.name).toContain('Lockwood Trailhead Park');
    expect(lowerReach?.takeOut?.name).toContain('USA Parkway Bridge');
    expect(lowerReach?.logistics?.campingClassification).toBe('none');
    expect(lowerReach?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(getRouteGalleryPhotos(lowerReach!)[0]).toMatchObject({
      id: 'truckee-lower-river-sparks-fernley-commons',
      credit: 'Ken Lund via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    });

    const upperReach = nevadaTruckeeExpansionRoutes.find((route) => route.id === 'truckee-river-floriston-crystal-peak');
    expect(upperReach).toMatchObject({
      state: 'Nevada',
      region: 'Truckee River / Floriston Gorge and Verdi, California–Nevada',
      scoreEligibility: 'scored',
      consolidation: { role: 'segment', relatedRouteIds: ['truckee-river-crystal-peak-mayberry'] },
    });
    expect(upperReach?.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 700, idealMin: 700, thresholdSourceStrength: 'official', difficulty: 'hard' });
    expect(upperReach?.gaugeSource).toMatchObject({ siteId: '10346000', kind: 'direct' });
    expect(upperReach?.putIn?.name).toContain('Floriston I-80 bridge');
    expect(upperReach?.takeOut?.name).toContain('Crystal Peak Park');
    expect(upperReach?.logistics).toMatchObject({ campingClassification: 'none' });
    expect(upperReach?.safetyProfile?.safetyNotes.join(' ')).toContain('Class III–IV');
    expect(getRouteGalleryPhotos(upperReach!)[0]).toMatchObject({
      src: '/gallery/truckee-river-floriston-crystal-peak/truckee-river-verdi.jpg',
      credit: 'Ken Lund via Wikimedia Commons',
      takenLabel: 'CC BY-SA 2.0; source copy unchanged',
    });
  });
});
