import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

type Coordinate = { latitude: number; longitude: number };
type ArcGisFeature = {
  attributes?: Record<string, string | number | null>;
  geometry?: { paths?: number[][][]; rings?: number[][][] };
};
type ArcGisResponse = { features?: ArcGisFeature[]; error?: { message?: string; details?: string[] } };
type CandidateInput = Coordinate & {
  candidateId: string;
  sourceType: 'authoritative-access' | 'authoritative-water-entry' | 'mapped-access';
  name: string | null;
  intendedWaterbody: string | null;
  terminalAlternateWaterbody?: {
    routeWaterbody: string;
    relationship: 'downstream-after-confluence' | 'tributary-before-confluence' | 'connected-water-trail-waterbody';
    sourceUrl: string;
    sourceLabel: string;
    maximumDownstreamDistanceFeet?: number;
    maximumConnectionDistanceFeet?: number;
  };
};
type SuggestionItem = {
  routeId: string;
  routeName: string;
  endpoint: string;
  endpointName: string;
  authoritativeAccessCandidates?: Array<Coordinate & {
    provider: string;
    featureId: string;
    name: string | null;
    coordinateRole?: string | null;
    waterbody?: string | null;
    terminalAlternateWaterbody?: CandidateInput['terminalAlternateWaterbody'];
  }>;
  candidates?: Array<Coordinate & { kind: string; name: string | null; sourceUrl?: string }>;
};
type SuggestionReport = { generatedAt: string; items: SuggestionItem[] };

const root = process.cwd();
const suggestionsPath = path.join(root, 'docs', 'route-coordinate-suggestions.json');
const auditCacheDir = path.join(root, 'node_modules', '.cache', 'route-coordinate-river-audit');
const directCacheDir = path.join(root, 'node_modules', '.cache', 'route-coordinate-candidate-hydrography');
const outputPath = path.join(root, 'docs', 'route-coordinate-candidate-hydrography.json');
const nhdFlowlineQueryUrl = 'https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/6/query';
const nhdWaterbodyQueryUrl = 'https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/12/query';
const nhdAreaQueryUrl = 'https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/9/query';
const directQueryMarginDegrees = 0.03;
const feetPerMile = 5280;
const earthRadiusMiles = 3958.8;

function radians(value: number) { return value * Math.PI / 180; }
function distanceFeet(left: Coordinate, right: Coordinate) {
  const deltaLat = radians(right.latitude - left.latitude);
  const deltaLon = radians(right.longitude - left.longitude);
  const leftLat = radians(left.latitude);
  const rightLat = radians(right.latitude);
  const h = Math.sin(deltaLat / 2) ** 2
    + Math.cos(leftLat) * Math.cos(rightLat) * Math.sin(deltaLon / 2) ** 2;
  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(h)) * feetPerMile;
}

function normalizeWaterwayName(value: string | null | undefined) {
  return (value ?? '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ')
    .replace(/\bthe\b/g, ' ').replace(/\s+/g, ' ').trim();
}

function waterwayNamesAgree(routeName: string, candidateName: string | null) {
  const route = normalizeWaterwayName(routeName);
  const candidate = normalizeWaterwayName(candidateName);
  if (!route || !candidate) return false;
  if (route === candidate || route.includes(candidate) || candidate.includes(route)) return true;
  const branchPrefix = /^(?:north|south|east|west|middle|main) (?:branch|fork) /;
  return (branchPrefix.test(candidate) && candidate.replace(branchPrefix, '') === route)
    || (branchPrefix.test(route) && route.replace(branchPrefix, '') === candidate);
}

function waterwayNamesStrictlyAgree(routeName: string, candidateName: string | null) {
  const route = normalizeWaterwayName(routeName);
  const candidate = normalizeWaterwayName(candidateName);
  if (!route || !candidate) return false;
  if (route === candidate) return true;
  const branchPrefix = /^(?:north|south|east|west|middle|main) (?:branch|fork) /;
  return (branchPrefix.test(candidate) && candidate.replace(branchPrefix, '') === route)
    || (branchPrefix.test(route) && route.replace(branchPrefix, '') === candidate);
}

function directCacheKey(routeName: string, point: Coordinate, layer: string) {
  return `${normalizeWaterwayName(routeName).replace(/\s+/g, '-') || 'unnamed'}__${point.latitude.toFixed(6)}__${point.longitude.toFixed(6)}__${layer}__v1`;
}

