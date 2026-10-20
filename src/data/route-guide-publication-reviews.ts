import type { PaddlePlanningGuide } from './priority-paddle-guides';

/** Search-guide decisions are independent of public trip records and flow-score eligibility. */
export interface RouteGuidePublicationReview {
  riverId: string;
  mode: 'access-planning' | 'reach-guides';
  reviewedOn: string;
  rationale: string;
  retainedGuides: readonly string[];
  hubOptions: readonly string[];
  underReview?: readonly { slug: string; title: string; explanation: string; source: { label: string; url: string } }[];
  guide: PaddlePlanningGuide;
}

const maineAccess = {
  label: 'Maine DACF public launch inventory',
  url: 'https://www.maine.gov/dacf/parks/water_activities/boating/public_boat_launches/boat_sites.shtml',
};
const lowerSnoqualmie = {
  label: 'The Mountaineers lower Snoqualmie guide',
  url: 'https://www.mountaineers.org/activities/routes-places/snoqualmie-river-plum-landing-to-fall-city',
};
const contoocookGuide = {
  label: 'Forest Society nine-mile paddle guide',
  url: 'https://www.forestsociety.org/document/contoocook-river-paddleedited2023pdf.pdf',
};

export const routeGuidePublicationReviews: readonly RouteGuidePublicationReview[] = [
  {
    riverId: 'delaware-river-new-jersey',
    mode: 'access-planning',
    reviewedOn: '2026-10-20',
    rationale: 'Retain four guides with distinct rapid, dam, exit or tidal-transition decisions. Five shorter or combined access choices repeat the same station and regional guidance and belong in the comparison hub. Preserve all nine supported choices, with individual hazards and access terms. Two unexplained upstream itineraries and one trip crossing an unreviewed wing-dam passage are held separately; consolidation must not make those usable plans. No historically protected recovery winner or comparison family is changed. The available performance audit does not establish demand for these individual pages; absence of rows is not proof of zero demand or a Google penalty.',
    retainedGuides: [
      'delaware-river-belvidere-phillipsburg',
      'delaware-river-bulls-island-lambertville',
      'delaware-river-lambertville-firemens-eddy',
      'delaware-river-firemens-eddy-trenton',
    ],
    hubOptions: [
      'delaware-river-frenchtown-kingwood',
      'delaware-river-kingwood-fairview',
      'delaware-river-fairview-byram',
      'delaware-river-kingwood-byram',
      'delaware-river-firemens-eddy-washington-crossing',
    ],
    underReview: [
      { slug: 'delaware-river-kittatinny-worthington', title: 'Kittatinny to Worthington: upstream itinerary unverified', explanation: 'NPS lists Worthington upstream of Kittatinny. This older trip orders the sites upstream without explaining an upstream paddling plan. It is unavailable while the intended direction, facilities and itinerary are reviewed. The old identity is preserved rather than silently changing the launch and finish.', source: { label: 'NPS Middle Delaware downstream access-mileage table', url: 'https://www.nps.gov/dewa/planyourvisit/boating-and-boating-safety.htm' } },
      { slug: 'delaware-river-worthington-poxono', title: 'Worthington to Poxono: upstream itinerary unverified', explanation: 'NPS places Poxono upstream of Worthington. Public launch listings do not establish the former upstream shuttle plan. This trip is unavailable until its intended itinerary and current facilities are verified; reversing the endpoints would be a different plan.', source: { label: 'NPS Middle Delaware downstream access-mileage table', url: 'https://www.nps.gov/dewa/planyourvisit/boating-and-boating-safety.htm' } },
      { slug: 'delaware-river-byram-bulls-island', title: 'Byram to Bull’s Island: wing-dam passage needs review', explanation: 'The NJDEP map places the Lumberville wing dam between Byram and the Bull’s Island river ramp. The former advice to avoid wing dams did not explain how to complete this short trip. It is unavailable until a supported passage or lawful carry is reviewed. The two launches are not interchangeable sides of the dam.', source: { label: 'NJDEP Bull’s Island area map', url: 'https://dep.nj.gov/wp-content/uploads/parksandforests/bullsisland-area.pdf' } },
    ],
    guide: {
      title: 'Choose a Lower Delaware trip by its hazards and finish',
      introduction: 'Compare nine New Jersey access plans below, including four guides with different rapid, dam or tidal-water commitments. Five shorter or combined choices stay here with their own launch, landing and shuttle details. All are planning only: station observations do not supply a same-day paddle score. Three older itineraries have specific review explanations instead of launchable plans.',
      decisions: [
        { heading: 'Read the station that applies to the corridor', text: 'NJDEP directs D&R park river users around Frenchtown, Stockton and Lambertville to Riegelsville. The six corresponding plans now use USGS 01457500 as proxy context. Belvidere remains the launch-area station for the Foul Rift trip; the two Firemen’s Eddy downstream choices retain Trenton context. None provides a calibrated recreational cutoff.', source: { label: 'NJDEP D&R park river-launch and stream-gauge guidance', url: 'https://dep.nj.gov/parksandforests/state-park/dr-canal-state-park/' } },
        { heading: 'Belvidere to Phillipsburg includes Foul Rift', text: 'Foul Rift is a Class II feature for experienced boaters, not a routine extension of a gentle access-to-access float. Review the rapid, equipment and rescue plan locally. NPS access markers suggest about 14–15 miles, replacing the unsupported seventeen-mile label. Belvidere telemetry is upstream launch context; finish at the NJ Phillipsburg ramp before the Lehigh confluence.', source: { label: 'National Wild and Scenic Rivers System — Foul Rift', url: 'https://www.fws.gov/rivers/river/delaware-lower' }, route: { label: 'Read the Belvidere–Phillipsburg guide', slug: 'delaware-river-belvidere-phillipsburg' } },
        { heading: 'Start below one wing dam and finish above the next', text: 'For Bull’s Island–Lambertville, the NJDEP map places the island river ramp below the Lumberville wing dam. Byram is above it. Use the correct river ramp and finish at Lambertville before the separate Lambertville wing dam; a start at Byram or finish at Firemen’s Eddy changes the hazard plan.', source: { label: 'NJDEP Bull’s Island ramp and wing-dam map', url: 'https://dep.nj.gov/wp-content/uploads/parksandforests/bullsisland-area.pdf' }, route: { label: 'Read the Bull’s Island–Lambertville guide', slug: 'delaware-river-bulls-island-lambertville' } },
        { heading: 'Lambertville to Firemen’s Eddy requires whitewater passage', text: 'Staying in Lambertville’s upstream pool cannot reach Firemen’s Eddy. The local paddling club describes complex whitewater below the wing-dam opening and calls for full whitewater equipment and local knowledge. Arrange a qualified local passage plan. This guide supplies neither a safe line nor a verified public portage; choose another trip if the group cannot negotiate the hazard.', source: { label: 'Lehigh Valley Kayak and Canoe Club — Lambertville', url: 'https://lehighvalleycanoeclub.org/content.aspx?club_id=729461&module_id=567398&page_id=22' }, route: { label: 'Read the Lambertville–Firemen’s Eddy guide', slug: 'delaware-river-lambertville-firemens-eddy' } },
        { heading: 'Washington Crossing and Trenton are different commitments', text: 'The shorter Firemen’s Eddy option finishes at the NJ Washington Crossing access. Continuing to Trenton adds Scudders, the Falls at Trenton and tidal water. The archived water-trail map identifies that transition; arrange current rapid scouting, tide planning and a usable municipal landing. A Trenton discharge reading is not a tide prediction.', source: { label: 'DRBC archived water-trail map — Scudders and Trenton', url: 'https://www.nj.gov/drbc/library/documents/watertrailguide_2.pdf' }, route: { label: 'Read the longer Firemen’s Eddy–Trenton guide', slug: 'delaware-river-firemens-eddy-trenton' } },
        { heading: 'Compare the Kingwood, Fairview and Byram choices together', text: 'Kingwood–Byram combines Kingwood–Fairview and Fairview–Byram. NPS markers give 1.4 plus 5.9, or 7.3 reference miles; the former 6.1-mile label did not reconcile. Fairview is a primitive non-motorized access, with a carry and parking check distinct from Kingwood’s ramp. These remain individual choices with their own shuttles, rather than three repeated guides.', source: { label: 'NPS Lower Delaware access names and river-mile markers', url: 'https://www.nps.gov/lode/planyourvisit/motorboating.htm' } },
        { heading: 'Use Lower Delaware access rules', text: 'These nine plans are outside Delaware Water Gap National Recreation Area. Its campsite arrangements and numeric gauge-height closure bands do not govern this corridor. Check the manager of each launch. NJDEP’s park guidance lists five river launches and a Memorial Day–Labor Day permit season, with Lambertville excepted; that is not a blanket permit rule for every listed access.', source: { label: 'NJDEP D&R park — Delaware River boating', url: 'https://dep.nj.gov/parksandforests/state-park/dr-canal-state-park/' } },
      ],
    },
  },
  {
    riverId: 'allagash-river',
    mode: 'access-planning',
    reviewedOn: '2026-10-20',
    rationale: 'Retain one source-supported upper access plan in the existing river hub, rather than duplicate that single plan in a separate guide. The complete manager brochure distinguishes nine river miles to the head of Umsaskis Lake from five additional lake miles to the road crossing. The inventory separately identifies the correct T11 R13 public carry-in. Three lower/upstream records have actual source-binding or direction failures and are held for research, not concealed as usable hub options. Their old paths open explicit review explanations. Allagash has no protected recovery-cohort page; absent Search Console rows are unobserved demand, not proof of zero demand. This review does not establish a complete waterway itinerary or a recreational flow cutoff.',
    retainedGuides: [],
    hubOptions: ['allagash-river-churchill-dam-umsaskis'],
    underReview: [
      { slug: 'allagash-river-t15r11-t13r12', title: 'T15 R11 to T13 R12: direction needs correction', explanation: 'This older eighteen-mile plan orders its endpoints upstream against the Allagash’s northward flow. Two access listings do not establish that trip. It is unavailable while the intended itinerary, direction and distance are reviewed.', source: { label: 'DACF northward-flow and planning guidance', url: 'https://www.maine.gov/dacf/parks/water_activities/aww-river-conditions.shtml' } },
      { slug: 'allagash-river-michaud-farm-allagash-falls', title: 'Michaud Farm to the Falls: landing and exit unverified', explanation: 'The stored finish is an upstream T15 R11 access point, not a verified landing at the Falls. The source’s three-mile river stage does not establish a vehicle take-out there. This plan is unavailable until its above-falls landing, exit or continuation and portage are verified.', source: { label: 'DACF complete waterway map and mileage chart', url: 'https://www.maine.gov/dacf/parksearch/PropertyGuides/PDF_GUIDE/aww-guide.pdf' } },
      { slug: 'allagash-river-allagash-falls-twin-brook', title: 'Falls to Twin Brook / Village: start and finish need review', explanation: 'The former below-falls start uses that same upstream access point. The mandatory Falls portage, Twin Brook and Allagash Village are separate places. This plan is unavailable until a safe post-portage entry, exact downstream finish and shuttle are verified.', source: { label: 'DACF access and portage rules, sections 2.10 and 2.15', url: 'https://www.maine.gov/dacf/parks/park_passes_fees_rules/aww_rules.shtml' } },
    ],
    guide: {
      title: 'Plan the upper Allagash with the correct lake finish',
      introduction: 'One upper Allagash access plan is available here. It links the nine-mile river section below Churchill Dam with about five lake miles to the Umsaskis road access. Arrange the rapids, carry, lake crossing and remote shuttle before departure. Three older plans remain under access review below; this page does not establish continuous passage through the full Waterway.',
      decisions: [
        { heading: 'The road finish is beyond the nine-mile river section', text: 'DACF’s brochure describes nine miles from Churchill Dam to the head of Umsaskis Lake, then five miles to the American Realty Road crossing. The approximately fourteen-mile plan combines those descriptions to reach the public carry-in. Carries and side exploration add distance; do not stop planning at the first sight of the lake.', source: { label: 'DACF complete map, trip description and mileage chart', url: 'https://www.maine.gov/dacf/parksearch/PropertyGuides/PDF_GUIDE/aww-guide.pdf' } },
        { heading: 'The village gauge is remote context', text: 'USGS 01011000 measures the Allagash near Allagash village, far downstream of this upper river-and-lake plan. It does not establish Churchill Dam releases, Chase Rapids passage, lake wind or landing access. This plan has no same-day score or calibrated recreational flow cutoff.', source: { label: 'USGS Allagash River near Allagash', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01011000/' } },
        { heading: 'Arrange the dam and Chase Rapids plan', text: 'Confirm the below-dam launch with the ranger and never paddle over the dam. The brochure describes paid portage around the most difficult part of Chase Rapids. Arrange current staffing and the exact carry or transport limits; it is not a promise that all rapids can be bypassed. The lake crossing then needs its own wind and daylight margin.', source: { label: 'DACF Waterway guide and Chase Rapids advice', url: 'https://www.maine.gov/dacf/parksearch/PropertyGuides/PDF_GUIDE/aww-guide.pdf' } },
        { heading: 'Use the T11 R13 lake access', text: 'The launch inventory lists Umsaskis Lake in T11 R13 at 46.61410,-69.39360 as a state carry-in. The former T13 R12 point is a different downstream access. Facility pins are not surveyed wet entries; verify the carry, landing, parking and private-road conditions before staging.', source: maineAccess },
        { heading: 'Check watercraft, camping and legal access', text: 'The Waterway rules distinguish designated motor-vehicle access from portage trails and campsites. They restrict watercraft type and dimensions; inflatable craft are prohibited on this section. Overnight parties must register and use authorized camping. Confirm current manager terms before travel.', source: { label: 'DACF Waterway rules, sections 2.1, 2.2, 2.8, 2.10 and 2.15', url: 'https://www.maine.gov/dacf/parks/park_passes_fees_rules/aww_rules.shtml' } },
      ],
    },
  },
  {
    riverId: 'bitterroot-river-montana',
    mode: 'access-planning',
    reviewedOn: '2026-10-20',
    rationale: 'FWP independently names Hannon Memorial–Wally Crawford as Section 4, with a nine-mile length and a specific outfitter restriction. Retain that guide. The other seven records primarily combine access listings and one Bell Crossing observation station; two are longer combinations of sibling plans. Preserve all eight choices and their individual restrictions in one planning hub rather than publish seven substantially repeated guides. Absence from the available Search Console export is unobserved demand, not proof of zero demand. Distances outside Section 4 remain explicitly unverified; consolidation does not validate continuity or cure an access failure.',
    retainedGuides: ['bitterroot-river-hannon-wally'],
    hubOptions: [
      'bitterroot-river-wally-anglers-roost',
      'bitterroot-river-anglers-roost-tucker-crossing',
      'bitterroot-river-tucker-crossing-bell-crossing',
      'bitterroot-river-bell-crossing-poker-joe',
      'bitterroot-river-poker-joe-chief-looking-glass',
      'bitterroot-river-bell-crossing-chief-looking-glass',
      'bitterroot-river-hannon-chief-looking-glass',
    ],
    guide: {
      title: 'Plan Bitterroot access, carries and section restrictions',
      introduction: 'Start with the source-defined Hannon–Wally section or compare the valley’s access plans below. The remaining distances and travel times are unverified estimates. Confirm the river between the sites, legal landings, wood and current closures before arranging a shuttle. All eight choices are planning only, with no same-day paddle score.',
      decisions: [
        {
          heading: 'Hannon to Wally is a named nine-mile section',
          text: 'FWP lists Hannon Memorial–Wally Crawford as Section 4, nine miles. Float outfitting is prohibited there on Mondays from June 1 through September 15. This restriction is not a ban on all recreational floating and does not extend across the lower-valley plans. Public recreational users do not need the restricted-river commercial permit; separate access and fishing rules still apply.',
          source: { label: 'FWP restricted-river permits and Section 4 calendar', url: 'https://fwp.mt.gov/buyandapply/specialuseriverpermits' },
          route: { label: 'Read the Hannon–Wally Section 4 guide', slug: 'bitterroot-river-hannon-wally' },
        },
        {
          heading: 'Read Bell Crossing telemetry as context',
          text: 'USGS 12350250 measures the Bitterroot at Bell Crossing near Victor. It does not establish the depth, wood, landing access or passage along every upper and lower choice. These plans have no calibrated recreational flow cutoff; check the observation time and trend alongside current local information.',
          source: { label: 'USGS Bitterroot at Bell Crossing', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-12350250/' },
        },
        {
          heading: 'Confirm private access at Anglers’ Roost',
          text: 'FWP describes this privately owned site as available for public angling with check-in at the store. Its listing includes boating facilities, but that is not blanket permission for your launch or landing. Confirm the intended boat use with the owner before relying on either adjacent plan.',
          source: { label: 'FWP Anglers’ Roost access conditions', url: 'https://myfwp.mt.gov/fishMT/fas/39753889' },
        },
        {
          heading: 'Use Tucker West for the boat launch',
          text: 'Tucker Crossing includes substantial land on both sides of the river. FWP places the concrete boat launch at Tucker West. A facility pin or the larger east-side parcel does not identify the correct water entry; inspect the approach, channel and current notices before unloading.',
          source: { label: 'FWP Tucker Crossing west-side launch', url: 'https://myfwp.mt.gov/fishMT/fas/39754143' },
        },
        {
          heading: 'Do not assume Poker Joe is available',
          text: 'Poker Joe is walk-in only, with a quarter-mile carry. Its FWP page has a July 7 construction-closure notice with no year or reopening date. Confirm reopening with FWP before using it as a launch, finish or bailout. The notice does not establish a dated 2026 closure or a current opening.',
          source: { label: 'FWP Poker Joe access and undated closure notice', url: 'https://myfwp.mt.gov/fishMT/fas/39754187' },
        },
        {
          heading: 'Check stages before choosing a long combination',
          text: 'Bell–Chief combines two estimated segments. The 72-mile Hannon–Chief catalog label does not reconcile with the current component labels, which total 65 miles; neither total establishes a validated valley-wide trip. Resolve distances, legal exits, private permissions and overnight arrangements stage by stage. The FWP inventory establishes facilities, not these full itineraries.',
          source: { label: 'FWP Region 2 access inventory', url: 'https://myfwp.mt.gov/fishMT/region/2' },
        },
      ],
    },
  },
  {
    riverId: 'woonasquatucket-river-rhode-island',
    mode: 'access-planning',
    reviewedOn: '2026-10-20',
    rationale: 'Retain the named upper paddle and two source-supported Esmond alternatives as planning choices. Historical flow observations do not establish the copied 50-cfs cutoff. Nine inaccurate endpoint/access plans are held separately, preserving research; the existing sixteen cross-gap holds remain. Current source review supersedes the October 7 assumption that every lower endpoint pair had verified public landings.',
    retainedGuides: ['woonasquatucket-river-georgiaville-cricket'],
    hubOptions: ['woonasquatucket-river-georgiaville-esmond', 'woonasquatucket-river-esmond-cricket'],
    guide: {
      title: 'Plan the upper Woonasquatucket before choosing a launch',
      introduction: 'The named Georgiaville-to-Greystone paddle and two shorter Esmond choices remain available. Scout the carries and check current access and water-quality notices. Centerdale telemetry is context; these plans have no same-day score.',
      decisions: [
        {
          heading: 'The named upper trip includes dam carries',
          text: 'WRWC’s 2012 guide names an approximately 2.5-mile Georgiaville-to-Greystone trip. It requires carrying around the Georgiaville spillway and arranging passage at Esmond Dam before continuing to Cricket Park. Check town launch terms and inspect every carry before departure.',
          source: { label: 'WRWC upper-river guide, printed pages 12–15', url: 'https://wrwc.org/wp/wp-content/uploads/2020/05/completePaddlingGuide.pdf' },
          route: { label: 'Read the Georgiaville-to-Greystone planning guide', slug: 'woonasquatucket-river-georgiaville-cricket' },
        },
        {
          heading: 'Match the observation to its section',
          text: 'The upper guide reports rock contact near 75 cfs and faster current near 200 cfs at USGS 01114500 at Centerdale. Its separate 50-cfs observation concerns Manton-to-Atwells. These historical descriptions do not establish a calibrated cutoff for an upper trip or for tidal downtown water.',
          source: { label: 'WRWC flow observations, printed pages 12–13 and 16–17', url: 'https://wrwc.org/wp/wp-content/uploads/2020/05/completePaddlingGuide.pdf' },
        },
        {
          heading: 'Esmond is a portage-area choice',
          text: 'The guide permits a shorter start or finish at Esmond. The stored pin marks a park-portage area, not an exact dam-side water entry. Shorter distances and times are estimates; arrange a suitable entry, exit and public carry before using either option.',
          source: { label: 'Blueways Esmond Park Portage', url: 'https://exploreri.org/siteReport.php?siteID=344&src=criteria' },
        },
        {
          heading: 'Other launches need a corrected plan',
          text: 'Whipple, Manton, Riverside and downtown endpoint plans are under access review. Current WRWC trips use a new Kinsley Avenue launch; that does not validate our older endpoint combinations or establish a continuous upper-to-lower trip. Consult the operator for current local options.',
          source: { label: 'WRWC May 2026 downtown paddle update', url: 'https://wrwc.org/wrwc-launches-the-downtown-paddle-season/' },
        },
      ],
    },
  },
  {
    riverId: 'aroostook-river',
    mode: 'access-planning',
    reviewedOn: '2026-10-19',
    rationale: 'The launch inventory and one Washburn gauge support access research, but the repeated endpoint-pair descriptions do not establish nine independent reach guides.',
    retainedGuides: [],
    hubOptions: [
      'aroostook-river-ashland-washburn',
      'aroostook-river-caribou-presque-isle',
      'aroostook-river-fort-fairfield-caribou',
      'aroostook-river-masardis-ashland',
      'aroostook-river-masardis-washburn',
      'aroostook-river-oxbow-masardis',
      'aroostook-river-presque-isle-fort-fairfield',
      'aroostook-river-washburn-caribou',
      'aroostook-river-washburn-fort-fairfield',
    ],
    guide: {
      title: 'Research Aroostook access before choosing a trip',
      introduction: 'Use these access plans to compare named launches and prepare questions for a local trip check. They have no live paddle score or verified recreational flow range; the listed distances and times are planning estimates.',
      decisions: [
        {
          heading: 'Check the two launches and the water between them',
          text: 'The Maine inventory documents access sites. Before treating an endpoint pair as a float, confirm downstream direction, the intervening reach, obstructions, legal exits and the full shuttle. A launch listing alone does not confirm a continuous paddling itinerary.',
          source: maineAccess,
        },
        {
          heading: 'Use Washburn as an observation point',
          text: 'USGS 01017000 measures the Aroostook at Washburn. Compare its observation time and trend with local reports; a reading at Washburn does not establish passage, depth or access at Oxbow, Masardis, Caribou or Fort Fairfield.',
          source: { label: 'USGS Aroostook at Washburn', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01017000/' },
        },
        {
          heading: 'Keep the access plan with your trip',
          text: 'Select an access plan below to compare its map and expand its launch, shuttle, source and hazard notes. Save the selected plan after checking local access and the river corridor; a saved plan is not a new conditions report.',
          source: maineAccess,
        },
      ],
    },
  },
  {
    riverId: 'piscataquis-river',
    mode: 'access-planning',
    reviewedOn: '2026-10-19',
    rationale: 'Three access-pair records reuse launch-inventory guidance and a Penobscot proxy station. Keep the research choices together rather than present them as independent current-conditions guides.',
    retainedGuides: [],
    hubOptions: [
      'piscataquis-river-guilford-dover',
      'piscataquis-river-dover-medford',
      'piscataquis-river-medford-howland',
    ],
    guide: {
      title: 'Plan Piscataquis access with local river information',
      introduction: 'Compare Guilford, Dover-Foxcroft, Medford and Howland access plans here. The endpoint records help organize research; distances and times are estimates, and none of these plans has a live paddle score.',
      decisions: [
        {
          heading: 'Confirm the exact entry and exit',
          text: 'The launch inventory supplies named access anchors. Match the selected plan to the actual carry or ramp, parking rules and opening status. Confirm the intervening river, obstruction boundaries and legal exits before arranging a shuttle.',
          source: maineAccess,
        },
        {
          heading: 'Separate the Penobscot proxy from this river',
          text: 'The linked station is USGS 01034500 on the Penobscot at West Enfield. It is regional context, not a measurement of the selected Piscataquis reach, and no numeric paddle range is transferred from it. Seek current local river and access information.',
          source: { label: 'USGS Penobscot at West Enfield', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01034500/' },
        },
        {
          heading: 'Read the selected access plan',
          text: 'The picker retains each endpoint choice, map, shuttle and source notes. Review the complete plan rather than infer a recommended trip from an easy-looking distance or a nearby gauge reading.',
          source: maineAccess,
        },
      ],
    },
  },
  {
    riverId: 'snoqualmie-river-washington',
    mode: 'reach-guides',
    reviewedOn: '2026-10-19',
    rationale: 'Retain Plum–Fall City, Fall City–Neal and Fall City–Tolt as distinct documented choices; longer combinations and the alternate Neal start stay in the picker with their original flow and access details.',
    retainedGuides: [
      'snoqualmie-river-plum-fall-city',
      'snoqualmie-river-fall-city-neal',
      'snoqualmie-river-fall-city-tolt',
    ],
    hubOptions: [
      'snoqualmie-river-plum-neal',
      'snoqualmie-river-plum-tolt',
      'snoqualmie-river-neal-tolt',
    ],
    guide: {
      title: 'Choose a lower Snoqualmie reach before comparing conditions',
      introduction: 'Start with a focused reach guide, then compare extended endpoint choices in the picker. The lower-valley trips have different landing and shuttle commitments even when they share a condition model.',
      decisions: [
        {
          heading: 'Plum Landing to Fall City',
          text: 'Choose the established Plum-to-Fall City float when you want to finish at the community park. Check the park approach and landing before leaving the take-out vehicle; the named finish matters more than a general lower-river description.',
          source: { label: 'Fall City Community Park access', url: 'https://www.fallcityparks.org/fall-city-community-park.html' },
          route: { label: 'Read the Plum–Fall City guide', slug: 'snoqualmie-river-plum-fall-city' },
        },
        {
          heading: 'Fall City to Richter / Neal Road',
          text: 'The shorter downstream choice ends at the WDFW Richter site. Check that access site’s current notices and requirements separately from the community park; extending to Tolt changes the planned finish and shuttle.',
          source: { label: 'WDFW Richter access', url: 'https://wdfw.wa.gov/places-to-go/water-access-sites/richter-628' },
          route: { label: 'Read the Fall City–Neal guide', slug: 'snoqualmie-river-fall-city-neal' },
        },
        {
          heading: 'Continue toward Tolt with a full-day plan',
          text: 'The Mountaineers describes a lower-river itinerary toward the Tolt confluence. Confirm the exact Tolt-MacDonald landing and allow for a longer day. Its flow guidance names a different station from this site’s Carnation gauge; do not move numeric ranges between gauges.',
          source: lowerSnoqualmie,
          route: { label: 'Read the Fall City–Tolt guide', slug: 'snoqualmie-river-fall-city-tolt' },
        },
      ],
    },
  },
  {
    riverId: 'contoocook-river-new-hampshire',
    mode: 'reach-guides',
    reviewedOn: '2026-10-19',
    rationale: 'Preserve the source-named nine-mile outfitter-shuttle trip and the public River Road–Riverway Park alternative; keep the other starts and long combinations as selectable plans with private-take-out restrictions intact.',
    retainedGuides: [
      'contoocook-riverway-park-canoe-company',
      'contoocook-river-river-road-riverway-park',
    ],
    hubOptions: [
      'contoocook-river-federal-canoe-company',
      'contoocook-river-federal-riverway-park',
      'contoocook-river-federal-river-road',
      'contoocook-river-river-road-canoe-company',
    ],
    guide: {
      title: 'Choose a Contoocook finish and arrange access first',
      introduction: 'Keep the public-landing plan separate from the outfitter-shuttle trip. The longer endpoint combinations remain available below with their specific take-out terms.',
      decisions: [
        {
          heading: 'The documented nine-mile trip needs a reservation',
          text: 'The Forest Society describes Riverway Park to Contoocook River Canoe Company as a one-way, nine-mile trip with a reserved paid shuttle. Confirm current operator terms before committing; the company landing and parking are not unrestricted public staging.',
          source: contoocookGuide,
          route: { label: 'Read the nine-mile shuttle guide', slug: 'contoocook-riverway-park-canoe-company' },
        },
        {
          heading: 'Use the public Riverway Park finish for a different plan',
          text: 'The River Road-to-Riverway Park choice ends before the outfitter section. Check both public approaches and current obstruction information. It has a different shuttle and landing commitment from a trip ending at the Canoe Company.',
          source: { label: 'New Hampshire access directory', url: 'https://www.merrimackvalleypaddlers.com/access/public-access-2015.html' },
          route: { label: 'Read the River Road–Riverway Park guide', slug: 'contoocook-river-river-road-riverway-park' },
        },
        {
          heading: 'A longer start needs its own agreement',
          text: 'The published nine-mile shuttle does not establish service for a Henniker or River Road start. For a longer company-finish plan, confirm your launch, boat, parking and pickup directly with the operator. Keep Henniker gauge context separate from an inspection of downstream obstructions.',
          source: { label: 'Contoocook River Canoe Company', url: 'https://www.contoocookcanoe.com/' },
        },
      ],
    },
  },
];

export const routeGuideReviewByRiverId = new Map(routeGuidePublicationReviews.map(review => [review.riverId, review]));
export const routeGuideReviewBySlug = new Map(routeGuidePublicationReviews.flatMap(review =>
  [...review.retainedGuides, ...review.hubOptions].map(slug => [slug, review] as const),
));

export const reviewedHubOptionTargets = routeGuidePublicationReviews.flatMap(review => review.hubOptions.map(slug =>
  [slug, `/rivers/by-river/${review.riverId}/#trip-${slug}`] as const,
));

export const reviewedResearchTargets = routeGuidePublicationReviews.flatMap(review => (review.underReview ?? []).map(notice =>
  [notice.slug, `/rivers/by-river/${review.riverId}/#review-${notice.slug}`] as const,
));
