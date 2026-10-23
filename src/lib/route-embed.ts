import { SNAPSHOT_MAX_AGE_MS, SNAPSHOT_MAX_CLOCK_SKEW_MS, buildRiverWeatherViewModel, hourlyWeatherConditionKind, callLabelForDecision, callStateForDecision } from '@paddletoday/api-contract';
import type { RiverDetailApiResult, WeatherSnapshot } from '@paddletoday/api-contract';
import { isCurrentCallUnavailable } from './current-call-availability.js';
import { gaugeBandVisualModel } from './gauge-band-visual';
import { EMBED_REFERRAL_CAMPAIGN, normalizeEmbedPartner } from './embed-referrals';

export const DEFAULT_EMBED_ROUTE = 'little-miami-river-kelley-milford';
export const EMBED_FRAME_HEIGHT = 840;

export function embedOptions(params: URLSearchParams) {
  return {
    theme: params.get('theme') === 'dark' ? 'dark' : 'light',
    layout: params.get('layout') === 'compact' ? 'compact' : 'standard',
    accent: ['river', 'clay'].includes(params.get('accent') ?? '') ? params.get('accent')! : 'forest',
    branding: params.get('branding') !== '0',
    partner: normalizeEmbedPartner(params.get('partner')),
  };
}

export function routeEmbedUrl(origin: string, slug: string, options: ReturnType<typeof embedOptions>) {
  const url = new URL(`/embed/routes/${encodeURIComponent(slug)}/`, origin);
  if (options.theme === 'dark') url.searchParams.set('theme', 'dark');
  if (options.layout === 'compact') url.searchParams.set('layout', 'compact');
  if (options.accent !== 'forest') url.searchParams.set('accent', options.accent);
  if (!options.branding) url.searchParams.set('branding', '0');
  if (options.partner) url.searchParams.set('partner', options.partner);
  return url;
}

export function routeEmbedPlanUrl(origin: string, slug: string, partner = '') {
  const url = new URL(`/rivers/${encodeURIComponent(slug)}/`, origin);
  url.searchParams.set('utm_source', normalizeEmbedPartner(partner) || 'route-card');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', EMBED_REFERRAL_CAMPAIGN);
  url.searchParams.set('utm_content', slug);
  return url;
}

export function routeEmbedBrandUrl(origin: string, slug: string, partner = '') {
  const url = routeEmbedPlanUrl(origin, slug, partner);
  url.pathname = '/';
  return url;
}

function htmlAttribute(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}

export function routeEmbedSnippet(url: URL, title: string) {
  const height = url.searchParams.get('layout') === 'compact' ? 680 : EMBED_FRAME_HEIGHT;
  return `<iframe\n  data-paddletoday-route\n  src="${htmlAttribute(url.href)}"\n  title="${htmlAttribute(`${title} — river conditions and route`)}"\n  width="100%"\n  height="${height}"\n  style="border:0;max-width:480px;border-radius:24px;display:block"\n  loading="lazy"\n  referrerpolicy="strict-origin-when-cross-origin"\n></iframe>\n<script src="${htmlAttribute(new URL('/embed.js', url).href)}" defer></script>`;
}

export type EmbedReadingInput = Pick<RiverDetailApiResult, 'gauge' | 'liveData' | 'generatedAt'>;
export type EmbedConditionsInput = Pick<RiverDetailApiResult, 'river' | 'score' | 'rating' | 'readiness' | 'confidence' | 'gauge' | 'gaugeBand' | 'gaugeBandLabel' | 'liveData' | 'weather' | 'generatedAt'>;

/** Prefer the forecast location's timezone, retaining an explicit source-time fallback. */
export function embedDateTime(timestamp: string | null | undefined, reference = timestamp, timeZone?: string | null) {
  const instant = Date.parse(timestamp ?? '');
  if (!Number.isFinite(instant)) return null;
  const offset = reference?.match(/([+-])(\d{2}):(\d{2})$/);
  const minutes = offset ? (Number(offset[2]) * 60 + Number(offset[3])) * (offset[1] === '-' ? -1 : 1) : 0;
  let zone = 'UTC';
  let locationTime = false;
  if (timeZone) {
    try { new Intl.DateTimeFormat('en-US', { timeZone }).format(instant); zone = timeZone; locationTime = true; } catch { /* Retain source offset. */ }
  }
  const local = new Date(instant + (locationTime ? 0 : minutes * 60_000));
  const format = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { timeZone: zone, ...options }).format(local);
  const dateParts = new Intl.DateTimeFormat('en-US', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(local);
  const part = (type: string) => dateParts.find(item => item.type === type)!.value;
  return {
    locationTime,
    dateKey: `${part('year')}-${part('month')}-${part('day')}`,
    dateLabel: format({ weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
    shortDate: format({ month: 'short', day: 'numeric' }),
    timeLabel: format({ hour: 'numeric', minute: '2-digit' }),
    hourLabel: format({ hour: 'numeric' }),
    zoneLabel: locationTime ? new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'short' }).formatToParts(local).find(item => item.type === 'timeZoneName')!.value
      : minutes === 0 ? 'UTC' : `UTC${minutes < 0 ? '−' : '+'}${offset![2]}:${offset![3]}`,
  };
}