function buildDirectNhdQuery(point: Coordinate, queryUrl: string, where: string) {
  const params = new URLSearchParams({
    f: 'json', where,
    geometry: [point.longitude - directQueryMarginDegrees, point.latitude - directQueryMarginDegrees,
      point.longitude + directQueryMarginDegrees, point.latitude + directQueryMarginDegrees].join(','),
    geometryType: 'esriGeometryEnvelope', inSR: '4326', spatialRel: 'esriSpatialRelIntersects',
    outSR: '4326', outFields: 'GNIS_NAME,FTYPE,FCODE', returnGeometry: 'true',
    geometryPrecision: '6', resultRecordCount: '2000',
  });
  return `${queryUrl}?${params.toString()}`;
}

async function fetchDirectNhd(routeName: string, point: Coordinate, layer: string, queryUrl: string, where: string) {
  await mkdir(directCacheDir, { recursive: true });
  const cachePath = path.join(directCacheDir, `${directCacheKey(routeName, point, layer)}.json`);
  try { return JSON.parse(await readFile(cachePath, 'utf8')) as ArcGisResponse; } catch { /* cache miss */ }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch(buildDirectNhdQuery(point, queryUrl, where), {
      signal: controller.signal,
      headers: { 'user-agent': 'PaddleToday route-coordinate verifier (https://paddletoday.com)' },
    });
    if (!response.ok) throw new Error(`NHD candidate query failed: ${response.status} ${response.statusText}`);
    const body = await response.text();
    const parsed = JSON.parse(body) as ArcGisResponse;
    if (parsed.error?.message) throw new Error([parsed.error.message, ...(parsed.error.details ?? [])].filter(Boolean).join(': '));
    await writeFile(cachePath, body);
    return parsed;
  } finally {
    clearTimeout(timeout);
  }
}

const directHydrographyRequests = new Map<string, Promise<{
  flowlines: ArcGisFeature[];
  routeFlowlines: ArcGisFeature[];
  waterbodies: ArcGisFeature[];
  verified: boolean;
  error: string | null;
}>>();

function loadDirectCandidateHydrography(routeName: string, intendedWaterbody: string, point: Coordinate) {
  const cacheWaterbodyName = routeName === intendedWaterbody ? routeName : `${routeName}--${intendedWaterbody}`;
  const key = directCacheKey(cacheWaterbodyName, point, 'combined');
  const existing = directHydrographyRequests.get(key);
  if (existing) return existing;
  const request = Promise.all([
    fetchDirectNhd(cacheWaterbodyName, point, 'flowline', nhdFlowlineQueryUrl, "GNIS_NAME IS NOT NULL AND GNIS_NAME <> ''"),
    fetchDirectNhd(cacheWaterbodyName, point, 'waterbody', nhdWaterbodyQueryUrl, '1=1'),
    fetchDirectNhd(cacheWaterbodyName, point, 'area', nhdAreaQueryUrl, '1=1'),
  ]).then(([flowlines, waterbodies, areas]) => ({
    flowlines: (flowlines.features ?? []).filter((feature) => {
      const rawName = feature.attributes?.GNIS_NAME ?? feature.attributes?.gnis_name;
      return waterwayNamesAgree(intendedWaterbody, typeof rawName === 'string' ? rawName : null);
    }),
    routeFlowlines: (flowlines.features ?? []).filter((feature) => {
      const rawName = feature.attributes?.GNIS_NAME ?? feature.attributes?.gnis_name;
      return waterwayNamesStrictlyAgree(routeName, typeof rawName === 'string' ? rawName : null);
    }),
    waterbodies: [...(waterbodies.features ?? []), ...(areas.features ?? [])],
    verified: true,
    error: null,
  })).catch((error: unknown) => ({
    flowlines: [], routeFlowlines: [], waterbodies: [], verified: false,
    error: error instanceof Error ? error.message : String(error),
  }));
  directHydrographyRequests.set(key, request);
  return request;
}

function projectToSegment(point: Coordinate, start: number[], end: number[]) {
  const latitudeScale = 69;
  const longitudeScale = Math.cos(radians(point.latitude)) * 69.172;
  const px = point.longitude * longitudeScale;
  const py = point.latitude * latitudeScale;
  const sx = start[0]! * longitudeScale;
  const sy = start[1]! * latitudeScale;
  const ex = end[0]! * longitudeScale;
  const ey = end[1]! * latitudeScale;
  const dx = ex - sx;
  const dy = ey - sy;
  const lengthSquared = dx * dx + dy * dy;
  const ratio = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1, ((px - sx) * dx + (py - sy) * dy) / lengthSquared));
  const coordinate = {
    longitude: start[0]! + ratio * (end[0]! - start[0]!),
    latitude: start[1]! + ratio * (end[1]! - start[1]!),
  };
  return { ...coordinate, distanceFeet: distanceFeet(point, coordinate) };
}

