import { describe, expect, it } from 'vitest';
import { newMexicoBosqueRioGrandeRoutes } from './new-mexico-bosque-rio-grande';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('New Mexico Bosque Rio Grande routes', () => {
  it('keeps both public-access reaches scored and safety complete', () => {
    expect(newMexicoBosqueRioGrandeRoutes).toHaveLength(1);
    expect(new Set(newMexicoBosqueRioGrandeRoutes.map(route => route.id)).size).toBe(1);
    for (const route of newMexicoBosqueRioGrandeRoutes) {
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource?.kind).toBe('direct');
      expect(route.accessPoints).toHaveLength(2);
      expect(route.logistics?.camping).toBeTruthy();
      expect(route.sourceLinks?.length).toBeGreaterThanOrEqual(3);
      expect(auditRouteSafety([route])).toEqual([]);
    }
  });
});
