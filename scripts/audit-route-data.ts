import { listAllRiversForAudit, listRivers, WITHHELD_ROUTE_SLUGS } from '../src/lib/rivers';
import { publicRivers } from '../src/data/rivers';
import { riverTripDetails } from '../src/data/river-trip-details';
import { minnesotaPaddleGuideEntries } from '../src/data/minnesota-paddle-guide';
import { isScoreEligible } from '../src/data/route-publication';
import type { River, RiverAccessPoint } from '../src/lib/types';
import { validateScoringProfile } from '../src/lib/scoring-profile-validation';
import {
  isPlanningCoordinateDeferred,
  isPlanningDistanceDeferred,
  isStagedDistanceLabel,
  type PlanningValidationDeferral,
} from '../src/lib/route-data-audit-policy';

type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

interface AuditIssue {
  routeId: string;
  category: string;
  message: string;
  evidence: string;
  severity: Severity;
}

const issues: AuditIssue[] = [];
const planningValidationDeferrals: PlanningValidationDeferral[] = [];
const auditedRoutes = listAllRiversForAudit();
const verbose = process.argv.includes('--verbose');

const stateBounds: Record<string, { lat: [number, number]; lon: [number, number] }> = {
  Illinois: { lat: [36.8, 42.6], lon: [-91.6, -87.0] },
  Iowa: { lat: [40.3, 43.7], lon: [-96.8, -90.0] },
  Michigan: { lat: [41.6, 48.4], lon: [-90.5, -82.0] },
  Minnesota: { lat: [43.4, 49.4], lon: [-97.5, -89.0] },
  Missouri: { lat: [35.8, 40.8], lon: [-95.9, -89.0] },
  Maryland: { lat: [37.8, 39.8], lon: [-79.6, -75.0] },
  'South Dakota': { lat: [42.2, 46.0], lon: [-104.2, -96.3] },
  Wisconsin: { lat: [42.3, 47.4], lon: [-93.0, -86.2] },
};

function addIssue(
  route: Pick<River, 'id'>,
  category: string,
  message: string,
  evidence: string,
  severity: Severity,
) {
  issues.push({
    routeId: route.id,
    category,
    message,
    evidence,
    severity,
  });
}

function distanceMiles(left: RiverAccessPoint, right: RiverAccessPoint) {
  const earthRadiusMiles = 3958.8;
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const deltaLat = toRadians(right.latitude - left.latitude);
  const deltaLon = toRadians(right.longitude - left.longitude);
  const leftLat = toRadians(left.latitude);
  const rightLat = toRadians(right.latitude);
  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(leftLat) * Math.cos(rightLat) * Math.sin(deltaLon / 2) ** 2;

  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(haversine));
}

function parseMiles(label: string | undefined) {
  if (!label) return null;

  const match = label.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;

  if (/\b(?:hr|hour|travel time|on-water time)\b/i.test(label) && !/\bmi|mile|river mi\b/i.test(label)) {
    return null;
  }

  const miles = Number(match[1]);
  return Number.isFinite(miles) ? miles : null;
}

function coordinateKey(point: RiverAccessPoint) {
  return `${point.latitude.toFixed(5)},${point.longitude.toFixed(5)}`;
}

