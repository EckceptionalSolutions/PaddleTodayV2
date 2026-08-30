import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import { describe, expect, it } from 'vitest';
import { HOME_NEARBY_DISTANCE_MILES, selectNearbyPicks } from './ranking';

function route(slug: string, longitude: number): RiverSummaryApiItem {
  return {
    river: {
      slug,
      name: 'Test River',
      reach: slug,
      state: 'Test',
      region: 'Test',
      latitude: 0,
      longitude,
      distanceLabel: '5 mi',
      estimatedPaddleTime: '2 hr',
      difficulty: 'easy',
      routeType: 'recreational',
      putIn: { name: 'In', latitude: 0, longitude },
      takeOut: { name: 'Out', latitude: 0.1, longitude },
    },
    sources: [],
    score: 80,
    rating: 'Good',
    readiness: { status: 'ready', label: 'Ready', reason: '' },
    gaugeBandLabel: '',
    explanation: '',
    confidence: { score: 80, label: 'High' },
    liveData: {
      overall: 'live',
      summary: '',
      gaugeState: 'live',
      gaugeDetail: '',
      weatherState: 'live',
      weatherDetail: '',
    },
    summary: {
      cardText: '',
      shortExplanation: '',
      rawSignalLine: '',
      gaugeNow: '',
      confidenceText: '',
      freshnessText: '',
      primaryFactor: '',
      secondaryFactor: '',
    },
    generatedAt: '',
  };
}

describe('home nearby route range', () => {
  it('uses the same 100-mile range as the Clean explore intent', () => {
    const picks = selectNearbyPicks(
      [route('inside', 1.4), route('outside', 1.6)],
      { latitude: 0, longitude: 0, label: 'Test location', source: 'search' },
      10,
    );

    expect(HOME_NEARBY_DISTANCE_MILES).toBe(100);
    expect(picks.map((pick) => pick.river.slug)).toEqual(['inside']);
  });
});
