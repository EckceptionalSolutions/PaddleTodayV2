import { buildStarterPlanningRoute, type StarterPlanningSpec } from './starter-planning';

const santaFeGuide = { label: 'Florida DEP Santa Fe paddling guide', url: 'https://floridadep.gov/sites/default/files/Santa%20Fe%20Guide_1.pdf', provider: 'local' as const };
const rumIsland = { name: 'Rum Island Park boat launch', latitude: 29.8334, longitude: -82.6784 };
const santaFeGauge = {
  id: 'usgs-02321975', provider: 'usgs' as const, siteId: '02321975', metric: 'gage_height_ft' as const, unit: 'ft' as const,
  kind: 'proxy' as const, siteName: 'Santa Fe River at US Hwy 441 near High Springs, FL',
  detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02321975/',
};
const santaFeConditions = 'The upstream US 441 station is context only; spring inflows change downstream conditions. DEP guidance uses an SRWMD stage reference; its datum has not been reconciled with this USGS series. No numeric paddling range is transferred.';
const santaFeSources = [
  { label: 'Rum Island Park hours and access', url: 'https://www.columbiacountyfla.com/ParkView.aspx?id=4', provider: 'local' as const },
  { label: 'Columbia County park and swimming-area rules', url: 'https://www.columbiacountyfla.com/ws/ws.asmx/DownloadDocument?Id=7194', provider: 'local' as const },
  { label: 'FWC Santa Fe boating restrictions', url: 'https://myfwc.com/boating/waterway/river-restrictions/suwannee-and-santa-fe-rivers/', provider: 'local' as const },
  { label: 'O’Leno camping', url: 'https://www.floridastateparks.org/learn/camp-oleno', provider: 'local' as const },
];
const santaFeCommon = {
  name: 'Santa Fe River', riverId: 'santa-fe-river-florida', state: 'Florida', region: 'North Central Florida / High Springs',
  difficulty: 'moderate' as const, difficultyNotes: 'Recreational moving water with shallow shoals and changing current; comfortable boat control is needed.',
  seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12], seasonNotes: 'Check river levels, flood notices, thunderstorms, daylight and park hours. Low water can make shoals impassable without walking.',
  gauge: santaFeGauge, conditionsNote: santaFeConditions,
  hazards: ['low_water','strainers','fast_rise','private_banks'] as StarterPlanningSpec['hazards'],
  safetyNotes: ['Wear a PFD and avoid floodwater and thunderstorms.', 'Keep boats outside Rum Island’s designated swimming area. Use the river launch, not the accessible swimming ramp.', 'Respect private spring runs and banks; inspect obstructions from a safe position and turn back when passage is uncertain.'],
  guide: santaFeGuide, sources: santaFeSources,
  coordinateNote: 'DEP guide maps identify canoe/kayak launches with printed decimal-degree waypoints; values are map precision, not surveyed ramp edges.',
  reviewDate: '2026-09-09',
};

