import { describe, expect, it } from 'vitest';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { publicRivers } from '../rivers';
import { massachusettsQuaboagRoutes } from './massachusetts-quaboag';

describe('Massachusetts Quaboag River route', () => {
  it('publishes the documented Lucy Stone to Route 67 reach with reviewed metadata', () => {
    expect(massachusettsQuaboagRoutes).toHaveLength(2);
    for (const route of massachusettsQuaboagRoutes) {
      expect(publicRivers.some((candidate) => candidate.id === route.id)).toBe(true);
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource).toMatchObject({ siteId: '01176000', kind: 'direct' });
      expect(route.accessPoints?.every((point) => point.name.toLowerCase().includes('water-entry edge') || point.name.toLowerCase().includes('portage'))).toBe(true);
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(auditRouteSafety([route])).toEqual([]);
    }
    expect(massachusettsQuaboagRoutes[0].accessPoints).toHaveLength(4);
    expect(massachusettsQuaboagRoutes[1].accessPoints).toHaveLength(2);
    expect(massachusettsQuaboagRoutes[1].logistics?.accessCaveats?.join(' ')).toContain('tow-away lot');
  });
});
