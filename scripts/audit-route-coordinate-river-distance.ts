import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { endpointSnappedRiverNetwork } from '@paddletoday/geo';
import { routeInventory } from '../src/data/rivers';
import { riverTripDetails } from '../src/data/river-trip-details';
import type { River, RiverAccessPoint } from '../src/lib/types';
import { accessNamesAgree } from './lib/access-name-match';

type Severity = 'ok' | 'review' | 'suspicious' | 'failure' | 'unknown';
type EndpointLabel = 'putIn' | 'takeOut' | 'accessPoint';

interface ArcGisFeature {
  attributes: Record<string, string | number | null>;
  geometry?: {
    paths?: number[][][];
    rings?: number[][][];
  };
}

interface ArcGisResponse {
  features?: ArcGisFeature[];
  error?: {
    message?: string;
  };
}

interface EndpointAudit {
  routeId: string;
  routeName: string;
  reach: string;
  state: string;
  endpoint: EndpointLabel;
  endpointName: string;
  latitude: number;
  longitude: number;
  matchedRiverName: string | null;
  distanceFeetToMatchedRiver: number | null;
  nearestMatchedLatitude: number | null;
  nearestMatchedLongitude: number | null;
  nearestWaterwayName: string | null;
  distanceFeetToNearestWaterway: number | null;
  nearestWaterwayLatitude: number | null;
  nearestWaterwayLongitude: number | null;
  nearestWaterbodyName: string | null;
  distanceFeetToNearestWaterbody: number | null;
  nearestWaterbodyLatitude: number | null;
  nearestWaterbodyLongitude: number | null;
  endpointOnWaterbody: boolean;
  matchedHydrographyMode: 'named-flowline' | 'connected-network' | null;
  coordinateEvidenceRole: 'authoritative-area-anchor' | 'authoritative-water-entry' | null;
  coordinateEvidenceSourceUrl: string | null;
  coordinateEvidenceDetail: string | null;
  severity: Severity;
  note: string;
}

type AreaAnchorControl = {
  state: string;
  provider: string;
  featureId: string;
  name: string;
  aliases: string[];
  latitude: number;
  longitude: number;
  uncertaintyFeet: number;
  sourceUrl: string;
  method: string;
};

type OfficialAlternateWaterwayControl = {
  state: string;
  name: string;
  aliases: string[];
  waterbody: string;
  routeWaterbody: string;
  relationship: 'downstream-after-confluence' | 'tributary-before-confluence' | 'connected-water-trail-waterbody';
  sourceUrl: string;
};

type OfficialWaterEntryControl = {
  state: string;
  provider: string;
  featureId: string;
  name: string;
  aliases: string[];
  waterbody: string;
  latitude: number;
  longitude: number;
  uncertaintyFeet: number;
  sourceUrl: string;
  method: string;
  terminalAlternateWaterbody?: {
    routeWaterbody: string;
    relationship: 'downstream-after-confluence' | 'tributary-before-confluence' | 'connected-water-trail-waterbody';
    sourceUrl: string;
  };
};

type OfficialMapControls = {
  providers?: Array<{
    id: string;
    state: string;
    sourceUrl: string;
    coordinateRole: string;
    method: string;
    controls?: Array<{
      featureId: string;
      name: string;
      aliases?: string[];
      waterbody?: string;
      latitude: number;
      longitude: number;
      uncertaintyFeet?: number | null;
      terminalAlternateWaterbody?: {
        routeWaterbody: string;
        relationship: 'downstream-after-confluence' | 'tributary-before-confluence' | 'connected-water-trail-waterbody';
        sourceUrl: string;
      };
    }>;
  }>;
};

const root = process.cwd();
const cacheDir = path.join(root, 'node_modules', '.cache', 'route-coordinate-river-audit');
const reportPath = path.join(root, 'docs', 'route-coordinate-river-audit.json');
const officialMapControlsPath = path.join(root, 'src', 'data', 'route-access-official-map-controls.json');
const nhdFlowlineQueryUrl = 'https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/6/query';
const nhdWaterbodyQueryUrl = 'https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/12/query';
const nhdAreaQueryUrl = 'https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/9/query';
const feetPerMile = 5280;
const earthRadiusMiles = 3958.8;

