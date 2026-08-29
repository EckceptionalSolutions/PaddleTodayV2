import { mkdir, readFile, readdir, rename, unlink, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { endpointSnappedRiverGeometry, endpointSnappedRiverNetwork, stitchRiverLines } from '@paddletoday/geo';
import { listAllRiversForAudit, listRivers } from '../src/lib/rivers';
import type { River } from '../src/lib/types';

type Point = [number, number];

interface NhdFeature {
  attributes?: {
    gnis_name?: string | null;
    GNIS_NAME?: string | null;
    ftype?: number | null;
    FTYPE?: number | null;
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
    source: string;
    traceMode?: 'network-traced' | 'named-fallback';
    endpointSnapMaxFeet?: number | null;
  };
  geometry: {
    type: 'MultiLineString';
    coordinates: Point[][];
  };
}

const root = process.cwd();
const reviewMode = process.argv.includes('--review-all');
const routeIdArgIndex = process.argv.indexOf('--route-id');
const requestedRouteId = routeIdArgIndex >= 0 ? process.argv[routeIdArgIndex + 1] : null;
const cacheDir = path.join(root, 'node_modules', '.cache', 'route-coordinate-river-audit');
const geometryOutputRoot = reviewMode
  ? path.join(root, 'node_modules', '.cache', 'route-coordinate-review-geometries')
  : path.join(root, 'public', 'data', 'canonical-river-geometries');
const outputPath = reviewMode
  ? path.join(geometryOutputRoot, 'manifest.json')
  : path.join(root, 'public', 'data', 'canonical-river-geometries.json');
const stateOutputDir = path.join(geometryOutputRoot, 'states');
const routeOutputDir = path.join(geometryOutputRoot, 'routes');

// Some official water trails cross lake chains where the shortest connected
// NHD path is not the published paddling route. These authoritative access
// points keep the network trace on the documented corridor.
const officialNetworkWaypoints: Record<string, Array<{ latitude: number; longitude: number }>> = {
  'rice-creek-peltier-to-long-lake': [
    { latitude: 45.1637486, longitude: -93.1154357 }, // Aqua Lane, after the northern lake chain.
  ],
  'crystal-river-marble-redstone': [
    { latitude: 39.0997096, longitude: -107.261717 }, // Bogan Flats Campground / mid-reach anchor.
  ],
};

async function loadCuratedRouteGeometries(routes: River[], includeGenerated = false) {
  if (reviewMode) return [];

  const currentRouteIds = new Set(routes.map((route) => route.id));
  const features: CanonicalFeature[] = [];
  let fileNames: string[] = [];
  try {
    fileNames = await readdir(routeOutputDir);
  } catch {
    return features;
  }

  for (const fileName of fileNames.filter((name) => name.endsWith('.json'))) {
    try {
      const feature = JSON.parse(
        await readFile(path.join(routeOutputDir, fileName), 'utf8'),
      ) as CanonicalFeature;
      const routeId = feature.properties?.routeId;
      if (
        feature.type === 'Feature'
        && currentRouteIds.has(routeId)
        && (includeGenerated || feature.properties.source !== 'USGS NHD Flowline')
        && feature.geometry?.type === 'MultiLineString'
        && feature.geometry.coordinates.length > 0
      ) {
        features.push(feature);
      }
    } catch {
      // Invalid generated artifacts are discarded by the normal rewrite below.
    }
  }
  return features;
}

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

function featureType(feature: NhdFeature) {
  return Number(feature.attributes?.ftype ?? feature.attributes?.FTYPE);
}

async function fetchNhdFeatures(route: River, bounds: NonNullable<ReturnType<typeof routeBounds>>, where: string, cacheSuffix: string) {
  const bbox = `${bounds.minLon.toFixed(4)}-${bounds.minLat.toFixed(4)}-${bounds.maxLon.toFixed(4)}-${bounds.maxLat.toFixed(4)}`;
  const cachePath = path.join(cacheDir, `${route.id}__${bbox}__${cacheSuffix}.json`);
  try {
    const response = JSON.parse(await readFile(cachePath, 'utf8')) as NhdResponse;
    return response.features ?? [];
  } catch {
    // Cache miss.
  }

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
  const response = await fetch(`https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/6/query?${params}`);
  if (!response.ok) return [];
  const text = await response.text();
  await mkdir(cacheDir, { recursive: true });
  await writeFile(cachePath, text, 'utf8');
  const parsed = JSON.parse(text) as NhdResponse;
  return parsed.features ?? [];
}

async function loadNhdFeatures(route: River) {
  let files: string[] = [];
  try {
    files = (await readdir(cacheDir)).filter(
      (file) => file.startsWith(`${route.id}__`) && file.endsWith('__all-named.json'),
    );
  } catch {
    // The cache is disposable and may not exist on a clean checkout.
  }
  const file = files[0];
  let namedFeatures: NhdFeature[] = [];
  if (file) {
    const response = JSON.parse(await readFile(path.join(cacheDir, file), 'utf8')) as NhdResponse;
    namedFeatures = response.features ?? [];
  }

  const broadBounds = queryBounds(route);
  if (!broadBounds) return namedFeatures;
  if (namedFeatures.length === 0) {
    namedFeatures = await fetchNhdFeatures(route, broadBounds, 'GNIS_NAME IS NOT NULL', 'generated-all-named');
  }
  return namedFeatures;
}

async function loadNhdNetworkFeatures(route: River) {
  const corridorBounds = routeBounds(route);
  if (!corridorBounds) return [];
  // Fetch the connected hydrography network in the tight route corridor.
  // StreamRiver is preferred by edge cost; ArtificialPath is retained because
  // NHD uses it to carry flow through wide river/waterbody polygons.
  return fetchNhdFeatures(
    route,
    corridorBounds,
    'FTYPE IN (334,336,460,558)',
    'route-network-v1',
  );
}

function pointDistanceMiles(left: Point, right: Point) {
  const latitudeScale = Math.cos(((left[1] + right[1]) * Math.PI) / 360);
  return Math.hypot((left[0] - right[0]) * latitudeScale, left[1] - right[1]) * 69;
}

function networkCostMultiplier(type: number) {
  if (type === 460) return 1;
  if (type === 334) return 1.05;
  if (type === 558) return 1.35;
  if (type === 336) return 4;
  return 10;
}

function traceEndpointErrors(coordinates: Point[], route: River) {
  if (!route.putIn || !route.takeOut || coordinates.length < 2) {
    return { startFeet: Infinity, endFeet: Infinity };
  }
  const first = coordinates[0];
  const last = coordinates.at(-1)!;
  const putIn: Point = [route.putIn.longitude, route.putIn.latitude];
  const takeOut: Point = [route.takeOut.longitude, route.takeOut.latitude];
  const direct = {
    startFeet: pointDistanceMiles(first, putIn) * 5280,
    endFeet: pointDistanceMiles(last, takeOut) * 5280,
  };
  const reversed = {
    startFeet: pointDistanceMiles(last, putIn) * 5280,
    endFeet: pointDistanceMiles(first, takeOut) * 5280,
  };
  return direct.startFeet + direct.endFeet <= reversed.startFeet + reversed.endFeet ? direct : reversed;
}

async function main() {
  const allRoutes = reviewMode ? listAllRiversForAudit() : listRivers();
  const routes = allRoutes
    .filter((route) => !requestedRouteId || route.id === requestedRouteId);
  const outputRoutes = requestedRouteId && !reviewMode ? allRoutes : routes;
  const sourceFingerprint = routeDataFingerprint(outputRoutes);
  const features: CanonicalFeature[] = [];
  const existingFeatures = await loadCuratedRouteGeometries(
    outputRoutes,
    Boolean(requestedRouteId && !reviewMode),
  );
  const curatedFeatures = requestedRouteId && !reviewMode
    ? existingFeatures.filter((feature) => feature.properties.routeId !== requestedRouteId)
    : existingFeatures;
  let matchedRoutes = 0;
  let nextRouteIndex = 0;

  async function processNextRoute() {
    while (nextRouteIndex < routes.length) {
      const route = routes[nextRouteIndex];
      nextRouteIndex += 1;
    const bounds = routeBounds(route);
    if (!bounds || !route.riverId) continue;
    const namedFeatures = await loadNhdFeatures(route);
    const namedLines = dedupeLines(
      namedFeatures
        .filter((feature) => namesMatch(route.name, feature.attributes?.gnis_name ?? feature.attributes?.GNIS_NAME))
        // USGS defines FType 558 as ArtificialPath and FType 460 as the actual
        // StreamRiver. Prefer a connected natural route when it reaches both
        // endpoints; named artificial paths remain available only in this
        // fallback for wide areal rivers and lakes without a visible channel.
        .flatMap((feature) => (feature.geometry?.paths ?? []).map((pathPoints) => clipPath(pathPoints, bounds)))
        .filter((line): line is Point[] => Boolean(line)),
    );
    const namedTrace = route.putIn && route.takeOut
      ? endpointSnappedRiverGeometry(
        stitchRiverLines(
          namedLines,
          route.id === 'crystal-river-marble-redstone' ? 0.03 : undefined,
        ),
        [route.putIn, route.takeOut],
      )
      : null;
    const namedErrors = traceEndpointErrors(namedTrace?.coordinates ?? [], route);
    let trustedNetworkTrace: ReturnType<typeof endpointSnappedRiverNetwork> = null;
    if (namedErrors.startFeet > 500 || namedErrors.endFeet > 500) {
      const networkFeatures = await loadNhdNetworkFeatures(route);
      const networkLines = networkFeatures.flatMap((feature) =>
        (feature.geometry?.paths ?? [])
          .map((pathPoints) => clipPath(pathPoints, bounds))
          .filter((line): line is Point[] => Boolean(line))
          .map((coordinates) => ({
            coordinates,
            costMultiplier: networkCostMultiplier(featureType(feature)),
            name: feature.attributes?.gnis_name ?? feature.attributes?.GNIS_NAME ?? null,
          })),
      );
      const networkRoutePoints = route.putIn && route.takeOut
        ? [route.putIn, ...(officialNetworkWaypoints[route.id] ?? []), route.takeOut]
        : [];
      const networkTrace = networkRoutePoints.length >= 2
        ? endpointSnappedRiverNetwork(
            networkLines,
            networkRoutePoints,
            { maxSnapDistanceMiles: 500 / 5280 },
          )
        : null;
      const networkIncludesNamedRoute = networkTrace?.sourceLineIndexes.some((lineIndex) =>
        namesMatch(route.name, networkLines[lineIndex]?.name),
      ) ?? false;
      trustedNetworkTrace = networkTrace && networkIncludesNamedRoute ? networkTrace : null;
    }
    const namedFallbackCoordinates = namedTrace && route.putIn && route.takeOut
      ? (pointDistanceMiles(namedTrace.coordinates[0], [route.putIn.longitude, route.putIn.latitude])
        <= pointDistanceMiles(namedTrace.coordinates.at(-1)!, [route.putIn.longitude, route.putIn.latitude])
        ? namedTrace.coordinates
        : [...namedTrace.coordinates].reverse())
      : null;
    const lines = trustedNetworkTrace
      ? [trustedNetworkTrace.coordinates]
      : route.id === 'crystal-river-marble-redstone' && namedFallbackCoordinates
        ? [namedFallbackCoordinates]
        : namedLines;
    if (lines.length === 0) continue;
    const publishedErrors = trustedNetworkTrace
      ? traceEndpointErrors(trustedNetworkTrace.coordinates, route)
      : namedErrors;
    matchedRoutes += 1;
    features.push({
      type: 'Feature',
      properties: {
        routeId: route.id,
        riverId: route.riverId,
        name: route.name,
        state: route.state,
        source: 'USGS NHD Flowline',
        traceMode: trustedNetworkTrace ? 'network-traced' : 'named-fallback',
        endpointSnapMaxFeet: Number.isFinite(Math.max(publishedErrors.startFeet, publishedErrors.endFeet))
          ? Math.round(Math.max(publishedErrors.startFeet, publishedErrors.endFeet))
          : null,
      },
      geometry: { type: 'MultiLineString', coordinates: lines },
    });
    }
  }

  await Promise.all(Array.from({ length: 6 }, () => processNextRoute()));
  const curatedRouteIds = new Set(curatedFeatures.map((feature) => feature.properties.routeId));
  for (let index = features.length - 1; index >= 0; index -= 1) {
    if (curatedRouteIds.has(features[index].properties.routeId)) features.splice(index, 1);
  }
  features.push(...curatedFeatures);
  features.sort((left, right) => left.properties.routeId.localeCompare(right.properties.routeId));
  const matchedRouteIds = new Set(features.map((feature) => feature.properties.routeId));
  const unmatchedRouteIds = outputRoutes.map((route) => route.id).filter((routeId) => !matchedRouteIds.has(routeId));
  const metadata = {
    routeCount: outputRoutes.length,
    matchedRouteCount: features.length,
    networkTracedRouteCount: features.filter((feature) => feature.properties.source === 'USGS NHD Flowline' && feature.properties.traceMode === 'network-traced').length,
    namedFallbackRouteCount: features.filter((feature) => feature.properties.source === 'USGS NHD Flowline' && feature.properties.traceMode === 'named-fallback').length,
    curatedRouteCount: features.filter((feature) => feature.properties.source !== 'USGS NHD Flowline').length,
    unmatchedRouteIds,
    routeDataFingerprint: sourceFingerprint,
  };

  await mkdir(stateOutputDir, { recursive: true });
  await mkdir(routeOutputDir, { recursive: true });
  const stateGroups = new Map<string, CanonicalFeature[]>();
  for (const feature of features) {
    const key = stateSlug(feature.properties.state);
    const group = stateGroups.get(key) ?? [];
    group.push(feature);
    stateGroups.set(key, group);
  }
  await Promise.all(
    [...stateGroups.entries()].map(async ([slug, stateFeatures]) => {
      const stateOutputPath = path.join(stateOutputDir, `${slug}.json`);
      const stateTemporaryOutputPath = `${stateOutputPath}.tmp-${process.pid}`;
      await writeFile(
        stateTemporaryOutputPath,
        `${JSON.stringify({ type: 'FeatureCollection', source: 'USGS NHD Flowline', scope: 'state', state: stateFeatures[0]?.properties.state ?? '', ...metadata, features: stateFeatures })}\n`,
        'utf8',
      );
      await rename(stateTemporaryOutputPath, stateOutputPath);
    }),
  );

  const expectedRouteFiles = new Set(features.map((feature) => `${feature.properties.routeId}.json`));
  await Promise.all(
    (await readdir(routeOutputDir))
      .filter((fileName) => fileName.endsWith('.json') && !expectedRouteFiles.has(fileName))
      .map((fileName) => unlink(path.join(routeOutputDir, fileName))),
  );
  await Promise.all(
    features.map(async (feature) => {
      const routeOutputPath = path.join(routeOutputDir, `${feature.properties.routeId}.json`);
      const routeTemporaryOutputPath = `${routeOutputPath}.tmp-${process.pid}`;
      await writeFile(routeTemporaryOutputPath, `${JSON.stringify(feature)}\n`, 'utf8');
      await rename(routeTemporaryOutputPath, routeOutputPath);
    }),
  );

  const states = [...stateGroups.entries()]
    .map(([slug, stateFeatures]) => ({
      slug,
      state: stateFeatures[0]?.properties.state ?? '',
      routeCount: stateFeatures.length,
      path: `/data/canonical-river-geometries/states/${slug}.json`,
    }))
    .sort((left, right) => left.state.localeCompare(right.state));
  await mkdir(path.dirname(outputPath), { recursive: true });
  // The root asset is deliberately only a manifest. Route detail requests use
  // route-scoped files, while state and national maps opt into state bundles.
  const outputText = `${JSON.stringify({
    type: 'CanonicalGeometryManifest',
    source: 'USGS NHD Flowline',
    ...metadata,
    states,
    routePathTemplate: '/data/canonical-river-geometries/routes/{routeId}.json',
  })}\n`;
  const temporaryOutputPath = `${outputPath}.tmp-${process.pid}`;
  await writeFile(temporaryOutputPath, outputText, 'utf8');
  await rename(temporaryOutputPath, outputPath);

  console.log(`Wrote a canonical geometry manifest for ${features.length} matched routes to ${path.relative(root, outputPath)}`);
  console.log(`Wrote ${stateGroups.size} state-scoped geometry assets to ${path.relative(root, stateOutputDir)}`);
  console.log(`Wrote ${features.length} route-scoped geometry assets to ${path.relative(root, routeOutputDir)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
