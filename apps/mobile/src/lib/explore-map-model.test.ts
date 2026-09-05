import { describe, expect, it } from 'vitest';
import { buildExploreMapPoints, type ExploreRiver } from './explore-map-model';
import { buildRouteGroupMeta } from './route-groups';

function route(slug: string, riverId: string, zone: string, score = 80): ExploreRiver {
  return {
    river: {
      slug, riverId, conditionZoneId: zone, name: riverId, reach: slug,
      region: zone, putIn: { latitude: 45, longitude: -93 },
      takeOut: { latitude: 45.2, longitude: -93.2 },
    },
    score, rating: 'Good', selectedSegment: null,
  } as ExploreRiver;
}

describe('Explore map grouping', () => {
  const routes = [route('a', 'river-1', 'north'), route('b', 'river-1', 'north'), route('c', 'river-1', 'south', 70), route('d', 'river-2', 'east')];
  const counts = buildRouteGroupMeta(routes);

  it('keeps all matching siblings for a displayed river, including routes beyond the representative limit', () => {
    const points = buildExploreMapPoints(routes.slice(0, 1), counts, routes);
    expect(points.map((point) => point.routeSlugs)).toEqual([['a', 'b'], ['c']]);
    expect(points.map((point) => point.routeSlug)).toEqual(['a', 'c']);
  });

  it('preserves selected route identity when switching from zones to individual markers', () => {
    const zones = buildExploreMapPoints(routes, counts);
    const individual = buildExploreMapPoints(routes, counts, routes, true);
    for (const route of routes) {
      expect(zones.some((point) => point.routeSlugs.includes(route.river.slug))).toBe(true);
      expect(individual.find((point) => point.id === `route:${route.river.slug}`)?.routeSlug).toBe(route.river.slug);
    }
    expect(new Set(individual.map((point) => point.id)).size).toBe(routes.length);
  });

  it('does not pull filtered-out siblings back into the map', () => {
    const filtered = [routes[0], routes[3]];
    expect(buildExploreMapPoints(filtered, counts).flatMap((point) => point.routeSlugs)).toEqual(['a', 'd']);
  });

  it('gives filtered segments distinct markers even when their river, zone and score match', () => {
    const segments = routes.slice(0, 2).map((route) => ({
      ...route,
      selectedSegment: {
        putIn: { ...route.river.putIn, id: 'in', mileFromStart: 0 },
        takeOut: { ...route.river.takeOut, id: 'out', mileFromStart: 5 },
        distanceMiles: 5,
      } as NonNullable<ExploreRiver['selectedSegment']>,
    }));
    const points = buildExploreMapPoints(segments, counts);
    expect(points.map((point) => point.id)).toEqual(['segment:a', 'segment:b']);
    expect(points.map((point) => point.routeSlugs)).toEqual([['a'], ['b']]);
  });
});
