import { describe, expect, it } from 'vitest';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { publicRivers } from '../rivers';
import { massachusettsConnecticutTurnersRoutes } from './massachusetts-connecticut-turners';

describe('Massachusetts Connecticut River Turners Falls route', () => {
  it('publishes the documented bypass with reviewed safety and access metadata', () => {
    expect(massachusettsConnecticutTurnersRoutes).toHaveLength(1);
    const route = massachusettsConnecticutTurnersRoutes[0];
    expect(publicRivers.some((candidate) => candidate.id === route.id)).toBe(true);
    expect(route.scoreEligibility).toBe('scored');
    expect(route.gaugeSource).toMatchObject({ siteId: '01170500', kind: 'direct' });
    expect(route.accessPoints).toHaveLength(2);
    expect(route.accessPoints?.every((point) => point.name.toLowerCase().includes('water-entry edge'))).toBe(true);
    expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(auditRouteSafety([route])).toEqual([]);
  });
});
