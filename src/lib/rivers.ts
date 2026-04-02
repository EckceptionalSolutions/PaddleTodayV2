import { rivers } from '../data/rivers';
import { riverTripDetails } from '../data/river-trip-details';
import { scoreRiverCondition } from './scoring';
import { remember } from './server-cache';
import { fetchGaugeReading } from './usgs';
import { fetchWeatherSnapshot } from './weather';
import type { River, RiverScoreResult } from './types';

const GAUGE_CACHE_TTL_MS = 5 * 60 * 1000;
const WEATHER_CACHE_TTL_MS = 10 * 60 * 1000;
const STALE_WHILE_ERROR_MS = 30 * 60 * 1000;

export interface RiverGroup {
  riverId: string;
  name: string;
  routeCount: number;
  states: string[];
  regions: string[];
  routes: River[];
}

export function listRivers(): River[] {
  return rivers.map(enrichRiver);
}

export function getRiverBySlug(slug: string): River | undefined {
  const river = rivers.find((candidate) => candidate.slug === slug);
  return river ? enrichRiver(river) : undefined;
}

export async function getRiverScore(slug: string): Promise<RiverScoreResult | null> {
  const river = getRiverBySlug(slug);
  if (!river) {
    return null;
  }

  return scoreRiver(river);
}

export async function getAllRiverScores(): Promise<RiverScoreResult[]> {
  return Promise.all(listRivers().map((river) => scoreRiver(river)));
}

export function getRiversByRiverId(riverId: string): River[] {
  return listRivers().filter((river) => river.riverId === riverId);
}

export function listRiverGroups(): RiverGroup[] {
  const grouped = new Map<string, River[]>();

  for (const river of listRivers()) {
    const riverId = river.riverId;
    if (!riverId) continue;
    const bucket = grouped.get(riverId) ?? [];
    bucket.push(river);
    grouped.set(riverId, bucket);
  }

  return [...grouped.entries()]
    .map(([riverId, routes]) => {
      const first = routes[0];
      return {
        riverId,
        name: first?.name ?? riverId,
        routeCount: routes.length,
        states: [...new Set(routes.map((route) => route.state))].sort(),
        regions: [...new Set(routes.map((route) => route.region))].sort(),
        routes: [...routes].sort((left, right) => left.reach.localeCompare(right.reach)),
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));
}

export function getRiverGroupById(riverId: string): RiverGroup | undefined {
  return listRiverGroups().find((group) => group.riverId === riverId);
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
    key: `gauge:${river.gaugeSource.siteId}:${river.gaugeSource.metric}`,
    ttlMs: GAUGE_CACHE_TTL_MS,
    staleWhileErrorMs: STALE_WHILE_ERROR_MS,
    load: () => fetchGaugeReading(river.gaugeSource),
  });
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
  return {
    ...enriched,
    riverId: enriched.riverId || deriveRiverId(enriched.name),
  };
}

function deriveRiverId(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
