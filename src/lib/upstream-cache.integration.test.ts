import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchGaugeReading } from './gauges';
import { fetchWeatherSnapshot } from './weather';
import { getAllRiverScores, getRiverWeather, getUpstreamCacheLimits, listRivers } from './rivers';
import { forgetCache, getCacheStats, remember } from './server-cache';

vi.mock('./gauges', () => ({ fetchGaugeReading: vi.fn(async () => null) }));
vi.mock('./weather', () => ({ fetchWeatherSnapshot: vi.fn(async () => null) }));

beforeEach(() => { forgetCache('', { prefix: true }); vi.clearAllMocks(); });

describe('catalog provider cache integration', () => {
  it('reuses a full scored sweep and planning weather without cross-namespace eviction', async () => {
    const first = await getAllRiverScores();
    const gaugeLoads = vi.mocked(fetchGaugeReading).mock.calls.length;
    const weatherLoads = vi.mocked(fetchWeatherSnapshot).mock.calls.length;
    expect(first.length).toBeGreaterThan(1000);
    expect(gaugeLoads).toBeGreaterThan(0); expect(weatherLoads).toBeGreaterThan(0);
    await remember({ key: 'snapshot:isolated', namespace: 'snapshot', maxEntries: 96, ttlMs: 60000, load: async () => 'stored' });
    await getAllRiverScores();
    expect(fetchGaugeReading).toHaveBeenCalledTimes(gaugeLoads);
    expect(fetchWeatherSnapshot).toHaveBeenCalledTimes(weatherLoads);
    for (const route of listRivers().filter(route => route.scoreEligibility === 'planning')) await getRiverWeather(route.slug);
    const allWeatherLoads = vi.mocked(fetchWeatherSnapshot).mock.calls.length;
    await getAllRiverScores();
    expect(fetchGaugeReading).toHaveBeenCalledTimes(gaugeLoads);
    expect(fetchWeatherSnapshot).toHaveBeenCalledTimes(allWeatherLoads);
    const snapshotLoad = vi.fn(async () => 'unexpected');
    expect(await remember({ key: 'snapshot:isolated', namespace: 'snapshot', maxEntries: 96, ttlMs: 60000, load: snapshotLoad })).toBe('stored');
    expect(snapshotLoad).not.toHaveBeenCalled();
    expect(getCacheStats().namespaces.weather.entries).toBeLessThanOrEqual(getUpstreamCacheLimits().weather);
  });
});
