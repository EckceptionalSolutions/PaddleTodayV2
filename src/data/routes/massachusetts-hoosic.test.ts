import { describe, expect, it } from 'vitest';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { publicRivers } from '../rivers';
import { getRouteGalleryPhotos } from '../route-gallery';
import { massachusettsHoosicRoutes } from './massachusetts-hoosic';

describe('Massachusetts Hoosic River route', () => {
  it('publishes the documented scored Ashton-to-Lauren’s Launch reach with reviewed details', () => {
    expect(massachusettsHoosicRoutes).toHaveLength(1);
    const [route] = massachusettsHoosicRoutes;

    expect(publicRivers.some((candidate) => candidate.id === route.id)).toBe(true);
    expect(route.scoreEligibility).toBe('scored');
    expect(route.gaugeSource).toMatchObject({ siteId: '01332500', kind: 'direct' });
    expect(route.profile).toMatchObject({ tooLow: 200, idealMin: 200, idealMax: 700, tooHigh: 700 });
    expect(route.accessPoints).toHaveLength(2);
    expect(route.accessPoints?.every((point) => point.latitude !== 0 && point.longitude !== 0)).toBe(true);
    expect(route.accessPoints?.map((point) => point.name)).toEqual([
      'Ashton Avenue public canoe access / Joe Girardi Park water-entry edge',
      'Lauren’s Launch sandy beach water-entry edge',
    ]);
    expect(route.logistics?.campingClassification).toBe('none');
    expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route.safetyProfile?.safetyNotes?.join(' ')).toContain('six short portages');
    expect(getRouteGalleryPhotos(route)[0]).toMatchObject({
      src: '/gallery/hoosic-river-ashton-lauren/hoosic-river-north-adams.jpg',
      credit: 'John Phelan (Faolin42) via Wikimedia Commons',
    });
    expect(auditRouteSafety([route])).toEqual([]);
  });
});
