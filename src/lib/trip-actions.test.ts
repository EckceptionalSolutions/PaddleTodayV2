import { describe, it, expect } from 'vitest';
import { accessCoordinates, accessDirectionsHref, tripActionLinks, tripExportDetailsHref } from './trip-actions';
import type { River } from './types';

describe('trip action identity and access', () => {
  it('keeps zero coordinates and rejects missing or impossible locations', () => {
    expect(accessCoordinates({ latitude: 0, longitude: 0 })).toBe('0,0');
    for (const point of [undefined, { latitude: 91, longitude: 5 }, { latitude: NaN, longitude: 4 }, { latitude: 3 }]) {
      expect(accessDirectionsHref(point)).toBeUndefined();
    }
  });
  it('uses the actual hub and named access IDs for every trip action', () => {
    const route = { slug: 'example-trip', name: 'Example River', putIn: { name: 'Upper', latitude: 44, longitude: -92 }, takeOut: { name: 'Lower', latitude: 43, longitude: -92 },
      accessPoints: [{ id: 'upper-launch', name: 'Upper', latitude: 44, longitude: -92, mileFromStart: 0 }, { id: 'lower-landing', name: 'Lower', latitude: 43, longitude: -92, mileFromStart: 5 }] } as River;
    const links = tripActionLinks(route, 'example-river');
    expect(links.details).toBe('/rivers/by-river/example-river/?details=example-trip#trip-example-trip');
    expect(new URL(links.plan, 'https://paddletoday.com').searchParams.get('putin')).toBe('upper-launch');
    expect(links.gpx).toContain('putin=upper-launch&takeout=lower-landing');
    expect(links.calendar).toContain('/example-trip/trip.ics?');
    expect(tripActionLinks({ ...route, putIn: { ...route.putIn!, latitude: undefined } }, 'example-river').gpx).toBeUndefined();
  });
  it('reopens consolidated trips in their modal while preserving standalone segment links', () => {
    const params = new URLSearchParams({ putin: 'upper', takeout: 'lower' });
    expect(tripExportDetailsHref('saco-river-fryeburg-brownfield', params)).toBe('/rivers/by-river/saco-river/?details=saco-river-fryeburg-brownfield#trip-saco-river-fryeburg-brownfield');
    expect(tripExportDetailsHref('demo-trip', params)).toBe('/rivers/demo-trip/?putin=upper&takeout=lower');
  });
  it('preserves distinct launch and finish IDs at a shared loop access', () => {
    const point = { name: 'Boat landing', latitude: 44, longitude: -92 };
    const route = { slug: 'loop-trip', name: 'Loop', putIn: { ...point, id: 'launch' }, takeOut: { ...point, id: 'finish' },
      accessPoints: [{ ...point, id: 'launch', mileFromStart: 0 }, { ...point, id: 'finish', mileFromStart: 5 }] } as River;
    expect(tripActionLinks(route).gpx).toContain('putin=launch&takeout=finish');
  });
});
