import type { River } from '../../lib/types';

const lowerAccess = 'https://www.nps.gov/lode/planyourvisit/motorboating.htm';
const park = 'https://dep.nj.gov/parksandforests/state-park/dr-canal-state-park/';
const bullsMap = 'https://dep.nj.gov/wp-content/uploads/parksandforests/bullsisland-area.pdf';
const recreation = 'https://www.fws.gov/rivers/river/delaware-lower';
const club = 'https://lehighvalleycanoeclub.org/content.aspx?club_id=729461&module_id=567398&page_id=22';
const trailMap = 'https://www.nj.gov/drbc/library/documents/watertrailguide_2.pdf';
const riegelsvillePlans = new Set([
  'delaware-river-frenchtown-kingwood', 'delaware-river-kingwood-fairview',
  'delaware-river-fairview-byram', 'delaware-river-kingwood-byram',
  'delaware-river-bulls-island-lambertville', 'delaware-river-lambertville-firemens-eddy',
]);
const held = new Set([
  'delaware-river-kittatinny-worthington', 'delaware-river-worthington-poxono',
  'delaware-river-byram-bulls-island',
]);
const markerDistances: Record<string, { miles: number; label: string }> = {
  'delaware-river-belvidere-phillipsburg': { miles: 14.6, label: 'About 14–15 river miles (14.6 from NPS access markers; actual launch and channel distance varies)' },
  'delaware-river-kingwood-byram': { miles: 7.3, label: 'About 7.3 river miles from NPS access markers; confirm the actual channel distance' },
  'delaware-river-bulls-island-lambertville': { miles: 6.6, label: 'About 6.6 river miles from NPS access markers; confirm the actual channel distance' },
  'delaware-river-frenchtown-kingwood': { miles: 0.9, label: 'About 0.9 river mile from NPS access markers; confirm the actual channel distance' },
};
const reachNotes: Record<string, string> = {
  'delaware-river-belvidere-phillipsburg': 'This trip includes Foul Rift, identified as Class II by the National Wild and Scenic Rivers System. Scout and arrange appropriate moving-water skills, rescue support and equipment before committing. The Belvidere station is near the upstream launch; it does not clear Foul Rift or measure conditions at each rapid. Finish at the NJ Phillipsburg ramp before the Lehigh confluence; Scott Park in Easton is a different landing.',
  'delaware-river-bulls-island-lambertville': 'The Bull’s Island river ramp is downstream of the Lumberville wing dam on the NJDEP map. Use the river ramp, not a canal launch or the Byram ramp above the dam. Finish at Lambertville before the separate Lambertville wing dam. Continuing to Firemen’s Eddy changes this into a whitewater trip; it is not an interchangeable take-out.',
  'delaware-river-lambertville-firemens-eddy': 'Reaching Firemen’s Eddy from Lambertville requires passage through the Lambertville wing-dam area; staying in the upstream pool cannot complete this trip. The National Wild and Scenic Rivers System describes Class II rapids, and the local paddling club describes complex whitewater requiring full whitewater equipment and local knowledge. Arrange a qualified local passage plan and scout before launching. No verified public portage or safe line is supplied here; if the group cannot negotiate the hazard, choose a different trip.',
  'delaware-river-firemens-eddy-trenton': 'This longer trip continues beyond Washington Crossing through Scudders and the Falls at Trenton into tidal water. The local club requires full whitewater equipment at Scudders; the archived DRBC map identifies the Falls/tidal transition. Arrange local rapid scouting, rescue support, a tide window and a confirmed Trenton landing before launch. Trenton discharge is river context, not a tide prediction or clearance through the rapids. The dated NJDEP access list warns of inadequate ramp depth at low tide.',
  'delaware-river-firemens-eddy-washington-crossing': 'Finish at the named New Jersey Washington Crossing access. Continuing to Scudders or Trenton introduces separate rapid and tidal-water decisions. Confirm the carry and exact landing before launching; Trenton is downstream observation context, with no transferred recreational cutoff.',
  'delaware-river-kingwood-byram': 'This longer option combines Kingwood–Fairview and Fairview–Byram. NPS access markers give 163.4 minus 156.1, or 7.3 reference miles. Fairview is an intermediate primitive access only if current landing and parking are confirmed. Finish at Byram above the Lumberville wing dam; do not substitute Bull’s Island below the dam.',
  'delaware-river-fairview-byram': 'NPS lists Fairview as a primitive non-motorized access. Confirm the carry and legal parking; it is a different facility from Kingwood’s ramp. Finish at Byram above the Lumberville wing dam. A downstream finish at Bull’s Island would cross that structure and needs a separate passage plan.',
  'delaware-river-kingwood-fairview': 'This is the shorter primitive-landing choice within the Kingwood–Byram plan. Confirm Fairview’s carry, legal parking and landing before arranging the shuttle. Its short length does not remove main-stem current, cold water, wood or traffic risks.',
  'delaware-river-frenchtown-kingwood': 'NPS places Frenchtown Bridge and Kingwood 0.9 reference mile apart. Confirm the primitive Frenchtown carry and the separate Kingwood ramp terms; a park-wide permit statement does not establish the same rules at every access. Short distance does not remove current, bridge, cold-water or traffic hazards.',
};
const guideSummaries: Record<string, string> = {
  'delaware-river-belvidere-phillipsburg': 'Plan a roughly fourteen-to-fifteen-mile Delaware trip through Foul Rift’s Class II rapids, finishing at the New Jersey Phillipsburg ramp before the Lehigh confluence.',
  'delaware-river-bulls-island-lambertville': 'Compare a Lower Delaware day trip that starts at the Bull’s Island river ramp below Lumberville’s wing dam and ends at Lambertville above the next wing dam.',
  'delaware-river-lambertville-firemens-eddy': 'A short but advanced Lower Delaware trip requiring a locally reviewed whitewater passage through the Lambertville wing-dam area before the Firemen’s Eddy landing.',
  'delaware-river-firemens-eddy-trenton': 'Plan the longer Lower Delaware trip beyond Washington Crossing, with separate decisions for Scudders, the Falls at Trenton, tidal water and the municipal landing.',
};
const accessNotes: Record<string, string> = {
  'delaware-river-belvidere-phillipsburg': 'Use the New Jersey Phillipsburg ramp for the finish. Scott Park across the river at the Lehigh confluence is a different facility and needs a separate access plan.',
  'delaware-river-bulls-island-lambertville': 'Use the Bull’s Island Delaware River ramp below Lumberville wing dam, not the canal launch or Byram ramp. Arrange the Lambertville landing above its wing dam before departure.',
  'delaware-river-lambertville-firemens-eddy': 'Confirm the Firemen’s Eddy approach, parking and waterline before launching. Its dated gravel/vehicle description is not confirmation that the access is currently usable.',
  'delaware-river-firemens-eddy-trenton': 'Confirm current municipal access and a usable tide window at Trenton Waterfront Park. The old NJDEP list warns that the ramp can lack depth at low tide.',
  'delaware-river-firemens-eddy-washington-crossing': 'Confirm the exact New Jersey Washington Crossing primitive landing, carry, parking and current park notices before staging the shuttle.',
  'delaware-river-kingwood-byram': 'Arrange the Byram finish above Lumberville wing dam. Fairview can be an intermediate exit only after its carry and legal parking are confirmed.',
  'delaware-river-fairview-byram': 'Confirm Fairview’s primitive carry and legal parking and stage the finish at Byram above Lumberville wing dam.',
  'delaware-river-kingwood-fairview': 'Confirm Fairview’s primitive landing, carry and legal parking before using it as the finish; it is not the same facility as Kingwood’s ramp.',
  'delaware-river-frenchtown-kingwood': 'Confirm the primitive Frenchtown carry and current Kingwood ramp terms separately; do not assume that one facility’s permit covers both.',
};

