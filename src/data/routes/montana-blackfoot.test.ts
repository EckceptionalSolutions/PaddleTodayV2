import { describe, expect, it } from 'vitest';
import { montanaBlackfootRoutes } from './montana-blackfoot';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Montana Blackfoot scored starter', () => {
  it('registers a direct-gauge public-access reach with camping and safety guidance', () => {
    expect(montanaBlackfootRoutes).toHaveLength(24);
    const [route] = montanaBlackfootRoutes;
    expect(route.scoreEligibility).toBe('scored');
    expect(route.gaugeSource?.siteId).toBe('12340000');
    expect(route.putIn?.latitude).toBeCloseTo(46.943, 3);
    expect(route.takeOut?.longitude).toBeCloseTo(-113.679, 3);
    expect(route.logistics?.camping).toMatch(/designated FWP float-in campsites/i);
    expect(rivers.some(candidate => candidate.slug === route.slug)).toBe(true);
    expect(auditRouteSafety(montanaBlackfootRoutes)).toEqual([]);
  });
});