// Some published paddling reaches intentionally end on a named tributary,
// branch, confluence, or access channel. Keep these explicit so a strict
// route-name match does not turn a valid endpoint into a coordinate failure.
const acceptedAlternateWaterways: Record<string, string[]> = {
  'root-river-preston-lanesboro': ['South Branch Root River'],
  'des-moines-river-south-fraser-waterworks-upstream': ['Bass Point Creek'],
  'south-fork-crow-river-rick-johnson-lake-rebecca': ['Crow River'],
  'green-river-greensburg-city-ramp-lynn-camp-creek': ['Lynn Camp Creek'],
  'green-river-american-legion-lynn-camp-creek': ['Lynn Camp Creek'],
  'green-river-glenview-road-lynn-camp-creek': ['Lynn Camp Creek'],
  'green-river-lynn-camp-creek-rio-carrydown': ['Lynn Camp Creek'],
  'green-river-lynn-camp-creek-hh-wilson-park': ['Lynn Camp Creek'],
  'current-river-akers-ferry-round-spring': ['Spring Valley Creek'],
  'current-river-cedar-grove-round-spring': ['Spring Valley Creek'],
  'current-river-pulltite-round-spring': ['Spring Valley Creek'],
  'susquehanna-river-sayre-towanda': ['Chemung River'],
  'susquehanna-river-sayre-wysox-township-park': ['Chemung River'],
  'minnehaha-creek-grays-bay-longfellow-lagoon': ['Mississippi River'],
  'skunk-creek-legacy-park-farm-field': ['Big Sioux River'],
};
const acceptedAccessAnchorWaterbodyFeet: Record<string, number> = {
  // Minnesota DNR's Friberg/Hwy 210 access is an official river landing;
  // the access anchor is outside the generalized NHD polygon.
  'otter-tail-river-friberg-hwy-210': 1200,
  'shell-rock-river-heery-woods-renning': 1500,
  'shell-rock-river-renning-shell-rock': 1500,
  // The official USFS Sheyenne River Water Trail identifies these as named
  // hand-launch sites; generalized NHD polygons are several thousand feet
  // from the access/parking anchors.
  'sheyenne-river-mirror-pool-east-river': 9000,
  'sheyenne-river-brome-field-east-river': 9000,
  'sheyenne-river-brome-field-mirror-pool': 7000,
  'sheyenne-river-ylvisaker-bridge-brome-field': 6000,
  // Nebraska Game & Parks documents the Schramm/Platte River State Park
  // canoe access as part of the Platte River Water Trail.
  'platte-river-schramm-platte-river-state-park': 7000,
  'platte-river-platte-river-state-park-louisville': 7000,
  // PFBC identifies Terrytown as a North Branch Susquehanna access downstream
  // of Wysox; the ramp anchor is offset from the generalized flowline.
  'susquehanna-river-ulster-bridge-terrytown': 7000,
  'susquehanna-river-hornbrook-terrytown': 7000,
  'susquehanna-river-towanda-terrytown': 7000,
  'susquehanna-river-wysox-township-park-terrytown': 7000,
  // Laceyville's municipal river access is documented on the North Branch
  // Susquehanna water trail, with the coordinate representing the town-side
  // access/parking anchor rather than the generalized channel line.
  'susquehanna-river-towanda-laceyville': 3000,
  'susquehanna-river-laceyville-west-falls': 3000,
  // Minnesota DNR's Red River State Water Trail lists Lincoln Drive Park as
  // the river-mile 304.1 put-in; the stored point is a park/landing anchor.
  'red-river-lincoln-drive-downtown': 7000,
  // Iowa DNR's West Nishnabotna water-trail plan names Edgington Memorial
  // Park in Avoca as the trail's starting access.
  'west-nishnabotna-river-avoca-hancock': 7000,
  // Iowa DNR/Greene County water-trail materials identify Adkins Bridge and
  // Henderson Park as North Raccoon River access sites.
  'north-raccoon-river-squirrel-hollow-adkins': 7500,
  'north-raccoon-river-eureka-henderson': 6000,
  'north-raccoon-river-henderson-squirrel-hollow': 6000,
  // Iowa DNR and Linn County identify Chain Lakes/Palo and Ellis Harbor as
  // Cedar River boat/canoe access points; these are park/harbor anchors.
  'cedar-river-chain-lakes-ellis-harbor': 5500,
  // Iowa DNR/Jones County documents Pictured Rocks Park as a Maquoketa River
  // access; the saved point is the park-side ramp anchor.
  'maquoketa-river-pictured-rocks-ebys-mill': 8500,
  // LCRA publishes FM 973 / Del Valle Bridge as a lower-Colorado access point
  // with rounded bridge/parking coordinates, not a precise wetted-edge landing.
  'colorado-river-texas-river-school-fm973': 600,
  // Iowa DNR's Boone River water-trail guide names Albright, Tunnel Mill,
  // Bell's Mill, and Boone Forks as the successive access sites.
  'boone-river-albright-tunnel-mill': 3500,
  'boone-river-tunnel-mill-bells-mill': 3500,
  'boone-river-bells-mill-boone-forks': 3000,
  // Story County's official South Skunk water-trail list names these access
  // points and confirms the route is on the South Skunk River.
  'south-skunk-river-river-valley-cj-shreck': 3000,
  'south-skunk-river-lekwa-sopers-mill': 2500,
  // South Dakota GFP's Jay Heath access layer and Mary Jo Wegner Arboretum
  // document the Highway 42 canoe access as an official parking/launch area;
  // the stored point is an access anchor next to the bridge, not the exact
  // water-entry pixel on the generalized Big Sioux flowline.
  'big-sioux-river-rec-area-south-highway-42': 500,
  'big-sioux-river-highway-42-grandview': 500,
  // Nebraska Game & Parks' Loup River Water Trail guide names the Monroe
  // access, George Syas WMA access, and the Columbus takeout corridor.
  'loup-river-monroe-adm-access': 8000,
  'loup-river-columbus-adm-access': 8000,
  'loup-river-george-syas-adm-access': 8000,
  'loup-river-george-syas-monroe': 3500,
  'loup-river-monroe-columbus': 3500,
  'loup-river-george-syas-columbus': 3000,
  // Iowa DNR's Lower Des Moines water-trail materials list Austin Park and
  // the Fraser/E-26 access as Des Moines River trail access points.
  'des-moines-river-austin-park-keosauqua': 3500,
  'des-moines-river-douds-austin-park': 3500,
  'des-moines-river-south-fraser-waterworks-upstream': 3000,
  // Minnesota DNR's Red River State Water Trail lists North Dam carry-in
  // access and MB Johnson Park as the documented river-mile access pair.
  'red-river-lindenwood-mb-johnson': 3000,
  // Minnesota DNR lists the Overlook Park-to-Belle Prairie section on the
  // Mississippi State Water Trail and identifies both access anchors.
  'mississippi-river-overlook-belle-prairie': 2500,
  'mississippi-river-fletcher-creek-overlook': 2500,
  // Minnesota DNR's Pine State Water Trail lists Norway Lake South and Pine
  // River #1 as the paired access sites.
  'pine-river-norway-pine-river-1': 2500,
  // The North Branch Susquehanna trail guide identifies Wetlands Nature Area
  // Access at river mile 166 near Bloomsburg.
  'susquehanna-river-canal-park-wetlands': 2200,
  'susquehanna-river-wetlands-bloomsburg': 2200,
  // Minnesota DNR's Rum River State Water Trail and Ramsey/Anoka park pages
  // identify Rum River Central Regional Park as a canoe/boat access.
  'rum-river-north-county-central': 2200,
  // Iowa DNR identifies Briggs Woods Park as a Boone River canoe access.
  'boone-river-riverside-briggs-woods': 2200,
  'boone-river-briggs-woods-albright': 2200,
  // Iowa DNR/Jackson County North Fork Maquoketa water-trail materials name
  // Ozark Bridge (21st Avenue) and Caven Bridge as access points.
  'north-fork-maquoketa-river-d61-ozark': 2200,
  'north-fork-maquoketa-river-cascade-ozark': 2200,
  'north-fork-maquoketa-river-ozark-caven': 2200,
  // Sac County and Iowa DNR identify Vogel Access and Hagge Park as North
  // Raccoon River Water Trail access sites.
  'north-raccoon-river-vogel-riverview': 2200,
  'north-raccoon-river-sac-city-hagge': 2000,
  'north-raccoon-river-hagge-white-horse': 2000,
  // Iowa DNR's Little Sioux map identifies Riverside/Peterson access near
  // Linn Grove on the Little Sioux River.
  'little-sioux-river-linn-grove-peterson': 2500,
  // Jones County/Iowa DNR identify Stone City and Quasqueton Park as
  // Wapsipinicon River access sites.
  'wapsipinicon-river-stone-city-anamosa': 2000,
  'wapsipinicon-river-independence-quasqueton': 1400,
  // Anoka County's Rice Creek Water Trail starts at Peltier Lake and ends at
  // Long Lake Regional Park; both are documented public launch anchors.
  'rice-creek-peltier-to-long-lake': 2000,
  // Minnesota DNR's Sauk River State Water Trail lists Rockville County Park
  // as a carry-in access.
  'sauk-river-frogtown-rockville': 1200,
  'sauk-river-rockville-miller-landing': 1200,
  'sauk-river-rockville-knights-of-columbus': 1200,
  'sauk-river-rockville-heims-mill': 1200,
  'sauk-river-pineview-heims-mill': 1600,
  'sauk-river-mill-pond-oak-township': 4000,
  'sauk-river-oak-township-spring-hill': 4000,
  // Iowa DNR's Maquoketa water-trail plan and Dundee Wildlife Area identify
  // this as a Maquoketa River canoe/kayak access.
  'maquoketa-river-dundee-manchester': 1200,
  'maquoketa-river-backbone-dundee': 1200,
  'north-fork-maquoketa-river-d61-caven': 1200,
  'north-fork-maquoketa-river-cascade-caven': 1200,
  // Arkansas Game & Fish identifies WOKA as the Illinois River Water Trail
  // endpoint downstream of Chamber Springs and Siloam Springs.
  'upper-illinois-river-siloam-kayak-park-woka': 1700,
  'upper-illinois-river-chamber-springs-woka': 1700,
  // Rockville's official park page and Minnesota DNR's Sauk trail identify
  // Eagle Park as a Sauk River access point.
  'sauk-river-frogtown-eagle-park': 1200,
  'sauk-river-eagle-knights-of-columbus': 1200,
  'sauk-river-eagle-miller-landing': 1200,
  'sauk-river-eagle-heims-mill': 1200,
  // PFBC identifies Wysox Township Park as North Branch Susquehanna boating
  // access; the stored points are park-side anchors.
  'susquehanna-river-hornbrook-wysox-township-park': 1500,
  'susquehanna-river-sayre-wysox-township-park': 1500,
  'susquehanna-river-ulster-bridge-wysox-township-park': 1500,
  // Three Rivers Park District and Minnesota DNR identify Mississippi Gateway
  // Regional Park as a carry-in access on the Mississippi River.
  'mississippi-river-dayton-mississippi-gateway': 1500,
  // NPS identifies Tyler Bend, Grinders Ferry, and Gilbert as Buffalo River
  // access points in the Middle District.
  'buffalo-river-tyler-bend-gilbert': 1600,
  'buffalo-river-tyler-bend-grinders-ferry': 1600,
  // Iowa DNR identifies Highway 30 Access as a Des Moines River access;
  // the stored point is the roadside ramp/parking anchor rather than the channel.
  'des-moines-river-highway-30-sportsman': 13000,
  // PFBC's Juniata Lower Water Trail guide lists Lewistown Narrows as a surfaced
  // ramp on the Juniata River; the point is the access-road anchor.
  'juniata-river-lewistown-narrows-newport': 1200,
  // Iowa DNR's Black Hawk Creek water-trail plan lists Ranchero Road as Access 8
  // in Katoski Greenbelt, a carry-down access on the creek.
  'black-hawk-creek-hudson-waterloo': 400,
  'black-hawk-creek-ranchero-hope-martin': 400,
  // City of Ann Arbor identifies Gallup Park Livery as a public boat launch and
  // canoe livery on the Huron River; the stored point is the park-side anchor.
  'huron-river-argo-gallup': 900,
  // Missouri Department of Conservation identifies Cooper Hill as a hand-launch
  // access to the Gasconade River from the parking area/road anchor.
  'gasconade-river-pointers-creek-cooper-hill': 1000,
  // Ohio's Vermilion River access guide lists Schoepfle Garden/Community Center
  // as an access site on the Vermilion River; the point is park-side.
  'vermilion-river-schoepfle-mill-hollow': 1100,
  // Iowa DNR's Des Moines River water-trail map documents Hydro-electric Park to
  // South River District Access and the downstream South River District reach.
  'des-moines-river-hydro-electric-south-river': 900,
  'des-moines-river-fort-dodge-lehigh': 900,
  // Richland Center's official Pine River page documents the canoe-port system;
  // Canoe Port 4/Seminary Street is a city-side landing anchor.
  'pine-river-richland-center-canoe-port-1-port-4': 1400,
  // Minnesota DNR's Zumbro water-trail map explicitly lists Zumbro Falls
  // carry-in access as the take-out for the recommended river segment.
  'zumbro-river-falls': 1000,
  // Wisconsin DNR/Travel Wisconsin document the navigable Lemonweir and Mauston
  // river access; the stored dam-side point is a shore/parking anchor.
  'lemonweir-river-mauston-dam-19th-ave': 1000,
  // The Upper Iowa paddlers guide identifies Kumpf Access (river mile 15.1)
  // as the take-out on the Upper Iowa River.
  'upper-iowa-river-iverson-bridge-kumpf': 3400,
  // Minnesota/Iowa DNR Cedar River water-trail map explicitly lists State Line
  // Road carry-in access at the river border.
  'cedar-river-riverwood-state-line': 1400,
  // Iowa DNR/Turkey River Water Trail guide lists Clermont Canoe Access #64B
  // and Gouldsburg Park Access #98 on the Turkey/Little Turkey system.
  'turkey-river-clermont-gilbertson': 1600,
  'little-turkey-river-gouldsburg-eldorado': 1100,
  // PFBC's North Branch Susquehanna guide lists Larnard Hornbrook Park as a
  // surfaced ramp on the Susquehanna River.
  'susquehanna-river-hornbrook-towanda': 700,
  // Kings River watershed/outfitter access references identify Rockhouse as a
  // public float access on the Kings River (the landing is on Warm Fork Creek).
  'kings-river-rockhouse-trigger-gap': 1800,
  // City of Fertile identifies William Rhodes Island Park as a Winnebago River
  // park with canoe access near the dam.
  'winnebago-river-fertile-mason-city': 900,
  // Trempealeau paddling references identify Four Seasons Park as the take-out
  // for the Whitehall-to-Independence river section.
  'trempealeau-river-whitehall-independence': 800,
  // American Whitewater identifies the Cedarburg Mill/Rebellion Brewing put-in
  // immediately beside Cedar Creek (shore/eddy access under the bridge).
  'cedar-creek-cedarburg-mill-cth-t': 800,
  // The documented Bluemound Road take-out is a shore opening beneath the
  // bridge, with parking on the dead-end access road (not a channel point).
  'menomonee-river-hoyt-park-bluemound': 950,
  // Iowa's canoe guide notes bridge-based entries/exits are common on the
  // Nishnabotna, and the USGS flood-study station identifies the county-road
  // bridge near Essex as crossing the East Nishnabotna River.
  'east-nishnabotna-river-red-oak-essex': 6000,
};

