import { describe, expect, it } from 'vitest';
import { massachusettsMillersRoutes } from './massachusetts-millers';
import { rivers } from '../rivers';
import { getRoutePreviewPhoto } from '../route-gallery';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Massachusetts Millers scored starter', () => {
  it('registers the direct-gauge public-access lower reach', () => {
    const [route] = massachusettsMillersRoutes;
    expect(route.scoreEligibility).toBe('scored');
    expect(route.gaugeSource?.siteId).toBe('01166500');
    expect(route.putIn?.latitude).toBeCloseTo(42.598533, 5);
    expect(route.takeOut?.longitude).toBeCloseTo(-72.49179, 5);
    expect(route.logistics?.camping).toMatch(/No overnight camping/i);
    expect(rivers.some(candidate => candidate.slug === route.slug)).toBe(true);
    expect(getRoutePreviewPhoto(route).isPlaceholder).toBe(false);
    expect(auditRouteSafety(massachusettsMillersRoutes)).toEqual([]);
  });
});
