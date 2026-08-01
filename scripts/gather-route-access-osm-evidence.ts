import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { osmAccessFeatureKind } from './lib/osm-access-feature';

type SuggestionItem = {
  routeId: string;
  endpoint: string;
  endpointName: string;
  current: Coordinate;
  candidates: Array<{ kind: string; latitude: number; longitude: number }>;
};
type SuggestionReport = { generatedAt: string; items: SuggestionItem[] };
type Coordinate = { latitude: number; longitude: number };
type OsmElement = {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};
type OverpassResponse = { elements?: OsmElement[] };
type EvidenceFeature = {
  osmType: OsmElement['type'];
  osmId: number;
  kind: string;
  name: string | null;
  latitude: number;
  longitude: number;
  distanceFromCurrentFeet: number;
  distanceFromMatchedRiverPointFeet: number | null;
  tags: Record<string, string>;
  url: string;
};
type EvidenceItem = {
  routeId: string;
  endpoint: string;
  endpointName: string;
  queried: boolean;
  features: EvidenceFeature[];
};
type ExistingEvidenceReport = {
  classifierVersion?: number;
  cachedOrAttemptedBatchCount?: number;
  failedBatches?: Array<{ index: number }>;
  items?: Array<Omit<EvidenceItem, 'queried'> & { queried?: boolean }>;
};

const root = process.cwd();
const suggestionsPath = path.join(root, 'docs', 'route-coordinate-suggestions.json');
const outputPath = path.join(root, 'docs', 'route-coordinate-osm-evidence.json');
const cacheDir = path.join(root, 'node_modules', '.cache', 'route-coordinate-osm-evidence');
const overpassUrls = [
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass-api.de/api/interpreter',
];
const batchSize = Math.max(1, Math.min(5, Number(process.argv.find((argument) => argument.startsWith('--batch-size='))?.split('=')[1] ?? 3)));
const searchRadiusMeters = 1200;
const feetPerMile = 5280;
const earthRadiusMiles = 3958.8;
const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const maxRemoteBatches = Number(process.argv.find((argument) => argument.startsWith('--max-batches='))?.split('=')[1] ?? 4);
const classifierVersion = 2;

function radians(value: number) { return value * Math.PI / 180; }
function distanceFeet(left: Coordinate, right: Coordinate) {
  const deltaLat = radians(right.latitude - left.latitude);
  const deltaLon = radians(right.longitude - left.longitude);
  const leftLat = radians(left.latitude);
  const rightLat = radians(right.latitude);
  const h = Math.sin(deltaLat / 2) ** 2 + Math.cos(leftLat) * Math.cos(rightLat) * Math.sin(deltaLon / 2) ** 2;
  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(h)) * feetPerMile;
}
function elementCoordinate(element: OsmElement): Coordinate | null {
  const latitude = element.lat ?? element.center?.lat;
  const longitude = element.lon ?? element.center?.lon;
  return Number.isFinite(latitude) && Number.isFinite(longitude) ? { latitude: latitude!, longitude: longitude! } : null;
}
function uniqueSearchPoints(item: SuggestionItem) {
  const points = [item.current, ...item.candidates.filter((candidate) => candidate.kind === 'matched-river-centerline')];
  const seen = new Set<string>();
  return points.filter((point) => {
    const key = `${point.latitude.toFixed(4)},${point.longitude.toFixed(4)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function queryFor(items: SuggestionItem[]) {
  const clauses: string[] = [];
  for (const item of items) {
    for (const point of uniqueSearchPoints(item)) {
      const around = `(around:${searchRadiusMeters},${point.latitude},${point.longitude})`;
      clauses.push(`nwr["waterway"="access_point"]${around};`);
      clauses.push(`nwr["leisure"="slipway"]${around};`);
      clauses.push(`nwr["canoe"~"put_in|egress"]${around};`);
      clauses.push(`nwr["whitewater"="put_in"]${around};`);
      clauses.push(`nwr["bridge"]["highway"]${around};`);
    }
  }
  return `[out:json][timeout:18];(${clauses.join('')});out center tags;`;
}

async function fetchBatch(items: SuggestionItem[]) {
  await mkdir(cacheDir, { recursive: true });
  const batchIdentity = items.map((item) => `${item.routeId}-${item.endpoint}-${item.endpointName}`).join('__')
    .replace(/[^a-z0-9_-]+/gi, '-');
  const cacheKey = createHash('sha256').update(batchIdentity).digest('hex').slice(0, 20);
  const cachePath = path.join(cacheDir, `endpoint-batch-${cacheKey}.json`);
  try { return { response: JSON.parse(await readFile(cachePath, 'utf8')) as OverpassResponse, fromCache: true }; } catch { /* cache miss */ }
  for (let attempt = 0; attempt < overpassUrls.length; attempt += 1) {
    const overpassUrl = overpassUrls[attempt % overpassUrls.length]!;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    let response: Response;
    let responseText: string;
    try {
      response = await fetch(overpassUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'user-agent': 'PaddleToday route-coordinate verifier (https://paddletoday.com)',
        },
        body: new URLSearchParams({ data: queryFor(items) }),
        signal: controller.signal,
      });
      // Keep the abort deadline active until the full body is consumed. Some
      // Overpass mirrors return headers promptly and then stall while streaming
      // the JSON response.
      responseText = await response.text();
    } catch (error) {
      if (attempt < overpassUrls.length - 1) continue;
      throw error;
    } finally {
      clearTimeout(timeout);
    }
    if (response.ok) {
      await writeFile(cachePath, responseText);
      return { response: JSON.parse(responseText) as OverpassResponse, fromCache: false };
    }
    const detail = responseText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500);
    if ([429, 502, 503, 504].includes(response.status) && attempt < overpassUrls.length - 1) {
      await wait(2000);
      continue;
    }
    throw new Error(`Overpass request failed: ${response.status} ${response.statusText}${detail ? ` - ${detail}` : ''}`);
  }
  throw new Error('Overpass request retries exhausted.');
}

function evidenceKey(item: Pick<SuggestionItem, 'routeId' | 'endpoint' | 'endpointName'>) {
  return `${item.routeId}:${item.endpoint}:${item.endpointName}`;
}

function featuresForItem(item: SuggestionItem, elements: OsmElement[]): EvidenceFeature[] {
  const matched = item.candidates.find((candidate) => candidate.kind === 'matched-river-centerline') ?? null;
  const uniqueElements = new Map(elements.map((element) => [`${element.type}/${element.id}`, element]));
  return [...uniqueElements.values()].flatMap((element) => {
    const coordinate = elementCoordinate(element);
    if (!coordinate) return [];
    const distanceFromCurrentFeet = distanceFeet(item.current, coordinate);
    const distanceFromMatchedRiverPointFeet = matched ? distanceFeet(matched, coordinate) : null;
    if (Math.min(distanceFromCurrentFeet, distanceFromMatchedRiverPointFeet ?? Infinity) > searchRadiusMeters * 3.28084) return [];
    const tags = element.tags ?? {};
    return [{
      osmType: element.type,
      osmId: element.id,
      kind: osmAccessFeatureKind(tags),
      name: tags.name ?? null,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      distanceFromCurrentFeet,
      distanceFromMatchedRiverPointFeet,
      tags,
      url: `https://www.openstreetmap.org/${element.type}/${element.id}`,
    }];
  }).sort((left, right) => {
    const leftDistance = Math.min(left.distanceFromCurrentFeet, left.distanceFromMatchedRiverPointFeet ?? Infinity);
    const rightDistance = Math.min(right.distanceFromCurrentFeet, right.distanceFromMatchedRiverPointFeet ?? Infinity);
    return leftDistance - rightDistance;
  }).slice(0, 30);
}

