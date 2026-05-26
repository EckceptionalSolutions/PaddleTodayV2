import { resolveApiUrl } from './api-base-url';

interface PhotoRiver {
  riverId?: string;
  slug: string;
}

const routeGalleryImages: Record<string, string[]> = {
  'des-moines-river-bentonsport-bonaparte': [
    '/gallery/des-moines-river-bentonsport-bonaparte/des-moines-river-bonaparte.jpg',
  ],
  'south-skunk-river-lekwa-sopers-mill': [
    '/gallery/south-skunk-river-lekwa-sopers-mill/skunk-river-iowa.jpg',
  ],
  'south-skunk-river-sleepy-hollow-river-valley': [
    '/gallery/south-skunk-river-sleepy-hollow-river-valley/skunk-river-iowa.jpg',
  ],
  'south-skunk-river-sopers-mill-peterson-park': [
    '/gallery/south-skunk-river-sopers-mill-peterson-park/skunk-river-iowa.jpg',
  ],
  'south-skunk-river-ames-13th-street': [
    '/gallery/south-skunk-river-ames-13th-street/skunk-river-iowa.jpg',
  ],
  'middle-river-forest-park-schildberg': [
    '/gallery/middle-river-forest-park-schildberg/middle-river-iowa-upstream.jpg',
  ],
  'middle-river-schildberg-roseman': [
    '/gallery/middle-river-schildberg-roseman/middle-river-iowa-upstream.jpg',
  ],
  'upper-iowa-river-kendallville-bluffton': [
    '/gallery/upper-iowa-river-kendallville-bluffton/upper-iowa-river-new-albin.jpg',
  ],
  'upper-iowa-river-chimney-rock-malanaphy': [
    '/gallery/upper-iowa-river-chimney-rock-malanaphy/upper-iowa-river-new-albin.jpg',
  ],
  'upper-iowa-river-malanaphy-trout-run': [
    '/gallery/upper-iowa-river-malanaphy-trout-run/upper-iowa-river-new-albin.jpg',
  ],
  'maquoketa-river-mon-maq-pictured-rocks': [
    '/gallery/maquoketa-river-mon-maq-pictured-rocks/maquoketa-river-usgs.jpg',
  ],
  'turkey-river-big-spring-elkader': [
    '/gallery/turkey-river-big-spring-elkader/elkader-keystone-bridge.jpg',
  ],
  'boone-river-riverside-albright': [
    '/gallery/boone-river-riverside-albright/boone-river-iowa.jpg',
  ],
  'big-fork-river-highway-6-south-north': [
    '/gallery/big-fork-river-highway-6-south-north/big-fork-boat-launch.jpg',
  ],
  'red-lake-river-smiley-bridge-centennial-park': [
    '/gallery/red-lake-river-smiley-bridge-centennial-park/red-lake-river-red-lake-falls.jpg',
  ],
  'sauk-river-spring-hill-st-martin': [
    '/gallery/sauk-river-spring-hill-st-martin/sauk-river-sartell.jpg',
  ],
  'cottonwood-river-juenemann-springfield': [
    '/gallery/cottonwood-river-juenemann-springfield/cottonwood-river-flandrau.jpg',
  ],
  'minnesota-river-thompson-ferry-carver': [
    '/gallery/minnesota-river-thompson-ferry-carver/carver-rapids.jpg',
  ],
  'north-fork-crow-river-rockford-riverside': [
    '/gallery/north-fork-crow-river-rockford-riverside/crow-river-rockford.jpg',
  ],
  'south-fork-crow-river-rick-johnson-lake-rebecca': [
    '/gallery/south-fork-crow-river-rick-johnson-lake-rebecca/south-fork-crow-river.jpg',
  ],
  'blue-earth-river-rapidan-county-road-90': [
    '/gallery/blue-earth-river-rapidan-county-road-90/blue-earth-mankato.jpg',
  ],
  'rice-creek-peltier-to-long-lake': [
    '/gallery/rice-creek-peltier-to-long-lake/rice-creek-1.jpg',
    '/gallery/rice-creek-peltier-to-long-lake/rice-creek-2.jpg',
  ],
  'minnehaha-creek-grays-bay-longfellow-lagoon': [
    '/gallery/minnehaha-creek-grays-bay-longfellow-lagoon/minnehaha-creek-oct-2017.jpg',
  ],
  'minnesota-river-judson-land-of-memories': [
    '/gallery/minnesota-river-judson-land-of-memories/land-of-memories-park.jpg',
  ],
  'cannon-river-welch': [
    '/gallery/cannon-river-welch/cannon-welch.jpg',
  ],
  'cannon-river-faribault-dundas': [
    '/gallery/cannon-river-faribault-dundas/cannon-northfield.jpg',
  ],
  'kettle-river-lower-kettle-5-to-6': [
    '/gallery/kettle-river-lower-kettle-5-to-6/kettle-banning-state-park.jpg',
  ],
  'root-river-lanesboro-peterson': [
    '/gallery/root-river-lanesboro-peterson/root-near-peterson.jpg',
  ],
  'root-river-rushford-houston': [
    '/gallery/root-river-rushford-houston/root-river-houston.jpg',
  ],
  'st-croix-river-fox-highway-70': [
    '/gallery/st-croix-river-fox-highway-70/vantage.jpg',
    '/gallery/st-croix-river-fox-highway-70/bluffs-with-branches.jpg',
    '/gallery/st-croix-river-fox-highway-70/lower-lake.jpg',
  ],
  'namekagon-river-big-bend-trego': [
    '/gallery/namekagon-river-big-bend-trego/namekagon-mirror.jpg',
  ],
  'mississippi-river-east-river-flats-hidden-falls': [
    '/gallery/mississippi-river-east-river-flats-hidden-falls/minneapolis-skyline.jpg',
  ],
  'minnesota-river-henderson-belle-plaine': [
    '/gallery/minnesota-river-henderson-belle-plaine/minnesota-valley-refuge.jpg',
  ],
  'mississippi-river-hidden-falls-harriet-island': [
    '/gallery/mississippi-river-hidden-falls-harriet-island/hidden-falls-st-paul.jpg',
  ],
  'kickapoo-river-ontario-rockton': [
    '/gallery/kickapoo-river-ontario-rockton/kickapoo-river-valley.jpg',
  ],
  'wisconsin-river-muscoda-blue-river': [
    '/gallery/wisconsin-river-muscoda-blue-river/wisconsin-river-muscoda-nara.jpg',
  ],
  'upper-iowa-river-cattle-creek-bluffton': [
    '/gallery/upper-iowa-river-cattle-creek-bluffton/upper-iowa-river-new-albin.jpg',
  ],
  'maquoketa-river-backbone-dundee': [
    '/gallery/maquoketa-river-backbone-dundee/backbone-state-park-usgs.jpg',
  ],
  'volga-river-osborne-mederville': [
    '/gallery/volga-river-osborne-mederville/mederville-bridge-volga-river.jpg',
  ],
  'volga-river-mederville-littleport': [
    '/gallery/volga-river-mederville-littleport/mederville-bridge-volga-river.jpg',
  ],
  'turkey-river-elkader-motor-mill': [
    '/gallery/turkey-river-elkader-motor-mill/elkader-keystone-bridge.jpg',
  ],
  'yellow-river-volney-sixteen-bridge': [
    '/gallery/yellow-river-volney-sixteen-bridge/yellow-river-effigy-mounds.jpg',
  ],
  'yellow-river-sixteen-bridge-highway-76': [
    '/gallery/yellow-river-sixteen-bridge-highway-76/yellow-river-effigy-mounds.jpg',
  ],
  'kinnickinnic-river-glen-park-state-park': [
    '/gallery/kinnickinnic-river-glen-park-state-park/kinnickinnic-winter-sunset.jpg',
  ],
  'wisconsin-river-sauk-city-arena': [
    '/gallery/wisconsin-river-sauk-city-arena/wisconsin-river-ferry-bluff.jpg',
  ],
  'wisconsin-river-blue-river-boscobel': [
    '/gallery/wisconsin-river-blue-river-boscobel/wisconsin-river-boscobel-bridge.jpg',
  ],
  'wisconsin-river-boscobel-bridgeport': [
    '/gallery/wisconsin-river-boscobel-bridgeport/bridgeport-bridge-wisconsin-river.jpg',
  ],
  'milwaukee-river-newburg-fredonia': [
    '/gallery/milwaukee-river-newburg-fredonia/milwaukee-river-january-2026.jpg',
  ],
  'grand-river-harpersfield-hidden-valley': [
    '/gallery/grand-river-harpersfield-hidden-valley/grand-river-harpersfield-covered-bridge.jpg',
  ],
  'vermilion-river-schoepfle-mill-hollow': [
    '/gallery/vermilion-river-schoepfle-mill-hollow/vermilion-river-birmingham.jpg',
  ],
  'la-crosse-river-veterans-holiday-heights': [
    '/gallery/la-crosse-river-veterans-holiday-heights/la-crosse-river-trail-bridge.jpg',
  ],
};

const placeholderImages = [
  '/gallery/fallbacks/river-fallback-stream.jpg',
  '/gallery/fallbacks/river-fallback-wide.jpg',
];

export function routePhotoForRiver(river: PhotoRiver) {
  const key = `${river.riverId ?? 'route'}:${river.slug}`;
  const routeImages = routeGalleryImages[river.slug];
  const isPlaceholder = !routeImages?.length;
  const images = isPlaceholder ? placeholderImages : routeImages;
  let hash = 0;
  for (let index = 0; index < key.length; index += 1) {
    hash = (hash * 31 + key.charCodeAt(index)) % images.length;
  }
  return {
    uri: resolveApiUrl(images[hash]),
    isPlaceholder,
  };
}

export function photoForRiver(river: PhotoRiver) {
  return routePhotoForRiver(river).uri;
}
