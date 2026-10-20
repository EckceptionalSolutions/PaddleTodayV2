import type { River } from '../../lib/types';

const retainedUpperTrips = new Set([
  'woonasquatucket-river-georgiaville-cricket',
  'woonasquatucket-river-georgiaville-esmond',
  'woonasquatucket-river-esmond-cricket',
]);

/** Scope the 2026-10-20 correction to retained trips; held research stays intact. */
export function applyWoonasquatucketSourceReview(route: River): River {
  if (!retainedUpperTrips.has(route.slug)) return route;
  const startsAtEsmond = route.slug === 'woonasquatucket-river-esmond-cricket';
  const finishesAtEsmond = route.slug === 'woonasquatucket-river-georgiaville-esmond';
  const guideUrl = 'https://wrwc.org/wp/wp-content/uploads/2020/05/completePaddlingGuide.pdf';
  const parkUrl = 'https://www.smithfieldri.gov/departments/parks-recreation/parks-facilities-beaches';
  const accessNote = startsAtEsmond
    ? 'Esmond is a park-portage access area, not a surveyed below-dam entry. Scout the public park path and select a suitable entry below Esmond Dam; the short downstream section includes breached-dam remnants before Greystone Mill Pond.'
    : 'Start at Georgiaville Town Beach only after checking current town access terms and water-quality notices. The 2012 WRWC guide describes a landing and carry around the unrunnable Georgiaville spillway; inspect the entire carry before launching.';
  const finishNote = finishesAtEsmond
    ? 'The Esmond coordinate marks the park-portage area, not a landing above the dam. Arrange a suitable exit and the required carry before launch; the guide warns of difficult take-out conditions above Esmond Dam.'
    : 'Finish at the Cricket Park hand-carry launch on Greystone Mill Pond and stay clear of the dam at the southeast end of the pond. Confirm the landing and parking before launch.';
  const { tooLow: _tooLow, idealMin: _idealMin, idealMax: _idealMax, tooHigh: _tooHigh, ...profile } = route.profile;
  return {
    ...route,
    scoreEligibility: 'planning',
    statusText: 'Plan an upper-river trip with current access, portage, rainfall and water-quality checks. The Centerdale observation is context; this trip has no calibrated same-day score.',
    sourceLinks: [...route.sourceLinks, { label: 'Town of Smithfield beach and boating access terms', url: parkUrl, provider: 'local' }],
    profile: {
      ...profile,
      seasonNotes: 'The 2012 WRWC upper-river guide describes frequent rock contact and occasional carries at 75 cfs, and swifter current with less time to avoid strainers near 200 cfs at Centerdale. These are historical observations, not a minimum, target range or clearance for today.',
      difficultyNotes: 'The upper corridor mixes flatwater, quickwater and Class I features. Trips from Georgiaville require a spillway carry; trips passing Esmond require a prearranged dam carry. Below Esmond, breached-dam remnants and wood can obstruct passage before the pond.',
      confidenceNotes: 'WRWC names the Georgiaville-to-Greystone paddle and shorter access choices at Esmond. Its downstream Centerdale gauge provides upper-river context, not a local entry measurement or a calibrated score cutoff. The 50-cfs observation belongs to the separate Manton-to-Atwells section. Stored points are access-area anchors and do not locate a safe dam-side water entry.',
    },
    safetyProfile: {
      ...route.safetyProfile!,
      safetyNotes: [
        'Wear a PFD and carry communication, spare layers and an offline trip plan. Scout wood, rocks and every carry before launch.',
        'Do not run the Georgiaville spillway. Scout Esmond Dam and arrange a suitable public carry; a gauge reading does not clear either structure.',
        'The historical upper-river observations at 75 and 200 cfs do not define a safe range. Higher current gives less time to avoid strainers; lower water can require carrying.',
        'Check current water-quality advisories and avoid contact with sediment. Georgiaville boating access has town rules and pass or sticker requirements; confirm the terms before staging.',
        'Stay clear of the Greystone dam. This trip does not continue through the unverified Allendale/Lymans pond-portage corridor.',
      ],
    },
    accessPoints: route.accessPoints?.map((point, index) => ({ ...point, note: index === 0 ? accessNote : finishNote })),
    logistics: {
      ...route.logistics!,
      distanceLabel: route.slug === 'woonasquatucket-river-georgiaville-cricket' ? 'Approximately 2.5 river miles' : `Estimated ${finishesAtEsmond ? '1.1' : '1.6'} river miles`,
      shuttle: `Stage the finish first and arrange a one-way vehicle shuttle. ${accessNote} ${finishNote}`,
      permits: 'Confirm current Town of Smithfield beach, vehicle, boat and trailer pass or sticker requirements for a Georgiaville start. Use public park approaches at Esmond and Cricket and respect posted closures and private banks.',
      accessCaveats: [
        'Coordinates identify access areas, not surveyed water-entry edges or dam-side landing positions.',
        accessNote,
        finishNote,
        'The named full upper paddle is approximately 2.5 miles in the 2012 guide. Shorter-option mileage and paddle times are estimates, not independently published measurements.',
        'The Town beach page and state health notices can differ in freshness. Confirm current local opening and advisory status before a Georgiaville launch.',
      ],
      watchFor: ['Current park and water-quality notices', 'Spillway and dam carries, breached-dam rocks and strainers', 'Rainfall and the Centerdale observation trend; no score cutoff'],
    },
    evidenceNotes: [
      { label: 'Upper trip and shorter choices', value: route.reach, note: 'WRWC’s 2012 guide, printed pages 12–15, names the full Georgiaville-to-Greystone paddle and access at Esmond. Shorter distances are estimates; the park-portage anchor does not identify an exact dam-side landing.', sourceUrl: guideUrl },
      { label: 'Historical upper-river observations', value: '75 and 200 cfs observations; no calibrated cutoff', note: 'Printed pages 12–13 describe rocky lower water and faster current at Centerdale. They do not establish the formerly copied 50-cfs minimum; that number occurs in the separate Manton-to-Atwells description.', sourceUrl: guideUrl },
      { label: 'Station context', value: 'USGS 01114500 at Centerdale', note: 'A station on the same river downstream of this upper trip. Its flow cannot establish current portage passage, pond conditions or lawful access.', sourceUrl: route.gaugeSource.detailUrl! },
      { label: 'Current access terms', value: 'Check Town of Smithfield notices before staging', note: 'Confirm town passes, stickers and current launch availability; neither this guide nor a gauge reading establishes that the beach or boat ramp is open.', sourceUrl: parkUrl },
    ],
  };
}
