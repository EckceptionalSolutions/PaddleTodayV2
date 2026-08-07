import { describe, expect, it } from 'vitest';
import {
  riverHubMapNotices,
  riverHubRouteStatus,
  routeGeometryMidpoint,
} from './river-hub-map-model.js';

describe('river hub map model', () => {
  it('places a route label halfway along the actual line distance', () => {
    const midpoint = routeGeometryMidpoint({
      type: 'LineString',
      coordinates: [[-93, 45], [-92.9, 45], [-92.9, 45.3]],
    });

    expect(midpoint?.[0]).toBeCloseTo(-92.9, 3);
    expect(midpoint?.[1]).toBeGreaterThan(45);
    expect(midpoint?.[1]).toBeLessThan(45.3);
  });

  it('keeps planning and unknown routes out of the no-go color', () => {
    expect(riverHubRouteStatus({ scoreEligibility: 'planning', rating: 'No-go' })).toBe('planning');
    expect(riverHubRouteStatus({ rating: null })).toBe('planning');
    expect(riverHubRouteStatus({ rating: 'No-go' })).toBe('no-go');
    expect(riverHubRouteStatus({ rating: 'Good' })).toBe('good');
  });

  it('adds relevant Mississippi portage and coverage notices only', () => {
    const notices = riverHubMapNotices('mississippi-river', [
      { slug: 'mississippi-river-east-river-flats-hidden-falls' },
    ]);

    expect(notices.map((notice) => notice.id)).toEqual([
      'north-minneapolis-coverage-gap',
      'saint-anthony-portage',
      'lock-and-dam-1',
    ]);
    expect(riverHubMapNotices('rum-river', [{ slug: 'mississippi-river-east-river-flats-hidden-falls' }])).toEqual([]);
  });
});
