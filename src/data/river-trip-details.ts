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
  'white-river-maple-ridge-highway-112': {
    putIn: {
      name: 'Maple Ridge Road access',
      latitude: 46.43763,
      longitude: -91.0262,
    },
    takeOut: {
      name: 'Highway 112 Dam / White River Flowage access',
      latitude: 46.49858,
      longitude: -90.90995,
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
        'The coordinates and route shape are solid, but official landing or parking authority is weaker than on the strongest seeded routes.',
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
        'Put in at Belleville Community Park and take out at County Road X. This is a mellow but full-feeling day, and low water makes it substantially less fun.',
      accessCaveats: [
        'Belleville Community Park is subject to official village park hours and vehicle rules, but the exact river-launch pattern and County Road X parking setup are still best confirmed on the ground.',
        'The low-water floor matters more than a precise sweet spot on this reach.',
      ],
      watchFor: [
        'Shallows and grounding in low water.',
        'Muddy bottom and tight bends that sap momentum.',
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
};
