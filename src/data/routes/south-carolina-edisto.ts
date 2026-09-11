import type { River } from '../../lib/types';

const id = 'north-fork-edisto-baughmans-orangeburg';
const guide = { label: 'SCDNR Edisto River Basin Boating Guide', url: 'https://www.dnr.sc.gov/water/river/pdf/edistoboatingguide.pdf', provider: 'local' as const };
const putIn = { name: "Baughman's Landing", latitude: 33.5255, longitude: -80.9472 };
const takeOut = { name: 'Orangeburg City Landing', latitude: 33.48001, longitude: -80.87395 };

export const southCarolinaEdistoRoutes: River[] = [{
  id, slug: id, name: 'North Fork Edisto River', riverId: 'north-fork-edisto-river', state: 'South Carolina', region: 'Orangeburg County',
  reach: "Baughman's Landing to Orangeburg City Landing", latitude: putIn.latitude, longitude: putIn.longitude,
  summary: "A 9.2-mile North Fork Edisto flatwater trip from Baughman's Landing to the Orangeburg City Landing, with broad bends, fallen trees and changing channels through the Edisto floodplain.",
  statusText: 'Use the Orangeburg gauge and avoid rising water, storms and indistinct channels. The minimum is a planning cue, not a clearance of every obstruction.',
  routeType: 'recreational', scoreEligibility: 'scored',
  gaugeSource: { id: 'usgs-02173500', provider: 'usgs', siteId: '02173500', metric: 'gage_height_ft', unit: 'ft', kind: 'direct', siteName: 'North Fork Edisto River at Orangeburg, SC', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02173500/' },
  profile: {
    thresholdModel: 'minimum-only', tooLow: 3.5,
    thresholdSource: guide, thresholdSourceStrength: 'official', rainfallSensitivity: 'high', windSensitivity: 0.45,
    seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12], seasonNotes: 'The guide notes higher water in late winter and spring and lower levels in summer and fall. High water can make channels difficult and hazardous; low water increases portage around deadfall.',
    difficulty: 'moderate', difficultyNotes: 'Flatwater with possible current, fallen trees, bridge crossings, private banks and multiple channels. Intermediate moving-water judgment and navigation are appropriate.',
    confidenceNotes: 'SCDNR Edisto guide map/index explicitly says best North Fork boating conditions are at least 3.5 ft at Orangeburg gauge 02173500. The selected segment uses the guide’s Baughman’s RM37.9 to Orangeburg City RM28.6 access pair and its 9.2-mile distance. This is minimum-only guidance: the guide warns that high water makes channels difficult and hazardous, and no defensible upper limit is claimed.',
  },
  safetyProfile: { riskLevel: 'caution', reviewStatus: 'reviewed', hazards: ['strainers','low_water','fast_rise','private_banks'], safetyNotes: [
    'Wear a PFD and carry offline navigation. The guide warns of drowned trees, bridge crossings and multiple channels.',
    'Do not launch below 3.5 ft on the Orangeburg gage, and do not treat a reading above that floor as an all-clear. Avoid rising or storm water.',
    'Stay within the named landings and public access approaches; private banks are not assumed bailout or camping sites.',
    'Plan the shuttle and finish before dark. Turn back when a blocked channel or high-water navigation cannot be handled safely.',
  ] },
  putIn, takeOut,
  accessPoints: [{ ...putIn, id: `${id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: 'SCDNR guide identifies a boat ramp and limited parking at Baughman’s Landing.' }, { ...takeOut, id: `${id}-take-out`, mileFromStart: 9.2, segmentKind: 'transition', note: 'Use the city landing access south of US 301 from Edisto Memorial Gardens.' }],
  logistics: {
    distanceLabel: 'About 9.2 river miles', estimatedPaddleTime: 'Allow 4–6 hours, longer for scouting or carries',
    shuttle: "Stage at Orangeburg City Landing and drive to Baughman's Landing on Shillings Bridge Road. Confirm both approaches before unloading.",
    permits: 'SCDNR identifies both locations as boat-ramp access. Confirm posted parking, hours and any local notices at the landings.',
    camping: 'No overnight camping is established for this access pair; arrange lodging separately.', campingClassification: 'unknown',
    summary: "A distinct North Fork Edisto day trip between SCDNR river miles 37.9 and 28.6.",
    accessCaveats: ['Baughman’s guide entry notes limited parking; do not block the landing or adjacent road.', 'Orangeburg City Landing is an urban access point; confirm current parking and construction conditions.', 'Guide coordinates are approximate map values and are not a survey of ramp water-entry edges.'],
    watchFor: ['Fallen trees and changing channels', 'Rapid rises and high-water navigation', 'Bridge crossings and private banks'],
  },
  evidenceNotes: [
    { label: 'Reach and distance', value: 'River miles 37.9 to 28.6; 9.2 miles', note: 'SCDNR Edisto guide access table lists Baughman’s Landing to Orangeburg City Landing as 9.2 miles.', sourceUrl: guide.url },
    { label: 'Numeric scoring evidence', value: 'Orangeburg gauge minimum 3.5 ft', note: 'SCDNR’s North Fork index states best boating conditions are at least 3.5 ft at Orangeburg gauge 02173500. No upper threshold is inferred.', sourceUrl: guide.url },
    { label: 'Access and coordinate review', value: '2026-09-09', note: 'Both named endpoints and approximate decimal coordinates come from the SCDNR guide; recheck current access status and parking before release.', sourceUrl: guide.url },
  ],
  sourceLinks: [guide, { label: 'SCDNR current Maps & Access page', url: 'https://www.dnr.sc.gov/maps.html', provider: 'local' }, { label: 'USGS Orangeburg gauge', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-02173500/', provider: 'usgs' }],
}];
