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
