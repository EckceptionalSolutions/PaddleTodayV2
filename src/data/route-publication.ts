import type { River } from '../lib/types';

// These stations were explicitly checked during the northern Minnesota gauge audit.
// They are direct in the historical route data, but they do not currently satisfy
// the product requirement for usable river telemetry.
const unavailableGaugeKeys = new Set([
  'mn_dnr:179', // Red Lake River at Thief River Falls: stale in the current DNR feed.
  'mn_dnr:280', // Big Fork River near Bigfork: stale in the current DNR feed.
  'mn_dnr:341', // Stump Lake stage, not a river gauge for the configured Mississippi reaches.
  'usgs:04021960', // Cloquet River near Island Lake: no current USGS observations.
]);

export function hasQualifyingGauge(route: River): boolean {
  if (route.gaugeSource.kind !== 'direct') return false;
  if (!route.gaugeSource.siteId.trim()) return false;

  return !unavailableGaugeKeys.has(`${route.gaugeSource.provider}:${route.gaugeSource.siteId}`);
}
