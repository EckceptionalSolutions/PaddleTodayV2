import { colors } from '../theme/tokens';

export interface RouteSpanCoordinate {
  latitude: number;
  longitude: number;
}

export interface RoutePlotPoint {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  score?: number | null;
  rating?: string | null;
  meta?: string | null;
  markerLabel?: string | null;
  markerAccessibilityLabel?: string | null;
  routeCount?: number | null;
  spanCoordinates?: RouteSpanCoordinate[] | null;
  spanSegments?: RouteSpanCoordinate[][] | null;
}

export type MapBounds = { minLat: number; maxLat: number; minLon: number; maxLon: number };

export function isFinitePoint(point: RoutePlotPoint) {
  return Number.isFinite(point.latitude) && Number.isFinite(point.longitude);
}

export function isFiniteCoordinate(point: RouteSpanCoordinate) {
  return Number.isFinite(point.latitude) && Number.isFinite(point.longitude);
}

export function finiteSpanCoordinates(coordinates: RouteSpanCoordinate[] | null | undefined) {
  return coordinates?.filter(isFiniteCoordinate) ?? [];
}

export function routeSpanSegments(
  point: RoutePlotPoint,
  canonicalSpans?: ReadonlyMap<string, RouteSpanCoordinate[]>,
): RouteSpanCoordinate[][] {
  const canonicalSpan = finiteSpanCoordinates(canonicalSpans?.get(point.id));
  if (canonicalSpan.length >= 2) return [canonicalSpan];

  const segments = point.spanSegments?.map(finiteSpanCoordinates).filter((segment) => segment.length >= 2) ?? [];
  if (segments.length > 0) return segments;

  const span = finiteSpanCoordinates(point.spanCoordinates);
  if (span.length >= 2) return [span];
  return [[{ latitude: point.latitude, longitude: point.longitude }]];
}

export function markerTextForPoint(point: RoutePlotPoint) {
  return point.markerLabel ?? (typeof point.score === 'number' ? String(point.score) : '');
}

export function getBounds(
  points: RoutePlotPoint[],
  userLocation?: { latitude: number; longitude: number } | null,
  extraCoordinates: RouteSpanCoordinate[] = [],
  canonicalSpans?: ReadonlyMap<string, RouteSpanCoordinate[]>,
): MapBounds {
  const coordinates = [
    ...extraCoordinates,
    ...points.filter(isFinitePoint).flatMap((point) => routeSpanSegments(point, canonicalSpans).flat()),
  ];
  if (userLocation && Number.isFinite(userLocation.latitude) && Number.isFinite(userLocation.longitude)) {
    coordinates.push({ latitude: userLocation.latitude, longitude: userLocation.longitude });
  }
  if (coordinates.length === 0) return { minLat: 43, maxLat: 47, minLon: -95, maxLon: -88 };

  const latitudes = coordinates.map((point) => point.latitude);
  const longitudes = coordinates.map((point) => point.longitude);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLon = Math.min(...longitudes);
  const maxLon = Math.max(...longitudes);
  const latPad = Math.max((maxLat - minLat) * 0.18, 0.08);
  const lonPad = Math.max((maxLon - minLon) * 0.18, 0.08);
  return { minLat: minLat - latPad, maxLat: maxLat + latPad, minLon: minLon - lonPad, maxLon: maxLon + lonPad };
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function projectPoint(latitude: number, longitude: number, bounds: MapBounds) {
  const lonSpan = Math.max(bounds.maxLon - bounds.minLon, 0.01);
  const latSpan = Math.max(bounds.maxLat - bounds.minLat, 0.01);
  return {
    left: `${clamp(((longitude - bounds.minLon) / lonSpan) * 100, 5, 95)}%` as const,
    top: `${clamp((1 - (latitude - bounds.minLat) / latSpan) * 100, 5, 95)}%` as const,
  };
}

export function projectPointNumber(latitude: number, longitude: number, bounds: MapBounds) {
  const lonSpan = Math.max(bounds.maxLon - bounds.minLon, 0.01);
  const latSpan = Math.max(bounds.maxLat - bounds.minLat, 0.01);
  return {
    left: clamp(((longitude - bounds.minLon) / lonSpan) * 100, 5, 95),
    top: clamp((1 - (latitude - bounds.minLat) / latSpan) * 100, 5, 95),
  };
}

export function shouldShowScoreMarkers(latitudeDelta: number, pointCount: number) {
  if (pointCount <= 24) return true;
  if (pointCount <= 80) return latitudeDelta <= 1.5;
  return latitudeDelta <= 0.85;
}

export function shouldShowProjectedScoreMarkers(bounds: MapBounds, pointCount: number) {
  return shouldShowScoreMarkers(Math.max(bounds.maxLat - bounds.minLat, 0.12), pointCount);
}

export function toneForRating(rating: string | null | undefined) {
  if (rating === 'Strong' || rating === 'Good') return { backgroundColor: colors.strong };
  if (rating === 'Fair') return { backgroundColor: colors.fair };
  return { backgroundColor: colors.noGo };
}
