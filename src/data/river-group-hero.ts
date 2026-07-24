import { getApprovedRoutePhotos } from './route-gallery';
import type { RiverGroupHeroPhoto } from '@paddletoday/api-contract';
export type { RiverGroupHeroPhoto } from '@paddletoday/api-contract';

interface RiverGroupHeroRoute {
  slug: string;
}

const dedicatedRiverGroupHeroPhotos: Record<string, RiverGroupHeroPhoto> = {
  'barren-river': {
    src: '/gallery/river-groups/barren-river/barren-river-bowling-green-bridges.webp',
    alt: 'The Barren River passes beneath road and railroad bridges in Bowling Green, Kentucky.',
    caption: 'Barren River in Bowling Green',
    credit: 'Nyttend',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Barren_River_L%26N_Bridge_with_road_bridge.jpg',
    licenseLabel: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    width: 1600,
    height: 1100,
  },
  'bayou-deview': {
    src: '/gallery/river-groups/bayou-deview/bayou-deview-cache-refuge.webp',
    alt: 'Bayou DeView winds through a flooded bottomland forest in the Cache River National Wildlife Refuge, Arkansas.',
    caption: 'Bayou DeView in Cache River National Wildlife Refuge',
    credit: 'U.S. Fish and Wildlife Service',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bayou_DeView_Arkansas_in_the_Cache_River_National_Wildlife_Refuge.jpg',
    licenseLabel: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    width: 1600,
    height: 1100,
  },
  'cedar-river': {
    src: '/gallery/river-groups/cedar-river/cedar-river-george-wyth.webp',
    alt: 'The Cedar River curves past wooded banks beneath a dramatic sky in George Wyth Memorial State Park, Iowa.',
    caption: 'Cedar River at George Wyth Memorial State Park',
    credit: 'TheCatalyst31',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cedar_River_in_George_Wyth_Memorial_State_Park.jpg',
    licenseLabel: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    width: 1600,
    height: 1100,
  },
  'crow-wing-river': {
    src: '/gallery/river-groups/crow-wing-river/crow-wing-river-oylen.webp',
    alt: 'The Crow Wing River curves between forested banks near Oylen, Minnesota.',
    caption: 'Crow Wing River near Oylen',
    credit: 'Tony Webster',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Crow_Wing_River_-_Oylen,_Minnesota_(42635061375).jpg',
    licenseLabel: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    width: 1600,
    height: 1100,
  },
  'green-river-kentucky': {
    src: '/gallery/river-groups/green-river-kentucky/green-river-mammoth-cave.webp',
    alt: 'Morning mist and sunlight hang over the wooded Green River near Mammoth Cave National Park, Kentucky.',
    caption: 'Green River near Mammoth Cave National Park',
    credit: 'code poet',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Green_River_Kentucky_Mammoth_Cave02.jpg',
    licenseLabel: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    width: 1600,
    height: 1100,
  },
  'north-raccoon-river': {
    src: '/gallery/river-groups/north-raccoon-river/north-raccoon-lake-city-bridge.webp',
    alt: 'A historic concrete arch bridge spans the North Raccoon River at Lake City, Iowa.',
    caption: 'North Raccoon River at Lake City',
    credit: 'Historic American Engineering Record',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:3-4_VIEW_FROM_SOUTHWEST_-_Lake_City_Bridge,_Spanning_North_Raccoon_River,_Lake_City,_Calhoun_County,_IA_HAER_IOWA,13-LACIT.V,1-2.tif',
    licenseLabel: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    width: 1600,
    height: 1100,
  },
  'rum-river': {
    src: '/gallery/river-groups/rum-river/rum-river-princeton.webp',
    alt: 'The Rum River reflects a green canopy as it passes Riverside Park in Princeton, Minnesota.',
    caption: 'Rum River in Princeton',
    credit: 'Tony Webster',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Rum_River_in_Princeton,_Minnesota_(29572111696).jpg',
    licenseLabel: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    width: 1600,
    height: 1100,
  },
  'st-louis-river': {
    src: '/gallery/river-groups/st-louis-river/st-louis-river-jay-cooke.webp',
    alt: 'The rocky St. Louis River spreads across a broad valley surrounded by fall foliage in Jay Cooke State Park, Minnesota.',
    caption: 'St. Louis River in Jay Cooke State Park',
    credit: 'Lorie Shaull',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:The_St._Louis_River_and_fall_foliage_in_Jay_Cooke_State_Park,_Minnesota.jpg',
    licenseLabel: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    width: 1600,
    height: 1100,
  },
  'upper-cumberland-river': {
    src: '/gallery/river-groups/upper-cumberland-river/cumberland-river-loyall.webp',
    alt: 'The Cumberland River follows a green valley through Loyall in eastern Kentucky beneath a bright summer sky.',
    caption: 'Cumberland River at Loyall',
    credit: 'Brian Stansberry',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Loyall-Cumberland-River-ky.jpg',
    licenseLabel: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    width: 1600,
    height: 1100,
  },
  'wapsipinicon-river': {
    src: '/gallery/river-groups/wapsipinicon-river/wapsipinicon-independence.webp',
    alt: 'The Wapsipinicon River flows past a tree-lined bank in Independence, Iowa.',
    caption: 'Wapsipinicon River in Independence',
    credit: 'James C. Orvis',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Wapsipinicon_River_viewed_from_the_Okoboji_Grill,_Independence,_Buchanan_County,_Iowa_Sunday,_August_25,_2013_3.JPG',
    licenseLabel: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    width: 1600,
    height: 1100,
  },
  'yellow-breeches-creek': {
    src: '/gallery/river-groups/yellow-breeches-creek/yellow-breeches-boiling-springs.webp',
    alt: 'An angler stands in the clear, shaded water of Yellow Breeches Creek at Boiling Springs, Pennsylvania.',
    caption: 'Yellow Breeches Creek at Boiling Springs',
    credit: 'Staecker',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Yellow_breeches_fishing.jpg',
    licenseLabel: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    width: 1600,
    height: 1100,
  },
};

export function getRiverGroupHeroPhoto(
  riverId: string,
  routes: RiverGroupHeroRoute[] = []
): RiverGroupHeroPhoto | null {
  const dedicatedPhoto = dedicatedRiverGroupHeroPhotos[riverId];
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
