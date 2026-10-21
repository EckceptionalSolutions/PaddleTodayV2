import type { River } from './types';
import { routeAccessPoints } from '@paddletoday/api-contract';
import { routePageHref, routePageConsolidationTarget } from '../data/route-page-consolidations';

type Point = { latitude?: number; longitude?: number } | undefined;
export function accessCoordinates(point: Point): string | undefined {
  return point && Number.isFinite(point.latitude) && Number.isFinite(point.longitude)
    && Math.abs(point.latitude!) <= 90 && Math.abs(point.longitude!) <= 180
    ? `${point.latitude},${point.longitude}` : undefined;
}
export function accessMapHref(point: Point) {
  const coordinates = accessCoordinates(point);
  return coordinates ? `https://www.google.com/maps?q=${coordinates}` : undefined;
}
export function accessDirectionsHref(point: Point) {
  const coordinates = accessCoordinates(point);
  return coordinates ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(coordinates)}&travelmode=driving` : undefined;
}
export function shuttleDirections(putIn: Point, takeOut: Point) {
  const start = accessCoordinates(putIn), end = accessCoordinates(takeOut);
  return start && end ? {
    google: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(start)}&destination=${encodeURIComponent(end)}`,
    apple: `https://maps.apple.com/?saddr=${encodeURIComponent(start)}&daddr=${encodeURIComponent(end)}&dirflg=d`,
  } : {};
}
export function riverTripDetailsHref(route: Pick<River, 'slug' | 'riverId'>, hubId = route.riverId) {
  if (!hubId) return routePageHref(route.slug);
  return `/rivers/by-river/${encodeURIComponent(hubId)}/?details=${encodeURIComponent(route.slug)}#trip-${encodeURIComponent(route.slug)}`;
}
export function tripExportDetailsHref(slug: string, params: URLSearchParams) {
  const target = routePageConsolidationTarget(slug);
  if (!target || !target.endsWith(`#trip-${slug}`)) return routePageHref(slug, params);
  const url = new URL(target, 'https://paddletoday.invalid');
  url.searchParams.set('details', slug);
  return `${url.pathname}${url.search}${url.hash}`;
}
export function tripActionLinks(route: River, hubId = route.riverId) {
  const points = routeAccessPoints(route);
  const match = (point: River['putIn'], last = false) => {
    const explicit = points.find(p => point?.id && p.id === point.id);
    if (explicit) return explicit;
    const candidates = points.filter(p => p.name === point?.name && p.latitude === point?.latitude && p.longitude === point?.longitude);
    // Prefer published IDs over fallback points synthesized by routeAccessPoints.
    const published = candidates.filter(p => route.accessPoints?.some(source => source.id === p.id));
    return (published.length ? published : candidates).at(last ? -1 : 0);
  };
  const putIn = match(route.putIn), takeOut = match(route.takeOut, true);
  const params = new URLSearchParams({ putin: putIn?.id || '', takeout: takeOut?.id || '' });
  const planParams = new URLSearchParams({ route: route.slug, name: route.name, ...Object.fromEntries(params) });
  const validAccess = Boolean(accessCoordinates(route.putIn) && accessCoordinates(route.takeOut) && putIn && takeOut && points.indexOf(takeOut) > points.indexOf(putIn));
  return {
    details: riverTripDetailsHref(route, hubId), plan: `/trips/?${planParams}`,
    gpx: validAccess ? `/api/rivers/${encodeURIComponent(route.slug)}/trip.gpx?${params}` : undefined,
    calendar: validAccess ? `/api/rivers/${encodeURIComponent(route.slug)}/trip.ics?${params}` : undefined,
  };
}