// The Otter Tail NHD name match selects a disconnected generalized flowline,
// while Minnesota's public-water-access service resolves all three selected
// landings by site ID and river mile. Keep this single, source-backed exception
// visible in code instead of moving authoritative access coordinates to fit NHD.
const acceptedOfficialAccessFlowlineFeet: Record<string, number> = {
  'otter-tail-river-friberg-hwy-210': 13000,
};
// Some named access points are well documented but NHD returns no named
// flowline in the route bounding box (often because the endpoint is on a
// spring branch, backwater, or bridge-side access). Keep these conservative
// waterbody-distance limits so they become review items rather than opaque
// unknowns; they still require manual confirmation.
const acceptedNoFlowlineAccessWaterbodyFeet: Record<string, number> = {
  'st-croix-river-william-obrien-boomsite': 400,
  'jacks-fork-river-rymers-alley-spring': 400,
  'jacks-fork-river-highway-17-alley-spring': 400,
  'jacks-fork-river-bay-creek-alley-spring': 400,
  'jacks-fork-river-blue-spring-alley-spring': 400,
  'jacks-fork-river-alley-spring-chilton': 400,
  'north-fork-white-river-north-fork-blair': 500,
  'upper-cumberland-river-williamsburg-redbird': 300,
  'upper-cumberland-river-williamsburg-longbottom': 300,
  'upper-cumberland-river-williamsburg-thunderstruck': 300,
  'upper-cumberland-river-williamsburg-cumberland-falls': 300,
  'st-croix-river-wild-river-lions-park': 500,
  'st-louis-river-county-road-4-95': 2600,
  'st-louis-river-county-road-95-forbes': 800,
  'st-louis-river-county-29-floodwood': 1900,
  'st-louis-river-floodwood-paupores': 1900,
  'bad-axe-north-fork-duck-egg-hwy-o': 3600,
  // Wisconsin DNR identifies Ludden Lake as the Mineral Point Branch
  // impoundment; the documented boat ramp is a lake-side access anchor.
  'pecatonica-river-mineral-point-ludden-north-oak': 4000,
};

