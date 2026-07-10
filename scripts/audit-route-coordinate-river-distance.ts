import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { rivers } from '../src/data/rivers';
import { riverTripDetails } from '../src/data/river-trip-details';
import type { River, RiverAccessPoint } from '../src/lib/types';

type Severity = 'ok' | 'review' | 'suspicious' | 'failure' | 'unknown';
type EndpointLabel = 'putIn' | 'takeOut';

interface ArcGisFeature {
  attributes: Record<string, string | number | null>;
  geometry?: {
    paths?: number[][][];
  };
}

interface ArcGisResponse {
  features?: ArcGisFeature[];
  error?: {
    message?: string;
  };
}

interface EndpointAudit {
  routeId: string;
  routeName: string;
  reach: string;
  state: string;
  endpoint: EndpointLabel;
  endpointName: string;
  latitude: number;
  longitude: number;
  matchedRiverName: string | null;
  distanceFeetToMatchedRiver: number | null;
  nearestMatchedLatitude: number | null;
  nearestMatchedLongitude: number | null;
  nearestWaterwayName: string | null;
  distanceFeetToNearestWaterway: number | null;
  nearestWaterwayLatitude: number | null;
  nearestWaterwayLongitude: number | null;
  severity: Severity;
  note: string;
}

const root = process.cwd();
const cacheDir = path.join(root, 'node_modules', '.cache', 'route-coordinate-river-audit');
const reportPath = path.join(root, 'docs', 'route-coordinate-river-audit.json');
const nhdFlowlineQueryUrl = 'https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/6/query';
const feetPerMile = 5280;
const earthRadiusMiles = 3958.8;

const args = new Set(process.argv.slice(2));
const shouldRefresh = args.has('--refresh');
const routeArg = process.argv.find((arg) => arg.startsWith('--route='));
const routeFilter = routeArg?.slice('--route='.length);
const concurrencyArg = process.argv.find((arg) => arg.startsWith('--concurrency='));
const concurrency = Math.max(1, Math.min(8, Number(concurrencyArg?.slice('--concurrency='.length) || 4)));

function usage() {
  console.log([
    'Usage: tsx scripts/audit-route-coordinate-river-distance.ts [--refresh] [--route=<route-id>] [--concurrency=<1-8>]',
    '',
    'Audits put-in and take-out coordinates against USGS NHD named flowlines.',
    `Writes ${path.relative(root, reportPath)}.`,
  ].join('\n'));
}

if (args.has('--help')) {
  usage();
  process.exit(0);
}

