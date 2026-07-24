// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const utahRoutes: River[] = [
  {
    "id": "green-river-flaming-gorge-dam-little-hole",
    "slug": "green-river-flaming-gorge-dam-little-hole",
    "name": "Green River",
    "reach": "Flaming Gorge Dam / Spillway Boat Launch to Little Hole",
    "aliases": [
      "Green River A Section",
      "Spillway Boat Launch to Little Hole"
    ],
    "state": "Utah",
    "region": "Northeastern Utah",
    "routeType": "whitewater",
    "summary": "Cold, clear tailwater day float on the Green River A Section below Flaming Gorge Dam. Ashley National Forest and Recreation.gov document the exact 7-mile Spillway-to-Little-Hole route, and the Greendale USGS gauge is immediately below the dam.",
    "statusText": "Use the Green River near Greendale gauge as the direct tailwater check. American Whitewater showed this reach runnable around 1,000 cfs; Paddle Today treats 1,000 cfs as a conservative minimum and does not claim an ideal or high-water band.",
    "latitude": 40.90885,
    "longitude": -109.422256,
    "gaugeSource": {
      "id": "usgs-09234500",
      "provider": "usgs",
      "siteId": "09234500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Green River near Greendale, UT",
      "detailUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=09234500"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 1000,
      "thresholdSource": {
        "label": "American Whitewater Flaming Gorge-to-Lodore runnable-flow context on the Greendale gauge",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1852/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "low",
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
      "seasonNotes": "Flaming Gorge Dam gives this tailwater year-round release support, but daily release changes can raise the river quickly. Check current dam-release/gauge conditions, weather, and cold-water gear even in summer.",
      "difficulty": "moderate",
      "difficultyNotes": "Section A is generally Class I-II, but it is cold, swift dam-release water with required safety gear, heavy commercial dory traffic, busy ramps, and limited quick exits. It is hidden from default casual discovery because American Whitewater is the numeric threshold source and the route is swift tailwater rather than a simple flatwater float.",
      "confidenceNotes": "Confidence is high for a guarded Section A add: Ashley National Forest publishes coordinates for Spillway Boat Launch and Little Hole Boat Launch, Recreation.gov and Forest Service pages describe the exact 7-mile Flaming Gorge Dam-to-Little-Hole Section A route, USGS 09234500 is a direct gauge just below the dam with same-day May 30, 2026 discharge and stage on the legacy current-conditions page, and American Whitewater ties the broader Flaming Gorge reach to the same Greendale gauge. Threshold confidence is intentionally conservative because the source package supports a runnable minimum, not a full ideal/high band for this exact 7-mile app route."
    },
    "evidenceNotes": [
      {
        "label": "Live gauge",
        "value": "USGS 09234500 at 1,520 cfs / 9.01 ft",
        "note": "USGS legacy current conditions showed discharge and gage height at 07:30 MDT on May 30, 2026 for Green River near Greendale, UT, operated immediately below Flaming Gorge Dam.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=09234500"
      },
      {
        "label": "Route shape",
        "value": "Section A, 7 miles",
        "note": "Recreation.gov describes Section A as beginning just below Flaming Gorge Dam and proceeding seven miles through a narrow canyon to Little Hole, with Class I-II rapids.",
        "sourceUrl": "https://www.recreation.gov/camping/campgrounds/250036"
      },
      {
        "label": "Endpoint coordinates",
        "value": "40.90885, -109.422256 to 40.910719, -109.315144",
        "note": "Ashley National Forest publishes latitude/longitude for both Spillway Boat Launch Area and Little Hole Boat Launch Area.",
        "sourceUrl": "https://www.fs.usda.gov/r04/ashley/recreation/spillway-boat-launch-area"
      },
      {
        "label": "Access and fees",
        "value": "Flaming Gorge recreation use pass",
        "note": "The BLM/Forest Service Green River brochure says a Flaming Gorge Use Pass is required at Spillway and Little Hole, while Recreation.gov lists the route as non-motorized river running with required launch gear.",
        "sourceUrl": "https://www.blm.gov/sites/default/files/documents/files/floating_the_green_river_brochure.pdf"
      },
      {
        "label": "Safety rules",
        "value": "PFD, bailer, throw rope, spare oar/paddle",
        "note": "The BLM/Forest Service brochure and Recreation.gov warn that the river can rise without warning and require or recommend river-running safety equipment; inflatable PFDs are not allowed where PFD wear is required.",
        "sourceUrl": "https://www.blm.gov/sites/default/files/documents/files/floating_the_green_river_brochure.pdf"
      },
      {
        "label": "No camping",
        "value": "No camping on Section A",
        "note": "The BLM/Forest Service brochure states that River Section A has no camping, and the Little Hole trail guidance also prohibits camping and fires along the Spillway-to-Little-Hole trail section.",
        "sourceUrl": "https://www.blm.gov/sites/default/files/documents/files/floating_the_green_river_brochure.pdf"
      },
      {
        "label": "Threshold posture",
        "value": "Minimum-only at 1,000 cfs",
        "note": "American Whitewater tied the reach to the Greendale gauge and showed the broader Flaming Gorge-to-Lodore reach runnable at 1,000 cfs during review. The app uses that as a conservative floor and does not infer an ideal range.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1852/main"
      }
    ],
    "sourceLinks": [
      {
        "label": "USGS 09234500 Green River near Greendale current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=09234500",
        "provider": "usgs"
      },
      {
        "label": "Ashley National Forest Spillway Boat Launch Area",
        "url": "https://www.fs.usda.gov/r04/ashley/recreation/spillway-boat-launch-area",
        "provider": "local"
      },
      {
        "label": "Ashley National Forest Little Hole Boat Launch Area",
        "url": "https://www.fs.usda.gov/r04/ashley/recreation/little-hole-boat-launch-area",
        "provider": "local"
      },
      {
        "label": "Recreation.gov Green River Float-In Campsites",
        "url": "https://www.recreation.gov/camping/campgrounds/250036",
        "provider": "local"
      },
      {
        "label": "BLM / Forest Service Floating the Green River brochure",
        "url": "https://www.blm.gov/sites/default/files/documents/files/floating_the_green_river_brochure.pdf",
        "provider": "local"
      },
      {
        "label": "American Whitewater Green River Flaming Gorge to Lodore",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1852/main",
        "provider": "american_whitewater"
      },
      {
        "label": "Utah DWR stream access guidance",
        "url": "https://wildlife.utah.gov/streamaccess",
        "provider": "local"
      }
    ]
  }
];
