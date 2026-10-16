import type { GaugeContextObservation, RiverGaugeContext } from './index';

export interface GaugeContextRow { label: string; value: string; detail: string; observedAt: string | null; staleAfterHours?: number; }
const number = (value: number) => value.toLocaleString('en-US', { maximumFractionDigits: 2 });
const signed = (value: number) => `${value > 0 ? '+' : ''}${number(value)}`;
const flags = (observation: GaugeContextObservation) => [observation.approvalStatus,
  ...observation.qualifiers.map(flag => /^(ice|i)$/i.test(flag) ? 'Ice-affected' : /^e$/i.test(flag) ? 'Estimated' : flag),
].filter(Boolean).join(' · ');

export function gaugeContextRows(context: RiverGaugeContext): GaugeContextRow[] {
  const rows: GaugeContextRow[] = [];
  if (context.primary) {
    rows.push({ label: 'Gauge reading quality', value: flags(context.primary) || 'No qualifier reported',
      detail: `${context.primary.value === null ? 'No numeric reading for this observation. ' : ''}USGS observation status. Provisional readings can change after review.`, observedAt: context.primary.observedAt });
    for (const change of context.changes) rows.push({ label: `${change.hours}-hour gauge change`,
      value: `${signed(change.delta)} ${context.primary.unit}`, detail: `Measured from ${new Date(change.from).toLocaleString()} to ${new Date(change.to).toLocaleString()}; change at the gauge, not a downstream forecast.`, observedAt: change.to });
  }
  if (context.waterTemperature?.value !== null && context.waterTemperature) rows.push({
    label: 'Water temperature', value: `${number(context.waterTemperature.value)} °F`,
    detail: [context.waterTemperatureChange24h === null ? null : `${signed(context.waterTemperatureChange24h)} °F over approximately 24 hours`, flags(context.waterTemperature)].filter(Boolean).join(' · '),
    observedAt: context.waterTemperature.observedAt,
  });
  if (context.turbidity?.value !== null && context.turbidity) rows.push({ label: 'Turbidity',
    value: `${number(context.turbidity.value)} ${context.turbidity.unit}`,
    detail: `Cloudiness measurement; does not establish swimming safety. ${flags(context.turbidity)}`, observedAt: context.turbidity.observedAt });
  if (context.seasonalFlow) {
    const flow = context.seasonalFlow;
    const calendarDay = new Date(`2000-${flow.date.slice(5)}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
    rows.push({ label: 'Seasonal flow context', value: `${flow.category} for ${calendarDay}`,
      detail: `Daily mean ${number(flow.dailyMean.value!)} cfs on ${flow.date}; historical middle 50% ${number(flow.lowerQuartile)}–${number(flow.upperQuartile)} cfs, median ${number(flow.median)} cfs (${flow.sampleCount} daily values for this calendar day). ${flags(flow.dailyMean)}. Historical context is separate from the route’s paddling range.`,
      observedAt: flow.date, staleAfterHours: 72 });
  }
  if (context.unavailable.length) rows.push({ label: 'Coverage', value: 'Some details unavailable',
    detail: context.unavailable.join(' · '), observedAt: null });
  return rows;
}
