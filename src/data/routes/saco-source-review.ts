import type { River, SourceLink } from '../../lib/types';

export const sacoSources = {
  inventory: 'https://www.maine.gov/dacf/parks/water_activities/boating/public_boat_launches/boat_sites.shtml',
  council: 'https://sacorivercouncil.org/planning-a-trip/maps-and-mileage/',
  map: 'https://sacorivercouncil.org/wp-content/uploads/2025/07/Map-705x1024.webp',
  access: 'https://sacorivercouncil.org/river-access/',
  monitoring: 'https://srcc-maine.org/wp-content/uploads/2022/05/RIVERS-Volunteer-Manual-2022.pdf',
  dams: 'https://barmills.brookfieldusprojects.com/faq/',
  tidalAccess: 'https://www.maine.gov/dmr/fisheries/recreational/anglers-guide/kittery-to-cape-elizabeth',
  tides: 'https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8418828',
} as const;

const supported = new Set(['saco-river-route-160-brownfield', 'saco-river-fryeburg-brownfield', 'saco-river-saco-biddeford']);

/** Correct the facilities represented by existing pins; never move or reverse a saved trip. */
export function applySacoSourceReview(route: River): River {
  if (route.riverId !== 'saco-river' || !supported.has(route.slug)) return route;
  const tidal = route.slug === 'saco-river-saco-biddeford';
  const swans = route.slug === 'saco-river-route-160-brownfield';
  const putIn = { ...route.putIn!, name: tidal ? 'Front Street state boat ramp, Saco (below head of tide)' : swans ? 'Swan’s Falls managed launch area, Fryeburg (confirm below-dam entry)' : 'Canal Bridge managed access area, Fryeburg' };
  const takeOut = { ...route.takeOut!, name: tidal ? 'Meeting House Eddy / Marblehead state boat launch, Biddeford' : 'Brownfield Bridge DACF carry-in / managed access' };
  const reach = `${putIn.name} to ${takeOut.name}`;
  const distance = tidal ? 5 : swans ? 18 : 15;
  const summary = tidal
    ? 'Plan a tidal Saco River paddle from Front Street below the head-of-tide dam to Meeting House Eddy / Marblehead. Arrange the tide, wind, traffic and landing window separately from river-discharge observations.'
    : swans
      ? 'Plan the Council’s approximately eighteen-mile Swan’s Falls–Brownfield Bridge trip with an overnight arrangement, a below-dam start, Walker’s Rips review and a confirmed shuttle.'
      : 'Compare the shorter Canal Bridge start for the Brownfield Bridge plan. The Council map suggests roughly fifteen remaining reference miles; this still includes Walker’s Rips and needs an overnight or independently checked daylight plan.';
  const gaugeNote = tidal
    ? 'USGS 01067800 near Biddeford is river-station context when observations are available, not a tide or tidal-current prediction. Use NOAA’s Biddeford tide predictions and current local advice; predicted tide height does not establish slack current or safe passage.'
    : 'USGS 01066000 at Cornish is downstream proxy context, beyond the Hiram dam corridor. It does not measure local depth, releases or Walker’s Rips passage on this upper trip. No recreational flow cutoff or same-day paddle score is supplied.';
  const boundary = tidal
    ? 'Front Street is below the head-of-tide dam. Stay in the tidal corridor to the Marblehead finish; do not substitute an upstream municipal ramp or attempt a dam passage. Check wind, boat wakes, current direction and a usable landing window locally. This plan does not continue to the river mouth or ocean.'
    : 'Launch below Swan’s Falls dam only if using the Swan’s Falls start. Canal Bridge is downstream, not a Route 302 crossing. Both Brownfield plans continue through the Walker’s Rips area and finish at Brownfield Bridge; arrange a local rapid and wood check. The old Route 160 / Denmark start label identified a different place from its stored Fryeburg pin.';
  const sourceLinks: SourceLink[] = [...route.sourceLinks];
  for (const [label, url] of tidal
    ? [['Maine DMR — Front Street below head of tide and Marblehead access', sacoSources.tidalAccess], ['NOAA — Biddeford tide predictions (not tidal-current predictions)', sacoSources.tides]]
    : [['Saco River Council — trip durations and shuttle planning', sacoSources.council], ['Saco River Council — upper river sequence and reference mile markers', sacoSources.map], ['Saco River Council — managed access and parking passes', sacoSources.access], ['SRCC monitoring-site geography — not a launch-permission source', sacoSources.monitoring]]) {
    if (!sourceLinks.some(source => source.url === url)) sourceLinks.push({ label, url, provider: 'local' });
  }
  const accessPoints = route.accessPoints!.map((point, index, points) => ({ ...point,
    name: index === 0 ? putIn.name : index === points.length - 1 ? takeOut.name : point.name,
    mileFromStart: index === points.length - 1 ? distance : point.mileFromStart,
    note: 'Official facility-area anchor, not a surveyed water entry. Confirm the lawful carry, waterline and staging before launch.',
  }));
  return { ...route, reach, summary, putIn, takeOut, accessPoints,
    statusText: `Planning only. ${gaugeNote}`,
    profile: { ...route.profile, difficultyNotes: boundary, confidenceNotes: gaugeNote },
    safetyProfile: { ...route.safetyProfile!, safetyNotes: [
      'Wear a fitted PFD and carry suitable rescue equipment, communication, spare layers and an offline plan. Check current weather, cold water, wood, access notices and daylight.', boundary, gaugeNote,
    ] },
    logistics: { ...route.logistics!, summary,
      distanceLabel: tidal ? 'About 5 miles (unverified catalog estimate; measure the tidal channel before departure)' : `About ${distance} river miles from Council reference markers; actual launch and channel distance varies`,
      estimatedPaddleTime: tidal ? 'Set the departure and finish from local tidal-current, wind and landing advice; travel time is unverified' : swans ? 'Council suggests about two paddling days in average mid-summer conditions; arrange authorized overnight stops and allow for changing water and weather' : 'Allow overnight margin and confirm a daylight itinerary locally; travel time is unverified',
      shuttle: `Arrange the one-way shuttle from ${takeOut.name} to ${putIn.name} before departure. ${tidal ? 'Confirm current ramp terms and the tide window at both ends.' : 'Confirm parking passes and overnight vehicle terms with the Council; do not rely on taxis or an unarranged pickup.'}`,
      permits: tidal ? 'Confirm current state ramp, parking and boating requirements at Front Street and Marblehead.' : 'The Council requires parking passes for vehicles left at Swan’s Falls, Canal Bridge and Brownfield Bridge. Confirm current access, camping, fire and boating rules separately.',
      camping: tidal ? 'No on-route camping established. Arrange lodging separately; ramps and private banks do not grant camping rights.' : 'Arrange an authorized overnight site and current landowner or campground permission before departure. A sandbar or a launch listing does not grant camping rights.',
      campingClassification: tidal ? 'none' : 'nearby_basecamp',
      accessCaveats: ['The stored coordinates identify listed facility areas, not surveyed water-entry edges; confirm the exact carry and landing.', boundary,
        ...(swans ? ['Route line and GPX are withheld while the disconnected legacy hydrography is reviewed. The access pins remain available; do not use a straight connector as a navigation route.'] : [])],
      watchFor: tidal ? ['Tidal current, wind, boat wakes and a missed landing', 'Low-water ramp approach; upstream dam and downstream ocean boundaries'] : ['Below-dam launch, Walker’s Rips, wood and cold water', 'Overnight arrangements, parking passes, prearranged shuttle and daylight'],
    },
    evidenceNotes: [
      { label: 'Named facilities and trip boundary', value: reach, note: boundary, sourceUrl: tidal ? sacoSources.tidalAccess : sacoSources.map },
      { label: 'Distance and time evidence', value: tidal ? 'Catalog mileage unverified; tidal window required' : `${distance} approximate reference miles`, note: tidal ? 'The launch inventory identifies facilities but does not verify the former five-mile length or 2–4-hour travel time.' : swans ? 'The Council map reaches Brownfield near marker 18 and describes about two days from Swan’s Falls. The old ten-mile/day-trip label is withdrawn.' : 'Council map markers place Canal Bridge near 3 and Brownfield near 18: roughly fifteen remaining reference miles. This is a subtraction of approximate markers, not a surveyed track.', sourceUrl: tidal ? sacoSources.inventory : sacoSources.council },
      { label: 'Observation limits', value: `USGS ${route.gaugeSource.siteId}`, note: gaugeNote, sourceUrl: route.gaugeSource.detailUrl },
      { label: 'Access terms', value: 'Confirm current facility terms', note: tidal ? 'DMR warns of low-water access at Front Street; an all-tide ramp listing does not establish safe current, weather or boat traffic.' : 'Council-managed parking terms are distinct from state ownership; a parking pass does not establish camping permission.', sourceUrl: tidal ? sacoSources.tidalAccess : sacoSources.access },
      { label: 'Planning map', value: swans ? 'Facility pins; route trace under review' : 'Hydrography planning corridor', note: 'No recreational score, surveyed navigation line or safe dam/rapid passage is inferred.' },
      { label: 'Publication role', value: swans || tidal ? 'Distinct upper overnight or tidal guide' : 'Alternate upper launch in the river hub', note: 'A different endpoint pair alone does not justify another independent guide.' },
    ], sourceLinks,
  };
}
