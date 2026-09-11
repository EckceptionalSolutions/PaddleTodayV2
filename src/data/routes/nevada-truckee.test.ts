import { describe, expect, it } from 'vitest';
import { nevadaTruckeeRoutes } from './nevada-truckee';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Nevada Truckee starter routes', () => {
  it('keeps three scored Reno reaches on direct telemetry', () => {
    expect(nevadaTruckeeRoutes).toHaveLength(3);
    expect(nevadaTruckeeRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(nevadaTruckeeRoutes.every(route => route.gaugeSource?.siteId === '10348000')).toBe(true);
    expect(nevadaTruckeeRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(nevadaTruckeeRoutes)).toEqual([]);
  });
});
