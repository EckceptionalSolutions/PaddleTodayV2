export interface RouteGalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  credit?: string;
  takenLabel?: string;
}

const approvedRoutePhotosBySlug: Record<string, RouteGalleryPhoto[]> = {
  'big-fork-river-highway-6-south-north': [
    {
      id: 'big-fork-boat-launch-commons',
      src: '/gallery/big-fork-river-highway-6-south-north/big-fork-boat-launch.jpg',
      alt: 'A grassy Big Fork River boat launch slopes down toward a narrow river channel under a bright summer sky.',
      caption: 'Big Fork River boat launch in Bigfork',
      credit: 'Tony Webster via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'red-lake-river-smiley-bridge-centennial-park': [
    {
      id: 'red-lake-river-red-lake-falls-kiddle',
      src: '/gallery/red-lake-river-smiley-bridge-centennial-park/red-lake-river-red-lake-falls.jpg',
      alt: 'The Red Lake River reflects a railroad bridge, green banks, and cloudy sky in calm water.',
      caption: 'Red Lake River at Red Lake Falls',
      credit: 'Chitrapa / Peter Rimar via Kiddle',
      takenLabel: 'Kiddle image: CC BY-SA 4.0',
    },
  ],
  'sauk-river-spring-hill-st-martin': [
    {
      id: 'sauk-river-sartell-commons',
      src: '/gallery/sauk-river-spring-hill-st-martin/sauk-river-sartell.jpg',
      alt: 'The Sauk River winds through a wooded winter corridor with ice along the banks and bright clouds overhead.',
      caption: 'Sauk River near Sartell',
      credit: 'Tony Webster via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'cottonwood-river-juenemann-springfield': [
    {
      id: 'cottonwood-river-flandrau-commons',
      src: '/gallery/cottonwood-river-juenemann-springfield/cottonwood-river-flandrau.jpg',
      alt: 'The Cottonwood River bends through Flandrau State Park with green wooded banks and a partly cloudy sky.',
      caption: 'Cottonwood River at Flandrau State Park',
      credit: 'Tony Webster via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'minnesota-river-thompson-ferry-carver': [
    {
      id: 'carver-rapids-usfws',
      src: '/gallery/minnesota-river-thompson-ferry-carver/carver-rapids.jpg',
      alt: 'Autumn leaves hang above the Minnesota River at Carver Rapids, with shallow current moving past wooded banks.',
      caption: 'Carver Rapids on the Minnesota River',
      credit: 'Mara Koenig/USFWS via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'north-fork-crow-river-rockford-riverside': [
    {
      id: 'crow-river-rockford-commons',
      src: '/gallery/north-fork-crow-river-rockford-riverside/crow-river-rockford.jpg',
      alt: 'The Crow River flows under a railroad bridge in Rockford, Minnesota, with people sitting near the water at the landing.',
      caption: 'Crow River at Rockford',
      credit: 'Jerry Huddleston via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'south-fork-crow-river-rick-johnson-lake-rebecca': [
    {
      id: 'south-fork-crow-river-commons',
      src: '/gallery/south-fork-crow-river-rick-johnson-lake-rebecca/south-fork-crow-river.jpg',
      alt: 'The South Fork Crow River flows through a grassy rural corridor with trees along the far bank.',
      caption: 'South Fork Crow River near Cosmos',
      credit: 'Tim Kiser via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.5',
    },
  ],
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
  'rice-creek-peltier-to-long-lake': [
    {
      id: 'rice-creek-user-photo-1',
      src: '/gallery/rice-creek-peltier-to-long-lake/rice-creek-1.jpg',
      alt: 'Rice Creek flowing under bright sun with sparkling water, grassy banks, and early spring trees along the channel.',
      caption: 'Open bend on Rice Creek',
      credit: 'Photo by user',
      takenLabel: 'Taken today',
    },
    {
      id: 'rice-creek-user-photo-2',
      src: '/gallery/rice-creek-peltier-to-long-lake/rice-creek-2.jpg',
      alt: 'Rice Creek from kayak level with calm current, grassy banks, and leafless trees arching over the water.',
      caption: 'Kayak-level view on Rice Creek',
      credit: 'Photo by user',
      takenLabel: 'Taken today',
    },
  ],
  'minnehaha-creek-grays-bay-longfellow-lagoon': [
    {
      id: 'minnehaha-creek-commons-2017',
      src: '/gallery/minnehaha-creek-grays-bay-longfellow-lagoon/minnehaha-creek-oct-2017.jpg',
      alt: 'Minnehaha Creek flows through a wooded Minneapolis park corridor with autumn leaves along the banks.',
      caption: 'Autumn flow on Minnehaha Creek',
      credit: 'Thomson200 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC0',
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
  'kettle-river-lower-kettle-5-to-6': [
    {
      id: 'kettle-banning-commons',
      src: '/gallery/kettle-river-lower-kettle-5-to-6/kettle-banning-state-park.jpg',
      alt: 'The Kettle River winds through Banning State Park with evergreen trees and rocky banks along the channel.',
      caption: 'Kettle River at Banning State Park',
      credit: 'Tony Webster via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
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
  'mississippi-river-hidden-falls-harriet-island': [
    {
      id: 'hidden-falls-st-paul-commons',
      src: '/gallery/mississippi-river-hidden-falls-harriet-island/hidden-falls-st-paul.jpg',
      alt: 'An aerial view of the Mississippi River shoreline at Hidden Falls in Saint Paul, with a sandy bank, riverside trail, trees, and power lines.',
      caption: 'Mississippi River shoreline at Hidden Falls',
      credit: 'Gabriel Vanslette via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 3.0',
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
  'kickapoo-river-ontario-rockton': [
    {
      id: 'kickapoo-river-valley-commons',
      src: '/gallery/kickapoo-river-ontario-rockton/kickapoo-river-valley.jpg',
      alt: 'The Kickapoo River valley stretches below wooded hills at sunset in the Driftless Area.',
      caption: 'Kickapoo River valley near Wildcat Mountain',
      credit: 'Yinan Chen via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'wisconsin-river-muscoda-blue-river': [
    {
      id: 'wisconsin-river-muscoda-nara',
      src: '/gallery/wisconsin-river-muscoda-blue-river/wisconsin-river-muscoda-nara.jpg',
      alt: 'Canoes and paddlers reach Muscoda on the Wisconsin River during a 1973 historical river trip.',
      caption: 'Wisconsin River at Muscoda',
      credit: 'Ted Rozumalski / NARA via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'milwaukee-river-newburg-fredonia': [
    {
      id: 'milwaukee-river-january-2026-commons',
      src: '/gallery/milwaukee-river-newburg-fredonia/milwaukee-river-january-2026.jpg',
      alt: 'The Milwaukee River flows through an urban winter corridor with snowy banks and bare trees.',
      caption: 'Winter view of the Milwaukee River',
      credit: 'Michael Barera via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'kinnickinnic-river-glen-park-state-park': [
    {
      id: 'kinnickinnic-winter-sunset-commons',
      src: '/gallery/kinnickinnic-river-glen-park-state-park/kinnickinnic-winter-sunset.jpg',
      alt: 'A winter sunset glows over the Kinnickinnic River where it meets the St. Croix River near Kinnickinnic State Park.',
      caption: 'Kinnickinnic River at Kinnickinnic State Park',
      credit: 'Tony Webster via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'wisconsin-river-sauk-city-arena': [
    {
      id: 'wisconsin-river-ferry-bluff-commons',
      src: '/gallery/wisconsin-river-sauk-city-arena/wisconsin-river-ferry-bluff.jpg',
      alt: 'The Wisconsin River winds through a wide sandy valley below Ferry Bluff near Sauk City.',
      caption: 'Wisconsin River from Ferry Bluff near Sauk City',
      credit: 'Gripper via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'wisconsin-river-blue-river-boscobel': [
    {
      id: 'wisconsin-river-boscobel-bridge-commons',
      src: '/gallery/wisconsin-river-blue-river-boscobel/wisconsin-river-boscobel-bridge.jpg',
      alt: 'The Wisconsin River flows north of Boscobel with the U.S. 61 bridge crossing the channel.',
      caption: 'Wisconsin River north of Boscobel',
      credit: 'Wikideas1 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC0',
    },
  ],
  'wisconsin-river-boscobel-bridgeport': [
    {
      id: 'bridgeport-bridge-wisconsin-river-commons',
      src: '/gallery/wisconsin-river-boscobel-bridgeport/bridgeport-bridge-wisconsin-river.jpg',
      alt: 'The Bridgeport bridge crosses the broad lower Wisconsin River near its final miles before the Mississippi.',
      caption: 'Bridgeport bridge over the Wisconsin River',
      credit: 'Wikideas1 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC0',
    },
  ],
};

export function getApprovedRoutePhotos(slug: string): RouteGalleryPhoto[] {
  return [...(approvedRoutePhotosBySlug[slug] ?? [])];
}
