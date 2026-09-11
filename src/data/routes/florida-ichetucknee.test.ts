import { describe, expect, it } from 'vitest';
import { floridaIchetuckneeRoutes } from './florida-ichetucknee';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Florida Ichetucknee scored starter', () => {
  it('registers the documented three-mile spring-run itinerary', () => {
    expect(floridaIchetuckneeRoutes).toHaveLength(3);
    expect(floridaIchetuckneeRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(floridaIchetuckneeRoutes.every(route => route.gaugeSource.siteId === '02322700' && route.gaugeSource.metric === 'discharge_cfs' && route.gaugeSource.kind === 'direct')).toBe(true);
    expect(floridaIchetuckneeRoutes.every(route => rivers.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(auditRouteSafety(floridaIchetuckneeRoutes)).toEqual([]);
  });
});
