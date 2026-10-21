import { describe, expect, it } from 'vitest';
import { alabamaCahabaRoutes } from './alabama-cahaba';
import { publicRivers, rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Alabama Cahaba Blueway starter routes', () => {
  it('preserves three direct-gauge trips with only the documented minimum eligible for scoring', () => {
    expect(alabamaCahabaRoutes).toHaveLength(3);
    expect(Object.fromEntries(alabamaCahabaRoutes.map(route => [route.slug, route.scoreEligibility]))).toEqual({
      'cahaba-river-moon-grants-mill': 'scored',
      'cahaba-river-grants-mill-old-overton': 'planning',
      'cahaba-river-old-overton-highway-280': 'planning',
    });
    expect(alabamaCahabaRoutes.every(route => route.gaugeSource?.siteId === '02423380')).toBe(true);
    expect(alabamaCahabaRoutes.every(route => publicRivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(rivers.filter(route => route.riverId === 'cahaba-river-alabama').map(route => route.slug)).toEqual(['cahaba-river-moon-grants-mill']);
    expect(auditRouteSafety(alabamaCahabaRoutes)).toEqual([]);
  });
});
