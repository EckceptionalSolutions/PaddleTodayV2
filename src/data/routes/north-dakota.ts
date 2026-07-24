// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const northDakotaRoutes: River[] = [
  {
    "id": "sheyenne-river-fish-hatchery-chautauqua",
    "slug": "sheyenne-river-fish-hatchery-chautauqua",
    "name": "Sheyenne River",
    "reach": "Valley City National Fish Hatchery to Chautauqua Park",
    "aliases": [
      "Sheyenne River Water Trail - National Fish Hatchery to Chautauqua Park",
      "Sheyenne River - Valley City Fish Hatchery to Chautauqua Park",
      "Sheyenne RiverFest hatchery-to-Chautauqua route"
    ],
    "state": "North Dakota",
    "region": "Sheyenne River Valley",
    "summary": "Short Valley City Sheyenne River Water Trail segment from the National Fish Hatchery launch to Chautauqua Park. The Baldhill Dam USGS gauge is directly upstream, and USFS/Valley City guidance publishes clear Sheyenne flow bands.",
    "statusText": "Use the Sheyenne River below Baldhill Dam gauge. The official water-trail guidance calls 300 to 1,000 cfs optimal, 100 to 300 cfs navigable with exposed obstacles, 1,000 to 2,000 cfs caution water, and over 2,000 cfs avoid.",
    "latitude": 46.9662,
    "longitude": -98.0302,
    "gaugeSource": {
      "id": "usgs-05058000",
      "provider": "usgs",
      "siteId": "05058000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Sheyenne River below Baldhill Dam, ND",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers",
        "cold_water"
      ],
      "safetyNotes": [
        "End at Chautauqua Park and do not continue downstream into the Valley City dam corridor; Valley City guidance identifies the next launch as the last chance before a dangerous dam.",
        "Avoid very low exposed-bar conditions and high flows above USFS avoid guidance; logs, debris, bridges, wind, storms, and cold water raise consequences.",
        "Endpoint coordinates are practical public-site anchors, so verify same-day hatchery/park access, construction, flood, and debris conditions."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 1000,
      "tooLow": 100,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "USFS Sheyenne River Water Trail river conditions",
        "url": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "USFS says the Sheyenne River Water Trail is primarily designed for summer use, with the practical paddling season generally May through September. The river can freeze in winter, and rain or dam operations can change current, debris, and access conditions.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short Valley City day segment with accessible launches and gentle-water character at ordinary flows, but paddlers still need to account for exposed sand or gravel at low water, faster current and edge wood at high water, bridge areas, and the Chautauqua Park take-out.",
      "confidenceNotes": "Confidence is high for a first North Dakota add: the current repo has 0 North Dakota routes and 0 North Dakota ledger rows before this run; Valley City Tourism maps identify the National Fish Hatchery launch to Chautauqua Park as a 1-2 hour Sheyenne River Water Trail segment with accessible launches; USFS identifies the same water trail, direct USGS 05058000 below Baldhill Dam, and official 100/300/1000/2000 cfs flow bands; USGS Water Services returned same-day 2026-06-12 discharge and gage-height values for 05058000. Endpoint coordinates use a Recreation.gov/Outdooractive hatchery coordinate and a Commons/National Scenic Byways Chautauqua Park coordinate as practical access anchors, so current signs and launch placement should control on arrival."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "National Fish Hatchery to Chautauqua Park",
        "note": "Valley City Tourism maps list the National Fish Hatchery as a put-in/pull-out with accessible launch and say the trip to Chautauqua Park takes about 1-2 hours.",
        "sourceUrl": "https://www.valleycitytourism.com/_files/ugd/8df86a_3798bed6a825463590430c1e2bd674b5.pdf"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 05058000",
        "note": "USFS points Sheyenne River Water Trail users to USGS station 05058000 below Baldhill Dam for current streamflow data. Water Services returned 511 cfs and 25.24 ft at 2026-06-12 09:00 CDT during implementation.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/"
      },
      {
        "label": "Official flow bands",
        "value": "300-1,000 cfs optimal",
        "note": "USFS and Valley City Tourism both say flows of 100 cfs or below are very low, 100-300 cfs are navigable with obstacles exposed, 300-1,000 cfs are optimal, 1,000-2,000 cfs require caution, and over 2,000 cfs should be avoided.",
        "sourceUrl": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail"
      },
      {
        "label": "Endpoint coordinates",
        "value": "46.9662, -98.0302 to 46.939, -97.992",
        "note": "Recreation.gov/Outdooractive lists Valley City National Fish Hatchery at 46.966200, -98.030200. A National Scenic Byways Commons record places Chautauqua Park at 46.939 N, 97.992 W. Treat both as practical access-area anchors.",
        "sourceUrl": "https://www.outdooractive.fi/fi/poi/barnes-county/valley-city-national-fish-hatchery/810790638/"
      },
      {
        "label": "Access and hazards",
        "value": "Accessible launches, dams downstream",
        "note": "Valley City Tourism identifies accessible launches at the hatchery and Chautauqua Park and warns that the Valley City Eagles launch below Chautauqua is the last chance before a dangerous dam.",
        "sourceUrl": "https://www.valleycitytourism.com/_files/ugd/8df86a_3798bed6a825463590430c1e2bd674b5.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "USFS Sheyenne River Water Trail",
        "url": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail",
        "provider": "local"
      },
      {
        "label": "Valley City Tourism Sheyenne River Water Trail",
        "url": "https://www.valleycitytourism.com/sheyenneriverwatertrail",
        "provider": "local"
      },
      {
        "label": "Valley City Baldhill Dam segment map",
        "url": "https://www.valleycitytourism.com/_files/ugd/8df86a_3798bed6a825463590430c1e2bd674b5.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 05058000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/",
        "provider": "usgs"
      },
      {
        "label": "Valley City National Fish Hatchery coordinate source",
        "url": "https://www.outdooractive.fi/fi/poi/barnes-county/valley-city-national-fish-hatchery/810790638/",
        "provider": "local"
      },
      {
        "label": "Commons Chautauqua Park coordinate source",
        "url": "https://commons.wikimedia.org/wiki/File:Sheyenne_River_Valley_Scenic_Byway_-_Highline_Bridge_from_Chautauqua_Park_-_NARA_-_7722086.jpg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "sheyenne-river-brome-field-mirror-pool",
    "slug": "sheyenne-river-brome-field-mirror-pool",
    "name": "Sheyenne River",
    "reach": "Brome Field hand-launch to Mirror Pool WMA hand-launch",
    "aliases": [
      "Sheyenne River Water Trail - Brome Field to Mirror Pool",
      "Sheyenne River - Brome Field to Mirror Pool",
      "Sheyenne National Grassland middle segment"
    ],
    "state": "North Dakota",
    "region": "Sheyenne National Grassland",
    "summary": "Short grassland Sheyenne River Water Trail segment from the Brome Field hand-launch to the Mirror Pool WMA hand-launch. USFS names both semi-primitive access points and uses the Baldhill Dam USGS gauge as the corridor-wide condition check.",
    "statusText": "Use the Sheyenne River below Baldhill Dam gauge as a corridor-wide proxy. The official water-trail guidance calls 300 to 1,000 cfs optimal, 100 to 300 cfs navigable with exposed obstacles, 1,000 to 2,000 cfs caution water, and over 2,000 cfs avoid.",
    "latitude": 46.53087339415233,
    "longitude": -97.31706518572886,
    "gaugeSource": {
      "id": "usgs-05058000",
      "provider": "usgs",
      "siteId": "05058000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Sheyenne River below Baldhill Dam, ND",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Expect overhanging trees, logjams, bridge-abutment hazards, and occasional big rocks or shallow bars; portage around obstructions rather than grabbing branches from the boat.",
        "USFS marks public-land boundaries along this trail segment. Respect those markers and do not dock beyond public lands unless needed for safety.",
        "High flows above 1,000 cfs can flood shoreline trees and logs; over 2,000 cfs is official avoid water on the Sheyenne."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 1000,
      "tooLow": 100,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "USFS Sheyenne River Water Trail river conditions",
        "url": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "USFS says the Sheyenne River Water Trail is primarily designed for summer use, with the practical paddling season generally May through September. Rain, dam operations, and storm debris can still change current, wood, and bank conditions quickly.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short, gentle grassland float at ordinary levels, but the semi-primitive hand launches, exposed bars at low water, shoreline wood at higher water, and limited mid-route services still require a prepared same-day check.",
      "confidenceNotes": "Confidence is good for a conservative add: the current USFS water-trail page names Brome Field and Mirror Pool as designated put-in/pull-out sites, the official 2019 USFS brochure map is geospatial and yields practical access anchors for both, NDGF still lists Mirror Pool WMA as public wildlife-management land, and USGS Water Services returned same-day 05058000 discharge and gage-height values during implementation. Confidence is intentionally tempered because the Baldhill Dam gauge is an official corridor-wide proxy for most of the river, not an exact on-segment gauge."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Brome Field to Mirror Pool, about 4 river miles",
        "note": "The official USFS Sheyenne River Water Trail brochure labels Brome Field as a put-in/pull-out near river mile 4 and Mirror Pool as a put-in/pull-out near river mile 8 on the Sheyenne National Grassland map.",
        "sourceUrl": "https://www.fs.usda.gov/media/62034"
      },
      {
        "label": "Official access context",
        "value": "Semi-primitive hand-launch sites",
        "note": "USFS says the Sheyenne National Grassland reach has four primary semi-primitive access sites designated for hand-launching canoes and kayaks, including Brome Field and Mirror Pool.",
        "sourceUrl": "https://www.fs.usda.gov/r01/dpg/recreation/opportunities/water-activities"
      },
      {
        "label": "Corridor live gauge proxy",
        "value": "USGS 05058000",
        "note": "USFS points Sheyenne River Water Trail users to USGS station 05058000 below Baldhill Dam and says it indicates conditions along most of the river. Water Services returned 488 cfs and 25.20 ft at 2026-06-18 16:00 CDT during implementation.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/"
      },
      {
        "label": "Official flow bands",
        "value": "300-1,000 cfs optimal",
        "note": "USFS says flows of 100 cfs or below are very low, 100-300 cfs are navigable with exposed obstacles, 300-1,000 cfs are optimal, 1,000-2,000 cfs require caution, and over 2,000 cfs should be avoided.",
        "sourceUrl": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail"
      },
      {
        "label": "Endpoint coordinates",
        "value": "46.53087339415233, -97.31706518572886 to 46.50498692183727, -97.29118124734387",
        "note": "The official 2019 USFS brochure map is geospatial. Extracting its embedded map reference and hand-launch icon placements yields practical access anchors for Brome Field and Mirror Pool.",
        "sourceUrl": "https://www.fs.usda.gov/media/62034"
      },
      {
        "label": "Access and boundary rules",
        "value": "Hand launch only, respect public-land markers",
        "note": "The USFS brochure says these sites are for hand launch and retrieval rather than trailered watercraft, and it warns paddlers not to dock beyond the public-land markers shown along the route. NDGF also lists Mirror Pool WMA as public wildlife-management land.",
        "sourceUrl": "https://www.fs.usda.gov/media/62034"
      }
    ],
    "sourceLinks": [
      {
        "label": "USFS Sheyenne River Water Trail",
        "url": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail",
        "provider": "local"
      },
      {
        "label": "USFS Water Activities",
        "url": "https://www.fs.usda.gov/r01/dpg/recreation/opportunities/water-activities",
        "provider": "local"
      },
      {
        "label": "USFS Sheyenne River Water Trail brochure map",
        "url": "https://www.fs.usda.gov/media/62034",
        "provider": "local"
      },
      {
        "label": "USGS 05058000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/",
        "provider": "usgs"
      },
      {
        "label": "North Dakota Game and Fish WMA listing",
        "url": "https://gf.nd.gov/wma-listing",
        "provider": "local"
      }
    ]
  },
  {
    "id": "sheyenne-river-ylvisaker-bridge-brome-field",
    "slug": "sheyenne-river-ylvisaker-bridge-brome-field",
    "name": "Sheyenne River",
    "reach": "Ylvisaker Bridge hand-launch to Brome Field hand-launch",
    "aliases": [
      "Sheyenne River Water Trail - Ylvisaker Bridge to Brome Field",
      "Sheyenne River - Ylvisaker Bridge to Brome Field",
      "Sheyenne National Grassland upstream short segment"
    ],
    "state": "North Dakota",
    "region": "Sheyenne National Grassland",
    "summary": "Short upstream grassland Sheyenne River Water Trail split from Ylvisaker Bridge down to Brome Field. USFS names both semi-primitive access points and uses the Baldhill Dam USGS gauge as the corridor-wide condition check.",
    "statusText": "Use the Sheyenne River below Baldhill Dam gauge as a corridor-wide proxy. The official water-trail guidance calls 300 to 1,000 cfs optimal, 100 to 300 cfs navigable with exposed obstacles, 1,000 to 2,000 cfs caution water, and over 2,000 cfs avoid.",
    "latitude": 46.53246,
    "longitude": -97.34256,
    "gaugeSource": {
      "id": "usgs-05058000",
      "provider": "usgs",
      "siteId": "05058000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Sheyenne River below Baldhill Dam, ND",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Expect overhanging trees, logjams, bridge-abutment hazards, and shallow bars; portage around obstructions rather than grabbing branches from the boat.",
        "USFS marks public-land boundaries along this trail segment. Respect those markers and do not dock beyond public lands unless needed for safety.",
        "High flows above 1,000 cfs can flood shoreline trees and logs; over 2,000 cfs is official avoid water on the Sheyenne."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 1000,
      "tooLow": 100,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "USFS Sheyenne River Water Trail river conditions",
        "url": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "USFS says the Sheyenne River Water Trail is primarily designed for summer use, with the practical paddling season generally May through September. Rain, dam operations, and storm debris can still change current, wood, and bank conditions quickly.",
      "difficulty": "easy",
      "difficultyNotes": "This is one of the shortest Sheyenne National Grassland options at ordinary levels, but the semi-primitive hand launches, exposed bars at low water, and shoreline wood at higher water still require a prepared same-day check.",
      "confidenceNotes": "Confidence is good for a conservative add: the current USFS water-trail page names Ylvisaker Bridge and Brome Field as designated access points, the official 2019 USFS brochure map provides the river-mile ladder and geospatial access anchors, and USGS Water Services returned same-day 05058000 discharge and gage-height values during this run. Confidence is intentionally tempered because the Baldhill Dam gauge is an official corridor-wide proxy for most of the river, not an exact on-segment gauge."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Ylvisaker Bridge to Brome Field, about 3 river miles",
        "note": "The official USFS Sheyenne River Water Trail brochure labels Ylvisaker Bridge near river mile 0 and Brome Field near river mile 3 on the Sheyenne National Grassland map.",
        "sourceUrl": "https://www.fs.usda.gov/media/62034"
      },
      {
        "label": "Official access context",
        "value": "Semi-primitive hand-launch sites",
        "note": "USFS says the Sheyenne National Grassland reach has four primary semi-primitive access sites designated for hand-launching canoes and kayaks, including Ylvisaker Bridge and Brome Field.",
        "sourceUrl": "https://www.fs.usda.gov/r01/dpg/recreation/opportunities/water-activities"
      },
      {
        "label": "Corridor live gauge proxy",
        "value": "USGS 05058000 at 301 cfs / 24.81 ft",
        "note": "USFS points Sheyenne River Water Trail users to USGS station 05058000 below Baldhill Dam and says it indicates conditions along most of the river. Water Services returned 301 cfs and 24.81 ft at 2026-07-15 15:00 CDT during implementation.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/"
      },
      {
        "label": "Official flow bands",
        "value": "300-1,000 cfs optimal",
        "note": "USFS says flows of 100 cfs or below are very low, 100-300 cfs are navigable with exposed obstacles, 300-1,000 cfs are optimal, 1,000-2,000 cfs require caution, and over 2,000 cfs should be avoided.",
        "sourceUrl": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail"
      },
      {
        "label": "Endpoint coordinates",
        "value": "46.53246, -97.34256 to 46.53087339415233, -97.31706518572886",
        "note": "The official 2019 USFS brochure map is geospatial. Using the already-verified Brome Field anchor and the same hand-launch icon layer on that map yields a practical Ylvisaker Bridge access anchor for the selected upstream segment.",
        "sourceUrl": "https://www.fs.usda.gov/media/62034"
      },
      {
        "label": "Access and boundary rules",
        "value": "Hand launch only, respect public-land markers",
        "note": "The USFS brochure says these sites are for hand launch and retrieval rather than trailered watercraft, and it warns paddlers not to dock beyond the public-land markers shown along the route.",
        "sourceUrl": "https://www.fs.usda.gov/media/62034"
      }
    ],
    "sourceLinks": [
      {
        "label": "USFS Sheyenne River Water Trail",
        "url": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail",
        "provider": "local"
      },
      {
        "label": "USFS Water Activities",
        "url": "https://www.fs.usda.gov/r01/dpg/recreation/opportunities/water-activities",
        "provider": "local"
      },
      {
        "label": "USFS Sheyenne River Water Trail brochure map",
        "url": "https://www.fs.usda.gov/media/62034",
        "provider": "local"
      },
      {
        "label": "USGS 05058000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "sheyenne-river-mirror-pool-east-river",
    "slug": "sheyenne-river-mirror-pool-east-river",
    "name": "Sheyenne River",
    "reach": "Mirror Pool WMA hand-launch to East River hand-launch",
    "aliases": [
      "Sheyenne River Water Trail - Mirror Pool to East River",
      "Sheyenne River - Mirror Pool to East River",
      "Sheyenne National Grassland downstream segment"
    ],
    "state": "North Dakota",
    "region": "Sheyenne National Grassland",
    "summary": "Longer downstream grassland Sheyenne River Water Trail split from Mirror Pool WMA to East River. USFS names both semi-primitive access points, and the Baldhill Dam gauge remains the official corridor-wide condition check.",
    "statusText": "Use the Sheyenne River below Baldhill Dam gauge as a corridor-wide proxy. The official water-trail guidance calls 300 to 1,000 cfs optimal, 100 to 300 cfs navigable with exposed obstacles, 1,000 to 2,000 cfs caution water, and over 2,000 cfs avoid.",
    "latitude": 46.50498692183727,
    "longitude": -97.29118124734387,
    "gaugeSource": {
      "id": "usgs-05058000",
      "provider": "usgs",
      "siteId": "05058000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Sheyenne River below Baldhill Dam, ND",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Expect overhanging trees, logjams, occasional big rocks or shallow bars, and a longer commitment than the short Brome split.",
        "USFS marks public-land boundaries along this trail segment. Respect those markers and do not dock beyond public lands unless needed for safety.",
        "High flows above 1,000 cfs can flood shoreline trees and logs; over 2,000 cfs is official avoid water on the Sheyenne."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 1000,
      "tooLow": 100,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "USFS Sheyenne River Water Trail river conditions",
        "url": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "USFS says the Sheyenne River Water Trail is primarily designed for summer use, with the practical paddling season generally May through September. Rain, dam operations, and storm debris can still change current, wood, and bank conditions quickly.",
      "difficulty": "easy",
      "difficultyNotes": "The river remains gentle at ordinary levels, but this downstream leg is materially longer than the Brome split and uses semi-primitive hand launches, so the day can stretch if low water, wood, or wind slow progress.",
      "confidenceNotes": "Confidence is good for a conservative add: the current USFS water-trail page names Mirror Pool and East River as designated access points, the official 2019 USFS brochure map provides the river-mile ladder and geospatial access anchors, and USGS Water Services returned same-day 05058000 discharge and gage-height values during this run. Confidence is intentionally tempered because the Baldhill Dam gauge is an official corridor-wide proxy for most of the river, not an exact on-segment gauge."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Mirror Pool to East River, about 8 river miles",
        "note": "The official USFS Sheyenne River Water Trail brochure labels Mirror Pool near river mile 8 and East River near river mile 16 on the Sheyenne National Grassland map.",
        "sourceUrl": "https://www.fs.usda.gov/media/62034"
      },
      {
        "label": "Official access context",
        "value": "Semi-primitive hand-launch sites",
        "note": "USFS says the Sheyenne National Grassland reach has four primary semi-primitive access sites designated for hand-launching canoes and kayaks, including Mirror Pool and East River.",
        "sourceUrl": "https://www.fs.usda.gov/r01/dpg/recreation/opportunities/water-activities"
      },
      {
        "label": "Corridor live gauge proxy",
        "value": "USGS 05058000 at 301 cfs / 24.81 ft",
        "note": "USFS points Sheyenne River Water Trail users to USGS station 05058000 below Baldhill Dam and says it indicates conditions along most of the river. Water Services returned 301 cfs and 24.81 ft at 2026-07-15 15:00 CDT during implementation.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/"
      },
      {
        "label": "Official flow bands",
        "value": "300-1,000 cfs optimal",
        "note": "USFS says flows of 100 cfs or below are very low, 100-300 cfs are navigable with exposed obstacles, 300-1,000 cfs are optimal, 1,000-2,000 cfs require caution, and over 2,000 cfs should be avoided.",
        "sourceUrl": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail"
      },
      {
        "label": "Endpoint coordinates",
        "value": "46.50498692183727, -97.29118124734387 to 46.50234, -97.23046",
        "note": "The official 2019 USFS brochure map is geospatial. Using the already-verified Mirror Pool anchor and the same hand-launch icon layer on that map yields a practical East River access anchor for the selected downstream segment.",
        "sourceUrl": "https://www.fs.usda.gov/media/62034"
      },
      {
        "label": "Access amenities context",
        "value": "East River hand launch with picnic-table context",
        "note": "USFS says the Sheyenne National Grassland has four semi-primitive water-trail access sites reachable by motor vehicle and that East River has picnic tables and bike racks.",
        "sourceUrl": "https://www.fs.usda.gov/r01/dpg/safety-ethics/fishing"
      }
    ],
    "sourceLinks": [
      {
        "label": "USFS Sheyenne River Water Trail",
        "url": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail",
        "provider": "local"
      },
      {
        "label": "USFS Water Activities",
        "url": "https://www.fs.usda.gov/r01/dpg/recreation/opportunities/water-activities",
        "provider": "local"
      },
      {
        "label": "USFS Fishing / water-access context",
        "url": "https://www.fs.usda.gov/r01/dpg/safety-ethics/fishing",
        "provider": "local"
      },
      {
        "label": "USFS Sheyenne River Water Trail brochure map",
        "url": "https://www.fs.usda.gov/media/62034",
        "provider": "local"
      },
      {
        "label": "USGS 05058000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/",
        "provider": "usgs"
      },
      {
        "label": "North Dakota Game and Fish WMA listing",
        "url": "https://gf.nd.gov/wma-listing",
        "provider": "local"
      }
    ]
  },
  {
    "id": "sheyenne-river-brome-field-east-river",
    "slug": "sheyenne-river-brome-field-east-river",
    "name": "Sheyenne River",
    "reach": "Brome Field hand-launch to East River hand-launch",
    "aliases": [
      "Sheyenne River Water Trail - Brome Field to East River",
      "Sheyenne River - Brome Field to East River",
      "Sheyenne National Grassland long continuation"
    ],
    "state": "North Dakota",
    "region": "Sheyenne National Grassland",
    "summary": "Longer Sheyenne National Grassland continuation from Brome Field to East River. USFS names both semi-primitive access points, and the official river-mile map shows overnight-camping context if the group wants to treat this as more than a simple day float.",
    "statusText": "Use the Sheyenne River below Baldhill Dam gauge as a corridor-wide proxy. The official water-trail guidance calls 300 to 1,000 cfs optimal, 100 to 300 cfs navigable with exposed obstacles, 1,000 to 2,000 cfs caution water, and over 2,000 cfs avoid.",
    "latitude": 46.53087339415233,
    "longitude": -97.31706518572886,
    "gaugeSource": {
      "id": "usgs-05058000",
      "provider": "usgs",
      "siteId": "05058000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Sheyenne River below Baldhill Dam, ND",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Expect overhanging trees, logjams, occasional big rocks or shallow bars, and a longer all-day commitment than the shorter Grassland splits.",
        "USFS marks public-land boundaries along this trail segment. Respect those markers and do not dock beyond public lands unless needed for safety.",
        "High flows above 1,000 cfs can flood shoreline trees and logs; over 2,000 cfs is official avoid water on the Sheyenne."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 1000,
      "tooLow": 100,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "USFS Sheyenne River Water Trail river conditions",
        "url": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "USFS says the Sheyenne River Water Trail is primarily designed for summer use, with the practical paddling season generally May through September. Rain, dam operations, and storm debris can still change current, wood, and bank conditions quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "The river itself stays gentle at ordinary levels, but roughly 13 miles of semi-primitive Sheyenne corridor with limited bailout certainty, wood, and sandbar decisions create a longer day that deserves more than casual flatwater expectations.",
      "confidenceNotes": "Confidence is good for a conservative add: the current USFS water-trail page names Brome Field and East River as designated access points, the official 2019 USFS brochure map provides the river-mile ladder, camping icons, and geospatial access anchors, and USGS Water Services returned same-day 05058000 discharge and gage-height values during this run. Confidence is intentionally tempered because the Baldhill Dam gauge is an official corridor-wide proxy for most of the river, not an exact on-segment gauge."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Brome Field to East River, about 13 river miles",
        "note": "The official USFS Sheyenne River Water Trail brochure labels Brome Field near river mile 3 and East River near river mile 16 on the Sheyenne National Grassland map.",
        "sourceUrl": "https://www.fs.usda.gov/media/62034"
      },
      {
        "label": "Official access context",
        "value": "Semi-primitive hand-launch sites",
        "note": "USFS says the Sheyenne National Grassland reach has four primary semi-primitive access sites designated for hand-launching canoes and kayaks, including Brome Field and East River.",
        "sourceUrl": "https://www.fs.usda.gov/r01/dpg/recreation/opportunities/water-activities"
      },
      {
        "label": "Corridor live gauge proxy",
        "value": "USGS 05058000 at 301 cfs / 24.81 ft",
        "note": "USFS points Sheyenne River Water Trail users to USGS station 05058000 below Baldhill Dam and says it indicates conditions along most of the river. Water Services returned 301 cfs and 24.81 ft at 2026-07-15 15:00 CDT during implementation.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/"
      },
      {
        "label": "Official flow bands",
        "value": "300-1,000 cfs optimal",
        "note": "USFS says flows of 100 cfs or below are very low, 100-300 cfs are navigable with exposed obstacles, 300-1,000 cfs are optimal, 1,000-2,000 cfs require caution, and over 2,000 cfs should be avoided.",
        "sourceUrl": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail"
      },
      {
        "label": "Endpoint coordinates",
        "value": "46.53087339415233, -97.31706518572886 to 46.50234, -97.23046",
        "note": "The official 2019 USFS brochure map is geospatial. The already-verified Brome Field anchor and the East River hand-launch icon on that same map yield practical access anchors for the selected continuation.",
        "sourceUrl": "https://www.fs.usda.gov/media/62034"
      },
      {
        "label": "Camping context",
        "value": "Official overnight-camping icons along the Grassland corridor",
        "note": "The official USFS brochure map marks overnight-camping sites along this Brome-to-East corridor, which is why the route is documented as overnight-capable rather than a no-camping day card.",
        "sourceUrl": "https://www.fs.usda.gov/media/62034"
      }
    ],
    "sourceLinks": [
      {
        "label": "USFS Sheyenne River Water Trail",
        "url": "https://www.fs.usda.gov/r01/dpg/recreation/trails/sheyenne-river-water-trail",
        "provider": "local"
      },
      {
        "label": "USFS Water Activities",
        "url": "https://www.fs.usda.gov/r01/dpg/recreation/opportunities/water-activities",
        "provider": "local"
      },
      {
        "label": "USFS Fishing / water-access context",
        "url": "https://www.fs.usda.gov/r01/dpg/safety-ethics/fishing",
        "provider": "local"
      },
      {
        "label": "USFS Sheyenne River Water Trail brochure map",
        "url": "https://www.fs.usda.gov/media/62034",
        "provider": "local"
      },
      {
        "label": "USGS 05058000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05058000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "pembina-river-vang-riverside-park",
    "slug": "pembina-river-vang-riverside-park",
    "name": "Pembina River",
    "reach": "Vang Bridge / County 55 to Walhalla Riverside Park",
    "aliases": [
      "Pembina River - County 55 to County 32",
      "Pembina Gorge - Vang Bridge to Riverside Park",
      "Pembina River Walhalla white bridge run"
    ],
    "state": "North Dakota",
    "region": "Pembina Gorge",
    "summary": "Pembina Gorge run from the Vang / County 55 access down to the Walhalla Highway 32 / Riverside Park access corridor. County and city sources identify public canoe/kayak access, and American Whitewater ties the reach to the direct Walhalla USGS gauge.",
    "statusText": "Use the Pembina River at Walhalla gauge. American Whitewater marks 300 to 800 cfs low runnable, 800 to 1,400 cfs medium runnable, 1,400 to 3,000 cfs high runnable, and over 3,000 cfs above recommended.",
    "latitude": 48.9169,
    "longitude": -98.056,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-05099600",
      "provider": "usgs",
      "siteId": "05099600",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Pembina River at Walhalla, ND",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05099600/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 600,
      "idealMax": 1400,
      "tooLow": 300,
      "tooHigh": 3000,
      "thresholdSource": {
        "label": "American Whitewater Pembina gauge ranges",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4470/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        5,
        6,
        7,
        8
      ],
      "seasonNotes": "ND Parks and North Dakota Tourism frame Pembina Gorge paddling as condition-dependent and most common around May and June, while local outfitter-style use can continue into summer when water remains adequate. Check the gauge, recent rain, state-park notices, and local access status before committing to the shuttle.",
      "difficulty": "moderate",
      "difficultyNotes": "American Whitewater lists the reach as Class I but describes boulder-garden rapids, small ledges and drops, strainers, quicksand-like mud or sand, steep banks, and exposed rocks at low water. Paddle it as a filtered whitewater/swiftwater route, not as a casual flatwater float.",
      "confidenceNotes": "Confidence is high enough for a conservative whitewater-filtered add: Pembina County and Walhalla sources identify canoe/kayak access at Vang Bridge, Brickmine Bridge, White Bridge, and Riverside Park; ND Parks identifies 3.5-mile and 10.75-mile Pembina River paddles when water levels allow; American Whitewater provides exact route feature coordinates, a direct USGS 05099600 gauge, and numeric discharge bands. Use current signs and local conditions because the put-in is a bridge/roadside carry and the take-out can be the Highway 32 / Riverside Park access area."
    },
    "evidenceNotes": [
      {
        "label": "Public access corridor",
        "value": "Vang Bridge to Riverside Park",
        "note": "Pembina County and Walhalla/Rendezvous Region materials identify canoe and kayak access docks at Vang Bridge, Brickmine Bridge, White Bridge, and Riverside Park for Pembina River access.",
        "sourceUrl": "https://www.pembinacountynd.gov/recreation/rendezvousregion/"
      },
      {
        "label": "State paddling context",
        "value": "3.5 mi or 10.75 mi paddle",
        "note": "The North Dakota Parks Pembina Gorge map says visitors can kayak or canoe the Pembina River when water levels allow and describes 3.5-mile and 10.75-mile paddle options.",
        "sourceUrl": "https://www.parkrec.nd.gov/sites/www/files/documents/Destinations/Pembina/PGSP%20Map%20-%20Trails.pdf"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 05099600",
        "note": "USGS Water Services returned current Pembina River at Walhalla values during implementation: 558 cfs and 3.02 ft at 2026-06-12 10:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05099600/"
      },
      {
        "label": "Route-specific thresholds",
        "value": "300-3,000 cfs runnable range",
        "note": "American Whitewater ties the County 55-to-County 32 reach to the Walhalla gauge, with 300-800 cfs low runnable, 800-1,400 cfs medium runnable, 1,400-3,000 cfs high runnable, and over 3,000 cfs above recommended.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4470/main"
      },
      {
        "label": "Endpoint coordinates",
        "value": "48.9169, -98.056 to 48.91360599, -97.91712315",
        "note": "American Whitewater feature data places the put-in at County 55 / 104th Street NE near Vang and the take-out near the Walhalla County 32 / Riverside Park access corridor.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4470/main"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Pembina reach",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4470/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 05099600 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05099600/",
        "provider": "usgs"
      },
      {
        "label": "Pembina County Rendezvous Region",
        "url": "https://www.pembinacountynd.gov/recreation/rendezvousregion/",
        "provider": "local"
      },
      {
        "label": "Walhalla Riverside Park",
        "url": "https://walhalland.org/riverside_park.php",
        "provider": "local"
      },
      {
        "label": "ND Parks Pembina Gorge trail map",
        "url": "https://www.parkrec.nd.gov/sites/www/files/documents/Destinations/Pembina/PGSP%20Map%20-%20Trails.pdf",
        "provider": "local"
      }
    ]
  },
  {
    "id": "little-missouri-rough-rider-medora-bridge",
    "slug": "little-missouri-rough-rider-medora-bridge",
    "name": "Little Missouri River",
    "reach": "Rough Rider State Park to Medora Bridge",
    "aliases": [
      "Little Missouri River - Sully Creek State Park to Medora Bridge",
      "Rough Rider State Park to Medora Bridge",
      "Sully Creek to Medora Bridge"
    ],
    "state": "North Dakota",
    "region": "North Dakota Badlands",
    "summary": "Short Badlands Little Missouri River float from the Rough Rider / former Sully Creek State Park canoe-kayak access to the Medora Bridge corridor. NPS names the three-mile reach and ties fair boating to the direct USGS Medora gauge.",
    "statusText": "Use the Little Missouri River at Medora gauge. NPS says at least 2.5 ft / 699 cfs at Medora is required for fair boating and 2.5 to 3.5 ft / 699 to 1,500 cfs is good boating; below that expect dragging, and high or rising water can become dangerous quickly.",
    "latitude": 46.89263398,
    "longitude": -103.54044775,
    "gaugeSource": {
      "id": "usgs-06336000",
      "provider": "usgs",
      "siteId": "06336000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Little Missouri River at Medora, ND",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06336000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 699,
      "thresholdSource": {
        "label": "NPS Theodore Roosevelt Little Missouri boating levels",
        "url": "https://www.nps.gov/thro/planyourvisit/canoeing-kayaking.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6
      ],
      "seasonNotes": "NPS says Little Missouri river ice usually breaks up by early April, May and June are usually best, and some years the river is not deep enough for float trips or sections may dry up. Thunderstorms can raise the river rapidly and create debris hazards.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a short three-mile reach, but it is still a remote Badlands river decision with shallow dragging below the NPS floor, fast-changing thunderstorms, cold spring water, fences, debris, mud, limited services, and no drinking water except at nearby developed locations.",
      "confidenceNotes": "Confidence is good for a guarded minimum-only North Dakota add: NPS Theodore Roosevelt names Sully Creek State Park to Medora Bridge as a 3-mile Little Missouri reach and publishes official Medora gauge boating guidance; ND Parks confirms Rough Rider State Park, formerly Sully Creek, has Little Missouri canoe/kayak access; and USGS Water Services returned same-day discharge and stage for direct gauge 06336000. Endpoint coordinates are practical anchors from the ND Parks Rough Rider map/contact context and the official USGS Medora gauge/bridge location. The app does not claim an upper scoring band because NPS gives a fair floor and good band but only qualitative high-water flood/debris warnings."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Sully Creek State Park to Medora Bridge, 3 mi",
        "note": "NPS Theodore Roosevelt lists Sully Creek State Park to Medora Bridge as a 3-mile Little Missouri River mileage segment.",
        "sourceUrl": "https://www.nps.gov/thro/planyourvisit/canoeing-kayaking.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 06336000",
        "note": "USGS Water Services returned current Little Missouri River at Medora values during implementation: 66.3 cfs and 1.80 ft at 2026-06-12 12:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06336000/"
      },
      {
        "label": "Official level guidance",
        "value": "699 cfs / 2.5 ft minimum",
        "note": "NPS says at least 2.5 ft / 699 cfs at Medora is required for fair boating and 2.5-3.5 ft / 699-1,500 cfs is good boating. Paddle Today uses 699 cfs as a minimum-only floor.",
        "sourceUrl": "https://www.nps.gov/thro/planyourvisit/canoeing-kayaking.htm"
      },
      {
        "label": "Public access",
        "value": "Rough Rider canoe/kayak access",
        "note": "ND Parks says Rough Rider State Park has Little Missouri River canoe/kayak access and its park map marks kayak/canoe access along the river.",
        "sourceUrl": "https://www.parkrec.nd.gov/rough-rider-state-park"
      },
      {
        "label": "Endpoint coordinates",
        "value": "46.89263398, -103.54044775 to 46.91684167, -103.53228333",
        "note": "The put-in is a practical Rough Rider / former Sully Creek access anchor already recorded from ND Parks map context. The take-out uses the official USGS Medora bridge/gauge coordinate as the Medora Bridge anchor named by NPS.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/site/?format=rdb&sites=06336000&siteOutput=expanded"
      },
      {
        "label": "Badlands hazards",
        "value": "Flash rises, debris, fences, limited services",
        "note": "NPS warns that storms can transform the quiet river into a debris-carrying torrent, emergency response can take hours or days, drinking water is limited, and fences may cross the river.",
        "sourceUrl": "https://www.nps.gov/thro/planyourvisit/canoeing-kayaking.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Theodore Roosevelt Canoeing/Kayaking",
        "url": "https://www.nps.gov/thro/planyourvisit/canoeing-kayaking.htm",
        "provider": "local"
      },
      {
        "label": "ND Parks Rough Rider State Park",
        "url": "https://www.parkrec.nd.gov/rough-rider-state-park",
        "provider": "local"
      },
      {
        "label": "ND Parks Rough Rider campground map",
        "url": "https://www.parkrec.nd.gov/sites/default/files/documents/Destinations/Sully/RRSP%20Map%20FINAL.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 06336000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06336000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 06336000 site file",
        "url": "https://waterservices.usgs.gov/nwis/site/?format=rdb&sites=06336000&siteOutput=expanded",
        "provider": "usgs"
      }
    ]
  }
];
