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
  }
];
