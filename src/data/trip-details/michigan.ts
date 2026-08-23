// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const michiganRiverTripDetails: Record<string, RiverTripDetails> = {
  "looking-glass-riverfront-riverside-dewitt": {
    "putIn": {"id": "looking-glass-riverfront-park", "name": "Looking Glass Riverfront Park public carry-in / ADA kayak launch", "latitude": 42.825, "longitude": -84.59975},
    "takeOut": {"id": "riverside-city-park", "name": "Riverside City Park public ADA canoe launch", "latitude": 42.83939, "longitude": -84.56902},
    "logistics": {
      "distanceLabel": "2.7 mi",
      "estimatedPaddleTime": "About 1.5 to 2.5 hr depending on flow, stops, and scouting",
      "shuttle": "Stage the Riverside City Park take-out before launching at Looking Glass Riverfront Park. Use only the named public endpoints and confirm current parking, hours, and launch conditions.",
      "permits": "No route-specific paddling permit is identified. Follow current DeWitt Township, DeWitt city park, Michigan boating, parking, and posted river rules.",
      "camping": "No on-route camping is assumed. Use designated nearby lodging or campgrounds and do not camp on park or private river frontage.",
      "campingClassification": "none",
      "summary": "Launch at Looking Glass Riverfront Park’s public carry-in/ADA kayak access and take out at Riverside City Park’s public ADA canoe launch. Outdoor Michigan documents the 2.7-mile connection; direct USGS telemetry is upstream near Eagle, so current visual conditions remain decisive.",
      "accessCaveats": ["Looking Glass Riverfront Park is carry-in access with parking; confirm the current gravel approach, shoreline, hours, and closure notices before loading boats.", "Riverside City Park has an ADA canoe launch and restroom; confirm current access, parking, and take-out conditions before arrival.", "The 69 cfs CanWePaddle reference is community guidance, not an agency-certified floor or safety guarantee; pair it with USGS 04114498, trend, weather, and same-day scouting.", "Avoid launching during flood warnings, severe weather, rapidly rising water, or when wood and debris make the corridor unclear."],
      "watchFor": ["Low-water scraping near or below the 69 cfs planning floor.", "Fast rises after storms, submerged wood, cold water, and changing shoreline conditions.", "Private frontage outside the named public parks; do not assume informal access or camping."]
    },
    "corridorId": "looking-glass-riverfront-riverside-dewitt",
    "corridorLabel": "Looking Glass River / DeWitt public launch corridor",
    "continuityStatus": "verified"
  },
  "kalamazoo-river-ceresco-historic-bridge": {
    "putIn": {"id": "ceresco-green", "name": "Ceresco Green public carry-in access", "latitude": 42.2704, "longitude": -85.06105},
    "takeOut": {"id": "historic-bridge-park", "name": "Historic Bridge Park public kayak launch", "latitude": 42.29236, "longitude": -85.11431},
    "logistics": {
      "distanceLabel": "About 3.6 mi",
      "estimatedPaddleTime": "About 2 to 3 hr depending on flow, current, scouting, and stops",
      "shuttle": "Stage the Historic Bridge Park take-out before launching at Ceresco Green. The city’s Kanoe the Kazoo itinerary supports the Ceresco–Angler’s Bend–Historic Bridge sequence; use only the named public endpoints.",
      "permits": "No route-specific paddling permit is identified. Follow current Calhoun County, Ceresco, park, parking, and posted river rules.",
      "camping": "No on-route camping is assumed. Use designated nearby campgrounds or lodging and do not camp on park or private river frontage.",
      "campingClassification": "none",
      "summary": "Launch at Ceresco Green’s public carry-in access and take out at Historic Bridge Park’s public kayak launch. This is a short, documented Battle Creek-area water-trail segment with a direct downstream gauge, but the carry-in launch, cold water, urban bridges, changing current, and legacy water-quality advisories require conservative same-day judgment.",
      "accessCaveats": ["Ceresco Green has a steep carry, steps/grass, large boulders, and separate drop-off/long-term parking arrangements; confirm the current shoreline and parking before launching.", "Historic Bridge Park is a public county park with a kayak launch, parking, and restrooms; confirm current hours, construction, and water-access notices before arrival.", "The 500-3000 cfs range is broad community guidance, not a go/no-go rule; pair it with USGS 04105500, weather, water temperature, and same-day visual conditions.", "Do not drink river water or eat fish unless current Michigan health guidance allows it; follow posted contamination advisories and avoid unusual sheens or debris."],
      "watchFor": ["Fast rises, cold water, strainers, bridge hazards, and changing current around the urban reach.", "Legacy contamination/remediation notices and any current health or closure advisories.", "The route ends at Historic Bridge Park; do not continue into downstream urban reaches without a separate verified endpoint and hazard plan."]
    },
    "corridorId": "kalamazoo-river-ceresco-historic-bridge",
    "corridorLabel": "Kalamazoo River / Battle Creek public water-trail corridor",
    "continuityStatus": "verified"
  },
  "kalamazoo-river-new-richmond-hacklander": {
    "putIn": {"id": "new-richmond-bridge-park", "name": "New Richmond Bridge Park public boat ramp", "latitude": 42.6517, "longitude": -86.1078},
    "takeOut": {"id": "hacklander-dnr", "name": "Hacklander DNR Boat Launch", "latitude": 42.63638, "longitude": -86.1631},
    "logistics": {
      "distanceLabel": "4.9 mi",
      "estimatedPaddleTime": "About 2 to 3 hr depending on wind, current, and marsh stops",
      "shuttle": "Stage the Hacklander take-out before launching at New Richmond Bridge Park. The watershed council and water-trail listing support the named endpoint pair; use the outfitter shuttle only as an optional service, not as assumed access.",
      "permits": "New Richmond Bridge Park lists a launch fee; confirm current county rules and fee before arrival. Hacklander is a DNR access and may have posted boating rules.",
      "camping": "No on-route camping is assumed. Use designated nearby campgrounds or lodging and do not camp on marsh or private frontage.",
      "campingClassification": "none",
      "summary": "Launch at New Richmond Bridge Park and take out at the signed Hacklander DNR ramp through the lower Kalamazoo and Pottawatomi Marsh corridor. This is a gentle public water-trail segment with a direct lower-river gauge, but wind and shallow-ramp limitations matter.",
      "accessCaveats": ["New Richmond has a launch fee and public restrooms; confirm the current fee, hours, and any event or construction closure before launching.", "Hacklander is a shallow, limited-depth DNR ramp; larger boats may not be suitable and the site is a carry-in access despite the hard surface.", "The 500-3000 cfs range is broad community guidance, not a go/no-go rule; pair it with the direct gauge, weather, wind, and visual river conditions."],
      "watchFor": ["Wind across the marsh, cold water, storms, and fast rises.", "Shallow water and the limited-depth Hacklander ramp.", "Private banks and wetlands outside the named public access points; remain on the navigable corridor and respect posted restrictions."]
    },
    "corridorId": "kalamazoo-river-new-richmond-hacklander",
    "corridorLabel": "Kalamazoo River / Pottawatomi Marsh lower public water trail",
    "continuityStatus": "verified"
  },
  "kalamazoo-river-b-drive-stuarts-landing": {
    "putIn": {"id": "b-drive-north", "name": "B Drive North Access Site", "latitude": 42.2615, "longitude": -84.85562},
    "takeOut": {"id": "stuarts-landing", "name": "Stuart's Landing public boat ramp", "latitude": 42.26074, "longitude": -84.9495},
    "logistics": {
      "distanceLabel": "About 5.8 mi",
      "estimatedPaddleTime": "About 2 to 3 hr depending on current, scouting, and stops",
      "shuttle": "Stage the Stuart's Landing take-out before launching at B Drive North. Use the documented public access pair and do not substitute private or informal frontage.",
      "permits": "No route-specific paddling permit is identified. Follow current Marshall, township, launch, parking, and posted river rules.",
      "camping": "No on-route camping is assumed. Use designated nearby campgrounds or lodging and do not camp on private or park frontage.",
      "campingClassification": "none",
      "summary": "Launch at the B Drive North bridge access beside USGS 04103500 and take out at Stuart's Landing above Marshall Dam. This is the conservative public-endpoint version of the Marshall corridor; the dam is intentionally outside the route.",
      "accessCaveats": ["B Drive North is an unimproved bridge crossing with a short carry and limited parking; confirm current path and shoreline conditions before loading boats.", "Stuart's Landing is a public city ramp; confirm current hours, parking, and any construction notices before launching.", "The 500-3000 cfs range is broad community guidance, not a go/no-go rule; pair it with the direct USGS reading and same-day visual judgment."],
      "watchFor": ["Fast rises, cold water, floating wood, and changing current around bridges.", "The documented 12-foot Marshall Dam immediately downstream of the selected take-out; stop and portage only under a separate verified plan.", "Weather, water temperature, and limited access options along the corridor."]
    },
    "corridorId": "kalamazoo-river-b-drive-stuarts-landing",
    "corridorLabel": "Kalamazoo River / Marshall above-dam public access corridor",
    "continuityStatus": "verified"
  },
  "kalamazoo-river-comstock-mayors-riverfront": {
    "putIn": {"id": "comstock-dnr", "name": "Comstock Township DNR Boat Launch", "latitude": 42.2862, "longitude": -85.5223},
    "takeOut": {"id": "mayors-riverfront-park", "name": "Mayor's Riverfront Park Boat Launch", "latitude": 42.29059, "longitude": -85.56645},
    "logistics": {
      "distanceLabel": "2.6 mi",
      "estimatedPaddleTime": "About 1 to 2 hr depending on current and stops",
      "shuttle": "Stage the Mayor's Riverfront Park take-out before launching at the Comstock DNR access. Use only the named public accesses; do not substitute private D Avenue frontage.",
      "permits": "No route-specific paddling permit is identified. Follow current township, city park, launch, parking, and posted river rules.",
      "camping": "No on-route camping is assumed. Use designated nearby campgrounds or lodging and do not camp on park or private river frontage.",
      "campingClassification": "none",
      "summary": "Launch at the Comstock Township DNR carry-in access and take out at the city boat launch at Mayor's Riverfront Park. The short reach is a bounded urban corridor with a clear public endpoint pair; downstream dams and portages are outside this route and require separate planning.",
      "accessCaveats": ["Comstock is a small carry-down access with parking and no restrooms; confirm current signage, shoreline, and launch conditions before loading boats.", "Mayor's Riverfront Park is a public city boat ramp with parking and restrooms; confirm hours, construction notices, and take-out access before launching.", "The 500-3000 cfs range is a broad community estimate, not a go/no-go rule; pair it with the direct USGS reading and same-day visual judgment."],
      "watchFor": ["Current changes, cold water, wind, and motorboat traffic.", "Downstream dams and portages if continuing beyond Mayor's Riverfront Park.", "Fast rises after storms and changing urban access or construction conditions."]
    },
    "corridorId": "kalamazoo-river-comstock-mayors-riverfront",
    "corridorLabel": "Kalamazoo River / Southwest Michigan Water Trails urban corridor",
    "continuityStatus": "verified"
  },
  "jordan-river-graves-crossing-rogers-bridge": {
    "putIn": {"id": "graves-crossing", "name": "Graves Crossing State Forest Campground launch", "latitude": 45.033295, "longitude": -85.064023},
    "takeOut": {"id": "rogers-road-bridge", "name": "Rogers Road Bridge DNR boat launch", "latitude": 45.13272, "longitude": -85.12395},
    "logistics": {
      "distanceLabel": "About 8 mi",
      "estimatedPaddleTime": "About 3 to 4 hr depending on flow, wood, and stops",
      "shuttle": "Stage the Rogers Road Bridge take-out before launching at Graves Crossing. The local outfitter and DNR access material support the named endpoint pair; do not improvise private-bank access.",
      "permits": "No route-specific paddling permit is identified. Follow Michigan DNR access, campground, Natural River, parking, and Recreation Passport rules at the named sites.",
      "camping": "Graves Crossing State Forest Campground is adjacent to the put-in; Pinney Bridge State Forest Campground is a nearby designated option. Use only designated campsites.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Graves Crossing State Forest Campground and take out at the DNR Rogers Road Bridge access near East Jordan. This is a wild, moving-water corridor with designated camping and several public access points, but it requires active scouting for wood and tight bends.",
      "accessCaveats": ["Graves Crossing is a carry-down access beside the state forest campground; confirm current parking, campground, and launch signage before loading boats.", "Rogers Road Bridge has gravel access and parking but is carry-in oriented; stage the take-out and confirm the shoreline exit before launching.", "The 193 cfs figure is a conservative community estimate, not a state safety rule; the same-river USGS reading must be paired with visual scouting and recent local conditions."],
      "watchFor": ["Swift current, tight corners, overhanging branches, sweepers, and downed cedars.", "Cold water and rapid weather changes in the Natural River corridor.", "The first mile below Graves Crossing is more demanding; below Rogers Bridge the river becomes slower, wider, and deeper, so do not assume the entire lower corridor has the same character."]
    },
    "corridorId": "jordan-river-graves-crossing-rogers-bridge",
    "corridorLabel": "Jordan River Natural River / public canoe access corridor",
    "continuityStatus": "verified"
  },
  "iron-river-mattioli-brady": {
    "putIn": {"id": "mattioli-park", "name": "Mattioli Park public launch", "latitude": 46.097195, "longitude": -88.646985},
    "takeOut": {"id": "brady-avenue-apple-blossom", "name": "Brady Avenue / Apple Blossom Trail take-out", "latitude": 46.066862, "longitude": -88.628114},
    "logistics": {
      "distanceLabel": "3 mi",
      "estimatedPaddleTime": "About 1.5 to 2.5 hr depending on flow, scouting, and stops",
      "shuttle": "Stage a two-car shuttle from the Brady Avenue / Apple Blossom Trail trailhead back to Mattioli Park. American Whitewater lists Museum Drive as an alternate intermediate/take-out option.",
      "permits": "No route-specific permit is identified by American Whitewater. Follow City of Caspian / park, parking, and posted launch rules and verify current access signage.",
      "camping": "Use designated camping such as Klint Safford Memorial RV Park on the Iron River; no informal riverbank camping is assumed.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Mattioli Park and take out at the Brady Avenue / Apple Blossom Trail parking area. The short reach is the conservative default; the corridor can extend toward Museum Drive only after confirming flow, wood, and take-out logistics.",
      "accessCaveats": ["American Whitewater provides the named access points and coordinates, but access signage and parking conditions can change; confirm the launch and trailhead before committing.", "The gauge is at Caspian on the same Iron River system; use its 150-800 cfs band as tentative guidance, not a substitute for visual scouting.", "Use the named public endpoints and do not cross private frontage for improvised access."],
      "watchFor": ["Shallow water, shoals, a small ledge, strainers, and cold water.", "Fast rises after rain and changing wood in the Class I-II corridor.", "Below 150 cfs may be difficult; above the tentative band requires conservative same-day judgment."]
    },
    "corridorId": "iron-river-mattioli-brady",
    "corridorLabel": "Iron River / American Whitewater Caspian reach",
    "continuityStatus": "verified"
  },
  "cass-river-tuscola-frankenmuth": {
    "putIn": {"id": "tuscola-township-park", "name": "Tuscola Township Park Access", "latitude": 43.32724, "longitude": -83.6518},
    "takeOut": {"id": "frankenmuth-memorial-park", "name": "Frankenmuth Memorial Park Boat Launch", "latitude": 43.33097, "longitude": -83.73291},
    "logistics": {
      "distanceLabel": "5 mi",
      "estimatedPaddleTime": "1.5 to 2.25 hr",
      "shuttle": "Stage a two-car shuttle between Tuscola Township Park and the selected Frankenmuth launch. Confirm event-day access and parking before launching.",
      "permits": "No route-specific permit is listed by the Cass River Water Trail; follow city, township, launch, and posted river rules.",
      "camping": "No on-route camping is assumed. Use designated nearby parks/campgrounds and do not camp on private river frontage.",
      "campingClassification": "none",
      "summary": "Begin at the gentle Tuscola Township Park access and finish at the public Heritage/Memorial Park launch in Frankenmuth. The route becomes slower and wider near Frankenmuth.",
      "accessCaveats": ["Tuscola has a gravel lot for 6-8 vehicles and a gentle pathway to the river.", "Frankenmuth launches have seasonal/event access limitations; Memorial Park is the documented alternative when Heritage is closed.", "The endpoint coordinates are address-resolved and should be checked against current launch signage."],
      "watchFor": ["Below 100 cfs, expect a tough paddle and possible shallow conditions.", "Avoid the Frankenmuth rock ramp/rapids; portage or take out as directed.", "Motorboats, changing weather, cold water, and fast rises require visual same-day judgment."]
    },
    "corridorId": "cass-river-tuscola-frankenmuth",
    "corridorLabel": "Cass River Water Trail",
    "continuityStatus": "verified"
  },
  "pine-river-edgetts-lincoln": {
    "putIn": {
      "id": "edgetts",
      "name": "Edgetts Pine River launch",
      "latitude": 44.062496,
      "longitude": -85.583206
    },
    "takeOut": {
      "id": "lincoln-bridge",
      "name": "Lincoln Bridge Campground Boat Launch",
      "latitude": 44.13303,
      "longitude": -85.69622
    },
    "logistics": {
      "distanceLabel": "About 13.1 mi",
      "estimatedPaddleTime": "Long day, roughly 4 hr to 5.5 hr depending on level, wood, and stops",
      "shuttle": "Use a two-car upper Pine shuttle from Lincoln Bridge back to Edgetts. Meadow Brook Bridge, Skookum, and Walker Bridge are intermediate Pine River access landmarks, but plan the route as a committed moving-water day unless you have confirmed shorter access and parking.",
      "permits": "American Whitewater says Edgetts to Lincoln Bridge does not require the downstream Pine National Scenic River permit. Still check current Michigan DNR, Forest Service, and local access signage before launch, especially if continuing below Lincoln.",
      "camping": "Lincoln Bridge State Forest Campground is at the take-out, with Silver Creek State Forest Campground nearby upstream. Use those legal campground options rather than assuming riverbank camping or private-shore stops.",
      "summary": "Launch at Edgetts and take out at Lincoln Bridge for the upper Pine River moving-water reach above the federal permit corridor. Use the Hoxeyville USGS gauge as a conservative low-water check, then make same-day decisions from access signage, wood, and weather.",
      "accessCaveats": [
        "Edgetts is mapped and coordinate-backed by the Cadillac Area Visitors Bureau / Forest Service Pine River map and named by American Whitewater, but it is not as cleanly documented as Lincoln in Outdoor Michigan. Follow current signs and do not use private land if access has changed.",
        "Lincoln Bridge is a Michigan DNR carry-in launch with limited parking in Outdoor Michigan. Stage the take-out first so the exit and parking are clear before launch.",
        "The Hoxeyville gauge is downstream on the same Pine River corridor. American Whitewater says it may vary slightly from the upper reach, so treat 170 cfs as a low-water screen rather than a full quality guarantee."
      ],
      "watchFor": [
        "Shallow fast current, tight bends, occasional low Class II spots, and logs or stumps piled into turns.",
        "Scraping and harder boat control when the Hoxeyville gauge falls below the 170 cfs floor used by the app.",
        "Sweepers, logjams, cold water, storm damage, and limited legal stops away from named public access points.",
        "Do not continue below Lincoln without checking the downstream Pine Scenic River permit rules and route plan."
      ]
    }
  },
  "pine-river-peterson-low-bridge": {
    "putIn": {
      "id": "peterson-bridge",
      "name": "Peterson Bridge River Access",
      "latitude": 44.203235,
      "longitude": -85.799124
    },
    "takeOut": {
      "id": "low-bridge",
      "name": "Low Bridge River Access",
      "latitude": 44.218493,
      "longitude": -85.901885
    },
    "logistics": {
      "distanceLabel": "About 8.25 to 8.6 mi",
      "estimatedPaddleTime": "About 3.5 hr on-water time, plus scouting, wood delays, and landing congestion",
      "shuttle": "Use a two-car Manistee National Forest shuttle between Peterson Bridge River Access and Low Bridge River Access. The corridor uses forest roads and permit-managed landings, so stage the Low Bridge take-out before launching.",
      "permits": "A Pine National Scenic River permit is required during the Forest Service permit season. Recreation.gov manages Pine River permits and lists both Peterson Bridge and Low Bridge as access choices; check current availability, parking limits, and launch timing before the trip.",
      "camping": "Peterson Bridge Campground is at the put-in, including paddle- or walk-in sites under Forest Service rules. Use designated sites or separately reserved campgrounds rather than assuming informal on-route camping.",
      "summary": "Launch at Peterson Bridge River Access and take out at Low Bridge River Access for a permit-managed Pine River day in the Huron-Manistee National Forests. Use the Hoxeyville USGS gauge as a conservative low-water check, not a full ideal-range promise.",
      "accessCaveats": [
        "Both endpoints are official Pine River access points, but permit rules, launch windows, parking capacity, and temporary storm-damage notices can change the practical plan.",
        "Published Pine River maps and route guides list Peterson Bridge to Low Bridge at roughly 8.25 to 8.6 miles, with travel time varying substantially by level, wood, stops, and boat traffic.",
        "The Hoxeyville gauge is a direct same-river gauge downstream of the route. It is useful for same-day flow, but local wood and storm damage can matter as much as the number."
      ],
      "watchFor": [
        "Fast current, sharp bends, narrow passages, sweepers, downed trees, and logjams.",
        "Scraping and more difficult maneuvering when the Hoxeyville gauge is below the 170 cfs floor used by the app.",
        "Cold water, strainers after storms, busy summer permit traffic, and limited quick exits between access sites.",
        "Do not launch without checking current Forest Service alerts, permit status, and recent Pine River hazard reports."
      ]
    }
  },
  "huron-river-argo-gallup": {
    "putIn": {
      "id": "argo-park-canoe-livery",
      "name": "Argo Park Canoe Livery public launch",
      "latitude": 42.29148,
      "longitude": -83.74444
    },
    "takeOut": {
      "id": "gallup-park-livery",
      "name": "Gallup Park Livery public launch",
      "latitude": 42.27662607766229,
      "longitude": -83.69985349633218
    },
    "logistics": {
      "distanceLabel": "3.5 mi",
      "estimatedPaddleTime": "About 1.5 hr, longer with crowds, low water, or repeated Cascades laps",
      "shuttle": "Use the City of Ann Arbor livery shuttle when operating, or stage a two-car shuttle between Gallup Park and Argo. Parking at Argo is limited, so check city parking guidance before unloading on busy weekends.",
      "permits": "No route-specific paddling permit is known for private boats. Follow City of Ann Arbor livery, launch, parking, and park rules, and confirm seasonal hours if relying on rentals or shuttle service.",
      "camping": "Treat this as a short urban day trip. No on-route camping plan is assumed between Argo and Gallup.",
      "summary": "Launch at Argo Park Canoe Livery, run the Argo Cascades or use the appropriate city launch option for your craft, then continue through Ann Arbor parkland to Gallup Park Livery. Use the Ann Arbor USGS gauge plus same-day livery, signage, and visual checks because the Cascades are dam-adjacent and can be crowded.",
      "accessCaveats": [
        "Argo and Gallup are City of Ann Arbor facilities with seasonal livery operations, launches, parking, restrooms, and rentals; hours and shuttle availability change by season.",
        "The Gallup marker is the City-mapped boat dock at the canoe livery. The livery parking area is northwest of the dock and is stored separately; do not confuse this endpoint with the separate trailer boat ramp farther east in Gallup Park.",
        "Canoes may be launched downstream of the Cascades under city livery operations, while kayaks, rafts, tubes, and properly skilled private paddlers use the Cascades according to current rules and signage.",
        "The Barton Dam / Barton Pond closure is upstream of this route, but it affects longer Huron River trip planning and should not be treated as a usable upstream portage."
      ],
      "watchFor": [
        "Argo Cascades drops, rock chutes, and pools; scout from the adjacent path if you have not run them before.",
        "Crowded summer weekends with kayaks, rafts, tubes, paddleboards, rowboats, and livery traffic sharing a short corridor.",
        "Low, high, or changing dam-adjacent levels; verify current livery rules, boat availability, and visual conditions even when the Ann Arbor gauge looks acceptable.",
        "PFAS advisories on the Huron River include avoiding contact with foam and washing hands, pets, and gear after exposure."
      ]
    }
  },
  "clinton-river-downtown-utica-budd": {
    "putIn": {
      "id": "downtown-utica",
      "name": "Downtown Utica water-trail access",
      "latitude": 42.625576,
      "longitude": -83.037665
    },
    "takeOut": {
      "id": "budd-park",
      "name": "Budd Park carry-in launch",
      "latitude": 42.586506,
      "longitude": -82.927598
    },
    "logistics": {
      "distanceLabel": "About 11.8 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "About 4 hr to 6 hr for the full corridor, shorter with North Clinton River Park or Rotary Park pairings.",
      "shuttle": "Choose a water-trail access pair, stage the downstream vehicle first, and inspect both launches before committing.",
      "permits": "No route-specific paddling permit is known. Follow City of Utica and City of Sterling Heights park, launch, parking, and posted water-trail rules at the public access sites.",
      "camping": "Treat this as an urban day-trip corridor. No on-route camping plan is assumed.",
      "summary": "Use this as the upper Macomb Clinton River access-planner corridor from Downtown Utica to Budd Park, with North Clinton River Park and Rotary Park options.",
      "accessCaveats": [
        "Public access rules, park hours, and construction can change quickly in this urban corridor.",
        "The full corridor is a planning envelope; shorter access pairs are usually more practical.",
        "Stay with mapped water-trail accesses rather than private banks."
      ],
      "watchFor": [
        "High, fast water and woody debris after rain.",
        "Bridge current, blind bends, and urban stormwater.",
        "Low-water scraping near the low warning."
      ]
    },
    "accessPoints": [
      {
        "id": "downtown-utica",
        "name": "Downtown Utica water-trail access",
        "latitude": 42.625576,
        "longitude": -83.037665,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default corridor put-in."
      },
      {
        "id": "north-clinton-river-park",
        "name": "North Clinton River Park accessible launch",
        "latitude": 42.607767,
        "longitude": -83.024447,
        "mileFromStart": 2.2,
        "segmentKind": "creek",
        "note": "Short urban access option."
      },
      {
        "id": "rotary-park-sterling-heights",
        "name": "Rotary Park accessible launch",
        "latitude": 42.570595,
        "longitude": -82.971459,
        "mileFromStart": 8.2,
        "segmentKind": "creek",
        "note": "Accessible launch and common corridor split point."
      },
      {
        "id": "budd-park",
        "name": "Budd Park carry-in launch",
        "latitude": 42.586506,
        "longitude": -82.927598,
        "mileFromStart": 11.8,
        "segmentKind": "creek",
        "note": "Default corridor finish."
      }
    ]
  },
  "clinton-river-macarthur-harley-ensign": {
    "putIn": {
      "id": "neil-dempsey-macarthur-park",
      "name": "Neil Dempsey Launch at MacArthur Park",
      "latitude": 42.597338,
      "longitude": -82.871104
    },
    "takeOut": {
      "id": "harley-ensign-dnr",
      "name": "Harley Ensign DNR launch",
      "latitude": 42.593327,
      "longitude": -82.774834
    },
    "logistics": {
      "distanceLabel": "About 7.2 mi",
      "estimatedPaddleTime": "About 2.5 hr to 3.5 hr, longer with wind, current, or motorboat traffic",
      "shuttle": "Stage the take-out at Harley Ensign in Harrison Township, then drive back to MacArthur Park in Mount Clemens. Check the Harley Ensign landing, wind direction, and Lake St. Clair conditions before leaving a vehicle because this finish is close to open water.",
      "permits": "No route-specific paddling permit is known. Follow Mount Clemens, Harrison Township, DNR, and Clinton River Water Trail access rules, plus any posted launch or parking requirements at Harley Ensign.",
      "camping": "Treat this as a day trip. No on-route camping plan is assumed between MacArthur Park and Harley Ensign.",
      "summary": "Launch at the Neil Dempsey launch in MacArthur Park and follow the lower Clinton River to Harley Ensign at the Lake St. Clair end of the water trail. Use the Sterling Heights USGS stage as a warning check, then make a separate wind, waves, boat-traffic, and water-quality decision for the mouth section.",
      "accessCaveats": [
        "CRWC maps Neil Dempsey at MacArthur Park and Harley Ensign (DNR) as Clinton River Water Trail access points with coordinates and a 7.2-mile access spacing.",
        "Harley Ensign is at the Lake St. Clair end of the route, so inspect the take-out and do not let river current push the group into open-water exposure without an intentional plan.",
        "Stay with public launches and avoid private banks; CRWC specifically tells paddlers to plan exits at public access points."
      ],
      "watchFor": [
        "Low-water scraping or slow travel when the Sterling Heights gauge is at or below the CRWC 8 ft low-water warning.",
        "High, fast water, strainers, and woody debris when the gauge approaches or exceeds the 10 ft high-water warning, especially after rain.",
        "Urban stormwater and possible sewage-overflow water-quality concerns after high-flow events.",
        "Motorboat traffic, wind, waves, marina or channel traffic, and open-water consequences near Lake St. Clair.",
        "Do not continue onto Lake St. Clair unless your group has the weather window, craft, navigation, and rescue plan for open-water paddling."
      ]
    }
  },
  "clinton-river-shadyside-macarthur": {
    "putIn": {
      "id": "shadyside-park",
      "name": "Shadyside Park boat and canoe launch",
      "latitude": 42.582529,
      "longitude": -82.880104
    },
    "takeOut": {
      "id": "neil-dempsey-macarthur-park",
      "name": "Neil Dempsey Launch at MacArthur Park",
      "latitude": 42.597338,
      "longitude": -82.871104
    },
    "logistics": {
      "distanceLabel": "About 2.0 mi",
      "estimatedPaddleTime": "About 45 min to 1 hr, longer with low water, wood, or launch congestion",
      "shuttle": "Stage the take-out at MacArthur Park, then drive back to Shadyside Park. Inspect MacArthur before launching because downtown events, docks, or riverfront activity can slow the finish.",
      "permits": "No route-specific paddling permit is known. Follow Mount Clemens park, launch, and parking rules at both public access sites.",
      "camping": "Treat this as a short day trip. No on-route camping plan is assumed between Shadyside Park and MacArthur Park.",
      "summary": "Launch at Shadyside Park and take out at the Neil Dempsey launch in MacArthur Park for a very short Mount Clemens lower-Clinton link. Use the Sterling Heights gauge as a conservative warning check, then make a same-day call on wood, signage, and any lower-river obstructions before committing.",
      "accessCaveats": [
        "Mount Clemens says Shadyside Park has a handicapped accessible pier with a boat and canoe launch.",
        "Mount Clemens says MacArthur Park includes the Neil Dempsey universally accessible kayak launch.",
        "Do not continue downstream beyond MacArthur without a separate lower-river and Lake St. Clair plan."
      ],
      "watchFor": [
        "Low-water scraping or muddy landings when the Sterling Heights gauge is below the CRWC 8 ft low-water warning.",
        "Fast rises after rain, floating wood, strainers, and any posted dam or weir warning signage in the Mount Clemens reach.",
        "Urban stormwater and sewer-overflow water-quality concerns after wet weather."
      ]
    }
  },
  "ontonagon-middle-branch-watersmeet-forest-road-5250": {
    "putIn": {"id": "watersmeet-canoe-landing", "name": "Designated Watersmeet canoe access south of Highway 45", "latitude": 46.27471, "longitude": -89.17656},
    "takeOut": {"id": "forest-road-5250-bridge", "name": "Forest Road 5250 bridge/take-out northeast of Watersmeet", "latitude": 46.35672, "longitude": -89.07679},
    "logistics": {
      "distanceLabel": "16.25 mi",
      "estimatedPaddleTime": "About 6 to 8 hr depending on flow, scouting, portage, and stops",
      "shuttle": "Stage the Forest Road 5250 take-out before launching at the designated Watersmeet canoe access. Confirm current Forest Service road conditions, parking, and take-out access; do not assume an informal forest pull-off is open.",
      "permits": "No route-specific paddling permit is identified. Follow current Ottawa National Forest, Michigan boating, road, parking, and posted access rules.",
      "camping": "No on-route camping is assumed. Burned Dam Campground is documented in the broader Middle Branch Ontonagon corridor; verify current reservation, season, and access rules separately.",
      "campingClassification": "nearby_basecamp",
      "summary": "This remote Middle Branch Ontonagon corridor links the designated Watersmeet canoe access to the Forest Road 5250 bridge/take-out. The documented run includes Class I-II water and a mandatory portage around Max-i-min-e Falls; direct USGS 04033000 telemetry and conservative community flow guidance support planning, not a safety guarantee.",
      "accessCaveats": ["Verify current road, parking, and launch conditions at both remote endpoints before committing to the shuttle.", "Portage Max-i-min-e Falls; do not run it. Scout ledges, boulder gardens, wood, and any changing channel features.", "Use the direct 04033000 reading, trend, weather, water temperature, and same-day visual conditions; 165-180 cfs is community planning guidance only.", "File a float plan and carry communication/rescue equipment; cell service and assistance are limited in the forest corridor."],
      "watchFor": ["Low water, fast rises, cold water, strainers, and changing rapids around bends and ledges.", "The mandatory Max-i-min-e Falls portage and any downstream dam or ledge hazards; stop and portage whenever the line is unclear.", "Private or closed forest frontage outside the named endpoints; do not assume informal camping or access."]
    },
    "corridorId": "middle-branch-ontonagon-river",
    "corridorLabel": "Middle Branch Ontonagon River / Watersmeet to Forest Road 5250",
    "continuityStatus": "verified"
  },
  "muskegon-river-crawford-park-evart": {
    "putIn": {"id": "crawford-park-m66", "name": "Crawford Park (M-66) public boat launch", "latitude": 43.946851, "longitude": -85.149897},
    "takeOut": {"id": "evart-riverside-park", "name": "Evart Riverside Park public canoe access", "latitude": 43.895675, "longitude": -85.257482},
    "logistics": {
      "distanceLabel": "About 10 mi",
      "estimatedPaddleTime": "About 3 to 5 hr depending on flow, wood, stops, and launch conditions",
      "shuttle": "Stage the Evart Riverside Park take-out before launching at Crawford Park, or use a current local livery shuttle. J&J documents scheduled Crawford-to-Evart trips; confirm current parking, hours, and transport before committing.",
      "permits": "No route-specific paddling permit is known. Follow Michigan boating rules and current City of Evart, Sylvan Township, and park access requirements.",
      "camping": "Treat this as a long day route. Riverside Park and nearby designated campgrounds may support overnight logistics; verify current season, reservation, and access rules separately.",
      "campingClassification": "nearby_basecamp",
      "summary": "This moving-water Muskegon corridor follows the documented M-66/Crawford Park to Evart float. Use the direct 04121500 reading, same-day wood and weather inspection, and a staged take-out; do not infer private-bank camping or landing rights.",
      "accessCaveats": ["Confirm Crawford Park ramp, parking, and any closure notices before launch.", "Confirm Evart Riverside Park canoe access, parking, and riverfront conditions before staging the shuttle.", "Do not continue beyond the named Evart take-out without a separate downstream plan."],
      "watchFor": ["Low water, shallow gravel, sweepers, strainers, and fallen trees in the low-gradient corridor.", "Rapid rises after storms, cold water, lightning, and flood-warning closures.", "Busy livery traffic near Crawford Park and Riverside Park; keep clear of other launches and follow posted rules."]
    },
    "corridorId": "muskegon-river-crawford-park-evart",
    "corridorLabel": "Muskegon River / Crawford Park (M-66) to Evart Riverside Park",
    "continuityStatus": "verified"
  },
  "muskegon-river-croton-dam-thornapple": {
    "putIn": {"id": "croton-dam-tailwater-park", "name": "Croton Dam Tailwater Park public boat launch below Croton Dam", "latitude": 43.435561, "longitude": -85.66678},
    "takeOut": {"id": "thornapple-high-rollway", "name": "Thornapple High Rollway public boat access", "latitude": 43.414845, "longitude": -85.719017},
    "logistics": {
      "distanceLabel": "About 6.5 mi",
      "estimatedPaddleTime": "About 2.5 to 4 hr depending on flow, wood, stops, and access conditions",
      "shuttle": "Stage the Thornapple High Rollway take-out before launching at the Croton Dam Tailwater Park. Local operators document Croton-to-Thornapple trips and shuttle service; confirm current parking, launch, and pickup arrangements.",
      "permits": "No route-specific paddling permit is known. Follow Michigan boating rules, posted dam restrictions, and current Croton Township/Newaygo State Park access requirements.",
      "camping": "Treat this as a day route. Use designated Croton-area or Thornapple-area campgrounds only after verifying current season, fees, reservations, and access rules.",
      "campingClassification": "nearby_basecamp",
      "summary": "This 6.5-mile Class I reach begins below Croton Dam and ends at Thornapple High Rollway. The dam is a mandatory no-run/portage hazard; use the direct 04121970 reading, same-day inspection, and a staged take-out before committing.",
      "accessCaveats": ["Never launch above or run Croton Dam; use only the named tailwater access below the structure and obey all posted closure/portage signs.", "Confirm Thornapple High Rollway parking, Recreation Passport requirements, and take-out condition before launch.", "Do not continue downstream beyond the named take-out without a separate Newaygo-area plan."],
      "watchFor": ["Dam turbulence, eddies, strainers, shallow gravel, and fishing or livery traffic.", "Rapid rises after storms, cold water, lightning, and flood-warning closures.", "Private or restricted bank frontage; use only named public access and designated facilities."]
    },
    "corridorId": "muskegon-river-croton-dam-thornapple",
    "corridorLabel": "Muskegon River / Croton Dam Tailwater to Thornapple High Rollway",
    "continuityStatus": "verified"
  },
  "north-branch-au-sable-lovells-kelloggs": {
    "putIn": {"id": "lovells-bridge-access", "name": "Lovells Bridge public carry-in access", "latitude": 44.803931, "longitude": -84.481941},
    "takeOut": {"id": "kelloggs-bridge-access", "name": "Kelloggs Bridge public river access and roadside parking", "latitude": 44.716469, "longitude": -84.419502},
    "logistics": {
      "distanceLabel": "Roughly 8 mi planning reach",
      "estimatedPaddleTime": "About 4 to 5 hr depending on flow, shallow bars, wood, and scouting",
      "shuttle": "Stage the Kelloggs Bridge take-out before launching at Lovells Bridge, or arrange a current local shuttle. Confirm the carry-in, roadside parking, and bridge access on the day of the trip.",
      "permits": "No route-specific paddling permit is known. Follow Michigan boating rules, Lovells Township access rules, posted bridge/roadside parking limits, and any current DNR restrictions.",
      "camping": "Treat this as a day route. Use designated nearby township or forest campgrounds only after verifying current season, reservation, and access rules.",
      "campingClassification": "nearby_basecamp",
      "summary": "This North Branch Au Sable route links the documented Lovells Bridge access with the Kelloggs Bridge take-out and direct USGS 04135800 telemetry. The reach is narrow, shallow, braided, and cold-water; 139–141 cfs references are conservative planning guidance, not a safety guarantee.",
      "accessCaveats": ["Lovells Bridge is carry-in access; verify the road approach, parking, and bank condition before loading boats.", "Kelloggs Bridge has limited roadside parking and surrounding private frontage; stay in the river and use only the named access.", "Do not assume additional bridge or private-bank access between endpoints; portage or turn around when wood, shallow bars, or braided channels make the route unclear."],
      "watchFor": ["Low water, gravel bars, shallow braids, sweepers, log jams, and tight turns.", "Rapid rises after storms, cold water, lightning, and changing channel conditions.", "Limited services and cell coverage; carry communication/rescue equipment and file a float plan."]
    },
    "corridorId": "north-branch-au-sable-lovells-kelloggs",
    "corridorLabel": "North Branch Au Sable / Lovells Bridge to Kelloggs Bridge",
    "continuityStatus": "verified"
  },
  "paw-paw-river-riverside-graham-avenue": {
    "putIn": {"id": "riverside-kayak-park", "name": "Riverside Kayak Park public dock and carry-in access", "latitude": 42.186122, "longitude": -86.373262},
    "takeOut": {"id": "graham-avenue-water-access", "name": "Graham Avenue public boat launch, Benton Harbor", "latitude": 42.117303, "longitude": -86.468198},
    "logistics": {
      "distanceLabel": "Approximately 11 river miles",
      "estimatedPaddleTime": "About 5 to 7 hr depending on water level, wood, and portages",
      "shuttle": "Stage the Graham Avenue take-out before launching at Riverside Kayak Park; there are limited intermediate take-outs on the advanced section.",
      "permits": "No route-specific permit is known. Follow Michigan boating rules and posted water-trail, park, and launch rules.",
      "camping": "Treat this as a day route. Use designated Paw Paw River campgrounds or nearby lodging after verifying current season and reservations.",
      "campingClassification": "nearby_basecamp",
      "summary": "This approximately 11-mile Paw Paw River Water Trail route links Riverside Kayak Park with Graham Avenue and direct USGS 04102500 telemetry. The advanced upstream section has tree fall and slide-overs; 6 ft at Riverside is conservative community planning guidance, not a safety guarantee.",
      "accessCaveats": ["Riverside Kayak Park has a public dock and parking; verify carry and parking conditions before loading boats.", "Graham Avenue has a developed public launch and parking fee; stage the take-out before launch.", "Do not assume intermediate take-outs on the nine-mile Riverside-to-Benton Harbor section; portage or turn around when wood blocks the channel.", "Avoid the St. Joseph River confluence and railroad-trestle area unless separately planned for larger current and motorized traffic."],
      "watchFor": ["Tree falls, slide-overs, shallow water, cold water, and rapid rises after storms.", "Limited take-outs and shuttle dependence.", "Open-water and motorized-traffic hazards near the Graham Avenue/St. Joseph River end."]
    },
    "corridorId": "paw-paw-river-riverside-graham-avenue",
    "corridorLabel": "Paw Paw River / Riverside Kayak Park to Graham Avenue",
    "continuityStatus": "verified"
  },
  "pere-marquette-river-custer-scottville": {
    "putIn": {"id": "custer-weir-boat-launch", "name": "Custer Weir & Boat Launch public access", "latitude": 43.93713, "longitude": -86.21868},
    "takeOut": {"id": "scottville-riverside-park-boat-launch", "name": "Scottville Riverside Park boat launch", "latitude": 43.94523, "longitude": -86.282},
    "logistics": {
      "distanceLabel": "Approximately 8 river miles",
      "estimatedPaddleTime": "About 1.5 to 3 hours depending on flow, stops, and wood",
      "shuttle": "Stage the Scottville Riverside Park take-out before launching at Custer Weir; River Run Canoe offers transportation context for the Custer-to-Scottville trip.",
      "permits": "No Forest Service permit is indicated for this Scottville-area municipal reach; verify current Michigan boating rules and posted launch requirements.",
      "camping": "Scottville Riverside Park offers modern and primitive campsites; treat camping as a designated destination, not informal riverbank camping.",
      "campingClassification": "endpoint_campground",
      "summary": "An approximately 8-mile Custer-to-Scottville Pere Marquette reach with public launches, direct USGS 04122500 telemetry, and established livery use. The 411 cfs lower-quartile and 342 cfs minimum references are conservative planning aids, not safety guarantees.",
      "accessCaveats": ["Custer Weir has paved launches and parking; verify seasonal access and carry conditions before staging.", "Scottville Riverside Park has an off-site boat launch adjacent to camping; confirm current park and launch rules.", "The river is cold, moving water with logs, rocks, and changing current; use named public accesses and do not infer private-bank exits."],
      "watchFor": ["Low water, shallow sections, logs, strainers, and cold water.", "Rapid rises after rain and changing current lines.", "Limited intermediate exits and shuttle dependence."]
    },
    "corridorId": "pere-marquette-river-custer-scottville",
    "corridorLabel": "Pere Marquette River / Custer Weir to Scottville Riverside Park",
    "continuityStatus": "verified"
  },
  "pigeon-river-hemlock-crossing-sheldon-landing": {
    "putIn": {"id": "hemlock-crossing-kayak-launch", "name": "Hemlock Crossing County Park public kayak/canoe launch", "latitude": 42.91593, "longitude": -86.14705},
    "takeOut": {"id": "sheldon-landing-pigeon-river", "name": "Sheldon Landing public boat launches, Crab Drive", "latitude": 42.90377, "longitude": -86.19734},
    "logistics": {
      "distanceLabel": "Approximately 5 to 6 river miles through Hemlock Crossing, Pine Bend, and Pigeon River corridor",
      "estimatedPaddleTime": "About 2 to 3 hours depending on flow, stops, wood, and carries",
      "shuttle": "Stage the Sheldon Landing take-out before launching at Hemlock Crossing; Ottawa County guided trips provide established shuttle context.",
      "permits": "No route-specific paddling permit is identified. Verify current Ottawa County, Port Sheldon Township, Michigan boating, parking, and launch rules.",
      "camping": "Treat this as a day route. Use designated nearby campgrounds or lodging and do not camp on park or private river frontage.",
      "campingClassification": "nearby_basecamp",
      "summary": "A documented lower Pigeon River day route from Hemlock Crossing's public kayak launch to Sheldon Landing, using direct USGS 04108862 telemetry. The 3 cfs reference is a conservative hydrologic planning floor, not a runnable or safety guarantee.",
      "accessCaveats": ["Hemlock Crossing has a public carry-in kayak/canoe launch; confirm hours, parking, carry conditions, and closures before loading boats.", "Sheldon Landing has three land boat launches on Crab Drive; confirm current township access and parking conditions.", "The 3 cfs planning floor is derived from Ottawa County watershed reporting for USGS 04108862, not an agency-certified paddling threshold; pair it with trend, weather, and same-day scouting.", "Do not assume intermediate private-bank landings, portage rights, or camping; use only named public endpoints."],
      "watchFor": ["Low water, shallow sections, strainers, and newly fallen wood.", "Rapid rises after storms and cold water.", "Shuttle timing and seasonal access hours at both public endpoints."]
    },
    "corridorId": "pigeon-river-hemlock-crossing-sheldon-landing",
    "corridorLabel": "Pigeon River / Hemlock Crossing to Sheldon Landing",
    "continuityStatus": "verified"
  },
  "platte-river-honor-upper": {
    "putIn": {"id": "platte-river-state-forest-campground", "name": "Platte River State Forest Campground river access", "latitude": 44.64546752, "longitude": -85.978332},
    "takeOut": {"id": "platte-river-park-honor", "name": "Platte River Park kayak launch at Indian Hill Road", "latitude": 44.67075, "longitude": -86.03713},
    "logistics": {
      "distanceLabel": "Approximately 8.6 river miles from the US-31 campground reach to Platte River Park",
      "estimatedPaddleTime": "About 2.5 to 4 hours depending on flow, stops, wood, and carries",
      "shuttle": "Stage the Platte River Park take-out before launching at the state forest campground; the upper-Platte guide describes this as a two-car shuttle route.",
      "permits": "A Michigan Recreation Passport is required for vehicle entry at the state forest campground; verify current park, parking, and launch rules at both endpoints.",
      "camping": "The state forest campground provides designated rustic camping at the put-in. Do not camp on private river frontage or at Platte River Park unless expressly permitted.",
      "campingClassification": "endpoint_campground",
      "summary": "An approximately 8.6-mile upper Platte reach with a public state campground put-in, public Platte River Park take-out, direct USGS 04126740 telemetry, and a conservative 90 cfs historical low-water screen.",
      "accessCaveats": ["The campground and park are public but seasonal rules, parking, Recreation Passport requirements, and launch conditions can change.", "The Platte River Park kayak launch is a carry-in access; inspect the dock, bank, and water level before loading boats.", "The 90 cfs reference is a hydrologic planning screen, not a runnable or safety guarantee; pair it with trend, weather, wood, and same-day scouting.", "Do not use private property or informal bank exits along the route."],
      "watchFor": ["Low water, shallow sections, boulders, and deadfall.", "Rapid rises after storms and cold water.", "Shuttle timing and seasonal access hours at both endpoints."]
    },
    "corridorId": "platte-river-honor-upper",
    "corridorLabel": "Platte River / State Forest Campground to Platte River Park",
    "continuityStatus": "verified"
  },
  "portage-river-north-fisher-three-rivers": {
    "putIn": {"id": "portage-river-north-fisher-lake-road", "name": "North Fisher Lake Road roadside launch", "latitude": 42.0082036, "longitude": -85.5672093},
    "takeOut": {"id": "conservation-park-portage-river", "name": "Conservation Park public boat launch, Three Rivers", "latitude": 41.94153, "longitude": -85.63167},
    "logistics": {
      "distanceLabel": "Approximately 10 to 12 river miles planning reach with a dam portage",
      "estimatedPaddleTime": "About 4 to 6 hours depending on flow, lake conditions, wood, and the portage",
      "shuttle": "Stage the Conservation Park take-out before launching at North Fisher Lake Road; the route guide documents this as the endpoint pair.",
      "permits": "No route-specific permit is known. Follow Michigan boating rules, city park rules, posted roadside parking limits, and any current closure or dam-portage notices.",
      "camping": "Treat this as a day route. Use designated nearby campgrounds or lodging after verifying current season and reservations; do not camp on river frontage.",
      "campingClassification": "nearby_basecamp",
      "summary": "A documented Portage River day route from North Fisher Lake Road to Conservation Park with direct USGS 04097345 telemetry near the lower endpoint. The 50 cfs screen is a conservative planning aid, not a safety guarantee.",
      "accessCaveats": ["The North Fisher Lake Road launch is a small roadside access; verify parking, bank condition, and public use before loading boats.", "Conservation Park is public but hours, parking, and launch conditions can change.", "The corridor includes a dam portage, shallow water, fallen trees, and limited intermediate exits; scout and turn around when conditions are unclear."],
      "watchFor": ["Low water, shallow bars, fallen trees, strainers, and narrow channels.", "Dam portage and moderate-to-fast current below the dam.", "Rapid rises after storms, cold water, and limited take-outs."]
    },
    "corridorId": "portage-river-north-fisher-three-rivers",
    "corridorLabel": "Portage River / North Fisher Lake Road to Conservation Park",
    "continuityStatus": "verified"
  },
  "prairie-river-prairie-lake-nottawa": {
    "putIn": {"id": "prairie-river-lake-public-access", "name": "Prairie River Lake public access", "latitude": 41.85472, "longitude": -85.41319},
    "takeOut": {"id": "nottawa-park-sand-lake", "name": "Nottawa Park / Sand Lake public destination", "latitude": 41.930012, "longitude": -85.528578},
    "logistics": {
      "distanceLabel": "Approximately 10 to 12 river miles planning reach; use the documented Findley Road exit to shorten the trip",
      "estimatedPaddleTime": "About 4 hours for the full county-planner trip, or roughly 2.5 hours to Findley Road",
      "shuttle": "Stage the Nottawa Park/Sand Lake finish before launching at Prairie River Lake; St. Joseph County suggests Liquid Therapy for transportation.",
      "permits": "No route-specific permit is known. Follow Michigan boating rules, county park hours, access rules, and any current Lake Templene or dam-portage notices.",
      "camping": "Treat this as a day route. Use designated nearby campgrounds or lodging after verifying current season and reservations; do not camp on river frontage.",
      "campingClassification": "nearby_basecamp",
      "summary": "A current county-documented Prairie River Trip 1 from Prairie River Lake to Nottawa Park, with a Findley Road exit and a direct long-term USGS 04097540 gauge near Nottawa. The 40 cfs screen is a planning aid, not a safety guarantee.",
      "accessCaveats": ["The Prairie River Lake public access and Nottawa finish are public but hours, parking, and carry conditions can change.", "The county planner recommends exiting before Lake Templene to avoid the large lake and the downstream dam portage.", "Tree fall and shallow sections can change; use only named access points and do not assume intermediate private-bank exits."],
      "watchFor": ["Low water, shallow bars, fallen trees, and strainers.", "Open-lake wind exposure on Prairie River Lake/Lake Templene.", "Lake Templene dam portage and shuttle timing."]
    },
    "corridorId": "prairie-river-prairie-lake-nottawa",
    "corridorLabel": "Prairie River / Prairie River Lake to Nottawa Park",
    "continuityStatus": "verified"
  },
  "red-cedar-river-roadside-msu": {
    "putIn": {"id": "red-cedar-roadside-park", "name": "Red Cedar Roadside Park public launch", "latitude": 42.709861, "longitude": -84.364028},
    "takeOut": {"id": "msu-red-cedar-launch", "name": "MSU Canoe & Kayak Launch near Jenison Field House", "latitude": 42.730833, "longitude": -84.491694},
    "logistics": {
      "distanceLabel": "Approximately 8 to 10 river miles planning reach",
      "estimatedPaddleTime": "About 3 to 5 hours depending on flow, wood, current, and urban stops",
      "shuttle": "Stage the MSU take-out before launching at Red Cedar Roadside Park; verify the seasonal campus launch is open and that parking/vehicle access is allowed.",
      "permits": "No route-specific permit is known. Follow Michigan boating rules, campus access rules, park hours, and any posted launch or construction restrictions.",
      "camping": "Treat this as a day route. Use designated nearby lodging or campgrounds after verifying current season and reservations; do not camp on campus or river frontage.",
      "campingClassification": "nearby_basecamp",
      "summary": "A Red Cedar River Water Trail reach from Red Cedar Roadside Park through Okemos to the seasonal MSU launch, using direct USGS 04112500 telemetry near the take-out. The 30 cfs screen is a planning aid, not a safety guarantee.",
      "accessCaveats": ["Red Cedar Roadside Park is a public launch with vault toilets; verify current parking and access conditions.", "The MSU Canoe & Kayak Launch is seasonal; confirm campus access, hours, parking, and construction restrictions before staging.", "Urban bridges, wood, current changes, and weather can change the line; use only named public endpoints and do not assume private-bank exits."],
      "watchFor": ["Low water, shallow sections, fallen trees, and bridge hazards.", "Rapid rises after storms, cold water, and urban current changes.", "Seasonal MSU access and shuttle timing."]
    },
    "corridorId": "red-cedar-river-roadside-msu",
    "corridorLabel": "Red Cedar River / Red Cedar Roadside Park to MSU",
    "continuityStatus": "verified"
  },
  "red-cedar-river-mccormick-roadside": {
    "putIn": {"id": "red-cedar-mccormick-park", "name": "McCormick Park public canoe/kayak launch, Williamston", "latitude": 42.69091, "longitude": -84.28044},
    "takeOut": {"id": "red-cedar-roadside-park", "name": "Red Cedar Roadside Park river access", "latitude": 42.709861, "longitude": -84.364028},
    "logistics": {
      "distanceLabel": "Approximately 6 river miles planning reach",
      "estimatedPaddleTime": "About 2 to 3 hours depending on flow, wood, rapids, and portage decisions",
      "shuttle": "Stage the Red Cedar Roadside Park take-out before launching at McCormick Park; the water-trail brochure describes this as the Williamston-to-Roadside-Park segment.",
      "permits": "No route-specific permit is known. Follow Michigan boating rules, Williamston park rules, posted roadside access rules, and any current construction or closure notices.",
      "camping": "Treat this as a day route. Use designated nearby lodging or campgrounds after verifying current season and reservations; do not camp on park or private river frontage.",
      "campingClassification": "nearby_basecamp",
      "summary": "A documented Williamston water-trail reach from McCormick Park to Red Cedar Roadside Park using direct USGS 04111379 telemetry near the put-in. The 18 cfs screen is a planning aid, not a safety guarantee.",
      "accessCaveats": ["McCormick Park is a public carry-in launch with parking and restrooms; verify current hours and carry conditions.", "The water-trail source warns that rapids below McCormick are not suitable for beginning paddlers; scout, portage, or use the below-rapids Williamston landing instead.", "Red Cedar Roadside Park has direct riverbank access with a carry across the lawn; verify seasonal restroom, parking, and bank conditions.", "Do not assume intermediate private-bank exits or informal camping; use only named public endpoints."],
      "watchFor": ["Williamston rapids, low water, shallow sections, fallen trees, and changing current.", "Rapid rises after storms and cold water.", "Carry distance at Roadside Park and shuttle timing."]
    },
    "corridorId": "red-cedar-river-mccormick-roadside",
    "corridorLabel": "Red Cedar River / McCormick Park to Roadside Park",
    "continuityStatus": "verified"
  },
  "mill-creek-dexter-park-and-play": {
    "putIn": {"id": "mill-creek-park-north", "name": "Mill Creek Park North public kayak launch, Dexter", "latitude": 42.3398474, "longitude": -83.8897365},
    "takeOut": {"id": "mill-creek-park-south", "name": "Mill Creek Park South public access, Dexter", "latitude": 42.3376, "longitude": -83.8914},
    "logistics": {
      "distanceLabel": "Short park-and-play reach at Main Street; approximately 0.2 mi planning distance",
      "estimatedPaddleTime": "About 20 to 45 minutes depending on scouting, current, play, and portage decisions",
      "shuttle": "Stage the Mill Creek Park South take-out before launching at Mill Creek Park North; use only the named public parks and verify parking, hours, and carry conditions.",
      "permits": "No route-specific permit is known. Follow Michigan boating rules, Dexter park rules, posted access restrictions, and any current closure notices.",
      "camping": "Treat this as a day route. Use designated nearby lodging or campgrounds; do not camp on park or private river frontage.",
      "campingClassification": "nearby_basecamp",
      "summary": "A short public Dexter park-and-play reach using Mill Creek Park North and South access, direct USGS 04173500 telemetry, and a 23 cfs American Whitewater community reference. Shallow boulders, rock weirs, low bridge, wood, and cold water require scouting and skill matching.",
      "accessCaveats": ["Mill Creek Park North and South are public access points; verify current parking, hours, carry distance, and shoreline conditions.", "The Main Street section includes rock weirs, a boulder field, and a low bridge; scout and portage when required.", "The 23 cfs reference is community guidance, not an agency-certified go/no-go rule; direct telemetry, trend, weather, and same-day inspection control.", "Do not use private-bank or school access outside posted windows; the public-access guide describes restricted sections and a public-access boundary.", "No informal camping is assumed; use designated nearby lodging or campgrounds."],
      "watchFor": ["Low water below 23 cfs, rapid rises, shallow rocks, boulder fields, low bridge clearance, wood/log jams, and cold water.", "Changing current and flushed-out eddies at higher flows.", "Parking, carry, and access restrictions at the named parks."]
    },
    "corridorId": "mill-creek-dexter-park-and-play",
    "corridorLabel": "Mill Creek / Dexter Mill Creek Park North to South park-and-play"
  },
  "sturgeon-river-trowbridge-haakwood": {
    "putIn": {"id": "sturgeon-trowbridge-road-access", "name": "Trowbridge Road public Sturgeon River access", "latitude": 45.232, "longitude": -84.58845},
    "takeOut": {"id": "sturgeon-haakwood-campground", "name": "Haakwood State Forest Campground carry-in access", "latitude": 45.300621, "longitude": -84.613474},
    "logistics": {
      "distanceLabel": "Approximately 8 mi planning reach",
      "estimatedPaddleTime": "About 3 to 5 hours depending on flow, current, scouting, and stops",
      "shuttle": "Stage the Haakwood take-out before launching at Trowbridge Road. Use only the named public endpoints and verify the road-side parking, campground access, and current river conditions.",
      "permits": "A Michigan Recreation Passport is required for vehicle entry at Haakwood State Forest Campground. Follow Michigan boating rules, DNR access rules, posted campground rules, and any closure notices.",
      "camping": "Haakwood State Forest Campground provides designated rustic camping, vault toilets, hand-pump water, and direct river access. Sites are first-come, first-served; verify current operating dates and fees.",
      "campingClassification": "endpoint_campground",
      "summary": "A moving-water Sturgeon River reach from the official Trowbridge Road access to Haakwood State Forest Campground, using direct USGS 04127997 telemetry at Wolverine. The 120–700 cfs band is community planning guidance; current flow, weather, wood, and paddler skill control the decision.",
      "accessCaveats": ["Trowbridge Road access is a roadside path down from the southwest side of the bridge; confirm parking, carry distance, and shoreline conditions before loading boats.", "Haakwood has a short footpath to the river and a separate Rondo access nearby; the Recreation Passport and campground rules apply.", "The 120–700 cfs CanWePaddle band is not an agency-certified go/no-go rule; pair it with direct USGS telemetry, trend, weather, and same-day scouting.", "The Sturgeon is swift with chutes, riffles, sweepers, and standing waves; this is not a beginner route and may require a suitable boat and rescue plan."],
      "watchFor": ["Low water below the conservative 120 cfs screen, high water above 700 cfs, rapid rises, and cold water.", "Sweepers, overhanging branches, continuous riffles, chutes, and standing waves.", "Limited intermediate access and private frontage; do not assume informal exits or camping."]
    },
    "corridorId": "sturgeon-river-trowbridge-haakwood",
    "corridorLabel": "Sturgeon River / Trowbridge Road to Haakwood public access corridor",
    "continuityStatus": "verified"
  }
};
