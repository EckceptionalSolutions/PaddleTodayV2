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
      gaugeInterpretationRanges: ['Medium from 300 to 1,540 cfs'],
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

  it('falls back to the public CSG site API for telemetry stations outside the river-level summary', async () => {
    const source: RiverGaugeSource = {
      id: 'mn-dnr-01022001',
      provider: 'mn_dnr',
      siteId: '01022001',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'proxy',
      siteName: 'Brule River nr Hovland, MN61',
    };
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ sites: [], site_ratings: [] }), {
          status: 200,
          headers: { 'content-type': 'application/json; charset=utf-8' },
        }),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            status: 'SUCCESS',
            result: {
              id: '01022001',
              data: {
                provisional: {
                  latest_observations: [
                    { variable: 232, value: 20.14, timestamp: 1785584700 },
                    { variable: 262, value: 60.5, timestamp: 1785584700 },
                  ],
                },
              },
            },
          }),
          {
            status: 200,
            headers: { 'content-type': 'application/json; charset=utf-8' },
          },
        ),
      );

    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchMnDnrGaugeReading(source)).resolves.toMatchObject({
      sourceId: 'mn-dnr-01022001',
      observedAt: '2026-08-01T11:45:00.000Z',
      current: 60.5,
      unit: 'cfs',
      gaugeHeightNow: null,
      dischargeNow: 60.5,
      gaugeInterpretation: null,
      gaugeInterpretationRanges: [],
    });
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'https://webapps.dnr.state.mn.us/csg/api/v1/sites/01022001',
      expect.any(Object),
    );
  });
});