export function embedForecast(weather: WeatherSnapshot | null | undefined, generatedAt?: string) {
  const generated = Date.parse(generatedAt ?? '');
  const finite = (value: number | null | undefined) => typeof value === 'number' && Number.isFinite(value);
  const hours = (weather?.todayHourly ?? []).filter(point => {
    const time = Date.parse(point.time);
    return Number.isFinite(time) && /(?:Z|[+-]\d{2}:\d{2})$/.test(point.time)
      && (!Number.isFinite(generated) || time >= generated - 3_600_000);
  }).sort((a, b) => Date.parse(a.time) - Date.parse(b.time))
    .filter((point, index, all) => index === 0 || Date.parse(point.time) !== Date.parse(all[index - 1].time)).slice(0, 12);
  const first = hours[0] ? embedDateTime(hours[0].time, hours[0].time, weather?.timeZone)! : null;
  const last = hours.length ? embedDateTime(hours[hours.length - 1].time, hours[hours.length - 1].time, weather?.timeZone)! : null;
  return {
    dates: !first || !last ? '' : first.dateKey === last.dateKey ? first.shortDate : `${first.shortDate} – ${last.shortDate}`,
    zone: first ? `${first.locationTime ? 'River time · ' : 'Source time · '}${first.zoneLabel}` : '',
    reference: hours[0]?.time ?? weather?.observedAt ?? generatedAt,
    timeZone: weather?.timeZone,
    hours: hours.map((point, index) => {
      const date = embedDateTime(point.time, point.time, weather?.timeZone)!;
      const previousDate = index ? embedDateTime(hours[index - 1].time, hours[index - 1].time, weather?.timeZone) : null;
      const kind = point.conditionLabel != null || point.weatherCode != null ? hourlyWeatherConditionKind(point) : 'unknown';
      return {
        time: point.time,
        label: !previousDate || date.dateKey === previousDate.dateKey ? date.hourLabel : `${date.shortDate} · ${date.hourLabel}`,
        fullLabel: `${date.dateLabel}, ${date.timeLabel} ${date.zoneLabel}`,
        temperature: finite(point.temperatureF) ? `${Math.round(point.temperatureF!)}°` : '—',
        rain: finite(point.precipProbability) ? `${Math.round(point.precipProbability!)}%` : '—',
        wind: finite(point.windMph) ? `${Math.round(point.windMph!)}` : '—',
        condition: point.conditionLabel ?? 'Conditions unavailable',
        kind: kind === 'clear' && point.isDaytime === false ? 'night' : kind,
      };
    }),
  };
}

/** Retained measurements can remain visible; stale inputs never produce a current score. */
export function embedConditions(result: EmbedConditionsInput | null, snapshotStatus?: string,
  { now = Date.now(), failed = false, planning = false } = {}) {
  const fresh = (value: string | null | undefined) => {
    const timestamp = Date.parse(value ?? '');
    return Number.isFinite(timestamp) && now - timestamp <= SNAPSHOT_MAX_AGE_MS && timestamp <= now + SNAPSHOT_MAX_CLOCK_SKEW_MS;
  };
  const isPlanning = planning || result?.river.scoreEligibility === 'planning';
  const reading = !isPlanning && result ? embedReading(result, snapshotStatus, now) : null;
  const weatherSource = result?.weather;
  const weatherAvailable = !!weatherSource && result?.liveData.weather?.state !== 'unavailable';
  const weatherStale = failed || snapshotStatus === 'stale' || !fresh(result?.generatedAt)
    || !fresh(weatherSource?.observedAt) || result?.liveData.weather?.state !== 'live';
  const weather = buildRiverWeatherViewModel(weatherAvailable ? weatherSource : null);
  const forecast = embedForecast(weatherAvailable ? weatherSource : null, result?.generatedAt);
  const finite = (value: number | null | undefined) => typeof value === 'number' && Number.isFinite(value);
  const validScore = !!result && finite(result.score) && result.score >= 0 && result.score <= 100
    && ['Strong', 'Good', 'Fair', 'No-go'].includes(result.rating);
  const scoreAvailable = validScore && !isPlanning && !failed && !!reading && !reading.stale
    && snapshotStatus !== 'stale' && fresh(result?.generatedAt) && !isCurrentCallUnavailable(result)
    && (!weatherAvailable || !weatherStale);
  const state = scoreAvailable ? callStateForDecision(result!.rating, result!.readiness?.status) : 'unavailable';
  return {
    forecast,
    date: embedDateTime(result?.generatedAt, forecast.reference, forecast.timeZone),
    reading,
    band: !isPlanning && reading ? gaugeBandVisualModel(result) : null,
    score: {
      value: scoreAvailable ? Math.round(result!.score) : null,
      label: isPlanning ? 'Planning route' : scoreAvailable ? callLabelForDecision(result!.rating, result!.readiness?.status) : 'Score unavailable',
      tone: state,
      detail: isPlanning ? 'This trip does not receive a daily score.' : scoreAvailable
        ? `${result!.confidence?.label ?? 'Unknown'} data confidence` : 'Waiting for current conditions.',
    },
    weather: {
      available: weatherAvailable, stale: weatherStale,
      temperature: weather.temperatureF === null ? '—' : `${weather.temperatureF}°F`,
      wind: weather.windMph === null ? '—' : `${weather.windMph} mph`,
      windLabel: finite(weatherSource?.next12hWindMphMax) ? 'Wind · next 12h' : 'Wind',
      rain: weather.rainChancePercent === null ? '—' : `${weather.rainChancePercent}%`,
      condition: weatherAvailable ? weather.conditionLabel : 'Weather unavailable',
      risk: weatherAvailable && weather.state !== 'calm' ? weather.label : '',
      kind: weatherAvailable ? hourlyWeatherConditionKind(weatherSource?.conditionLabel ?? weatherSource?.weatherCode) : 'unknown',
      observedAt: weatherAvailable ? weatherSource?.observedAt : null,
      status: !weatherAvailable ? 'Unavailable' : weatherStale ? 'Older weather' : 'Latest weather',
    },
  };
}

