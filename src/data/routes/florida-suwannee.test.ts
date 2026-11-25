import { describe, expect, it } from 'vitest';
import { floridaSuwanneeRoutes } from './florida-suwannee';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Florida Suwannee starter routes', () => {
  it('connects the White Springs overnight legs at the same river-only camp landing', () => {
    const firstDay = rivers.find(route => route.id === 'suwannee-river-wayside-woods-ferry');
    const secondDay = rivers.find(route => route.id === 'suwannee-river-woods-ferry-spirit');
    expect(firstDay?.putIn?.name).toContain('Wayside Park');
    expect(firstDay?.takeOut).toEqual(secondDay?.putIn);
    expect(firstDay?.accessPoints?.map(point => point.mileFromStart)).toEqual([0, 2.7, 13]);
    expect(firstDay?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(firstDay?.logistics?.shuttle).toContain('no guest vehicle access');
  });

  it('keeps the scored trail reaches on direct White Springs stage telemetry', () => {
    expect(floridaSuwanneeRoutes).toHaveLength(45);
    expect(floridaSuwanneeRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(floridaSuwanneeRoutes.every(route => route.gaugeSource?.siteId === '02315500')).toBe(true);
    expect(floridaSuwanneeRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(floridaSuwanneeRoutes)).toEqual([]);
  });
});
