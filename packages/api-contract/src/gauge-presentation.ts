import type { GaugeUnit, LiveDataState, RiverDetailApiResult, RiverSummaryApiItem } from './index';

export function formatGaugeValue(value: number | null | undefined, unit: GaugeUnit, empty = 'No reading') {
  if (typeof value !== 'number' || !Number.isFinite(value) || (unit !== 'ft' && unit !== 'cfs')) return empty;
  const text = unit === 'ft' ? value.toFixed(2).replace(/\.00$/, '') : Math.round(value).toLocaleString('en-US');
  return `${text} ${unit}`;
}

export function gaugeMetricLabel(result: Pick<RiverDetailApiResult, 'river' | 'gauge'>) {
  const source = result.river.gaugeSource;
  const unit = result.gauge?.unit ?? source.unit;
  if (unit === source.unit && source.display?.primaryMetricLabel) return source.display.primaryMetricLabel;
  return unit === 'ft' ? 'Gauge height' : 'Discharge';
}

export function gaugeObservationIsDelayed(observedAt: string | undefined, staleAfterMinutes: number, now: number) {
  return Math.round((now - Date.parse(observedAt ?? '')) / 60000) > staleAfterMinutes;
}

const observationTime = new Intl.DateTimeFormat('en-US', {
  month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
});

type GaugeRoute = Pick<RiverSummaryApiItem, 'gauge' | 'summary' | 'liveData'>
  | Pick<RiverDetailApiResult, 'gauge' | 'liveData'>;

export function routeGaugePresentation(route: GaugeRoute, now = Date.now()) {
  const { gauge } = route;
  const summary = 'summary' in route ? route : null;
  const detail = route.liveData && 'gauge' in route.liveData ? route.liveData.gauge : null;
  const legacyValue = gauge === undefined && summary ? summary.summary?.gaugeNow : null;
  const value = gauge ? formatGaugeValue(gauge.current, gauge.unit)
    : legacyValue && /^-?[\d,.]+ (ft|cfs)$/.test(legacyValue) ? legacyValue : 'No reading';
  const observed = Date.parse(gauge?.observedAt ?? '');
  const observedLabel = value !== 'No reading' && Number.isFinite(observed) ? observationTime.format(observed) : null;
  const sourceState = detail?.state ?? summary?.liveData?.gaugeState;
  const staleAfterMinutes = detail?.staleAfterMinutes ?? summary?.liveData?.gaugeStaleAfterMinutes ?? 360;
  let state: LiveDataState = sourceState ?? 'unavailable';
  if (value === 'No reading') state = 'unavailable';
  else if (state === 'live' && gaugeObservationIsDelayed(gauge?.observedAt, staleAfterMinutes, now)) state = 'stale';
  const qualifier = state === 'stale' ? 'Delayed' : state === 'unavailable' ? 'Unavailable' : observedLabel ? 'Current' : '';
  const time = observedLabel ? `observed ${observedLabel}` : 'observation time unavailable';
  const context = value === 'No reading' ? '' : [qualifier, time].filter(Boolean).join(' · ');
  return { value, state, observedLabel, context, label: [value, context].filter(Boolean).join(' · ') };
}
