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
  }
];
