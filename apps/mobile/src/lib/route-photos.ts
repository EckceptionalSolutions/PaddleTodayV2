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
  'sauk-river-spring-hill-frogtown': [
    '/gallery/sauk-river-spring-hill-st-martin/sauk-river-sartell.jpg',
  ],
  'sauk-river-frogtown-heims-mill': [
    '/gallery/sauk-river-spring-hill-st-martin/sauk-river-sartell.jpg',
  ],
  'sauk-river-st-martin-rockville': [
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
  'shiawassee-river-byron-walnut-hills': [
    '/gallery/shiawassee-river-byron-walnut-hills/shiawassee-river-paddle.jpg',
  ],
  'shiawassee-river-walnut-hills-geeck-road': [
    '/gallery/shiawassee-river-walnut-hills-geeck-road/shiawassee-river-paddle.jpg',
  ],
  'shiawassee-river-geeck-road-shiatown': [
    '/gallery/shiawassee-river-geeck-road-shiatown/shiawassee-river-paddle.jpg',
  ],
  'shiawassee-river-shiatown-lytle': [
    '/gallery/shiawassee-river-shiatown-lytle/shiawassee-river-paddle.jpg',
  ],
  'shiawassee-river-lytle-brady-street': [
    '/gallery/shiawassee-river-lytle-brady-street/shiawassee-river-paddle.jpg',
  ],
  'shiawassee-river-mccurdy-harmon-patridge': [
    '/gallery/shiawassee-river-mccurdy-harmon-patridge/shiawassee-river-paddle.jpg',
  ],
  'shiawassee-river-harmon-patridge-henderson': [
    '/gallery/shiawassee-river-harmon-patridge-henderson/shiawassee-river-paddle.jpg',
  ],
  'shiawassee-river-henderson-ditch-road': [
    '/gallery/shiawassee-river-henderson-ditch-road/shiawassee-river-paddle.jpg',
  ],
  'shiawassee-river-ditch-road-cole-park': [
    '/gallery/shiawassee-river-ditch-road-cole-park/shiawassee-river-paddle.jpg',
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
  'kishwaukee-river-hickory-bills-distillery': [
    '/gallery/kishwaukee-river-hickory-bills-distillery/kishwaukee-river-state-fish-wildlife-area.jpg',
  ],
  'clinton-river-rotary-budd': [
    '/gallery/clinton-river-rotary-budd/clinton-river-macomb-county.jpg',
  ],
  'clinton-river-budd-shadyside': [
    '/gallery/clinton-river-budd-shadyside/clinton-river-macomb-county.jpg',
  ],
  'clinton-river-shadyside-macarthur': [
    '/gallery/clinton-river-shadyside-macarthur/clinton-river-macomb-county.jpg',
  ],
  'clinton-river-macarthur-harley-ensign': [
    '/gallery/clinton-river-macarthur-harley-ensign/clinton-river-macomb-county.jpg',
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
  'kansas-river-seward-lecompton': [
    '/gallery/kansas-river-seward-lecompton/kansas-river-lawrence.jpg',
  ],
  'kansas-river-lecompton-lawrence-riverfront': [
    '/gallery/kansas-river-lecompton-lawrence-riverfront/kansas-river-lawrence.jpg',
  ],
  'kansas-river-lawrence-8th-eudora': [
    '/gallery/kansas-river-lawrence-8th-eudora/kansas-river-lawrence.jpg',
  ],
  'kansas-river-eudora-de-soto': [
    '/gallery/kansas-river-eudora-de-soto/kansas-river-lawrence.jpg',
  ],
  'kansas-river-de-soto-edwardsville': [
    '/gallery/kansas-river-de-soto-edwardsville/kansas-river-kansas-city.jpg',
  ],
  'kansas-river-edwardsville-turner-bridge': [
    '/gallery/kansas-river-edwardsville-turner-bridge/kansas-river-kansas-city.jpg',
  ],
  'kansas-river-junction-city-ogden': [
    '/gallery/kansas-river-junction-city-ogden/kansas-river-lawrence.jpg',
  ],
  'kansas-river-ogden-manhattan': [
    '/gallery/kansas-river-ogden-manhattan/kansas-river-lawrence.jpg',
  ],
  'kansas-river-manhattan-st-george': [
    '/gallery/kansas-river-manhattan-st-george/kansas-river-lawrence.jpg',
  ],
  'kansas-river-st-george-wamego': [
    '/gallery/kansas-river-st-george-wamego/kansas-river-lawrence.jpg',
  ],
  'kansas-river-wamego-belvue': [
    '/gallery/kansas-river-wamego-belvue/kansas-river-lawrence.jpg',
  ],
  'kansas-river-belvue-kaw-river-state-park': [
    '/gallery/kansas-river-belvue-kaw-river-state-park/kansas-river-lawrence.jpg',
  ],
  'kansas-river-topeka-water-plant-seward': [
    '/gallery/kansas-river-topeka-water-plant-seward/kansas-river-lawrence.jpg',
  ],
  'kansas-river-turner-bridge-kaw-point': [
    '/gallery/kansas-river-turner-bridge-kaw-point/kansas-river-kansas-city.jpg',
  ],
  'current-river-cedar-grove-akers': [
    '/gallery/current-river-cedar-grove-akers/current-river-welch-spring.jpg',
  ],
  'current-river-akers-ferry-pulltite': [
    '/gallery/current-river-akers-ferry-pulltite/current-river-welch-spring.jpg',
  ],
  'current-river-pulltite-round-spring': [
    '/gallery/current-river-pulltite-round-spring/current-river-welch-spring.jpg',
  ],
  'jacks-fork-river-buck-hollow-rymers': [
    '/gallery/jacks-fork-river-buck-hollow-rymers/jacks-fork-upper.jpg',
  ],
  'jacks-fork-river-alley-spring-chilton': [
    '/gallery/jacks-fork-river-alley-spring-chilton/jacks-fork-upper.jpg',
  ],
  'jacks-fork-river-bay-creek-alley-spring': [
    '/gallery/jacks-fork-river-bay-creek-alley-spring/jacks-fork-upper.jpg',
  ],
  'current-river-waymeyer-van-buren': [
    '/gallery/current-river-waymeyer-van-buren/ozark-riverways-canoeing.jpg',
  ],
  'current-river-van-buren-big-spring': [
    '/gallery/current-river-van-buren-big-spring/ozark-riverways-canoeing.jpg',
  ],
  'current-river-big-spring-gooseneck': [
    '/gallery/current-river-big-spring-gooseneck/ozark-riverways-canoeing.jpg',
  ],
  'eleven-point-river-greer-crossing-turner-mill': [
    '/gallery/eleven-point-river-greer-crossing-turner-mill/eleven-point-river-missouri.jpg',
  ],
  'eleven-point-river-turner-mill-south-whitten': [
    '/gallery/eleven-point-river-turner-mill-south-whitten/eleven-point-river-missouri.jpg',
  ],
  'eleven-point-river-whitten-riverton': [
    '/gallery/eleven-point-river-whitten-riverton/eleven-point-river-missouri.jpg',
  ],
  'eleven-point-river-riverton-narrows': [
    '/gallery/eleven-point-river-riverton-narrows/eleven-point-river-missouri.jpg',
  ],
  'north-fork-white-river-north-fork-blair': [
    '/gallery/north-fork-white-river-north-fork-blair/upper-north-fork-bridge.jpg',
  ],
  'north-fork-white-river-blair-dawt': [
    '/gallery/north-fork-white-river-blair-dawt/upper-north-fork-bridge.jpg',
  ],
  'meramec-river-onondaga-campbell-bridge': [
    '/gallery/meramec-river-onondaga-campbell-bridge/meramec-river-onondaga.jpg',
  ],
  'meramec-river-scotts-ford-riverview': [
    '/gallery/meramec-river-scotts-ford-riverview/meramec-river-onondaga.jpg',
  ],
  'meramec-river-campbell-bridge-sappington-bridge': [
    '/gallery/meramec-river-campbell-bridge-sappington-bridge/meramec-river-onondaga.jpg',
  ],
  'meramec-river-sappington-bridge-meramec-state-park': [
    '/gallery/meramec-river-sappington-bridge-meramec-state-park/meramec-valley-park.jpg',
  ],
  'meramec-river-state-park-sand-ford': [
    '/gallery/meramec-river-state-park-sand-ford/meramec-valley-park.jpg',
  ],
  'bryant-creek-sycamore-warren-bridge': [
    '/gallery/bryant-creek-sycamore-warren-bridge/bryant-creek-state-park.jpg',
  ],
  'big-piney-river-east-gate-bookers-bend': [
    '/gallery/big-piney-river-east-gate-bookers-bend/big-piney-river-mo-17.jpg',
  ],
  'big-piney-river-sandy-shoals-boiling-spring': [
    '/gallery/big-piney-river-sandy-shoals-boiling-spring/big-piney-river-mo-17.jpg',
  ],
  'big-piney-river-mason-bridge-slabtown': [
    '/gallery/big-piney-river-mason-bridge-slabtown/big-piney-river-mo-17.jpg',
  ],
  'big-piney-river-slabtown-ross': [
    '/gallery/big-piney-river-slabtown-ross/big-piney-river-mo-17.jpg',
  ],
  'big-piney-river-boiling-spring-mason-bridge': [
    '/gallery/big-piney-river-boiling-spring-mason-bridge/big-piney-river-mo-17.jpg',
  ],
  'big-piney-river-dogs-bluff-mineral-springs': [
    '/gallery/big-piney-river-dogs-bluff-mineral-springs/big-piney-river-mo-17.jpg',
  ],
  'james-river-delaware-town-shelvin-rock': [
    '/gallery/james-river-delaware-town-shelvin-rock/james-river-springfield.jpg',
  ],
  'james-river-shelvin-rock-hooten-town': [
    '/gallery/james-river-shelvin-rock-hooten-town/james-river-springfield.jpg',
  ],
  'james-river-hl-kerr-ralph-cox': [
    '/gallery/james-river-hl-kerr-ralph-cox/james-river-springfield.jpg',
  ],
  'skunk-creek-legacy-park-farm-field': [
    '/gallery/skunk-creek-legacy-park-farm-field/skunk-creek-big-sioux-confluence.jpg',
  ],
  'big-sioux-river-farm-field-rotary': [
    '/gallery/big-sioux-river-farm-field-rotary/big-sioux-southern-sioux-falls-bridge.jpg',
  ],
  'split-rock-creek-split-rock-park-palisades': [
    '/gallery/split-rock-creek-split-rock-park-palisades/palisades-split-rock-creek.jpg',
  ],
  'vermilion-river-lowell-oglesby': [
    '/gallery/vermilion-river-lowell-oglesby/vermilion-river-pontiac.jpg',
  ],
  'flambeau-river-highway-w-hervas': [
    '/gallery/flambeau-river-highway-w-hervas/flambeau-river-state-forest.jpg',
  ],
  'flambeau-river-hervas-beaver-dam': [
    '/gallery/flambeau-river-hervas-beaver-dam/flambeau-river-near-bruce-usgs.jpg',
  ],
  'shoal-creek-tipton-ford-wildcat': [
    '/gallery/shoal-creek-tipton-ford-wildcat/shoal-creek-inspiration-point.jpg',
  ],
  'buffalo-river-ponca-kyles-landing': [
    '/gallery/buffalo-river-ponca-kyles-landing/buffalo-river-ponca-low-water-bridge.jpg',
  ],
  'buffalo-river-pruitt-hasty': [
    '/gallery/buffalo-river-pruitt-hasty/buffalo-river-pruitt-landing.jpg',
  ],
  'buffalo-river-kyles-landing-pruitt': [
    '/gallery/buffalo-river-kyles-landing-pruitt/buffalo-river-ozark-pruitt-trail.jpg',
  ],
  'buffalo-river-steel-creek-hasty': [
    '/gallery/buffalo-river-pruitt-hasty/buffalo-river-pruitt-landing.jpg',
  ],
  'buffalo-river-kyles-landing-hasty': [
    '/gallery/buffalo-river-pruitt-hasty/buffalo-river-pruitt-landing.jpg',
  ],
  'buffalo-river-erbie-hasty': [
    '/gallery/buffalo-river-pruitt-hasty/buffalo-river-pruitt-landing.jpg',
  ],
  'buffalo-river-tyler-bend-gilbert': [
    '/gallery/buffalo-river-tyler-bend-gilbert/buffalo-river-gilbert-aerial.jpg',
  ],
  'cossatot-river-ed-banks-highway-278': [
    '/gallery/cossatot-river-ed-banks-highway-278/cossatot-river-usace.jpg',
  ],
  'mulberry-river-redding-turner-bend': [
    '/gallery/mulberry-river-redding-turner-bend/mulberry-river-bridge.jpg',
  ],
  'ouachita-river-remmel-whitewater-park': [
    '/gallery/ouachita-river-remmel-whitewater-park/remmel-dam.jpg',
  ],
  'gasconade-river-rollins-ferry-pointers-creek': [
    '/gallery/gasconade-river-rollins-ferry-pointers-creek/gasconade-river-usgs.jpg',
  ],
  'gasconade-river-pointers-creek-cooper-hill': [
    '/gallery/gasconade-river-pointers-creek-cooper-hill/gasconade-river-usgs.jpg',
  ],
  'big-south-fork-burnt-mill-leatherwood': [
    '/gallery/big-south-fork-burnt-mill-leatherwood/big-south-fork-leatherwood-ford.jpg',
  ],
  'south-chickamauga-creek-shallowford-sterchi': [
    '/gallery/south-chickamauga-creek-shallowford-sterchi/south-chickamauga-audubon-acres.jpg',
  ],
  'pigeon-river-waterville-hartford': [
    '/gallery/pigeon-river-waterville-hartford/pigeon-river-hartford.jpg',
  ],
  'pigeon-river-hartford-denton': [
    '/gallery/pigeon-river-hartford-denton/pigeon-river-hartford.jpg',
  ],
  'floyds-fork-fisherville-cane-run': [
    '/gallery/floyds-fork-fisherville-cane-run/floyds-fork-april-2024.jpg',
  ],
  'slate-creek-lions-club-old-slate-furnace': [
    '/gallery/slate-creek-lions-club-old-slate-furnace/slate-creek-owingsville-usgs.jpg',
  ],
  'levisa-fork-cedar-creek-thompson-road': [
    '/gallery/levisa-fork-cedar-creek-thompson-road/levisa-fork-pikeville.jpg',
  ],
  'levisa-fork-prestonsburg-airport': [
    '/gallery/levisa-fork-cedar-creek-thompson-road/levisa-fork-pikeville.jpg',
  ],
  'levisa-fork-airport-boat-ramp': [
    '/gallery/levisa-fork-cedar-creek-thompson-road/levisa-fork-pikeville.jpg',
  ],
  'levisa-fork-prestonsburg-boat-ramp': [
    '/gallery/levisa-fork-cedar-creek-thompson-road/levisa-fork-pikeville.jpg',
  ],
  'elkhorn-creek-vpa-3-aw-access': [
    '/gallery/elkhorn-creek-vpa-3-aw-access/north-fork-elkhorn-creek.jpg',
  ],
  'youghiogheny-river-lower-yough-ohiopyle-bruner-run': [
    '/gallery/youghiogheny-river-lower-yough-ohiopyle-bruner-run/lower-yough-kayaker.jpg',
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