function nearestFlowline(point: Coordinate, features: ArcGisFeature[]) {
  let best: (Coordinate & { distanceFeet: number; name: string | null }) | null = null;
  for (const feature of features) {
    for (const line of feature.geometry?.paths ?? []) {
      for (let index = 1; index < line.length; index += 1) {
        const start = line[index - 1];
        const end = line[index];
        if (!start || !end || start.length < 2 || end.length < 2) continue;
        const candidate = projectToSegment(point, start, end);
        const rawName = feature.attributes?.GNIS_NAME ?? feature.attributes?.gnis_name;
        const name = typeof rawName === 'string' && rawName.length > 0 ? rawName : null;
        if (!best || candidate.distanceFeet < best.distanceFeet) best = { ...candidate, name };
      }
    }
  }
  return best;
}

function nearestFlowlineSetDistance(left: ArcGisFeature[], right: ArcGisFeature[]) {
  let best = Infinity;
  const compare = (sources: ArcGisFeature[], targets: ArcGisFeature[]) => {
    for (const feature of sources) {
      for (const line of feature.geometry?.paths ?? []) {
        for (const vertex of line) {
          if (vertex.length < 2) continue;
          const nearest = nearestFlowline({ latitude: vertex[1]!, longitude: vertex[0]! }, targets);
          if (nearest) best = Math.min(best, nearest.distanceFeet);
        }
      }
    }
  };
  compare(left, right);
  compare(right, left);
  return Number.isFinite(best) ? best : null;
}

function pointInRing(point: Coordinate, ring: number[][]) {
  let inside = false;
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index, index += 1) {
    const left = ring[index];
    const right = ring[previous];
    if (!left || !right) continue;
    const intersects = ((left[1]! > point.latitude) !== (right[1]! > point.latitude))
      && point.longitude < ((right[0]! - left[0]!) * (point.latitude - left[1]!)) / (right[1]! - left[1]!) + left[0]!;
    if (intersects) inside = !inside;
  }
  return inside;
}

function nearestWaterbody(point: Coordinate, features: ArcGisFeature[]) {
  let best: (Coordinate & { distanceFeet: number; name: string | null }) | null = null;
  for (const feature of features) {
    const rings = feature.geometry?.rings ?? [];
    const rawName = feature.attributes?.GNIS_NAME ?? feature.attributes?.gnis_name;
    const name = typeof rawName === 'string' && rawName.length > 0 ? rawName : null;
    if (rings.some((ring) => pointInRing(point, ring))) return { ...point, distanceFeet: 0, name };
    for (const ring of rings) {
      for (let index = 1; index < ring.length; index += 1) {
        const start = ring[index - 1];
        const end = ring[index];
        if (!start || !end || start.length < 2 || end.length < 2) continue;
        const candidate = projectToSegment(point, start, end);
        if (!best || candidate.distanceFeet < best.distanceFeet) best = { ...candidate, name };
      }
    }
  }
  return best;
}

function candidatesFor(item: SuggestionItem) {
  const official = (item.authoritativeAccessCandidates ?? [])
    // A property label point or polygon centroid is useful research context,
    // but it is not an access/parking location and must never become a seed
    // for a projected water-entry correction.
    .filter((candidate) => candidate.coordinateRole !== 'authoritative-area-anchor')
    .map((candidate) => ({
    candidateId: `${candidate.coordinateRole === 'authoritative-water-entry' ? 'official-water-entry' : 'official'}:${candidate.provider}:${candidate.featureId}`,
    sourceType: candidate.coordinateRole === 'authoritative-water-entry' ? 'authoritative-water-entry' as const : 'authoritative-access' as const,
    name: candidate.name,
    intendedWaterbody: candidate.waterbody ?? null,
    terminalAlternateWaterbody: candidate.terminalAlternateWaterbody,
    latitude: candidate.latitude,
    longitude: candidate.longitude,
  }));
  const mapped = (item.candidates ?? [])
    .filter((candidate) => candidate.kind.startsWith('osm-') && candidate.kind !== 'osm-road-bridge')
    .map((candidate) => ({
      candidateId: `mapped:${candidate.sourceUrl ?? `${candidate.kind}:${candidate.latitude.toFixed(7)},${candidate.longitude.toFixed(7)}`}`,
      sourceType: 'mapped-access' as const,
      name: candidate.name,
      intendedWaterbody: null,
      latitude: candidate.latitude,
      longitude: candidate.longitude,
    }));
  return [...new Map([...official, ...mapped].map((candidate) => [candidate.candidateId, candidate])).values()];
}

async function loadRouteHydrography(routeId: string, cacheFiles: string[]) {
  const routeFiles = cacheFiles.filter((file) => file.startsWith(`${routeId}__`));
  const flowlineFiles = routeFiles.filter((file) => file.endsWith('__named-variants-v2.json'));
  const waterbodyFiles = routeFiles.filter((file) => file.includes('__waterbodies__'));
  const readFeatures = async (files: string[]) => (await Promise.all(files.map(async (file) => {
    try { return (JSON.parse(await readFile(path.join(auditCacheDir, file), 'utf8')) as ArcGisResponse).features ?? []; }
    catch { return []; }
  }))).flat();
  return { flowlines: await readFeatures(flowlineFiles), waterbodies: await readFeatures(waterbodyFiles) };
}

