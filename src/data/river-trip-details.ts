import type { RiverTripDetails } from '../lib/types';

export const riverTripDetails: Record<string, RiverTripDetails> = {
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
      shuttle:
        'Car shuttle is straightforward. A bike shuttle may be possible using the Straight River Trail for part of the route.',
      permits:
        'No special paddling permit noted. Follow posted rules at each access.',
      camping:
        'Treat this as a day trip unless you have independently confirmed legal camping.',
      summary:
        "Put in at Krogh's Landing and take out at Two Rivers Landing/Park in Faribault. Use the Faribault gauge as a starting point, but verify access and parking locally.",
      accessCaveats: [
        "Krogh's Landing still lacks a strong official access page for parking details, so verify conditions locally.",
        'Two Rivers Landing/Park works as the Faribault finish, but park rules and parking details should still be checked on arrival.',
      ],
      watchFor: [
        'Shallow riffles and scrape risk when the river is low.',
        'Downed trees and snags on blind corners.',
        'Cold-water risk outside midsummer.',
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
      shuttle:
        'Bike shuttle on the Root River State Trail is a strong option. Two-car shuttle on local roads is straightforward if you want a simpler setup.',
      permits:
        'No special paddling permit is known for this state water-trail day trip. Confirm any local parking rules at both Hwy 16 accesses.',
      camping:
        'Treat this as a day trip unless you separately book local lodging or campground options in Lanesboro or Peterson.',
      summary:
        'Put in at the Hwy 16 access in Lanesboro and take out at the Hwy 16 access in Peterson. This is one of the cleaner Root River shuttle days, but low-water riffles and changing access details still deserve a same-day check.',
      accessCaveats: [
        'Both endpoints are supported by MN DNR public water access records, but parking details and any local restrictions are still best confirmed on arrival.',
        'Do not assume every roadside pull-off near the bridge is valid long-term parking without checking signage.',
      ],
      watchFor: [
        'Shallow riffles and scrape risk when the gauge is near the low end.',
        'Fresh wood or strainers after rain, especially on blind bends.',
        'Cold-water exposure outside midsummer, even on an easy-current day.',
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
  'snake-river-rush-city-bridgeview-park': {
    putIn: {
      name: 'Rush City Public Access',
      latitude: 45.7052688,
      longitude: -93.0493927,
    },
    takeOut: {
      name: 'Bridgeview Park / Pine City Public Access',
      latitude: 45.8271513,
      longitude: -92.9690928,
    },
    logistics: {
      distanceLabel: '11 mi',
      shuttle:
        'Two-car shuttle between Rush City and Pine City. Both ends are signed state-water-trail access points, but parking details should still be confirmed on arrival.',
      permits:
        'No route-specific permit is known. Follow public-water-trail access rules and any posted local parking restrictions.',
      camping:
        'No simple on-route camping assumption is safe here. Treat this as a day trip unless you separately confirm legal overnight options.',
      summary:
        'Launch at Rush City and take out at Bridgeview Park in Pine City. This is a full Snake River day, so both level and weather matter more than on a short park-to-park float.',
      accessCaveats: [
        'The official route map supports both endpoints, but route length and shuttle timing matter more here than on a shorter metro paddle.',
        'Do not assume storm cleanup has happened after recent high water. This river can pick up new wood quickly.',
      ],
      watchFor: [
        'Low-water dragging when the Pine City gauge falls toward 2.3 ft.',
        'Fresh strainers and obstructions after storms.',
        'Fatigue and weather exposure over an 11-mile day if the pace slows.',
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
      latitude: 45.9451305,
      longitude: -92.7769513,
    },
    takeOut: {
      name: '#6 trailer access (Kettle River State Water Trail - Map 2)',
      latitude: 45.9608,
      longitude: -92.6992,
    },
    logistics: {
      distanceLabel: '7.2 river mi',
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
      shuttle:
        'Two-car shuttle is simplest. A bike shuttle is possible, but expect a mix of gravel and pavement.',
      permits: 'No permit noted for this reach.',
      camping: 'No camping noted for this reach.',
      summary:
        'Use the 90th Street NW access as the put-in and Lake Zumbro County Park as the take-out. The route is short, but wind on the reservoir finish still changes the day.',
      accessCaveats: [
        'The 90th Street NW put-in is based on bridge/location context rather than a clearly documented public canoe launch listing.',
        'Lake Zumbro County Park has a county-documented canoe/kayak launch, but confirm day-use parking rules on arrival.',
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
      shuttle:
        'Arrange a car shuttle between Kendallville and Decorah or use an outfitter.',
      permits: 'No permit is known for a basic day paddle. Confirm local park or access rules.',
      camping:
        'Kendallville is a convenient campground staging point. Other overnight options exist along the corridor if you plan ahead.',
      summary:
        'This is a long Driftless day with county-park staging at Kendallville and a Decorah finish. Low water hurts trip quality well before it becomes unsafe.',
      accessCaveats: [
        'Kendallville is a good staging access, but confirm the Decorah take-out landing and parking details before you launch.',
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
      shuttle:
        'Plan a car shuttle and confirm parking rules at both endpoints.',
      permits:
        'No paddling permit noted. Check Belleville Community Park and County Road X signage for parking rules or hours.',
      camping: 'No established camping documented for this segment. Treat it as a day trip.',
      summary:
        'Put in at Belleville Community Park and take out at County Road X. This is a mellow but full-feeling day, and low water makes it substantially less fun.',
      accessCaveats: [
        'Access and parking rules at Belleville Community Park and County Road X are still best confirmed on the ground.',
        'The low-water floor matters more than a precise sweet spot on this reach.',
      ],
      watchFor: [
        'Shallows and grounding in low water.',
        'Muddy bottom and tight bends that sap momentum.',
        'Stay clear of the Belleville dam or spillway upstream of the put-in.',
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
      shuttle:
        'Two-car shuttle is standard between Ontario and Rockton. Both endpoints appear in the Wisconsin DNR boat-access inventory, but it is still worth confirming parking and landing rules before you leave a vehicle.',
      permits:
        'No route-specific permit is identified. Standard Wisconsin paddling rules appear to apply, but site-specific parking fees, hours, or seasonal closures are not fully confirmed.',
      camping:
        'Camping was not confirmed for this exact reach during the route audit. Treat it as a day trip unless you independently confirm a legal overnight option.',
      summary:
        'Put in at the Village of Ontario public canoe landing and take out at Landing 12 near Rockton. This is a classic Driftless day with riffles and occasional Class I, but it becomes a scrape-heavy grind quickly if you launch below the published low-water floor.',
      accessCaveats: [
        'Both landings are publicly managed carry-in accesses, but the old route work did not fully confirm day-of-use rules, hours, or parking fees.',
        'Landing 12 is tied to Kickapoo Valley Reserve management in the old source set, so confirm any local landing guidance before you leave a shuttle vehicle.',
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
      shuttle:
        'Expect about a 9.7-mile vehicle or bike shuttle. Miles Paddled treats this as a real full-day reach, so set the pickup plan and turnaround time before launching.',
      permits:
        'No permit is noted for standard day paddling. Confirm Trout Run Park signage and any Lower Dam road or landing restrictions on arrival.',
      camping:
        'No developed on-route camping is documented for this segment. Plan lodging or camping separately rather than assuming a legal overnight stop.',
      summary:
        'Launch at Trout Run Park and finish at the Lower Dam access below Decorah. This is a scenic beginner-friendly Upper Iowa day, but the 13-mile length, low-water scraping risk, and the marked dam portage still make it a real commitment.',
      accessCaveats: [
        'Locate the Trout Run Park launch near Trout Run\'s confluence before unloading because the park area is larger than a single roadside landing.',
        'The Lower Dam road and take-out are more primitive than the city-side put-in, and the old route notes describe the road as narrow in places.',
        'Treat this as a full-day shuttle-and-portage plan, not a casual quick float.',
      ],
      watchFor: [
        'Heavy scraping in riffles below about 150 cfs at the Decorah gauge.',
        'Dam safety and the marked carry around the Upper Dam, roughly a 600-foot portage.',
        'Strainers, logjams, long-day fatigue, and cold water outside midsummer.',
      ],
    },
  },
};
