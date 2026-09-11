import { describe, expect, it } from 'vitest';
import { alabamaCahabaRoutes } from './alabama-cahaba';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Alabama Cahaba Blueway starter routes', () => {
  it('provides three scored direct-gauge routes', () => {
    expect(alabamaCahabaRoutes).toHaveLength(3);
    expect(alabamaCahabaRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(alabamaCahabaRoutes.every(route => route.gaugeSource?.siteId === '02423380')).toBe(true);
    expect(alabamaCahabaRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(alabamaCahabaRoutes)).toEqual([]);
  });
});
