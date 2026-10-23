import { describe, expect, it } from 'vitest';
import { embedOptions, embedReading, embedConditions, embedDateTime, embedForecast, embedRouteSearch, gaugeSparkline, routeEmbedPlanUrl, routeEmbedSnippet, routeEmbedUrl } from './route-embed';
import type { EmbedReadingInput, EmbedConditionsInput } from './route-embed';

const now = Date.parse('2026-10-21T16:00:00Z');
function fixture(): EmbedReadingInput {
  return {
    generatedAt: '2026-10-21T15:55:00Z',
    gauge: { sourceId: 'usgs-03245500', current: 0, unit: 'ft', observedAt: '2026-10-21T15:45:00Z',
      trend: 'falling', delta24h: null, changePercent24h: null, recentSamples: [], gaugeHeightNow: 0,
      dischargeNow: null, waterTempF: null, waterTempObservedAt: null, gaugeSource: 'USGS', waterTempSource: null },
    liveData: { overall: 'live', summary: '', gauge: { state: 'live', ageMinutes: 15, detail: '' },
      weather: { state: 'live', ageMinutes: 15, detail: '' } },
  };
}

function conditionsFixture(): EmbedConditionsInput {
  const base = fixture();
  return { ...base, gauge: { ...base.gauge!, current: 3 },
    river: { scoreEligibility: 'scored', gaugeSource: { unit: 'ft' }, profile: { thresholdModel: 'two-sided', idealMin: 2, idealMax: 4, tooLow: 1, tooHigh: 6 } } as EmbedConditionsInput['river'],
    score: 76, rating: 'Good', readiness: { status: 'ready', label: 'Ready', reason: 'Current inputs' },
    confidence: { score: 90, label: 'High', level: 'high', reasons: [], warnings: [], rationale: [] },
    gaugeBand: 'ideal', gaugeBandLabel: 'Within preferred range',
    weather: { timeZone: 'America/New_York', observedAt: base.generatedAt, temperatureF: 68, windMph: 7, gustMph: 9,
      currentPrecipitationIn: 0, next12hPrecipProbabilityMax: 20, next12hPrecipitationIn: 0,
      next12hPrecipStartsInHours: null, next12hWindMphMax: 10, next12hStormRisk: false,
      weatherCode: 0, conditionLabel: 'Clear', todayHourly: [], tomorrow: null, weekend: null,
      recentRain24hIn: 0, recentRain72hIn: 0, precipitationProbabilityNow: 0, rainTimingLabel: 'None',
      weatherSource: 'Open-Meteo', rainfallSource: null, waterTempSource: null },
  };
}

