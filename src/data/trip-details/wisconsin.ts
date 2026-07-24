// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const wisconsinRiverTripDetails: Record<string, RiverTripDetails> = {
  "wolf-river-pearson-lily": {
    "putIn": {
      "name": "County Highway A access near Pearson",
      "latitude": 45.34899,
      "longitude": -88.99474
    },
    "takeOut": {
      "name": "Highway 52 bridge access in Lily",
      "latitude": 45.30765,
      "longitude": -88.85806
    },
    "logistics": {
      "distanceLabel": "About 10.6 to 11 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr depending on scouting, level, and group speed",
      "shuttle": "Stage the take-out at the Highway 52 bridge in Lily, then drive back to the County Highway A access near Pearson. The shuttle is rural and access is simple, but inspect the take-out before launch because Miles Paddled notes a carry from the river to parking.",
      "permits": "No route-specific paddling permit is known. Use the public roadside access points, follow Wisconsin boating and PFD rules, and respect posted Langlade County, DNR, and private-bank boundaries.",
      "camping": "Treat this as a day route. Langlade County and the route reports support the public access chain, but no legal on-route campsite is assumed for County A to Lily.",
      "campingClassification": "none",
      "summary": "Launch at County Highway A near Pearson and take out at Highway 52 in Lily for the upper Wolf Section 1 run. The route starts with Wendigo Rapids and then eases into Class I and flatwater before the Lily bridge.",
      "accessCaveats": [
        "The card uses the cleaner public County Highway A-to-Lily segment supported by Langlade County and Miles Paddled, while Wisconsin Trail Guide's W1 family also describes a longer Pearson-to-Lily option.",
        "The Highway 52 take-out is before the downstream Lily-to-Hollister route. Do not drift past it unless you intentionally planned the next Wolf segment.",
        "The Langlade gauge is downstream of Lily and should be paired with a visual check at County A, especially after isolated rain or during low summer water."
      ],
      "watchFor": [
        "Wendigo Rapids, Strauss Rapids, Overton Rapids, shallow boulder gardens, and cold-water swims.",
        "Scrapey rocks below about 250 cfs and pushier hydraulics as the Langlade gauge rises above the novice target window.",
        "Strainers, deadfall, bridge approaches, private banks, and limited casual bailout options."
      ]
    },
    "accessPoints": [
      {
        "id": "wolf-county-a-pearson-access",
        "name": "County Highway A access near Pearson",
        "latitude": 45.34899,
        "longitude": -88.99474,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default public put-in for the app route."
      },
      {
        "id": "wolf-highway-52-lily-access",
        "name": "Highway 52 bridge access in Lily",
        "latitude": 45.30765,
        "longitude": -88.85806,
        "mileFromStart": 10.6,
        "segmentKind": "creek",
        "note": "Default take-out before the Lily-to-Hollister segment."
      }
    ]
  },
  "fox-river-swan-lake-portage": {
    "putIn": {
      "name": "Swan Lake boat landing off South Shore Drive",
      "latitude": 43.54482,
      "longitude": -89.35549
    },
    "takeOut": {
      "name": "Fox River Landing / Highway 33 Portage",
      "latitude": 43.5548,
      "longitude": -89.43395
    },
    "logistics": {
      "distanceLabel": "About 5.8 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with wind, weeds, or low current",
      "shuttle": "Stage the Highway 33 / Fox River Landing take-out in Portage, then drive to the Swan Lake boat landing off South Shore Drive. A short bike shuttle is possible, but a vehicle shuttle is simpler when wind or heat is part of the forecast.",
      "permits": "No route-specific paddling permit is known. Use public launches, follow Wisconsin boating and PFD rules, and obey Swan Lake Wildlife Area and Portage landing parking hours and posted rules.",
      "camping": "Treat this as a day trip. Wisconsin DNR says Swan Lake Wildlife Area has no campground, and no legal on-route overnight stop is assumed along the marsh or private banks.",
      "campingClassification": "none",
      "summary": "Launch at Swan Lake, cross the lake, and follow the Upper Fox River marsh channel west to the Highway 33 Fox River Landing in Portage. The route is short and easy in current, but wind and slow water can dominate the day.",
      "accessCaveats": [
        "WRT describes Swan Lake as a public boat landing with parking, outhouses, and no launch fee, but it is still a lake launch shared with motorized users.",
        "Portage Fox River Landing is the planned take-out. Confirm current hours and parking, especially if arriving early or finishing late.",
        "The Princeton gauge is a downstream proxy chosen by WRT; if Swan Lake is wind-bound or the launch channel looks too weedy or shallow, skip the route even when the gauge looks acceptable."
      ],
      "watchFor": [
        "Headwinds on Swan Lake and exposed marsh bends.",
        "Shallow or weedy summer channel edges, slow current, and possible dragging in side channels.",
        "Storms, heat, powerboats near the launch, strainers, private banks, and limited legal mid-route exits."
      ]
    },
    "accessPoints": [
      {
        "id": "swan-lake-boat-landing",
        "name": "Swan Lake boat landing off South Shore Drive",
        "latitude": 43.54482,
        "longitude": -89.35549,
        "mileFromStart": 0,
        "segmentKind": "lake",
        "note": "Default public put-in and lake-crossing start."
      },
      {
        "id": "portage-fox-river-landing-highway-33",
        "name": "Fox River Landing / Highway 33 Portage",
        "latitude": 43.5548,
        "longitude": -89.43395,
        "mileFromStart": 5.8,
        "segmentKind": "creek",
        "note": "Default take-out at the Portage Highway 33 river landing."
      }
    ]
  },
  "fox-river-princeton-locks-city-landing": {
    "putIn": {
      "id": "princeton-lock-dam-lock-road",
      "name": "Princeton Lock and Dam / Lock Road landing",
      "latitude": 43.82682,
      "longitude": -89.15854
    },
    "takeOut": {
      "id": "princeton-hiestand-park-landing",
      "name": "Princeton Jefferson Street / Hiestand Park Landing",
      "latitude": 43.8512,
      "longitude": -89.1289
    },
    "logistics": {
      "distanceLabel": "About 3.6 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer with wind or high water",
      "shuttle": "Stage the Hiestand Park / Jefferson Street city landing first, then return to Princeton Lock and Dam on Lock Road. Confirm you are launching below the dam and fish-barrier area, not above it.",
      "permits": "No route-specific paddling permit is known. Use the public DNR and city landings, follow Wisconsin boating and PFD rules, and obey posted Lock Road, Hiestand Park, and downtown parking rules.",
      "camping": "No on-route camping is allowed or documented. Wisconsin DNR says Upper Fox River Public Access properties prohibit open fires and camping, so treat this as a short day trip.",
      "campingClassification": "none",
      "summary": "Launch below Princeton Lock and Dam and paddle north to the city landing in Princeton for a short Upper Fox route. The direct Princeton gauge is useful, but the dam-adjacent start and wind exposure deserve same-day checks.",
      "accessCaveats": [
        "Princeton Lock and Dam has a dangerous low-head dam and electric fish barrier. Launch below the structure and do not approach it from upstream or downstream.",
        "The Lock Road side has DNR public boat launches, parking, and seasonal restroom support; the Oxbow Trail side is not the normal boat-launch side for this card.",
        "The city landing is the planned take-out. Downtown events, fishing use, or local parking rules can affect staging.",
        "The route uses minimum-only scoring because WRT gives a low-water/high-water heuristic rather than a formal two-sided paddling ladder."
      ],
      "watchFor": [
        "Low-head dam and electric fish-barrier hazards at the put-in area.",
        "Wind on the broad Upper Fox, slow current, dirty high water, and floating debris after rain.",
        "Private shoreline, bridge approaches, fishing lines, and limited legal exits between endpoints."
      ]
    },
    "accessPoints": [
      {
        "id": "princeton-lock-dam-lock-road",
        "name": "Princeton Lock and Dam / Lock Road landing",
        "latitude": 43.82682,
        "longitude": -89.15854,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in below the dam and fish barrier."
      },
      {
        "id": "princeton-hiestand-park-landing",
        "name": "Princeton Jefferson Street / Hiestand Park Landing",
        "latitude": 43.8512,
        "longitude": -89.1289,
        "mileFromStart": 3.58,
        "segmentKind": "creek",
        "note": "Default public city take-out."
      }
    ]
  },
  "fox-river-princeton-white-river-locks": {
    "putIn": {
      "id": "princeton-hiestand-park-landing",
      "name": "Princeton Jefferson Street / Hiestand Park Landing",
      "latitude": 43.8512,
      "longitude": -89.1289
    },
    "takeOut": {
      "id": "white-river-lock-dam-landing",
      "name": "White River Lock and Dam landing",
      "latitude": 43.89997,
      "longitude": -89.08402
    },
    "logistics": {
      "distanceLabel": "About 6.0 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr depending on wind and current",
      "shuttle": "Stage the White River Lock and Dam take-out on Lock Road, then return to Princeton / Hiestand Park. Old St. Marie Road is a short-route bailout if the group only wants the first 1.9 miles.",
      "permits": "No route-specific paddling permit is known. Use public DNR and city landings, follow Wisconsin boating and PFD rules, and obey Upper Fox Public Access posted rules.",
      "camping": "No on-route camping is allowed or documented. Wisconsin DNR says Upper Fox River Public Access properties prohibit open fires and camping, so use this as a day trip only.",
      "campingClassification": "none",
      "summary": "Launch in Princeton and take out at White River Lock and Dam for the six-mile Upper Fox continuation. The first section has wooded banks and an old swing bridge, then the river broadens and slows toward the DNR take-out.",
      "accessCaveats": [
        "Princeton / Hiestand Park is the public city launch. Check downtown parking, events, and fishing pressure before leaving a vehicle.",
        "White River Lock and Dam is the planned public take-out with refurbished DNR access, parking, and a no-fee launch. Do not improvise a private-bank exit if wind slows the day.",
        "The Princeton gauge is direct to the route corridor, but the route is flat enough that wind, weeds, heat, and high-water turbidity can matter more than small flow changes."
      ],
      "watchFor": [
        "Wind and slow current on the broad lower half of the route.",
        "Private banks, fishing lines, occasional motorboats, and limited public bailouts.",
        "High spring water that reduces clarity and can carry debris even though this is not a rapids route."
      ]
    },
    "accessPoints": [
      {
        "id": "princeton-hiestand-park-landing",
        "name": "Princeton Jefferson Street / Hiestand Park Landing",
        "latitude": 43.8512,
        "longitude": -89.1289,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default public city put-in."
      },
      {
        "id": "old-st-marie-road-landing",
        "name": "Old St. Marie Road Landing",
        "latitude": 43.8629,
        "longitude": -89.1129,
        "mileFromStart": 1.9,
        "segmentKind": "creek",
        "note": "WRT-identified public short-trip take-out near the historic swing bridge."
      },
      {
        "id": "white-river-lock-dam-landing",
        "name": "White River Lock and Dam landing",
        "latitude": 43.89997,
        "longitude": -89.08402,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "Default DNR take-out at the refurbished White River Lock and Dam access."
      }
    ]
  },
  "sheboygan-river-rochester-esslingen": {
    "putIn": {
      "id": "rochester-park-sheboygan-river",
      "name": "Rochester Park river access",
      "latitude": 43.7266,
      "longitude": -87.8166
    },
    "takeOut": {
      "id": "esslingen-park-sheboygan-river",
      "name": "Esslingen Park canoe access",
      "latitude": 43.741,
      "longitude": -87.75046
    },
    "logistics": {
      "distanceLabel": "About 9.8 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr, longer with dam portages, low water, or salmon-season crowds",
      "shuttle": "Stage Esslingen Park first, then drive back to Rochester Park. A bike shuttle is possible through Kohler/Sheboygan-area paths and streets, but two vehicles are simpler with portage gear.",
      "permits": "No route-specific paddling permit is known. Use the public park accesses, follow Wisconsin boating and PFD rules, and obey posted city, county, and park parking rules.",
      "camping": "No on-route public campsite is documented. Treat this as a day route through park, golf-course, and private-bank corridors.",
      "campingClassification": "none",
      "summary": "Paddle the Kohler reach from Rochester Park to Esslingen Park. The route starts slow, requires two dam portages, then improves below Walderhaus Dam with rocky banks, Class I riffles, fall color, and salmon-run context.",
      "accessCaveats": [
        "Rochester Park is a public park access with a carry to the water rather than a polished ramp. Inspect the launch path and water level before unloading.",
        "Esslingen Park is the planned public take-out. Do not continue into the lower urban Sheboygan route unless that separate itinerary is planned.",
        "River Wildlife / Kohler-area landings along the route are private or permission-based and should not be used as casual bailouts.",
        "The Sheboygan gauge is downstream in town. Pair it with a same-day visual call at Rochester and the dam portages."
      ],
      "watchFor": [
        "River Bend Dam and Walderhaus Dam portages; do not run the dams as part of the normal route.",
        "Low-water scraping below about 100 cfs and higher-water push or poorer clarity above WRT target levels.",
        "Class I riffles, strainers, bridge approaches, cold water, private banks, salmon-season anglers, and lower-river water-quality concerns."
      ]
    },
    "accessPoints": [
      {
        "id": "rochester-park-sheboygan-river",
        "name": "Rochester Park river access",
        "latitude": 43.7266,
        "longitude": -87.8166,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default public put-in in Rochester Park."
      },
      {
        "id": "river-bend-dam-sheboygan",
        "name": "River Bend Dam portage",
        "latitude": 43.7287,
        "longitude": -87.7865,
        "mileFromStart": 2.5,
        "segmentKind": "transition",
        "note": "First marked dam portage."
      },
      {
        "id": "walderhaus-dam-sheboygan",
        "name": "Walderhaus Dam portage",
        "latitude": 43.7308,
        "longitude": -87.7735,
        "mileFromStart": 3.7,
        "segmentKind": "transition",
        "note": "Second dam portage before the better riffle corridor."
      },
      {
        "id": "esslingen-park-sheboygan-river",
        "name": "Esslingen Park canoe access",
        "latitude": 43.741,
        "longitude": -87.75046,
        "mileFromStart": 9.8,
        "segmentKind": "creek",
        "note": "Default public take-out at Esslingen Park / Sheboygan River Natural Area."
      }
    ]
  },
  "wolf-river-lily-hollister": {
    "putIn": {
      "name": "Hwy 52 access (Lily)",
      "latitude": 45.30768,
      "longitude": -88.85806
    },
    "takeOut": {
      "name": "West Hollister Road carry-in",
      "latitude": 45.24736,
      "longitude": -88.80559
    },
    "logistics": {
      "distanceLabel": "6.5 mi",
      "estimatedPaddleTime": "About 2 hr 15 min to 3 hr",
      "shuttle": "Vehicle shuttle is easiest. A bike shuttle on the Wolf River State Trail is possible if your group wants it.",
      "permits": "No paddling permit is known. Wisconsin DNR notes the Wolf River State Trail does not require a trail pass if you use it for a bike shuttle.",
      "camping": "Treat this as a day trip unless you independently confirm nearby legal camping.",
      "summary": "Put in at Hwy 52 in Lily and take out at West Hollister just above Burnt Point Rapids. This is a compact bouldery run, not a lazy scenic float.",
      "accessCaveats": [
        "Both landings are backed by Wisconsin DNR access records, but check parking conditions on the ground before you leave a vehicle.",
        "The take-out is near the next rapid zone, so do not drift past your exit while you are distracted or tired."
      ],
      "watchFor": [
        "Shallow boulder gardens at lower flows.",
        "Pushier hydraulics and faster swims when the flow climbs.",
        "Cold water and downed trees on blind corners."
      ]
    }
  },
  "wolf-river-hollister-highway-64": {
    "putIn": {
      "name": "West Hollister Road Landing",
      "latitude": 45.248,
      "longitude": -88.8062
    },
    "takeOut": {
      "name": "Highway 64 DNR Landing / Langlade bridge",
      "latitude": 45.1901,
      "longitude": -88.7333
    },
    "logistics": {
      "distanceLabel": "8.3 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr for whitewater paddlers",
      "shuttle": "Use a vehicle shuttle between the end of West Hollister Road and the Highway 64 DNR landing at Langlade. Wisconsin River Trips reports a longer but manageable paved bike shuttle, but a car shuttle is more practical with whitewater gear.",
      "permits": "No route-specific paddling permit is known for this public-access reach. Follow posted Wisconsin DNR landing rules and confirm local parking conditions before leaving vehicles.",
      "camping": "No on-route camping is documented for this Section II day run. Treat it as a day paddle unless you separately reserve legal nearby camping.",
      "summary": "Launch at West Hollister Road above Burnt Point Rapids and take out at the DNR landing just past the Highway 64 bridge in Langlade. This is the classic Section II Wolf run: scenic, clear, and approachable for novice whitewater paddlers, but still a rapids route rather than a casual flatwater float.",
      "accessCaveats": [
        "The West Hollister landing is public and route-standard, but it is a rocky carry-in with no outhouse and parking set back from the turnaround loop.",
        "The Highway 64 DNR landing has parking and toilets, but expect a carry from the water back to the lot.",
        "The take-out sits immediately after the Langlade bridge and near the USGS gauge corridor, so identify it before launching and do not drift downstream into the stronger lower Wolf sections by mistake."
      ],
      "watchFor": [
        "Class I-II boulder gardens and named rapids including Burnt Point, Oxbow, Cedar, Hemlock, Sherry, and Larzelere.",
        "Scrapey rock contact below the conservative target window and pushier swims as the Langlade gauge rises above about 500 cfs.",
        "Cold-water exposure, pinned feet in moving water, and limited casual bailout options in the forested corridor."
      ]
    }
  },
  "wolf-river-langlade-markton": {
    "putIn": {
      "name": "Highway 64 DNR Landing, Langlade",
      "latitude": 45.18977,
      "longitude": -88.73369
    },
    "takeOut": {
      "name": "Markton County M Landing",
      "latitude": 45.12576,
      "longitude": -88.66297
    },
    "logistics": {
      "distanceLabel": "9.5 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr, longer with scouting or play stops",
      "shuttle": "Use a two-car shuttle from the Highway 64 DNR landing at Langlade to the County M landing near Markton. Paddlers running the shorter Section III variant often start at Herb's Landing, but this route keeps the full Wisconsin Trail Guide Langlade-to-Markton segment.",
      "permits": "No route-specific permit was found for the Langlade County segment above Markton. Check posted DNR/fishery-area access rules, and do not continue into downstream Menominee Reservation access without separate permission and local guidance.",
      "camping": "No on-route campsite is assumed for this whitewater day run. Nearby forest and private lodging options exist in the broader Wolf River corridor, but they should be planned separately.",
      "summary": "Launch from the public Highway 64 DNR landing at Langlade and paddle Section III of the upper Wolf to Markton County M Landing. The run starts with several miles of riffles and Class II rapids, then builds into the Boy Scout, Hanson, and Gilmore's Mistake sequence near the lower end.",
      "accessCaveats": [
        "The Highway 64 landing is a public DNR access next to the live Langlade gauge and is also the take-out for the upstream Hollister-to-Langlade route.",
        "County M is the planned take-out before downstream Menominee Reservation access rules become a separate issue. Do not assume downstream landings are public without checking current tribal and outfitter guidance.",
        "Herb's Landing and Crab n Jack's/Wild Wolf-area landings are common whitewater alternates, but this route uses the published Markton County M endpoint and coordinates."
      ],
      "watchFor": [
        "Long boulder gardens and named rapids including Crowle, Horserace, Twenty Day, Boy Scout, Hanson, and Gilmore's Mistake.",
        "Bony lines below about 400 cfs and stronger holes, pushier waves, and more consequential swims above about 950 cfs on the Langlade gauge.",
        "Strainers, deadfall, cold water, and private/reservation access issues if you miss the planned take-out."
      ]
    }
  },
  "wolf-river-markton-big-smokey-falls": {
    "putIn": {
      "name": "Markton County M DNR Landing",
      "latitude": 45.12518,
      "longitude": -88.66322
    },
    "takeOut": {
      "name": "Big Smokey Falls Landing",
      "latitude": 45.01644,
      "longitude": -88.63758
    },
    "logistics": {
      "distanceLabel": "12.7 mi",
      "estimatedPaddleTime": "About 5 hr to 6 hr for advanced whitewater paddlers",
      "shuttle": "Arrange the shuttle and required Menominee access pass before launching. Local rafting/shuttle operators commonly manage this corridor; self-supported paddlers should call ahead and confirm where vehicles may be staged.",
      "permits": "A Menominee Indian Tribe pass is required for paddling through this tribal-lands section. Wisconsin Trail Guide says passes are available through Big Smokey Falls Rafting or Shotgun Eddy Campground and Rafting; do not paddle downstream from Markton without current permission.",
      "camping": "No on-route camping is assumed. Treat this as a permitted expert day run unless a local outfitter or the Tribe confirms separate overnight options.",
      "summary": "Launch at the County M DNR Landing near Markton and run Wolf River Section IV to Big Smokey Falls Landing. This is the advanced lower-Wolf whitewater classic, with long boulder gardens, multiple Class III drops, the Dalles Gorge, and Class IV Big Smokey Falls.",
      "accessCaveats": [
        "County M has a large DNR landing with hand-carry paths and trailer turnaround, but the downstream corridor enters Menominee Tribal lands and requires a pass.",
        "Big Smokey Falls has upper and lower landing options. Use the upper landing and left fork if portaging the falls; the left-fork slide below the footbridge is closed to running.",
        "Do not treat reservation roads, shorelines, or outfitter landings as general public access. Confirm current rules before the shuttle."
      ],
      "watchFor": [
        "Class III-IV features including Gilmore's Mistake, Pismire Falls, Sullivan Falls, Duck's Nest, Lunch Rock, Tea Kettle / Upper Dells, Lower Dells, and Big Smokey Falls.",
        "Powerful hydraulics, sticky holes, big waves, and fast rescue scenarios as the Langlade gauge rises above the broad 400-700 cfs target.",
        "Bony lines at Shotgun Eddy, Pismire, and Big Smokey below about 400 cfs.",
        "Deadfall, strainers, cold water, remote rescue logistics, and tribal access enforcement if you miss the planned take-out."
      ]
    }
  },
  "red-cedar-river-menomonie-dunnville": {
    "putIn": {
      "name": "Riverside Park Canoe Launch (Menomonie)",
      "latitude": 44.87257917,
      "longitude": -91.94084048
    },
    "takeOut": {
      "name": "Dunnville Bottoms Boat Landing (County Road Y)",
      "latitude": 44.71636558,
      "longitude": -91.89691839
    },
    "logistics": {
      "distanceLabel": "14.75 mi",
      "estimatedPaddleTime": "About 5 hr to 6 hr 45 min",
      "shuttle": "Best shuttle option is the Red Cedar State Trail bike return if your group wants to avoid a second car. A driving shuttle is still straightforward and usually simpler on cold or rainy days.",
      "permits": "No route-specific paddling permit is known. If you bike the state trail shuttle, check Wisconsin DNR for any current trail pass or closure rules.",
      "camping": "No route camping is indicated for this day trip. Camping legality along the lower Red Cedar is too ownership-dependent to assume from the landings alone.",
      "summary": "Use Riverside Park in Menomonie as the put-in and Dunnville Bottoms as the take-out. This is a long but friendly downstream Red Cedar day when the gauge keeps enough water in the riffles.",
      "accessCaveats": [
        "Both ends are backed by Wisconsin DNR access records, which is stronger than most community-seeded routes.",
        "Do not let the easy character make you lazy about cold water, weather, or post-storm wood checks on a 15-mile day."
      ],
      "watchFor": [
        "Low water that turns the riffly upper miles into a slower scrape-and-drag day.",
        "Fresh strainers or wood after storms, even though the river is otherwise beginner-friendly.",
        "Fatigue, wind, and weather exposure over a nearly 15-mile outing if your pace slips."
      ]
    }
  },
  "namekagon-river-big-bend-trego": {
    "putIn": {
      "name": "Big Bend Landing",
      "latitude": 45.9320719,
      "longitude": -91.7516647
    },
    "takeOut": {
      "name": "Trego Town Park Landing",
      "latitude": 45.9106187,
      "longitude": -91.8238907
    },
    "logistics": {
      "distanceLabel": "7.7 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 3 hr 30 min",
      "shuttle": "Short paved-road shuttle in the Trego area. Several local outfitters run Big Bend, Earl, and Trego shuttles, but a simple two-car setup is easy if you are self-supporting.",
      "permits": "No day-trip permit is noted. Follow St. Croix National Scenic Riverway rules at landings and any posted town-park or campground rules at the Trego finish.",
      "camping": "NPS lists four campsites along this trip, including group-site support and potable water at Earl Park Landing. Trego Town Park Campground is also at the take-out corridor if you want to turn this into a low-friction overnight.",
      "summary": "Put in at Big Bend Landing and take out at Trego Town Park Landing. Expect a mellow wooded first half, a prettier busier stretch past Earl Park, and a slower braided finish toward Trego that gets scratchier first when the river is low.",
      "accessCaveats": [
        "Do not confuse the Trego Town Park finish with the permanently closed Lakeside Road picnic area and parking lot called out on the NPS maps page.",
        "Trego Town Park is part of an active campground corridor, so summer parking and launch space can feel busier than a quiet roadside landing.",
        "This route is beginner-friendly by Riverway standards, but the take-out still deserves a same-day look if your group has not used the Trego landing before."
      ],
      "watchFor": [
        "Occasional rock gardens and one quicker stretch near Highway 63.",
        "Scraping or channel-picking around the islands below Highway 63 in lower water.",
        "Tubing traffic and landing congestion around Earl Park and Trego on hot summer weekends."
      ]
    }
  },
  "st-croix-river-fox-highway-70": {
    "putIn": {
      "name": "Fox Landing",
      "latitude": 45.89030603,
      "longitude": -92.71283975
    },
    "takeOut": {
      "name": "Highway 70 boat launch",
      "latitude": 45.77399682,
      "longitude": -92.77959116
    },
    "logistics": {
      "distanceLabel": "9.75 mi",
      "estimatedPaddleTime": "About 3 hr 15 min to 4 hr 30 min",
      "shuttle": "Plan a longer shuttle and budget time for the steep approach near Fox Landing. Low-clearance vehicles should be cautious on the rougher road section.",
      "permits": "No route-specific paddling permit is known. Follow Saint Croix National Scenic Riverway rules and any posted landing restrictions.",
      "camping": "Designated riverside campsites exist on this Riverway reach, including the Sandrock Cliffs area above Highway 70. Follow current St. Croix National Scenic Riverway camping rules and do not assume every landing itself allows overnight use.",
      "summary": "Use Fox Landing as the put-in and Highway 70 as the take-out. The gauge tells you when the route stops being too scrapy, but wind and broad-channel effort still shape the day.",
      "accessCaveats": [
        "Both landings are backed by Wisconsin DNR inventory records, but the inventory is not a full landing-rules page.",
        "The Fox Landing approach road is rougher and steeper than a typical flat park launch."
      ],
      "watchFor": [
        "Low-water scraping and channel-picking around islands and boulder gardens.",
        "Wind on the wide channel, especially if it turns into a long headwind day.",
        "Level-dependent rapids that become more serious than the score alone suggests."
      ]
    }
  },
  "st-croix-river-gordon-dam-riverside": {
    "putIn": {
      "name": "Gordon Dam Landing",
      "latitude": 46.2536,
      "longitude": -91.92809
    },
    "takeOut": {
      "name": "Riverside Landing",
      "latitude": 46.076,
      "longitude": -92.246002
    },
    "logistics": {
      "distanceLabel": "23.4 mi",
      "estimatedPaddleTime": "Full day or overnight; many groups split it with Riverway campsites",
      "shuttle": "Long upper-Riverway shuttle from Gordon Dam Landing to Riverside Landing. Use NPS Map 4 to plan intermediate landings such as County Road T, Schoen Park, Dry Landing, and CCC Bridge before committing to the full 23-plus miles.",
      "permits": "Follow St. Croix National Scenic Riverway rules. No day-paddling permit is assumed here, but camping, glass-container, pet, quiet-hour, and park-specific rules apply on Riverway lands.",
      "camping": "This is the strongest overnight candidate among the three adds. NPS Map 4 and American Whitewater document designated river campsites along the reach, but summer weekends can fill; plan small or large campsite capacity, water, and legal campsite spacing before launching.",
      "summary": "Launch at Gordon Dam Landing and finish at Riverside Landing after the Namekagon confluence corridor. The route is a long Wild and Scenic Riverway paddle with boulder-bed Class I-II rapids, public landing options, and enough remoteness that conservative groups should plan it as an overnight.",
      "accessCaveats": [
        "Do not start the full reach unless the shuttle, campsite plan, and daylight plan are realistic for a 23.4-mile trip.",
        "Intermediate landings make shorter sections possible, but each landing and campsite should be verified on the latest NPS map before use.",
        "Bring drinking water or treatment; NPS warns river water is not safe to drink unless purified."
      ],
      "watchFor": [
        "Low-water rock dodging and possible wading through boulder-bed rapids.",
        "Class I-II rapids before Scott Bridge, Fish Trap Rapids with no portage, and more rapids near Big Island and Riverside.",
        "Coppermine Dam / sluice hazards; scout the chute or use the right-side portage.",
        "Fallen trees, cold water, ticks, poison ivy, and slow rescue response in the upper Riverway."
      ]
    }
  },
  "st-croix-river-riverside-thayers": {
    "putIn": {
      "name": "Riverside Landing",
      "latitude": 46.076,
      "longitude": -92.246002
    },
    "takeOut": {
      "name": "Thayers Landing",
      "latitude": 46.0123699903488,
      "longitude": -92.4438199996948
    },
    "logistics": {
      "distanceLabel": "13.4 mi",
      "estimatedPaddleTime": "About 6 hr to 7 hr, longer with low water, wind, or campsite stops",
      "shuttle": "Stage Thayers Landing at the Wisconsin end of the Highway 48/77 bridge, then drive back to Riverside. Check the NPS Map 5 landings, current Danbury reading, and wind forecast before committing to the full middle-river day.",
      "permits": "No route-specific day-paddling permit is known. Follow St. Croix National Scenic Riverway rules, Wisconsin/Minnesota boating and PFD rules, and all posted landing, campsite, glass-container, pet, sanitation, and quiet-hour restrictions.",
      "camping": "NPS/WTG support two individual and two group Riverway campsites in the SC3 corridor. Use only designated first-come Riverway campsites, respect the three-night limit, and do not treat private banks or unsigned islands as camping options.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Riverside Landing and take out at Thayers Landing for the missing SC3 link below the existing Gordon-to-Riverside card. This is a long scenic St. Croix day with one Class I-II rapid area, official campsite support, and a currently low Danbury gauge.",
      "accessCaveats": [
        "The Danbury DNR gauge is at the put-in corridor and is the product gauge, but several tributaries enter before Thayers. Make same-day visual and wind checks rather than trusting the number alone.",
        "NPS says river conditions vary along the 255-mile Riverway and tells paddlers to check USGS/river levels or contact a ranger before launching.",
        "Use Riverside and Thayers as the planned public endpoints. Do not improvise on private banks except for true emergencies."
      ],
      "watchFor": [
        "State Line Rapids, shallow rock-dodging below the official scrapable floor, and slower island-channel choices.",
        "Fallen trees and strainers, cold water, ticks, poison ivy, and limited remote rescue.",
        "Wind on the wider lower half and long-day fatigue if the group treats this as a casual float."
      ]
    },
    "accessPoints": [
      {
        "id": "st-croix-riverside-landing",
        "name": "Riverside Landing",
        "latitude": 46.076,
        "longitude": -92.246002,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream endpoint at the Danbury gauge corridor."
      },
      {
        "id": "st-croix-thayers-landing",
        "name": "Thayers Landing",
        "latitude": 46.0123699903488,
        "longitude": -92.4438199996948,
        "mileFromStart": 13.4,
        "segmentKind": "creek",
        "note": "Default downstream endpoint at the Wisconsin end of the Highway 48/77 bridge."
      }
    ]
  },
  "st-croix-river-thayers-norway-point": {
    "putIn": {
      "name": "Thayers Landing",
      "latitude": 46.0123699903488,
      "longitude": -92.4438199996948
    },
    "takeOut": {
      "name": "Norway Point Landing",
      "latitude": 45.9240200519562,
      "longitude": -92.6399600505829
    },
    "logistics": {
      "distanceLabel": "14.3 mi",
      "estimatedPaddleTime": "About 6 hr, longer with wind, low water, or campsite stops",
      "shuttle": "Stage Norway Point first, then drive back to Thayers. Confirm whether Little Yellow Banks, St. Croix State Park Landing, or Sand Creek are backup access/campsite points before launching because this is a broad, protected but remote corridor.",
      "permits": "No route-specific day-paddling permit is known. Follow St. Croix National Scenic Riverway rules, Minnesota/Wisconsin boating and PFD rules, and posted state-park or landing rules if using any Minnesota-side access.",
      "camping": "WTG says SC4 has four individual and two group NPS campsites, and St. Croix State Park also provides direct river access and campground context. Use only designated/legal sites and do not camp on private banks or unsigned islands.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Thayers Landing and take out at Norway Point for the quietwater SC4 link. It is easier than the downstream rapid split, but it still needs a Danbury gauge check, wind judgment, and precise landing navigation.",
      "accessCaveats": [
        "Danbury is upstream of this route and should be treated as a corridor proxy once tributary inflow and wind affect the broad lower water.",
        "NPS Map 5 warns that the St. Croix State Park main landing sits behind an island on river right and is easy to miss.",
        "Norway Point is the planned Wisconsin take-out. Do not drift into the SC5 rapid corridor unless your group has planned that separate route."
      ],
      "watchFor": [
        "Wide-channel wind, slow progress, sandbars in low water, wooded island channels, and missed landings.",
        "Fallen trees, strainers, cold water, ticks, poison ivy, and limited remote rescue.",
        "Private banks and campsite capacity/rule limits on busy summer weekends."
      ]
    },
    "accessPoints": [
      {
        "id": "st-croix-thayers-landing",
        "name": "Thayers Landing",
        "latitude": 46.0123699903488,
        "longitude": -92.4438199996948,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream endpoint at the Wisconsin end of the Highway 48/77 bridge."
      },
      {
        "id": "st-croix-little-yellow-banks",
        "name": "Little Yellow Banks Landing",
        "latitude": 45.975319981575,
        "longitude": -92.5411800146103,
        "mileFromStart": 5.1,
        "segmentKind": "creek",
        "note": "Intermediate access/campsite context from WTG GPX and NPS map materials."
      },
      {
        "id": "st-croix-state-park-landing",
        "name": "St. Croix State Park Landing",
        "latitude": 45.9499399662018,
        "longitude": -92.5681400299072,
        "mileFromStart": 8.4,
        "segmentKind": "creek",
        "note": "Minnesota-side state-park landing; verify current park access and camping rules if using it."
      },
      {
        "id": "st-croix-sand-creek-landing",
        "name": "Sand Creek Landing",
        "latitude": 45.9329299926758,
        "longitude": -92.6403000354767,
        "mileFromStart": 13.1,
        "segmentKind": "creek",
        "note": "Downstream backup landing just above Norway Point."
      },
      {
        "id": "st-croix-norway-point-landing",
        "name": "Norway Point Landing",
        "latitude": 45.9240200519562,
        "longitude": -92.6399600505829,
        "mileFromStart": 14.3,
        "segmentKind": "creek",
        "note": "Default take-out on the Wisconsin side before the SC5 rapid corridor."
      }
    ]
  },
  "st-croix-river-norway-point-fox": {
    "putIn": {
      "name": "Norway Point Landing",
      "latitude": 45.9240200519562,
      "longitude": -92.6399600505829
    },
    "takeOut": {
      "name": "Fox Landing",
      "latitude": 45.89030603,
      "longitude": -92.71283975
    },
    "logistics": {
      "distanceLabel": "About 4.6 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with scouting or a low-water main-channel line",
      "shuttle": "Stage Fox Landing first, then return to Norway Point. Make the channel decision before launch: the left main channel keeps Fox as the exit, while the right Kettle River Slough misses Fox and needs a separate downstream plan.",
      "permits": "No route-specific day-paddling permit is known. Follow St. Croix National Scenic Riverway rules, Wisconsin/Minnesota boating and PFD rules, and posted landing/campsite restrictions.",
      "camping": "Norway Point has NPS campsite context, and the broader SC5 corridor has extensive designated Riverway campsites. This short split is usually a day route; use only designated legal campsites if folding it into an overnight.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Norway Point and take out at Fox Landing for the upper SC5 rapid split. The route exists to expose the Head of the Rapids decision without forcing the full Fox-to-Highway-70 continuation.",
      "accessCaveats": [
        "Danbury is the product gauge, but WTG says the Norway Point local gauge controls the Kettle River Slough decision. Check both when possible.",
        "If Fox is your take-out, stay with the left main channel. NPS Map 6 explicitly warns that the Kettle River Slough route misses Fox Landing.",
        "Fox Landing has a rougher approach road and should be inspected before launching, especially with low-clearance vehicles or wet conditions."
      ],
      "watchFor": [
        "Head of the Rapids channel decision, Big Beef Rapids, August Olsen Rapids downstream of the confluence, and ledges around the Slough return.",
        "Low water below the official DNR scrapable band, when rocky rapids and the Slough can become too shallow.",
        "High local Norway readings above 8 ft, when WTG says the Slough becomes pushy; above 10 ft is flood-stage with harder conditions."
      ]
    },
    "accessPoints": [
      {
        "id": "st-croix-norway-point-landing",
        "name": "Norway Point Landing",
        "latitude": 45.9240200519562,
        "longitude": -92.6399600505829,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the developed Wisconsin landing before the SC5 rapid corridor."
      },
      {
        "id": "st-croix-fox-landing",
        "name": "Fox Landing",
        "latitude": 45.89030603,
        "longitude": -92.71283975,
        "mileFromStart": 4.6,
        "segmentKind": "creek",
        "note": "Default take-out on the left main channel. Taking the Kettle River Slough bypasses this landing."
      }
    ]
  },
  "baraboo-river-glenville-luebke": {
    "putIn": {
      "name": "Glenville Landing / Highway 113",
      "latitude": 43.45828,
      "longitude": -89.71452
    },
    "takeOut": {
      "name": "Luebke Landing / County Road W",
      "latitude": 43.46578,
      "longitude": -89.65695
    },
    "logistics": {
      "distanceLabel": "5.1 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr",
      "shuttle": "Use a short rural car shuttle from Glenville Landing at Highway 113 to Luebke Landing on County Road W. Wisconsin River Trips maps the bike shuttle at about 3.5 miles with modest climbing, but County Road W traffic and shoulder conditions should be checked before choosing a bike shuttle.",
      "permits": "No route-specific paddling permit is known. Follow posted parking and landing rules at both Sauk County / Baraboo River access sites.",
      "camping": "No on-route camping is expected. The Baraboo River map notes that most riverfront land is private and that camping is not allowed along the river.",
      "summary": "Put in at Glenville Landing off Highway 113 southeast of Baraboo and take out at Luebke Landing on County Road W. This short lower-Baraboo route is easy at normal levels, with steady current, floodplain woods, muddy banks, and enough wood risk to make high-water judgment important.",
      "accessCaveats": [
        "Sauk County mapping lists both Glenville and Luebke as river landings with parking, but no restrooms at either site.",
        "Glenville can be muddy after heavy rain, and Luebke is a boat ramp but still a small river landing rather than a full-service paddling facility.",
        "Most banks along the Baraboo are private; use the named landings and avoid casual bank exits unless safety requires it."
      ],
      "watchFor": [
        "Strainers, downed trees, and fresh logjams after wind or rain events.",
        "Faster, muddier current that can push paddlers into wood above the average stage band.",
        "Steep muddy banks and slippery carries if a blockage forces an unplanned portage."
      ]
    }
  },
  "sugar-river-belleville-county-x": {
    "putIn": {
      "name": "Belleville Community Park (Sugar River)",
      "latitude": 42.86083,
      "longitude": -89.53419
    },
    "takeOut": {
      "name": "County Road X bridge access (Sugar River)",
      "latitude": 42.79994,
      "longitude": -89.48646
    },
    "logistics": {
      "distanceLabel": "10.25 mi",
      "estimatedPaddleTime": "About 3 hr 30 min to 4 hr 45 min",
      "shuttle": "Plan a car shuttle and confirm parking rules at both endpoints.",
      "permits": "No paddling permit noted. Village of Belleville parks are open 6 a.m. to 10 p.m.; check Community Park and County Road X signage for any more specific parking rules.",
      "camping": "No established camping documented for this segment. Treat it as a day trip.",
      "summary": "Put in at Belleville Community Park and take out at County Road X. This is a mellow but full-feeling day with several riffles and wooded bends; use the Verona gauge because both low-water scraping and pushier high water change the character quickly.",
      "accessCaveats": [
        "Belleville Community Park is subject to official village park hours and vehicle rules, but the exact river-launch pattern and County Road X parking setup are still best confirmed on the ground.",
        "The low-water floor matters more than a precise sweet spot on this reach."
      ],
      "watchFor": [
        "Shallows and grounding below the normal Verona-gauge window.",
        "Pushier current, poorer clarity, and harder strainer avoidance above the high-water caution band.",
        "Muddy bottom, tight bends, and occasional strainers after storms.",
        "Stay clear of the Belleville dam or spillway upstream of the put-in."
      ]
    }
  },
  "sugar-river-county-road-x-county-road-ee": {
    "putIn": {
      "name": "County Road X bridge access (Sugar River)",
      "latitude": 42.79994,
      "longitude": -89.48646
    },
    "takeOut": {
      "name": "County Road EE bridge access (Sugar River)",
      "latitude": 42.73374,
      "longitude": -89.44287
    },
    "logistics": {
      "distanceLabel": "11.5 mi",
      "estimatedPaddleTime": "About 3 hr 45 min to 5 hr 15 min",
      "shuttle": "Plan a car shuttle and confirm parking etiquette at both bridge accesses before leaving a vehicle.",
      "permits": "No route-specific paddling permit noted. Check County Road X and County Road EE signage for any local parking limits or closures.",
      "camping": "No established camping documented for this segment. Treat it as a day trip.",
      "summary": "Use the County Road X bridge access south of Belleville and finish at County Road EE north of Albany. This is a mellow wooded float, but low water and the full 11.5-mile length make the day feel bigger than it first looks.",
      "accessCaveats": [
        "These accesses are supported by the regional Capitol Water Trails map, and Wisconsin DNR confirms downstream public parking and a boat launch in the Albany Wildlife Area corridor, but the exact County Road EE bridge landing still deserves a same-day check.",
        "County bridge landings can be muddy or debris-prone after rain, especially on the take-out side."
      ],
      "watchFor": [
        "Low water slowing the day down or causing repeated grounding.",
        "Strainers or fresh deadfall on outer bends after storms.",
        "Fatigue, food, and weather management on a longer flatwater day."
      ]
    }
  },
  "baraboo-river-haskins-glenville": {
    "putIn": {
      "name": "Haskins Park ADA kayak launch",
      "latitude": 43.46997,
      "longitude": -89.76158
    },
    "takeOut": {
      "name": "Glenville Landing / Highway 113 boat landing",
      "latitude": 43.45853,
      "longitude": -89.71399
    },
    "logistics": {
      "distanceLabel": "4.5 mi",
      "estimatedPaddleTime": "About 1 hr 15 min to 2 hr",
      "shuttle": "Use a short Baraboo-area car shuttle between Haskins Park in West Baraboo and Glenville Landing on Highway 113. A bike shuttle is practical through town and along the riverwalk, but the final Highway 113 approach has traffic exposure.",
      "permits": "No route-specific paddling permit is known. Follow posted Haskins Park and Glenville Landing parking rules, and avoid blocking the landing or ADA kayak-launch approach.",
      "camping": "No on-route camping is expected. This is a short urban day route through Baraboo and past Circus World, not an overnight corridor.",
      "summary": "Launch from Haskins Park and paddle the short Baraboo Rapids corridor through downtown Baraboo to Glenville Landing. The route is short and popular, but it has real current, riffles, and Class I ledges, so use the Baraboo gauge and scout if recent rain has changed wood or strainers.",
      "accessCaveats": [
        "Haskins Park is the clean public start; the Baraboo River Corridor Plan documents a non-motorized boat launch, floating pier, and ADA-accessible kayak launch there.",
        "Glenville Landing is a public Highway 113 landing with parking, but muddy/silty conditions are common after rain or high water.",
        "The route runs through an urban corridor with bridges, public parks, museum property, and private edges. Stay in the river corridor and use only established landings."
      ],
      "watchFor": [
        "Riffles and Class I ledges, especially around downtown Baraboo and the former dam/bridge corridors.",
        "Strainers, bridge approaches, muddy banks, and higher-water push if the Baraboo gauge is rising.",
        "Low-water rock bumps below the 350 cfs same-route minimum, plus cold water in spring and fall."
      ]
    }
  },
  "baraboo-river-rock-springs-north-freedom": {
    "putIn": {
      "id": "rock-springs-firemens-park-canoe-landing",
      "name": "Rock Springs Firemen's Park canoe landing",
      "latitude": 43.4779,
      "longitude": -89.9143
    },
    "takeOut": {
      "id": "north-freedom-canoe-launch",
      "name": "North Freedom Canoe Launch / Firemen's Park",
      "latitude": 43.4569,
      "longitude": -89.86326
    },
    "logistics": {
      "distanceLabel": "About 7 mi from Firemen's Park; 8.2 mi from the upstream Highway 136 gorge put-in",
      "estimatedPaddleTime": "About 3 hr to 4 hr, plus time for any logjam scouting",
      "shuttle": "Stage a car at the North Freedom Canoe Launch, then launch from the Rock Springs landing off County Road DD south of the Highway 136 bridge. The longer Wisconsin River Trips version starts upstream near Ableman Gorge, but this card defaults to the official Rock Springs landing.",
      "permits": "No route-specific paddling permit is known. Follow posted Rock Springs and North Freedom park or launch rules, and keep vehicles clear of the landings.",
      "camping": "No on-route camping is documented. Treat this as a day trip unless separately arranging lodging or a legal campground away from the river corridor.",
      "campingClassification": "none",
      "summary": "Launch at the Rock Springs public landing and paddle the Baraboo toward North Freedom. This reach has gentle current, quartzite-bluff scenery, railroad bridges, muddy banks, and enough deadfall history that the Reedsburg gauge and same-day wood conditions both matter.",
      "accessCaveats": [
        "The Baraboo River map places the Rock Springs landing and parking off County Road DD just south of the Highway 136 bridge, with restrooms in the park across the street.",
        "Wisconsin River Trips calls Firemen's Park the official Rock Springs canoe launch but notes the launch can be muddy and awkward; the upstream Highway 136 / Ableman Gorge put-in is scenic but less formal.",
        "North Freedom has a public canoe launch with parking, restrooms, picnic tables, and a kayak dock, but a small launch fee may be posted."
      ],
      "watchFor": [
        "Minor logjams between Rock Springs and North Freedom that may require portage.",
        "Strainers, muddy banks, and poor footing when entering, landing, or scouting.",
        "Higher water above the WRT target range, when the river gets pushier and wood avoidance becomes less forgiving."
      ]
    },
    "accessPoints": [
      {
        "id": "rock-springs-firemens-park-canoe-landing",
        "name": "Rock Springs Firemen's Park canoe landing",
        "latitude": 43.4779,
        "longitude": -89.9143,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default public put-in off County Road DD just south of the Highway 136 bridge."
      },
      {
        "id": "north-freedom-canoe-launch",
        "name": "North Freedom Canoe Launch / Firemen's Park",
        "latitude": 43.4569,
        "longitude": -89.86326,
        "mileFromStart": 7,
        "segmentKind": "creek",
        "note": "Default take-out in North Freedom; Wisconsin River Trips describes this as an excellent public launch with a kayak dock."
      }
    ]
  },
  "baraboo-river-north-freedom-giese": {
    "putIn": {
      "id": "north-freedom-canoe-launch",
      "name": "North Freedom Canoe Launch / Firemen's Park",
      "latitude": 43.4569,
      "longitude": -89.86326
    },
    "takeOut": {
      "id": "giese-park-canoe-launch",
      "name": "Giese Park canoe launch",
      "latitude": 43.4629,
      "longitude": -89.8042
    },
    "logistics": {
      "distanceLabel": "7.4 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr",
      "shuttle": "Use a short Sauk County car shuttle between North Freedom Firemen's Park and Giese Park on Hatchery Road. Wisconsin River Trips lists a practical bike shuttle, but rural roads and launch timing should still be planned.",
      "permits": "No route-specific paddling permit is known. Follow posted launch, parking, and park-hour rules at North Freedom and Giese Park.",
      "camping": "No on-route camping is documented. Town of Baraboo specifically says Giese Park has no overnight camping, so use this as a day route.",
      "campingClassification": "none",
      "summary": "Put in at North Freedom and paddle to Giese Park through a mostly quiet Baraboo River corridor with sandstone outcrops, an artesian-well area, railroad bridges, one easy Class I riffle, muddy banks, and generally cleared but still relevant wood.",
      "accessCaveats": [
        "North Freedom is a public launch with parking, restrooms, picnic tables, and a floating kayak dock; check for any current local launch fee or signage.",
        "Giese Park is a Town of Baraboo river-access park at Hatchery Road and Rock Hill Road with summer portable restrooms and no overnight camping.",
        "The route has few good informal stops because banks are muddy and often private."
      ],
      "watchFor": [
        "The easy Class I riffle under Kohlmeyer Road, especially if water is high or debris has shifted.",
        "Downed trees and strainers along banks; stay away from wood at higher water.",
        "Mud at landings, private banks, and cold-water exposure outside summer."
      ]
    },
    "accessPoints": [
      {
        "id": "north-freedom-canoe-launch",
        "name": "North Freedom Canoe Launch / Firemen's Park",
        "latitude": 43.4569,
        "longitude": -89.86326,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default public put-in in North Freedom."
      },
      {
        "id": "kohlmeyer-road-bridge",
        "name": "Kohlmeyer Road bridge",
        "latitude": 43.4862,
        "longitude": -89.8333,
        "mileFromStart": 4.3,
        "segmentKind": "creek",
        "note": "Bridge landmark near the route's easy Class I riffle; not the default access."
      },
      {
        "id": "giese-park-canoe-launch",
        "name": "Giese Park canoe launch",
        "latitude": 43.4629,
        "longitude": -89.8042,
        "mileFromStart": 7.4,
        "segmentKind": "creek",
        "note": "Default take-out at the Town of Baraboo river-access park on Hatchery Road."
      }
    ]
  },
  "baraboo-river-giese-haskins": {
    "putIn": {
      "id": "giese-park-canoe-launch",
      "name": "Giese Park canoe launch",
      "latitude": 43.4629,
      "longitude": -89.8042
    },
    "takeOut": {
      "id": "haskins-park-ada-kayak-launch",
      "name": "Haskins Park ADA kayak launch",
      "latitude": 43.46997,
      "longitude": -89.76158
    },
    "logistics": {
      "distanceLabel": "About 3.5 mi",
      "estimatedPaddleTime": "About 1 hr to 1 hr 45 min",
      "shuttle": "Stage the take-out at Haskins Park in West Baraboo, then launch at Giese Park on Hatchery Road. This short leg is often combined with downstream Baraboo paddling, but Haskins is the planned finish for this route card.",
      "permits": "No route-specific paddling permit is known. Follow Town of Baraboo park hours at Giese Park and City of Baraboo / West Baraboo signage at Haskins Park.",
      "camping": "No on-route camping. Town of Baraboo says Giese Park has no overnight camping, and Haskins is an urban day-use landing.",
      "campingClassification": "none",
      "summary": "Launch from Giese Park and paddle into West Baraboo to the Haskins Park ADA kayak launch. The leg is short and mostly straightforward, but it sits immediately above the Baraboo Rapids corridor, so take out at Haskins unless you intentionally planned the separate downstream route.",
      "accessCaveats": [
        "Giese Park has river access and seasonal portable restrooms but no overnight camping.",
        "Haskins Park is the cleaner public take-out and start for the downstream Baraboo Rapids card.",
        "The Baraboo map treats Giese-to-Glenville as a larger corridor with exposed-rock difficulty below 250 cfs; this card uses that as the conservative low-water floor."
      ],
      "watchFor": [
        "Exposed rocks and slower passage when the Baraboo gauge drops below the official 250 cfs floor.",
        "Strainers, muddy banks, and private shoreline before West Baraboo.",
        "The downstream Haskins-to-Glenville riffles and Class I ledges if you miss or skip the planned take-out."
      ]
    },
    "accessPoints": [
      {
        "id": "giese-park-canoe-launch",
        "name": "Giese Park canoe launch",
        "latitude": 43.4629,
        "longitude": -89.8042,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the Town of Baraboo river-access park."
      },
      {
        "id": "haskins-park-ada-kayak-launch",
        "name": "Haskins Park ADA kayak launch",
        "latitude": 43.46997,
        "longitude": -89.76158,
        "mileFromStart": 3.5,
        "segmentKind": "creek",
        "note": "Default take-out and the start of the separate downstream Baraboo Rapids route."
      }
    ]
  },
  "sugar-river-highway-x-attica": {
    "putIn": {
      "name": "Highway X public access",
      "latitude": 42.754137,
      "longitude": -89.429329
    },
    "takeOut": {
      "name": "Attica Highway C Access",
      "latitude": 42.733903,
      "longitude": -89.406695
    },
    "logistics": {
      "distanceLabel": "5.4 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr",
      "shuttle": "Use the short rural shuttle between the Highway X landing and the Attica Highway C access. Wisconsin River Trips reports the bike shuttle as about 2.7 miles with little climbing.",
      "permits": "No route-specific paddling permit is known. Check posted access and roadside parking rules before leaving a vehicle.",
      "camping": "No on-route camping is documented for this short reach. Treat it as a day paddle.",
      "summary": "Put in at the Highway X public access and take out at the Attica Highway C access. This is a simple lower-Sugar float with easy current, a wooded final mile, and a clear Verona-gauge ladder.",
      "accessCaveats": [
        "The accesses are bridge-area public landings, so confirm parking and bank conditions before committing to the shuttle.",
        "This route overlaps the upstream half of the longer County Road X to County Road EE entry, but the Attica take-out creates a shorter, cleaner beginner day."
      ],
      "watchFor": [
        "Low-water scraping below the normal summer range.",
        "Strainers after storms or at higher, pushier levels.",
        "Turbid water, limited scenery on some open-bank miles, and cold-water exposure outside summer."
      ]
    }
  },
  "sugar-river-attica-albany": {
    "putIn": {
      "id": "attica-highway-c-access",
      "name": "Attica Highway C Access",
      "latitude": 42.77021,
      "longitude": -89.47913
    },
    "takeOut": {
      "id": "albany-public-boat-launch",
      "name": "Albany Public Boat Launch / Legion Park",
      "latitude": 42.71007,
      "longitude": -89.43966
    },
    "logistics": {
      "distanceLabel": "9 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer below the Verona floor",
      "shuttle": "Use a rural two-car shuttle from Albany back to the Attica County Road C access. Scout the Albany take-out before launching because the dam corridor and tube traffic can make the final approach busier than the upstream miles.",
      "permits": "No route-specific paddling permit is known. Follow posted Green County, Attica, and Albany park or launch rules, and keep vehicles in legal parking areas.",
      "camping": "No on-route camping is documented for this lower-Sugar day route. Treat Albany-area parks, private campgrounds, or lodging as separate base-camp planning rather than river-camping permission.",
      "campingClassification": "none",
      "summary": "Launch from the Attica Highway C access and take out at the public Albany launch near Madison Street / Legion Park. This fills the downstream continuation below Highway X-to-Attica with easy current, low-water sensitivity, private-bank limits, and a conservative minimum-only Verona gauge model.",
      "accessCaveats": [
        "Miles Paddled publishes both endpoint coordinates and describes the Albany finish as a public boat launch off Madison Street.",
        "The Village of Albany says Legion Park sits on the river shore and offers a boat launch, but same-day parking, tube traffic, or local events can still affect staging.",
        "The Verona gauge is upstream of this route, so it is useful as a low-water floor rather than a complete high-water decision model."
      ],
      "watchFor": [
        "Very shallow and frustrating conditions below 60 cfs on the Verona gauge.",
        "Strainers, downed trees, muddy banks, and faster push after storms.",
        "Private banks and warm-weather user traffic near Albany.",
        "The Albany dam and millrace corridor downstream of the take-out; finish at the public launch unless intentionally following a separate local plan."
      ]
    },
    "accessPoints": [
      {
        "id": "attica-highway-c-access",
        "name": "Attica Highway C Access",
        "latitude": 42.77021,
        "longitude": -89.47913,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the County Road C / Attica bridge corridor."
      },
      {
        "id": "albany-public-boat-launch",
        "name": "Albany Public Boat Launch / Legion Park",
        "latitude": 42.71007,
        "longitude": -89.43966,
        "mileFromStart": 9,
        "segmentKind": "creek",
        "note": "Default take-out at the Madison Street / Albany public launch corridor."
      }
    ]
  },
  "chippewa-river-county-a-highway-8": {
    "putIn": {
      "name": "Imalone / County A Bridge access",
      "latitude": 45.552358,
      "longitude": -91.228388
    },
    "takeOut": {
      "name": "Highway 8 Canoe Landing",
      "latitude": 45.452909,
      "longitude": -91.256361
    },
    "logistics": {
      "distanceLabel": "9 mi",
      "estimatedPaddleTime": "About 4 hr",
      "shuttle": "Use a rural car shuttle between the Imalone / County A bridge access and the Highway 8 canoe landing east of the bridge in Bruce. The roads are straightforward but too long for most casual bike shuttles.",
      "permits": "No route-specific paddling permit is known. Follow posted Rusk County and Wisconsin public-access rules, and do not block roadside parking at the hand-carry put-in.",
      "camping": "No on-route camping is documented for this day section. Treat it as a day paddle unless separately planning a longer upper-Chippewa trip.",
      "summary": "Launch at the Imalone / County A access and finish at Highway 8 Canoe Landing in Bruce. This upper-Chippewa section is mostly easy current with wooded banks, island channels, riffles, and boulder gardens, but it still needs the Bruce gauge to stay above the practical minimum.",
      "accessCaveats": [
        "Rusk County publishes the Imalone Boat Access and Highway 8 Canoe Landing coordinates for the Imalone-to-Bruce route.",
        "Wisconsin Trail Guide describes the County A put-in as a hand-carry access east of the bridge, upstream side, with roadside parking and a short downslope carry.",
        "The Highway 8 landing entrance is east of the bridge near Sawdust Road and has a trailer-access ramp and parking."
      ],
      "watchFor": [
        "Light riffles and boulder gardens that become scrapier below the 400 cfs / 1.5 ft minimum.",
        "Island splits, faster current near the left fork around islands, overhanging trees, and fresh wood.",
        "High or rising water after heavy rain or Arpin Dam releases, when novice paddlers should use extra caution."
      ]
    }
  },
  "chippewa-river-county-d-imalone": {
    "putIn": {
      "name": "County D Bridge landing",
      "latitude": 45.671121,
      "longitude": -91.18108
    },
    "takeOut": {
      "name": "Imalone / County A Bridge access",
      "latitude": 45.552358,
      "longitude": -91.228388
    },
    "logistics": {
      "distanceLabel": "10.7 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr",
      "shuttle": "Use a rural car shuttle between the County D bridge east of Exeland and the Imalone / County A access. The route is long enough and remote enough that a bike shuttle is usually more hassle than it is worth.",
      "permits": "No route-specific paddling permit is known. Follow posted Rusk County and Wisconsin public-access rules, and do not block bridge approaches, dirt-ramp access, or roadside parking.",
      "camping": "No on-route camping is documented for this whitewater-lite upper-Chippewa section. Treat it as a day paddle unless you are separately basing out nearby.",
      "summary": "Launch at the County D bridge landing and finish at Imalone / County A. Expect a lively upper-Chippewa run with repeated riffles, several named rapids, wooded islands, and a direct Bruce gauge floor that matters.",
      "accessCaveats": [
        "Rusk County publishes the County D Bridge and Imalone Boat Access coordinates for this exact route.",
        "Wisconsin Trail Guide describes the County D launch as a rutted dirt-track trailer ramp off the east end of the bridge and the County A finish as a hand-carry access just upstream of the bridge.",
        "Confirm local landing condition, shoulder space, and any recent storm debris before committing to the shuttle."
      ],
      "watchFor": [
        "Rock Ledge, Otter Slide Rapids, Soo Line Rapids, and many smaller class-I riffles.",
        "Fast island channels, overhanging trees, strainers, and fresh deadfall.",
        "Exposed rocks and hidden boulders at lower levels, plus stronger wave trains after rain or Arpin Dam releases."
      ]
    }
  },
  "chippewa-river-county-d-highway-8": {
    "putIn": {
      "name": "County D Bridge landing",
      "latitude": 45.671121,
      "longitude": -91.18108
    },
    "takeOut": {
      "name": "Highway 8 Canoe Landing",
      "latitude": 45.452909,
      "longitude": -91.256361
    },
    "logistics": {
      "distanceLabel": "19.7 mi",
      "estimatedPaddleTime": "About 8 hr to 9 hr",
      "shuttle": "Use a full two-car rural shuttle between County D and Highway 8 at Bruce. This is a real all-day move with too much distance and too many county-road miles for a casual bike return.",
      "permits": "No route-specific paddling permit is known. Follow posted Rusk County and Wisconsin public-access rules, and stage vehicles without blocking bridge shoulders, dirt ramps, or the Highway 8 landing entrance.",
      "camping": "No on-route camping is documented for the full County D-to-Bruce combination. Treat it as a long day route rather than an overnight unless you have separately arranged basecamp lodging.",
      "summary": "Start at County D and finish at Highway 8 Landing in Bruce. This combines the faster upper rapids-and-riffles miles with the quieter Imalone-to-Bruce finish into one long direct-gauge Chippewa day.",
      "accessCaveats": [
        "This route is a stitched public chain built from the documented County D-to-County A and County A-to-Highway-8 segments, all on the same river and same Bruce gauge.",
        "County D is the rougher access with a dirt approach, while Highway 8 is the cleaner trailer-ramp finish near Sawdust Road.",
        "Because the route is long, check the gauge and weather again shortly before launching instead of relying on an earlier drive-by."
      ],
      "watchFor": [
        "Named rapids and boulder gardens in the upper half, especially if the river is high or rising.",
        "Island splits, strainers, and fresh wood through the middle wooded corridor.",
        "Fatigue, slow progress, and a late finish on a nearly twenty-mile day if headwinds or low water sap your pace."
      ]
    }
  },
  "chippewa-river-highway-8-flambeau-river": {
    "putIn": {
      "name": "Highway 8 Canoe Landing",
      "latitude": 45.452909,
      "longitude": -91.256361
    },
    "takeOut": {
      "name": "Highway E / Flater's Resort take-out",
      "latitude": 45.297997,
      "longitude": -91.237
    },
    "logistics": {
      "distanceLabel": "18.6 mi",
      "estimatedPaddleTime": "About 8 hr to 10 hr",
      "shuttle": "Use a long rural car shuttle between the Highway 8 canoe landing at Bruce and the Highway E / Flater's Resort take-out near the Flambeau confluence. The distance and road layout make a bike shuttle unrealistic for most groups.",
      "permits": "No route-specific paddling permit is known. Follow posted Rusk County, resort-access, and Wisconsin public-waterway rules, and confirm take-out expectations if you plan to linger at the resort corridor.",
      "camping": "Camping is available near the take-out at Flater's Flambeau Point Resort, which Rusk County lists with campsites and hookups. Confirm reservations, fees, and current operating details directly before relying on it.",
      "summary": "Launch at Highway 8 Landing and finish near the Flambeau confluence at Highway E / Flater's Resort. This is a long easy Chippewa float with broad bends, marshy sloughs, frequent islands, and one named class-I rapid.",
      "accessCaveats": [
        "Rusk County publishes the Highway 8 and Highway E / Flater's coordinates for this exact route.",
        "Wisconsin Trail Guide describes the Highway 8 launch as a trailer ramp east of the bridge near Sawdust Road and notes several public landings along the corridor if conditions force an early exit.",
        "If you intend to camp at the take-out, treat that as a separate lodging reservation question rather than an automatic paddler right."
      ],
      "watchFor": [
        "Wind, fatigue, and a slow pace on a full-day eighteen-mile quietwater route.",
        "Skrupky Rapids, brushy islands, slough entrances, and submerged wood that are easier to miss at higher water.",
        "Cold water, thunderstorms, and a later-than-expected finish if marshy headwinds set in."
      ]
    }
  },
  "badfish-creek-old-stage-casey": {
    "putIn": {
      "name": "Old Stage Road canoe/kayak landing",
      "latitude": 42.8569,
      "longitude": -89.2756
    },
    "takeOut": {
      "name": "North Casey Road take-out",
      "latitude": 42.8287,
      "longitude": -89.1849
    },
    "logistics": {
      "distanceLabel": "6.75 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 4 hr",
      "shuttle": "Use a short rural car shuttle between the Old Stage Road landing and North Casey Road. A bike shuttle is possible on local roads, but there are narrow shoulders and fast county-road segments.",
      "permits": "No route-specific paddling permit is known. Follow posted Wisconsin DNR wildlife-area rules at Old Stage and do not block roadside traffic at North Casey Road.",
      "camping": "No on-route camping is documented for this creek segment. Treat it as a day paddle.",
      "summary": "Launch at the maintained Old Stage Road landing on Badfish Creek Wildlife Area and take out at North Casey Road. This is a lively narrow-creek route with reliable water, riffles, and quick bends, but it only stays friendly when wood is clear and the Cooksville gauge is not pushing high.",
      "accessCaveats": [
        "Old Stage is the stronger endpoint: Wisconsin DNR confirms maintained canoe/kayak launches and parking in the wildlife area, and paddling reports describe a parking area and trail to the landing.",
        "North Casey Road is a bridge take-out rather than a developed park. Miles Paddled describes it as good, but you still need to confirm shoulder parking, bank condition, and bridge traffic before launching.",
        "The route passes near private land outside the wildlife-area corridor. Stay in the public waterway and use only known access points."
      ],
      "watchFor": [
        "Fast current around tight bends, especially above 200 cfs at Cooksville.",
        "Deadfall, sweepers, and fresh storm debris even after volunteer clearing work.",
        "Shallow riffles and rock bumps at lower levels, wild parsnip at access points, and wastewater-effluent water-quality context."
      ]
    }
  },
  "beaver-dam-river-cotton-mill-county-j": {
    "putIn": {
      "name": "Cotton Mill Park",
      "latitude": 43.45456,
      "longitude": -88.84298
    },
    "takeOut": {
      "name": "County Road J landing",
      "latitude": 43.39397,
      "longitude": -88.86828
    },
    "logistics": {
      "distanceLabel": "5.5 to 5.8 mi",
      "estimatedPaddleTime": "About 1 hr 30 min to 2 hr 30 min",
      "shuttle": "Use a short car shuttle between Cotton Mill Park in Beaver Dam and the County Road J landing near Leipsig. The bike shuttle is possible but County Road G has uncomfortable traffic exposure, so a vehicle shuttle is cleaner.",
      "permits": "No route-specific permit is known. Follow posted city-park rules at Cotton Mill Park and do not block the County Road J landing, driveway, gate, or bridge shoulder.",
      "camping": "No on-route camping is documented. Treat this as a short day route with a moving-water safety margin.",
      "summary": "Launch at Cotton Mill Park just below the Beaver Dam Lake dam and finish at the improved County Road J landing. This route has more gradient and small waves than most south-central Wisconsin paddles, so the live gauge, recent wood reports, and same-day dam behavior matter more than mileage.",
      "accessCaveats": [
        "Cotton Mill Park is the clean public start, but the launch is close to the dam and the first small weir. Scout the first bridge/drop before committing.",
        "County Road J now has a dedicated landing and parking area per recent Miles Paddled reports, but it is still road-adjacent. Do not block the nearby gate or private access.",
        "A controlled release can make the route runnable, but abrupt dam-gate changes can also make the river rise quickly. Check the gauge shortly before launching and again at the put-in."
      ],
      "watchFor": [
        "Class I-II waves, small weirs, and pushy downtown current, especially around Beaver Street, Center Street, Mill Street, and the Kraft corridor.",
        "Strainers and fresh wood between Davis Street and Cooper Street, around the Kraft corridor, and in the wooded middle reach.",
        "Low bridge clearance, blue-green algae warnings near the impoundment, wastewater-plant context, cold water, and wind on the slow marshy finish."
      ]
    }
  },
  "bark-river-highway-164-to-merton-millpond": {
    "putIn": {
      "name": "Highway 164 culvert crossing",
      "latitude": 43.17969,
      "longitude": -88.26254
    },
    "takeOut": {
      "name": "Merton Millpond boat launch",
      "latitude": 43.14871,
      "longitude": -88.30684
    },
    "logistics": {
      "distanceLabel": "4 mi",
      "estimatedPaddleTime": "About 1 hr 15 min to 1 hr 45 min",
      "shuttle": "Short car shuttle is simplest. Bike shuttle is possible if you are comfortable with local roads.",
      "permits": "None known for a standard day paddle.",
      "camping": "None noted for this short upper-river segment.",
      "summary": "Put in at the Highway 164 culvert crossing north of Lisbon and take out at the Merton Millpond launch. This is a low-water-floor decision first and a route-quality decision second.",
      "accessCaveats": [
        "Highway 164 is a limited roadside access. Verify a safe, legal pull-off before committing to the shuttle.",
        "The culvert put-in is functional rather than polished. Expect a less forgiving launch than the millpond take-out."
      ],
      "watchFor": [
        "Very low water and grass-choked channels below the minimum floor.",
        "Downed trees, tight bends, and overgrown banks.",
        "Cold spring water and quick rain response on the upper Bark."
      ]
    }
  },
  "bark-river-princes-point-burnt-village-park": {
    "putIn": {
      "name": "Prince's Point Wildlife Area / County D boat landing",
      "latitude": 42.8941667,
      "longitude": -88.7010972
    },
    "takeOut": {
      "name": "Burnt Village Park / County Highway N launch",
      "latitude": 42.9147222,
      "longitude": -88.7792528
    },
    "logistics": {
      "distanceLabel": "7.4 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr",
      "shuttle": "Use a short rural car shuttle between the County D landing at Prince's Point Wildlife Area and Burnt Village Park on County Highway N. Wisconsin River Trips reports a manageable bike shuttle, but staging vehicles is simpler.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin DNR wildlife-area rules at Princes Point and posted Jefferson County park rules at Burnt Village.",
      "camping": "No on-route camping is documented for this marsh-and-floodplain day route. Treat it as a day paddle.",
      "summary": "Launch from the Wisconsin DNR County D boat landing at Prince's Point Wildlife Area and finish at Burnt Village Park. This lower Bark reach is mostly slow flatwater through floodplain woods and marsh, with the strongest scenery near the put-in.",
      "accessCaveats": [
        "Wisconsin DNR warns that weather, local water levels, and county road closures may affect Princes Point parking-lot availability.",
        "Jefferson County lists Burnt Village Park as prone to flooding, so check both the Rome gauge and current park conditions before staging a vehicle there.",
        "Much of the middle route borders private land. Stay in the public waterway corridor and do not use private banks as casual stops."
      ],
      "watchFor": [
        "A possible hop-over logjam just downstream from Prince's Point.",
        "Slow open-marsh miles with little current, especially near the final approach to Burnt Village.",
        "Flooded woods, hidden banks, motorboat traffic, carp activity, and cold-water exposure outside summer."
      ]
    }
  },
  "pecatonica-river-black-bridge-wells": {
    "putIn": {
      "name": "Black Bridge Landing",
      "latitude": 42.68601091,
      "longitude": -90.12030611
    },
    "takeOut": {
      "name": "Wells Landing / Walnut Road",
      "latitude": 42.6424164,
      "longitude": -90.03988431
    },
    "logistics": {
      "distanceLabel": "12.3 mi",
      "estimatedPaddleTime": "About 4 hr 30 min to 6 hr",
      "shuttle": "Use a two-car shuttle between Black Bridge Park in Darlington and Wells Landing on Walnut Road. The bike shuttle can use portions of the Cheese Country Trail, but trail passes, ATV traffic, and surface conditions make a vehicle shuttle simpler.",
      "permits": "No route-specific paddling permit is known. Follow posted Darlington park rules at Black Bridge Park and any Lafayette County or local landing rules at Wells Landing.",
      "camping": "Treat this as a day route. Darlington has nearby camping upstream at Pecatonica River Trails Park, but no legal overnight stop was confirmed between Black Bridge Landing and Wells Landing.",
      "summary": "Launch at Black Bridge Landing, the city improved Pecatonica boat launch in Darlington, then paddle the town riffles and rural lower-Pecatonica bends to Wells Landing on Walnut Road. The longer distance and muddy banks make this a planned day trip rather than a quick float.",
      "accessCaveats": [
        "Lafayette County publishes both landing coordinates, but Wells Landing can be muddy after high water and may require a messy carry from the ramp area.",
        "Black Bridge Landing is the cleaner public start; avoid substituting the steeper Roller Coaster Road bridge unless you have scouted it first.",
        "The route has steep muddy banks and private farmland edges, so emergency exits may be awkward even though the river itself is generally gentle."
      ],
      "watchFor": [
        "Partial logjams and strainers on the Darlington-to-Roller-Coaster-Road section.",
        "High, muddy water and shoreside strainers above about 291 cfs on the Darlington gauge.",
        "Cold-water exposure in spring and fall, plus ATV traffic if using the Cheese Country Trail for shuttle."
      ]
    }
  },
  "kickapoo-river-ontario-rockton": {
    "putIn": {
      "name": "Village of Ontario Public Canoe Landing",
      "latitude": 43.72300847,
      "longitude": -90.58704745
    },
    "takeOut": {
      "name": "Kickapoo River Landing 12 (Rockton)",
      "latitude": 43.6370798,
      "longitude": -90.60288277
    },
    "logistics": {
      "distanceLabel": "12.5 mi",
      "estimatedPaddleTime": "About 4 hr 15 min to 5 hr 45 min",
      "shuttle": "Two-car shuttle is standard between Ontario and Rockton. Both endpoints appear in the Wisconsin DNR boat-access inventory, but it is still worth confirming parking and landing rules before you leave a vehicle.",
      "permits": "Kickapoo Valley Reserve requires a day-use, annual, camping, or vehicle-parking permit for vehicles left at Landing 12. Standard Wisconsin paddling rules otherwise apply.",
      "camping": "No on-route camping was confirmed for this exact reach during the route audit. Treat it as a day trip unless you independently confirm a legal overnight option.",
      "summary": "Put in at the Village of Ontario public canoe landing and take out at Landing 12 near Rockton. This is a classic Driftless day with riffles and occasional Class I, but it becomes a scrape-heavy grind quickly if you launch below the published low-water floor.",
      "accessCaveats": [
        "Both landings are publicly managed carry-in accesses, and Landing 12 is clearly under Kickapoo Valley Reserve management rather than a vague roadside take-out.",
        "Use current KVR maps and permit guidance before leaving a vehicle at Landing 12, because that matters more here than on a casual town-park shuttle.",
        "This is a longer shuttle than the seed-set average, so settle pickup timing before you put on."
      ],
      "watchFor": [
        "Frequent scraping and dragging through shallow riffles below about 60 cfs on the Ontario gauge.",
        "Flash-flood potential and pushier Class I water after storms or rising upstream readings.",
        "Strainers, sweepers, and cold-water exposure outside midsummer."
      ]
    }
  },
  "kickapoo-river-rockton-la-farge": {
    "putIn": {
      "name": "Kickapoo River Landing 12 (Rockton)",
      "latitude": 43.6371,
      "longitude": -90.60292
    },
    "takeOut": {
      "name": "Landing 20 / La Farge Canoe Landing",
      "latitude": 43.57481,
      "longitude": -90.6437
    },
    "logistics": {
      "distanceLabel": "10 mi",
      "estimatedPaddleTime": "About 3 hr 45 min to 5 hr",
      "shuttle": "Use a two-car shuttle from Landing 12 near Rockton to Landing 20 in La Farge. Outfitters commonly serve the Ontario-to-La Farge corridor, but confirm pickup rules if you are not using your own vehicle shuttle.",
      "permits": "Kickapoo Valley Reserve requires a day-use, annual, camping, or vehicle-parking permit for vehicles left at Landing 12. The La Farge take-out is outside the Reserve boundary in MilesPaddled notes, but still confirm posted rules before leaving a vehicle.",
      "camping": "KVR has designated campsites elsewhere in the reserve, but this route should be treated as a day trip unless you reserve or confirm a legal campsite in advance.",
      "summary": "Launch at Landing 12 in Rockton and finish at Landing 20 in La Farge for the second classic upper-Kickapoo day. The route has fewer access points than Ontario-to-Rockton, but it keeps the sandstone scenery, riffles, and bridge-number navigation.",
      "accessCaveats": [
        "Landing 12 is a KVR managed carry-in access with permit requirements and limited space, so do not treat it like an unregulated roadside shoulder.",
        "Landing 20 can be less obvious from the road than from the river; MilesPaddled describes it as tucked back through a field approach near Bridge 20.",
        "The route has one practical intermediate public landing at Landing 14 / County Highway P, so plan the shuttle and bailout options before launching."
      ],
      "watchFor": [
        "Scraping and dragging if the La Farge gauge is well below the 60 cfs scrape-free guidance.",
        "Flash-flooding and pushy current after storms; KVR explicitly warns the Kickapoo can rise quickly.",
        "Strainers, snags, cold-water exposure, and a reported tree hazard in the riffles below Bridge 19."
      ]
    }
  },
  "milwaukee-river-west-bend-quaas-creek": {
    "putIn": {
      "name": "Washington Street Dam launch (south of Hwy 33)",
      "latitude": 43.42833,
      "longitude": -88.18399
    },
    "takeOut": {
      "name": "Quaas Creek Park canoe/kayak launch",
      "latitude": 43.41636,
      "longitude": -88.14629
    },
    "logistics": {
      "distanceLabel": "3.9 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr",
      "shuttle": "The standard shuttle is about 3.5 miles. Wisconsin River Trips says it works especially well as a short bike-and-paddle combo using city trails, but a simple car shuttle is easier for most groups.",
      "permits": "No route-specific paddling permit is known. Follow posted city park, trail, and parking rules at the Washington Street dam area and Quaas Creek Park.",
      "camping": "No on-route camping is documented for this short urban day trip. Treat it as a day paddle.",
      "summary": "Launch south of the Washington Street dam in West Bend and finish at Quaas Creek Park. This is a short but lively Milwaukee River run with downtown riffles, a restored-prairie middle stretch, and a cleaner route-specific gauge story than most upper-Milwaukee prospects.",
      "accessCaveats": [
        "The put-in is a public launch area below the dam rather than a large formal boat ramp, so scout the shoreline and current before unloading.",
        "Quaas Creek Park has multiple access points; Wisconsin River Trips used the south access, which involves a longer carry but cleaner official parking.",
        "If you shorten the trip to Riverside Park, you keep most of the best current but end up with a very short paddle."
      ],
      "watchFor": [
        "Many Class I riffles through downtown West Bend and a stronger rapid below Indiana Avenue that can feel Class II at higher water.",
        "A strainer-choked right channel at the island below the railroad bridge; stay left there.",
        "Fast current, shoreline strainers in high water, and cold-water consequences outside warm weather."
      ]
    }
  },
  "milwaukee-river-newburg-fredonia": {
    "putIn": {
      "name": "Fireman's Park (Newburg)",
      "latitude": 43.43373,
      "longitude": -88.04926
    },
    "takeOut": {
      "name": "Waubedonia Park (Fredonia)",
      "latitude": 43.46838,
      "longitude": -87.97313
    },
    "logistics": {
      "distanceLabel": "11 mi",
      "estimatedPaddleTime": "About 3 hr 45 min to 5 hr",
      "shuttle": "The standard shuttle is a little over 6 road miles. Car shuttle is simplest, though a bike shuttle is workable if your group wants it.",
      "permits": "No route-specific permit is identified. Follow posted park and parking rules at Fireman's Park and Waubedonia Park.",
      "camping": "Waubedonia Park has seasonal camping by reservation. Otherwise treat this as a day trip.",
      "summary": "Put in at Fireman's Park in Newburg and take out at Waubedonia Park in Fredonia. This is a flow-sensitive easy river where being clearly above the low-water floor matters more than hunting for a perfect sweet spot.",
      "accessCaveats": [
        "The Fireman's Park parking lot sits on the opposite side of the bridge from the river access, so expect a short carry along the paved path and under the bridge.",
        "Waubedonia is the cleaner endpoint and has an official launch, but still confirm park hours and parking rules before leaving a vehicle."
      ],
      "watchFor": [
        "Scraping or short wades when Cedarburg drops toward the minimum floor.",
        "Mild riffles and shallow gravel runs that still need boat control.",
        "Fresh wood after storms and cold water outside summer."
      ]
    }
  },
  "milwaukee-river-lime-kiln-village-park": {
    "putIn": {
      "name": "Lime Kiln Park canoe ramp",
      "latitude": 43.30534,
      "longitude": -87.95358
    },
    "takeOut": {
      "name": "Village Park boat launch (Thiensville)",
      "latitude": 43.23164,
      "longitude": -87.97648
    },
    "logistics": {
      "distanceLabel": "8.75 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 4 hr",
      "shuttle": "Plan a straightforward two-car shuttle of roughly 6 miles. A bike shuttle is possible on local roads and trail links, but a car shuttle is simpler for most groups.",
      "permits": "No route-specific permit is identified. Follow posted park, launch, and parking rules at Lime Kiln Park and Thiensville Village Park.",
      "camping": "No on-route camping is expected for this suburban Milwaukee River segment. Treat it as a day trip.",
      "summary": "Put in at Lime Kiln Park in Grafton and take out at Thiensville Village Park. This is one of the more interesting lower-Milwaukee day trips because the upper mile is genuinely lively before the river widens and slows.",
      "accessCaveats": [
        "Lime Kiln Park is an official canoe-ramp access with multiple parking lots, but the exact launch line still deserves a quick scout because paddlers can choose between a calmer dock launch and a more direct upper launch near the opening features.",
        "Village Park is the correct official Thiensville take-out. The old Villa Grove naming from the carried-over draft was weaker than the current village boating and park pages."
      ],
      "watchFor": [
        "A quick opening decision around the island at Lime Kiln Park, with riffles on one side and a Class I ledge/drop on the other.",
        "Shallow gravel runs and extra scraping if Cedarburg falls back toward the floor.",
        "More development, slower current, and occasional powerboat traffic in the lower half approaching Thiensville."
      ]
    }
  },
  "milwaukee-river-waubedonia-veterans": {
    "putIn": {
      "name": "Waubedonia Park (Fredonia)",
      "latitude": 43.46838,
      "longitude": -87.97317
    },
    "takeOut": {
      "name": "Veterans Memorial Park (Grafton)",
      "latitude": 43.32211,
      "longitude": -87.94948
    },
    "logistics": {
      "distanceLabel": "13.25 mi",
      "estimatedPaddleTime": "About 4 hr 30 min to 6 hr",
      "shuttle": "Plan a straightforward two-car shuttle of roughly 12 road miles. A bike shuttle is possible, but it is long enough that most groups will prefer the simpler car setup.",
      "permits": "No route-specific permit is identified. Follow posted park, launch, and parking rules at Waubedonia Park and Veterans Memorial Park.",
      "camping": "Waubedonia Park offers seasonal rustic camping by reservation. Otherwise treat this as a day trip with no assumed legal riverbank camping.",
      "summary": "Start at Waubedonia Park and finish at Veterans Memorial Park for a longer lower-Milwaukee day with a mix of light rapids up top and slower suburban river miles near Grafton.",
      "accessCaveats": [
        "Waubedonia is a clean county-park launch, and the county says the park is open to day visitors from 6 a.m. to 9 p.m., but campground activity and event use can still change how easy the parking feels.",
        "Veterans Memorial Park is a village launch with adjacent parking rather than a large isolated landing, so expect more neighborhood context and less room to spread out gear.",
        "This route is long enough that a slightly too-low river can quietly turn into a slow frustrating day, so do not treat the gauge as an afterthought."
      ],
      "watchFor": [
        "Scraping or shallow riffles when Cedarburg falls toward the floor.",
        "One ledge-like upper-river feature plus scattered light rapids that deserve a quick look if levels are high.",
        "Murky faster current after rain and boat traffic closer to Grafton."
      ]
    }
  },
  "peshtigo-river-ccc-burnt-bridge": {
    "putIn": {
      "name": "CCC Bridge / Forest Road 2131 access",
      "latitude": 45.61092,
      "longitude": -88.59312
    },
    "takeOut": {
      "name": "Burnt Bridge Landing / Forest Road 2134",
      "latitude": 45.56208,
      "longitude": -88.4953
    },
    "logistics": {
      "distanceLabel": "9.2 to 9.25 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr, plus scouting or portage time if wood is present",
      "shuttle": "Use a remote national-forest shuttle between CCC Bridge on Forest Road 2131 / Peshtigo River Road and Burnt Bridge Landing on Forest Road 2134 / Michigan Creek Road. Expect gravel roads; low-clearance vehicles and bike shuttles need extra planning.",
      "permits": "No route-specific paddling permit is known. Follow Chequamegon-Nicolet National Forest rules and posted parking, camping, and landing guidance at both forest-road access points.",
      "camping": "Rustic camping at the Burnt Bridge take-out can support an endpoint campground plan, but confirm current forest rules before relying on it for an overnight.",
      "summary": "Launch at CCC Bridge and take out at Burnt Bridge Landing for the P2 Peshtigo forest run. The day mixes quiet remote water with repeated Class I-II boulder gardens and the longer Preserve Rapids section.",
      "accessCaveats": [
        "Both endpoints are remote forest-road landings rather than full-service parks; check road condition, parking room, and cell coverage before committing to the shuttle.",
        "Miles Paddled reports ample room at both landings and an easy downstream river-right take-out at Burnt Bridge with railroad-tie steps, but access conditions can change after storms or forest-road maintenance.",
        "Do not use this route as a substitute for the easier upper P1 section after major blowdowns; current wood conditions should be checked locally before launching."
      ],
      "watchFor": [
        "Camp 12, Little Camp 12, Coldwater, Preserve, Smiley, and Big Rock rapids, with Class I-II boulder gardens and constricted current.",
        "Scrapier rocks below 5.0 ft and pushier, less novice-friendly rapids above 6.5 ft on the Wabeno gauge.",
        "Strainers, deadfall, possible near-river-wide wood, cold water, and long stretches with limited road access.",
        "The Wabeno gauge is about 26 miles downstream, so pair the gauge with recent rainfall, trend, and visual checks at the put-in."
      ]
    }
  },
  "peshtigo-river-burnt-bridge-goodman-park": {
    "putIn": {
      "name": "Burnt Bridge Landing / Forest Road 2134",
      "latitude": 45.56205,
      "longitude": -88.4953
    },
    "takeOut": {
      "name": "Goodman Park Access",
      "latitude": 45.51839,
      "longitude": -88.3408
    },
    "logistics": {
      "distanceLabel": "12.5 mi",
      "estimatedPaddleTime": "About 5 hr to 6 hr, plus scouting, portaging, and safety setup time",
      "shuttle": "Use a remote national-forest shuttle between Burnt Bridge Landing on Forest Road 2134 / Michigan Rapids Road and Goodman Park. Inspect Goodman Park first because the finish is immediately after the Strong Falls area and the next downstream section is a separate, easier route.",
      "permits": "No route-specific paddling permit is known. Follow Chequamegon-Nicolet National Forest, Marinette County park, and Wisconsin boating/PFD rules; confirm any campground, day-use, parking, or access fees before relying on the endpoints.",
      "camping": "Endpoint camping is plausible but must be planned. Wisconsin Trail Guide identifies two rustic campsites at Burnt Bridge Landing and frames Goodman Park as the first overnight stop on an advanced P3-P5 trip; reserve or verify all county/forest rules before counting on a campsite.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Burnt Bridge and take out at Goodman Park for the advanced P3 Peshtigo whitewater day. The route includes Michigan Rapids, Upper Dells, Dells Rapids, Taylor Falls, and Strong Falls, and should be treated as a scout-and-portage whitewater run.",
      "accessCaveats": [
        "Burnt Bridge is a remote forest landing rather than a staffed launch. Check road condition, parking space, and campsite status before leaving a vehicle.",
        "Goodman Park is a county-park endpoint below Strong Falls. Confirm park rules, fees, campground access, and take-out approach before launching.",
        "Do not continue into the Goodman-Park-to-Farm-Dam section unless your group intentionally planned the extra mileage and logistics."
      ],
      "watchFor": [
        "Michigan Rapids, Upper Dells, Dells Rapids, Taylor Falls, Strong Falls, boulder drops, holes, and complex lines.",
        "Mandatory scouting or portaging at major rapids and any location with obstructing wood.",
        "Low-water rock abuse below 4.5 to 5.0 ft and pushy, advanced-only current as Wabeno rises above about 6.5 ft.",
        "Remote rescue exposure, cold water, strainers, fast rises after rain, and the downstream-gauge estimate caveat."
      ]
    },
    "accessPoints": [
      {
        "id": "burnt-bridge-landing",
        "name": "Burnt Bridge Landing / Forest Road 2134",
        "latitude": 45.56205,
        "longitude": -88.4953,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default WTG P3 put-in with rustic campsite context."
      },
      {
        "id": "goodman-park-access",
        "name": "Goodman Park Access",
        "latitude": 45.51839,
        "longitude": -88.3408,
        "mileFromStart": 12.5,
        "segmentKind": "creek",
        "note": "Default P3 take-out and endpoint campground/basecamp area."
      }
    ]
  },
  "peshtigo-river-goodman-park-farm-dam": {
    "putIn": {
      "name": "Goodman Park Access",
      "latitude": 45.51799,
      "longitude": -88.33935
    },
    "takeOut": {
      "name": "Farm Dam Public Landing",
      "latitude": 45.41351,
      "longitude": -88.34615
    },
    "logistics": {
      "distanceLabel": "9.8 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr",
      "shuttle": "Use a County C / Goodman Park Road shuttle between Goodman Park and Farm Dam Public Landing. McClintock Park sits mid-route and can work as a planned rest stop or conservative shorter option.",
      "permits": "No route-specific paddling permit is known. Goodman and McClintock are Marinette County parks with day-use or camping rules, and Farm Dam sits in the state-forest / WPS landing corridor; follow posted access and fee requirements.",
      "camping": "Goodman Park and McClintock Park both have reservable county campgrounds nearby along the river corridor. Treat river camping elsewhere as unconfirmed unless a land manager separately approves it.",
      "summary": "Launch below Strong Falls at Goodman Park Access and take out at Farm Dam Public Landing. This is the scenic P4 Peshtigo run, mostly wooded flatwater and riffles with Skinners Elbow and Wilson Rapids adding Class I-II / II boat-control work.",
      "accessCaveats": [
        "Goodman Park Access is a hand-carry beach launch below Strong Falls; use the main park lot and trail to the river, and expect any posted county park fee.",
        "Farm Dam has separate public and commercial outfitter landings. Use the northern public landing on Otter Creek rather than the commercial outfitter landing downstream.",
        "The stronger Roaring Rapids route starts below Farm Dam; do not continue downstream unless your group intentionally planned the more serious whitewater section."
      ],
      "watchFor": [
        "Skinners Elbow and Wilson Rapids, which become stronger and wavier as the County C gauge rises.",
        "Scrapier riffles below 5.0 ft and increasingly pushy Class II water above 6.5 ft.",
        "Deadfall, strainers, cold water, and limited road exits through wooded bends.",
        "Strong Falls is upstream of the launch; scout park paths and stay clear of falls current while staging boats."
      ]
    }
  },
  "peshtigo-river-roaring-rapids": {
    "putIn": {
      "name": "Farm Dam Public Landing",
      "latitude": 45.41351,
      "longitude": -88.34615
    },
    "takeOut": {
      "name": "WPS Landing #12",
      "latitude": 45.38092,
      "longitude": -88.30101
    },
    "logistics": {
      "distanceLabel": "5.2 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr depending on scouting, level, and group size",
      "shuttle": "Use a short County C corridor shuttle between Farm Dam Public Landing and WPS Landing #12. Local outfitters also run guided rafting trips and shuttles in this corridor.",
      "permits": "No route-specific paddling permit is known. Follow Governor Earl Peshtigo River State Forest rules, posted landing rules, and any outfitter requirements if using a guided trip.",
      "camping": "Treat this as a day run unless you have separately reserved or confirmed legal state-forest camping. Overnight island camping is not allowed except at designated campsites.",
      "summary": "Put in at Farm Dam Public Landing and take out at WPS Landing #12 for the Roaring Rapids section of the Peshtigo. This is a compact but serious whitewater route, with the USGS County C gauge inside the run.",
      "accessCaveats": [
        "Wisconsin Trail Guide notes that Farm Dam has separate commercial and public landings; use the northern public landing on Otter Creek.",
        "WPS Landing #12 is a large developed state-forest landing maintained by Wisconsin Public Service, with parking, trailer turnaround, trailer parking, water, and pit toilets.",
        "This route is for skilled whitewater paddlers or guided rafting groups. Casual rec boats should not treat it as a normal river float."
      ],
      "watchFor": [
        "Continuous class II-IV rapids, including First Drop, Third Drop, Five Foot Falls, Horserace, and S-Curve.",
        "Sticky holes, ledges, boulder gardens, shallow rocky swim zones, and much stronger hydraulics as the County C gauge rises.",
        "Rapid level changes after rain, cold water, remote-feeling banks, and the need to scout and portage features that exceed your group skills."
      ]
    }
  },
  "eau-claire-river-bear-lake-county-n": {
    "putIn": {
      "name": "Bear Lake Road Bridge Landing",
      "latitude": 45.0586,
      "longitude": -89.27024
    },
    "takeOut": {
      "name": "County N Bridge Landing",
      "latitude": 44.94419,
      "longitude": -89.41916
    },
    "logistics": {
      "distanceLabel": "13.9 mi",
      "estimatedPaddleTime": "Long day, about 6 hr to 8 hr with scouting and portage time",
      "shuttle": "Plan a rural two-car shuttle between Bear Lake Road and County N. The route passes Dells of the Eau Claire County Park, so some groups may stage food, scouting, or an alternate plan there.",
      "permits": "No route-specific paddling permit is known. Follow posted rules at bridge landings, Dells of the Eau Claire County Park, and any portage or parking areas.",
      "camping": "Dells of the Eau Claire County Park has a family campground near the middle of the segment, but do not assume a riverbank overnight. Reserve or confirm camping separately before planning this as more than a day run.",
      "summary": "Launch at Bear Lake Road Bridge Landing and take out at County N Bridge Landing for Wisconsin Trail Guide EC1. This is a long whitewater day with the Dells of the Eau Claire in the middle and the Kelly USGS gauge downstream.",
      "accessCaveats": [
        "Bear Lake Road is a hand-carry bridge landing with roadside parking, not a large developed ramp.",
        "County N Bridge Landing is a hand-carry take-out on river right above the bridge with parking west of the bridge.",
        "The USGS Kelly gauge is downstream of the route, so recent local rain, falling or rising trends, and visual scouting matter more than the number alone."
      ],
      "watchFor": [
        "Class II-III rapids, boulder gardens, and scratchy ledges when the river is low.",
        "The Eau Claire Dells class IV feature; most full-route paddlers should portage at the county park unless they have appropriate whitewater skill.",
        "Powerful hydraulics above about 2,000 cfs, possible debris or downed trees after storms, cold water, and a long shuttle with limited quick exits."
      ]
    }
  },
  "bois-brule-river-stones-winneboujou": {
    "putIn": {
      "name": "Stone's Bridge Landing",
      "latitude": 46.43415,
      "longitude": -91.67486
    },
    "takeOut": {
      "name": "Winneboujou Landing",
      "latitude": 46.5133,
      "longitude": -91.6022
    },
    "logistics": {
      "distanceLabel": "9.3 to 9.6 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr, depending on level and stops",
      "shuttle": "Use a vehicle shuttle between Stone’s Bridge on County Highway S and Winneboujou near County B. Local liveries commonly service this corridor during the paddling season.",
      "permits": "No route-specific paddling permit is known, but Wisconsin DNR river rules apply: use designated landings only, carry wearable PFDs, secure containers and trash, and follow posted state-forest rules.",
      "camping": "Camping is allowed only at state-designated campgrounds. Treat Stone's Bridge to Winneboujou as a day trip unless you have a separate legal campground/base-camp plan.",
      "summary": "Launch at Stone’s Bridge Landing and take out at Winneboujou Landing for the classic upper Bois Brule day. It is the friendlier Brule run, with clear water, wooded corridors, mostly class I rapids, and a shorter commitment than continuing to Bois Brule Landing, but low water and strainers can still change the trip.",
      "accessCaveats": [
        "Wisconsin DNR requires launching and landing only at allowed designated canoe landings on the Brule.",
        "Stone’s Bridge is a developed landing with parking, pit toilets, water, and trailer turnaround according to Wisconsin Trail Guide.",
        "Winneboujou is a hand-carry landing with parking, pit toilets, water, and trailer turnaround according to Wisconsin Trail Guide."
      ],
      "watchFor": [
        "Bony rapids below about 200 cfs and paddling not recommended below 125 cfs.",
        "Falls Rapids, Big Twin, Wildcat, Station, and other class I features; scout or portage anything that exceeds group comfort.",
        "Strainers, fallen trees, cold spring-fed water, and faster constricted current as flows rise."
      ]
    }
  },
  "bois-brule-river-winneboujou-bois-brule": {
    "putIn": {
      "name": "Winneboujou Landing",
      "latitude": 46.5133,
      "longitude": -91.6022
    },
    "takeOut": {
      "name": "Bois Brule Landing / Bois Brule Campground canoe landing",
      "latitude": 46.54042,
      "longitude": -91.59408
    },
    "logistics": {
      "distanceLabel": "About 2.6 to 2.8 mi",
      "estimatedPaddleTime": "About 45 min to 1.5 hr, depending on water level and stops",
      "shuttle": "Use a short two-car state-forest shuttle between Winneboujou Landing near County Highway B and the Bois Brule campground landing on South Ranger Road. Do not assume informal exits are legal between the designated landings.",
      "permits": "No route-specific paddling permit is known, but Wisconsin DNR Brule River rules apply: launch and land only at allowed designated canoe landings, carry wearable PFDs, secure containers and trash, and follow posted state-forest rules.",
      "camping": "Bois Brule Campground is at the take-out, but camping is allowed only at state-designated campgrounds. Treat this short reach as a day trip unless you have a legal campground reservation or base-camp plan.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Winneboujou Landing and take out at Bois Brule Landing for the short public-access connector below the classic Stone's-to-Winneboujou run. It is a compact cold-water Brule trip with class I riffles, designated-landing rules, and little room for casual private-bank exits.",
      "accessCaveats": [
        "Wisconsin DNR requires launching and landing only at allowed designated canoe landings on the Brule.",
        "Winneboujou is a hand-carry landing with parking, pit toilets, water, and trailer turnaround according to Wisconsin Trail Guide.",
        "Bois Brule Landing is a developed campground landing with a gravel ramp, parking, pit toilets, picnic area, and drinking water according to Wisconsin Trail Guide."
      ],
      "watchFor": [
        "Bony riffles below about 200 cfs and paddling not recommended below 125 cfs.",
        "Class I current, cold spring-fed water, strainers, and faster constricted bends as flows rise.",
        "A downstream commitment change: continuing past Bois Brule Landing turns this into a much longer Pine Tree shuttle with additional named rapids."
      ]
    }
  },
  "bois-brule-river-bois-brule-pine-tree": {
    "putIn": {
      "name": "Bois Brule Landing / Bois Brule Campground canoe landing",
      "latitude": 46.54042,
      "longitude": -91.59408
    },
    "takeOut": {
      "name": "Pine Tree Landing",
      "latitude": 46.61545,
      "longitude": -91.58264
    },
    "logistics": {
      "distanceLabel": "10.3 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr",
      "shuttle": "Use a two-car state-forest shuttle from the Bois Brule campground landing on South Ranger Road to Pine Tree Landing at the end of Dead End Road off County Highway H. Highway 2 Landing can work as a shorter midpoint option if the full route is too long.",
      "permits": "No route-specific paddling permit is known, but Wisconsin DNR Brule River rules apply: launch and land only at designated canoe landings, carry wearable PFDs, secure containers and trash, and follow posted state-forest rules.",
      "camping": "Bois Brule Campground is at the put-in and Copper Range Campground is just upstream of Pine Tree Landing. Camping is allowed only at state-designated campgrounds, so reserve or confirm campground plans separately.",
      "summary": "Launch at Bois Brule Landing and take out at Pine Tree Landing for Wisconsin Trail Guide BB2. The route links the campground landing, Highway 2 Landing, the Meadows, Co-Op Park Rapids, Copper Range Campground, and the upper Pine Tree approach into one clear-water Brule day.",
      "accessCaveats": [
        "Bois Brule Landing is a developed state-forest campground landing with a gravel ramp, parking, pit toilets, picnic area, and drinking water according to Wisconsin Trail Guide.",
        "Pine Tree Landing is a hand-carry state-forest landing with parking, trailer turnaround, and pit toilets at the end of a gravel drive.",
        "Wisconsin DNR requires paddlers on the Brule to use allowed designated landings only, so do not improvise alternate exits on private or angler-only access points."
      ],
      "watchFor": [
        "Doodlebug Rapids, Co-Op Park Rapids, and additional class I pitches below East Park Road.",
        "Bony riffles and rapids below about 200 cfs, with paddling not recommended below 125 cfs.",
        "Fallen trees, strainers along bends and constricted channels, cold spring-fed water, and faster current above about 600 cfs."
      ]
    }
  },
  "bois-brule-river-pine-tree-highway-13": {
    "putIn": {
      "name": "Pine Tree Landing",
      "latitude": 46.61545,
      "longitude": -91.58264
    },
    "takeOut": {
      "name": "Highway 13 Canoe Landing",
      "latitude": 46.67776,
      "longitude": -91.59553
    },
    "logistics": {
      "distanceLabel": "8.4 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr, or about 5 hr by DNR landing-to-landing timing",
      "shuttle": "Use a two-car shuttle between Pine Tree Landing at the end of Dead End Road off County Highway H and Highway 13 Canoe Landing east of the Highway 13 bridge. Both are designated Brule River State Forest canoe landings.",
      "permits": "No route-specific paddling permit is known, but Wisconsin DNR Brule River rules apply: launch and land only at designated canoe landings, carry wearable PFDs, secure containers and trash, and follow posted state-forest rules.",
      "camping": "Camping is allowed only at state-designated campgrounds. Copper Range Campground is upstream of the put-in, but this route itself should be planned as a day trip unless you have a legal campground reservation or plan.",
      "summary": "Launch at Pine Tree Landing for the Bois Brule BB3 whitewater segment and finish at Highway 13 Canoe Landing. Expect near-continuous riffles and rapids, with Lenroot Ledges and Mays Ledges as the key scout-or-portage features.",
      "accessCaveats": [
        "Pine Tree Landing is a hand-carry state-forest landing with parking, trailer turn-around, and pit toilets at the end of Dead End Road. Confirm road and seasonal access before committing to the shuttle.",
        "Highway 13 Canoe Landing is a hand-carry landing on river right near the end of Highway 13 Rapids, with parking, trailer turn-around, pit toilets, and potable water.",
        "Wisconsin DNR requires paddlers on the Brule to use allowed designated landings only, so do not improvise alternate exits on private or angler-only access points."
      ],
      "watchFor": [
        "Lenroot Ledges, a long Class II ledge sequence that can get shallow and bumpy at low water and faster at higher flows.",
        "Mays Ledges, the most challenging whitewater on this segment; scout or portage from river right if there is any doubt.",
        "Fallen trees, strainers along banks, bony rapids below about 200 cfs, fast constrictions above about 600 cfs, and cold spring-fed water."
      ]
    }
  },
  "bois-brule-river-highway-13-mouth": {
    "putIn": {
      "name": "Highway 13 Canoe Landing",
      "latitude": 46.67795948,
      "longitude": -91.59535953
    },
    "takeOut": {
      "name": "Bois Brule River -- Mouth Access",
      "latitude": 46.74768874,
      "longitude": -91.61055237
    },
    "logistics": {
      "distanceLabel": "8.2 mi",
      "estimatedPaddleTime": "About 4 hr, longer with the lamprey-barrier portage and Lake Superior wind",
      "shuttle": "Use a two-car shuttle between the state-managed Highway 13 Canoe Landing and the designated Mouth Access near Lake Superior. The lower landing is remote; confirm the road, parking, and lake/wind conditions before launching.",
      "permits": "No route-specific paddling permit is known, but Wisconsin DNR Brule River rules apply: launch and land only at designated canoe landings, carry wearable PFDs, secure containers and trash, and follow posted state-forest rules.",
      "camping": "Camping is allowed only at state-designated campgrounds. Treat Highway 13 to the mouth as a day trip unless you have a separate legal campground/base-camp plan.",
      "summary": "Launch at Highway 13 Canoe Landing and take out at the Bois Brule mouth landing on Lake Superior. This lower Brule route is scenic and mostly Class I, but it has a mandatory portage at the lamprey barrier and a cold-water finish where Lake Superior wind and waves can matter.",
      "accessCaveats": [
        "Highway 13 Canoe Landing is a DNR-managed carry-in with parking, a gravel access road, vault restroom, and potable water, but no boarding dock.",
        "The Mouth Access is a designated DNR-listed landing; inspect it before the shuttle because the finish is near Lake Superior and conditions can feel different from inland river landings.",
        "Wisconsin DNR requires paddlers on the Brule to use allowed designated landings only, so do not improvise alternate exits on private or angler-only access points."
      ],
      "watchFor": [
        "The sea lamprey barrier about 2 miles below Highway 13; warning buoys and signs mark the approach, and paddlers must portage on river right.",
        "Class I riffles including Shale Falls, shallow bony ledges below about 200 cfs, and deadfall around islands and bends.",
        "Cold water, rapid lower-river rises after rain or snowmelt, and wind or waves near the Lake Superior mouth."
      ]
    }
  },
  "menomonee-river-hoyt-park-bluemound": {
    "putIn": {
      "name": "Hoyt Park / TOSA Pool river access",
      "latitude": 43.05436,
      "longitude": -88.02431
    },
    "takeOut": {
      "name": "Bluemound Road / Wisconsin Avenue Menomonee River access",
      "latitude": 43.03572,
      "longitude": -87.96231
    },
    "logistics": {
      "distanceLabel": "4.1 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer if scouting or portaging",
      "shuttle": "Short urban vehicle shuttle. A bike shuttle can work because Milwaukee County and Oak Leaf Trail corridors parallel pieces of the route, but traffic and parking logistics deserve planning.",
      "permits": "No route-specific paddling permit is known. Follow posted Hoyt Park, Wauwatosa, Milwaukee County, and City of Milwaukee parking/access rules.",
      "camping": "No on-route camping. Treat this as a short urban day run only.",
      "summary": "Put in at Hoyt Park in Wauwatosa and take out near the Bluemound/Wisconsin Avenue access in the Menomonee Valley. The route is short but busy: shallow bedrock, class I-II rapids, one stronger ledge, strainers, walls, and urban water-quality cautions all matter.",
      "accessCaveats": [
        "Hoyt Park is a public park, but the exact river access is informal enough that parking, carry distance, and posted rules should be checked before unloading.",
        "The downstream access is an urban bridge/valley access, not a polished rural landing. Wisconsin River Trips describes it as public space but not yet a completed ramp, so confirm the exit, parking legality, and construction closures before you launch.",
        "Do not extend downstream into industrial or harbor sections unless you have a separate route plan and confirmed take-out."
      ],
      "watchFor": [
        "Class I-II rapids plus a stronger scoutable ledge near the railroad/Wisconsin Avenue corridor.",
        "Strainers, walls, sharp rocks, bridge remnants, and fast current pushing into obstacles.",
        "Flashy post-rain rises, MMSD overflow context, and urban water-quality issues. Avoid this route during or shortly after heavy rain."
      ]
    }
  },
  "kinnickinnic-river-glen-park-state-park": {
    "putIn": {
      "name": "Glen Park (River Falls)",
      "latitude": 44.85075,
      "longitude": -92.63882
    },
    "takeOut": {
      "name": "St. Croix River beach / concrete take-out at Kinnickinnic State Park",
      "latitude": 44.83254,
      "longitude": -92.76374
    },
    "logistics": {
      "distanceLabel": "10 mi",
      "estimatedPaddleTime": "About 3 hr 15 min to 4 hr 30 min",
      "shuttle": "Car shuttle is simplest. The road shuttle is about 10.5 miles, and the state-park finish is much easier if you bring a boat cart for the carry out.",
      "permits": "If you park inside Kinnickinnic State Park, expect Wisconsin state-park admission rules to apply. Follow posted rules at both Glen Park and the park take-out.",
      "camping": "Camping by reservation is available at Kinnickinnic State Park near the take-out, but this route is best treated as a hard day trip unless you already have a campsite plan.",
      "summary": "Put in below the second River Falls dam at Glen Park and finish at the state-park beach where the Kinnickinnic meets the St. Croix. This is a beautiful but committed swiftwater day, not a casual scenic float.",
      "accessCaveats": [
        "The Glen Park launch is reached by a footpath and staircase down the bluff, not by a polished ramp, so expect a real carry to the river.",
        "The official state-park take-out is followed by a steep carry back up to the main parking area. Bring a cart or plan for the climb before you launch."
      ],
      "watchFor": [
        "Scraping and boat abuse below about 175 cfs at River Falls.",
        "Continuous riffles and class II features for miles below the put-in.",
        "Anglers, strainers after storms, and cold water outside peak summer."
      ]
    }
  },
  "wisconsin-river-muscoda-blue-river": {
    "putIn": {
      "name": "Riverside Park / Muscoda west-side landing",
      "latitude": 43.1962605,
      "longitude": -90.4357156
    },
    "takeOut": {
      "name": "Blue River Landing",
      "latitude": 43.2067548,
      "longitude": -90.5663182
    },
    "logistics": {
      "distanceLabel": "8 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with sandbar stops",
      "shuttle": "Short Lower Wisconsin vehicle shuttle between Muscoda and Blue River. Local outfitters may support this corridor in season, but a two-car shuttle is the simplest self-supported plan.",
      "permits": "No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules, posted landing rules, and current Wisconsin DNR guidance for glass, trash, and riverway conduct.",
      "camping": "Wisconsin DNR allows camping on state-owned Lower Wisconsin islands and sandbars for up to three days when you arrive by watercraft, with no camping permit required. This short segment is still easiest as a day trip unless your group has checked current water levels, rules, trash-container requirements, and sandbar availability.",
      "summary": "Launch at the Muscoda/Riverside Park corridor and take out at Blue River Landing. This is a short easy Lower Wisconsin day with sandbars and island channels when the Muscoda gauge is in the normal summer range.",
      "accessCaveats": [
        "Both endpoints are listed by Wisconsin DNR as major public access points on the Lower Wisconsin State Riverway.",
        "Sandbars and channels change. Pick landings and break spots based on current water, not old satellite imagery."
      ],
      "watchFor": [
        "Shallow pushing and main-channel picking below normal summer flows.",
        "Undercurrents, fewer sandbars, and poor camping options as flows rise above the normal band, especially around 17,000 cfs and higher.",
        "Wind, powerboats, and surprise drop-offs along sandbar edges."
      ]
    }
  },
  "wisconsin-river-blue-river-boscobel": {
    "putIn": {
      "name": "Blue River Landing",
      "latitude": 43.2067548,
      "longitude": -90.5663182
    },
    "takeOut": {
      "name": "Boscobel Landing / Floyd Von Haden Boat Landing",
      "latitude": 43.1492722,
      "longitude": -90.715253
    },
    "logistics": {
      "distanceLabel": "10 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr, longer with sandbar stops",
      "shuttle": "Plan a vehicle shuttle between Blue River and Boscobel. The route is straightforward by road, but confirm current landing parking and any local construction before leaving a vehicle.",
      "permits": "No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules and posted landing guidance.",
      "camping": "Wisconsin DNR allows camping on state-owned Lower Wisconsin islands and sandbars for up to three days when you arrive by watercraft, with no camping permit required. For this route, treat overnight plans as level-dependent and avoid high-water sandbars.",
      "summary": "Put in at Blue River Landing and finish at Boscobel. This is an easy Lower Wisconsin day through islands, sandbars, and bluff country when the Muscoda gauge is in the normal summer range.",
      "accessCaveats": [
        "Both Blue River and Boscobel are Wisconsin DNR-listed Lower Wisconsin State Riverway access points.",
        "Boscobel has multiple landing references in public map data; use current signage and the intended river landing rather than assuming any nearby ramp is the correct take-out."
      ],
      "watchFor": [
        "Changing side channels around islands and strainers in narrow cuts.",
        "Steep drop-offs and strong current around sandbars.",
        "High water that removes sandbars and turns a mellow day into a stronger-current trip, especially around 17,000 cfs and higher."
      ]
    }
  },
  "wisconsin-river-gotham-muscoda-west": {
    "putIn": {
      "name": "Gotham / Buena Vista Boat Landing",
      "latitude": 43.20903,
      "longitude": -90.30424
    },
    "takeOut": {
      "name": "Muscoda Landing West",
      "latitude": 43.198,
      "longitude": -90.44576
    },
    "logistics": {
      "distanceLabel": "7.9 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr, longer with sandbar stops",
      "shuttle": "Use a Lower Wisconsin vehicle shuttle between Buena Vista Landing at Gotham and Muscoda Landing West off West River Road. The road shuttle is straightforward but rural; confirm the intended west-side Muscoda landing before leaving a vehicle.",
      "permits": "No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules, posted landing rules, PFD requirements, and current Wisconsin DNR guidance for glass, trash, and riverway conduct.",
      "camping": "Wisconsin DNR allows camping on state-owned Lower Wisconsin islands and sandbars for up to three days when you arrive by watercraft, with no camping permit required. For this short route, treat overnight plans as level-dependent and avoid high-water sandbars.",
      "summary": "Launch at Gotham / Buena Vista Boat Landing near the Pine River mouth and finish at Muscoda Landing West just downstream of the Highway 80 bridge. This is a short Lower Wisconsin day with big sandbars, bluff views, side-channel exploration, and a direct Muscoda gauge.",
      "accessCaveats": [
        "Wisconsin DNR lists Buena Vista Boat Landing and Muscoda west-side access as major public access points on the Lower Wisconsin State Riverway.",
        "Wisconsin River Trips notes that Gotham is a good public access but has no outhouse, prohibits overnight parking, and has poison ivy around the landing.",
        "Muscoda has multiple landings. This route uses Muscoda Landing West / Old Muscoda Landing on West River Road, not the newer Victoria Riverside Park motorboat ramp upstream."
      ],
      "watchFor": [
        "Fast main-channel current at Gotham and around sandbars.",
        "Strainers along eroding banks and in narrow side channels, especially when higher water opens smaller cuts.",
        "Undercurrents, fewer sandbars, and poor camping options above the normal range, especially around 17,000 cfs and higher.",
        "Wind, powerboats near Muscoda, poison ivy at access points, and steep sandbar drop-offs."
      ]
    }
  },
  "wisconsin-river-portage-dekorra": {
    "putIn": {
      "name": "Highway 33 bridge carry-in (Portage)",
      "latitude": 43.535,
      "longitude": -89.464
    },
    "takeOut": {
      "name": "Dekorra Park landing",
      "latitude": 43.457484,
      "longitude": -89.46762
    },
    "logistics": {
      "distanceLabel": "7.8 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr",
      "shuttle": "Use a two-car shuttle between the Highway 33 bridge area and Dekorra Park. Confirm legal parking and carry routes at both ends because this route is sourced from a trip report rather than a formal DNR water-trail landing list.",
      "permits": "No route-specific paddling permit is known. Follow posted Portage, Columbia County, and Dekorra Park rules.",
      "camping": "Treat this as a day trip. Do not assume sandbar camping is legal or practical on this reach without separate confirmation.",
      "summary": "Launch near the Highway 33 bridge at Portage and finish at Dekorra Park. Expect big-river current, large islands, sandbars at moderate flows, and side-channel choices rather than technical rapids.",
      "accessCaveats": [
        "The Highway 33 put-in is backed by a Recreation.gov/BLM page describing a Wisconsin DNR carry-in boat launch just before the Highway 33 river crossing, but parking and bank conditions still deserve a same-day check.",
        "The route passes near levee and power-plant infrastructure; keep the trip to the documented reach and avoid trespass or restricted areas."
      ],
      "watchFor": [
        "Shallow side channels below normal summer water.",
        "Fewer sandbars and faster push above the normal range.",
        "Wind exposure, powerboats, and confusing island channels."
      ]
    }
  },
  "baraboo-river-wayside-kalepp": {
    "putIn": {
      "name": "Wayside Park (Baraboo River / 400 State Trail)",
      "latitude": 43.6462,
      "longitude": -90.2223
    },
    "takeOut": {
      "name": "Kalepp Road / 400 State Trail Baraboo River access",
      "latitude": 43.6206,
      "longitude": -90.1531
    },
    "logistics": {
      "distanceLabel": "4.6 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr",
      "shuttle": "Short rural shuttle between Wayside Park and Kalepp Road. The 400 State Trail corridor can help with orientation, but a two-car shuttle is simplest.",
      "permits": "No route-specific paddling permit is known. Check Wayside Park, DNR parking, and 400 State Trail signage before leaving vehicles.",
      "camping": "No on-route camping documented. Treat this as a short day trip.",
      "summary": "Put in at Wayside Park near Wonewoc and take out near Kalepp Road. This is a short scenic Baraboo River segment with sandstone outcrops, but muddy banks, strainers, and changing wood make it a moderate route.",
      "accessCaveats": [
        "Wayside Park is a public park/rest area, but the water entry is not a polished boat ramp.",
        "The Kalepp Road exit uses a side-creek/400 State Trail corridor described by Wisconsin River Trips; verify same-day access and avoid private land."
      ],
      "watchFor": [
        "Downed trees and strainers in deep, muddy, fast water.",
        "Steep muddy banks that can make portages harder than they look.",
        "Pushy, dirty water above the target stage range."
      ]
    }
  },
  "wisconsin-river-sauk-city-arena": {
    "putIn": {
      "name": "Sauk Canoe Access",
      "latitude": 43.2566,
      "longitude": -89.742
    },
    "takeOut": {
      "name": "Arena Landing",
      "latitude": 43.1867782,
      "longitude": -89.9016376
    },
    "logistics": {
      "distanceLabel": "11 mi",
      "estimatedPaddleTime": "About 3.5 hr to 4.5 hr, longer with sandbar stops",
      "shuttle": "Use a vehicle shuttle between Sauk City and Arena. This is a common outfitter corridor, but self-supported groups should still confirm landing parking before leaving vehicles.",
      "permits": "No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules, posted landing rules, and Wisconsin boating/PFD requirements.",
      "camping": "Sandbar camping is possible at suitable flows under Lower Wisconsin State Riverway rules, but this route is also a normal day trip. Avoid overnight plans at high water or when sandbars are scarce.",
      "summary": "Launch from the Sauk City/Sauk Prairie landing corridor and take out at Arena Landing. This is one of the classic upper Lower Wisconsin day trips, with broad sandbars and easy current in the normal summer gauge window.",
      "accessCaveats": [
        "Wisconsin DNR lists both the Sauk/Prairie du Sac corridor and Arena among major public access points for the Lower Wisconsin State Riverway; the saved put-in is the Sauk Canoe Access point used by Lower Wisconsin paddling guides.",
        "Paddling.com describes the Sauk Canoe Access as having a large parking lot and sandy carry, but warns the river-side access can be easy to miss from the water.",
        "The Lower Wisconsin has many optional landings, but this route is scored specifically for Sauk City to Arena so distance and shuttle timing stay honest."
      ],
      "watchFor": [
        "Crowded summer weekends and outfitter traffic.",
        "Hidden current and sudden sandbar drop-offs, especially when wading.",
        "High water that reduces sandbars and opens faster side channels with strainers."
      ]
    }
  },
  "wisconsin-river-arena-spring-green": {
    "putIn": {
      "name": "Arena Landing",
      "latitude": 43.1867782,
      "longitude": -89.9016376
    },
    "takeOut": {
      "name": "Peck’s Landing / Spring Green Highway 23 landing",
      "latitude": 43.1462917,
      "longitude": -90.0602028
    },
    "logistics": {
      "distanceLabel": "10 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr, longer with sandbar stops",
      "shuttle": "Use a vehicle shuttle between Arena and Peck’s Landing near the Highway 23 bridge. Local outfitters commonly service this corridor during the paddling season.",
      "permits": "No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules and posted landing guidance.",
      "camping": "Possible as part of a relaxed sandbar outing when levels are suitable, but this app entry is framed as a day route. Do not count on sandbar camping when flows are high.",
      "summary": "Put in at Arena and take out at Peck’s Landing near Spring Green. This is a popular Lower Wisconsin sandbar day route with easy current, broad channels, and a straightforward shuttle.",
      "accessCaveats": [
        "Arena and Peck’s Landing are well-known riverway landings, but same-day parking, crowding, and outfitter traffic can affect launch logistics.",
        "Peck’s Landing is near the Highway 23 bridge; use current landing signage rather than stopping at informal riverbank pull-offs."
      ],
      "watchFor": [
        "Busy landings and sandbars during warm weekends.",
        "Changing channels around sandbars and wooded islands.",
        "Fast hidden current and drop-offs even when the surface looks calm."
      ]
    }
  },
  "wisconsin-river-spring-green-muscoda": {
    "putIn": {
      "name": "Peck’s Landing / Spring Green Highway 23 landing",
      "latitude": 43.1462917,
      "longitude": -90.0602028
    },
    "takeOut": {
      "name": "Riverside Park / Muscoda west-side landing",
      "latitude": 43.1962605,
      "longitude": -90.4357156
    },
    "logistics": {
      "distanceLabel": "22 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr, or split as an overnight",
      "shuttle": "Longer Lower Wisconsin shuttle between Spring Green and Muscoda. Plan pickup timing carefully, especially if wind, sandbar stops, or an overnight plan could slow the group.",
      "permits": "No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules, posted landing rules, and current camping/trash/PFD guidance.",
      "camping": "This is a natural overnight-capable reach at suitable flows. Wisconsin DNR allows camping on state-owned islands and sandbars for up to three days when arriving by watercraft, with no permit required, but high water can remove safe sandbars.",
      "summary": "Launch at Peck’s Landing near Spring Green and finish at Muscoda. The river remains flatwater, but the 22-mile length makes this a full-day or overnight planning route rather than a casual short float.",
      "accessCaveats": [
        "Use this as a specific scored route even though many intermediate landings exist; combining it with shorter routes would hide the full-day commitment.",
        "Confirm overnight rules, water levels, weather, and shuttle timing before launching late in the day."
      ],
      "watchFor": [
        "Fatigue, heat, wind, and storms over a long broad-river route.",
        "Unexpected upstream rain-driven rises during overnight plans.",
        "Sandbar drop-offs, hidden current, and side-channel strainers."
      ]
    }
  },
  "wisconsin-river-muscoda-woodman": {
    "putIn": {
      "name": "Muscoda Landing West",
      "latitude": 43.198,
      "longitude": -90.44576
    },
    "takeOut": {
      "name": "Woodman Landing",
      "latitude": 43.07699,
      "longitude": -90.84597
    },
    "logistics": {
      "distanceLabel": "24.5 mi",
      "estimatedPaddleTime": "Full day or multi-day trip; about 8 hr to 12+ hr depending on stops and wind",
      "shuttle": "Plan a long two-car Lower Wisconsin shuttle from Muscoda to Woodman. Intermediate landings at Port Andrew, Blue River, and Boscobel can shorten the day if weather, daylight, or group pace changes.",
      "permits": "No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules, posted landing rules, boating safety requirements, and current camping/trash guidance.",
      "camping": "Sandbar camping can work at low to moderate flows, but Wisconsin Trail Guide warns that sandbars shrink or disappear as flows rise. Do not plan an overnight when the Muscoda gauge is in the high-water bands.",
      "summary": "Launch at Muscoda Landing West and paddle the LWSR3 corridor past island braids, Blue River, Boscobel, and wooded lower-river bluffs before taking out up the Big Green River at Woodman Landing.",
      "accessCaveats": [
        "Wisconsin Trail Guide lists Muscoda Landing West as a developed ramp with trailer turnaround and parking, reached from West River Road west of Highway 80.",
        "Woodman Landing is a short distance up the Big Green River / Little Green River confluence area from the Wisconsin River; do not miss the turn near Highway 133.",
        "The route is intentionally scored as one long route even though Port Andrew, Blue River, and Boscobel are viable bailout or shorter-route landings."
      ],
      "watchFor": [
        "Long-distance fatigue, storms, heat, broad-river wind, and limited quick exits late in the route.",
        "Side-channel strainers around Columbe Island, Allen Island, Gillis Island, and other wooded island forks.",
        "Steep sandbar drop-offs and strong current, especially in the lee of islands and sandbars.",
        "High-water undercurrents and reduced sandbar camping when the Muscoda gauge rises above the normal range."
      ]
    }
  },
  "wisconsin-river-boscobel-bridgeport": {
    "putIn": {
      "name": "Boscobel Landing / Floyd Von Haden Boat Landing",
      "latitude": 43.1492722,
      "longitude": -90.715253
    },
    "takeOut": {
      "name": "Bridgeport Landing / Highway 18 bridge access",
      "latitude": 43.0239,
      "longitude": -91.0877
    },
    "logistics": {
      "distanceLabel": "23 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr, or split as an overnight",
      "shuttle": "Long lower-river shuttle from Boscobel to Bridgeport. Plan vehicle logistics before launching; there are fewer easy bailout options than on the busier Sauk-to-Spring Green corridor.",
      "permits": "No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules, posted landing rules, and current camping/trash/PFD guidance.",
      "camping": "Overnight sandbar camping may be practical at suitable flows, but use current DNR rules and avoid high-water sandbars. The route is long enough that a late start can force an unplanned overnight.",
      "summary": "Put in at Boscobel and take out at Bridgeport near the Highway 18 bridge. This is a quieter lower-river commitment with flatwater, wooded islands, sloughs, and fewer crowds than upstream segments.",
      "accessCaveats": [
        "Wisconsin DNR lists Boscobel and Bridgeport among major Lower Wisconsin access points, but Bridgeport has multiple nearby landing references; confirm the intended take-out and current road/parking conditions.",
        "The route is scored separately from Blue River-to-Boscobel because the 23-mile length and lower-river isolation change the decision."
      ],
      "watchFor": [
        "Long-distance fatigue and weather exposure.",
        "Broad lower-river wind, slough choices, and wooded island strainers.",
        "High-water hidden current and reduced sandbar availability."
      ]
    }
  },
  "wisconsin-river-millville-wyalusing-beach": {
    "putIn": {
      "name": "Millville Boat Landing",
      "latitude": 43.03505,
      "longitude": -90.96091
    },
    "takeOut": {
      "name": "Wyalusing Beach / Wyalusing Boat Landing",
      "latitude": 42.94815,
      "longitude": -91.14397
    },
    "logistics": {
      "distanceLabel": "10.8 mi",
      "estimatedPaddleTime": "About 5 hr to 6 hr depending on wind and the Mississippi finish",
      "shuttle": "Plan a two-car shuttle between Millville Boat Landing and the Wyalusing Beach / boat landing area off Highway X. The road shuttle is hillier than the river profile suggests, so confirm staging before launching.",
      "permits": "No route-specific day paddling permit is known. Follow Lower Wisconsin State Riverway rules upstream, Wyalusing-area landing rules at the take-out, and all Mississippi River boating requirements.",
      "camping": "Treat this app entry as a full-day route. Sandbar camping upstream may be possible under Lower Wisconsin rules at suitable flows, but the Wyalusing Beach finish and Mississippi confluence should be planned as a take-out, not an improvised campsite.",
      "summary": "Launch at Millville Boat Landing and finish at Wyalusing Beach after the Wisconsin River meets the Mississippi. The route has classic lower-river islands and bluff views, then a more exposed final approach with deeper water and boat traffic.",
      "accessCaveats": [
        "Wisconsin Trail Guide maps Millville Landing as a developed public landing with parking, ramp, pier, picnic area, and pit toilets.",
        "Wyalusing Beach is supported by Wisconsin DNR and Grant County public recreation references, with the saved take-out coordinate tied to the named Wyalusing Boat Landing / beach map feature rather than a DNR-published coordinate table.",
        "Do not confuse the Wyalusing Beach / recreation-area take-out with the Wyalusing State Park boat landing farther north unless you intentionally change the route and shuttle."
      ],
      "watchFor": [
        "Wind, wakes, and recreational boat traffic after entering the Mississippi River.",
        "Confluence navigation around islands, sandbars, and the main Mississippi channel.",
        "Shoreline strainers, hidden current, and sandbar drop-offs on the final Lower Wisconsin miles.",
        "Few sandbars, dirtier water, and pushier current above the normal lower-river range."
      ]
    }
  },
  "wisconsin-river-dekorra-camp-rest": {
    "putIn": {
      "name": "Dekorra Park / Main Street access",
      "latitude": 43.3868,
      "longitude": -89.5142
    },
    "takeOut": {
      "name": "Camp Rest Park",
      "latitude": 43.4158187,
      "longitude": -89.5287319
    },
    "logistics": {
      "distanceLabel": "5.1 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer if exploring back channels",
      "shuttle": "Short road shuttle between Dekorra Park and Camp Rest Park. A bike shuttle may work for some groups, but traffic and parking should be checked before committing.",
      "permits": "No route-specific paddling permit is known. Follow Town of Dekorra park rules and posted boat-launch or parking restrictions.",
      "camping": "No on-route camping assumed. Treat this as a short day trip and avoid informal island camping unless independently confirmed legal and appropriate.",
      "summary": "Launch at Dekorra Park and finish at Camp Rest Park. This keeps the most interesting part of the Dekorra route, including back channels, sandbars, islands, and sandstone outcrops, while avoiding the rough open-water finish to James Whalen.",
      "accessCaveats": [
        "Dekorra Park and Camp Rest Park are Town of Dekorra public recreation facilities, but boat traffic and local launch etiquette matter.",
        "Do not continue into the Lake Wisconsin-style open-water section unless wind, waves, boat traffic, and the take-out plan are all acceptable."
      ],
      "watchFor": [
        "Motorboat and jet-ski wakes, especially near the main channel and sandstone walls.",
        "Wind and whitecaps if you continue beyond Camp Rest toward Lake Wisconsin.",
        "Undertows, drop-offs, poison ivy on islands, and shoreline strainers during high water."
      ]
    }
  },
  "la-crosse-river-fishermans-hammer": {
    "putIn": {
      "id": "fishermans-park-sparta",
      "name": "Fisherman's Park / Sparta canoe landing",
      "latitude": 43.94223,
      "longitude": -90.80265
    },
    "takeOut": {
      "id": "hammer-road-bridge",
      "name": "Hammer Road Bridge take-out",
      "latitude": 43.9199,
      "longitude": -90.8718
    },
    "logistics": {
      "distanceLabel": "About 5.4 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with portages, low water, or scouting",
      "shuttle": "Stage the Hammer Road bridge take-out first because the parking and carry are workable but not polished. Then drive back to Fisherman's Park in Sparta and inspect the first ledgy current below the park before launching.",
      "permits": "No route-specific paddling permit is known. Use the public Sparta landing and bridge access respectfully, follow Wisconsin boating/PFD rules, and obey any posted city or road-right-of-way parking limits.",
      "camping": "Treat this as a no-camping day route. Do not assume private banks, sandbars, or the Hammer Road bridge corridor are legal overnight stops.",
      "campingClassification": "none",
      "summary": "Launch at Fisherman's Park in Sparta and take out at Hammer Road Bridge for the short ledgy upper La Crosse River run. Use the direct Sparta gauge as a minimum-only check and stand down when current wood reports point to mandatory portages the group cannot handle.",
      "accessCaveats": [
        "Wisconsin River Trips reports a 2024 logjam update upstream from Amundson Park. Recheck recent wood and portage reports before committing.",
        "Hammer Road is a bridge take-out with a carry and limited parking, not a developed park ramp. Inspect it before leaving vehicles.",
        "Stay off private banks away from the named access points, especially if a logjam or ledge tempts an improvised exit."
      ],
      "watchFor": [
        "Former-dam remnants, modest ledges, and shallow boulder lines that get scrapier below the 150 cfs floor.",
        "Fresh sweepers, logjams, and strainers in fast outside bends.",
        "Cold water, urban debris near Sparta, narrow bridge access, and private banks."
      ]
    },
    "accessPoints": [
      {
        "id": "fishermans-park-sparta",
        "name": "Fisherman's Park / Sparta canoe landing",
        "latitude": 43.94223,
        "longitude": -90.80265,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for this route."
      },
      {
        "id": "hammer-road-bridge",
        "name": "Hammer Road Bridge take-out",
        "latitude": 43.9199,
        "longitude": -90.8718,
        "mileFromStart": 5.4,
        "segmentKind": "creek",
        "note": "Default take-out for this route; inspect parking and carry before launch."
      }
    ]
  },
  "la-crosse-river-highway-108-veterans": {
    "putIn": {
      "id": "highway-108-county-c-west-salem",
      "name": "Highway 108 / County C public landing below Neshonoc dam",
      "latitude": 43.91421,
      "longitude": -91.07612
    },
    "takeOut": {
      "id": "veterans-memorial-campground-canoe-landing",
      "name": "Veterans Memorial County Park canoe landing",
      "latitude": 43.89187,
      "longitude": -91.11906
    },
    "logistics": {
      "distanceLabel": "About 4.2 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer if scouting the class II ledge",
      "shuttle": "Stage the take-out inside Veterans Memorial County Park first, then launch below the Highway 108 / County C dam area. Identify the campground landing from land because it is easy to miss from the river.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, launch below the dam, and obey all La Crosse County campground parking and access directions.",
      "camping": "Veterans Memorial County Park provides endpoint campground support, but the paddle itself is a short day route. Use normal campground reservations and rules rather than informal river camping.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch below the West Salem / Neshonoc dam area and take out at Veterans Memorial County Park for a compact La Crosse River moving-water route. The La Crosse gauge is currently inside the preferred window but near its high end, so expect brisker current than a low-water day.",
      "accessCaveats": [
        "Launch below the dam/outflow area. Do not drift upstream toward the dam or treat the powerhouse/tunnel outflow as part of this route.",
        "The Veterans Memorial campground landing is marked from the water but easier to miss from land. Scout it before launching.",
        "The former-dam ledge downstream from County M can be portaged on river left only where access is legal and practical; do not use private river-right yards."
      ],
      "watchFor": [
        "Class II former-dam ledge, riffles, boulder gardens, and standing waves.",
        "Leaning branches and strainers in fast current, especially when the La Crosse gauge rises above about 450 cfs.",
        "Cold water, campground traffic, private banks, and the risk of overshooting the take-out."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-108-county-c-west-salem",
        "name": "Highway 108 / County C public landing below Neshonoc dam",
        "latitude": 43.91421,
        "longitude": -91.07612,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for this route."
      },
      {
        "id": "county-m-former-dam-ledge",
        "name": "County M former-dam ledge",
        "latitude": 43.9047,
        "longitude": -91.0982,
        "mileFromStart": 2,
        "segmentKind": "creek",
        "note": "Approximate class II ledge zone; scout or portage only where legal and practical."
      },
      {
        "id": "veterans-memorial-campground-canoe-landing",
        "name": "Veterans Memorial County Park canoe landing",
        "latitude": 43.89187,
        "longitude": -91.11906,
        "mileFromStart": 4.2,
        "segmentKind": "creek",
        "note": "Default take-out and endpoint campground access."
      }
    ]
  },
  "trempealeau-river-whitehall-independence": {
    "putIn": {
      "id": "colonel-larson-park-canoe-landing",
      "name": "Colonel Larson Park canoe landing",
      "latitude": 44.37277,
      "longitude": -91.32128
    },
    "takeOut": {
      "id": "schultz-park-four-seasons-park",
      "name": "Schultz Park / Four Seasons Park",
      "latitude": 44.35982,
      "longitude": -91.4165
    },
    "logistics": {
      "distanceLabel": "About 8.0 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low water, fishing stops, or log portages",
      "shuttle": "Stage the Independence take-out first, then drive back to Colonel Larson Park in Whitehall. Check the first few hundred yards below the launch if possible because Miles Paddled reports a large-tree portage shortly downstream.",
      "permits": "No route-specific paddling permit is known. Use the park landings, follow Wisconsin boating/PFD rules, and obey local park parking or event restrictions.",
      "camping": "Treat this as a day trip. Nearby county or state park camping can support a weekend, but no on-route river camping is documented for this Whitehall-to-Independence segment.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Colonel Larson Park and take out at Schultz / Four Seasons Park for an easy Trempealeau River day with sand-bottom current and real wood hazards. The Dodge gauge is a downstream proxy, so same-day local visual checks still matter.",
      "accessCaveats": [
        "The Dodge gauge is downstream of the route. Use it as the route-source benchmark, then make a local visual call at Whitehall.",
        "Miles Paddled publishes the named Schultz / Four Seasons Park take-out but its coordinate appears inconsistent with the named Independence park and 8-mile route; this app pins the take-out to the Independence Four Seasons Park / Elm Street area.",
        "Miles Paddled reports a mandatory tree portage near the launch and a possible portage near the finish. Recent storms can change this quickly.",
        "Do not turn inviting sandbars or private farm banks into campsite assumptions; use formal campgrounds off-route if staying overnight."
      ],
      "watchFor": [
        "Sweepers and strainers in deceptively swift current.",
        "Shallow sand and walking if the gauge drops below the selected minimum.",
        "Cold water, fast rises after rain, rural access spacing, and private banks."
      ]
    },
    "accessPoints": [
      {
        "id": "colonel-larson-park-canoe-landing",
        "name": "Colonel Larson Park canoe landing",
        "latitude": 44.37277,
        "longitude": -91.32128,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for this route."
      },
      {
        "id": "schultz-park-four-seasons-park",
        "name": "Schultz Park / Four Seasons Park",
        "latitude": 44.35982,
        "longitude": -91.4165,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Default take-out for this route."
      }
    ]
  },
  "la-crosse-river-veterans-holiday-heights": {
    "putIn": {
      "name": "Veterans Memorial Campground canoe landing",
      "latitude": 43.891232,
      "longitude": -91.116408
    },
    "takeOut": {
      "name": "Holiday Heights Park / Holiday Heights Landing",
      "latitude": 43.86201,
      "longitude": -91.20178
    },
    "logistics": {
      "distanceLabel": "8.6 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr",
      "shuttle": "Use a westbound car shuttle from Veterans Memorial Campground near West Salem to Holiday Heights Park in Onalaska. A bike shuttle can use the La Crosse River State Trail for much of the return, but trail passes, route-finding from the park, and boat security at the take-out need to be planned ahead.",
      "permits": "No route-specific paddling permit is known. Follow La Crosse County campground and Onalaska park rules, and use posted parking areas rather than campground roads or informal riverbank pull-offs.",
      "camping": "Veterans Memorial Campground is a developed county campground at the put-in, but this app route should be treated as a day trip unless a campsite is separately reserved or otherwise allowed under county rules.",
      "summary": "Launch from the Veterans Memorial Campground canoe landing on the La Crosse River and take out at Holiday Heights Landing in Holiday Heights Park. The first miles are straighter and noisier near I-90, while the lower half has better sandbanks, faster current, and bluff views.",
      "accessCaveats": [
        "La Crosse County publishes campground coordinates for Veterans Memorial Campground and confirms river access; Wisconsin River Trips notes the actual canoe landing is inside the campground and parking may be several hundred feet from the water.",
        "Holiday Heights Park is a public Onalaska park, and Wisconsin River Trips describes the landing as a good public-access take-out with parking but no restroom.",
        "The Holiday Heights access road can be easy to miss from Highway 16; confirm the turn pattern before leaving a shuttle vehicle."
      ],
      "watchFor": [
        "Fast strainers and tight gaps around downed wood, especially in the second half of the trip.",
        "Pushier current and covered sandbars above about 500 cfs on the La Crosse gauge.",
        "Minor Class I current around I-90 and changing wood after storms or spring runoff.",
        "Campground traffic, bike-trail traffic, and limited take-out amenities."
      ]
    }
  },
  "black-river-cormican-irving": {
    "putIn": {
      "id": "black-river-bruce-cormican-landing",
      "name": "Bruce Cormican Landing",
      "latitude": 44.28787,
      "longitude": -90.85102
    },
    "takeOut": {
      "id": "black-river-david-hansen-irving",
      "name": "David Hansen Memorial Landing / Irving",
      "latitude": 44.18761,
      "longitude": -90.89892
    },
    "logistics": {
      "distanceLabel": "About 12.1 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with low water, wood, or scouting",
      "shuttle": "Stage the David Hansen Memorial Landing at Irving first, then drive back to Bruce Cormican Landing. Confirm both landings and the long rural shuttle before launching.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, state-forest and county access signs, and posted campsite restrictions.",
      "camping": "Wisconsin Trail Guide maps a small Black River State Forest primitive canoe/kayak campsite between Mason Landing and Irving, with two first-come sites, a picnic table, fire ring, and shared toilet. Treat it as one-night-only, weather-dependent support rather than guaranteed capacity.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Bruce Cormican Landing and finish at the David Hansen Memorial Landing in Irving. This is a long lower-Black connector with quietwater, shallow riffles, split channels, and remote shoreline.",
      "accessCaveats": [
        "The route starts below the Black River Falls dam corridor; do not improvise an upstream launch or dam passage.",
        "Hawk Island and shallow split channels can become bony at low water. Walk the landing and inspect the first channel before committing.",
        "Use the signed Irving landing as the planned finish and do not substitute private campground access without permission."
      ],
      "watchFor": [
        "Low-water scraping, exposed sandbars, split channels, and fresh wood after storms.",
        "Cold water, strainers, rising current, and fatigue on the 12-mile commitment.",
        "Remote shoreline and limited legal bailout options outside the named landings and campsite context."
      ]
    },
    "accessPoints": [
      {
        "id": "black-river-bruce-cormican-landing",
        "name": "Bruce Cormican Landing",
        "latitude": 44.28787,
        "longitude": -90.85102,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in below the Black River Falls dam corridor."
      },
      {
        "id": "black-river-perry-creek-landing",
        "name": "Perry Creek Landing",
        "latitude": 44.2677999734879,
        "longitude": -90.8599599599838,
        "mileFromStart": 2.7,
        "segmentKind": "creek",
        "note": "Intermediate landing from Wisconsin Trail Guide GPX; verify parking and landing condition before counting on it as a bailout."
      },
      {
        "id": "black-river-masons-landing",
        "name": "Mason Landing",
        "latitude": 44.254909992218,
        "longitude": -90.8801699876785,
        "mileFromStart": 4.5,
        "segmentKind": "creek",
        "note": "Intermediate landing from Wisconsin Trail Guide GPX and a practical checkpoint before the state-forest campsite reach."
      },
      {
        "id": "black-river-state-forest-canoe-campsite",
        "name": "Black River State Forest canoe campsite",
        "latitude": 44.2352800369263,
        "longitude": -90.8825199604034,
        "mileFromStart": 6.2,
        "segmentKind": "creek",
        "note": "Mapped primitive canoe/kayak campsite; capacity and current rules must be confirmed before treating it as an overnight plan."
      },
      {
        "id": "black-river-david-hansen-irving",
        "name": "David Hansen Memorial Landing / Irving",
        "latitude": 44.18761,
        "longitude": -90.89892,
        "mileFromStart": 12.1,
        "segmentKind": "creek",
        "note": "Default downstream finish and shuttle staging point."
      }
    ]
  },
  "black-river-irving-melrose": {
    "putIn": {
      "id": "black-river-david-hansen-irving",
      "name": "David Hansen Memorial Landing / Irving",
      "latitude": 44.18761,
      "longitude": -90.89892
    },
    "takeOut": {
      "id": "black-river-melrose-landing",
      "name": "Melrose Landing",
      "latitude": 44.10879,
      "longitude": -90.99627
    },
    "logistics": {
      "distanceLabel": "About 11.8 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, wood, or scouting",
      "shuttle": "Stage Melrose Landing first, then return to the David Hansen Memorial Landing at Irving. Leave daylight for the island channels and the rural shuttle.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules and posted access, campground, and parking instructions.",
      "camping": "Wisconsin Trail Guide describes frequent lower-Black sandbar or beach camping, but this should be treated as conditional river camping. Confirm current water levels, weather, land ownership, and one-night-use expectations before planning an overnight.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at Irving and finish at Melrose for the popular lower-Black sandbar and bluff segment. It is mostly quietwater with riffles, but the distance, island channels, and private-bank limits require a real shuttle plan.",
      "accessCaveats": [
        "Use the named Irving and Melrose landings; Lost Falls Campground and other private landings are not default public stops.",
        "Low water can force wading or boat dragging around islands, while high water covers sandbars and increases strainer consequences.",
        "Do not continue below Melrose unless the separate Melrose-to-North Bend route and shuttle are intentional."
      ],
      "watchFor": [
        "Shallow island channels, sandbars, strainers, and changing current after rain.",
        "Cold water and long-route fatigue before the Melrose finish.",
        "Private banks, campground traffic, and limited legal emergency exits."
      ]
    },
    "accessPoints": [
      {
        "id": "black-river-david-hansen-irving",
        "name": "David Hansen Memorial Landing / Irving",
        "latitude": 44.18761,
        "longitude": -90.89892,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in and public landing at the upstream end of BK3."
      },
      {
        "id": "black-river-linde-landing",
        "name": "Linde Landing",
        "latitude": 44.1366200447083,
        "longitude": -90.9662100076675,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Intermediate landing from Wisconsin Trail Guide GPX; confirm public access, parking, and road condition before using it as a bailout."
      },
      {
        "id": "black-river-melrose-landing",
        "name": "Melrose Landing",
        "latitude": 44.10879,
        "longitude": -90.99627,
        "mileFromStart": 11.8,
        "segmentKind": "creek",
        "note": "Default downstream finish; do not assume nearby private campground access is public."
      }
    ]
  },
  "black-river-wayside-reese": {
    "putIn": {
      "id": "black-river-wayside-park",
      "name": "Wayside Park / Popple River access",
      "latitude": 44.83664,
      "longitude": -90.59844
    },
    "takeOut": {
      "id": "black-river-reese-avenue",
      "name": "Reese Avenue canoe launch",
      "latitude": 44.7687732,
      "longitude": -90.6041106
    },
    "logistics": {
      "distanceLabel": "About 6.8 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with scouting or portages",
      "shuttle": "Stage Reese Avenue first, then return to Wayside Park. The rural shuttle is short but the water is whitewater-filtered and should not be rushed.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, local park signs, and posted roadside access instructions.",
      "camping": "No on-route public camping is documented for this short whitewater day run. Treat it as a day trip and use off-route campgrounds only under their normal rules.",
      "campingClassification": "none",
      "summary": "Launch at Wayside Park on the Popple River and finish at Reese Avenue after the Popple-to-Black connector. Expect frequent Class I-II rapids, Hemlock Rapids, Giles Rapids, scout-or-portage decisions, and limited clean bailouts.",
      "accessCaveats": [
        "Wayside Park is the named public start on the Popple; do not substitute an informal bridge shoulder without confirming legal access.",
        "Reese Avenue is a small, somewhat hidden canoe launch near Greenwood. Walk the trail and confirm parking before staging the shuttle vehicle.",
        "The route enters the Black River at the Popple confluence. Use Reese Avenue as the planned take-out and do not continue downstream into a separate Greenwood plan."
      ],
      "watchFor": [
        "Hemlock Rapids, a Class III feature near Warner Drive that should be scouted and can be portaged when it exceeds the group skill level.",
        "Frequent Class I-II rapids, low-water rock contact, high-water push, cold water, fresh wood, and limited emergency landings.",
        "Remote or private banks outside the named Wayside and Reese access areas."
      ]
    },
    "accessPoints": [
      {
        "id": "black-river-wayside-park",
        "name": "Wayside Park / Popple River access",
        "latitude": 44.83664,
        "longitude": -90.59844,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in on the Popple River before the Black River confluence."
      },
      {
        "id": "black-river-reese-avenue",
        "name": "Reese Avenue canoe launch",
        "latitude": 44.7687732,
        "longitude": -90.6041106,
        "mileFromStart": 6.8,
        "segmentKind": "creek",
        "note": "Planned finish near Greenwood; confirm the hidden trail and shoulder parking before launch."
      }
    ]
  },
  "black-river-melrose-north-bend": {
    "putIn": {
      "name": "Melrose Public Landing",
      "latitude": 44.1261,
      "longitude": -91.0045
    },
    "takeOut": {
      "name": "North Bend Landing",
      "latitude": 44.08951,
      "longitude": -91.11544
    },
    "logistics": {
      "distanceLabel": "10.1 mi",
      "estimatedPaddleTime": "About 5 hr for most groups, longer with sandbar stops",
      "shuttle": "Use a vehicle or local livery shuttle between Melrose Public Landing and North Bend Landing. The bike shuttle is hilly and indirect, so most groups should stage vehicles or use a Black River shuttle operator.",
      "permits": "No route-specific paddling permit is known. Use the DNR-maintained public access points at Melrose and North Bend, and follow posted parking rules when the landings overflow on busy summer weekends.",
      "camping": "Sandbar camping is commonly used on this lower-Black corridor, but confirm current rules, weather, and overnight river levels before planning it as more than a day trip.",
      "summary": "Launch at Melrose Public Landing and take out at North Bend Landing for the classic lower-Black sandbar day. The route has easy current, big sand beaches, sandstone outcrops, and a direct upstream Black River Falls gauge ladder.",
      "accessCaveats": [
        "Wisconsin DNR says it owns and maintains Black River access at Melrose and North Bend, and Wisconsin River Trips describes both as public landings.",
        "The Melrose lot can fill on popular weekends, with overflow parking pushed toward the Highway 108 shoulder.",
        "The North Bend landing sits near a livery and remains public, but the main lot is small and can spill over onto North Bend Drive."
      ],
      "watchFor": [
        "A 10-mile day that can run long if you start late, paddle a slow canoe, stop often, or fight a headwind.",
        "Shallow bars and possible walking below about 100 cfs on the Black River Falls gauge.",
        "Fewer sandbars and less route character as the gauge rises above about 450 to 600 cfs.",
        "Shoreline strainers, shallow motorboat traffic, crowded summer weekends, and the signed right-channel choice near North Bend."
      ]
    }
  },
  "waupaca-river-county-q-brainards-bridge": {
    "putIn": {
      "name": "County Highway Q / Cobbtown Road canoe launch",
      "latitude": 44.37413,
      "longitude": -89.18548
    },
    "takeOut": {
      "name": "Brainard's Bridge Park",
      "latitude": 44.36546,
      "longitude": -89.09842
    },
    "logistics": {
      "distanceLabel": "7.8 mi",
      "estimatedPaddleTime": "About 3 hr to 3.5 hr at normal recreational pace",
      "shuttle": "Use a short Waupaca-area car shuttle between the County Q / Cobbtown Road public parking area and Brainard's Bridge Park. A bike shuttle is possible but includes hills, town riding, and busy-road crossings.",
      "permits": "No route fee is listed by Visit Waupaca County. Follow posted rules at the County Q access and Brainard's Bridge Park, and park only in public parking areas.",
      "camping": "No on-route camping is documented for this short city-adjacent day trip. Treat it as a day paddle.",
      "summary": "Launch at the public Cobbtown Road / County Q canoe access and take out at Brainard's Bridge Park in Waupaca. This is the standard Waupaca River day run with clear water, boulder gardens, riffles, wooded bends, and a public city-park finish.",
      "accessCaveats": [
        "Visit Waupaca County describes public parking on Cobbtown Road just off Highway Q, while Miles Paddled records the launch GPS point at the County Q access.",
        "Brainard's Bridge Park is a public city park with facilities, islands, trails, and river access context, but the take-out can be busy during park events.",
        "The covered bridge corridor includes private-drive context nearby; use the public park and named access points rather than informal stops on private banks."
      ],
      "watchFor": [
        "Fallen trees, duck-unders, hop-overs, and fresh strainers, especially after storms.",
        "Boulder gardens, riffles, and Class I current that become pushier as the Waupaca gauge rises.",
        "Shallow scraping in the final mile and at boulder gardens when the gauge is near the low end.",
        "Road noise, bridge approaches, and other paddlers on this popular route during warm weekends."
      ]
    }
  },
  "brule-river-highway-139-fr-2150": {
    "putIn": {
      "name": "Highway 139/189 Bridge Landing",
      "latitude": 45.98767,
      "longitude": -88.65238
    },
    "takeOut": {
      "name": "Forest Road 2150 Landing",
      "latitude": 45.99013,
      "longitude": -88.45013
    },
    "logistics": {
      "distanceLabel": "16.2 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr",
      "shuttle": "Plan a long remote shuttle between the Highway 139/189 bridge on the Wisconsin-Michigan line and the end of Forest Road 2150. Roads are sparse, so download maps and confirm road conditions before leaving a vehicle.",
      "permits": "No route-specific paddling permit is known. Follow posted forest-road, landing, camping, and fire rules, and use only the named hand-carry landings or established primitive campsites.",
      "camping": "Wisconsin Trail Guide identifies primitive first-come riverside campsites at Twins Rapids and below Two Foot Falls. Confirm current forest rules, fire restrictions, and campsite availability before planning this as an overnight.",
      "summary": "Launch from the hand-carry Highway 139/189 Bridge Landing and paddle the border Brule to Forest Road 2150. This is a long, remote northwoods route with clear current, marsh and mixed-forest banks, class I-II rapids, and a useful downstream Highway 2 gauge.",
      "accessCaveats": [
        "The Highway 139/189 landing is on the Wisconsin side south of the bridge, reached by a gravel track with limited parking.",
        "Forest Road 2150 is a hand-carry landing with parking, but the current can rip through the take-out area at higher water. Start looking for the exit early.",
        "This corridor has low road density and limited quick exits. Treat phone coverage and self-rescue as uncertain."
      ],
      "watchFor": [
        "Class I-II features including Twins Rapids, Railroad Rapids, Two Foot Falls, and unnamed boulder gardens.",
        "Scraping and bumpy rock gardens when the US Highway 2 gauge is below the 220 cfs / 3.5 ft minimum.",
        "Pushier waves, stronger take-out current, cold water, and remote rescue conditions at higher flows or after rain.",
        "Private shoreline context near the Forest Road 2150 landing; use the signed/known landing path rather than nearby banks."
      ]
    }
  },
  "pike-river-amberg-yellow-bridge": {
    "putIn": {
      "name": "Amberg Highway 141 Landing",
      "latitude": 45.49576,
      "longitude": -87.98712
    },
    "takeOut": {
      "name": "Yellow Bridge Landing",
      "latitude": 45.47494,
      "longitude": -87.87593
    },
    "logistics": {
      "distanceLabel": "9.4 mi",
      "estimatedPaddleTime": "About 4 hr",
      "shuttle": "Plan a rural Marinette County shuttle between the Highway 141 landing south of Amberg and Yellow Bridge Landing on Pike River Road near Barker Road. Roads are straightforward, but cell coverage and quick exits are limited once you are on the river.",
      "permits": "No route-specific paddling permit is known. Use the named hand-carry landings, keep the Yellow Bridge Falls scouting/portage tight to the riverbank where the guide notes private land, and follow posted landing rules.",
      "camping": "No on-route camping is documented for the 9.4-mile PK1 day route. Treat this as a day paddle unless a land manager separately confirms a legal campsite.",
      "summary": "Launch at the Amberg Highway 141 Landing and paddle the Pike River to Yellow Bridge Landing. This is a scenic Wild River whitewater route with class I-II rapids, granite ledges, clear northwoods current, and a take-out just above the stronger Yellow Bridge Falls.",
      "accessCaveats": [
        "The Highway 141 put-in is a hand-carry landing south of the bridge on the west side of the highway, reached by a gravel trail from the parking area.",
        "Yellow Bridge Landing is on river left above the second drop and before Barker Road. Start looking early because missing the landing commits you toward Yellow Bridge Falls.",
        "Several banks around Yellow Bridge Falls are private. Scout and portage from the riverbank corridor described by the guide rather than wandering inland."
      ],
      "watchFor": [
        "Class II Bull Falls, Scrounge Canyon, Horseshoe Falls, and multiple unnamed boulder-garden rapids.",
        "Yellow Bridge Falls below the landing, which can become Class III-IV at higher water and is not part of the broad-audience route recommendation.",
        "Bony ledges and possible portages below 2.9 ft at Amberg, especially below County K.",
        "Pushy waves, stronger holes, strainers, deadfall, cold water, and remote rescue conditions above the normal 2.9-4.1 ft window."
      ]
    }
  },
  "pike-river-yellow-bridge-grogan-road": {
    "putIn": {
      "name": "Yellow Bridge Landing",
      "latitude": 45.47494,
      "longitude": -87.87593
    },
    "takeOut": {
      "name": "Grogan Road Landing",
      "latitude": 45.44202,
      "longitude": -87.85582
    },
    "logistics": {
      "distanceLabel": "4.8 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, plus scouting time",
      "shuttle": "Use a short but remote Pike River Road and Grogan Road shuttle from Yellow Bridge Landing to the Menominee confluence. Download maps before leaving Amberg and do not count on cell coverage at the accesses.",
      "permits": "No route-specific paddling permit is known. Use the named landings, keep scouting and portaging tight to the riverbank near private land, and follow posted Wild River and road-access rules.",
      "camping": "No on-route campsite is documented for this short lower Pike run. Treat it as a technical day route and use separate public campground planning if staying in the area.",
      "summary": "Launch at Yellow Bridge Landing, scout the Yellow Bridge Falls short-run, then continue past Pike River Road access points to Grogan Road Landing at the Menominee River confluence. This is the advanced lower-Pike companion to the longer Amberg-to-Yellow-Bridge route.",
      "accessCaveats": [
        "Yellow Bridge Landing is on river left above Barker Road and just above the falls sequence. It is a hand-carry access reached by a footpath from a small parking area.",
        "Pike River Road Landing sits just below the final Yellow Bridge Rapids drop and can be hard to spot in heavy underbrush. Use it as a bailout only if you identify it during scouting or from the road first.",
        "Grogan Road Landing is a developed ramp on river right at the Menominee River confluence. Confirm the exit before continuing into the border-river current."
      ],
      "watchFor": [
        "Class III Yellow Bridge Falls immediately below the put-in, with 2- to 5-foot drops, a rocky Class II runout, and a river-wide ledge.",
        "Private land along the falls scout and portage area. Wisconsin Trail Guide says to stay along the riverbank.",
        "Bony rocks and pin potential below the 3.5 ft practical falls window, and pushy waves that may overpower intermediates above 4.6 ft.",
        "Cold water, deadfall, limited quick exits, and the transition into the Menominee River confluence near the take-out."
      ]
    }
  },
  "popple-river-fr-2398-morgan-lake": {
    "putIn": {
      "id": "fr-2398-bridge-landing",
      "name": "Forest Road 2398 Bridge Landing",
      "latitude": 45.7663,
      "longitude": -88.60577
    },
    "takeOut": {
      "id": "morgan-lake-road-landing",
      "name": "Morgan Lake Road Bridge Landing",
      "latitude": 45.76343,
      "longitude": -88.46304
    },
    "logistics": {
      "distanceLabel": "11 mi",
      "estimatedPaddleTime": "About 5 hr to 6 hr, plus scouting, low-water, or camp time",
      "shuttle": "Run a remote Chequamegon-Nicolet / Florence County shuttle between FR 2398 and Morgan Lake Road. Download maps, inspect both bridge landings, and confirm the Morgan Lake Road gauge trend before committing.",
      "permits": "No route-specific paddling permit is known. Use the named bridge landings and follow Wisconsin DNR Pine-Popple Wild Rivers, national forest, and posted road-access rules.",
      "camping": "WTG documents a primitive canoe/kayak campsite at FR 2159 Bridge Landing within this route and says Popple canoe/kayak campsites are free, first-come, primitive, and limited to one night. Confirm current DNR/forest rules and fire restrictions before planning an overnight.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at FR 2398 Bridge Landing and take out at Morgan Lake Road Bridge Landing for Popple PO1. The route mixes quiet marsh, narrow forest current, Class I-II boulder gardens, Burnt Dam Rapids, a mid-route primitive campsite, and the direct in-route Popple gauge.",
      "accessCaveats": [
        "FR 2398 is a hand-carry roadside bridge landing with roadside parking, not a developed livery launch.",
        "FR 2159 / Newald Tower Road is an intermediate bridge landing and primitive campsite, but campsite availability is first-come and should not be assumed.",
        "Morgan Lake Road is also the USGS gauge corridor and the take-out for this card. Identify the bridge landing before launching because continuing downstream starts the harder PO2 whitewater."
      ],
      "watchFor": [
        "First Rapids, boulder gardens, the remains of Podunk Dam, and two pitches of Burnt Dam Rapids.",
        "Low water below 150 cfs, when rapids become bony and scraping increases.",
        "High water above 500 cfs, when WTG says novice paddlers should avoid the river and strainers or deadfall become more hazardous.",
        "Cold water, limited cell service, private or unclear banks, and long rescue times."
      ]
    },
    "accessPoints": [
      {
        "id": "fr-2398-bridge-landing",
        "name": "Forest Road 2398 Bridge Landing",
        "latitude": 45.7663,
        "longitude": -88.60577,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default PO1 put-in at the FR 2398 bridge."
      },
      {
        "id": "fr-2159-bridge-landing",
        "name": "FR 2159 Bridge Landing / primitive campsite",
        "latitude": 45.7577,
        "longitude": -88.52758,
        "mileFromStart": 6.3,
        "segmentKind": "creek",
        "note": "WTG intermediate landing and primitive campsite near the direct gauge corridor."
      },
      {
        "id": "morgan-lake-road-landing",
        "name": "Morgan Lake Road Bridge Landing",
        "latitude": 45.76343,
        "longitude": -88.46304,
        "mileFromStart": 11,
        "segmentKind": "creek",
        "note": "Default PO1 take-out and start of the harder PO2 whitewater."
      }
    ]
  },
  "popple-river-morgan-lake-highway-101": {
    "putIn": {
      "name": "Morgan Lake Road / Forest Service Road 2159 bridge access",
      "latitude": 45.763611,
      "longitude": -88.463611
    },
    "takeOut": {
      "name": "Highway 101 Wayside / Popple River bridge access",
      "latitude": 45.79995,
      "longitude": -88.39662
    },
    "logistics": {
      "distanceLabel": "5.4 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, plus scouting and portage time",
      "shuttle": "Use a remote Florence County shuttle from the Morgan Lake Road bridge to the Highway 101 wayside. Roads are rural and partly gravel, so download maps and expect limited cell coverage.",
      "permits": "No route-specific paddling permit is known. Use the signed bridge/wayside access points, respect private land near portage trails, and follow Pine-Popple Wild Rivers rules.",
      "camping": "Treat this as a short technical day route. Nearby national forest or county camping is a separate base-camp plan, not an assumed riverside campsite on this 5.4-mile run.",
      "summary": "Launch at the Morgan Lake Road / Forest Service Road 2159 bridge and take out at the Highway 101 wayside. This is the lower Popple whitewater run through Little Bull Falls, Big Bull Falls, tight boulder gardens, marked portages, and protected Wild River forest.",
      "accessCaveats": [
        "The Morgan Lake Road put-in is a bridge/gauge-area access rather than a developed livery launch. Confirm shoulder, parking, and road conditions before unloading.",
        "At Highway 101, American Whitewater describes the take-out on river left near the bridge and shallow gravel shore. Identify the exit before continuing downstream.",
        "Several scouting or emergency paths touch private land. Stay on signed/accepted river-portage routes and keep the group tight."
      ],
      "watchFor": [
        "Little Bull Falls, where an aggressive hole and submerged bedrock feature can make rescues difficult.",
        "Big Bull Falls and its approach, where swift current can carry paddlers past the portage landing.",
        "Low-water scraping below 150-250 cfs and technical boulder dodging even inside the runnable range.",
        "High water, sticky holes, strainers, deadfall, spring ice shelves, cold water, and limited road exits in the Wild River corridor."
      ]
    }
  },
  "popple-river-highway-101-white-ash": {
    "putIn": {
      "id": "highway-101-wayside-landing",
      "name": "Highway 101 Wayside Landing",
      "latitude": 45.80005,
      "longitude": -88.39733
    },
    "takeOut": {
      "id": "white-ash-white-birch-road-landing",
      "name": "White Ash / White Birch Road Landing",
      "latitude": 45.83957,
      "longitude": -88.3389
    },
    "logistics": {
      "distanceLabel": "About 6 to 6.3 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, plus mandatory scouting and portage time",
      "shuttle": "Stage the take-out at the White Ash / White Birch Road landing before launching from Highway 101. WTG notes White Ash Road can be rough and sometimes has a shallow flooded section, so confirm vehicle access before leaving the put-in.",
      "permits": "No route-specific paddling permit is known. Use signed Pine-Popple Wild Rivers access points, stay on accepted scout/portage routes, and obey Wisconsin DNR / Florence County access rules.",
      "camping": "No normal campsite is assumed on this lower PO2 split. WTG documents a primitive campsite upstream near Nine Day Rapids on the full Morgan-to-Pine route; treat this Highway-101-to-Pine split as a technical day route unless separately planning a legal Wild River overnight.",
      "campingClassification": "none",
      "summary": "Launch at Highway 101 Wayside and take out on the Pine River just below the Popple confluence at the White Ash / White Birch Road landing. This is the downstream PO2 split with boulder gardens, Washburn Falls, Jennings Falls, rugged portages, and a proxy gauge upstream at Morgan Lake Road.",
      "accessCaveats": [
        "Highway 101 Wayside has a short trail from parking to a small gravel beach downstream of the bridge.",
        "The take-out is on the Pine River about 30 yards below the confluence, reached from White Ash Road / White Birch Road. Confirm road and landing condition before launching.",
        "The selected USGS gauge is upstream in PO1. Use it as a corridor proxy and make a visual decision at Highway 101 before committing to the falls."
      ],
      "watchFor": [
        "Nearly continuous Class I-II boulder gardens shortly below Highway 101.",
        "Washburn Falls, where WTG warns paddlers may not recognize the falls until they are committed if they miss the right-bank portage sign.",
        "Jennings Falls / Popple Rapids, sharp bends, granite walls, ledges, sticky holes, and no developed portage.",
        "Strainers, deadfall, cold water, remote rescue exposure, and a missed take-out into the Pine River corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-101-wayside-landing",
        "name": "Highway 101 Wayside Landing",
        "latitude": 45.80005,
        "longitude": -88.39733,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the Highway 101 wayside landing."
      },
      {
        "id": "washburn-falls",
        "name": "Washburn Falls",
        "latitude": 45.81138,
        "longitude": -88.36517,
        "mileFromStart": 2.4,
        "segmentKind": "creek",
        "note": "Class III falls with a rugged right-bank scout/portage."
      },
      {
        "id": "jennings-falls-popple-rapids",
        "name": "Jennings Falls / Popple Rapids",
        "latitude": 45.83693,
        "longitude": -88.36399,
        "mileFromStart": 4.9,
        "segmentKind": "creek",
        "note": "Class III ledge sequence near the lower end of PO2."
      },
      {
        "id": "white-ash-white-birch-road-landing",
        "name": "White Ash / White Birch Road Landing",
        "latitude": 45.83957,
        "longitude": -88.3389,
        "mileFromStart": 6.3,
        "segmentKind": "creek",
        "note": "Default take-out on the Pine River just below the Popple confluence."
      }
    ]
  },
  "pine-river-county-n-wepco-5": {
    "putIn": {
      "name": "County N Bridge Landing",
      "latitude": 45.83711,
      "longitude": -88.22522
    },
    "takeOut": {
      "name": "WEPCO Landing #5",
      "latitude": 45.83949,
      "longitude": -88.1408
    },
    "logistics": {
      "distanceLabel": "9.3 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr",
      "shuttle": "Use a rural Florence County shuttle from County N Bridge Landing to WEPCO Landing #5. The shorter Oxbow option can reduce shuttle work, but this route keeps the full PN1 segment to the downstream WEPCO landing.",
      "permits": "No route-specific paddling permit is known. Use the named landings, follow posted Pine-Popple Wild Rivers and landing rules, and confirm release or access changes before launch.",
      "camping": "No on-route campsite is assumed for the 9.3-mile day route. Nearby Chequamegon-Nicolet National Forest campgrounds are a separate lodging plan, not a river-camp assumption.",
      "summary": "Launch at County N Bridge Landing beside the live USGS gauge and paddle the Pine River to WEPCO Landing #5. This is an easy Wild River float with quiet mixed-forest scenery, riffles, one short Class I pitch, and a route-specific minimum level from Wisconsin Trail Guide.",
      "accessCaveats": [
        "County N Bridge Landing is the put-in and gauge corridor; check parking space and shoulder conditions before unloading.",
        "WEPCO Landing #5 is the planned take-out near the lower end of the PN1 guide. Identify the landing before launching because downstream continuation changes the trip and shuttle.",
        "Pine Dam and the Pine River Powerplant influence flow upstream of the route, so same-day gauge and release checks matter even though this is an easy route."
      ],
      "watchFor": [
        "Shallow riffles, dragging, and slower travel below the 1.75 ft / 150 cfs suggested minimum.",
        "Faster current after dam releases or rain, plus cold water and limited quick exits in the wooded Wild River corridor.",
        "Downed trees, sweepers, and low branches on bends, especially after storms.",
        "One short Class I pitch and riffles that are easy at normal levels but still require boat control around rocks."
      ]
    }
  },
  "pine-river-highway-55-stevens-lake": {
    "putIn": {
      "name": "Highway 55 bridge put-in",
      "latitude": 45.9088,
      "longitude": -88.8213
    },
    "takeOut": {
      "name": "Stevens Lake Road bridge take-out",
      "latitude": 45.87403,
      "longitude": -88.68587
    },
    "logistics": {
      "distanceLabel": "About 12.8 to 13.4 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with low water, scouting, or wood",
      "shuttle": "Run a remote Florence County shuttle from the Highway 55 bridge to Stevens Lake Road. Both endpoints are roadside shoulder-style accesses, so inspect parking, launch slots, and road conditions before committing vehicles.",
      "permits": "No route-specific paddling permit is known. Use only the named roadside access corridor, respect USFS and Pine-Popple Wild Rivers rules, and keep scouting or breaks on public land or clearly legal riverbank areas.",
      "camping": "American Whitewater notes common tent camping on USFS land near the end of CCC Rapids and elsewhere on USFS land, but this app card treats the route primarily as a long day trip. Confirm current national forest rules, fire restrictions, and private-bank boundaries before any overnight plan.",
      "campingClassification": "overnight_capable",
      "summary": "Launch below the Highway 55 bridge and take out at Stevens Lake Road for the upper Pine A whitewater reach. Use the live Pine powerplant gauge plus the Highway 55 visual rock check, and skip the run when the gauge is below the AW floor or the launch rock says the upper rapids are under-watered.",
      "accessCaveats": [
        "Highway 55 parking is roadside only; AW describes a river-left launch below the bridge with a large staging area but a narrow slot to the water.",
        "Stevens Lake Road parking is roadside only and the take-out is on river left just upstream from the bridge.",
        "The selected USGS gauge is far downstream and below dam influence. AW explicitly says the Highway 55 visual rock check is critical for this upper rocky reach.",
        "Do not rely on private cabins, tree-farm areas, or marshy banks as legal exit points unless a land manager separately confirms access."
      ],
      "watchFor": [
        "Multiple long Class I-II rock gardens, including a Class II+ old-dam channel.",
        "Old Dam Rapids left-channel metal spikes, lodged trees, and a tight right-channel line that should be scouted.",
        "Alder tangles, sweepers, strainers, cold water, marshy scouting, and slow rescue response.",
        "Low water below 3.3 ft at USGS 04064500, when the upper rapids become scrapey and the Highway 55 rock check may reject the run even before the app score does."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-55-bridge",
        "name": "Highway 55 bridge put-in",
        "latitude": 45.9088,
        "longitude": -88.8213,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default Pine A put-in below the Highway 55 bridge."
      },
      {
        "id": "stevens-lake-road",
        "name": "Stevens Lake Road bridge access",
        "latitude": 45.87403,
        "longitude": -88.68587,
        "mileFromStart": 12.8,
        "segmentKind": "creek",
        "note": "Default Pine A take-out and Pine B put-in."
      }
    ]
  },
  "pine-river-stevens-lake-chipmunk-rapids": {
    "putIn": {
      "name": "Stevens Lake Road bridge put-in",
      "latitude": 45.87403,
      "longitude": -88.68587
    },
    "takeOut": {
      "name": "Chipmunk Rapids Recreation Area landing",
      "latitude": 45.89334,
      "longitude": -88.55771
    },
    "logistics": {
      "distanceLabel": "About 9.9 to 10.1 mi",
      "estimatedPaddleTime": "About 4 hr, longer with low water or access delays",
      "shuttle": "Stage the take-out at Chipmunk Rapids Recreation Area, then shuttle back to Stevens Lake Road. Highway 139 and Fay Lake Road are optional exits, but they are roadside or undeveloped and should be inspected before counting on them.",
      "permits": "No route-specific paddling permit is known. Use the accepted road and USFS access points, follow posted campground rules at Chipmunk Rapids, and keep stops off private banks near the first Chipmunk Rapids drop.",
      "camping": "Chipmunk Rapids Recreation Area has six fee campsites, potable water, and a vault toilet, making this an endpoint-campground route when the campground is open and space is available.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Stevens Lake Road and take out at the USFS Chipmunk Rapids landing. The reach is mostly flowing flatwater with Class I-II rapids and useful intermediate access checks at Highway 139 and Fay Lake Road.",
      "accessCaveats": [
        "Stevens Lake Road parking is along the road only.",
        "The Highway 139 optional take-out is river left below the bridge with swift current; be set up early if using it.",
        "Fay Lake Road is an undeveloped optional exit with roadside parking, not a polished public launch.",
        "At Chipmunk Rapids, use the landing 150 feet below the bridge and the path to the USFS parking/campground area."
      ],
      "watchFor": [
        "Stevens Creek Rapids, long Class I swifts toward Highway 139, and Class II Chipmunk Rapids near the finish.",
        "Private land along the first Chipmunk Rapids drop before the channel re-enters USFS land.",
        "Low-water scraping below 2 ft, stronger bridge eddies at higher water, strainers, cold water, and remote road logistics."
      ]
    },
    "accessPoints": [
      {
        "id": "stevens-lake-road",
        "name": "Stevens Lake Road bridge access",
        "latitude": 45.87403,
        "longitude": -88.68587,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default Pine B put-in."
      },
      {
        "id": "highway-139",
        "name": "Highway 139 bridge optional access",
        "latitude": 45.890345,
        "longitude": -88.654807,
        "mileFromStart": 2.7,
        "segmentKind": "creek",
        "note": "Optional roadside exit or shorter-run access described by AW."
      },
      {
        "id": "fay-lake-road",
        "name": "Fay Lake Road bridge optional access",
        "latitude": 45.8825,
        "longitude": -88.630831,
        "mileFromStart": 4.3,
        "segmentKind": "creek",
        "note": "Undeveloped optional access with roadside parking."
      },
      {
        "id": "chipmunk-rapids",
        "name": "Chipmunk Rapids Recreation Area landing",
        "latitude": 45.89334,
        "longitude": -88.55771,
        "mileFromStart": 9.9,
        "segmentKind": "creek",
        "note": "Default Pine B take-out and campground-backed Pine C put-in."
      }
    ]
  },
  "pine-river-chipmunk-rapids-bull-falls": {
    "putIn": {
      "name": "Chipmunk Rapids Recreation Area landing",
      "latitude": 45.89334,
      "longitude": -88.55771
    },
    "takeOut": {
      "name": "Bull Falls access / portage trail",
      "latitude": 45.89811,
      "longitude": -88.41106
    },
    "logistics": {
      "distanceLabel": "About 10.4 to 10.5 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, including scouting and portages",
      "shuttle": "Stage vehicles at the Bull Falls access, then drive forest roads back to Chipmunk Rapids Recreation Area. Early spring gravel-road conditions can be rough or closed by frost and mud, so confirm road access before launching.",
      "permits": "No route-specific paddling permit is known. Use the USFS Chipmunk access, signed/accepted portage trails, and legal public access corridors; do not expand portages through private camps or banks.",
      "camping": "Chipmunk Rapids Recreation Area is an endpoint campground with six fee campsites, potable water, and a vault toilet. Treat the river run itself as a technical day route unless a separate legal overnight plan is confirmed.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Chipmunk Rapids and run the Pine C whitewater sequence to Bull Falls. This route is for skilled whitewater paddlers who are prepared to scout or portage Upper Snaketail Rapids, Myers Falls, and Bull Falls.",
      "accessCaveats": [
        "The Chipmunk landing is reached by a short path from the USFS parking/campground area past the artesian spring.",
        "AW describes Goodman Grade as an easier intermediate take-out but warns the landing is tucked in and can be overshot in swift current.",
        "Bull Falls has south and north access options with steep or awkward carries. Identify the chosen landing and parking before launching.",
        "Missing Bull Falls or choosing to continue downstream changes the trip into a longer fast-swift route toward Rochon Landing or Highway 101."
      ],
      "watchFor": [
        "Upper Snaketail Rapids, where AW recommends scouting and notes a public-use portage on private land.",
        "Myers Falls, a fast three-drop Class III feature with signed high-water and low-water take-outs.",
        "Bull Falls, where a swim can be hard to recover from and immediate downstream current remains fast.",
        "Wood blockages, private-bank limits, cold water, remote rescue exposure, and low-water boulder dodging below 2 ft."
      ]
    },
    "accessPoints": [
      {
        "id": "chipmunk-rapids",
        "name": "Chipmunk Rapids Recreation Area landing",
        "latitude": 45.89334,
        "longitude": -88.55771,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default Pine C put-in with USFS campground support."
      },
      {
        "id": "goodman-grade",
        "name": "Goodman Grade access",
        "latitude": 45.903021,
        "longitude": -88.420655,
        "mileFromStart": 9.5,
        "segmentKind": "creek",
        "note": "Intermediate take-out below Myers Falls and before Bull Falls."
      },
      {
        "id": "bull-falls",
        "name": "Bull Falls access / portage trail",
        "latitude": 45.89811,
        "longitude": -88.41106,
        "mileFromStart": 10.4,
        "segmentKind": "creek",
        "note": "Default take-out at the Bull Falls portage/access zone."
      }
    ]
  },
  "menominee-river-piers-gorge": {
    "putIn": {
      "name": "Niagara Mill Street Landing",
      "latitude": 45.77032,
      "longitude": -87.98863
    },
    "takeOut": {
      "name": "Piers Gorge Road Landing",
      "latitude": 45.75834,
      "longitude": -87.93907
    },
    "logistics": {
      "distanceLabel": "2.9 mi",
      "estimatedPaddleTime": "Varies",
      "shuttle": "Run a short cross-border shuttle from Mill Street Landing in Niagara to the Piers Gorge Road access off Highway 8 in Michigan. The river mile is short, but scout time, dam-release timing, and rescue planning can dominate the day.",
      "permits": "No route-specific paddling permit is known from the sources checked. Use the named hand-carry landings, follow Menominee River State Recreation Area rules at Piers Gorge, and verify whether any local parking fee or commercial-release constraint applies before launch.",
      "camping": "No on-route camping is documented for the 2.9-mile Piers Gorge run. Treat this as a short expert whitewater day route unless a land manager separately confirms legal overnight use.",
      "summary": "Launch at Niagara Mill Street Landing and paddle the Menominee through Piers Gorge to the Piers Gorge Road Landing. The route starts broad and fast, then compresses into a Class IV gorge with Sand Portage Falls, Missicot Falls, 2 Sisters, Terminal Surfer, and several powerful play features.",
      "accessCaveats": [
        "Mill Street Landing has hand-carry access, parking, trailer turnaround, and a pit toilet according to Wisconsin Trail Guide.",
        "Piers Gorge Road Landing is about 200 yards below Terminal Surfer on river left, downstream of a narrow slough; identify it before committing to the lower gorge.",
        "The take-out is in Michigan within the Piers Gorge unit of the Menominee River State Recreation Area, while the put-in is in Niagara, Wisconsin."
      ],
      "watchFor": [
        "Dam-release changes from Little Quinnesec Falls Dam; water can rise quickly and the gauge should be checked the same day.",
        "Class IV Missicot Falls, Volkswagen Rock, Whirlpool Rapids, 2 Sisters, Terminal Surfer, sticky holes, and powerful hydraulics at higher flows.",
        "Intermediate paddlers should stay away above 1400 cfs per Wisconsin Trail Guide; this app route is framed for advanced/expert whitewater paddlers.",
        "Scout before running the gorge and avoid entering Terminal Surfer without scouting; its hydraulic is easy to underestimate from upstream."
      ]
    }
  },
  "red-river-weed-dam-zeimers-falls": {
    "putIn": {
      "name": "Weed Dam Powerhouse Landing",
      "latitude": 44.84168,
      "longitude": -88.76063
    },
    "takeOut": {
      "name": "Zeimer's Falls Landing",
      "latitude": 44.84287,
      "longitude": -88.72289
    },
    "logistics": {
      "distanceLabel": "2.2 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr plus scouting time",
      "shuttle": "Run a very short rural shuttle between Weed Dam Powerhouse Landing and the Butternut Road access for Zeimer's Falls Landing. The river miles are short, but scout time and release timing can matter more than mileage.",
      "permits": "No route-specific paddling permit is known from the sources checked. Use only the named hand-carry landings and stay off private banks while scouting or portaging.",
      "camping": "No on-route camping is documented for this 2.2-mile whitewater run. Treat it as a short day route and use nearby public campgrounds only after checking separate rules and availability.",
      "summary": "Launch below Weed Dam Powerhouse and paddle the Red River through First Drop, Second Drop, Monastery Falls, and Zeimer's Falls. This is a compact Class III-IV whitewater run, not a casual recreational float.",
      "accessCaveats": [
        "Wisconsin Trail Guide describes Weed Dam Powerhouse Landing as a hand-carry access with parking and a trailer turnaround.",
        "Zeimer's Falls Landing is reached from a sand-and-gravel drive off Butternut Road, with parking, trailer turnaround, and a woodchip path down to the river.",
        "The guide warns that land on either side of Monastery Falls is privately owned; scout or portage from river right and stay on exposed rock ledges."
      ],
      "watchFor": [
        "Dam-release changes from Weed Dam Powerhouse; a horn may sound before release and water can rise quickly.",
        "Scrappy boulder gardens below about 150 cfs, including possible low-water portage at Monastery Falls.",
        "Monastery Falls can reach Class IV at high flows, while Zeimer's Falls becomes pushy Class III+ in the high band.",
        "Treat the Morgan Road USGS gauge as a corridor signal, not a substitute for same-day release and visual checks at the put-in."
      ]
    }
  },
  "jump-river-wayside-park-sheldon": {
    "putIn": {
      "name": "Wayside Park / Highway 73 Jump River Access",
      "latitude": 45.354054,
      "longitude": -90.788597
    },
    "takeOut": {
      "name": "Haley Park / Sheldon Access",
      "latitude": 45.307764,
      "longitude": -90.955985
    },
    "logistics": {
      "distanceLabel": "11.1 mi",
      "estimatedPaddleTime": "About 3 hr at normal levels; faster during race-level high water",
      "shuttle": "Use a rural two-car shuttle between Wayside Park off Highway 73 near the village of Jump River and Haley Park in Sheldon. The exact route is longer than the road shuttle suggests, so stage vehicles before launching.",
      "permits": "No route-specific paddling permit is known. Use the public park and access areas, follow posted Rusk County and local rules, and avoid informal private-bank stops.",
      "camping": "No on-route campsite is assumed for this day route. Treat nearby parks or campgrounds as separate base-camp planning, not river-camp permission.",
      "summary": "Launch at the Highway 73 Wayside Park access and take out at Haley Park in Sheldon. This lower Jump River route follows the Rusk County Highway 73-to-Sheldon paddle and the Wisconsin River Trips Wayside Park-to-Haley Park report.",
      "accessCaveats": [
        "Rusk County publishes the official Highway 73-to-Sheldon route coordinates as Jump River Access and Sheldon Access; use those named sites rather than informal bridge shoulders.",
        "Wayside Park has good public access near Highway 73, while Haley Park spans both sides of the bridge in Sheldon and has an outhouse according to Wisconsin River Trips.",
        "The direct USGS gauge is at Sheldon near the take-out, so check the gauge before staging there and before deciding whether to extend downstream."
      ],
      "watchFor": [
        "Frequent shallow Class I riffles and boulder gardens that can require scraping or walking below the low band.",
        "Fast current and stronger Class I-II wave trains when the Sheldon gauge is high or rising after rain.",
        "Wind on more open stretches, cold water in spring, and changing wood or strainers after high water.",
        "Do not use the 2200 cfs Sheldon Canoe Race observation as normal recreational guidance; that is extreme, fast water for this app audience."
      ]
    }
  },
  "jump-south-fork-county-line-little-falls": {
    "putIn": {
      "name": "County Line Road picnic-area put-in",
      "latitude": 45.3787,
      "longitude": -90.5338
    },
    "takeOut": {
      "name": "Little Falls access",
      "latitude": 45.399899,
      "longitude": -90.603897
    },
    "logistics": {
      "distanceLabel": "5.7 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr plus scouting at Little Falls",
      "shuttle": "Use a short rural shuttle between the County Line Road picnic-area access and Little Falls. Stage the take-out first so the group can identify whether the landing plan is above Little Falls or below it after a scout.",
      "permits": "No route-specific paddling permit is known from the sources checked. Use only the named access points and stay off private banks while scouting or taking breaks.",
      "camping": "No on-route campsite is documented for this short reach. Treat it as a day trip; Big Falls County Campground downstream is a separate first-come Price County base-camp option, not permission to camp along this section.",
      "summary": "Launch at the County Line Road picnic-area put-in and paddle the milder upper South Fork Jump boulder gardens to the Little Falls access. This is the gentler South Fork card, but the finish is still a decision point because Little Falls belongs to the next, harder reach.",
      "accessCaveats": [
        "American Whitewater says the take-out can be either at the head of Little Falls or at the end of Little Falls; choose only after scouting.",
        "The AW gauge correlation uses the downstream Jump River at Sheldon gauge, so combine the live number with recent rain, trend, and a visual check at the put-in.",
        "This is a rural corridor with limited formal bailout information between endpoints."
      ],
      "watchFor": [
        "Low-water scraping in boulder gardens when the Sheldon gauge is below the AW runnable floor.",
        "Little Falls getting bony below about 1,000 cfs and developing holes above about 1,000 cfs.",
        "Changing strainers, cold water in spring, and rock impacts in shallow riffles."
      ]
    }
  },
  "jump-south-fork-little-falls-big-falls": {
    "putIn": {
      "name": "Little Falls roadside access",
      "latitude": 45.400001525879,
      "longitude": -90.602996826172
    },
    "takeOut": {
      "name": "Big Falls County Park access",
      "latitude": 45.40299987793,
      "longitude": -90.638000488281
    },
    "logistics": {
      "distanceLabel": "2.7 mi",
      "estimatedPaddleTime": "Short run, but plan extra time for scouting, laps, and carries",
      "shuttle": "Very short shuttle between Little Falls, the County N bridge corridor, and Big Falls County Park. Many experienced paddlers treat either falls as park-and-play rather than as a normal downriver shuttle.",
      "permits": "No route-specific paddling permit is known from the sources checked. Follow Price County park rules at Big Falls and avoid informal private-bank scouting access.",
      "camping": "Big Falls County Campground and Park has six first-come, non-electric campsites, vault toilets, hand-pump water, and picnic facilities on the South Fork Jump. Campsites cannot be reserved and should be treated as base-camp support, not guaranteed shuttle staging.",
      "summary": "Put in at Little Falls and finish at Big Falls County Park, or use the named falls as park-and-play objectives. This is a short advanced whitewater card with a misleadingly quiet middle at County N and a serious Big Falls finish.",
      "accessCaveats": [
        "Scout Little Falls and Big Falls from shore before committing; the route is not adequately assessed from the County N bridge.",
        "Big Falls County Park is a real public park and campground, but use the posted park access and rules rather than inventing informal carry routes.",
        "Poison ivy is specifically called out by American Whitewater around the falls areas."
      ],
      "watchFor": [
        "Little Falls Class II+ technical water with sticky features around roughly 1,000 to 2,000 cfs.",
        "Big Falls Class III-IV technical action, waterfall/ledge hazards, holes, and portage decisions.",
        "Scraping below the AW runnable floor and pushier expert-only consequences near the upper part of the band.",
        "Fast-rising post-rain water, cold-water swims, and wood in the runout."
      ]
    }
  },
  "red-cedar-river-tom-prince-russian-slough": {
    "putIn": {
      "name": "Tom Prince Memorial Park Landing",
      "latitude": 45.0026972,
      "longitude": -91.729812
    },
    "takeOut": {
      "name": "Russian Slough County Park",
      "latitude": 44.9933827,
      "longitude": -91.8095487
    },
    "logistics": {
      "distanceLabel": "7.7 mi",
      "estimatedPaddleTime": "About 3 hr at normal fall levels",
      "shuttle": "Use a rural two-car shuttle from Tom Prince Memorial Park in Colfax to Russian Slough County Park off 860th Avenue. The final Russian Slough approach is a narrow dirt access road, so scout the take-out before launching.",
      "permits": "No route-specific paddling permit is known. Follow posted village, county, and DNR rules at both endpoints; Dunn County notes Russian Slough may be closed in spring for walleye spawning.",
      "camping": "Do not assume legal on-route camping. Wisconsin River Trips notes some sandbars looked campable, but this route should be planned as a day trip unless separate public camping permission is confirmed.",
      "summary": "Launch at Tom Prince Memorial Park in Colfax and paddle the Red Cedar River to Russian Slough County Park. Expect brisk current, easy riffles, gravel bars, tall sand banks, and a rustic county-park take-out.",
      "accessCaveats": [
        "Tom Prince is the longer Colfax launch for this route; Felland Park is a shorter alternate 1.3 miles downstream.",
        "Russian Slough is public county land on the Red Cedar corridor, but Dunn County says it has no amenities or developed boat landing. Treat it as a primitive take-out and confirm it is open before relying on it.",
        "The take-out is on the east end of an island/slough complex; mark it before launching and stay alert as the river begins to split near the finish."
      ],
      "watchFor": [
        "Fast current and frequent strainers, especially near side channels and island splits.",
        "Roughly 30 easy Class I riffles that become pushier as the Colfax gauge rises.",
        "A minor logjam near the large sand banks that may require a quick scooch or gravel-bar walkaround.",
        "High water above about 800 cfs changes this from a scenic moving-water day into an expert-only strainer route."
      ]
    }
  },
  "big-eau-pleine-river-cherokee-march-rapids": {
    "putIn": {
      "name": "Cherokee Park",
      "latitude": 44.9046882,
      "longitude": -90.2226348
    },
    "takeOut": {
      "name": "March Rapids Park",
      "latitude": 44.8507988,
      "longitude": -90.1498549
    },
    "logistics": {
      "distanceLabel": "9.2 mi",
      "estimatedPaddleTime": "About 4 hr to 5.5 hr depending on level and scouting",
      "shuttle": "Use a two-car shuttle between Cherokee Park on County Road N and March Rapids Park on County Road P. The road shuttle is manageable, but this is a level-sensitive river, so check the Stratford gauge before leaving the take-out vehicle.",
      "permits": "No route-specific paddling permit is known. Follow posted Marathon County park rules at Cherokee Park and March Rapids Park, and avoid private banks along the rural middle corridor.",
      "camping": "No on-route camping is documented for this day section. Treat the trip as a day paddle unless separately planning a legal county-park or private campground stay.",
      "summary": "Launch below the Cherokee Park dam and paddle the Big Eau Pleine through the Cherokee-to-Hazelnut boulder gardens and the wooded Hazelnut-to-March Rapids reach. Take out at March Rapids Park after scouting or running the park rapids.",
      "accessCaveats": [
        "Cherokee Park is a Marathon County park with river access, vault restrooms, picnic facilities, and trails; use the river access below the dam rather than launching above the impoundment.",
        "March Rapids Park has paths above and below the rapids, so scout during the shuttle and decide whether to take out above the rapids or finish by running them.",
        "Hazelnut Road is a possible bailout but is only a gravel-road bridge access with poison ivy and limited comfort; the cleaner planned take-out is March Rapids Park."
      ],
      "watchFor": [
        "Bumpy rapids, shallow boulder slots, and walking risk below about 150 cfs on the Stratford gauge.",
        "Class II or Class II+ rapids two miles above March Rapids, with the best line reported along the left; scout before running.",
        "March Rapids at the take-out, which is scenic and scoutable but still deserves attention before tired paddlers commit.",
        "Fast current under low branches, strainers, and rapidly changing levels after rain on this flashy rocky watershed."
      ]
    }
  },
  "turtle-creek-east-creek-road-highway-140": {
    "putIn": {
      "name": "East Creek Road public pull-off",
      "latitude": 42.6113321,
      "longitude": -88.7804249
    },
    "takeOut": {
      "name": "Highway 140 Turtle Creek access",
      "latitude": 42.5965016,
      "longitude": -88.8637665
    },
    "logistics": {
      "distanceLabel": "6.8 mi",
      "estimatedPaddleTime": "About 3 hr at normal levels",
      "shuttle": "Use a short rural shuttle between the East Creek Road access west of the bridge and the Highway 140 parking area north of the bridge. Wisconsin River Trips describes the bike shuttle as about 4.5 miles with modest climbing.",
      "permits": "No route-specific paddling permit is known. Follow posted Wisconsin DNR wildlife-area rules and any local parking signs at East Creek Road, O Riley Landing, South Carvers Rock Road, and Highway 140.",
      "camping": "No on-route camping is documented for this short day route. Treat the Turtle Creek Wildlife Area corridor as day-use paddling unless a land manager separately confirms overnight use.",
      "summary": "Launch from the East Creek Road public pull-off and paddle Turtle Creek past wild rice beds, O Riley Landing, Little Turtle Creek, South Carvers Rock Road, Spring Brook, and a short Class I riffle before taking out at Highway 140.",
      "accessCaveats": [
        "East Creek Road is a bridge-area public pull-off with a roughly 280-foot carry to the creek and no restroom.",
        "Highway 140 has a parking area north of the bridge and a short path to the water, but it can be busy on good paddling days.",
        "The route begins in the lower Turtle Creek Wildlife Area corridor and continues beyond the wildlife-area segments; stay with established bridge and landing access points."
      ],
      "watchFor": [
        "Aquatic weeds and possible shallow congestion in the low band below about 100 cfs.",
        "One easy Class I riffle just downstream from South Carvers Rock Road.",
        "Strainers or fresh wood after storms, despite the clean route report.",
        "High water above about 350 cfs reducing clarity and making bends, low branches, and shoreline strainers less forgiving."
      ]
    }
  },
  "flambeau-river-highway-w-hervas": {
    "putIn": {
      "id": "highway-w",
      "name": "Highway W Landing",
      "latitude": 45.76812,
      "longitude": -90.76075
    },
    "takeOut": {
      "id": "hervas-camp",
      "name": "Hervas Camp Landing",
      "latitude": 45.64051,
      "longitude": -90.83491
    },
    "logistics": {
      "distanceLabel": "14.2 mi",
      "estimatedPaddleTime": "Long day, roughly 6 hr to 8 hr depending on level, wind, scouting, and stops",
      "shuttle": "Plan a remote Flambeau River State Forest shuttle between the Highway W landing and the end of River Road at Hervas. Camp 41 is the main practical split point if you want a shorter day or an overnight plan.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin DNR state-forest landing rules, posted parking rules, and Flambeau River glass-container restrictions.",
      "camping": "Canoe camps are available along this corridor and nearby segments, including Headquarters, Boy Scout, George's Island, Camp 41, Wannigan, Forks, Bear Run, and Hervas. Sites are first-come, first-served; confirm current WI DNR rules before relying on them for an overnight.",
      "summary": "Launch at the Highway W landing downstream of Babb's Island and finish at Hervas Camp Landing. This creates a route-sized North Fork Flambeau trip with Porcupine Rapids in the upper half and Wannigan Rapids plus Flambeau Falls below Camp 41.",
      "accessCaveats": [
        "Use the County W landing on the east bank for the put-in, not the State Forest Headquarters landing across the river, unless signs or DNR staff direct otherwise.",
        "Hervas is a small state-forest landing with limited parking, water, and toilets. Identify the take-out before launching if you have not used it before.",
        "The live gauge is downstream at Bruce and is only a proxy; local DNR level information and visual checks at the landings matter more than on direct-gauge routes."
      ],
      "watchFor": [
        "Porcupine Rapids above Camp 41, including a third pitch that Wisconsin Trail Guide says should be scouted.",
        "Wannigan Rapids, Flambeau Falls, boulder gardens, shallow scrape risk at lower flows, and pushier waves after rain.",
        "Remote shoreline, cold water, wood, long-mileage fatigue, and limited quick exits between landings."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-w",
        "name": "Highway W Landing",
        "latitude": 45.76812,
        "longitude": -90.76075,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Full route start on the east bank downstream of the Highway W bridge."
      },
      {
        "id": "camp-41",
        "name": "Camp 41 Landing",
        "latitude": 45.69208,
        "longitude": -90.81288,
        "mileFromStart": 8.3,
        "segmentKind": "creek",
        "note": "Primary split point between the Porcupine Rapids upper half and the Wannigan / Flambeau Falls lower half."
      },
      {
        "id": "hervas-camp",
        "name": "Hervas Camp Landing",
        "latitude": 45.64051,
        "longitude": -90.83491,
        "mileFromStart": 14.2,
        "segmentKind": "creek",
        "note": "Full downstream finish at the end of River Road, shortly after the South Fork confluence and Bear Run Camp."
      }
    ]
  },
  "flambeau-river-hervas-beaver-dam": {
    "putIn": {
      "id": "hervas-camp",
      "name": "Hervas Camp Landing",
      "latitude": 45.64051,
      "longitude": -90.83491
    },
    "takeOut": {
      "id": "beaver-dam",
      "name": "Beaver Dam Landing",
      "latitude": 45.6166,
      "longitude": -90.90623
    },
    "logistics": {
      "distanceLabel": "4.9 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr for a prepared whitewater group",
      "shuttle": "Use a short but rural two-car shuttle between the end of River Road at Hervas and Beaver Dam Road off West Lane. The landings are on opposite banks of the river, so the road shuttle is less direct than the river mileage suggests.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin DNR state-forest landing rules, posted parking rules, and Flambeau River glass-container restrictions.",
      "camping": "Hervas, Cedar Rapids, and nearby North Fork canoe camps can support an overnight plan, but this route works best in the app as a short day run. Confirm current first-come campsite rules before relying on them.",
      "summary": "Launch at Hervas Camp Landing and take out at Beaver Dam Landing for the short, concentrated lower-FN4 whitewater run. Cedar Rapids and Beaver Dam Rapids are the main decision points.",
      "accessCaveats": [
        "Hervas is a small state-forest landing at the end of River Road; check parking before unloading if the landing is busy with campers or through-paddlers.",
        "Beaver Dam is a hand-carry canoe landing on river right near Beaver Dam Rapids, with parking and pit toilets but no drinking water listed by WI DNR.",
        "The Bruce gauge is AW-backed for this reach but still a proxy. Dams and local releases can make the actual river feel different from the number."
      ],
      "watchFor": [
        "Cedar Rapids, especially the first pitch where Wisconsin Trail Guide recommends scouting from river left and portaging if in doubt.",
        "Beaver Dam Rapids, a river-wide ledge with a large submerged boulder and a short left-bank scout or portage option.",
        "Pushier waves and harder swims above the broad target window, shallow boulder gardens below it, cold water, and wood after storms."
      ]
    },
    "accessPoints": [
      {
        "id": "hervas-camp",
        "name": "Hervas Camp Landing",
        "latitude": 45.64051,
        "longitude": -90.83491,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Put-in at the state-forest ramp and canoe camp at the end of River Road."
      },
      {
        "id": "cedar-rapids-camp",
        "name": "Cedar Rapids Camp",
        "latitude": 45.63104,
        "longitude": -90.84995,
        "mileFromStart": 1,
        "segmentKind": "creek",
        "note": "On-route canoe camp near the first pitch of Cedar Rapids; useful as a scouting landmark, not a normal road-shuttle endpoint."
      },
      {
        "id": "beaver-dam",
        "name": "Beaver Dam Landing",
        "latitude": 45.6166,
        "longitude": -90.90623,
        "mileFromStart": 4.9,
        "segmentKind": "creek",
        "note": "Take-out on river right within view of Beaver Dam Rapids."
      }
    ]
  },
  "badfish-creek-highway-a-old-stage": {
    "putIn": {
      "id": "badfish-creek-county-highway-a-landing",
      "name": "County Highway A Badfish Creek landing",
      "latitude": 42.89336,
      "longitude": -89.29837
    },
    "takeOut": {
      "id": "old-stage-road-canoe-kayak-landing",
      "name": "Old Stage Road canoe/kayak landing",
      "latitude": 42.85299,
      "longitude": -89.25676
    },
    "logistics": {
      "distanceLabel": "About 4.2 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with wood or low-water wading",
      "shuttle": "Use a short rural shuttle between the County Highway A landing and Old Stage Road. A bike shuttle is possible on local roads, but confirm shoulder comfort and do not block either landing.",
      "permits": "No route-specific paddling permit is known. Use the public Highway A landing, follow posted Badfish Creek Wildlife Area rules at Old Stage Road, and respect private banks between access points.",
      "camping": "No on-route camping is documented. Treat this as a day paddle; nearby public-land or private-campground overnights require separate reservation and rule checks.",
      "campingClassification": "none",
      "summary": "Launch at the County Highway A landing west of Gallagher Lane and take out at Old Stage Road before the downstream favorite Badfish section. This upper link is worthwhile when wood is clear and the Cooksville gauge is in the normal Badfish window.",
      "accessCaveats": [
        "County Highway A is a public landing with off-road parking, but WRT and 2024 comments still describe the bridge-area bank as potentially steep or weedy. Inspect the landing before unloading.",
        "Old Stage Road is the cleanest take-out and connects to the downstream route family. Use the maintained landing rather than nearby private banks or informal roadside pullouts.",
        "The route passes channelized banks, wildlife-area frontage, and private land. Stay in the public waterway and use only known access points."
      ],
      "watchFor": [
        "Fresh deadfall, sweepers, and duck-unders, especially near Old Stone Road and after wind or storms.",
        "Fast current around narrow bends above 200 cfs and shallow riffle bumps at lower levels.",
        "Wastewater-effluent water-quality context, possible post-rain sewage concerns, wild parsnip or weedy banks, and cold-water exposure outside summer."
      ]
    },
    "accessPoints": [
      {
        "id": "badfish-creek-county-highway-a-landing",
        "name": "County Highway A Badfish Creek landing",
        "latitude": 42.89336,
        "longitude": -89.29837,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the new Highway A landing west of Gallagher Lane."
      },
      {
        "id": "old-stage-road-canoe-kayak-landing",
        "name": "Old Stage Road canoe/kayak landing",
        "latitude": 42.85299,
        "longitude": -89.25676,
        "mileFromStart": 4.2,
        "segmentKind": "creek",
        "note": "Default take-out and downstream Badfish route-family put-in."
      }
    ]
  },
  "kickapoo-river-highway-131-ontario": {
    "putIn": {
      "name": "Highway 131 bridge south of Michigan Road",
      "latitude": 43.78467,
      "longitude": -90.55023
    },
    "takeOut": {
      "name": "Landing 1 / Highway 33 and County Road P",
      "latitude": 43.72233,
      "longitude": -90.58747
    },
    "logistics": {
      "distanceLabel": "8.5 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr, longer if low and scrape-heavy",
      "shuttle": "Use a two-car shuttle from Landing 1 in Ontario back north to the Highway 131 bridge south of Michigan Road. The source describes a roughly 6-mile road shuttle, mostly along Highway 131/133.",
      "permits": "No route-specific paddling permit was confirmed for this upstream-of-Ontario reach. Follow Wisconsin boating rules, check KVR/Wildcat Mountain current river guidance, and account for any 2026 Highway 131 construction detours before leaving vehicles.",
      "camping": "Treat this as a day trip. KVR river campsites are designated and limited, and the exact Highway-131-to-Ontario reach should not be assumed to have legal overnight stops on private banks.",
      "campingClassification": "none",
      "summary": "Launch at the Highway 131 bridge south of Michigan Road and take out at Ontario Landing 1 for a shallow, upper Kickapoo day above the classic Ontario-to-Rockton card. Use the direct Ontario gauge and do not launch below the published low-water floor unless you are prepared for dragging.",
      "accessCaveats": [
        "The put-in is a bridge access, not a developed livery landing; confirm shoulder parking and footing before unloading.",
        "Landing 1 is the start of the numbered upper Kickapoo access system and can be busy during peak season.",
        "KVR notes 2026 Highway 131 construction in the area with local access allowed but possible intermittent bridge closures; check current route access before committing to the shuttle."
      ],
      "watchFor": [
        "Shallow riffles, scraping, and dragging below the 93 cfs minimum published by Miles Paddled.",
        "Class I current, a possible Class II set in the Oil City family, snags, strainers, and weedy bridge accesses.",
        "Flash-flood potential after storms, cold spring-fed water, private banks, and limited rescue access between road bends."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-131-south-michigan-road",
        "name": "Highway 131 bridge south of Michigan Road",
        "latitude": 43.78467,
        "longitude": -90.55023,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from Miles Paddled GPS point."
      },
      {
        "id": "ontario-landing-1",
        "name": "Landing 1 / Highway 33 and County Road P",
        "latitude": 43.72233,
        "longitude": -90.58747,
        "mileFromStart": 8.5,
        "segmentKind": "creek",
        "note": "Default take-out at Ontario."
      }
    ]
  },
  "prairie-river-county-ccc-prairie-forks": {
    "putIn": {
      "id": "prairie-river-county-ccc-fishing-wayside",
      "name": "County Road CCC public fishing wayside",
      "latitude": 45.33596,
      "longitude": -89.46462
    },
    "takeOut": {
      "id": "prairie-river-prairie-forks-drive-access",
      "name": "Prairie Forks Drive bridge access",
      "latitude": 45.30847,
      "longitude": -89.51597
    },
    "logistics": {
      "distanceLabel": "About 6.2 mi",
      "estimatedPaddleTime": "About 3 hr, longer with scouting or logjam portages",
      "shuttle": "Run a rural shuttle between the Prairie Forks Drive public parking area and the County Road CCC fishing wayside. WRT reports a 3.6-mile bike shuttle east of the river on paved roads, but vehicle shuttles are simpler for most groups.",
      "permits": "No route-specific paddling permit is known. Use the named public-style fishing and bridge access areas, follow any Lincoln County or trout-stream posting, and avoid private banks.",
      "camping": "No on-route camping is documented. Treat this as a day route; Merrill-area lodging, Council Grounds State Park, or other basecamps require separate reservation and rule checks.",
      "campingClassification": "none",
      "summary": "Launch at the County Road CCC public fishing wayside and take out at Prairie Forks Drive for the upper Prairie River Dudley segment. The best scenery is early, while the Bachelors Lane to Town Hall Road middle reach needs a wood check before committing to the full 6.2 miles.",
      "accessCaveats": [
        "County Road CCC is a public fishing wayside rather than a full-service launch. Confirm parking, footing, and any fishing-season crowding before unloading.",
        "Prairie Forks Drive has a public parking lot northwest of the bridge, but the landing is still a bridge/fishing access. Scout it before passing Bachelors Lane.",
        "Bachelors Lane is the recommended shorter take-out in WRT if the logjam section below it has not been checked. Do not use nearby private farm or horse-property banks."
      ],
      "watchFor": [
        "Two minor logjams upstream of Bachelors Lane and roughly five more between Bachelors Lane and Town Hall Road, including two that WRT found difficult.",
        "Brisk Class I riffles, shallow rocky boulder gardens, cold trout-stream water, and quick bends into wood.",
        "Higher water above the WRT target window pushing into strainers, lowering clarity, and making wades or portages less forgiving."
      ]
    },
    "accessPoints": [
      {
        "id": "prairie-river-county-ccc-fishing-wayside",
        "name": "County Road CCC public fishing wayside",
        "latitude": 45.33596,
        "longitude": -89.46462,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in north of County Road CCC and east of the Highway 17 bridge."
      },
      {
        "id": "prairie-river-prairie-forks-drive-access",
        "name": "Prairie Forks Drive bridge access",
        "latitude": 45.30847,
        "longitude": -89.51597,
        "mileFromStart": 6.2,
        "segmentKind": "creek",
        "note": "Default take-out at the bridge with public parking northwest of the bridge."
      }
    ]
  },
  "kickapoo-river-plum-creek-highway-60": {
    "putIn": {
      "name": "Plum Creek Landing",
      "latitude": 43.08471,
      "longitude": -90.87906
    },
    "takeOut": {
      "name": "Highway 60 Landing",
      "latitude": 43.101,
      "longitude": -90.8586
    },
    "logistics": {
      "distanceLabel": "6.6 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 3 hr 30 min at normal lower-river stage",
      "shuttle": "Use a two-car shuttle between Highway 60 Landing and Plum Creek Landing. WRT describes the bike shuttle as 4.7 miles with a significant hill north of Wauzeka.",
      "permits": "No route-specific paddling permit was confirmed. Use the named public landings, obey posted parking rules, and check current lower-Kickapoo and weather conditions before leaving vehicles.",
      "camping": "Treat this as a day trip. WRT mentions downstream and nearby access options, but no on-route campsite was confirmed for Plum Creek to Highway 60 during this audit.",
      "campingClassification": "none",
      "summary": "Launch at Plum Creek Landing and finish at Highway 60 Landing for a lower Kickapoo day with fast current, wooded bluffs, and fewer crowds than the upper reserve corridor. The Steuben stage is directly tied by WRT to this route, but same-day visual checks still matter around strainers.",
      "accessCaveats": [
        "Plum Creek Landing is the default public put-in and has better route support than informal bridge banks.",
        "Highway 60 Landing is also called Wauzeka Boat Landing on some maps, but WRT warns that this name can be confusing because Wauzeka has another downstream landing.",
        "Do not unintentionally continue toward Lowell Geitz Memorial Boat Landing, the Wisconsin River, Adiantum Woods, or Woodman Landing without a separate downstream plan."
      ],
      "watchFor": [
        "Fast current pushing into deadfall and strainers, especially as stage rises above the WRT average bands.",
        "Deep, turbid, cold water and limited emergency exits between the public landings.",
        "High-water conditions at 7.5 ft and above on the Steuben gauge, where WRT says fast current and strainers can become dangerous."
      ]
    },
    "accessPoints": [
      {
        "id": "plum-creek-canoe-landing",
        "name": "Plum Creek Landing",
        "latitude": 43.08471,
        "longitude": -90.87906,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in and public access."
      },
      {
        "id": "highway-60-kickapoo-landing",
        "name": "Highway 60 Landing",
        "latitude": 43.101,
        "longitude": -90.8586,
        "mileFromStart": 6.6,
        "segmentKind": "creek",
        "note": "Default take-out; also labeled Wauzeka Boat Landing by some map sources."
      }
    ]
  },
  "lemonweir-river-mauston-dam-19th-ave": {
    "putIn": {
      "id": "mauston-dam-lemonweir-access",
      "name": "Mauston Dam downstream access",
      "latitude": 43.7994,
      "longitude": -90.0684
    },
    "takeOut": {
      "id": "lemonweir-mills",
      "name": "19th Avenue / Lemonweir Mills Landing",
      "latitude": 43.78723,
      "longitude": -90.0168
    },
    "logistics": {
      "distanceLabel": "About 5 mi",
      "estimatedPaddleTime": "About 2.5 hr to 3.5 hr, longer if wood or low water forces scouting",
      "shuttle": "Stage the 19th Avenue / Lemonweir Mills take-out first, then drive back to the downstream Mauston Dam access. Keep the put-in below the dam and inspect the tailwater before unloading.",
      "permits": "No route-specific paddling permit is known. Use only the downstream dam access and the Juneau County Lemonweir Mills public landing, and follow posted parking and launch rules.",
      "camping": "Treat this as a day route. WRT mentions sandbars on the broader lower Lemonweir, but no legal public campsite was verified for this short reach.",
      "campingClassification": "none",
      "summary": "Launch below the Mauston Dam and paddle the first lower-Lemonweir reach to the 19th Avenue / Lemonweir Mills landing. The route has easy riffles and wooded scenery but sits immediately below a dam and depends on same-day wood and tailwater checks.",
      "accessCaveats": [
        "Do not launch above the Mauston Dam for this route. Put in only below the dam and away from spillway current.",
        "Lemonweir Mills is a basic no-fee public launch without a dock or toilets. Confirm footing and current before committing as the take-out.",
        "The New Lisbon gauge is direct but upstream of the route. Visual checks at the dam and 19th Avenue still control after storms or wind events."
      ],
      "watchFor": [
        "Dam tailwater, immediate riffles, fresh strainers, and blind wooded bends.",
        "Low-water sandbars, mosquitoes, and private banks along the short corridor.",
        "Cold water in spring and fall, plus faster current or new obstructions after rain."
      ]
    },
    "accessPoints": [
      {
        "id": "mauston-dam-lemonweir-access",
        "name": "Mauston Dam downstream access",
        "latitude": 43.7994,
        "longitude": -90.0684,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from Wisconsin River Trips; use the downstream launch below the dam."
      },
      {
        "id": "lemonweir-mills",
        "name": "19th Avenue / Lemonweir Mills Landing",
        "latitude": 43.78723,
        "longitude": -90.0168,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Juneau County no-fee public launch for kayaks, canoes, and small boats."
      }
    ]
  },
  "hay-river-county-ff-highway-25": {
    "putIn": {
      "id": "hay-river-county-ff",
      "name": "County Road FF Hay River access",
      "latitude": 45.0972,
      "longitude": -91.9743
    },
    "takeOut": {
      "id": "hay-river-highway-25-wheeler",
      "name": "Highway 25 at Wheeler take-out",
      "latitude": 45.0478,
      "longitude": -91.9108
    },
    "logistics": {
      "distanceLabel": "About 9.9 mi",
      "estimatedPaddleTime": "About 4.5 hr to 6 hr depending on deadfall and portages",
      "shuttle": "Stage the Highway 25 take-out first and scout the sandbar/pull-up from the bridge. Then drive to County Road FF and launch river-left downstream from the bridge only where parking and bank conditions are legal and safe.",
      "permits": "No route-specific paddling permit is known. Use lawful bridge/roadside access, avoid blocking shoulders, and stay off private banks except for safety.",
      "camping": "No public on-route campsite was identified. Treat this as a day route with a committed shuttle and only one known mid-route road crossing.",
      "campingClassification": "none",
      "summary": "Paddle the clear, sandy Hay River from County FF to Highway 25 at Wheeler. The river is scenic and riffly, but WRT reports many deadfalls and two portages at the selected reference level.",
      "accessCaveats": [
        "County FF is an informal bridge-area put-in with poison ivy noted by WRT; confirm legal parking and carry-in footing before unloading.",
        "County N is the only mid-route bridge noted in the overview and should not be assumed as a routine exit without a same-day access check.",
        "Highway 25 has road-traffic exposure. Know the take-out line before reaching the bridge."
      ],
      "watchFor": [
        "More than 20 deadfalls or snags, including pass-throughs and likely portages.",
        "Steady riffles, cold water, sandy footing that can hide holes, and limited bailouts.",
        "Private banks, poison ivy, and higher-water strainer hazards after storms."
      ]
    },
    "accessPoints": [
      {
        "id": "hay-river-county-ff",
        "name": "County Road FF Hay River access",
        "latitude": 45.0972,
        "longitude": -91.9743,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from WRT; river-left downstream from the bridge with poison ivy warning."
      },
      {
        "id": "hay-river-county-n",
        "name": "County Road N bridge",
        "latitude": 45.0698,
        "longitude": -91.9262,
        "mileFromStart": 4.5,
        "segmentKind": "creek",
        "note": "Only mid-route road crossing noted in WRT overview; confirm legality before use."
      },
      {
        "id": "hay-river-highway-25-wheeler",
        "name": "Highway 25 at Wheeler take-out",
        "latitude": 45.0478,
        "longitude": -91.9108,
        "mileFromStart": 9.9,
        "segmentKind": "creek",
        "note": "Default WRT take-out at the Highway 25 bridge sandbar near the Wheeler gauge."
      }
    ]
  },
  "badger-mill-creek-old-county-pb-highway-69": {
    "putIn": {
      "id": "badger-mill-old-county-pb",
      "name": "Old County Road PB / Military Ridge Park and Ride access",
      "latitude": 42.99188,
      "longitude": -89.51428
    },
    "takeOut": {
      "id": "badger-mill-highway-69-sugar-river",
      "name": "Highway 69 take-out on the Sugar River",
      "latitude": 42.94921,
      "longitude": -89.54436
    },
    "logistics": {
      "distanceLabel": "About 5.75 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with gates, portages, or new wood",
      "shuttle": "Use the Military Ridge Park and Ride for the put-in logistics and stage a vehicle at the Highway 69 take-out on the Sugar River. Bike shuttles can use Verona-area roads and the Military Ridge Trail as described by Miles Paddled.",
      "permits": "No route-specific paddling permit is known. Use legal public parking, respect farm/private banks, and do not force passage through gates, livestock, or posted areas.",
      "camping": "No on-route campsite was identified. This is a short urban/rural challenge route and should be treated as day-use only.",
      "campingClassification": "none",
      "summary": "Launch near Old County Road PB and follow Badger Mill Creek to the Sugar River and Highway 69. The route has clear water and riffles, but it is defined by deadfall, low cattle gates, a long tunnel, and very narrow level tolerance.",
      "accessCaveats": [
        "Launch downstream from the PB bridge and park at the Military Ridge Park and Ride rather than assuming garden or farm access is open.",
        "The Highway 69 take-out is on the Sugar River after the confluence; scout parking and bank footing before launching.",
        "The Verona gauge is direct. If stage is near or above 5 ft, low gates and tunnel clearance can make the run unsafe."
      ],
      "watchFor": [
        "Deadfall, climbovers, duck-unders, shallow riffles, cow encounters, low cattle gates, and a 100-yard tunnel.",
        "Fast rises after rain, low clearance above 5 ft, and too much dragging below about 4.75 ft.",
        "Private banks, limited clean exits, and cold-water consequences outside summer."
      ]
    },
    "accessPoints": [
      {
        "id": "badger-mill-old-county-pb",
        "name": "Old County Road PB / Military Ridge Park and Ride access",
        "latitude": 42.99188,
        "longitude": -89.51428,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from Miles Paddled; launch downstream from PB and park at the Military Ridge Park and Ride."
      },
      {
        "id": "badger-mill-riverside-road",
        "name": "Riverside Road alternate exit",
        "latitude": 42.9518,
        "longitude": -89.5366,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Approximate alternate exit near the Badger Mill / Sugar River confluence; verify legality before relying on it."
      },
      {
        "id": "badger-mill-highway-69-sugar-river",
        "name": "Highway 69 take-out on the Sugar River",
        "latitude": 42.94921,
        "longitude": -89.54436,
        "mileFromStart": 5.75,
        "segmentKind": "creek",
        "note": "Default take-out coordinate from Miles Paddled after the confluence with the Sugar River."
      }
    ]
  },
  "white-river-maple-ridge-highway-112": {
    "putIn": {
      "id": "maple-ridge-road-white-river",
      "name": "Maple Ridge Road Bridge",
      "latitude": 46.43763,
      "longitude": -91.0262
    },
    "takeOut": {
      "id": "highway-112-dam-white-river",
      "name": "Highway 112 Dam / Xcel Energy Landing",
      "latitude": 46.49858,
      "longitude": -90.90995
    },
    "logistics": {
      "distanceLabel": "About 14.9 mi",
      "estimatedPaddleTime": "About 6 hr or more; start early and allow extra time for low water, wood, or scouting",
      "shuttle": "Stage the Highway 112 / White River Flowage take-out first, then drive back to Maple Ridge Road. Confirm the flowage is not drawn down and that the take-out above the dam is usable before launching.",
      "permits": "No route-specific paddling permit is known. Use the named public/practical bridge and dam landing access only, follow posted Xcel/flowage signs, and avoid private banks except for emergencies.",
      "camping": "No public on-route river campsite was verified. Wisconsin Trail Guide points paddlers to nearby basecamps such as Copper Falls State Park or Chequamegon-Nicolet National Forest campgrounds rather than riverbank camping on this reach.",
      "campingClassification": "nearby_basecamp",
      "summary": "Run the WH1 White River reach from Maple Ridge Road to the Highway 112 Dam landing. The first miles are remote and wooded; the lower half adds frequent riffles, Class I-II rapids, ledges, strainers, and a mandatory stop at the flowage/dam boundary.",
      "accessCaveats": [
        "The Highway 112 landing is the mandatory plan stop. Do not continue below the dam or into drawdown-exposed drops without a separate whitewater plan.",
        "The Ashland gauge is direct, but AW and Miles Paddled evidence makes the current 181 cfs reading low for this route. Scout before committing at marginal levels.",
        "Private banks and remote forested corridors limit casual bailouts. Carry repair, insulation, and enough daylight for a long shuttle day."
      ],
      "watchFor": [
        "Nearly continuous lower-route riffles and Class I-II rapids, including The Ledge area noted by WTG.",
        "Overhanging trees, deadfall, strainers, and blind bends after wind or storms.",
        "Cold water, limited rescue access, and flowage drawdown changes near the Highway 112 dam."
      ]
    },
    "accessPoints": [
      {
        "id": "maple-ridge-road-white-river",
        "name": "Maple Ridge Road Bridge",
        "latitude": 46.43763,
        "longitude": -91.0262,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default WTG WH1 / Miles Paddled put-in at Maple Ridge Road Bridge."
      },
      {
        "id": "highway-112-dam-white-river",
        "name": "Highway 112 Dam / Xcel Energy Landing",
        "latitude": 46.49858,
        "longitude": -90.90995,
        "mileFromStart": 14.9,
        "segmentKind": "creek",
        "note": "Default WTG WH1 take-out on the White River Flowage above the Highway 112 dam."
      }
    ]
  },
  "white-river-park-riverview-park": {
    "putIn": {
      "id": "white-river-county-park-launch",
      "name": "White River County Park canoe/kayak launch",
      "latitude": 42.6245,
      "longitude": -88.3826
    },
    "takeOut": {
      "id": "riverview-park-mill-street-white-river",
      "name": "Riverview Park / Mill Street landing",
      "latitude": 42.64798,
      "longitude": -88.35771
    },
    "logistics": {
      "distanceLabel": "About 3.9 mi from the county park area; about 6.6 mi if starting at the first Sheridan Springs bridge",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr depending on water level, scouting, and launch choice",
      "shuttle": "Stage Riverview Park / Mill Street in Lyons first, then use the signed White River County Park launch or nearby Sheridan Springs access if the park carry is not practical. Bike shuttle is short by road.",
      "permits": "No route-specific paddling permit is known. Follow Walworth County park hours and launch rules, avoid blocking roads, and do not use posted Spring Valley dry-land access as a planned exit.",
      "camping": "No on-route public campsite was identified. Treat this as a day run; White River County Park is a day-use county park in the route evidence.",
      "campingClassification": "none",
      "summary": "Paddle the best Walworth County White River rapids reach from White River County Park toward Lyons. The run is short and clear, with many Class I riffles and one scout-worthy Class II former-dam drop before the Riverview Park take-out.",
      "accessCaveats": [
        "Walworth County lists the park canoe/kayak launch, but WRT notes some park carries can be awkward. Verify the signed launch and carry before unloading.",
        "Spring Valley Road has a noteworthy drop and posted/private access concerns nearby. Scout from legal ground and continue to Riverview Park for the normal take-out.",
        "The Nippersink and Jackson Creek gauges are proxies. The Geneva Lake dam, millrace, local rain, and new wood can make same-day visual inspection more important than the app score."
      ],
      "watchFor": [
        "Class I riffles through the park corridor and the Class II former-dam drop below Spring Valley Road.",
        "Low-water scraping below about 100 cfs on the Nippersink proxy and pushier water above the WRT high bands.",
        "Overhanging limbs, fresh strainers, private banks, and cold spring/fall water."
      ]
    },
    "accessPoints": [
      {
        "id": "white-river-county-park-launch",
        "name": "White River County Park canoe/kayak launch",
        "latitude": 42.6245,
        "longitude": -88.3826,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Walworth County lists a canoe/kayak launch at White River County Park, 6503 Sheridan Springs Road; coordinate is approximate to the named park access."
      },
      {
        "id": "spring-valley-road-lyons-wave",
        "name": "Spring Valley Road / Lyons Wave scout point",
        "latitude": 42.6417,
        "longitude": -88.3637,
        "mileFromStart": 2.7,
        "segmentKind": "creek",
        "note": "Former-dam Class II drop from WRT/AW; scout legally and do not rely on posted dry-land access as the default take-out."
      },
      {
        "id": "riverview-park-mill-street-white-river",
        "name": "Riverview Park / Mill Street landing",
        "latitude": 42.64798,
        "longitude": -88.35771,
        "mileFromStart": 3.9,
        "segmentKind": "creek",
        "note": "Default WRT / Miles Paddled take-out just west of the Mill Street bridge in Lyons."
      }
    ]
  },
  "pine-river-lincoln-pine-river-park-county-w": {
    "putIn": {
      "id": "pine-river-park-center-road",
      "name": "Pine River Park / Center Road access",
      "latitude": 45.15733,
      "longitude": -89.59732
    },
    "takeOut": {
      "id": "pine-river-county-w",
      "name": "County Road W Pine River take-out",
      "latitude": 45.13513,
      "longitude": -89.62277
    },
    "logistics": {
      "distanceLabel": "About 2.5 mi",
      "estimatedPaddleTime": "About 1 hr to 2.5 hr, longer with scouting, portages, or rescue setup",
      "shuttle": "Scout the County W take-out first because the path is steep and easy to miss, then stage at Pine River Park / Center Road. Keep the group compact through the gorge.",
      "permits": "No route-specific paddling permit is known. Use the park/bridge access described by WRT and Miles Paddled, verify County W parking and bank access, and avoid private banks except for emergencies.",
      "camping": "No public on-route campsite was identified. Treat the Pine Dells reach as a short whitewater day run from Merrill-area lodging or other off-route basecamps.",
      "campingClassification": "none",
      "summary": "Run the Pine Dells gorge from Pine River Park / Center Road to County W. The mileage is short, but ledges, two Class III features, steep banks, few eddies, and imperfect proxy gauge support make it an advanced whitewater outing.",
      "accessCaveats": [
        "County W is a mandatory practical exit for this card. Inspect the steep bank and hidden path before launching so the group recognizes the take-out from the water.",
        "The Prairie River gauge is only a proxy; WRT warns the Pine can drop quickly after rain. Same-day visual inspection at Center Road controls.",
        "Do not treat this as a beginner scenic paddle. Rescue access is limited by steep walls and few eddies in the gorge."
      ],
      "watchFor": [
        "Double Dells and S-Turn Class III features, with scout/portage options depending on level and skill.",
        "Class I-II ledges, shallow rocks below the 150 cfs proxy floor, and pushier hydraulics after rain.",
        "Cold water, strainers, steep banks, limited eddies, and private-bank bailout limits."
      ]
    },
    "accessPoints": [
      {
        "id": "pine-river-park-center-road",
        "name": "Pine River Park / Center Road access",
        "latitude": 45.15733,
        "longitude": -89.59732,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default WRT / Miles Paddled put-in at Pine River Park near the Center Road bridge."
      },
      {
        "id": "pine-river-county-w",
        "name": "County Road W Pine River take-out",
        "latitude": 45.13513,
        "longitude": -89.62277,
        "mileFromStart": 2.5,
        "segmentKind": "creek",
        "note": "Default Miles Paddled take-out; WRT reports a steep bank and hidden path, so scout before launch."
      }
    ]
  },
  "bark-river-merton-dam-bark-river-park": {
    "putIn": {
      "id": "merton-millpond-dam-launch",
      "name": "Merton Millpond / Firemen's Park downstream launch",
      "latitude": 43.14871,
      "longitude": -88.30684
    },
    "takeOut": {
      "id": "bark-river-park-hartland",
      "name": "Bark River Park / Church Street",
      "latitude": 43.1072301,
      "longitude": -88.3453733
    },
    "logistics": {
      "distanceLabel": "About 4.9 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer if wood forces portages",
      "shuttle": "Use a short Lake Country vehicle shuttle between the Merton Millpond / Firemen's Park dam area and Bark River Park in Hartland. Stage the Bark River Park take-out first because it is the practical endpoint before the Hartland segment.",
      "permits": "No route-specific paddling permit is known. Use the public Merton Millpond and Hartland park access points, follow posted park rules, and avoid private banks except for emergencies.",
      "camping": "No on-route camping is documented. Treat this as a day route from nearby Lake Country lodging or home base.",
      "campingClassification": "none",
      "summary": "Launch below the Merton Millpond dam area and paddle the clear upper Bark to Hartland's Bark River Park. The route has springs, boulder gardens, and attractive wooded sections, but wood and shallow rocks make the Delafield gauge and a same-day visual check important.",
      "accessCaveats": [
        "Launch below the dam structure at Merton; do not stage or idle near dam hydraulics.",
        "Bark River Park is the planned take-out for this card. Continuing downstream enters the separate Hartland-to-Delafield route with additional rapids, bridge clearance, and lake exposure.",
        "Private banks line portions of the reach. Plan all stops at public parks or clear emergency exits only."
      ],
      "watchFor": [
        "Shallow boulder gardens and scraping when the Delafield gauge is below the preferred window.",
        "Fresh deadfall, low branches, and portage-worthy strainers in the narrow wooded channel.",
        "Fast-rising water, cold spring-fed current, and limited bailout options between public parks."
      ]
    },
    "accessPoints": [
      {
        "id": "merton-millpond-dam-launch",
        "name": "Merton Millpond / Firemen's Park downstream launch",
        "latitude": 43.14871,
        "longitude": -88.30684,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Village of Merton public boat-launch area and WRT dam-area launch for the downstream Bark route."
      },
      {
        "id": "bark-river-park-hartland",
        "name": "Bark River Park / Church Street",
        "latitude": 43.1072301,
        "longitude": -88.3453733,
        "mileFromStart": 4.9,
        "segmentKind": "creek",
        "note": "Village of Hartland public riverfront park at the end of Church Street."
      }
    ]
  },
  "bark-river-bark-river-park-delafield": {
    "putIn": {
      "id": "bark-river-park-hartland",
      "name": "Bark River Park / Church Street",
      "latitude": 43.1072301,
      "longitude": -88.3453733
    },
    "takeOut": {
      "id": "delafield-mill-street-launch",
      "name": "Delafield Post Office / Mill Street kayak launch",
      "latitude": 43.0626414,
      "longitude": -88.4031778
    },
    "logistics": {
      "distanceLabel": "About 6.2 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with scouting or bridge portages",
      "shuttle": "Stage a vehicle at the Mill Street / Delafield Post Office launch, then put in at Bark River Park. A bike shuttle is possible in the Hartland-Delafield corridor, but vehicle staging avoids downtown and lake-traffic timing.",
      "permits": "No route-specific paddling permit is known. Follow Hartland park rules at the put-in and local Delafield launch rules at the take-out.",
      "camping": "No on-route camping is documented. Treat this as a day paddle; nearby developed lodging and campgrounds are off-route basecamps only.",
      "campingClassification": "none",
      "summary": "Paddle from Bark River Park through Hartland, the Highway 83 corridor, and Lake Nagawicka to the Mill Street launch by the Delafield Post Office. This route has the best Bark River gauge ladder in the app, but it also has rapids, wood, bridge clearance, and lake wind exposure.",
      "accessCaveats": [
        "Identify the Delafield Mill Street launch before paddling across Lake Nagawicka; wind, motorboats, and shoreline development can make the final approach feel different from the creek miles.",
        "Low bridges may require ducking or easy portages depending on water level and boat height.",
        "Much of the route has private shoreline, especially below Hartland and along the lake. Do not count on casual bankside exits."
      ],
      "watchFor": [
        "Class I-II current and a stronger rapid in the Hartland section.",
        "Fresh tree blockages, low branches, and bridge-clearance issues after storms.",
        "Wind, cold water, and motorboat traffic on Lake Nagawicka before the Delafield take-out."
      ]
    },
    "accessPoints": [
      {
        "id": "bark-river-park-hartland",
        "name": "Bark River Park / Church Street",
        "latitude": 43.1072301,
        "longitude": -88.3453733,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Village of Hartland public riverfront park and WRT put-in for the Hartland route."
      },
      {
        "id": "nixon-park-hartland",
        "name": "Nixon Park / East Park Avenue",
        "latitude": 43.1051,
        "longitude": -88.3427,
        "mileFromStart": 0.9,
        "segmentKind": "creek",
        "note": "Downtown Hartland park corridor near early rapids and scout/bailout options."
      },
      {
        "id": "delafield-mill-street-launch",
        "name": "Delafield Post Office / Mill Street kayak launch",
        "latitude": 43.0626414,
        "longitude": -88.4031778,
        "mileFromStart": 6.2,
        "segmentKind": "lake",
        "note": "WRT describes a dedicated canoe/kayak launch across from the Delafield Post Office near 623 Mill Street."
      }
    ]
  },
  "pine-river-richland-center-canoe-port-1-port-4": {
    "putIn": {
      "id": "pine-richland-canoe-port-1-bowens-mill",
      "name": "Canoe Port 1 / Bowen's Mill / Krouskop Park",
      "latitude": 43.34677,
      "longitude": -90.38865
    },
    "takeOut": {
      "id": "pine-richland-canoe-port-4-seminary-street",
      "name": "Canoe Port 4 / Seminary Street",
      "latitude": 43.3362,
      "longitude": -90.3864
    },
    "logistics": {
      "distanceLabel": "About 5.5 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr",
      "shuttle": "Use Richland Center's short in-town shuttle between Canoe Port 1 near Bowen's Mill / Krouskop Park and Canoe Port 4 at Seminary Street. The official canoe-port map also supports shorter Port 1-2, 2-3, and 3-4 segments.",
      "permits": "No route-specific paddling permit is known. Use the city/county canoe-port sites, follow posted city park rules, and avoid private banks outside the official access chain.",
      "camping": "No on-route camping is documented for the Richland Center in-town segment. Treat it as a day route; Pier County Park and private outfitters are off-route basecamp options.",
      "campingClassification": "nearby_basecamp",
      "summary": "Follow Richland Center's official Pine River canoe-port corridor from Port 1 / Bowen's Mill through town to Port 4 / Seminary Street. The river is approachable at normal levels, but the Kickapoo gauge is only a proxy and high water changes the character quickly.",
      "accessCaveats": [
        "The La Farge Kickapoo gauge is not on the Pine River. Check water visually at Port 1 and treat recent local rain or flood debris as controlling information.",
        "Stay with the city/county canoe-port chain for launches and exits; intervening banks may be private, muddy, unstable, or unsuitable for routine stops.",
        "Seminary Street is the planned take-out for this card. Continuing downstream changes the route into a longer rural Pine River outing with fewer immediate exits."
      ],
      "watchFor": [
        "Strainers, bridge debris, and fresh flood damage after storms.",
        "Faster pushy current and fewer beginner-friendly eddies when the proxy gauge rises above modest-flow conditions.",
        "Urban water-quality context, cold water, muddy banks, and private-property edges."
      ]
    },
    "accessPoints": [
      {
        "id": "pine-richland-canoe-port-1-bowens-mill",
        "name": "Canoe Port 1 / Bowen's Mill / Krouskop Park",
        "latitude": 43.34677,
        "longitude": -90.38865,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Official city/county canoe-port map labels Port 1 at Bowen's Mill; Miles Paddled gives Krouskop Park GPS for this Pine River access area."
      },
      {
        "id": "pine-richland-canoe-port-2-lions-park",
        "name": "Canoe Port 2 / Lions Park",
        "latitude": 43.3423,
        "longitude": -90.3834,
        "mileFromStart": 2.7,
        "segmentKind": "creek",
        "note": "Official city/county canoe-port map lists Port 2 at Lions Park, 2.7 miles below Port 1."
      },
      {
        "id": "pine-richland-canoe-port-3-north-park",
        "name": "Canoe Port 3 / North Park",
        "latitude": 43.3498866,
        "longitude": -90.3923001,
        "mileFromStart": 4.4,
        "segmentKind": "creek",
        "note": "Official city/county canoe-port map lists Port 3 at North Park, 1.7 miles below Port 2."
      },
      {
        "id": "pine-richland-canoe-port-4-seminary-street",
        "name": "Canoe Port 4 / Seminary Street",
        "latitude": 43.3362,
        "longitude": -90.3864,
        "mileFromStart": 5.5,
        "segmentKind": "creek",
        "note": "Official city/county canoe-port map lists Port 4 at Seminary Street, and Richland Center tourism references Pine River access at 397 W. Seminary Street."
      }
    ]
  },
  "eau-claire-river-east-branch-wayside-county-i": {
    "putIn": {
      "id": "east-branch-eau-claire-wayside-park",
      "name": "Wayside Park / Highway 45 access",
      "latitude": 45.234493,
      "longitude": -89.1508535
    },
    "takeOut": {
      "id": "east-branch-eau-claire-county-i-dnr-access",
      "name": "County Road I DNR access",
      "latitude": 45.2038261,
      "longitude": -89.2160091
    },
    "logistics": {
      "distanceLabel": "About 5.1 mi",
      "estimatedPaddleTime": "About 2.5 hr to 3.5 hr, longer with logjam portages",
      "shuttle": "Use the short Wayside Park-to-County-I shuttle. County B and Bluebell Road are practical shorter-route access options if you want to skip the snag-prone upper miles or focus on the better lower trout-stream section.",
      "permits": "No route-specific paddling permit is known. Use the public wayside, DNR/bridge access pull-offs, and posted road-access areas; avoid private yards and farm banks.",
      "camping": "No on-route public campsite was identified. Treat this as a day route and use nearby developed campgrounds or lodging only as off-route basecamps.",
      "campingClassification": "none",
      "summary": "Launch at Wayside Park off Highway 45 and take out at the County Road I DNR access. Expect a narrow East Branch trout stream with clear water, alder dodging, light riffles, and several optional bridge exits.",
      "accessCaveats": [
        "The County Road I take-out is a public DNR access and pull-off southeast of the bridge, but it is still a small fishing-style access rather than a large boat ramp.",
        "County B and Bluebell Road are useful alternates if the upper reach looks too congested or shallow.",
        "The Kelly gauge is far downstream; inspect actual depth and wood at the put-in before committing."
      ],
      "watchFor": [
        "Logjams, low bridge clearance, alder gauntlets, and branch dodging upstream from County B.",
        "Shallow riffles and wading when the downstream Kelly proxy is below the WRT average band.",
        "Private banks, cold water, fresh post-storm wood, and fast localized rises not fully captured by the downstream gauge."
      ]
    },
    "accessPoints": [
      {
        "id": "east-branch-eau-claire-wayside-park",
        "name": "Wayside Park / Highway 45 access",
        "latitude": 45.234493,
        "longitude": -89.1508535,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; WRT describes Wayside Park as a nice public wayside and put-in option."
      },
      {
        "id": "east-branch-eau-claire-county-b-access",
        "name": "County Road B bridge access",
        "latitude": 45.2299617,
        "longitude": -89.1667767,
        "mileFromStart": 1.3,
        "segmentKind": "creek",
        "note": "Alternate access from WRT My Maps; useful if skipping the snag-prone upper section."
      },
      {
        "id": "east-branch-eau-claire-bluebell-road-access",
        "name": "Bluebell Road bridge access",
        "latitude": 45.2195951,
        "longitude": -89.1897367,
        "mileFromStart": 3,
        "segmentKind": "creek",
        "note": "Alternate access; WRT calls this an excellent bridge access used by fishermen."
      },
      {
        "id": "east-branch-eau-claire-county-i-dnr-access",
        "name": "County Road I DNR access",
        "latitude": 45.2038261,
        "longitude": -89.2160091,
        "mileFromStart": 5.1,
        "segmentKind": "creek",
        "note": "Default take-out; WRT describes a public DNR access and pull-off southeast of the bridge."
      }
    ]
  },
  "eau-claire-river-east-branch-county-i-highway-64": {
    "putIn": {
      "id": "east-branch-eau-claire-county-i-dnr-access",
      "name": "County Road I DNR access",
      "latitude": 45.2037556,
      "longitude": -89.2159535
    },
    "takeOut": {
      "id": "east-branch-eau-claire-highway-64-access",
      "name": "Highway 64 bridge access",
      "latitude": 45.1454554,
      "longitude": -89.245114
    },
    "logistics": {
      "distanceLabel": "About 6.1 mi",
      "estimatedPaddleTime": "About 3 hr, longer if portaging the boulder/logjam combo",
      "shuttle": "Stage the Highway 64 take-out first, then launch from the County Road I DNR access. River Road, Highway H, and Spring Road make useful shorter-route or bailout options if the first half looks too brushy or low.",
      "permits": "No route-specific paddling permit is known. Use the named DNR/bridge/fishing accesses and respect nearby homes, farms, and private banks.",
      "camping": "No on-route public campsite was identified. This is a day paddle; nearby developed campgrounds or county/forest recreation areas should be treated as off-route basecamps only.",
      "campingClassification": "none",
      "summary": "Launch at County Road I and finish at Highway 64 for the rockier downstream East Branch route. The Mills Recreation Area stretch supplies the best boulder gardens and Class I riffles, while the first half has more alders and logjam management.",
      "accessCaveats": [
        "Highway 64 is a bridge take-out with a mowed bank and embankment drag, not a developed launch. Inspect it before paddling.",
        "Spring Road can shorten the route and sits near Mills Recreation Area parking, but do not assume every bridge bank is suitable for a group take-out.",
        "The Kelly gauge is downstream of the selected route; same-day visual checks at County I and Highway 64 control."
      ],
      "watchFor": [
        "A hop-over snag near the put-in, a large pine logjam, and an additional boulder-field/logjam portage between Highway H and Spring Road.",
        "Class I boulder gardens in Mills Recreation Area that can become Class II in higher water.",
        "Shallow scraping below the WRT floor, private banks, cold water, and fast local rises after Langlade County rain."
      ]
    },
    "accessPoints": [
      {
        "id": "east-branch-eau-claire-county-i-dnr-access",
        "name": "County Road I DNR access",
        "latitude": 45.2037556,
        "longitude": -89.2159535,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; WRT describes a public DNR access and pull-off southeast of the bridge."
      },
      {
        "id": "east-branch-eau-claire-river-road-access",
        "name": "River Road bridge access",
        "latitude": 45.1940301,
        "longitude": -89.2212177,
        "mileFromStart": 1.1,
        "segmentKind": "creek",
        "note": "Alternate access popular with anglers; WRT notes the County I-to-River Road leg has one major logjam."
      },
      {
        "id": "east-branch-eau-claire-highway-h-access",
        "name": "County Road H bridge access",
        "latitude": 45.1828233,
        "longitude": -89.2284102,
        "mileFromStart": 2.2,
        "segmentKind": "creek",
        "note": "Bridge access option from the WRT route map; inspect first because it is close to a home."
      },
      {
        "id": "east-branch-eau-claire-spring-road-access",
        "name": "Spring Road / Mills Recreation Area access",
        "latitude": 45.1609467,
        "longitude": -89.2398626,
        "mileFromStart": 4.6,
        "segmentKind": "creek",
        "note": "Alternate take-out near Mills Recreation Area parking and the boulder-garden section."
      },
      {
        "id": "east-branch-eau-claire-highway-64-access",
        "name": "Highway 64 bridge access",
        "latitude": 45.1454554,
        "longitude": -89.245114,
        "mileFromStart": 6.1,
        "segmentKind": "creek",
        "note": "Default take-out; WRT describes a good mowed bridge access on the northwest bank."
      }
    ]
  },
  "blue-river-highway-g-forest-road": {
    "putIn": {
      "id": "blue-river-highway-g-bridge-access",
      "name": "Highway G bridge access",
      "latitude": 43.1280924,
      "longitude": -90.5120914
    },
    "takeOut": {
      "id": "blue-river-forest-road-bridge-access",
      "name": "Forest Road bridge access",
      "latitude": 43.1747426,
      "longitude": -90.5057292
    },
    "logistics": {
      "distanceLabel": "About 8.0 mi",
      "estimatedPaddleTime": "About 4 hr",
      "shuttle": "Use the paved Highway G-to-Forest Road shuttle. WRT measured the bike shuttle at about 5.5 miles with little climbing, but open-valley wind can make the ride harder than the elevation suggests.",
      "permits": "No route-specific paddling permit is known. Use the named bridge corners only, avoid fenced or posted areas, and treat intervening banks as private unless clearly public.",
      "camping": "No on-route public campsite was identified. Treat this as a day route; do not camp on pasture, farm, or private banks.",
      "campingClassification": "none",
      "summary": "Launch from the Highway G bridge and take out at Forest Road for a lower Blue River extension below Snow Bottom. It is more open and less scenic than the upstream Blue, but it has enough current, bluffs, and low-water resilience to be useful when the upper routes are too bony.",
      "accessCaveats": [
        "Highway G is a bridge put-in, with WRT favoring the northwest side almost under the bridge.",
        "Forest Road should be exited from the southeast corner with the make-shift pallet ramp; avoid the fenced north side.",
        "Studnika Road is a no-access marker, not a bailout. WRT reports fencing, no-trespassing signs, and camera signage there."
      ],
      "watchFor": [
        "One required logjam portage in the first mile, plus duckers and hoppers from downed trees.",
        "Strainers in deceptively fast current, especially once the Platte proxy rises above the low target band.",
        "Steep muddy banks, private pasture edges, wind in the open valley, and cold shoulder-season water."
      ]
    },
    "accessPoints": [
      {
        "id": "blue-river-highway-g-bridge-access",
        "name": "Highway G bridge access",
        "latitude": 43.1280924,
        "longitude": -90.5120914,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; WRT calls the northwest side almost under the bridge the best launch option."
      },
      {
        "id": "blue-river-studnika-road-no-access",
        "name": "Studnika Road bridge no-access marker",
        "latitude": 43.1399,
        "longitude": -90.5097,
        "mileFromStart": 1,
        "segmentKind": "creek",
        "note": "Navigation marker only; WRT says this is not a suitable public access."
      },
      {
        "id": "blue-river-forest-road-bridge-access",
        "name": "Forest Road bridge access",
        "latitude": 43.1747426,
        "longitude": -90.5057292,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Default take-out; WRT says use the southeast corner and avoid the fenced north side."
      }
    ]
  },
  "milwaukee-river-riverside-bruce-street": {
    "putIn": {
      "id": "riverside-park-rotary-centennial-arboretum-landing",
      "name": "Riverside Park / Milwaukee Rotary Centennial Arboretum landing",
      "latitude": 43.0674,
      "longitude": -87.89238
    },
    "takeOut": {
      "id": "bruce-street-boat-ramp",
      "name": "Bruce Street Boat Ramp",
      "latitude": 43.02503,
      "longitude": -87.90403
    },
    "logistics": {
      "distanceLabel": "About 3.9 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr depending on current, bridge traffic, and stops",
      "shuttle": "Use an urban two-car shuttle between Bruce Street and Riverside Park / Milwaukee Rotary Centennial Arboretum. A bike or rideshare shuttle is feasible, but account for downtown traffic, events, parking fees, and ramp congestion.",
      "permits": "No route-specific paddling permit is known. Follow Milwaukee County Parks and Milwaukee Urban Water Trail access rules, any Bruce Street launch fee or parking rules, and Wisconsin boating/PFD requirements.",
      "camping": "No on-route camping is documented or appropriate for this urban day route.",
      "campingClassification": "none",
      "summary": "Launch from Riverside Park / Milwaukee Rotary Centennial Arboretum and finish at Bruce Street Boat Ramp before the harbor and Lake Michigan add-on. This is a compact downtown route, but North Avenue riffles, seawalls, tour boats, movable bridges, and urban water-quality timing matter.",
      "accessCaveats": [
        "Riverside Park has a longer carry to the canoe landing. Confirm the access path, footing, and park conditions before staging boats.",
        "Bruce Street is a public county ramp and can be busy with motor boats, emergency vessels, and harbor traffic. Land decisively and keep the ramp clear.",
        "This card ends at Bruce Street. Continuing to McKinley Marina, Lake Michigan, or the harbor mouth adds open-water wind, swell, wake, and port-traffic exposure that is outside this route."
      ],
      "watchFor": [
        "North Avenue riffles and pushier water when the Milwaukee gauge rises above the lower beginner window.",
        "Movable bridges, tour boats, paddler congestion, hard seawalls, limited bailout spots, and wake reflection in the lower channel.",
        "Urban runoff, possible sewage bypasses after heavy rain, cold water, wind, and harbor-adjacent motorboat traffic near Bruce Street."
      ]
    },
    "accessPoints": [
      {
        "id": "riverside-park-rotary-centennial-arboretum-landing",
        "name": "Riverside Park / Milwaukee Rotary Centennial Arboretum landing",
        "latitude": 43.0674,
        "longitude": -87.89238,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the downtown split; WRT notes a long carry to the landing."
      },
      {
        "id": "bruce-street-boat-ramp",
        "name": "Bruce Street Boat Ramp",
        "latitude": 43.02503,
        "longitude": -87.90403,
        "mileFromStart": 3.9,
        "segmentKind": "creek",
        "note": "Default take-out before the Lake Michigan add-on; expect motorboat and harbor traffic."
      }
    ]
  },
  "milwaukee-river-thiensville-badger-meter": {
    "putIn": {
      "id": "thiensville-village-park-launch",
      "name": "Thiensville Village Park Launch",
      "latitude": 43.23144,
      "longitude": -87.979
    },
    "takeOut": {
      "id": "badger-meter-river-park-launch",
      "name": "Badger Meter River Park canoe/kayak launch",
      "latitude": 43.1779,
      "longitude": -87.95739
    },
    "logistics": {
      "distanceLabel": "About 4.7 mi",
      "estimatedPaddleTime": "About 1.75 hr to 2.5 hr depending on level and stops",
      "shuttle": "Run a short two-car shuttle from Badger Meter River Park back to Thiensville Village Park. A bike shuttle can use Brown Deer and Ozaukee Interurban corridors, but expect urban crossings and local-street navigation.",
      "permits": "No route-specific paddling permit is known. Follow Thiensville Village Park and Brown Deer park hours, parking, launch, and posted Urban Water Trail rules.",
      "camping": "Treat this as a short urban day route. No on-route public camping is documented or assumed.",
      "campingClassification": "none",
      "summary": "Launch below the Mequon-Thiensville dam at Village Park and take out at Badger Meter River Park in Brown Deer for an easy lower-Milwaukee water-trail run. The Cedarburg USGS station is upstream, so pair the gauge band with same-day visual checks at the launch.",
      "accessCaveats": [
        "Use the Village Park launch below the dam for this route. The Thiensville park page and boating guidance identify Village Park as the launch and dam portage area; do not run the dam.",
        "Badger Meter River Park has a public canoe/kayak launch, but Wisconsin River Trips notes the exit includes a grassy uphill carry of roughly 300 feet.",
        "The Cedarburg gauge is upstream of the whole reach. Local storms, dam operations, and downstream tributary input can make the water different than the gauge suggests.",
        "Most banks are private or urban park frontage. Use only the named public launches and legal shoreline stops."
      ],
      "watchFor": [
        "Fast or rising water after rain, minor riffles, bridge constrictions, strainers, and floating debris.",
        "Urban runoff and water-quality concerns after storms.",
        "Private islands, riprapped yards, fishing lines, and narrow channels around bends.",
        "Low water can expose rocks and make riffles scrapey even when the route remains passable."
      ]
    },
    "accessPoints": [
      {
        "id": "thiensville-village-park-launch",
        "name": "Thiensville Village Park Launch",
        "latitude": 43.23144,
        "longitude": -87.979,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in below the Mequon-Thiensville dam at Village Park."
      },
      {
        "id": "badger-meter-river-park-launch",
        "name": "Badger Meter River Park canoe/kayak launch",
        "latitude": 43.1779,
        "longitude": -87.95739,
        "mileFromStart": 4.7,
        "segmentKind": "creek",
        "note": "Default take-out at Brown Deer public canoe/kayak launch; expect an uphill carry to parking."
      }
    ]
  },
  "pecatonica-river-highway-78-gratiot": {
    "putIn": {
      "id": "pecatonica-highway-78-landing",
      "name": "Highway 78 Landing",
      "latitude": 42.5985,
      "longitude": -90.0009
    },
    "takeOut": {
      "id": "gratiot-conservation-club-landing",
      "name": "Gratiot Conservation Club Landing",
      "latitude": 42.59378,
      "longitude": -89.96556
    },
    "logistics": {
      "distanceLabel": "About 5.8 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr depending on current and wind",
      "shuttle": "Use a two-car shuttle between the Highway 78 Landing and the Gratiot Conservation Club Landing. The Cheese Country Trail can shorten a bike shuttle, but it is an ATV/multi-use corridor and may require a trail pass.",
      "permits": "No route-specific paddling permit is known. Follow Lafayette County and local landing rules, and confirm any Cheese Country Trail pass requirements if using a bike shuttle.",
      "camping": "Treat this as a day route. No legal on-route campsite was identified between Highway 78 and Gratiot.",
      "campingClassification": "none",
      "summary": "Launch at Highway 78 Landing and take out at Gratiot Conservation Club Landing for a quiet lower-Pecatonica connector. The Darlington USGS gauge is upstream of this reach, so use it as a same-river proxy and inspect the landings before committing.",
      "accessCaveats": [
        "Use the signed or mapped landings rather than private farm lanes or bridge shoulders.",
        "The Darlington gauge is upstream of this segment. Local rain, tributary inflow, and slow backwater conditions can change the lower river response.",
        "Banks are mostly private agricultural frontage; avoid improvised stops and do not block field or club access at the take-out.",
        "Mud is normal at lower-Pecatonica landings, especially after rain or at higher stages."
      ],
      "watchFor": [
        "Slow current, muddy water, wind on open bends, and downed trees that may require careful maneuvering.",
        "Cold-water exposure outside summer and limited clean bailout points along private banks.",
        "High flows can make strainers and muddy eddies more consequential even though the reach has no normal rapids.",
        "Wear bright colors during deer seasons where the river borders hunting land."
      ]
    },
    "accessPoints": [
      {
        "id": "pecatonica-highway-78-landing",
        "name": "Highway 78 Landing",
        "latitude": 42.5985,
        "longitude": -90.0009,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the public Highway 78 Landing."
      },
      {
        "id": "gratiot-conservation-club-landing",
        "name": "Gratiot Conservation Club Landing",
        "latitude": 42.59378,
        "longitude": -89.96556,
        "mileFromStart": 5.8,
        "segmentKind": "creek",
        "note": "Default take-out at the public Gratiot Conservation Club Landing."
      }
    ]
  },
  "little-platte-river-stumpton-hwy-o": {
    "putIn": {
      "id": "little-platte-stumpton-road-access",
      "name": "Stumpton Road bridge access",
      "latitude": 42.7181,
      "longitude": -90.5205
    },
    "takeOut": {
      "id": "little-platte-county-o-access",
      "name": "County Highway O bridge access",
      "latitude": 42.6897,
      "longitude": -90.56434
    },
    "logistics": {
      "distanceLabel": "About 6.1 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low water or fence scouting",
      "shuttle": "Use a two-car rural shuttle. A bike shuttle has hills and awkward highway routing; at the County O take-out, park completely clear of farm access and road shoulders.",
      "permits": "No route-specific paddling permit is known. Access is bridge and shoulder style rather than developed ramps, so park legally, avoid private land, and use only public right-of-way or clearly allowed access.",
      "camping": "No on-route public campsite is documented. Treat this as a day route and do not camp on farm or private banks.",
      "campingClassification": "none",
      "summary": "Run the fast, riffly Little Platte from Stumpton Road to County O only when the Platte River proxy is high enough and the group is ready for fences, shallow riffles, and fast high-water consequences.",
      "accessCaveats": [
        "The put-in and take-out are practical bridge accesses, not developed launches; same-day parking legality and bank conditions control.",
        "Wisconsin River Trips reports the County O take-out as a mowed path and muddy exit near a farm road; do not block tractor or field access.",
        "The Rockville Platte gauge is a downstream proxy, not an on-segment gauge. Use it only with visual confirmation at Stumpton Road.",
        "Banks are largely private agricultural frontage. Do not use private fields, lanes, or banks for scouting or breaks without permission."
      ],
      "watchFor": [
        "Multiple fences, including a reported low electric fence over moving water near Maple Ridge Road.",
        "High water can make this narrow creek dangerous; cancel if the gauge is above the recommended band or if the water is rising quickly.",
        "Low water can mean repeated scraping and walking over riffles.",
        "Class I riffles, possible wood strainers, cold water, remote road access, and limited rescue options between bridges."
      ]
    },
    "accessPoints": [
      {
        "id": "little-platte-stumpton-road-access",
        "name": "Stumpton Road bridge access",
        "latitude": 42.7181,
        "longitude": -90.5205,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the practical Stumpton Road bridge access; confirm shoulder parking and bank condition."
      },
      {
        "id": "little-platte-county-o-access",
        "name": "County Highway O bridge access",
        "latitude": 42.6897,
        "longitude": -90.56434,
        "mileFromStart": 6.1,
        "segmentKind": "creek",
        "note": "Default take-out at the County O bridge area; use only legal parking and keep farm access clear."
      }
    ]
  },
  "turtle-creek-school-section-east-creek": {
    "putIn": {
      "name": "School Section Road bridge access",
      "latitude": 42.6829232,
      "longitude": -88.6877302
    },
    "takeOut": {
      "name": "East Creek Road canoe launch area",
      "latitude": 42.6113321,
      "longitude": -88.7804249
    },
    "logistics": {
      "distanceLabel": "6.9 mi",
      "estimatedPaddleTime": "About 3 hr 30 min, longer with weeds, wind, or wildlife-area stops",
      "shuttle": "Run a short rural shuttle from East Creek Road back to School Section Road. The route source calls this an easy 4.8-mile bike shuttle with mostly quiet roads, but inspect the muddy East Creek carry-out before launching.",
      "permits": "No route-specific paddling permit is known. Use public road/access points, obey Wisconsin boating and PFD rules, and follow Wisconsin DNR Turtle Creek Wildlife Area signs.",
      "camping": "Treat this as a day trip. Wisconsin DNR lists no campground at Turtle Creek Wildlife Area; do not assume marsh banks, wildlife-area edges, or private land are legal overnight stops.",
      "campingClassification": "none",
      "summary": "Launch at School Section Road and take out at East Creek Road for the upper Turtle Creek Wildlife Area segment immediately upstream of the existing East-Creek-to-Highway-140 card. Use the direct Carvers Rock Road gauge and favor lower clear-water days without forcing blocked weed channels.",
      "accessCaveats": [
        "School Section Road is a bridge access with shoulder parking and a trail rather than a developed concrete ramp.",
        "East Creek Road has a canoe launch area west of the bridge, but the source warns the shoreline can be deep and muddy and requires about a 280-foot drag to parking.",
        "DNR notes some Turtle Creek Wildlife Area portions are reachable only by water or across private land; keep stops to public access and clearly legal areas."
      ],
      "watchFor": [
        "Late-season weed growth that narrows the channel, especially when the gauge is below the preferred band.",
        "Wind across open marsh, cold spring water, and fresh strainers after storms despite the clean route report.",
        "Wild rice corridors, beaver activity, anglers, shoulder parking, and the muddy East Creek carry-out."
      ]
    },
    "accessPoints": [
      {
        "id": "school-section-road-turtle-creek",
        "name": "School Section Road bridge access",
        "latitude": 42.6829232,
        "longitude": -88.6877302,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; WRT describes good bridge access with a trail and shoulder parking."
      },
      {
        "id": "highway-14-turtle-creek-bridge",
        "name": "Highway 14 bridge access",
        "latitude": 42.6515,
        "longitude": -88.7169,
        "mileFromStart": 2.2,
        "segmentKind": "creek",
        "note": "Intermediate bridge-area access in the WRT subreach notes."
      },
      {
        "id": "highway-c-turtle-creek-bridge",
        "name": "County Highway C bridge access",
        "latitude": 42.6271,
        "longitude": -88.7463,
        "mileFromStart": 4.6,
        "segmentKind": "creek",
        "note": "Intermediate access; WRT notes many paddlers were parked at Highway C."
      },
      {
        "id": "east-creek-road-public-pull-off",
        "name": "East Creek Road canoe launch area",
        "latitude": 42.6113321,
        "longitude": -88.7804249,
        "mileFromStart": 6.9,
        "segmentKind": "creek",
        "note": "Default take-out and shared endpoint with the downstream Turtle Creek card."
      }
    ]
  },
  "turtle-creek-town-of-turtle-milwaukee-road": {
    "putIn": {
      "name": "Town of Turtle Canoe Launch",
      "latitude": 42.5507585,
      "longitude": -88.9925722
    },
    "takeOut": {
      "name": "Turtle Creek Greenway Trail / Milwaukee Road",
      "latitude": 42.5129469,
      "longitude": -89.0094751
    },
    "logistics": {
      "distanceLabel": "4.9 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 3 hr 15 min depending on riffles and take-out scouting",
      "shuttle": "Run a short Beloit-area shuttle between the Turtle Creek Greenway / Milwaukee Road parking area and the Town of Turtle Canoe Launch. Scout the take-out trail from land before launching so you do not miss it from the creek.",
      "permits": "No route-specific paddling permit was confirmed. Use public launch/greenway parking, follow posted Beloit and Town of Turtle rules, and obey Wisconsin boating/PFD requirements.",
      "camping": "Treat this as a day trip. No legal on-route camping was confirmed for this urban-greenway reach, and banks along the corridor should be treated as private or day-use only unless clearly posted otherwise.",
      "campingClassification": "none",
      "summary": "Launch from the Town of Turtle Canoe Launch and take out at the Turtle Creek Greenway Trail above Milwaukee Road for the lower Beloit segment. The route is easy at normal water, but the greenway exit is hidden and high water makes strainers less forgiving.",
      "accessCaveats": [
        "The Town of Turtle launch is public and has parking, but it is still a small access rather than a large outfitter landing.",
        "The Turtle Creek Greenway take-out is hidden from the water, uses a dirt path and gravel/shallow exit, then requires roughly a 350-foot drag across grass to parking.",
        "Milwaukee Road/Hwy 81 is the planned stop. Do not continue toward the Rock River confluence or Illinois access points unless that downstream route and shuttle are intentional."
      ],
      "watchFor": [
        "Bumpy riffles and scraping at 80 cfs or lower on the Carvers Rock Road gauge.",
        "Strainers, blind bends, and stronger current above 200 cfs; WRT reserves 301-400 cfs for experienced paddlers and 401+ as maybe too high.",
        "Urban runoff after storms, private-feeling banks, anglers, and the hidden take-out path."
      ]
    },
    "accessPoints": [
      {
        "id": "town-of-turtle-canoe-launch",
        "name": "Town of Turtle Canoe Launch",
        "latitude": 42.5507585,
        "longitude": -88.9925722,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in with WRT map/street-view coordinate support."
      },
      {
        "id": "turtle-creek-greenway-milwaukee-road",
        "name": "Turtle Creek Greenway Trail / Milwaukee Road",
        "latitude": 42.5129469,
        "longitude": -89.0094751,
        "mileFromStart": 4.9,
        "segmentKind": "creek",
        "note": "Default take-out with WRT map/street-view coordinate support; scout the hidden trail before launching."
      }
    ]
  },
  "west-branch-white-river-cottonville-s-white-river": {
    "putIn": {
      "name": "Cottonville Avenue DNR parking lot",
      "latitude": 44.0521929,
      "longitude": -89.3184764
    },
    "takeOut": {
      "name": "South White River Road DNR pull-off",
      "latitude": 44.043544,
      "longitude": -89.278796
    },
    "logistics": {
      "distanceLabel": "4.8 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr depending on wood, portages, and clarity stops",
      "shuttle": "Stage the take-out at the South White River Road DNR pull-off, then drive or bike back to Cottonville Avenue. The source reports a short 2.4-mile bike shuttle with little ascent.",
      "permits": "No route-specific paddling permit is known. Use the DNR parking/pull-off areas, follow Wisconsin boating and PFD rules, and obey posted fishery-area or road-access signs.",
      "camping": "Treat this as a day trip. No legal on-route campsite was confirmed on the West Branch or lower White River corridor during this run.",
      "campingClassification": "none",
      "summary": "Launch from the Cottonville Avenue DNR lot and take out at the South White River Road DNR pull-off for the cleaner West Branch White River option. Use the Chaffee Creek proxy cautiously and be ready for small-stream wood and low-bridge portages.",
      "accessCaveats": [
        "Cottonville Avenue is a small DNR parking lot and hand-carry launch, not a developed boat ramp.",
        "South White River Road has a DNR pull-off and roughly 150-foot trail to the water; the shoreline can be deep enough for a dock-style dismount.",
        "Cottonville Lane bridge is an alternate take-out just upstream, but WRT recommends the South White River Road fishing access for better parking."
      ],
      "watchFor": [
        "Three downed-tree duck/portage spots from the source report, plus any fresh storm wood.",
        "Class I+ riffles under Highway 22 and a low trail bridge that needs an easy portage.",
        "Proxy-gauge mismatch, cold spring-fed water, private banks, and the impounded reach below the take-out."
      ]
    },
    "accessPoints": [
      {
        "id": "cottonville-avenue-dnr-lot",
        "name": "Cottonville Avenue DNR parking lot",
        "latitude": 44.0521929,
        "longitude": -89.3184764,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; WRT describes easy hand-carry access from the small DNR lot."
      },
      {
        "id": "highway-22-west-branch-white-river",
        "name": "Highway 22 bridge / riffle corridor",
        "latitude": 44.0478,
        "longitude": -89.2969,
        "mileFromStart": 3,
        "segmentKind": "creek",
        "note": "Intermediate landmark near the route report Class I+ riffle and possible rough alternate access."
      },
      {
        "id": "south-white-river-road-dnr-pull-off",
        "name": "South White River Road DNR pull-off",
        "latitude": 44.043544,
        "longitude": -89.278796,
        "mileFromStart": 4.8,
        "segmentKind": "creek",
        "note": "Default take-out; WRT describes a DNR pull-off and short trail to the water."
      }
    ]
  },
  "pecatonica-river-mineral-point-ludden-north-oak": {
    "putIn": {
      "name": "Ludden Lake Boat Ramp",
      "latitude": 42.8417955,
      "longitude": -90.2354632
    },
    "takeOut": {
      "name": "North Oak Park Road bridge / VPA-area take-out",
      "latitude": 42.8788777,
      "longitude": -90.2017053
    },
    "logistics": {
      "distanceLabel": "4.8 mi",
      "estimatedPaddleTime": "About 2 hr 30 min, longer with scouting, low water, or portages",
      "shuttle": "Stage North Oak Park Road first and scout the fence/signage before launching from Ludden Lake. The bike shuttle is hilly and awkward; a two-car shuttle is cleaner.",
      "permits": "No route-specific paddling permit is known. Use the Ludden Lake public boat landing, obey Wisconsin boating and PFD rules, and only use North Oak Park Road/VPA access where current signs make public travel lawful.",
      "camping": "Treat this as a short day trip. No legal on-route campsite was confirmed, and private pasture banks should not be used for camping or casual stops.",
      "campingClassification": "none",
      "summary": "Launch at the Ludden Lake public boat ramp, portage Ludden Lake dam, and take out at North Oak Park Road for a short scenic Mineral Point Branch run. The Darlington gauge is a downstream proxy, so same-day visual and access checks are mandatory.",
      "accessCaveats": [
        "Ludden Lake has a DNR-listed public boat landing, but the route immediately requires a dam portage below the lake.",
        "North Oak Park Road is not a polished launch. WRT used it with fence and DNR voluntary-access context; verify current signs and do not cross private land beyond the lawful access corridor.",
        "If the take-out looks questionable, S. Oak Park Road is a possible downstream bridge option, but that is a separate extension and should be scouted before launch."
      ],
      "watchFor": [
        "Mandatory Ludden Lake dam portage and a late low bridge that acts like a small dam.",
        "Low-water scraping below the 351 cfs Darlington proxy target, fast pushy current above the high bands, and rapid local changes after rain.",
        "One logjam portage from the route report, fences, cattle, eroding banks, private banks, and cold spring-fed tributary water."
      ]
    },
    "accessPoints": [
      {
        "id": "ludden-lake-boat-ramp",
        "name": "Ludden Lake Boat Ramp",
        "latitude": 42.8417955,
        "longitude": -90.2354632,
        "mileFromStart": 0,
        "segmentKind": "lake",
        "note": "Default put-in; Wisconsin DNR lists a public boat landing on Ludden Lake."
      },
      {
        "id": "ludden-lake-dam-portage",
        "name": "Ludden Lake dam portage",
        "latitude": 42.8486,
        "longitude": -90.2296,
        "mileFromStart": 0.5,
        "segmentKind": "transition",
        "note": "Mandatory portage around the dam before the faster river section."
      },
      {
        "id": "highway-39-mineral-point-branch",
        "name": "Highway 39 bridge",
        "latitude": 42.8534,
        "longitude": -90.2242,
        "mileFromStart": 1.2,
        "segmentKind": "creek",
        "note": "Intermediate bridge after the initial Class I riffles below Ludden Dam."
      },
      {
        "id": "north-oak-park-road-mineral-point-branch",
        "name": "North Oak Park Road bridge / VPA-area take-out",
        "latitude": 42.8788777,
        "longitude": -90.2017053,
        "mileFromStart": 4.8,
        "segmentKind": "creek",
        "note": "Default take-out; rough fence/VPA/DOT access context requires same-day scouting."
      }
    ]
  },
  "plover-river-hwy-k-jordan-park": {
    "putIn": {
      "id": "county-highway-k-plover-access",
      "name": "County Highway K bridge launch",
      "latitude": 44.6226,
      "longitude": -89.4822
    },
    "takeOut": {
      "id": "jordan-park-canoe-launch",
      "name": "Jordan Park canoe launch / Jordan Pond",
      "latitude": 44.57416,
      "longitude": -89.50188
    },
    "logistics": {
      "distanceLabel": "About 5.3 mi",
      "estimatedPaddleTime": "About 2.5 hr to 3.5 hr, longer with low water or scouting",
      "shuttle": "Stage Jordan Park first, then drive back to the County Highway K bridge. Inspect the Hwy K shoulder before unloading because WRT notes poor parking despite a useful launch trail.",
      "permits": "No route-specific paddling permit is known. Use the public bridge / park accesses, follow Wisconsin boating and PFD rules, and obey Portage County park and campground rules.",
      "camping": "Jordan Park has a campground and facilities at the take-out, making this a possible base-camp day route. No on-route riverbank camping is assumed between Hwy K and Jordan Park.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from the Hwy K bridge area and finish at Jordan Park after the Sharonwood / boulder-garden corridor and Jordan Pond. The Kelly proxy was below the selected low-water floor during this run, so expect scraping until flows improve.",
      "accessCaveats": [
        "Hwy K has a launch trail but poor shoulder parking; avoid blocking the road or private drives.",
        "Sharonwood Lane is an intermediate access option, but the normal plan continues to Jordan Park.",
        "Jordan Park is the planned exit. Do not continue into the downstream dam/tube section without a separate portage and route plan."
      ],
      "watchFor": [
        "Boulder gardens, the former-dam / Sharonwood area, and low branches that may require scouting or a short carry.",
        "New strainers after storms, cold water in shoulder seasons, and fast push when the proxy is above the recommended window.",
        "Shallow scraping below about 130 cfs on the Kelly proxy and private banks between public accesses."
      ]
    },
    "accessPoints": [
      {
        "id": "county-highway-k-plover-access",
        "name": "County Highway K bridge launch",
        "latitude": 44.6226,
        "longitude": -89.4822,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; WRT describes a nice launch area by Hwy K but warns parking is poor."
      },
      {
        "id": "sharonwood-lane-plover-access",
        "name": "Sharonwood Lane access option",
        "latitude": 44.5947,
        "longitude": -89.4942,
        "mileFromStart": 4.7,
        "segmentKind": "creek",
        "note": "Optional access just above the final boulder-garden / Jordan Pond approach."
      },
      {
        "id": "jordan-park-canoe-launch",
        "name": "Jordan Park canoe launch / Jordan Pond",
        "latitude": 44.57416,
        "longitude": -89.50188,
        "mileFromStart": 5.3,
        "segmentKind": "lake",
        "note": "Default take-out at the north end of Jordan Park / Jordan Pond."
      }
    ]
  },
  "big-rib-river-lemke-highway-64": {
    "putIn": {
      "id": "lemke-drive-big-rib-ford",
      "name": "Lemke Drive Big Rib ford/access",
      "latitude": 45.1866,
      "longitude": -90.1273
    },
    "takeOut": {
      "id": "highway-64-big-rib-access",
      "name": "Highway 64 Big Rib access",
      "latitude": 45.1493,
      "longitude": -90.0591
    },
    "logistics": {
      "distanceLabel": "5.0 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr",
      "shuttle": "Scout the Highway 64 take-out first, then stage at Lemke Drive. WRT describes the bike shuttle as short but mostly unpaved and hilly, so a car shuttle is cleaner.",
      "permits": "No route-specific paddling permit is known. Use only the Lemke Drive road/ford corridor and legal Highway 64 parking; do not enter posted private woods near the launch.",
      "camping": "No on-route camping is documented for this upper Big Rib reach. Treat it as a day route with separate nearby lodging or campgrounds if needed.",
      "campingClassification": "none",
      "summary": "Launch at Lemke Drive and take out at Highway 64 for the upper Big Rib segment immediately above the existing Rib Dells card. The direct Rib Falls gauge is currently below the practical target band.",
      "accessCaveats": [
        "Lemke Drive is a ford/road-style access, not a developed landing. WRT says the road itself makes a workable launch but nearby forests are posted no trespassing.",
        "Highway 64 requires dragging the boat about 150 feet over a grassy embankment to the vehicle.",
        "This route ends at Highway 64; the downstream Highway-64-to-Greiner Rib Dells card is a separate whitewater route."
      ],
      "watchFor": [
        "Low trees, blocked island channels, light rapids, and possible Class II current.",
        "Logjams or snags that become harder to avoid in the high bands.",
        "Cold water, private banks, low-water bumping, and fast rises after rain."
      ]
    },
    "accessPoints": [
      {
        "id": "lemke-drive-big-rib-ford",
        "name": "Lemke Drive Big Rib ford/access",
        "latitude": 45.1866,
        "longitude": -90.1273,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at WRT-documented road/ford access."
      },
      {
        "id": "highway-64-big-rib-access",
        "name": "Highway 64 Big Rib access",
        "latitude": 45.1493,
        "longitude": -90.0591,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Default take-out at Highway 64, shared as the downstream Rib Dells put-in."
      }
    ]
  },
  "big-rib-river-highway-64-greiner": {
    "putIn": {
      "id": "highway-64-big-rib-access",
      "name": "Highway 64 Big Rib access",
      "latitude": 45.1493,
      "longitude": -90.0591
    },
    "takeOut": {
      "id": "greiner-road-big-rib-access",
      "name": "Greiner Road / Silver Fox Road take-out",
      "latitude": 45.1329,
      "longitude": -90.0262
    },
    "logistics": {
      "distanceLabel": "About 2.5 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, plus scouting and shuttle time",
      "shuttle": "Scout the Greiner Road / Silver Fox Road take-out and road condition first, then launch from Highway 64. This is short mileage but not a casual no-scout float.",
      "permits": "No route-specific paddling permit is known. Use the AW-listed access points only where parking is legal, follow Wisconsin boating/PFD rules, and respect any posted local road or landowner restrictions.",
      "camping": "Treat Rib Dells as a day-only whitewater run. No legal on-route campsite is documented, and the remote access roads are not a camping plan.",
      "campingClassification": "none",
      "summary": "Run the Big Rib Rib Dells from Highway 64 to the Greiner / Silver Fox take-out when the AW-selected Prairie River proxy is in range. The current reading was below the AW floor, so this card ships with a low-water warning.",
      "accessCaveats": [
        "The take-out road can be rough after rain or thaw; verify it before launching.",
        "AW access points are the basis for the route. Keep parking tight and avoid private or logging-road conflicts.",
        "The Prairie River gauge is a proxy, so visually confirm actual Big Rib water before putting on."
      ],
      "watchFor": [
        "Class II dells, boulder constrictions, cold-water swims, and limited exits.",
        "Fresh wood and strainers after rain, especially in blind bends and constricted dells.",
        "Scraping below 300 cfs on the Prairie proxy and pushy/high-consequence current above 1,000 cfs."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-64-big-rib-access",
        "name": "Highway 64 Big Rib access",
        "latitude": 45.1493,
        "longitude": -90.0591,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "AW-listed put-in for the Rib Dells reach."
      },
      {
        "id": "greiner-road-big-rib-access",
        "name": "Greiner Road / Silver Fox Road take-out",
        "latitude": 45.1329,
        "longitude": -90.0262,
        "mileFromStart": 2.5,
        "segmentKind": "creek",
        "note": "AW-listed take-out; verify road condition and legal parking before launch."
      }
    ]
  },
  "big-rib-river-amco-park-highway-a": {
    "putIn": {
      "id": "amco-park-big-rib-access",
      "name": "Amco Park Big Rib River access",
      "latitude": 45.0832,
      "longitude": -90.0068
    },
    "takeOut": {
      "id": "county-highway-a-big-rib-access",
      "name": "County Highway A Big Rib bridge access",
      "latitude": 45.04691,
      "longitude": -89.95474
    },
    "logistics": {
      "distanceLabel": "4.3 mi",
      "estimatedPaddleTime": "About 2 hr to 2.5 hr",
      "shuttle": "Stage County Highway A first because parking is limited near the bridge, then return to Amco Park. The road shuttle is short by car but not especially pleasant by bike.",
      "permits": "No route-specific paddling permit is known. Follow Marathon County park rules at Amco Park, use legal parking at Highway A, and avoid private-bank stops.",
      "camping": "Treat this as a day trip. Amco Park has picnic and restroom facilities but no on-route river camping is documented for this segment.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch from Marathon County Amco Park and take out at County Highway A for an easier Big Rib segment below the Rib Dells. The direct Rib Falls gauge is currently below the selected low-water floor.",
      "accessCaveats": [
        "Amco Park is a public Marathon County park with Big Rib River access, fishing access, picnic facilities, potable water, and vault toilets.",
        "Highway A is a bridge-area take-out with a faded path and limited shoulder or snowmobile-drive parking. Confirm the pull-off before launching.",
        "Do not turn this into an unplanned continuation toward Rib Falls; the downstream route requires a mandatory take-out above the falls."
      ],
      "watchFor": [
        "Low branches and strainers in brisk Class I current.",
        "Bumpy riffles below the selected low-water floor.",
        "High or rising water that makes bridge access, snags, and private-bank exposure harder to manage."
      ]
    },
    "accessPoints": [
      {
        "id": "amco-park-big-rib-access",
        "name": "Amco Park Big Rib River access",
        "latitude": 45.0832,
        "longitude": -90.0068,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at Marathon County Amco Park."
      },
      {
        "id": "county-highway-a-big-rib-access",
        "name": "County Highway A Big Rib bridge access",
        "latitude": 45.04691,
        "longitude": -89.95474,
        "mileFromStart": 4.3,
        "segmentKind": "creek",
        "note": "Default take-out at the WRT-described Highway A bridge path."
      }
    ]
  },
  "big-rib-river-highway-a-rib-falls": {
    "putIn": {
      "id": "county-highway-a-big-rib-access",
      "name": "County Highway A Big Rib bridge access",
      "latitude": 45.04691,
      "longitude": -89.95474
    },
    "takeOut": {
      "id": "rib-falls-county-park-takeout",
      "name": "Rib Falls County Park take-out above Big Rib Falls",
      "latitude": 44.97398,
      "longitude": -89.90792
    },
    "logistics": {
      "distanceLabel": "7.25 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr, plus take-out scouting",
      "shuttle": "Scout the Rib Falls County Park take-out before launching, then stage Highway A. The route must end above Big Rib Falls, and high water can make the last approach less forgiving.",
      "permits": "No route-specific paddling permit is known. Use the Highway A bridge access only where parking is legal, follow Marathon County park rules at Rib Falls, and respect private banks.",
      "camping": "No on-route river camping is assumed. Rib Falls Park is a developed county park for day use; confirm any separate nearby camping before relying on it.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at County Highway A and take out at Rib Falls County Park above Big Rib Falls. This is a scenic riffle-and-outcrop connector, not a falls-running recommendation.",
      "accessCaveats": [
        "Miles Paddled gives GPS points for both endpoints and describes the Highway A launch as a small trail from the road.",
        "The take-out above the falls may be steep or awkward; identify the gradual option and do not drift toward the brink tired or distracted.",
        "Rib Falls County Park is a Marathon County park with trails, picnic amenities, and vault restrooms, but fishing is prohibited and posted rules should be checked."
      ],
      "watchFor": [
        "Mandatory take-out above Class IV Big Rib Falls.",
        "Island braids, shallow riffles, boulders, and occasional downed trees.",
        "Fast rises after rain, cold water, limited public exits, and private banks."
      ]
    },
    "accessPoints": [
      {
        "id": "county-highway-a-big-rib-access",
        "name": "County Highway A Big Rib bridge access",
        "latitude": 45.04691,
        "longitude": -89.95474,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from Miles Paddled GPS reporting."
      },
      {
        "id": "rib-falls-county-park-takeout",
        "name": "Rib Falls County Park take-out above Big Rib Falls",
        "latitude": 44.97398,
        "longitude": -89.90792,
        "mileFromStart": 7.25,
        "segmentKind": "creek",
        "note": "Default take-out above Big Rib Falls; do not continue over the falls as part of this route."
      }
    ]
  },
  "cedar-creek-cedarburg-mill-cth-t": {
    "putIn": {
      "id": "cedarburg-mill-cedar-creek-put-in",
      "name": "Cedarburg Mill / Rebellion Brewing access",
      "latitude": 43.2993,
      "longitude": -87.9845
    },
    "takeOut": {
      "id": "county-highway-t-lakefield-road-takeout",
      "name": "County Highway T / Lakefield Road bridge",
      "latitude": 43.294199,
      "longitude": -87.970663
    },
    "logistics": {
      "distanceLabel": "About 2.3 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, longer with dam portages, low water, or scouting",
      "shuttle": "Stage the Lakefield Road / CTH T take-out, then return to downtown Cedarburg. The shuttle is short, but scout the dam portages, Estate Bridge, and right-channel island before committing.",
      "permits": "No route-specific paddling permit is known. Use legal street parking, follow Wisconsin boating and PFD rules, and keep dam portages short and leave-no-trace where Wisconsin portage law crosses private banks.",
      "camping": "Day route only. No on-route public campsite is documented in the downtown Cedarburg corridor, and private banks are not part of the route plan.",
      "campingClassification": "none",
      "summary": "Launch by Cedarburg Mill / Rebellion Brewing and run the short AW Cedar Creek reach to CTH T, portaging Columbia Mills Dam and Nail Factory Dam. The direct Cedar Creek gauge was below AW runnable guidance during this run.",
      "accessCaveats": [
        "Launch is a careful rockwork / creekside access by the Cedarburg Mill area; it is not a developed boat ramp.",
        "Columbia Mills Dam and Nail Factory Dam require mandatory portages with private-bank constraints. Keep carries legal, brief, and respectful.",
        "Creek View Court / Hoffmann Glen can be used as an alternate access to skip the first dam portage and city-park ledges."
      ],
      "watchFor": [
        "Mandatory dam portages, shallow ledges, vertical-walled dells, and steep relaunch footing.",
        "AW 2025-2026 wood alerts near Estate Bridge, the right channel around the island, and downstream blind bends.",
        "Private banks, bridge hazards, cold water, rapidly rising storm flow, and very bony conditions below 100 cfs."
      ]
    },
    "accessPoints": [
      {
        "id": "cedarburg-mill-cedar-creek-put-in",
        "name": "Cedarburg Mill / Rebellion Brewing access",
        "latitude": 43.2993,
        "longitude": -87.9845,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "AW-listed put-in near the historic Cedarburg Mill / Rebellion Brewing patio."
      },
      {
        "id": "highland-drive-columbia-mills-dam-portage",
        "name": "Highland Drive / Columbia Mills Dam portage",
        "latitude": 43.2982,
        "longitude": -87.9762,
        "mileFromStart": 0.68,
        "segmentKind": "transition",
        "note": "Mandatory dam portage with AW-described private-bank constraints; scout before launch."
      },
      {
        "id": "creek-view-court-cedar-creek-access",
        "name": "Creek View Court / Hoffmann Glen alternate access",
        "latitude": 43.2999,
        "longitude": -87.9739,
        "mileFromStart": 0.69,
        "segmentKind": "creek",
        "note": "AW-listed alternate access that skips the first dam portage and city-park ledges."
      },
      {
        "id": "nail-factory-dam-portage",
        "name": "Nail Factory Dam portage",
        "latitude": 43.2972,
        "longitude": -87.9731,
        "mileFromStart": 0.99,
        "segmentKind": "transition",
        "note": "Mandatory portage around the roughly 18.5-foot dam; relaunch footing is steep and flow-dependent."
      },
      {
        "id": "county-highway-t-lakefield-road-takeout",
        "name": "County Highway T / Lakefield Road bridge",
        "latitude": 43.294199,
        "longitude": -87.970663,
        "mileFromStart": 2.3,
        "segmentKind": "creek",
        "note": "Default AW-listed take-out near 4900 Lakefield Road; street parking just west of the bridge."
      }
    ]
  },
  "bad-axe-north-fork-duck-egg-hwy-o": {
    "putIn": {
      "id": "duck-egg-park-bad-axe-north-fork-put-in",
      "name": "Duck Egg Park / Irish Ridge Road",
      "latitude": 43.588,
      "longitude": -91
    },
    "takeOut": {
      "id": "highway-o-bad-axe-north-fork-takeout",
      "name": "Highway O bridge",
      "latitude": 43.572,
      "longitude": -91.051
    },
    "logistics": {
      "distanceLabel": "About 3.7 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, longer if fences, wood, or shallow water slow travel",
      "shuttle": "Stage the Highway O bridge take-out first, then use Irish Ridge Road to reach Duck Egg Park. WRT describes a short 2.8-mile bike shuttle, but both endpoints should be checked for legal parking and current shoulder conditions.",
      "permits": "No route-specific paddling permit is known. Launch from county-owned Duck Egg Park and use only legal bridge/roadside parking at Highway O. Respect private banks except where Wisconsin portage law or emergency need applies.",
      "camping": "Day route only. No on-route public campsite is documented on this short North Fork segment; use nearby public or private campgrounds as a separate basecamp plan.",
      "campingClassification": "none",
      "summary": "Run the WRT Bad Axe North Fork leg from Duck Egg Park / Irish Ridge Road to Highway O. The route has fast Class I current, several fences, and a Kickapoo-at-Ontario proxy gauge rather than a direct Bad Axe gauge.",
      "accessCaveats": [
        "Duck Egg Park is the uniquely named public put-in, but the coordinates in this data set are approximate for the Irish Ridge Road park access.",
        "Highway O is a weedy bridge take-out; WRT favors the northwest corner under the bridge.",
        "Do not count on private farm banks for breaks, scouting, or bailout except for legal portage or emergency needs."
      ],
      "watchFor": [
        "Four to five fences, shallow ledges, and fast riffles that become pushier above the normal target window.",
        "Fresh storm wood, blind bends, cold spring water, and limited rescue access in the narrow Driftless valley.",
        "Proxy-gauge mismatch: the Kickapoo at Ontario is useful, but visual checks at Duck Egg still matter."
      ]
    },
    "accessPoints": [
      {
        "id": "duck-egg-park-bad-axe-north-fork-put-in",
        "name": "Duck Egg Park / Irish Ridge Road",
        "latitude": 43.588,
        "longitude": -91,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "WRT-listed public launch at county-owned Duck Egg Park; approximate named-site coordinates."
      },
      {
        "id": "springville-branch-confluence-bad-axe",
        "name": "Springville Branch confluence",
        "latitude": 43.584,
        "longitude": -91.012,
        "mileFromStart": 0.2,
        "segmentKind": "creek",
        "note": "Early confluence marker before the larger North Fork channel works toward Highway O."
      },
      {
        "id": "highway-o-bad-axe-north-fork-takeout",
        "name": "Highway O bridge",
        "latitude": 43.572,
        "longitude": -91.051,
        "mileFromStart": 3.7,
        "segmentKind": "creek",
        "note": "WRT-listed take-out; expect a weedy carry and confirm bridge/roadside parking."
      }
    ]
  },
  "new-wood-river-county-e-tesch": {
    "putIn": {
      "id": "county-e-new-wood-put-in",
      "name": "County Highway E bridge",
      "latitude": 45.25777,
      "longitude": -89.84434
    },
    "takeOut": {
      "id": "tesch-road-new-wood-takeout",
      "name": "Tesch Road bridge",
      "latitude": 45.24182,
      "longitude": -89.81235
    },
    "logistics": {
      "distanceLabel": "About 4.7 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, depending on level, scouting, and bridge carries",
      "shuttle": "Stage Tesch Road, then return to the County Highway E bridge. This is a short road shuttle, but both endpoints are bridge accesses rather than developed landings, so verify parking and footing before unloading.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating and PFD rules, use legal road shoulders only, and keep all bridge access low-impact.",
      "camping": "Day route only. No on-route public campsite is documented. Miles Paddled notes Council Grounds State Park as a nearby basecamp option for the Merrill area, but it is not part of the river route.",
      "campingClassification": "none",
      "summary": "Run the AW New Wood River route from County Highway E to Tesch Road. The Prairie River near Merrill gauge is only a proxy, and the app uses the documented 202 cfs trip level as a minimum floor.",
      "accessCaveats": [
        "County Highway E access requires a carry from the road/bridge area; AW describes the practical put-in by road geometry rather than a formal ramp.",
        "Tesch Road is a bridge take-out with footing and parking that should be checked before launch.",
        "Do not extend upstream or downstream without a separate plan; nearby quietwater and companion creeks use different access assumptions."
      ],
      "watchFor": [
        "Continuous Class I-II rock gardens, waves, and bony lines near the 202 cfs floor.",
        "Ropes, fences, or new wood across the channel after storms or land-use changes.",
        "Fast rises, cold water, private banks, and limited rescue options on a small north-central Wisconsin creek."
      ]
    },
    "accessPoints": [
      {
        "id": "county-e-new-wood-put-in",
        "name": "County Highway E bridge",
        "latitude": 45.25777,
        "longitude": -89.84434,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Miles Paddled GPS point for the put-in; AW describes carrying in from the CTH E bridge area."
      },
      {
        "id": "tesch-road-new-wood-takeout",
        "name": "Tesch Road bridge",
        "latitude": 45.24182,
        "longitude": -89.81235,
        "mileFromStart": 4.7,
        "segmentKind": "creek",
        "note": "Miles Paddled GPS point and AW-listed take-out; scout shoulder parking and bank footing."
      }
    ]
  },
  "crystal-river-rural-shadow-lake": {
    "putIn": {
      "id": "main-street-rural-crystal-put-in",
      "name": "Main Street / Rural put-in",
      "latitude": 44.31259,
      "longitude": -89.15951
    },
    "takeOut": {
      "id": "shadow-lake-road-crystal-takeout",
      "name": "Shadow Lake Road take-out",
      "latitude": 44.31967,
      "longitude": -89.0978
    },
    "logistics": {
      "distanceLabel": "About 4.75 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with low water, crowding, or photo stops",
      "shuttle": "Stage Shadow Lake Road near Little Hope, then return to Rural / Main Street. This corridor can be busy in summer, so confirm parking and rental/tubing traffic before committing.",
      "permits": "No route-specific paddling permit is known. Use legal public access points, follow Wisconsin boating and PFD rules, and respect private riverfront property.",
      "camping": "Day route only. No on-route public campsite is documented for the Rural-to-Shadow-Lake reach; use Waupaca-area campgrounds or lodging as a separate basecamp plan.",
      "campingClassification": "none",
      "summary": "Run the clear Crystal River day route from Rural to Shadow Lake Road. The old Waupaca/Crystal gauge is discontinued, so the AW Tomorrow River proxy is used only as a drought-check floor.",
      "accessCaveats": [
        "Rural / Main Street is a village access rather than a large ramp; arrive early in busy summer periods.",
        "Shadow Lake Road take-out parking and landing conditions should be confirmed before launch.",
        "Do not assume private millpond or shorefront land is available for breaks or bailouts."
      ],
      "watchFor": [
        "Boulder gardens, shallow riffles, tight channels, and post-storm deadfall.",
        "Rental, tubing, and beginner traffic near the Waupaca Chain O Lakes / Rural corridor.",
        "Proxy-gauge limitations, cold clear water, private banks, and lake/motorboat exposure if you miss the planned take-out."
      ]
    },
    "accessPoints": [
      {
        "id": "main-street-rural-crystal-put-in",
        "name": "Main Street / Rural put-in",
        "latitude": 44.31259,
        "longitude": -89.15951,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Miles Paddled GPS point for the Rural put-in near the covered-bridge / mill corridor."
      },
      {
        "id": "shadow-lake-road-crystal-takeout",
        "name": "Shadow Lake Road take-out",
        "latitude": 44.31967,
        "longitude": -89.0978,
        "mileFromStart": 4.75,
        "segmentKind": "creek",
        "note": "Miles Paddled GPS point for the Little Hope / Shadow Lake Road take-out."
      }
    ]
  },
  "tyler-forks-hwy-77-vogues-road": {
    "putIn": {
      "id": "highway-77-tyler-forks",
      "name": "Highway 77 / USGS sampling site access",
      "latitude": 46.34722,
      "longitude": -90.49445
    },
    "takeOut": {
      "id": "vogues-road-tyler-forks",
      "name": "Vogues Road take-out",
      "latitude": 46.4134,
      "longitude": -90.5168
    },
    "logistics": {
      "distanceLabel": "About 7.2 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with Wren Falls scouting or portage",
      "shuttle": "Stage Vogues Road first, then return to the Highway 77 bridge / USGS sampling-site access. Both endpoints are whitewater bridge accesses rather than developed landings, so verify shoulder parking, gravel-road condition, and footing before unloading.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating and PFD rules, keep bridge access low-impact, and obey any posted road, forest, or local restrictions.",
      "camping": "No on-route public watercraft campsite is documented. Nearby Copper Falls State Park can work as a basecamp, but treat this whitewater run itself as a day route.",
      "campingClassification": "nearby_basecamp",
      "summary": "Use Highway 77 as the practical Tyler Forks put-in for the lower AW run and take out at Vogues Road after Wren Falls. The direct Stricker Road USGS gauge has AW-specific runnable bands, but the route is advanced whitewater with remote rescue exposure.",
      "accessCaveats": [
        "Highway 77 is the AW alternate put-in that skips the upper Dells approach; do not assume the Moore Road upper mile is included in this card.",
        "Wren Falls is a mandatory scout decision and should be portaged when wood, level, line, or group skill is wrong.",
        "Vogues Road is the planned exit. Do not continue downstream without a separate plan and current access information."
      ],
      "watchFor": [
        "Boulderbed Class II-III rapids, shallow pin rocks, alder strainers, and cold water.",
        "Wren Falls, a Class IV drop with changing wood and consequential swims.",
        "Fast rain-driven rises, remote road access, limited cell service, and long rescue response times."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-77-tyler-forks",
        "name": "Highway 77 / USGS sampling site access",
        "latitude": 46.34722,
        "longitude": -90.49445,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "AW-listed alternate put-in below the upper Dells approach and near the direct USGS sampling site."
      },
      {
        "id": "wren-falls-tyler-forks",
        "name": "Wren Falls scout / portage decision",
        "latitude": 46.3979,
        "longitude": -90.5058,
        "mileFromStart": 5.7,
        "segmentKind": "creek",
        "note": "Class IV drop near the end of the run; scout for wood and portage when appropriate."
      },
      {
        "id": "vogues-road-tyler-forks",
        "name": "Vogues Road take-out",
        "latitude": 46.4134,
        "longitude": -90.5168,
        "mileFromStart": 7.2,
        "segmentKind": "creek",
        "note": "AW-listed take-out below the Wren Falls runout."
      }
    ]
  },
  "eau-galle-river-50th-avenue-boston-road": {
    "putIn": {
      "id": "50th-avenue-eau-galle-access",
      "name": "50th Avenue bridge access",
      "latitude": 44.93,
      "longitude": -92.262
    },
    "takeOut": {
      "id": "boston-road-eau-galle-access",
      "name": "Boston Road bridge access",
      "latitude": 44.867,
      "longitude": -92.252
    },
    "logistics": {
      "distanceLabel": "About 7.2 to 7.35 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr when water is high enough, longer with scouting or low-water walking",
      "shuttle": "Use a two-car bridge-access shuttle between 50th Avenue and Boston Road. Confirm roadside parking, posted restrictions, and landowner boundaries before unloading because the corridor is mostly private-bank creek country.",
      "permits": "No route-specific paddling permit is known. Use public bridge access and public-road rights-of-way only where legal, and do not trespass on private banks for scouting, breaks, or take-outs.",
      "camping": "No on-route camping was verified. Treat this as a day run and arrange any campground or base-camp plan away from the bridge accesses.",
      "campingClassification": "none",
      "summary": "Launch at the 50th Avenue bridge and take out at Boston Road for American Whitewater's Eau Galle Section A. This is a rare-flow Class I-II creek route with shallow shoals, minor rapids, wood risk, private banks, and a Spring Valley gauge floor that was far above the same-run reading.",
      "accessCaveats": [
        "American Whitewater publishes coordinates for 50th Avenue, County Highway N, and Boston Road, but bridge access still requires same-day checks for legal parking and posted restrictions.",
        "The Spring Valley gauge is downstream on the same small river and is the gauge American Whitewater ties to this exact reach.",
        "Avoid private-bank landings except for emergencies; do not count on intermediate exits being legal or practical."
      ],
      "watchFor": [
        "Low-water scraping and walking below the 200 cfs AW floor.",
        "Fast rises after rain, strainers, small ledges and shoals, and cold-water exposure during spring or shoulder-season runoff.",
        "Private banks and limited rescue access between bridge crossings."
      ]
    },
    "accessPoints": [
      {
        "id": "50th-avenue-eau-galle-access",
        "name": "50th Avenue bridge access",
        "latitude": 44.93,
        "longitude": -92.262,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "American Whitewater put-in coordinate for Eau Galle Section A; confirm legal parking and posted bridge access before unloading."
      },
      {
        "id": "county-highway-n-eau-galle",
        "name": "County Highway N bridge",
        "latitude": 44.904998779296875,
        "longitude": -92.26499938964844,
        "mileFromStart": 1.95,
        "segmentKind": "creek",
        "note": "American Whitewater waypoint and possible scout/reset point inside the upper run."
      },
      {
        "id": "boston-road-eau-galle-access",
        "name": "Boston Road bridge access",
        "latitude": 44.867,
        "longitude": -92.252,
        "mileFromStart": 7.35,
        "segmentKind": "creek",
        "note": "American Whitewater take-out coordinate for the 7.35-mile upper Eau Galle run."
      }
    ]
  },
  "eau-galle-river-foote-avenue-770th-avenue": {
    "putIn": {
      "id": "foote-avenue-eau-galle-access",
      "name": "Foote Avenue bridge access",
      "latitude": 44.855,
      "longitude": -92.238
    },
    "takeOut": {
      "id": "770th-avenue-eau-galle-access",
      "name": "770th Avenue bridge access",
      "latitude": 44.813,
      "longitude": -92.208
    },
    "logistics": {
      "distanceLabel": "About 4.3 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr when water is high enough",
      "shuttle": "Use a short two-car bridge-access shuttle from Foote Avenue below Spring Valley to 770th Avenue. Confirm parking and posted access at both bridges before staging vehicles.",
      "permits": "No route-specific paddling permit is known. Stay within legal public access at road crossings and do not use private banks for routine scouting or stops.",
      "camping": "No on-route camping was verified. Plan this as a day run; any overnight plan should be arranged at a separate legal campground or lodging base.",
      "campingClassification": "none",
      "summary": "Launch at Foote Avenue and take out at 770th Avenue for the shorter American Whitewater / Miles Paddled Eau Galle run below Spring Valley. The reach is scenic but usually low, with dam context upstream, a flagged low bridge near Eau Galle Road and Sabin Avenue, and private banks.",
      "accessCaveats": [
        "American Whitewater places the put-in just below the Spring Valley flood-control dam corridor; do not paddle near dam infrastructure or assume release patterns.",
        "Scout the low ORV/snowmobile bridge near Eau Galle Road and Sabin Avenue when water or debris makes clearance uncertain.",
        "Miles Paddled corroborates the 770th Avenue take-out coordinates, but legal parking and posted conditions still need same-day confirmation."
      ],
      "watchFor": [
        "Low-water walking below the 100 cfs AW floor and quickly changing runoff after rain.",
        "The low ORV/snowmobile bridge, strainers, shallow riffles, and small ledges.",
        "Private banks, limited rescue access, cold water, and flood-control dam context upstream of the put-in."
      ]
    },
    "accessPoints": [
      {
        "id": "foote-avenue-eau-galle-access",
        "name": "Foote Avenue bridge access",
        "latitude": 44.855,
        "longitude": -92.238,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "American Whitewater put-in coordinate just below Spring Valley and the flood-control dam corridor."
      },
      {
        "id": "eau-galle-road-sabin-bridge",
        "name": "Eau Galle Road / Sabin Avenue low bridge",
        "latitude": 44.84199905395508,
        "longitude": -92.23699951171875,
        "mileFromStart": 0.91,
        "segmentKind": "creek",
        "note": "American Whitewater flags a low ORV/snowmobile bridge here; scout before committing when flow or debris is high."
      },
      {
        "id": "770th-avenue-eau-galle-access",
        "name": "770th Avenue bridge access",
        "latitude": 44.813,
        "longitude": -92.208,
        "mileFromStart": 4.3,
        "segmentKind": "creek",
        "note": "American Whitewater take-out for the recommended short route; Miles Paddled independently reports nearly identical GPS coordinates."
      }
    ]
  },
  "mullet-river-sumac-river-park": {
    "putIn": {
      "id": "sumac-road-mullet-river",
      "name": "Sumac Road bridge access",
      "latitude": 43.72148,
      "longitude": -87.88006
    },
    "takeOut": {
      "id": "river-park-sheboygan-falls",
      "name": "River Park canoe ramp",
      "latitude": 43.72924,
      "longitude": -87.81406
    },
    "logistics": {
      "distanceLabel": "About 7.6 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr, longer with logjam portages",
      "shuttle": "Stage the River Park canoe ramp in Sheboygan Falls, then drive or bike back to Sumac Road. WRT lists a 3.6-mile bike shuttle, but both endpoints should be inspected before launch because Sumac Road parking is tight.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating and PFD rules, keep the Sumac Road bridge access low-impact, and obey River Park and road-shoulder parking rules.",
      "camping": "No on-route public campsite is documented. Treat this as a day route through private-bank and city-park corridors.",
      "campingClassification": "none",
      "summary": "Paddle the lower Mullet River from Sumac Road to River Park for a small-stream Sheboygan Falls day with riffles, boulder gardens, a dam portage, and multiple logjam checks. The Sheboygan gauge is only a rough proxy.",
      "accessCaveats": [
        "WRT recommends launching west of the Sumac Road bridge because the east side has a private residence; parking is tight but workable when conditions allow.",
        "River Park is the clean public take-out at the canoe ramp east of the main park and across from downtown businesses.",
        "The Sheboygan gauge is downstream on a larger river. Use it as a conservative signal, then make a visual call at Sumac Road."
      ],
      "watchFor": [
        "The lower-route dam portage. Scout and portage deliberately; do not run the dam.",
        "Several logjams, dead ash, tight duckers, and fast current after the dam.",
        "Low-water scraping below the WRT floor and pushy strainer risk when the proxy gauge is high or rising."
      ]
    },
    "accessPoints": [
      {
        "id": "sumac-road-mullet-river",
        "name": "Sumac Road bridge access",
        "latitude": 43.72148,
        "longitude": -87.88006,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from WRT; launch west of the bridge to avoid the private residence east of the bridge."
      },
      {
        "id": "mullet-river-dam-portage",
        "name": "Lower Mullet River dam portage",
        "latitude": 43.7262,
        "longitude": -87.8314,
        "mileFromStart": 5.8,
        "segmentKind": "transition",
        "note": "Approximate dam-portage zone from the WRT route map and report; scout both banks and expect faster wood below."
      },
      {
        "id": "river-park-sheboygan-falls",
        "name": "River Park canoe ramp",
        "latitude": 43.72924,
        "longitude": -87.81406,
        "mileFromStart": 7.6,
        "segmentKind": "creek",
        "note": "Default take-out at the public parking lot and canoe ramp east of River Park in Sheboygan Falls."
      }
    ]
  },
  "embarrass-south-branch-hwy-45-county-m": {
    "putIn": {
      "id": "highway-45-south-branch-embarrass",
      "name": "Highway 45 bridge access",
      "latitude": 44.74194,
      "longitude": -89.05728
    },
    "takeOut": {
      "id": "county-road-m-south-branch-embarrass",
      "name": "County Road M take-out",
      "latitude": 44.7359,
      "longitude": -89.02716
    },
    "logistics": {
      "distanceLabel": "About 2.5 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, longer with scouting or wood portages",
      "shuttle": "Stage County Road M first, then return to the Highway 45 bridge in Tigerton. Both endpoints are bridge-style whitewater accesses with limited staging, so inspect parking, bank slope, and any bridge work before launch.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating and PFD rules, use legal road shoulders only, and avoid crossing private banks except for necessary legal portage/scout decisions.",
      "camping": "No on-route public campsite is documented. Treat Tigerton Dells as a short day-run and use area lodging or campgrounds separately if needed.",
      "campingClassification": "none",
      "summary": "Run the South Branch Embarrass from Highway 45 to County Road M for the short Tigerton Dells whitewater section. Miles Paddled gives a 130 cfs minimum on the downstream Embarrass gauge, while AW corroborates the dells hazards and wood exposure.",
      "accessCaveats": [
        "Highway 45 access is not a developed canoe landing; plan for rough footing and limited roadside staging.",
        "County Road M is the required take-out for this card. Verify bridge status and parking before committing because local work or washouts can change the exit.",
        "The Embarrass gauge is a downstream mainstem proxy. Use the Miles Paddled floor only after a same-day visual check at the South Branch put-in."
      ],
      "watchFor": [
        "Continuous rocky Class II-III drops, shallow ledges, and few eddies in the dells.",
        "Fresh wood or river-wide blockages, including AW-reported portage-style hazards that can change by season.",
        "High or rising water; Miles Paddled warns the run becomes wild Class IV around 650 cfs on the Embarrass gauge."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-45-south-branch-embarrass",
        "name": "Highway 45 bridge access",
        "latitude": 44.74194,
        "longitude": -89.05728,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Miles Paddled-listed put-in for the Tigerton Dells run."
      },
      {
        "id": "tigerton-dells-south-branch-embarrass",
        "name": "Tigerton Dells scout corridor",
        "latitude": 44.7369,
        "longitude": -89.0404,
        "mileFromStart": 1.4,
        "segmentKind": "creek",
        "note": "Approximate AW-described dells/wood-check corridor; inspect for fresh blockages and portage needs."
      },
      {
        "id": "county-road-m-south-branch-embarrass",
        "name": "County Road M take-out",
        "latitude": 44.7359,
        "longitude": -89.02716,
        "mileFromStart": 2.5,
        "segmentKind": "creek",
        "note": "Miles Paddled-listed take-out at County Road M; verify bridge, parking, and bank condition before launch."
      }
    ]
  },
  "brule-river-campground-highway-139": {
    "putIn": {
      "name": "Brule River Campground Landing",
      "latitude": 46.02746,
      "longitude": -88.79757
    },
    "takeOut": {
      "name": "Highway 139/189 Landing",
      "latitude": 45.98768,
      "longitude": -88.6524
    },
    "logistics": {
      "distanceLabel": "14.5 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr depending on flow, wood, and island-channel routefinding",
      "shuttle": "Stage the Highway 139/189 take-out first, then drive forest roads to the old Brule River Campground landing. Download maps before leaving service and confirm that the former campground landing is open for day use before unloading.",
      "permits": "No route-specific paddling permit is known. Use only public/signed access points, follow Wisconsin boating and PFD rules, and obey posted campground, forest-road, and border-river restrictions.",
      "camping": "Wisconsin Trail Guide notes one primitive campsite near Brule River Drive, while the old Brule River Campground has been closed to camping since 2015. Treat any overnight plan as site-specific and rule-checked.",
      "campingClassification": "on_route_campsite",
      "summary": "Paddle the upper Brule B1 reach from the old campground landing to Highway 139/189 for a remote marsh-and-forest day with Class I current and a WTG minimum of 220 cfs on the Highway 2 gauge.",
      "accessCaveats": [
        "The old Brule River Campground is not an active campground. WTG reports the landing remains open, but signs and access status should be checked before relying on it.",
        "Forest Road 2454 and Brule River Drive can serve as intermediate access points, but this card is built around the full 14.5-mile B1 route.",
        "The Highway 2 gauge is downstream of the reach but is the specific gauge WTG ties to this route. Pair it with a visual check at the put-in."
      ],
      "watchFor": [
        "Marsh channels, wooded islands, sweepers, shallow gravel, and routefinding delays at low flow.",
        "Cold water, remote road access, limited bailout options, and slow rescue response.",
        "Private banks and campsite assumptions; use only named public access/campsite points that are open and legal."
      ]
    },
    "accessPoints": [
      {
        "id": "brule-river-campground-landing",
        "name": "Brule River Campground Landing",
        "latitude": 46.02746,
        "longitude": -88.79757,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "WTG B1 GPX waypoint for the default put-in."
      },
      {
        "id": "brule-river-drive-campsite",
        "name": "Brule River Drive primitive campsite / landing",
        "latitude": 46.00885,
        "longitude": -88.67604,
        "mileFromStart": 8.3,
        "segmentKind": "creek",
        "note": "WTG B1 GPX waypoint for the route primitive campsite and access."
      },
      {
        "id": "highway-139-189-brule-landing",
        "name": "Highway 139/189 Landing",
        "latitude": 45.98768,
        "longitude": -88.6524,
        "mileFromStart": 14.5,
        "segmentKind": "creek",
        "note": "WTG B1 GPX waypoint for the default take-out."
      }
    ]
  },
  "brule-river-forest-road-2150-flowage": {
    "putIn": {
      "name": "Forest Road 2150 Landing",
      "latitude": 45.99013,
      "longitude": -88.45012
    },
    "takeOut": {
      "name": "WEPCO Recreation Area #28 Landing",
      "latitude": 45.96359,
      "longitude": -88.25001
    },
    "logistics": {
      "distanceLabel": "14.3 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr, longer with scouting, low water, or flowage wind",
      "shuttle": "Stage the WEPCO Recreation Area #28 take-out above Brule River Flowage, then return to Forest Road 2150. Confirm forest-road conditions, Carney Dam/Highway 2 bailouts, and the final take-out before committing to the full remote reach.",
      "permits": "No route-specific paddling permit is known. Use signed/known public landings, follow Wisconsin boating and PFD rules, and respect posted WEPCO, forest-road, and private-bank restrictions.",
      "camping": "Wisconsin Trail Guide says there are no riverside canoe/kayak campsites on this segment. Plan it as a long day route and use separate area lodging or campgrounds if needed.",
      "campingClassification": "none",
      "summary": "Run Brule B3 from Forest Road 2150 to the WEPCO #28 landing before Brule River Flowage. The route is mostly quiet forest current but includes Class I-II La Chapelle Rapids and WTG minimum-only gauge guidance.",
      "accessCaveats": [
        "Forest Road 2150 is a remote landing. Confirm road condition, parking, and water level before unloading.",
        "Carney Dam Landing and Highway 2 Landing are useful intermediate exits, but this route expects the full 14.3-mile run to WEPCO #28.",
        "Take out before the river opens into Brule River Flowage unless you have a separate lake/flowage plan and weather margin."
      ],
      "watchFor": [
        "Class I-II La Chapelle Rapids, riffles near McGovern Creek, and wood in faster bends.",
        "Cold water, remote rescue exposure, limited cell service, and long shuttle time.",
        "Flowage wind, motorboat exposure, and missed-takeout consequences near the finish."
      ]
    },
    "accessPoints": [
      {
        "id": "forest-road-2150-brule-landing",
        "name": "Forest Road 2150 Landing",
        "latitude": 45.99013,
        "longitude": -88.45012,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "WTG B3 GPX waypoint for the default put-in."
      },
      {
        "id": "highway-2-brule-landing",
        "name": "Highway 2 Landing",
        "latitude": 45.96076,
        "longitude": -88.31589,
        "mileFromStart": 9.8,
        "segmentKind": "creek",
        "note": "WTG B3 GPX waypoint for the Highway 2 landing near the gauge corridor."
      },
      {
        "id": "wepco-28-brule-flowage-landing",
        "name": "WEPCO Recreation Area #28 Landing",
        "latitude": 45.96359,
        "longitude": -88.25001,
        "mileFromStart": 14.3,
        "segmentKind": "creek",
        "note": "WTG B3 GPX waypoint for the default take-out before Brule River Flowage."
      }
    ]
  },
  "wisconsin-river-pine-island-portage": {
    "putIn": {
      "name": "Pine Island Boat Ramp off Levee Road",
      "latitude": 43.54304,
      "longitude": -89.58245
    },
    "takeOut": {
      "name": "Highway 33 Landing / Portage access",
      "latitude": 43.53563,
      "longitude": -89.47351
    },
    "logistics": {
      "distanceLabel": "6.0 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr depending on flow, wind, sandbar stops, and route choice",
      "shuttle": "Stage the Highway 33 / Portage take-out first, or use Sunset Park as an easier alternate if the carry-in landing is awkward. Then drive back to Pine Island Boat Ramp on Levee Road and verify the DNR wildlife-area rules before launch.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating and PFD rules, use legal public accesses, and obey all Pine Island Wildlife Area camping, parking, and public-use restrictions.",
      "camping": "Wisconsin DNR prohibits camping and overnight parking in Pine Island Wildlife Area, including Wisconsin River islands and sandbars. Treat this card as a day trip.",
      "campingClassification": "none",
      "summary": "Paddle the Wisconsin River from Pine Island Boat Ramp to the Highway 33 / Portage access for a short sandbar, island, and side-slough day route. Use the Wisconsin Dells gauge and avoid assuming any island camping is legal.",
      "accessCaveats": [
        "Pine Island Boat Ramp is the DNR-supported Levee Road launch for the wildlife area; confirm current access, road condition, and parking rules before unloading.",
        "The Highway 33 access is a carry-in style Portage landing in the WRT/Miles Paddled route context; Sunset Park may be easier depending on water level and group needs.",
        "Do not camp on Pine Island Wildlife Area lands, Wisconsin River islands, or sandbars within the property boundary."
      ],
      "watchFor": [
        "Braided side sloughs, shallow sandbars, island strainers, and dead-end channels.",
        "High water covering bars and speeding island currents; low water forcing long drags.",
        "Wind, motorboat traffic near Portage, private banks, cold water, and storms on the open lower Wisconsin corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "pine-island-boat-ramp",
        "name": "Pine Island Boat Ramp off Levee Road",
        "latitude": 43.54304,
        "longitude": -89.58245,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Miles Paddled GPS point and Wisconsin DNR Pine Island Wildlife Area launch context for the put-in."
      },
      {
        "id": "highway-33-portage-landing",
        "name": "Highway 33 Landing / Portage access",
        "latitude": 43.53563,
        "longitude": -89.47351,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "WRT and Miles Paddled take-out; Sunset Park is noted as an easier alternate."
      }
    ]
  },
  "prairie-river-county-j-county-c": {
    "putIn": {
      "id": "prairie-river-county-j-bridge",
      "name": "County Road J bridge / fishing-corridor access",
      "latitude": 45.29389,
      "longitude": -89.54626
    },
    "takeOut": {
      "id": "prairie-river-county-c-access",
      "name": "County Road C Prairie River access",
      "latitude": 45.23554,
      "longitude": -89.65006
    },
    "logistics": {
      "distanceLabel": "About 10 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with scouting, low water, or swims",
      "shuttle": "Run a rural shuttle from County Road C back to the County Road J bridge area near Bloomville. Inspect both bridge accesses before unloading because neither is a full-service launch.",
      "permits": "No route-specific paddling permit is known. Use only the bridge/fishing-corridor access areas, follow fishing and parking postings, and avoid private banks.",
      "camping": "No on-route camping is documented. Treat this as a day route; Council Grounds State Park or Merrill-area camping is separate basecamp planning, not part of this route.",
      "campingClassification": "none",
      "summary": "Launch at County Road J and take out at County Road C for the Prairie River Dells route. The app uses the direct Merrill gauge with a minimum-only floor because the strongest source publishes a low-water minimum and better recreational floor, not a complete high-water ladder.",
      "accessCaveats": [
        "County Road J is a bridge/fishing-corridor put-in. Miles Paddled notes good nearby parking but no developed ramp; confirm shoulder, pull-off, and bank condition.",
        "County Road C is an established downstream-left take-out, but it is still a roadside river access. Do not climb private banks or block the road.",
        "Do not assume the Dells can be casually scouted once committed. If the group is not comfortable with Class II boulder drops, pick an easier Prairie or Wisconsin River card."
      ],
      "watchFor": [
        "A narrow Dells mile with Class I-II+ ledges, boulders, rock walls, few eddies, and pin/swim consequences.",
        "Scraping, risky hang-ups, and forced rock dodging below about 200 cfs on the Merrill gauge.",
        "Fresh wood, fast rises after rain, cold water, private banks, and limited rescue access in the Dells corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "prairie-river-county-j-bridge",
        "name": "County Road J bridge / fishing-corridor access",
        "latitude": 45.29389,
        "longitude": -89.54626,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in near Bloomville; bridge-style access with nearby fishing-corridor parking."
      },
      {
        "id": "prairie-river-county-c-access",
        "name": "County Road C Prairie River access",
        "latitude": 45.23554,
        "longitude": -89.65006,
        "mileFromStart": 10,
        "segmentKind": "creek",
        "note": "Default take-out downstream-left at County Road C."
      }
    ]
  },
  "prairie-river-county-c-stanges": {
    "putIn": {
      "id": "prairie-river-county-c-access",
      "name": "County Road C Prairie River access",
      "latitude": 45.23552,
      "longitude": -89.65012
    },
    "takeOut": {
      "id": "stanges-park",
      "name": "Stange's Park",
      "latitude": 45.18096,
      "longitude": -89.70142
    },
    "logistics": {
      "distanceLabel": "About 9.25 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr, depending on current and stops",
      "shuttle": "Stage the take-out at Stange's Park in Merrill, then drive back to County Road C. Scout the County C downstream-left launch and the Stange's Park river-right take-out before committing.",
      "permits": "No route-specific paddling permit is known. Follow local park and parking rules, use the named access areas, and avoid private banks through the Merrill approach.",
      "camping": "No on-route camping is documented. Treat this as a day trip; Merrill-area lodging or Council Grounds State Park are separate basecamp options.",
      "campingClassification": "none",
      "summary": "Launch at County Road C and take out at Stange's Park for the lower Prairie River run into Merrill. The route uses the direct Merrill gauge and Miles Paddled's 200-400 cfs recommendation.",
      "accessCaveats": [
        "Miles Paddled says the correct County C launch is downstream left; the upstream-left riprap is not suitable.",
        "Stange's Park is a public Merrill park, but the river take-out is a grassy bank cue rather than a large boat ramp. Identify it from land first.",
        "Do not extend to the Wisconsin River without separate planning for the mouth, bike-path bridge, reservoir current, and downstream dam context."
      ],
      "watchFor": [
        "Class I riffles, rocks and boulders, S-curves, low trees, and occasional strainers.",
        "Scraping or walking below 200 cfs on the Merrill gauge.",
        "Pushier bends and wood much above 400 cfs, especially in the narrower or more urban lower miles."
      ]
    },
    "accessPoints": [
      {
        "id": "prairie-river-county-c-access",
        "name": "County Road C Prairie River access",
        "latitude": 45.23552,
        "longitude": -89.65012,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in downstream-left of County Road C."
      },
      {
        "id": "prairie-trails-park",
        "name": "Prairie Trails Park",
        "latitude": 45.1919,
        "longitude": -89.6886,
        "mileFromStart": 7,
        "segmentKind": "creek",
        "note": "River-left rest stop after County K with landing/facility support in the trip report."
      },
      {
        "id": "stanges-park",
        "name": "Stange's Park",
        "latitude": 45.18096,
        "longitude": -89.70142,
        "mileFromStart": 9.25,
        "segmentKind": "creek",
        "note": "Default Merrill take-out on river right."
      }
    ]
  },
  "rock-river-willow-street-johnson-creek": {
    "putIn": {
      "id": "rock-river-willow-street-watertown",
      "name": "Willow Street / Front Street launch corridor",
      "latitude": 43.18576,
      "longitude": -88.70475
    },
    "takeOut": {
      "id": "rock-river-park-johnson-creek",
      "name": "Rock River Park / County Road B",
      "latitude": 43.07137,
      "longitude": -88.79488
    },
    "logistics": {
      "distanceLabel": "About 16.75 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with low water, wind, or long stops",
      "shuttle": "Stage Rock River Park first, verify the park and launch are open, then drive back to the Willow Street / Front Street launch corridor below the Watertown dam. This is a long rural shuttle and should start early.",
      "permits": "No route-specific paddling permit is known. Jefferson County may require boat-launch permits at Rock River Park; follow all city, county, boating, PFD, and posted park rules.",
      "camping": "No on-route camping is documented for this Watertown-to-Johnson-Creek day card. Treat Rock River water-trail camping references as broader-corridor context unless a specific campsite is separately reserved and confirmed.",
      "campingClassification": "none",
      "summary": "Launch below downtown Watertown and take out at Jefferson County Rock River Park for a long upper-Rock water-trail day. The app uses the direct Watertown gauge as minimum-only because the route source gives a trip level, not a full threshold ladder.",
      "accessCaveats": [
        "Stay below the Watertown dam corridor for this route. Starting above a dam or improvising a portage changes the hazard model.",
        "Willow Street is a water-trail access with street-parking context rather than a full-service launch. Check current local signs and construction before unloading.",
        "Rock River Park can close during flooding, and Jefferson County notes boat-launch permit requirements. Confirm take-out access before launch."
      ],
      "watchFor": [
        "Long mileage, headwinds, motorboat wake, shallow bars, fatigue, thunderstorms, and few simple bailout points.",
        "Wood, strainers, private banks, bridge current, and fast or rising water after rain.",
        "Flooding or high water that affects Rock River Park, plus a below-floor Watertown gauge that can mean slow, shallow progress."
      ]
    },
    "accessPoints": [
      {
        "id": "rock-river-willow-street-watertown",
        "name": "Willow Street / Front Street launch corridor",
        "latitude": 43.18576,
        "longitude": -88.70475,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in below the Watertown dam corridor."
      },
      {
        "id": "rock-river-park-johnson-creek",
        "name": "Rock River Park / County Road B",
        "latitude": 43.07137,
        "longitude": -88.79488,
        "mileFromStart": 16.75,
        "segmentKind": "creek",
        "note": "Default take-out at Jefferson County Rock River Park near Johnson Creek."
      }
    ]
  },
  "mecan-river-mecan-springs-9th-ave": {
    "putIn": {
      "id": "mecan-springs-boat-ramp",
      "name": "Mecan Springs Boat Ramp",
      "latitude": 44.0556796,
      "longitude": -89.4703342
    },
    "takeOut": {
      "id": "mecan-9th-avenue-access",
      "name": "9th Avenue bridge access",
      "latitude": 44.0453276,
      "longitude": -89.4462094
    },
    "logistics": {
      "distanceLabel": "About 3.9 mi with spring-bay exploration; about 2.1 mi if paddled directly",
      "estimatedPaddleTime": "About 2 hr for a direct route; longer if exploring Mecan Springs bays",
      "shuttle": "Stage 9th Avenue first, staying tight to the bridge/right-of-way area, then drive back to the Mecan Springs boat ramp. Inspect 9th Avenue before launching because parking is tight and adjacent land is posted private.",
      "permits": "No route-specific paddling permit is known. Use the DNR/SNA access responsibly, follow Wisconsin boating/PFD rules, obey posted state natural area rules, and avoid blocking narrow road shoulders.",
      "camping": "No camping is allowed at Mecan Springs State Natural Area, and no on-route camping is documented for this short headwaters route. Treat it as a day trip.",
      "campingClassification": "none",
      "summary": "Launch at the Mecan Springs Boat Ramp, explore the spring-fed headwater lake if conditions are calm, then continue past Highway GG to the 9th Avenue bridge access. The app uses Chaffee Creek as a rough proxy and keeps the route conservative because the river is shallow and woody.",
      "accessCaveats": [
        "Mecan Springs is a DNR-owned State Natural Area with limited facilities and specific public-use rules; camping and campfires are prohibited.",
        "WRT notes the 9th Avenue take-out is usable but small, with tight parking and No Trespassing signs on adjacent properties. Keep the exit within the right-of-way/access area.",
        "The Chaffee Creek gauge is a tributary proxy, not a direct Mecan gauge. Same-day visual checks at Mecan Springs, Highway GG, and 9th Avenue override the score."
      ],
      "watchFor": [
        "Soft/quicksand-style spring-bottom areas in Mecan Springs; avoid wading the spring boils or shallow lake margins.",
        "Downed trees, duck-unders, shallow riffles, and the partially obstructed 9th Avenue culvert approach.",
        "Cold spring water, low-water scraping, wind across the spring basin, and private banks near the take-out."
      ]
    },
    "accessPoints": [
      {
        "id": "mecan-springs-boat-ramp",
        "name": "Mecan Springs Boat Ramp",
        "latitude": 44.0556796,
        "longitude": -89.4703342,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the DNR-owned Mecan Springs State Natural Area boat ramp."
      },
      {
        "id": "mecan-highway-gg-bridge",
        "name": "Highway GG bridge access",
        "latitude": 44.0510306,
        "longitude": -89.4639907,
        "mileFromStart": 0.6,
        "segmentKind": "creek",
        "note": "Optional access where the spring basin transitions into the river."
      },
      {
        "id": "mecan-9th-avenue-access",
        "name": "9th Avenue bridge access",
        "latitude": 44.0453276,
        "longitude": -89.4462094,
        "mileFromStart": 3.9,
        "segmentKind": "creek",
        "note": "Default take-out; stay within the right-of-way/access area."
      }
    ]
  },
  "mecan-river-cumberland-11th-road": {
    "putIn": {
      "id": "cumberland-road-mecan-access",
      "name": "Cumberland Road bridge access",
      "latitude": 44.0222228,
      "longitude": -89.4266698
    },
    "takeOut": {
      "id": "mecan-11th-road-access",
      "name": "11th Road bridge access",
      "latitude": 44.0074675,
      "longitude": -89.3914993
    },
    "logistics": {
      "distanceLabel": "About 3.9 mi",
      "estimatedPaddleTime": "About 2.5 hr to 3.5 hr, longer with low branches, short portages, or stops",
      "shuttle": "Stage 11th Road first, using the nearby public fishing parking noted by WRT, then drive back to Cumberland Road. Prefer launching immediately above the Cumberland Road culvert rather than from the snaggy upstream parking-lot approach.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, keep bridge/parking areas clear, and use only legal public access space.",
      "camping": "No on-route camping is documented. Treat this as a short day route; use any Waushara County campground or private campground separately from the river plan.",
      "campingClassification": "none",
      "summary": "Launch at Cumberland Road and take out at 11th Road for a fast, narrow, clear upper-Mecan spring-creek run. Chaffee Creek is only a rough proxy, so bridge visuals and recent wood reports control the final go/no-go call.",
      "accessCaveats": [
        "WRT no longer recommends the upstream pre-Cumberland approach because the first 500 feet can be congested; use the direct bridge-side launch if footing and current are manageable.",
        "11th Road has a bridge take-out and nearby public fishing parking, but check shoulder space, mud, vegetation, and other users before leaving a vehicle.",
        "The Chaffee Creek proxy can miss exact upper-Mecan water level. Treat marginal scores as a reason to scout, not as permission to force the run."
      ],
      "watchFor": [
        "Low branches, slide-overs, and short easy portages, especially in the faster first mile.",
        "Cold water, narrow blind bends, shallow riffles, and fresh wood after storms or wind events.",
        "Private banks and tight rural-road parking along the access chain."
      ]
    },
    "accessPoints": [
      {
        "id": "cumberland-road-mecan-access",
        "name": "Cumberland Road bridge access",
        "latitude": 44.0222228,
        "longitude": -89.4266698,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in immediately above the Cumberland Road culvert."
      },
      {
        "id": "mecan-11th-road-access",
        "name": "11th Road bridge access",
        "latitude": 44.0074675,
        "longitude": -89.3914993,
        "mileFromStart": 3.9,
        "segmentKind": "creek",
        "note": "Default take-out, with nearby public fishing parking noted by WRT."
      }
    ]
  },
  "mecan-river-11th-road-dakota": {
    "putIn": {
      "id": "mecan-11th-road-access",
      "name": "11th Road bridge access",
      "latitude": 44.00744,
      "longitude": -89.391529
    },
    "takeOut": {
      "id": "dakota-highway-y-jj-bridge",
      "name": "Dakota / Highway Y-JJ bridge access",
      "latitude": 43.988693,
      "longitude": -89.358252
    },
    "logistics": {
      "distanceLabel": "About 3.7 mi",
      "estimatedPaddleTime": "About 2 hr to 2.5 hr, longer with wood maneuvering or low water",
      "shuttle": "Stage Dakota / Highway Y-JJ first, using the same public/scenic access as the downstream Dakota-to-Dixie card, then drive back to 11th Road. Confirm both small access points before unloading.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, use only legal bridge/public access space, and keep private banks off the trip plan.",
      "camping": "No on-route camping is documented. Treat this as a short day route with separate base-camp planning if needed.",
      "campingClassification": "none",
      "summary": "Launch at 11th Road and take out at Dakota / Highway Y-JJ for WRT’s favorite upper-Mecan segment. The app uses Chaffee Creek as a cautious minimum-only proxy because WRT’s original Silver Creek reference is not accurate enough for product scoring.",
      "accessCaveats": [
        "Use the 11th Road bridge access and public parking north of the bridge; avoid trampling banks or blocking rural-road traffic.",
        "At Dakota, use the established access area shared with the downstream card. WRT comments warn against using upstream private property around the culvert.",
        "Because the selected gauge is proxy-only and the threshold is based on later route comments, same-day depth, clarity, current, and wood checks matter more than the score near the floor."
      ],
      "watchFor": [
        "Low trees, slide-overs, tight bends, and narrow current that can be awkward for longer boats.",
        "Cold clear water, low-water scraping, fresh wood, and private banks.",
        "The Chaffee Creek proxy reading sitting below the conservative same-route comment floor, which should trigger extra caution or a visual stand-down."
      ]
    },
    "accessPoints": [
      {
        "id": "mecan-11th-road-access",
        "name": "11th Road bridge access",
        "latitude": 44.00744,
        "longitude": -89.391529,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in with public parking north of the bridge."
      },
      {
        "id": "dakota-highway-y-jj-bridge",
        "name": "Dakota / Highway Y-JJ bridge access",
        "latitude": 43.988693,
        "longitude": -89.358252,
        "mileFromStart": 3.7,
        "segmentKind": "creek",
        "note": "Default take-out and shared downstream Mecan access point."
      }
    ]
  },
  "mecan-river-dakota-dixie": {
    "putIn": {
      "name": "Dakota / Highway Y-JJ bridge access",
      "latitude": 43.9886026,
      "longitude": -89.3584275
    },
    "takeOut": {
      "name": "Dixie Avenue bridge access",
      "latitude": 43.9522342,
      "longitude": -89.325844
    },
    "logistics": {
      "distanceLabel": "About 5.4 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer if branches or bridge obstructions require short carries",
      "shuttle": "Stage Dixie Avenue first, then drive back to the Dakota / Highway Y-JJ bridge. Check both bridge approaches before unloading because the route depends on small public carry-in style access rather than a staffed launch.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, use only legal bridge/public access space, and avoid blocking road shoulders or private driveways.",
      "camping": "No on-route camping is documented for this upper Mecan day route. Treat any Waushara County or private campground plan as separate base-camp planning away from the river corridor.",
      "campingClassification": "none",
      "summary": "Launch at the Dakota / Highway Y-JJ bridge and take out at Dixie Avenue for a clear spring-fed upper Mecan route. The app uses Chaffee Creek at I-39 as a rough tributary proxy because WRT ties this exact route family to that gauge, but same-day bridge visuals still control.",
      "accessCaveats": [
        "WRT describes the Dakota bridge as public and scenic and Dixie Avenue as a nice carry-in landing, but both are small access points where shoulder, mud, and bank conditions matter.",
        "The Chaffee Creek gauge is a rough analog, not a direct Mecan gauge. If the bridge visual check disagrees with the score, trust the visual check.",
        "Stay off private banks except in emergencies. The route is short enough to avoid casual trespass stops."
      ],
      "watchFor": [
        "Low branches, fresh wood, and low private bridges that may require a short portage or careful duck-under.",
        "Cold spring-fed water, especially in shoulder seasons.",
        "Local storms, drought, or vegetation changes that can make the Chaffee proxy misleading for the exact route."
      ]
    },
    "accessPoints": [
      {
        "id": "dakota-highway-y-jj-bridge",
        "name": "Dakota / Highway Y-JJ bridge access",
        "latitude": 43.9886026,
        "longitude": -89.3584275,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; WRT describes this as a public and scenic bridge access."
      },
      {
        "id": "dixie-avenue-mecan-access",
        "name": "Dixie Avenue bridge access",
        "latitude": 43.9522342,
        "longitude": -89.325844,
        "mileFromStart": 5.4,
        "segmentKind": "creek",
        "note": "Default take-out for the upper Dakota card."
      }
    ]
  },
  "mecan-river-dixie-highway-22": {
    "putIn": {
      "name": "Dixie Avenue bridge access",
      "latitude": 43.9521817,
      "longitude": -89.3258795
    },
    "takeOut": {
      "name": "Highway 22 Mecan River access",
      "latitude": 43.915876,
      "longitude": -89.3122539
    },
    "logistics": {
      "distanceLabel": "About 4.5 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, depending on current, branches, and stops",
      "shuttle": "Stage the Highway 22 take-out first, then drive back to Dixie Avenue. Inspect the Highway 22 access from land because parking and bank footing are the main practical constraints.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, use legal public access space, and respect posted bridge-area parking limits.",
      "camping": "No on-route camping is documented. Treat this as a short day route with separate base-camp planning if needed.",
      "campingClassification": "none",
      "summary": "Use Dixie Avenue to Highway 22 for the middle Mecan card. WRT reports no rapids and consistently fast current, while the app scores the route from the Chaffee Creek proxy with explicit same-day visual-check caveats.",
      "accessCaveats": [
        "Dixie Avenue is the same public carry-in used as the upstream route take-out; stage courteously and keep the bridge area clear.",
        "Highway 22 has public access northeast of the bridge, but footing, mud, shoulder parking, and vegetation should be checked before leaving a shuttle vehicle.",
        "The Chaffee Creek proxy can miss exact Mecan conditions. Same-day water visibility, bridge clearance, and local storm history should override a marginal score."
      ],
      "watchFor": [
        "Fast current pushing into low branches, bridge edges, and any fresh downed tree.",
        "Cold water, especially in spring and fall.",
        "Private banks between the bridge accesses; avoid unplanned stops unless safety requires them."
      ]
    },
    "accessPoints": [
      {
        "id": "dixie-avenue-mecan-access",
        "name": "Dixie Avenue bridge access",
        "latitude": 43.9521817,
        "longitude": -89.3258795,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; WRT describes this as a great put-in with public parking."
      },
      {
        "id": "highway-22-mecan-access",
        "name": "Highway 22 Mecan River access",
        "latitude": 43.915876,
        "longitude": -89.3122539,
        "mileFromStart": 4.5,
        "segmentKind": "creek",
        "note": "Default take-out northeast of the bridge."
      }
    ]
  },
  "mecan-river-highway-22-germania": {
    "putIn": {
      "name": "Highway 22 Mecan River access",
      "latitude": 43.9161263,
      "longitude": -89.3126352
    },
    "takeOut": {
      "name": "Germania Marsh Dam access",
      "latitude": 43.8917924,
      "longitude": -89.2522052
    },
    "logistics": {
      "distanceLabel": "About 5.8 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with wind, marsh navigation, or a barrier portage",
      "shuttle": "Stage Germania Marsh Dam first and confirm that the ramp/gate/access setup is usable that day. Consider marking the Duck Creek / fish barrier alternate take-out before launching from Highway 22.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, obey fish-barrier and dam signs, and use only public access areas for staging.",
      "camping": "No on-route camping is documented. The marsh-and-dam route should be treated as a day paddle with a firm take-out plan before the dam.",
      "campingClassification": "none",
      "summary": "Launch at Highway 22 and paddle downstream through the Germania Marsh corridor to the dam access. This route is short on paper but carries more logistics than the upstream Mecan cards because of marsh navigation, wind exposure, fish-barrier signs, and the mandatory dam stop.",
      "accessCaveats": [
        "The Highway 22 launch is public but small; inspect parking, footing, and bridge clearance before committing.",
        "WRT notes an electric fish barrier warning and an alternate take-out near Duck Creek about 1.1 miles above the dam. Treat that as a real decision point if signs or conditions warrant stopping early.",
        "The Germania Marsh Dam take-out must be confirmed before launch, including seasonal gate or ramp access. Do not drift into the dam corridor."
      ],
      "watchFor": [
        "Open-marsh wind, confusing channels, low bridge clearance, and the need for GPS or a reliable map.",
        "Electric fish barrier signage, overgrown portage/access paths, and quicksand or soft-bottom wading risk.",
        "Cold water, private banks, storms, and any mismatch between Chaffee proxy levels and visible Mecan conditions."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-22-mecan-access",
        "name": "Highway 22 Mecan River access",
        "latitude": 43.9161263,
        "longitude": -89.3126352,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in on the north side of the bridge."
      },
      {
        "id": "duck-creek-fish-barrier",
        "name": "Duck Creek / fish barrier alternate take-out",
        "latitude": 43.8948365,
        "longitude": -89.2593652,
        "mileFromStart": 4.7,
        "segmentKind": "creek",
        "note": "Optional early take-out if barrier signs, wind, or marsh conditions make the dam continuation unwise."
      },
      {
        "id": "germania-marsh-dam-access",
        "name": "Germania Marsh Dam access",
        "latitude": 43.8917924,
        "longitude": -89.2522052,
        "mileFromStart": 5.8,
        "segmentKind": "creek",
        "note": "Default take-out before the dam; confirm same-day access before launching."
      }
    ]
  },
  "namekagon-river-namekagon-dam-hwy-63": {
    "putIn": {
      "id": "namekagon-dam-landing",
      "name": "Namekagon Dam Landing",
      "latitude": 46.22438,
      "longitude": -91.14934
    },
    "takeOut": {
      "id": "cable-wayside-landing",
      "name": "Highway 63 / Cable Wayside Landing",
      "latitude": 46.18772,
      "longitude": -91.32037
    },
    "logistics": {
      "distanceLabel": "About 14.7 mi",
      "estimatedPaddleTime": "About 5 hr to 6.5 hr, longer with low water, beaver dams, or portages",
      "shuttle": "Stage the take-out at Cable Wayside / Highway 63 first, then drive back to Namekagon Dam Landing. Inspect low bridges and visible riffles from the road-crossing accesses when the Leonards gauge is near or below the floor.",
      "permits": "No route-specific paddling permit is known for private boats. Follow Wisconsin boating/PFD rules and St. Croix National Scenic Riverway rules, including no glass and designated-campsite-only camping.",
      "camping": "NPS/WTG identify one individual Riverway canoe campsite in this N1 segment, about 1.5 miles above Cable Wayside. Use only designated first-come Riverway campsites and follow the three-night, group-size, fire, trash, and no-glass rules.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Namekagon Dam Landing and take out at Cable Wayside / Highway 63 for the upper Namekagon N1 corridor. This is a scenic but shallow, rocky, and isolated Riverway day with Class I-II ledges and beaver-dam/wood exposure.",
      "accessCaveats": [
        "Namekagon Dam Landing is the start. Do not treat the upstream flowage or dam structure as part of this route.",
        "NPS warns the first ten miles are isolated and can become extremely low or impassable during dry conditions.",
        "Cable Wayside is the planned exit just beyond the Highway 63 bridge; identify the take-out before the shuttle feels committed.",
        "Riverway camping is limited to designated sites; do not improvise on islands, marsh banks, or private/restricted land."
      ],
      "watchFor": [
        "Shallow rocky Class I-II rapids below the 170 cfs floor, where boats can pin or grind on ledges.",
        "Beaver dams, downed trees, low bridges, strainers, cold water, poison ivy, ticks, and remote rescue exposure.",
        "Fast rises or storm debris after rain; the Leonards gauge cannot show individual new obstructions."
      ]
    },
    "accessPoints": [
      {
        "id": "namekagon-dam-landing",
        "name": "Namekagon Dam Landing",
        "latitude": 46.22438,
        "longitude": -91.14934,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from WTG N1 GPX; described as canoe/kayak access with county park and campground context."
      },
      {
        "id": "county-m-landing",
        "name": "County Road M Landing",
        "latitude": 46.2063,
        "longitude": -91.22785,
        "mileFromStart": 7.2,
        "segmentKind": "creek",
        "note": "Intermediate WTG/NPS access and practical bailout."
      },
      {
        "id": "phillipi-bridge-landing",
        "name": "Phillipi Bridge Landing",
        "latitude": 46.19798,
        "longitude": -91.29063,
        "mileFromStart": 11.8,
        "segmentKind": "creek",
        "note": "Intermediate WTG/NPS landing above the final Cable Wayside stretch."
      },
      {
        "id": "cable-wayside-landing",
        "name": "Highway 63 / Cable Wayside Landing",
        "latitude": 46.18772,
        "longitude": -91.32037,
        "mileFromStart": 14.7,
        "segmentKind": "creek",
        "note": "Default take-out at the Highway 63 wayside / Cable Wayside landing."
      }
    ]
  },
  "namekagon-river-hayward-stinnett": {
    "putIn": {
      "id": "hayward-landing-namekagon",
      "name": "Hayward Landing",
      "latitude": 46.0035,
      "longitude": -91.48906
    },
    "takeOut": {
      "id": "stinnett-landing-namekagon",
      "name": "Stinnett Landing",
      "latitude": 45.98378,
      "longitude": -91.58901
    },
    "logistics": {
      "distanceLabel": "About 9.1 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with low water, scouting, or campsite stops",
      "shuttle": "Stage Stinnett Landing first, then return to Hayward Landing. Confirm the Hayward launch you plan to use because the dam-adjacent launch and the downstream Hayward Landing are separate choices.",
      "permits": "No route-specific paddling permit is known for private boats. Follow Wisconsin boating/PFD rules and St. Croix National Scenic Riverway rules, including no glass and designated-campsite-only camping.",
      "camping": "WRT and WTG/NPS document designated Riverway canoe campsites in the broader N2 corridor. Camp only at signed first-come Riverway sites and do not assume informal bank or island camping is allowed.",
      "campingClassification": "on_route_campsite",
      "summary": "Use Hayward Landing to Stinnett for the short upper-middle Namekagon day route. The reach starts fast and rocky, then alternates clearer main channel, islands, sloughs, and calmer stretches before Stinnett.",
      "accessCaveats": [
        "This card starts at Hayward Landing. If launching at the dam landing upstream, scout the dam-adjacent current and the known first-mile strainer before committing.",
        "Stinnett is the planned take-out. Continuing to Groat or Springbrook adds more rapids and should be treated as a separate route decision.",
        "Use Riverway landings and designated campsites only; private banks and side channels are not assumed bailout points."
      ],
      "watchFor": [
        "Fast first miles below Hayward, Warder Rapids, Fox Slough riffles, a known tricky strainer below the dam landing, and shallow or blocked side channels.",
        "Low water near the 50 cfs floor, when light craft may still pass but loaded canoes can scrape or require channel picking.",
        "Cold water, floating wood, fast post-rain rises, tubing traffic near Hayward, and private or restricted banks."
      ]
    },
    "accessPoints": [
      {
        "id": "hayward-landing-namekagon",
        "name": "Hayward Landing",
        "latitude": 46.0035,
        "longitude": -91.48906,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from WTG N2 GPX and NPS Map 2."
      },
      {
        "id": "west-river-landing-namekagon",
        "name": "West River Landing",
        "latitude": 45.97808,
        "longitude": -91.57632,
        "mileFromStart": 7.8,
        "segmentKind": "creek",
        "note": "Intermediate access from WTG N2 GPX before Stinnett."
      },
      {
        "id": "stinnett-landing-namekagon",
        "name": "Stinnett Landing",
        "latitude": 45.98378,
        "longitude": -91.58901,
        "mileFromStart": 9.1,
        "segmentKind": "creek",
        "note": "Default take-out; WRT describes parking and bathrooms here."
      }
    ]
  },
  "namekagon-river-county-k-whispering-pines": {
    "putIn": {
      "id": "county-k-landing-namekagon",
      "name": "County Road K Landing",
      "latitude": 45.95324,
      "longitude": -91.89136
    },
    "takeOut": {
      "id": "whispering-pines-landing-namekagon",
      "name": "Whispering Pines Landing",
      "latitude": 46.00925,
      "longitude": -91.98117
    },
    "logistics": {
      "distanceLabel": "About 11.0 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with low water, fishing, or campsite stops",
      "shuttle": "Stage Whispering Pines Landing first, then return to County Road K Landing below the Trego Dam corridor. Verify both Riverway landings before launching because this is a secluded lower Namekagon reach with limited exits.",
      "permits": "No route-specific paddling permit is known for private boats. Follow Wisconsin boating/PFD rules and St. Croix National Scenic Riverway rules, including no glass and designated-campsite-only camping.",
      "camping": "WTG says the broader County K-to-Fritz N4 segment has fourteen Riverway canoe campsites, and the lower Namekagon-to-Riverside reach has extensive designated campsite support. Use only signed first-come Riverway campsites and follow NPS limits.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch below Trego at County Road K and paddle to Whispering Pines for a secluded lower Namekagon day. The route has mostly easy current, several Class I riffles, wooded banks, islands, and strong Riverway camping context.",
      "accessCaveats": [
        "Start at County Road K Landing below the Trego Dam/flowage corridor. Do not fold the upstream dam portage into this card.",
        "Whispering Pines is the default exit. Howell, Fritz, McDowell, and Riverside are separate downstream planning choices.",
        "Riverway camps are first-come and designated only; do not assume private banks, islands, or sandbars are legal overnight stops."
      ],
      "watchFor": [
        "Shallow riffles below the 155 cfs floor, island-channel splits, overhanging trees, sweepers, and strainers.",
        "Remote shoreline with limited intermediate exits and slower rescue response.",
        "Cold water, post-rain rises, ticks, poison ivy, and private or restricted banks outside signed Riverway sites."
      ]
    },
    "accessPoints": [
      {
        "id": "county-k-landing-namekagon",
        "name": "County Road K Landing",
        "latitude": 45.95324,
        "longitude": -91.89136,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from WTG N4 GPX and NPS Map 3."
      },
      {
        "id": "whispering-pines-landing-namekagon",
        "name": "Whispering Pines Landing",
        "latitude": 46.00925,
        "longitude": -91.98117,
        "mileFromStart": 11,
        "segmentKind": "creek",
        "note": "Default take-out for the WRT exact route; also an intermediate landing on WTG N4."
      }
    ]
  },
  "namekagon-river-stinnett-springbrook": {
    "putIn": {
      "id": "stinnett-landing-namekagon",
      "name": "Stinnett Landing",
      "latitude": 45.98378,
      "longitude": -91.58901
    },
    "takeOut": {
      "id": "springbrook-landing-namekagon",
      "name": "Springbrook Landing",
      "latitude": 45.95392,
      "longitude": -91.68622
    },
    "logistics": {
      "distanceLabel": "About 7.9 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with scouting, scraping, fishing, or campsite stops",
      "shuttle": "Stage Springbrook Landing first, then drive back upstream to Stinnett Landing. Groat and North Springbrook are useful intermediate checks, but the default card runs the whole Stinnett-to-Springbrook connector.",
      "permits": "No route-specific paddling permit is known for private boats. Follow Wisconsin boating/PFD rules and St. Croix National Scenic Riverway rules, including no glass and designated-campsite-only camping.",
      "camping": "WTG and NPS show designated Riverway campsites in the broader Hayward-to-Springbrook corridor. Use only signed first-come Riverway sites, respect group-size limits, and do not assume private banks or islands are legal overnight stops.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Stinnett for the faster upper-middle Namekagon connector through Groat, Chippanazie Rapids, North Springbrook, and Springbrook. This is a compact Class I-II day with public Riverway access at both ends.",
      "accessCaveats": [
        "Stinnett sits just above a tight wavy chute formed by old bridge remains; launch with room to organize before the constriction.",
        "Groat and North Springbrook can shorten the day if water, wood, weather, or group skill makes the full connector too committed.",
        "Springbrook is the planned take-out. Continuing downstream to Big Bend or Trego overlaps separate route cards and changes the shuttle."
      ],
      "watchFor": [
        "Rocky Class I-II riffles, Chippanazie Rapids, shallow boulder gardens, wave trains, and scrape-prone lines below the selected floor.",
        "Strainers, downed trees, island-channel decisions, wooded outside bends, cold water, and quick rises after rain.",
        "Private or restricted banks outside signed Riverway access and campsite areas."
      ]
    },
    "accessPoints": [
      {
        "id": "stinnett-landing-namekagon",
        "name": "Stinnett Landing",
        "latitude": 45.98378,
        "longitude": -91.58901,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from WTG N2 GPX and NPS Map 2. WTG notes a hand-carry access, parking, rustic toilets, picnic area, and the old-bridge chute just downstream."
      },
      {
        "id": "groat-landing-namekagon",
        "name": "Groat Landing / Brickman Lake Road",
        "latitude": 45.99605,
        "longitude": -91.6345,
        "mileFromStart": 3,
        "segmentKind": "creek",
        "note": "Intermediate landing above Chippanazie Rapids and the WRT exact Groat-to-Springbrook rapid split."
      },
      {
        "id": "north-springbrook-landing-namekagon",
        "name": "North Springbrook Landing",
        "latitude": 45.97612,
        "longitude": -91.65528,
        "mileFromStart": 5.4,
        "segmentKind": "creek",
        "note": "Intermediate WTG/NPS access below the wooded island and rapid section."
      },
      {
        "id": "springbrook-landing-namekagon",
        "name": "Springbrook Landing",
        "latitude": 45.95392,
        "longitude": -91.68622,
        "mileFromStart": 7.9,
        "segmentKind": "creek",
        "note": "Default take-out from WTG N2/N3 coordinates and WRT Groat-to-Springbrook route context."
      }
    ]
  },
  "namekagon-river-springbrook-big-bend": {
    "putIn": {
      "id": "springbrook-landing-namekagon",
      "name": "Springbrook Landing",
      "latitude": 45.95392,
      "longitude": -91.68622
    },
    "takeOut": {
      "id": "big-bend-landing-namekagon",
      "name": "Big Bend Landing / POW Road",
      "latitude": 45.93224,
      "longitude": -91.75011
    },
    "logistics": {
      "distanceLabel": "About 5.2 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with low water, fishing, or campsite stops",
      "shuttle": "Stage Big Bend Landing first, then return to Springbrook Landing. This short card intentionally stops above the already-live Big-Bend-to-Trego route.",
      "permits": "No route-specific paddling permit is known for private boats. Follow Wisconsin boating/PFD rules and St. Croix National Scenic Riverway rules, including no glass and designated-campsite-only camping.",
      "camping": "WTG lists designated Riverway campsites in the broader Springbrook-to-Trego N3 corridor. Treat camping as signed, first-come Riverway sites only; do not use private banks, islands, or sandbars by default.",
      "campingClassification": "on_route_campsite",
      "summary": "A short scenic Namekagon link from Springbrook to Big Bend, with light rapids, grassy islands, wooded banks, and easy public Riverway access at both ends.",
      "accessCaveats": [
        "Springbrook is the intended put-in; launching upstream overlaps the Stinnett-to-Springbrook rapid connector.",
        "Big Bend is the planned take-out. Earl Park and Trego are downstream alternatives covered by the existing Big-Bend-to-Trego card.",
        "The route is short but still remote enough that wood, low water, or cold-water conditions can turn it into a committed outing."
      ],
      "watchFor": [
        "Light Class I riffles below Springbrook, shallow side channels, grassy island splits, and overhanging wood.",
        "Low-water scraping near the conservative floor and faster current after rain.",
        "Private or restricted banks outside signed Riverway access and campsite areas."
      ]
    },
    "accessPoints": [
      {
        "id": "springbrook-landing-namekagon",
        "name": "Springbrook Landing",
        "latitude": 45.95392,
        "longitude": -91.68622,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from WTG N2/N3 coordinates with hand-carry access, parking, and toilets."
      },
      {
        "id": "big-bend-landing-namekagon",
        "name": "Big Bend Landing / POW Road",
        "latitude": 45.93224,
        "longitude": -91.75011,
        "mileFromStart": 5.2,
        "segmentKind": "creek",
        "note": "Default take-out above the existing Big-Bend-to-Trego card; WTG lists hand-carry access, parking, picnic table, and fire pit."
      }
    ]
  },
  "namekagon-river-fritz-riverside": {
    "putIn": {
      "id": "fritz-landing-namekagon",
      "name": "Fritz Landing",
      "latitude": 46.04282,
      "longitude": -92.0458
    },
    "takeOut": {
      "id": "riverside-landing-st-croix",
      "name": "Riverside Landing / St. Croix River",
      "latitude": 46.0765,
      "longitude": -92.24559
    },
    "logistics": {
      "distanceLabel": "About 17.5 mi",
      "estimatedPaddleTime": "About 7 hr to 9 hr as a long day, or split with designated Riverway campsites",
      "shuttle": "Stage Riverside Landing on the St. Croix first, then drive back to Fritz Landing. McDowell Bridge and Namekagon Trail are intermediate landings if the group wants a shorter lower-Namekagon split.",
      "permits": "No route-specific paddling permit is known for private boats. Follow Wisconsin boating/PFD rules and St. Croix National Scenic Riverway rules, including no glass and designated-campsite-only camping.",
      "camping": "WTG says the N5 Fritz-to-Riverside reach has extensive Riverway campsite support, including individual and group options. Camps are first-come, signed sites only; verify availability and Riverway limits before building an overnight plan.",
      "campingClassification": "on_route_campsite",
      "summary": "A lower Namekagon day or overnight route from Fritz through McDowell, Namekagon Trail, the St. Croix confluence, and Big Island channels to Riverside Landing.",
      "accessCaveats": [
        "The Leonards gauge is far upstream for this route; near the floor, call the Namekagon visitor center or make a local visual check before launching.",
        "Riverside Landing is on the St. Croix below the Namekagon confluence. Missing the take-out extends the trip onto a larger river corridor.",
        "Use only public Riverway landings and signed campsites; do not assume private banks, islands, or sandbars are legal overnight stops."
      ],
      "watchFor": [
        "Long mileage, remote shoreline, limited rescue options, wind on wider pools, cold water, and quick rises after rain.",
        "Strainers, wooded islands, shallow riffles, confluence current, and Big Island channel choices.",
        "Private or restricted banks outside signed Riverway access and campsite areas."
      ]
    },
    "accessPoints": [
      {
        "id": "fritz-landing-namekagon",
        "name": "Fritz Landing",
        "latitude": 46.04282,
        "longitude": -92.0458,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from WTG N5 GPX and NPS Riverway map context."
      },
      {
        "id": "mcdowell-bridge-landing-namekagon",
        "name": "McDowell Bridge Landing",
        "latitude": 46.05809,
        "longitude": -92.06563,
        "mileFromStart": 2.7,
        "segmentKind": "creek",
        "note": "Intermediate landing with hand-carry access, parking, rustic toilet, picnic table, and fire pit per WTG N5."
      },
      {
        "id": "namekagon-trail-landing",
        "name": "Namekagon Trail Landing",
        "latitude": 46.08375,
        "longitude": -92.11386,
        "mileFromStart": 8.9,
        "segmentKind": "creek",
        "note": "Intermediate lower-Namekagon landing downstream of the Totogatic confluence."
      },
      {
        "id": "riverside-landing-st-croix",
        "name": "Riverside Landing / St. Croix River",
        "latitude": 46.0765,
        "longitude": -92.24559,
        "mileFromStart": 17.5,
        "segmentKind": "creek",
        "note": "Default take-out on the St. Croix; WTG describes trailer access, parking, picnic area, rustic toilets, and group campsite."
      }
    ]
  },
  "allen-creek-highway-59-old-highway-92": {
    "putIn": {
      "id": "allen-creek-highway-59-213",
      "name": "Allen Creek Highway 59 / 213 bridge access",
      "latitude": 42.751048,
      "longitude": -89.2989184
    },
    "takeOut": {
      "id": "allen-creek-old-highway-92",
      "name": "Allen Creek Old Highway 92 bridge access",
      "latitude": 42.7448101,
      "longitude": -89.3226152
    },
    "logistics": {
      "distanceLabel": "About 2.5 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low water, grass, or the easy logjam portage",
      "shuttle": "Stage Old Highway 92 first, then return to the Highway 59 / 213 bridge near the Evansville Wildlife Area parking context. Walk both bridge banks before unloading because this is a small seasonal creek rather than a developed launch-to-ramp trip.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, posted DNR wildlife-area rules, road-shoulder parking limits, and private-bank boundaries.",
      "camping": "No on-route camping. Treat this as a short day paddle through wildlife-area and agricultural frontage; use separate nearby camping or lodging if needed.",
      "campingClassification": "none",
      "summary": "Launch from the Highway 59 / 213 bridge and take out at Old Highway 92 for Wisconsin River Trips' short Allen Creek route. It is compact and scenic when water is up, but the Sugar River gauge is only a proxy and the creek still needs same-day checks for wood, grass, and bridge-bank access.",
      "accessCaveats": [
        "Wisconsin River Trips describes the Highway 59 / 213 launch as the default put-in with nearby Evansville Wildlife Area parking context; still verify posted parking and bank condition before carrying down.",
        "Old Highway 92 is a bridge take-out rather than a full-service launch. Late-season weeds or low water can make the landing less practical.",
        "The Sugar River near Verona gauge does not measure Allen Creek directly. Use the 31 cfs floor as a screening tool, then decide from the actual creek."
      ],
      "watchFor": [
        "One documented easy logjam portage, plus fresh strainers after wind or spring floods.",
        "Shallow riffles, summer grass, and muddy bridge banks when the creek is low.",
        "Private banks, cold shoulder-season water, and quick rises after local rain."
      ]
    },
    "accessPoints": [
      {
        "id": "allen-creek-highway-59-213",
        "name": "Allen Creek Highway 59 / 213 bridge access",
        "latitude": 42.751048,
        "longitude": -89.2989184,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from the Wisconsin River Trips route KML and access description."
      },
      {
        "id": "allen-creek-old-highway-92",
        "name": "Allen Creek Old Highway 92 bridge access",
        "latitude": 42.7448101,
        "longitude": -89.3226152,
        "mileFromStart": 2.5,
        "segmentKind": "creek",
        "note": "Default take-out from the Wisconsin River Trips route KML and access description."
      }
    ]
  },
  "honey-creek-carver-school-bell-school": {
    "putIn": {
      "id": "honey-creek-carver-school-road",
      "name": "Honey Creek Carver School Road bridge access",
      "latitude": 42.7883704,
      "longitude": -88.3665717
    },
    "takeOut": {
      "id": "honey-creek-bell-school-road",
      "name": "Honey Creek Bell School Road bridge access",
      "latitude": 42.7952252,
      "longitude": -88.3212889
    },
    "logistics": {
      "distanceLabel": "About 3.7 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, longer with mud, low water, or portage scouting",
      "shuttle": "Stage Bell School Road first, then return to Carver School Road. Inspect both bridge shoulders and the Highway 20 alternate before launching because parking is limited and Wisconsin River Trips calls the default Carver School put-in poor.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, posted streambank-protection-area rules, road-shoulder limits, and private-bank boundaries.",
      "camping": "No on-route camping. Treat the Honey Creek Streambank corridor and roadside bridges as day-use context only; do not assume legal bank or bar camping.",
      "campingClassification": "none",
      "summary": "Launch at Carver School Road and take out at Bell School Road for the short Honey Creek route documented by Wisconsin River Trips. The creek can be clear and intimate when water is right, but the default launch, dam/mud portage, tight take-out parking, and proxy gauge all need deliberate same-day review.",
      "accessCaveats": [
        "Carver School Road is the default route put-in, but Wisconsin River Trips says it is a poor access. Highway 20 can shorten the route if the default launch is not appropriate.",
        "Bell School Road has workable bridge access but tight shoulder parking. Stage without blocking road traffic, driveways, or maintenance access.",
        "The Mukwonago gauge is a nearby proxy and WRT cautions it may not represent Honey Creek perfectly. Scout for actual depth and wood before committing."
      ],
      "watchFor": [
        "The early mud/dam portage identified by Wisconsin River Trips, plus changing banks after rain.",
        "Low-water wading below the 28 cfs proxy floor and faster bridge current after storms.",
        "Private banks, cold water outside summer, and roadside access limits at both endpoints."
      ]
    },
    "accessPoints": [
      {
        "id": "honey-creek-carver-school-road",
        "name": "Honey Creek Carver School Road bridge access",
        "latitude": 42.7883704,
        "longitude": -88.3665717,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from the Wisconsin River Trips route KML; WRT rates access as poor."
      },
      {
        "id": "honey-creek-highway-20",
        "name": "Honey Creek Highway 20 bridge alternate access",
        "latitude": 42.7885024,
        "longitude": -88.3543983,
        "mileFromStart": 0.9,
        "segmentKind": "creek",
        "note": "Optional shorter-route access from the Wisconsin River Trips KML and route overview."
      },
      {
        "id": "honey-creek-bell-school-road",
        "name": "Honey Creek Bell School Road bridge access",
        "latitude": 42.7952252,
        "longitude": -88.3212889,
        "mileFromStart": 3.7,
        "segmentKind": "creek",
        "note": "Default take-out from the Wisconsin River Trips route KML; WRT notes tight but workable roadside parking."
      }
    ]
  },
  "mukwonago-river-rainbow-springs-beulah-road": {
    "putIn": {
      "id": "mukwonago-rainbow-springs-golf-resort-road",
      "name": "Mukwonago River Rainbow Springs Golf Resort Road walk-in",
      "latitude": 42.8556365,
      "longitude": -88.4180921
    },
    "takeOut": {
      "id": "mukwonago-beulah-road",
      "name": "Mukwonago River Beulah Road bridge access",
      "latitude": 42.8543604,
      "longitude": -88.395001
    },
    "logistics": {
      "distanceLabel": "About 2.4 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, longer with low limbs, scouting, or the carry-in",
      "shuttle": "Stage Beulah Road first, then return to the Highway LO / Rainbow Springs parking context. Expect a walk-in carry from the public parking area to the old bridge put-in and confirm current DNR property signs before unloading.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, Kettle Moraine State Forest / Mukwonago River Unit rules, posted closures, and private-bank boundaries.",
      "camping": "No on-route camping. Treat this short state-forest creek route as a day paddle; use separate legal camping or lodging elsewhere if needed.",
      "campingClassification": "none",
      "summary": "Launch from the Rainbow Springs / Highway LO walk-in context and take out at Beulah Road for the short upper Mukwonago split. This keeps the route above the downstream wild-rice navigation problem while preserving the clearwater creek character documented by Wisconsin River Trips.",
      "accessCaveats": [
        "The put-in is a carry from public parking to the old bridge area, not a drive-up ramp. Follow current Mukwonago River Unit signs and avoid private or closed property.",
        "Beulah Road is the planned take-out for this card. Missing it changes the trip into the downstream wild-rice section that WRT warns can hide the channel.",
        "The Mukwonago gauge is same-river but downstream of the route. Pair the 29 cfs floor with a visual check at Rainbow Springs."
      ],
      "watchFor": [
        "Low limbs, low bridge clearance, possible portages at higher water, and fresh strainers.",
        "Low-water scraping below the 29 cfs floor and cold shoulder-season water.",
        "Wild rice and lost-channel risk downstream of Beulah Road if the planned take-out is missed."
      ]
    },
    "accessPoints": [
      {
        "id": "mukwonago-rainbow-springs-golf-resort-road",
        "name": "Mukwonago River Rainbow Springs Golf Resort Road walk-in",
        "latitude": 42.8556365,
        "longitude": -88.4180921,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default river put-in from the Wisconsin River Trips route KML; public parking is a separate short carry from the river."
      },
      {
        "id": "mukwonago-beulah-road",
        "name": "Mukwonago River Beulah Road bridge access",
        "latitude": 42.8543604,
        "longitude": -88.395001,
        "mileFromStart": 2.4,
        "segmentKind": "creek",
        "note": "Default take-out from the Wisconsin River Trips KML and route overview, before the downstream wild-rice section."
      }
    ]
  },
  "eau-claire-river-clubhouse-county-j": {
    "putIn": {
      "id": "eau-claire-clubhouse-road-edwins-park",
      "name": "Edwin's Park / Club House Road launch",
      "latitude": 44.9064421,
      "longitude": -89.4586068
    },
    "takeOut": {
      "id": "eau-claire-county-j-landing",
      "name": "County Highway J Landing",
      "latitude": 44.9014989,
      "longitude": -89.5057011
    },
    "logistics": {
      "distanceLabel": "About 4.1 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, longer with low water, wood, or rapid scouting",
      "shuttle": "Stage the County J bridge landing first, then launch from the public park context at Club House Road. The Mountain-Bay State Trail pull-off is an alternate access in the source map, but this card uses Club House Road to County J as the planned public-access pair.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, Village of Weston and county access postings, road-shoulder limits, and private-bank boundaries.",
      "camping": "Treat this as a day route. No designated on-route campsite is selected between Club House Road and County J; use separate legal camping or lodging away from the route if needed.",
      "campingClassification": "none",
      "summary": "Launch at Edwin's Park / Club House Road and finish at County J for the first lower Eau Claire water-trail split below the county park corridor. Expect shallow boulder gardens, a few small rapids, and a downstream same-corridor stage gauge that must be paired with a visual check.",
      "accessCaveats": [
        "The Club House Road launch is a public park/grassy launch context with limited services and shoulder parking notes in WRT materials.",
        "County J is a bridge landing rather than a full-service ramp; confirm the faint trail, bank footing, and parking before unloading.",
        "The Kelly/Ross gauge is downstream of this split. Use Weston stage guidance as a screen, then inspect the actual water at both endpoints."
      ],
      "watchFor": [
        "Boulder gardens, Class I-II riffles, shallow ledges, and channel splits that can force walking below the 0.5 ft floor.",
        "Fresh strainers, downed trees, bridge debris, and faster current after rain.",
        "Private banks, limited legal bailout options, and cold water outside summer."
      ]
    },
    "accessPoints": [
      {
        "id": "eau-claire-clubhouse-road-edwins-park",
        "name": "Edwin's Park / Club House Road launch",
        "latitude": 44.9064421,
        "longitude": -89.4586068,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from the WRT overview KML; the source describes a public park northwest of the bridge with a grassy launch."
      },
      {
        "id": "eau-claire-mountain-bay-pull-off",
        "name": "Mountain-Bay State Trail pull-off alternate",
        "latitude": 44.896749,
        "longitude": -89.4788173,
        "mileFromStart": 2.1,
        "segmentKind": "creek",
        "note": "Optional alternate access in the WRT KML; use only if current parking and public access are clear."
      },
      {
        "id": "eau-claire-county-j-landing",
        "name": "County Highway J Landing",
        "latitude": 44.9014989,
        "longitude": -89.5057011,
        "mileFromStart": 4.1,
        "segmentKind": "creek",
        "note": "Default take-out from the WRT overview KML; WRT describes a popular bridge access southeast of the bridge."
      }
    ]
  },
  "eau-claire-river-county-j-ross-avenue": {
    "putIn": {
      "id": "eau-claire-county-j-landing",
      "name": "County Highway J Landing",
      "latitude": 44.9014989,
      "longitude": -89.5057011
    },
    "takeOut": {
      "id": "eau-claire-ross-avenue-access",
      "name": "Ross Avenue River Access",
      "latitude": 44.9183349,
      "longitude": -89.5518243
    },
    "logistics": {
      "distanceLabel": "About 3.7 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, longer with low water or rapid scouting",
      "shuttle": "Stage Ross Avenue first, then return to County J. Walk the Ross landing before launching because WRT guest notes warn the current can make the bridge-area take-out tricky around good-water levels.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, Village of Weston access postings, road-shoulder limits at County J, and private-bank boundaries.",
      "camping": "Treat this as a day route. No designated campsite is selected between County J and Ross Avenue, and residential/private banks should not be used for informal stops.",
      "campingClassification": "none",
      "summary": "Run the liveliest lower Eau Claire water-trail split from County J to the developed Ross Avenue access. The route is short but not casual: WRT documents boulder gardens, a Class II drop, nearly continuous rapids below County J, and a fast final approach to Ross when water is up.",
      "accessCaveats": [
        "County J is a bridge landing and should be checked for current bank, parking, and traffic conditions before launching.",
        "Ross Avenue is the planned take-out and a developed water-trail access; move left early above the bridges and do not drift past the intended landing.",
        "The Weston stage thresholds use gage height. Do not convert the WRT guest cfs comments into a separate app range without a current rating curve."
      ],
      "watchFor": [
        "Class I-II boulder gardens, one Class II drop in WRT photo notes, and nearly continuous rapids for roughly a half mile below County J.",
        "Fast current and a tricky river-left take-out at Ross when levels are near the guest-review good-water band.",
        "Strainers, wrong-channel choices through islands, private banks, and cold-water exposure."
      ]
    },
    "accessPoints": [
      {
        "id": "eau-claire-county-j-landing",
        "name": "County Highway J Landing",
        "latitude": 44.9014989,
        "longitude": -89.5057011,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from the WRT overview KML; use the bridge landing only after confirming parking and bank condition."
      },
      {
        "id": "eau-claire-ross-avenue-access",
        "name": "Ross Avenue River Access",
        "latitude": 44.9183349,
        "longitude": -89.5518243,
        "mileFromStart": 3.7,
        "segmentKind": "creek",
        "note": "Default take-out from Weston and WRT KML; Weston lists the Ross access and WRT describes it as a strong landing for paddlers and bike shuttles."
      }
    ]
  },
  "eau-claire-river-ross-avenue-yellow-banks": {
    "putIn": {
      "id": "eau-claire-ross-avenue-access",
      "name": "Ross Avenue River Access",
      "latitude": 44.9183349,
      "longitude": -89.5518243
    },
    "takeOut": {
      "id": "eau-claire-yellow-banks-park",
      "name": "Yellow Banks Park Launch",
      "latitude": 44.9281782,
      "longitude": -89.5740223
    },
    "logistics": {
      "distanceLabel": "About 2.7 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low water, debris, or access scouting",
      "shuttle": "Stage Yellow Banks Park first, then launch from Ross Avenue. Confirm the Yellow Banks landing from land before committing because this downstream split has less detailed practical reporting than the Club House-to-Ross route.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, Village of Weston park and launch postings, and private-bank boundaries.",
      "camping": "Treat this as a day route. No on-route camping is selected between Ross and Yellow Banks; use separate legal camping or lodging instead of informal riverbank sites.",
      "campingClassification": "none",
      "summary": "Continue from Ross Avenue to Yellow Banks Park for a short lower Eau Claire water-trail segment with public endpoints and a direct same-corridor stage gauge. The route is useful but source coverage is thinner below Ross, so scout for debris, snags, low-water side channels, and the Yellow Banks landing before launching.",
      "accessCaveats": [
        "Ross Avenue is a developed access with gauge and trail context; still check the landing for high current and crowding before launching.",
        "Yellow Banks Park is the selected take-out. Weston lists Yellow Banks Launch at 3903 Northwestern Avenue and local sources document recent launch improvements, but paddlers should verify the current launch condition.",
        "Do not continue downstream toward the Eau Claire River Conservancy, flowage, Drott Street, or Brooks & Ross Dam without a separate route plan and portage/take-out decision."
      ],
      "watchFor": [
        "Possible rapids, debris, snags, and shallow or side-channel route choices below Ross.",
        "Low-water walking below the Weston 0.5 ft floor and pushier water above the 2 ft experienced-paddler threshold.",
        "Private banks, limited bailout choices, cold water, and increased exposure if the group misses Yellow Banks."
      ]
    },
    "accessPoints": [
      {
        "id": "eau-claire-ross-avenue-access",
        "name": "Ross Avenue River Access",
        "latitude": 44.9183349,
        "longitude": -89.5518243,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from Weston and WRT KML."
      },
      {
        "id": "eau-claire-yellow-banks-park",
        "name": "Yellow Banks Park Launch",
        "latitude": 44.9281782,
        "longitude": -89.5740223,
        "mileFromStart": 2.7,
        "segmentKind": "creek",
        "note": "Default take-out from Weston launch listing and WRT overview KML; verify current landing condition before launching."
      }
    ]
  },
  "crawfish-river-columbus-astico": {
    "putIn": {
      "id": "udey-street-dam-columbus",
      "name": "Udey Street Dam / Campbell Street access",
      "latitude": 43.33718,
      "longitude": -89.01019
    },
    "takeOut": {
      "id": "astico-park-crawfish-launch",
      "name": "Astico Park canoe/kayak launch",
      "latitude": 43.32613,
      "longitude": -88.94934
    },
    "logistics": {
      "distanceLabel": "About 8.5 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4.5 hr, longer with portages, wind, or fishing stops",
      "shuttle": "Stage Astico Park first, then drive back to the Columbus access. Check Udey Dam outflow, the wastewater-plant alternate landing, and the Astico take-out before unloading.",
      "permits": "No route-specific paddling permit is known. Astico Park camping or vehicle rules may apply at the take-out; follow posted city, county, and Wisconsin boating/PFD rules.",
      "camping": "Astico Park has endpoint campground support with campsites, showers, restrooms, potable water, and a dump station. Do not assume legal camping on private banks between Columbus and Astico.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch below Udey Dam in Columbus and paddle the livelier upper Crawfish split to Astico Park. Low to moderate water shows riffles and boulders best, but wood and the downstream gauge lag require visual checks.",
      "accessCaveats": [
        "Udey Dam is not the place to improvise. Launch below dam influence only when the outflow and banks are manageable.",
        "Wisconsin River Trips says most paddlers in Columbus use the wastewater plant landing; use that lower start if the dam-adjacent start is too pushy or woody.",
        "Astico Park has a launch, rentals, and campground context, but confirm seasonal access, fees, and park rules before relying on it for overnight support."
      ],
      "watchFor": [
        "Two minor logjams below Udey and a more serious logjam below the wastewater plant that may require portaging.",
        "Fast current just below the dam and in the wooded south-of-Tiedt Road section.",
        "Open-river wind, muddy high water, wastewater-plant water-quality context, private banks, and downstream Danville Dam if you miss the planned park exit."
      ]
    },
    "accessPoints": [
      {
        "id": "udey-street-dam-columbus",
        "name": "Udey Street Dam / Campbell Street access",
        "latitude": 43.33718,
        "longitude": -89.01019,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from Miles Paddled GPS; launch below dam influence only after a same-day outflow check."
      },
      {
        "id": "astico-park-crawfish-launch",
        "name": "Astico Park canoe/kayak launch",
        "latitude": 43.32613,
        "longitude": -88.94934,
        "mileFromStart": 8.5,
        "segmentKind": "creek",
        "note": "Default take-out and campground support at Dodge County Astico Park."
      }
    ]
  },
  "crawfish-river-county-i-county-g": {
    "putIn": {
      "id": "county-road-i-crawfish-landing",
      "name": "County Road I Glacial Heritage Area landing",
      "latitude": 43.25623,
      "longitude": -88.93943
    },
    "takeOut": {
      "id": "county-road-g-crawfish-landing",
      "name": "County Road G Glacial Heritage Area landing",
      "latitude": 43.2343,
      "longitude": -88.88654
    },
    "logistics": {
      "distanceLabel": "About 6.75 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, slower into a headwind",
      "shuttle": "Stage County Road G first, then return to County Road I. Confirm signed Glacial Heritage / wildlife-area access and parking before launching.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, DNR wildlife-area postings, hunting-season visibility needs, and private-property limits.",
      "camping": "No on-route camping is documented for this short wildlife-area float. Treat it as a day route and do not camp on private banks, farm edges, or wildlife-area land unless separately posted and legal.",
      "campingClassification": "none",
      "summary": "Float the quieter middle Crawfish from County Road I to County Road G through Glacial Heritage Area and Waterloo Wildlife Area context. This is beginner flatwater, but wind and muddy banks still matter.",
      "accessCaveats": [
        "Miles Paddled identifies both endpoints as official Glacial Heritage Area landings, with designated parking at the take-out.",
        "Expect scattered public parcels rather than continuous public shoreline. Stop only where legal and clearly appropriate.",
        "The Milford gauge is downstream. Use it for broad low-water context, then make a local wind and bank-condition call."
      ],
      "watchFor": [
        "Headwind on slow open water, soft banks, and silty landings.",
        "Private agricultural frontage and hunting-season visibility around wildlife-area parcels.",
        "Backwaters and side channels that can distract from the main route if the group is not navigating deliberately."
      ]
    },
    "accessPoints": [
      {
        "id": "county-road-i-crawfish-landing",
        "name": "County Road I Glacial Heritage Area landing",
        "latitude": 43.25623,
        "longitude": -88.93943,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; Miles Paddled lists this GPS point and official Glacial Heritage Area landing context."
      },
      {
        "id": "county-road-g-crawfish-landing",
        "name": "County Road G Glacial Heritage Area landing",
        "latitude": 43.2343,
        "longitude": -88.88654,
        "mileFromStart": 6.75,
        "segmentKind": "creek",
        "note": "Default take-out with designated parking in Waterloo Wildlife Area context."
      }
    ]
  },
  "crawfish-river-aztalan-riverfront": {
    "putIn": {
      "id": "aztalan-state-park-crawfish-launch",
      "name": "Aztalan State Park Crawfish River launch",
      "latitude": 43.0736,
      "longitude": -88.8647
    },
    "takeOut": {
      "id": "riverfront-park-jefferson-carry-in",
      "name": "Riverfront Park Jefferson carry-in",
      "latitude": 43.00194,
      "longitude": -88.81361
    },
    "logistics": {
      "distanceLabel": "About 7.4 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr, longer with wind or Goat Island side exploration",
      "shuttle": "Stage Riverfront Park in Jefferson first, then launch from Aztalan State Park. Use the park trail to the river and identify the best launch spot before carrying boats down.",
      "permits": "No route-specific paddling permit is known. A Wisconsin state park vehicle admission sticker or fee may apply at Aztalan; follow DNR, City of Jefferson, and Wisconsin boating/PFD rules.",
      "camping": "Treat this as a day route. Aztalan State Park is day-use/picnic context for this paddle, and no on-route campsite was verified between Aztalan and Riverfront Park.",
      "campingClassification": "none",
      "summary": "Launch at Aztalan State Park and take out at Riverfront Park in Jefferson for the lower Crawfish boulder-garden and confluence route. The route is easy, but finish discipline matters near the Rock River and Jefferson dam context.",
      "accessCaveats": [
        "WRT says the obvious end of the Aztalan trail can be shallow and partly blocked; use the better nearby side-trail launch if conditions match that report.",
        "Riverfront Park is the planned take-out. Do not continue around the Jefferson dam, fish-passage, or Rock River structures without a separate route plan.",
        "Check wind direction; this open lower Crawfish reach can be slow into a headwind."
      ],
      "watchFor": [
        "Shallow spots, boulder gardens, muddy high water, and wind on broad sections.",
        "Private banks and developed riverfront edges approaching Jefferson.",
        "The Crawfish/Rock confluence, Goat Island side trip temptation, and nearby dam context at the finish."
      ]
    },
    "accessPoints": [
      {
        "id": "aztalan-state-park-crawfish-launch",
        "name": "Aztalan State Park Crawfish River launch",
        "latitude": 43.0736,
        "longitude": -88.8647,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in in DNR Aztalan State Park; use the signed parking and river-access trail."
      },
      {
        "id": "riverfront-park-jefferson-carry-in",
        "name": "Riverfront Park Jefferson carry-in",
        "latitude": 43.00194,
        "longitude": -88.81361,
        "mileFromStart": 7.4,
        "segmentKind": "creek",
        "note": "Default take-out at the Crawfish/Rock confluence with parking per Rock River Trail access documentation."
      }
    ]
  },
  "cedar-creek-covered-bridge-lions": {
    "putIn": {
      "id": "covered-bridge-park-cedar-creek",
      "name": "Covered Bridge Park Cedar Creek access",
      "latitude": 43.3152,
      "longitude": -88.0024
    },
    "takeOut": {
      "id": "grafton-lions-park-cedar-creek",
      "name": "Grafton Lions Park Cedar Creek access",
      "latitude": 43.3153,
      "longitude": -87.9537
    },
    "logistics": {
      "distanceLabel": "About 3.6 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr",
      "shuttle": "Stage Grafton Lions Park first, then drive back to Covered Bridge Park. Robin Court can split the route, but treat it as a neighborhood access that needs same-day parking and sign checks.",
      "permits": "No route-specific paddling permit is known. Follow Ozaukee County and Grafton park rules, Wisconsin boating/PFD rules, and any posted access or water-quality advisories.",
      "camping": "No on-route camping is documented for this short Cedar Creek day route. Use separate campground or lodging plans if needed.",
      "campingClassification": "none",
      "summary": "Launch at Covered Bridge Park and take out at Grafton Lions Park for the short Cedar Creek route above the more urban Cedarburg/dam corridor. The Cedarburg gauge is direct, but local rock, wood, and rain response still decide marginal days.",
      "accessCaveats": [
        "Covered Bridge Park is the clean start with county-listed kayak/canoe launch context; still verify current park hours and posted rules.",
        "Grafton Lions Park is the planned finish. Do not drift into the downstream Cedarburg/urban/dam-affected sections unless you have a separate route plan.",
        "Robin Court is useful only as a split or bailout if parking, signage, neighborhood access, and bank footing are clearly acceptable."
      ],
      "watchFor": [
        "Shallow rocks, scraping, and awkward footing near the lower end of the selected stage window.",
        "Fast current and less recovery room above the high-water caution around 6.5 ft.",
        "Strainers, slick limestone, storm runoff, private banks, urban water-quality concerns, and cold water outside summer."
      ]
    },
    "accessPoints": [
      {
        "id": "covered-bridge-park-cedar-creek",
        "name": "Covered Bridge Park Cedar Creek access",
        "latitude": 43.3152,
        "longitude": -88.0024,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the county-listed park launch."
      },
      {
        "id": "robin-court-cedar-creek-access",
        "name": "Robin Court Cedar Creek access",
        "latitude": 43.3115,
        "longitude": -87.9684,
        "mileFromStart": 2.4,
        "segmentKind": "creek",
        "note": "Optional split / bailout access; verify parking and signs first."
      },
      {
        "id": "grafton-lions-park-cedar-creek",
        "name": "Grafton Lions Park Cedar Creek access",
        "latitude": 43.3153,
        "longitude": -87.9537,
        "mileFromStart": 3.6,
        "segmentKind": "creek",
        "note": "Default take-out at the Village of Grafton kayak-access park."
      }
    ]
  },
  "root-river-five-mile-horlick": {
    "putIn": {
      "id": "five-mile-road-linwood-park-root",
      "name": "5 Mile Road / Linwood Park Root River access",
      "latitude": 42.79984,
      "longitude": -87.87081
    },
    "takeOut": {
      "id": "horlick-park-rapids-court-root",
      "name": "Horlick Park / Rapids Court canoe and kayak launch",
      "latitude": 42.7538,
      "longitude": -87.82322
    },
    "logistics": {
      "distanceLabel": "About 7.7 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer in low water",
      "shuttle": "Stage Horlick Park / Rapids Court first, then return to the 5 Mile Road / Linwood Park access. A bike shuttle is possible only if the group is comfortable with Racine-area traffic and urban crossings.",
      "permits": "No route-specific paddling permit is known. Follow Racine County park rules, Wisconsin boating/PFD rules, and any Horlick Park construction, dam-removal, or launch notices.",
      "camping": "No on-route camping is documented for this urban/suburban Root River reach. Treat it as a day paddle and use separate lodging or campground plans.",
      "campingClassification": "none",
      "summary": "Launch at 5 Mile Road / Linwood Park and take out at Horlick Park for the AW-listed Root River reach. The W. Eight Mile Road gauge currently runs below the selected minimum, so low-water scraping and a same-day visual check matter.",
      "accessCaveats": [
        "The 5 Mile Road access is source-backed by Miles Paddled and the AW reach name, but parking, bank footing, and park rules should be checked before unloading.",
        "Horlick Park is the take-out boundary. Do not continue into the Horlick dam-removal / downstream rapid corridor without a separate safety and access plan.",
        "Middle accesses around Highway 31 or Armstrong Park should be treated as bailouts only after confirming legal parking, bank footing, and any local construction restrictions."
      ],
      "watchFor": [
        "Shallow riffles, shoals, and dragging below the AW minimum flow.",
        "Fresh strainers, bridge debris, and pushier bends after Racine-area rain.",
        "Urban water-quality concerns, private/golf-course banks, cold shoulder-season water, and dam/no-continuation hazards near Horlick."
      ]
    },
    "accessPoints": [
      {
        "id": "five-mile-road-linwood-park-root",
        "name": "5 Mile Road / Linwood Park Root River access",
        "latitude": 42.79984,
        "longitude": -87.87081,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from Miles Paddled and the AW reach name."
      },
      {
        "id": "highway-31-ole-davidson-root",
        "name": "Highway 31 / Ole Davidson Road Root River access",
        "latitude": 42.7742,
        "longitude": -87.8461,
        "mileFromStart": 4.6,
        "segmentKind": "creek",
        "note": "Possible mid-route bailout near the WRT-described boulder-garden section."
      },
      {
        "id": "horlick-park-rapids-court-root",
        "name": "Horlick Park / Rapids Court canoe and kayak launch",
        "latitude": 42.7538,
        "longitude": -87.82322,
        "mileFromStart": 7.7,
        "segmentKind": "creek",
        "note": "Default take-out above the dam-removal / downstream rapid corridor."
      }
    ]
  },
  "beaver-dam-river-county-s-lowell": {
    "putIn": {
      "id": "county-road-s-leipsig-beaver-dam",
      "name": "County Road S / Leipsig Beaver Dam River access",
      "latitude": 43.40072,
      "longitude": -88.8661
    },
    "takeOut": {
      "id": "river-street-dam-lowell-beaver-dam",
      "name": "River Street Dam / Lowell take-out",
      "latitude": 43.34018,
      "longitude": -88.81961
    },
    "logistics": {
      "distanceLabel": "About 11.25 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr, longer with low water or wind",
      "shuttle": "Stage the River Street Dam / Lowell take-out first, then drive back to County Road S near Leipsig. County Road G is the direct shuttle spine but can carry fast traffic, so a vehicle shuttle is cleaner than a bike shuttle.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, Dodge County/local access signs, and do not block bridge shoulders, farm lanes, gates, or dam-area access.",
      "camping": "No on-route camping is documented for the County-S-to-Lowell segment. Treat this as a long day paddle unless a separate legal campground or lodging plan is confirmed.",
      "campingClassification": "none",
      "summary": "Launch at County Road S and finish at River Street Dam / Lowell for the lower Beaver Dam River day route. It is slower and less rapid-focused than the existing Cotton Mill-to-County-J card, but still depends on the same erratic direct gauge and same-day access checks.",
      "accessCaveats": [
        "County Road S is a practical bridge/access from Miles Paddled and WRT, not a staffed park. Confirm parking, road-shoulder safety, and bank footing before launching.",
        "This starts just upstream of the existing Cotton Mill Park-to-County Road J route. Treat County Road J as an intermediate access/route boundary and do not assume the two cards are one uninterrupted published trip without checking current access and water conditions.",
        "River Street Dam is the mandatory take-out boundary. Identify the exit line before the impoundment/dam area and do not continue around the dam casually.",
        "Meadow Road and other bridge options can shorten the route, but each needs same-day clearance, shoulder, and water-depth checks."
      ],
      "watchFor": [
        "Low water, dragging, and slow impoundment-style paddling when the Beaver Dam gauge is below the selected floor.",
        "Erratic upstream dam releases, rising water, wood, low Meadow Road clearance, farm debris, and private banks.",
        "Wind on wider water, algae or water-quality concerns, cold water, and fatigue over an 11-mile day."
      ]
    },
    "accessPoints": [
      {
        "id": "county-road-s-leipsig-beaver-dam",
        "name": "County Road S / Leipsig Beaver Dam River access",
        "latitude": 43.40072,
        "longitude": -88.8661,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from Miles Paddled; road-adjacent access checks required."
      },
      {
        "id": "meadow-road-beaver-dam-river",
        "name": "Meadow Road bridge access",
        "latitude": 43.3755,
        "longitude": -88.8492,
        "mileFromStart": 3.4,
        "segmentKind": "creek",
        "note": "Possible shorter-route access from Miles Paddled; verify bridge clearance and parking."
      },
      {
        "id": "river-street-dam-lowell-beaver-dam",
        "name": "River Street Dam / Lowell take-out",
        "latitude": 43.34018,
        "longitude": -88.81961,
        "mileFromStart": 11.25,
        "segmentKind": "creek",
        "note": "Default take-out at Lowell before dam-adjacent water."
      }
    ]
  },
  "sheboygan-river-johnsonville-dassow": {
    "putIn": {
      "id": "johnsonville-fire-station-sheboygan",
      "name": "Johnsonville Fire Department / Highway JM access",
      "latitude": 43.7847,
      "longitude": -87.9578
    },
    "takeOut": {
      "id": "dassow-park-sheboygan-river",
      "name": "Dassow Park river access",
      "latitude": 43.76766,
      "longitude": -87.89384
    },
    "logistics": {
      "distanceLabel": "6.4 mi",
      "estimatedPaddleTime": "About 3.5 hr to 4 hr, longer with scraping or scouting below the dam",
      "shuttle": "Stage Dassow Park first, then drive back to the public parking lot by the Johnsonville fire station. WRT notes a hilly but practical 3-mile bike shuttle with light traffic.",
      "permits": "No route-specific paddling permit is known. Use the named public access points, follow Wisconsin boating and PFD rules, and obey any posted fire-station, road-shoulder, or park parking signs.",
      "camping": "Treat this as a day route. No legal on-route public campsite was verified between Johnsonville and Dassow Park, and private or farm banks are not assumed legal overnight options.",
      "campingClassification": "none",
      "summary": "Launch below the Johnsonville low-head dam and take out at Dassow Park for a clear upper-Sheboygan riffle day with wooded banks, gravel shallows, and a conservative downstream Sheboygan gauge floor.",
      "accessCaveats": [
        "Do not launch above or run the Johnsonville low-head dam. Carry below it from the fire-station parking area and inspect the smaller downstream ledge before launching.",
        "Highway J and Highway M are WRT-listed alternate access points, but parking and bank conditions are less formal than Dassow Park. Verify before using them as bailouts.",
        "Neither endpoint has a full-service outfitter or facilities. Set the shuttle and backup contact before launching."
      ],
      "watchFor": [
        "Bumpy shallow riffles and possible wading at or below about 85 cfs on the downstream Sheboygan gauge.",
        "High or rising water at the launch ledges, strainers in bends, cold clear water, bridge current, and private or farm-bank limitations.",
        "Factory, farm, and water-quality context near Johnsonville; avoid contact after spills, storms, or visible contamination."
      ]
    },
    "accessPoints": [
      {
        "id": "johnsonville-fire-station-sheboygan",
        "name": "Johnsonville Fire Department / Highway JM access",
        "latitude": 43.7847,
        "longitude": -87.9578,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default WRT put-in; carry below the Johnsonville low-head dam before launching."
      },
      {
        "id": "highway-j-sheboygan-river",
        "name": "Highway J bridge access",
        "latitude": 43.781,
        "longitude": -87.9325,
        "mileFromStart": 2.4,
        "segmentKind": "creek",
        "note": "Alternate access from the WRT overview; verify parking and bank conditions."
      },
      {
        "id": "highway-m-sheboygan-river",
        "name": "Highway M bridge access",
        "latitude": 43.7749,
        "longitude": -87.9105,
        "mileFromStart": 4.6,
        "segmentKind": "creek",
        "note": "Alternate access and low-water bailout near the shallow middle riffles."
      },
      {
        "id": "dassow-park-sheboygan-river",
        "name": "Dassow Park river access",
        "latitude": 43.76766,
        "longitude": -87.89384,
        "mileFromStart": 6.4,
        "segmentKind": "creek",
        "note": "Default public take-out with parking."
      }
    ]
  },
  "sheboygan-river-dassow-river-park": {
    "putIn": {
      "id": "dassow-park-sheboygan-river",
      "name": "Dassow Park river access",
      "latitude": 43.76766,
      "longitude": -87.89384
    },
    "takeOut": {
      "id": "river-park-sheboygan-falls",
      "name": "River Park canoe ramp",
      "latitude": 43.72924,
      "longitude": -87.81406
    },
    "logistics": {
      "distanceLabel": "About 10 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr, depending on riffles, stops, and low-water scraping",
      "shuttle": "Stage River Park in Sheboygan Falls first, then drive back to Dassow Park. Confirm the downstream take-out before launch because the route finishes above the Sheboygan Falls / dam hazard area.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating and PFD rules plus posted city, county, and park parking instructions at Dassow Park and River Park.",
      "camping": "Treat this as a day route. No public on-route campsite was verified between Dassow Park and River Park, and private or urban banks are not assumed legal stopping places.",
      "campingClassification": "none",
      "summary": "Continue downstream from Dassow Park toward Sheboygan Falls and exit at River Park for a longer middle-river day with steady riffles, shallow boulders, and a clear mandatory-takeout plan before the falls and dam corridor.",
      "accessCaveats": [
        "River Park is the selected public take-out before the Sheboygan Falls / dam sequence. Do not continue downstream casually.",
        "Highway TT and Highway C are corridor references rather than fully confirmed primary landings; scout before using either as a bailout.",
        "Dassow Park is a clean public start, but low water can make the first miles slow and scratchy."
      ],
      "watchFor": [
        "Scraping below 170 cfs and a better-moving window around 200 to 300 cfs on the downstream Sheboygan gauge.",
        "Pushier current, hidden boulders, and more consequential bridge approaches around 400 cfs or on a rising hydrograph.",
        "Strainers, cold water, private banks, urban water-quality concerns, and the downstream falls/dam hazard if the take-out is missed."
      ]
    },
    "accessPoints": [
      {
        "id": "dassow-park-sheboygan-river",
        "name": "Dassow Park river access",
        "latitude": 43.76766,
        "longitude": -87.89384,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default public put-in and shared endpoint with the Johnsonville-to-Dassow card."
      },
      {
        "id": "highway-tt-sheboygan-river",
        "name": "Highway TT bridge access",
        "latitude": 43.7509,
        "longitude": -87.8619,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Possible midpoint access from the WRT lower-Sheboygan overview; verify roadside legality and landing condition."
      },
      {
        "id": "highway-c-sheboygan-river",
        "name": "Highway C bridge access",
        "latitude": 43.7383,
        "longitude": -87.8341,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Late-route bridge reference before Sheboygan Falls; scout before relying on it as a take-out."
      },
      {
        "id": "river-park-sheboygan-falls",
        "name": "River Park canoe ramp",
        "latitude": 43.72924,
        "longitude": -87.81406,
        "mileFromStart": 10,
        "segmentKind": "creek",
        "note": "Default public take-out with parking before the Sheboygan Falls / dam hazard sequence."
      }
    ]
  },
  "kickapoo-river-highway-b-highway-s": {
    "putIn": {
      "id": "highway-b-kickapoo-canoe-landing",
      "name": "County Highway B Canoe Landing",
      "latitude": 43.35219,
      "longitude": -90.8408
    },
    "takeOut": {
      "id": "highway-s-kickapoo-canoe-landing",
      "name": "County Highway S Canoe Landing",
      "latitude": 43.27417,
      "longitude": -90.84119
    },
    "logistics": {
      "distanceLabel": "8.6 mi",
      "estimatedPaddleTime": "About 4 hr, longer with the Gays Mills dam portage or muddy landings",
      "shuttle": "Stage County Highway S first, then drive back to County Highway B. WRT notes the bike shuttle is pleasant; the two landing coordinates come from its route-shuttle map and named public accesses.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating and PFD rules, Crawford County landing signs, and any posted Gays Mills park, portage, or parking rules.",
      "camping": "Treat this as a day route. Lower Kickapoo town or private campground options may support a separate base-camp plan, but no legal on-route public campsite is selected between Highway B and Highway S.",
      "campingClassification": "none",
      "summary": "Launch at the County Highway B public canoe landing, portage the Gays Mills low-head dam, and finish at County Highway S for a Lower Kickapoo day with fast current, bluffs, strainers, muddy banks, and a direct Steuben stage ladder.",
      "accessCaveats": [
        "The Highway B and Highway S landings are public but can be muddy. Inspect the exit at Highway S before launching.",
        "Robb Park below the Gays Mills dam can split the route, but this card includes the full Highway B-to-Highway S day and mandatory portage.",
        "Do not continue below Highway S unless a separate lower-Kickapoo route, shuttle, and high-water decision are planned."
      ],
      "watchFor": [
        "The Gays Mills low-head dam is a mandatory portage on the east-bank path. Do not run the dam.",
        "Fast current and submerged logs, especially in the first two miles and when the Steuben stage is rising.",
        "High water above the WRT 7.5 ft caution, muddy banks, cold water, remote bailout spacing, pasture edges, and private land away from public accesses."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-b-kickapoo-canoe-landing",
        "name": "County Highway B Canoe Landing",
        "latitude": 43.35219,
        "longitude": -90.8408,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default public put-in south/downstream of the Highway B bridge."
      },
      {
        "id": "gays-mills-dam-portage",
        "name": "Gays Mills low-head dam portage",
        "latitude": 43.3144,
        "longitude": -90.8485,
        "mileFromStart": 4,
        "segmentKind": "transition",
        "note": "Mandatory east-bank portage around the dangerous low-head dam."
      },
      {
        "id": "robb-park-gays-mills",
        "name": "Robb Park canoe landing",
        "latitude": 43.313,
        "longitude": -90.8492,
        "mileFromStart": 4.2,
        "segmentKind": "creek",
        "note": "Public alternate put-in below the dam or bailout after the portage."
      },
      {
        "id": "highway-s-kickapoo-canoe-landing",
        "name": "County Highway S Canoe Landing",
        "latitude": 43.27417,
        "longitude": -90.84119,
        "mileFromStart": 8.6,
        "segmentKind": "creek",
        "note": "Default public take-out east/upstream of the Highway S bridge."
      }
    ]
  },
  "east-branch-pecatonica-gordon-creek-river-road": {
    "putIn": {
      "id": "gordon-creek-boat-ramp",
      "name": "Gordon Creek Boat Ramp",
      "latitude": 42.810246,
      "longitude": -89.864127
    },
    "takeOut": {
      "id": "river-road-thunder-bridge-landing",
      "name": "River Road / Thunder Bridge Landing",
      "latitude": 42.75567,
      "longitude": -89.88728
    },
    "logistics": {
      "distanceLabel": "About 9.5 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr, longer with wood scouting or a muddy take-out",
      "shuttle": "Stage at the River Road / Thunder Bridge landing north of Argyle, then launch from Gordon Creek Boat Ramp below Blanchardville. Use Highway 78 only as a gauge/visual checkpoint unless your group has independently confirmed parking and access.",
      "permits": "No route-specific paddling permit is known. Use public or customary landings only, follow Wisconsin boating/PFD rules, and respect private banks, pasture edges, and bridge approaches.",
      "camping": "Treat this as a day trip. Blackhawk Memorial Park and Yellowstone Lake State Park can support nearby base-camp planning, but no legal on-route camping was verified between Blanchardville and River Road.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch below Blanchardville at Gordon Creek Boat Ramp and paddle the lower East Branch Pecatonica through the Highway 78 gauge corridor to River Road. The best scenery is below Highway 78; the main practical calls are level, wood, mud, and staying off private banks.",
      "accessCaveats": [
        "Gordon Creek is the public/default start below the Blanchardville dam area. Do not launch above the dam for this route.",
        "Highway 78 is retained as a direct gauge and visual checkpoint, but it is not the default launch because access and parking are weaker than Gordon Creek.",
        "River Road / Thunder Bridge has a muddy landing. Scout it from land before launching so the exit is obvious from the river."
      ],
      "watchFor": [
        "Deadfall and possible portages in the Highway 78-to-River Road split, especially after storms or high water.",
        "Low-water riffles below about 90 cfs and pushier wood consequences near or above the 360 cfs highest-recommended source level.",
        "Private pasture banks, farm-field edges, bridge debris, cold water outside summer, and a rural rescue setting."
      ]
    },
    "accessPoints": [
      {
        "id": "gordon-creek-boat-ramp",
        "name": "Gordon Creek Boat Ramp",
        "latitude": 42.810246,
        "longitude": -89.864127,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default public put-in just downstream from Blanchardville."
      },
      {
        "id": "highway-78-blanchardville-gauge",
        "name": "Highway 78 bridge / Blanchardville USGS gauge",
        "latitude": 42.78557,
        "longitude": -89.86146,
        "mileFromStart": 3.5,
        "segmentKind": "creek",
        "note": "Direct USGS gauge and intermediate visual checkpoint; not the default launch because access and parking are weaker."
      },
      {
        "id": "river-road-thunder-bridge-landing",
        "name": "River Road / Thunder Bridge Landing",
        "latitude": 42.75567,
        "longitude": -89.88728,
        "mileFromStart": 9.5,
        "segmentKind": "creek",
        "note": "Default take-out north of Argyle; expect mud and confirm the landing before launching."
      }
    ]
  },
  "east-branch-pecatonica-river-road-argyle": {
    "putIn": {
      "id": "river-road-thunder-bridge-landing",
      "name": "River Road / Thunder Bridge Landing",
      "latitude": 42.75567,
      "longitude": -89.88728
    },
    "takeOut": {
      "id": "argyle-highway-81-boat-launch",
      "name": "Argyle Highway 81 Boat Launch",
      "latitude": 42.70186,
      "longitude": -89.8707
    },
    "logistics": {
      "distanceLabel": "About 7 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, slower when low or windy near Argyle",
      "shuttle": "Stage the take-out at the Argyle boat launch before driving back to River Road / Thunder Bridge. Confirm you are using the upstream/above-dam landing for this route and not setting up an accidental dam approach.",
      "permits": "No route-specific paddling permit is known. Follow posted Village of Argyle landing rules, Wisconsin boating/PFD rules, and private-property limits along the farms and golf-course corridor.",
      "camping": "Treat this as a day trip. Blackhawk Memorial Park and Yellowstone Lake State Park are nearby base-camp options, but no on-route camping is assumed between River Road and Argyle.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at River Road / Thunder Bridge and paddle the popular lower East Branch split to the Argyle boat launch. It is generally gentle, but the final mile slows near the village dam influence, so the planned take-out matters.",
      "accessCaveats": [
        "River Road is a public/customary paddling landing but can be muddy. Walk the take-out/put-in zone before unloading.",
        "The Argyle finish is the required take-out for this route. Do not continue downstream into the village dam corridor unless you have a separate below-dam route plan.",
        "Stay off golf-course, pasture, and residential banks except in an emergency."
      ],
      "watchFor": [
        "Deadfall that is usually passable but can become a strainer or portage after storms.",
        "Low-water mud and riffles below about 90 cfs at Blanchardville.",
        "Dam-influenced slack water near Argyle, occasional small-motorboat use, private banks, and cold water outside summer."
      ]
    },
    "accessPoints": [
      {
        "id": "river-road-thunder-bridge-landing",
        "name": "River Road / Thunder Bridge Landing",
        "latitude": 42.75567,
        "longitude": -89.88728,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default public/customary put-in north of Argyle."
      },
      {
        "id": "argyle-highway-81-boat-launch",
        "name": "Argyle Highway 81 Boat Launch",
        "latitude": 42.70186,
        "longitude": -89.8707,
        "mileFromStart": 7,
        "segmentKind": "creek",
        "note": "Default take-out above the village dam corridor."
      }
    ]
  },
  "east-branch-pecatonica-argyle-blackhawk": {
    "putIn": {
      "id": "argyle-river-street-landing",
      "name": "Argyle River Street Landing",
      "latitude": 42.69974,
      "longitude": -89.86967
    },
    "takeOut": {
      "id": "blackhawk-memorial-park-landing",
      "name": "Blackhawk Memorial Park Landing",
      "latitude": 42.65683,
      "longitude": -89.87819
    },
    "logistics": {
      "distanceLabel": "About 7.8 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low water or wood scouting",
      "shuttle": "Stage at Blackhawk Memorial Park / Woodford, then launch from the correct below-dam Argyle landing for this downstream route. Walk the Argyle riverfront first so the dam boundary and launch side are unambiguous.",
      "permits": "No route-specific paddling permit is known. Follow Village of Argyle and Blackhawk Memorial Park rules, Wisconsin boating/PFD rules, and private-bank limits.",
      "camping": "Blackhawk Memorial Park has primitive camping at the take-out area and is the cleanest overnight support for this route. Do not assume legal camping on private banks or bars between Argyle and Blackhawk.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch below the Argyle dam corridor and paddle a short lower-East-Branch day to Blackhawk Memorial Park. This is a campground-friendly route when the Blanchardville gauge is at or above the conservative floor, but it still needs wood and private-bank discipline.",
      "accessCaveats": [
        "Confirm the below-dam Argyle landing. The upstream Argyle launch serves the River Road-to-Argyle route, while this route starts below the village dam corridor.",
        "Blackhawk Memorial Park is the planned endpoint and campground support. Identify the landing from land before shuttling because the lower banks can be muddy and vegetated.",
        "Do not casually continue below Blackhawk / Woodford; source notes warn that farther downstream can add frustrating deadfall."
      ],
      "watchFor": [
        "The Argyle low-head-dam boundary and choosing the correct launch side.",
        "Strainers, partial logjams, low-water mud, and steep private banks.",
        "Cold water, rural rescue exposure, and changing conditions after rain."
      ]
    },
    "accessPoints": [
      {
        "id": "argyle-river-street-landing",
        "name": "Argyle River Street Landing",
        "latitude": 42.69974,
        "longitude": -89.86967,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default below-dam put-in for the downstream Blackhawk route."
      },
      {
        "id": "blackhawk-memorial-park-landing",
        "name": "Blackhawk Memorial Park Landing",
        "latitude": 42.65683,
        "longitude": -89.87819,
        "mileFromStart": 7.8,
        "segmentKind": "creek",
        "note": "Default take-out and endpoint campground support near Woodford."
      }
    ]
  },
  "manitowoc-river-clark-mills-county-s": {
    "putIn": {
      "id": "clarks-mills-dam-carry-in",
      "name": "Clarks Mills Dam carry-in below dam",
      "latitude": 44.0909,
      "longitude": -87.8617
    },
    "takeOut": {
      "id": "manitowoc-county-road-s-game-protection-site",
      "name": "County Road S / Manitowoc County Game Protection Site",
      "latitude": 44.09895,
      "longitude": -87.82211
    },
    "logistics": {
      "distanceLabel": "About 2.7 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer if scouting or portaging Lower Cato Falls",
      "shuttle": "Stage the County Road S / Game Protection Site take-out first, then launch only from the carry-in below Clarks Mills Dam. Walk the take-out and scout Lower Cato Falls from Lower Cato Falls County Park before committing.",
      "permits": "No route-specific paddling permit is known. Use the named public water-trail accesses, follow Wisconsin boating/PFD rules, and respect county, dam, and private-property postings.",
      "camping": "Treat this as a day route. No designated on-route campsite is selected between Clarks Mills Dam and County Road S; use separate Manitowoc-area or state-forest camping only if independently reserved and current.",
      "campingClassification": "none",
      "summary": "Launch below Clarks Mills Dam for the short ledgy upper-Manitowoc segment to County Road S. The reach is compact but not casual: Lower Cato Falls, boulder gardens, private banks, and water-quality issues after rain all need a conservative scout.",
      "accessCaveats": [
        "MRW lists the Clarks Mills site as a carry-in just below the dam with adjacent parking; do not launch upstream of the dam.",
        "Lower Cato Falls County Park provides the scout/portage context, but MRW describes its river access as difficult because of steep slopes.",
        "County Road S / Game Protection Site is the selected take-out; verify parking and footing before launching because flows and mud can change access quality."
      ],
      "watchFor": [
        "Clarks Mills Dam exposure at the put-in; stay downstream and away from dam hydraulics.",
        "Lower Cato Falls, boulder ledges, fast current, strainers, and pushier water above the WRT recreational window.",
        "Manure runoff or other water-quality concerns after rain, plus private banks and limited legal bailout choices."
      ]
    },
    "accessPoints": [
      {
        "id": "clarks-mills-dam-carry-in",
        "name": "Clarks Mills Dam carry-in below dam",
        "latitude": 44.0909,
        "longitude": -87.8617,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; MRW identifies a carry-in just below Clarks Mills Dam on the north side with adjacent parking."
      },
      {
        "id": "lower-cato-falls-county-park",
        "name": "Lower Cato Falls County Park",
        "latitude": 44.0903,
        "longitude": -87.8439,
        "mileFromStart": 1.2,
        "segmentKind": "creek",
        "note": "Scout and possible portage context for Lower Cato Falls; MRW warns the carry-in is difficult because of steep slopes."
      },
      {
        "id": "manitowoc-county-road-s-game-protection-site",
        "name": "County Road S / Manitowoc County Game Protection Site",
        "latitude": 44.09895,
        "longitude": -87.82211,
        "mileFromStart": 2.7,
        "segmentKind": "creek",
        "note": "Default take-out; MRW lists this as the Manitowoc County Park and Game Protection Site, and route sources use County Road S as the public access."
      }
    ]
  },
  "manitowoc-river-county-s-north-union": {
    "putIn": {
      "id": "manitowoc-county-road-s-game-protection-site",
      "name": "County Road S / Manitowoc County Game Protection Site",
      "latitude": 44.09895,
      "longitude": -87.82211
    },
    "takeOut": {
      "id": "manitowoc-north-union-road-access",
      "name": "North Union Road access",
      "latitude": 44.1007,
      "longitude": -87.7657
    },
    "logistics": {
      "distanceLabel": "About 3.5 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer with low water or wood scouting",
      "shuttle": "Stage at North Union Road, then launch from the County Road S / Game Protection Site. This is a short rural shuttle, but both accesses should be checked from land because roadside parking and muddy footing are limited.",
      "permits": "No route-specific paddling permit is known. Use the named public water-trail accesses, follow Wisconsin boating/PFD rules, and respect Manitowoc River water-trail, county, road-shoulder, and private-property postings.",
      "camping": "Treat this as a day route. No designated on-route campsite is selected between County Road S and North Union Road, and private banks should not be used for camping or casual exits.",
      "campingClassification": "none",
      "summary": "Continue from County Road S to North Union Road for a short Manitowoc water-trail run below the Cato ledges. The route is useful as its own half-day paddle or as a connector, but shallow ledges, strainers, fast rises, and private banks keep it in a caution profile.",
      "accessCaveats": [
        "MRW lists County Road S, County Road H, and North Union Road as consecutive public water-trail access sites.",
        "North Union Road has limited roadside parking in the official access inventory; stage compactly and leave room for local traffic.",
        "County Road S and North Union coordinates are access anchors, not promises that every water level creates an easy bank landing."
      ],
      "watchFor": [
        "Riffles, boulder gardens, strainers, and bridge debris after rain.",
        "Low-water scraping below the WRT useful band and pushy, dirty water above the high/whitewater-only range.",
        "Private banks and few public bailout options between the named access points."
      ]
    },
    "accessPoints": [
      {
        "id": "manitowoc-county-road-s-game-protection-site",
        "name": "County Road S / Manitowoc County Game Protection Site",
        "latitude": 44.09895,
        "longitude": -87.82211,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; MRW and route sources identify County Road S as a public Manitowoc water-trail access."
      },
      {
        "id": "manitowoc-north-union-road-access",
        "name": "North Union Road access",
        "latitude": 44.1007,
        "longitude": -87.7657,
        "mileFromStart": 3.5,
        "segmentKind": "creek",
        "note": "Default take-out; MRW lists North Union Road as a water-trail access with limited roadside parking."
      }
    ]
  },
  "manitowoc-river-north-union-mill-road": {
    "putIn": {
      "id": "manitowoc-north-union-road-access",
      "name": "North Union Road access",
      "latitude": 44.1007,
      "longitude": -87.7657
    },
    "takeOut": {
      "id": "manitowoc-river-public-access-mill-road",
      "name": "Manitowoc River Public Access / Mill Road",
      "latitude": 44.09673,
      "longitude": -87.70258
    },
    "logistics": {
      "distanceLabel": "About 11.3 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, fishing, or rapid scouting",
      "shuttle": "Stage at Manitowoc River Public Access near Mill Road/North Rapids Road, then launch from North Union Road. Scout the take-out first because sources warn the public access can be difficult or impossible at some levels.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Wisconsin boating/PFD rules, and obey county park, road-shoulder, and private-property postings.",
      "camping": "Treat this as a long day route. No designated on-route campsite is selected between North Union and the public access; use separate Manitowoc-area lodging or campground reservations rather than informal bank camping.",
      "campingClassification": "none",
      "summary": "Paddle the longer lower-Manitowoc continuation from North Union Road to the Mill Road public access. This is a committed day with the I-43 rapid complex, boulder gardens, private banks, water-quality caveats, and a direct-gauge floor rather than an invented upper cutoff.",
      "accessCaveats": [
        "MRW lists North Union Road and Manitowoc River Public Access as downstream water-trail sites, and Manitowoc County identifies the river access west of the County R bridge.",
        "Miles Paddled publishes GPS for the Mill Road public access and cautions that the lower access can be poor depending on water level.",
        "North Union has limited roadside parking; the Mill Road access has park-style support but should still be checked before the shuttle."
      ],
      "watchFor": [
        "A nearly mile-long Class I-II rapid and boulder-garden area around I-43, especially at higher whitewater flows.",
        "Low-water scraping below the selected 250 cfs floor, fresh strainers, bridge debris, and fast rises after rain.",
        "Private banks, limited exits, cold spring water, and manure-runoff water-quality concerns after storms."
      ]
    },
    "accessPoints": [
      {
        "id": "manitowoc-north-union-road-access",
        "name": "North Union Road access",
        "latitude": 44.1007,
        "longitude": -87.7657,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; MRW lists North Union Road as a water-trail access with limited roadside parking."
      },
      {
        "id": "manitowoc-river-public-access-mill-road",
        "name": "Manitowoc River Public Access / Mill Road",
        "latitude": 44.09673,
        "longitude": -87.70258,
        "mileFromStart": 11.3,
        "segmentKind": "creek",
        "note": "Default take-out; MRW and Manitowoc County identify this as a public access, and Miles Paddled publishes the access GPS."
      }
    ]
  },
  "yahara-river-highway-n-highway-59": {
    "putIn": {
      "id": "highway-n-dunkirk-yahara",
      "name": "Highway N bridge access below Dunkirk Dam",
      "latitude": 42.8788522,
      "longitude": -89.210117
    },
    "takeOut": {
      "id": "highway-59-fulton-yahara-gauge",
      "name": "Highway 59 / Yahara River near Fulton gauge access",
      "latitude": 42.82638889,
      "longitude": -89.1719444
    },
    "logistics": {
      "distanceLabel": "About 6.9 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer in low water",
      "shuttle": "Stage Highway 59 first, then return to Highway N below Dunkirk. A vehicle shuttle is cleaner than relying on narrow rural shoulders, and Highway 59 also gives a same-day look at the selected gauge corridor.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, avoid blocking bridge shoulders or farm access, and obey any posted bridge, dam, or construction restrictions.",
      "camping": "Treat this as a day route. No on-route camping is documented, and banks outside public bridge/access areas should be treated as private unless clearly signed otherwise.",
      "campingClassification": "none",
      "summary": "Launch from Highway N below Dunkirk Dam and continue through the Stebbinsville recovery reach to Highway 59. This avoids using Stebbinsville as a default endpoint while preserving the best lower-Yahara riffles and boulder gardens.",
      "accessCaveats": [
        "Highway N is the planned launch because WRT describes it as better than starting at Dunkirk Dam. Stay downstream of the dam/intake unless a separate scout and portage plan is intentional.",
        "Stebbinsville Road is an intermediate reference only. Do not plan it as the routine take-out because recent sources document private-property conflict and signage there.",
        "Highway 59 is the planned take-out and the live Fulton gauge location. Confirm bank footing, traffic, parking, and any posted access limits from land before launching."
      ],
      "watchFor": [
        "Shallow riffles and boulder gardens below the WRT 201-400 cfs target range.",
        "Hidden rocks, faster current, and reduced recovery room when the Fulton gauge moves into WRT high or very-high ranges.",
        "Wood, strainers, storm debris, private banks, cold shoulder-season water, and water-quality concerns after rain or Badfish/MMSD flow changes."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-n-dunkirk-yahara",
        "name": "Highway N bridge access below Dunkirk Dam",
        "latitude": 42.8788522,
        "longitude": -89.210117,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from WRT; stay below the Dunkirk Dam boundary."
      },
      {
        "id": "west-stebbinsville-road-yahara-reference",
        "name": "West Stebbinsville Road reference access",
        "latitude": 42.8436573,
        "longitude": -89.1731816,
        "mileFromStart": 4.8,
        "segmentKind": "creek",
        "note": "Intermediate reference only; not the planned endpoint because of private-property conflict reports."
      },
      {
        "id": "highway-59-fulton-yahara-gauge",
        "name": "Highway 59 / Yahara River near Fulton gauge access",
        "latitude": 42.82638889,
        "longitude": -89.1719444,
        "mileFromStart": 6.9,
        "segmentKind": "creek",
        "note": "Default take-out at the USGS Fulton gauge / Highway 59 bridge corridor."
      }
    ]
  },
  "yahara-river-highway-59-murwin-park": {
    "putIn": {
      "id": "highway-59-fulton-yahara-gauge",
      "name": "Highway 59 / Yahara River near Fulton gauge access",
      "latitude": 42.82638889,
      "longitude": -89.1719444
    },
    "takeOut": {
      "id": "murwin-county-park-yahara",
      "name": "Murwin County Park Yahara River access",
      "latitude": 42.81095,
      "longitude": -89.12807
    },
    "logistics": {
      "distanceLabel": "About 4.4 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr",
      "shuttle": "Stage Murwin County Park first, then return to Highway 59. Check both the park landing and the Highway 59 bridge/gauge corridor before unloading because debris and bank footing can change after storms.",
      "permits": "No route-specific paddling permit is known. Follow Rock County park rules, Wisconsin boating/PFD rules, and any posted access, storm-debris, or water-quality advisories.",
      "camping": "No on-route camping is documented for this short lower-Yahara split. Use separate legal campground or lodging plans if needed.",
      "campingClassification": "none",
      "summary": "Launch at the Highway 59 gauge bridge and take out at Murwin County Park for the popular lower-Yahara continuation below Badfish Creek. The card intentionally avoids Stebbinsville as a default access and stops before a Rock River extension.",
      "accessCaveats": [
        "Highway 59 is the selected put-in because it is documented by WRT as a public access and coincides with the live Fulton gauge corridor.",
        "Murwin County Park is the planned take-out. Identify the access from shore before launching and do not continue toward the Rock River unless that separate shuttle is deliberate.",
        "Private banks line much of the lower route; use named public access points for routine stops and treat other landings as emergency-only."
      ],
      "watchFor": [
        "High or rising water, especially above the lower-Yahara target range, when strainers and bridge currents become more serious.",
        "Post-storm debris in the Yahara/Badfish corridor, including the 2024 tornado-debris concern documented in WRT comments.",
        "Low-water shallows, slow water below the scenic target, water-quality issues after rain, and cold water outside summer."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-59-fulton-yahara-gauge",
        "name": "Highway 59 / Yahara River near Fulton gauge access",
        "latitude": 42.82638889,
        "longitude": -89.1719444,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the USGS Fulton gauge / Highway 59 bridge corridor."
      },
      {
        "id": "murwin-county-park-yahara",
        "name": "Murwin County Park Yahara River access",
        "latitude": 42.81095,
        "longitude": -89.12807,
        "mileFromStart": 4.4,
        "segmentKind": "creek",
        "note": "Default take-out at the county park canoe/kayak access."
      }
    ]
  },
  "sugar-river-albany-brodhead": {
    "putIn": {
      "id": "bowman-park-albany-sugar",
      "name": "Bowman Park / South Water Street access",
      "latitude": 42.70709,
      "longitude": -89.43801
    },
    "takeOut": {
      "id": "head-gates-park-brodhead-sugar",
      "name": "Head Gates Park / Brodhead access",
      "latitude": 42.64437,
      "longitude": -89.39743
    },
    "logistics": {
      "distanceLabel": "About 7.25 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with low water or Decatur Lake wind",
      "shuttle": "Stage Head Gates Park first and inspect the dam/take-out boundary, then return to Bowman Park in Albany. Tubing-season traffic can complicate parking and loading, so build in extra time on busy summer weekends.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, Albany/Brodhead park rules, and any posted dam, tubing, parking, or water-quality notices.",
      "camping": "No on-route public watercraft campsite is documented. Travel Wisconsin lists nearby private campground options such as Sweet Minihaha and Crazy Horse; reserve separately and do not assume riverbank camping.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch from public Bowman Park and take out at Head Gates Park for the lower Sugar River Albany-to-Brodhead day route. The route is beginner flatwater, but the Brodhead dam boundary and low-water floor are non-negotiable.",
      "accessCaveats": [
        "Bowman Park is documented by Miles Paddled as public even though private tubing operations may be nearby. Use only public park access and posted parking.",
        "Head Gates Park is the mandatory take-out before the Brodhead/Decatur Dam hazard. Identify the exit before entering the final lake/dam approach.",
        "Sweet Minihaha and other private facilities are not assumed public access or campsites for this card unless the paddler has separate permission/reservation."
      ],
      "watchFor": [
        "Below 60 cfs on the Verona gauge, when Miles Paddled says the route becomes very shallow and frustrating.",
        "Decatur Lake route choices, lake wind, tubing congestion, private banks, strainers, and slow current.",
        "The Brodhead/Decatur Dam boundary, small or hard-to-see dam warning signs, and any dam-portage/repair changes around Head Gates Park."
      ]
    },
    "accessPoints": [
      {
        "id": "bowman-park-albany-sugar",
        "name": "Bowman Park / South Water Street access",
        "latitude": 42.70709,
        "longitude": -89.43801,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default public put-in documented by Miles Paddled."
      },
      {
        "id": "head-gates-park-brodhead-sugar",
        "name": "Head Gates Park / Brodhead access",
        "latitude": 42.64437,
        "longitude": -89.39743,
        "mileFromStart": 7.25,
        "segmentKind": "creek",
        "note": "Default take-out before the Brodhead/Decatur Dam boundary."
      }
    ]
  },
  "ashippun-river-druid-lake-highway-o": {
    "putIn": {
      "id": "druid-lake-boat-ramp",
      "name": "Druid Lake Boat Ramp / Clearwater Beach Road",
      "latitude": 43.2811283,
      "longitude": -88.4090687
    },
    "takeOut": {
      "id": "highway-o-ashippun-bridge",
      "name": "Highway O bridge access",
      "latitude": 43.2524995,
      "longitude": -88.399331
    },
    "logistics": {
      "distanceLabel": "About 3.3 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with lake wind, low bridges, or logjam portages",
      "shuttle": "Stage Highway O first, confirming shoulder parking and bank footing from land, then return to the Druid Lake public boat landing on Clearwater Beach Road. The WRT bike-shuttle coordinate pair anchors both endpoints.",
      "permits": "No route-specific paddling permit is known. Druid Lake may have local landing rules or fees; check posted boating ordinances at the public landing and follow Wisconsin boating/PFD rules.",
      "camping": "Treat this as a short day route. No on-route public campsite is documented, and private lake/river banks should not be used for routine stops.",
      "campingClassification": "none",
      "summary": "Launch from the DNR-supported Druid Lake public landing, cross the north end of the lake, then follow the Ashippun outlet to the Highway O bridge. This short route is mostly protected once off the lake, but wood and low bridges make portage readiness mandatory.",
      "accessCaveats": [
        "Druid Lake is the only confirmed developed/public launch for the selected route; use posted public landing areas rather than private lake lots.",
        "Highway O is a bridge/shoulder take-out, not a developed ramp. Keep vehicles clear of traffic and do not block driveways or farm access.",
        "The Bark River at Delafield gauge is only a WRT-selected proxy, so a same-day visual check at the outlet and take-out is required."
      ],
      "watchFor": [
        "Five WRT-documented logjam portages and two low bridges that may require portaging.",
        "Open-water Druid Lake wind, motorboat traffic, and cold water before the river narrows.",
        "Private banks, soft shoulders, high/rising water above the proxy high band, and shallow riffles below the WRT floor."
      ]
    },
    "accessPoints": [
      {
        "id": "druid-lake-boat-ramp",
        "name": "Druid Lake Boat Ramp / Clearwater Beach Road",
        "latitude": 43.2811283,
        "longitude": -88.4090687,
        "mileFromStart": 0,
        "segmentKind": "lake",
        "note": "Default put-in; Wisconsin DNR lists Druid Lake as having one public boat landing."
      },
      {
        "id": "highway-o-ashippun-bridge",
        "name": "Highway O bridge access",
        "latitude": 43.2524995,
        "longitude": -88.399331,
        "mileFromStart": 3.3,
        "segmentKind": "creek",
        "note": "Default take-out; WRT describes this as a steep shoulder/bridge exit rather than an ideal landing."
      }
    ]
  },
  "west-branch-sugar-river-fritz-pb": {
    "putIn": {
      "id": "fritz-road-west-branch-sugar",
      "name": "Fritz Road bridge access",
      "latitude": 42.90312,
      "longitude": -89.59752
    },
    "takeOut": {
      "id": "county-road-pb-west-branch-sugar",
      "name": "County Road PB bridge access",
      "latitude": 42.87922,
      "longitude": -89.55877
    },
    "logistics": {
      "distanceLabel": "About 5.2 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with deadfall scouting",
      "shuttle": "Stage County Road PB first, leaving room for traffic and farm access, then return to Fritz Road. WRT recommends the west-side bike shuttle over busier PB when riding.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules and use only public bridge right-of-way or clearly permitted access points.",
      "camping": "Treat this as a day route. No public on-route camping is documented, and adjoining farm/pasture banks should be treated as private unless clearly signed otherwise.",
      "campingClassification": "none",
      "summary": "Launch at Fritz Road and paddle the quiet West Branch Sugar wet-grass corridor to County Road PB. The route is low-gradient and scenic, but it is not a groomed water trail and requires attention to fresh wood, blind bends, and bridge exits.",
      "accessCaveats": [
        "Fritz Road is a bridge launch with grass/ditch footing rather than a formal ramp; inspect footing at both sides of the bridge before unloading.",
        "County Road PB is a so-so bridge take-out with a steep bank/shoulder and nearby farm access. Do not block the field entrance noted by WRT.",
        "The Sugar River near Verona gauge is a basin proxy, not a direct West Branch gauge, so visual depth and wood checks at both bridges control the final go/no-go."
      ],
      "watchFor": [
        "Downed trees, tight blind corners, and pushy current around deadfall after rain.",
        "Open wet-grass wind, private banks, cattle/farm runoff context, and poor water quality after storms.",
        "Bankfull or spreading water near and above the WRT 300 cfs caution band."
      ]
    },
    "accessPoints": [
      {
        "id": "fritz-road-west-branch-sugar",
        "name": "Fritz Road bridge access",
        "latitude": 42.90312,
        "longitude": -89.59752,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; Miles Paddled publishes the GPS point and WRT calls Fritz Road very good bridge access."
      },
      {
        "id": "county-road-pb-west-branch-sugar",
        "name": "County Road PB bridge access",
        "latitude": 42.87922,
        "longitude": -89.55877,
        "mileFromStart": 5.2,
        "segmentKind": "creek",
        "note": "Default take-out; Miles Paddled and WRT both document this bridge exit, with steep/traffic/farm-access caveats."
      }
    ]
  },
  "little-sugar-river-tin-can-american-legion": {
    "putIn": {
      "id": "tin-can-road-little-sugar",
      "name": "Tin Can Road bridge access",
      "latitude": 42.7247902,
      "longitude": -89.4670582
    },
    "takeOut": {
      "id": "american-legion-park-albany",
      "name": "American Legion Park Landing",
      "latitude": 42.710068,
      "longitude": -89.4396594
    },
    "logistics": {
      "distanceLabel": "About 3.2 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with wind on the final impoundment",
      "shuttle": "Stage American Legion Park in Albany first, then return to Tin Can Road. WRT notes the Sugar River State Trail makes the bike shuttle straightforward but also passes hunting-open trail corridor in season.",
      "permits": "No route-specific paddling permit is known. Follow Wisconsin boating/PFD rules, Village of Albany park rules, and posted Sugar River State Trail / Albany Wildlife Area restrictions.",
      "camping": "Treat this as a short day route. No on-route public campsite is documented; use separate legal campground or lodging plans if pairing with a longer Sugar River trip.",
      "campingClassification": "none",
      "summary": "Launch at Tin Can Road and follow the lower Little Sugar through Albany Wildlife Area context, joining the impounded lower Sugar and taking out at American Legion Park above Albany Dam. The selected route intentionally avoids the logjam-heavy upstream approach.",
      "accessCaveats": [
        "Tin Can Road is a bridge/trail launch, not a developed ramp. WRT says the small trail and launch are northwest of the bridge.",
        "American Legion Park is the mandatory take-out for this card. It is upstream of Albany Dam; do not continue into dam water unless a separate portage plan has been scouted.",
        "The Verona gauge is a proxy for the Little Sugar, so confirm actual depth, wind, and water quality before leaving Tin Can Road."
      ],
      "watchFor": [
        "Albany Dam downstream of the take-out, slow impounded water, and wind on the final Sugar River approach.",
        "Private banks, hunting-season trail/wildlife-area use, cold water, and post-storm water-quality concerns.",
        "Fresh wood even though WRT reports the selected lower reach was clear of logjams."
      ]
    },
    "accessPoints": [
      {
        "id": "tin-can-road-little-sugar",
        "name": "Tin Can Road bridge access",
        "latitude": 42.7247902,
        "longitude": -89.4670582,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; WRT documents a small trail/launch northwest of the bridge and excludes upstream approaches for logjam reasons."
      },
      {
        "id": "american-legion-park-albany",
        "name": "American Legion Park Landing",
        "latitude": 42.710068,
        "longitude": -89.4396594,
        "mileFromStart": 3.2,
        "segmentKind": "creek",
        "note": "Default take-out; Village of Albany and WRT both support this as a public boat-launch area above Albany Dam."
      }
    ]
  }
};