async function main() {
  const suggestions = JSON.parse(await readFile(suggestionsPath, 'utf8')) as SuggestionReport;
  const cacheFiles = await readdir(auditCacheDir);
  const routeHydrography = new Map<string, Awaited<ReturnType<typeof loadRouteHydrography>>>();
  await Promise.all([...new Set(suggestions.items.map((item) => item.routeId))].map(async (routeId) => {
    routeHydrography.set(routeId, await loadRouteHydrography(routeId, cacheFiles));
  }));

  const items = await Promise.all(suggestions.items.map(async (item) => {
    const hydrography = routeHydrography.get(item.routeId) ?? { flowlines: [], waterbodies: [] };
    const candidates = candidatesFor(item);
    return {
      routeId: item.routeId,
      endpoint: item.endpoint,
      endpointName: item.endpointName,
      candidates: await Promise.all(candidates.map(async (candidate: CandidateInput) => {
        const intendedWaterbody = candidate.intendedWaterbody ?? item.routeName;
        const direct = await loadDirectCandidateHydrography(item.routeName, intendedWaterbody, candidate);
        const directFlowline = nearestFlowline(candidate, direct.flowlines);
        const directRouteFlowline = nearestFlowline(candidate, direct.routeFlowlines);
        const directWaterbody = nearestWaterbody(candidate, direct.waterbodies);
        const alternateWaterbody = !waterwayNamesAgree(item.routeName, intendedWaterbody);
        const connectedWaterTrailWaterbody = candidate.terminalAlternateWaterbody?.relationship === 'connected-water-trail-waterbody';
        const directNamedWaterbodyAgreement = Boolean(directWaterbody?.name
          && waterwayNamesAgree(intendedWaterbody, directWaterbody.name));
        const flowline = directFlowline ?? (alternateWaterbody ? null : nearestFlowline(candidate, hydrography.flowlines));
        const waterbody = directWaterbody ?? nearestWaterbody(candidate, hydrography.waterbodies);
        const routeToIntendedFlowlineJunctionFeet = alternateWaterbody
          ? nearestFlowlineSetDistance(direct.routeFlowlines, direct.flowlines)
          : 0;
        return {
          ...candidate,
          intendedWaterbody,
          // A candidate query is only independently useful when it found the
          // intended named flowline around the proposed coordinate. Waterbody
          // provenance is tracked separately because narrow rivers often have
          // no polygon at all.
          // A named lake terminal on an official water trail may not have a
          // same-named NHD flowline. In that narrow declared case, require the
          // candidate-centered query to find both the intended named waterbody
          // and the route's own flowline in the same local envelope.
          directQueryVerified: direct.verified && Boolean(directFlowline
            || (connectedWaterTrailWaterbody && directNamedWaterbodyAgreement && directRouteFlowline)),
          directQueryError: direct.error,
          flowlineEvidenceSource: directFlowline || (connectedWaterTrailWaterbody && directRouteFlowline)
            ? 'candidate-query'
            : 'route-cache',
          waterbodyEvidenceSource: directWaterbody ? 'candidate-query' : 'route-cache',
          nearestIntendedFlowlineFeet: flowline?.distanceFeet ?? null,
          nearestIntendedFlowlineName: flowline?.name ?? null,
          nearestIntendedFlowlineCoordinate: flowline ? { latitude: flowline.latitude, longitude: flowline.longitude } : null,
          candidateToRouteFlowlineFeet: directRouteFlowline?.distanceFeet ?? null,
          routeToIntendedFlowlineJunctionFeet,
          nearestWaterbodyFeet: waterbody?.distanceFeet ?? null,
          nearestWaterbodyName: waterbody?.name ?? null,
          nearestWaterbodyCoordinate: waterbody ? { latitude: waterbody.latitude, longitude: waterbody.longitude } : null,
          onNhdWaterbody: (waterbody?.distanceFeet ?? Infinity) <= 1,
        };
      })),
    };
  }));
  const candidateCount = items.reduce((sum, item) => sum + item.candidates.length, 0);
  await writeFile(outputPath, `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    suggestionsGeneratedAt: suggestions.generatedAt,
    source: 'Fresh candidate-centered USGS National Hydrography Dataset queries with route-cache fallback',
    itemCount: items.length,
    candidateCount,
    items,
  }, null, 2)}\n`);
  console.log(`Generated ${path.relative(root, outputPath)} with direct NHD evidence for ${candidateCount} candidate coordinate(s).`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
