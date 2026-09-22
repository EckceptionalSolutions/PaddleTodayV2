import type { HubDifficultyFilter, HubDistanceFilter } from './river-hub-filters';
import { ROUTE_COMPARISON_LIMIT } from './route-comparison';
import { isRecord, parseJson } from './storage';

export interface RiverHubSession {
  riverId: string;
  slugs: string[];
  sort: 'Best' | 'Shortest' | 'Easiest' | 'Confidence';
  distance: HubDistanceFilter;
  difficulty: HubDifficultyFilter;
  region: string | null;
}

const key = 'paddletoday:river-hub-session:v1';
let lastSession: RiverHubSession | null = null;

export function parseRiverHubSession(raw: string | null, riverId: string): RiverHubSession | null {
  const value = parseJson(raw);
  if (!isRecord(value) || value.riverId !== riverId
    || !Array.isArray(value.slugs) || value.slugs.length > ROUTE_COMPARISON_LIMIT
    || !value.slugs.every(slug => typeof slug === 'string')
    || !['Best', 'Shortest', 'Easiest', 'Confidence'].includes(String(value.sort))
    || !['all', 'under-5', '5-10', '10-plus'].includes(String(value.distance))
    || !['all', 'easy', 'moderate', 'hard'].includes(String(value.difficulty))
    || !(value.region === null || typeof value.region === 'string')) return null;
  return value as unknown as RiverHubSession;
}

export function readRiverHubSession(riverId: string): RiverHubSession {
  let stored: RiverHubSession | null = null;
  try { stored = parseRiverHubSession(globalThis.sessionStorage?.getItem(key) ?? null, riverId); } catch { /* Optional on native and restricted browsers. */ }
  return stored ?? (lastSession?.riverId === riverId ? lastSession : {
    riverId, slugs: [], sort: 'Best', distance: 'all', difficulty: 'all', region: null,
  });
}

export function writeRiverHubSession(session: RiverHubSession) {
  lastSession = session;
  try { globalThis.sessionStorage?.setItem(key, JSON.stringify(session)); } catch { /* Keep in-memory navigation state when storage is unavailable. */ }
}
