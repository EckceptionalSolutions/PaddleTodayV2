import type { GaugeContextObservation, RiverGaugeContext } from '@paddletoday/api-contract';
import type { RiverGaugeSource } from './types';
import { fetchJson } from './http';
import { remember } from './server-cache';

const OGC = 'https://api.waterdata.usgs.gov/ogcapi/v1/collections/';
const STATS = 'https://api.waterdata.usgs.gov/statistics/v0/observationNormals';
type Properties = Record<string, unknown>;
type Collection = { features?: Array<{ properties?: Properties }>; links?: Array<{ rel: string; href: string }> };
type Sample = GaugeContextObservation & { series: string; code: string };
type Loader = (url: string) => Promise<Collection>;

function numeric(value: unknown): number | null {
  if (typeof value !== 'number' && typeof value !== 'string') return null;
  if (typeof value === 'string' && !value.trim()) return null;
  const result = Number(value);
  return Number.isFinite(result) && result > -9999 ? result : null;
}

function observation(properties: Properties): GaugeContextObservation | null {
  if (typeof properties.time !== 'string' || !Number.isFinite(Date.parse(properties.time))) return null;
  const qualifier = properties.qualifier;
  return {
    value: numeric(properties.value), unit: String(properties.unit_of_measure ?? '').replace(/^_FNU$/, 'FNU'), observedAt: properties.time,
    approvalStatus: typeof properties.approval_status === 'string' ? properties.approval_status : null,
    qualifiers: typeof qualifier === 'string' ? qualifier.split(',').map(value => value.trim()).filter(Boolean) : [],
  };
}

function iceAffected(sample: GaugeContextObservation) {
  return sample.qualifiers.some(flag => /ice|^i$/i.test(flag));
}

// Only compare samples from the same sensor series with an actual baseline near the requested time.
export function changeOver(samples: Sample[], latest: Sample, hours: number): { delta: number; from: string; to: string } | null {
  if (latest.value === null || iceAffected(latest)) return null;
  const target = Date.parse(latest.observedAt) - hours * 3_600_000;
  const tolerance = hours === 24 ? 60 * 60_000 : 20 * 60_000;
  const baseline = samples.filter(sample => sample.series === latest.series && sample.value !== null &&
    !iceAffected(sample) && Date.parse(sample.observedAt) < Date.parse(latest.observedAt) &&
    Math.abs(Date.parse(sample.observedAt) - target) <= tolerance)
    .sort((a, b) => Math.abs(Date.parse(a.observedAt) - target) - Math.abs(Date.parse(b.observedAt) - target))[0];
  return baseline ? { delta: latest.value - baseline.value!, from: baseline.observedAt, to: latest.observedAt } : null;
}

function urlFor(collection: string, siteId: string, parameters: Record<string, string>) {
  const url = new URL(`${OGC}${collection}/items`);
  url.search = new URLSearchParams({ monitoring_location_id: `USGS-${siteId}`, f: 'json', limit: '1000', ...parameters }).toString();
  return url.toString();
}

