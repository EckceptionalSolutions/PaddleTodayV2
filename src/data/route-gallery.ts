export interface RouteGalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  credit?: string;
  takenLabel?: string;
}

const approvedRoutePhotosBySlug: Record<string, RouteGalleryPhoto[]> = {
  // Intentionally empty for now. Add approved route photos here once rights are cleared.
};

export function getApprovedRoutePhotos(slug: string): RouteGalleryPhoto[] {
  return [...(approvedRoutePhotosBySlug[slug] ?? [])];
}
