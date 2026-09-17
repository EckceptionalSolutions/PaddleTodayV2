import { describe, expect, it } from 'vitest';
import { newMexicoAnimasRoutes } from './new-mexico-animas';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { getRouteGalleryPhotos } from '../route-gallery';

describe('New Mexico Animas routes', () => {
  it('keeps the public paddle trails scored and safety complete', () => {
    expect(newMexicoAnimasRoutes).toHaveLength(10);
    expect(new Set(newMexicoAnimasRoutes.map(route => route.id)).size).toBe(10);
    for (const route of newMexicoAnimasRoutes) {
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource?.kind).toBe('direct');
      expect(route.accessPoints?.length).toBeGreaterThanOrEqual(2);
      expect(route.accessPoints?.[0]?.mileFromStart).toBe(0);
      expect(route.accessPoints?.at(-1)?.mileFromStart).toBeGreaterThan(0);
      expect(route.accessPoints?.every((point, index, points) => index === 0 || (point.mileFromStart ?? 0) > (points[index - 1]?.mileFromStart ?? 0))).toBe(true);
      expect(route.logistics?.camping).toBeTruthy();
      expect(route.sourceLinks?.length).toBeGreaterThanOrEqual(4);
      expect(auditRouteSafety([route])).toEqual([]);
    }
  });

  it('scores Cedar Hill to Aztec from its route-specific flow cue and verified endpoints', () => {
    const route = newMexicoAnimasRoutes.find(item => item.id === 'animas-river-cedar-hill-aztec-riverside');
    expect(route).toMatchObject({
      scoreEligibility: 'scored',
      gaugeSource: { siteId: '09364010', kind: 'direct' },
      profile: { tooLow: 700, idealMin: 900, thresholdSourceStrength: 'community' },
      putIn: { latitude: 36.933222, longitude: -107.893921 },
      takeOut: { latitude: 36.820633, longitude: -108.008483 },
      logistics: { campingClassification: 'on_route_campsite' },
    });
    expect(route?.sourceLinks.map(source => source.url)).toContain('https://www.aztecnm.com/recreation/animasriver.html');
  });

  it('keeps Cedar Hill extension distances, bailouts, camping and direct gauge matches documented', () => {
    const pennyLane = newMexicoAnimasRoutes.find(item => item.id === 'animas-river-cedar-hill-penny-lane');
    const animasPark = newMexicoAnimasRoutes.find(item => item.id === 'animas-river-cedar-hill-animas-park');
    const boydPark = newMexicoAnimasRoutes.find(item => item.id === 'animas-river-cedar-hill-boyd-park');

    expect(pennyLane).toMatchObject({
      scoreEligibility: 'scored',
      gaugeSource: { siteId: '09364200', kind: 'direct' },
      profile: { tooLow: 700, idealMin: 900, thresholdSourceStrength: 'community' },
      logistics: { campingClassification: 'on_route_campsite' },
    });
    expect(pennyLane?.accessPoints?.map(point => [point.name, point.mileFromStart])).toEqual([
      ['Cedar Hill 550 Bridge County Boat Ramp (water-entry edge)', 0],
      ['Aztec Riverside Park public landing (water-entry edge)', 12.5],
      ['Penny Lane public boat ramp (water-entry edge)', 19.8],
    ]);

    expect(animasPark).toMatchObject({
      scoreEligibility: 'scored',
      gaugeSource: { siteId: '09364500', kind: 'direct' },
      logistics: { campingClassification: 'on_route_campsite' },
    });
    expect(animasPark?.accessPoints).toHaveLength(4);
    expect(boydPark).toMatchObject({
      scoreEligibility: 'scored',
      gaugeSource: { siteId: '09364500', kind: 'direct' },
      logistics: { campingClassification: 'on_route_campsite' },
    });
    expect(boydPark?.accessPoints).toHaveLength(5);
    for (const route of [pennyLane, animasPark, boydPark]) {
      expect(route?.safetyProfile?.safetyNotes.join(' ')).toContain('Animas Ditch');
      expect(getRouteGalleryPhotos(route!).map(photo => photo.src)).toContain('/gallery/animas-cedar-hill-corridor/animas-river-cedar-hill.jpg');
    }
  });
});
