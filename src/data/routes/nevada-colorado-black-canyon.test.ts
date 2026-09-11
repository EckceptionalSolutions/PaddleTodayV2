import { describe, expect, it } from 'vitest';
import { nevadaColoradoBlackCanyonRoutes } from './nevada-colorado-black-canyon';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Nevada Colorado River scored starter', () => {
  it('registers six direct-gauge Black Canyon reaches', () => {
    expect(nevadaColoradoBlackCanyonRoutes).toHaveLength(6);
    expect(nevadaColoradoBlackCanyonRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(nevadaColoradoBlackCanyonRoutes.every(route => rivers.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(nevadaColoradoBlackCanyonRoutes.every(route => route.gaugeSource?.siteId === '09421500')).toBe(true);
    expect(auditRouteSafety(nevadaColoradoBlackCanyonRoutes)).toEqual([]);
  });
});
