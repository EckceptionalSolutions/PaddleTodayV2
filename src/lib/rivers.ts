import { rivers } from '../data/rivers';
import { riverTripDetails } from '../data/river-trip-details';
import { classifyCamping } from './camping-classification';
import { scoreRiverCondition } from './scoring';
import { remember } from './server-cache';
import { fetchGaugeReading } from './gauges';
import { fetchWeatherSnapshot } from './weather';
import { mapWithConcurrency } from './async-concurrency';
import type { River, RiverAccessPoint, RiverScoreResult } from './types';
import { corridorForSlug } from '../data/route-corridors';

const GAUGE_CACHE_TTL_MS = 5 * 60 * 1000;
const WEATHER_CACHE_TTL_MS = 10 * 60 * 1000;
const STALE_WHILE_ERROR_MS = 30 * 60 * 1000;
const INFERRED_RIVER_SPLIT_DISTANCE_MILES = 150;
const ALL_RIVER_SCORE_CONCURRENCY = 12;

// Temporarily withheld while coordinate-audit failures are triaged. These
// routes remain in source data and the audit queue, but are excluded from
// public listings and generated route pages until their endpoints are verified.
export const WITHHELD_ROUTE_SLUGS = new Set([
  'shell-rock-river-heery-woods-renning',
  'shell-rock-river-renning-shell-rock',
  'cumberland-river-redbird-cumberland-falls',
  'otter-tail-river-friberg-hwy-210',
  'des-moines-river-highway-30-sportsman',
  'cedar-river-riverwood-state-line',
  'sheyenne-river-mirror-pool-east-river',
  'sheyenne-river-brome-field-east-river',
  'maquoketa-river-pictured-rocks-ebys-mill',
  'loup-river-monroe-adm-access',
  'loup-river-columbus-adm-access',
  'loup-river-george-syas-adm-access',
  'north-raccoon-river-squirrel-hollow-adkins',
  'sheyenne-river-brome-field-mirror-pool',
  'platte-river-schramm-platte-river-state-park',
  'platte-river-platte-river-state-park-louisville',
  'susquehanna-river-ulster-bridge-terrytown',
  'susquehanna-river-hornbrook-terrytown',
  'susquehanna-river-towanda-terrytown',
  'susquehanna-river-wysox-township-park-terrytown',
  'susquehanna-river-towanda-laceyville',
  'red-river-lincoln-drive-lafave',
  'west-nishnabotna-river-avoca-hancock',
  'rice-creek-peltier-to-long-lake',
  'east-nishnabotna-river-red-oak-essex',
  'turkey-river-garber-millville',
  'sheyenne-river-ylvisaker-bridge-brome-field',
  'badger-mill-creek-old-county-pb-highway-69',
  'north-raccoon-river-eureka-henderson',
  'north-raccoon-river-henderson-squirrel-hollow',
  'cedar-river-chain-lakes-ellis-harbor',
  'wapsipinicon-river-independence-quasqueton',
  'turkey-river-clermont-gilbertson',
  'maquoketa-river-ebys-mill-supples-bridge',
  'hay-river-county-ff-highway-25',
  'upper-iowa-river-iverson-bridge-kumpf',
  'des-moines-river-deer-creek-hydro-electric',
  'baraboo-river-north-freedom-giese',
  'sheboygan-river-johnsonville-dassow',
  'south-skunk-river-river-valley-cj-shreck',
  'boone-river-albright-tunnel-mill',
  'boone-river-tunnel-mill-bells-mill',
  'upper-iowa-river-lower-dam-iverson-bridge',
  'cedar-creek-covered-bridge-lions',
  'loup-river-george-syas-monroe',
  'loup-river-monroe-columbus',
  'loup-river-george-syas-columbus',
  'des-moines-river-douds-austin-park',
  'des-moines-river-austin-park-keosauqua',
  'susquehanna-river-laceyville-west-falls',
  'beaver-dam-river-county-s-lowell',
  'des-moines-river-south-fraser-waterworks-upstream',
  'big-fork-river-highway-1-highway-6-south',
  'boone-river-bells-mill-boone-forks',
  'red-river-north-dam-mb-johnson',
  'rum-river-wayside-milaca',
  'little-sioux-river-linn-grove-peterson',
  'susquehanna-river-test-track-danville',
  'mississippi-river-overlook-belle-prairie',
  'mississippi-river-fletcher-creek-overlook',
  'north-raccoon-river-vogel-riverview',
  'pine-river-norway-pine-river-1',
  'south-skunk-river-lekwa-sopers-mill',
  'susquehanna-river-canal-park-wetlands',
  'susquehanna-river-canal-park-test-track',
  'susquehanna-river-wetlands-bloomsburg',
  'rum-river-north-county-central',
  'north-fork-maquoketa-river-d61-ozark',
  'north-fork-maquoketa-river-cascade-ozark',
  'north-fork-maquoketa-river-ozark-caven',
  'north-fork-maquoketa-river-cascade-caven',
  'boone-river-riverside-briggs-woods',
  'boone-river-briggs-woods-albright',
  'kings-river-rockhouse-trigger-gap',
  'sheboygan-river-dassow-river-park',
  'north-raccoon-river-sac-city-hagge',
  'north-raccoon-river-hagge-white-horse',
  'turtle-creek-school-section-east-creek',
  'maquoketa-river-monmouth-maquoketa',
  'pine-river-richland-center-canoe-port-1-port-4',
  'wapsipinicon-river-stone-city-anamosa',
  'wapsipinicon-river-sherman-allens-grove',
  'upper-illinois-river-siloam-kayak-park-woka',
  'upper-illinois-river-chamber-springs-woka',
  'mullet-river-sumac-river-park',
  'minnehaha-creek-grays-bay-longfellow-lagoon',
  'sauk-river-pineview-heims-mill',
  'trempealeau-river-whitehall-independence',
  'buffalo-river-tyler-bend-gilbert',
  'buffalo-river-tyler-bend-grinders-ferry',
  'susquehanna-river-sayre-towanda',
  'susquehanna-river-hornbrook-wysox-township-park',
  'susquehanna-river-hornbrook-towanda',
  'fox-river-princeton-white-river-locks',
  'juniata-river-lewistown-narrows-newport',
  'white-river-park-riverview-park',
  'mississippi-river-dayton-mississippi-gateway',
  'middle-raccoon-river-cowles-redfield-dam',
  'maquoketa-river-quaker-mill-baileys-ford',
  'north-raccoon-river-rainbow-bend-richey',
  'vermilion-river-schoepfle-mill-hollow',
  'west-nishnabotna-river-oakland-macedonia',
  'black-hawk-creek-hudson-waterloo',
  'black-hawk-creek-ranchero-hope-martin',
  'maquoketa-river-dundee-manchester',
  'maquoketa-river-backbone-dundee',
  'sauk-river-frogtown-rockville',
  'sauk-river-rockville-miller-landing',
  'sauk-river-rockville-knights-of-columbus',
  'sauk-river-rockville-heims-mill',
  'gasconade-river-pointers-creek-cooper-hill',
  'zumbro-river-falls',
  'little-turkey-river-gouldsburg-eldorado',
  'sauk-river-mill-pond-oak-township',
  'sauk-river-oak-township-spring-hill',
  'north-fork-maquoketa-river-d61-caven',
  'menomonee-river-hoyt-park-bluemound',
  'susquehanna-river-sayre-wysox-township-park',
  'susquehanna-river-ulster-bridge-wysox-township-park',
  'sauk-river-frogtown-eagle-park',
  'sauk-river-eagle-miller-landing',
  'sauk-river-eagle-knights-of-columbus',
  'sauk-river-eagle-heims-mill',
  'la-crosse-river-highway-108-veterans',
  'plover-river-hwy-k-jordan-park',
  'lemonweir-river-mauston-dam-19th-ave',
  'winnebago-river-fertile-mason-city',
  'cedar-creek-cedarburg-mill-cth-t',
  'huron-river-argo-gallup',
  'des-moines-river-hydro-electric-south-river',
  'des-moines-river-fort-dodge-lehigh',
  'bark-river-bark-river-park-delafield',
]);

