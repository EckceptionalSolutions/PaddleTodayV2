import { readCachedPayload, writeCachedPayload } from './client-cache.js';
import { snapshotFreshnessMetadata, staleSnapshotReadiness } from '@paddletoday/api-contract';

const nationwideKey = 'river-summary:v2';
const nearbyKey = 'home-nearby-summary:v1';

// Round to a regional center. The farthest corner of a one-degree cell
// lies within 50 miles, so local filtering still includes boundary routes.
export function homeRequestArea(location, radiusMiles) {
  return location ? {
    latitude: Math.round(location.latitude),
    longitude: Math.round(location.longitude),
    radiusMiles: radiusMiles + 50,
  } : undefined;
}

export function areaCovers(area, requested) {
  return !area || Boolean(requested && area.latitude === requested.latitude &&
    area.longitude === requested.longitude && area.radiusMiles >= requested.radiusMiles);
}

export function readHomeSnapshot(area) {
  const nearby = area && readCachedPayload(nearbyKey);
  const national = readCachedPayload(nationwideKey);
  if (nearby?.payload?.scope && areaCovers(nearby.payload.scope, area) &&
      nearby.fetchedAt >= (national?.fetchedAt ?? 0)) return ageHomeSnapshot(nearby);
  return ageHomeSnapshot(national);
}

function ageHomeSnapshot(entry) {
  if (!Array.isArray(entry?.payload?.rivers)) return null;
  const { payload } = entry;
  if (snapshotFreshnessMetadata(payload)?.snapshotStatus === 'fresh' && payload.snapshotStatus !== 'stale') return entry;
  return { ...entry, payload: { ...payload, snapshotStatus: 'stale',
    rivers: payload.rivers.map(item => ({ ...item, readiness: item.readiness && staleSnapshotReadiness(item.readiness) })) } };
}

// Keep one large response per kind. Cache Storage can hold the nationwide
// JSON when it exceeds the browser's synchronous localStorage quota.
const cacheName = 'paddletoday-home-boards-v1';
const slot = nearby => nearby ? '/__home-cache/nearby' : '/__home-cache/nationwide';
export async function readLargeHomeSnapshot(area) {
  try {
    const cache = await caches.open(cacheName);
    let latest = null;
    for (const nearby of area ? [true, false] : [false]) {
      const response = await cache.match(slot(nearby));
      if (!response) continue;
      const entry = await response.json();
      if (areaCovers(entry.payload.scope, area) && entry.fetchedAt > (latest?.fetchedAt ?? 0)) latest = entry;
    }
    return ageHomeSnapshot(latest);
  } catch { /* Storage can be unavailable in private browsing. */ }
  return null;
}

export async function writeHomeSnapshot(payload) {
  const nearby = payload.scope?.kind === 'nearby';
  if (writeCachedPayload(nearby ? nearbyKey : nationwideKey, payload)) return;
  try {
    const cache = await caches.open(cacheName);
    await cache.put(slot(nearby), Response.json({ fetchedAt: Date.now(), payload }));
  } catch { /* Routes on screen remain usable when storage is unavailable. */ }
}
