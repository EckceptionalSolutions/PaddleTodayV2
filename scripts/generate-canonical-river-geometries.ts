import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { listRivers } from '../src/lib/rivers';
import type { River } from '../src/lib/types';

type Point = [number, number];

interface NhdFeature {
  attributes?: {
    gnis_name?: string | null;
    GNIS_NAME?: string | null;
  };
  geometry?: { paths?: number[][][] };
}

interface NhdResponse {
  features?: NhdFeature[];
}

interface CanonicalFeature {
  type: 'Feature';
  properties: {
    routeId: string;
    riverId: string;
    name: string;
    state: string;
    source: 'USGS NHD Flowline';
  };
  geometry: {
    type: 'MultiLineString';
    coordinates: Point[][];
  };
}

const root = process.cwd();
const cacheDir = path.join(root, 'node_modules', '.cache', 'route-coordinate-river-audit');
const outputPath = path.join(root, 'public', 'data', 'canonical-river-geometries.json');
const stateOutputDir = path.join(root, 'public', 'data', 'canonical-river-geometries', 'states');

function stateSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function routeDataFingerprint(routes: River[]) {
  const input = routes
    .slice()
    .sort((left, right) => left.id.localeCompare(right.id))
    .map((route) => JSON.stringify({
      id: route.id,
      name: route.name,
      riverId: route.riverId,
      state: route.state,
      putIn: route.putIn ? [route.putIn.latitude, route.putIn.longitude] : null,
      takeOut: route.takeOut ? [route.takeOut.latitude, route.takeOut.longitude] : null,
    }))
    .join('\n');
  return createHash('sha256').update(input).digest('hex');
}

