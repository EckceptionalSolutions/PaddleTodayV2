import type { ServerResponse } from 'node:http';
import { endpointSnappedRiverGeometry, stitchRiverLines, dedupeLine, type Coordinate } from '@paddletoday/geo';
import { routeAccessPoints } from '@paddletoday/api-contract';
import { buildGpx, buildIcs, orientRouteCoordinates, tripPackFilename, type TripPackAccessPoint } from '@paddletoday/trip-pack';
import { getRiverBySlug } from '../../lib/rivers';
import { sendBinary, sendJson } from '../http';
import { loadRouteGeometry } from './river-geometry';

const routeStitchTolerances = new Map([
  ['little-miami-river-rogers-ballpark-carl-rahe', 0.0075],
]);

export async function handleRiverTripPack(
  requestUrl: URL,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
  slug: string,
  format: 'gpx' | 'ics',
) {
  const river = getRiverBySlug(slug);
  if (!river) return sendJson(response, 404, { requestId, error: 'not_found' }, includeBody);

  const points = routeAccessPoints(river);
  const putIn = selectPoint(points, requestUrl.searchParams.get('putin')) ?? points[0];
  const takeOut = selectPoint(points, requestUrl.searchParams.get('takeout')) ?? points.at(-1);
  if (!putIn || !takeOut || putIn.mileFromStart >= takeOut.mileFromStart || !hasCoordinates(putIn) || !hasCoordinates(takeOut)) {
    return sendJson(response, 400, { requestId, error: 'invalid_access_selection', message: 'Choose a put-in before the take-out.' }, includeBody);
  }

  const basePlan = {
    routeSlug: river.slug,
    riverName: river.name,
    reach: river.reach,
    routeUrl: `https://paddletoday.com/rivers/${encodeURIComponent(river.slug)}/?putin=${encodeURIComponent(putIn.id)}&takeout=${encodeURIComponent(takeOut.id)}`,
    putIn: toPackPoint(putIn),
    takeOut: toPackPoint(takeOut),
    intermediateAccessPoints: points
      .filter((point) => point.mileFromStart > putIn.mileFromStart && point.mileFromStart < takeOut.mileFromStart && hasCoordinates(point))
      .map(toPackPoint),
    distanceMiles: Number((takeOut.mileFromStart - putIn.mileFromStart).toFixed(1)),
    estimatedPaddleTime: river.logistics?.estimatedPaddleTime ?? null,
  };

  if (format === 'ics') {
    const start = parseDate(requestUrl.searchParams.get('start'));
    const end = parseDate(requestUrl.searchParams.get('end'));
    if (!start || !end || end <= start) {
      return sendJson(response, 400, { requestId, error: 'invalid_schedule', message: 'Calendar export requires valid start and end times.' }, includeBody);
    }
    const body = buildIcs({ ...basePlan, launchAt: start, expectedTakeOutAt: end });
    return sendBinary(
      response,
      200,
      Buffer.from(body, 'utf8'),
      'text/calendar; charset=utf-8',
      'no-store',
      includeBody,
      {
        'content-disposition': `attachment; filename="${tripPackFilename(basePlan, 'ics')}"`,
        'x-request-id': requestId,
      },
    );
  }

  const feature = await loadRouteGeometry(slug);
  const lines = flattenGeometry(feature?.geometry);
  const snapped = endpointSnappedRiverGeometry(
    stitchRiverLines(lines, routeStitchTolerances.get(slug) ?? 0.0025),
    [
      { latitude: putIn.latitude, longitude: putIn.longitude },
      { latitude: takeOut.latitude, longitude: takeOut.longitude },
    ],
  );
  if (!snapped) {
    return sendJson(response, 409, { requestId, error: 'geometry_not_found', message: 'A canonical route line is not available for this segment.' }, includeBody);
  }

  const coordinates = orientRouteCoordinates(
    snapped.coordinates.map(([longitude, latitude]) => ({ latitude, longitude })),
    basePlan.putIn,
    basePlan.takeOut,
  );
  const body = buildGpx({ ...basePlan, routeCoordinates: coordinates });
  return sendBinary(
    response,
    200,
    Buffer.from(body, 'utf8'),
    'application/gpx+xml; charset=utf-8',
    'public, max-age=86400, stale-while-revalidate=604800',
    includeBody,
    {
      'content-disposition': `attachment; filename="${tripPackFilename(basePlan, 'gpx')}"`,
      'x-request-id': requestId,
    },
  );
}

function selectPoint(points: ReturnType<typeof routeAccessPoints>, id: string | null) {
  return id ? points.find((point) => point.id === id) : undefined;
}

function hasCoordinates<T extends { latitude?: number; longitude?: number }>(point: T | undefined): point is T & { latitude: number; longitude: number } {
  return Boolean(point && Number.isFinite(point.latitude) && Number.isFinite(point.longitude));
}

function toPackPoint(point: { id?: string; name: string; latitude: number; longitude: number; note?: string }): TripPackAccessPoint {
  return { id: point.id, name: point.name, latitude: point.latitude, longitude: point.longitude, note: point.note };
}

function parseDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : null;
}

function flattenGeometry(geometry: { type?: string; coordinates?: unknown } | undefined): Coordinate[][] {
  if (!geometry || !Array.isArray(geometry.coordinates)) return [];
  if (geometry.type === 'LineString') {
    const line = dedupeLine(geometry.coordinates as number[][]);
    return line ? [line] : [];
  }
  if (geometry.type !== 'MultiLineString') return [];
  return (geometry.coordinates as number[][][])
    .map(dedupeLine)
    .filter((line): line is Coordinate[] => line !== null);
}
