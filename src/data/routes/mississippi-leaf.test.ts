import { describe, expect, it } from 'vitest';
import { mississippiLeafRoutes } from './mississippi-leaf';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Mississippi Leaf River scored routes', () => {
  it('registers public blueway access-chain reaches on the direct Collins gauge', () => {
    expect(mississippiLeafRoutes).toHaveLength(10);
    expect(mississippiLeafRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(mississippiLeafRoutes.every(route => route.gaugeSource?.siteId === '02472000')).toBe(true);
    expect(mississippiLeafRoutes.every(route => route.logistics?.campingClassification === 'none')).toBe(true);
    expect(mississippiLeafRoutes.every(route => route.accessPoints?.every(point => point.latitude !== undefined && point.longitude !== undefined))).toBe(true);
    expect(mississippiLeafRoutes.every(route => rivers.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(auditRouteSafety(mississippiLeafRoutes)).toEqual([]);
  });
});
