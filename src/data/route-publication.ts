import type { River } from '../lib/types';

const publishedRapidClassValues: Record<string, number> = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
};

/**
 * Read the highest American Whitewater-style rapid class explicitly published
 * in a route's summary. A reach containing a single Class IV/V feature is
 * treated as high consequence even when most of the mileage is easier.
 */
export function maxPublishedRapidClass(
  route: Pick<River, 'summary'> & Partial<Pick<River, 'statusText' | 'profile'>>,
): number | null {
  const readClass = (text: string) => {
    const classFragments = [...text.matchAll(/\bClass\s+([^.;\n]+)/gi)].map(
      (match) => match[1],
    );
    const values = classFragments.flatMap((fragment) =>
      [...fragment.matchAll(/\b(VI|IV|V|III|II|I)\b/gi)].map(
        (match) => publishedRapidClassValues[match[1].toUpperCase()],
      ),
    );
    return values.length > 0 ? Math.max(...values) : null;
  };

  // The route summary is the primary class declaration. Only fall back to
  // status/notes when the summary has no class, avoiding false promotion from
  // a warning that mentions a separate downstream Class IV section.
  const summaryClass = readClass(typeof route.summary === 'string' ? route.summary : '');
  if (summaryClass !== null) return summaryClass;
  return readClass(
    [route.statusText ?? '', route.profile?.difficultyNotes ?? ''].join(' '),
  );
}

/**
 * Apply the catalog-wide rapid-class publication gate. High-consequence
 * reaches remain discoverable as planning routes when reviewed, but cannot
 * enter the same-day scoring surface without a separate expert-publication
 * policy (which the catalog does not currently implement).
 */
export function enforceHighConsequencePlanning(route: River): River {
  if ((maxPublishedRapidClass(route) ?? 0) >= 4 && route.scoreEligibility === 'scored') {
    route.scoreEligibility = 'planning';
  }
  return route;
}

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
  return (
    route.scoreEligibility !== 'planning' &&
    (maxPublishedRapidClass(route) ?? 0) < 4 &&
    hasQualifyingGauge(route)
  );
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
