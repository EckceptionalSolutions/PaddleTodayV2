import type { RoutePlotPoint } from '../components/route-plot-map-model';

export interface MapViewport {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MapCluster extends RoutePlotPoint {
  members: RoutePlotPoint[];
}

export function isMapCluster(point: RoutePlotPoint): point is MapCluster {
  return 'members' in point;
}

// A world-anchored grid keeps membership stable when panning at the same zoom.
// Rebuild only after the camera settles; retain a margin outside the viewport.
// Counts refer to map locations (condition zones or individual route markers).
export function mapViewportPoints(
  points: RoutePlotPoint[],
  region: MapViewport,
  width: number,
  height: number,
): RoutePlotPoint[] {
  if (![region.latitude, region.longitude, region.latitudeDelta, region.longitudeDelta, width, height].every(Number.isFinite)
    || region.latitudeDelta <= 0 || region.longitudeDelta <= 0 || width <= 0 || height <= 0) return [];
  const latStep = region.latitudeDelta * 64 / height;
  const lonStep = region.longitudeDelta * 64 / width;
  const cells = new Map<string, RoutePlotPoint[]>();
  for (const point of points) {
    if (!Number.isFinite(point.latitude) || !Number.isFinite(point.longitude)) continue;
    const longitude = longitudeNear(point.longitude, region.longitude);
    if (Math.abs(point.latitude - region.latitude) > region.latitudeDelta * 0.7
      || Math.abs(longitude - region.longitude) > region.longitudeDelta * 0.7) continue;
    const key = `${Math.floor((longitude + 180) / lonStep)}:${Math.floor((point.latitude + 90) / latStep)}`;
    const cell = cells.get(key);
    if (cell) cell.push(point);
    else cells.set(key, [point]);
  }
  return [...cells.values()].map((members): RoutePlotPoint => {
    if (members.length === 1) return members[0];
    // Membership IDs prevent a recycled native marker from animating to an
    // unrelated cluster when the grid changes on zoom.
    const id = `cluster:${members.map((point) => point.id).sort().join('|')}`;
    return {
      id,
      label: `${members.length} map locations`,
      markerLabel: `${members.length}+`,
      markerAccessibilityLabel: 'Zoom in to explore these locations',
      latitude: members.reduce((sum, point) => sum + point.latitude, 0) / members.length,
      longitude: normalizeLongitude(members.reduce((sum, point) => sum + longitudeNear(point.longitude, region.longitude), 0) / members.length),
      members,
    } as MapCluster;
  });
}

export function clusterFocusRegion(cluster: MapCluster, current: MapViewport): MapViewport {
  // Even co-located routes zoom predictably instead of a zero-size bounds fit.
  return {
    latitude: cluster.latitude,
    longitude: cluster.longitude,
    latitudeDelta: Math.max(current.latitudeDelta / 3, 0.0005),
    longitudeDelta: Math.max(current.longitudeDelta / 3, 0.0005),
  };
}

export function individualRoutesAtZoom(current: boolean, zoom: number) {
  if (!Number.isFinite(zoom)) return current;
  return current ? zoom >= 8.2 : zoom >= 8.8;
}

function normalizeLongitude(longitude: number) {
  return ((longitude + 180) % 360 + 360) % 360 - 180;
}

function longitudeNear(longitude: number, center: number) {
  return center + normalizeLongitude(longitude - center);
}
