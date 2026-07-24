// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const nebraskaRoutes: River[] = [
  {
    "id": "platte-river-schramm-louisville",
    "slug": "platte-river-schramm-louisville",
    "name": "Platte River",
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
      "confidenceNotes": "Confidence is good for a conservative Nebraska split: Nebraska Game and Parks/Nebraskaland documents Schramm as the launch, Platte River State Park as a water-trail stop 2.9 miles downstream, and numeric paddling bands tied to USGS 06805500 at Louisville. USGS Water Services returned same-day 2026-06-22 current values for 06805500. The Platte River State Park coordinate is a practical park-access anchor for the named Decker Creek / Owen Landing stop rather than a surveyed launch pin."
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
    "latitude": 41.0175,
    "longitude": -96.2038,
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
      "confidenceNotes": "Confidence is good for a conservative Nebraska split: Nebraska Game and Parks/Nebraskaland documents Platte River State Park as the midpoint stop and Louisville as the end of the improved lower-Platte water trail, with numeric paddling bands tied to USGS 06805500 at Louisville. USGS Water Services returned same-day 2026-06-22 current values for 06805500. The Platte River State Park coordinate is a practical park-access anchor for the named Decker Creek / Owen Landing stop rather than a surveyed launch pin."
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
    "latitude": 41.471508,
    "longitude": -97.602729,
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
    "latitude": 41.471508,
    "longitude": -97.602729,
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
  }
];