const args = new Set(process.argv.slice(2));
const shouldRefresh = args.has('--refresh');
const shouldUseCache = !args.has('--no-cache');
const routeArg = process.argv.find((arg) => arg.startsWith('--route='));
const routeFilter = routeArg?.slice('--route='.length);
const concurrencyArg = process.argv.find((arg) => arg.startsWith('--concurrency='));
const concurrency = Math.max(1, Math.min(8, Number(concurrencyArg?.slice('--concurrency='.length) || 4)));

function usage() {
  console.log([
    'Usage: tsx scripts/audit-route-coordinate-river-distance.ts [--refresh] [--no-cache] [--route=<route-id>] [--concurrency=<1-8>]',
    '',
    'Audits put-in and take-out coordinates against USGS NHD named flowlines and waterbody/area polygons.',
    `Writes ${path.relative(root, reportPath)}.`,
  ].join('\n'));
}

if (args.has('--help')) {
  usage();
  process.exit(0);
}

function escapeSqlLiteral(value: string) {
  return value.replace(/'/g, "''").toUpperCase();
}

function normalizeName(value: string | null | undefined) {
  return (value ?? '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(?:the)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function waterwayNameMatchesRoute(routeId: string, routeName: string, candidateName: string | null, additionalAlternates: string[] = []) {
  const route = normalizeName(routeName);
  const candidate = normalizeName(candidateName);
  if (!route || !candidate) return false;
  if (candidate === route) return true;
  if ([...(acceptedAlternateWaterways[routeId] ?? []), ...additionalAlternates]
    .some((name) => normalizeName(name) === candidate)) return true;

  // NHD commonly distinguishes a named branch/fork where the route catalog
  // uses the parent waterway name (for example, South Branch Root River).
  const branchPrefix = /^(?:north|south|east|west|middle|main) (?:branch|fork) /;
  return branchPrefix.test(candidate) && candidate.replace(branchPrefix, '') === route;
}

function endpointCoordinates(point?: RiverAccessPoint) {
  if (!point || !Number.isFinite(point.latitude) || !Number.isFinite(point.longitude)) {
    return null;
  }
  return point;
}

function getEnrichedRoute(route: River): River {
  const tripDetails = riverTripDetails[route.id];
  return tripDetails ? { ...route, ...tripDetails } : route;
}

function routeBounds(points: RiverAccessPoint[], marginDegrees: number) {
  const lats = points.map((point) => point.latitude);
  const lons = points.map((point) => point.longitude);
  return {
    minLon: Math.min(...lons) - marginDegrees,
    minLat: Math.min(...lats) - marginDegrees,
    maxLon: Math.max(...lons) + marginDegrees,
    maxLat: Math.max(...lats) + marginDegrees,
  };
}

function bboxKey(bounds: ReturnType<typeof routeBounds>) {
  return [
    bounds.minLon.toFixed(4),
    bounds.minLat.toFixed(4),
    bounds.maxLon.toFixed(4),
    bounds.maxLat.toFixed(4),
  ].join(',');
}

function cacheKey(parts: string[]) {
  return parts
    .join('__')
    .replace(/[^a-z0-9_.=-]+/gi, '-')
    .slice(0, 180);
}

async function fetchJsonWithCache(key: string, url: string): Promise<ArcGisResponse> {
  const file = path.join(cacheDir, `${key}.json`);

  if (shouldUseCache && !shouldRefresh) {
    try {
      return JSON.parse(await readFile(file, 'utf8')) as ArcGisResponse;
    } catch {
      // Cache miss.
    }
  }

  let lastError: unknown;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`NHD request failed ${response.status} ${response.statusText}`);
      }

      const text = await response.text();
      if (shouldUseCache) {
        // The cache can be cleared by another local process while the network
        // request is in flight. Re-create it immediately before writing.
        await mkdir(cacheDir, { recursive: true });
        await writeFile(file, text);
      }
      return JSON.parse(text) as ArcGisResponse;
    } catch (error) {
      lastError = error;
      if (attempt < 5) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      }
    }
  }

  throw lastError;
}

function buildNhdQuery(bounds: ReturnType<typeof routeBounds>, where: string, queryUrl = nhdFlowlineQueryUrl) {
  const params = new URLSearchParams({
    f: 'json',
    where,
    geometry: `${bounds.minLon},${bounds.minLat},${bounds.maxLon},${bounds.maxLat}`,
    geometryType: 'esriGeometryEnvelope',
    inSR: '4326',
    spatialRel: 'esriSpatialRelIntersects',
    outSR: '4326',
    outFields: 'GNIS_NAME,FTYPE,FCODE',
    returnGeometry: 'true',
    geometryPrecision: '6',
    resultRecordCount: '2000',
  });
  return `${queryUrl}?${params.toString()}`;
}

function degreesToRadians(value: number) {
  return (value * Math.PI) / 180;
}