export async function buildUsgsGaugeContext(source: RiverGaugeSource, load: Loader, now = new Date()): Promise<RiverGaugeContext> {
  const result: RiverGaugeContext = { siteId: source.siteId,
    sourceUrl: `https://waterdata.usgs.gov/monitoring-location/USGS-${source.siteId}/`, fetchedAt: now.toISOString(),
    primary: null, changes: [], waterTemperature: null, waterTemperatureChange24h: null, turbidity: null,
    seasonalFlow: null, unavailable: [] };
  const [continuous, seasonal] = await Promise.allSettled([
    (async () => {
      let next: string | undefined = urlFor('continuous', source.siteId, {
        parameter_code: '00060,00065,00010,63680', statistic_id: '00011',
        datetime: `${new Date(now.getTime() - 30 * 3_600_000).toISOString()}/${now.toISOString()}`,
      });
      const samples: Sample[] = [];
      for (let page = 0; next && page < 4; page++) {
        const data: Collection = await load(next);
        if (!Array.isArray(data.features)) throw new Error('Invalid observation response');
        for (const feature of data.features) {
          const p = feature.properties;
          if (!p || p.monitoring_location_id !== `USGS-${source.siteId}` || p.statistic_id !== '00011') continue;
          const sample = observation(p);
          if (!sample || typeof p.time_series_id !== 'string' || Date.parse(sample.observedAt) > now.getTime() + 5 * 60_000) continue;
          samples.push({ ...sample, series: p.time_series_id, code: String(p.parameter_code) });
        }
        const href: string | undefined = data.links?.find(link => link.rel === 'next')?.href;
        next = href ? new URL(href, next).toString() : undefined;
        if (next && !next.startsWith(`${OGC}continuous/items?`)) throw new Error('Unexpected pagination URL');
      }
      if (next) throw new Error('Observation page limit exceeded');
      const latest = (code: string, unit: string) => samples.filter(sample => sample.code === code && sample.unit === unit)
        .sort((a, b) => Date.parse(b.observedAt) - Date.parse(a.observedAt) || a.series.localeCompare(b.series))[0];
      const primary = source.metric === 'discharge_cfs' ? latest('00060', 'ft^3/s') : latest('00065', 'ft');
      if (primary) {
        result.primary = { ...primary, unit: source.unit };
        result.changes = [1, 3].flatMap(hours => {
          const change = changeOver(samples, primary, hours);
          return change ? [{ hours, ...change }] : [];
        });
      }
      const temperature = latest('00010', 'degC');
      if (temperature) {
        result.waterTemperature = { ...temperature, value: temperature.value === null ? null : temperature.value * 9 / 5 + 32, unit: '°F' };
        const change = changeOver(samples, temperature, 24);
        result.waterTemperatureChange24h = change ? change.delta * 9 / 5 : null;
      }
      result.turbidity = latest('63680', 'FNU') ?? null;
    })(),
    (async () => {
      const daily = await load(urlFor('latest-daily', source.siteId, { parameter_code: '00060', statistic_id: '00003' }));
      if (!Array.isArray(daily.features)) throw new Error('Invalid daily response');
      const candidates = daily.features.map(feature => feature.properties).filter((p): p is Properties => Boolean(p &&
        p.monitoring_location_id === `USGS-${source.siteId}` && p.parameter_code === '00060' && p.statistic_id === '00003' && p.unit_of_measure === 'ft^3/s'))
        .sort((a, b) => String(b.time).localeCompare(String(a.time)));
      const p = candidates[0];
      if (!p || typeof p.time !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(p.time) || p.time >= now.toISOString().slice(0, 10)) return;
      const mean = observation(p);
      if (!mean || mean.value === null || iceAffected(mean) || Date.parse(mean.observedAt) >= now.getTime()) return;
      const day = p.time.slice(5);
      const url = new URL(STATS);
      url.search = new URLSearchParams({ monitoring_location_id: `USGS-${source.siteId}`, parameter_code: '00060',
        parent_time_series_id: String(p.time_series_id), computation_type: 'percentile', normal_type: 'DOY', start_date: day, end_date: day }).toString();
      const data = await load(url.toString());
      if (!Array.isArray(data.features)) throw new Error('Invalid statistics response');
      for (const feature of data.features) {
        if (feature.properties?.monitoring_location_id !== `USGS-${source.siteId}`) continue;
        const series = feature.properties.data;
        if (!Array.isArray(series)) continue;
        for (const s of series) {
          if (s.parent_time_series_id !== p.time_series_id || s.unit_of_measure !== 'ft^3/s' || s.parent_statistic_id !== '00003' || !Array.isArray(s.values)) continue;
          for (const stat of s.values) {
            if (stat.computation !== 'percentile' || stat.time_of_year !== day || stat.time_of_year_type !== 'day_of_year' ||
              stat.approval_status !== 'approved' || !Array.isArray(stat.percentiles) || !Array.isArray(stat.values) ||
              !Number.isInteger(Number(stat.sample_count)) || Number(stat.sample_count) < 10) continue;
            const percentile = (n: number) => numeric(stat.values[stat.percentiles.findIndex((value: unknown) => Number(value) === n)]);
            const lower = percentile(25), median = percentile(50), upper = percentile(75);
            if (lower === null || median === null || upper === null || lower < 0 || lower > median || median > upper) continue;
            result.seasonalFlow = { dailyMean: { ...mean, unit: 'cfs' }, date: p.time, lowerQuartile: lower, median,
              upperQuartile: upper, sampleCount: Number(stat.sample_count), category: mean.value < lower ? 'below typical' : mean.value > upper ? 'above typical' : 'typical' };
          }
        }
      }
    })(),
  ]);
  if (continuous.status === 'rejected') result.unavailable.push('Recent observations could not be retrieved');
  if (seasonal.status === 'rejected') result.unavailable.push('Seasonal statistics could not be retrieved');
  if (continuous.status === 'rejected' && seasonal.status === 'rejected') throw new Error('USGS gauge context unavailable');
  if (!result.primary) result.unavailable.push('Recent primary-gauge observations unavailable');
  if (result.waterTemperature?.value == null) result.unavailable.push('No recent water-temperature measurement');
  if (result.turbidity?.value == null) result.unavailable.push('No recent turbidity measurement');
  if (!result.seasonalFlow && seasonal.status === 'fulfilled') result.unavailable.push('Insufficient seasonal flow statistics');
  return result;
}

export function getUsgsGaugeContext(source: RiverGaugeSource) {
  const request = (url: string) => fetchJson<Collection>(url, { timeoutMs: 8000, retries: 1,
    headers: process.env.USGS_API_KEY ? { 'X-Api-Key': process.env.USGS_API_KEY } : {} });
  return remember({ namespace: 'usgs-gauge-context', key: `${source.siteId}:${source.metric}`, ttlMs: 5 * 60_000,
    maxEntries: 256, staleWhileErrorMs: 30 * 60_000,
    load: () => buildUsgsGaugeContext(source, url => url.startsWith(STATS)
      ? remember({ namespace: 'usgs-seasonal-statistics', key: url, ttlMs: 24 * 60 * 60_000, maxEntries: 2048, load: () => request(url) })
      : request(url)) });
}
