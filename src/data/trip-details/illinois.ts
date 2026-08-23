// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const illinoisRiverTripDetails: Record<string, RiverTripDetails> = {
  "lusk-creek-saltpeter-eddyville": {
    "putIn": {"name": "Saltpeter Cave Crossing / Trail 481 access area", "latitude": 37.53557, "longitude": -88.54647},
    "takeOut": {"name": "Eddyville Blacktop Road bridge landing", "latitude": 37.47259, "longitude": -88.54769},
    "logistics": {
      "distanceLabel": "8.1 mi",
      "estimatedPaddleTime": "About 5 hr including wilderness carry-in, scouting, and portage decisions",
      "shuttle": "Arrange roughly a 7.5-mile vehicle shuttle. Stone Bottom Road may be impassable after rain, and the upstream access can require a 1.5-mile carry from Trail 481.",
      "permits": "Verify current Shawnee National Forest wilderness, trail, road, parking, and boating rules before staging; no route-specific paddling permit was confirmed.",
      "camping": "Day route; no on-route camping is assumed. Use only designated Shawnee National Forest sites and confirm current wilderness rules.",
      "campingClassification": "nearby_basecamp",
      "summary": "Treat Lusk Creek as a weather-dependent advanced day run, not a casual float. Scout the upstream access and carry a conservative turn-around plan before committing.",
      "accessCaveats": ["Trail 481 and Stone Bottom Road are difficult wilderness approaches; do not infer a drive-to launch from a map pin.", "Intermediate exits are scarce and the creek can rise rapidly after rain.", "Confirm current parking and carry-out conditions at the Eddyville Blacktop Road bridge before launch."],
      "watchFor": ["rapidly rising water", "debris and strainers", "boulder gardens and portage sections", "limited emergency exits", "muddy access roads", "cold water"]
    }
  },
  "south-branch-kishwaukee-kingston-irene": {
    "putIn": {
      "id": "kingston-park-launch",
      "name": "Kingston Park launch",
      "latitude": 42.10284,
      "longitude": -88.75875
    },
    "takeOut": {
      "id": "irene-road-takeout",
      "name": "Irene Road take-out",
      "latitude": 42.10995,
      "longitude": -88.90054
    },
    "logistics": {
      "distanceLabel": "11.5 mi",
      "estimatedPaddleTime": "About 3 hr on-water; allow extra time for scouting and portage",
      "shuttle": "Arrange an approximately 9-mile vehicle shuttle before launching.",
      "permits": "Verify current Kingston Park, county forest preserve, and river access rules before departure.",
      "camping": "Day route. No legal on-route camping is assumed; arrange separate lodging or a designated campground if staying overnight.",
      "campingClassification": "none",
      "summary": "Launch at Kingston Park and take out at Irene Road. The route begins with gentle riffles and becomes more technical through the forest preserves, including a documented mandatory log-jam portage.",
      "accessCaveats": [
        "Irene Road is a rough, muddy take-out rather than a developed launch.",
        "Do not treat forest-preserve map points as vehicle ramps; confirm carry-in access and current closures before staging.",
        "Stay in the craft beside private banks and follow preserve rules."
      ],
      "watchFor": [
        "deadfall, strainers, and changing current",
        "mandatory log-jam portage in the downstream forest preserve reach",
        "muddy Irene Road exit and limited emergency take-outs",
        "Fairdale gage above 3.50 ft or rapidly rising water"
      ]
    }
  },
  "pecatonica-river-wes-block-tuttys": {
    "putIn": {
      "name": "Wes Block Trail Access",
      "latitude": 42.330992586134,
      "longitude": -89.666227460683
    },
    "takeOut": {
      "name": "Tutty's Crossing Trailhead",
      "latitude": 42.300190474464,
      "longitude": -89.615848288175
    },
    "logistics": {
      "distanceLabel": "6.4 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 4 hr",
      "shuttle": "Use a two-car shuttle between the Wes Block trailhead west of Freeport and Tutty's Crossing downtown. The Jane Addams Trail links the two access areas for bikes and walkers, but the simplest shuttle is still by vehicle.",
      "permits": "No route-specific paddling permit is known. Follow posted Freeport Park District, trailhead, and parking rules at both public launches.",
      "camping": "Treat this as a day route. No legal on-route overnight stop was confirmed between Wes Block and Tutty's Crossing, but Lake Le-Aqua-Na State Recreation Area is a nearby official campground base if you want to stay in Stephenson County.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Wes Block Trail Access and take out at Tutty's Crossing for a gentle Pecatonica day entering Freeport. The route is shorter and friendlier than the long rural lower-Pec shuttles, but the Darlington gauge is still only a same-river proxy and muddy banks are part of the experience.",
      "accessCaveats": [
        "Both endpoints are official trailheads with boat-launch amenities, but they are trailhead-style accesses rather than large paved-ramp complexes. Scout unloading and parking before staging a shuttle.",
        "Wes Block is the cleaner upstream public start. Tutty's Crossing is the logical downtown finish before longer Freeport combinations continue toward Hancock or the VFW.",
        "The Pecatonica is navigable, but banks outside public access areas are private and often muddy. Stay with named public launches for staging and take-out."
      ],
      "watchFor": [
        "Muddy banks, slippery footing, and awkward exits after recent high water.",
        "Downed trees, strainers, and changing current lines after storms even though the lower Pec is usually gentle.",
        "High, muddy water and shoreside strainers as the Darlington proxy pushes above about 291 cfs; above 501 cfs the lower river may be too high and unattractive for a broad recreational recommendation."
      ]
    }
  },
  "vermilion-river-lowell-oglesby": {
    "putIn": {
      "name": "Lowell / Vermillion River Rafting put-in",
      "latitude": 41.255211,
      "longitude": -89.014118
    },
    "takeOut": {
      "name": "Oglesby Vermilion River Boat Launch",
      "latitude": 41.302108,
      "longitude": -89.038255
    },
    "logistics": {
      "distanceLabel": "8.2 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr for a competent whitewater group",
      "shuttle": "Use a two-car shuttle from the Lowell / N.2249th Road rafting access to the City of Oglesby boat launch below Ed Hand Highway. Commercial rafting traffic may affect launch timing and parking.",
      "permits": "No separate app-known paddling permit is assumed, but private boaters should verify current access rules, outfitter requirements, and any Illinois DNR or local closure notices before launching.",
      "camping": "Treat this as a day run. Do not assume legal riverside camping or scouting access on private or not-yet-open state land along the corridor.",
      "summary": "Launch at the Lowell-side rafting put-in and take out at the Oglesby Vermilion River Boat Launch. The route follows American Whitewater's Wildcat Canyon reach through Matthiessen-area bluffs, pool-drop rapids, and the former cement-dam corridor.",
      "accessCaveats": [
        "American Whitewater specifically says access from N.2219th Road is no longer advised because of private-property concerns; use the Lowell rafting access instead.",
        "The take-out is a city-built public boat ramp with limited parking, so leave room for other boaters and rafting groups.",
        "Some side canyons and former industrial/state-addition lands are not necessarily open for public hiking, scouting, or portaging even when the river itself is runnable."
      ],
      "watchFor": [
        "Wildcat, a Class III rapid that changes character with flow and has multiple lines depending on level.",
        "Pushy current, large wave trains, and harder swims when the Leonore gauge climbs above the conservative target window.",
        "Cold water, strainers, wood piles, limited legal scout/portage options, and commercial rafting traffic."
      ]
    }
  },
  "kishwaukee-river-hickory-bills-distillery": {
    "putIn": {
      "id": "hickory-bills-canoe-launch",
      "name": "Hickory Bills Canoe Launch",
      "latitude": 42.255487,
      "longitude": -88.861792
    },
    "takeOut": {
      "id": "distillery-road-conservation-area",
      "name": "Distillery Road Conservation Area canoe launch",
      "latitude": 42.25686,
      "longitude": -88.9112
    },
    "logistics": {
      "distanceLabel": "About 4.4 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer in low water or headwind",
      "shuttle": "Use a short Belvidere-area shuttle from Distillery Road Conservation Area back to Hickory Bills Canoe Launch. Stage the Distillery Road take-out first because the conservation area can close during hunting seasons or winter conditions.",
      "permits": "No route-specific paddling permit is known. Follow Belvidere Park District and Boone County Conservation District rules, posted hours, parking limits, hunting-season closures, and any current Illinois DNR river notices.",
      "camping": "Treat this as a short day trip. No legal on-route camping plan is assumed, and paddlers should not land on private banks except for emergency safety needs.",
      "summary": "Launch at Hickory Bills Canoe Launch in Belvidere and take out at the Distillery Road Conservation Area canoe launch. This avoids the upstream Belvidere Dam portage and uses the Belvidere USGS gauge that local Kishwaukee access managers point paddlers toward.",
      "accessCaveats": [
        "Illinois public-water access rules are stricter and more confusing than many nearby states. Use the established public launches and do not assume permission to land on private banks along the route.",
        "The BCCD/Openlands water-trail map identifies Hickory Bills and Distillery Road as established launch sites, but Distillery Road is a conservation area with posted hours and hunting-season closures.",
        "Inspect the Distillery Road take-out before launching if you have not used it before; the shoreline is natural rather than a large concrete ramp."
      ],
      "watchFor": [
        "Shallow riffles and gravel-bar scraping when the Belvidere gauge is 200 cfs or lower.",
        "Very high, dirty, pushier water when the gauge rises above 600 cfs, especially after storms.",
        "Strainers, wood, blind bends, wind on open bends, and changing natural-bank landings.",
        "Wastewater-treatment-plant discharge context near Belvidere; avoid paddling after heavy rain or when water quality looks poor."
      ]
    }
  },
  "kishwaukee-river-marengo-siems-hwy23": {
    "putIn": {
      "id": "woodbine-launch-marengo",
      "name": "Woodbine Launch",
      "latitude": 42.2622717,
      "longitude": -88.5970327
    },
    "takeOut": {
      "id": "kishwaukee-highway-23-bridge",
      "name": "Highway 23 Bridge / Marengo wastewater-treatment access",
      "latitude": 42.2659028,
      "longitude": -88.608374
    },
    "logistics": {
      "distanceLabel": "About 4 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 4 hr, depending on wood and current",
      "shuttle": "Use a two-car shuttle or a current outfitter shuttle between Woodbine Launch and the Highway 23 endpoint. Stage the take-out first and verify that the access is open and signed for paddling.",
      "permits": "No route-specific paddling permit is known. Follow posted City of Marengo, McHenry County, and event/operator access rules; do not treat a roadside parking area as permission to cross private land.",
      "camping": "Treat this as a day route. No legal endpoint or on-route overnight camping was verified; use a nearby established campground or lodging base rather than planning riverside camping.",
      "campingClassification": "nearby_basecamp",
      "summary": "This short North Branch Kishwaukee reach is a documented local paddle from Woodbine Launch to Highway 23. It is a distinct upstream corridor from the existing Belvidere route and is published conservatively because access and treefall conditions can change.",
      "accessCaveats": [
        "Confirm current access and closure signage at both named endpoints before launching. The local Kish group has posted bridge and obstruction warnings that can change by season.",
        "The Highway 23 endpoint is associated with the Marengo wastewater-treatment area; use only the event/local-authorized landing and do not enter restricted plant property.",
        "The route has limited legal exits between endpoints. Carry a shuttle plan, inspect current wood, and do not improvise private-bank landings except for an emergency."
      ],
      "watchFor": [
        "Fresh treefalls and strainers after storms or maintenance changes.",
        "Fast-rising, muddy, or pushy water outside the local 60-700 cfs guidance band.",
        "Bridge-area restrictions, low clearance, and changing take-out conditions near Highway 23."
      ]
    }
  },
  "fox-river-yorkville-whitewater-course": {
    "putIn": {
      "id": "marge-cline-course-put-in",
      "name": "Marge Cline Whitewater Course put-in / upstream launch",
      "latitude": 41.643002,
      "longitude": -88.445
    },
    "takeOut": {
      "id": "marge-cline-course-take-out",
      "name": "Marge Cline Whitewater Course take-out / downstream portage",
      "latitude": 41.641998,
      "longitude": -88.443001
    },
    "logistics": {
      "distanceLabel": "0.23 mi / about 1,100 ft",
      "estimatedPaddleTime": "Play-park session; laps vary by level and skill",
      "shuttle": "No road shuttle is needed for normal laps. Use downtown Yorkville or Riverfront Park parking, launch at the course put-in, and walk the concrete path back upstream between laps or exit at the designated downstream portage.",
      "permits": "No route-specific paddling fee is known. The city describes the course as open-use; follow posted park, parking, boating, and safety signs and bring your own whitewater-appropriate PFD and gear.",
      "camping": "Treat this as a short day-use whitewater session. Use separate local lodging or campground plans if staying overnight.",
      "campingClassification": "none",
      "summary": "Use Marge Cline Whitewater Course for short Fox River laps around the Glen D. Palmer Dam bypass. Score it off USGS 05551580 with a conservative 250 cfs floor, then make a same-day call on crowding, feature shape, and high-water push before committing.",
      "accessCaveats": [
        "The city says the course is open-use and identifies an east-end boat launch plus a designated downstream portage point west of the Route 47 bridge on the south bank next to the Yorkville Parks and Recreation building.",
        "This is a whitewater play park rather than a downstream Fox River float. Normal use is repeated laps with the on-site concrete walk-back path, not a one-way river trip.",
        "American Whitewater maps exact put-in and take-out points for the same reach, but use current city signs and the obvious portage layout on arrival because warm-weather crowds, tubers, and events can change how the park feels on the day.",
        "Most public parking is in nearby municipal lots rather than directly beside the chute. Carry boats accordingly and use only the city lots that allow the needed parking duration."
      ],
      "watchFor": [
        "Glen D. Palmer Dam context, the short engineered whitewater course, bridge-adjacent current, and any temptation to improvise lines outside the official bypass and portage setup.",
        "Flows near or below about 250 cfs, when the course gets shallower, scrapier, and more technical for hull contact.",
        "High or rising water, when American Whitewater still marks the reach runnable but the short course becomes pushier and less forgiving for novice whitewater paddlers.",
        "Tubers, swimmers, anglers near the park, strong eddy lines, rocks, slippery concrete or shoreline footing, and no on-site lifeguard."
      ]
    }
  },
  "middle-fork-vermilion-kinneys-ford-kickapoo": {
    "putIn": {"id": "kinneys-ford-canoe-access", "name": "Kinney's Ford public canoe access", "latitude": 40.24229, "longitude": -87.77591},
    "takeOut": {"id": "kickapoo-bridge-access", "name": "Kickapoo Bridge public canoe take-out", "latitude": 40.13753, "longitude": -87.74532},
    "logistics": {
      "distanceLabel": "About 12.8–13.5 mi",
      "estimatedPaddleTime": "About 6–8 hr for the full corridor, depending on stage, stops, and portages",
      "shuttle": "Use the Kickapoo Adventures shuttle or a two-car shuttle. Stage the Kickapoo Bridge take-out before launching at Kinney's Ford; confirm current departure times, parking, and footpath conditions.",
      "permits": "No route-specific paddling permit is identified. Follow Illinois DNR, Middle Fork State Fish and Wildlife Area, Kennekuk County Park, Kickapoo State Park, parking, and posted river rules.",
      "camping": "Designated camping is available at Middle Fork State Fish and Wildlife Area and nearby Kickapoo State Park. No riverside or private-bank camping is assumed.",
      "campingClassification": "nearby_basecamp",
      "summary": "The full Middle Fork Vermilion corridor starts at the named Kinney's Ford access and ends at the Kickapoo Bridge take-out. Kickapoo Adventures documents almost 13 miles, shuttle logistics, and direct gauge-linked operating bands; the route includes scenic bluffs, gravel bars, shallow sections, and riffles.",
      "accessCaveats": ["Illinois DNR identifies Kinney's Ford and the west entrance bridge at Kickapoo as public canoe access points; verify current parking, footpaths, launch signage, and any seasonal restrictions before departure.", "Below 1.5 ft, expect substantial shallows and walking; 1.5–2.5 ft is the outfitter's ideal band; above 2.5 ft expect faster water, covered exits, and more debris; above 3.5 ft is flood-stage/dangerous context.", "The river has frequent riffles, shallow gravel, downed-tree hazards, and capsize potential. Wear a PFD, secure gear, and scout any wood or fast-water line.", "Use only designated camping and public access. Do not improvise private-bank landings or continue beyond the named take-out without a separate plan."],
      "watchFor": ["Low water, exposed gravel, and walking/portage sections below the 1.5-ft planning floor.", "Fast rises, strainers, covered gravel bars, and stronger current above the 2.5-ft caution band.", "Cold water, bridge approaches, shoreline access changes, and outfitter/state-park closures."]
    },
    "corridorId": "middle-fork-vermilion-river",
    "corridorLabel": "Middle Fork Vermilion National Scenic River / Kinney's Ford to Kickapoo",
    "continuityStatus": "verified"
  },
  "mississippi-river-piasa-harbor-alton-riverfront": {
    "putIn": {"id": "piasa-harbor-access", "name": "Piasa Harbor public access", "latitude": 38.9370857212856, "longitude": -90.2867113839149},
    "takeOut": {"id": "alton-riverfront-access", "name": "Alton Riverfront public boat launch", "latitude": 38.8855000354463, "longitude": -90.1759188990604},
    "logistics": {
      "distanceLabel": "About 7 mi",
      "estimatedPaddleTime": "About 3–5 hr depending on wind, current, stops, and traffic",
      "shuttle": "Stage the Alton Riverfront take-out and use a two-car shuttle or the Mississippi River Water Trail shuttle pattern. Confirm current parking, ramp status, and any event/closure restrictions before launching.",
      "permits": "No route-specific paddling permit is identified. Follow USACE Rivers Project rules, Illinois boating/PFD requirements, posted navigation restrictions, and current Water Trail guidance.",
      "camping": "Treat this as a day route. Nearby Pere Marquette State Park and regional lodging/campgrounds are the basecamp options; no on-route or private-bank camping is assumed.",
      "campingClassification": "nearby_basecamp",
      "summary": "This guarded Pool 26 water-trail reach follows the documented Piasa Harbor-to-Alton Riverfront itinerary. It is a broad commercial navigation pool, not a small-river float: use the direct Alton Pool 26 gauge, respect tows and structures, and launch only when the low-water reference and same-day conditions are acceptable.",
      "accessCaveats": ["Piasa Harbor and Alton Riverfront are named public access areas, but verify current parking, ramp condition, water level, and any temporary closures before departure.", "Use the 14.0-ft USACE low-water reference as a conservative planning floor; it is not a guarantee of safe passage. Below that level, ramps and harbor access may be compromised.", "Commercial tows have right-of-way and may need up to a long distance to stop. Stay out of the navigation channel and tow blind spots; avoid wing dikes, bridges, lock structures, floating debris, and strong cross-channel currents.", "Wear a properly fitted PFD, carry communication/rescue equipment, and do not launch in severe weather, flood warnings, or when same-day wind/current conditions exceed the group's skill.", "No informal camping or private-bank landing is assumed; use designated access and nearby camping/lodging only."],
      "watchFor": ["Low-water drawdown, ramp/harbor closure notices, and exposed obstructions below the 14.0-ft planning floor.", "Tows, wakes, wing dikes, bridge currents, floating debris, and lock/dam traffic.", "Wind, thunderstorms, rapidly rising water, cold-water immersion, and changing access conditions."]
    },
    "corridorId": "mississippi-river-pool-26",
    "corridorLabel": "Mississippi River Pool 26 / Piasa Harbor to Alton Riverfront",
    "continuityStatus": "verified"
  },
  "west-branch-dupage-mcdowell-knoch-knolls": {
    "putIn": {"id": "mcdowell-grove-launch", "name": "McDowell Grove public launch", "latitude": 41.796111, "longitude": -88.185446},
    "takeOut": {"id": "knoch-knolls-park-launch", "name": "Knoch Knolls Park canoe launch", "latitude": 41.712496, "longitude": -88.141763},
    "logistics": {
      "distanceLabel": "Approximately 8.1 river miles",
      "estimatedPaddleTime": "About 3–5 hr including scouting, the Fawell Dam portage, and access stops",
      "shuttle": "Arrange a vehicle shuttle between McDowell Grove and Knoch Knolls Park; verify parking and preserve hours before launching.",
      "permits": "DuPage Forest Preserve District says no permit is required for boating on its rivers; follow current preserve, Naperville Park District, and Illinois boating rules.",
      "camping": "Day route; no on-route camping is assumed. Use separate designated campgrounds or lodging and do not camp on preserve or private river frontage.",
      "campingClassification": "none",
      "summary": "Plan as a full-day moving-water paddle with a pre-arranged shuttle and a mandatory Fawell Dam portage.",
      "accessCaveats": ["McDowell Grove, Pioneer Park, Weigand Riverfront Park, and Knoch Knolls are named access sites, but parking, hours, paths, and launch conditions can change.", "Fawell Dam portage and downstream re-entry must be inspected on arrival; do not substitute an unverified bank exit."],
      "watchFor": ["Fawell Dam and portage", "low-water shallows", "fast rise after storms", "strainers and debris", "private banks and preserve rules"]
    },
    "corridorId": "west-branch-dupage-river",
    "corridorLabel": "DuPage River Water Trail / McDowell Grove to Knoch Knolls Park",
    "continuityStatus": "verified"
  }
  ,"big-bureau-creek-red-covered-bridge-county-road-1150": {
    "putIn": {"id": "red-covered-bridge-park", "name": "Red Covered Bridge Park public access", "latitude": 41.41657, "longitude": -89.47836},
    "takeOut": {"id": "county-road-1790e-1150n", "name": "County Road 1790 E / County Road 1150 N", "latitude": 41.31386, "longitude": -89.51863},
    "logistics": {
      "distanceLabel": "Approximately 13 river miles",
      "estimatedPaddleTime": "About 5–8 hours depending on level, scouting, and portage decisions",
      "shuttle": "Arrange a vehicle shuttle between Red Covered Bridge Park and the County Road 1790 E/1150 N take-out; verify road and bank access before launch.",
      "permits": "No route-specific paddling permit is identified; follow Illinois boating/PFD rules and all posted park, county, and canal restrictions.",
      "camping": "Use designated Hennepin Canal State Park or nearby campground/lodging options only; no private-bank or on-route camping is assumed.",
      "campingClassification": "nearby_basecamp",
      "summary": "Plan as a full-day moving-water paddle with a pre-arranged shuttle, conservative level check, and scouting at the aqueduct and take-out.",
      "accessCaveats": ["Named endpoints and coordinates come from the cited paddle report; confirm current parking, road, bank, and landowner conditions immediately before departure.", "Do not infer public landing rights from intervening private frontage."],
      "watchFor": ["Low water below 350 cfs", "rapid rises and debris", "Class I(II) Hennepin Canal aqueduct drop", "logjam near take-out", "private banks and access changes"]
    },
    "corridorId": "big-bureau-creek",
    "corridorLabel": "Big Bureau Creek / Red Covered Bridge Park to County Road 1150",
    "continuityStatus": "verified"
  }
  ,"blackberry-creek-jaycee-pond-river-road": {
    "putIn": {"id": "jaycee-pond-park", "name": "Jaycee Pond Park public access", "latitude": 41.64704, "longitude": -88.45286},
    "takeOut": {"id": "blackberry-creek-river-road", "name": "River Road bridge take-out", "latitude": 41.64527, "longitude": -88.45},
    "logistics": {
      "distanceLabel": "Approximately 0.34 river miles",
      "estimatedPaddleTime": "About 30–90 minutes including scouting and repeated feature runs",
      "shuttle": "No vehicle shuttle is assumed; arrange a short carry or verify the documented downstream access before launching.",
      "permits": "No route-specific permit is identified; follow Yorkville park rules and Illinois boating/PFD requirements.",
      "camping": "Day-use training reach; no on-route camping is assumed.",
      "campingClassification": "none",
      "summary": "Plan as a short, technical training run with scouting, a safety boat/rescue plan, and a conservative flow check.",
      "accessCaveats": ["Jaycee Pond Park is public, but downstream take-out access and bridge conditions must be confirmed immediately before use.", "Do not run the bridge ledge or rock features without a current scouting and rescue plan."],
      "watchFor": ["Rock-arch drops", "River Road bridge ledge", "low water and exposed rock", "rapid rise/debris", "changing park and take-out access"]
    },
    "corridorId": "blackberry-creek-jaycee-pond",
    "corridorLabel": "Blackberry Creek / Jaycee Pond Park to River Road",
    "continuityStatus": "verified"
  },
  "hickory-creek-pilcher-park-south-joliet-street": {
    "putIn": {"id": "pilcher-park-hickory-creek", "name": "Pilcher Park below-dam public access", "latitude": 41.5355868, "longitude": -88.0136675},
    "takeOut": {"id": "south-joliet-street-hickory-creek", "name": "S. Joliet Street bridge take-out", "latitude": 41.5076556, "longitude": -88.0838861},
    "logistics": {"distanceLabel": "Approximately 4.2 river miles", "estimatedPaddleTime": "About 2–4 hours including scouting and portage decisions", "shuttle": "Arrange a short shuttle and verify carry-out conditions first.", "permits": "No route-specific permit identified; follow Joliet Park District, Illinois DNR, and Illinois boating/PFD rules.", "camping": "Day-use urban route; no on-route camping is assumed.", "campingClassification": "none", "summary": "Short urban whitewater run with conservative flow check and mandatory feature scouting.", "accessCaveats": ["Verify exact below-dam carry-in and S. Joliet Street carry-out points on arrival."], "watchFor": ["Pilcher Park dam", "bridges", "strainers", "concrete walls", "rapid rise"]},
    "corridorId": "hickory-creek",
    "corridorLabel": "Hickory Creek / Pilcher Park to S. Joliet Street",
    "continuityStatus": "verified"
  }
};
