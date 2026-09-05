// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const oklahomaRoutes: River[] = [
  {
    "id": "glover-river-fr56000-glover",
    "slug": "glover-river-fr56000-glover",
    "name": "Glover River",
    "reach": "FR 56000 near Octavia to the low-water bridge at Glover",
    "aliases": [
      "Glover River FR 56000 to Glover",
      "Glover River Honobia WMA reach",
      "Glover River lower wilderness float"
    ],
    "state": "Oklahoma",
    "region": "Southeast Oklahoma",
    "summary": "A guarded, remote 32.6-mile Glover River wilderness float from the FR 56000 access near Octavia to the low-water bridge at Glover. Southwest Paddler and American Whitewater document the named corridor, direct Glover gauge, seasonal character, hazards, and endpoint anchors; TravelOK documents the free-flowing river and Honobia-area access context.",
    "statusText": "Use direct USGS 07337900 near Glover. American Whitewater identifies 4.16 ft as low runnable on the named Glover reach; treat that community cue as a conservative minimum-only planning signal, never as a safe limit. The river is remote, rain-sensitive, permit/access constrained, and hazardous at high water; confirm current Honobia WMA/ODWC rules, endpoint legality, weather, debris, and a rescue-capable float plan before launch.",
    "latitude": 34.3133011,
    "longitude": -94.9421005,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["whitewater", "strainers", "fast_rise", "low_water", "remote", "access_uncertain", "private_banks", "cold_water"],
      "safetyNotes": [
        "This is a remote, long-distance Class II+ river trip for experienced paddlers with rescue skills, a reliable shuttle, and a filed float plan; it is not an unsupervised beginner route.",
        "American Whitewater's 4.16 ft low-runnable cue is community-calibrated and does not guarantee safe passage. Rising water, flash-flood forecasts, debris, bridge hazards, and local scouting override the cue.",
        "The Glover corridor has low-water rocks, ledges, falls, strainers, and rapid rises. Scout named hazards from legal land and portage anything outside the group's demonstrated ability.",
        "Honobia WMA/ODWC access and permit conditions can change. Use only the named FR 56000 and Glover-area endpoint anchors after confirming current land-manager rules; do not infer public access from an unmarked bank or road.",
        "Use designated WMA or nearby basecamp facilities only. There are no assumed on-route services or informal camping rights; carry water, communication, repair, and emergency equipment."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07337900",
      "provider": "usgs",
      "siteId": "07337900",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Glover near Glover, OK",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07337900/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07337900"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 4.16,
      "thresholdSource": {
        "label": "American Whitewater Glover River reach low-runnable cue",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/2579/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [3, 4, 5, 6, 7, 8, 9, 10, 11],
      "seasonNotes": "Glover is free-flowing and highly rainfall-sensitive. Use the direct gauge only as one input alongside recent rain, flash-flood forecasts, stage trend, debris, endpoint access, and a same-day scout.",
      "difficulty": "hard",
      "difficultyNotes": "Remote Class II+ character, ledges, falls, strainers, low-water obstructions, rapid rises, long shuttle, and limited services require experienced paddlers and self-rescue capability.",
      "confidenceNotes": "The route clears the quality bar as a guarded route: American Whitewater names the reach, direct Glover gauge, hazards, and access anchors; Southwest Paddler supplies the FR 56000 and Glover-area coordinates and access sequence; TravelOK confirms the free-flowing, untamed river and high-water danger. The 4.16 ft cue is community guidance rather than an official safe limit, and permit/access verification remains mandatory."
    },
    "putIn": {
      "name": "FR 56000 access near Octavia",
      "latitude": 34.3133011,
      "longitude": -94.9421005
    },
    "takeOut": {
      "name": "Low-water bridge at Glover",
      "latitude": 34.1006012,
      "longitude": -94.9039001
    },
    "logistics": {
      "distanceLabel": "About 32.6 river miles",
      "estimatedPaddleTime": "About 12–20 hours depending on stage, scouting, portages, and wood; plan a split trip if daylight and rescue margins require it",
      "shuttle": "Stage the Glover-area vehicle first, then verify the FR 56000 approach, parking, carry, and road conditions. The shuttle is remote and may require high-clearance planning; do not assume cell coverage.",
      "permits": "Confirm current Honobia WMA/ODWC permit, boating/PFD, parking, road, and land-manager rules before entering. Do not infer permission from a secondary guide or an unlocked gate.",
      "camping": "Use only designated WMA or nearby basecamp facilities after confirming current rules; no informal riverbank camping or private-bank access is assumed.",
      "campingClassification": "nearby_basecamp",
      "summary": "Treat as a remote multi-hour or split-day expedition with a verified shuttle, permit/access check, conservative stage decision, emergency communication plan, and daylight margin.",
      "accessCaveats": [
        "FR 56000 and the low-water bridge are source-backed endpoint anchors, but current road, parking, gate, permit, and land-manager conditions must be verified before committing.",
        "The river passes remote and potentially private banks; use only named public/authorized access and do not trespass for scouting, camping, or take-out.",
        "No rescue, fuel, food, or reliable cell service is assumed along the reach. Leave a route plan with a responsible contact and define a hard turnaround rule.",
        "High water can become dangerous rapidly; low water exposes rocks and ledges. Stage trend, rain, debris, and group skill override any guide number."
      ],
      "watchFor": [
        "USGS 07337900 below 4.16 ft, rising rapidly, or changing outside the local guide cue",
        "flash rain, flood warnings, strainers, ledges, falls, low-water bridges, and debris",
        "WMA permit, gate, road, parking, and private-bank restrictions",
        "cold water, daylight loss, remoteness, and failed shuttle or communications plans"
      ]
    },
    "accessPoints": [
      {
        "id": "glover-river-fr56000-put-in",
        "name": "FR 56000 access near Octavia",
        "latitude": 34.3133011,
        "longitude": -94.9421005,
        "mileFromStart": 0,
        "segmentKind": "transition",
        "note": "Southwest Paddler endpoint anchor; confirm current WMA/ODWC authorization, road, parking, and carry conditions from land."
      },
      {
        "id": "glover-river-glover-low-water-bridge-takeout",
        "name": "Low-water bridge at Glover",
        "latitude": 34.1006012,
        "longitude": -94.9039001,
        "mileFromStart": 32.6,
        "segmentKind": "transition",
        "note": "Source-backed downstream endpoint anchor; verify current public/authorized take-out, bridge current, road, and carry conditions before launching."
      }
    ],
    "evidenceNotes": [
      {
        "label": "Named paddling corridor",
        "value": "FR 56000 near Octavia to the low-water bridge at Glover, about 32.6 miles",
        "note": "Southwest Paddler documents the named Glover corridor, access sequence, and endpoint coordinates; American Whitewater documents a named 24.3-mile Glover reach and hazards.",
        "sourceUrl": "https://southwestpaddler.com/docs/littleok7.html"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07337900 Glover near Glover",
        "note": "USGS provides direct discharge and gage-height telemetry for the Glover basin; the route uses gage height because the published community cue is stage-based.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07337900/"
      },
      {
        "label": "Flow planning",
        "value": "4.16 ft low-runnable community cue; minimum-only planning model",
        "note": "American Whitewater reports the named reach as 4.16 ft below low-runnable guidance at review time. Treat this as a community calibration, not an official safe limit or a substitute for trend, weather, debris, and scouting.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/2579/main"
      },
      {
        "label": "Access and land-manager context",
        "value": "Honobia WMA/ODWC and free-flowing Glover River context",
        "note": "TravelOK describes Glover as free-flowing and untamed, with low-water and high-water hazards; current WMA permit and endpoint rules must be confirmed.",
        "sourceUrl": "https://www.travelok.com/listings/view.profile/id.3031"
      },
      {
        "label": "Rights-clean image decision",
        "value": "Use the approved route-photo fallback until a route-specific license is verified",
        "note": "No external image is copied from American Whitewater, Southwest Paddler, or TravelOK; the route remains eligible with approved fallback imagery.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/2579/main"
      }
    ],
    "sourceLinks": [
      {"label": "American Whitewater Glover River reach", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/2579/main", "provider": "american_whitewater"},
      {"label": "Southwest Paddler Glover River guide", "url": "https://southwestpaddler.com/docs/littleok7.html", "provider": "local"},
      {"label": "TravelOK Glover River", "url": "https://www.travelok.com/listings/view.profile/id.3031", "provider": "local"},
      {"label": "USGS 07337900 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07337900/", "provider": "usgs"},
      {"label": "USGS 07337900 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07337900", "provider": "usgs"}
    ]
  },
  {
    "id": "illinois-river-watts-chewey",
    "slug": "illinois-river-watts-chewey",
    "name": "Illinois River",
    "reach": "Watts Public Access to Chewey Bridge",
    "aliases": [
      "Upper Illinois River Watts to Chewey",
      "Illinois River Watts Public Access to Chewey Bridge",
      "Illinois River upper 20.5-mile float"
    ],
    "state": "Oklahoma",
    "region": "Northeast Oklahoma",
    "summary": "A guarded 20.5-mile Upper Illinois River float from the named Watts Public Access to the public Chewey Bridge access. TravelOK and the Illinois River access guide document the established paddling corridor and public access sequence, Southwest Paddler publishes the direct Watts gauge and conservative flow ladder, and USGS provides current discharge and gage height telemetry.",
    "statusText": "Use direct USGS 07195500 near Watts. Treat 150 cfs as a conservative low-flow check, 525–4,000 cfs as the broad community-described planning band, and 4,700 cfs as an upper caution point; these are not universal safe limits. The corridor has downed-tree/strainer exposure, rapid rise, private-bank constraints, and a long shuttle. Use only named public access points and confirm current fees, parking, and river notices.",
    "latitude": 36.13008185,
    "longitude": -94.5721645,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "remote",
        "access_uncertain",
        "cold_water"
      ],
      "safetyNotes": [
        "This is a long natural-river float, not a guaranteed beginner outing. Wear PFDs, file a float plan, carry rescue equipment, and plan for changing weather, wood, and current.",
        "Use 150 cfs only as a conservative low-water check, 525–4,000 cfs as a broad planning band, and 4,700 cfs as an upper caution point from community paddling guidance. Rising water, debris, flood forecasts, and local access conditions override these cues.",
        "Use Watts Public Access and Chewey Bridge public access, plus other named public areas only when the current access agreement, parking, fees, and carry are confirmed. Do not use private resort or private-bank access as an endpoint.",
        "Southwest Paddler notes downed trees and strainers, especially between Watts and Chewey. Scout from legal public access points and do not assume every gravel bar or bank is public.",
        "Stage the downstream vehicle before launching. Use designated outfitter or public-access camping only; no informal riverbank camping is assumed."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07195500",
      "provider": "usgs",
      "siteId": "07195500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Illinois River near Watts, OK",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07195500/",
      "hydrographUrl": "https://waterdata.usgs.gov/ok/nwis/uv/?agency_cd=USGS&site_no=07195500"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 525,
      "idealMax": 4000,
      "tooLow": 150,
      "tooHigh": 4700,
      "thresholdSource": {
        "label": "Southwest Paddler Illinois River flow guidance tied to Watts, Chewey, and Tahlequah gauges",
        "url": "https://southwestpaddler.com/docs/illinois.html",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [3, 4, 5, 6, 7, 8, 9, 10, 11],
      "seasonNotes": "The access guide describes year-round use when weather permits, while the river is highly rainfall-sensitive. Check the direct Watts gauge, recent rainfall, flash-flood forecasts, debris, and current public-access notices before every launch.",
      "difficulty": "moderate",
      "difficultyNotes": "Mostly Class I current with occasional riffles, but the long distance, strainers, private-bank constraints, cold water, and rapidly changing flow require a conservative plan and competent self-rescue.",
      "confidenceNotes": "Confidence is sufficient for a guarded route: TravelOK describes the Illinois as Oklahoma's premier canoe stream with outfitters and float logistics; Southwest Paddler names Watts Public Access, Chewey Bridge, public access mileage, direct gauge, flow guidance, and hazards; USGS 07195500 provides live telemetry and exact station coordinates. The numeric flow ladder is community-calibrated, not an official safety guarantee."
    },
    "putIn": {
      "name": "Watts Public Access Area off US-59",
      "latitude": 36.1303056,
      "longitude": -94.5726944
    },
    "takeOut": {
      "name": "Chewey Bridge public access on the Illinois River",
      "latitude": 36.1042527,
      "longitude": -94.7827283
    },
    "logistics": {
      "distanceLabel": "About 20.5 river miles",
      "estimatedPaddleTime": "About 8–12 hours depending on flow, stops, wood, and scouting; many paddlers split the corridor",
      "shuttle": "Stage the Chewey Bridge vehicle first, then drive to Watts Public Access. Confirm current access, parking, carry, and any fee or reservation requirements from land.",
      "permits": "No route-specific paddling permit was identified. Follow Oklahoma boating/PFD rules, Oklahoma Scenic Rivers Commission/ODWC access rules, posted restrictions, and any current outfitter or public-access fee requirements.",
      "camping": "Use designated outfitter or public-access camping near the corridor; no informal riverbank camping is assumed.",
      "campingClassification": "nearby_basecamp",
      "summary": "Plan this as a long day or split outing with a vehicle shuttle. Use only named public access, and make a same-day flow, weather, wood, and access decision.",
      "accessCaveats": [
        "The Watts and Chewey access names are documented, but current parking, fees, operating agreements, and carry conditions can change.",
        "Several intermediate public accesses exist, while some resort and riverbank locations are private or fee-controlled. Do not infer public access from a map pin or gravel bar.",
        "The route overlaps a busy outfitter corridor in places; leave room for commercial traffic and confirm any seasonal closures or commercial-use restrictions.",
        "The long shuttle and remote banks require a reliable vehicle, communication plan, and a conservative turnaround decision."
      ],
      "watchFor": [
        "Watts discharge below 150 cfs, above 4,700 cfs, or rising rapidly",
        "downed trees, strainers, bridge current, and flood debris",
        "private-bank or fee-controlled access",
        "cold water, thunderstorms, and missed intermediate take-outs",
        "parking, reservation, and commercial-use rule changes"
      ]
    },
    "accessPoints": [
      {
        "id": "illinois-river-watts-public-access",
        "name": "Watts Public Access Area off US-59",
        "latitude": 36.1303056,
        "longitude": -94.5726944,
        "mileFromStart": 0,
        "segmentKind": "transition",
        "note": "Named public launch north of Watts; verify current parking, carry, and any fee or access restrictions before launching."
      },
      {
        "id": "illinois-river-chewey-bridge-public-access",
        "name": "Chewey Bridge public access on the Illinois River",
        "latitude": 36.1042527,
        "longitude": -94.7827283,
        "mileFromStart": 20.5,
        "segmentKind": "transition",
        "note": "Named public take-out; confirm current reservation, parking, fee, and carry conditions."
      }
    ],
    "evidenceNotes": [
      {
        "label": "Named paddling corridor",
        "value": "Watts Public Access to Chewey Bridge, about 20.5 miles",
        "note": "Southwest Paddler lists Watts Public Access as the first put-in, Chewey Bridge as a public access at river mile 20.5, and the Illinois as a Class I float corridor with named public access sequence.",
        "sourceUrl": "https://southwestpaddler.com/docs/illinois.html"
      },
      {
        "label": "Official paddling and outfitter context",
        "value": "Upper Illinois is a heavily used canoe, kayak, and raft corridor",
        "note": "TravelOK describes the Illinois as Oklahoma's best canoe stream with more than 60 miles of floatable river, outfitters, shuttle support, and camping context.",
        "sourceUrl": "https://www.travelok.com/listings/view.profile/id.3759"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07195500 Illinois River near Watts",
        "note": "USGS provides direct discharge and gage-height telemetry and exact station coordinates for the upstream corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07195500/"
      },
      {
        "label": "Flow planning",
        "value": "150 cfs minimum; 525–4,000 cfs broad planning band; 4,700 cfs upper caution",
        "note": "Southwest Paddler publishes the local gauge-linked flow ladder; it is conservative community guidance, not an official safe limit.",
        "sourceUrl": "https://southwestpaddler.com/docs/illinois.html"
      },
      {
        "label": "Endpoint coordinates",
        "value": "36.1303056, -94.5726944 to 36.1042527, -94.7827283",
        "note": "Southwest Paddler publishes the Watts launch coordinates; Chewey Bridge uses the defensible public-access anchor already documented by USGS/Corps and Illinois River outfitter sources.",
        "sourceUrl": "https://www.illinoisriveroutfitters.com/"
      },
      {
        "label": "Rights-clean image decision",
        "value": "Use the approved route-photo fallback until a route-specific license is verified",
        "note": "No external image is copied from TravelOK, Southwest Paddler, or outfitters; the route remains eligible with approved fallback imagery.",
        "sourceUrl": "https://www.travelok.com/listings/view.profile/id.3759"
      }
    ],
    "sourceLinks": [
      {
        "label": "TravelOK Illinois River listing",
        "url": "https://www.travelok.com/listings/view.profile/id.3759",
        "provider": "local"
      },
      {
        "label": "Southwest Paddler Illinois River guide",
        "url": "https://southwestpaddler.com/docs/illinois.html",
        "provider": "local"
      },
      {
        "label": "USGS 07195500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07195500/",
        "provider": "usgs"
      },
      {
        "label": "Illinois River outfitters/public access",
        "url": "https://www.illinoisriveroutfitters.com/",
        "provider": "local"
      },
      {
        "label": "Upper Illinois American Whitewater reach context",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4460/main",
        "provider": "local"
      }
    ]
  },
  {
    "id": "lower-mountain-fork-reregulation-dam-us70",
    "slug": "lower-mountain-fork-reregulation-dam-us70",
    "name": "Lower Mountain Fork River",
    "reach": "Mountain Fork Park Re-regulation Dam to US-70 Bridge",
    "aliases": [
      "Lower Mountain Fork - Re-regulation Dam to US-70",
      "Mountain Fork Park to US-70 bridge",
      "Lower Mountain Fork 3-mile float"
    ],
    "state": "Oklahoma",
    "region": "Southeast Oklahoma",
    "summary": "A guarded 3.1-mile Lower Mountain Fork float from the public below-dam ramp at Mountain Fork Park to the public US-70 bridge landing. TravelOK and Oklahoma trout-area guidance identify the reach and public access, while the direct Eagletown gauge and a conservative local flow model support a same-day launch decision.",
    "statusText": "Use direct USGS 07339000 near Eagletown. Treat 100 cfs as the conservative minimum, 500–1,000 cfs as the documented preferred range, and 3,000 cfs as the upper caution point from the cited paddling guide. Launch only below the re-regulation dam; scout or portage Presbyterian Falls and do not treat the dam, falls, or private-bank access as runnable or public.",
    "latitude": 34.0816583,
    "longitude": -94.6330917,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "whitewater",
        "strainers",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "Launch only from the public below-dam ramp at Mountain Fork Park. The re-regulation dam is the upstream boundary of this route; never approach, run, or portage the dam from the water.",
        "Presbyterian Falls is a named access and hazard within the reach. Scout from shore and portage any ledge, rapid, or wood that is not clearly within the group's ability; do not infer that a public access makes the feature runnable.",
        "Use 100 cfs only as a conservative low-water check, 500–1,000 cfs as the documented preferred range, and 3,000 cfs as an upper caution point. The local flow model is not a universal safe limit; rising water, releases, debris, and weather override it.",
        "Use only the public Mountain Fork Park and US-70 bridge access points. The private outfitter landing across the river from the US-70 public landing is not a substitute for the named take-out.",
        "Wear PFDs, carry throw/rescue equipment, file a float plan, and stage the downstream vehicle before launching. Beavers Bend and Mountain Fork Park provide nearby camping, but no informal riverbank camping is assumed."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07339000",
      "provider": "usgs",
      "siteId": "07339000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Mountain Fork near Eagletown, OK",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07339000/",
      "hydrographUrl": "https://waterdata.usgs.gov/ok/nwis/uv/?agency_cd=USGS&site_no=07339000"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 1000,
      "tooLow": 100,
      "tooHigh": 3000,
      "thresholdSource": {
        "label": "Southwest Paddler Lower Mountain Fork flow guidance tied to the Eagletown gauge",
        "url": "https://southwestpaddler.com/docs/littleok9.html",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [3, 4, 5, 6, 7, 8, 9, 10, 11],
      "seasonNotes": "The cited guide describes year-round use when weather permits, while TravelOK describes the lower river as a spring-through-fall float. Check USACE release information, the direct gauge, rainfall, and current access notices before every launch.",
      "difficulty": "moderate",
      "difficultyNotes": "A short reach with Class II+ character, a dam boundary, Presbyterian Falls, ledges, strainers, and release-sensitive current. Distance is modest, but scouting and portage decisions make it inappropriate as an unsupervised beginner float.",
      "confidenceNotes": "Confidence is sufficient for a guarded Oklahoma route: TravelOK and Oklahoma trout-area guidance identify the below-dam-to-US-70 corridor and public access; the cited paddling guide supplies exact endpoint coordinates, distance, hazard notes, and conservative flow guidance tied to the Eagletown gauge; USGS 07339000 is the direct live telemetry source and returned 467 cfs / 1.71 ft at 2026-08-25 20:30 CDT, inside the cited preferred range. The numeric flow band is community-calibrated, not an official manager guarantee."
    },
    "putIn": {
      "name": "Mountain Fork Park Re-regulation Dam below-dam public ramp",
      "latitude": 34.0816583,
      "longitude": -94.6330917
    },
    "takeOut": {
      "name": "US-70 bridge public landing",
      "latitude": 34.0418333,
      "longitude": -94.6212194
    },
    "logistics": {
      "distanceLabel": "About 3.1 river miles",
      "estimatedPaddleTime": "About 2–4 hours including scouting and any portage",
      "shuttle": "Stage the US-70 bridge public landing vehicle first, then drive to Mountain Fork Park. Confirm the public-side parking, carry, and take-out signage from land before launching.",
      "permits": "No route-specific paddling permit was identified. Follow Oklahoma boating/PFD rules, ODWC/USACE/park rules, posted access restrictions, and current dam-release notices.",
      "camping": "Day route with nearby designated camping at Beavers Bend State Park and Mountain Fork Park; no on-route informal camping is assumed.",
      "campingClassification": "nearby_basecamp",
      "summary": "Use the named below-dam Mountain Fork Park ramp and US-70 public landing for a short but feature-rich day route. Make a same-day flow, release, weather, rapid, wood, and take-out decision.",
      "accessCaveats": [
        "The route begins below the re-regulation dam; do not launch above the dam or approach its structures from the water.",
        "Presbyterian Falls is a named access and rapid area, not a guarantee of a runnable line. Scout, portage, and follow posted signs.",
        "The cited guide identifies the public US-70 landing and separately identifies private outfitter access; use the public landing only and verify current parking/shoreline conditions.",
        "Do not treat Beavers Bend camping or a reachable bank as permission to camp anywhere along the river; use designated facilities and current rules."
      ],
      "watchFor": [
        "Eagletown discharge below 100 cfs, above 3,000 cfs, or rising rapidly",
        "dam and release changes, Presbyterian Falls, ledges, boulder fields, strainers, and bridge current",
        "cold water, thunderstorms, floating wood, motorized wakes, private banks, and a missed US-70 take-out"
      ]
    },
    "accessPoints": [
      {
        "id": "lower-mountain-fork-reregulation-dam-ramp",
        "name": "Mountain Fork Park Re-regulation Dam below-dam public ramp",
        "latitude": 34.0816583,
        "longitude": -94.6330917,
        "mileFromStart": 0,
        "segmentKind": "transition",
        "note": "Public below-dam launch at Mountain Fork Park; verify current ramp, parking, and release notices from land."
      },
      {
        "id": "lower-mountain-fork-presbyterian-falls",
        "name": "Presbyterian Falls public access / hazard area",
        "latitude": 34.06575,
        "longitude": -94.6229639,
        "mileFromStart": 1.3,
        "segmentKind": "transition",
        "note": "Named public access near a rapid/falls complex; scout and portage as needed rather than assuming a runnable line."
      },
      {
        "id": "lower-mountain-fork-us70-public-landing",
        "name": "US-70 bridge public landing",
        "latitude": 34.0418333,
        "longitude": -94.6212194,
        "mileFromStart": 3.1,
        "segmentKind": "transition",
        "note": "Public-side landing at the US-70 bridge; a private outfitter landing across the river is not the route take-out."
      }
    ],
    "evidenceNotes": [
      {
        "label": "Official route corridor",
        "value": "Below the re-regulation dam to the US-70 bridge, about 3 miles",
        "note": "TravelOK identifies the lower river float from Mountain Fork Park below the re-regulation dam to the US-70 bridge and also identifies public access near Presbyterian Falls.",
        "sourceUrl": "https://web2.travelok.com/articles/have-canoe-will-travel"
      },
      {
        "label": "Public access and camping",
        "value": "Boat ramps below/near the re-regulation dam; public access at Presbyterian Falls; Beavers Bend camping",
        "note": "The official lower Mountain Fork listing and Oklahoma trout-area guidance document public access and designated camping context; private-bank camping is not inferred.",
        "sourceUrl": "https://web2.travelok.com/gb/listings/view.profile/id.4670"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07339000 Mountain Fork near Eagletown",
        "note": "USGS provides direct discharge and gage-height telemetry for the lower Mountain Fork corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07339000/"
      },
      {
        "label": "Flow guidance",
        "value": "100 cfs minimum; 500–1,000 cfs preferred; 3,000 cfs maximum caution point",
        "note": "Southwest Paddler publishes the Eagletown-gauge flow guidance and classifies the reach as a 16.6-mile Lower Mountain Fork corridor; this route uses the shorter dam-to-US-70 section and keeps the numeric model conservative/community-sourced.",
        "sourceUrl": "https://southwestpaddler.com/docs/littleok9.html"
      },
      {
        "label": "Endpoint coordinates",
        "value": "34.0816583, -94.6330917 to 34.0418333, -94.6212194",
        "note": "The cited paddling guide publishes the re-regulation dam ramp, Presbyterian Falls, and US-70 bridge coordinates; the route stores the public below-dam and public-side US-70 endpoints and the named intermediate hazard/access point.",
        "sourceUrl": "https://southwestpaddler.com/docs/littleok9.html"
      },
      {
        "label": "Recent official gauge reading",
        "value": "467 cfs and 1.71 ft at 2026-08-25 20:30 CDT",
        "note": "USGS Water Services returned the latest provisional discharge and gage-height observations during review; the discharge was inside the cited preferred range at review time.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07339000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Rights-clean image decision",
        "value": "Use the existing approved route-photo fallback until a route-specific license is verified",
        "note": "No route-specific image is copied from TravelOK or the secondary guide. The route remains eligible for publication with the app's approved fallback imagery; a Wikimedia/agency image can be added later only after explicit rights verification.",
        "sourceUrl": "https://web2.travelok.com/gb/listings/view.profile/id.4670"
      }
    ],
    "sourceLinks": [
      {
        "label": "TravelOK Lower Mountain Fork River",
        "url": "https://web2.travelok.com/gb/listings/view.profile/id.4670",
        "provider": "local"
      },
      {
        "label": "TravelOK Oklahoma paddling guide",
        "url": "https://web2.travelok.com/articles/have-canoe-will-travel",
        "provider": "local"
      },
      {
        "label": "ODWC Lower Mountain Fork regulations and map",
        "url": "https://lmfrfoundation.org/area-information/lmfr-regulations-map/",
        "provider": "local"
      },
      {
        "label": "USACE Mountain Fork Park recreation map",
        "url": "https://www.swt.usace.army.mil/Portals/41/docs/missions/recreation/masterplan/broken_bow/Broken_Bow_MP_EA_12-2023.pdf",
        "provider": "local"
      },
      {
        "label": "Southwest Paddler Lower Mountain Fork guide",
        "url": "https://southwestpaddler.com/docs/littleok9.html",
        "provider": "local"
      },
      {
        "label": "USGS 07339000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07339000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07339000 current conditions",
        "url": "https://waterdata.usgs.gov/ok/nwis/uv/?agency_cd=USGS&site_no=07339000",
        "provider": "usgs"
      }
    ]
    },
  {
    "id": "flint-creek-us412-chewey",
    "riverId": "flint-creek-oklahoma",
    "slug": "flint-creek-us412-chewey",
    "name": "Flint Creek",
    "reach": "US-412 bridge to Chewey Bridge on the Illinois River",
    "aliases": ["Flint Creek US 412 to Illinois River", "Flint Creek to Chewey Bridge", "Flint Creek Illinois River tributary run"],
    "state": "Oklahoma",
    "region": "Northeast Oklahoma",
    "summary": "A guarded 9.1-mile Flint Creek-to-Illinois River reach from the US-412 bridge to the public Chewey Bridge access. American Whitewater names the corridor and direct Kansas gauge; USGS/OWRB and Corps records establish defensible station and take-out coordinates, while local river-access and high-water guidance support conservative launch planning.",
    "statusText": "Use direct USGS 07196000 near Kansas. Treat 74 cfs as a conservative minimum and 75–241 cfs as a cautious planning band derived from the named reach, local normal-flow context, and high-water advisory; this is not a universal safe limit. The US-412 put-in includes a dam hazard, and the reach has strainers, private-bank constraints, a long shuttle, and rapidly changing water.",
    "latitude": 36.1867733,
    "longitude": -94.70680493,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["dam", "strainers", "fast_rise", "private_banks", "remote", "access_uncertain"],
      "safetyNotes": [
        "The US-412 bridge put-in is adjacent to a dam hazard. Inspect the launch from land and never approach, run, or portage an unsafe structure from the water.",
        "American Whitewater reports strainers and notes that the Fidler's Bend/Illinois River access is private; use only the named public US-412 parking and Chewey Bridge access.",
        "Use 74 cfs only as a conservative minimum and 75–241 cfs as a planning band. Rising water, debris, weather, and local access conditions override these community-calibrated cues.",
        "The route has an approximately 18-mile shuttle. Stage the Chewey Bridge vehicle first and confirm current public access, parking, and any outfitter reservation or fee requirements.",
        "Wear PFDs, carry rescue equipment, file a float plan, and use designated nearby camping or outfitter facilities only; no informal riverbank camping is assumed."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07196000",
      "provider": "usgs",
      "siteId": "07196000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Flint Creek near Kansas, OK",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07196000/",
      "hydrographUrl": "https://waterdata.usgs.gov/ok/nwis/uv/?agency_cd=USGS&site_no=07196000"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 74,
      "idealMax": 241,
      "tooLow": 74,
      "tooHigh": 241,
      "thresholdSource": {
        "label": "American Whitewater Flint Creek reach and Save the Illinois River / local high-water guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4461/main",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [3, 4, 5, 6, 7, 8, 9, 10, 11],
      "seasonNotes": "The creek is seasonal and rain-sensitive. Check the direct USGS gauge, recent rainfall, debris, and current Illinois River access notices immediately before launch.",
      "difficulty": "moderate",
      "difficultyNotes": "The named reach is generally Class II with stronger features possible, but the dam boundary, strainers, private access, remote carry, and long shuttle make it unsuitable as an unsupervised beginner route.",
      "confidenceNotes": "Confidence is sufficient for a guarded route: American Whitewater names the reach, direct gauge, hazards, put-in, and first legal take-out; USGS/OWRB and Corps records provide defensible coordinates; Illinois River outfitters document Chewey Bridge public access. The flow band is conservative community guidance, not an official safe limit."
    },
    "putIn": {
      "name": "US-412 bridge public parking and Flint Creek put-in",
      "latitude": 36.1867733,
      "longitude": -94.70680493
    },
    "takeOut": {
      "name": "Chewey Bridge public access on the Illinois River",
      "latitude": 36.1042527,
      "longitude": -94.7827283
    },
    "logistics": {
      "distanceLabel": "About 9.1 river miles",
      "estimatedPaddleTime": "About 5–8 hours including the Illinois River segment, scouting, and any portage",
      "shuttle": "Stage the Chewey Bridge vehicle first, then drive to the US-412 bridge. Confirm the public-side parking, carry, and take-out signage from land.",
      "permits": "No route-specific permit was identified. Confirm current Oklahoma Scenic Rivers, access-owner, boating/PFD, and outfitter rules before launching; Chewey Bridge may require an outfitter reservation or fee for shuttle/parking.",
      "camping": "Day route with nearby designated Illinois River outfitter and campground support; no on-route informal camping is assumed.",
      "campingClassification": "nearby_basecamp",
      "summary": "Use only the named public US-412 and Chewey Bridge access points. Make a same-day flow, weather, dam, debris, access, and shuttle decision.",
      "accessCaveats": [
        "American Whitewater identifies the first legal take-out as Chewey Road/Chewey Bridge and warns that Fidler's Bend access is private.",
        "Chewey Bridge public access is documented by Illinois River outfitters, but current reservation, parking, and fee rules must be confirmed before launch.",
        "Do not use private banks or informal pull-outs for scouting, camping, or take-out.",
        "The long shuttle and mixed Flint Creek/Illinois River reach require a vehicle and float plan that can handle changing road and river conditions."
      ],
      "watchFor": ["US-412 dam and bridge current", "strainers and debris", "rapidly rising water", "private Fidler's Bend access", "Chewey Bridge parking or fee changes", "weather and cold-water exposure"]
    },
    "accessPoints": [
      {
        "id": "flint-creek-us412-public-put-in",
        "name": "US-412 bridge public parking and Flint Creek put-in",
        "latitude": 36.1867733,
        "longitude": -94.70680493,
        "mileFromStart": 0,
        "segmentKind": "transition",
        "note": "American Whitewater reports parking on the west side of the creek; inspect the dam/bridge hazard from land before launching."
      },
      {
        "id": "flint-creek-chewey-bridge-public-takeout",
        "name": "Chewey Bridge public access on the Illinois River",
        "latitude": 36.1042527,
        "longitude": -94.7827283,
        "mileFromStart": 9.1,
        "segmentKind": "transition",
        "note": "Public outfitter-supported access; confirm current reservation, fee, parking, and carry conditions."
      }
    ],
    "evidenceNotes": [
      {"label": "Named route reach", "value": "US-412 to Illinois River, about 9.1 miles", "note": "American Whitewater names the Flint Creek reach, direct Kansas gauge, Class II(IV) character, dam and strainer hazards, and the first legal Chewey Road take-out.", "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4461/main"},
      {"label": "Direct live gauge", "value": "USGS 07196000 Flint Creek near Kansas", "note": "USGS provides direct discharge and gage-height telemetry for the named reach.", "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07196000/"},
      {"label": "Endpoint coordinates", "value": "36.1867733, -94.70680493 to 36.1042527, -94.7827283", "note": "OWRB/Water Quality Portal records the US-412 Flint Creek site; USGS and Corps records provide the Chewey Bridge station coordinates used as a defensible access anchor.", "sourceUrl": "https://www.waterqualitydata.us/provider/STORET/OKWRB-STREAMS_WQX/OKWRB-STREAMS_WQX-121700060010-001AT/"},
      {"label": "Flow planning", "value": "74 cfs minimum; 75–241 cfs conservative planning band", "note": "The band combines American Whitewater's gauge-linked recommended-flow signal, local normal-flow context at the Kansas gauge, and a high-water advisory; it is conservative community guidance, not an official safe limit.", "sourceUrl": "https://illinoisriver.org/articles/page/298/illinois-river-high-water-advisory"},
      {"label": "Public take-out and logistics", "value": "Chewey Bridge public access with shuttle/outfitter support", "note": "Illinois River outfitters list Chewey Bridge as a public access and shuttle destination; current reservation, fee, parking, and access rules must be checked.", "sourceUrl": "https://www.illinoisriveroutfitters.com/"},
      {"label": "Rights-clean image decision", "value": "Use approved route-photo fallback until a route-specific license is verified", "note": "No image is copied from American Whitewater, TravelOK, or outfitters; the route remains eligible with approved fallback imagery.", "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4461/main"}
    ],
    "sourceLinks": [
      {"label": "American Whitewater Flint Creek reach", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4461/main", "provider": "local"},
      {"label": "USGS 07196000 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07196000/", "provider": "usgs"},
      {"label": "OWRB/Water Quality Portal US-412 coordinate", "url": "https://www.waterqualitydata.us/provider/STORET/OKWRB-STREAMS_WQX/OKWRB-STREAMS_WQX-121700060010-001AT/", "provider": "local"},
      {"label": "USGS/Corps Chewey Bridge station coordinates", "url": "https://www.swl.usace.army.mil/Portals/50/siteimages/Water-Management/irfs/IllinioisRiverModelingReportFinal.pdf", "provider": "usgs"},
      {"label": "Illinois River high-water advisory", "url": "https://illinoisriver.org/articles/page/298/illinois-river-high-water-advisory", "provider": "local"},
      {"label": "Chewey Bridge public access/outfitter", "url": "https://www.illinoisriveroutfitters.com/", "provider": "local"}
    ]
  },
  {
    "id": "blue-river-hwy7-cheadle-falls",
    "slug": "blue-river-hwy7-cheadle-falls",
    "name": "Blue River",
    "reach": "SH-7 bridge to E. Cheadle Road",
    "aliases": ["Blue River Hwy 7 to Cheadle Falls", "Blue River Connerville run"],
    "state": "Oklahoma",
    "region": "South-Central Oklahoma",
    "summary": "A guarded 9.5-mile Blue River whitewater reach from the SH-7 bridge access to the E. Cheadle Road take-out. TravelOK identifies the public Blue River recreation area and Class II–III float opportunity; American Whitewater and Southwest Paddler provide the named reach, direct Connerville gauge, endpoint coordinates, and conservative flow guidance.",
    "statusText": "Use direct USGS 07332390 near Connerville. The cited local guide gives 350 cfs as a minimum and 500–2,000 cfs as the preferred range, but the river is rainfall-dependent and advanced. Confirm the Blue River Conservation Passport/WMA access rules, verify the public SH-7 launch and E. Cheadle Road take-out from land, and do not run ledges, strainers, or flood-stage water without appropriate whitewater skill and rescue equipment.",
    "latitude": 34.3613944,
    "longitude": -96.5898139,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["whitewater", "strainers", "fast_rise", "low_water", "cold_water", "remote", "access_uncertain"],
      "safetyNotes": [
        "This is an advanced Class II–III+ rain-dependent run, not a casual family float. Wear a properly fitted PFD, carry rescue equipment, and paddle only within the group's demonstrated ability.",
        "Use 350 cfs only as a conservative minimum and 500–2,000 cfs as the cited preferred range; rapidly rising water, flood-stage flow, debris, and local weather override any guide number.",
        "The Blue River Public Fishing and Hunting Area requires a Conservation Passport or applicable exemption. Confirm current ODWC access, parking, and launch rules before entering.",
        "Scout the ledges and low-water obstructions named by the paddling sources. The E. Cheadle Road take-out has limited/less-than-ideal bank access; verify the carry and roadside safety before launching.",
        "Use designated campground or nearby basecamp facilities only; no informal riverbank camping is assumed. File a float plan because the reach is remote and shuttle support is limited."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07332390",
      "provider": "usgs",
      "siteId": "07332390",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Blue River near Connerville, OK",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07332390/",
      "hydrographUrl": "https://waterdata.usgs.gov/ok/nwis/uv/?agency_cd=USGS&site_no=07332390"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 2000,
      "tooLow": 350,
      "tooHigh": 3000,
      "thresholdSource": {
        "label": "Southwest Paddler Blue River flow guidance tied to the Connerville gauge",
        "url": "https://southwestpaddler.com/docs/redok4.html",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [3, 4, 5, 6, 7, 8, 9, 10, 11],
      "seasonNotes": "TravelOK describes the river as a seasonal Class II–III kayak opportunity; the local guide emphasizes rainfall-dependent runnable water. Check the direct gauge, precipitation, flash-flood forecasts, and access notices before every launch.",
      "difficulty": "hard",
      "difficultyNotes": "Class II–III+ whitewater with ledges, strainers, remote access, and rapidly changing rainfall-driven levels. The route is for experienced whitewater paddlers with rescue skills, not unsupervised beginners.",
      "confidenceNotes": "The corridor is strong enough for a guarded route: TravelOK documents the public Blue River recreation area, limited access, camping, and Class II–III kayak use; American Whitewater names the 9.5-mile SH-7-to-Cheadle Falls reach and the direct Connerville gauge; Southwest Paddler supplies endpoint coordinates and conservative flow guidance. Numeric thresholds remain community-calibrated and must not override current weather, flood, access, or hazard conditions."
    },
    "putIn": {
      "name": "SH-7 bridge Blue River public/WMA access",
      "latitude": 34.3613944,
      "longitude": -96.5898139
    },
    "takeOut": {
      "name": "E. Cheadle Road take-out at the dam",
      "latitude": 34.2741611,
      "longitude": -96.5651778
    },
    "logistics": {
      "distanceLabel": "About 9.5 river miles",
      "estimatedPaddleTime": "About 4–7 hours depending on flow, scouting, and portage",
      "shuttle": "Stage the E. Cheadle Road vehicle first, then verify the SH-7 public access and carry. Do not assume private driveways, unofficial bank access, or commercial shuttle support.",
      "permits": "Blue River Public Fishing and Hunting Area access requires the Oklahoma Conservation Passport or an applicable exemption; verify current ODWC rules and posted access conditions.",
      "camping": "Designated Blue River campground and nearby Tishomingo-area basecamp options; no informal on-route camping is assumed.",
      "campingClassification": "nearby_basecamp",
      "summary": "Treat as a full-day, rain-dependent whitewater route with a pre-arranged shuttle, explicit passport/access check, and same-day flow and hazard decision.",
      "accessCaveats": [
        "TravelOK says public access is limited; confirm the exact SH-7 launch, parking, passport status, and take-out from land before committing.",
        "The cited paddling guide describes the E. Cheadle Road take-out as a dam access with less-than-ideal bank access. Carry carefully and keep vehicles clear of traffic.",
        "The route uses community-sourced endpoint coordinates and thresholds; retain the source links and do not infer additional public access along private banks."
      ],
      "watchFor": [
        "USGS 07332390 below 350 cfs, above 2,000–3,000 cfs, or rising rapidly",
        "flash rain, flood warnings, ledges, strainers, low-water bridges, and debris",
        "passport/WMA restrictions, limited parking, remote shuttle logistics, and difficult take-out carry"
      ]
    },
    "accessPoints": [
      {
        "id": "blue-river-sh7-public-access",
        "name": "SH-7 bridge Blue River public/WMA access",
        "latitude": 34.3613944,
        "longitude": -96.5898139,
        "mileFromStart": 0,
        "segmentKind": "transition",
        "note": "Named by the route guide; confirm current ODWC/WMA parking, passport, and launch rules from land."
      },
      {
        "id": "blue-river-cheadle-falls-takeout",
        "name": "E. Cheadle Road take-out at Cheadle Falls dam",
        "latitude": 34.2741611,
        "longitude": -96.5651778,
        "mileFromStart": 9.5,
        "segmentKind": "transition",
        "note": "Named take-out with limited bank access; inspect the carry and roadside conditions before launching."
      }
    ],
    "evidenceNotes": [
      {
        "label": "Official corridor and access context",
        "value": "Blue River public fishing/hunting area; Class II–III kayak opportunity with limited access and nearby camping",
        "note": "TravelOK identifies the Blue River recreation area, seasonal kayak use, limited public access, and campground context; passport requirements must be checked with ODWC.",
        "sourceUrl": "https://www.travelok.com/listings/view.profile/id.646"
      },
      {
        "label": "Named route reach",
        "value": "SH-7 bridge to Cheadle Falls near Wapanucka, about 9.5 miles",
        "note": "American Whitewater names the reach, confirms the Connerville gauge, and describes the E. Cheadle Road take-out.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/2580/main"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07332390 Blue River near Connerville",
        "note": "USGS provides direct discharge and gage-height telemetry for the named reach.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07332390/"
      },
      {
        "label": "Flow guidance and endpoints",
        "value": "350 cfs minimum; 500–2,000 cfs preferred; SH-7 bridge to E. Cheadle Road coordinates",
        "note": "The cited local guide supplies the endpoint coordinates, class, length, and conservative flow guidance; treat it as community calibration rather than an official guarantee.",
        "sourceUrl": "https://southwestpaddler.com/docs/redok4.html"
      },
      {
        "label": "Recent official gauge reading",
        "value": "49.1 cfs and 5.64 ft at the most recent indexed USGS reading",
        "note": "The indexed USGS page showed low water at review time, below the cited minimum; do not launch at that reading without a materially changed flow and a fresh hazard check.",
        "sourceUrl": "https://waterdata.usgs.gov/ok/nwis/uv/?agency_cd=USGS&site_no=07332390"
      },
      {
        "label": "Rights-clean image decision",
        "value": "Use the existing approved route-photo fallback until a route-specific license is verified",
        "note": "No image is copied from TravelOK, American Whitewater, or Southwest Paddler; the route remains eligible with approved fallback imagery.",
        "sourceUrl": "https://www.travelok.com/listings/view.profile/id.646"
      }
    ],
    "sourceLinks": [
      {
        "label": "TravelOK Blue River",
        "url": "https://www.travelok.com/listings/view.profile/id.646",
        "provider": "local"
      },
      {
        "label": "TravelOK Oklahoma paddling guide",
        "url": "https://web1.travelok.com/articles/have-canoe-will-travel",
        "provider": "local"
      },
      {
        "label": "American Whitewater Blue River reach",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/2580/main",
        "provider": "local"
      },
      {
        "label": "Southwest Paddler Blue River guide",
        "url": "https://southwestpaddler.com/docs/redok4.html",
        "provider": "local"
      },
      {
        "label": "USGS 07332390 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07332390/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07332390 current conditions",
        "url": "https://waterdata.usgs.gov/ok/nwis/uv/?agency_cd=USGS&site_no=07332390",
        "provider": "usgs"
      }
    ]
  }
];
