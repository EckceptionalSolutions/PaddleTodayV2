import { describe, expect, it, vi } from 'vitest';
import { buildUsgsGaugeContext } from './usgs-gauge-context';
import { gaugeContextRows } from '@paddletoday/api-contract';
import type { RiverGaugeSource } from './types';

const now = new Date('2026-10-16T16:00:00Z');
const source: RiverGaugeSource = { id: 'usgs-test', provider: 'usgs', siteId: '01234567', metric: 'discharge_cfs', unit: 'cfs', kind: 'direct', siteName: 'Test' };
function feature(time: string, value: unknown, code = '00060', extras = {}) {
  return { properties: { monitoring_location_id: 'USGS-01234567', parameter_code: code, statistic_id: '00011',
    time_series_id: code, time, value, unit_of_measure: code === '00010' ? 'degC' : code === '63680' ? 'FNU' : 'ft^3/s',
    approval_status: 'Provisional', qualifier: null, ...extras } };
}
const daily = feature('2026-10-15', '200', '00060', { statistic_id: '00003', time_series_id: 'daily' });
function normals(count = 30, series = 'daily') {
  return { features: [{ properties: { monitoring_location_id: 'USGS-01234567', data: [{
    parent_time_series_id: series, unit_of_measure: 'ft^3/s', parent_statistic_id: '00003', values: [{
      computation: 'percentile', approval_status: 'approved', time_of_year: '10-15', time_of_year_type: 'day_of_year',
      percentiles: ['25', '50', '75'], values: ['50', '100', '150'], sample_count: count,
    }],
  }] } }] };
}

describe('USGS gauge context', () => {
  it('compares exact sensor series and daily means, preserving independent measurement timestamps and qualifiers', async () => {
    const load = vi.fn(async (url: string) => {
      if (url.includes('latest-daily')) return { features: [daily] };
      if (url.includes('observationNormals')) return normals();
      return { features: [feature('2026-10-16T15:00:00Z', '100'), feature('2026-10-16T13:00:00Z', '80'),
        feature('2026-10-16T16:00:00Z', '120', '00060', { qualifier: 'e' }),
        feature('2026-10-15T16:00:00Z', '10', '00010'), feature('2026-10-16T16:00:00Z', '12', '00010'),
        feature('2026-10-16T14:00:00Z', '8', '63680', { unit_of_measure: '_FNU' })] };
    });
    const result = await buildUsgsGaugeContext(source, load, now);
    expect(result.primary?.qualifiers).toEqual(['e']);
    expect(result.changes.map(change => [change.hours, change.delta])).toEqual([[1, 20], [3, 40]]);
    expect(result.waterTemperature?.value).toBeCloseTo(53.6);
    expect(result.waterTemperatureChange24h).toBeCloseTo(3.6);
    expect(result.turbidity?.observedAt).toBe('2026-10-16T14:00:00Z');
    expect(result.turbidity?.unit).toBe('FNU');
    expect(result.seasonalFlow?.category).toBe('above typical');
    expect(result.seasonalFlow?.dailyMean.value).toBe(200);
    expect(gaugeContextRows(result)[0]?.value).toContain('Estimated');
    expect(load.mock.calls.find(([url]) => url.includes('observationNormals'))?.[0]).toContain('start_date=10-15');
  });

  it('does not fabricate changes across missing samples, other sensors, ice, or empty/sentinel values', async () => {
    const load = async (url: string) => ({ features: url.includes('latest-daily') ? [] : [
      feature('2026-10-16T16:00:00Z', '120', '00060', { qualifier: 'Ice' }),
      feature('2026-10-16T15:00:00Z', '100', '00060', { time_series_id: 'other-sensor' }),
      feature('2026-10-16T13:00:00Z', ''), feature('2026-10-16T16:00:00Z', '-999999', '00010'),
    ] });
    const result = await buildUsgsGaugeContext(source, load, now);
    expect(result.changes).toEqual([]);
    expect(result.waterTemperature?.value).toBeNull();
    expect(gaugeContextRows(result).find(row => row.label === 'Water temperature')).toBeUndefined();
    expect(gaugeContextRows(result)[0]?.value).toContain('Ice-affected');
  });

  it('does not call a 90-minute-old reading a one-hour change', async () => {
    const result = await buildUsgsGaugeContext(source, async url => ({ features: url.includes('latest-daily') ? [] : [
      feature('2026-10-16T16:00:00Z', '120'), feature('2026-10-16T14:30:00Z', '100'),
    ] }), now);
    expect(result.changes).toEqual([]);
  });

  it.each([['insufficient history', 4, 'daily'], ['different series', 30, 'other']])('withholds seasonal context for %s', async (_label, count, series) => {
    const result = await buildUsgsGaugeContext(source, async url => url.includes('observationNormals') ? normals(Number(count), String(series)) :
      { features: url.includes('latest-daily') ? [daily] : [] }, now);
    expect(result.seasonalFlow).toBeNull();
  });

  it('retains recent observations when statistics fail', async () => {
    const result = await buildUsgsGaugeContext(source, async url => {
      if (url.includes('latest-daily')) throw new Error('unavailable');
      return { features: [feature('2026-10-16T16:00:00Z', '120')] };
    }, now);
    expect(result.primary?.value).toBe(120);
    expect(result.unavailable).toContain('Seasonal statistics could not be retrieved');
  });

  it('follows bounded pagination and refuses to present a truncated history as complete', async () => {
    let pages = 0;
    const result = await buildUsgsGaugeContext(source, async url => {
      if (url.includes('latest-daily')) return { features: [] };
      pages++;
      return { features: [feature('2026-10-16T16:00:00Z', '120')], links: [{ rel: 'next', href: 'https://api.waterdata.usgs.gov/ogcapi/v1/collections/continuous/items?offset=1000' }] };
    }, now);
    expect(pages).toBe(4);
    expect(result.primary).toBeNull();
    expect(result.unavailable).toContain('Recent observations could not be retrieved');
  });
});
