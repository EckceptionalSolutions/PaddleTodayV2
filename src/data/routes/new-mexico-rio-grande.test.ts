import { describe, expect, it } from 'vitest';
import { newMexicoRioGrandeRoutes } from './new-mexico-rio-grande';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('New Mexico Rio Grande starter routes', () => {
  it('provides six scored, gauge-backed routes', () => {
    expect(newMexicoRioGrandeRoutes).toHaveLength(6);
    expect(newMexicoRioGrandeRoutes.every((route) => route.scoreEligibility === 'scored')).toBe(true);
    expect(newMexicoRioGrandeRoutes.every((route) => route.gaugeSource?.siteId === '08276500')).toBe(true);
    expect(newMexicoRioGrandeRoutes.every((route) => rivers.some((candidate) => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(newMexicoRioGrandeRoutes)).toEqual([]);
  });
});
