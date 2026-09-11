import { describe, expect, it } from 'vitest';
import { montanaClarkForkRoutes } from './montana-clark-fork';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Montana Clark Fork scored starter', () => {
  it('registers six direct-gauge public-access reaches', () => {
    expect(montanaClarkForkRoutes).toHaveLength(6);
    expect(montanaClarkForkRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(montanaClarkForkRoutes.every(route => rivers.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(montanaClarkForkRoutes.every(route => route.gaugeSource?.siteId === '12340500')).toBe(true);
    expect(auditRouteSafety(montanaClarkForkRoutes)).toEqual([]);
  });
});
