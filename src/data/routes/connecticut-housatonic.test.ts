import { describe, expect, it } from 'vitest';
import { connecticutHousatonicRoutes } from './connecticut-housatonic';
import { publicRivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Connecticut Housatonic starter routes', () => {
  it('contains three documented reaches with direct Falls Village telemetry', () => {
    expect(connecticutHousatonicRoutes).toHaveLength(3);
    expect(connecticutHousatonicRoutes.filter(route => route.scoreEligibility === 'scored')).toHaveLength(1);
    expect(connecticutHousatonicRoutes.every(route => route.gaugeSource.siteId === '01199000')).toBe(true);
    expect(connecticutHousatonicRoutes.every(route => publicRivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(connecticutHousatonicRoutes)).toEqual([]);
  });
});