function distanceMiles(left: { latitude: number; longitude: number }, right: { latitude: number; longitude: number }) {
  const deltaLat = degreesToRadians(right.latitude - left.latitude);
  const deltaLon = degreesToRadians(right.longitude - left.longitude);
  const leftLat = degreesToRadians(left.latitude);
  const rightLat = degreesToRadians(right.latitude);
  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(leftLat) * Math.cos(rightLat) * Math.sin(deltaLon / 2) ** 2;

  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(haversine));
}

function projectPointToSegment(
  point: RiverAccessPoint,
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number },
) {
  const latitudeScale = 69;
  const longitudeScale = Math.cos(degreesToRadians(point.latitude)) * 69.172;

  const px = point.longitude * longitudeScale;
  const py = point.latitude * latitudeScale;
  const sx = start.longitude * longitudeScale;
  const sy = start.latitude * latitudeScale;
  const ex = end.longitude * longitudeScale;
  const ey = end.latitude * latitudeScale;

  const dx = ex - sx;
  const dy = ey - sy;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) {
    return {
      distanceMiles: distanceMiles(point, start),
      latitude: start.latitude,
      longitude: start.longitude,
    };
  }

  const t = Math.max(0, Math.min(1, ((px - sx) * dx + (py - sy) * dy) / lengthSquared));
  const projected = {
    longitude: (sx + t * dx) / longitudeScale,
    latitude: (sy + t * dy) / latitudeScale,
  };
  return {
    distanceMiles: distanceMiles(point, projected),
    latitude: projected.latitude,
    longitude: projected.longitude,
  };
}

function featureNearestPoint(point: RiverAccessPoint, feature: ArcGisFeature) {
  const paths = feature.geometry?.paths ?? [];
  let best: { distanceFeet: number; latitude: number; longitude: number } | null = null;

  for (const pathPoints of paths) {
    for (let index = 1; index < pathPoints.length; index += 1) {
      const start = pathPoints[index - 1];
      const end = pathPoints[index];
      if (!start || !end || start.length < 2 || end.length < 2) continue;
      const projected = projectPointToSegment(
        point,
        { longitude: start[0], latitude: start[1] },
        { longitude: end[0], latitude: end[1] },
      );
      const distanceFeet = projected.distanceMiles * feetPerMile;
      if (!best || distanceFeet < best.distanceFeet) {
        best = {
          distanceFeet,
          latitude: projected.latitude,
          longitude: projected.longitude,
        };
      }
    }
  }

  return best;
}

function nearestFeature(point: RiverAccessPoint, features: ArcGisFeature[]) {
  let best: { feature: ArcGisFeature; distanceFeet: number; latitude: number; longitude: number } | null = null;

  for (const feature of features) {
    const nearestPoint = featureNearestPoint(point, feature);
    if (nearestPoint === null) continue;
    if (!best || nearestPoint.distanceFeet < best.distanceFeet) {
      best = { feature, ...nearestPoint };
    }
  }

  return best;
}

function pointInRing(point: RiverAccessPoint, ring: number[][]) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const a = ring[i];
    const b = ring[j];
    if (!a || !b) continue;
    const intersects = ((a[1] > point.latitude) !== (b[1] > point.latitude)) &&
      (point.longitude < ((b[0] - a[0]) * (point.latitude - a[1])) / (b[1] - a[1]) + a[0]);
    if (intersects) inside = !inside;
  }
  return inside;
}

function waterbodyNearestPoint(point: RiverAccessPoint, feature: ArcGisFeature) {
  const rings = feature.geometry?.rings ?? [];
  if (rings.some((ring) => pointInRing(point, ring))) {
    return { distanceFeet: 0, latitude: point.latitude, longitude: point.longitude };
  }
  let best: { distanceFeet: number; latitude: number; longitude: number } | null = null;
  for (const ring of rings) {
    for (let index = 1; index < ring.length; index += 1) {
      const start = ring[index - 1];
      const end = ring[index];
      if (!start || !end) continue;
      const projected = projectPointToSegment(point,
        { longitude: start[0], latitude: start[1] },
        { longitude: end[0], latitude: end[1] });
      const candidate = { distanceFeet: projected.distanceMiles * feetPerMile, latitude: projected.latitude, longitude: projected.longitude };
      if (!best || candidate.distanceFeet < best.distanceFeet) best = candidate;
    }
  }
  return best;
}

function nearestWaterbody(point: RiverAccessPoint, features: ArcGisFeature[]) {
  let best: { feature: ArcGisFeature; distanceFeet: number; latitude: number; longitude: number } | null = null;
  for (const feature of features) {
    const nearest = waterbodyNearestPoint(point, feature);
    if (!nearest) continue;
    if (!best || nearest.distanceFeet < best.distanceFeet) best = { feature, ...nearest };
  }
  return best;
}

function featureName(feature: ArcGisFeature | null | undefined) {
  const value = feature?.attributes.GNIS_NAME ?? feature?.attributes.gnis_name;
  return typeof value === 'string' && value.length > 0 ? value : null;
}

function severityFor(routeId: string, distanceFeet: number | null, matchedRiverName: string | null, nearestWaterwayName: string | null, nearestWaterwayDistanceFeet: number | null, nearestWaterbodyDistanceFeet: number | null, additionalAlternates: string[] = []) {
  if (distanceFeet === null || !matchedRiverName) return 'unknown';
  if (distanceFeet <= 100) return 'ok';
  const accessAnchorLimit = acceptedAccessAnchorWaterbodyFeet[routeId];
  if (accessAnchorLimit !== undefined && nearestWaterbodyDistanceFeet !== null && nearestWaterbodyDistanceFeet <= accessAnchorLimit) {
    // An access-site citation can explain a modest shore/parking offset, but it
    // must never suppress an obviously disconnected endpoint. Keep large gaps
    // in the normal failure path so every resolution remains visually auditable.
    if (distanceFeet <= 800) return 'review';
  }
  const acceptedNames = [...(acceptedAlternateWaterways[routeId] ?? []), ...additionalAlternates];
  if (nearestWaterwayName && nearestWaterwayDistanceFeet !== null && nearestWaterwayDistanceFeet <= 1000 &&
      acceptedNames.some((name) => normalizeName(name) === normalizeName(nearestWaterwayName))) {
    return 'review';
  }
  if (distanceFeet <= 300) return 'review';
  if (distanceFeet <= 800) return 'suspicious';
  if (nearestWaterwayName && normalizeName(nearestWaterwayName) !== normalizeName(matchedRiverName)) return 'failure';
  return 'failure';
}