describe('embeddable conditions summary', () => {
  it('dates snapshots and observations using the river forecast offset instead of the visitor timezone', () => {
    expect(embedDateTime('2026-10-22T01:30:00Z', '2026-10-21T21:00:00-04:00'))
      .toMatchObject({ dateKey: '2026-10-21', dateLabel: 'Wed, Oct 21, 2026', timeLabel: '9:30 PM', zoneLabel: 'UTC−04:00' });
    expect(embedDateTime('invalid')).toBeNull();
    expect(embedDateTime('2026-10-22T01:30:00Z')?.zoneLabel).toBe('UTC');
    // NWS may serialize an adjacent grid's offset; the forecast location wins.
    expect(embedDateTime('2026-10-21T23:00:00-05:00', undefined, 'America/New_York'))
      .toMatchObject({ dateKey: '2026-10-22', hourLabel: '12 AM', zoneLabel: 'EDT' });
    expect(embedDateTime('2026-10-21T23:00:00-05:00', undefined, 'UTC'))
      .toMatchObject({ dateKey: '2026-10-22', hourLabel: '4 AM', zoneLabel: 'UTC' });
  });
  it('shows every supplied forecast hour, marks midnight, and preserves zero and missing measurements', () => {
    const input = conditionsFixture();
    const hour = { time: '2026-10-21T23:00:00-04:00', label: '11 PM', isDaytime: false,
      temperatureF: 0, windMph: 0, windGustMph: null, precipProbability: 0,
      precipitationIn: null, weatherCode: 0, conditionLabel: 'Clear' };
    input.weather!.todayHourly = [
      { ...hour, time: '2026-10-22T00:00:00-04:00', temperatureF: null, windMph: null, precipProbability: null, weatherCode: null, conditionLabel: null },
      hour, hour, { ...hour, time: 'invalid' },
      { ...hour, time: '2026-10-20T23:00:00-04:00' },
    ];
    const forecast = embedForecast(input.weather, input.generatedAt);
    expect(forecast.dates).toBe('Oct 21 – Oct 22');
    expect(forecast.zone).toBe('River time · EDT');
    expect(forecast.hours).toHaveLength(2);
    expect(forecast.hours[0]).toMatchObject({ label: '11 PM', temperature: '0°', rain: '0%', wind: '0', kind: 'night' });
    expect(forecast.hours[1]).toMatchObject({ label: 'Oct 22 · 12 AM', temperature: '—', rain: '—', wind: '—', kind: 'unknown' });
    input.liveData.weather.state = 'unavailable';
    expect(embedConditions(input, 'fresh', { now }).forecast.hours).toEqual([]);
    delete input.weather!.timeZone;
    expect(embedForecast(input.weather, input.generatedAt).zone).toBe('Source time · UTC−04:00');
  });
  it('includes the API score, weather and a calibrated water-range graphic', () => {
    const model = embedConditions(conditionsFixture(), 'fresh', { now });
    expect(model.score).toMatchObject({ value: 76, label: 'Paddle today', tone: 'paddle' });
    expect(model.weather).toMatchObject({ temperature: '68°F', wind: '10 mph', rain: '20%', stale: false });
    expect(model.band).toMatchObject({ kind: 'two-sided', statusLabel: 'Within preferred range' });
  });
  it('removes current scores for failed refreshes, stale inputs and explicit withheld decisions', () => {
    expect(embedConditions(conditionsFixture(), 'stale', { now }).score.value).toBeNull();
    expect(embedConditions(conditionsFixture(), 'fresh', { now, failed: true }).score.value).toBeNull();
    const input = conditionsFixture(); input.readiness.status = 'withheld';
    expect(embedConditions(input, 'fresh', { now }).score.value).toBeNull();
    input.readiness.status = 'ready'; input.weather!.observedAt = '2026-10-20T10:00:00Z';
    expect(embedConditions(input, 'fresh', { now }).score.value).toBeNull();
  });
  it('preserves zero score and zero weather measurements', () => {
    const input = conditionsFixture(); input.score = 0; input.rating = 'No-go'; input.readiness.status = 'skip';
    input.weather!.temperatureF = 0; input.weather!.next12hWindMphMax = 0; input.weather!.next12hPrecipProbabilityMax = 0;
    const model = embedConditions(input, 'fresh', { now });
    expect(model.score).toMatchObject({ value: 0, label: 'Skip today', tone: 'skip' });
    expect(model.weather).toMatchObject({ temperature: '0°F', wind: '0 mph', rain: '0%' });
  });
  it('offers weather on planning routes without fabricating a score or water range', () => {
    const input = conditionsFixture(); input.river.scoreEligibility = 'planning'; input.gauge = null;
    const model = embedConditions(input, 'fresh', { now });
    expect(model.score).toMatchObject({ value: null, label: 'Planning route' });
    expect(model.band).toBeNull();
    expect(model.weather.temperature).toBe('68°F');
  });
});

