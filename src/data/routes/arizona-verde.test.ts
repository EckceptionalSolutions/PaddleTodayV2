import { describe, expect, it } from 'vitest';
import { arizonaVerdeRoutes } from './arizona-verde';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Arizona Verde starter routes', () => {
  it('keeps the three lower-Verde routes scored and on the Camp Verde gauge', () => {
    const lower = arizonaVerdeRoutes.filter(route => route.id.includes('white-bridge') || route.id.includes('clear-creek-beasley'));
    expect(lower).toHaveLength(3);
    expect(lower.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(lower.every(route => route.gaugeSource?.siteId === '09506000')).toBe(true);
    expect(lower.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(lower)).toEqual([]);
  });
});