function noteFor(result: Pick<EndpointAudit, 'distanceFeetToMatchedRiver' | 'matchedRiverName' | 'nearestWaterwayName' | 'severity'>) {
  if (result.distanceFeetToMatchedRiver === null || !result.matchedRiverName) {
    return 'No matching named NHD flowline was returned inside the route bounding box.';
  }

  const distance = `${Math.round(result.distanceFeetToMatchedRiver)} ft`;
  if (result.severity === 'ok') return `Endpoint is within ${distance} of the matched NHD flowline.`;
  if (result.severity === 'review') return `Endpoint is ${distance} from the matched NHD flowline; likely an access/parking anchor but worth review.`;
  if (result.severity === 'suspicious') return `Endpoint is ${distance} from the matched NHD flowline; inspect source map and launch placement.`;
  if (result.nearestWaterwayName && normalizeName(result.nearestWaterwayName) !== normalizeName(result.matchedRiverName)) {
    return `Endpoint is ${distance} from ${result.matchedRiverName}; the nearest named waterway is ${result.nearestWaterwayName}.`;
  }
  return `Endpoint is ${distance} from the matched NHD flowline.`;
}

function areaAnchorFor(point: RiverAccessPoint, state: string, controls: AreaAnchorControl[]) {
  return controls.find((control) => control.state === state
    && (accessNamesAgree(point.name, control.name)
      || control.aliases.some((alias) => accessNamesAgree(point.name, alias)))
    && distanceMiles(point, control) * feetPerMile <= Math.max(25, control.uncertaintyFeet));
}

function officialWaterEntryFor(point: RiverAccessPoint, route: River, controls: OfficialWaterEntryControl[]) {
  return controls.find((control) => {
    const routeWaterbodyAgrees = normalizeName(control.waterbody) === normalizeName(route.name);
    const declaredRouteConnection = control.terminalAlternateWaterbody;
    const connectedRouteWaterbodyAgrees = Boolean(declaredRouteConnection?.sourceUrl
      && normalizeName(declaredRouteConnection.routeWaterbody) === normalizeName(route.name));
    return control.state === route.state
      && (routeWaterbodyAgrees || connectedRouteWaterbodyAgrees)
      && (accessNamesAgree(point.name, control.name)
        || control.aliases.some((alias) => accessNamesAgree(point.name, alias)))
      && distanceMiles(point, control) * feetPerMile <= Math.max(25, control.uncertaintyFeet);
  });
}

async function queryRouteFlowlines(route: River, points: RiverAccessPoint[], additionalAlternates: string[] = []) {
  const margins = [0.04, 0.12, 0.3];
  const routeName = escapeSqlLiteral(route.name);
  const alternates = [...(acceptedAlternateWaterways[route.id] ?? []), ...additionalAlternates];
  const where = [
    `UPPER(GNIS_NAME) LIKE '%${routeName}%'`,
    ...alternates.map((name) => `UPPER(GNIS_NAME) = '${escapeSqlLiteral(name)}'`),
  ].join(' OR ');

  for (const margin of margins) {
    const bounds = routeBounds(points, margin);
    const keyBase = cacheKey([route.id, bboxKey(bounds)]);
    const namedUrl = buildNhdQuery(bounds, where);
    const named = await fetchJsonWithCache(`${keyBase}__named-variants-v2`, namedUrl);
    if (named.error?.message) throw new Error(named.error.message);
    const matchedFeatures = (named.features ?? []).filter((feature) => waterwayNameMatchesRoute(route.id, route.name, featureName(feature), additionalAlternates));

    if (matchedFeatures.length > 0 || margin === margins.at(-1)) {
      const allUrl = buildNhdQuery(bounds, "GNIS_NAME IS NOT NULL AND GNIS_NAME <> ''");
      const all = await fetchJsonWithCache(`${keyBase}__all-named`, allUrl);
      if (all.error?.message) throw new Error(all.error.message);
      return {
        matchedFeatures,
        allNamedFeatures: all.features ?? [],
        margin,
      };
    }
  }

  return { matchedFeatures: [], allNamedFeatures: [], margin: margins.at(-1) ?? 0.3 };
}

async function queryRouteWaterbodies(route: River, points: RiverAccessPoint[]) {
  const bounds = routeBounds(points, 0.04);
  const keyBase = cacheKey([route.id, bboxKey(bounds), 'waterbodies']);
  const [waterbody, area] = await Promise.all([
    fetchJsonWithCache(`${keyBase}__waterbody`, buildNhdQuery(bounds, '1=1', nhdWaterbodyQueryUrl)),
    fetchJsonWithCache(`${keyBase}__area`, buildNhdQuery(bounds, '1=1', nhdAreaQueryUrl)),
  ]);
  if (waterbody.error?.message) throw new Error(waterbody.error.message);
  if (area.error?.message) throw new Error(area.error.message);
  return [...(waterbody.features ?? []), ...(area.features ?? [])];
}

function featureType(feature: ArcGisFeature) {
  return Number(feature.attributes.FTYPE ?? feature.attributes.ftype);
}

function networkCostMultiplier(type: number) {
  if (type === 460) return 1;
  if (type === 334) return 1.05;
  if (type === 558) return 1.35;
  if (type === 336) return 4;
  return 10;
}

async function queryRouteNetwork(route: River, putIn: RiverAccessPoint, takeOut: RiverAccessPoint) {
  const bounds = routeBounds([putIn, takeOut], 0.025);
  const bbox = `${bounds.minLon.toFixed(4)}-${bounds.minLat.toFixed(4)}-${bounds.maxLon.toFixed(4)}-${bounds.maxLat.toFixed(4)}`;
  const key = `${route.id}__${bbox}__route-network-v1`;
  const response = await fetchJsonWithCache(
    key,
    buildNhdQuery(bounds, 'FTYPE IN (334,336,460,558)'),
  );
  if (response.error?.message) throw new Error(response.error.message);
  return response.features ?? [];
}

function connectedRouteTrace(route: River, putIn: RiverAccessPoint, takeOut: RiverAccessPoint, features: ArcGisFeature[], additionalAlternates: string[] = []) {
  const lines = features.flatMap((feature) =>
    (feature.geometry?.paths ?? []).map((coordinates) => ({
      coordinates,
      costMultiplier: networkCostMultiplier(featureType(feature)),
      name: featureName(feature),
    })),
  );
  const trace = endpointSnappedRiverNetwork(
    lines,
    [putIn, takeOut],
    { maxSnapDistanceMiles: 500 / feetPerMile },
  );
  const includesNamedRoute = trace?.sourceLineIndexes.some((lineIndex) =>
    waterwayNameMatchesRoute(route.id, route.name, lines[lineIndex]?.name ?? null, additionalAlternates),
  ) ?? false;
  return trace && includesNamedRoute ? trace : null;
}

