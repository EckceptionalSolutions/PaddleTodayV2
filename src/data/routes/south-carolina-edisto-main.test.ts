import { describe, expect, it } from 'vitest';
import { southCarolinaEdistoMainRoutes } from './south-carolina-edisto-main';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('South Carolina Edisto mainstem routes', () => {
  it('has six distinct scored routes with direct gauge evidence', () => {
    expect(southCarolinaEdistoMainRoutes).toHaveLength(6);
    expect(new Set(southCarolinaEdistoMainRoutes.map(route => route.id)).size).toBe(6);
    for (const route of southCarolinaEdistoMainRoutes) {
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource?.siteId).toBe('02175000');
      expect(rivers.some(candidate => candidate.id === route.id)).toBe(true);
    }
    expect(auditRouteSafety(southCarolinaEdistoMainRoutes)).toEqual([]);
  });
});