const inferredRiverIdsBySlug = buildInferredRiverIds();
let routeIndexes: RouteIndexes | null = null;

export interface RiverGroup {
  riverId: string;
  name: string;
  routeCount: number;
  states: string[];
  regions: string[];
  routes: River[];
}

export interface RiverStateGroup {
  slug: string;
  name: string;
  routeCount: number;
  riverCount: number;
  regions: string[];
  routes: River[];
}

interface RouteIndexes {
  routes: River[];
  bySlug: Map<string, River>;
  routesByRiverId: Map<string, River[]>;
  riverGroups: RiverGroup[];
  riverGroupById: Map<string, RiverGroup>;
  stateGroups: RiverStateGroup[];
  stateGroupBySlug: Map<string, RiverStateGroup>;
}

export function listRivers(): River[] {
  return [...getRouteIndexes().routes];
}

export function getRiverBySlug(slug: string): River | undefined {
  return getRouteIndexes().bySlug.get(slug);
}

export async function getRiverScore(slug: string): Promise<RiverScoreResult | null> {
  const river = getRiverBySlug(slug);
  if (!river) {
    return null;
  }

  return scoreRiver(river);
}

export async function getAllRiverScores(options?: { concurrency?: number }): Promise<RiverScoreResult[]> {
  const routes = listRivers();
  return mapWithConcurrency(
    routes,
    options?.concurrency ?? ALL_RIVER_SCORE_CONCURRENCY,
    (river) => scoreRiver(river),
  );
}

