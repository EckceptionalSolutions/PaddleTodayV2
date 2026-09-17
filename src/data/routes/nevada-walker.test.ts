import { describe, expect, it } from 'vitest';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { publicRivers } from '../rivers';
import { getRouteGalleryPhotos } from '../route-gallery';
import { nevadaWalkerRoutes } from './nevada-walker';

describe('Nevada Pitchfork Ranch East Walker route family', () => {
  it('publishes scored longer access-pair options with reviewed details', () => {
    const addedRoutes = nevadaWalkerRoutes.filter((route) => [
      'east-walker-river-squeeze-riverbend',
      'east-walker-river-skull-last-call',
      'east-walker-river-squeeze-last-call',
    ].includes(route.id));

    expect(addedRoutes).toHaveLength(3);
    expect(addedRoutes.map((route) => route.logistics?.distanceLabel)).toEqual([
      'About 3.6 river miles',
      'About 2.8 river miles',
      'About 5.6 river miles',
    ]);

    for (const route of addedRoutes) {
      expect(publicRivers.some((candidate) => candidate.id === route.id)).toBe(true);
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource).toMatchObject({ siteId: '10293500', kind: 'direct' });
      expect(route.accessPoints).toHaveLength(2);
      expect(route.accessPoints?.every((point) => point.latitude && point.longitude)).toBe(true);
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(getRouteGalleryPhotos(route)).toHaveLength(1);
      expect(getRouteGalleryPhotos(route)[0].alt).toContain('East Walker River');
      expect(auditRouteSafety([route])).toEqual([]);
    }

    expect(addedRoutes[2].accessPoints?.[1].name).toContain('Last Call');
    expect(addedRoutes[2].logistics?.accessCaveats?.join(' ')).toContain('there is no portage');
  });
});
