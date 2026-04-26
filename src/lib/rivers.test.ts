import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./server-cache', () => ({
  remember: async ({ load }: { load: () => Promise<unknown> }) => load(),
}));

vi.mock('./gauges', () => ({
  fetchGaugeReading: vi.fn(async () => null),
}));

vi.mock('./weather', () => ({
  fetchWeatherSnapshot: vi.fn(async () => null),
}));

import { getAllRiverScores } from './rivers';
import { getRiverScore, listRivers } from './rivers';
import { fetchGaugeReading } from './gauges';
import type { GaugeReading } from './types';

beforeEach(() => {
  vi.mocked(fetchGaugeReading).mockReset();
  vi.mocked(fetchGaugeReading).mockResolvedValue(null);
});

describe('getAllRiverScores', () => {
  it('preserves riverId so homepage grouping can collapse multi-route rivers', async () => {
    const scores = await getAllRiverScores();

    expect(scores.length).toBeGreaterThan(0);
    expect(scores.every((result) => typeof result.river.riverId === 'string' && result.river.riverId.length > 0)).toBe(
      true
    );

    const zumbroRoutes = scores.filter((result) => result.river.riverId === 'zumbro-river');
    expect(zumbroRoutes.length).toBeGreaterThan(1);
  });

  it('provides estimated paddle time for every seeded route', () => {
    const rivers = listRivers();

    expect(rivers.length).toBeGreaterThan(0);
    expect(
      rivers.every(
        (river) =>
          typeof river.logistics?.estimatedPaddleTime === 'string' &&
          river.logistics.estimatedPaddleTime.trim().length > 0
      )
    ).toBe(true);
  });

  it('tries a configured fallback gauge source when the primary provider is unavailable', async () => {
    const fallbackGauge: GaugeReading = {
      sourceId: 'usgs-05320000',
      observedAt: '2026-05-10T11:00:00Z',
      current: 5,
      unit: 'ft',
      trend: 'steady',
      delta24h: 0,
      changePercent24h: 0,
      recentSamples: [
        { observedAt: '2026-05-10T09:00:00Z', value: 5 },
        { observedAt: '2026-05-10T11:00:00Z', value: 5 },
      ],
      gaugeHeightNow: 5,
      dischargeNow: null,
      waterTempF: null,
      waterTempObservedAt: null,
      gaugeSource: 'USGS Water Data',
      waterTempSource: null,
    };

    vi.mocked(fetchGaugeReading).mockResolvedValueOnce(null).mockResolvedValueOnce(fallbackGauge);

    const result = await getRiverScore('blue-earth-river-rapidan-county-road-90');

    expect(result?.gauge?.sourceId).toBe('usgs-05320000');
    expect(vi.mocked(fetchGaugeReading).mock.calls[0]?.[0].provider).toBe('mn_dnr');
    expect(vi.mocked(fetchGaugeReading).mock.calls[1]?.[0].provider).toBe('usgs');
  });
});
