import { describe, expect, it } from 'vitest';
import { scoreRiverCondition } from './scoring';
import { serializeDetailResult, serializeSummaryResult } from './api-contract';
import type { GaugeReading, River, WeatherSnapshot } from './types';

const baseRiver: River = {
  id: 'api-test-river',
  slug: 'api-test-river',
  name: 'API Test River',
  reach: 'Put-in to Take-out',
  state: 'Minnesota',
  region: 'Test Region',
  summary: 'Heavy summary text that should not go over the wire to the summary endpoint.',
  statusText: 'Status text',
  latitude: 44.9,
  longitude: -93.2,
  gaugeSource: {
    id: 'usgs-api',
    provider: 'usgs',
    siteId: '123456',
    metric: 'discharge_cfs',
    unit: 'cfs',
    kind: 'direct',
    siteName: 'API Test Gauge',
  },
  profile: {
    thresholdModel: 'two-sided',
    idealMin: 300,
    idealMax: 700,
    tooLow: 220,
    tooHigh: 900,
    thresholdSource: {
      label: 'Threshold source',
      url: 'https://example.com/threshold',
    },
    thresholdSourceStrength: 'official',
    rainfallSensitivity: 'medium',
    seasonMonths: [4, 5, 6, 7, 8, 9],
    seasonNotes: 'Core season.',
    difficulty: 'moderate',
    difficultyNotes: 'Some maneuvering required.',
    confidenceNotes: 'Direct gauge and official range.',
  },
  putIn: {
    name: 'North Landing',
    latitude: 44.91,
    longitude: -93.21,
  },
  takeOut: {
    name: 'South Landing',
    latitude: 44.88,
    longitude: -93.19,
  },
  logistics: {
    distanceLabel: '6 miles',
    shuttle: 'Simple car shuttle',
    permits: 'None noted',
    camping: 'No camping',
    summary: 'Day trip.',
    accessCaveats: ['Parking can fill on weekends.'],
    watchFor: ['Wood after storms.'],
  },
  evidenceNotes: [
    {
      label: 'Ideal gauge',
      value: '300 to 700 cfs',
      note: 'Detailed evidence note.',
      sourceUrl: 'https://example.com/evidence',
    },
  ],
  sourceLinks: [
    {
      label: 'Long-form source',
      url: 'https://example.com/source',
    },
  ],
};

const weather: WeatherSnapshot = {
  observedAt: '2026-05-10T11:15:00Z',
  temperatureF: 67,
  windMph: 8,
  gustMph: 11,
  currentPrecipitationIn: 0,
  next12hPrecipProbabilityMax: 12,
  next12hPrecipitationIn: 0.01,
  next12hPrecipStartsInHours: null,
  next12hWindMphMax: 10,
  next12hStormRisk: false,
  weatherCode: 1,
  tomorrow: {
    label: 'Tomorrow',
    startDate: '2026-05-11',
    endDate: '2026-05-11',
    precipProbabilityMax: 20,
    precipitationIn: 0.05,
    windMphMax: 11,
    stormRisk: false,
    weatherCode: 1,
    temperatureHighF: 70,
    temperatureLowF: 51,
  },
  weekend: {
    label: 'Weekend (May 16-May 17)',
    startDate: '2026-05-16',
    endDate: '2026-05-17',
    precipProbabilityMax: 28,
    precipitationIn: 0.08,
    windMphMax: 12,
    stormRisk: false,
    weatherCode: 2,
    temperatureHighF: 72,
    temperatureLowF: 49,
  },
};

const gauge: GaugeReading = {
  sourceId: 'usgs-api',
  observedAt: '2026-05-10T11:00:00Z',
  current: 520,
  unit: 'cfs',
  trend: 'steady',
  delta24h: 15,
  changePercent24h: 3,
  recentSamples: [
    {
      observedAt: '2026-05-10T09:00:00Z',
      value: 500,
    },
    {
      observedAt: '2026-05-10T11:00:00Z',
      value: 520,
    },
  ],
};

describe('api-contract serializers', () => {
  it('keeps summary payload lean and homepage-focused', () => {
    const scored = scoreRiverCondition({
      river: baseRiver,
      gauge,
      weather,
      now: new Date('2026-05-10T12:00:00Z'),
    });

    const summary = serializeSummaryResult(scored);

    expect(summary.river.slug).toBe(baseRiver.slug);
    expect(summary.sources).toEqual([
      { label: 'USGS', tone: 'usgs' },
      { label: 'Official', tone: 'official' },
    ]);
    expect(summary.summary.cardText).toContain('Ideal window');
    expect(summary.summary.shortExplanation).toBe('Perfect level • Stable • light wind');
    expect(summary.summary.rawSignalLine).toBe('Gauge: 520 cfs • Wind: 10 mph • Temp: 67°F');
    expect(summary.summary.gaugeNow).toBe('520 cfs');
    expect(summary.liveData.gaugeDetail).toContain('Latest gauge reading');
    expect(summary.liveData.weatherDetail).toContain('Latest weather reading');
    expect('factors' in summary).toBe(false);
    expect('weather' in summary).toBe(false);
    expect('profile' in summary.river).toBe(false);
    expect('sourceLinks' in summary.river).toBe(false);
  });

  it('strips non-live editorial fields from the detail payload', () => {
    const scored = scoreRiverCondition({
      river: baseRiver,
      gauge,
      weather,
      now: new Date('2026-05-10T12:00:00Z'),
    });

    const detail = serializeDetailResult(scored);

    expect(detail.river.profile.idealMin).toBe(300);
    expect(detail.river.profile.tooHigh).toBe(900);
    expect(detail.gauge?.recentSamples).toHaveLength(2);
    expect(detail.scoreBreakdown.riverQuality).toBeGreaterThan(0);
    expect(detail.checklist.length).toBeGreaterThan(0);
    expect(detail.outlooks.length).toBe(2);
    expect('summary' in detail.river).toBe(false);
    expect('statusText' in detail.river).toBe(false);
    expect('sourceLinks' in detail.river).toBe(false);
    expect('evidenceNotes' in detail.river).toBe(false);
    expect('logistics' in detail.river).toBe(false);
  });
});