function officialAlternateWaterwaysForRoute(
  route: River,
  terminalPoints: RiverAccessPoint[],
  controls: OfficialAlternateWaterwayControl[],
) {
  return [...new Set(controls
    .filter((control) => control.state === route.state
      && normalizeName(control.routeWaterbody) === normalizeName(route.name)
      && Boolean(control.sourceUrl)
      && terminalPoints.some((point) => accessNamesAgree(point.name, control.name)
        || control.aliases.some((alias) => accessNamesAgree(point.name, alias))))
    .map((control) => control.waterbody))];
}

async function auditRoute(
  route: River,
  areaAnchorControls: AreaAnchorControl[],
  officialWaterEntryControls: OfficialWaterEntryControl[],
  officialAlternateControls: OfficialAlternateWaterwayControl[],
): Promise<EndpointAudit[]> {
  const enriched = getEnrichedRoute(route);
  const putIn = endpointCoordinates(enriched.putIn);
  const takeOut = endpointCoordinates(enriched.takeOut);
  const intermediateAccessPoints = (enriched.accessPoints ?? [])
    .map((point) => endpointCoordinates(point))
    .filter((point): point is RiverAccessPoint => point !== null)
    .filter((point) => ![putIn, takeOut].some((endpoint) => endpoint && endpoint.latitude === point.latitude && endpoint.longitude === point.longitude));
  const points = [putIn, takeOut, ...intermediateAccessPoints].filter((point): point is RiverAccessPoint => point !== null);

  if (points.length === 0) return [];

  const officialAlternates = officialAlternateWaterwaysForRoute(
    route,
    [putIn, takeOut].filter((point): point is RiverAccessPoint => point !== null),
    officialAlternateControls,
  );
  const { matchedFeatures, allNamedFeatures } = await queryRouteFlowlines(route, points, officialAlternates);
  const waterbodyFeatures = await queryRouteWaterbodies(route, points);

  const entries: Array<readonly [EndpointLabel, RiverAccessPoint | null]> = [
    ['putIn', putIn],
    ['takeOut', takeOut],
    ...intermediateAccessPoints.map((point) => ['accessPoint', point] as const),
  ];

  const endpointEntries = entries.filter((entry): entry is readonly [EndpointLabel, RiverAccessPoint] => entry[1] !== null);
  const namedEndpointDistances = endpointEntries.map(([, point]) => nearestFeature(point, matchedFeatures)?.distanceFeet ?? Infinity);
  const shouldTraceConnectedNetwork = Boolean(
    putIn && takeOut && namedEndpointDistances.some((distanceFeet) => distanceFeet > 300),
  );
  const networkFeatures = shouldTraceConnectedNetwork && putIn && takeOut
    ? await queryRouteNetwork(route, putIn, takeOut)
    : [];
  const networkTrace = putIn && takeOut && networkFeatures.length > 0
    ? connectedRouteTrace(route, putIn, takeOut, networkFeatures, officialAlternates)
    : null;
  const networkTraceFeature: ArcGisFeature | null = networkTrace
    ? { attributes: { GNIS_NAME: route.name }, geometry: { paths: [networkTrace.coordinates] } }
    : null;

  return endpointEntries
    .map(([endpoint, point]) => {
      const namedMatched = nearestFeature(point, matchedFeatures);
      const connectedMatched = networkTraceFeature ? featureNearestPoint(point, networkTraceFeature) : null;
      const useConnectedNetwork = connectedMatched !== null
        && connectedMatched.distanceFeet < (namedMatched?.distanceFeet ?? Infinity);
      const matched = useConnectedNetwork
        ? { feature: networkTraceFeature!, ...connectedMatched }
        : namedMatched;
      const nearest = nearestFeature(point, allNamedFeatures);
      const matchedRiverName = featureName(matched?.feature);
      const nearestWaterwayName = featureName(nearest?.feature);
      const waterbody = nearestWaterbody(point, waterbodyFeatures);
      const waterbodyName = featureName(waterbody?.feature);
      const endpointOnWaterbody = (waterbody?.distanceFeet ?? Infinity) <= 150;
      const areaAnchor = areaAnchorFor(point, route.state, areaAnchorControls);
      const officialWaterEntry = officialWaterEntryFor(point, route, officialWaterEntryControls);
      const flowlineSeverity = severityFor(route.id, matched?.distanceFeet ?? null, matchedRiverName, nearestWaterwayName, nearest?.distanceFeet ?? null, waterbody?.distanceFeet ?? null, officialAlternates);
      const connectedNetworkNamedConflict = useConnectedNetwork
        && nearestWaterwayName !== null
        && (nearest?.distanceFeet ?? Infinity) <= 300
        && !waterwayNameMatchesRoute(route.id, route.name, nearestWaterwayName, officialAlternates);
      const noFlowlineAccessLimit = acceptedNoFlowlineAccessWaterbodyFeet[route.id];
      const documentedNoFlowlineAccess = flowlineSeverity === 'unknown'
        && noFlowlineAccessLimit !== undefined
        && (waterbody?.distanceFeet ?? Infinity) <= noFlowlineAccessLimit;
      const severity = areaAnchor
        ? 'failure'
        : officialWaterEntry
        ? flowlineSeverity === 'ok' ? 'ok' : 'review'
        : connectedNetworkNamedConflict && flowlineSeverity === 'ok'
        ? 'review'
        : endpointOnWaterbody && flowlineSeverity !== 'ok'
        ? 'review'
        : documentedNoFlowlineAccess ? 'review' : flowlineSeverity;
      const result: EndpointAudit = {
        routeId: route.id,
        routeName: route.name,
        reach: route.reach,
        state: route.state,
        endpoint,
        endpointName: point.name,
        latitude: point.latitude,
        longitude: point.longitude,
        matchedRiverName,
        distanceFeetToMatchedRiver: matched?.distanceFeet ?? null,
        nearestMatchedLatitude: matched?.latitude ?? null,
        nearestMatchedLongitude: matched?.longitude ?? null,
        nearestWaterwayName,
        distanceFeetToNearestWaterway: nearest?.distanceFeet ?? null,
        nearestWaterwayLatitude: nearest?.latitude ?? null,
        nearestWaterwayLongitude: nearest?.longitude ?? null,
        nearestWaterbodyName: waterbodyName,
        distanceFeetToNearestWaterbody: waterbody?.distanceFeet ?? null,
        nearestWaterbodyLatitude: waterbody?.latitude ?? null,
        nearestWaterbodyLongitude: waterbody?.longitude ?? null,
        endpointOnWaterbody,
        matchedHydrographyMode: matched
          ? useConnectedNetwork ? 'connected-network' : 'named-flowline'
          : null,
        coordinateEvidenceRole: areaAnchor
          ? 'authoritative-area-anchor'
          : officialWaterEntry ? 'authoritative-water-entry' : null,
        coordinateEvidenceSourceUrl: areaAnchor?.sourceUrl ?? officialWaterEntry?.sourceUrl ?? null,
        coordinateEvidenceDetail: areaAnchor
          ? `${areaAnchor.provider} ${areaAnchor.featureId}: ${areaAnchor.method}`
          : officialWaterEntry
            ? `${officialWaterEntry.provider} ${officialWaterEntry.featureId}: ${officialWaterEntry.method}`
            : null,
        severity,
        note: '',
      };
      return { ...result, note: areaAnchor
        ? `Stored coordinate matches an official WMA/property or fishing-area representative point (${areaAnchor.featureId}); it is not a verified access, parking, or water-entry coordinate.`
        : officialWaterEntry
        ? `Stored coordinate matches the exact named authoritative water-entry control (${officialWaterEntry.provider} ${officialWaterEntry.featureId}) on ${officialWaterEntry.waterbody}; the ${Math.round(matched?.distanceFeet ?? 0)} ft named-flowline offset reflects incomplete or generalized NHD coverage, not a proposed coordinate move.`
        : endpointOnWaterbody
        ? `Endpoint is within ${Math.round(waterbody?.distanceFeet ?? 0)} ft of NHD waterbody${waterbodyName ? ` ${waterbodyName}` : ''}; flowline distance is informational.`
        : connectedNetworkNamedConflict
          ? `Endpoint is on the connected route network, but the nearest named waterway is ${nearestWaterwayName}; verify the confluence or tributary access before accepting it.`
        : useConnectedNetwork
          ? `Endpoint is within ${Math.round(connectedMatched?.distanceFeet ?? 0)} ft of a topology-connected NHD river trace that includes ${route.name}; unnamed downstream stream segments are accepted as part of the same network.`
        : documentedNoFlowlineAccess
          ? `Named access is documented, but NHD returned no matching flowline; endpoint is within ${Math.round(waterbody?.distanceFeet ?? 0)} ft of mapped water and needs visual review.`
          : noteFor(result) };
    });
}

