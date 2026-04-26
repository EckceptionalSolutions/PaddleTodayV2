import { afterEach, describe, expect, it, vi } from 'vitest';

import { fetchMnDnrGaugeReading } from './mn-dnr';
import type { RiverGaugeSource } from './types';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('fetchMnDnrGaugeReading', () => {
  it('normalizes a current DNR reading without inventing chart samples', async () => {
    const source: RiverGaugeSource = {
      id: 'mn-dnr-13',
      provider: 'mn_dnr',
      siteId: '13',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Cannon River at Welch, MN',
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          sites: [
            {
              id: 13,
              type: 'csg',
              csg_id: '39004002',
              name: 'Cannon River at Welch, MN',
              variable: 262,
              reading: 1070,
              tstamp: '2026-04-26 01:00 PM',
              age: 3,
              rating: 3,
            },
          ],
          site_ratings: [{ id: 13, val1: 300, val2: 1540, rating: 3 }],
        }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json; charset=utf-8',
          },
        }
      )
    );

    vi.stubGlobal('fetch', fetchMock);

    const reading = await fetchMnDnrGaugeReading(source);

    expect(reading).toMatchObject({
      sourceId: 'mn-dnr-13',
      observedAt: '2026-04-26T18:00:00.000Z',
      current: 1070,
      unit: 'cfs',
      trend: 'unknown',
      delta24h: null,
      changePercent24h: null,
      recentSamples: [],
      gaugeHeightNow: null,
      dischargeNow: 1070,
      gaugeSource: 'MN DNR River Levels',
      waterTempSource: null,
      gaugeInterpretation: 'Medium',
    });
  });

  it('returns null when the configured metric does not match the DNR variable', async () => {
    const source: RiverGaugeSource = {
      id: 'mn-dnr-13',
      provider: 'mn_dnr',
      siteId: '13',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Cannon River at Welch, MN',
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          sites: [
            {
              id: 13,
              variable: 262,
              reading: 1070,
              tstamp: '2026-04-26 01:00 PM',
            },
          ],
          site_ratings: [],
        }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json; charset=utf-8',
          },
        }
      )
    );

    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchMnDnrGaugeReading(source)).resolves.toBeNull();
  });
});