function escapeSqlLiteral(value: string) {
  return value.replace(/'/g, "''").toUpperCase();
}

function normalizeName(value: string | null | undefined) {
  return (value ?? '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(?:the)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function endpointCoordinates(point?: RiverAccessPoint) {
  if (!point || !Number.isFinite(point.latitude) || !Number.isFinite(point.longitude)) {
    return null;
  }
  return point;
}

function getEnrichedRoute(route: River): River {
  const tripDetails = riverTripDetails[route.id];
  return tripDetails ? { ...route, ...tripDetails } : route;
}

function routeBounds(points: RiverAccessPoint[], marginDegrees: number) {
  const lats = points.map((point) => point.latitude);
  const lons = points.map((point) => point.longitude);
  return {
    minLon: Math.min(...lons) - marginDegrees,
    minLat: Math.min(...lats) - marginDegrees,
    maxLon: Math.max(...lons) + marginDegrees,
    maxLat: Math.max(...lats) + marginDegrees,
  };
}

function bboxKey(bounds: ReturnType<typeof routeBounds>) {
  return [
    bounds.minLon.toFixed(4),
    bounds.minLat.toFixed(4),
    bounds.maxLon.toFixed(4),
    bounds.maxLat.toFixed(4),
  ].join(',');
}

function cacheKey(parts: string[]) {
  return parts
    .join('__')
    .replace(/[^a-z0-9_.=-]+/gi, '-')
    .slice(0, 180);
}

async function fetchJsonWithCache(key: string, url: string): Promise<ArcGisResponse> {
  await mkdir(cacheDir, { recursive: true });
  const file = path.join(cacheDir, `${key}.json`);

  if (!shouldRefresh) {
    try {
      return JSON.parse(await readFile(file, 'utf8')) as ArcGisResponse;
    } catch {
      // Cache miss.
    }
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`NHD request failed ${response.status} ${response.statusText}`);
  }

  const text = await response.text();
  await writeFile(file, text);
  return JSON.parse(text) as ArcGisResponse;
}

function buildNhdQuery(bounds: ReturnType<typeof routeBounds>, where: string) {
  const params = new URLSearchParams({
    f: 'json',
    where,
    geometry: `${bounds.minLon},${bounds.minLat},${bounds.maxLon},${bounds.maxLat}`,
    geometryType: 'esriGeometryEnvelope',
    inSR: '4326',
    spatialRel: 'esriSpatialRelIntersects',
    outSR: '4326',
    outFields: 'GNIS_NAME,FTYPE,FCODE',
    returnGeometry: 'true',
    geometryPrecision: '6',
    resultRecordCount: '2000',
  });
  return `${nhdFlowlineQueryUrl}?${params.toString()}`;
}

function degreesToRadians(value: number) {
  return (value * Math.PI) / 180;
}

function distanceMiles(left: { latitude: number; longitude: number }, right: { latitude: number; longitude: number }) {
  const deltaLat = degreesToRadians(right.latitude - left.latitude);
  const deltaLon = degreesToRadians(right.longitude - left.longitude);
  const leftLat = degreesToRadians(left.latitude);
  const rightLat = degreesToRadians(right.latitude);
  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(leftLat) * Math.cos(rightLat) * Math.sin(deltaLon / 2) ** 2;

  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(haversine));
}

function projectPointToSegment(
  point: RiverAccessPoint,
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number },
) {
  const latitudeScale = 69;
  const longitudeScale = Math.cos(degreesToRadians(point.latitude)) * 69.172;

  const px = point.longitude * longitudeScale;
  const py = point.latitude * latitudeScale;
  const sx = start.longitude * longitudeScale;
  const sy = start.latitude * latitudeScale;
  const ex = end.longitude * longitudeScale;
  const ey = end.latitude * latitudeScale;

  const dx = ex - sx;
  const dy = ey - sy;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) {
    return {
      distanceMiles: distanceMiles(point, start),
      latitude: start.latitude,
      longitude: start.longitude,
    };
  }

  const t = Math.max(0, Math.min(1, ((px - sx) * dx + (py - sy) * dy) / lengthSquared));
  const projected = {
    longitude: (sx + t * dx) / longitudeScale,
    latitude: (sy + t * dy) / latitudeScale,
  };
  return {
    distanceMiles: distanceMiles(point, projected),
    latitude: projected.latitude,
    longitude: projected.longitude,
  };
}

function featureNearestPoint(point: RiverAccessPoint, feature: ArcGisFeature) {
  const paths = feature.geometry?.paths ?? [];
  let best: { distanceFeet: number; latitude: number; longitude: number } | null = null;

  for (const pathPoints of paths) {
    for (let index = 1; index < pathPoints.length; index += 1) {
      const start = pathPoints[index - 1];
      const end = pathPoints[index];
      if (!start || !end || start.length < 2 || end.length < 2) continue;
      const projected = projectPointToSegment(
        point,
        { longitude: start[0], latitude: start[1] },
        { longitude: end[0], latitude: end[1] },
      );
      const distanceFeet = projected.distanceMiles * feetPerMile;
      if (!best || distanceFeet < best.distanceFeet) {
        best = {
          distanceFeet,
          latitude: projected.latitude,
          longitude: projected.longitude,
        };
      }
    }
  }

  return best;
}

