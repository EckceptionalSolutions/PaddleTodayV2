import { describe, expect, it } from 'vitest';
import { nevadaEastForkCarsonRoutes } from './nevada-east-fork-carson';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { getApprovedRoutePhotos } from '../route-gallery';
import { rivers } from '../rivers';

describe('Nevada East Fork Carson route', () => {
  it('publishes the popular scored cross-border run with verified access and safety detail', () => {
    expect(nevadaEastForkCarsonRoutes).toHaveLength(1);
    const route = nevadaEastForkCarsonRoutes[0];

    expect(route.id).toBe('east-fork-carson-hangmans-bridge-washoe-road');
    expect(rivers.some(candidate => candidate.id === route.id)).toBe(true);
    expect(route.state).toBe('Nevada');
    expect(route.scoreEligibility).toBe('scored');
    expect(route.gaugeSource).toMatchObject({ siteId: '10309000', kind: 'direct' });
    expect(route.profile).toMatchObject({
      thresholdModel: 'two-sided',
      tooLow: 600,
      idealMin: 1275,
      idealMax: 1725,
      tooHigh: 5000,
      thresholdSourceStrength: 'community',
    });
    expect(route.putIn).toMatchObject({ latitude: 38.6898, longitude: -119.76551 });
    expect(route.takeOut).toMatchObject({ latitude: 38.86955, longitude: -119.69331 });
    expect(route.accessPoints?.map(point => point.mileFromStart)).toEqual([0, 19.12]);
    expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route.logistics?.camping).toContain('East Fork Resort');
    expect(route.safetyProfile?.safetyNotes.join(' ')).toContain('Ruhenstroth Dam');
    expect(route.sourceLinks?.length).toBeGreaterThanOrEqual(6);
    expect(auditRouteSafety([route])).toEqual([]);
    expect(getApprovedRoutePhotos(route.id)).toMatchObject([
      { src: '/gallery/nevada-east-fork-carson/east-fork-carson-rafting.jpg', credit: 'Matkatamiba via Wikimedia Commons' },
    ]);
  });
});
