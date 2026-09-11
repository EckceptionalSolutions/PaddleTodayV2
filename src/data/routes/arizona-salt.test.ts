import { describe, expect, it } from 'vitest';
import { arizonaSaltRoutes } from './arizona-salt';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Arizona Lower Salt starter routes', () => {
  it('keeps three scored sections on the direct Stewart Mountain gauge', () => {
    expect(arizonaSaltRoutes).toHaveLength(3);
    expect(arizonaSaltRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(arizonaSaltRoutes.every(route => route.gaugeSource?.siteId === '09502000')).toBe(true);
    expect(arizonaSaltRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(arizonaSaltRoutes)).toEqual([]);
  });
});
