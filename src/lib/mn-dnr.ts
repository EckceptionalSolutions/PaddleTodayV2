import { fetchJson } from './http';
import type { GaugeReading, GaugeSample, GaugeUnit, RiverGaugeSource } from './types';

const DNR_RIVER_LEVELS_URL = 'https://maps.dnr.state.mn.us/pat/river_levels/lib/river_level_sites.json';
const DNR_SOURCE_LABEL = 'MN DNR River Levels';
const DNR_RATING_LABELS: Record<number, string> = {
  0: 'Not interpreted',
  1: 'Very High',
  2: 'High',
  3: 'Medium',
  4: 'Low',
  5: 'Scrapable',
  6: 'No current reading',
};

type MnDnrRiverLevelsResponse = {
  sites?: MnDnrSite[];
  site_ratings?: Array<{
    id?: number;
    val1?: number;
    val2?: number;
    rating?: number;
  }>;
};

type MnDnrSite = {
  id?: number;
  type?: string;
  csg_id?: string;
  name?: string;
  variable?: number;
  reading?: number | string;
  tstamp?: string;
  age?: number;
  rating?: number;
};

export async function fetchMnDnrGaugeReading(source: RiverGaugeSource): Promise<GaugeReading | null> {
  const data = await fetchJson<MnDnrRiverLevelsResponse>(DNR_RIVER_LEVELS_URL, {
    timeoutMs: 10_000,
    retries: 2,
  });

  const site = findSite(data.sites ?? [], source);
  if (!site) {
    return null;
  }

  const current = Number(site.reading);
  if (!Number.isFinite(current)) {
    return null;
  }

  const unit = unitFromVariable(site.variable);
  if (!unit || unit !== source.unit) {
    return null;
  }

  const observedAt = observedAtFromDnrSite(site);
  if (!observedAt) {
    return null;
  }

  return {
    sourceId: source.id,
    observedAt,
    current,
    unit,
    trend: 'unknown',
    delta24h: null,
    changePercent24h: null,
    recentSamples: [] satisfies GaugeSample[],
    gaugeHeightNow: unit === 'ft' ? current : null,
    dischargeNow: unit === 'cfs' ? current : null,
    waterTempF: null,
    waterTempObservedAt: null,
    gaugeSource: DNR_SOURCE_LABEL,
    waterTempSource: null,
    gaugeInterpretation: dnrRatingLabel(site.rating),
  };
}

function dnrRatingLabel(rating: number | undefined): string | null {
  return typeof rating === 'number' ? DNR_RATING_LABELS[rating] ?? null : null;
}

function findSite(sites: MnDnrSite[], source: RiverGaugeSource): MnDnrSite | null {
  const wantedSiteId = Number(source.siteId);
  const wantedVariable = variableFromMetric(source.metric);

  return (
    sites.find((site) => {
      const idMatches =
        (Number.isFinite(wantedSiteId) && site.id === wantedSiteId) || site.csg_id === source.siteId;
      return idMatches && site.variable === wantedVariable;
    }) ?? null
  );
}

function variableFromMetric(metric: RiverGaugeSource['metric']): number {
  return metric === 'discharge_cfs' ? 262 : 232;
}

function unitFromVariable(variable: number | undefined): GaugeUnit | null {
  if (variable === 262) return 'cfs';
  if (variable === 232) return 'ft';
  return null;
}

function observedAtFromDnrSite(site: MnDnrSite): string | null {
  if (typeof site.tstamp === 'string' && site.tstamp.trim()) {
    return parseMinnesotaTimestamp(site.tstamp.trim());
  }

  if (typeof site.age === 'number' && Number.isFinite(site.age) && site.age >= 0) {
    return new Date(Date.now() - site.age * 60 * 60 * 1000).toISOString();
  }

  return null;
}

function parseMinnesotaTimestamp(value: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})\s+(\d{1,2}):(\d{2})\s+([AP]M)$/i.exec(value);
  if (!match) {
    return null;
  }

  const [, year, month, day, hourText, minute, meridiem] = match;
  let hour = Number(hourText);
  if (!Number.isFinite(hour)) {
    return null;
  }

  if (meridiem.toUpperCase() === 'PM' && hour !== 12) {
    hour += 12;
  } else if (meridiem.toUpperCase() === 'AM' && hour === 12) {
    hour = 0;
  }

  const utcGuess = Date.UTC(Number(year), Number(month) - 1, Number(day), hour, Number(minute));
  const offsetMinutes = timeZoneOffsetMinutes(new Date(utcGuess), 'America/Chicago');
  return new Date(utcGuess - offsetMinutes * 60 * 1000).toISOString();
}

function timeZoneOffsetMinutes(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const localAsUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second)
  );

  return (localAsUtc - date.getTime()) / 60000;
}
