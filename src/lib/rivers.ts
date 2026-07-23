import { rivers } from '../data/rivers';
import { riverTripDetails } from '../data/river-trip-details';
import { classifyCamping } from './camping-classification';
import { scoreRiverCondition } from './scoring';
import { remember } from './server-cache';
import { fetchGaugeReading } from './gauges';
import { fetchWeatherSnapshot } from './weather';
import { mapWithConcurrency } from './async-concurrency';
import type { River, RiverAccessPoint, RiverScoreResult } from './types';

const GAUGE_CACHE_TTL_MS = 5 * 60 * 1000;
const WEATHER_CACHE_TTL_MS = 10 * 60 * 1000;
const STALE_WHILE_ERROR_MS = 30 * 60 * 1000;
const INFERRED_RIVER_SPLIT_DISTANCE_MILES = 150;
const ALL_RIVER_SCORE_CONCURRENCY = 12;

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

  const indexedRoutes = rivers.map(enrichRiver);
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
    key: `weather:${river.slug}:${river.latitude}:${river.longitude}`,
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

  return {
    ...enriched,
    logistics,
    latitude: putInCoordinates?.latitude ?? enriched.latitude,
    longitude: putInCoordinates?.longitude ?? enriched.longitude,
    riverId: enriched.riverId || inferredRiverIdsBySlug.get(enriched.slug) || deriveRiverId(enriched.name),
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
