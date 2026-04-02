import { describe, expect, it } from 'vitest';
import { scoreRiverCondition } from './scoring';
import type { GaugeReading, River, WeatherSnapshot } from './types';
import { rivers } from '../data/rivers';

const baseRiver: River = {
  id: 'test-river',
  slug: 'test-river',
  name: 'Test River',
  reach: 'Demo reach',
  state: 'Minnesota',
  region: 'Test Region',
  summary: 'Summary',
  statusText: 'Status',
  latitude: 44.9,
  longitude: -93.1,
  gaugeSource: {
    id: 'usgs-1',
    provider: 'usgs',
    siteId: '1',
    metric: 'discharge_cfs',
    unit: 'cfs',
    kind: 'direct',
    siteName: 'Test gauge',
  },
  profile: {
    thresholdModel: 'two-sided',
    idealMin: 300,
    idealMax: 700,
    tooLow: 220,
    tooHigh: 900,
    thresholdSource: {
      label: 'Threshold source',
      url: 'https://example.com',
    },
    thresholdSourceStrength: 'community',
    rainfallSensitivity: 'medium',
    seasonMonths: [4, 5, 6, 7, 8, 9],
    seasonNotes: 'Best in warmer months.',
    difficulty: 'easy',
    difficultyNotes: 'Manageable.',
    confidenceNotes: 'Community range.',
  },
  evidenceNotes: [],
  sourceLinks: [],
};

const weather: WeatherSnapshot = {
  observedAt: new Date().toISOString(),
  temperatureF: 68,
  windMph: 7,
  gustMph: 10,
  currentPrecipitationIn: 0,
  next12hPrecipProbabilityMax: 10,
  next12hPrecipitationIn: 0.01,
  next12hPrecipStartsInHours: null,
  next12hWindMphMax: 10,
  next12hStormRisk: false,
  weatherCode: 1,
  tomorrow: {
    label: 'Tomorrow',
    startDate: '2026-05-11',
    endDate: '2026-05-11',
    precipProbabilityMax: 15,
    precipitationIn: 0.02,
    windMphMax: 10,
    stormRisk: false,
    weatherCode: 1,
    temperatureHighF: 71,
    temperatureLowF: 52,
  },
  weekend: {
    label: 'Weekend (May 16-May 17)',
    startDate: '2026-05-16',
    endDate: '2026-05-17',
    precipProbabilityMax: 25,
    precipitationIn: 0.08,
    windMphMax: 12,
    stormRisk: false,
    weatherCode: 1,
    temperatureHighF: 72,
    temperatureLowF: 50,
  },
};

function makeGauge(current: number, trend: GaugeReading['trend'], delta24h: number): GaugeReading {
  return {
    sourceId: 'usgs-1',
    observedAt: new Date().toISOString(),
    current,
    unit: 'cfs',
    trend,
    delta24h,
    changePercent24h: 5,
    recentSamples: [],
  };
}

function makeRiverGauge(
  river: River,
  current: number,
  trend: GaugeReading['trend'],
  delta24h: number
): GaugeReading {
  return {
    sourceId: river.gaugeSource.id,
    observedAt: '2026-05-10T11:00:00Z',
    current,
    unit: river.gaugeSource.unit,
    trend,
    delta24h,
    changePercent24h: 5,
    recentSamples: [],
  };
}

