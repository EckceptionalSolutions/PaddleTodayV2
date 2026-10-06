import { normalizeSearchText, type RiverAccessPoint, type RiverDetailApiResult, type RiverGeometryResponse, type TripRoute } from '@paddletoday/api-contract';
import { estimateSegmentDurationMinutes, parseDistanceMiles } from '@paddletoday/trip-pack';
import { clipOfflineSegmentGeometry, selectedSegmentDistance } from './offline-trip-segment';

export type TripPreviewPoint = { latitude: number; longitude: number; name: string; kind: 'putIn' | 'takeOut' };
type PreviewRiver = Pick<RiverDetailApiResult['river'], 'slug' | 'putIn' | 'takeOut' | 'accessPoints' | 'distanceLabel' | 'estimatedPaddleTime' | 'segmentEdges' | 'continuityStatus'>;
export function tripRoutePreview(route: TripRoute, detail: { river: PreviewRiver } | undefined, geometry?: RiverGeometryResponse) {
  if (!route.slug || route.slug !== detail?.river.slug) return null;
  const river = detail.river;
  const candidates = [...(river.accessPoints ?? []), river.putIn, river.takeOut].filter((p): p is RiverAccessPoint => !!p);
  const unique = [...new Map(candidates.map(p => [p.id || `${p.name}:${p.latitude}:${p.longitude}`, p])).values()];
  const resolve = (id: string, name: string) => {
    if (id) return unique.find(p => p.id === id);
    if (!name.trim()) return undefined;
    const matches = unique.filter(p => normalizeSearchText(p.name) === normalizeSearchText(name));
    return matches.length === 1 ? matches[0] : undefined;
  };
  const putIn = resolve(route.putInId, route.putInName), takeOut = resolve(route.takeOutId, route.takeOutName);
  const points: TripPreviewPoint[] = [];
  for (const [kind, point] of [['putIn', putIn], ['takeOut', takeOut]] as const) {
    if (point && typeof point.latitude === 'number' && Number.isFinite(point.latitude) && Math.abs(point.latitude) <= 90
      && typeof point.longitude === 'number' && Number.isFinite(point.longitude) && Math.abs(point.longitude) <= 180) {
      points.push({ kind, name: point.name, latitude: point.latitude, longitude: point.longitude });
    }
  }
  const matchesDefault = (point: RiverAccessPoint | undefined, original: RiverAccessPoint | undefined) => !!point && !!original
    && (point.id && original.id ? point.id === original.id : point.name === original.name && point.latitude === original.latitude && point.longitude === original.longitude);
  const fullRoute = matchesDefault(putIn, river.putIn) && matchesDefault(takeOut, river.takeOut);
  const startIndex = river.accessPoints?.findIndex(p => p.id === putIn?.id) ?? -1;
  const endIndex = river.accessPoints?.findIndex(p => p.id === takeOut?.id) ?? -1;
  const ordered = startIndex >= 0 && endIndex > startIndex;
  const verifiedLinks = river.segmentEdges ? ordered && river.accessPoints!.slice(startIndex, endIndex).every((point, i) =>
    river.segmentEdges!.some(edge => edge.fromId === point.id && edge.toId === river.accessPoints![startIndex + i + 1]!.id && edge.status === 'verified')) : true;
  const canEstimate = !!putIn && !!takeOut && verifiedLinks && river.continuityStatus !== 'condition-family';
  const singleDistanceLabel = /^(?:about\s+|approximately\s+|~\s*)?\d+(?:\.\d+)?\s*(?:mi|miles?)\.?$/i.test(river.distanceLabel.trim());
  const distanceMiles = canEstimate
    ? selectedSegmentDistance(river.accessPoints, putIn, takeOut, singleDistanceLabel ? river.distanceLabel : null) ?? (fullRoute && singleDistanceLabel ? parseDistanceMiles(river.distanceLabel) : null)
    : null;
  const estimatedMinutes = distanceMiles && singleDistanceLabel ? estimateSegmentDurationMinutes(river.distanceLabel, river.estimatedPaddleTime, distanceMiles) : null;
  const rawLines = geometry?.routeId === route.slug ? geometry.geometry.type === 'LineString'
    ? [geometry.geometry.coordinates as number[][]] : geometry.geometry.coordinates as number[][][] : null;
  const clipped = rawLines && points.length === 2 && putIn && takeOut && verifiedLinks
    ? clipOfflineSegmentGeometry(rawLines, putIn, takeOut) : null;
  const lines = clipped?.lines.map(line => line.map(([longitude, latitude]) => ({ latitude: latitude!, longitude: longitude! }))) ?? [];
  return { points, lines, distanceMiles, estimatedMinutes, missingEndpoints: points.length < 2, fullRoute };
}
export function tripDurationLabel(minutes: { min: number; max: number }) {
  const format = (value: number) => value >= 60 ? `${Math.floor(value / 60)} hr${value % 60 ? ` ${value % 60} min` : ''}` : `${value} min`;
  return minutes.min === minutes.max ? format(minutes.min) : `${format(minutes.min)}–${format(minutes.max)}`;
}
