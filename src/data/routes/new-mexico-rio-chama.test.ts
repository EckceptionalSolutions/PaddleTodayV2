import { describe, expect, it } from 'vitest';
import { newMexicoRioChamaRoutes } from './new-mexico-rio-chama';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('New Mexico Rio Chama routes', () => {
  it('has three scored, direct-gauge routes with complete safety metadata', () => {
    expect(newMexicoRioChamaRoutes).toHaveLength(3);
    expect(new Set(newMexicoRioChamaRoutes.map(route => route.id)).size).toBe(3);
    expect(newMexicoRioChamaRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(newMexicoRioChamaRoutes.every(route => route.gaugeSource?.siteId === '08285500')).toBe(true);
    expect(newMexicoRioChamaRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(newMexicoRioChamaRoutes)).toEqual([]);
  });
});
