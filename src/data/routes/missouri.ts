// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const missouriRoutes: River[] = [
  {
    "id": "current-river-cedar-grove-pulltite",
    "slug": "current-river-cedar-grove-pulltite",
    "name": "Current River",
    "reach": "Cedar Grove to Pulltite",
    "aliases": [
      "Upper Current River - Cedar Grove to Pulltite",
      "Current River - Cedar Grove Access to Pulltite",
      "Current River - Cedargrove to Pulltite Campground"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long Upper Current continuation inside Ozark National Scenic Riverways that combines the Cedar Grove to Akers and Akers to Pulltite public floats. NPS still documents both segments, the Akers gauge is live in the middle of the route, and the score stays conservative because the low-water floor is community-calibrated.",
    "statusText": "Use the Current River above Akers gauge. Around 230 cfs is the conservative low-water floor for Cedar Grove to Pulltite; below that, expect long shallow shoals and dragging. Do not treat high or rising water as casual, and respect NPS closure notices.",
    "latitude": 37.42238,
    "longitude": -91.6083,
    "gaugeSource": {
      "id": "usgs-07064533",
      "provider": "usgs",
      "siteId": "07064533",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Current River above Akers, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07064533/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 230,
      "thresholdSource": {
        "label": "Rivers.MOHERP Akers gauge trip evidence for Upper Current River continuations",
        "url": "https://rivers.moherp.org/gauge/?gauge=7064533&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The Upper Current is spring-fed and commonly paddled beyond peak spring runoff, but a long continuation like this still slows dramatically in low summer water. Heavy rain can raise the river quickly, add debris, and trigger NPS non-motorized closures.",
      "difficulty": "easy",
      "difficultyNotes": "NPS treats both component segments as standard easy Upper Current floats, but the combined 17.3-mile day is a much bigger commitment. The river is still mostly approachable at ordinary levels, yet fatigue, cold spring water, crowds, motorboat rules, and limited cell service matter more over a 7-hour route.",
      "confidenceNotes": "Confidence is good for a conservative continuation add: NPS still lists Cedar Grove to Akers as 7.7 miles / 3 hours and Akers to Pulltite as 9.6 miles / 4 hours, private-vessel guidance still requires designated access use, USGS 07064533 above Akers returned same-day July 10, 2026 discharge and gage-height observations, and Rivers.MOHERP still supports the same 230 cfs floor used on the adjacent Upper Current segments. The app keeps this minimum-only because the numeric low-water floor remains community-calibrated and no official ideal/high band is claimed."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "17.3 mi / about 7 hr",
        "note": "NPS Estimated Float Times lists Cedar Grove to Akers at 7.7 miles / 3 hours and Akers to Pulltite at 9.6 miles / 4 hours, which supports this combined 17.3-mile continuation.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Upper Current access context",
        "value": "Cedar Grove, Akers, and Pulltite named by NPS",
        "note": "NPS Paddle the Upper Current River still names Cedar Grove, Akers, and Pulltite among the popular Upper Current access points for private paddlers.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-the-upper-current-river.htm"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 07064533 at 269 cfs / 1.00 ft",
        "note": "USGS Current River above Akers returned same-day discharge and gage height at 2026-07-10 15:30 CDT. The gauge sits in the middle of this route corridor and remains the cleanest product-supported live source for the continuation.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07064533&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "230 cfs minimum-only",
        "note": "Rivers.MOHERP still provides exact Cedar Grove-to-Akers and Akers-to-Pulltite trip evidence plus broader Upper Current good-condition reports around the same Akers gauge floor. Paddle Today keeps the continuation on the same conservative 230 cfs minimum-only model.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=7064533&hours=168"
      },
      {
        "label": "NPS high-water closure context",
        "value": "Akers 4.00 ft / Pulltite 4.20 ft",
        "note": "The NPS river-level guidance and Superintendent Compendium still frame flood closure behavior around the Akers and Pulltite gauges and instruct paddlers to check current conditions before launching.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/levels.htm"
      },
      {
        "label": "Camping support",
        "value": "Akers and Pulltite campgrounds",
        "note": "The current park brochure still lists Akers and Pulltite campgrounds and river access points in the Upper Current district, which supports treating this longer route as overnight-capable rather than a casual short day float.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Access rules",
        "value": "Designated river access points only",
        "note": "NPS private-vessel guidance still tells paddlers to use designated river access points, unload promptly, and park only in designated areas.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floating.htm"
      },
      {
        "label": "Endpoint coordinates",
        "value": "37.42238, -91.6083 to 37.33505, -91.47959",
        "note": "Coordinates reuse the practical Cedar Grove and Pulltite access-area anchors already used on adjacent Current River routes. They are route-ready access anchors, not survey-grade ramp corners.",
        "sourceUrl": "https://mapcarta.com/N12516648353"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Estimated Float Times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle the Upper Current River",
        "url": "https://www.nps.gov/thingstodo/paddle-the-upper-current-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Floating in the Ozarks",
        "url": "https://www.nps.gov/ozar/planyourvisit/floating.htm",
        "provider": "nps"
      },
      {
        "label": "NPS River Levels",
        "url": "https://www.nps.gov/ozar/planyourvisit/levels.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "NPS park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Current River Akers gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=7064533&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07064533 Current River above Akers",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07064533/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07064533 instant values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07064533&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Mapcarta Cedar Grove Boat Launch",
        "url": "https://mapcarta.com/N12516648353",
        "provider": "local"
      },
      {
        "label": "Mapcarta Pulltite Campground",
        "url": "https://mapcarta.com/21155320",
        "provider": "local"
      }
    ]
  },
  {
    "id": "current-river-akers-ferry-round-spring",
    "slug": "current-river-akers-ferry-round-spring",
    "name": "Current River",
    "reach": "Akers Ferry to Round Spring",
    "aliases": [
      "Upper Current River - Akers to Round Spring",
      "Current River - Akers Ferry to Round Spring",
      "Current River - Akers Lower to Round Spring Campground"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long Upper Current continuation inside Ozark National Scenic Riverways that combines the Akers to Pulltite and Pulltite to Round Spring public floats. NPS still documents both sections, the Akers gauge is live at the upstream end, and the app stays conservative because the lower half relies on the same upstream gauge relationship already used on Pulltite to Round Spring.",
    "statusText": "Use the Current River above Akers gauge as an upstream route check. Around 300 cfs is the conservative low-water floor for Akers to Round Spring; below that, expect slower shoals and dragging over a long day. Do not treat high or rising water as casual, and check NPS closure notices before launching.",
    "latitude": 37.37591,
    "longitude": -91.55148,
    "gaugeSource": {
      "id": "usgs-07064533",
      "provider": "usgs",
      "siteId": "07064533",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Current River above Akers, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07064533/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Akers gauge trip evidence for lower Upper Current continuations",
        "url": "https://rivers.moherp.org/gauge/?gauge=07064533&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The Upper Current is spring-fed and floatable well beyond spring runoff, but this 18.5-mile continuation is still sensitive to low-water drag and storm-driven debris. Heavy rain can raise the river quickly and push the park toward flood closures.",
      "difficulty": "easy",
      "difficultyNotes": "NPS treats both component segments as standard easy Upper Current floats, but combining them into an 8-hour route makes pace, weather, and exit discipline much more important. Cold spring water, outfitter traffic, and limited cell service matter more over the longer day.",
      "confidenceNotes": "Confidence is good for a conservative continuation add: NPS still lists Akers to Pulltite as 9.6 miles / 4 hours and Pulltite to Round Spring as 8.9 miles / 4 hours, the park brochure still identifies all three access areas as Upper Current river points with campground support, USGS 07064533 returned same-day July 10, 2026 discharge and gage-height observations, and Rivers.MOHERP still ties exact Pulltite-to-Round-Spring reports to the Akers gauge. The app keeps this minimum-only and proxy-gauged because the live source sits upstream of the downstream half and there is no official route-specific ideal/high band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "18.5 mi / about 8 hr",
        "note": "NPS Estimated Float Times lists Akers to Pulltite at 9.6 miles / 4 hours and Pulltite to Round Spring at 8.9 miles / 4 hours, which supports this combined 18.5-mile continuation.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Upper Current access context",
        "value": "Akers, Pulltite, and Round Spring named by NPS",
        "note": "The current park brochure still lists Akers, Pulltite, and Round Spring as Upper Current river access points with ranger-station and campground context.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Live proxy gauge",
        "value": "USGS 07064533 at 269 cfs / 1.00 ft",
        "note": "USGS Current River above Akers returned same-day discharge and gage height at 2026-07-10 15:30 CDT. The gauge is at the upstream end of this continuation, so Paddle Today treats it as a proxy for the full Akers-to-Round-Spring route.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07064533&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP still ties exact Pulltite-to-Round-Spring Good reports to the Akers gauge, with nearby lower-Upper-Current reports around the same floor. Paddle Today keeps the longer continuation on the same conservative 300 cfs minimum-only model used for Pulltite to Round Spring.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07064533&hours=168"
      },
      {
        "label": "NPS high-water closure context",
        "value": "Akers 4.00 ft / Pulltite 4.20 ft / Round Spring Bridge 5.20 ft",
        "note": "The NPS river-level guidance and Superintendent Compendium still provide the flood-closure context for the Upper Current landings used on this continuation. Treat those as high-water caution and closure support, not as an ideal gauge band.",
        "sourceUrl": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm"
      },
      {
        "label": "Flood-repair caveat",
        "value": "Pulltite remains partly repaired",
        "note": "NPS said in March 2025 that Akers and Round Spring group sites were expected to reopen by Memorial Day while Pulltite would partially reopen with fewer family sites and ongoing repairs. Inspect Pulltite and Round Spring before leaving a vehicle.",
        "sourceUrl": "https://www.nps.gov/ozar/learn/news/2025-03-11-campground-repairs.htm"
      },
      {
        "label": "Access rules",
        "value": "Designated river access points only",
        "note": "NPS private-vessel guidance still tells paddlers to use designated river access points, unload promptly, and park only in designated areas.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floating.htm"
      },
      {
        "label": "Endpoint coordinates",
        "value": "37.37591, -91.55148 to 37.27996, -91.40792",
        "note": "Coordinates reuse the practical Akers and Round Spring access-area anchors already used on adjacent Current River routes. They are route-ready access anchors, not survey-grade ramp corners.",
        "sourceUrl": "https://mapcarta.com/N1785576990"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Estimated Float Times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Floating in the Ozarks",
        "url": "https://www.nps.gov/ozar/planyourvisit/floating.htm",
        "provider": "nps"
      },
      {
        "label": "NPS River Levels",
        "url": "https://www.nps.gov/ozar/planyourvisit/levels.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "NPS 2025 campground and access repairs",
        "url": "https://www.nps.gov/ozar/learn/news/2025-03-11-campground-repairs.htm",
        "provider": "nps"
      },
      {
        "label": "NPS park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Current River Akers gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07064533&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07064533 Current River above Akers",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07064533/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07064533 instant values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07064533&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Mapcarta Akers Lower",
        "url": "https://mapcarta.com/N1785576990",
        "provider": "local"
      },
      {
        "label": "Mapcarta Round Spring Campground",
        "url": "https://mapcarta.com/N12663429799",
        "provider": "local"
      }
    ]
  },
  {
    "id": "current-river-cedar-grove-round-spring",
    "slug": "current-river-cedar-grove-round-spring",
    "name": "Current River",
    "reach": "Cedar Grove to Round Spring",
    "aliases": [
      "Upper Current River - Cedar Grove to Round Spring",
      "Current River - Cedargrove to Round Spring",
      "Current River - Cedar Grove Access to Round Spring Campground"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Full Upper Current continuation inside Ozark National Scenic Riverways from Cedar Grove to Round Spring. NPS still documents all three component segments, the Akers gauge remains live, and the route ships conservatively because the downstream half still depends on the same upstream gauge relationship used on Pulltite to Round Spring.",
    "statusText": "Use the Current River above Akers gauge as an upstream route check. Around 300 cfs is the conservative low-water floor for Cedar Grove to Round Spring; below that, expect a very long day with repeated shallow shoals and dragging. Do not treat high or rising water as casual, and respect NPS closure notices.",
    "latitude": 37.42238,
    "longitude": -91.6083,
    "gaugeSource": {
      "id": "usgs-07064533",
      "provider": "usgs",
      "siteId": "07064533",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Current River above Akers, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07064533/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Akers gauge trip evidence for full Upper Current continuations",
        "url": "https://rivers.moherp.org/gauge/?gauge=07064533&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The Upper Current is spring-fed and remains runnable well beyond peak runoff, but a 26.2-mile continuation amplifies low-water drag, fatigue, and storm timing. Heavy rain can raise the river quickly, add debris, and push the park toward non-motorized closures.",
      "difficulty": "easy",
      "difficultyNotes": "Each component segment is an easy NPS float at ordinary levels, but this full continuation is an all-day commitment bordering on an overnight plan for many groups. Pace, weather, cold water, crowding, and access discipline matter more than the simple segment ratings suggest.",
      "confidenceNotes": "Confidence is good for a guarded long-route add: NPS still lists Cedar Grove to Akers as 7.7 miles / 3 hours, Akers to Pulltite as 9.6 miles / 4 hours, and Pulltite to Round Spring as 8.9 miles / 4 hours; the park brochure still confirms the full Upper Current access chain and campground context; USGS 07064533 returned same-day July 10, 2026 observations; and Rivers.MOHERP still supports the same lower-Upper-Current floor already used on Pulltite to Round Spring. The app keeps this minimum-only and proxy-gauged because the live source sits upstream of much of the route and no official ideal/high band exists for the full continuation."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "26.2 mi / about 11 hr",
        "note": "NPS Estimated Float Times lists Cedar Grove to Akers at 7.7 miles / 3 hours, Akers to Pulltite at 9.6 miles / 4 hours, and Pulltite to Round Spring at 8.9 miles / 4 hours, which supports this 26.2-mile full Upper Current continuation.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Upper Current access chain",
        "value": "Cedar Grove, Akers, Pulltite, and Round Spring",
        "note": "The current park brochure still identifies all four named access areas in the Upper Current district, along with campground and ranger-station context for the middle and downstream stops.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Live proxy gauge",
        "value": "USGS 07064533 at 269 cfs / 1.00 ft",
        "note": "USGS Current River above Akers returned same-day discharge and gage height at 2026-07-10 15:30 CDT. Because the gauge sits upstream of much of this full route, Paddle Today treats it as a proxy and pairs it with a conservative low-water-only model.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07064533&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP still ties exact Pulltite-to-Round-Spring reports and nearby lower-Upper-Current trip rows to the Akers gauge, which is the limiting downstream evidence for the full continuation. Paddle Today therefore uses the same conservative 300 cfs floor rather than the lower 230 cfs floor used on the shorter upstream-only routes.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07064533&hours=168"
      },
      {
        "label": "NPS high-water closure context",
        "value": "Akers 4.00 ft / Pulltite 4.20 ft / Round Spring Bridge 5.20 ft",
        "note": "The NPS river-level guidance and Superintendent Compendium still provide flood-closure context for the full Upper Current corridor and direct paddlers to check current conditions before launching.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/levels.htm"
      },
      {
        "label": "Camping support",
        "value": "Akers, Pulltite, and Round Spring campgrounds",
        "note": "The current park brochure still lists campgrounds at Akers, Pulltite, and Round Spring, which supports treating this very long continuation as overnight-capable rather than a default one-day float.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Access rules",
        "value": "Designated river access points only",
        "note": "NPS private-vessel guidance still tells paddlers to use designated river access points, unload promptly, and park only in designated areas.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floating.htm"
      },
      {
        "label": "Endpoint coordinates",
        "value": "37.42238, -91.6083 to 37.27996, -91.40792",
        "note": "Coordinates reuse the practical Cedar Grove and Round Spring access-area anchors already used on adjacent Current River routes. They are route-ready access anchors, not survey-grade ramp corners.",
        "sourceUrl": "https://mapcarta.com/N12516648353"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Estimated Float Times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle the Upper Current River",
        "url": "https://www.nps.gov/thingstodo/paddle-the-upper-current-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Floating in the Ozarks",
        "url": "https://www.nps.gov/ozar/planyourvisit/floating.htm",
        "provider": "nps"
      },
      {
        "label": "NPS River Levels",
        "url": "https://www.nps.gov/ozar/planyourvisit/levels.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "NPS park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS 2025 campground and access repairs",
        "url": "https://www.nps.gov/ozar/learn/news/2025-03-11-campground-repairs.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Current River Akers gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07064533&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07064533 Current River above Akers",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07064533/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07064533 instant values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07064533&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Mapcarta Cedar Grove Boat Launch",
        "url": "https://mapcarta.com/N12516648353",
        "provider": "local"
      },
      {
        "label": "Mapcarta Round Spring Campground",
        "url": "https://mapcarta.com/N12663429799",
        "provider": "local"
      }
    ]
  },
  {
    "id": "current-river-cedar-grove-akers",
    "slug": "current-river-cedar-grove-akers",
    "name": "Current River",
    "reach": "Cedar Grove to Akers Ferry",
    "aliases": [
      "Upper Current River - Cedar Grove to Akers",
      "Current River - Cedargrove to Akers",
      "Current River - Cedar Grove Access to Akers Ferry"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Classic upper Current River day float from Cedar Grove to Akers Ferry inside Ozark National Scenic Riverways. NPS lists the 7.7-mile trip, the Akers gauge is live in the take-out corridor, and the level model stays conservative because the low-water floor comes from local trip evidence.",
    "statusText": "Use the Current River above Akers gauge. Around 230 cfs is the low-water marker for Cedar Grove to Akers; below that, expect shallow riffles and possible dragging. Do not treat high or rising water as a casual float, and respect NPS closure notices.",
    "latitude": 37.42238,
    "longitude": -91.6083,
    "gaugeSource": {
      "id": "usgs-07064533",
      "provider": "usgs",
      "siteId": "07064533",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Current River above Akers, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07064533/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 230,
      "thresholdSource": {
        "label": "Rivers.MOHERP Akers gauge trip evidence for Cedar Grove to Akers",
        "url": "https://rivers.moherp.org/gauge/?gauge=7064533&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The upper Current is spring-fed and commonly floated beyond peak spring runoff, but low summer water can make shoals slow and scrapey. Heavy rain can raise the river quickly, add debris, and trigger NPS flood closures or access restrictions.",
      "difficulty": "easy",
      "difficultyNotes": "NPS treats Cedar Grove to Akers as a standard 3-hour upper-Current canoe/kayak float. The route is easy at ordinary levels, but shallow riffles, cold spring water, motorized traffic rules, crowding, wood, and high-water closure thresholds still matter.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: NPS lists Cedar Grove to Akers as a 7.7-mile / 3-hour Upper Current route, NPS floating guidance directs private boaters to designated accesses, USGS 07064533 is a direct live gauge at the Akers corridor and showed same-day May 30, 2026 discharge and gage-height observations, and Rivers.MOHERP includes exact Cedar Grove-to-Akers trip evidence with a good report at 233 cfs plus broader Upper Current good-condition reports. The app uses minimum-only scoring because the numeric low-water floor is community-calibrated rather than an official paddling band, and no ideal range or upper cutoff is inferred."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Cedar Grove to Akers, 7.7 mi / 3 hr",
        "note": "NPS Estimated Float Times lists Cedar Grove to Akers as a 7.7-mile Upper Current River float with an estimated 3-hour canoe/kayak time.",
        "sourceUrl": "https://home.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Upper Current route context",
        "value": "NPS standard put-ins",
        "note": "NPS Paddle the Upper Current River names Cedar Grove and Akers among the popular Upper Current put-in locations and lists Cedar Grove-to-Akers as a 3-hour float.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-the-upper-current-river.htm"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 07064533 at 311 cfs / 1.09 ft",
        "note": "USGS Current River above Akers showed discharge and gage height at 12:30 CDT on May 30, 2026. The gauge is in the Akers take-out corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07064533"
      },
      {
        "label": "Low-water floor",
        "value": "230 cfs minimum-only",
        "note": "Rivers.MOHERP lists exact Cedar Grove-to-Akers trip evidence at 233 cfs described as just enough water to classify as good, with broader Upper Current good-condition reports nearby. Paddle Today uses 230 cfs as a conservative floor and does not infer an ideal or high-water band.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=7064533&hours=168"
      },
      {
        "label": "NPS high-water closure context",
        "value": "Akers average 2.00 ft / closed 4.00 ft",
        "note": "The NPS Superintendent Compendium says the Current and Jacks Fork close to non-motorized vessels during flood conditions and lists Akers at 2.00 ft average and 4.00 ft closed level. Use this as high-water caution, not an ideal range.",
        "sourceUrl": "https://home.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm"
      },
      {
        "label": "Access rules",
        "value": "Designated access points",
        "note": "NPS private-vessel guidance says there is no fee for private floating inside park boundaries, but paddlers should arrange their own transport, use designated river access points, follow posted signs, and park only in designated areas.",
        "sourceUrl": "https://home.nps.gov/ozar/planyourvisit/floating.htm"
      },
      {
        "label": "Endpoint coordinates",
        "value": "37.42238, -91.6083 to 37.37591, -91.55148",
        "note": "Mapcarta / OpenStreetMap lists Cedar Grove Boat Launch and Akers Lower as Current River slipways. Coordinates are practical access anchors; NPS signs and current access layout should control on arrival.",
        "sourceUrl": "https://mapcarta.com/N12516648353"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Estimated Float Times",
        "url": "https://home.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "local"
      },
      {
        "label": "NPS Paddle the Upper Current River",
        "url": "https://www.nps.gov/thingstodo/paddle-the-upper-current-river.htm",
        "provider": "local"
      },
      {
        "label": "NPS Floating in the Ozarks",
        "url": "https://home.nps.gov/ozar/planyourvisit/floating.htm",
        "provider": "local"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://home.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "local"
      },
      {
        "label": "NPS River Levels",
        "url": "https://home.nps.gov/ozar/planyourvisit/levels.htm",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Current River Akers gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=7064533&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07064533 Current River above Akers",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07064533/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07064533 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07064533",
        "provider": "usgs"
      },
      {
        "label": "Mapcarta Cedar Grove Boat Launch",
        "url": "https://mapcarta.com/N12516648353",
        "provider": "local"
      },
      {
        "label": "Mapcarta Akers Lower",
        "url": "https://mapcarta.com/N1785576990",
        "provider": "local"
      }
    ]
  },
  {
    "id": "current-river-akers-ferry-pulltite",
    "slug": "current-river-akers-ferry-pulltite",
    "name": "Current River",
    "reach": "Akers Ferry to Pulltite",
    "aliases": [
      "Upper Current River - Akers to Pulltite",
      "Current River - Akers Ferry to Pulltite Campground",
      "Current River - Akers Lower to Pulltite"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Classic Upper Current River day float from Akers Ferry to Pulltite inside Ozark National Scenic Riverways. NPS lists the 9.6-mile route, the Akers gauge is in the put-in corridor, and the level model stays conservative because the low-water floor is community-calibrated.",
    "statusText": "Use the Current River above Akers gauge. Around 230 cfs is the low-water marker for Akers to Pulltite; below that, expect shallow riffles and possible dragging. Do not treat high or rising water as casual, and check NPS closure notices before launching.",
    "latitude": 37.37591,
    "longitude": -91.55148,
    "gaugeSource": {
      "id": "usgs-07064533",
      "provider": "usgs",
      "siteId": "07064533",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Current River above Akers, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07064533/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 230,
      "thresholdSource": {
        "label": "Rivers.MOHERP Akers gauge trip evidence for Akers to Pulltite",
        "url": "https://rivers.moherp.org/gauge/?gauge=7064533&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The upper Current is spring-fed and commonly floated beyond peak spring runoff, but low summer water can make shoals slow and scrape-heavy. Heavy rain can raise the river quickly, add debris, and trigger NPS flood closures or access restrictions.",
      "difficulty": "easy",
      "difficultyNotes": "NPS treats Akers to Pulltite as a standard 4-hour upper-Current canoe/kayak float. The route is easy at ordinary levels, but shallow riffles, cold spring water, busy warm-season access areas, wood, caves, and high-water closure thresholds still matter.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: NPS lists Akers to Pulltite as a 9.6-mile / 4-hour Upper Current route, NPS floating guidance directs private boaters to designated accesses, Recreation.gov currently describes Pulltite as a year-round campground with flood-damaged facilities reduced after October 15, 2025 rather than an active closure, USGS 07064533 is a direct live gauge in the Akers put-in corridor and showed same-day May 31, 2026 discharge and gage-height observations, and Rivers.MOHERP includes exact Akers-to-Pulltite good-condition trip evidence down to about 213 cfs plus broader Upper Current reports around the same floor. The app uses minimum-only scoring because the numeric low-water floor is community-calibrated rather than an official paddling band, and no ideal range or upper cutoff is inferred."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Akers to Pulltite, 9.6 mi / 4 hr",
        "note": "NPS Estimated Float Times lists Akers to Pulltite as a 9.6-mile Upper Current River float with an estimated four-hour canoe/kayak time.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Public floating rules",
        "value": "Designated NPS river access points",
        "note": "NPS private-vessel guidance says there is no fee for private floating inside park boundaries, but paddlers should arrange their own transport, use designated river access points, follow posted signs, and park only in designated areas.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floating.htm"
      },
      {
        "label": "Pulltite status",
        "value": "Year-round campground with reduced facilities after October 15, 2025",
        "note": "Recreation.gov describes Pulltite as year-round and says flood damage will reduce facilities to one vault toilet after October 15, 2025. Treat that as access-caveat support, not a promise that every ramp, road, or restroom is normal on arrival.",
        "sourceUrl": "https://www.recreation.gov/camping/campgrounds/234357"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 07064533 at 311 cfs / 1.09 ft",
        "note": "USGS Current River above Akers showed same-day discharge and gage height at 15:30 CDT on May 31, 2026. The gauge is in the Akers put-in corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07064533"
      },
      {
        "label": "Low-water floor",
        "value": "230 cfs minimum-only",
        "note": "Rivers.MOHERP includes exact Akers-to-Pulltite trip evidence rated Good at 213 cfs, plus nearby Upper Current Good reports around 213 to 233 cfs. Paddle Today uses 230 cfs as a conservative floor and does not infer an ideal or high-water band.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=7064533&hours=168"
      },
      {
        "label": "NPS high-water closure context",
        "value": "Akers 4.00 ft / Pulltite 4.20 ft",
        "note": "The NPS Superintendent Compendium says the Current and Jacks Fork close to non-motorized vessels during flood conditions and lists Akers and Pulltite closure stages. Use this as high-water caution, not an ideal range.",
        "sourceUrl": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm"
      },
      {
        "label": "Endpoint coordinates",
        "value": "37.37591, -91.55148 to 37.33505, -91.47959",
        "note": "Coordinates reuse the already implemented Akers Lower and Pulltite access-area anchors from adjacent Current River routes. They are practical access anchors; NPS signs and current access layout should control on arrival.",
        "sourceUrl": "https://mapcarta.com/N1785576990"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Estimated Float Times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Floating in the Ozarks",
        "url": "https://www.nps.gov/ozar/planyourvisit/floating.htm",
        "provider": "nps"
      },
      {
        "label": "NPS River Levels",
        "url": "https://www.nps.gov/places/river-levels.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "Recreation.gov Pulltite",
        "url": "https://www.recreation.gov/camping/campgrounds/234357",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Current River Akers gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=7064533&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07064533 Current River above Akers",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07064533/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07064533 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07064533",
        "provider": "usgs"
      },
      {
        "label": "Mapcarta Akers Lower",
        "url": "https://mapcarta.com/N1785576990",
        "provider": "local"
      },
      {
        "label": "Mapcarta Pulltite Campground",
        "url": "https://mapcarta.com/21155320",
        "provider": "local"
      }
    ]
  },
  {
    "id": "current-river-pulltite-round-spring",
    "slug": "current-river-pulltite-round-spring",
    "name": "Current River",
    "reach": "Pulltite to Round Spring",
    "aliases": [
      "Upper Current River - Pulltite to Round Spring",
      "Current River - Pulltite Landing to Round Spring",
      "Current River - Pulltite Campground to Round Spring Campground"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Popular Upper Current River day float from Pulltite to Round Spring inside Ozark National Scenic Riverways. NPS lists the 8.9-mile route, the Akers gauge is fresh and already supports nearby Upper Current routes, and the scoring stays low-water-only because the gauge is upstream.",
    "statusText": "Use the Current River above Akers gauge as an upstream proxy. Around 300 cfs is the conservative low-water floor for this reach; below that, expect shallow riffles and slower travel. Do not treat high or rising water as casual, and check NPS closure notices before launching.",
    "latitude": 37.33505,
    "longitude": -91.47959,
    "gaugeSource": {
      "id": "usgs-07064533",
      "provider": "usgs",
      "siteId": "07064533",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Current River above Akers, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07064533/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Akers gauge bands and Pulltite-to-Round-Spring trip rows",
        "url": "https://rivers.moherp.org/gauge/?gauge=07064533&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The Upper Current is spring-fed and NPS lists private paddling year-round, but low summer levels can still make shoals slow and scrape-heavy. Heavy rain can raise the river quickly, add floating wood, and trigger NPS non-motorized closures.",
      "difficulty": "easy",
      "difficultyNotes": "NPS lists Pulltite to Round Spring as a standard four-hour canoe/kayak float. It is generally easy at ordinary levels, but cold spring water, weekend crowding, limited cell service, shallow riffles, and high-water closure thresholds still matter.",
      "confidenceNotes": "Confidence is good for a conservative add: NPS lists Pulltite to Round Spring as an 8.9-mile / 4-hour Upper Current float, NPS brochure text identifies Pulltite and Round Spring as Upper Current river access points, USGS 07064533 showed same-day May 31, 2026 discharge and gage-height observations, and Rivers.MOHERP ties exact Pulltite-to-Round-Spring trip rows to the Akers gauge. The caveat is the gauge relationship: Akers is upstream of the route, so the app uses only a 300 cfs low-water floor and does not claim an ideal range or high-water cutoff."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Pulltite to Round Spring, 8.9 mi / 4 hr",
        "note": "NPS Estimated Float Times lists Pulltite to Round Spring as an 8.9-mile Upper Current River float with an estimated four-hour canoe/kayak time.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Upper Current route context",
        "value": "NPS standard access pair",
        "note": "NPS Paddle the Upper Current River names Pulltite and Round Spring among popular Upper Current locations and lists Pulltite-to-Round-Spring as a four-hour route.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-the-upper-current-river.htm"
      },
      {
        "label": "Public access context",
        "value": "Pulltite RM 82 to Round Spring RM 71",
        "note": "The NPS park brochure lists Round Spring at river mile 71 with a campground, picnic area, boat ramp, and ranger station, and Pulltite at river mile 82 with campground, picnic area, ranger station, and hiking.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Live proxy gauge",
        "value": "USGS 07064533 at 311 cfs / 1.09 ft",
        "note": "USGS Current River above Akers showed same-day discharge and gage height at 06:30 CDT on May 31, 2026. The gauge is upstream of Pulltite, so it is used as a proxy rather than a precise route gauge.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07064533"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Akers gauge Good beginning at 150 cfs and includes exact Pulltite-to-Round-Spring Good reports at 321 and 336 cfs, plus nearby lower-Upper-Current Good reports around 288-346 cfs. Paddle Today uses 300 cfs as a conservative floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07064533&hours=168"
      },
      {
        "label": "NPS high-water closure context",
        "value": "Pulltite 4.20 ft / Round Spring Bridge 5.20 ft",
        "note": "The NPS Superintendent Compendium lists Current River closure levels for Pulltite and Round Spring Bridge during flood conditions. Use this as high-water caution, not as a scoring high cutoff for the Akers cfs gauge.",
        "sourceUrl": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm"
      },
      {
        "label": "Flood-repair caveat",
        "value": "Pulltite landing repair priority",
        "note": "NPS reported 2025 flood-repair work at Pulltite and asked visitors to watch for construction zones and closures. Verify current access conditions before leaving a take-out vehicle or launching.",
        "sourceUrl": "https://home.nps.gov/ozar/learn/news/2025-03-11-campground-repairs.htm"
      },
      {
        "label": "Endpoint coordinates",
        "value": "37.33505, -91.47959 to 37.27996, -91.40792",
        "note": "Mapcarta / GeoNames / OpenStreetMap place Pulltite Campground and Round Spring Campground in the named NPS access areas. These are practical access-area anchors; current NPS signs and ramp layout should control on arrival.",
        "sourceUrl": "https://mapcarta.com/21155320"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Estimated Float Times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle the Upper Current River",
        "url": "https://www.nps.gov/thingstodo/paddle-the-upper-current-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Alerts and Conditions",
        "url": "https://www.nps.gov/ozar/planyourvisit/conditions.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "NPS 2025 campground and access repairs",
        "url": "https://home.nps.gov/ozar/learn/news/2025-03-11-campground-repairs.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Current River Akers gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07064533&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07064533 Current River above Akers",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07064533/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07064533 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07064533",
        "provider": "usgs"
      },
      {
        "label": "Mapcarta Pulltite Campground",
        "url": "https://mapcarta.com/21155320",
        "provider": "local"
      },
      {
        "label": "Mapcarta Round Spring Campground",
        "url": "https://mapcarta.com/N12663429799",
        "provider": "local"
      }
    ]
  },
  {
    "id": "jacks-fork-river-buck-hollow-rymers",
    "slug": "jacks-fork-river-buck-hollow-rymers",
    "name": "Jacks Fork River",
    "reach": "Buck Hollow / Highway 17 Bridge to Rymers",
    "aliases": [
      "Jacks Fork - Highway 17 to Rymers",
      "Jacks Fork - Buck Hollow to Rymers",
      "Upper Jacks Fork - Buck Hollow to Rymers"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Remote upper Jacks Fork day float from the Highway 17 bridge at Buck Hollow to Rymers, with NPS access at both ends, bluff-and-cave scenery, and a direct Mountain View gauge used as a conservative low-water check.",
    "statusText": "Use the Jacks Fork near Mountain View gauge. Around 100 cfs is the low-water marker; below that, expect shallow riffles, dragging, and possible poling or lining. Paddler reports will help tune the useful range.",
    "latitude": 37.057183,
    "longitude": -91.664061,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-07065200",
      "provider": "usgs",
      "siteId": "07065200",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork near Mountain View, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07065200/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Rivers.MOHERP Mountain View gauge rating and Buck Hollow-to-Rymers trip logs",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The upper Jacks Fork is seasonal. NPS says portions of the Jacks Fork are only navigable at certain times because of low water, and local route evidence shows Buck Hollow-to-Rymers can become a poling-and-lining trip near 80 cfs. Spring and post-rain windows are more reliable, but storms can raise this narrow valley quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a remote upper-river Ozark float with fast riffles, shoals, tight bends, bluff pools, and Class I-II character. Treat it as a moving-water route rather than a casual summer tube float, especially below the 100 cfs floor or when thunderstorms are possible.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: NPS names Highway 17 / Buck Hollow to Rymers as a standard Jacks Fork float and lists both as park river access points; NPS brochure directions place Buck Hollow at the Highway 17 bridge and Rymers at the end of the Highway M gravel access road; USGS 07065200 is the direct upper-Jacks gauge near Mountain View and showed same-day May 26, 2026 discharge and gage-height observations; and Rivers.MOHERP has Mountain View gauge ratings plus Buck Hollow-to-Rymers trip evidence. Coordinates are from published paddling-location coordinate sources rather than an NPS coordinate table, so users should still follow park signs at both access roads. The app uses minimum-only scoring because the numeric level support is community-calibrated rather than an official manager-published paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Hwy 17 to Rymers, 5 hr",
        "note": "NPS lists Highway 17 to Rymers as an estimated 5-hour Jacks Fork float and names Highway 17 Bridge / Buck Hollow and Rymers as popular Jacks Fork put-in locations.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm"
      },
      {
        "label": "NPS access context",
        "value": "Buck Hollow and Rymers park accesses",
        "note": "The NPS park brochure lists Buck Hollow and Rymers in the Jacks Fork river-access inventory, with Rymers at river mile 82 and Buck Hollow at river mile 88.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Access directions",
        "value": "Highway 17 bridge to Highway M gravel road end",
        "note": "NPS directions place Buck Hollow where Highway 17 crosses the Jacks Fork about 6 miles north of Mountain View, and Rymers by traveling east from Mountain View on US 60, then north on Highway M until pavement ends and continuing on gravel to the road end.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 07065200",
        "note": "USGS operates Jacks Fork near Mountain View, MO. The legacy current-conditions page showed same-day May 26, 2026 discharge and gage-height observations during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065200"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Mountain View gauge good beginning at 100 cfs. Buck Hollow-to-Rymers trip rows include a good report at 253 cfs and poor reports around 80 cfs where all drops required poling or lining.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168"
      },
      {
        "label": "Route mileage and coordinates",
        "value": "About 9.4 mi",
        "note": "Rivers.MOHERP and public paddling-location guides place Buck Hollow to Rymers at about 9.4 miles. Southwest Paddler publishes access coordinates for the Highway 17 / Buck Hollow bridge and Rymer Landing, corroborated by a separate Rymers paddling-location coordinate listing.",
        "sourceUrl": "https://www.southwestpaddler.com/docs/current4.html"
      },
      {
        "label": "River character",
        "value": "Seasonal Class I-II upper Ozark river",
        "note": "Southwest Paddler describes the Jacks Fork as a Class I-II river with remoteness, rapids that are generally not highly technical, and seasonal flow dependence. MDC also describes the upper Jacks Fork as wild, scenic, and best suited to spring paddling when water is adequate.",
        "sourceUrl": "https://mdc.mo.gov/magazines/conservationist/2013-04/heaven-back-upper-jacks-fork"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "local"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Mountain View gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07065200 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07065200/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07065200 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065200",
        "provider": "usgs"
      },
      {
        "label": "Southwest Paddler Jacks Fork River guide",
        "url": "https://www.southwestpaddler.com/docs/current4.html",
        "provider": "local"
      },
      {
        "label": "Paddling.com Rymers Access",
        "url": "https://paddling.com/paddle/locations/rymers-access",
        "provider": "local"
      },
      {
        "label": "MDC upper Jacks Fork feature",
        "url": "https://mdc.mo.gov/magazines/conservationist/2013-04/heaven-back-upper-jacks-fork",
        "provider": "local"
      }
    ]
  },
  {
    "id": "jacks-fork-river-highway-17-blue-spring",
    "slug": "jacks-fork-river-highway-17-blue-spring",
    "name": "Jacks Fork River",
    "reach": "Buck Hollow / Highway 17 Bridge to Blue Spring River Access",
    "aliases": [
      "Jacks Fork - Highway 17 to Blue Spring",
      "Upper Jacks Fork - Highway 17 to Blue Spring",
      "Buck Hollow to Blue Spring"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Shortest upper Jacks Fork split from Buck Hollow to Blue Spring, backed by current NPS float-time support, primitive camping context at the take-out, and the direct Mountain View gauge used conservatively.",
    "statusText": "Use the Jacks Fork near Mountain View gauge. Around 100 cfs is the conservative low-water floor; below that, expect shallow riffles, dragging, and possible short lining near Blue Spring. High or rising water deserves extra caution in this narrow upper-river corridor.",
    "latitude": 37.057183,
    "longitude": -91.664061,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This is still an upper-Jacks moving-water route even though it is short. The corridor is narrow, seasonal, and can change quickly after thunderstorms.",
        "Below the 100 cfs floor, expect scraping and possible short lining through riffles and ledges rather than an easy drift.",
        "Blue Spring on the Jacks Fork is a primitive river access and campsite, not a developed boat ramp. Use only the signed NPS accesses and do not substitute informal roadside pull-offs or private banks."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07065200",
      "provider": "usgs",
      "siteId": "07065200",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork near Mountain View, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07065200/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Rivers.MOHERP Mountain View gauge rating and adjacent upper-Jacks trip rows",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The upper Jacks Fork is seasonal. NPS says portions are only navigable during certain times because of low river levels, and even this shortest split is most reliable in spring or after rain. Thunderstorms can raise the valley quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "This short upper-river reach still carries Class I-II Ozark character with riffles, shoals, bluff pools, wood, and remote shuttle logistics. Treat it as moving water rather than flatwater.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: the current NPS float-times page lists Highway 17 to Blue Spring as a 2.6-mile / 1-hour Jacks Fork float; the current NPS park brochure places Buck Hollow at river mile 88 and Blue Spring at river mile 87 with primitive camping context; USGS 07065200 returned same-day values during review; and the adjacent implemented upper-Jacks routes already use the same conservative 100 cfs minimum-only model tied to Mountain View gauge evidence. Coordinates are carried from the existing Buck Hollow access anchor and a topo-derived Blue Spring River Access point, so paddlers should still follow signed access roads and parking layout on arrival."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Highway 17 to Blue Spring, 2.6 mi / 1 hr",
        "note": "The current NPS float-times page lists Highway 17 to Blue Spring as a 2.6-mile Jacks Fork float taking about 1 hour.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Public put-in",
        "value": "Buck Hollow at Highway 17, river mile 88",
        "note": "The current NPS park brochure lists Buck Hollow where Highway 17 crosses the Jacks Fork and places it at river mile 88.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Public take-out",
        "value": "Blue Spring on Jacks Fork, river mile 87",
        "note": "The current NPS park brochure lists Blue Spring on the Jacks Fork as a river access with primitive camping context, and the current Blue Spring page says the smaller Jacks Fork Blue Spring is a river access and primitive campsite.",
        "sourceUrl": "https://www.nps.gov/ozar/blue-spring.htm"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07065200 at 124 cfs / 1.08 ft",
        "note": "A same-day Water Services IV refresh returned 124 cfs and 1.08 ft at 2026-06-22 08:45 CDT for Jacks Fork near Mountain View, the direct upper-Jacks gauge already used by adjacent routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065200"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Mountain View gauge Good beginning at 100 cfs, and adjacent upper-Jacks route evidence shows the corridor becomes scrape-prone below that floor. The app keeps only the conservative 100 cfs floor.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168"
      },
      {
        "label": "Coordinate support",
        "value": "Buck Hollow bridge access to Blue Spring River Access",
        "note": "The Buck Hollow put-in reuses the adjacent implemented Highway 17 bridge access anchor, and TopoQuest nearby-feature records around Muck Forty Hole support Blue Spring River Access at 37.054497, -91.638198.",
        "sourceUrl": "https://topoquest.com/place/missouri/channel/muck-forty-hole/737936"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Jacks Fork estimated float times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Blue Spring page",
        "url": "https://www.nps.gov/ozar/blue-spring.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Mountain View gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07065200 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07065200/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07065200 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065200",
        "provider": "usgs"
      },
      {
        "label": "TopoQuest Blue Spring area features",
        "url": "https://topoquest.com/place/missouri/channel/muck-forty-hole/737936",
        "provider": "local"
      }
    ]
  },
  {
    "id": "jacks-fork-river-highway-17-bay-creek",
    "slug": "jacks-fork-river-highway-17-bay-creek",
    "name": "Jacks Fork River",
    "reach": "Buck Hollow / Highway 17 Bridge to Bay Creek River Access",
    "aliases": [
      "Jacks Fork - Highway 17 to Bay Creek",
      "Upper Jacks Fork - Highway 17 to Bay Creek",
      "Buck Hollow to Bay Creek long split"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Longer upper Jacks Fork day from Buck Hollow to Bay Creek, backed by current NPS float-time rows, primitive camping context at both public accesses, and the same direct Mountain View gauge used conservatively on adjacent upper-river splits.",
    "statusText": "Use the Jacks Fork near Mountain View gauge. Around 100 cfs is the conservative low-water floor; below that, expect repeated scraping, dragging, and possible short lining through riffles above Bay Creek. High or rising water deserves extra caution in this narrow upper-river corridor.",
    "latitude": 37.057183,
    "longitude": -91.664061,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This longer upper-Jacks split chains together three seasonal NPS float-time rows, so the remote shuttle and long stretch between easy exits matter more than the modest mileage might suggest.",
        "The direct Mountain View gauge was below the 100 cfs conservative floor during this run, which matches the expected scrape-prone, drag-heavy character on shallow riffles above Rymers.",
        "Use only the named NPS accesses at Buck Hollow and Bay Creek. Private banks, informal pull-offs, and unsanctioned gravel bars are not substitutes for the signed river accesses."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07065200",
      "provider": "usgs",
      "siteId": "07065200",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork near Mountain View, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07065200/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Rivers.MOHERP Mountain View gauge rating and adjacent upper-Jacks trip rows",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The upper Jacks Fork is seasonal. Current NPS materials still say portions are navigable only during certain times because of low water, and this longer Buck-Hollow-to-Bay-Creek day is most reliable in spring or after rain. Thunderstorms can raise the valley quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "This longer upper-river reach still carries Class I-II Ozark character with riffles, shoals, bluff pools, wood, and remote shuttle logistics. It should be treated as moving water, not a casual flatwater float.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: the current NPS float-times page still lists Highway 17 to Blue Spring as 2.6 miles / 1 hour, Blue Spring to Rymers as 6.6 miles / 3 hours, and Rymers to Bay Creek as 9 miles / 4 hours, which supports a combined public Buck-Hollow-to-Bay-Creek route of about 18.2 miles / 8 hours; the current NPS park brochure still places Buck Hollow at river mile 88 and Bay Creek at river mile 74 with primitive camping context; and same-day USGS Water Services IV returned 95.0 cfs and 0.89 ft at 2026-07-06 19:45 CDT for direct gauge 07065200. The app keeps only the existing conservative 100 cfs minimum-only upper-Jacks model already used by adjacent implemented splits."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Highway 17 to Bay Creek, about 18.2 mi / 8 hr",
        "note": "The current NPS float-times page still lists Highway 17 to Blue Spring as 2.6 miles / 1 hour, Blue Spring to Rymers as 6.6 miles / 3 hours, and Rymers to Bay Creek as 9 miles / 4 hours, which supports a combined Buck-Hollow-to-Bay-Creek public day route of about 18.2 miles / 8 hours.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Public put-in",
        "value": "Buck Hollow at Highway 17, river mile 88",
        "note": "The current NPS park brochure lists Buck Hollow where Highway 17 crosses the Jacks Fork and places it at river mile 88.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Public take-out",
        "value": "Bay Creek, river mile 74",
        "note": "The current NPS park brochure lists Bay Creek as a river access with picnic area and primitive campsites west of Eminence off Highway 106.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07065200 at 95.0 cfs / 0.89 ft",
        "note": "A same-day Water Services IV refresh returned 95.0 cfs and 0.89 ft at 2026-07-06 19:45 CDT for Jacks Fork near Mountain View, the direct upper-Jacks gauge already used by adjacent routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065200"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Mountain View gauge Good beginning at 100 cfs, and the adjacent implemented upper-Jacks routes already use that conservative floor. The app keeps only the same 100 cfs minimum-only model here.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168"
      },
      {
        "label": "Coordinate support",
        "value": "Buck Hollow bridge access to Bay Creek River Access",
        "note": "This route reuses the same Buck Hollow and Bay Creek access anchors already implemented on adjacent upper Jacks Fork routes, keeping the endpoint interpretation consistent across the corridor.",
        "sourceUrl": "https://topoquest.com/place-detail.php?id=713232"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Jacks Fork estimated float times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Mountain View gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07065200 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07065200/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07065200 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065200",
        "provider": "usgs"
      },
      {
        "label": "TopoQuest Bay Creek area features",
        "url": "https://topoquest.com/place-detail.php?id=713232",
        "provider": "local"
      }
    ]
  },
  {
    "id": "jacks-fork-river-blue-spring-rymers",
    "slug": "jacks-fork-river-blue-spring-rymers",
    "name": "Jacks Fork River",
    "reach": "Blue Spring River Access to Rymers Access",
    "aliases": [
      "Jacks Fork - Blue Spring to Rymers",
      "Upper Jacks Fork - Blue Spring to Rymers",
      "Blue Spring Camp to Rymers"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Short upper Jacks Fork day from Blue Spring to Rymers, with current NPS float-time support, primitive riverside camping context at both park accesses, and the direct Mountain View gauge used conservatively.",
    "statusText": "Use the Jacks Fork near Mountain View gauge. Around 100 cfs is the conservative low-water floor; below that, expect shallow riffles, dragging, and possible short lining. High or rising water deserves extra caution on this narrow upper-river corridor.",
    "latitude": 37.054497,
    "longitude": -91.638198,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This upper Jacks Fork split is remote, seasonal, and narrow enough that wood, strainers, and shallow ledges matter more than the short mileage suggests.",
        "MoHERP exact trip rows show the route can still be low and scrape-prone below the 100 cfs floor, while thunderstorms can raise the valley quickly and make blind bends less forgiving.",
        "Use only the named NPS accesses. Blue Spring and Rymers both have primitive camping context, but private banks and unsanctioned roadside pull-offs are not substitutes for the signed river accesses."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07065200",
      "provider": "usgs",
      "siteId": "07065200",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork near Mountain View, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07065200/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Rivers.MOHERP Mountain View gauge rating and Blue-Spring-to-Rymers trip rows",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The upper Jacks Fork is seasonal. NPS says portions are only navigable during certain times because of low river levels, and the Blue Spring-to-Rymers segment is most reliable in spring or after rain. Thunderstorms can raise this narrow valley quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "This short upper-river reach still carries Class I-II Ozark character with riffles, shoals, bluff pools, wood, and remote shuttle logistics. Treat it as moving water rather than a casual flatwater drift.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: the current NPS Paddle Jacks Fork River page lists Blue Spring to Rymers as a 4-hour float; the current NPS park brochure places Blue Spring at river mile 87 and Rymers at river mile 82 with primitive camping context at both accesses; USGS 07065200 returned same-day values during this run; and Rivers.MOHERP has exact Blue-Spring-to-Rymers trip rows marked Good at 105 and 102 cfs and Low at 27 cfs. Coordinates are topo-derived public-access anchors rather than an NPS coordinate table, so paddlers should follow signed access roads and parking layout on arrival."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Blue Spring to Rymers, 4 hr",
        "note": "The current NPS Paddle Jacks Fork River page lists Blue Spring to Rymers as an estimated 4-hour float and names both accesses among the popular Jacks Fork put-ins.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm"
      },
      {
        "label": "Public put-in",
        "value": "Blue Spring on Jacks Fork, river mile 87",
        "note": "The current NPS park brochure lists Blue Spring on the Jacks Fork as a river access with picnic area and primitive camping, located across the river from the Blue Spring geologic feature.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Public take-out",
        "value": "Rymers, river mile 82",
        "note": "The current NPS park brochure lists Rymers as a river access with picnic area and primitive campsites and gives road directions from US 60 and Highway M.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07065200 at 124 cfs / 1.08 ft",
        "note": "A same-day Water Services IV refresh returned 124 cfs and 1.08 ft at 2026-06-22 08:45 CDT for Jacks Fork near Mountain View, the direct upper-Jacks gauge already used by adjacent routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065200"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Mountain View gauge Good beginning at 100 cfs and includes exact Blue Spring-to-Rymers rows marked Good at 105 and 102 cfs and Low at 27 cfs. The app keeps only the conservative 100 cfs floor.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168"
      },
      {
        "label": "Coordinate support",
        "value": "Blue Spring River Access to Rymers Access",
        "note": "TopoQuest nearby-feature listings around Panther Hollow show Blue Spring River Access at 37.054497, -91.638198, and the adjacent implemented Buck Hollow-to-Rymers route already uses the same Rymers access anchor.",
        "sourceUrl": "https://topoquest.com/place/missouri/valley/panther-hollow/723996"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Mountain View gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07065200 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07065200/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07065200 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065200",
        "provider": "usgs"
      },
      {
        "label": "TopoQuest Blue Spring area features",
        "url": "https://topoquest.com/place/missouri/valley/panther-hollow/723996",
        "provider": "local"
      }
    ]
  },
  {
    "id": "jacks-fork-river-blue-spring-bay-creek",
    "slug": "jacks-fork-river-blue-spring-bay-creek",
    "name": "Jacks Fork River",
    "reach": "Blue Spring River Access to Bay Creek River Access",
    "aliases": [
      "Jacks Fork - Blue Spring to Bay Creek",
      "Upper Jacks Fork - Blue Spring to Bay Creek",
      "Blue Spring to Bay Creek long split"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long upper Jacks Fork day from Blue Spring to Bay Creek, backed by current NPS float-time rows, primitive camping context at both named accesses, and the same direct Mountain View gauge used conservatively on adjacent upper-Jacks routes.",
    "statusText": "Use the Jacks Fork near Mountain View gauge. Around 100 cfs is the conservative low-water floor; below that, expect prolonged scraping, dragging, and slower travel over shallow riffles. High or rising water deserves extra caution on this remote access-to-access corridor.",
    "latitude": 37.054497,
    "longitude": -91.638198,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This route combines two seasonal upper-Jacks NPS float-time rows into a longer remote day, so wood, strainers, and limited easy exits matter more than the moderate river mileage suggests.",
        "The direct Mountain View gauge was below the 100 cfs conservative floor during this run, which matches the expectation of repeated shallow riffles and longer dragging if paddlers push the route in dry conditions.",
        "Blue Spring and Bay Creek both carry NPS camping context, but private banks and informal roadside pull-offs are not substitutes for the signed public river accesses."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07065200",
      "provider": "usgs",
      "siteId": "07065200",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork near Mountain View, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07065200/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Rivers.MOHERP Mountain View gauge rating and adjacent upper-Jacks trip rows",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The upper Jacks Fork is seasonal. Current NPS materials still say portions are navigable only during certain times because of low water, and this longer Blue-Spring-to-Bay-Creek section is most reliable in spring or after rain. Thunderstorms can raise the corridor quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a long upper-river Ozark float with Class I-II moving water, bluff pools, shoals, wood, and limited easy exits between named accesses. Treat it as a remote moving-water day, not a casual lower-river outing.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: the current NPS float-times page still lists Blue Spring to Rymers as 6.6 miles / 3 hours and Rymers to Bay Creek as 9 miles / 4 hours, which supports a combined Blue-Spring-to-Bay-Creek route of about 15.6 miles / 7 hours; the current NPS park brochure still places Blue Spring at river mile 87 and Bay Creek at river mile 74 with primitive camping context; and same-day USGS Water Services IV returned 95.0 cfs and 0.89 ft at 2026-07-06 19:45 CDT for direct gauge 07065200. The app keeps only the same conservative 100 cfs minimum-only upper-Jacks model already used by adjacent implemented splits."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Blue Spring to Bay Creek, about 15.6 mi / 7 hr",
        "note": "The current NPS float-times page still lists Blue Spring to Rymers as 6.6 miles / 3 hours and Rymers to Bay Creek as 9 miles / 4 hours, which supports a combined Blue-Spring-to-Bay-Creek public day route of about 15.6 miles / 7 hours.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Public put-in",
        "value": "Blue Spring on Jacks Fork, river mile 87",
        "note": "The current NPS park brochure lists Blue Spring on the Jacks Fork as a river access with primitive camping context, across from the geologic feature.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Public take-out",
        "value": "Bay Creek, river mile 74",
        "note": "The current NPS park brochure lists Bay Creek as a river access with picnic area and primitive campsites west of Eminence off Highway 106.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07065200 at 95.0 cfs / 0.89 ft",
        "note": "A same-day Water Services IV refresh returned 95.0 cfs and 0.89 ft at 2026-07-06 19:45 CDT for Jacks Fork near Mountain View, the direct upper-Jacks gauge already used by adjacent routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065200"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Mountain View gauge Good beginning at 100 cfs, and adjacent implemented upper-Jacks routes already use that conservative floor. The app keeps only the same 100 cfs minimum-only model here.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168"
      },
      {
        "label": "Coordinate support",
        "value": "Blue Spring River Access to Bay Creek River Access",
        "note": "This route reuses the same Blue Spring and Bay Creek access anchors already implemented on adjacent upper Jacks Fork routes, keeping the endpoint interpretation consistent across the corridor.",
        "sourceUrl": "https://topoquest.com/place-detail.php?id=713232"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Jacks Fork estimated float times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Mountain View gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07065200 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07065200/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07065200 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065200",
        "provider": "usgs"
      },
      {
        "label": "TopoQuest Bay Creek area features",
        "url": "https://topoquest.com/place-detail.php?id=713232",
        "provider": "local"
      }
    ]
  },
  {
    "id": "jacks-fork-river-rymers-bay-creek",
    "slug": "jacks-fork-river-rymers-bay-creek",
    "name": "Jacks Fork River",
    "reach": "Rymers Access to Bay Creek River Access",
    "aliases": [
      "Jacks Fork - Rymers to Bay Creek",
      "Upper Jacks Fork - Rymers to Bay Creek",
      "Rymers to Bay Creek campground split"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Middle upper Jacks Fork day from Rymers to Bay Creek, anchored by NPS river-mile access support, primitive camping context at both accesses, and the same direct Mountain View gauge used on adjacent upper-river routes.",
    "statusText": "Use the Jacks Fork near Mountain View gauge. Around 100 cfs is the conservative low-water floor; below that, expect regular scraping, poling, or short lining on riffles. High or rising water deserves extra caution in this remote access-to-access corridor.",
    "latitude": 37.061386,
    "longitude": -91.559117,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This split sits between two remote upper-Jacks accesses, so wood, strainers, and long gaps between easy exits matter more than the moderate mileage suggests.",
        "Rivers.MOHERP has an exact low-flow row at 33 cfs where nearly every riffle stopped the boats, which is why the app keeps the same conservative 100 cfs floor used on adjacent upper-Jacks routes.",
        "Rymers and Bay Creek both have camping context in the park brochure, but treat this route as a day float unless you have checked current NPS rules, closures, and legal overnight plans."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07065200",
      "provider": "usgs",
      "siteId": "07065200",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork near Mountain View, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07065200/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Rivers.MOHERP Mountain View gauge rating and Rymers-to-Bay-Creek trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The upper Jacks Fork is seasonal and can become scrape-prone in dry spells. Current NPS materials still frame the corridor as a chain of floatable access points, but storms can raise the valley quickly and complicate the remote shuttle.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a remote upper-river Ozark float with Class I-II moving water, bluff pools, shallow ledges, wood, and limited easy exits between public accesses. It should not be treated like the easier spring-fed lower Jacks Fork.",
      "confidenceNotes": "Confidence is good enough for a conservative add, with an explicit route-shape caveat: the current NPS Paddle Jacks Fork River page still names both Rymers and Bay Creek as popular put-ins, and the current NPS park brochure places them at river miles 82 and 74 with primitive camping context at both accesses, which is enough map support to infer an approximately 8-mile public segment. USGS 07065200 returned same-day values during this run, and Rivers.MOHERP includes an exact Rymers-to-Bay-Creek low-water row at 33 cfs. The app keeps only the same 100 cfs minimum-only upper-Jacks floor already used by adjacent routes and does not claim an ideal range or high-water cutoff."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Rymers to Bay Creek, about 8 mi by NPS river miles",
        "note": "The current NPS park brochure places Rymers at river mile 82 and Bay Creek at river mile 74, while the current Paddle Jacks Fork River page still names both as popular put-ins. That is enough official route-shape support for this access-to-access segment even though the current page no longer gives a standalone float-time row.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Public put-in",
        "value": "Rymers, river mile 82",
        "note": "The current NPS park brochure lists Rymers as a river access with picnic area and primitive campsites and gives road directions from Mountain View via Highway M.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Public take-out",
        "value": "Bay Creek, river mile 74",
        "note": "The current NPS park brochure lists Bay Creek as a river access with picnic area and primitive campsites and locates it west of Eminence off Highway 106.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07065200 at 124 cfs / 1.08 ft",
        "note": "A same-day Water Services IV refresh returned 124 cfs and 1.08 ft at 2026-06-22 08:45 CDT for Jacks Fork near Mountain View, the direct upper-Jacks gauge used for the adjacent Buck Hollow and Blue Spring routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065200"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Mountain View gauge Good beginning at 100 cfs and includes an exact Rymers-to-Bay-Creek row at 33 cfs marked Low with nearly every riffle stopping the boats. The app keeps only the conservative 100 cfs floor.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168"
      },
      {
        "label": "Coordinate support",
        "value": "Rymers Access to Bay Creek River Access",
        "note": "This route reuses the same Rymers and Bay Creek access anchors already implemented on the adjacent Buck Hollow-to-Rymers and Bay Creek-to-Alley routes, keeping the endpoint interpretation consistent across the upper Jacks Fork corridor.",
        "sourceUrl": "https://topoquest.com/place-detail.php?id=713232"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Mountain View gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065200&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07065200 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07065200/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07065200 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065200",
        "provider": "usgs"
      },
      {
        "label": "TopoQuest Bay Creek area features",
        "url": "https://topoquest.com/place-detail.php?id=713232",
        "provider": "local"
      }
    ]
  },
  {
    "id": "jacks-fork-river-rymers-alley-spring",
    "slug": "jacks-fork-river-rymers-alley-spring",
    "name": "Jacks Fork River",
    "reach": "Rymers Access to Alley Spring Access",
    "aliases": [
      "Jacks Fork - Rymers to Alley Spring",
      "Upper Jacks Fork - Rymers to Alley Spring",
      "Rymers to Alley long split"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long upper Jacks Fork day from Rymers to Alley Spring, backed by current NPS float-time rows, public access support at both named landings, and the direct Alley Spring gauge used with the same conservative 100 cfs floor already applied on the downstream upper-Jacks reach.",
    "statusText": "Use the Jacks Fork at Alley Spring gauge. Around 100 cfs is the conservative low-water floor; below that, expect frequent scraping and slow travel above Alley Spring. High or rising water deserves extra caution, and this long remote corridor is not casual flood-stage water.",
    "latitude": 37.061386,
    "longitude": -91.559117,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This route combines two seasonal upper-Jacks float-time rows into a long remote day with few easy exits between Rymers, Bay Creek, and Alley Spring.",
        "The direct Alley Spring gauge was only slightly above the 100 cfs conservative floor during this run, so paddlers should still expect shallow riffles, possible dragging, and slower travel above Alley Spring.",
        "Rymers and Bay Creek have primitive camping context and Alley Spring has developed campground context, but use only signed public accesses and check current NPS rules before relying on any overnight plan."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07065495",
      "provider": "usgs",
      "siteId": "07065495",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork at Alley Spring, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07065495/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Rivers.MOHERP Alley Spring gauge rating and adjacent upper-Jacks trip rows",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065495&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Current NPS materials still frame the upper Jacks Fork as seasonal water where low stages can limit navigation and storms can raise the corridor quickly. This long Rymers-to-Alley day is most reliable in spring or after rain, and same-day closure checks still matter.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a long upper-river Ozark float with Class I-II moving water, shoals, wood, bluff pools, and limited easy exits until Alley Spring. It should not be treated like the easier spring-fed water below Alley Spring.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: the current NPS float-times page still lists Rymers to Bay Creek as 9 miles / 4 hours and Bay Creek to Alley Spring as 5.8 miles / 2 hours, which supports a combined Rymers-to-Alley-Spring route of about 14.8 miles / 6 hours; the current NPS park brochure still places Rymers at river mile 82 and Alley Spring at river mile 69 with camping and access context; and same-day USGS Water Services IV returned 103 cfs and 1.51 ft at 2026-07-06 20:30 CDT for direct gauge 07065495 at Alley Spring. The app keeps only the existing conservative 100 cfs minimum-only upper-Jacks model already used by Bay-Creek-to-Alley."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Rymers to Alley Spring, about 14.8 mi / 6 hr",
        "note": "The current NPS float-times page still lists Rymers to Bay Creek as 9 miles / 4 hours and Bay Creek to Alley Spring as 5.8 miles / 2 hours, which supports a combined Rymers-to-Alley-Spring public day route of about 14.8 miles / 6 hours.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Public put-in",
        "value": "Rymers, river mile 82",
        "note": "The current NPS park brochure lists Rymers as a river access with primitive campsites and road directions from US 60 and Highway M.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Public take-out",
        "value": "Alley Spring, river mile 69",
        "note": "The current NPS park brochure lists Alley Spring as a Jacks Fork river access with campground, ranger station, picnic area, and hiking-trail context.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07065495 at 103 cfs / 1.51 ft",
        "note": "A same-day Water Services IV refresh returned 103 cfs and 1.51 ft at 2026-07-06 20:30 CDT for Jacks Fork at Alley Spring, the direct gauge already used by Bay-Creek-to-Alley.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065495"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Alley Spring gauge Good beginning at 100 cfs, and the adjacent implemented Bay-Creek-to-Alley route already uses that conservative floor. The app keeps only the same 100 cfs minimum-only model here.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07065495&hours=168"
      },
      {
        "label": "Coordinate support",
        "value": "Rymers Access to Alley Spring River Access",
        "note": "This route reuses the same Rymers, Bay Creek, and Alley Spring access anchors already implemented on adjacent upper Jacks Fork routes, keeping the endpoint interpretation consistent across the corridor.",
        "sourceUrl": "https://topoquest.com/place-detail.php?id=713232"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Jacks Fork estimated float times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Alley Spring gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065495&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07065495 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07065495/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07065495 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065495",
        "provider": "usgs"
      },
      {
        "label": "TopoQuest Alley Spring area features",
        "url": "https://topoquest.com/place-detail.php?id=713232",
        "provider": "local"
      }
    ]
  },
  {
    "id": "jacks-fork-river-highway-17-alley-spring",
    "slug": "jacks-fork-river-highway-17-alley-spring",
    "name": "Jacks Fork River",
    "reach": "Buck Hollow / Highway 17 Bridge to Alley Spring Access",
    "aliases": [
      "Jacks Fork - Highway 17 to Alley Spring",
      "Upper Jacks Fork - Highway 17 to Alley Spring",
      "Buck Hollow to Alley Spring"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Full upper Jacks Fork continuation from Buck Hollow to Alley Spring, backed by current NPS float-time support, named public accesses throughout the corridor, and the direct Alley Spring gauge used conservatively.",
    "statusText": "Use the Jacks Fork at Alley Spring gauge. Around 100 cfs is the conservative low-water floor; below that, expect repeated scraping, dragging, and possible short lining across this all-day upper-river route.",
    "latitude": 37.057183,
    "longitude": -91.664061,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This is the longest currently supported upper Jacks Fork continuation in the app, with few easy exits between Buck Hollow, Blue Spring, Rymers, Bay Creek, and Alley Spring.",
        "The direct Alley Spring gauge was below the 100 cfs conservative floor during this run, so expect prolonged scraping, dragging, and slower-than-normal progress if you attempt it at similar levels.",
        "Use only the named public accesses and check current park alerts before leaving vehicles. Remote gravel-road shuttle time and storm runoff matter as much as the river mileage here."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07065495",
      "provider": "usgs",
      "siteId": "07065495",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork at Alley Spring, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07065495/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Rivers.MOHERP Alley Spring gauge rating and adjacent upper-Jacks trip rows",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065495&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Current NPS materials still frame the upper Jacks Fork as seasonal water where low stages can limit navigation and storms can raise the corridor quickly. This full Buck-Hollow-to-Alley continuation is most reliable in spring or after rain, and same-day closure checks still matter.",
      "difficulty": "hard",
      "difficultyNotes": "This is a very long upper-river Ozark float with Class I-II moving water, shoals, wood, bluff pools, and a remote shuttle. The route is materially more committing than the shorter upper-Jacks planners and should not be treated like the easier water below Alley Spring.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: the current NPS float-times page still lists Highway 17 to Blue Spring as 2.6 miles / 1 hour, Blue Spring to Rymers as 6.6 miles / 3 hours, Rymers to Bay Creek as 9 miles / 4 hours, and Bay Creek to Alley Spring as 5.8 miles / 2 hours, which supports a combined Buck-Hollow-to-Alley route of about 24 miles; the older NPS Paddle Jacks Fork River page still directly lists Hwy 17 to Alley as a 16-hour float, which reinforces the all-day posture; the current park brochure still places Buck Hollow at river mile 88 and Alley Spring at river mile 69 with named public access support; and same-day USGS Water Services IV returned 91.9 cfs and 1.44 ft at 2026-07-09 06:30 PM CDT for direct gauge 07065495 at Alley Spring. The app keeps only the existing conservative 100 cfs minimum-only upper-Jacks model already used on adjacent Alley-supported routes."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "About 24.0 mi, all-day upper Jacks continuation",
        "note": "The current NPS float-times page still lists Highway 17 to Blue Spring as 2.6 miles / 1 hour, Blue Spring to Rymers as 6.6 miles / 3 hours, Rymers to Bay Creek as 9 miles / 4 hours, and Bay Creek to Alley Spring as 5.8 miles / 2 hours, which supports a combined Buck-Hollow-to-Alley route of about 24.0 miles and 10 paddle-hours before stops.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Legacy NPS timing row",
        "value": "Hwy 17 to Alley, 16 hr",
        "note": "The NPS Paddle Jacks Fork River page still directly lists Hwy 17 to Alley as a 16-hour float, reinforcing that this is an all-day upper-river planner rather than a casual split.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm"
      },
      {
        "label": "Public endpoints",
        "value": "Buck Hollow river mile 88 to Alley Spring river mile 69",
        "note": "The current NPS park brochure still places Buck Hollow where Highway 17 crosses the Jacks Fork at river mile 88 and Alley Spring at river mile 69 with campground, ranger-station, and river-access context.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07065495 at 91.9 cfs / 1.44 ft",
        "note": "A same-day Water Services IV refresh returned 91.9 cfs and 1.44 ft at 2026-07-09 06:30 PM CDT for Jacks Fork at Alley Spring, the direct gauge chosen for this full upper-corridor continuation.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065495"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Alley Spring gauge Good beginning at 100 cfs, and the adjacent implemented Bay-Creek-to-Alley and Rymers-to-Alley routes already use that same conservative floor. The app keeps only the 100 cfs minimum-only model here.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07065495&hours=168"
      },
      {
        "label": "Closure check",
        "value": "No Jacks-specific endpoint closure in current park alerts JSON",
        "note": "The current Ozark National Scenic Riverways alerts feed showed active notices for Akers Ferry, campground reservations, and unrelated area closures, but no live alert naming Buck Hollow, Blue Spring, Rymers, Bay Creek, or Alley Spring as closed endpoints for this route on the review date.",
        "sourceUrl": "https://www.nps.gov/ozar/park-alerts-ozar.json"
      },
      {
        "label": "Coordinate support",
        "value": "Buck Hollow bridge access to Alley Spring River Access",
        "note": "This route reuses the same Buck Hollow and Alley Spring access anchors already implemented on adjacent upper Jacks Fork routes, keeping the endpoint interpretation consistent across the corridor.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Jacks Fork estimated float times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park alerts JSON",
        "url": "https://www.nps.gov/ozar/park-alerts-ozar.json",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Alley Spring gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065495&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07065495 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07065495/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07065495 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065495",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "jacks-fork-river-blue-spring-alley-spring",
    "slug": "jacks-fork-river-blue-spring-alley-spring",
    "name": "Jacks Fork River",
    "reach": "Blue Spring River Access to Alley Spring Access",
    "aliases": [
      "Jacks Fork - Blue Spring to Alley Spring",
      "Upper Jacks Fork - Blue Spring to Alley Spring",
      "Blue Spring to Alley long split"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long upper Jacks Fork continuation from Blue Spring to Alley Spring, backed by current NPS float-time rows, named public accesses through the corridor, and the direct Alley Spring gauge used conservatively.",
    "statusText": "Use the Jacks Fork at Alley Spring gauge. Around 100 cfs is the conservative low-water floor; below that, expect steady scraping, dragging, and a slower-than-normal day above Alley Spring.",
    "latitude": 37.054497,
    "longitude": -91.638198,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This route chains together three seasonal upper-Jacks segments, so the long gap between easy exits and the remote gravel-road shuttle matter more than the clean river-mile math suggests.",
        "The direct Alley Spring gauge was below the 100 cfs conservative floor during this run, so expect scrape-prone riffles and slower progress unless you catch a stronger water window.",
        "Blue Spring, Rymers, Bay Creek, and Alley Spring all have public access context, but use only signed accesses and check current park alerts before relying on any mid-route bailout or overnight plan."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07065495",
      "provider": "usgs",
      "siteId": "07065495",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork at Alley Spring, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07065495/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Rivers.MOHERP Alley Spring gauge rating and adjacent upper-Jacks trip rows",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065495&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Current NPS materials still frame the upper Jacks Fork as seasonal water where low stages can limit navigation and storms can raise the corridor quickly. This Blue-Spring-to-Alley continuation is most reliable in spring or after rain, and same-day closure checks still matter.",
      "difficulty": "hard",
      "difficultyNotes": "This is a long upper-river Ozark float with Class I-II moving water, shoals, wood, bluff pools, and limited easy exits before Alley Spring. It is materially more committing than the shorter Blue Spring and Bay Creek splits.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: the current NPS float-times page still lists Blue Spring to Rymers as 6.6 miles / 3 hours, Rymers to Bay Creek as 9 miles / 4 hours, and Bay Creek to Alley Spring as 5.8 miles / 2 hours, which supports a combined Blue-Spring-to-Alley route of about 21.4 miles / 9 hours; the current park brochure still places Blue Spring at river mile 87 and Alley Spring at river mile 69 with named public access support; and same-day USGS Water Services IV returned 91.9 cfs and 1.44 ft at 2026-07-09 06:30 PM CDT for direct gauge 07065495 at Alley Spring. The app keeps only the existing conservative 100 cfs minimum-only upper-Jacks model already used on adjacent Alley-supported routes."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Blue Spring to Alley Spring, about 21.4 mi / 9 hr",
        "note": "The current NPS float-times page still lists Blue Spring to Rymers as 6.6 miles / 3 hours, Rymers to Bay Creek as 9 miles / 4 hours, and Bay Creek to Alley Spring as 5.8 miles / 2 hours, which supports a combined Blue-Spring-to-Alley-Spring public day route of about 21.4 miles / 9 hours.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Public endpoints",
        "value": "Blue Spring river mile 87 to Alley Spring river mile 69",
        "note": "The current NPS park brochure still places Blue Spring on the Jacks Fork at river mile 87 and Alley Spring at river mile 69 with named public river-access support and camping context at both ends of the corridor.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07065495 at 91.9 cfs / 1.44 ft",
        "note": "A same-day Water Services IV refresh returned 91.9 cfs and 1.44 ft at 2026-07-09 06:30 PM CDT for Jacks Fork at Alley Spring, the direct gauge chosen for this route.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065495"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Alley Spring gauge Good beginning at 100 cfs, and the adjacent implemented Bay-Creek-to-Alley and Rymers-to-Alley routes already use that same conservative floor. The app keeps only the 100 cfs minimum-only model here.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07065495&hours=168"
      },
      {
        "label": "Closure check",
        "value": "No Jacks-specific endpoint closure in current park alerts JSON",
        "note": "The current Ozark National Scenic Riverways alerts feed showed active notices for Akers Ferry, campground reservations, and unrelated area closures, but no live alert naming Blue Spring, Rymers, Bay Creek, or Alley Spring as closed endpoints for this route on the review date.",
        "sourceUrl": "https://www.nps.gov/ozar/park-alerts-ozar.json"
      },
      {
        "label": "Coordinate support",
        "value": "Blue Spring River Access to Alley Spring River Access",
        "note": "This route reuses the same Blue Spring, Rymers, Bay Creek, and Alley Spring access anchors already implemented on adjacent upper Jacks Fork routes, keeping the endpoint interpretation consistent across the corridor.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Jacks Fork estimated float times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park alerts JSON",
        "url": "https://www.nps.gov/ozar/park-alerts-ozar.json",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Alley Spring gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065495&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07065495 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07065495/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07065495 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065495",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "jacks-fork-river-bay-creek-alley-spring",
    "slug": "jacks-fork-river-bay-creek-alley-spring",
    "name": "Jacks Fork River",
    "reach": "Bay Creek to Alley Spring",
    "aliases": [
      "Jacks Fork - Bay Creek to Alley Spring",
      "Jacks Fork - Bay Creek to Alley",
      "Upper Jacks Fork - Bay Creek to Alley Spring"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Short upper Jacks Fork day from Bay Creek to Alley Spring. NPS lists the exact float, Recreation.gov confirms Bay Creek river-edge access, and the direct Alley Spring gauge now supports a conservative low-water check.",
    "statusText": "Use the Jacks Fork at Alley Spring gauge. Around 100 cfs is the conservative low-water floor; below that, expect frequent dragging above Alley Spring. High or rising water deserves extra caution, and MoHERP marks current high and flood stages as unsuitable for casual trips.",
    "latitude": 37.1231,
    "longitude": -91.5018,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-07065495",
      "provider": "usgs",
      "siteId": "07065495",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork at Alley Spring, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07065495/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Rivers.MOHERP Alley Spring gauge rating and Bay-Creek-to-Alley trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065495&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS says portions of the Jacks Fork are only navigable at certain times because of low water. The reach immediately above Alley Spring is wide and shallow in dry spells, while storm runoff can turn this narrow valley high, fast, and woody. Check NPS closures before leaving vehicles.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a short but seasonal upper Jacks Fork reach with Class I-II Ozark moving water, shoals, bluff pools, gravel bars, possible wood, and shallow ledges that can require poling or lining near the floor. It should not be treated like the easier spring-fed water below Alley Spring.",
      "confidenceNotes": "Confidence is good for a conservative add: NPS lists Bay Creek to Alley as a 4-hour Jacks Fork float and names both as popular park put-ins; Recreation.gov describes Bay Creek as a river-edge backcountry campground with boating activity and directions to the access road; the NPS park brochure lists Alley Spring as a river access; USGS 07065495 is the direct route-corridor gauge and exposed same-day May 31, 2026 values; and Rivers.MOHERP provides Alley Spring gauge bands plus a Bay-Creek-to-Alley low-water trip row. Coordinates are USGS-topo-derived access anchors rather than an NPS coordinate table, so same-day signs and park access rules still control."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Bay Creek to Alley, 4 hr",
        "note": "NPS lists Bay Creek to Alley as an estimated 4-hour Jacks Fork float and names Bay Creek and Alley Spring among popular Jacks Fork put-in locations.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm"
      },
      {
        "label": "Bay Creek access",
        "value": "River-edge NPS backcountry campground",
        "note": "Recreation.gov says the Jacks Fork / Middle Current backcountry campgrounds include sites on the river edge with quick water access, lists boating as an available activity, and gives directions to Bay Creek via County Road 106-425.",
        "sourceUrl": "https://www.recreation.gov/camping/campgrounds/10344874"
      },
      {
        "label": "Alley Spring access",
        "value": "NPS river access",
        "note": "The NPS park brochure lists Alley Spring in the Jacks Fork river-access inventory with campground, ranger station, picnic area, and hiking-trail context.",
        "sourceUrl": "https://home.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 07065495",
        "note": "USGS operates Jacks Fork at Alley Spring, MO. The legacy current-conditions page showed 1,000 cfs and 3.91 ft at 2026-05-31 15:30 CDT during this run.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065495"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Alley Spring gauge Good from 100 to 360 cfs and lists a Bay Creek-to-Alley Spring row at 61 cfs as Low/Poor with nearly every riffle stopping the boats. The app uses only the conservative 100 cfs floor.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07065495&hours=168"
      },
      {
        "label": "High-water caution",
        "value": "High/flood conditions are not casual-trip water",
        "note": "Rivers.MOHERP describes High water as potentially dangerous for young or inexperienced paddlers and Flood water as avoidable for casual trips because obstacles can be treacherous or deadly.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07065495&hours=168"
      },
      {
        "label": "Coordinate support",
        "value": "Bay Creek River Access to Alley Spring River Access",
        "note": "TopoQuest / USGS topo-derived records list Bay Creek River Access at 37.1231, -91.5018 and Alley Spring River Access at 37.1484, -91.4499.",
        "sourceUrl": "https://topoquest.com/place-detail.php?id=713232"
      },
      {
        "label": "Seasonal character",
        "value": "Wide and shallow above Alley Spring",
        "note": "FloatMissouri / MDC-derived Jacks Fork guidance says loaded-canoe trips above Alley Spring are recommended only in spring or after good summer rains, and that the few miles immediately above Alley Spring can be wide, shallow, and walkable in low water.",
        "sourceUrl": "https://www.floatmissouri.com/plan/missouri-rivers/jacks-fork-river/"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "nps"
      },
      {
        "label": "Recreation.gov Jacks Fork / Middle Current Backcountry Campsites",
        "url": "https://www.recreation.gov/camping/campgrounds/10344874",
        "provider": "local"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://home.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Alley Spring gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07065495&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07065495 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07065495/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07065495 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07065495",
        "provider": "usgs"
      },
      {
        "label": "TopoQuest Alley Spring area features",
        "url": "https://topoquest.com/place-detail.php?id=713232",
        "provider": "local"
      },
      {
        "label": "FloatMissouri Jacks Fork River guide",
        "url": "https://www.floatmissouri.com/plan/missouri-rivers/jacks-fork-river/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "jacks-fork-river-bay-creek-chilton",
    "slug": "jacks-fork-river-bay-creek-chilton",
    "name": "Jacks Fork River",
    "reach": "Bay Creek River Access to Joshua T. Chilton Memorial Landing",
    "aliases": [
      "Jacks Fork - Bay Creek to Eminence",
      "Jacks Fork - Bay Creek to Chilton",
      "Upper-lower Jacks Fork Bay Creek to Eminence continuation"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Bay Creek-to-Eminence continuation that links the upper Bay Creek float into the classic Alley Spring-to-town finish, using current NPS float-time rows, public access support, and the direct Eminence gauge conservatively.",
    "statusText": "Use the Jacks Fork at Eminence gauge. Around 200 cfs is the conservative low-water floor; below that, expect shallow riffles, slower travel, and extra scraping, especially above Alley Spring.",
    "latitude": 37.1231,
    "longitude": -91.5018,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This route starts on the more seasonal upper Jacks Fork above Alley Spring, then finishes on the busier lower corridor into Eminence.",
        "The direct Eminence gauge was below the 200 cfs conservative floor during this run, so expect scrape-prone riffles and slower-than-normal travel, especially before you reach the stronger Alley Spring water.",
        "Bay Creek is a remote gravel-road put-in, while the Chilton finish sits in the town-access corridor with private banks nearby. Use only signed public accesses and check current park alerts before leaving vehicles."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07066000",
      "provider": "usgs",
      "siteId": "07066000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork at Eminence, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07066000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Rivers.MOHERP Eminence gauge rating and lower-Jacks trip rows",
        "url": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS says paddling is available year-round but portions of the Jacks Fork can still be limited by low water. This Bay-Creek-to-Eminence continuation depends on the more seasonal upper section above Alley Spring, while storms can quickly change current, wood, and landing conditions across the whole day.",
      "difficulty": "moderate",
      "difficultyNotes": "This route mixes seasonal Class I-II upper-river water above Alley Spring with the busier lower Jacks corridor into Eminence. It is easier than the full upper routes, but still more demanding than the short Alley-to-Chilton float because it starts upstream of the spring-fed lower section.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: the current NPS float-times page still lists Bay Creek to Alley Spring as 5.8 miles / 2 hours and Alley Spring to Eminence as 6.3 miles / 3 hours, which supports a combined Bay-Creek-to-Eminence route of about 12.1 miles / 5 hours; the current park brochure still places Bay Creek at river mile 74 and Alley Spring at river mile 69 with named public access support; MDC still confirms Joshua T. Chilton Memorial Landing as a public Jacks Fork take-out in Eminence; and same-day USGS Water Services IV returned 174 cfs and 1.90 ft at 2026-07-09 06:30 PM CDT for direct gauge 07066000 at Eminence. The app keeps only the existing conservative 200 cfs minimum-only lower-Jacks model already used by Alley-Spring-to-Chilton."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Bay Creek to Eminence, about 12.1 mi / 5 hr",
        "note": "The current NPS float-times page still lists Bay Creek to Alley Spring as 5.8 miles / 2 hours and Alley Spring to Eminence as 6.3 miles / 3 hours, which supports a combined Bay-Creek-to-Eminence public day route of about 12.1 miles / 5 hours.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Public put-in",
        "value": "Bay Creek, river mile 74",
        "note": "The current NPS park brochure still lists Bay Creek as a Jacks Fork river access with picnic area and primitive campsites west of Eminence off Highway 106.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Public take-out",
        "value": "Joshua T. Chilton Memorial Landing in Eminence",
        "note": "MDC still identifies Joshua T. Chilton Memorial Landing in Eminence as a Jacks Fork River access where boats may be used under the cooperative-area regulations.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/joshua-t-chilton-memorial-landing-eminence"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07066000 at 174 cfs / 1.90 ft",
        "note": "A same-day Water Services IV refresh returned 174 cfs and 1.90 ft at 2026-07-09 06:30 PM CDT for Jacks Fork at Eminence, the direct gauge chosen for this route.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07066000"
      },
      {
        "label": "Low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Eminence gauge Good beginning at 200 cfs, and the adjacent implemented Alley-Spring-to-Chilton route already uses that same conservative floor. The app keeps only the 200 cfs minimum-only model here.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168"
      },
      {
        "label": "Closure check",
        "value": "No Jacks-specific endpoint closure in current park alerts JSON",
        "note": "The current Ozark National Scenic Riverways alerts feed showed active notices for Akers Ferry, campground reservations, and unrelated area closures, but no live alert naming Bay Creek, Alley Spring, or Joshua T. Chilton Memorial Landing as closed endpoints for this route on the review date.",
        "sourceUrl": "https://www.nps.gov/ozar/park-alerts-ozar.json"
      },
      {
        "label": "Coordinate support",
        "value": "Bay Creek River Access to Joshua T. Chilton Memorial Landing",
        "note": "This route reuses the same Bay Creek and Joshua T. Chilton access anchors already implemented on the adjacent Bay-Creek-to-Alley and Alley-Spring-to-Chilton routes, keeping the endpoint interpretation consistent across the corridor.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Jacks Fork estimated float times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park alerts JSON",
        "url": "https://www.nps.gov/ozar/park-alerts-ozar.json",
        "provider": "nps"
      },
      {
        "label": "MDC Joshua T. Chilton Memorial Landing",
        "url": "https://mdc.mo.gov/discover-nature/places/joshua-t-chilton-memorial-landing-eminence",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Eminence gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07066000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07066000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07066000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07066000",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "jacks-fork-river-highway-17-chilton",
    "slug": "jacks-fork-river-highway-17-chilton",
    "name": "Jacks Fork River",
    "reach": "Buck Hollow / Highway 17 Bridge Access to Joshua T. Chilton Memorial Landing",
    "aliases": [
      "Jacks Fork - Highway 17 to Eminence",
      "Upper-lower Jacks Fork Buck Hollow to Chilton",
      "Buck Hollow to Chilton full continuation"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Full Buck-Hollow-to-Eminence Jacks Fork continuation that links the longest current upper-Jacks corridor into the classic Alley-to-town finish, using current NPS route rows, named public accesses, and the direct Eminence gauge conservatively.",
    "statusText": "Use the Jacks Fork at Eminence gauge. Around 200 cfs is the conservative low-water floor; below that, expect scrape-prone upper-river riffles, slower travel, and a very long day.",
    "latitude": 37.057183,
    "longitude": -91.664061,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This is the longest currently supported Jacks Fork continuation in the app, combining the full upper Buck Hollow corridor with the lower Eminence finish.",
        "The direct Eminence gauge was below the 200 cfs conservative floor during this run, so expect repeated scraping, slow progress, and more walking or lining above Alley Spring.",
        "Buck Hollow is a remote gravel-road put-in and Joshua T. Chilton sits in the town-access corridor. Use only named public accesses and check current park alerts before leaving vehicles."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07066000",
      "provider": "usgs",
      "siteId": "07066000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork at Eminence, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07066000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Rivers.MOHERP Eminence gauge rating and lower-Jacks trip rows",
        "url": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS says paddling is available year-round, but this full continuation still depends on the most seasonal upper Jacks Fork water above Blue Spring, Rymers, and Bay Creek. Dry periods can turn the upper miles into a scrape-and-drag slog, while storms can raise the entire corridor quickly.",
      "difficulty": "hard",
      "difficultyNotes": "This is a very long mixed upper-lower Jacks Fork route with Class I-II moving water, wood, riffles, bluff pools, remote shuttle logistics, and the fatigue of linking the whole Buck-Hollow-to-Eminence chain in one push.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: the current NPS float-times page still lists Highway 17 to Blue Spring as 2.6 miles / 1 hour, Blue Spring to Rymers as 6.6 miles / 3 hours, Rymers to Bay Creek as 9 miles / 4 hours, Bay Creek to Alley Spring as 5.8 miles / 2 hours, and Alley Spring to Eminence as 6.3 miles / 3 hours, which supports a combined Buck-Hollow-to-Eminence route of about 30.3 miles / 13 hours; the older NPS Paddle Jacks Fork River page still directly lists Hwy 17 to Alley as a 16-hour float, reinforcing the all-day posture; the current park brochure still places Buck Hollow at river mile 88 and Alley Spring at river mile 69 with named public access support; MDC still confirms Joshua T. Chilton Memorial Landing as a public Jacks Fork take-out in Eminence; and same-day USGS Water Services IV returned 171 cfs and 1.89 ft at 2026-07-09 09:30 PM CDT for direct gauge 07066000 at Eminence. The app keeps only the existing conservative 200 cfs minimum-only lower-Jacks model already used by Bay-Creek-to-Chilton."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Buck Hollow to Eminence, about 30.3 mi / 13 hr",
        "note": "The current NPS float-times page still lists Highway 17 to Blue Spring as 2.6 miles / 1 hour, Blue Spring to Rymers as 6.6 miles / 3 hours, Rymers to Bay Creek as 9 miles / 4 hours, Bay Creek to Alley Spring as 5.8 miles / 2 hours, and Alley Spring to Eminence as 6.3 miles / 3 hours, which supports a combined Buck-Hollow-to-Eminence public route of about 30.3 miles / 13 hours.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Legacy NPS timing row",
        "value": "Hwy 17 to Alley, 16 hr",
        "note": "The NPS Paddle Jacks Fork River page still directly lists Hwy 17 to Alley as a 16-hour float, reinforcing that this full Buck-Hollow-to-town continuation is beyond a casual day-float posture.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm"
      },
      {
        "label": "Public endpoints",
        "value": "Buck Hollow river mile 88 to Joshua T. Chilton Memorial Landing",
        "note": "The current NPS park brochure still places Buck Hollow where Highway 17 crosses the Jacks Fork at river mile 88, and the current MDC Joshua T. Chilton page still confirms the Eminence take-out.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07066000 at 171 cfs / 1.89 ft",
        "note": "A same-day Water Services IV refresh returned 171 cfs and 1.89 ft at 2026-07-09 09:30 PM CDT for Jacks Fork at Eminence, the direct gauge chosen for this full continuation.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07066000"
      },
      {
        "label": "Low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Eminence gauge Good beginning at 200 cfs, and the adjacent implemented Alley-Spring-to-Chilton and Bay-Creek-to-Chilton routes already use that same conservative floor. The app keeps only the 200 cfs minimum-only model here.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168"
      },
      {
        "label": "Closure check",
        "value": "No Jacks-specific endpoint closure in current park alerts JSON",
        "note": "The current Ozark National Scenic Riverways alerts feed showed active notices for Akers Ferry, campground reservations, and unrelated area closures, but no live alert naming Buck Hollow, Blue Spring, Rymers, Bay Creek, Alley Spring, or Joshua T. Chilton Memorial Landing as closed endpoints for this route on the review date.",
        "sourceUrl": "https://www.nps.gov/ozar/park-alerts-ozar.json"
      },
      {
        "label": "Coordinate support",
        "value": "Buck Hollow bridge access to Joshua T. Chilton Memorial Landing",
        "note": "This route reuses the same Buck Hollow, Blue Spring, Rymers, Bay Creek, Alley Spring, and Joshua T. Chilton access anchors already implemented on adjacent Jacks Fork routes, keeping the endpoint interpretation consistent across the corridor.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/joshua-t-chilton-memorial-landing-eminence"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Jacks Fork estimated float times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park alerts JSON",
        "url": "https://www.nps.gov/ozar/park-alerts-ozar.json",
        "provider": "nps"
      },
      {
        "label": "MDC Joshua T. Chilton Memorial Landing",
        "url": "https://mdc.mo.gov/discover-nature/places/joshua-t-chilton-memorial-landing-eminence",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Eminence gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07066000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07066000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07066000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07066000",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "jacks-fork-river-blue-spring-chilton",
    "slug": "jacks-fork-river-blue-spring-chilton",
    "name": "Jacks Fork River",
    "reach": "Blue Spring River Access to Joshua T. Chilton Memorial Landing",
    "aliases": [
      "Jacks Fork - Blue Spring to Eminence",
      "Upper-lower Jacks Fork Blue Spring to Chilton",
      "Blue Spring to Chilton continuation"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long Blue-Spring-to-Eminence continuation that links the upper Jacks Fork corridor into the classic Alley-to-town finish, using current NPS float-time rows, named public accesses, and the direct Eminence gauge conservatively.",
    "statusText": "Use the Jacks Fork at Eminence gauge. Around 200 cfs is the conservative low-water floor; below that, expect scrape-prone upper-river riffles, slower travel, and a very long day above Alley Spring.",
    "latitude": 37.054497,
    "longitude": -91.638198,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This route links the long upper Blue Spring corridor into the lower Eminence finish, so it still carries upper-river seasonality and remote-shuttle consequences.",
        "The direct Eminence gauge was below the 200 cfs conservative floor during this run, so expect scraping and slower travel above Alley Spring even though the lower section gains spring water.",
        "Blue Spring is a primitive upper access, while Joshua T. Chilton sits in the town-access corridor. Use only the named public accesses and check current park alerts before leaving vehicles."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07066000",
      "provider": "usgs",
      "siteId": "07066000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork at Eminence, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07066000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Rivers.MOHERP Eminence gauge rating and lower-Jacks trip rows",
        "url": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS says paddling is available year-round, but this continuation still depends on the seasonal upper Jacks Fork water above Rymers and Bay Creek before it reaches the spring-fed lower corridor. Dry periods can leave the upper miles scrape-prone, while storms can raise the whole route quickly.",
      "difficulty": "hard",
      "difficultyNotes": "This is a very long mixed upper-lower Jacks Fork route with Class I-II moving water, wood, riffles, bluff pools, remote shuttle logistics, and the fatigue of linking the Blue-Spring-to-Eminence chain in one push.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: the current NPS float-times page still lists Blue Spring to Rymers as 6.6 miles / 3 hours, Rymers to Bay Creek as 9 miles / 4 hours, Bay Creek to Alley Spring as 5.8 miles / 2 hours, and Alley Spring to Eminence as 6.3 miles / 3 hours, which supports a combined Blue-Spring-to-Eminence route of about 27.7 miles / 12 hours; the current park brochure still places Blue Spring at river mile 87 and Alley Spring at river mile 69 with named public access support; MDC still confirms Joshua T. Chilton Memorial Landing as a public Jacks Fork take-out in Eminence; and same-day USGS Water Services IV returned 171 cfs and 1.89 ft at 2026-07-09 09:30 PM CDT for direct gauge 07066000 at Eminence. The app keeps only the existing conservative 200 cfs minimum-only lower-Jacks model already used by Bay-Creek-to-Chilton."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Blue Spring to Eminence, about 27.7 mi / 12 hr",
        "note": "The current NPS float-times page still lists Blue Spring to Rymers as 6.6 miles / 3 hours, Rymers to Bay Creek as 9 miles / 4 hours, Bay Creek to Alley Spring as 5.8 miles / 2 hours, and Alley Spring to Eminence as 6.3 miles / 3 hours, which supports a combined Blue-Spring-to-Eminence public route of about 27.7 miles / 12 hours.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Public endpoints",
        "value": "Blue Spring river mile 87 to Joshua T. Chilton Memorial Landing",
        "note": "The current NPS park brochure still lists Blue Spring on the Jacks Fork as a river access with primitive camping context, and the current MDC Joshua T. Chilton page still confirms the Eminence take-out.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07066000 at 171 cfs / 1.89 ft",
        "note": "A same-day Water Services IV refresh returned 171 cfs and 1.89 ft at 2026-07-09 09:30 PM CDT for Jacks Fork at Eminence, the direct gauge chosen for this continuation.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07066000"
      },
      {
        "label": "Low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Eminence gauge Good beginning at 200 cfs, and the adjacent implemented Alley-Spring-to-Chilton and Bay-Creek-to-Chilton routes already use that same conservative floor. The app keeps only the 200 cfs minimum-only model here.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168"
      },
      {
        "label": "Closure check",
        "value": "No Jacks-specific endpoint closure in current park alerts JSON",
        "note": "The current Ozark National Scenic Riverways alerts feed showed active notices for Akers Ferry, campground reservations, and unrelated area closures, but no live alert naming Blue Spring, Rymers, Bay Creek, Alley Spring, or Joshua T. Chilton Memorial Landing as closed endpoints for this route on the review date.",
        "sourceUrl": "https://www.nps.gov/ozar/park-alerts-ozar.json"
      },
      {
        "label": "Coordinate support",
        "value": "Blue Spring River Access to Joshua T. Chilton Memorial Landing",
        "note": "This route reuses the same Blue Spring, Rymers, Bay Creek, Alley Spring, and Joshua T. Chilton access anchors already implemented on adjacent Jacks Fork routes, keeping the endpoint interpretation consistent across the corridor.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/joshua-t-chilton-memorial-landing-eminence"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Jacks Fork estimated float times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park alerts JSON",
        "url": "https://www.nps.gov/ozar/park-alerts-ozar.json",
        "provider": "nps"
      },
      {
        "label": "MDC Joshua T. Chilton Memorial Landing",
        "url": "https://mdc.mo.gov/discover-nature/places/joshua-t-chilton-memorial-landing-eminence",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Eminence gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07066000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07066000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07066000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07066000",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "jacks-fork-river-rymers-chilton",
    "slug": "jacks-fork-river-rymers-chilton",
    "name": "Jacks Fork River",
    "reach": "Rymers Access to Joshua T. Chilton Memorial Landing",
    "aliases": [
      "Jacks Fork - Rymers to Eminence",
      "Upper-lower Jacks Fork Rymers to Chilton",
      "Rymers to Chilton continuation"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long Rymers-to-Eminence continuation that links the upper Jacks Fork corridor into the classic Alley-to-town finish, using current NPS float-time rows, named public accesses, and the direct Eminence gauge conservatively.",
    "statusText": "Use the Jacks Fork at Eminence gauge. Around 200 cfs is the conservative low-water floor; below that, expect scrape-prone riffles above Alley Spring and slower-than-normal travel into town.",
    "latitude": 37.061386,
    "longitude": -91.559117,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This route starts on the seasonal upper Jacks Fork at Rymers, then finishes on the busier lower corridor into Eminence.",
        "The direct Eminence gauge was below the 200 cfs conservative floor during this run, so expect scraping and slower travel above Alley Spring even though the lower finish is spring-supported.",
        "Rymers has primitive camping context, Bay Creek and Alley Spring sit mid-corridor, and Joshua T. Chilton is the town take-out. Use only signed public accesses and check current park alerts before leaving vehicles."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07066000",
      "provider": "usgs",
      "siteId": "07066000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork at Eminence, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07066000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Rivers.MOHERP Eminence gauge rating and lower-Jacks trip rows",
        "url": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS says paddling is available year-round, but this continuation still depends on the seasonal upper Jacks Fork water above Bay Creek before reaching the spring-fed lower corridor. Dry periods can slow the upper half materially, while storms can raise the whole route quickly.",
      "difficulty": "hard",
      "difficultyNotes": "This is a long mixed upper-lower Jacks Fork route with Class I-II moving water, wood, riffles, bluff pools, remote access on the upper half, and the fatigue of linking the Rymers-to-Eminence chain in one push.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: the current NPS float-times page still lists Rymers to Bay Creek as 9 miles / 4 hours, Bay Creek to Alley Spring as 5.8 miles / 2 hours, and Alley Spring to Eminence as 6.3 miles / 3 hours, which supports a combined Rymers-to-Eminence route of about 21.1 miles / 9 hours; the current park brochure still places Rymers at river mile 82 and Alley Spring at river mile 69 with named public access support; MDC still confirms Joshua T. Chilton Memorial Landing as a public Jacks Fork take-out in Eminence; and same-day USGS Water Services IV returned 171 cfs and 1.89 ft at 2026-07-09 09:30 PM CDT for direct gauge 07066000 at Eminence. The app keeps only the existing conservative 200 cfs minimum-only lower-Jacks model already used by Bay-Creek-to-Chilton."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Rymers to Eminence, about 21.1 mi / 9 hr",
        "note": "The current NPS float-times page still lists Rymers to Bay Creek as 9 miles / 4 hours, Bay Creek to Alley Spring as 5.8 miles / 2 hours, and Alley Spring to Eminence as 6.3 miles / 3 hours, which supports a combined Rymers-to-Eminence public route of about 21.1 miles / 9 hours.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Public endpoints",
        "value": "Rymers river mile 82 to Joshua T. Chilton Memorial Landing",
        "note": "The current NPS park brochure still lists Rymers as a river access with primitive campsites, and the current MDC Joshua T. Chilton page still confirms the Eminence take-out.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07066000 at 171 cfs / 1.89 ft",
        "note": "A same-day Water Services IV refresh returned 171 cfs and 1.89 ft at 2026-07-09 09:30 PM CDT for Jacks Fork at Eminence, the direct gauge chosen for this continuation.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07066000"
      },
      {
        "label": "Low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Eminence gauge Good beginning at 200 cfs, and the adjacent implemented Alley-Spring-to-Chilton and Bay-Creek-to-Chilton routes already use that same conservative floor. The app keeps only the 200 cfs minimum-only model here.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168"
      },
      {
        "label": "Closure check",
        "value": "No Jacks-specific endpoint closure in current park alerts JSON",
        "note": "The current Ozark National Scenic Riverways alerts feed showed active notices for Akers Ferry, campground reservations, and unrelated area closures, but no live alert naming Rymers, Bay Creek, Alley Spring, or Joshua T. Chilton Memorial Landing as closed endpoints for this route on the review date.",
        "sourceUrl": "https://www.nps.gov/ozar/park-alerts-ozar.json"
      },
      {
        "label": "Coordinate support",
        "value": "Rymers Access to Joshua T. Chilton Memorial Landing",
        "note": "This route reuses the same Rymers, Bay Creek, Alley Spring, and Joshua T. Chilton access anchors already implemented on adjacent Jacks Fork routes, keeping the endpoint interpretation consistent across the corridor.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/joshua-t-chilton-memorial-landing-eminence"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Jacks Fork estimated float times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park alerts JSON",
        "url": "https://www.nps.gov/ozar/park-alerts-ozar.json",
        "provider": "nps"
      },
      {
        "label": "MDC Joshua T. Chilton Memorial Landing",
        "url": "https://mdc.mo.gov/discover-nature/places/joshua-t-chilton-memorial-landing-eminence",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Eminence gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07066000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07066000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07066000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07066000",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "jacks-fork-river-alley-spring-chilton",
    "slug": "jacks-fork-river-alley-spring-chilton",
    "name": "Jacks Fork River",
    "reach": "Alley Spring Access to Joshua T. Chilton Memorial Landing",
    "aliases": [
      "Jacks Fork - Alley Spring to Eminence",
      "Jacks Fork - Alley to Eminence",
      "Lower Jacks Fork - Alley Spring to Chilton Landing"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Popular lower Jacks Fork day float from Alley Spring into Eminence. NPS names Alley Spring to Eminence as the classic summer float, MDC confirms the Joshua T. Chilton public landing, and the direct Eminence gauge gives a conservative low-water check.",
    "statusText": "Use the Jacks Fork at Eminence gauge. Around 200 cfs is a conservative low-water floor from MoHERP; below that, expect more shallow riffles and shorter-trip judgment. No ideal range or high cutoff is claimed, so treat high or rising water cautiously.",
    "latitude": 37.147975,
    "longitude": -91.444906,
    "gaugeSource": {
      "id": "usgs-07066000",
      "provider": "usgs",
      "siteId": "07066000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Jacks Fork at Eminence, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07066000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Rivers.MOHERP Eminence gauge rating and Alley Spring-to-Eminence trip rows",
        "url": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS says paddling is available year-round but summer is busiest, and portions of the Jacks Fork can be limited by low water. Alley Spring adds dependable water below the spring, but dry spells can still expose shallow riffles and storms can quickly change current, wood, and landing conditions.",
      "difficulty": "easy",
      "difficultyNotes": "This is a Class I lower Jacks Fork day with shoals, clear pools, bluff scenery, heavy summer boat and tube traffic, and motorboat allowances below Alley Spring. It is easier than the upper Jacks Fork, but low water, crowds, private banks near Eminence, and rising water still require judgment.",
      "confidenceNotes": "Confidence is good for a conservative minimum-only add: NPS identifies Alley Spring to Eminence as the most popular summer Jacks Fork float and lists it as a 4-hour section; MDC confirms Joshua T. Chilton Memorial Landing as a Jacks Fork river access where boats may be used; Rivers.MOHERP shows same-day May 30, 2026 Eminence-gauge conditions and exact lower-Jacks trip rows including Alley Spring-to-Eminence. Southwest Paddler supplies practical access coordinates for Alley Spring and Joshua T. Chilton. The main caveat is threshold precision: the app uses the MoHERP 200 cfs good-condition floor and does not claim an ideal range or high-water cutoff."
    },
    "evidenceNotes": [
      {
        "label": "NPS route shape",
        "value": "Alley to Eminence, 4 hr",
        "note": "NPS says the most popular summer float on the Jacks Fork is Alley Spring to Eminence and lists the estimated float time as 4 hours.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm"
      },
      {
        "label": "Public put-in",
        "value": "Alley Spring, river mile 69",
        "note": "The NPS park brochure lists Alley Spring as a Jacks Fork river access with campground, ranger station, picnic area, and hiking trails.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Public take-out",
        "value": "Joshua T. Chilton Memorial Landing",
        "note": "MDC identifies Joshua T. Chilton Memorial Landing in Eminence as a Jacks Fork River access and says boats may be used there under the cooperative-area regulations.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/joshua-t-chilton-memorial-landing-eminence"
      },
      {
        "label": "Access coordinates",
        "value": "37.147975, -91.444906 to 37.152717, -91.353486",
        "note": "Southwest Paddler publishes coordinates for Alley Spring Access and Joshua T. Chilton Memorial Landing on the Jacks Fork.",
        "sourceUrl": "https://www.southwestpaddler.com/docs/current4.html"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 07066000",
        "note": "The route uses the Jacks Fork at Eminence gauge at the take-out corridor. Rivers.MOHERP surfaced same-day May 30, 2026 Eminence-gauge conditions during review.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168"
      },
      {
        "label": "Low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Eminence gauge Good beginning at 200 cfs and lists lower-Jacks trip rows, including Alley Spring-to-Eminence at 183 cfs marked Good. The app keeps a conservative 200 cfs floor and does not claim an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168"
      },
      {
        "label": "Route character",
        "value": "Class I lower Jacks Fork",
        "note": "CurrentRiver.net maps Alley Spring to Two Rivers as 13.6 miles, places Eminence 6.3 miles below Alley Spring, and describes this lower Jacks Fork map section as Class I-II with the take-out at Eminence on river right.",
        "sourceUrl": "https://currentriver.net/jacks_fork_printmap2.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Jacks Fork River",
        "url": "https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark National Scenic Riverways park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "MDC Joshua T. Chilton Memorial Landing",
        "url": "https://mdc.mo.gov/discover-nature/places/joshua-t-chilton-memorial-landing-eminence",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Jacks Fork Eminence gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07066000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07066000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07066000/",
        "provider": "usgs"
      },
      {
        "label": "Southwest Paddler Jacks Fork River guide",
        "url": "https://www.southwestpaddler.com/docs/current4.html",
        "provider": "local"
      },
      {
        "label": "CurrentRiver.net Jacks Fork map 2",
        "url": "https://currentriver.net/jacks_fork_printmap2.htm",
        "provider": "local"
      }
    ]
  },
  {
    "id": "current-river-waymeyer-van-buren",
    "slug": "current-river-waymeyer-van-buren",
    "name": "Current River",
    "reach": "Waymeyer Access to Van Buren Riverfront Park",
    "aliases": [
      "Lower Current River - Waymeyer to Van Buren",
      "Current River - Waymeyer Landing to Van Buren",
      "Current River - Waymeyer to Van Buren Riverfront Park Access"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Lower Current River day float from Waymeyer into Van Buren. NPS lists Waymeyer to Van Buren as a standard lower-river section, MDC confirms the Van Buren Riverfront Park boat ramp, and the direct Van Buren gauge gives a conservative low-water check.",
    "statusText": "Use the Current River at Van Buren gauge. Around 700 cfs is a conservative low-water floor from MoHERP and exact-route trip evidence; below that, expect shallow shoals, slower travel, and possible dragging. No ideal range or high cutoff is claimed.",
    "latitude": 37.054302,
    "longitude": -91.055459,
    "gaugeSource": {
      "id": "usgs-07067000",
      "provider": "usgs",
      "siteId": "07067000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Current River at Van Buren, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 700,
      "thresholdSource": {
        "label": "Rivers.MOHERP Van Buren gauge rating and Waymeyer-to-Van Buren trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The lower Current is spring-fed and NPS lists the Lower Current season as year-round, but low summer levels can make shoals slow and high or rising water can trigger closures, add debris, and make crowded landings harder. Check NPS closure notices before leaving vehicles.",
      "difficulty": "easy",
      "difficultyNotes": "NPS lists Waymeyer to Van Buren as a standard 3-hour Lower Current section. It is generally an easy moving-water float at normal levels, but this lower reach can have motorboat traffic, heavy summer recreation use, slick ramps, private-bank issues near town, and stronger current after rain.",
      "confidenceNotes": "Confidence is good for a conservative minimum-only Missouri route: NPS identifies Waymeyer and Van Buren as lower Current put-in locations and lists Waymeyer to Van Buren as a 3-hour section; NPS separately says Waymeyer remains a non-commercial floater access, with crowding and erosion caveats; MDC confirms Van Buren Riverfront Park and says boats may be used there; USGS 07067000 showed same-day May 30, 2026 discharge and gage-height observations; and Rivers.MOHERP ties Van Buren-gauge ratings plus exact Waymeyer-to-Van Buren trip evidence to the selected gauge. The app uses only a 700 cfs low-water floor because the numeric threshold support is community-calibrated rather than an official manager band."
    },
    "evidenceNotes": [
      {
        "label": "NPS route shape",
        "value": "Waymeyer to Van Buren, 3 hr",
        "note": "NPS Paddle the Lower Current River lists Waymeyer to Van Buren as an estimated 3-hour lower Current float and names Waymeyer as a popular lower Current put-in.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm"
      },
      {
        "label": "Waymeyer access",
        "value": "Non-commercial floater access",
        "note": "NPS says Waymeyer access is about 10 miles north of Van Buren on State Route M and continues to serve non-commercial floaters, while noting erosion and summer-weekend crowding limits.",
        "sourceUrl": "https://home.nps.gov/ozar/learn/news/update-on-river-access-areas-at-waymeyer-chilton-boat-launch-and-pin-oak.htm"
      },
      {
        "label": "Public take-out",
        "value": "Van Buren Riverfront Park",
        "note": "MDC lists Van Buren Riverfront Park, gives directions to the riverfront access, and says boats may be used on the area under cooperative regulations. The area map identifies parking, a privy, picnic shelter, and boat ramp.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/van-buren-riverfront-park"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 07067000",
        "note": "USGS Current River at Van Buren showed same-day May 30, 2026 discharge and gage-height observations. The gauge is in the take-out town corridor for this route.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000"
      },
      {
        "label": "Low-water floor",
        "value": "700 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Van Buren gauge Good beginning at about 700 cfs and lists an exact Waymeyer-to-Van Buren trip marked Good at 707 cfs. Paddle Today uses 700 cfs as a conservative floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168"
      },
      {
        "label": "High-water closure context",
        "value": "Van Buren Bridge 5.00 ft closed level",
        "note": "The NPS Superintendent Compendium says the Current and Jacks Fork close to non-motorized vessels during flood conditions and lists Van Buren Bridge at 3.00 ft average and 5.00 ft closed level. Use this as high-water caution, not a scoring high cutoff.",
        "sourceUrl": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm"
      },
      {
        "label": "Endpoint coordinates",
        "value": "37.054302, -91.055459 to 36.9939, -91.0140",
        "note": "Paddling.com publishes coordinates for Waymeyer Access. The Van Buren coordinate is a practical ramp anchor derived from the MDC area map and riverfront street directions; use current MDC/city signs and ramp layout on arrival.",
        "sourceUrl": "https://paddling.com/paddle/locations/waymeyer-access"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle the Lower Current River",
        "url": "https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Waymeyer access update",
        "url": "https://home.nps.gov/ozar/learn/news/update-on-river-access-areas-at-waymeyer-chilton-boat-launch-and-pin-oak.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Floating in the Ozarks",
        "url": "https://home.nps.gov/ozar/planyourvisit/floating.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "MDC Van Buren Riverfront Park",
        "url": "https://mdc.mo.gov/discover-nature/places/van-buren-riverfront-park",
        "provider": "local"
      },
      {
        "label": "MDC Van Buren Riverfront Park area map",
        "url": "https://mdc.mo.gov/media/80062",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Current River Van Buren gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07067000 Current River at Van Buren",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07067000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000",
        "provider": "usgs"
      },
      {
        "label": "Paddling.com Waymeyer Access",
        "url": "https://paddling.com/paddle/locations/waymeyer-access",
        "provider": "local"
      }
    ]
  },
  {
    "id": "current-river-van-buren-big-spring",
    "slug": "current-river-van-buren-big-spring",
    "name": "Current River",
    "reach": "Van Buren Riverfront Park to Big Spring Upper River Landing",
    "aliases": [
      "Lower Current River - Van Buren to Big Spring",
      "Current River - Van Buren to Big Spring",
      "Current River - Watercress Park to Big Spring"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Short lower Current day from Van Buren to the Big Spring upper river landing. NPS lists this as a standard two-hour lower-river section, and the Van Buren USGS gauge gives a direct conservative low-water check.",
    "statusText": "Use the Current River at Van Buren gauge. Around 700 cfs is a conservative low-water floor from MoHERP and lower-Current trip evidence; below that, expect shallow shoals, slower travel, and possible dragging. No ideal range or high cutoff is claimed.",
    "latitude": 36.9939,
    "longitude": -91.014,
    "gaugeSource": {
      "id": "usgs-07067000",
      "provider": "usgs",
      "siteId": "07067000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Current River at Van Buren, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 700,
      "thresholdSource": {
        "label": "Rivers.MOHERP Van Buren gauge rating and Van-Buren-to-Big-Spring trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS lists the Lower Current season as year-round, but low summer levels can make shoals slow and scrape-prone. High or rising water can trigger closures, add debris, and make the Big Spring landing harder to judge. Check NPS closure notices before leaving vehicles.",
      "difficulty": "easy",
      "difficultyNotes": "NPS lists Van Buren to Big Spring as a two-hour lower-Current section. It is generally an easy moving-water float at normal levels, but this lower reach can have motorboat traffic, summer crowds, private-bank issues, slick landings, and stronger current after rain.",
      "confidenceNotes": "Confidence is good for a conservative minimum-only add: NPS lists Van Buren to Big Spring as a lower Current float and identifies Big Spring as a lower-river access area; the 2026 NPS compendium distinguishes Big Spring (upper) as a Current River landing while reserving Big Spring Boat Ramp (lower) for trailered boats only with no floater access; USGS 07067000 showed same-day May 31, 2026 discharge and gage-height observations; Rivers.MOHERP ties the same gauge to an exact Van-Buren-to-Big-Spring Good trip at 707 cfs; and USGS-topo-derived Big Spring River Access coordinates resolve the prior coordinate blocker. The app still uses only a 700 cfs low-water floor because the numeric threshold support is community-calibrated rather than an official manager band."
    },
    "evidenceNotes": [
      {
        "label": "NPS route shape",
        "value": "Van Buren to Big Spring, 2 hr",
        "note": "NPS Paddle the Lower Current River lists Van Buren to Big Spring as an estimated two-hour lower Current float and names Big Spring as a popular lower-Current put-in location.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm"
      },
      {
        "label": "NPS access distinction",
        "value": "Big Spring upper river landing",
        "note": "The NPS Superintendent Compendium lists Big Spring (upper) among Current River landings and separately lists Big Spring Boat Ramp (lower) as trailered boats only with no floater access.",
        "sourceUrl": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm"
      },
      {
        "label": "Park brochure context",
        "value": "Lower Current river mile 21 to 16",
        "note": "The NPS park brochure places Watercress Park in Van Buren at Lower Current river mile 21 and Big Spring at river mile 16, with Big Spring including river access, boat access, campground, picnic area, ranger station, hiking trails, and the CCC historic district.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 07067000",
        "note": "USGS Current River at Van Buren showed same-day May 31, 2026 discharge and gage-height observations, with 1,820 cfs and 3.87 ft at 06:30 CDT during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000"
      },
      {
        "label": "Low-water floor",
        "value": "700 cfs minimum-only",
        "note": "Rivers.MOHERP lists an exact Van Buren-to-Big Spring trip marked Good at 707 cfs on the Van Buren gauge. Paddle Today uses 700 cfs as a conservative floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168"
      },
      {
        "label": "Endpoint coordinates",
        "value": "36.9939, -91.0140 to 36.9475519, -90.9901267",
        "note": "The Van Buren coordinate is the existing V2 practical ramp anchor from MDC map/directions context. The Big Spring take-out uses the USGS-topo-derived Big Spring River Access point, corroborated by NPS access and compendium language; do not substitute the lower motorized-only boat ramp.",
        "sourceUrl": "https://www.anyplaceamerica.com/directory/mo/carter-county-29035/locales/big-spring-river-access-741420/"
      },
      {
        "label": "High-water closure context",
        "value": "Van Buren Bridge 5.00 ft closed level",
        "note": "The NPS Superintendent Compendium says the Current and Jacks Fork close to non-motorized vessels during flood conditions and lists Van Buren Bridge at 3.00 ft average and 5.00 ft closed level. Use this as high-water caution, not a scoring high cutoff.",
        "sourceUrl": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle the Lower Current River",
        "url": "https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Current River Van Buren gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07067000 Current River at Van Buren",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07067000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000",
        "provider": "usgs"
      },
      {
        "label": "Big Spring River Access topo coordinate",
        "url": "https://www.anyplaceamerica.com/directory/mo/carter-county-29035/locales/big-spring-river-access-741420/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "current-river-big-spring-cataract",
    "slug": "current-river-big-spring-cataract",
    "name": "Current River",
    "reach": "Big Spring Upper River Landing to Cataract Landing",
    "aliases": [
      "Lower Current River - Big Spring to Cataract",
      "Current River - Big Spring to Cataract",
      "Current River - Big Spring Upper Landing to Cataract"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Mid-length lower Current day from Big Spring to Cataract Landing. NPS lists this section at 8.8 miles and about four hours, and the Van Buren USGS gauge remains the direct conservative low-water check for the same lower-river cluster.",
    "statusText": "Use the Current River at Van Buren gauge. Around 700 cfs is the conservative low-water floor carried across this lower-Current family; below that, expect shallow shoals, slower travel, and possible scraping. No ideal range or high cutoff is claimed.",
    "latitude": 36.9475519,
    "longitude": -90.9901267,
    "gaugeSource": {
      "id": "usgs-07067000",
      "provider": "usgs",
      "siteId": "07067000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Current River at Van Buren, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 700,
      "thresholdSource": {
        "label": "Rivers.MOHERP Van Buren gauge rating and adjacent lower-Current trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS lists the Lower Current season as year-round, but low summer levels can stretch this day and make shoals scrape-prone. High or rising water can trigger closures, add debris, and make the Cataract landing harder to judge. Check NPS closure notices before leaving vehicles.",
      "difficulty": "easy",
      "difficultyNotes": "NPS lists Big Spring to Cataract as about a four-hour lower-Current section. It is generally straightforward moving water at normal levels, but lower-river motorboats, summer crowds, private-bank issues, slick landings, and stronger current after rain still matter.",
      "confidenceNotes": "Confidence is good for a conservative minimum-only add: the current NPS float-times page lists Big Spring to Cataract at 8.8 miles and 4 hours; the current park brochure confirms Big Spring as a named lower-Current access with campground and river-access context; USGS 07067000 showed same-day July 11, 2026 discharge and gage-height observations at Van Buren; and AnyplaceAmerica publishes Cataract Landing coordinates for the named lower-Current landing inside Ozark National Scenic Riverways. The app still uses only a 700 cfs low-water floor because the numeric threshold support is community-calibrated rather than an official manager band, and the Cataract coordinate remains topo-derived rather than an official NPS GIS point."
    },
    "evidenceNotes": [
      {
        "label": "NPS route shape",
        "value": "Big Spring to Cataract, 8.8 mi / 4 hr",
        "note": "The current NPS Estimated Float Times page lists Big Spring to Cataract as an 8.8-mile lower Current float that typically takes about 4 hours.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Big Spring access context",
        "value": "Big Spring lower-Current public landing",
        "note": "The current NPS park brochure places Big Spring at lower Current river mile 16 and lists river access, boat access, campground, picnic area, ranger station, and trails there.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 07067000",
        "note": "USGS Current River at Van Buren showed same-day July 11, 2026 discharge and gage-height observations, with 1,080 cfs and 3.01 ft at 12:30 CDT during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000"
      },
      {
        "label": "Low-water floor",
        "value": "700 cfs minimum-only",
        "note": "Rivers.MOHERP still supports the same conservative Van Buren floor already used on the adjacent lower-Current sections. Paddle Today keeps only the 700 cfs minimum-only floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168"
      },
      {
        "label": "Endpoint coordinates",
        "value": "36.9475519, -90.9901267 to 36.8964418, -90.9073471",
        "note": "The put-in reuses the implemented Big Spring upper landing coordinate. The take-out uses the topo-derived Cataract Landing point published by AnyplaceAmerica for the named Ozark National Scenic Riverways landing.",
        "sourceUrl": "https://www.anyplaceamerica.com/directory/mo/carter-county-29035/locales/cataract-landing-741415/"
      },
      {
        "label": "High-water closure context",
        "value": "Van Buren Bridge 5.00 ft closed level",
        "note": "The NPS Superintendent Compendium says the Current and Jacks Fork close to non-motorized vessels during flood conditions and lists Van Buren Bridge at 3.00 ft average and 5.00 ft closed level. Use this as high-water caution, not a scoring high cutoff.",
        "sourceUrl": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Estimated Float Times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Current River Van Buren gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07067000 Current River at Van Buren",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07067000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000",
        "provider": "usgs"
      },
      {
        "label": "Cataract Landing topo coordinate",
        "url": "https://www.anyplaceamerica.com/directory/mo/carter-county-29035/locales/cataract-landing-741415/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "current-river-van-buren-cataract",
    "slug": "current-river-van-buren-cataract",
    "name": "Current River",
    "reach": "Van Buren Riverfront Park to Cataract Landing",
    "aliases": [
      "Lower Current River - Van Buren to Cataract",
      "Current River - Van Buren to Cataract",
      "Current River - Watercress Park to Cataract"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Longer lower Current continuation from Van Buren to Cataract Landing. The current NPS float-times page supports this public combination at about 13.1 miles and 6 hours, and the Van Buren USGS gauge is the direct low-water check at the put-in town.",
    "statusText": "Use the Current River at Van Buren gauge. Around 700 cfs is the conservative low-water floor carried across this lower-Current family; below that, expect shallow shoals, slower travel, and a longer scrape-prone day. No ideal range or high cutoff is claimed.",
    "latitude": 36.9939,
    "longitude": -91.014,
    "gaugeSource": {
      "id": "usgs-07067000",
      "provider": "usgs",
      "siteId": "07067000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Current River at Van Buren, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 700,
      "thresholdSource": {
        "label": "Rivers.MOHERP Van Buren gauge rating and adjacent lower-Current trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS lists the Lower Current season as year-round, but low summer levels can drag this combined section out well past the nominal six-hour estimate. High or rising water can trigger closures, add debris, and make both Big Spring and Cataract landing decisions less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "The current NPS float-times page supports this route by combining Van Buren to Big Spring and Big Spring to Cataract into roughly a six-hour lower-Current day. The water itself is generally approachable at ordinary levels, but the mileage, motorboats, crowds, limited exits, and lower-river logistics make it more committed than the short split sections.",
      "confidenceNotes": "Confidence is good for a conservative minimum-only add: the current NPS float-times page lists Van Buren to Big Spring at 4.3 miles / 2 hours and Big Spring to Cataract at 8.8 miles / 4 hours, which support this public continuation at about 13.1 miles / 6 hours; the current park brochure confirms Watercress Park in Van Buren and Big Spring as named lower-Current public accesses with campground or service context; USGS 07067000 showed same-day July 11, 2026 discharge and gage-height observations at Van Buren; and AnyplaceAmerica publishes Cataract Landing coordinates for the named lower-Current landing inside Ozark National Scenic Riverways. The app still uses only a 700 cfs low-water floor because the numeric threshold support is community-calibrated rather than an official manager band, and the Cataract coordinate remains topo-derived rather than an official NPS GIS point."
    },
    "evidenceNotes": [
      {
        "label": "NPS route shape",
        "value": "Van Buren to Cataract, about 13.1 mi / 6 hr",
        "note": "The current NPS Estimated Float Times page lists Van Buren to Big Spring at 4.3 miles / 2 hours and Big Spring to Cataract at 8.8 miles / 4 hours, supporting this public continuation at about 13.1 miles and 6 hours.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Park brochure context",
        "value": "Watercress Park mile 21 to Big Spring mile 16",
        "note": "The current NPS park brochure places Watercress Park in Van Buren at lower Current river mile 21 and Big Spring at river mile 16, confirming the public lower-Current access chain that anchors this continuation.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 07067000",
        "note": "USGS Current River at Van Buren showed same-day July 11, 2026 discharge and gage-height observations, with 1,080 cfs and 3.01 ft at 12:30 CDT during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000"
      },
      {
        "label": "Low-water floor",
        "value": "700 cfs minimum-only",
        "note": "Rivers.MOHERP still supports the same conservative Van Buren floor already used on adjacent lower-Current routes. Paddle Today keeps only the 700 cfs minimum-only floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168"
      },
      {
        "label": "Endpoint coordinates",
        "value": "36.9939, -91.0140 to 36.8964418, -90.9073471",
        "note": "The Van Buren put-in reuses the existing practical public ramp anchor. The take-out uses the topo-derived Cataract Landing point published by AnyplaceAmerica for the named Ozark National Scenic Riverways landing.",
        "sourceUrl": "https://www.anyplaceamerica.com/directory/mo/carter-county-29035/locales/cataract-landing-741415/"
      },
      {
        "label": "High-water closure context",
        "value": "Van Buren Bridge 5.00 ft closed level",
        "note": "The NPS Superintendent Compendium says the Current and Jacks Fork close to non-motorized vessels during flood conditions and lists Van Buren Bridge at 3.00 ft average and 5.00 ft closed level. Use this as high-water caution, not a scoring high cutoff.",
        "sourceUrl": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Estimated Float Times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Current River Van Buren gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07067000 Current River at Van Buren",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07067000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000",
        "provider": "usgs"
      },
      {
        "label": "Cataract Landing topo coordinate",
        "url": "https://www.anyplaceamerica.com/directory/mo/carter-county-29035/locales/cataract-landing-741415/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "current-river-big-spring-gooseneck",
    "slug": "current-river-big-spring-gooseneck",
    "name": "Current River",
    "reach": "Big Spring Upper River Landing to Gooseneck / Hawes Recreation Area",
    "aliases": [
      "Lower Current River - Big Spring to Gooseneck",
      "Current River - Big Spring to Gooseneck",
      "Current River - Big Spring to Hawes"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long lower Current River day from Big Spring to Gooseneck / Hawes, ending near the Current River mouth. NPS lists this as a standard six-hour lower-river section, and the Van Buren USGS gauge gives a conservative same-river low-water check.",
    "statusText": "Use the Current River at Van Buren gauge. Around 700 cfs is the conservative low-water floor for this lower-Current cluster; below that, expect shallow shoals, slower travel, and a very long day. No ideal range or high cutoff is claimed.",
    "latitude": 36.9475519,
    "longitude": -90.9901267,
    "gaugeSource": {
      "id": "usgs-07067000",
      "provider": "usgs",
      "siteId": "07067000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Current River at Van Buren, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 700,
      "thresholdSource": {
        "label": "Rivers.MOHERP Van Buren gauge rating and Big-Spring-to-Gooseneck trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS lists the Lower Current season as year-round, but this is a long downstream leg where low summer levels can make shoals and headwinds drag out the day. High or rising water can trigger closures, add debris, and make Gooseneck harder to land cleanly. Check NPS closure notices before leaving vehicles.",
      "difficulty": "moderate",
      "difficultyNotes": "NPS lists Big Spring to Gooseneck as a six-hour lower-Current section. The water is generally approachable at ordinary levels, but the mileage, lower-river motorboat traffic, limited bailouts, private-bank issues, and end-of-river logistics make it more committed than a short easy float.",
      "confidenceNotes": "Confidence is good for a conservative minimum-only add: NPS lists Big Spring to Gooseneck as a lower Current float and the park brochure places Big Spring at lower-river mile 16 and Gooseneck / Hawes at river mile 0; Recreation.gov confirms Hawes / Gooseneck as an NPS lower-Current campground and access area; USGS 07067000 showed same-day May 31, 2026 discharge and gage-height observations during the cluster review; and Rivers.MOHERP ties the same Van Buren gauge to exact Big-Spring-to-Gooseneck Good trip evidence. The app still uses only a 700 cfs low-water floor because the numeric threshold support is community-calibrated rather than an official manager band, and the Gooseneck coordinate is USGS-topo-derived rather than an NPS GIS point."
    },
    "evidenceNotes": [
      {
        "label": "NPS route shape",
        "value": "Big Spring to Gooseneck, 6 hr",
        "note": "NPS Paddle the Lower Current River lists Big Spring to Gooseneck as an estimated six-hour lower Current float and names Gooseneck as the end of the lower Current route sequence.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm"
      },
      {
        "label": "Park brochure context",
        "value": "Lower Current river mile 16 to 0",
        "note": "The NPS park brochure places Big Spring at lower Current river mile 16 and Gooseneck / Hawes at river mile 0, with Gooseneck / Hawes marked for primitive camping, picnic area, river access, and boat access.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Gooseneck access context",
        "value": "Hawes / Gooseneck NPS campground and river access",
        "note": "Recreation.gov describes Hawes Campground as near the Current River on the lower Current, with access to the river and four primitive sites. This corroborates the NPS brochure and lower-Current route endpoint.",
        "sourceUrl": "https://www.recreation.gov/camping/poi/258899"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 07067000",
        "note": "USGS Current River at Van Buren showed same-day May 31, 2026 discharge and gage-height observations during review. The gauge is upstream of Big Spring but remains the same lower-Current gauge used by adjacent implemented routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000"
      },
      {
        "label": "Low-water floor",
        "value": "700 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Van Buren gauge Good beginning around 700 cfs and includes exact Big Spring-to-Gooseneck trip evidence marked Good at 1,190 cfs. Paddle Today uses only the conservative 700 cfs floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168"
      },
      {
        "label": "Endpoint coordinates",
        "value": "36.9475519, -90.9901267 to 36.8194989, -90.9470707",
        "note": "The Big Spring put-in uses the existing USGS-topo-derived Big Spring River Access point. The Gooseneck take-out uses the USGS-topo-derived Hawes Recreation Area point, corroborated by NPS Gooseneck / Hawes access naming and Recreation.gov campground context.",
        "sourceUrl": "https://www.anyplaceamerica.com/directory/mo/ripley-county-29181/parks/hawes-recreation-area-758920/"
      },
      {
        "label": "High-water closure context",
        "value": "Van Buren Bridge 5.00 ft closed level",
        "note": "The NPS Superintendent Compendium says the Current and Jacks Fork close to non-motorized vessels during flood conditions and lists Van Buren Bridge at 3.00 ft average and 5.00 ft closed level. Use this as high-water caution, not a scoring high cutoff.",
        "sourceUrl": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle the Lower Current River",
        "url": "https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "Recreation.gov Hawes Campground",
        "url": "https://www.recreation.gov/camping/poi/258899",
        "provider": "local"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Current River Van Buren gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07067000 Current River at Van Buren",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07067000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000",
        "provider": "usgs"
      },
      {
        "label": "Hawes Recreation Area topo coordinate",
        "url": "https://www.anyplaceamerica.com/directory/mo/ripley-county-29181/parks/hawes-recreation-area-758920/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "current-river-cataract-gooseneck",
    "slug": "current-river-cataract-gooseneck",
    "name": "Current River",
    "reach": "Cataract Landing to Gooseneck / Hawes Recreation Area",
    "aliases": [
      "Lower Current River - Cataract to Gooseneck",
      "Current River - Cataract to Gooseneck",
      "Current River - Cataract to Hawes"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Short final lower Current section from Cataract Landing to Gooseneck / Hawes. The current NPS float-times page lists this stretch at 6.2 miles and about three hours, and the Van Buren USGS gauge remains the conservative same-river low-water check for the cluster.",
    "statusText": "Use the Current River at Van Buren gauge. Around 700 cfs is the conservative low-water floor carried across this lower-Current family; below that, expect shallow shoals, slower travel, and possible scraping. No ideal range or high cutoff is claimed.",
    "latitude": 36.8964418,
    "longitude": -90.9073471,
    "gaugeSource": {
      "id": "usgs-07067000",
      "provider": "usgs",
      "siteId": "07067000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Current River at Van Buren, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 700,
      "thresholdSource": {
        "label": "Rivers.MOHERP Van Buren gauge rating and adjacent lower-Current trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS lists the Lower Current season as year-round, but low summer levels can still expose scrape-prone shoals. High or rising water can trigger closures, add debris, and make the final Gooseneck landing harder to judge. Check NPS closure notices before leaving vehicles.",
      "difficulty": "easy",
      "difficultyNotes": "The current NPS float-times page lists Cataract to Gooseneck at about three hours. It is generally approachable moving water at ordinary levels, but lower-river motorboats, summer crowds, private-bank limits, and the end-of-river setting still matter.",
      "confidenceNotes": "Confidence is good for a conservative minimum-only add: the current NPS float-times page lists Cataract to Gooseneck at 6.2 miles / 3 hours; the current park brochure confirms Gooseneck at lower Current river mile 0 with primitive camping and picnic context; USGS 07067000 showed same-day July 11, 2026 discharge and gage-height observations at Van Buren; and AnyplaceAmerica publishes Cataract Landing coordinates for the named lower-Current landing inside Ozark National Scenic Riverways. The app still uses only a 700 cfs low-water floor because the numeric threshold support is community-calibrated rather than an official manager band, the put-in coordinate remains topo-derived rather than an official NPS GIS point, and Gooseneck/Hawes naming should still be verified against signs on arrival."
    },
    "evidenceNotes": [
      {
        "label": "NPS route shape",
        "value": "Cataract to Gooseneck, 6.2 mi / 3 hr",
        "note": "The current NPS Estimated Float Times page lists Cataract to Gooseneck as a 6.2-mile lower Current float that typically takes about 3 hours.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "Gooseneck access context",
        "value": "Lower Current river mile 0 with primitive camping",
        "note": "The current NPS park brochure places Gooseneck at lower Current river mile 0 and lists a picnic area plus primitive camping area in the Lower Current District.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 07067000",
        "note": "USGS Current River at Van Buren showed same-day July 11, 2026 discharge and gage-height observations, with 1,080 cfs and 3.01 ft at 12:30 CDT during review. The gauge is upstream but remains the same lower-Current gauge used by adjacent implemented routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000"
      },
      {
        "label": "Low-water floor",
        "value": "700 cfs minimum-only",
        "note": "Rivers.MOHERP still supports the same conservative Van Buren floor already used on adjacent lower-Current routes. Paddle Today keeps only the 700 cfs minimum-only floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168"
      },
      {
        "label": "Endpoint coordinates",
        "value": "36.8964418, -90.9073471 to 36.8194989, -90.9470707",
        "note": "The put-in uses the topo-derived Cataract Landing point published by AnyplaceAmerica. The take-out reuses the implemented Gooseneck / Hawes point already used by adjacent lower-Current routes.",
        "sourceUrl": "https://www.anyplaceamerica.com/directory/mo/carter-county-29035/locales/cataract-landing-741415/"
      },
      {
        "label": "High-water closure context",
        "value": "Van Buren Bridge 5.00 ft closed level",
        "note": "The NPS Superintendent Compendium says the Current and Jacks Fork close to non-motorized vessels during flood conditions and lists Van Buren Bridge at 3.00 ft average and 5.00 ft closed level. Use this as high-water caution, not a scoring high cutoff.",
        "sourceUrl": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Estimated Float Times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Current River Van Buren gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07067000 Current River at Van Buren",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07067000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000",
        "provider": "usgs"
      },
      {
        "label": "Cataract Landing topo coordinate",
        "url": "https://www.anyplaceamerica.com/directory/mo/carter-county-29035/locales/cataract-landing-741415/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "eleven-point-river-thomasville-cane-bluff",
    "slug": "eleven-point-river-thomasville-cane-bluff",
    "name": "Eleven Point River",
    "reach": "Thomasville River Access to Cane Bluff River Access",
    "aliases": [
      "Eleven Point River - Thomasville to Cane Bluff",
      "Upper Eleven Point - Thomasville to Cane Bluff",
      "Eleven Point National Scenic River - first public reach"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Uppermost public Eleven Point day from Thomasville to Cane Bluff, with current Forest Service open-status support, a spring-favored season window, and the Bardley gauge used as a conservative same-river floor check.",
    "statusText": "Use the Eleven Point near Bardley gauge only as a conservative same-river estimate. Around 300 cfs is the floor carried from adjacent Eleven Point routes; below that, expect more scraping, walking, or short portages on this small upper river. No ideal range or high-water cutoff is claimed.",
    "latitude": 36.78548,
    "longitude": -91.528058,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "The Forest Service describes this reach as the uppermost floatable Eleven Point corridor, usually best from March through June, with some spots requiring walking or portages in drought season.",
        "This is warmer, smaller water above Greer Spring, so fresh wood, blind bends, old bridge remnants, and quick rain pulses matter more than on the lower spring-fed Eleven Point reaches.",
        "Motorized boats are not recommended on this upper reach, and Thomasville and Cane Bluff are the only named public accesses for the selected segment. Keep the shuttle conservative and do not assume private banks are available for exits or camping."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating, Thomasville-to-Cane-Bluff trip evidence, and adjacent upper-Eleven route practice",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6
      ],
      "seasonNotes": "The current Forest Service Thomasville page says this section can usually be floated March through June. In summer drought it can require walking or portages, while rain can quickly raise the river and change wood or bridge-remnant hazards.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a small upper-river Ozark float with Class I-II character, shallow riffles, blind bends, occasional walking or portaging in low water, and a more remote shuttle than the spring-fed downstream Eleven Point routes.",
      "confidenceNotes": "Confidence is acceptable but intentionally conservative: the current Forest Service Thomasville page now shows Site Open, publishes coordinates, and explicitly describes Thomasville to Cane Bluff as a 9.3-mile float that usually works March through June; the current Cane Bluff page confirms the take-out as the first public access below Thomasville with published coordinates and dispersed-camping context; USGS 07071500 returned same-day official values during this run; and Rivers.MOHERP has an exact Thomasville-to-Cane-Bluff row marked Good at 1930 cfs / 4.70 ft. Because the strongest numeric support is community-derived and the Bardley gauge sits well downstream, the app uses only the existing conservative 300 cfs minimum-only floor from adjacent upper-Eleven routes and does not infer an ideal range or high cutoff."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Thomasville to Cane Bluff, 9.3 miles",
        "note": "The current Forest Service Thomasville River Access page says Thomasville to Cane Bluff is a 9.3-mile float and describes it as the first opportunity to access the Eleven Point National Scenic River.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/thomasville-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Thomasville River Access, Site Open",
        "note": "The current Forest Service Thomasville page marks the site open, says the State Highway 99 bridge is the put-in, publishes coordinates 36.78548, -91.528058, and notes vault toilets.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/thomasville-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Cane Bluff River Access, first public access below Thomasville",
        "note": "The current Forest Service Cane Bluff page marks the site open, publishes coordinates 36.796246, -91.405675, and describes Cane Bluff as the first public access downriver from Thomasville.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/cane-bluff-river-access"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 628 cfs / 2.87 ft",
        "note": "A same-day Water Services IV refresh returned 628 cfs and 2.87 ft at 2026-06-22 08:30 CDT for Eleven Point River near Bardley, the same direct same-river gauge already used by adjacent Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Conservative floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs and includes an exact Thomasville-to-Cane-Bluff row marked Good at about 1930 cfs / 4.70 ft. Because the gauge is downstream and the exact route lacks a fuller low-water ladder, the app keeps only the conservative 300 cfs floor already used on adjacent upper Eleven Point routes.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Upper-river character",
        "value": "Usually March through June, some walking or portages, Class I-II",
        "note": "The current Forest Service Thomasville page says this section can usually be floated March through June, that some spots require walking or portages in drought season, and that the rapids are generally Class I-II.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/thomasville-river-access"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Thomasville River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/thomasville-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Cane Bluff River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/cane-bluff-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-thomasville-greer-crossing",
    "slug": "eleven-point-river-thomasville-greer-crossing",
    "name": "Eleven Point River",
    "reach": "Thomasville River Access to Greer Crossing Recreation Area",
    "aliases": [
      "Eleven Point River - Thomasville to Greer",
      "Upper Eleven Point - Thomasville to Greer Crossing",
      "Eleven Point National Scenic River - Thomasville to Greer"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long upper Eleven Point continuation from Thomasville to Greer Crossing, using official Forest Service public access at both ends and the Bardley gauge only as a conservative same-river floor check for the smaller upper miles.",
    "statusText": "Use the Eleven Point near Bardley gauge only as a conservative same-river estimate. Around 300 cfs remains the floor carried from adjacent Eleven Point routes; below that, expect scraping, walking, or short portages on the smaller upper river before Greer Spring boosts the flow. No ideal range or high-water cutoff is claimed.",
    "latitude": 36.78548,
    "longitude": -91.528058,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "cold_water",
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "The Forest Service says this Thomasville section is usually best from March through June and can require walking or portages in drought season, so treat the upper miles as smaller, shallower water than the downstream gauge alone suggests.",
        "Greer Spring enters just above the take-out and changes the character of the finish with colder, faster water. Old bridge remnants, fresh wood, blind bends, and rapid rises after rain all deserve extra margin on a long day.",
        "Use only the named Forest Service accesses and planned legal camps. The Bardley gauge is downstream, and private banks or informal gravel bars are not substitutes for Thomasville or Greer Crossing."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and adjacent upper Eleven Point trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6
      ],
      "seasonNotes": "The current Forest Service Thomasville page says this upper section is usually floated March through June and can require walking or portages in drought season. Greer Spring improves the lower end of the route, but the Bardley gauge remains a conservative downstream estimate rather than a perfect on-reach reading for the Thomasville half.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a very long upper-river Ozark continuation with Class I-II character, shallow riffles, possible short portages, blind bends, old bridge remnants, and a colder spring-fed finish near Greer Crossing.",
      "confidenceNotes": "Confidence is acceptable but intentionally conservative: the current Forest Service Thomasville page still shows Site Open, still names Thomasville to Greer as a 16.6-mile float, and still says the section usually works March through June; the current Greer Crossing page confirms the public take-out and campground support; the Eleven Point National Wild and Scenic River page still places Greer at mile 16.6 from Thomasville; same-day USGS Water Services returned 483 cfs and 2.60 ft at 2026-07-13 08:30 CDT for direct same-river gauge 07071500; and Rivers.MOHERP still rates Bardley Good beginning at 300 cfs. Because the best numeric support remains community-calibrated and the gauge is downstream of Greer Spring, the app keeps only the conservative 300 cfs minimum-only floor already used on adjacent upper Eleven Point routes."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Thomasville to Greer, 16.6 miles",
        "note": "The current Forest Service Thomasville River Access page says Thomasville to Greer Access is a 16.6-mile float, and the Eleven Point National Wild and Scenic River page places Greer Crossing at mile 16.6 from Thomasville.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/thomasville-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Thomasville River Access, Site Open",
        "note": "The current Forest Service Thomasville page marks the site open, identifies the State Highway 99 bridge as the put-in, publishes coordinates 36.78548, -91.528058, and notes vault toilets.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/thomasville-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Greer Crossing Recreation Area",
        "note": "The current Forest Service Greer Crossing page describes a campground, boat launch, and day-use area at the take-out and publishes coordinates 36.79356389, -91.32854167.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 483 cfs / 2.60 ft",
        "note": "Same-day USGS Water Services returned 483 cfs and 2.60 ft at 2026-07-13 08:30 CDT for Eleven Point River near Bardley, the direct same-river gauge already used by adjacent Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Conservative floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP still rates the Bardley gauge Good beginning at 300 cfs. Paddle Today keeps only that conservative floor and does not infer an ideal range or upper cutoff for this upstream continuation.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Upper-river character",
        "value": "Usually March through June, Class I-II, walking or portages possible",
        "note": "The current Forest Service Thomasville page says this section usually works March through June, can require walking or portages in drought season, and has Class I-II rapids.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/thomasville-river-access"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Thomasville River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/thomasville-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Greer Crossing Recreation Area",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-thomasville-turner-mill-south",
    "slug": "eleven-point-river-thomasville-turner-mill-south",
    "name": "Eleven Point River",
    "reach": "Thomasville River Access to Turner Mill South River Access",
    "aliases": [
      "Eleven Point River - Thomasville to Turner Mill South",
      "Upper Eleven Point - Thomasville to Turner Mill",
      "Eleven Point National Scenic River - Thomasville to Turner"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Very long upper-to-mid Eleven Point continuation from Thomasville to Turner Mill South, linking the smaller upper river with the colder spring-fed trout water below Greer Spring.",
    "statusText": "Use the Eleven Point near Bardley gauge only as a conservative same-river estimate. Around 300 cfs remains the floor carried from adjacent Eleven Point routes; below that, expect more scraping, walking, or short portages on the upper river even if the Greer-to-Turner half still looks more dependable. No ideal range or high-water cutoff is claimed.",
    "latitude": 36.78548,
    "longitude": -91.528058,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "cold_water",
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "The Thomasville half is still the smaller upper Eleven Point, so the downstream Bardley gauge can overstate how easy the first miles will feel near the 300 cfs floor.",
        "This route then passes into colder spring-fed water below Greer Spring, where Mary Decker Shoal, fresh wood, blind bends, and long distances between developed exits matter more than on a short split route.",
        "Use only the named Forest Service accesses and legal float camps. Turner Mill North and Turner Mill South are separate landings, and private banks are not a substitute for a staged overnight or planned finish."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and adjacent upper-to-mid Eleven Point trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "This route starts on the uppermost spring-favored Eleven Point section and finishes on the more dependable Greer Spring-supported trout water to Turner Mill South. The Bardley gauge remains a conservative downstream estimate rather than a perfect on-reach reading for the upper half.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a very long Ozark continuation with upper-river shallows, Class I-II character, occasional walking or portaging in low water, then colder spring-fed shoals and long rural shuttle logistics below Greer Spring.",
      "confidenceNotes": "Confidence is acceptable but intentionally conservative: the current Forest Service Thomasville page still shows Site Open, still says the reach is usually floated March through June, and still names Thomasville to Greer as a 16.6-mile float; the Eleven Point National Wild and Scenic River page still places Turner Mill at mile 21.5 from Thomasville; the current Turner Mill South page confirms the public take-out with coordinates and limited campsite context; same-day USGS Water Services returned 483 cfs and 2.60 ft at 2026-07-13 08:30 CDT for direct same-river gauge 07071500; and Rivers.MOHERP still rates Bardley Good beginning at 300 cfs. Because the strongest numeric support remains community-calibrated and much of the route sits upstream of the gauge, the app keeps only the conservative 300 cfs minimum-only floor already used on adjacent Eleven Point routes."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Thomasville to Turner Mill South, about 21.5 river miles",
        "note": "The Eleven Point National Wild and Scenic River page places Turner Mill at mile 21.5 from Thomasville, and the current Turner Mill South page says the access sits 4.9 miles downriver of Greer Crossing.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Thomasville River Access, Site Open",
        "note": "The current Forest Service Thomasville page marks the site open, identifies the State Highway 99 bridge as the put-in, publishes coordinates 36.78548, -91.528058, and notes vault toilets.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/thomasville-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Turner Mill South River Access",
        "note": "The current Forest Service Turner Mill South page says the access is on river right with limited dispersed campsites, a single-lane concrete boat launch, toilet facilities, and coordinates 36.76456, -91.26653037.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 483 cfs / 2.60 ft",
        "note": "Same-day USGS Water Services returned 483 cfs and 2.60 ft at 2026-07-13 08:30 CDT for Eleven Point River near Bardley, the direct same-river gauge already used by adjacent Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Conservative floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP still rates the Bardley gauge Good beginning at 300 cfs. Paddle Today keeps only that conservative floor and does not infer an ideal range or upper cutoff for this longer continuation.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Upper-river shallows to spring-fed shoals",
        "note": "The current Forest Service Thomasville page says the route can require walking or portages in drought season, while Turner Mill South marks the colder spring-fed section below Greer Crossing and Mary Decker Shoal.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/thomasville-river-access"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Thomasville River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/thomasville-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Greer Crossing Recreation Area",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area",
        "provider": "local"
      },
      {
        "label": "Forest Service Turner Mill South River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-thomasville-whitten",
    "slug": "eleven-point-river-thomasville-whitten",
    "name": "Eleven Point River",
    "reach": "Thomasville River Access to Whitten River Access",
    "aliases": [
      "Eleven Point River - Thomasville to Whitten",
      "Upper Eleven Point - Thomasville to Whitten",
      "Eleven Point National Scenic River - Thomasville to Whitten"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Full upper-to-lower Eleven Point continuation from Thomasville to Whitten, combining the smaller upper river with the longer cold-water trout corridor downstream of Greer Spring.",
    "statusText": "Use the Eleven Point near Bardley gauge only as a conservative same-river estimate. Around 300 cfs remains the floor carried from adjacent Eleven Point routes; below that, expect scrape-prone upper miles even if the lower Whitten half still looks more comfortable. No ideal range or high-water cutoff is claimed.",
    "latitude": 36.78548,
    "longitude": -91.528058,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "cold_water",
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This is a very long continuation that starts on the smaller upper Eleven Point, where the Bardley gauge can overstate how easy the first miles will feel near the 300 cfs floor.",
        "Below Greer Spring the river gets colder and more forceful, with Mary Decker Shoal, fresh wood risk after rain, blind bends, and long spacing between developed exits before Whitten.",
        "Treat this as an overnight-capable route, not a casual one-day add-on. Use only the named Forest Service accesses and legal float camps instead of improvising stops on private banks or undesignated gravel bars."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and adjacent upper-to-lower Eleven Point trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "This route starts on the spring-favored upper Eleven Point where drought can force walking or portages, then finishes on the colder, more dependable trout water below Greer Spring. The Bardley gauge remains a conservative downstream estimate rather than a perfect on-reach reading for the upper half.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a very long Ozark continuation with Class I-II upper-river character, possible low-water walking or portages, then a long cold-water lower half with shoals, wind exposure, and limited easy exits before Whitten.",
      "confidenceNotes": "Confidence is acceptable but intentionally conservative: the current Forest Service Thomasville page still shows Site Open, still says the route is usually floated March through June, and still names Thomasville to Greer as a 16.6-mile float; the Eleven Point National Wild and Scenic River page still places Whitten at mile 27.6 from Thomasville; the current Whitten page confirms the public take-out with ramp details and coordinates; same-day USGS Water Services returned 483 cfs and 2.60 ft at 2026-07-13 08:30 CDT for direct same-river gauge 07071500; and Rivers.MOHERP still rates Bardley Good beginning at 300 cfs. Because the strongest numeric support remains community-calibrated and much of the route sits upstream of the gauge, the app keeps only the conservative 300 cfs minimum-only floor already used on adjacent Eleven Point routes."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Thomasville to Whitten, about 27.6 river miles",
        "note": "The Eleven Point National Wild and Scenic River page places Whitten at mile 27.6 from Thomasville, and the current Whitten page still names the 11-mile Greer-to-Whitten float that anchors the lower half of this continuation.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river"
      },
      {
        "label": "Public put-in",
        "value": "Thomasville River Access, Site Open",
        "note": "The current Forest Service Thomasville page marks the site open, identifies the State Highway 99 bridge as the put-in, publishes coordinates 36.78548, -91.528058, and notes vault toilets.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/thomasville-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Whitten River Access",
        "note": "The current Forest Service Whitten page says the access is on the right bank with a vault toilet, single-lane concrete boat ramp, trailer parking, and coordinates 36.732356, -91.214837.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 483 cfs / 2.60 ft",
        "note": "Same-day USGS Water Services returned 483 cfs and 2.60 ft at 2026-07-13 08:30 CDT for Eleven Point River near Bardley, the direct same-river gauge already used by adjacent Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Conservative floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP still rates the Bardley gauge Good beginning at 300 cfs. Paddle Today keeps only that conservative floor and does not infer an ideal range or upper cutoff for this long continuation.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Upper-river shallows into cold-water trout corridor",
        "note": "The current Forest Service Thomasville page says the upper miles can require walking or portages in drought season, while the current Whitten page still names the popular 11-mile Greer-to-Whitten float in the colder lower corridor.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Thomasville River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/thomasville-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Greer Crossing Recreation Area",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area",
        "provider": "local"
      },
      {
        "label": "Forest Service Turner Mill South River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Whitten River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "current-river-waymeyer-big-spring",
    "slug": "current-river-waymeyer-big-spring",
    "name": "Current River",
    "reach": "Waymeyer Access to Big Spring Upper River Landing",
    "aliases": [
      "Lower Current River - Waymeyer to Big Spring",
      "Current River - Waymeyer to Big Spring",
      "Current River - Waymeyer to Big Spring Upper Landing"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Combined lower Current River day from Waymeyer to the Big Spring upper river landing. Current NPS mileage and float-time guidance support the section, and the direct Van Buren gauge gives a conservative low-water check.",
    "statusText": "Use the Current River at Van Buren gauge. Around 700 cfs is a conservative low-water floor for this lower-Current cluster; below that, expect shallow shoals, slower travel, and more dragging risk over a longer day. No ideal range or high cutoff is claimed.",
    "latitude": 37.054302,
    "longitude": -91.055459,
    "gaugeSource": {
      "id": "usgs-07067000",
      "provider": "usgs",
      "siteId": "07067000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Current River at Van Buren, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 700,
      "thresholdSource": {
        "label": "Rivers.MOHERP Van Buren gauge rating and lower-Current trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS lists the Lower Current season as year-round, but this longer spring-fed reach can still get scrape-prone at low summer water and can close or become debris-heavy in flood conditions. Check NPS closure notices before leaving vehicles.",
      "difficulty": "easy",
      "difficultyNotes": "NPS lower-Current guidance supports this combined Waymeyer-to-Big-Spring route as an approachable moving-water float at normal levels, but the longer mileage, motorboat traffic, private-bank issues, slick landings, and stronger current after rain make it more committing than the short split sections.",
      "confidenceNotes": "Confidence is good for a conservative minimum-only add: current NPS float-time guidance lists Waymeyer to Raftyard at 1.7 miles / 0.5 hour, Raftyard to Van Buren at 4.8 miles / 2 hours, and Van Buren to Big Spring at 4.3 miles / 2 hours, which together define an about 10.8-mile public lower-Current route from Waymeyer to the Big Spring upper landing. NPS also separately identifies Waymeyer as a lower-river access, distinguishes Big Spring upper from the lower motorized-only boat ramp, and keeps the lower Current on designated public access use. Same-day USGS Water Services returned 1,080 cfs and 3.01 ft at 2026-07-11 00:30 CDT for direct gauge 07067000 at Van Buren. Paddle Today keeps the same conservative 700 cfs minimum-only floor already used on the adjacent lower-Current routes because the numeric support is still community-calibrated rather than an official manager band."
    },
    "evidenceNotes": [
      {
        "label": "NPS route shape",
        "value": "Waymeyer to Big Spring, about 10.8 mi",
        "note": "Current NPS float-times guidance lists Waymeyer to Raftyard at 1.7 miles, Raftyard to Van Buren at 4.8 miles, and Van Buren to Big Spring at 4.3 miles, which combine into an about 10.8-mile public lower Current route.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "NPS timing support",
        "value": "About 5 hr total",
        "note": "NPS lower-Current guidance lists Waymeyer to Van Buren at about 3 hours and Van Buren to Big Spring at about 2 hours, supporting a full lower-river day rather than a short out-and-back.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm"
      },
      {
        "label": "Public endpoints",
        "value": "Waymeyer and Big Spring upper landing",
        "note": "NPS says Waymeyer remains a non-commercial floater access, and the park brochure plus compendium distinguish Big Spring upper as the Current River landing while reserving the lower boat ramp for trailered boats only.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 07067000 at 1,080 cfs / 3.01 ft",
        "note": "Same-day USGS Water Services returned 1,080 cfs and 3.01 ft at 2026-07-11 00:30 CDT for Current River at Van Buren, the direct same-river gauge already used on the adjacent lower Current routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000"
      },
      {
        "label": "Low-water floor",
        "value": "700 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Van Buren gauge Good beginning around 700 cfs and provides route-family lower Current trip evidence. Paddle Today keeps only the conservative 700 cfs floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168"
      },
      {
        "label": "Camping context",
        "value": "Big Spring campground and day-use area",
        "note": "The NPS park brochure lists Big Spring with campground, picnic, ranger-station, and river-access context, so the route can finish at a campground-supported landing even though private-bank camping should not be assumed en route.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Endpoint coordinates",
        "value": "37.054302, -91.055459 to 36.9475519, -90.9901267",
        "note": "Waymeyer uses the existing published paddling-access coordinate and Big Spring uses the existing USGS-topo-derived upper river access point already accepted for the adjacent lower Current route. Do not substitute the lower motorized-only ramp.",
        "sourceUrl": "https://paddling.com/paddle/locations/waymeyer-access"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Ozark float times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle the Lower Current River",
        "url": "https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Waymeyer access update",
        "url": "https://home.nps.gov/ozar/learn/news/update-on-river-access-areas-at-waymeyer-chilton-boat-launch-and-pin-oak.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Current River Van Buren gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07067000 Current River at Van Buren",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/",
        "provider": "usgs"
      },
      {
        "label": "Paddling.com Waymeyer Access",
        "url": "https://paddling.com/paddle/locations/waymeyer-access",
        "provider": "local"
      },
      {
        "label": "Big Spring River Access topo coordinate",
        "url": "https://www.anyplaceamerica.com/directory/mo/carter-county-29035/locales/big-spring-river-access-741420/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "current-river-waymeyer-cataract",
    "slug": "current-river-waymeyer-cataract",
    "name": "Current River",
    "reach": "Waymeyer Access to Cataract Landing",
    "aliases": [
      "Lower Current River - Waymeyer to Cataract",
      "Current River - Waymeyer to Cataract",
      "Current River - Waymeyer to Cataract Landing"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long lower Current River day from Waymeyer to Cataract. Current NPS mileage and float-time guidance support the section, and the direct Van Buren gauge gives a conservative low-water check.",
    "statusText": "Use the Current River at Van Buren gauge. Around 700 cfs is the conservative low-water floor for this lower-Current cluster; below that, expect shallow shoals, slower travel, and more dragging over a long day. No ideal range or high cutoff is claimed.",
    "latitude": 37.054302,
    "longitude": -91.055459,
    "gaugeSource": {
      "id": "usgs-07067000",
      "provider": "usgs",
      "siteId": "07067000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Current River at Van Buren, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 700,
      "thresholdSource": {
        "label": "Rivers.MOHERP Van Buren gauge rating and lower-Current trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS lists the Lower Current season as year-round, but this longer spring-fed reach can still get scrape-prone at low summer water and can close or become debris-heavy in flood conditions. Check NPS closure notices before leaving vehicles.",
      "difficulty": "moderate",
      "difficultyNotes": "NPS lower-Current guidance supports this combined Waymeyer-to-Cataract route as approachable moving water at normal levels, but the 19.6-mile shape, motorboat traffic, private-bank issues, slick landings, and stronger current after rain make it a more committed day than the short split sections.",
      "confidenceNotes": "Confidence is good for a conservative minimum-only add: current NPS float-times guidance lists Waymeyer to Raftyard at 1.7 miles / 0.5 hour, Raftyard to Van Buren at 4.8 miles / 2 hours, Van Buren to Big Spring at 4.3 miles / 2 hours, and Big Spring to Cataract at 8.8 miles / 4 hours, which together define an about 19.6-mile public lower-Current route from Waymeyer to Cataract. NPS also separately identifies Waymeyer as a lower-river access, lists Cataract as the downstream public landing, and keeps the lower Current on designated public access use. Same-day USGS Water Services returned 1,020 cfs and 2.92 ft at 2026-07-13 23:30 CDT for direct gauge 07067000 at Van Buren. Paddle Today keeps the same conservative 700 cfs minimum-only floor already used on the adjacent lower-Current routes because the numeric support is still community-calibrated rather than an official manager band."
    },
    "evidenceNotes": [
      {
        "label": "NPS route shape",
        "value": "Waymeyer to Cataract, about 19.6 mi",
        "note": "Current NPS float-times guidance lists Waymeyer to Raftyard at 1.7 miles, Raftyard to Van Buren at 4.8 miles, Van Buren to Big Spring at 4.3 miles, and Big Spring to Cataract at 8.8 miles, which combine into an about 19.6-mile public lower Current route.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "NPS timing support",
        "value": "About 8.5 to 9 hr total",
        "note": "NPS lower-Current guidance lists Waymeyer to Van Buren at about 3 hours, Van Buren to Big Spring at about 2 hours, and Big Spring to Cataract at about 4 hours, supporting a long committed lower-river day.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm"
      },
      {
        "label": "Public endpoints",
        "value": "Waymeyer and Cataract Landing",
        "note": "NPS says Waymeyer remains a non-commercial floater access, and current float-times guidance plus the park brochure keep Cataract as a named downstream public landing on the lower Current.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 07067000 at 1,020 cfs / 2.92 ft",
        "note": "Same-day USGS Water Services returned 1,020 cfs and 2.92 ft at 2026-07-13 23:30 CDT for Current River at Van Buren, the direct same-river gauge already used on the adjacent lower Current routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000"
      },
      {
        "label": "Low-water floor",
        "value": "700 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Van Buren gauge Good beginning around 700 cfs and provides route-family lower Current trip evidence. Paddle Today keeps only the conservative 700 cfs floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168"
      },
      {
        "label": "Camping context",
        "value": "Big Spring campground on the corridor",
        "note": "The NPS park brochure lists Big Spring with campground, picnic, ranger-station, and river-access context, so this longer route still has a formal campground stop on the corridor even though the finish is farther downstream.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Endpoint coordinates",
        "value": "37.054302, -91.055459 to 36.8964418, -90.9073471",
        "note": "Waymeyer uses the existing published paddling-access coordinate and Cataract uses the existing topo-derived public landing point already accepted for the adjacent lower Current route family.",
        "sourceUrl": "https://www.anyplaceamerica.com/directory/mo/carter-county-29035/locales/cataract-landing-741377/"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Ozark float times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle the Lower Current River",
        "url": "https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Waymeyer access update",
        "url": "https://home.nps.gov/ozar/learn/news/update-on-river-access-areas-at-waymeyer-chilton-boat-launch-and-pin-oak.htm",
        "provider": "nps"
      },
      {
        "label": "Rivers.MOHERP Current River Van Buren gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07067000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/",
        "provider": "usgs"
      },
      {
        "label": "Paddling.com Waymeyer Access",
        "url": "https://paddling.com/paddle/locations/waymeyer-access",
        "provider": "local"
      },
      {
        "label": "AnyPlaceAmerica Cataract Landing",
        "url": "https://www.anyplaceamerica.com/directory/mo/carter-county-29035/locales/cataract-landing-741377/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "current-river-van-buren-gooseneck",
    "slug": "current-river-van-buren-gooseneck",
    "name": "Current River",
    "reach": "Van Buren Riverfront Park to Gooseneck / Hawes Recreation Area",
    "aliases": [
      "Lower Current River - Van Buren to Gooseneck",
      "Current River - Van Buren to Gooseneck",
      "Current River - Van Buren to Hawes"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long lower Current River day from Van Buren to Gooseneck / Hawes near the river mouth. Current NPS mileage and float-time guidance support the section, and the direct Van Buren gauge gives a conservative low-water check.",
    "statusText": "Use the Current River at Van Buren gauge. Around 700 cfs is the conservative low-water floor for this lower-Current cluster; below that, expect shallow shoals, slower travel, and a very long day. No ideal range or high cutoff is claimed.",
    "latitude": 36.9939,
    "longitude": -91.014,
    "gaugeSource": {
      "id": "usgs-07067000",
      "provider": "usgs",
      "siteId": "07067000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Current River at Van Buren, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 700,
      "thresholdSource": {
        "label": "Rivers.MOHERP Van Buren gauge rating and lower-Current trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS lists the Lower Current season as year-round, but this long downstream route gets much slower at low water and more consequential in flood conditions. Check NPS closure notices before leaving vehicles.",
      "difficulty": "moderate",
      "difficultyNotes": "NPS lower-Current guidance supports this route as approachable moving water at ordinary levels, but the 19-plus-mile shape, motorboat traffic, long pools, limited exits, private-bank issues, and end-of-river shuttle make it more committed than a short easy float.",
      "confidenceNotes": "Confidence is good for a conservative minimum-only add: current NPS float-times guidance lists Van Buren to Big Spring at 4.3 miles / 2 hours, Big Spring to Cataract at 8.8 miles / 4 hours, and Cataract to Gooseneck at 6.2 miles / 3 hours, which together define an about 19.3-mile public lower-Current route to Gooseneck / Hawes. The NPS brochure still confirms Van Buren / Watercress Park, Big Spring, and Gooseneck / Hawes as named public accesses, with Hawes / Gooseneck also carrying primitive-camping context. Same-day USGS Water Services returned 1,080 cfs and 3.01 ft at 2026-07-11 00:30 CDT for direct gauge 07067000 at Van Buren. Paddle Today keeps only the existing conservative 700 cfs minimum-only floor because the numeric support remains community-calibrated rather than an official manager band."
    },
    "evidenceNotes": [
      {
        "label": "NPS route shape",
        "value": "Van Buren to Gooseneck, about 19.3 mi",
        "note": "Current NPS float-times guidance lists Van Buren to Big Spring at 4.3 miles, Big Spring to Cataract at 8.8 miles, and Cataract to Gooseneck at 6.2 miles, which combine into an about 19.3-mile public lower Current route.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "NPS timing support",
        "value": "About 8 hr total",
        "note": "NPS lower-Current guidance lists Van Buren to Gooseneck as an about 8-hour route, matching the long committed day shape used here.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm"
      },
      {
        "label": "Public endpoints",
        "value": "Van Buren Riverfront Park to Gooseneck / Hawes",
        "note": "MDC still confirms Van Buren Riverfront Park as a public launch, while the NPS brochure and Recreation.gov keep Gooseneck / Hawes as a named lower Current camping and river-access area.",
        "sourceUrl": "https://www.recreation.gov/camping/poi/258899"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 07067000 at 1,080 cfs / 3.01 ft",
        "note": "Same-day USGS Water Services returned 1,080 cfs and 3.01 ft at 2026-07-11 00:30 CDT for Current River at Van Buren, the direct same-river gauge already used on the adjacent lower Current routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000"
      },
      {
        "label": "Low-water floor",
        "value": "700 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Van Buren gauge Good beginning around 700 cfs and provides lower-Current trip evidence including the downstream Big-Spring-to-Gooseneck section. Paddle Today keeps only the conservative 700 cfs floor.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168"
      },
      {
        "label": "Camping context",
        "value": "Primitive camping at Gooseneck / Hawes",
        "note": "The NPS brochure marks Gooseneck / Hawes for primitive camping, picnic, river access, and boat access, and Recreation.gov corroborates Hawes Campground as a lower Current primitive-camping area.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Endpoint coordinates",
        "value": "36.9939, -91.0140 to 36.8194989, -90.9470707",
        "note": "Van Buren uses the existing practical ramp anchor from MDC context, and Gooseneck uses the existing USGS-topo-derived Hawes Recreation Area point already accepted on the adjacent lower Current route. Confirm the signed river landing on arrival.",
        "sourceUrl": "https://www.anyplaceamerica.com/directory/mo/ripley-county-29181/parks/hawes-recreation-area-758920/"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Ozark float times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle the Lower Current River",
        "url": "https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "MDC Van Buren Riverfront Park",
        "url": "https://mdc.mo.gov/discover-nature/places/van-buren-riverfront-park",
        "provider": "local"
      },
      {
        "label": "Recreation.gov Hawes Campground",
        "url": "https://www.recreation.gov/camping/poi/258899",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Current River Van Buren gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07067000 Current River at Van Buren",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/",
        "provider": "usgs"
      },
      {
        "label": "Hawes Recreation Area topo coordinate",
        "url": "https://www.anyplaceamerica.com/directory/mo/ripley-county-29181/parks/hawes-recreation-area-758920/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "current-river-waymeyer-gooseneck",
    "slug": "current-river-waymeyer-gooseneck",
    "name": "Current River",
    "reach": "Waymeyer Access to Gooseneck / Hawes Recreation Area",
    "aliases": [
      "Lower Current River - Waymeyer to Gooseneck",
      "Current River - Waymeyer to Gooseneck",
      "Current River - Waymeyer to Hawes"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Full lower Current River continuation from Waymeyer to Gooseneck / Hawes near the river mouth. Current NPS mileage and float-time guidance support the section, and the direct Van Buren gauge gives a conservative low-water check.",
    "statusText": "Use the Current River at Van Buren gauge. Around 700 cfs is the conservative low-water floor for this lower-Current cluster; below that, expect shallow shoals, slower travel, and a very long day or overnight plan. No ideal range or high cutoff is claimed.",
    "latitude": 37.054302,
    "longitude": -91.055459,
    "gaugeSource": {
      "id": "usgs-07067000",
      "provider": "usgs",
      "siteId": "07067000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Current River at Van Buren, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 700,
      "thresholdSource": {
        "label": "Rivers.MOHERP Van Buren gauge rating and lower-Current trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "NPS lists the Lower Current season as year-round, but this full continuation is long enough that low summer water, heat, headwinds, and crowded landings can turn it into an overnight or very slow day. High or rising water can trigger closures and make the take-outs harder to judge.",
      "difficulty": "moderate",
      "difficultyNotes": "The water itself is generally approachable at ordinary lower-Current levels, but the 25-plus-mile shape, motorboat traffic, private-bank issues, few easy exits, and end-of-river logistics make this a committed route that exceeds a casual short float.",
      "confidenceNotes": "Confidence is good for a conservative minimum-only add: current NPS float-times guidance lists Waymeyer to Raftyard at 1.7 miles / 0.5 hour, Raftyard to Van Buren at 4.8 miles / 2 hours, Van Buren to Big Spring at 4.3 miles / 2 hours, Big Spring to Cataract at 8.8 miles / 4 hours, and Cataract to Gooseneck at 6.2 miles / 3 hours, which together define an about 25.8-mile public lower-Current continuation from Waymeyer to Gooseneck / Hawes. NPS and Recreation.gov still support the access chain and primitive-camping context at the downstream finish. Same-day USGS Water Services returned 1,080 cfs and 3.01 ft at 2026-07-11 00:30 CDT for direct gauge 07067000 at Van Buren. Paddle Today keeps only the existing conservative 700 cfs minimum-only floor because the numeric support remains community-calibrated rather than an official manager band."
    },
    "evidenceNotes": [
      {
        "label": "NPS route shape",
        "value": "Waymeyer to Gooseneck, about 25.8 mi",
        "note": "Current NPS float-times guidance lists Waymeyer to Raftyard at 1.7 miles, Raftyard to Van Buren at 4.8 miles, Van Buren to Big Spring at 4.3 miles, Big Spring to Cataract at 8.8 miles, and Cataract to Gooseneck at 6.2 miles, which combine into an about 25.8-mile public lower Current continuation.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm"
      },
      {
        "label": "NPS timing support",
        "value": "About 11 hr total",
        "note": "NPS lower-Current guidance lists Waymeyer to Van Buren at about 3 hours and Van Buren to Gooseneck at about 8 hours, supporting a very long full-continuation route rather than a casual short float.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm"
      },
      {
        "label": "Public endpoints",
        "value": "Waymeyer to Gooseneck / Hawes",
        "note": "NPS still supports Waymeyer as a lower-Current floater access, and the park brochure plus Recreation.gov keep Gooseneck / Hawes as a named public lower-Current access with primitive camping context.",
        "sourceUrl": "https://www.recreation.gov/camping/poi/258899"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 07067000 at 1,080 cfs / 3.01 ft",
        "note": "Same-day USGS Water Services returned 1,080 cfs and 3.01 ft at 2026-07-11 00:30 CDT for Current River at Van Buren, the direct same-river gauge already used on the adjacent lower Current routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07067000"
      },
      {
        "label": "Low-water floor",
        "value": "700 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Van Buren gauge Good beginning around 700 cfs and provides lower-Current trip evidence across the downstream family. Paddle Today keeps only the conservative 700 cfs floor.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168"
      },
      {
        "label": "Camping context",
        "value": "Primitive camping at Gooseneck / Hawes",
        "note": "The NPS brochure and Recreation.gov both describe Gooseneck / Hawes with primitive camping context, which makes the downstream finish the clearest legal overnight support point for this long continuation.",
        "sourceUrl": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm"
      },
      {
        "label": "Endpoint coordinates",
        "value": "37.054302, -91.055459 to 36.8194989, -90.9470707",
        "note": "Waymeyer uses the existing published paddling-access coordinate and Gooseneck uses the existing USGS-topo-derived Hawes Recreation Area point already accepted on the adjacent lower Current route. Confirm the signed access layout on arrival.",
        "sourceUrl": "https://www.anyplaceamerica.com/directory/mo/ripley-county-29181/parks/hawes-recreation-area-758920/"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Ozark float times",
        "url": "https://www.nps.gov/ozar/planyourvisit/floattimes.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle the Lower Current River",
        "url": "https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark park brochure",
        "url": "https://www.nps.gov/ozar/planyourvisit/park-brochure.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Ozark Superintendent Compendium",
        "url": "https://www.nps.gov/ozar/learn/management/ozar-superintendent-s-compendium.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Waymeyer access update",
        "url": "https://home.nps.gov/ozar/learn/news/update-on-river-access-areas-at-waymeyer-chilton-boat-launch-and-pin-oak.htm",
        "provider": "nps"
      },
      {
        "label": "Recreation.gov Hawes Campground",
        "url": "https://www.recreation.gov/camping/poi/258899",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Current River Van Buren gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07067000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07067000 Current River at Van Buren",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07067000/",
        "provider": "usgs"
      },
      {
        "label": "Paddling.com Waymeyer Access",
        "url": "https://paddling.com/paddle/locations/waymeyer-access",
        "provider": "local"
      },
      {
        "label": "Hawes Recreation Area topo coordinate",
        "url": "https://www.anyplaceamerica.com/directory/mo/ripley-county-29181/parks/hawes-recreation-area-758920/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "eleven-point-river-cane-bluff-greer-crossing",
    "slug": "eleven-point-river-cane-bluff-greer-crossing",
    "name": "Eleven Point River",
    "reach": "Cane Bluff River Access to Greer Crossing Recreation Area",
    "aliases": [
      "Eleven Point River - Cane Bluff to Greer",
      "Upper Eleven Point - Cane Bluff to Greer Crossing",
      "Eleven Point National Scenic River - Cane Bluff to Greer"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Spring-favored upper Eleven Point day from Cane Bluff to Greer Crossing, with Forest Service public access at both ends and the Bardley gauge used as a conservative low-water estimate for the reach above Greer Spring.",
    "statusText": "Use the Eleven Point near Bardley gauge as a conservative low-water estimate. Around 300 cfs is the floor; below that, expect shallow riffles, regular dragging, and possible short portages on the upper river above Greer Spring. There is not enough exact-route support to name an ideal range or high-water cutoff.",
    "latitude": 36.796246,
    "longitude": -91.405675,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "The Forest Service describes this as a small upper-river section that is most comfortable in spring. Near the 300 cfs floor, expect more scraping, shallow riffles, and occasional short portages above Greer Spring.",
        "Rain can raise the Eleven Point quickly, and fresh wood or blind-bend strainers matter more on this upper section because easy exits are limited between Cane Bluff and Greer Crossing.",
        "Use only the published Forest Service accesses and keep the shuttle conservative. Greer Spring adds colder, faster water near the finish, and the rural road network is not a good substitute for a planned take-out."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and Cane Bluff-to-Greer trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6
      ],
      "seasonNotes": "The Forest Service says this upper section is small and comfortably floated in spring season. Greer Spring enters just above the take-out and more than doubles the river volume, so the Bardley gauge is best treated as a conservative estimate rather than a perfect on-reach reading.",
      "difficulty": "easy",
      "difficultyNotes": "This is a small, remote-feeling Ozark float with riffles, occasional strainers, and long shallow stretches when levels are marginal. Expect more local judgment than on the spring-fed downstream Eleven Point reaches, especially above Greer Spring.",
      "confidenceNotes": "Confidence is good for a conservative upstream Eleven Point add: the Forest Service lists Cane Bluff and Greer Crossing as open public accesses with published coordinates, river-mile notes place Cane Bluff at mile 9.3 and Greer Crossing at mile 16.6, USGS 07071500 returned same-day official values during implementation, and Rivers.MOHERP has exact Cane Bluff-to-Greer trip rows tied to the Bardley gauge. The app uses minimum-only scoring because Bardley is downstream of Greer Spring and acts as a conservative estimate for this upper reach rather than a perfect direct route gauge."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Cane Bluff to Greer Crossing, about 7.3 river miles",
        "note": "Forest Service river-mile notes place Cane Bluff at mile 9.3 and Greer Crossing at mile 16.6, making this the selected public segment immediately below closed Thomasville and immediately above the established Greer put-out.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/cane-bluff-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Cane Bluff River Access",
        "note": "The Forest Service lists Cane Bluff as open and identifies it as the first public access below Thomasville, with a vault toilet, trailer parking, and coordinates 36.796246, -91.405675.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/cane-bluff-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Greer Crossing Recreation Area",
        "note": "The Forest Service lists Greer Crossing as open, notes that the boat launch and day-use area sit just off Highway 19, and publishes coordinates 36.79356389, -91.32854167.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 628 cfs / 2.87 ft",
        "note": "A same-day Water Services IV refresh returned 628 cfs and 2.87 ft at 2026-06-22 06:30 CDT for Eleven Point River near Bardley, the downstream same-river gauge already used by adjacent Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs and includes exact Cane Bluff-to-Greer rows marked Low at 572 cfs and Good at 1090 and 1600 cfs. The app keeps only the conservative 300 cfs floor and does not infer an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Upper-river caveat",
        "value": "Small upper river above Greer Spring",
        "note": "The Forest Service says this upper section is small and comfortably floated in spring season, and its river-mile notes show Greer Spring entering just 0.6 miles above the take-out, where it more than doubles the river volume.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/cane-bluff-river-access"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Cane Bluff River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/cane-bluff-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Greer Crossing Recreation Area",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-cane-bluff-turner-mill",
    "slug": "eleven-point-river-cane-bluff-turner-mill",
    "name": "Eleven Point River",
    "reach": "Cane Bluff River Access to Turner Mill South River Access",
    "aliases": [
      "Eleven Point River - Cane Bluff to Turner Mill",
      "Upper Eleven Point - Cane Bluff to Turner",
      "Eleven Point National Scenic River - Cane Bluff to Turner Mill South"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Upper-to-mid Eleven Point day from Cane Bluff to Turner Mill South, linking the smaller upper river to the more dependable Greer Spring-supported flow with official Forest Service access at both ends.",
    "statusText": "Use the Eleven Point near Bardley gauge as a conservative low-water check. Around 300 cfs remains the floor; below that, expect more scraping and occasional short portages above Greer Spring even if the Turner half still has better spring support. No exact high-water cutoff is claimed.",
    "latitude": 36.796246,
    "longitude": -91.405675,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "The first half above Greer Spring is still the smaller upper Eleven Point, so the Bardley gauge can overstate how easy the Cane Bluff side will feel near the 300 cfs floor.",
        "Greer Spring boosts the lower half, but this longer route still includes blind bends, fresh wood risk after rain, Mary Decker Shoal, and limited easy exits between public accesses.",
        "Use only the named Forest Service accesses. Turner Mill North and Turner Mill South are separate landings, and private banks between them are not substitutes for a planned take-out."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and Cane Bluff-to-Turner trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "This longer route starts on the small upper river above Greer Spring and finishes on the more dependable spring-fed section to Turner Mill South. The Bardley gauge remains a conservative same-river estimate rather than a perfect on-reach reading for the Cane Bluff half.",
      "difficulty": "easy",
      "difficultyNotes": "Expect upper-river shallows and occasional dragging before Greer Spring, then a colder spring-fed run with shoals and Mary Decker Shoal near Turner Mill South. The route is still mostly Class I-style Ozark water, but it is longer and more remote than the split sections.",
      "confidenceNotes": "Confidence is good for a conservative Eleven Point continuation: current Forest Service pages still show Cane Bluff and Turner Mill South open with published coordinates, river-mile notes place Cane Bluff at mile 9.3 and Turner Mill at mile 21.5, same-day USGS 07071500 returned official Bardley values during this run, and current Rivers.MOHERP Bardley rows still support the familiar 300 cfs minimum-only floor with exact same-corridor trip evidence. The app keeps the threshold model conservative because the route-specific numeric support remains community-calibrated rather than an official paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Cane Bluff to Turner Mill South, about 12.2 river miles",
        "note": "Forest Service river-mile notes place Cane Bluff at mile 9.3 from Thomasville and Turner Mill Access at mile 21.5, supporting this combined public segment through Greer Crossing and Mary Decker Shoal.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Cane Bluff River Access",
        "note": "The Forest Service lists Cane Bluff as open and identifies it as the first public access below Thomasville, with a vault toilet, trailer parking, and coordinates 36.796246, -91.405675.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/cane-bluff-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Turner Mill South River Access",
        "note": "The Forest Service lists Turner Mill South as open on river right, with limited dispersed campsites, a single-lane concrete boat launch, toilet facilities, and coordinates 36.76456, -91.26653037.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 503 cfs / 2.64 ft",
        "note": "A same-day Water Services IV refresh returned 503 cfs and 2.64 ft at 2026-07-11 10:30 CDT for Eleven Point River near Bardley, the direct same-river gauge already used by adjacent Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs and includes exact Cane Bluff-to-Turner trip evidence. The app keeps only the conservative 300 cfs floor and does not infer an ideal range or upper cutoff from those community rows.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Upper-river shallows to Greer Spring-supported shoals",
        "note": "Forest Service pages describe Cane Bluff as the first public access below the smaller upper river and Greer-to-Turner as a popular float that passes Mary Decker Shoal, while Turner Mill South marks the start of the colder White Ribbon Trout Area downstream.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Cane Bluff River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/cane-bluff-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Greer Crossing Recreation Area",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area",
        "provider": "local"
      },
      {
        "label": "Forest Service Turner Mill South River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-cane-bluff-whitten",
    "slug": "eleven-point-river-cane-bluff-whitten",
    "name": "Eleven Point River",
    "reach": "Cane Bluff River Access to Whitten River Access",
    "aliases": [
      "Eleven Point River - Cane Bluff to Whitten",
      "Upper Eleven Point - Cane Bluff to Whitten",
      "Eleven Point National Scenic River - Cane Bluff to Whitten"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long upper-to-lower Eleven Point continuation from Cane Bluff to Whitten, combining the smaller pre-Greer section with the colder spring-fed trout water downstream.",
    "statusText": "Use the Eleven Point near Bardley gauge as a conservative low-water check. Around 300 cfs remains the floor; below that, expect scraping and occasional short portages above Greer Spring even if the Whitten half still looks floatable. No exact high-water cutoff is claimed.",
    "latitude": 36.796246,
    "longitude": -91.405675,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "cold_water",
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "The Cane Bluff half above Greer Spring is still a smaller upper-river float, so the downstream Bardley gauge can overstate how easy the first miles will feel near the 300 cfs floor.",
        "Below Greer Spring the river gets colder and more forceful, and this longer route still includes Mary Decker Shoal, fresh wood risk after rain, and limited easy exits between official accesses.",
        "Use only the named Forest Service accesses and legal float camps. Private banks and informal gravel pull-offs are not substitutes for Cane Bluff or Whitten."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and adjacent Eleven Point trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "This combined route starts on the smaller upper river above Greer Spring and finishes on the more dependable cold-water lower section. The Bardley gauge remains a conservative same-river estimate rather than a perfect on-reach reading for the Cane Bluff half.",
      "difficulty": "moderate",
      "difficultyNotes": "Expect upper-river shallows and occasional dragging before Greer Spring, then a colder spring-fed run with shoals, Mary Decker Shoal, and a longer remote feel. It is still mostly Class I-style Ozark water, but the mileage and mixed character make it more committed than the split sections.",
      "confidenceNotes": "Confidence is good for a conservative Eleven Point continuation: current Forest Service pages still show Cane Bluff and Whitten open with published coordinates, river-mile notes place Cane Bluff at mile 9.3 and Whitten at mile 27.6, same-day USGS 07071500 returned official Bardley values during this run, and current Rivers.MOHERP Bardley rows still support the familiar 300 cfs minimum-only floor through exact adjacent trip evidence. The app keeps the threshold model conservative because the route-specific numeric support remains community-calibrated rather than an official paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Cane Bluff to Whitten, about 18.3 river miles",
        "note": "Forest Service river-mile notes place Cane Bluff at mile 9.3 from Thomasville and Whitten at mile 27.6, supporting this combined public route through Greer Crossing and Turner Mill.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Cane Bluff River Access",
        "note": "The Forest Service lists Cane Bluff as open and identifies it as the first public access below Thomasville, with a vault toilet, trailer parking, and coordinates 36.796246, -91.405675.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/cane-bluff-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Whitten River Access",
        "note": "The Forest Service lists Whitten as open on the right bank, with a vault toilet, single-lane concrete boat ramp, parking for vehicles with trailers, and coordinates 36.732356, -91.214837.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 524 cfs / 2.68 ft",
        "note": "A same-day Water Services IV refresh returned 524 cfs and 2.68 ft at 2026-07-11 13:30 CDT for Eleven Point River near Bardley, the direct same-river gauge already used by adjacent Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs, and exact adjacent Cane Bluff-to-Turner, Turner-to-Whitten, and Whitten-to-Riverton rows support keeping only that conservative floor. The app does not infer an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Upper-river shallows into cold spring-fed trout water",
        "note": "Forest Service and MDC material describe the smaller spring-favored upper river above Greer, the cold-water trout reach below Greer Spring, Mary Decker Shoal near Turner, and mixed motorized/nonmotorized use downstream.",
        "sourceUrl": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Cane Bluff River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/cane-bluff-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Whitten River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Turner Mill South River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-cane-bluff-riverton",
    "slug": "eleven-point-river-cane-bluff-riverton",
    "name": "Eleven Point River",
    "reach": "Cane Bluff River Access to Riverton East River Access",
    "aliases": [
      "Eleven Point River - Cane Bluff to Riverton",
      "Upper Eleven Point - Cane Bluff to Highway 160",
      "Eleven Point National Scenic River - Cane Bluff to Riverton East"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long Eleven Point continuation from Cane Bluff to Riverton, linking the smaller pre-Greer upper river with the spring-fed trout corridor and the classic lower-river finish at Highway 160.",
    "statusText": "Use the Eleven Point near Bardley gauge as a conservative low-water check. Around 300 cfs remains the floor; below that, expect scraping and occasional short portages above Greer Spring, plus a slower full-day push even if the lower miles still look floatable.",
    "latitude": 36.796246,
    "longitude": -91.405675,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "cold_water",
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "The Cane Bluff half above Greer Spring is still a smaller upper-river float, so the downstream Bardley gauge can overstate how easy the first miles will feel near the 300 cfs floor.",
        "This route is long enough that Mary Decker Shoal, Halls Bay, fresh wood after storms, and cold spring-fed water stack into a materially bigger commitment than the shorter Eleven Point splits.",
        "Use only the named Forest Service accesses and legal float camps. Private banks and informal gravel pull-offs are not substitutes for Cane Bluff or Riverton East."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and adjacent Eleven Point trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "This combined route starts on the smaller upper river above Greer Spring and finishes on the more dependable lower section at Riverton. The Bardley gauge remains a conservative same-river estimate rather than a perfect on-reach reading for the Cane Bluff half.",
      "difficulty": "moderate",
      "difficultyNotes": "Expect upper-river shallows and occasional dragging before Greer Spring, then a colder spring-fed run with shoals, Mary Decker Shoal, Halls Bay, and a very long day if you do not split the route overnight.",
      "confidenceNotes": "Confidence is good for a conservative Eleven Point continuation: current Forest Service pages still show Cane Bluff and Riverton East open with published coordinates, river-mile notes place Cane Bluff at mile 9.3 and Riverton at mile 35.6, same-day USGS 07071500 returned official Bardley values during this run, and current Rivers.MOHERP Bardley rows still support the familiar 300 cfs minimum-only floor through exact same-corridor and adjacent-trip evidence. The app keeps the threshold model conservative because the route-specific numeric support remains community-calibrated rather than an official paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Cane Bluff to Riverton, about 26.3 river miles",
        "note": "Forest Service river-mile notes place Cane Bluff at mile 9.3 from Thomasville and Riverton at mile 35.6, supporting this combined public route through Greer, Turner Mill, and Whitten.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Cane Bluff River Access",
        "note": "The Forest Service lists Cane Bluff as open and identifies it as the first public access below Thomasville, with a vault toilet, trailer parking, and coordinates 36.796246, -91.405675.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/cane-bluff-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Riverton East River Access",
        "note": "The Forest Service lists Riverton East as open on river left at Highway 160, with a paved road, single-lane concrete boat ramp, canoe launch, parking, vault toilet, and coordinates 36.649183, -91.199614.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 514 cfs / 2.66 ft",
        "note": "A same-day Water Services IV refresh returned 514 cfs and 2.66 ft at 2026-07-11 14:30 CDT for Eleven Point River near Bardley, the direct same-river gauge already used by adjacent Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs, and exact adjacent Cane Bluff-to-Turner, Turner-to-Whitten, and Whitten-to-Riverton rows support keeping only that conservative floor. The app does not infer an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Upper-river shallows into White Ribbon trout water and the lower scenic corridor",
        "note": "MDC says the first 17 miles from Thomasville to Greer are best in spring to avoid dragging, Greer Spring transforms the river into a coldwater fishery, and the next 14 miles from Turner Mill to Riverton are managed as a White Ribbon Trout Area.",
        "sourceUrl": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Cane Bluff River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/cane-bluff-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Whitten River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Riverton East River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-cane-bluff-narrows",
    "slug": "eleven-point-river-cane-bluff-narrows",
    "name": "Eleven Point River",
    "reach": "Cane Bluff River Access to Highway 142 River Access",
    "aliases": [
      "Eleven Point River - Cane Bluff to Narrows",
      "Eleven Point River - Cane Bluff to Highway 142",
      "Full Eleven Point - Cane Bluff to The Narrows"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Full scenic-river continuation from Cane Bluff to The Narrows, combining the smaller upper Eleven Point, the Greer-to-Turner trout corridor, and the last public take-out above Arkansas.",
    "statusText": "Use the Eleven Point near Bardley gauge as a conservative low-water check. Around 300 cfs remains the floor; below that, expect scraping above Greer Spring and a much longer trip to the last scenic-river access. No exact high-water cutoff is claimed.",
    "latitude": 36.796246,
    "longitude": -91.405675,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "cold_water",
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "The Cane Bluff half above Greer Spring is still a smaller upper-river float, so the downstream Bardley gauge can overstate how easy the first miles will feel near the 300 cfs floor.",
        "This route is long enough that Mary Decker Shoal, Halls Bay, fresh wood after storms, and cold spring-fed water can turn a scenic float into an overnight or high-consequence endurance push.",
        "Use only the named Forest Service accesses and legal float camps. Highway 142 / The Narrows is the last scenic-river access above Arkansas, and private banks or informal gravel pull-offs are not substitutes."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and adjacent Eleven Point trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "This route starts on the smaller upper river above Greer Spring and finishes at the last scenic-river access downstream. The Bardley gauge remains a conservative same-river estimate rather than a perfect on-reach reading for the Cane Bluff half.",
      "difficulty": "hard",
      "difficultyNotes": "The water is still mostly Class I-style Ozark current, but the length makes this a much bigger commitment than the split sections. Expect upper-river shallows, Mary Decker Shoal, Halls Bay, cold water, weather exposure, and limited developed exits below Riverton.",
      "confidenceNotes": "Confidence is good for a conservative full-corridor Eleven Point continuation: current Forest Service pages still show Cane Bluff and Highway 142 open with published coordinates, river-mile notes place Cane Bluff at mile 9.3 and Highway 142 at mile 44.3, same-day USGS 07071500 returned official Bardley values during this run, and current Rivers.MOHERP Bardley rows still support the familiar 300 cfs minimum-only floor through exact same-corridor and adjacent-trip evidence. The app keeps the threshold model conservative because the route-specific numeric support remains community-calibrated rather than an official paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Cane Bluff to Highway 142, about 35.0 river miles",
        "note": "Forest Service river-mile notes place Cane Bluff at mile 9.3 from Thomasville and Highway 142 at mile 44.3, supporting this combined public route through Greer, Turner Mill, Whitten, and Riverton.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Cane Bluff River Access",
        "note": "The Forest Service lists Cane Bluff as open and identifies it as the first public access below Thomasville, with a vault toilet, trailer parking, and coordinates 36.796246, -91.405675.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/cane-bluff-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Highway 142 River Access / The Narrows",
        "note": "The Forest Service lists Highway 142 as open, developed, and day-use only, with a single-lane concrete boat ramp, paved parking, vault toilet, and coordinates 36.550194, -91.191532.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 514 cfs / 2.66 ft",
        "note": "A same-day Water Services IV refresh returned 514 cfs and 2.66 ft at 2026-07-11 14:30 CDT for Eleven Point River near Bardley, the direct same-river gauge already used by adjacent Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs, and exact adjacent Cane Bluff-to-Turner, Turner-to-Whitten, Whitten-to-Riverton, and Riverton-to-Narrows evidence supports keeping only that conservative floor. The app does not infer an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Upper spring-favored river into long cold lower corridor with float camps",
        "note": "MDC says the first 17 miles from Thomasville to Greer are best in spring to avoid dragging, the next 14 miles from Turner Mill to Riverton are stocked trout water, and the Forest Service says the corridor has seven designated float camps for river users.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/eleven-point-national-wild-and-scenic-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Cane Bluff River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/cane-bluff-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Whitten River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Riverton East River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Highway 142 River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-greer-crossing-turner-mill",
    "slug": "eleven-point-river-greer-crossing-turner-mill",
    "name": "Eleven Point River",
    "reach": "Greer Crossing Recreation Area to Turner Mill North River Access",
    "aliases": [
      "Eleven Point River - Greer Crossing to Turner Mill",
      "Eleven Point River - Greer Spring to Turner Mill",
      "Upper Eleven Point - Greer to Turner"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Short spring-supported Eleven Point day from Greer Crossing to Turner Mill, with Forest Service public access at both ends, Mary Decker Shoal, and the direct Bardley gauge used as a conservative low-water check.",
    "statusText": "Use the Eleven Point near Bardley gauge. Around 300 cfs is the low-water marker; below that, expect shallow shoals and possible dragging. There is not enough official support to name an ideal range or high-water cutoff, so treat rising water as a caution flag.",
    "latitude": 36.79356389,
    "longitude": -91.32854167,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and Greer-to-Turner trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Greer Spring more than doubles the river volume just upstream of this reach, so the Greer-to-Turner section is more dependable than the warmer upper Eleven Point. The Forest Service still warns that the river can rise rapidly after rain.",
      "difficulty": "easy",
      "difficultyNotes": "Forest Service materials describe this reach as having shoals rather than named rapids. Expect cold spring-fed water, Mary Decker Shoal, bouldery shallow spots near low water, rural access roads, and possible motorized users under the 25 hp limit.",
      "confidenceNotes": "Confidence is good for a conservative adjacent Eleven Point add: the Forest Service lists Greer Crossing as a popular canoe launch with official coordinates, names Greer to Turner Mill as a 4.9-mile float, identifies Turner Mill access at river mile 21.5, and publishes Turner Mill North coordinates. USGS 07071500 is the same direct Bardley gauge already used by downstream Eleven Point V2 routes and showed same-day official data during this run. Rivers.MOHERP has exact Greer-to-Turner trip evidence in good conditions, but the app uses only a minimum-only 300 cfs floor because the threshold source is community-calibrated rather than an official manager band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Greer to Turner Mill, 4.9 miles",
        "note": "The Forest Service names Greer to Turner Mill as a popular 4.9-mile float trip and says it passes Mary Decker Shoal, an area of shallow, faster moving water.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area"
      },
      {
        "label": "Public put-in",
        "value": "Greer Crossing Recreation Area",
        "note": "The Forest Service identifies Greer Crossing as a popular canoe launch with a single-lane concrete boat ramp, water seasonally, toilets, parking, and coordinates 36.79356389, -91.32854167.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area"
      },
      {
        "label": "Public take-out",
        "value": "Turner Mill North River Access",
        "note": "The Forest Service says Turner Mill North is 4.9 miles downriver of Greer Crossing, has river access, toilets, picnic facilities, parking, and coordinates 36.765748, -91.266931. Turner Mill South is the major landing on river right.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-north-river-access"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 07071500",
        "note": "USGS operates Eleven Point River near Bardley, MO. During the May 31, 2026 review, the legacy current-conditions page showed 556 cfs and 2.74 ft at 15:30 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs and includes exact Greer-to-Turner trip rows marked Good at 524 cfs and 988 cfs. The app does not infer an ideal range or upper cutoff from those reports.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Spring and hazard context",
        "value": "Greer Spring, shoals, rapid rises",
        "note": "The Forest Service says Greer Spring more than doubles the river volume, this reach includes the Blue Ribbon Trout Area to Turner Mill, and the river can rise rapidly after changing weather.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Greer Crossing Recreation Area",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area",
        "provider": "local"
      },
      {
        "label": "Forest Service Turner Mill North River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-north-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-greer-crossing-turner-mill-south",
    "slug": "eleven-point-river-greer-crossing-turner-mill-south",
    "name": "Eleven Point River",
    "reach": "Greer Crossing Recreation Area to Turner Mill South River Access",
    "aliases": [
      "Eleven Point River - Greer Crossing to Turner Mill South",
      "Eleven Point River - Greer Spring to Turner Mill South",
      "Upper Eleven Point - Greer to Turner South"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Short spring-supported Eleven Point day from Greer Crossing to Turner Mill South, using the official Forest Service put-in and river-right landing with the Bardley gauge as a conservative low-water check.",
    "statusText": "Use the Eleven Point near Bardley gauge. Around 300 cfs is the low-water marker; below that, expect shallow shoals and possible dragging. There is not enough official support to name an ideal range or high-water cutoff, so treat rising or storm-affected water as a caution flag.",
    "latitude": 36.79356389,
    "longitude": -91.32854167,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and Greer-to-Turner trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Greer Spring more than doubles the river volume just upstream of this reach, so the Greer-to-Turner section is more dependable than the warmer upper Eleven Point. The Forest Service still warns that the river can rise rapidly after rain.",
      "difficulty": "easy",
      "difficultyNotes": "Forest Service materials describe this reach as having shoals rather than named rapids. Expect cold spring-fed water, Mary Decker Shoal, bouldery shallow spots near low water, rural access roads, and possible motorized users under the 25 hp limit.",
      "confidenceNotes": "Confidence is good for a conservative adjacent Eleven Point add: the Forest Service lists Greer Crossing as a popular canoe launch with official coordinates, says Turner Mill South is 4.9 miles below Greer, and publishes Turner Mill South coordinates and access details. Same-day USGS Water Services returned official Bardley values during this run, and Rivers.MOHERP still supports the familiar 300 cfs minimum-only floor through the exact Greer-to-Turner corridor. The app keeps the threshold model conservative because the numeric support remains community-calibrated rather than a manager-published paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Greer to Turner Mill South, 4.9 miles",
        "note": "The Forest Service names Greer to Turner Mill as a popular 4.9-mile float trip and says Turner Mill South is 4.9 miles below Greer Crossing on river right.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Greer Crossing Recreation Area",
        "note": "The Forest Service identifies Greer Crossing as a popular canoe launch with a single-lane concrete boat ramp, water seasonally, toilets, parking, and coordinates 36.79356389, -91.32854167.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area"
      },
      {
        "label": "Public take-out",
        "value": "Turner Mill South River Access",
        "note": "The Forest Service lists Turner Mill South as open on river right with a rustic day-use area, limited campsites, a single-lane concrete boat launch, toilet facilities, and coordinates 36.76456, -91.26653037.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 463 cfs / 2.56 ft",
        "note": "A same-day Water Services IV refresh returned 463 cfs and 2.56 ft at 2026-07-15 12:30 CDT for Eleven Point River near Bardley, the direct same-river gauge already used by adjacent Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs and includes exact Greer-to-Turner trip evidence in runnable conditions. The app does not infer an ideal range or upper cutoff from those community rows.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Greer Spring, Mary Decker Shoal, day-use split take-out",
        "note": "The Forest Service says Greer Spring more than doubles the river volume, Greer to Turner passes Mary Decker Shoal, and Turner Mill South is the developed river-right landing rather than the smaller day-use north-side access.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Greer Crossing Recreation Area",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area",
        "provider": "local"
      },
      {
        "label": "Forest Service Turner Mill South River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-greer-crossing-whitten",
    "slug": "eleven-point-river-greer-crossing-whitten",
    "name": "Eleven Point River",
    "reach": "Greer Crossing Recreation Area to Whitten River Access",
    "aliases": [
      "Eleven Point River - Greer to Whitten",
      "Eleven Point River - Greer Crossing to Whitten",
      "Mid Eleven Point - Greer Spring to Whitten"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Spring-fed Eleven Point day from Greer Crossing to Whitten, with official Forest Service access at both ends, a direct Bardley gauge, and a practical one-day link through the Blue and White Ribbon trout water.",
    "statusText": "Use the Eleven Point near Bardley gauge as a conservative low-water check. Around 300 cfs remains the floor; below that, expect shoals and occasional dragging even though Greer Spring makes this reach more dependable than the upper river. No exact high-water cutoff is claimed.",
    "latitude": 36.79356389,
    "longitude": -91.32854167,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and adjacent Greer-to-Whitten trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Greer Spring more than doubles the volume of the Eleven Point just above this reach, so it is more dependable than the warmer upper river. The Forest Service still warns that the river can rise rapidly after rain and that cold-water spring conditions persist well downstream.",
      "difficulty": "easy",
      "difficultyNotes": "This is generally Class I spring-fed Ozark water with shoals, Mary Decker Shoal near the start, cold water, and a longer remote feel than the short split sections. Motorized users are also allowed under the 25 hp limit.",
      "confidenceNotes": "Confidence is good for a conservative mid-river Eleven Point add: the Forest Service explicitly says Greer to Whitten is an 11-mile float, both access pages still show Site Open with published coordinates, same-day USGS 07071500 returned official Bardley values during this run, and current Rivers.MOHERP Bardley rows still support the familiar 300 cfs minimum-only floor through the exact adjacent Greer-to-Turner and Turner-to-Whitten segments. The app keeps the threshold model conservative because the numeric support is still community-calibrated rather than a manager-published paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Greer to Whitten, about 11 miles",
        "note": "The Forest Service Whitten page says visitors enjoy the 11 mile float from Greer downriver to Whitten, making this a named public one-day route between two official accesses.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Greer Crossing Recreation Area",
        "note": "The Forest Service lists Greer Crossing as open, with a campground, boat launch, parking, and coordinates 36.79356389, -91.32854167.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area"
      },
      {
        "label": "Public take-out",
        "value": "Whitten River Access",
        "note": "The Forest Service lists Whitten as open on the right bank, with a vault toilet, single-lane concrete boat ramp, parking for vehicles with trailers, and coordinates 36.732356, -91.214837.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 503 cfs / 2.64 ft",
        "note": "A same-day Water Services IV refresh returned 503 cfs and 2.64 ft at 2026-07-11 10:30 CDT for Eleven Point River near Bardley, the direct same-river gauge already used by the adjacent Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs, and the exact adjacent Greer-to-Turner and Turner-to-Whitten rows both support keeping that same conservative floor for this combined route. The app does not infer an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Greer Spring, Mary Decker Shoal, trout-water transition",
        "note": "Forest Service pages say Greer to Turner passes Mary Decker Shoal, Greer Spring more than doubles the river volume, and the river from Turner Mill downstream remains cold White Ribbon Trout Area water shared by paddlers, anglers, and motorized users.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Greer Crossing Recreation Area",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area",
        "provider": "local"
      },
      {
        "label": "Forest Service Whitten River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Turner Mill South River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-greer-crossing-riverton",
    "slug": "eleven-point-river-greer-crossing-riverton",
    "name": "Eleven Point River",
    "reach": "Greer Crossing Recreation Area to Riverton East River Access",
    "aliases": [
      "Eleven Point River - Greer to Riverton",
      "Eleven Point River - Greer Crossing to Riverton East",
      "Lower Eleven Point - Greer Spring to Highway 160"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Longer lower Eleven Point day from Greer Crossing to Riverton East, using official Forest Service access pages, the direct Bardley gauge, and the Forest Service one-long-day or easy-overnighter route shape.",
    "statusText": "Use the Eleven Point near Bardley gauge as a conservative low-water check. Around 300 cfs remains the floor, but this is a long 19-mile cold-water route, so low water, wind, or wood can turn it into a very slow day. No exact high-water cutoff is claimed.",
    "latitude": 36.79356389,
    "longitude": -91.32854167,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and adjacent Greer-to-Riverton trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Greer Spring more than doubles the river volume just above the put-in, and the Forest Service says Greer to Riverton is an excellent two-day float that can often be done on one long day. Use the app as a conservative low-water check, but expect cold water, wood, and travel time to matter more than a short split section.",
      "difficulty": "moderate",
      "difficultyNotes": "This is mostly Class I spring-fed Ozark water, but the route is long and includes Mary Decker Shoal, multiple cold-water shoal sequences, Halls Bay near the end, wind exposure, and limited developed exits between the named accesses.",
      "confidenceNotes": "Confidence is good for a conservative long Eleven Point add: the Forest Service explicitly lists Greer to Riverton as a 19-mile float, Greer Crossing and Riverton East still show Site Open with published coordinates and access details, same-day USGS 07071500 returned official Bardley values during this run, and current Rivers.MOHERP Bardley rows still support the familiar 300 cfs minimum-only floor through the exact adjacent Greer-to-Turner, Turner-to-Whitten, and Whitten-to-Riverton segments. The app keeps the threshold model conservative because the numeric support remains community-calibrated rather than a manager-published paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Greer to Riverton, about 19 miles",
        "note": "The Forest Service Greer Crossing page lists Greer to Riverton as a 19-mile float and says it is an excellent two-day trip that can often be completed on one long day.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area"
      },
      {
        "label": "Public put-in",
        "value": "Greer Crossing Recreation Area",
        "note": "The Forest Service lists Greer Crossing as open, with a campground, boat launch, parking, and coordinates 36.79356389, -91.32854167.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area"
      },
      {
        "label": "Public take-out",
        "value": "Riverton East River Access",
        "note": "The Forest Service lists Riverton East as open and 7.6 miles downriver of Whitten, with a paved road, concrete boat ramp, canoe launch, vault toilet, and coordinates 36.649183, -91.199614.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 503 cfs / 2.64 ft",
        "note": "A same-day Water Services IV refresh returned 503 cfs and 2.64 ft at 2026-07-11 10:30 CDT for Eleven Point River near Bardley, the direct same-river gauge already used by the existing lower Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs, and the exact adjacent Greer-to-Turner, Turner-to-Whitten, and Whitten-to-Riverton rows support keeping that same conservative floor for this longer combined route. The app does not infer an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Long cold-water float with shoals and Halls Bay",
        "note": "Forest Service pages say Greer to Turner passes Mary Decker Shoal, Turner Mill downstream stays in cold White Ribbon Trout Area water, and the Whitten-to-Riverton section adds Halls Bay plus more shoals, motorized users, and long-distance exposure.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Greer Crossing Recreation Area",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area",
        "provider": "local"
      },
      {
        "label": "Forest Service Whitten River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Riverton East River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-greer-crossing-narrows",
    "slug": "eleven-point-river-greer-crossing-narrows",
    "name": "Eleven Point River",
    "reach": "Greer Crossing Recreation Area to Highway 142 River Access",
    "aliases": [
      "Eleven Point River - Greer to Narrows",
      "Lower Eleven Point - Greer Crossing to Highway 142",
      "Eleven Point River - Greer Spring to The Narrows"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long lower Eleven Point continuation from Greer Crossing to the Highway 142 / Narrows access, linking the Forest Service 19-mile Greer-to-Riverton day with the last developed access farther downstream.",
    "statusText": "Use the Eleven Point near Bardley gauge as a conservative low-water check. Around 300 cfs remains the floor, but this is a long 27-plus-mile cold-water continuation, so low water, wind, fatigue, or wood can turn it into an overnight-capable commitment. No exact high-water cutoff is claimed.",
    "latitude": 36.79356389,
    "longitude": -91.32854167,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "cold_water",
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This route adds the full lower corridor below Greer Spring, so distance, fatigue, and take-out discipline matter more than on the shorter split routes.",
        "The run includes Mary Decker Shoal, fresh wood after rain, blind bends, Halls Bay, and the widening lower valley below Riverton before the last scenic-river access.",
        "Treat this as an overnight-capable continuation rather than a casual day. Highway 142 / The Narrows is the last scenic-river access above Arkansas, so missing it materially changes the route."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and adjacent Greer-to-Narrows trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Greer Spring more than doubles the river volume just above the put-in, and the lower Eleven Point is often more dependable than the upper river, but the Forest Service still warns that the corridor can rise rapidly after storms. Use the app as a conservative low-water check and plan extra margin for distance.",
      "difficulty": "moderate",
      "difficultyNotes": "This is mostly Class I spring-fed Ozark water, but the 27-mile-plus continuation adds commitment. Expect shoals, cold water, wind exposure, wood, Halls Bay, and limited developed exits below Riverton.",
      "confidenceNotes": "Confidence is good for a conservative long Eleven Point add: the Forest Service explicitly lists Greer to Riverton as a 19-mile float, the Highway 142 page says The Narrows is 8.7 miles downriver of Riverton, Greer Crossing and Highway 142 still show Site Open with published coordinates and access details, same-day USGS 07071500 returned 473 cfs and 2.58 ft at 2026-07-13 22:30 CDT, and current Rivers.MOHERP Bardley rows still support the familiar 300 cfs minimum-only floor through exact adjacent lower-Eleven routes. The app keeps the threshold model conservative because the numeric support remains community-calibrated rather than a manager-published paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Greer to Highway 142, about 27.7 miles",
        "note": "The Forest Service Greer Crossing page lists Greer to Riverton as a 19-mile float, and the Highway 142 page says The Narrows is 8.7 miles downriver of Riverton, supporting a combined Greer-to-Highway-142 continuation of about 27.7 miles.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Greer Crossing Recreation Area",
        "note": "The current Forest Service Greer Crossing page marks the site open with a campground, boat launch, parking, and coordinates 36.79356389, -91.32854167.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area"
      },
      {
        "label": "Public take-out",
        "value": "Highway 142 River Access / The Narrows",
        "note": "The current Forest Service Highway 142 page marks the access open and developed, with a single-lane concrete boat ramp, paved parking, vault toilet, day-use rules, and coordinates 36.550194, -91.191532.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 473 cfs / 2.58 ft",
        "note": "Same-day USGS Water Services returned 473 cfs and 2.58 ft at 2026-07-13 22:30 CDT for Eleven Point River near Bardley, the direct same-river gauge already used by adjacent lower Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs, and the exact adjacent lower-Eleven routes support keeping that same conservative floor for this longer combined route. The app does not infer an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Cold-water continuation to last scenic-river access",
        "note": "Forest Service pages say Greer to Riverton is an excellent easy overnighter and identify Highway 142 / The Narrows as the last access on the southern end of the Eleven Point National Scenic River Area.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Greer Crossing Recreation Area",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/greer-crossing-recreation-area",
        "provider": "local"
      },
      {
        "label": "Forest Service Riverton East River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Highway 142 River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-turner-mill-south-whitten",
    "slug": "eleven-point-river-turner-mill-south-whitten",
    "name": "Eleven Point River",
    "reach": "Turner Mill South River Access to Whitten River Access",
    "aliases": [
      "Eleven Point River - Turner Mill to Whitten",
      "Eleven Point River - Turners Mill to Whitten",
      "Eleven Point River - Turner Mill South to Whitten"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Spring-fed Eleven Point day from Turner Mill South to Whitten, using Forest Service access points on the National Wild and Scenic River and the direct Bardley gauge as a conservative low-water check.",
    "statusText": "Use the Eleven Point near Bardley gauge. Around 300 cfs is the low-water marker; below that, expect more dragging through shoals. There is not enough route-specific support to name an ideal range or high-water cutoff, so treat rising water as a caution flag.",
    "latitude": 36.76456,
    "longitude": -91.26653037,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and Turner Mill-to-Whitten trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Greer Spring keeps this part of the Eleven Point colder and more dependable than the upper river, but the Forest Service still warns that the river can rise rapidly. Spring and fall usually provide the best margin; summer low water can make shoals slower.",
      "difficulty": "easy",
      "difficultyNotes": "This is generally Class I spring-fed Ozark water with shoals, cold water, and a remote feel. It is still a natural river: low water means dragging, high or rising water can make bends and wood consequential, and motorized users are allowed under the 25 hp limit.",
      "confidenceNotes": "Confidence is good for a conservative adjacent Eleven Point add: the Forest Service lists Turner Mill South as open, gives coordinates and a concrete boat launch, says Whitten is the next access downriver, and publishes Whitten coordinates and ramp details. USGS 07071500 is the same direct Bardley gauge already used by the existing Whitten-to-Riverton route, and Rivers.MOHERP gives a 300 cfs Good-condition floor plus exact Turner Mill-to-Whitten trip evidence. The app uses minimum-only scoring because the threshold source is community-calibrated and the official Forest Service route-mile markers differ from MoHERP trip mileage."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Turner Mill South to Whitten",
        "note": "The Forest Service says Turner Mill South is 4.9 miles below Greer Crossing and that Whitten is the next access downriver. Its river-mile notes place Turner Mill near mile 21.5 and Whitten at mile 27.6.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Turner Mill South River Access",
        "note": "The Forest Service lists Turner Mill South as open, on the right bank, with a rustic day-use area, limited campsites, a single-lane concrete boat launch, toilet facilities, parking for 12 vehicles, and coordinates 36.76456, -91.26653037.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Whitten River Access",
        "note": "The Forest Service lists Whitten as open, on the right bank, with a vault toilet, single-lane concrete boat ramp, parking for vehicles with trailers, and coordinates 36.732356, -91.214837.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 07071500",
        "note": "USGS operates Eleven Point River near Bardley, MO, downstream in the same lower Eleven Point corridor already used by the existing Whitten-to-Riverton V2 route.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs and includes Turner Mill-to-Whitten trip evidence marked Good at 797 cfs.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Spring-fed trout reach",
        "note": "MDC says Greer Spring transforms the river into a coldwater fishery and that the Turner Mill-to-Riverton reach remains cold White Ribbon Trout Area water; the Forest Service notes the river is shared by motorized and nonmotorized users.",
        "sourceUrl": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Turner Mill South River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Whitten River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-turner-mill-south-riverton",
    "slug": "eleven-point-river-turner-mill-south-riverton",
    "name": "Eleven Point River",
    "reach": "Turner Mill South River Access to Riverton East River Access",
    "aliases": [
      "Eleven Point River - Turner Mill South to Riverton",
      "Eleven Point River - Turner Mill to Riverton East",
      "Lower Eleven Point - Turner to Highway 160"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long lower Eleven Point continuation from Turner Mill South to Riverton East, staying in the cold spring-fed White Ribbon trout water through Whitten and Halls Bay.",
    "statusText": "Use the Eleven Point near Bardley gauge as a conservative low-water check. Around 300 cfs remains the floor; below that, expect shoals, slower travel, and more dragging on the long middle miles. No exact high-water cutoff is claimed.",
    "latitude": 36.76456,
    "longitude": -91.26653037,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "cold_water",
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This is a long lower-Eleven Point day with limited developed exits between Turner Mill South and Riverton East, so low water, fatigue, and weather shifts matter more than on the short split routes.",
        "The route stays in cold spring-fed water with fresh wood risk after rain, shoals, and the Halls Bay channel choice late in the run.",
        "Use the named Forest Service accesses only. Riverton East is the preferred river-left finish just above Highway 160; do not substitute private banks or informal pull-offs."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and adjacent lower Eleven Point trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Greer Spring keeps this part of the Eleven Point colder and more dependable than the upper river, but the Forest Service still warns that the river can rise rapidly after changing weather. Spring and fall usually offer the best margin for this longer continuation.",
      "difficulty": "moderate",
      "difficultyNotes": "This is generally Class I spring-fed Ozark water, but the 14-mile-plus route adds commitment. Expect shoals, wind on broader lower sections, cold water, Halls Bay, rural shuttle roads, and possible motorized users under the 25 hp limit.",
      "confidenceNotes": "Confidence is good for a conservative lower-Eleven Point continuation: current Forest Service pages still show Turner Mill South and Riverton East open with published coordinates, river-mile notes place Turner Mill at mile 21.5 and Riverton at mile 35.6, same-day USGS 07071500 returned official Bardley values during this run, and current Rivers.MOHERP Bardley rows still support the familiar 300 cfs minimum-only floor through exact adjacent trip evidence. The app keeps the threshold model conservative because the numeric support is still community-calibrated rather than an official paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Turner Mill South to Riverton, about 14.1 river miles",
        "note": "Forest Service river-mile notes place Turner Mill Access at mile 21.5 from Thomasville and Riverton at mile 35.6, supporting this combined public route through Whitten and Halls Bay.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Turner Mill South River Access",
        "note": "The Forest Service lists Turner Mill South as open on river right, with limited dispersed campsites, a single-lane concrete boat launch, toilet facilities, and coordinates 36.76456, -91.26653037.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Riverton East River Access",
        "note": "The Forest Service lists Riverton East as open on river left at Highway 160, with a paved road, concrete boat ramp, canoe launch, parking, vault toilet, no fee, and coordinates 36.649183, -91.199614.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 524 cfs / 2.68 ft",
        "note": "A same-day Water Services IV refresh returned 524 cfs and 2.68 ft at 2026-07-11 13:30 CDT for Eleven Point River near Bardley, the direct same-river gauge already used by adjacent Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs, and exact adjacent Turner-to-Whitten plus Whitten-to-Riverton rows support keeping only that conservative floor. The app does not infer an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Cold-water trout reach with Halls Bay",
        "note": "MDC says Turner Mill to Riverton stays in the White Ribbon Trout Area, while Forest Service river-mile notes call out Halls Bay and the widening lower valley before Riverton.",
        "sourceUrl": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Turner Mill South River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Whitten River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Riverton East River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-turner-mill-south-narrows",
    "slug": "eleven-point-river-turner-mill-south-narrows",
    "name": "Eleven Point River",
    "reach": "Turner Mill South River Access to Highway 142 River Access",
    "aliases": [
      "Eleven Point River - Turner Mill South to Narrows",
      "Eleven Point River - Turner Mill to Highway 142",
      "Lower Eleven Point - Turner to The Narrows"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long lower Eleven Point continuation from Turner Mill South to The Narrows, linking the White Ribbon trout water with the last public access in the scenic-river corridor.",
    "statusText": "Use the Eleven Point near Bardley gauge as a conservative low-water check. Around 300 cfs remains the floor; below that, expect slower travel in shoals and a longer day to the last scenic-river access. No exact high-water cutoff is claimed.",
    "latitude": 36.76456,
    "longitude": -91.26653037,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "cold_water",
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This route passes Whitten and Riverton before continuing to the last Forest Service access in the scenic-river corridor, so missing Highway 142 materially changes the day and any shuttle plan.",
        "Shoals, fresh wood, Halls Bay, thunderstorms, and cold spring-fed water can turn an otherwise easy run into a much slower commitment on this longer lower-river continuation.",
        "Use the named Forest Service accesses and legal float camps only. Private banks and informal gravel pull-offs are not substitutes for Turner Mill South or Highway 142."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and adjacent lower Eleven Point trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "This route starts in the colder lower Eleven Point corridor below Greer Spring and finishes at the last scenic-river access. The Forest Service still warns that the river can rise rapidly after storms, so treat a rising hydrograph as a caution flag even when the route is above the low-water floor.",
      "difficulty": "moderate",
      "difficultyNotes": "This is generally Class I spring-fed Ozark water, but the length makes it more committed than the split sections. Expect shoals, Halls Bay, cold water, wind on wider lower stretches, and limited developed exits below Riverton.",
      "confidenceNotes": "Confidence is good for a conservative lower-Eleven Point continuation: current Forest Service pages still show Turner Mill South and Highway 142 open with published coordinates, river-mile notes place Turner Mill at mile 21.5 and Highway 142 at mile 44.3, same-day USGS 07071500 returned official Bardley values during this run, and current Rivers.MOHERP Bardley rows still support the familiar 300 cfs minimum-only floor through exact adjacent trip evidence. The app keeps the threshold model conservative because the numeric support remains community-calibrated rather than an official paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Turner Mill South to Highway 142, about 22.8 river miles",
        "note": "Forest Service river-mile notes place Turner Mill at mile 21.5 from Thomasville and Highway 142 at mile 44.3, supporting this combined public route through Whitten and Riverton.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Turner Mill South River Access",
        "note": "The Forest Service lists Turner Mill South with river access, toilets, picnic facilities, limited campsites, parking, and coordinates 36.76456, -91.26653037.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Highway 142 River Access / The Narrows",
        "note": "The Forest Service lists Highway 142 as open, developed, and day-use only, with a single-lane concrete boat ramp, paved parking, vault toilet, and coordinates 36.550194, -91.191532.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 514 cfs / 2.66 ft",
        "note": "A same-day Water Services IV refresh returned 514 cfs and 2.66 ft at 2026-07-11 14:30 CDT for Eleven Point River near Bardley, the direct same-river gauge already used by adjacent Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs, and exact adjacent Turner-to-Whitten, Whitten-to-Riverton, and Riverton-to-Narrows evidence supports keeping only that conservative floor. The app does not infer an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "White Ribbon trout water into the lower scenic corridor",
        "note": "MDC says the 14 miles from Turner Mill to Highway 160 at Riverton are stocked White Ribbon trout water, while the Forest Service marks Highway 142 as the last access before the river continues south toward Arkansas.",
        "sourceUrl": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Turner Mill South River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Whitten River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Riverton East River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Highway 142 River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-whitten-riverton",
    "slug": "eleven-point-river-whitten-riverton",
    "name": "Eleven Point River",
    "reach": "Whitten Access to Riverton East River Access",
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Classic lower Eleven Point day float from Whitten to Riverton on the National Wild and Scenic River, with Forest Service access at both ends, cold clear spring-fed water, shoals, Halls Bay, and a direct Bardley gauge.",
    "statusText": "Use the Eleven Point near Bardley gauge. Around 300 cfs is the low-water marker; below that, expect more dragging in shoals. There is not enough guidance yet to name a high-water cutoff, so rising water deserves extra caution.",
    "latitude": 36.732356,
    "longitude": -91.214837,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and Whitten-to-Riverton trip logs",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The lower Eleven Point is spring-fed and often floatable beyond the wettest months, but the Forest Service still warns that the river can rise rapidly. Cold water, rain pulses, and post-storm wood can change an otherwise easy day.",
      "difficulty": "easy",
      "difficultyNotes": "Forest Service materials and American Whitewater describe this as mostly Class I water with shoals and fast-water spots. Halls Bay has a faster ledge/right-channel option at above-normal water, and motorized users are also allowed on this reach under the 25 hp limit.",
      "confidenceNotes": "Confidence is good but intentionally conservative: the Forest Service explicitly names Whitten to Riverton as a popular 8-mile day float and publishes coordinates, access details, and open status for both endpoints; USGS 07071500 is a direct same-river lower-Eleven-Point gauge; American Whitewater documents the broader Highway 19-to-Highway 160 reach and identifies the Bardley gauge as runnable context; and Rivers.MOHERP provides a usable community low-water floor plus exact Whitten-to-Riverton trip evidence. The app uses minimum-only scoring because the 300 cfs floor is community guidance rather than an official manager-published paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official day-float shape",
        "value": "Whitten to Riverton, about 8 miles",
        "note": "The Forest Service says Whitten is a popular launch/take-out and specifically notes visitors travelling downriver 8 miles from Whitten to Riverton.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Whitten River Access",
        "note": "The Forest Service lists Whitten as open, located on the right bank, with a vault toilet, single-lane concrete boat ramp, parking for vehicles with trailers, and coordinates 36.732356, -91.214837.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Riverton East River Access",
        "note": "The Forest Service lists Riverton East as open and 7.6 miles downriver of Whitten, with a paved road, concrete boat ramp, parking, canoe launch, vault toilet, no fee, and coordinates 36.649183, -91.199614.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 07071500",
        "note": "USGS operates Eleven Point River near Bardley, MO, downstream in the same lower Eleven Point corridor; American Whitewater also ties the broader Highway 19-to-Highway 160 reach to the Bardley gauge.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge good beginning at 300 cfs and includes Whitten-to-Riverton trip evidence at 644 cfs where the paddler notes the water was just high enough to carry nearly every riffle without hitting rocks.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Shoals, cold water, Halls Bay",
        "note": "Forest Service river-mile notes call out Conner Chute, Boze Mill Spring, and Halls Bay, where the river divides and the right channel is best above normal water while the left is a tricky shallow S-curve with swift water.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Whitten River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Riverton East River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "American Whitewater Eleven Point",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3007/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-whitten-narrows",
    "slug": "eleven-point-river-whitten-narrows",
    "name": "Eleven Point River",
    "reach": "Whitten River Access to Highway 142 River Access",
    "aliases": [
      "Eleven Point River - Whitten to Narrows",
      "Eleven Point River - Whitten to Highway 142",
      "Lower Eleven Point - Whitten to The Narrows"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long lower Eleven Point continuation from Whitten to The Narrows, linking the classic Riverton segment with the last public access in the scenic-river corridor.",
    "statusText": "Use the Eleven Point near Bardley gauge as a conservative low-water check. Around 300 cfs remains the floor; below that, expect shallow shoals, slower travel, and a longer day to the last scenic-river access. No exact high-water cutoff is claimed.",
    "latitude": 36.732356,
    "longitude": -91.214837,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "cold_water",
        "fast_rise",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "This long lower-Eleven Point route runs past Riverton to the last Forest Service access in the scenic-river corridor, so missing the Narrows take-out materially changes the day.",
        "Shoals, fresh wood, Halls Bay, thunderstorms, and cold spring-fed water can turn an otherwise easy run into a much slower commitment.",
        "Use the named Forest Service accesses only. The Narrows is the last scenic-river access above Arkansas, and private banks between public accesses are not substitutes."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and adjacent lower Eleven Point trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The lower Eleven Point is spring-fed and often floatable beyond the wettest months, but the Forest Service still warns that the river can rise rapidly after storms. Use extra margin for this longer continuation to the last scenic-river access.",
      "difficulty": "moderate",
      "difficultyNotes": "This is generally Class I spring-fed Ozark water, but the route is substantially longer than the classic Whitten-to-Riverton split. Expect shoals, Halls Bay, wind on wider lower stretches, cold water, and limited developed exits below Riverton.",
      "confidenceNotes": "Confidence is good for a conservative lower-Eleven Point continuation: current Forest Service pages still show Whitten and Highway 142 open with published coordinates, Whitten still documents the 8-mile float to Riverton, Highway 142 still documents the 8 to 8.7-mile Riverton-to-Narrows continuation, same-day USGS 07071500 returned official Bardley values during this run, and current Rivers.MOHERP Bardley rows still support the familiar 300 cfs minimum-only floor through exact adjacent trip evidence. The app keeps the threshold model conservative because the numeric support remains community-calibrated rather than an official paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Whitten to Highway 142, about 16.3 to 16.7 miles",
        "note": "The Forest Service Whitten page says visitors travel about 8 miles from Whitten to Riverton, and the Highway 142 page says The Narrows is 8.7 miles downriver of Riverton and is the last scenic-river access.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Whitten River Access",
        "note": "The Forest Service lists Whitten as open on the right bank, with a vault toilet, single-lane concrete boat ramp, parking for vehicles with trailers, and coordinates 36.732356, -91.214837.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Highway 142 River Access / The Narrows",
        "note": "The Forest Service lists Highway 142 as open, developed, and day-use only, with a single-lane concrete boat ramp, paved parking, vault toilet, and coordinates 36.550194, -91.191532.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access"
      },
      {
        "label": "Gauge check",
        "value": "USGS 07071500 at 524 cfs / 2.68 ft",
        "note": "A same-day Water Services IV refresh returned 524 cfs and 2.68 ft at 2026-07-11 13:30 CDT for Eleven Point River near Bardley, the direct same-river gauge already used by adjacent Eleven Point routes.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs, and exact adjacent Whitten-to-Riverton rows plus the existing lower-Eleven route practice support keeping only that conservative floor. The app does not infer an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Halls Bay, lower bluffs, last scenic-river access",
        "note": "Forest Service river-mile notes call out Halls Bay, the widening lower valley below Boze Mill Spring, and Highway 142 as the last access before the river continues toward Arkansas.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Whitten River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/whitten-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Riverton East River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Highway 142 River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "MDC Eleven Point River prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "eleven-point-river-riverton-narrows",
    "slug": "eleven-point-river-riverton-narrows",
    "name": "Eleven Point River",
    "reach": "Riverton East River Access to Highway 142 River Access",
    "aliases": [
      "Eleven Point River - Riverton to Narrows",
      "Eleven Point River - Riverton East to Narrows",
      "Eleven Point River - Highway 160 to Highway 142"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Lower Eleven Point day float from Riverton East to the Highway 142 / Narrows access. Forest Service sources identify the exact 8-plus-mile route, both endpoints are developed public accesses, and the Bardley USGS gauge gives the same conservative low-water check used by adjacent Eleven Point routes.",
    "statusText": "Use the Eleven Point near Bardley gauge. Around 300 cfs is the conservative low-water floor; below that, expect shallow shoals and a slower trip. No ideal range or upper cutoff is claimed, so treat high or rising water as a caution flag.",
    "latitude": 36.649183,
    "longitude": -91.199614,
    "gaugeSource": {
      "id": "usgs-07071500",
      "provider": "usgs",
      "siteId": "07071500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Eleven Point River near Bardley, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bardley gauge rating and adjacent lower-Eleven-Point trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The Forest Service lists this access corridor for year-round use, but the National Rivers Project frames Riverton East to Narrows as generally spring and early-June floatable. Use the app as a conservative level check and expect late-summer shoals to need more patience.",
      "difficulty": "moderate",
      "difficultyNotes": "National Rivers Project describes the Eleven Point as relatively easy Class I-II water for experienced canoeists. This lower reach has cold spring-fed water, a full-day distance, bluffs, shoals, wood, possible motor traffic under the 25 hp limit, and limited developed exits between public accesses.",
      "confidenceNotes": "Confidence is good for a conservative adjacent Missouri add: Forest Service pages list Riverton East and Highway 142 / Narrows as open public accesses with coordinates, concrete ramps, parking, toilets, day-use rules, and an explicit Riverton-to-Highway-142 float route; National Rivers Project independently records Riverton East to Narrows as an 8.7-mile full-day water-trail section managed by the Forest Service; USGS 07071500 is the same direct lower Eleven Point gauge already used by adjacent V2 routes and exposed fresh discharge and gage-height observations during this run. The app uses minimum-only scoring because the numeric threshold source is community-calibrated and not a manager-published paddling band for this exact lower split."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Riverton to Highway 142, 8 to 8.7 miles",
        "note": "The Forest Service says floaters can put in at Riverton and float to Highway 142 Access for take-out, and says Highway 142 / Narrows is 8.7 miles downriver of Riverton.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access"
      },
      {
        "label": "Public put-in",
        "value": "Riverton East River Access",
        "note": "The Forest Service lists Riverton East as open on river left at Highway 160, with a paved road, single-lane concrete boat ramp, canoe launch, parking, vault toilet, no fee, and coordinates 36.649183, -91.199614.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access"
      },
      {
        "label": "Public take-out",
        "value": "Highway 142 River Access / The Narrows",
        "note": "The Forest Service lists Highway 142 River Access as open, developed, and day-use only, with a single-lane concrete boat ramp, paved parking, vault toilet, and coordinates 36.550194, -91.191532.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 07071500",
        "note": "USGS operates Eleven Point River near Bardley, MO. During the June 4, 2026 route-quality audit, the legacy current page showed 493 cfs and 2.62 ft at 10:30 CDT, with discharge and gage height available through June 4.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bardley gauge Good beginning at 300 cfs. Adjacent Eleven Point V2 routes use the same conservative floor with exact lower-river trip evidence, but this route does not infer an ideal range or high cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168"
      },
      {
        "label": "Route character",
        "value": "Full-day water trail, bluffs, spring-fed current",
        "note": "National Rivers Project records Riverton East to Narrows as an 8.7-mile full-day water-trail section, Class I-II for experienced canoeists, with snags, trees, root wads, motorboats, and cold-water distance caveats.",
        "sourceUrl": "https://www.nationalriversproject.com/mo/eleven-point-river-riverton-east-to-narrows"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Highway 142 River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/highway-142-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Riverton East River Access",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/riverton-east-river-access",
        "provider": "local"
      },
      {
        "label": "Forest Service Eleven Point National Wild and Scenic River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/eleven-point-national-wild-and-scenic-river",
        "provider": "local"
      },
      {
        "label": "National Rivers Project Riverton East to Narrows",
        "url": "https://www.nationalriversproject.com/mo/eleven-point-river-riverton-east-to-narrows",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Eleven Point Bardley gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07071500&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07071500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07071500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07071500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07071500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-fork-white-river-north-fork-blair",
    "slug": "north-fork-white-river-north-fork-blair",
    "name": "North Fork of the White River",
    "reach": "North Fork Recreation Area to Blair Bridge Access",
    "aliases": [
      "North Fork River - Hammond Camp to Blair Bridge",
      "North Fork White River - Hammond to Blair",
      "Northfork River - North Fork to Blair Bridge"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Spring-fed North Fork day float from the Forest Service North Fork Recreation Area, also known as Hammond Camp, to MDC Blair Bridge Access, with bluffs, cold water, Blue Spring, The Falls, and a downstream Tecumseh gauge used conservatively.",
    "statusText": "There is not a gauge on this exact North Fork reach, so Paddle Today uses the downstream Tecumseh gauge as a rough level check. Around 300 cfs is the low-water marker; below that, expect more dragging and a slower day. Rising or high water deserves extra caution at The Falls, shoals, bends, and strainers.",
    "latitude": 36.758606,
    "longitude": -92.152801,
    "gaugeSource": {
      "id": "usgs-07057500",
      "provider": "usgs",
      "siteId": "07057500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "North Fork River near Tecumseh, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07057500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Tecumseh gauge rating and Hammond-to-Blair trip logs",
        "url": "https://rivers.moherp.org/gauge/?gauge=7057500&hours=2190",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The Forest Service says the North Fork-to-Blair section can be floated all year, but shallow summer water, cold spring flow, rain pulses, and post-storm wood can still change the trip quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a popular Ozark float, but it is not a flat pool route. Expect swift riffles, cold spring water, shoals, and The Falls, which the Forest Service describes as an average two-foot drop about 7 miles below North Fork Recreation Area.",
      "confidenceNotes": "Confidence is good for a conservative proxy-gauge Missouri add: the Forest Service lists North Fork Recreation Area as open, publishes coordinates and boat-access details, and explicitly says Blair Bridge is the take-out about 10 river miles downstream; MDC confirms Blair Bridge as public floating access with a concrete boat ramp; USGS 07057500 is a standard live North Fork gauge downstream at Tecumseh; and Rivers.MOHERP includes exact Hammond Camp-to-Blair Bridge trip evidence at 368 cfs plus broader North Fork trip ratings. The app uses minimum-only scoring because the gauge is downstream and community-calibrated rather than an official reach-specific paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "North Fork Recreation Area to Blair Bridge, about 10 river miles",
        "note": "The Forest Service says access south of North Fork is at Blair Bridge, operated by MDC, about 10 miles by river, and says this section can be floated all year.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/north-fork-recreation-area"
      },
      {
        "label": "Public put-in",
        "value": "North Fork Recreation Area / Hammond Camp",
        "note": "The Forest Service lists the site as open, with a boat access area, day-use parking, a concrete ramp to a stepped river entry, and coordinates 36.758606, -92.152801.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/north-fork-recreation-area"
      },
      {
        "label": "Public take-out",
        "value": "Blair Bridge Access",
        "note": "MDC says Blair Bridge Access offers fishing and floating access to the North Fork of the White River, with picnic tables, privy, campfire rings, and a concrete boat ramp.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/blair-bridge-access"
      },
      {
        "label": "Proxy gauge",
        "value": "USGS 07057500",
        "note": "USGS operates the North Fork River near Tecumseh gauge downstream of Blair Bridge. It is a same-river live gauge, but it is still a downstream proxy rather than a gauge inside the North Fork-to-Blair reach.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07057500/"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Tecumseh gauge good at 120 cfs and above, but the app uses a more conservative 300 cfs floor because the exact Hammond Camp-to-Blair Bridge trip was logged good at 368 cfs and the gauge is downstream.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=7057500&hours=2190"
      },
      {
        "label": "Route character",
        "value": "Cold spring flow, Blue Spring, The Falls",
        "note": "The Forest Service notes multiple springs, Blue Spring near the route, and The Falls about 7 miles downriver, with an average two-foot drop on the way to Blair Bridge.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/north-fork-recreation-area"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service North Fork Recreation Area",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/north-fork-recreation-area",
        "provider": "local"
      },
      {
        "label": "MDC Blair Bridge Access",
        "url": "https://mdc.mo.gov/discover-nature/places/blair-bridge-access",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Northfork Tecumseh gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=7057500&hours=2190",
        "provider": "local"
      },
      {
        "label": "USGS 07057500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07057500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "niangua-river-bennett-spring-barclay",
    "slug": "niangua-river-bennett-spring-barclay",
    "name": "Niangua River",
    "reach": "Bennett Spring Access to Barclay Conservation Area",
    "aliases": [
      "Niangua River - Bennett Spring to Barclay",
      "Niangua River - Bennett Spring Access to Barclay CA",
      "Niangua River Windyville gauge day float"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Short spring-fed Niangua day float from Bennett Spring Access to Barclay Conservation Area. Both ends are public, MoHERP has exact-trip gauge evidence, and the upstream Windyville USGS gauge gives a conservative level check.",
    "statusText": "Use the Niangua River at Windyville gauge as an upstream proxy. Around 40 cfs is the conservative low-water floor for this short Bennett Spring-to-Barclay run; below that, expect more scraping and slow riffles. No ideal range or upper cutoff is claimed, so treat high or rising water cautiously.",
    "latitude": 37.733683,
    "longitude": -92.861233,
    "gaugeSource": {
      "id": "usgs-06923250",
      "provider": "usgs",
      "siteId": "06923250",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Niangua River at Windyville, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06923250/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 40,
      "thresholdSource": {
        "label": "Rivers.MOHERP Windyville gauge Bennett Spring-to-Barclay trip logs",
        "url": "https://rivers.moherp.org/gauge/?gauge=06923250&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The Bennett Spring area adds dependable cold spring influence, but the Niangua still gets shallow in dry spells and can rise after Ozark storms. Summer weekends can be crowded around the park and private access corridor.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a popular Class I-II Ozark float, not a technical route, but swift riffles, cold spring water, private-bank limits, crowding, and fast post-rain changes keep it from being a no-caution beginner listing.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: MDC confirms Bennett Spring Access as public Niangua River float-fishing access with a large parking lot, concrete boat ramp, and privies; Missouri State Parks publishes the Bennett Spring boat-launch coordinate; MDC confirms Barclay Conservation Area provides public Niangua River access with a concrete boat ramp, canoe launching area, and parking; Float Missouri / MDC mile notes place Bennett Spring Access at river mile 30.2 and Barclay at 36.5; USGS 06923250 continues to expose recent official discharge and gage-height values; and Rivers.MOHERP includes exact Bennett Spring-to-Barclay trip rows tied to that gauge. The app uses minimum-only scoring because the gauge is upstream of the route and before Bennett Spring Branch inflow, and the numeric threshold support is community-calibrated rather than an official paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "Bennett Spring Access to Barclay, about 6.3 river miles",
        "note": "Float Missouri republishes MDC Niangua mile notes that place Bennett Spring Access at river mile 30.2 and Barclay Conservation Area access at river mile 36.5.",
        "sourceUrl": "https://www.floatmissouri.com/plan/missouri-rivers/niangua-river/"
      },
      {
        "label": "Public put-in",
        "value": "Bennett Spring Access / Bennett Spring boat launch",
        "note": "MDC says Bennett Spring Access provides wade and float-fishing access to the Niangua River, with a large parking lot, concrete boat ramp, and multiple privies. Missouri State Parks publishes the canoe-launch coordinate as 37.733683, -92.861233.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/bennett-spring-access"
      },
      {
        "label": "Public take-out",
        "value": "Barclay Conservation Area Access",
        "note": "MDC says Barclay Conservation Area was purchased to provide public access to the Niangua River and that Barclay CA Access has a concrete boat ramp, canoe launching area, and parking lot.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/barclay-conservation-area"
      },
      {
        "label": "Proxy live gauge",
        "value": "USGS 06923250",
        "note": "USGS operates the Niangua River at Windyville gauge upstream of Bennett Spring. The legacy current page showed 393 cfs and 2.49 ft at 09:00 CDT on June 3, 2026 during the June 4 route-quality audit.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06923250"
      },
      {
        "label": "Low-water floor",
        "value": "40 cfs minimum-only",
        "note": "Rivers.MOHERP exact Bennett Spring-to-Barclay rows on the Windyville gauge are mixed at very low water, including a Low trip at 36 cfs and Good trips below and above 40 cfs. The app uses a conservative 40 cfs floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06923250&hours=168"
      },
      {
        "label": "Route character",
        "value": "Class I-II, cold spring influence, busy summer corridor",
        "note": "Float Missouri / MDC describes the Niangua as Class I-II, closely tied to Bennett Spring, and usually crowded on hot summer weekends.",
        "sourceUrl": "https://www.floatmissouri.com/plan/missouri-rivers/niangua-river/"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Bennett Spring Access",
        "url": "https://mdc.mo.gov/discover-nature/places/bennett-spring-access",
        "provider": "local"
      },
      {
        "label": "Missouri State Parks Bennett Spring boat launch",
        "url": "https://mostateparks.com/key-location/boat-launch-bennett-spring",
        "provider": "local"
      },
      {
        "label": "MDC Barclay Conservation Area",
        "url": "https://mdc.mo.gov/discover-nature/places/barclay-conservation-area",
        "provider": "local"
      },
      {
        "label": "MDC Barclay Conservation Area map",
        "url": "https://mdc.mo.gov/sites/default/files/mo_nature/downloads/conservation-areas/9728map.pdf",
        "provider": "local"
      },
      {
        "label": "Float Missouri Niangua mile notes",
        "url": "https://www.floatmissouri.com/plan/missouri-rivers/niangua-river/",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Niangua Windyville gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=06923250&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 06923250 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06923250/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "pomme-de-terre-river-outlet-cross-timbers",
    "slug": "pomme-de-terre-river-outlet-cross-timbers",
    "name": "Pomme de Terre River",
    "reach": "Outlet Park to Cross Timbers Access",
    "aliases": [
      "Pomme de Terre River - Outlet Park to Cross Timbers",
      "Lower Pomme de Terre River - below dam to Cross Timbers",
      "Pomme de Terre River Hermitage gauge route"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Lower Pomme de Terre day float from Outlet Park below the dam to Cross Timbers Access. USACE publishes the floating release guidance, and the Hermitage USGS gauge is the direct corridor check when current observations are available.",
    "statusText": "Use the Pomme de Terre River near Hermitage gauge. USACE says optimal floating is when the lake is releasing 100 to 800 cfs into the river; below 100 cfs, expect low-water problems, and above 800 cfs the river can rise suddenly and turn turbulent.",
    "latitude": 37.906056,
    "longitude": -93.328917,
    "gaugeSource": {
      "id": "usgs-06921350",
      "provider": "usgs",
      "siteId": "06921350",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Pomme de Terre River near Hermitage, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06921350/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam_release",
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a dam-release route below Pomme de Terre Dam; verify fresh USACE/USGS release conditions before launching.",
        "High or changing releases can cause sudden rises, turbulence, stronger current, and harder take-out conditions.",
        "Flood debris, strainers, rural access roads, reservoir backwater, limited services, and private land require current local verification."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 800,
      "tooLow": 100,
      "tooHigh": 800,
      "thresholdSource": {
        "label": "USACE Pomme de Terre River Adventures floating release guidance",
        "url": "https://usace.contentdm.oclc.org/digital/api/collection/p16021coll11/id/2754/download",
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
      "seasonNotes": "Summer is the main paddling season, but the route depends heavily on dam releases. Check the USGS gauge, USACE lake information, weather, and same-day ramp conditions before committing.",
      "difficulty": "easy",
      "difficultyNotes": "The lower Pomme de Terre is usually described as a gentle Class I river, but dam releases can create sudden rises, turbulence, stronger landings, and floating debris. Treat values above the USACE optimal window as a no-go for casual paddlers.",
      "confidenceNotes": "Confidence is high enough for a conservative add: USACE says Outlet Park has a no-fee boat ramp accessing the Pomme de Terre River below the dam, lists Outlet Park and Cross Timbers as public-use river access points, and publishes the 100-800 cfs optimal floating guidance; MDC confirms Cross Timbers Access is a public Pomme de Terre River access with a boat ramp and parking; Float Missouri / MDC mile notes place the below-dam put-in and Cross Timbers in a 13.6-mile lower-river segment; and USGS 06921350 exposed same-day June 1, 2026 discharge and gage-height observations during the add review. The main caveats are operational and freshness-related: this is a dam-release route, the gauge can lag in visible current-condition output, and the app uses the official release window exactly without claiming a wider runnable range."
    },
    "evidenceNotes": [
      {
        "label": "Official release window",
        "value": "100-800 cfs",
        "note": "USACE says canoeing and kayaking are popular during summer and that optimal floating conditions are when Pomme de Terre Lake is releasing 100 to 800 cfs into the river. It also warns that high release rates can cause sudden rise and turbulence.",
        "sourceUrl": "https://usace.contentdm.oclc.org/digital/api/collection/p16021coll11/id/2754/download"
      },
      {
        "label": "Route shape",
        "value": "Below-dam put-in to Cross Timbers, about 13.6 river miles",
        "note": "Float Missouri republishes MDC mile notes that place the lower-river put-in at the west-side campsite below the dam and Cross Timbers public-use area access at river mile 13.6.",
        "sourceUrl": "https://www.floatmissouri.com/missouri-rivers/pomme-de-terre-river/"
      },
      {
        "label": "Public put-in",
        "value": "Outlet Park / Outlet Boat Ramp",
        "note": "USACE says the Outlet Boat Ramp is within Outlet Park, accesses the Pomme de Terre River below the dam, has bathrooms within walking distance, and does not charge a boat-launch fee.",
        "sourceUrl": "https://www.nwk.usace.army.mil/Locations/District-Lakes/Pomme-de-Terre-Lake/"
      },
      {
        "label": "Public take-out",
        "value": "Cross Timbers Access",
        "note": "MDC says Cross Timbers Access is leased from USACE to provide Pomme de Terre River access, with a boat ramp and parking lot.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/cross-timbers-access"
      },
      {
        "label": "Cross Timbers management plan",
        "value": "Managed for public river access",
        "note": "The MDC Cross Timbers and Hermitage Accesses management plan says Cross Timbers is managed to provide public access to the Pomme de Terre River and lists a concrete ramp, privy, parking, and camping site.",
        "sourceUrl": "https://mdc.mo.gov/sites/default/files/2020-12/2017%20Cross%20Timbers%20and%20Hermitage%20Accesses%20Area%20Plan.pdf"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 06921350",
        "note": "USGS operates the Pomme de Terre River near Hermitage gauge in the route corridor. The legacy current page showed 1,570 cfs and 6.37 ft at 08:45 CDT on June 1, 2026 during add review, which is above the USACE optimal floating window; a June 4 audit still found that as the most recent visible legacy value, so same-day freshness must be verified before relying on the gauge.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06921350"
      }
    ],
    "sourceLinks": [
      {
        "label": "USACE Pomme de Terre River Adventures brochure",
        "url": "https://usace.contentdm.oclc.org/digital/api/collection/p16021coll11/id/2754/download",
        "provider": "local"
      },
      {
        "label": "USACE Pomme de Terre Lake recreation page",
        "url": "https://www.nwk.usace.army.mil/Locations/District-Lakes/Pomme-de-Terre-Lake/",
        "provider": "local"
      },
      {
        "label": "MDC Cross Timbers Access",
        "url": "https://mdc.mo.gov/discover-nature/places/cross-timbers-access",
        "provider": "local"
      },
      {
        "label": "MDC Cross Timbers and Hermitage Accesses management plan",
        "url": "https://mdc.mo.gov/sites/default/files/2020-12/2017%20Cross%20Timbers%20and%20Hermitage%20Accesses%20Area%20Plan.pdf",
        "provider": "local"
      },
      {
        "label": "Float Missouri Pomme de Terre mile notes",
        "url": "https://www.floatmissouri.com/missouri-rivers/pomme-de-terre-river/",
        "provider": "local"
      },
      {
        "label": "USGS 06921350 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06921350/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-fork-white-river-blair-dawt",
    "slug": "north-fork-white-river-blair-dawt",
    "name": "North Fork of the White River",
    "reach": "Blair Bridge Access to Dawt Mill",
    "aliases": [
      "North Fork River - Blair Bridge to Dawt Mill",
      "North Fork White River - Blair to Dawt",
      "Northfork River - Blair Bridge to Dawt"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Lower North Fork day float from MDC Blair Bridge Access to private-fee Dawt Mill Resort. This is a spring-fed Ozark reach with riffles, private-bank discipline, a low dam/bridge finish, and a downstream Tecumseh gauge used conservatively.",
    "statusText": "Use the North Fork River near Tecumseh gauge as a downstream proxy. Around 300 cfs is the conservative low-water floor; below that, expect more dragging and slow shoals. Rising or high water deserves extra caution at Blair Bridge, Dawt Mill Dam, the Dawt low-water bridge, riffles, and strainers.",
    "latitude": 36.65403,
    "longitude": -92.22959,
    "gaugeSource": {
      "id": "usgs-07057500",
      "provider": "usgs",
      "siteId": "07057500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "North Fork River near Tecumseh, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07057500/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise"
      ],
      "safetyNotes": [
        "Dawt Mill Dam, the low-water bridge, swift riffles, root wads, and strainers make high or rising water consequential.",
        "Dawt Mill is a private resort take-out; confirm current permission, fees, shuttle, parking, and landing conditions before launch.",
        "The Tecumseh gauge is a supported downstream proxy, not a perfect in-reach reading for every shoal or backwater condition."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Tecumseh gauge rating and Blair-to-Dawt trip logs",
        "url": "https://rivers.moherp.org/gauge/?gauge=7057500&hours=2190",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Dawt Mill says floating is available year-round with advance reservation, but North Fork conditions still vary with spring flow, rain pulses, Norfork Lake backwater, summer traffic, and post-storm wood.",
      "difficulty": "moderate",
      "difficultyNotes": "The normal route is a popular Ozark float, but it includes swift riffles, cold spring-fed water, Blair Bridge current, Dawt Mill Dam, a low-water bridge, possible lake-backwater effects, and private-bank limits. It is not a casual no-scout route at high or rising levels.",
      "confidenceNotes": "Confidence is good for a conservative private-fee Missouri add: MDC confirms Blair Bridge Access as public floating access, Dawt Mill publicly offers floating with direct river access and upstream shuttle service back to the resort, Float Missouri / MDC reprint mile notes place Blair Bridge and Dawt Mill in a 7.6-mile lower North Fork day reach, USGS 07057500 exposed same-day May 31, 2026 discharge and gage-height observations during review, and Rivers.MOHERP includes exact Blair-to-Dawt good-condition rows at 428 and 811 cfs. The app uses minimum-only scoring because the gauge is downstream near Tecumseh and the numeric threshold support is community-calibrated rather than an official paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "Blair Bridge to Dawt, about 7.6 river miles",
        "note": "Float Missouri republishes MDC North Fork mile notes that place Blair Bridge Access at river mile 39.4 and Dawt Mill / Dawt Bridge at river mile 47.0-47.1; MoHERP exact Blair-to-Dawt trip rows list 7.6 miles.",
        "sourceUrl": "https://www.floatmissouri.com/plan/missouri-rivers/north-fork/"
      },
      {
        "label": "Public put-in",
        "value": "MDC Blair Bridge Access",
        "note": "MDC says Blair Bridge Access offers fishing and floating access to the North Fork of the White River, with picnic tables, privy, campfire rings, and a concrete boat ramp.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/blair-bridge-access"
      },
      {
        "label": "Private-fee take-out",
        "value": "Dawt Mill Resort",
        "note": "Dawt Mill says it offers floating and lodging, direct river access, and transportation upstream so groups can float back to their vehicle or lodging at the resort. Use this route only with current permission, reservation, or fee terms.",
        "sourceUrl": "https://dawtmill.com/"
      },
      {
        "label": "Proxy gauge",
        "value": "USGS 07057500",
        "note": "USGS operates the North Fork River near Tecumseh gauge downstream of Dawt Mill. It showed same-day May 31, 2026 values of 1,220 cfs and 3.50 ft at 15:00 CDT during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07057500"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Tecumseh gauge good beginning at 120 cfs and includes exact Blair-to-Dawt good rows at 428 and 811 cfs. The app keeps the same conservative 300 cfs floor used for adjacent North Fork coverage rather than claiming an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=7057500&hours=2190"
      },
      {
        "label": "Hazards",
        "value": "Blair Bridge, Dawt Mill Dam, low-water bridge",
        "note": "Float Missouri / MDC mile notes warn to approach Blair Bridge cautiously, describe Dawt Mill Dam as a canoe-buster unless handled correctly, and warn that going under Dawt Bridge in high water is dangerous.",
        "sourceUrl": "https://www.floatmissouri.com/plan/missouri-rivers/north-fork/"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Blair Bridge Access",
        "url": "https://mdc.mo.gov/discover-nature/places/blair-bridge-access",
        "provider": "local"
      },
      {
        "label": "Dawt Mill Resort",
        "url": "https://dawtmill.com/",
        "provider": "local"
      },
      {
        "label": "Float Missouri North Fork mile notes",
        "url": "https://www.floatmissouri.com/plan/missouri-rivers/north-fork/",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Northfork Tecumseh gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=7057500&hours=2190",
        "provider": "local"
      },
      {
        "label": "USGS 07057500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07057500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "meramec-river-scotts-ford-riverview",
    "slug": "meramec-river-scotts-ford-riverview",
    "name": "Meramec River",
    "reach": "Scotts Ford Access to Riverview Access",
    "aliases": [
      "Meramec River - Scott's Ford to Riverview",
      "Upper Meramec - Scotts Ford to Riverview",
      "Meramec River Steelville gauge public access route"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Seven-mile upper Meramec day float between two MDC public accesses near Steelville. MDC names the exact canoe-float pair, and the Steelville USGS gauge gives a direct same-river level check.",
    "statusText": "Use the Meramec River near Steelville gauge. Below about 340 cfs, expect shallow riffles, dragging, and a slower trip. No ideal range or high-water cutoff is claimed, so treat rising water and storms cautiously.",
    "latitude": 37.9783,
    "longitude": -91.4563,
    "gaugeSource": {
      "id": "usgs-07013000",
      "provider": "usgs",
      "siteId": "07013000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Meramec River near Steelville, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07013000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 343,
      "thresholdSource": {
        "label": "Rivers.MOHERP Steelville gauge bands and upper Meramec trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07013000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The spring-fed upper Meramec is commonly floated in spring through fall, but it can still get shallow during dry spells. Recent rain can quickly add current, cloudy water, fresh wood, and harder landings at these small access areas.",
      "difficulty": "easy",
      "difficultyNotes": "This is a mainstream Ozark recreational float with pools, riffles, gravel bars, bluffs, and occasional wood. It is an easy route only at ordinary stable levels; high or rising water is not beginner water.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: MDC confirms both Scotts Ford and Riverview as public Meramec River access areas, MDC planning material explicitly says the canoe float from Scotts Ford Access to Riverview Access is 7 miles, USGS 07013000 exposed same-day May 31, 2026 discharge and gage-height observations during review, and Rivers.MOHERP publishes Steelville-gauge bands plus nearby upper-Meramec trip evidence. The app uses only the conservative start of the MoHERP Low band as a minimum floor and does not claim an ideal range or upper cutoff."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Scotts Ford to Riverview, 7 miles",
        "note": "MDC planning material for Riverview Access says a canoe float from Scotts Ford Access to Riverview Access is 7 miles.",
        "sourceUrl": "https://mdc.mo.gov/sites/default/files/2020-12/2016%20St.%20Louis%20Region%20Southern%20Small%20River%20Accesses%20Area%20Plan.pdf"
      },
      {
        "label": "Public put-in",
        "value": "MDC Scotts Ford Access",
        "note": "MDC lists Scotts Ford Access as a public department area on the Meramec River, with area hours, directions from Steelville, parking, and river-access map material.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/scotts-ford-access"
      },
      {
        "label": "Public take-out",
        "value": "MDC Riverview Access",
        "note": "MDC says Riverview Access provides fishing and boat access to the Meramec River, with a concrete boat ramp and parking lot described in MDC planning material.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/riverview-access"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07013000",
        "note": "USGS Meramec River near Steelville showed same-day May 31, 2026 discharge and gage-height observations, including 358 cfs and 1.84 ft at 02:15 CDT during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07013000"
      },
      {
        "label": "Low-water floor",
        "value": "343 cfs minimum-only",
        "note": "Rivers.MOHERP Steelville gauge bands put the start of Low near 343 cfs and the start of Good near 543 cfs. The app uses the start of Low as a conservative floor and does not infer a preferred range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07013000&hours=168"
      },
      {
        "label": "Nearby trip evidence",
        "value": "Upper Meramec rows at 200-420 cfs",
        "note": "Rivers.MOHERP includes nearby upper-Meramec rows on the Steelville gauge, including Scott's Ford-to-Indian Springs at 200 cfs and Riverview-to-MO 19 at 420 cfs, both rated good. Those rows support the gauge relationship but are not used to claim an ideal range for this exact route.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07013000&hours=168"
      },
      {
        "label": "High-water caution",
        "value": "No shipped upper cutoff",
        "note": "Rivers.MOHERP describes high water as potentially dangerous for young or inexperienced paddlers and flood water as avoidable for casual trips. This route should be skipped on rising or storm-swollen water even though the app does not claim a numeric high cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07013000&hours=168"
      },
      {
        "label": "Coordinate anchors",
        "value": "37.9783, -91.4563 to 37.9924, -91.4255",
        "note": "The Paddling Hub publishes access coordinates while MDC supplies the public-access authority. Mapcarta / OpenStreetMap independently places the Scotts Ford slipway at essentially the same put-in coordinate.",
        "sourceUrl": "https://thepaddlinghub.com/directory/missouri/scotts-ford-access"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC St. Louis Region southern small river accesses plan",
        "url": "https://mdc.mo.gov/sites/default/files/2020-12/2016%20St.%20Louis%20Region%20Southern%20Small%20River%20Accesses%20Area%20Plan.pdf",
        "provider": "local"
      },
      {
        "label": "MDC Scotts Ford Access",
        "url": "https://mdc.mo.gov/discover-nature/places/scotts-ford-access",
        "provider": "local"
      },
      {
        "label": "MDC Scotts Ford Access map",
        "url": "https://mdc.mo.gov/media/79842",
        "provider": "local"
      },
      {
        "label": "MDC Riverview Access",
        "url": "https://mdc.mo.gov/discover-nature/places/riverview-access",
        "provider": "local"
      },
      {
        "label": "MDC Riverview Access map",
        "url": "https://mdc.mo.gov/sites/default/files/mo_nature/downloads/conservation-areas/6904map.pdf",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Meramec Steelville gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07013000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07013000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07013000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07013000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07013000",
        "provider": "usgs"
      },
      {
        "label": "Scotts Ford Access coordinate record",
        "url": "https://thepaddlinghub.com/directory/missouri/scotts-ford-access",
        "provider": "local"
      },
      {
        "label": "Riverview Access coordinate record",
        "url": "https://thepaddlinghub.com/directory/missouri/riverview-access",
        "provider": "local"
      }
    ]
  },
  {
    "id": "meramec-river-onondaga-campbell-bridge",
    "slug": "meramec-river-onondaga-campbell-bridge",
    "name": "Meramec River",
    "reach": "Onondaga Cave State Park to Campbell Bridge Access",
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Five-mile Meramec float from the Onondaga Cave State Park canoe launch to MDC Campbell Bridge Access. Missouri State Parks and MDC document the public access pair, and the Sullivan USGS gauge supports a conservative same-day level check.",
    "statusText": "Use the Meramec River near Sullivan gauge. Around 200 cfs is the conservative low-water floor; below that, expect shallow riffles and dragging. Rising water deserves extra caution, and MoHERP marks high and flood stages as unsuitable for casual trips.",
    "latitude": 38.059859,
    "longitude": -91.221584,
    "gaugeSource": {
      "id": "usgs-07014500",
      "provider": "usgs",
      "siteId": "07014500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Meramec River near Sullivan, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07014500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Rivers.MOHERP Sullivan gauge rating and Meramec trip logs",
        "url": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The spring-fed Meramec often supports warm-season floating, but low late-summer riffles, weekend traffic, and fast rain rises still matter. Check Onondaga Cave State Park status, MDC access conditions, and the same-day gauge trend before launching.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short Ozark mainstream float with normal riffles, gravel bars, bluffs, bends, and occasional wood. It is broadly approachable at ordinary levels, but high water can make obstacles, bridges, and the Campbell landing much less forgiving.",
      "confidenceNotes": "Confidence is good for a conservative add: Missouri State Parks confirms Onondaga Cave State Park has Meramec River canoe and boat access and publishes boat-launch coordinates, MDC planning material explicitly names Onondaga Cave State Park to Campbell Bridge Access as a 5-mile canoe float, MDC confirms Campbell Bridge has a concrete boat ramp, dedicated canoe launch, restroom, and parking, and USGS 07014500 is the same product-supported Sullivan gauge already used for the adjacent Meramec route. The app uses minimum-only scoring because the level source is community-calibrated rather than an official paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Onondaga Cave State Park to Campbell Bridge Access, 5 miles",
        "note": "MDC planning material for Campbell Bridge Access says a canoe float from Onondaga Cave State Park to Campbell Bridge Access is 5 miles.",
        "sourceUrl": "https://mdc.mo.gov/sites/default/files/2020-12/2016%20St.%20Louis%20Region%20Southern%20Small%20River%20Accesses%20Area%20Plan.pdf"
      },
      {
        "label": "Public put-in",
        "value": "Onondaga Cave State Park canoe launch / boat ramp",
        "note": "Missouri State Parks says paddlers can access the Meramec River from the park canoe launch or boat ramp, and its boat-launch page publishes coordinates for the Onondaga launch.",
        "sourceUrl": "https://mostateparks.com/park/onondaga-cave-state-park/boating"
      },
      {
        "label": "Public take-out",
        "value": "Campbell Bridge Access",
        "note": "MDC says Campbell Bridge Access provides Meramec River access with a concrete boat ramp, dedicated canoe launch, restroom, and ample parking.",
        "sourceUrl": "https://mdc.mo.gov/sites/default/files/2020-12/2016%20St.%20Louis%20Region%20Southern%20Small%20River%20Accesses%20Area%20Plan.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 07014500",
        "note": "USGS operates Meramec River near Sullivan, MO, the live Meramec gauge downstream in this route corridor and the same gauge already configured for the neighboring Sullivan-area Meramec route.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07014500/"
      },
      {
        "label": "Low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Sullivan gauge good beginning at 200 cfs and includes nearby Meramec trip logs rated good from roughly 294 to 543 cfs, with a low but floatable report at 238 cfs.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0"
      },
      {
        "label": "Current check",
        "value": "574 cfs / 3.38 ft at 2026-05-30 04:30",
        "note": "Rivers.MOHERP showed same-day Sullivan gauge data during this run, confirming the selected USGS gauge path is live for current route scoring. The app does not use that snapshot as a fixed recommendation.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0"
      },
      {
        "label": "High-water caution",
        "value": "High and flood categories are not casual-float water",
        "note": "Rivers.MOHERP describes high water as potentially dangerous for young or inexperienced paddlers and flood water as avoidable for casual trips because obstacles can be treacherous or deadly.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0"
      }
    ],
    "sourceLinks": [
      {
        "label": "Missouri State Parks Onondaga boating",
        "url": "https://mostateparks.com/park/onondaga-cave-state-park/boating",
        "provider": "local"
      },
      {
        "label": "Missouri State Parks Onondaga boat launch",
        "url": "https://mostateparks.com/key-location/boat-launch-onondaga",
        "provider": "local"
      },
      {
        "label": "MDC St. Louis Region southern small river accesses plan",
        "url": "https://mdc.mo.gov/sites/default/files/2020-12/2016%20St.%20Louis%20Region%20Southern%20Small%20River%20Accesses%20Area%20Plan.pdf",
        "provider": "local"
      },
      {
        "label": "MDC Campbell Bridge Access map",
        "url": "https://mdc.mo.gov/sites/default/files/mo_nature/downloads/conservation-areas/8402map.pdf",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Meramec Sullivan gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0",
        "provider": "local"
      },
      {
        "label": "USGS 07014500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07014500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "meramec-river-campbell-bridge-sappington-bridge",
    "slug": "meramec-river-campbell-bridge-sappington-bridge",
    "name": "Meramec River",
    "reach": "Campbell Bridge Access to Sappington Bridge Access",
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Ten-mile middle Meramec day float from MDC Campbell Bridge Access to MDC Sappington Bridge Access. MDC documents the access chain through Blue Springs Creek, and the Sullivan USGS gauge sits at the take-out corridor.",
    "statusText": "Use the Meramec River near Sullivan gauge. Around 200 cfs is the conservative low-water floor; below that, expect shallow riffles and dragging. Rising water deserves extra caution, and MoHERP marks high and flood stages as unsuitable for casual trips.",
    "latitude": 38.08113567,
    "longitude": -91.14989519,
    "gaugeSource": {
      "id": "usgs-07014500",
      "provider": "usgs",
      "siteId": "07014500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Meramec River near Sullivan, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07014500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Rivers.MOHERP Sullivan gauge rating and Meramec trip logs",
        "url": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The spring-fed Meramec often supports warm-season floating, but this is a longer ten-mile day between MDC accesses. Check same-day gauge trend, weather, access conditions, and whether the group has enough daylight before launching.",
      "difficulty": "easy",
      "difficultyNotes": "This is mainstream Ozark floating water with normal riffles, gravel bars, bends, bluffs, swimmers, anglers, and occasional wood. It is broadly approachable at ordinary levels, but the longer distance and high-water landings make it more committed than the neighboring five-mile segments.",
      "confidenceNotes": "Confidence is good for a conservative adjacent Meramec add: MDC planning material confirms Campbell Bridge and Sappington Bridge are public Meramec accesses with concrete ramps, dedicated canoe launches, parking, and restrooms; the same plan identifies Campbell Bridge to Blue Springs Creek as 5 miles and Blue Springs Creek to Sappington Bridge as another 5 miles; USGS 07014500 is the same product-supported Sullivan gauge already used by neighboring V2 Meramec routes; and Rivers.MOHERP showed current Sullivan data with a 200 cfs good-condition floor during review. The app uses minimum-only scoring because the level source is community-calibrated rather than an official paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Campbell Bridge to Sappington Bridge, about 10 miles",
        "note": "MDC planning material says continued floating from Campbell Bridge Access to Blue Springs Creek is 5 miles and from Blue Springs Creek to Sappington Bridge Access is another 5 miles.",
        "sourceUrl": "https://mdc.mo.gov/sites/default/files/2020-12/2016%20St.%20Louis%20Region%20Southern%20Small%20River%20Accesses%20Area%20Plan.pdf"
      },
      {
        "label": "Public put-in",
        "value": "Campbell Bridge Access",
        "note": "MDC says Campbell Bridge Access provides Meramec River access with a concrete boat ramp, dedicated canoe launch, restroom, and ample parking.",
        "sourceUrl": "https://mdc.mo.gov/sites/default/files/2020-12/2016%20St.%20Louis%20Region%20Southern%20Small%20River%20Accesses%20Area%20Plan.pdf"
      },
      {
        "label": "Public take-out",
        "value": "Sappington Bridge Access",
        "note": "MDC says Sappington Bridge Access provides Meramec River access with a concrete boat ramp, dedicated canoe launch, restroom, and parking.",
        "sourceUrl": "https://mdc.mo.gov/sites/default/files/2020-12/2016%20St.%20Louis%20Region%20Southern%20Small%20River%20Accesses%20Area%20Plan.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 07014500",
        "note": "USGS operates Meramec River near Sullivan, MO, the live Meramec gauge at the Sappington / Sullivan route corridor and the same gauge already configured for neighboring V2 routes.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07014500/"
      },
      {
        "label": "Low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Sullivan gauge good beginning at 200 cfs and includes a Campbell Bridge to Blue Springs Creek trip rated good at 506 cfs, plus nearby Meramec trip logs rated good from roughly 294 to 543 cfs.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0"
      },
      {
        "label": "Current check",
        "value": "574 cfs / 3.38 ft at 2026-05-30 16:30",
        "note": "Rivers.MOHERP showed same-day Sullivan gauge data during this run, supporting the same USGS gauge path already used for adjacent Meramec route scoring. The app does not use that snapshot as a fixed recommendation.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0"
      },
      {
        "label": "High-water caution",
        "value": "High and flood categories are not casual-float water",
        "note": "Rivers.MOHERP describes high water as potentially dangerous for young or inexperienced paddlers and flood water as avoidable for casual trips because obstacles can be treacherous or deadly.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC St. Louis Region southern small river accesses plan",
        "url": "https://mdc.mo.gov/sites/default/files/2020-12/2016%20St.%20Louis%20Region%20Southern%20Small%20River%20Accesses%20Area%20Plan.pdf",
        "provider": "local"
      },
      {
        "label": "MDC Campbell Bridge Access map",
        "url": "https://mdc.mo.gov/sites/default/files/mo_nature/downloads/conservation-areas/8402map.pdf",
        "provider": "local"
      },
      {
        "label": "MDC Sappington Bridge Access",
        "url": "https://mdc.mo.gov/discover-nature/places/sappington-bridge-access",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Meramec Sullivan gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0",
        "provider": "local"
      },
      {
        "label": "USGS 07014500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07014500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "meramec-river-sappington-bridge-meramec-state-park",
    "slug": "meramec-river-sappington-bridge-meramec-state-park",
    "name": "Meramec River",
    "reach": "Sappington Bridge Access to Meramec State Park",
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Short Meramec day float from MDC Sappington Bridge Access to the Meramec State Park river ramp, with bluffs, clear Ozark pools, state-managed endpoints, and the Sullivan gauge in the route corridor.",
    "statusText": "Use the Meramec River near Sullivan gauge. Around 200 cfs is the low-water marker; below that, expect shallow riffles and dragging. Rising water deserves extra caution, and MoHERP marks high and flood stages as unsuitable for casual trips.",
    "latitude": 38.157948,
    "longitude": -91.109295,
    "gaugeSource": {
      "id": "usgs-07014500",
      "provider": "usgs",
      "siteId": "07014500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Meramec River near Sullivan, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07014500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Rivers.MOHERP Sullivan gauge rating and Meramec trip logs",
        "url": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The spring-fed Meramec commonly supports warm-season floating, but shallow late-summer riffles, heavy weekend use, and quick rain rises can still change the trip. Check state park advisories and same-day gauge trend before launching.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short mainstream Ozark float with normal riffles, gravel bars, bends, and occasional wood. It is suitable for broad recreational planning at ordinary levels, but high water can make obstacles and landings much less forgiving.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: MDC confirms Sappington Bridge Access as public Meramec boat/fishing access, the MDC area plan explicitly says the float from Sappington Bridge Access to Meramec State Park is 5 miles, Missouri State Parks confirms public canoe and concrete boat launches near the River Stop Store, USGS 07014500 is the live Meramec River near Sullivan gauge in this exact corridor, and Rivers.MOHERP publishes Sullivan-gauge condition ratings with multiple nearby Meramec trip logs. The app uses minimum-only scoring because the level source is community-calibrated rather than an official manager-published paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Sappington Bridge Access to Meramec State Park, 5 miles",
        "note": "MDC planning material for Sappington Bridge Access says the float from Sappington Bridge Access to Meramec State Park in Sullivan is 5 miles.",
        "sourceUrl": "https://mdc.mo.gov/sites/default/files/2020-12/2016%20St.%20Louis%20Region%20Southern%20Small%20River%20Accesses%20Area%20Plan.pdf"
      },
      {
        "label": "Public put-in",
        "value": "Sappington Bridge Access",
        "note": "MDC says Sappington Bridge Access provides boat and fishing access to the Meramec River, with directions from Sullivan via Route D and Sappington Bridge Road.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/sappington-bridge-access"
      },
      {
        "label": "Public take-out",
        "value": "Meramec State Park river launch",
        "note": "Missouri State Parks says visitors can use one concrete motorboat launch or the canoe launch near River Stop Store to access the Meramec River during park hours, with no launch fees.",
        "sourceUrl": "https://mostateparks.com/park/meramec-state-park/boating"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 07014500",
        "note": "USGS operates Meramec River near Sullivan, MO, the live Meramec gauge for this Sullivan-area route corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07014500/"
      },
      {
        "label": "Low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Sullivan gauge good beginning at 200 cfs and includes nearby Meramec trip logs rated good between 294 and 543 cfs, plus a low but floatable Huzzah-to-Ozark-Outdoors trip at 238 cfs.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0"
      },
      {
        "label": "High-water caution",
        "value": "High and flood categories are not casual-float water",
        "note": "Rivers.MOHERP describes high water as potentially dangerous for young or inexperienced paddlers and flood water as avoidable for casual trips because obstacles can be treacherous or deadly.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Sappington Bridge Access",
        "url": "https://mdc.mo.gov/discover-nature/places/sappington-bridge-access",
        "provider": "local"
      },
      {
        "label": "MDC St. Louis Region southern small river accesses plan",
        "url": "https://mdc.mo.gov/sites/default/files/2020-12/2016%20St.%20Louis%20Region%20Southern%20Small%20River%20Accesses%20Area%20Plan.pdf",
        "provider": "local"
      },
      {
        "label": "Missouri State Parks Meramec boating",
        "url": "https://mostateparks.com/park/meramec-state-park/boating",
        "provider": "local"
      },
      {
        "label": "Missouri State Parks River Stop Store",
        "url": "https://mostateparks.com/key-location/river-stop-store",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Meramec Sullivan gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0",
        "provider": "local"
      },
      {
        "label": "USGS 07014500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07014500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "meramec-river-state-park-sand-ford",
    "slug": "meramec-river-state-park-sand-ford",
    "name": "Meramec River",
    "reach": "Meramec State Park to Sand Ford Access",
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Public Meramec day float from the Meramec State Park river launch to MDC Sand Ford Access near Stanton. This links two managed access areas in the Sullivan corridor, using the live Sullivan gauge as a conservative low-water check.",
    "statusText": "Use the Meramec River near Sullivan gauge. Around 200 cfs is the conservative low-water floor; below that, expect shallow riffles, dragging, and a longer day. Rising water deserves extra caution, and MoHERP marks high and flood stages as unsuitable for casual trips.",
    "latitude": 38.20379,
    "longitude": -91.099735,
    "gaugeSource": {
      "id": "usgs-07014500",
      "provider": "usgs",
      "siteId": "07014500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Meramec River near Sullivan, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07014500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Rivers.MOHERP Sullivan gauge rating and Meramec trip logs",
        "url": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The spring-fed Sullivan-area Meramec is commonly floated in spring through fall, but it can still get shallow in dry late-summer spells. Weekend rental traffic, storms, and quick rises after rain are the main operational checks.",
      "difficulty": "easy",
      "difficultyNotes": "This is a mainstream Ozark recreational float with riffles, pools, gravel bars, bluffs, swimmers, anglers, and occasional wood. It is easy at ordinary stable levels, but high or rising water can make bends, obstacles, and landings much less forgiving.",
      "confidenceNotes": "Confidence is good for a conservative adjacent Meramec add: Missouri State Parks confirms public canoe and concrete boat launches near River Stop Store, MDC confirms Sand Ford Access as a public Meramec River boat access, MDC planning material places Sand Ford about 12 miles downstream from Sappington Bridge, the existing official Sappington-to-Meramec-State-Park segment is 5 miles, and USGS 07014500 exposed same-day May 31, 2026 discharge and gage-height observations during review. The app uses minimum-only scoring because the level source is community-calibrated rather than an official manager-published paddling band, and the mileage is documented as an approximate access-to-access derivation rather than a standalone official float listing."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Meramec State Park river launch",
        "note": "Missouri State Parks says visitors can use the concrete motorboat launch or the canoe launch near River Stop Store to access the Meramec River during park hours, with no launch fees.",
        "sourceUrl": "https://mostateparks.com/park/meramec-state-park/boating"
      },
      {
        "label": "Public take-out",
        "value": "MDC Sand Ford Access",
        "note": "MDC says Sand Ford Access provides fishing and boat access to the Meramec River and is reached from Stanton via Route W.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/sand-ford-access"
      },
      {
        "label": "Route shape",
        "value": "About 7 miles",
        "note": "MDC planning material places Sand Ford Access about 12 miles downstream from Sappington Bridge Access. The same plan lists Sappington Bridge to Meramec State Park as 5 miles, so this downstream continuation is treated as an approximate 7-mile public-access day float.",
        "sourceUrl": "https://mdc.mo.gov/sites/default/files/2020-12/2016%20St.%20Louis%20Region%20Southern%20Small%20River%20Accesses%20Area%20Plan.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 07014500",
        "note": "USGS Meramec River near Sullivan exposed same-day May 31, 2026 observations during review, including 585 cfs and 3.40 ft at 09:30 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07014500"
      },
      {
        "label": "Low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Sullivan gauge good beginning at 200 cfs and includes nearby Meramec trip logs rated good from roughly 294 to 543 cfs. The app uses only a conservative floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0"
      },
      {
        "label": "High-water caution",
        "value": "No shipped upper cutoff",
        "note": "Rivers.MOHERP describes high water as potentially dangerous for young or inexperienced paddlers and flood water as avoidable for casual trips. Skip this route on rising or storm-swollen water even though the app does not claim a numeric high cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0"
      },
      {
        "label": "Coordinate anchors",
        "value": "38.20379, -91.099735 to 38.2527, -91.0798",
        "note": "The put-in uses the existing River Stop Store / Meramec State Park launch coordinate anchor. The take-out coordinate comes from a public Sand Ford Access paddling directory entry that cites USGS ScienceBase location data, with MDC supplying the public-access authority.",
        "sourceUrl": "https://thepaddlinghub.com/directory/missouri/sand-ford-access-1"
      }
    ],
    "sourceLinks": [
      {
        "label": "Missouri State Parks Meramec boating",
        "url": "https://mostateparks.com/park/meramec-state-park/boating",
        "provider": "local"
      },
      {
        "label": "MDC Sand Ford Access",
        "url": "https://mdc.mo.gov/discover-nature/places/sand-ford-access",
        "provider": "local"
      },
      {
        "label": "MDC St. Louis Region southern small river accesses plan",
        "url": "https://mdc.mo.gov/sites/default/files/2020-12/2016%20St.%20Louis%20Region%20Southern%20Small%20River%20Accesses%20Area%20Plan.pdf",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Meramec Sullivan gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07014500&hours=0",
        "provider": "local"
      },
      {
        "label": "USGS 07014500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07014500",
        "provider": "usgs"
      },
      {
        "label": "USGS 07014500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07014500/",
        "provider": "usgs"
      },
      {
        "label": "Sand Ford Access coordinate record",
        "url": "https://thepaddlinghub.com/directory/missouri/sand-ford-access-1",
        "provider": "local"
      }
    ]
  },
  {
    "id": "bryant-creek-sycamore-warren-bridge",
    "slug": "bryant-creek-sycamore-warren-bridge",
    "name": "Bryant Creek",
    "reach": "Sycamore Access to Warren Bridge Access",
    "aliases": [
      "Bryant Creek - Hodgson Mill to Warren Bridge",
      "Bryant Creek - Sycamore to Warren Bridge"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Clear spring-fed Bryant Creek day float from MDC Sycamore Access below Hodgson Mill to MDC Warren Bridge Access, with a direct Tecumseh gauge and a conservative low-water floor from route-specific local trip evidence.",
    "statusText": "Use the Bryant Creek near Tecumseh gauge. Around 300 cfs is the low-water marker; below that, expect shallow shoals, dragging, and slower travel. Rising water deserves extra caution because Bryant is narrow, swift, and debris-prone after storms.",
    "latitude": 36.70778,
    "longitude": -92.26639,
    "gaugeSource": {
      "id": "usgs-07058000",
      "provider": "usgs",
      "siteId": "07058000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Bryant Creek near Tecumseh, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07058000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Tecumseh gauge rating and Bryant Creek trip logs",
        "url": "https://rivers.moherp.org/gauge/?gauge=07058000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Bryant Creek is spring-fed enough to be a common Ozark float, but low summer water can make shoals scrapey and slow. Heavy rain can make this narrow creek rise quickly and add fresh wood or pushy bends.",
      "difficulty": "moderate",
      "difficultyNotes": "Local Bryant Creek guidance describes a narrow, swift stream with limestone bluffs, occasional wider pools, and easy-to-medium difficulty. Treat it as moving-water Ozark paddling rather than a lazy tube float, especially near low-water bridges, shoals, and post-storm wood.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: MDC confirms Sycamore Access as a public Bryant Creek access and popular launch for upper-Bryant paddlers, MDC currently lists Warren Bridge Access as public fishing and floating access, public Bryant Creek mileage guides identify Hodgson/Sycamore to Warren Bridge as a normal 7- to 7.6-mile float, USGS 07058000 is a live same-creek gauge downstream near Tecumseh with same-day observations, and Rivers.MOHERP ties Bryant Creek condition ratings and exact route trip evidence to that gauge. The app uses minimum-only scoring because the threshold source is community-calibrated rather than an official manager-published paddling band, and the access notes preserve the older flood-damage/rough-access history."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Sycamore Access / Hodgson Mill",
        "note": "MDC says Sycamore Access is on Bryant Creek downstream of the Highway 181 bridge, adjacent to historic Hodgson Water Mill, and serves as a popular launching point for canoeists and kayakers floating the upper Bryant.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/sycamore-access"
      },
      {
        "label": "Public take-out",
        "value": "Warren Bridge Access",
        "note": "MDC says Warren Bridge Access provides fishing and floating access to Bryant Creek and gives directions from Dora via Highway 181, Route H, and County Road 328.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/warren-bridge-access"
      },
      {
        "label": "Route shape",
        "value": "About 7 to 7.6 river miles",
        "note": "Public Bryant Creek guides identify Hodgson Mill or Sycamore Access to Warren Bridge as a standard day float, with mileage around 7 to 7.6 miles and typical travel time around 4 to 5 hours.",
        "sourceUrl": "https://www.watersheds.org/outdoors/boating.htm"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 07058000",
        "note": "USGS operates Bryant Creek near Tecumseh, MO. The legacy current-conditions page showed same-day discharge and gage-height observations during the May 26, 2026 review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07058000"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bryant Creek Tecumseh gauge good beginning at 300 cfs and includes exact Hodgson Mill-to-Warren Bridge trip evidence plus nearby Bryant Creek good-condition trips around that floor.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07058000&hours=168"
      },
      {
        "label": "Access history",
        "value": "Flood-damage caution",
        "note": "Older local reporting after the 2017 floods described Warren Bridge as officially closed and Sycamore as rough with loose gravel and deep sand. Current MDC pages list both areas as public access, but the route notes keep a same-day access/scouting caution.",
        "sourceUrl": "https://www.ozarkcountytimes.com/node/22441"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Sycamore Access",
        "url": "https://mdc.mo.gov/discover-nature/places/sycamore-access",
        "provider": "local"
      },
      {
        "label": "MDC Warren Bridge Access",
        "url": "https://mdc.mo.gov/discover-nature/places/warren-bridge-access",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Bryant Creek Tecumseh gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07058000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07058000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07058000/",
        "provider": "usgs"
      },
      {
        "label": "Bryant Watershed boating and floating guide",
        "url": "https://www.watersheds.org/outdoors/boating.htm",
        "provider": "local"
      },
      {
        "label": "Missouri Float Trips Bryant Creek guide",
        "url": "https://www.floatmissouri.com/plan/missouri-rivers/bryant-creek/",
        "provider": "local"
      },
      {
        "label": "Ozark County Times Bryant Creek access report",
        "url": "https://www.ozarkcountytimes.com/node/22441",
        "provider": "local"
      }
    ]
  },
  {
    "id": "beaver-creek-brownbranch-bradleyville",
    "slug": "beaver-creek-brownbranch-bradleyville",
    "name": "Beaver Creek",
    "reach": "Beaver Creek Campground / Brownbranch to Highway 76 Bridge at Bradleyville",
    "aliases": [
      "Beaver Creek - Brownbranch to Bradleyville",
      "Beaver Creek Campground to Bradleyville",
      "Beaver Creek - Brownbranch to Highway 76 Bridge"
    ],
    "state": "Missouri",
    "region": "Southwest Missouri",
    "summary": "Ozark creek day float from the fee launch at Beaver Creek Campground in Brownbranch to the Highway 76 bridge at Bradleyville. MDC confirms the access pair, USGS 07054080 is live at the take-out corridor, and MoHERP provides route-specific level evidence.",
    "statusText": "Use the Beaver Creek at Bradleyville gauge. MoHERP rates about 200 to 395 cfs as the best broad window, with 100 cfs as a low-water warning and about 727 cfs as the high-water caution line. Expect scraping below the floor and pushy, debris-prone water above the window.",
    "latitude": 36.79540057,
    "longitude": -92.83080082,
    "gaugeSource": {
      "id": "usgs-07054080",
      "provider": "usgs",
      "siteId": "07054080",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Beaver Creek at Bradleyville, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07054080/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 200,
      "idealMax": 395,
      "tooLow": 100,
      "tooHigh": 727,
      "thresholdSource": {
        "label": "Rivers.MOHERP Bradleyville gauge bands and Brownbranch-to-Bradleyville trip rows",
        "url": "https://rivers.moherp.org/gauge/?gauge=07054080&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Beaver Creek is rain-sensitive and can swing from scrapey summer riffles to fast, muddy, debris-laden current after storms. Recent flood history and 2025 trip notes make the same-day trend and access inspection especially important.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a narrow Ozark creek with riffles, gravel bars, tree strainers, possible portages, and a steeper final riffle into Bradleyville. It can be a pleasant day float at ordinary levels, but it is not a beginner recommendation when high, rising, or freshly altered by floods.",
      "confidenceNotes": "Confidence is good but intentionally guarded: MDC says Beaver Creek has long been a floating destination, most floats begin at Brownbranch and downstream, and visitors can pay a fee to park and launch at Beaver Creek Campground or launch at the Highway 76 bridge in Bradleyville; USGS 07054080 showed same-day May 31, 2026 discharge and gage-height values; and Rivers.MOHERP has exact Brownbranch-to-Bradleyville rows plus Bradleyville-gauge bands. The main caveat is access and channel volatility: MoHERP trip notes include post-flood strainers, a degrading Bradleyville take-out, and a 2019 warning about MO 76 access confusion, so the route copy requires same-day inspection and does not treat the highway bridge as a guaranteed easy landing."
    },
    "evidenceNotes": [
      {
        "label": "Public / fee access pair",
        "value": "Brownbranch campground to Highway 76 bridge",
        "note": "MDC says most Beaver Creek floats begin at Brownbranch and downstream, and that visitors can pay a small fee to park and launch at Beaver Creek Campground in Brownbranch or launch at the Highway 76 bridge in Bradleyville.",
        "sourceUrl": "https://mdc.mo.gov/fishing/fishing-prospects/areas/beaver-creek"
      },
      {
        "label": "Route-specific trip rows",
        "value": "Brownbranch to Bradleyville, 7.9 miles",
        "note": "Rivers.MOHERP lists exact Brownbranch-to-Bradleyville rows at 7.9 miles, including Good reports at 210, 241, 258, 276, 442, 496, and 532 cfs and Low / Poor reports in the mid-70 cfs range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07054080&hours=168"
      },
      {
        "label": "Gauge bands",
        "value": "100 / 200-395 / 727 cfs",
        "note": "MoHERP rates the Bradleyville gauge as Poor around 50 cfs, Low beginning around 100 cfs, Good beginning around 200 cfs, High beginning around 727 cfs, and Flood around 1,610 cfs. The app uses those community bands conservatively.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07054080&hours=168"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07054080",
        "note": "USGS Beaver Creek at Bradleyville showed same-day May 31, 2026 observations during review, including 1,080 cfs and 5.26 ft at 10:15 CDT. That reading is above the app high-water caution line, not a current recommendation.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07054080"
      },
      {
        "label": "Put-in coordinate",
        "value": "36.79540057, -92.83080082",
        "note": "The Dyrt publishes coordinates for Beaver Creek Canoe Rental, Campground & Cabins, and describes the private campground as river-accessible with boat-in access and canoe-rental context. MDC supplies the stronger access authority.",
        "sourceUrl": "https://thedyrt.com/camping/missouri/beaver-creek-canoe-rental-campground-and-cabins"
      },
      {
        "label": "Take-out coordinate",
        "value": "36.77963889, -92.90727778",
        "note": "USGS publishes the Beaver Creek at Bradleyville monitoring-location coordinate at the Highway 76 bridge corridor. MDC supplies the paddling-access authority for the Bradleyville bridge; this is not a separate managed-ramp coordinate.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/07054080/"
      },
      {
        "label": "Access caveat",
        "value": "Bradleyville / MO 76 can be rough or confusing",
        "note": "MoHERP notes include a 2025 report that the Bradleyville take-out continues to degrade after floods and a 2019 warning about MO 76 access confusion. Paddle Today keeps the MDC access wording but requires scouting the take-out before committing.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07054080&hours=168"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Beaver Creek fishing prospects",
        "url": "https://mdc.mo.gov/fishing/fishing-prospects/areas/beaver-creek",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Beaver Creek Bradleyville gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07054080&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07054080 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07054080/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07054080 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07054080",
        "provider": "usgs"
      },
      {
        "label": "Beaver Creek Campground coordinate record",
        "url": "https://thedyrt.com/camping/missouri/beaver-creek-canoe-rental-campground-and-cabins",
        "provider": "local"
      },
      {
        "label": "Paddling.com Beaver Creek Brownbranch trip report",
        "url": "https://paddling.com/paddle/trips/beaver-creek-in-missouri",
        "provider": "local"
      }
    ]
  },
  {
    "id": "big-piney-river-east-gate-bookers-bend",
    "slug": "big-piney-river-east-gate-bookers-bend",
    "name": "Big Piney River",
    "reach": "East Gate Access to Bookers Bend Access",
    "aliases": [
      "Big Piney - East Gate to Bookers Bend",
      "Big Piney River - East Gate to Booker Bend",
      "Big Piney River - East Gate to Bookers Bend"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Forest Service Big Piney day float from East Gate to Bookers Bend, using two Mark Twain National Forest gravel accesses and a direct downstream USGS Big Piney gauge. The scoring stays conservative because the level model comes from MoHERP community gauge bands rather than official paddling thresholds.",
    "statusText": "Use the Big Piney River near Big Piney gauge. Below about 310 cfs, MoHERP rates the river poor and you should expect shallow riffles, dragging, and a longer day. This route has no defended high-water cutoff, so treat rising water and recent storms cautiously.",
    "latitude": 37.764515,
    "longitude": -92.058539,
    "gaugeSource": {
      "id": "usgs-06930000",
      "provider": "usgs",
      "siteId": "06930000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Piney River near Big Piney, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06930000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 309,
      "thresholdSource": {
        "label": "Rivers.MOHERP Big Piney River gauge bands at Big Piney",
        "url": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The Forest Service describes this as a spring-fed river that is usually floatable year-round unless it has been particularly dry. Low water can still turn the 11-mile day into a scrape-and-drag trip, and rain can make the river murky, rising, and less forgiving at landings.",
      "difficulty": "easy",
      "difficultyNotes": "This is a broad recreational Ozark river segment with riffles, gravel, pools, limestone bluffs, and gravel access ramps. The mileage, limited parking, private shorelines, possible motorboats, and same-day level changes keep it from being a no-check casual float.",
      "confidenceNotes": "Confidence is good for a conservative add: the Forest Service lists East Gate and Bookers Bend as open Big Piney boat/canoe accesses, publishes both coordinates, and identifies East Gate-to-Bookers Bend as an 11-mile trip; USGS 06930000 is a direct same-river Big Piney gauge with same-day May 30, 2026 discharge and gage-height observations; and Rivers.MOHERP refreshed from that gauge on May 30 with numeric Big Piney condition bands. The main caveat is threshold precision: MoHERP bands are broad community river bands, not an official route-specific ladder, so the app uses only a low-water floor and no ideal range or upper cutoff."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "East Gate to Bookers Bend, 11 mi",
        "note": "The Forest Service East Gate page says paddlers can take a short 3-mile trip to Crossroads or a longer 11-mile trip to Bookers Bend.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/east-gate"
      },
      {
        "label": "Public put-in",
        "value": "East Gate Access",
        "note": "The Forest Service lists East Gate as an open small gravel boat/canoe access for the Big Piney, with coordinates, parking for three vehicles with trailers, and no fee.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/east-gate"
      },
      {
        "label": "Public take-out",
        "value": "Bookers Bend Access",
        "note": "The Forest Service lists Bookers Bend as an open small gravel boat/canoe access for the Big Piney, with coordinates, parking for three vehicles with trailers, no fee, and no restroom or potable water.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/bookers-bend"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 06930000",
        "note": "USGS Big Piney River near Big Piney showed same-day May 30, 2026 discharge and gage-height observations, with 251 cfs and 2.79 ft at 08:00 CDT during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06930000"
      },
      {
        "label": "Low-water floor",
        "value": "309 cfs minimum-only",
        "note": "Rivers.MOHERP refreshed the Big Piney gauge on May 30, 2026 and showed the river rated Poor at 251 cfs, with the Low band beginning at 309 cfs and Good beginning at 519 cfs. Paddle Today uses only the low-water floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168"
      },
      {
        "label": "River character",
        "value": "Spring-fed, gravel-bottom Ozark river",
        "note": "The Forest Service says the Big Piney is spring fed, usually floatable year-round unless particularly dry, and has runs, riffles, pools, gravel bottom, limestone bluffs, and pine-topped scenery.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/big-piney-river"
      },
      {
        "label": "Access and high-water cautions",
        "value": "Private land and rapid rises",
        "note": "The Forest Service warns that most land along the lower Bookers Bend stretch is private and says the river can rise rapidly; use public accesses and legal stops only.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/bookers-bend"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service East Gate",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/east-gate",
        "provider": "local"
      },
      {
        "label": "Forest Service Bookers Bend",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/bookers-bend",
        "provider": "local"
      },
      {
        "label": "Forest Service Big Piney River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/big-piney-river",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Big Piney gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 06930000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06930000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 06930000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06930000",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "big-piney-river-sandy-shoals-boiling-spring",
    "slug": "big-piney-river-sandy-shoals-boiling-spring",
    "name": "Big Piney River",
    "reach": "Sandy Shoals Ford to Boiling Spring Access",
    "aliases": [
      "Big Piney - Sandy Shoals to Boiling Spring",
      "Big Piney River - Sand Shoals to Boiling Spring",
      "Big Piney River - Sandy Shoals Ford to Boiling Springs"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Short MDC-described Big Piney day float from Sandy Shoals Ford access to Boiling Spring Access. The same downstream Big Piney USGS gauge supports a conservative low-water check, but the route does not have an official paddling range.",
    "statusText": "Use the Big Piney River near Big Piney gauge. Below about 310 cfs, MoHERP rates the river poor and you should expect shallow riffles, dragging, and a slower day. This route has no defended high-water cutoff, so treat rising water and recent storms cautiously.",
    "latitude": 37.4108792,
    "longitude": -91.9501555,
    "gaugeSource": {
      "id": "usgs-06930000",
      "provider": "usgs",
      "siteId": "06930000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Piney River near Big Piney, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06930000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 309,
      "thresholdSource": {
        "label": "Rivers.MOHERP Big Piney River gauge bands at Big Piney",
        "url": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "MDC frames this as a quick Big Piney day trip, and the river is spring fed enough to hold water in normal seasons. Dry spells can still make shoals scrape-heavy, while rain can add murky water, faster current, and harder landings.",
      "difficulty": "easy",
      "difficultyNotes": "This is mostly Class I Ozark floating water with riffles, gravel bars, pools, and bluff scenery. MDC notes occasional Class II sections on the Big Piney after a good rain, so high or rising water should not be treated as a casual float.",
      "confidenceNotes": "Confidence is good for a conservative minimum-only add: MDC specifically recommends Sandy Shoals Ford access to Boiling Spring Access as a little-over-6-mile Big Piney day trip, MDC confirms Boiling Spring Access as a public Big Piney access with a boat ramp and picnic area, USGS 06930000 showed same-day May 30, 2026 discharge and gage-height observations, and Rivers.MOHERP has exact Sand/Sandy Shoals-to-Boiling Spring trip rows on the same gauge. The main caveats are threshold precision and coordinate authority: Sandy Shoals Ford is anchored to topo/GeoNames-style coordinates rather than an MDC coordinate, and the app uses only the existing Big Piney low-water floor with no ideal range or upper cutoff."
    },
    "evidenceNotes": [
      {
        "label": "MDC route shape",
        "value": "Just over 6 mi",
        "note": "MDC recommends dropping in at Sandy Shoals Ford access and floating just over 6 miles down to Boiling Spring for a quick Big Piney day trip.",
        "sourceUrl": "https://mdc.mo.gov/magazines/missouri-conservationist/2024-07/path-less-paddled"
      },
      {
        "label": "Public take-out",
        "value": "Boiling Spring Access",
        "note": "MDC lists Boiling Spring Access as a public area on the Big Piney River with a boat ramp and picnic area, and its area map marks parking, privy, picnic area, and boat ramp features.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/boiling-spring-access"
      },
      {
        "label": "Put-in coordinates",
        "value": "37.4108792, -91.9501555",
        "note": "TopoZone / USGS-topo-derived mapping places Sandy Shoals Ford in Texas County at this coordinate. MDC supplies the access and route name; the coordinate is used only as the practical ford anchor.",
        "sourceUrl": "https://www.topozone.com/missouri/texas-mo/locale/sandy-shoals-ford/"
      },
      {
        "label": "Take-out coordinate anchor",
        "value": "37.4594894, -91.9893237",
        "note": "USGS-topo-derived spring mapping places Boiling Spring on the Big Piney at this coordinate, and MDC confirms the adjacent Boiling Spring Access and area map. Use posted MDC access layout on arrival.",
        "sourceUrl": "https://www.anyplaceamerica.com/directory/mo/texas-county-29215/springs/boiling-spring-748951/"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 06930000",
        "note": "USGS Big Piney River near Big Piney showed same-day May 30, 2026 discharge and gage-height observations, with 251 cfs and 2.79 ft at 08:00 CDT during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06930000"
      },
      {
        "label": "Low-water floor",
        "value": "309 cfs minimum-only",
        "note": "Rivers.MOHERP Big Piney gauge bands put the start of Low at 309 cfs. Exact Sand/Sandy Shoals-to-Boiling Spring trip rows are useful context, but not enough to claim an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168"
      },
      {
        "label": "Route-specific reports",
        "value": "125 and 486 cfs rows",
        "note": "Rivers.MOHERP includes Sand/Sandy Shoals-to-Boiling Spring rows on USGS 06930000, including a 486 cfs report that described the level as nearly perfect with only a few drags. The app keeps the broader low-water floor until more calibration exists.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Path Less Paddled",
        "url": "https://mdc.mo.gov/magazines/missouri-conservationist/2024-07/path-less-paddled",
        "provider": "local"
      },
      {
        "label": "MDC Boiling Spring Access",
        "url": "https://mdc.mo.gov/discover-nature/places/boiling-spring-access",
        "provider": "local"
      },
      {
        "label": "MDC Boiling Spring Access map",
        "url": "https://mdc.mo.gov/sites/default/files/mo_nature/downloads/conservation-areas/6422map.pdf",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Big Piney gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 06930000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06930000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 06930000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06930000",
        "provider": "usgs"
      },
      {
        "label": "Sandy Shoals Ford topo map",
        "url": "https://www.topozone.com/missouri/texas-mo/locale/sandy-shoals-ford/",
        "provider": "local"
      },
      {
        "label": "Boiling Spring topo map",
        "url": "https://www.anyplaceamerica.com/directory/mo/texas-county-29215/springs/boiling-spring-748951/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "big-piney-river-boiling-spring-mason-bridge",
    "slug": "big-piney-river-boiling-spring-mason-bridge",
    "name": "Big Piney River",
    "reach": "Boiling Spring Access to Mason Bridge Access",
    "aliases": [
      "Big Piney - Boiling Spring to Mason Bridge",
      "Big Piney River - Boiling Spring to Mason Bridge",
      "Big Piney River - Boiling Springs to Mason Bridge"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "MDC-described six-mile Big Piney day float from Boiling Spring Access to Mason Bridge Access. It uses the same direct Big Piney USGS gauge as the adjacent V2 Big Piney routes, with conservative low-water-only scoring.",
    "statusText": "Use the Big Piney River near Big Piney gauge. Below about 310 cfs, MoHERP rates the river poor and you should expect shallow riffles, dragging, and slow pools. This route has no defended high-water cutoff, so treat rising water and recent storms cautiously.",
    "latitude": 37.4594894,
    "longitude": -91.9893237,
    "gaugeSource": {
      "id": "usgs-06930000",
      "provider": "usgs",
      "siteId": "06930000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Piney River near Big Piney, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06930000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 309,
      "thresholdSource": {
        "label": "Rivers.MOHERP Big Piney River gauge bands at Big Piney",
        "url": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "MDC frames this as a daylong Big Piney float, and public guides describe the river as spring fed and normally floatable outside especially dry periods. Dry spells can still make this upper-middle reach scrapey; rain can add murky water, faster current, and harder landings.",
      "difficulty": "easy",
      "difficultyNotes": "MDC calls the Boiling Spring-to-Mason Bridge float Category I / Easy except during high water. Expect Ozark riffles, pools, gravel bars, fishing traffic, and occasional wood; high or rising water should not be treated as beginner-friendly.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: MDC specifically describes Boiling Spring Access to Mason Bridge Access as a six-mile daylong Big Piney float, MDC confirms Boiling Spring Access as public Big Piney access, MDC map material confirms Mason Bridge Access with parking and a boat ramp, USGS 06930000 showed same-day May 30, 2026 discharge and gage-height observations, and the same Big Piney gauge is already product-supported by adjacent V2 routes. The app uses only the existing Big Piney 309 cfs low-water floor from MoHERP community bands; it does not claim an ideal range or high-water cutoff."
    },
    "evidenceNotes": [
      {
        "label": "MDC route shape",
        "value": "About 6 mi",
        "note": "MDC describes Boiling Spring Access to the Conservation Department Mason Bridge Access as a decent daylong Big Piney float through six scenic miles, rated Category I / Easy except during high water.",
        "sourceUrl": "https://mdc.mo.gov/magazines/conservationist/2008-06/outdoor-recreation"
      },
      {
        "label": "Segment mileage",
        "value": "Mile 26.6 to 32.5",
        "note": "Big Piney River Stream Team Watershed Association lists Boiling Spring to Mason Bridge as river mile 26.6 to 32.5, matching the six-mile MDC route description.",
        "sourceUrl": "https://bigpineyriverstwa.org/"
      },
      {
        "label": "Public put-in",
        "value": "Boiling Spring Access",
        "note": "MDC lists Boiling Spring Access as a public Big Piney River area with a boat ramp and picnic area, and its area map marks parking, privy, picnic area, and boat ramp features.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/boiling-spring-access"
      },
      {
        "label": "Public take-out",
        "value": "Mason Bridge Access",
        "note": "MDC map material identifies Mason Bridge Access in Texas County on the Big Piney River, with parking lot and boat ramp symbols.",
        "sourceUrl": "https://mdc.mo.gov/sites/default/files/mo_nature/downloads/conservation-areas/6110map.pdf"
      },
      {
        "label": "Take-out coordinate anchor",
        "value": "37.50581, -91.98319",
        "note": "Mapcarta / OpenStreetMap locates Mason Bridge Access as a Big Piney slipway at this coordinate. Pair the coordinate with MDC area-map confirmation and follow posted access layout on arrival.",
        "sourceUrl": "https://mapcarta.com/N5395506490"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 06930000",
        "note": "USGS Big Piney River near Big Piney showed same-day May 30, 2026 discharge and gage-height observations, with 251 cfs and 2.79 ft at 08:00 CDT during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06930000"
      },
      {
        "label": "Low-water floor",
        "value": "309 cfs minimum-only",
        "note": "Rivers.MOHERP Big Piney gauge bands put the start of Low at 309 cfs. The app reuses this conservative floor from adjacent Big Piney routes and does not infer an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168"
      },
      {
        "label": "Route character",
        "value": "Class I, seldom II except high water",
        "note": "Missouri Float Trips describes the Big Piney as mostly Class I, seldom Class II except in high water, and marks Boiling Spring Access and Mason Bridge Access in the same mile-by-mile sequence.",
        "sourceUrl": "https://www.floatmissouri.com/plan/missouri-rivers/big-piney-river/"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Outdoor Recreation: Access to Access",
        "url": "https://mdc.mo.gov/magazines/conservationist/2008-06/outdoor-recreation",
        "provider": "local"
      },
      {
        "label": "MDC Boiling Spring Access",
        "url": "https://mdc.mo.gov/discover-nature/places/boiling-spring-access",
        "provider": "local"
      },
      {
        "label": "MDC Boiling Spring Access map",
        "url": "https://mdc.mo.gov/sites/default/files/mo_nature/downloads/conservation-areas/6422map.pdf",
        "provider": "local"
      },
      {
        "label": "MDC Mason Bridge Access map",
        "url": "https://mdc.mo.gov/sites/default/files/mo_nature/downloads/conservation-areas/6110map.pdf",
        "provider": "local"
      },
      {
        "label": "Big Piney River Stream Team Watershed Association",
        "url": "https://bigpineyriverstwa.org/",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Big Piney gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 06930000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06930000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 06930000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06930000",
        "provider": "usgs"
      },
      {
        "label": "Mason Bridge Access map coordinate",
        "url": "https://mapcarta.com/N5395506490",
        "provider": "local"
      },
      {
        "label": "Missouri Float Trips Big Piney River",
        "url": "https://www.floatmissouri.com/plan/missouri-rivers/big-piney-river/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "big-piney-river-mason-bridge-slabtown",
    "slug": "big-piney-river-mason-bridge-slabtown",
    "name": "Big Piney River",
    "reach": "Mason Bridge Access to Slabtown Recreation Area",
    "aliases": [
      "Big Piney - Mason Bridge to Slabtown",
      "Big Piney River - Mason Bridge to Slabtown",
      "Big Piney River - Mason Bridge Access to Slabtown Recreation Area"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Nine-mile Big Piney follow-on from MDC Mason Bridge Access to Forest Service Slabtown Recreation Area. The direct Big Piney USGS gauge is live again, and the route stays conservative with low-water-only scoring.",
    "statusText": "Use the Big Piney River near Big Piney gauge. Below about 310 cfs, MoHERP rates the river poor and you should expect shallow riffles, dragging, and slower travel. This route has no defended high-water cutoff, so treat rising water and recent storms cautiously.",
    "latitude": 37.50581,
    "longitude": -91.98319,
    "gaugeSource": {
      "id": "usgs-06930000",
      "provider": "usgs",
      "siteId": "06930000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Piney River near Big Piney, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06930000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 309,
      "thresholdSource": {
        "label": "Rivers.MOHERP Big Piney River gauge bands at Big Piney",
        "url": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The Forest Service describes the Big Piney as spring fed and usually floatable year-round unless it has been especially dry. This Mason-to-Slabtown reach can still scrape in dry spells, while rain can make the river murky, rising, and harder to manage at gravel launches.",
      "difficulty": "easy",
      "difficultyNotes": "Expect an Ozark day float with riffles, pools, gravel bottom, fishing traffic, limited services, and a longer nine-mile pace than the upstream six-mile Big Piney links. High or rising water can exceed the easy rating quickly.",
      "confidenceNotes": "Confidence is good for a conservative follow-on: MDC map material confirms Mason Bridge Access with parking and a boat ramp, the Forest Service confirms Slabtown as a Big Piney access and camping area with official coordinates and non-motorized boating support, the Big Piney River Stream Team Watershed Association lists Mason Bridge to Slabtown as river mile 32.5 to 42.0, official USGS 06930000 showed same-day May 31, 2026 discharge and gage-height observations, and MoHERP has exact Mason-to-Slabtown trip rows plus the Big Piney low-water band. The app uses only the existing 309 cfs low-water floor and does not claim an ideal range or high-water cutoff."
    },
    "evidenceNotes": [
      {
        "label": "Segment mileage",
        "value": "Mile 32.5 to 42.0",
        "note": "Big Piney River Stream Team Watershed Association lists Mason Bridge to Slabtown as river mile 32.5 to 42.0, making this about a 9.5-mile day segment.",
        "sourceUrl": "https://bigpineyriverstwa.org/"
      },
      {
        "label": "Public put-in",
        "value": "Mason Bridge Access",
        "note": "MDC map material identifies Mason Bridge Access in Texas County on the Big Piney River, with parking lot and boat ramp symbols.",
        "sourceUrl": "https://mdc.mo.gov/sites/default/files/mo_nature/downloads/conservation-areas/6110map.pdf"
      },
      {
        "label": "Public take-out",
        "value": "Slabtown Recreation Area",
        "note": "The Forest Service describes Slabtown as a small access and camping area on the Big Piney, about eight miles downriver from Mason Bridge, with a boat launch and parking.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/slabtown-recreation-area"
      },
      {
        "label": "Take-out coordinates",
        "value": "37.561549, -92.03214279",
        "note": "The Forest Service publishes this latitude and longitude for Slabtown Recreation Area.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/slabtown-recreation-area"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 06930000",
        "note": "USGS Big Piney River near Big Piney showed same-day May 31, 2026 discharge and gage-height observations, with 375 cfs and 3.16 ft at 06:00 CDT during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06930000"
      },
      {
        "label": "Low-water floor",
        "value": "309 cfs minimum-only",
        "note": "Rivers.MOHERP Big Piney gauge bands put the start of Low at 309 cfs. The app reuses this conservative floor from adjacent Big Piney routes and does not infer an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168"
      },
      {
        "label": "Exact route reports",
        "value": "Mason Bridge to Slabtown rows",
        "note": "Rivers.MOHERP includes exact Mason Bridge-to-Slabtown trip rows on the Big Piney gauge, including good-condition rows below and near the app low-water floor. The app keeps the broader low-water floor for consistency with adjacent Big Piney records.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168"
      },
      {
        "label": "Route character",
        "value": "Riffles, pools, gravel bottom",
        "note": "The Forest Service says the Big Piney has runs or riffles with pools and a mostly gravel bottom, can be murky after rain, and can rise rapidly.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/big-piney-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Slabtown Recreation Area",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/slabtown-recreation-area",
        "provider": "local"
      },
      {
        "label": "Forest Service Big Piney River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/big-piney-river",
        "provider": "local"
      },
      {
        "label": "MDC Mason Bridge Access map",
        "url": "https://mdc.mo.gov/sites/default/files/mo_nature/downloads/conservation-areas/6110map.pdf",
        "provider": "local"
      },
      {
        "label": "Big Piney River Stream Team Watershed Association",
        "url": "https://bigpineyriverstwa.org/",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Big Piney gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 06930000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06930000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 06930000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06930000",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "big-piney-river-slabtown-ross",
    "slug": "big-piney-river-slabtown-ross",
    "name": "Big Piney River",
    "reach": "Slabtown Recreation Area to Ross Access",
    "aliases": [
      "Big Piney - Slabtown to Ross",
      "Big Piney River - Slabtown to Ross Bridge",
      "Big Piney River - Slabtown Access to Ross Access"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Long Big Piney day or light overnight from Forest Service Slabtown Recreation Area to MDC Ross Access. Public endpoints, same-day USGS data, and an exact MoHERP trip row support conservative low-water-only scoring.",
    "statusText": "Use the Big Piney River near Big Piney gauge. Below about 310 cfs, MoHERP rates the river poor and long riffles can mean dragging or portages. This route has no defended high-water cutoff, so treat rising water, storms, and the long mileage cautiously.",
    "latitude": 37.561549,
    "longitude": -92.03214279,
    "gaugeSource": {
      "id": "usgs-06930000",
      "provider": "usgs",
      "siteId": "06930000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Piney River near Big Piney, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06930000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 309,
      "thresholdSource": {
        "label": "Rivers.MOHERP Big Piney River gauge bands at Big Piney and exact Slabtown-to-Ross trip row",
        "url": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The Forest Service says the spring-fed Big Piney is usually floatable year-round unless especially dry, but it also notes the Slabtown-to-Ross section is narrower, shallower, and riffly. Low water can stretch this into a slow, draggy day; rain can make the river rise rapidly and muddy the landings.",
      "difficulty": "moderate",
      "difficultyNotes": "The water is generally Ozark Class I-style floating, but 15-plus miles, shallow riffles, limited bailout choices, and a remote shuttle make this more committed than the shorter Big Piney day segments. Treat it as moderate unless your group intentionally plans a light overnight.",
      "confidenceNotes": "Confidence is good for a conservative follow-on route: the Forest Service confirms Slabtown as a Big Piney access and describes the Slabtown-to-Ross character, MDC confirms Ross Access as public Big Piney floating/fishing access, Big Piney River Stream Team Watershed Association lists Slabtown to Six Crossings and Six Crossings to Ross Access mileages, Rivers.MOHERP has an exact Slabtown-to-Ross trip row on USGS 06930000, and official USGS 06930000 showed same-day May 31, 2026 discharge and gage-height observations. The app uses only the established 309 cfs Big Piney low-water floor and does not claim an ideal range or high-water cutoff."
    },
    "evidenceNotes": [
      {
        "label": "Route mileage",
        "value": "About 15.6 to 17 mi",
        "note": "Big Piney River Stream Team Watershed Association lists Slabtown to Six Crossings as mile 42.0 to 50.8 and Six Crossings to Ross Access as mile 50.8 to 57.6, while the MoHERP exact trip row records Slabtown to Ross Bridge as 17.0 miles.",
        "sourceUrl": "https://bigpineyriverstwa.org/"
      },
      {
        "label": "Public put-in",
        "value": "Slabtown Recreation Area",
        "note": "The Forest Service describes Slabtown as a small access and camping area on the Big Piney with a boat launch, limited parking, vault toilet, picnic tables, and official coordinates.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/slabtown-recreation-area"
      },
      {
        "label": "Public take-out",
        "value": "Ross Access",
        "note": "MDC lists Ross Access as a public area that provides access for floating and fishing on the Big Piney River, with parking and directions from Duke.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/ross-access"
      },
      {
        "label": "Take-out coordinate anchor",
        "value": "37.66414, -92.05157",
        "note": "Mapcarta / OpenStreetMap identifies the Ross-area MDC slipway near the access at this coordinate. Pair the coordinate with MDC access authority and follow signs and current ramp layout on arrival.",
        "sourceUrl": "https://mapcarta.com/N12547066739"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 06930000",
        "note": "USGS Big Piney River near Big Piney showed same-day May 31, 2026 discharge and gage-height observations, including 395 cfs and 3.21 ft at 15:00 CDT during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06930000"
      },
      {
        "label": "Low-water floor",
        "value": "309 cfs minimum-only",
        "note": "Rivers.MOHERP Big Piney gauge bands put the start of Low at 309 cfs. The app reuses this conservative floor from adjacent Big Piney routes and does not infer an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168"
      },
      {
        "label": "Exact route evidence",
        "value": "Slabtown to Ross Bridge row",
        "note": "Rivers.MOHERP includes an exact Slabtown-to-Ross Bridge row rated Good at 317 cfs / 2.93 ft, recorded as a combined two-day trip. That supports the gauge relationship but the app still warns that this is a long reach.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168"
      },
      {
        "label": "Route character",
        "value": "Narrower, shallower, riffly below Slabtown",
        "note": "The Forest Service says the Big Piney is usually floatable unless particularly dry and specifically notes that downriver from Slabtown the river is narrow and shallower, with multiple riffles, before widening below Ross Bridge.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/big-piney-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Slabtown Recreation Area",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/slabtown-recreation-area",
        "provider": "local"
      },
      {
        "label": "Forest Service Big Piney River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/big-piney-river",
        "provider": "local"
      },
      {
        "label": "MDC Ross Access",
        "url": "https://mdc.mo.gov/discover-nature/places/ross-access",
        "provider": "local"
      },
      {
        "label": "MDC Ross Access map",
        "url": "https://mdc.mo.gov/sites/default/files/mo_nature/downloads/conservation-areas/6306map.pdf",
        "provider": "local"
      },
      {
        "label": "Big Piney River Stream Team Watershed Association",
        "url": "https://bigpineyriverstwa.org/",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Big Piney gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 06930000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06930000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 06930000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06930000",
        "provider": "usgs"
      },
      {
        "label": "Ross Access coordinate record",
        "url": "https://mapcarta.com/N12547066739",
        "provider": "local"
      }
    ]
  },
  {
    "id": "big-piney-river-dogs-bluff-mineral-springs",
    "slug": "big-piney-river-dogs-bluff-mineral-springs",
    "name": "Big Piney River",
    "reach": "Dogs Bluff Access to Mineral Springs Access",
    "aliases": [
      "Big Piney River - Dog's Bluff to Mineral Springs",
      "Big Piney - Dogs Bluff to Mineral Springs",
      "Big Piney River Houston day float"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Short upper Big Piney day near Houston between two MDC public accesses. The route has clear public ramps, a named 4.9-mile Big Piney route listing, and the same direct USGS gauge used conservatively by adjacent Big Piney routes.",
    "statusText": "Use the Big Piney River near Big Piney gauge as a same-river level check. Below about 310 cfs, MoHERP rates the Big Piney poor and shallow riffles can mean dragging. No ideal range or high-water cutoff is claimed, so treat rising water and storms cautiously.",
    "latitude": 37.327222,
    "longitude": -92.001944,
    "gaugeSource": {
      "id": "usgs-06930000",
      "provider": "usgs",
      "siteId": "06930000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Piney River near Big Piney, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06930000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 309,
      "thresholdSource": {
        "label": "Rivers.MOHERP Big Piney River gauge bands at Big Piney and Dogs-Bluff-to-Mineral-Springs trip row",
        "url": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=72",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The spring-fed Big Piney is usually a spring-through-fall float, but dry spells can expose riffles and post-rain rises can quickly make landings and bends less forgiving. Use this as a same-day low-water check, not a full preferred-range forecast.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short Ozark day float with public ramps at both ends. Keep the easy rating conditional on ordinary stable water; high or rising flows, wood, rural access limits, and private-bank discipline can raise the consequence quickly.",
      "confidenceNotes": "Confidence is good for a conservative Big Piney follow-on: MDC confirms Dogs Bluff and Mineral Springs as public Big Piney River accesses with boat ramps, Big Piney River Stream Team Watershed Association lists Dogs Bluff to Mineral Springs as mile 10.7 to 15.6, Rivers.MOHERP includes an exact Dogs Bluff-to-Mineral Springs row on USGS 06930000, and official USGS 06930000 exposed recent May 31, 2026 discharge and gage-height observations during review. The app reuses the established 309 cfs Big Piney low-water floor from adjacent V2 routes and does not claim an ideal range or high-water cutoff."
    },
    "evidenceNotes": [
      {
        "label": "Route mileage",
        "value": "About 4.9 to 6 mi",
        "note": "Big Piney River Stream Team Watershed Association lists Dogs Bluff to Mineral Springs as mile 10.7 to 15.6. MoHERP records the exact Dogs Bluff-to-Mineral Springs trip as 6.0 miles.",
        "sourceUrl": "https://www.bigpineyriverstwa.org/"
      },
      {
        "label": "Public put-in",
        "value": "MDC Dogs Bluff Access",
        "note": "MDC says Dogs Bluff Access offers Big Piney River access with a boat ramp, picnic area, privy, and directions from Houston.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/dogs-bluff-access"
      },
      {
        "label": "Public take-out",
        "value": "MDC Mineral Springs Access",
        "note": "MDC says Mineral Springs Access offers Big Piney River access with a boat ramp and directions from the north Houston city limit.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/mineral-springs-access"
      },
      {
        "label": "Live same-river gauge",
        "value": "USGS 06930000",
        "note": "USGS Big Piney River near Big Piney showed recent discharge and gage-height observations during review, including 729 cfs and 3.87 ft at 2026-05-31 20:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06930000"
      },
      {
        "label": "Low-water floor",
        "value": "309 cfs minimum-only",
        "note": "Rivers.MOHERP Big Piney gauge bands put the start of Low at 309 cfs. The app uses this same conservative floor as adjacent Big Piney routes and does not infer an ideal range or upper cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=72"
      },
      {
        "label": "Exact route row",
        "value": "Dogs Bluff to Mineral Springs",
        "note": "Rivers.MOHERP includes an exact Dogs Bluff-to-Mineral Springs row on the Big Piney gauge, marked High at 1,840 cfs / 5.23 ft. That supports the gauge relationship and reinforces high-water caution, but it is not converted into a high cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=72"
      },
      {
        "label": "River character",
        "value": "Spring-fed Ozark float",
        "note": "The Forest Service describes the Big Piney as a family-friendly, spring-fed river with limestone bluffs, and says it is usually floatable year-round unless it has been particularly dry.",
        "sourceUrl": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/big-piney-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Dogs Bluff Access",
        "url": "https://mdc.mo.gov/discover-nature/places/dogs-bluff-access",
        "provider": "local"
      },
      {
        "label": "MDC Mineral Springs Access",
        "url": "https://mdc.mo.gov/discover-nature/places/mineral-springs-access",
        "provider": "local"
      },
      {
        "label": "Big Piney River Stream Team Watershed Association",
        "url": "https://www.bigpineyriverstwa.org/",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Big Piney gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=06930000&hours=72",
        "provider": "local"
      },
      {
        "label": "USGS 06930000 current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06930000",
        "provider": "usgs"
      },
      {
        "label": "Forest Service Big Piney River",
        "url": "https://www.fs.usda.gov/r09/marktwain/recreation/groups/big-piney-river",
        "provider": "local"
      },
      {
        "label": "Dogs Bluff coordinate record",
        "url": "https://wikimapia.org/27056906/Dogs-Bluff-Access",
        "provider": "local"
      },
      {
        "label": "Mineral Springs coordinate record",
        "url": "https://boatrampfinder.com/ramps/mineral-springs-access/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "james-river-joe-crighton-lake-springfield",
    "slug": "james-river-joe-crighton-lake-springfield",
    "name": "James River",
    "reach": "Joe Crighton Access to Lake Springfield Boathouse",
    "aliases": [
      "James River Water Trail",
      "James River - Joe Crighton to Lake Springfield",
      "James River - Crighton to Lake Springfield Boathouse",
      "James River - Joe Crighton to Southwood to Lake Springfield"
    ],
    "state": "Missouri",
    "region": "Springfield area",
    "summary": "Springfield-area James River Water Trail from Joe Crighton Access to Lake Springfield Boathouse, using the direct Springfield gauge and conservative minimum-only MoHERP evidence.",
    "statusText": "Use the James River near Springfield gauge. Around 40 cfs is the low-water marker for this route, but the app does not claim an ideal range or high-water cutoff. Recent rain can quickly turn this river-to-lake finish into a pushier, muddier trip.",
    "latitude": 37.1557274593,
    "longitude": -93.1993452603,
    "gaugeSource": {
      "id": "usgs-07050700",
      "provider": "usgs",
      "siteId": "07050700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "James River near Springfield, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07050700/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 40,
      "thresholdSource": {
        "label": "Rivers.MOHERP Springfield gauge James route-family evidence",
        "url": "https://mail.rivers.moherp.org/gauge/?gauge=07050700&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "This Springfield reach is most practical from spring through fall. Summer dry spells can leave the upstream current slow, buggy, and muddy, while thunderstorms can quickly raise the river, move fresh wood, and create a windier lake finish.",
      "difficulty": "easy",
      "difficultyNotes": "At ordinary levels this is an easy recreational float with a short moving-water section above Lake Springfield and a slower open-water finish into the boathouse area. High or rising water, bridge current, wood, and afternoon lake wind make it less forgiving.",
      "confidenceNotes": "Confidence is good enough for a conservative Missouri add. MDC confirms Joe Crighton as a public James River access and the start of the water trail, Springfield-Greene County Park Board confirms the public boathouse finish area, and the official Lake Springfield Park map now clearly separates the boathouse from the separate boat launch while the Park Board Google map/KML pins the boathouse placemark at 37.1159741, -93.2517345. USGS Water Services IV returned same-day June 18, 2026 values for 07050700, and Ozark Greenways / Springfield tourism still support the Joe Crighton-to-Lake Springfield route shape. The app uses only a 40 cfs minimum-only floor because the threshold evidence comes from MoHERP gauge bands and adjacent route-family trips rather than a manager-published exact-route range, and source mileage varies between about 4.5 and 6 miles."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "MDC Joe Crighton Access",
        "note": "MDC says Joe Crighton Access provides public access to the James River, includes stairs to the river, and marks the start of the James River Water Trail. The area is day use only.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/joe-crighton-access"
      },
      {
        "label": "Public take-out",
        "value": "Lake Springfield Boathouse",
        "note": "Springfield-Greene County Park Board lists Lake Springfield Park and Boathouse as a public park facility with accessible parking, rentals, and James River Water Trail use. The official park trail map labels the Boathouse and the separate Boat Launch as different shoreline destinations, and the Park Board Google map/KML pins the Boathouse placemark at 37.1159741, -93.2517345.",
        "sourceUrl": "https://www.parkboard.org/255/Lake-Springfield-Park-and-Boathouse"
      },
      {
        "label": "Route shape",
        "value": "Joe Crighton to Lake Springfield Boathouse, about 4.5 to 6 miles",
        "note": "Park Board rental guidance says the James River Water Trail route runs about 4.5 miles one way past Creighton Access, while Springfield tourism and Ozark Greenways describe the Joe Crighton-to-Lake Springfield Boathouse route as the standard upper-James water trail and commonly call it about 6 miles. The app preserves that uncertainty rather than claiming a tighter measurement.",
        "sourceUrl": "https://www.springfieldmo.org/listings/james-river-water-trail/5820/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07050700",
        "note": "USGS Water Services IV returned same-day June 18, 2026 observations of 1,140 cfs and 7.16 ft for James River near Springfield. The Springfield gauge is the same direct corridor gauge used by MoHERP route-family evidence for Joe Crighton, Southwood, and Lake Springfield.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07050700"
      },
      {
        "label": "Low-water floor",
        "value": "40 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Springfield gauge Low beginning at 40 cfs and Good beginning at 150 cfs, while route-family trips include a Low Crighton-to-Southwood row at 25 cfs and higher-water Southwood-to-Lake Springfield rows at 448 and 1,390 cfs. Paddle Today uses only the conservative 40 cfs floor and does not infer an ideal or high-water cutoff.",
        "sourceUrl": "https://mail.rivers.moherp.org/gauge/?gauge=07050700&hours=168"
      },
      {
        "label": "Coordinates",
        "value": "37.1557274593, -93.1993452603 to 37.1159741, -93.2517345",
        "note": "The Joe Crighton put-in uses the Missouri Department of Conservation ArcGIS boat-ramp point. The Lake Springfield take-out uses the Park Board Google map/KML boathouse placemark, accepted in this run because the official park trail map distinguishes the boathouse from the separate boat launch.",
        "sourceUrl": "https://www.parkboard.org/DocumentCenter/View/8420/Lake-Springfield-Park-trails-map"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Joe Crighton Access",
        "url": "https://mdc.mo.gov/discover-nature/places/joe-crighton-access",
        "provider": "local"
      },
      {
        "label": "Springfield-Greene County Park Board Lake Springfield Park and Boathouse",
        "url": "https://www.parkboard.org/255/Lake-Springfield-Park-and-Boathouse",
        "provider": "local"
      },
      {
        "label": "Lake Springfield Park trail map",
        "url": "https://www.parkboard.org/DocumentCenter/View/8420/Lake-Springfield-Park-trails-map",
        "provider": "local"
      },
      {
        "label": "Springfield James River Water Trail listing",
        "url": "https://www.springfieldmo.org/listings/james-river-water-trail/5820/",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP James River Springfield gauge",
        "url": "https://mail.rivers.moherp.org/gauge/?gauge=07050700&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07050700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07050700/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07050700 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07050700",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "james-river-delaware-town-shelvin-rock",
    "slug": "james-river-delaware-town-shelvin-rock",
    "name": "James River",
    "reach": "Delaware Town Access to Shelvin Rock Access",
    "aliases": [
      "James River - Delaware Town to Shelvin Rock",
      "James River - Delaware to Shelvin",
      "Middle James River - Delaware Town to Shelvin Rock"
    ],
    "state": "Missouri",
    "region": "Southwest Missouri",
    "summary": "Middle James River day float from MDC Delaware Town Access to MDC Shelvin Rock Access. It uses the direct Boaz USGS gauge and route-specific MoHERP evidence, with conservative low-water-only scoring.",
    "statusText": "Use the James River near Boaz gauge. Around 275 cfs is the low-water marker for this reach; below that, expect dragging through shallow riffles and slow pools. No ideal range or high-water cutoff is claimed, so treat recent rain and rising water cautiously.",
    "latitude": 37.0511,
    "longitude": -93.3914,
    "gaugeSource": {
      "id": "usgs-07052250",
      "provider": "usgs",
      "siteId": "07052250",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "James River near Boaz, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07052250/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 275,
      "thresholdSource": {
        "label": "Rivers.MOHERP Boaz gauge Delaware-to-Shelvin trip evidence",
        "url": "https://mail.rivers.moherp.org/gauge/?gauge=07052250&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The middle James is commonly floated in spring through fall. Summer dry spells can make this route shallow and tedious, while storms can quickly add cloudy water, pushier ledges, fresh wood, and harder landings.",
      "difficulty": "easy",
      "difficultyNotes": "This is a recreational Ozark float with long pools, riffles, gravel bars, and a couple of ledge-rock drops noted in trip evidence. It is easy only at ordinary levels; high or rising water can make ledges, bends, and strainers less forgiving.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: MDC confirms Delaware Town and Shelvin Rock as public James River day-use accesses with boat ramps and parking, James River Basin Partnership names Delaware Town-to-Shelvin Rock as a float-series route, Rivers.MOHERP lists exact 6.5-mile Delaware-to-Shelvin rows on the Boaz gauge including an about-minimum-water report at 275 cfs, and the official USGS legacy current page exposed same-day May 30, 2026 discharge and gage-height values for 07052250 during this run. The app uses minimum-only scoring because the threshold source is community-calibrated rather than an official paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "MDC Delaware Town Access",
        "note": "MDC says Delaware Town Access provides access to the James River, with a boat ramp and two parking lots. The area is day use only and camping is not allowed.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/delaware-town-access"
      },
      {
        "label": "Public take-out",
        "value": "MDC Shelvin Rock Access",
        "note": "MDC says Shelvin Rock Access provides access to the James River, with two parking lots and a boat ramp. The area is day use only and camping is not allowed.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/shelvin-rock-access"
      },
      {
        "label": "Route shape",
        "value": "Delaware Town to Shelvin Rock, 6.5 miles",
        "note": "Rivers.MOHERP lists Delaware-to-Shelvin Rock trip rows at 6.5 miles, and James River Basin Partnership names Delaware Town to Shelvin Rock Access as a float-series route.",
        "sourceUrl": "https://mail.rivers.moherp.org/gauge/?gauge=07052250&hours=168"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07052250",
        "note": "USGS James River near Boaz showed same-day May 30, 2026 discharge and gage-height observations during this review. The gauge is on the middle James route corridor and is the gauge used by MoHERP for Delaware-to-Shelvin rows.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07052250"
      },
      {
        "label": "Low-water floor",
        "value": "275 cfs minimum-only",
        "note": "MoHERP exact-route evidence includes a Delaware-to-Shelvin trip at 275 cfs on the Boaz gauge where most of the river was fine but a few low areas required dragging; the report calls that about the minimum recommended water level for this section.",
        "sourceUrl": "https://mail.rivers.moherp.org/gauge/?gauge=07052250&hours=168"
      },
      {
        "label": "Route character",
        "value": "Ledge-rock drops and long pools",
        "note": "MoHERP Delaware-to-Shelvin trip notes mention at least two ledge-rock drops, and broader James River sources describe this middle reach as a mix of riffles, calm stretches, gravel bars, and scenic Ozark water.",
        "sourceUrl": "https://www.jamesriverbasin.com/explore"
      },
      {
        "label": "Coordinates",
        "value": "37.0511, -93.3914 to 36.99564609, -93.3697183",
        "note": "Delaware Town is anchored to a public paddling directory coordinate that cites USGS ScienceBase location data and MDC confirms the access name. Shelvin Rock uses the existing V2 Shelvin Rock access coordinate paired with MDC access confirmation.",
        "sourceUrl": "https://thepaddlinghub.com/directory/missouri/delaware-town-access"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Delaware Town Access",
        "url": "https://mdc.mo.gov/discover-nature/places/delaware-town-access",
        "provider": "local"
      },
      {
        "label": "MDC Shelvin Rock Access",
        "url": "https://mdc.mo.gov/discover-nature/places/shelvin-rock-access",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP James River Boaz gauge",
        "url": "https://mail.rivers.moherp.org/gauge/?gauge=07052250&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07052250 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07052250/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07052250 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07052250",
        "provider": "usgs"
      },
      {
        "label": "James River Basin Partnership Delaware Town to Shelvin Rock float",
        "url": "https://www.jamesriverbasin.com/calendar/jul24-37north-float-7a7ke",
        "provider": "local"
      },
      {
        "label": "James River Basin Partnership explore map",
        "url": "https://www.jamesriverbasin.com/explore",
        "provider": "local"
      },
      {
        "label": "Delaware Town Access coordinate record",
        "url": "https://thepaddlinghub.com/directory/missouri/delaware-town-access",
        "provider": "local"
      }
    ]
  },
  {
    "id": "james-river-shelvin-rock-hooten-town",
    "slug": "james-river-shelvin-rock-hooten-town",
    "name": "James River",
    "reach": "Shelvin Rock Access to Hooten Town Access",
    "aliases": [
      "James River - Shelvin Rock to Hootentown",
      "James River - Shelvin Rock Access to Hooten Town Access"
    ],
    "state": "Missouri",
    "region": "Southwest Missouri",
    "summary": "Popular lower James day float from MDC Shelvin Rock Access to MDC Hooten Town Access, using two public boat-ramp accesses and the Galena gauge downstream as a conservative low-water check.",
    "statusText": "Use the James River at Galena gauge. Around 200 cfs is the low-water marker for this lower-James route; below that, expect dragging in riffles and slow pools. Paddler reports will help tune the useful range.",
    "latitude": 36.99564609,
    "longitude": -93.3697183,
    "gaugeSource": {
      "id": "usgs-07052500",
      "provider": "usgs",
      "siteId": "07052500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "James River at Galena, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07052500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Rivers.MOHERP Galena gauge trip evidence for Shelvin Rock to Hooten Town",
        "url": "https://rivers.moherp.org/gauge/?gauge=7052500&hours=0",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The lower James is commonly floated in spring through fall, but low summer water can mean slow pools and scraping. Rain can improve depth while also adding pushy current, cloudy water, fresh wood, and harder landings.",
      "difficulty": "easy",
      "difficultyNotes": "This is a broad recreational Ozark river segment with riffles, pools, gravel bars, bluffs, and heavy warm-season boat and tube traffic. It remains an easy route only at ordinary levels; high or rising water can make bends, strainers, and landings less forgiving.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: MDC confirms Shelvin Rock and Hooten Town as public James River day-use accesses with boat ramps and parking, Rivers.MOHERP includes exact Shelvin Rock-to-Hootentown trip evidence tied to USGS 07052500, and the Galena gauge showed current same-day values during the May 26, 2026 review after earlier stale-data checks. The app uses minimum-only scoring because the threshold source is community trip evidence rather than an official manager-published paddling band, and no upper cutoff is claimed."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "MDC Shelvin Rock Access",
        "note": "MDC says Shelvin Rock Access provides access to the James River, with two parking lots and a boat ramp. The area is day use only and camping is not allowed.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/shelvin-rock-access"
      },
      {
        "label": "Public take-out",
        "value": "MDC Hooten Town Access",
        "note": "MDC says Hooten Town Access is on the James River, with a boat ramp and large parking lot. The area is day use only and camping is not allowed.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/hooten-town-access"
      },
      {
        "label": "Route-specific trip evidence",
        "value": "Shelvin Rock to Hooten Town, 6.2 miles",
        "note": "Rivers.MOHERP lists exact Shelvin Rock-to-Hootentown trip rows at 6.2 miles, including good-condition reports at 194, 370, and 467 cfs on the Galena gauge.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=7052500&hours=0"
      },
      {
        "label": "Low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Exact-route good reports around 194 cfs and broader lower-James reports around 180 to 300 cfs support a conservative 200 cfs floor. The app does not infer an ideal range or high-water cutoff from those trip rows.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=7052500&hours=0"
      },
      {
        "label": "Live gauge",
        "value": "USGS 07052500",
        "note": "USGS operates James River at Galena, MO. During this review, the MoHERP gauge page exposed current same-day Galena values after earlier stale-data checks had blocked the route.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07052500/"
      },
      {
        "label": "Access rules",
        "value": "MDC day-use access areas",
        "note": "MDC area regulations allow boat use on waters located on department areas, prohibit leaving boats unattended overnight, and require users to follow posted signs, maps, and area rules.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/shelvin-rock-access"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Shelvin Rock Access",
        "url": "https://mdc.mo.gov/discover-nature/places/shelvin-rock-access",
        "provider": "local"
      },
      {
        "label": "MDC Hooten Town Access",
        "url": "https://mdc.mo.gov/discover-nature/places/hooten-town-access",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP James River Galena gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=7052500&hours=0",
        "provider": "local"
      },
      {
        "label": "USGS 07052500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07052500/",
        "provider": "usgs"
      },
      {
        "label": "James River Basin Partnership Shelvin Rock to Hooten Town float",
        "url": "https://www.jamesriverbasin.com/calendar/aug-37north-float",
        "provider": "local"
      }
    ]
  },
  {
    "id": "james-river-hl-kerr-ralph-cox",
    "slug": "james-river-hl-kerr-ralph-cox",
    "name": "James River",
    "reach": "H.L. Kerr Access to Ralph Cox Memorial Access",
    "aliases": [
      "James River - Kerr Access to Cox Access",
      "James River - H.L. Kerr Access to Ralph Cox Memorial Access",
      "James River - Kerr to Galena Y Bridge"
    ],
    "state": "Missouri",
    "region": "Southwest Missouri",
    "summary": "Short Galena-area James River float from MDC H.L. Kerr Access to MDC Ralph Cox Memorial Access near the Y-Bridge, using the direct Galena gauge as a conservative low-water check.",
    "statusText": "Use the James River at Galena gauge. Around 200 cfs is the low-water marker; below that, expect dragging, slow pools, and exposed riffles. Paddler reports will help tune the useful range.",
    "latitude": 36.832233,
    "longitude": -93.446571,
    "gaugeSource": {
      "id": "usgs-07052500",
      "provider": "usgs",
      "siteId": "07052500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "James River at Galena, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07052500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Rivers.MOHERP Galena gauge trip evidence for Kerr to Cox",
        "url": "https://rivers.moherp.org/gauge/?gauge=7052500&hours=72",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The Galena-area James is commonly floated in spring through fall. Low summer water can make the short route slow and scrapey; rain can improve depth but can also add cloudy water, fresh wood, and harder landings.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short recreational Ozark river segment with riffles, pools, gravel bars, rock features, and town-side access near Galena. It remains easy only at ordinary levels; high or rising water can make bends, strainers, and the Cox landing less forgiving.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: MDC confirms H.L. Kerr and Ralph Cox Memorial as public James River day-use accesses with boat ramps and parking, James River Basin Partnership identifies Kerr-to-Ralph-Cox as a scenic local James float, Rivers.MOHERP includes exact Kerr-to-Cox trip evidence tied to USGS 07052500, and this app already fetches the Galena gauge for the adjacent Shelvin Rock-to-Hooten Town route. The app uses minimum-only scoring because the threshold source is community trip evidence rather than an official manager-published paddling band, and no upper cutoff is claimed."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "MDC H.L. Kerr Access",
        "note": "MDC says H.L. Kerr Access provides access to the James River, with a parking lot and boat ramp. The area is day use only and camping is not allowed.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/h-l-kerr-access"
      },
      {
        "label": "Public take-out",
        "value": "MDC Ralph Cox Memorial Access",
        "note": "MDC says Ralph Cox Memorial Access provides James River access just east of Galena, with an ADA-accessible concrete boat ramp, privy, and large parking lot. The area is day use only and camping is not allowed.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/ralph-cox-memorial-access"
      },
      {
        "label": "Route shape",
        "value": "Kerr to Ralph Cox / Galena",
        "note": "James River Basin Partnership describes the float from H.L. Kerr Access to Ralph Cox Access as one of the scenic James River floats near the historic Y-Bridge.",
        "sourceUrl": "https://www.jamesriverbasin.com/river-ramblings/explore-the-watershed-y-bridge"
      },
      {
        "label": "Route-specific trip evidence",
        "value": "Kerr to Cox, about 4.8 to 5.5 miles",
        "note": "Rivers.MOHERP lists exact Kerr-to-Cox trip rows on the Galena gauge, including good-condition reports around 306, 361, and 417 cfs.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=7052500&hours=72"
      },
      {
        "label": "Low-water floor",
        "value": "200 cfs minimum-only",
        "note": "Exact Kerr-to-Cox good reports plus broader lower-James Galena-gauge evidence support reusing the conservative 200 cfs floor used for the adjacent lower-James route. The app does not infer an ideal range or high-water cutoff.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=7052500&hours=72"
      },
      {
        "label": "Live gauge",
        "value": "USGS 07052500",
        "note": "USGS operates James River at Galena, MO. This route uses the same direct Galena gauge already configured for the adjacent Shelvin Rock-to-Hooten Town route.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07052500/"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC H.L. Kerr Access",
        "url": "https://mdc.mo.gov/discover-nature/places/h-l-kerr-access",
        "provider": "local"
      },
      {
        "label": "MDC Ralph Cox Memorial Access",
        "url": "https://mdc.mo.gov/discover-nature/places/ralph-cox-memorial-access",
        "provider": "local"
      },
      {
        "label": "James River Basin Partnership Y-Bridge float context",
        "url": "https://www.jamesriverbasin.com/river-ramblings/explore-the-watershed-y-bridge",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP James River Galena gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=7052500&hours=72",
        "provider": "local"
      },
      {
        "label": "USGS 07052500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07052500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "gasconade-river-rollins-ferry-pointers-creek",
    "slug": "gasconade-river-rollins-ferry-pointers-creek",
    "name": "Gasconade River",
    "reach": "Rollins Ferry Access to Pointers Creek Access",
    "aliases": [
      "Gasconade River - Rollins Ferry to Pointers Creek",
      "Gasconade River - Rich Fountain to Pointers Creek",
      "Gasconade River Highway 89 to Pointers Creek"
    ],
    "state": "Missouri",
    "region": "Central Missouri",
    "summary": "Seven-mile lower Gasconade day from MDC Rollins Ferry Access to MDC Pointers Creek Access. MDC uses this exact route for a guided paddling program, and the Rich Fountain USGS gauge sits in the put-in corridor.",
    "statusText": "Use the Gasconade River near Rich Fountain gauge. Around 1,100 cfs is the conservative low-water floor; below that, expect dragging, slow pools, and reduced float length. High or rising water can make this broad river unsafe for casual trips.",
    "latitude": 38.393528,
    "longitude": -91.820729,
    "gaugeSource": {
      "id": "usgs-06934000",
      "provider": "usgs",
      "siteId": "06934000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Gasconade River near Rich Fountain, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06934000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 1100,
      "thresholdSource": {
        "label": "Rivers.MOHERP Rich Fountain gauge bands for the Gasconade River",
        "url": "https://rivers.moherp.org/gauge/?gauge=06934000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The lower Gasconade is commonly paddled in spring through fall. Low water can make this short route slow and scrapey, while rain or releases can turn the river pushy, muddy, and debris-filled.",
      "difficulty": "easy",
      "difficultyNotes": "This is a broad recreational Gasconade segment with pools, gravel bars, motorboat traffic, and ordinary Class I moving-water decisions. It should stay an easy route only at ordinary, stable levels; high or rising water raises the consequence of bends, strainers, islands, and landings.",
      "confidenceNotes": "Confidence is good but intentionally conservative: MDC confirms both Rollins Ferry and Pointers Creek as public Gasconade River accesses, MDC advertises the exact Rollins-Ferry-to-Pointers-Creek route as a 7-mile guided paddling trip, USGS 06934000 exposed same-day May 30, 2026 discharge and gage-height values during review, and Rivers.MOHERP provides gauge-level condition bands for the Rich Fountain gauge. The app uses only a minimum-only floor because MoHERP had no exact trip rows for this route, and no ideal range or upper cutoff is claimed."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "MDC Rollins Ferry Access",
        "note": "MDC map material identifies Rollins Ferry Access on the Gasconade River with a boat ramp, privy, parking, and primitive camping area.",
        "sourceUrl": "https://mdc.mo.gov/media/79794"
      },
      {
        "label": "Public take-out",
        "value": "MDC Pointers Creek Access",
        "note": "MDC confirms Pointers Creek Access on the Gasconade River, with directions, area rules, boat-use rules, camping, fishing, and photo documentation of the boat ramp.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/pointers-creek-access"
      },
      {
        "label": "Official route shape",
        "value": "Rollins Ferry to Pointers Creek, 7 miles",
        "note": "MDC describes a guided Gasconade River paddling outing from Rollins Ferry to Pointers Creek Access as a 7-mile route.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/activities/paddling"
      },
      {
        "label": "River-mile support",
        "value": "About 7.4 river miles",
        "note": "Missouri Float Trips places Rollins Ferry Access at river mile 203.4 and Pointers Creek Access at river mile 210.8 on the Gasconade River.",
        "sourceUrl": "https://www.floatmissouri.com/plan/missouri-rivers/gasconade-river/"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 06934000",
        "note": "USGS operates Gasconade River near Rich Fountain, MO. The official legacy current-conditions page showed same-day May 30, 2026 discharge and gage-height observations during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06934000"
      },
      {
        "label": "Low-water floor",
        "value": "1,100 cfs minimum-only",
        "note": "Rivers.MOHERP Rich Fountain gauge bands put the start of Low near 1,074 cfs and the start of Good near 1,994 cfs. The app uses a rounded 1,100 cfs low-water floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06934000&hours=168"
      },
      {
        "label": "High-water caution",
        "value": "No numeric cutoff claimed",
        "note": "MoHERP labels higher Rich Fountain levels as High and Flood with strong caution language, but exact-route high-water calibration is missing. Treat high or rising water as unsuitable for casual trips.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06934000&hours=168"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Paddling programs",
        "url": "https://mdc.mo.gov/discover-nature/activities/paddling",
        "provider": "local"
      },
      {
        "label": "MDC Rollins Ferry Access map",
        "url": "https://mdc.mo.gov/media/79794",
        "provider": "local"
      },
      {
        "label": "MDC Pointers Creek Access",
        "url": "https://mdc.mo.gov/discover-nature/places/pointers-creek-access",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Gasconade River Rich Fountain gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=06934000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 06934000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06934000/",
        "provider": "usgs"
      },
      {
        "label": "Missouri Float Trips Gasconade River guide",
        "url": "https://www.floatmissouri.com/plan/missouri-rivers/gasconade-river/",
        "provider": "local"
      },
      {
        "label": "Rollins Ferry public paddling-location coordinates",
        "url": "https://paddling.com/paddle/locations/rich-fountain-access",
        "provider": "local"
      },
      {
        "label": "Pointers Creek public location coordinates",
        "url": "https://www.camping.org/campgrounds/missouri/linn/pointers-creek-access",
        "provider": "local"
      }
    ]
  },
  {
    "id": "gasconade-river-pointers-creek-cooper-hill",
    "slug": "gasconade-river-pointers-creek-cooper-hill",
    "name": "Gasconade River",
    "reach": "Pointers Creek Access to Cooper Hill Conservation Area",
    "aliases": [
      "Gasconade River - Pointers Creek to Cooper Hill",
      "Gasconade River - Pointers Creek to Third Creek",
      "Lower Gasconade River - Pointers Creek to Cooper Hill"
    ],
    "state": "Missouri",
    "region": "Central Missouri",
    "summary": "Short lower Gasconade day from MDC Pointers Creek Access to the hand-launch river access at Cooper Hill Conservation Area. Public endpoints are clear, and the Rich Fountain USGS gauge gives the same lower-river level check used by the adjacent upstream segment.",
    "statusText": "Use the Gasconade River near Rich Fountain gauge. Around 1,100 cfs is the conservative low-water floor; below that, expect dragging, slow pools, and shortened float plans. High or rising water can make this broad river unsafe for casual trips.",
    "latitude": 38.424847,
    "longitude": -91.742545,
    "gaugeSource": {
      "id": "usgs-06934000",
      "provider": "usgs",
      "siteId": "06934000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Gasconade River near Rich Fountain, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06934000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 1100,
      "thresholdSource": {
        "label": "Rivers.MOHERP Rich Fountain gauge bands for the Gasconade River",
        "url": "https://rivers.moherp.org/gauge/?gauge=06934000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The lower Gasconade is commonly paddled in spring through fall. Low water can make this route slow and scrapey, while rain can turn the river pushy, muddy, and debris-filled.",
      "difficulty": "easy",
      "difficultyNotes": "This is a broad recreational Gasconade segment with pools, gravel bars, motorboat traffic, and ordinary Class I moving-water decisions. It stays easy only at ordinary, stable levels; high or rising water raises the consequence of bends, strainers, islands, and hand-launch landings.",
      "confidenceNotes": "Confidence is good for a conservative adjacent Gasconade add: MDC confirms Pointers Creek as a public Gasconade River access, MDC confirms Cooper Hill has hand-launch access to the Gasconade from the parking lot and CR 821, Missouri Float Trips / MDC-reprint mile notes place Pointers Creek and Cooper Hill about 5.8 river miles apart, and USGS 06934000 exposed same-day May 31, 2026 discharge and gage-height observations during review. Threshold confidence is intentionally limited because Rivers.MOHERP has gauge-level Rich Fountain bands but zero exact trip rows for this reach, so the app uses minimum-only scoring and does not claim an ideal range or upper cutoff."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "MDC Pointers Creek Access",
        "note": "MDC confirms Pointers Creek Access on the Gasconade River, with directions, area rules, boat-use rules, camping, fishing, and photo documentation of the boat ramp.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/pointers-creek-access"
      },
      {
        "label": "Public take-out",
        "value": "Cooper Hill Conservation Area hand launch",
        "note": "MDC says Cooper Hill includes Gasconade River access and that boats are hand-launched after a short walk from the parking area; a separate MDC feature says floaters can access the river from the parking lot and CR 821, but there is no trailered-boat access.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/cooper-hill-conservation-area"
      },
      {
        "label": "River-mile support",
        "value": "About 5.8 river miles",
        "note": "Missouri Float Trips / MDC-reprint mile notes place Pointers Creek Access at river mile 210.8 and Third Creek / Cooper Hill Access at river mile 216.6.",
        "sourceUrl": "https://www.floatmissouri.com/plan/missouri-rivers/gasconade-river/"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 06934000",
        "note": "USGS operates Gasconade River near Rich Fountain, MO. The official legacy current-conditions page showed 1,640 cfs and 3.36 ft at 2026-05-31 10:30 CDT during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06934000"
      },
      {
        "label": "Low-water floor",
        "value": "1,100 cfs minimum-only",
        "note": "Rivers.MOHERP Rich Fountain gauge bands put the start of Low near 1,074 cfs and the start of Good near 1,994 cfs. The app uses a rounded 1,100 cfs low-water floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06934000&hours=168"
      },
      {
        "label": "High-water caution",
        "value": "No numeric cutoff claimed",
        "note": "MoHERP labels higher Rich Fountain levels as High and Flood with strong caution language, but exact-route high-water calibration is missing. Treat high or rising water as unsuitable for casual trips.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=06934000&hours=168"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Pointers Creek Access",
        "url": "https://mdc.mo.gov/discover-nature/places/pointers-creek-access",
        "provider": "local"
      },
      {
        "label": "MDC Cooper Hill Conservation Area",
        "url": "https://mdc.mo.gov/discover-nature/places/cooper-hill-conservation-area",
        "provider": "local"
      },
      {
        "label": "MDC Cooper Hill feature",
        "url": "https://mdc.mo.gov/node/256137",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Gasconade River Rich Fountain gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=06934000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 06934000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06934000/",
        "provider": "usgs"
      },
      {
        "label": "Missouri Float Trips Gasconade River guide",
        "url": "https://www.floatmissouri.com/plan/missouri-rivers/gasconade-river/",
        "provider": "local"
      },
      {
        "label": "Cooper Hill public location coordinates",
        "url": "https://www.camping.org/campgrounds/missouri/linn/cooper-hill-conservation-area",
        "provider": "local"
      }
    ]
  },
  {
    "id": "big-river-mammoth-merrill-horse",
    "slug": "big-river-mammoth-merrill-horse",
    "name": "Big River",
    "reach": "Mammoth Access to Merrill Horse Access",
    "aliases": [
      "Big River - Mammoth to Merrill Horse",
      "Big River - Mammoth MDC Access to Merrill Horse MDC Access",
      "Big River Richwoods gauge section"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Short Big River day between two MDC public accesses west of De Soto. MDC confirms the access spacing, and the Richwoods gauge sits in the route corridor with route-specific local navigability bands.",
    "statusText": "Use the Big River near Richwoods gauge. The practical float window is roughly 100 to 800 cfs; below 100 cfs, expect scraping, and above 1,200 cfs this section is too high for a general recommendation.",
    "latitude": 38.121076,
    "longitude": -90.676055,
    "gaugeSource": {
      "id": "usgs-07018100",
      "provider": "usgs",
      "siteId": "07018100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big River near Richwoods, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07018100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 800,
      "tooLow": 100,
      "tooHigh": 1200,
      "thresholdSource": {
        "label": "OzarkAnglers Big River section guidance for the Richwoods gauge",
        "url": "https://forums.ozarkanglers.com/waters/rivers/big-river/big-river-sections-r318/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Spring through fall is the normal paddling window. This short reach can scrape during summer low water, while rain can quickly push it into high, muddy, debris-filled water where the current is unsuitable for casual groups.",
      "difficulty": "easy",
      "difficultyNotes": "At ordinary levels this is a short recreational Big River float with gravel riffles, wooded bends, anglers, and MDC access points. It should not be treated as easy when the Richwoods gauge is high or rising, especially above the local 800 cfs caution band.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: MDC confirms Mammoth Access is 5.40 river miles upstream from Merrill Horse Access and provides public department-area boat-use rules for both endpoints; OzarkAnglers names the Mammoth-to-Merrill Horse section, ties it directly to USGS 07018100 at the Highway H / Richwoods corridor, and publishes numeric navigability bands; and the official USGS legacy current-conditions page exposed same-day June 1, 2026 discharge and gage-height observations during review. Threshold confidence remains community-grade, so the app uses a broad two-sided model with practical high-water warnings rather than a polished ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "MDC Mammoth Access",
        "note": "MDC says Mammoth Access is on the Big River, was acquired to provide better public access, and is 5.40 river miles upstream from Merrill Horse Access and the Route H bridge.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/mammoth-access"
      },
      {
        "label": "Public take-out",
        "value": "MDC Merrill Horse Access",
        "note": "MDC says Merrill Horse Access is on the Big River, 5.40 river miles downstream from Mammoth Access and 5.30 miles upstream from Browns Ford Access, with public department-area boat-use rules.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/merrill-horse-access"
      },
      {
        "label": "Route shape",
        "value": "Mammoth to Merrill Horse, 5.4 miles",
        "note": "OzarkAnglers lists Mammoth MDC Access at mile 0.0 and Merrill Horse MDC Access at mile 5.4 for this Big River section. MDC independently gives the same spacing.",
        "sourceUrl": "https://forums.ozarkanglers.com/waters/rivers/big-river/big-river-sections-r318/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07018100",
        "note": "USGS Big River near Richwoods showed same-day June 1, 2026 values of 1,490 cfs and 5.76 ft at 07:00 CDT during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07018100"
      },
      {
        "label": "Gauge fit",
        "value": "Richwoods / Highway H corridor",
        "note": "OzarkAnglers identifies the Richwoods gauge as the reliable gauge for the Mammoth / Merrill Horse section. USGS site metadata places the gauge at 38.159611, -90.706056, effectively in the Merrill Horse / Highway H take-out corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07018100/"
      },
      {
        "label": "Threshold bands",
        "value": "100-800 cfs ordinary float window, 1,200 cfs too high",
        "note": "OzarkAnglers describes under 100 cfs as low but floatable with scraping, 100-800 cfs as floatable, 800-1,200 cfs as very high and dangerous for inexperienced paddlers, and over 1,200 cfs as too high.",
        "sourceUrl": "https://forums.ozarkanglers.com/waters/rivers/big-river/big-river-sections-r318/"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Mammoth Access",
        "url": "https://mdc.mo.gov/discover-nature/places/mammoth-access",
        "provider": "local"
      },
      {
        "label": "MDC Merrill Horse Access",
        "url": "https://mdc.mo.gov/discover-nature/places/merrill-horse-access",
        "provider": "local"
      },
      {
        "label": "OzarkAnglers Big River sections",
        "url": "https://forums.ozarkanglers.com/waters/rivers/big-river/big-river-sections-r318/",
        "provider": "local"
      },
      {
        "label": "USGS 07018100 current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07018100",
        "provider": "usgs"
      },
      {
        "label": "USGS 07018100 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07018100/",
        "provider": "usgs"
      },
      {
        "label": "Paddling.com Mammoth Access coordinate record",
        "url": "https://paddling.com/paddle/locations/mammoth-access-big-river",
        "provider": "local"
      }
    ]
  },
  {
    "id": "shoal-creek-tipton-ford-wildcat",
    "slug": "shoal-creek-tipton-ford-wildcat",
    "name": "Shoal Creek",
    "reach": "Tipton Ford Access to Wildcat Access",
    "aliases": [
      "Shoal Creek - Tipton Ford to Wildcat",
      "Shoal Creek - Tipton Ford to Wildcat Glade",
      "Shoal Creek Joplin day trip"
    ],
    "state": "Missouri",
    "region": "Southwest Missouri",
    "summary": "Swift lower Shoal Creek day from MDC Tipton Ford Access to MDC Wildcat Access in the Joplin area. MDC documents both public accesses and the 6.9-mile spacing, while the direct Joplin USGS gauge gives a conservative low-water check.",
    "statusText": "Use the Shoal Creek above Joplin gauge. Around 225 cfs is the conservative low-water floor; below that, expect dragging, tight riffles, and possible walking. High or rising water can make channels, wood, and bridge approaches dangerous.",
    "latitude": 36.98367,
    "longitude": -94.441028,
    "gaugeSource": {
      "id": "usgs-07187000",
      "provider": "usgs",
      "siteId": "07187000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Shoal Creek above Joplin, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07187000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 225,
      "thresholdSource": {
        "label": "Rivers.MOHERP Joplin gauge ratings and lower Shoal Creek trip logs",
        "url": "https://rivers.moherp.org/gauge/?gauge=07187000&hours=24",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Shoal Creek can be a good spring-through-fall Joplin-area float when it has enough water, but it responds quickly to rain. Treat rising water as a serious warning because split channels, strainers, bridge current, and chert ledges get less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "National Rivers Project lists Shoal Creek as Class I-II, and lower-Shoal trip notes mention log jams, brush piles, and a treacherous split channel at high water. At ordinary levels this is a practical day float, but it is not a lazy pool-to-pool novice route.",
      "confidenceNotes": "Confidence is good for a conservative Missouri add: MDC confirms Tipton Ford and Wildcat as public Shoal Creek accesses, the MDC Shoal Creek Accesses plan says Wildcat is 6.9 river miles below Tipton Ford, USGS 07187000 now exposes same-day May 30, 2026 discharge and gage-height values on the official current-conditions page, and Rivers.MOHERP ties lower-Shoal trip evidence and gauge ratings to that Joplin gauge. The app uses minimum-only scoring because the threshold support is community-calibrated rather than an official manager-published paddling band, and high-water guidance stays qualitative."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "MDC Tipton Ford Access",
        "note": "MDC says Tipton Ford Access was acquired to provide Shoal Creek access and includes a concrete ramp and parking lot for small boats.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/tipton-ford-access"
      },
      {
        "label": "Public take-out",
        "value": "MDC Wildcat Access",
        "note": "MDC says Wildcat Access provides Shoal Creek access through a City of Joplin partnership, with a parking lot and boat ramp.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/wildcat-access"
      },
      {
        "label": "Official route spacing",
        "value": "6.9 river miles",
        "note": "MDC planning material says Wildcat Access lies 6.9 river miles downstream of Tipton Ford Access.",
        "sourceUrl": "https://mdc.mo.gov/sites/default/files/2020-11/2014%20Shoal%20Creek%20Accesses%20Conservation%20Area%20Plan.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 07187000",
        "note": "USGS operates Shoal Creek above Joplin, MO, and the official legacy page showed same-day May 30, 2026 discharge and gage-height values during review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07187000"
      },
      {
        "label": "Low-water floor",
        "value": "225 cfs minimum-only",
        "note": "Rivers.MOHERP lower-Shoal trip rows include good-condition reports around 229, 240, 408, and 765 cfs on the Joplin gauge. The app uses a conservative 225 cfs floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07187000&hours=24"
      },
      {
        "label": "High-water caution",
        "value": "High reports include capsizes",
        "note": "A MoHERP Tipton-Ford-to-Wildcat trip at 1,370 cfs was marked high and noted a treacherous split channel with many capsizes after the Highway 171 bridge. Treat high or rising water as unsuitable for casual trips.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07187000&hours=24"
      },
      {
        "label": "Route character",
        "value": "Class I-II chert-bed creek",
        "note": "National Rivers Project describes the broader Smack Out-to-Wildcat Shoal Creek corridor as swift-flowing Class I-II water with chert bedrock, pools, runs, and public MDC access points including Tipton Ford and Wildcat Glade.",
        "sourceUrl": "https://www.nationalriversproject.com/mo/shoal-creek-shoal-creek"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Tipton Ford Access",
        "url": "https://mdc.mo.gov/discover-nature/places/tipton-ford-access",
        "provider": "local"
      },
      {
        "label": "MDC Wildcat Access",
        "url": "https://mdc.mo.gov/discover-nature/places/wildcat-access",
        "provider": "local"
      },
      {
        "label": "MDC Shoal Creek Accesses plan",
        "url": "https://mdc.mo.gov/sites/default/files/2020-11/2014%20Shoal%20Creek%20Accesses%20Conservation%20Area%20Plan.pdf",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Shoal Creek Joplin gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07187000&hours=24",
        "provider": "local"
      },
      {
        "label": "USGS 07187000 current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07187000",
        "provider": "usgs"
      },
      {
        "label": "National Rivers Project Shoal Creek",
        "url": "https://www.nationalriversproject.com/mo/shoal-creek-shoal-creek",
        "provider": "local"
      },
      {
        "label": "Paddling.com Tipton Ford coordinate record",
        "url": "https://paddling.com/paddle/locations/tipton-ford-fishing-access",
        "provider": "local"
      },
      {
        "label": "BoatRampFinder Wildcat Access coordinate record",
        "url": "https://boatrampfinder.com/ramps/wildcat-access/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "bryant-creek-warren-flo-cook",
    "slug": "bryant-creek-warren-flo-cook",
    "name": "Bryant Creek",
    "reach": "Warren Bridge Access to Flo Cook Access",
    "aliases": [
      "Bryant Creek - Warren Bridge to Flo Cook",
      "Bryant Creek - Warren Bridge to Cook's Landing",
      "Bryant Creek - Warren Bridge to Florence C. Cook Access"
    ],
    "state": "Missouri",
    "region": "Missouri Ozarks",
    "summary": "Lower Bryant Creek float from MDC Warren Bridge Access to MDC Flo Cook Access, ending just upstream of the North Fork and Norfork Lake backwater. The direct Tecumseh gauge is already live in V2, so the route uses the same conservative 300 cfs low-water floor as the upstream Bryant segment.",
    "statusText": "Use the Bryant Creek near Tecumseh gauge. Around 300 cfs is the conservative low-water marker; below that, expect shallow shoals, dragging, and slower travel. No ideal range or high cutoff is claimed for this lower-Bryant segment.",
    "latitude": 36.6674,
    "longitude": -92.2817,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "access_uncertain",
        "private_banks",
        "strainers"
      ],
      "safetyNotes": [
        "Scout Flo Cook before launching; it is an unimproved dirt/no-ramp take-out and should not be treated like a standard concrete landing.",
        "Do not drift past Flo Cook unless you have a separate North Fork or Norfork Lake plan.",
        "Watch for fresh wood, narrow current lines, and private banks away from the MDC accesses."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07058000",
      "provider": "usgs",
      "siteId": "07058000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Bryant Creek near Tecumseh, MO",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07058000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Rivers.MOHERP Tecumseh gauge rating and lower-Bryant trip context",
        "url": "https://rivers.moherp.org/gauge/?gauge=07058000&hours=168",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "Bryant Creek is spring-fed enough to stay on the paddling map through much of the warm season, but low summer water can still make shoals slow and scrapey. Heavy rain can quickly raise the creek, add wood, and make the lower bends and final take-out less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a shorter lower-Bryant day than the Sycamore segment, but it is still moving-water Ozark paddling with shallow shoals, narrow current lines, and an unimproved dirt take-out. Missing the take-out pushes the trip toward the North Fork junction and Norfork Lake context.",
      "confidenceNotes": "Confidence is good for a conservative adjacent Missouri add: MDC currently lists Warren Bridge Access and Flo Cook Access as public Bryant Creek fishing and floating access points and exposes official centerpoint coordinates for both; Float Missouri places Warren Bridge at mile 33.3 and Flo Cook at mile 40.0, giving this route a practical 6.7-mile shape; USGS 07058000 showed same-day June 17, 2026 discharge and gage-height observations; and the existing live Sycamore-to-Warren Bryant route already proves the same direct gauge path and 300 cfs minimum-only model in the app. The app keeps the route conservative because the threshold source is community-calibrated, not a manager-published paddling band, and the Flo Cook take-out remains a dirt/no-ramp landing."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Warren Bridge Access",
        "note": "MDC says Warren Bridge Access provides fishing and floating access to Bryant Creek and gives current area hours and directions from Dora via Highway 181, Route H, and County Road 328.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/warren-bridge-access"
      },
      {
        "label": "Public take-out",
        "value": "Flo Cook Access",
        "note": "MDC says Flo Cook Access provides fishing and floating access opportunities on Bryant Creek just upstream from Norfork Lake and gives current area hours and directions from Highway 160 via County Road 308.",
        "sourceUrl": "https://mdc.mo.gov/discover-nature/places/flo-cook-access"
      },
      {
        "label": "Route shape",
        "value": "About 6.7 river miles",
        "note": "Float Missouri places Warren Bridge at river mile 33.3 and Florence C. Cook Access at river mile 40.0, making this a practical 6.7-mile lower-Bryant segment that ends before the weaker Tecumseh / North Fork access family.",
        "sourceUrl": "https://www.floatmissouri.com/plan/missouri-rivers/bryant-creek/"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 07058000",
        "note": "USGS Bryant Creek near Tecumseh showed same-day June 17, 2026 discharge and gage-height observations during this implementation pass. The app already uses this direct same-creek gauge for the upstream Bryant route.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07058000"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Rivers.MOHERP rates the Bryant Creek Tecumseh gauge Good beginning at 300 cfs and includes lower-Bryant route-family context, including Sycamore-to-Cook trip evidence. Paddle Today uses only the conservative 300 cfs floor and does not infer an ideal or high-water band.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07058000&hours=168"
      },
      {
        "label": "Take-out caveat",
        "value": "Dirt landing, no rebuilt ramp",
        "note": "Float Missouri describes Florence C. Cook Access as a dirt ramp, and Ozark County Times reported after the 2017 flood that the old gravel boat ramp would not be rebuilt. Keep the final walk-out and parking expectations conservative.",
        "sourceUrl": "https://www.ozarkcountytimes.com/news-local-news-outdoor-news/year-after-flood-mdc-reopens-cook%E2%80%99s-landing-bryant-creek-0"
      }
    ],
    "sourceLinks": [
      {
        "label": "MDC Warren Bridge Access",
        "url": "https://mdc.mo.gov/discover-nature/places/warren-bridge-access",
        "provider": "local"
      },
      {
        "label": "MDC Flo Cook Access",
        "url": "https://mdc.mo.gov/discover-nature/places/flo-cook-access",
        "provider": "local"
      },
      {
        "label": "Rivers.MOHERP Bryant Creek Tecumseh gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07058000&hours=168",
        "provider": "local"
      },
      {
        "label": "USGS 07058000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07058000/",
        "provider": "usgs"
      },
      {
        "label": "USGS Bryant Creek current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07058000",
        "provider": "usgs"
      },
      {
        "label": "Missouri Float Trips Bryant Creek guide",
        "url": "https://www.floatmissouri.com/plan/missouri-rivers/bryant-creek/",
        "provider": "local"
      },
      {
        "label": "Bryant Watershed boating and floating guide",
        "url": "https://www.watersheds.org/outdoors/boating.htm",
        "provider": "local"
      },
      {
        "label": "Ozark County Times Cook's Landing article",
        "url": "https://www.ozarkcountytimes.com/news-local-news-outdoor-news/year-after-flood-mdc-reopens-cook%E2%80%99s-landing-bryant-creek-0",
        "provider": "local"
      }
    ]
  }
];
