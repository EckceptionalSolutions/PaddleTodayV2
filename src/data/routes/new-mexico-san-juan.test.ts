import { describe, expect, it } from 'vitest';
import { newMexicoSanJuanRoutes } from './new-mexico-san-juan';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('New Mexico San Juan routes', () => {
  it('keeps public access, direct gauges, camping and safety evidence complete', () => {
    expect(newMexicoSanJuanRoutes).toHaveLength(6);
    expect(new Set(newMexicoSanJuanRoutes.map(route => route.id)).size).toBe(6);
    for (const route of newMexicoSanJuanRoutes) {
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource?.kind).toBe('direct');
      expect(route.accessPoints).toHaveLength(2);
      expect(route.logistics?.camping).toBeTruthy();
      expect(route.sourceLinks?.length).toBeGreaterThanOrEqual(4);
      expect(auditRouteSafety([route])).toEqual([]);
    }
  });
});
