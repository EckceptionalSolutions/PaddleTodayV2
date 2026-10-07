import { describe, expect, it } from 'vitest';
import { californiaRussianRoutes } from './california-russian';
import { rivers } from '../rivers';
import { listRivers } from '../../lib/rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('California Russian River starter routes', () => {
  it('keeps the scored sections gauged and planning-only options out of scoring', () => {
    expect(californiaRussianRoutes).toHaveLength(21);
    const scored = californiaRussianRoutes.filter(route => route.scoreEligibility === 'scored');
    const planning = californiaRussianRoutes.filter(route => route.scoreEligibility === 'planning');
    expect(scored).toHaveLength(17);
    expect(planning).toHaveLength(4);
    expect(scored.every(route => ['11464000', '11467000'].includes(route.gaugeSource?.siteId ?? ''))).toBe(true);
    expect(scored.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(planning.every(route => !rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(californiaRussianRoutes.every(route => listRivers().some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(californiaRussianRoutes)).toEqual([]);
  });
});
