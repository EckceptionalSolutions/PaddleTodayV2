import { fetchJson } from './http';
import { readingSourceLabelForProvider } from './source-adapters';
import type { GaugeMetric, GaugeReading, GaugeSample, RiverGaugeSource, TrendDirection } from './types';

type UsgsResponse = {
  value?: {
    timeSeries?: Array<{
      variable?: {
        variableName?: string;
        variableCode?: Array<{ value?: string }>;
      };
      values?: Array<{
        value?: Array<{
          value?: string;
          dateTime?: string;
        }>;
      }>;
    }>;
  };
};

export async function fetchUsgsGaugeReading(source: RiverGaugeSource): Promise<GaugeReading | null> {
  const url = new URL('https://waterservices.usgs.gov/nwis/iv/');
  url.searchParams.set('format', 'json');
  url.searchParams.set('sites', source.siteId);
  url.searchParams.set('parameterCd', '00065,00060,00010');
  url.searchParams.set('period', 'PT168H');

  const data = await fetchJson<UsgsResponse>(url.toString(), {
    timeoutMs: 10_000,
    retries: 2,
  });

  const samplesByCode = new Map<string, GaugeSample[]>();
  for (const series of data.value?.timeSeries ?? []) {
    const code = series.variable?.variableCode?.[0]?.value;
    if (!code) {
      continue;
    }

    const samples = (series.values?.[0]?.value ?? [])
      .map((item) => {
        const observedAt = String(item?.dateTime ?? '');
        const value = Number(item?.value);
        if (!observedAt || !Number.isFinite(value)) {
          return null;
        }
        return { observedAt, value } satisfies GaugeSample;
      })
      .filter((sample): sample is GaugeSample => sample !== null)
      .sort((left, right) => new Date(left.observedAt).getTime() - new Date(right.observedAt).getTime());

    if (samples.length > 0) {
      samplesByCode.set(code, samples);
    }
  }

  const primaryCode = parameterCode(source.metric);
  const primarySamples = samplesByCode.get(primaryCode);
  if (!primarySamples || primarySamples.length === 0) {
    return null;
  }

  const latest = primarySamples.at(-1);
  if (!latest) {
    return null;
  }

  const latestTimestamp = new Date(latest.observedAt).getTime();
  const comparisonTarget = latestTimestamp - 24 * 60 * 60 * 1000;
  let comparison = primarySamples[0];
  for (const sample of primarySamples) {
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
  const latestGaugeHeight = latestValue(samplesByCode.get('00065'));
  const latestDischarge = latestValue(samplesByCode.get('00060'));
  const latestWaterTempC = latestValue(samplesByCode.get('00010'));

  return {
    sourceId: source.id,
    observedAt: latest.observedAt,
    current: latest.value,
    unit: source.unit,
    trend,
    delta24h,
    changePercent24h,
    recentSamples: sampleSeries(primarySamples, 56),
    gaugeHeightNow: latestGaugeHeight?.value ?? (primaryCode === '00065' ? latest.value : null),
    dischargeNow: latestDischarge?.value ?? (primaryCode === '00060' ? latest.value : null),
    waterTempF:
      typeof latestWaterTempC?.value === 'number' ? (latestWaterTempC.value * 9) / 5 + 32 : null,
    waterTempObservedAt: latestWaterTempC?.observedAt ?? null,
    gaugeSource: readingSourceLabelForProvider(source.provider),
    waterTempSource: latestWaterTempC ? 'USGS Water Data' : null,
  };
}

function latestValue(samples: GaugeSample[] | undefined) {
  return samples?.at(-1) ?? null;
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