/** Source-specific correction, independent of search-guide publication decisions.
 * Keep held research identities/endpoints intact rather than silently reversing them.
 */
export function applyDelawareNewJerseySourceReview(route: River): River {
  if (route.riverId !== 'delaware-river-new-jersey' || held.has(route.slug)) return route;
  const useRiegelsville = riegelsvillePlans.has(route.slug);
  const siteId = useRiegelsville ? '01457500' : route.gaugeSource.siteId;
  const siteName = useRiegelsville ? 'Delaware River at Riegelsville, NJ' : route.gaugeSource.siteName;
  const kind = route.slug === 'delaware-river-belvidere-phillipsburg' ? 'direct' : 'proxy';
  const detailUrl = `https://waterdata.usgs.gov/monitoring-location/USGS-${siteId}/`;
  const hydrographUrl = `https://waterdata.usgs.gov/nwis/uv/?referred_module=sw&site_no=${siteId}`;
  const gaugeNote = useRiegelsville
    ? 'NJDEP recommends Riegelsville for the D&R Canal State Park’s Delaware River corridor around Frenchtown, Stockton and Lambertville. It is downstream of the Lehigh confluence, unlike Belvidere. This is regional river context, with no calibrated route score; hydrologic normal-flow percentiles are not paddling-safety bands.'
    : kind === 'direct'
      ? 'Belvidere is near this trip’s upstream launch, above the Lehigh confluence. Its observation does not establish depth or passage at Foul Rift or the finish, and supplies no calibrated recreational cutoff.'
      : 'Trenton is downstream river-observation context. Stage is not the depth at another access and discharge is not a tide forecast. No same-day paddle score or calibrated recreational cutoff is supplied.';
  const regionalMismatch = (url: string) => /nps\.gov\/dewa\/|worthington-state-forest/.test(url);
  const sourceLinks = route.sourceLinks.map(source => ({
    ...source,
    label: regionalMismatch(source.url)
      ? 'Earlier Middle Delaware source — outside this Lower Delaware plan'
      : useRiegelsville && source.url.includes(route.gaugeSource.siteId!)
        ? `${source.label} (earlier station context; current plan uses Riegelsville)`
        : source.label,
  })).filter((source, index, all) => all.findIndex(other => other.url === source.url) === index);
  const addSource = (label: string, url: string, provider: 'local' | 'usgs' | 'nps') => {
    if (!sourceLinks.some(source => source.url === url)) sourceLinks.push({ label, url, provider });
  };
  addSource('NPS Lower Delaware access names and river-mile references', lowerAccess, 'nps');
  addSource('NJDEP D&R Canal State Park — river launches and Riegelsville context', park, 'local');
  addSource('NJDEP Bull’s Island map — river ramps and Lumberville wing dam', bullsMap, 'local');
  addSource('National Wild and Scenic Rivers System — Foul Rift and Lambertville rapids', recreation, 'local');
  addSource('Local paddling club — Lambertville and Scudders whitewater descriptions', club, 'local');
  addSource('Archived DRBC water-trail map — rapids and Trenton tidal transition', trailMap, 'local');
  addSource(`USGS ${siteId} ${siteName}`, detailUrl, 'usgs');
  addSource(`USGS ${siteId} current observations`, hydrographUrl, 'usgs');
  const distance = markerDistances[route.slug];
  const note = reachNotes[route.slug];
  const whitewater = ['delaware-river-belvidere-phillipsburg', 'delaware-river-lambertville-firemens-eddy', 'delaware-river-firemens-eddy-trenton'].includes(route.slug);
  const evidenceNotes = route.evidenceNotes.filter(e => !['Named moving-water corridor', 'Direct public endpoint evidence', 'Direct flow evidence', 'Proxy flow evidence', 'Live gauge', 'Camping posture'].includes(e.label));
  evidenceNotes.push(
    { label: 'Lower Delaware access context', value: route.reach, note: 'NPS lists these Lower Delaware facilities. This plan is outside Delaware Water Gap National Recreation Area; Middle Delaware park camping rules and numeric closure bands are not transferred here. Confirm current facility terms separately.', sourceUrl: lowerAccess },
    { label: 'Live gauge', value: `USGS ${siteId}, ${siteName}`, note: gaugeNote, sourceUrl: detailUrl },
    { label: 'Trip boundary', value: route.reach, note, sourceUrl: route.slug === 'delaware-river-belvidere-phillipsburg' ? recreation : route.slug.includes('lambertville-firemens') ? club : route.slug.includes('firemens-eddy-trenton') ? trailMap : lowerAccess },
    { label: 'Camping posture', value: 'No on-route camping established', note: 'Public ramps do not grant camping rights. Arrange any lodging or designated campground separately; Middle Delaware river campsites do not establish camping along this reach.', sourceUrl: park },
  );
  if (distance) evidenceNotes.push({ label: 'Reference mileage', value: distance.label, note: 'Difference between the NPS access-list river-mile markers, not a surveyed GPX length. This replaces the earlier catalog estimate; carries and channel choice can change actual travel distance.', sourceUrl: lowerAccess });
  const accessPoints = route.accessPoints?.map((point, index) => ({
    ...point,
    ...(distance && index === route.accessPoints!.length - 1 ? { mileFromStart: distance.miles } : {}),
    note: route.slug === 'delaware-river-lambertville-firemens-eddy' && index === 0
      ? 'Launch at the Lambertville river ramp upstream of the wing dam only with a separate, locally reviewed whitewater passage plan to reach Firemen’s Eddy. The canal is a different waterway.'
      : `${point.note} The NJDEP GPS inventory dates to October 2001; verify current access rather than treating its old fee or vehicle advice as current.`,
  }));
  return {
    ...route,
    summary: guideSummaries[route.slug] ?? route.summary,
    scoreEligibility: 'planning',
    scoreEligibilityReason: kind === 'proxy' ? 'proxy_gauge' : undefined,
    statusText: 'Planning only: confirm the exact river launch, landing, intervening hazards and current manager notices. Station observations are context; this trip has no same-day paddle score.',
    gaugeSource: { ...route.gaugeSource, id: `usgs-${siteId}`, siteId, siteName, kind, detailUrl, hydrographUrl },
    profile: { ...route.profile, difficultyNotes: note, confidenceNotes: `${gaugeNote} Facility coordinates are access-area anchors, not surveyed water entries. Current launch access and passage still require a local check.` },
    safetyProfile: { ...route.safetyProfile!, hazards: [...new Set([...route.safetyProfile!.hazards, ...(whitewater ? ['whitewater' as const] : [])])], safetyNotes: [
      'Wear a fitted PFD continuously and carry suitable rescue equipment, communication, spare layers and an offline plan. Current, cold water, wind, wood, bridge piers and motorboat traffic require a local check.',
      'Use the named New Jersey public accesses. Private banks, bridge shoulders, Pennsylvania facilities and the parallel canal are not automatic alternate landings.',
      note,
      gaugeNote,
    ] },
    accessPoints,
    logistics: { ...route.logistics!,
      summary: guideSummaries[route.slug] ?? route.logistics!.summary,
      ...(distance ? { distanceLabel: distance.label } : { distanceLabel: `${route.logistics!.distanceLabel} (catalog estimate; verify actual travel distance)` }),
      estimatedPaddleTime: `Planning estimate only: ${route.logistics!.estimatedPaddleTime}. Add time for scouting, carries and a missed landing; this is not a verified travel time.`,
      permits: 'Check each launch manager’s current rules. NJDEP’s D&R park guidance requires river-launch permits from Memorial Day through Labor Day at its five listed launches, with Lambertville excepted. That does not establish identical terms at Frenchtown, Fairview, Belvidere, Phillipsburg or Trenton. River boating and the parallel canal have different rules.',
      camping: 'No on-route camping is established by these access sources. Reserve lodging or a designated campground separately; ramps and private river banks do not grant camping rights.',
      campingClassification: 'none',
      accessCaveats: ['This is Lower Delaware planning, outside Delaware Water Gap National Recreation Area. Check current access notices and the manager of each launch; do not transfer Middle Delaware campsite rules or gauge-height closure bands.', 'Coordinates are facility-area anchors. The NJDEP GPS inventory is dated October 2001; confirm present parking, carry, vehicle access, fees and waterline before staging.', accessNotes[route.slug]],
      watchFor: [`USGS ${siteId} observation time and trend as ${kind === 'direct' ? 'upstream launch-area' : 'regional proxy'} context; no local-depth or safe-flow inference`, 'Current access notices, cold water, wind, wood, river traffic, daylight and shuttle arrangements'],
    },
    evidenceNotes, sourceLinks,
  };
}
