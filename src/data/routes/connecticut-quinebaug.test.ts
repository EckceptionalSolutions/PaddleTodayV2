import { describe, expect, it } from 'vitest';
import { connecticutQuinebaugRoutes } from './connecticut-quinebaug';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Connecticut Quinebaug starter routes', () => {
  it('keeps three scored water-trail reaches on direct Quinebaug gauges', () => {
  expect(connecticutQuinebaugRoutes).toHaveLength(4);
    expect(connecticutQuinebaugRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(connecticutQuinebaugRoutes.every(route => ['01124000', '01125500'].includes(route.gaugeSource?.siteId ?? ''))).toBe(true);
    expect(connecticutQuinebaugRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(connecticutQuinebaugRoutes)).toEqual([]);
  });
});
