import { describe, expect, it } from 'vitest';
import { floridaSuwanneeRoutes } from './florida-suwannee';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Florida Suwannee starter routes', () => {
  it('keeps three scored upper-trail reaches on direct White Springs stage telemetry', () => {
    expect(floridaSuwanneeRoutes).toHaveLength(3);
    expect(floridaSuwanneeRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(floridaSuwanneeRoutes.every(route => route.gaugeSource?.siteId === '02315500')).toBe(true);
    expect(floridaSuwanneeRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(floridaSuwanneeRoutes)).toEqual([]);
  });
});
