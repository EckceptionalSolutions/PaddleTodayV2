import { describe, expect, it } from 'vitest';
import { buildRouteMapSegments, type RouteMapCoordinate } from './route-map-segments';

const A = point(44.5244176, -93.8862799);
const B = point(44.6340972, -93.7653127);
const C = point(44.692386, -93.641157);
const D = point(44.766777, -93.616717);

describe('buildRouteMapSegments', () => {
  it('collapses overlapping route variants into adjacent access legs', () => {
    const segments = buildRouteMapSegments(
      [
        span('a-b', A, B),
        span('a-c', A, C),
        span('b-c', B, C),
        span('b-d', B, D),
        span('c-d', C, D),
      ],
      'a-c'
    );

    expect(segments).toHaveLength(3);
    expect(segmentPairs(segments)).toEqual(new Set([pair(A, B), pair(B, C), pair(C, D)]));
  });

  it('highlights a selected long route across its retained adjacent legs', () => {
    const segments = buildRouteMapSegments(
      [span('a-b', A, B), span('a-c', A, C, 'Good'), span('b-c', B, C)],
      'a-c'
    );

    const selectedSegments = segments.filter((segment) => segment.selected);
    expect(segmentPairs(selectedSegments)).toEqual(new Set([pair(A, B), pair(B, C)]));
    expect(selectedSegments.every((segment) => segment.rating === 'Good')).toBe(true);
  });

  it('keeps disconnected route clusters disconnected', () => {
    const E = point(46, -95);
    const F = point(46.1, -94.9);
    const segments = buildRouteMapSegments([span('a-b', A, B), span('e-f', E, F)], null);

    expect(segmentPairs(segments)).toEqual(new Set([pair(A, B), pair(E, F)]));
  });
});

function point(latitude: number, longitude: number): RouteMapCoordinate {
  return { latitude, longitude };
}

function span(
  slug: string,
  start: RouteMapCoordinate,
  end: RouteMapCoordinate,
  rating = 'Fair'
) {
  return { slug, rating, coordinates: [start, end] };
}

function segmentPairs(segments: ReturnType<typeof buildRouteMapSegments>) {
  return new Set(segments.map((segment) => pair(...segment.coordinates)));
}

function pair(start: RouteMapCoordinate, end: RouteMapCoordinate) {
  const keys = [coordinateKey(start), coordinateKey(end)].sort();
  return keys.join('|');
}

function coordinateKey(coordinate: RouteMapCoordinate) {
  return `${coordinate.latitude.toFixed(6)},${coordinate.longitude.toFixed(6)}`;
}
