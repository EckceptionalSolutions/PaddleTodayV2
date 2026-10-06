import { describe, expect, it } from 'vitest';
import { mississippiBlackCreekRoutes } from './mississippi-black-creek';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Mississippi Black Creek routes', () => {
  it('registers direct-gauge Forest Service reaches', () => {
    expect(mississippiBlackCreekRoutes).toHaveLength(28);
    const planningRouteIds = mississippiBlackCreekRoutes
      .filter(route => route.scoreEligibility === 'planning')
      .map(route => route.id)
      .sort();
    expect(planningRouteIds).toEqual([
      'black-creek-ashe-nursery-fairley',
      'black-creek-big-creek-fairley',
      'black-creek-churchwell-cypress',
      'black-creek-churchwell-fairley',
      'black-creek-churchwell-janice',
      'black-creek-old-highway-49-ashe-nursery',
      'black-creek-old-highway-49-fairley',
    ].sort());
    expect(mississippiBlackCreekRoutes.filter(route => route.scoreEligibility === 'scored')).toHaveLength(21);
    expect(mississippiBlackCreekRoutes.every(route => rivers.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(mississippiBlackCreekRoutes.every(route => route.gaugeSource?.siteId === '02479130')).toBe(true);
    expect(auditRouteSafety(mississippiBlackCreekRoutes)).toEqual([]);
  });
});