export function getRiversByRiverId(riverId: string): River[] {
  return [...(getRouteIndexes().routesByRiverId.get(riverId) ?? [])];
}

export function listRiverGroups(): RiverGroup[] {
  return [...getRouteIndexes().riverGroups];
}

export function listRiverStateGroups(): RiverStateGroup[] {
  return [...getRouteIndexes().stateGroups];
}

export function getRiverStateGroupBySlug(slug: string): RiverStateGroup | undefined {
  return getRouteIndexes().stateGroupBySlug.get(slug);
}

export function getRiverGroupById(riverId: string): RiverGroup | undefined {
  return getRouteIndexes().riverGroupById.get(riverId);
}

function getRouteIndexes(): RouteIndexes {
  if (routeIndexes) return routeIndexes;

  const indexedRoutes = rivers.filter((river) => !WITHHELD_ROUTE_SLUGS.has(river.slug)).map(enrichRiver);
  const bySlug = new Map(indexedRoutes.map((river) => [river.slug, river]));
  const routesByRiverId = new Map<string, River[]>();
  const routesByState = new Map<string, River[]>();

  for (const river of indexedRoutes) {
    const riverBucket = routesByRiverId.get(river.riverId) ?? [];
    riverBucket.push(river);
    routesByRiverId.set(river.riverId, riverBucket);

    const stateBucket = routesByState.get(river.state) ?? [];
    stateBucket.push(river);
    routesByState.set(river.state, stateBucket);
  }

  const riverGroups = [...routesByRiverId.entries()]
    .map(([riverId, groupedRoutes]) => {
      const sortedRoutes = [...groupedRoutes].sort((left, right) => left.reach.localeCompare(right.reach));
      return {
        riverId,
        name: sortedRoutes[0]?.name ?? riverId,
        routeCount: sortedRoutes.length,
        states: [...new Set(sortedRoutes.map((route) => route.state))].sort(),
        regions: [...new Set(sortedRoutes.map((route) => route.region))].sort(),
        routes: sortedRoutes,
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));

  const stateGroups = [...routesByState.entries()]
    .map(([state, groupedRoutes]) => {
      const sortedRoutes = [...groupedRoutes].sort((left, right) => {
        const nameSort = left.name.localeCompare(right.name);
        return nameSort === 0 ? left.reach.localeCompare(right.reach) : nameSort;
      });

      return {
        slug: slugifyState(state),
        name: state,
        routeCount: sortedRoutes.length,
        riverCount: new Set(sortedRoutes.map((route) => route.riverId)).size,
        regions: [...new Set(sortedRoutes.map((route) => route.region))].sort(),
        routes: sortedRoutes,
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));

  routeIndexes = {
    routes: indexedRoutes,
    bySlug,
    routesByRiverId,
    riverGroups,
    riverGroupById: new Map(riverGroups.map((group) => [group.riverId, group])),
    stateGroups,
    stateGroupBySlug: new Map(stateGroups.map((group) => [group.slug, group])),
  };
  return routeIndexes;
}

export async function getRiverGroupScores(riverId: string): Promise<RiverScoreResult[] | null> {
  const routes = getRiversByRiverId(riverId);
  if (routes.length === 0) {
    return null;
  }

  const results = await Promise.all(routes.map((river) => scoreRiver(river)));
  return results.sort((left, right) => right.score - left.score);
}

async function scoreRiver(river: River): Promise<RiverScoreResult> {
  const [gauge, weather] = await Promise.all([
    getCachedGaugeReading(river).catch(() => null),
    getCachedWeatherSnapshot(river).catch(() => null),
  ]);

  return scoreRiverCondition({
    river,
    gauge,
    weather,
  });
}

async function getCachedGaugeReading(river: River) {
  return remember({
    key: gaugeCacheKey(river),
    ttlMs: GAUGE_CACHE_TTL_MS,
    staleWhileErrorMs: STALE_WHILE_ERROR_MS,
    load: () => fetchGaugeReadingWithFallback(river),
  });
}

async function fetchGaugeReadingWithFallback(river: River) {
  const sources = [river.gaugeSource, ...(river.fallbackGaugeSources ?? [])];

  for (const source of sources) {
    const reading = await fetchGaugeReading(source).catch(() => null);
    if (reading) {
      return reading;
    }
  }

  return null;
}

function gaugeCacheKey(river: River) {
  const sources = [river.gaugeSource, ...(river.fallbackGaugeSources ?? [])];
  return sources
    .map((source) => `${source.provider}:${source.siteId}:${source.metric}`)
    .join('|');
}

async function getCachedWeatherSnapshot(river: River) {
  return remember({
    // Route sections can share a forecast coordinate. Key by location rather
    // than slug so a refresh does not request identical weather repeatedly.
    key: `weather:${river.latitude}:${river.longitude}`,
    ttlMs: WEATHER_CACHE_TTL_MS,
    staleWhileErrorMs: STALE_WHILE_ERROR_MS,
    load: () => fetchWeatherSnapshot(river.latitude, river.longitude),
  });
}

function enrichRiver(river: River): River {
  const tripDetails = riverTripDetails[river.id];
  const enriched = tripDetails ? { ...river, ...tripDetails } : river;
  const putInCoordinates = getValidAccessCoordinates(enriched.putIn);
  const logistics = enriched.logistics
    ? {
        ...enriched.logistics,
        campingClassification: classifyCamping(enriched.logistics.camping),
      }
    : undefined;

  const base = {
    ...enriched,
    logistics,
    latitude: putInCoordinates?.latitude ?? enriched.latitude,
    longitude: putInCoordinates?.longitude ?? enriched.longitude,
    riverId: enriched.riverId || inferredRiverIdsBySlug.get(enriched.slug) || deriveRiverId(enriched.name),
  };
  const corridor = corridorForSlug(base.slug);
  if (!corridor) return base;
  return {
    ...base,
    corridorId: corridor.corridorId,
    corridorLabel: corridor.label,
    continuityStatus: corridor.continuityStatus,
    ...(corridor.canonicalSlug === base.slug && corridor.segmentEdges ? { segmentEdges: corridor.segmentEdges } : {}),
  };
}

function getValidAccessCoordinates(accessPoint?: RiverAccessPoint) {
  if (!accessPoint) return null;

  return Number.isFinite(accessPoint.latitude) && Number.isFinite(accessPoint.longitude)
    ? {
        latitude: accessPoint.latitude,
        longitude: accessPoint.longitude,
      }
    : null;
}

function deriveRiverId(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function slugifyState(state: string) {
  return state
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildInferredRiverIds() {
  const byBaseId = new Map<string, River[]>();

  for (const river of rivers) {
    if (river.riverId) continue;

    const baseId = deriveRiverId(river.name);
    const bucket = byBaseId.get(baseId) ?? [];
    bucket.push(river);
    byBaseId.set(baseId, bucket);
  }

  const inferred = new Map<string, string>();

  for (const [baseId, routes] of byBaseId.entries()) {
    const routeEntries = routes.map((route) => withTripCoordinates(route));
    const components = splitRouteComponents(routeEntries);

    if (components.length === 1) {
      for (const route of routes) {
        inferred.set(route.slug, baseId);
      }
      continue;
    }

    const componentIds = new Map<number, string>();
    const idCounts = new Map<string, number>();

    components.forEach((component, index) => {
      const states = [...new Set(component.map((route) => deriveRiverId(route.state)))].sort();
      const componentId = `${baseId}-${states.join('-')}`;
      componentIds.set(index, componentId);
      idCounts.set(componentId, (idCounts.get(componentId) ?? 0) + 1);
    });

    components.forEach((component, index) => {
      const componentId = componentIds.get(index) ?? baseId;
      const resolvedId =
        (idCounts.get(componentId) ?? 0) > 1
          ? `${componentId}-${[...new Set(component.map((route) => deriveRiverId(route.region)))].sort().join('-')}`
          : componentId;

      for (const route of component) {
        inferred.set(route.slug, resolvedId);
      }
    });
  }

  return inferred;
}

function withTripCoordinates(river: River): River {
  const tripDetails = riverTripDetails[river.id];
  const putInCoordinates = getValidAccessCoordinates(tripDetails?.putIn);

  return {
    ...river,
    latitude: putInCoordinates?.latitude ?? river.latitude,
    longitude: putInCoordinates?.longitude ?? river.longitude,
  };
}

function splitRouteComponents(routes: River[]) {
  const components: River[][] = [];
  const visited = new Set<string>();

  for (const route of routes) {
    if (visited.has(route.slug)) continue;

    const component: River[] = [];
    const queue = [route];
    visited.add(route.slug);

    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) continue;

      component.push(current);

      for (const candidate of routes) {
        if (visited.has(candidate.slug)) continue;
        if (distanceMiles(current, candidate) > INFERRED_RIVER_SPLIT_DISTANCE_MILES) continue;

        visited.add(candidate.slug);
        queue.push(candidate);
      }
    }

    components.push(component);
  }

  return components;
}

function distanceMiles(left: River, right: River) {
  const earthRadiusMiles = 3958.8;
  const leftLat = degreesToRadians(left.latitude);
  const rightLat = degreesToRadians(right.latitude);
  const latitudeDelta = degreesToRadians(right.latitude - left.latitude);
  const longitudeDelta = degreesToRadians(right.longitude - left.longitude);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(leftLat) * Math.cos(rightLat) * Math.sin(longitudeDelta / 2) ** 2;

  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(haversine));
}

function degreesToRadians(value: number) {
  return (value * Math.PI) / 180;
}
