import { describe, expect, it } from 'vitest';
import type { WeekendSummaryApiItem } from '@paddletoday/api-contract';
import {
  buildWeekendPlan,
  parseWeekendDistanceLimit,
  rankWeekendRoutes,
  weekendRouteMapPoints,
} from './weekend-planning';

function weekendRoute(
  slug: string,
  {
    latitude = 44.98,
    longitude = -93.27,
    score = 80,
    rating = 'Good',
    confidence = 'High',
    difficulty = 'moderate',
    distanceLabel = '10 mi',
    campingClassification = 'none',
  }: Partial<{
    latitude: number;
    longitude: number;
    score: number;
    rating: WeekendSummaryApiItem['weekend']['rating'];
    confidence: WeekendSummaryApiItem['weekend']['confidence'];
    difficulty: WeekendSummaryApiItem['river']['difficulty'];
    distanceLabel: string;
    campingClassification: NonNullable<
      WeekendSummaryApiItem['river']['logistics']
    >['campingClassification'];
  }> = {},
): WeekendSummaryApiItem {
  return {
    river: {
      slug,
      name: slug,
      reach: `${slug} reach`,
      state: 'MN',
      region: 'Minnesota',
      latitude,
      longitude,
      distanceLabel,
      estimatedPaddleTime: '3 hours',
      difficulty,
      routeType: 'recreational',
      logistics: { campingClassification },
    },
    current: {
      score,
      rating,
      gaugeBandLabel: 'In range',
    },
    weekend: {
      label: 'Weekend',
      score,
      rating,
      confidence,
      explanation: 'Test explanation',
      summary: 'Test summary',
      signalLine: 'Gauge: steady',
    },
    liveData: {
      overall: 'live',
      summary: 'Live',
      gaugeState: 'live',
      gaugeDetail: 'Live',
      weatherState: 'live',
      weatherDetail: 'Live',
    },
    generatedAt: '2026-07-27T12:00:00.000Z',
  };
}

describe('weekend planning', () => {
  it('ranks nearby routes with the same weekend score ahead of farther routes', () => {
    const ranked = rankWeekendRoutes(
      [
        weekendRoute('far', { latitude: 47.0 }),
        weekendRoute('near', { latitude: 45.0 }),
      ],
      { latitude: 44.98, longitude: -93.27, label: 'Minneapolis' },
    );

    expect(ranked.map((route) => route.river.slug)).toEqual(['near', 'far']);
    expect(ranked[0].travelLabel).toMatch(/min away/);
  });

  it('applies distance and camping filters to the map route set', () => {
    const routes = [
      weekendRoute('camp-near', {
        latitude: 45.1,
        campingClassification: 'nearby_basecamp',
      }),
      weekendRoute('day-near', { latitude: 45.2 }),
      weekendRoute('camp-far', {
        latitude: 49.0,
        campingClassification: 'on_route_campsite',
      }),
      weekendRoute('watch-near', {
        latitude: 45.15,
        rating: 'Fair',
        score: 62,
      }),
    ];
    const location = { latitude: 44.98, longitude: -93.27, label: 'Minneapolis' };
    const camping = buildWeekendPlan(routes, {
      location,
      distanceLimit: 100,
      filter: 'camping',
    });
    const rechecks = buildWeekendPlan(routes, {
      location,
      distanceLimit: 100,
      filter: 'rechecks',
    });

    expect(camping.mapRoutes.map((route) => route.river.slug)).toEqual(['camp-near']);
    expect(rechecks.mapRoutes.map((route) => route.river.slug)).toEqual(['watch-near']);
  });

  it('uses farther clean routes only when the selected range has no clean plan', () => {
    const plan = buildWeekendPlan(
      [
        weekendRoute('watch-near', { latitude: 45.1, rating: 'Fair', score: 60 }),
        weekendRoute('good-far', { latitude: 48.0 }),
      ],
      {
        location: { latitude: 44.98, longitude: -93.27, label: 'Minneapolis' },
        distanceLimit: 100,
      },
    );

    expect(plan.hasWeekendPlan).toBe(false);
    expect(plan.expandedPicks.map((route) => route.river.slug)).toEqual(['good-far']);
    expect(plan.featured?.river.slug).toBe('watch-near');
  });

  it('parses only supported saved distance values', () => {
    expect(parseWeekendDistanceLimit('300')).toBe(300);
    expect(parseWeekendDistanceLimit('null')).toBeNull();
    expect(parseWeekendDistanceLimit('50')).toBeUndefined();
    expect(parseWeekendDistanceLimit('nope')).toBeUndefined();
  });

  it('centers map markers on the route span', () => {
    const route = weekendRoute('mapped');
    route.river.putIn = { name: 'Put-in', latitude: 44, longitude: -94 };
    route.river.takeOut = { name: 'Take-out', latitude: 46, longitude: -92 };

    const [point] = weekendRouteMapPoints([route]);

    expect(point.span).toHaveLength(2);
    expect(point.latitude).toBe(45);
    expect(point.longitude).toBe(-93);
  });
});
