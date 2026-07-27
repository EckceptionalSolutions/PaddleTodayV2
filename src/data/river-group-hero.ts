import { getDedicatedRiverGroupHeroPhoto } from './river-group-hero-photos';
import { getApprovedRoutePhotos } from './route-gallery';
import type { RiverGroupHeroPhoto } from '@paddletoday/api-contract';
export type { RiverGroupHeroPhoto } from '@paddletoday/api-contract';

interface RiverGroupHeroRoute {
  slug: string;
}

export function getRiverGroupHeroPhoto(
  riverId: string,
  routes: RiverGroupHeroRoute[] = []
): RiverGroupHeroPhoto | null {
  const dedicatedPhoto = getDedicatedRiverGroupHeroPhoto(riverId);
  if (dedicatedPhoto) {
    return dedicatedPhoto;
  }

  for (const route of routes) {
    const photo = getApprovedRoutePhotos(route.slug)[0];
    if (!photo) {
      continue;
    }

    return {
      src: photo.src,
      alt: photo.alt,
      caption: photo.caption,
      credit: photo.credit ?? 'Paddle Today community',
      licenseLabel: photo.takenLabel ?? 'Approved route photography',
    };
  }

  return null;
}