function isSameLaunchItinerary(route: River, enriched: River) {
  if (!enriched.putIn || !enriched.takeOut) return false;

  const endpointDistance = distanceMiles(enriched.putIn, enriched.takeOut);
  if (endpointDistance > 0.05) return false;

  const routeText = [
    route.id,
    route.reach,
    route.summary,
    enriched.reach,
    enriched.summary,
    enriched.putIn.name,
    enriched.takeOut.name,
    enriched.logistics?.distanceLabel,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return /(loop|round[- ]trip|return|out[- ]and[- ]back|same[- ]launch|same[- ]ramp)/.test(routeText);
}

function auditEndpoint(route: River, label: 'putIn' | 'takeOut', point: RiverAccessPoint | undefined) {
  if (!point) {
    addIssue(route, 'Incomplete', `Missing ${label}`, 'Route has no enriched endpoint.', 'High');
    return;
  }

  if (!Number.isFinite(point.latitude) || !Number.isFinite(point.longitude)) {
    addIssue(route, 'Coordinate', `Invalid ${label} coordinate`, JSON.stringify(point), 'High');
    return;
  }

  if (Math.abs(point.latitude) > 90 || Math.abs(point.longitude) > 180) {
    addIssue(route, 'Coordinate', `${label} coordinate outside valid range`, `${point.latitude}, ${point.longitude}`, 'Critical');
  }

  if (point.latitude < 0 || point.longitude > 0) {
    addIssue(route, 'Coordinate', `${label} coordinate sign is suspicious for the US Midwest`, `${point.latitude}, ${point.longitude}`, 'High');
  }

  const bounds = stateBounds[route.state];
  if (
    bounds &&
    (point.latitude < bounds.lat[0] ||
      point.latitude > bounds.lat[1] ||
      point.longitude < bounds.lon[0] ||
      point.longitude > bounds.lon[1])
  ) {
    addIssue(
      route,
      'Coordinate',
      `${label} coordinate outside broad state bounds`,
      `${point.latitude}, ${point.longitude} for ${route.state}`,
      'High',
    );
  }
}

const ids = new Map<string, River>();
const slugs = new Map<string, River>();
const endpointPairs = new Map<string, { route: River; enriched: River }>();

for (const route of auditedRoutes) {
  const tripDetails = riverTripDetails[route.id];
  const enriched: River = tripDetails ? { ...route, ...tripDetails } : route;

  if (ids.has(route.id)) {
    addIssue(route, 'Duplicate', 'Duplicate route id', ids.get(route.id)?.id ?? route.id, 'Critical');
  }
  ids.set(route.id, route);

  if (slugs.has(route.slug)) {
    addIssue(route, 'Duplicate', 'Duplicate route slug', slugs.get(route.slug)?.id ?? route.slug, 'Critical');
  }
  slugs.set(route.slug, route);

  if (!tripDetails) {
    addIssue(route, 'Incomplete', 'Missing river-trip-details entry', route.id, 'High');
  }

  if (!['easy', 'moderate', 'hard'].includes(route.profile.difficulty)) {
    addIssue(route, 'Schema', 'Invalid difficulty value', route.profile.difficulty, 'High');
  }

  if (!route.profile.thresholdModel) {
    addIssue(route, 'Schema', 'Missing thresholdModel', route.id, 'High');
  }

  for (const profileIssue of validateScoringProfile(route.profile)) {
    if (profileIssue.severity === 'error') {
      addIssue(route, 'Scoring thresholds', profileIssue.message, profileIssue.code, 'High');
    }
  }

  if (!route.sourceLinks || route.sourceLinks.length === 0) {
    addIssue(route, 'Incomplete', 'Missing source links', route.id, 'High');
  }

  auditEndpoint(route, 'putIn', enriched.putIn);
  auditEndpoint(route, 'takeOut', enriched.takeOut);

  const distanceLabel = enriched.logistics?.distanceLabel;
  const routeMiles = parseMiles(distanceLabel);
  const isPlanningRoute = route.scoreEligibility === 'planning';
  if (!enriched.logistics) {
    addIssue(route, 'Incomplete', 'Missing logistics', route.id, 'High');
  } else if (isPlanningRoute && (routeMiles === null || isPlanningDistanceDeferred(distanceLabel))) {
    planningValidationDeferrals.push({
      routeId: route.id,
      category: 'Distance',
      reason: routeMiles === null
        ? 'Planning distance is intentionally source/map controlled and is deferred until a route-specific source publishes stable mileage.'
        : 'Planning distance is explicitly controlled by a map, chart, tide, condition, or staging detail and is deferred until scored-route review.',
      evidence: distanceLabel ?? '',
    });
  } else if (routeMiles === null) {
    addIssue(route, 'Distance', 'Distance label does not contain parseable mileage', distanceLabel ?? '', 'Medium');
  } else if (routeMiles <= 0 || (routeMiles > 35 && !isStagedDistanceLabel(distanceLabel))) {
    addIssue(route, 'Distance', 'Route mileage is outside expected day-route bounds', distanceLabel ?? '', 'Medium');
  }

  if (enriched.putIn && enriched.takeOut) {
    const pairKey = `${coordinateKey(enriched.putIn)}>${coordinateKey(enriched.takeOut)}`;
    const reversePairKey = `${coordinateKey(enriched.takeOut)}>${coordinateKey(enriched.putIn)}`;
    const samePairRoute = endpointPairs.get(pairKey);
    const reversedPairRoute = endpointPairs.get(reversePairKey);
    const sameLaunchPair = isSameLaunchItinerary(route, enriched) &&
      (samePairRoute ? isSameLaunchItinerary(samePairRoute.route, samePairRoute.enriched) : false);

    if (samePairRoute && !sameLaunchPair) {
      addIssue(route, 'Duplicate', 'Duplicate endpoint pair', samePairRoute.route.id, 'High');
    }
    if (reversedPairRoute && !sameLaunchPair) {
      addIssue(route, 'Duplicate', 'Reversed endpoint pair', reversedPairRoute.route.id, 'High');
    }
    endpointPairs.set(pairKey, { route, enriched });

    if (isPlanningRoute && routeMiles !== null && isPlanningCoordinateDeferred()) {
      const straightLineMiles = distanceMiles(enriched.putIn, enriched.takeOut);
      if (straightLineMiles > 0.05 && routeMiles < straightLineMiles * 0.92) {
        planningValidationDeferrals.push({
          routeId: route.id,
          category: 'Coordinate',
          reason: 'Planning mileage-to-anchor comparison is deferred because planning endpoints are source-backed access anchors and the route label may describe a map-controlled channel or itinerary.',
          evidence: `${routeMiles} mi label vs ${straightLineMiles.toFixed(1)} mi straight-line`,
        });
      }
    } else if (routeMiles !== null) {
      const straightLineMiles = distanceMiles(enriched.putIn, enriched.takeOut);
      if (straightLineMiles > 0.05 && routeMiles < straightLineMiles * 0.92) {
        addIssue(
          route,
          'Coordinate',
          'Route mileage is shorter than straight-line endpoint distance',
          `${routeMiles} mi label vs ${straightLineMiles.toFixed(1)} mi straight-line`,
          'High',
        );
      }
    }
  }
}

for (const entry of minnesotaPaddleGuideEntries) {
  if (entry.trackedSlug && !slugs.has(entry.trackedSlug)) {
    addIssue(
      { id: `guide:${entry.id}` },
      'Guide link',
      'Minnesota paddle guide entry points to a missing route slug',
      `${entry.id} -> ${entry.trackedSlug}`,
      'High',
    );
  }
}

const auditedById = new Map(auditedRoutes.map((route) => [route.id, route]));
const blockingIssues = issues.filter((issue) => auditedById.get(issue.routeId)?.scoreEligibility !== 'planning');
const populationSummary = {
  inventory: auditedRoutes.length,
  publicCatalog: publicRivers.length,
  publicIndexed: listRivers().length,
  scored: auditedRoutes.filter(isScoreEligible).length,
  planning: auditedRoutes.filter((route) => !isScoreEligible(route)).length,
  publicPlanning: publicRivers.filter((route) => !isScoreEligible(route)).length,
  withheld: publicRivers.filter((route) => WITHHELD_ROUTE_SLUGS.has(route.slug)).length,
};

if (blockingIssues.length > 0) {
  const grouped = issues.reduce<Record<Severity, number>>(
    (result, issue) => {
      result[issue.severity] += 1;
      return result;
    },
    { Critical: 0, High: 0, Medium: 0, Low: 0 },
  );

  console.error(`Route data audit failed with ${blockingIssues.length} blocking issue(s); ${issues.length - blockingIssues.length} planning-route issue(s) remain tracked.`);
  console.error(JSON.stringify({ populations: populationSummary, bySeverity: grouped, blockingIssues, planningIssues: issues.filter((issue) => !blockingIssues.includes(issue)) }, null, 2));
  process.exit(1);
}

const planningByCategory = issues
  .filter((issue) => !blockingIssues.includes(issue))
  .reduce<Record<string, number>>((counts, issue) => {
    counts[issue.category] = (counts[issue.category] ?? 0) + 1;
    return counts;
  }, {});
const planningDeferralsByCategory = planningValidationDeferrals.reduce<Record<string, number>>((counts, deferral) => {
  counts[deferral.category] = (counts[deferral.category] ?? 0) + 1;
  return counts;
}, {});
console.log(`Route data audit passed for ${auditedRoutes.length} routes (scored and planning populations); ${issues.length} planning-route issue(s) remain tracked and ${planningValidationDeferrals.length} planning validation check(s) are explicitly deferred.`);
console.log(JSON.stringify({ populations: populationSummary, planningIssuesByCategory: planningByCategory, planningValidationDeferredByCategory: planningDeferralsByCategory }));
if (verbose && (issues.length > 0 || planningValidationDeferrals.length > 0)) {
  console.log(JSON.stringify({ planningIssues: issues.filter((issue) => !blockingIssues.includes(issue)), planningValidationDeferrals }, null, 2));
}
