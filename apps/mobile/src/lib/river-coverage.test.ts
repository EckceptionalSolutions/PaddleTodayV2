import { describe, expect, it } from 'vitest';
import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import { coverageCenter, groupRoutesByConditionScore } from './river-coverage';

function route(slug: string, score: number, zone: string, longitude: number): RiverSummaryApiItem {
  return {
    river: {
      slug,
      riverId: 'test-river',
      conditionZoneId: zone,
      name: 'Test River',
      reach: slug,
      state: 'Minnesota',
      region: zone,
      latitude: 45,
      longitude,
      distanceLabel: '5 mi',
      estimatedPaddleTime: '2 hr',
      difficulty: 'easy',
      routeType: 'recreational',
      putIn: { name: 'In', latitude: 45, longitude },
      takeOut: { name: 'Out', latitude: 45.2, longitude: longitude + 0.2 },
    },
    sources: [],
    score,
    rating: score >= 80 ? 'Good' : 'Fair',
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

describe('mobile river coverage helpers', () => {
  const routes = [
    route('one', 82, 'north', -94),
    route('two', 82, 'north', -93.8),
    route('three', 61, 'south', -93),
  ];

  it('groups routes by condition zone and score', () => {
    expect(groupRoutesByConditionScore(routes).map((group) => group.routes.length)).toEqual([2, 1]);
  });

  it('centers coverage across route access points', () => {
    expect(coverageCenter(routes)).toEqual({ latitude: 45.1, longitude: -93.5 });
  });
});
