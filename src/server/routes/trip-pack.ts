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
  const putInIndex = putIn ? points.indexOf(putIn) : -1;
  const takeOutIndex = takeOut ? points.indexOf(takeOut) : -1;
  if (!putIn || !takeOut || putInIndex < 0 || takeOutIndex <= putInIndex || !hasCoordinates(putIn) || !hasCoordinates(takeOut)) {
    return sendJson(response, 400, { requestId, error: 'invalid_access_selection', message: 'Choose a put-in before the take-out.' }, includeBody);
  }

  const measuredDistance = takeOut.mileFromStart - putIn.mileFromStart;
  const measuredFullDistance = points.length >= 2
    ? points[points.length - 1].mileFromStart - points[0].mileFromStart
    : 0;
  const distanceLabelMatch = river.logistics?.distanceLabel?.match(/(\d+(?:\.\d+)?)/);
  const fullDistance = measuredFullDistance > 0
    ? measuredFullDistance
    : (distanceLabelMatch ? Number(distanceLabelMatch[1]) : null);
  const proportionalDistance = fullDistance && points.length > 1
    ? fullDistance * ((takeOutIndex - putInIndex) / (points.length - 1))
    : null;
  const distanceMiles = measuredDistance > 0 ? measuredDistance : proportionalDistance;

  const basePlan = {
    routeSlug: river.slug,
    riverName: river.name,
    reach: river.reach,
    routeUrl: `https://paddletoday.com/rivers/${encodeURIComponent(river.slug)}/?putin=${encodeURIComponent(putIn.id)}&takeout=${encodeURIComponent(takeOut.id)}`,
    putIn: toPackPoint(putIn),
    takeOut: toPackPoint(takeOut),
    intermediateAccessPoints: points
      .slice(putInIndex + 1, takeOutIndex)
      .filter(hasCoordinates)
      .map(toPackPoint),
    distanceMiles: distanceMiles ? Number(distanceMiles.toFixed(1)) : null,
    estimatedPaddleTime: river.logistics?.estimatedPaddleTime ?? null,
  };

  if (format === 'ics') {
    const schedule = calendarSchedule(requestUrl, river.logistics?.estimatedPaddleTime, distanceMiles);
    if (!schedule) {
      return sendJson(response, 400, { requestId, error: 'invalid_schedule', message: 'Calendar export requires valid start and end times.' }, includeBody);
    }
    const body = buildIcs({ ...basePlan, launchAt: schedule.start, expectedTakeOutAt: schedule.end });
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

function calendarSchedule(requestUrl: URL, paddleTimeLabel?: string, distanceMiles?: number | null) {
  const startValue = requestUrl.searchParams.get('start');
  const endValue = requestUrl.searchParams.get('end');
  if (startValue || endValue) {
    const start = parseDate(startValue);
    const end = parseDate(endValue);
    return start && end && end > start ? { start, end } : null;
  }

  const start = new Date();
  start.setUTCHours(start.getUTCHours() + 1, 0, 0, 0);
  const timeValues = (paddleTimeLabel?.match(/\d+(?:\.\d+)?/g) ?? []).map(Number);
  const estimatedHours = timeValues.at(-1)
    ?? (distanceMiles && distanceMiles > 0 ? distanceMiles / 2.2 : 3);
  const durationMinutes = Math.max(60, Math.round((estimatedHours + 1) * 60));
  return {
    start,
    end: new Date(start.getTime() + durationMinutes * 60 * 1000),
  };
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
