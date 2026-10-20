/** Published-source comparisons for established route guides. No field review is implied. */
export interface PaddlePlanningGuide {
  title: string;
  introduction: string;
  decisions: {
    heading: string;
    text: string;
    source: { label: string; url: string };
    route?: { label: string; slug: string };
  }[];
}

const bigBend = { label: 'NPS Big Bend–Trego guide', url: 'https://www.nps.gov/sacn/planyourvisit/bigbend-trego.htm' };
const countyK = { label: 'NPS County K–Whispering Pine guide', url: 'https://www.nps.gov/sacn/planyourvisit/k-whispering.htm' };
const westBend = { label: 'Wisconsin River Trips field report', url: 'https://www.wisconsinrivertrips.com/segments/milwaukee-river/west-bend' };
const westBendAccess = { label: 'Visit West Bend access guide', url: 'https://visitwestbend.com/attraction/milwaukee-river/' };
const kelley = { label: 'Clermont Parks launch information', url: 'https://www.clermontparks.org/kelley-nature-preserve/' };
const entergyFloat = { label: 'Entergy float and access guide', url: 'https://www.entergy.com/blog/great-day-for-float/' };
const entergyNews = { label: 'Entergy lake and flow news', url: 'https://www.entergy.com/operations/hydro/data' };

