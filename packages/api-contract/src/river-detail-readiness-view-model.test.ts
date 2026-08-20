import { describe, expect, it } from 'vitest';
import type { RiverDetailApiResult } from './index';
import {
  buildRiverReadinessViewModel,
  buildRiverWeatherViewModel,
} from './river-detail-readiness-view-model';

const now = Date.parse('2026-07-27T12:00:00.000Z');

function detailFixture(overrides: Partial<RiverDetailApiResult> = {}): RiverDetailApiResult {
  return {
    river: {
      slug: 'rum-river-test',
      name: 'Rum River',
      reach: 'Test reach',
      state: 'MN',
      region: 'Central Minnesota',
      latitude: 45,
      longitude: -93,
      distanceLabel: '8 miles',
      estimatedPaddleTime: '3 hours',
      routeType: 'recreational',
      gaugeSource: {
        provider: 'usgs',
        metric: 'discharge_cfs',
        unit: 'cfs',
        display: {
          provider: 'usgs',
          label: 'USGS',
          shortLabel: 'USGS',
          primaryMetricLabel: 'Flow',
          secondaryMetricLabel: null,
          interpretationLabel: null,
          supportsRecentSamples: true,
          supportsHydrograph: true,
        },
      },
      profile: {
        thresholdModel: 'two-sided',
        thresholdSourceStrength: 'official',
        difficulty: 'easy',
      },
      putIn: { name: 'Put-in', latitude: 45, longitude: -93 },
      takeOut: { name: 'Take-out', latitude: 45.1, longitude: -93.1 },
    },
    score: 80,
    rating: 'Good',
    gaugeBand: 'ideal',
    gaugeBandLabel: 'Ideal',
    explanation: 'Good conditions.',
    scoreBreakdown: {
      riverQuality: 80,
      windAdjustment: 0,
      temperatureAdjustment: 0,
      rainAdjustment: 0,
      comfortAdjustment: 0,
      rawTripScore: 80,
      finalScore: 80,
      capReasons: [],
      riverQualityExplanation: '',
      windExplanation: '',
      temperatureExplanation: '',
      rainExplanation: '',
      comfortExplanation: '',
    },
    confidence: { score: 90, label: 'High', reasons: [], warnings: [] },
    liveData: {
      overall: 'live',
      summary: 'All sources live.',
      gauge: { state: 'live', ageMinutes: 30, detail: 'Gauge live.' },
      weather: { state: 'live', ageMinutes: 20, detail: 'Weather live.' },
    },
    factors: [],
    checklist: [
      { status: 'go', label: 'Gauge window', detail: 'Gauge is in range.' },
      { status: 'go', label: 'Weather window', detail: 'Weather looks good.' },
    ],
    outlooks: [],
    gauge: {
      sourceId: 'test',
      observedAt: '2026-07-27T11:00:00.000Z',
      current: 500,
      unit: 'cfs',
      trend: 'steady',
      delta24h: 0,
      changePercent24h: 0,
      recentSamples: [],
      gaugeHeightNow: null,
      dischargeNow: 500,
      waterTempF: null,
      waterTempObservedAt: null,
      gaugeSource: 'USGS',
      waterTempSource: null,
    },
    weather: {
      observedAt: '2026-07-27T11:00:00.000Z',
      temperatureF: 72,
      windMph: 6,
      gustMph: 10,
      currentPrecipitationIn: 0,
      next12hPrecipProbabilityMax: 20,
      next12hPrecipitationIn: 0,
      next12hPrecipStartsInHours: null,
      next12hWindMphMax: 9,
      next12hStormRisk: false,
      weatherCode: 0,
      conditionLabel: 'Mostly sunny',
      todayHourly: [],
      tomorrow: null,
      weekend: null,
      recentRain24hIn: 0,
      recentRain72hIn: 0,
      precipitationProbabilityNow: 0,
      rainTimingLabel: 'None',
      weatherSource: 'Open-Meteo',
      rainfallSource: null,
      waterTempSource: null,
    },
    generatedAt: '2026-07-27T11:00:00.000Z',
    ...overrides,
  };
}

describe('river detail readiness view model', () => {
  it('builds one go-state model for live data, weather, and mapped access', () => {
    const model = buildRiverReadinessViewModel(detailFixture(), { now });

    expect(model).toMatchObject({
      verdict: 'go',
      verdictLabel: 'Paddle today',
      summary: 'Conditions look good right now.',
      note: 'All sources live.',
      accessLabel: 'Mapped put-in and take-out',
      weather: {
        state: 'calm',
        label: 'Calm weather',
        summaryValue: '20% rain • 9 mph wind',
        compactValue: '72°F / 9 mph / 20%',
      },
      effectiveLiveData: {
        overall: 'live',
      },
    });
  });

  it('uses skip before watch and surfaces the first actionable warning', () => {
    const model = buildRiverReadinessViewModel(detailFixture({
      checklist: [
        { status: 'watch', label: 'Trend check', detail: 'Trend needs review.' },
        { status: 'skip', label: 'Weather window', detail: 'Storm risk.' },
      ],
    }), { now });

    expect(model.verdict).toBe('skip');
    expect(model.summary).toBe('Today does not look like a clean go.');
    expect(model.note).toBe('Trend needs review.');
  });

  it('downgrades old live reads consistently without overriding offline state', () => {
    const stale = buildRiverReadinessViewModel(detailFixture({
      generatedAt: '2026-07-27T02:00:00.000Z',
      gauge: {
        ...detailFixture().gauge!,
        observedAt: '2026-07-27T03:00:00.000Z',
      },
    }), { now });

    expect(stale.verdict).toBe('watch');
    expect(stale.effectiveLiveData).toMatchObject({
      overall: 'degraded',
      gauge: { state: 'stale' },
      weather: { state: 'stale' },
    });
    expect(stale.effectiveLiveData.summary).toContain('Gauge read is 9h old');

    const offline = buildRiverReadinessViewModel(detailFixture({
      liveData: {
        ...detailFixture().liveData,
        overall: 'offline',
      },
    }), { now });
    expect(offline.verdict).toBe('skip');
    expect(offline.effectiveLiveData.overall).toBe('offline');
  });

  it('applies weather-risk priority and stable unavailable fallbacks', () => {
    expect(buildRiverWeatherViewModel({
      ...detailFixture().weather!,
      temperatureF: 35,
      next12hPrecipProbabilityMax: 80,
      next12hWindMphMax: 25,
      next12hStormRisk: true,
    }).state).toBe('storm');
    expect(buildRiverWeatherViewModel({
      ...detailFixture().weather!,
      temperatureF: 35,
      next12hPrecipProbabilityMax: 80,
      next12hWindMphMax: 25,
      next12hStormRisk: false,
    }).state).toBe('cold');
    expect(buildRiverWeatherViewModel(null)).toMatchObject({
      label: 'Weather unavailable',
      compactValue: 'Unknown',
      conditionLabel: 'No forecast',
    });
  });
});
