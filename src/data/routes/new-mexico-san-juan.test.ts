import { describe, expect, it } from 'vitest';
import { newMexicoSanJuanRoutes } from './new-mexico-san-juan';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { getApprovedRoutePhotos } from '../route-gallery';

describe('New Mexico San Juan routes', () => {
  it('keeps public access, direct gauges, camping and safety evidence complete', () => {
    expect(newMexicoSanJuanRoutes).toHaveLength(11);
    expect(new Set(newMexicoSanJuanRoutes.map(route => route.id)).size).toBe(11);
    for (const route of newMexicoSanJuanRoutes) {
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource?.kind).toBe('direct');
      expect(route.accessPoints?.length).toBeGreaterThanOrEqual(2);
      expect(route.logistics?.camping).toBeTruthy();
      expect(route.sourceLinks?.length).toBeGreaterThanOrEqual(4);
      expect(auditRouteSafety([route])).toEqual([]);
    }
  });

  it('uses the current Farmington access sequence with distinct, documented overlaps', () => {
    const short = newMexicoSanJuanRoutes.find(route => route.id === 'san-juan-river-among-waters-westland-park');
    const classic = newMexicoSanJuanRoutes.find(route => route.id === 'san-juan-river-westland-lions-park');
    const extended = newMexicoSanJuanRoutes.find(route => route.id === 'san-juan-river-among-waters-lions-park');
    const veredaWestland = newMexicoSanJuanRoutes.find(route => route.id === 'san-juan-river-vereda-westland-park');
    const veredaLions = newMexicoSanJuanRoutes.find(route => route.id === 'san-juan-river-vereda-lions-park');

    expect(short?.profile.tooLow).toBe(300);
    expect(short?.takeOut?.name).toContain('Westland Park');
    expect(classic?.profile.tooLow).toBe(300);
    expect(classic?.profile.idealMin).toBe(500);
    expect(classic?.takeOut?.name).toContain('Kirtland Lions Park');
    expect(extended?.accessPoints).toHaveLength(3);
    expect(extended?.accessPoints?.[1]).toMatchObject({
      id: 'san-juan-river-among-waters-lions-park-westland-intermediate',
      mileFromStart: 2.24,
      latitude: 36.7331514,
      longitude: -108.2494733,
    });
    expect(extended?.consolidation?.relatedRouteIds).toContain('san-juan-river-vereda-among-waters');
    expect(extended?.logistics?.campingClassification).toBe('none');
    expect(extended?.safetyProfile?.hazards).not.toContain('dam');
    expect(veredaWestland?.logistics?.distanceLabel).toContain('19.14');
    expect(veredaWestland?.accessPoints?.[1]).toMatchObject({
      id: 'san-juan-river-vereda-westland-park-intermediate',
      mileFromStart: 16.9,
      latitude: 36.7214944,
      longitude: -108.2238722,
    });
    expect(veredaWestland?.consolidation?.relatedRouteIds).toContain('san-juan-river-among-waters-westland-park');
    expect(veredaLions?.logistics?.distanceLabel).toContain('24.64');
    expect(veredaLions?.accessPoints).toHaveLength(4);
    expect(veredaLions?.logistics?.campingClassification).toBe('none');
    for (const route of [short, classic, extended, veredaWestland, veredaLions]) {
      expect(route?.accessPoints?.every(point => Number.isFinite(point.latitude) && Number.isFinite(point.longitude))).toBe(true);
      expect(getApprovedRoutePhotos(route!.id)).toHaveLength(1);
    }
  });
});
