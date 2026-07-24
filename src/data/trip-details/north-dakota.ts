// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const northDakotaRiverTripDetails: Record<string, RiverTripDetails> = {
  "sheyenne-river-fish-hatchery-chautauqua": {
    "putIn": {
      "id": "valley-city-national-fish-hatchery-launch",
      "name": "Valley City National Fish Hatchery launch",
      "latitude": 46.9662,
      "longitude": -98.0302
    },
    "takeOut": {
      "id": "chautauqua-park-accessible-launch",
      "name": "Chautauqua Park accessible launch",
      "latitude": 46.939,
      "longitude": -97.992
    },
    "logistics": {
      "distanceLabel": "About 3 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr at ordinary flow, longer with low-water dragging, wind, or a slow group",
      "shuttle": "Stage the take-out at Chautauqua Park before driving to the National Fish Hatchery launch. Use the signed Sheyenne River Water Trail launches and inspect the Chautauqua landing before putting on because the next downstream access is the last chance before a dangerous dam.",
      "permits": "No route-specific private paddling permit is known. Use public water-trail access points, follow North Dakota boating and PFD rules, obey posted park or hatchery signs, and skip the route when flows are outside the official Sheyenne guidance or the launch is closed.",
      "camping": "Treat this as a short daylight city-area paddle. Do not camp or stop on private banks between the hatchery and Chautauqua Park unless a location is clearly public and open.",
      "summary": "Launch at the Valley City National Fish Hatchery and take out at Chautauqua Park for a short Sheyenne River Water Trail segment through Valley City. Use the USGS Baldhill Dam discharge gauge and the official 300 to 1,000 cfs optimal band, with conservative low/high cutoffs.",
      "accessCaveats": [
        "Valley City Tourism maps identify the National Fish Hatchery and Chautauqua Park as accessible launch sites on this Sheyenne River Water Trail segment.",
        "The hatchery coordinate is a Recreation.gov/Outdooractive practical site anchor. The Chautauqua Park coordinate is from a National Scenic Byways public-domain Commons record, not a survey-grade ramp coordinate.",
        "Valley City Tourism warns that the Valley City Eagles launch downstream from Chautauqua Park is the last chance before a dangerous dam. This route ends at Chautauqua Park and does not continue downstream through the city dam corridor.",
        "USFS says the Sheyenne trail is primarily a summer paddling route and that winter freezing makes it unsuitable for watercraft.",
        "Check same-day park, hatchery, construction, flood, and debris conditions before staging vehicles or launching."
      ],
      "watchFor": [
        "Flows at or below 100 cfs, when USFS says the river is very low and many sand or gravel bars may be exposed.",
        "Flows above 1,000 cfs, when current can become fast and shoreline trees, logs, and debris become more serious hazards.",
        "Flows above 2,000 cfs, which USFS says paddlers should avoid on the Sheyenne.",
        "The downstream dam hazard after the Chautauqua / Valley City Eagles area; make the planned take-out and do not drift into the dam corridor.",
        "Bridge areas, floating wood, strainers, shallow bars, cold water, thunderstorms, wind, and limited legal bank access outside named public sites."
      ]
    }
  },
  "sheyenne-river-brome-field-mirror-pool": {
    "putIn": {
      "id": "brome-field-hand-launch",
      "name": "Brome Field hand-launch",
      "latitude": 46.53087339415233,
      "longitude": -97.31706518572886
    },
    "takeOut": {
      "id": "mirror-pool-wma-hand-launch",
      "name": "Mirror Pool WMA hand-launch",
      "latitude": 46.50498692183727,
      "longitude": -97.29118124734387
    },
    "logistics": {
      "distanceLabel": "About 4 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr at ordinary flow, longer with low-water weaving, wood, or a slow group",
      "shuttle": "Stage the take-out at Mirror Pool WMA before driving back to Brome Field. Both sites are semi-primitive hand launches rather than developed ramps, so inspect the approach roads, parking pull-offs, and shoreline footing before leaving vehicles.",
      "permits": "No route-specific private paddling permit is known. Use the signed public Sheyenne River Water Trail hand-launches, follow North Dakota boating and PFD rules, obey USFS and NDGF WMA rules, and skip the route when Baldhill flows are outside the official guidance or local access is closed.",
      "camping": "Treat this as a short daylight grassland float. The broader trail includes dispersed-camping context, but do not assume casual mid-route stops are legal; respect public-land markers and do not dock beyond them unless necessary for safety.",
      "summary": "Launch at Brome Field and take out at Mirror Pool WMA for a short Sheyenne National Grassland segment. Use the USGS Baldhill Dam discharge gauge as a corridor-wide proxy and keep the call conservative because the official flow guidance applies to most of the river, not just this four-mile reach.",
      "accessCaveats": [
        "USFS names both Brome Field and Mirror Pool as designated put-in/pull-out sites on the Sheyenne River Water Trail.",
        "The endpoint coordinates come from the hand-launch icons embedded in the official geospatial 2019 USFS brochure map. Treat them as practical access anchors, not survey-grade ramp coordinates.",
        "USFS says these Sheyenne National Grassland sites are semi-primitive hand-launch areas and are not recommended for trailered watercraft.",
        "Mirror Pool is within a North Dakota Game and Fish wildlife management area. Follow current WMA signs and regulations on arrival.",
        "USFS marks public-land boundaries along the route and says paddlers should not dock beyond those public-land markers."
      ],
      "watchFor": [
        "Flows at or below 100 cfs, when USFS says the river is very low and many sand or gravel bars may be exposed.",
        "Flows above 1,000 cfs, when current can become fast and shoreline trees, logs, and debris become more serious hazards.",
        "Flows above 2,000 cfs, which USFS says paddlers should avoid on the Sheyenne.",
        "Overhanging trees, logjams, bridge abutments, big rocks, shallow bars, muddy semi-primitive banks, and occasional portages around obstructions.",
        "Private-land boundaries, thunderstorms, wind, limited mid-route services, and assuming the corridor-wide gauge perfectly reflects every local channel feature."
      ]
    }
  },
  "sheyenne-river-ylvisaker-bridge-brome-field": {
    "putIn": {
      "id": "ylvisaker-bridge-hand-launch",
      "name": "Ylvisaker Bridge hand-launch",
      "latitude": 46.53246,
      "longitude": -97.34256
    },
    "takeOut": {
      "id": "brome-field-hand-launch",
      "name": "Brome Field hand-launch",
      "latitude": 46.53087339415233,
      "longitude": -97.31706518572886
    },
    "logistics": {
      "distanceLabel": "About 3 mi",
      "estimatedPaddleTime": "About 1 hr to 2.5 hr at ordinary flow, longer with low-water weaving, wood, or a slow group",
      "shuttle": "Stage the take-out at Brome Field before driving back to Ylvisaker Bridge. Both sites are semi-primitive hand launches rather than developed ramps, so inspect the approach roads, parking pull-offs, and shoreline footing before leaving vehicles.",
      "permits": "No route-specific private paddling permit is known. Use the signed public Sheyenne River Water Trail hand-launches, follow North Dakota boating and PFD rules, obey USFS rules, and skip the route when Baldhill flows are outside the official guidance or local access is closed.",
      "camping": "Treat this as a short daylight grassland float. No route-specific overnight plan is needed for Ylvisaker to Brome, and current paddlers should still respect public-land markers and avoid casual stops beyond them.",
      "campingClassification": "none",
      "summary": "Launch at Ylvisaker Bridge and take out at Brome Field for the shortest named Sheyenne National Grassland split. Use the USGS Baldhill Dam discharge gauge as a corridor-wide proxy and keep the call conservative because the official flow guidance applies to most of the river, not just this short reach.",
      "accessCaveats": [
        "USFS names both Ylvisaker Bridge and Brome Field as designated access points on the Sheyenne River Water Trail.",
        "The endpoint coordinates come from the hand-launch icon layer embedded in the official geospatial 2019 USFS brochure map. Treat them as practical access anchors, not survey-grade ramp coordinates.",
        "USFS says these Sheyenne National Grassland sites are semi-primitive hand-launch areas and are not recommended for trailered watercraft.",
        "Ylvisaker Bridge is described by USFS as the County Road 23 and Sibley Trail bridge crossing over the Sheyenne; use current road signs and shoreline conditions on arrival.",
        "USFS marks public-land boundaries along the route and says paddlers should not dock beyond those public-land markers."
      ],
      "watchFor": [
        "Flows at or below 100 cfs, when USFS says the river is very low and many sand or gravel bars may be exposed.",
        "Flows above 1,000 cfs, when current can become fast and shoreline trees, logs, and debris become more serious hazards.",
        "Flows above 2,000 cfs, which USFS says paddlers should avoid on the Sheyenne.",
        "Overhanging trees, logjams, bridge abutments, big rocks, shallow bars, muddy semi-primitive banks, and occasional portages around obstructions.",
        "Private-land boundaries, thunderstorms, wind, limited services, and assuming the corridor-wide gauge perfectly reflects every local channel feature."
      ]
    }
  },
  "sheyenne-river-mirror-pool-east-river": {
    "putIn": {
      "id": "mirror-pool-wma-hand-launch",
      "name": "Mirror Pool WMA hand-launch",
      "latitude": 46.50498692183727,
      "longitude": -97.29118124734387
    },
    "takeOut": {
      "id": "east-river-hand-launch",
      "name": "East River hand-launch",
      "latitude": 46.50234,
      "longitude": -97.23046
    },
    "logistics": {
      "distanceLabel": "About 8 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr at ordinary flow, longer with low-water weaving, wood, or a slow group",
      "shuttle": "Stage the take-out at East River before driving back to Mirror Pool. Both sites are semi-primitive hand launches rather than developed ramps, so inspect the approach roads, parking pull-offs, and shoreline footing before leaving vehicles.",
      "permits": "No route-specific private paddling permit is known. Use the signed public Sheyenne River Water Trail hand-launches, follow North Dakota boating and PFD rules, obey USFS and NDGF WMA rules, and skip the route when Baldhill flows are outside the official guidance or local access is closed.",
      "camping": "Treat this as a daylight grassland float. East River has picnic-table context but not route-specific campground support, so do not assume an overnight endpoint facility.",
      "campingClassification": "none",
      "summary": "Launch at Mirror Pool WMA and take out at East River for the longer downstream Sheyenne National Grassland split. Use the USGS Baldhill Dam discharge gauge as a corridor-wide proxy and keep the call conservative because the official flow guidance applies to most of the river, not just this reach.",
      "accessCaveats": [
        "USFS names both Mirror Pool and East River as designated put-in or pull-out sites on the Sheyenne River Water Trail.",
        "The endpoint coordinates come from the hand-launch icon layer embedded in the official geospatial 2019 USFS brochure map. Treat them as practical access anchors, not survey-grade ramp coordinates.",
        "USFS says these Sheyenne National Grassland sites are semi-primitive hand-launch areas and are not recommended for trailered watercraft.",
        "Mirror Pool is within a North Dakota Game and Fish wildlife management area. Follow current WMA signs and regulations on arrival.",
        "USFS says East River has picnic tables and bike racks but still treats it as hand-launch-only within the grassland water-trail corridor.",
        "USFS marks public-land boundaries along the route and says paddlers should not dock beyond those public-land markers."
      ],
      "watchFor": [
        "Flows at or below 100 cfs, when USFS says the river is very low and many sand or gravel bars may be exposed.",
        "Flows above 1,000 cfs, when current can become fast and shoreline trees, logs, and debris become more serious hazards.",
        "Flows above 2,000 cfs, which USFS says paddlers should avoid on the Sheyenne.",
        "Overhanging trees, logjams, big rocks, shallow bars, muddy semi-primitive banks, and occasional portages around obstructions.",
        "Private-land boundaries, thunderstorms, wind, limited mid-route services, and assuming the corridor-wide gauge perfectly reflects every local channel feature."
      ]
    }
  },
  "sheyenne-river-brome-field-east-river": {
    "putIn": {
      "id": "brome-field-hand-launch",
      "name": "Brome Field hand-launch",
      "latitude": 46.53087339415233,
      "longitude": -97.31706518572886
    },
    "takeOut": {
      "id": "east-river-hand-launch",
      "name": "East River hand-launch",
      "latitude": 46.50234,
      "longitude": -97.23046
    },
    "logistics": {
      "distanceLabel": "About 13 mi",
      "estimatedPaddleTime": "About 4 hr to 7 hr at ordinary flow, longer with low-water weaving, wood, or an overnight pace",
      "shuttle": "Stage the take-out at East River before driving back to Brome Field. Both sites are semi-primitive hand launches rather than developed ramps, so inspect the approach roads, parking pull-offs, and shoreline footing before leaving vehicles.",
      "permits": "No route-specific private paddling permit is known. Use the signed public Sheyenne River Water Trail hand-launches, follow North Dakota boating and PFD rules, obey USFS rules, and skip the route when Baldhill flows are outside the official guidance or local access is closed.",
      "camping": "The official USFS brochure map marks overnight-camping icons along this Brome-to-East corridor, so paddlers can treat the route as overnight-capable if they confirm current public-land rules and keep all stops inside legal public areas.",
      "campingClassification": "overnight_capable",
      "summary": "Launch at Brome Field and take out at East River for the longest currently documented Sheyenne National Grassland continuation. Use the USGS Baldhill Dam discharge gauge as a corridor-wide proxy and keep the call conservative because the official flow guidance applies to most of the river, not just this reach.",
      "accessCaveats": [
        "USFS names both Brome Field and East River as designated access points on the Sheyenne River Water Trail.",
        "The endpoint coordinates come from the hand-launch icon layer embedded in the official geospatial 2019 USFS brochure map. Treat them as practical access anchors, not survey-grade ramp coordinates.",
        "USFS says these Sheyenne National Grassland sites are semi-primitive hand-launch areas and are not recommended for trailered watercraft.",
        "USFS says East River has picnic tables and bike racks, but the route still relies on simple pull-offs and hand launches rather than developed ramps.",
        "USFS marks public-land boundaries along the route and says paddlers should not dock beyond those public-land markers. That matters even more if the group treats this as an overnight."
      ],
      "watchFor": [
        "Flows at or below 100 cfs, when USFS says the river is very low and many sand or gravel bars may be exposed.",
        "Flows above 1,000 cfs, when current can become fast and shoreline trees, logs, and debris become more serious hazards.",
        "Flows above 2,000 cfs, which USFS says paddlers should avoid on the Sheyenne.",
        "Overhanging trees, logjams, big rocks, shallow bars, muddy semi-primitive banks, and occasional portages around obstructions.",
        "Private-land boundaries, thunderstorms, wind, limited bailout certainty, and the extra fatigue that comes with turning a gentle corridor into a longer all-day or overnight commitment."
      ]
    }
  },
  "pembina-river-vang-riverside-park": {
    "putIn": {
      "id": "vang-bridge-county-55-access",
      "name": "Vang Bridge / County 55 access",
      "latitude": 48.9169,
      "longitude": -98.056
    },
    "takeOut": {
      "id": "walhalla-riverside-park-white-bridge-access",
      "name": "Walhalla Riverside Park / White Bridge access",
      "latitude": 48.91360599,
      "longitude": -97.91712315
    },
    "logistics": {
      "distanceLabel": "About 10.75 to 11 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr for competent moving-water paddlers, longer with low-water scraping, scouting, wood, or wind",
      "shuttle": "Stage the take-out at Walhalla Riverside Park or the adjacent Highway 32 / White Bridge access area before driving west to the Vang Bridge / County 55 put-in. Confirm current dock, path, parking, and park conditions before leaving vehicles because the put-in is a bridge-area carry and the take-out layout can shift with maintenance or river conditions.",
      "permits": "No route-specific private paddling permit is known. Use only signed or customary public access at Vang Bridge, Brickmine Bridge, White Bridge, and Riverside Park, follow North Dakota boating and PFD rules, and skip the run when the river is outside the American Whitewater range or local/state access is closed.",
      "camping": "Treat this as a daylight Pembina Gorge day run. Riverside Park has city campground facilities, but do not camp or stop on private banks along the river unless a site is clearly public and open.",
      "summary": "Launch at the Vang Bridge / County 55 access and take out at the Walhalla Highway 32 / Riverside Park access corridor for the main Pembina Gorge run. Use the direct USGS Walhalla gauge and American Whitewater range, with conservative caution for boulder gardens, strainers, muddy banks, and fast storm response.",
      "accessCaveats": [
        "Pembina County and Walhalla/Rendezvous Region materials identify canoe and kayak access at Vang Bridge, Brickmine Bridge, White Bridge, and Riverside Park, but current dock placement, parking, and carry paths should be verified on arrival.",
        "American Whitewater places the put-in near County 55 / 104th Street NE and describes a roadside carry to a rocky area. Do not block the bridge, road shoulder, field approaches, or private drives.",
        "The take-out coordinate is American Whitewater feature data for the County 32 / Walhalla access area; some paddlers continue slightly to Riverside Park. Use current signs and local access boundaries.",
        "ND Parks says Pembina River paddling is only when water levels allow. Rental operations, park notices, and local river reports may stop before the gauge reaches the absolute low cutoff used here.",
        "Because American Whitewater is the primary threshold source and the reach includes Class I-II boulder-garden hazards, the route is whitewater-filtered in PaddleTodayV2."
      ],
      "watchFor": [
        "Boulder gardens, small ledges or drops, shallow rocks, and scraping near the 300 cfs low end.",
        "Strainers, overhanging trees, flood debris, blind bends, steep muddy banks, and limited escape options in parts of the gorge.",
        "Quicksand-like mud or sand, unstable banks, and private property away from named access points.",
        "Fast rises after rain, high or pushy water near and above the high runnable range, cold water, thunderstorms, wind, and bridge hazards.",
        "Missing the intended Walhalla / Riverside Park take-out and drifting into an unplanned downstream reach."
      ]
    }
  },
  "little-missouri-rough-rider-medora-bridge": {
    "putIn": {
      "id": "rough-rider-state-park-canoe-kayak-access",
      "name": "Rough Rider State Park canoe/kayak access",
      "latitude": 46.89263398,
      "longitude": -103.54044775
    },
    "takeOut": {
      "id": "medora-bridge-usgs-gauge-access-anchor",
      "name": "Medora Bridge / USGS gauge access anchor",
      "latitude": 46.91684167,
      "longitude": -103.53228333
    },
    "logistics": {
      "distanceLabel": "About 3 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr when the Medora gauge is at or above the NPS floor, longer with shallow dragging, wind, scouting, or a slow group",
      "shuttle": "Stage the Medora Bridge take-out before driving south to Rough Rider State Park. Confirm current park access, bridge-area parking, and the exact exit path before launching because the take-out coordinate is a practical USGS bridge/gauge anchor rather than a signed ramp point.",
      "permits": "No route-specific private paddling permit is known for this short day reach. Pay any required state-park entrance fee, follow North Dakota boating and PFD rules, obey NPS/ND Parks notices, and skip the run when the Medora gauge is below the NPS fair-boating floor or rising quickly.",
      "camping": "Treat this as a short daylight Badlands float. Do not camp or stop on private banks unless the site is clearly public and open; NPS says camping on private land adjacent to the Little Missouri is prohibited by most landowners.",
      "summary": "Launch from the Rough Rider / former Sully Creek State Park Little Missouri access and take out at the Medora Bridge corridor for the short NPS-listed three-mile reach. Use USGS 06336000 at Medora and the NPS 2.5 ft / 699 cfs fair-boating floor, with high-water decisions kept conservative.",
      "accessCaveats": [
        "NPS names Sully Creek State Park to Medora Bridge as a 3-mile Little Missouri River segment, and ND Parks identifies Rough Rider State Park as having canoe/kayak access on the Little Missouri.",
        "Rough Rider was formerly Sully Creek State Park; current state-park signs and the ND Parks map should control the actual launch path.",
        "The Medora take-out coordinate is the official USGS Little Missouri at Medora bridge/gauge coordinate used as a practical Medora Bridge anchor, not a surveyed public ramp coordinate.",
        "This route uses an official minimum-only threshold. NPS publishes a fair-boating floor and good band at Medora, but Paddle Today does not infer a full high-water recommendation.",
        "Check same-day NPS, ND Parks, weather, flood, road, bridge, and debris conditions before staging vehicles or launching."
      ],
      "watchFor": [
        "Medora gauge readings below 2.5 ft / 699 cfs, when NPS says the river is below the fair-boating floor and dragging or impassable shallows are likely.",
        "Fast rises after summer thunderstorms, which NPS says can turn the Little Missouri into a debris-carrying torrent.",
        "Fences across the river, logs, flood debris, mud, cold water, rattlesnakes on banks, limited cell service, and delayed emergency response.",
        "Private land along the river corridor; avoid unplanned stops unless necessary for safety or clearly allowed at a public site.",
        "Bridge-area traffic, uncertain take-out footing, wind, shallow bars, and missing the planned Medora Bridge exit."
      ]
    }
  }
};
