import { describe, expect, it } from 'vitest';
import { washingtonYakimaCanyonRoutes } from './washington-yakima-canyon';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Washington Yakima Canyon starter routes', () => {
  it('provides three scored direct-gauge routes', () => {
    expect(washingtonYakimaCanyonRoutes).toHaveLength(6);
    expect(washingtonYakimaCanyonRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(washingtonYakimaCanyonRoutes.every(route => route.gaugeSource?.siteId === '12484500')).toBe(true);
    expect(washingtonYakimaCanyonRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(washingtonYakimaCanyonRoutes)).toEqual([]);
  });
});
