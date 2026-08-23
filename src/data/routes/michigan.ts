// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const michiganRoutes: River[] = [
  {
    "id": "looking-glass-riverfront-riverside-dewitt",
    "riverId": "looking-glass-river",
    "slug": "looking-glass-riverfront-riverside-dewitt",
    "name": "Looking Glass River",
    "reach": "Looking Glass Riverfront Park to Riverside City Park",
    "state": "Michigan",
    "region": "Mid-Michigan",
    "summary": "A 2.7-mile public Looking Glass River corridor from Looking Glass Riverfront Park to Riverside City Park in DeWitt. Outdoor Michigan lists both named launches and the connecting distance; the Middle Grand regional water-trail program identifies the Looking Glass as a designated paddling resource.",
    "statusText": "Use direct USGS 04114498 near Eagle as the live discharge check. CanWePaddle identifies about 69 cfs as a good-to-paddle minimum reference for the Eagle-area Looking Glass reach; treat it as community planning guidance, not a safety guarantee. Check current flow, trend, weather, water temperature, wood, and launch conditions before going.",
    "latitude": 42.83939,
    "longitude": -84.56902,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "fast_rise", "strainers", "cold_water", "access_uncertain"],
      "safetyNotes": [
        "Looking Glass Riverfront Park is a public carry-in/ADA kayak launch with parking; confirm the current shoreline, hours, and any closure notices before launching.",
        "Riverside City Park is a public DeWitt launch with an ADA canoe launch and restroom; confirm current park access and take-out conditions before arrival.",
        "The 69 cfs CanWePaddle reference is community guidance for the Eagle-area reach, not an agency-certified floor or a guarantee of safe passage. Same-day visual inspection controls.",
        "The river can rise quickly after storms and may carry wood or submerged debris. Wear a properly fitted PFD, carry communication and rescue equipment, and do not launch during flood warnings or severe weather.",
        "No informal riverbank or park camping is assumed; use designated lodging or campgrounds and respect private frontage."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04114498",
      "provider": "usgs",
      "siteId": "04114498",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Looking Glass River near Eagle, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04114498/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04114498"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 69,
      "tooLow": 69,
      "thresholdSource": {"label": "CanWePaddle Looking Glass River Eagle Area runnable reference", "url": "https://canwepaddle.com/rivers/michigan/", "provider": "local"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Spring through fall is the practical window. Snowmelt and storms can raise the river quickly; cold water and submerged wood remain possible outside summer.",
      "difficulty": "easy",
      "difficultyNotes": "A short, gentle-moving urban-edge corridor appropriate for ordinary flatwater paddlers when the water is open and the gauge is above the conservative floor, but access, wood, weather, and cold-water judgment still matter.",
      "confidenceNotes": "High confidence for the named public endpoint pair and route distance: Outdoor Michigan lists Looking Glass Riverfront Park and Riverside City Park launches, coordinates, and the 2.7-mile connection; DeWitt confirms the Riverfront Park canoe/kayak launch; USGS 04114498 is a direct discharge station; Friends of the Looking Glass River describes easy paddling; and CanWePaddle supplies a numeric community minimum reference. The 69 cfs floor is conservative planning guidance, not a safety guarantee."
    },
    "putIn": {"id": "looking-glass-riverfront-park", "name": "Looking Glass Riverfront Park public carry-in / ADA kayak launch", "latitude": 42.825, "longitude": -84.59975},
    "takeOut": {"id": "riverside-city-park", "name": "Riverside City Park public ADA canoe launch", "latitude": 42.83939, "longitude": -84.56902},
    "evidenceNotes": [
      {"label": "Exact route", "value": "Looking Glass Riverfront Park to Riverside City Park; 2.7 mi", "note": "Outdoor Michigan lists the named launch pair and 2.7-mile connection.", "sourceUrl": "https://outdoormichigan.org/feature/3820"},
      {"label": "Public endpoints", "value": "Looking Glass Riverfront Park to Riverside City Park", "note": "Outdoor Michigan and DeWitt Township identify public launches, parking, and ADA access at the endpoints.", "sourceUrl": "https://www.dewitttownship.gov/facilities/facility/details/Looking-Glass-Riverfront-Park-2"},
      {"label": "Live gauge and threshold", "value": "USGS 04114498; 69 cfs conservative minimum-only reference", "note": "USGS supplies direct discharge telemetry near Eagle; CanWePaddle supplies the numeric community reference for the Eagle-area reach.", "sourceUrl": "https://canwepaddle.com/rivers/michigan/"},
      {"label": "Safety and route character", "value": "Short, gentle-looking water-trail corridor with low-water, wood, rise, and cold-water caveats", "note": "Friends of the Looking Glass River describes easy paddling and the regional water-trail program identifies the river as a public paddling resource; same-day scouting still controls.", "sourceUrl": "https://lookingglassriverfriends.org/our-river/"},
      {"label": "Camping and logistics", "value": "No on-route camping assumed", "note": "Use designated lodging or campgrounds; stage the Riverside City Park take-out before launching and do not infer informal riverbank camping.", "sourceUrl": "https://outdoormichigan.org/feature/3820"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product’s rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04114498 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04114498", "provider": "usgs"},
      {"label": "Outdoor Michigan Looking Glass River access and distance", "url": "https://outdoormichigan.org/feature/3820", "provider": "local"},
      {"label": "Looking Glass Riverfront Park access", "url": "https://www.dewitttownship.gov/facilities/facility/details/Looking-Glass-Riverfront-Park-2", "provider": "local"},
      {"label": "Riverside City Park launch", "url": "https://outdoormichigan.org/feature/12930", "provider": "local"},
      {"label": "Friends of the Looking Glass River paddling context", "url": "https://lookingglassriverfriends.org/our-river/", "provider": "local"},
      {"label": "CanWePaddle Eagle-area flow reference", "url": "https://canwepaddle.com/rivers/michigan/", "provider": "local"}
    ]
  },
  {
    "id": "kalamazoo-river-ceresco-historic-bridge",
    "riverId": "kalamazoo-river",
    "slug": "kalamazoo-river-ceresco-historic-bridge",
    "name": "Kalamazoo River",
    "reach": "Ceresco Green to Historic Bridge Park",
    "state": "Michigan",
    "region": "Southwest Michigan",
    "summary": "A 3.6-mile public Kalamazoo River water-trail run from Ceresco Green to Historic Bridge Park near Battle Creek. The city’s Kanoe the Kazoo itinerary documents the Ceresco-to-Angler’s Bend and Angler’s Bend-to-Historic Bridge segments, while USGS 04105500 provides direct live telemetry downstream near Battle Creek.",
    "statusText": "Use USGS 04105500 near Battle Creek as the live discharge check. RiverScout’s Kalamazoo guidance is a broad 500-3000 cfs community estimate, not a launch guarantee; check the current flow, stage, weather, cold-water risk, river access, and any contamination advisories before launching.",
    "latitude": 42.29236,
    "longitude": -85.11431,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["fast_rise", "cold_water", "access_uncertain", "urban_water_quality"],
      "safetyNotes": [
        "Ceresco Green is a public carry-in access with a steep path, steps/grass, large boulders, and drop-off/long-term parking arrangements; confirm the current launch condition before loading boats.",
        "Historic Bridge Park is a public county park with a kayak launch, parking, restrooms, and other amenities; confirm current park, construction, and water-access notices before arrival.",
        "The 500-3000 cfs RiverScout range is broad community guidance, not a state safety rule. Pair the direct gauge with same-day visual scouting, weather, water temperature, and group skill.",
        "The Kalamazoo watershed has documented legacy contamination and ongoing remediation. Do not drink river water or eat fish unless current Michigan health guidance allows it; follow posted advisories and avoid contact with unusual sheens or debris."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04105500",
      "provider": "usgs",
      "siteId": "04105500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Kalamazoo River near Battle Creek, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04105500/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04105500"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 3000,
      "tooLow": 500,
      "tooHigh": 3000,
      "thresholdSource": {
        "label": "RiverScout Kalamazoo River optimal estimate",
        "url": "https://riverscout.app/rivers/michigan/kalamazoo-river",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "April through October is the practical paddling season; cold water, storms, rising flow, urban obstructions, and changing access can make conditions unsuitable at any time.",
      "difficulty": "moderate",
      "difficultyNotes": "A moving-water day with public but partly carry-in access, urban bridges, cold-water exposure, and legacy water-quality concerns. It is not a casual beginner float at high or rapidly rising flow.",
      "confidenceNotes": "Confidence is good for the bounded public water-trail package: Ceresco Green and Historic Bridge Park are named public endpoints with defensible coordinates; the city itinerary documents the two connecting segments and distances; USGS 04105500 is a direct discharge/gage-height station near Battle Creek; and RiverScout supplies a numeric community range. The range remains planning guidance rather than a station-specific safety rule."
    },
    "evidenceNotes": [
      {"label": "Exact route", "value": "Ceresco Green to Historic Bridge Park; about 3.6 mi", "note": "The City of Battle Creek’s Kanoe the Kazoo itinerary lists Ceresco Green to Angler’s Bend at 1.345 miles and Angler’s Bend to Historic Bridge Park at 2.216 miles.", "sourceUrl": "https://battlecreekmi.gov/calendar.aspx?EID=480&PREVIEW=YES"},
      {"label": "Public endpoints", "value": "Ceresco Green Access Site to Historic Bridge Park", "note": "Michigan Water Trails documents Ceresco Green as public carry-in access; Historic Bridge Park is a county park with a public kayak launch, parking, and restrooms.", "sourceUrl": "https://www.michiganwatertrails.org/location.asp?aid=5258&ait=av"},
      {"label": "Live gauge and threshold", "value": "USGS 04105500; RiverScout 500-3000 cfs optimal estimate", "note": "USGS supplies direct discharge and gage-height telemetry near Battle Creek; RiverScout supplies the numeric community range for planning.", "sourceUrl": "https://riverscout.app/rivers/michigan/kalamazoo-river"},
      {"label": "Safety and route character", "value": "Moving-water water-trail corridor with urban bridges and cold-water exposure", "note": "The official itinerary and water-trail sources document the route segments, access, and public endpoint sequence; current conditions still require same-day scouting.", "sourceUrl": "https://battlecreekmi.gov/calendar.aspx?EID=480&PREVIEW=YES"},
      {"label": "Camping and logistics", "value": "No on-route camping assumed", "note": "Use designated nearby campgrounds or lodging; stage a shuttle and do not infer informal riverbank or park camping.", "sourceUrl": "https://www.michiganwatertrails.org/trail.asp?ait=ov&oid=26"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product’s rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04105500 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04105500", "provider": "usgs"},
      {"label": "Ceresco Green access", "url": "https://www.michiganwatertrails.org/location.asp?aid=5258&ait=av", "provider": "local"},
      {"label": "Historic Bridge Park access", "url": "https://www.michiganwatertrails.org/your_adventure.asp?ait=us&pt=42.2974229747021%2C-85.1650500297546", "provider": "local"},
      {"label": "Kanoe the Kazoo segment distances", "url": "https://battlecreekmi.gov/calendar.aspx?EID=480&PREVIEW=YES", "provider": "local"},
      {"label": "Kalamazoo River assessment and water-quality context", "url": "https://kalamazooriver.org/wp-content/uploads/2012/12/DNR-Fisheries-Division-Kalamazoo-River-Assessment-2005.pdf", "provider": "local"},
      {"label": "RiverScout Kalamazoo River", "url": "https://riverscout.app/rivers/michigan/kalamazoo-river", "provider": "local"}
    ]
  },
  {
    "id": "muskegon-river-crawford-park-evart",
    "riverId": "muskegon-river",
    "slug": "muskegon-river-crawford-park-evart",
    "name": "Muskegon River",
    "reach": "Crawford Park (M-66) to Evart Riverside Park",
    "state": "Michigan",
    "region": "Central Michigan",
    "summary": "A documented roughly 10-mile Muskegon River day run from the public Crawford Park M-66 launch to Evart Riverside Park. The Michigan DNR identifies both public accesses and describes this reach as low-gradient, canoe-accessible river; a direct USGS Evart gauge supplies live discharge and stage context.",
    "statusText": "Use direct USGS 04121500 at Evart as a conservative flow check. A 325 cfs minimum-only floor is derived from the station's long-record low-flow evidence, not a certified runnable level; inspect current wood, shallow gravel, weather, cold water, and any flood or closure notices before launching.",
    "latitude": 43.895675,
    "longitude": -85.257482,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "fast_rise", "cold_water", "access_uncertain"],
      "safetyNotes": [
        "Crawford Park and Evart Riverside Park are named public boat/canoe access points in Michigan DNR materials; confirm current parking, ramp, hours, and any seasonal closure before launching.",
        "Use direct USGS 04121500 discharge and stage as a planning check. The 325 cfs minimum-only floor is a conservative historical reference, not a guarantee that every boat can pass every shallow or obstructed section.",
        "The DNR describes this river section as low-gradient with predominantly sand bottom and abundant fallen trees. Scout around sweepers, strainers, tight bends, and any new wood; never force a blocked channel.",
        "The reach is a long moving-water day trip. Wear a properly fitted PFD, carry communication and rescue equipment, and avoid cold-water, lightning, high-wind, or flood-warning conditions.",
        "Stage the take-out before launching. Use designated Riverside Park or nearby campground facilities only; do not infer informal camping or private-bank landing rights."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04121500",
      "provider": "usgs",
      "siteId": "04121500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Muskegon River at Evart, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04121500/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04121500"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 325,
      "tooLow": 325,
      "thresholdSource": {"label": "USGS 04121500 long-record low-flow planning reference", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04121500", "provider": "usgs"},
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [5, 6, 7, 8, 9, 10],
      "seasonNotes": "Late spring through fall is the practical window. Spring cold water, storms, rapid rises, and seasonal access conditions can materially change the trip.",
      "difficulty": "moderate",
      "difficultyNotes": "A roughly 10-mile moving-water day through a low-gradient river corridor. The route is accessible to prepared flatwater paddlers but requires wood scouting, cold-water judgment, a shuttle, and enough time to finish before conditions or daylight deteriorate.",
      "confidenceNotes": "Confidence is strong for the distinct corridor and endpoints: Michigan DNR lists Crawford Park and Evart Park access with coordinates; an independent paddle-club account documents the M-66-to-Evart route as about 10 miles and 3-5 hours; DNR describes the reach as low-gradient and canoe-accessible; J&J documents scheduled Crawford-to-Evart trips; and USGS 04121500 provides direct telemetry. The 325 cfs floor is a conservative historical planning reference, not a safety certification."
    },
    "putIn": {"id": "crawford-park-m66", "name": "Crawford Park (M-66) public boat launch", "latitude": 43.946851, "longitude": -85.149897},
    "takeOut": {"id": "evart-riverside-park", "name": "Evart Riverside Park public canoe access", "latitude": 43.895675, "longitude": -85.257482},
    "evidenceNotes": [
      {"label": "Exact route and distance", "value": "Crawford Park (M-66) to Evart Riverside Park; about 10 mi", "note": "A Traverse Area Paddle Club trip account identifies the M-66 Crawford Park start, Evart finish, roughly 10-mile distance, and 3-5 hour duration.", "sourceUrl": "https://www.traverseareapaddleclub.org/content.aspx?club_id=813410&item_id=1280459&page_id=4002"},
      {"label": "Public endpoints and coordinates", "value": "Crawford Park to Evart Riverside Park", "note": "Michigan DNR identifies both public accesses and publishes coordinates and access directions.", "sourceUrl": "https://www.michigan.gov/dnr/managing-resources/fisheries/units/c-michigan"},
      {"label": "Live gauge and threshold", "value": "USGS 04121500; 325 cfs conservative minimum-only planning floor", "note": "USGS supplies direct discharge and stage telemetry; the low-flow reference is explicitly a conservative planning aid rather than a guarantee of safe passage.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04121500"},
      {"label": "Safety and river character", "value": "Low-gradient moving water with sand, fallen trees, cold-water, and rise hazards", "note": "Michigan DNR describes the section as low-gradient and canoe-accessible with predominantly sand bottom and abundant fallen trees; same-day scouting controls.", "sourceUrl": "https://www.michigan.gov/dnr/-/media/Project/Websites/dnr/Documents/Fisheries/Mgt/MuskegonR-AnglerAccessInfo.pdf"},
      {"label": "Camping and logistics", "value": "Long day route with shuttle; Riverside Park and nearby designated campgrounds provide logistics", "note": "J&J documents scheduled Crawford-to-Evart trips and shuttle transport; use designated facilities and verify current camping rules.", "sourceUrl": "https://www.jjriverrun.com/tripstimesrates.html"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04121500 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04121500", "provider": "usgs"},
      {"label": "Michigan DNR Muskegon access and river context", "url": "https://www.michigan.gov/dnr/managing-resources/fisheries/units/c-michigan", "provider": "local"},
      {"label": "Michigan DNR Muskegon access PDF", "url": "https://www.michigan.gov/dnr/-/media/Project/Websites/dnr/Documents/Fisheries/Mgt/MuskegonR-AnglerAccessInfo.pdf", "provider": "local"},
      {"label": "Traverse Area Paddle Club M-66 to Evart trip", "url": "https://www.traverseareapaddleclub.org/content.aspx?club_id=813410&item_id=1280459&page_id=4002", "provider": "local"},
      {"label": "J&J Crawford-to-Evart trip logistics", "url": "https://www.jjriverrun.com/tripstimesrates.html", "provider": "local"}
    ],
    "aliases": ["Muskegon River M-66 to Evart", "Muskegon River Crawford Park to Riverside Park"]
  },
  {
    "id": "kalamazoo-river-new-richmond-hacklander",
    "riverId": "kalamazoo-river",
    "slug": "kalamazoo-river-new-richmond-hacklander",
    "name": "Kalamazoo River",
    "reach": "New Richmond Bridge Park to Hacklander DNR Boat Launch",
    "state": "Michigan",
    "region": "Southwest Michigan",
    "summary": "A 4.9-mile lower Kalamazoo River run from New Richmond Bridge Park to the DNR Hacklander Boat Launch through the lower river and Pottawatomi Marsh. The watershed council documents the public access corridor, and USGS 04108660 provides direct live discharge telemetry at New Richmond.",
    "statusText": "Use USGS 04108660 at New Richmond as the live discharge check. RiverScout gives the Kalamazoo River a broad 500-3000 cfs optimal estimate; treat it as community planning guidance, not a launch guarantee, and account for wind, marsh navigation, water temperature, and launch conditions.",
    "latitude": 42.6517,
    "longitude": -86.1078,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["fast_rise", "cold_water", "access_uncertain", "private_banks"],
      "safetyNotes": [
        "New Richmond Bridge Park is a public county launch with a launch fee, restrooms, and parking; confirm current fee, hours, and construction notices before arrival.",
        "Hacklander is a signed DNR carry-in ramp with restrooms and parking, but the agency notes limited water depth and that the ramp is not recommended for the largest boats.",
        "The 500-3000 cfs RiverScout range is a broad community estimate, not a state safety rule. Pair the direct gauge with wind, weather, water temperature, marsh navigation, and same-day visual judgment."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04108660",
      "provider": "usgs",
      "siteId": "04108660",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Kalamazoo River at New Richmond, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04108660/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04108660"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 3000,
      "tooLow": 500,
      "tooHigh": 3000,
      "thresholdSource": {
        "label": "RiverScout Kalamazoo River optimal estimate",
        "url": "https://riverscout.app/rivers/michigan/kalamazoo-river",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "April through October is the practical paddling season; cold water, wind, storms, and changing marsh access can make conditions unsuitable at any time.",
      "difficulty": "easy",
      "difficultyNotes": "The lower river is generally gentle moving water, but open marsh exposure, wind, cold water, changing access, and limited-depth ramps require competent flatwater judgment.",
      "confidenceNotes": "Confidence is good for the bounded lower-river package: New Richmond Bridge Park and Hacklander are named public endpoints with coordinates; the watershed council documents the 4.9-mile connection; USGS 04108660 is direct at New Richmond; RiverScout supplies a numeric community range; and DNR material documents Hacklander's shallow ramp and marsh setting."
    },
    "evidenceNotes": [
      {"label": "Exact route", "value": "New Richmond Bridge Park to Hacklander DNR Boat Launch; 4.9 mi", "note": "Michigan Water Trails documents the named endpoint pair and 4.9-mile distance.", "sourceUrl": "https://www.michiganwatertrails.org/location.asp?aid=5246&ait=av"},
      {"label": "Public endpoints", "value": "New Richmond Bridge Park to Hacklander DNR Boat Launch", "note": "New Richmond is a public county boat ramp; Hacklander is a signed DNR ramp with parking and restrooms.", "sourceUrl": "https://www.michiganwatertrails.org/location.asp?aid=5247&ait=av"},
      {"label": "Live gauge and threshold", "value": "USGS 04108660; RiverScout 500-3000 cfs optimal estimate", "note": "USGS supplies direct discharge telemetry at New Richmond; RiverScout supplies the numeric community range for planning.", "sourceUrl": "https://riverscout.app/rivers/michigan/kalamazoo-river"},
      {"label": "Safety and route character", "value": "Gentle lower-river current through Pottawatomi Marsh; wind and cold-water exposure", "note": "Kalamazoo River Watershed Council describes the lower corridor and KRWC event material describes a gentle 5-mile paddle to Hacklander.", "sourceUrl": "https://kalamazooriver.org/events/kanoe-the-kazoo/"},
      {"label": "Camping and logistics", "value": "No on-route camping assumed; launch fee at New Richmond", "note": "Use designated nearby lodging or campgrounds and confirm New Richmond's current launch fee and Hacklander access conditions.", "sourceUrl": "https://www.michiganwatertrails.org/location.asp?aid=5246&ait=av"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04108660 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04108660", "provider": "usgs"},
      {"label": "New Richmond Bridge Park access", "url": "https://www.michiganwatertrails.org/location.asp?aid=5246&ait=av", "provider": "local"},
      {"label": "Hacklander DNR access", "url": "https://www.michiganwatertrails.org/location.asp?aid=5247&ait=av", "provider": "local"},
      {"label": "Hacklander DNR site details", "url": "https://outdoormichigan.org/feature/2616", "provider": "local"},
      {"label": "Kalamazoo River Watershed Council lower-river event", "url": "https://kalamazooriver.org/events/kanoe-the-kazoo/", "provider": "local"},
      {"label": "RiverScout Kalamazoo River", "url": "https://riverscout.app/rivers/michigan/kalamazoo-river", "provider": "local"}
    ]
  },
  {
    "id": "kalamazoo-river-b-drive-stuarts-landing",
    "riverId": "kalamazoo-river",
    "slug": "kalamazoo-river-b-drive-stuarts-landing",
    "name": "Kalamazoo River",
    "reach": "B Drive North Access to Stuart's Landing",
    "state": "Michigan",
    "region": "Southwest Michigan",
    "summary": "A guarded upper Kalamazoo River day from the B Drive North access at the USGS station to Stuart's Landing in Marshall, ending above the documented Marshall Dam. Michigan Water Trails identifies the public access corridor and 5.8-mile Marshall run; the route uses the direct 04103500 gauge.",
    "statusText": "Use USGS 04103500 at Marshall as the live discharge check. RiverScout gives the Kalamazoo River a broad 500-3000 cfs optimal estimate; treat it as community planning guidance, not a launch guarantee, and take out above Marshall Dam unless a separately verified portage plan is in place.",
    "latitude": 42.2615,
    "longitude": -84.85562,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["fast_rise", "cold_water", "dam", "access_uncertain"],
      "safetyNotes": [
        "B Drive North is an unimproved bridge access with a short carry and limited parking; confirm the path, shoreline, and current before launching.",
        "The route ends at Stuart's Landing above the documented 12-foot Marshall Dam. Do not continue downstream toward the dam without a separately verified portage plan.",
        "The 500-3000 cfs RiverScout range is a broad community estimate, not a state safety rule. Pair the direct gauge with same-day scouting, weather, cold-water judgment, and current access notices."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04103500",
      "provider": "usgs",
      "siteId": "04103500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Kalamazoo River at Marshall, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04103500/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04103500"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 3000,
      "tooLow": 500,
      "tooHigh": 3000,
      "thresholdSource": {
        "label": "RiverScout Kalamazoo River optimal estimate",
        "url": "https://riverscout.app/rivers/michigan/kalamazoo-river",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "April through October is the practical paddling season; cold water, storms, and rising flow can make this reach unsuitable outside or within that window.",
      "difficulty": "moderate",
      "difficultyNotes": "The reach is a moving-water day with unimproved access, changing current, cold water, and a mandatory stop above Marshall Dam. It is not a casual beginner float despite the absence of whitewater classification.",
      "confidenceNotes": "Confidence is good for the bounded above-dam route: Michigan Water Trails identifies B Drive North at the USGS station and the Marshall access corridor; Stuart's Landing is a documented public city ramp; USGS 04103500 is direct; RiverScout supplies a numeric community range; and Outdoor Michigan documents the Marshall Dam and portage location."
    },
    "evidenceNotes": [
      {"label": "Exact route", "value": "B Drive North Access to Stuart's Landing; about 5.8 mi Marshall corridor", "note": "Michigan Water Trails identifies B Drive North, the USGS station at the bridge, and the 5.8-mile Marshall boat-ramp corridor; Stuart's Landing is selected as the safe above-dam endpoint.", "sourceUrl": "https://www.michiganwatertrails.org/location.asp?aid=5261&ait=av"},
      {"label": "Public endpoints", "value": "B Drive North Access Site to Stuart's Landing", "note": "B Drive North is a documented river-right carry access; Stuart's Landing is a public city boat ramp in Marshall.", "sourceUrl": "https://outdoormichigan.org/feature/13239"},
      {"label": "Live gauge and threshold", "value": "USGS 04103500; RiverScout 500-3000 cfs optimal estimate", "note": "USGS supplies direct discharge telemetry at the route's upper access; RiverScout supplies the numeric community range for planning.", "sourceUrl": "https://riverscout.app/rivers/michigan/kalamazoo-river"},
      {"label": "Safety and route character", "value": "Moving-water corridor ending above 12-foot Marshall Dam", "note": "Outdoor Michigan documents Marshall Dam and its right-side portage; the route deliberately ends at Stuart's Landing above the hazard.", "sourceUrl": "https://outdoormichigan.org/feature/2638"},
      {"label": "Camping and logistics", "value": "No on-route camping assumed", "note": "Use designated nearby campgrounds or lodging; the route package does not infer informal riverbank camping.", "sourceUrl": "https://www.michiganwatertrails.org/trail.asp?ait=ov&oid=26"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04103500 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04103500", "provider": "usgs"},
      {"label": "B Drive North access and gauge", "url": "https://www.michiganwatertrails.org/location.asp?aid=5261&ait=av", "provider": "local"},
      {"label": "Stuart's Landing public launch", "url": "https://outdoormichigan.org/feature/13239", "provider": "local"},
      {"label": "Marshall Dam hazard", "url": "https://outdoormichigan.org/feature/2638", "provider": "local"},
      {"label": "RiverScout Kalamazoo River", "url": "https://riverscout.app/rivers/michigan/kalamazoo-river", "provider": "local"},
      {"label": "Kalamazoo River Watershed Council water trail", "url": "https://www.michiganwatertrails.org/trail.asp?ait=ov&oid=26", "provider": "local"}
    ]
  },
  {
    "id": "kalamazoo-river-comstock-mayors-riverfront",
    "riverId": "kalamazoo-river",
    "slug": "kalamazoo-river-comstock-mayors-riverfront",
    "name": "Kalamazoo River",
    "reach": "Comstock Township DNR Boat Launch to Mayor's Riverfront Park",
    "state": "Michigan",
    "region": "Southwest Michigan",
    "summary": "A 2.6-mile Kalamazoo River urban access run from the public Comstock Township DNR carry-in launch to Mayor's Riverfront Park in Kalamazoo. Michigan Water Trails documents the endpoint pair and distance, while USGS 04106000 provides direct live discharge telemetry.",
    "statusText": "Use USGS 04106000 at Comstock as the live discharge check. RiverScout gives the Kalamazoo River a broad 500-3000 cfs optimal estimate; treat that community range as planning guidance, not a launch guarantee, and account for current, dams, weather, and access conditions.",
    "latitude": 42.285597,
    "longitude": -85.513893,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["fast_rise", "cold_water", "dam", "access_uncertain"],
      "safetyNotes": [
        "Michigan Water Trails describes the Comstock access as a small carry-down to a calmer side channel; verify the shoreline and current before launching.",
        "The broader Kalamazoo corridor includes dams and portages, including Morrow Lake downstream; do not continue beyond the named take-out without a separate portage plan and current access confirmation.",
        "The 500-3000 cfs RiverScout range is a broad community estimate, not a state safety rule. Pair the live gauge with same-day scouting, weather, water temperature, closures, and the group's skill level."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04106000",
      "provider": "usgs",
      "siteId": "04106000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Kalamazoo River at Comstock, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04106000/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?agency_cd=USGS&legacy=1&site_no=04106000"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 3000,
      "tooLow": 500,
      "tooHigh": 3000,
      "thresholdSource": {
        "label": "RiverScout Kalamazoo River optimal estimate",
        "url": "https://riverscout.app/rivers/michigan/kalamazoo-river",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "April through October is the practical paddling season; water temperature, storms, and changing urban access can make conditions unsuitable at any time.",
      "difficulty": "easy",
      "difficultyNotes": "The short named reach is an urban recreational corridor, but current, boat traffic, cold water, and downstream dams require competent flatwater judgment and a firm take-out plan.",
      "confidenceNotes": "Confidence is good for a bounded route package: Michigan Water Trails identifies the exact Comstock-to-Mayor's endpoint pair and 2.6-mile distance; both endpoints are named public accesses with coordinates; USGS 04106000 is a direct station at Comstock; and RiverScout supplies a numeric community estimate. The threshold is explicitly broad guidance rather than a station-specific safety rule."
    },
    "evidenceNotes": [
      {"label": "Exact route", "value": "Comstock Township DNR Boat Launch to Mayor's Riverfront Park; 2.6 mi", "note": "Michigan Water Trails documents the named public endpoint pair and 2.6-mile distance.", "sourceUrl": "https://www.michiganwatertrails.org/location.asp?aid=5218&ait=av"},
      {"label": "Public endpoints", "value": "Comstock Township DNR Boat Launch to Mayor's Riverfront Park", "note": "Both are documented public carry-in/boat-launch sites with parking and access details.", "sourceUrl": "https://www.michiganwatertrails.org/location.asp?aid=5219&ait=av"},
      {"label": "Live gauge and threshold", "value": "USGS 04106000; RiverScout 500-3000 cfs optimal estimate", "note": "USGS supplies direct live discharge telemetry; RiverScout supplies the numeric community range for planning.", "sourceUrl": "https://riverscout.app/rivers/michigan/kalamazoo-river"},
      {"label": "Safety and route character", "value": "Short urban corridor; current, traffic, cold water, and downstream dam/portage awareness", "note": "Discover Kalamazoo and Michigan Water Trails document the access sequence and downstream dam/portage considerations.", "sourceUrl": "https://www.discoverkalamazoo.com/blog/post/kayaking-in-kalamazoo-county-mi/"},
      {"label": "Camping and logistics", "value": "No on-route camping assumed", "note": "Use designated nearby lodging or campgrounds; do not assume riverbank or park camping.", "sourceUrl": "https://www.michiganwatertrails.org/location.asp?aid=5219&ait=av"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04106000 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?agency_cd=USGS&legacy=1&site_no=04106000", "provider": "usgs"},
      {"label": "USGS 04106000 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04106000/", "provider": "usgs"},
      {"label": "RiverScout Kalamazoo River", "url": "https://riverscout.app/rivers/michigan/kalamazoo-river", "provider": "local"},
      {"label": "DNR Comstock access", "url": "https://www.michiganwatertrails.org/location.asp?aid=5218&ait=av", "provider": "local"},
      {"label": "Mayor's Riverfront Park access", "url": "https://www.michiganwatertrails.org/location.asp?aid=5219&ait=av", "provider": "local"},
      {"label": "Discover Kalamazoo access and portage notes", "url": "https://www.discoverkalamazoo.com/blog/post/kayaking-in-kalamazoo-county-mi/", "provider": "local"}
    ]
  },
  {
    "id": "jordan-river-graves-crossing-rogers-bridge",
    "riverId": "jordan-river",
    "slug": "jordan-river-graves-crossing-rogers-bridge",
    "name": "Jordan River",
    "reach": "Graves Crossing to Rogers Road Bridge",
    "state": "Michigan",
    "region": "Northwest Lower Michigan",
    "summary": "An 8-mile Jordan River Natural River day from Graves Crossing State Forest Campground to the DNR Rogers Road Bridge access near East Jordan. The river is a named public corridor with designated camping, a direct USGS gauge, and a conservative community runnable estimate.",
    "statusText": "Use USGS 04127800 near East Jordan as the live discharge check. CanWePaddle estimates a 193 cfs runnable reading for the Graves Crossing to Rogers Bridge section; treat that as a conservative community estimate, not a launch guarantee, and scout the woody, swift river before committing.",
    "latitude": 45.033295,
    "longitude": -85.064023,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["strainers", "cold_water", "fast_rise", "low_water", "access_uncertain"],
      "safetyNotes": [
        "Michigan DNR describes the lower Jordan as canoeable but swift, winding, and affected by logs and riffles; the first mile below Graves Crossing can challenge novice paddlers.",
        "Jordan Valley Outfitters describes the Graves Crossing trip as an advanced-paddler 8.5-mile run with tight corners and overhanging trees. Use a suitable boat, PFD, and group with moving-water judgment.",
        "Launch only at the named public access sites. Check the live gauge, water temperature, weather, closures, and visible strainers immediately before launch; do not treat a cfs estimate as a go/no-go decision."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04127800",
      "provider": "usgs",
      "siteId": "04127800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jordan River near East Jordan, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04127800/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04127800"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 193,
      "thresholdSource": {
        "label": "CanWePaddle Jordan River Graves Crossing to Rogers Bridge estimate",
        "url": "https://canwepaddle.com/rivers/michigan/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "April through October is the practical paddling season, but cold water and storms can make conditions unsuitable outside or within that window.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is listed as Class I by CanWePaddle, but DNR and the local outfitter emphasize swift current, tight bends, woody structure, and obstacles. Treat it as a moving-water route for confident paddlers rather than a casual beginner float.",
      "confidenceNotes": "Confidence is good for a guarded route: CanWePaddle identifies the exact Graves Crossing-to-Rogers Bridge 8-mile section and 193 cfs estimate; USGS 04127800 is a direct same-river gauge; Michigan DNR and Outdoor Michigan document public endpoints and designated campgrounds; and the DNR Natural River assessment documents the corridor character and hazards. The threshold remains explicitly an estimate rather than a state-published safety rule."
    },
    "evidenceNotes": [
      {"label": "Exact route", "value": "Graves Crossing to Rogers Road Bridge; 8 mi", "note": "CanWePaddle lists this named Jordan River section as Class I and provides the 193 cfs estimated good-to-paddle reading.", "sourceUrl": "https://canwepaddle.com/rivers/michigan/"},
      {"label": "Public endpoints", "value": "Graves Crossing State Forest Campground to Rogers Road Bridge Boat Launch", "note": "Michigan DNR coordinates Graves Crossing; Outdoor Michigan identifies the DNR Rogers Road Bridge access and parking.", "sourceUrl": "https://outdoormichigan.org/feature/6931"},
      {"label": "Live gauge and threshold", "value": "USGS 04127800; 193 cfs conservative minimum estimate", "note": "CanWePaddle supplies the section-specific community estimate and USGS supplies direct live discharge telemetry.", "sourceUrl": "https://canwepaddle.com/rivers/michigan/"},
      {"label": "Safety and route character", "value": "Swift, winding Class I with woody obstacles", "note": "Michigan DNR describes the lower Jordan's swift current, logs, riffles, and novice-challenging first mile; Jordan Valley Outfitters describes tight corners and overhanging trees.", "sourceUrl": "https://www.michigan.gov/dnr/-/media/Project/Websites/dnr/Documents/Fisheries/NaturalRivers/Archive/Jordan_River_Plan.pdf?rev=337aaf61b0084337874d1dc4c9b8d594"},
      {"label": "Camping and logistics", "value": "Graves Crossing State Forest Campground; Pinney Bridge campground nearby", "note": "Michigan DNR and Michigan.org document designated camping along the Jordan; use legal campground sites rather than informal riverbank camping.", "sourceUrl": "https://www.michigan.org/property/graves-crossing-state-forest"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "CanWePaddle Michigan sections", "url": "https://canwepaddle.com/rivers/michigan/", "provider": "local"},
      {"label": "USGS 04127800 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04127800", "provider": "usgs"},
      {"label": "Rogers Road Bridge Boat Launch", "url": "https://outdoormichigan.org/feature/6931", "provider": "local"},
      {"label": "Graves Crossing State Forest", "url": "https://www.michigan.org/property/graves-crossing-state-forest", "provider": "local"},
      {"label": "Michigan DNR Jordan River plan", "url": "https://www.michigan.gov/dnr/-/media/Project/Websites/dnr/Documents/Fisheries/NaturalRivers/Archive/Jordan_River_Plan.pdf?rev=337aaf61b0084337874d1dc4c9b8d594", "provider": "local"},
      {"label": "Jordan Valley Outfitters trip descriptions", "url": "https://www.jvoutfitters.com/canoeing-and-kayaking", "provider": "local"}
    ]
  },
  {
    "id": "iron-river-mattioli-brady",
    "riverId": "iron-river",
    "slug": "iron-river-mattioli-brady",
    "name": "Iron River",
    "reach": "Mattioli Park to Brady Avenue / Apple Blossom Trail",
    "state": "Michigan",
    "region": "Western Upper Peninsula",
    "summary": "A 3-mile in-town Iron River day run from Mattioli Park to the Brady Avenue / Apple Blossom Trail take-out in Caspian, with an optional extension toward Museum Drive. American Whitewater documents the Class I-II reach and ties its live flow reading to USGS 04060500.",
    "statusText": "Use USGS 04060500 at Caspian as the live discharge check. American Whitewater lists 150 to 800 cfs as the tentative runnable band; below 150 cfs is below the recommended range, while higher water requires a same-day visual check for wood, ledges, and current.",
    "latitude": 46.097195,
    "longitude": -88.646985,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["whitewater", "low_water", "strainers", "fast_rise", "cold_water"],
      "safetyNotes": [
        "American Whitewater rates the Mattioli Park to Museum Drive corridor Class I-II and notes shallow sections, shoals, and a small ledge. Scout the river and portage any feature your group cannot safely run.",
        "Treat the 150-800 cfs American Whitewater band as tentative guidance, not a guarantee. Skip the reach when the gauge is rising quickly, recent storms have changed wood, or the visual current exceeds the group's skill.",
        "Use the named public park and trailhead accesses only. Cold water, changing weather, strainers, and limited urban exits require PFDs, a conservative craft choice, and a shuttle plan."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04060500",
      "provider": "usgs",
      "siteId": "04060500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Iron River at Caspian, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04060500/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04060500"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 150,
      "idealMax": 800,
      "tooLow": 150,
      "tooHigh": 800,
      "thresholdSource": {
        "label": "American Whitewater Iron River Caspian flow correlation",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/10751/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Spring through fall is the practical season. Upper Peninsula cold water and rain-driven rises make same-day visual checks essential.",
      "difficulty": "moderate",
      "difficultyNotes": "American Whitewater rates the documented reach Class I-II with shallow sections, shoals, and a small ledge. It is moving water rather than a passive flatwater float.",
      "confidenceNotes": "Confidence is good for a guarded route: American Whitewater names the exact Mattioli-to-Museum corridor, provides endpoint and intermediate coordinates, gives the 150-800 cfs tentative band, and identifies USGS 04060500 as the gauge. Public Mattioli Park and Brady Avenue / Apple Blossom Trail access are documented; the app keeps the threshold explicitly tentative and requires visual hazard checks."
    },
    "evidenceNotes": [
      {"label": "Exact route", "value": "Mattioli Park to Brady Avenue / Apple Blossom Trail; 3 mi", "note": "American Whitewater documents the short Caspian reach and optional Museum Drive extension.", "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/10751/main"},
      {"label": "Public endpoints", "value": "Mattioli Park put-in; Brady Avenue / Apple Blossom Trail take-out", "note": "American Whitewater gives named access points, parking/carry notes, and coordinates for both ends.", "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/10751/main"},
      {"label": "Live gauge and threshold", "value": "USGS 04060500; 150-800 cfs tentative runnable band", "note": "American Whitewater embeds the Caspian gauge correlation and labels the flow ranges tentative.", "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/10751/main"},
      {"label": "Camping and logistics", "value": "Klint Safford Memorial RV Park on the Iron River", "note": "Iron County identifies the designated RV park; do not assume informal riverbank camping.", "sourceUrl": "https://www.iron.org/outdoors/camping/"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "American Whitewater Iron River route", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/10751/main", "provider": "american_whitewater"},
      {"label": "USGS 04060500 current conditions", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04060500/", "provider": "usgs"},
      {"label": "Iron County camping", "url": "https://www.iron.org/outdoors/camping/", "provider": "local"},
      {"label": "Klint Safford Memorial RV Park", "url": "https://www.michigan.org/property/klint-safford-memorial-rv-park", "provider": "local"}
    ]
  },
  {
    "id": "cass-river-tuscola-frankenmuth",
    "riverId": "cass-river",
    "slug": "cass-river-tuscola-frankenmuth",
    "name": "Cass River",
    "reach": "Tuscola Township Park to Frankenmuth",
    "state": "Michigan",
    "region": "Central Thumb",
    "summary": "A distinct five-mile Cass River Water Trail segment from Tuscola Township Park to Frankenmuth's public park launches, with slow water, broad river scenery, and a direct Frankenmuth USGS gauge check.",
    "statusText": "Use USGS 04151500 at Frankenmuth as the live discharge check. The Cass River Water Trail gives a conservative minimum-only screen: below 100 cfs is a tough paddle. Confirm the current flow, weather, hazards, and launch access before departing.",
    "latitude": 43.3284595,
    "longitude": -83.6518,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "dam", "fast_rise", "cold_water"],
      "safetyNotes": [
        "The Water Trail describes this five-mile segment as beginner level with long deep and slow water, but warns that current slows near Frankenmuth and motorboats are common.",
        "Do not run the Frankenmuth rock-ramp rapids. Portage or take out at Heritage or Memorial Park as directed by the Water Trail, especially at higher flow.",
        "Use only the named public launches and check seasonal park/event closures, weather, cold-water conditions, and same-day visual hazards."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04151500",
      "provider": "usgs",
      "siteId": "04151500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cass River at Frankenmuth, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04151500/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04151500"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Cass River Water Trail water-level guidance",
        "url": "https://cassriverwatertrail.org/riverconditions/waterlevels/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Spring through fall is the practical season; cold water and changing storms require conservative planning.",
      "difficulty": "easy",
      "difficultyNotes": "The Water Trail rates Tuscola to Frankenmuth as beginner, with slow current and hazards concentrated around the downstream rock ramp and bridge area.",
      "confidenceNotes": "The selected reach, named endpoints, access details, hazards, and 100-cfs minimum-only rule come from the Cass River Water Trail. USGS 04151500 is the Frankenmuth station linked by the Water Trail's live-water page. This is a low-water screen, not a guarantee of safe conditions."
    },
    "evidenceNotes": [
      {"label": "Trip definition", "value": "5 miles / 1.5 to 2.25 hours", "note": "Cass River Water Trail Tuscola to Frankenmuth trip page.", "sourceUrl": "https://cassriverwatertrail.org/planatrip/suggested-trip/tuscolatofrankenmuth/"},
      {"label": "Public endpoints", "value": "Tuscola Township Park to Memorial/Heritage Park launches", "note": "Named addresses, parking, facilities, and seasonal access caveats are documented by the Water Trail.", "sourceUrl": "https://cassriverwatertrail.org/planatrip/suggested-trip/tuscolatofrankenmuth/"},
      {"label": "Live gauge and threshold", "value": "USGS 04151500; 100 cfs minimum-only screen", "note": "The Water Trail links Frankenmuth USGS data and says below 100 cfs is a tough paddle.", "sourceUrl": "https://cassriverwatertrail.org/riverconditions/waterlevels/"},
      {"label": "Coordinates", "value": "Tuscola 43.32724, -83.6518; Frankenmuth Memorial Park 43.33097, -83.73291", "note": "Outdoor Michigan provides launch-specific coordinates for both endpoint boat launches.", "sourceUrl": "https://outdoormichigan.org/feature/9173"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "Cass River Water Trail trip", "url": "https://cassriverwatertrail.org/planatrip/suggested-trip/tuscolatofrankenmuth/", "provider": "local"},
      {"label": "Cass River Water Trail water levels", "url": "https://cassriverwatertrail.org/riverconditions/waterlevels/", "provider": "local"},
      {"label": "Cass River Water Trail hazards", "url": "https://cassriverwatertrail.org/riverconditions/hazards/", "provider": "local"},
      {"label": "USGS 04151500 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04151500", "provider": "usgs"},
      {"label": "Endpoint coordinate reference", "url": "https://outdoormichigan.org/feature/9173", "provider": "local"}
    ]
  },
  {
    "id": "pine-river-edgetts-lincoln",
    "slug": "pine-river-edgetts-lincoln",
    "name": "Pine River",
    "reach": "Edgetts to Lincoln Bridge",
    "state": "Michigan",
    "region": "Northern Lower Michigan",
    "summary": "Upper Pine River moving-water day from Edgetts to Lincoln Bridge, above the federal permit corridor. American Whitewater documents the exact reach, and the Hoxeyville USGS gauge gives it the same conservative Pine River flow check used by the downstream Pine routes.",
    "statusText": "Use the Pine River at High School Bridge gauge near Hoxeyville as the live check. Treat 170 cfs as the conservative low-water floor; below that, expect shallow fast turns, scraping, and harder wood avoidance.",
    "latitude": 44.062496,
    "longitude": -85.583206,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "access_uncertain"
      ],
      "safetyNotes": [
        "American Whitewater rates Edgetts to Lincoln Bridge Class I-II and describes shallow fast current, tight turns, and logs or stumps jammed into bends. Treat this as a skilled moving-water route, not a casual tube float.",
        "Use 170 cfs at the Hoxeyville gauge only as a conservative low-water screen. Skip the route when the river is rising, storm-damaged, or visually too fast for safe wood avoidance.",
        "Launch and land only where current signage and the Pine River map support access. Do not continue below Lincoln without checking the downstream Scenic River permit and access rules."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04125460",
      "provider": "usgs",
      "siteId": "04125460",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Pine River at High School Bridge near Hoxeyville, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04125460/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 170,
      "thresholdSource": {
        "label": "American Whitewater Pine River flow correlation for the Hoxeyville gauge",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3223",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Spring through fall is the main practical window. This upper Pine section is less permit-crowded than the Scenic River corridor downstream, but rain can quickly make the fast wooded turns, sweepers, and logjams more consequential.",
      "difficulty": "moderate",
      "difficultyNotes": "American Whitewater rates Edgetts to Lincoln Bridge Class I-II and describes shallow fast current, tight turns, occasional low Class II spots, and logs or stumps piled into bends. It is a skilled moving-water route, not a casual tube float.",
      "confidenceNotes": "Confidence is good but intentionally caveated: American Whitewater publishes the exact Edgetts-to-Lincoln reach, route character, Class I-II rating, and Hoxeyville gauge relationship; the Cadillac Area Visitors Bureau / Forest Service Pine map gives named launch coordinates from Edgetts through Lincoln; Outdoor Michigan confirms Lincoln Bridge as a Michigan DNR carry-in boat launch; and the same USGS 04125460 / AW 170 cfs floor is already used by the downstream Pine implementations. The main caveat is that Edgetts is supported by the Pine map and AW route notes rather than a standalone Outdoor Michigan access page, so same-day access signage should control."
    },
    "evidenceNotes": [
      {
        "label": "Exact AW reach",
        "value": "Edgetts to Lincoln Bridge",
        "note": "American Whitewater documents the Pine River Edgetts-to-Lincoln Bridge reach, rates it Class I-II, lists it at 13.1 miles, and says this upper section does not require the downstream permit.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3223/main"
      },
      {
        "label": "Map coordinates",
        "value": "Edgetts 44.062496, -85.583206; Lincoln 44.133377, -85.695248",
        "note": "The Cadillac Area Visitors Bureau / Forest Service Pine River map names Edgetts, Meadow Brook, Skookum, Walker, and Lincoln Bridge and provides GPS coordinates for each launch location.",
        "sourceUrl": "https://cadillacmichigan.com/wp-content/uploads/2018/10/CAVB-Trailmaps_2019-pineriver-update.pdf"
      },
      {
        "label": "Public take-out",
        "value": "Lincoln Bridge DNR carry-in launch",
        "note": "Outdoor Michigan identifies Lincoln Bridge Campground Boat Launch as a Michigan DNR carry-in boat launch on the Pine River with parking.",
        "sourceUrl": "https://outdoormichigan.org/feature/5315"
      },
      {
        "label": "Gauge and threshold",
        "value": "170 cfs low floor",
        "note": "American Whitewater ties Pine River conditions to USGS 04125460 and lists 170 cfs as the lower runnable floor. The gauge is downstream of this reach and may vary slightly, so the app uses only a conservative minimum floor.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3223"
      },
      {
        "label": "Route character",
        "value": "Fast shallow turns and wood",
        "note": "AW describes this section as shallow fast current with many tight turns, a sand/clay bottom with occasional rock, and logs or stumps jammed into bends that can be hazardous for paddlers with little moving-water experience.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3223/main"
      },
      {
        "label": "Downstream context",
        "value": "Scenic River corridor begins at Lincoln",
        "note": "Rivers.gov says the federally designated Pine River reach begins at Lincoln Bridge and describes Forest Service permit, access-fee, and designated-camping controls downstream. This route ends at Lincoln before entering that managed downstream corridor.",
        "sourceUrl": "https://www.rivers.gov/rivers/river/pine"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Pine River Edgetts to Lincoln",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3223/main",
        "provider": "american_whitewater"
      },
      {
        "label": "American Whitewater Pine River gauge detail",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3223",
        "provider": "american_whitewater"
      },
      {
        "label": "Cadillac Area Visitors Bureau / Forest Service Pine River map",
        "url": "https://cadillacmichigan.com/wp-content/uploads/2018/10/CAVB-Trailmaps_2019-pineriver-update.pdf",
        "provider": "local"
      },
      {
        "label": "Lincoln Bridge Campground Boat Launch",
        "url": "https://outdoormichigan.org/feature/5315",
        "provider": "local"
      },
      {
        "label": "Outdoor Michigan Meadow Brook Bridge Boat Launch",
        "url": "https://outdoormichigan.org/feature/5375",
        "provider": "local"
      },
      {
        "label": "Outdoor Michigan Skookum South Bank Boat Launch",
        "url": "https://outdoormichigan.org/feature/5376",
        "provider": "local"
      },
      {
        "label": "Rivers.gov Pine River profile",
        "url": "https://www.rivers.gov/rivers/river/pine",
        "provider": "nps"
      },
      {
        "label": "USGS 04125460 Pine River at High School Bridge",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04125460/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "pine-river-peterson-low-bridge",
    "slug": "pine-river-peterson-low-bridge",
    "name": "Pine River",
    "reach": "Peterson Bridge to Low Bridge",
    "state": "Michigan",
    "region": "Northern Lower Michigan",
    "summary": "National Scenic River day through the Huron-Manistee National Forests from Peterson Bridge to Low Bridge. This is a permit-managed, fast, wooded Pine River run with a direct downstream USGS gauge and American Whitewater flow guidance.",
    "statusText": "Use the Pine River at High School Bridge gauge near Hoxeyville as the live check. Treat 170 cfs as the conservative low-water floor; below that, expect scraping and more difficult boat control. Higher flows make this wooded Class I-II river faster and less forgiving.",
    "latitude": 44.203235,
    "longitude": -85.799124,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "cold_water",
        "private_banks"
      ],
      "safetyNotes": [
        "The Forest Service describes the Pine as swift with challenging rapids, sharp turns, narrow passages, downed trees, and logjams. Peterson to Low Bridge needs moving-water boat control and self-rescue judgment.",
        "Recreation.gov's Pine safety notice flags changing post-flood conditions, unstable banks, submerged debris, and logjams. Check current Forest Service alerts, permit status, and recent local reports before launching.",
        "Stay with permit-managed access sites and designated camping rules. The Pine corridor has fragile banks, private-property constraints, cold water, and limited quick exits between Peterson Bridge and Low Bridge."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04125460",
      "provider": "usgs",
      "siteId": "04125460",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Pine River at High School Bridge near Hoxeyville, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04125460/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 170,
      "thresholdSource": {
        "label": "American Whitewater Pine River flow correlation for the Hoxeyville gauge",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3223",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "The Pine is commonly paddleable spring through fall, but it responds to rain and recent storm damage. Check the Forest Service river permit page, same-day gauge, and recent logjam reports before launching.",
      "difficulty": "moderate",
      "difficultyNotes": "The Forest Service describes the Pine as swift with challenging rapids, sharp turns, and narrow passages. Treat Peterson to Low Bridge as a skilled moving-water trip, especially for canoes, loaded boats, cold water, or groups unfamiliar with quick wood-choked turns.",
      "confidenceNotes": "Confidence is good for a guarded first Michigan add: the Huron-Manistee National Forests publish the Peterson Bridge and Low Bridge access points, the official Pine River map gives coordinates and travel-time context, permits are managed through Recreation.gov, and American Whitewater ties the Pine River flow guidance to USGS 04125460. The app uses only a conservative minimum floor because the strongest numeric source is AW community guidance for the Pine gauge family rather than a Forest Service route-specific band for Peterson-to-Low Bridge."
    },
    "evidenceNotes": [
      {
        "label": "Public route context",
        "value": "Peterson Bridge to Low Bridge",
        "note": "Published Pine River maps identify Peterson Bridge and Low Bridge as river access sites and list the reach at roughly 8.25 to 8.6 miles, with Forest Service permit rules applying in this corridor.",
        "sourceUrl": "https://outdoormichigan.org/trails/PineScenicRiverMap.pdf"
      },
      {
        "label": "Permit-managed river",
        "value": "Forest Service Pine River permits",
        "note": "Recreation.gov administers Pine National Scenic River permits and lists Peterson Bridge and Low Bridge among the selectable access points.",
        "sourceUrl": "https://www.recreation.gov/permits/233336/registration/detailed-availability"
      },
      {
        "label": "Gauge and threshold",
        "value": "170 cfs low floor",
        "note": "American Whitewater publishes Pine River gauge guidance for USGS 04125460, with 170 cfs as the lower runnable floor and higher bands above that. The app uses the lower floor only and avoids claiming an ideal range for this specific Forest Service day trip.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3223"
      },
      {
        "label": "Route character",
        "value": "Fast wooded Class I-II river",
        "note": "Forest Service Pine River material warns about swift current, sharp turns, narrow passages, downed trees, and logjams; American Whitewater characterizes the Pine as a beginner to intermediate whitewater river with downstream sections continuing toward Low Bridge.",
        "sourceUrl": "https://www.recreation.gov/permits/249990"
      },
      {
        "label": "Current-data caveat",
        "value": "USGS 04125460 product-supported",
        "note": "USGS publishes Pine River at High School Bridge near Hoxeyville as monitoring location 04125460, and product code supports USGS gauges by site ID. Same-day gauge freshness, Forest Service alerts, and local wood reports should still be checked before launch.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04125460/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Pine National Scenic River permit page",
        "url": "https://www.recreation.gov/permits/249990",
        "provider": "local"
      },
      {
        "label": "Pine National Scenic River map PDF",
        "url": "https://outdoormichigan.org/trails/PineScenicRiverMap.pdf",
        "provider": "local"
      },
      {
        "label": "Recreation.gov Pine National Scenic River permit",
        "url": "https://www.recreation.gov/permits/233336",
        "provider": "local"
      },
      {
        "label": "American Whitewater Pine River gauge detail",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3223",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 04125460 Pine River at High School Bridge",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04125460/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "huron-river-argo-gallup",
    "slug": "huron-river-argo-gallup",
    "name": "Huron River",
    "reach": "Argo Park Canoe Livery to Gallup Park Livery",
    "state": "Michigan",
    "region": "Southeast Michigan",
    "summary": "Popular Ann Arbor Huron River trip from city-managed Argo Park to Gallup Park. The route includes the Argo Cascades bypass channel, public liveries at both ends, and a direct USGS Ann Arbor gauge in the urban river corridor.",
    "statusText": "Use the Huron River at Ann Arbor gauge. American Whitewater lists 400 to 1,700 cfs as the runnable/play range for the Ann Arbor / Argo Cascades gauge family; below 400 cfs, expect shallow, less useful drops, and above 1,700 cfs the feature is generally washed out.",
    "latitude": 42.29148,
    "longitude": -83.74444,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "dam",
        "fast_rise",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Argo Cascades is a dam-bypass channel with nine manmade drops and pools. City rules warn that boats can flip and require paddlers to steer, swim, and right a capsized boat before using the Cascades.",
        "Use the Ann Arbor USGS gauge as a same-city corridor check, then verify current livery rules, posted closures, and the visual level at Argo before committing. Boat availability and the character of the drops change with water level.",
        "Keep this trip to the official Argo-to-Gallup corridor. Barton Dam access is closed upstream through construction, Argo parking is limited, and Huron River PFAS guidance includes avoiding contact with river foam."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04174500",
      "provider": "usgs",
      "siteId": "04174500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Huron River at Ann Arbor, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04174500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 400,
      "idealMax": 1700,
      "tooLow": 80,
      "tooHigh": 1700,
      "thresholdSource": {
        "label": "American Whitewater Huron River at Ann Arbor gauge bands",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3801",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "The city livery season generally runs spring through fall. Summer weekends can be crowded, and rain or dam operations can change the Argo Cascades and downstream current quickly enough that paddlers should still make a visual check before committing.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a short urban river trip, but the Argo Cascades are a manmade series of drops, rock chutes, and pools. HRWC calls the Cascades a moderate rapid run, and American Whitewater treats the Ann Arbor feature as Class I(II), so the route is hidden from casual Explore discovery.",
      "confidenceNotes": "Confidence is high enough for a guarded whitewater-style route: the City of Ann Arbor operates both Argo and Gallup liveries and lists boat launches, parking, restrooms, rentals, and public paddling use; the Huron River Water Trail names Argo-to-Gallup as the city's most popular 1.5-hour trip; HRWC documents the Argo Cascades as a moderate rapid run; and USGS 04174500 is the Ann Arbor Huron River gauge used by American Whitewater for the Ann Arbor / Argo Cascades gauge family. Unlike the upstream Dexter-Huron-to-Delhi lead, this route starts below Argo Dam and uses the Ann Arbor gauge as a same-city corridor gauge; still, AW warns that dam operations can cause erratic readings, so visual confirmation remains part of the route copy."
    },
    "evidenceNotes": [
      {
        "label": "Official trip shape",
        "value": "3.5 miles / about 1.5 hours",
        "note": "The Huron River Water Trail / HRWC Washtenaw trips page lists Argo to Gallup as a 3.5-mile, 1.5-hour trip, and the Ann Arbor page says it is the Huron River's most popular trip with a paddle down the Cascades drops and pools to Gallup Livery.",
        "sourceUrl": "https://huronriverwatertrail.org/trail-towns/ann-arbor/"
      },
      {
        "label": "Public endpoints",
        "value": "City of Ann Arbor liveries",
        "note": "City pages identify Argo Park Canoe Livery at 1055 Longshore Drive and Gallup Park Livery at 3000 Fuller Road, with boat launches, canoe/kayak rentals, parking, and restrooms.",
        "sourceUrl": "https://www.a2gov.org/parks-and-recreation/parks-and-places/argo-park-canoe-livery/"
      },
      {
        "label": "Gauge bands",
        "value": "80 / 400-1,700 / 1,700 cfs",
        "note": "American Whitewater lists 80-400 cfs as less ideal, 400-1,700 cfs as runnable/playable, and 1,700 cfs and above as generally washed out for the Huron River at Ann Arbor gauge family.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3801"
      },
      {
        "label": "Whitewater feature",
        "value": "Argo Cascades",
        "note": "HRWC describes Argo Cascades as a moderate manmade series of 1.5- to 2-foot drops between pools that bypass Argo Dam, with a paved path for walking back to the top.",
        "sourceUrl": "https://huronriverwatertrail.org/trip-planner/trip-wash/"
      },
      {
        "label": "Current-condition support",
        "value": "USGS 04174500",
        "note": "The City of Ann Arbor points paddlers and residents to the USGS Huron River gauge for discharge, gauge height, temperature, dissolved oxygen, pH, conductivity, and turbidity.",
        "sourceUrl": "https://www.a2gov.org/systems-planning/stream-gauges/"
      },
      {
        "label": "Closures and advisories",
        "value": "Barton closure upstream; PFAS foam advisory",
        "note": "HRWC river conditions list the Barton Dam / Barton Pond access closure through 2027 upstream of this route and PFAS advisories that include avoiding contact with river foam.",
        "sourceUrl": "https://huronriverwatertrail.org/river-conditions/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Huron River Water Trail Ann Arbor",
        "url": "https://huronriverwatertrail.org/trail-towns/ann-arbor/",
        "provider": "local"
      },
      {
        "label": "Huron River Water Trail Washtenaw trips",
        "url": "https://huronriverwatertrail.org/trip-planner/trip-wash/",
        "provider": "local"
      },
      {
        "label": "Huron River Water Trail river conditions",
        "url": "https://huronriverwatertrail.org/river-conditions/",
        "provider": "local"
      },
      {
        "label": "City of Ann Arbor Argo Park Canoe Livery",
        "url": "https://www.a2gov.org/parks-and-recreation/parks-and-places/argo-park-canoe-livery/",
        "provider": "local"
      },
      {
        "label": "City of Ann Arbor Gallup Park Livery",
        "url": "https://www.a2gov.org/parks-and-recreation/parks-and-places/gallup-park-livery/",
        "provider": "local"
      },
      {
        "label": "American Whitewater Huron River Ann Arbor gauge",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3801",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 04174500 Huron River at Ann Arbor",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04174500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "clinton-river-downtown-utica-budd",
    "slug": "clinton-river-downtown-utica-budd",
    "name": "Clinton River",
    "reach": "Downtown Utica to Budd Park",
    "state": "Michigan",
    "region": "Southeast Michigan",
    "summary": "Macomb County Clinton River planner corridor from Downtown Utica through North Clinton River Park and Rotary Park to Budd Park.",
    "statusText": "Use the Clinton River at Sterling Heights gauge near the take-out. CRWC warns of low water at 8.0 ft and high water at 10.0 ft; between those marks, still check the launch for wood, fast current, and urban stormwater effects.",
    "latitude": 42.625576,
    "longitude": -83.037665,
    "gaugeSource": {
      "id": "usgs-04161820",
      "provider": "usgs",
      "siteId": "04161820",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Clinton River at Sterling Heights, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04161820/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 8,
      "idealMax": 10,
      "tooLow": 8,
      "tooHigh": 10,
      "thresholdSource": {
        "label": "Clinton River Watershed Council Sterling Heights gauge warnings",
        "url": "https://www.crwc.org/recreation/paddling",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Spring through fall is the practical paddling season. This urban section can rise quickly after rain, and CRWC warns that high water can carry woody debris, create blocked passages, and raise water-quality concerns from sewage overflows.",
      "difficulty": "moderate",
      "difficultyNotes": "This urban corridor remains moderate because CRWC warns that wood, swift current, bridges, and stormwater can change conditions quickly.",
      "confidenceNotes": "Confidence is good for a consolidated Clinton River corridor because the replaced route cards shared the same Sterling Heights gauge warning model and adjacent water-trail accesses."
    },
    "evidenceNotes": [
      {
        "label": "Planner corridor",
        "value": "Downtown Utica water-trail access to Budd Park carry-in launch, with intermediate access choices",
        "note": "This route replaces overlapping access-to-access cards with one access-planner corridor.",
        "sourceUrl": "https://www.crwc.org/recreation/paddling"
      },
      {
        "label": "Gauge model",
        "value": "Clinton River at Sterling Heights, MI",
        "note": "The consolidated route keeps the same reviewed gauge model used by the replaced route cards.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04161820/"
      }
    ],
    "sourceLinks": [
      {
        "label": "CRWC paddling and gauge warnings",
        "url": "https://www.crwc.org/recreation/paddling",
        "provider": "local"
      },
      {
        "label": "2024 Clinton River Water Trail map PDF",
        "url": "https://static1.squarespace.com/static/64525a62c1226a7b4e5e5281/t/6645fc9f9ba06909adb2c097/1729861989526/2024%2BClinton%2BRiver%2BWatertrail%2BMap.pdf",
        "provider": "local"
      },
      {
        "label": "Michigan Water Trails Downtown Utica",
        "url": "https://www.michiganwatertrails.org/location.asp?aid=1893&ait=av",
        "provider": "local"
      },
      {
        "label": "Michigan Water Trails Clinton River Water Trail",
        "url": "https://www.michiganwatertrails.org/trail.asp?ait=cv&cid=242",
        "provider": "local"
      },
      {
        "label": "City of Sterling Heights canoe and kayak page",
        "url": "https://www.sterlingheights.gov/1434/Come-Explore-the-Clinton-River",
        "provider": "local"
      },
      {
        "label": "Macomb County Clinton River overview",
        "url": "https://www.macombgov.org/make-macomb-your-home/outdoor-activities/water/clinton-river",
        "provider": "local"
      },
      {
        "label": "USGS 04161820 Clinton River at Sterling Heights",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04161820/",
        "provider": "usgs"
      },
      {
        "label": "CRWC Clinton River Water Trail guide book",
        "url": "https://www.crwc.org/s/Clinton_Paddling_Guide_Final-2.pdf",
        "provider": "local"
      },
      {
        "label": "Outdoor Michigan Clinton River",
        "url": "https://outdoormichigan.org/feature/7986",
        "provider": "local"
      }
    ],
    "aliases": [
      "Clinton River - Downtown Utica to Budd Park",
      "Upper Macomb Clinton River access planner corridor"
    ],
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [],
      "reviewStatus": "reviewed",
      "safetyNotes": [
        "Use the access planner to choose a short urban section instead of assuming the full corridor fits the day.",
        "Wood, bridge current, stormwater, and high-water warnings matter throughout this corridor.",
        "Stay with mapped public water-trail accesses."
      ]
    }
  },
  {
    "id": "clinton-river-macarthur-harley-ensign",
    "slug": "clinton-river-macarthur-harley-ensign",
    "name": "Clinton River",
    "reach": "MacArthur Park to Harley Ensign",
    "state": "Michigan",
    "region": "Southeast Michigan",
    "summary": "Lower Clinton River water-trail finish from the Neil Dempsey launch at MacArthur Park to the DNR Harley Ensign access at Lake St. Clair. CRWC maps both access points and publishes a Sterling Heights USGS low/high warning ladder, but this mouth section also needs a wind, waves, and motorboat check.",
    "statusText": "Use the Clinton River at Sterling Heights gauge as CRWC's warning check. CRWC warns of low water at 8.0 ft and high water at 10.0 ft; also check Lake St. Clair wind, waves, boat traffic, and the Harley Ensign landing before committing.",
    "latitude": 42.597338,
    "longitude": -82.871104,
    "gaugeSource": {
      "id": "usgs-04161820",
      "provider": "usgs",
      "siteId": "04161820",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Clinton River at Sterling Heights, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04161820/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 8,
      "idealMax": 10,
      "tooLow": 8,
      "tooHigh": 10,
      "thresholdSource": {
        "label": "Clinton River Watershed Council Sterling Heights gauge warnings",
        "url": "https://www.crwc.org/recreation/paddling",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Spring through fall is the practical paddling season. This lowest Clinton reach is slower than upstream swiftwater, but rain can still push wood and stormwater through the river while Lake St. Clair conditions can add wind, waves, and motorboat exposure near the finish.",
      "difficulty": "moderate",
      "difficultyNotes": "The river mileage is straightforward, but this is not the same beginner call as the protected Budd-to-Mount-Clemens reach. Treat the final approach to Harley Ensign as exposed lower-river paddling where motorboat traffic, wind, waves, open-water proximity, and urban water quality matter.",
      "confidenceNotes": "Confidence is high for a guarded water-trail add: the 2024 CRWC Clinton River Water Trail map lists Neil Dempsey at MacArthur Park and Harley Ensign (DNR) with coordinates, river miles, and a 7.2-mile spacing; Michigan Water Trails lists both as Clinton River Water Trail assets; Macomb County identifies Harley Ensign as a county launch location; and CRWC publishes USGS 04161820 low/high warning stages. The gauge is treated as a proxy warning gauge because this route is downstream from Sterling Heights and ends at Lake St. Clair; the app does not claim a precise ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Access map",
        "value": "Neil Dempsey Launch RM 7.2 to Harley Ensign RM 0.0",
        "note": "The 2024 CRWC water-trail map lists Neil Dempsey at MacArthur Park and Harley Ensign (DNR) as launch sites, with 7.2 miles from Neil Dempsey to Harley Ensign at the river mouth.",
        "sourceUrl": "https://static1.squarespace.com/static/64525a62c1226a7b4e5e5281/t/6645fc9f9ba06909adb2c097/1729861989526/2024%2BClinton%2BRiver%2BWatertrail%2BMap.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "42.597338, -82.871104 to 42.593327, -82.774834",
        "note": "The 2024 CRWC water-trail map table gives coordinates for Neil Dempsey at MacArthur Park and Harley Ensign (DNR).",
        "sourceUrl": "https://static1.squarespace.com/static/64525a62c1226a7b4e5e5281/t/6645fc9f9ba06909adb2c097/1729861989526/2024%2BClinton%2BRiver%2BWatertrail%2BMap.pdf"
      },
      {
        "label": "Water-trail assets",
        "value": "MacArthur Park and Harley Ensign",
        "note": "Michigan Water Trails lists MacArthur Park and Harley Ensign as Clinton River Water Trail access assets.",
        "sourceUrl": "https://www.michiganwatertrails.org/trail.asp?ait=cv&cid=242"
      },
      {
        "label": "Lower-river character",
        "value": "Slow-moving lower Clinton to Lake St. Clair",
        "note": "CRWC describes the lower Clinton as slow-moving waters through forested riverbanks and parks before emptying into Lake St. Clair, while warning that the river can still run high and carry woody debris after rain.",
        "sourceUrl": "https://www.crwc.org/recreation/paddling"
      },
      {
        "label": "Gauge warnings",
        "value": "8.0 ft low warning / 10.0 ft high warning",
        "note": "CRWC bases water-level warnings on the USGS Sterling Heights gauge and publishes a low-water warning at 8 ft and high-water warning at 10 ft. The app uses this as a conservative proxy warning window for the downstream mouth reach.",
        "sourceUrl": "https://www.crwc.org/recreation/paddling"
      },
      {
        "label": "Launch context",
        "value": "Macomb County launch list",
        "note": "Macomb County paddling guidance identifies MacArthur Park and Harley Ensign Memorial among county-area kayak, canoe, and paddleboard launch locations.",
        "sourceUrl": "https://www.macombgov.org/make-macomb-your-home/outdoor-activities/water/clinton-river"
      },
      {
        "label": "Urban water quality",
        "value": "Check current conditions after rain",
        "note": "Macomb County monitors the Clinton River and Lake St. Clair watershed for E. coli and documents that rain can trigger sanitary or combined sewer overflows. Treat water contact and any posted advisory as part of the launch decision.",
        "sourceUrl": "https://www.macombgov.org/departments/health-department/environmental-health-services/surface-water-quality"
      }
    ],
    "sourceLinks": [
      {
        "label": "CRWC paddling and gauge warnings",
        "url": "https://www.crwc.org/recreation/paddling",
        "provider": "local"
      },
      {
        "label": "2024 Clinton River Water Trail map PDF",
        "url": "https://static1.squarespace.com/static/64525a62c1226a7b4e5e5281/t/6645fc9f9ba06909adb2c097/1729861989526/2024%2BClinton%2BRiver%2BWatertrail%2BMap.pdf",
        "provider": "local"
      },
      {
        "label": "Michigan Water Trails Clinton River Water Trail",
        "url": "https://www.michiganwatertrails.org/trail.asp?ait=cv&cid=242",
        "provider": "local"
      },
      {
        "label": "Macomb County Clinton River overview",
        "url": "https://www.macombgov.org/make-macomb-your-home/outdoor-activities/water/clinton-river",
        "provider": "local"
      },
      {
        "label": "Macomb County surface water quality",
        "url": "https://www.macombgov.org/departments/health-department/environmental-health-services/surface-water-quality",
        "provider": "local"
      },
      {
        "label": "USGS 04161820 Clinton River at Sterling Heights",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04161820/",
        "provider": "usgs"
      }
    ],
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality"
      ],
      "reviewStatus": "reviewed",
      "safetyNotes": [
        "Use the Sterling Heights gauge only as CRWC's downstream warning check: 8 ft is its low-water warning and 10 ft is its high-water warning, not a claimed ideal range for this mouth reach.",
        "Recheck the river after rain. CRWC warns that fast, high water can move woody debris and block passages; skip the trip when the proxy gauge, visual current, or debris makes the route unsuitable for the group.",
        "Check current water-quality information, wind, waves, and motorboat traffic before launching. Inspect Harley Ensign first and do not drift or continue onto Lake St. Clair without a separate open-water plan."
      ]
    }
  },
  {
    "id": "clinton-river-shadyside-macarthur",
    "slug": "clinton-river-shadyside-macarthur",
    "name": "Clinton River",
    "reach": "Shadyside Park to MacArthur Park",
    "state": "Michigan",
    "region": "Southeast Michigan",
    "summary": "Very short Mount Clemens lower Clinton link from Shadyside Park to the Neil Dempsey launch at MacArthur Park. The CRWC map and Mount Clemens parks page still support both public endpoints, and this works as a cautious extension below the beginner Budd-to-Shadyside segment.",
    "statusText": "Use the Clinton River at Sterling Heights gauge as a conservative downstream proxy. CRWC warns of low water at 8.0 ft and high water at 10.0 ft; the latest official USGS reading available during this run was 7.56 ft and 105 cfs at 2026-07-15T15:00:00-05:00, so expect slow water, shallow lines, and more landing inspection than speed.",
    "latitude": 42.582529,
    "longitude": -82.880104,
    "gaugeSource": {
      "id": "usgs-04161820",
      "provider": "usgs",
      "siteId": "04161820",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Clinton River at Sterling Heights, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/04161820/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 8,
      "idealMax": 10,
      "tooLow": 8,
      "tooHigh": 10,
      "thresholdSource": {
        "label": "Clinton River Watershed Council Sterling Heights gauge warnings",
        "url": "https://www.crwc.org/recreation/paddling",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Spring through fall is the practical season. This short city reach is still sensitive to rain spikes, floating wood, and water-quality issues despite its modest mileage.",
      "difficulty": "easy",
      "difficultyNotes": "Mileage is short and the corridor is slower than the open-water mouth section, but the Mount Clemens finish still demands attention to signage, obstructions, and any posted dam or weir warnings.",
      "confidenceNotes": "Confidence is good for a conservative Michigan add: the current CRWC water-trail map still places Shadyside Park at river mile 9.2 and Neil Dempsey at MacArthur Park at river mile 7.2, the current Mount Clemens parks page still says Shadyside has a boat and canoe launch and MacArthur has a universally accessible kayak launch, and USGS Water Services returned 7.56 ft and 105 cfs at 2026-07-15T15:00:00-05:00 for the Sterling Heights warning gauge during this run."
    },
    "evidenceNotes": [
      {
        "label": "Access map",
        "value": "Shadyside Park RM 9.2 to Neil Dempsey RM 7.2",
        "note": "The 2024 CRWC water-trail map lists Shadyside Park and Neil Dempsey at MacArthur Park as consecutive public launches about 2 river miles apart.",
        "sourceUrl": "https://pufferfish-dolphin-5bdb.squarespace.com/s/2024-Clinton-River-Watertrail-Map.pdf"
      },
      {
        "label": "Public launches",
        "value": "Shadyside Park and MacArthur Park",
        "note": "Mount Clemens says Shadyside Park has a handicapped accessible pier with a boat and canoe launch, and MacArthur Park has a universally accessible kayak launch.",
        "sourceUrl": "https://mountclemens.gov/parks/"
      },
      {
        "label": "Proxy gauge",
        "value": "USGS 04161820 at Sterling Heights",
        "note": "USGS Water Services returned 7.56 ft and 105 cfs at 2026-07-15T15:00:00-05:00 for Clinton River at Sterling Heights, MI. This lower Mount Clemens reach uses that same official warning gauge conservatively as a proxy.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=04161820&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Lower-river context",
        "value": "Macomb County public launch network",
        "note": "Macomb County says the main branch of the Clinton River has eight public paddle launches across Utica, Sterling Heights, Clinton Township, Mount Clemens, and Harrison Township.",
        "sourceUrl": "https://www.macombgov.org/make-macomb-your-home/outdoor-activities/trail-network/water-trails/main-branch-clinton-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "CRWC paddling and gauge warnings",
        "url": "https://www.crwc.org/recreation/paddling",
        "provider": "local"
      },
      {
        "label": "2024 Clinton River Water Trail map PDF",
        "url": "https://pufferfish-dolphin-5bdb.squarespace.com/s/2024-Clinton-River-Watertrail-Map.pdf",
        "provider": "local"
      },
      {
        "label": "Mount Clemens city parks",
        "url": "https://mountclemens.gov/parks/",
        "provider": "local"
      },
      {
        "label": "Macomb County main branch Clinton River",
        "url": "https://www.macombgov.org/make-macomb-your-home/outdoor-activities/trail-network/water-trails/main-branch-clinton-river",
        "provider": "local"
      },
      {
        "label": "USGS 04161820 Water Services",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=04161820&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Michigan Water Trails Clinton River Water Trail",
        "url": "https://www.michiganwatertrails.org/trail.asp?ait=cv&cid=242",
        "provider": "local"
      }
    ],
    "aliases": [
      "Clinton River - Shadyside Park to MacArthur Park",
      "Lower Clinton River Shadyside to Neil Dempsey Launch",
      "Shadyside Park to MacArthur Park in Mount Clemens"
    ],
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "urban_water_quality"
      ],
      "reviewStatus": "reviewed",
      "safetyNotes": [
        "This short lower-city segment still needs a same-day scan for wood, strainers, and any posted Mount Clemens dam or weir warning signage.",
        "Urban stormwater and sewer-overflow concerns remain part of the call after rain or high water.",
        "Finish at Neil Dempsey and do not continue toward Lake St. Clair or the lower mouth corridor without a separate wind, waves, and motorboat plan."
      ]
    }
  },
  {
    "id": "ontonagon-middle-branch-watersmeet-forest-road-5250",
    "riverId": "middle-branch-ontonagon-river",
    "slug": "ontonagon-middle-branch-watersmeet-forest-road-5250",
    "name": "Middle Branch Ontonagon River",
    "reach": "Watersmeet Canoe Landing to Forest Road 5250",
    "state": "Michigan",
    "region": "Western Upper Peninsula",
    "summary": "A 16.25-mile Middle Branch Ontonagon corridor from the designated Watersmeet canoe access to the Forest Road 5250 bridge/take-out in Ottawa National Forest. The documented run combines quiet flatwater, Class I-II rapids, and a mandatory portage around Max-i-min-e Falls, with direct USGS 04033000 flow context.",
    "statusText": "Use USGS 04033000 near Paulding as the direct live discharge check. A documented paddle report describes 165 cfs at the gauge as a little low but runnable and about 180 cfs as a strong target; treat that community reference as planning guidance, not a safety guarantee. Portage Max-i-min-e Falls, scout ledges and wood, and do not launch without a same-day visual assessment.",
    "latitude": 46.35672,
    "longitude": -89.07679,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "fast_rise", "whitewater", "dam", "strainers", "cold_water", "access_uncertain"],
      "safetyNotes": [
        "The Watersmeet canoe landing and Forest Road 5250 take-out are remote access points; verify current road, parking, and launch conditions before committing to the shuttle.",
        "Max-i-min-e Falls requires a portage; do not run it. The route also includes a man-made ledge, boulder gardens, and Class I-II rapids that can become more hazardous at higher flow.",
        "The 165-180 cfs references come from a documented paddle report and are community planning guidance, not an agency-certified safe range. Check the direct gauge, trend, weather, water temperature, and same-day river appearance.",
        "Wear a properly fitted PFD, carry communication and rescue equipment, and avoid the route during flood warnings, severe weather, or cold-water conditions beyond the group’s competence.",
        "This is a remote forest corridor with limited services; file a float plan and do not assume cell coverage or informal access beyond the named endpoints."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04033000",
      "provider": "usgs",
      "siteId": "04033000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Middle Branch Ontonagon River near Paulding, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04033000/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04033000"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 180,
      "tooLow": 165,
      "thresholdSource": {"label": "Miles Paddled Middle Branch Ontonagon trip report", "url": "https://milespaddled.com/ontonagon-river-middle-branch/", "provider": "local"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [5, 6, 7, 8, 9, 10],
      "seasonNotes": "Late spring through fall is the practical window. Snowmelt, storms, and reservoir operations can change flow quickly; cold water remains a major risk outside summer.",
      "difficulty": "moderate",
      "difficultyNotes": "A remote moving-water route for competent flatwater paddlers and beginners with appropriate instruction. The route includes Class I-II rapids, a mandatory portage around Max-i-min-e Falls, and a few features requiring scouting; it is not a casual float for an unprepared group.",
      "confidenceNotes": "Confidence is strong for the distinct route package: Miles Paddled documents the 16.25-mile Watersmeet-to-Forest Road 5250 corridor, endpoint coordinates, direct gauge reading and target guidance, rapids, mandatory Max-i-min-e Falls portage, and shuttle context; USGS provides direct 04033000 telemetry; American Whitewater independently documents the gauge and downstream Ontonagon reach; and the U.S. Fish and Wildlife Service confirms popular canoeing, Class III limitations, and Burned Dam camping in the Middle Branch system. The flow values remain community guidance rather than a safety guarantee."
    },
    "putIn": {"id": "watersmeet-canoe-landing", "name": "Designated Watersmeet canoe access south of Highway 45", "latitude": 46.27471, "longitude": -89.17656},
    "takeOut": {"id": "forest-road-5250-bridge", "name": "Forest Road 5250 bridge/take-out northeast of Watersmeet", "latitude": 46.35672, "longitude": -89.07679},
    "evidenceNotes": [
      {"label": "Exact route", "value": "Watersmeet Canoe Landing to Forest Road 5250; 16.25 mi", "note": "Miles Paddled documents the named endpoint pair, 16.25-mile distance, trip time, and shuttle context.", "sourceUrl": "https://milespaddled.com/ontonagon-river-middle-branch/"},
      {"label": "Public endpoints and coordinates", "value": "Watersmeet designated canoe access to Forest Road 5250 take-out", "note": "Miles Paddled provides WGS84 coordinates for both endpoints and identifies the Watersmeet access as designated canoe access.", "sourceUrl": "https://milespaddled.com/ontonagon-river-middle-branch/"},
      {"label": "Live gauge and threshold", "value": "USGS 04033000; 165 cfs documented runnable reference and 180 cfs target", "note": "USGS supplies direct discharge and stage telemetry; Miles Paddled supplies the numeric trip reference; use it as conservative planning guidance only.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04033000"},
      {"label": "Safety and route character", "value": "Class I-II moving water with Max-i-min-e Falls portage and ledge/wood hazards", "note": "Miles Paddled and American Whitewater document the rapids, mandatory portage, and downstream access context.", "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/936/main"},
      {"label": "Camping and logistics", "value": "Remote forest shuttle; Burned Dam Campground is documented in the broader Middle Branch corridor", "note": "The U.S. Fish and Wildlife Service identifies Burned Dam Campground as canoe/kayak take-out and overnight context; do not infer camping at either route endpoint without current confirmation.", "sourceUrl": "https://www.fws.gov/rivers/river/ontonagon"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product’s rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04033000 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04033000", "provider": "usgs"},
      {"label": "Miles Paddled exact route and endpoints", "url": "https://milespaddled.com/ontonagon-river-middle-branch/", "provider": "local"},
      {"label": "American Whitewater Middle Branch reach", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/936/main", "provider": "local"},
      {"label": "U.S. Fish and Wildlife Service Ontonagon River recreation context", "url": "https://www.fws.gov/rivers/river/ontonagon", "provider": "local"}
    ],
    "aliases": ["Ontonagon River Middle Branch Watersmeet to Forest Road 5250", "Middle Branch Ontonagon Watersmeet float"]
  },
  {
    "id": "muskegon-river-croton-dam-thornapple",
    "riverId": "muskegon-river",
    "slug": "muskegon-river-croton-dam-thornapple",
    "name": "Muskegon River",
    "reach": "Croton Dam Tailwater Park to Thornapple High Rollway",
    "state": "Michigan",
    "region": "West Michigan",
    "summary": "A documented 6.5-mile Muskegon River Class I reach from the public Croton Dam Tailwater Park launch to the Thornapple/High Rollway take-out. The route begins below Croton Dam, uses direct USGS 04121970 conditions, and follows the established Croton-to-Thornapple paddling corridor.",
    "statusText": "Put in only at the Croton Dam tailwater access below the dam; never run or approach the dam structure. Use USGS 04121970 discharge as a conservative planning check. The 771 cfs minimum-only floor is tied to the station's official low-flow statistic for the seasonal reference date, not a safety guarantee; inspect current flow, wood, weather, and access before launching.",
    "latitude": 43.414845,
    "longitude": -85.719017,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["dam", "low_water", "strainers", "fast_rise", "cold_water", "access_uncertain"],
      "safetyNotes": [
        "Launch only at Croton Dam Tailwater Park below the dam. The Croton Dam structure is a mandatory no-run hazard; stay downstream of the posted portage and obey all closure and warning signage.",
        "The published float map and local operators identify the Croton-to-Thornapple corridor, but same-day conditions control. Use direct USGS 04121970 discharge and stage as a planning check, never as an automatic go/no-go decision.",
        "The 771 cfs minimum-only reference is an official historical low-flow statistic for the gauge's seasonal record, not a route-certified runnable threshold. Expect shallow gravel, strainers, changing current, and possible ramp or river closures below that reference.",
        "Wear a properly fitted PFD, carry communication and rescue equipment, and avoid cold-water, lightning, flood-warning, or rapidly rising conditions. Keep clear of fishing lines, livery traffic, and bridge structures.",
        "Thornapple High Rollway is a named public access; confirm the take-out, parking, Recreation Passport rules, and shuttle before launching. Do not infer private-bank camping or landing rights."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04121970",
      "provider": "usgs",
      "siteId": "04121970",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Muskegon River near Croton, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04121970/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04121970"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 983,
      "tooLow": 771,
      "thresholdSource": {"label": "USGS 04121970 seasonal low-flow reference", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04121970", "provider": "usgs"},
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [5, 6, 7, 8, 9, 10],
      "seasonNotes": "Late spring through fall is the practical window. Dam operations, storms, cold water, and seasonal access restrictions can change the route quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "A 6.5-mile Class I moving-water reach below a major dam. The river is generally recreationally navigable when conditions are suitable, but the dam portage/no-run rule, wood, shallow sections, cold water, and changing commercial traffic demand active judgment.",
      "confidenceNotes": "Confidence is strong for the distinct route and endpoints: the Muskegon River float map documents Croton-to-Thornapple as 6.5 miles; Michigan DNR identifies the Croton Dam Tailwater and Thornapple High Rollway accesses and the dam portage; local operators provide Croton-to-Thornapple paddle trips and shuttle service; and USGS 04121970 supplies direct discharge and stage telemetry. The flow values are conservative planning references, not safety certification."
    },
    "putIn": {"id": "croton-dam-tailwater-park", "name": "Croton Dam Tailwater Park public boat launch below Croton Dam", "latitude": 43.435561, "longitude": -85.66678},
    "takeOut": {"id": "thornapple-high-rollway", "name": "Thornapple High Rollway public boat access", "latitude": 43.414845, "longitude": -85.719017},
    "evidenceNotes": [
      {"label": "Exact route and distance", "value": "Croton Dam Tailwater Park to Thornapple High Rollway; about 6.5 mi", "note": "The Newaygo County Muskegon River Float Map lists Croton Dam to Thornapple as a 6.5-mile, roughly 2.5-hour float.", "sourceUrl": "https://newaygocountyexploring.com/wp-content/uploads/2017/09/MuskegonRiverFloatMap.pdf"},
      {"label": "Public endpoints and dam portage", "value": "Croton Dam Tailwater Park below the dam to Thornapple High Rollway", "note": "Michigan DNR identifies the tailwater boat access, the dam portage, and Thornapple High Rollway access with coordinates and directions.", "sourceUrl": "https://www.michigan.gov/dnr/managing-resources/fisheries/units/c-michigan"},
      {"label": "Live gauge and threshold", "value": "USGS 04121970; 771 cfs conservative minimum-only reference and 983 cfs seasonal planning target", "note": "USGS supplies direct discharge and stage telemetry and publishes the seasonal daily statistics used as a planning reference; neither value is a safety guarantee.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04121970"},
      {"label": "Safety and river character", "value": "Class I reach below a major dam with mandatory no-run/portage, wood, cold-water, and access hazards", "note": "The float map and Michigan DNR access materials establish the corridor and dam portage; local operators document current paddle/shuttle use.", "sourceUrl": "https://www.crotondamfloattrips.com/"},
      {"label": "Camping and logistics", "value": "Day route with local shuttle; designated Croton/Thornapple-area camping only", "note": "Croton Dam Float Trips and the DNR access inventory document shuttle/access context and nearby designated facilities; verify current rules before overnight use.", "sourceUrl": "https://www.crotondamfloattrips.com/"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04121970 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04121970", "provider": "usgs"},
      {"label": "Muskegon River Float Map", "url": "https://newaygocountyexploring.com/wp-content/uploads/2017/09/MuskegonRiverFloatMap.pdf", "provider": "local"},
      {"label": "Michigan DNR Muskegon access and dam portage", "url": "https://www.michigan.gov/dnr/managing-resources/fisheries/units/c-michigan", "provider": "local"},
      {"label": "Croton Dam Float Trips and shuttle", "url": "https://www.crotondamfloattrips.com/", "provider": "local"},
      {"label": "CanWePaddle Michigan section estimates", "url": "https://canwepaddle.com/rivers/michigan/", "provider": "local"}
    ],
    "aliases": ["Muskegon River Croton Dam to Thornapple", "Muskegon River Croton tailwater to High Rollway"]
  },
  {
    "id": "north-branch-au-sable-lovells-kelloggs",
    "riverId": "north-branch-au-sable-river",
    "slug": "north-branch-au-sable-lovells-kelloggs",
    "name": "North Branch Au Sable River",
    "reach": "Lovells Bridge to Kelloggs Bridge",
    "state": "Michigan",
    "region": "Northern Lower Peninsula",
    "summary": "A roughly 8-mile North Branch Au Sable corridor from the public Lovells Bridge access to the Kelloggs Bridge take-out. Paddle-club reports document the named endpoint pair; direct USGS 04135800 telemetry is located at Kelloggs Bridge.",
    "statusText": "Use direct USGS 04135800 discharge at Kelloggs Bridge as a conservative planning check. The station's six-year daily statistics place the low-flow reference near 139 cfs and the 25th percentile near 141 cfs; these are not safety certifications. The North Branch is narrow and shallow with gravel bars, braided channels, wood, and cold water. Inspect conditions before launching.",
    "latitude": 44.716469,
    "longitude": -84.419502,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "cold_water", "fast_rise", "access_uncertain"],
      "safetyNotes": [
        "Lovells Bridge is named carry-in public access and Kelloggs Bridge has public roadside parking and river access; verify current access and closures before the shuttle.",
        "The North Branch is narrow and shallow. Gravel bars, braided channels, sweepers, and woody debris can make the route impassable; scout and portage whenever the channel is unclear.",
        "The 139 cfs low-flow and 141 cfs lower-quartile references come from direct USGS daily statistics, not a runnable guarantee. Same-day visual conditions control.",
        "This is cold-water trout water with limited services. Wear a PFD, carry communication and rescue equipment, avoid high water and storms, and do not paddle alone.",
        "Use only named public endpoints and designated nearby camping or lodging; do not infer private-bank access or overnight camping."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04135800",
      "provider": "usgs",
      "siteId": "04135800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "North Branch Au Sable River at Kelloggs Bridge near Lovells, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04135800/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04135800"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 141,
      "tooLow": 139,
      "thresholdSource": {"label": "USGS 04135800 daily discharge statistics", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04135800", "provider": "usgs"},
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Early spring through fall is the practical window; cold water, low summer flow, storms, and debris changes require a same-day call.",
      "difficulty": "moderate",
      "difficultyNotes": "A narrow, shallow moving-water route for competent canoeists and kayakers. Gravel bars, braids, sweepers, and wood require active handling and scouting; this is not a casual tube float.",
      "confidenceNotes": "Paddle-club reports document Lovells-to-Kelloggs paddles; Michigan DNR and local access sources document public access; USGS 04135800 is at Kelloggs Bridge with continuous and daily discharge; and the Michigan Au Sable plan documents the North Branch's shallow character. Thresholds are planning references, not safety certification."
    },
    "putIn": {"id": "lovells-bridge-access", "name": "Lovells Bridge public carry-in access", "latitude": 44.803931, "longitude": -84.481941},
    "takeOut": {"id": "kelloggs-bridge-access", "name": "Kelloggs Bridge public river access and roadside parking", "latitude": 44.716469, "longitude": -84.419502},
    "evidenceNotes": [
      {"label": "Exact route and endpoints", "value": "Lovells Bridge to Kelloggs Bridge; roughly 8 mi planning reach", "note": "Traverse Area Paddle Club reports document the named endpoint pair and provide access coordinates.", "sourceUrl": "https://www.traverseareapaddleclub.org/content.aspx?club_id=813410&module_id=58595&page_id=22"},
      {"label": "Public access and coordinates", "value": "Lovells Bridge carry-in access to Kelloggs Bridge access", "note": "The Lovells Township recreation plan and DNR access material identify public access and parking at the named bridges.", "sourceUrl": "https://www.discovernortheastmichigan.org/downloads/lovells_township_recreation_plan_final.pdf"},
      {"label": "Live gauge and threshold", "value": "USGS 04135800; 139 cfs minimum-only and 141 cfs lower-quartile planning references", "note": "USGS supplies direct discharge and stage telemetry at Kelloggs Bridge and publishes the daily statistics; neither value is a safety guarantee.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04135800"},
      {"label": "Safety and river character", "value": "Narrow, shallow North Branch with gravel bars, braids, wood, and cold water", "note": "Michigan DNR's Au Sable plan and paddle-club reports document shallow sections and seasonal navigability.", "sourceUrl": "https://www.michigan.gov/documents/dnr/AuSable_plan_233514_7.pdf"},
      {"label": "Camping and logistics", "value": "Day route with nearby designated forest/township camping only", "note": "No on-route camping is assumed; verify designated campground reservations and access separately.", "sourceUrl": "https://ausable.chrisizworski.com/"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04135800 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04135800", "provider": "usgs"},
      {"label": "USGS 04135800 station metadata", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04135800/", "provider": "usgs"},
      {"label": "Traverse Area Paddle Club access directions", "url": "https://www.traverseareapaddleclub.org/content.aspx?club_id=813410&module_id=58595&page_id=22", "provider": "local"},
      {"label": "Michigan DNR Au Sable plan", "url": "https://www.michigan.gov/documents/dnr/AuSable_plan_233514_7.pdf", "provider": "local"},
      {"label": "Lovells Township recreation plan", "url": "https://www.discovernortheastmichigan.org/downloads/lovells_township_recreation_plan_final.pdf", "provider": "local"},
      {"label": "Au Sable access and float map", "url": "https://ausable.chrisizworski.com/", "provider": "local"}
    ],
    "aliases": ["North Branch Au Sable Lovells to Kelloggs", "Au Sable North Branch Lovells Bridge to Kelloggs Bridge"]
  },
  {
    "id": "paw-paw-river-riverside-graham-avenue",
    "riverId": "paw-paw-river",
    "slug": "paw-paw-river-riverside-graham-avenue",
    "name": "Paw Paw River",
    "reach": "Riverside Kayak Park to Graham Avenue Water Access",
    "state": "Michigan",
    "region": "Southwest Michigan",
    "summary": "An approximately 11-mile Paw Paw River Water Trail reach from Riverside Kayak Park to the public Graham Avenue access in Benton Harbor.",
    "statusText": "Use direct USGS 04102500 at Riverside. A local paddling guide identifies 6 feet at the Riverside gauge as the meaningful low/high planning break; treat it as community guidance, not a safety guarantee. Check current flow, trend, tree fall, weather, and open-water conditions before launch.",
    "latitude": 42.117303,
    "longitude": -86.468198,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "cold_water", "fast_rise", "access_uncertain"],
      "safetyNotes": [
        "Riverside Kayak Park and Graham Avenue are named public accesses; verify parking, hours, carry conditions, and closures before launching.",
        "The upstream nine-mile section is advanced/expert in local access guidance, with fallen trees and slide-overs; do not treat this as a beginner float.",
        "The six-foot Riverside gauge break is community planning guidance, not an agency-certified safety floor. Same-day visual inspection controls.",
        "The final reach approaches larger open water and the St. Joseph River; avoid the confluence and railroad-trestle area unless separately planned for motorized traffic and current conditions.",
        "No on-route camping is assumed; use designated campgrounds and stage a shuttle before launching."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04102500",
      "provider": "usgs",
      "siteId": "04102500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Paw Paw River at Riverside, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04102500/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04102500"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 6,
      "tooLow": 6,
      "thresholdSource": {"label": "Southwest Michigan Paddling Paw Paw River Riverside gauge guidance", "url": "https://sites.google.com/site/swmipaddling/st-joseph-river-watershed/paw-paw-river", "provider": "local"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Spring through fall is the practical window; storms, cold water, tree fall, and changing access require a same-day call.",
      "difficulty": "moderate",
      "difficultyNotes": "Advanced/expert upstream section with frequent wood and limited intermediate take-outs; competent paddlers only.",
      "confidenceNotes": "High confidence for the named endpoint pair and approximate reach: Michigan Water Trails and the Southwest Michigan paddle guide document Riverside Kayak Park, Graham Avenue, the 11-mile connection, and hazards; USGS 04102500 is a direct gauge; the six-foot threshold is community guidance, not a safety guarantee."
    },
    "putIn": {"id": "riverside-kayak-park", "name": "Riverside Kayak Park public dock and carry-in access", "latitude": 42.186122, "longitude": -86.373262},
    "takeOut": {"id": "graham-avenue-water-access", "name": "Graham Avenue public boat launch, Benton Harbor", "latitude": 42.117303, "longitude": -86.468198},
    "evidenceNotes": [
      {"label": "Exact route and endpoints", "value": "Riverside Kayak Park to Graham Avenue; approximately 11 river miles", "note": "Michigan Water Trails identifies Riverside as the put-in and Graham Avenue as the 11-mile take-out; the Southwest Michigan guide lists the same corridor.", "sourceUrl": "https://www.michiganwatertrails.org/location.asp?aid=5091&ait=av"},
      {"label": "Public access and coordinates", "value": "Riverside Kayak Park to Graham Avenue public access", "note": "Michigan Water Trails publishes GPS coordinates and access descriptions for both endpoints.", "sourceUrl": "https://www.michiganwatertrails.org/location.asp?aid=5115&ait=av"},
      {"label": "Live gauge and threshold", "value": "USGS 04102500; 6 ft community planning break", "note": "USGS provides direct gauge data and Southwest Michigan Paddling describes the six-foot Riverside break; neither is a safety guarantee.", "sourceUrl": "https://sites.google.com/site/swmipaddling/st-joseph-river-watershed/paw-paw-river"},
      {"label": "Safety and route character", "value": "Advanced/expert wood-obstacle reach with downstream open-water and motorized-traffic caveats", "note": "Michigan Water Trails and the Two Rivers Coalition paddle plan document tree fall, limited take-outs, shuttle needs, and the open-water finish.", "sourceUrl": "https://www.tworiverscoalition.org/downloads/paddleplanriverside_ps1.pdf"},
      {"label": "Camping and logistics", "value": "Day route with designated nearby campgrounds and mandatory shuttle planning", "note": "Use designated Paw Paw River campgrounds or lodging; no informal riverbank camping is assumed.", "sourceUrl": "https://www.michigan.org/property/paw-paw-river-campground-canoes"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04102500 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04102500", "provider": "usgs"},
      {"label": "Paw Paw River Water Trail", "url": "https://www.michiganwatertrails.org/trail.asp?ait=cv&cid=154", "provider": "local"},
      {"label": "Riverside Kayak Park access", "url": "https://www.michiganwatertrails.org/location.asp?aid=5115&ait=av", "provider": "local"},
      {"label": "Graham Avenue access", "url": "https://www.michiganwatertrails.org/location.asp?aid=5091&ait=av", "provider": "local"},
      {"label": "Paw Paw River paddle guide and gauge guidance", "url": "https://sites.google.com/site/swmipaddling/st-joseph-river-watershed/paw-paw-river", "provider": "local"},
      {"label": "Two Rivers Coalition paddle plan", "url": "https://www.tworiverscoalition.org/downloads/paddleplanriverside_ps1.pdf", "provider": "local"}
    ],
    "aliases": ["Paw Paw River Riverside to Graham Avenue", "Paw Paw River Water Trail Riverside Benton Harbor"]
  },
  {
    "id": "pere-marquette-river-custer-scottville",
    "riverId": "pere-marquette-river",
    "slug": "pere-marquette-river-custer-scottville",
    "name": "Pere Marquette River",
    "reach": "Custer Weir & Boat Launch to Scottville Riverside Park",
    "state": "Michigan",
    "region": "West Michigan",
    "summary": "An approximately 8-mile Pere Marquette River reach from the public Custer Weir launch to Scottville Riverside Park, with direct Scottville gauge telemetry and an established canoe-livery trip corridor.",
    "statusText": "Use direct USGS 04122500 at Scottville as a conservative discharge check. The official record's 411 cfs lower-quartile and 342 cfs minimum references are planning floors, not runnable guarantees; inspect current depth, wood, weather, cold water, and access before launching.",
    "latitude": 43.94523,
    "longitude": -86.282,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "cold_water", "fast_rise", "access_uncertain"],
      "safetyNotes": [
        "Custer Weir and Scottville Riverside Park are named public launches; verify parking, carry conditions, hours, and closures before staging the shuttle.",
        "The Pere Marquette is a cold, moving trout river with logs, rocks, changing current, and rapidly changing conditions after rain; wear a PFD and carry communication and rescue equipment.",
        "The 411 cfs lower-quartile and 342 cfs minimum references come from the direct USGS 04122500 daily statistics and are conservative planning aids, not a safe-passage certification.",
        "Scottville Riverside Park provides established camping; do not infer private-bank access or on-route camping outside named public facilities.",
        "Check current Michigan boating rules and any seasonal access or permit notices before launch."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04122500",
      "provider": "usgs",
      "siteId": "04122500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Pere Marquette River at Scottville, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04122500/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?agency_cd=USGS&legacy=1&site_no=04122500"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 411,
      "tooLow": 342,
      "thresholdSource": {"label": "USGS 04122500 daily discharge statistics", "url": "https://waterdata.usgs.gov/nwis/uv?agency_cd=USGS&legacy=1&site_no=04122500", "provider": "usgs"},
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Spring through fall is the practical window; cold water, storms, wood, and changing access require a same-day call.",
      "difficulty": "moderate",
      "difficultyNotes": "A moving-water reach suitable for competent canoeists and kayakers; current, cold water, logs, and changing river conditions make this more than a flatwater beginner float.",
      "confidenceNotes": "High confidence for the named endpoint pair and direct gauge: Michigan Water Trails, Outdoor Michigan, Scottville, River Run Canoe, and regional maps document the Custer-to-Scottville corridor and public access; USGS 04122500 is at Scottville with continuous telemetry and official daily statistics. Thresholds are conservative planning references, not safety certification."
    },
    "putIn": {"id": "custer-weir-boat-launch", "name": "Custer Weir & Boat Launch public access", "latitude": 43.93713, "longitude": -86.21868},
    "takeOut": {"id": "scottville-riverside-park-boat-launch", "name": "Scottville Riverside Park boat launch", "latitude": 43.94523, "longitude": -86.282},
    "evidenceNotes": [
      {"label": "Exact route and endpoints", "value": "Custer Weir & Boat Launch to Scottville Riverside Park; approximately 8 river miles", "note": "Regional Pere Marquette maps identify Custer Bridge and Scottville Bridge as an approximately 8-mile, 1.5-hour corridor; River Run offers an established Custer-to-Scottville trip.", "sourceUrl": "https://pureludington.com/wp-content/uploads/2024/03/LACVB_WebMap_PereMarquette.pdf"},
      {"label": "Public access and coordinates", "value": "Custer Weir public launches to Scottville Riverside Park launch", "note": "Michigan Water Trails and Outdoor Michigan publish the Custer launch coordinates; Outdoor Michigan and Scottville publish the Riverside Park launch location.", "sourceUrl": "https://www.michiganwatertrails.org/location.asp?aid=1206&ait=av"},
      {"label": "Live gauge and threshold", "value": "USGS 04122500; 411 cfs lower-quartile and 342 cfs minimum planning references", "note": "USGS supplies direct discharge telemetry and daily statistics at Scottville; neither reference is a runnable or safe-passage guarantee.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?agency_cd=USGS&legacy=1&site_no=04122500"},
      {"label": "Safety and river character", "value": "Cold, moving Pere Marquette water with logs, rocks, and rapid changes after rain", "note": "Regional paddling guides and the Wild and Scenic river sources describe the current, cold-water, wood, access, and permit considerations.", "sourceUrl": "https://www.fws.gov/rivers/river/pere-marquette"},
      {"label": "Camping and logistics", "value": "Scottville Riverside Park campground and livery shuttle context", "note": "Scottville Riverside Park provides modern and primitive camping; River Run offers transportation and a 2–3 hour Custer-to-Scottville trip context.", "sourceUrl": "https://www.cityofscottville.org/195/Riverside-Park"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04122500 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?agency_cd=USGS&legacy=1&site_no=04122500", "provider": "usgs"},
      {"label": "Custer Weir & Boat Launch", "url": "https://www.michiganwatertrails.org/location.asp?aid=1206&ait=av", "provider": "local"},
      {"label": "Custer Road boat launch coordinates", "url": "https://outdoormichigan.org/feature/5214", "provider": "local"},
      {"label": "Scottville Riverside Park", "url": "https://www.cityofscottville.org/195/Riverside-Park", "provider": "local"},
      {"label": "River Run Custer-to-Scottville trip", "url": "https://www.riverruncanoerental.com/information.php", "provider": "local"},
      {"label": "Pere Marquette regional map", "url": "https://pureludington.com/wp-content/uploads/2024/03/LACVB_WebMap_PereMarquette.pdf", "provider": "local"},
      {"label": "Pere Marquette river access and permit guidance", "url": "https://www.recreation.gov/permits/249987", "provider": "manual"}
    ],
    "aliases": ["Pere Marquette River Custer to Scottville", "Pere Marquette Custer Weir to Riverside Park"]
  },
  {
    "id": "pigeon-river-hemlock-crossing-sheldon-landing",
    "riverId": "pigeon-river-ottawa",
    "slug": "pigeon-river-hemlock-crossing-sheldon-landing",
    "name": "Pigeon River",
    "reach": "Hemlock Crossing County Park to Sheldon Landing",
    "state": "Michigan",
    "region": "West Michigan",
    "summary": "A documented lower Pigeon River corridor from the public Hemlock Crossing kayak launch through Pine Bend to Port Sheldon Township's Sheldon Landing.",
    "statusText": "Use direct USGS 04108862 at 120th Avenue as a conservative discharge check. Ottawa County watershed documentation reports a 2.85 cfs low monthly mean for the gauge period; treat 3 cfs as a planning floor, not a runnable or safe-passage guarantee. Check current flow, trend, weather, temperature, wood, and launch conditions before going.",
    "latitude": 42.90377,
    "longitude": -86.19734,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "cold_water", "fast_rise", "access_uncertain"],
      "safetyNotes": [
        "Hemlock Crossing and Sheldon Landing are named public access points; verify hours, parking, carry conditions, and closures before launching.",
        "The low-flow reference is derived from Ottawa County watershed reporting for USGS 04108862, not an agency paddling recommendation or safety guarantee.",
        "The river is a small, low-gradient coastal stream with rapidly changing flow after rain; scout wood, shallow sections, and blockages same day.",
        "Use only the named public endpoints and do not infer private-bank landings, camping, or portage rights.",
        "Cold water and thunderstorms require appropriate clothing, PFDs, and a conservative go/no-go decision."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04108862",
      "provider": "usgs",
      "siteId": "04108862",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Pigeon River at 120th Avenue near Olive Center, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04108862/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04108862"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 3,
      "tooLow": 2.85,
      "thresholdSource": {"label": "Ottawa County Pigeon River Watershed Management Plan low monthly mean at USGS 04108862", "url": "https://ottawacd.org/wp-content/uploads/2022/10/Final-PRWMP_-220815.pdf", "provider": "local"},
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Spring through fall is the practical window; the small watershed responds quickly to rainfall and cold water persists outside summer.",
      "difficulty": "easy",
      "difficultyNotes": "Short, low-gradient recreational corridor with potential shallow water, wood, and blockage hazards; competent paddlers should scout and carry as needed.",
      "confidenceNotes": "High confidence for the distinct public endpoint pair and live gauge: Ottawa County documentation describes paddling between Hemlock Crossing and Sheldon Landing, township and county sources identify public access, and USGS 04108862 directly measures the upper corridor. The 3 cfs planning floor is a conservative hydrologic reference, not a safety guarantee."
    },
    "putIn": {"id": "hemlock-crossing-kayak-launch", "name": "Hemlock Crossing County Park public kayak/canoe launch", "latitude": 42.91593, "longitude": -86.14705},
    "takeOut": {"id": "sheldon-landing-pigeon-river", "name": "Sheldon Landing public boat launches, Crab Drive", "latitude": 42.90377, "longitude": -86.19734},
    "evidenceNotes": [
      {"label": "Exact route and endpoints", "value": "Hemlock Crossing to Sheldon Landing via Pine Bend; established lower Pigeon River paddle corridor", "note": "Ottawa County recreation documentation describes paddlers using the Hemlock Crossing launch and Sheldon Landing downstream access; county activity listings describe the guided corridor.", "sourceUrl": "https://app.miottawa.org/CalendarDocs/2015/1428679705903-packet.PDF"},
      {"label": "Public access and coordinates", "value": "Hemlock Crossing kayak launch to Sheldon Landing public boat launches", "note": "Ottawa County identifies the Hemlock launch; Outdoor Michigan publishes coordinates for the carry-in launch and Sheldon Shores launch, while Port Sheldon Township identifies the public Crab Drive landing.", "sourceUrl": "https://www.portsheldontwp.org/parks-recreation/"},
      {"label": "Live gauge and threshold", "value": "USGS 04108862; 3 cfs conservative planning floor", "note": "USGS supplies direct discharge telemetry. The Ottawa County watershed plan reports a 2.85 cfs low monthly mean for the gauge period; this is a hydrologic planning reference, not a paddling or safety certification.", "sourceUrl": "https://ottawacd.org/wp-content/uploads/2022/10/Final-PRWMP_-220815.pdf"},
      {"label": "Safety and river character", "value": "Small low-gradient coastal stream with shallow water, wood, cold water, and rapid rain response", "note": "Ottawa County watershed documentation describes rapid fluctuation and lower-river recreational use; same-day inspection controls.", "sourceUrl": "https://ottawacd.org/wp-content/uploads/2022/10/Final-PRWMP_-220815.pdf"},
      {"label": "Camping and logistics", "value": "Day route with shuttle between named public parks; no on-route camping assumed", "note": "Hemlock Crossing and Sheldon Landing are public endpoints; stage the take-out and use designated nearby camping or lodging rather than informal riverbank sites.", "sourceUrl": "https://miottawa.org/park-locations/hemlock-crossing/"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04108862 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04108862", "provider": "usgs"},
      {"label": "USGS 04108862 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04108862/", "provider": "usgs"},
      {"label": "Hemlock Crossing County Park", "url": "https://miottawa.org/park-locations/hemlock-crossing/", "provider": "local"},
      {"label": "Sheldon Landing public access", "url": "https://www.portsheldontwp.org/parks-recreation/", "provider": "local"},
      {"label": "Hemlock and Sheldon access coordinates", "url": "https://outdoormichigan.org/feature/13898", "provider": "local"},
      {"label": "Pigeon River Watershed Management Plan", "url": "https://ottawacd.org/wp-content/uploads/2022/10/Final-PRWMP_-220815.pdf", "provider": "local"},
      {"label": "Ottawa County guided Pigeon River paddle", "url": "https://app.miottawa.org/Calendar/viewDoc.do?docId=2024%2F1723832752028-packet.PDF", "provider": "local"}
    ],
    "aliases": ["Pigeon River Hemlock Crossing to Sheldon Landing", "Pigeon River West Olive paddle"]
  },
  {
    "id": "platte-river-honor-upper",
    "slug": "platte-river-honor-upper",
    "name": "Platte River",
    "reach": "Platte River State Forest Campground to Platte River Park",
    "state": "Michigan",
    "region": "Northern Lower Michigan",
    "summary": "A public upper-Platte moving-water reach from the state forest campground near US-31 to the completed Platte River Park launch at Indian Hill Road in Honor.",
    "statusText": "Use USGS 04126740 at Honor as the live check. Treat 90 cfs as a conservative historical low-water screen; shallow sections, boulders, deadfall, and changing conditions still control the launch decision.",
    "latitude": 44.64546752,
    "longitude": -85.978332,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "fast_rise", "cold_water"],
      "safetyNotes": [
        "Michigan River Paddling describes this reach as suitable for advanced beginners but warns of boulders and deadfall; inspect the river and use a properly fitted PFD.",
        "The USGS 04126740 90 cfs reference is a conservative historical low-water screen, not a safety certification or ideal range. Skip when rising water, wood, weather, or visual conditions are unsuitable.",
        "Use only the named state campground and Platte River Park endpoints. Confirm Recreation Passport, parking, hours, seasonal closures, and launch conditions before loading boats."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04126740",
      "provider": "usgs",
      "siteId": "04126740",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Platte River at Honor, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04126740/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04126740"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 90,
      "tooLow": 90,
      "thresholdSource": {"label": "USGS Platte River at Honor daily statistics", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04126740", "provider": "usgs"},
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Spring through fall is the practical window; the river can become shallow in dry periods and rise quickly after rain.",
      "difficulty": "easy",
      "difficultyNotes": "Advanced-beginner moving water with light rapids, shallow sections, boulders, and occasional deadfall; use a shuttle and do not assume intermediate exits.",
      "confidenceNotes": "High confidence for the endpoint and gauge relationship: Michigan DNR confirms the state forest campground has river access and camping, Homestead Township and Outdoor Michigan document the Platte River Park kayak launch, and USGS 04126740 is at Honor immediately beside the park. The 90 cfs threshold is explicitly a conservative historical low-water screen derived from USGS statistics, not a paddling guarantee."
    },
    "putIn": {"id": "platte-river-state-forest-campground", "name": "Platte River State Forest Campground river access", "latitude": 44.64546752, "longitude": -85.978332},
    "takeOut": {"id": "platte-river-park-honor", "name": "Platte River Park kayak launch at Indian Hill Road", "latitude": 44.67075, "longitude": -86.03713},
    "evidenceNotes": [
      {"label": "Route definition", "value": "Platte River State Forest Campground to Platte River Park", "note": "Michigan River Paddling documents the upper Honor reach and identifies the state campground put-in and Indian Hill Road park take-out.", "sourceUrl": "https://michiganriverpaddling.com/2023/06/18/upper-platte-river-honor-perfection/"},
      {"label": "Public put-in and camping", "value": "Platte River State Forest Campground, 44.64546752, -85.978332", "note": "Michigan DNR confirms river access, paddling, rustic camping, and Recreation Passport requirements.", "sourceUrl": "https://www.michigan.gov/recsearch/sfcampgroundsn-z/PlatteRiver"},
      {"label": "Public take-out and coordinates", "value": "Platte River Park kayak launch, 44.67075, -86.03713", "note": "Outdoor Michigan documents the carry-in launch and Homestead/HARP documents the completed kayak launch and public park opening.", "sourceUrl": "https://www.outdoormichigan.org/feature/15086"},
      {"label": "Live gauge and threshold", "value": "USGS 04126740; 90 cfs conservative historical low-water screen", "note": "USGS provides direct telemetry and daily statistics. The 90 cfs floor is a planning screen based on the historical minimum shown in the station statistics, not a safety certification.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04126740"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04126740 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04126740", "provider": "usgs"},
      {"label": "Michigan DNR Platte River State Forest Campground", "url": "https://www.michigan.gov/recsearch/sfcampgroundsn-z/PlatteRiver", "provider": "local"},
      {"label": "Upper Platte River paddling guide", "url": "https://michiganriverpaddling.com/2023/06/18/upper-platte-river-honor-perfection/", "provider": "local"},
      {"label": "Platte River Park launch", "url": "https://www.outdoormichigan.org/feature/15086", "provider": "local"},
      {"label": "Platte River Park opening", "url": "https://www.restorehonormi.org/post/platte-river-park-grand-opening", "provider": "local"}
    ],
    "aliases": ["Upper Platte River Honor to Platte River Park", "Platte River State Forest Campground to Indian Hill"]
  },
  {
    "id": "portage-river-north-fisher-three-rivers",
    "riverId": "portage-river-three-rivers",
    "slug": "portage-river-north-fisher-three-rivers",
    "name": "Portage River",
    "reach": "North Fisher Lake Road to Conservation Park",
    "state": "Michigan",
    "region": "Southwest Michigan",
    "summary": "A documented Portage River corridor from the North Fisher Lake Road roadside launch through the Three Rivers reach to the public Conservation Park boat ramp.",
    "statusText": "Use USGS 04097345 at Fifth Avenue near the Three Rivers take-out as the live check. Treat 50 cfs as a conservative minimum-only historical screen from the station's short record; shallow water, wood, the dam portage, and changing conditions still control the launch decision.",
    "latitude": 42.0082036,
    "longitude": -85.5672093,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "fast_rise", "cold_water", "dam"],
      "safetyNotes": [
        "The North Fisher Lake Road guide describes a small roadside launch, shallow 1–3 ft water, fallen trees, and a dam requiring a portage; scout before committing.",
        "USGS 04097345 provides direct discharge telemetry near the Three Rivers take-out. The 50 cfs reference is a conservative historical screen from a short record, not an agency paddling threshold or safety guarantee.",
        "Conservation Park is a named public boat launch; confirm hours, parking, carry conditions, dam-portage conditions, and current closures before launch.",
        "Use only the named public endpoints and do not infer private-bank landings or camping along the corridor."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04097345",
      "provider": "usgs",
      "siteId": "04097345",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Portage River at Fifth Avenue at Three Rivers, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04097345/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04097345"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 50,
      "tooLow": 50,
      "thresholdSource": {"label": "USGS 04097345 short-record daily discharge statistics", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04097345", "provider": "usgs"},
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Spring through fall is the practical window; the small watershed responds quickly to rain and may become shallow in dry periods.",
      "difficulty": "moderate",
      "difficultyNotes": "Beginner-accessible in character but includes shallow sections, fallen trees, a dam portage, and limited intermediate exits; use a shuttle and scout.",
      "confidenceNotes": "High confidence for the named endpoint corridor and direct gauge relationship: the paddling guide documents North Fisher Lake Road to Three Rivers, the city identifies Conservation Park's public boat launch, and USGS 04097345 directly measures the downstream Three Rivers reach. The 50 cfs value is explicitly a conservative minimum-only screen from a short station record, not a safety certification."
    },
    "putIn": {"id": "portage-river-north-fisher-lake-road", "name": "North Fisher Lake Road roadside launch", "latitude": 42.0082036, "longitude": -85.5672093},
    "takeOut": {"id": "conservation-park-portage-river", "name": "Conservation Park public boat launch, Three Rivers", "latitude": 41.94153, "longitude": -85.63167},
    "evidenceNotes": [
      {"label": "Route definition", "value": "North Fisher Lake Road to Conservation Park in Three Rivers", "note": "Southwest Michigan Kayaking documents this exact corridor and identifies the North Fisher Lake Road start, dam portage, and Conservation Park take-out.", "sourceUrl": "https://kayakswmich.com/2020/05/02/portage-river-north-fisher-lake-road-to-three-rivers-st-joseph-county/"},
      {"label": "Public endpoints and coordinates", "value": "North Fisher Lake Road roadside launch to Conservation Park public boat ramp", "note": "The guide identifies the roadside launch; OpenStreetMap bridge coordinates locate the North Fisher Lake Road crossing, and the City of Three Rivers confirms the Conservation Park boat launch.", "sourceUrl": "https://www.threeriversmi.org/city-departments/parks/conservation-park/"},
      {"label": "Live gauge and threshold", "value": "USGS 04097345; 50 cfs conservative minimum-only screen", "note": "USGS provides direct discharge telemetry at Fifth Avenue near the lower endpoint. The 50 cfs screen is derived conservatively from the station's short-record low-flow statistics and is not a paddling or safety guarantee.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04097345"},
      {"label": "Safety and river character", "value": "Shallow 1–3 ft river with wood, channels, and a dam portage", "note": "The route guide describes fallen trees, shallow water, a dam portage, and moderate current below the dam; same-day scouting controls.", "sourceUrl": "https://kayakswmich.com/2020/05/02/portage-river-north-fisher-lake-road-to-three-rivers-st-joseph-county/"},
      {"label": "Camping and logistics", "value": "Day route with shuttle; no on-route camping assumed", "note": "Stage Conservation Park before launching and use designated nearby lodging or campgrounds rather than informal riverbank sites.", "sourceUrl": "https://www.threeriversmi.org/city-departments/parks/conservation-park/"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04097345 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04097345", "provider": "usgs"},
      {"label": "Portage River route guide", "url": "https://kayakswmich.com/2020/05/02/portage-river-north-fisher-lake-road-to-three-rivers-st-joseph-county/", "provider": "local"},
      {"label": "Three Rivers Conservation Park", "url": "https://www.threeriversmi.org/city-departments/parks/conservation-park/", "provider": "local"},
      {"label": "Portage River Heritage Water Trail", "url": "https://outdoormichigan.org/feature/4903", "provider": "local"},
      {"label": "Michigan paddling safety", "url": "https://www.michigan.gov/dnr/things-to-do/paddling", "provider": "local"}
    ],
    "aliases": ["Portage River North Fisher Lake Road to Three Rivers", "Portage River Three Rivers Conservation Park"]
  },
  {
    "id": "prairie-river-prairie-lake-nottawa",
    "riverId": "prairie-river-nottawa",
    "slug": "prairie-river-prairie-lake-nottawa",
    "name": "Prairie River",
    "reach": "Prairie River Lake Public Access to Nottawa Park",
    "state": "Michigan",
    "region": "Southwest Michigan",
    "summary": "A county-documented Prairie River trip from the Prairie River Lake public access through the lower Prairie River corridor to Nottawa Park and Sand Lake.",
    "statusText": "Use USGS 04097540 near Nottawa as the direct live check. Treat 40 cfs as a conservative minimum-only screen based on the long-term lower-quartile statistics; tree fall, shallow water, Lake Templene, and the dam portage still control the go/no-go decision.",
    "latitude": 41.85472,
    "longitude": -85.41319,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "fast_rise", "cold_water", "dam"],
      "safetyNotes": [
        "St. Joseph County's current Prairie River Trip 1 planner describes a roughly four-hour trip from the Prairie River Lake public access, with Hackman and Findley Road options and an exit before Lake Templene.",
        "The route has tree-fall potential, shallow sections, open-lake exposure, and a dam portage if continuing beyond Lake Templene; inspect and use the documented exit.",
        "USGS 04097540 is a direct long-term discharge gauge near Nottawa. The 40 cfs screen is a conservative planning reference, not an agency paddling threshold or safety guarantee.",
        "Use only the named public access points and do not infer private-bank exits or camping."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04097540",
      "provider": "usgs",
      "siteId": "04097540",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Prairie River near Nottawa, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/04097540/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04097540"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 40,
      "tooLow": 40,
      "thresholdSource": {"label": "USGS 04097540 long-term daily discharge statistics", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04097540", "provider": "usgs"},
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Spring through fall is the practical window; the small river responds to rain and low summer flows can expose shallow sections.",
      "difficulty": "easy",
      "difficultyNotes": "Documented recreational day trip with public access, but shallow water, tree fall, open lake, and the Lake Templene dam/portage require scouting and route discipline.",
      "confidenceNotes": "High confidence for the documented Prairie River Lake-to-Nottawa corridor and direct gauge: St. Joseph County's current trip planner names the endpoint sequence and timing, Sand Lake County Park confirms the Prairie River finish context, and USGS 04097540 directly measures the lower Nottawa reach. The 40 cfs value is a conservative long-term low-flow screen, not a safety certification."
    },
    "putIn": {"id": "prairie-river-lake-public-access", "name": "Prairie River Lake public access", "latitude": 41.85472, "longitude": -85.41319},
    "takeOut": {"id": "nottawa-park-sand-lake", "name": "Nottawa Park / Sand Lake public destination", "latitude": 41.930012, "longitude": -85.528578},
    "evidenceNotes": [
      {"label": "Route definition", "value": "Prairie River Lake public access to Nottawa Park via the Prairie River", "note": "St. Joseph County's current Prairie River Trip 1 planner describes the four-hour route, shortened Hackman option, Findley Road exit, and the Nottawa Park finish before the Lake Templene dam.", "sourceUrl": "https://stjosephcountymi.gov/wp-content/uploads/2026/05/1082_638005644186230000.pdf"},
      {"label": "Public endpoints and coordinates", "value": "Prairie River Lake public access to Nottawa Park / Sand Lake", "note": "Mapcarta and Outdoor Michigan identify the Prairie River Lake and Prairie River public access features; the county trip planner identifies Nottawa Park as the finish context.", "sourceUrl": "https://outdoormichigan.org/feature/4800"},
      {"label": "Live gauge and threshold", "value": "USGS 04097540; 40 cfs conservative minimum-only screen", "note": "USGS provides direct discharge telemetry and 63 years of statistics near Nottawa. The 40 cfs floor is a conservative planning screen derived from the long-term 25th percentile, not a paddling or safety guarantee.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04097540"},
      {"label": "Safety and river character", "value": "Small meandering river with tree fall, shallow sections, open lake, and a dam portage beyond Lake Templene", "note": "The county planner and Southwest Michigan Paddling guide identify the access sequence, lake exit, and tree-fall/shallow-water character; use the documented exit before the dam.", "sourceUrl": "https://stjosephcountymi.gov/wp-content/uploads/2026/05/1082_638005644186230000.pdf"},
      {"label": "Camping and logistics", "value": "Day route with county park finish and nearby camping/lodging options", "note": "Nottawa Park/Sand Lake provides a public finish context; use designated nearby campgrounds or lodging and arrange a shuttle with the county's suggested local outfitter.", "sourceUrl": "https://stjosephcountymi.gov/government/parks-recreation/our-parks/sand-lake-county-park/"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04097540 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04097540", "provider": "usgs"},
      {"label": "St. Joseph County Prairie River Trip 1", "url": "https://stjosephcountymi.gov/wp-content/uploads/2026/05/1082_638005644186230000.pdf", "provider": "local"},
      {"label": "Sand Lake County Park", "url": "https://stjosephcountymi.gov/government/parks-recreation/our-parks/sand-lake-county-park/", "provider": "local"},
      {"label": "Prairie River public access features", "url": "https://outdoormichigan.org/feature/4800", "provider": "local"},
      {"label": "Prairie River paddling overview", "url": "https://sites.google.com/site/swmipaddling/st-joseph-river-watershed/prairie-river", "provider": "local"}
    ],
    "aliases": ["Prairie River Lake to Nottawa Park", "Prairie River Trip 1", "Prairie River Nottawa paddle"]
  },
  {
    "id": "red-cedar-river-roadside-msu",
    "riverId": "red-cedar-river-east-lansing",
    "slug": "red-cedar-river-roadside-msu",
    "name": "Red Cedar River",
    "reach": "Red Cedar Roadside Park to MSU Canoe & Kayak Launch",
    "state": "Michigan",
    "region": "Mid-Michigan",
    "summary": "A water-trail-supported Red Cedar River reach from the public Red Cedar Roadside Park launch through Okemos to the seasonal MSU canoe and kayak launch near Jenison Field House.",
    "statusText": "Use USGS 04112500 at the Farm Lane Bridge near the MSU take-out as the live check. Treat 30 cfs as a conservative minimum-only historical low-water screen; urban current, wood, bridges, and seasonal launch conditions still control the go/no-go decision.",
    "latitude": 42.709861,
    "longitude": -84.364028,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "fast_rise", "cold_water", "urban_water_quality"],
      "safetyNotes": [
        "The Red Cedar River Water Trail identifies Red Cedar Roadside Park as an easy public launch and the MSU Canoe & Kayak Launch as a seasonal downstream access.",
        "USGS 04112500 is at Farm Lane Bridge near the MSU end. The 30 cfs reference is a conservative historical low-water screen, not an agency paddling threshold or safety guarantee.",
        "Expect urban bridges, changing wood, current around bends, and seasonal access/parking rules; inspect conditions and confirm the MSU launch is open before launching.",
        "Use only the named public endpoints and do not infer private-bank exits or informal camping."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04112500",
      "provider": "usgs",
      "siteId": "04112500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Red Cedar River at East Lansing, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04112500/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04112500"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 30,
      "tooLow": 30,
      "thresholdSource": {"label": "USGS 04112500 long-term daily discharge statistics", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04112500", "provider": "usgs"},
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Spring through fall is the practical window; low summer flows can expose shallow sections while storms raise urban current quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "Established water-trail corridor with public launches, but urban bridges, wood, current changes, and seasonal MSU access require competent planning.",
      "confidenceNotes": "High confidence for the distinct public endpoint pair and gauge relationship: the Red Cedar River Water Trail identifies both launches and the route's recreational purpose, while USGS 04112500 is at Farm Lane Bridge near the MSU take-out. The 30 cfs value is a conservative historical low-water screen, not a safety certification."
    },
    "putIn": {"id": "red-cedar-roadside-park", "name": "Red Cedar Roadside Park public launch", "latitude": 42.709861, "longitude": -84.364028},
    "takeOut": {"id": "msu-red-cedar-launch", "name": "MSU Canoe & Kayak Launch near Jenison Field House", "latitude": 42.730833, "longitude": -84.491694},
    "evidenceNotes": [
      {"label": "Route definition", "value": "Red Cedar Roadside Park to MSU Canoe & Kayak Launch", "note": "The Red Cedar River Water Trail presents these named waypoints and describes the river as a developing canoe/kayak recreational destination.", "sourceUrl": "https://www.redcedarriver.org/"},
      {"label": "Public endpoints and coordinates", "value": "Red Cedar Roadside Park to seasonal MSU launch", "note": "The water-trail page publishes coordinates for Red Cedar Roadside Park and the MSU launch, including the seasonal access note.", "sourceUrl": "https://www.redcedarriver.org/"},
      {"label": "Live gauge and threshold", "value": "USGS 04112500; 30 cfs conservative minimum-only screen", "note": "USGS provides direct discharge telemetry at Farm Lane Bridge near the downstream endpoint and long-term daily statistics. The 30 cfs floor is a planning screen, not a paddling or safety guarantee.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04112500"},
      {"label": "Safety and river character", "value": "Urban/suburban water trail with bridges, wood, variable current, and seasonal launch conditions", "note": "The water-trail landings and MSU seasonal launch support the corridor; same-day checks control around bridges, wood, weather, and any posted urban or campus restrictions.", "sourceUrl": "https://www.redcedarriver.org/"},
      {"label": "Camping and logistics", "value": "Day route with shuttle between named public launches; no on-route camping assumed", "note": "Arrange a shuttle and use designated nearby lodging or campgrounds; do not camp on campus, park, or private river frontage.", "sourceUrl": "https://www.redcedarriver.org/"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04112500 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04112500", "provider": "usgs"},
      {"label": "Red Cedar River Water Trail", "url": "https://www.redcedarriver.org/", "provider": "local"},
      {"label": "USGS station information", "url": "https://water.usgs.gov/nwc/NWC/sw/man/S04112500.html", "provider": "usgs"},
      {"label": "Michigan paddling safety", "url": "https://www.michigan.gov/dnr/things-to-do/paddling", "provider": "local"}
    ],
    "aliases": ["Red Cedar River Roadside Park to MSU", "Red Cedar River East Lansing water trail", "Red Cedar River Okemos to MSU"]
  },
  {
    "id": "red-cedar-river-mccormick-roadside",
    "riverId": "red-cedar-river-williamston",
    "slug": "red-cedar-river-mccormick-roadside",
    "name": "Red Cedar River",
    "reach": "McCormick Park Launch to Red Cedar Roadside Park",
    "state": "Michigan",
    "region": "Mid-Michigan",
    "summary": "A water-trail-supported Red Cedar River reach from Williamston's public McCormick Park launch to the Red Cedar Roadside Park take-out west of town.",
    "statusText": "Use USGS 04111379 near Williamston as the live check. Treat 18 cfs as a conservative minimum-only historical low-water screen; the upstream rapids are not suitable for beginning paddlers and must be scouted or portaged.",
    "latitude": 42.69091,
    "longitude": -84.28044,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "fast_rise", "cold_water", "access_uncertain"],
      "safetyNotes": [
        "The Red Cedar River Water Trail identifies McCormick Park as a public launch above the Williamston rapids and Red Cedar Roadside Park as a public carry-in take-out.",
        "The water-trail source says the rapids downstream from McCormick are not suitable for beginning paddlers; experienced paddlers must scout, portage, or choose the below-rapids Williamston launch instead.",
        "USGS 04111379 near Williamston provides direct discharge telemetry. The 18 cfs reference is a conservative historical low-water screen, not an agency paddling threshold or safety guarantee.",
        "Use only the named public endpoints, respect posted access rules, and do not infer private-bank exits or informal camping."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04111379",
      "provider": "usgs",
      "siteId": "04111379",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Red Cedar River near Williamston, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/04111379/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04111379"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 18,
      "tooLow": 18,
      "thresholdSource": {"label": "USGS 04111379 long-term daily discharge statistics", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04111379", "provider": "usgs"},
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Spring through fall is the practical window; the small watershed responds quickly to rain and storms can change the rapids and current rapidly.",
      "difficulty": "hard",
      "difficultyNotes": "Public water-trail corridor with a short, documented reach, but the upstream Williamston rapids make this unsuitable for beginning paddlers unless portaged or bypassed.",
      "confidenceNotes": "High confidence for the named public endpoint corridor and direct gauge relationship: the Red Cedar River Water Trail documents McCormick Park, the rapids warning, and Red Cedar Roadside Park, while USGS 04111379 directly measures the Williamston reach. The 18 cfs value is a conservative historical low-water screen, not a safety certification."
    },
    "putIn": {"id": "red-cedar-mccormick-park", "name": "McCormick Park public canoe/kayak launch, Williamston", "latitude": 42.69091, "longitude": -84.28044},
    "takeOut": {"id": "red-cedar-roadside-park", "name": "Red Cedar Roadside Park river access", "latitude": 42.709861, "longitude": -84.364028},
    "evidenceNotes": [
      {"label": "Route definition", "value": "McCormick Park Launch to Red Cedar Roadside Park", "note": "The Red Cedar River Water Trail documents the Williamston launch, the six-mile downstream connection to the MDOT/Red Cedar Roadside Park, and the rapids warning for novice paddlers.", "sourceUrl": "https://www.redcedarriver.org/williamston"},
      {"label": "Public endpoints and coordinates", "value": "McCormick Park public launch to Red Cedar Roadside Park public river access", "note": "Outdoor Michigan publishes the McCormick Park launch coordinate; the water-trail page publishes the Roadside Park coordinate and describes both public accesses.", "sourceUrl": "https://www.redcedarriver.org/roadsidepark"},
      {"label": "Live gauge and threshold", "value": "USGS 04111379; 18 cfs conservative minimum-only screen", "note": "USGS provides direct discharge telemetry and 39 water years of daily statistics near Williamston. The 18 cfs floor is a planning screen from the station's 25th percentile, not a paddling or safety guarantee.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04111379"},
      {"label": "Safety and river character", "value": "Short water-trail reach with upstream Williamston rapids and changing wood/current", "note": "The water-trail source explicitly warns that the rapids below McCormick are not suitable for beginning paddlers; scout, portage, or use the below-rapids landing instead.", "sourceUrl": "https://www.redcedarriver.org/williamston"},
      {"label": "Camping and logistics", "value": "Day route with shuttle; no on-route camping assumed", "note": "Stage the Roadside Park take-out before launching and use designated nearby lodging or campgrounds; do not camp on park or private river frontage.", "sourceUrl": "https://www.redcedarriver.org/roadsidepark"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04111379 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04111379", "provider": "usgs"},
      {"label": "Red Cedar River Water Trail Williamston access", "url": "https://www.redcedarriver.org/williamston", "provider": "local"},
      {"label": "Red Cedar Roadside Park", "url": "https://www.redcedarriver.org/roadsidepark", "provider": "local"},
      {"label": "McCormick Park launch", "url": "https://outdoormichigan.org/feature/8242", "provider": "local"},
      {"label": "Michigan paddling safety", "url": "https://www.michigan.gov/dnr/things-to-do/paddling", "provider": "local"}
    ],
    "aliases": ["Red Cedar River McCormick Park to Roadside Park", "Red Cedar River Williamston to Roadside Park"]
  },
  {
    "id": "mill-creek-dexter-park-and-play",
    "riverId": "mill-creek",
    "slug": "mill-creek-dexter-park-and-play",
    "name": "Mill Creek",
    "reach": "Mill Creek Park North to Mill Creek Park South, Dexter",
    "state": "Michigan",
    "region": "Southeast Michigan",
    "summary": "A short public park-and-play reach at Dexter's Main Street bridge, using the public Mill Creek Park North and South access points documented by the Mill Creek access guide. The creek continues to the Huron River, but this route stops at the named park endpoints and does not assume private-bank access downstream.",
    "statusText": "Check direct USGS 04173500 discharge before launching. American Whitewater reports a gauge-linked 23 cfs minimum reference for the Dexter park-and-play; treat it as community planning guidance, not a safety guarantee. The reach includes shallow boulder/rock features, a low bridge, current, and possible wood/log jams; scout and match the route to your skill.",
    "latitude": 42.3398474,
    "longitude": -83.8897365,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["whitewater", "low_water", "strainers", "cold_water", "access_uncertain"],
      "safetyNotes": [
        "Mill Creek Park North and South are public access points; confirm parking, hours, carry distance, and launch conditions before loading boats.",
        "The American Whitewater-described Dexter park-and-play includes four rock weirs, a boulder field, and a low bridge; scout the line and portage when conditions or skill require it.",
        "The 23 cfs reference is community guidance tied to the Dexter gauge, not an agency-certified go/no-go rule. Same-day visual inspection, trend, weather, and water temperature control.",
        "The Mill Creek access guide reports wood structure, log-jam potential, shallow sections, and restricted access windows at some upstream sites; do not use private or school access outside posted rules.",
        "Wear a properly fitted PFD, carry communication and rescue equipment, and do not launch during flood warnings, severe weather, or rapidly rising water.",
        "No informal riverbank camping is assumed; use designated lodging or campgrounds and respect the guide's public-access boundary."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04173500",
      "provider": "usgs",
      "siteId": "04173500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Mill Creek near Dexter, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04173500/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04173500"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 23,
      "tooLow": 23,
      "thresholdSource": {"label": "American Whitewater Mill Creek Dexter runnable reference", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/6820/main", "provider": "american_whitewater"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Spring through fall is the practical window; storms, low water, cold water, wood, and changing current can alter the line quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "Short Class II park-and-play moving water with shallow boulder features and a low bridge; appropriate only for paddlers who can scout, maneuver, and self-rescue in moving water.",
      "confidenceNotes": "High confidence for the public park access and short Dexter corridor: the Mill Creek access guide documents the public three-mile section and Mill Creek Park North/South access points, the Huron River Water Trail documents Dexter paddling context, USGS 04173500 is a direct discharge station, and American Whitewater supplies a gauge-linked 23 cfs community reference."
    },
    "putIn": {"id": "mill-creek-park-north", "name": "Mill Creek Park North public kayak launch, Dexter", "latitude": 42.3398474, "longitude": -83.8897365},
    "takeOut": {"id": "mill-creek-park-south", "name": "Mill Creek Park South public access, Dexter", "latitude": 42.3376, "longitude": -83.8914},
    "evidenceNotes": [
      {"label": "Exact route", "value": "Mill Creek Park North to Mill Creek Park South; short park-and-play reach at Main Street", "note": "The Mill Creek access guide documents the public park access points and the Main Street bridge/rapids section; American Whitewater describes the short park-and-play reach.", "sourceUrl": "https://www.annarbortu.org/uploads/7/6/9/4/76947953/aa_trout_unlimited_-_mill_creek_access_points_-_2024_-_111824.pdf"},
      {"label": "Public endpoints and coordinates", "value": "Mill Creek Park North kayak launch to Mill Creek Park South public access, Dexter", "note": "The access guide identifies both public parks; coordinates are defensible OSM park centroids for the named access areas and should be checked against the launch signage on arrival.", "sourceUrl": "https://www.openstreetmap.org/search?query=Mill%20Creek%20Park%20North%20Dexter%20MI"},
      {"label": "Live gauge and threshold", "value": "USGS 04173500; 23 cfs community minimum-only reference", "note": "USGS supplies direct discharge telemetry near Dexter; American Whitewater supplies the gauge-linked community reference and marks conditions below it as below recommended.", "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/6820/main"},
      {"label": "Safety and route character", "value": "Short Class II park-and-play with four rock weirs, boulder field, low bridge, shallow water, and possible wood/log hazards", "note": "American Whitewater and the Mill Creek access guide document the rapids, boulder field, low bridge, wood structure, and access restrictions; scout before committing.", "sourceUrl": "https://www.annarbortu.org/uploads/7/6/9/4/76947953/aa_trout_unlimited_-_mill_creek_access_points_-_2024_-_111824.pdf"},
      {"label": "Camping and logistics", "value": "Day-use park-and-play; no on-route camping assumed", "note": "Use the named park parking and designated nearby lodging or campgrounds; stage the take-out and respect the guide's public-access boundary.", "sourceUrl": "https://huronriverwatertrail.org/trail-towns/dexter/"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04173500 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04173500", "provider": "usgs"},
      {"label": "Mill Creek public access guide", "url": "https://www.annarbortu.org/uploads/7/6/9/4/76947953/aa_trout_unlimited_-_mill_creek_access_points_-_2024_-_111824.pdf", "provider": "local"},
      {"label": "Huron River Water Trail Dexter", "url": "https://huronriverwatertrail.org/trail-towns/dexter/", "provider": "local"},
      {"label": "American Whitewater Dexter reach", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/6820/main", "provider": "american_whitewater"},
      {"label": "Dexter Mill Creek Park master plan", "url": "https://files.dextermi.gov/Departments_Services/Parks_and_Trails/mill_creek_master_plan.pdf", "provider": "local"},
      {"label": "Michigan paddling safety", "url": "https://www.michigan.gov/dnr/things-to-do/paddling", "provider": "local"}
    ],
    "aliases": ["Mill Creek Dexter Park and Play", "Mill Creek Park North to South"]
  },
  {
    "id": "sturgeon-river-trowbridge-haakwood",
    "riverId": "sturgeon-river",
    "slug": "sturgeon-river-trowbridge-haakwood",
    "name": "Sturgeon River",
    "reach": "Trowbridge Road Access to Haakwood State Forest Campground",
    "state": "Michigan",
    "region": "Northern Lower Peninsula",
    "summary": "An approximately 8-mile Sturgeon River reach from the official Trowbridge Road access near Wolverine to the public Haakwood State Forest Campground carry-in access. The direct USGS 04127997 gauge is at Wolverine; a conservative community runnable estimate is 120–700 cfs.",
    "statusText": "Check direct USGS 04127997 discharge before launching. CanWePaddle estimates 120–700 cfs for the Wolverine Run; treat that range as conservative community planning guidance, not a safety guarantee. This is swift Class I–II water with sweepers, chutes, continuous riffles, and standing waves; scout current conditions and match the route to your skill.",
    "latitude": 45.300621,
    "longitude": -84.613474,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["whitewater", "strainers", "cold_water", "fast_rise", "access_uncertain"],
      "safetyNotes": [
        "Trowbridge Road access is an official Michigan DNR roadside access with a path from the southwest side of the bridge; confirm parking and carry conditions before launching.",
        "Haakwood State Forest Campground has public carry-in access and a short footpath to the river; a Recreation Passport is required for vehicle entry and campground access.",
        "The 120–700 cfs range is a CanWePaddle community estimate for the gauge-linked Wolverine Run, not an agency-certified floor or guarantee of safe passage. Same-day visual inspection controls.",
        "The outfitter describes swift current, chutes, continuous riffles, overhanging trees, and standing waves up to 2–2.5 feet in normal water; this reach is not for first-time moving-water paddlers.",
        "Wear a properly fitted PFD, carry communication and rescue equipment, and do not launch during flood warnings, severe weather, or rapidly rising water.",
        "No informal riverbank camping is assumed; use the named state forest campground or designated lodging and respect private frontage."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-04127997",
      "provider": "usgs",
      "siteId": "04127997",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Sturgeon River at Wolverine, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/04127997/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?site_no=04127997"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 120,
      "idealMax": 700,
      "tooLow": 120,
      "tooHigh": 700,
      "thresholdSource": {"label": "CanWePaddle Sturgeon River Wolverine Run runnable estimate", "url": "https://canwepaddle.com/rivers/michigan/sturgeon-river-wolverine/", "provider": "local"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [5, 6, 7, 8, 9, 10],
      "seasonNotes": "May through October is the practical window; cold water, storms, and rapid rises can change the line quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "Swift Class I–II moving water with chutes, continuous riffles, sweepers, and standing waves; suitable for experienced flatwater paddlers only with appropriate boat control and scouting.",
      "confidenceNotes": "High confidence for the named public endpoint pair, coordinates, direct gauge relationship, and route hazards. The 120–700 cfs band is a community planning estimate and must be presented as non-authoritative guidance."
    },
    "putIn": {"id": "sturgeon-trowbridge-road-access", "name": "Trowbridge Road public Sturgeon River access", "latitude": 45.232, "longitude": -84.58845},
    "takeOut": {"id": "sturgeon-haakwood-campground", "name": "Haakwood State Forest Campground carry-in access", "latitude": 45.300621, "longitude": -84.613474},
    "evidenceNotes": [
      {"label": "Route definition", "value": "Trowbridge Road Access to Haakwood State Forest Campground; approximately 8 mi", "note": "CanWePaddle identifies the Wolverine Run and Trowbridge/Haakwood area endpoints; Michigan DNR separately documents the Trowbridge access and Haakwood river access.", "sourceUrl": "https://canwepaddle.com/rivers/michigan/sturgeon-river-wolverine/"},
      {"label": "Public endpoints and coordinates", "value": "Trowbridge Road public access to Haakwood State Forest Campground carry-in", "note": "Michigan DNR publishes the Trowbridge Road coordinates and Haakwood coordinates/access details.", "sourceUrl": "https://www.dnr.state.mi.us/publications/pdfs/ArcGISOnline/StoryMaps/fish_troutTrails/PDFs/TT2015124.pdf"},
      {"label": "Live gauge and threshold", "value": "USGS 04127997; 120–700 cfs community runnable estimate", "note": "USGS provides direct discharge telemetry at Wolverine; CanWePaddle supplies a gauge-linked estimate that is explicitly non-authoritative.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?site_no=04127997"},
      {"label": "Safety and river character", "value": "Swift Class I–II water with chutes, riffles, sweepers, and standing waves", "note": "Sturgeon River Paddlesports describes the middle section as the fastest portion with technical features and standing waves; same-day scouting and skill matching are required.", "sourceUrl": "https://www.sturgeonriverpaddle.com/river-trips"},
      {"label": "Camping and logistics", "value": "Haakwood State Forest Campground provides designated overnight camping and river access", "note": "The campground is first-come, first-served with vault toilets, hand-pump water, fees, and a Recreation Passport requirement.", "sourceUrl": "https://www.michigan.gov/recsearch/sfcampgroundsa-m/Haakwood"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 04127997 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?site_no=04127997", "provider": "usgs"},
      {"label": "Michigan DNR Trowbridge Road access", "url": "https://www.dnr.state.mi.us/publications/pdfs/ArcGISOnline/StoryMaps/fish_troutTrails/PDFs/TT2015124.pdf", "provider": "local"},
      {"label": "Haakwood State Forest Campground", "url": "https://www.michigan.gov/recsearch/sfcampgroundsa-m/Haakwood", "provider": "local"},
      {"label": "Sturgeon River Paddlesports route and safety notes", "url": "https://www.sturgeonriverpaddle.com/river-trips", "provider": "local"},
      {"label": "CanWePaddle Wolverine Run estimate", "url": "https://canwepaddle.com/rivers/michigan/sturgeon-river-wolverine/", "provider": "local"},
      {"label": "Michigan paddling safety", "url": "https://www.michigan.gov/dnr/things-to-do/paddling", "provider": "local"}
    ],
    "aliases": ["Sturgeon River Trowbridge Road to Haakwood", "Sturgeon River Wolverine Run"]
  }
];
