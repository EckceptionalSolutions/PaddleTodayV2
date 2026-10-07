import { describe, expect, it } from 'vitest';
import { arizonaVerdeRoutes } from './arizona-verde';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Arizona Verde starter routes', () => {
  it('scores only the exact White Bridge to Beasley Flat run on the Camp Verde gauge', () => {
    const lowerIds = new Set(['verde-river-white-bridge-clear-creek', 'verde-river-clear-creek-beasley-flat', 'verde-river-white-bridge-beasley-flat']);
    const lower = arizonaVerdeRoutes.filter(route => lowerIds.has(route.id));
    expect(lower).toHaveLength(3);
    expect(lower.every(route => route.gaugeSource?.siteId === '09506000')).toBe(true);
    expect(lower.filter(route => route.scoreEligibility === 'scored').map(route => route.id)).toEqual(['verde-river-white-bridge-beasley-flat']);
    expect(lower.filter(route => route.scoreEligibility === 'planning').every(route =>
      route.profile.tooLow === undefined && route.profile.tooHigh === undefined && route.profile.idealMin === undefined && route.profile.idealMax === undefined,
    )).toBe(true);
    expect(lower.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true);
    expect(auditRouteSafety(lower)).toEqual([]);
  });

  it('keeps the Beasley Flat to Childs expedition route reviewed with route-specific controls', () => {
    const route = arizonaVerdeRoutes.find(candidate => candidate.id === 'verde-river-beasley-flat-childs');
    expect(route).toBeDefined();
    // Class IV+ reaches are discoverable but held to planning by the
    // catalog-wide high-consequence publication gate.
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.gaugeSource?.siteId).toBe('09506000');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.profile.tooLow).toBe(150);
    expect(route?.profile.idealMin).toBe(300);
    expect(route?.profile.idealMax).toBe(2000);
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(auditRouteSafety(route ? [route] : [])).toEqual([]);
  });
});
