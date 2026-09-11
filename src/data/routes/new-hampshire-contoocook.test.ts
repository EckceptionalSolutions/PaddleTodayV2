import { describe, expect, it } from 'vitest';
import { newHampshireContoocookRoutes } from './new-hampshire-contoocook';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('New Hampshire Contoocook scored starter', () => {
  it('registers three direct-stage public-access reaches', () => {
    expect(newHampshireContoocookRoutes).toHaveLength(3);
    expect(newHampshireContoocookRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(newHampshireContoocookRoutes.every(route => rivers.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(newHampshireContoocookRoutes.every(route => route.gaugeSource?.siteId === '01085000')).toBe(true);
    expect(newHampshireContoocookRoutes.every(route => route.gaugeSource?.metric === 'gage_height_ft')).toBe(true);
    expect(auditRouteSafety(newHampshireContoocookRoutes)).toEqual([]);
  });
});
