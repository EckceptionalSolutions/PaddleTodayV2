// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const nebraskaRoutes: River[] = [
  {
    "id": "logan-creek-pender-oakland",
    "slug": "logan-creek-pender-oakland",
    "name": "Logan Creek",
    "riverId": "logan-creek",
    "reach": "Pender canoe access to Oakland canoe access",
    "aliases": [
      "Logan Creek Water Trail - Pender to Oakland",
      "Logan Creek Dredge - Pender to Oakland",
      "Pender to Bancroft to Lyons to Oakland"
    ],
    "state": "Nebraska",
    "region": "Logan Creek",
    "routeType": "recreational",
    "summary": "Designated Logan Creek water-trail corridor linking the public Pender, Bancroft, and Oakland access points. The route is a committed shuttle run with public-town access anchors and a direct USGS gauge at Wakefield for same-day context.",
    "statusText": "Use direct USGS 06799445 at Wakefield for discharge context. Apply the conservative 55 cfs minimum-only reference derived from Nebraska DNR Logan Creek hydrology modeling; it is not a station-specific safety certification. Check same-day flow, weather, wood, daylight, and access conditions before launching.",
    "latitude": 42.113332,
    "longitude": -96.712814,
    "gaugeSource": {
      "id": "usgs-06799445", "provider": "usgs", "siteId": "06799445", "metric": "discharge_cfs", "unit": "cfs", "kind": "direct",
      "siteName": "Logan Creek at Wakefield, Nebr.",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/06799445",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06799445"
    },
    "profile": {
      "thresholdModel": "minimum-only", "tooLow": 55,
      "thresholdSource": {"label": "Nebraska DNR Logan Creek hydrology model (conservative minimum reference)", "url": "https://dnr.nebraska.gov/groundwater/modeling", "provider": "local"},
      "thresholdSourceStrength": "mixed", "rainfallSensitivity": "high",
      "seasonMonths": [3,4,5,6,7,8,9,10],
      "seasonNotes": "Nebraska Game and Parks describes Logan Creek as a designated water trail and directs paddlers to check USGS flow. Spring and fall are the most dependable planning seasons; summer storms, irrigation effects, and local wood can change conditions quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a long moving-water shuttle with low-water uncertainty, strainers, private banks, fast rises, and limited bailout options between named town accesses. Wear a PFD and plan a daylight turnaround.",
      "confidenceNotes": "High confidence that Pender-to-Oakland is a distinct public water-trail corridor: Nebraska Game and Parks maps the route and canoe-access sites, local public sources identify Pender, Bancroft, and Oakland access anchors, and USGS 06799445 supplies direct live discharge context. The 55 cfs floor is a conservative derived hydrologic reference, not an agency paddling certification; no high-water cutoff is claimed."
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "fast_rise", "private_banks", "remote"],
      "safetyNotes": [
        "Nebraska Game and Parks identifies Logan Creek as a designated water trail and warns paddlers to check USGS flow, weather, access, and private-bank restrictions.",
        "The public access anchors are practical town/access coordinates rather than survey-grade ramp points; inspect each launch and take-out on arrival and follow posted signs.",
        "Remain in the channel and use only the named Pender and Oakland endpoints or confirmed public intermediate access. Do not land, camp, or portage on private property without permission except for emergency safety.",
        "A rapidly rising gauge, flood warning, severe weather, fresh wood, or missed daylight overrides the discharge score."
      ],
      "reviewStatus": "reviewed"
    },
    "accessPoints": [
      {"id":"pender-logan-creek-canoe-access","name":"Pender Logan Creek canoe access (east side of town)","latitude":42.113332,"longitude":-96.712814,"mileFromStart":0,"segmentKind":"creek","note":"Named by the official Logan Creek water-trail map and local float documentation; coordinate is a practical Pender anchor, not a survey-grade ramp point."},
      {"id":"bancroft-logan-creek-access","name":"Bancroft Logan Creek public kayak access, County Road 24","latitude":42.012773,"longitude":-96.57281,"mileFromStart":12,"segmentKind":"creek","note":"Public access is described north of Highway 16 on Cuming County Road 24, directly north of Ru-De’s Mini Mart; verify parking and landing conditions."},
      {"id":"oakland-logan-creek-canoe-access","name":"Oakland Logan Creek canoe access","latitude":41.8263,"longitude":-96.4931,"mileFromStart":32,"segmentKind":"creek","note":"Named by the official water-trail map; coordinate is a practical Oakland access anchor, not a survey-grade ramp point. Confirm the current take-out before launch."}
    ],
    "evidenceNotes": [
      {"label":"Official water-trail corridor","value":"Pender through Bancroft and Lyons to Oakland","note":"Nebraska Game and Parks’ Logan Creek map identifies the corridor, towns, start/end, and canoe access sites.","sourceUrl":"https://outdoornebraska.gov/wp-content/uploads/2023/02/NGPC_Trails_Logan_Creek_River.pdf"},
      {"label":"Public endpoint access","value":"Pender east-side canoe access and Oakland canoe access","note":"The official map and local public-access documentation identify the endpoints; Bancroft access is documented north of Highway 16 on County Road 24.","sourceUrl":"https://outdoornebraska.gov/parks/explore-trails/water-trails/"},
      {"label":"Direct live gauge","value":"USGS 06799445 at Wakefield","note":"USGS provides continuous discharge telemetry and station coordinates. The gauge is direct live context, not a guarantee of every reach condition.","sourceUrl":"https://waterdata.usgs.gov/monitoring-location/06799445"},
      {"label":"Flow guidance","value":"55 cfs conservative minimum-only reference","note":"Nebraska DNR Logan Creek hydrology modeling reports a modeled baseflow minimum near 55 cfs. This is a derived conservative reference, not a station-specific paddling certification; no high-water cutoff is claimed.","sourceUrl":"https://dnr.nebraska.gov/groundwater/modeling"},
      {"label":"Camping and logistics","value":"Daylight shuttle; no on-route camping assumed","note":"Use named town endpoints and confirm current parking, access, and any endpoint lodging/camping separately. Do not treat private banks, sandbars, or the stream bed as campsites without permission."},
      {"label":"Image decision","value":"Approved Logan Creek river-group context image","note":"The Pender Logan Creek bridge image is bundled as river-level context with public-domain attribution; it is not presented as a survey or endpoint photograph."}
    ],
    "sourceLinks": [
      {"label":"Nebraska Game and Parks water trails","url":"https://outdoornebraska.gov/parks/explore-trails/water-trails/","provider":"local"},
      {"label":"Logan Creek official map","url":"https://outdoornebraska.gov/wp-content/uploads/2023/02/NGPC_Trails_Logan_Creek_River.pdf","provider":"local"},
      {"label":"Bancroft public Logan Creek access","url":"https://www.bancroftnebraska.com/","provider":"local"},
      {"label":"USGS 06799445 monitoring location","url":"https://waterdata.usgs.gov/monitoring-location/06799445","provider":"usgs"},
      {"label":"Nebraska DNR groundwater modeling","url":"https://dnr.nebraska.gov/groundwater/modeling","provider":"local"}
    ]
  },
  {
    "id": "platte-river-north-bend-valley",
    "slug": "platte-river-north-bend-valley",
    "name": "Platte River",
    "riverId": "platte-river",
    "reach": "Nebraska 79 bridge south of North Bend to Platte River Landing",
    "aliases": [
      "Lower Platte Canoe Trail - North Bend to Platte River Landing",
      "North Bend to Valley Platte River",
      "North Bend Highway 79 to Highway 64 landing"
    ],
    "state": "Nebraska",
    "region": "Lower Platte River",
    "routeType": "recreational",
    "summary": "Official Nebraska Game and Parks canoe-trail corridor from the Highway 79 bridge south of North Bend through the documented Hormel Park and Platte River Landing sections to the public Highway 64 landing. Hormel Park is treated as an intermediate landmark only because its boat ramp is currently closed; the route finishes at Platte River Landing.",
    "statusText": "Use direct USGS 06796000 at North Bend for same-day discharge and stage context. Apply the published lower-Platte 5,000 cfs minimum-only reference conservatively; it is regional guidance tied to the Louisville reach, not a station-specific certification. Check channel shape, wind, debris, weather, and access status before launch.",
    "latitude": 41.45295,
    "longitude": -96.77601,
    "gaugeSource": {
      "id": "usgs-06796000", "provider": "usgs", "siteId": "06796000", "metric": "discharge_cfs", "unit": "cfs", "kind": "direct",
      "siteName": "Platte River at North Bend, Nebr.",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/06796000/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06796000"
    },
    "profile": {
      "thresholdModel": "minimum-only", "tooLow": 5000,
      "thresholdSource": {"label": "Nebraska Game and Parks / Nebraskaland Platte River Water Trail flow guidance", "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/", "provider": "local"},
      "thresholdSourceStrength": "mixed", "rainfallSensitivity": "high",
      "seasonMonths": [4,5,6,7,8,9,10],
      "seasonNotes": "The official trail guidance notes controlled releases and summer irrigation effects; lower levels can narrow the navigable channel. Check same-day USGS telemetry, wind, weather, and daylight.",
      "difficulty": "moderate",
      "difficultyNotes": "The Platte is broad, braided, sandy, and wind-exposed. Expect shifting channels, bridge debris, low-water dragging, private banks, and a long committed day with limited public intermediate access.",
      "confidenceNotes": "High confidence for a distinct corridor: Nebraska Game and Parks documents the North Bend launch and the downstream trail sections to Platte River Landing, while USGS 06796000 is a direct long-running gauge at the start. The 5,000 cfs floor is explicitly conservative regional guidance rather than a North Bend station certification; no high-water cutoff is claimed."
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "fast_rise", "private_banks", "remote"],
      "safetyNotes": [
        "Nebraska Game and Parks describes the North Bend launch and warns that hot weather can reduce levels and narrow the navigable channel. Wear a properly fitted PFD and expect scouting or walking at low flow.",
        "Bridge pilings, fresh wood, shifting sandbars, strong crosswinds, storms, and rapidly rising water override the score and are no-go conditions.",
        "Hormel Park is documented as an intermediate trail landmark but its boat ramp is currently closed; do not use it as a take-out or launch unless the managing agency confirms reopening.",
        "Remain in the channel and use only named public endpoints. Banks, sandbars, and the stream bed may require permission except for emergency portage or shallow-water walking."
      ],
      "reviewStatus": "reviewed"
    },
    "accessPoints": [
      {"id":"north-bend-highway-79-bridge","name":"Nebraska 79 bridge south of North Bend","latitude":41.45295,"longitude":-96.77601,"mileFromStart":0,"segmentKind":"creek","note":"Nebraska Game and Parks identifies the upstream/west side of the bridge as the launch; inspect the dirt-road approach and portage distance on arrival."},
      {"id":"platte-river-landing-highway-64","name":"Platte River Landing at Nebraska 64","latitude":41.31893,"longitude":-96.40321,"mileFromStart":24,"segmentKind":"creek","note":"Public Papio NRD landing on the southeast/downstream corner of the Nebraska 64 bridge; confirm current ramp, parking, and seasonal hours."}
    ],
    "evidenceNotes": [
      {"label":"Official route corridor","value":"North Bend to Platte River Landing, about 24 river miles","note":"Nebraska Game and Parks Platte River Canoe Trail describes the North Bend launch, 15-mile reach to Hormel Park, and 9-mile reach from Hormel Park to Platte River Landing.","sourceUrl":"https://outdoornebraska.gov/wp-content/uploads/2023/02/NGPC_Trails_Platte_River.pdf"},
      {"label":"Public endpoint access","value":"Highway 79 bridge launch and Platte River Landing at Highway 64","note":"The official canoe-trail PDF names the Highway 79 launch and the Highway 64 landing; Papio NRD documents Platte River Landing as a public access park with a boat ramp and facilities.","sourceUrl":"https://www.papionrd.org/recreation/river-access/"},
      {"label":"Direct live gauge","value":"USGS 06796000 at North Bend","note":"USGS provides long-running discharge and gage-height telemetry at the route start.","sourceUrl":"https://waterdata.usgs.gov/monitoring-location/06796000"},
      {"label":"Flow guidance","value":"5,000 cfs conservative minimum-only reference","note":"Nebraska Game and Parks/Nebraskaland publishes lower-Platte flow guidance; this is regional guidance rather than a station-specific North Bend certification, and no high-water threshold is claimed.","sourceUrl":"https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/"},
      {"label":"Intermediate closure","value":"Hormel Park ramp currently closed","note":"Lower Platte North NRD reports the Hormel Park boat ramp was destroyed and has no reopening timeline; it is retained only as a route landmark.","sourceUrl":"https://www.nrdnet.org/rec-area/fremont-hormel-park-boat-ramp-currently-closed"},
      {"label":"Image decision","value":"Approved Platte River river-group context image","note":"A rights-cleared Platte River image near Grand Island is bundled as river-level context; it is not presented as a route-specific endpoint photograph."}
    ],
    "sourceLinks": [
      {"label":"Nebraska Game and Parks Platte River Canoe Trail","url":"https://outdoornebraska.gov/wp-content/uploads/2023/02/NGPC_Trails_Platte_River.pdf","provider":"local"},
      {"label":"Papio NRD river access","url":"https://www.papionrd.org/recreation/river-access/","provider":"local"},
      {"label":"USGS 06796000 monitoring location","url":"https://waterdata.usgs.gov/monitoring-location/06796000","provider":"usgs"},
      {"label":"Hormel Park closure notice","url":"https://www.nrdnet.org/rec-area/fremont-hormel-park-boat-ramp-currently-closed","provider":"local"}
    ]
  },
  {
    "id": "north-loup-river-burwell-ord",
    "slug": "north-loup-river-burwell-ord",
    "name": "North Loup River",
    "riverId": "north-loup-river",
    "reach": "Riverside Park, Burwell to Anderson Island, Ord",
    "aliases": [
      "North Loup River Canoe Trail - Burwell to Ord",
      "Burwell Riverside Park to Anderson Island",
      "North Loup Burwell-Ord water trail"
    ],
    "state": "Nebraska",
    "region": "North Loup River",
    "routeType": "recreational",
    "summary": "Official Nebraska Game and Parks North Loup canoe-trail segment from Burwell Riverside Park to the city-owned Anderson Island finish in Ord. The first miles include low rapids and fast water; the downstream reach broadens and can require walking in summer low water.",
    "statusText": "Use direct USGS 06790500 near Saint Paul as the live discharge and stage context. Treat 275 cfs as a conservative minimum-only system-floor reference, not a station-specific safety certification; spring and fall are preferred, while summer irrigation can lower the river and require walking.",
    "latitude": 41.78900058,
    "longitude": -99.134,
    "gaugeSource": {
      "id": "usgs-06790500", "provider": "usgs", "siteId": "06790500", "metric": "discharge_cfs", "unit": "cfs", "kind": "direct",
      "siteName": "North Loup River near Saint Paul, Nebr.",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/06790500/",
      "hydrographUrl": "https://waterdata.usgs.gov/ne/nwis/uv/?PARAmeter_cd=00065%2C00060&site_no=06790500"
    },
    "profile": {
      "thresholdModel": "minimum-only", "tooLow": 275,
      "thresholdSource": {"label": "Nebraska Loup River water-trail flow guidance", "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/", "provider": "local"},
      "thresholdSourceStrength": "mixed", "rainfallSensitivity": "high",
      "seasonMonths": [3,4,5,6,7,8,9,10],
      "seasonNotes": "Nebraska Game and Parks identifies spring and fall as optimum for the North Loup and warns that irrigation diversions from mid-June through August reduce downstream levels. Check same-day USGS telemetry, weather, wind, and daylight.",
      "difficulty": "moderate",
      "difficultyNotes": "The official trail map describes two low rapids and a fast-water section in the first 6.5 miles, followed by a broader, braided and shallower reach where summer walking may be required. Expect strainers, private-bank constraints, and limited intermediate access.",
      "confidenceNotes": "High confidence for a distinct route add: Nebraska Game and Parks publishes the exact Burwell-to-Ord 18.5-mile trail with named public endpoints, the only potential intermediate access at the Elyria county bridge, and explicit seasonal and hazard guidance. USGS 06790500 supplies direct live discharge and stage context near the downstream portion. The 275 cfs floor is a conservative system reference rather than a station-specific certification, so the route intentionally has no high-water cutoff and retains conservative same-day safety warnings."
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "whitewater", "strainers", "fast_rise", "private_banks", "remote"],
      "safetyNotes": [
        "Nebraska Game and Parks describes 18-24 inch low rapids and about 300 yards of fast water in the first section. Scout the line, wear a properly fitted PFD, and do not treat the route as flatwater.",
        "The river above Burwell is diverted for irrigation from mid-June through August. Low levels can expose shallow channels and require walking; never use the 275 cfs reference as a guarantee of floatability.",
        "Use only the named public Riverside Park and Anderson Island endpoints. Treat the Elyria county bridge as a scouting landmark, not a verified access; banks and stream-bed stops may require landowner permission.",
        "A rapidly rising gauge, flood warning, severe weather, fresh wood, poor daylight, or unclear endpoint access overrides the score and is a no-go."
      ],
      "reviewStatus": "reviewed"
    },
    "accessPoints": [
      {"id":"burwell-riverside-park","name":"Burwell Riverside Park","latitude":41.78900058,"longitude":-99.134,"mileFromStart":0,"segmentKind":"creek","note":"Nebraska Game and Parks identifies Riverside Park as the start of the trail; confirm current launch/parking conditions on arrival."},
      {"id":"anderson-island-ord","name":"Anderson Island, Ord","latitude":41.604454,"longitude":-98.9178651,"mileFromStart":18.5,"segmentKind":"creek","note":"City-owned public finish just south of the Nebraska 70 bridge with road access to the river edge."}
    ],
    "evidenceNotes": [
      {"label":"Official route corridor","value":"Burwell Riverside Park to Anderson Island, Ord — 18.5 mi","note":"Nebraska Game and Parks North Loup Canoe Trail PDF gives the exact segment, endpoint access, intermediate bridge, rapids, seasonal guidance, and emergency contacts.","sourceUrl":"https://outdoornebraska.gov/wp-content/uploads/2023/02/NGPC_Trails_North_Loup_River.pdf"},
      {"label":"Public endpoint and camping","value":"Riverside Park start; Anderson Island public finish and camping","note":"Burwell is the published trail start. Ord identifies Anderson Island as public river access with camping, canoeing, and tubing; no on-route camping is assumed.","sourceUrl":"https://ordnebraska.com/play/come-visit/camping/"},
      {"label":"Direct live gauge","value":"USGS 06790500 near Saint Paul","note":"USGS provides current discharge and gage-height telemetry. The station is near the downstream portion of the route and does not eliminate upstream seasonal variation.","sourceUrl":"https://waterdata.usgs.gov/monitoring-location/06790500/"},
      {"label":"Flow guidance","value":"275 cfs conservative minimum-only reference","note":"Nebraska water-trail guidance says to check USGS flow and notes lower summer levels; the Loup system article provides a conservative baseflow reference. This is not an official station-specific safety certification and no high-water threshold is claimed.","sourceUrl":"https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/"},
      {"label":"Image decision","value":"Approved Loup River river-group context image","note":"The public-domain Loup River near Genoa image is bundled as river-level context; it is not presented as a George Syas, Monroe, Columbus, or ADM endpoint photograph."}
    ],
    "sourceLinks": [
      {"label":"Nebraska Game and Parks North Loup canoe trail","url":"https://outdoornebraska.gov/wp-content/uploads/2023/02/NGPC_Trails_North_Loup_River.pdf","provider":"local"},
      {"label":"Nebraska Game and Parks water trails","url":"https://outdoornebraska.gov/parks/explore-trails/water-trails/","provider":"local"},
      {"label":"Ord Anderson Island camping and river access","url":"https://ordnebraska.com/play/come-visit/camping/","provider":"local"},
      {"label":"USGS 06790500 monitoring location","url":"https://waterdata.usgs.gov/monitoring-location/06790500/","provider":"usgs"}
    ]
  },
  {
    "id": "elkhorn-river-wisner-west-point",
    "slug": "elkhorn-river-wisner-west-point",
    "name": "Elkhorn River",
    "riverId": "elkhorn-river",
    "reach": "Wisner River Park to Neligh Park, West Point",
    "aliases": [
      "Lower Elkhorn River Canoe Trail - Wisner to West Point",
      "Elkhorn River - Wisner River Park to Neligh Park",
      "Wisner River Park to West Point"
    ],
    "state": "Nebraska",
    "region": "Lower Elkhorn River",
    "routeType": "recreational",
    "summary": "A public-access Elkhorn River day or overnight run from Wisner River Park to Neligh Park in West Point. The route follows the designated Lower Elkhorn water-trail corridor and uses the direct West Point USGS gauge.",
    "statusText": "Use USGS 06799350 at West Point. A community-verified Lower Elkhorn guidance band places optimal paddling around 575-1,700 cfs; below that, expect shallow-channel uncertainty and dragging. The source does not establish a reliable high-water ceiling, so do not launch during a rapid rise, flood warning, or unsafe wind/wood conditions.",
    "latitude": 41.839636,
    "longitude": -96.727411,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "fast_rise", "private_banks", "remote"],
      "safetyNotes": [
        "Nebraska Game and Parks identifies the Elkhorn as a designated water trail but warns that conditions vary with snowmelt, rainfall, irrigation demand, wind, and river flow. Check same-day USGS telemetry and weather.",
        "The water trail crosses predominantly private banks. Launch and land only at the named public Wisner River Park and Neligh Park endpoints, and obtain permission before camping or stopping on private banks, sandbars, or the stream bed.",
        "The West Point gauge is direct for the take-out area, but the reach is long and conditions can differ upstream. Treat a rapidly rising gauge, flood warning, severe wind, or fresh wood as a no-go even if discharge is inside the community guidance band."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-06799350", "provider": "usgs", "siteId": "06799350", "metric": "discharge_cfs", "unit": "cfs", "kind": "direct",
      "siteName": "Elkhorn River at West Point, Nebr.",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06799350",
      "hydrographUrl": "https://waterdata.usgs.gov/monitoring-location/06799350/all-graphs/"
    },
    "profile": {
      "thresholdModel": "minimum-only", "tooLow": 575,
      "thresholdSource": {"label": "RiverScout Lower Elkhorn River flow guidance", "url": "https://riverscout.app/rivers/nebraska/lower-elkhorn-river", "provider": "manual"},
      "thresholdSourceStrength": "community", "rainfallSensitivity": "high",
      "seasonMonths": [3,4,5,6,7,8,9,10],
      "seasonNotes": "Nebraska Game and Parks says spring and fall are normally the best canoeing seasons and warns that summer irrigation can lower water levels. Check the live gauge, recent rainfall, wind, and daylight before committing to the long point-to-point reach.",
      "difficulty": "moderate",
      "difficultyNotes": "The Elkhorn is generally Class I, but this is a long moving-water trip with shallow sections, possible wood, wind exposure, private-bank constraints, and limited bailout options between named public endpoints.",
      "confidenceNotes": "Public access and camping are supported by the City of Wisner, the City of West Point, and Nebraska Game and Parks water-trail materials. The direct gauge relationship is supported by USGS 06799350. The 575 cfs floor is community-sourced rather than official agency guidance; the route deliberately uses minimum-only scoring and retains an explicit no-high-cutoff safety warning rather than inventing an upper threshold."
    },
    "evidenceNotes": [
      {"label":"Official water-trail corridor","value":"Lower Elkhorn River Canoe Trail, U.S. 275 bridge to Waterloo","note":"Nebraska Game and Parks identifies the Lower Elkhorn as a designated water trail and directs paddlers to check USGS flow, weather, wind, and daylight. Wisner-to-West Point is a bounded segment within that corridor.","sourceUrl":"https://outdoornebraska.gov/parks/explore-trails/water-trails/"},
      {"label":"Public put-in","value":"Wisner River Park boat dock, 1111 Avenue E","note":"The City of Wisner lists the River Park boat dock as access to the Elkhorn River and documents campground pads, restrooms, showers, and parking.","sourceUrl":"https://www.ci.wisner.ne.us/vnews/display.v/SEC/City%20of%20Wisner%7CParks"},
      {"label":"Public take-out and camping","value":"Neligh Park, 530 W Bridge St, West Point","note":"The City of West Point documents tent and RV camping, showers, reservations, and the park trail/parking context. The endpoint coordinate is a practical public-park anchor, not a survey-grade water-edge point.","sourceUrl":"https://www.ci.west-point.ne.us/parks-and-recreation/page/neligh-park"},
      {"label":"Direct live gauge","value":"USGS 06799350 at West Point","note":"USGS provides continuous discharge and gage-height telemetry and survey-grade station coordinates near the West Point reach.","sourceUrl":"https://waterdata.usgs.gov/monitoring-location/USGS-06799350"},
      {"label":"Flow guidance","value":"575 cfs minimum-only; 575-1,700 cfs community optimal band","note":"RiverScout publishes a lower-Elkhorn optimal range of 575-1,700 cfs tied to USGS 06799350. Treat it as community guidance, not an official safety certification; the app does not infer a high-water limit.","sourceUrl":"https://riverscout.app/rivers/nebraska/lower-elkhorn-river"},
      {"label":"Image decision","value":"Approved Elkhorn River river-group context image","note":"A rights-cleared Elkhorn River image near Neligh is bundled as river-level context; it is not presented as a Wisner or West Point endpoint photograph."}
    ],
    "sourceLinks": [
      {"label":"Nebraska Game and Parks water trails","url":"https://outdoornebraska.gov/parks/explore-trails/water-trails/","provider":"local"},
      {"label":"City of Wisner parks and River Park access","url":"https://www.ci.wisner.ne.us/vnews/display.v/SEC/City%20of%20Wisner%7CParks","provider":"local"},
      {"label":"City of West Point Neligh Park","url":"https://www.ci.west-point.ne.us/parks-and-recreation/page/neligh-park","provider":"local"},
      {"label":"RiverScout Lower Elkhorn flow guidance","url":"https://riverscout.app/rivers/nebraska/lower-elkhorn-river","provider":"manual"},
      {"label":"USGS 06799350 monitoring location","url":"https://waterdata.usgs.gov/monitoring-location/USGS-06799350","provider":"usgs"}
    ]
  },
  {
    "id": "platte-river-schramm-louisville",
    "slug": "platte-river-schramm-louisville",
    "name": "Platte River",
    "riverId": "platte-river",
    "reach": "Schramm Park SRA to Louisville SRA",
    "aliases": [
      "Platte River Water Trail - Schramm to Louisville",
      "Lower Platte River - Schramm Park to Louisville State Recreation Area",
      "Schramm Park canoe/kayak access to Louisville SRA"
    ],
    "state": "Nebraska",
    "region": "Lower Platte River",
    "summary": "Short lower-Platte water-trail run from the Schramm Park canoe/kayak access to the Louisville State Recreation Area boat ramp. Nebraska Game and Parks supports the access sequence and ties paddling conditions to the Louisville USGS gauge.",
    "statusText": "Use the Platte River at Louisville gauge. Nebraska Game and Parks/Nebraskaland says 7,000 to 12,000 cfs is ideal, below 5,000 cfs is too little, above 16,000 cfs requires extreme caution, and 18,000 cfs is an avoid level.",
    "latitude": 41.02036,
    "longitude": -96.24974,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Nebraska Game and Parks says the Lied Bridge pilings often collect trees and debris; choose the opening carefully and avoid downstream-side entrapment exposure.",
        "Heavy rain can push the lower Platte to dangerous levels in any month. Use the Louisville gauge and do not launch near or above the published 18,000 cfs avoid level.",
        "The water surface is open to public use, but banks, sandbars, and the stream bed require landowner permission except where walking or portaging is necessary. Plan to remain in the boat between the three public park accesses."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-06805500",
      "provider": "usgs",
      "siteId": "06805500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Platte River at Louisville, Nebr.",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06805500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 7000,
      "idealMax": 12000,
      "tooLow": 5000,
      "tooHigh": 16000,
      "thresholdSource": {
        "label": "Nebraska Game and Parks / Nebraskaland Platte River Water Trail flow guidance",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Nebraska Game and Parks says this lower-Platte reach is often highest in May and June, can become dangerous after heavy rain in any month, and usually drops lower from July until irrigation season ends in September. Check same-day flow, channel shape, weather, wind, and park access status.",
      "difficulty": "easy",
      "difficultyNotes": "The route is a short designated water-trail day when flows are in range, but the Platte is a braided sandy river with shifting channels, debris at bridge pilings, private banks and sandbars, wind exposure, and low-water dragging risk.",
      "confidenceNotes": "Confidence is high for Nebraska implementation: Nebraska Game and Parks/Nebraskaland documents the Schramm-to-Louisville water-trail route, the Schramm launch, the Platte River State Park stop, the Louisville boat ramp and parking, braided-channel hazards, private-bed/sandbar rules, and numeric paddling bands tied to USGS 06805500 at Louisville. USGS Water Services returned same-day 2026-06-12 current values for 06805500. Endpoint coordinates are practical public-access anchors from the named NGPC access context plus public map records rather than survey-grade ramp points."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Schramm to Louisville, about 6 mi",
        "note": "Nebraska Game and Parks/Nebraskaland describes the redesigned lower-Platte water-trail section from Schramm Park through Platte River State Park to Louisville State Recreation Area, with a quick 7-mile vehicle shuttle.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/"
      },
      {
        "label": "Public access",
        "value": "Schramm launch and Louisville boat ramp",
        "note": "NGPC says Schramm Park has a canoe/kayak access point with graded bank and parking off Highway 31, and Louisville SRA offers canoe/kayak access to the Platte River.",
        "sourceUrl": "https://outdoornebraska.gov/location/schramm-park/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 06805500",
        "note": "USGS Water Services returned current Platte River at Louisville values during implementation: 8,270 cfs and 4.09 ft at 2026-06-12 10:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06805500/"
      },
      {
        "label": "Paddling thresholds",
        "value": "5,000 / 7,000-12,000 / 16,000 cfs",
        "note": "Nebraskaland quotes NGPC biologist Joel Jorgensen using the Louisville USGS gauge: ideal paddling is 7,000-12,000 cfs, below 5,000 cfs is too little, above 16,000 cfs requires extreme caution, and 18,000 cfs is an avoid level.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "41.02036, -96.24974 to 41.01471, -96.15787",
        "note": "The Schramm coordinate is a practical access-parking anchor from public map data near the named NGPC river access. The Louisville coordinate uses the public-map slipway/USGS-gauge access area that aligns with the NGPC Louisville Platte River access.",
        "sourceUrl": "https://outdoornebraska.gov/location/louisville/"
      },
      {
        "label": "Nebraska access caveat",
        "value": "Surface open, beds and banks private",
        "note": "NGPC/Nebraskaland warns that paddlers need permission to stop on banks, sandbars, or the stream bed, except where necessary to portage around obstacles or walk through shallow water.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Nebraskaland Platte River Water Trail",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "NGPC Schramm Park",
        "url": "https://outdoornebraska.gov/location/schramm-park/",
        "provider": "local"
      },
      {
        "label": "NGPC Louisville State Recreation Area",
        "url": "https://outdoornebraska.gov/location/louisville/",
        "provider": "local"
      },
      {
        "label": "NGPC Platte River State Park",
        "url": "https://outdoornebraska.gov/location/platte-river/",
        "provider": "local"
      },
      {
        "label": "USGS 06805500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06805500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "platte-river-schramm-platte-river-state-park",
    "slug": "platte-river-schramm-platte-river-state-park",
    "name": "Platte River",
    "riverId": "platte-river",
    "reach": "Schramm Park SRA to Platte River State Park",
    "aliases": [
      "Platte River Water Trail - Schramm to Platte River State Park",
      "Lower Platte River - Schramm Park to Platte River State Park",
      "Schramm Park canoe/kayak access to Decker Creek stop"
    ],
    "state": "Nebraska",
    "region": "Lower Platte River",
    "summary": "Short lower-Platte starter segment from the Schramm Park canoe/kayak access to the Decker Creek stop at Platte River State Park. Nebraska Game and Parks treats this as the upstream half of the improved Schramm-Louisville water trail and uses the same Louisville gauge guidance.",
    "statusText": "Use the Platte River at Louisville gauge. Nebraska Game and Parks/Nebraskaland says 7,000 to 12,000 cfs is ideal, below 5,000 cfs is too little, above 16,000 cfs requires extreme caution, and 18,000 cfs is an avoid level.",
    "latitude": 41.02036,
    "longitude": -96.24974,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Nebraska Game and Parks says the Lied Bridge pilings often collect trees and debris; choose the opening carefully and avoid downstream-side entrapment exposure.",
        "Heavy rain can push the lower Platte to dangerous levels in any month. Use the Louisville gauge and do not launch near or above the published 18,000 cfs avoid level.",
        "The water surface is open to public use, but banks, sandbars, and the stream bed require landowner permission except where walking or portaging is necessary. Use the designated Schramm and Decker Creek accesses for the planned route."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-06805500",
      "provider": "usgs",
      "siteId": "06805500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Platte River at Louisville, Nebr.",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06805500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 7000,
      "idealMax": 12000,
      "tooLow": 5000,
      "tooHigh": 16000,
      "thresholdSource": {
        "label": "Nebraska Game and Parks / Nebraskaland Platte River Water Trail flow guidance",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Nebraska Game and Parks says this lower-Platte reach is often highest in May and June, can become dangerous after heavy rain in any month, and usually drops lower from July until irrigation season ends in September. Check same-day flow, channel shape, weather, wind, and park access status.",
      "difficulty": "easy",
      "difficultyNotes": "The route is a short designated water-trail day when flows are in range, but the Platte is a braided sandy river with shifting channels, debris at bridge pilings, private banks and sandbars, wind exposure, and low-water dragging risk.",
      "confidenceNotes": "Confidence is high for the Decker Creek water-entry identity: Nebraska Game and Parks documents the stop, describes the Platte-to-Decker Creek connection, and publishes a photograph whose graded landing, riprap, curved path, and footbridge match current aerial imagery. The coordinate is the landing's water edge on Decker Creek. Access logistics remain conditional because NGPC says this is a water-trail stop, not a normal vehicle put-in/take-out; boats may be wheeled down a maintenance road only under current park rules."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Schramm to Platte River State Park, 2.9 mi",
        "note": "Nebraska Game and Parks/Nebraskaland says Platte River State Park is 2.9 miles from the Schramm launch and serves as the midpoint stopping place on the improved lower-Platte water trail.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/"
      },
      {
        "label": "Public access",
        "value": "Schramm launch and Decker Creek stop",
        "note": "Outdoor Nebraska says Schramm has a graded canoe/kayak access with parking off Highway 31, and Platte River State Park has a canoe/kayak access point a few yards from the mouth of Decker Creek as part of the Venture Park Initiative.",
        "sourceUrl": "https://outdoornebraska.gov/location/platte-river/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 06805500",
        "note": "USGS Water Services returned current Platte River at Louisville values during implementation: 5,150 cfs and 3.45 ft at 2026-06-22 15:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06805500/"
      },
      {
        "label": "Paddling thresholds",
        "value": "5,000 / 7,000-12,000 / 16,000 cfs",
        "note": "Nebraskaland quotes NGPC biologist Joel Jorgensen using the Louisville USGS gauge: ideal paddling is 7,000-12,000 cfs, below 5,000 cfs is too little, above 16,000 cfs requires extreme caution, and 18,000 cfs is an avoid level.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/"
      },
      {
        "label": "Camping context",
        "value": "Platte River State Park cabins and campground nearby",
        "note": "Platte River State Park offers cabins, glamping, RV camping, and other base-camp amenities near the Decker Creek access stop, but the access itself is primarily a water-trail stop rather than a river campsite.",
        "sourceUrl": "https://outdoornebraska.gov/location/platte-river/"
      },
      {
        "label": "Nebraska access caveat",
        "value": "Surface open, beds and banks private",
        "note": "NGPC/Nebraskaland warns that paddlers need permission to stop on banks, sandbars, or the stream bed, except where necessary to portage around obstacles or walk through shallow water.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Nebraskaland Platte River Water Trail",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "NGPC Schramm Park",
        "url": "https://outdoornebraska.gov/location/schramm-park/",
        "provider": "local"
      },
      {
        "label": "NGPC Platte River State Park",
        "url": "https://outdoornebraska.gov/location/platte-river/",
        "provider": "local"
      },
      {
        "label": "USGS 06805500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06805500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "platte-river-platte-river-state-park-louisville",
    "slug": "platte-river-platte-river-state-park-louisville",
    "name": "Platte River",
    "riverId": "platte-river",
    "reach": "Platte River State Park to Louisville SRA",
    "aliases": [
      "Platte River Water Trail - Platte River State Park to Louisville",
      "Lower Platte River - Decker Creek stop to Louisville State Recreation Area",
      "Platte River State Park canoe/kayak access to Louisville SRA"
    ],
    "state": "Nebraska",
    "region": "Lower Platte River",
    "summary": "Lower-Platte finish segment from the Decker Creek stop at Platte River State Park to the Louisville State Recreation Area boat ramp. Nebraska Game and Parks treats this as the downstream half of the improved Schramm-Louisville water trail and scores it from the same Louisville gauge.",
    "statusText": "Use the Platte River at Louisville gauge. Nebraska Game and Parks/Nebraskaland says 7,000 to 12,000 cfs is ideal, below 5,000 cfs is too little, above 16,000 cfs requires extreme caution, and 18,000 cfs is an avoid level.",
    "latitude": 40.99302,
    "longitude": -96.20843000000001,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Expect shifting channels and floating wood on this braided river; keep clear of collected debris and do not let the short mileage hide the consequences of a blocked channel.",
        "Heavy rain can push the lower Platte to dangerous levels in any month. Use the Louisville gauge and do not launch near or above the published 18,000 cfs avoid level.",
        "The water surface is open to public use, but banks, sandbars, and the stream bed require landowner permission except where walking or portaging is necessary. Use the designated Decker Creek and Louisville accesses for the planned route."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-06805500",
      "provider": "usgs",
      "siteId": "06805500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Platte River at Louisville, Nebr.",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06805500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 7000,
      "idealMax": 12000,
      "tooLow": 5000,
      "tooHigh": 16000,
      "thresholdSource": {
        "label": "Nebraska Game and Parks / Nebraskaland Platte River Water Trail flow guidance",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Nebraska Game and Parks says this lower-Platte reach is often highest in May and June, can become dangerous after heavy rain in any month, and usually drops lower from July until irrigation season ends in September. Check same-day flow, channel shape, weather, wind, and park access status.",
      "difficulty": "easy",
      "difficultyNotes": "The route is a short designated water-trail day when flows are in range, but the Platte is a braided sandy river with shifting channels, debris at bridge pilings, private banks and sandbars, wind exposure, and low-water dragging risk.",
      "confidenceNotes": "Confidence is high for the Decker Creek water-entry identity: Nebraska Game and Parks documents the stop, describes the Decker Creek-to-Platte connection, and publishes a photograph whose graded landing, riprap, curved path, and footbridge match current aerial imagery. The coordinate is the landing's water edge on Decker Creek. Access logistics remain conditional because NGPC says this is a water-trail stop, not a normal vehicle put-in/take-out; boats may be wheeled down a maintenance road only under current park rules."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Platte River State Park to Louisville, 2.8 mi",
        "note": "Nebraska Game and Parks/Nebraskaland says Louisville State Recreation Area is 2.8 miles below the Platte River State Park Decker Creek stop on the improved lower-Platte water trail.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/"
      },
      {
        "label": "Public access",
        "value": "Decker Creek stop and Louisville boat ramp",
        "note": "Outdoor Nebraska says Platte River State Park has a canoe/kayak access point a few yards from the mouth of Decker Creek, and Louisville State Recreation Area offers canoe/kayak access to the Platte River with a public ramp and parking area.",
        "sourceUrl": "https://outdoornebraska.gov/location/louisville/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 06805500",
        "note": "USGS Water Services returned current Platte River at Louisville values during implementation: 5,150 cfs and 3.45 ft at 2026-06-22 15:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06805500/"
      },
      {
        "label": "Paddling thresholds",
        "value": "5,000 / 7,000-12,000 / 16,000 cfs",
        "note": "Nebraskaland quotes NGPC biologist Joel Jorgensen using the Louisville USGS gauge: ideal paddling is 7,000-12,000 cfs, below 5,000 cfs is too little, above 16,000 cfs requires extreme caution, and 18,000 cfs is an avoid level.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/"
      },
      {
        "label": "Camping context",
        "value": "Louisville river campsite and nearby campground",
        "note": "Outdoor Nebraska / Nebraskaland says Louisville State Recreation Area offers canoe and kayak access to the Platte River, a special campsite on the river, and nearby River View Campground access from the river by steep bank.",
        "sourceUrl": "https://outdoornebraska.gov/location/louisville/"
      },
      {
        "label": "Nebraska access caveat",
        "value": "Surface open, beds and banks private",
        "note": "NGPC/Nebraskaland warns that paddlers need permission to stop on banks, sandbars, or the stream bed, except where necessary to portage around obstacles or walk through shallow water.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Nebraskaland Platte River Water Trail",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/platte-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "NGPC Platte River State Park",
        "url": "https://outdoornebraska.gov/location/platte-river/",
        "provider": "local"
      },
      {
        "label": "NGPC Louisville State Recreation Area",
        "url": "https://outdoornebraska.gov/location/louisville/",
        "provider": "local"
      },
      {
        "label": "USGS 06805500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06805500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "loup-river-george-syas-monroe",
    "slug": "loup-river-george-syas-monroe",
    "name": "Loup River",
    "riverId": "loup-river",
    "reach": "George D. Syas WMA to Monroe county access",
    "aliases": [
      "Loup River Water Trail - George D. Syas WMA to Monroe",
      "Loup River - George D. Syas to Monroe",
      "George D. Syas WMA fishing access to Monroe county access"
    ],
    "state": "Nebraska",
    "region": "Central Nebraska",
    "summary": "Short central-Nebraska Loup River water-trail segment from the George D. Syas WMA fishing access to the county access south of Monroe. Nebraska Game and Parks / Nebraskaland ties the route family to the direct Genoa USGS gauge and supports a conservative low-water floor for this upstream segment.",
    "statusText": "Use the Loup River near Genoa gauge. Around 350 cfs is the conservative low-water marker from Nebraska Game and Parks / Nebraskaland route testing; below that expect shallow channel hunting and dragging. No ideal range or high cutoff is claimed.",
    "latitude": 41.43328221,
    "longitude": -97.68464875,
    "gaugeSource": {
      "id": "usgs-06793000",
      "provider": "usgs",
      "siteId": "06793000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Loup River near Genoa, Nebr.",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks",
        "strainers"
      ],
      "safetyNotes": [
        "Wide braided channels, wind, and fresh wood can matter more than the easy rating suggests.",
        "Nebraska access rules are stricter than many paddlers expect; stay with the named public endpoints and avoid stopping on private banks or the stream bed without permission except when safety requires it.",
        "Inspect the Monroe take-out before launching because the coordinate is a practical public-access anchor from official directions plus satellite verification, not a surveyed ramp point."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 350,
      "thresholdSource": {
        "label": "Nebraska Game and Parks / Nebraskaland Loup River Water Trail flow guidance",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "Nebraska Game and Parks says March through June usually has more water, while summer is usually lower but still often navigable because Loup Power District maintains at least 275 cfs in the river. Check same-day flow, wind, channel shape, and fresh wood before committing.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short scenic sand-bed river day, but the route still asks paddlers to pick the deepest braid, manage wind exposure, avoid fresh wood, and stay disciplined about the Monroe take-out.",
      "confidenceNotes": "Confidence is good for a conservative Nebraska add: Nebraska Game and Parks / Nebraskaland documents the George D. Syas WMA start, the Monroe county access with parking, and the direct relationship to USGS 06793000 near Genoa; the City of Columbus repeats the Monroe public-access approach directions and parking/sign context; and USGS Water Services returned same-day 2026-06-18 values for 06793000. The app keeps the route minimum-only because the strongest numeric support is a 350 cfs George D. Syas-to-Monroe test plus a maintained 275 cfs baseflow, not a full official paddling band. Endpoint coordinates are practical public-access anchors rather than survey-grade ramp points."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "George D. Syas to Monroe, about 8 mi",
        "note": "Outdoor Nebraska / Nebraskaland says the county built the Monroe access eight miles downstream from the George D. Syas WMA fishing access, making this the short upper segment of the managed water-trail family.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/"
      },
      {
        "label": "Public access",
        "value": "George D. Syas WMA and Monroe county access",
        "note": "Outdoor Nebraska / Nebraskaland identifies the existing George D. Syas WMA fishing access as the upstream start and says Monroe uses a county-built access with parking; the City of Columbus also says the Monroe site has designated parking and a trail sign.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 06793000",
        "note": "USGS Water Services returned current Loup River near Genoa values during implementation: 340 cfs and 4.41 ft at 2026-06-18 11:45 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/"
      },
      {
        "label": "Threshold support",
        "value": "350 cfs minimum-only",
        "note": "Nebraskaland says Loup Power District maintains at least 275 cfs in the river and reports that a 350 cfs Genoa-gauge test from George D. Syas WMA to Monroe required deep-channel work but rarely walking. Paddle Today uses 350 cfs as a conservative floor and does not infer a high-water cutoff.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "41.43328221, -97.68464875 to 41.471508, -97.602729",
        "note": "The George D. Syas coordinate is the public-display NGPC Public Access Atlas anchor for the named WMA fishing access. The Monroe coordinate is the end-of-road public access area manually verified in Google Maps satellite imagery from the official city directions south of Monroe on 370th Avenue, then east to the road end.",
        "sourceUrl": "https://www.columbusne.us/435/Loup-River-Water-Trail"
      },
      {
        "label": "Nebraska access caveat",
        "value": "Surface open, banks and stream bed private",
        "note": "Outdoor Nebraska / Nebraskaland warns that paddlers need permission to camp, picnic, or otherwise stop on private banks or the stream bed except when safety requires it.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Outdoor Nebraska / Nebraskaland Loup River Water Trail",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "City of Columbus Loup River Water Trail",
        "url": "https://www.columbusne.us/435/Loup-River-Water-Trail",
        "provider": "local"
      },
      {
        "label": "USGS 06793000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "loup-river-monroe-columbus",
    "slug": "loup-river-monroe-columbus",
    "name": "Loup River",
    "riverId": "loup-river",
    "reach": "Monroe county access to Columbus",
    "aliases": [
      "Loup River Water Trail - Monroe to Columbus",
      "Loup River - Monroe to Columbus",
      "Monroe county access south of Monroe to Columbus hotel-side finish"
    ],
    "state": "Nebraska",
    "region": "Central Nebraska",
    "summary": "Managed middle Loup River Water Trail segment from the county access south of Monroe to the hotel-side finish in Columbus. City of Columbus materials describe this as the main 16-mile / 6-to-8-hour float in the public water-trail chain.",
    "statusText": "Use the Loup River near Genoa gauge. Around 350 cfs is the conservative low-water marker from Nebraska Game and Parks / Nebraskaland route testing; below that expect shallow channel hunting and dragging. No ideal range or high cutoff is claimed.",
    "latitude": 41.46117475580161,
    "longitude": -97.59934674467611,
    "gaugeSource": {
      "id": "usgs-06793000",
      "provider": "usgs",
      "siteId": "06793000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Loup River near Genoa, Nebr.",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks",
        "strainers"
      ],
      "safetyNotes": [
        "This is the core long Loup water-trail day. Wind, shallow-channel choices, and fresh wood can matter more than the easy rating suggests.",
        "Nebraska access rules are strict: the water is public, but banks and stream bed are private unless safety or obstacle portage requires brief contact.",
        "The Columbus finish is a simple hotel-side access with a trail walk, not a marina. Confirm current parking, trail circulation, and riverbank footing before leaving the upstream vehicle."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 350,
      "thresholdSource": {
        "label": "Nebraska Game and Parks / Nebraskaland Loup River Water Trail flow guidance",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "Spring usually offers more water, but summer remains paddlable when the maintained baseflow and same-day channel shape cooperate. Check wind, fresh wood, and finish access before committing.",
      "difficulty": "moderate",
      "difficultyNotes": "Technically straightforward paddling, but the 16-mile middle segment is a committed day that asks for steady pace, route-finding discipline, and a real shuttle plan.",
      "confidenceNotes": "Confidence is good for a conservative Nebraska add: Nebraskaland and the City of Columbus still document the Monroe and Columbus access story plus the 16-mile / 6-to-8-hour route shape, and same-day USGS Water Services returned current direct Genoa gauge data at 391 cfs and 4.42 ft on 2026-07-06. The app keeps the route minimum-only because the strongest numeric support is still the family-wide 350 cfs floor and the 1,600 cfs middle-segment trip narrative, not a full official paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Monroe to Columbus, about 16 mi / 6-8 hr",
        "note": "The City of Columbus says the Monroe-to-Columbus portion is a 16-mile trek, and the official trail sign frames it as a six-to-eight-hour float.",
        "sourceUrl": "https://www.columbusne.us/CivicAlerts.aspx?AID=1190&ARC=1617"
      },
      {
        "label": "Public access chain",
        "value": "Monroe county access to Columbus hotel-side finish",
        "note": "The City of Columbus says Monroe has designated parking and a trail sign, while Columbus uses the Ramada / Quality Inn parking area plus Pawnee Park Trail access from the riverbank.",
        "sourceUrl": "https://www.columbusne.us/CivicAlerts.aspx?AID=1190&ARC=1617"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 06793000 at 391 cfs / 4.42 ft",
        "note": "USGS Water Services returned current Loup River near Genoa values of 391 cfs and 4.42 ft at 2026-07-06 02:45 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/"
      },
      {
        "label": "Threshold support",
        "value": "350 cfs minimum-only",
        "note": "Nebraskaland says the George D. Syas-to-Monroe test at 350 cfs required deep-channel work but little walking, while the Monroe-to-Columbus run at 1,600 cfs had enough water throughout the channel. Paddle Today keeps the route minimum-only and does not infer a high-water ceiling.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/"
      },
      {
        "label": "Current access caveat",
        "value": "Pawnee Park underpass closed since June 9, 2025",
        "note": "The City of Columbus says the underpass connecting East and West Pawnee Park closed on June 9, 2025 and will remain closed for the foreseeable future, so paddlers should verify current pedestrian circulation for the hotel-side finish.",
        "sourceUrl": "https://www.columbusne.us/CivicAlerts.asp?AID=1957"
      }
    ],
    "sourceLinks": [
      {
        "label": "Outdoor Nebraska / Nebraskaland Loup River Water Trail",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "City of Columbus Loup River Water Trail article",
        "url": "https://www.columbusne.us/CivicAlerts.aspx?AID=1190&ARC=1617",
        "provider": "local"
      },
      {
        "label": "USGS 06793000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "loup-river-george-syas-columbus",
    "slug": "loup-river-george-syas-columbus",
    "name": "Loup River",
    "riverId": "loup-river",
    "reach": "George D. Syas WMA to Columbus",
    "aliases": [
      "Loup River Water Trail - George D. Syas WMA to Columbus",
      "Loup River - George D. Syas to Columbus",
      "George D. Syas WMA fishing access to Columbus hotel-side take-out"
    ],
    "state": "Nebraska",
    "region": "Central Nebraska",
    "summary": "Full managed Loup River Water Trail continuation from the George D. Syas WMA fishing access to Columbus. This combines the official 8-mile upper segment and the 16-mile Monroe-to-Columbus segment into a long same-gauge Nebraska day.",
    "statusText": "Use the Loup River near Genoa gauge. Around 350 cfs is the conservative low-water marker from Nebraska Game and Parks / Nebraskaland route testing; below that expect shallow channel hunting and dragging. No ideal range or high cutoff is claimed.",
    "latitude": 41.43328221,
    "longitude": -97.68464875,
    "gaugeSource": {
      "id": "usgs-06793000",
      "provider": "usgs",
      "siteId": "06793000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Loup River near Genoa, Nebr.",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks",
        "strainers"
      ],
      "safetyNotes": [
        "This is a long braided-river commitment. Wind, shallow-channel choices, and fresh wood stack up over more than one access segment rather than resetting at Monroe.",
        "Nebraska access rules are strict: the water is public, but banks and stream bed are private unless safety or obstacle portage requires brief contact.",
        "The Columbus finish is simple rather than marina-like. Confirm current hotel-side parking, trail access, and riverbank footing before leaving the upstream vehicle."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 350,
      "thresholdSource": {
        "label": "Nebraska Game and Parks / Nebraskaland Loup River Water Trail flow guidance",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "Spring usually offers more water, but this full route can still go in summer at maintained baseflow if channel selection and wind are manageable. Rising water and storms make the long commitment less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "Technically straightforward paddling, but the full 24-mile water-trail continuation demands stamina, route-finding discipline, and a real all-day mindset.",
      "confidenceNotes": "Confidence is good for a conservative long-route add: Nebraskaland documents the three public access points and segment mileages, the City of Columbus repeats the Monroe access directions and Columbus finish story, and same-day USGS Water Services returned current direct Genoa gauge data. Endpoint coordinates remain practical public-access anchors rather than survey-grade launch pins."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "George D. Syas to Monroe to Columbus, about 24 mi",
        "note": "Outdoor Nebraska / Nebraskaland says the county-built Monroe access is eight miles below George D. Syas WMA and Columbus is 16 miles farther downstream, supporting a roughly 24-mile full continuation.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/"
      },
      {
        "label": "Public access chain",
        "value": "George D. Syas WMA, Monroe county access, Columbus hotel-side finish",
        "note": "Nebraskaland identifies the George D. Syas fishing access, the county-built Monroe access with parking, and the Quality Inn parking lot plus Pawnee Park Trail walk at Columbus. The City of Columbus repeats the Monroe and Columbus access story.",
        "sourceUrl": "https://www.columbusne.us/CivicAlerts.aspx?AID=1190&ARC=1617"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 06793000 at 321 cfs / 4.31 ft",
        "note": "USGS Water Services returned current Loup River near Genoa values during implementation: 321 cfs and 4.31 ft at 2026-07-02 08:45 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/"
      },
      {
        "label": "Threshold support",
        "value": "350 cfs minimum-only",
        "note": "Nebraskaland says the George D. Syas-to-Monroe test at 350 cfs required deep-channel work but little walking, while the Monroe-to-Columbus run at 1,600 cfs had enough water throughout the channel. Paddle Today keeps the route minimum-only and does not infer a high-water ceiling.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/"
      },
      {
        "label": "Current access caveat",
        "value": "Pawnee Park underpass closed since June 9, 2025",
        "note": "The City of Columbus says the underpass connecting East and West Pawnee Park closed on June 9, 2025 and will remain closed for the foreseeable future, so paddlers should verify the current pedestrian connection and follow on-site detours for the hotel-side finish.",
        "sourceUrl": "https://www.columbusne.us/m/newsflash/home/detail/1957"
      }
    ],
    "sourceLinks": [
      {
        "label": "Outdoor Nebraska / Nebraskaland Loup River Water Trail",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "City of Columbus Loup River Water Trail article",
        "url": "https://www.columbusne.us/CivicAlerts.aspx?AID=1190&ARC=1617",
        "provider": "local"
      },
      {
        "label": "USGS 06793000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "loup-river-monroe-adm-access",
    "slug": "loup-river-monroe-adm-access",
    "name": "Loup River",
    "riverId": "loup-river",
    "reach": "Monroe county access to ADM access site",
    "aliases": [
      "Loup River Water Trail - Monroe to ADM",
      "Loup River - Monroe to ADM",
      "Monroe county access south of Monroe to ADM access site"
    ],
    "state": "Nebraska",
    "region": "Central Nebraska",
    "summary": "Long lower Loup River Water Trail continuation from the county access south of Monroe to the newer ADM access site below Columbus. This combines the official 16-mile Monroe-to-Columbus float and the final 4.5-mile Columbus-to-ADM continuation into one same-gauge day.",
    "statusText": "Use the Loup River near Genoa gauge. Around 350 cfs is the conservative low-water marker from Nebraska Game and Parks / Nebraskaland route testing; below that expect shallow channel hunting and dragging. No ideal range or high cutoff is claimed.",
    "latitude": 41.46117475580161,
    "longitude": -97.59934674467611,
    "gaugeSource": {
      "id": "usgs-06793000",
      "provider": "usgs",
      "siteId": "06793000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Loup River near Genoa, Nebr.",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks",
        "strainers"
      ],
      "safetyNotes": [
        "This is a long sandy-river commitment. Wind, wrong-channel choices, and fresh wood can stack up before the industrial-style finish.",
        "Nebraska access rules are strict: the water is public, but banks and stream bed are private unless safety or obstacle portage requires brief contact.",
        "The final access is a leased area on ADM property rather than a park ramp. Inspect current signage, fencing, and riverbank footing before leaving the upstream vehicle."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 350,
      "thresholdSource": {
        "label": "Nebraska Game and Parks / Nebraskaland Loup River Water Trail flow guidance",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "This long lower continuation shares the same Genoa-gauge reality as the upstream trail: spring usually offers more water, while summer is still possible at maintained baseflow if wind, channel shape, and downstream access all cooperate.",
      "difficulty": "moderate",
      "difficultyNotes": "Technically straightforward paddling, but the 20.5-mile continuation asks for stamina, route-finding discipline, and a careful finish plan at a simple leased access area.",
      "confidenceNotes": "Confidence is good for a conservative Nebraska add: Nebraskaland and the City of Columbus still document the Monroe, Columbus, and ADM access chain plus the 16-mile and 4.5-mile segment lengths, and same-day USGS Water Services returned current direct Genoa gauge data at 391 cfs and 4.42 ft on 2026-07-06. The app keeps the route minimum-only because the strongest numeric support remains the family-wide 350 cfs floor and 1,600 cfs middle-segment evidence rather than a full official paddling range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Monroe to Columbus to ADM, about 20.5 mi",
        "note": "The City of Columbus describes Monroe to Columbus as 16 miles, and Nebraskaland says the ADM point sits 4.5 miles downstream of Columbus, supporting a roughly 20.5-mile continuation.",
        "sourceUrl": "https://www.columbusne.us/CivicAlerts.aspx?AID=1190&ARC=1617"
      },
      {
        "label": "Public access chain",
        "value": "Monroe county access, Columbus hotel-side finish, ADM access site",
        "note": "The City of Columbus says Monroe has designated parking and the Columbus finish uses the Ramada / Quality Inn lot plus Pawnee Park Trail, while a separate city announcement says the downstream leased access area lies south of Southeast 9th Street abutting the Loup River.",
        "sourceUrl": "https://www.columbusne.us/CivicAlerts.aspx?AID=1328"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 06793000 at 391 cfs / 4.42 ft",
        "note": "USGS Water Services returned current Loup River near Genoa values of 391 cfs and 4.42 ft at 2026-07-06 02:45 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/"
      },
      {
        "label": "Threshold support",
        "value": "350 cfs minimum-only",
        "note": "Nebraskaland says the George D. Syas-to-Monroe test at 350 cfs required deep-channel work but little walking, while the Monroe-to-Columbus run at 1,600 cfs had enough water throughout the channel. Paddle Today uses 350 cfs as a conservative floor without inferring a high-water ceiling for the whole trail family.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/"
      },
      {
        "label": "ADM anchor",
        "value": "41.41603951, -97.2865376",
        "note": "Global Energy Monitor lists the Columbus ADM power station at 41.41603951, -97.2865376. Paddle Today uses this only as a nearby practical anchor for the leased downstream access area identified by the City of Columbus, not as a surveyed river launch coordinate.",
        "sourceUrl": "https://www.gem.wiki/Columbus_ADM_power_station"
      }
    ],
    "sourceLinks": [
      {
        "label": "Outdoor Nebraska / Nebraskaland Loup River Water Trail",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "City of Columbus Loup River Water Trail article",
        "url": "https://www.columbusne.us/CivicAlerts.aspx?AID=1190&ARC=1617",
        "provider": "local"
      },
      {
        "label": "City of Columbus ADM access announcement",
        "url": "https://www.columbusne.us/CivicAlerts.aspx?AID=1328",
        "provider": "local"
      },
      {
        "label": "USGS 06793000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "loup-river-columbus-adm-access",
    "slug": "loup-river-columbus-adm-access",
    "name": "Loup River",
    "riverId": "loup-river",
    "reach": "Columbus hotel-side access to ADM access site",
    "aliases": [
      "Loup River Water Trail - Columbus to ADM",
      "Loup River - Pawnee Park to ADM",
      "Columbus Ramada / Quality Inn access to ADM access site"
    ],
    "state": "Nebraska",
    "region": "Central Nebraska",
    "summary": "Short lower Loup River Water Trail continuation from the Columbus hotel-side access to the newer ADM access site. City of Columbus materials describe this as the final two-to-three-hour float in the managed water-trail chain.",
    "statusText": "Use the Loup River near Genoa gauge. Around 350 cfs is the conservative low-water marker from Nebraska Game and Parks / Nebraskaland route testing; below that expect shallow channel hunting and dragging. No ideal range or high cutoff is claimed.",
    "latitude": 41.4195401,
    "longitude": -97.3672208,
    "gaugeSource": {
      "id": "usgs-06793000",
      "provider": "usgs",
      "siteId": "06793000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Loup River near Genoa, Nebr.",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks",
        "strainers"
      ],
      "safetyNotes": [
        "This is the shortest Loup segment, but it still runs through a wide sandy channel where wind, wrong-channel choices, and fresh wood can matter.",
        "Nebraska access rules are strict: the water is public, but banks and stream bed are private unless safety or obstacle portage requires brief contact.",
        "The downstream endpoint is a leased access area on industrial property rather than a park ramp. Inspect current signage, fencing, and riverbank footing before launching."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 350,
      "thresholdSource": {
        "label": "Nebraska Game and Parks / Nebraskaland Loup River Water Trail flow guidance",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "This short lower segment shares the same Genoa-gauge reality as the upstream trail. Low summer water can still go, but wind, exposed bars, and any muddy industrial-bank finish should be checked the same day.",
      "difficulty": "easy",
      "difficultyNotes": "This is the easiest mileage in the Loup chain, but it still expects paddlers to read the deepest braid, manage wind, and finish at a simple access point rather than a marina.",
      "confidenceNotes": "Confidence is acceptable for a conservative add: the City of Columbus says visitors can enter at Pawnee Park and exit at the ADM site for a two-to-three-hour float, the same city materials identify the leased access area south of Southeast 9th Street and link to a location map, Nebraskaland says the fourth point sits 4.5 miles downstream of Columbus, and same-day USGS Water Services returned current direct Genoa gauge data. The ADM coordinate is a nearby practical industrial-site anchor, not a surveyed launch pin."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Columbus to ADM, about 4.5 mi / 2-3 hr",
        "note": "Nebraskaland says a fourth Loup River Water Trail point was developed 4.5 miles downstream of Columbus, and the City of Columbus says paddlers can enter at Pawnee Park and exit at the ADM site for a two-to-three-hour float.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/"
      },
      {
        "label": "Public access",
        "value": "Hotel-side Columbus access to leased ADM access area",
        "note": "The City of Columbus says the Columbus trail access is behind the Ramada / Quality Inn and that the downstream access is a leased recreational area on ADM property in the general area south of Southeast 9th Street abutting the Loup River.",
        "sourceUrl": "https://www.columbusne.us/CivicAlerts.aspx?AID=1328"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 06793000 at 321 cfs / 4.31 ft",
        "note": "USGS Water Services returned current Loup River near Genoa values during implementation: 321 cfs and 4.31 ft at 2026-07-02 08:45 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/"
      },
      {
        "label": "Threshold support",
        "value": "350 cfs minimum-only",
        "note": "Nebraskaland reports that 350 cfs on the upper segment required deep-channel work but little walking, while 1,600 cfs was ample across the Monroe-to-Columbus segment. Paddle Today uses 350 cfs as a conservative floor without inferring a high-water ceiling for the whole trail family.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/"
      },
      {
        "label": "ADM anchor",
        "value": "41.41603951, -97.2865376",
        "note": "Global Energy Monitor lists the Columbus ADM power station at 41.41603951, -97.2865376. Paddle Today uses this only as a nearby practical anchor for the leased downstream access area identified by the City of Columbus, not as a surveyed river launch coordinate.",
        "sourceUrl": "https://www.gem.wiki/Columbus_ADM_power_station"
      }
    ],
    "sourceLinks": [
      {
        "label": "Outdoor Nebraska / Nebraskaland Loup River Water Trail",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "City of Columbus ADM access announcement",
        "url": "https://www.columbusne.us/CivicAlerts.aspx?AID=1328",
        "provider": "local"
      },
      {
        "label": "USGS 06793000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "loup-river-george-syas-adm-access",
    "slug": "loup-river-george-syas-adm-access",
    "name": "Loup River",
    "riverId": "loup-river",
    "reach": "George D. Syas WMA to ADM access site",
    "aliases": [
      "Loup River Water Trail - George D. Syas WMA to ADM",
      "Loup River - George D. Syas to ADM",
      "George D. Syas WMA fishing access to ADM access site south of Southeast 9th Street"
    ],
    "state": "Nebraska",
    "region": "Central Nebraska",
    "summary": "Longest public Loup River Water Trail continuation from the George D. Syas WMA fishing access to the downstream ADM access site below Columbus. This combines the official 8-mile upper segment, the 16-mile Monroe-to-Columbus day, and the final 4.5-mile ADM continuation into one same-gauge route.",
    "statusText": "Use the Loup River near Genoa gauge. Around 350 cfs is the conservative low-water marker from Nebraska Game and Parks / Nebraskaland route testing; below that expect shallow channel hunting and dragging. No ideal range or high cutoff is claimed.",
    "latitude": 41.43328221,
    "longitude": -97.68464875,
    "gaugeSource": {
      "id": "usgs-06793000",
      "provider": "usgs",
      "siteId": "06793000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Loup River near Genoa, Nebr.",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks",
        "strainers"
      ],
      "safetyNotes": [
        "This is the full braided-river commitment. Wind, shallow-channel choices, and fresh wood compound across more than one access segment rather than resetting at Monroe or Columbus.",
        "Nebraska access rules are strict: the water is public, but banks and stream bed are private unless safety or obstacle portage requires brief contact.",
        "The final access is a leased area on ADM property rather than a park ramp. Confirm current finish signage, fencing, and riverbank footing before leaving the upstream vehicle."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 350,
      "thresholdSource": {
        "label": "Nebraska Game and Parks / Nebraskaland Loup River Water Trail flow guidance",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "Spring usually offers the cleanest water and easiest channels, but the full continuation can still go in summer when maintained baseflow, weather, and the simple downstream access all cooperate. Rising water and storms make the route substantially less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "Technically straightforward paddling, but the 28.5-mile full continuation is a serious all-day river commitment that demands pace, route-finding discipline, and clean shuttle execution.",
      "confidenceNotes": "Confidence is good for a conservative long-route add: Nebraskaland and the City of Columbus still document the George D. Syas, Monroe, Columbus, and ADM access chain plus the 8-mile, 16-mile, and 4.5-mile segment evidence, and same-day USGS Water Services returned current direct Genoa gauge data at 391 cfs and 4.42 ft on 2026-07-06. The app keeps the route minimum-only because the strongest numeric support is still the family-wide 350 cfs floor and 1,600 cfs middle-segment evidence, not a full official paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "George D. Syas to Monroe to Columbus to ADM, about 28.5 mi",
        "note": "Nebraskaland says Monroe is eight miles below George D. Syas WMA, the City of Columbus says Monroe to Columbus is 16 miles, and Nebraskaland says the ADM point sits 4.5 miles downstream of Columbus, supporting a roughly 28.5-mile full continuation.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/"
      },
      {
        "label": "Public access chain",
        "value": "George D. Syas WMA, Monroe county access, Columbus hotel-side finish, ADM access site",
        "note": "Nebraskaland identifies the George D. Syas fishing access, the county-built Monroe access with parking, and the Quality Inn parking plus Pawnee Park Trail arrangement in Columbus, while the City of Columbus separately identifies the leased ADM access area south of Southeast 9th Street.",
        "sourceUrl": "https://www.columbusne.us/CivicAlerts.aspx?AID=1328"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 06793000 at 391 cfs / 4.42 ft",
        "note": "USGS Water Services returned current Loup River near Genoa values of 391 cfs and 4.42 ft at 2026-07-06 02:45 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/"
      },
      {
        "label": "Threshold support",
        "value": "350 cfs minimum-only",
        "note": "Nebraskaland says the George D. Syas-to-Monroe test at 350 cfs required deep-channel work but little walking, while the Monroe-to-Columbus run at 1,600 cfs had enough water throughout the channel. Paddle Today keeps the full continuation minimum-only and does not infer a high-water ceiling.",
        "sourceUrl": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/"
      },
      {
        "label": "Current access caveat",
        "value": "Pawnee Park underpass closed since June 9, 2025",
        "note": "The City of Columbus says the underpass connecting East and West Pawnee Park closed on June 9, 2025 and will remain closed for the foreseeable future, so paddlers should verify current pedestrian circulation near the Columbus checkpoint and downstream shuttle finish.",
        "sourceUrl": "https://www.columbusne.us/CivicAlerts.asp?AID=1957"
      }
    ],
    "sourceLinks": [
      {
        "label": "Outdoor Nebraska / Nebraskaland Loup River Water Trail",
        "url": "https://magazine.outdoornebraska.gov/stories/travel-and-adventure/loup-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "City of Columbus Loup River Water Trail article",
        "url": "https://www.columbusne.us/CivicAlerts.aspx?AID=1190&ARC=1617",
        "provider": "local"
      },
      {
        "label": "City of Columbus ADM access announcement",
        "url": "https://www.columbusne.us/CivicAlerts.aspx?AID=1328",
        "provider": "local"
      },
      {
        "label": "USGS 06793000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06793000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "niobrara-river-fort-niobrara-smith-falls",
    "slug": "niobrara-river-fort-niobrara-smith-falls",
    "name": "Niobrara River",
    "riverId": "niobrara-river",
    "reach": "Fort Niobrara NWR launch to Nichols Landing, Smith Falls State Park",
    "aliases": [
      "Niobrara National Scenic River - Cornell Bridge to Smith Falls",
      "Fort Niobrara launch to Smith Falls",
      "Niobrara River Cornell Bridge to Nichols Landing"
    ],
    "state": "Nebraska",
    "region": "Niobrara National Scenic River",
    "summary": "A public-access Niobrara National Scenic River float from the Fort Niobrara NWR launch near Cornell Bridge to Nichols Landing at Smith Falls State Park. The NPS identifies this as a standard 3–4 hour day float with outfitter shuttle support and public camping at Smith Falls.",
    "statusText": "Use the direct Niobrara River near Sparks gauge (USGS 06461500). The Nebraska flow study identifies 600–900 cfs as optimal, 460–1,200 cfs as acceptable, below 340 cfs as unboatable, and above 1,200 cfs as high; these are boating-flow guidance bands, not a substitute for scouting rapids, wood, weather, or same-day access conditions.",
    "latitude": 42.893222,
    "longitude": -100.476967,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["whitewater", "strainers", "fast_rise", "mandatory_takeout", "private_banks", "remote"],
      "safetyNotes": [
        "NPS identifies the Fort Niobrara launch near Cornell Bridge and Nichols Landing at Smith Falls as public access points for canoes, kayaks, and tubes.",
        "The reach contains moving water, rapids, wood, waterfalls, and private banks. Portage or obey all posted restrictions; do not approach falls or restricted refuge areas from the river.",
        "Check the direct Sparks gauge, weather, river trend, current landing status, and daylight before launching. Outfitters report changing conditions and provide shuttle support, but a private boater remains responsible for route selection and emergency planning."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-06461500", "provider": "usgs", "siteId": "06461500", "metric": "discharge_cfs", "unit": "cfs", "kind": "direct",
      "siteName": "Niobrara River near Sparks, Nebr.",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06461500",
      "hydrographUrl": "https://waterdata.usgs.gov/monitoring-location/06461500/all-graphs/"
    },
    "profile": {
      "thresholdModel": "two-sided", "idealMin": 600, "idealMax": 900, "tooLow": 340, "tooHigh": 1200,
      "thresholdSource": {"label": "Nebraska flows and recreational floating study", "url": "https://govdocs.nebraska.gov/epubs/G1000/B141-2008.pdf", "provider": "local"},
      "thresholdSourceStrength": "official", "rainfallSensitivity": "medium",
      "seasonMonths": [5, 6, 7, 8, 9, 10],
      "seasonNotes": "The state study evaluates boating flows primarily from May through October. Spring and fall can be excellent for canoe and kayak trips; check the live gauge and seasonal access conditions.",
      "difficulty": "moderate",
      "difficultyNotes": "This is moving water with short rapids, wood, private-bank constraints, and a required portage/avoidance plan around named hazards. It is not a casual flatwater float.",
      "confidenceNotes": "NPS documents the exact public launch and landing family and describes the Cornell-to-Smith Falls float as a standard 3–4 hour trip. The Nebraska Game and Parks/NPS flow study supplies official Sparks-gauge boating bands, and USGS 06461500 is the direct gauge near the route. Thresholds describe flow-dependent boating quality, not a guarantee of safe passage; visual scouting, weather, water level trend, and current access notices remain mandatory."
    },
    "evidenceNotes": [
      {"label":"Official route corridor","value":"Cornell Bridge / Fort Niobrara NWR launch to Smith Falls State Park","note":"NPS trip guidance explicitly recommends this 3–4 hour float and says outfitters provide drop-offs and pickups.","sourceUrl":"https://www.nps.gov/niob/planyourvisit/tripideas.htm"},
      {"label":"Public put-in","value":"Fort Niobrara NWR Launch Site near Cornell Bridge","note":"U.S. Fish and Wildlife Service/NPS identify a public canoe, kayak, and tube launch with parking and staging; a $1 launch fee applies.","sourceUrl":"https://www.nps.gov/places/fort-niobrara-nwr-launch-site.htm"},
      {"label":"Public take-out and camping","value":"Nichols Landing, Smith Falls State Park","note":"NPS identifies Nichols Landing as a public canoe/kayak/tube launch and landing; the state park provides camping, parking, restrooms, and a pass requirement.","sourceUrl":"https://www.nps.gov/places/nichols-landing.htm"},
      {"label":"Direct live gauge","value":"USGS 06461500 near Sparks","note":"USGS provides continuous discharge and gage-height telemetry for the Niobrara reach near the route.","sourceUrl":"https://waterdata.usgs.gov/monitoring-location/USGS-06461500"},
      {"label":"Official flow guidance","value":"340 cfs too-low; 460–1,200 cfs acceptable; 600–900 cfs optimal; above 1,200 cfs high","note":"Nebraska’s official flow/recreation study calibrates these bands to the Sparks gauge and emphasizes boatability, safety, and trip quality.","sourceUrl":"https://govdocs.nebraska.gov/epubs/G1000/B141-2008.pdf"},
      {"label":"Image decision","value":"Approved Niobrara River river-group context image","note":"A rights-cleared Niobrara River image near Spencer is bundled as river-level context; it is not presented as a Cornell or Nichols Landing endpoint photograph."}
    ],
    "sourceLinks": [
      {"label":"NPS Niobrara trip ideas","url":"https://www.nps.gov/niob/planyourvisit/tripideas.htm","provider":"nps"},
      {"label":"Fort Niobrara NWR launch","url":"https://www.nps.gov/places/fort-niobrara-nwr-launch-site.htm","provider":"nps"},
      {"label":"Nichols Landing / Smith Falls","url":"https://www.nps.gov/places/nichols-landing.htm","provider":"nps"},
      {"label":"Nebraska flow and recreation study","url":"https://govdocs.nebraska.gov/epubs/G1000/B141-2008.pdf","provider":"local"},
      {"label":"USGS 06461500 monitoring location","url":"https://waterdata.usgs.gov/monitoring-location/USGS-06461500","provider":"usgs"}
    ],
    "scoreEligibility": "scored"
  }
];
