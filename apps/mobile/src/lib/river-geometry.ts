import type { RiverGeometryResponse } from '@paddletoday/api-contract';
import {
  dedupeLine,
  endpointSnappedRiverGeometry,
  stitchRiverLines,
  type Coordinate,
} from '@paddletoday/geo';
import type { RouteSpanCoordinate } from '../components/route-plot-map';

// A small number of NHD route assets are split at a larger gap than the
// normal tile-boundary tolerance. Keep route-specific data policy local while
// sharing the geometry algorithm across web and mobile.
const routeStitchTolerances = new Map([
  ['little-miami-river-rogers-ballpark-carl-rahe', 0.0075],
]);

export function endpointSnappedRouteCoordinates(
  geometry: RiverGeometryResponse | null | undefined,
  routePoints: RouteSpanCoordinate[] | null | undefined,
): RouteSpanCoordinate[] | null {
  if (!geometry || !routePoints || routePoints.length < 2) return null;

  const lines = stitchRiverLines(
    flattenGeometry(geometry.geometry),
    routeStitchTolerances.get(geometry.routeId) ?? 0.0025,
  );
  const best = endpointSnappedRiverGeometry(lines, routePoints);
  return best?.coordinates.map(([longitude, latitude]) => ({ latitude, longitude })) ?? null;
}

function flattenGeometry(geometry: RiverGeometryResponse['geometry']): Coordinate[][] {
  if (geometry.type === 'LineString') {
    const line = dedupeLine(geometry.coordinates as number[][]);
    return line ? [line] : [];
  }

  return (geometry.coordinates as number[][][])
    .map(dedupeLine)
    .filter((line): line is Coordinate[] => line !== null);
}
