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

let geometryIndexPromise: Promise<Map<string, CanonicalGeometryFeature>> | null = null;

export async function handleRiverGeometry(
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
  slug: string,
) {
  const geometryIndex = await loadGeometryIndex();
  const feature = geometryIndex.get(slug);
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

async function loadGeometryIndex() {
  if (geometryIndexPromise) return geometryIndexPromise;

  geometryIndexPromise = readFile(
    resolve(process.cwd(), 'public/data/canonical-river-geometries.json'),
    'utf8',
  ).then((raw) => {
    const payload = JSON.parse(raw) as { features?: CanonicalGeometryFeature[] };
    return new Map(
      (payload.features ?? [])
        .filter((feature) => typeof feature.properties?.routeId === 'string')
        .map((feature) => [feature.properties?.routeId as string, feature]),
    );
  });

  try {
    return await geometryIndexPromise;
  } catch (error) {
    geometryIndexPromise = null;
    throw error;
  }
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