function nearestFeature(point: RiverAccessPoint, features: ArcGisFeature[]) {
  let best: { feature: ArcGisFeature; distanceFeet: number; latitude: number; longitude: number } | null = null;

  for (const feature of features) {
    const nearestPoint = featureNearestPoint(point, feature);
    if (nearestPoint === null) continue;
    if (!best || nearestPoint.distanceFeet < best.distanceFeet) {
      best = { feature, ...nearestPoint };
    }
  }

  return best;
}

function featureName(feature: ArcGisFeature | null | undefined) {
  const value = feature?.attributes.GNIS_NAME ?? feature?.attributes.gnis_name;
  return typeof value === 'string' && value.length > 0 ? value : null;
}

function severityFor(distanceFeet: number | null, matchedRiverName: string | null, nearestWaterwayName: string | null) {
  if (distanceFeet === null || !matchedRiverName) return 'unknown';
  if (distanceFeet <= 100) return 'ok';
  if (distanceFeet <= 300) return 'review';
  if (distanceFeet <= 800) return 'suspicious';
  if (nearestWaterwayName && normalizeName(nearestWaterwayName) !== normalizeName(matchedRiverName)) return 'failure';
  return 'failure';
}

function noteFor(result: Pick<EndpointAudit, 'distanceFeetToMatchedRiver' | 'matchedRiverName' | 'nearestWaterwayName' | 'severity'>) {
  if (result.distanceFeetToMatchedRiver === null || !result.matchedRiverName) {
    return 'No matching named NHD flowline was returned inside the route bounding box.';
  }

  const distance = `${Math.round(result.distanceFeetToMatchedRiver)} ft`;
  if (result.severity === 'ok') return `Endpoint is within ${distance} of the matched NHD flowline.`;
  if (result.severity === 'review') return `Endpoint is ${distance} from the matched NHD flowline; likely an access/parking anchor but worth review.`;
  if (result.severity === 'suspicious') return `Endpoint is ${distance} from the matched NHD flowline; inspect source map and launch placement.`;
  if (result.nearestWaterwayName && normalizeName(result.nearestWaterwayName) !== normalizeName(result.matchedRiverName)) {
    return `Endpoint is ${distance} from ${result.matchedRiverName}; the nearest named waterway is ${result.nearestWaterwayName}.`;
  }
  return `Endpoint is ${distance} from the matched NHD flowline.`;
}

async function queryRouteFlowlines(route: River, points: RiverAccessPoint[]) {
  const margins = [0.04, 0.12, 0.3];
  const routeName = escapeSqlLiteral(route.name);

  for (const margin of margins) {
    const bounds = routeBounds(points, margin);
    const keyBase = cacheKey([route.id, bboxKey(bounds)]);
    const namedUrl = buildNhdQuery(bounds, `UPPER(GNIS_NAME) = '${routeName}'`);
    const named = await fetchJsonWithCache(`${keyBase}__named`, namedUrl);
    if (named.error?.message) throw new Error(named.error.message);

    if ((named.features ?? []).length > 0 || margin === margins.at(-1)) {
      const allUrl = buildNhdQuery(bounds, "GNIS_NAME IS NOT NULL AND GNIS_NAME <> ''");
      const all = await fetchJsonWithCache(`${keyBase}__all-named`, allUrl);
      if (all.error?.message) throw new Error(all.error.message);
      return {
        matchedFeatures: named.features ?? [],
        allNamedFeatures: all.features ?? [],
        margin,
      };
    }
  }

  return { matchedFeatures: [], allNamedFeatures: [], margin: margins.at(-1) ?? 0.3 };
}

