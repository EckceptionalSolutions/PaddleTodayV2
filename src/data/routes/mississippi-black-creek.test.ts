import { describe, expect, it } from 'vitest';
import { mississippiBlackCreekRoutes } from './mississippi-black-creek';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Mississippi Black Creek scored starter', () => {
  it('registers six direct-gauge Forest Service reaches', () => {
    expect(mississippiBlackCreekRoutes).toHaveLength(6);
    expect(mississippiBlackCreekRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(mississippiBlackCreekRoutes.every(route => rivers.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(mississippiBlackCreekRoutes.every(route => route.gaugeSource?.siteId === '02479130')).toBe(true);
    expect(auditRouteSafety(mississippiBlackCreekRoutes)).toEqual([]);
  });
});
