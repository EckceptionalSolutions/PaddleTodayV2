import { describe, expect, it } from 'vitest';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { publicRivers } from '../rivers';
import { getRouteGalleryPhotos } from '../route-gallery';
import { massachusettsWareExpansionRoutes } from './massachusetts-ware-expansion';

describe('Massachusetts Ware River Blue Trail route', () => {
  it('publishes the scored public park-to-New Furnace whitewater segment with reviewed details', () => {
    expect(massachusettsWareExpansionRoutes).toHaveLength(1);
    const [route] = massachusettsWareExpansionRoutes;

    expect(publicRivers.some((candidate) => candidate.id === route.id)).toBe(true);
    expect(route.scoreEligibility).toBe('scored');
    expect(route.routeType).toBe('whitewater');
    expect(route.gaugeSource).toMatchObject({ siteId: '01173500', kind: 'direct' });
    expect(route.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 400, idealMin: 500, idealMax: 1500 });
    expect(route.accessPoints?.map((point) => point.name)).toEqual([
      'Hardwick–Ware River Park access, river-right water entry',
      'Gilbertville/New Furnace public boat launch, river-right water entry',
    ]);
    expect(route.logistics?.campingClassification).toBe('none');
    expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route.safetyProfile?.safetyNotes?.join(' ')).toContain('live USGS 01173500');
    expect(getRouteGalleryPhotos(route)[0]).toMatchObject({
      src: '/gallery/ware-river-park-new-furnace/ware-river-gilbertville.jpg',
      credit: 'John Phelan (Faolin42) via Wikimedia Commons',
    });
    expect(auditRouteSafety([route])).toEqual([]);
  });
});