async function auditRoute(route: River): Promise<EndpointAudit[]> {
  const enriched = getEnrichedRoute(route);
  const putIn = endpointCoordinates(enriched.putIn);
  const takeOut = endpointCoordinates(enriched.takeOut);
  const points = [putIn, takeOut].filter((point): point is RiverAccessPoint => point !== null);

  if (points.length === 0) return [];

  const { matchedFeatures, allNamedFeatures } = await queryRouteFlowlines(route, points);

  return ([
    ['putIn', putIn],
    ['takeOut', takeOut],
  ] as const)
    .filter((entry): entry is readonly [EndpointLabel, RiverAccessPoint] => entry[1] !== null)
    .map(([endpoint, point]) => {
      const matched = nearestFeature(point, matchedFeatures);
      const nearest = nearestFeature(point, allNamedFeatures);
      const matchedRiverName = featureName(matched?.feature);
      const nearestWaterwayName = featureName(nearest?.feature);
      const severity = severityFor(matched?.distanceFeet ?? null, matchedRiverName, nearestWaterwayName);
      const result: EndpointAudit = {
        routeId: route.id,
        routeName: route.name,
        reach: route.reach,
        state: route.state,
        endpoint,
        endpointName: point.name,
        latitude: point.latitude,
        longitude: point.longitude,
        matchedRiverName,
        distanceFeetToMatchedRiver: matched?.distanceFeet ?? null,
        nearestMatchedLatitude: matched?.latitude ?? null,
        nearestMatchedLongitude: matched?.longitude ?? null,
        nearestWaterwayName,
        distanceFeetToNearestWaterway: nearest?.distanceFeet ?? null,
        nearestWaterwayLatitude: nearest?.latitude ?? null,
        nearestWaterwayLongitude: nearest?.longitude ?? null,
        severity,
        note: '',
      };
      return { ...result, note: noteFor(result) };
    });
}

async function run() {
  const routesToAudit = routeFilter ? rivers.filter((route) => route.id === routeFilter) : rivers;
  if (routeFilter && routesToAudit.length === 0) {
    throw new Error(`No route found for --route=${routeFilter}`);
  }

  const endpointResults: EndpointAudit[] = [];
  let cursor = 0;

  await Promise.all(Array.from({ length: Math.min(concurrency, routesToAudit.length) }, async () => {
    while (cursor < routesToAudit.length) {
      const index = cursor;
      cursor += 1;
      const route = routesToAudit[index];
      console.error(`[${index + 1}/${routesToAudit.length}] ${route.id}`);
      endpointResults.push(...await auditRoute(route));
    }
  }));

  const bySeverity = endpointResults.reduce<Record<Severity, number>>(
    (counts, result) => {
      counts[result.severity] += 1;
      return counts;
    },
    { ok: 0, review: 0, suspicious: 0, failure: 0, unknown: 0 },
  );

  const report = {
    generatedAt: new Date().toISOString(),
    source: {
      name: 'USGS National Hydrography Dataset Flowline - Large Scale',
      url: 'https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/6',
    },
    thresholdsFeet: {
      ok: 100,
      review: 300,
      suspicious: 800,
    },
    routeCount: routesToAudit.length,
    endpointCount: endpointResults.length,
    bySeverity,
    endpoints: endpointResults.sort((left, right) => {
      const order: Record<Severity, number> = { failure: 0, unknown: 1, suspicious: 2, review: 3, ok: 4 };
      return order[left.severity] - order[right.severity] ||
        (right.distanceFeetToMatchedRiver ?? -1) - (left.distanceFeetToMatchedRiver ?? -1);
    }),
  };

  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`Audited ${report.endpointCount} endpoints across ${report.routeCount} route(s).`);
  console.log(`Severity counts: ${JSON.stringify(bySeverity)}`);
  console.log(`Wrote ${path.relative(root, reportPath)}`);

  const flagged = report.endpoints.filter((endpoint) => endpoint.severity !== 'ok');
  for (const endpoint of flagged.slice(0, 25)) {
    const distance = endpoint.distanceFeetToMatchedRiver === null
      ? 'no match'
      : `${Math.round(endpoint.distanceFeetToMatchedRiver)} ft`;
    console.log(`${endpoint.severity.toUpperCase()} ${endpoint.routeId} ${endpoint.endpoint} ${distance} - ${endpoint.note}`);
  }
}

run().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
