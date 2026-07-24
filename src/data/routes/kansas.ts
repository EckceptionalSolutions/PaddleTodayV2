// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const kansasRoutes: River[] = [
  {
    "id": "kansas-river-lecompton-lawrence-riverfront",
    "slug": "kansas-river-lecompton-lawrence-riverfront",
    "name": "Kansas River",
    "reach": "Lecompton / Rising Sun to Lawrence Riverfront Park",
    "aliases": [
      "Kaw River - Lecompton to Lawrence Riverfront Park",
      "Kansas River - Rising Sun to Lawrence Riverfront Park",
      "Lecompton Access Ramp to Lawrence Riverfront Park"
    ],
    "state": "Kansas",
    "region": "Northeast Kansas",
    "summary": "Lower-Kaw day from the Lecompton / Rising Sun access to Lawrence Riverfront Park above Bowersock Dam. Friends of the Kaw documents both public ramps, the 10.2-mile spacing, and the mandatory Lawrence take-out before the dam; the downstream De Soto USGS gauge is used only as a conservative proxy.",
    "statusText": "Use the downstream Kansas River at De Soto gauge as a proxy check. The broad Kaw window is about 1,500 to 5,000 cfs; below 1,000 cfs expect sandbar picking and slow channel finding, while above 8,000 cfs Friends of the Kaw says sandbar rest stops are scarce.",
    "latitude": 39.05057,
    "longitude": -95.38764,
    "gaugeSource": {
      "id": "usgs-06892350",
      "provider": "usgs",
      "siteId": "06892350",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Kansas River at De Soto, KS",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06892350/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "private_banks",
        "strainers"
      ],
      "safetyNotes": [
        "Most paddlers should exit at Lawrence Riverfront Park and should not continue toward Bowersock Dam.",
        "Continuing below Riverfront Park requires dam-portage planning and is not appropriate for novice paddlers.",
        "Wind, rising water, floating wood, and private banks make bailout planning important."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1500,
      "idealMax": 5000,
      "tooLow": 1000,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "Friends of the Kaw safety bands and USACE Kansas River recreation flow impacts",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.8,
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
      "seasonNotes": "Spring through fall is the practical season. Low summer water can make the channel slow and braided, while high water removes sandbar rests and increases the consequence of missing the Lawrence Riverfront Park take-out above Bowersock Dam.",
      "difficulty": "moderate",
      "difficultyNotes": "The river miles are straightforward for prepared paddlers, but the route is not a casual drift: the gauge is a downstream proxy, winds can be strong, sandbars shift, banks are private, and paddlers must take out at Lawrence Riverfront Park before Bowersock Dam.",
      "confidenceNotes": "Confidence is high for access and route shape: Friends of the Kaw documents Lecompton / Rising Sun at river mile 64.3, Lawrence Riverfront Park at river mile 54.1, both GPS coordinates, the 10.2-mile downstream spacing, and the need to exit at Lawrence Riverfront Park before Bowersock Dam. Confidence is moderate for scoring because the route-specific Lecompton USGS station was not selected after visible instantaneous data ended on May 23, 2026 during this review. The app instead uses the downstream De Soto discharge gauge as an explicit proxy, paired with the same broad Kaw calibration used by adjacent lower-Kaw routes."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Lecompton / Rising Sun, RM 64.3",
        "note": "Friends of the Kaw lists the Lecompton / Rising Sun access with GPS 39.05057, -95.38764, river-left concrete ramp, gravel parking, kiosk, no restrooms or lighting, and rain/mud caveats.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-64-perry-lecompton-rising-sun/"
      },
      {
        "label": "Public take-out",
        "value": "Lawrence Riverfront Park, RM 54.1",
        "note": "Friends of the Kaw lists Lawrence Riverfront Park above Bowersock Dam with GPS 38.97474, -95.23522 and warns that paddlers should take out here before continuing downstream toward the dam.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-54-lawrence-riverfront-park-access-ramp/"
      },
      {
        "label": "Route distance",
        "value": "About 10.2 river miles",
        "note": "The Lecompton access page says the next access is Lawrence Riverfront Park 10.2 miles downstream at river mile 54.1.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-64-perry-lecompton-rising-sun/"
      },
      {
        "label": "Public river and ramps",
        "value": "Kansas, Arkansas, and Missouri Rivers public in Kansas",
        "note": "Friends of the Kaw says the Kansas, Arkansas, and Missouri Rivers are public rivers in Kansas and that all Kansas River boat ramps are open to the public.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/paddle-faq/"
      },
      {
        "label": "Flow safety bands",
        "value": "Novices under 5,000 cfs; all paddlers under 8,000 cfs",
        "note": "Friends of the Kaw recommends novice paddlers stay below 5,000 cfs and more experienced paddlers stay below 8,000 cfs; at 8,000 cfs and higher, few sandbars remain for rest stops.",
        "sourceUrl": "https://kansasriver.org/wp-content/uploads/2026/01/FOK-River-and-Sandbar-Safety-2025.pdf"
      },
      {
        "label": "Low-flow recreation impacts",
        "value": "<1,000 / 1,500-5,000 / 8,000+ cfs",
        "note": "USACE Kansas River recreation material identifies difficult paddling below 1,000 cfs, no recreation impacts from 1,500 to 5,000 cfs, novice impacts from 5,000 to 8,000 cfs, and extremely difficult paddling from 8,000 to 11,000 cfs.",
        "sourceUrl": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf"
      },
      {
        "label": "Proxy gauge",
        "value": "USGS 06892350 at De Soto",
        "note": "USGS operates Kansas River at De Soto downstream of Lawrence. Use it as a lower-Kaw proxy rather than a precise Lecompton-to-Lawrence reading.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06892350/"
      },
      {
        "label": "Gauge rejected",
        "value": "USGS 06891000 stale during review",
        "note": "The route-corridor Lecompton USGS station was reviewed but not selected because the official legacy page showed latest visible instantaneous data from May 23, 2026 during this May 30 review.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06891000"
      },
      {
        "label": "Dam exit",
        "value": "Take out before Bowersock Dam",
        "note": "Friends of the Kaw says Lawrence Riverfront Park is the take-out above Bowersock Dam and that only highly skilled paddlers with Kaw River Guides should continue through the chute.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-54-lawrence-riverfront-park-access-ramp/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Friends of the Kaw Kansas River access map",
        "url": "https://kansasriver.org/river-access-map/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Lecompton / Rising Sun access",
        "url": "https://kansasriver.org/river-access-map/river-mile-64-perry-lecompton-rising-sun/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Lawrence Riverfront Park access",
        "url": "https://kansasriver.org/river-access-map/river-mile-54-lawrence-riverfront-park-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Paddle FAQ",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw river and sandbar safety",
        "url": "https://kansasriver.org/wp-content/uploads/2026/01/FOK-River-and-Sandbar-Safety-2025.pdf",
        "provider": "local"
      },
      {
        "label": "USACE Kansas River recreation appendix",
        "url": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 06892350 Kansas River at De Soto",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06892350/",
        "provider": "usgs"
      },
      {
        "label": "USGS 06891000 Kansas River at Lecompton legacy current page",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06891000",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kansas-river-lawrence-8th-eudora",
    "slug": "kansas-river-lawrence-8th-eudora",
    "name": "Kansas River",
    "reach": "Lawrence 8th Street to Eudora",
    "aliases": [
      "Kaw River - Lawrence 8th Street to Eudora",
      "Kansas River - Lawrence Riverfront Park East to Eudora",
      "Kaw - Lawrence to Eudora"
    ],
    "state": "Kansas",
    "region": "Northeast Kansas",
    "summary": "Nine-mile Kansas River Water Trail day from the Lawrence Riverfront Park East / 8th Street ramp to the Eudora ramp on the Wakarusa River. Friends of the Kaw documents both public ramps, the route distance, and the key flow cautions, while the downstream De Soto USGS gauge gives a conservative Kaw level check.",
    "statusText": "Use the Kansas River at De Soto gauge as a downstream Kaw check. The best broad window is about 1,500 to 5,000 cfs; below 1,000 cfs the channel can get narrow and sandbar picking increases, while above 8,000 cfs Friends of the Kaw says sandbar rest stops are scarce.",
    "latitude": 38.972,
    "longitude": -95.21639,
    "gaugeSource": {
      "id": "usgs-06892350",
      "provider": "usgs",
      "siteId": "06892350",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Kansas River at De Soto, KS",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06892350/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1500,
      "idealMax": 5000,
      "tooLow": 1000,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "Friends of the Kaw safety bands and USACE Kansas River recreation flow impacts",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.75,
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
      "seasonNotes": "Spring through fall is the practical season, but the Kaw is a sand-bottom prairie river whose channel, bars, and ramp toes shift after high water. Check De Soto flow, Clinton Reservoir / Wakarusa releases, wind, storms, and ramp conditions before using the Eudora take-out.",
      "difficulty": "moderate",
      "difficultyNotes": "The reach avoids the Lawrence dams by starting below Bowersock, but this is still a big, shallow, moving river with shifting sandbars, wind exposure, wood, private banks, and a tricky upstream turn into the Wakarusa at Eudora. Treat it as a guarded moderate day unless flows are low, weather is calm, and the group already knows Kaw navigation.",
      "confidenceNotes": "Confidence is high for access and route shape: Friends of the Kaw documents the 8th Street access at river mile 51, the Eudora access at river mile 42, and about 9 miles between them; it also states that all Kansas River ramps are public and that the Kansas, Arkansas, and Missouri Rivers are public rivers in Kansas. Confidence is moderate for scoring because the exact route does not have a route-specific official gauge ladder. The app uses the downstream De Soto USGS gauge as a conservative proxy, Friends of the Kaw safety guidance for the 5,000 / 8,000 cfs high-side bands, and USACE recreation flow-impact ranges for the 1,000 / 1,500 cfs low-side calibration."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Lawrence Riverfront Park East / 8th Street, RM 51",
        "note": "Friends of the Kaw lists the Lawrence Riverfront Park East / 8th Street ramp with GPS 38.972, -95.21639, river-left access, parking, restroom, trash can, and kiosk.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-51-lawrence-8th-street-access-ramp/"
      },
      {
        "label": "Public take-out",
        "value": "Eudora Access Ramp, RM 42",
        "note": "Friends of the Kaw lists the Eudora ramp with GPS 38.94999, -95.09963, public parking, picnic shelter, fishing platform, and kiosk. The ramp sits on the Wakarusa River about three-quarters of a mile upstream from the Kansas River.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-42-eudora-access-ramp/"
      },
      {
        "label": "Route distance",
        "value": "About 9 miles",
        "note": "The 8th Street access page says the next access is about 9 miles downriver to Eudora at river mile 42.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-51-lawrence-8th-street-access-ramp/"
      },
      {
        "label": "Public river and ramps",
        "value": "Kansas, Arkansas, and Missouri Rivers public in Kansas",
        "note": "Friends of the Kaw says the Kansas, Arkansas, and Missouri Rivers are public rivers in Kansas and that all Kansas River boat ramps are open to the public.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/paddle-faq/"
      },
      {
        "label": "Flow safety bands",
        "value": "Novices under 5,000 cfs; all paddlers under 8,000 cfs",
        "note": "Friends of the Kaw recommends novice paddlers stay below 5,000 cfs and more experienced paddlers stay below 8,000 cfs; at 8,000 cfs and higher, few sandbars remain for rest stops.",
        "sourceUrl": "https://kansasriver.org/wp-content/uploads/2026/01/FOK-River-and-Sandbar-Safety-2025.pdf"
      },
      {
        "label": "Low-flow recreation impacts",
        "value": "<1,000 / 1,500-5,000 / 8,000+ cfs",
        "note": "USACE Kansas River recreation material identifies difficult paddling below 1,000 cfs, no recreation impacts from 1,500 to 5,000 cfs, novice impacts from 5,000 to 8,000 cfs, and extremely difficult paddling from 8,000 to 11,000 cfs.",
        "sourceUrl": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf"
      },
      {
        "label": "Gauge",
        "value": "USGS 06892350 at De Soto",
        "note": "USGS operates Kansas River at De Soto, KS, downstream of Eudora and near river mile 31. Use it as a lower-Kaw proxy rather than a precise Lawrence-to-Eudora reach gauge.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06892350/"
      },
      {
        "label": "Eudora take-out caveat",
        "value": "Wakarusa upstream paddle",
        "note": "Friends of the Kaw warns that taking out at Eudora requires turning upstream into the Wakarusa River and paddling about three-quarters of a mile; Clinton Reservoir releases of 250 cfs and above can make that upstream paddle difficult to impossible.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-42-eudora-access-ramp/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Friends of the Kaw Kansas River access map",
        "url": "https://kansasriver.org/river-access-map/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw 8th Street access",
        "url": "https://kansasriver.org/river-access-map/river-mile-51-lawrence-8th-street-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Eudora access",
        "url": "https://kansasriver.org/river-access-map/river-mile-42-eudora-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Paddle FAQ",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw river and sandbar safety",
        "url": "https://kansasriver.org/wp-content/uploads/2026/01/FOK-River-and-Sandbar-Safety-2025.pdf",
        "provider": "local"
      },
      {
        "label": "USACE Kansas River recreation appendix",
        "url": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 06892350 Kansas River at De Soto",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06892350/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kansas-river-eudora-de-soto",
    "slug": "kansas-river-eudora-de-soto",
    "name": "Kansas River",
    "reach": "Eudora to De Soto",
    "aliases": [
      "Kaw River - Eudora to De Soto",
      "Kansas River - Eudora Access Ramp to De Soto Access Ramp",
      "Eudora Access Ramp to De Soto Riverfest Park"
    ],
    "state": "Kansas",
    "region": "Northeast Kansas",
    "summary": "Lower-Kaw day from the Eudora ramp on the Wakarusa River to the De Soto ramp at Riverfest Park. Friends of the Kaw documents both public ramps and the 10.7-mile access spacing, while the De Soto USGS gauge sits in the take-out corridor for a same-day level check.",
    "statusText": "Use the Kansas River at De Soto gauge. The broad Kaw window is about 1,500 to 5,000 cfs; below 1,000 cfs expect narrow-channel sandbar picking, while above 8,000 cfs Friends of the Kaw says sandbar rest stops are scarce.",
    "latitude": 38.94999,
    "longitude": -95.09963,
    "gaugeSource": {
      "id": "usgs-06892350",
      "provider": "usgs",
      "siteId": "06892350",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Kansas River at De Soto, KS",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06892350/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1500,
      "idealMax": 5000,
      "tooLow": 1000,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "Friends of the Kaw safety bands and USACE Kansas River recreation flow impacts",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.8,
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
      "seasonNotes": "Spring through fall is the practical season. Check De Soto flow, Clinton Reservoir / Wakarusa releases for the launch paddle, wind, storms, rising water, and same-day ramp conditions before committing.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a moderate Kaw day because the route starts with a short downstream Wakarusa paddle, then follows a big shallow sand-bottom river for about 10.7 miles. Shifting sandbars, wind exposure, private banks, wood, and the De Soto ramp sandbar caveat matter even though both endpoints are public ramps.",
      "confidenceNotes": "Confidence is high for access and route shape: Friends of the Kaw documents Eudora at river mile 42, De Soto at river mile 31.3, both GPS coordinates, and the 10.7-mile downstream access sequence. Confidence is moderate for scoring because the level bands are broad Kansas River guidance rather than a route-specific official ladder. The app uses USGS 06892350 at De Soto as the direct take-out-corridor gauge, Friends of the Kaw safety guidance for the 5,000 / 8,000 cfs high-side bands, and USACE recreation flow-impact ranges for the 1,000 / 1,500 cfs low-side calibration."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Eudora Access Ramp, RM 42",
        "note": "Friends of the Kaw lists the Eudora ramp with GPS 38.94999, -95.09963, public parking, picnic shelter, fishing platform, and kiosk. The ramp is on the Wakarusa River about three-quarters of a mile upstream from the Kansas River.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-42-eudora-access-ramp/"
      },
      {
        "label": "Public take-out",
        "value": "De Soto Access Ramp, RM 31.3",
        "note": "Friends of the Kaw lists the De Soto ramp next to Riverfest Park with GPS 38.98496, -94.9746, public access, plentiful parking, restroom, trash can, and kiosk.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-31-de-soto-access-ramp/"
      },
      {
        "label": "Route distance",
        "value": "10.7 river miles",
        "note": "The Eudora access page says the next downstream access is De Soto Access Ramp, 10.7 miles downstream at river mile 31.3.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-42-eudora-access-ramp/"
      },
      {
        "label": "Public river and ramps",
        "value": "Kansas, Arkansas, and Missouri Rivers public in Kansas",
        "note": "Friends of the Kaw says the Kansas, Arkansas, and Missouri Rivers are public rivers in Kansas and that all Kansas River boat ramps are open to the public.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/paddle-faq/"
      },
      {
        "label": "Flow safety bands",
        "value": "Novices under 5,000 cfs; all paddlers under 8,000 cfs",
        "note": "Friends of the Kaw recommends novice paddlers stay below 5,000 cfs and more experienced paddlers stay below 8,000 cfs; at 8,000 cfs and higher, few sandbars remain for rest stops.",
        "sourceUrl": "https://kansasriver.org/wp-content/uploads/2026/01/FOK-River-and-Sandbar-Safety-2025.pdf"
      },
      {
        "label": "Low-flow recreation impacts",
        "value": "<1,000 / 1,500-5,000 / 8,000+ cfs",
        "note": "USACE Kansas River recreation material identifies difficult paddling below 1,000 cfs, no recreation impacts from 1,500 to 5,000 cfs, novice impacts from 5,000 to 8,000 cfs, and extremely difficult paddling from 8,000 to 11,000 cfs.",
        "sourceUrl": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf"
      },
      {
        "label": "Gauge",
        "value": "USGS 06892350 at De Soto",
        "note": "USGS operates Kansas River at De Soto, KS in the take-out corridor, making it a direct same-river gauge for the downstream end of this route.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06892350/"
      },
      {
        "label": "Ramp condition caveat",
        "value": "De Soto sandbar and event closures",
        "note": "Friends of the Kaw notes that De Soto can be closed for city events and that a sandbar regularly forms at the toe of the ramp, so a pre-paddle scouting trip is worthwhile.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-31-de-soto-access-ramp/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Friends of the Kaw Kansas River access map",
        "url": "https://kansasriver.org/river-access-map/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Eudora access",
        "url": "https://kansasriver.org/river-access-map/river-mile-42-eudora-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw De Soto access",
        "url": "https://kansasriver.org/river-access-map/river-mile-31-de-soto-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Paddle FAQ",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw river and sandbar safety",
        "url": "https://kansasriver.org/wp-content/uploads/2026/01/FOK-River-and-Sandbar-Safety-2025.pdf",
        "provider": "local"
      },
      {
        "label": "USACE Kansas River recreation appendix",
        "url": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 06892350 Kansas River at De Soto",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06892350/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kansas-river-eudora-turner-bridge",
    "slug": "kansas-river-eudora-turner-bridge",
    "name": "Kansas River",
    "reach": "Eudora to Turner Bridge",
    "aliases": [
      "Kaw River - Eudora to Turner Bridge",
      "Kansas River - Eudora Access Ramp to Turner Bridge Access Ramp",
      "Eudora Access Ramp to Turner Bridge Access Ramp"
    ],
    "state": "Kansas",
    "region": "Kansas City Metro",
    "summary": "Long lower-Kaw continuation from Eudora to Turner Bridge, combining the De Soto and Edwardsville public-ramp chain with the mandatory WaterOne low-head-dam portage. Friends of the Kaw documents the full public sequence, while the De Soto gauge is the cleanest same-river discharge proxy for this longer lower-Kaw route.",
    "statusText": "Use the Kansas River at De Soto gauge as the lower-Kaw discharge proxy. The broad Kaw window is about 1,500 to 5,000 cfs; below 1,000 cfs expect slow channel picking and awkward landings, while above 8,000 cfs Friends of the Kaw says sandbar rest stops are scarce and the WaterOne carry becomes more consequential.",
    "latitude": 38.94999,
    "longitude": -95.09963,
    "gaugeSource": {
      "id": "usgs-06892350",
      "provider": "usgs",
      "siteId": "06892350",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Kansas River at De Soto, KS",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06892350/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "low_head_dam",
        "mandatory_takeout",
        "private_banks",
        "strainers"
      ],
      "safetyNotes": [
        "Mandatory WaterOne low-head-dam portage; do not go over the dam or through the river-right notch.",
        "Plan to land and carry on river left only, and expect rough footing over loose rocks if you continue below Edwardsville.",
        "This is a long exposed lower-Kaw route with few simple legal exits once committed past the named public ramps."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1500,
      "idealMax": 5000,
      "tooLow": 1000,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "Friends of the Kaw safety bands and USACE Kansas River recreation flow impacts",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.9,
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
      "seasonNotes": "Spring through fall is the practical season, but this 32.8-mile lower-Kaw combination is a very long commitment. Same-day gauge, weather, wind, portage footing, and ramp checks matter before launching.",
      "difficulty": "hard",
      "difficultyNotes": "The route stays on a documented public-access chain, but about 32.8 river miles plus the WaterOne low-head-dam portage make it an experienced-distance route rather than a casual day float.",
      "confidenceNotes": "Confidence is high for access and route shape: Friends of the Kaw documents Eudora at river mile 42, De Soto at 31.3, Edwardsville at 16.6, Turner Bridge at 9.2, and the WaterOne low-head dam at 14.8 with a river-left-only portage. Confidence is moderate for scoring because the level bands are broad Kansas River guidance rather than an exact route-specific ladder, and the De Soto gauge is an intermediate same-river proxy rather than an endpoint gauge."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Eudora Access Ramp, RM 42",
        "note": "Friends of the Kaw lists the Eudora ramp with GPS 38.94999, -95.09963, public parking, and launch access on the Wakarusa River about three-quarters of a mile above the Kansas River confluence.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-42-eudora-access-ramp/"
      },
      {
        "label": "Public take-out",
        "value": "Turner Bridge Access Ramp, RM 9.2",
        "note": "Friends of the Kaw lists Turner Bridge Access Ramp near 32 Highway and Turner Diagonal with GPS 39.09396, -94.71176, a river-left concrete ramp, and a small gravel lot.",
        "sourceUrl": "https://kansasriver.org/river-access-map/15861-2/"
      },
      {
        "label": "Route distance",
        "value": "About 32.8 river miles",
        "note": "Friends of the Kaw places Eudora at river mile 42, De Soto at 31.3, Edwardsville at 16.6, and Turner Bridge at 9.2, which supports this combined lower-Kaw route on the documented public access chain.",
        "sourceUrl": "https://kansasriver.org/river-access-map/"
      },
      {
        "label": "Current gauge check",
        "value": "17,300 cfs / 10.50 ft at 2026-07-02 10:30 CDT",
        "note": "Same-day direct USGS Water Services for station 06892350 at De Soto returned 17,300 cfs and 10.50 ft, well above the conservative recreational band used by the app.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=06892350&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Mandatory portage",
        "value": "WaterOne low-head dam, RM 14.8",
        "note": "Friends of the Kaw says the WaterOne low-head dam should not be run in any vessel and must be portaged on river left over a rough 100+ yard carry with loose rock and no useful carts.",
        "sourceUrl": "https://kansasriver.org/river-access-map/waterone-dam/"
      },
      {
        "label": "Flow safety bands",
        "value": "1,000 / 1,500-5,000 / 8,000 cfs",
        "note": "Friends of the Kaw recommends novice paddlers stay below 5,000 cfs and everyone else below 8,000 cfs, while USACE recreation guidance supports the difficult-below-1,000 and no-impact 1,500-5,000 calibration.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/paddle-faq/"
      },
      {
        "label": "Lower reach limits",
        "value": "Few legal stops below Edwardsville",
        "note": "Friends of the Kaw notes the lower controlled reach around the WaterOne and Turner Bridge segment has very few sandbars, so this route should be treated as a committed through-route rather than an overnight corridor.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-16-edwardsville-access-ramp/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Friends of the Kaw Kansas River access map",
        "url": "https://kansasriver.org/river-access-map/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Eudora access",
        "url": "https://kansasriver.org/river-access-map/river-mile-42-eudora-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw De Soto access",
        "url": "https://kansasriver.org/river-access-map/river-mile-31-de-soto-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Edwardsville access",
        "url": "https://kansasriver.org/river-access-map/river-mile-16-edwardsville-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Turner Bridge access",
        "url": "https://kansasriver.org/river-access-map/15861-2/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw WaterOne low-head dam",
        "url": "https://kansasriver.org/river-access-map/waterone-dam/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw River Access Tips",
        "url": "https://kansasriver.org/paddle-and-fish/river-access/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Paddle FAQ",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw river and sandbar safety",
        "url": "https://kansasriver.org/wp-content/uploads/2026/01/FOK-River-and-Sandbar-Safety-2025.pdf",
        "provider": "local"
      },
      {
        "label": "USACE Kansas River recreation appendix",
        "url": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 06892350 Kansas River at De Soto",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06892350/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kansas-river-junction-city-ogden",
    "slug": "kansas-river-junction-city-ogden",
    "name": "Kansas River",
    "reach": "Junction City Access Ramp to Ogden Access Ramp",
    "aliases": [
      "Kaw River - Junction City to Ogden",
      "Kansas River - Junction City to Ogden",
      "Junction City Grant Park to Ogden Access Ramp"
    ],
    "state": "Kansas",
    "region": "Northeast Kansas",
    "summary": "Uppermost Kansas River Water Trail day from the Junction City ramp in Grant Park to Ogden. Friends of the Kaw documents both public ramps, the Republican-Smoky Hill confluence just below the launch, and the little-over-9-mile spacing, while the downstream Wamego gauge keeps scoring conservative.",
    "statusText": "Use the downstream Kansas River at Wamego gauge as a proxy check. The broad Kaw window is about 1,500 to 5,000 cfs; below 1,000 cfs expect sandbar picking and possible shallow confluence channels, while above 8,000 cfs Friends of the Kaw says sandbar rest stops are scarce.",
    "latitude": 39.06029,
    "longitude": -96.80341,
    "gaugeSource": {
      "id": "usgs-06887500",
      "provider": "usgs",
      "siteId": "06887500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Kansas River at Wamego, KS",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06887500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1500,
      "idealMax": 5000,
      "tooLow": 1000,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "Friends of the Kaw safety bands and USACE Kansas River recreation flow impacts",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.75,
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
      "seasonNotes": "Spring through fall is the practical season. This uppermost Kaw reach starts on the Republican River just above the Smoky Hill confluence, so same-day Milford and upstream-release context, Wamego flow, wind, storms, and ramp checks matter.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is within Friends of the Kaw novice-distance guidance, but this is still a big-river route with a confluence current line, shifting sandbars, private banks, wind exposure, possible wood, and a proxy gauge. Treat it as a guarded upper-Kaw day, not a casual park float.",
      "confidenceNotes": "Confidence is high for access and route shape: Friends of the Kaw documents Junction City at river mile 173, Ogden at river mile 163.4, both GPS coordinates, the Republican-to-Kansas confluence context, and a little over 9 miles to Ogden. Confidence is moderate for scoring because there is not a current direct discharge gauge in the Junction City-to-Ogden reach; the app uses the downstream Wamego USGS gauge as a broad same-river proxy and keeps the mixed Kaw calibration visible."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Junction City Access Ramp, RM 173",
        "note": "Friends of the Kaw lists the Junction City ramp in Grant Park with GPS 39.06029, -96.80341, river-left access, a wide concrete ramp on the Republican River, overnight parking, trash cans, and an informational kiosk.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-173-junction-city-access-ramp/"
      },
      {
        "label": "Public take-out",
        "value": "Ogden Access Ramp, RM 163.4",
        "note": "Friends of the Kaw lists Ogden Access Ramp with GPS 39.10503, -96.69633, river-left access, a wide concrete ramp, gravel parking with trailer space, restrooms, picnic shelter, trash can, and an informational kiosk.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-163-5-ogden-access-ramp/"
      },
      {
        "label": "Route distance",
        "value": "A little over 9 river miles",
        "note": "The Junction City access page says the Ogden ramp is a little over 9 miles downstream at river mile 163.4.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-173-junction-city-access-ramp/"
      },
      {
        "label": "Confluence character",
        "value": "Republican to Smoky Hill to Kansas River",
        "note": "Friends of the Kaw says the launch is on the Republican River about one-third mile above the Smoky Hill confluence, where the Kansas River begins, and warns paddlers to watch unusual currents crossing the clear sediment line.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-173-junction-city-access-ramp/"
      },
      {
        "label": "Public river and ramps",
        "value": "Kansas, Arkansas, and Missouri Rivers public in Kansas",
        "note": "Friends of the Kaw says the Kansas, Arkansas, and Missouri Rivers are public rivers in Kansas and that all Kansas River boat ramps are open to the public.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/paddle-faq/"
      },
      {
        "label": "Flow safety bands",
        "value": "Novices under 5,000 cfs; all paddlers under 8,000 cfs",
        "note": "Friends of the Kaw recommends novice paddlers stay below 5,000 cfs and more experienced paddlers stay below 8,000 cfs; at 8,000 cfs and higher, few sandbars remain for rest stops.",
        "sourceUrl": "https://kansasriver.org/wp-content/uploads/2026/01/FOK-River-and-Sandbar-Safety-2025.pdf"
      },
      {
        "label": "Low-flow recreation impacts",
        "value": "<1,000 / 1,500-5,000 / 8,000+ cfs",
        "note": "USACE Kansas River recreation material identifies difficult paddling below 1,000 cfs, no recreation impacts from 1,500 to 5,000 cfs, novice impacts from 5,000 to 8,000 cfs, and extremely difficult paddling from 8,000 to 11,000 cfs.",
        "sourceUrl": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf"
      },
      {
        "label": "Proxy gauge",
        "value": "USGS 06887500 at Wamego",
        "note": "USGS operates Kansas River at Wamego, KS downstream of this reach. Use it as a broad same-river proxy, not a precise Junction City or Ogden stage reading.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06887500/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Friends of the Kaw Kansas River access map",
        "url": "https://kansasriver.org/river-access-map/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Junction City access",
        "url": "https://kansasriver.org/river-access-map/river-mile-173-junction-city-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Ogden access",
        "url": "https://kansasriver.org/river-access-map/river-mile-163-5-ogden-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Paddle FAQ",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw river and sandbar safety",
        "url": "https://kansasriver.org/wp-content/uploads/2026/01/FOK-River-and-Sandbar-Safety-2025.pdf",
        "provider": "local"
      },
      {
        "label": "USACE Kansas River recreation appendix",
        "url": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf",
        "provider": "local"
      },
      {
        "label": "USGS Kansas River at Wamego",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06887500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kansas-river-junction-city-manhattan",
    "slug": "kansas-river-junction-city-manhattan",
    "name": "Kansas River",
    "reach": "Junction City / Grant Park to Manhattan K-177 / Fairmont",
    "aliases": [
      "Kaw River - Junction City to Manhattan",
      "Kansas River - Junction City Access Ramp to Manhattan Fairmont",
      "Junction City Access Ramp / Grant Park to Manhattan K-177 Bridge/Fairmont Access Ramp"
    ],
    "state": "Kansas",
    "region": "Northeast Kansas",
    "summary": "Long upper-Kaw continuation from the Republican River launch at Junction City to the Manhattan K-177 / Fairmont ramp. Friends of the Kaw documents the public access chain, confluence current caveat, and the combined downstream mileage, while the Wamego gauge remains the closest defensible same-river discharge proxy.",
    "statusText": "Use the downstream Kansas River at Wamego gauge as a proxy check. The broad Kaw window is about 1,500 to 5,000 cfs; below 1,000 cfs expect slow channel picking and exposed sandbars, while above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
    "latitude": 39.06029,
    "longitude": -96.80341,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a very long upper-Kaw day with wind, shifting sandbars, and few easy legal exits away from the named ramps.",
        "Watch the Republican and Smoky Hill confluence line near the start and reassess if current, visibility, or group spacing feels off.",
        "Stay with public ramps and legal sandbar stops between the high-water marks; do not use private banks as planned rest or bailout points."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-06887500",
      "provider": "usgs",
      "siteId": "06887500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Kansas River at Wamego, KS",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06887500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1500,
      "idealMax": 5000,
      "tooLow": 1000,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "Friends of the Kaw safety bands and USACE Kansas River recreation flow impacts",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.85,
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
      "seasonNotes": "Spring through fall is the practical season. This route is naturally long enough to work better as an experienced endurance day or a conservative overnight when sandbars are exposed and weather is stable.",
      "difficulty": "hard",
      "difficultyNotes": "The combined distance is roughly 23 miles before wind, current, or low-water channel picking slow the day further. Treat it as a committed big-river route rather than a casual float.",
      "confidenceNotes": "Confidence is high for access and route shape: Friends of the Kaw documents Junction City at river mile 173, Manhattan at river mile 150.7, both GPS coordinates, the little-over-9-mile Junction-to-Ogden spacing, and the about-14-mile Ogden-to-Manhattan spacing. Confidence is moderate for scoring because the route still relies on the downstream Wamego gauge as a same-river proxy rather than a direct discharge gauge in the immediate corridor."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Junction City / Grant Park, RM 173",
        "note": "Friends of the Kaw lists Junction City Access Ramp in Grant Park with GPS 39.06029, -96.80341 on the Republican River about one-third mile above the Smoky Hill confluence where the Kansas River begins.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-173-junction-city-access-ramp/"
      },
      {
        "label": "Public take-out",
        "value": "Manhattan K-177 / Fairmont, RM 150.7",
        "note": "Friends of the Kaw lists the Manhattan K-177 / Fairmont ramp below the K-177 bridge with GPS 39.17428, -96.55318 and public parking at the take-out.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-149-manhattan-access-ramp/"
      },
      {
        "label": "Route distance",
        "value": "About 23 mi",
        "note": "Friends of the Kaw says Junction City to Ogden is a little over 9 miles and Ogden to Manhattan is about 14 miles, which supports this longer combined public route.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-173-junction-city-access-ramp/"
      },
      {
        "label": "Direct live proxy reading",
        "value": "Wamego gauge 18,800 cfs / 10.60 ft",
        "note": "USGS Water Services returned 18,800 cfs and 10.60 ft at 2026-06-26 11:30 CDT for Kansas River at Wamego, the downstream same-river proxy used for this route.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=06887500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Flow safety bands",
        "value": "1,000 / 1,500-5,000 / 8,000 cfs",
        "note": "Friends of the Kaw recommends novice paddlers stay below 5,000 cfs and everyone else below 8,000 cfs, while USACE recreation guidance supports the difficult-below-1,000 and no-impact 1,500-5,000 calibration.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/paddle-faq/"
      },
      {
        "label": "Confluence and release caveats",
        "value": "Republican/Smoky Hill line plus Big Blue context",
        "note": "The Junction City page warns about unusual currents where the Republican meets the Smoky Hill, and the Manhattan page warns that nearby Blue River access can be affected when Tuttle Creek releases exceed 500 cfs.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-149-manhattan-access-ramp/"
      },
      {
        "label": "Camping support",
        "value": "Public sandbar camping between high-water marks",
        "note": "Friends of the Kaw says the Kansas River is public, sandbar camping is allowed without a special permit, and private banks above the high-water mark remain off-limits.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/camping/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Friends of the Kaw Kansas River access map",
        "url": "https://kansasriver.org/river-access-map/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Junction City access",
        "url": "https://kansasriver.org/river-access-map/river-mile-173-junction-city-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Ogden access",
        "url": "https://kansasriver.org/river-access-map/river-mile-163-5-ogden-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Manhattan K-177 / Fairmont access",
        "url": "https://kansasriver.org/river-access-map/river-mile-149-manhattan-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Paddle FAQ",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw camping on the Kaw",
        "url": "https://kansasriver.org/paddle-and-fish/camping/",
        "provider": "local"
      },
      {
        "label": "USACE Kansas River recreation appendix",
        "url": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 06887500 Kansas River at Wamego",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06887500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kansas-river-junction-city-st-george",
    "slug": "kansas-river-junction-city-st-george",
    "name": "Kansas River",
    "reach": "Junction City / Grant Park to St. George / Boggs Landing",
    "aliases": [
      "Kaw River - Junction City to St. George",
      "Kansas River - Junction City Access Ramp to Boggs Landing",
      "Junction City Access Ramp / Grant Park to St. George / Boggs Landing Access Ramp"
    ],
    "state": "Kansas",
    "region": "Northeast Kansas",
    "summary": "Long upper-Kaw continuation from the Republican River launch at Junction City to St. George / Boggs Landing. Friends of the Kaw documents the public access chain through Ogden and Manhattan, and the downstream Wamego gauge remains the closest defensible same-river discharge proxy.",
    "statusText": "Use the downstream Kansas River at Wamego gauge as a proxy check. The broad Kaw window is about 1,500 to 5,000 cfs; below 1,000 cfs expect slow sandbar picking, while above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
    "latitude": 39.06029,
    "longitude": -96.80341,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a very long upper-Kaw route with wind, shifting sandbars, and few clean legal exits except the named ramps.",
        "Watch the Republican and Smoky Hill confluence line near the start, and reassess if current, visibility, or group spacing feels off.",
        "Stay with public ramps and legal sandbar stops between the high-water marks; do not use private banks as planned rest or bailout points."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-06887500",
      "provider": "usgs",
      "siteId": "06887500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Kansas River at Wamego, KS",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06887500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1500,
      "idealMax": 5000,
      "tooLow": 1000,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "Friends of the Kaw safety bands and USACE Kansas River recreation flow impacts",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.9,
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
      "seasonNotes": "Spring through fall is the practical season. This route is naturally overnight-capable, and high water can remove the sandbar rest and camping options that make the distance manageable.",
      "difficulty": "hard",
      "difficultyNotes": "The combined distance is about 35 miles before wind, current, or low-water channel picking slow the trip further. Treat it as a committed big-river route rather than a casual float.",
      "confidenceNotes": "Confidence is high for access and route shape: Friends of the Kaw documents Junction City at river mile 173, Ogden at river mile 163.4, Manhattan at river mile 150.7, and St. George at river mile 137 with public GPS-backed ramps. Confidence is moderate for scoring because the route still relies on the downstream Wamego gauge as a same-river proxy rather than a direct discharge gauge in the immediate corridor."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Junction City / Grant Park, RM 173",
        "note": "Friends of the Kaw lists Junction City Access Ramp in Grant Park with GPS 39.06029, -96.80341 on the Republican River about one-third mile above the Smoky Hill confluence where the Kansas River begins.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-173-junction-city-access-ramp/"
      },
      {
        "label": "Public take-out",
        "value": "St. George / Boggs Landing, RM 137",
        "note": "Friends of the Kaw lists St. George / Boggs Landing with GPS 39.18726, -96.42202, river-left access, ample parking, restrooms, lighting, and town services nearby.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-137-st-george-access-ramp/"
      },
      {
        "label": "Route distance",
        "value": "About 35 mi",
        "note": "Friends of the Kaw says Junction City to Ogden is a little over 9 miles, Ogden to Manhattan is about 14 miles, and Manhattan to St. George is 12 miles, which supports this longer combined public route.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-173-junction-city-access-ramp/"
      },
      {
        "label": "Direct live proxy reading",
        "value": "Wamego gauge 18,900 cfs / 10.63 ft",
        "note": "USGS Water Services returned 18,900 cfs and 10.63 ft at 2026-06-26 12:30 CDT for Kansas River at Wamego, the downstream same-river proxy used for this route.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=06887500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Flow safety bands",
        "value": "1,000 / 1,500-5,000 / 8,000 cfs",
        "note": "Friends of the Kaw recommends novice paddlers stay below 5,000 cfs and everyone else below 8,000 cfs, while USACE recreation guidance supports the difficult-below-1,000 and no-impact 1,500-5,000 calibration.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/paddle-faq/"
      },
      {
        "label": "Confluence and mid-route caveats",
        "value": "Republican/Smoky Hill line plus Manhattan sandbar and Blue River context",
        "note": "The Junction City page warns about unusual currents where the Republican meets the Smoky Hill, while Ogden and Manhattan note the sandbar at the Manhattan ramp and Blue River release effects near Tuttle Creek.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-149-manhattan-access-ramp/"
      },
      {
        "label": "Camping support",
        "value": "Public sandbar camping between high-water marks",
        "note": "Friends of the Kaw says the Kansas River is public, sandbar camping is allowed without a special permit, and private banks above the high-water mark remain off-limits.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/camping/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Friends of the Kaw Kansas River access map",
        "url": "https://kansasriver.org/river-access-map/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Junction City access",
        "url": "https://kansasriver.org/river-access-map/river-mile-173-junction-city-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Ogden access",
        "url": "https://kansasriver.org/river-access-map/river-mile-163-5-ogden-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Manhattan K-177 / Fairmont access",
        "url": "https://kansasriver.org/river-access-map/river-mile-149-manhattan-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw St. George / Boggs Landing access",
        "url": "https://kansasriver.org/river-access-map/river-mile-137-st-george-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Paddle FAQ",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw camping on the Kaw",
        "url": "https://kansasriver.org/paddle-and-fish/camping/",
        "provider": "local"
      },
      {
        "label": "USACE Kansas River recreation appendix",
        "url": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 06887500 Kansas River at Wamego",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06887500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kansas-river-ogden-manhattan",
    "slug": "kansas-river-ogden-manhattan",
    "name": "Kansas River",
    "reach": "Ogden Access Ramp to Manhattan K-177 / Fairmont",
    "aliases": [
      "Kaw River - Ogden to Manhattan",
      "Kansas River - Ogden Access Ramp to Manhattan Fairmont",
      "Ogden Access Ramp to Manhattan K-177 Bridge/Fairmont Access Ramp"
    ],
    "state": "Kansas",
    "region": "Northeast Kansas",
    "summary": "Fourteen-mile upper-Kaw day from the Ogden public ramp to the Manhattan K-177 / Fairmont ramp. Friends of the Kaw documents both public ramps and calls this a relatively untouched section near Manhattan, but the mileage and downstream Wamego proxy gauge keep it a guarded trip.",
    "statusText": "Use the downstream Kansas River at Wamego gauge as a proxy check. The broad Kaw window is about 1,500 to 5,000 cfs; below 1,000 cfs expect sandbar picking and possible slow channel finding, while above 8,000 cfs Friends of the Kaw says sandbar rest stops are scarce.",
    "latitude": 39.10503,
    "longitude": -96.69633,
    "gaugeSource": {
      "id": "usgs-06887500",
      "provider": "usgs",
      "siteId": "06887500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Kansas River at Wamego, KS",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06887500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1500,
      "idealMax": 5000,
      "tooLow": 1000,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "Friends of the Kaw safety bands and USACE Kansas River recreation flow impacts",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.75,
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
      "seasonNotes": "Spring through fall is the practical season. This reach is upstream of the Big Blue confluence but still needs Wamego flow, nearby reservoir-release context, wind, storms, and ramp-condition checks before committing to a 14-mile day.",
      "difficulty": "moderate",
      "difficultyNotes": "Friends of the Kaw describes Ogden to Manhattan as a beautiful, relatively untouched section, but the 14-mile spacing is beyond its novice day-distance guidance. Treat it as a longer big-river day with shifting sandbars, wind exposure, possible wood, private banks, and limited normal exits.",
      "confidenceNotes": "Confidence is high for access and route shape: Friends of the Kaw documents Ogden at river mile 163.4, Manhattan K-177 / Fairmont at river mile 150.7, both GPS coordinates, and the about-14-mile downstream spacing. Confidence is moderate for scoring because there is not a current direct discharge gauge in the Ogden-to-Manhattan reach; the closer Manhattan gauge does not compute discharge and was stale in prior review, so the app uses the downstream Wamego USGS gauge as a conservative same-river proxy and keeps the broad Kaw calibration visible."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Ogden Access Ramp, RM 163.4",
        "note": "Friends of the Kaw lists Ogden Access Ramp with GPS 39.10503, -96.69633, river-left access, a wide concrete ramp, gravel parking with trailer space, restrooms, picnic shelter, trash can, and an informational kiosk.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-163-5-ogden-access-ramp/"
      },
      {
        "label": "Public take-out",
        "value": "Manhattan K-177 / Fairmont, RM 150.7",
        "note": "Friends of the Kaw lists the Manhattan K-177 / Fairmont ramp below the K-177 bridge with GPS 39.17428, -96.55318, river-right access, parking for 5-8 cars, lighting, trash can, kiosk, and a concrete ramp.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-149-manhattan-access-ramp/"
      },
      {
        "label": "Route distance",
        "value": "About 14 river miles",
        "note": "The Ogden access page says the Manhattan K-177 / Fairmont ramp is about 14 miles downriver and describes the route as a beautiful section that is relatively untouched despite its proximity to Manhattan.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-163-5-ogden-access-ramp/"
      },
      {
        "label": "Public river and ramps",
        "value": "Kansas, Arkansas, and Missouri Rivers public in Kansas",
        "note": "Friends of the Kaw says the Kansas, Arkansas, and Missouri Rivers are public rivers in Kansas and that all Kansas River boat ramps are open to the public.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/paddle-faq/"
      },
      {
        "label": "Flow safety bands",
        "value": "Novices under 5,000 cfs; all paddlers under 8,000 cfs",
        "note": "Friends of the Kaw recommends novice paddlers stay below 5,000 cfs and more experienced paddlers stay below 8,000 cfs; at 8,000 cfs and higher, few sandbars remain for rest stops.",
        "sourceUrl": "https://kansasriver.org/wp-content/uploads/2026/01/FOK-River-and-Sandbar-Safety-2025.pdf"
      },
      {
        "label": "Low-flow recreation impacts",
        "value": "<1,000 / 1,500-5,000 / 8,000+ cfs",
        "note": "USACE Kansas River recreation material identifies difficult paddling below 1,000 cfs, no recreation impacts from 1,500 to 5,000 cfs, novice impacts from 5,000 to 8,000 cfs, and extremely difficult paddling from 8,000 to 11,000 cfs.",
        "sourceUrl": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf"
      },
      {
        "label": "Proxy gauge",
        "value": "USGS 06887500 at Wamego",
        "note": "USGS operates Kansas River at Wamego, KS downstream of this reach. Use it as a same-river proxy; the closer Manhattan gauge does not compute discharge and prior review found stale visible data.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06887500/"
      },
      {
        "label": "Take-out approach",
        "value": "Sandbar often at toe of Manhattan ramp",
        "note": "Friends of the Kaw notes that as paddlers approach the Manhattan access from the west, there is often a sandbar at the toe of the ramp that must be skirted.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-163-5-ogden-access-ramp/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Friends of the Kaw Kansas River access map",
        "url": "https://kansasriver.org/river-access-map/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Ogden access",
        "url": "https://kansasriver.org/river-access-map/river-mile-163-5-ogden-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Manhattan K-177 / Fairmont access",
        "url": "https://kansasriver.org/river-access-map/river-mile-149-manhattan-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Paddle FAQ",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw river and sandbar safety",
        "url": "https://kansasriver.org/wp-content/uploads/2026/01/FOK-River-and-Sandbar-Safety-2025.pdf",
        "provider": "local"
      },
      {
        "label": "USACE Kansas River recreation appendix",
        "url": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf",
        "provider": "local"
      },
      {
        "label": "USGS Kansas River at Wamego",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06887500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kansas-river-ogden-st-george",
    "slug": "kansas-river-ogden-st-george",
    "name": "Kansas River",
    "reach": "Ogden to St. George / Boggs Landing",
    "aliases": [
      "Kaw River - Ogden to St. George",
      "Kansas River - Ogden Access Ramp to Boggs Landing",
      "Ogden Access Ramp to St. George / Boggs Landing Access Ramp"
    ],
    "state": "Kansas",
    "region": "Northeast Kansas",
    "summary": "Long upper-Kaw continuation from Ogden to St. George / Boggs Landing. Friends of the Kaw documents the public access chain through Manhattan, and the Wamego gauge remains the closest defensible same-river discharge proxy for the full combined reach.",
    "statusText": "Use the downstream Kansas River at Wamego gauge as a proxy check. The broad Kaw window is about 1,500 to 5,000 cfs; below 1,000 cfs expect slow sandbar picking, while above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
    "latitude": 39.10503,
    "longitude": -96.69633,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a long exposed upper-Kaw route with wind, shifting sandbars, and few clean legal exits except the named ramps.",
        "The Manhattan K-177 ramp often has a sandbar at the toe, and nearby Blue River current can change when Tuttle Creek releases rise.",
        "Stay with public ramps and legal sandbar stops between the high-water marks; do not plan on private banks for rest, camping, or take-out use."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-06887500",
      "provider": "usgs",
      "siteId": "06887500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Kansas River at Wamego, KS",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06887500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1500,
      "idealMax": 5000,
      "tooLow": 1000,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "Friends of the Kaw safety bands and USACE Kansas River recreation flow impacts",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.85,
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
      "seasonNotes": "Spring through fall is the practical season. This 26-mile continuation is more naturally an experienced endurance day or a conservative overnight when sandbars are exposed and weather is stable.",
      "difficulty": "hard",
      "difficultyNotes": "The combined distance is about 26 miles, long enough that wind, low-water channel changes, and fatigue become core trip-planning concerns even without a dam in the route.",
      "confidenceNotes": "Confidence is high for access and route shape: Friends of the Kaw documents Ogden at river mile 163.4, St. George at river mile 137, and the intermediate Manhattan spacing that supports the full combined reach. Confidence is moderate for scoring because the route still depends on the downstream Wamego gauge rather than a direct discharge station in the middle of the corridor."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Ogden Access Ramp, RM 163.4",
        "note": "Friends of the Kaw lists the Ogden ramp with GPS 39.10503, -96.69633, river-left access, trailer parking, and public amenities.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-163-5-ogden-access-ramp/"
      },
      {
        "label": "Public take-out",
        "value": "St. George / Boggs Landing, RM 137",
        "note": "Friends of the Kaw lists St. George / Boggs Landing with GPS 39.18726, -96.42202, river-left access, public parking, and strong town amenities.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-137-st-george-access-ramp/"
      },
      {
        "label": "Route distance",
        "value": "About 26 mi",
        "note": "Friends of the Kaw says Ogden to Manhattan is about 14 miles and Manhattan to St. George is 12 miles, which supports this longer combined public route.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-163-5-ogden-access-ramp/"
      },
      {
        "label": "Direct live proxy reading",
        "value": "Wamego gauge 18,800 cfs / 10.60 ft",
        "note": "USGS Water Services returned 18,800 cfs and 10.60 ft at 2026-06-26 11:30 CDT for Kansas River at Wamego, the downstream same-river proxy used for this route.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=06887500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Flow safety bands",
        "value": "1,000 / 1,500-5,000 / 8,000 cfs",
        "note": "Friends of the Kaw recommends novice paddlers stay below 5,000 cfs and everyone else below 8,000 cfs, while USACE recreation guidance supports the difficult-below-1,000 and no-impact 1,500-5,000 calibration.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/paddle-faq/"
      },
      {
        "label": "Mid-route caveats",
        "value": "Manhattan sandbar and Blue River release context",
        "note": "The Ogden page warns of a sandbar at the toe of the Manhattan ramp, and the Manhattan page warns the nearby Blue River variation can be difficult when Tuttle Creek releases exceed 500 cfs.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-149-manhattan-access-ramp/"
      },
      {
        "label": "Camping support",
        "value": "Public sandbar camping between high-water marks",
        "note": "Friends of the Kaw says the Kansas River is public, sandbar camping is allowed without a special permit, and private banks above the high-water mark remain off-limits.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/camping/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Friends of the Kaw Kansas River access map",
        "url": "https://kansasriver.org/river-access-map/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Ogden access",
        "url": "https://kansasriver.org/river-access-map/river-mile-163-5-ogden-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Manhattan K-177 / Fairmont access",
        "url": "https://kansasriver.org/river-access-map/river-mile-149-manhattan-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw St. George / Boggs Landing access",
        "url": "https://kansasriver.org/river-access-map/river-mile-137-st-george-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Paddle FAQ",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw camping on the Kaw",
        "url": "https://kansasriver.org/paddle-and-fish/camping/",
        "provider": "local"
      },
      {
        "label": "USACE Kansas River recreation appendix",
        "url": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 06887500 Kansas River at Wamego",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06887500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kansas-river-ogden-wamego",
    "slug": "kansas-river-ogden-wamego",
    "name": "Kansas River",
    "reach": "Ogden to Wamego",
    "aliases": [
      "Kaw River - Ogden to Wamego",
      "Kansas River - Ogden Access Ramp to Wamego",
      "Ogden Access Ramp to Wamego Access Ramp"
    ],
    "state": "Kansas",
    "region": "Northeast Kansas",
    "summary": "Long upper-Kaw continuation from Ogden to Wamego through Manhattan and St. George. Friends of the Kaw documents the public access chain, and the Wamego gauge sits in the take-out corridor for a direct same-day level check.",
    "statusText": "Use the Kansas River at Wamego gauge. The broad Kaw window is about 1,500 to 5,000 cfs; below 1,000 cfs expect slow sandbar picking, while above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
    "latitude": 39.10503,
    "longitude": -96.69633,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a very long upper-Kaw route with wind, shifting sandbars, and few clean legal exits except the named ramps.",
        "Check Blue River and Tuttle Creek release context before launching, and scout the bridge-area approach into Wamego if the current is pushy.",
        "Stay with public ramps and legal sandbar stops between the high-water marks; do not use private banks as planned rest or bailout points."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-06887500",
      "provider": "usgs",
      "siteId": "06887500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Kansas River at Wamego, KS",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06887500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1500,
      "idealMax": 5000,
      "tooLow": 1000,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "Friends of the Kaw safety bands and USACE Kansas River recreation flow impacts",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.9,
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
      "seasonNotes": "Spring through fall is the practical season. This route is naturally overnight-capable, and high water can remove the sandbar rest and camping options that make the distance manageable.",
      "difficulty": "hard",
      "difficultyNotes": "The combined distance is about 34.5 miles before wind, current, or low-water channel picking slow the trip further. Treat it as a committed big-river route rather than a casual float.",
      "confidenceNotes": "Confidence is high for access and route shape: Friends of the Kaw documents Ogden at river mile 163.4, Manhattan at river mile 150.7, St. George at river mile 137, and Wamego at river mile 128.5 with public GPS-backed ramps. Confidence is moderate for scoring because the level bands are broad Kansas River guidance even though the Wamego discharge gauge is direct for the take-out corridor."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Ogden Access Ramp, RM 163.4",
        "note": "Friends of the Kaw lists the Ogden ramp with GPS 39.10503, -96.69633, river-left access, trailer parking, and public amenities.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-163-5-ogden-access-ramp/"
      },
      {
        "label": "Public take-out",
        "value": "Wamego Access Ramp, RM 128.5",
        "note": "Friends of the Kaw lists the Wamego ramp with GPS 39.19828, -96.30537 under the K-99 bridge, with public parking, a wide concrete ramp, and easy access to town services.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-128-wamego-access-ramp/"
      },
      {
        "label": "Route distance",
        "value": "About 34.5 mi",
        "note": "Friends of the Kaw says Ogden to Manhattan is about 14 miles, Manhattan to St. George is 12 miles, and St. George to Wamego is 8.5 miles, which supports this longer combined public route.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-163-5-ogden-access-ramp/"
      },
      {
        "label": "Direct live reading",
        "value": "Wamego gauge 18,900 cfs / 10.63 ft",
        "note": "USGS Water Services returned 18,900 cfs and 10.63 ft at 2026-06-26 12:30 CDT for Kansas River at Wamego, the direct same-river gauge used for this route.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=06887500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Flow safety bands",
        "value": "1,000 / 1,500-5,000 / 8,000 cfs",
        "note": "Friends of the Kaw recommends novice paddlers stay below 5,000 cfs and everyone else below 8,000 cfs, while USACE recreation guidance supports the difficult-below-1,000 and no-impact 1,500-5,000 calibration.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/paddle-faq/"
      },
      {
        "label": "Mid-route and take-out caveats",
        "value": "Manhattan sandbar, Blue River release context, and Wamego bridge turn",
        "note": "The Ogden and Manhattan pages note the sandbar at the Manhattan ramp and Blue River release effects near Tuttle Creek, while St. George warns that approaching Wamego often works best by passing under K-99 and turning upstream next to the bank.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-137-st-george-access-ramp/"
      },
      {
        "label": "Camping support",
        "value": "Public sandbar camping between high-water marks",
        "note": "Friends of the Kaw says the Kansas River is public, sandbar camping is allowed without a special permit, and private banks above the high-water mark remain off-limits.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/camping/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Friends of the Kaw Kansas River access map",
        "url": "https://kansasriver.org/river-access-map/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Ogden access",
        "url": "https://kansasriver.org/river-access-map/river-mile-163-5-ogden-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Manhattan K-177 / Fairmont access",
        "url": "https://kansasriver.org/river-access-map/river-mile-149-manhattan-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw St. George / Boggs Landing access",
        "url": "https://kansasriver.org/river-access-map/river-mile-137-st-george-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Wamego access",
        "url": "https://kansasriver.org/river-access-map/river-mile-128-wamego-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Paddle FAQ",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw camping on the Kaw",
        "url": "https://kansasriver.org/paddle-and-fish/camping/",
        "provider": "local"
      },
      {
        "label": "USACE Kansas River recreation appendix",
        "url": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 06887500 Kansas River at Wamego",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06887500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kansas-river-topeka-water-plant-seward",
    "slug": "kansas-river-topeka-water-plant-seward",
    "name": "Kansas River",
    "reach": "Topeka Water Plant to Seward Avenue / Fool's Landing",
    "aliases": [
      "Kaw River - Topeka Water Plant to Seward Avenue",
      "Kansas River - Topeka Weir to Fool's Landing",
      "Topeka Water Plant Low-Head Dam Access Ramp to Seward Avenue Access Ramp"
    ],
    "state": "Kansas",
    "region": "Northeast Kansas",
    "summary": "Guarded Topeka-area Kansas River day from the downstream Topeka Water Plant access ramp to Seward Avenue / Fool's Landing. Friends of the Kaw documents both public ramps, the 10.6-mile spacing, and the old railroad bridge hazards, while the Topeka Weir USGS gauge gives a direct level check at the put-in corridor.",
    "statusText": "Use the Kansas River above Topeka Weir gauge. The broad Kaw window is about 1,500 to 5,000 cfs; below 1,000 cfs exposed bridge debris and sandbar picking become more likely, while above 8,000 cfs Friends of the Kaw says sandbar rest stops are scarce.",
    "latitude": 39.07421,
    "longitude": -95.71637,
    "gaugeSource": {
      "id": "usgs-06888990",
      "provider": "usgs",
      "siteId": "06888990",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Kansas River above Topeka Weir at Topeka, KS",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06888990/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Launch below the Topeka dam and make the Seward take-out before the downstream Tecumseh low-head-dam corridor.",
        "Old railroad bridge remains include exposed steel hazards at low water; follow current local guidance and pass on the recommended side.",
        "Active dredging, downtown bridge current, storms, and private banks require extra verification before launch."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1500,
      "idealMax": 5000,
      "tooLow": 1000,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "Friends of the Kaw safety bands and USACE Kansas River recreation flow impacts",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.8,
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
      "seasonNotes": "Spring through fall is the practical season. This reach starts just downstream of the Topeka Water Plant low-head dam, passes old railroad bridge debris, and ends just upstream of the Tecumseh low-head-dam reach, so same-day gauge, weather, wind, sandbar, ramp, and hazard checks matter.",
      "difficulty": "moderate",
      "difficultyNotes": "Friends of the Kaw says this trip is not recommended for novice paddlers because of in-river hazards. The route has a direct gauge and public ramps, but paddlers must avoid the Topeka dam by launching below it, pass the old bridge remains on the correct side, watch active sand dredging near Seward, and stop before the Tecumseh low-head dam downstream.",
      "confidenceNotes": "Confidence is high for access, gauge placement, and route shape: Friends of the Kaw documents the Topeka Water Plant access / portage at river mile 87.6 with coordinates, Seward Avenue / Fool's Landing at river mile 77 with coordinates, and the 10.6-mile downstream spacing. Confidence is moderate for scoring because the level bands are broad Kansas River guidance rather than an exact route-specific ladder. The app applies the same conservative Kaw calibration used elsewhere: Friends of the Kaw safety guidance for the 5,000 / 8,000 cfs high-side bands and USACE recreation flow-impact ranges for the 1,000 / 1,500 cfs low-side calibration."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Topeka Water Plant downstream ramp, RM 87.6",
        "note": "Friends of the Kaw lists the Topeka Water Plant low-head dam and access area with portage coordinates 39.07421, -95.71637, river-left ramps above and below the dam, and parking for shuttling and launching.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-87-topeka-coffer-dam/"
      },
      {
        "label": "Public take-out",
        "value": "Seward Avenue / Fool's Landing, RM 77",
        "note": "Friends of the Kaw lists Seward Avenue / Fool's Landing with GPS 39.06036, -95.59468, river-right concrete ramp, paved parking, lighting, trash can, and Shawnee County Parks & Recreation maintenance context.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-77-seward-access-ramp/"
      },
      {
        "label": "Route distance",
        "value": "About 10.6 river miles",
        "note": "The Topeka Water Plant access page says the next access is Seward Avenue / Fool's Landing 10.6 miles downstream at river mile 77.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-87-topeka-coffer-dam/"
      },
      {
        "label": "Public river and ramps",
        "value": "Kansas, Arkansas, and Missouri Rivers public in Kansas",
        "note": "Friends of the Kaw says the Kansas, Arkansas, and Missouri Rivers are public rivers in Kansas and that all Kansas River boat ramps are open to the public.",
        "sourceUrl": "https://kansasriver.org/paddle-and-fish/paddle-faq/"
      },
      {
        "label": "Flow safety bands",
        "value": "Novices under 5,000 cfs; all paddlers under 8,000 cfs",
        "note": "Friends of the Kaw recommends novice paddlers stay below 5,000 cfs and more experienced paddlers stay below 8,000 cfs; at 8,000 cfs and higher, few sandbars remain for rest stops.",
        "sourceUrl": "https://kansasriver.org/wp-content/uploads/2026/01/FOK-River-and-Sandbar-Safety-2025.pdf"
      },
      {
        "label": "Low-flow recreation impacts",
        "value": "<1,000 / 1,500-5,000 / 8,000+ cfs",
        "note": "USACE Kansas River recreation material identifies difficult paddling below 1,000 cfs, no recreation impacts from 1,500 to 5,000 cfs, novice impacts from 5,000 to 8,000 cfs, and extremely difficult paddling from 8,000 to 11,000 cfs.",
        "sourceUrl": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf"
      },
      {
        "label": "Gauge",
        "value": "USGS 06888990 above Topeka Weir",
        "note": "USGS operates Kansas River above Topeka Weir at Topeka, KS in the put-in corridor. Use it as a direct Topeka reach gauge, with PaddleTodayV2's existing USGS provider handling live observations.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06888990/"
      },
      {
        "label": "In-river hazards",
        "value": "Old railroad bridges and active dredge",
        "note": "Friends of the Kaw warns that old railroad bridge remains at river miles 85.3 and 84.5 include exposed steel, especially at low water; boaters should pass close to river right. It also notes an active sand dredge approaching Seward.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-87-topeka-coffer-dam/"
      },
      {
        "label": "Downstream dam caveat",
        "value": "Tecumseh low-head dam below Seward",
        "note": "Friends of the Kaw says the Tecumseh low-head dam is about one mile downstream from Seward Avenue / Fool's Landing and should be reviewed closely before any separate downstream trip planning.",
        "sourceUrl": "https://kansasriver.org/river-access-map/river-mile-77-seward-access-ramp/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Friends of the Kaw Kansas River access map",
        "url": "https://kansasriver.org/river-access-map/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Topeka Water Plant access",
        "url": "https://kansasriver.org/river-access-map/river-mile-87-topeka-coffer-dam/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Seward Avenue / Fool's Landing access",
        "url": "https://kansasriver.org/river-access-map/river-mile-77-seward-access-ramp/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw River Access Tips",
        "url": "https://kansasriver.org/paddle-and-fish/river-access/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw Paddle FAQ",
        "url": "https://kansasriver.org/paddle-and-fish/paddle-faq/",
        "provider": "local"
      },
      {
        "label": "Friends of the Kaw river and sandbar safety",
        "url": "https://kansasriver.org/wp-content/uploads/2026/01/FOK-River-and-Sandbar-Safety-2025.pdf",
        "provider": "local"
      },
      {
        "label": "USACE Kansas River recreation appendix",
        "url": "https://www.nwk.usace.army.mil/Portals/29/docs/KRRFSS_Draft%20Appendix%20F_Recreation_2023-11-06.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 06888990 Kansas River above Topeka Weir",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06888990/",
        "provider": "usgs"
      }
    ]
  }
];
