export interface RouteGalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  credit?: string;
  takenLabel?: string;
}

const approvedRoutePhotosBySlug: Record<string, RouteGalleryPhoto[]> = {
  'blue-earth-river-rapidan-county-road-90': [
    {
      id: 'blue-earth-mankato-commons',
      src: '/gallery/blue-earth-river-rapidan-county-road-90/blue-earth-mankato.jpg',
      alt: 'The Blue Earth River runs through a wooded Mankato-area valley under a bright sky.',
      caption: 'Blue Earth River in the Mankato area',
      credit: 'Tony Webster via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'minnesota-river-judson-land-of-memories': [
    {
      id: 'land-of-memories-park-commons',
      src: '/gallery/minnesota-river-judson-land-of-memories/land-of-memories-park.jpg',
      alt: 'A winter view of Land of Memories Park in Mankato with the broad river corridor and snow-covered trees.',
      caption: 'Land of Memories Park on the Minnesota River',
      credit: 'Tony Webster via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'cannon-river-welch': [
    {
      id: 'cannon-welch-commons',
      src: '/gallery/cannon-river-welch/cannon-welch.jpg',
      alt: 'The Cannon River flows through Welch Township in spring with wooded banks and a broad current.',
      caption: 'Spring flow on the Cannon at Welch',
      credit: 'Iulus Ascanius via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'cannon-river-faribault-dundas': [
    {
      id: 'cannon-northfield-dpla',
      src: '/gallery/cannon-river-faribault-dundas/cannon-northfield.jpg',
      alt: 'A historic view of the Cannon River near Northfield, Minnesota, with the river channel and wooded banks visible.',
      caption: 'Historic Cannon River view near Northfield',
      credit: 'Carleton College via DPLA/Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'root-river-lanesboro-peterson': [
    {
      id: 'root-peterson-nara',
      src: '/gallery/root-river-lanesboro-peterson/root-near-peterson.jpg',
      alt: 'The Root River winds through bluff country near Peterson with wooded slopes rising above the water.',
      caption: 'Root River near Peterson',
      credit: 'U.S. National Archives and Records Administration via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'root-river-rushford-houston': [
    {
      id: 'root-houston-commons',
      src: '/gallery/root-river-rushford-houston/root-river-houston.jpg',
      alt: 'The Root River near Houston reflects bright clouds with trees lining both sides of the channel.',
      caption: 'Root River by Houston',
      credit: 'Wikideas1 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC0',
    },
  ],
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
