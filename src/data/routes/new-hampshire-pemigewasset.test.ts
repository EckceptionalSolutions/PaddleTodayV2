import { describe, expect, it } from 'vitest';
import { newHampshirePemigewassetRoutes } from './new-hampshire-pemigewasset';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('New Hampshire Pemigewasset scored starter', () => {
  it('registers six direct-gauge public-access reaches', () => {
    expect(newHampshirePemigewassetRoutes).toHaveLength(6);
    expect(newHampshirePemigewassetRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(newHampshirePemigewassetRoutes.every(route => rivers.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(newHampshirePemigewassetRoutes.every(route => route.gaugeSource?.siteId === '01076500')).toBe(true);
    expect(auditRouteSafety(newHampshirePemigewassetRoutes)).toEqual([]);
  });
});
