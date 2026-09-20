import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const trailGuide = { label: 'Alabama State Lands Bartram Canoe Trail brochure', url: 'https://www.alabamacanoetrails.com/sites/default/files/maps/Bartram%20Canoe%20Trail%20Brochure.pdf', provider: 'local' as const };
const trailSite = { label: 'Alabama State Lands Canoe Trails and Bartram access', url: 'https://www.alabamacanoetrails.com/', provider: 'local' as const };
const waterLevel = { label: 'USACE Alabama-Coosa-Tallapoosa tailwater data', url: 'https://water.sam.usace.army.mil/actmain.htm', provider: 'local' as const };
const deltaGuide = { label: 'Outdoor Alabama Bartram Canoe Trail overview', url: 'https://www.outdooralabama.com/bartram-canoe-trail', provider: 'local' as const };
const gauge = { id: 'usgs-02428400', provider: 'usgs' as const, siteId: '02428400', metric: 'gage_height_ft' as const, unit: 'ft' as const, kind: 'direct' as const, siteName: 'Alabama River at Claiborne L&D near Monroeville, AL', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02428400/' };
const hazards: RouteHazard[] = ['low_water', 'fast_rise', 'flash_flood', 'strainers', 'wildlife', 'private_banks', 'wind', 'remote'];

const points = {
  boatyard: { name: 'Boatyard Landing public-use access (water-entry edge)', latitude: 31.1768, longitude: -87.8406833 },
  french: { name: "French's Lake Coastal Access Kiosk (water-entry edge)", latitude: 31.1356833, longitude: -87.8451833 },
  holley: { name: 'Holley Creek Landing public-use access (water-entry edge)', latitude: 31.1824, longitude: -87.8541667 },
  hubbard: { name: "Hubbard Landing public access (water-entry edge)", latitude: 31.0637, longitude: -87.8702833 },
  rice: { name: 'Rice Creek Landing public access (water-entry edge)', latitude: 31.0157833, longitude: -87.8802667 },
  upperBryant: { name: 'Upper Bryant Landing public-use access (water-entry edge)', latitude: 31.0443667, longitude: -87.87635 },
};
type BartramPoint = typeof points[keyof typeof points];

type BartramSpec = {
  id: string;
  title: string;
  start: BartramPoint;
  end: BartramPoint;
  miles: number;
  summary: string;
  note: string;
  time: string;
  overnight: boolean;
  camping: string;
  flowMin: number;
  scoreEligibility?: 'scored' | 'planning';
};

function makeRoute(spec: BartramSpec): River {
  const campingClassification = spec.overnight ? 'on_route_campsite' as const : 'nearby_basecamp' as const;
  const flowRange = `${spec.flowMin}–19 ft Claiborne tailrace stage; 15–18 ft is the best Globe/Bear Creek window`;
  return {
    id: spec.id,
    slug: spec.id,
    name: 'Bartram Canoe Trail',
    riverId: 'bartram-canoe-trail-alabama',
    state: 'Alabama',
    region: 'Mobile-Tensaw Delta / Baldwin County Forever Wild lands',
    reach: `${spec.title}: ${spec.start.name} to ${spec.end.name}`,
    latitude: spec.start.latitude,
    longitude: spec.start.longitude,
    summary: spec.summary,
    statusText: `Check direct USGS ${gauge.siteId} Claiborne tailrace stage, weather, wind, tide influence and trail markers before launch. The brochure's ${flowRange} is a planning cue, not a safety guarantee.`,
    routeType: 'recreational',
    scoreEligibility: spec.scoreEligibility ?? 'scored',
    gaugeSource: gauge,
    profile: {
      thresholdModel: 'two-sided',
      tooLow: spec.flowMin,
      idealMin: spec.flowMin,
      idealMax: 18,
      tooHigh: 19,
      thresholdSource: trailGuide,
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'medium',
      windSensitivity: 0.4,
      seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      seasonNotes: 'The delta can be paddled year-round, but storms, wind, high water, heat, seasonal wildlife and changing channels alter conditions. Check the Claiborne tailrace, weather, tide influence and trail notices immediately before departure.',
      difficulty: 'moderate',
      difficultyNotes: 'The Bartram trail combines creeks, lakes, sloughs, old river channels and open delta water. Navigation can be confusing, fallen trees may require portage, and wind or current can make a short map distance demanding.',
      confidenceNotes: 'The Alabama State Lands brochure publishes the named trail itineraries, public or fee-associated launch points, distances, camping sites and Claiborne tailrace stage guidance. The conservative profile keeps the published upper hazard ceiling and requires current marker, access and weather checks.',
    },
    safetyProfile: {
      riskLevel: 'caution',
      reviewStatus: 'reviewed',
      hazards,
      safetyNotes: [
        'Wear a properly fitted PFD and carry a whistle, spare paddle, throw line, communication, first aid, sun protection and offline navigation.',
        'Follow Bartram trail markers and carry the brochure map; channels, sloughs and small creeks can be difficult to follow, and fallen trees may require portage.',
        'Check direct Claiborne stage, rainfall, wind, weather, storm warnings and any lower-delta tide influence. High water, fast rises and open-water wind can overwhelm a small craft.',
        'Wildlife including alligators is present. Keep distance, secure food and never feed animals. Respect private banks and all posted Forever Wild or WMA rules.',
        'Use only the named launch and landing sites. Private Boatyard, Holley Creek and Upper Bryant access is public-use by fee or posted permission; confirm current terms before staging.',
      ],
    },
    putIn: spec.start,
    takeOut: spec.end,
    accessPoints: [
      { ...spec.start, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note },
      { ...spec.end, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Confirm the marked landing, parking, carry and water edge before departure or take-out.' },
    ],
    logistics: {
      distanceLabel: `About ${spec.miles} river miles`,
      estimatedPaddleTime: spec.time,
      shuttle: spec.start === spec.end ? 'This is a documented loop or out-and-back. Leave the vehicle at the named access, confirm the carry and follow trail markers rather than improvising a shortcut.' : 'Stage the downstream vehicle at the named landing, then shuttle to the upstream or alternate access. Confirm road approaches, gates, parking and fee or permission terms before unloading.',
      permits: 'Confirm Alabama State Lands, Forever Wild, Upper Delta WMA and any fee-associated private landing rules before launch. Overnight platform camps require reservation; land-based sites follow current posted rules.',
      camping: spec.camping,
      campingClassification,
      summary: spec.summary,
      accessCaveats: [spec.note, 'The delta has complex channels and limited emergency exits; use only marked public or authorized access.', 'Recheck current trail markers, road, parking, water level, weather, wind and closure conditions before staging.'],
      watchFor: ['USGS 02428400 Claiborne tailrace stage and storm rise', 'Fallen trees, confusing channels, wind and open-water crossings', 'Alligators, private banks, WMA rules and campsite reservations'],
    },
    evidenceNotes: [
      { label: 'Named trail and distance', value: `${spec.title}; ${spec.miles} miles`, note: 'The Alabama State Lands brochure identifies this named Bartram Canoe Trail itinerary, its access points and route distance.', sourceUrl: trailGuide.url },
      { label: 'Flow scoring cues', value: flowRange, note: 'The brochure publishes the Claiborne tailrace stage range and identifies levels above the upper value as hazardous. Verify live stage and local conditions before launch.', sourceUrl: trailGuide.url },
      { label: 'Direct gauge', value: `USGS ${gauge.siteId} Claiborne L&D`, note: 'Direct Alabama River tailrace stage telemetry used by the brochure for these delta routes.', sourceUrl: gauge.detailUrl },
      { label: 'Camping and access', value: campingClassification, note: spec.camping, sourceUrl: trailGuide.url },
    ],
    sourceLinks: [trailGuide, trailSite, deltaGuide, waterLevel, { label: 'USGS Claiborne tailrace gauge', url: gauge.detailUrl, provider: 'usgs' }],
  };
}

export const alabamaBartramRoutes: River[] = [
  makeRoute({ id: 'bartram-globe-creek-french-hubbard', title: 'Globe Creek Trail', start: points.french, end: points.hubbard, miles: 6.8, summary: "A marked Globe Creek day trail from French's Lake through Major's Creek, Big Beaver Creek and Tensaw Lake to Hubbard Landing.", note: "The brochure identifies French's Lake on the Forever Wild Clearwater Tract and Hubbard Landing as the public endpoints; follow trail markers through the multiple channels.", time: 'Allow 4–6 hours with navigation and shuttle margin', overnight: false, camping: 'Day-use route; use an established campground or lodging away from the access sites.', flowMin: 10 }),
  makeRoute({ id: 'bartram-red-hill-hubbard-loop', title: 'Red Hill / Proctor Creek Trail', start: points.hubbard, end: points.hubbard, miles: 6.5, summary: 'A marked Hubbard Landing loop up Tensaw Lake, Proctor Creek, Dead Lake slough and Red Hills Creek.', note: 'The brochure identifies Hubbard Landing as the public loop access. Side channels allow route choices, so carry the map and do not assume every slough is passable.', time: 'Allow 4–6 hours with navigation and scouting margin', overnight: false, camping: 'Day-use loop; use an established campground or lodging away from the landing.', flowMin: 6 }),
  makeRoute({ id: 'bartram-douglas-lake-upper-bryant-loop', title: 'Douglas Lake Trail', start: points.upperBryant, end: points.upperBryant, miles: 10.2, summary: 'An Upper Bryant Landing loop through Tensaw Lake into Douglas Lake and back.', note: 'Upper Bryant is a fee-associated private landing that permits public use; confirm current fee, parking and access before staging.', time: 'Allow 5–8 hours with open-water wind and navigation margin', overnight: false, camping: 'Day-use loop; use an established campground or lodging away from the landing.', flowMin: 6 }),
  makeRoute({ id: 'bartram-richardson-island-rice-loop', title: 'Richardson Island Trail', start: points.rice, end: points.rice, miles: 4, summary: 'A short Rice Creek Landing loop around Richardson Island through creek, lake and backwater habitat.', note: 'The brochure identifies Rice Creek Landing on Forever Wild Delta Tract as the public access. Confirm the carry, channel markers and parking before launching.', time: 'Allow 2–4 hours with navigation and shallow-water checks', overnight: false, camping: 'Day-use loop; use an established campground or lodging away from the landing.', flowMin: 6 }),
  makeRoute({ id: 'bartram-fisher-island-rice-loop', title: 'Fisher Island Trail', start: points.rice, end: points.rice, miles: 8.9, summary: 'A Rice Creek Landing loop through Bayou Jessamine, Jug Lake and around Fisher Island.', note: 'The brochure identifies Rice Creek Landing and the marked Jug Lake/Fisher Island sequence. Carry the map for the side-channel choices and return leg.', time: 'Allow 4–7 hours with navigation and open-water margin', overnight: false, camping: 'Day-use loop; use an established campground or lodging away from the landing.', flowMin: 6 }),
  makeRoute({ id: 'bartram-indian-mound-rice-loop', title: 'Indian Mound Trail', start: points.rice, end: points.rice, miles: 9.1, summary: 'A Rice Creek loop around Richardson Island and through Bayou Jessamine to the Bottle Creek Indian Mounds trail landing.', note: 'The brochure identifies Rice Creek as the launch and a marked sandbar landing with a foot trail to the mounds. Confirm the landing and preserve the return route.', time: 'Allow 5–8 hours with navigation and shoreline stops', overnight: false, camping: 'Day-use loop; use an established campground or lodging away from the landing.', flowMin: 6 }),
  makeRoute({ id: 'bartram-two-rivers-rice-loop', title: 'Two Rivers Point overnight route', start: points.rice, end: points.rice, miles: 14.1, summary: 'A documented Rice Creek overnight loop through Briar Lake, Tensaw Lake, Bayou Tallapoosa, Tensaw River, Bottle Creek and Bayou Jessamine.', note: 'The brochure identifies Two Rivers Point as the land-based campsite and Rice Creek as both launch and return. Confirm current campsite status and leave-no-trace rules.', time: 'Plan 2 days / 1 night with a full navigation margin', overnight: true, camping: 'Two Rivers Point land-based campsite is identified by the brochure; confirm current availability and posted rules before departure.', flowMin: 10 }),
  makeRoute({ id: 'bartram-spoonbill-french-hubbard', title: 'Spoonbill Sandbar overnight route', start: points.french, end: points.hubbard, miles: 16, summary: "A documented French's Lake to Hubbard Landing overnight route with a stop at the Spoonbill Sandbar campsite.", note: "French's Lake is a Forever Wild access; Hubbard Landing is a fee-associated private landing. Confirm current public-use terms, campsite condition and shuttle before launch.", time: 'Plan 2 days / 1 night with experienced navigation and shuttle margin', overnight: true, camping: 'Spoonbill Sandbar land-based campsite is identified by the brochure; confirm current availability and posted rules before departure.', flowMin: 10, scoreEligibility: 'planning' }),
  makeRoute({ id: 'bartram-spoonbill-two-rivers-french-rice', title: 'Spoonbill Sandbar / Two Rivers Point route', start: points.french, end: points.rice, miles: 30, summary: "The documented three-day French's Lake to Rice Creek itinerary linking Spoonbill Sandbar and Two Rivers Point campsites.", note: "The brochure describes this as a combination of the two overnight routes. Holley Creek or Boatyard are alternate fee-associated starts, but this card uses the official French's Lake public kiosk.", time: 'Plan 3 days / 2 nights with confirmed camps, shuttles and daylight margin', overnight: true, camping: 'Spoonbill Sandbar and Two Rivers Point are the brochure’s land-based overnight campsites; confirm current availability and posted rules.', flowMin: 10 }),
  makeRoute({ id: 'bartram-jug-lake-rice-loop', title: 'Jug Lake overnight route', start: points.rice, end: points.rice, miles: 13, summary: 'A documented Rice Creek overnight loop through Briar Lake, Tensaw Lake, Bayou Jessamine and the Jug Lake floating platform.', note: 'The brochure identifies the Jug Lake platform as reservation-only and limits platforms to canoeists and kayakers. Confirm reservation, weather and return-channel conditions.', time: 'Plan 2 days / 1 night with navigation and campsite reservation', overnight: true, camping: 'Jug Lake floating platform is reservation-only under the brochure’s platform rules; confirm the reservation and group-size limit before departure.', flowMin: 6 }),
  makeRoute({ id: 'bartram-canal-island-french-hubbard', title: 'Canal Island overnight route', start: points.french, end: points.hubbard, miles: 11, summary: "A documented French's Lake to Hubbard Landing route through Globe Creek, Big Beaver Creek and Little Lake to the Canal Island floating platform.", note: "The brochure identifies Canal Island as a reservation-only platform and Hubbard Landing as a fee-associated public-use finish. Confirm both terms before staging.", time: 'Plan 2 days / 1 night with campsite reservation and shuttle margin', overnight: true, camping: 'Canal Island floating platform is reservation-only under the brochure’s platform rules; confirm the reservation and group-size limit before departure.', flowMin: 10, scoreEligibility: 'planning' }),
  makeRoute({ id: 'bartram-dead-lake-upper-bryant-loop', title: 'Dead Lake overnight route', start: points.upperBryant, end: points.upperBryant, miles: 7, summary: 'A documented Upper Bryant loop through Tensaw Lake to the Dead Lake Island floating platforms and back.', note: 'Upper Bryant is a fee-associated private landing that permits public use. Dead Lake has two floating platforms with reservation and group-size rules; confirm both before departure.', time: 'Plan 2 days / 1 night with wind and campsite reservation margin', overnight: true, camping: 'Dead Lake Island floating platforms are reservation-only under the brochure’s platform rules; confirm the reservation and group-size limit before departure.', flowMin: 6 }),
  makeRoute({ id: 'bartram-canal-dead-french-upper-bryant', title: 'Canal Island / Dead Lake route', start: points.french, end: points.upperBryant, miles: 11, summary: "A documented multi-night French's Lake to Upper Bryant route linking Canal Island and Dead Lake platforms through the delta chain.", note: "The brochure identifies this as a three-day route and says both platform camps must be reserved. Upper Bryant is a fee-associated private landing; confirm all access terms and camps before staging.", time: 'Plan 3 days / 2 nights with confirmed platform reservations and full shuttle margin', overnight: true, camping: 'Canal Island and Dead Lake floating platforms are reservation-only under the brochure’s platform rules; confirm both reservations and group-size limits.', flowMin: 10 }),
];