function normalizeName(value: string | null | undefined) {
  return (value ?? '')
    .toLowerCase()
    .replace(/\bdeview\b/g, 'de view')
    .replace(/&/g, ' and ')
    .replace(/\bsaint\b/g, 'st')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function namesMatch(routeName: string, nhdName: string | null | undefined) {
  const route = normalizeName(routeName);
  const nhd = normalizeName(nhdName);
  if (route.length === 0 || nhd.length === 0) return false;
  if (route === nhd) return true;

  // NHD often names a reach by its base river while the route catalog keeps
  // a branch/fork qualifier (for example, North Fork Crow vs. Crow River).
  // The route corridor is clipped tightly below, so this relaxed match does
  // not pull in a distant tributary with the same base name.
  const simplify = (value: string) => value.replace(/\b(?:river|creek|branch|of|the)\b/g, ' ').replace(/\s+/g, ' ').trim();
  const routeBase = simplify(route);
  const nhdBase = simplify(nhd);
  return routeBase === nhdBase || routeBase.includes(nhdBase) || nhdBase.includes(routeBase);
}

function routeBounds(route: River) {
  const points = [route.putIn, route.takeOut].filter(
    (point): point is NonNullable<River['putIn']> =>
      Number.isFinite(point?.latitude) && Number.isFinite(point?.longitude),
  );
  if (points.length < 2) return null;

  const minLon = Math.min(...points.map((point) => point.longitude));
  const maxLon = Math.max(...points.map((point) => point.longitude));
  const minLat = Math.min(...points.map((point) => point.latitude));
  const maxLat = Math.max(...points.map((point) => point.latitude));
  const margin = 0.025;
  return {
    minLon: minLon - margin,
    minLat: minLat - margin,
    maxLon: maxLon + margin,
    maxLat: maxLat + margin,
  };
}

function clipSegmentToBounds(start: Point, end: Point, bounds: ReturnType<typeof routeBounds>) {
  if (!bounds) return null;
  let t0 = 0;
  let t1 = 1;
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const constraints: Array<[number, number]> = [
    [-dx, start[0] - bounds.minLon],
    [dx, bounds.maxLon - start[0]],
    [-dy, start[1] - bounds.minLat],
    [dy, bounds.maxLat - start[1]],
  ];

  for (const [p, q] of constraints) {
    if (p === 0) {
      if (q < 0) return null;
      continue;
    }
    const ratio = q / p;
    if (p < 0) t0 = Math.max(t0, ratio);
    else t1 = Math.min(t1, ratio);
    if (t0 > t1) return null;
  }

  return [
    [start[0] + dx * t0, start[1] + dy * t0] as Point,
    [start[0] + dx * t1, start[1] + dy * t1] as Point,
  ];
}

function clipPath(pathPoints: number[][], bounds: ReturnType<typeof routeBounds>) {
  const clipped: Point[] = [];
  for (let index = 1; index < pathPoints.length; index += 1) {
    const start = pathPoints[index - 1];
    const end = pathPoints[index];
    if (!start || !end || start.length < 2 || end.length < 2) continue;
    const segment = clipSegmentToBounds([start[0], start[1]], [end[0], end[1]], bounds);
    if (!segment) continue;
    const [segmentStart, segmentEnd] = segment;
    const previous = clipped[clipped.length - 1];
    if (!previous || previous[0] !== segmentStart[0] || previous[1] !== segmentStart[1]) clipped.push(segmentStart);
    if (!previous || segmentEnd[0] !== previous[0] || segmentEnd[1] !== previous[1]) clipped.push(segmentEnd);
  }
  return clipped.length >= 2 ? clipped : null;
}

function dedupeLines(lines: Point[][]) {
  const seen = new Set<string>();
  return lines.filter((line) => {
    const key = line.map((point) => `${point[0].toFixed(6)},${point[1].toFixed(6)}`).join('|');
    const reverseKey = [...line]
      .reverse()
      .map((point) => `${point[0].toFixed(6)},${point[1].toFixed(6)}`)
      .join('|');
    if (seen.has(key) || seen.has(reverseKey)) return false;
    seen.add(key);
    return true;
  });
}

function queryBounds(route: River) {
  const bounds = routeBounds(route);
  if (!bounds) return null;
  return {
    minLon: bounds.minLon - 0.275,
    minLat: bounds.minLat - 0.275,
    maxLon: bounds.maxLon + 0.275,
    maxLat: bounds.maxLat + 0.275,
  };
}

async function loadNhdFeatures(route: River) {
  const files = (await readdir(cacheDir)).filter(
    (file) => file.startsWith(`${route.id}__`) && file.endsWith('__all-named.json'),
  );
  const file = files[0];
  if (file) {
    const response = JSON.parse(await readFile(path.join(cacheDir, file), 'utf8')) as NhdResponse;
    return response.features ?? [];
  }

  const bounds = queryBounds(route);
  if (!bounds) return [];
  const params = new URLSearchParams({
    f: 'json',
    where: 'GNIS_NAME IS NOT NULL',
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
  const response = await fetch(`https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/6/query?${params}`);
  if (!response.ok) return [];
  const text = await response.text();
  await mkdir(cacheDir, { recursive: true });
  await writeFile(path.join(cacheDir, `${route.id}__generated__all-named.json`), text, 'utf8');
  const parsed = JSON.parse(text) as NhdResponse;
  return parsed.features ?? [];
}

async function main() {
  const routes = listRivers();
  const sourceFingerprint = routeDataFingerprint(routes);
  const features: CanonicalFeature[] = [];
  let matchedRoutes = 0;
  let nextRouteIndex = 0;

  async function processNextRoute() {
    while (nextRouteIndex < routes.length) {
      const route = routes[nextRouteIndex];
      nextRouteIndex += 1;
    const bounds = routeBounds(route);
    if (!bounds || !route.riverId) continue;
    const nhdFeatures = await loadNhdFeatures(route);
    const lines = dedupeLines(
      nhdFeatures
        .filter((feature) => namesMatch(route.name, feature.attributes?.gnis_name ?? feature.attributes?.GNIS_NAME))
        .flatMap((feature) => (feature.geometry?.paths ?? []).map((pathPoints) => clipPath(pathPoints, bounds)))
        .filter((line): line is Point[] => Boolean(line)),
    );
    if (lines.length === 0) continue;
    matchedRoutes += 1;
    features.push({
      type: 'Feature',
      properties: {
        routeId: route.id,
        riverId: route.riverId,
        name: route.name,
        state: route.state,
        source: 'USGS NHD Flowline',
      },
      geometry: { type: 'MultiLineString', coordinates: lines },
    });
    }
  }

  await Promise.all(Array.from({ length: 6 }, () => processNextRoute()));
  features.sort((left, right) => left.properties.routeId.localeCompare(right.properties.routeId));
  const matchedRouteIds = new Set(features.map((feature) => feature.properties.routeId));
  const unmatchedRouteIds = routes.map((route) => route.id).filter((routeId) => !matchedRouteIds.has(routeId));
  const metadata = {
    routeCount: routes.length,
    matchedRouteCount: features.length,
    unmatchedRouteIds,
    routeDataFingerprint: sourceFingerprint,
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify({ type: 'FeatureCollection', source: 'USGS NHD Flowline', ...metadata, features }, null, 2)}\n`,
    'utf8',
  );
  await mkdir(stateOutputDir, { recursive: true });
  const stateGroups = new Map<string, CanonicalFeature[]>();
  for (const feature of features) {
    const key = stateSlug(feature.properties.state);
    const group = stateGroups.get(key) ?? [];
    group.push(feature);
    stateGroups.set(key, group);
  }
  await Promise.all(
    [...stateGroups.entries()].map(([slug, stateFeatures]) =>
      writeFile(
        path.join(stateOutputDir, `${slug}.json`),
        `${JSON.stringify({ type: 'FeatureCollection', source: 'USGS NHD Flowline', scope: 'state', state: stateFeatures[0]?.properties.state ?? '', ...metadata, features: stateFeatures }, null, 2)}\n`,
        'utf8',
      ),
    ),
  );
  console.log(`Wrote ${features.length} canonical route geometries (${matchedRoutes}/${routes.length} routes matched) to ${path.relative(root, outputPath)}`);
  console.log(`Wrote ${stateGroups.size} state-scoped geometry assets to ${path.relative(root, stateOutputDir)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