describe('partner route card data integrity', () => {
  it('keeps a real zero reading and labels aged readings without inventing a chart', () => {
    expect(embedReading(fixture(), 'fresh', now)).toMatchObject({ value: '0.00', stale: false, chart: null });
    expect(embedReading(fixture(), 'fresh', now + 3 * 3_600_000)?.stale).toBe(true);
    expect(embedReading(fixture(), 'stale', now)?.stale).toBe(true);
    const input = fixture(); input.liveData.gauge.state = 'stale';
    expect(embedReading(input, 'fresh', now)?.stale).toBe(true);
  });
  it('rejects invalid, missing and implausibly future observations', () => {
    const input = fixture(); input.gauge!.observedAt = '2026-10-21T17:00:00Z';
    expect(embedReading(input, 'fresh', now)).toBeNull();
    input.gauge!.observedAt = 'invalid';
    expect(embedReading(input, 'fresh', now)).toBeNull();
    input.gauge = null;
    expect(embedReading(input, 'fresh', now)).toBeNull();
  });
  it('withholds live status for stale or future snapshot generation times', () => {
    const input = fixture(); input.generatedAt = '2026-10-20T12:00:00Z';
    expect(embedReading(input, 'fresh', now)?.stale).toBe(true);
    input.generatedAt = '2026-10-21T18:00:00Z';
    expect(embedReading(input, 'fresh', now)?.stale).toBe(true);
  });
  it('labels actual 24-hour changes in the source units, preserving zero and unknown changes', () => {
    const input = fixture(); input.gauge!.delta24h = 0.38;
    expect(embedReading(input, 'fresh', now)?.change24h).toBe('+0.38 ft in 24h');
    input.gauge!.unit = 'cfs'; input.gauge!.current = 1245.4; input.gauge!.delta24h = 0;
    expect(embedReading(input, 'fresh', now)).toMatchObject({ value: '1,245', metric: 'River flow', change24h: '0 cfs in 24h' });
    input.gauge!.delta24h = null;
    expect(embedReading(input, 'fresh', now)?.change24h).toBeNull();
  });
  it('charts actual elapsed times and drops duplicate, future and invalid samples', () => {
    const chart = gaugeSparkline([
      { observedAt: '2026-10-21T15:00:00Z', value: 2 },
      { observedAt: '2026-10-21T12:00:00Z', value: 1 },
      { observedAt: '2026-10-21T16:00:00Z', value: 3 },
      { observedAt: '2026-10-21T16:00:00Z', value: 3 },
      { observedAt: '2026-10-22T16:00:00Z', value: 99 },
      { observedAt: 'invalid', value: NaN },
    ], now);
    expect(chart?.path).toBe('M2.0,52.0 L239.0,31.0 L318.0,10.0');
    expect(gaugeSparkline([{ observedAt: '2026-10-21T12:00:00Z', value: 1 }], now)).toBeNull();
  });
});

describe('portable embed code', () => {
  it('escapes route titles and query separators in HTML while preserving referral attribution', () => {
    const options = embedOptions(new URLSearchParams('theme=dark&branding=0&partner=River%20%3Cscript%3E%26Camp'));
    expect(options).toEqual({ theme: 'dark', layout: 'standard', accent: 'forest', branding: false, partner: 'riverscriptcamp' });
    const url = routeEmbedUrl('https://paddletoday.com', 'test-route', options);
    const snippet = routeEmbedSnippet(url, 'River "A" <B>');
    expect(snippet).toContain('theme=dark&amp;branding=0&amp;partner=riverscriptcamp');
    expect(snippet).toContain('River &quot;A&quot; &lt;B&gt;');
    expect(snippet).toContain('https://paddletoday.com/embed.js');
    const plan = routeEmbedPlanUrl('https://paddletoday.com', 'test-route', options.partner);
    expect(plan.pathname).toBe('/rivers/test-route/');
    expect(plan.searchParams.get('utm_source')).toBe('riverscriptcamp');
    expect(plan.searchParams.get('utm_campaign')).toBe('route-embed');
  });
  it('carries the compact layout into copied URLs and uses a smaller fallback frame', () => {
    const url = routeEmbedUrl('https://paddletoday.com', 'test-route', embedOptions(new URLSearchParams('layout=compact')));
    expect(url.searchParams.get('layout')).toBe('compact');
    expect(routeEmbedSnippet(url, 'Test')).toContain('height="680"');
    expect(embedOptions(new URLSearchParams('layout=unknown')).layout).toBe('standard');
  });
  it('retains supported accent colors and rejects arbitrary style values', () => {
    const options = embedOptions(new URLSearchParams('accent=river'));
    expect(routeEmbedUrl('https://paddletoday.com', 'test-route', options).searchParams.get('accent')).toBe('river');
    expect(embedOptions(new URLSearchParams('accent=red;background:url(evil)')).accent).toBe('forest');
  });
});

describe('partner route search', () => {
  it('accepts Paddle Today route URLs and normalizes ordinary search text', () => {
    expect(embedRouteSearch('https://paddletoday.com/rivers/little-miami-river-kelley-milford/?utm_source=test#trip-plan'))
      .toEqual({ slug: 'little-miami-river-kelley-milford', tokens: [] });
    expect(embedRouteSearch('  RÍVER   Ohio  ')).toEqual({ slug: null, tokens: ['river', 'ohio'] });
    expect(embedRouteSearch('https://other-site.test/rivers/test-route/').slug).toBeNull();
  });
});
