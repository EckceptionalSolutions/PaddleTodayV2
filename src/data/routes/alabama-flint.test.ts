import { describe, expect, it } from 'vitest';
import { alabamaFlintRoutes } from './alabama-flint';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Alabama Flint River starter routes', () => {
  it('provides three scored direct-stage routes', () => {
    expect(alabamaFlintRoutes).toHaveLength(4);
    expect(alabamaFlintRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(alabamaFlintRoutes.every(route => route.gaugeSource?.siteId === '03575100')).toBe(true);
    expect(alabamaFlintRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(alabamaFlintRoutes)).toEqual([]);
  });
});
