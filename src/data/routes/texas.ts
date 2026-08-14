// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const texasRoutes: River[] = [
  {
    "id": "guadalupe-river-fm766-sh72",
    "slug": "guadalupe-river-fm766-sh72",
    "name": "Guadalupe River",
    "reach": "FM 766 (Hell's Gate) to SH 72",
    "aliases": [
      "Guadalupe Valley Paddling Trail - FM 766 to SH 72",
      "Guadalupe River - Hell's Gate to SH 72",
      "FM 766 to SH 72 Guadalupe segment"
    ],
    "state": "Texas",
    "region": "South Texas",
    "summary": "Short Cuero Guadalupe run from Hell's Gate to SH 72. TPWD still documents the exact 6.6-mile segment and direct access points, and the Cuero USGS gauge gives a same-river condition check before the remnant-dam portage.",
    "statusText": "Use the Guadalupe River at Cuero gauge. Around 200 cfs is the conservative low-water floor for FM 766 to SH 72. No upper cfs band is claimed; high or rising water makes the remnant-dam portage and faster riffles more consequential.",
    "latitude": 29.1472,
    "longitude": -97.3177,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Mandatory portage around the remnant dam about 2.5 miles below FM 766; scout early and do not run it blindly.",
        "Low water can expose more wood and make the remnant-dam line awkward, while high or rising water can turn the whole reach pushy quickly.",
        "Use only the named public bridge accesses and respect private banks except when a hazard portage within the navigable corridor is necessary."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08175800",
      "provider": "usgs",
      "siteId": "08175800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Guadalupe Rv at Cuero, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08175800/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows five-level Guadalupe / Cuero gauge table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This route can work much of the year, but the Cuero reach is rainfall-sensitive. Runoff can create temporary high flows, stronger current, and poorer water quality, so same-day weather and river checks matter.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is short, but this is not a lazy beginner drift. TPWD describes faster riffles on a reach that also requires a mandatory portage around remnant dam structure, so paddlers need to recognize hazards, manage eddies, and handle short carries.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD currently names the exact FM 766-to-SH 72 segment with coordinates, mileage, route description, and hazard guidance; USGS 08175800 is the direct same-river gauge at Cuero; and the legacy Texas River Flows table ties a 200 cfs minimum to that same gauge. Confidence stays intentionally conservative because the threshold floor comes from an older corridor-wide flow table rather than a modern route-specific band, so the route ships minimum-only and does not claim an upper scoring range."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 08175800 at 2,200 cfs / 10.86 ft",
        "note": "USGS Water Services returned same-day June 21, 2026 discharge and stage values for Guadalupe River at Cuero, confirming the direct live gauge path used for this route.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08175800/"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "The Texas River Flows five-level table lists Guadalupe Gonzales to Victoria on the Cuero gauge with a first-tier 200 cfs minimum, defined as the minimum water available for floating. Paddle Today uses only that conservative floor and does not infer an ideal or upper scoring band.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Official route shape",
        "value": "FM 766 to SH 72, 6.6 mi",
        "note": "Current TPWD trail material identifies FM 766 to SH 72 as the shorter upstream segment of the Guadalupe Valley Paddling Trail and lists a 2-4 hour float time.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/guadalupe-valley/"
      },
      {
        "label": "Exact public launch coordinates",
        "value": "29.1472, -97.3177 to 29.0903, -97.3296",
        "note": "TPWD publishes FM 766 (Hell's Gate) and SH 72 as access points with current GPS coordinates and bridge-side driving directions.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/guadalupe-valley/"
      },
      {
        "label": "Hazard and bailout context",
        "value": "Remnant-dam portage plus Hwy 183 emergency take-out",
        "note": "TPWD warns that the remnants of a dam about 2.5 miles below FM 766 must be paddled around, notes possible low-water snags, and identifies Hwy 183 as an emergency take-out 2.6 miles below SH 72.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/guadalupe-valley/"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Guadalupe Valley Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/guadalupe-valley/",
        "provider": "local"
      },
      {
        "label": "TPWD Texas River/Stream Flow",
        "url": "https://tpwd.texas.gov/landwater/water/habitats/rivers/river_flow/",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08175800 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08175800/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "guadalupe-river-sh72-fm236",
    "slug": "guadalupe-river-sh72-fm236",
    "name": "Guadalupe River",
    "reach": "SH 72 to FM 236",
    "aliases": [
      "Guadalupe Valley Paddling Trail - SH 72 to FM 236",
      "Guadalupe River - SH 72 to FM 236",
      "Lower Cuero Guadalupe segment"
    ],
    "state": "Texas",
    "region": "South Texas",
    "summary": "Lower Cuero Guadalupe continuation from SH 72 to FM 236. TPWD still documents the exact 7.2-mile segment and public bridge accesses, and the Cuero USGS gauge gives a direct same-river condition check before committing.",
    "statusText": "Use the Guadalupe River at Cuero gauge. Around 200 cfs is the conservative low-water floor for SH 72 to FM 236. No upper cfs band is claimed; high or rising water can make the longer downstream pools, wood, and bridge-side landings less forgiving.",
    "latitude": 29.0903,
    "longitude": -97.3296,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This lower Cuero segment skips the remnant-dam portage but remains rainfall-sensitive, with faster current and murkier water after storms.",
        "Low water can expose more wood and shallow riffles, while higher flows can make the long open bends and simple bridge accesses feel less forgiving.",
        "Use only the named public bridge accesses and respect private banks except when portaging a hazard within the navigable corridor is necessary."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08175800",
      "provider": "usgs",
      "siteId": "08175800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Guadalupe Rv at Cuero, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08175800/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows five-level Guadalupe / Cuero gauge table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This lower Cuero reach can work much of the year, but it remains rainfall-sensitive. Runoff can create temporary high flows, stronger current, and poorer water quality, so same-day weather and river checks matter.",
      "difficulty": "easy",
      "difficultyNotes": "This is flatter and less technical than the upstream Hell's Gate split, but it is still a real half-day paddle with wood, private-bank limits, and enough current change after rain to justify a conservative same-day call.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD currently names the exact SH 72-to-FM 236 segment with coordinates, mileage, route description, and access guidance; USGS 08175800 is the direct same-river gauge at Cuero; and the legacy Texas River Flows table ties a 200 cfs minimum to that same Cuero gauge. Confidence stays intentionally conservative because the threshold floor comes from an older corridor-wide flow table rather than a modern route-specific band, so the route ships minimum-only and does not claim an upper scoring range."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 08175800 at 408 cfs / 7.33 ft",
        "note": "USGS Water Services returned same-day July 3, 2026 discharge and stage values for Guadalupe River at Cuero, confirming the direct live gauge path used for this route.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08175800/"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "The Texas River Flows five-level table lists Guadalupe Gonzales to Victoria on the Cuero gauge with a first-tier 200 cfs minimum, defined as the minimum water available for floating. Paddle Today uses only that conservative floor and does not infer an ideal or upper scoring band.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Official route shape",
        "value": "SH 72 to FM 236, 7.2 mi",
        "note": "Current TPWD trail material identifies SH 72 to FM 236 as the lower segment of the Guadalupe Valley Paddling Trail and lists a 2-4 hour float time.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/guadalupe-valley/"
      },
      {
        "label": "Exact public launch coordinates",
        "value": "29.0903, -97.3296 to 29.0514, -97.2647",
        "note": "TPWD publishes SH 72 and FM 236 as access points with current GPS coordinates and bridge-side driving directions.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/guadalupe-valley/"
      },
      {
        "label": "Mid-route bailout and hazard context",
        "value": "Hwy 183 emergency take-out plus rain-sensitive current",
        "note": "TPWD identifies Hwy 183 as an emergency take-out 2.6 miles below SH 72 and warns that runoff can create temporary high flows and undesirable water quality conditions on this Cuero reach.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/guadalupe-valley/"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Guadalupe Valley Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/guadalupe-valley/",
        "provider": "local"
      },
      {
        "label": "TPWD Texas River/Stream Flow",
        "url": "https://tpwd.texas.gov/landwater/water/habitats/rivers/river_flow/",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08175800 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08175800/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "guadalupe-river-fm766-fm236",
    "slug": "guadalupe-river-fm766-fm236",
    "name": "Guadalupe River",
    "reach": "FM 766 (Hell's Gate) to FM 236",
    "aliases": [
      "Guadalupe Valley Paddling Trail - full Cuero route",
      "Guadalupe River - Hell's Gate to FM 236",
      "Full Guadalupe Valley Paddling Trail"
    ],
    "state": "Texas",
    "region": "South Texas",
    "summary": "Complete official Guadalupe Valley trail from Hell's Gate to FM 236. TPWD still documents the full 13.8-mile route and all three public accesses, and the Cuero USGS gauge gives a direct same-river condition check before the remnant-dam portage and long downstream finish.",
    "statusText": "Use the Guadalupe River at Cuero gauge. Around 200 cfs is the conservative low-water floor for the full FM 766 to FM 236 trail. No upper cfs band is claimed; high or rising water makes the remnant-dam portage, wood, and long downstream finish more consequential.",
    "latitude": 29.1472,
    "longitude": -97.3177,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Mandatory portage around the remnant dam about 2.5 miles below FM 766; scout early and do not run it blindly.",
        "This full trail adds mileage below SH 72, so high or rising water can turn a short technical issue into a longer judgment problem with fewer easy bank options.",
        "Use only the named public bridge accesses and respect private banks except when a hazard portage within the navigable corridor is necessary."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08175800",
      "provider": "usgs",
      "siteId": "08175800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Guadalupe Rv at Cuero, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08175800/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows five-level Guadalupe / Cuero gauge table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This full trail can work much of the year, but the Cuero reach is rainfall-sensitive. Runoff can create temporary high flows, stronger current, and poorer water quality, so same-day weather and river checks matter.",
      "difficulty": "moderate",
      "difficultyNotes": "The river itself stays mostly straightforward, but 13.8 miles plus the remnant-dam portage create a longer day that demands shuttle discipline, hazard recognition, and energy management even when the gauge looks friendly.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD currently names the full FM 766-to-FM 236 trail with all three public access coordinates, route mileage, float times, and hazard guidance; USGS 08175800 is the direct same-river gauge at Cuero; and the legacy Texas River Flows table ties a 200 cfs minimum to that same Cuero gauge. Confidence stays intentionally conservative because the threshold floor comes from an older corridor-wide flow table rather than a modern route-specific band, so the route ships minimum-only and does not claim an upper scoring range."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 08175800 at 408 cfs / 7.33 ft",
        "note": "USGS Water Services returned same-day July 3, 2026 discharge and stage values for Guadalupe River at Cuero, confirming the direct live gauge path used for this route.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08175800/"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "The Texas River Flows five-level table lists Guadalupe Gonzales to Victoria on the Cuero gauge with a first-tier 200 cfs minimum, defined as the minimum water available for floating. Paddle Today uses only that conservative floor and does not infer an ideal or upper scoring band.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Official route shape",
        "value": "FM 766 to FM 236, 13.8 mi",
        "note": "Current TPWD trail material identifies the full Guadalupe Valley Paddling Trail at about 13.8 miles and says paddlers can do the entire stretch or one of the shorter official segments.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/guadalupe-valley/"
      },
      {
        "label": "Exact public launch coordinates",
        "value": "29.1472, -97.3177 to 29.0514, -97.2647",
        "note": "TPWD publishes FM 766 (Hell's Gate), SH 72, and FM 236 as current public access points with GPS coordinates and bridge-side driving directions.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/guadalupe-valley/"
      },
      {
        "label": "Dam and bailout context",
        "value": "Remnant-dam portage plus Hwy 183 emergency take-out",
        "note": "TPWD warns that the remnants of a dam about 2.5 miles below FM 766 must be paddled around and identifies Hwy 183 as an emergency take-out between SH 72 and FM 236.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/guadalupe-valley/"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Guadalupe Valley Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/guadalupe-valley/",
        "provider": "local"
      },
      {
        "label": "TPWD Texas River/Stream Flow",
        "url": "https://tpwd.texas.gov/landwater/water/habitats/rivers/river_flow/",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08175800 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08175800/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "guadalupe-river-kreutzberg-canyon-bergheim-campground",
    "slug": "guadalupe-river-kreutzberg-canyon-bergheim-campground",
    "name": "Guadalupe River",
    "reach": "Kreutzberg Canyon Natural Area to Bergheim Campground",
    "aliases": [
      "Kreutzberg Canyon to Bergheim",
      "Upper Guadalupe Kreutzberg to FM 3351",
      "Kreutzberg Canyon to Bergheim Campground"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "routeType": "whitewater",
    "summary": "Upper Guadalupe day run from Kendall County's Kreutzberg Canyon Natural Area to Bergheim Campground and River Outfitters at FM 3351. TRPA documents this 12.2-mile segment and Upper Guadalupe flow bands, Kendall County confirms public river frontage at the put-in, and Bergheim publishes private-boat landing, shuttle, and campground terms at the take-out.",
    "statusText": "Use the Guadalupe River near Spring Branch gauge as the Upper Guadalupe flow check. TRPA lists 100 cfs as the minimum, 300-1,200 cfs as the ideal window, and 5,000 cfs as the high-side ceiling; scout the county-park river access, low-water crossings, private-bank limits, and Bergheim landing before committing.",
    "latitude": 29.8998365,
    "longitude": -98.6420277,
    "gaugeSource": {
      "id": "usgs-08167500",
      "provider": "usgs",
      "siteId": "08167500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Guadalupe Rv nr Spring Branch, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08167500/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "TRPA describes the Upper Guadalupe as Class I-III+ water with rain-dependent flow; treat this long upper segment as swiftwater with limited public exits.",
        "Kendall County's public park access is dawn-to-dusk, and Bergheim's private-boat landing requires current fees or arrangements. If either endpoint is closed, posted, crowded, or unsafe, skip the route.",
        "Do not infer stops or camping from river frontage. TRPA warns that Upper Guadalupe banks are private, and Bergheim is the selected paid endpoint landing and campground context.",
        "Hill Country storms can raise the river quickly and load crossings with debris. Use the Spring Branch gauge, visible water level, weather radar, and current road/park conditions before launching."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 1200,
      "tooLow": 100,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Upper Guadalupe flow guidance",
        "url": "https://txrivers.org/discover-texas-rivers/guadalupe-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Upper Guadalupe can work year-round when spring flow, recent rain, and access conditions line up, but TRPA notes that the upper river is rain dependent and can mean dragging during dry periods. Cancel after storms, rising gauges, low-water-crossing debris, or endpoint access uncertainty.",
      "difficulty": "hard",
      "difficultyNotes": "The route is long for a same-day Upper Guadalupe run and has Class I-III Hill Country current, private banks, simple access anchors, limited exits, and fast-rise exposure. Keep it behind the whitewater filter rather than presenting it as a casual float.",
      "confidenceNotes": "Confidence is good for a conservative add: TRPA lists Kreutzberg Canyon-to-FR3160 Bergheim Campground as a 12.2-mile Upper Guadalupe segment, publishes the Upper Guadalupe 100 / 300-1,200 / 5,000 cfs guidance, and links the endpoint map anchors. Kendall County confirms Kreutzberg Canyon Natural Area has Guadalupe River frontage suited to kayaking and is open dawn to dusk. Bergheim Campground publishes canoe/kayak service, private-boat landing fees, shuttle options, primitive campsites, RV sites, and day-use timing. USGS 08167500 returned same-day current discharge and stage during this run, but route copy still requires same-day scouting because the gauge is downstream of the take-out and Hill Country conditions change quickly."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "Kreutzberg Canyon to FR3160 Bergheim Campground, 12.2 mi",
        "note": "TRPA lists this exact Upper Guadalupe launch-map segment between Kreutzberg Canyon and FR3160 / Bergheim Campground.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/guadalupe-river/"
      },
      {
        "label": "Public and outfitter access anchors",
        "value": "29.8998365, -98.6420277 to 29.8928415, -98.5582463",
        "note": "TRPA's Google map links resolve to these access anchors. Kendall County confirms the put-in park has Guadalupe waterfront for kayaking, and Bergheim publishes paid landing terms for private boats returning from upriver.",
        "sourceUrl": "https://goo.gl/maps/4HCP3qixmVjg6ZsG6"
      },
      {
        "label": "Live Upper Guadalupe gauge",
        "value": "USGS 08167500 at 314 cfs / 3.19 ft",
        "note": "USGS Water Services returned same-day Guadalupe River near Spring Branch discharge and gage height at 2026-08-12 13:00 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08167500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum; 300-1,200 cfs ideal; 5,000 cfs maximum",
        "note": "TRPA publishes Upper Guadalupe flow guidance tied to the Upper Guadalupe gauge family; Paddle Today uses the full range conservatively and keeps the route behind the whitewater filter.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/guadalupe-river/"
      },
      {
        "label": "Camping",
        "value": "Endpoint campground",
        "note": "Bergheim Campground publishes primitive campsites and RV sites at the take-out plus private-boat landing fees. No private-bank, gravel-bar, county-park, or informal on-route camping is inferred.",
        "sourceUrl": "https://bergheimcampground.com/index.php?id=pricing"
      },
      {
        "label": "Safety",
        "value": "Long Class I-III Upper Guadalupe run, private banks, fast rises and simple access anchors",
        "note": "TRPA warns that the Upper Guadalupe is rain dependent and private-property sensitive. Kendall County and Bergheim endpoint rules add dawn-to-dusk, fee, landing, shuttle, and no-dog constraints that must be checked before launch.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/guadalupe-river/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TRPA, Kendall County, Bergheim, Boerne, Commons, USGS, and same-route web review found route-context photos and social trip imagery but no clearly rights-clean exact Kreutzberg-to-Bergheim paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Kreutzberg+Canyon+Bergheim+Guadalupe+River+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "Texas Rivers Protection Association Guadalupe River",
        "url": "https://txrivers.org/discover-texas-rivers/guadalupe-river/",
        "provider": "local"
      },
      {
        "label": "TRPA Kreutzberg Canyon map link",
        "url": "https://goo.gl/maps/4HCP3qixmVjg6ZsG6",
        "provider": "local"
      },
      {
        "label": "TRPA Bergheim Campground map link",
        "url": "https://goo.gl/maps/i1pfx9PqSq7koXMS7",
        "provider": "local"
      },
      {
        "label": "Kendall County Kreutzberg Canyon Natural Area",
        "url": "https://www.co.kendall.tx.us/facilities/facility/details/Kreutzberg-Canyon-Natural-Area-11",
        "provider": "local"
      },
      {
        "label": "Bergheim Campground pricing and private boat landing",
        "url": "https://bergheimcampground.com/index.php?id=pricing",
        "provider": "local"
      },
      {
        "label": "USGS 08167500 current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08167500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "guadalupe-river-fm3351-state-park",
    "slug": "guadalupe-river-fm3351-state-park",
    "name": "Guadalupe River",
    "reach": "FM 3351 Crossing to Guadalupe River State Park",
    "aliases": [
      "Bergheim to Guadalupe River State Park",
      "FM 3351 to Guadalupe River State Park",
      "Upper Guadalupe Bergheim to State Park"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "routeType": "whitewater",
    "summary": "Upper Guadalupe day run from the FM 3351 / Bergheim crossing to Guadalupe River State Park. American Whitewater documents this 7.8-mile Class II trip with public access anchors, route hazards, and a state-park take-out, while the Spring Branch USGS gauge gives a product-supported Upper Guadalupe flow check.",
    "statusText": "Use the Guadalupe River near Spring Branch gauge. TRPA lists 100 cfs as the Upper Guadalupe minimum, 300-1,200 cfs as the ideal window, and 5,000 cfs as the high-side ceiling; scout FM 3351, Edge Falls Road, and the state-park landing before committing.",
    "latitude": 29.8922,
    "longitude": -98.559,
    "gaugeSource": {
      "id": "usgs-08167500",
      "provider": "usgs",
      "siteId": "08167500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Guadalupe Rv nr Spring Branch, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08167500/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "American Whitewater lists this as a Class II Upper Guadalupe reach with short rock-garden rapids separated by pools; treat it as swiftwater, not casual tubing.",
        "Edge Falls Road low-water crossing can collect debris and has a documented entrapment drowning history; scout early and portage or skip the trip if the crossing looks blocked or pushy.",
        "Use the FM 3351 public highway-easement access and the Guadalupe River State Park river access only. Private banks between them are not casual stops or camps."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 1200,
      "tooLow": 100,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Upper Guadalupe flow guidance",
        "url": "https://txrivers.org/discover-texas-rivers/guadalupe-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Upper Guadalupe can work year-round when spring flow, rain, and access conditions line up, but TRPA notes the upper river is rain dependent and dry periods can mean dragging. After storms, use same-day USGS, road-crossing visibility, debris, and park-access checks before launching.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is a practical half-day, but this remains Class II Hill Country water with rock gardens, a debris-prone low-water crossing, private-bank limits, and fast rises. The whitewater filter keeps it out of casual Explore discovery.",
      "confidenceNotes": "Confidence is good for a conservative Upper Guadalupe add: American Whitewater documents FM 3351-to-Guadalupe-River-State-Park as a popular 7.8-mile day trip inside its Farm Road 3351-to-Rebecca Creek reach, publishes access coordinates for FM 3351 and the state park, and identifies the main hazards. USGS 08167500 is the product-supported Spring Branch flow check used by the adjacent Upper Guadalupe routes, and TRPA supplies the 100 / 300-1,200 / 5,000 cfs numeric guidance. Route copy still requires same-day visual scouting because the gauge is downstream of the take-out and Hill Country access/hazard conditions change quickly."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "FM 3351 / Bergheim to Guadalupe River State Park, about 7.8 mi",
        "note": "American Whitewater identifies Bergheim / FM 3351 to Guadalupe River State Park as one of the most popular Upper Guadalupe day trips and lists the state-park access at about 7.75 miles.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1811/main"
      },
      {
        "label": "Public access anchors",
        "value": "29.89220, -98.55900 to 29.87600, -98.48580",
        "note": "American Whitewater publishes FM 3351 Crossing and Guadalupe River State Park access coordinates, describing FM 3351 as public highway-easement access and the state park as public river-right access with parking and bathrooms.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/104701"
      },
      {
        "label": "Live Upper Guadalupe gauge",
        "value": "USGS 08167500 at 328 cfs / 3.23 ft",
        "note": "USGS Water Services returned same-day Guadalupe River near Spring Branch discharge and gage height at 2026-08-11 01:00 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08167500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum; 300-1,200 cfs ideal; 5,000 cfs maximum",
        "note": "TRPA publishes Upper Guadalupe flow guidance tied to the Spring Branch gauge family; Paddle Today uses the full range conservatively and keeps the route behind the whitewater filter.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/guadalupe-river/"
      },
      {
        "label": "Camping",
        "value": "Endpoint campground",
        "note": "Guadalupe River State Park publishes water-and-electric campsites and walk-in tent sites at the take-out. No private-bank or informal on-route camping is inferred between FM 3351 and the park.",
        "sourceUrl": "https://tpwd.texas.gov/state-parks/guadalupe-river"
      },
      {
        "label": "Safety",
        "value": "Class II rock gardens, Edge Falls Road low-water crossing, private banks",
        "note": "American Whitewater identifies Rock Pile, Dog Leg, and Edge Falls Road as route features, and warns that the low-water crossing can collect debris and has a documented entrapment drowning history.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1811/main"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded American Whitewater, TPWD, Bergheim Campground, Commons, USGS, and same-route image review found route context and maps but no clearly rights-clean exact FM-3351-to-State-Park paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Guadalupe+River+Bergheim+State+Park+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Upper Guadalupe FM 3351 to Rebecca Creek",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1811/main",
        "provider": "local"
      },
      {
        "label": "American Whitewater FM 3351 access",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/104701",
        "provider": "local"
      },
      {
        "label": "American Whitewater Guadalupe River State Park access",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/104705",
        "provider": "local"
      },
      {
        "label": "Texas Rivers Protection Association Guadalupe River",
        "url": "https://txrivers.org/discover-texas-rivers/guadalupe-river/",
        "provider": "local"
      },
      {
        "label": "TPWD Guadalupe River State Park",
        "url": "https://tpwd.texas.gov/state-parks/guadalupe-river",
        "provider": "local"
      },
      {
        "label": "USGS 08167500 current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08167500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "guadalupe-river-state-park-nichols-landing",
    "slug": "guadalupe-river-state-park-nichols-landing",
    "name": "Guadalupe River",
    "reach": "Guadalupe River State Park to Nichol's Landing",
    "aliases": [
      "Guadalupe River State Park Paddling Trail",
      "Guadalupe River State Park to Nichol's Landing",
      "Guadalupe State Park to Specht's Crossing"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "routeType": "whitewater",
    "summary": "Official five-mile Guadalupe River State Park trail from the park access to Nichol's Landing / Specht's Crossing. TPWD publishes the route, endpoint coordinates, and low-water-crossing portage, while the Spring Branch USGS gauge gives a product-supported Upper Guadalupe flow check.",
    "statusText": "Use the Guadalupe River near Spring Branch gauge as the Upper Guadalupe flow check. TRPA lists 100 cfs as the Upper Guadalupe minimum, 300-1,200 cfs as the ideal window, and 5,000 cfs as the high-side ceiling; this state-park run still needs visual scouting at the low-water crossing and after rain.",
    "latitude": 29.872,
    "longitude": -98.49,
    "gaugeSource": {
      "id": "usgs-08167500",
      "provider": "usgs",
      "siteId": "08167500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Guadalupe Rv nr Spring Branch, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08167500/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Treat this as a rugged Upper Guadalupe run rather than a casual state-park float, especially when the gauge is rising or near the low side.",
        "TPWD says paddlers must exit and carry around the low-water crossing about 0.5 mile below the park boundary; scout with margin before committing.",
        "Use Nichol's Landing as the planned take-out and keep private-bank stops limited to direct hazard portages."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 1200,
      "tooLow": 100,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Upper Guadalupe flow guidance",
        "url": "https://txrivers.org/discover-texas-rivers/guadalupe-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Upper Guadalupe can run year-round when spring flow, rain, and access conditions line up, but TRPA notes the upper river is rain dependent and dry periods can mean dragging. After storms, treat rising water, debris, and private-bank portage limits conservatively.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is short, but TPWD frames the state-park trail as rugged and requires a carry around a low-water crossing. The whitewater filter keeps this reach out of casual discovery because fast rises, strainers, and private-bank portage limits can make a simple-looking trip consequential.",
      "confidenceNotes": "Confidence is good for a conservative Upper Guadalupe add: TPWD publishes the exact Guadalupe River State Park-to-Nichol's Landing trail, both endpoint coordinates, five-mile distance, low-water-crossing portage, and private-property rules. USGS 08167500 is the product-supported Spring Branch flow check used by the adjacent Upper Guadalupe route; it sits just downstream of Nichol's Landing in the same managed Upper Guadalupe corridor, so route copy explicitly treats it as a route-family flow check rather than pretending it removes the need for same-day visual scouting. TRPA supplies the 100 / 300-1,200 / 5,000 cfs numeric guidance."
    },
    "evidenceNotes": [
      {
        "label": "Live Upper Guadalupe gauge",
        "value": "USGS 08167500 at 347 cfs / 3.28 ft",
        "note": "USGS Water Services returned same-day Guadalupe River near Spring Branch discharge and gage height at 2026-08-09 23:00 CDT during this implementation run.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08167500/"
      },
      {
        "label": "Official route shape",
        "value": "Guadalupe River State Park to Nichol's Landing, 5 mi",
        "note": "TPWD identifies the Guadalupe River State Park Paddling Trail as a five-mile route from the park to Nichol's Landing / Specht's Crossing with a 2-4 hour float time.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/guadalupe-river/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "29.8720, -98.4900 to 29.8790, -98.4480",
        "note": "TPWD publishes GPS coordinates for the Guadalupe River State Park access and Nichol's Landing, with the state park as the put-in and Specht's Crossing / Nichol's Landing as the take-out.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/guadalupe-river/"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum; 300-1,200 cfs ideal; 5,000 cfs maximum",
        "note": "TRPA publishes Upper Guadalupe flow guidance tied to the Spring Branch gauge family; Paddle Today uses the full range conservatively and keeps the route behind the whitewater filter.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/guadalupe-river/"
      },
      {
        "label": "Safety and access",
        "value": "Low-water-crossing portage plus private-bank limits",
        "note": "TPWD says paddlers must exit and carry around a low-water crossing about 0.5 mile below the park boundary, and that use of private property outside direct hazard portages can be trespassing.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/guadalupe-river/"
      },
      {
        "label": "Camping",
        "value": "Endpoint campground",
        "note": "Guadalupe River State Park has drive-up campsites with electricity, walk-in tent sites, and primitive sites at the put-in; no private-bank or informal on-route camping is inferred for the five-mile route.",
        "sourceUrl": "https://tpwd.texas.gov/state-parks/guadalupe-river/fees-facilities/campsites"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, state-park, TRPA, WORD, Commons, USGS, and same-route image review found route context and maps but no clearly rights-clean exact Guadalupe-State-Park-to-Nichol's-Landing paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Guadalupe+River+State+Park+Nichol%27s+Landing+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Guadalupe River State Park Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/guadalupe-river/",
        "provider": "local"
      },
      {
        "label": "Texas Rivers Protection Association Guadalupe River",
        "url": "https://txrivers.org/discover-texas-rivers/guadalupe-river/",
        "provider": "local"
      },
      {
        "label": "TPWD Guadalupe River State Park campsites",
        "url": "https://tpwd.texas.gov/state-parks/guadalupe-river/fees-facilities/campsites",
        "provider": "local"
      },
      {
        "label": "USGS 08167500 Guadalupe River near Spring Branch",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08167500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "guadalupe-river-nichols-landing-rebecca-creek",
    "slug": "guadalupe-river-nichols-landing-rebecca-creek",
    "name": "Guadalupe River",
    "reach": "Nichol's Landing to Rebecca Creek Crossing",
    "aliases": [
      "Upper Guadalupe - Nichol's Landing Paddling Trail",
      "Nichol's Landing to Rebecca Creek",
      "Specht's Crossing to Rebecca Creek"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "routeType": "whitewater",
    "summary": "Official 9.9-mile Upper Guadalupe trail from Nichol's Landing to Rebecca Creek Crossing. TPWD publishes the public access chain, route distance, rapid/portage notes, and private-bank rules, while the Spring Branch USGS gauge sits inside the reach for a direct whitewater condition check.",
    "statusText": "Use the Guadalupe River near Spring Branch gauge. TRPA lists 100 cfs as the Upper Guadalupe minimum, 300-1,200 cfs as the ideal window, and 5,000 cfs as the high-side ceiling; Paddle Today treats this as a whitewater route that still needs same-day scouting.",
    "latitude": 29.8794,
    "longitude": -98.4483,
    "gaugeSource": {
      "id": "usgs-08167500",
      "provider": "usgs",
      "siteId": "08167500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Guadalupe Rv nr Spring Branch, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08167500/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Treat this as an Upper Guadalupe whitewater run with rapids that need inspection, not a casual tubing loop.",
        "TPWD calls out Mueller Falls and Rust Falls chutes below FM 311 and says hazardous areas can be portaged within the navigable corridor.",
        "Use Rebecca Creek Crossing as the planned take-out and keep private-bank stops limited to direct hazard portages."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 1200,
      "tooLow": 100,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Upper Guadalupe flow guidance",
        "url": "https://txrivers.org/discover-texas-rivers/guadalupe-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Upper Guadalupe can work year-round when spring flow, rain, and access conditions line up, but TRPA notes that the upper river is rain dependent and can involve dragging during dry periods. After storms, treat rising water, debris, and private-bank portage limits conservatively.",
      "difficulty": "moderate",
      "difficultyNotes": "TPWD describes a 9.9-mile reach with several rapids, Mueller Falls, Rust Falls, and mandatory scouting or portaging around hazardous areas. It is manageable for prepared paddlers at moderate flows but belongs behind the whitewater filter because mistakes at fast-water chutes and strainers matter.",
      "confidenceNotes": "Confidence is strong for a conservative whitewater add: TPWD publishes Nichol's Landing, FM 311, and Rebecca Creek Crossing coordinates plus the 9.9-mile route shape and rapid/portage context; USGS 08167500 is a direct in-reach Spring Branch gauge; and TRPA publishes Upper Guadalupe numeric guidance of 100 cfs minimum, 300-1,200 cfs ideal, and 5,000 cfs maximum. Camping confidence is nearby-basecamp only because TPWD lists local camping outfitters but does not document legal on-route river camping for the paddling trail."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 08167500 at 347 cfs / 3.28 ft",
        "note": "USGS Water Services returned same-day Guadalupe River near Spring Branch discharge and gage height at 2026-08-09 20:00 CDT during this implementation run.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08167500/"
      },
      {
        "label": "Official route shape",
        "value": "Nichol's Landing to Rebecca Creek Crossing, 9.9 mi",
        "note": "TPWD identifies the Upper Guadalupe Nichol's Landing trail as a 9.9-mile reach with a 3-6 hour float time and an alternate FM 311 access at mile 5.4.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/upper-guadalupe/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "29.8794, -98.4483 to 29.8881, -98.3685",
        "note": "TPWD publishes GPS coordinates for Nichol's Landing, FM 311, and Rebecca Creek Crossing, along with parking/access notes for the shuttle sites.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/upper-guadalupe/"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum; 300-1,200 cfs ideal; 5,000 cfs maximum",
        "note": "TRPA publishes Upper Guadalupe flow guidance and points users to the Spring Branch USGS gauge family; Paddle Today uses the full range as a conservative two-sided whitewater model.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/guadalupe-river/"
      },
      {
        "label": "Safety and access",
        "value": "Rapids, portages, private-bank limits",
        "note": "TPWD says multiple rapids demand careful inspection, calls out Mueller Falls and Rust Falls, permits portage of hazards within the navigable corridor, and warns that other private-bank use can be trespassing.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/upper-guadalupe/"
      },
      {
        "label": "Camping",
        "value": "Nearby basecamp only",
        "note": "TPWD lists local outfitters and campgrounds around the trail, but the route package does not infer legal on-route camping from proximity to the river or private banks.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/upper-guadalupe/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, WORD, Commons, USGS, and same-route image review found route maps and contextual media but no clearly rights-clean exact Nichol's-Landing-to-Rebecca-Creek paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Upper+Guadalupe+Nichol%27s+Landing+Rebecca+Creek+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Upper Guadalupe Nichol's Landing Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/upper-guadalupe/",
        "provider": "local"
      },
      {
        "label": "Texas Rivers Protection Association Guadalupe River",
        "url": "https://txrivers.org/discover-texas-rivers/guadalupe-river/",
        "provider": "local"
      },
      {
        "label": "USGS 08167500 Guadalupe River near Spring Branch",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08167500/",
        "provider": "usgs"
      },
      {
        "label": "TPWD Guadalupe River State Park Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/guadalupe-river/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "comal-river-hinman-island-last-public-exit",
    "slug": "comal-river-hinman-island-last-public-exit",
    "name": "Comal River",
    "reach": "Hinman Island Park to Last Public Exit",
    "aliases": [
      "Comal River Water Trail",
      "Hinman Island to Last Public Exit",
      "New Braunfels Comal River"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "routeType": "whitewater",
    "summary": "Short New Braunfels urban water-trail run from Hinman Island Park to the Last Public Exit. The City and National Recreation Trails identify the public access corridor and recreation rules, while the Comal River at New Braunfels USGS gauge gives a direct same-river flow check.",
    "statusText": "Use the Comal River at New Braunfels gauge. The City lists 100-500 cfs as open for all recreation, 500-600 cfs as extreme caution with questionable activities, and 600 cfs or above as a temporary closure trigger.",
    "latitude": 29.7011,
    "longitude": -98.1067,
    "gaugeSource": {
      "id": "usgs-08169000",
      "provider": "usgs",
      "siteId": "08169000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Comal Rv at New Braunfels, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08169000/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "low_head_dam",
        "mandatory_takeout",
        "fast_rise",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Use the Last Public Exit as the required finish; continuing into the lower Guadalupe adds separate dam and access hazards that are not part of this route.",
        "American Whitewater describes the Tube Chute, Clemens Dam, and two low-head dams on this short reach. Hard boats may need to portage around the chute during tubing and lifeguard periods.",
        "The City can restrict or close the river for high water or public-safety conditions, and summer crowding changes the practical margin at launches, chutes, and the exit."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 500,
      "tooLow": 100,
      "tooHigh": 600,
      "thresholdSource": {
        "label": "City of New Braunfels Comal River flow guidance",
        "url": "https://www.newbraunfels.gov/3368/Comal-River",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The spring-fed Comal can be used much of the year when city access is open, but New Braunfels manages closures and caution bands around high water. Check the same-day gauge, posted river status, storms, and crowd-control rules before launching.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is short, but this is not treated as a casual flatwater card because it includes chute/dam features, low-head-dam awareness, crowd pressure, and a mandatory public exit before the lower Guadalupe hazard corridor.",
      "confidenceNotes": "Confidence is strong for a conservative Texas add: New Braunfels publishes the Comal recreation flow bands and access rules, National Recreation Trails documents the 1.5-mile Hinman Island Park-to-Last-Public-Exit water trail, American Whitewater corroborates the short whitewater/dam hazard package, USGS 08169000 is direct and product-supported, and city park rules explicitly prohibit camping or overnight lodging in city parks."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 08169000 at 198 cfs / 3.84 ft",
        "note": "USGS Water Services returned same-day Comal River at New Braunfels discharge and gage height at 2026-08-10 11:45 CDT during this implementation run.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08169000/"
      },
      {
        "label": "Official flow bands",
        "value": "100-500 cfs open; 500-600 cfs extreme caution; 600 cfs closure",
        "note": "The City of New Braunfels publishes Comal recreation status by flow band and says the river may close for high water or public-safety conditions.",
        "sourceUrl": "https://www.newbraunfels.gov/3368/Comal-River"
      },
      {
        "label": "Route shape",
        "value": "Hinman Island Park to Last Public Exit, about 1.5 mi",
        "note": "National Recreation Trails identifies the Comal River Water Trail as a 1.5-mile route beginning at Hinman Island Park and ending at the Last Public Exit.",
        "sourceUrl": "https://www.nrtapplication.org/trails/comal-river-water-trail"
      },
      {
        "label": "Endpoint coordinates",
        "value": "29.7011, -98.1067 to 29.7046, -98.1161",
        "note": "Floating Texas publishes the Hinman Island Park access coordinate. Landa River Trips and Comal River Cam place the Last Public Exit at S Union Avenue / W Lincoln Street, which was resolved with the Census public address geocoder as a street-access anchor.",
        "sourceUrl": "https://landarivertrips.com/comal-river-tubing-faq-new-braunfels/"
      },
      {
        "label": "Safety and access",
        "value": "Tube Chute, dams, mandatory exit, boat restrictions",
        "note": "American Whitewater documents the Tube Chute and low-head-dam context, while New Braunfels river rules limit watercraft length and restrict canoe/kayak use of the Last Tubers Exit on weekends and holidays.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4365/main"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "New Braunfels park rules prohibit camping and overnight lodging in all city parks; the route does not infer legal camping from riverfront proximity.",
        "sourceUrl": "https://newbraunfels.gov/3615/Park-Rules-and-Policies"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded New Braunfels, NRT, American Whitewater, Floating Texas, Commons, USGS, and same-route image review found route-context photos but no clearly rights-clean exact Hinman-Island-to-Last-Public-Exit paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Comal+River+Water+Trail+New+Braunfels+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "City of New Braunfels Comal River",
        "url": "https://www.newbraunfels.gov/3368/Comal-River",
        "provider": "local"
      },
      {
        "label": "New Braunfels River Rules",
        "url": "https://www.newbraunfels.gov/4212/What-Can-I-Bring",
        "provider": "local"
      },
      {
        "label": "New Braunfels Park Rules",
        "url": "https://newbraunfels.gov/3615/Park-Rules-and-Policies",
        "provider": "local"
      },
      {
        "label": "National Recreation Trails Comal River Water Trail",
        "url": "https://www.nrtapplication.org/trails/comal-river-water-trail",
        "provider": "local"
      },
      {
        "label": "American Whitewater Comal River",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4365/main",
        "provider": "local"
      },
      {
        "label": "Landa River Trips Comal River FAQ",
        "url": "https://landarivertrips.com/comal-river-tubing-faq-new-braunfels/",
        "provider": "local"
      },
      {
        "label": "USGS 08169000 Comal River at New Braunfels",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08169000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "san-antonio-river-mission-reach",
    "slug": "san-antonio-river-mission-reach",
    "name": "San Antonio River",
    "reach": "Roosevelt Park to Camino Coahuilteca",
    "aliases": [
      "Mission Reach Paddling Trail",
      "San Antonio River - Roosevelt Park to Mission Espada",
      "Roosevelt Park to Camino Coahuilteca"
    ],
    "state": "Texas",
    "region": "South Texas Plains",
    "routeType": "whitewater",
    "summary": "Official Mission Reach urban paddling trail from Roosevelt Park to Camino Coahuilteca near Mission Espada. TPWD, SARA, and the City publish the public access corridor, blue-marked launch points, canoe chutes, and Espada Dam portage, while the San Antonio USGS gauge gives a direct upstream flow check.",
    "statusText": "Use the San Antonio River at San Antonio gauge just upstream of Roosevelt Park. Treat about 200 cfs as the conservative San Antonio River floor from TRPA guidance; the current reading can be below that floor, so verify SARA flow, bacteria, rainfall, and portage conditions before launching.",
    "latitude": 29.4015,
    "longitude": -98.4883,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "whitewater",
        "fast_rise",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "SARA and the City both require a portage around Espada Dam about 1,200 feet south of SE Military Drive; land early and reenter below Mission Parkway.",
        "TPWD says the Mission Reach responds quickly to urban rainfall runoff and that paddlers should expect high flows and undesirable water quality for 72 hours after rain.",
        "City rules limit paddling to the published boundaries, require daylight use, prohibit body contact and alcohol during water recreation, and require vessels to be removed at the end of each day."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08178000",
      "provider": "usgs",
      "siteId": "08178000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "San Antonio Rv at San Antonio, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08178000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association San Antonio River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/san-antonio-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "SARA and TRPA frame the San Antonio River as year-round and dependable, but the Mission Reach is an urban restored channel. Same-day decisions should be conservative after rain, when bacteria or flow notices change, when the San Antonio gauge is below the 200 cfs corridor floor, or when the Espada Dam portage is crowded or unclear.",
      "difficulty": "moderate",
      "difficultyNotes": "SARA labels the Mission Reach beginner-friendly, but the full eight-mile route includes many canoe chutes, riffles, no shade, urban runoff exposure, and a required dam portage. The whitewater filter keeps the route out of casual discovery until paddlers intentionally choose swiftwater-style urban paddling.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD publishes the eight-mile Roosevelt Park-to-Camino Coahuilteca route, endpoint and alternate access coordinates, canoe chutes, runoff/water-quality cautions, and route distance; SARA corroborates the public access chain, 20+ access points, portage, distance, float time, and no-shade/drinking-water safety context; the City confirms the legal Mission Reach paddling boundary, daylight-only use, no-permit status, Espada Dam portage, and user rules; USGS 08178000 is a product-supported San Antonio River gauge immediately upstream of the put-in; and TRPA gives the San Antonio River numeric flow cues. The route ships minimum-only because the threshold source is corridor-level rather than a Mission Reach-specific gauge table."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Roosevelt Park to Camino Coahuilteca, 8 mi",
        "note": "TPWD identifies the Mission Reach as an eight-mile trail from Roosevelt Park downstream to the Camino Coahuilteca take-out by Mission Espada, with a 3-5 hour full-route float time.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/south-texas-plains/mission-reach/"
      },
      {
        "label": "Public access and portage",
        "value": "20+ access points plus Espada Dam portage",
        "note": "SARA says the first launch is at Roosevelt Park, the last take-out is Camino Coahuilteca, access points are marked by blue poles, and paddlers must portage at Espada Dam around mile 5.",
        "sourceUrl": "https://www.sariverauthority.org/parks-trails/mission-reach-paddling-trail/"
      },
      {
        "label": "Legal city boundary and rules",
        "value": "Sunrise to sunset; no permit; vessels removed daily",
        "note": "The City of San Antonio publishes the Mission Reach water-recreation boundary, says no permit is required, requires sunrise-to-sunset use, prohibits body contact and alcohol during water recreation, and requires users to stay within posted boundaries.",
        "sourceUrl": "https://www.sanantonio.gov/ParksAndRec/Programs-Classes-Fun/Fun-On-Your-Own/Paddling"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08178000 at 22.3 cfs / 3.93 ft",
        "note": "USGS Water Services returned same-day San Antonio River at San Antonio discharge and gage height at 2026-08-10 00:00 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08178000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "200 cfs minimum-only; 300 cfs ideal cue; 2,000 cfs maximum caution",
        "note": "TRPA lists San Antonio River flow guidance as rarely below 200 cfs, ideal at 300 cfs, and maximum at 2,000 cfs, with the San Antonio gauge included in the current-conditions gauge set.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/san-antonio-river/"
      },
      {
        "label": "Safety and water quality",
        "value": "72-hour rain/runoff caution",
        "note": "TPWD says the Mission Reach is readily influenced by urban rainfall runoff and that paddlers should expect high flows and undesirable water quality for 72 hours following rain events.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/south-texas-plains/mission-reach/"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "City rules require non-motorized vessels to be removed at the end of each day and limit Mission Reach use to sunrise-to-sunset water recreation; no legal route camping is inferred from nearby parks or the river corridor.",
        "sourceUrl": "https://www.sanantonio.gov/ParksAndRec/Programs-Classes-Fun/Fun-On-Your-Own/Paddling"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded SARA, TPWD, City, Commons, San Antonio Report, USGS, and same-route image review found route-context images and one rights-clean general Mission Reach trail photo, but no clearly rights-clean exact paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:San_Antonio_River_Mission_Reach_and_Trail.jpg"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Mission Reach Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/south-texas-plains/mission-reach/",
        "provider": "local"
      },
      {
        "label": "SARA Mission Reach Paddling Trail",
        "url": "https://www.sariverauthority.org/parks-trails/mission-reach-paddling-trail/",
        "provider": "local"
      },
      {
        "label": "City of San Antonio paddling rules",
        "url": "https://www.sanantonio.gov/ParksAndRec/Programs-Classes-Fun/Fun-On-Your-Own/Paddling",
        "provider": "local"
      },
      {
        "label": "SARA Current Conditions",
        "url": "https://www.sariverauthority.org/parks-trails/current-conditions/",
        "provider": "local"
      },
      {
        "label": "Texas Rivers Protection Association San Antonio River",
        "url": "https://txrivers.org/discover-texas-rivers/san-antonio-river/",
        "provider": "local"
      },
      {
        "label": "USGS 08178000 San Antonio River at San Antonio",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08178000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08178000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08178000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "san-antonio-river-river-crossing-helton",
    "slug": "san-antonio-river-river-crossing-helton",
    "name": "San Antonio River",
    "reach": "River Crossing Park to Helton Nature Park",
    "aliases": [
      "SASPAMCO Paddling Trail - River Crossing Park to Helton",
      "San Antonio River - Loop 1604 to Helton Nature Park",
      "Loop 1604 River Access Site to Helton"
    ],
    "state": "Texas",
    "region": "South Texas Plains",
    "summary": "Official upper SASPAMCO day route from SARA's River Crossing Park / Loop 1604 access to John William Helton Nature Park. TPWD publishes the 12.1-mile route and midpoint access, SARA confirms the park-access chain, and the Elmendorf USGS gauge sits at the put-in for a direct same-river condition check.",
    "statusText": "Use the San Antonio River near Elmendorf gauge at the put-in. Treat about 200 cfs as the conservative floor from TRPA San Antonio River guidance; 300 cfs is the published ideal cue, and readings near 2,000 cfs or rising should be treated as hazardous.",
    "latitude": 29.222,
    "longitude": -98.3554,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "SARA lists SASPAMCO as experience-recommended, with variable cell access, possible log jams, soft mud banks, and a rural setting.",
        "The active SARA closure is downstream of Helton Nature Park, so this route must end at Helton and should not be extended toward CR 117 or Floresville until SARA lifts that alert.",
        "TPWD warns that low water can expose snags and that heavy rain or high water can create dangerous temporary flows and undesirable water quality."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08181800",
      "provider": "usgs",
      "siteId": "08181800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "San Antonio Rv nr Elmendorf, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08181800/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association San Antonio River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/san-antonio-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The San Antonio River south of the city is usually dependable enough to paddle, but this upper SASPAMCO route still needs same-day flow, weather, bacteria, and logjam checks. The route should be downgraded after rain, near the conservative floor, or when SARA posts fresh debris or access notices.",
      "difficulty": "moderate",
      "difficultyNotes": "The water is mostly quiet pools and small riffles, but the route is a 12-mile rural commitment with possible log jams, soft mud banks, limited cell coverage, and a current downstream closure that makes the Helton take-out boundary important.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD publishes the Loop 1604/River Crossing, CR 125 midpoint, and Helton endpoint coordinates plus the 12.1-mile route shape; SARA confirms River Crossing Park as the first SASPAMCO access and Helton as a paddling access with campground amenities; USGS 08181800 is a direct gauge at the put-in; and TRPA publishes San Antonio River guidance of rarely below 200 cfs, 300 cfs ideal, and 2,000 cfs maximum. The route ships minimum-only because the numeric bands are corridor guidance rather than a manager-authored gauge table for only this 12.1-mile segment."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Loop 1604 to Helton, 12.1 mi",
        "note": "TPWD identifies Loop 1604 River Access Site to Helton - San Antonio River Nature Center as a 12.1-mile SASPAMCO option, with CR 125 as the alternate midpoint access.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/south-texas-plains/saspamco/"
      },
      {
        "label": "Public access chain",
        "value": "River Crossing Park, CR 125, Helton Nature Park",
        "note": "SARA says SASPAMCO begins at River Crossing Park on the San Antonio River and continues through additional public access points including Helton Nature Park.",
        "sourceUrl": "https://www.sariverauthority.org/parks-trails/saspamco-paddling-trail/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08181800 at 151 cfs / 9.55 ft",
        "note": "USGS Water Services returned same-day San Antonio River near Elmendorf discharge and gage height at 2026-08-09 23:30 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08181800&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "200 cfs minimum-only; 300 cfs ideal cue; 2,000 cfs maximum caution",
        "note": "TRPA lists San Antonio River flow guidance as rarely below 200 cfs, ideal at 300 cfs, and maximum at 2,000 cfs, with SARA and USGS current-condition references.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/san-antonio-river/"
      },
      {
        "label": "Closure boundary",
        "value": "Downstream of Helton closed; this route ends at Helton",
        "note": "SARA's current-conditions alert says the southern SASPAMCO section downstream of Helton Nature Park remains temporarily closed because of large log jams, so Paddle Today does not publish a Helton-to-Floresville continuation.",
        "sourceUrl": "https://www.sariverauthority.org/parks-trails/current-conditions/"
      },
      {
        "label": "Camping",
        "value": "Endpoint campground",
        "note": "SARA's Helton Nature Park page lists campgrounds, river and paddle-trail access, and campground reservations with an overnight fee at the take-out.",
        "sourceUrl": "https://www.sariverauthority.org/parks-trails/john-william-helton-san-antonio-river-nature-park/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded SARA, TPWD, Commons, National Rivers Project, San Antonio Report, and same-route web review found route-context images but no clearly rights-clean exact River-Crossing-to-Helton paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Category:San_Antonio_River"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD SASPAMCO Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/south-texas-plains/saspamco/",
        "provider": "local"
      },
      {
        "label": "SARA SASPAMCO Paddling Trail",
        "url": "https://www.sariverauthority.org/parks-trails/saspamco-paddling-trail/",
        "provider": "local"
      },
      {
        "label": "SARA Current Conditions",
        "url": "https://www.sariverauthority.org/parks-trails/current-conditions/",
        "provider": "local"
      },
      {
        "label": "SARA River Crossing Park",
        "url": "https://www.sariverauthority.org/parks-trails/river-crossing-park/",
        "provider": "local"
      },
      {
        "label": "SARA John William Helton Nature Park",
        "url": "https://www.sariverauthority.org/parks-trails/john-william-helton-san-antonio-river-nature-park/",
        "provider": "local"
      },
      {
        "label": "Texas Rivers Protection Association San Antonio River",
        "url": "https://txrivers.org/discover-texas-rivers/san-antonio-river/",
        "provider": "local"
      },
      {
        "label": "USGS 08181800 San Antonio River near Elmendorf",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08181800/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08181800 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08181800&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "san-antonio-river-cr125-helton-nature-park",
    "slug": "san-antonio-river-cr125-helton-nature-park",
    "name": "San Antonio River",
    "reach": "CR 125 River Access Site to Helton Nature Park",
    "aliases": [
      "SASPAMCO Paddling Trail - CR 125 to Helton",
      "Graytown Park to Helton Nature Park",
      "San Antonio River - CR 125 to Helton"
    ],
    "state": "Texas",
    "region": "South Texas Plains",
    "summary": "Official shorter SASPAMCO day route from the CR 125 / Graytown midpoint access to John William Helton Nature Park. TPWD publishes this 6.43-mile option with endpoint coordinates, SARA confirms the access chain and current downstream closure, and the Elmendorf USGS gauge gives a product-supported same-river condition check upstream of the run.",
    "statusText": "Use the San Antonio River near Elmendorf gauge as the SASPAMCO route-family check. Treat about 200 cfs as the conservative floor from TRPA San Antonio River guidance; 300 cfs is the published ideal cue, and readings near 2,000 cfs or rising should be treated as hazardous.",
    "latitude": 29.2114,
    "longitude": -98.3126,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "SARA lists SASPAMCO as experience-recommended, with variable cell access, possible log jams, soft mud banks, rural setting, and a need to bring ample drinking water.",
        "The active SARA closure is downstream of Helton Nature Park, so this route must end at Helton and should not be extended toward CR 117 or Floresville until SARA lifts that alert.",
        "TPWD warns that low water can expose snags and that heavy rain or high water can create dangerous temporary flows and undesirable water quality."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08181800",
      "provider": "usgs",
      "siteId": "08181800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "San Antonio Rv nr Elmendorf, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08181800/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association San Antonio River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/san-antonio-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The San Antonio River south of the city is usually dependable enough to paddle, but this shorter SASPAMCO leg still needs same-day flow, weather, bacteria, and logjam checks. Downgrade the route after rain, near the conservative floor, or when SARA posts debris or access notices.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is a shorter half-day alternative to the full upper SASPAMCO card, with quiet pools, small riffles, possible log jams, soft mud banks, variable cell coverage, and a firm Helton take-out boundary because the downstream section is temporarily closed.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD publishes the CR 125-to-Helton 6.43-mile route option, endpoint coordinates, access descriptions, and safety caveats; SARA confirms Graytown/CR 125 and Helton as public River Authority access points plus the downstream-only closure; USGS 08181800 is a product-supported same-river route-family gauge upstream at River Crossing Park; and TRPA publishes San Antonio River guidance of rarely below 200 cfs, 300 cfs ideal, and 2,000 cfs maximum. The route ships minimum-only because the numeric bands are corridor guidance rather than a manager-authored gauge table for only this 6.43-mile segment."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "CR 125 to Helton, 6.43 mi",
        "note": "TPWD identifies CR 125 River Access Site to Helton - San Antonio River Nature Center as the shorter 6.43-mile SASPAMCO option, with 2-4 hour float-time guidance.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/south-texas-plains/saspamco/"
      },
      {
        "label": "Public access chain",
        "value": "CR 125 / Graytown Park to Helton Nature Park",
        "note": "SARA says SASPAMCO includes access points at Graytown Park on the San Antonio River and John William Helton Nature Park, with amenities and parking along the rural park chain.",
        "sourceUrl": "https://www.sariverauthority.org/parks-trails/saspamco-paddling-trail/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08181800 at 152 cfs / 9.56 ft",
        "note": "USGS Water Services returned same-day San Antonio River near Elmendorf discharge and gage height at 2026-08-11 10:30 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08181800&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "200 cfs minimum-only; 300 cfs ideal cue; 2,000 cfs maximum caution",
        "note": "TRPA lists San Antonio River flow guidance as rarely below 200 cfs, ideal at 300 cfs, and maximum at 2,000 cfs, with SARA and USGS current-condition references.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/san-antonio-river/"
      },
      {
        "label": "Closure boundary",
        "value": "Downstream of Helton closed; this route ends at Helton",
        "note": "SARA's current alert says the southern SASPAMCO section downstream of Helton Nature Park remains temporarily closed because of large log jams, so Paddle Today does not publish a continuation from this finish.",
        "sourceUrl": "https://www.sariverauthority.org/parks-trails/current-conditions/"
      },
      {
        "label": "Camping",
        "value": "Endpoint campground",
        "note": "SARA's Helton Nature Park page lists campgrounds, river and paddle-trail access, and campground reservations with an overnight fee at the take-out.",
        "sourceUrl": "https://www.sariverauthority.org/parks-trails/john-william-helton-san-antonio-river-nature-park/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded SARA, TPWD, Commons, National Rivers Project, San Antonio Report, and same-route web review found route-context images but no clearly rights-clean exact CR-125-to-Helton paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Category:San_Antonio_River"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD SASPAMCO Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/south-texas-plains/saspamco/",
        "provider": "local"
      },
      {
        "label": "SARA SASPAMCO Paddling Trail",
        "url": "https://www.sariverauthority.org/parks-trails/saspamco-paddling-trail/",
        "provider": "local"
      },
      {
        "label": "SARA Current Conditions",
        "url": "https://www.sariverauthority.org/parks-trails/current-conditions/",
        "provider": "local"
      },
      {
        "label": "SARA Graytown Park",
        "url": "https://www.sariverauthority.org/parks-trails/graytown-park-on-the-san-antonio-river/",
        "provider": "local"
      },
      {
        "label": "SARA John William Helton Nature Park",
        "url": "https://www.sariverauthority.org/parks-trails/john-william-helton-san-antonio-river-nature-park/",
        "provider": "local"
      },
      {
        "label": "Texas Rivers Protection Association San Antonio River",
        "url": "https://txrivers.org/discover-texas-rivers/san-antonio-river/",
        "provider": "local"
      },
      {
        "label": "USGS 08181800 San Antonio River near Elmendorf",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08181800/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08181800 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08181800&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "san-antonio-river-riverdale-goliad-state-park",
    "slug": "san-antonio-river-riverdale-goliad-state-park",
    "name": "San Antonio River",
    "reach": "Riverdale Lane to Goliad State Park",
    "aliases": [
      "Goliad Paddling Trail",
      "San Antonio River - Riverdale Lane to Goliad State Park",
      "Riverdale Lane to Goliad State Park"
    ],
    "state": "Texas",
    "region": "South Texas Plains",
    "summary": "Current Goliad Paddling Trail alignment from the Riverdale Lane access to Goliad State Park. SARA documents the active 18-mile route, Ferry Street midpoint, rural no-cell/logjam cautions, and the Hwy 59 closure, while the Goliad USGS gauge gives a direct same-river condition check.",
    "statusText": "Use the San Antonio River at Goliad gauge. Treat about 200 cfs as the conservative low-water floor from TRPA San Antonio River guidance; 300 cfs is the published ideal cue, and readings near 2,000 cfs or rising should be treated as hazardous.",
    "latitude": 28.67067,
    "longitude": -97.54198,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "SARA marks the current full route as experience-recommended because Riverdale Lane to Goliad State Park is an 18-mile rural commitment with no cell phone access.",
        "Expect possible log jams, mostly soft mud banks, limited practical bailouts, and a required Goliad State Park finish unless the group intentionally takes out at Ferry Street.",
        "The Hwy 59 landing is closed until further notice, so do not plan the older TPWD six-mile alignment as the default launch."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08188500",
      "provider": "usgs",
      "siteId": "08188500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "San Antonio Rv at Goliad, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08188500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association San Antonio River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/san-antonio-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The lower San Antonio River near Goliad usually has enough water for paddling, but this long rural trail still needs same-day flow, weather, and logjam checks. TRPA publishes 300 cfs as an ideal cue and 2,000 cfs as a maximum; Paddle Today scores only the conservative 200 cfs floor and leaves high-side decisions to safety review.",
      "difficulty": "moderate",
      "difficultyNotes": "SARA lists the active Riverdale-to-state-park trail as experience-recommended, mostly because it is long, rural, has no cell coverage, may contain log jams, and finishes at a fee-controlled state park take-out. The water is not framed as technical whitewater.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: SARA currently identifies the Riverdale Lane access at 1777 N. Riverdale Lane, Ferry Street midpoint, Goliad State Park finish, 18-mile route shape, float-time commitment, no-cell/logjam/soft-mud caveats, and Hwy 59 landing closure; TPWD corroborates the Goliad trail family, Ferry Street and state-park coordinates, private-property rules, and state-park take-out; USGS 08188500 is the direct Goliad gauge; and TRPA publishes lower San Antonio River guidance of rarely below 200 cfs, 300 cfs ideal, and 2,000 cfs maximum. The Riverdale coordinate is an access-address anchor cross-checked through public geocoding, so arrival-point offsets remain documented rather than treated as survey-grade ramp points."
    },
    "evidenceNotes": [
      {
        "label": "Current route shape",
        "value": "Riverdale Lane to Goliad State Park, about 18 mi",
        "note": "SARA says the trail now begins where Riverdale Lane meets the San Antonio River, ends at Goliad State Park, includes Ferry Street near Branch Nature Park as an additional access, and averages 8-9 hours.",
        "sourceUrl": "https://www.sariverauthority.org/parks-trails/goliad-paddling-trail/"
      },
      {
        "label": "Hwy 59 closure",
        "value": "Older landing closed until further notice",
        "note": "SARA's June 30, 2025 alert says the Hwy 59 landing is closed for TxDOT bridge construction, while Riverdale, Ferry Street, and Goliad State Park remain open.",
        "sourceUrl": "https://www.sariverauthority.org/parks-trails/goliad-paddling-trail/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08188500 at 224 cfs / 3.84 ft",
        "note": "USGS Water Services returned same-day San Antonio River at Goliad discharge and gage height at 2026-08-09 21:00 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08188500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "200 cfs minimum-only; 300 cfs ideal cue; 2,000 cfs maximum caution",
        "note": "TRPA lists San Antonio River flow guidance as rarely below 200 cfs, ideal at 300 cfs, and maximum at 2,000 cfs, with Goliad included in the current-conditions gauge set.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/san-antonio-river/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "28.67067, -97.54198 to 28.6527, -97.3817",
        "note": "SARA publishes the Riverdale Lane access address; Census and OSM geocoding agree on the access-address anchor, while TPWD publishes the Goliad State Park paddling take-out coordinate.",
        "sourceUrl": "https://www.sariverauthority.org/parks-trails/goliad-paddling-trail/"
      },
      {
        "label": "Camping",
        "value": "Endpoint campground",
        "note": "Goliad State Park publishes walk-in and developed campsites near the route finish; the route package does not infer legal sandbar, soft-bank, or private-bank camping along the river.",
        "sourceUrl": "https://tpwd.texas.gov/state-parks/goliad/fees-facilities/campsites"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded SARA, TPWD, Commons, USGS, and same-route review found route context and public web imagery but no clearly rights-clean exact Riverdale-to-Goliad paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Goliad+Paddling+Trail+San+Antonio+River+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "SARA Goliad Paddling Trail",
        "url": "https://www.sariverauthority.org/parks-trails/goliad-paddling-trail/",
        "provider": "local"
      },
      {
        "label": "TPWD Goliad Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/south-texas-plains/goliad/",
        "provider": "local"
      },
      {
        "label": "Texas Rivers Protection Association San Antonio River",
        "url": "https://txrivers.org/discover-texas-rivers/san-antonio-river/",
        "provider": "local"
      },
      {
        "label": "TPWD Goliad State Park",
        "url": "https://tpwd.texas.gov/state-parks/goliad",
        "provider": "local"
      },
      {
        "label": "TPWD Goliad State Park campsites",
        "url": "https://tpwd.texas.gov/state-parks/goliad/fees-facilities/campsites",
        "provider": "local"
      },
      {
        "label": "USGS 08188500 San Antonio River at Goliad",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08188500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08188500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08188500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "US Census geocoder result for 1777 N Riverdale Lane",
        "url": "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=1777%20N%20Riverdale%20LN%2C%20Goliad%2C%20TX%2077963&benchmark=Public_AR_Current&format=json",
        "provider": "local"
      }
    ]
  },
  {
    "id": "blanco-river-fischer-store-john-knox-ranch",
    "slug": "blanco-river-fischer-store-john-knox-ranch",
    "name": "Blanco River",
    "reach": "Fischer Store Road to John Knox Ranch",
    "aliases": [
      "Blanco River Fischer Store to John Knox Ranch",
      "Fischer Store Road bridge to JKR",
      "Slime Bridge Blanco River float"
    ],
    "state": "Texas",
    "region": "Hill Country",
    "routeType": "whitewater",
    "summary": "Short TPWD-supported Blanco River run from the Fischer Store Road bridge to the John Knox Ranch River Access near Wayside Drive. TPWD publishes the 3.6-mile route, active leased take-out, put-in no-parking rule, reservation and gate-code requirements, and same-river gauge checks.",
    "statusText": "Use the Blanco River at Wimberley gauge. American Whitewater's containing Fischer Store-to-RM 12 reach uses about 800 cfs as the runnable floor; current readings are far below that floor, so treat this as no-go until the Blanco has enough water and John Knox confirms access.",
    "latitude": 30.000583,
    "longitude": -98.200361,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "access_uncertain",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD says Fischer Store Road bridge has no parking, so use it only as a drop-off put-in and confirm the John Knox Ranch reservation and gate code before committing to the shuttle.",
        "American Whitewater rates the containing Fischer Store Road-to-RM 12 reach Class I-II and warns that the 2015 flood changed conditions; expect low-water crossings, wood, root wads, and possible changed lines.",
        "Do not continue downstream past John Knox Ranch without a separate plan. American Whitewater documents downstream post-flood strainer and cable hazards in the Wayside/Wimberley corridor, and the FM 1492 alternate take-out is not a supported endpoint here."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08171000",
      "provider": "usgs",
      "siteId": "08171000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Blanco Rv at Wimberley, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08171000/"
    },
    "fallbackGaugeSources": [
      {
        "id": "usgs-08170950",
        "provider": "usgs",
        "siteId": "08170950",
        "metric": "discharge_cfs",
        "unit": "cfs",
        "kind": "direct",
        "siteName": "Blanco Rv at Fischer Store Rd nr Fischer, TX",
        "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08170950/"
      }
    ],
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 800,
      "thresholdSource": {
        "label": "American Whitewater Blanco Fischer Store Road-to-RM 12 flow guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/10840/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Blanco is strongly rainfall-dependent. John Knox Ranch and USGS both emphasize same-day monitoring, and flash-flood watches or upstream storm cells should cancel the trip even if the gauge is approaching a runnable floor.",
      "difficulty": "hard",
      "difficultyNotes": "The selected TPWD float is short, but the Blanco is a flash-prone Hill Country river with Class I-II current, low-water crossings, post-flood wood and root-wad uncertainty, private banks, and strict access logistics at both endpoints.",
      "confidenceNotes": "Confidence is good for a conservative route add: TPWD publishes the exact Fischer Store Road-to-John Knox Ranch 3.6-mile route, the active John Knox lease period through August 31, 2027, take-out coordinates, daylight and reservation rules, put-in no-parking guidance, and gauge-check instructions. American Whitewater publishes the containing Fischer Store Road-to-RM 12 reach, Class I-II character, Wimberley gauge correlation, and an 800 cfs low-runnable cue. The app uses that floor minimum-only and records the Fischer Store Road USGS gauge as put-in context because the short TPWD subreach is upstream of Wimberley and post-2015 conditions warrant conservative visual checks."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Fischer Store Road bridge to John Knox Ranch, 3.6 mi",
        "note": "TPWD says John Knox Ranch River Access serves as the take-out for a 3.6-mile float from the Fischer Store Road bridge, with a shorter out-and-back option and a longer FM 1492 alternate that is outside this route package.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/blanco_knox.phtml"
      },
      {
        "label": "Access rules",
        "value": "Active John Knox lease, reservation and gate code required",
        "note": "TPWD lists the John Knox lease as active from March 1, 2022 through August 31, 2027, requires confirmation 24 hours in advance for the gate code, limits parking, and says Fischer Store bridge can be used only with drop-off because parking is not available there.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/blanco_knox.phtml"
      },
      {
        "label": "Endpoint coordinates",
        "value": "30.000583, -98.200361 to 29.968451, -98.192709",
        "note": "The put-in uses the USGS Fischer Store Road gage coordinate at the bridge/gage corridor, while TPWD publishes the John Knox Ranch River Access coordinate as the take-out access anchor; final entry and exit should follow current site instructions and safe bank conditions.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08170950/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08171000 at 11.0 cfs / 3.64 ft",
        "note": "USGS Water Services returned same-day Wimberley discharge and stage at 2026-08-10 22:15 CDT during this run. The Fischer Store Road put-in gauge also returned 19.5 cfs / 3.73 ft for local visual context.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08170950,08171000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold and classification",
        "value": "Minimum-only 800 cfs; Class I-II containing reach",
        "note": "American Whitewater ties the Fischer Store Road-to-RM 12 reach to the Blanco River at Wimberley gauge, rates it Class I-II, and records 800 cfs as the low runnable cue. Paddle Today uses only the conservative floor for this shorter TPWD subreach.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/10840/main"
      },
      {
        "label": "Camping",
        "value": "No route camping inferred",
        "note": "The TPWD lease page describes daylight river access and pack-in/pack-out public use, not public route camping. John Knox Ranch is a separate camp/program property, so overnight use requires separate arrangements and is not part of this paddle route.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/blanco_knox.phtml"
      },
      {
        "label": "Safety and flood monitoring",
        "value": "Flash-flood and post-2015 debris caution",
        "note": "John Knox Ranch describes 2015 flood impacts and active river monitoring, while American Whitewater warns that post-flood conditions and downstream strainers/root wads can change the character of this Blanco corridor.",
        "sourceUrl": "https://johnknoxranch.org/floodmonitoring"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "A USGS public-domain Fischer Store webcam page exists for exact put-in context, but the live-camera asset was not selected as a stable reusable gallery image; bounded TPWD, AW, Commons, USGS, and same-route review found no stable exact-route paddling asset for local reuse.",
        "sourceUrl": "https://www.usgs.gov/media/webcams/blanco-river-fischer-store-road-near-fischer-texas"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD John Knox Ranch River Access",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/blanco_knox.phtml",
        "provider": "local"
      },
      {
        "label": "American Whitewater Blanco Fischer Store Road to RM 12",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/10840/main",
        "provider": "american_whitewater"
      },
      {
        "label": "John Knox Ranch flood monitoring",
        "url": "https://johnknoxranch.org/floodmonitoring",
        "provider": "local"
      },
      {
        "label": "USGS 08171000 Blanco River at Wimberley",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08171000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08170950 Fischer Store Road gauge",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08170950/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08170950 and 08171000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08170950,08171000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "USGS Fischer Store Road public-domain webcam",
        "url": "https://www.usgs.gov/media/webcams/blanco-river-fischer-store-road-near-fischer-texas",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "llano-river-james-river-martin-simonsville",
    "slug": "llano-river-james-river-martin-simonsville",
    "name": "Llano River",
    "reach": "James River Crossing to Martin / Simonsville Crossing",
    "aliases": [
      "Main Llano James River Crossing to Martin",
      "James River Crossing to Simonsville Crossing",
      "Llano River FR 2389 to Martin Crossing"
    ],
    "state": "Texas",
    "region": "Hill Country",
    "routeType": "whitewater",
    "summary": "Main Llano River run from James River Crossing / FR-2389 to Martin / Simonsville Crossing. TRPA publishes the six-mile public-road-crossing route, public access map links, numeric Llano flow bands, and Class II-II+ character, while USGS 08151500 provides a product-supported same-river live gauge downstream at Llano.",
    "statusText": "Use the Llano River at Llano gauge. Treat 65 cfs as the conservative floor, 100-500 cfs as the preferred window, and 5,000 cfs as the high-water ceiling; this whitewater-hidden card still needs same-day scouting, weather, and access checks.",
    "latitude": 30.650638,
    "longitude": -99.250613,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "access_uncertain",
        "private_banks"
      ],
      "safetyNotes": [
        "TRPA frames the Llano as Class II-II+ and lists this as a public-road-crossing run, so treat it as a prepared Hill Country whitewater day rather than a casual float.",
        "Use only the James River Crossing / FR-2389 and Martin / Simonsville Crossing public access anchors unless current signs or local authorities direct otherwise. Private banks and ranch roads are not backup access.",
        "The Llano rises quickly after Hill Country storms. Recheck USGS 08151500, radar, and local rain before launch, and skip the route if wood, flood debris, low water, or posted restrictions make either crossing uncertain."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08151500",
      "provider": "usgs",
      "siteId": "08151500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Llano Rv at Llano, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08151500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 65,
      "idealMin": 100,
      "idealMax": 500,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Llano River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA describes the Llano as year-round when weather and flow cooperate, but this main-stem reach is rainfall-sensitive. Low summer water can expose limestone ledges, while thunderstorms can create fast rises and debris.",
      "difficulty": "hard",
      "difficultyNotes": "The route is hidden as whitewater because TRPA rates the Llano Class II-II+ and the selected endpoints are public-road-crossing access anchors that require same-day bank, parking, and sign checks.",
      "confidenceNotes": "Confidence is good for a conservative add: TRPA publishes the James-River-Crossing-to-Martin/Simonsville route at 6 miles, Class II-II+ character, Llano gauge links, public-road-crossing map links, and 65 / 100-500 / 5,000 cfs guidance. USGS 08151500 returned current product-supported discharge and stage during the implementation run."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "James River Crossing / FR-2389 to Martin / Simonsville Crossing, 6 mi",
        "note": "TRPA lists this as a six-mile main Llano run between public road crossings and gives separate map links for both endpoints.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "30.650638, -99.250613 to 30.640650, -99.167714",
        "note": "TRPA map links resolved to these access anchors. Trip details keep them as arrival/access anchors, not guaranteed wetted-edge launch points.",
        "sourceUrl": "https://goo.gl/maps/rJ6RqxGRQBgQ1yGK8"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08151500 at 343 cfs / 2.39 ft",
        "note": "USGS Water Services returned same-day Llano River at Llano discharge and stage at 2026-08-11 07:00 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08151500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "65 cfs floor; 100-500 cfs ideal; 5,000 cfs ceiling",
        "note": "TRPA publishes Llano flow guidance with a 65 cfs minimum, 100-500 cfs ideal window, and 5,000 cfs maximum caution tied to the Llano gauge family.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Camping",
        "value": "No route camping selected",
        "note": "TRPA identifies the endpoints as public road crossings and warns paddlers to respect no-trespassing and use-restriction signs. No legal on-route campsite was selected, and private-bank or gravel-bar camping is not inferred.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Safety",
        "value": "Class II-II+, fast rises, wood, public-crossing limits, and private banks",
        "note": "TRPA lists the Llano as Class II-II+ and warns paddlers to use proper river-safety judgment; the route package records Hill Country storm response, strainers, low-water scraping, and private-bank discipline.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TRPA, Commons, USGS, and same-route web image review found route-context photos but no clearly rights-clean exact James-River-to-Martin/Simonsville reusable paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Llano+River+James+River+Crossing+Martin+Simonsville+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TRPA Llano River",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      {
        "label": "TRPA James River Crossing map",
        "url": "https://goo.gl/maps/rJ6RqxGRQBgQ1yGK8",
        "provider": "local"
      },
      {
        "label": "TRPA Martin / Simonsville Crossing map",
        "url": "https://goo.gl/maps/GQDM1gk8QreebCLm6",
        "provider": "local"
      },
      {
        "label": "USGS 08151500 Llano River at Llano",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08151500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08151500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08151500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "llano-river-martin-simonsville-kellers-landing",
    "slug": "llano-river-martin-simonsville-kellers-landing",
    "name": "Llano River",
    "reach": "Martin / Simonsville Crossing to Keller's Landing",
    "aliases": [
      "Martin / Simonsville Crossing to Keller's Landing",
      "Llano River Martin Crossing to US 87",
      "Main Llano Martin to Keller's Landing"
    ],
    "state": "Texas",
    "region": "Hill Country",
    "routeType": "whitewater",
    "summary": "Main Llano River connector from Martin / Simonsville Crossing to Keller's Landing at US-87. TRPA publishes the 3.8-mile route, access map links, numeric Llano flow bands, and Class II-II+ character, while USGS 08151500 provides product-supported same-river live flow at Llano.",
    "statusText": "Use the Llano River at Llano gauge. Treat 65 cfs as the conservative floor, 100-500 cfs as the preferred window, and 5,000 cfs as the high-water ceiling; this whitewater-hidden card still needs same-day scouting, weather, and access checks.",
    "latitude": 30.64065,
    "longitude": -99.167714,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "access_uncertain",
        "private_banks"
      ],
      "safetyNotes": [
        "TRPA frames the Llano as Class II-II+ and lists this 3.8-mile connector between public-crossing access anchors, so treat it as a prepared Hill Country whitewater day rather than a casual float.",
        "Use only the Martin / Simonsville Crossing and Keller's Landing / US-87 access anchors unless current signs or local authorities direct otherwise. Private banks and ranch roads are not backup access.",
        "The Llano rises quickly after Hill Country storms. Recheck USGS 08151500, radar, and local rain before launch, and skip the route if wood, flood debris, low water, muddy banks, or posted restrictions make either crossing uncertain."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08151500",
      "provider": "usgs",
      "siteId": "08151500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Llano Rv at Llano, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08151500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 65,
      "idealMin": 100,
      "idealMax": 500,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Llano River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA describes the Llano as year-round when weather and flow cooperate, but this main-stem reach is rainfall-sensitive. Low summer water can expose limestone ledges, while thunderstorms can create fast rises and debris.",
      "difficulty": "hard",
      "difficultyNotes": "The route is hidden as whitewater because TRPA rates the Llano Class II-II+ and the selected endpoints are public-crossing access anchors that require same-day bank, parking, and sign checks.",
      "confidenceNotes": "Confidence is good for a conservative add: TRPA publishes the Martin/Simonsville-to-Keller's route at 3.8 miles, Class II-II+ character, Llano gauge links, access map links, and 65 / 100-500 / 5,000 cfs guidance. USGS 08151500 returned current product-supported discharge and stage during the implementation run."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "Martin / Simonsville Crossing to Keller's Landing / US-87, 3.8 mi",
        "note": "TRPA lists this as a 3.8-mile main Llano run and gives endpoint map links for the Martin / Simonsville and Keller's Landing access anchors.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "30.640650, -99.167714 to 30.660737, -99.109219",
        "note": "The route reuses the source-backed Martin / Simonsville and Keller's Landing access anchors from adjacent implemented Llano reaches. Trip details distinguish these from final water-entry points selected from current signs and bank conditions.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08151500 at 343 cfs / 2.39 ft",
        "note": "USGS Water Services returned same-day Llano River at Llano discharge and stage at 2026-08-11 09:00 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08151500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "65 cfs floor; 100-500 cfs ideal; 5,000 cfs ceiling",
        "note": "TRPA publishes Llano flow guidance with a 65 cfs minimum, 100-500 cfs ideal window, and 5,000 cfs maximum caution tied to the Llano gauge family.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Camping",
        "value": "No route camping selected",
        "note": "TRPA identifies the endpoints as access anchors and warns paddlers to respect no-trespassing and use-restriction signs. No legal on-route campsite was selected, and private-bank or gravel-bar camping is not inferred.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Safety",
        "value": "Class II-II+, fast rises, wood, US-87 bank condition, and private banks",
        "note": "TRPA lists the Llano as Class II-II+ and notes Keller's Landing has steep, muddy access; the route package records Hill Country storm response, strainers, low-water scraping, and private-bank discipline.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TRPA, Commons, USGS, and same-route web image review found route-context photos but no clearly rights-clean exact Martin/Simonsville-to-Keller's reusable paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Llano+River+Martin+Simonsville+Keller%27s+Landing+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TRPA Llano River",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      {
        "label": "TRPA Martin / Simonsville Crossing map",
        "url": "https://goo.gl/maps/GQDM1gk8QreebCLm6",
        "provider": "local"
      },
      {
        "label": "USGS 08151500 Llano River at Llano",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08151500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08151500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08151500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "llano-river-kellers-landing-castell-crossing",
    "slug": "llano-river-kellers-landing-castell-crossing",
    "name": "Llano River",
    "reach": "Keller's Landing to Castell Crossing",
    "aliases": [
      "Llano River US 87 to Castell Crossing",
      "Keller's Landing US-87 to Castell Crossing",
      "Llano River near Mason to Castell"
    ],
    "state": "Texas",
    "region": "Hill Country",
    "routeType": "whitewater",
    "summary": "Main Llano River run from Keller's Landing at US-87 to TPWD's leased Castell Crossing access. TRPA publishes the 12-mile route, numeric Llano flow bands, Class II-II+ character, and same-river gauge links, while TPWD confirms the active Castell take-out and no-camping rule.",
    "statusText": "Use the Llano River near Mason gauge. Treat 65 cfs as the conservative floor, 100-500 cfs as the preferred window, and 5,000 cfs as the high-water ceiling; this whitewater-hidden card still needs same-day scouting, weather, and access checks.",
    "latitude": 30.660737,
    "longitude": -99.109219,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "access_uncertain",
        "private_banks"
      ],
      "safetyNotes": [
        "TRPA frames the Llano as Class II-II+ and says Keller's Landing at US-87 has steep, muddy access. Treat this as a prepared whitewater day, not a casual roadside float.",
        "Use only public or permission-backed access. Castell Crossing is a TPWD leased take-out, but the US-87 put-in is a road-crossing access anchor that must be checked for current signs, parking, bank condition, and safety on arrival.",
        "The Llano rises quickly after Hill Country storms. Recheck USGS 08150700, radar, and local rain before launch, and skip the route if wood, flood debris, or private-bank limits make the access plan uncertain."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08150700",
      "provider": "usgs",
      "siteId": "08150700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Llano Rv nr Mason, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08150700/"
    },
    "fallbackGaugeSources": [
      {
        "id": "usgs-08151500",
        "provider": "usgs",
        "siteId": "08151500",
        "metric": "discharge_cfs",
        "unit": "cfs",
        "kind": "proxy",
        "siteName": "Llano Rv at Llano, TX",
        "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08151500/"
      }
    ],
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 65,
      "idealMin": 100,
      "idealMax": 500,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Llano River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA describes the Llano as year-round when weather and flow cooperate, but this main-stem reach is rainfall-sensitive. Low summer water can expose limestone ledges, while thunderstorms can create fast rises and debris.",
      "difficulty": "hard",
      "difficultyNotes": "The route is hidden as whitewater because TRPA rates the Llano Class II-II+, American Whitewater rates the overlapping US-87 reach II(III), and the US-87 access is steep and muddy with limited route-manager infrastructure.",
      "confidenceNotes": "Confidence is good for a conservative add: TRPA publishes the Keller's-Landing-to-Castell route at 12 miles, Class II-II+ character, Llano gauge links, and 65 / 100-500 / 5000 cfs guidance. American Whitewater publishes US-87 access coordinates and current USGS 08150700 flow context for an overlapping Llano reach. TPWD publishes Castell Crossing as an active leased access through August 31, 2027, with coordinates, daylight public use, and no overnight camping."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "Keller's Landing (US-87) to Castell Crossing, 12 mi",
        "note": "TRPA lists Keller's Landing to Castell Crossing as a 12-mile main Llano route and identifies the access as steep and muddy from US-87.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "30.660737, -99.109219 to 30.704516, -98.958782",
        "note": "The put-in uses the USGS/American Whitewater US-87 access and gauge coordinate for Keller's Landing. TPWD publishes the Castell Crossing leased-access coordinate.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/111187"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08150700 at 347 cfs / 7.07 ft",
        "note": "USGS Water Services returned same-day Llano River near Mason discharge and stage at 2026-08-11 00:15 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08150700&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "65 cfs floor; 100-500 cfs ideal; 5,000 cfs ceiling",
        "note": "TRPA publishes Llano flow guidance with a 65 cfs minimum, 100-500 cfs ideal window, and 5,000 cfs maximum caution tied to the Llano gauge family.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Camping",
        "value": "No route camping selected",
        "note": "TPWD says overnight camping is not allowed at Castell Crossing. No legal on-route campsite was selected, and private-bank or gravel-bar camping is not inferred.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/llano_castell.phtml"
      },
      {
        "label": "Safety",
        "value": "Class II-II+, steep muddy put-in, fast rises and private banks",
        "note": "TRPA lists the Llano as Class II-II+, describes steep muddy access at US-87, and links river-safety guidance; the route also carries Hill Country storm and private-bank caveats.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TRPA, TPWD, American Whitewater, Commons, USGS, and same-route web review found route-context photos but no clearly rights-clean exact Keller's-to-Castell paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Llano+River+Keller%27s+Landing+Castell+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TRPA Llano River",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      {
        "label": "TPWD Castell Crossing",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/llano_castell.phtml",
        "provider": "local"
      },
      {
        "label": "American Whitewater Llano US 87 reach",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/2841/main",
        "provider": "american_whitewater"
      },
      {
        "label": "American Whitewater US 87 access coordinate",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/111187",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 08150700 Llano River near Mason",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08150700/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08150700 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08150700&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "san-marcos-river-city-park-smrr",
    "slug": "san-marcos-river-city-park-smrr",
    "name": "San Marcos River",
    "reach": "City Park to San Marcos River Retreat",
    "aliases": [
      "San Marcos City Park to Westerfield Crossing",
      "City Park to Westerfield Crossing to SM Scout Camp",
      "Upper San Marcos River run"
    ],
    "state": "Texas",
    "region": "Hill Country",
    "routeType": "whitewater",
    "summary": "Classic upper San Marcos run from City Park through Rio Vista, Cape's, and Cummings dam-portage decisions to the TPWD RACA access at San Marcos River Retreat. TRPA publishes the six-mile route, numeric San Marcos gauge guidance, and detailed portage cautions.",
    "statusText": "Use the San Marcos River at San Marcos gauge. Treat 60 cfs as the minimum floor, readings below 100 cfs as low, 150 cfs as the clean target, and 500 cfs as the upper caution where upstream paddling and dam hydraulics become much less forgiving.",
    "latitude": 29.8859203,
    "longitude": -97.9344384,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "dam",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "TRPA's route notes call for conservative handling at Rio Vista Falls, Cape's Dam, and Cummings Dam; most groups should portage rather than run uncertain drops.",
        "Cummings Dam is explicitly described as very dangerous. Stay away from the hydraulic, portage with margin, and do not paddle back toward the waterfall to surf.",
        "Private-property pressure is real below the city parks. Use City Park, Rio Vista, Westerfield Crossing, and San Marcos River Retreat access only as allowed, and do not stop on private banks except for immediate safety."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08170500",
      "provider": "usgs",
      "siteId": "08170500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "San Marcos Rv at San Marcos, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08170500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 60,
      "idealMin": 100,
      "idealMax": 150,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "TRPA San Marcos City Park to SMRR flow guidance",
        "url": "https://txrivers.org/discover-texas-rivers/san-marcos-river/san-marcos-river-city-park-westerfield-crossing-2-miles/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The spring-fed San Marcos often has year-round flow, but TRPA warns that weather, Blanco River runoff, flash flooding, crowds, and confusing downstream gauge context still matter for same-day decisions.",
      "difficulty": "hard",
      "difficultyNotes": "The base current is approachable, but this card is hidden as whitewater because the route includes manmade drops, multiple dam-portage choices, strong-current eddies, and a high-consequence Cummings Dam hazard before the private/RACA take-out.",
      "confidenceNotes": "Confidence is good for a conservative add: TRPA names the City Park-to-Westerfield/SMRR route, mileage, portage sequence, direct USGS 08170500 gauge, and 60 / 150 / 500 cfs guidance; City of San Marcos confirms public City Park river access; San Marcos River Retreat confirms TPWD RACA day-use paddle access for a fee. Coordinates are resolved from the TRPA Google map anchors and recorded as access anchors rather than exact wetted-edge promises."
    },
    "evidenceNotes": [
      {
        "label": "Route shape and threshold",
        "value": "City Park to SMRR, about 6 mi; 60 / 150 / 500 cfs",
        "note": "TRPA publishes the City Park to Westerfield Crossing / SMRR Scout Camp route with a six-mile distance, 60 cfs minimum, below-100 cfs low cue, 150 cfs ideal, and 500 cfs maximum guidance tied to USGS San Marcos.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/san-marcos-river/san-marcos-river-city-park-westerfield-crossing-2-miles/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08170500 at 97.7 cfs / 3.94 ft",
        "note": "USGS Water Services returned same-day San Marcos River at San Marcos discharge and stage at 2026-08-10 10:45 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08170500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Public put-in",
        "value": "City Park river access",
        "note": "The City of San Marcos says City Park provides San Marcos River access and allows visitors to bring kayaks, canoes, paddleboards, and tubes with no reservation required.",
        "sourceUrl": "https://sanmarcostx.gov/facilities/facility/details/City-Park-35"
      },
      {
        "label": "Take-out access",
        "value": "San Marcos River Retreat TPWD RACA day-use access",
        "note": "San Marcos River Retreat describes itself as a private campground and TPWD River Access and Conservation Area site that allows individuals to launch canoes or kayaks from its banks for a day-use fee, subject to site rules.",
        "sourceUrl": "https://sanmarcosriverretreat.com/"
      },
      {
        "label": "Dam and portage safety",
        "value": "Rio Vista, Cape's Dam, Cummings Dam, Westerfield Crossing",
        "note": "TRPA's route notes give portage handling at Rio Vista, Cape's Dam, Cummings Dam, and Westerfield Crossing, including a hard warning that Cummings Dam is very dangerous and should not be surfed or treated casually.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/san-marcos-river/san-marcos-river-city-park-westerfield-crossing-2-miles/"
      },
      {
        "label": "Camping",
        "value": "Endpoint campground only by reservation or group/day-use rules",
        "note": "San Marcos River Retreat is a private campground and day-use RACA access site; route camping is not inferred from private banks or city parks, and the normal paddle should be treated as a day route unless separate campground arrangements are made.",
        "sourceUrl": "https://sanmarcosriverretreat.com/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TRPA, City of San Marcos, San Marcos River Retreat, Commons, USGS, and same-route web review found route-context photos but no clearly rights-clean exact City-Park-to-SMRR paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=San+Marcos+River+City+Park+Westerfield+Crossing+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TRPA City Park to SMRR route",
        "url": "https://txrivers.org/discover-texas-rivers/san-marcos-river/san-marcos-river-city-park-westerfield-crossing-2-miles/",
        "provider": "local"
      },
      {
        "label": "City of San Marcos City Park",
        "url": "https://sanmarcostx.gov/facilities/facility/details/City-Park-35",
        "provider": "local"
      },
      {
        "label": "San Marcos River Retreat",
        "url": "https://sanmarcosriverretreat.com/",
        "provider": "local"
      },
      {
        "label": "Visit San Marcos river and park rules",
        "url": "https://www.visitsanmarcos.com/plan-your-visit/about-san-marcos/park-and-river-information/",
        "provider": "local"
      },
      {
        "label": "USGS 08170500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08170500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08170500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08170500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "san-marcos-river-retreat-scull-road",
    "slug": "san-marcos-river-retreat-scull-road",
    "name": "San Marcos River",
    "reach": "San Marcos River Retreat to Scull Road",
    "aliases": [
      "San Marcos River Retreat to Scull's Crossing",
      "SMRR to Scull Road",
      "Cottonseed Rapids run"
    ],
    "state": "Texas",
    "region": "Hill Country",
    "routeType": "whitewater",
    "summary": "Short TPWD-supported San Marcos run from the San Marcos River Retreat lease access to the Scull Road lease access. The route is useful for paddlers who want the Cottonseed Rapids reach without continuing into the flatwater and Martindale Dam section downstream.",
    "statusText": "Use the San Marcos River at Luling gauge. Treat 100 cfs as the conservative minimum floor, expect below-200 cfs readings to feel shallow and scrapey, and portage Cottonseed unless the group is deliberately equipped for the Class II sieve hazard.",
    "latitude": 29.8584,
    "longitude": -97.8876,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "dam",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Cottonseed Rapids contains old dam remnants and an American Whitewater-documented river-left sieve that can be deadly; stay right, scout, and portage river right unless the group is intentionally running the hazard.",
        "Scull Road is the planned take-out. Missing it commits paddlers to flatwater above Martindale Dam and a required downstream dam portage.",
        "The low Scull Road bridge can become a hazard at higher flows, and both TPWD and American Whitewater describe parking/loading limits and private-bank pressure at the crossing."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08172000",
      "provider": "usgs",
      "siteId": "08172000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "San Marcos Rv at Luling, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08172000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "American Whitewater San Marcos Westerfield-to-FM 1979 flow guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/5195/main",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The spring-fed San Marcos can hold boatable water through dry periods, but this reach responds to Blanco River runoff, local storms, debris, and access restrictions. Make a same-day call on both gauge trend and bridge/rapid conditions.",
      "difficulty": "hard",
      "difficultyNotes": "The run is short and generally Class I-II, but this card is hidden as whitewater because Cottonseed has a documented sieve, Scull Road is a critical take-out, and high or rising water can make the bridge and downstream dam sequence much less forgiving.",
      "confidenceNotes": "Confidence is good for a conservative add: TPWD publishes active SMRR and Scull Road lease periods, public-use rules, coordinates, and the 3-mile SMRR-to-Scull float; TRPA lists the same 3-mile route; American Whitewater publishes the reach, access-point coordinates, direct Martindale/Luling gauge context, below-200-cfs scrapey guidance, Scull take-out details, and Cottonseed sieve warning. Threshold confidence remains conservative because the numeric floor is minimum-only and the route is hidden as whitewater."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "San Marcos River Retreat to Scull Road, 3 mi",
        "note": "TPWD says the Scull Road lease access serves as the take-out for a 3-mile float from San Marcos River Retreat and flags Cottonseed Rapids on this exact section.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/scull_rd.phtml"
      },
      {
        "label": "Access leases",
        "value": "SMRR and Scull Road leases active through August 31, 2027",
        "note": "TPWD publishes current lease periods, daylight public-use windows, fee/reservation or gate-code requirements, and boat-launch/take-out permissions for both endpoints.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/sanmarcos_retreat.phtml"
      },
      {
        "label": "Water-entry coordinates",
        "value": "29.85840, -97.88760 to 29.84960, -97.85690",
        "note": "American Whitewater publishes access-point coordinates for San Marcos River Retreat and CR 246 / Scull Road Bridge. TPWD's Scull Road coordinate is treated as the lease parking/access anchor because TPWD says parking is 0.16 miles southwest of the bridge.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/104842"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08172000 at 110 cfs / 3.87 ft",
        "note": "USGS Water Services returned same-day San Marcos River at Luling discharge and stage at 2026-08-10 19:45 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08172000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold and route use",
        "value": "Minimum-only 100 cfs; below 200 cfs is scrapey",
        "note": "American Whitewater says this San Marcos reach can be run below 200 cfs but tends to be scrapey, so the route ships with a conservative minimum-only floor rather than a claimed ideal range.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/5195/main"
      },
      {
        "label": "Cottonseed safety",
        "value": "Class II rapid with a river-left sieve",
        "note": "American Whitewater warns that Cottonseed's old dam remnants include a potentially deadly sieve at river left, advises paddlers to stay right, and notes that the rapid can be portaged river right. TPWD also says to portage unless confident.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/5195/main"
      },
      {
        "label": "Camping",
        "value": "No route camping inferred",
        "note": "The TPWD lease pages describe daylight public-use access, fees, reservations, gate code, and parking rules, but do not publish route camping rights for the public lease use. San Marcos River Retreat is a separate private campground, so overnight use requires separate campground arrangements.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/sanmarcos_retreat.phtml"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, TRPA, American Whitewater, Commons, USGS, and same-route web review found maps/context and no clearly rights-clean exact SMRR-to-Scull paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=San+Marcos+River+Retreat+Scull+Road+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD San Marcos River Retreat access",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/sanmarcos_retreat.phtml",
        "provider": "local"
      },
      {
        "label": "TPWD Scull Road Bridge access",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/scull_rd.phtml",
        "provider": "local"
      },
      {
        "label": "TRPA San Marcos River route list",
        "url": "https://txrivers.org/discover-texas-rivers/san-marcos-river/",
        "provider": "local"
      },
      {
        "label": "American Whitewater San Marcos reach",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/5195/main",
        "provider": "local"
      },
      {
        "label": "American Whitewater SMRR access point",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/104839",
        "provider": "local"
      },
      {
        "label": "American Whitewater Scull Road access point",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/104842",
        "provider": "local"
      },
      {
        "label": "USGS 08172000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08172000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08172000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08172000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "san-marcos-river-sh90-zedler-mill",
    "slug": "san-marcos-river-sh90-zedler-mill",
    "name": "San Marcos River",
    "reach": "SH 90 River Crossing to Zedler Mill Park",
    "aliases": [
      "Luling Zedler Mill Paddling Trail",
      "San Marcos River - Luling Zedler Mill",
      "SH 90 to Zedler Mill Park"
    ],
    "state": "Texas",
    "region": "Prairies and Lakes",
    "summary": "Official six-mile Luling Zedler Mill trail from the SH 90 river crossing to Zedler Mill Park. TPWD publishes the public endpoints, coordinates, gentle Class I character, and the downstream dam warning, while the Luling USGS gauge gives a direct same-river condition check.",
    "statusText": "Use the San Marcos River at Luling gauge. Treat 100 cfs as the conservative minimum-only floor for the Luling-to-Gonzales corridor; current water near that floor can mean more snags, logjams, and shallow routing.",
    "latitude": 29.6679,
    "longitude": -97.6999,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Zedler Mill Park is the planned take-out; TPWD warns there is a dam beyond the mill and paddlers should pay attention so they do not pass the exit.",
        "TPWD describes numerous snags and logjams on this otherwise gentle reach, especially when water levels are low.",
        "The San Marcos is navigable here, but TPWD warns that using private banks outside direct hazard portages can be trespassing."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08172000",
      "provider": "usgs",
      "siteId": "08172000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "San Marcos Rv at Luling, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08172000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Texas River Flows five-level San Marcos / Luling gauge table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The spring-fed San Marcos can run in most seasons, but this lower Luling reach still needs same-day flow and weather checks. Low water makes wood and shallow route-finding more consequential, while post-rain pulses can change current, debris, and water quality.",
      "difficulty": "easy",
      "difficultyNotes": "TPWD frames the route as gentle and family-friendly, with small Class I rapids and quiet pools. The route stays caution-rated because of numerous snags and the firm Zedler Mill take-out above a downstream dam.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD publishes the exact six-mile Luling Zedler Mill trail with endpoint coordinates, public parking, route character, private-bank rules, and the downstream dam warning; USGS 08172000 is a direct same-river gauge at the take-out town; and the legacy Texas River Flows table ties a 100 cfs minimum to the San Marcos Luling-to-Gonzales corridor on the Luling gauge. Confidence remains conservative because the threshold source is older corridor guidance, so the route ships minimum-only and does not claim an ideal or high-side recommendation."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "SH 90 River Crossing to Zedler Mill Park, 6.0 mi",
        "note": "TPWD identifies the Luling Zedler Mill Paddling Trail as a six-mile San Marcos River route usually floated in two to four hours.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/luling-zedler-mill/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "29.6679, -97.6999 to 29.6671, -97.6519",
        "note": "TPWD publishes the SH 90 River Crossing put-in and Zedler Mill Park take-out coordinates and says parking is available at both locations.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/luling-zedler-mill/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08172000 at 118 cfs / 3.93 ft",
        "note": "USGS Water Services returned same-day values for San Marcos River at Luling, TX at 2026-08-09 07:45 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08172000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "100 cfs minimum-only",
        "note": "The Texas River Flows five-level table lists the San Marcos Luling-to-Gonzales segment on the Luling gauge at 100 / 150 / 300 / 1000 / 1500 cfs, with level 1 defined as minimum floating water.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Safety and access context",
        "value": "Snags, private-bank limits, and downstream dam",
        "note": "TPWD says the route has small Class I rapids and quiet pools, warns that snags and logjams are numerous at low water, explains private-bank limits, and flags the dam beyond Zedler Mill.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/luling-zedler-mill/"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Luling Zedler Mill Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/luling-zedler-mill/",
        "provider": "local"
      },
      {
        "label": "TPWD Luling Zedler Mill trail map PDF",
        "url": "https://tpwd.texas.gov/publications/pwdpubs/media/pwd_mp_t3200_1192.pdf",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08172000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08172000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08172000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08172000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "colorado-river-texas-river-school-fm973",
    "slug": "colorado-river-texas-river-school-fm973",
    "name": "Colorado River",
    "reach": "Texas River School River Camp to FM 973 / Del Valle Bridge",
    "aliases": [
      "Texas River School to FM 973",
      "River Camp to Del Valle Bridge",
      "Lower Colorado River Camp to FM 973"
    ],
    "state": "Texas",
    "region": "Prairies and Lakes",
    "summary": "Short lower-Colorado split from the active TPWD Texas River School leased-access camp in east Austin to LCRA's FM 973 / Del Valle Bridge access. TPWD publishes the River Camp access, camping rules, and five-mile spacing to the Highway 973 take-out, while the Austin USGS gauge gives the product-supported flow check for the Austin-to-Bastrop corridor.",
    "statusText": "Use the Colorado River at Austin gauge. Treat about 200 cfs as the conservative Austin-to-Bastrop floating floor; at current water above that floor, still confirm the Texas River School reservation, scout the FM 973 landing, and plan around release changes, wind, heat, shallow bars, and private-bank limits.",
    "latitude": 30.256179,
    "longitude": -97.634178,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This route intentionally starts at Texas River School, downstream of the urban upstream access sequence where LCRA flags a low-head dam between US 183 and FM 973; do not extend the trip upstream without a separate dam-portage plan.",
        "LCRA describes FM 973 / Del Valle Bridge as limited parking with an uneven carry to the river; scout the take-out path before launching upstream.",
        "Use Texas River School and FM 973 / Del Valle Bridge as the public access pair, and do not infer legal casual stops or camping from islands, sandbars, or private shoreline."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08158000",
      "provider": "usgs",
      "siteId": "08158000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Colorado Rv at Austin, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08158000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows lower Colorado Austin-to-Bastrop table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.35,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The short River Camp-to-FM 973 split can work year-round when Texas River School access, releases, runoff, weather, and take-out conditions line up. Low water can expose bars and make the landing awkward, while storms or upstream release changes can quickly alter current, debris, and water quality.",
      "difficulty": "easy",
      "difficultyNotes": "The route is short and normally flatwater, but it stays caution-rated because access is reservation-controlled at the put-in, FM 973 has limited parking and an uneven carry, and release-driven flow, wind, heat, debris, and private banks can still matter.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD publishes Texas River School as an active leased-access River Camp with latitude/longitude, day-use and campground rules, and the five-mile distance to the Hwy 973 take-out; LCRA publishes FM 973 / Del Valle Bridge as a lower-Colorado access point with coordinates and access caveats; USGS 08158000 is product-supported for the Austin-to-Bastrop corridor; and the legacy Texas River Flows table gives a 200 cfs minimum floating level for Colorado Austin-to-Bastrop. Confidence remains conservative because the numeric floor is broad lower-Colorado guidance rather than a modern manager-published River-Camp-specific band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Texas River School River Camp to FM 973 / Del Valle Bridge, 5 mi",
        "note": "TPWD states that Texas River School River Camp is five miles upriver from the Hwy 973 take-out, and LCRA lists FM 973 / Del Valle Bridge as a lower-Colorado public access point.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/riverschool.phtml"
      },
      {
        "label": "Public endpoint access",
        "value": "Active TPWD leased access to LCRA-listed TxDOT bridge access",
        "note": "TPWD lists Texas River School as a leased-access fishing, boating, paddling, and camping area open by advance reservation through August 31, 2027; LCRA identifies FM 973 / Del Valle Bridge as a TxDOT-managed river access with limited parking and an uneven carry.",
        "sourceUrl": "https://lcraparks.com/paddle-the-colorado"
      },
      {
        "label": "Access-anchor coordinates",
        "value": "30.256179, -97.634178 to 30.21, -97.64",
        "note": "TPWD publishes the Texas River School River Camp latitude/longitude, and LCRA publishes rounded FM 973 / Del Valle Bridge access-anchor coordinates. Treat both as planning anchors and select the actual wetted launch or landing only from signed, open access paths on arrival.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/riverschool.phtml"
      },
      {
        "label": "Product-supported live gauge",
        "value": "USGS 08158000 at 1160 cfs / 15.34 ft",
        "note": "USGS Water Services JSON returned same-day Colorado River at Austin discharge and gage height at 2026-08-13 23:50 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08158000&period=P1D&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Texas River Flows lists the Colorado Austin-to-Bastrop corridor at 200 / 500 / 1,000 / 3,000 / 5,000 cfs and defines the first tier as minimum floating water; Paddle Today uses only that conservative floor.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Camping and endpoint rules",
        "value": "Endpoint campground at Texas River School",
        "note": "TPWD publishes eight primitive campsites at Texas River School with reservation, fee, gate-code, fire, pet, and pack-in/pack-out rules. FM 973 is not a campground, and route camping is not inferred from private banks, islands, or sandbars.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/riverschool.phtml"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, Texas River School, LCRA, Commons, USGS, and same-route web image review found route-context photos but no clearly rights-clean exact Texas-River-School-to-FM-973 paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Texas+River+School+FM+973+Colorado+River+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Texas River School access",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/riverschool.phtml",
        "provider": "local"
      },
      {
        "label": "LCRA Paddle the Colorado",
        "url": "https://lcraparks.com/paddle-the-colorado",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08158000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08158000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08158000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08158000&period=P1D&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "colorado-river-texas-river-school-little-webberville",
    "slug": "colorado-river-texas-river-school-little-webberville",
    "name": "Colorado River",
    "reach": "Texas River School River Camp to Little Webberville Park",
    "aliases": [
      "Texas River School to Little Webberville",
      "Colorado River - River Camp to Little Webberville",
      "Austin lower Colorado River Camp to Little Webberville"
    ],
    "state": "Texas",
    "region": "Prairies and Lakes",
    "summary": "Long lower-Colorado day from the active TPWD Texas River School leased-access camp in east Austin to Travis County's Little Webberville Park. TPWD and Texas River School publish the River Camp access, camping rules, and 17.5-mile spacing to Little Webberville, while the Austin USGS gauge gives the product-supported flow check for the Austin-to-Bastrop corridor.",
    "statusText": "Use the Colorado River at Austin gauge. Treat about 200 cfs as the conservative Austin-to-Bastrop floating floor; at current water above that floor, still budget for a long exposed day with release changes, wind, heat, shallow bars, and private-bank limits.",
    "latitude": 30.256179,
    "longitude": -97.634178,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a 17.5-mile lower-Colorado day with limited public exits, so wind, heat, late starts, low-water dragging, or release changes can turn a normal paddle into a long commitment.",
        "The Austin gauge is upstream and the threshold floor is broad Austin-to-Bastrop guidance; verify visible level and current at Texas River School before launching.",
        "Use Texas River School and Little Webberville Park as the public access pair, and do not infer legal casual stops or camping from islands, sandbars, or private shoreline."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08158000",
      "provider": "usgs",
      "siteId": "08158000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Colorado Rv at Austin, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08158000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows lower Colorado Austin-to-Bastrop table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.45,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Austin-to-Webberville corridor can work year-round when releases, runoff, weather, and access conditions line up. Low water can expose bars and slow the 17.5-mile trip, while storms or upstream release changes can quickly alter current, debris, and water quality.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is normally flatwater, but it is moderate because the 17.5-mile distance, few public exits, urban-to-rural transition, wind exposure, heat, motorboat traffic, and release-driven flow changes require an early start and conservative planning.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD and Texas River School publish the active leased-access River Camp, its latitude/longitude, day-use and camping rules, and the 17.5-mile spacing to Little Webberville Park; LCRA and Travis County publish Little Webberville as a lower-Colorado public access; USGS 08158000 is product-supported for the Austin-to-Bastrop corridor; and the legacy Texas River Flows table gives a 200 cfs minimum floating level for Colorado Austin-to-Bastrop. Confidence remains conservative because the numeric floor is broad lower-Colorado guidance rather than a modern manager-published River-Camp-specific band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Texas River School River Camp to Little Webberville Park, 17.5 mi",
        "note": "TPWD and Texas River School both state that River Camp is 17.5 miles upriver from Little Webberville Park, and LCRA independently lists Little Webberville as a lower-Colorado public access point.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/riverschool.phtml"
      },
      {
        "label": "Public endpoint access",
        "value": "Active TPWD leased access to Travis County park take-out",
        "note": "TPWD lists Texas River School as a leased-access fishing, boating, paddling, and camping area open by advance reservation through August 31, 2027; Travis County publishes Little Webberville Park with Colorado River boat-ramp access for canoeing and kayaking.",
        "sourceUrl": "https://parks.traviscountytx.gov/parks/little-webberville"
      },
      {
        "label": "Access-anchor coordinates",
        "value": "30.256179, -97.634178 to 30.229665, -97.518125",
        "note": "TPWD publishes the Texas River School River Camp latitude/longitude, and the Little Webberville coordinate is the already accepted Travis County / LCRA access anchor used by Paddle Today.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/riverschool.phtml"
      },
      {
        "label": "Product-supported live gauge",
        "value": "USGS 08158000 at 1140 cfs / 15.29 ft",
        "note": "USGS Water Services JSON returned same-day Colorado River at Austin discharge and gage height at 2026-08-10 22:50 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08158000&period=P1D&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Texas River Flows lists the Colorado Austin-to-Bastrop corridor at 200 / 500 / 1,000 / 3,000 / 5,000 cfs and defines the first tier as minimum floating water; Paddle Today uses only that conservative floor.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Camping and endpoint rules",
        "value": "Endpoint campground at Texas River School",
        "note": "Texas River School publishes eight primitive campsites with reservation, fee, fire, parking, and pack-in/pack-out rules at the put-in. The downstream route remains private-bank-sensitive, and Little Webberville prohibits camping.",
        "sourceUrl": "https://texasriverschool.org/programs/campground-and-colorado-river-access/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, Texas River School, LCRA, Travis County, Commons, USGS, and same-route web image review found route-context photos but no clearly rights-clean exact Texas-River-School-to-Little-Webberville paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Texas+River+School+Little+Webberville+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Texas River School access",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/riverschool.phtml",
        "provider": "local"
      },
      {
        "label": "Texas River School campground and river access",
        "url": "https://texasriverschool.org/programs/campground-and-colorado-river-access/",
        "provider": "local"
      },
      {
        "label": "LCRA Paddle the Colorado",
        "url": "https://lcraparks.com/paddle-the-colorado",
        "provider": "local"
      },
      {
        "label": "Travis County Little Webberville Park",
        "url": "https://parks.traviscountytx.gov/parks/little-webberville",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08158000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08158000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08158000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08158000&period=P1D&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "colorado-river-fm973-little-webberville",
    "slug": "colorado-river-fm973-little-webberville",
    "name": "Colorado River",
    "reach": "FM 973 / Del Valle Bridge to Little Webberville Park",
    "aliases": [
      "FM 973 to Little Webberville",
      "Del Valle Bridge to Little Webberville",
      "Lower Colorado River FM 973 to Little Webberville"
    ],
    "state": "Texas",
    "region": "Prairies and Lakes",
    "summary": "Public lower-Colorado day route from the LCRA-listed FM 973 / Del Valle Bridge access to Travis County's Little Webberville Park. LCRA publishes the consecutive access points and 12-mile spacing, while the Austin USGS gauge gives a product-supported flow check for the Austin-to-Bastrop corridor.",
    "statusText": "Use the Colorado River at Austin gauge. Treat about 200 cfs as the conservative Austin-to-Bastrop floating floor; below that, expect shallow bars and slow travel, and at high or rising water treat release changes, debris, and private banks conservatively.",
    "latitude": 30.21,
    "longitude": -97.64,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "LCRA describes FM 973 / Del Valle Bridge as limited parking with an uneven carry to the river; scout the launch path before leaving a shuttle vehicle.",
        "This 12-mile lower-Colorado reach has limited public exits. Wind, heat, low-water bars, release changes, or a late start can turn an easy current into a long day.",
        "Use only the LCRA/Travis County access anchors and do not infer casual stops or camping from islands, sandbars, or private shoreline."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08158000",
      "provider": "usgs",
      "siteId": "08158000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Colorado Rv at Austin, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08158000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows lower Colorado Austin-to-Bastrop table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.45,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The FM 973-to-Webberville corridor can work year-round when releases, runoff, weather, and access conditions line up. Low water can expose bars and slow the 12-mile trip, while storms or upstream release changes can quickly alter current, debris, and water quality.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is normally flatwater, but it is moderate because the 12-mile distance, few public exits, uneven FM 973 launch carry, wind exposure, heat, and release-driven flow changes require early planning.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: LCRA publishes FM 973 / Del Valle Bridge and Little Webberville Park as consecutive lower-Colorado access points with 12 miles between them and coordinates for each; Travis County confirms Little Webberville river access for canoeing and kayaking and no-camping rules; USGS 08158000 is product-supported for the Austin-to-Bastrop corridor; and the legacy Texas River Flows table gives a 200 cfs minimum floating level for Colorado Austin-to-Bastrop. Confidence remains conservative because the numeric floor is broad lower-Colorado guidance rather than a modern route-manager FM-973-specific band."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "FM 973 / Del Valle Bridge to Little Webberville Park, 12 mi",
        "note": "LCRA lists FM 973 / Del Valle Bridge and Little Webberville Park as consecutive lower-Colorado access points and gives 12 miles from FM 973 to the next point.",
        "sourceUrl": "https://lcraparks.com/paddle-the-colorado"
      },
      {
        "label": "Public endpoint access",
        "value": "TxDOT bridge access to Travis County park ramp",
        "note": "LCRA identifies FM 973 / Del Valle Bridge as a TxDOT-managed access with limited parking and an uneven carry, and Travis County publishes Little Webberville as a park with 24-hour boat ramp access and river access for canoeing and kayaking.",
        "sourceUrl": "https://parks.traviscountytx.gov/parks/little-webberville"
      },
      {
        "label": "Access-anchor coordinates",
        "value": "30.21, -97.64 to 30.23, -97.52",
        "note": "LCRA publishes access-anchor coordinates for both FM 973 / Del Valle Bridge and Little Webberville Park. Treat them as planning anchors, not exact wetted-edge launch points.",
        "sourceUrl": "https://lcraparks.com/paddle-the-colorado"
      },
      {
        "label": "Product-supported live gauge",
        "value": "USGS 08158000 at 185 cfs / 12.39 ft",
        "note": "USGS Water Services JSON returned same-day Colorado River at Austin discharge and gage height at 2026-08-11 12:50 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08158000&period=P1D&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Texas River Flows lists the Colorado Austin-to-Bastrop corridor at 200 / 500 / 1,000 / 3,000 / 5,000 cfs and defines the first tier as minimum floating water; Paddle Today uses only that conservative floor.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Camping",
        "value": "No route camping selected",
        "note": "Travis County prohibits camping at Little Webberville, and LCRA does not identify FM 973 / Del Valle Bridge as a campground. Do not infer legal camping from private banks, islands, or sandbars on this shorter public-access route.",
        "sourceUrl": "https://parks.traviscountytx.gov/parks/little-webberville"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded LCRA, Travis County, TPWD, Commons, USGS, and same-route web image review found route-context photos but no clearly rights-clean exact FM-973-to-Little-Webberville paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Colorado+River+FM+973+Little+Webberville+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "LCRA Paddle the Colorado",
        "url": "https://lcraparks.com/paddle-the-colorado",
        "provider": "local"
      },
      {
        "label": "Travis County Little Webberville Park",
        "url": "https://parks.traviscountytx.gov/parks/little-webberville",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08158000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08158000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08158000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08158000&period=P1D&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "colorado-river-little-webberville-big-webberville",
    "slug": "colorado-river-little-webberville-big-webberville",
    "name": "Colorado River",
    "reach": "Little Webberville Park to Webberville Park",
    "aliases": [
      "Little Webberville to Big Webberville",
      "Webberville Colorado River Trail",
      "Colorado River - Little Webberville to Webberville Park"
    ],
    "state": "Texas",
    "region": "Prairies and Lakes",
    "summary": "Easy lower-Colorado day trip between Travis County's Little Webberville and Webberville county parks. LCRA publishes the five-mile access spacing, both county parks provide boat ramps and Colorado River access, and the Austin USGS gauge gives the upstream product-supported flow check for the Austin-to-Bastrop corridor.",
    "statusText": "Use the Colorado River at Austin gauge. Treat about 200 cfs as the conservative Austin-to-Bastrop floating floor, with same-day visual checks for low-water scraping, motorboat traffic, wind, and fast changes after releases or rain.",
    "latitude": 30.229665,
    "longitude": -97.518125,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a short, generally easy reach, but LCRA still tells paddlers to scout take-outs, watch river and weather conditions, and expect travel pace to depend on current.",
        "Low water near the conservative floor can expose shallow bars and slow the trip; high or rising water after releases or storms can add debris, stronger current, and less forgiving bank exits.",
        "Use the Travis County park ramps as the public access pair and do not infer legal camping or casual bank use from nearby islands, sandbars, or private shoreline."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08158000",
      "provider": "usgs",
      "siteId": "08158000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Colorado Rv at Austin, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08158000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows lower Colorado Austin-to-Bastrop table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.3,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Webberville reach can work year-round when releases, runoff, weather, and county-park access line up. Low water can make the short trip scrape-prone and slow, while storms or upstream release changes can quickly alter current, debris, and water quality.",
      "difficulty": "easy",
      "difficultyNotes": "The route is short and normally gentle, but it stays caution-rated because paddlers share a broad regulated river with motorboats, low-water bars, wind exposure, changing releases, and private banks away from the two public parks.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: LCRA documents Little Webberville Park and Big Webberville Park as lower-Colorado public access points five river miles apart; Travis County publishes both endpoint parks with boat ramps and river access for canoeing and kayaking; USGS 08158000 is a product-supported upstream gauge for the Austin-to-Bastrop corridor; and the legacy Texas River Flows table gives a 200 cfs minimum floating level for Colorado Austin-to-Bastrop. Confidence remains conservative because the numeric floor is broad lower-Colorado guidance rather than a modern route-manager band, so the route ships minimum-only."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Little Webberville Park to Webberville Park, 5 mi",
        "note": "LCRA Paddle the Colorado lists Little Webberville Park and Big Webberville Park as consecutive lower-Colorado access points, with five miles to the next point from Little Webberville and five miles to the previous point at Big Webberville.",
        "sourceUrl": "https://lcraparks.com/paddle-the-colorado"
      },
      {
        "label": "Public endpoint access",
        "value": "Travis County park boat ramps",
        "note": "Travis County Parks publishes Little Webberville Park and Webberville Park as county parks with boat ramps and Colorado River access; Little Webberville explicitly lists river access for canoeing and kayaking, and Webberville identifies its paved boat ramp as a popular Colorado River access.",
        "sourceUrl": "https://parks.traviscountytx.gov/parks/little-webberville"
      },
      {
        "label": "Access-anchor coordinates",
        "value": "30.229665, -97.518125 to 30.215870, -97.494247",
        "note": "Travis County park map anchors identify the Little Webberville Park and Webberville Park access locations; LCRA independently corroborates the same access sequence with rounded lower-Colorado coordinates.",
        "sourceUrl": "https://parks.traviscountytx.gov/parks/webberville"
      },
      {
        "label": "Product-supported live gauge",
        "value": "USGS 08158000 at 216 cfs / 12.57 ft",
        "note": "USGS Water Services RDB returned same-day Colorado River at Austin discharge and gage height at 2026-08-10 09:50 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=rdb&sites=08158000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Texas River Flows lists the Colorado Austin-to-Bastrop corridor at 200 / 500 / 1,000 / 3,000 / 5,000 cfs and defines the first tier as minimum floating water; Paddle Today uses only that conservative floor.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Camping and endpoint rules",
        "value": "No route camping",
        "note": "Travis County Parks lists camping as prohibited at both Little Webberville Park and Webberville Park, so this ships as a day-use route with no inferred island, sandbar, or private-bank camping.",
        "sourceUrl": "https://parks.traviscountytx.gov/parks/little-webberville"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded LCRA, Travis County, Commons, USGS, and same-route web image review found route-context photos but no clearly rights-clean exact Little-Webberville-to-Webberville paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Little+Webberville+Colorado+River+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "LCRA Paddle the Colorado",
        "url": "https://lcraparks.com/paddle-the-colorado",
        "provider": "local"
      },
      {
        "label": "Travis County Little Webberville Park",
        "url": "https://parks.traviscountytx.gov/parks/little-webberville",
        "provider": "local"
      },
      {
        "label": "Travis County Webberville Park",
        "url": "https://parks.traviscountytx.gov/parks/webberville",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08158000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08158000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08158000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=rdb&sites=08158000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "colorado-river-webberville-utley-bridge",
    "slug": "colorado-river-webberville-utley-bridge",
    "name": "Colorado River",
    "reach": "Webberville Park to Utley (FM 969) Bridge",
    "aliases": [
      "Webberville Park to Utley Bridge",
      "Big Webberville to FM 969",
      "Colorado River - Webberville to Utley"
    ],
    "state": "Texas",
    "region": "Prairies and Lakes",
    "summary": "Long lower-Colorado day from Travis County's Webberville Park to the FM 969 / Utley Bridge access. LCRA and TRPA publish the 14-mile point-to-point shape, Webberville is a county park boat-ramp access, and the Austin USGS gauge gives the upstream product-supported flow check for this Austin-to-Bastrop corridor.",
    "statusText": "Use the Colorado River at Austin gauge. Treat about 200 cfs as the conservative Austin-to-Bastrop floating floor. Below that, expect a slow and scrape-prone 14-mile day; after rain or release changes, watch for stronger current, debris, and harder exits.",
    "latitude": 30.21587,
    "longitude": -97.494247,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a long flatwater reach, so low flow, heat, wind, and late starts can turn the 14 miles into a full-day commitment.",
        "Low water near the conservative floor can expose shallow bars and slow the trip; high or rising water after releases or storms can add debris, stronger current, and less forgiving bank exits.",
        "Use Webberville Park and the FM 969 / Utley Bridge access as the public access pair. Do not infer legal camping or casual bank use from islands, sandbars, or private shoreline."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08158000",
      "provider": "usgs",
      "siteId": "08158000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Colorado Rv at Austin, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08158000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows lower Colorado Austin-to-Bastrop table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.4,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Webberville-to-Utley reach can work year-round when releases, runoff, weather, and access conditions line up. Low water can make the 14 miles scrape-prone and slow, while storms or upstream release changes can quickly alter current, debris, and water quality.",
      "difficulty": "moderate",
      "difficultyNotes": "The river is normally gentle, but the route is moderate because 14 miles on a broad regulated river leaves little room for a late start, headwind, low-flow dragging, heat, motorboat traffic, or a missed take-out.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: LCRA documents Webberville Park and FM 969 / Utley Bridge as lower-Colorado public access points 14 river miles apart; TRPA lists Webberville-to-Utley as a featured 14-mile Colorado River run; Travis County publishes Webberville Park as a county park with a boat ramp; USGS 08158000 is a product-supported upstream gauge for the Austin-to-Bastrop corridor; and the legacy Texas River Flows table gives a 200 cfs minimum floating level for Colorado Austin-to-Bastrop. Confidence remains conservative because the numeric floor is broad lower-Colorado guidance rather than a modern route-manager band, so the route ships minimum-only and currently reads below floor."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Webberville Park to FM 969 / Utley Bridge, 14 mi",
        "note": "LCRA Paddle the Colorado lists Big Webberville Park with 14 miles to the next point at FM 969 / Utley Bridge; TRPA independently lists Webberville Park to Utley FM-969 Bridge / Boat Ramp as a 14-mile featured run.",
        "sourceUrl": "https://lcraparks.com/paddle-the-colorado"
      },
      {
        "label": "Public endpoint access",
        "value": "County park put-in and TxDOT bridge take-out",
        "note": "Travis County Parks publishes Webberville Park with boat-ramp access and daily ramp hours; LCRA identifies FM 969 / Utley Bridge as a TxDOT-managed lower-Colorado access point.",
        "sourceUrl": "https://parks.traviscountytx.gov/parks/webberville"
      },
      {
        "label": "Access-anchor coordinates",
        "value": "30.215870, -97.494247 to 30.168300, -97.402300",
        "note": "The Webberville coordinate is the existing Travis County access anchor already used by Paddle Today; the Utley coordinate is the TPWD / LCRA route-family access anchor already accepted for the downstream Wilbarger route.",
        "sourceUrl": "https://lcraparks.com/paddle-the-colorado"
      },
      {
        "label": "Product-supported live gauge",
        "value": "USGS 08158000 at 181 cfs / 12.36 ft",
        "note": "USGS Water Services returned same-day Colorado River at Austin discharge and gage height at 2026-08-10 12:50 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08158000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Texas River Flows lists the Colorado Austin-to-Bastrop corridor at 200 / 500 / 1,000 / 3,000 / 5,000 cfs and defines the first tier as minimum floating water; Paddle Today uses only that conservative floor.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Camping and endpoint rules",
        "value": "No route camping",
        "note": "Webberville Park is open during posted day-use boat-ramp hours, FM 969 is a bridge access, and no LCRA, Travis County, TPWD, or TRPA source supports legal camping for this 14-mile day segment.",
        "sourceUrl": "https://parks.traviscountytx.gov/parks/webberville"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded LCRA, Travis County, TRPA, Commons, USGS, and same-route web image review found route-context photos but no clearly rights-clean exact Webberville-to-Utley paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Colorado+River+Webberville+Utley+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "LCRA Paddle the Colorado",
        "url": "https://lcraparks.com/paddle-the-colorado",
        "provider": "local"
      },
      {
        "label": "Travis County Webberville Park",
        "url": "https://parks.traviscountytx.gov/parks/webberville",
        "provider": "local"
      },
      {
        "label": "TRPA Colorado River",
        "url": "https://txrivers.org/discover-texas-rivers/colorado-river-basin/",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08158000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08158000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08158000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08158000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "colorado-river-horseshoe-utley-bridge",
    "slug": "colorado-river-horseshoe-utley-bridge",
    "name": "Colorado River",
    "reach": "Horseshoe on the Colorado to Utley (FM 969) Bridge",
    "aliases": [
      "Horseshoe on the Colorado to Utley",
      "Horseshoe RACA to FM 969",
      "Colorado River - Horseshoe to Utley"
    ],
    "state": "Texas",
    "region": "Prairies and Lakes",
    "summary": "Short lower-Colorado day from TPWD's Horseshoe on the Colorado leased access to the FM 969 / Utley Bridge take-out. TPWD publishes the active access, exact coordinates, public-use conditions, and 6.8-mile downstream route, while the Bastrop USGS gauge gives the product-supported same-river flow check.",
    "statusText": "Use the Colorado River at Bastrop gauge. Treat about 200 cfs as the conservative lower-Colorado floating floor. Horseshoe access also requires 24-hour advance text, vehicle details, a waiver, daylight use, and loading or unloading only at the immediate river access area.",
    "latitude": 30.179637,
    "longitude": -97.427311,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Horseshoe is a TPWD leased-access property with advance-contact, waiver, parking, daylight, no-alcohol, and no-firearms rules; confirm access before driving the shuttle.",
        "Low water near the conservative floor can expose shallow bars and slow the short day, while high or rising water after rain or release changes can add debris, stronger current, and harder exits.",
        "Use Horseshoe and the FM 969 / Utley Bridge as the planned public access pair. Do not infer public camping or casual bank use from sandbars, islands, or private shoreline."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08159200",
      "provider": "usgs",
      "siteId": "08159200",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Colorado Rv at Bastrop, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08159200/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows lower Colorado table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.35,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The lower Colorado near Bastrop can work year-round when releases, runoff, wind, heat, and access conditions cooperate. Low flow can make the route shallow and slow, while storms or upstream release changes can quickly alter current, debris, and water quality.",
      "difficulty": "easy",
      "difficultyNotes": "The river is normally gentle and the mileage is short, but this is still a rural lower-Colorado shuttle with limited public exits, private banks, low-water dragging, summer heat, wind exposure, and advance access requirements at the put-in.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD publishes Horseshoe on the Colorado with active lease dates, coordinates, public-use conditions, and a 6.8-mile downstream float to the Utley boat ramp at FM 969; TPW Magazine independently repeats the route distance and access terms; USGS 08159200 is a product-supported Bastrop gauge that TPWD points users toward from the access page; and the legacy Texas River Flows lower-Colorado table gives a 200 cfs minimum floating level. Confidence remains conservative because the numeric floor is broad lower-Colorado guidance rather than a modern route-manager band, so the route ships minimum-only."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Horseshoe on the Colorado to Utley boat ramp at FM 969, 6.8 mi",
        "note": "TPWD says Horseshoe serves as the put-in for the 6.8-mile float downstream to the Utley boat ramp at FM 969; TPW Magazine independently describes the same Horseshoe-to-Utley route.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/horseshoe_colorado.phtml"
      },
      {
        "label": "Active leased access and coordinates",
        "value": "30.179637, -97.427311; lease through August 31, 2026",
        "note": "TPWD publishes Horseshoe on the Colorado at 142 Frances Loop just off FM 969 and Howard Lane, with complimentary parking and non-motorized launch access for leased-access users.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/horseshoe_colorado.phtml"
      },
      {
        "label": "Public-use conditions",
        "value": "Advance text, vehicle details, waiver, daylight use, loading/unloading only",
        "note": "TPWD requires texting vehicle information at least 24 hours before arrival, completing a waiver, parking only in the designated area, and limiting the immediate river access area to loading and unloading; no firearms or alcohol are allowed.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/horseshoe_colorado.phtml"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08159200 at 633 cfs / 3.03 ft",
        "note": "USGS Water Services returned same-day values for Colorado River at Bastrop, TX at 2026-08-10 20:40 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08159200&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Texas River Flows lists lower Colorado corridor levels starting at 200 cfs and defines level 1 as minimum floating water; Paddle Today uses only that conservative floor for this route.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Camping and endpoint rules",
        "value": "No route camping",
        "note": "Horseshoe is published as a daily leased-access site from 30 minutes before sunrise to 30 minutes after sunset, and no TPWD, LCRA, or route-manager source supports legal camping for this selected day segment.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/horseshoe_colorado.phtml"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, TPW Magazine, LCRA, Commons, USGS, and same-route web image review found route-context imagery but no clearly rights-clean exact Horseshoe-to-Utley paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Colorado+River+Horseshoe+Utley+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Horseshoe on the Colorado leased access",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/horseshoe_colorado.phtml",
        "provider": "local"
      },
      {
        "label": "TPW Magazine RACA access article",
        "url": "https://tpwmagazine.com/adventure-recreation/texas-parks-and-wildlife-department-adds-river-access-sites-on-brazos-colorado/",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08159200 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08159200/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08159200 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08159200&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "LCRA Paddle the Colorado",
        "url": "https://lcraparks.com/paddle-the-colorado",
        "provider": "local"
      }
    ]
  },
  {
    "id": "colorado-river-utley-bridge-fishermans-park",
    "slug": "colorado-river-utley-bridge-fishermans-park",
    "name": "Colorado River",
    "reach": "Utley (FM 969) Bridge to Fisherman's Park",
    "aliases": [
      "Bastrop Wilbarger Paddling Trail",
      "Colorado River - FM 969 to Fisherman's Park",
      "Utley Bridge to Bastrop"
    ],
    "state": "Texas",
    "region": "Prairies and Lakes",
    "summary": "Official 14-mile Wilbarger trail from Utley / FM 969 down to Fisherman's Park in Bastrop. TPWD publishes the public endpoints and route identity, the Bastrop USGS gauge gives a direct downstream condition check, and the route stays conservative because the long mileage is not a beginner float.",
    "statusText": "Use the Colorado River at Bastrop gauge. Treat about 200 cfs as the conservative lower-Colorado floating floor, with better travel above that. Low water can make the 14-mile day shallow and slow, while high or rising water adds wood, stronger current, and sandbar uncertainty.",
    "latitude": 30.1683,
    "longitude": -97.4023,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Bastrop River Co. frames Wilbarger as a full-day trip that is not for beginners; do not treat the mostly calm water as a casual short float.",
        "Low water can make hazards harder to avoid and can stretch the 14-mile day with shallow dragging, while high or rising water can move wood and reduce reliable sandbar options.",
        "Use the Utley / FM 969 access and Fisherman's Park as the planned public access pair, and do not infer public camping or casual stopping rights from islands, sandbars, or private banks."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08159200",
      "provider": "usgs",
      "siteId": "08159200",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Colorado Rv at Bastrop, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08159200/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows lower Colorado table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The lower Colorado near Bastrop can work year-round when releases, runoff, wind, heat, and access conditions cooperate. Low flow makes the 14-mile day slower and more scrape-prone, while storms or upstream release changes can quickly alter current, debris, and water quality.",
      "difficulty": "moderate",
      "difficultyNotes": "Most of the reach is calm, but 14 river miles, a full-day shuttle, limited public exits, and low-water wood or dragging make this a moderate commitment rather than a beginner outing.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD publishes the Wilbarger Paddling Trail with Utley / FM 969 as the put-in and Fisherman's Park as the take-out, including GPS coordinates; Bastrop River Co. corroborates the 14-mile full-day route and not-for-beginners handling; USGS 08159200 is a direct downstream Bastrop gauge; and the legacy Texas River Flows lower-Colorado table gives a 200 cfs minimum floating level. Confidence remains conservative because the numeric floor is broad lower-Colorado guidance rather than a modern route-manager gauge band, so the route ships minimum-only."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Utley (FM 969) Bridge to Fisherman's Park, 14 mi",
        "note": "TPWD identifies the Bastrop Wilbarger Paddling Trail with Utley / FM 969 as the put-in and Fisherman's Park as the take-out; local outfitter notes corroborate 14 river miles and a 5-8 hour full-day paddle.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bastrop-wilbarger/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "30.1683, -97.4023 to 30.1119, -97.3250",
        "note": "TPWD publishes GPS coordinates for the Utley / FM 969 Bridge put-in and Fisherman's Park take-out.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bastrop-wilbarger/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08159200 at 579 cfs / 2.90 ft",
        "note": "USGS Water Services returned same-day values for Colorado River at Bastrop, TX at 2026-08-09 21:40 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08159200&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Texas River Flows lists lower Colorado Austin-to-Bastrop and Bastrop-to-Smithville corridor levels starting at 200 cfs and defines level 1 as minimum floating water; Paddle Today uses only that conservative floor for Wilbarger.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Safety and access context",
        "value": "Full-day route, low-water hazards, private-bank discipline",
        "note": "Bastrop River Co. says Wilbarger is a full-day trip that is not for beginners and warns that low-water hazards can be harder to avoid; TPWD and LCRA access records support the named public access pair.",
        "sourceUrl": "https://apps.mycitybikes.org/usa-tx/bastrop/water-trails-map-3.php"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Bastrop Wilbarger Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bastrop-wilbarger/",
        "provider": "local"
      },
      {
        "label": "Bastrop River Co. Water Trails map",
        "url": "https://apps.mycitybikes.org/usa-tx/bastrop/water-trails-map-3.php",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "LCRA Paddle the Colorado",
        "url": "https://lcraparks.com/paddle-the-colorado",
        "provider": "local"
      },
      {
        "label": "USGS 08159200 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08159200/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08159200 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08159200&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "TPWD Bastrop State Park",
        "url": "https://tpwd.texas.gov/state-parks/bastrop",
        "provider": "local"
      }
    ]
  },
  {
    "id": "colorado-river-fishermans-park-lost-pines",
    "slug": "colorado-river-fishermans-park-lost-pines",
    "name": "Colorado River",
    "reach": "Fisherman's Park to Lost Pines Recreational Trails",
    "aliases": [
      "Bastrop El Camino Real Paddling Trail",
      "Colorado River - Fisherman's Park to Lost Pines",
      "Fisherman's Park to Colorado River Refuge"
    ],
    "state": "Texas",
    "region": "Prairies and Lakes",
    "summary": "Official six-mile Bastrop El Camino Real trail from Fisherman's Park to the Lost Pines / Colorado River Refuge take-out. TPWD publishes the public endpoints, route distance, and regulated lower-Colorado safety context, while the Bastrop USGS gauge gives a direct same-reach condition check.",
    "statusText": "Use the Colorado River at Bastrop gauge. Treat about 800 cfs as a conservative route-specific floor for a cleaner El Camino Real paddle; lower water can mean shallow dragging, while high or rising water can add wood and current hazards.",
    "latitude": 30.1119,
    "longitude": -97.325,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD notes that the lower Colorado is affected by Highland Lakes releases and rainfall runoff, so flow and water quality can change after storms.",
        "Local route notes warn that low water can mean dragging through shallow areas and that high water can create logjam problems in tighter side channels.",
        "Use Fisherman's Park and the Lost Pines / Colorado River Refuge take-out as the planned public access pair, and do not treat private banks as casual stops outside direct hazard portages."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08159200",
      "provider": "usgs",
      "siteId": "08159200",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Colorado Rv at Bastrop, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08159200/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 800,
      "thresholdSource": {
        "label": "Bastrop River Co. El Camino Real route notes",
        "url": "https://apps.mycitybikes.org/usa-tx/bastrop/water-trails-map-3.php",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The lower Colorado near Bastrop can be paddled year-round when flow, weather, and access conditions cooperate. Low releases make shallow bars and dragging more likely, while storms or upstream releases can quickly change current, debris, and water quality.",
      "difficulty": "easy",
      "difficultyNotes": "TPWD frames this as a wide, slow-moving six-mile trail. It stays caution-rated because shallow water, side-channel wood, sandbars, heat, and regulated-flow changes can still turn a simple family paddle into a poor same-day choice.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD publishes the exact El Camino Real trail, endpoint names and coordinates, six-mile distance, float-time range, and lower-Colorado flow and water-quality caveats; USGS 08159200 is a direct same-reach gauge at Bastrop; and local Bastrop River Co. route notes give an 800 cfs practical low-water floor plus high-water logjam caution. Confidence remains conservative because the numeric route floor is local/outfitter guidance rather than a modern manager-published gauge band, so the route ships minimum-only."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Fisherman's Park to Lost Pines Recreational Trails, 6.0 mi",
        "note": "TPWD identifies the Bastrop El Camino Real Paddling Trail as a six-mile lower Colorado route usually floated in 1.5 to 4 hours.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bastrop-el-camino-real/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "30.1119, -97.3250 to 30.0735, -97.3106",
        "note": "TPWD publishes Fisherman's Park as the put-in and Lost Pines Recreational Trails as the take-out, with GPS coordinates for both access anchors.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bastrop-el-camino-real/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08159200 at 587 cfs / 2.92 ft",
        "note": "USGS Water Services returned same-day values for Colorado River at Bastrop, TX at 2026-08-09 19:40 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08159200&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "800 cfs minimum-only",
        "note": "Bastrop River Co. route notes say water levels need to be at least 800 cfs or paddlers should expect dragging through shallow areas; Paddle Today uses this as the conservative minimum-only route floor.",
        "sourceUrl": "https://apps.mycitybikes.org/usa-tx/bastrop/water-trails-map-3.php"
      },
      {
        "label": "Safety and access context",
        "value": "Regulated lower Colorado, flood-sensitive access, wood, private banks",
        "note": "TPWD says Highland Lakes releases and rainfall runoff influence this lower Colorado reach, warns that floods can impact take-out access, and points paddlers to current flow data; TPWD private-property rules and local route notes support the wood, shallow-water, and high-water caveats.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bastrop-el-camino-real/"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Bastrop El Camino Real Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bastrop-el-camino-real/",
        "provider": "local"
      },
      {
        "label": "Bastrop River Co. Water Trails map",
        "url": "https://apps.mycitybikes.org/usa-tx/bastrop/water-trails-map-3.php",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08159200 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08159200/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08159200 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08159200&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "TPWD Bastrop State Park",
        "url": "https://tpwd.texas.gov/state-parks/bastrop",
        "provider": "local"
      }
    ]
  },
  {
    "id": "colorado-river-lost-pines-riverbend-park",
    "slug": "colorado-river-lost-pines-riverbend-park",
    "name": "Colorado River",
    "reach": "Lost Pines Recreational Trails to Riverbend Park",
    "aliases": [
      "Bastrop to Smithville",
      "Colorado River - Lost Pines to Smithville",
      "Lost Pines / Colorado River Refuge to Vernon L. Richards Riverbend Park"
    ],
    "state": "Texas",
    "region": "Prairies and Lakes",
    "summary": "Long lower-Colorado day from Bastrop County Nature Park / Lost Pines to Smithville's Vernon L. Richards Riverbend Park. LCRA publishes the public access sequence and river-mile spacing, Bastrop County and Visit Smithville corroborate the usable public accesses, and the Bastrop USGS gauge gives a live same-corridor condition check.",
    "statusText": "Use the Colorado River at Bastrop gauge. Treat about 200 cfs as the conservative floor for the Bastrop-to-Smithville reach; current water above that floor can still be a slow, exposed 20-mile day if wind, heat, or releases work against you.",
    "latitude": 30.0735,
    "longitude": -97.3106,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a 20-mile lower-Colorado commitment with few public exits between Lost Pines and Smithville; start early and stage the take-out before launching.",
        "Southwest Paddler describes this reach as wide, slow-moving Class I water, but flags strong southeasterly headwinds, long access gaps, heat, and enough ledges or minor rapids to matter at higher flows.",
        "Use Lost Pines / Bastrop County Nature Park, Loop 230 / Highway 95, and Riverbend Park as the public access framework; do not treat private banks, islands, or gravel bars as casual rest or camp rights."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08159200",
      "provider": "usgs",
      "siteId": "08159200",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Colorado Rv at Bastrop, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08159200/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Southwest Paddler Bastrop-to-Smithville table",
        "url": "https://southwestpaddler.com/docs/colorado5.html",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.4,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The lower Colorado from Bastrop County to Smithville can be paddled year-round when releases, rainfall, wind, heat, and access conditions cooperate. Low flow makes the long day slower and shallower, while storms or upstream release changes can quickly alter current, debris, water quality, and landings.",
      "difficulty": "moderate",
      "difficultyNotes": "The water is generally Class I, but the route is moderate because it is roughly 20 miles with a long shuttle, limited public exits, headwind exposure, heat, slow current near the floor, and private-bank limits.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: LCRA publishes Lost Pines Nature Trails Park, Loop 230 Bridge, and Vernon L. Richards Riverbend Park as public lower-Colorado access points with river-mile spacing and rounded coordinates; Explore Bastrop County and Visit Smithville corroborate public Bastrop County Nature Park, Smithville bridge, and Riverbend access; Southwest Paddler publishes 200 cfs minimum, 500-3,000 cfs optimum, and 5,000 cfs maximum guidance for the broader Bastrop-to-Smithville section; and USGS 08159200 is product-live at Bastrop. Paddle Today uses only the conservative 200 cfs floor because the numeric range is community guidance rather than a modern route-manager flow band."
    },
    "evidenceNotes": [
      {
        "label": "Official access sequence",
        "value": "Lost Pines to Loop 230 to Riverbend Park, about 20 mi",
        "note": "LCRA lists Lost Pines Nature Trails Park, Loop 230 Bridge, and Vernon L. Richards Riverbend Park as lower-Colorado access points, with 19 miles from Lost Pines to Loop 230 and another mile to Riverbend Park.",
        "sourceUrl": "https://lcraparks.com/paddle-the-colorado"
      },
      {
        "label": "Public endpoint access",
        "value": "Bastrop County Nature Park to Smithville Riverbend Park",
        "note": "Explore Bastrop County identifies Bastrop County Nature Park, the Smithville boat ramp under Highway 95, and Vernon L. Richards Riverbend Park as public Colorado River intake/outtake points; Visit Smithville describes public canoe and kayak access near Riverbend Park.",
        "sourceUrl": "https://explorebastropcounty.com/listings/colorado-river-in-bastrop-county/"
      },
      {
        "label": "Endpoint camping",
        "value": "Riverbend Park overnight campsites at the take-out",
        "note": "Explore Bastrop County describes Riverbend Park as a City of Smithville park with overnight campsites, RV pads, restrooms, potable water, and river access. No mid-route island, gravel-bar, or private-bank camping is inferred.",
        "sourceUrl": "https://explorebastropcounty.com/listings/vernon-l-richards-riverbend-park/"
      },
      {
        "label": "Live same-corridor gauge",
        "value": "USGS 08159200 at 705 cfs / 3.20 ft",
        "note": "USGS Water Services returned same-day values for Colorado River at Bastrop, TX at 2026-08-10 14:40 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08159200&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Southwest Paddler publishes Bastrop-to-Smithville guidance with 200 cfs as minimum, 500-3,000 cfs as optimum, and 5,000 cfs as maximum; Paddle Today uses only the conservative 200 cfs floor.",
        "sourceUrl": "https://southwestpaddler.com/docs/colorado5.html"
      },
      {
        "label": "Safety and route character",
        "value": "Long, wide, slow-moving river with wind and access-spacing caveats",
        "note": "Southwest Paddler describes this reach as wide and slow-moving with few whitewater hazards, while calling out strong southeasterly headwinds and many miles between public accesses. LCRA private-property guidance limits stops away from public access or direct hazard portages.",
        "sourceUrl": "https://southwestpaddler.com/docs/colorado5.html"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded LCRA, Bastrop County, Visit Smithville, Southwest Paddler, Commons, and USGS review found route-context imagery but no clearly rights-clean exact Lost-Pines-to-Riverbend paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Colorado+River+Bastrop+Smithville+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "LCRA Paddle the Colorado",
        "url": "https://lcraparks.com/paddle-the-colorado",
        "provider": "local"
      },
      {
        "label": "Explore Bastrop County Colorado River",
        "url": "https://explorebastropcounty.com/listings/colorado-river-in-bastrop-county/",
        "provider": "local"
      },
      {
        "label": "Explore Bastrop County Riverbend Park",
        "url": "https://explorebastropcounty.com/listings/vernon-l-richards-riverbend-park/",
        "provider": "local"
      },
      {
        "label": "Visit Smithville Colorado River",
        "url": "https://www.visitsmithvilletx.org/colorado-river",
        "provider": "local"
      },
      {
        "label": "Southwest Paddler Colorado River",
        "url": "https://southwestpaddler.com/docs/colorado5.html",
        "provider": "local"
      },
      {
        "label": "USGS 08159200 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08159200/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08159200 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08159200&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "colorado-river-business-71-beasons-park",
    "slug": "colorado-river-business-71-beasons-park",
    "name": "Colorado River",
    "reach": "Business 71 Crossing to Beason's Park",
    "aliases": [
      "Columbus Paddling Trail",
      "Colorado River - Columbus horseshoe",
      "71 Business Crossing to Beason's Park"
    ],
    "state": "Texas",
    "region": "Prairies and Lakes",
    "summary": "Official Columbus Paddling Trail route around the Colorado River horseshoe through town. TPWD publishes the public Business 71 put-in, Beason's Park take-out, 6.5-mile route shape, and private-bank rules, while the Columbus USGS gauge gives a direct same-reach condition check.",
    "statusText": "Use the Colorado River at Columbus gauge. Treat about 200 cfs as a conservative low-water floor from the broader Texas River Flows lower-Colorado table, with same-day visual checks for shallow islands, wind, and rising water.",
    "latitude": 29.7128,
    "longitude": -96.5466,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD frames this as peaceful water with calm rapids, but water level, flow rate, and wind can change the time and effort needed for the 6.5-mile town loop.",
        "Expect sandy banks, islands, shallow spots near the conservative floor, and occasional wood or shifting lines after high water.",
        "Use the Business 71 Crossing put-in and Beason's Park take-out as the planned public access pair, and do not treat private banks as casual stops outside direct hazard portages."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08161000",
      "provider": "usgs",
      "siteId": "08161000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Colorado Rv at Columbus, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08161000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows lower Colorado table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.3,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Columbus reach can be paddled year-round when flow, weather, and access conditions cooperate. Low releases can expose shallow islands and sandbars, while storms can raise the broad river quickly and make simple bridge or park landings less forgiving.",
      "difficulty": "easy",
      "difficultyNotes": "The route is wide and generally calm, but it is still a 6.5-mile moving-water day with wind exposure, islands, sandy shoals, and private-bank limits.",
      "confidenceNotes": "Confidence is good for route shape, access, and live gauge support: TPWD publishes the exact Columbus Paddling Trail endpoints, coordinates, mileage, float-time range, river character, and private-property rules, and USGS 08161000 is a direct same-town same-river gauge. The threshold stays conservative because the 200 cfs floor comes from the legacy Texas River Flows lower-Colorado table plus local same-gauge trip reports rather than a modern manager-published Columbus-specific band, so the route ships minimum-only and does not claim an ideal or upper range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "71 Business Crossing to Beason's Park, 6.5 mi",
        "note": "TPWD identifies the Columbus Paddling Trail as a 6.5-mile Colorado River route through town, usually taking about 2 to 5 hours depending on water level and flow.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/columbus/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "29.7128, -96.5466 to 29.7055, -96.5360",
        "note": "TPWD publishes the 71 Business Crossing put-in and Beason's Park take-out with GPS coordinates; Beason's Park has parking, restrooms, picnic tables, and a pavilion.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/columbus/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08161000 at 365 cfs / 9.67 ft",
        "note": "USGS Water Services returned same-day values for Colorado River at Columbus, TX at 2026-08-09 20:15 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08161000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "The legacy Texas River Flows table lists lower Colorado segments into Columbus with 200 cfs as the minimum floating-water level. Paddle Today applies only that conservative floor to the direct Columbus gauge and does not infer an ideal or upper band.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Safety and access context",
        "value": "Calm rapids, sandy islands, private banks, changing flow and wind",
        "note": "TPWD describes peaceful water with calm rapids, islands in the first third of the trail, sandy banks, and private-property limits; local route reports support shallow-spot and same-gauge flow caution around ordinary levels.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/columbus/"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Columbus Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/columbus/",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08161000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08161000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08161000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08161000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Travel Texas Columbus Paddling Trail",
        "url": "https://www.traveltexas.com/articles/post/paddling-texas/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "colorado-river-plum-park-buffalo-trail",
    "slug": "colorado-river-plum-park-buffalo-trail",
    "name": "Colorado River",
    "reach": "Plum Park to Buffalo Trail Park",
    "aliases": [
      "Colorado River - Plum Park to La Grange",
      "Plum Park to La Grange",
      "Lower Colorado - Plum Park to Buffalo Trail"
    ],
    "state": "Texas",
    "region": "Prairies and Lakes",
    "summary": "Long lower-Colorado day from LCRA's Plum Park to Buffalo Trail Park in La Grange. LCRA publishes both public access points and the 18-mile spacing, while the La Grange USGS gauge gives a same-reach flow check for the rock-garden finish.",
    "statusText": "Use the Colorado River above La Grange gauge. Treat about 200 cfs as the conservative lower-Colorado floor; current water below that floor can mean shallow scraping, exposed rock gardens, and a slower 18-mile day.",
    "latitude": 29.97,
    "longitude": -97,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This is an 18-mile lower-Colorado day with limited public exits between Plum Park and La Grange; do not launch late or without a shuttle and weather margin.",
        "Low water can expose shallow cobble, Buffalo Wallow Rapid, and the La Grange rock garden, while high or rising water can add stronger current, wood, and harder take-outs.",
        "Use Plum Park and Buffalo Trail Park as the planned public access pair, and do not infer legal camping or casual stop rights from islands, sandbars, or private banks."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08160400",
      "provider": "usgs",
      "siteId": "08160400",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Colorado Rv abv La Grange, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08160400/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Southwest Paddler lower Colorado / La Grange table",
        "url": "https://southwestpaddler.com/docs/colorado6.html",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.35,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The lower Colorado near La Grange can be paddled year-round when releases, rainfall, wind, heat, and access conditions cooperate. Low flow makes the long day slower and rockier, while storms or upstream release changes can quickly alter current, debris, water quality, and sandbar availability.",
      "difficulty": "moderate",
      "difficultyNotes": "The river is mostly calm Class I water, but 18 miles, a long shuttle, limited exits, shallow rock gardens near low water, wind exposure, heat, and private-bank limits make this a moderate commitment.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: LCRA publishes Plum Park and Buffalo Trail Park as public lower-Colorado access points 18 river miles apart, including management context and rounded access coordinates; the City of La Grange corroborates Buffalo Trail Park as a public boat-ramp park for canoe trips; USGS 08160400 is a direct same-reach gauge above La Grange; and Southwest Paddler publishes lower-Colorado La Grange numeric flow guidance of 200 cfs minimum, 500-3,000 cfs optimum, and 5,000 cfs maximum. The route ships minimum-only because Paddle Today keeps the older community range conservative and does not claim a modern manager-authored ideal band."
    },
    "evidenceNotes": [
      {
        "label": "Official access sequence",
        "value": "Plum Park to Buffalo Trail Park, 18 mi",
        "note": "LCRA lists Plum Park on the Colorado and Buffalo Trail Park as public lower-Colorado access points, with Plum Park 18 miles above Buffalo Trail Park by the river-mile spacing table.",
        "sourceUrl": "https://lcraparks.com/paddle-the-colorado"
      },
      {
        "label": "Public endpoint access",
        "value": "LCRA park put-in and City of La Grange boat-ramp take-out",
        "note": "LCRA manages Plum Park and identifies Buffalo Trail Park as a City of La Grange access; the city park page describes Buffalo Trail Park as a public boat-ramp park with Colorado River access for canoe trips.",
        "sourceUrl": "https://www.cityoflg.com/departments/parks.php"
      },
      {
        "label": "Access-anchor coordinates",
        "value": "29.9700, -97.0000 to 29.900700, -96.886257",
        "note": "LCRA publishes a rounded Plum Park coordinate; the City of La Grange's Buffalo Trail Park map link resolves the public park access anchor. Paddle Today stores both as access anchors rather than survey-grade wetted-edge launch coordinates.",
        "sourceUrl": "https://www.cityoflg.com/departments/parks.php"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08160400 at 95.9 cfs / 3.12 ft",
        "note": "USGS Water Services returned same-day values for Colorado River above La Grange, TX at 2026-08-10 13:25 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08160400&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Southwest Paddler publishes lower-Colorado / La Grange guidance with 200 cfs as minimum, 500-3,000 cfs as optimum, and 5,000 cfs as maximum; Paddle Today uses only the conservative 200 cfs floor.",
        "sourceUrl": "https://southwestpaddler.com/docs/colorado6.html"
      },
      {
        "label": "Safety and route character",
        "value": "Long Class I day, Buffalo Wallow Rapid, La Grange rock garden",
        "note": "Houston Canoe Club's same-route report documents the Plum Park put-in, Buffalo Trail Park take-out, 19.03 river miles, 500 cfs La Grange gauge condition, shallow-rock hazards, Buffalo Wallow Rapid, and the La Grange rock garden.",
        "sourceUrl": "https://thcc.clubexpress.com/content.aspx?club_id=496051&module_id=518249&page_id=22"
      },
      {
        "label": "Camping and image decision",
        "value": "Endpoint campground only; no route-gallery image selected",
        "note": "LCRA allows Plum Park camping by river arrival or prior arrangement, but this route does not infer legal camping on islands, sandbars, or private banks. Bounded LCRA, City, Commons, USGS, and same-route image review found no clearly rights-clean exact Plum-to-La-Grange paddling asset selected for local reuse.",
        "sourceUrl": "https://lcraparks.com/parks/plum-park-on-the-colorado"
      }
    ],
    "sourceLinks": [
      {
        "label": "LCRA Paddle the Colorado",
        "url": "https://lcraparks.com/paddle-the-colorado",
        "provider": "local"
      },
      {
        "label": "LCRA Plum Park on the Colorado",
        "url": "https://lcraparks.com/parks/plum-park-on-the-colorado",
        "provider": "local"
      },
      {
        "label": "City of La Grange Parks",
        "url": "https://www.cityoflg.com/departments/parks.php",
        "provider": "local"
      },
      {
        "label": "Southwest Paddler Colorado River",
        "url": "https://southwestpaddler.com/docs/colorado6.html",
        "provider": "local"
      },
      {
        "label": "Houston Canoe Club Plum Park to La Grange report",
        "url": "https://thcc.clubexpress.com/content.aspx?club_id=496051&module_id=518249&page_id=22",
        "provider": "local"
      },
      {
        "label": "USGS 08160400 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08160400/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08160400 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08160400&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "colorado-river-riverbend-park-plum-park",
    "slug": "colorado-river-riverbend-park-plum-park",
    "name": "Colorado River",
    "reach": "Riverbend Park to Plum Park",
    "aliases": [
      "Smithville to Plum Park",
      "Vernon L. Richards Riverbend Park to Plum Park",
      "Lower Colorado - Smithville to Plum Park"
    ],
    "state": "Texas",
    "region": "Prairies and Lakes",
    "summary": "Lower-Colorado day from Smithville's Vernon L. Richards Riverbend Park to LCRA's Plum Park. LCRA publishes the two public river accesses 17 river miles apart, and the La Grange USGS gauge gives a live check for the same Smithville-to-La Grange section.",
    "statusText": "Use the Colorado River above La Grange gauge as the conservative same-section check. Treat about 200 cfs as the lower-Colorado floor; current water below that floor can mean slow travel, shallow lines, and more dragging on a long 17-mile day.",
    "latitude": 30.02,
    "longitude": -97.14,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a 17-mile lower-Colorado day with few public exits between Smithville and Plum Park; start early and confirm shuttle logistics before launching.",
        "Low water can expose shallow sand, cobble, and slow lines, while storms or upstream release changes can quickly alter current, debris, water quality, and landings.",
        "Use Riverbend Park and Plum Park as the planned public access pair, and do not infer legal camping or casual stop rights from islands, gravel bars, or private banks."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08160400",
      "provider": "usgs",
      "siteId": "08160400",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Colorado Rv abv La Grange, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08160400/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Southwest Paddler Smithville-to-La Grange table",
        "url": "https://southwestpaddler.com/docs/colorado6.html",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.35,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The lower Colorado from Smithville to Plum Park can be paddled year-round when releases, rainfall, wind, heat, and access conditions cooperate. Summer heat and headwinds can make the long flatwater day more demanding, while storms can raise the broad river quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "The river is mostly calm Class I water, but 17 miles, a long shuttle, limited public exits, wind exposure, heat, and private-bank limits make this a moderate commitment.",
      "confidenceNotes": "Confidence is good for a conservative add: LCRA publishes Vernon L. Richards Riverbend Park and Plum Park as public lower-Colorado access points 17 river miles apart, Visit Smithville corroborates Riverbend and Highway 71 bridge public canoe/kayak access, USGS 08160400 is product-live for the same Smithville-to-La Grange section, and Southwest Paddler publishes 200 cfs minimum, 500-3,000 cfs optimum, and 5,000 cfs maximum guidance for that section. Paddle Today uses only the conservative 200 cfs floor because the numeric range is community guidance rather than a modern route-manager flow band."
    },
    "evidenceNotes": [
      {
        "label": "Official access sequence",
        "value": "Riverbend Park to Plum Park, 17 mi",
        "note": "LCRA lists Vernon L. Richards Riverbend Park and Plum Park as consecutive lower-Colorado access points, with 17 miles from Riverbend to Plum Park by the river-mile spacing table.",
        "sourceUrl": "https://lcraparks.com/paddle-the-colorado"
      },
      {
        "label": "Public Smithville access",
        "value": "Riverbend Park and Highway 71 bridge canoe/kayak access",
        "note": "Visit Smithville describes public Colorado River access near Riverbend Park and under the double Highway 71 bridges, including light-watercraft access and a rough walk-in route at Riverbend Park.",
        "sourceUrl": "https://www.visitsmithvilletx.org/colorado-river"
      },
      {
        "label": "Endpoint camping",
        "value": "Plum Park river-arrival or prior-arrangement camping",
        "note": "LCRA says Plum Park is day-use for ordinary access, but camping is permitted for parties arriving by river or by prior arrangement with LCRA parks.",
        "sourceUrl": "https://lcraparks.com/paddle-the-colorado"
      },
      {
        "label": "Live same-section gauge",
        "value": "USGS 08160400 at 95.9 cfs / 3.12 ft",
        "note": "USGS Water Services returned same-day values for Colorado River above La Grange, TX at 2026-08-10 14:25 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08160400&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Southwest Paddler publishes Smithville-to-La Grange guidance with 200 cfs as minimum, 500-3,000 cfs as optimum, and 5,000 cfs as maximum; Paddle Today uses only the conservative 200 cfs floor.",
        "sourceUrl": "https://southwestpaddler.com/docs/colorado6.html"
      },
      {
        "label": "Safety and route character",
        "value": "Long, wide, slow-moving river with wind and access-spacing caveats",
        "note": "Southwest Paddler describes the Colorado as wide and slow-moving with few whitewater hazards, but flags strong headwinds, summer heat, limited shade, and long distances between access points as practical hazards.",
        "sourceUrl": "https://southwestpaddler.com/docs/colorado6.html"
      }
    ],
    "sourceLinks": [
      {
        "label": "LCRA Paddle the Colorado",
        "url": "https://lcraparks.com/paddle-the-colorado",
        "provider": "local"
      },
      {
        "label": "Visit Smithville Colorado River Access",
        "url": "https://www.visitsmithvilletx.org/colorado-river",
        "provider": "local"
      },
      {
        "label": "Southwest Paddler Smithville to La Grange",
        "url": "https://southwestpaddler.com/docs/colorado6.html",
        "provider": "local"
      },
      {
        "label": "USGS 08160400 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08160400/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08160400 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08160400&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "brazos-river-riverside-park-spivey-crossing",
    "slug": "brazos-river-riverside-park-spivey-crossing",
    "name": "Brazos River",
    "reach": "Riverside Park to Spivey Crossing RV Park",
    "aliases": [
      "Whitney to Spivey Crossing",
      "Lake Whitney Dam to Spivey Crossing",
      "Brazos River below Lake Whitney Dam"
    ],
    "state": "Texas",
    "region": "Central Texas",
    "routeType": "recreational",
    "summary": "Brazos River day trip below Lake Whitney Dam from USACE Riverside Park to TPWD leased-access Spivey Crossing RV Park. TPWD RACA publishes the 9.59-mile segment, USACE documents public Riverside river access, and the Aquilla USGS gauge gives a direct same-reach flow check.",
    "statusText": "Use the Brazos River near Aquilla gauge. BRA's public paddling chart treats 200 cfs or less as below the minimum, 501-1,200 cfs as ideal, and higher flows as increasingly hazardous; current readings are well below the floor, so wait for more water and confirm Whitney release conditions.",
    "latitude": 31.866028,
    "longitude": -97.367336,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD warns that Lake Whitney Dam releases can cause rapid rises and swift current on this reach; leave the river if water starts rising.",
        "Use Riverside Park and Spivey Crossing only as the planned access pair. Spivey is a leased-access site with call-ahead, day-use, fee, shuttle, and liability-form requirements.",
        "BRA's flow chart puts current low readings below the paddling minimum; at similar levels expect shallow bars, more dragging, and a no-go recommendation until the gauge recovers."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08093100",
      "provider": "usgs",
      "siteId": "08093100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Brazos Rv nr Aquilla, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08093100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 501,
      "idealMax": 1200,
      "tooLow": 200,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "Brazos River Authority paddling-flow chart",
        "url": "https://brazos.org/about-us/news/news-room/resource-library/on-the-river",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "windSensitivity": 0.25,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This dam-tailwater reach can work year-round when Whitney releases, same-day flow, access, and weather cooperate. Low-water scraping, release-driven rises, storms, heat, wind, and private-bank limits all require same-day checks.",
      "difficulty": "easy",
      "difficultyNotes": "TPWD RACA calls the 9.59-mile Whitney-to-Spivey segment a good day trip, but Lake Whitney Dam releases, below-floor lows, private banks, rural access logistics, and possible wood keep it from being treated as a casual park loop.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD RACA publishes the Riverside Park-to-Spivey Crossing segment and length, USACE documents Riverside Park on both sides of the Brazos below Whitney Dam with river access and camp/picnic facilities, TPWD publishes active Spivey Crossing leased-access rules through August 31, 2027, USGS 08093100 is a direct product-live gauge near Aquilla, and BRA provides official Brazos paddling-flow bands. Riverside's exact coordinate is sourced from a route guide rather than USACE, so the package records it as an access anchor and requires arrival-point verification."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Riverside Park to Spivey Crossing, 9.59 mi",
        "note": "TPWD RACA river-segment data names the Whitney-to-Spivey route from Riverside Park to Spivey Crossing as a 9.59-mile Brazos segment and warns about hydropower peaking flows.",
        "sourceUrl": "https://tpwd.texas.gov/server/rest/services/Inland/River_Access_and_Conservation_Areas/FeatureServer/1"
      },
      {
        "label": "Put-in access",
        "value": "USACE Riverside Park below Whitney Dam",
        "note": "USACE documents Riverside Park downstream of Whitney Dam on both sides of the river, with camp/picnic sites, restrooms, a fishing platform, and an east-side gravel access road to the river that closes when floodwater is being released.",
        "sourceUrl": "https://www.swf-wc.usace.army.mil/whitney/Recreation/Parks/Corpsparks.shtml"
      },
      {
        "label": "Take-out access",
        "value": "Spivey Crossing RV Park, active TPWD leased access",
        "note": "TPWD publishes Spivey Crossing as an active leased-access take-out for the 10-mile float from Riverside Park, with coordinates, daylight access, call-ahead availability, fee, liability-form, and shuttle requirements.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/spivey_crossing.phtml"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08093100 at 55.3 cfs / 6.09 ft",
        "note": "USGS Water Services returned current Brazos River near Aquilla discharge and gage height at 2026-08-11 05:00 CDT during this implementation run.",
        "sourceUrl": "https://nwis.waterservices.usgs.gov/nwis/iv/?format=json&sites=08093100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Brazos flow guidance",
        "value": "200 cfs below minimum; 501-1,200 cfs ideal; 5,001+ cfs flood",
        "note": "BRA's public river-recreation chart lists 200 cfs or less as below the minimum needed for paddling, 501-1,200 cfs as ideal conditions, 1,200-3,000 cfs as hazardous, 3,001-5,000 cfs as experts-only, and 5,001+ cfs as flood conditions.",
        "sourceUrl": "https://brazos.org/about-us/news/news-room/resource-library/on-the-river"
      },
      {
        "label": "Camping and safety",
        "value": "Riverside camp/picnic sites; Spivey private accommodations; dam-release warning",
        "note": "USACE documents Riverside camp/picnic facilities, TPWD describes Spivey RV/cabin/cottage services as adjacent private accommodations, and TPWD warns Lake Whitney Dam releases can cause rapid rises and swift current.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/spivey_crossing.phtml"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD RACA, USACE, BRA, Commons, USGS, Southwest Paddler, and same-route web review found route-context images but no clearly rights-clean exact Riverside-to-Spivey paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Brazos+River+Riverside+Park+Spivey+Crossing+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD RACA River Segments",
        "url": "https://tpwd.texas.gov/server/rest/services/Inland/River_Access_and_Conservation_Areas/FeatureServer/1",
        "provider": "local"
      },
      {
        "label": "USACE Whitney Lake Corps Parks",
        "url": "https://www.swf-wc.usace.army.mil/whitney/Recreation/Parks/Corpsparks.shtml",
        "provider": "local"
      },
      {
        "label": "TPWD Spivey Crossing RV Park",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/spivey_crossing.phtml",
        "provider": "local"
      },
      {
        "label": "Brazos River Authority On The River",
        "url": "https://brazos.org/about-us/news/news-room/resource-library/on-the-river",
        "provider": "local"
      },
      {
        "label": "USGS 08093100 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08093100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08093100 Water Services current values",
        "url": "https://nwis.waterservices.usgs.gov/nwis/iv/?format=json&sites=08093100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Southwest Paddler Brazos below Lake Whitney",
        "url": "https://southwestpaddler.com/docs/brazos6.html",
        "provider": "local"
      }
    ]
  },
  {
    "id": "brazos-river-spivey-crossing-brazos-river-nature-center",
    "slug": "brazos-river-spivey-crossing-brazos-river-nature-center",
    "name": "Brazos River",
    "reach": "Spivey Crossing RV Park to Brazos River Nature Center",
    "aliases": [
      "Spivey Crossing to Brazos River Nature Center",
      "Brazos River below Lake Whitney - Spivey to BRNC",
      "Aquilla to Gholson Brazos River"
    ],
    "state": "Texas",
    "region": "Central Texas",
    "routeType": "recreational",
    "summary": "Brazos River day trip below Lake Whitney Dam from TPWD leased-access Spivey Crossing RV Park to the TPWD leased-access Brazos River Nature Center. TPWD publishes the downstream route relationship, active public-use rules at both endpoints, and the Aquilla USGS gauge gives a direct same-corridor flow check.",
    "statusText": "Use the Brazos River near Aquilla gauge. BRA's public paddling chart treats 200 cfs or less as below the minimum, 501-1,200 cfs as ideal, and higher flows as increasingly hazardous; current readings are well below the floor, so wait for more water and confirm Whitney release conditions and both leased-access reservations.",
    "latitude": 31.801114,
    "longitude": -97.307315,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD warns that Lake Whitney Dam releases upstream can cause rapid rises and swift current in this Brazos corridor; leave the river if water starts rising.",
        "Both endpoints are leased-access properties with call-ahead, daylight-use, fee or liability-form requirements. Confirm Spivey and BRNC access before committing to the shuttle.",
        "BRNC is primitive, with no restrooms or potable water, and TPWD restricts users to designated access trails and parking areas only."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08093100",
      "provider": "usgs",
      "siteId": "08093100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Brazos Rv nr Aquilla, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08093100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 501,
      "idealMax": 1200,
      "tooLow": 200,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "Brazos River Authority paddling-flow chart",
        "url": "https://brazos.org/about-us/news/news-room/resource-library/on-the-river",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "windSensitivity": 0.25,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This dam-tailwater corridor can work year-round when Whitney releases, same-day flow, access, and weather cooperate. Low-water scraping, release-driven rises, storms, heat, wind, and private-bank limits all require same-day checks.",
      "difficulty": "moderate",
      "difficultyNotes": "The river is mostly straightforward, but the route is a rural 10-to-11-mile tailwater day with two reservation-controlled leased accesses, below-floor lows, private banks, primitive BRNC facilities, and possible wood or release debris.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD publishes Spivey Crossing as an active leased-access put-in and says paddlers can float downstream about 10 miles to Brazos River Nature Center; TPWD publishes BRNC as an active leased-access take-out 11 miles downstream of Spivey, with daylight access, reservation, fee, liability-form, and primitive-site limits. TPWD's RACA GIS layer supplies the stored BRNC access coordinate near the river, while the HTML page's 31.69956, -97.26898 value is retained as driving-arrival context. USGS 08093100 is a direct product-live gauge near Aquilla, and BRA provides official Brazos paddling-flow bands. Coordinates are stored as access anchors rather than exact wetted-edge survey points."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Spivey Crossing to Brazos River Nature Center, about 10-11 mi",
        "note": "TPWD says Spivey Crossing can be used as a put-in for a downstream float of about 10 miles to BRNC; the BRNC page describes the site as 11 river miles downstream of Spivey and a take-out for upstream paddlers.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/spivey_crossing.phtml"
      },
      {
        "label": "Put-in access",
        "value": "Spivey Crossing RV Park active TPWD leased access",
        "note": "TPWD lists Spivey Crossing's lease through August 31, 2027, allows daylight non-motorized launch use, requires call-ahead availability, charges a small adult day-use fee, and requires liability paperwork.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/spivey_crossing.phtml"
      },
      {
        "label": "Take-out access",
        "value": "Brazos River Nature Center active TPWD leased access",
        "note": "TPWD lists BRNC's lease through August 31, 2027, requires 24-hour advance reservation and fee payment, restricts users to designated trails and parking areas, and notes there are no restrooms or potable water. TPWD's RACA GIS layer publishes the stored access point at 31.698655, -97.279101; the HTML page's 31.69956, -97.26898 coordinate is the driving-arrival context.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/brazos_river_nature_center.phtml"
      },
      {
        "label": "BRNC GIS access coordinate",
        "value": "31.698655, -97.279101",
        "note": "TPWD's River Access and Conservation Areas GIS layer lists Brazos River Nature Center as a current Brazos access point and places the feature near the river frontage, resolving the older page-coordinate offset for route-audit purposes.",
        "sourceUrl": "https://tpwd.texas.gov/server/rest/services/Inland/River_Access_and_Conservation_Areas/FeatureServer/0"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08093100 at 61.4 cfs / 6.13 ft",
        "note": "USGS Water Services returned current Brazos River near Aquilla discharge and gage height at 2026-08-12 16:00 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08093100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Brazos flow guidance",
        "value": "200 cfs below minimum; 501-1,200 cfs ideal; 5,001+ cfs flood",
        "note": "BRA's public river-recreation chart lists 200 cfs or less as below the minimum needed for paddling, 501-1,200 cfs as ideal conditions, 1,200-3,000 cfs as hazardous, 3,001-5,000 cfs as experts-only, and 5,001+ cfs as flood conditions.",
        "sourceUrl": "https://brazos.org/about-us/news/news-room/resource-library/on-the-river"
      },
      {
        "label": "Camping and safety",
        "value": "Nearby basecamp only; release, primitive-access, and private-bank caveats",
        "note": "TPWD describes adjacent Spivey RV/cabin/cottage services but only daylight public lease use for the route endpoints, warns Whitney releases can cause rapid rises, and describes BRNC as primitive with no restrooms or potable water.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/brazos_river_nature_center.phtml"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, BRA, Commons, USGS, and same-route web review found route-context pages but no clearly rights-clean exact Spivey-to-Brazos-River-Nature-Center paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Brazos+River+Spivey+Crossing+Brazos+River+Nature+Center+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Spivey Crossing RV Park",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/spivey_crossing.phtml",
        "provider": "local"
      },
      {
        "label": "TPWD Brazos River Nature Center",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/brazos_river_nature_center.phtml",
        "provider": "local"
      },
      {
        "label": "TPWD RACA access points GIS",
        "url": "https://tpwd.texas.gov/server/rest/services/Inland/River_Access_and_Conservation_Areas/FeatureServer/0",
        "provider": "local"
      },
      {
        "label": "Brazos River Authority On The River",
        "url": "https://brazos.org/about-us/news/news-room/resource-library/on-the-river",
        "provider": "local"
      },
      {
        "label": "USGS 08093100 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08093100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08093100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08093100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "brazos-river-fullers-folly-sandy-bottoms",
    "slug": "brazos-river-fullers-folly-sandy-bottoms",
    "name": "Brazos River",
    "reach": "Fuller's Folly River Ranch to Sandy Bottoms River Trail Camp",
    "aliases": [
      "Fuller's Folly to Sandy Bottoms",
      "Brazos River upstream of Lake Granbury",
      "Fuller's Folly River Ranch to Sandy Bottoms River Company"
    ],
    "state": "Texas",
    "region": "Dallas-Fort Worth",
    "routeType": "recreational",
    "summary": "Short TPWD leased-access Brazos River float upstream of Lake Granbury, from Fuller's Folly River Ranch to Sandy Bottoms River Trail Camp. TPWD publishes the active leased access, endpoint coordinates, 4.1-mile downstream route, day-use rules, and contact requirements, while USGS 08090800 at Dennis gives a direct same-reach flow check.",
    "statusText": "Use the Brazos River near Dennis gauge. BRA's public paddling chart treats 200 cfs as below the minimum, 501-1,200 cfs as ideal, and higher flows as increasingly hazardous; current readings near the floor mean more paddling, shallow bars, and stricter arrival checks.",
    "latitude": 32.61955,
    "longitude": -97.89381,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Both endpoints are TPWD leased-access sites with advance-contact and liability-form requirements; confirm availability before driving a shuttle.",
        "BRA warns that Brazos paddling conditions can change with rain and upstream reservoir releases, and that flows above 1,200 cfs become hazardous for less-skilled paddlers.",
        "Stay on the named leased-access route and public navigable channel; do not treat private banks or nearby ranch roads as casual rest, scout, or bailout options."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08090800",
      "provider": "usgs",
      "siteId": "08090800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Brazos Rv nr Dennis, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08090800/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 501,
      "idealMax": 1200,
      "tooLow": 200,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "Brazos River Authority paddling-flow chart",
        "url": "https://brazos.org/about-us/news/news-room/resource-library/stay-informed-on-the-river",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "windSensitivity": 0.35,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This upper-middle Brazos segment is short enough for year-round day use when access and flow cooperate, but shallow readings near the 200 cfs floor, upstream reservoir releases, storms, summer heat, and private-bank limits all require same-day judgment.",
      "difficulty": "easy",
      "difficultyNotes": "The route is only 4.1 miles and TPWD frames it as a fishing and paddling access float, but leased-access logistics, low-water bars, reservoir-release changes, private banks, and simple rural landings keep it from being treated as a casual park loop.",
      "confidenceNotes": "Confidence is good for a conservative TPWD leased-access route: TPWD publishes Fuller's Folly and Sandy Bottoms as active public leased access through August 31, 2026, gives endpoint coordinates, identifies Fuller's Folly as the put-in for the 4.1-mile downstream float, and names Sandy Bottoms River Trail Camp as the take-out. USGS 08090800 is a direct same-reach gauge at Dennis with same-day legacy RDB discharge and stage. BRA's flow chart is river-wide rather than route-specific, so the route keeps explicit low-water, release, storm, and visual-check caveats."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Fuller's Folly to Sandy Bottoms River Trail Camp, 4.1 mi",
        "note": "TPWD says Fuller's Folly is a put-in for a 4.1-mile float downstream to the leased access at Sandy Bottoms River Company.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/fullers_folly.phtml"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "32.619550, -97.893810 to 32.580406, -97.892005",
        "note": "TPWD publishes current leased-access coordinates for Fuller's Folly River Ranch and Sandy Bottoms River Trail Camp; both are recorded as access anchors and not guessed wetted-edge points.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/sandy_bottoms.phtml"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08090800 at 217 cfs / 2.43 ft",
        "note": "USGS legacy RDB current conditions returned Brazos River near Dennis discharge and gage height at 2026-08-10 21:00 CDT during this implementation run.",
        "sourceUrl": "https://nwis.waterdata.usgs.gov/tx/nwis/uv?cb_00060=on&cb_00065=on&format=rdb&site_no=08090800&period=P1D&legacy=1"
      },
      {
        "label": "Brazos flow guidance",
        "value": "200 cfs below minimum; 501-1,200 cfs ideal; 5,001+ cfs flood",
        "note": "BRA's public river-recreation chart lists 200 cfs or less as below the minimum needed for paddling, 501-1,200 cfs as ideal conditions, 1,200-3,000 cfs as hazardous, 3,001-5,000 cfs as experts-only, and 5,001+ cfs as flood conditions.",
        "sourceUrl": "https://brazos.org/about-us/news/news-room/resource-library/stay-informed-on-the-river"
      },
      {
        "label": "Access rules and camping",
        "value": "Advance contact, daylight access, liability form, separate private accommodations",
        "note": "TPWD requires advance contact and liability forms at both leased-access sites, limits access to daylight windows, and describes lodging or accommodations as separate private-property services rather than route camping rights.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/fullers_folly.phtml"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, BRA, Commons, USGS, and same-route web review found route-context imagery but no clearly rights-clean exact Fuller's-Folly-to-Sandy-Bottoms paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Brazos+River+Fuller%27s+Folly+Sandy+Bottoms+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Fuller's Folly River Ranch",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/fullers_folly.phtml",
        "provider": "local"
      },
      {
        "label": "TPWD Sandy Bottoms River Company",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/sandy_bottoms.phtml",
        "provider": "local"
      },
      {
        "label": "Brazos River Authority Stay Informed On The River",
        "url": "https://brazos.org/about-us/news/news-room/resource-library/stay-informed-on-the-river",
        "provider": "local"
      },
      {
        "label": "USGS 08090800 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08090800/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08090800 legacy current values",
        "url": "https://nwis.waterdata.usgs.gov/tx/nwis/uv?cb_00060=on&cb_00065=on&format=rdb&site_no=08090800&period=P1D&legacy=1",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "brazos-river-sandy-bottoms-chavez-access",
    "slug": "brazos-river-sandy-bottoms-chavez-access",
    "name": "Brazos River",
    "reach": "Sandy Bottoms River Trail Camp to Sandy Bottoms Chavez Access",
    "aliases": [
      "Sandy Bottoms to Chavez Access",
      "Sandy Bottoms River Company short float",
      "Brazos River upstream of Lake Granbury"
    ],
    "state": "Texas",
    "region": "Dallas-Fort Worth",
    "routeType": "recreational",
    "summary": "Very short TPWD leased-access Brazos River connector upstream of Lake Granbury, from Sandy Bottoms River Trail Camp to Sandy Bottoms Chavez Access. TPWD publishes the active leased access, both access coordinates, 1.5-mile downstream spacing, direct Chavez dock and river-access context, daylight day-use rules, and contact requirements, while USGS 08090800 at Dennis gives a direct same-reach flow check.",
    "statusText": "Use the Brazos River near Dennis gauge. BRA's public paddling chart treats 200 cfs as below the minimum, 501-1,200 cfs as ideal, and higher flows as increasingly hazardous; this short connector still needs access confirmation and enough water to avoid dragging.",
    "latitude": 32.580406,
    "longitude": -97.892005,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Both endpoints are TPWD leased-access Sandy Bottoms sites with advance-text and liability-form requirements; confirm the route and landing before driving a shuttle.",
        "BRA warns that Brazos paddling conditions can change with rain and upstream reservoir releases, and that flows above 1,200 cfs become hazardous for less-skilled paddlers.",
        "Stay on the named leased-access route and public navigable channel; do not treat private banks, sandbars, or nearby ranch roads as casual rest, scout, bailout, or camping options."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08090800",
      "provider": "usgs",
      "siteId": "08090800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Brazos Rv nr Dennis, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08090800/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 501,
      "idealMax": 1200,
      "tooLow": 200,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "Brazos River Authority paddling-flow chart",
        "url": "https://brazos.org/about-us/news/news-room/resource-library/stay-informed-on-the-river",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "windSensitivity": 0.25,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This Sandy Bottoms connector is only about 1.5 river miles, so it is most useful as a short practice, fishing, or family shuttle when the Dennis gauge is comfortably above the 200 cfs floor, access is confirmed, and weather or reservoir-release changes are not pushing the Brazos upward.",
      "difficulty": "easy",
      "difficultyNotes": "The route is very short and TPWD names both access points, but leased-access logistics, shallow low-water bars, private banks, rural landing conditions, and fast-changing Brazos releases still require same-day checks.",
      "confidenceNotes": "Confidence is good for a conservative TPWD leased-access route: TPWD publishes Sandy Bottoms River Trail Camp and Sandy Bottoms Chavez Access as active public leased access through August 31, 2026, gives both endpoint coordinates, and says Chavez is about 1.5 river miles downstream with direct river access and a small dock. USGS 08090800 is a direct same-reach gauge at Dennis with same-day legacy RDB discharge and stage. BRA's flow chart is river-wide rather than route-specific, so the route keeps explicit low-water, release, storm, private-bank, and visual-check caveats."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Sandy Bottoms River Trail Camp to Sandy Bottoms Chavez Access, 1.5 mi",
        "note": "TPWD says Sandy Bottoms Chavez Access is about 1.5 river miles downstream of Sandy Bottoms River Trail Camp and provides direct river access plus a small dock for paddle craft and fishing.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/sandy_bottoms.phtml"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "32.580406, -97.892005 to 32.563572, -97.877014",
        "note": "TPWD publishes current leased-access coordinates for Sandy Bottoms River Trail Camp and Sandy Bottoms Chavez Access; both are recorded as access anchors and not guessed wetted-edge points.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/sandy_bottoms.phtml"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08090800 at 211 cfs / 2.41 ft",
        "note": "USGS legacy RDB current conditions returned Brazos River near Dennis discharge and gage height at 2026-08-11 13:45 CDT during this implementation run after Water Services JSON returned HTTP 503.",
        "sourceUrl": "https://nwis.waterdata.usgs.gov/tx/nwis/uv?cb_00060=on&cb_00065=on&format=rdb&site_no=08090800&period=1&siteStatus=all"
      },
      {
        "label": "Brazos flow guidance",
        "value": "200 cfs below minimum; 501-1,200 cfs ideal; 5,001+ cfs flood",
        "note": "BRA's public river-recreation chart lists 200 cfs or less as below the minimum needed for paddling, 501-1,200 cfs as ideal conditions, 1,200-3,000 cfs as hazardous, 3,001-5,000 cfs as experts-only, and 5,001+ cfs as flood conditions.",
        "sourceUrl": "https://brazos.org/about-us/news/news-room/resource-library/stay-informed-on-the-river"
      },
      {
        "label": "Access rules and camping",
        "value": "Advance text, daylight access, liability form, separate private accommodations",
        "note": "TPWD requires advance text contact and liability forms for Sandy Bottoms access, limits use to daylight windows, and describes private accommodations as separate reservation-based services rather than public route camping rights.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/sandy_bottoms.phtml"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, BRA, Commons, USGS, and same-route web review found route-context imagery but no clearly rights-clean exact Sandy-Bottoms-to-Chavez-Access paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Brazos+River+Sandy+Bottoms+Chavez+Access+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Sandy Bottoms River Company",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/sandy_bottoms.phtml",
        "provider": "local"
      },
      {
        "label": "Brazos River Authority Stay Informed On The River",
        "url": "https://brazos.org/about-us/news/news-room/resource-library/stay-informed-on-the-river",
        "provider": "local"
      },
      {
        "label": "USGS 08090800 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08090800/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08090800 legacy current values",
        "url": "https://nwis.waterdata.usgs.gov/tx/nwis/uv?cb_00060=on&cb_00065=on&format=rdb&site_no=08090800&period=1&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "brazos-river-milam-county-area-1-area-2",
    "slug": "brazos-river-milam-county-area-1-area-2",
    "name": "Brazos River",
    "reach": "Brazos River Milam County Area 1 to Area 2",
    "aliases": [
      "Brazos River Milam County Access Areas 1 and 2",
      "BRMC1 to BRMC2",
      "Brazos River downstream of FM 979"
    ],
    "state": "Texas",
    "region": "Central Texas",
    "routeType": "recreational",
    "summary": "Short TPWD leased-access Brazos River float near Calvert from Brazos River Milam County Area 1 at FM 979 to Area 2 near County Road 259. TPWD publishes the active lease, endpoint coordinates, 5-mile downstream route, daylight access rules, muddy-site closure caveat, and prearranged gate-code and shuttle requirements.",
    "statusText": "Use the Brazos River near Highbank gauge as the conservative upstream flow check. BRA's public paddling chart treats 200 cfs as below the minimum, 501-1,200 cfs as ideal, and higher flows as increasingly hazardous; current readings are below the floor, so wait for more water and confirm site conditions before launch.",
    "latitude": 30.977162,
    "longitude": -96.761887,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks",
        "access_uncertain"
      ],
      "safetyNotes": [
        "Both endpoints are TPWD leased-access areas; contact BRMC before arrival for gate codes, site conditions, and any shuttle service details.",
        "TPWD says the Area 2 river access is about one mile from the designated parking area through Brazos River bottomland forest, so verify the take-out path before leaving a vehicle.",
        "BRA warns that rain, upstream weather, and reservoir releases can change Brazos River flow quickly; do not launch when the gauge is rising toward hazardous bands."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08098290",
      "provider": "usgs",
      "siteId": "08098290",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Brazos Rv nr Highbank, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08098290/"
    },
    "fallbackGaugeSources": [
      {
        "id": "usgs-08108700",
        "provider": "usgs",
        "siteId": "08108700",
        "metric": "discharge_cfs",
        "unit": "cfs",
        "kind": "proxy",
        "siteName": "Brazos Rv at SH 21 nr Bryan, TX",
        "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08108700/"
      }
    ],
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 501,
      "idealMax": 1200,
      "tooLow": 200,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "Brazos River Authority paddling-flow chart",
        "url": "https://brazos.org/about-us/news/news-room/resource-library/stay-informed-on-the-river",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "windSensitivity": 0.25,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This middle Brazos route can work year-round when the lease sites and flow cooperate, but low-water bars, muddy bottomland access, upstream rain, reservoir releases, summer heat, and private-bank limits make same-day checks mandatory.",
      "difficulty": "easy",
      "difficultyNotes": "The route is only five miles and TPWD frames it as a downstream paddling access connection, but the route should still be treated as a rural river day with a prearranged take-out path, possible low-water dragging, changing mud conditions, wood, and private banks.",
      "confidenceNotes": "Confidence is good for a conservative TPWD leased-access add: TPWD publishes an active lease through December 31, 2026, both Area 1 and Area 2 coordinates, the 5-mile BRMC1-to-BRMC2 route, daylight non-motorized use rules, and the prearrival access procedure. USGS 08098290 at Highbank is a product-live upstream Brazos gauge, with downstream USGS 08108700 at SH 21 near Bryan recorded for additional context. BRA's flow chart is river-wide rather than route-specific, so the route keeps explicit low-water, release, storm, muddy-access, and visual-check caveats."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "BRMC1 to BRMC2, 5 mi",
        "note": "TPWD says Brazos River Milam County Area 1 serves as a put-in for a 5-mile paddle to Area 2, and Area 2 serves as the take-out for that 5-mile paddle.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/brazos_milam.phtml"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "30.977162, -96.761887 to 30.919294, -96.746588",
        "note": "TPWD publishes latitude and longitude for Area 1 and Area 2. The coordinates are recorded as leased-access anchors, with final water entry and exit following current site instructions and safe bank conditions.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/brazos_milam.phtml"
      },
      {
        "label": "Live gauge",
        "value": "USGS 08098290 at 95.5 cfs / 1.44 ft",
        "note": "USGS Water Services returned current Brazos River near Highbank discharge and gage height at 2026-08-10 21:00 CDT during this implementation run; PaddleToday uses it as the conservative upstream middle-Brazos flow check.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08098290&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Downstream gauge context",
        "value": "USGS 08108700 at 582 cfs / 7.89 ft",
        "note": "USGS Water Services also returned current values for the downstream Brazos River at SH 21 near Bryan at 2026-08-10 21:15 CDT; it is recorded as context, not the primary scoring gauge.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08108700&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Brazos flow guidance",
        "value": "200 cfs below minimum; 501-1,200 cfs ideal; 5,001+ cfs flood",
        "note": "BRA's public river-recreation chart lists 200 cfs or less as below the minimum needed for paddling, 501-1,200 cfs as ideal conditions, 1,200-3,000 cfs as hazardous, 3,001-5,000 cfs as experts-only, and 5,001+ cfs as flood conditions.",
        "sourceUrl": "https://brazos.org/about-us/news/news-room/resource-library/stay-informed-on-the-river"
      },
      {
        "label": "Access and camping",
        "value": "Daylight leased access only; no route camping selected",
        "note": "TPWD requires prearrival contact for gate codes and site conditions, says Area 2 access is about one mile from parking through bottomland forest, and allows temporary closure for wet or muddy sites. No public route-camping right is published for the selected day-use route.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/brazos_milam.phtml"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, BRA, Commons, USGS, and same-route web review found route-context imagery but no clearly rights-clean exact Milam County Area-1-to-Area-2 paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Brazos+River+Milam+County+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Brazos River Milam County Access Areas 1 and 2",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/brazos_milam.phtml",
        "provider": "local"
      },
      {
        "label": "Brazos River Authority Stay Informed On The River",
        "url": "https://brazos.org/about-us/news/news-room/resource-library/stay-informed-on-the-river",
        "provider": "local"
      },
      {
        "label": "USGS 08098290 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08098290/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08098290 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08098290&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "USGS 08108700 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08108700&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "brazos-river-county-park-bells-landing",
    "slug": "brazos-river-county-park-bells-landing",
    "name": "Brazos River",
    "reach": "Brazos River County Park to Bells Landing",
    "aliases": [
      "Stephen F. Austin Paddling Trail - Columbia Bottomland Waterway",
      "Columbia Bottomland Waterway",
      "Brazos River County Park to Bells Landing"
    ],
    "state": "Texas",
    "region": "Gulf Coast",
    "summary": "Northernmost Stephen F. Austin Paddling Trail segment through the Columbia Bottomlands. TPWD publishes the 8.3-mile Brazos River County Park-to-Bells Landing route and endpoint coordinates, while the West Columbia USGS gauge gives a direct lower-Brazos condition check.",
    "statusText": "Use the Brazos River near West Columbia gauge. BRA's public paddling chart treats 200 cfs as below the minimum, 501-1,200 cfs as ideal, and higher flows as increasingly hazardous, so check wind, tide, rain, and bank conditions before committing.",
    "latitude": 29.201,
    "longitude": -95.5642,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD says this natural lower-Brazos reach is readily influenced by rainfall runoff across the larger basin, which can create high flows and undesirable water quality even when rain is not local.",
        "Expect snags at low water, quicksand-prone banks, possible wildlife including alligators, wind exposure on broad bends, and simple bank access at Bells Landing.",
        "Use Brazos River County Park and Bells Landing as the planned public access pair, and keep private-bank use limited to direct hazard portages within the navigable corridor."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08116850",
      "provider": "usgs",
      "siteId": "08116850",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Brazos Rv nr West Columbia, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08116850/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 501,
      "idealMax": 1200,
      "tooLow": 200,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "Brazos River Authority paddling-flow chart",
        "url": "https://brazos.org/about-us/news/news-room/resource-library/on-the-river",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "windSensitivity": 0.45,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The lower Brazos can be paddled year-round when flow, wind, tide, and access conditions cooperate. Gulf Coast heat, thunderstorms, basin-wide runoff, and tidal or coastal wind effects can change a simple-looking trip quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "TPWD presents the route as a half-day trail with no man-made obstructions, but the broad tidal lower river, quicksand banks, low-water snags, alligators, wind, and runoff-driven flow changes justify more than a beginner-flatwater label.",
      "confidenceNotes": "Confidence is good for a conservative official-source add: TPWD publishes the exact Columbia Bottomland Waterway segment, both access names, endpoint coordinates, route length, float time, private-property rules, and safety caveats; Brazoria County corroborates Brazos River County Park's canoe launch and day-use amenities; USGS 08116850 exposes current discharge and stage for the lower Brazos near West Columbia; and BRA publishes a numeric Brazos paddling-flow chart. The flow chart is river-wide rather than route-specific, so the card keeps explicit wind, tide, runoff, and visual-check caveats."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Brazos River County Park to Bells Landing, 8.3 mi",
        "note": "TPWD identifies the Columbia Bottomland Waterway as the northernmost Stephen F. Austin Paddling Trail segment from Brazos River County Park to Bells Landing, with a roughly 3-4 hour float time.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/stephen-f-austin-columbia-bottomland-waterway/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "29.2010, -95.5642 to 29.1408, -95.6153",
        "note": "TPWD publishes GPS coordinates for the Brazos River County Park put-in and Bells Landing take-out; the county park page separately confirms a canoe launch, paved parking, pavilions, picnic areas, and restrooms.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/stephen-f-austin-columbia-bottomland-waterway/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08116850 at 1,930 cfs / 0.07 ft",
        "note": "USGS Water Services returned same-day values for Brazos River near West Columbia, TX at 2026-08-09 21:30 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08116850&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Brazos flow guidance",
        "value": "200 cfs below minimum; 501-1,200 cfs ideal; 5,001+ cfs flood",
        "note": "BRA's public river-recreation chart lists 200 cfs or less as below the minimum needed for paddling, 501-1,200 cfs as ideal conditions, 1,200-3,000 cfs as hazardous, 3,001-5,000 cfs as experts-only, and 5,001+ cfs as flood conditions.",
        "sourceUrl": "https://brazos.org/about-us/news/news-room/resource-library/on-the-river"
      },
      {
        "label": "Safety and access context",
        "value": "No man-made obstructions, low-water snags, quicksand banks, runoff sensitivity, private-bank limits",
        "note": "TPWD says the reach has no man-made obstructions but can have low-water snags, quicksand along banks, rainfall-runoff high flows and poor water quality, and private-property restrictions outside the navigable streambed and hazard portages.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/stephen-f-austin-columbia-bottomland-waterway/"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Columbia Bottomland Waterway",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/stephen-f-austin-columbia-bottomland-waterway/",
        "provider": "local"
      },
      {
        "label": "Brazoria County Brazos River County Park",
        "url": "https://www.brazoriacountytx.gov/departments/parks-department/brazos-river",
        "provider": "local"
      },
      {
        "label": "Brazos River Authority On The River",
        "url": "https://brazos.org/about-us/news/news-room/resource-library/on-the-river",
        "provider": "local"
      },
      {
        "label": "USGS 08116850 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08116850/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08116850 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08116850&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "brazos-river-fm2004-freeport-municipal-park",
    "slug": "brazos-river-fm2004-freeport-municipal-park",
    "name": "Brazos River",
    "reach": "FM 2004 boat ramp to Freeport Municipal Park",
    "aliases": [
      "Stephen F. Austin Paddling Trail - Gulf Prairie Run",
      "Gulf Prairie Run",
      "Brazos River FM 2004 to Freeport"
    ],
    "state": "Texas",
    "region": "Gulf Coast",
    "summary": "Coastal Stephen F. Austin Paddling Trail segment from the FM 2004 boat ramp to Freeport Municipal Park. TPWD publishes the 9.8-mile Gulf Prairie Run and exact endpoints, while the nearby West Columbia USGS gauge gives the best product-supported lower-Brazos flow check before a wind- and tide-sensitive day.",
    "statusText": "Use the Brazos River near West Columbia gauge as the lower-Brazos flow check. BRA's public paddling chart treats 200 cfs as below the minimum, 501-1,200 cfs as ideal, and higher flows as increasingly hazardous; on this coastal reach, also check wind, tide, rainfall, and launch conditions before committing.",
    "latitude": 29.0316,
    "longitude": -95.4771,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD says this natural lower-Brazos reach is readily influenced by basin-wide rainfall runoff, which can create high flows and undesirable water quality even when rain is not local.",
        "This coastal segment adds levee-bounded banks, possible tidal or Gulf wind effects, quicksand-prone banks, low-water snags, alligators, and a simple shell-road take-out at Freeport.",
        "Use the FM 2004 boat ramp and Freeport Municipal Park as the planned public access pair; keep private-bank use limited to direct hazard portages within the navigable corridor."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08116850",
      "provider": "usgs",
      "siteId": "08116850",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Brazos Rv nr West Columbia, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08116850/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 501,
      "idealMax": 1200,
      "tooLow": 200,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "Brazos River Authority paddling-flow chart",
        "url": "https://brazos.org/about-us/news/news-room/resource-library/on-the-river",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "windSensitivity": 0.65,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The coastal lower Brazos can be paddled year-round when flow, wind, tide, access, and weather cooperate. Gulf Coast heat, thunderstorms, basin-wide runoff, coastal headwinds, and tidal influence can make this short-looking route feel much more committed.",
      "difficulty": "moderate",
      "difficultyNotes": "TPWD presents Gulf Prairie Run as a 4-5 hour trail with no man-made obstructions, but coastal wind, tide/current interaction, levee-bounded banks, quicksand, snags, alligators, and runoff-driven flow changes justify a moderate caution rating.",
      "confidenceNotes": "Confidence is good for a conservative official-source add: TPWD publishes Gulf Prairie Run as an exact 9.8-mile Stephen F. Austin Paddling Trail with named public endpoints, endpoint coordinates, float time, no man-made obstructions, private-property rules, and lower-Brazos safety caveats. USGS 08116850 exposes current discharge and stage upstream in the same lower-Brazos corridor, and BRA publishes numeric Brazos paddling-flow bands. The gauge and bands are lower-river rather than route-specific, so this card keeps strong coastal wind, tide, runoff, and visual-check caveats."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "FM 2004 boat ramp to Freeport Municipal Park, 9.8 mi",
        "note": "TPWD identifies Gulf Prairie Run as a 9.8-mile Stephen F. Austin Paddling Trail from the FM 2004 boat ramp to Freeport Municipal Park, usually taking about 4-5 hours depending on water level, flow, and wind.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/stephen-f-austin-gulf-prairie-run/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "29.0316, -95.4771 to 28.9646, -95.3743",
        "note": "TPWD publishes GPS coordinates for the FM 2004 put-in and Freeport Municipal Park take-out, with driving directions to both public boat ramps.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/stephen-f-austin-gulf-prairie-run/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08116850 at 1,660 cfs / 0.05 ft",
        "note": "USGS Water Services returned current values for Brazos River near West Columbia, TX at 2026-08-09 22:30 CDT during this run; PaddleToday uses this as the nearest product-supported lower-Brazos flow check rather than the tidal Freeport flood-gate gauge.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08116850&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Brazos flow guidance",
        "value": "200 cfs below minimum; 501-1,200 cfs ideal; 5,001+ cfs flood",
        "note": "BRA's public river-recreation chart lists 200 cfs or less as below the minimum needed for paddling, 501-1,200 cfs as ideal conditions, 1,200-3,000 cfs as hazardous, 3,001-5,000 cfs as experts-only, and 5,001+ cfs as flood conditions.",
        "sourceUrl": "https://brazos.org/about-us/news/news-room/resource-library/on-the-river"
      },
      {
        "label": "Safety and access context",
        "value": "No man-made obstructions, low-water snags, quicksand banks, runoff sensitivity, private-bank limits",
        "note": "TPWD says this reach has no man-made obstructions but can have low-water snags, quicksand along banks, rainfall-runoff high flows and poor water quality, and private-property restrictions outside the navigable streambed and hazard portages.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/stephen-f-austin-gulf-prairie-run/"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Gulf Prairie Run",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/stephen-f-austin-gulf-prairie-run/",
        "provider": "local"
      },
      {
        "label": "Brazos River Authority On The River",
        "url": "https://brazos.org/about-us/news/news-room/resource-library/on-the-river",
        "provider": "local"
      },
      {
        "label": "USGS 08116850 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08116850/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08116850 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08116850&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "village-creek-fm418-sh327",
    "slug": "village-creek-fm418-sh327",
    "name": "Village Creek",
    "reach": "FM 418 Boat Launch to TX 327 Boat Launch",
    "aliases": [
      "Village Creek - FM 418 to SH 327",
      "Village Creek - FM 418 to TX 327",
      "Upper Village Creek Paddling Trail"
    ],
    "state": "Texas",
    "region": "East Texas",
    "summary": "Easy Big Thicket flatwater day from FM 418 to TX 327. TPWD and NPS still document the exact 8.6-mile segment, and the Kountze USGS gauge gives a direct same-creek condition check.",
    "statusText": "Use the Village Creek near Kountze gauge. Around 200 cfs is the conservative low-water floor for FM 418 to TX 327. The gauge was 229 cfs and 3.70 ft at 2026-07-13 14:30 CDT, just above the minimum-only floor; no route-specific upper cfs band is claimed.",
    "latitude": 30.397794,
    "longitude": -94.265024,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Village Creek is free-flowing and unrestrained by dams. Heavy rain and high water can create deceptively swift current on a route that often feels easy at normal levels.",
        "Expect snags, logjams, overhanging limbs, and sandbars, especially when the creek is low or after storms move wood into the channel.",
        "Respect Big Thicket boundary markers and private-bank limits. Use only the named public launches and only step onto private banks when necessary to portage a hazard."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08041500",
      "provider": "usgs",
      "siteId": "08041500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Village Ck nr Kountze, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows five-level Village Creek / Kountze gauge table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This route can work year-round, but summer heat and insects make low-water days less pleasant, and rainfall can push the creek from calm flatwater into a much faster run. Treat storms and rising water conservatively.",
      "difficulty": "easy",
      "difficultyNotes": "Usually calm flatwater and friendly for novice groups, but 8.6 miles is still a real half-day shuttle. Low water can force dragging or short portages around sandbars and logs, and high water removes the easy feel quickly.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD currently names the exact FM 418-to-SH 327 segment with coordinates, mileage, route description, water-quality warning, and private-boundary cautions; NPS publishes both launch pages with tighter GPS coordinates and the same 8.6-mile relationship; USGS 08041500 is the direct live gauge in the route corridor; and the historic Texas River Flows table ties a 200 cfs minimum to that same Kountze gauge. USGS Water Services returned same-day July 13, 2026 values of 229 cfs and 3.70 ft at 2026-07-13 14:30 CDT, which keeps the route barely above the conservative floor. Confidence stays intentionally conservative because the threshold floor comes from a legacy multi-level table rather than a modern manager-published route band, so the route ships minimum-only and does not claim an upper scoring range."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 08041500 at 229 cfs / 3.70 ft",
        "note": "USGS Water Services returned same-day July 13, 2026 discharge and stage values for Village Creek near Kountze, confirming the direct live gauge path used for this route.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08041500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "The Texas River Flows five-level table lists Village Creek at the Kountze gauge with a first-tier 200 cfs minimum, defined as the minimum water available for floating. Paddle Today uses only that conservative floor and does not infer an ideal or upper scoring band.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Official route shape",
        "value": "FM 418 to TX 327, 8.6 mi",
        "note": "Current TPWD and NPS Village Creek trail pages both identify FM 418 to TX 327 as an 8.6-mile upper segment of the paddling trail.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/"
      },
      {
        "label": "Exact public launch coordinates",
        "value": "30.397794, -94.265024 to 30.346944, -94.239385",
        "note": "NPS publishes the FM 418 Boat Launch and TX 327 Boat Launch as the exact public endpoints for this route, with trailer parking and launch access at both bridges.",
        "sourceUrl": "https://www.nps.gov/places/village-creek-fm-418-boat-launch.htm"
      },
      {
        "label": "Highway right-of-way access context",
        "value": "100 yd at FM 418, 200 yd at SH 327",
        "note": "TPWD Analysis of Texas Waterways says 100 yards of shoreline are available on the highway right-of-way at FM 418 and 200 yards at SH 327, reinforcing the public launch/take-out story for this corridor.",
        "sourceUrl": "https://tpwd.texas.gov/publications/pwdpubs/pwd_rp_t3200_1047/11_e_tx_village_creek.phtml"
      },
      {
        "label": "Hazard and water-quality context",
        "value": "No dams, but logs, sandbars, and high-water speed",
        "note": "TPWD says the creek has no human-built obstructions on this segment, but can hold snags, logjams, and sandbars to avoid or portage around, and that the variable water quality is not recommended for drinking.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Village Creek Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/",
        "provider": "local"
      },
      {
        "label": "NPS Paddle Village Creek",
        "url": "https://home.nps.gov/thingstodo/paddle-village-creek.htm",
        "provider": "nps"
      },
      {
        "label": "NPS FM 418 Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-fm-418-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "NPS TX 327 Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-tx-327-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "TPWD Analysis of Texas Waterways - Village Creek",
        "url": "https://tpwd.texas.gov/publications/pwdpubs/pwd_rp_t3200_1047/11_e_tx_village_creek.phtml",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08041500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "village-creek-sh327-baby-galvez",
    "slug": "village-creek-sh327-baby-galvez",
    "name": "Village Creek",
    "reach": "TX 327 Boat Launch to Baby Galvez Road Boat Launch",
    "aliases": [
      "Village Creek - TX 327 to Baby Galvez",
      "Village Creek - SH 327 to Baby Galvez Road",
      "Middle Village Creek short segment"
    ],
    "state": "Texas",
    "region": "East Texas",
    "summary": "Short Big Thicket Village Creek link from TX 327 to Baby Galvez Road. NPS and TPWD still document both public launches, and the Kountze USGS gauge gives the same direct same-creek condition check used on the rest of the trail.",
    "statusText": "Use the Village Creek near Kountze gauge. Around 200 cfs is the conservative low-water floor for TX 327 to Baby Galvez. No route-specific upper cfs band is claimed; low water exposes more sandbars and logs, while heavy rain can turn this easy-looking segment swift quickly.",
    "latitude": 30.346944,
    "longitude": -94.239385,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Village Creek is free-flowing and can rise fast after rain even on this short family-style segment.",
        "Expect snags, logjams, overhanging limbs, and sandbars, especially when the creek is low or after storms move wood into the channel.",
        "Use only the named public launches, stay off private banks except when a hazard portage is necessary, and do not treat the calm flatwater feel as proof that rising water is harmless."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08041500",
      "provider": "usgs",
      "siteId": "08041500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Village Ck nr Kountze, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows five-level Village Creek / Kountze gauge table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This short Village Creek segment can work much of the year, but runoff changes it quickly. Treat fresh rain, rising water, heat, and insects conservatively.",
      "difficulty": "easy",
      "difficultyNotes": "This is the shortest and easiest named Village Creek segment in the public trail chain, but low water can still force shallow route-finding and high water can erase the beginner feel.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: current NPS launch pages publish exact coordinates for the TX 327 and Baby Galvez public launches, TPWD and NPS both keep the Village Creek trail family live, USGS 08041500 is the direct same-creek gauge, and the legacy Texas River Flows table still gives a usable 200 cfs minimum. Confidence stays intentionally conservative because the threshold floor comes from a legacy multi-level table rather than a modern manager-published route band, so the route ships minimum-only and does not claim an upper scoring range."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 08041500 at 287 cfs / 4.14 ft",
        "note": "USGS Water Services returned same-day July 11, 2026 discharge and stage values for Village Creek near Kountze, confirming the direct live gauge path used for this route.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08041500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "The Texas River Flows five-level table lists Village Creek at the Kountze gauge with a first-tier 200 cfs minimum, defined as the minimum water available for floating. Paddle Today uses only that conservative floor and does not infer an ideal or upper scoring band.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Official route shape",
        "value": "TX 327 to Baby Galvez Rd, 3.37 mi",
        "note": "Current TPWD Village Creek trail material lists TX 327 to Baby Galvez Road as a 3.37-mile middle segment in the public access chain.",
        "sourceUrl": "https://www.nps.gov/bith/planyourvisit/paddling-trails.htm"
      },
      {
        "label": "Exact public launch coordinates",
        "value": "30.346944, -94.239385 to 30.33450, -94.20391",
        "note": "NPS publishes the TX 327 and Baby Galvez Road boat launches as named public endpoints with current GPS coordinates and launch descriptions.",
        "sourceUrl": "https://www.nps.gov/places/village-creek-baby-galvez-road-boat-launch.htm"
      },
      {
        "label": "Hazard and access context",
        "value": "Flatwater route with sandbars, logs, and flood-sensitive current",
        "note": "NPS and TPWD describe Village Creek as generally calm but free-flowing, with sandbars and logs at low water and hazardous current during high water or after heavy rain.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Village Creek Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/",
        "provider": "local"
      },
      {
        "label": "NPS Paddling Trails - Village Creek",
        "url": "https://www.nps.gov/bith/planyourvisit/paddling-trails.htm",
        "provider": "nps"
      },
      {
        "label": "NPS TX 327 Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-tx-327-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Baby Galvez Road Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-baby-galvez-road-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "TPWD Analysis of Texas Waterways - Village Creek",
        "url": "https://tpwd.texas.gov/publications/pwdpubs/pwd_rp_t3200_1047/11_e_tx_village_creek.phtml",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08041500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "village-creek-fm418-baby-galvez",
    "slug": "village-creek-fm418-baby-galvez",
    "name": "Village Creek",
    "reach": "FM 418 Boat Launch to Baby Galvez Road Boat Launch",
    "aliases": [
      "Village Creek - FM 418 to Baby Galvez",
      "Village Creek - Upper to middle Village Creek",
      "Long upper Village Creek day"
    ],
    "state": "Texas",
    "region": "East Texas",
    "summary": "Longer Big Thicket Village Creek day from FM 418 to Baby Galvez Road. TPWD and NPS keep the public access chain live, and the direct Kountze USGS gauge still gives the same same-creek condition check used on the shorter trail splits.",
    "statusText": "Use the Village Creek near Kountze gauge. Around 200 cfs is the conservative low-water floor for FM 418 to Baby Galvez. No route-specific upper cfs band is claimed; low water exposes more sandbars and logs, while heavy rain can turn this longer flatwater day swift quickly.",
    "latitude": 30.397794,
    "longitude": -94.265024,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Village Creek is free-flowing and can rise fast after rain even though this corridor often looks calm at ordinary levels.",
        "Expect snags, logjams, overhanging limbs, and sandbars, especially when the creek is low or after storms move wood into the channel.",
        "Use only the named public launches, stay off private banks except when a hazard portage is necessary, and reassess at TX 327 instead of assuming the longer continuation is always easy enough to press on."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08041500",
      "provider": "usgs",
      "siteId": "08041500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Village Ck nr Kountze, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows five-level Village Creek / Kountze gauge table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This route can work year-round, but nearly 12 miles of exposed creek makes summer heat, insects, and rain-driven current matter more than on the shortest split. Treat storms and rising water conservatively.",
      "difficulty": "easy",
      "difficultyNotes": "Usually calm flatwater and friendly for broad audiences, but this is a real half-day to full-day shuttle. Low water can add dragging or wood dodging, and high water removes the easy feel quickly.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD still publishes the Village Creek access chain, the FM 418 and Baby Galvez launches remain source-backed public endpoints through TPWD and NPS, USGS 08041500 is the direct live gauge in the same creek corridor, and the legacy Texas River Flows table still gives a usable 200 cfs minimum. TPWD's segment table currently lists TX 327 to Baby Galvez at 3.37 miles while the NPS trail summary rounds that middle segment shorter; Paddle Today uses the more specific TPWD segment table for route mileage and keeps the route minimum-only rather than claiming a stronger range."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 08041500 at 227 cfs / 3.68 ft",
        "note": "USGS Water Services returned same-day July 13, 2026 discharge and stage values for Village Creek near Kountze, confirming the direct live gauge path used for this route.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08041500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "The Texas River Flows five-level table lists Village Creek at the Kountze gauge with a first-tier 200 cfs minimum, defined as the minimum water available for floating. Paddle Today uses only that conservative floor and does not infer an ideal or upper scoring band.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Official route shape",
        "value": "FM 418 to Baby Galvez Rd, about 12.0 mi",
        "note": "Current TPWD trail material lists FM 418 to TX 327 at 8.6 miles and TX 327 to Baby Galvez Road at 3.37 miles, which together support this longer continuation.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/"
      },
      {
        "label": "Exact public launch coordinates",
        "value": "30.397794, -94.265024 to 30.33450, -94.20391",
        "note": "NPS publishes the FM 418 and Baby Galvez Road launches as named public endpoints with current GPS coordinates and launch descriptions.",
        "sourceUrl": "https://www.nps.gov/places/village-creek-baby-galvez-road-boat-launch.htm"
      },
      {
        "label": "Intermediate public bailout",
        "value": "TX 327 at 8.6 mi",
        "note": "NPS identifies TX 327 as the next public launch 8.6 miles below FM 418, giving the longer route a clear midpoint reassessment option.",
        "sourceUrl": "https://www.nps.gov/places/village-creek-fm-418-boat-launch.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Village Creek Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/",
        "provider": "local"
      },
      {
        "label": "NPS Paddling Trails - Village Creek",
        "url": "https://www.nps.gov/bith/planyourvisit/paddling-trails.htm",
        "provider": "nps"
      },
      {
        "label": "NPS FM 418 Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-fm-418-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Baby Galvez Road Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-baby-galvez-road-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "TPWD Analysis of Texas Waterways - Village Creek",
        "url": "https://tpwd.texas.gov/publications/pwdpubs/pwd_rp_t3200_1047/11_e_tx_village_creek.phtml",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08041500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "village-creek-baby-galvez-us-96",
    "slug": "village-creek-baby-galvez-us-96",
    "name": "Village Creek",
    "reach": "Baby Galvez Road Boat Launch to US 96 Boat Launch",
    "aliases": [
      "Village Creek - Baby Galvez to US 96",
      "Village Creek - Baby Galvez Road to Lumberton",
      "Lower-middle Village Creek Paddling Trail"
    ],
    "state": "Texas",
    "region": "East Texas",
    "summary": "Longer Big Thicket Village Creek day from Baby Galvez Road to the public US 96 launch near Lumberton. NPS keeps both launches and the 7.1-mile relationship current, and USGS 08041500 remains the direct gauge check.",
    "statusText": "Use the Village Creek near Kountze gauge. Around 200 cfs is the conservative low-water floor for Baby Galvez to US 96. No route-specific upper cfs band is claimed; this lower corridor still gets swifter and more debris-prone after heavy rain.",
    "latitude": 30.3345,
    "longitude": -94.20391,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This is still calm-looking flatwater at ordinary levels, but Village Creek can become deceptively fast after rain because there are no dams moderating the flow.",
        "Expect snags, overhanging trees, logjams, and sandbars, especially late in dry spells or after storms shift wood into the channel.",
        "Stay with the named public launches and legal stream corridor. Banks outside the access points can be private, and longer mileage increases the cost of a poor same-day decision."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08041500",
      "provider": "usgs",
      "siteId": "08041500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Village Ck nr Kountze, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows five-level Village Creek / Kountze gauge table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This route can work year-round, but summer heat, insects, and fluctuating rain-driven flow matter more on the longer Baby Galvez to Lumberton run.",
      "difficulty": "easy",
      "difficultyNotes": "The water is usually easy flatwater, but 7.1 miles makes this a real half-day route. Low water can add dragging or wood dodging, while high water removes the beginner feel quickly.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: NPS publishes exact coordinates for the Baby Galvez and US 96 public launches and describes the distance between them, TPWD keeps the Village Creek paddling-trail package live, USGS 08041500 is the direct same-creek gauge, and the legacy Texas River Flows table still provides a usable 200 cfs minimum. Confidence stays intentionally conservative because the threshold floor comes from a legacy multi-level table rather than a modern manager-published route band, so the route ships minimum-only and does not claim an upper scoring range."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 08041500 at 287 cfs / 4.14 ft",
        "note": "USGS Water Services returned same-day July 11, 2026 discharge and stage values for Village Creek near Kountze, confirming the direct live gauge path used for this route.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08041500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "The Texas River Flows five-level table lists Village Creek at the Kountze gauge with a first-tier 200 cfs minimum, defined as the minimum water available for floating. Paddle Today uses only that conservative floor and does not infer an ideal or upper scoring band.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Official route shape",
        "value": "Baby Galvez Rd to US 96, 7.1 mi",
        "note": "Current TPWD and NPS Village Creek trail pages identify Baby Galvez Road to US 96 as the longer lower-middle segment in the access chain.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/"
      },
      {
        "label": "Exact public launch coordinates",
        "value": "30.33450, -94.20391 to 30.28570, -94.19145",
        "note": "NPS publishes the Baby Galvez Road and US 96 boat launches as named public endpoints with current GPS coordinates and launch descriptions.",
        "sourceUrl": "https://www.nps.gov/places/village-creek-us-96-boat-launch.htm"
      },
      {
        "label": "Camping and route context",
        "value": "Year-round sandbar camping allowed on the broader trail",
        "note": "Big Thicket says camping is allowed year-round on sandbars along Village Creek, while this specific segment also works well as a long same-day paddle.",
        "sourceUrl": "https://www.nps.gov/bith/planyourvisit/paddling-trails.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Village Creek Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/",
        "provider": "local"
      },
      {
        "label": "NPS Paddling Trails - Village Creek",
        "url": "https://www.nps.gov/bith/planyourvisit/paddling-trails.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Baby Galvez Road Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-baby-galvez-road-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "NPS US 96 Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-us-96-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "TPWD Analysis of Texas Waterways - Village Creek",
        "url": "https://tpwd.texas.gov/publications/pwdpubs/pwd_rp_t3200_1047/11_e_tx_village_creek.phtml",
        "provider": "local"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08041500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "village-creek-sh327-us-96",
    "slug": "village-creek-sh327-us-96",
    "name": "Village Creek",
    "reach": "TX 327 Boat Launch to US 96 Boat Launch",
    "aliases": [
      "Village Creek - TX 327 to US 96",
      "Village Creek - SH 327 to Lumberton",
      "Middle Village Creek long day"
    ],
    "state": "Texas",
    "region": "East Texas",
    "summary": "Longer middle-corridor Village Creek float from TX 327 to the public US 96 launch near Lumberton. NPS keeps both launches live, TPWD still documents the access chain, and the direct Kountze gauge remains the same conservative condition check.",
    "statusText": "Use the Village Creek near Kountze gauge. Around 200 cfs is the conservative low-water floor for TX 327 to US 96. No route-specific upper cfs band is claimed; this longer middle corridor gets slower and woodier near the floor and markedly swifter after heavy rain.",
    "latitude": 30.346944,
    "longitude": -94.239385,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This route can still feel mellow at ordinary levels, but Village Creek has no dams moderating runoff and can become deceptively fast after rain.",
        "Expect snags, overhanging trees, logjams, and sandbars, especially late in dry spells or after storms shift wood into the channel.",
        "Stay with the named public launches and legal stream corridor. Baby Galvez is the clean midpoint bailout if conditions, heat, or group pace stop matching the plan."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08041500",
      "provider": "usgs",
      "siteId": "08041500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Village Ck nr Kountze, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows five-level Village Creek / Kountze gauge table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This route can work year-round, but about ten and a half miles of creek makes heat, insects, and rain-driven current more relevant than on the short starter segments.",
      "difficulty": "easy",
      "difficultyNotes": "The water is usually easy flatwater, but this is a real half-day to full-day route. Low water can add dragging and wood dodging, while high water removes the beginner feel quickly.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: NPS publishes exact coordinates for the TX 327, Baby Galvez, and US 96 public launches, TPWD still keeps the Village Creek paddling-trail package live, USGS 08041500 is the direct same-creek gauge, and the legacy Texas River Flows table still provides a usable 200 cfs minimum. TPWD's segment table currently lists TX 327 to Baby Galvez at 3.37 miles while the NPS trail summary rounds that middle segment shorter; Paddle Today uses the more specific TPWD segment table for route mileage and keeps the route minimum-only rather than claiming a stronger range."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 08041500 at 227 cfs / 3.68 ft",
        "note": "USGS Water Services returned same-day July 13, 2026 discharge and stage values for Village Creek near Kountze, confirming the direct live gauge path used for this route.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08041500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "The Texas River Flows five-level table lists Village Creek at the Kountze gauge with a first-tier 200 cfs minimum, defined as the minimum water available for floating. Paddle Today uses only that conservative floor and does not infer an ideal or upper scoring band.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Official route shape",
        "value": "TX 327 to US 96, about 10.5 mi",
        "note": "Current TPWD trail material lists TX 327 to Baby Galvez Road at 3.37 miles and Baby Galvez Road to US 96 at 7.1 miles, which together support this longer middle-corridor continuation.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/"
      },
      {
        "label": "Exact public launch coordinates",
        "value": "30.346944, -94.239385 to 30.28570, -94.19145",
        "note": "NPS publishes the TX 327 and US 96 boat launches as named public endpoints with current GPS coordinates and launch descriptions.",
        "sourceUrl": "https://www.nps.gov/places/village-creek-us-96-boat-launch.htm"
      },
      {
        "label": "Intermediate public bailout",
        "value": "Baby Galvez at about 3.4 mi",
        "note": "NPS and TPWD both keep Baby Galvez in the middle of the public access chain, giving the route a clear reassessment and early take-out option before the lower continuation to US 96.",
        "sourceUrl": "https://www.nps.gov/places/village-creek-baby-galvez-road-boat-launch.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Village Creek Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/",
        "provider": "local"
      },
      {
        "label": "NPS Paddling Trails - Village Creek",
        "url": "https://www.nps.gov/bith/planyourvisit/paddling-trails.htm",
        "provider": "nps"
      },
      {
        "label": "NPS TX 327 Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-tx-327-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Baby Galvez Road Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-baby-galvez-road-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "NPS US 96 Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-us-96-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08041500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "village-creek-us-96-state-park",
    "slug": "village-creek-us-96-state-park",
    "name": "Village Creek",
    "reach": "US 96 Boat Launch to Village Creek State Park canoe launch",
    "aliases": [
      "Village Creek - US 96 to Village Creek State Park",
      "Village Creek - Lumberton to Village Creek State Park",
      "Lower Village Creek State Park segment"
    ],
    "state": "Texas",
    "region": "East Texas",
    "summary": "Short lower Village Creek finish from the public US 96 launch to Village Creek State Park. NPS and TPWD still document the access pair, and the same direct Kountze USGS gauge anchors a conservative flow check before you commit.",
    "statusText": "Use the Village Creek near Kountze gauge. Around 200 cfs is the conservative low-water floor for US 96 to Village Creek State Park. No route-specific upper cfs band is claimed; flooding can affect the state-park launch and higher water can turn the quiet park finish much faster.",
    "latitude": 30.2857,
    "longitude": -94.19145,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Village Creek remains a free-flowing flood-responsive stream all the way to the state-park launch, so easy scenery is not a substitute for a same-day water-level call.",
        "Expect logs, snags, sandbars, and changing launch conditions after storms or floods. The state-park canoe launch can be affected by flooding.",
        "Use only the named public launches, respect private banks, and remember that alligators live in this lower corridor even though conflicts are uncommon when paddlers give wildlife space."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08041500",
      "provider": "usgs",
      "siteId": "08041500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Village Ck nr Kountze, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows five-level Village Creek / Kountze gauge table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This short downstream segment can work much of the year, but flood-sensitive access, heat, insects, and rain-driven current still matter.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short easy paddle between two public launches, but low water can still expose sandbars and wood, and high water can change the feel and access logistics quickly.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: NPS publishes the US 96 launch as a named public access and ties it directly to Village Creek State Park 3.2 miles downstream, TPWD publishes the state-park canoe-launch coordinate and campground logistics, USGS 08041500 remains the direct same-creek gauge, and the legacy Texas River Flows table still provides a usable 200 cfs minimum. Confidence stays intentionally conservative because the threshold floor comes from a legacy multi-level table rather than a modern manager-published route band, so the route ships minimum-only and does not claim an upper scoring range."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 08041500 at 287 cfs / 4.14 ft",
        "note": "USGS Water Services returned same-day July 11, 2026 discharge and stage values for Village Creek near Kountze, confirming the direct live gauge path used for this route.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08041500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "The Texas River Flows five-level table lists Village Creek at the Kountze gauge with a first-tier 200 cfs minimum, defined as the minimum water available for floating. Paddle Today uses only that conservative floor and does not infer an ideal or upper scoring band.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Official route shape",
        "value": "US 96 to Village Creek State Park, 3.2 mi",
        "note": "Current TPWD and NPS Village Creek trail pages identify US 96 to Village Creek State Park as the lower trail segment in the public access chain.",
        "sourceUrl": "https://www.nps.gov/bith/planyourvisit/paddling-trails.htm"
      },
      {
        "label": "Exact public launch coordinates",
        "value": "30.28570, -94.19145 to 30.2553, -94.1710",
        "note": "NPS publishes the US 96 launch coordinate, and TPWD's current state-park trails information publishes the canoe-launch coordinate inside Village Creek State Park.",
        "sourceUrl": "https://tpwd.texas.gov/state-parks/village-creek/trails-info"
      },
      {
        "label": "Endpoint campground support",
        "value": "Village Creek State Park campsites and cabin at take-out",
        "note": "TPWD says the park has tent and RV campsites, a cabin, and direct access to the Village Creek paddling trail from the canoe launch.",
        "sourceUrl": "https://tpwd.texas.gov/state-parks/village-creek"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Village Creek Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/",
        "provider": "local"
      },
      {
        "label": "TPWD Village Creek State Park",
        "url": "https://tpwd.texas.gov/state-parks/village-creek",
        "provider": "local"
      },
      {
        "label": "TPWD Village Creek State Park trails info",
        "url": "https://tpwd.texas.gov/state-parks/village-creek/trails-info",
        "provider": "local"
      },
      {
        "label": "NPS Paddling Trails - Village Creek",
        "url": "https://www.nps.gov/bith/planyourvisit/paddling-trails.htm",
        "provider": "nps"
      },
      {
        "label": "NPS US 96 Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-us-96-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08041500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "village-creek-baby-galvez-state-park",
    "slug": "village-creek-baby-galvez-state-park",
    "name": "Village Creek",
    "reach": "Baby Galvez Road Boat Launch to Village Creek State Park canoe launch",
    "aliases": [
      "Village Creek - Baby Galvez to Village Creek State Park",
      "Village Creek - lower Big Thicket continuation",
      "Village Creek - Baby Galvez to state park"
    ],
    "state": "Texas",
    "region": "East Texas",
    "summary": "Longer lower Village Creek day from Baby Galvez Road to Village Creek State Park. TPWD and NPS still document the lower public access chain, and the same direct Kountze USGS gauge anchors a conservative same-day flow check before you commit.",
    "statusText": "Use the Village Creek near Kountze gauge. Around 200 cfs is the conservative low-water floor for Baby Galvez to Village Creek State Park. No route-specific upper cfs band is claimed; flooding can affect the state-park launch and higher water can turn this longer lower corridor much faster.",
    "latitude": 30.3345,
    "longitude": -94.20391,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Village Creek remains a free-flowing flood-responsive stream all the way to the state-park launch, so a calm-looking lower corridor is not a substitute for a same-day water-level call.",
        "Expect logs, snags, sandbars, and changing launch conditions after storms or floods. The state-park canoe launch can be affected by flooding.",
        "Use only the named public launches, respect private banks, and remember that alligators live in this lower corridor even though conflicts are uncommon when paddlers give wildlife space."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08041500",
      "provider": "usgs",
      "siteId": "08041500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Village Ck nr Kountze, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows five-level Village Creek / Kountze gauge table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This lower continuation can work year-round, but ten-plus miles, heat, insects, and flood-sensitive park access matter more here than on the short final segment.",
      "difficulty": "easy",
      "difficultyNotes": "This is usually easy flatwater between public launches, but the longer mileage, flood-sensitive finish, and wildlife context make it a more committed day than the short US 96 to state-park run.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD and NPS still keep the lower Village Creek access chain live, NPS publishes the Baby Galvez public launch coordinate, TPWD publishes the Village Creek State Park canoe-launch coordinate and campground logistics, USGS 08041500 remains the direct same-creek gauge, and the legacy Texas River Flows table still provides a usable 200 cfs minimum. Confidence stays intentionally conservative because the threshold floor comes from a legacy multi-level table rather than a modern manager-published route band, so the route ships minimum-only and does not claim an upper scoring range."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 08041500 at 227 cfs / 3.68 ft",
        "note": "USGS Water Services returned same-day July 13, 2026 discharge and stage values for Village Creek near Kountze, confirming the direct live gauge path used for this route.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08041500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "The Texas River Flows five-level table lists Village Creek at the Kountze gauge with a first-tier 200 cfs minimum, defined as the minimum water available for floating. Paddle Today uses only that conservative floor and does not infer an ideal or upper scoring band.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Official route shape",
        "value": "Baby Galvez Rd to Village Creek State Park, about 10.3 mi",
        "note": "Current TPWD and NPS Village Creek trail pages identify Baby Galvez Road to US 96 as 7.1 miles and US 96 to Village Creek State Park as 3.2 miles, which together support this longer lower continuation.",
        "sourceUrl": "https://www.nps.gov/bith/planyourvisit/paddling-trails.htm"
      },
      {
        "label": "Exact public launch coordinates",
        "value": "30.33450, -94.20391 to 30.2553, -94.1710",
        "note": "NPS publishes the Baby Galvez Road launch coordinate, and TPWD's current state-park trails information publishes the canoe-launch coordinate inside Village Creek State Park.",
        "sourceUrl": "https://tpwd.texas.gov/state-parks/village-creek/trails-info"
      },
      {
        "label": "Endpoint campground support",
        "value": "Village Creek State Park campsites and cabin at take-out",
        "note": "TPWD says the park has tent and RV campsites, a cabin, and direct access to the Village Creek paddling trail from the canoe launch.",
        "sourceUrl": "https://tpwd.texas.gov/state-parks/village-creek"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Village Creek Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/",
        "provider": "local"
      },
      {
        "label": "TPWD Village Creek State Park",
        "url": "https://tpwd.texas.gov/state-parks/village-creek",
        "provider": "local"
      },
      {
        "label": "TPWD Village Creek State Park trails info",
        "url": "https://tpwd.texas.gov/state-parks/village-creek/trails-info",
        "provider": "local"
      },
      {
        "label": "NPS Paddling Trails - Village Creek",
        "url": "https://www.nps.gov/bith/planyourvisit/paddling-trails.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Baby Galvez Road Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-baby-galvez-road-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "NPS US 96 Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-us-96-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08041500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "village-creek-fm418-state-park",
    "slug": "village-creek-fm418-state-park",
    "name": "Village Creek",
    "reach": "FM 418 Boat Launch to Village Creek State Park canoe launch",
    "aliases": [
      "Village Creek - FM 418 to Village Creek State Park",
      "Full Village Creek Paddling Trail",
      "Village Creek overnight route"
    ],
    "state": "Texas",
    "region": "East Texas",
    "summary": "Complete Village Creek trail from FM 418 to Village Creek State Park. TPWD still documents the full 20.9-mile route and the entire public access chain, and the Kountze USGS gauge gives a direct same-creek condition check before a long day or overnight.",
    "statusText": "Use the Village Creek near Kountze gauge. Around 200 cfs is the conservative low-water floor for the full FM 418 to Village Creek State Park route. No route-specific upper cfs band is claimed; stage below about 3 ft exposes more sandbars and logs, while 10+ ft can turn a long flatwater outing into a fast, hazardous commitment.",
    "latitude": 30.3978,
    "longitude": -94.2647,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Village Creek is free-flowing and unrestrained by dams. Heavy rain and high water can create deceptively swift current on a route that often feels easy at normal levels.",
        "Expect snags, logjams, overhanging limbs, and sandbars, especially when the creek is low or after storms move wood into the channel.",
        "Use only the named public launches, respect Big Thicket and private-bank limits, and remember that alligators live in the lower corridor even though TPWD says they are rarely seen in the cooler creek itself."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08041500",
      "provider": "usgs",
      "siteId": "08041500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Village Ck nr Kountze, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Texas River Flows five-level Village Creek / Kountze gauge table",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This route can work year-round, but it is long enough that heat, insects, and rain-driven current matter more than on the short splits. Treat storms and rising water conservatively.",
      "difficulty": "moderate",
      "difficultyNotes": "The water is usually easy flatwater, but 20.9 miles is too long for most one-day groups. Plan it as a strong all-day push or an overnight with a legal camping plan, and expect extra judgment at low water, in heat, or after rain.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD currently documents the full 20.9-mile Village Creek trail, all five public access coordinates, overnight-permit context, water-quality and hazard notes, and the preserve/private-boundary rules; TPWD state-park pages publish the take-out canoe-launch coordinate and campground logistics; USGS 08041500 remains the direct same-creek gauge; and the historic Texas River Flows table ties a 200 cfs minimum to that same Kountze gauge. Confidence stays intentionally conservative because the threshold floor comes from a legacy multi-level table rather than a modern manager-published exact-route band, so the route ships minimum-only and does not claim an upper scoring range."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 08041500 at 219 cfs / 3.65 ft",
        "note": "USGS Water Services returned same-day July 3, 2026 discharge and stage values for Village Creek near Kountze, confirming the direct live gauge path used for this route.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "The Texas River Flows five-level table lists Village Creek at the Kountze gauge with a first-tier 200 cfs minimum, defined as the minimum water available for floating. Paddle Today uses only that conservative floor and does not infer an ideal or upper scoring band.",
        "sourceUrl": "https://theworld.com/~reichert/riverflo.htm"
      },
      {
        "label": "Official route shape",
        "value": "FM 418 to Village Creek State Park, about 20.9 mi",
        "note": "Current TPWD trail material describes the full Village Creek trail as about 20.9 miles, says the entire trail is too long to paddle in one day, and publishes the adjacent segment mileages within the same access chain.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/"
      },
      {
        "label": "Exact public launch coordinates",
        "value": "30.3978, -94.2647 to 30.2553, -94.1710",
        "note": "TPWD publishes the FM 418 access coordinate on the main trail page, and TPWD's current Village Creek State Park trails page publishes the canoe-launch coordinate at the downstream finish.",
        "sourceUrl": "https://tpwd.texas.gov/state-parks/village-creek/trails-info"
      },
      {
        "label": "Overnight and endpoint camping support",
        "value": "Free preserve overnight permits plus Village Creek State Park camping",
        "note": "TPWD says the entire trail is too long to paddle in one day and that overnight camping permits are free at the Big Thicket National Preserve Visitor Center, while Village Creek State Park offers tent and RV campsites plus a cabin at the take-out.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Village Creek Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/",
        "provider": "local"
      },
      {
        "label": "TPWD Village Creek State Park",
        "url": "https://tpwd.texas.gov/state-parks/village-creek",
        "provider": "local"
      },
      {
        "label": "TPWD Village Creek State Park trails info",
        "url": "https://tpwd.texas.gov/state-parks/village-creek/trails-info",
        "provider": "local"
      },
      {
        "label": "NPS Paddling Trails - Village Creek",
        "url": "https://www.nps.gov/bith/planyourvisit/paddling-trails.htm",
        "provider": "nps"
      },
      {
        "label": "NPS FM 418 Boat Launch",
        "url": "https://www.nps.gov/places/village-creek-fm-418-boat-launch.htm",
        "provider": "nps"
      },
      {
        "label": "Texas River Flows for 5 Levels of Paddling",
        "url": "https://theworld.com/~reichert/riverflo.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08041500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08041500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "south-llano-river-cupgrass-state-park",
    "slug": "south-llano-river-cupgrass-state-park",
    "name": "South Llano River",
    "reach": "Cupgrass Access to South Llano River State Park",
    "aliases": [
      "South Llano River - Cupgrass to State Park",
      "South Llano River near Junction",
      "TPWD Cupgrass to South Llano River State Park"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "summary": "Spring-fed Hill Country float from the TPWD Cupgrass lease site to South Llano River State Park. TPWD publishes the exact public access pair and 9.3-mile route shape, while the Junction gauge offers direct same-day flow support for a conservative minimum-only model.",
    "statusText": "Use the South Llano gauge at Flat Rock Lane near Junction. Treat 65 cfs as the conservative community floor, and expect a better glide above roughly 100 cfs. TPWD says the South Llano averages around 75 cfs and paddles best when it is on a slight rise.",
    "latitude": 30.393543,
    "longitude": -99.886693,
    "gaugeSource": {
      "id": "usgs-08149900",
      "provider": "usgs",
      "siteId": "08149900",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "S Llano Rv at Flat Rock Ln at Junction, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/08149900/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Low water exposes shallow riffles, scrape spots, and wood that are easier to read from the boat when the gauge is comfortably above the conservative floor.",
        "TPWD warns that heavy rains and high water can create dangerous conditions on this otherwise gentle corridor.",
        "Respect private property and use only the named TPWD access sites, direct portage paths, and the designated state-park landing."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 65,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association South Llano overview",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The South Llano is one of the more reliable spring-fed Texas runs and can work year-round when weather and gauge conditions cooperate. Even so, shallow riffles appear sooner near the 65 cfs floor, while storms can raise the current quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "The current is generally gentle, but this is still a 9.3-mile moving-water day with shallow riffles, line choice around wood, bright sun exposure, and a public-park finish that deserves some planning.",
      "confidenceNotes": "Confidence is good for a conservative add: TPWD publishes the exact Cupgrass coordinates, the 9.3-mile distance to South Llano River State Park, the park access coordinates, and current gauge linkage to USGS 08149900. Same-day direct USGS Water Services returned 51.6 cfs and 2.14 ft on July 11, 2026, while flow guidance remains weaker than the access package, so the route ships with a minimum-only model that uses the conservative 65 cfs floor from Texas paddling-community references and TPWD's older note that the South Llano averages about 75 cfs and is best on a slight rise."
    },
    "evidenceNotes": [
      {
        "label": "Published flow guidance",
        "value": "65 cfs minimum; 100-500 cfs broader ideal",
        "note": "Texas Rivers Protection Association summarizes the South Llano with a 65 cfs minimum and 100-500 cfs ideal band at the Junction gauge.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Official flow context",
        "value": "Spring-fed river averaging about 75 cfs",
        "note": "TPWD's Texas waterway analysis says the South Llano has a healthy flow averaging around 75 cfs and that the best recreation conditions come when rain is abundant and the river is on a slight rise.",
        "sourceUrl": "https://tpwd.texas.gov/publications/pwdpubs/pwd_rp_t3200_1047/20_c_tx_llano.phtml"
      },
      {
        "label": "Official route segment",
        "value": "Cupgrass to South Llano River State Park, about 9.3 mi",
        "note": "The TPWD Cupgrass access page says a paddle from the lease site down to South Llano State Park is about 9.3 river miles.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/south_llano_cupgrass.phtml"
      },
      {
        "label": "Put-in access",
        "value": "Cupgrass Access, 30.393543, -99.886693",
        "note": "TPWD publishes Cupgrass coordinates and says paddlers launch through Bailey Creek after reserving parking by text.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/south_llano_cupgrass.phtml"
      },
      {
        "label": "Take-out access",
        "value": "South Llano River State Park, 30.4498, -99.8128",
        "note": "The TPWD South Llano Paddling Trail page identifies the state-park access point and the state-park page confirms camping and day-use reservation context at the finish.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 08149900 at 51.6 cfs / 2.14 ft",
        "note": "USGS Water Services returned same-day values for S Llano River at Flat Rock Lane at Junction, TX at 2026-07-11 09:55 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08149900&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Shallow riffles, strainers, high-water rises, private banks",
        "note": "TPWD says the trail includes quiet pools, gentle riffles, and runs, warns about snags at low water, and says heavy rain and high water can create dangerous conditions.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Cupgrass access",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/south_llano_cupgrass.phtml",
        "provider": "local"
      },
      {
        "label": "TPWD South Llano paddling trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/",
        "provider": "local"
      },
      {
        "label": "TPWD South Llano River State Park",
        "url": "https://tpwd.texas.gov/state-parks/south-llano-river",
        "provider": "local"
      },
      {
        "label": "TPWD Texas waterway analysis for the Llano",
        "url": "https://tpwd.texas.gov/publications/pwdpubs/pwd_rp_t3200_1047/20_c_tx_llano.phtml",
        "provider": "local"
      },
      {
        "label": "Texas Rivers Protection Association South Llano overview",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      {
        "label": "USGS 08149900 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/08149900/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08149900 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08149900&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "south-llano-river-state-park-flatrock-lane",
    "slug": "south-llano-river-state-park-flatrock-lane",
    "name": "South Llano River",
    "reach": "South Llano River State Park to Flatrock Lane Crossing",
    "aliases": [
      "South Llano River - State Park to Flatrock",
      "South Llano Paddling Trail upper split",
      "TPWD South Llano River SP to Flatrock Lane"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "summary": "Shorter South Llano paddling-trail split from South Llano River State Park to Flatrock Lane Crossing. TPWD publishes the exact access pair, the 4.7-mile route length, and the state-park logistics that make this a conservative half-day add.",
    "statusText": "Use the South Llano gauge at Flat Rock Lane near Junction. Treat 65 cfs as the conservative floor and expect a cleaner ride above roughly 100 cfs. At low water, the biggest issue is scraping through riffles and weaving around woody edges.",
    "latitude": 30.4498,
    "longitude": -99.8128,
    "gaugeSource": {
      "id": "usgs-08149900",
      "provider": "usgs",
      "siteId": "08149900",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "S Llano Rv at Flat Rock Ln at Junction, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/08149900/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD says paddlers at South Llano River State Park must use the designated landing and portage around the damaged bridge area before reentering downstream.",
        "Below the portage, expect shallow riffles and occasional snags, especially when the gauge is near the conservative floor.",
        "Heavy rain can raise this spring-fed river quickly enough to turn a casual half-day float into a fast current check."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 65,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association South Llano overview",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This short state-park segment can work most of the year, but it still feels bony near the 65 cfs floor and more pushy after storms. Warm-season day use is easiest because the route is short and the park services are fully active.",
      "difficulty": "easy",
      "difficultyNotes": "This is a gentle moving-water float, not a whitewater run, but the start requires a manager-directed bridge portage and the riffles still reward basic boat control.",
      "confidenceNotes": "Confidence is good for a conservative add: TPWD publishes the state-park and Flatrock coordinates, the 4.7-mile subsegment length, and the safety note that paddlers must exit and portage around the damaged bridge area. Same-day direct USGS Water Services returned 51.6 cfs and 2.14 ft on July 11, 2026, while the numeric flow ladder remains community-sourced rather than manager-published, so the route keeps a minimum-only model."
    },
    "evidenceNotes": [
      {
        "label": "Published flow guidance",
        "value": "65 cfs minimum; 100-500 cfs broader ideal",
        "note": "Texas Rivers Protection Association summarizes the South Llano with a 65 cfs minimum and 100-500 cfs ideal band at the Junction gauge.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Official route segment",
        "value": "State Park to Flatrock Lane, 4.7 mi",
        "note": "TPWD lists South Llano River State Park to Flatrock Lane Crossing as a 4.7-mile alternate split of the South Llano Paddling Trail.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      },
      {
        "label": "Put-in access",
        "value": "South Llano River State Park, 30.4498, -99.8128",
        "note": "The TPWD paddling-trail page identifies the state-park trail access point, and the state-park page says the park has one designated place for paddlers to park and put in.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      },
      {
        "label": "Take-out access",
        "value": "Flatrock Lane Crossing, 30.4789, -99.7778",
        "note": "TPWD identifies Flatrock Lane Crossing as a named paddling-trail access point with published coordinates.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      },
      {
        "label": "Bridge portage",
        "value": "Mandatory state-park bridge portage",
        "note": "TPWD says paddlers must exit the river at the designated location prior to the bridge at South Llano River State Park and portage around the bridge before reentering downstream.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 08149900 at 51.6 cfs / 2.14 ft",
        "note": "USGS Water Services returned same-day values for S Llano River at Flat Rock Lane at Junction, TX at 2026-07-11 09:55 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08149900&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD South Llano paddling trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/",
        "provider": "local"
      },
      {
        "label": "TPWD South Llano River State Park",
        "url": "https://tpwd.texas.gov/state-parks/south-llano-river",
        "provider": "local"
      },
      {
        "label": "Texas Rivers Protection Association South Llano overview",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      {
        "label": "USGS 08149900 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/08149900/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08149900 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08149900&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "south-llano-river-flatrock-lane-junction-city-park",
    "slug": "south-llano-river-flatrock-lane-junction-city-park",
    "name": "South Llano River",
    "reach": "Flatrock Lane Crossing to Junction City Park",
    "aliases": [
      "South Llano River - Flatrock to Junction City Park",
      "South Llano Paddling Trail lower split",
      "TPWD Flatrock Lane to Junction City Park"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "summary": "Very short downstream South Llano paddling-trail connector from Flatrock Lane Crossing to Junction City Park. TPWD publishes the exact public access pair and 1.6-mile route shape, making this the easiest way to ship a short official Junction-area option beyond the state-park split.",
    "statusText": "Use the South Llano gauge at Flat Rock Lane near Junction. Treat 65 cfs as the conservative floor, with a cleaner glide above roughly 100 cfs. This one-hour segment is still a moving river, so wood and post-rain current matter more than the mileage suggests.",
    "latitude": 30.4789,
    "longitude": -99.7778,
    "gaugeSource": {
      "id": "usgs-08149900",
      "provider": "usgs",
      "siteId": "08149900",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "S Llano Rv at Flat Rock Ln at Junction, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/08149900/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a short route, but TPWD still warns that snags become more annoying at low water and that heavy rain can make the river dangerous.",
        "Use the named public access points and do not treat nearby private banks as casual rest stops.",
        "Treat the Junction City Park finish as the planned exit instead of drifting toward other banks or bridge edges near town."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 65,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association South Llano overview",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This short town-edge connector can work in most seasons when the gauge is not scraping at the floor or surging after rain. Because the mileage is low, it works best as a quick outing or as part of a basecamp weekend.",
      "difficulty": "easy",
      "difficultyNotes": "Quiet pools and easy riffles keep the route approachable, but it is still moving water with occasional wood and changing current after storms.",
      "confidenceNotes": "Confidence is good for a conservative add: TPWD publishes the exact Flatrock and Junction City Park coordinates, the 1.6-mile split distance, and the route-level cautions about snags, private property, and dangerous high water. Same-day direct USGS Water Services returned 51.6 cfs and 2.14 ft on July 11, 2026, while the numeric floor remains community-sourced rather than agency-published."
    },
    "evidenceNotes": [
      {
        "label": "Published flow guidance",
        "value": "65 cfs minimum; 100-500 cfs broader ideal",
        "note": "Texas Rivers Protection Association summarizes the South Llano with a 65 cfs minimum and 100-500 cfs ideal band at the Junction gauge.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Official route segment",
        "value": "Flatrock Lane to Junction City Park, 1.6 mi",
        "note": "TPWD lists Flatrock Lane Crossing to Junction City Park as a 1.6-mile alternate split of the South Llano Paddling Trail.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      },
      {
        "label": "Put-in access",
        "value": "Flatrock Lane Crossing, 30.4789, -99.7778",
        "note": "TPWD identifies Flatrock Lane Crossing as a named paddling-trail access point with published coordinates.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      },
      {
        "label": "Take-out access",
        "value": "Junction City Park, 30.4879, -99.7617",
        "note": "TPWD identifies Junction City Park as a named paddling-trail access point with published coordinates.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      },
      {
        "label": "Official trail cautions",
        "value": "Low-water snags; dangerous high water",
        "note": "TPWD says the trail has quiet pools, riffles, and runs, warns about snags at low water, and says heavy rains and high water can create dangerous conditions.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 08149900 at 51.6 cfs / 2.14 ft",
        "note": "USGS Water Services returned same-day values for S Llano River at Flat Rock Lane at Junction, TX at 2026-07-11 09:55 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08149900&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD South Llano paddling trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/",
        "provider": "local"
      },
      {
        "label": "Texas Rivers Protection Association South Llano overview",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      {
        "label": "USGS 08149900 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/08149900/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08149900 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08149900&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "south-llano-river-state-park-junction-city-park",
    "slug": "south-llano-river-state-park-junction-city-park",
    "name": "South Llano River",
    "reach": "South Llano River State Park to Junction City Park",
    "aliases": [
      "South Llano River - State Park to Junction City Park",
      "Full official South Llano paddling trail",
      "TPWD South Llano River SP to Junction City Park"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "summary": "Full official South Llano paddling trail from South Llano River State Park to Junction City Park. TPWD publishes the exact 6.3-mile route, the Flatrock alternate midpoint, and the bridge-portage rule that controls the start of the run.",
    "statusText": "Use the South Llano gauge at Flat Rock Lane near Junction. Treat 65 cfs as the conservative floor and expect a cleaner ride above roughly 100 cfs. This route is the full TPWD state-park-to-town trail and includes the required bridge portage at the start.",
    "latitude": 30.4498,
    "longitude": -99.8128,
    "gaugeSource": {
      "id": "usgs-08149900",
      "provider": "usgs",
      "siteId": "08149900",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "S Llano Rv at Flat Rock Ln at Junction, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/08149900/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD says paddlers must exit before the damaged bridge inside South Llano River State Park, portage around the closure, and reenter downstream.",
        "Below the portage, expect shallow riffles and occasional wood, especially when the gauge is near the conservative floor.",
        "Use Junction City Park as the planned public finish and avoid treating nearby private banks as casual take-outs."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 65,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association South Llano overview",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This official trail can work in most seasons when the Flat Rock gauge is not scraping at the floor or surging after rain. Warm-season day use is easiest because the route is long enough to feel real while still fitting a half-day shuttle from the park.",
      "difficulty": "easy",
      "difficultyNotes": "The river is gentle overall, but this remains moving water with a required manager-directed portage, low-water scraping, and post-rain current changes that deserve attention.",
      "confidenceNotes": "Confidence is good for a conservative add: TPWD publishes South Llano River State Park and Junction City Park as the full 6.3-mile paddling trail, gives exact coordinates for both endpoints, and requires a source-backed portage around the damaged bridge in the park. Same-day direct USGS data was available at the Flat Rock Lane gauge, but the numeric flow ladder remains community-sourced, so the route keeps a minimum-only model."
    },
    "evidenceNotes": [
      {
        "label": "Published flow guidance",
        "value": "65 cfs minimum; 100-500 cfs broader ideal",
        "note": "Texas Rivers Protection Association summarizes the South Llano with a 65 cfs minimum and 100-500 cfs ideal band at the Junction gauge.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Official route segment",
        "value": "State Park to Junction City Park, 6.3 mi",
        "note": "TPWD lists the South Llano River State Park to Junction City Park trail as 6.3 miles and names Flatrock Lane as the midpoint alternate access.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      },
      {
        "label": "Put-in access",
        "value": "South Llano River State Park, 30.4498, -99.8128",
        "note": "The TPWD paddling-trail page identifies the state-park access point, and the state-park page says there is one designated place for paddlers to park and put in.",
        "sourceUrl": "https://tpwd.texas.gov/state-parks/south-llano-river"
      },
      {
        "label": "Take-out access",
        "value": "Junction City Park, 30.4879, -99.7617",
        "note": "TPWD identifies Junction City Park as the downstream public access point with published coordinates.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      },
      {
        "label": "Mandatory portage",
        "value": "State-park bridge portage required",
        "note": "TPWD says all kayaks, canoes, and tubes must exit before the damaged bridge at South Llano River State Park and portage around it before reentering downstream.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 08149900 at 75.8 cfs / 2.25 ft",
        "note": "USGS Water Services returned same-day values for S Llano River at Flat Rock Ln at Junction, TX at 2026-06-26 08:40 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08149900&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD South Llano paddling trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/",
        "provider": "local"
      },
      {
        "label": "TPWD South Llano River State Park",
        "url": "https://tpwd.texas.gov/state-parks/south-llano-river",
        "provider": "local"
      },
      {
        "label": "Texas Rivers Protection Association South Llano overview",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      {
        "label": "USGS 08149900 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/08149900/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08149900 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08149900&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "south-llano-river-cupgrass-junction-city-park",
    "slug": "south-llano-river-cupgrass-junction-city-park",
    "name": "South Llano River",
    "reach": "Cupgrass Access to Junction City Park",
    "aliases": [
      "South Llano River - Cupgrass to Junction City Park",
      "Longest lower South Llano day run",
      "TPWD Cupgrass to Junction City Park"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "summary": "Longest current public South Llano continuation from TPWD Cupgrass Access to Junction City Park. TPWD publishes the Cupgrass-to-state-park mileage and the full 6.3-mile state-park-to-town trail, so the route can be chained with explicit midpoint portage guidance instead of guessed map math.",
    "statusText": "Use the South Llano gauge at Flat Rock Lane near Junction. Treat 65 cfs as the conservative floor and expect a better glide above roughly 100 cfs. This is the longest South Llano day route in the app and it includes the required bridge portage in the state park.",
    "latitude": 30.393543,
    "longitude": -99.886693,
    "gaugeSource": {
      "id": "usgs-08149900",
      "provider": "usgs",
      "siteId": "08149900",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "S Llano Rv at Flat Rock Ln at Junction, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/08149900/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD says paddlers must exit before the damaged bridge inside South Llano River State Park, portage around the closure, and reenter downstream.",
        "This longer chain adds more mileage, sun exposure, and fewer convenient public exits than the short official splits, so low-water scraping and fatigue matter more here.",
        "Heavy rain can raise the river quickly, and the intended public finish is Junction City Park rather than improvised banks near town."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 65,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association South Llano overview",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "This long South Llano day route can work year-round when weather and gauge conditions cooperate, but it is most realistic in seasons with manageable heat and enough flow to reduce dragging. After storms, the same gentle spring-fed corridor can speed up quickly enough to deserve a harder same-day decision.",
      "difficulty": "moderate",
      "difficultyNotes": "The river is mostly gentle, but the longer mileage, mandatory midpoint portage, and fewer practical bailout points make this a more committed day than the shorter state-park or Junction-area options.",
      "confidenceNotes": "Confidence is good for a conservative chained add: TPWD publishes Cupgrass to South Llano River State Park as about 9.3 miles and South Llano River State Park to Junction City Park as 6.3 miles, while also naming the exact public endpoints and the required state-park bridge portage. Same-day direct USGS values were available at the Flat Rock Lane gauge, but the numeric floor remains community-sourced, so the route keeps a minimum-only model."
    },
    "evidenceNotes": [
      {
        "label": "Published flow guidance",
        "value": "65 cfs minimum; 100-500 cfs broader ideal",
        "note": "Texas Rivers Protection Association summarizes the South Llano with a 65 cfs minimum and 100-500 cfs ideal band at the Junction gauge.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/south-llano/"
      },
      {
        "label": "Official chained route",
        "value": "Cupgrass to State Park about 9.3 mi plus State Park to Junction City Park 6.3 mi",
        "note": "TPWD publishes the Cupgrass-to-state-park segment on the lease-access page and the full state-park-to-Junction trail on the paddling-trail page, supporting an about 15.6-mile continuation through the same official access chain.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/south_llano_cupgrass.phtml"
      },
      {
        "label": "Put-in access",
        "value": "TPWD Cupgrass Access, 30.393543, -99.886693",
        "note": "TPWD publishes Cupgrass coordinates and says paddlers launch through Bailey Creek after arranging parking by text.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/south_llano_cupgrass.phtml"
      },
      {
        "label": "Take-out access",
        "value": "Junction City Park, 30.4879, -99.7617",
        "note": "TPWD identifies Junction City Park as the downstream public access point with published coordinates.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      },
      {
        "label": "Mandatory portage",
        "value": "State-park bridge portage required",
        "note": "TPWD says all kayaks, canoes, and tubes must exit before the damaged bridge at South Llano River State Park and portage around it before reentering downstream.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 08149900 at 75.8 cfs / 2.25 ft",
        "note": "USGS Water Services returned same-day values for S Llano River at Flat Rock Ln at Junction, TX at 2026-06-26 08:40 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08149900&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Cupgrass access",
        "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/south_llano_cupgrass.phtml",
        "provider": "local"
      },
      {
        "label": "TPWD South Llano paddling trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/",
        "provider": "local"
      },
      {
        "label": "TPWD South Llano River State Park",
        "url": "https://tpwd.texas.gov/state-parks/south-llano-river",
        "provider": "local"
      },
      {
        "label": "TPWD Texas waterway analysis for the Llano",
        "url": "https://tpwd.texas.gov/publications/pwdpubs/pwd_rp_t3200_1047/20_c_tx_llano.phtml",
        "provider": "local"
      },
      {
        "label": "Texas Rivers Protection Association South Llano overview",
        "url": "https://txrivers.org/discover-texas-rivers/south-llano/",
        "provider": "local"
      },
      {
        "label": "USGS 08149900 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/08149900/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08149900 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08149900&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-bayou-highway-6-west-sam-houston",
    "slug": "buffalo-bayou-highway-6-west-sam-houston",
    "name": "Buffalo Bayou",
    "reach": "Highway 6 to West Sam Houston Parkway",
    "aliases": [
      "Buffalo Bayou Paddling Trail - Highway 6 to Beltway 8",
      "Terry Hershey Park Buffalo Bayou run",
      "Highway 6 to West Sam Houston Parkway Buffalo Bayou"
    ],
    "state": "Texas",
    "region": "Gulf Coast",
    "summary": "West Houston Buffalo Bayou day trip through Terry Hershey Park from the official Highway 6 access to West Sam Houston Parkway. TPWD publishes the access sequence and segment float times, Save Buffalo Bayou documents public parking at Highway 6, Dairy Ashford, and Beltway 8, and the Addicks USGS gauge sits inside the selected reach.",
    "statusText": "Use the Buffalo Bayou near Addicks gauge. Treat about 150 cfs as the conservative base-flow floor for this upper Buffalo Bayou segment; low water means scraping and obstruction work, while storm runoff and reservoir releases can make the bayou fast, dirty, and strainer-prone.",
    "latitude": 29.7694,
    "longitude": -95.6434,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "dam_release",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD says Buffalo Bayou is influenced by Addicks and Barker Reservoir releases, storm runoff, sewage treatment plants, and natural springs; do not attempt trips in high or turbulent water.",
        "TPWD identifies log jams and strainers as very hazardous and tells paddlers to portage around them.",
        "Save Buffalo Bayou warns that reservoir releases after storms can make the current fast and dangerous, with base flow around 150-200 cfs and flows over about 2,000 cfs for experienced paddlers only."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08073500",
      "provider": "usgs",
      "siteId": "08073500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo Bayou nr Addicks, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08073500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 150,
      "thresholdSource": {
        "label": "Save Buffalo Bayou upper access and flow guidance",
        "url": "https://www.savebuffalobayou.org/?page_id=9823",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Highway 6-to-Beltway 8 reach can be paddleable year-round at base flow, but same-day rain, reservoir releases, and visible obstructions control the decision more than season. Treat 150 cfs as a local minimum-only floor and downgrade quickly after storms, sewage or bacteria alerts, fast rises, or fresh logjams.",
      "difficulty": "moderate",
      "difficultyNotes": "The reach has little gradient, but the actual trip is an urban bayou run with rough or muddy access, changing reservoir releases, variable water quality, strainers, shallow obstructions, low bridges, and private-bank discipline.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD publishes Highway 6, Terry Hershy Park, Dairy Ashford Road, and West Sam Houston Parkway as official Buffalo Bayou Paddling Trail access points with coordinates and float-time segments; Save Buffalo Bayou corroborates public parking at Highway 6, Dairy Ashford, and Beltway 8 and gives concrete 150-200 cfs base-flow and 2,000 cfs experienced-only cues; USGS 08073500 is product-live inside the selected reach. The route ships minimum-only because the numeric threshold source is local corridor guidance rather than an agency-authored scoring band."
    },
    "evidenceNotes": [
      {
        "label": "Official access chain",
        "value": "Highway 6 to West Sam Houston Parkway",
        "note": "TPWD lists Highway 6, Terry Hershy Park, Dairy Ashford Road, and West Sam Houston Parkway as official Buffalo Bayou Paddling Trail access points with GPS coordinates and estimated segment float times.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/"
      },
      {
        "label": "Practical route shape",
        "value": "Highway 6 through Terry Hershey Park to Beltway 8",
        "note": "Save Buffalo Bayou identifies public parking at Highway 6, Dairy Ashford, and Beltway 8; Harris County says Terry Hershey Park runs along roughly six miles of Buffalo Bayou.",
        "sourceUrl": "https://www.savebuffalobayou.org/?page_id=9823"
      },
      {
        "label": "Live gauge support",
        "value": "USGS 08073500 at 106 cfs / 46.21 ft",
        "note": "USGS Water Services returned same-day Buffalo Bayou near Addicks discharge and gage height at 2026-08-10 09:15 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08073500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "150 cfs minimum-only; 2,000 cfs experienced-only caution",
        "note": "Save Buffalo Bayou describes base flow as a very low, slow current around 150-200 cfs and says storm or reservoir-release pulses over about 2,000 cfs are for experienced paddlers only.",
        "sourceUrl": "https://www.savebuffalobayou.org/?page_id=9823"
      },
      {
        "label": "Safety and water quality",
        "value": "Urban runoff, releases, strainers, and no swimming",
        "note": "TPWD says the bayou's water quality is generally unsuitable for swimming, is influenced by storm runoff and reservoir releases, and that trips should not be attempted in high and turbulent water; log jams and strainers are specifically flagged as hazardous.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "Houston Parks says camping in the city park system is permitted only at Lake Houston Wilderness Park, and Harris County publishes Terry Hershey Park as a day-use park with daily hours rather than overnight river-camping support.",
        "sourceUrl": "https://www.houstontx.gov/parks/parkrules.html"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, Save Buffalo Bayou, Commons, USGS, and same-route image review found route-context photos, including a rights-clean general Terry Hershey bayou image, but no clearly rights-clean exact Highway-6-to-Beltway-8 paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Buffalo+Bayou+Highway+6+Terry+Hershey+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Buffalo Bayou Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/",
        "provider": "local"
      },
      {
        "label": "TPWD Buffalo Bayou Paddling Trail map",
        "url": "https://tpwd.texas.gov/documents/513/Buffalo_Bayou_map.pdf",
        "provider": "local"
      },
      {
        "label": "Save Buffalo Bayou paddling guide",
        "url": "https://www.savebuffalobayou.org/?page_id=9823",
        "provider": "local"
      },
      {
        "label": "Harris County Terry Hershey Park",
        "url": "https://cp4.harriscountytx.gov/Explore/Parks/Precinct-4-Parks/terry-hershey-park",
        "provider": "local"
      },
      {
        "label": "City of Houston park rules",
        "url": "https://www.houstontx.gov/parks/parkrules.html",
        "provider": "local"
      },
      {
        "label": "USGS 08073500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08073500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08073500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08073500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-bayou-west-sam-houston-woodway",
    "slug": "buffalo-bayou-west-sam-houston-woodway",
    "name": "Buffalo Bayou",
    "reach": "West Sam Houston Parkway to Woodway Memorial Park",
    "aliases": [
      "Buffalo Bayou Paddling Trail - West Sam Houston to Woodway",
      "Beltway 8 to Woodway Buffalo Bayou",
      "West Sam Houston Parkway to Briar Bend to Woodway"
    ],
    "state": "Texas",
    "region": "Gulf Coast",
    "summary": "Long middle Buffalo Bayou connector from the official West Sam Houston Parkway access to Woodway Memorial Park, using Briar Bend Park as the practical midpoint. TPWD publishes all three access anchors and segment float times, while the Piney Point USGS gauge sits inside this reach.",
    "statusText": "Use the Buffalo Bayou at Piney Point gauge. Treat about 150 cfs as the conservative base-flow floor for this Beltway 8-to-Woodway connector; storm runoff and Addicks/Barker releases can make the bayou fast, dirty, and obstruction-prone.",
    "latitude": 29.7622,
    "longitude": -95.5583,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "dam_release",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD says Buffalo Bayou is influenced by Addicks and Barker Reservoir releases, storm runoff, sewage treatment plants, and natural springs; do not attempt trips in high or turbulent water.",
        "TPWD identifies log jams and strainers as very hazardous and tells paddlers to portage around them.",
        "Save Buffalo Bayou warns that some access points require dragging or clambering, that reservoir releases after storms can make the current fast and dangerous, and that flows over about 2,000 cfs are for experienced paddlers only."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08073700",
      "provider": "usgs",
      "siteId": "08073700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo Bayou at Piney Point, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08073700/"
    },
    "fallbackGaugeSources": [
      {
        "id": "usgs-08074000",
        "provider": "usgs",
        "siteId": "08074000",
        "metric": "discharge_cfs",
        "unit": "cfs",
        "kind": "direct",
        "siteName": "Buffalo Bayou at Houston, TX",
        "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08074000/"
      }
    ],
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 150,
      "thresholdSource": {
        "label": "Save Buffalo Bayou access and flow guidance",
        "url": "https://www.savebuffalobayou.org/?page_id=9823",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Beltway 8-to-Woodway reach can be paddleable year-round at base flow, but same-day rain, reservoir releases, and visible obstructions control the decision more than season. Treat 150 cfs as a local minimum-only floor and downgrade quickly after storms, sewage or bacteria alerts, fast rises, or fresh logjams.",
      "difficulty": "hard",
      "difficultyNotes": "TPWD's two segment estimates add up to a long day, and this middle bayou reach has rough or muddy public accesses, variable water quality, reservoir-release swings, strainers, gravel bars, and private-bank discipline. Briar Bend is the source-backed midpoint bailout.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD publishes West Sam Houston Parkway, Briar Bend Park, and Woodway Memorial Park as official Buffalo Bayou Paddling Trail access points with coordinates and float-time segments; Save Buffalo Bayou corroborates public parking at Beltway 8, describes Briar Bend and Woodway access, and gives concrete 150-200 cfs base-flow and 2,000 cfs experienced-only cues; USGS 08073700 is product-live inside the selected reach. The route ships minimum-only because the numeric threshold source is local corridor guidance rather than an agency-authored scoring band."
    },
    "evidenceNotes": [
      {
        "label": "Official access chain",
        "value": "West Sam Houston Parkway to Briar Bend Park to Woodway Memorial Park",
        "note": "TPWD lists West Sam Houston Parkway, Briar Bend Park, and Woodway Memorial Park as official Buffalo Bayou Paddling Trail access points with GPS coordinates and estimates the two downstream segments at about 6.5 to 8.5 hours combined.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/"
      },
      {
        "label": "Practical access context",
        "value": "Beltway 8 parking, Briar Bend street parking, and Woodway ramp",
        "note": "Save Buffalo Bayou identifies parking under Beltway 8, street parking at Briar Bend Park, and a public Woodway launch with a sloped ramp and mud caveat; it also warns that not all Buffalo Bayou access points are easy.",
        "sourceUrl": "https://www.savebuffalobayou.org/?page_id=9823"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08073700 at 155 cfs / 28.36 ft",
        "note": "USGS Water Services returned same-day Buffalo Bayou at Piney Point discharge and gage height at 2026-08-11 05:15 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08073700&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "150 cfs minimum-only; 2,000 cfs experienced-only caution",
        "note": "Save Buffalo Bayou describes base flow as a very low, slow current around 150-200 cfs and says storm or reservoir-release pulses over about 2,000 cfs are for experienced paddlers only.",
        "sourceUrl": "https://www.savebuffalobayou.org/?page_id=9823"
      },
      {
        "label": "Safety and water quality",
        "value": "Urban runoff, releases, strainers, and no swimming",
        "note": "TPWD says the bayou's water quality is generally unsuitable for swimming, is influenced by storm runoff and reservoir releases, and that trips should not be attempted in high and turbulent water; log jams and strainers are specifically flagged as hazardous.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "Houston Parks says camping in the city park system is permitted only at Lake Houston Wilderness Park, so this urban Buffalo Bayou connector is treated as day-use only with no inferred riverbank camping.",
        "sourceUrl": "https://www.houstontx.gov/parks/parkrules.html"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, Save Buffalo Bayou, Buffalo Bayou Partnership, Commons, USGS, and same-route image review found route-context photos and maps, but no clearly rights-clean exact West-Sam-Houston-to-Woodway paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Buffalo+Bayou+West+Sam+Houston+Woodway+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Buffalo Bayou Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/",
        "provider": "local"
      },
      {
        "label": "TPWD Buffalo Bayou Paddling Trail map",
        "url": "https://tpwd.texas.gov/documents/513/Buffalo_Bayou_map.pdf",
        "provider": "local"
      },
      {
        "label": "Save Buffalo Bayou paddling guide",
        "url": "https://www.savebuffalobayou.org/?page_id=9823",
        "provider": "local"
      },
      {
        "label": "City of Houston park rules",
        "url": "https://www.houstontx.gov/parks/parkrules.html",
        "provider": "local"
      },
      {
        "label": "USGS 08073700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08073700/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08073700 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08073700&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-bayou-woodway-sabine-street",
    "slug": "buffalo-bayou-woodway-sabine-street",
    "name": "Buffalo Bayou",
    "reach": "Woodway Memorial Park to Sabine Street",
    "aliases": [
      "Buffalo Bayou Paddling Trail - Woodway to Sabine",
      "Woodway boat launch to Sabine Street",
      "Buffalo Bayou Park urban paddle"
    ],
    "state": "Texas",
    "region": "Gulf Coast",
    "summary": "Urban Buffalo Bayou run from the official Woodway Memorial Park launch to the Sabine Street access near downtown Houston. TPWD publishes the access chain and segment float times, Save Buffalo Bayou identifies this as the practical Woodway-to-Sabine trip, and the Houston USGS gauge gives a direct same-reach flow check.",
    "statusText": "Use the Buffalo Bayou at Houston gauge. Around 150 cfs is the conservative base-flow floor for this Woodway-to-Sabine run; storm runoff and reservoir releases can make the bayou fast, dirty, and obstruction-prone, and flows over about 2,000 cfs belong to experienced paddlers only.",
    "latitude": 29.7647,
    "longitude": -95.4569,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "dam_release",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD says Buffalo Bayou is influenced by Addicks and Barker Reservoir releases, storm runoff, sewage treatment plants, and natural springs; do not attempt trips in high or turbulent water.",
        "TPWD identifies log jams and strainers as very hazardous and tells paddlers to portage around them.",
        "Save Buffalo Bayou warns that reservoir releases after storms can make the current fast and dangerous, and that flows over about 2,000 cfs are for experienced paddlers only."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08074000",
      "provider": "usgs",
      "siteId": "08074000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo Bayou at Houston, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08074000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 150,
      "thresholdSource": {
        "label": "Save Buffalo Bayou Woodway-to-Sabine flow guidance",
        "url": "https://www.savebuffalobayou.org/?page_id=9823",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Woodway-to-Sabine reach can be paddleable year-round at base flow, but same-day rain and reservoir releases control the decision more than season. Treat the 150 cfs floor as minimum-only and downgrade quickly after storms, sewage/water-quality alerts, visible strainers, or fast rising water.",
      "difficulty": "moderate",
      "difficultyNotes": "The route has few riffles, but it is an urban bayou with muddy access, variable water quality, reservoir-release swings, strainers, low bridges, and private banks. It is best for paddlers who can self-rescue, portage obstructions, and make conservative water-quality calls.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD publishes the 26-mile Buffalo Bayou Paddling Trail, official Woodway Memorial Park and Sabine Street access coordinates, segment float times, water-quality warnings, release/runoff context, strainer hazards, and private-bank rules; Save Buffalo Bayou recommends the Woodway launch to the Sabine take-out and gives concrete 150-200 cfs base-flow and 2,000 cfs experienced-only cues; USGS 08074000 is product-live on the selected downtown reach. The route ships minimum-only because the threshold source is local corridor guidance rather than an agency-authored scoring band."
    },
    "evidenceNotes": [
      {
        "label": "Official access chain",
        "value": "Woodway Memorial Park to Sabine Street",
        "note": "TPWD lists Woodway Memorial Park and Sabine Street as Buffalo Bayou Paddling Trail access points with GPS coordinates and publishes the downstream segment sequence through Hogg Bird Sanctuary and Eleanor Tinsley Park.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/"
      },
      {
        "label": "Practical route shape",
        "value": "Woodway launch to Sabine Bridge take-out",
        "note": "Save Buffalo Bayou identifies the Woodway boat launch as the easiest and nicest Buffalo Bayou paddle and says the easiest take-out with parking is just below the Sabine Bridge, with duration depending on flow and paddler effort.",
        "sourceUrl": "https://www.savebuffalobayou.org/?page_id=9823"
      },
      {
        "label": "Live gauge support",
        "value": "USGS 08074000 at 164 cfs / 1.48 ft",
        "note": "USGS Water Services returned same-day Buffalo Bayou at Houston discharge and gage height at 2026-08-10 05:15 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08074000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "150 cfs minimum-only; 2,000 cfs experienced-only caution",
        "note": "Save Buffalo Bayou describes base flow as a very low, slow current around 150-200 cfs and says flows over about 2,000 cfs are for experienced paddlers only after storm and reservoir-release pulses.",
        "sourceUrl": "https://www.savebuffalobayou.org/?page_id=9823"
      },
      {
        "label": "Safety and water quality",
        "value": "Urban runoff, releases, strainers, and no swimming",
        "note": "TPWD says the bayou's water quality is generally unsuitable for swimming, is influenced by storm runoff and reservoir releases, and that trips should not be attempted in high and turbulent water; log jams and strainers are specifically flagged as hazardous.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "Houston Parks says camping in the city park system is permitted only at Lake Houston Wilderness Park, so Buffalo Bayou Park and Memorial Park access points are treated as day-use paddling anchors only.",
        "sourceUrl": "https://www.houstontx.gov/parks/parkrules.html"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, Save Buffalo Bayou, Buffalo Bayou Partnership, Commons, USGS, and same-route image review found route-context photos and maps, but no clearly rights-clean exact Woodway-to-Sabine paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Buffalo+Bayou+Woodway+Sabine+Street+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Buffalo Bayou Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/",
        "provider": "local"
      },
      {
        "label": "TPWD Buffalo Bayou Paddling Trail map",
        "url": "https://tpwd.texas.gov/documents/513/Buffalo_Bayou_map.pdf",
        "provider": "local"
      },
      {
        "label": "Save Buffalo Bayou paddling guide",
        "url": "https://www.savebuffalobayou.org/?page_id=9823",
        "provider": "local"
      },
      {
        "label": "City of Houston park rules",
        "url": "https://www.houstontx.gov/parks/parkrules.html",
        "provider": "local"
      },
      {
        "label": "USGS 08074000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08074000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08074000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08074000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-bayou-sabine-street-allens-landing",
    "slug": "buffalo-bayou-sabine-street-allens-landing",
    "name": "Buffalo Bayou",
    "reach": "Sabine Street to Allen's Landing",
    "aliases": [
      "Buffalo Bayou Paddling Trail - Sabine Street to Allen's Landing",
      "Sabine Street to Allen's Landing",
      "Downtown Houston Buffalo Bayou connector"
    ],
    "state": "Texas",
    "region": "Gulf Coast",
    "summary": "Short downtown Houston connector from the Sabine Street access to Allen's Landing on the official Buffalo Bayou Paddling Trail. TPWD publishes both access coordinates and the one-hour downstream segment, while USGS 08074000 gives a direct live flow check for this downtown reach.",
    "statusText": "Use the Buffalo Bayou at Houston gauge. Around 150 cfs is the conservative base-flow floor for this short downtown segment; storm runoff and reservoir releases can make the bayou fast, dirty, and obstruction-prone, and flows over about 2,000 cfs belong to experienced paddlers only.",
    "latitude": 29.7622,
    "longitude": -95.3736,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "dam_release",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD says Buffalo Bayou is influenced by Addicks and Barker Reservoir releases, storm runoff, sewage treatment plants, and natural springs; do not attempt trips in high or turbulent water.",
        "TPWD identifies log jams and strainers as very hazardous and tells paddlers to portage around them.",
        "Save Buffalo Bayou warns that reservoir releases after storms can make the current fast and dangerous, and that flows over about 2,000 cfs are for experienced paddlers only."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08074000",
      "provider": "usgs",
      "siteId": "08074000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo Bayou at Houston, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08074000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 150,
      "thresholdSource": {
        "label": "Save Buffalo Bayou downtown flow guidance",
        "url": "https://www.savebuffalobayou.org/?page_id=9823",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Sabine-to-Allen's downtown reach can be paddleable year-round at base flow, but same-day rain and reservoir releases control the decision more than season. Treat the 150 cfs floor as minimum-only and downgrade quickly after storms, sewage or bacteria alerts, visible strainers, or fast rising water.",
      "difficulty": "easy",
      "difficultyNotes": "The mileage is short and TPWD estimates about one hour, but this is still an urban bayou segment with variable water quality, reservoir-release swings, bridge approaches, strainers, private banks, and a downtown take-out that must not be missed.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD publishes Sabine Street and Allen's Landing as official Buffalo Bayou Paddling Trail access points with coordinates and a one-hour segment estimate; TPWD also documents runoff, reservoir-release, water-quality, strainer, and private-bank caveats for the full trail; Save Buffalo Bayou gives concrete 150-200 cfs base-flow and 2,000 cfs experienced-only cues; USGS 08074000 is product-live on the selected downtown reach. The route ships minimum-only because the threshold source is local corridor guidance rather than an agency-authored scoring band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Sabine Street to Allen's Landing, about 1 hr",
        "note": "TPWD lists Sabine Street and Allen's Landing as official Buffalo Bayou Paddling Trail access points and estimates the Sabine-to-Allen's segment at about one hour.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/"
      },
      {
        "label": "Public access coordinates",
        "value": "29.7622, -95.3736 to 29.7647, -95.3592",
        "note": "TPWD publishes GPS coordinates for Sabine Street Access and Allen's Landing Park on the Buffalo Bayou trail page.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/"
      },
      {
        "label": "Live gauge support",
        "value": "USGS 08074000 at 208 cfs / 1.44 ft",
        "note": "USGS Water Services returned same-day Buffalo Bayou at Houston discharge and gage height at 2026-08-10 23:15 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08074000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "150 cfs minimum-only; 2,000 cfs experienced-only caution",
        "note": "Save Buffalo Bayou describes base flow as a very low, slow current around 150-200 cfs and says flows over about 2,000 cfs are for experienced paddlers only after storm and reservoir-release pulses.",
        "sourceUrl": "https://www.savebuffalobayou.org/?page_id=9823"
      },
      {
        "label": "Safety and water quality",
        "value": "Urban runoff, releases, strainers, and no swimming",
        "note": "TPWD says the bayou's water quality is generally unsuitable for swimming, is influenced by storm runoff and reservoir releases, and that trips should not be attempted in high and turbulent water; log jams and strainers are specifically flagged as hazardous.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "Houston Parks says camping in the city park system is permitted only at Lake Houston Wilderness Park, so Buffalo Bayou Park and downtown access points are treated as day-use paddling anchors only.",
        "sourceUrl": "https://www.houstontx.gov/parks/parkrules.html"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, Save Buffalo Bayou, Buffalo Bayou Partnership, Commons, USGS, and same-route image review found route-context photos and maps, but no clearly rights-clean exact Sabine-to-Allen's paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Buffalo+Bayou+Sabine+Allen%27s+Landing+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Buffalo Bayou Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/",
        "provider": "local"
      },
      {
        "label": "TPWD Buffalo Bayou Paddling Trail map",
        "url": "https://tpwd.texas.gov/documents/513/Buffalo_Bayou_map.pdf",
        "provider": "local"
      },
      {
        "label": "Save Buffalo Bayou paddling guide",
        "url": "https://www.savebuffalobayou.org/?page_id=9823",
        "provider": "local"
      },
      {
        "label": "City of Houston park rules",
        "url": "https://www.houstontx.gov/parks/parkrules.html",
        "provider": "local"
      },
      {
        "label": "USGS 08074000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08074000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08074000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08074000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "greens-bayou-brock-adventure-thomas-bell-foster",
    "slug": "greens-bayou-brock-adventure-thomas-bell-foster",
    "name": "Greens Bayou",
    "reach": "Brock Adventure Park to Thomas Bell Foster Park",
    "aliases": [
      "Greens Bayou Paddling Trail",
      "Brock Adventure Park to Thomas Bell Foster Park",
      "Greens Bayou Regatta route"
    ],
    "state": "Texas",
    "region": "Gulf Coast",
    "summary": "Official Houston bayou trail from Brock Adventure Park to Thomas Bell Foster Park, with Strickland Park as the middle public launch. TPWD publishes the 7.7-mile route, access coordinates, tidal and private-bank caveats, while USGS 08076000 gives a same-bayou live flow check upstream of the trail.",
    "statusText": "Use Greens Bayou near Houston as a conservative same-bayou check. Houston Canoe Club found about 25 cfs near the practical low end on this gauge family; below that, expect dragging, shallow spots, and low-tide landings, while tide, wind, storms, wood, and urban water quality can override a simple cfs number.",
    "latitude": 29.8423,
    "longitude": -95.2317,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "private_banks",
        "access_uncertain"
      ],
      "safetyNotes": [
        "TPWD says steep banks and heavy undergrowth make take-outs along the bayou difficult, so plan to use the three public launches instead of improvised banks.",
        "TPWD says the lower trail has tidal stretches and that flow, tide, and wind affect trip time; cancel when storms, rising water, wind, or low tide make landings unreliable.",
        "TPWD flags a fish-consumption advisory and wildlife including alligators; treat this as urban-bayou water and avoid unnecessary body contact."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08076000",
      "provider": "usgs",
      "siteId": "08076000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Greens Bayou nr Houston, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08076000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 25,
      "thresholdSource": {
        "label": "Houston Canoe Club Greens Bayou trip report",
        "url": "https://thcc.clubexpress.com/content.aspx?club_id=496051&module_id=139482&page_id=22",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "windSensitivity": 0.55,
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The official Greens Bayou route can be used year-round when park access, gauge, tide, wind, weather, and water quality cooperate. Treat 25 cfs as a conservative low-water floor only; the lower bayou is tidal, and storms or urban runoff can change current, debris, and water quality quickly.",
      "difficulty": "easy",
      "difficultyNotes": "TPWD describes the trail as suitable for all skill levels and estimates 2-3.5 hours for the full 7.7 miles, but the route stays caution-rated because tidal stretches, wind, shallow low-water spots, steep banks, heavy undergrowth, alligators, urban water quality, and private-bank limits matter.",
      "confidenceNotes": "Confidence is good for a conservative Houston add: TPWD publishes the official 7.7-mile Greens Bayou Paddling Trail, exact Brock Adventure Park and Thomas Bell Foster Park coordinates, Strickland Park as a middle public launch, route time, private-property rules, tidal caveats, and safety context; Greens Bayou Coalition confirms the TPWD-designated Brock-to-Thomas-Bell-Foster route opened with the 2025 regatta; USGS 08076000 is product-live on Greens Bayou; Houston Canoe Club gives a same-gauge 25 cfs practical low-water cue. The route ships minimum-only because the threshold is community trip-report evidence and the official lower trail also depends on tide and wind."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Brock Adventure Park to Thomas Bell Foster Park, 7.7 mi",
        "note": "TPWD publishes Greens Bayou as a 7.7-mile official paddling trail through urban Houston and lists Brock Adventure Park, Strickland Park, and Thomas Bell Foster Park as the launch chain.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/greens-bayou/"
      },
      {
        "label": "Public access coordinates",
        "value": "29.8423, -95.2317 to 29.7743, -95.2020",
        "note": "TPWD publishes GPS coordinates for Brock Adventure Park, Strickland Park, and Thomas Bell Foster Park on the Greens Bayou trail page.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/greens-bayou/"
      },
      {
        "label": "Current TPWD designation",
        "value": "Surveyed and approved by TPWD in 2024; opened with the 2025 regatta",
        "note": "Greens Bayou Coalition says the trail from Brock Park to Thomas Bell Foster Park was surveyed and approved by TPWD in 2024 and that its opening coincided with the 2025 Greens Bayou Regatta.",
        "sourceUrl": "https://www.greensbayou.org/parks-trails-recreation"
      },
      {
        "label": "Live gauge support",
        "value": "USGS 08076000 at 36.3 cfs / 39.08 ft",
        "note": "USGS Water Services returned same-day Greens Bayou near Houston discharge and gage height at 2026-08-14 00:30 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08076000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "25 cfs minimum-only low-water cue",
        "note": "Houston Canoe Club reported about 25 cfs on Greens Bayou near Houston and described that as about as low as they would want to paddle, with occasional light dragging and tidal effects near the finish.",
        "sourceUrl": "https://thcc.clubexpress.com/content.aspx?club_id=496051&module_id=139482&page_id=22"
      },
      {
        "label": "Safety and access",
        "value": "Tide, wind, steep banks, private property, wildlife, and advisory",
        "note": "TPWD says lower Greens Bayou includes tidal stretches, take-outs along steep undergrown banks are difficult, private property should be respected, wildlife includes alligators, and a fish-consumption advisory applies.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/greens-bayou/"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "TPWD publishes park-hour access windows for the Greens Bayou launches, and Houston Parks says camping in the city park system is permitted only at Lake Houston Wilderness Park, so the Greens Bayou launch parks are treated as day-use paddling anchors.",
        "sourceUrl": "https://www.houstontx.gov/parks/parkrules.html"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, Greens Bayou Coalition, Houston Canoe Club, Commons, USGS, and same-route image review found route-context pages and photos, but no clearly rights-clean exact Brock-to-Thomas-Bell-Foster paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Greens+Bayou+Brock+Adventure+Thomas+Bell+Foster+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Greens Bayou Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/greens-bayou/",
        "provider": "local"
      },
      {
        "label": "Greens Bayou Coalition parks and trails",
        "url": "https://www.greensbayou.org/parks-trails-recreation",
        "provider": "local"
      },
      {
        "label": "Houston Canoe Club Greens Bayou report",
        "url": "https://thcc.clubexpress.com/content.aspx?club_id=496051&module_id=139482&page_id=22",
        "provider": "local"
      },
      {
        "label": "City of Houston park rules",
        "url": "https://www.houstontx.gov/parks/parkrules.html",
        "provider": "local"
      },
      {
        "label": "USGS 08076000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08076000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08076000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08076000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "elm-fork-trinity-river-llela-hebron-parkway",
    "slug": "elm-fork-trinity-river-llela-hebron-parkway",
    "name": "Elm Fork Trinity River",
    "reach": "LLELA / Lewisville Lake Dam to Hebron Parkway",
    "aliases": [
      "Lewisville Lake Dam to Hebron Parkway",
      "LLELA to Trinity Fork Park",
      "Elm Fork Lewisville Dam to Hebron"
    ],
    "state": "Texas",
    "region": "North Texas",
    "summary": "North Texas National Water Trail run from LLELA's primitive Elm Fork launch below Lewisville Lake Dam to the Hebron Parkway kayak launch. LLELA publishes the downstream-only access guidance, flow limits, tree and strainer cautions, and current conditions, while USGS 08053000 gives a same-reach live flow check.",
    "statusText": "Use the Elm Fork Trinity River near Lewisville gauge. LLELA says kayaking is not possible below 80 cfs, is not recommended for most paddlers above 600 cfs, and closes boating above 3,000 cfs; Paddle Today uses the 80-600 cfs public guidance conservatively.",
    "latitude": 33.041,
    "longitude": -96.9577,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "dam_release",
        "private_banks",
        "mandatory_takeout"
      ],
      "safetyNotes": [
        "LLELA says strong currents below Lewisville Dam make this a downstream-only shuttle route; do not plan to paddle back upstream to the put-in.",
        "LLELA's current-conditions page warns of a tree hazard past the trestle bridge and says many strainers, downed trees, and other hazards are present along the Elm Fork.",
        "Trinity Coalition tells paddlers that river conditions, access sites, and infrastructure change and that all dams should be treated as hazardous."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08053000",
      "provider": "usgs",
      "siteId": "08053000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Elm Fk Trinity Rv nr Lewisville, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08053000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 200,
      "idealMax": 600,
      "tooLow": 80,
      "tooHigh": 600,
      "thresholdSource": {
        "label": "LLELA Elm Fork paddling flow guidance",
        "url": "https://www.llela.org/visit/things-to-do-or-see/kayaking-and-canoeing",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The dam-tailwater route can be paddleable year-round, but the decision is release-driven. Check same-day LLELA conditions, USGS 08053000, weather, and recent dam release context before staging a shuttle.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a short Class I urban-wilderness run, but the launch is primitive, the current below the dam can be strong, strainers and downed trees are common, and the route requires a committed downstream shuttle to Hebron Parkway.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: LLELA publishes the route access, downstream-only shuttle guidance, primitive launch caveat, named Hebron Parkway take-out, 80/600/3,000 cfs thresholds, current-condition hazard notes, and designated camping limits; Trinity Coalition publishes launch-map coordinate support and National Water Trail safety context; TRPA lists the same Lewisville Dam-to-Hebron featured run and broader Elm Fork flow context; USGS 08053000 is a product-supported live same-reach gauge. The route uses LLELA's 80-600 cfs public guidance as the scoring band and keeps 3,000 cfs as a closure/safety note rather than a recommended high-water band."
    },
    "evidenceNotes": [
      {
        "label": "Official access guidance",
        "value": "LLELA to Hebron Parkway",
        "note": "LLELA names itself as the northernmost Elm Fork access, instructs paddlers to launch there and go downstream, and lists the first public take-out as Trinity Fork Park by Hebron Parkway at 2205 W. Hebron Parkway.",
        "sourceUrl": "https://www.llela.org/visit/things-to-do-or-see/kayaking-and-canoeing"
      },
      {
        "label": "Coordinate support",
        "value": "33.067109, -96.964697 to 33.012600, -96.950689",
        "note": "Trinity Coalition's launch map and LLELA current-conditions page publish the Lewisville Lake Dam / LLELA and Hebron Parkway kayak-launch coordinates used as public access anchors.",
        "sourceUrl": "https://trinitycoalition.org/launch-sites-map"
      },
      {
        "label": "Live gauge support",
        "value": "USGS 08053000 at 452 cfs / 6.66 ft",
        "note": "USGS Water Services returned same-day Elm Fork Trinity River near Lewisville discharge and gage height at 2026-08-10 05:30 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08053000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "80 cfs floor; 200-600 cfs target; >600 cfs swift-water caution",
        "note": "LLELA says kayaking is not possible below 80 cfs and is not recommended for most paddlers above 600 cfs; Paddle Today pairs that with TRPA's broader 200-1,000 cfs Elm Fork ideal context and scores conservatively to 600 cfs.",
        "sourceUrl": "https://www.llela.org/visit/things-to-do-or-see/kayaking-and-canoeing"
      },
      {
        "label": "Safety and access",
        "value": "Downstream-only shuttle with strainers and tree hazards",
        "note": "LLELA warns that the dam tailwater current makes upstream return unrealistic, flags common strainers and fallen trees, and its current-conditions page calls out a tree hazard past the trestle bridge.",
        "sourceUrl": "https://www.llela.org/visit/current-trail-and-camping-conditions"
      },
      {
        "label": "Camping",
        "value": "Endpoint primitive campground near, not along, the river",
        "note": "LLELA publishes nine primitive campsites near but not along the river, designated-only camping rules, no riverbank campsites due to flooding, and current campground availability.",
        "sourceUrl": "https://www.llela.org/visit/things-to-do-or-see/camping"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded LLELA, Trinity Coalition, TRPA, Commons, USGS, Visit The Colony, KayakPower, and same-route image review found route-context photos and maps, but no clearly rights-clean exact LLELA-to-Hebron paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Elm+Fork+Trinity+River+LLELA+Hebron+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "LLELA Kayaking and Canoeing",
        "url": "https://www.llela.org/visit/things-to-do-or-see/kayaking-and-canoeing",
        "provider": "local"
      },
      {
        "label": "LLELA current trail, paddling, and camping conditions",
        "url": "https://www.llela.org/visit/current-trail-and-camping-conditions",
        "provider": "local"
      },
      {
        "label": "LLELA primitive camping",
        "url": "https://www.llela.org/visit/things-to-do-or-see/camping",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition launch sites map",
        "url": "https://trinitycoalition.org/launch-sites-map",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition Lewisville Lake Dam / Elm Fork water levels",
        "url": "https://trinitycoalition.org/lewisville-lake-dam-elm-fork",
        "provider": "local"
      },
      {
        "label": "TRPA Elm Fork Trinity River overview",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/",
        "provider": "local"
      },
      {
        "label": "USGS 08053000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08053000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08053000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08053000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "elm-fork-trinity-river-hebron-parkway-mcinnish-park",
    "slug": "elm-fork-trinity-river-hebron-parkway-mcinnish-park",
    "name": "Elm Fork Trinity River",
    "reach": "Hebron Parkway to McInnish Park",
    "aliases": [
      "Trinity River National Water Trail - Hebron Parkway to McInnish Park",
      "Trinity Fork Park to McInnish Park",
      "Elm Fork Hebron to McInnish"
    ],
    "state": "Texas",
    "region": "North Texas",
    "summary": "North Texas National Water Trail run from the Hebron Parkway kayak launch at Trinity Fork Park to McInnish Park in Carrollton. Trinity Coalition maps the missing middle Elm Fork segment and launch coordinates, LLELA identifies Hebron as the first public take-out below the dam, and the Carrollton USGS gauge gives a direct same-reach flow check.",
    "statusText": "Use the Elm Fork Trinity River near Carrollton gauge. TRPA lists 100 cfs as the Elm Fork minimum, 200-1,000 cfs as the ideal range, and 2,000 cfs as the high-water caution; Paddle Today treats readings below 100 cfs as below floor for this urban Class I reach.",
    "latitude": 33.0126,
    "longitude": -96.950689,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "dam_release",
        "private_banks"
      ],
      "safetyNotes": [
        "LLELA says the Elm Fork route below Lewisville Dam has strong-current release behavior and common strainers, downed trees, and erosion hazards; keep checking conditions even though this card starts downstream at Hebron.",
        "TRPA says dangerous log jams can develop on the Elm Fork after flooding; cancel when the corridor has fresh wood, rising water, or a blocked line.",
        "This reach is a park-to-park urban river corridor. Use the mapped public launches and do not substitute private banks, road shoulders, or unmanaged crossings for normal access."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08055500",
      "provider": "usgs",
      "siteId": "08055500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Elm Fk Trinity Rv nr Carrollton, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08055500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 100,
      "idealMin": 200,
      "idealMax": 1000,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Elm Fork Trinity River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA lists the Elm Fork as year-round and tied to USGS Carrollton. Treat this regulated urban river conservatively after rain, below the 100 cfs floor, near the 2,000 cfs maximum caution, or whenever release, dam, and wood conditions are unclear.",
      "difficulty": "moderate",
      "difficultyNotes": "The mapped segment is Class I and only about 5.75 miles, but the route stays moderate because it is release-influenced, wood-prone after floods, bordered by private or managed parkland, and requires a reliable shuttle.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: Trinity Coalition publishes the LLELA-to-McInnish section map with Hebron Parkway and McInnish Park coordinates and the 5.75-mile Hebron-to-McInnish spacing; LLELA names Hebron Parkway as the first public take-out below the dam and McInnish/Dimension Tract as the next public downstream access; TRPA publishes matching Elm Fork featured runs, Class I context, numeric cfs thresholds, and USGS Carrollton as a current-condition source; USGS 08055500 is product-live inside the reach. The route ships below floor at the current reading, with no camping and a bounded no-image result."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Hebron Parkway to McInnish Park, about 5.75 mi",
        "note": "Trinity Coalition's LLELA-to-McInnish section map publishes LLELA, Hebron Parkway, and McInnish Park as launch sites and gives the 5.75-mile Hebron-to-McInnish spacing.",
        "sourceUrl": "https://clevermuttportal.com/_tnc_media/08_llelatomcinnish.pdf"
      },
      {
        "label": "Public access coordinates",
        "value": "33.012600, -96.950689 to 32.967440, -96.942685",
        "note": "Trinity Coalition publishes Hebron Parkway and McInnish Park launch coordinates on the National Water Trail section map; LLELA separately names Hebron Parkway / Trinity Fork Park and the next downstream Carrollton access.",
        "sourceUrl": "https://clevermuttportal.com/_tnc_media/08_llelatomcinnish.pdf"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08055500 at 91.1 cfs / 3.42 ft",
        "note": "USGS Water Services returned same-day Elm Fork Trinity River near Carrollton discharge and gage height at 2026-08-11 01:15 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08055500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum; 200-1,000 cfs ideal; 2,000 cfs maximum caution",
        "note": "TRPA's Elm Fork Trinity page lists the Elm Fork route family, Class I character, year-round season, 100 cfs minimum, 200-1,000 cfs ideal range, 2,000 cfs maximum, and USGS Carrollton current-condition source.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/"
      },
      {
        "label": "Safety and access",
        "value": "Release-influenced urban river with common wood",
        "note": "LLELA warns of strong current below Lewisville Dam, common strainers, fallen trees, and erosion hazards on the Elm Fork; TRPA separately warns that dangerous log jams can develop after flooding.",
        "sourceUrl": "https://www.llela.org/visit/things-to-do-or-see/kayaking-and-canoeing"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "This card starts below LLELA's designated campsite area and ends at Carrollton park/open-space access. No reviewed Trinity Coalition, LLELA, Carrollton, Dallas County, or TRPA source supports overnight route camping between Hebron and McInnish.",
        "sourceUrl": "https://www.dallascounty.org/departments/plandev/openspaces/locations/02-elm-fork.php"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded Trinity Coalition, TRPA, LLELA, Carrollton, Dallas County, Commons, USGS, and same-route image review found route-context maps and photos but no clearly rights-clean exact Hebron-to-McInnish paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Elm+Fork+Trinity+Hebron+McInnish+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "Trinity Coalition paddling trail",
        "url": "https://trinitycoalition.org/paddling-trail",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition LLELA to McInnish map",
        "url": "https://clevermuttportal.com/_tnc_media/08_llelatomcinnish.pdf",
        "provider": "local"
      },
      {
        "label": "LLELA Kayaking and Canoeing",
        "url": "https://www.llela.org/visit/things-to-do-or-see/kayaking-and-canoeing",
        "provider": "local"
      },
      {
        "label": "TRPA Elm Fork Trinity River",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/",
        "provider": "local"
      },
      {
        "label": "Dallas County Elm Fork Preserve",
        "url": "https://www.dallascounty.org/departments/plandev/openspaces/locations/02-elm-fork.php",
        "provider": "local"
      },
      {
        "label": "USGS 08055500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08055500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08055500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08055500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "clear-fork-trinity-river-art-cowsen-bryant-irvin",
    "slug": "clear-fork-trinity-river-art-cowsen-bryant-irvin",
    "name": "Clear Fork Trinity River",
    "reach": "Art Cowsen Trailhead to Bryant Irvin Road",
    "aliases": [
      "Trinity River National Water Trail - Art Cowsen to Bryant Irvin",
      "Clear Fork Art Cowsen to Bryant Irvin",
      "Fort Worth Clear Fork Art Cowsen paddle"
    ],
    "state": "Texas",
    "region": "North Texas",
    "summary": "Fort Worth Clear Fork day run below Benbrook Dam from Art Cowsen Trailhead to Bryant Irvin Road. TRPA names the 4.8-mile route, publishes access map links and conservative Clear Fork flow bands, and ties the route family to the product-supported Benbrook USGS gauge.",
    "statusText": "Use the Clear Fork Trinity River near Benbrook gauge. TRPA lists 100 cfs as the Clear Fork minimum, 150-250 cfs as the ideal range, and 2,000 cfs as the high-water caution; Paddle Today treats this wooded urban segment as below floor when the gauge is under 100 cfs.",
    "latitude": 32.6643568,
    "longitude": -97.4476423,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "private_banks"
      ],
      "safetyNotes": [
        "TRPA warns that the wooded Clear Fork below Benbrook Dam can be affected by low water, log jams, and fallen trees; do not launch if the current line is obstructed or unclear.",
        "Treat flows below 100 cfs as shallow and scrape-prone, and cancel when the Benbrook gauge is rising quickly or near TRPA's 2,000 cfs maximum caution.",
        "This is an urban river corridor through Fort Worth park and private-bank context. Use the named public access anchors only, and skip after medium or heavy rain when water quality is suspect."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08047000",
      "provider": "usgs",
      "siteId": "08047000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Clear Fk Trinity Rv nr Benbrook, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08047000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 100,
      "idealMin": 150,
      "idealMax": 250,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Clear Fork Trinity River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA lists the Clear Fork route family as year-round and tied to the Benbrook USGS gauge. Treat this wooded urban tailwater conservatively after rain, below the 100 cfs floor, near the 2,000 cfs maximum caution, or when wood and access conditions are unclear.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is Class I-I+ and only about 4.8 miles, but it starts in the wooded Benbrook-to-Loop-820 corridor where TRPA flags low-water, log-jam, and fallen-tree concerns.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TRPA publishes Art Cowsen Trailhead to Bryant Irvin Road as a 4.8-mile featured Clear Fork run with access map links, Class I-I+ context, numeric cfs thresholds, and USGS Benbrook as the current-condition source; the TRPA map links resolve to defensible endpoint access anchors; USGS 08047000 is product-live; Trinity Coalition supports the National Water Trail / dam-safety context; and Fort Worth park rules support day-use/no-camping handling. The route ships with no camping and a bounded no-image result."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Art Cowsen Trailhead to Bryant Irvin Rd, about 4.8 mi",
        "note": "TRPA lists Art Cowsen Trailhead to Bryant Irvin Road as the first Clear Fork featured run and publishes the route family distance and access map links.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/"
      },
      {
        "label": "Public access coordinates",
        "value": "32.6643568, -97.4476423 to 32.7045112, -97.4115092",
        "note": "TRPA's Art Cowsen and Bryant Irvin Google map links resolve to these public access-anchor coordinates; they are recorded as arrival-point anchors, not surveyed mid-channel water-entry points.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08047000 at 16.6 cfs / 3.37 ft",
        "note": "USGS Water Services returned same-day Clear Fork Trinity River near Benbrook discharge and gage height at 2026-08-11 03:00 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08047000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum; 150-250 cfs ideal; 2,000 cfs maximum caution",
        "note": "TRPA's Clear Fork Trinity page lists the route family, Class I-I+ character, year-round season, 100 cfs minimum, 150-250 cfs ideal range, 2,000 cfs maximum, and USGS near Benbrook as the current-condition source.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/"
      },
      {
        "label": "Safety context",
        "value": "Wooded below-dam reach with log-jam and urban-water caveats",
        "note": "TRPA says the below-Benbrook Clear Fork can be lovely on this run when low water, log jams, and fallen trees are not a problem, and warns that Fort Worth rivers are most suspect after medium to heavy rains.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "Fort Worth publishes city park hours of 5 a.m. to 10 p.m. unless posted otherwise, and no reviewed Trinity Coalition, TRPA, Trinity Trails, or Fort Worth source supports overnight route camping on this urban leg.",
        "sourceUrl": "https://www.fortworthtexas.gov/departments/parks/parks-and-trails/park-rules"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded Trinity Coalition, TRPA, Trinity Trails, Fort Worth, Commons, USGS, and same-route image review found route-context maps and photos but no clearly rights-clean exact Art-Cowsen-to-Bryant-Irvin paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Clear+Fork+Trinity+Art+Cowsen+Bryant+Irvin+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TRPA Clear Fork Trinity River",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition paddling trail",
        "url": "https://trinitycoalition.org/paddling-trail",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition Clear and West Forks map",
        "url": "https://clevermuttportal.com/_tnc_media/02_clearwestforks.pdf",
        "provider": "local"
      },
      {
        "label": "Trinity Trails paddling guidance",
        "url": "https://trinitytrailsfw.com/paddling/",
        "provider": "local"
      },
      {
        "label": "Fort Worth park rules",
        "url": "https://www.fortworthtexas.gov/departments/parks/parks-and-trails/park-rules",
        "provider": "local"
      },
      {
        "label": "USGS 08047000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08047000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08047000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08047000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "clear-fork-trinity-river-bryant-irvin-rogers-road",
    "slug": "clear-fork-trinity-river-bryant-irvin-rogers-road",
    "name": "Clear Fork Trinity River",
    "reach": "Bryant Irvin Road to Rogers Road",
    "aliases": [
      "Trinity River National Water Trail - Bryant Irvin to Rogers Road",
      "Clear Fork Bryant Irvin to Rogers Road",
      "Fort Worth Clear Fork Bryant Irvin paddle"
    ],
    "state": "Texas",
    "region": "North Texas",
    "summary": "Middle Fort Worth Clear Fork National Water Trail leg from Bryant Irvin Road to Rogers Road. TRPA names the 3.4-mile route, publishes the access map links and conservative Clear Fork flow bands, and ties the route family to the product-supported Benbrook USGS gauge.",
    "statusText": "Use the Clear Fork Trinity River near Benbrook gauge. TRPA lists 100 cfs as the Clear Fork minimum, 150-250 cfs as the ideal range, and 2,000 cfs as the high-water caution; Paddle Today treats this urban segment as below floor when the gauge is under 100 cfs.",
    "latitude": 32.7045112,
    "longitude": -97.4115092,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "private_banks"
      ],
      "safetyNotes": [
        "TRPA warns that Clear Fork trips below Benbrook Dam depend on low-water, log-jam, and fallen-tree conditions; do not launch if the current line is obstructed or unclear.",
        "Treat flows below 100 cfs as shallow and scrape-prone, and cancel when the Benbrook gauge is rising quickly or near TRPA's 2,000 cfs maximum caution.",
        "This is an urban Fort Worth corridor with public access anchors and private-bank edges. Use the named Bryant Irvin and Rogers Road access points only, and avoid the river after medium or heavy rain when water quality is suspect."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08047000",
      "provider": "usgs",
      "siteId": "08047000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Clear Fk Trinity Rv nr Benbrook, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08047000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 100,
      "idealMin": 150,
      "idealMax": 250,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Clear Fork Trinity River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA lists the Clear Fork route family as year-round and tied to the Benbrook USGS gauge. Treat this urban tailwater conservatively after rain, below the 100 cfs floor, near the 2,000 cfs maximum caution, or when wood and access conditions are unclear.",
      "difficulty": "easy",
      "difficultyNotes": "The Bryant Irvin-to-Rogers Road leg is about 3.4 miles and Class I-I+, but low water, wood, runoff, and limited public exits keep it from being a casual no-check float.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TRPA publishes Bryant Irvin Road to Rogers Road as a 3.4-mile featured Clear Fork run with access map links, Class I-I+ context, numeric cfs thresholds, and USGS Benbrook as the current-condition source; the endpoint map links and Trinity Coalition launch map provide defensible public access anchors; USGS 08047000 is product-live; Trinity Coalition and Trinity Trails support current-condition and dam-awareness context; and Fort Worth park rules support day-use/no-camping handling. The route ships with no camping and a bounded no-image result."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Bryant Irvin Road to Rogers Road, about 3.4 mi",
        "note": "TRPA lists Bryant Irvin Road to Rogers Road as the second Clear Fork featured run and publishes the route family distance, access map links, and flow guidance.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/"
      },
      {
        "label": "Public access coordinates",
        "value": "32.7045112, -97.4115092 to 32.723245, -97.365564",
        "note": "The Bryant Irvin Road coordinate comes from TRPA's access map link, and Rogers Road is the adjacent Trinity Coalition mapped launch coordinate already used by the downstream Clear Fork card. Both are recorded as arrival/access anchors, not surveyed mid-channel water-entry points.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08047000 at 16.6 cfs / 3.37 ft",
        "note": "USGS Water Services returned same-day Clear Fork Trinity River near Benbrook discharge and gage height at 2026-08-11 04:00 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08047000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum; 150-250 cfs ideal; 2,000 cfs maximum caution",
        "note": "TRPA's Clear Fork Trinity page lists the route family, Class I-I+ character, year-round season, 100 cfs minimum, 150-250 cfs ideal range, 2,000 cfs maximum, and USGS near Benbrook as the current-condition source.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/"
      },
      {
        "label": "Safety context",
        "value": "Urban Clear Fork route with wood, low-water, runoff, and private-bank caveats",
        "note": "TRPA says the below-Benbrook Clear Fork can be affected by low water, log jams, and fallen trees, and warns that Fort Worth rivers are most suspect after medium to heavy rains.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "Fort Worth publishes city park hours of 5 a.m. to 10 p.m. unless posted otherwise, and no reviewed Trinity Coalition, TRPA, Trinity Trails, or Fort Worth source supports overnight route camping on this urban leg.",
        "sourceUrl": "https://www.fortworthtexas.gov/departments/parks/parks-and-trails/park-rules"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded Trinity Coalition, TRPA, Trinity Trails, Fort Worth, Commons, USGS, and same-route image review found route-context maps and photos but no clearly rights-clean exact Bryant-Irvin-to-Rogers-Road paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Clear+Fork+Trinity+Bryant+Irvin+Rogers+Road+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TRPA Clear Fork Trinity River",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition paddling trail",
        "url": "https://trinitycoalition.org/paddling-trail",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition Clear and West Forks map",
        "url": "https://clevermuttportal.com/_tnc_media/02_clearwestforks.pdf",
        "provider": "local"
      },
      {
        "label": "Trinity Trails paddling guidance",
        "url": "https://trinitytrailsfw.com/paddling/",
        "provider": "local"
      },
      {
        "label": "Fort Worth park rules",
        "url": "https://www.fortworthtexas.gov/departments/parks/parks-and-trails/park-rules",
        "provider": "local"
      },
      {
        "label": "USGS 08047000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08047000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08047000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08047000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "clear-fork-trinity-river-rogers-road-trinity-park",
    "slug": "clear-fork-trinity-river-rogers-road-trinity-park",
    "name": "Clear Fork Trinity River",
    "reach": "Rogers Road to Trinity Park Kayak Launch",
    "aliases": [
      "Trinity River National Water Trail - Rogers Road to Trinity Park",
      "Clear Fork Rogers Road to Trinity Park",
      "Fort Worth Clear Fork Rogers Road paddle"
    ],
    "state": "Texas",
    "region": "North Texas",
    "summary": "Short Fort Worth National Water Trail leg on the Clear Fork from Rogers Road to Trinity Park Kayak Launch. Trinity Coalition maps both launch coordinates, while TRPA ties the Clear Fork route family to the Benbrook USGS gauge and a conservative urban flow range.",
    "statusText": "Use the Clear Fork Trinity River near Benbrook gauge. TRPA lists 100 cfs as the Clear Fork minimum, 150-250 cfs as the ideal range, and 2,000 cfs as the high-water caution; Paddle Today treats this short urban segment as below floor when the gauge is under 100 cfs.",
    "latitude": 32.723245,
    "longitude": -97.365564,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "private_banks"
      ],
      "safetyNotes": [
        "Take out at Trinity Park Kayak Launch for this route. The downstream Trinity Park chute and dam sequence is a separate decision and should not be treated as part of this beginner-oriented segment.",
        "Trinity Coalition says every dam on the National Water Trail should be treated as hazardous and avoided unless current map guidance clearly supports a marked chute or portage.",
        "TRPA notes that Clear Fork flows below Benbrook Dam can be wooded and that higher flows can become risky where log jams form; cancel when the hydrograph is rising, water quality is suspect, or the line is unclear."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08047000",
      "provider": "usgs",
      "siteId": "08047000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Clear Fk Trinity Rv nr Benbrook, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08047000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 100,
      "idealMin": 150,
      "idealMax": 250,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Clear Fork Trinity River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA lists the Clear Fork route family as year-round and tied to the Benbrook USGS gauge. Treat this urban tailwater conservatively after rain, below the 100 cfs floor, near the 2,000 cfs maximum caution, or when dam and wood conditions are unclear.",
      "difficulty": "easy",
      "difficultyNotes": "The Rogers Road-to-Trinity Park leg is only about 1.5 miles and avoids the downstream chute sequence, but the short mileage does not remove urban runoff, wood, fast-rise, and dam-awareness requirements.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: Trinity Coalition publishes Rogers Road and Trinity Park Kayak Launch as coordinate-backed National Water Trail launch sites with 1.5-mile spacing; TRPA publishes matching Clear Fork featured runs, Class I-I+ context, numeric cfs thresholds, and USGS Benbrook as the current-condition source; USGS 08047000 is product-live; Trinity Trails tells paddlers to check USGS water conditions; and Fort Worth park rules support day-use/no-camping handling. The route ships with no camping and a bounded no-image result."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Rogers Road to Trinity Park Kayak Launch, about 1.5 mi",
        "note": "Trinity Coalition's Clear and West Forks segment map publishes Rogers Road and Trinity Park Kayak Launch as National Water Trail launch sites and gives the 1.5-mile spacing between them.",
        "sourceUrl": "https://clevermuttportal.com/_tnc_media/02_clearwestforks.pdf"
      },
      {
        "label": "Public access coordinates",
        "value": "32.723245, -97.365564 to 32.739930, -97.356348",
        "note": "The Trinity Coalition segment map publishes both coordinates as launch-site anchors for the Clear Fork / West Fork section.",
        "sourceUrl": "https://clevermuttportal.com/_tnc_media/02_clearwestforks.pdf"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08047000 at 17.4 cfs / 3.38 ft",
        "note": "USGS Water Services returned same-day Clear Fork Trinity River near Benbrook discharge and gage height at 2026-08-10 18:00 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08047000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum; 150-250 cfs ideal; 2,000 cfs maximum caution",
        "note": "TRPA's Clear Fork Trinity page lists the route family, Class I-I+ character, year-round season, 100 cfs minimum, 150-250 cfs ideal range, 2,000 cfs maximum, and USGS near Benbrook as the current-condition source.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/"
      },
      {
        "label": "Safety and dam context",
        "value": "Stop at Trinity Park before the downstream chute/dam sequence",
        "note": "Trinity Coalition says all dams on the National Water Trail should be treated as hazardous and avoided, with only the marked Trinity Park chutes treated as a separate low-to-medium-flow exception; this route ends at Trinity Park rather than including that chute sequence.",
        "sourceUrl": "https://trinitycoalition.org/paddling-trail"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "Fort Worth publishes city park hours of 5 a.m. to 10 p.m. unless posted otherwise, and no reviewed Trinity Coalition, Trinity Trails, TRPA, or Fort Worth source supports overnight route camping on this short urban leg.",
        "sourceUrl": "https://www.fortworthtexas.gov/departments/parks/parks-and-trails/park-rules"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded Trinity Coalition, TRPA, Trinity Trails, Fort Worth, Commons, USGS, and same-route image review found route-context maps and photos but no clearly rights-clean exact Rogers-Road-to-Trinity-Park paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Clear+Fork+Trinity+Rogers+Road+Trinity+Park+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "Trinity Coalition paddling trail",
        "url": "https://trinitycoalition.org/paddling-trail",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition Clear and West Forks map",
        "url": "https://clevermuttportal.com/_tnc_media/02_clearwestforks.pdf",
        "provider": "local"
      },
      {
        "label": "TRPA Clear Fork Trinity River",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/clear-fork-trinity-river/",
        "provider": "local"
      },
      {
        "label": "Trinity Trails paddling guidance",
        "url": "https://trinitytrailsfw.com/paddling/",
        "provider": "local"
      },
      {
        "label": "Fort Worth park rules",
        "url": "https://www.fortworthtexas.gov/departments/parks/parks-and-trails/park-rules",
        "provider": "local"
      },
      {
        "label": "USGS 08047000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08047000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08047000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08047000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "elm-fork-trinity-river-mcinnish-california-crossing",
    "slug": "elm-fork-trinity-river-mcinnish-california-crossing",
    "name": "Elm Fork Trinity River",
    "reach": "McInnish Park to California Crossing Park",
    "aliases": [
      "Trinity River National Water Trail - McInnish to California Crossing",
      "Elm Fork McInnish Park to California Crossing",
      "McInnish Park to Bird's Fort to California Crossing"
    ],
    "state": "Texas",
    "region": "North Texas",
    "summary": "North Texas National Water Trail run from McInnish Park through Elm Park and Bird's Fort Trail Park to California Crossing Park. Trinity Coalition maps the official launch sequence and distances, while the Carrollton USGS gauge gives a direct same-reach flow check.",
    "statusText": "Use the Elm Fork Trinity River near Carrollton gauge. TRPA lists 100 cfs as the Elm Fork minimum, 200-1,000 cfs as the ideal range, and 2,000 cfs as the high-water caution; Paddle Today scores this as a conservative urban Class I route.",
    "latitude": 32.96744,
    "longitude": -96.942685,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "dam",
        "private_banks"
      ],
      "safetyNotes": [
        "Trinity Coalition says river conditions, access sites, and infrastructure change and that every dam on the National Water Trail should be treated as hazardous and avoided.",
        "TRPA says dangerous log jams can develop on the Elm Fork after flooding; inspect current conditions and be ready to cancel when the corridor has fresh wood or rising water.",
        "This reach is an urban river corridor with park-to-park access. Do not substitute private banks, road shoulders, or unmanaged crossings for the mapped public launches."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08055500",
      "provider": "usgs",
      "siteId": "08055500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Elm Fk Trinity Rv nr Carrollton, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08055500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 100,
      "idealMin": 200,
      "idealMax": 1000,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Elm Fork Trinity River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA lists the Elm Fork as year-round and ties the corridor to USGS Carrollton, but same-day decisions should be conservative after rain, below the 100 cfs floor, near the 2,000 cfs maximum caution, or when dam and wood conditions are unclear.",
      "difficulty": "moderate",
      "difficultyNotes": "The mapped segment is Class I, but it is long enough to require a real shuttle, has urban-water and post-flood wood risk, and passes through dam-influenced Elm Fork infrastructure.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: Trinity Coalition publishes the McInnish-to-California Crossing section map with launch coordinates and access spacing; TRPA publishes matching Elm Fork featured runs, Class I context, numeric cfs thresholds, and USGS Carrollton as a current-condition source; USGS 08055500 is product-live inside the reach; City of Carrollton and Dallas park sources support public park access and day-use handling. The route ships with no camping and a bounded no-image result."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "McInnish Park to California Crossing Park, about 9.25 mi",
        "note": "Trinity Coalition's segment map publishes McInnish Park, Elm Park, Bird's Fort Trail Park, and California Crossing Park as launch sites and gives the 1.5, 6.25, and 1.5 mile access spacing.",
        "sourceUrl": "https://clevermuttportal.com/_tnc_media/09_mcinnishtocalicrossing.pdf"
      },
      {
        "label": "Public access coordinates",
        "value": "32.967440, -96.942685 to 32.868524, -96.923634",
        "note": "Trinity Coalition publishes coordinates for McInnish Park, Elm Park, Bird's Fort Trail Park, and California Crossing Park on the National Water Trail section map.",
        "sourceUrl": "https://clevermuttportal.com/_tnc_media/09_mcinnishtocalicrossing.pdf"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08055500 at 87.9 cfs / 3.41 ft",
        "note": "USGS Water Services returned same-day Elm Fork Trinity River near Carrollton discharge and gage height at 2026-08-10 17:15 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08055500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum; 200-1,000 cfs ideal; 2,000 cfs maximum caution",
        "note": "TRPA's Elm Fork Trinity page lists the Elm Fork route family, Class I character, year-round season, 100 cfs minimum, 200-1,000 cfs ideal range, 2,000 cfs maximum, and USGS Carrollton current-condition source.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/"
      },
      {
        "label": "Safety and dam context",
        "value": "Log jams, dams, and changing access",
        "note": "TRPA warns dangerous log jams can develop after flooding, and Trinity Coalition says all dams on the National Water Trail should be treated as hazardous and avoided unless current map guidance is reviewed.",
        "sourceUrl": "https://trinitycoalition.org/paddling-trail"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "Carrollton posts day-use park hours for its parks, California Crossing is a Dallas community park with parking but no campground, and no reviewed Trinity Coalition, TRPA, Carrollton, or Dallas source supports route camping.",
        "sourceUrl": "https://www.cityofcarrollton.com/parks"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded Trinity Coalition, TRPA, City of Carrollton, Dallas Parks, Commons, USGS, and same-route image review found route-context maps and photos but no clearly rights-clean exact McInnish-to-California-Crossing paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Elm+Fork+Trinity+McInnish+California+Crossing+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "Trinity Coalition paddling trail",
        "url": "https://trinitycoalition.org/paddling-trail",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition McInnish to California Crossing map",
        "url": "https://clevermuttportal.com/_tnc_media/09_mcinnishtocalicrossing.pdf",
        "provider": "local"
      },
      {
        "label": "TRPA Elm Fork Trinity River",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/",
        "provider": "local"
      },
      {
        "label": "City of Carrollton parks",
        "url": "https://www.cityofcarrollton.com/parks",
        "provider": "local"
      },
      {
        "label": "Dallas Parks California Crossing Park",
        "url": "https://www.dallasparks.org/Facilities/Facility/Details/California-Crossing-434",
        "provider": "local"
      },
      {
        "label": "USGS 08055500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08055500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08055500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08055500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "elm-fork-trinity-river-california-crossing-frasier-dam",
    "slug": "elm-fork-trinity-river-california-crossing-frasier-dam",
    "name": "Elm Fork Trinity River",
    "reach": "California Crossing Park to Frasier Dam Recreation Area",
    "aliases": [
      "Trinity River National Water Trail - California Crossing to Frasier Dam",
      "Elm Fork California Crossing to Frasier Dam",
      "California Crossing Park to Frasier Dam Recreation Area"
    ],
    "state": "Texas",
    "region": "North Texas",
    "summary": "North Texas National Water Trail run from California Crossing Park to Frasier Dam Recreation Area on the Elm Fork in Dallas. Trinity Coalition maps the route distance and both launch coordinates, while the Carrollton USGS gauge gives a direct same-river flow check.",
    "statusText": "Use the Elm Fork Trinity River near Carrollton gauge. TRPA lists 100 cfs as the Elm Fork minimum, 200-1,000 cfs as the ideal range, and 2,000 cfs as the high-water caution; Paddle Today treats this as a conservative urban Class I route.",
    "latitude": 32.868524,
    "longitude": -96.923634,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "dam",
        "mandatory_takeout",
        "private_banks"
      ],
      "safetyNotes": [
        "Take out at Frasier Dam Recreation Area for this route. The mapped National Water Trail segment ends at the dam recreation area, and every dam on the trail should be treated as hazardous unless current map guidance supports a marked portage.",
        "TRPA says dangerous log jams can develop on the Elm Fork after flooding; inspect current conditions and be ready to cancel when the corridor has fresh wood or rising water.",
        "This reach is an urban park-to-park corridor. Use the mapped public launches and do not substitute private banks, road shoulders, or unmanaged crossings for normal access."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08055500",
      "provider": "usgs",
      "siteId": "08055500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Elm Fk Trinity Rv nr Carrollton, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08055500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 100,
      "idealMin": 200,
      "idealMax": 1000,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Elm Fork Trinity River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA lists the Elm Fork as year-round and ties the corridor to USGS Carrollton, but same-day decisions should be conservative after rain, below the 100 cfs floor, near the 2,000 cfs maximum caution, or when dam and wood conditions are unclear.",
      "difficulty": "moderate",
      "difficultyNotes": "The mapped segment is Class I and about 5.5 miles, but the route stays moderate because it is release-influenced, urban, wood-prone after floods, and ends at a dam recreation area where the take-out must not be missed.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: Trinity Coalition publishes the California Crossing-to-Trammell Crow section map with California Crossing and Frasier Dam Recreation Area launch coordinates and 5.5-mile spacing; TRPA publishes the Elm Fork route family, Class I context, numeric cfs thresholds, and USGS Carrollton as a current-condition source; USGS 08055500 is product-live for the same Elm Fork corridor; Dallas park rules support day-use/no-camping handling. The route ships with no camping and a bounded no-image result."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "California Crossing Park to Frasier Dam Recreation Area, about 5.5 mi",
        "note": "Trinity Coalition's California Crossing-to-Trammell Crow section map publishes California Crossing Park and Frasier Dam Recreation Area as launch sites and gives the 5.5-mile spacing between them.",
        "sourceUrl": "https://clevermuttportal.com/_tnc_media/10_calicrossingtotrammell.pdf"
      },
      {
        "label": "Public access coordinates",
        "value": "32.868524, -96.923634 to 32.844980, -96.878471",
        "note": "Trinity Coalition publishes both launch-site coordinates on the National Water Trail section map; its Frasier Dam page separately resolves the recreation area in the Elm Fork corridor.",
        "sourceUrl": "https://clevermuttportal.com/_tnc_media/10_calicrossingtotrammell.pdf"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08055500 at 105 cfs / 3.46 ft",
        "note": "USGS Water Services returned same-day Elm Fork Trinity River near Carrollton discharge and gage height at 2026-08-11 02:15 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08055500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum; 200-1,000 cfs ideal; 2,000 cfs maximum caution",
        "note": "TRPA's Elm Fork Trinity page lists the Elm Fork route family, Class I character, year-round season, 100 cfs minimum, 200-1,000 cfs ideal range, 2,000 cfs maximum, and USGS Carrollton current-condition source.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/"
      },
      {
        "label": "Safety and dam context",
        "value": "Mandatory take-out at Frasier Dam Recreation Area",
        "note": "Trinity Coalition says every dam on the National Water Trail should be considered hazardous and avoided; its launch map tells users to review dam hazards and portage routes on the interactive map.",
        "sourceUrl": "https://trinitycoalition.org/launch-sites-map"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "Dallas park rules close public parks from 11 p.m. to 5 a.m. and prohibit overnight camping on park property except by special permit. No reviewed Trinity Coalition, TRPA, or Dallas source supports route camping on this segment.",
        "sourceUrl": "https://www.dallasparks.org/115/Park-Rules-Ordinances"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded Trinity Coalition, TRPA, Dallas Parks, Commons, USGS, and same-route image review found route-context maps and photos but no clearly rights-clean exact California-Crossing-to-Frasier-Dam paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Elm+Fork+Trinity+California+Crossing+Frasier+Dam+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "Trinity Coalition paddling trail",
        "url": "https://trinitycoalition.org/paddling-trail",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition California Crossing to Trammell Crow map",
        "url": "https://clevermuttportal.com/_tnc_media/10_calicrossingtotrammell.pdf",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition launch sites map",
        "url": "https://trinitycoalition.org/launch-sites-map",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition Frasier Dam Recreation Area",
        "url": "https://www.trinitycoalition.org/frasier-dam-recreation-area",
        "provider": "local"
      },
      {
        "label": "TRPA Elm Fork Trinity River",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/",
        "provider": "local"
      },
      {
        "label": "Dallas park rules and ordinances",
        "url": "https://www.dallasparks.org/115/Park-Rules-Ordinances",
        "provider": "local"
      },
      {
        "label": "USGS 08055500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08055500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08055500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08055500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "elm-fork-trinity-river-trinity-view-trammell-crow",
    "slug": "elm-fork-trinity-river-trinity-view-trammell-crow",
    "name": "Elm Fork Trinity River",
    "reach": "Trinity View Park to Trammell Crow Park",
    "aliases": [
      "Trinity River National Water Trail - Trinity View Park to Trammell Crow",
      "Elm Fork Trinity View Park to Trammell Crow Park",
      "Irving Trinity View launch to Sylvan Boat Ramp"
    ],
    "state": "Texas",
    "region": "North Texas",
    "summary": "Short North Texas National Water Trail run from the new Trinity View Park kayak launch in Irving to Trammell Crow Park / Sylvan Boat Ramp in Dallas. TRPA maps this 5-mile Elm Fork connector and the Carrollton USGS gauge gives a same-river flow check.",
    "statusText": "Use the Elm Fork Trinity River near Carrollton gauge. TRPA lists 100 cfs as the Elm Fork minimum, 200-1,000 cfs as the ideal range, and 2,000 cfs as the high-water caution; Paddle Today treats this as a conservative urban Class I route.",
    "latitude": 32.810622,
    "longitude": -96.906538,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "dam",
        "private_banks"
      ],
      "safetyNotes": [
        "Trinity Coalition says river conditions, access sites, and infrastructure can change, and that every dam on the National Water Trail should be treated as hazardous and avoided.",
        "TRPA says dangerous log jams can develop on the Elm Fork after flooding; inspect current conditions and be ready to cancel when the corridor has fresh wood or rising water.",
        "This is an urban park-to-park connector into the Dallas floodway. Use the mapped public launches and do not substitute private banks, levee roads, or unmanaged crossings for normal access."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08055500",
      "provider": "usgs",
      "siteId": "08055500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Elm Fk Trinity Rv nr Carrollton, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08055500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 100,
      "idealMin": 200,
      "idealMax": 1000,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Elm Fork Trinity River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA lists the Elm Fork as year-round and ties the corridor to USGS Carrollton, but same-day decisions should be conservative after rain, below the 100 cfs floor, near the 2,000 cfs maximum caution, or when dam and wood conditions are unclear.",
      "difficulty": "moderate",
      "difficultyNotes": "The mapped segment is Class I and only about five miles, but the route stays moderate because it is urban, wood-prone after floods, water-quality sensitive after runoff, and depends on current park access at both ends.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TRPA lists Trinity View Park-to-Trammell Crow Park as a 5-mile Elm Fork run and publishes Elm Fork flow bands; Trinity Coalition documents the completed Trinity View kayak launch at the southeast edge of Irving's Trinity View Park; the TRPA map link resolves the Trinity View access anchor; Dallas Parks and Trinity Coalition support the Trammell Crow/Sylvan launch; and USGS 08055500 remains the product-supported same-river gauge. USGS Water Services JSON returned a 503 during this run, so the evidence package records the same USGS site's legacy RDB current value instead of claiming a JSON read."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Trinity View Park to Trammell Crow Park, about 5 mi",
        "note": "TRPA's Elm Fork Trinity page lists Trinity View Park to Trammell Crow Park as a 5-mile featured run in the lower Elm Fork access chain.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/"
      },
      {
        "label": "Public access coordinates",
        "value": "32.810622, -96.906538 to 32.789872, -96.834669",
        "note": "TRPA's Trinity View Park map link resolves to the Irving launch access anchor, and Trinity Coalition/Dallas National Water Trail materials already publish Trammell Crow Park / Sylvan Boat Ramp as the downstream public launch anchor.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/"
      },
      {
        "label": "Completed upstream launch",
        "value": "Trinity View Park kayak launch",
        "note": "Trinity Coalition reports that Irving Parks completed the Trinity View Park kayak launch, describes it at the southeast edge of the park near parking, and says it breaks up the previously long River Legacy-to-Trammell Crow gap.",
        "sourceUrl": "https://trinitycoalition.org/articles/new-kayak-launch-at-trinity-view-park"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08055500 at 91.1 cfs / 3.42 ft",
        "note": "USGS legacy current-condition RDB returned Elm Fork Trinity River near Carrollton discharge and gage height at 2026-08-11 10:15 CDT after Water Services JSON returned a temporary 503 during this implementation run.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?cb_00060=on&cb_00065=on&format=rdb&site_no=08055500&period=P1D&legacy=1"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum; 200-1,000 cfs ideal; 2,000 cfs maximum caution",
        "note": "TRPA's Elm Fork Trinity page lists the Elm Fork route family, Class I character, year-round season, 100 cfs minimum, 200-1,000 cfs ideal range, 2,000 cfs maximum, and USGS Carrollton current-condition source.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/"
      },
      {
        "label": "Safety and access",
        "value": "Urban Class I connector with changing access and dam context",
        "note": "Trinity Coalition says access sites and river infrastructure change, users must investigate current conditions, and every dam on the National Water Trail should be treated as hazardous and avoided.",
        "sourceUrl": "https://trinitycoalition.org/paddling-trail"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "Irving posts Trinity View Park hours as sunrise to sunset; Dallas park rules close public parks overnight and prohibit overnight camping on park property except by special permit. No reviewed source supports route camping on this urban connector.",
        "sourceUrl": "https://irvingtx.gov/index.php?project=73&projectsection=13&section=park-facilities"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded Trinity Coalition, TRPA, Irving, Dallas Parks, Commons, USGS, and same-route image review found route-context maps and photos but no clearly rights-clean exact Trinity-View-to-Trammell-Crow paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Elm+Fork+Trinity+View+Trammell+Crow+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TRPA Elm Fork Trinity River",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/elm-fork-trinity-river/",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition new Trinity View launch",
        "url": "https://trinitycoalition.org/articles/new-kayak-launch-at-trinity-view-park",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition paddling trail",
        "url": "https://trinitycoalition.org/paddling-trail",
        "provider": "local"
      },
      {
        "label": "Irving Trinity View Park",
        "url": "https://irvingtx.gov/index.php?project=73&projectsection=13&section=park-facilities",
        "provider": "local"
      },
      {
        "label": "Dallas Parks Trammell Crow Park",
        "url": "https://www.dallasparks.org/Facilities/Facility/Details/Trammell-Crow-767",
        "provider": "local"
      },
      {
        "label": "Dallas park rules and ordinances",
        "url": "https://www.dallasparks.org/115/Park-Rules-Ordinances",
        "provider": "local"
      },
      {
        "label": "USGS 08055500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08055500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08055500 legacy current values",
        "url": "https://waterdata.usgs.gov/nwis/uv?cb_00060=on&cb_00065=on&format=rdb&site_no=08055500&period=P1D&legacy=1",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "west-fork-trinity-river-white-settlement-panther-island",
    "slug": "west-fork-trinity-river-white-settlement-panther-island",
    "name": "West Fork Trinity River",
    "reach": "White Settlement Road to Panther Island",
    "aliases": [
      "Trinity River National Water Trail - White Settlement to Panther Island",
      "West Fork Trinity - White Settlement Road to Panther Island",
      "White Settlement Trailhead to Panther Island"
    ],
    "state": "Texas",
    "region": "North Texas",
    "summary": "Short Fort Worth West Fork Trinity connector from White Settlement Road to Panther Island. Trinity Coalition maps this about 4.5-mile National Water Trail leg with public launch coordinates, while TRWD and Trinity Trails corroborate the launch network and the Fort Worth USGS gauge gives a same-reach flow check.",
    "statusText": "Use the West Fork Trinity River at Fort Worth gauge. TRPA lists 100 cfs as the West Fork minimum, 200 cfs as the ideal cue, and 2,000 cfs as the maximum caution; Paddle Today scores this conservatively as a 100 cfs minimum-only urban route.",
    "latitude": 32.760046,
    "longitude": -97.3871,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "dam",
        "private_banks"
      ],
      "safetyNotes": [
        "Trinity Coalition says every dam on the Trinity River Paddling Trail should be treated as hazardous and that paddlers must review current map details before launching.",
        "TRPA warns the West Fork has steep, muddy banks, log jams, a narrow channel, and high-water hazards; do not treat the short mileage as a no-check float.",
        "TRWD and Trinity Trails tell paddlers to check USGS water conditions before launching; rising stormwater, poor water quality, and trail or event closures can change the route quickly."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08048000",
      "provider": "usgs",
      "siteId": "08048000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "W Fk Trinity Rv at Ft Worth, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08048000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association West Fork Trinity River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/west-fork-trinity-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Fort Worth West Fork can be paddleable year-round, but same-day rain, flood-control releases, mud, wood, water quality, and access status matter more than season. Downgrade quickly below the 100 cfs floor, on a rising hydrograph, or when Trinity Trail access points are closed for events or flooding.",
      "difficulty": "easy",
      "difficultyNotes": "The selected connector is about 4.5 miles, but it remains an urban river route with muddy banks, possible log jams, runoff, mapped dam context on the broader trail, and public-access discipline between launch sites.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: Trinity Coalition maps White Settlement Road and Panther Island as public National Water Trail launch sites with about 4.5-mile spacing, TRWD and Trinity Trails corroborate the Fort Worth paddling launch network, TRPA provides West Fork flow guidance, and USGS 08048000 is product-live on the selected Fort Worth reach. The route ships minimum-only because the threshold source gives a broad route-family cue rather than a full route-specific scoring band."
    },
    "evidenceNotes": [
      {
        "label": "Official route system",
        "value": "Trinity River National Water Trail",
        "note": "Trinity Coalition says the National Water Trail covers 130 river miles with 21 official launch sites across the West Fork, Clear Fork, Elm Fork, and main stem.",
        "sourceUrl": "https://trinitycoalition.org/paddling-trail"
      },
      {
        "label": "Route shape and coordinates",
        "value": "White Settlement Road to Panther Island, about 4.5 mi",
        "note": "The Clear and West Forks map publishes White Settlement Road at 32.760046, -97.387100 and Panther Island at 32.759716, -97.338446, with about 4.5 miles between launch sites.",
        "sourceUrl": "https://clevermuttportal.com/_tnc_media/02_clearwestforks.pdf"
      },
      {
        "label": "Access corroboration",
        "value": "White Settlement Trailhead and Panther Island launch network",
        "note": "TRWD says it controls Fort Worth paddling trails with access at White Settlement Trailhead and Panther Island Pavilion, and the Trinity Trails launch guide gives White Settlement launch handling and Panther Island launch handling.",
        "sourceUrl": "https://www.trwd.com/trinity-paddle-trail/"
      },
      {
        "label": "Live gauge support",
        "value": "USGS 08048000 at 14.6 cfs / 0.72 ft",
        "note": "USGS Water Services returned same-day West Fork Trinity River at Fort Worth discharge and gage height at 2026-08-11 07:15 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08048000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum-only; 200 cfs ideal cue; 2,000 cfs maximum caution",
        "note": "TRPA's West Fork Trinity quick info lists Class I water, a 100 cfs minimum, 200 cfs ideal flow, and 2,000 cfs maximum, with West Fork USGS gauges linked for current conditions.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/west-fork-trinity-river/"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "Fort Worth park code restricts city park and recreation-area use outside posted open hours or permit contexts, and no reviewed trail source supports informal overnight river camping on this urban connector.",
        "sourceUrl": "https://codelibrary.amlegal.com/codes/ftworth/latest/ftworth_tx/0-0-0-25702"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded Trinity Coalition, TRWD, Trinity Trails, TRPA, Commons, USGS, and same-route image review found route-context maps and photos but no clearly rights-clean exact White-Settlement-to-Panther-Island paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=West+Fork+Trinity+White+Settlement+Panther+Island+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "Trinity Coalition paddling trail",
        "url": "https://trinitycoalition.org/paddling-trail",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition Clear and West Forks map",
        "url": "https://clevermuttportal.com/_tnc_media/02_clearwestforks.pdf",
        "provider": "local"
      },
      {
        "label": "TRWD Trinity Paddle Trail",
        "url": "https://www.trwd.com/trinity-paddle-trail/",
        "provider": "local"
      },
      {
        "label": "Trinity Trails Fort Worth paddling launch guide",
        "url": "https://trinitytrailsfw.com/wp-content/uploads/2021/01/Fort-Worth-Padding-Launch-Guide.pdf",
        "provider": "local"
      },
      {
        "label": "TRPA West Fork Trinity River",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/west-fork-trinity-river/",
        "provider": "local"
      },
      {
        "label": "Fort Worth park hours ordinance",
        "url": "https://codelibrary.amlegal.com/codes/ftworth/latest/ftworth_tx/0-0-0-25702",
        "provider": "local"
      },
      {
        "label": "USGS 08048000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08048000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08048000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08048000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "west-fork-trinity-river-panther-island-handley-ederville",
    "slug": "west-fork-trinity-river-panther-island-handley-ederville",
    "name": "West Fork Trinity River",
    "reach": "Panther Island to Handley Ederville Road",
    "aliases": [
      "Trinity River National Water Trail - Panther to Handley",
      "West Fork Trinity - Panther Island to Handley Ederville Road",
      "Panther Island to Beach Street to Handley Ederville"
    ],
    "state": "Texas",
    "region": "North Texas",
    "summary": "Fort Worth West Fork Trinity run from Panther Island through Beach Street to Handley Ederville Road. Trinity Coalition maps this National Water Trail segment with public launch coordinates and mileage, while the Fort Worth USGS gauge gives a same-reach flow check.",
    "statusText": "Use the West Fork Trinity River at Fort Worth gauge. TRPA lists 100 cfs as the West Fork minimum, 200 cfs as the ideal cue, and 2,000 cfs as the maximum caution; Paddle Today scores this conservatively as a 100 cfs minimum-only urban river route.",
    "latitude": 32.759716,
    "longitude": -97.338446,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "dam",
        "private_banks"
      ],
      "safetyNotes": [
        "Trinity Coalition says every dam on the Trinity River Paddling Trail should be treated as hazardous and that paddlers must review the map for portages and dam icons before launching.",
        "TRPA warns the West Fork has steep, muddy banks, log jams, a narrow channel, and high-water hazards; do not treat the urban setting as a controlled lazy river.",
        "TRWD and Trinity Trails tell paddlers to check USGS water conditions before launching; rising stormwater, poor water quality, and access changes can quickly change this route."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08048000",
      "provider": "usgs",
      "siteId": "08048000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "W Fk Trinity Rv at Ft Worth, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08048000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association West Fork Trinity River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/west-fork-trinity-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Fort Worth West Fork can be paddleable year-round, but same-day rain, flood-control releases, mud, wood, water quality, and access status matter more than season. The route should be downgraded quickly below the 100 cfs floor, when the hydrograph is rising, or when Trinity Trail access points are closed for events or flooding.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a long urban Class I river day, not a beginner park loop. The route covers about 13.75 miles from Panther Island through Beach Street to Handley Ederville, with muddy banks, possible log jams, urban runoff, trail-event closures, and dam awareness along the broader National Water Trail.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: Trinity Coalition and the National Recreation Trails record support the 130-mile National Water Trail, the Panther-to-Handley map publishes Panther Island, Beach Street, and Handley Ederville coordinates plus segment mileages, TRPA provides West Fork flow guidance, and USGS 08048000 is product-live on the selected Fort Worth reach. The route ships minimum-only because TRPA gives a single ideal cue rather than a route-specific scoring band."
    },
    "evidenceNotes": [
      {
        "label": "Official route system",
        "value": "Trinity River National Water Trail",
        "note": "Trinity Coalition says the National Water Trail covers 130 river miles with 21 official launch sites across the West Fork, Clear Fork, Elm Fork, and main stem, and that it received National Water Trail designation in 2020.",
        "sourceUrl": "https://trinitycoalition.org/paddling-trail"
      },
      {
        "label": "Route shape and coordinates",
        "value": "Panther Island to Beach Street to Handley Ederville, about 13.75 mi",
        "note": "The Panther-to-Handley map publishes Panther Island at 32.759716, -97.338446, Beach Street at 32.753179, -97.287571, and Handley Ederville Road at 32.782252, -97.221388, with about 7 miles to Beach Street and about 6.75 more miles to Handley Ederville.",
        "sourceUrl": "https://clevermuttportal.com/_tnc_media/03_panthertohandley.pdf"
      },
      {
        "label": "Live gauge support",
        "value": "USGS 08048000 at 13.7 cfs / 0.71 ft",
        "note": "USGS Water Services returned same-day West Fork Trinity River at Fort Worth discharge and gage height at 2026-08-10 06:15 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08048000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum-only; 200 cfs ideal cue; 2,000 cfs maximum caution",
        "note": "TRPA's West Fork Trinity quick info lists Class I water, a 100 cfs minimum, 200 cfs ideal flow, and 2,000 cfs maximum, with West Fork USGS gauges linked for current conditions.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/west-fork-trinity-river/"
      },
      {
        "label": "Safety context",
        "value": "Dam awareness, muddy banks, log jams, and changing access",
        "note": "Trinity Coalition says all dams on the trail should be avoided and checked on the interactive map; TRPA notes steep muddy banks, log jams, a narrow channel, and high-water hazards; Trinity Trails tells paddlers to check USGS water conditions.",
        "sourceUrl": "https://trinitycoalition.org/paddling-trail"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "Fort Worth city code makes it unlawful to camp in a city park or recreation area outside allowed contexts, and Trinity Trails generally posts public trail hours rather than overnight river-camping support, so this urban segment is treated as day-use only.",
        "sourceUrl": "https://codelibrary.amlegal.com/codes/ftworth/latest/ftworth_tx/0-0-0-25702"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded Trinity Coalition, TRWD, TRPA, Commons, USGS, and same-route image review found route-context maps and photos but no clearly rights-clean exact Panther-Island-to-Handley paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=West+Fork+Trinity+River+Panther+Island+Handley+Ederville+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "Trinity Coalition paddling trail",
        "url": "https://trinitycoalition.org/paddling-trail",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition Panther to Handley map",
        "url": "https://clevermuttportal.com/_tnc_media/03_panthertohandley.pdf",
        "provider": "local"
      },
      {
        "label": "TRPA West Fork Trinity River",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/west-fork-trinity-river/",
        "provider": "local"
      },
      {
        "label": "Trinity Trails paddling guidance",
        "url": "https://trinitytrailsfw.com/paddling/",
        "provider": "local"
      },
      {
        "label": "Fort Worth park code",
        "url": "https://codelibrary.amlegal.com/codes/ftworth/latest/ftworth_tx/0-0-0-25702",
        "provider": "local"
      },
      {
        "label": "USGS 08048000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08048000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08048000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08048000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "west-fork-trinity-river-handley-ederville-river-legacy",
    "slug": "west-fork-trinity-river-handley-ederville-river-legacy",
    "name": "West Fork Trinity River",
    "reach": "Handley Ederville Road to River Legacy Park",
    "aliases": [
      "Trinity River National Water Trail - Handley to River Legacy",
      "West Fork Trinity - Handley Ederville to River Legacy Park",
      "Handley Ederville Road to River Legacy Park"
    ],
    "state": "Texas",
    "region": "North Texas",
    "summary": "Mid-Cities West Fork Trinity run from Handley Ederville Road to River Legacy Park in Arlington. Trinity Coalition maps this National Water Trail segment with public launch coordinates and 13.25 miles, while TRPA names the same reach and the Fort Worth West Fork gauge gives a same-river flow check.",
    "statusText": "Use the West Fork Trinity River at Fort Worth gauge. TRPA lists 100 cfs as the West Fork minimum, 200 cfs as the ideal cue, and 2,000 cfs as the maximum caution; Paddle Today scores this conservatively as a 100 cfs minimum-only urban river route.",
    "latitude": 32.782252,
    "longitude": -97.221388,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "dam",
        "private_banks"
      ],
      "safetyNotes": [
        "Trinity Coalition says every dam on the Trinity River Paddling Trail should be treated as hazardous and that paddlers must review the map for portages and dam icons before launching.",
        "TRPA specifically names the Handley Ederville-to-River Legacy Park stretch as one of the long West Fork runs and warns that steep muddy banks, log jams, narrow channel, and high water can create hazards.",
        "River Legacy Park has the improved take-out, but the approach is still an urban river corridor; check same-day water, access, storm runoff, and park hours before committing to the full 13.25 miles."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08048000",
      "provider": "usgs",
      "siteId": "08048000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "W Fk Trinity Rv at Ft Worth, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08048000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association West Fork Trinity River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/west-fork-trinity-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Mid-Cities West Fork can be paddleable year-round, but same-day rain, urban runoff, mud, wood, water quality, and access status matter more than season. The route should be downgraded quickly below the 100 cfs floor, when the hydrograph is rising, or when River Legacy Park hours or access conditions do not support the shuttle.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a long Class I urban river day, not the shorter River Legacy out-and-back. The 13.25-mile shuttle run has limited normal exits, steep muddy banks away from the mapped launches, possible log jams, urban runoff, heat, and dam awareness along the broader National Water Trail.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: Trinity Coalition and the National Water Trail map publish Handley Ederville Road and River Legacy Park launch coordinates plus 13.25-mile spacing, TRPA independently names the same route and gives West Fork flow guidance, TPWD corroborates River Legacy Park as a public paddling access, and USGS 08048000 is product-live on the upstream West Fork corridor. The route ships minimum-only because TRPA gives a broad West Fork floor rather than a route-specific scoring band."
    },
    "evidenceNotes": [
      {
        "label": "Official route system",
        "value": "Trinity River National Water Trail",
        "note": "Trinity Coalition says the National Water Trail covers 130 river miles with 21 official launch sites across the West Fork, Clear Fork, Elm Fork, and main stem, and that it received National Water Trail designation in 2020.",
        "sourceUrl": "https://trinitycoalition.org/paddling-trail"
      },
      {
        "label": "Route shape and coordinates",
        "value": "Handley Ederville Road to River Legacy Park, about 13.25 mi",
        "note": "The Handley-to-River-Legacy map publishes Handley Ederville Road at 32.782252, -97.221388 and River Legacy Park at 32.788243, -97.100328, with about 13.25 miles to River Legacy Park.",
        "sourceUrl": "https://clevermuttportal.com/_tnc_media/04_handleytoriverlegacy.pdf"
      },
      {
        "label": "Independent route context",
        "value": "TRPA names Handley Ederville to River Legacy Park",
        "note": "TRPA identifies Handley-Ederville Road Paddling Trail to River Legacy Park as a 13.25-mile West Fork stretch and lists it among West Fork launch-site maps.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/west-fork-trinity-river/"
      },
      {
        "label": "Live gauge support",
        "value": "USGS 08048000 at 14.6 cfs / 0.72 ft",
        "note": "USGS Water Services returned same-day West Fork Trinity River at Fort Worth discharge and gage height at 2026-08-10 15:15 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08048000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum-only; 200 cfs ideal cue; 2,000 cfs maximum caution",
        "note": "TRPA's West Fork Trinity quick info lists Class I water, a 100 cfs minimum, 200 cfs ideal flow, and 2,000 cfs maximum, with West Fork USGS gauges linked for current conditions.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/west-fork-trinity-river/"
      },
      {
        "label": "River Legacy access",
        "value": "Public access at 32.7882, -97.1003",
        "note": "TPWD publishes River Legacy Park Access Site as a West Fork Trinity River paddling access and says the launch is next to the pedestrian bridge inside River Legacy Parks.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/river-legacy-parks/"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "River Legacy Park posts 5 a.m.-10 p.m. public park hours and no source reviewed supports overnight river camping along this urban West Fork route, so the route is treated as day-use only.",
        "sourceUrl": "https://riverlegacy.org/visit"
      },
      {
        "label": "Safety context",
        "value": "Dam awareness, muddy banks, log jams, and changing access",
        "note": "Trinity Coalition says all dams on the trail should be avoided and checked on the interactive map; TRPA notes steep muddy banks, log jams, a narrow channel, high-water hazards, and water-quality concerns.",
        "sourceUrl": "https://trinitycoalition.org/paddling-trail"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded Trinity Coalition, TPWD, River Legacy, TRPA, Commons, USGS, and same-route image review found route-context maps and photos but no clearly rights-clean exact Handley-to-River-Legacy paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=West+Fork+Trinity+River+Handley+River+Legacy+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "Trinity Coalition paddling trail",
        "url": "https://trinitycoalition.org/paddling-trail",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition Handley to River Legacy map",
        "url": "https://clevermuttportal.com/_tnc_media/04_handleytoriverlegacy.pdf",
        "provider": "local"
      },
      {
        "label": "TRPA West Fork Trinity River",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/west-fork-trinity-river/",
        "provider": "local"
      },
      {
        "label": "TPWD River Legacy Parks Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/river-legacy-parks/",
        "provider": "local"
      },
      {
        "label": "River Legacy visit information",
        "url": "https://riverlegacy.org/visit",
        "provider": "local"
      },
      {
        "label": "USGS 08048000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08048000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08048000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08048000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "trinity-river-trammell-crow-loop-12",
    "slug": "trinity-river-trammell-crow-loop-12",
    "name": "Trinity River",
    "reach": "Trammell Crow Park to Loop 12 Boat Ramp",
    "aliases": [
      "Dallas Trinity Paddling Trail",
      "Trammell Crow Park to Loop 12",
      "Sylvan Boat Ramp to Loop 12 Boat Ramp"
    ],
    "state": "Texas",
    "region": "Prairies and Lakes",
    "routeType": "whitewater",
    "summary": "Official Dallas Trinity Paddling Trail from Trammell Crow Park / Sylvan Boat Ramp through Moore Park and the Dallas Wave area to the Loop 12 Boat Ramp. TPWD and Trinity Coalition publish the point-to-point access chain and route distances, while the Dallas USGS gauge gives a direct same-river condition check.",
    "statusText": "Use the Trinity River at Dallas gauge inside the route corridor. Treat about 100 cfs as the conservative TRPA main-stem floor, keep the Dallas Wave / Moore Park stop as a mandatory scout or portage decision, and avoid high or rising water near 2,000 cfs.",
    "latitude": 32.7900,
    "longitude": -96.8347,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "whitewater",
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "private_banks"
      ],
      "safetyNotes": [
        "TPWD identifies Dallas Wave / Santa Fe Avenue as the midpoint access and says paddlers can portage around the whitewater feature or run it; conservative route planning should scout and portage unless the group is intentionally prepared for that feature.",
        "Trinity Coalition says all dams on the National Water Trail should be considered hazardous and avoided, and that dam portage details must be checked on the interactive map before paddling.",
        "TPWD notes a fish-consumption advisory for this Dallas section; TRPA highlights urban pollution concerns, and same-day paddlers should avoid contact after rain, spills, or rising runoff."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08057000",
      "provider": "usgs",
      "siteId": "08057000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Trinity Rv at Dallas, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08057000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Main Stem Trinity River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/main-stem-trinity-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA lists the Dallas main-stem route as year-round and ties it to the Dallas USGS gauge, but this is an urban floodway and forest corridor. Same-day decisions should be conservative after rain, near the 100 cfs floor, near the 2,000 cfs high-water caution, or when Dallas Wave / dam-portage conditions are unclear.",
      "difficulty": "moderate",
      "difficultyNotes": "TPWD describes a channelized first half and a natural wood-lined second half. The whitewater routeType and advanced safety profile are used because TRPA lists the Dallas route family as Class I-IV and the Dallas Wave / dam feature requires a real scout or portage decision.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TPWD publishes the 10.2-mile Dallas Trinity Paddling Trail, Trammell Crow / Dallas Wave / Loop 12 access coordinates, float-time ranges, private-bank limits, and fish-consumption advisory context; Trinity Coalition confirms the National Water Trail launch-site map, Trammell-to-Loop-12 segment map, dam-warning policy, and changing-access caveat; USGS 08057000 is a product-supported Dallas gauge in the route corridor; and TRPA publishes Dallas main-stem numeric flow cues. The route ships minimum-only because the numeric thresholds are corridor guidance rather than a manager-authored route-specific scoring band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Trammell Crow Park to Loop 12, 10.2 mi",
        "note": "TPWD identifies the Dallas Trinity Paddling Trail as a 10.2-mile route with a 3.7-mile Trammell Crow-to-Dallas Wave section and a 6.5-mile Dallas Wave-to-Loop-12 section.",
        "sourceUrl": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/dallas-trinity/"
      },
      {
        "label": "Public access coordinates",
        "value": "32.789872, -96.834669 to 32.707197, -96.735997",
        "note": "Trinity Coalition's Trammell-to-Loop-12 map publishes Trammell Crow Park, Moore Park, and Loop 12 Boat Ramp launch-site coordinates and distances.",
        "sourceUrl": "https://clevermuttportal.com/_tnc_media/07_trammeltoloop12.pdf"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08057000 at 374 cfs / 11.82 ft",
        "note": "USGS Water Services returned same-day Trinity River at Dallas discharge and gage height at 2026-08-10 06:30 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08057000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum-only; 400 cfs ideal cue; 2,000 cfs maximum caution",
        "note": "TRPA's main-stem Trinity page lists the Dallas official trails, Class I-IV, 100 cfs minimum, 400 cfs ideal flow, 2,000 cfs maximum flow, and the Dallas USGS gauge for current conditions.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/main-stem-trinity-river/"
      },
      {
        "label": "Safety and dam context",
        "value": "Dallas Wave scout or portage; all dams avoided",
        "note": "TPWD identifies the Dallas Wave access and portage/run option; Trinity Coalition says all dams should be considered hazardous and avoided unless current map guidance shows the route-specific handling.",
        "sourceUrl": "https://trinitycoalition.org/paddling-trail"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "Dallas city code prohibits overnight camping on park property except by special permit; no route, trail, or park source supports informal riverbank camping on this urban day route.",
        "sourceUrl": "https://codelibrary.amlegal.com/codes/dallas/latest/dallas_tx/0-0-0-115006"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TPWD, Trinity Coalition, TRPA, Commons, USGS, and same-route image review found route-context photos and maps but no clearly rights-clean exact Trammell-Crow-to-Loop-12 paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Dallas+Trinity+Paddling+Trail+Trammell+Crow+Loop+12+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TPWD Dallas Trinity Paddling Trail",
        "url": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/dallas-trinity/",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition paddling trail",
        "url": "https://trinitycoalition.org/paddling-trail",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition Trammell to Loop 12 map",
        "url": "https://clevermuttportal.com/_tnc_media/07_trammeltoloop12.pdf",
        "provider": "local"
      },
      {
        "label": "TRPA Main Stem Trinity River",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/main-stem-trinity-river/",
        "provider": "local"
      },
      {
        "label": "Dallas city park code",
        "url": "https://codelibrary.amlegal.com/codes/dallas/latest/dallas_tx/0-0-0-115006",
        "provider": "local"
      },
      {
        "label": "USGS 08057000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08057000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08057000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08057000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "west-fork-trinity-river-river-legacy-trammell-crow",
    "slug": "west-fork-trinity-river-river-legacy-trammell-crow",
    "name": "West Fork Trinity River",
    "reach": "River Legacy Park to Trammell Crow Park",
    "aliases": [
      "Trinity River National Water Trail - River Legacy to Trammell Crow",
      "West Fork Trinity - River Legacy Park to Trammell Crow Park",
      "River Legacy Park to Sylvan Boat Ramp"
    ],
    "state": "Texas",
    "region": "North Texas",
    "routeType": "recreational",
    "summary": "Long urban Trinity National Water Trail segment from River Legacy Park in Arlington to Trammell Crow Park / Sylvan Boat Ramp in Dallas. Trinity Coalition maps the 24.75-mile point-to-point segment with public launch coordinates, while TRPA West Fork guidance and the direct Grand Prairie USGS gauge support a conservative same-day flow check.",
    "statusText": "Use the West Fork Trinity River at Grand Prairie gauge. Treat 100 cfs as the conservative West Fork minimum, 200 cfs as the ideal cue, and 2,000 cfs as the high-water caution; near-floor or rising water makes this 24.75-mile urban day a poor choice.",
    "latitude": 32.788243,
    "longitude": -97.100328,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "dam",
        "private_banks"
      ],
      "safetyNotes": [
        "This is the longest mapped Trinity National Water Trail leg in the current Texas inventory; treat it as an all-day urban river commitment with limited normal exits.",
        "Trinity Coalition says every dam on the Trinity River Paddling Trail should be considered hazardous and that paddlers must review the current map for portages and dam icons before launching.",
        "TRPA warns that steep muddy banks, log jams, a narrow channel, and high water can pose hazards on the West Fork. Do not substitute unmanaged road crossings or private banks for the planned take-out."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08049500",
      "provider": "usgs",
      "siteId": "08049500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "W Fk Trinity Rv at Grand Prairie, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08049500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association West Fork Trinity River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/west-fork-trinity-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The West Fork can be paddleable year-round, but this segment is long enough that same-day rain, urban runoff, mud, wood, water quality, wind, heat, and park access status matter more than season. Downgrade quickly below 100 cfs, on a rising hydrograph, or when the River Legacy or Trammell Crow access story is not current.",
      "difficulty": "hard",
      "difficultyNotes": "The water is generally Class I, but the 24.75-mile distance, urban runoff, low-water mud, wood, limited normal exits, dam awareness, heat, and shuttle logistics make this an advanced planning day rather than a casual park float.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: Trinity Coalition publishes the River Legacy Park and Trammell Crow Park launch coordinates plus 24.75-mile spacing, TRPA independently names the River Legacy-to-Trammell Crow continuation and gives West Fork flow guidance, USGS 08049500 is a direct product-supported gauge inside the selected corridor, Dallas and River Legacy sources support day-use park handling, and the route ships minimum-only because the threshold source is broad West Fork guidance rather than a route-specific scoring band."
    },
    "evidenceNotes": [
      {
        "label": "Official route system",
        "value": "Trinity River National Water Trail",
        "note": "Trinity Coalition says the National Water Trail covers 130 river miles with 21 official launch sites across the West Fork, Clear Fork, Elm Fork, and main stem, and that it received National Water Trail designation in 2020.",
        "sourceUrl": "https://trinitycoalition.org/paddling-trail"
      },
      {
        "label": "Route shape and coordinates",
        "value": "River Legacy Park to Trammell Crow Park, about 24.75 mi",
        "note": "The River-Legacy-to-Trammell-Crow map publishes River Legacy Park at 32.788243, -97.100328 and Trammell Crow Park at 32.789872, -96.834669, with about 24.75 miles to Trammell Crow Park.",
        "sourceUrl": "https://clevermuttportal.com/_tnc_media/05c06_riverlegacytotrammellcrow.pdf"
      },
      {
        "label": "Independent route context",
        "value": "TRPA names River Legacy Park to Trammell Crow Park",
        "note": "TRPA identifies continuing or starting from River Legacy Park to Trammell Crow Park at Sylvan Avenue as a 24-mile West Fork option and links the Trinity Coalition maps for obstacles and dam portages.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/west-fork-trinity-river/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08049500 at 197 cfs / 2.36 ft",
        "note": "USGS Water Services returned same-day West Fork Trinity River at Grand Prairie discharge and gage height at 2026-08-10 19:30 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08049500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "100 cfs minimum-only; 200 cfs ideal cue; 2,000 cfs maximum caution",
        "note": "TRPA's West Fork Trinity quick info lists Class I water, a 100 cfs minimum, 200 cfs ideal flow, and 2,000 cfs maximum, with West Fork USGS gauges linked for current conditions.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/trinity-river/west-fork-trinity-river/"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "River Legacy Park posts 5 a.m.-10 p.m. park hours, Dallas park rules close parks from 11 p.m. to 5 a.m., and Dallas city code prohibits overnight camping on park property except by special permit; no reviewed source supports informal riverbank camping on this urban route.",
        "sourceUrl": "https://www.dallasparks.org/115/Park-Rules-Ordinances"
      },
      {
        "label": "Safety context",
        "value": "Long mileage, dam awareness, muddy banks, log jams, and changing access",
        "note": "Trinity Coalition says all dams on the trail should be avoided and checked on the interactive map; TRPA notes steep muddy banks, log jams, a narrow channel, high-water hazards, and water-quality concerns.",
        "sourceUrl": "https://trinitycoalition.org/paddling-trail"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded Trinity Coalition, TPWD, River Legacy, Dallas Parks, TRPA, Commons, USGS, and same-route image review found route-context maps and photos but no clearly rights-clean exact River-Legacy-to-Trammell-Crow paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=West+Fork+Trinity+River+River+Legacy+Trammell+Crow+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "Trinity Coalition paddling trail",
        "url": "https://trinitycoalition.org/paddling-trail",
        "provider": "local"
      },
      {
        "label": "Trinity Coalition River Legacy to Trammell Crow map",
        "url": "https://clevermuttportal.com/_tnc_media/05c06_riverlegacytotrammellcrow.pdf",
        "provider": "local"
      },
      {
        "label": "TRPA West Fork Trinity River",
        "url": "https://txrivers.org/discover-texas-rivers/trinity-river/west-fork-trinity-river/",
        "provider": "local"
      },
      {
        "label": "River Legacy visit information",
        "url": "https://riverlegacy.org/visit",
        "provider": "local"
      },
      {
        "label": "Dallas park rules",
        "url": "https://www.dallasparks.org/115/Park-Rules-Ordinances",
        "provider": "local"
      },
      {
        "label": "Dallas city park code",
        "url": "https://codelibrary.amlegal.com/codes/dallas/latest/dallas_tx/0-0-0-115006",
        "provider": "local"
      },
      {
        "label": "USGS 08049500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08049500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08049500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08049500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "rio-grande-mariscal-canyon-talley-solis",
    "slug": "rio-grande-mariscal-canyon-talley-solis",
    "name": "Rio Grande",
    "reach": "Talley to Solis",
    "aliases": [
      "Mariscal Canyon",
      "Talley to Solis Landing",
      "Rio Grande Mariscal Canyon"
    ],
    "state": "Texas",
    "region": "Big Bend",
    "routeType": "whitewater",
    "summary": "Remote Mariscal Canyon route through the shortest Big Bend Rio Grande canyon, from Talley to Solis. NPS names the public access plan, 10-mile route, Class II-III character, permit requirements, and high-clearance road constraints, while American Whitewater ties the run to the Rio Grande Village USGS gauge.",
    "statusText": "Use the Rio Grande at Rio Grande Village gauge as the selected product-supported flow check. Treat about 200 cfs as the conservative floor, 300-1000 cfs as the strongest open-boat window, and avoid novice or open-boat plans when the river is high, rising, or above the NPS high-water caution cues.",
    "latitude": 28.9832,
    "longitude": -103.184,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "NPS describes Mariscal as a remote day or overnight canyon trip with a few Class II-III rapids, high-clearance access roads, and a long shuttle; check River Road conditions before committing.",
        "American Whitewater identifies Rock Pile and Tight Squeeze as the named rapid features, with the route often treated as a multi-day trip because of the shuttle rather than mileage alone.",
        "NPS requires a backcountry river permit before launching, Type I/III/V PFDs in Mariscal, spare equipment, overnight waste/fire-pan systems when camping, and camps placed above the high-water mark and out of arroyos."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08375300",
      "provider": "usgs",
      "siteId": "08375300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Rio Grande at Rio Grande Village, Big Bnd NP, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08375300/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 200,
      "idealMin": 300,
      "idealMax": 1000,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "NPS Mariscal Canyon and American Whitewater flow guidance",
        "url": "https://www.nps.gov/rigr/planyourvisit/mariscal_cyn.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "Mariscal can be a day or overnight trip when access roads, weather, and water cooperate, but Big Bend river decisions are highly sensitive to low-water dragging, summer heat, storms, flash rises, and remote shuttle logistics. NPS says the canyon can be floated in a day above 300 cfs and open boats should use caution above 1000 cfs.",
      "difficulty": "hard",
      "difficultyNotes": "The whitewater routeType and advanced profile reflect a remote Class II-III desert canyon, rough high-clearance access roads, limited exits, permit and camping rules, low-water dragging risk, and named rapid features rather than raw mileage.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: NPS names Talley as the Mariscal put-in and Solis as the common take-out, describes the 10-mile canyon, high-clearance access, Class II-III rapids, backcountry permit requirement, and 300 cfs day-float cue; American Whitewater publishes the 10.2-mile Mariscal Canyon reach, access coordinates, Rio Grande Village gauge relationship, and 200 cfs recommended floor; USGS 08375300 is product-live. The route ships two-sided but currently below floor because USGS Water Services returned 30.4 cfs during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Talley to Solis, about 10 mi",
        "note": "NPS identifies Mariscal Canyon as the shortest Big Bend canyon at 10 miles, with Talley as the put-in and Solis as the common take-out; American Whitewater lists the same reach at 10.2 miles.",
        "sourceUrl": "https://www.nps.gov/rigr/planyourvisit/mariscal_cyn.htm"
      },
      {
        "label": "Public access coordinates",
        "value": "28.98320, -103.18400 to 29.04430, -103.10600",
        "note": "American Whitewater publishes the put-in and take-out access anchors for Mariscal Canyon; NPS confirms Talley and Solis as the normal access locations and warns that high-clearance vehicles are usually required.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/111304"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08375300 at 30.4 cfs / 2.32 ft",
        "note": "USGS Water Services returned same-day Rio Grande at Rio Grande Village discharge and gage height at 2026-08-10 11:00 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08375300&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "200 cfs floor; 300-1000 cfs preferred open-boat window; 2000 cfs high-water caution",
        "note": "American Whitewater gives Mariscal a lowest recommended flow of 200 cfs; NPS says Mariscal can be floated in a day above 300 cfs and open boats should use caution above 1000 cfs. NPS river regulations add high-water equipment cautions at 2000 cfs for Mariscal and other canyon sections.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1824/main"
      },
      {
        "label": "Camping and permits",
        "value": "NPS backcountry permit required; overnight-capable with restricted zones",
        "note": "NPS requires a backcountry use permit before watercraft is placed on the Rio Grande in Big Bend and restricts camping near vehicle-accessible river-road sites unless separately permitted; overnight plans must use legal river camps above the high-water mark.",
        "sourceUrl": "https://www.nps.gov/rigr/planyourvisit/riverregs.htm"
      },
      {
        "label": "Safety",
        "value": "Remote roads, Rock Pile, Tight Squeeze, heat, sudden rises",
        "note": "NPS warns about rough River Road access and remote logistics; American Whitewater identifies Rock Pile and Tight Squeeze as the main named Class II features, and NPS river regulations require self-sufficient safety gear and rapid scouting.",
        "sourceUrl": "https://www.nps.gov/rigr/planyourvisit/mariscal_cyn.htm"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded NPS, American Whitewater, TRPA, Commons, USGS, and same-route review found route-context photos but no clearly rights-clean exact Talley-to-Solis paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Mariscal+Canyon+Talley+Solis+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Mariscal Canyon",
        "url": "https://www.nps.gov/rigr/planyourvisit/mariscal_cyn.htm",
        "provider": "local"
      },
      {
        "label": "NPS river regulations",
        "url": "https://www.nps.gov/rigr/planyourvisit/riverregs.htm",
        "provider": "local"
      },
      {
        "label": "NPS river trips",
        "url": "https://www.nps.gov/bibe/planyourvisit/river-trips.htm",
        "provider": "local"
      },
      {
        "label": "NPS river camping advisory",
        "url": "https://www.nps.gov/bibe/planyourvisit/river-camping.htm",
        "provider": "local"
      },
      {
        "label": "American Whitewater Mariscal Canyon",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1824/main",
        "provider": "local"
      },
      {
        "label": "American Whitewater Mariscal put-in",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/111304",
        "provider": "local"
      },
      {
        "label": "American Whitewater Mariscal take-out",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/116572",
        "provider": "local"
      },
      {
        "label": "TRPA Mariscal Canyon",
        "url": "https://txrivers.org/discover-texas-rivers/big-bend-trans-pecos/mariscal-canyon-talley-solis-10-miles/",
        "provider": "local"
      },
      {
        "label": "USGS 08375300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08375300/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08375300 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08375300&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "rio-grande-lajitas-santa-elena-canyon",
    "slug": "rio-grande-lajitas-santa-elena-canyon",
    "name": "Rio Grande",
    "reach": "Lajitas to Santa Elena Canyon River Access",
    "aliases": [
      "Santa Elena Canyon",
      "Lajitas to Santa Elena Canyon",
      "Rio Grande Santa Elena Canyon"
    ],
    "state": "Texas",
    "region": "Big Bend",
    "routeType": "whitewater",
    "summary": "Big Bend's classic Santa Elena Canyon trip from Lajitas to the Santa Elena Canyon River Access. NPS and American Whitewater document the public access pair, overnight route shape, Rock Slide rapid, permits, and Castolon gauge flow guidance.",
    "statusText": "Use the Rio Grande near Castolon gauge. Treat about 150 cfs as the conservative canoe/kayak floor, 300-600 cfs as the NPS open-boat sweet spot, and avoid novice trips above 600 cfs or any high/rising water near the canyon rapids.",
    "latitude": 29.26453,
    "longitude": -103.78302,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "NPS flags Rock Slide about two miles into the canyon as Class IV at certain levels and says novices should reconsider any trip above 600 cfs.",
        "American Whitewater lists Santa Elena as II(III) with several Class II rapids and undercut-rock/sieve risk at Rock Slide; scout or portage from river right when the line is not clear.",
        "NPS requires a backcountry river permit for every Rio Grande river trip in Big Bend, Type I/III/V PFDs in Santa Elena, extra group gear, waste systems for overnight trips, and camps above the high-water mark."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08374550",
      "provider": "usgs",
      "siteId": "08374550",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Rio Grande nr Castolon, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08374550/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 150,
      "idealMin": 300,
      "idealMax": 600,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "NPS Santa Elena Canyon and American Whitewater flow guidance",
        "url": "https://www.nps.gov/bibe/planyourvisit/secyn.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "Santa Elena can run year-round when water and weather cooperate, but Big Bend river decisions are highly sensitive to heat, storms, upstream rises, and low-water dragging. NPS says 300-600 cfs is great for open boats, novices should reconsider above 600 cfs, and river parties should check current CFS before launching.",
      "difficulty": "hard",
      "difficultyNotes": "The route is marked whitewater because the last canyon miles include named Class II rapids and Rock Slide, which NPS classifies as Class IV at certain levels and American Whitewater rates as the central Class III hazard. The difficulty also reflects remote canyon logistics, permits, camping rules, heat, limited exits, and a committed shuttle.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: NPS names the Lajitas-to-Santa-Elena overnight route, its 13-mile approach, seven-mile canyon section, Rock Slide hazard, permit requirement, and 300-600 cfs open-boat guidance; American Whitewater publishes the same 20.6-mile Lajitas-to-Santa-Elena route, access coordinates, II(III) rating, Castolon gauge, and 150 cfs canoe/kayak floor; and USGS 08374550 is a product-supported direct gauge near the canyon. The route ships two-sided but currently below floor because USGS Water Services returned 3.36 cfs during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Lajitas to Santa Elena Canyon River Access, about 20.6 mi",
        "note": "NPS describes Santa Elena downstream as an overnight or three-day trip with the first 13 miles from Lajitas followed by seven more technical canyon miles; American Whitewater lists the same reach at 20.6 miles.",
        "sourceUrl": "https://www.nps.gov/bibe/planyourvisit/secyn.htm"
      },
      {
        "label": "Public access coordinates",
        "value": "29.264526, -103.783020 to 29.155590, -103.598946",
        "note": "American Whitewater's map data publishes Lajitas River Access and Santa Elena Canyon River Access as access points with coordinates; NPS confirms the put-in and take-out are accessible by car.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1826/map"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08374550 at 3.36 cfs / 1.86 ft",
        "note": "USGS Water Services returned same-day Rio Grande near Castolon discharge and gage height at 2026-08-10 08:15 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08374550&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "150 cfs floor; 300-600 cfs open-boat band; 2,000 cfs high-water safety cue",
        "note": "American Whitewater says Santa Elena can be canoed or kayaked as a two-day trip down to 150 cfs; NPS says 300-600 cfs is great for open boats and novices should reconsider above 600 cfs. NPS river regulations add a 2,000 cfs high-water equipment/permit caution for Santa Elena and other major canyon sections.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1826/main"
      },
      {
        "label": "Camping and permits",
        "value": "NPS backcountry permit required; overnight-capable with restricted zones",
        "note": "NPS requires a backcountry river permit for day-use and overnight Rio Grande river trips in Big Bend and prohibits camping in specific Santa Elena / Castolon zones; overnight plans must use legal river camps above the high-water mark.",
        "sourceUrl": "https://www.nps.gov/bibe/planyourvisit/riverregs.htm"
      },
      {
        "label": "Safety",
        "value": "Rock Slide, named rapids, heat, sudden rises, remote canyon",
        "note": "NPS highlights Rock Slide as the largest rapid and Class IV at certain levels; American Whitewater details Class II approach rapids, Rock Slide hazards, undercut rocks, sieves, and scout/portage handling.",
        "sourceUrl": "https://www.nps.gov/bibe/planyourvisit/secyn.htm"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded NPS, American Whitewater, Commons, USGS, and same-route image review found route-context photos but no clearly rights-clean exact Lajitas-to-Santa-Elena paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Santa+Elena+Canyon+Rio+Grande+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Santa Elena Canyon",
        "url": "https://www.nps.gov/bibe/planyourvisit/secyn.htm",
        "provider": "local"
      },
      {
        "label": "NPS river regulations",
        "url": "https://www.nps.gov/bibe/planyourvisit/riverregs.htm",
        "provider": "local"
      },
      {
        "label": "NPS river trips",
        "url": "https://www.nps.gov/bibe/planyourvisit/river-trips.htm",
        "provider": "local"
      },
      {
        "label": "American Whitewater Santa Elena Canyon",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1826/main",
        "provider": "local"
      },
      {
        "label": "American Whitewater Santa Elena map",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1826/map",
        "provider": "local"
      },
      {
        "label": "USGS 08374550 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08374550/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08374550 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08374550&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "rio-grande-rio-grande-village-heath-canyon",
    "slug": "rio-grande-rio-grande-village-heath-canyon",
    "name": "Rio Grande",
    "reach": "Rio Grande Village to Heath Canyon",
    "aliases": [
      "Boquillas Canyon",
      "Rio Grande Village to La Linda",
      "Rio Grande Wild & Scenic River - Boquillas Canyon"
    ],
    "state": "Texas",
    "region": "Big Bend",
    "routeType": "whitewater",
    "summary": "Remote Boquillas Canyon overnight route from the Rio Grande Village river access through Big Bend National Park and the Rio Grande Wild & Scenic River to the Heath Canyon take-out near La Linda. NPS and American Whitewater publish the public endpoint plan, permit requirements, camping limits, and Class I-II canyon character, while USGS 08375300 gives a direct same-reach condition check.",
    "statusText": "Use the Rio Grande at Rio Grande Village gauge. Treat 150 cfs as the conservative recommended floor for app scoring, expect this route to read low below that level, and only launch with current NPS permit, heat, water, camping, and Heath Canyon take-out logistics confirmed.",
    "latitude": 29.17984,
    "longitude": -102.96085,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "American Whitewater lists Boquillas Canyon as Class I-II and flags Arroyo del Veinte near the lower canyon as a Class II boulder feature that can flip canoes at lower flows; scout and portage if the line is unclear.",
        "NPS requires backcountry river permits, self-sufficient safety gear, human-waste handling for overnight trips, camping above the high-water mark, and conservative decisions around sudden rises, storms, and remote rescue.",
        "NPS river regulations and camping advisories restrict camping near developed, private, and vehicle-accessible areas, including the early Boquillas Canyon Trail vicinity and Heath Canyon/private ranch areas without approval."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08375300",
      "provider": "usgs",
      "siteId": "08375300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Rio Grande at Rio Grande Village, Big Bnd NP, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08375300/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 150,
      "thresholdSource": {
        "label": "American Whitewater Boquillas Canyon flow guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1821/main",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "NPS manages Boquillas Canyon as a year-round river trip but warns that summer heat is extreme, thunderstorms can create flash-flood conditions, and river levels must be checked before launch. The 150 cfs floor is conservative route scoring; American Whitewater notes the reach has been navigated below 100 cfs but recommends 150 cfs or higher.",
      "difficulty": "hard",
      "difficultyNotes": "The whitewater routeType and advanced risk level reflect a 33- to 35-mile remote desert canyon with Class I-II rapids, mandatory permits, limited bailouts, heat exposure, camping restrictions, and a long Heath Canyon shuttle rather than technical difficulty alone.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: NPS publishes Boquillas Canyon as a 33-mile Rio Grande Village-to-Heath Canyon overnight route with public access, permit, camping, and Heath Canyon limited-use-permit requirements; American Whitewater publishes the same route family, access coordinates, Class I-II rating, and 150 cfs recommended minimum; USGS 08375300 is a product-supported direct gauge at Rio Grande Village. The route ships minimum-only and currently-low because same-day USGS Water Services returned 30.4 cfs, well below the supported recommendation."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Rio Grande Village to Heath Canyon, about 33 mi",
        "note": "NPS identifies Boquillas Canyon as a two- to three-day trip beginning at Rio Grande Village and ending at Heath Canyon downstream from La Linda.",
        "sourceUrl": "https://www.nps.gov/rigr/planyourvisit/boq_cyn.htm"
      },
      {
        "label": "Public access coordinates",
        "value": "29.17984, -102.96085 to 29.45025, -102.82346",
        "note": "American Whitewater access pages publish Rio Grande Village river access and Heath Canyon Ranch / La Linda access coordinates; NPS confirms the same route endpoints and TPWD-operated Heath Canyon permit requirement.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/106685"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08375300 at 30.4 cfs / 2.32 ft",
        "note": "USGS Water Services returned same-day Rio Grande at Rio Grande Village discharge and gage height at 2026-08-10 07:00 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08375300&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "150 cfs minimum-only",
        "note": "American Whitewater recommends 150 cfs or higher for kayaks and rafts on Boquillas Canyon, while noting the reach has been paddled below 100 cfs; this route uses the recommended value as the app-supported floor.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1821/main"
      },
      {
        "label": "Camping and permits",
        "value": "NPS backcountry permit required; restricted camping zones",
        "note": "NPS requires a backcountry river permit before launching and publishes river camping restrictions around developed, private, and vehicle-accessible areas; overnight plans must use legal river camps and respect high-water and private-property limits.",
        "sourceUrl": "https://www.nps.gov/bibe/planyourvisit/riverregs.htm"
      },
      {
        "label": "Safety",
        "value": "Remote desert canyon, Class I-II, heat and sudden rises",
        "note": "NPS river regulations and river-trip guidance require self-sufficient safety gear and current conditions checks; American Whitewater identifies Arroyo del Veinte as the main Class II feature in the lower canyon.",
        "sourceUrl": "https://www.nps.gov/bibe/planyourvisit/river-trips.htm"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded NPS, American Whitewater, Commons, USGS, and same-route image review found route-context photos but no clearly rights-clean exact Rio-Grande-Village-to-Heath-Canyon paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Boquillas+Canyon+Rio+Grande+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Boquillas Canyon",
        "url": "https://www.nps.gov/rigr/planyourvisit/boq_cyn.htm",
        "provider": "local"
      },
      {
        "label": "NPS river regulations",
        "url": "https://www.nps.gov/bibe/planyourvisit/riverregs.htm",
        "provider": "local"
      },
      {
        "label": "NPS river camping advisory",
        "url": "https://www.nps.gov/bibe/planyourvisit/river-camping.htm",
        "provider": "local"
      },
      {
        "label": "American Whitewater Boquillas Canyon",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1821/main",
        "provider": "local"
      },
      {
        "label": "American Whitewater Rio Grande Village access",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/106685",
        "provider": "local"
      },
      {
        "label": "American Whitewater Heath Canyon access",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/106693",
        "provider": "local"
      },
      {
        "label": "USGS 08375300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08375300/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08375300 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08375300&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "rio-grande-gravel-pit-rio-grande-village",
    "slug": "rio-grande-gravel-pit-rio-grande-village",
    "name": "Rio Grande",
    "reach": "Gravel Pit to Rio Grande Village",
    "aliases": [
      "Hot Springs Canyon",
      "Gravel Pit to Rio Grande Village",
      "Rio Grande Hot Springs Canyon"
    ],
    "state": "Texas",
    "region": "Big Bend",
    "routeType": "recreational",
    "summary": "Short Big Bend National Park day float through Hot Springs Canyon from the Gravel Pit river access on River Road East to the Rio Grande Village take-out. NPS publishes the five-mile route, the 30 cfs canoe/kayak low-flow cue, no-overnight rule for the stretch, high-clearance road caveats, and river-permit requirements, with USGS 08375300 providing the direct same-corridor gauge.",
    "statusText": "Use the Rio Grande Village gauge. The route is currently just above NPS's 30 cfs canoe/kayak floor, but expect slow first miles, shallow riffles, heat, high-clearance access, and a same-day NPS permit and road-condition check before launch.",
    "latitude": 29.151417,
    "longitude": -103.002417,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "NPS calls Hot Springs Canyon gentle at most levels, but says the first couple miles can be slow and require paddling; below or near 30 cfs, shallow dragging and exposed riffles should be expected.",
        "Gravel Pit access is on River Road East and requires a high-clearance vehicle. NPS warns River Road and Gravel Pit Road can become extremely muddy or impassable after rain.",
        "NPS river regulations still require a backcountry river permit before watercraft is placed on the Rio Grande within Big Bend, and the permit does not authorize entry into Mexico."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08375300",
      "provider": "usgs",
      "siteId": "08375300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Rio Grande at Rio Grande Village, Big Bnd NP, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08375300/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 30,
      "thresholdSource": {
        "label": "NPS Hot Springs Canyon flow guidance",
        "url": "https://www.nps.gov/rigr/planyourvisit/floating-hot-springs-canyon.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "NPS says Hot Springs Canyon is spring-fed enough to be possible in a canoe or small kayak down to 30 cfs, but Big Bend heat, storms, flash rises, River Road condition, and low-water dragging still make same-day checks mandatory.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is technically gentle at most levels, but stays moderate because access requires high-clearance River Road logistics, a river permit, heat and storm judgment, border/private-land discipline, and low-flow shallow-water handling.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: NPS publishes the Gravel Pit-to-Rio-Grande-Village Hot Springs Canyon day float, five-mile distance, no-overnight rule, high-clearance access, 30 cfs canoe/kayak floor, and required river permit; NPS also documents Gravel Pit river access and Rio Grande Village take-out context; USGS 08375300 is the same Rio Grande Village direct gauge. The route ships minimum-only and barely above floor because USGS returned 31.5 cfs at Rio Grande Village during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Gravel Pit to Rio Grande Village, about 5 mi",
        "note": "NPS identifies Hot Springs Canyon as a half-day float from the Gravel Pit put-in along River Road East to the Rio Grande Village take-out.",
        "sourceUrl": "https://www.nps.gov/rigr/planyourvisit/floating-hot-springs-canyon.htm"
      },
      {
        "label": "Public access coordinates",
        "value": "29.151417, -103.002417 to 29.179840, -102.960850",
        "note": "NPS documents Gravel Pit river-bank access and Rio Grande Village as the take-out; published Gravel Pit coordinate references are stored as access anchors rather than guessed wetted-edge launch points.",
        "sourceUrl": "https://www.nps.gov/bibe/planyourvisit/campsites_gravelpit.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08375300 at 31.5 cfs / 2.33 ft",
        "note": "USGS legacy RDB returned same-day Rio Grande at Rio Grande Village gage height and discharge at 2026-08-10 13:00 CDT during this implementation run.",
        "sourceUrl": "https://nwis.waterdata.usgs.gov/tx/nwis/uv?cb_00060=on&cb_00065=on&format=rdb&site_no=08375300&period=P1D&legacy=1"
      },
      {
        "label": "Threshold posture",
        "value": "30 cfs minimum-only",
        "note": "NPS says the spring-recharged Hot Springs Canyon stretch is possible in a canoe or small kayak down to 30 cfs.",
        "sourceUrl": "https://www.nps.gov/rigr/planyourvisit/floating-hot-springs-canyon.htm"
      },
      {
        "label": "Camping and permits",
        "value": "Day float only; permitted Gravel Pit basecamp nearby",
        "note": "NPS says there is no overnight camping along the Hot Springs Canyon stretch, so the route is day-use only; Gravel Pit itself has primitive roadside campsites that require a separate backcountry permit.",
        "sourceUrl": "https://www.nps.gov/bibe/planyourvisit/campsites_gravelpit.htm"
      },
      {
        "label": "Safety",
        "value": "Low water, heat, high-clearance access, permit and border rules",
        "note": "NPS documents low-water paddling, River Road mud and high-clearance requirements, mandatory river permits, no Mexico entry, required PFDs, storm/high-water caution, and day-only camping limits.",
        "sourceUrl": "https://www.nps.gov/rigr/planyourvisit/riverregs.htm"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded NPS, Commons, USGS, and same-route review found route-context photos but no clearly rights-clean exact Gravel-Pit-to-Rio-Grande-Village paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Hot+Springs+Canyon+Rio+Grande+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Hot Springs and San Vicente Canyons",
        "url": "https://www.nps.gov/rigr/planyourvisit/floating-hot-springs-canyon.htm",
        "provider": "local"
      },
      {
        "label": "NPS Gravel Pit campsites and river access",
        "url": "https://www.nps.gov/bibe/planyourvisit/campsites_gravelpit.htm",
        "provider": "local"
      },
      {
        "label": "NPS Rio Grande river regulations",
        "url": "https://www.nps.gov/rigr/planyourvisit/riverregs.htm",
        "provider": "local"
      },
      {
        "label": "USGS 08375300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08375300/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08375300 legacy current values",
        "url": "https://nwis.waterdata.usgs.gov/tx/nwis/uv?cb_00060=on&cb_00065=on&format=rdb&site_no=08375300&period=P1D&legacy=1",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-prong-medina-river-3rd-crossing-freeman-crossing",
    "slug": "north-prong-medina-river-3rd-crossing-freeman-crossing",
    "name": "North Prong Medina River",
    "reach": "3rd Crossing to Freeman Crossing",
    "aliases": [
      "3rd Crossing of FR2107 to Freeman Crossing at SH16",
      "North Prong Medina 3rd Crossing to Freeman Crossing",
      "Medina River 3rd Crossing to Freeman Crossing"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "routeType": "whitewater",
    "summary": "North Prong Medina day run from 3rd Crossing of FR 2107 to Freeman Crossing at SH 16. TRPA publishes this 6.6-mile featured run, map-link access anchors, Class I-III corridor context, private-bank rules, and Medina flow bands tied to the product-supported Patterson Road gauge downstream.",
    "statusText": "Use the Medina River at Patterson Road gauge. Treat 50 cfs as the North Prong floor, 300-1,500 cfs as the preferred window, and 2,000 cfs as the high-water ceiling; current readings below the floor mean scraping and dragging are likely.",
    "latitude": 29.8763326,
    "longitude": -99.3483821,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "low_head_dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "TRPA frames the Medina corridor as Class I-III and says the North Prong above Medina is a rain-dependent whitewater stream; casual flatwater groups should skip this route.",
        "TRPA calls out Chamblee Falls on the North Prong as a 10 ft drop followed soon by another 4 ft drop. Treat the upper North Prong corridor as scout-required whitewater and portage any drop, ledge, fence, or crossing that is not clearly within the group's ability.",
        "All low-water crossings should be treated as hazards. Scout road crossings, limestone drops, wood, fences, and blind bends rather than assuming the mapped access anchor is a safe water-entry line.",
        "TRPA says almost all land along the Medina River is private and paddlers should use public road crossings for access; do not use private banks for casual stops or camps."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-0817887350",
      "provider": "usgs",
      "siteId": "0817887350",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Medina Rv at Patterson Rd at Medina, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-0817887350/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 50,
      "idealMin": 300,
      "idealMax": 1500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Medina River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/medina-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA describes the North Prong above Medina as a rain-dependent whitewater and fly-fishing stream, while the broader Medina can be too low in drought or flood after sustained rainfall. Use same-day gauge trend, rainfall, and visible water before committing.",
      "difficulty": "hard",
      "difficultyNotes": "The route is short enough for a half day, but the Class I-III posture, North Prong drop hazards, low-water crossings, public-road-access limitations, private banks, wood, and fast Hill Country rises make this an advanced whitewater-hidden entry rather than a casual Explore route.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TRPA lists 3rd Crossing of FR 2107-to-Freeman Crossing at SH 16 as a 6.6-mile North Prong Medina featured run, publishes map links that resolve to exact endpoint access anchors, says to use public road crossings because almost all adjacent property is private, and provides 50 / 300-1,500 / 2,000 cfs North Prong guidance. USGS 0817887350 is a product-supported direct gauge downstream at Patterson Road and returned current discharge and stage during this implementation run."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "3rd Crossing of FR 2107 to Freeman Crossing at SH 16, 6.6 mi",
        "note": "TRPA lists 3rd Crossing of FR 2107-to-Freeman Crossing at SH 16 as a North Prong Medina featured run and gives the route mileage.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Public access coordinates",
        "value": "29.8763326, -99.3483821 to 29.85418, -99.2796359",
        "note": "TRPA's 3rd Crossing and Freeman Crossing map links resolve to these Google Maps coordinates; they are stored as access anchors, with final water-entry adjusted to current signs, road-shoulder conditions, and safe banks.",
        "sourceUrl": "https://goo.gl/maps/BbWtmumhsmS1VB2x5"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 0817887350 at 47.4 cfs / 4.69 ft",
        "note": "USGS Water Services returned same-day Medina River at Patterson Road discharge and gage height at 2026-08-12 00:55 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=0817887350&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "50 cfs North Prong floor; 300-1,500 cfs ideal; 2,000 cfs ceiling",
        "note": "TRPA says the North Prong minimum is 50 cfs, the Medina is ideal around 300-1,500 cfs, and the river should not be attempted above about 2,000 cfs.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Camping",
        "value": "No public on-route camping selected",
        "note": "TRPA says the only public camping along the Medina River is Pioneer River Resort in Bandera, downstream from this selected North Prong reach; no road-crossing, gravel-bar, or private-bank camping is inferred.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Safety",
        "value": "Class I-III, North Prong drops, low-water crossings, private banks, drought, floods and wood",
        "note": "TRPA frames the Medina corridor as Class I-III, says the North Prong is known for whitewater after rain, calls out Chamblee Falls and a second drop, warns that high flows above about 300 cfs require stronger navigation skill, and says all low-water crossings are potential hazards.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TRPA, Commons, USGS, Medina/Bandera local tourism, and same-route web review found route-context photos but no clearly rights-clean exact 3rd-Crossing-to-Freeman-Crossing paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=North+Prong+Medina+3rd+Crossing+Freeman+Crossing+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TRPA Medina River",
        "url": "https://txrivers.org/discover-texas-rivers/medina-river/",
        "provider": "local"
      },
      {
        "label": "TRPA 3rd Crossing map link",
        "url": "https://goo.gl/maps/BbWtmumhsmS1VB2x5",
        "provider": "local"
      },
      {
        "label": "TRPA Freeman Crossing map link",
        "url": "https://goo.gl/maps/fU2Nkd5gk9XZGo9X7",
        "provider": "local"
      },
      {
        "label": "USGS 0817887350 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-0817887350/",
        "provider": "usgs"
      },
      {
        "label": "USGS 0817887350 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=0817887350&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-prong-medina-river-freeman-crossing-moffett-park",
    "slug": "north-prong-medina-river-freeman-crossing-moffett-park",
    "name": "North Prong Medina River",
    "reach": "Freeman Crossing to Moffett Park",
    "aliases": [
      "Freeman Crossing at SH 16 to Moffett Park",
      "North Prong Medina Freeman Crossing to Medina",
      "Medina River Freeman Crossing to Moffett Park"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "routeType": "whitewater",
    "summary": "North Prong Medina day run from Freeman Crossing at SH 16 to Moffett Park in Medina. TRPA publishes this 6.3-mile featured run, map-link access anchors, Class I-III corridor context, private-bank rules, and Medina flow bands tied to the product-supported Patterson Road gauge.",
    "statusText": "Use the Medina River at Patterson Road gauge. Treat 50 cfs as the North Prong floor, 300-1,500 cfs as the preferred window, and 2,000 cfs as the high-water ceiling; current readings just below the floor mean scraping and dragging are likely.",
    "latitude": 29.85418,
    "longitude": -99.2796359,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "TRPA frames the Medina corridor as Class I-III and says the North Prong is a rain-dependent whitewater stream; casual flatwater groups should skip this route.",
        "All low-water crossings should be treated as hazards. Scout road crossings, limestone drops, wood, fences, and blind bends rather than assuming the mapped access anchor is a safe water-entry line.",
        "TRPA says almost all land along the Medina River is private and paddlers should use public road crossings for access; do not use private banks for casual stops or camps."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-0817887350",
      "provider": "usgs",
      "siteId": "0817887350",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Medina Rv at Patterson Rd at Medina, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-0817887350/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 50,
      "idealMin": 300,
      "idealMax": 1500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Medina River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/medina-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA describes the North Prong above Medina as a rain-dependent whitewater and fly-fishing stream, while the broader Medina can be too low in drought or flood after sustained rainfall. Use same-day gauge trend, rainfall, and visible water before committing.",
      "difficulty": "hard",
      "difficultyNotes": "The route is short enough for a half day, but the Class I-III posture, low-water crossings, public-road-access limitations, private banks, wood, and fast Hill Country rises make this an advanced whitewater-hidden entry rather than a casual Explore route.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TRPA lists Freeman Crossing at SH 16-to-Moffett Park as a 6.3-mile North Prong Medina featured run, publishes map links that resolve to exact endpoint access anchors, says to use public road crossings because almost all adjacent property is private, and provides 50 / 300-1,500 / 2,000 cfs North Prong guidance. USGS 0817887350 is a product-supported direct gauge at Patterson Road beside the downstream Moffett Park end and returned current discharge and stage during this implementation run."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "Freeman Crossing at SH 16 to Moffett Park, 6.3 mi",
        "note": "TRPA lists Freeman Crossing at SH 16-to-Moffett Park in Medina as a North Prong Medina featured run and gives the route mileage.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Public access coordinates",
        "value": "29.85418, -99.2796359 to 29.7945195, -99.2490676",
        "note": "TRPA's Freeman Crossing and Moffett Park map links resolve to these Google Maps coordinates; they are stored as access anchors, with final water-entry adjusted to current signs, road-shoulder conditions, and safe banks.",
        "sourceUrl": "https://goo.gl/maps/fU2Nkd5gk9XZGo9X7"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 0817887350 at 48.5 cfs / 4.70 ft",
        "note": "USGS Water Services returned same-day Medina River at Patterson Road discharge and gage height at 2026-08-11 10:40 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=0817887350&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "50 cfs North Prong floor; 300-1,500 cfs ideal; 2,000 cfs ceiling",
        "note": "TRPA says the North Prong minimum is 50 cfs, the Medina is ideal around 300-1,500 cfs, and the river should not be attempted above about 2,000 cfs.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Camping",
        "value": "No public on-route camping selected",
        "note": "TRPA says the only public camping along the Medina River is Pioneer River Resort in Bandera, downstream from this selected North Prong reach; no road-crossing, gravel-bar, or private-bank camping is inferred.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Safety",
        "value": "Class I-III, low-water crossings, private banks, drought, floods and wood",
        "note": "TRPA frames the Medina corridor as Class I-III, says high flows above about 300 cfs require stronger navigation skills, warns of drought dragging and floods, and says all low-water crossings are potential hazards.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TRPA, Commons, USGS, Medina/Bandera local tourism, and same-route web review found route-context photos but no clearly rights-clean exact Freeman-Crossing-to-Moffett-Park paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=North+Prong+Medina+Freeman+Crossing+Moffett+Park+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TRPA Medina River",
        "url": "https://txrivers.org/discover-texas-rivers/medina-river/",
        "provider": "local"
      },
      {
        "label": "TRPA Freeman Crossing map link",
        "url": "https://goo.gl/maps/fU2Nkd5gk9XZGo9X7",
        "provider": "local"
      },
      {
        "label": "TRPA Moffett Park map link",
        "url": "https://goo.gl/maps/p3BBMx6Ue4M9Bc7U7",
        "provider": "local"
      },
      {
        "label": "USGS 0817887350 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-0817887350/",
        "provider": "usgs"
      },
      {
        "label": "USGS 0817887350 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=0817887350&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "medina-river-moffett-park-bandina-camp-road",
    "slug": "medina-river-moffett-park-bandina-camp-road",
    "name": "Medina River",
    "reach": "Moffett Park to Bandina Camp Road",
    "aliases": [
      "Moffett Park to Bandina Camp Road",
      "Medina River Moffett Park to Bandina Camp",
      "Medina River near Medina"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "routeType": "recreational",
    "summary": "Upper Medina River day trip from Moffett Park in Medina to the Bandina Camp Road crossing. TRPA publishes this 6.7-mile route, access-map coordinates, private-bank cautions, Medina River flow bands, and direct USGS current-condition links for the same river corridor.",
    "statusText": "Use the Medina River at Patterson Road gauge. Treat 30 cfs as the lower Medina minimum, 300-1,500 cfs as the preferred window, and 2,000 cfs as the high-water ceiling; current readings near the floor can mean dragging and slow gravel-bar travel.",
    "latitude": 29.79452,
    "longitude": -99.24907,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "TRPA says almost all land along the Medina River is private and paddlers should use public road crossings for access; do not treat nearby banks as casual stops or camps.",
        "TRPA warns the Medina can be very low in drought and that high flows require sound navigation skills. At and below about 20 cfs, dragging over rock or gravel bars should be expected.",
        "Use same-day USGS 0817887350, recent rain, and local weather before launch because Hill Country rivers can rise quickly after storms and wood can shift between public crossings."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-0817887350",
      "provider": "usgs",
      "siteId": "0817887350",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Medina Rv at Patterson Rd at Medina, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-0817887350/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 30,
      "idealMin": 300,
      "idealMax": 1500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Medina River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/medina-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA frames the Medina as runnable when water is present but cautions that drought can make levels too low and floods can make the river hazardous. Use the Patterson Road gauge for this upper Medina segment and recheck storms, wood, and access before leaving a shuttle.",
      "difficulty": "moderate",
      "difficultyNotes": "The selected reach is Class I-II water in normal conditions, but it stays moderate because the route relies on public road-crossing access, mostly private banks, low-water dragging risk, wood, and fast Hill Country rises.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TRPA lists Moffett Park-to-Bandina Camp Road as a 6.7-mile featured Medina River run, publishes map links that resolve to exact endpoint coordinates, says to use public road crossings because almost all adjacent property is private, and provides 30 / 300-1,500 / 2,000 cfs Medina flow guidance. USGS 0817887350 is a product-supported direct gauge at Patterson Road near the put-in and returned same-day discharge and stage during this implementation run."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "Moffett Park, Medina to Bandina Camp Road, 6.7 mi",
        "note": "TRPA lists Moffett Park to Bandina Camp Road as one of its Medina River featured runs and gives the route mileage.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Public access coordinates",
        "value": "29.7945195, -99.2490676 to 29.7677822, -99.1882724",
        "note": "TRPA's Moffett Park and Bandina Camp Road map links resolve to these Google Maps coordinates; they are stored as access anchors, with final water-entry adjusted to current signs and bank conditions on arrival.",
        "sourceUrl": "https://goo.gl/maps/p3BBMx6Ue4M9Bc7U7"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 0817887350 at 49.6 cfs / 4.71 ft",
        "note": "USGS Water Services returned same-day Medina River at Patterson Road discharge and gage height at 2026-08-10 19:10 CDT during this implementation run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=0817887350&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "30 cfs floor; 300-1,500 cfs ideal; 2,000 cfs ceiling",
        "note": "TRPA says the Medina needs about 30 cfs from town of Medina and below, is ideal around 300-1,500 cfs, and should not be attempted above about 2,000 cfs.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Camping",
        "value": "No public on-route camping selected",
        "note": "TRPA says the only public camping along the Medina River is Pioneer River Resort in Bandera, downstream from this selected reach; do not infer legal camping from private banks or road crossings.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Safety",
        "value": "Private banks, low water, floods, wood and road-crossing access",
        "note": "TRPA warns that almost all adjacent property is private, public road crossings should be used for access, low flows can mean dragging, and high flows over about 300 cfs require stronger navigation skills.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TRPA, Commons, USGS, local tourism, and same-route web review found route-context photos but no clearly rights-clean exact Moffett-Park-to-Bandina-Camp-Road paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Medina+River+Moffett+Park+Bandina+Camp+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TRPA Medina River",
        "url": "https://txrivers.org/discover-texas-rivers/medina-river/",
        "provider": "local"
      },
      {
        "label": "TRPA Moffett Park map link",
        "url": "https://goo.gl/maps/p3BBMx6Ue4M9Bc7U7",
        "provider": "local"
      },
      {
        "label": "TRPA Bandina Camp Road map link",
        "url": "https://goo.gl/maps/wsx8FdYN8Tyeo9Vw6",
        "provider": "local"
      },
      {
        "label": "USGS 0817887350 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-0817887350/",
        "provider": "usgs"
      },
      {
        "label": "USGS 0817887350 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=0817887350&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "medina-river-bandina-camp-road-peaceful-valley",
    "slug": "medina-river-bandina-camp-road-peaceful-valley",
    "name": "Medina River",
    "reach": "Bandina Camp Road to Peaceful Valley Road",
    "aliases": [
      "Bandina Camp Road to Peaceful Valley Road",
      "Medina River Bandina Camp to Peaceful Valley",
      "Medina River near Bandera"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "routeType": "recreational",
    "summary": "Short upper Medina River day trip from the Bandina Camp Road crossing to Peaceful Valley Road. TRPA publishes this 3.5-mile featured run, access-map coordinates, public-road-crossing access framing, private-bank cautions, Medina River flow bands, and USGS current-condition links for the same river corridor.",
    "statusText": "Use the Medina River at Patterson Road gauge, with the Bandera gauge as a downstream cross-check. Treat 30 cfs as the lower-Medina floor, 300-1,500 cfs as the preferred window, and 2,000 cfs as the high-water ceiling.",
    "latitude": 29.7677822,
    "longitude": -99.1882724,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "TRPA says almost all land along the Medina River is private and paddlers should use public road crossings for access; do not treat nearby banks as casual stops or camps.",
        "TRPA warns the Medina can be very low in drought and that high flows require sound navigation skills. At and below about 20 cfs, dragging over rock or gravel bars should be expected.",
        "Use same-day USGS 0817887350, downstream USGS 08178880, recent rain, and local weather before launch because Hill Country rivers can rise quickly after storms and wood can shift between public crossings."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-0817887350",
      "provider": "usgs",
      "siteId": "0817887350",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Medina Rv at Patterson Rd at Medina, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-0817887350/"
    },
    "fallbackGaugeSources": [
      {
        "id": "usgs-08178880",
        "provider": "usgs",
        "siteId": "08178880",
        "metric": "discharge_cfs",
        "unit": "cfs",
        "kind": "direct",
        "siteName": "Medina Rv at Bandera, TX",
        "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08178880/"
      }
    ],
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 30,
      "idealMin": 300,
      "idealMax": 1500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Medina River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/medina-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA frames the Medina as runnable when water is present but cautions that drought can make levels too low and floods can make the river hazardous. Use the Patterson Road gauge plus the downstream Bandera gauge to sanity-check this between-gages reach before leaving a shuttle.",
      "difficulty": "moderate",
      "difficultyNotes": "The selected reach is Class I-II water in normal conditions, but it stays moderate because the route relies on public road-crossing access, mostly private banks, low-water dragging risk, wood, and fast Hill Country rises.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TRPA lists Bandina Camp Road-to-Peaceful Valley Road Crossing as a 3.5-mile featured Medina River run, publishes map links that resolve to exact endpoint access anchors, says to use public road crossings because almost all adjacent property is private, and provides 30 / 300-1,500 / 2,000 cfs Medina flow guidance. USGS 0817887350 and downstream 08178880 are product-supported same-river gauges with current discharge and stage during this implementation run."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "Bandina Camp Road to Peaceful Valley Road Crossing, 3.5 mi",
        "note": "TRPA lists Bandina Camp Road to Peaceful Valley Road Crossing as one of its Medina River featured runs and gives the route mileage.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Public access coordinates",
        "value": "29.7677822, -99.1882724 to 29.7439466, -99.1487218",
        "note": "TRPA's Bandina Camp Road and Peaceful Valley Road map links resolve to these Google Maps coordinates; they are stored as access anchors, with final water-entry adjusted to current signs and bank conditions on arrival.",
        "sourceUrl": "https://goo.gl/maps/wsx8FdYN8Tyeo9Vw6"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 0817887350 at 49.6 cfs / 4.71 ft; USGS 08178880 at 59.0 cfs / 4.29 ft",
        "note": "USGS Water Services returned same-day Medina River discharge and gage height at 2026-08-11 03:40 CDT for Patterson Road and 2026-08-11 03:45 CDT for Bandera.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=0817887350,08178880&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "30 cfs floor; 300-1,500 cfs ideal; 2,000 cfs ceiling",
        "note": "TRPA says the Medina needs about 30 cfs from town of Medina and below, is ideal around 300-1,500 cfs, and should not be attempted above about 2,000 cfs.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Camping",
        "value": "No public on-route camping selected",
        "note": "TRPA says the only public camping along the Medina River is Pioneer River Resort in Bandera, downstream from this selected reach; do not infer legal camping from private banks or road crossings.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Safety",
        "value": "Private banks, low water, floods, wood and road-crossing access",
        "note": "TRPA warns that almost all adjacent property is private, public road crossings should be used for access, low flows can mean dragging, and high flows over about 300 cfs require stronger navigation skills.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TRPA, Commons, USGS, local tourism, and same-route web review found route-context photos but no clearly rights-clean exact Bandina-Camp-Road-to-Peaceful-Valley paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Medina+River+Bandina+Peaceful+Valley+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TRPA Medina River",
        "url": "https://txrivers.org/discover-texas-rivers/medina-river/",
        "provider": "local"
      },
      {
        "label": "TRPA Bandina Camp Road map link",
        "url": "https://goo.gl/maps/wsx8FdYN8Tyeo9Vw6",
        "provider": "local"
      },
      {
        "label": "TRPA Peaceful Valley Road map link",
        "url": "https://goo.gl/maps/DmfPYhf1dufnwZ7R6",
        "provider": "local"
      },
      {
        "label": "USGS 0817887350 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-0817887350/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08178880 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08178880/",
        "provider": "usgs"
      },
      {
        "label": "USGS Medina Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=0817887350,08178880&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "medina-river-peaceful-valley-ranger-crossing",
    "slug": "medina-river-peaceful-valley-ranger-crossing",
    "name": "Medina River",
    "reach": "Peaceful Valley Road to Ranger Crossing",
    "aliases": [
      "Peaceful Valley Road to Ranger Crossing",
      "Medina River Peaceful Valley to Ranger",
      "Medina River near Bandera"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "routeType": "recreational",
    "summary": "Short Medina River day trip from Peaceful Valley Road Crossing to Ranger Crossing at Highway 16. TRPA publishes this 3.8-mile featured run, map-link access anchors, public-road-crossing access framing, private-bank cautions, Medina River flow bands, and USGS current-condition links for the same river corridor.",
    "statusText": "Use the Medina River at Patterson Road gauge, with the Bandera gauge as a downstream cross-check. Treat 30 cfs as the lower-Medina floor, 300-1,500 cfs as the preferred window, and 2,000 cfs as the high-water ceiling.",
    "latitude": 29.7439466,
    "longitude": -99.1487218,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "TRPA says almost all land along the Medina River is private and paddlers should use public road crossings for access; do not treat nearby banks as casual stops or camps.",
        "TRPA warns the Medina can be very low in drought and that high flows require sound navigation skills. At and below about 20 cfs, dragging over rock or gravel bars should be expected.",
        "Use same-day USGS 0817887350, downstream USGS 08178880, recent rain, and local weather before launch because Hill Country rivers can rise quickly after storms and wood can shift between public crossings."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-0817887350",
      "provider": "usgs",
      "siteId": "0817887350",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Medina Rv at Patterson Rd at Medina, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-0817887350/"
    },
    "fallbackGaugeSources": [
      {
        "id": "usgs-08178880",
        "provider": "usgs",
        "siteId": "08178880",
        "metric": "discharge_cfs",
        "unit": "cfs",
        "kind": "direct",
        "siteName": "Medina Rv at Bandera, TX",
        "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08178880/"
      }
    ],
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 30,
      "idealMin": 300,
      "idealMax": 1500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Medina River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/medina-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA frames the Medina as runnable when water is present but cautions that drought can make levels too low and floods can make the river hazardous. Use the Patterson Road gauge plus the downstream Bandera gauge to sanity-check this between-gages reach before leaving a shuttle.",
      "difficulty": "moderate",
      "difficultyNotes": "The selected reach is Class I-II water in normal conditions, but it stays moderate because the route relies on public road-crossing access, mostly private banks, low-water dragging risk, wood, and fast Hill Country rises.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TRPA lists Peaceful Valley Road Crossing-to-Ranger Crossing at Highway 16 as a 3.8-mile featured Medina River run, publishes map links that resolve to exact endpoint access anchors, says to use public road crossings because almost all adjacent property is private, and provides 30 / 300-1,500 / 2,000 cfs Medina flow guidance. USGS 0817887350 and downstream 08178880 are product-supported same-river gauges with current discharge and stage during this implementation run."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "Peaceful Valley Road Crossing to Ranger Crossing at Hwy 16, 3.8 mi",
        "note": "TRPA lists Peaceful Valley Road Crossing to Ranger Crossing at Hwy 16 as one of its Medina River featured runs and gives the route mileage.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Public access coordinates",
        "value": "29.7439466, -99.1487218 to 29.7369976, -99.1232512",
        "note": "TRPA's Peaceful Valley Road and Ranger Crossing map links resolve to these Google Maps coordinates; they are stored as access anchors, with final water-entry adjusted to current signs and bank conditions on arrival.",
        "sourceUrl": "https://goo.gl/maps/DmfPYhf1dufnwZ7R6"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 0817887350 at 49.6 cfs / 4.71 ft; USGS 08178880 at 59.0 cfs / 4.29 ft",
        "note": "USGS Water Services returned same-day Medina River discharge and gage height at 2026-08-11 06:10 CDT for Patterson Road and 2026-08-11 05:45 CDT for Bandera.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=0817887350,08178880&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "30 cfs floor; 300-1,500 cfs ideal; 2,000 cfs ceiling",
        "note": "TRPA says the Medina needs about 30 cfs from town of Medina and below, is ideal around 300-1,500 cfs, and should not be attempted above about 2,000 cfs.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Camping",
        "value": "No public on-route camping selected",
        "note": "TRPA says the only public camping along the Medina River is Pioneer River Resort in Bandera, downstream from this selected reach; do not infer legal camping from private banks or road crossings.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Safety",
        "value": "Private banks, low water, floods, wood and road-crossing access",
        "note": "TRPA warns that almost all adjacent property is private, public road crossings should be used for access, low flows can mean dragging, and high flows over about 300 cfs require stronger navigation skills.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TRPA, Commons, USGS, local tourism, and same-route web review found route-context photos but no clearly rights-clean exact Peaceful-Valley-to-Ranger-Crossing paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Medina+River+Peaceful+Valley+Ranger+Crossing+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TRPA Medina River",
        "url": "https://txrivers.org/discover-texas-rivers/medina-river/",
        "provider": "local"
      },
      {
        "label": "TRPA Peaceful Valley Road map link",
        "url": "https://goo.gl/maps/DmfPYhf1dufnwZ7R6",
        "provider": "local"
      },
      {
        "label": "TRPA Ranger Crossing map link",
        "url": "https://goo.gl/maps/jMhjipXcZYmEC6qN7",
        "provider": "local"
      },
      {
        "label": "USGS 0817887350 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-0817887350/",
        "provider": "usgs"
      },
      {
        "label": "USGS 08178880 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08178880/",
        "provider": "usgs"
      },
      {
        "label": "USGS Medina Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=0817887350,08178880&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "medina-river-ranger-crossing-bandera-city-park",
    "slug": "medina-river-ranger-crossing-bandera-city-park",
    "name": "Medina River",
    "reach": "Ranger Crossing to Bandera City Park",
    "aliases": [
      "SH 16 Ranger Crossing to Bandera City Park",
      "Medina River Ranger Crossing to Bandera",
      "Ranger Crossing to Bandera City Park Medina"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "routeType": "recreational",
    "summary": "Bandera-area Medina River day trip from Ranger Crossing at Highway 16 to Bandera City Park. American Whitewater publishes this public access-to-access reach, endpoint coordinates, Class I-II context, low-water-crossing hazards, and the direct Bandera USGS gauge; Bandera City Park publishes current day-use rules, no-camping rules, and dam-area restrictions for the take-out.",
    "statusText": "Use the Medina River at Bandera gauge directly at the take-out. Treat 30 cfs as the lower-Medina floor, 300-1,500 cfs as the preferred window, and 2,000 cfs as the high-water ceiling; American Whitewater also showed the same-day 56 cfs reading as below its recommended level, so expect shallow, scrape-prone conditions near today's flow.",
    "latitude": 29.7369976,
    "longitude": -99.1232512,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "low_head_dam",
        "mandatory_takeout"
      ],
      "safetyNotes": [
        "American Whitewater lists low-water crossings on the Bandera-area Medina reach as potential hazards and says current beta is needed for specific rapid details.",
        "Take out at Bandera City Park before extending into the dam corridor. The city park rules prohibit swimming near or standing on the dam and allow water entry only from the river bank.",
        "TRPA says almost all land along the Medina River is private and paddlers should use public road crossings for access; do not treat nearby banks, gravel bars, or ranch roads as casual stops or camps.",
        "Use same-day USGS 08178880, recent rain, local weather, and Bandera-area water-quality information before launch because Hill Country rivers can rise quickly after storms and city water-quality notices can change."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08178880",
      "provider": "usgs",
      "siteId": "08178880",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Medina Rv at Bandera, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08178880/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 30,
      "idealMin": 300,
      "idealMax": 1500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Medina River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/medina-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA frames the lower Medina as runnable when water is present but cautions that drought can make levels too low and floods can make the river hazardous. Use the direct Bandera gauge and city water-quality information before committing to the Bandera City Park finish.",
      "difficulty": "moderate",
      "difficultyNotes": "American Whitewater rates the Bandera reach Class I-II, but it stays moderate because the route includes low-water crossings, low bridges, mostly private banks, shallow dragging risk, wood, fast Hill Country rises, and a mandatory city-park take-out before the dam corridor.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: American Whitewater identifies Ranger Crossing at Highway 16 and Bandera City Park as public access points on the Medina reach, publishes coordinates for both access anchors, describes the larger 27.5-mile Bandera-area reach as Class I-II with low-water crossings and bridge hazards, and ties it to USGS 08178880 at Bandera. Bandera City Park publishes current access hours, fees, no-camping rules, and dam-area restrictions. TRPA supplies the accepted lower-Medina 30 / 300-1,500 / 2,000 cfs flow bands and public-road-crossing/private-bank camping context already used by adjacent Medina cards."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "Ranger Crossing at Hwy 16 to Bandera City Park, about 5.9 mi",
        "note": "American Whitewater lists SH 16 / Ranger Crossing at river mile 21.2 and Bandera City Park at river mile 27.12 on its Medina River route page.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1815/main"
      },
      {
        "label": "Public access coordinates",
        "value": "29.7369976, -99.1232512 to 29.72254, -99.06975",
        "note": "Ranger Crossing is stored using the existing source-backed Medina chain access anchor, corroborated by American Whitewater's Ranger Crossing public-access page; Bandera City Park uses American Whitewater's public access coordinate. These are arrival anchors, not guessed mid-channel water-entry points.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/104892"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08178880 at 55.8 cfs / 4.26 ft",
        "note": "USGS Water Services returned same-day Medina River discharge and gage height at Bandera at 2026-08-12 04:45 CDT, and American Whitewater ties the Bandera-area route to the same gauge.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08178880&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "30 cfs floor; 300-1,500 cfs ideal; 2,000 cfs ceiling",
        "note": "TRPA says the Medina needs about 30 cfs from town of Medina and below, is ideal around 300-1,500 cfs, and should not be attempted above about 2,000 cfs. American Whitewater's same-day display called about 56 cfs below recommended, so near-floor trips should expect scraping.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Camping",
        "value": "No camping at Bandera City Park; nearby basecamp only",
        "note": "Bandera City Park rules prohibit camping. TRPA says the only public camping along the Medina River is Pioneer River Resort in Bandera, across SH 173 from the city park area; no private-bank, gravel-bar, road-crossing, or park camping is inferred.",
        "sourceUrl": "https://www.banderatx.gov/park"
      },
      {
        "label": "Safety",
        "value": "Low-water crossings, low bridges, private banks and mandatory city-park exit",
        "note": "American Whitewater flags low-water crossings and Bandera low bridges as hazards, while Bandera City Park rules prohibit swimming near or standing on the dam. The route package requires taking out at the park and not extending into the dam corridor without a separate source-backed plan.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1815/main"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded American Whitewater, TRPA, Commons, USGS, Bandera city/local tourism, and same-route web review found route-context photos but no clearly rights-clean exact Ranger-Crossing-to-Bandera-City-Park paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Medina+River+Ranger+Crossing+Bandera+City+Park+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Medina River route",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1815/main",
        "provider": "local"
      },
      {
        "label": "American Whitewater Ranger Crossing access",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/104892",
        "provider": "local"
      },
      {
        "label": "American Whitewater Bandera City Park access",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/104897",
        "provider": "local"
      },
      {
        "label": "Bandera City Park rules",
        "url": "https://www.banderatx.gov/park",
        "provider": "local"
      },
      {
        "label": "TRPA Medina River",
        "url": "https://txrivers.org/discover-texas-rivers/medina-river/",
        "provider": "local"
      },
      {
        "label": "USGS 08178880 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08178880/",
        "provider": "usgs"
      },
      {
        "label": "USGS Medina at Bandera current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08178880&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "medina-river-bandera-city-park-dam-english-crossing",
    "slug": "medina-river-bandera-city-park-dam-english-crossing",
    "name": "Medina River",
    "reach": "Bandera City Park Dam to English Crossing",
    "aliases": [
      "Bandera to English Crossing",
      "Bandera City Park Dam to English Crossing",
      "Medina River English Crossing"
    ],
    "state": "Texas",
    "region": "Texas Hill Country",
    "routeType": "recreational",
    "summary": "Downstream Bandera-area Medina River day trip from the Bandera City Park Dam access anchor to English Crossing. TRPA publishes this as a 12.5-mile featured run, ties lower-Medina paddling to the direct Bandera USGS gauge, warns not to run the City Park dam, and states public camping on the Medina is limited to Pioneer River Resort.",
    "statusText": "Use the Medina River at Bandera gauge directly at the put-in. Treat 30 cfs as the lower-Medina floor, 300-1,500 cfs as the preferred window, and 2,000 cfs as the high-water ceiling; at today's near-floor flow, expect a long shallow day with scraping, dragging, and private-bank discipline.",
    "latitude": 29.7222995,
    "longitude": -99.0702231,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "low_head_dam"
      ],
      "safetyNotes": [
        "TRPA marks this run with a prominent warning not to run the Bandera City Park dam. Start below the dam only where current park rules, signs, and bank conditions allow safe legal entry.",
        "Bandera City Park rules prohibit swimming near or standing on the dam and allow water entry only from the river bank.",
        "TRPA says almost all land along the Medina River is private and paddlers should use public road crossings for access; do not treat nearby banks, gravel bars, ranch roads, or cabins as casual stops or camps.",
        "Use same-day USGS 08178880, recent rain, local weather, and Bandera-area water-quality information before launch because Hill Country rivers can rise quickly after storms and low flows can leave a 12.5-mile route scrape-prone."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-08178880",
      "provider": "usgs",
      "siteId": "08178880",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Medina Rv at Bandera, TX",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-08178880/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "tooLow": 30,
      "idealMin": 300,
      "idealMax": 1500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "Texas Rivers Protection Association Medina River guidance",
        "url": "https://txrivers.org/discover-texas-rivers/medina-river/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "TRPA frames the lower Medina as runnable when water is present but cautions that drought can make levels too low and floods can make the river hazardous. Use the direct Bandera gauge and city water-quality information before committing to the long downstream run to English Crossing.",
      "difficulty": "moderate",
      "difficultyNotes": "TRPA classifies the Medina as Class I-III overall; this downstream run stays moderate because it is 12.5 miles, starts below a do-not-run dam, has mostly private banks, can be shallow at current near-floor flows, and remains exposed to wood, fences, blind bends, and fast Hill Country rises.",
      "confidenceNotes": "Confidence is good for a conservative Texas add: TRPA lists Bandera City Park Dam-to-English Crossing as a 12.5-mile featured Medina River run, publishes map links that resolve to endpoint access anchors, says to use public road crossings because almost all adjacent property is private, and provides lower-Medina 30 / 300-1,500 / 2,000 cfs flow guidance. USGS 08178880 is product-supported and returned current discharge and stage during this run. Bandera City Park supplies current hours, fees, no-camping rules, dam restrictions, and water-quality reference context."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "Bandera City Park Dam to English Crossing, 12.5 mi",
        "note": "TRPA lists Bandera City Park Dam to English Crossing as a featured Main Medina run and gives the route mileage.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Public access coordinates",
        "value": "29.7222995, -99.0702231 to 29.6819834, -98.9758513",
        "note": "TRPA's Bandera City Park Dam and English Crossing map links resolve to these Google Maps access anchors; they are not guessed mid-channel water-entry points.",
        "sourceUrl": "https://goo.gl/maps/uF6gbjbcAdXYVKVf8"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 08178880 at 54.8 cfs / 4.25 ft",
        "note": "USGS Water Services returned same-day Medina River discharge and gage height at Bandera at 2026-08-12 11:45 CDT, directly at the route's upstream access area.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08178880&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "30 cfs floor; 300-1,500 cfs ideal; 2,000 cfs ceiling",
        "note": "TRPA says the Medina needs about 30 cfs from town of Medina and below, is ideal around 300-1,500 cfs, and should not be attempted above about 2,000 cfs.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Camping",
        "value": "Nearby basecamp only",
        "note": "Bandera City Park rules prohibit camping. TRPA says the only public camping along the Medina River is Pioneer River Resort in Bandera; no private-bank, gravel-bar, road-crossing, or park camping is inferred.",
        "sourceUrl": "https://www.banderatx.gov/park"
      },
      {
        "label": "Safety",
        "value": "Do-not-run dam, private banks, low water, floods and long-day exposure",
        "note": "TRPA flags the City Park dam with a do-not-run warning and warns that low water can require dragging while high flows require strong navigation skills; Bandera City Park rules also prohibit standing or swimming near the dam.",
        "sourceUrl": "https://txrivers.org/discover-texas-rivers/medina-river/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded TRPA, Bandera city, Commons, USGS, local tourism, trip-report, and same-route web review found route-context photos but no clearly rights-clean exact Bandera-to-English-Crossing paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Medina+River+Bandera+English+Crossing+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "TRPA Medina River",
        "url": "https://txrivers.org/discover-texas-rivers/medina-river/",
        "provider": "local"
      },
      {
        "label": "TRPA Bandera City Park Dam map link",
        "url": "https://goo.gl/maps/uF6gbjbcAdXYVKVf8",
        "provider": "local"
      },
      {
        "label": "TRPA English Crossing map link",
        "url": "https://goo.gl/maps/iur11xjRyC3Tzhdn8",
        "provider": "local"
      },
      {
        "label": "Bandera City Park rules",
        "url": "https://www.banderatx.gov/park",
        "provider": "local"
      },
      {
        "label": "USGS 08178880 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-08178880/",
        "provider": "usgs"
      },
      {
        "label": "USGS Medina at Bandera current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08178880&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  }
];
