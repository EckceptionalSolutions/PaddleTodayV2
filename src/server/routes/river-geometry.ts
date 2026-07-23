import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { ServerResponse } from 'node:http';
import { sendJson } from '../http';

type CanonicalGeometryFeature = {
  properties?: {
    routeId?: string;
    state?: string;
    source?: string;
  };
  geometry?: {
    type?: string;
    coordinates?: unknown;
  };
};

const geometryPromises = new Map<string, Promise<CanonicalGeometryFeature | null>>();

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

async function loadRouteGeometry(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const existing = geometryPromises.get(slug);
  if (existing) return existing;

  const geometryPromise = readFirstRouteGeometry(slug)
    .then((raw) => JSON.parse(raw) as CanonicalGeometryFeature)
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
  geometryPromises.set(slug, geometryPromise);
  try {
    return await geometryPromise;
  } catch (error) {
    geometryPromises.delete(slug);
    throw error;
  }
}

async function readFirstRouteGeometry(slug: string) {
  const candidates = [
    resolve(process.cwd(), 'dist', 'data', 'canonical-river-geometries', 'routes', `${slug}.json`),
    resolve(process.cwd(), 'public', 'data', 'canonical-river-geometries', 'routes', `${slug}.json`),
  ];
  let lastError: NodeJS.ErrnoException | null = null;
  for (const candidate of candidates) {
    try {
      return await readFile(candidate, 'utf8');
    } catch (error) {
      const fileError = error as NodeJS.ErrnoException;
      if (fileError.code !== 'ENOENT') throw error;
      lastError = fileError;
    }
  }
  throw lastError ?? Object.assign(new Error(`Geometry not found for ${slug}.`), { code: 'ENOENT' });
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
