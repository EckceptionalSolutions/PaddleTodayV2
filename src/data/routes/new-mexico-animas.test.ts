import { describe, expect, it } from 'vitest';
import { newMexicoAnimasRoutes } from './new-mexico-animas';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('New Mexico Animas routes', () => {
  it('keeps the public paddle trails scored and safety complete', () => {
    expect(newMexicoAnimasRoutes).toHaveLength(6);
    expect(new Set(newMexicoAnimasRoutes.map(route => route.id)).size).toBe(6);
    for (const route of newMexicoAnimasRoutes) {
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource?.kind).toBe('direct');
      expect(route.accessPoints).toHaveLength(2);
      expect(route.logistics?.camping).toBeTruthy();
      expect(route.sourceLinks?.length).toBeGreaterThanOrEqual(4);
      expect(auditRouteSafety([route])).toEqual([]);
    }
  });
});