export const floridaStarterSpecs: StarterPlanningSpec[] = [
  {
    ...santaFeCommon, id: 'santa-fe-river-us27-rum-island',
    putIn: { name: 'US 27 public boat ramp', latitude: 29.8441, longitude: -82.6308 }, takeOut: rumIsland,
    miles: 4, summary: 'A short Santa Fe outing from the US 27 ramp to Rum Island, passing spring-fed river scenery near High Springs.',
    logistics: {
      estimatedPaddleTime: 'Allow 2–3 hours; estimate varies with flow and stops',
      shuttle: 'Stage a vehicle at Rum Island and drive to the US 27 ramp. Confirm both parking areas before unloading.',
      permits: 'Rum Island lists a $5 vehicle entry fee. Confirm posted fees and operating hours at both accesses.',
      camping: 'O’Leno offers a nearby campground for a separate base camp. Overnight camping is not permitted at Rum Island for ordinary visitors.', campingClassification: 'nearby_basecamp',
      accessCaveats: ['Use marked parking only at Rum Island; no roadside overflow.', 'County hours: 7:30 a.m.–7:30 p.m., with shorter winter hours of 8 a.m.–5:30 p.m.; confirm before staging.'],
      watchFor: ['Low shoals, fallen trees and other river users', 'Summer heat and lightning'],
    },
  },
  {
    ...santaFeCommon, id: 'santa-fe-river-rum-island-sr47', putIn: rumIsland,
    takeOut: { name: 'Santa Fe River Park SR 47 boat ramp', latitude: 29.8646, longitude: -82.7399 },
    miles: 5, summary: 'Continue down the Santa Fe from Rum Island to the county landing at SR 47 on a separate five-mile day trip.',
    sources: [...santaFeSources, { label: 'Gilchrist County Santa Fe Park', url: 'https://gilchrist.fl.us/santa-fe-park/', provider: 'local' }],
    logistics: {
      estimatedPaddleTime: 'Allow 2–4 hours; estimate varies with flow and stops',
      shuttle: 'Stage at Santa Fe River Park on the south bank near SR 47, then drive to Rum Island.',
      permits: 'Rum Island lists $5 per vehicle. Check current Santa Fe Park entry fees; commercial access has separate county requirements.',
      camping: 'Use a separately booked nearby O’Leno base camp. No overnight or sandbar camping is included in this day-trip itinerary.', campingClassification: 'nearby_basecamp',
      accessCaveats: ['Use the designated Rum Island river launch and marked parking.', 'Respect admission requirements for privately managed springs along the river.'],
      watchFor: ['Motorboats and other paddlers near access areas', 'Changing shoals and obstructions'],
    },
  },
  {
    id: 'peace-river-brownville-desoto-veterans', name: 'Peace River', riverId: 'peace-river-florida', state: 'Florida', region: 'Southwest Florida / Arcadia',
    putIn: { name: 'Brownville Park boat ramp', latitude: 27.2979, longitude: -81.8465 },
    takeOut: { name: 'DeSoto Veterans Memorial Park boat ramp', latitude: 27.2242, longitude: -81.8819 },
    miles: 9.5, summary: 'A longer wooded Peace River day trip from Brownville to the public landing near Arcadia’s SR 70 bridge.',
    difficulty: 'moderate', difficultyNotes: 'The longer distance requires sustained paddling and enough daylight; shallow channels and obstructions can slow progress.',
    seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12], seasonNotes: 'Avoid floodwater and thunderstorms; low water may require finding the deeper channel. Confirm the landing and park access before each trip.',
    gauge: { id: 'usgs-02296750', provider: 'usgs', siteId: '02296750', metric: 'discharge_cfs', unit: 'cfs', kind: 'direct', siteName: 'Peace River at SR 70 at Arcadia, FL', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02296750/' },
    conditionsNote: 'The Arcadia station is at the downstream end of this river corridor. Current telemetry was available at review, but no verified recreational threshold range supports a live route score.',
    hazards: ['low_water','strainers','fast_rise','private_banks'],
    safetyNotes: ['Wear a PFD and avoid floodwater, thunderstorms and obstructed channels.', 'Plan sufficient daylight for 9.5 miles and stage the take-out vehicle first.', 'Stay within legitimate public access areas; private banks are not assumed bailout or camping sites.'],
    logistics: {
      estimatedPaddleTime: 'Allow 4–6 hours; estimate varies with flow and stops',
      shuttle: 'Stage at DeSoto Veterans Memorial Park, then drive north to Brownville Park. Both end at county-managed facilities.',
      permits: 'Brownville lists a $2 day-use fee for non-campers; confirm current access arrangements at both parks.',
      camping: 'Brownville has reservable electric and non-electric campsites at the launch park. Camping is a separate reservation, not included in the paddle.', campingClassification: 'endpoint_campground',
      accessCaveats: ['Brownville’s page lists sunrise-to-sundown access but also a Sunday noon opening; confirm Sunday launch time with the park.', 'DeSoto Veterans Memorial Park is open sunrise to sundown. Finish before closing.'],
      watchFor: ['Low-water shoals and changing channels', 'Heat, lightning and storm-driven rises'],
    },
    guide: { label: 'Florida DEP Peace River paddling guide', url: 'https://floridadep.gov/sites/default/files/Peace_R_Guide_6.pdf', provider: 'local' },
    sources: [
      { label: 'Brownville Park access and camping', url: 'https://www.desotobocc.com/Facilities/Facility/Details/Brownville-Park-Boat-Ramp-1', provider: 'local' },
      { label: 'DeSoto Veterans Memorial Park access', url: 'https://www.desotobocc.com/Facilities/Facility/Details/DeSoto-Veterans-Memorial-Park-3', provider: 'local' },
    ],
    coordinateNote: 'DEP map 6 prints both boat-launch waypoints; access entries give mile 60.5 and mile 70, a 9.5-mile difference. Use this segment mileage rather than the guide’s inconsistent whole-trail total.',
    reviewDate: '2026-09-09',
  },
];

export const floridaRoutes = floridaStarterSpecs.map(buildStarterPlanningRoute);
