import type { River } from '../lib/types';

// These stations were explicitly checked during the northern Minnesota gauge audit.
// They are direct in the historical route data, but they do not currently satisfy
// the product requirement for usable river telemetry.
export const unavailableGaugeKeys = new Set([
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

/**
 * Resolve the route's effective scoring policy after data enrichment.
 * Explicit planning routes stay planning even when their gauge source is
 * technically direct; inferred planning applies to routes without a usable
 * direct gauge.
 */
export function isScoreEligible(route: River): boolean {
  return route.scoreEligibility !== 'planning' && hasQualifyingGauge(route);
}

export function isPublicRoute(route: River): boolean {
  return isScoreEligible(route) || isPublicPlanningRoute(route);
}

export function isPublicPlanningRoute(route: River): boolean {
  const isExplicitPlanning = route.scoreEligibility === 'planning';
  const isProxyRoute = route.gaugeSource.kind === 'proxy';
  if ((!isExplicitPlanning && !isProxyRoute) || route.safetyProfile?.reviewStatus !== 'reviewed') {
    return false;
  }

  // Proxy whitewater routes need an explicit planning decision after the
  // route has been reviewed; inferred proxy eligibility must not publish an
  // expert-only route accidentally. Explicitly authored planning routes are
  // intentionally discoverable even when their conditions are not scoreable.
  if (route.routeType === 'whitewater' && isProxyRoute && !isExplicitPlanning) return false;

  return true;
}
