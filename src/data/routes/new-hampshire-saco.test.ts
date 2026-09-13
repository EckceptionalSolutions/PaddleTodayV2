import { describe, expect, it } from 'vitest';
import { newHampshireSacoRoutes } from './new-hampshire-saco';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('New Hampshire Saco scored starter', () => {
  it('registers direct-gauge public-access reaches with safety and camping guidance', () => {
    expect(newHampshireSacoRoutes.length).toBeGreaterThanOrEqual(10);
    expect(newHampshireSacoRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(newHampshireSacoRoutes.every(route => route.gaugeSource?.siteId === '01064500')).toBe(true);
    expect(newHampshireSacoRoutes.every(route => route.logistics?.campingClassification === 'none')).toBe(true);
    expect(newHampshireSacoRoutes.every(route => route.accessPoints?.every(point => point.latitude && point.longitude))).toBe(true);
    expect(newHampshireSacoRoutes.every(route => rivers.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(auditRouteSafety(newHampshireSacoRoutes)).toEqual([]);
  });
});