describe('scoreRiverCondition', () => {
  it('scores an in-range river as good or strong', () => {
    const now = new Date('2026-05-10T12:00:00Z');
    const result = scoreRiverCondition({
      river: baseRiver,
      gauge: {
        ...makeGauge(480, 'steady', 15),
        observedAt: '2026-05-10T11:00:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    expect(result.score).toBeGreaterThanOrEqual(75);
    expect(result.rating === 'Good' || result.rating === 'Strong').toBe(true);
    expect(result.confidence.label === 'Low' || result.confidence.label === 'Medium').toBe(true);
    expect(result.liveData.overall).toBe('live');
    expect(result.gaugeBand).toBe('ideal');
    expect(result.checklist.some((item) => item.label === 'Gauge window')).toBe(true);
    expect(result.outlooks[0]?.availability).toBe('available');
  });

  it('only reaches 100 when gauge and weather are both excellent', () => {
    const now = new Date('2026-05-10T12:00:00Z');
    const result = scoreRiverCondition({
      river: baseRiver,
      gauge: {
        ...makeGauge(500, 'steady', 0),
        observedAt: '2026-05-10T11:00:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
        temperatureF: 72,
        windMph: 4,
        gustMph: 7,
        next12hWindMphMax: 7,
        next12hPrecipProbabilityMax: 0,
        next12hPrecipitationIn: 0,
        next12hStormRisk: false,
        weatherCode: 0,
      },
      now,
    });

    expect(result.score).toBe(100);
    expect(result.rating).toBe('Strong');
  });

  it('pushes a too-low river toward no-go', () => {
    const now = new Date('2026-10-10T12:00:00Z');
    const stormyWeather: WeatherSnapshot = {
      ...weather,
      observedAt: '2026-10-10T11:00:00Z',
      next12hPrecipProbabilityMax: 85,
      next12hPrecipitationIn: 0.45,
      next12hStormRisk: true,
      next12hWindMphMax: 24,
    };

    const result = scoreRiverCondition({
      river: baseRiver,
      gauge: {
        ...makeGauge(160, 'falling', -90),
        observedAt: '2026-10-10T11:05:00Z',
      },
      weather: stormyWeather,
      now,
    });

    expect(result.score).toBeLessThan(45);
    expect(result.rating).toBe('No-go');
    expect(result.gaugeBand).toBe('too-low');
  });

  it('pulls an ideal-gauge river down when cold rain and wind make the day unattractive', () => {
    const now = new Date('2026-04-01T12:00:00Z');
    const result = scoreRiverCondition({
      river: baseRiver,
      gauge: {
        ...makeGauge(500, 'steady', 0),
        observedAt: '2026-04-01T11:00:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-04-01T11:15:00Z',
        temperatureF: 31,
        windMph: 7,
        gustMph: 19,
        next12hWindMphMax: 14,
        next12hPrecipProbabilityMax: 72,
        next12hPrecipitationIn: 0.14,
        next12hStormRisk: false,
      },
      now,
    });

    expect(result.gaugeBand).toBe('ideal');
    expect(result.score).toBeLessThan(75);
  expect(result.rating).toBe('Fair');
    expect(result.factors.find((factor) => factor.id === 'weather')?.detail).toContain('near freezing');
  });

  it('marks stale gauge data as degraded and lowers confidence', () => {
    const result = scoreRiverCondition({
      river: baseRiver,
      gauge: {
        ...makeGauge(480, 'steady', 15),
        observedAt: '2026-05-10T05:00:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:30:00Z',
      },
      now: new Date('2026-05-10T12:00:00Z'),
    });

    expect(result.liveData.overall).toBe('degraded');
    expect(result.liveData.gauge.state).toBe('stale');
    expect(result.confidence.label).toBe('Low');
    expect(result.factors.some((factor) => factor.id === 'live-data' && factor.impact === 'warning')).toBe(true);
    expect(result.explanation).toContain('cautious estimate');
  });

  it('marks missing gauge data as offline instead of treating it as a normal low-confidence score', () => {
    const result = scoreRiverCondition({
      river: baseRiver,
      gauge: null,
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:45:00Z',
      },
      now: new Date('2026-05-10T12:00:00Z'),
    });

    expect(result.liveData.overall).toBe('offline');
    expect(result.liveData.gauge.state).toBe('unavailable');
    expect(result.confidence.label).toBe('Low');
    expect(result.explanation).toContain('manual check');
    expect(result.outlooks.every((outlook) => outlook.availability === 'withheld')).toBe(true);
  });

  it('scores the middle of the ideal band higher than the edge of the ideal band', () => {
    const now = new Date('2026-05-10T12:00:00Z');
    const centered = scoreRiverCondition({
      river: baseRiver,
      gauge: {
        ...makeGauge(500, 'steady', 8),
        observedAt: '2026-05-10T11:40:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:45:00Z',
      },
      now,
    });

    const edge = scoreRiverCondition({
      river: baseRiver,
      gauge: {
        ...makeGauge(305, 'steady', 8),
        observedAt: '2026-05-10T11:40:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:45:00Z',
      },
      now,
    });

    expect(centered.gaugeBand).toBe('ideal');
    expect(edge.gaugeBand).toBe('ideal');
    expect(centered.score).toBeGreaterThan(edge.score);
  });

  it('treats high-shoulder water as meaningfully worse than ideal water before the hard high threshold', () => {
    const now = new Date('2026-05-10T12:00:00Z');
    const ideal = scoreRiverCondition({
      river: baseRiver,
      gauge: {
        ...makeGauge(500, 'steady', 8),
        observedAt: '2026-05-10T11:40:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:45:00Z',
      },
      now,
    });

    const highShoulder = scoreRiverCondition({
      river: baseRiver,
      gauge: {
        ...makeGauge(820, 'rising', 90),
        observedAt: '2026-05-10T11:40:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:45:00Z',
      },
      now,
    });

    expect(highShoulder.gaugeBand).toBe('high-shoulder');
    expect(highShoulder.score).toBeLessThan(ideal.score);
  expect(highShoulder.rating === 'Fair' || highShoulder.rating === 'No-go').toBe(true);
  });

  it('exposes threshold evidence quality as an explainable factor', () => {
    const result = scoreRiverCondition({
      river: baseRiver,
      gauge: {
        ...makeGauge(480, 'steady', 15),
        observedAt: '2026-05-10T11:00:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now: new Date('2026-05-10T12:00:00Z'),
    });

    const thresholdFactor = result.factors.find((factor) => factor.id === 'threshold-quality');
    expect(thresholdFactor?.value).toBe('Community numeric guidance');
    expect(thresholdFactor?.impact).toBe('warning');
    expect(thresholdFactor?.detail).toContain('community trip reports');
  });

  it('gives stronger confidence to official thresholds than community thresholds', () => {
    const officialRiver: River = {
      ...baseRiver,
      profile: {
        ...baseRiver.profile,
        thresholdSourceStrength: 'official',
      },
    };

    const communityResult = scoreRiverCondition({
      river: baseRiver,
      gauge: {
        ...makeGauge(480, 'steady', 15),
        observedAt: '2026-05-10T11:00:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now: new Date('2026-05-10T12:00:00Z'),
    });

    const officialResult = scoreRiverCondition({
      river: officialRiver,
      gauge: {
        ...makeGauge(480, 'steady', 15),
        observedAt: '2026-05-10T11:00:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now: new Date('2026-05-10T12:00:00Z'),
    });

    expect(officialResult.confidence.score).toBeGreaterThan(communityResult.confidence.score);
    expect(officialResult.confidence.reasons).toContain(
      'Range comes from an official source.'
    );
  });

  it('applies a difficulty penalty to hard technical rivers even when flow is in range', () => {
    const hardRiver: River = {
      ...baseRiver,
      profile: {
        ...baseRiver.profile,
        difficulty: 'hard',
        difficultyNotes: 'Technical creek run.',
      },
    };

    const easyResult = scoreRiverCondition({
      river: baseRiver,
      gauge: {
        ...makeGauge(480, 'steady', 15),
        observedAt: '2026-05-10T11:00:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now: new Date('2026-05-10T12:00:00Z'),
    });

    const hardResult = scoreRiverCondition({
      river: hardRiver,
      gauge: {
        ...makeGauge(480, 'steady', 15),
        observedAt: '2026-05-10T11:00:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now: new Date('2026-05-10T12:00:00Z'),
    });

    const difficultyFactor = hardResult.factors.find((factor) => factor.id === 'difficulty');
    expect(hardResult.score).toBeLessThan(easyResult.score);
    expect(difficultyFactor?.impact).toBe('warning');
    expect(hardResult.explanation).toContain('needs more margin');
  });

it('treats minimum-only guidance as workable but capped below a full two-sided strong-day call', () => {
    const minimumOnlyRiver: River = {
      ...baseRiver,
      profile: {
        ...baseRiver.profile,
        thresholdModel: 'minimum-only',
        idealMin: undefined,
        idealMax: undefined,
        tooLow: 200,
        tooHigh: undefined,
        thresholdSourceStrength: 'community',
      },
    };

    const result = scoreRiverCondition({
      river: minimumOnlyRiver,
      gauge: {
        ...makeGauge(320, 'steady', 12),
        observedAt: '2026-05-10T11:00:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now: new Date('2026-05-10T12:00:00Z'),
    });

    expect(result.gaugeBand).toBe('minimum-met');
    expect(result.score).toBeLessThanOrEqual(74);
  expect(result.rating).toBe('Fair');
    expect(result.confidence.label).toBe('Medium');
    expect(result.explanation).toContain('low-water mark');
  });

  it('drops minimum-only rivers below minimum into no-go territory', () => {
    const minimumOnlyRiver: River = {
      ...baseRiver,
      profile: {
        ...baseRiver.profile,
        thresholdModel: 'minimum-only',
        idealMin: undefined,
        idealMax: undefined,
        tooLow: 200,
        tooHigh: undefined,
      },
    };

    const result = scoreRiverCondition({
      river: minimumOnlyRiver,
      gauge: {
        ...makeGauge(140, 'falling', -25),
        observedAt: '2026-05-10T11:00:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now: new Date('2026-05-10T12:00:00Z'),
    });

    expect(result.gaugeBand).toBe('too-low');
    expect(result.rating).toBe('No-go');
  });

  it('withholds weekend outlooks for minimum-only rivers even when today is scoreable', () => {
    const minimumOnlyRiver: River = {
      ...baseRiver,
      profile: {
        ...baseRiver.profile,
        thresholdModel: 'minimum-only',
        idealMin: undefined,
        idealMax: undefined,
        tooLow: 200,
        tooHigh: undefined,
      },
    };

    const result = scoreRiverCondition({
      river: minimumOnlyRiver,
      gauge: {
        ...makeGauge(320, 'steady', 12),
        observedAt: '2026-05-10T11:00:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now: new Date('2026-05-10T12:00:00Z'),
    });

    const weekend = result.outlooks.find((outlook) => outlook.id === 'weekend');
    expect(weekend?.availability).toBe('withheld');
    expect(weekend?.explanation).toContain('low-water mark');
  });
});

describe('seed river calibration', () => {
const cannon = rivers.find((river) => river.slug === 'cannon-river-welch');
const straight = rivers.find((river) => river.slug === 'straight-river-faribault');
const rootRiver = rivers.find((river) => river.slug === 'root-river-lanesboro-peterson');
const wolfRiver = rivers.find((river) => river.slug === 'wolf-river-lily-hollister');
const whiteRiver = rivers.find((river) => river.slug === 'white-river-maple-ridge-highway-112');
const redCedarRiver = rivers.find((river) => river.slug === 'red-cedar-river-menomonie-dunnville');
const stCroixFox70 = rivers.find((river) => river.slug === 'st-croix-river-fox-highway-70');
const rumRiver = rivers.find((river) => river.slug === 'rum-river-martins-north-county-park');
const saukRiver = rivers.find((river) => river.slug === 'sauk-river-eagle-miller-landing');
const snakeRiver = rivers.find((river) => river.slug === 'snake-river-county-road-3-mora');
const northForkCrow = rivers.find((river) => river.slug === 'north-fork-crow-river-riverside-dayton');
const minnehahaCreek = rivers.find((river) => river.slug === 'minnehaha-creek-grays-bay-longfellow-lagoon');
const zumbro = rivers.find((river) => river.slug === 'zumbro-river-falls');
const blackHawk = rivers.find((river) => river.slug === 'black-hawk-creek-hudson-waterloo');
  const riceCreek = rivers.find((river) => river.slug === 'rice-creek-peltier-to-long-lake');
  const kettle = rivers.find((river) => river.slug === 'kettle-river-lower-kettle-5-to-6');
  const southForkZumbro = rivers.find((river) => river.slug === 'south-fork-zumbro-lake-zumbro');
  const upperIowa = rivers.find((river) => river.slug === 'upper-iowa-river-kendallville-decorah');
  const sugarRiver = rivers.find((river) => river.slug === 'sugar-river-belleville-county-x');
  const sugarRiverCountyEe = rivers.find((river) => river.slug === 'sugar-river-county-road-x-county-road-ee');
  const blackHawkDownstream = rivers.find((river) => river.slug === 'black-hawk-creek-ranchero-hope-martin');
  const barkRiver = rivers.find((river) => river.slug === 'bark-river-highway-164-to-merton-millpond');
  const kickapoo = rivers.find((river) => river.slug === 'kickapoo-river-ontario-rockton');
  const upperIowaDecorah = rivers.find((river) => river.slug === 'upper-iowa-river-trout-run-lower-dam');
  const now = new Date('2026-05-10T12:00:00Z');

  it('keeps Cannon near 310 cfs inside the ideal band', () => {
    expect(cannon).toBeDefined();

    const result = scoreRiverCondition({
      river: cannon as River,
      gauge: makeRiverGauge(cannon as River, 310, 'steady', 5),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    expect(result.gaugeBand).toBe('ideal');
    expect(result.rating === 'Good' || result.rating === 'Strong').toBe(true);
  });

  it('treats Straight around 5.7 ft as a high-shoulder day instead of ideal', () => {
    expect(straight).toBeDefined();

    const result = scoreRiverCondition({
      river: straight as River,
      gauge: makeRiverGauge(straight as River, 5.71, 'rising', 0.35),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    expect(result.gaugeBand).toBe('high-shoulder');
    expect(result.score).toBeLessThan(80);
  });

  it('keeps Zumbro at 5.5 ft in the low shoulder rather than too low', () => {
    expect(zumbro).toBeDefined();

    const result = scoreRiverCondition({
      river: zumbro as River,
      gauge: makeRiverGauge(zumbro as River, 5.5, 'steady', 0),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    expect(result.gaugeBand).toBe('low-shoulder');
  expect(result.rating === 'Fair' || result.rating === 'No-go').toBe(true);
  });

  it('keeps Black Hawk Creek inside the official DNR range with high confidence but technical caution', () => {
    expect(blackHawk).toBeDefined();

    const result = scoreRiverCondition({
      river: blackHawk as River,
      gauge: makeRiverGauge(blackHawk as River, 300, 'steady', 0),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    const thresholdFactor = result.factors.find((factor) => factor.id === 'threshold-quality');
    const difficultyFactor = result.factors.find((factor) => factor.id === 'difficulty');
    expect(result.gaugeBand).toBe('ideal');
    expect(result.confidence.label === 'Medium' || result.confidence.label === 'High').toBe(true);
    expect(thresholdFactor?.value).toBe('Official numeric guidance');
    expect(difficultyFactor?.impact).toBe('warning');
  });

  it('treats Rice Creek inside the RCWD band as an official same-day call', () => {
    expect(riceCreek).toBeDefined();

    const result = scoreRiverCondition({
      river: riceCreek as River,
      gauge: makeRiverGauge(riceCreek as River, 7.1, 'steady', 0),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    const thresholdFactor = result.factors.find((factor) => factor.id === 'threshold-quality');
    expect(result.gaugeBand).toBe('ideal');
    expect(result.confidence.label === 'Medium' || result.confidence.label === 'High').toBe(true);
    expect(thresholdFactor?.value).toBe('Official numeric guidance');
  });

  it('keeps Rice Creek out of the 90s on a cold rainy day even when the gauge is ideal', () => {
    expect(riceCreek).toBeDefined();

    const result = scoreRiverCondition({
      river: riceCreek as River,
      gauge: makeRiverGauge(riceCreek as River, 7.27, 'steady', -0.02),
      weather: {
        ...weather,
        observedAt: '2026-04-01T11:15:00Z',
        temperatureF: 31,
        windMph: 7,
        gustMph: 19,
        next12hWindMphMax: 14.4,
        next12hPrecipProbabilityMax: 73,
        next12hPrecipitationIn: 0.144,
        next12hStormRisk: false,
      },
      now: new Date('2026-04-01T12:00:00Z'),
    });

    expect(result.gaugeBand).toBe('ideal');
    expect(result.score).toBeLessThan(90);
  expect(result.rating).toBe('Fair');
    expect(result.checklist.find((item) => item.label === 'Weather window')?.status).toBe('watch');
  });

  it('treats the lower Kettle inside the AW band as an in-play mixed-source call', () => {
    expect(kettle).toBeDefined();

    const result = scoreRiverCondition({
      river: kettle as River,
      gauge: makeRiverGauge(kettle as River, 8.1, 'steady', 0.2),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    const thresholdFactor = result.factors.find((factor) => factor.id === 'threshold-quality');
    expect(result.gaugeBand).toBe('ideal');
    expect(result.rating === 'Good' || result.rating === 'Strong').toBe(true);
    expect(thresholdFactor?.value).toBe('Mixed-source numeric guidance');
  });

  it('treats South Fork Zumbro at 3.4 ft as the intended narrow easy-window call', () => {
    expect(southForkZumbro).toBeDefined();

    const result = scoreRiverCondition({
      river: southForkZumbro as River,
      gauge: makeRiverGauge(southForkZumbro as River, 3.4, 'steady', 0),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    expect(result.gaugeBand).toBe('ideal');
    expect(result.rating === 'Good' || result.rating === 'Strong').toBe(true);
    expect(result.confidence.label).toBe('Medium');
  });

  it('treats Upper Iowa above 200 cfs as a minimum-met call rather than a fully calibrated ideal band', () => {
    expect(upperIowa).toBeDefined();

    const result = scoreRiverCondition({
      river: upperIowa as River,
      gauge: makeRiverGauge(upperIowa as River, 290, 'steady', 20),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    expect(result.gaugeBand).toBe('minimum-met');
  expect(result.rating).toBe('Fair');
    expect(result.confidence.label).toBe('Medium');
  });

  it('treats Root River around 300 cfs as a low-shoulder day instead of a perfect sweet-spot call', () => {
    expect(rootRiver).toBeDefined();

    const result = scoreRiverCondition({
      river: rootRiver as River,
      gauge: makeRiverGauge(rootRiver as River, 300, 'steady', 5),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    expect(result.gaugeBand).toBe('low-shoulder');
  expect(result.rating).toBe('Fair');
    expect(result.confidence.label === 'Medium' || result.confidence.label === 'High').toBe(true);
  });

  it('treats Wolf River around 500 cfs as the intended ideal-window call', () => {
    expect(wolfRiver).toBeDefined();

    const result = scoreRiverCondition({
      river: wolfRiver as River,
      gauge: makeRiverGauge(wolfRiver as River, 500, 'steady', 20),
      weather: {
        ...weather,
        observedAt: '2026-06-10T11:15:00Z',
      },
      now: new Date('2026-06-10T12:00:00Z'),
    });

    expect(result.gaugeBand).toBe('ideal');
    expect(result.rating === 'Good' || result.rating === 'Strong').toBe(true);
    expect(result.confidence.label).not.toBe('Low');
  });

  it('treats White River around 1.47 ft as the intended same-route target without pretending it is official guidance', () => {
    expect(whiteRiver).toBeDefined();

    const result = scoreRiverCondition({
      river: whiteRiver as River,
      gauge: {
        ...makeRiverGauge(whiteRiver as River, 1.47, 'steady', 0.08),
        observedAt: '2026-06-10T11:00:00Z',
      },
      weather: {
        ...weather,
        observedAt: '2026-06-10T11:15:00Z',
      },
      now: new Date('2026-06-10T12:00:00Z'),
    });

    const thresholdFactor = result.factors.find((factor) => factor.id === 'threshold-quality');
    expect(result.gaugeBand).toBe('ideal');
    expect(result.rating === 'Good' || result.rating === 'Strong').toBe(true);
    expect(result.confidence.label === 'Low' || result.confidence.label === 'Medium').toBe(true);
    expect(thresholdFactor?.value).toBe('Community numeric guidance');
  });

  it('treats Red Cedar near 6.7 ft as the intended same-route sweet spot without overstating the source quality', () => {
    expect(redCedarRiver).toBeDefined();

    const result = scoreRiverCondition({
      river: redCedarRiver as River,
      gauge: makeRiverGauge(redCedarRiver as River, 6.7, 'steady', 0.08),
      weather: {
        ...weather,
        observedAt: '2026-06-10T11:15:00Z',
      },
      now: new Date('2026-06-10T12:00:00Z'),
    });

    const thresholdFactor = result.factors.find((factor) => factor.id === 'threshold-quality');
    expect(result.gaugeBand).toBe('ideal');
    expect(result.rating === 'Good' || result.rating === 'Strong').toBe(true);
    expect(result.confidence.label === 'Low' || result.confidence.label === 'Medium').toBe(true);
    expect(thresholdFactor?.value).toBe('Community numeric guidance');
  });

  it('treats St. Croix Fox to Highway 70 above 1000 cfs as minimum-met rather than a fully calibrated sweet spot', () => {
    expect(stCroixFox70).toBeDefined();

    const result = scoreRiverCondition({
      river: stCroixFox70 as River,
      gauge: makeRiverGauge(stCroixFox70 as River, 1100, 'steady', 30),
      weather: {
        ...weather,
        observedAt: '2026-06-10T11:15:00Z',
      },
      now: new Date('2026-06-10T12:00:00Z'),
    });

    expect(result.gaugeBand).toBe('minimum-met');
  expect(result.rating).toBe('Fair');
    expect(result.score).toBeLessThanOrEqual(74);
  });

  it('treats Rum River inside the official DNR medium band as a high-confidence in-range call', () => {
    expect(rumRiver).toBeDefined();

    const result = scoreRiverCondition({
      river: rumRiver as River,
      gauge: makeRiverGauge(rumRiver as River, 1400, 'steady', 80),
      weather: {
        ...weather,
        observedAt: '2026-06-10T11:15:00Z',
      },
      now: new Date('2026-06-10T12:00:00Z'),
    });

    const thresholdFactor = result.factors.find((factor) => factor.id === 'threshold-quality');
    expect(result.gaugeBand).toBe('ideal');
    expect(result.rating === 'Good' || result.rating === 'Strong').toBe(true);
    expect(result.confidence.label === 'Medium' || result.confidence.label === 'High').toBe(true);
    expect(thresholdFactor?.value).toBe('Official numeric guidance');
  });

  it('treats Sauk River inside the DNR medium band as the intended easy-day window', () => {
    expect(saukRiver).toBeDefined();

    const result = scoreRiverCondition({
      river: saukRiver as River,
      gauge: makeRiverGauge(saukRiver as River, 15.9, 'steady', 0.2),
      weather: {
        ...weather,
        observedAt: '2026-06-10T11:15:00Z',
      },
      now: new Date('2026-06-10T12:00:00Z'),
    });

    expect(result.gaugeBand).toBe('ideal');
    expect(result.rating === 'Good' || result.rating === 'Strong').toBe(true);
    expect(result.confidence.label === 'Medium' || result.confidence.label === 'High').toBe(true);
  });

  it('treats Snake River in the DNR medium band as a supported same-day call with storm sensitivity', () => {
    expect(snakeRiver).toBeDefined();

    const result = scoreRiverCondition({
      river: snakeRiver as River,
      gauge: makeRiverGauge(snakeRiver as River, 4, 'steady', 0.3),
      weather: {
        ...weather,
        observedAt: '2026-06-10T11:15:00Z',
      },
      now: new Date('2026-06-10T12:00:00Z'),
    });

    const thresholdFactor = result.factors.find((factor) => factor.id === 'threshold-quality');
    expect(result.gaugeBand).toBe('ideal');
    expect(result.rating === 'Good' || result.rating === 'Strong').toBe(true);
    expect(result.confidence.label === 'Medium' || result.confidence.label === 'High').toBe(true);
    expect(thresholdFactor?.value).toBe('Official numeric guidance');
  });

  it('treats North Fork Crow inside the DNR medium band as a supported long-day call', () => {
    expect(northForkCrow).toBeDefined();

    const result = scoreRiverCondition({
      river: northForkCrow as River,
      gauge: makeRiverGauge(northForkCrow as River, 1020, 'steady', 35),
      weather: {
        ...weather,
        observedAt: '2026-06-10T11:15:00Z',
      },
      now: new Date('2026-06-10T12:00:00Z'),
    });

    const thresholdFactor = result.factors.find((factor) => factor.id === 'threshold-quality');
    expect(result.gaugeBand).toBe('ideal');
    expect(result.rating === 'Good' || result.rating === 'Strong').toBe(true);
    expect(result.confidence.label === 'Medium' || result.confidence.label === 'High').toBe(true);
    expect(thresholdFactor?.value).toBe('Official numeric guidance');
  });

  it('treats Minnehaha Creek inside the official MCWD band as an official in-range call', () => {
    expect(minnehahaCreek).toBeDefined();

    const result = scoreRiverCondition({
      river: minnehahaCreek as River,
      gauge: makeRiverGauge(minnehahaCreek as River, 110, 'steady', 8),
      weather: {
        ...weather,
        observedAt: '2026-06-10T11:15:00Z',
      },
      now: new Date('2026-06-10T12:00:00Z'),
    });

    const thresholdFactor = result.factors.find((factor) => factor.id === 'threshold-quality');
    expect(result.gaugeBand).toBe('ideal');
    expect(result.rating === 'Good' || result.rating === 'Strong').toBe(true);
    expect(result.confidence.label === 'Medium' || result.confidence.label === 'High').toBe(true);
    expect(thresholdFactor?.value).toBe('Official numeric guidance');
  });

  it('treats Sugar River above 60 cfs as an above-minimum easy-day candidate with capped upside', () => {
    expect(sugarRiver).toBeDefined();

    const result = scoreRiverCondition({
      river: sugarRiver as River,
      gauge: makeRiverGauge(sugarRiver as River, 95, 'steady', 4),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    expect(result.gaugeBand).toBe('minimum-met');
    expect(result.score).toBeLessThanOrEqual(74);
  expect(result.rating).toBe('Fair');
  });

  it('treats the lower Sugar River segment above 60 cfs as another minimum-met day rather than a calibrated sweet spot', () => {
    expect(sugarRiverCountyEe).toBeDefined();

    const result = scoreRiverCondition({
      river: sugarRiverCountyEe as River,
      gauge: makeRiverGauge(sugarRiverCountyEe as River, 95, 'steady', 4),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    expect(result.gaugeBand).toBe('minimum-met');
    expect(result.score).toBeLessThanOrEqual(74);
    expect(result.rating).toBe('Fair');
  });

  it('keeps the downstream Black Hawk reach inside the official DNR range with a high-confidence but conservative call', () => {
    expect(blackHawkDownstream).toBeDefined();

    const result = scoreRiverCondition({
      river: blackHawkDownstream as River,
      gauge: makeRiverGauge(blackHawkDownstream as River, 240, 'steady', 0),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    expect(result.gaugeBand).toBe('ideal');
    expect(result.confidence.label).toBe('High');
    expect(result.checklist.some((item) => item.label === 'Skill and access')).toBe(true);
  });

  it('treats Bark River IV above 55 cfs as minimum-met rather than a fully calibrated sweet-spot call', () => {
    expect(barkRiver).toBeDefined();

    const result = scoreRiverCondition({
      river: barkRiver as River,
      gauge: makeRiverGauge(barkRiver as River, 88, 'steady', 6),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    expect(result.gaugeBand).toBe('minimum-met');
    expect(result.outlooks.find((outlook) => outlook.id === 'weekend')?.availability).toBe('withheld');
    expect(result.score).toBeLessThanOrEqual(74);
  });

  it('treats Kickapoo above 60 cfs as minimum-met while keeping the upper call conservative', () => {
    expect(kickapoo).toBeDefined();

    const result = scoreRiverCondition({
      river: kickapoo as River,
      gauge: makeRiverGauge(kickapoo as River, 82, 'steady', 6),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    expect(result.gaugeBand).toBe('minimum-met');
    expect(result.score).toBeLessThanOrEqual(74);
    expect(result.checklist.some((item) => item.label === 'Skill and access')).toBe(true);
  });

  it('treats the Decorah Upper Iowa reach above 150 cfs as in play without claiming a calibrated sweet spot', () => {
    expect(upperIowaDecorah).toBeDefined();

    const result = scoreRiverCondition({
      river: upperIowaDecorah as River,
      gauge: makeRiverGauge(upperIowaDecorah as River, 240, 'steady', 10),
      weather: {
        ...weather,
        observedAt: '2026-05-10T11:15:00Z',
      },
      now,
    });

    expect(result.gaugeBand).toBe('minimum-met');
  expect(result.rating).toBe('Fair');
    expect(result.outlooks.find((outlook) => outlook.id === 'weekend')?.availability).toBe('withheld');
  });
});
