import { describe, expect, it, vi } from 'vitest';

vi.mock('./server-cache', () => ({
  remember: async ({ load }: { load: () => Promise<unknown> }) => load(),
}));

vi.mock('./usgs', () => ({
  fetchGaugeReading: vi.fn(async () => null),
}));

vi.mock('./weather', () => ({
  fetchWeatherSnapshot: vi.fn(async () => null),
}));

import { getAllRiverScores } from './rivers';

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
});