/** Accept route URLs without treating arbitrary sites as a supported route. */
export function embedRouteSearch(query: string) {
  const normalized = query.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  try {
    const url = new URL(normalized);
    const match = url.pathname.match(/^\/rivers\/([^/]+)\/?$/);
    if (['paddletoday.com', 'www.paddletoday.com'].includes(url.hostname) && match) return { slug: match[1], tokens: [] };
  } catch { /* Ordinary river or access-point search. */ }
  return { slug: null, tokens: normalized.split(/\s+/).filter(Boolean) };
}

export function embedReading(result: EmbedReadingInput, snapshotStatus?: string, now = Date.now()) {
  const gauge = result.gauge;
  const observed = Date.parse(gauge?.observedAt ?? '');
  const generated = Date.parse(result.generatedAt);
  if (!gauge || !Number.isFinite(gauge.current) || !['ft', 'cfs'].includes(gauge.unit)
    || !Number.isFinite(observed) || observed > now + SNAPSHOT_MAX_CLOCK_SKEW_MS
    || result.liveData.gauge.state === 'unavailable') return null;

  const stale = result.liveData.gauge.state !== 'live' || snapshotStatus === 'stale'
    || now - observed > SNAPSHOT_MAX_AGE_MS || !Number.isFinite(generated)
    || now - generated > SNAPSHOT_MAX_AGE_MS || generated > now + SNAPSHOT_MAX_CLOCK_SKEW_MS;
  const value = gauge.unit === 'ft'
    ? gauge.current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : Math.round(gauge.current).toLocaleString('en-US');
  const trend = ['rising', 'falling', 'steady'].includes(gauge.trend) ? gauge.trend : 'unknown';
  const trendLabel = { rising: 'Rising', falling: 'Falling', steady: 'Steady', unknown: 'Trend unavailable' }[trend]!;
  const delta = gauge.delta24h;
  const change24h = typeof delta === 'number' && Number.isFinite(delta)
    ? `${delta > 0 ? '+' : ''}${delta.toLocaleString('en-US', { minimumFractionDigits: gauge.unit === 'ft' ? 2 : 0, maximumFractionDigits: gauge.unit === 'ft' ? 2 : 0 })} ${gauge.unit} in 24h`
    : null;
  return { value, unit: gauge.unit, observedAt: gauge.observedAt, stale, trend,
    change24h,
    trendLabel, metric: gauge.unit === 'ft' ? 'Water level' : 'River flow',
    ageMinutes: Math.max(0, Math.floor((now - observed) / 60_000)),
    chart: gaugeSparkline(gauge.recentSamples ?? [], observed) };
}

/** Plot actual observation times, bounded to the last 24 hours of this reading. */
export function gaugeSparkline(samples: Array<{ observedAt: string; value: number }>, observed: number) {
  const points = samples.map(sample => ({ time: Date.parse(sample.observedAt), value: sample.value }))
    .filter(point => Number.isFinite(point.time) && Number.isFinite(point.value)
      && point.time <= observed && point.time >= observed - 86_400_000)
    .sort((a, b) => a.time - b.time)
    .filter((point, index, all) => index === 0 || point.time !== all[index - 1].time);
  if (points.length < 2) return null;
  const first = points[0].time;
  const last = points[points.length - 1].time;
  const min = Math.min(...points.map(point => point.value));
  const max = Math.max(...points.map(point => point.value));
  const path = points.map((point, index) => {
    const x = 2 + ((point.time - first) / (last - first)) * 316;
    const y = max === min ? 30 : 52 - ((point.value - min) / (max - min)) * 42;
    return `${index ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return { path, area: `${path} L318,62 L2,62 Z`, min, max,
    hours: (last - first) / 3_600_000, start: new Date(first).toISOString(), end: new Date(last).toISOString() };
}
