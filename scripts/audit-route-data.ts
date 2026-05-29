import { rivers } from '../src/data/rivers';
import { riverTripDetails } from '../src/data/river-trip-details';
import type { River, RiverAccessPoint } from '../src/lib/types';

type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

interface AuditIssue {
  routeId: string;
  category: string;
  message: string;
  evidence: string;
  severity: Severity;
}

const issues: AuditIssue[] = [];

const stateBounds: Record<string, { lat: [number, number]; lon: [number, number] }> = {
  Illinois: { lat: [36.8, 42.6], lon: [-91.6, -87.0] },
  Iowa: { lat: [40.3, 43.7], lon: [-96.8, -90.0] },
  Michigan: { lat: [41.6, 48.4], lon: [-90.5, -82.0] },
  Minnesota: { lat: [43.4, 49.4], lon: [-97.5, -89.0] },
  Missouri: { lat: [35.8, 40.8], lon: [-95.9, -89.0] },
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
const endpointPairs = new Map<string, River>();

for (const route of rivers) {
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

  if (!route.sourceLinks || route.sourceLinks.length === 0) {
    addIssue(route, 'Incomplete', 'Missing source links', route.id, 'High');
  }

  auditEndpoint(route, 'putIn', enriched.putIn);
  auditEndpoint(route, 'takeOut', enriched.takeOut);

  const distanceLabel = enriched.logistics?.distanceLabel;
  const routeMiles = parseMiles(distanceLabel);
  if (!enriched.logistics) {
    addIssue(route, 'Incomplete', 'Missing logistics', route.id, 'High');
  } else if (routeMiles === null) {
    addIssue(route, 'Distance', 'Distance label does not contain parseable mileage', distanceLabel ?? '', 'Medium');
  } else if (routeMiles <= 0 || routeMiles > 35) {
    addIssue(route, 'Distance', 'Route mileage is outside expected day-route bounds', distanceLabel ?? '', 'Medium');
  }

  if (enriched.putIn && enriched.takeOut) {
    const pairKey = `${coordinateKey(enriched.putIn)}>${coordinateKey(enriched.takeOut)}`;
    const reversePairKey = `${coordinateKey(enriched.takeOut)}>${coordinateKey(enriched.putIn)}`;
    const samePairRoute = endpointPairs.get(pairKey);
    const reversedPairRoute = endpointPairs.get(reversePairKey);

    if (samePairRoute) {
      addIssue(route, 'Duplicate', 'Duplicate endpoint pair', samePairRoute.id, 'High');
    }
    if (reversedPairRoute) {
      addIssue(route, 'Duplicate', 'Reversed endpoint pair', reversedPairRoute.id, 'High');
    }
    endpointPairs.set(pairKey, route);

    if (routeMiles !== null) {
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

if (issues.length > 0) {
  const grouped = issues.reduce<Record<Severity, number>>(
    (result, issue) => {
      result[issue.severity] += 1;
      return result;
    },
    { Critical: 0, High: 0, Medium: 0, Low: 0 },
  );

  console.error(`Route data audit failed with ${issues.length} issue(s).`);
  console.error(JSON.stringify({ bySeverity: grouped, issues }, null, 2));
  process.exit(1);
}

console.log(`Route data audit passed for ${rivers.length} routes.`);