export const priorityRouteGuides: Record<string, PaddlePlanningGuide> = {
  'little-miami-river-kelley-milford': {
    title: 'Plan the Kelley-to-Milford run',
    introduction: 'Match the launch, take-out and kind of paddling to the same reach before interpreting the Milford reading.',
    decisions: [
      {
        heading: 'Find the actual launch',
        text: 'Clermont Parks identifies canoe/kayak access at Kelley Nature Preserve, 297 Center Street in Loveland. Use the preserve as the start and Jim Terrell Park as the planned finish; a trip farther downstream needs its own access plan.',
        source: kelley,
      },
      {
        heading: 'Separate a play level from an easy float',
        text: 'The stage band above comes from American Whitewater’s Kelley–Milford guidance for Class I–II features. It does not measure minimum tubing depth or remove the need to scout the dam remnants. Compare the reading, trend and named hazards together.',
        source: { label: 'American Whitewater reach guidance', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/10600/main' },
      },
      {
        heading: 'Keep observations separate from forecasts',
        text: 'The Milford gauge records water at its station. Check the observation time as well as the trend; the weather outlook is a forecast, not a measurement of the river or a fresh inspection of obstructions.',
        source: { label: 'USGS Milford station', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-03245500/' },
      },
    ],
  },
  'namekagon-river-big-bend-trego': {
    title: 'Plan the Big Bend-to-Trego finish',
    introduction: 'The final channels and the choice of landing matter as much as the easy difficulty label.',
    decisions: [
      {
        heading: 'Budget the full NPS time range',
        text: 'NPS lists 7.7 miles and two to four hours. Add stops and the vehicle shuttle separately; Earl Park provides an intermediate landing for planning.',
        source: bigBend,
      },
      {
        heading: 'Reassess the channels near Trego',
        text: 'Below Highway 63, islands divide a wider, slower channel. NPS specifically identifies this area as prone to scraping in dry periods and advises using the main channel.',
        source: bigBend,
      },
      {
        heading: 'Keep the flowage a separate trip',
        text: 'Use Trego Town Park as this trip’s finish. NPS describes the downstream Trego Flowage as a five-mile extension with slow current and motorboat traffic; continuing changes the outing.',
        source: bigBend,
      },
    ],
  },
  'namekagon-river-county-k-whispering-pines': {
    title: 'Plan the County K day paddle',
    introduction: 'Use the official itinerary for the day plan and treat a past paddler’s gauge observation as a separate kind of evidence.',
    decisions: [
      {
        heading: 'Allow for the longer day',
        text: 'NPS gives 9.9 miles and three to six hours. Its islanded, mostly calm route differs from the shorter Big Bend–Trego outing. Check the listed distance discrepancy before treating a recorded GPS mileage as exact.',
        source: countyK,
      },
      {
        heading: 'Understand what 155 cfs establishes',
        text: 'The 155 cfs Leonards reading belongs to one May 2024 trip report. It is evidence of that outing, not a published minimum-flow study or an upper limit. Check current water and local observations alongside the score.',
        source: { label: 'WRT County K trip observation', url: 'https://www.wisconsinrivertrips.com/segments/namekagon-river/county-k-to-whispering-pines' },
      },
      {
        heading: 'Plan the exit before exploring islands',
        text: 'NPS warns that back channels may be obstructed by debris or vegetation. Locate Whispering Pine on Map 3 before leaving County K; downstream landings belong to a longer itinerary.',
        source: countyK,
      },
    ],
  },
  'milwaukee-river-west-bend-quaas-creek': {
    title: 'Plan the West Bend riffles and shuttle',
    introduction: 'A short urban route can still have different water-depth and boat-control demands within the same trip.',
    decisions: [
      {
        heading: 'Start below Washington Street Dam',
        text: 'Visit West Bend pairs the public launch south of Washington Street Dam with Quaas Creek Park, about four miles downstream. Confirm the carry and parking at both ends before unloading.',
        source: westBendAccess,
      },
      {
        heading: 'Apply the flow ladder to the right section',
        text: 'WRT’s 351–600 cfs target concerns the shallower stretch above Riverside Park. Its reference gauge is downstream at Cedarburg. The lower section is deeper, so the same reading does not describe identical conditions for every mile.',
        source: westBend,
      },
      {
        heading: 'Recheck the island and rapid',
        text: 'WRT reports a blocked south channel below the railroad bridge and a stronger rapid below Indiana Avenue at higher water. These are dated field observations: inspect current channels and wood rather than assuming a previously open line remains clear.',
        source: westBend,
      },
    ],
  },
  'ouachita-river-remmel-whitewater-park': {
    title: 'Plan around the Remmel release and exit',
    introduction: 'Release timing, travel time and the Rockport take-out need to work together for this tailwater trip.',
    decisions: [
      {
        heading: 'Check the current operating notice',
        text: 'Entergy’s published summer pattern is not a reservation for your trip date. Check its lake and flow news and the live Remmel gauge before driving, especially outside the usual Memorial Day–Labor Day recreational season.',
        source: entergyNews,
      },
      {
        heading: 'Leave time before the release ends',
        text: 'Entergy describes a three-to-four-hour float and advises starting at least two hours before recreational flow ends. Stops and slower groups need more margin because water can drop quickly after generation stops.',
        source: entergyFloat,
      },
      {
        heading: 'Inspect the Whitewater Park finish first',
        text: 'The planned exit is at 904 Riverview Drive. Entergy places the left-bank ramp after the rapid and before I-30, with current that can carry paddlers past it. Identify the exit before setting the shuttle.',
        source: entergyFloat,
      },
    ],
  },
};

export const priorityRiverGuides: Record<string, PaddlePlanningGuide> = {
  'namekagon-river': {
    title: 'Choose between the two established Namekagon day trips',
    introduction: 'These outings use different landings and time budgets. The shorter middle-river trip does not continue directly into the lower-river itinerary without the intervening flowage and dam corridor.',
    decisions: [
      {
        heading: 'Big Bend–Trego: shorter, with a shallow islanded finish',
        text: 'NPS: 7.7 miles, two to four hours. Earl Park is an intermediate landing; low-water scraping is most notable near the islands below Highway 63. Finish before extending into Trego Flowage.',
        source: bigBend,
        route: { label: 'Plan Big Bend to Trego', slug: 'namekagon-river-big-bend-trego' },
      },
      {
        heading: 'County K–Whispering Pine: longer and more secluded',
        text: 'NPS: 9.9 miles, three to six hours, with brief Class I sections. Plan more daylight and identify the exit before exploring island channels. The eight listed campsites apply to this itinerary.',
        source: countyK,
        route: { label: 'Plan County K to Whispering Pine', slug: 'namekagon-river-county-k-whispering-pines' },
      },
    ],
  },
  'little-miami-river': {
    title: 'Choose the Little Miami reach by its endpoints',
    introduction: 'A shared river name and Milford reading do not make neighboring trips interchangeable.',
    decisions: [
      {
        heading: 'Kelley Nature Preserve–Jim Terrell Park',
        text: 'This 4.9-mile guide pairs a named public launch with the Kelley–Milford whitewater reach. The level band is tied to that reach’s features; review the dam-remnant hazards before choosing it.',
        source: kelley,
        route: { label: 'Open the Kelley–Milford guide', slug: 'little-miami-river-kelley-milford' },
      },
      {
        heading: 'Roger’s Ballpark–Carl A. Rahe Access',
        text: 'This separate 5.5-mile plan has different endpoints and is presented without a same-day score. Use its own launch, take-out and hazard notes; the Kelley–Milford play range does not establish a range for this trip.',
        source: { label: 'ODNR Little Miami access map', url: 'https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/parks/streammaps/LittleMiamiScenicRiver.pdf' },
        route: { label: 'Open the Roger’s Ballpark–Rahe guide', slug: 'little-miami-river-rogers-ballpark-carl-rahe' },
      },
    ],
  },
  'milwaukee-river': {
    title: 'Distinguish West Bend from other Milwaukee River trips',
    introduction: 'Choose the actual launch and finish first, then use the flow notes attached to that trip.',
    decisions: [
      {
        heading: 'West Bend: Washington Street Dam–Quaas Creek',
        text: 'The roughly four-mile city trip begins below the dam. Its riffles above Riverside Park differ from the deeper lower stretch; WRT’s Cedarburg flow ladder applies most specifically to the upper portion.',
        source: westBend,
        route: { label: 'Open the West Bend guide', slug: 'milwaukee-river-west-bend-quaas-creek' },
      },
      {
        heading: 'Resolve the Riverside Park name',
        text: 'Milwaukee County lists a different Riverside Park launch near the Urban Ecology Center and a finish at South Water and Bruce Street. Match city and take-out as well as the park name when arranging a shuttle; this is separate from West Bend.',
        source: { label: 'Milwaukee County designated launches', url: 'https://county.milwaukee.gov/EN/Parks/Explore/Trails/River-Trails' },
        route: { label: 'Compare the Milwaukee–Bruce Street route', slug: 'milwaukee-river-riverside-bruce-street' },
      },
    ],
  },
};
