import { fetchJson } from './http';
import type { GaugeMetric, GaugeReading, GaugeSample, RiverGaugeSource, TrendDirection } from './types';

type UsgsResponse = {
  value?: {
    timeSeries?: Array<{
      values?: Array<{
        value?: Array<{
          value?: string;
          dateTime?: string;
        }>;
      }>;
    }>;
  };
};

export async function fetchGaugeReading(source: RiverGaugeSource): Promise<GaugeReading | null> {
  const url = new URL('https://waterservices.usgs.gov/nwis/iv/');
  url.searchParams.set('format', 'json');
  url.searchParams.set('sites', source.siteId);
  url.searchParams.set('parameterCd', parameterCode(source.metric));
  url.searchParams.set('period', 'PT168H');

  const data = await fetchJson<UsgsResponse>(url.toString(), {
    timeoutMs: 10_000,
    retries: 2,
  });

  const values = data.value?.timeSeries?.[0]?.values?.[0]?.value ?? [];
  const samples = values
    .map((item) => {
      const observedAt = String(item?.dateTime ?? '');
      const value = Number(item?.value);

      if (!observedAt || !Number.isFinite(value)) {
        return null;
      }

      return {
        observedAt,
        value,
      } satisfies GaugeSample;
    })
    .filter((sample): sample is GaugeSample => sample !== null)
    .sort((left, right) => new Date(left.observedAt).getTime() - new Date(right.observedAt).getTime());

  if (samples.length === 0) {
    return null;
  }

  const latest = samples[samples.length - 1];
  const latestTimestamp = new Date(latest.observedAt).getTime();
  const comparisonTarget = latestTimestamp - 24 * 60 * 60 * 1000;

  let comparison = samples[0];
  for (const sample of samples) {
    const timestamp = new Date(sample.observedAt).getTime();
    if (timestamp <= comparisonTarget) {
      comparison = sample;
      continue;
    }
    break;
  }

  const delta24h = latest.value - comparison.value;
  const changePercent24h = comparison.value === 0 ? null : (delta24h / comparison.value) * 100;
  const trend = classifyTrend(source.metric, delta24h, latest.value);

  return {
    sourceId: source.id,
    observedAt: latest.observedAt,
    current: latest.value,
    unit: source.unit,
    trend,
    delta24h,
    changePercent24h,
    recentSamples: sampleSeries(samples, 56),
  };
}

function parameterCode(metric: GaugeMetric): string {
  return metric === 'discharge_cfs' ? '00060' : '00065';
}

function classifyTrend(metric: GaugeMetric, delta24h: number, current: number): TrendDirection {
  if (!Number.isFinite(delta24h) || !Number.isFinite(current)) {
    return 'unknown';
  }

  if (metric === 'gage_height_ft') {
    if (delta24h >= 0.18) return 'rising';
    if (delta24h <= -0.18) return 'falling';
    return 'steady';
  }

  const threshold = Math.max(30, current * 0.08);
  if (delta24h >= threshold) return 'rising';
  if (delta24h <= -threshold) return 'falling';
  return 'steady';
}

function sampleSeries(samples: GaugeSample[], maxSamples: number): GaugeSample[] {
  if (samples.length <= maxSamples) {
    return samples;
  }

  const sampled: GaugeSample[] = [];
  const step = (samples.length - 1) / Math.max(maxSamples - 1, 1);

  for (let index = 0; index < maxSamples; index += 1) {
    sampled.push(samples[Math.round(index * step)]);
  }

  return sampled.filter((sample, index) => index === 0 || sample !== sampled[index - 1]);
}
