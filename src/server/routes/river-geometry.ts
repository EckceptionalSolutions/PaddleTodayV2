import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { ServerResponse } from 'node:http';
import { sendJson } from '../http';
import { GeometryCache, type CanonicalGeometryFeature } from './geometry-cache';

const geometryCache = new GeometryCache(readRouteGeometry);
let assetInventory: { slugs: Set<string>; expiresAt: number } | undefined;
let inventoryPromise: Promise<Set<string>> | undefined;
const INVENTORY_TTL_MS = 60 * 1000;

export function getGeometryCacheStats() { return geometryCache.stats(); }

export async function handleRiverGeometry(
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
  slug: string,
) {
  const feature = await loadRouteGeometry(slug);
  const geometry = feature?.geometry;

  if (!feature || !geometry || !isSupportedGeometry(geometry)) {
    return sendJson(response, 404, { requestId, error: 'geometry_not_found' }, includeBody);
  }

  return sendJson(response, 200, {
    requestId,
    routeId: slug,
    state: feature.properties?.state ?? null,
    source: feature.properties?.source ?? 'USGS NHD Flowline',
    geometry: {
      type: geometry.type,
      coordinates: geometry.coordinates,
    },
  }, includeBody, 'public, max-age=86400, stale-while-revalidate=604800');
}

export async function loadRouteGeometry(slug: string) {
  return geometryCache.load(slug);
}

function geometryDirectories() {
  return ['dist', 'public'].map(root => resolve(process.cwd(), root, 'data', 'canonical-river-geometries', 'routes'));
}

/** The deployed file inventory includes retained route assets needed by older clients. */
async function getAssetInventory() {
  if (assetInventory && assetInventory.expiresAt > Date.now()) return assetInventory.slugs;
  inventoryPromise ??= Promise.all(geometryDirectories().map(async directory => {
    try { return await readdir(directory); }
    catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []; throw error; }
  })).then(directories => {
    const slugs = new Set(directories.flat().filter(name => /^[a-z0-9-]+\.json$/.test(name)).map(name => name.slice(0, -5)));
    assetInventory = { slugs, expiresAt: Date.now() + INVENTORY_TTL_MS };
    return slugs;
  }).finally(() => { inventoryPromise = undefined; });
  return inventoryPromise;
}

async function readRouteGeometry(slug: string) {
  if (!(await getAssetInventory()).has(slug)) return null;
  for (const directory of geometryDirectories()) {
    try {
      return await readFile(resolve(directory, `${slug}.json`), 'utf8');
    } catch (error) {
      const fileError = error as NodeJS.ErrnoException;
      if (fileError.code !== 'ENOENT') throw error;
    }
  }
  return null;
}

function isSupportedGeometry(
  geometry: NonNullable<CanonicalGeometryFeature['geometry']>,
): geometry is NonNullable<CanonicalGeometryFeature['geometry']> & {
  type: 'MultiLineString' | 'LineString';
  coordinates: number[][][] | number[][];
} {
  return (
    (geometry.type === 'MultiLineString' || geometry.type === 'LineString') &&
    Array.isArray(geometry.coordinates)
  );
}
