import { describe, expect, it } from 'vitest';
import { washingtonStillaguamishRoutes } from './washington-stillaguamish';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Washington Stillaguamish starter routes', () => {
  it('provides three scored direct-gauge public-access reaches', () => {
    expect(washingtonStillaguamishRoutes).toHaveLength(3);
    expect(washingtonStillaguamishRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(washingtonStillaguamishRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(washingtonStillaguamishRoutes.every(route => ['12164500', '12167400'].includes(route.gaugeSource?.siteId ?? ''))).toBe(true);
    expect(auditRouteSafety(washingtonStillaguamishRoutes)).toEqual([]);
  });
});
