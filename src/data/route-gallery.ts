export interface RouteGalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  credit?: string;
  takenLabel?: string;
}

const approvedRoutePhotosBySlug: Record<string, RouteGalleryPhoto[]> = {
  'st-croix-river-fox-highway-70': [
    {
      id: 'st-croix-vantage',
      src: '/gallery/st-croix-river-fox-highway-70/vantage.jpg',
      alt: 'A bright slash of river cleaves two dark sides of a gorge from upper right to lower left. The cliff tops are dense with trees, whose tops are distinct against the sky above while their reflection obscures the water below. The silhouette of one pine tree on the right side is framed by bright river water.',
      caption: 'Deep gorge view on the St. Croix',
      credit: 'NPS / Pete Wintersteen',
      takenLabel: 'NPS asset: public domain',
    },
    {
      id: 'st-croix-bluffs-with-branches',
      src: '/gallery/st-croix-river-fox-highway-70/bluffs-with-branches.jpg',
      alt: 'A view unique to the wintertime, as much of what is in the frame would otherwise be obscured by leaves. Central to the composition is the St. Croix River, crossed in the center of the frame by a bridge. The sense of the height from which the photograph was taken is enhanced by a section of undercut cliff in the lower right side.',
      caption: 'Bluff-country St. Croix with bridge crossing',
      credit: 'NPS / Pete Wintersteen',
      takenLabel: 'NPS asset: public domain',
    },
    {
      id: 'st-croix-lower-lake',
      src: '/gallery/st-croix-river-fox-highway-70/lower-lake.jpg',
      alt: 'Emerging on the right side of the composition, the calm reflective river passes under trees on the opposite side of the bank and then bends away from the viewer on the left side, and once more to the left and disappears out of frame. Animal tracks can be seen in snow along the riverbank.',
      caption: 'Quiet bend on the St. Croix',
      credit: 'NPS / Pete Wintersteen',
      takenLabel: 'NPS asset: public domain',
    },
  ],
  'namekagon-river-big-bend-trego': [
    {
      id: 'namekagon-mirror',
      src: '/gallery/namekagon-river-big-bend-trego/namekagon-mirror.jpg',
      alt: 'Trees on both sides of a river reach skyward towards bright puffy clouds on an idyllic day. A strong horizontal line divides the image at the center, over which the upper portion is reflected like mirror on calm water below.',
      caption: 'Calm mirrored stretch on the Namekagon',
      credit: 'NPS Photo / Pete Wintersteen',
      takenLabel: 'NPS asset: public domain',
    },
  ],
  'mississippi-river-east-river-flats-hidden-falls': [
    {
      id: 'mississippi-minneapolis-skyline',
      src: '/gallery/mississippi-river-east-river-flats-hidden-falls/minneapolis-skyline.jpg',
      alt: 'The Mississippi River curves through a wooded gorge with the Minneapolis skyline visible in the distance and a rail bridge crossing the river.',
      caption: 'Mississippi gorge view toward downtown Minneapolis',
      credit: 'Tom Koerner/USFWS',
      takenLabel: 'USFWS asset: public domain',
    },
  ],
  'minnesota-river-henderson-belle-plaine': [
    {
      id: 'minnesota-river-valley-refuge',
      src: '/gallery/minnesota-river-henderson-belle-plaine/minnesota-valley-refuge.jpg',
      alt: 'Brown marsh grasses and calm water fill a broad river-edge wetland below a wooded bluff.',
      caption: 'Lower Minnesota River valley wetland scene',
      credit: 'Debbie Koenigs/USFWS',
      takenLabel: 'USFWS asset: public domain',
    },
  ],
};

export function getApprovedRoutePhotos(slug: string): RouteGalleryPhoto[] {
  return [...(approvedRoutePhotosBySlug[slug] ?? [])];
}
