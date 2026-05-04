export type MinnesotaPaddleGuideCategory =
  | 'best-weekend'
  | 'long-day'
  | 'camping'
  | 'beginner'
  | 'near-twin-cities'
  | 'remote';

export interface MinnesotaPaddleGuideEntry {
  id: string;
  title: string;
  riverName: string;
  routeName: string;
  summary: string;
  fastFacts: string[];
  categories: MinnesotaPaddleGuideCategory[];
  trackedSlug?: string;
  sourceLabel: string;
  sourceUrl: string;
}

export const minnesotaPaddleGuideEntries: MinnesotaPaddleGuideEntry[] = [
  {
    id: 'st-croix-osceola-william-obrien',
    title: "St. Croix River: Osceola to William O'Brien",
    riverName: 'St. Croix River',
    routeName: "Osceola Landing to William O'Brien State Park",
    summary:
      'A classic lower St. Croix weekend paddle with National Scenic Riverway scenery, established river access, and state-park support near the finish.',
    fastFacts: ['Destination weekend route', 'State park finish', 'Good scenery-to-logistics ratio'],
    categories: ['best-weekend', 'camping', 'near-twin-cities'],
    trackedSlug: 'st-croix-river-osceola-william-obrien',
    sourceLabel: 'National Park Service Riverway paddling and camping guidance',
    sourceUrl: 'https://www.nps.gov/thingstodo/paddlingtheriverway.htm',
  },
  {
    id: 'st-croix-interstate-osceola',
    title: 'St. Croix River: Interstate Park to Osceola',
    riverName: 'St. Croix River',
    routeName: 'Minnesota Interstate State Park to Osceola Landing',
    summary:
      'A shorter scenic St. Croix trip with dramatic riverway character, useful for groups that want a memorable route without committing to a full overnight distance.',
    fastFacts: ['Scenic day route', 'Near Twin Cities', 'State park launch'],
    categories: ['best-weekend', 'beginner', 'near-twin-cities'],
    trackedSlug: 'st-croix-river-interstate-osceola',
    sourceLabel: 'MN DNR St. Croix State Water Trail snapshot',
    sourceUrl: 'https://www.dnr.state.mn.us/state_water_trail/virtual_tour/st_croix_river/snapshot.html',
  },
  {
    id: 'kettle-lower',
    title: 'Kettle River: Lower Kettle whitewater corridor',
    riverName: 'Kettle River',
    routeName: '#5 trailer access to #6 trailer access',
    summary:
      'A more adventurous Minnesota weekend choice with rapids that change meaningfully by water level. Best for groups that want moving water and are honest about skill.',
    fastFacts: ['Class I-III depending on level', 'Designated canoe campsites nearby', 'Water level matters'],
    categories: ['best-weekend', 'camping', 'remote'],
    trackedSlug: 'kettle-river-lower-kettle-5-to-6',
    sourceLabel: 'MN DNR Kettle River State Water Trail map',
    sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/kettle2.pdf',
  },
  {
    id: 'big-fork-highway-6',
    title: 'Big Fork River: Highway 6 South to Highway 6 North',
    riverName: 'Big Fork River',
    routeName: 'Highway 6 South to Highway 6 North',
    summary:
      'A remote northern Minnesota route that can work as a long day or a relaxed overnight, with wooded shoreline and a first-come watercraft campsite about halfway.',
    fastFacts: ['15.7 river miles', 'Long day or overnight', 'Remote state forest setting'],
    categories: ['long-day', 'camping', 'remote'],
    trackedSlug: 'big-fork-river-highway-6-south-north',
    sourceLabel: 'MN DNR Big Fork River segments and maps',
    sourceUrl: 'https://www.dnr.state.mn.us/watertrails/bigforkriver/segments-maps.html',
  },
  {
    id: 'crow-wing-little-white-dog-cottingham',
    title: 'Crow Wing River: Little White Dog to Cottingham County Park',
    riverName: 'Crow Wing River',
    routeName: 'Little White Dog to Cottingham County Park',
    summary:
      'A friendly canoe-camping style river with clean water, sandy bottom, wooded banks, and campsites that fit families or newer river paddlers.',
    fastFacts: ['Beginner camping angle', 'Wooded banks', 'Sandy-bottom river'],
    categories: ['camping', 'beginner', 'long-day'],
    trackedSlug: 'crow-wing-river-little-white-dog-cottingham',
    sourceLabel: 'MN DNR Tales of Water Trails: Crow Wing River',
    sourceUrl: 'https://files.dnr.state.mn.us/destinations/water_trails/audio-tales/crow-wing-transcript.pdf',
  },
  {
    id: 'crow-wing-stigmans-little-white-dog',
    title: "Crow Wing River: Stigman's Mound to Little White Dog",
    riverName: 'Crow Wing River',
    routeName: "Stigman's Mound to Little White Dog carry-in access",
    summary:
      'A good upstream Crow Wing option when you want the same easygoing canoe-camping feel with shorter mileage and room to build a multi-section plan.',
    fastFacts: ['Beginner-friendly character', 'Good camping region', 'Can pair with downstream sections'],
    categories: ['camping', 'beginner'],
    trackedSlug: 'crow-wing-river-stigmans-little-white-dog',
    sourceLabel: 'MN DNR Tales of Water Trails: Crow Wing River',
    sourceUrl: 'https://files.dnr.state.mn.us/destinations/water_trails/audio-tales/crow-wing-transcript.pdf',
  },
  {
    id: 'root-lanesboro-peterson',
    title: 'Root River: Lanesboro to Peterson',
    riverName: 'Root River',
    routeName: 'Lanesboro to Peterson',
    summary:
      'A scenic Driftless weekend route with trail-town logistics, bluff country, and a strong bike-shuttle or town-base angle.',
    fastFacts: ['Driftless scenery', 'Bike-shuttle friendly', 'Town-based weekend'],
    categories: ['best-weekend', 'long-day', 'beginner'],
    trackedSlug: 'root-river-lanesboro-peterson',
    sourceLabel: 'MN DNR Tales of Water Trails: Root River',
    sourceUrl: 'https://files.dnr.state.mn.us/destinations/water_trails/audio-tales/root-transcript.pdf',
  },
  {
    id: 'root-rushford-houston',
    title: 'Root River: Rushford to Houston',
    riverName: 'Root River',
    routeName: 'Rushford to Houston',
    summary:
      'A longer Root River day with trail access and town support, best for groups that want a full scenic paddle rather than a short float.',
    fastFacts: ['Longer day route', 'Trail-town support', 'Scenic bluff country'],
    categories: ['long-day', 'best-weekend'],
    trackedSlug: 'root-river-rushford-houston',
    sourceLabel: 'MN DNR Tales of Water Trails: Root River',
    sourceUrl: 'https://files.dnr.state.mn.us/destinations/water_trails/audio-tales/root-transcript.pdf',
  },
  {
    id: 'rum-martins-north-county',
    title: "Rum River: Martin's Landing to North County Park",
    riverName: 'Rum River',
    routeName: "Martin's Landing to Rum River North County Park",
    summary:
      'A manageable Wild and Scenic River day near the metro fringe, with DNR-recommended mileage and a 3.5-5 hour planning window.',
    fastFacts: ['10.9 river miles', '3.5-5 hour DNR estimate', 'Wild and Scenic River'],
    categories: ['near-twin-cities', 'beginner', 'best-weekend'],
    trackedSlug: 'rum-river-martins-north-county-park',
    sourceLabel: 'MN DNR Rum River recommended paddling trip',
    sourceUrl: 'https://www.dnr.state.mn.us/watertrails/recommended/rum.html',
  },
  {
    id: 'namekagon-big-bend-trego',
    title: 'Namekagon River: Big Bend to Trego',
    riverName: 'Namekagon River',
    routeName: 'Big Bend Landing to Trego Town Park',
    summary:
      'Technically in Wisconsin, but it belongs in the same St. Croix Riverway weekend conversation because the National Park Service manages the Namekagon and St. Croix as one paddling riverway.',
    fastFacts: ['National Scenic Riverway', 'Canoe-camping destination', 'Upper Midwest classic'],
    categories: ['camping', 'remote', 'best-weekend'],
    trackedSlug: 'namekagon-river-big-bend-trego',
    sourceLabel: 'National Park Service St. Croix National Scenic Riverway',
    sourceUrl: 'https://www.nps.gov/sacn/?parkID=163',
  },
];

export const minnesotaPaddleGuideCategoryLabels: Record<MinnesotaPaddleGuideCategory, string> = {
  'best-weekend': 'Best weekend routes',
  'long-day': 'Good long day trips',
  camping: 'Routes with camping potential',
  beginner: 'Beginner-friendly weekend routes',
  'near-twin-cities': 'Near the Twin Cities',
  remote: 'Northern and remote trips',
};
