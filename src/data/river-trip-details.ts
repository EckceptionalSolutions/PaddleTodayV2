import type { RiverTripDetails } from '../lib/types';

export const riverTripDetails: Record<string, RiverTripDetails> = {
  'big-fork-river-highway-6-south-north': {
    putIn: {
      name: 'Highway 6 South / State Hwy 6 Bridge carry-in access',
      latitude: 47.953023,
      longitude: -93.754988,
    },
    takeOut: {
      name: 'Bill Counter Landing / Highway 6 North carry-in access',
      latitude: 48.034694214683626,
      longitude: -93.74155634703675,
    },
    logistics: {
      distanceLabel: '15.7 mi',
      estimatedPaddleTime: 'Long day, roughly 6 hr to 8 hr depending on level and stops',
      shuttle:
        'Plan a remote two-car shuttle on Highway 6. Treat the route as a full-day commitment, or use the first-come watercraft campsite about halfway through for an overnight plan.',
      permits:
        'No route-specific paddling permit is known. Follow DNR water-trail rules and posted access or state-forest rules at both Highway 6 landings and any campsite.',
      camping:
        'DNR Map 1 names Easy Half watercraft campsite at river mile 81.7, about halfway through the trip, and describes it as a grassy tree-lined clearing with picnic tables. It is first-come, first-served, so bring a backup plan.',
      summary:
        'Launch at the southern Highway 6 carry-in near the Craigsville gauge and take out at the northern Highway 6 access. This is DNR\'s 15.7-mile recommended Big Fork day trip through remote Koochiching State Forest.',
      accessCaveats: [
        'Both endpoints are official public-water-access sites, but they are remote carry-in landings with limited services.',
        'The DNR access layer labels the upstream put-in as State Hwy 6 Bridge and the downstream take-out as State Hwy 6 (S), while the DNR route page uses Highway 6 (S) to Highway 6 (N). Use river miles and coordinates to avoid confusion.',
        'This route is long enough that daylight, weather, and a realistic bailout plan matter more than on short metro routes.',
      ],
      watchFor: [
        'Rocky or impassable rapids when Big Fork levels fall toward the scrapable/low band.',
        'A Class I rapid immediately below the put-in, plus additional Class I-II rapids, cold water, sweepers, beaver-dam potential, and remote shoreline with limited quick exits.',
        'Do not continue into Big Falls or Little American Falls sections without separate whitewater and portage planning.',
      ],
    },
  },
  'little-fork-river-veterans-park-highway-73': {
    putIn: {
      name: 'Veterans Park carry-in access, Cook',
      latitude: 47.854286,
      longitude: -92.688289,
    },
    takeOut: {
      name: 'Highway 73 bridge carry-in access',
      latitude: 47.858288,
      longitude: -92.870024,
    },
    logistics: {
      distanceLabel: '15.2 mi',
      estimatedPaddleTime: 'Long day, roughly 6 hr to 8 hr depending on level and scouting',
      shuttle:
        'Plan a rural two-car shuttle from Veterans Park in Cook to the Highway 73 bridge near Linden Grove. The take-out is next to the DNR gauge and bridge parking, but services are limited.',
      permits:
        'No route-specific paddling permit is known. Follow posted access, city park, and bridge-area parking rules.',
      camping:
        'Do not assume an on-route campsite for this day trip. Nearby state forests may have separate camping options, but this route should be planned as a committed day paddle unless camping is confirmed separately.',
      summary:
        'Launch at Veterans Park in Cook and take out at the Highway 73 bridge. MN DNR recommends this 15.2-mile Little Fork route for paddlers with experience running Class II rapids.',
      accessCaveats: [
        'Veterans Park is the practical town-side put-in, while the downstream Highway 73 bridge access is a bridge/gauge-area carry-in rather than a developed park.',
        'The route is remote enough that weather, daylight, and shuttle reliability should be checked before launch.',
        'Some Little Fork portages can be brushy; do not rely on an easy roadside exit between the endpoints.',
      ],
      watchFor: [
        'Multiple rock riffles and Class I-II rapids; scout larger rapids before committing.',
        'Scrapable or too-shallow rapids when the Highway 73/Linden Grove flow falls toward the low band.',
        'Downed trees, sweepers, cold water, and limited quick exits on a long northern route.',
      ],
    },
  },
  'red-lake-river-smiley-bridge-centennial-park': {
    putIn: {
      name: 'Smiley Bridge public water access',
      latitude: 48.077331,
      longitude: -96.034388,
    },
    takeOut: {
      name: 'Centennial Park / Highway 1 trailer access',
      latitude: 48.124,
      longitude: -96.168056,
    },
    logistics: {
      distanceLabel: '12.3 mi',
      estimatedPaddleTime: 'About 4 hr to 5.5 hr',
      shuttle:
        'Use a straightforward Thief River Falls-area shuttle from Smiley Bridge to Centennial Park. Stage the take-out at Centennial Park before launching from the quieter upstream bridge access.',
      permits:
        'No route-specific paddling permit is known. Follow posted public-water-access and city park rules at Smiley Bridge and Centennial Park.',
      camping:
        'Treat this as a day trip. Centennial Park has park amenities, but no on-route overnight plan is assumed.',
      summary:
        'Put in at Smiley Bridge and take out at Centennial Park for MN DNR\'s 12.3-mile beginner-friendly Red Lake River trip into Thief River Falls.',
      accessCaveats: [
        'Smiley Bridge is a public access at County Road 7, while Centennial Park is a trailer access at Highway 1 with city-park amenities.',
        'The route ends near Thief River Falls; know downstream dam and access locations before continuing past Centennial Park.',
        'Upstream Red Lake Reservation waters have separate restrictions; this route starts downstream at Smiley Bridge.',
      ],
      watchFor: [
        'Several dams exist elsewhere on the Red Lake River; stay with the planned Centennial Park take-out.',
        'Higher water can increase current and debris even on this generally gentle segment.',
        'Wind exposure on open farmland bends and low grassy banks.',
      ],
    },
  },
  'otter-tail-river-wannigan-riverside': {
    putIn: {
      name: 'Wannigan Road carry-in access',
      latitude: 46.7847573,
      longitude: -95.6962111,
    },
    takeOut: {
      name: 'Riverside Park carry-in access',
      latitude: 46.7256798,
      longitude: -95.696997,
    },
    logistics: {
      distanceLabel: '8.4 mi',
      estimatedPaddleTime: 'About 3 hr to 4.5 hr depending on level and channel-finding',
      shuttle:
        'Use a short two-car shuttle between Wannigan Road north of Frazee and Riverside Park in Frazee. Both endpoints are official public-water-access records, but parking is limited.',
      permits:
        'No route-specific paddling permit is known. Follow posted public-access and city park rules at Wannigan Road and Riverside Park.',
      camping:
        'No established watercraft campsite is documented for this short day trip. Plan it as a day paddle.',
      summary:
        'Launch at Wannigan Road and take out at Riverside Park in Frazee. MN DNR recommends this as an 8.4-mile scenic, slow-flowing trip with little development, best when late spring water keeps enough flow in the main channel.',
      accessCaveats: [
        'Wannigan Road is an official DNR-administered carry-in access, but the access record does not show a developed parking lot or restroom.',
        'Riverside Park is a City of Frazee access with a small parking lot and no restroom listed in the public-access record.',
        'The public-access record places Riverside Park at river mile 145.0, while the DNR route page lists the take-out at river mile 144.5; use the named access and coordinates for navigation.',
      ],
      watchFor: [
        'Shallow main-channel picking or walking when levels are low.',
        'Old bridge remnants, rock weirs, and faster moving water as you approach Riverside Park.',
        'A low utility pipe just past the take-out, plus the broader Otter Tail hazards of culverts, bridge obstructions, and possible dams under bridges.',
      ],
    },
  },
  'cannon-river-welch': {
    putIn: {
      name: 'Riverside Park canoe launch (Cannon Falls)',
      latitude: 44.5148835,
      longitude: -92.8990298,
    },
    takeOut: {
      name: 'Welch Mill Canoeing, Tubing & Kayaking (Welch)',
      latitude: 44.5679337,
      longitude: -92.7385579,
    },
    logistics: {
      distanceLabel: '11.75 mi',
      estimatedPaddleTime: 'About 4 hr to 5 hr 15 min',
      shuttle:
        "MilesPaddled describes a bike shuttle using the Cannon Valley Trail. Car shuttle is simplest.",
      permits:
        "No state water-trail permit required. Confirm local parking rules and any Welch Mill landing fee before you go.",
      camping: 'No established camping documented for this segment.',
      summary:
        'Put in at Riverside Park in Cannon Falls and take out at Welch Mill. Confirm access rules and any fees at both endpoints before staging a shuttle.',
      accessCaveats: [
        'Riverside Park has an official canoe launch, but local parking or day-use rules can still change.',
        'Welch Mill is a private take-out. Confirm landing rules and any take-out fee before leaving a vehicle there.',
      ],
      watchFor: [
        'Wood or debris after storms, especially on outside bends and blind corners.',
        'Heavy tuber traffic in summer can slow the day and complicate landing space.',
        'Cold-water risk outside summer.',
      ],
    },
  },
  'straight-river-faribault': {
    putIn: {
      name: "Krogh's Landing",
      latitude: 44.24285,
      longitude: -93.24006,
    },
    takeOut: {
      name: 'Two Rivers Landing/Park (Faribault)',
      latitude: 44.31065,
      longitude: -93.27092,
    },
    logistics: {
      distanceLabel: '10 mi',
      estimatedPaddleTime: 'About 3 hr 15 min to 4 hr 30 min',
      shuttle:
        'Car shuttle is straightforward. A bike shuttle may be possible using the Straight River Trail for part of the route.',
      permits:
        'No special paddling permit noted. Follow posted rules at each access.',
      camping:
        'Treat this as a day trip unless you have independently confirmed legal camping.',
      summary:
        "Put in at Krogh's Landing and take out at Two Rivers Landing/Park in Faribault. Use the Faribault gauge as a starting point, but verify access and parking locally.",
      accessCaveats: [
        "The DNR map does explicitly name Krogh's Landing as a carry-in access, but it still lacks a clean standalone parking page, so verify conditions locally.",
        'Two Rivers Park is city-managed and the official Faribault park amenities sheet marks it with public access and a canoe landing, but park rules and parking details should still be checked on arrival.',
      ],
      watchFor: [
        'Shallow riffles and scrape risk when the river is low.',
        'Downed trees and snags on blind corners.',
        'Cold-water risk outside midsummer.',
      ],
    },
  },
  'blue-earth-river-rapidan-county-road-90': {
    putIn: {
      name: 'Rapidan Dam Park carry-in access',
      latitude: 44.12135,
      longitude: -94.08935,
    },
    takeOut: {
      name: 'County Road 90 bridge access',
      latitude: 44.1938889,
      longitude: -94.1130556,
    },
    logistics: {
      distanceLabel: '9.1 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr 15 min',
      shuttle:
        'Car shuttle is simplest. The Red Jacket Trail also creates a bike-paddle option if you plan it carefully.',
      permits:
        'No special water-trail permit is known for a day paddle. Follow Blue Earth County park rules at Rapidan and verify roadside parking conditions at County Road 90 on arrival.',
      camping:
        'Rapidan Dam Park offers primitive camping, so this can work as an overnight staging base even though the route itself is a day trip.',
      summary:
        'Put in at Rapidan Dam Park and take out at County Road 90 for the DNR-recommended hard Blue Earth run. The Rapidan gauge gives this route a real level ladder, but the rapids and dam context still deserve experienced judgment.',
      accessCaveats: [
        'Rapidan Dam Park is the stronger endpoint because Blue Earth County directly manages the canoe launch and campground there.',
        'County Road 90 is clearly documented by MN DNR as the take-out, but it still lacks the cleaner standalone access page you get on the best county-park finishes, so confirm landing and parking conditions on site.',
      ],
      watchFor: [
        'Rapidan Dam hazard and any signed portage or exclusion zones near the put-in corridor.',
        'Class I rapids and a stronger current than the easy day-trip rivers in the app.',
        'Fast rises, waves, and fresh debris after rain.',
      ],
    },
  },
  'root-river-lanesboro-peterson': {
    putIn: {
      name: 'Highway 16 / Lanesboro access',
      latitude: 43.7368,
      longitude: -91.9468,
    },
    takeOut: {
      name: 'Highway 16 / Peterson access',
      latitude: 43.78648,
      longitude: -91.82735,
    },
    logistics: {
      distanceLabel: '13.5 mi',
      estimatedPaddleTime: 'About 4 hr 30 min to 6 hr 15 min',
      shuttle:
        'Bike shuttle on the Root River State Trail is a strong option. Two-car shuttle on local roads is straightforward if you want a simpler setup.',
      permits:
        'No special paddling permit is known for this state water-trail day trip. Confirm any local parking rules at both Hwy 16 accesses.',
      camping:
        'Official trail-town guidance says both Lanesboro and Peterson offer campground support, so this can work as either a straight day trip or a lower-friction overnight base.',
      summary:
        'Put in at the Hwy 16 access in Lanesboro and take out at the Hwy 16 access in Peterson. This is one of the cleaner Root River shuttle days, but low-water riffles and changing access details still deserve a same-day check.',
      accessCaveats: [
        'Both endpoints are supported by MN DNR public water access records, and trail-town guidance adds parking and restroom support in both Lanesboro and Peterson, but same-day signage still deserves a check.',
        'Do not assume every roadside pull-off near the bridge is valid long-term parking without checking signage.',
      ],
      watchFor: [
        'Shallow riffles and scrape risk when the gauge is near the low end.',
        'Fresh wood or strainers after rain, especially on blind bends.',
        'Cold-water exposure outside midsummer, even on an easy-current day.',
      ],
    },
  },
  'root-river-rushford-houston': {
    putIn: {
      name: 'Rushford carry-in access (Historic Depot area)',
      latitude: 43.78358,
      longitude: -91.83403,
    },
    takeOut: {
      name: 'Houston carry-in access (Houston Nature Center area)',
      latitude: 43.7645,
      longitude: -91.57037,
    },
    logistics: {
      distanceLabel: '15.1 mi',
      estimatedPaddleTime: 'About 5 hr to 6 hr 45 min',
      shuttle:
        'Two-car shuttle is simplest. A bike shuttle on the Root River State Trail is realistic if your group wants it, with parking guidance at the Rushford Historic Depot and Houston Nature Center lots.',
      permits:
        'No route-specific paddling permit is known. State-trail use is straightforward for walking or biking the shuttle, but still follow posted local parking and trail rules.',
      camping:
        'Houston Nature Center / Trailhead Park offers tent camping and hot showers, and official trail-town guidance also points to campground support in both Rushford and Houston. Otherwise treat this as a long day trip.',
      summary:
        'Launch at the Rushford carry-in and finish at the Houston carry-in near the Houston Nature Center. The route is friendly at workable flow, but it is long enough that low-water slowdowns and fresh wood can change the day substantially.',
      accessCaveats: [
        'The best-known parking is at the Rushford Historic Depot lot and the Houston Nature Center lot, so expect a short walk or carry rather than a pure drive-to-water launch at both ends.',
        'Houston Nature Center confirms ample parking at the trailhead, but still check local event activity before counting on the lot feeling empty.',
        'Look at the Houston exit before launching if you have not used it before, because town-side trail and parking landmarks are easier to recognize from shore than from mid-river.',
      ],
      watchFor: [
        'Low-water riffles and slower progress when the Houston gauge is near the floor.',
        'Fresh sweepers, strainers, or debris after rain.',
        'Long-mileage fatigue and cold-water exposure outside midsummer.',
      ],
    },
  },
  'root-river-parsley-moens': {
    putIn: {
      name: 'Parsley Bridge carry-in access',
      latitude: 43.81641,
      longitude: -92.13924,
    },
    takeOut: {
      name: "Moen's Bridge carry-in access",
      latitude: 43.78218,
      longitude: -92.03188,
    },
    logistics: {
      distanceLabel: '13.25 mi',
      estimatedPaddleTime: 'About 4 hr 30 min to 6 hr',
      shuttle:
        'Two-car shuttle is simplest. The road shuttle is around 10 miles on hillier Driftless roads, so it is less bike-friendly than the lower Root corridor.',
      permits:
        'No route-specific paddling permit is known. Follow posted bridge-access and parking rules at both carry-in points.',
      camping:
        'Pilot Mound campsites sit along this stretch if you are intentionally turning it into an overnight, but for most paddlers this is a full scenic day trip.',
      summary:
        'Launch at Parsley Bridge and finish at Moen\'s Bridge for an upper-North-Branch Root day with riffles, bluffs, and a more secluded feel than the bigger lower Root routes.',
      accessCaveats: [
        'Both endpoints are bridge carry-ins rather than polished ramp launches, so expect a short carry and verify where parking is actually acceptable before unloading boats.',
        'Moen\'s Bridge is the cleaner endpoint and the DNR map notes a toilet facility there, but it is still best to look at the take-out before launching.',
        'Do not assume shoulder parking at Parsley is generous or obvious without checking the site in person.',
      ],
      watchFor: [
        'Shallow riffles and scrape risk when Pilot Mound is near the floor.',
        'Fresh wood or sweepers on blind bends after rain.',
        'Longer shuttle friction and cold-water exposure outside midsummer.',
      ],
    },
  },
  'root-river-moens-whalan': {
    putIn: {
      name: "Moen's Bridge carry-in access",
      latitude: 43.782576,
      longitude: -92.0317899,
    },
    takeOut: {
      name: 'Whalan carry-in access',
      latitude: 43.7558,
      longitude: -91.9179,
    },
    logistics: {
      distanceLabel: '15.8 mi',
      estimatedPaddleTime: 'About 5 hr 15 min to 7 hr 15 min',
      shuttle:
        'Two-car shuttle is simplest. A bike shuttle is more realistic here than on the upper Chatfield reach because the Root River State Trail and local roads help, but it is still a real full-day setup.',
      permits:
        'No route-specific paddling permit is known. Follow posted parking and access rules at Moen\'s Bridge and in Whalan.',
      camping:
        'Treat this as a day trip unless you are intentionally using DNR campsites like Power Plant or other planned overnight stops on the Root corridor.',
      summary:
        'Put in at Moen\'s Bridge and take out at Whalan for one of the cleaner long Root River shuttles: scenic bluff country, approachable current, and enough mileage that low water or fresh debris can still change the day substantially.',
      accessCaveats: [
        'Moen\'s Bridge is a carry-in access, not a drive-to-water ramp, so expect a short carry and verify parking before unloading.',
        'The DNR Root map says Whalan parking is 500 feet from the carry-in access, and state-trail guidance says town parking is on city streets, so settle the vehicle plan before you launch.',
        'Look at the Whalan finish before launching if you have not used it before, because the take-out is easy to treat like a casual town stop when it is really a specific carry-in access.',
      ],
      watchFor: [
        'Shallow riffles and slower pace when Lanesboro is near the floor.',
        'Old bridge debris near Whalan and fresh wood after storms.',
        'Long-mileage fatigue on a route that stays easy but not short.',
      ],
    },
  },
  'wolf-river-lily-hollister': {
    putIn: {
      name: 'Hwy 52 access (Lily)',
      latitude: 45.30768,
      longitude: -88.85806,
    },
    takeOut: {
      name: 'West Hollister Road carry-in',
      latitude: 45.24736,
      longitude: -88.80559,
    },
    logistics: {
      distanceLabel: '6.5 mi',
      estimatedPaddleTime: 'About 2 hr 15 min to 3 hr',
      shuttle:
        'Vehicle shuttle is easiest. A bike shuttle on the Wolf River State Trail is possible if your group wants it.',
      permits:
        'No paddling permit is known. Wisconsin DNR notes the Wolf River State Trail does not require a trail pass if you use it for a bike shuttle.',
      camping:
        'Treat this as a day trip unless you independently confirm nearby legal camping.',
      summary:
        'Put in at Hwy 52 in Lily and take out at West Hollister just above Burnt Point Rapids. This is a compact bouldery run, not a lazy scenic float.',
      accessCaveats: [
        'Both landings are backed by Wisconsin DNR access records, but check parking conditions on the ground before you leave a vehicle.',
        'The take-out is near the next rapid zone, so do not drift past your exit while you are distracted or tired.',
      ],
      watchFor: [
        'Shallow boulder gardens at lower flows.',
        'Pushier hydraulics and faster swims when the flow climbs.',
        'Cold water and downed trees on blind corners.',
      ],
    },
  },
  'wolf-river-hollister-highway-64': {
    putIn: {
      name: 'West Hollister Road Landing',
      latitude: 45.248,
      longitude: -88.8062,
    },
    takeOut: {
      name: 'Highway 64 DNR Landing / Langlade bridge',
      latitude: 45.1901,
      longitude: -88.7333,
    },
    logistics: {
      distanceLabel: '8.3 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr for whitewater paddlers',
      shuttle:
        'Use a vehicle shuttle between the end of West Hollister Road and the Highway 64 DNR landing at Langlade. Wisconsin River Trips reports a longer but manageable paved bike shuttle, but a car shuttle is more practical with whitewater gear.',
      permits:
        'No route-specific paddling permit is known for this public-access reach. Follow posted Wisconsin DNR landing rules and confirm local parking conditions before leaving vehicles.',
      camping:
        'No on-route camping is documented for this Section II day run. Treat it as a day paddle unless you separately reserve legal nearby camping.',
      summary:
        'Launch at West Hollister Road above Burnt Point Rapids and take out at the DNR landing just past the Highway 64 bridge in Langlade. This is the classic Section II Wolf run: scenic, clear, and approachable for novice whitewater paddlers, but still a rapids route rather than a casual flatwater float.',
      accessCaveats: [
        'The West Hollister landing is public and route-standard, but it is a rocky carry-in with no outhouse and parking set back from the turnaround loop.',
        'The Highway 64 DNR landing has parking and toilets, but expect a carry from the water back to the lot.',
        'The take-out sits immediately after the Langlade bridge and near the USGS gauge corridor, so identify it before launching and do not drift downstream into the stronger lower Wolf sections by mistake.',
      ],
      watchFor: [
        'Class I-II boulder gardens and named rapids including Burnt Point, Oxbow, Cedar, Hemlock, Sherry, and Larzelere.',
        'Scrapey rock contact below the conservative target window and pushier swims as the Langlade gauge rises above about 500 cfs.',
        'Cold-water exposure, pinned feet in moving water, and limited casual bailout options in the forested corridor.',
      ],
    },
  },
  'wolf-river-langlade-markton': {
    putIn: {
      name: 'Highway 64 DNR Landing, Langlade',
      latitude: 45.18977,
      longitude: -88.73369,
    },
    takeOut: {
      name: 'Markton County M Landing',
      latitude: 45.12576,
      longitude: -88.66297,
    },
    logistics: {
      distanceLabel: '9.5 mi',
      estimatedPaddleTime: 'About 4 hr to 5 hr, longer with scouting or play stops',
      shuttle:
        'Use a two-car shuttle from the Highway 64 DNR landing at Langlade to the County M landing near Markton. Paddlers running the shorter Section III variant often start at Herb\'s Landing, but this route keeps the full Wisconsin Trail Guide Langlade-to-Markton segment.',
      permits:
        'No route-specific permit was found for the Langlade County segment above Markton. Check posted DNR/fishery-area access rules, and do not continue into downstream Menominee Reservation access without separate permission and local guidance.',
      camping:
        'No on-route campsite is assumed for this whitewater day run. Nearby forest and private lodging options exist in the broader Wolf River corridor, but they should be planned separately.',
      summary:
        'Launch from the public Highway 64 DNR landing at Langlade and paddle Section III of the upper Wolf to Markton County M Landing. The run starts with several miles of riffles and Class II rapids, then builds into the Boy Scout, Hanson, and Gilmore\'s Mistake sequence near the lower end.',
      accessCaveats: [
        'The Highway 64 landing is a public DNR access next to the live Langlade gauge and is also the take-out for the upstream Hollister-to-Langlade route.',
        'County M is the planned take-out before downstream Menominee Reservation access rules become a separate issue. Do not assume downstream landings are public without checking current tribal and outfitter guidance.',
        'Herb\'s Landing and Crab n Jack\'s/Wild Wolf-area landings are common whitewater alternates, but this route uses the published Markton County M endpoint and coordinates.',
      ],
      watchFor: [
        'Long boulder gardens and named rapids including Crowle, Horserace, Twenty Day, Boy Scout, Hanson, and Gilmore\'s Mistake.',
        'Bony lines below about 400 cfs and stronger holes, pushier waves, and more consequential swims above about 950 cfs on the Langlade gauge.',
        'Strainers, deadfall, cold water, and private/reservation access issues if you miss the planned take-out.',
      ],
    },
  },
  'wolf-river-markton-big-smokey-falls': {
    putIn: {
      name: 'Markton County M DNR Landing',
      latitude: 45.12518,
      longitude: -88.66322,
    },
    takeOut: {
      name: 'Big Smokey Falls Landing',
      latitude: 45.01644,
      longitude: -88.63758,
    },
    logistics: {
      distanceLabel: '12.7 mi',
      estimatedPaddleTime: 'About 5 hr to 6 hr for advanced whitewater paddlers',
      shuttle:
        'Arrange the shuttle and required Menominee access pass before launching. Local rafting/shuttle operators commonly manage this corridor; self-supported paddlers should call ahead and confirm where vehicles may be staged.',
      permits:
        'A Menominee Indian Tribe pass is required for paddling through this tribal-lands section. Wisconsin Trail Guide says passes are available through Big Smokey Falls Rafting or Shotgun Eddy Campground and Rafting; do not paddle downstream from Markton without current permission.',
      camping:
        'No on-route camping is assumed. Treat this as a permitted expert day run unless a local outfitter or the Tribe confirms separate overnight options.',
      summary:
        'Launch at the County M DNR Landing near Markton and run Wolf River Section IV to Big Smokey Falls Landing. This is the advanced lower-Wolf whitewater classic, with long boulder gardens, multiple Class III drops, the Dalles Gorge, and Class IV Big Smokey Falls.',
      accessCaveats: [
        'County M has a large DNR landing with hand-carry paths and trailer turnaround, but the downstream corridor enters Menominee Tribal lands and requires a pass.',
        'Big Smokey Falls has upper and lower landing options. Use the upper landing and left fork if portaging the falls; the left-fork slide below the footbridge is closed to running.',
        'Do not treat reservation roads, shorelines, or outfitter landings as general public access. Confirm current rules before the shuttle.',
      ],
      watchFor: [
        'Class III-IV features including Gilmore\'s Mistake, Pismire Falls, Sullivan Falls, Duck\'s Nest, Lunch Rock, Tea Kettle / Upper Dells, Lower Dells, and Big Smokey Falls.',
        'Powerful hydraulics, sticky holes, big waves, and fast rescue scenarios as the Langlade gauge rises above the broad 400-700 cfs target.',
        'Bony lines at Shotgun Eddy, Pismire, and Big Smokey below about 400 cfs.',
        'Deadfall, strainers, cold water, remote rescue logistics, and tribal access enforcement if you miss the planned take-out.',
      ],
    },
  },
  'white-river-maple-ridge-highway-112': {
    putIn: {
      name: 'Maple Ridge Road Access',
      latitude: 46.43755,
      longitude: -91.0261,
    },
    takeOut: {
      name: 'Highway 112 Dam Landing',
      latitude: 46.49834,
      longitude: -90.91032,
    },
    logistics: {
      distanceLabel: '15 mi',
      estimatedPaddleTime: 'About 5 hr to 6 hr 45 min',
      shuttle:
        'Expect a long-ish vehicle shuttle. MilesPaddled describes it as steep and better by car than bike.',
      permits:
        'No route-specific permit is known. Access rules at Maple Ridge Road and the Highway 112 dam area still deserve a same-day check before you leave a vehicle.',
      camping:
        'No dependable on-route camping is confirmed. Treat this as a long day trip unless you separately confirm legal overnight options.',
      summary:
        'Put in at Maple Ridge Road near Mason and take out above the Highway 112 dam / flowage. This is a full moving-water day with a dam-finish mindset, not a casual float.',
      accessCaveats: [
        'Wisconsin Trail Guide publishes WGS84 coordinates for Maple Ridge Road Access and Highway 112 Dam Landing, but official landing or parking authority is weaker than on the strongest DNR-led routes.',
        'Do not drift toward the dam or restricted area at the take-out. Treat the finish as a deliberate exit, not a soft glide into flatwater.',
      ],
      watchFor: [
        'Nearly continuous current and class I-II features with fewer easy bailout points than a typical family float.',
        'Boulder gardens, strainers, and pin risk that become more serious as levels rise.',
        'Hydropeaking or diurnal fluctuation, plus cold-water exposure outside midsummer.',
      ],
    },
  },
  'red-cedar-river-menomonie-dunnville': {
    putIn: {
      name: 'Riverside Park Canoe Launch (Menomonie)',
      latitude: 44.87257917,
      longitude: -91.94084048,
    },
    takeOut: {
      name: 'Dunnville Bottoms Boat Landing (County Road Y)',
      latitude: 44.71636558,
      longitude: -91.89691839,
    },
    logistics: {
      distanceLabel: '14.75 mi',
      estimatedPaddleTime: 'About 5 hr to 6 hr 45 min',
      shuttle:
        'Best shuttle option is the Red Cedar State Trail bike return if your group wants to avoid a second car. A driving shuttle is still straightforward and usually simpler on cold or rainy days.',
      permits:
        'No route-specific paddling permit is known. If you bike the state trail shuttle, check Wisconsin DNR for any current trail pass or closure rules.',
      camping:
        'Treat this as a day trip. Camping legality along the lower Red Cedar is too ownership-dependent to assume from the landings alone.',
      summary:
        'Use Riverside Park in Menomonie as the put-in and Dunnville Bottoms as the take-out. This is a long but friendly downstream Red Cedar day when the gauge keeps enough water in the riffles.',
      accessCaveats: [
        'Both ends are backed by Wisconsin DNR access records, which is stronger than most community-seeded routes.',
        'Do not let the easy character make you lazy about cold water, weather, or post-storm wood checks on a 15-mile day.',
      ],
      watchFor: [
        'Low water that turns the riffly upper miles into a slower scrape-and-drag day.',
        'Fresh strainers or wood after storms, even though the river is otherwise beginner-friendly.',
        'Fatigue, wind, and weather exposure over a nearly 15-mile outing if your pace slips.',
      ],
    },
  },
  'namekagon-river-big-bend-trego': {
    putIn: {
      name: 'Big Bend Landing',
      latitude: 45.9320719,
      longitude: -91.7516647,
    },
    takeOut: {
      name: 'Trego Town Park Landing',
      latitude: 45.9106187,
      longitude: -91.8238907,
    },
    logistics: {
      distanceLabel: '7.7 mi',
      estimatedPaddleTime: 'About 2 hr 30 min to 3 hr 30 min',
      shuttle:
        'Short paved-road shuttle in the Trego area. Several local outfitters run Big Bend, Earl, and Trego shuttles, but a simple two-car setup is easy if you are self-supporting.',
      permits:
        'No day-trip permit is noted. Follow St. Croix National Scenic Riverway rules at landings and any posted town-park or campground rules at the Trego finish.',
      camping:
        'NPS lists four campsites along this trip, including group-site support and potable water at Earl Park Landing. Trego Town Park Campground is also at the take-out corridor if you want to turn this into a low-friction overnight.',
      summary:
        'Put in at Big Bend Landing and take out at Trego Town Park Landing. Expect a mellow wooded first half, a prettier busier stretch past Earl Park, and a slower braided finish toward Trego that gets scratchier first when the river is low.',
      accessCaveats: [
        'Do not confuse the Trego Town Park finish with the permanently closed Lakeside Road picnic area and parking lot called out on the NPS maps page.',
        'Trego Town Park is part of an active campground corridor, so summer parking and launch space can feel busier than a quiet roadside landing.',
        'This route is beginner-friendly by Riverway standards, but the take-out still deserves a same-day look if your group has not used the Trego landing before.',
      ],
      watchFor: [
        'Occasional rock gardens and one quicker stretch near Highway 63.',
        'Scraping or channel-picking around the islands below Highway 63 in lower water.',
        'Tubing traffic and landing congestion around Earl Park and Trego on hot summer weekends.',
      ],
    },
  },
  'st-croix-river-fox-highway-70': {
    putIn: {
      name: 'Fox Landing',
      latitude: 45.89030603,
      longitude: -92.71283975,
    },
    takeOut: {
      name: 'Highway 70 boat launch',
      latitude: 45.77399682,
      longitude: -92.77959116,
    },
    logistics: {
      distanceLabel: '9.75 mi',
      estimatedPaddleTime: 'About 3 hr 15 min to 4 hr 30 min',
      shuttle:
        'Plan a longer shuttle and budget time for the steep approach near Fox Landing. Low-clearance vehicles should be cautious on the rougher road section.',
      permits:
        'No route-specific paddling permit is known. Follow Saint Croix National Scenic Riverway rules and any posted landing restrictions.',
      camping:
        'Camping rules vary across the Riverway, so do not assume the landings themselves allow overnight use.',
      summary:
        'Use Fox Landing as the put-in and Highway 70 as the take-out. The gauge tells you when the route stops being too scrapy, but wind and broad-channel effort still shape the day.',
      accessCaveats: [
        'Both landings are backed by Wisconsin DNR inventory records, but the inventory is not a full landing-rules page.',
        'The Fox Landing approach road is rougher and steeper than a typical flat park launch.',
      ],
      watchFor: [
        'Low-water scraping and channel-picking around islands and boulder gardens.',
        'Wind on the wide channel, especially if it turns into a long headwind day.',
        'Level-dependent rapids that become more serious than the score alone suggests.',
      ],
    },
  },
  'st-croix-river-interstate-osceola': {
    putIn: {
      name: 'Minnesota Interstate State Park landing',
      latitude: 45.401,
      longitude: -92.651,
    },
    takeOut: {
      name: 'Osceola Landing',
      latitude: 45.31996700000001,
      longitude: -92.71514719999999,
    },
    logistics: {
      distanceLabel: '6.6 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr',
      shuttle:
        'Straightforward two-car shuttle between Taylors Falls and Osceola. Stage the take-out first if you want the easiest finish, especially on summer weekends when Osceola can be busier.',
      permits:
        'No route-specific paddling permit is known, but a Minnesota state park vehicle permit is required for the Interstate landing and Riverway rules still govern camping and shoreline use.',
      camping:
        'Primitive shoreline camping is allowed only under Riverway rules, and a camping permit is required below Highway 8. Do not assume the landings themselves are overnight staging sites.',
      summary:
        'Launch from the Minnesota Interstate landing in Taylors Falls and finish at Osceola Landing for the cleanest lower St. Croix day-trip add. This is the classic easy gorge-to-bluff run, but lower water pushes you toward the main channel and away from side slough exploring.',
      accessCaveats: [
        'Minnesota Interstate State Park is open 8 a.m. to 10 p.m. daily and requires a vehicle permit; same-day ranger-station, kiosk, or traffic conditions still win over any saved note.',
        'Osceola is a high-use Riverway landing with separate motorized and nonmotorized launch flow, paved parking, restrooms, and drinking water, but it can still feel busy on hot weekends.',
      ],
      watchFor: [
        'Sandbars and side-slough dead ends when flow at St. Croix Falls falls below about 3,000 cfs.',
        'Strainers, wingdams, rocks, and submerged logs even though the route has no rapids.',
        'Motorboats, anglers, and wake exposure on the broader lower-river stretches.',
      ],
    },
  },
  'st-croix-river-osceola-william-obrien': {
    putIn: {
      name: 'Osceola Landing',
      latitude: 45.31996700000001,
      longitude: -92.71514719999999,
    },
    takeOut: {
      name: "William O'Brien State Park landing",
      latitude: 45.2181259,
      longitude: -92.7806336,
    },
    logistics: {
      distanceLabel: '8.8 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr 30 min',
      shuttle:
        "Standard lower-river car shuttle. Stage the take-out at William O'Brien before launching because the landing status can change with water and sediment conditions.",
      permits:
        "No special paddling permit is known for a day run, but Riverway rules still apply and a Minnesota state park vehicle permit can matter at William O'Brien.",
      camping:
        'Treat this as a day trip unless you separately verify a legal Riverway or park camping plan. The lower St. Croix has real overnight rules and they are not simple enough to infer from the landing names alone.',
      summary:
        "Put in at Osceola and finish at William O'Brien for a broad lower St. Croix float that feels simpler than the Dalles but still asks for wind and motorboat judgment. The big operational check is whether the William O'Brien take-out is usable that day.",
      accessCaveats: [
        "William O'Brien's river landing is a legitimate public take-out, but DNR has said it is open as water levels allow through 2026. Check same-day park updates before you commit.",
        "William O'Brien also rents canoes and kayaks and gives weekend shuttle information in season, which is useful backup logistics but also a sign that the landing area may be busier than a quiet roadside take-out.",
        'Osceola is better documented than many lower-river launches, but it is still a busy shared-use landing rather than a quiet paddle-only access.',
      ],
      watchFor: [
        'Wind and wake exposure on the wider lower-river stretches.',
        'Shallow bars and slower side-channel options if the upstream gauge slips toward the 2,500 cfs floor.',
        "Finding the William O'Brien side-channel take-out cleanly if you have not used it before.",
        "A changed or limited take-out setup at William O'Brien after low water, sediment movement, or maintenance.",
      ],
    },
  },
  'rum-river-martins-north-county-park': {
    putIn: {
      name: "Martin's Landing trailer access",
      latitude: 45.488325,
      longitude: -93.266746,
    },
    takeOut: {
      name: 'Rum River North County Park access',
      latitude: 45.394587,
      longitude: -93.353557,
    },
    logistics: {
      distanceLabel: '10.9 mi',
      estimatedPaddleTime: 'About 3 hr 45 min to 5 hr',
      shuttle:
        'Standard two-car shuttle. Confirm parking rules at Martin\'s Landing and at Rum River North County Park before leaving vehicles.',
      permits:
        'No route-specific paddling permit is known. Follow posted access, parking, and boating rules at both public landings.',
      camping:
        'Treat this as a day trip. Corridor camping rules vary by ownership and are not simple enough to assume from the landings alone.',
      summary:
        'Put in at Martin\'s Landing and take out at Rum River North County Park. This is a straightforward scenic shuttle day when the St. Francis gauge is comfortably above scrape level.',
      accessCaveats: [
        'The take-out is a county park, so local park hours or parking rules can matter more than on a roadside access.',
        'Do not assume flood-stage debris cleanup has already happened after recent storms just because the route is usually easy.',
      ],
      watchFor: [
        'Low-water scraping and slower pace when the gauge falls toward the 600 cfs floor.',
        'Fresh strainers and debris after heavy rain or spring runoff.',
        'Cold-water exposure outside midsummer, even on a mellow current day.',
      ],
    },
  },
  'rum-river-walbo-cambridge-west': {
    putIn: {
      name: 'Walbo carry-in access',
      latitude: 45.579123,
      longitude: -93.322856,
    },
    takeOut: {
      name: 'Cambridge West Park carry-in access',
      latitude: 45.572343,
      longitude: -93.235711,
    },
    logistics: {
      distanceLabel: '15.8 mi',
      estimatedPaddleTime: 'About 5 hr 15 min to 7 hr 15 min',
      shuttle:
        'Standard two-car shuttle is simplest. The route can also be shortened at Highway 14 if your group wants a shorter day.',
      permits:
        'No route-specific paddling permit is known. Follow posted access, park, and parking rules at Walbo and Cambridge West Park.',
      camping:
        'Watercraft campsites are listed along this reach, including Dayton, High Meadows, and Cambridge West Park. Treat overnight use as separate trip planning and confirm current rules before relying on it.',
      summary:
        'Put in at Walbo and take out at Cambridge West Park for a long but friendly middle-Rum day. This is one of the cleaner beginner/intermediate river shuttles in central Minnesota when the downstream proxy gauge is clearly above scrape territory.',
      accessCaveats: [
        'Cambridge West Park is a managed park endpoint, and the official Cambridge park map shows a 5 a.m. to 10 p.m. park-hours window, so plan vehicle timing accordingly.',
        'Becklin Homestead WMA / County Park can work as a mid-route stop or alternate logistics point, but seasonal managed-hunt restrictions still deserve a same-day check.',
        'Do not over-read the St. Francis gauge. It is a useful same-river proxy, but it is still downstream of this reach rather than on it.',
      ],
      watchFor: [
        'Downed trees, snags, and occasional log jams after storms.',
        'Low-water dragging or slower pace when the proxy gauge is near the floor.',
        'Long-day fatigue on a route that looks mellow on paper but still covers nearly 16 river miles.',
      ],
    },
  },
  'sauk-river-eagle-miller-landing': {
    putIn: {
      name: 'Eagle Park carry-in access',
      latitude: 45.4754595,
      longitude: -94.3502588,
    },
    takeOut: {
      name: 'Miller Landing carry-in access',
      latitude: 45.5517091,
      longitude: -94.2647146,
    },
    logistics: {
      distanceLabel: '8.6 mi',
      estimatedPaddleTime: 'About 2 hr 45 min to 4 hr',
      shuttle:
        'Standard self-shuttle works best. Miller Landing has posted county-park hours, so confirm you can leave and retrieve vehicles inside that window.',
      permits:
        'No special paddling permit is known for this Minnesota DNR day trip. Follow posted local rules at Eagle Park and Miller Landing.',
      camping:
        'Treat this as a day trip unless you separately confirm legal overnight options away from the landing parks.',
      summary:
        'Use Eagle Park in Rockville as the put-in and Miller Landing in Waite Park as the take-out. This is a clean lower-Sauk shuttle when the gauge is not stuck in the late-summer low band.',
      accessCaveats: [
        'Miller Landing is a managed county park with posted hours and local rules that still deserve a same-day check.',
        'Low water and summer vegetation can make an easy route feel much longer and less fun than the score alone suggests.',
      ],
      watchFor: [
        'Shallow stretches and thick vegetation when the gauge slides toward 14 ft.',
        'Storm debris and strainers after recent rain.',
        'Cold-water risk outside midsummer, even on an otherwise easy route.',
      ],
    },
  },
  'sauk-river-spring-hill-st-martin': {
    putIn: {
      name: 'Spring Hill County Park carry-in access',
      latitude: 45.529026,
      longitude: -94.776531,
    },
    takeOut: {
      name: 'St. Martin Public Water Access / County Road 12',
      latitude: 45.520241,
      longitude: -94.67885,
    },
    logistics: {
      distanceLabel: 'About 9.1 river mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr 30 min',
      shuttle:
        'Short Stearns County self-shuttle between Spring Hill County Park and the St. Martin carry-in near County Road 12. Check county park rules before leaving a vehicle.',
      permits:
        'No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted county-park and access rules.',
      camping:
        'Spring Hill County Park has DNR-noted watercraft campsite context. Treat this as a day route unless you separately confirm current Stearns County camping rules and fees.',
      summary:
        'Use Spring Hill County Park as the put-in and the St. Martin carry-in as the take-out. This creates a cleaner gauge-backed Sauk day than the older Spring Hill-to-Rockville multi-day draft.',
      accessCaveats: [
        'Stearns County confirms St. Martin Canoe Access as a one-acre county site retained as access to the Sauk River, but it is still a simple carry-in rather than a full-service park landing.',
        'Low water and summer vegetation can make this short route slower and less pleasant than the mileage suggests.',
      ],
      watchFor: [
        'Shallow riffles and vegetation as the St. Martin gauge falls toward 14 ft.',
        'Fresh wood and strainers after storms.',
        'Cold-water exposure in spring and fall.',
      ],
    },
  },
  'snake-river-canary-cross-lake': {
    putIn: {
      name: 'Snake River #1 / Canary Road public water access',
      latitude: 45.7959352,
      longitude: -93.0796766,
    },
    takeOut: {
      name: 'Snake River / Cross Lake public water access (Pine City)',
      latitude: 45.8405577,
      longitude: -92.9418935,
    },
    logistics: {
      distanceLabel: '10.2 mi',
      estimatedPaddleTime: 'About 3 hr 30 min to 4 hr 45 min',
      shuttle:
        'Short Pine City-area car shuttle. A bike shuttle is possible, but only if you are comfortable with the roads and have already checked parking at both ends.',
      permits:
        'No special permit is known for this Minnesota DNR water-trail segment. Follow posted public-water-access and local parking rules at both landings.',
      camping:
        'Treat this as a day trip, but the Snake River Campground in Chengwatana State Forest is a useful nearby overnight option if you want to stage the trip.',
      summary:
        'Put in at the Canary Road carry-in and take out at the Cross Lake / Pine City landing. This is the DNR-recommended lower Snake day, and the Pine City gauge gives it one of the cleaner official go-no-go stories in the app.',
      accessCaveats: [
        'Both endpoints are now backed by Minnesota public-water-access records, which is a much better trust story than the earlier approximate-coordinate version.',
        'Pine City recreation materials are useful for parking context at the take-out, but same-day signage still wins if anything looks different on arrival.',
      ],
      watchFor: [
        'Fast fluctuations after rain or snowmelt.',
        'Low-water trouble below Cross Lake when the Pine City gauge sinks toward 2.3 ft.',
        'Fresh wood or strainers after storms, especially on bends and in faster current.',
      ],
    },
  },
  'snake-river-county-road-9-snake-bit': {
    putIn: {
      name: 'County Road 9 bridge carry-in access',
      latitude: 45.8395826,
      longitude: -92.9363969,
    },
    takeOut: {
      name: 'Snake Bit Access (near St. Croix/Snake River public water access)',
      latitude: 45.8230834,
      longitude: -92.7645675,
    },
    logistics: {
      distanceLabel: '11.7 mi',
      estimatedPaddleTime: 'About 4 hr to 5 hr 30 min',
      shuttle:
        'Longer Pine City-to-Chengwatana shuttle. A two-car shuttle is the practical choice because the finish sits near the St. Croix confluence rather than back in town.',
      permits:
        'No special permit is known for this Minnesota DNR water-trail segment. Follow posted public-access, state-forest, and parking rules at both ends.',
      camping:
        'Treat this as a day trip, but Snake River Campground and River\'s End Campground are useful nearby overnight anchors if you want to stage the shuttle.',
      summary:
        'Put in at County Road 9 and finish near Snake Bit at the Snake/St. Croix confluence. This lower Snake route has a strong official low-water warning, so use the Pine City gauge first and do not expect a worthwhile run when it is hugging the floor.',
      accessCaveats: [
        'County Road 9 is clearly named by MN DNR as a carry-in access with the gauge on the bridge, but it is still a bridge access rather than a polished park launch.',
        'Snake Bit is clearly named on the MN DNR route map, but the saved finish coordinate is anchored by the nearby official Snake/St. Croix public-water-access record rather than a standalone Snake Bit facility page.',
      ],
      watchFor: [
        'Class I rapids and scrape-heavy shallow water immediately below County Road 9.',
        'Fresh wood, strainers, and debris after storms or rapid snowmelt.',
        'Wind and wave exposure as you approach the St. Croix confluence.',
      ],
    },
  },
  'crow-wing-river-stigmans-little-white-dog': {
    putIn: {
      name: "Stigman's Mound public water access",
      latitude: 46.6404505,
      longitude: -94.8796954,
    },
    takeOut: {
      name: 'Little White Dog public water access',
      latitude: 46.586977,
      longitude: -94.822607,
    },
    logistics: {
      distanceLabel: '6.2 mi',
      estimatedPaddleTime: 'About 2 hr to 3 hr',
      shuttle:
        'Short Wadena County car shuttle. This is an easier logistics day than the downstream Crow Wing routes, so it works well when you want a cleaner half-day decision.',
      permits:
        'No route-specific paddling permit is known. Follow posted county-park and public-water-access parking rules at both ends.',
      camping:
        'Little White Dog is a county-park camping anchor at the take-out. Treat Stigman\'s Mound itself as a launch access unless you have separately confirmed overnight rules there.',
      summary:
        'Launch at Stigman\'s Mound and finish at Little White Dog for the shortest cleanly supported Crow Wing add in this corridor. The Nimrod gauge is right at the put-in, so the route is easy to screen for obvious low-water days before you drive.',
      accessCaveats: [
        'Both endpoints are now backed by Minnesota public-water-access GIS records, which is what finally clears this route for the product.',
        'Stigman\'s Mound is an official public access, but it is still worth checking the exact parking setup on arrival because this is not a polished city-park launch.',
      ],
      watchFor: [
        'Scraping and a slower sandy-river pace when the Nimrod gauge is hovering near 300 cfs.',
        'Fresh wood, sweepers, or stronger current after storms.',
        'A few occasional rapids and blind bends even though this is still an easy route overall.',
      ],
    },
  },
  'cottonwood-river-juenemann-springfield': {
    putIn: {
      name: 'Juenemann Landing / County Road 2 public water access',
      latitude: 44.2034723,
      longitude: -95.0485134,
    },
    takeOut: {
      name: 'Springfield Public Water Access / Riverside Park canoe landing',
      latitude: 44.2377827,
      longitude: -94.9740406,
    },
    logistics: {
      distanceLabel: '6.4 mi',
      estimatedPaddleTime: 'About 2 hr 15 min to 3 hr 15 min',
      shuttle:
        'Plan a short two-car shuttle from County Road 2 / Juenemann Landing to Springfield Riverside Park. This is a compact route, but rural landing conditions can still slow loading and unloading.',
      permits:
        'No route-specific paddling permit is known. Brown County lists its Cottonwood canoe landings as day-use April 15 through October 15; follow posted county and city access rules.',
      camping:
        'No on-route camping is assumed for this short segment. Treat it as a day trip unless you separately confirm a legal overnight option.',
      summary:
        'Launch at Juenemann Landing on County Road 2 and take out at Springfield Riverside Park. This short Cottonwood reach has the gauge at the put-in, so the level call is unusually direct.',
      accessCaveats: [
        'Juenemann is a Brown County canoe landing on County Road 2 with vehicle parking; the DNR access record does not list a restroom.',
        'Springfield is a carry-in access in Riverside Park with restroom support in the public-access record.',
        'DNR supports the access points and river-level ladder, but this exact short segment is not presented as a highlighted recommended day trip.',
      ],
      watchFor: [
        'Scraping and slow travel when the County Road 2 gauge drops toward the scrapable band.',
        'Deadfall, overhanging trees, and muddy banks after higher water.',
        'Private shoreland; stop only at public accesses or clearly legal sites.',
      ],
    },
  },
  'pine-river-rock-dam-harvey-drake': {
    putIn: {
      name: 'Pine River Rock Dam public water access',
      latitude: 46.635762,
      longitude: -94.092075,
    },
    takeOut: {
      name: 'Harvey Drake Public Water Access',
      latitude: 46.57168,
      longitude: -94.02806,
    },
    logistics: {
      distanceLabel: '14.4 mi',
      estimatedPaddleTime: 'About 5 hr to 6 hr 45 min',
      shuttle:
        'Plan a full-day two-car shuttle from Rock Dam near Crosslake to Harvey Drake Public Water Access near County Road 11. Confirm rural landing and parking conditions before staging vehicles.',
      permits:
        'No route-specific paddling permit is known. Follow posted public-water-access rules at Rock Dam and Harvey Drake.',
      camping:
        'Treat this as a day trip unless you separately confirm a legal overnight option. The DNR route is long enough that daylight planning matters.',
      summary:
        'Launch at Pine River Rock Dam and take out at Harvey Drake Public Water Access for the DNR lower Pine day trip. The Jenkins DNR gauge gives this wooded route an official level ladder.',
      accessCaveats: [
        'Rock Dam and Harvey Drake are official Minnesota public-water-access sites, but both are rural landings where parking, mud, and loading space should be checked on arrival.',
        'The route begins at the Rock Dam area; review the DNR map and avoid improvising around dam or rock-riffle infrastructure.',
        'Harvey Drake sits near a bridge crossing and is easier to identify on the map than from the road at speed.',
      ],
      watchFor: [
        'Low-water scraping when the Jenkins gauge falls toward the 35 cfs scrapable floor.',
        'Wood, sweepers, and narrow-channel debris on wooded bends after storms.',
        'Long-route fatigue and cold-water exposure outside midsummer.',
      ],
    },
  },
  'minnesota-river-judson-land-of-memories': {
    putIn: {
      name: 'Judson public water access',
      latitude: 44.2010236,
      longitude: -94.1947673,
    },
    takeOut: {
      name: 'Land of Memories Park public water access',
      latitude: 44.1624934,
      longitude: -94.0414558,
    },
    logistics: {
      distanceLabel: '11.1 mi',
      estimatedPaddleTime: 'About 3 hr 45 min to 5 hr',
      shuttle:
        'Car shuttle is the practical choice. Stage the take-out vehicle at Land of Memories Park before launching so you are not finishing a long windy day with extra logistics.',
      permits:
        'No special paddling permit is known. Follow posted access and parking rules at the Judson landing and at Land of Memories Park.',
      camping:
        'Land of Memories Park campground makes this an easy overnight staging option even though the route itself is a day trip.',
      summary:
        'Launch at Judson and finish at Land of Memories Park for the DNR-recommended Mankato-area Minnesota River day. The gauge gives a real official flow ladder, but wind and sandbars still matter a lot on this bigger river.',
      accessCaveats: [
        'Both endpoints now have state-backed public-water-access records, which is the main thing this route was missing before.',
        'Land of Memories is a city park with a real boat landing, but same-day parking and ramp conditions should still be checked before you commit to the shuttle.',
      ],
      watchFor: [
        'Wind and waves on the wider open reaches.',
        'Sandbars and shallower braided sections when flow falls toward the low band.',
        'Floating debris, muddy banks, and busier landing activity near the Mankato finish.',
      ],
    },
  },
  'minnesota-river-franklin-mack-lake': {
    putIn: {
      name: 'Franklin trailer access / city boat landing',
      latitude: 44.5177553,
      longitude: -94.8845377,
    },
    takeOut: {
      name: 'Mack Lake Park boat landing',
      latitude: 44.4585896,
      longitude: -94.7930696,
    },
    logistics: {
      distanceLabel: '10.1 mi',
      estimatedPaddleTime: 'About 3 hr 30 min to 5 hr',
      shuttle:
        'Plan a two-car shuttle between Franklin and Mack Lake Park. This is short for the Minnesota River, but still a rural big-river shuttle with limited intermediate public exits.',
      permits:
        'No route-specific paddling permit is known. Follow City of Franklin rules at the put-in and Renville County park rules at Mack Lake.',
      camping:
        'Franklin has free primitive camping by the river access, and Mack Lake Park has rustic county campsites by reservation. Treat either as a separate camping decision, not an assumed part of the day trip.',
      summary:
        'Launch at the Franklin city boat landing and take out at Mack Lake Park. DNR recommends this as an easy, winding 10.1-mile Minnesota River day with camping available at both ends.',
      accessCaveats: [
        'Franklin and Mack Lake are real named public access points, but both are rural landings where same-day parking, mud, and flood debris should be checked before unloading.',
        'The Morton gauge is upstream of Franklin, so use it as a conservative corridor read rather than a perfect at-the-ramp measurement.',
        'Do not casually extend downstream past Mack Lake toward the more difficult Fort Ridgely/Minnesota Falls corridor without separate planning.',
      ],
      watchFor: [
        'Wind and heat exposure on open bends even when the river is technically easy.',
        'Flood debris, muddy landings, and changing sand or bank conditions after high water.',
        'Private shoreland; stop only at public accesses or clearly legal sites.',
      ],
    },
  },
  'minnesota-river-henderson-belle-plaine': {
    putIn: {
      name: 'Henderson Station public water access',
      latitude: 44.5244176,
      longitude: -93.8862799,
    },
    takeOut: {
      name: 'Belle Plaine public water access',
      latitude: 44.6340972,
      longitude: -93.7653127,
    },
    logistics: {
      distanceLabel: '17.4 mi',
      estimatedPaddleTime: 'About 5 hr 45 min to 8 hr',
      shuttle:
        'Long two-car shuttle. Stage the take-out vehicle at Belle Plaine before launching because this is already a full lower-river day without adding end-of-day driving stress.',
      permits:
        'No route-specific paddling permit is known. Follow posted public-water-access and parking rules at Henderson Station and Belle Plaine.',
      camping:
        'Treat this as a day trip unless you separately confirm a legal overnight plan. Much of the shoreland is private, and the DNR map explicitly tells paddlers to stop only at designated sites.',
      summary:
        'Launch at Henderson Station and finish at Belle Plaine for the DNR lower Minnesota day trip. The Jordan gauge gives this route a real official ladder, but wind, pace, and big-river judgment still matter.',
      accessCaveats: [
        'Henderson Station is a carry-in with a walk from the gate to the river, not a drive-to-ramp launch.',
        'Belle Plaine is a proper trailer access at County Road 25, but same-day ramp and parking conditions should still be checked before you commit to a long shuttle.',
      ],
      watchFor: [
        'Wind and wave exposure on open lower-river reaches.',
        'A slower-than-expected pace on a 17.4-mile day if the Jordan gauge slips toward the low band.',
        'Floating debris, overhanging trees, and muddy or sandy banks at landings and breaks.',
      ],
    },
  },
  'minnesota-river-thompson-ferry-carver': {
    putIn: {
      name: 'Thompson Ferry trailer access',
      latitude: 44.692386,
      longitude: -93.641157,
    },
    takeOut: {
      name: 'Carver Riverfront Park / Minnesota River public water access',
      latitude: 44.766777,
      longitude: -93.616717,
    },
    logistics: {
      distanceLabel: '8.1 mi',
      estimatedPaddleTime: 'About 2 hr 45 min to 4 hr',
      shuttle:
        'Short lower Minnesota River car shuttle from Thompson Ferry north of Jordan to Carver. Stage the take-out in town before launching so wind or a slow current does not complicate pickup.',
      permits:
        'No route-specific paddling permit is known. Follow posted public-water-access, city park, and parking rules at Thompson Ferry and Carver.',
      camping:
        'No on-route camping is assumed for this short lower-river segment. Treat it as a day trip.',
      summary:
        'Put in at Thompson Ferry and take out at Carver Riverfront Park for the DNR Map 6 recommended lower Minnesota day trip. It is shorter than the Henderson-to-Belle Plaine route while using the same official Jordan gauge ladder.',
      accessCaveats: [
        'Thompson Ferry is an official public-water-access site near the Jordan gauge, but same-day riverbank mud and parking conditions can still vary after high water.',
        'Carver is an official Minnesota River public-water-access site on the riverfront; use the named access and posted parking rules rather than assuming every nearby riverfront space is a landing.',
        'The lower Minnesota River is broad and exposed enough that wind can matter even on an 8-mile route.',
      ],
      watchFor: [
        'Wind and wave exposure on open bends.',
        'Flood debris, muddy landings, and changing sandbars after high water.',
        'Private shoreland; stop only at public landings or clearly legal sites.',
      ],
    },
  },
  'mississippi-river-east-river-flats-hidden-falls': {
    putIn: {
      name: 'East River Flats Park',
      latitude: 44.9703514,
      longitude: -93.2350599,
    },
    takeOut: {
      name: 'Hidden Falls Regional Park boat launch',
      latitude: 44.9040285,
      longitude: -93.1907475,
    },
    logistics: {
      distanceLabel: '5 mi',
      estimatedPaddleTime: 'About 1 hr 45 min to 2 hr 15 min',
      shuttle:
        'Short Twin Cities car shuttle. Stage the take-out vehicle at Hidden Falls first so the day does not end with lock logistics, city traffic, and a second vehicle problem all at once.',
      permits:
        'No route-specific paddling permit is known, but you need to follow posted park rules and current lock or portage guidance. Check same-day closures before committing.',
      camping:
        'Not an overnight route. Treat this as a skill-forward urban day trip, not a camp float.',
      summary:
        'Launch at East River Flats and finish at Hidden Falls for the official DNR Twin Cities Mississippi trip. The route is short on paper, but the real decisions are current, wakes, wind, and Lock and Dam 1 handling.',
      accessCaveats: [
        'DNR explicitly names East River Flats Park as the launch, but the launch logistics there are still less clearly documented than the Hidden Falls take-out. Check the access on arrival instead of assuming a trailer-style ramp.',
        'Hidden Falls has posted park hours and can close roads or amenities during flooding, restoration, or other conditions.',
        'Lock and Dam 1 is not a full-time recreational lock. USACE lists recreation lockage for Saturdays, Sundays, major holidays, and Monday/Friday afternoons, says weekday hours can change, and tells boaters to contact lock staff on VHF channel 14, by the pull cord, or at 651-290-5919.',
      ],
      watchFor: [
        'Swift current and large wakes from larger river traffic.',
        'Lock and Dam 1 procedure when the lock is operating; be at the lock at least 30 minutes before posted closure.',
        'A 1.40-mile unsigned Lock and Dam 1 portage if the lock is unavailable. NPS places the take-out on river right about one-third mile upstream of the Ford Bridge and the put-in at the Minnehaha Creek mouth.',
        'Do not use Minnehaha Creek itself as a shortcut around the dam; NPS warns of down trees, rapids, and hazards in the creek.',
        'Wind, floating debris, and muddy landings after recent weather.',
      ],
    },
  },
  'mississippi-river-hidden-falls-harriet-island': {
    putIn: {
      name: 'Hidden Falls Regional Park Mississippi River boat ramp',
      latitude: 44.904029,
      longitude: -93.190748,
    },
    takeOut: {
      name: "Kelley's Landing / Harriet Island",
      latitude: 44.935466,
      longitude: -93.100314,
    },
    logistics: {
      distanceLabel: '6.5 mi',
      estimatedPaddleTime: 'About 2.5 hr to 3.5 hr depending on wind and current',
      shuttle:
        'Short Saint Paul shuttle from Hidden Falls to Harriet Island. Confirm the take-out at Kelley\'s Landing rather than Lambert\'s Landing, which is farther north on the downtown side.',
      permits:
        'No route-specific paddling permit is known. Follow Saint Paul park, dock, and posted landing rules at Hidden Falls and Harriet Island.',
      camping:
        'No camping is assumed. This is an urban day trip through Saint Paul.',
      summary:
        'Launch at Hidden Falls and take out at Kelley\'s Landing on Harriet Island for MN DNR\'s 6.5-mile downstream Twin Cities Mississippi trip.',
      accessCaveats: [
        'Hidden Falls is the confirmed public boat-ramp put-in; use current park access and flood-closure information before launch.',
        'Kelley\'s Landing is the Harriet Island-side take-out. Lambert\'s Landing is not the endpoint for this route.',
        'Saint Paul public dock and park rules may limit docking, tie-up duration, and event-area use.',
      ],
      watchFor: [
        'Swift current, commercial traffic, and large boat wakes through the metro Mississippi corridor.',
        'Changing water color and converging current near the Minnesota River confluence.',
        'Urban debris, bridge piers, wind exposure, and limited casual landing options between official access points.',
      ],
    },
  },
  'snake-river-county-road-3-mora': {
    putIn: {
      name: 'County Road 3 Public Water Access',
      latitude: 46.0238677,
      longitude: -93.2319185,
    },
    takeOut: {
      name: 'Canoe Park / Mora Public Water Access',
      latitude: 45.8820387,
      longitude: -93.3097238,
    },
    logistics: {
      distanceLabel: '15 mi',
      estimatedPaddleTime: 'About 5 hr to 6 hr 45 min',
      shuttle:
        'Simple two-car shuttle between County Road 3 and Canoe Park in Mora. This is a longer rural Snake day, so leave extra time for shuttle setup and wood scouting.',
      permits:
        'No route-specific permit is known. Follow posted local parking and access rules at both public water accesses.',
      camping:
        'No simple on-route camping assumption is safe here. Treat this as a day trip unless you separately confirm legal overnight options.',
      summary:
        'Launch at County Road 3 and take out at Canoe Park in Mora. This is a full Mora-area Snake day, so both level and weather matter more than on a short park-to-park float.',
      accessCaveats: [
        'This segment is more local-knowledge driven than the lower state-water-trail park-to-park Snake routes, so access and wood conditions should be confirmed before you commit.',
        'Do not assume storm cleanup has happened after recent high water. This river can pick up new wood quickly.',
      ],
      watchFor: [
        'Low-water dragging when the Pine City gauge falls toward 2.3 ft.',
        'Fresh strainers and obstructions after storms.',
        'Fatigue and weather exposure over a 15-mile day if the pace slows.',
      ],
    },
  },
  'north-fork-crow-river-betty-mason-wildlife': {
    putIn: {
      name: 'Betty T. Mason County Park carry-in access',
      latitude: 45.189062,
      longitude: -94.1900403,
    },
    takeOut: {
      name: 'Wildlife County Park carry-in access',
      latitude: 45.1402417,
      longitude: -94.1752588,
    },
    logistics: {
      distanceLabel: '10.2 mi',
      estimatedPaddleTime: 'About 3 hr 30 min to 5 hr',
      shuttle:
        'Plan a simple two-car shuttle between the Wright County parks. Wildlife County Park also has a reservable canoe campsite if you are turning this into a longer North Fork plan.',
      permits:
        'No route-specific paddling permit is known. Wildlife County Park backcountry canoe camping requires a reservation and fee if used.',
      camping:
        'Wildlife County Park offers a backcountry canoe campsite by reservation. Treat this route as a day trip unless that campsite is booked separately.',
      summary:
        'Launch at Betty T. Mason County Park and take out at Wildlife County Park. This is a narrow upper North Fork Crow day where the gauge matters, but wood and tight bends still drive the practical decision.',
      accessCaveats: [
        'Betty T. Mason is an improved but steep carry-in access, so scout the carry before unloading.',
        'Both endpoints are Wright County public river accesses, but park hours and camping rules still apply.',
        'This upper reach is more obstruction-prone than the lower North Fork Crow route already in the app.',
      ],
      watchFor: [
        'Underwater snags, overhanging trees, and strainers on sharp bends.',
        'Possible unlawful fences across the river; DNR asks paddlers to report them.',
        'Low-water scraping below the Cokato medium band and faster current above it.',
      ],
    },
  },
  'north-fork-crow-river-rockford-riverside': {
    putIn: {
      name: 'Rockford Boat Launch / Rockford public water access',
      latitude: 45.0927624,
      longitude: -93.7294189,
    },
    takeOut: {
      name: 'Riverside County Park / Riverside Park public water access',
      latitude: 45.1650523,
      longitude: -93.6400414,
    },
    logistics: {
      distanceLabel: '8.5 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr 30 min',
      shuttle:
        'Plan a straightforward two-car shuttle from Rockford to Riverside County Park. This is the shorter, cleaner setup upstream of the longer Riverside-to-Dayton route.',
      permits:
        'No route-specific paddling permit is known. Follow posted Rockford access rules and Wright County park rules at Riverside County Park.',
      camping:
        'Riverside County Park has a primitive canoe campsite by reservation. Treat camping as a separate booking, not an assumed part of this day trip.',
      summary:
        'Launch at the Rockford public water access and take out at Riverside County Park near Hanover. DNR describes this as an 8.5-mile possible day trip on a straight, shallow lower North Fork Crow reach.',
      accessCaveats: [
        'The Rockford access is a small-watercraft launch with moderate bank height and a fishing pier nearby.',
        'Riverside County Park is a real Wright County river-access park. The DNR Riverside guide describes the access as somewhat steep but usable for small boats and canoes.',
        'This route overlaps the same lower-river gauge family as Riverside-to-Dayton; choose this if you want a shorter day.',
      ],
      watchFor: [
        'Shallow gravel, cobble, and boulder sections when the Rockford gauge falls toward the low band.',
        'Fresh wood or debris after high water, even though the DNR guide notes few downed trees during its survey.',
        'Changing landing mud and bank conditions at both accesses after rain.',
      ],
    },
  },
  'north-fork-crow-river-riverside-dayton': {
    putIn: {
      name: 'Riverside County Park carry-in access',
      latitude: 45.1644165,
      longitude: -93.6413049,
    },
    takeOut: {
      name: 'Mississippi/Crow rivers trailer access',
      latitude: 45.2453021,
      longitude: -93.5212957,
    },
    logistics: {
      distanceLabel: '15.3 mi',
      estimatedPaddleTime: 'About 5 hr to 7 hr',
      shuttle:
        'Standard two-car shuttle. Confirm any county-park or landing parking rules before leaving vehicles for a full day or overnight.',
      permits:
        'No route-specific paddling permit is known. Follow posted park, landing, and boating rules at both ends.',
      camping:
        'Riverside County Park has a reservable backcountry canoe campsite, but do not assume the trip needs or includes camping unless you book it separately.',
      summary:
        'Launch at Riverside County Park near Hanover and take out at the Dayton-area Crow/Mississippi access. This is a long lower-river shuttle day where level still matters because low water drags the pace down quickly.',
      accessCaveats: [
        'This route is long enough that shuttle timing, parking rules, and daylight matter more than on a quick half-day paddle.',
        'Use posted rules at both landings rather than assuming old forum or trip-report parking details are still current.',
      ],
      watchFor: [
        'Low-water dragging and a slower-than-expected pace when the river falls toward 345 cfs.',
        'Fresh wood, strainers, and debris after storms or rising water.',
        'Fatigue, cold-water exposure, and wind on a 15-mile day even if the gauge looks okay.',
      ],
    },
  },
  'south-fork-crow-river-rick-johnson-lake-rebecca': {
    putIn: {
      name: 'South Fork Crow River boat landing / Rick Johnson Park trailer access',
      latitude: 44.965047,
      longitude: -93.845448,
    },
    takeOut: {
      name: 'Lake Rebecca Park Reserve Crow River carry-in access',
      latitude: 45.079117,
      longitude: -93.754431,
    },
    logistics: {
      distanceLabel: '14.3 mi',
      estimatedPaddleTime: 'About 5 hr to 7 hr',
      shuttle:
        'Plan a full-day two-car shuttle from Watertown to Lake Rebecca Park Reserve. The take-out is on the North Fork side near the confluence, so review the DNR map before launching.',
      permits:
        'No route-specific paddling permit is known. Follow posted Watertown park rules and Three Rivers Park District rules at Lake Rebecca.',
      camping:
        'Lake Rebecca has group camping elsewhere in the park reserve, but no route-specific river camping is assumed. Treat this as a day trip unless you book camping separately.',
      summary:
        'Start below the Watertown dam at Rick Johnson Park and finish at the Lake Rebecca Crow River carry-in. This is the DNR-recommended full-day South Fork Crow trip through Delano.',
      accessCaveats: [
        'The put-in is below the Watertown dam; do not launch upstream of the dam or improvise around dam infrastructure.',
        'Lake Rebecca is a large park reserve, so identify the Crow River carry-in and parking area before committing to the shuttle.',
        'The route starts on the South Fork and finishes on the North Fork near the confluence, which can be confusing if you only skim the map.',
      ],
      watchFor: [
        'Fallen trees, submerged snags, and overhanging branches on wooded bends.',
        'Faster current after significant rainfall even when the river is usually gentle.',
        'Private shoreland; stop only at public landings or clearly legal sites.',
      ],
    },
  },
  'minnehaha-creek-grays-bay-longfellow-lagoon': {
    putIn: {
      id: 'headwaters',
      name: "Gray's Bay headwaters",
      latitude: 44.953252,
      longitude: -93.487488,
    },
    takeOut: {
      id: 'longfellow-lagoon',
      name: 'Longfellow Lagoon',
      latitude: 44.961125473,
      longitude: -93.215049079,
    },
    logistics: {
      distanceLabel: '21.3 mi',
      estimatedPaddleTime: 'About 7 hr to 9 hr 45 min',
      shuttle:
        'Use the official access list to build a shorter one-way segment or run the whole creek with a long urban shuttle. The planner is the right way to use this corridor.',
      permits:
        'No route-specific paddling permit is known. Follow local park, trail, and landing rules anywhere you stage vehicles along the creek.',
      camping:
        'No camping is part of this route. Treat Minnehaha as a day-trip corridor with many shorter segment options.',
      summary:
        'The official MCWD access list turns Minnehaha into a choose-your-segment corridor. Use the planner below instead of assuming one default put-in and take-out.',
      accessCaveats: [
        'Several official access points are parks or roadside landings rather than formal ramps. Confirm parking, legal access, and any current closures on the ground.',
        'Required portages around dams and lake transitions matter as much as the gauge on this creek.',
      ],
      watchFor: [
        'Low bridges, wood, rocks, and fast current after rain, especially when flows rise toward or above 150 cfs.',
        'Required portages around the Edina Mills dam, the 54th Street dam, and the Lake Nokomis transition.',
        'Urban access complexity. Use only the designated MCWD landing points rather than random bank openings.',
      ],
    },
    accessPoints: [
      {
        id: 'headwaters',
        name: "Gray's Bay headwaters",
        latitude: 44.953252,
        longitude: -93.487488,
        mileFromStart: 0,
        segmentKind: 'lake',
        note: 'Official creek start below Gray\'s Bay Dam.',
      },
      {
        id: 'jidana-park',
        name: 'Jidana Park',
        latitude: 44.941860141,
        longitude: -93.477039156,
        mileFromStart: 0.8,
        segmentKind: 'lake',
        note: 'Small early access if you want to skip the first headwaters mile.',
      },
      {
        id: 'minnetonka-civic-center',
        name: 'Minnetonka Civic Center',
        mileFromStart: 1.6,
        segmentKind: 'lake',
        note: 'Official civic-center access on the upper creek.',
      },
      {
        id: 'burwell-park',
        name: 'Burwell Park',
        mileFromStart: 2.4,
        segmentKind: 'lake',
        note: 'Official upper-creek park access.',
      },
      {
        id: 'big-willow-park',
        name: 'Big Willow Park',
        mileFromStart: 3.2,
        segmentKind: 'lake',
        note: 'Upper-creek park access before the more road-adjacent segment options.',
      },
      {
        id: 'hopkins-crossroad',
        name: 'Hopkins Crossroad',
        mileFromStart: 4.2,
        segmentKind: 'lake',
        note: 'Useful upper-creek split point if you want a shorter western segment.',
      },
      {
        id: 'minnetonka-boulevard-bridge',
        name: 'Minnetonka Boulevard Bridge',
        latitude: 44.9452789,
        longitude: -93.4055478,
        mileFromStart: 5.4,
        segmentKind: 'lake',
        note: 'Roadside access as the creek starts to feel less like the upper headwaters lakes.',
      },
      {
        id: 'knollwood-target',
        name: 'Knollwood Target',
        latitude: 44.9473441,
        longitude: -93.389443823,
        mileFromStart: 6.8,
        segmentKind: 'transition',
        note: 'Official parking access, but less clean as a landing than Creekside Park farther downstream.',
      },
      {
        id: 'creekside-park',
        name: 'Creekside Park',
        latitude: 44.930522365,
        longitude: -93.373441764,
        mileFromStart: 8,
        segmentKind: 'transition',
        note: 'Cleaner designated park take-out than the retail Knollwood lot.',
      },
      {
        id: 'louisiana-avenue',
        name: 'Louisiana Avenue',
        latitude: 44.92872352,
        longitude: -93.364853081,
        mileFromStart: 8.9,
        segmentKind: 'transition',
        note: 'Shorter-day option just downstream of Creekside Park.',
      },
      {
        id: 'browndale-avenue',
        name: 'Browndale Avenue',
        mileFromStart: 11.6,
        segmentKind: 'transition',
        note: 'Official access near the required Edina Mills dam portage.',
      },
      {
        id: 'utley-park',
        name: 'Utley Park',
        mileFromStart: 11.7,
        segmentKind: 'transition',
        note: 'Useful mid-creek access immediately below the Edina Mills portage area.',
      },
      {
        id: 'arden-park',
        name: 'Arden Park / W 54th Street',
        latitude: 44.905593159,
        longitude: -93.333884296,
        mileFromStart: 12.7,
        segmentKind: 'transition',
        note: 'Official access near another required portage around the 54th Street dam.',
      },
      {
        id: 'lynnhurst-park',
        name: 'Lynnhurst Park',
        latitude: 44.911466826,
        longitude: -93.29882246,
        mileFromStart: 15.7,
        segmentKind: 'transition',
        note: 'Popular middle-to-lower creek park access.',
      },
      {
        id: 'lake-nokomis',
        name: 'Lake Nokomis',
        latitude: 44.915882352,
        longitude: -93.242957411,
        mileFromStart: 19.4,
        segmentKind: 'creek',
        note: 'A portage is required to enter Lake Nokomis.',
      },
      {
        id: 'lake-hiawatha',
        name: 'Lake Hiawatha',
        latitude: 44.918693381,
        longitude: -93.232164201,
        mileFromStart: 20.1,
        segmentKind: 'creek',
        note: 'Lower-creek access after the Nokomis transition.',
      },
      {
        id: 'longfellow-lagoon',
        name: 'Longfellow Lagoon',
        latitude: 44.961125473,
        longitude: -93.215049079,
        mileFromStart: 21.3,
        segmentKind: 'creek',
        note: 'Official route end before Minnehaha Falls.',
      },
    ],
  },
  'cloquet-river-island-lake-bachelor-road': {
    putIn: {
      name: 'Island Lake Dam carry-in access',
      latitude: 46.9912948,
      longitude: -92.225418,
    },
    takeOut: {
      name: 'Bachelor Road trailer access',
      latitude: 46.9521455,
      longitude: -92.3270784,
    },
    logistics: {
      distanceLabel: '8.1 mi',
      estimatedPaddleTime: 'About 2 hr 30 min to 4 hr 30 min',
      shuttle:
        'Standard two-car shuttle below Island Lake. Stage the take-out first because cell coverage can be spotty and the dam launch is the less convenient place to solve a shuttle mistake.',
      permits:
        'No route-specific paddling permit is known. Follow posted DNR access and camping rules, and respect any same-day release or site notices.',
      camping:
        'MN DNR says this section has numerous primitive first-come watercraft campsites, but most parties will treat Island Lake Dam to Bachelor Road as a day trip.',
      summary:
        'Launch below Island Lake Dam and finish at Bachelor Road for the DNR-recommended lower Cloquet day. Use the direct gauge to avoid scrape-level releases, then make the on-river call based on rapids, scouting comfort, and same-day conditions.',
      accessCaveats: [
        'The official DNR map clearly names both endpoints, but the saved coordinates are still arrival guidance rather than a substitute for same-day signage and map checks.',
        'Bachelor Road is a real public trailer access on the official Cloquet water-trail map, but it is not backed here by a richer standalone facility page with parking rules and amenities.',
        'The put-in is below a dam and the segment depends on releases, so same-day conditions can differ more than the raw number suggests.',
      ],
      watchFor: [
        'Class I-II rapids that deserve scouting and occasional portaging.',
        'Scraping and short river walks when releases hover near the 175 cfs floor.',
        'Fresh wood, cold water, and fast current changes after storms or release shifts.',
      ],
    },
  },
  'zumbro-river-falls': {
    putIn: {
      name: 'Green Bridge (Zumbro River)',
      latitude: 44.2335481,
      longitude: -92.4820266,
    },
    takeOut: {
      name: 'Zumbro Falls access',
      latitude: 44.2833001,
      longitude: -92.4221257,
    },
    logistics: {
      distanceLabel: '9.7 mi',
      estimatedPaddleTime: 'About 3 hr 15 min to 4 hr 30 min',
      shuttle:
        'Two-car shuttle works best. If you use a paid shuttle, confirm pickup and parking rules locally.',
      permits:
        'No general paddling permit indicated. Follow posted access and parking rules.',
      camping:
        'Treat this as a day trip unless you have explicit campsite confirmation or landowner permission.',
      summary:
        'Use Green Bridge as the put-in and Zumbro Falls as the take-out. Plan a two-car shuttle and verify access or parking rules locally before you commit.',
      accessCaveats: [
        'Green Bridge is a simple carry-in access, so confirm where to park before staging vehicles.',
        'Take-out details at Zumbro Falls are best confirmed on the ground before you leave a car.',
      ],
      watchFor: [
        'Flash flooding after heavy rain can turn this lively reach into a no-go quickly.',
        'Logs, sweepers, and fresh strainers after storms.',
        'Cold-water risk in shoulder seasons.',
      ],
    },
  },
  'iowa-river-sturgis-ferry-hills-access': {
    putIn: {
      name: 'Sturgis Ferry Park boat ramp (Iowa City)',
      latitude: 41.640199994977,
      longitude: -91.538966712124,
    },
    takeOut: {
      name: 'Hills Access & Campground (Johnson County Conservation)',
      latitude: 41.5544618,
      longitude: -91.5257829,
    },
    logistics: {
      distanceLabel: '9.25 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr 30 min',
      shuttle:
        'Two-car shuttle is the practical choice. The road shuttle is simple, so stage the take-out vehicle at Hills before launching from Iowa City.',
      permits:
        'No route-specific paddling permit is known. Follow posted Iowa City park rules at Sturgis Ferry and Johnson County access and camping rules at Hills.',
      camping:
        'Hills Access offers 13 electric and 7 non-electric campsites, with the campground typically open from April 15 to October 15.',
      summary:
        'Launch at Sturgis Ferry Park and finish at Hills Access for the first Johnson County Iowa River Water Trail segment. Expect a more developed Iowa City start, then quieter bottomland miles before the county-ramp finish at Hills.',
      accessCaveats: [
        'Sturgis Ferry Park is an official city boat-ramp park, but the saved point is tied to the park address rather than a separate launch GIS record, so expect to orient inside the park on arrival.',
        'Hills Access has stronger endpoint detail than most county take-outs, including a published coordinate, boat-ramp confirmation, campground operations information, and vault toilets.',
        'Johnson County notes that the area east of the river at Hills is archery- or falconry-only for hunting, so treat side exploration near the take-out conservatively during hunting seasons.',
      ],
      watchFor: [
        'Fresh sweepers, downed trees, or floating debris after rain.',
        'Muddy or soft banks at breaks and at the Hills take-out.',
        'A longer-feeling day than the difficulty label suggests if the gauge is hovering near the floor.',
      ],
    },
  },
  'black-hawk-creek-hudson-waterloo': {
    putIn: {
      name: 'Franck Park (Access 15), Hudson',
      latitude: 42.40404,
      longitude: -92.46443,
    },
    takeOut: {
      name: 'Ranchero Road / Katoski Greenbelt (Access 8), Waterloo',
      latitude: 42.45749,
      longitude: -92.41535,
    },
    logistics: {
      distanceLabel: '7.5 mi',
      estimatedPaddleTime: 'About 2 hr 30 min to 3 hr 30 min',
      shuttle:
        'Car shuttle is recommended between Franck Park and Ranchero Road / Katoski Greenbelt.',
      permits: 'None noted by Iowa DNR for a standard day paddle on this reach.',
      camping: 'None noted by Iowa DNR for this urban/suburban reach.',
      summary:
        'Use Franck Park (Access 15) as the put-in and Ranchero Road / Katoski Greenbelt (Access 8) as the take-out. Treat the official 100 to 500 cfs band as necessary, not sufficient.',
      accessCaveats: [
        'Access coordinates were geocoded from public map data, not an official access GIS record.',
        'This is a skilled-creek call. Fresh storm damage can make a known access pair unusable even when the gauge is in range.',
      ],
      watchFor: [
        'Strainers, sweepers, deadfalls, and logjams are common.',
        'Two fords can behave like low-head dam hazards at certain water levels.',
        'Be ready to scout and portage around fresh wood.',
      ],
    },
  },
  'rice-creek-peltier-to-long-lake': {
    putIn: {
      id: 'peltier-lake',
      name: 'Peltier Lake public boat launch (Lino Lakes)',
      latitude: 45.175054,
      longitude: -93.0701588,
    },
    takeOut: {
      id: 'long-lake',
      name: 'Long Lake Regional Park / Long Lake (New Brighton)',
      latitude: 45.0805227,
      longitude: -93.1994956,
    },
    logistics: {
      distanceLabel: '15.2 mi',
      estimatedPaddleTime: 'About 5 hr to 7 hr',
      shuttle:
        'Self-shuttle is typical, and multiple intermediate landings make shorter one-way options possible.',
      permits: 'No paddling permit noted. Check local park rules at launch and take-out.',
      camping: 'No camping noted for this day-use water trail.',
      summary:
        'The upper miles are mostly lake crossings before the creek narrows. Fish-barrier status, lake wind, and intermediate exits matter almost as much as the gauge.',
      accessCaveats: [
        'Multiple intermediate landings make it easy to shorten the route if wind or time becomes a problem.',
        'An electric fish barrier near Long Lake may require a marked portage depending on posted conditions.',
      ],
      watchFor: [
        'Wind and chop on the opening lake chain.',
        'High-water or low-water culvert issues, especially between Baldwin Lake and I-35W.',
        'Fallen trees and the Long Lake fish-barrier portage decision.',
      ],
    },
    accessPoints: [
      {
        id: 'peltier-lake',
        name: 'Peltier Lake boat launch',
        latitude: 45.175054,
        longitude: -93.0701588,
        mileFromStart: 0,
        segmentKind: 'lake',
        note: 'Full trail start just below the Peltier Lake dam.',
      },
      {
        id: 'george-watch-lake',
        name: 'George Watch Lake carry-in',
        latitude: 45.1747078,
        longitude: -93.0902356,
        mileFromStart: 1.4,
        segmentKind: 'lake',
        note: 'Skips the first lake mile and keeps the route in the open-water chain.',
      },
      {
        id: 'reshanau-lake',
        name: 'Reshanau Lake carry-in',
        latitude: 45.1529228,
        longitude: -93.0978098,
        mileFromStart: 3.6,
        segmentKind: 'lake',
        note: 'Mid-lakes access for a shorter chain-of-lakes start.',
      },
      {
        id: 'aqua-lane',
        name: 'Aqua Lane canoe launch',
        latitude: 45.163501,
        longitude: -93.1154659,
        mileFromStart: 4.8,
        segmentKind: 'transition',
        note: 'Useful early take-out or downstream restart after the upper lake chain.',
      },
      {
        id: 'baldwin-lake',
        name: 'Baldwin Lake carry-in',
        latitude: 45.1383968,
        longitude: -93.1359875,
        mileFromStart: 5.7,
        segmentKind: 'transition',
        note: 'Best split point between the upper lake chain and the narrower downstream creek miles.',
      },
      {
        id: 'east-golden-lake-lane',
        name: 'East Golden Lake Lane access',
        latitude: 45.1348215,
        longitude: -93.1471925,
        mileFromStart: 6.8,
        segmentKind: 'creek',
        note: 'Convenient shorter-day access once the route leaves the lake-focused miles behind.',
      },
      {
        id: 'lexington-avenue',
        name: 'Lexington Avenue access',
        latitude: 45.1196142,
        longitude: -93.1647156,
        mileFromStart: 9.1,
        segmentKind: 'creek',
        note: 'Mid-creek landing for a shorter downstream option or bailout before the final miles.',
      },
      {
        id: 'county-road-i',
        name: 'County Road I access',
        latitude: 45.1088417,
        longitude: -93.1840952,
        mileFromStart: 11,
        segmentKind: 'creek',
        note: 'Common shorter-day take-out. High water can force a portage here.',
      },
      {
        id: 'old-highway-8',
        name: 'Old Highway 8 access',
        latitude: 45.0936178,
        longitude: -93.1922582,
        mileFromStart: 13.5,
        segmentKind: 'creek',
        note: 'Late-route access if you want to skip the final stretch into Long Lake.',
      },
      {
        id: 'long-lake',
        name: 'Long Lake Regional Park',
        latitude: 45.0805227,
        longitude: -93.1994956,
        mileFromStart: 15.2,
        segmentKind: 'creek',
        note: 'Full downstream finish. Watch fish-barrier status near Long Lake.',
      },
    ],
  },
  'kettle-river-lower-kettle-5-to-6': {
    putIn: {
      name: '#5 trailer access (Kettle River State Water Trail - Map 2)',
      latitude: 46.0107725,
      longitude: -92.8407339,
    },
    takeOut: {
      name: '#6 trailer access (Kettle River State Water Trail - Map 2)',
      latitude: 45.9451305,
      longitude: -92.7769513,
    },
    logistics: {
      distanceLabel: '7.2 river mi',
      estimatedPaddleTime: 'About 2 hr 30 min to 3 hr 15 min',
      shuttle:
        'Plan a car shuttle. Exact driving distance varies by route taken, so confirm your pickup plan before launching.',
      permits:
        'No permit for general day paddling is noted. Follow any posted landing or parking rules at the trailer accesses.',
      camping:
        'Camping is not confirmed for this exact day-trip segment. Verify state-park or water-trail options separately before planning an overnight.',
      summary:
        'The official Map 2 reach is a mostly-flatwater day trip with one Class I rapid around river mile 11. Use the Sandstone gauge as a trend check and stay conservative after rain.',
      accessCaveats: [
        'The route pair and mileage are backed by MN DNR Map 2, but landing amenities and seasonal closures still need on-site confirmation.',
        'Verify parking and launch conditions at both trailer accesses before you leave a shuttle vehicle.',
      ],
      watchFor: [
        'Debris or strainers after storms and in high water.',
        'The Class I rapid around river mile 11.',
        'Cold-water risk in shoulder seasons.',
      ],
    },
  },
  'crow-wing-river-little-white-dog-cottingham': {
    putIn: {
      name: 'Little White Dog County Park #9 carry-in access',
      latitude: 46.58698,
      longitude: -94.82262,
    },
    takeOut: {
      name: 'Cottingham County Park #11 carry-in access',
      latitude: 46.5044417,
      longitude: -94.8107221,
    },
    logistics: {
      distanceLabel: '9.8 river mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr 30 min',
      shuttle:
        'Standard Wadena County self-shuttle. Confirm the Cottingham parking and camping setup before leaving a vehicle, especially if you are pairing the paddle with an overnight.',
      permits:
        'No special paddling permit is known for this Minnesota DNR water-trail route. County campground fees or rules may apply if you camp.',
      camping:
        'MN DNR identifies primitive camping/rest-area context at both Little White Dog and Cottingham. Confirm current Wadena County rules, fees, and seasonal availability before planning an overnight.',
      summary:
        'Launch at Little White Dog and finish at Cottingham County Park for the DNR-recommended Crow Wing day trip. The river character is friendly, but use the Nimrod gauge to avoid a scrape-heavy or high-water day.',
      accessCaveats: [
        'Both endpoints are named by MN DNR and backed by Wadena County campground/access pages, but saved coordinates should still defer to on-site signage.',
        'Cottingham and Little White Dog are county campground/access sites, so parking, camping, fees, and seasonal details should be checked before the shuttle.',
      ],
      watchFor: [
        'Exposed sandbars and slower travel when the Nimrod gauge falls below the medium band.',
        'Fresh wood, strainers, and debris after high water.',
        'Tubing traffic on popular summer weekends in the lower part of the route.',
      ],
    },
  },
  'whitewater-river-elba-highway-74': {
    putIn: {
      name: 'Elba / Highway 26 and Center Street access',
      latitude: 44.09185,
      longitude: -92.01381,
    },
    takeOut: {
      name: 'Highway 74 roadside take-out near Whitewater WMA',
      latitude: 44.14973,
      longitude: -92.00558,
    },
    logistics: {
      distanceLabel: 'About 10.4 river mi',
      estimatedPaddleTime: 'About 3 hr 30 min to 5 hr',
      shuttle:
        'Short road shuttle between Elba and the Highway 74 take-out. Because these are less polished roadside-style accesses, confirm legal parking and the exact take-out before launching.',
      permits:
        'No special paddling permit is known for the Minnesota DNR Whitewater River State Water Trail. Follow posted WMA, roadside parking, and boating rules.',
      camping:
        'MN DNR says there are no campsites or rest areas on the Whitewater River State Water Trail. Use off-river options such as Whitewater State Park if you need an overnight base.',
      summary:
        'Put in at Elba and take out where the river comes back to Highway 74. This is a narrow, wood-sensitive creek route, so the DNR gauge is only the first screen; current strainers and logjams still decide the day.',
      accessCaveats: [
        'The access story is still less polished than named park landings. MilesPaddled and Post Bulletin reports support the same access pair, but verify legal parking and the exact take-out before committing to the shuttle.',
        'MN DNR notes ecological sensitivity in the Whitewater WMA, so stay on legal accesses and avoid creating informal stops.',
      ],
      watchFor: [
        'Deadfall, strainers, and occasional logjam portages.',
        'Fast current and fewer recovery options when the Beaver gauge rises into high water.',
        'Scraping and extra dragging when the gauge drops below the medium band.',
      ],
    },
  },
  'south-fork-zumbro-lake-zumbro': {
    putIn: {
      name: '90th Street NW footbridge access',
      latitude: 44.12967,
      longitude: -92.46227,
    },
    takeOut: {
      name: 'Lake Zumbro County Park canoe/kayak launch',
      latitude: 44.17933,
      longitude: -92.46266,
    },
    logistics: {
      distanceLabel: '5 mi',
      estimatedPaddleTime: 'About 1 hr 45 min to 2 hr 15 min',
      shuttle:
        'Two-car shuttle is simplest. A bike shuttle is possible, but expect a mix of gravel and pavement.',
      permits: 'No permit noted for this reach.',
      camping: 'No camping noted for this reach.',
      summary:
        'Use the 90th Street NW access as the put-in and Lake Zumbro County Park as the take-out. The route is short, but wind on the reservoir finish still changes the day.',
      accessCaveats: [
        'The 90th Street NW put-in is still based on bridge/location context rather than a clearly documented public canoe launch listing, but MnDOT does at least anchor the exact footbridge location as Frank\'s Ford Bridge.',
        'Lake Zumbro County Park has a county-documented separate canoe/kayak launch, but confirm day-use parking rules on arrival.',
      ],
      watchFor: [
        'Rapid rises after rain on the Zumbro system.',
        'Snags or wood that change after storms.',
        'Wind exposure on Lake Zumbro near the finish.',
      ],
    },
  },
  'upper-iowa-river-kendallville-decorah': {
    putIn: {
      name: 'Kendallville Park Canoe Access',
      latitude: 43.44202,
      longitude: -92.03809,
    },
    takeOut: {
      name: 'Ice Cave Hill Park / Decorah canoe access',
      latitude: 43.30667,
      longitude: -91.78813,
    },
    logistics: {
      distanceLabel: '16.5 mi',
      estimatedPaddleTime: 'About 5 hr 30 min to 7 hr 30 min',
      shuttle:
        'Arrange a car shuttle between Kendallville and Decorah or use an outfitter.',
      permits: 'No permit is known for a basic day paddle. Follow county-park and city-park access rules at Kendallville and the Decorah finish.',
      camping:
        'Kendallville is a convenient campground staging point. Other overnight options exist along the corridor if you plan ahead.',
      summary:
        'This is a long Driftless day with county-park staging at Kendallville and a Decorah finish. Low water hurts trip quality well before it becomes unsafe.',
      accessCaveats: [
        'Kendallville is a strong staging access with county campground support, and Decorah park materials show canoe access at the city finish, but parking layout still deserves a same-day look.',
        'This is a long day for beginners, so consider splitting it if your group is new.',
      ],
      watchFor: [
        'Strainers or logjams after high water.',
        'Cold-water exposure in spring or fall.',
        'Faster current and fewer margins when levels rise.',
      ],
    },
  },
  'upper-iowa-river-cattle-creek-bluffton': {
    putIn: {
      name: 'Cattle Creek Road / Daley Bridge canoe access area',
      latitude: 43.4149,
      longitude: -91.95874,
    },
    takeOut: {
      name: 'Bluffton Fir Stand Access / Bluffton Road-W20 canoe ramp',
      latitude: 43.3996,
      longitude: -91.8884,
    },
    logistics: {
      distanceLabel: '9.7 mi',
      estimatedPaddleTime: 'About 4 hr to 5 hr, plus stops for bluffs and springs',
      shuttle:
        'Use a car or outfitter shuttle between Cattle Creek Road and the Bluffton Fir Stand / W20 landing. The direct bike shuttle is hilly, partly gravel, and not a good default plan.',
      permits:
        'No route-specific paddling permit is known. Iowa registration rules can apply to longer boats, and all paddlers should follow posted county, road-end, and access-area rules.',
      camping:
        'Nearby private campgrounds and liveries cluster around Bluffton, but no public watercraft campsite is assumed for this day route. Arrange camping separately before relying on it.',
      summary:
        'Launch at the Cattle Creek Road / Daley Bridge access area and take out at the public Bluffton Fir Stand / W20 canoe ramp after Chimney Rock, Bluffton Palisades, clear riffles, and the busiest scenic core of the Upper Iowa.',
      accessCaveats: [
        'The Cattle Creek bridge/access area has changed since older trip reports, so confirm current parking and the launch path before unloading.',
        'The Bluffton-area take-out is deliberately downstream of the private campground launches so paddlers keep the final bluff section and finish at the public W20 / Bluffton Fir Stand access.',
        'Summer weekends can be crowded with liveries, tubes, campground traffic, and limited parking patience at the access points.',
      ],
      watchFor: [
        'Scraping in riffles near or below 150 cfs at the Bluffton gauge.',
        'Pushy current at roughly 700 cfs and above, plus faster consequences around wood, bridge approaches, and crowded landings.',
        'Minor Class I riffles, strainers after storms, cold-water exposure outside midsummer, and private-bank boundaries along the corridor.',
      ],
    },
  },
  'zumbro-river-theilman-kruger': {
    putIn: {
      name: 'Theilman Access (off Hwy 4)',
      latitude: 44.28675,
      longitude: -92.1867,
    },
    takeOut: {
      name: 'Kruger Access (off Hwy 81)',
      latitude: 44.33728,
      longitude: -92.07724,
    },
    logistics: {
      distanceLabel: '10.75 mi',
      estimatedPaddleTime: 'About 3 hr 30 min to 5 hr',
      shuttle:
        'Car shuttle is recommended. A bike shuttle is possible, but it is longer and rougher than the more polished river-town shuttles upstream.',
      permits:
        'No state water-trail permit is required. Confirm parking, fees, and any posted access rules before leaving a vehicle.',
      camping:
        'Nearby Dorer and Kruger camping options exist, but confirm them separately. Treat this segment as a day trip by default.',
      summary:
        'Put in at Theilman and take out at Kruger for a quieter lower-Zumbro day. The same Zumbro Falls gauge still matters here, but the route feels more remote and storm-changed wood matters more.',
      accessCaveats: [
        'Both accesses are supported by MN DNR route materials, but same-day parking and landing conditions should still be checked on arrival.',
        'Kruger is the cleaner downstream landing, but this reach is still remote enough that shuttle timing and backup plans matter.',
      ],
      watchFor: [
        'Fast rises after rain and fresh debris on blind bends.',
        'Muddy or poor intermediate stopovers if you need to get off early.',
        'Cold-water exposure and limited bailout options compared with the upper Zumbro reaches.',
      ],
    },
  },
  'zumbro-river-kruger-west-newton': {
    putIn: {
      name: 'Kruger Access (off Hwy 81)',
      latitude: 44.3372,
      longitude: -92.07725,
    },
    takeOut: {
      name: 'West Newton Public Boat Launch',
      latitude: 44.28408,
      longitude: -91.92677,
    },
    logistics: {
      distanceLabel: '12 mi',
      estimatedPaddleTime: 'About 4 hr to 5 hr 30 min',
      shuttle:
        'Two-car shuttle is the practical choice. Do not assume a bike shuttle is pleasant on these rural roads without checking shoulders and traffic first.',
      permits:
        'No general paddling permit is known for this reach. Confirm parking and launch rules at West Newton before you commit to the shuttle.',
      camping:
        'No on-route camping is confirmed for this segment. Plan it as a day trip unless you have a separate Mississippi overnight plan.',
      summary:
        'Put in at Kruger and take out at West Newton where the Zumbro meets the Mississippi corridor. The lower river is still mostly easy, but the finish is less sheltered and more exposed to wind and bigger-water traffic.',
      accessCaveats: [
        'Kruger is straightforward, but the West Newton take-out deserves a same-day parking and landing check because it is part of a larger river environment.',
        'Do not treat the Mississippi finish like a small-river landing if wind or boat traffic looks active.',
      ],
      watchFor: [
        'Snags and storm-changed wood on the lower Zumbro.',
        'Wind-driven chop or motorboat traffic near the Mississippi take-out.',
        'Cold water and quick level changes in spring or after heavy rain.',
      ],
    },
  },
  'baraboo-river-glenville-luebke': {
    putIn: {
      name: 'Glenville Landing / Highway 113',
      latitude: 43.45828,
      longitude: -89.71452,
    },
    takeOut: {
      name: 'Luebke Landing / County Road W',
      latitude: 43.46578,
      longitude: -89.65695,
    },
    logistics: {
      distanceLabel: '5.1 mi',
      estimatedPaddleTime: 'About 2 hr to 3 hr',
      shuttle:
        'Use a short rural car shuttle from Glenville Landing at Highway 113 to Luebke Landing on County Road W. Wisconsin River Trips maps the bike shuttle at about 3.5 miles with modest climbing, but County Road W traffic and shoulder conditions should be checked before choosing a bike shuttle.',
      permits:
        'No route-specific paddling permit is known. Follow posted parking and landing rules at both Sauk County / Baraboo River access sites.',
      camping:
        'No on-route camping is expected. The Baraboo River map notes that most riverfront land is private and that camping is not allowed along the river.',
      summary:
        'Put in at Glenville Landing off Highway 113 southeast of Baraboo and take out at Luebke Landing on County Road W. This short lower-Baraboo route is easy at normal levels, with steady current, floodplain woods, muddy banks, and enough wood risk to make high-water judgment important.',
      accessCaveats: [
        'Sauk County mapping lists both Glenville and Luebke as river landings with parking, but no restrooms at either site.',
        'Glenville can be muddy after heavy rain, and Luebke is a boat ramp but still a small river landing rather than a full-service paddling facility.',
        'Most banks along the Baraboo are private; use the named landings and avoid casual bank exits unless safety requires it.',
      ],
      watchFor: [
        'Strainers, downed trees, and fresh logjams after wind or rain events.',
        'Faster, muddier current that can push paddlers into wood above the average stage band.',
        'Steep muddy banks and slippery carries if a blockage forces an unplanned portage.',
      ],
    },
  },
  'sugar-river-belleville-county-x': {
    putIn: {
      name: 'Belleville Community Park (Sugar River)',
      latitude: 42.86083,
      longitude: -89.53419,
    },
    takeOut: {
      name: 'County Road X bridge access (Sugar River)',
      latitude: 42.79994,
      longitude: -89.48646,
    },
    logistics: {
      distanceLabel: '10.25 mi',
      estimatedPaddleTime: 'About 3 hr 30 min to 4 hr 45 min',
      shuttle:
        'Plan a car shuttle and confirm parking rules at both endpoints.',
      permits:
        'No paddling permit noted. Village of Belleville parks are open 6 a.m. to 10 p.m.; check Community Park and County Road X signage for any more specific parking rules.',
      camping: 'No established camping documented for this segment. Treat it as a day trip.',
      summary:
        'Put in at Belleville Community Park and take out at County Road X. This is a mellow but full-feeling day with several riffles and wooded bends; use the Verona gauge because both low-water scraping and pushier high water change the character quickly.',
      accessCaveats: [
        'Belleville Community Park is subject to official village park hours and vehicle rules, but the exact river-launch pattern and County Road X parking setup are still best confirmed on the ground.',
        'The low-water floor matters more than a precise sweet spot on this reach.',
      ],
      watchFor: [
        'Shallows and grounding below the normal Verona-gauge window.',
        'Pushier current, poorer clarity, and harder strainer avoidance above the high-water caution band.',
        'Muddy bottom, tight bends, and occasional strainers after storms.',
        'Stay clear of the Belleville dam or spillway upstream of the put-in.',
      ],
    },
  },
  'sugar-river-county-road-x-county-road-ee': {
    putIn: {
      name: 'County Road X bridge access (Sugar River)',
      latitude: 42.79994,
      longitude: -89.48646,
    },
    takeOut: {
      name: 'County Road EE bridge access (Sugar River)',
      latitude: 42.73374,
      longitude: -89.44287,
    },
    logistics: {
      distanceLabel: '11.5 mi',
      estimatedPaddleTime: 'About 3 hr 45 min to 5 hr 15 min',
      shuttle:
        'Plan a car shuttle and confirm parking etiquette at both bridge accesses before leaving a vehicle.',
      permits:
        'No route-specific paddling permit noted. Check County Road X and County Road EE signage for any local parking limits or closures.',
      camping: 'No established camping documented for this segment. Treat it as a day trip.',
      summary:
        'Use the County Road X bridge access south of Belleville and finish at County Road EE north of Albany. This is a mellow wooded float, but low water and the full 11.5-mile length make the day feel bigger than it first looks.',
      accessCaveats: [
        'These accesses are supported by the regional Capitol Water Trails map, and Wisconsin DNR confirms downstream public parking and a boat launch in the Albany Wildlife Area corridor, but the exact County Road EE bridge landing still deserves a same-day check.',
        'County bridge landings can be muddy or debris-prone after rain, especially on the take-out side.',
      ],
      watchFor: [
        'Low water slowing the day down or causing repeated grounding.',
        'Strainers or fresh deadfall on outer bends after storms.',
        'Fatigue, food, and weather management on a longer flatwater day.',
      ],
    },
  },
  'baraboo-river-haskins-glenville': {
    putIn: {
      name: 'Haskins Park ADA kayak launch',
      latitude: 43.46997,
      longitude: -89.76158,
    },
    takeOut: {
      name: 'Glenville Landing / Highway 113 boat landing',
      latitude: 43.45853,
      longitude: -89.71399,
    },
    logistics: {
      distanceLabel: '4.5 mi',
      estimatedPaddleTime: 'About 1 hr 15 min to 2 hr',
      shuttle:
        'Use a short Baraboo-area car shuttle between Haskins Park in West Baraboo and Glenville Landing on Highway 113. A bike shuttle is practical through town and along the riverwalk, but the final Highway 113 approach has traffic exposure.',
      permits:
        'No route-specific paddling permit is known. Follow posted Haskins Park and Glenville Landing parking rules, and avoid blocking the landing or ADA kayak-launch approach.',
      camping:
        'No on-route camping is expected. This is a short urban day route through Baraboo and past Circus World, not an overnight corridor.',
      summary:
        'Launch from Haskins Park and paddle the short Baraboo Rapids corridor through downtown Baraboo to Glenville Landing. The route is short and popular, but it has real current, riffles, and Class I ledges, so use the Baraboo gauge and scout if recent rain has changed wood or strainers.',
      accessCaveats: [
        'Haskins Park is the clean public start; the Baraboo River Corridor Plan documents a non-motorized boat launch, floating pier, and ADA-accessible kayak launch there.',
        'Glenville Landing is a public Highway 113 landing with parking, but muddy/silty conditions are common after rain or high water.',
        'The route runs through an urban corridor with bridges, public parks, museum property, and private edges. Stay in the river corridor and use only established landings.',
      ],
      watchFor: [
        'Riffles and Class I ledges, especially around downtown Baraboo and the former dam/bridge corridors.',
        'Strainers, bridge approaches, muddy banks, and higher-water push if the Baraboo gauge is rising.',
        'Low-water rock bumps below the 350 cfs same-route minimum, plus cold water in spring and fall.',
      ],
    },
  },
  'sugar-river-highway-x-attica': {
    putIn: {
      name: 'Highway X public access',
      latitude: 42.754137,
      longitude: -89.429329,
    },
    takeOut: {
      name: 'Attica Highway C Access',
      latitude: 42.733903,
      longitude: -89.406695,
    },
    logistics: {
      distanceLabel: '5.4 mi',
      estimatedPaddleTime: 'About 2 hr to 3 hr',
      shuttle:
        'Use the short rural shuttle between the Highway X landing and the Attica Highway C access. Wisconsin River Trips reports the bike shuttle as about 2.7 miles with little climbing.',
      permits:
        'No route-specific paddling permit is known. Check posted access and roadside parking rules before leaving a vehicle.',
      camping:
        'No on-route camping is documented for this short reach. Treat it as a day paddle.',
      summary:
        'Put in at the Highway X public access and take out at the Attica Highway C access. This is a simple lower-Sugar float with easy current, a wooded final mile, and a clear Verona-gauge ladder.',
      accessCaveats: [
        'The accesses are bridge-area public landings, so confirm parking and bank conditions before committing to the shuttle.',
        'This route overlaps the upstream half of the longer County Road X to County Road EE entry, but the Attica take-out creates a shorter, cleaner beginner day.',
      ],
      watchFor: [
        'Low-water scraping below the normal summer range.',
        'Strainers after storms or at higher, pushier levels.',
        'Turbid water, limited scenery on some open-bank miles, and cold-water exposure outside summer.',
      ],
    },
  },
  'sugar-river-highway-69-paoli': {
    putIn: {
      name: 'Falk Wells Sugar River Wildlife Area / Highway 69 canoe-kayak launch',
      latitude: 42.950098,
      longitude: -89.545272,
    },
    takeOut: {
      name: 'Paoli Mill / County PB bridge take-out',
      latitude: 42.93032,
      longitude: -89.5244,
    },
    logistics: {
      distanceLabel: '3.3 mi',
      estimatedPaddleTime: 'About 1.5 hr to 2.5 hr depending on level and stops',
      shuttle:
        'Use the short local shuttle between Dane County Parks\' Highway 69 launch and Paoli. Dane County paddle events stage vehicles at 6889 Canal Street in Paoli and shuttle paddlers back to the Highway 69 launch.',
      permits:
        'No route-specific paddling permit is known. Confirm current event, parking, and take-out permission details at the Paoli Mill / Canal Street area before leaving a vehicle.',
      camping:
        'No on-route camping is documented for this short Dane County route. Treat it as a day paddle.',
      summary:
        'Launch from the Highway 69 canoe/kayak landing in Falk Wells Sugar River Wildlife Area and take out at Paoli near the County PB bridge. This is the best short upper-Sugar option, with riffles, clear gravel shallows, public conservation land, and a small former-dam drop near Paoli.',
      accessCaveats: [
        'The Highway 69 launch is a Dane County carry-in access with parking, but it is a wildlife-area landing rather than a staffed park facility.',
        'The Paoli take-out is used by Dane County paddle events and by local paddlers, but the mill-area access is not an unrestricted public boat landing; confirm current parking and take-out permission before staging there.',
        'This is a narrow creek-like route. Fresh storm wood can change access and passage even when the Verona gauge is in range.',
      ],
      watchFor: [
        'Strainers, overhanging branches, and current pushing into wood on tight bends.',
        'A fun but consequential Class I+ former-dam chute near Paoli, followed by a concrete-remnant hazard where the current can draw boats left.',
        'Shallow riffles below the practical low-water floor and pushy obstacle-dodging at high or rising water.',
      ],
    },
  },
  'black-hawk-creek-ranchero-hope-martin': {
    putIn: {
      name: 'Ranchero Road / Katoski Greenbelt Area (Access 8)',
      latitude: 42.45749,
      longitude: -92.41535,
    },
    takeOut: {
      name: 'Hope Martin Park (Access 2)',
      latitude: 42.4912408,
      longitude: -92.3697993,
    },
    logistics: {
      distanceLabel: '6 mi',
      estimatedPaddleTime: 'About 2 hr to 2 hr 45 min',
      shuttle:
        'Short car shuttle is easiest. Bike shuttle is possible but requires multiple bridge crossings and city traffic awareness.',
      permits: 'None noted for standard day paddling on this reach.',
      camping: 'No camping noted for this urban/suburban creek reach.',
      summary:
        'Use Ranchero Road / Katoski Greenbelt as the put-in and Hope Martin Park as the take-out. A good Hudson gauge reading is necessary, but not enough by itself.',
      accessCaveats: [
        'Ranchero Road parking is small, so confirm where to stage before leaving a vehicle.',
        'Hope Martin Park can be hard to spot from upstream; the downstream bridge is the clearest visual landmark.',
      ],
      watchFor: [
        'Frequent deadfalls, sweepers, and logjams on tight bends.',
        'Two creek fords that can behave like low-head dam hazards at some levels.',
        'Storm damage can change the route even when the gauge is inside the official range.',
      ],
    },
  },
  'chippewa-river-county-a-highway-8': {
    putIn: {
      name: 'Imalone / County A Bridge access',
      latitude: 45.552358,
      longitude: -91.228388,
    },
    takeOut: {
      name: 'Highway 8 Canoe Landing',
      latitude: 45.452909,
      longitude: -91.256361,
    },
    logistics: {
      distanceLabel: '9 mi',
      estimatedPaddleTime: 'About 4 hr',
      shuttle:
        'Use a rural car shuttle between the Imalone / County A bridge access and the Highway 8 canoe landing east of the bridge in Bruce. The roads are straightforward but too long for most casual bike shuttles.',
      permits:
        'No route-specific paddling permit is known. Follow posted Rusk County and Wisconsin public-access rules, and do not block roadside parking at the hand-carry put-in.',
      camping:
        'No on-route camping is documented for this day section. Treat it as a day paddle unless separately planning a longer upper-Chippewa trip.',
      summary:
        'Launch at the Imalone / County A access and finish at Highway 8 Canoe Landing in Bruce. This upper-Chippewa section is mostly easy current with wooded banks, island channels, riffles, and boulder gardens, but it still needs the Bruce gauge to stay above the practical minimum.',
      accessCaveats: [
        'Rusk County publishes the Imalone Boat Access and Highway 8 Canoe Landing coordinates for the Imalone-to-Bruce route.',
        'Wisconsin Trail Guide describes the County A put-in as a hand-carry access east of the bridge, upstream side, with roadside parking and a short downslope carry.',
        'The Highway 8 landing entrance is east of the bridge near Sawdust Road and has a trailer-access ramp and parking.',
      ],
      watchFor: [
        'Light riffles and boulder gardens that become scrapier below the 400 cfs / 1.5 ft minimum.',
        'Island splits, faster current near the left fork around islands, overhanging trees, and fresh wood.',
        'High or rising water after heavy rain or Arpin Dam releases, when novice paddlers should use extra caution.',
      ],
    },
  },
  'badfish-creek-old-stage-casey': {
    putIn: {
      name: 'Old Stage Road canoe/kayak landing',
      latitude: 42.8569,
      longitude: -89.2756,
    },
    takeOut: {
      name: 'North Casey Road take-out',
      latitude: 42.8287,
      longitude: -89.1849,
    },
    logistics: {
      distanceLabel: '6.75 mi',
      estimatedPaddleTime: 'About 2 hr 30 min to 4 hr',
      shuttle:
        'Use a short rural car shuttle between the Old Stage Road landing and North Casey Road. A bike shuttle is possible on local roads, but there are narrow shoulders and fast county-road segments.',
      permits:
        'No route-specific paddling permit is known. Follow posted Wisconsin DNR wildlife-area rules at Old Stage and do not block roadside traffic at North Casey Road.',
      camping:
        'No on-route camping is documented for this creek segment. Treat it as a day paddle.',
      summary:
        'Launch at the maintained Old Stage Road landing on Badfish Creek Wildlife Area and take out at North Casey Road. This is a lively narrow-creek route with reliable water, riffles, and quick bends, but it only stays friendly when wood is clear and the Cooksville gauge is not pushing high.',
      accessCaveats: [
        'Old Stage is the stronger endpoint: Wisconsin DNR confirms maintained canoe/kayak launches and parking in the wildlife area, and paddling reports describe a parking area and trail to the landing.',
        'North Casey Road is a bridge take-out rather than a developed park. Miles Paddled describes it as good, but you still need to confirm shoulder parking, bank condition, and bridge traffic before launching.',
        'The route passes near private land outside the wildlife-area corridor. Stay in the public waterway and use only known access points.',
      ],
      watchFor: [
        'Fast current around tight bends, especially above 200 cfs at Cooksville.',
        'Deadfall, sweepers, and fresh storm debris even after volunteer clearing work.',
        'Shallow riffles and rock bumps at lower levels, wild parsnip at access points, and wastewater-effluent water-quality context.',
      ],
    },
  },
  'beaver-dam-river-cotton-mill-county-j': {
    putIn: {
      name: 'Cotton Mill Park',
      latitude: 43.45456,
      longitude: -88.84298,
    },
    takeOut: {
      name: 'County Road J landing',
      latitude: 43.39397,
      longitude: -88.86828,
    },
    logistics: {
      distanceLabel: '5.5 to 5.8 mi',
      estimatedPaddleTime: 'About 1 hr 30 min to 2 hr 30 min',
      shuttle:
        'Use a short car shuttle between Cotton Mill Park in Beaver Dam and the County Road J landing near Leipsig. The bike shuttle is possible but County Road G has uncomfortable traffic exposure, so a vehicle shuttle is cleaner.',
      permits:
        'No route-specific permit is known. Follow posted city-park rules at Cotton Mill Park and do not block the County Road J landing, driveway, gate, or bridge shoulder.',
      camping:
        'No on-route camping is documented. Treat this as a short day route with a moving-water safety margin.',
      summary:
        'Launch at Cotton Mill Park just below the Beaver Dam Lake dam and finish at the improved County Road J landing. This route has more gradient and small waves than most south-central Wisconsin paddles, so the live gauge, recent wood reports, and same-day dam behavior matter more than mileage.',
      accessCaveats: [
        'Cotton Mill Park is the clean public start, but the launch is close to the dam and the first small weir. Scout the first bridge/drop before committing.',
        'County Road J now has a dedicated landing and parking area per recent Miles Paddled reports, but it is still road-adjacent. Do not block the nearby gate or private access.',
        'A controlled release can make the route runnable, but abrupt dam-gate changes can also make the river rise quickly. Check the gauge shortly before launching and again at the put-in.',
      ],
      watchFor: [
        'Class I-II waves, small weirs, and pushy downtown current, especially around Beaver Street, Center Street, Mill Street, and the Kraft corridor.',
        'Strainers and fresh wood between Davis Street and Cooper Street, around the Kraft corridor, and in the wooded middle reach.',
        'Low bridge clearance, blue-green algae warnings near the impoundment, wastewater-plant context, cold water, and wind on the slow marshy finish.',
      ],
    },
  },
  'bark-river-highway-164-to-merton-millpond': {
    putIn: {
      name: 'Highway 164 culvert crossing',
      latitude: 43.17969,
      longitude: -88.26254,
    },
    takeOut: {
      name: 'Merton Millpond boat launch',
      latitude: 43.14871,
      longitude: -88.30684,
    },
    logistics: {
      distanceLabel: '4 mi',
      estimatedPaddleTime: 'About 1 hr 15 min to 1 hr 45 min',
      shuttle:
        'Short car shuttle is simplest. Bike shuttle is possible if you are comfortable with local roads.',
      permits: 'None known for a standard day paddle.',
      camping: 'None noted for this short upper-river segment.',
      summary:
        'Put in at the Highway 164 culvert crossing north of Lisbon and take out at the Merton Millpond launch. This is a low-water-floor decision first and a route-quality decision second.',
      accessCaveats: [
        'Highway 164 is a limited roadside access. Verify a safe, legal pull-off before committing to the shuttle.',
        'The culvert put-in is functional rather than polished. Expect a less forgiving launch than the millpond take-out.',
      ],
      watchFor: [
        'Very low water and grass-choked channels below the minimum floor.',
        'Downed trees, tight bends, and overgrown banks.',
        'Cold spring water and quick rain response on the upper Bark.',
      ],
    },
  },
  'bark-river-princes-point-burnt-village-park': {
    putIn: {
      name: "Prince's Point Wildlife Area / County D boat landing",
      latitude: 42.8941667,
      longitude: -88.7010972,
    },
    takeOut: {
      name: 'Burnt Village Park / County Highway N launch',
      latitude: 42.9147222,
      longitude: -88.7792528,
    },
    logistics: {
      distanceLabel: '7.4 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr',
      shuttle:
        "Use a short rural car shuttle between the County D landing at Prince's Point Wildlife Area and Burnt Village Park on County Highway N. Wisconsin River Trips reports a manageable bike shuttle, but staging vehicles is simpler.",
      permits:
        'No route-specific paddling permit is known. Follow Wisconsin DNR wildlife-area rules at Princes Point and posted Jefferson County park rules at Burnt Village.',
      camping:
        'No on-route camping is documented for this marsh-and-floodplain day route. Treat it as a day paddle.',
      summary:
        "Launch from the Wisconsin DNR County D boat landing at Prince's Point Wildlife Area and finish at Burnt Village Park. This lower Bark reach is mostly slow flatwater through floodplain woods and marsh, with the strongest scenery near the put-in.",
      accessCaveats: [
        'Wisconsin DNR warns that weather, local water levels, and county road closures may affect Princes Point parking-lot availability.',
        'Jefferson County lists Burnt Village Park as prone to flooding, so check both the Rome gauge and current park conditions before staging a vehicle there.',
        'Much of the middle route borders private land. Stay in the public waterway corridor and do not use private banks as casual stops.',
      ],
      watchFor: [
        "A possible hop-over logjam just downstream from Prince's Point.",
        'Slow open-marsh miles with little current, especially near the final approach to Burnt Village.',
        'Flooded woods, hidden banks, motorboat traffic, carp activity, and cold-water exposure outside summer.',
      ],
    },
  },
  'pecatonica-river-black-bridge-wells': {
    putIn: {
      name: 'Black Bridge Landing',
      latitude: 42.68601091,
      longitude: -90.12030611,
    },
    takeOut: {
      name: 'Wells Landing / Walnut Road',
      latitude: 42.6424164,
      longitude: -90.03988431,
    },
    logistics: {
      distanceLabel: '12.3 mi',
      estimatedPaddleTime: 'About 4 hr 30 min to 6 hr',
      shuttle:
        'Use a two-car shuttle between Black Bridge Park in Darlington and Wells Landing on Walnut Road. The bike shuttle can use portions of the Cheese Country Trail, but trail passes, ATV traffic, and surface conditions make a vehicle shuttle simpler.',
      permits:
        'No route-specific paddling permit is known. Follow posted Darlington park rules at Black Bridge Park and any Lafayette County or local landing rules at Wells Landing.',
      camping:
        'Treat this as a day route. Darlington has camping upstream at Pecatonica River Trails Park, but no legal overnight stop was confirmed between Black Bridge Landing and Wells Landing.',
      summary:
        'Launch at Black Bridge Landing, the city improved Pecatonica boat launch in Darlington, then paddle the town riffles and rural lower-Pecatonica bends to Wells Landing on Walnut Road. The longer distance and muddy banks make this a planned day trip rather than a quick float.',
      accessCaveats: [
        'Lafayette County publishes both landing coordinates, but Wells Landing can be muddy after high water and may require a messy carry from the ramp area.',
        'Black Bridge Landing is the cleaner public start; avoid substituting the steeper Roller Coaster Road bridge unless you have scouted it first.',
        'The route has steep muddy banks and private farmland edges, so emergency exits may be awkward even though the river itself is generally gentle.',
      ],
      watchFor: [
        'Partial logjams and strainers on the Darlington-to-Roller-Coaster-Road section.',
        'High, muddy water and shoreside strainers above about 291 cfs on the Darlington gauge.',
        'Cold-water exposure in spring and fall, plus ATV traffic if using the Cheese Country Trail for shuttle.',
      ],
    },
  },
  'kickapoo-river-ontario-rockton': {
    putIn: {
      name: 'Village of Ontario Public Canoe Landing',
      latitude: 43.72300847,
      longitude: -90.58704745,
    },
    takeOut: {
      name: 'Kickapoo River Landing 12 (Rockton)',
      latitude: 43.6370798,
      longitude: -90.60288277,
    },
    logistics: {
      distanceLabel: '12.5 mi',
      estimatedPaddleTime: 'About 4 hr 15 min to 5 hr 45 min',
      shuttle:
        'Two-car shuttle is standard between Ontario and Rockton. Both endpoints appear in the Wisconsin DNR boat-access inventory, but it is still worth confirming parking and landing rules before you leave a vehicle.',
      permits:
        'Kickapoo Valley Reserve requires a day-use, annual, camping, or vehicle-parking permit for vehicles left at Landing 12. Standard Wisconsin paddling rules otherwise apply.',
      camping:
        'Camping was not confirmed for this exact reach during the route audit. Treat it as a day trip unless you independently confirm a legal overnight option.',
      summary:
        'Put in at the Village of Ontario public canoe landing and take out at Landing 12 near Rockton. This is a classic Driftless day with riffles and occasional Class I, but it becomes a scrape-heavy grind quickly if you launch below the published low-water floor.',
      accessCaveats: [
        'Both landings are publicly managed carry-in accesses, and Landing 12 is clearly under Kickapoo Valley Reserve management rather than a vague roadside take-out.',
        'Use current KVR maps and permit guidance before leaving a vehicle at Landing 12, because that matters more here than on a casual town-park shuttle.',
        'This is a longer shuttle than the seed-set average, so settle pickup timing before you put on.',
      ],
      watchFor: [
        'Frequent scraping and dragging through shallow riffles below about 60 cfs on the Ontario gauge.',
        'Flash-flood potential and pushier Class I water after storms or rising upstream readings.',
        'Strainers, sweepers, and cold-water exposure outside midsummer.',
      ],
    },
  },
  'kickapoo-river-rockton-la-farge': {
    putIn: {
      name: 'Kickapoo River Landing 12 (Rockton)',
      latitude: 43.6371,
      longitude: -90.60292,
    },
    takeOut: {
      name: 'Landing 20 / La Farge Canoe Landing',
      latitude: 43.57481,
      longitude: -90.6437,
    },
    logistics: {
      distanceLabel: '10 mi',
      estimatedPaddleTime: 'About 3 hr 45 min to 5 hr',
      shuttle:
        'Use a two-car shuttle from Landing 12 near Rockton to Landing 20 in La Farge. Outfitters commonly serve the Ontario-to-La Farge corridor, but confirm pickup rules if you are not using your own vehicle shuttle.',
      permits:
        'Kickapoo Valley Reserve requires a day-use, annual, camping, or vehicle-parking permit for vehicles left at Landing 12. The La Farge take-out is outside the Reserve boundary in MilesPaddled notes, but still confirm posted rules before leaving a vehicle.',
      camping:
        'KVR has designated campsites elsewhere in the reserve, but this route should be treated as a day trip unless you reserve or confirm a legal campsite in advance.',
      summary:
        'Launch at Landing 12 in Rockton and finish at Landing 20 in La Farge for the second classic upper-Kickapoo day. The route has fewer access points than Ontario-to-Rockton, but it keeps the sandstone scenery, riffles, and bridge-number navigation.',
      accessCaveats: [
        'Landing 12 is a KVR managed carry-in access with permit requirements and limited space, so do not treat it like an unregulated roadside shoulder.',
        'Landing 20 can be less obvious from the road than from the river; MilesPaddled describes it as tucked back through a field approach near Bridge 20.',
        'The route has one practical intermediate public landing at Landing 14 / County Highway P, so plan the shuttle and bailout options before launching.',
      ],
      watchFor: [
        'Scraping and dragging if the La Farge gauge is well below the 60 cfs scrape-free guidance.',
        'Flash-flooding and pushy current after storms; KVR explicitly warns the Kickapoo can rise quickly.',
        'Strainers, snags, cold-water exposure, and a reported tree hazard in the riffles below Bridge 19.',
      ],
    },
  },
  'upper-iowa-river-trout-run-lower-dam': {
    putIn: {
      name: 'Trout Run Park (Decorah)',
      latitude: 43.29095,
      longitude: -91.75879,
    },
    takeOut: {
      name: 'Lower Dam access',
      latitude: 43.34052,
      longitude: -91.64307,
    },
    logistics: {
      distanceLabel: '13 mi',
      estimatedPaddleTime: 'About 4 hr 15 min to 6 hr',
      shuttle:
        'Expect about a 9.7-mile vehicle or bike shuttle. Miles Paddled treats this as a real full-day reach, so set the pickup plan and turnaround time before launching.',
      permits:
        'No permit is noted for standard day paddling. Follow city-park rules at Trout Run and any posted county or state access rules at Lower Dam.',
      camping:
        'No developed on-route camping is documented for this segment. Plan lodging or camping separately rather than assuming a legal overnight stop.',
      summary:
        'Launch at Trout Run Park and finish at the Lower Dam access below Decorah. This is a scenic beginner-friendly Upper Iowa day, but the 13-mile length, low-water scraping risk, and the marked dam portage still make it a real commitment.',
      accessCaveats: [
        'Decorah park materials show canoe access in the Trout Run corridor, but the park is still big enough that you should locate the launch before unloading.',
        'Iowa DNR treats Lower Dam as a real public access, but it is still more primitive than the city-side put-in and deserves a same-day look.',
        'Treat this as a full-day shuttle-and-portage plan, not a casual quick float.',
      ],
      watchFor: [
        'Heavy scraping in riffles below about 150 cfs at the Decorah gauge.',
        'Dam safety and the marked carry around the Upper Dam, roughly a 600-foot portage.',
        'Strainers, logjams, long-day fatigue, and cold water outside midsummer.',
      ],
    },
  },
  'cannon-river-faribault-dundas': {
    putIn: {
      name: 'Two Rivers Park canoe landing',
      latitude: 44.31067,
      longitude: -93.27087,
    },
    takeOut: {
      name: 'Highway 1 Canoe Landing (Dundas)',
      latitude: 44.43033,
      longitude: -93.20531,
    },
    logistics: {
      distanceLabel: '13.75 mi',
      estimatedPaddleTime: 'About 4 hr 30 min to 6 hr 15 min',
      shuttle:
        'Car shuttle is simplest. A bike shuttle is possible when trail conditions line up, but confirm routing before you commit to highway shoulders.',
      permits:
        'No route-specific paddling permit is known. Follow posted parking or landing rules at Two Rivers Park and the Highway 1 landing.',
      camping:
        'Treat this as a day trip unless you have already confirmed a legal overnight option elsewhere on the Cannon corridor.',
      summary:
        'Launch at Two Rivers Park in Faribault and finish at the Highway 1 Canoe Landing in Dundas. The reach is friendly at workable flow, but it is long enough that low-water riffles and post-rain debris still change the decision.',
      accessCaveats: [
        'The Two Rivers landing is more hidden and less polished than the park lot suggests, so walk it before unloading boats.',
        'The Highway 1 take-out below the bridge is marked but easy to miss from upstream if you have not looked at it first.',
        'Parking at the Dundas take-out is limited, so settle the shuttle plan before launching.',
      ],
      watchFor: [
        'Low-water riffles and occasional scraping near the floor.',
        'Snags, log piles, and fresh debris after higher water.',
        'Longer-mileage fatigue on hot or windy days.',
      ],
    },
  },
  'milwaukee-river-west-bend-quaas-creek': {
    putIn: {
      name: 'Washington Street Dam launch (south of Hwy 33)',
      latitude: 43.42833,
      longitude: -88.18399,
    },
    takeOut: {
      name: 'Quaas Creek Park canoe/kayak launch',
      latitude: 43.41636,
      longitude: -88.14629,
    },
    logistics: {
      distanceLabel: '3.9 mi',
      estimatedPaddleTime: 'About 1.5 hr to 2.5 hr',
      shuttle:
        'The standard shuttle is about 3.5 miles. Wisconsin River Trips says it works especially well as a short bike-and-paddle combo using city trails, but a simple car shuttle is easier for most groups.',
      permits:
        'No route-specific paddling permit is known. Follow posted city park, trail, and parking rules at the Washington Street dam area and Quaas Creek Park.',
      camping:
        'No on-route camping is documented for this short urban day trip. Treat it as a day paddle.',
      summary:
        'Launch south of the Washington Street dam in West Bend and finish at Quaas Creek Park. This is a short but lively Milwaukee River run with downtown riffles, a restored-prairie middle stretch, and a cleaner route-specific gauge story than most upper-Milwaukee prospects.',
      accessCaveats: [
        'The put-in is a public launch area below the dam rather than a large formal boat ramp, so scout the shoreline and current before unloading.',
        'Quaas Creek Park has multiple access points; Wisconsin River Trips used the south access, which involves a longer carry but cleaner official parking.',
        'If you shorten the trip to Riverside Park, you keep most of the best current but end up with a very short paddle.',
      ],
      watchFor: [
        'Many Class I riffles through downtown West Bend and a stronger rapid below Indiana Avenue that can feel Class II at higher water.',
        'A strainer-choked right channel at the island below the railroad bridge; stay left there.',
        'Fast current, shoreline strainers in high water, and cold-water consequences outside warm weather.',
      ],
    },
  },
  'milwaukee-river-newburg-fredonia': {
    putIn: {
      name: "Fireman's Park (Newburg)",
      latitude: 43.43373,
      longitude: -88.04926,
    },
    takeOut: {
      name: 'Waubedonia Park (Fredonia)',
      latitude: 43.46838,
      longitude: -87.97313,
    },
    logistics: {
      distanceLabel: '11 mi',
      estimatedPaddleTime: 'About 3 hr 45 min to 5 hr',
      shuttle:
        'The standard shuttle is a little over 6 road miles. Car shuttle is simplest, though a bike shuttle is workable if your group wants it.',
      permits:
        'No route-specific permit is identified. Follow posted park and parking rules at Fireman\'s Park and Waubedonia Park.',
      camping:
        'Waubedonia Park has seasonal camping by reservation. Otherwise treat this as a day trip.',
      summary:
        'Put in at Fireman\'s Park in Newburg and take out at Waubedonia Park in Fredonia. This is a flow-sensitive easy river where being clearly above the low-water floor matters more than hunting for a perfect sweet spot.',
      accessCaveats: [
        'The Fireman\'s Park parking lot sits on the opposite side of the bridge from the river access, so expect a short carry along the paved path and under the bridge.',
        'Waubedonia is the cleaner endpoint and has an official launch, but still confirm park hours and parking rules before leaving a vehicle.',
      ],
      watchFor: [
        'Scraping or short wades when Cedarburg drops toward the minimum floor.',
        'Mild riffles and shallow gravel runs that still need boat control.',
        'Fresh wood after storms and cold water outside summer.',
      ],
    },
  },
  'milwaukee-river-lime-kiln-village-park': {
    putIn: {
      name: 'Lime Kiln Park canoe ramp',
      latitude: 43.30534,
      longitude: -87.95358,
    },
    takeOut: {
      name: 'Village Park boat launch (Thiensville)',
      latitude: 43.23164,
      longitude: -87.97648,
    },
    logistics: {
      distanceLabel: '8.75 mi',
      estimatedPaddleTime: 'About 2 hr 30 min to 4 hr',
      shuttle:
        'Plan a straightforward two-car shuttle of roughly 6 miles. A bike shuttle is possible on local roads and trail links, but a car shuttle is simpler for most groups.',
      permits:
        'No route-specific permit is identified. Follow posted park, launch, and parking rules at Lime Kiln Park and Thiensville Village Park.',
      camping:
        'No on-route camping is expected for this suburban Milwaukee River segment. Treat it as a day trip.',
      summary:
        'Put in at Lime Kiln Park in Grafton and take out at Thiensville Village Park. This is one of the more interesting lower-Milwaukee day trips because the upper mile is genuinely lively before the river widens and slows.',
      accessCaveats: [
        'Lime Kiln Park is an official canoe-ramp access with multiple parking lots, but the exact launch line still deserves a quick scout because paddlers can choose between a calmer dock launch and a more direct upper launch near the opening features.',
        'Village Park is the correct official Thiensville take-out. The old Villa Grove naming from the carried-over draft was weaker than the current village boating and park pages.',
      ],
      watchFor: [
        'A quick opening decision around the island at Lime Kiln Park, with riffles on one side and a Class I ledge/drop on the other.',
        'Shallow gravel runs and extra scraping if Cedarburg falls back toward the floor.',
        'More development, slower current, and occasional powerboat traffic in the lower half approaching Thiensville.',
      ],
    },
  },
  'milwaukee-river-waubedonia-veterans': {
    putIn: {
      name: 'Waubedonia Park (Fredonia)',
      latitude: 43.46838,
      longitude: -87.97317,
    },
    takeOut: {
      name: 'Veterans Memorial Park (Grafton)',
      latitude: 43.32211,
      longitude: -87.94948,
    },
    logistics: {
      distanceLabel: '13.25 mi',
      estimatedPaddleTime: 'About 4 hr 30 min to 6 hr',
      shuttle:
        'Plan a straightforward two-car shuttle of roughly 12 road miles. A bike shuttle is possible, but it is long enough that most groups will prefer the simpler car setup.',
      permits:
        'No route-specific permit is identified. Follow posted park, launch, and parking rules at Waubedonia Park and Veterans Memorial Park.',
      camping:
        'Waubedonia Park offers seasonal rustic camping by reservation. Otherwise treat this as a day trip with no assumed legal riverbank camping.',
      summary:
        'Start at Waubedonia Park and finish at Veterans Memorial Park for a longer lower-Milwaukee day with a mix of light rapids up top and slower suburban river miles near Grafton.',
      accessCaveats: [
        'Waubedonia is a clean county-park launch, and the county says the park is open to day visitors from 6 a.m. to 9 p.m., but campground activity and event use can still change how easy the parking feels.',
        'Veterans Memorial Park is a village launch with adjacent parking rather than a large isolated landing, so expect more neighborhood context and less room to spread out gear.',
        'This route is long enough that a slightly too-low river can quietly turn into a slow frustrating day, so do not treat the gauge as an afterthought.',
      ],
      watchFor: [
        'Scraping or shallow riffles when Cedarburg falls toward the floor.',
        'One ledge-like upper-river feature plus scattered light rapids that deserve a quick look if levels are high.',
        'Murky faster current after rain and boat traffic closer to Grafton.',
      ],
    },
  },
  'wapsipinicon-river-state-park-newport-mills': {
    putIn: {
      name: 'Wapsipinicon State Park boat launch',
      latitude: 42.09819,
      longitude: -91.28755,
    },
    takeOut: {
      name: 'Newport Mills Access',
      latitude: 42.04515,
      longitude: -91.20014,
    },
    logistics: {
      distanceLabel: '9 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr',
      shuttle:
        'Plan an 11.5-mile vehicle shuttle. Bike shuttle is possible, but it mixes gravel roads with a short highway shoulder section.',
      permits:
        'No route-specific paddling permit is known. Follow Iowa DNR and county access rules at both endpoints.',
      camping:
        'Treat this as a day trip unless you have already confirmed a legal overnight plan and sandbar conditions.',
      summary:
        'Start at the Wapsipinicon State Park launch near Anamosa and take out at Newport Mills Access. The main quality call is low water: below the Anamosa floor, expect repeated scraping in riffles.',
      accessCaveats: [
        'The state-park launch sits close enough to the Anamosa dam that you should scout the launch area and keep all dam awareness fresh before unloading.',
        'Newport Mills is a simple rural access, so confirm parking condition and turnaround space before committing to the shuttle.',
      ],
      watchFor: [
        'Frequent scraping below about 4.77 ft at Anamosa.',
        'Riffles around bridge remnants and rock outcrops.',
        'Wind on the wider bends and fresh strainers after storms.',
      ],
    },
  },
  'peshtigo-river-ccc-burnt-bridge': {
    putIn: {
      name: 'CCC Bridge / Forest Road 2131 access',
      latitude: 45.61092,
      longitude: -88.59312,
    },
    takeOut: {
      name: 'Burnt Bridge Landing / Forest Road 2134',
      latitude: 45.56208,
      longitude: -88.4953,
    },
    logistics: {
      distanceLabel: '9.2 to 9.25 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr, plus scouting or portage time if wood is present',
      shuttle:
        'Use a remote national-forest shuttle between CCC Bridge on Forest Road 2131 / Peshtigo River Road and Burnt Bridge Landing on Forest Road 2134 / Michigan Creek Road. Expect gravel roads; low-clearance vehicles and bike shuttles need extra planning.',
      permits:
        'No route-specific paddling permit is known. Follow Chequamegon-Nicolet National Forest rules and posted parking, camping, and landing guidance at both forest-road access points.',
      camping:
        'Wisconsin Trail Guide notes two rustic canoe/kayak campsites at Burnt Bridge Landing, one on each side of the river, available first-come, first-served. Confirm current forest rules before relying on them for an overnight.',
      summary:
        'Launch at CCC Bridge and take out at Burnt Bridge Landing for the P2 Peshtigo forest run. The day mixes quiet remote water with repeated Class I-II boulder gardens and the longer Preserve Rapids section.',
      accessCaveats: [
        'Both endpoints are remote forest-road landings rather than full-service parks; check road condition, parking room, and cell coverage before committing to the shuttle.',
        'Miles Paddled reports ample room at both landings and an easy downstream river-right take-out at Burnt Bridge with railroad-tie steps, but access conditions can change after storms or forest-road maintenance.',
        'Do not use this route as a substitute for the easier upper P1 section after major blowdowns; current wood conditions should be checked locally before launching.',
      ],
      watchFor: [
        'Camp 12, Little Camp 12, Coldwater, Preserve, Smiley, and Big Rock rapids, with Class I-II boulder gardens and constricted current.',
        'Scrapier rocks below 5.0 ft and pushier, less novice-friendly rapids above 6.5 ft on the Wabeno gauge.',
        'Strainers, deadfall, possible near-river-wide wood, cold water, and long stretches with limited road access.',
        'The Wabeno gauge is about 26 miles downstream, so pair the gauge with recent rainfall, trend, and visual checks at the put-in.',
      ],
    },
  },
  'peshtigo-river-goodman-park-farm-dam': {
    putIn: {
      name: 'Goodman Park Access',
      latitude: 45.51799,
      longitude: -88.33935,
    },
    takeOut: {
      name: 'Farm Dam Public Landing',
      latitude: 45.41351,
      longitude: -88.34615,
    },
    logistics: {
      distanceLabel: '9.8 mi',
      estimatedPaddleTime: 'About 4 hr to 5 hr',
      shuttle:
        'Use a County C / Goodman Park Road shuttle between Goodman Park and Farm Dam Public Landing. McClintock Park sits mid-route and can work as a planned rest stop or conservative shorter option.',
      permits:
        'No route-specific paddling permit is known. Goodman and McClintock are Marinette County parks with day-use or camping rules, and Farm Dam sits in the state-forest / WPS landing corridor; follow posted access and fee requirements.',
      camping:
        'Goodman Park and McClintock Park both have reservable county campgrounds near the river. Treat river camping elsewhere as unconfirmed unless a land manager separately approves it.',
      summary:
        'Launch below Strong Falls at Goodman Park Access and take out at Farm Dam Public Landing. This is the scenic P4 Peshtigo run, mostly wooded flatwater and riffles with Skinners Elbow and Wilson Rapids adding Class I-II / II boat-control work.',
      accessCaveats: [
        'Goodman Park Access is a hand-carry beach launch below Strong Falls; use the main park lot and trail to the river, and expect any posted county park fee.',
        'Farm Dam has separate public and commercial outfitter landings. Use the northern public landing on Otter Creek rather than the commercial outfitter landing downstream.',
        'The stronger Roaring Rapids route starts below Farm Dam; do not continue downstream unless your group intentionally planned the more serious whitewater section.',
      ],
      watchFor: [
        'Skinners Elbow and Wilson Rapids, which become stronger and wavier as the County C gauge rises.',
        'Scrapier riffles below 5.0 ft and increasingly pushy Class II water above 6.5 ft.',
        'Deadfall, strainers, cold water, and limited road exits through wooded bends.',
        'Strong Falls is upstream of the launch; scout park paths and stay clear of falls current while staging boats.',
      ],
    },
  },
  'peshtigo-river-roaring-rapids': {
    putIn: {
      name: 'Farm Dam Public Landing',
      latitude: 45.41351,
      longitude: -88.34615,
    },
    takeOut: {
      name: 'WPS Landing #12',
      latitude: 45.38092,
      longitude: -88.30101,
    },
    logistics: {
      distanceLabel: '5.2 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr depending on scouting, level, and group size',
      shuttle:
        'Use a short County C corridor shuttle between Farm Dam Public Landing and WPS Landing #12. Local outfitters also run guided rafting trips and shuttles in this corridor.',
      permits:
        'No route-specific paddling permit is known. Follow Governor Earl Peshtigo River State Forest rules, posted landing rules, and any outfitter requirements if using a guided trip.',
      camping:
        'Treat this as a day run unless you have separately reserved or confirmed legal state-forest camping. Overnight island camping is not allowed except at designated campsites.',
      summary:
        'Put in at Farm Dam Public Landing and take out at WPS Landing #12 for the Roaring Rapids section of the Peshtigo. This is a compact but serious whitewater route, with the USGS County C gauge inside the run.',
      accessCaveats: [
        'Wisconsin Trail Guide notes that Farm Dam has separate commercial and public landings; use the northern public landing on Otter Creek.',
        'WPS Landing #12 is a large developed state-forest landing maintained by Wisconsin Public Service, with parking, trailer turnaround, trailer parking, water, and pit toilets.',
        'This route is for skilled whitewater paddlers or guided rafting groups. Casual rec boats should not treat it as a normal river float.',
      ],
      watchFor: [
        'Continuous class II-IV rapids, including First Drop, Third Drop, Five Foot Falls, Horserace, and S-Curve.',
        'Sticky holes, ledges, boulder gardens, shallow rocky swim zones, and much stronger hydraulics as the County C gauge rises.',
        'Rapid level changes after rain, cold water, remote-feeling banks, and the need to scout and portage features that exceed your group skills.',
      ],
    },
  },
  'eau-claire-river-bear-lake-county-n': {
    putIn: {
      name: 'Bear Lake Road Bridge Landing',
      latitude: 45.0586,
      longitude: -89.27024,
    },
    takeOut: {
      name: 'County N Bridge Landing',
      latitude: 44.94419,
      longitude: -89.41916,
    },
    logistics: {
      distanceLabel: '13.9 mi',
      estimatedPaddleTime: 'Long day, about 6 hr to 8 hr with scouting and portage time',
      shuttle:
        'Plan a rural two-car shuttle between Bear Lake Road and County N. The route passes Dells of the Eau Claire County Park, so some groups may stage food, scouting, or an alternate plan there.',
      permits:
        'No route-specific paddling permit is known. Follow posted rules at bridge landings, Dells of the Eau Claire County Park, and any portage or parking areas.',
      camping:
        'Dells of the Eau Claire County Park has a family campground near the middle of the segment, but do not assume a riverbank overnight. Reserve or confirm camping separately before planning this as more than a day run.',
      summary:
        'Launch at Bear Lake Road Bridge Landing and take out at County N Bridge Landing for Wisconsin Trail Guide EC1. This is a long whitewater day with the Dells of the Eau Claire in the middle and the Kelly USGS gauge downstream.',
      accessCaveats: [
        'Bear Lake Road is a hand-carry bridge landing with roadside parking, not a large developed ramp.',
        'County N Bridge Landing is a hand-carry take-out on river right above the bridge with parking west of the bridge.',
        'The USGS Kelly gauge is downstream of the route, so recent local rain, falling or rising trends, and visual scouting matter more than the number alone.',
      ],
      watchFor: [
        'Class II-III rapids, boulder gardens, and scratchy ledges when the river is low.',
        'The Eau Claire Dells class IV feature; most full-route paddlers should portage at the county park unless they have appropriate whitewater skill.',
        'Powerful hydraulics above about 2,000 cfs, possible debris or downed trees after storms, cold water, and a long shuttle with limited quick exits.',
      ],
    },
  },
  'bois-brule-river-stones-winneboujou': {
    putIn: {
      name: "Stone's Bridge Landing",
      latitude: 46.43415,
      longitude: -91.67486,
    },
    takeOut: {
      name: 'Winneboujou Landing',
      latitude: 46.5133,
      longitude: -91.6022,
    },
    logistics: {
      distanceLabel: '9.3 to 9.6 mi',
      estimatedPaddleTime: 'About 4 hr to 5 hr, depending on level and stops',
      shuttle:
        'Use a vehicle shuttle between Stone’s Bridge on County Highway S and Winneboujou near County B. Local liveries commonly service this corridor during the paddling season.',
      permits:
        'No route-specific paddling permit is known, but Wisconsin DNR river rules apply: use designated landings only, carry wearable PFDs, secure containers and trash, and follow posted state-forest rules.',
      camping:
        'Camping is allowed only at state-designated campgrounds. Treat Stone’s Bridge to Winneboujou as a day trip unless you have a separate legal campground plan.',
      summary:
        'Launch at Stone’s Bridge Landing and take out at Winneboujou Landing for the classic upper Bois Brule day. It is the friendlier Brule run, with clear water, wooded corridors, mostly class I rapids, and a shorter commitment than continuing to Bois Brule Landing, but low water and strainers can still change the trip.',
      accessCaveats: [
        'Wisconsin DNR requires launching and landing only at allowed designated canoe landings on the Brule.',
        'Stone’s Bridge is a developed landing with parking, pit toilets, water, and trailer turnaround according to Wisconsin Trail Guide.',
        'Winneboujou is a hand-carry landing with parking, pit toilets, water, and trailer turnaround according to Wisconsin Trail Guide.',
      ],
      watchFor: [
        'Bony rapids below about 200 cfs and paddling not recommended below 125 cfs.',
        'Falls Rapids, Big Twin, Wildcat, Station, and other class I features; scout or portage anything that exceeds group comfort.',
        'Strainers, fallen trees, cold spring-fed water, and faster constricted current as flows rise.',
      ],
    },
  },
  'bois-brule-river-bois-brule-pine-tree': {
    putIn: {
      name: 'Bois Brule Landing / Bois Brule Campground canoe landing',
      latitude: 46.54042,
      longitude: -91.59408,
    },
    takeOut: {
      name: 'Pine Tree Landing',
      latitude: 46.61545,
      longitude: -91.58264,
    },
    logistics: {
      distanceLabel: '10.3 mi',
      estimatedPaddleTime: 'About 4 hr to 5 hr',
      shuttle:
        'Use a two-car state-forest shuttle from the Bois Brule campground landing on South Ranger Road to Pine Tree Landing at the end of Dead End Road off County Highway H. Highway 2 Landing can work as a shorter midpoint option if the full route is too long.',
      permits:
        'No route-specific paddling permit is known, but Wisconsin DNR Brule River rules apply: launch and land only at designated canoe landings, carry wearable PFDs, secure containers and trash, and follow posted state-forest rules.',
      camping:
        'Bois Brule Campground is at the put-in and Copper Range Campground is just upstream of Pine Tree Landing. Camping is allowed only at state-designated campgrounds, so reserve or confirm campground plans separately.',
      summary:
        'Launch at Bois Brule Landing and take out at Pine Tree Landing for Wisconsin Trail Guide BB2. The route links the campground landing, Highway 2 Landing, the Meadows, Co-Op Park Rapids, Copper Range Campground, and the upper Pine Tree approach into one clear-water Brule day.',
      accessCaveats: [
        'Bois Brule Landing is a developed state-forest campground landing with a gravel ramp, parking, pit toilets, picnic area, and drinking water according to Wisconsin Trail Guide.',
        'Pine Tree Landing is a hand-carry state-forest landing with parking, trailer turnaround, and pit toilets at the end of a gravel drive.',
        'Wisconsin DNR requires paddlers on the Brule to use allowed designated landings only, so do not improvise alternate exits on private or angler-only access points.',
      ],
      watchFor: [
        'Doodlebug Rapids, Co-Op Park Rapids, and additional class I pitches below East Park Road.',
        'Bony riffles and rapids below about 200 cfs, with paddling not recommended below 125 cfs.',
        'Fallen trees, strainers along bends and constricted channels, cold spring-fed water, and faster current above about 600 cfs.',
      ],
    },
  },
  'bois-brule-river-pine-tree-highway-13': {
    putIn: {
      name: 'Pine Tree Landing',
      latitude: 46.61545,
      longitude: -91.58264,
    },
    takeOut: {
      name: 'Highway 13 Canoe Landing',
      latitude: 46.67776,
      longitude: -91.59553,
    },
    logistics: {
      distanceLabel: '8.4 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr, or about 5 hr by DNR landing-to-landing timing',
      shuttle:
        'Use a two-car shuttle between Pine Tree Landing at the end of Dead End Road off County Highway H and Highway 13 Canoe Landing east of the Highway 13 bridge. Both are designated Brule River State Forest canoe landings.',
      permits:
        'No route-specific paddling permit is known, but Wisconsin DNR Brule River rules apply: launch and land only at designated canoe landings, carry wearable PFDs, secure containers and trash, and follow posted state-forest rules.',
      camping:
        'Camping is allowed only at state-designated campgrounds. Copper Range Campground is upstream of the put-in, but this route itself should be planned as a day trip unless you have a legal campground reservation or plan.',
      summary:
        'Launch at Pine Tree Landing for the Bois Brule BB3 whitewater segment and finish at Highway 13 Canoe Landing. Expect near-continuous riffles and rapids, with Lenroot Ledges and Mays Ledges as the key scout-or-portage features.',
      accessCaveats: [
        'Pine Tree Landing is a hand-carry state-forest landing with parking, trailer turn-around, and pit toilets at the end of Dead End Road. Confirm road and seasonal access before committing to the shuttle.',
        'Highway 13 Canoe Landing is a hand-carry landing on river right near the end of Highway 13 Rapids, with parking, trailer turn-around, pit toilets, and potable water.',
        'Wisconsin DNR requires paddlers on the Brule to use allowed designated landings only, so do not improvise alternate exits on private or angler-only access points.',
      ],
      watchFor: [
        'Lenroot Ledges, a long Class II ledge sequence that can get shallow and bumpy at low water and faster at higher flows.',
        'Mays Ledges, the most challenging whitewater on this segment; scout or portage from river right if there is any doubt.',
        'Fallen trees, strainers along banks, bony rapids below about 200 cfs, fast constrictions above about 600 cfs, and cold spring-fed water.',
      ],
    },
  },
  'bois-brule-river-highway-13-mouth': {
    putIn: {
      name: 'Highway 13 Canoe Landing',
      latitude: 46.67795948,
      longitude: -91.59535953,
    },
    takeOut: {
      name: 'Bois Brule River -- Mouth Access',
      latitude: 46.74768874,
      longitude: -91.61055237,
    },
    logistics: {
      distanceLabel: '8.2 mi',
      estimatedPaddleTime: 'About 4 hr, longer with the lamprey-barrier portage and Lake Superior wind',
      shuttle:
        'Use a two-car shuttle between the state-managed Highway 13 Canoe Landing and the designated Mouth Access near Lake Superior. The lower landing is remote; confirm the road, parking, and lake/wind conditions before launching.',
      permits:
        'No route-specific paddling permit is known, but Wisconsin DNR Brule River rules apply: launch and land only at designated canoe landings, carry wearable PFDs, secure containers and trash, and follow posted state-forest rules.',
      camping:
        'Camping is allowed only at state-designated campgrounds. Treat Highway 13 to the mouth as a day trip unless you have a separate legal campground plan.',
      summary:
        'Launch at Highway 13 Canoe Landing and take out at the Bois Brule mouth landing on Lake Superior. This lower Brule route is scenic and mostly Class I, but it has a mandatory portage at the lamprey barrier and a cold-water finish where Lake Superior wind and waves can matter.',
      accessCaveats: [
        'Highway 13 Canoe Landing is a DNR-managed carry-in with parking, a gravel access road, vault restroom, and potable water, but no boarding dock.',
        'The Mouth Access is a designated DNR-listed landing; inspect it before the shuttle because the finish is near Lake Superior and conditions can feel different from inland river landings.',
        'Wisconsin DNR requires paddlers on the Brule to use allowed designated landings only, so do not improvise alternate exits on private or angler-only access points.',
      ],
      watchFor: [
        'The sea lamprey barrier about 2 miles below Highway 13; warning buoys and signs mark the approach, and paddlers must portage on river right.',
        'Class I riffles including Shale Falls, shallow bony ledges below about 200 cfs, and deadfall around islands and bends.',
        'Cold water, rapid lower-river rises after rain or snowmelt, and wind or waves near the Lake Superior mouth.',
      ],
    },
  },
  'crow-wing-river-little-white-dog-carry-in-cottingham-county-park': {
    putIn: {
      name: 'Little White Dog County Park #9 carry-in access',
      latitude: 46.58698,
      longitude: -94.82262,
    },
    takeOut: {
      name: 'Cottingham County Park #11 carry-in access',
      latitude: 46.5044417,
      longitude: -94.8107221,
    },
    logistics: {
      distanceLabel: '9.8 river mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr 30 min',
      shuttle:
        'Standard Wadena County self-shuttle. Confirm the Cottingham parking and camping setup before leaving a vehicle, especially if you are pairing the paddle with an overnight.',
      permits:
        'No special paddling permit is known for this Minnesota DNR water-trail route. County campground fees or rules may apply if you camp.',
      camping:
        'MN DNR identifies primitive camping/rest-area context at both Little White Dog and Cottingham. Confirm current Wadena County rules, fees, and seasonal availability before planning an overnight.',
      summary:
        'Launch at Little White Dog and finish at Cottingham County Park for the DNR-recommended Crow Wing day trip. The river character is friendly, but use the Nimrod gauge to avoid a scrape-heavy or high-water day.',
      accessCaveats: [
        'Both endpoints are named by MN DNR and backed by Wadena County campground/access pages, but saved coordinates should still defer to on-site signage.',
        'Cottingham and Little White Dog are county campground/access sites, so parking, camping, fees, and seasonal details should be checked before the shuttle.',
      ],
      watchFor: [
        'Exposed sandbars and slower travel when the Nimrod gauge falls below the medium band.',
        'Fresh wood, strainers, and debris after high water.',
        'Tubing traffic on popular summer weekends in the lower part of the route.',
      ],
    },
  },
  'menomonee-river-hoyt-park-bluemound': {
    putIn: {
      name: 'Hoyt Park / TOSA Pool river access',
      latitude: 43.05436,
      longitude: -88.02431,
    },
    takeOut: {
      name: 'Bluemound Road / Wisconsin Avenue Menomonee River access',
      latitude: 43.03572,
      longitude: -87.96231,
    },
    logistics: {
      distanceLabel: '4.1 mi',
      estimatedPaddleTime: 'About 1.5 hr to 2.5 hr, longer if scouting or portaging',
      shuttle:
        'Short urban vehicle shuttle. A bike shuttle can work because Milwaukee County and Oak Leaf Trail corridors parallel pieces of the route, but traffic and parking logistics deserve planning.',
      permits:
        'No route-specific paddling permit is known. Follow posted Hoyt Park, Wauwatosa, Milwaukee County, and City of Milwaukee parking/access rules.',
      camping:
        'No on-route camping. Treat this as a short urban day run only.',
      summary:
        'Put in at Hoyt Park in Wauwatosa and take out near the Bluemound/Wisconsin Avenue access in the Menomonee Valley. The route is short but busy: shallow bedrock, class I-II rapids, one stronger ledge, strainers, walls, and urban water-quality cautions all matter.',
      accessCaveats: [
        'Hoyt Park is a public park, but the exact river access is informal enough that parking, carry distance, and posted rules should be checked before unloading.',
        'The downstream access is an urban bridge/valley access, not a polished rural landing. Wisconsin River Trips describes it as public space but not yet a completed ramp, so confirm the exit, parking legality, and construction closures before you launch.',
        'Do not extend downstream into industrial or harbor sections unless you have a separate route plan and confirmed take-out.',
      ],
      watchFor: [
        'Class I-II rapids plus a stronger scoutable ledge near the railroad/Wisconsin Avenue corridor.',
        'Strainers, walls, sharp rocks, bridge remnants, and fast current pushing into obstacles.',
        'Flashy post-rain rises, MMSD overflow context, and urban water-quality issues. Avoid this route during or shortly after heavy rain.',
      ],
    },
  },
  'kinnickinnic-river-glen-park-state-park': {
    putIn: {
      name: 'Glen Park (River Falls)',
      latitude: 44.85075,
      longitude: -92.63882,
    },
    takeOut: {
      name: 'St. Croix River beach / concrete take-out at Kinnickinnic State Park',
      latitude: 44.83254,
      longitude: -92.76374,
    },
    logistics: {
      distanceLabel: '10 mi',
      estimatedPaddleTime: 'About 3 hr 15 min to 4 hr 30 min',
      shuttle:
        'Car shuttle is simplest. The road shuttle is about 10.5 miles, and the state-park finish is much easier if you bring a boat cart for the carry out.',
      permits:
        'If you park inside Kinnickinnic State Park, expect Wisconsin state-park admission rules to apply. Follow posted rules at both Glen Park and the park take-out.',
      camping:
        'Camping is available at Kinnickinnic State Park by reservation, but this route is best treated as a hard day trip unless you already have a campsite plan.',
      summary:
        'Put in below the second River Falls dam at Glen Park and finish at the state-park beach where the Kinnickinnic meets the St. Croix. This is a beautiful but committed swiftwater day, not a casual scenic float.',
      accessCaveats: [
        'The Glen Park launch is reached by a footpath and staircase down the bluff, not by a polished ramp, so expect a real carry to the river.',
        'The official state-park take-out is followed by a steep carry back up to the main parking area. Bring a cart or plan for the climb before you launch.',
      ],
      watchFor: [
        'Scraping and boat abuse below about 175 cfs at River Falls.',
        'Continuous riffles and class II features for miles below the put-in.',
        'Anglers, strainers after storms, and cold water outside peak summer.',
      ],
    },
  },
  'pomme-de-terre-river-larson-appleton': {
    putIn: {
      name: 'Larson Landing public water access',
      latitude: 45.239322,
      longitude: -95.98509,
    },
    takeOut: {
      name: 'Appleton public water access',
      latitude: 45.203137,
      longitude: -96.020898,
    },
    logistics: {
      distanceLabel: '6 mi',
      estimatedPaddleTime: 'About 2 hr to 3 hr',
      shuttle:
        'Short Appleton-area car shuttle. This is an easy logistics day, so most groups will just stage the take-out first and keep it simple.',
      permits:
        'No special paddling permit is known. Follow posted public-water-access and local parking rules at both landings.',
      camping:
        'Treat this as a day trip unless you separately confirm legal overnight options nearby.',
      summary:
        'Launch at Larson Landing and finish at Appleton for the clearest short beginner trip on the lower Pomme de Terre. The gauge decision is straightforward, but low water, wood, and wind can still change the feel of the day.',
      accessCaveats: [
        'Both endpoints are backed by Minnesota public-water-access records, which is the main trust reason this route clears the bar cleanly.',
        'Appleton is the stronger landmarked finish because the live gauge and route town line up there, but same-day landing and parking signage should still win over any saved note.',
      ],
      watchFor: [
        'Dragging and scrape-heavy shallow spots when Appleton drops toward 3.5 ft.',
        'Fresh wood or strainers after storms or fast rises.',
        'Wind exposure on the more open lower-river bends approaching Appleton.',
      ],
    },
  },
  'long-prairie-river-long-prairie-browerville': {
    putIn: {
      name: 'Long Prairie public water access',
      latitude: 45.975537,
      longitude: -94.865877,
    },
    takeOut: {
      name: 'Browerville public water access',
      latitude: 46.076399,
      longitude: -94.858487,
    },
    logistics: {
      distanceLabel: '13.3 mi',
      estimatedPaddleTime: 'About 4 hr 30 min to 6 hr 30 min',
      shuttle:
        'Simple two-town car shuttle on local roads. Most groups should look at the Browerville exit first, leave a car there, and keep the rest of the day uncomplicated.',
      permits:
        'No special paddling permit is known. Follow posted public-water-access and local parking rules at both city carry-ins.',
      camping:
        'Treat this as a day trip unless you separately confirm legal camping nearby.',
      summary:
        'Launch in Long Prairie and finish in Browerville for a full meandering day between two clear city accesses. Gauge level is the main call; low summer water and fresh wood are the main quality changers.',
      accessCaveats: [
        'Both endpoints are backed by Minnesota public-water-access records, which is the key reason this route clears the endpoint bar cleanly.',
        'These are carry-in city accesses rather than deluxe ramp facilities, so verify parking layout and carry path on arrival instead of assuming the shoreline setup from a map pin alone.',
      ],
      watchFor: [
        'Dragging and scrape-heavy shallow spots when Long Prairie drops toward 53 cfs.',
        'Tight bends, fresh wood, and blind-corner strainers after storms or fast rises.',
        'A longer full-day pace than the shorter beginner routes in the app, especially if the current is soft.',
      ],
    },
  },
  'wisconsin-river-muscoda-blue-river': {
    putIn: {
      name: 'Riverside Park / Muscoda west-side landing',
      latitude: 43.1962605,
      longitude: -90.4357156,
    },
    takeOut: {
      name: 'Blue River Landing',
      latitude: 43.2067548,
      longitude: -90.5663182,
    },
    logistics: {
      distanceLabel: '8 mi',
      estimatedPaddleTime: 'About 2 hr to 3 hr, longer with sandbar stops',
      shuttle:
        'Short Lower Wisconsin vehicle shuttle between Muscoda and Blue River. Local outfitters may support this corridor in season, but a two-car shuttle is the simplest self-supported plan.',
      permits:
        'No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules, posted landing rules, and current Wisconsin DNR guidance for glass, trash, and riverway conduct.',
      camping:
        'Wisconsin DNR allows camping on state-owned Lower Wisconsin islands and sandbars for up to three days when you arrive by watercraft, with no camping permit required. This short segment is still easiest as a day trip unless your group has checked current water levels, rules, trash-container requirements, and sandbar availability.',
      summary:
        'Launch at the Muscoda/Riverside Park corridor and take out at Blue River Landing. This is a short easy Lower Wisconsin day with sandbars and island channels when the Muscoda gauge is in the normal summer range.',
      accessCaveats: [
        'Both endpoints are listed by Wisconsin DNR as major public access points on the Lower Wisconsin State Riverway.',
        'Sandbars and channels change. Pick landings and break spots based on current water, not old satellite imagery.',
      ],
      watchFor: [
        'Shallow pushing and main-channel picking below normal summer flows.',
        'Undercurrents, fewer sandbars, and poor camping options as flows rise above the normal band, especially around 17,000 cfs and higher.',
        'Wind, powerboats, and surprise drop-offs along sandbar edges.',
      ],
    },
  },
  'wisconsin-river-blue-river-boscobel': {
    putIn: {
      name: 'Blue River Landing',
      latitude: 43.2067548,
      longitude: -90.5663182,
    },
    takeOut: {
      name: 'Boscobel Landing / Floyd Von Haden Boat Landing',
      latitude: 43.1492722,
      longitude: -90.715253,
    },
    logistics: {
      distanceLabel: '10 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr, longer with sandbar stops',
      shuttle:
        'Plan a vehicle shuttle between Blue River and Boscobel. The route is straightforward by road, but confirm current landing parking and any local construction before leaving a vehicle.',
      permits:
        'No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules and posted landing guidance.',
      camping:
        'Wisconsin DNR allows camping on state-owned Lower Wisconsin islands and sandbars for up to three days when you arrive by watercraft, with no camping permit required. For this route, treat overnight plans as level-dependent and avoid high-water sandbars.',
      summary:
        'Put in at Blue River Landing and finish at Boscobel. This is an easy Lower Wisconsin day through islands, sandbars, and bluff country when the Muscoda gauge is in the normal summer range.',
      accessCaveats: [
        'Both Blue River and Boscobel are Wisconsin DNR-listed Lower Wisconsin State Riverway access points.',
        'Boscobel has multiple landing references in public map data; use current signage and the intended river landing rather than assuming any nearby ramp is the correct take-out.',
      ],
      watchFor: [
        'Changing side channels around islands and strainers in narrow cuts.',
        'Steep drop-offs and strong current around sandbars.',
        'High water that removes sandbars and turns a mellow day into a stronger-current trip, especially around 17,000 cfs and higher.',
      ],
    },
  },
  'wisconsin-river-gotham-muscoda-west': {
    putIn: {
      name: 'Gotham / Buena Vista Boat Landing',
      latitude: 43.20903,
      longitude: -90.30424,
    },
    takeOut: {
      name: 'Muscoda Landing West',
      latitude: 43.198,
      longitude: -90.44576,
    },
    logistics: {
      distanceLabel: '7.9 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr, longer with sandbar stops',
      shuttle:
        'Use a Lower Wisconsin vehicle shuttle between Buena Vista Landing at Gotham and Muscoda Landing West off West River Road. The road shuttle is straightforward but rural; confirm the intended west-side Muscoda landing before leaving a vehicle.',
      permits:
        'No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules, posted landing rules, PFD requirements, and current Wisconsin DNR guidance for glass, trash, and riverway conduct.',
      camping:
        'Wisconsin DNR allows camping on state-owned Lower Wisconsin islands and sandbars for up to three days when you arrive by watercraft, with no camping permit required. For this short route, treat overnight plans as level-dependent and avoid high-water sandbars.',
      summary:
        'Launch at Gotham / Buena Vista Boat Landing near the Pine River mouth and finish at Muscoda Landing West just downstream of the Highway 80 bridge. This is a short Lower Wisconsin day with big sandbars, bluff views, side-channel exploration, and a direct Muscoda gauge.',
      accessCaveats: [
        'Wisconsin DNR lists Buena Vista Boat Landing and Muscoda west-side access as major public access points on the Lower Wisconsin State Riverway.',
        'Wisconsin River Trips notes that Gotham is a good public access but has no outhouse, prohibits overnight parking, and has poison ivy around the landing.',
        'Muscoda has multiple landings. This route uses Muscoda Landing West / Old Muscoda Landing on West River Road, not the newer Victoria Riverside Park motorboat ramp upstream.',
      ],
      watchFor: [
        'Fast main-channel current at Gotham and around sandbars.',
        'Strainers along eroding banks and in narrow side channels, especially when higher water opens smaller cuts.',
        'Undercurrents, fewer sandbars, and poor camping options above the normal range, especially around 17,000 cfs and higher.',
        'Wind, powerboats near Muscoda, poison ivy at access points, and steep sandbar drop-offs.',
      ],
    },
  },
  'wisconsin-river-portage-dekorra': {
    putIn: {
      name: 'Highway 33 bridge carry-in (Portage)',
      latitude: 43.535,
      longitude: -89.464,
    },
    takeOut: {
      name: 'Dekorra Park landing',
      latitude: 43.3868,
      longitude: -89.5142,
    },
    logistics: {
      distanceLabel: '7.8 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr',
      shuttle:
        'Use a two-car shuttle between the Highway 33 bridge area and Dekorra Park. Confirm legal parking and carry routes at both ends because this route is sourced from a trip report rather than a formal DNR water-trail landing list.',
      permits:
        'No route-specific paddling permit is known. Follow posted Portage, Columbia County, and Dekorra Park rules.',
      camping:
        'Treat this as a day trip. Do not assume sandbar camping is legal or practical on this reach without separate confirmation.',
      summary:
        'Launch near the Highway 33 bridge at Portage and finish at Dekorra Park. Expect big-river current, large islands, sandbars at moderate flows, and side-channel choices rather than technical rapids.',
      accessCaveats: [
        'The Highway 33 put-in is backed by a Recreation.gov/BLM page describing a Wisconsin DNR carry-in boat launch just before the Highway 33 river crossing, but parking and bank conditions still deserve a same-day check.',
        'The route passes near levee and power-plant infrastructure; keep the trip to the documented reach and avoid trespass or restricted areas.',
      ],
      watchFor: [
        'Shallow side channels below normal summer water.',
        'Fewer sandbars and faster push above the normal range.',
        'Wind exposure, powerboats, and confusing island channels.',
      ],
    },
  },
  'baraboo-river-wayside-kalepp': {
    putIn: {
      name: 'Wayside Park (Baraboo River / 400 State Trail)',
      latitude: 43.6462,
      longitude: -90.2223,
    },
    takeOut: {
      name: 'Kalepp Road / 400 State Trail Baraboo River access',
      latitude: 43.6206,
      longitude: -90.1531,
    },
    logistics: {
      distanceLabel: '4.6 mi',
      estimatedPaddleTime: 'About 2 hr to 3 hr',
      shuttle:
        'Short rural shuttle between Wayside Park and Kalepp Road. The 400 State Trail corridor can help with orientation, but a two-car shuttle is simplest.',
      permits:
        'No route-specific paddling permit is known. Check Wayside Park, DNR parking, and 400 State Trail signage before leaving vehicles.',
      camping: 'No on-route camping documented. Treat this as a short day trip.',
      summary:
        'Put in at Wayside Park near Wonewoc and take out near Kalepp Road. This is a short scenic Baraboo River segment with sandstone outcrops, but muddy banks, strainers, and changing wood make it a moderate route.',
      accessCaveats: [
        'Wayside Park is a public park/rest area, but the water entry is not a polished boat ramp.',
        'The Kalepp Road exit uses a side-creek/400 State Trail corridor described by Wisconsin River Trips; verify same-day access and avoid private land.',
      ],
      watchFor: [
        'Downed trees and strainers in deep, muddy, fast water.',
        'Steep muddy banks that can make portages harder than they look.',
        'Pushy, dirty water above the target stage range.',
      ],
    },
  },
  'wisconsin-river-sauk-city-arena': {
    putIn: {
      name: 'Sauk Canoe Access',
      latitude: 43.2566,
      longitude: -89.742,
    },
    takeOut: {
      name: 'Arena Landing',
      latitude: 43.1867782,
      longitude: -89.9016376,
    },
    logistics: {
      distanceLabel: '11 mi',
      estimatedPaddleTime: 'About 3.5 hr to 4.5 hr, longer with sandbar stops',
      shuttle:
        'Use a vehicle shuttle between Sauk City and Arena. This is a common outfitter corridor, but self-supported groups should still confirm landing parking before leaving vehicles.',
      permits:
        'No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules, posted landing rules, and Wisconsin boating/PFD requirements.',
      camping:
        'Sandbar camping is possible at suitable flows under Lower Wisconsin State Riverway rules, but this route is also a normal day trip. Avoid overnight plans at high water or when sandbars are scarce.',
      summary:
        'Launch from the Sauk City/Sauk Prairie landing corridor and take out at Arena Landing. This is one of the classic upper Lower Wisconsin day trips, with broad sandbars and easy current in the normal summer gauge window.',
      accessCaveats: [
        'Wisconsin DNR lists both the Sauk/Prairie du Sac corridor and Arena among major public access points for the Lower Wisconsin State Riverway; the saved put-in is the Sauk Canoe Access point used by Lower Wisconsin paddling guides.',
        'Paddling.com describes the Sauk Canoe Access as having a large parking lot and sandy carry, but warns the river-side access can be easy to miss from the water.',
        'The Lower Wisconsin has many optional landings, but this route is scored specifically for Sauk City to Arena so distance and shuttle timing stay honest.',
      ],
      watchFor: [
        'Crowded summer weekends and outfitter traffic.',
        'Hidden current and sudden sandbar drop-offs, especially when wading.',
        'High water that reduces sandbars and opens faster side channels with strainers.',
      ],
    },
  },
  'wisconsin-river-arena-spring-green': {
    putIn: {
      name: 'Arena Landing',
      latitude: 43.1867782,
      longitude: -89.9016376,
    },
    takeOut: {
      name: 'Peck’s Landing / Spring Green Highway 23 landing',
      latitude: 43.1462917,
      longitude: -90.0602028,
    },
    logistics: {
      distanceLabel: '10 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr, longer with sandbar stops',
      shuttle:
        'Use a vehicle shuttle between Arena and Peck’s Landing near the Highway 23 bridge. Local outfitters commonly service this corridor during the paddling season.',
      permits:
        'No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules and posted landing guidance.',
      camping:
        'Possible as part of a relaxed sandbar outing when levels are suitable, but this app entry is framed as a day route. Do not count on sandbar camping when flows are high.',
      summary:
        'Put in at Arena and take out at Peck’s Landing near Spring Green. This is a popular Lower Wisconsin sandbar day route with easy current, broad channels, and a straightforward shuttle.',
      accessCaveats: [
        'Arena and Peck’s Landing are well-known riverway landings, but same-day parking, crowding, and outfitter traffic can affect launch logistics.',
        'Peck’s Landing is near the Highway 23 bridge; use current landing signage rather than stopping at informal riverbank pull-offs.',
      ],
      watchFor: [
        'Busy landings and sandbars during warm weekends.',
        'Changing channels around sandbars and wooded islands.',
        'Fast hidden current and drop-offs even when the surface looks calm.',
      ],
    },
  },
  'wisconsin-river-spring-green-muscoda': {
    putIn: {
      name: 'Peck’s Landing / Spring Green Highway 23 landing',
      latitude: 43.1462917,
      longitude: -90.0602028,
    },
    takeOut: {
      name: 'Riverside Park / Muscoda west-side landing',
      latitude: 43.1962605,
      longitude: -90.4357156,
    },
    logistics: {
      distanceLabel: '22 mi',
      estimatedPaddleTime: 'About 6 hr to 8 hr, or split as an overnight',
      shuttle:
        'Longer Lower Wisconsin shuttle between Spring Green and Muscoda. Plan pickup timing carefully, especially if wind, sandbar stops, or an overnight plan could slow the group.',
      permits:
        'No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules, posted landing rules, and current camping/trash/PFD guidance.',
      camping:
        'This is a natural overnight-capable reach at suitable flows. Wisconsin DNR allows camping on state-owned islands and sandbars for up to three days when arriving by watercraft, with no permit required, but high water can remove safe sandbars.',
      summary:
        'Launch at Peck’s Landing near Spring Green and finish at Muscoda. The river remains flatwater, but the 22-mile length makes this a full-day or overnight planning route rather than a casual short float.',
      accessCaveats: [
        'Use this as a specific scored route even though many intermediate landings exist; combining it with shorter routes would hide the full-day commitment.',
        'Confirm overnight rules, water levels, weather, and shuttle timing before launching late in the day.',
      ],
      watchFor: [
        'Fatigue, heat, wind, and storms over a long broad-river route.',
        'Unexpected upstream rain-driven rises during overnight plans.',
        'Sandbar drop-offs, hidden current, and side-channel strainers.',
      ],
    },
  },
  'wisconsin-river-wisconsin-rapids-nepco-creek': {
    putIn: {
      name: 'Veterans Memorial Park kayak/canoe launch',
      latitude: 44.3922,
      longitude: -89.8269,
    },
    takeOut: {
      name: 'Nepco Creek / County Z access',
      latitude: 44.3377,
      longitude: -89.8439,
    },
    logistics: {
      distanceLabel: '6.3 mi',
      estimatedPaddleTime: 'About 3 hr on the water, plus dam-portage time',
      shuttle:
        'Use a short city-to-Port-Edwards car shuttle from Veterans Memorial Park in Wisconsin Rapids to the County Z parking area by Nepco Creek. A bike shuttle is realistic for some groups, but kayak wheels matter more because the route has long dam portages.',
      permits:
        'No route-specific paddling permit is known. Follow posted City of Wisconsin Rapids park rules at Veterans Memorial Park, obey all dam warning lines and portage signs, and use the Nepco Creek / County Z access without blocking the road or trail.',
      camping:
        'No on-route camping is documented. Treat this as a day route with enough daylight reserved for Centralia and Port Edwards dam portages.',
      summary:
        'Launch from the Veterans Memorial Park kayak/canoe launch below the Wisconsin Rapids dam, then paddle through island channels and portage around the Centralia and Port Edwards dams before finishing at Nepco Creek / County Z. Low to average water exposes granite bedrock and boulder fields; high water turns the lower rapids and dam outflows into a much more serious trip.',
      accessCaveats: [
        'Veterans Memorial Park is a public city park with a kayak/canoe launch, but Wisconsin River Trips notes the river access uses steep stairs and an awkward railing for kayaks.',
        'The Centralia Dam portage is roughly 1000 feet on the east bank and uses a golf-course-edge path with stairs near the reentry.',
        'The Port Edwards Dam portage can be about 2500 feet on the east bank unless low water allows a shorter legal carry near the overflow-gate area; confirm conditions before relying on the shorter option.',
        'The Nepco Creek take-out is easy to miss. Wisconsin River Trips recommends paddling a short distance up Nepco Creek to shorten the carry to County Z.',
      ],
      watchFor: [
        'Dam warning lines, overflow gates, recirculating current, and fast powerhouse outflow below Wisconsin Rapids, Centralia, and Port Edwards.',
        'Grignon Rapids and lower boulder-garden current, which are Class I-II at lower water and can become Class II-III in high water.',
        'Wind on impounded pools, submerged bedrock, shallow boulder gardens, and a long day if portages run slowly.',
        'Sharp gauge changes; Wisconsin River Trips specifically warns that the Wisconsin can rise or fall quickly and that forecast graphs matter before committing.',
      ],
    },
  },
  'wisconsin-river-muscoda-woodman': {
    putIn: {
      name: 'Muscoda Landing West',
      latitude: 43.198,
      longitude: -90.44576,
    },
    takeOut: {
      name: 'Woodman Landing',
      latitude: 43.07699,
      longitude: -90.84597,
    },
    logistics: {
      distanceLabel: '24.5 mi',
      estimatedPaddleTime: 'Full day or multi-day trip; about 8 hr to 12+ hr depending on stops and wind',
      shuttle:
        'Plan a long two-car Lower Wisconsin shuttle from Muscoda to Woodman. Intermediate landings at Port Andrew, Blue River, and Boscobel can shorten the day if weather, daylight, or group pace changes.',
      permits:
        'No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules, posted landing rules, boating safety requirements, and current camping/trash guidance.',
      camping:
        'Sandbar camping can work at low to moderate flows, but Wisconsin Trail Guide warns that sandbars shrink or disappear as flows rise. Do not plan an overnight when the Muscoda gauge is in the high-water bands.',
      summary:
        'Launch at Muscoda Landing West and paddle the LWSR3 corridor past island braids, Blue River, Boscobel, and wooded lower-river bluffs before taking out up the Big Green River at Woodman Landing.',
      accessCaveats: [
        'Wisconsin Trail Guide lists Muscoda Landing West as a developed ramp with trailer turnaround and parking, reached from West River Road west of Highway 80.',
        'Woodman Landing is a short distance up the Big Green River / Little Green River confluence area from the Wisconsin River; do not miss the turn near Highway 133.',
        'The route is intentionally scored as one long route even though Port Andrew, Blue River, and Boscobel are viable bailout or shorter-route landings.',
      ],
      watchFor: [
        'Long-distance fatigue, storms, heat, broad-river wind, and limited quick exits late in the route.',
        'Side-channel strainers around Columbe Island, Allen Island, Gillis Island, and other wooded island forks.',
        'Steep sandbar drop-offs and strong current, especially in the lee of islands and sandbars.',
        'High-water undercurrents and reduced sandbar camping when the Muscoda gauge rises above the normal range.',
      ],
    },
  },
  'wisconsin-river-boscobel-bridgeport': {
    putIn: {
      name: 'Boscobel Landing / Floyd Von Haden Boat Landing',
      latitude: 43.1492722,
      longitude: -90.715253,
    },
    takeOut: {
      name: 'Bridgeport Landing / Highway 18 bridge access',
      latitude: 43.0239,
      longitude: -91.0877,
    },
    logistics: {
      distanceLabel: '23 mi',
      estimatedPaddleTime: 'About 6 hr to 8 hr, or split as an overnight',
      shuttle:
        'Long lower-river shuttle from Boscobel to Bridgeport. Plan vehicle logistics before launching; there are fewer easy bailout options than on the busier Sauk-to-Spring Green corridor.',
      permits:
        'No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules, posted landing rules, and current camping/trash/PFD guidance.',
      camping:
        'Overnight sandbar camping may be practical at suitable flows, but use current DNR rules and avoid high-water sandbars. The route is long enough that a late start can force an unplanned overnight.',
      summary:
        'Put in at Boscobel and take out at Bridgeport near the Highway 18 bridge. This is a quieter lower-river commitment with flatwater, wooded islands, sloughs, and fewer crowds than upstream segments.',
      accessCaveats: [
        'Wisconsin DNR lists Boscobel and Bridgeport among major Lower Wisconsin access points, but Bridgeport has multiple nearby landing references; confirm the intended take-out and current road/parking conditions.',
        'The route is scored separately from Blue River-to-Boscobel because the 23-mile length and lower-river isolation change the decision.',
      ],
      watchFor: [
        'Long-distance fatigue and weather exposure.',
        'Broad lower-river wind, slough choices, and wooded island strainers.',
        'High-water hidden current and reduced sandbar availability.',
      ],
    },
  },
  'wisconsin-river-millville-wyalusing-beach': {
    putIn: {
      name: 'Millville Boat Landing',
      latitude: 43.03505,
      longitude: -90.96091,
    },
    takeOut: {
      name: 'Wyalusing Beach / Wyalusing Boat Landing',
      latitude: 42.94815,
      longitude: -91.14397,
    },
    logistics: {
      distanceLabel: '10.8 mi',
      estimatedPaddleTime: 'About 5 hr to 6 hr depending on wind and the Mississippi finish',
      shuttle:
        'Plan a two-car shuttle between Millville Boat Landing and the Wyalusing Beach / boat landing area off Highway X. The road shuttle is hillier than the river profile suggests, so confirm staging before launching.',
      permits:
        'No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules upstream, Wyalusing-area landing rules at the take-out, and all Mississippi River boating requirements.',
      camping:
        'Treat this app entry as a full-day route. Sandbar camping upstream may be possible under Lower Wisconsin rules at suitable flows, but the Wyalusing Beach finish and Mississippi confluence should be planned as a take-out, not an improvised campsite.',
      summary:
        'Launch at Millville Boat Landing and finish at Wyalusing Beach after the Wisconsin River meets the Mississippi. The route has classic lower-river islands and bluff views, then a more exposed final approach with deeper water and boat traffic.',
      accessCaveats: [
        'Wisconsin Trail Guide maps Millville Landing as a developed public landing with parking, ramp, pier, picnic area, and pit toilets.',
        'Wyalusing Beach is supported by Wisconsin DNR and Grant County public recreation references, with the saved take-out coordinate tied to the named Wyalusing Boat Landing / beach map feature rather than a DNR-published coordinate table.',
        'Do not confuse the Wyalusing Beach / recreation-area take-out with the Wyalusing State Park boat landing farther north unless you intentionally change the route and shuttle.',
      ],
      watchFor: [
        'Wind, wakes, and recreational boat traffic after entering the Mississippi River.',
        'Confluence navigation around islands, sandbars, and the main Mississippi channel.',
        'Shoreline strainers, hidden current, and sandbar drop-offs on the final Lower Wisconsin miles.',
        'Few sandbars, dirtier water, and pushier current above the normal lower-river range.',
      ],
    },
  },
  'wisconsin-river-dekorra-camp-rest': {
    putIn: {
      name: 'Dekorra Park / Main Street access',
      latitude: 43.3868,
      longitude: -89.5142,
    },
    takeOut: {
      name: 'Camp Rest Park',
      latitude: 43.4158187,
      longitude: -89.5287319,
    },
    logistics: {
      distanceLabel: '5.1 mi',
      estimatedPaddleTime: 'About 2 hr to 3 hr, longer if exploring back channels',
      shuttle:
        'Short road shuttle between Dekorra Park and Camp Rest Park. A bike shuttle may work for some groups, but traffic and parking should be checked before committing.',
      permits:
        'No route-specific paddling permit is known. Follow Town of Dekorra park rules and posted boat-launch or parking restrictions.',
      camping:
        'No on-route camping assumed. Treat this as a short day trip and avoid informal island camping unless independently confirmed legal and appropriate.',
      summary:
        'Launch at Dekorra Park and finish at Camp Rest Park. This keeps the most interesting part of the Dekorra route, including back channels, sandbars, islands, and sandstone outcrops, while avoiding the rough open-water finish to James Whalen.',
      accessCaveats: [
        'Dekorra Park and Camp Rest Park are Town of Dekorra public recreation facilities, but boat traffic and local launch etiquette matter.',
        'Do not continue into the Lake Wisconsin-style open-water section unless wind, waves, boat traffic, and the take-out plan are all acceptable.',
      ],
      watchFor: [
        'Motorboat and jet-ski wakes, especially near the main channel and sandstone walls.',
        'Wind and whitecaps if you continue beyond Camp Rest toward Lake Wisconsin.',
        'Undertows, drop-offs, poison ivy on islands, and shoreline strainers during high water.',
      ],
    },
  },
  'vermilion-river-schoepfle-mill-hollow': {
    putIn: {
      name: 'Birmingham Community Center / Schoepfle Garden river access',
      latitude: 41.326667,
      longitude: -82.357333,
    },
    takeOut: {
      name: 'Mill Hollow / Vermilion River Reservation',
      latitude: 41.381833,
      longitude: -82.3155,
    },
    logistics: {
      distanceLabel: '8.1 mi',
      estimatedPaddleTime: 'About 3 hr to 4.5 hr depending on stage and scouting',
      shuttle:
        'Use a two-car shuttle between Birmingham / Schoepfle Garden and Mill Hollow. Confirm current park access and parking before staging because the put-in is tied to the Birmingham public-access context rather than a polished boat ramp.',
      permits:
        'No route-specific paddling permit is known. Follow Lorain County Metro Parks, ODNR water-trail, and posted local access rules at both ends.',
      camping:
        'Treat this as a day trip. No on-route camping is assumed for the Schoepfle Garden to Mill Hollow run.',
      summary:
        'Launch from the Birmingham / Schoepfle Garden access context and take out at Mill Hollow in Vermilion River Reservation. American Whitewater documents this as an 8.1-mile middle Vermilion run with mostly Class I water and a couple light Class II sections.',
      accessCaveats: [
        'ODNR publishes Schoepfle Garden / Birmingham coordinates for the Vermilion River access area, but the exact riverbank launch should be confirmed on arrival with local signage and current park rules.',
        'Mill Hollow is an official Vermilion River Reservation / water-trail access area, but shoreline conditions can change after high water.',
        'Do not continue downstream into the lower Vermilion or Lake Erie unless you have a separate open-water and take-out plan.',
      ],
      watchFor: [
        'Low, scrapable water below the AW runnable floor and during dry summer spells.',
        'Light Class II riffles after the SR 113 crossing and before Dean Hollow Bridge when the river is in the preferred stage range.',
        'Wood, strainers, fast rises after rain, and stronger current or bridge hazards at high water.',
      ],
    },
  },
  'grand-river-harpersfield-hidden-valley': {
    putIn: {
      name: 'Harpersfield Covered Bridge access',
      latitude: 41.75649,
      longitude: -80.946408,
    },
    takeOut: {
      name: 'Hidden Valley Park paddle access',
      latitude: 41.741864,
      longitude: -81.047837,
    },
    logistics: {
      distanceLabel: '8.4 mi',
      estimatedPaddleTime: 'About 3 hr to 5 hr depending on level and stops',
      shuttle:
        'Use a two-car shuttle from Harpersfield Covered Bridge to Hidden Valley Park. Lake Metroparks lists both as Grand River Water Trail paddle accesses with short carries from drop-off to water.',
      permits:
        'No route-specific day paddling permit is known. Follow Lake Metroparks, Ashtabula Metroparks, and posted access rules; reserve campsites separately if using any water-trail camping.',
      camping:
        'Treat this app entry as a day route. Nearby water-trail campsites exist elsewhere on the corridor, but camping requires separate planning and reservation.',
      summary:
        'Put in below Harpersfield Covered Bridge and take out at Hidden Valley Park. This keeps the route to the AW-documented 8.4-mile Class I-II reach and the Lake Metroparks water-trail access pair.',
      accessCaveats: [
        'The Harpersfield put-in is just below the covered bridge and ledge/play-spot area; scout the launch and current before committing.',
        'Hidden Valley Park is a public paddle access, but use the signed access and current park parking rules rather than informal banks.',
        'The downstream Grand River corridor has additional accesses, but continuing past Hidden Valley changes the mileage, hazards, and shuttle plan.',
      ],
      watchFor: [
        'Harpersfield ledge/drop features and standing waves, especially once levels rise above the easy end of the gauge band.',
        'Large wave trains and stronger eddy lines above the AW 1500 cfs intermediate-skills threshold.',
        'Wood, fast current, cold water in shoulder seasons, and floodplain closure risk during high or rising water.',
      ],
    },
  },
  'great-miami-river-heritage-dravo': {
    putIn: {
      name: 'Heritage Park canoe ramp',
      latitude: 39.291548,
      longitude: -84.661803,
    },
    takeOut: {
      name: 'Obergiesing Soccer Complex at Dravo Park canoe ramp',
      latitude: 39.26157,
      longitude: -84.68773,
    },
    logistics: {
      distanceLabel: '6.1 mi by AW route listing; Colerain describes the ramps as just over 4 nautical miles apart',
      estimatedPaddleTime: 'Roughly 1.5 hr to 3.5 hr for skilled groups, depending heavily on flow and play stops',
      shuttle:
        'Use a short two-car shuttle between Heritage Park and Obergiesing Soccer Complex at Dravo Park. Many whitewater boaters shorten the flatwater by using Blue Rock Road instead, but this V2 route keeps the official Colerain ramp-to-ramp pairing.',
      permits:
        'No route-specific paddling permit is known. Follow Colerain Township park hours and posted ramp rules at both parks.',
      camping:
        'No on-route camping assumed. Treat this as a short whitewater-training day run.',
      summary:
        'Launch from the Heritage Park canoe ramp and take out at the Dravo Park canoe ramp. American Whitewater documents the Heritage/Blue Rock to Dravo reach as a dependable Cincinnati-area training run with Class I-II features and serious wood/strainer caveats.',
      accessCaveats: [
        'The official sources found in this pass confirm named canoe ramps and addresses, but not ramp-level GIS coordinates; verify exact ramp locations on arrival.',
        'Blue Rock Road is a common alternate whitewater put-in that skips the first couple miles, but parking and access should be independently confirmed before using it instead of Heritage Park.',
        'At low levels the Dravo take-out can require following a maze of water, tree branches, and gravel-island channels to reach the ramp.',
      ],
      watchFor: [
        'Denny\'s Run strainers, wrapped-boat history, and rescues; scout or avoid if wood is present.',
        'Pushy current, strong eddylines, wave trains, and whirlpools as flow rises into the 3500-to-5000 cfs range.',
        'Floating wood and debris around 8000 cfs and after storms; this should be treated as stay-off water.',
        'This is not a casual recreational-kayak recommendation even when the gauge is in range.',
      ],
    },
  },
  'little-miami-river-kelley-milford': {
    putIn: {
      name: 'Kelley Nature Preserve canoe/kayak access',
      latitude: 39.20997,
      longitude: -84.30608,
    },
    takeOut: {
      name: 'Jim Terrell Park canoe launch',
      latitude: 39.17041,
      longitude: -84.29856,
    },
    logistics: {
      distanceLabel: '4.9 mi',
      estimatedPaddleTime: 'About 1.5 hr to 3 hr depending on level, play stops, and wind',
      shuttle:
        'Use a short two-car shuttle between Kelley Nature Preserve and Jim Terrell Park in Milford. The route can be extended downstream, but this entry ends at the AW-listed Milford take-out.',
      permits:
        'No route-specific paddling permit is known. Follow Clermont County Parks, Milford, ODNR scenic-river, and posted access rules.',
      camping:
        'No on-route camping assumed. Treat this as a short day route.',
      summary:
        'Launch at Kelley Nature Preserve and take out at Jim Terrell Park. This follows the AW Kelley-to-Milford reach and the ODNR Little Miami Scenic River access sequence.',
      accessCaveats: [
        'Kelley Nature Preserve is an official park access with a canoe/kayak launch, but parking can fill on busy warm weekends.',
        'Jim Terrell Park is the planned take-out; continuing below Milford changes the route and adds more access planning.',
        'The app score is calibrated to AW Class I-II feature levels, not to minimum-depth commercial tubing or livery-style floating.',
      ],
      watchFor: [
        'Boathouse Rapid, old low-head-dam remnants, shallow ledges, small holes, and possible rebar/manmade-structure hazards.',
        'Low-water walking in shallows below the AW floor and washed-out, pushier conditions above the preferred range.',
        'Strainers, floating debris after rain, and cold-water risk outside warm months.',
      ],
    },
  },
  'cuyahoga-river-ira-lock-29': {
    putIn: {
      name: 'Ira Road / Ira Trailhead put-in corridor',
      latitude: 41.184583,
      longitude: -81.58335,
    },
    takeOut: {
      name: 'Lock 29 Trailhead river access / Route 303',
      latitude: 41.2428,
      longitude: -81.55067,
    },
    logistics: {
      distanceLabel: '6.9 mi',
      estimatedPaddleTime: 'About 2.5 hr to 4 hr depending on level, scouting, and flatwater pace',
      shuttle:
        'Use a short Cuyahoga Valley shuttle between Ira Trailhead and Lock 29 Trailhead in Peninsula. A bike shuttle on the Towpath Trail is practical for some groups, but keep bikes and boats clear of busy trail traffic.',
      permits:
        'No route-specific paddling permit is known. Follow Cuyahoga Valley National Park, Cuyahoga River Water Trail, parking, and posted access rules.',
      camping:
        'No on-route camping assumed. Treat this as a day run through Cuyahoga Valley National Park.',
      summary:
        'Launch from the Ira Road / Ira Trailhead corridor and take out at the official Lock 29 river access near Route 303 in Peninsula. This matches the AW Ira-to-303 reach while using the official Peninsula access for the take-out.',
      accessCaveats: [
        'AW identifies the Ira Road put-in and nearby Towpath Trail parking, but the exact riverbank launch is less developed than Lock 29; verify the legal and practical path to the water on arrival.',
        'Lock 29 is the official Cuyahoga River Water Trail access at Route 303. Portage left around the upstream waterfall/dam-remnant area if approaching from above.',
        'Do not continue downstream into later Cuyahoga Valley sections without checking current NPS closures, wood reports, and separate gauge assumptions.',
      ],
      watchFor: [
        'Strainers and fresh wood, especially after storms and on blind bends.',
        'Poor or variable urban river water quality; avoid after heavy rain or sewage/water-quality alerts.',
        'Training/play features, shallow attainments, and changing difficulty as the Old Portage gauge rises through the AW range.',
        'Busy Towpath and Lock 29 parking areas during peak park hours.',
      ],
    },
  },
  'la-crosse-river-veterans-holiday-heights': {
    putIn: {
      name: 'Veterans Memorial Campground canoe landing',
      latitude: 43.891232,
      longitude: -91.116408,
    },
    takeOut: {
      name: 'Holiday Heights Park / Holiday Heights Landing',
      latitude: 43.86201,
      longitude: -91.20178,
    },
    logistics: {
      distanceLabel: '8.6 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr',
      shuttle:
        'Use a westbound car shuttle from Veterans Memorial Campground near West Salem to Holiday Heights Park in Onalaska. A bike shuttle can use the La Crosse River State Trail for much of the return, but trail passes, route-finding from the park, and boat security at the take-out need to be planned ahead.',
      permits:
        'No route-specific paddling permit is known. Follow La Crosse County campground and Onalaska park rules, and use posted parking areas rather than campground roads or informal riverbank pull-offs.',
      camping:
        'Veterans Memorial Campground is a developed county campground at the put-in, but this app route should be treated as a day trip unless a campsite is separately reserved or otherwise allowed under county rules.',
      summary:
        'Launch from the Veterans Memorial Campground canoe landing on the La Crosse River and take out at Holiday Heights Landing in Holiday Heights Park. The first miles are straighter and noisier near I-90, while the lower half has better sandbanks, faster current, and bluff views.',
      accessCaveats: [
        'La Crosse County publishes campground coordinates for Veterans Memorial Campground and confirms river access; Wisconsin River Trips notes the actual canoe landing is inside the campground and parking may be several hundred feet from the water.',
        'Holiday Heights Park is a public Onalaska park, and Wisconsin River Trips describes the landing as a good public-access take-out with parking but no restroom.',
        'The Holiday Heights access road can be easy to miss from Highway 16; confirm the turn pattern before leaving a shuttle vehicle.',
      ],
      watchFor: [
        'Fast strainers and tight gaps around downed wood, especially in the second half of the trip.',
        'Pushier current and covered sandbars above about 500 cfs on the La Crosse gauge.',
        'Minor Class I current around I-90 and changing wood after storms or spring runoff.',
        'Campground traffic, bike-trail traffic, and limited take-out amenities.',
      ],
    },
  },
  'black-river-melrose-north-bend': {
    putIn: {
      name: 'Melrose Public Landing',
      latitude: 44.1261,
      longitude: -91.0045,
    },
    takeOut: {
      name: 'North Bend Landing',
      latitude: 44.08951,
      longitude: -91.11544,
    },
    logistics: {
      distanceLabel: '10.1 mi',
      estimatedPaddleTime: 'About 5 hr for most groups, longer with sandbar stops',
      shuttle:
        'Use a vehicle or local livery shuttle between Melrose Public Landing and North Bend Landing. The bike shuttle is hilly and indirect, so most groups should stage vehicles or use a Black River shuttle operator.',
      permits:
        'No route-specific paddling permit is known. Use the DNR-maintained public access points at Melrose and North Bend, and follow posted parking rules when the landings overflow on busy summer weekends.',
      camping:
        'Sandbar camping is commonly used on this lower-Black corridor, but confirm current rules, weather, and overnight river levels before planning it as more than a day trip.',
      summary:
        'Launch at Melrose Public Landing and take out at North Bend Landing for the classic lower-Black sandbar day. The route has easy current, big sand beaches, sandstone outcrops, and a direct upstream Black River Falls gauge ladder.',
      accessCaveats: [
        'Wisconsin DNR says it owns and maintains Black River access at Melrose and North Bend, and Wisconsin River Trips describes both as public landings.',
        'The Melrose lot can fill on popular weekends, with overflow parking pushed toward the Highway 108 shoulder.',
        'The North Bend landing sits near a livery and remains public, but the main lot is small and can spill over onto North Bend Drive.',
      ],
      watchFor: [
        'A 10-mile day that can run long if you start late, paddle a slow canoe, stop often, or fight a headwind.',
        'Shallow bars and possible walking below about 100 cfs on the Black River Falls gauge.',
        'Fewer sandbars and less route character as the gauge rises above about 450 to 600 cfs.',
        'Shoreline strainers, shallow motorboat traffic, crowded summer weekends, and the signed right-channel choice near North Bend.',
      ],
    },
  },
  'waupaca-river-county-q-brainards-bridge': {
    putIn: {
      name: 'County Highway Q / Cobbtown Road canoe launch',
      latitude: 44.37413,
      longitude: -89.18548,
    },
    takeOut: {
      name: "Brainard's Bridge Park",
      latitude: 44.36546,
      longitude: -89.09842,
    },
    logistics: {
      distanceLabel: '7.8 mi',
      estimatedPaddleTime: 'About 3 hr to 3.5 hr at normal recreational pace',
      shuttle:
        "Use a short Waupaca-area car shuttle between the County Q / Cobbtown Road public parking area and Brainard's Bridge Park. A bike shuttle is possible but includes hills, town riding, and busy-road crossings.",
      permits:
        "No route fee is listed by Visit Waupaca County. Follow posted rules at the County Q access and Brainard's Bridge Park, and park only in public parking areas.",
      camping:
        'No on-route camping is documented for this short city-adjacent day trip. Treat it as a day paddle.',
      summary:
        "Launch at the public Cobbtown Road / County Q canoe access and take out at Brainard's Bridge Park in Waupaca. This is the standard Waupaca River day run with clear water, boulder gardens, riffles, wooded bends, and a public city-park finish.",
      accessCaveats: [
        'Visit Waupaca County describes public parking on Cobbtown Road just off Highway Q, while Miles Paddled records the launch GPS point at the County Q access.',
        "Brainard's Bridge Park is a public city park with facilities, islands, trails, and river access context, but the take-out can be busy during park events.",
        'The covered bridge corridor includes private-drive context nearby; use the public park and named access points rather than informal stops on private banks.',
      ],
      watchFor: [
        'Fallen trees, duck-unders, hop-overs, and fresh strainers, especially after storms.',
        'Boulder gardens, riffles, and Class I current that become pushier as the Waupaca gauge rises.',
        'Shallow scraping in the final mile and at boulder gardens when the gauge is near the low end.',
        'Road noise, bridge approaches, and other paddlers on this popular route during warm weekends.',
      ],
    },
  },
  'brule-river-highway-139-fr-2150': {
    putIn: {
      name: 'Highway 139/189 Bridge Landing',
      latitude: 45.98767,
      longitude: -88.65238,
    },
    takeOut: {
      name: 'Forest Road 2150 Landing',
      latitude: 45.99013,
      longitude: -88.45013,
    },
    logistics: {
      distanceLabel: '16.2 mi',
      estimatedPaddleTime: 'About 6 hr to 8 hr',
      shuttle:
        'Plan a long remote shuttle between the Highway 139/189 bridge on the Wisconsin-Michigan line and the end of Forest Road 2150. Roads are sparse, so download maps and confirm road conditions before leaving a vehicle.',
      permits:
        'No route-specific paddling permit is known. Follow posted forest-road, landing, camping, and fire rules, and use only the named hand-carry landings or established primitive campsites.',
      camping:
        'Wisconsin Trail Guide identifies primitive first-come riverside campsites at Twins Rapids and below Two Foot Falls. Confirm current forest rules, fire restrictions, and campsite availability before planning this as an overnight.',
      summary:
        'Launch from the hand-carry Highway 139/189 Bridge Landing and paddle the border Brule to Forest Road 2150. This is a long, remote northwoods route with clear current, marsh and mixed-forest banks, class I-II rapids, and a useful downstream Highway 2 gauge.',
      accessCaveats: [
        'The Highway 139/189 landing is on the Wisconsin side south of the bridge, reached by a gravel track with limited parking.',
        'Forest Road 2150 is a hand-carry landing with parking, but the current can rip through the take-out area at higher water. Start looking for the exit early.',
        'This corridor has low road density and limited quick exits. Treat phone coverage and self-rescue as uncertain.',
      ],
      watchFor: [
        'Class I-II features including Twins Rapids, Railroad Rapids, Two Foot Falls, and unnamed boulder gardens.',
        'Scraping and bumpy rock gardens when the US Highway 2 gauge is below the 220 cfs / 3.5 ft minimum.',
        'Pushier waves, stronger take-out current, cold water, and remote rescue conditions at higher flows or after rain.',
        'Private shoreline context near the Forest Road 2150 landing; use the signed/known landing path rather than nearby banks.',
      ],
    },
  },
  'pike-river-amberg-yellow-bridge': {
    putIn: {
      name: 'Amberg Highway 141 Landing',
      latitude: 45.49576,
      longitude: -87.98712,
    },
    takeOut: {
      name: 'Yellow Bridge Landing',
      latitude: 45.47494,
      longitude: -87.87593,
    },
    logistics: {
      distanceLabel: '9.4 mi',
      estimatedPaddleTime: 'About 4 hr',
      shuttle:
        'Plan a rural Marinette County shuttle between the Highway 141 landing south of Amberg and Yellow Bridge Landing on Pike River Road near Barker Road. Roads are straightforward, but cell coverage and quick exits are limited once you are on the river.',
      permits:
        'No route-specific paddling permit is known. Use the named hand-carry landings, keep the Yellow Bridge Falls scouting/portage tight to the riverbank where the guide notes private land, and follow posted landing rules.',
      camping:
        'No on-route camping is documented for the 9.4-mile PK1 day route. Treat this as a day paddle unless a land manager separately confirms a legal campsite.',
      summary:
        'Launch at the Amberg Highway 141 Landing and paddle the Pike River to Yellow Bridge Landing. This is a scenic Wild River whitewater route with class I-II rapids, granite ledges, clear northwoods current, and a take-out just above the stronger Yellow Bridge Falls.',
      accessCaveats: [
        'The Highway 141 put-in is a hand-carry landing south of the bridge on the west side of the highway, reached by a gravel trail from the parking area.',
        'Yellow Bridge Landing is on river left above the second drop and before Barker Road. Start looking early because missing the landing commits you toward Yellow Bridge Falls.',
        'Several banks around Yellow Bridge Falls are private. Scout and portage from the riverbank corridor described by the guide rather than wandering inland.',
      ],
      watchFor: [
        'Class II Bull Falls, Scrounge Canyon, Horseshoe Falls, and multiple unnamed boulder-garden rapids.',
        'Yellow Bridge Falls below the landing, which can become Class III-IV at higher water and is not part of the broad-audience route recommendation.',
        'Bony ledges and possible portages below 2.9 ft at Amberg, especially below County K.',
        'Pushy waves, stronger holes, strainers, deadfall, cold water, and remote rescue conditions above the normal 2.9-4.1 ft window.',
      ],
    },
  },
  'pike-river-yellow-bridge-grogan-road': {
    putIn: {
      name: 'Yellow Bridge Landing',
      latitude: 45.47494,
      longitude: -87.87593,
    },
    takeOut: {
      name: 'Grogan Road Landing',
      latitude: 45.44202,
      longitude: -87.85582,
    },
    logistics: {
      distanceLabel: '4.8 mi',
      estimatedPaddleTime: 'About 1.5 hr to 3 hr, plus scouting time',
      shuttle:
        'Use a short but remote Pike River Road and Grogan Road shuttle from Yellow Bridge Landing to the Menominee confluence. Download maps before leaving Amberg and do not count on cell coverage at the accesses.',
      permits:
        'No route-specific paddling permit is known. Use the named landings, keep scouting and portaging tight to the riverbank near private land, and follow posted Wild River and road-access rules.',
      camping:
        'No on-route campsite is documented for this short lower Pike run. Treat it as a technical day route and use separate public campground planning if staying in the area.',
      summary:
        'Launch at Yellow Bridge Landing, scout the Yellow Bridge Falls short-run, then continue past Pike River Road access points to Grogan Road Landing at the Menominee River confluence. This is the advanced lower-Pike companion to the longer Amberg-to-Yellow-Bridge route.',
      accessCaveats: [
        'Yellow Bridge Landing is on river left above Barker Road and just above the falls sequence. It is a hand-carry access reached by a footpath from a small parking area.',
        'Pike River Road Landing sits just below the final Yellow Bridge Rapids drop and can be hard to spot in heavy underbrush. Use it as a bailout only if you identify it during scouting or from the road first.',
        'Grogan Road Landing is a developed ramp on river right at the Menominee River confluence. Confirm the exit before continuing into the border-river current.',
      ],
      watchFor: [
        'Class III Yellow Bridge Falls immediately below the put-in, with 2- to 5-foot drops, a rocky Class II runout, and a river-wide ledge.',
        'Private land along the falls scout and portage area. Wisconsin Trail Guide says to stay along the riverbank.',
        'Bony rocks and pin potential below the 3.5 ft practical falls window, and pushy waves that may overpower intermediates above 4.6 ft.',
        'Cold water, deadfall, limited quick exits, and the transition into the Menominee River confluence near the take-out.',
      ],
    },
  },
  'popple-river-morgan-lake-highway-101': {
    putIn: {
      name: 'Morgan Lake Road / Forest Service Road 2159 bridge access',
      latitude: 45.763611,
      longitude: -88.463611,
    },
    takeOut: {
      name: 'Highway 101 Wayside / Popple River bridge access',
      latitude: 45.79995,
      longitude: -88.39662,
    },
    logistics: {
      distanceLabel: '5.4 mi',
      estimatedPaddleTime: 'About 1.5 hr to 3 hr, plus scouting and portage time',
      shuttle:
        'Use a remote Florence County shuttle from the Morgan Lake Road bridge to the Highway 101 wayside. Roads are rural and partly gravel, so download maps and expect limited cell coverage.',
      permits:
        'No route-specific paddling permit is known. Use the signed bridge/wayside access points, respect private land near portage trails, and follow Pine-Popple Wild Rivers rules.',
      camping:
        'Treat this as a short technical day route. Nearby national forest or county camping is a separate base-camp plan, not an assumed riverside campsite on this 5.4-mile run.',
      summary:
        'Launch at the Morgan Lake Road / Forest Service Road 2159 bridge and take out at the Highway 101 wayside. This is the lower Popple whitewater run through Little Bull Falls, Big Bull Falls, tight boulder gardens, marked portages, and protected Wild River forest.',
      accessCaveats: [
        'The Morgan Lake Road put-in is a bridge/gauge-area access rather than a developed livery launch. Confirm shoulder, parking, and road conditions before unloading.',
        'At Highway 101, American Whitewater describes the take-out on river left near the bridge and shallow gravel shore. Identify the exit before continuing downstream.',
        'Several scouting or emergency paths touch private land. Stay on signed/accepted river-portage routes and keep the group tight.',
      ],
      watchFor: [
        'Little Bull Falls, where an aggressive hole and submerged bedrock feature can make rescues difficult.',
        'Big Bull Falls and its approach, where swift current can carry paddlers past the portage landing.',
        'Low-water scraping below 150-250 cfs and technical boulder dodging even inside the runnable range.',
        'High water, sticky holes, strainers, deadfall, spring ice shelves, cold water, and limited road exits in the Wild River corridor.',
      ],
    },
  },
  'pine-river-county-n-wepco-5': {
    putIn: {
      name: 'County N Bridge Landing',
      latitude: 45.83711,
      longitude: -88.22522,
    },
    takeOut: {
      name: 'WEPCO Landing #5',
      latitude: 45.83949,
      longitude: -88.1408,
    },
    logistics: {
      distanceLabel: '9.3 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr',
      shuttle:
        'Use a rural Florence County shuttle from County N Bridge Landing to WEPCO Landing #5. The shorter Oxbow option can reduce shuttle work, but this route keeps the full PN1 segment to the downstream WEPCO landing.',
      permits:
        'No route-specific paddling permit is known. Use the named landings, follow posted Pine-Popple Wild Rivers and landing rules, and confirm release or access changes before launch.',
      camping:
        'No on-route campsite is assumed for the 9.3-mile day route. Nearby Chequamegon-Nicolet National Forest campgrounds are a separate lodging plan, not a river-camp assumption.',
      summary:
        'Launch at County N Bridge Landing beside the live USGS gauge and paddle the Pine River to WEPCO Landing #5. This is an easy Wild River float with quiet mixed-forest scenery, riffles, one short Class I pitch, and a route-specific minimum level from Wisconsin Trail Guide.',
      accessCaveats: [
        'County N Bridge Landing is the put-in and gauge corridor; check parking space and shoulder conditions before unloading.',
        'WEPCO Landing #5 is the planned take-out near the lower end of the PN1 guide. Identify the landing before launching because downstream continuation changes the trip and shuttle.',
        'Pine Dam and the Pine River Powerplant influence flow upstream of the route, so same-day gauge and release checks matter even though this is an easy route.',
      ],
      watchFor: [
        'Shallow riffles, dragging, and slower travel below the 1.75 ft / 150 cfs suggested minimum.',
        'Faster current after dam releases or rain, plus cold water and limited quick exits in the wooded Wild River corridor.',
        'Downed trees, sweepers, and low branches on bends, especially after storms.',
        'One short Class I pitch and riffles that are easy at normal levels but still require boat control around rocks.',
      ],
    },
  },
  'menominee-river-piers-gorge': {
    putIn: {
      name: 'Niagara Mill Street Landing',
      latitude: 45.77032,
      longitude: -87.98863,
    },
    takeOut: {
      name: 'Piers Gorge Road Landing',
      latitude: 45.75834,
      longitude: -87.93907,
    },
    logistics: {
      distanceLabel: '2.9 mi',
      estimatedPaddleTime: 'Varies',
      shuttle:
        'Run a short cross-border shuttle from Mill Street Landing in Niagara to the Piers Gorge Road access off Highway 8 in Michigan. The river mile is short, but scout time, dam-release timing, and rescue planning can dominate the day.',
      permits:
        'No route-specific paddling permit is known from the sources checked. Use the named hand-carry landings, follow Menominee River State Recreation Area rules at Piers Gorge, and verify whether any local parking fee or commercial-release constraint applies before launch.',
      camping:
        'No on-route camping is documented for the 2.9-mile Piers Gorge run. Treat this as a short expert whitewater day route unless a land manager separately confirms legal overnight use.',
      summary:
        'Launch at Niagara Mill Street Landing and paddle the Menominee through Piers Gorge to the Piers Gorge Road Landing. The route starts broad and fast, then compresses into a Class IV gorge with Sand Portage Falls, Missicot Falls, 2 Sisters, Terminal Surfer, and several powerful play features.',
      accessCaveats: [
        'Mill Street Landing has hand-carry access, parking, trailer turnaround, and a pit toilet according to Wisconsin Trail Guide.',
        'Piers Gorge Road Landing is about 200 yards below Terminal Surfer on river left, downstream of a narrow slough; identify it before committing to the lower gorge.',
        'The take-out is in Michigan within the Piers Gorge unit of the Menominee River State Recreation Area, while the put-in is in Niagara, Wisconsin.',
      ],
      watchFor: [
        'Dam-release changes from Little Quinnesec Falls Dam; water can rise quickly and the gauge should be checked the same day.',
        'Class IV Missicot Falls, Volkswagen Rock, Whirlpool Rapids, 2 Sisters, Terminal Surfer, sticky holes, and powerful hydraulics at higher flows.',
        'Intermediate paddlers should stay away above 1400 cfs per Wisconsin Trail Guide; this app route is framed for advanced/expert whitewater paddlers.',
        'Scout before running the gorge and avoid entering Terminal Surfer without scouting; its hydraulic is easy to underestimate from upstream.',
      ],
    },
  },
  'red-river-weed-dam-zeimers-falls': {
    putIn: {
      name: 'Weed Dam Powerhouse Landing',
      latitude: 44.84168,
      longitude: -88.76063,
    },
    takeOut: {
      name: "Zeimer's Falls Landing",
      latitude: 44.84287,
      longitude: -88.72289,
    },
    logistics: {
      distanceLabel: '2.2 mi',
      estimatedPaddleTime: 'About 1 hr to 2 hr plus scouting time',
      shuttle:
        "Run a very short rural shuttle between Weed Dam Powerhouse Landing and the Butternut Road access for Zeimer's Falls Landing. The river miles are short, but scout time and release timing can matter more than mileage.",
      permits:
        'No route-specific paddling permit is known from the sources checked. Use only the named hand-carry landings and stay off private banks while scouting or portaging.',
      camping:
        'No on-route camping is documented for this 2.2-mile whitewater run. Treat it as a short day route and use nearby public campgrounds only after checking separate rules and availability.',
      summary:
        "Launch below Weed Dam Powerhouse and paddle the Red River through First Drop, Second Drop, Monastery Falls, and Zeimer's Falls. This is a compact Class III-IV whitewater run, not a casual recreational float.",
      accessCaveats: [
        'Wisconsin Trail Guide describes Weed Dam Powerhouse Landing as a hand-carry access with parking and a trailer turnaround.',
        "Zeimer's Falls Landing is reached from a sand-and-gravel drive off Butternut Road, with parking, trailer turnaround, and a woodchip path down to the river.",
        'The guide warns that land on either side of Monastery Falls is privately owned; scout or portage from river right and stay on exposed rock ledges.',
      ],
      watchFor: [
        'Dam-release changes from Weed Dam Powerhouse; a horn may sound before release and water can rise quickly.',
        'Scrappy boulder gardens below about 150 cfs, including possible low-water portage at Monastery Falls.',
        "Monastery Falls can reach Class IV at high flows, while Zeimer's Falls becomes pushy Class III+ in the high band.",
        'Treat the Morgan Road USGS gauge as a corridor signal, not a substitute for same-day release and visual checks at the put-in.',
      ],
    },
  },
  'jump-river-wayside-park-sheldon': {
    putIn: {
      name: 'Wayside Park / Highway 73 Jump River Access',
      latitude: 45.354054,
      longitude: -90.788597,
    },
    takeOut: {
      name: 'Haley Park / Sheldon Access',
      latitude: 45.307764,
      longitude: -90.955985,
    },
    logistics: {
      distanceLabel: '11.1 mi',
      estimatedPaddleTime: 'About 3 hr at normal levels; faster during race-level high water',
      shuttle:
        'Use a rural two-car shuttle between Wayside Park off Highway 73 near the village of Jump River and Haley Park in Sheldon. The exact route is longer than the road shuttle suggests, so stage vehicles before launching.',
      permits:
        'No route-specific paddling permit is known. Use the public park and access areas, follow posted Rusk County and local rules, and avoid informal private-bank stops.',
      camping:
        'No on-route campsite is assumed for this day route. Treat nearby parks or campgrounds as separate base-camp planning, not river-camp permission.',
      summary:
        'Launch at the Highway 73 Wayside Park access and take out at Haley Park in Sheldon. This lower Jump River route follows the Rusk County Highway 73-to-Sheldon paddle and the Wisconsin River Trips Wayside Park-to-Haley Park report.',
      accessCaveats: [
        'Rusk County publishes the official Highway 73-to-Sheldon route coordinates as Jump River Access and Sheldon Access; use those named sites rather than informal bridge shoulders.',
        'Wayside Park has good public access near Highway 73, while Haley Park spans both sides of the bridge in Sheldon and has an outhouse according to Wisconsin River Trips.',
        'The direct USGS gauge is at Sheldon near the take-out, so check the gauge before staging there and before deciding whether to extend downstream.',
      ],
      watchFor: [
        'Frequent shallow Class I riffles and boulder gardens that can require scraping or walking below the low band.',
        'Fast current and stronger Class I-II wave trains when the Sheldon gauge is high or rising after rain.',
        'Wind on more open stretches, cold water in spring, and changing wood or strainers after high water.',
        'Do not use the 2200 cfs Sheldon Canoe Race observation as normal recreational guidance; that is extreme, fast water for this app audience.',
      ],
    },
  },
  'red-cedar-river-tom-prince-russian-slough': {
    putIn: {
      name: 'Tom Prince Memorial Park Landing',
      latitude: 45.0026972,
      longitude: -91.729812,
    },
    takeOut: {
      name: 'Russian Slough County Park',
      latitude: 44.9933827,
      longitude: -91.8095487,
    },
    logistics: {
      distanceLabel: '7.7 mi',
      estimatedPaddleTime: 'About 3 hr at normal fall levels',
      shuttle:
        'Use a rural two-car shuttle from Tom Prince Memorial Park in Colfax to Russian Slough County Park off 860th Avenue. The final Russian Slough approach is a narrow dirt access road, so scout the take-out before launching.',
      permits:
        'No route-specific paddling permit is known. Follow posted village, county, and DNR rules at both endpoints; Dunn County notes Russian Slough may be closed in spring for walleye spawning.',
      camping:
        'Do not assume legal on-route camping. Wisconsin River Trips notes some sandbars looked campable, but this route should be planned as a day trip unless separate public camping permission is confirmed.',
      summary:
        'Launch at Tom Prince Memorial Park in Colfax and paddle the Red Cedar River to Russian Slough County Park. Expect brisk current, easy riffles, gravel bars, tall sand banks, and a rustic county-park take-out.',
      accessCaveats: [
        'Tom Prince is the longer Colfax launch for this route; Felland Park is a shorter alternate 1.3 miles downstream.',
        'Russian Slough is public county land on the Red Cedar corridor, but Dunn County says it has no amenities or developed boat landing. Treat it as a primitive take-out and confirm it is open before relying on it.',
        'The take-out is on the east end of an island/slough complex; mark it before launching and stay alert as the river begins to split near the finish.',
      ],
      watchFor: [
        'Fast current and frequent strainers, especially near side channels and island splits.',
        'Roughly 30 easy Class I riffles that become pushier as the Colfax gauge rises.',
        'A minor logjam near the large sand banks that may require a quick scooch or gravel-bar walkaround.',
        'High water above about 800 cfs changes this from a scenic moving-water day into an expert-only strainer route.',
      ],
    },
  },
  'big-eau-pleine-river-cherokee-march-rapids': {
    putIn: {
      name: 'Cherokee Park',
      latitude: 44.9046882,
      longitude: -90.2226348,
    },
    takeOut: {
      name: 'March Rapids Park',
      latitude: 44.8507988,
      longitude: -90.1498549,
    },
    logistics: {
      distanceLabel: '9.2 mi',
      estimatedPaddleTime: 'About 4 hr to 5.5 hr depending on level and scouting',
      shuttle:
        'Use a two-car shuttle between Cherokee Park on County Road N and March Rapids Park on County Road P. The road shuttle is manageable, but this is a level-sensitive river, so check the Stratford gauge before leaving the take-out vehicle.',
      permits:
        'No route-specific paddling permit is known. Follow posted Marathon County park rules at Cherokee Park and March Rapids Park, and avoid private banks along the rural middle corridor.',
      camping:
        'No on-route camping is documented for this day section. Treat the trip as a day paddle unless separately planning a legal county-park or private campground stay.',
      summary:
        'Launch below the Cherokee Park dam and paddle the Big Eau Pleine through the Cherokee-to-Hazelnut boulder gardens and the wooded Hazelnut-to-March Rapids reach. Take out at March Rapids Park after scouting or running the park rapids.',
      accessCaveats: [
        'Cherokee Park is a Marathon County park with river access, vault restrooms, picnic facilities, and trails; use the river access below the dam rather than launching above the impoundment.',
        'March Rapids Park has paths above and below the rapids, so scout during the shuttle and decide whether to take out above the rapids or finish by running them.',
        'Hazelnut Road is a possible bailout but is only a gravel-road bridge access with poison ivy and limited comfort; the cleaner planned take-out is March Rapids Park.',
      ],
      watchFor: [
        'Bumpy rapids, shallow boulder slots, and walking risk below about 150 cfs on the Stratford gauge.',
        'Class II or Class II+ rapids two miles above March Rapids, with the best line reported along the left; scout before running.',
        'March Rapids at the take-out, which is scenic and scoutable but still deserves attention before tired paddlers commit.',
        'Fast current under low branches, strainers, and rapidly changing levels after rain on this flashy rocky watershed.',
      ],
    },
  },
  'maquoketa-river-backbone-dundee': {
    putIn: {
      name: 'Highway 410 bridge access / Backbone State Park',
      latitude: 42.6331,
      longitude: -91.5617,
    },
    takeOut: {
      name: 'Dundee Access / Dundee Wildlife Area',
      latitude: 42.5793779,
      longitude: -91.5485886,
    },
    logistics: {
      distanceLabel: '6.2 mi',
      estimatedPaddleTime: 'About 3 hr plus portage and scouting time',
      shuttle:
        'Use a two-car shuttle between the Highway 410 bridge inside Backbone State Park and Dundee Access at Dundee Wildlife Area. The road shuttle is short but hilly, and park gates can close in snowy/off-season conditions, so confirm Backbone State Park road access before staging.',
      permits:
        'No route-specific paddling permit is known. Follow Iowa DNR state-park rules inside Backbone State Park and Delaware County Conservation rules at Dundee Wildlife Area.',
      camping:
        'Backbone State Park has separate campground and cabin facilities, but this route should be planned as a day paddle unless camping is reserved or separately confirmed through Iowa DNR.',
      summary:
        'Launch at the Highway 410 bridge access in Backbone State Park and paddle through the upper Maquoketa bluff corridor, Backbone Lake, and the dam-portage area before finishing at Dundee Access.',
      accessCaveats: [
        'The put-in is a bridge access inside Backbone State Park rather than a developed ramp; parking is reported at either end of the bridge, but seasonal gate closures can block vehicle access.',
        'Many paddlers should consider the Backbone Lake dam/ramp as the safer take-out, because the dam-to-Dundee leg has tricky current, low branches, and strainers.',
        'Dundee Access is the stronger public endpoint: Delaware County confirms Dundee Wildlife Area has canoe and kayak access on the Maquoketa River.',
      ],
      watchFor: [
        'Three easy-portage logjams above the South Fork confluence can still change after storms.',
        'Backbone Lake wind exposure, especially in open-water conditions above roughly 14 mph.',
        'The Backbone Lake dam portage, split channels below the dam, low branches, tricky strainers, and a two-foot ledge near 129th Street.',
        'Very low flows that make the pre-South-Fork section wade-heavy and high/rising flows that make the dam-to-Dundee strainers more consequential.',
      ],
    },
  },
  'maquoketa-river-canton-royertown': {
    putIn: {
      name: 'Canton Bridge Access / Canton County Park',
      latitude: 42.1627901,
      longitude: -90.8918068,
    },
    takeOut: {
      name: 'Royertown Bridge Access / Water Trail Access #45',
      latitude: 42.1198989,
      longitude: -90.828304,
    },
    logistics: {
      distanceLabel: '8.9 mi',
      estimatedPaddleTime: 'About 4 hr at normal recreational levels',
      shuttle:
        'Use a two-car shuttle between Canton and the 50th Ave / Royertown bridge access. Wisconsin River Trips describes the bike shuttle as about 5.9 miles with notable hills but paved roads.',
      permits:
        'No route-specific paddling permit is known. Follow posted Jackson County Conservation and water-trail rules at Canton, Buzzard Ridge, Millertown, and Royertown accesses.',
      camping:
        'Jackson County lists primitive paddle-in camping along the Maquoketa River Water Trail, including Buzzard Ridge; treat camping as a separate water-trail plan and confirm current county rules before relying on it.',
      summary:
        'Launch at Canton Bridge Access by Canton County Park and paddle the South Fork Maquoketa through the Buzzard Ridge bluff corridor, past the Millertown option, and down to Royertown Bridge Access on 50th Ave.',
      accessCaveats: [
        'Canton is the clean upstream public access for this route; Jackson County signs the water-trail accesses along the road and at the landings.',
        'Royertown is also called 50th Ave, Royertown Canoe Access, or Water Trail Access #45. The access drive can be steep and rutted, so scout vehicle clearance before committing.',
        'Millertown Access at 30th Ave is a public intermediate take-out about 2.9 miles upstream from Royertown if weather, flow, or time argues for a shorter day.',
      ],
      watchFor: [
        'Shallow gravel riffles and grounding below about 500 cfs on the Maquoketa near Maquoketa gauge.',
        'Open reaches where a strong headwind can slow an otherwise straightforward current-assisted trip.',
        'Pushier, dirtier water above about 2,000 cfs, especially around outside bends, bridge landings, and strainers after storms.',
      ],
    },
  },
  'volga-river-mederville-littleport': {
    putIn: {
      name: 'Mederville Canoe Access',
      latitude: 42.7637267,
      longitude: -91.4218817,
    },
    takeOut: {
      name: 'Littleport Canoe Access',
      latitude: 42.7536533,
      longitude: -91.3690117,
    },
    logistics: {
      distanceLabel: '5.7 mi',
      estimatedPaddleTime: 'About 2 hr to 3 hr depending on level and stops',
      shuttle:
        'Use a short rural two-car shuttle between the hidden Mederville access and the Littleport bridge. Wisconsin River Trips describes the bike shuttle as about 4.6 miles with gravel roads, one steep climb, and possible loose-dog friction.',
      permits:
        'No route-specific paddling permit is known. Use only established bridge-area and canoe-access landings, follow posted Clayton County or local parking rules, and respect private banks along the corridor.',
      camping:
        'No on-route campsite is documented for this short day route. Treat nearby parks or campgrounds as separate base-camp planning rather than river-camp permission.',
      summary:
        'Launch at Mederville Canoe Access below the Evergreen Road / Eclipse Road bridge corridor and take out at Littleport Canoe Access by the Bridge Street / X21 bridge. This short Volga River leg has limestone outcrops, wooded banks, sandbars, and quick Class I riffles.',
      accessCaveats: [
        'Mederville Canoe Access is hidden below the bridge corridor and reached from Eclipse Road; the path to the water is steep enough that rope or a second person is useful.',
        'Littleport Canoe Access uses steep stairs near the southeast corner of the bridge, and boats may need to be carried or dragged under the bridge because of the guardrail and shoulder parking pattern.',
        'Both endpoints are named public-access locations in route and water-quality records, but they are not polished ramp launches. Scout the take-out before launching if you have not used it before.',
      ],
      watchFor: [
        'About 15 easy Class I riffle pitches that become scrape-prone near the low band and pushier above the broad target window.',
        'Low branches over faster current, especially after storms or when the Littleport gauge is in the high band.',
        'Steep, slippery banks and stairs at both landings, cold spring/fall water, and fast rises after heavy rain in the Driftless hills.',
      ],
    },
  },
  'turkey-river-elkader-motor-mill': {
    putIn: {
      name: 'Elkader Whitewater Park / Elkader Access #39B',
      latitude: 42.853356,
      longitude: -91.402402,
    },
    takeOut: {
      name: 'Motor Mill Access #32',
      latitude: 42.8088,
      longitude: -91.3531,
    },
    logistics: {
      distanceLabel: '6.5 to 7 mi',
      estimatedPaddleTime: 'About 3 hr to 4 hr depending on level and stops',
      shuttle:
        'Use a two-car shuttle between downtown Elkader and Motor Mill, or arrange a local livery shuttle. The road shuttle is hilly enough that a bike shuttle is a bigger commitment than the river mileage suggests.',
      permits:
        'No route-specific paddling permit is known. Follow posted City of Elkader, water-trail, and Clayton County Conservation rules at the whitewater park, Elkader Access, and Motor Mill.',
      camping:
        'Motor Mill has primitive county campground options across the road from the access area. Treat camping as a separate county-park reservation or first-come plan rather than an assumed part of the day trip.',
      summary:
        'Launch at Elkader Whitewater Park or the adjacent Elkader Access corridor and take out at Motor Mill Access. This is a popular Turkey River Water Trail section with riffles, wooded bluffs, Robert Creek, and a historic mill finish.',
      accessCaveats: [
        'Casual paddlers can launch below or away from the whitewater feature; the engineered ledges at Elkader should be scouted before running.',
        'The water-trail guide names the corridor as Elkader Access #39B, while route reports often use Elkader Whitewater Park as the cleaner scenic put-in.',
        'Motor Mill Access is downstream of the historic mill on river left. Identify it before continuing, because the next water-trail take-out at Garber is a much longer 12-plus-mile extension.',
      ],
      watchFor: [
        'The Elkader whitewater-park ledges at the start, including more consequential lines that are not appropriate for unprepared flatwater paddlers.',
        'Frequent Class I riffles that become bumpy near the low band and pushier as the Elkader gauge rises.',
        'High-water loss of clarity, stronger current around outside bends, and more consequential landings at Motor Mill.',
      ],
    },
  },
  'yellow-river-volney-sixteen-bridge': {
    putIn: {
      name: 'Volney Canoe Access',
      latitude: 43.08663222,
      longitude: -91.18097453,
    },
    takeOut: {
      name: 'Bridge Sixteen Canoe Access',
      latitude: 43.1277592,
      longitude: -91.3140227,
    },
    logistics: {
      distanceLabel: 'About 4.6 to 5 mi',
      estimatedPaddleTime: 'About 2 hr to 3 hr depending on level and stops',
      shuttle:
        'Use a rural two-car shuttle between Volney Canoe Access and Bridge Sixteen. Roads are steep and gravelly enough that bike shuttles are a commitment; local shuttle/rental services commonly serve this corridor.',
      permits:
        'No route-specific paddling permit is known. Follow Iowa DNR fishing/access rules and respect private property along the Yellow River.',
      camping:
        'No on-route camping assumed for this short day run. Use established campground or state-forest options only with separate planning.',
      summary:
        'Launch at Volney Canoe Access and take out at Bridge Sixteen. This is the popular short Yellow River leg with clear water, fast riffles, trout-stream character, and limestone outcrops.',
      accessCaveats: [
        'Volney is the cleaner public put-in than the upstream Volney Road bridge used for the longer WRT trip report.',
        'Use the public Bridge Sixteen access downstream of the bridge. Do not use nearby Scenic View Campground facilities unless you are a customer.',
        'Much of the river corridor is private. Stay with established access points and do not assume gravel bars or banks are public picnic sites.',
      ],
      watchFor: [
        'Frequent Class I riffles and fast current; at high water some rapids can approach Class II consequences.',
        'Three or four strainers are noted on the route, including at least one that may require an easy portage at normal levels.',
        'Cold water, trout anglers, cloudy post-rain water, and fast rises after heavy rain.',
      ],
    },
  },
  'turtle-creek-east-creek-road-highway-140': {
    putIn: {
      name: 'East Creek Road public pull-off',
      latitude: 42.6113321,
      longitude: -88.7804249,
    },
    takeOut: {
      name: 'Highway 140 Turtle Creek access',
      latitude: 42.5965016,
      longitude: -88.8637665,
    },
    logistics: {
      distanceLabel: '6.8 mi',
      estimatedPaddleTime: 'About 3 hr at normal levels',
      shuttle:
        'Use a short rural shuttle between the East Creek Road access west of the bridge and the Highway 140 parking area north of the bridge. Wisconsin River Trips describes the bike shuttle as about 4.5 miles with modest climbing.',
      permits:
        'No route-specific paddling permit is known. Follow posted Wisconsin DNR wildlife-area rules and any local parking signs at East Creek Road, O Riley Landing, South Carvers Rock Road, and Highway 140.',
      camping:
        'No on-route camping is documented for this short day route. Treat the Turtle Creek Wildlife Area corridor as day-use paddling unless a land manager separately confirms overnight use.',
      summary:
        'Launch from the East Creek Road public pull-off and paddle Turtle Creek past wild rice beds, O Riley Landing, Little Turtle Creek, South Carvers Rock Road, Spring Brook, and a short Class I riffle before taking out at Highway 140.',
      accessCaveats: [
        'East Creek Road is a bridge-area public pull-off with a roughly 280-foot carry to the creek and no restroom.',
        'Highway 140 has a parking area north of the bridge and a short path to the water, but it can be busy on good paddling days.',
        'The route begins in the lower Turtle Creek Wildlife Area corridor and continues beyond the wildlife-area segments; stay with established bridge and landing access points.',
      ],
      watchFor: [
        'Aquatic weeds and possible shallow congestion in the low band below about 100 cfs.',
        'One easy Class I riffle just downstream from South Carvers Rock Road.',
        'Strainers or fresh wood after storms, despite the clean route report.',
        'High water above about 350 cfs reducing clarity and making bends, low branches, and shoreline strainers less forgiving.',
      ],
    },
  },
};
