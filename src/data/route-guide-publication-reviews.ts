import type { PaddlePlanningGuide } from './priority-paddle-guides';

/** Search-guide decisions are independent of public trip records and flow-score eligibility. */
export interface RouteGuidePublicationReview {
  riverId: string;
  mode: 'access-planning' | 'reach-guides';
  reviewedOn: string;
  rationale: string;
  retainedGuides: readonly string[];
  hubOptions: readonly string[];
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
