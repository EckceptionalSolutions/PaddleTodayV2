import { gaugeBandDisplayLabel } from '@paddletoday/api-contract';
import type { RiverDetailApiResult } from '@paddletoday/api-contract';

type GaugeBandInput = Pick<RiverDetailApiResult, 'gauge' | 'river' | 'gaugeBand' | 'gaugeBandLabel'>;
const finite = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

/** Shared by the full route page and partner cards. Plotting edges are not paddling thresholds. */
export function gaugeBandVisualModel(result: GaugeBandInput | null | undefined) {
  const gauge = result?.gauge;
  const profile = result?.river?.profile;
  const unit = gauge?.unit;
  if (!gauge || !finite(gauge.current) || !profile || !unit
    || (result?.river.gaugeSource?.unit && unit !== result.river.gaugeSource.unit)
    || ['unknown', 'unavailable'].includes(result.gaugeBand)) return null;
  const format = (value: number) => `${value.toLocaleString('en-US', { maximumFractionDigits: unit === 'ft' ? 2 : 0 })} ${unit}`;
  const createScale = (rawMin: number, rawMax: number) => {
    const span = Math.max(rawMax - rawMin, unit === 'ft' ? .5 : 25);
    const domainMin = rawMin - span * .06;
    const domainMax = rawMax + span * .06;
    return (value: number) => Math.min(100, Math.max(0, ((value - domainMin) / (domainMax - domainMin)) * 100));
  };
  const markerTone = ['too-low', 'too-high'].includes(result.gaugeBand) ? 'skip'
    : ['low-shoulder', 'high-shoulder', 'minimum-met'].includes(result.gaugeBand) ? 'watch' : 'good';
  const statusLabel = gaugeBandDisplayLabel(result.gaugeBand, result.gaugeBandLabel || 'Water-level range');

  if (profile.thresholdModel === 'two-sided' && finite(profile.idealMin) && finite(profile.idealMax) && profile.idealMax > profile.idealMin) {
    const idealSpan = Math.max(profile.idealMax - profile.idealMin, unit === 'ft' ? .5 : 25);
    const lowEdge = finite(profile.tooLow) && profile.tooLow < profile.idealMin ? profile.tooLow : profile.idealMin - idealSpan * .75;
    const highEdge = finite(profile.tooHigh) && profile.tooHigh > profile.idealMax ? profile.tooHigh : profile.idealMax + idealSpan * .75;
    const percent = createScale(Math.min(lowEdge, profile.idealMin, gauge.current), Math.max(highEdge, profile.idealMax, gauge.current));
    const start = percent(profile.idealMin);
    return {
      kind: 'two-sided', currentPercent: percent(gauge.current), usableStart: start,
      usableWidth: percent(profile.idealMax) - start,
      currentLabel: format(gauge.current), statusLabel, markerTone,
      lowLabel: 'Below preferred', targetLabel: `${format(profile.idealMin)}–${format(profile.idealMax)}`, highLabel: 'Above preferred',
      ariaLabel: `Gauge ${format(gauge.current)}. ${statusLabel}. Preferred range ${format(profile.idealMin)} to ${format(profile.idealMax)}.`,
    };
  }
  const floor = profile.tooLow ?? profile.idealMin;
  if (profile.thresholdModel === 'minimum-only' && finite(floor) && (unit !== 'cfs' || floor > 0)) {
    const span = Math.max(Math.abs(gauge.current - floor), Math.abs(floor) * .5, unit === 'ft' ? 1 : 100);
    const percent = createScale(Math.min(gauge.current, floor - span * .55), Math.max(gauge.current, floor + span * 1.45));
    const start = percent(floor);
    return {
      kind: 'minimum-only', currentPercent: percent(gauge.current), usableStart: start, usableWidth: 100 - start,
      currentLabel: format(gauge.current), statusLabel, markerTone,
      lowLabel: 'Below minimum', targetLabel: `Minimum ${format(floor)}`, highLabel: 'Upper limit unknown',
      ariaLabel: `Gauge ${format(gauge.current)}. ${statusLabel}. Minimum ${format(floor)}. No upper paddling limit established.`,
    };
  }
  return null;
}
