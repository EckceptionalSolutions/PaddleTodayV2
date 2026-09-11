import { describe, expect, it } from 'vitest';
import { washingtonSnoqualmieRoutes } from './washington-snoqualmie';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Washington Snoqualmie Valley starter routes', () => {
  it('provides three scored direct-gauge routes', () => {
    expect(washingtonSnoqualmieRoutes).toHaveLength(3);
    expect(washingtonSnoqualmieRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(washingtonSnoqualmieRoutes.every(route => route.gaugeSource?.siteId === '12149000')).toBe(true);
    expect(washingtonSnoqualmieRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(washingtonSnoqualmieRoutes)).toEqual([]);
  });
});
