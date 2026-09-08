import type { MapViewport } from './map-viewport';

export interface ExploreViewportSnapshot {
  context: string;
  viewport: MapViewport;
}

// The last settled native viewport is reference data, not a new camera intent.
// Restore it only for the same applied filters/location, and copy library-owned
// coordinates so a later native event cannot mutate the saved snapshot.
export function restoreExploreViewport(snapshot: ExploreViewportSnapshot | null, context: string): MapViewport | undefined {
  if (!snapshot || snapshot.context !== context) return undefined;
  const { latitude, longitude, latitudeDelta, longitudeDelta } = snapshot.viewport;
  if (![latitude, longitude, latitudeDelta, longitudeDelta].every(Number.isFinite)
    || Math.abs(latitude) > 90 || latitudeDelta <= 0 || longitudeDelta <= 0) return undefined;
  return { latitude, longitude, latitudeDelta, longitudeDelta };
}

export interface ExploreCameraState {
  context: string;
  selectedSlug: string | null;
}

// Camera intent follows user choices, not query completion, marker counts, or
// map zoom. In particular, dismissing a drawer must leave the viewport alone.
export function exploreCameraAction(
  previous: ExploreCameraState | null,
  next: ExploreCameraState,
  hasFilters: boolean,
  hasLocation: boolean,
): 'all' | 'user' | null {
  // A marker tap is a preview, not a request to zoom. Fitting on every tap
  // moved neighboring targets and could replace zones with individual routes.
  if (next.selectedSlug) return null;
  if (previous?.context === next.context) return null;
  return hasFilters || !hasLocation ? 'all' : 'user';
}