async function run() {
  const officialMapControls = JSON.parse(await readFile(officialMapControlsPath, 'utf8')) as OfficialMapControls;
  const areaAnchorControls: AreaAnchorControl[] = (officialMapControls.providers ?? [])
    .filter((provider) => provider.coordinateRole === 'authoritative-area-anchor')
    .flatMap((provider) => (provider.controls ?? []).map((control) => ({
      state: provider.state,
      provider: provider.id,
      featureId: control.featureId,
      name: control.name,
      aliases: control.aliases ?? [],
      latitude: control.latitude,
      longitude: control.longitude,
      uncertaintyFeet: control.uncertaintyFeet ?? 25,
      sourceUrl: provider.sourceUrl,
      method: provider.method,
    })));
  const officialAlternateControls: OfficialAlternateWaterwayControl[] = (officialMapControls.providers ?? [])
    .filter((provider) => provider.coordinateRole === 'authoritative-water-entry')
    .flatMap((provider) => (provider.controls ?? []).flatMap((control) => {
      const alternate = control.terminalAlternateWaterbody;
      if (!alternate || !control.waterbody) return [];
      return [{
        state: provider.state,
        name: control.name,
        aliases: control.aliases ?? [],
        waterbody: control.waterbody,
        routeWaterbody: alternate.routeWaterbody,
        relationship: alternate.relationship,
        sourceUrl: alternate.sourceUrl,
      }];
    }));
  const officialWaterEntryControls: OfficialWaterEntryControl[] = (officialMapControls.providers ?? [])
    .filter((provider) => provider.coordinateRole === 'authoritative-water-entry')
    .flatMap((provider) => (provider.controls ?? []).flatMap((control) => {
      if (!control.waterbody) return [];
      return [{
        state: provider.state,
        provider: provider.id,
        featureId: control.featureId,
        name: control.name,
        aliases: control.aliases ?? [],
        waterbody: control.waterbody,
        latitude: control.latitude,
        longitude: control.longitude,
        uncertaintyFeet: control.uncertaintyFeet ?? 25,
        sourceUrl: provider.sourceUrl,
        method: provider.method,
        terminalAlternateWaterbody: control.terminalAlternateWaterbody,
      }];
    }));
  const routesToAudit = routeFilter
    ? routeInventory.filter((route) => route.id === routeFilter)
    : routeInventory;
  if (routeFilter && routesToAudit.length === 0) {
    throw new Error(`No route found for --route=${routeFilter}`);
  }

  const endpointResults: EndpointAudit[] = [];
  let cursor = 0;

  await Promise.all(Array.from({ length: Math.min(concurrency, routesToAudit.length) }, async () => {
    while (cursor < routesToAudit.length) {
      const index = cursor;
      cursor += 1;
      const route = routesToAudit[index];
      console.error(`[${index + 1}/${routesToAudit.length}] ${route.id}`);
      endpointResults.push(...await auditRoute(route, areaAnchorControls, officialWaterEntryControls, officialAlternateControls));
    }
  }));

  const bySeverity = endpointResults.reduce<Record<Severity, number>>(
    (counts, result) => {
      counts[result.severity] += 1;
      return counts;
    },
    { ok: 0, review: 0, suspicious: 0, failure: 0, unknown: 0 },
  );

  const report = {
    generatedAt: new Date().toISOString(),
    source: {
      name: 'USGS National Hydrography Dataset Flowline, Area, and Waterbody - Large Scale',
      urls: {
        flowline: 'https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/6',
        area: 'https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/9',
        waterbody: 'https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/12',
      },
    },
    thresholdsFeet: {
      ok: 100,
      review: 300,
      suspicious: 800,
    },
    routeCount: routesToAudit.length,
    endpointCount: endpointResults.length,
    bySeverity,
    endpoints: endpointResults.sort((left, right) => {
      const order: Record<Severity, number> = { failure: 0, unknown: 1, suspicious: 2, review: 3, ok: 4 };
      return order[left.severity] - order[right.severity] ||
        (right.distanceFeetToMatchedRiver ?? -1) - (left.distanceFeetToMatchedRiver ?? -1);
    }),
  };

  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`Audited ${report.endpointCount} endpoints across ${report.routeCount} route(s).`);
  console.log(`Severity counts: ${JSON.stringify(bySeverity)}`);
  console.log(`Wrote ${path.relative(root, reportPath)}`);

  const flagged = report.endpoints.filter((endpoint) => endpoint.severity !== 'ok');
  for (const endpoint of flagged.slice(0, 25)) {
    const distance = endpoint.distanceFeetToMatchedRiver === null
      ? 'no match'
      : `${Math.round(endpoint.distanceFeetToMatchedRiver)} ft`;
    console.log(`${endpoint.severity.toUpperCase()} ${endpoint.routeId} ${endpoint.endpoint} ${distance} - ${endpoint.note}`);
  }
}

run().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
