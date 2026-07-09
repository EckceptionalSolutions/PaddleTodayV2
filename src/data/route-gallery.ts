export interface RouteGalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  credit?: string;
  takenLabel?: string;
}

export interface RoutePreviewPhoto extends RouteGalleryPhoto {
  isPlaceholder: boolean;
}

interface RoutePhotoTarget {
  riverId?: string;
  slug: string;
  name?: string;
  reach?: string;
}

const placeholderRoutePhotos: RouteGalleryPhoto[] = [
  {
    id: 'river-fallback-stream',
    src: '/gallery/fallbacks/river-fallback-stream.jpg',
    alt: 'A representative river scene used as a placeholder until a route photo is available.',
    caption: 'Representative river scene',
  },
  {
    id: 'river-fallback-wide',
    src: '/gallery/fallbacks/river-fallback-wide.jpg',
    alt: 'A representative wide river scene used as a placeholder until a route photo is available.',
    caption: 'Representative river scene',
  },
];

const approvedRoutePhotosBySlug: Record<string, RouteGalleryPhoto[]> = {
  'des-moines-river-bentonsport-bonaparte': [
    {
      id: 'des-moines-river-bonaparte-commons',
      src: '/gallery/des-moines-river-bentonsport-bonaparte/des-moines-river-bonaparte.jpg',
      alt: 'The Des Moines River flows past Bonaparte riverfront buildings and the old lock structure under a bright sky.',
      caption: 'Des Moines River at Bonaparte',
      credit: 'Chris Light via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'south-skunk-river-lekwa-sopers-mill': [
    {
      id: 'skunk-river-iowa-commons',
      src: '/gallery/south-skunk-river-lekwa-sopers-mill/skunk-river-iowa.jpg',
      alt: 'The Skunk River flows between wooded banks with exposed roots and late-season leaves along the water.',
      caption: 'Skunk River corridor in Iowa',
      credit: 'Ken Lund via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'south-skunk-river-sleepy-hollow-river-valley': [
    {
      id: 'skunk-river-iowa-commons',
      src: '/gallery/south-skunk-river-sleepy-hollow-river-valley/skunk-river-iowa.jpg',
      alt: 'The Skunk River flows between wooded banks with exposed roots and late-season leaves along the water.',
      caption: 'Skunk River corridor in Iowa',
      credit: 'Ken Lund via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'south-skunk-river-sopers-mill-peterson-park': [
    {
      id: 'skunk-river-iowa-commons',
      src: '/gallery/south-skunk-river-sopers-mill-peterson-park/skunk-river-iowa.jpg',
      alt: 'The Skunk River flows between wooded banks with exposed roots and late-season leaves along the water.',
      caption: 'Skunk River corridor in Iowa',
      credit: 'Ken Lund via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'south-skunk-river-ames-13th-street': [
    {
      id: 'skunk-river-iowa-commons',
      src: '/gallery/south-skunk-river-ames-13th-street/skunk-river-iowa.jpg',
      alt: 'The Skunk River flows between wooded banks with exposed roots and late-season leaves along the water.',
      caption: 'Skunk River corridor in Iowa',
      credit: 'Ken Lund via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'middle-river-forest-park-schildberg': [
    {
      id: 'middle-river-iowa-upstream-commons',
      src: '/gallery/middle-river-forest-park-schildberg/middle-river-iowa-upstream.jpg',
      alt: 'The Middle River runs between wooded banks with a low gravel bar and overhanging trees.',
      caption: 'Middle River in Iowa',
      credit: 'Tim Kiser via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.5',
    },
  ],
  'middle-river-schildberg-roseman': [
    {
      id: 'middle-river-iowa-upstream-commons',
      src: '/gallery/middle-river-schildberg-roseman/middle-river-iowa-upstream.jpg',
      alt: 'The Middle River runs between wooded banks with a low gravel bar and overhanging trees.',
      caption: 'Middle River in Iowa',
      credit: 'Tim Kiser via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.5',
    },
  ],
  'upper-iowa-river-kendallville-bluffton': [
    {
      id: 'upper-iowa-river-new-albin-commons',
      src: '/gallery/upper-iowa-river-kendallville-bluffton/upper-iowa-river-new-albin.jpg',
      alt: 'An aerial view looks down at the Upper Iowa River winding between wooded bluffs and farm fields.',
      caption: 'Upper Iowa River bluff-country corridor',
      credit: 'Wikideas1 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC0',
    },
  ],
  'upper-iowa-river-chimney-rock-malanaphy': [
    {
      id: 'upper-iowa-river-new-albin-commons',
      src: '/gallery/upper-iowa-river-chimney-rock-malanaphy/upper-iowa-river-new-albin.jpg',
      alt: 'An aerial view looks down at the Upper Iowa River winding between wooded bluffs and farm fields.',
      caption: 'Upper Iowa River bluff-country corridor',
      credit: 'Wikideas1 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC0',
    },
  ],
  'upper-iowa-river-malanaphy-trout-run': [
    {
      id: 'upper-iowa-river-new-albin-commons',
      src: '/gallery/upper-iowa-river-malanaphy-trout-run/upper-iowa-river-new-albin.jpg',
      alt: 'An aerial view looks down at the Upper Iowa River winding between wooded bluffs and farm fields.',
      caption: 'Upper Iowa River bluff-country corridor',
      credit: 'Wikideas1 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC0',
    },
  ],
  'maquoketa-river-mon-maq-pictured-rocks': [
    {
      id: 'maquoketa-river-usgs',
      src: '/gallery/maquoketa-river-mon-maq-pictured-rocks/maquoketa-river-usgs.jpg',
      alt: 'A person fishes from a rock in the Maquoketa River, with wooded banks and a shallow rocky channel around them.',
      caption: 'Maquoketa River in Iowa',
      credit: 'Mara Koenig/USFWS via USGS',
      takenLabel: 'USGS asset: public domain',
    },
  ],
  'turkey-river-big-spring-elkader': [
    {
      id: 'elkader-keystone-bridge-loc',
      src: '/gallery/turkey-river-big-spring-elkader/elkader-keystone-bridge.jpg',
      alt: 'Elkader Keystone Bridge crosses the Turkey River with stone arches, town buildings, and riverbank trees in view.',
      caption: 'Turkey River at Elkader Keystone Bridge',
      credit: 'HAER via Library of Congress',
      takenLabel: 'Library of Congress: no known restrictions',
    },
  ],
  'boone-river-riverside-albright': [
    {
      id: 'boone-river-iowa-commons',
      src: '/gallery/boone-river-riverside-albright/boone-river-iowa.jpg',
      alt: 'The Boone River bends below a wooded bank near Albright canoe access in Hamilton County, Iowa.',
      caption: 'Boone River near Albright canoe access',
      credit: 'Tim Kiser via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.5',
    },
  ],
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
  'little-fork-river-dentaybow-fiedler': [
    {
      id: 'little-fork-river-cook-rapids-dpla',
      src: '/gallery/little-fork-river-dentaybow-fiedler/little-fork-river-cook-rapids.jpg',
      alt: 'The Little Fork River tumbles through a rocky rapid below tree-lined banks near Cook, Minnesota.',
      caption: 'Little Fork River below the rapids near Cook',
      credit: 'Minnesota State University Moorhead via DPLA/Wikimedia Commons',
      takenLabel: 'Public domain',
    },
  ],
  'little-fork-river-dentaybow-devereaux': [
    {
      id: 'little-fork-river-cook-rapids-dpla',
      src: '/gallery/little-fork-river-dentaybow-fiedler/little-fork-river-cook-rapids.jpg',
      alt: 'The Little Fork River tumbles through a rocky rapid below tree-lined banks near Cook, Minnesota.',
      caption: 'Little Fork River below the rapids near Cook',
      credit: 'Minnesota State University Moorhead via DPLA/Wikimedia Commons',
      takenLabel: 'Public domain',
    },
  ],
  'little-fork-river-highway-73-samuelson': [
    {
      id: 'little-fork-river-cook-rapids-dpla',
      src: '/gallery/little-fork-river-dentaybow-fiedler/little-fork-river-cook-rapids.jpg',
      alt: 'The Little Fork River tumbles through a rocky rapid below tree-lined banks near Cook, Minnesota.',
      caption: 'Little Fork River below the rapids near Cook',
      credit: 'Minnesota State University Moorhead via DPLA/Wikimedia Commons',
      takenLabel: 'Public domain',
    },
  ],
  'little-fork-river-highway-73-silverdale': [
    {
      id: 'little-fork-river-cook-rapids-dpla',
      src: '/gallery/little-fork-river-dentaybow-fiedler/little-fork-river-cook-rapids.jpg',
      alt: 'The Little Fork River tumbles through a rocky rapid below tree-lined banks near Cook, Minnesota.',
      caption: 'Little Fork River below the rapids near Cook',
      credit: 'Minnesota State University Moorhead via DPLA/Wikimedia Commons',
      takenLabel: 'Public domain',
    },
  ],
  'little-beaver-creek-pioneer-village-sprucevale': [
    {
      id: 'little-beaver-creek-ohio-river-water-trail-commons',
      src: '/gallery/little-beaver-creek-pioneer-village-sprucevale/little-beaver-creek-ohio-river-water-trail.jpg',
      alt: 'Kayakers paddle the Little Beaver Creek corridor near Ohioville with wooded banks and gentle current under a bright sky.',
      caption: 'Little Beaver Creek corridor near Ohioville',
      credit: 'Dr. Vincent Troia via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'little-beaver-creek-sprucevale-lock-57-park': [
    {
      id: 'little-beaver-creek-ohio-river-water-trail-commons',
      src: '/gallery/little-beaver-creek-pioneer-village-sprucevale/little-beaver-creek-ohio-river-water-trail.jpg',
      alt: 'Kayakers paddle the Little Beaver Creek corridor near Ohioville with wooded banks and gentle current under a bright sky.',
      caption: 'Little Beaver Creek corridor near Ohioville',
      credit: 'Dr. Vincent Troia via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'little-beaver-creek-pioneer-village-lock-57-park': [
    {
      id: 'little-beaver-creek-ohio-river-water-trail-commons',
      src: '/gallery/little-beaver-creek-pioneer-village-sprucevale/little-beaver-creek-ohio-river-water-trail.jpg',
      alt: 'Kayakers paddle the Little Beaver Creek corridor near Ohioville with wooded banks and gentle current under a bright sky.',
      caption: 'Little Beaver Creek corridor near Ohioville',
      credit: 'Dr. Vincent Troia via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
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
  'red-lake-river-sportsmans-huot': [
    {
      id: 'red-lake-river-red-lake-falls-kiddle',
      src: '/gallery/red-lake-river-sportsmans-huot/red-lake-river-red-lake-falls.jpg',
      alt: 'The Red Lake River reflects a railroad bridge, green banks, and cloudy sky in calm water.',
      caption: 'Red Lake River at Red Lake Falls',
      credit: 'Chitrapa / Peter Rimar via Kiddle',
      takenLabel: 'Kiddle image: CC BY-SA 4.0',
    },
  ],
  'chippewa-river-lentz-watson-lions-park': [
    {
      id: 'chippewa-river-commons',
      src: '/gallery/chippewa-river-lentz-watson-lions-park/chippewa-river.jpg',
      alt: 'The Chippewa River winds through a broad grassy corridor under a bright sky.',
      caption: 'Chippewa River in Minnesota',
      credit: 'Wikideas1 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC0',
    },
  ],
  'juniata-river-granville-mifflin': [
    {
      id: 'juniata-river-lewistown-commons',
      src: '/gallery/juniata-river-granville-victory-park/juniata-river-lewistown.jpg',
      alt: 'The Juniata River flows west of the Pennsylvania Route 103 bridge in Lewistown under a bright early-summer sky.',
      caption: 'Juniata River west of PA 103 in Lewistown',
      credit: 'Dough4872 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
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
  'mississippi-river-norin-babcock': [
    {
      id: 'mississippi-norin-landing-user-1',
      src: '/gallery/mississippi-river-norin-babcock/norin-landing-1.jpg',
      alt: 'A rocky Mississippi River landing at Norin with canoes pulled up beside the launch and wooded banks across the channel.',
      caption: 'Norin Landing on the Mississippi',
      credit: 'Photo by user',
      takenLabel: 'Taken today',
    },
    {
      id: 'mississippi-norin-landing-user-2',
      src: '/gallery/mississippi-river-norin-babcock/norin-landing-2.jpg',
      alt: 'The Mississippi River flows past a shallow gravel shore at Norin Landing under a clear blue sky.',
      caption: 'Shoreline at Norin Landing',
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
  'upper-iowa-river-cattle-creek-bluffton': [
    {
      id: 'upper-iowa-river-new-albin-commons',
      src: '/gallery/upper-iowa-river-cattle-creek-bluffton/upper-iowa-river-new-albin.jpg',
      alt: 'An aerial view looks down at the Upper Iowa River winding between wooded bluffs and farm fields.',
      caption: 'Upper Iowa River bluff-country corridor',
      credit: 'Wikideas1 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC0',
    },
  ],
  'volga-river-osborne-mederville': [
    {
      id: 'mederville-bridge-volga-river-loc',
      src: '/gallery/volga-river-osborne-mederville/mederville-bridge-volga-river.jpg',
      alt: 'The Mederville Bridge spans the Volga River from a river-edge view, with wooded banks around the crossing.',
      caption: 'Volga River at Mederville Bridge',
      credit: 'Bruce A. Harms / HAER via Library of Congress',
      takenLabel: 'Library of Congress: no known restrictions',
    },
  ],
  'volga-river-mederville-littleport': [
    {
      id: 'mederville-bridge-volga-river-loc',
      src: '/gallery/volga-river-mederville-littleport/mederville-bridge-volga-river.jpg',
      alt: 'The Mederville Bridge spans the Volga River from a river-edge view, with wooded banks around the crossing.',
      caption: 'Volga River at Mederville Bridge',
      credit: 'Bruce A. Harms / HAER via Library of Congress',
      takenLabel: 'Library of Congress: no known restrictions',
    },
  ],
  'turkey-river-elkader-motor-mill': [
    {
      id: 'elkader-keystone-bridge-loc',
      src: '/gallery/turkey-river-elkader-motor-mill/elkader-keystone-bridge.jpg',
      alt: 'Elkader Keystone Bridge crosses the Turkey River with stone arches, town buildings, and riverbank trees in view.',
      caption: 'Turkey River at Elkader Keystone Bridge',
      credit: 'HAER via Library of Congress',
      takenLabel: 'Library of Congress: no known restrictions',
    },
  ],
  'yellow-river-volney-sixteen-bridge': [
    {
      id: 'yellow-river-effigy-mounds-goodfreephotos',
      src: '/gallery/yellow-river-volney-sixteen-bridge/yellow-river-effigy-mounds.jpg',
      alt: 'The Yellow River curves through a wooded valley below a high overlook in northeast Iowa.',
      caption: 'Yellow River in northeast Iowa',
      credit: 'Yinan Chen / GoodFreePhotos via Wikimedia Commons',
      takenLabel: 'Public domain dedication',
    },
  ],
  'yellow-river-sixteen-bridge-highway-76': [
    {
      id: 'yellow-river-effigy-mounds-goodfreephotos',
      src: '/gallery/yellow-river-sixteen-bridge-highway-76/yellow-river-effigy-mounds.jpg',
      alt: 'The Yellow River curves through a wooded valley below a high overlook in northeast Iowa.',
      caption: 'Yellow River near Effigy Mounds',
      credit: 'Yinan Chen / GoodFreePhotos via Wikimedia Commons',
      takenLabel: 'Public domain dedication',
    },
  ],
  'shiawassee-river-byron-brady-street': [
    {
      id: 'shiawassee-river-paddle-commons',
      src: '/gallery/shiawassee-river-byron-walnut-hills/shiawassee-river-paddle.jpg',
      alt: 'A paddler moves through a snowy Shiawassee River corridor near Holly, Michigan.',
      caption: 'Shiawassee River paddle near Holly',
      credit: 'Willi H2O via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'shiawassee-river-mccurdy-cole-park': [
    {
      id: 'shiawassee-river-paddle-commons',
      src: '/gallery/shiawassee-river-mccurdy-harmon-patridge/shiawassee-river-paddle.jpg',
      alt: 'A paddler moves through a snowy Shiawassee River corridor near Holly, Michigan.',
      caption: 'Shiawassee River paddle near Holly',
      credit: 'Willi H2O via Wikimedia Commons',
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
  'grand-river-harpersfield-hidden-valley': [
    {
      id: 'grand-river-harpersfield-covered-bridge-commons',
      src: '/gallery/grand-river-harpersfield-hidden-valley/grand-river-harpersfield-covered-bridge.jpg',
      alt: 'The Harpersfield covered bridge and adjacent road bridge cross the Grand River above low ledges and brown spring water.',
      caption: 'Grand River at Harpersfield Covered Bridge',
      credit: 'Joanna Gilkeson/USFWS via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'vermilion-river-schoepfle-mill-hollow': [
    {
      id: 'vermilion-river-birmingham-commons',
      src: '/gallery/vermilion-river-schoepfle-mill-hollow/vermilion-river-birmingham.jpg',
      alt: 'The Vermilion River bends through dense summer woods at Schoepfle Garden Metropark near Birmingham.',
      caption: 'Vermilion River at Schoepfle Garden Metropark',
      credit: 'Tim Kiser via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.5',
    },
  ],
  'vermilion-river-mill-hollow-vermilion-boat-ramp': [
    {
      id: 'vermilion-river-birmingham-commons',
      src: '/gallery/vermilion-river-schoepfle-mill-hollow/vermilion-river-birmingham.jpg',
      alt: 'The Vermilion River bends through dense summer woods at Schoepfle Garden Metropark near Birmingham.',
      caption: 'Vermilion River corridor near Birmingham',
      credit: 'Tim Kiser via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.5',
    },
  ],
  'la-crosse-river-veterans-holiday-heights': [
    {
      id: 'la-crosse-river-trail-bridge-commons',
      src: '/gallery/la-crosse-river-veterans-holiday-heights/la-crosse-river-trail-bridge.jpg',
      alt: 'An aerial view shows the La Crosse River curving through a green corridor beside rail tracks and a trail bridge.',
      caption: 'La Crosse River trail corridor',
      credit: 'Wikideas1 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC0',
    },
  ],
  'kansas-river-lecompton-lawrence-riverfront': [
    {
      id: 'kansas-river-lawrence-commons',
      src: '/gallery/kansas-river-lecompton-lawrence-riverfront/kansas-river-lawrence.jpg',
      alt: 'An aerial view shows the Kansas River curving past Lawrence with broad sandbars, wooded banks, and city bridges in the distance.',
      caption: 'Kansas River at Lawrence',
      credit: 'Dicklyon via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'kansas-river-lawrence-8th-eudora': [
    {
      id: 'kansas-river-lawrence-commons',
      src: '/gallery/kansas-river-lawrence-8th-eudora/kansas-river-lawrence.jpg',
      alt: 'An aerial view shows the Kansas River curving past Lawrence with broad sandbars, wooded banks, and city bridges in the distance.',
      caption: 'Kansas River at Lawrence',
      credit: 'Dicklyon via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'kansas-river-eudora-de-soto': [
    {
      id: 'kansas-river-lawrence-commons',
      src: '/gallery/kansas-river-eudora-de-soto/kansas-river-lawrence.jpg',
      alt: 'An aerial view shows the Kansas River curving past Lawrence with broad sandbars, wooded banks, and city bridges in the distance.',
      caption: 'Kansas River at Lawrence, upstream of this lower-Kaw route',
      credit: 'Dicklyon via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'kansas-river-de-soto-kaw-point': [
    {
      id: 'kansas-river-kansas-city-commons',
      src: '/gallery/kansas-river-de-soto-edwardsville/kansas-river-kansas-city.jpg',
      alt: 'The Kansas River flows through Kansas City with exposed sand and a low bridge crossing the wide channel.',
      caption: 'Kansas River near Kansas City',
      credit: 'James St. John via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'kansas-river-eudora-turner-bridge': [
    {
      id: 'kansas-river-kansas-city-commons',
      src: '/gallery/kansas-river-de-soto-edwardsville/kansas-river-kansas-city.jpg',
      alt: 'The Kansas River flows through Kansas City with exposed sand and a low bridge crossing the wide channel.',
      caption: 'Kansas River near Kansas City',
      credit: 'James St. John via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'kansas-river-junction-city-ogden': [
    {
      id: 'kansas-river-lawrence-commons',
      src: '/gallery/kansas-river-junction-city-ogden/kansas-river-lawrence.jpg',
      alt: 'An aerial view shows the Kansas River with broad sandbars, wooded banks, and bridges in the distance.',
      caption: 'Kansas River corridor context',
      credit: 'Dicklyon via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'kansas-river-junction-city-manhattan': [
    {
      id: 'kansas-river-lawrence-commons',
      src: '/gallery/kansas-river-junction-city-manhattan/kansas-river-lawrence.jpg',
      alt: 'An aerial view shows the Kansas River with broad sandbars, wooded banks, and bridges in the distance.',
      caption: 'Kansas River corridor context',
      credit: 'Dicklyon via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'kansas-river-junction-city-st-george': [
    {
      id: 'kansas-river-lawrence-commons',
      src: '/gallery/kansas-river-manhattan-st-george/kansas-river-lawrence.jpg',
      alt: 'An aerial view shows the Kansas River with broad sandbars, wooded banks, and bridges in the distance.',
      caption: 'Kansas River corridor context',
      credit: 'Dicklyon via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'kansas-river-ogden-manhattan': [
    {
      id: 'kansas-river-lawrence-commons',
      src: '/gallery/kansas-river-ogden-manhattan/kansas-river-lawrence.jpg',
      alt: 'An aerial view shows the Kansas River with broad sandbars, wooded banks, and bridges in the distance.',
      caption: 'Kansas River corridor context',
      credit: 'Dicklyon via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'kansas-river-ogden-st-george': [
    {
      id: 'kansas-river-lawrence-commons',
      src: '/gallery/kansas-river-ogden-st-george/kansas-river-lawrence.jpg',
      alt: 'An aerial view shows the Kansas River with broad sandbars, wooded banks, and bridges in the distance.',
      caption: 'Kansas River corridor context',
      credit: 'Dicklyon via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'kansas-river-ogden-wamego': [
    {
      id: 'kansas-river-lawrence-commons',
      src: '/gallery/kansas-river-manhattan-st-george/kansas-river-lawrence.jpg',
      alt: 'An aerial view shows the Kansas River with broad sandbars, wooded banks, and bridges in the distance.',
      caption: 'Kansas River corridor context',
      credit: 'Dicklyon via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'kansas-river-manhattan-belvue': [
    {
      id: 'kansas-river-lawrence-commons',
      src: '/gallery/kansas-river-manhattan-st-george/kansas-river-lawrence.jpg',
      alt: 'An aerial view shows the Kansas River with broad sandbars, wooded banks, and bridges in the distance.',
      caption: 'Kansas River corridor context',
      credit: 'Dicklyon via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'kansas-river-blue-river-belvue': [
    {
      id: 'kansas-river-lawrence-commons',
      src: '/gallery/kansas-river-manhattan-st-george/kansas-river-lawrence.jpg',
      alt: 'An aerial view shows the Kansas River with broad sandbars, wooded banks, and bridges in the distance.',
      caption: 'Kansas River corridor context',
      credit: 'Dicklyon via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'kansas-river-belvue-kaw-river-state-park': [
    {
      id: 'kansas-river-lawrence-commons',
      src: '/gallery/kansas-river-belvue-kaw-river-state-park/kansas-river-lawrence.jpg',
      alt: 'An aerial view shows the Kansas River with broad sandbars, wooded banks, and bridges in the distance.',
      caption: 'Kansas River corridor context',
      credit: 'Dicklyon via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'kansas-river-topeka-water-plant-seward': [
    {
      id: 'kansas-river-lawrence-commons',
      src: '/gallery/kansas-river-topeka-water-plant-seward/kansas-river-lawrence.jpg',
      alt: 'An aerial view shows the Kansas River with broad sandbars, wooded banks, and bridges in the distance.',
      caption: 'Kansas River corridor context',
      credit: 'Dicklyon via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'current-river-cedar-grove-akers': [
    {
      id: 'current-river-welch-spring-commons',
      src: '/gallery/current-river-cedar-grove-akers/current-river-welch-spring.jpg',
      alt: 'The clear Current River flows below wooded Ozark hills between Welch Spring and Akers Ferry.',
      caption: 'Current River between Welch Spring and Akers Ferry',
      credit: 'Kbh3rd via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'current-river-akers-ferry-pulltite': [
    {
      id: 'current-river-welch-spring-commons',
      src: '/gallery/current-river-akers-ferry-pulltite/current-river-welch-spring.jpg',
      alt: 'The clear Current River flows below wooded Ozark hills with gravel bars along the channel.',
      caption: 'Upper Current River corridor near Welch Spring',
      credit: 'Kbh3rd via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'current-river-pulltite-round-spring': [
    {
      id: 'current-river-welch-spring-commons',
      src: '/gallery/current-river-pulltite-round-spring/current-river-welch-spring.jpg',
      alt: 'The clear Current River flows below wooded Ozark hills with gravel bars along the channel.',
      caption: 'Current River corridor near Welch Spring',
      credit: 'Kbh3rd via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'jacks-fork-river-alley-spring-chilton': [
    {
      id: 'jacks-fork-upper-commons',
      src: '/gallery/jacks-fork-river-alley-spring-chilton/jacks-fork-upper.jpg',
      alt: 'The Jacks Fork River winds below wooded Ozark hills with a gravel bar along the clear channel.',
      caption: 'Jacks Fork River corridor',
      credit: 'Chris M Morris via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'jacks-fork-river-highway-17-blue-spring': [
    {
      id: 'jacks-fork-upper-commons',
      src: '/gallery/jacks-fork-river-highway-17-blue-spring/jacks-fork-upper.jpg',
      alt: 'The upper Jacks Fork River winds below wooded Ozark hills with a gravel bar along the clear channel.',
      caption: 'Upper Jacks Fork River corridor',
      credit: 'Chris M Morris via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'jacks-fork-river-highway-17-bay-creek': [
    {
      id: 'jacks-fork-upper-commons',
      src: '/gallery/jacks-fork-river-highway-17-bay-creek/jacks-fork-upper.jpg',
      alt: 'The upper Jacks Fork River winds below wooded Ozark hills with a gravel bar along the clear channel.',
      caption: 'Upper Jacks Fork River corridor',
      credit: 'Chris M Morris via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'jacks-fork-river-blue-spring-rymers': [
    {
      id: 'jacks-fork-upper-commons',
      src: '/gallery/jacks-fork-river-blue-spring-rymers/jacks-fork-upper.jpg',
      alt: 'The upper Jacks Fork River winds below wooded Ozark hills with a gravel bar along the clear channel.',
      caption: 'Upper Jacks Fork River corridor',
      credit: 'Chris M Morris via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'jacks-fork-river-blue-spring-bay-creek': [
    {
      id: 'jacks-fork-upper-commons',
      src: '/gallery/jacks-fork-river-blue-spring-bay-creek/jacks-fork-upper.jpg',
      alt: 'The upper Jacks Fork River winds below wooded Ozark hills with a gravel bar along the clear channel.',
      caption: 'Upper Jacks Fork River corridor',
      credit: 'Chris M Morris via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'jacks-fork-river-rymers-bay-creek': [
    {
      id: 'jacks-fork-upper-commons',
      src: '/gallery/jacks-fork-river-rymers-bay-creek/jacks-fork-upper.jpg',
      alt: 'The upper Jacks Fork River winds below wooded Ozark hills with a gravel bar along the clear channel.',
      caption: 'Upper Jacks Fork River corridor',
      credit: 'Chris M Morris via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'jacks-fork-river-rymers-alley-spring': [
    {
      id: 'jacks-fork-upper-commons',
      src: '/gallery/jacks-fork-river-rymers-alley-spring/jacks-fork-upper.jpg',
      alt: 'The upper Jacks Fork River winds below wooded Ozark hills with a gravel bar along the clear channel.',
      caption: 'Upper Jacks Fork River corridor',
      credit: 'Chris M Morris via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'jacks-fork-river-bay-creek-alley-spring': [
    {
      id: 'jacks-fork-upper-commons',
      src: '/gallery/jacks-fork-river-bay-creek-alley-spring/jacks-fork-upper.jpg',
      alt: 'The Jacks Fork River winds below wooded Ozark hills with a gravel bar along the clear channel.',
      caption: 'Jacks Fork River corridor',
      credit: 'Chris M Morris via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'current-river-waymeyer-van-buren': [
    {
      id: 'ozark-riverways-canoeing-nps',
      src: '/gallery/current-river-waymeyer-van-buren/ozark-riverways-canoeing.jpg',
      alt: 'Visitors paddle canoes through a wooded Ozark National Scenic Riverways corridor.',
      caption: 'Canoeing in Ozark National Scenic Riverways',
      credit: 'Cecil W. Stoughton/NPS History Collection via Wikimedia Commons',
      takenLabel: 'NPS asset: public domain',
    },
  ],
  'current-river-van-buren-big-spring': [
    {
      id: 'ozark-riverways-canoeing-nps',
      src: '/gallery/current-river-van-buren-big-spring/ozark-riverways-canoeing.jpg',
      alt: 'Visitors paddle canoes through a wooded Ozark National Scenic Riverways corridor.',
      caption: 'Canoeing in Ozark National Scenic Riverways',
      credit: 'Cecil W. Stoughton/NPS History Collection via Wikimedia Commons',
      takenLabel: 'NPS asset: public domain',
    },
  ],
  'current-river-big-spring-gooseneck': [
    {
      id: 'ozark-riverways-canoeing-nps',
      src: '/gallery/current-river-big-spring-gooseneck/ozark-riverways-canoeing.jpg',
      alt: 'Visitors paddle canoes through a wooded Ozark National Scenic Riverways corridor.',
      caption: 'Canoeing in Ozark National Scenic Riverways',
      credit: 'Cecil W. Stoughton/NPS History Collection via Wikimedia Commons',
      takenLabel: 'NPS asset: public domain',
    },
  ],
  'eleven-point-river-greer-crossing-turner-mill': [
    {
      id: 'eleven-point-river-missouri-commons',
      src: '/gallery/eleven-point-river-greer-crossing-turner-mill/eleven-point-river-missouri.jpg',
      alt: 'A canoe rests beside the clear Eleven Point River with wooded Ozark banks rising behind the channel.',
      caption: 'Eleven Point River in Missouri',
      credit: 'Charlie Llewellin via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'eleven-point-river-turner-mill-south-whitten': [
    {
      id: 'eleven-point-river-missouri-commons',
      src: '/gallery/eleven-point-river-turner-mill-south-whitten/eleven-point-river-missouri.jpg',
      alt: 'A canoe rests beside the clear Eleven Point River with wooded Ozark banks rising behind the channel.',
      caption: 'Eleven Point River in Missouri',
      credit: 'Charlie Llewellin via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'meramec-river-onondaga-campbell-bridge': [
    {
      id: 'meramec-river-onondaga-commons',
      src: '/gallery/meramec-river-onondaga-campbell-bridge/meramec-river-onondaga.jpg',
      alt: 'The Meramec River runs past Onondaga Cave State Park with wooded banks and low gravel edges.',
      caption: 'Meramec River at Onondaga Cave State Park',
      credit: 'Kbh3rd via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'meramec-river-scotts-ford-riverview': [
    {
      id: 'meramec-river-onondaga-commons',
      src: '/gallery/meramec-river-scotts-ford-riverview/meramec-river-onondaga.jpg',
      alt: 'The Meramec River runs past Onondaga Cave State Park with wooded banks and low gravel edges.',
      caption: 'Meramec River near Onondaga Cave State Park',
      credit: 'Kbh3rd via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'meramec-river-campbell-bridge-sappington-bridge': [
    {
      id: 'meramec-river-onondaga-commons',
      src: '/gallery/meramec-river-campbell-bridge-sappington-bridge/meramec-river-onondaga.jpg',
      alt: 'The Meramec River runs past Onondaga Cave State Park with wooded banks and low gravel edges.',
      caption: 'Meramec River near Onondaga Cave State Park',
      credit: 'Kbh3rd via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'big-piney-river-east-gate-bookers-bend': [
    {
      id: 'big-piney-river-mo-17-commons',
      src: '/gallery/big-piney-river-east-gate-bookers-bend/big-piney-river-mo-17.jpg',
      alt: 'The Big Piney River flows through a green Missouri corridor with wooded banks and a shallow gravel edge.',
      caption: 'Big Piney River in Missouri',
      credit: 'Inklein via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'big-piney-river-sandy-shoals-boiling-spring': [
    {
      id: 'big-piney-river-mo-17-commons',
      src: '/gallery/big-piney-river-sandy-shoals-boiling-spring/big-piney-river-mo-17.jpg',
      alt: 'The Big Piney River flows through a green Missouri corridor with wooded banks and a shallow gravel edge.',
      caption: 'Big Piney River in Missouri',
      credit: 'Inklein via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'big-piney-river-mason-bridge-slabtown': [
    {
      id: 'big-piney-river-mo-17-commons',
      src: '/gallery/big-piney-river-mason-bridge-slabtown/big-piney-river-mo-17.jpg',
      alt: 'The Big Piney River flows through a green Missouri corridor with wooded banks and a shallow gravel edge.',
      caption: 'Big Piney River in Missouri',
      credit: 'Inklein via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'big-piney-river-slabtown-ross': [
    {
      id: 'big-piney-river-mo-17-commons',
      src: '/gallery/big-piney-river-slabtown-ross/big-piney-river-mo-17.jpg',
      alt: 'The Big Piney River flows through a green Missouri corridor with wooded banks and a shallow gravel edge.',
      caption: 'Big Piney River in Missouri',
      credit: 'Inklein via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'shoal-creek-tipton-ford-wildcat': [
    {
      id: 'shoal-creek-inspiration-point-commons',
      src: '/gallery/shoal-creek-tipton-ford-wildcat/shoal-creek-inspiration-point.jpg',
      alt: 'Shoal Creek bends below a wooded overlook near Joplin with a shallow riffled channel visible through the trees.',
      caption: 'Shoal Creek from Inspiration Point',
      credit: 'AbeEzekowitz via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 3.0',
    },
  ],
  'jacks-fork-river-buck-hollow-rymers': [
    {
      id: 'jacks-fork-upper-commons',
      src: '/gallery/jacks-fork-river-buck-hollow-rymers/jacks-fork-upper.jpg',
      alt: 'The upper Jacks Fork River winds below wooded Ozark hills with a gravel bar along the clear channel.',
      caption: 'Upper Jacks Fork River corridor',
      credit: 'Chris M Morris via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'eleven-point-river-whitten-riverton': [
    {
      id: 'eleven-point-river-missouri-commons',
      src: '/gallery/eleven-point-river-whitten-riverton/eleven-point-river-missouri.jpg',
      alt: 'A canoe rests beside the clear Eleven Point River with wooded Ozark banks rising behind the channel.',
      caption: 'Eleven Point River in Missouri',
      credit: 'Charlie Llewellin via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'eleven-point-river-riverton-narrows': [
    {
      id: 'eleven-point-river-missouri-commons',
      src: '/gallery/eleven-point-river-riverton-narrows/eleven-point-river-missouri.jpg',
      alt: 'A canoe rests beside the clear Eleven Point River with wooded Ozark banks rising behind the channel.',
      caption: 'Eleven Point River in Missouri',
      credit: 'Charlie Llewellin via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'north-fork-white-river-north-fork-blair': [
    {
      id: 'upper-north-fork-bridge-commons',
      src: '/gallery/north-fork-white-river-north-fork-blair/upper-north-fork-bridge.jpg',
      alt: 'A county road bridge crosses the narrow upper North Fork River between wooded banks.',
      caption: 'Upper North Fork River bridge',
      credit: 'Vsmith via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'north-fork-white-river-blair-dawt': [
    {
      id: 'upper-north-fork-bridge-commons',
      src: '/gallery/north-fork-white-river-blair-dawt/upper-north-fork-bridge.jpg',
      alt: 'A county road bridge crosses the narrow upper North Fork River between wooded banks.',
      caption: 'Upper North Fork River bridge',
      credit: 'Vsmith via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'meramec-river-sappington-bridge-meramec-state-park': [
    {
      id: 'meramec-valley-park-commons',
      src: '/gallery/meramec-river-sappington-bridge-meramec-state-park/meramec-valley-park.jpg',
      alt: 'The Meramec River bends below a wooded bank in Missouri under a broad summer sky.',
      caption: 'Meramec River in Missouri',
      credit: 'JDMcGreg via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'meramec-river-state-park-sand-ford': [
    {
      id: 'meramec-valley-park-commons',
      src: '/gallery/meramec-river-state-park-sand-ford/meramec-valley-park.jpg',
      alt: 'The Meramec River bends below a wooded bank in Missouri under a broad summer sky.',
      caption: 'Meramec River in Missouri',
      credit: 'JDMcGreg via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'bryant-creek-sycamore-warren-bridge': [
    {
      id: 'bryant-creek-state-park-commons',
      src: '/gallery/bryant-creek-sycamore-warren-bridge/bryant-creek-state-park.jpg',
      alt: 'Bryant Creek flows through a wooded Missouri state park corridor with gravel bars and clear shallow water.',
      caption: 'Bryant Creek State Park',
      credit: 'Missouri State Parks via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'james-river-delaware-town-shelvin-rock': [
    {
      id: 'james-river-springfield-commons',
      src: '/gallery/james-river-delaware-town-shelvin-rock/james-river-springfield.jpg',
      alt: 'The James River flows past a wooded bank in southwest Missouri with shallow water near the shore.',
      caption: 'James River in southwest Missouri',
      credit: 'Cold417 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'james-river-shelvin-rock-hooten-town': [
    {
      id: 'james-river-springfield-commons',
      src: '/gallery/james-river-shelvin-rock-hooten-town/james-river-springfield.jpg',
      alt: 'The James River flows past a wooded bank in southwest Missouri with shallow water near the shore.',
      caption: 'James River in southwest Missouri',
      credit: 'Cold417 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'skunk-creek-legacy-park-farm-field': [
    {
      id: 'skunk-creek-big-sioux-confluence-commons',
      src: '/gallery/skunk-creek-legacy-park-farm-field/skunk-creek-big-sioux-confluence.jpg',
      alt: 'Skunk Creek meets the Big Sioux River in Sioux Falls below grassy banks and a cloudy sky.',
      caption: 'Skunk Creek and Big Sioux River confluence',
      credit: 'BrianHagan via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'big-sioux-river-farm-field-rotary': [
    {
      id: 'big-sioux-southern-sioux-falls-bridge-commons',
      src: '/gallery/big-sioux-river-farm-field-rotary/big-sioux-southern-sioux-falls-bridge.jpg',
      alt: 'A former railroad bridge crosses the Big Sioux River in southern Sioux Falls, now used as a pathway.',
      caption: 'Big Sioux River in southern Sioux Falls',
      credit: 'Jerry via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'split-rock-creek-split-rock-park-palisades': [
    {
      id: 'palisades-split-rock-creek-commons',
      src: '/gallery/split-rock-creek-split-rock-park-palisades/palisades-split-rock-creek.jpg',
      alt: 'Split Rock Creek runs between pink quartzite walls at Palisades State Park in South Dakota.',
      caption: 'Split Rock Creek at Palisades State Park',
      credit: 'inkknife_2000 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'vermilion-river-lowell-oglesby': [
    {
      id: 'vermilion-river-pontiac-commons',
      src: '/gallery/vermilion-river-lowell-oglesby/vermilion-river-pontiac.jpg',
      alt: 'The Vermilion River reflects autumn trees and a pale sky along a wooded Illinois riverbank.',
      caption: 'Vermilion River at Pontiac, upstream of the whitewater reach',
      credit: 'Guyute82 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'kishwaukee-river-hickory-bills-distillery': [
    {
      id: 'kishwaukee-river-state-fish-wildlife-commons',
      src: '/gallery/kishwaukee-river-hickory-bills-distillery/kishwaukee-river-state-fish-wildlife-area.jpg',
      alt: 'A low bridge crosses the Kishwaukee River in a wooded state fish and wildlife area corridor.',
      caption: 'Kishwaukee River state fish and wildlife area',
      credit: 'Prburley via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 4.0',
    },
  ],
  'clinton-river-budd-macarthur': [
    {
      id: 'clinton-river-macomb-county-commons',
      src: '/gallery/clinton-river-budd-shadyside/clinton-river-macomb-county.jpg',
      alt: 'The Clinton River flows past wooded banks in Macomb County, Michigan.',
      caption: 'Clinton River in Macomb County',
      credit: 'Local hero via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'clinton-river-macarthur-harley-ensign': [
    {
      id: 'clinton-river-macomb-county-commons',
      src: '/gallery/clinton-river-macarthur-harley-ensign/clinton-river-macomb-county.jpg',
      alt: 'The Clinton River flows past wooded banks in Macomb County, Michigan.',
      caption: 'Clinton River in Macomb County',
      credit: 'Local hero via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'flambeau-river-highway-w-hervas': [
    {
      id: 'flambeau-river-state-forest-commons',
      src: '/gallery/flambeau-river-highway-w-hervas/flambeau-river-state-forest.jpg',
      alt: 'The Flambeau River flows through forested banks with autumn color reflected in calm water.',
      caption: 'Flambeau River State Forest',
      credit: 'Jeff the quiet via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC0',
    },
  ],
  'flambeau-river-hervas-beaver-dam': [
    {
      id: 'flambeau-river-near-bruce-usgs',
      src: '/gallery/flambeau-river-hervas-beaver-dam/flambeau-river-near-bruce-usgs.jpg',
      alt: 'The Flambeau River near Bruce flows between wooded banks with a light riffled surface.',
      caption: 'Flambeau River near Bruce',
      credit: 'Kim Wickland / USGS',
      takenLabel: 'USGS image: public domain',
    },
  ],
  'buffalo-river-ponca-kyles-landing': [
    {
      id: 'buffalo-river-ponca-low-water-bridge-commons',
      src: '/gallery/buffalo-river-ponca-kyles-landing/buffalo-river-ponca-low-water-bridge.jpg',
      alt: 'The Buffalo River flows under the low-water bridge at Ponca with forested Ozark hills in the background.',
      caption: 'Buffalo River at Ponca low-water bridge',
      credit: 'Chris Light via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'buffalo-river-pruitt-hasty': [
    {
      id: 'buffalo-river-pruitt-landing-commons',
      src: '/gallery/buffalo-river-pruitt-hasty/buffalo-river-pruitt-landing.jpg',
      alt: 'The Buffalo River flows past the Pruitt landing with wooded Ozark hills rising beyond the riverbank.',
      caption: 'Buffalo River at Pruitt Landing',
      credit: 'Chris Light via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'buffalo-river-kyles-landing-pruitt': [
    {
      id: 'buffalo-river-ozark-pruitt-trail-nps',
      src: '/gallery/buffalo-river-kyles-landing-pruitt/buffalo-river-ozark-pruitt-trail.jpg',
      alt: 'The Buffalo River corridor near the Ozark-to-Pruitt trail shows forested bluffs and a broad river bend.',
      caption: 'Buffalo River corridor between Ozark and Pruitt',
      credit: 'NPS via Wikimedia Commons',
      takenLabel: 'NPS asset: public domain',
    },
  ],
  'buffalo-river-kyles-landing-erbie': [
    {
      id: 'buffalo-river-kyles-erbie-corridor-nps',
      src: '/gallery/buffalo-river-kyles-landing-pruitt/buffalo-river-ozark-pruitt-trail.jpg',
      alt: 'The Buffalo River winds past wooded Ozark bluffs in the same upper-river corridor used for the Kyles Landing to Erbie route.',
      caption: 'Upper Buffalo River corridor',
      credit: 'NPS via Wikimedia Commons',
      takenLabel: 'NPS asset: public domain',
    },
  ],
  'buffalo-river-erbie-ozark': [
    {
      id: 'buffalo-river-erbie-ozark-corridor-nps',
      src: '/gallery/buffalo-river-kyles-landing-pruitt/buffalo-river-ozark-pruitt-trail.jpg',
      alt: 'The Buffalo River curves through a bluff-lined Ozark corridor similar to the Erbie to Ozark segment.',
      caption: 'Buffalo River corridor near Ozark',
      credit: 'NPS via Wikimedia Commons',
      takenLabel: 'NPS asset: public domain',
    },
  ],
  'buffalo-river-ozark-pruitt': [
    {
      id: 'buffalo-river-ozark-pruitt-corridor-nps',
      src: '/gallery/buffalo-river-kyles-landing-pruitt/buffalo-river-ozark-pruitt-trail.jpg',
      alt: 'The Buffalo River corridor between Ozark and Pruitt shows broad water, forested bluffs, and a bend through the valley.',
      caption: 'Buffalo River corridor between Ozark and Pruitt',
      credit: 'NPS via Wikimedia Commons',
      takenLabel: 'NPS asset: public domain',
    },
  ],
  'buffalo-river-tyler-bend-gilbert': [
    {
      id: 'buffalo-river-gilbert-aerial-nps',
      src: '/gallery/buffalo-river-tyler-bend-gilbert/buffalo-river-gilbert-aerial.jpg',
      alt: 'An aerial view shows the Buffalo River winding past Gilbert with wooded hills and gravel bars nearby.',
      caption: 'Buffalo River at Gilbert',
      credit: 'NPS via Wikimedia Commons',
      takenLabel: 'NPS asset: public domain',
    },
  ],
  'cossatot-river-ed-banks-highway-278': [
    {
      id: 'cossatot-river-usace',
      src: '/gallery/cossatot-river-ed-banks-highway-278/cossatot-river-usace.jpg',
      alt: 'The Cossatot River runs over a rocky channel with clear water and wooded banks in southwest Arkansas.',
      caption: 'Cossatot River in Arkansas',
      credit: 'Jamie Camp/U.S. Army Corps of Engineers via Wikimedia Commons',
      takenLabel: 'USACE asset: public domain',
    },
  ],
  'mulberry-river-redding-turner-bend': [
    {
      id: 'mulberry-river-bridge-commons',
      src: '/gallery/mulberry-river-redding-turner-bend/mulberry-river-bridge.jpg',
      alt: 'A steel truss bridge crosses the Mulberry River above a rocky channel lined with spring-green trees.',
      caption: 'Mulberry River bridge near Turner Bend',
      credit: 'Valis55 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'ouachita-river-remmel-whitewater-park': [
    {
      id: 'remmel-dam-commons',
      src: '/gallery/ouachita-river-remmel-whitewater-park/remmel-dam.jpg',
      alt: 'Remmel Dam spans the Ouachita River with release water below the concrete spillway and wooded banks nearby.',
      caption: 'Remmel Dam on the Ouachita River',
      credit: 'Valis55 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'gasconade-river-rollins-ferry-pointers-creek': [
    {
      id: 'gasconade-river-usgs',
      src: '/gallery/gasconade-river-rollins-ferry-pointers-creek/gasconade-river-usgs.jpg',
      alt: 'The Gasconade River runs high near Hazelgreen, Missouri, beside a bridge and wooded riverbank.',
      caption: 'Gasconade River near Hazelgreen',
      credit: 'Larry D. Buschmann/USGS',
      takenLabel: 'USGS asset: public domain',
    },
  ],
  'gasconade-river-pointers-creek-cooper-hill': [
    {
      id: 'gasconade-river-usgs',
      src: '/gallery/gasconade-river-pointers-creek-cooper-hill/gasconade-river-usgs.jpg',
      alt: 'The Gasconade River runs high near Hazelgreen, Missouri, beside a bridge and wooded riverbank.',
      caption: 'Gasconade River near Hazelgreen',
      credit: 'Larry D. Buschmann/USGS',
      takenLabel: 'USGS asset: public domain',
    },
  ],
  'big-piney-river-boiling-spring-mason-bridge': [
    {
      id: 'big-piney-river-mo-17-commons',
      src: '/gallery/big-piney-river-boiling-spring-mason-bridge/big-piney-river-mo-17.jpg',
      alt: 'The Big Piney River bends below a wooded bluff and gravel bar near Missouri Route 17.',
      caption: 'Big Piney River near Missouri Route 17',
      credit: 'Inklein via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'big-piney-river-dogs-bluff-mineral-springs': [
    {
      id: 'big-piney-river-mo-17-commons',
      src: '/gallery/big-piney-river-dogs-bluff-mineral-springs/big-piney-river-mo-17.jpg',
      alt: 'The Big Piney River bends below a wooded bluff and gravel bar near Missouri Route 17.',
      caption: 'Big Piney River near Missouri Route 17',
      credit: 'Inklein via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'james-river-hl-kerr-ralph-cox': [
    {
      id: 'james-river-springfield-commons',
      src: '/gallery/james-river-hl-kerr-ralph-cox/james-river-springfield.jpg',
      alt: 'The James River flows past a low wooded bank and calm water in Springfield, Missouri.',
      caption: 'James River in Springfield',
      credit: 'Cold417 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'floyds-fork-fisherville-cane-run': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-north-beckley-creekside': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-creekside-fisherville': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-cane-run-seaton-valley': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-creekside-seaton-valley': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-north-beckley-cane-run': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-north-beckley-seaton-valley': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-seaton-valley-broad-run-valley': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-seaton-valley-cliffside': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-broad-run-valley-cliffside': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-north-beckley-fisherville': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-north-beckley-broad-run-valley': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-fisherville-broad-run-valley': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-fisherville-cliffside': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-cane-run-cliffside': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'floyds-fork-north-beckley-cliffside': [
    {
      id: 'floyds-fork-april-2024-commons',
      src: '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
      alt: 'Floyds Fork flows through a spring-green Kentucky creek corridor with wooded banks and shallow current.',
      caption: 'Floyds Fork in Kentucky',
      credit: 'Bpluke01 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
    },
  ],
  'south-fork-kentucky-river-oneida-rocky-branch': [
    {
      id: 'south-fork-kentucky-river-bronner-bend-commons',
      src: '/gallery/south-fork-kentucky-river-rocky-branch-cedar-valley/south-fork-kentucky-river-bronner-bend.jpg',
      alt: 'A historical view shows the South Fork Kentucky River running past rocky shoals and wooded banks near Bronner Bend.',
      caption: 'South Fork Kentucky River near Bronner Bend Shoals',
      credit: 'Ernest Danglade via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'south-fork-kentucky-river-rocky-branch-cedar-valley': [
    {
      id: 'south-fork-kentucky-river-bronner-bend-commons',
      src: '/gallery/south-fork-kentucky-river-rocky-branch-cedar-valley/south-fork-kentucky-river-bronner-bend.jpg',
      alt: 'A historical view shows the South Fork Kentucky River running past rocky shoals and wooded banks near Bronner Bend.',
      caption: 'South Fork Kentucky River near Bronner Bend Shoals',
      credit: 'Ernest Danglade via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'south-fork-kentucky-river-cedar-valley-bishop-bend': [
    {
      id: 'south-fork-kentucky-river-bronner-bend-shoals-commons',
      src: '/gallery/south-fork-kentucky-river-cedar-valley-bishop-bend/south-fork-kentucky-river-bronner-bend-shoals.jpg',
      alt: 'A historical view shows the South Fork Kentucky River spreading across broad shoals below wooded Kentucky hills.',
      caption: 'South Fork Kentucky River at Bronner Bend Shoals',
      credit: 'Ernest Danglade via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'south-fork-kentucky-river-rocky-branch-bishop-bend': [
    {
      id: 'south-fork-kentucky-river-bronner-bend-commons',
      src: '/gallery/south-fork-kentucky-river-rocky-branch-cedar-valley/south-fork-kentucky-river-bronner-bend.jpg',
      alt: 'A historical view shows the South Fork Kentucky River running past rocky shoals and wooded banks near Bronner Bend.',
      caption: 'South Fork Kentucky River near Bronner Bend Shoals',
      credit: 'Ernest Danglade via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'south-fork-kentucky-river-oneida-fish-creek': [
    {
      id: 'south-fork-kentucky-river-bronner-bend-commons',
      src: '/gallery/south-fork-kentucky-river-rocky-branch-cedar-valley/south-fork-kentucky-river-bronner-bend.jpg',
      alt: 'A historical view shows the South Fork Kentucky River running past rocky shoals and wooded banks near Bronner Bend.',
      caption: 'South Fork Kentucky River near Bronner Bend Shoals',
      credit: 'Ernest Danglade via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'south-fork-kentucky-river-cedar-valley-hacker-branch': [
    {
      id: 'south-fork-kentucky-river-bronner-bend-commons',
      src: '/gallery/south-fork-kentucky-river-rocky-branch-cedar-valley/south-fork-kentucky-river-bronner-bend.jpg',
      alt: 'A historical view shows the South Fork Kentucky River running past rocky shoals and wooded banks near Bronner Bend.',
      caption: 'South Fork Kentucky River near Bronner Bend Shoals',
      credit: 'Ernest Danglade via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'south-fork-kentucky-river-oneida-upper-wolf-creek': [
    {
      id: 'south-fork-kentucky-river-bronner-bend-shoals-commons',
      src: '/gallery/south-fork-kentucky-river-cedar-valley-bishop-bend/south-fork-kentucky-river-bronner-bend-shoals.jpg',
      alt: 'A historical view shows the South Fork Kentucky River spreading across broad shoals below wooded Kentucky hills.',
      caption: 'South Fork Kentucky River at Bronner Bend Shoals',
      credit: 'Ernest Danglade via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'south-fork-kentucky-river-upper-wolf-creek-fish-creek': [
    {
      id: 'south-fork-kentucky-river-bronner-bend-commons',
      src: '/gallery/south-fork-kentucky-river-rocky-branch-cedar-valley/south-fork-kentucky-river-bronner-bend.jpg',
      alt: 'A historical view shows the South Fork Kentucky River running past rocky shoals and wooded banks near Bronner Bend.',
      caption: 'South Fork Kentucky River near Bronner Bend Shoals',
      credit: 'Ernest Danglade via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'south-fork-kentucky-river-hacker-branch-fish-creek': [
    {
      id: 'south-fork-kentucky-river-bronner-bend-commons',
      src: '/gallery/south-fork-kentucky-river-rocky-branch-cedar-valley/south-fork-kentucky-river-bronner-bend.jpg',
      alt: 'A historical view shows the South Fork Kentucky River running past rocky shoals and wooded banks near Bronner Bend.',
      caption: 'South Fork Kentucky River near Bronner Bend Shoals',
      credit: 'Ernest Danglade via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'south-fork-kentucky-river-hacker-branch-kay-wood': [
    {
      id: 'south-fork-kentucky-river-bronner-bend-commons',
      src: '/gallery/south-fork-kentucky-river-rocky-branch-cedar-valley/south-fork-kentucky-river-bronner-bend.jpg',
      alt: 'A historical view shows the South Fork Kentucky River running past rocky shoals and wooded banks near Bronner Bend.',
      caption: 'South Fork Kentucky River near Bronner Bend Shoals',
      credit: 'Ernest Danglade via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'south-fork-kentucky-river-bishop-bend-hacker-branch': [
    {
      id: 'south-fork-kentucky-river-bronner-bend-commons',
      src: '/gallery/south-fork-kentucky-river-rocky-branch-cedar-valley/south-fork-kentucky-river-bronner-bend.jpg',
      alt: 'A historical view shows the South Fork Kentucky River running past rocky shoals and wooded banks near Bronner Bend.',
      caption: 'South Fork Kentucky River near Bronner Bend Shoals',
      credit: 'Ernest Danglade via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'south-fork-kentucky-river-bishop-bend-upper-wolf-creek': [
    {
      id: 'south-fork-kentucky-river-bronner-bend-commons',
      src: '/gallery/south-fork-kentucky-river-rocky-branch-cedar-valley/south-fork-kentucky-river-bronner-bend.jpg',
      alt: 'A historical view shows the South Fork Kentucky River running past rocky shoals and wooded banks near Bronner Bend.',
      caption: 'South Fork Kentucky River near Bronner Bend Shoals',
      credit: 'Ernest Danglade via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'south-fork-kentucky-river-hacker-branch-upper-wolf-creek': [
    {
      id: 'south-fork-kentucky-river-bronner-bend-commons',
      src: '/gallery/south-fork-kentucky-river-rocky-branch-cedar-valley/south-fork-kentucky-river-bronner-bend.jpg',
      alt: 'A historical view shows the South Fork Kentucky River running past rocky shoals and wooded banks near Bronner Bend.',
      caption: 'South Fork Kentucky River near Bronner Bend Shoals',
      credit: 'Ernest Danglade via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'south-fork-kentucky-river-kay-wood-fish-creek': [
    {
      id: 'south-fork-kentucky-river-bronner-bend-commons',
      src: '/gallery/south-fork-kentucky-river-rocky-branch-cedar-valley/south-fork-kentucky-river-bronner-bend.jpg',
      alt: 'A historical view shows the South Fork Kentucky River running past rocky shoals and wooded banks near Bronner Bend.',
      caption: 'South Fork Kentucky River near Bronner Bend Shoals',
      credit: 'Ernest Danglade via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'slate-creek-lions-club-old-slate-furnace': [
    {
      id: 'slate-creek-owingsville-usgs',
      src: '/gallery/slate-creek-lions-club-old-slate-furnace/slate-creek-owingsville-usgs.jpg',
      alt: 'A USGS crew works along Slate Creek at Owingsville, Kentucky, with shallow water and wooded banks behind them.',
      caption: 'Slate Creek at Owingsville',
      credit: 'Andre Ferguson/USGS',
      takenLabel: 'USGS asset: public domain',
    },
  ],
  'levisa-fork-cedar-creek-thompson-road': [
    {
      id: 'levisa-fork-pikeville-commons',
      src: '/gallery/levisa-fork-cedar-creek-thompson-road/levisa-fork-pikeville.jpg',
      alt: 'The Levisa Fork flows past Pikeville, Kentucky, with a broad river channel and wooded slopes nearby.',
      caption: 'Levisa Fork in Pikeville',
      credit: 'FatCat96 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC0',
    },
  ],
  'levisa-fork-jubilee-thompson-road': [
    {
      id: 'levisa-fork-pikeville-commons',
      src: '/gallery/levisa-fork-cedar-creek-thompson-road/levisa-fork-pikeville.jpg',
      alt: 'The Levisa Fork flows past Pikeville, Kentucky, with a broad river channel and wooded slopes nearby.',
      caption: 'Levisa Fork in Pikeville',
      credit: 'FatCat96 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC0',
    },
  ],
  'elkhorn-creek-vpa-3-aw-access': [
    {
      id: 'north-fork-elkhorn-creek-commons',
      src: '/gallery/elkhorn-creek-vpa-3-aw-access/north-fork-elkhorn-creek.jpg',
      alt: 'North Elkhorn Creek flows through a leafy Kentucky creek corridor with a low wooded bank beside the water.',
      caption: 'North Elkhorn Creek in Georgetown',
      credit: 'Sydney Poore and Russell Poore via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'big-south-fork-burnt-mill-leatherwood': [
    {
      id: 'big-south-fork-leatherwood-ford-commons',
      src: '/gallery/big-south-fork-burnt-mill-leatherwood/big-south-fork-leatherwood-ford.jpg',
      alt: 'The Big South Fork flows through the wooded Leatherwood Ford gorge corridor in Tennessee.',
      caption: 'Big South Fork at Leatherwood Ford',
      credit: 'Brian Stansberry via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 3.0',
    },
  ],
  'big-south-fork-blue-heron-yamacraw': [
    {
      id: 'big-south-fork-leatherwood-ford-commons',
      src: '/gallery/big-south-fork-blue-heron-yamacraw/big-south-fork-leatherwood-ford.jpg',
      alt: 'The Big South Fork flows through a wooded gorge corridor with clear green water and rocky banks.',
      caption: 'Big South Fork corridor',
      credit: 'Brian Stansberry via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 3.0',
    },
  ],
  'big-south-fork-blue-heron-worley': [
    {
      id: 'big-south-fork-leatherwood-ford-commons',
      src: '/gallery/big-south-fork-blue-heron-yamacraw/big-south-fork-leatherwood-ford.jpg',
      alt: 'The Big South Fork flows through a wooded gorge corridor with clear green water and rocky banks.',
      caption: 'Big South Fork corridor',
      credit: 'Brian Stansberry via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 3.0',
    },
  ],
  'big-south-fork-yamacraw-alum-ford': [
    {
      id: 'big-south-fork-leatherwood-ford-commons',
      src: '/gallery/big-south-fork-blue-heron-yamacraw/big-south-fork-leatherwood-ford.jpg',
      alt: 'The Big South Fork flows through a wooded gorge corridor with clear green water and rocky banks.',
      caption: 'Big South Fork corridor',
      credit: 'Brian Stansberry via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 3.0',
    },
  ],
  'big-south-fork-blue-heron-alum-ford': [
    {
      id: 'big-south-fork-leatherwood-ford-commons',
      src: '/gallery/big-south-fork-blue-heron-yamacraw/big-south-fork-leatherwood-ford.jpg',
      alt: 'The Big South Fork flows through a wooded gorge corridor with clear green water and rocky banks.',
      caption: 'Big South Fork corridor',
      credit: 'Brian Stansberry via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 3.0',
    },
  ],
  'tradewater-river-bellville-montezuma': [
    {
      id: 'tradewater-river-commons',
      src: '/gallery/tradewater-river-bellville-montezuma/tradewater-river.jpg',
      alt: 'The Tradewater River flows through a broad wooded Kentucky river corridor under summer light.',
      caption: 'Tradewater River near Dawson Springs',
      credit: 'Jomegat via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'tradewater-river-montezuma-fishtrap': [
    {
      id: 'tradewater-river-commons',
      src: '/gallery/tradewater-river-bellville-montezuma/tradewater-river.jpg',
      alt: 'The Tradewater River flows through a broad wooded Kentucky river corridor under summer light.',
      caption: 'Tradewater River near Dawson Springs',
      credit: 'Jomegat via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'tradewater-river-fishtrap-vfw-bridge': [
    {
      id: 'tradewater-river-commons',
      src: '/gallery/tradewater-river-bellville-montezuma/tradewater-river.jpg',
      alt: 'The Tradewater River flows through a broad wooded Kentucky river corridor under summer light.',
      caption: 'Tradewater River near Dawson Springs',
      credit: 'Jomegat via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'tradewater-river-vfw-bridge-granger-landing': [
    {
      id: 'tradewater-river-commons',
      src: '/gallery/tradewater-river-bellville-montezuma/tradewater-river.jpg',
      alt: 'The Tradewater River flows through a broad wooded Kentucky river corridor under summer light.',
      caption: 'Tradewater River near Dawson Springs',
      credit: 'Jomegat via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'tradewater-river-montezuma-vfw-bridge': [
    {
      id: 'tradewater-river-commons',
      src: '/gallery/tradewater-river-bellville-montezuma/tradewater-river.jpg',
      alt: 'The Tradewater River flows through a broad wooded Kentucky river corridor under summer light.',
      caption: 'Tradewater River near Dawson Springs',
      credit: 'Jomegat via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'tradewater-river-fishtrap-granger-landing': [
    {
      id: 'tradewater-river-commons',
      src: '/gallery/tradewater-river-bellville-montezuma/tradewater-river.jpg',
      alt: 'The Tradewater River flows through a broad wooded Kentucky river corridor under summer light.',
      caption: 'Tradewater River near Dawson Springs',
      credit: 'Jomegat via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'tradewater-river-montezuma-granger-landing': [
    {
      id: 'tradewater-river-commons',
      src: '/gallery/tradewater-river-bellville-montezuma/tradewater-river.jpg',
      alt: 'The Tradewater River flows through a broad wooded Kentucky river corridor under summer light.',
      caption: 'Tradewater River near Dawson Springs',
      credit: 'Jomegat via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'south-chickamauga-creek-shallowford-sterchi': [
    {
      id: 'south-chickamauga-audubon-acres-nps',
      src: '/gallery/south-chickamauga-creek-shallowford-sterchi/south-chickamauga-audubon-acres.jpg',
      alt: 'South Chickamauga Creek runs through a leafy corridor at Audubon Acres in Chattanooga, Tennessee.',
      caption: 'South Chickamauga Creek at Audubon Acres',
      credit: 'National Trails Office/NPS via Wikimedia Commons',
      takenLabel: 'NPS asset: public domain',
    },
  ],
  'pigeon-river-waterville-hartford': [
    {
      id: 'pigeon-river-hartford-commons',
      src: '/gallery/pigeon-river-waterville-hartford/pigeon-river-hartford.jpg',
      alt: 'The Pigeon River runs through Hartford, Tennessee, with forested banks and whitewater current below the road.',
      caption: 'Pigeon River at Hartford',
      credit: 'Brian Stansberry via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 3.0',
    },
  ],
  'pigeon-river-hartford-denton': [
    {
      id: 'pigeon-river-hartford-commons',
      src: '/gallery/pigeon-river-hartford-denton/pigeon-river-hartford.jpg',
      alt: 'The Pigeon River runs through Hartford, Tennessee, with forested banks and whitewater current below the road.',
      caption: 'Pigeon River at Hartford',
      credit: 'Brian Stansberry via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 3.0',
    },
  ],
  'youghiogheny-river-lower-yough-ohiopyle-bruner-run': [
    {
      id: 'lower-yough-kayaker-commons',
      src: '/gallery/youghiogheny-river-lower-yough-ohiopyle-bruner-run/lower-yough-kayaker.jpg',
      alt: 'A kayaker braces in whitewater on the Youghiogheny River in Ohiopyle State Park.',
      caption: 'Lower Yough whitewater in Ohiopyle State Park',
      credit: 'Andy from Pittsburgh via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'susquehanna-river-towanda-laceyville': [
    {
      id: 'susquehanna-river-laceyville-commons',
      src: '/gallery/susquehanna-river-laceyville-meshoppen/susquehanna-river-laceyville.jpg',
      alt: 'An aerial view shows the Susquehanna River bending past Laceyville through wooded banks and open Pennsylvania valley farmland.',
      caption: 'Susquehanna River near Laceyville',
      credit: 'Bjoertvedt via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'susquehanna-river-laceyville-west-falls': [
    {
      id: 'susquehanna-river-laceyville-commons',
      src: '/gallery/susquehanna-river-laceyville-meshoppen/susquehanna-river-laceyville.jpg',
      alt: 'An aerial view shows the Susquehanna River bending through the Laceyville corridor with wooded banks and open Pennsylvania valley farmland.',
      caption: 'Susquehanna River near Laceyville',
      credit: 'Bjoertvedt via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
    {
      id: 'susquehanna-river-tunkhannock-commons',
      src: '/gallery/susquehanna-river-tunkhannock-whites-ferry/susquehanna-river-tunkhannock.jpg',
      alt: 'An aerial view shows the Susquehanna River curving past the Tunkhannock valley with wooded banks, open hillsides, and broad channel water.',
      caption: 'Susquehanna River in the Tunkhannock corridor',
      credit: 'Bjoertvedt via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'pecatonica-river-wes-block-tuttys': [
    {
      id: 'pecatonica-river-iowa-county-commons',
      src: '/gallery/pecatonica-river-wes-block-tuttys/pecatonica-river-iowa-county-wisconsin.jpg',
      alt: 'The Pecatonica River winds through a calm wooded corridor with green banks and reflective water.',
      caption: 'Pecatonica River corridor',
      credit: 'wackybadger via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'eleven-point-river-cane-bluff-greer-crossing': [
    {
      id: 'eleven-point-river-missouri-commons',
      src: '/gallery/eleven-point-river-cane-bluff-greer-crossing/eleven-point-river-missouri.jpg',
      alt: 'A canoe rests beside the clear Eleven Point River with wooded Ozark banks rising behind the channel.',
      caption: 'Eleven Point River in Missouri',
      credit: 'Charlie Llewellin via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'eleven-point-river-thomasville-cane-bluff': [
    {
      id: 'eleven-point-river-missouri-commons',
      src: '/gallery/eleven-point-river-thomasville-cane-bluff/eleven-point-river-missouri.jpg',
      alt: 'A canoe rests beside the clear Eleven Point River with wooded Ozark banks rising behind the channel.',
      caption: 'Eleven Point River in Missouri',
      credit: 'Charlie Llewellin via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 2.0',
    },
  ],
  'sugar-creek-deers-mill-cox-ford': [
    {
      id: 'sugar-creek-shades-state-park-commons',
      src: '/gallery/sugar-creek-deers-mill-cox-ford/sugar-creek-shades-state-park.png',
      alt: 'Sugar Creek bends around Canoe Island below the wooded bluffs of Shades State Park in Indiana.',
      caption: 'Sugar Creek at Shades State Park',
      credit: 'MrBook via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'wildcat-creek-knop-lake-mis-so-lah': [
    {
      id: 'wildcat-creek-kokomo-commons',
      src: '/gallery/wildcat-creek-knop-lake-mis-so-lah/wildcat-creek-kokomo.jpg',
      alt: 'Wildcat Creek flows past wooded banks in Kokomo, Indiana, with a broad shallow channel.',
      caption: 'Wildcat Creek in Kokomo',
      credit: 'Rapierce via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: public domain',
    },
  ],
  'village-creek-fm418-sh327': [
    {
      id: 'village-creek-silsbee-commons',
      src: '/gallery/village-creek-fm418-sh327/village-creek-near-silsbee.jpg',
      alt: 'Village Creek runs through a sandy, wooded southeast Texas corridor near Silsbee.',
      caption: 'Village Creek near Silsbee',
      credit: 'Jill Carlson via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 2.0',
    },
  ],
  'guadalupe-river-fm766-sh72': [
    {
      id: 'guadalupe-river-cuero-bridge-commons',
      src: '/gallery/guadalupe-river-fm766-sh72/guadalupe-river-cuero-bridge.jpg',
      alt: 'A historic bridge crosses the Guadalupe River southeast of Cuero, Texas, above the broad channel.',
      caption: 'Guadalupe River southeast of Cuero',
      credit: '25or6to4 via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY-SA 3.0',
    },
  ],
  'fox-river-yorkville-whitewater-course': [
    {
      id: 'fox-river-yorkville-course-commons',
      src: '/gallery/fox-river-yorkville-whitewater-course/fox-river-yorkville-course.jpg',
      alt: 'Kayakers paddle the Marge Cline Whitewater Course on the Fox River at Yorkville, Illinois.',
      caption: 'Fox River at Yorkville whitewater course',
      credit: 'David Jakes via Wikimedia Commons',
      takenLabel: 'Wikimedia Commons: CC BY 4.0',
    },
  ],
};

export function getApprovedRoutePhotos(slug: string): RouteGalleryPhoto[] {
  return [...(approvedRoutePhotosBySlug[slug] ?? [])];
}

function stablePhotoIndex(key: string, length: number): number {
  if (length <= 1) {
    return 0;
  }

  let hash = 0;
  for (let index = 0; index < key.length; index += 1) {
    hash = (hash * 31 + key.charCodeAt(index)) % length;
  }
  return hash;
}

export function getRoutePreviewPhoto(route: RoutePhotoTarget): RoutePreviewPhoto {
  const approvedPhotos = getApprovedRoutePhotos(route.slug);
  const key = `${route.riverId ?? 'route'}:${route.slug}`;

  if (approvedPhotos.length > 0) {
    const photo = approvedPhotos[stablePhotoIndex(key, approvedPhotos.length)];
    return {
      ...photo,
      isPlaceholder: false,
    };
  }

  const fallback = placeholderRoutePhotos[stablePhotoIndex(key, placeholderRoutePhotos.length)];
  const routeLabel = [route.name, route.reach].filter(Boolean).join(' - ');
  return {
    ...fallback,
    alt: routeLabel
      ? `Placeholder river image for ${routeLabel}.`
      : fallback.alt,
    isPlaceholder: true,
  };
}