async function writeEvidenceReport(suggestions: SuggestionReport, items: EvidenceItem[], failedBatches: Array<{ keys: string[]; reason: string }>) {
  const queriedCount = items.filter((item) => item.queried).length;
  await writeFile(outputPath, `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    suggestionsGeneratedAt: suggestions.generatedAt,
    source: { name: 'OpenStreetMap via Overpass API', urls: overpassUrls, searchRadiusMeters },
    classifierVersion,
    itemCount: items.length,
    queriedItemCount: queriedCount,
    remainingItemCount: items.length - queriedCount,
    complete: queriedCount === items.length,
    failedBatches,
    items,
  }, null, 2)}\n`);
}

async function main() {
  const suggestions = JSON.parse(await readFile(suggestionsPath, 'utf8')) as SuggestionReport;
  let existing: ExistingEvidenceReport = {};
  try { existing = JSON.parse(await readFile(outputPath, 'utf8')) as ExistingEvidenceReport; } catch { /* first run */ }
  const legacyQueriedCount = (existing.cachedOrAttemptedBatchCount ?? 0) * batchSize;
  const legacyFailedIndexes = new Set((existing.failedBatches ?? []).map((failure) => failure.index));
  const existingByKey = new Map((existing.items ?? []).map((item, index) => [evidenceKey(item), {
    ...item,
    features: item.features.map((feature) => ({ ...feature, kind: osmAccessFeatureKind(feature.tags) })),
    queried: item.queried ?? (index < legacyQueriedCount && !legacyFailedIndexes.has(Math.floor(index / batchSize))),
  } as EvidenceItem]));
  const items: EvidenceItem[] = suggestions.items.map((item) => existingByKey.get(evidenceKey(item)) ?? {
    routeId: item.routeId,
    endpoint: item.endpoint,
    endpointName: item.endpointName,
    queried: false,
    features: [],
  });
  const suggestionByKey = new Map(suggestions.items.map((item) => [evidenceKey(item), item]));
  const uncovered = items.filter((item) => !item.queried).map((item) => suggestionByKey.get(evidenceKey(item))!).filter(Boolean);
  const batches: SuggestionItem[][] = [];
  for (let index = 0; index < uncovered.length; index += batchSize) batches.push(uncovered.slice(index, index + batchSize));
  const failedBatches: Array<{ keys: string[]; reason: string }> = [];
  const itemByKey = new Map(items.map((item) => [evidenceKey(item), item]));
  for (let index = 0; index < Math.min(batches.length, maxRemoteBatches); index += 1) {
    const batch = batches[index] ?? [];
    try {
      const result = await fetchBatch(batch);
      for (const suggestion of batch) {
        const item = itemByKey.get(evidenceKey(suggestion));
        if (!item) continue;
        item.features = featuresForItem(suggestion, result.response.elements ?? []);
        item.queried = true;
      }
      console.log(`[${index + 1}/${batches.length}] gathered ${(result.response.elements ?? []).length} OSM features for ${batch.length} endpoint(s)${result.fromCache ? ' (cached)' : ''}`);
    } catch (error) {
      failedBatches.push({ keys: batch.map(evidenceKey), reason: error instanceof Error ? error.message : String(error) });
      console.warn(`[${index + 1}/${batches.length}] OSM evidence unavailable; continuing`);
    }
    await writeEvidenceReport(suggestions, items, failedBatches);
    await wait(1000);
  }
  await writeEvidenceReport(suggestions, items, failedBatches);
  const queriedCount = items.filter((item) => item.queried).length;
  console.log(`Generated ${path.relative(root, outputPath)} with OSM evidence for ${queriedCount}/${items.length} verification item(s).`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
