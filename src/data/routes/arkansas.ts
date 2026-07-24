// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const arkansasRoutes: River[] = [
  {
    "id": "bayou-deview-benson-creek-bank-of-brinkley",
    "slug": "bayou-deview-benson-creek-bank-of-brinkley",
    "name": "Bayou DeView",
    "reach": "Benson Creek Access to Bank of Brinkley Access",
    "aliases": [
      "Bayou DeView - Benson Creek to Bank of Brinkley",
      "Bayou DeView Water Trail full access-planner route",
      "AGFC Bayou DeView full 15.2-mile planner trail"
    ],
    "state": "Arkansas",
    "region": "Delta",
    "summary": "Canonical full Bayou DeView Water Trail from Benson Creek Access to Bank of Brinkley Access. AGFC still documents the entire 15.2-mile public trail, the direct gauge thresholds, and primitive Dagmar WMA camping support, and this slug now carries the intermediate access planner instead of preserving every same-corridor permutation.",
    "statusText": "Use the Bayou DeView near Brinkley gauge. AGFC still says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so this route treats 14 to under 17 ft as the usable band and flags lower or higher water as a problem.",
    "latitude": 34.876608,
    "longitude": -91.283799,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "AGFC says Bayou DeView high water is dangerous and the main channel is not always distinct, so the full trail should be treated as a serious floodplain-navigation route, not a casual flatwater paddle.",
        "Carry the AGFC georeferenced map offline, file a float plan, and make a daylight decision about whether the group is completing the route in one push or splitting it with a legal Dagmar WMA camp.",
        "Stay off private banks and expect wood, floating debris, wind exposure, and stronger current if the gauge rises toward the 17-foot road-closure mark."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07077730",
      "provider": "usgs",
      "siteId": "07077730",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Bayou Deview near Brinkley, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 14,
      "idealMax": 16.9,
      "tooLow": 14,
      "tooHigh": 17,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Bayou DeView gauge guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "The full trail still depends on enough stage to connect the marked route without forcing shallow detours, and road-access checks matter because the Dagmar gate closes when the gauge reaches 17 ft.",
      "difficulty": "moderate",
      "difficultyNotes": "AGFC treats the trail as flatwater without rapids, but the full 15.2-mile version is a long navigation day or primitive overnight route through a floodplain channel network with limited fast bailouts.",
      "confidenceNotes": "Confidence is high for a conservative Arkansas add: AGFC still publishes Benson Creek to Bank of Brinkley as the full 15.2-mile public Bayou DeView Water Trail, provides source-backed public endpoints and intermediate accesses, and ties the route to direct USGS 07077730 with explicit low and closure thresholds. Water Services returned 15.26 ft at 2026-07-03 03:00 CDT, inside the official floatable window."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Benson Creek Access to Bank of Brinkley Access, 15.2 miles",
        "note": "AGFC still lists Benson Creek to Bank of Brinkley as the full Bayou DeView Water Trail segment.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Direct gauge threshold",
        "value": "Around 14 ft to paddle; Dagmar Road gate closes at 17 ft",
        "note": "AGFC still says the gauge height needs to be around 14 feet or higher to paddle the trail and that the gate on Dagmar Road is closed at 17 feet.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Recent official gauge reading",
        "value": "USGS 07077730 at 15.26 ft",
        "note": "USGS Water Services returned a latest gage-height reading of 15.26 ft at 2026-07-03 03:00 CDT for Bayou Deview near Brinkley, inside AGFC's floatable threshold window.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all"
      },
      {
        "label": "Put-in access",
        "value": "Benson Creek Access, 34.93569, -91.24092",
        "note": "AGFC still publishes Benson Creek Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Take-out access",
        "value": "Bank of Brinkley Access, 34.80024, -91.30049",
        "note": "AGFC still publishes Bank of Brinkley Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf"
      },
      {
        "label": "Camping policy",
        "value": "Free Dagmar WMA campsites on route; none on Cache River NWR",
        "note": "AGFC still says free first-come campsites marked by blue paint are available on Dagmar WMA and that camping is not allowed on Cache River National Wildlife Refuge.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Planner model",
        "value": "Canonical Bayou DeView corridor with intermediate public accesses",
        "note": "This full-trail slug preserves Benson Creek to Bank of Brinkley as the canonical route while the trip details keep Dark Corner, Hickson Lake, Rock Island Road, and Apple Lake available as named public access-planner stops.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Bayou DeView Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      {
        "label": "AGFC Bayou DeView trail map",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf",
        "provider": "local"
      },
      {
        "label": "AGFC Sheffield Nelson Dagmar WMA",
        "url": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/",
        "provider": "local"
      },
      {
        "label": "USGS 07077730 Bayou Deview near Brinkley",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07077730 latest gage height",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "bayou-deview-benson-creek-rock-island-road",
    "slug": "bayou-deview-benson-creek-rock-island-road",
    "name": "Bayou DeView",
    "reach": "Benson Creek Access to Rock Island Road Access",
    "aliases": [
      "Bayou DeView - Benson Creek to Rock Island Road",
      "Bayou DeView Water Trail upper-to-middle continuation",
      "AGFC Bayou DeView Benson Creek to Rock Island Road"
    ],
    "state": "Arkansas",
    "region": "Delta",
    "summary": "Longer upper-to-middle Bayou DeView continuation from Benson Creek Access to Rock Island Road Access. AGFC still documents the public access chain, the direct gauge thresholds, and the same floodplain route-finding caveats that make this more than a casual flatwater day.",
    "statusText": "Use the Bayou DeView near Brinkley gauge. AGFC still says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so this route treats 14 to under 17 ft as the usable band and flags lower or higher water as a problem.",
    "latitude": 34.895473,
    "longitude": -91.264988,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "AGFC says Bayou DeView high water is dangerous and the main channel is not always distinct, so this longer continuation needs active route-finding and conservative launch decisions.",
        "Carry the AGFC georeferenced map offline and keep trail markers in sight because the upper-to-middle corridor leaves more room for wrong turns and time loss than the short splits.",
        "Stay off private banks and expect wood, floating debris, and stronger current if the gauge rises toward the 17-foot Dagmar Road closure mark."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07077730",
      "provider": "usgs",
      "siteId": "07077730",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Bayou Deview near Brinkley, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 14,
      "idealMax": 16.9,
      "tooLow": 14,
      "tooHigh": 17,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Bayou DeView gauge guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This longer continuation still depends on enough stage to connect the marked trail without forcing shallow detours, and road-access checks matter because the Dagmar gate closes when the gauge reaches 17 ft.",
      "difficulty": "easy",
      "difficultyNotes": "AGFC treats the trail as flatwater without rapids, but this 9.4-mile upper-to-middle version is a fuller navigation day through a floodplain channel network rather than a casual one-channel float.",
      "confidenceNotes": "Confidence is high for a conservative Arkansas add: AGFC still publishes the Benson Creek -> Hickson Lake 6.5-mile and Hickson Lake -> Rock Island Road 2.9-mile public segments, which support a defensible 9.4-mile continuation with source-backed public endpoints. The same AGFC page still ties the trail to direct USGS 07077730 with explicit low and closure thresholds, and Water Services returned 14.43 ft at 2026-07-16 09:00 CDT during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Benson Creek Access to Rock Island Road Access, about 9.4 miles",
        "note": "AGFC lists Benson Creek to Hickson Lake as 6.5 miles and Hickson Lake to Rock Island Road as 2.9 miles, which supports the longer continuation through the same public access chain.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Direct gauge threshold",
        "value": "Around 14 ft to paddle; Dagmar Road gate closes at 17 ft",
        "note": "AGFC still says the gauge height needs to be around 14 feet or higher to paddle the trail and that the gate on Dagmar Road is closed at 17 feet.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Recent official gauge reading",
        "value": "USGS 07077730 at 14.43 ft",
        "note": "USGS Water Services returned a latest gage-height reading of 14.43 ft at 2026-07-16 09:00 CDT for Bayou Deview near Brinkley, inside AGFC's floatable threshold window.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all"
      },
      {
        "label": "Put-in access",
        "value": "Benson Creek Access, 34.93569, -91.24092",
        "note": "AGFC still publishes Benson Creek Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Take-out access",
        "value": "Rock Island Road Access, 34.85911, -91.29025",
        "note": "AGFC still publishes Rock Island Road Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf"
      },
      {
        "label": "Camping policy",
        "value": "AGFC camping permit on Dagmar WMA; no Cache River NWR camping",
        "note": "AGFC still treats Dagmar WMA as the nearby legal camping support and says Apple Lake WRA closes to access from Nov. 1 through Feb. 15, while camping is not allowed on Cache River National Wildlife Refuge.",
        "sourceUrl": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Bayou DeView Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      {
        "label": "AGFC Bayou DeView trail map",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf",
        "provider": "local"
      },
      {
        "label": "AGFC Sheffield Nelson Dagmar WMA",
        "url": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/",
        "provider": "local"
      },
      {
        "label": "USGS 07077730 Bayou Deview near Brinkley",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07077730 latest gage height",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "bayou-deview-hickson-lake-rock-island-road",
    "slug": "bayou-deview-hickson-lake-rock-island-road",
    "name": "Bayou DeView",
    "reach": "Hickson Lake Access to Rock Island Road Access",
    "aliases": [
      "Bayou DeView - Hickson Lake to Rock Island Road",
      "Bayou DeView Water Trail mid-lower split",
      "AGFC Bayou DeView Hickson Lake to Rock Island Road"
    ],
    "state": "Arkansas",
    "region": "Delta",
    "summary": "Shorter middle Bayou DeView water-trail segment from Hickson Lake Access to Rock Island Road Access. AGFC still documents the exact 2.9-mile public segment, the same direct gauge thresholds, and free primitive Dagmar WMA campsite support nearby.",
    "statusText": "Use the Bayou DeView near Brinkley gauge. AGFC still says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so this route treats 14 to under 17 ft as the usable band and flags lower or higher water as a problem.",
    "latitude": 34.874909,
    "longitude": -91.291309,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "AGFC still says high water is dangerous on Bayou DeView and that the main channel is not always distinct, so even this short middle segment still needs active route-finding.",
        "Carry the georeferenced trail map and keep markers in sight because Hickson to Rock Island still threads floodplain channels rather than one obvious bank-to-bank corridor.",
        "Stay off private banks and expect wood, floating debris, and stronger current if the gauge rises toward the 17-foot Dagmar Road closure mark."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07077730",
      "provider": "usgs",
      "siteId": "07077730",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Bayou Deview near Brinkley, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 14,
      "idealMax": 16.9,
      "tooLow": 14,
      "tooHigh": 17,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Bayou DeView gauge guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This low-gradient floodplain route still depends on enough stage to connect the marked trail without forcing shallow detours, and the access roads become the main hard stop when water reaches the 17-foot gate-closure line.",
      "difficulty": "easy",
      "difficultyNotes": "AGFC treats the trail as flatwater without rapids, and this 2.9-mile version is one of the simpler day options, but it still requires navigation discipline in indistinct cypress-tupelo channels.",
      "confidenceNotes": "Confidence is high for a short Arkansas add: AGFC still publishes Hickson Lake to Rock Island Road as an exact 2.9-mile public segment, provides map-linked endpoint coordinates, and ties the trail to the direct USGS Brinkley gauge with explicit low and closure thresholds. Water Services returned 14.15 ft at 2026-07-15 17:00 CDT, just above the official floatable floor."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Hickson Lake Access to Rock Island Road Access, 2.9 miles",
        "note": "AGFC still lists Hickson Lake to Rock Island Road as an exact Bayou DeView Water Trail segment.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Direct gauge threshold",
        "value": "Around 14 ft to paddle; Dagmar Road gate closes at 17 ft",
        "note": "AGFC still says the gauge height needs to be around 14 feet or higher to paddle the trail and that the gate on Dagmar Road is closed at 17 feet.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Recent official gauge reading",
        "value": "USGS 07077730 at 14.15 ft",
        "note": "USGS Water Services returned a latest gage-height reading of 14.15 ft at 2026-07-15 17:00 CDT for Bayou Deview near Brinkley, just above AGFC's floatable threshold floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all"
      },
      {
        "label": "Put-in access",
        "value": "Hickson Lake Access, 34.89039, -91.29826",
        "note": "AGFC still publishes Hickson Lake Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Take-out access",
        "value": "Rock Island Road Access, 34.85911, -91.29025",
        "note": "AGFC still publishes Rock Island Road Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf"
      },
      {
        "label": "Camping and access policy",
        "value": "Free Dagmar WMA campsites; no Cache River NWR camping",
        "note": "AGFC still says free first-come campsites marked by blue paint are available on Dagmar WMA, while camping is not allowed on Cache River National Wildlife Refuge.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Bayou DeView Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      {
        "label": "AGFC Bayou DeView trail map",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf",
        "provider": "local"
      },
      {
        "label": "AGFC Sheffield Nelson Dagmar WMA",
        "url": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/",
        "provider": "local"
      },
      {
        "label": "USGS 07077730 Bayou Deview near Brinkley",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07077730 latest gage height",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "bayou-deview-rock-island-road-apple-lake",
    "slug": "bayou-deview-rock-island-road-apple-lake",
    "name": "Bayou DeView",
    "reach": "Rock Island Road Access to Apple Lake Access",
    "aliases": [
      "Bayou DeView - Rock Island Road to Apple Lake",
      "Bayou DeView Water Trail lower-middle split",
      "AGFC Bayou DeView Rock Island Road to Apple Lake"
    ],
    "state": "Arkansas",
    "region": "Delta",
    "summary": "Very short lower-middle Bayou DeView water-trail segment from Rock Island Road Access to Apple Lake Access. AGFC still documents the exact 1.5-mile public segment, the same direct gauge thresholds, and the seasonal Apple Lake WRA access caveat.",
    "statusText": "Use the Bayou DeView near Brinkley gauge. AGFC still says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so this route treats 14 to under 17 ft as the usable band and flags lower or higher water as a problem.",
    "latitude": 34.849873,
    "longitude": -91.2845,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "AGFC still says high water is dangerous on Bayou DeView, and even this short segment can become confusing because the main channel is not always distinct.",
        "Carry the georeferenced map anyway; the route is short, but the Apple Lake side still sits in a floodplain maze where a missed turn can waste time quickly.",
        "Stay off private banks, watch for floating wood, and verify Apple Lake access status because the WMA closes Apple Lake WRA to access from November 1 through February 15."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07077730",
      "provider": "usgs",
      "siteId": "07077730",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Bayou Deview near Brinkley, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 14,
      "idealMax": 16.9,
      "tooLow": 14,
      "tooHigh": 17,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Bayou DeView gauge guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This short route still depends on enough stage to keep the channel connected, and launch-day checks should include both the USGS gauge and any WMA seasonal access notices for Apple Lake.",
      "difficulty": "easy",
      "difficultyNotes": "This is the shortest Bayou DeView day option in the family, but it still requires flatwater route-finding and respect for floodplain wood and private-bank limits.",
      "confidenceNotes": "Confidence is high for a short Arkansas add: AGFC still publishes Rock Island Road to Apple Lake as an exact 1.5-mile public segment, provides map-linked endpoint coordinates, and ties the trail to the direct USGS Brinkley gauge with explicit low and closure thresholds. Water Services returned 14.15 ft at 2026-07-15 17:00 CDT, just above the official floatable floor."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Rock Island Road Access to Apple Lake Access, 1.5 miles",
        "note": "AGFC still lists Rock Island Road to Apple Lake as an exact Bayou DeView Water Trail segment.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Direct gauge threshold",
        "value": "Around 14 ft to paddle; Dagmar Road gate closes at 17 ft",
        "note": "AGFC still says the gauge height needs to be around 14 feet or higher to paddle the trail and that the gate on Dagmar Road is closed at 17 feet.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Recent official gauge reading",
        "value": "USGS 07077730 at 14.15 ft",
        "note": "USGS Water Services returned a latest gage-height reading of 14.15 ft at 2026-07-15 17:00 CDT for Bayou Deview near Brinkley, just above AGFC's floatable threshold floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all"
      },
      {
        "label": "Put-in access",
        "value": "Rock Island Road Access, 34.85911, -91.29025",
        "note": "AGFC still publishes Rock Island Road Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf"
      },
      {
        "label": "Take-out access",
        "value": "Apple Lake Access, 34.84159, -91.28200",
        "note": "AGFC still publishes Apple Lake Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf"
      },
      {
        "label": "Seasonal access caveat",
        "value": "Apple Lake WRA closed to access Nov. 1 through Feb. 15",
        "note": "AGFC still says Apple Lake Waterfowl Rest Area is closed to access from November 1 through February 15.",
        "sourceUrl": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Bayou DeView Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      {
        "label": "AGFC Bayou DeView trail map",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf",
        "provider": "local"
      },
      {
        "label": "AGFC Sheffield Nelson Dagmar WMA",
        "url": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/",
        "provider": "local"
      },
      {
        "label": "USGS 07077730 Bayou Deview near Brinkley",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07077730 latest gage height",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "bayou-deview-apple-lake-bank-of-brinkley",
    "slug": "bayou-deview-apple-lake-bank-of-brinkley",
    "name": "Bayou DeView",
    "reach": "Apple Lake Access to Bank of Brinkley Access",
    "aliases": [
      "Bayou DeView - Apple Lake to Bank of Brinkley",
      "Bayou DeView Water Trail lower segment",
      "AGFC Bayou DeView Apple Lake to Bank of Brinkley"
    ],
    "state": "Arkansas",
    "region": "Delta",
    "summary": "Lower Bayou DeView water-trail segment from Apple Lake Access to Bank of Brinkley Access. AGFC still documents the exact 4.3-mile public segment, the same direct gauge thresholds, and the split between Dagmar WMA camping and no camping on the Cache River refuge side.",
    "statusText": "Use the Bayou DeView near Brinkley gauge. AGFC still says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so this route treats 14 to under 17 ft as the usable band and flags lower or higher water as a problem.",
    "latitude": 34.820077,
    "longitude": -91.289128,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "AGFC still says high water is dangerous on Bayou DeView and the main channel is not always distinct, so the lower route still needs route-finding discipline even though it ends near Brinkley.",
        "Use the Apple Lake seasonal access rules and the Bank of Brinkley launch road conditions as real go/no-go checks, not just the river gauge.",
        "Stay off private banks and expect floating wood, blind turns through cypress, and stronger push as the gauge rises toward the 17-foot road-closure mark."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07077730",
      "provider": "usgs",
      "siteId": "07077730",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Bayou Deview near Brinkley, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 14,
      "idealMax": 16.9,
      "tooLow": 14,
      "tooHigh": 17,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Bayou DeView gauge guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This lower route still depends on enough stage to keep the trail connected, and launch-day checks should include both the USGS gauge and whether Apple Lake or lower access roads are open under current WMA conditions.",
      "difficulty": "easy",
      "difficultyNotes": "AGFC treats the trail as flatwater without rapids, but this 4.3-mile lower version still needs navigation through timbered floodplain turns and should not be treated like a straight canal paddle.",
      "confidenceNotes": "Confidence is high for a conservative Arkansas add: AGFC still publishes Apple Lake to Bank of Brinkley as an exact 4.3-mile public segment, provides map-linked endpoint coordinates, and ties the trail to the direct USGS Brinkley gauge with explicit low and closure thresholds. Water Services returned 14.15 ft at 2026-07-15 17:00 CDT, just above the official floatable floor."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Apple Lake Access to Bank of Brinkley Access, 4.3 miles",
        "note": "AGFC still lists Apple Lake to Bank of Brinkley as an exact Bayou DeView Water Trail segment.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Direct gauge threshold",
        "value": "Around 14 ft to paddle; Dagmar Road gate closes at 17 ft",
        "note": "AGFC still says the gauge height needs to be around 14 feet or higher to paddle the trail and that the gate on Dagmar Road is closed at 17 feet.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Recent official gauge reading",
        "value": "USGS 07077730 at 14.15 ft",
        "note": "USGS Water Services returned a latest gage-height reading of 14.15 ft at 2026-07-15 17:00 CDT for Bayou Deview near Brinkley, just above AGFC's floatable threshold floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all"
      },
      {
        "label": "Put-in access",
        "value": "Apple Lake Access, 34.84159, -91.28200",
        "note": "AGFC still publishes Apple Lake Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf"
      },
      {
        "label": "Take-out access",
        "value": "Bank of Brinkley Access, 34.80024, -91.30049",
        "note": "AGFC still publishes Bank of Brinkley Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf"
      },
      {
        "label": "Camping and access policy",
        "value": "Dagmar WMA campsites upstream; Apple Lake closed Nov. 1-Feb. 15; no Cache River NWR camping",
        "note": "AGFC still says free first-come campsites marked by blue paint are available on Dagmar WMA, Apple Lake WRA closes to access Nov. 1 through Feb. 15, and camping is not allowed on Cache River National Wildlife Refuge.",
        "sourceUrl": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Bayou DeView Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      {
        "label": "AGFC Bayou DeView trail map",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf",
        "provider": "local"
      },
      {
        "label": "AGFC Sheffield Nelson Dagmar WMA",
        "url": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/",
        "provider": "local"
      },
      {
        "label": "USGS 07077730 Bayou Deview near Brinkley",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07077730 latest gage height",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "bayou-deview-hickson-lake-bank-of-brinkley",
    "slug": "bayou-deview-hickson-lake-bank-of-brinkley",
    "name": "Bayou DeView",
    "reach": "Hickson Lake Access to Bank of Brinkley Access",
    "aliases": [
      "Bayou DeView - Hickson Lake to Bank of Brinkley",
      "Bayou DeView Water Trail lower-half continuation",
      "AGFC Bayou DeView Hickson Lake to Bank of Brinkley"
    ],
    "state": "Arkansas",
    "region": "Delta",
    "summary": "Longer lower-half Bayou DeView continuation from Hickson Lake Access to Bank of Brinkley Access. AGFC still documents the access chain, the direct gauge thresholds, and the seasonal Apple Lake caveat that shape this route.",
    "statusText": "Use the Bayou DeView near Brinkley gauge. AGFC still says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so this route treats 14 to under 17 ft as the usable band and flags lower or higher water as a problem.",
    "latitude": 34.843224,
    "longitude": -91.285015,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "AGFC says Bayou DeView high water is dangerous and the main channel is not always distinct, so this longer lower-half route still needs route-finding discipline even though it ends near Brinkley.",
        "Use the Apple Lake seasonal access rule and the lower access roads as real go/no-go checks, not just the river gauge.",
        "Stay off private banks and expect floating wood, blind turns through cypress, and stronger push as the gauge rises toward the 17-foot road-closure mark."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07077730",
      "provider": "usgs",
      "siteId": "07077730",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Bayou Deview near Brinkley, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 14,
      "idealMax": 16.9,
      "tooLow": 14,
      "tooHigh": 17,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Bayou DeView gauge guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This longer lower-half route still depends on enough stage to keep the trail connected, and launch-day checks should include both the USGS gauge and whether Apple Lake or lower access roads are open under current WMA conditions.",
      "difficulty": "easy",
      "difficultyNotes": "AGFC treats the trail as flatwater without rapids, but this 8.7-mile lower-half version still needs navigation through timbered floodplain turns and should not be treated like a straight canal paddle.",
      "confidenceNotes": "Confidence is high for a conservative Arkansas add: AGFC still publishes the Hickson Lake -> Rock Island 2.9-mile, Rock Island -> Apple Lake 1.5-mile, and Apple Lake -> Bank of Brinkley 4.3-mile public segments, which support a defensible 8.7-mile continuation with source-backed public endpoints. The same AGFC page still ties the trail to direct USGS 07077730 with explicit low and closure thresholds, and Water Services returned 14.43 ft at 2026-07-16 09:00 CDT during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Hickson Lake Access to Bank of Brinkley Access, about 8.7 miles",
        "note": "AGFC lists Hickson Lake to Rock Island Road as 2.9 miles, Rock Island Road to Apple Lake as 1.5 miles, and Apple Lake to Bank of Brinkley as 4.3 miles, which supports the longer lower-half continuation.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Direct gauge threshold",
        "value": "Around 14 ft to paddle; Dagmar Road gate closes at 17 ft",
        "note": "AGFC still says the gauge height needs to be around 14 feet or higher to paddle the trail and that the gate on Dagmar Road is closed at 17 feet.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Recent official gauge reading",
        "value": "USGS 07077730 at 14.43 ft",
        "note": "USGS Water Services returned a latest gage-height reading of 14.43 ft at 2026-07-16 09:00 CDT for Bayou Deview near Brinkley, inside AGFC's floatable threshold window.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all"
      },
      {
        "label": "Put-in access",
        "value": "Hickson Lake Access, 34.89039, -91.29826",
        "note": "AGFC still publishes Hickson Lake Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Take-out access",
        "value": "Bank of Brinkley Access, 34.80024, -91.30049",
        "note": "AGFC still publishes Bank of Brinkley Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf"
      },
      {
        "label": "Camping and seasonal access",
        "value": "AGFC camping permit on Dagmar WMA; Apple Lake closed Nov. 1-Feb. 15; no Cache River NWR camping",
        "note": "AGFC still treats Dagmar WMA as the nearby legal camping support, says Apple Lake WRA is closed to access from Nov. 1 through Feb. 15, and says camping is not allowed on Cache River National Wildlife Refuge.",
        "sourceUrl": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Bayou DeView Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      {
        "label": "AGFC Bayou DeView trail map",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf",
        "provider": "local"
      },
      {
        "label": "AGFC Sheffield Nelson Dagmar WMA",
        "url": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/",
        "provider": "local"
      },
      {
        "label": "USGS 07077730 Bayou Deview near Brinkley",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07077730 latest gage height",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "bayou-deview-hickson-lake-apple-lake",
    "slug": "bayou-deview-hickson-lake-apple-lake",
    "name": "Bayou DeView",
    "reach": "Hickson Lake Access to Apple Lake Access",
    "aliases": [
      "Bayou DeView - Hickson Lake to Apple Lake",
      "Bayou DeView Water Trail middle continuation",
      "AGFC Bayou DeView Hickson Lake to Apple Lake"
    ],
    "state": "Arkansas",
    "region": "Delta",
    "summary": "Middle Bayou DeView continuation from Hickson Lake Access to Apple Lake Access. AGFC still documents the public access chain, the direct gauge thresholds, and the Apple Lake seasonal closure caveat that shapes this otherwise short floodplain route.",
    "statusText": "Use the Bayou DeView near Brinkley gauge. AGFC still says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so this route treats 14 to under 17 ft as the usable band and flags lower or higher water as a problem.",
    "latitude": 34.866863,
    "longitude": -91.290879,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "AGFC says Bayou DeView high water is dangerous and the main channel is not always distinct, so even this mid-length continuation still needs active route-finding rather than casual flatwater assumptions.",
        "Use the Apple Lake seasonal access rule and the lower Dagmar road conditions as real go/no-go checks, not just the gauge.",
        "Stay off private banks and expect floating wood, blind turns through cypress, and stronger push as the gauge rises toward the 17-foot road-closure mark."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07077730",
      "provider": "usgs",
      "siteId": "07077730",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Bayou Deview near Brinkley, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 14,
      "idealMax": 16.9,
      "tooLow": 14,
      "tooHigh": 17,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Bayou DeView gauge guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This middle continuation still depends on enough stage to keep the marked route connected, and launch-day checks should include both the USGS gauge and whether Apple Lake access is seasonally open.",
      "difficulty": "easy",
      "difficultyNotes": "AGFC treats the trail as flatwater without rapids, but this 4.4-mile continuation still requires navigation through timbered floodplain turns rather than a simple one-channel float.",
      "confidenceNotes": "Confidence is high for a conservative Arkansas add: AGFC still publishes the Hickson Lake -> Rock Island 2.9-mile and Rock Island -> Apple Lake 1.5-mile public segments, which support a defensible 4.4-mile continuation with source-backed public endpoints. The same AGFC page still ties the trail to direct USGS 07077730 with explicit low and closure thresholds, and Water Services returned 14.10 ft at 2026-07-15 12:00 CDT."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Hickson Lake Access to Apple Lake Access, about 4.4 miles",
        "note": "AGFC lists Hickson Lake to Rock Island Road as 2.9 miles and Rock Island Road to Apple Lake as 1.5 miles, which supports this middle continuation through the same public access chain.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Direct gauge threshold",
        "value": "Around 14 ft to paddle; Dagmar Road gate closes at 17 ft",
        "note": "AGFC still says the gauge height needs to be around 14 feet or higher to paddle the trail and that the gate on Dagmar Road is closed at 17 feet.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Recent official gauge reading",
        "value": "USGS 07077730 at 14.10 ft",
        "note": "USGS Water Services returned a latest gage-height reading of 14.10 ft at 2026-07-15 12:00 CDT for Bayou Deview near Brinkley, just above AGFC's floatable threshold floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all"
      },
      {
        "label": "Put-in access",
        "value": "Hickson Lake Access, 34.89039, -91.29826",
        "note": "AGFC still publishes Hickson Lake Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Take-out access",
        "value": "Apple Lake Access, 34.84159, -91.28200",
        "note": "AGFC still publishes Apple Lake Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf"
      },
      {
        "label": "Camping and seasonal access",
        "value": "Free Dagmar WMA campsites; Apple Lake closed Nov. 1-Feb. 15; no Cache River NWR camping",
        "note": "AGFC still says free first-come campsites marked by blue paint are available on Dagmar WMA, Apple Lake WRA closes to access from Nov. 1 through Feb. 15, and camping is not allowed on Cache River National Wildlife Refuge.",
        "sourceUrl": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Bayou DeView Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      {
        "label": "AGFC Bayou DeView trail map",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf",
        "provider": "local"
      },
      {
        "label": "AGFC Sheffield Nelson Dagmar WMA",
        "url": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/",
        "provider": "local"
      },
      {
        "label": "USGS 07077730 Bayou Deview near Brinkley",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07077730 latest gage height",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "bayou-deview-rock-island-road-bank-of-brinkley",
    "slug": "bayou-deview-rock-island-road-bank-of-brinkley",
    "name": "Bayou DeView",
    "reach": "Rock Island Road Access to Bank of Brinkley Access",
    "aliases": [
      "Bayou DeView - Rock Island Road to Bank of Brinkley",
      "Bayou DeView Water Trail lower continuation",
      "AGFC Bayou DeView Rock Island Road to Bank of Brinkley"
    ],
    "state": "Arkansas",
    "region": "Delta",
    "summary": "Lower Bayou DeView continuation from Rock Island Road Access to Bank of Brinkley Access. AGFC still documents the public access chain, the direct gauge thresholds, and the Apple Lake seasonal closure plus lower-refuge camping limits that shape the route.",
    "statusText": "Use the Bayou DeView near Brinkley gauge. AGFC still says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so this route treats 14 to under 17 ft as the usable band and flags lower or higher water as a problem.",
    "latitude": 34.824886,
    "longitude": -91.285702,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "AGFC says Bayou DeView high water is dangerous and the main channel is not always distinct, so this lower continuation still needs route-finding discipline even though it finishes closer to Brinkley.",
        "Use the Apple Lake seasonal access rule and the lower access roads as real go/no-go checks, not just the river gauge.",
        "Stay off private banks and expect floating wood, blind turns through cypress, and stronger push as the gauge rises toward the 17-foot road-closure mark."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07077730",
      "provider": "usgs",
      "siteId": "07077730",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Bayou Deview near Brinkley, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 14,
      "idealMax": 16.9,
      "tooLow": 14,
      "tooHigh": 17,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Bayou DeView gauge guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This lower continuation still depends on enough stage to keep the trail connected, and launch-day checks should include both the USGS gauge and whether Apple Lake or lower access roads are open under current WMA conditions.",
      "difficulty": "easy",
      "difficultyNotes": "AGFC treats the trail as flatwater without rapids, but this 5.8-mile lower continuation still needs navigation through timbered floodplain turns and should not be treated like a straight canal paddle.",
      "confidenceNotes": "Confidence is high for a conservative Arkansas add: AGFC still publishes the Rock Island -> Apple Lake 1.5-mile and Apple Lake -> Bank of Brinkley 4.3-mile public segments, which support a defensible 5.8-mile continuation with source-backed public endpoints. The same AGFC page still ties the trail to direct USGS 07077730 with explicit low and closure thresholds, and Water Services returned 14.10 ft at 2026-07-15 12:00 CDT."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Rock Island Road Access to Bank of Brinkley Access, about 5.8 miles",
        "note": "AGFC lists Rock Island Road to Apple Lake as 1.5 miles and Apple Lake to Bank of Brinkley as 4.3 miles, which supports this lower continuation through the same public access chain.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Direct gauge threshold",
        "value": "Around 14 ft to paddle; Dagmar Road gate closes at 17 ft",
        "note": "AGFC still says the gauge height needs to be around 14 feet or higher to paddle the trail and that the gate on Dagmar Road is closed at 17 feet.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Recent official gauge reading",
        "value": "USGS 07077730 at 14.10 ft",
        "note": "USGS Water Services returned a latest gage-height reading of 14.10 ft at 2026-07-15 12:00 CDT for Bayou Deview near Brinkley, just above AGFC's floatable threshold floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all"
      },
      {
        "label": "Put-in access",
        "value": "Rock Island Road Access, 34.85911, -91.29025",
        "note": "AGFC still publishes Rock Island Road Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf"
      },
      {
        "label": "Take-out access",
        "value": "Bank of Brinkley Access, 34.80024, -91.30049",
        "note": "AGFC still publishes Bank of Brinkley Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf"
      },
      {
        "label": "Camping and seasonal access",
        "value": "Free Dagmar WMA campsites; Apple Lake closed Nov. 1-Feb. 15; no Cache River NWR camping",
        "note": "AGFC still says free first-come campsites marked by blue paint are available on Dagmar WMA, Apple Lake WRA closes to access from Nov. 1 through Feb. 15, and camping is not allowed on Cache River National Wildlife Refuge.",
        "sourceUrl": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Bayou DeView Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      {
        "label": "AGFC Bayou DeView trail map",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf",
        "provider": "local"
      },
      {
        "label": "AGFC Sheffield Nelson Dagmar WMA",
        "url": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/",
        "provider": "local"
      },
      {
        "label": "USGS 07077730 Bayou Deview near Brinkley",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07077730 latest gage height",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "bayou-deview-benson-creek-apple-lake",
    "slug": "bayou-deview-benson-creek-apple-lake",
    "name": "Bayou DeView",
    "reach": "Benson Creek Access to Apple Lake Access",
    "aliases": [
      "Bayou DeView - Benson Creek to Apple Lake",
      "Bayou DeView Water Trail upper-to-lower continuation",
      "AGFC Bayou DeView Benson Creek to Apple Lake"
    ],
    "state": "Arkansas",
    "region": "Delta",
    "summary": "Longer Bayou DeView continuation from Benson Creek Access to Apple Lake Access. AGFC still documents the public access chain, the direct gauge thresholds, and the same floodplain route-finding plus Apple Lake seasonal caveats that make this a real planning route.",
    "statusText": "Use the Bayou DeView near Brinkley gauge. AGFC still says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so this route treats 14 to under 17 ft as the usable band and flags lower or higher water as a problem.",
    "latitude": 34.890604,
    "longitude": -91.26725,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "AGFC says Bayou DeView high water is dangerous and the main channel is not always distinct, so this longer continuation needs active route-finding and conservative launch decisions.",
        "Carry the AGFC georeferenced map offline and keep trail markers in sight because the upper-to-lower corridor leaves more room for wrong turns and time loss than the short splits.",
        "Stay off private banks and expect wood, floating debris, blind turns through cypress, and stronger current if the gauge rises toward the 17-foot Dagmar Road closure mark."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07077730",
      "provider": "usgs",
      "siteId": "07077730",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Bayou Deview near Brinkley, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 14,
      "idealMax": 16.9,
      "tooLow": 14,
      "tooHigh": 17,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Bayou DeView gauge guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This longer continuation still depends on enough stage to connect the marked trail without forcing shallow detours, and launch-day checks should include both the USGS gauge and whether Apple Lake access is seasonally open.",
      "difficulty": "easy",
      "difficultyNotes": "AGFC treats the trail as flatwater without rapids, but this 10.9-mile upper-to-lower continuation is a fuller floodplain navigation day rather than a casual one-channel float.",
      "confidenceNotes": "Confidence is high for a conservative Arkansas add: AGFC still publishes the Benson Creek -> Hickson Lake 6.5-mile, Hickson Lake -> Rock Island 2.9-mile, and Rock Island -> Apple Lake 1.5-mile public segments, which support a defensible 10.9-mile continuation with source-backed public endpoints. The same AGFC page still ties the trail to direct USGS 07077730 with explicit low and closure thresholds, and Water Services returned 14.10 ft at 2026-07-15 12:00 CDT."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Benson Creek Access to Apple Lake Access, about 10.9 miles",
        "note": "AGFC lists Benson Creek to Hickson Lake as 6.5 miles, Hickson Lake to Rock Island Road as 2.9 miles, and Rock Island Road to Apple Lake as 1.5 miles, which supports the longer upper-to-lower continuation.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Direct gauge threshold",
        "value": "Around 14 ft to paddle; Dagmar Road gate closes at 17 ft",
        "note": "AGFC still says the gauge height needs to be around 14 feet or higher to paddle the trail and that the gate on Dagmar Road is closed at 17 feet.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Recent official gauge reading",
        "value": "USGS 07077730 at 14.10 ft",
        "note": "USGS Water Services returned a latest gage-height reading of 14.10 ft at 2026-07-15 12:00 CDT for Bayou Deview near Brinkley, just above AGFC's floatable threshold floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all"
      },
      {
        "label": "Put-in access",
        "value": "Benson Creek Access, 34.93569, -91.24092",
        "note": "AGFC still publishes Benson Creek Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/"
      },
      {
        "label": "Take-out access",
        "value": "Apple Lake Access, 34.84159, -91.28200",
        "note": "AGFC still publishes Apple Lake Access as a named public Bayou DeView Water Trail launch with a map-linked coordinate point.",
        "sourceUrl": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf"
      },
      {
        "label": "Camping and seasonal access",
        "value": "Free Dagmar WMA campsites; Apple Lake closed Nov. 1-Feb. 15; no Cache River NWR camping",
        "note": "AGFC still says free first-come campsites marked by blue paint are available on Dagmar WMA, Apple Lake WRA closes to access from Nov. 1 through Feb. 15, and camping is not allowed on Cache River National Wildlife Refuge.",
        "sourceUrl": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Bayou DeView Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/bayou-deview-water-trail/",
        "provider": "local"
      },
      {
        "label": "AGFC Bayou DeView trail map",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/bayoudeviewwatertrail.pdf",
        "provider": "local"
      },
      {
        "label": "AGFC Sheffield Nelson Dagmar WMA",
        "url": "https://www.agfc.com/wma/sheffield-nelson-dagmar-wma/",
        "provider": "local"
      },
      {
        "label": "USGS 07077730 Bayou Deview near Brinkley",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07077730/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07077730 latest gage height",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07077730&parameterCd=00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-ponca-kyles-landing",
    "slug": "buffalo-river-ponca-kyles-landing",
    "name": "Buffalo River",
    "reach": "Ponca to Kyle's Landing",
    "aliases": [
      "Buffalo National River - Ponca to Kyle's Landing",
      "Buffalo River - Ponca to Kyles Landing",
      "Upper Buffalo River - Ponca to Kyles"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Classic upper Buffalo National River day from Ponca to Kyle's Landing through the Ponca Wilderness. NPS documents the access chain and USGS operates the direct Ponca gauge, but this is rain-dependent Class II water with remote shuttle and wood risk.",
    "statusText": "Use the Buffalo River at Ponca gauge. Around 130 cfs is the conservative low-water floor for this route; below that, expect scraping, dragging, and missed lines. NPS says levels above 1,600 cfs at Ponca are unsafe.",
    "latitude": 36.0225,
    "longitude": -93.354722,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "Treat Ponca to Kyle's Landing as a Class II upper-Buffalo whitewater trip, not a casual scenic float.",
        "Check the Ponca gauge, current weather, and the level trend before launching; NPS marks levels above 1,600 cfs at Ponca as unsafe.",
        "Expect wood, sweepers, blind bends, limited cell service, and rough-road shuttle logistics in the Ponca Wilderness corridor."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055660",
      "provider": "usgs",
      "siteId": "07055660",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Ponca, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055660/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 130,
      "thresholdSource": {
        "label": "American Whitewater Ponca-to-Kyle's Landing reach and same-gauge trip evidence",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3962/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says the upper Buffalo is largely rainfall dependent, usually begins in spring, and can move downstream quickly in dry years. Treat this as a recent-rain and cool-season opportunity, not a dependable summer float.",
      "difficulty": "hard",
      "difficultyNotes": "American Whitewater rates Ponca to Kyle's Landing as Class II. NPS describes the upper district as narrow and fast, and says more water makes it attractive for whitewater kayaking. This route is not a casual tube float.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS identifies Ponca and Kyle's Landing in the official Buffalo River access/mileage chart, NPS publishes access-area coordinates for Kyle's Landing and the Ponca corridor, USGS 07055660 showed same-day discharge and gage-height values during review, and American Whitewater has an exact Ponca-to-Kyle's Landing Class II reach tied to the Ponca gauge. The app uses only a conservative minimum-only floor because low-water calibration is based on AW/current-condition labels and same-gauge trip evidence rather than an official low/ideal paddling band. NPS's 1,600 cfs unsafe value is preserved as a route caveat, not treated as a full two-sided scoring model."
    },
    "evidenceNotes": [
      {
        "label": "Route mileage",
        "value": "Ponca to Kyle's Landing, 10.7 miles",
        "note": "NPS lists Ponca and Kyle's Landing in the Buffalo River mileage chart with 10.7 miles between those access points.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055660",
        "note": "USGS Buffalo River at Ponca showed same-day May 31, 2026 discharge and gage-height data during review, including 209 cfs and 4.20 ft at 15:45 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07055660"
      },
      {
        "label": "Low-water floor",
        "value": "130 cfs minimum-only",
        "note": "American Whitewater's exact Ponca-to-Kyle's Landing reach uses the Ponca gauge and labeled 206 cfs as medium runnable during review; its trip evidence describes 130 cfs as close to the minimum for a loaded tandem canoe. The app uses 130 cfs as a conservative floor and does not infer an ideal range.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3962/main"
      },
      {
        "label": "High-water cutoff",
        "value": "NPS unsafe above 1,600 cfs at Ponca",
        "note": "NPS says Buffalo River levels greater than 1,600 cfs at the Ponca gage are unsafe. Use that as a hard caution even though this route ships as minimum-only scoring.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/paddling.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Ponca 36.0225, -93.354722; Kyle's Landing 36.055756, -93.2813",
        "note": "USGS station metadata places the Ponca gauge at the put-in corridor, and NPS Getting Around coordinates identify Kyle's Landing campground/access area.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      },
      {
        "label": "River character",
        "value": "Class II, narrow and fast upper district",
        "note": "American Whitewater rates the reach Class II, and NPS describes the upper district as narrow and fast with higher-challenge whitewater kayaking when water is up.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/paddling.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 07055660 Buffalo River at Ponca",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055660/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07055660 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07055660",
        "provider": "usgs"
      },
      {
        "label": "American Whitewater Ponca to Kyle's Landing",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3962/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS Buffalo River Guidance",
        "url": "https://apps.usgs.gov/lmg/buffaloriver/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-ponca-steel-creek",
    "slug": "buffalo-river-ponca-steel-creek",
    "name": "Buffalo River",
    "reach": "Ponca to Steel Creek",
    "aliases": [
      "Buffalo National River - Ponca to Steel Creek",
      "Buffalo River - Ponca to Steel Creek Access",
      "Upper Buffalo River - Ponca to Steel Creek"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "cold_water",
        "remote"
      ],
      "safetyNotes": [
        "NPS calls this short upper Buffalo section challenging whitewater and says it is not recommended for beginners.",
        "Use the Ponca gauge and same-day visual checks together. The route is rainfall dependent, changes quickly, and can collect fresh sweepers or strainers after storms.",
        "Skip the route when Ponca is below the conservative floor, rising quickly, or above the NPS unsafe level. This is a reviewed whitewater route, not a casual short float."
      ],
      "reviewStatus": "reviewed"
    },
    "summary": "Short upper Buffalo National River whitewater day from Ponca to Steel Creek beneath Roark Bluff. NPS documents the exact 2.5-mile trip and the direct Ponca gauge is live, but this is still rain-dependent swift water with chutes, wood, and quick-rising conditions.",
    "statusText": "Use the Buffalo River at Ponca gauge. Around 130 cfs is the conservative low-water floor for this route; below that, expect scraping, dragging, and missed lines. NPS says levels above 1,600 cfs at Ponca are unsafe.",
    "latitude": 36.0225,
    "longitude": -93.354722,
    "gaugeSource": {
      "id": "usgs-07055660",
      "provider": "usgs",
      "siteId": "07055660",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Ponca, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055660/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 130,
      "thresholdSource": {
        "label": "American Whitewater Ponca-to-Kyle's Landing reach and same-gauge trip evidence",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3962/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says the upper Buffalo usually starts first in spring and remains highly rainfall dependent. Treat this as a recent-rain and cool-season opportunity, not a dependable summer float.",
      "difficulty": "hard",
      "difficultyNotes": "NPS calls this section challenging whitewater and describes small rapids and chutes below Ponca. It is short, but it still belongs behind the whitewater route type because current, wood, and quick rises can change the day fast.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes the exact Ponca-to-Steel-Creek route page, the access mileage chart, and official Steel Creek campground coordinates; direct USGS 07055660 at Ponca exposed same-day discharge and gage-height values during review; and the same Ponca gauge already supports the adjoining upper-Buffalo route family. The app keeps the same conservative minimum-only 130 cfs floor used on the existing Ponca corridor and retains NPS's 1,600 cfs unsafe level as a route caveat rather than a full two-sided scoring band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Ponca to Steel Creek, 2.5 to 2.7 miles",
        "note": "NPS publishes Ponca to Steel Creek as a 2.5-mile paddling trip, and the Buffalo River mileage chart lists 2.7 miles between those access points.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-ponca-to-steel-creek.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055660",
        "note": "Direct USGS Water Services for Buffalo River at Ponca showed same-day values of 50.2 cfs and 3.52 ft at 2026-07-14 19:30 CDT during review.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055660&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "130 cfs minimum-only",
        "note": "American Whitewater's exact Ponca-to-Kyle's Landing reach uses the same Ponca gauge and has prior same-gauge trip evidence near the 130 cfs floor. Paddle Today reuses that conservative minimum-only floor for the shorter Ponca-to-Steel split rather than inventing a new ideal range.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3962/main"
      },
      {
        "label": "High-water cutoff",
        "value": "NPS unsafe above 1,600 cfs at Ponca",
        "note": "NPS says Buffalo River levels greater than 1,600 cfs at the Ponca gauge are unsafe.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/paddling.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Ponca 36.0225, -93.354722; Steel Creek 36.040776, -93.344048",
        "note": "USGS station metadata places the Ponca gauge in the launch corridor, and NPS Camping publishes Steel Creek Campground GPS coordinates for the take-out access area.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      },
      {
        "label": "Route character",
        "value": "Upper Buffalo chutes beneath Roark Bluff",
        "note": "NPS says this short section introduces the Upper Buffalo's challenging whitewater with small rapids and chutes, then follows Roark Bluff to Steel Creek.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-ponca-to-steel-creek.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Ponca to Steel Creek",
        "url": "https://www.nps.gov/thingstodo/paddle-ponca-to-steel-creek.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping / Steel Creek coordinates",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 07055660 Buffalo River at Ponca",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055660/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055660 latest conditions",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055660&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "American Whitewater Ponca to Kyle's Landing",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3962/main",
        "provider": "american_whitewater"
      }
    ]
  },
  {
    "id": "buffalo-river-steel-creek-kyles-landing",
    "slug": "buffalo-river-steel-creek-kyles-landing",
    "name": "Buffalo River",
    "reach": "Steel Creek to Kyle's Landing",
    "aliases": [
      "Buffalo National River - Steel Creek to Kyle's Landing",
      "Buffalo River - Steel Creek to Kyles Landing",
      "Upper Buffalo River - Steel Creek to Kyles"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "cold_water",
        "remote"
      ],
      "safetyNotes": [
        "NPS describes the Steel Creek to Kyle's Landing section as tumbling rapids and long pools through the Ponca Wilderness, and says this upper Buffalo water is not recommended for beginners.",
        "Confirm the Kyle's Landing take-out and road plan before launching. NPS recommends high clearance and four-wheel drive, and access congestion can affect emergency response.",
        "Treat rising water, fresh wood, strainers, cold-water exposure, and the NPS Ponca unsafe level as hard stop signals rather than normal route difficulty."
      ],
      "reviewStatus": "reviewed"
    },
    "summary": "Beloved upper Buffalo National River day from Steel Creek to Kyle's Landing through the Ponca Wilderness. NPS publishes the exact 8-mile trip and both public access points, but this remains rainfall-dependent moving water with rapids, rough-road shuttle, wood, and crowding constraints.",
    "statusText": "Use the Buffalo River at Ponca gauge as the nearest upstream corridor check. Around 130 cfs is the conservative low-water floor for this upper-Buffalo family; below that, expect scraping, dragging, and missed lines. NPS says levels above 1,600 cfs at Ponca are unsafe.",
    "latitude": 36.040776,
    "longitude": -93.344048,
    "gaugeSource": {
      "id": "usgs-07055660",
      "provider": "usgs",
      "siteId": "07055660",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Buffalo River at Ponca, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055660/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 130,
      "thresholdSource": {
        "label": "American Whitewater Ponca-to-Kyle's Landing reach and same-gauge trip evidence",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3962/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says the upper Buffalo is largely rainfall dependent and that the paddling season moves downstream in dry periods. Treat this as a recent-water upper-district trip rather than a dependable summer float.",
      "difficulty": "hard",
      "difficultyNotes": "NPS says this stretch alternates between tumbling rapids and long pools through the Ponca Wilderness, and the take-out road at Kyle's Landing is a major practical constraint. It stays behind the whitewater route type because swift current, wood, and shuttle risk matter even when the lines are friendly.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes the exact Steel-Creek-to-Kyle's-Landing route page, the access mileage chart, and official Steel Creek/Kyle's campground coordinates; the direct Ponca gauge remains the best upstream official corridor check for this upper reach and exposed same-day values during review; and the longer existing Ponca-to-Kyle's route already uses the same conservative 130 cfs floor. Paddle Today therefore keeps this split on a minimum-only model tied to the Ponca gauge and treats NPS's 1,600 cfs unsafe level as a route caveat rather than a full ideal band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Steel Creek to Kyle's Landing, 8 to 8.0 miles",
        "note": "NPS publishes Steel Creek to Kyle's Landing as an 8-mile paddling trip, and the Buffalo River mileage chart lists 8.0 miles between those access points.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-steel-creek-to-kyles-landing.htm"
      },
      {
        "label": "Live corridor gauge",
        "value": "USGS 07055660 upstream at Ponca",
        "note": "Direct USGS Water Services for Buffalo River at Ponca showed same-day values of 50.2 cfs and 3.52 ft at 2026-07-14 19:30 CDT during review. Paddle Today uses that upstream same-river gauge as the nearest official corridor check for Steel Creek.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055660&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "130 cfs minimum-only",
        "note": "The exact AW Ponca-to-Kyle's reach uses the Ponca gauge and has same-gauge low-water evidence near 130 cfs. Paddle Today reuses that conservative upper-corridor floor for the Steel-Creek-to-Kyle's split rather than inventing a separate ideal range.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3962/main"
      },
      {
        "label": "High-water cutoff",
        "value": "NPS unsafe above 1,600 cfs at Ponca",
        "note": "NPS says Buffalo River levels greater than 1,600 cfs at the Ponca gauge are unsafe.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/paddling.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Steel Creek 36.040776, -93.344048; Kyle's Landing 36.055756, -93.2813",
        "note": "NPS Camping publishes official GPS coordinates for both Steel Creek Campground and Kyles Landing Campground.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      },
      {
        "label": "Route character",
        "value": "Upper Buffalo rapids, pools, and Ponca Wilderness landmarks",
        "note": "NPS says this section runs past Big Bluff, Jim's Bluff, Granny Henderson's cabin, Hemmed-In Hollow Falls, and Hell's Half Acre while alternating between rapids and long pools.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-steel-creek-to-kyles-landing.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Steel Creek to Kyle's Landing",
        "url": "https://www.nps.gov/thingstodo/paddle-steel-creek-to-kyles-landing.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping / Steel Creek and Kyles coordinates",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 07055660 Buffalo River at Ponca",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055660/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055660 latest conditions",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055660&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "American Whitewater Ponca to Kyle's Landing",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3962/main",
        "provider": "american_whitewater"
      }
    ]
  },
  {
    "id": "buffalo-river-ponca-erbie",
    "slug": "buffalo-river-ponca-erbie",
    "name": "Buffalo River",
    "reach": "Ponca to Erbie",
    "aliases": [
      "Buffalo National River - Ponca to Erbie",
      "Buffalo River - Ponca to Erbie Campground",
      "Upper Buffalo River - Ponca to Erbie"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Long upper Buffalo National River day from Ponca to Erbie, linking the exact Ponca-to-Steel, Steel-to-Kyles, and Kyles-to-Erbie paddles into one guarded continuation. The direct Ponca gauge remains the best official upper-corridor check for a conservative low-water call.",
    "statusText": "Use the Buffalo River at Ponca gauge. Around 130 cfs is the conservative low-water floor for this upper-Buffalo family; below that, expect scraping, dragging, and missed lines. NPS says levels above 1,600 cfs at Ponca are unsafe.",
    "latitude": 36.0225,
    "longitude": -93.354722,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "fast_rise",
        "strainers",
        "cold_water",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a long upper-district Buffalo commitment that combines the Ponca shoals with the classic Steel Creek to Kyle's rapids and the swift Erbie corridor.",
        "NPS still says upper-district paddling is extremely dependent on rainfall, many access roads are rough or unpaved, and no road follows the river for long stretches.",
        "Use the direct Ponca gauge and current park alerts before launching. Very low water turns the route into a drag-heavy problem, and NPS says flows above 1,600 cfs at Ponca are unsafe."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055660",
      "provider": "usgs",
      "siteId": "07055660",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Ponca, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055660/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 130,
      "thresholdSource": {
        "label": "American Whitewater Ponca-to-Kyle's Landing reach and same-gauge trip evidence",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3962/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says the upper Buffalo is largely rainfall dependent and usually practical in spring and early summer when consistent rainfall feeds the watershed. Treat this as a recent-water upper-district continuation rather than a dependable summer float.",
      "difficulty": "hard",
      "difficultyNotes": "This longer upper-district continuation combines the Ponca shoals, the classic Steel Creek to Kyles rapids and pools, and the swift Erbie corridor into one committed day. It stays behind the whitewater route type because current, wood, rough-road shuttle risk, and quick rises are first-class decisions.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes exact current route pages for Ponca to Steel Creek, Steel Creek to Kyle's Landing, and Kyle's Landing to Erbie; the Buffalo access mileage chart supports the combined corridor at about 16.3 miles; NPS Getting Around supplies Erbie coordinate anchors while USGS station metadata anchors Ponca; and direct USGS 07055660 at Ponca returned same-day values of 51.4 cfs and 3.53 ft at 2026-07-14 22:30 CDT during review. The app therefore keeps this continuation on the established Ponca-family 130 cfs minimum-only model and treats NPS's 1,600 cfs unsafe level as a route caveat rather than a full ideal band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Ponca to Erbie, about 16.2 to 16.3 miles",
        "note": "NPS publishes Ponca to Steel Creek as 2.5 miles, Steel Creek to Kyle's Landing as 8 miles, and Kyle's Landing to Erbie as 5.7 miles, while the Buffalo access mileage chart lists 16.3 river miles from Ponca to Erbie.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-ponca-to-steel-creek.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055660",
        "note": "Direct USGS Water Services for Buffalo River at Ponca returned same-day values of 51.4 cfs and 3.53 ft at 2026-07-14 22:30 CDT during review.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055660&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "130 cfs minimum-only",
        "note": "American Whitewater's exact Ponca-to-Kyle's Landing reach uses the Ponca gauge and has prior same-gauge trip evidence near the 130 cfs floor. Paddle Today reuses that conservative upper-corridor floor for the longer Ponca-to-Erbie continuation rather than inventing a new ideal range.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3962/main"
      },
      {
        "label": "High-water cutoff",
        "value": "NPS unsafe above 1,600 cfs at Ponca",
        "note": "NPS says Buffalo River levels greater than 1,600 cfs at the Ponca gauge are unsafe.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/paddling.htm"
      },
      {
        "label": "Campground-backed take-out",
        "value": "Erbie Campground / river access",
        "note": "NPS Getting Around and Camping support Erbie as a formal campground-backed river access in the upper district.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Ponca 36.0225, -93.354722; Erbie 36.070346, -93.211886",
        "note": "USGS station metadata places the Ponca gauge in the launch corridor, and NPS Getting Around lists Erbie coordinate anchors.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Ponca to Steel Creek",
        "url": "https://www.nps.gov/thingstodo/paddle-ponca-to-steel-creek.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Steel Creek to Kyle's Landing",
        "url": "https://www.nps.gov/thingstodo/paddle-steel-creek-to-kyles-landing.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Kyle's Landing to Erbie",
        "url": "https://www.nps.gov/thingstodo/paddle-kyles-landing-to-erbie.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 07055660 Buffalo River at Ponca",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055660/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055660 latest conditions",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055660&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "American Whitewater Ponca to Kyle's Landing",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3962/main",
        "provider": "american_whitewater"
      }
    ]
  },
  {
    "id": "buffalo-river-pruitt-hasty",
    "slug": "buffalo-river-pruitt-hasty",
    "name": "Buffalo River",
    "reach": "Pruitt to Hasty",
    "aliases": [
      "Buffalo National River - Pruitt to Hasty",
      "Buffalo River - Pruitt Landing to Hasty",
      "Upper Buffalo River - Pruitt to Hasty"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Seven-mile Buffalo National River day from Pruitt to Hasty, often used when the river above Pruitt is too low. NPS documents the exact trip and the direct Pruitt gauge is live, but this remains swift, rain-dependent Ozark water with sharp bends, wood, and remote-service caveats.",
    "statusText": "Use the Buffalo River at Pruitt gauge. Around 100 cfs is the conservative low-water floor; below that, the Buffalo float guide marks Pruitt as very low. NPS says levels above 2,000 cfs at Pruitt are unsafe.",
    "latitude": 36.057666,
    "longitude": -93.135032,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "fast_rise",
        "strainers",
        "cold_water",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "NPS says this section is not recommended for beginners and requires paddlers who can maneuver in swift water with sharp bends and occasional obstacles.",
        "The Little Buffalo River enters mid-route and can noticeably increase speed and consequence before the Hasty finish.",
        "Use the direct Pruitt gauge and current park alerts before launching. Very low water creates scraping and pinballing around obstructions, and NPS says flows above 2,000 cfs at Pruitt are unsafe."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS Buffalo National River Float Guide Pruitt gauge bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says the Buffalo is largely rainfall dependent, with upper-river paddling usually beginning in spring and shifting downstream as dry weather arrives. Pruitt-to-Hasty is the fallback when reaches above Pruitt are too low, but it still needs recent water and a stable or falling gauge.",
      "difficulty": "hard",
      "difficultyNotes": "NPS says this section is not recommended for beginners and requires paddlers who can maneuver in swift water with sharp bends and occasional obstacles. American Whitewater lists the reach as Class I-II, so the route is hidden behind the whitewater route type rather than treated as a casual Explore float.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes the exact 7-mile Pruitt-to-Hasty trip, identifies Hasty as the take-out across from Chimney Rock Bluff, confirms the route is a common lower-water alternative, and links the official Float Guide from the park homepage; USGS 07055680 showed same-day May 31, 2026 discharge and gage-height values during review; and the NPS/ArcGIS Float Guide publishes numeric Pruitt cfs bands. The app uses only the start of Low as a conservative minimum floor and keeps the 2,000 cfs unsafe/flood value as a caveat rather than claiming an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Pruitt to Hasty, 7 miles",
        "note": "NPS describes Pruitt to Hasty as a 7-mile Buffalo National River trip, usually taking 3 to 5 hours, and says it is a popular alternative when conditions upriver are too low for paddling.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-pruitt-to-hasty.htm"
      },
      {
        "label": "Access and mileage",
        "value": "Pruitt to Hasty, 6.8 miles on the NPS mileage chart",
        "note": "NPS lists Pruitt and Hasty as Buffalo River access points and gives 6.8 river miles between them.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055680",
        "note": "USGS Buffalo River at Pruitt showed same-day May 31, 2026 data during review, including 442 cfs and 4.85 ft at 16:30 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07055680"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "The NPS-linked Buffalo National River Float Guide uses Pruitt bands of Very Low below 100 cfs, Low from 100 to 200 cfs, Moderate from 200 to 1,000 cfs, High from 1,000 to 2,000 cfs, and Flood above 2,000 cfs. Paddle Today uses only the start of Low as a conservative floor.",
        "sourceUrl": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af"
      },
      {
        "label": "High-water cutoff",
        "value": "NPS unsafe above 2,000 cfs at Pruitt",
        "note": "NPS says Buffalo River levels greater than 2,000 cfs at the Pruitt / Highway 7 gage are unsafe. The app does not turn that into an ideal scoring range.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/paddling.htm"
      },
      {
        "label": "Route character",
        "value": "Swift water, sharp bends, Little Buffalo inflow",
        "note": "NPS says the Little Buffalo River enters halfway through the trip and the river typically gains velocity from there; NPS also says the section is not recommended for beginners.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-pruitt-to-hasty.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Pruitt 36.057666, -93.135032; Hasty 36.008993, -93.08242",
        "note": "NPS Getting Around lists Pruitt-Launch coordinates. Hasty is identified by NPS route text and access charts, with the coordinate anchored from map-verified public access records pending a better NPS coordinate table.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Pruitt to Hasty",
        "url": "https://www.nps.gov/thingstodo/paddle-pruitt-to-hasty.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 Buffalo River at Pruitt",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07055680 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07055680",
        "provider": "usgs"
      },
      {
        "label": "American Whitewater Pruitt to Hasty",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3964/main",
        "provider": "american_whitewater"
      }
    ]
  },
  {
    "id": "buffalo-river-ponca-pruitt",
    "slug": "buffalo-river-ponca-pruitt",
    "name": "Buffalo River",
    "reach": "Ponca to Pruitt",
    "aliases": [
      "Upper Buffalo - Ponca to Pruitt",
      "Buffalo River - Ponca to Pruitt Landing",
      "Ponca to Pruitt upper-district continuation"
    ],
    "state": "Arkansas",
    "region": "Ozarks",
    "summary": "Long upper Buffalo continuation from Ponca to Pruitt through Steel Creek, Kyle's Landing, Erbie, and Ozark. NPS still publishes the current access ladder and mileage chart, and the direct Pruitt gauge keeps the lower-corridor low-water and unsafe-high warnings on one official source.",
    "statusText": "Use the Buffalo River at Pruitt gauge. The NPS-linked Float Guide still marks Pruitt very low below 100 cfs and the park still says levels above 2,000 cfs at Pruitt / Highway 7 are unsafe, so this route keeps a conservative minimum-only low-water floor and high-water caveat.",
    "latitude": 36.0225,
    "longitude": -93.354722,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "fast_rise",
        "strainers",
        "cold_water",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a long upper-district Buffalo commitment with swift Class I-II current, sharp bends, cold water, and long no-road stretches between public accesses.",
        "NPS still says upper-district paddling is extremely dependent on rainfall, no road follows the river, many access roads are rough or unpaved, and GPS can be unreliable in the park.",
        "Use the direct Pruitt gauge and current park alerts before launching. Very low water can turn the route into a drag-heavy all-day problem, while rising or flood water is not suitable private-boater conditions."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS-linked Buffalo River Float Guide Pruitt bands",
        "url": "https://www.nps.gov/buff/planyourvisit/upper-district-paddling.htm",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
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
      "seasonNotes": "NPS still says upper-district Buffalo paddling is extremely dependent on rainfall and often works best in spring or early summer, but the Pruitt gauge can still show runnable windows after storms outside that core season.",
      "difficulty": "hard",
      "difficultyNotes": "The miles stack up into a very long whitewater-ish moving-water day with repeated riffles, bluff bends, remote rescue exposure, and rough-road shuttle friction. Treat this as an advanced planning route, not a casual scenic float.",
      "confidenceNotes": "Confidence is good for a conservative Arkansas add: NPS still publishes the official upper-district mileage chart with Ponca -> Pruitt at 23.9 miles, the upper-district paddling page still says the corridor is rainfall dependent and should be checked against river gauges, and direct USGS Water Services returned 35.8 cfs and 3.21 ft at Pruitt during this run. The app keeps the established Pruitt minimum-only floor from the NPS-linked Float Guide rather than inferring a broader ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Ponca to Pruitt, 23.9 miles",
        "note": "The current NPS Buffalo River mileage chart still lists Ponca to Pruitt as 23.9 river miles and preserves the intermediate access ladder of Steel Creek, Kyle's Landing, Erbie, and Ozark.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm"
      },
      {
        "label": "Upper-district condition framing",
        "value": "Rainfall dependent upper-district route",
        "note": "The current NPS upper-district paddling page still says paddling conditions in the upper district are extremely dependent on rainfall and tells visitors to check gauges and current conditions before launching.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/upper-district-paddling.htm"
      },
      {
        "label": "Direct gauge reading",
        "value": "USGS 07055680 at 35.8 cfs / 3.21 ft",
        "note": "USGS Water Services returned direct Pruitt values of 35.8 cfs at 2026-07-16 09:00 CDT and 3.21 ft at 2026-07-16 09:15 CDT, which is below the conservative 100 cfs floor and supports explicit too-low / scraping-likely framing in this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold support",
        "value": "Pruitt minimum-only 100 cfs floor; 2,000 cfs unsafe high caveat",
        "note": "The current NPS-linked Buffalo Float Guide still marks Pruitt very low below 100 cfs and the NPS paddling guidance still says levels above 2,000 cfs at Pruitt / Highway 7 are unsafe.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/upper-district-paddling.htm"
      },
      {
        "label": "Public endpoints",
        "value": "Ponca access and Pruitt Landing / Highway 7 access",
        "note": "Current NPS Buffalo access pages and corridor guidance still treat Ponca as an upper-district launch and Pruitt Landing as the signed Highway 7 take-out below the bridge area.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm"
      },
      {
        "label": "Camping support",
        "value": "Steel Creek, Kyle's Landing, Erbie, and Ozark campground corridor",
        "note": "Current NPS campground pages still confirm legal overnight support at the major intermediate campgrounds, which keeps the route on developed public infrastructure instead of implying private-bank camping.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Buffalo upper district paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/upper-district-paddling.htm",
        "provider": "local"
      },
      {
        "label": "NPS Buffalo river accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "local"
      },
      {
        "label": "NPS Buffalo camping",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "local"
      },
      {
        "label": "USGS 07055680 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055680 current discharge and gage height",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-ponca-ozark",
    "slug": "buffalo-river-ponca-ozark",
    "name": "Buffalo River",
    "reach": "Ponca to Ozark",
    "aliases": [
      "Upper Buffalo - Ponca to Ozark",
      "Buffalo River - Ponca to Ozark Campground",
      "Ponca to Ozark upper-district continuation"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Long upper Buffalo continuation from Ponca to Ozark through Steel Creek, Kyle's Landing, and Erbie before the developed Ozark take-out. NPS still publishes the current access ladder and mileage chart, and the direct Pruitt gauge remains the closest official low-water and unsafe-high check for the lower corridor.",
    "statusText": "Use the Buffalo River at Pruitt gauge as the nearest downstream corridor check. The NPS-linked Float Guide still marks Pruitt very low below 100 cfs and the park still says levels above 2,000 cfs at Pruitt / Highway 7 are unsafe, so this route keeps a conservative minimum-only low-water floor and high-water caveat.",
    "latitude": 36.0225,
    "longitude": -93.354722,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "This long Ponca-to-Ozark continuation stacks multiple upper-Buffalo reaches into one committed moving-water day.",
        "Use the Pruitt gauge only as the lower-corridor check; confirm upper-district levels, weather, and access status before committing from Ponca.",
        "Plan for wood, swift bends, cold-water swims, rough shuttles, no reliable cell service, and an early bailout or legal campground plan if pace slips."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS-linked Buffalo River Float Guide Pruitt bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
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
      "seasonNotes": "NPS still says upper-district Buffalo paddling is extremely dependent on rainfall and usually works best in spring or early summer, but the lower upper-district corridor can still open after shorter storm windows later in the year. Treat this as a same-day level-and-trend decision rather than a dependable low-water float.",
      "difficulty": "hard",
      "difficultyNotes": "This route stacks the Ponca shoals, the classic Steel Creek to Kyle's rapids, the Erbie corridor, and the bluff-lined Ozark finish into one long whitewater-ish moving-water day. Treat it as an advanced planning route rather than a casual scenic float.",
      "confidenceNotes": "Confidence is good for a conservative Arkansas add: NPS still publishes the official upper-district mileage chart with Ponca to Ozark at 21.8 miles, the upper-district paddling page still says the corridor is rainfall dependent and should be checked against gauges, and direct USGS Water Services returned 36.9 cfs and 3.21 ft at Pruitt at 2026-07-16 09:30 CDT during this run. The app keeps the established Pruitt minimum-only floor from the NPS-linked Float Guide rather than inferring a broader ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Ponca to Ozark, 21.8 miles",
        "note": "The current NPS Buffalo River mileage chart still lists Ponca to Ozark as 21.8 river miles and preserves the intermediate access ladder of Steel Creek, Kyle's Landing, and Erbie.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm"
      },
      {
        "label": "Upper-district condition framing",
        "value": "Rainfall dependent upper-district route",
        "note": "The current NPS upper-district paddling page still says paddling conditions in the upper district are extremely dependent on rainfall and tells visitors to check gauges and current conditions before launching.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/upper-district-paddling.htm"
      },
      {
        "label": "Direct gauge reading",
        "value": "USGS 07055680 at 36.9 cfs / 3.21 ft",
        "note": "USGS Water Services returned direct Pruitt values of 36.9 cfs and 3.21 ft at 2026-07-16 09:30 CDT, which is below the conservative 100 cfs floor and supports explicit too-low / scraping-likely framing in this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold support",
        "value": "Pruitt minimum-only 100 cfs floor; 2,000 cfs unsafe high caveat",
        "note": "The current NPS-linked Buffalo Float Guide still marks Pruitt very low below 100 cfs and the NPS paddling guidance still says levels above 2,000 cfs at Pruitt / Highway 7 are unsafe.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/upper-district-paddling.htm"
      },
      {
        "label": "Public endpoints",
        "value": "Ponca access to Ozark Campground / river access",
        "note": "Current NPS Buffalo access pages and campground material still treat Ponca as an upper-district launch and Ozark as a formal public campground-backed take-out.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      },
      {
        "label": "Camping support",
        "value": "Steel Creek, Kyle's Landing, Erbie, and Ozark campground corridor",
        "note": "Current NPS campground pages still confirm legal overnight support at the major intermediate campgrounds, which keeps the route on developed public infrastructure instead of implying private-bank camping.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Ponca to Steel Creek",
        "url": "https://www.nps.gov/thingstodo/paddle-ponca-to-steel-creek.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Steel Creek to Kyle's Landing",
        "url": "https://www.nps.gov/thingstodo/paddle-steel-creek-to-kyles-landing.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Kyle's Landing to Erbie",
        "url": "https://www.nps.gov/thingstodo/paddle-kyles-landing-to-erbie.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Erbie to Ozark",
        "url": "https://www.nps.gov/thingstodo/paddle-erbie-to-ozark.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo upper district paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/upper-district-paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo river accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055680 current discharge and gage height",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-kyles-landing-pruitt",
    "slug": "buffalo-river-kyles-landing-pruitt",
    "name": "Buffalo River",
    "reach": "Kyle's Landing to Pruitt",
    "aliases": [
      "Buffalo National River - Kyle's Landing to Pruitt",
      "Buffalo River - Kyles Landing to Pruitt",
      "Upper Buffalo River - Kyles to Pruitt"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Long upper Buffalo National River day from Kyle's Landing to Pruitt, linking the Erbie and Ozark access corridor before the Highway 7 take-out. NPS supports the access chain and mileage, AW identifies the exact I-II reach, and the Pruitt gauge gives a guarded low-water check.",
    "statusText": "Use the Buffalo River at Pruitt gauge as a downstream corridor check. Around 100 cfs is the conservative low-water floor; below that, the Buffalo float guide marks Pruitt as very low. NPS says levels above 2,000 cfs at Pruitt are unsafe.",
    "latitude": 36.055756,
    "longitude": -93.2813,
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "American Whitewater lists Kyle's to Pruitt as Class I-II, and the route stacks the Erbie and Ozark upper-district access corridors into a long moving-water day.",
        "Use the Pruitt gauge as the route-corridor check, but make same-day visual decisions at Kyle's Landing, Erbie, Ozark, and Pruitt because NPS warns the Buffalo can change quickly and wood may not be visible from the gauge.",
        "Kyle's Landing road access, no-road river miles, unreliable GPS, limited cell service, and cold swims make low water, rising water, and late finishes more consequential than the moderate rapid class suggests."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS Buffalo National River Float Guide Pruitt gauge bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says upper Buffalo paddling is extremely rainfall dependent and usually practical in spring and early summer when consistent rainfall feeds the watershed. This route should be treated as a recent-water, stable-or-falling-gauge trip, not a dependable summer float.",
      "difficulty": "hard",
      "difficultyNotes": "American Whitewater lists Kyle's to Pruitt as Class I-II. The route is longer than the common Ponca-to-Kyle's and Pruitt-to-Hasty day trips, includes remote gravel-road access at Kyle's, Erbie, and Ozark, and should stay behind the whitewater route type because swift water, wood, rough shuttles, and quick rises are first-class decisions.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS identifies Kyle's Landing, Erbie, Ozark, and Pruitt in the official Buffalo River access/mileage chart; NPS Getting Around supplies Kyle's and Pruitt coordinate anchors; AW documents the exact 13.2-mile I-II Kyle's-to-Pruitt reach with Erbie and Ozark intermediate access points; and USGS 07055680 exposed recent official Pruitt discharge and gage-height values during review. The app uses the NPS-linked Pruitt Float Guide's 100 cfs low-water floor as minimum-only scoring and keeps the NPS 2,000 cfs unsafe level as a caveat rather than an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Kyle's Landing to Pruitt, 13.2 miles",
        "note": "NPS lists Kyle's Landing and Pruitt as Buffalo River access points and gives 13.2 river miles between them, with Erbie and Ozark as intermediate access points.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm"
      },
      {
        "label": "Exact reach context",
        "value": "AW Kyle's to Pruitt, I-II",
        "note": "American Whitewater identifies the exact Kyle's-to-Pruitt reach as 13.2 to 13.4 miles, Class I-II, with Erbie Campground and Ozark Campground as intermediate access points.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3963/main"
      },
      {
        "label": "Direct corridor gauge",
        "value": "USGS 07055680",
        "note": "USGS Buffalo River at Pruitt is the take-out corridor gauge. Its legacy current page exposed recent official data during review, including 442 cfs and 4.85 ft at 2026-05-31 16:30 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07055680"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "The NPS-linked Buffalo National River Float Guide uses Pruitt bands of Very Low below 100 cfs, Low from 100 to 200 cfs, Moderate from 200 to 1,000 cfs, High from 1,000 to 2,000 cfs, and Flood above 2,000 cfs. Paddle Today uses only the start of Low as a conservative floor.",
        "sourceUrl": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af"
      },
      {
        "label": "High-water cutoff",
        "value": "NPS unsafe above 2,000 cfs at Pruitt",
        "note": "NPS says Buffalo River levels greater than 2,000 cfs at the Pruitt / Highway 7 gage are unsafe. The app does not turn that into an ideal scoring range.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/paddling.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Kyle's Landing 36.055756, -93.2813; Pruitt 36.057666, -93.135032",
        "note": "NPS Getting Around lists Kyle's Landing and Pruitt launch coordinate anchors. Use the signed landings and current park access conditions rather than GPS alone.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "American Whitewater Kyle's to Pruitt",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3963/main",
        "provider": "american_whitewater"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 Buffalo River at Pruitt",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07055680 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07055680",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-kyles-landing-erbie",
    "slug": "buffalo-river-kyles-landing-erbie",
    "name": "Buffalo River",
    "reach": "Kyle's Landing to Erbie",
    "aliases": [
      "Buffalo National River - Kyle's Landing to Erbie",
      "Buffalo River - Kyles Landing to Erbie",
      "Upper Buffalo River - Kyles to Erbie"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Short upper Buffalo National River whitewater day from Kyle's Landing to Erbie through one of the park's rough-road upper-district access corridors. NPS documents the exact trip, access pair, and mileage, and the Pruitt gauge remains the nearest official downstream check for a guarded low-water floor.",
    "statusText": "Use the Buffalo River at Pruitt gauge as a downstream corridor check. Around 100 cfs is the conservative low-water floor; below that, the Buffalo float guide marks Pruitt as very low. NPS says levels above 2,000 cfs at Pruitt are unsafe.",
    "latitude": 36.055756,
    "longitude": -93.2813,
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "NPS says Kyle's Landing to Erbie requires maneuvering in swift water with sharp bends and occasional obstacles, and it is not recommended for beginners.",
        "Use the downstream Pruitt gauge as a corridor check, but make a same-day visual call at Kyle's Landing and Erbie because NPS warns river conditions and tree hazards can change quickly.",
        "Kyle's Landing Road, upper-district remoteness, unreliable GPS, limited cell service, and cold swims make low water, rising water, and late finishes more consequential than the short mileage suggests."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS Buffalo National River Float Guide Pruitt gauge bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says upper Buffalo paddling is extremely rainfall dependent and usually practical in spring and early summer when consistent rainfall feeds the watershed. This route should be treated as a recent-water, stable-or-falling-gauge trip, not a dependable summer float.",
      "difficulty": "hard",
      "difficultyNotes": "NPS says this section is not recommended for beginners and warns about swift current, sharp bends, and occasional obstacles. Kyle's Landing Road is also rough enough that NPS recommends high clearance and four-wheel drive.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes the exact Kyle's-Landing-to-Erbie trip page, NPS access and mileage tables support the route shape, NPS Getting Around supplies Kyle's Landing and Erbie coordinate anchors, and USGS 07055680 exposed same-day official Pruitt discharge and gage-height values during review. The app uses the NPS-linked Pruitt Float Guide's 100 cfs low-water floor as minimum-only scoring and keeps the NPS 2,000 cfs unsafe level as a caveat rather than an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Kyle's Landing to Erbie, 5.6 to 5.7 miles",
        "note": "NPS publishes the exact Kyle's-Landing-to-Erbie paddle as a 5.7-mile, 3-4 hour trip, and the NPS access mileage table lists 5.6 river miles between the two access points.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-kyles-landing-to-erbie.htm"
      },
      {
        "label": "Direct corridor gauge",
        "value": "USGS 07055680",
        "note": "USGS Buffalo River at Pruitt is the nearest downstream official Buffalo gauge for this upper corridor. Its legacy current page exposed same-day official data during review, including 148 cfs and 3.82 ft at 2026-07-02 15:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07055680"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "The NPS-linked Buffalo National River Float Guide uses Pruitt bands of Very Low below 100 cfs, Low from 100 to 200 cfs, Moderate from 200 to 1,000 cfs, High from 1,000 to 2,000 cfs, and Flood above 2,000 cfs. Paddle Today uses only the start of Low as a conservative floor.",
        "sourceUrl": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af"
      },
      {
        "label": "High-water cutoff",
        "value": "NPS unsafe above 2,000 cfs at Pruitt",
        "note": "NPS says Buffalo River levels greater than 2,000 cfs at the Pruitt / Highway 7 gage are unsafe. The app does not turn that into an ideal scoring range.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/paddling.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Kyle's Landing 36.055756, -93.2813; Erbie 36.070346, -93.211886",
        "note": "NPS Getting Around lists Kyle's Landing and Erbie coordinate anchors. Use the signed landings and current park access conditions rather than GPS alone.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Kyles Landing to Erbie",
        "url": "https://www.nps.gov/thingstodo/paddle-kyles-landing-to-erbie.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 Buffalo River at Pruitt",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07055680 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07055680",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-erbie-ozark",
    "slug": "buffalo-river-erbie-ozark",
    "name": "Buffalo River",
    "reach": "Erbie to Ozark",
    "aliases": [
      "Buffalo National River - Erbie to Ozark",
      "Buffalo River - Erbie to Ozark Campground",
      "Upper Buffalo River - Erbie to Ozark"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Compact upper Buffalo National River reach from Erbie to Ozark with bluff-lined pools, light whitewater, and official NPS route, mileage, and campground support at both ends. The Pruitt gauge remains the nearest official downstream check for a guarded low-water floor.",
    "statusText": "Use the Buffalo River at Pruitt gauge as a downstream corridor check. Around 100 cfs is the conservative low-water floor; below that, the Buffalo float guide marks Pruitt as very low. NPS says levels above 2,000 cfs at Pruitt are unsafe.",
    "latitude": 36.070346,
    "longitude": -93.211886,
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "NPS says this upper Buffalo section requires maneuvering in swift water with sharp bends and occasional obstacles, and it is not recommended for beginners.",
        "Use the Pruitt gauge as a corridor check, but make same-day visual decisions at Erbie and Ozark because NPS warns trees and sweepers can change quickly.",
        "Upper-district roads, unreliable GPS, limited cell service, and cold swims make low water, rising water, and late finishes more consequential than the short mileage suggests."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS Buffalo National River Float Guide Pruitt gauge bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says Buffalo paddling windows shift quickly with rainfall and that the upper district is narrow, fast, and rain dependent. Treat this as a stable-or-falling recent-water route rather than a dependable low-water float.",
      "difficulty": "moderate",
      "difficultyNotes": "NPS frames the reach as a short upper-district paddle with riffles, bluffs, and shallow pools. It is still an upper Buffalo decision because wood, fast rises, and cold-water swims remain first-class concerns even when the whitewater is modest.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes the exact Erbie-to-Ozark trip page, NPS access and mileage tables support the route shape, NPS Getting Around supplies Erbie and Ozark coordinate anchors, and USGS 07055680 exposed same-day official Pruitt discharge and gage-height values during review. The app uses the NPS-linked Pruitt Float Guide 100 cfs low-water floor as minimum-only scoring and keeps the NPS 2,000 cfs unsafe level as a caveat rather than an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Erbie to Ozark, 5.4 to 5.5 miles",
        "note": "NPS publishes the exact Erbie-to-Ozark paddle as a 5.4-mile, 3-4 hour trip, and the NPS access mileage table lists 5.5 river miles between the two access points.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-erbie-to-ozark.htm"
      },
      {
        "label": "Direct corridor gauge",
        "value": "USGS 07055680",
        "note": "USGS Buffalo River at Pruitt is the nearest downstream official Buffalo gauge for this upper corridor. Its legacy current page exposed same-day official data during review, including 148 cfs and 3.82 ft at 2026-07-02 15:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07055680"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "The NPS-linked Buffalo National River Float Guide uses Pruitt bands of Very Low below 100 cfs, Low from 100 to 200 cfs, Moderate from 200 to 1,000 cfs, High from 1,000 to 2,000 cfs, and Flood above 2,000 cfs. Paddle Today uses only the start of Low as a conservative floor.",
        "sourceUrl": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af"
      },
      {
        "label": "Campground-backed endpoints",
        "value": "Erbie Campground to Ozark Campground",
        "note": "NPS route and campground pages describe both Erbie and Ozark as formal park campgrounds with river access support for float planning.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Erbie 36.070346, -93.211886; Ozark 36.062132, -93.159724",
        "note": "NPS Getting Around lists Erbie and Ozark coordinate anchors. Use the signed landings and current park access conditions rather than GPS alone.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Erbie to Ozark",
        "url": "https://www.nps.gov/thingstodo/paddle-erbie-to-ozark.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 Buffalo River at Pruitt",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07055680 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07055680",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-ozark-pruitt",
    "slug": "buffalo-river-ozark-pruitt",
    "name": "Buffalo River",
    "reach": "Ozark to Pruitt",
    "aliases": [
      "Buffalo National River - Ozark to Pruitt",
      "Buffalo River - Ozark Campground to Pruitt",
      "Upper Buffalo River - Ozark to Pruitt"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Short upper Buffalo National River run from Ozark to Pruitt with riffles, pools, and the natural tunnel corridor described by NPS. The Pruitt gauge is the direct same-corridor official check and supports conservative minimum-only scoring.",
    "statusText": "Use the Buffalo River at Pruitt gauge as the direct same-corridor check. Around 100 cfs is the conservative low-water floor; below that, the Buffalo float guide marks Pruitt as very low. NPS says levels above 2,000 cfs at Pruitt are unsafe.",
    "latitude": 36.062132,
    "longitude": -93.159724,
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "NPS describes Ozark to Pruitt as moving water with sharp bends and occasional obstacles, with bouncy riffles and tree branches reaching across the corridor.",
        "Continue past the Highway 7 bridge to the signed Pruitt Landing take-out, and do not treat the bridge pool as the route endpoint.",
        "Check the Pruitt gauge, weather, and visible wood before launch; the upper Buffalo is rainfall-dependent and NPS marks Pruitt levels above 2,000 cfs as unsafe."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS Buffalo National River Float Guide Pruitt gauge bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says Buffalo paddling windows shift with rainfall and that upper-district flows can change rapidly. Treat this as a stable-or-falling recent-water route rather than a dependable low-water float.",
      "difficulty": "moderate",
      "difficultyNotes": "NPS describes this as a short upper-district route with bouncy riffles and long pools. It still belongs under the whitewater route type because swift current, wood, and rain-driven changes matter more than on a casual flatwater trail.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes the exact Ozark-to-Pruitt trip page, NPS access and mileage tables support the route shape, NPS Getting Around supplies Ozark and Pruitt coordinate anchors, and USGS 07055680 exposed same-day official Pruitt discharge and gage-height values during review. The app uses the NPS-linked Pruitt Float Guide 100 cfs low-water floor as minimum-only scoring and keeps the NPS 2,000 cfs unsafe level as a caveat rather than an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Ozark to Pruitt, 2.1 miles",
        "note": "NPS publishes the exact Ozark-to-Pruitt paddle as a 2.1-mile, 1-2 hour trip, and the NPS access mileage table lists 2.1 river miles between the two access points.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-ozark-to-pruitt.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055680",
        "note": "USGS Buffalo River at Pruitt is the direct same-corridor gauge for this route. Its legacy current page exposed same-day official data during review, including 148 cfs and 3.82 ft at 2026-07-02 15:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07055680"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "The NPS-linked Buffalo National River Float Guide uses Pruitt bands of Very Low below 100 cfs, Low from 100 to 200 cfs, Moderate from 200 to 1,000 cfs, High from 1,000 to 2,000 cfs, and Flood above 2,000 cfs. Paddle Today uses only the start of Low as a conservative floor.",
        "sourceUrl": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af"
      },
      {
        "label": "High-water cutoff",
        "value": "NPS unsafe above 2,000 cfs at Pruitt",
        "note": "NPS says Buffalo River levels greater than 2,000 cfs at the Pruitt / Highway 7 gage are unsafe. The app does not turn that into an ideal scoring range.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/paddling.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Ozark 36.062132, -93.159724; Pruitt 36.057666, -93.135032",
        "note": "NPS Getting Around lists Ozark and Pruitt launch coordinate anchors. Use the signed landings and current park access conditions rather than GPS alone.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Ozark to Pruitt",
        "url": "https://www.nps.gov/thingstodo/paddle-ozark-to-pruitt.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 Buffalo River at Pruitt",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07055680 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07055680",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kings-river-rockhouse-trigger-gap",
    "slug": "kings-river-rockhouse-trigger-gap",
    "name": "Kings River",
    "reach": "Rockhouse Access to Trigger Gap",
    "aliases": [
      "Kings River - Rockhouse to Trigger Gap",
      "Kings River - Rockhouse Access to Arkansas Highway 221",
      "Kings River - Rockhouse to Kings River Outfitters"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "summary": "Clear Ozark day float from AGFC-owned Rockhouse Access through the Kings River Preserve corridor to the private fee access at Trigger Gap. Use this as a conservative stage check, not a full ideal-range recommendation.",
    "statusText": "Use the Kings River near Berryville gauge. Around 3.2 ft is the local minimum float stage for Rockhouse to Trigger Gap; below that, expect shallow riffles and dragging. Rising or storm-fed water can change this private-bank reach quickly.",
    "latitude": 36.269833,
    "longitude": -93.664,
    "gaugeSource": {
      "id": "usgs-07050500",
      "provider": "usgs",
      "siteId": "07050500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Kings River near Berryville, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07050500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "access_uncertain",
        "private_banks"
      ],
      "safetyNotes": [
        "Use the Berryville gauge only as a conservative low-water floor; 3.2 ft is local route-guide evidence, not an official AGFC ideal range or high-water cutoff.",
        "Confirm Trigger Gap fee-access terms before staging a vehicle, and stay within arranged access corridors because much of the Kings River corridor borders private land.",
        "Expect shallow riffles near the floor, a low-water bridge portage near the end, fresh wood after storms, and faster Ozark rises that can change this otherwise approachable day float."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 3.2,
      "thresholdSource": {
        "label": "Kings River Arkansas Rockhouse-to-Trigger-Gap route guidance",
        "url": "https://kingsriverarkansas.com/access-points/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7
      ],
      "seasonNotes": "AGFC describes the lower Kings as a year-round floating corridor, but the route-level guide recommends Rockhouse to Trigger Gap mainly from early spring to June for good water. Summer trips need a same-day gauge and visual low-water check.",
      "difficulty": "moderate",
      "difficultyNotes": "This is not advanced whitewater, but it is a seven-plus-mile Ozark stream day with shallow gravel riffles, occasional rapids, a low-water bridge portage near the end, private banks, and a private fee take-out.",
      "confidenceNotes": "Confidence is good for a conservative minimum-only Arkansas add: AGFC identifies Rockhouse to Trigger Gap / Arkansas Highway 221 as a popular year-round 7.7-mile float, The Nature Conservancy says AGFC owns Rockhouse Access just upstream of the Kings River Preserve, USGS 07050500 showed same-day May 31, 2026 discharge and gage-height values during review, and Kings River Arkansas publishes exact Rockhouse-to-Trigger-Gap route guidance with a 3.2 ft minimum on the USGS gauge plus public/private access notes. Confidence is intentionally limited on thresholds because the numeric floor is local route-guide evidence rather than an official AGFC paddling band, so the app does not infer an ideal range or high cutoff."
    },
    "evidenceNotes": [
      {
        "label": "Official route context",
        "value": "Rockhouse to Trigger Gap, 7.7 miles",
        "note": "AGFC identifies Rockhouse to Trigger Gap / Arkansas Highway 221 as a popular year-round 7.7-mile Kings River float and warns that much of the river flows through private property.",
        "sourceUrl": "https://www.agfc.com/wp-content/uploads/2023/05/kingsriveroverlook.pdf"
      },
      {
        "label": "Rockhouse access",
        "value": "AGFC-owned public access",
        "note": "The Nature Conservancy says the Arkansas Game and Fish Commission owns Rockhouse Access, the public access closest to the Kings River Preserve.",
        "sourceUrl": "https://www.nature.org/en-us/get-involved/how-to-help/places-we-protect/kings-river/"
      },
      {
        "label": "Private take-out",
        "value": "Trigger Gap / Kings River Outfitters fee access",
        "note": "Kings River Arkansas describes the Trigger Gap take-out as private access where paddlers need to pay a small fee and make arrangements with Kings River Outfitters.",
        "sourceUrl": "https://kingsriverarkansas.com/access-points/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07050500",
        "note": "USGS Kings River near Berryville showed same-day May 31, 2026 data during review, including 1,720 cfs and 6.23 ft at 15:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07050500"
      },
      {
        "label": "Low-water floor",
        "value": "3.2 ft minimum-only",
        "note": "Kings River Arkansas lists Rockhouse to Trigger Gap as a 7.5-mile route taking about four hours at a minimum float level of 3.2 ft per the USGS gauge. The app uses only that low-water floor.",
        "sourceUrl": "https://kingsriverarkansas.com/access-points/"
      },
      {
        "label": "Coordinate anchors",
        "value": "Rockhouse 36.269833, -93.664; Trigger Gap 36.314833, -93.6635",
        "note": "Kings River Arkansas publishes degree-minute coordinates for the Rockhouse-to-Trigger-Gap route and the downstream Trigger-Gap-to-Hwy-62 route. Trigger Gap Outfitters corroborates the Trigger Gap access via CR 509 off Highway 221.",
        "sourceUrl": "https://kingsriverarkansas.com/access-points/"
      },
      {
        "label": "River character",
        "value": "Clear pools, gravel riffles, occasional rapids",
        "note": "Arkansas Tourism describes the Kings as clear, cool water with deep pools, overhanging trees, occasional rapids, large bluffs, and gravel bars in the lower stretch.",
        "sourceUrl": "https://www.arkansas.com/experiences/discover/attraction-listings/kings-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Kings River Overlook",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/kingsriveroverlook.pdf",
        "provider": "local"
      },
      {
        "label": "The Nature Conservancy Kings River Preserve",
        "url": "https://www.nature.org/en-us/get-involved/how-to-help/places-we-protect/kings-river/",
        "provider": "local"
      },
      {
        "label": "Kings River Arkansas access points",
        "url": "https://kingsriverarkansas.com/access-points/",
        "provider": "local"
      },
      {
        "label": "Trigger Gap Outfitters contact and directions",
        "url": "https://triggergapoutfitters.com/contact",
        "provider": "local"
      },
      {
        "label": "USGS 07050500 Kings River near Berryville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07050500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07050500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07050500",
        "provider": "usgs"
      },
      {
        "label": "Arkansas Tourism Kings River",
        "url": "https://www.arkansas.com/experiences/discover/attraction-listings/kings-river",
        "provider": "local"
      }
    ]
  },
  {
    "id": "buffalo-river-kyles-landing-ozark",
    "slug": "buffalo-river-kyles-landing-ozark",
    "name": "Buffalo River",
    "reach": "Kyle's Landing to Ozark",
    "aliases": [
      "Buffalo National River - Kyle's Landing to Ozark",
      "Buffalo River - Kyles Landing to Ozark Campground",
      "Upper Buffalo River - Kyles to Ozark"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Long upper Buffalo National River day from Kyle's Landing to Ozark, linking the exact NPS Kyles-to-Erbie and Erbie-to-Ozark paddles into one bluff-lined corridor. The Pruitt gauge remains the nearest official downstream check for a guarded low-water floor.",
    "statusText": "Use the Buffalo River at Pruitt gauge as a downstream corridor check. Around 100 cfs is the conservative low-water floor; below that, the Buffalo float guide marks Pruitt as very low. NPS says levels above 2,000 cfs at Pruitt are unsafe.",
    "latitude": 36.055756,
    "longitude": -93.2813,
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "This continuation combines the NPS Kyle's-to-Erbie and Erbie-to-Ozark paddles, including the not-for-beginners swiftwater posture on the upper half and a longer rough-road shuttle.",
        "Use the Pruitt gauge as the corridor check, but make same-day visual decisions at Kyle's Landing, Erbie, and Ozark because NPS warns river conditions and tree hazards can change quickly.",
        "Kyle's Landing road access, upper-district remoteness, unreliable GPS, limited cell service, and cold swims make low water, rising water, and late finishes more consequential than the mileage alone suggests."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS Buffalo National River Float Guide Pruitt gauge bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says upper Buffalo paddling is rainfall dependent and usually best in spring and early summer when recent water feeds the corridor. Treat this as a stable-or-falling-gauge trip rather than a dependable summer float.",
      "difficulty": "hard",
      "difficultyNotes": "This longer upper-district continuation inherits the not-for-beginners Kyles-to-Erbie section and adds another campground-to-campground half day below Erbie. Swift current, rough-road logistics, wood, and cold-water swims keep it behind the whitewater route type.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes exact current route pages for Kyle's Landing to Erbie and Erbie to Ozark, the Buffalo access mileage chart supports the combined corridor, NPS Getting Around supplies coordinate anchors for Kyle's, Erbie, and Ozark, and direct USGS 07055680 at Pruitt returned same-day values during review. The app uses the NPS-linked Pruitt Float Guide's 100 cfs low-water floor as minimum-only scoring and keeps the NPS 2,000 cfs unsafe level as a caveat rather than an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Kyle's Landing to Ozark, 11.1 miles",
        "note": "NPS publishes Kyle's Landing to Erbie as a 5.7-mile trip and Erbie to Ozark as a 5.4-mile trip, while the NPS access mileage chart lists 5.6 and 5.5 river miles between those access points.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-kyles-landing-to-erbie.htm"
      },
      {
        "label": "Direct corridor gauge",
        "value": "USGS 07055680",
        "note": "Direct USGS Water Services for Buffalo River at Pruitt showed same-day values of 41.7 cfs and 3.25 ft at 2026-07-14 20:30 CDT during review. Paddle Today uses that downstream same-river gauge as the nearest official corridor check for this upper reach.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "The NPS-linked Buffalo National River Float Guide uses Pruitt bands of Very Low below 100 cfs, Low from 100 to 200 cfs, Moderate from 200 to 1,000 cfs, High from 1,000 to 2,000 cfs, and Flood above 2,000 cfs. Paddle Today uses only the start of Low as a conservative floor.",
        "sourceUrl": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af"
      },
      {
        "label": "Campground-backed endpoints",
        "value": "Kyle's Landing Campground to Ozark Campground",
        "note": "NPS campground and route pages describe both Kyle's Landing and Ozark as formal park campgrounds with river access support for float planning.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Kyle's Landing 36.055756, -93.2813; Ozark 36.062132, -93.159724",
        "note": "NPS Getting Around lists Kyle's Landing and Ozark coordinate anchors. Use the signed landings and current park access conditions rather than GPS alone.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Kyles Landing to Erbie",
        "url": "https://www.nps.gov/thingstodo/paddle-kyles-landing-to-erbie.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Erbie to Ozark",
        "url": "https://www.nps.gov/thingstodo/paddle-erbie-to-ozark.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 Buffalo River at Pruitt",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055680 latest conditions",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-steel-creek-ozark",
    "slug": "buffalo-river-steel-creek-ozark",
    "name": "Buffalo River",
    "reach": "Steel Creek to Ozark",
    "aliases": [
      "Buffalo National River - Steel Creek to Ozark",
      "Buffalo River - Steel Creek Campground to Ozark Campground",
      "Upper Buffalo River - Steel Creek to Ozark"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "Steel Creek to Ozark links the Steel-to-Kyle's, Kyles-to-Erbie, and Erbie-to-Ozark upper Buffalo trips into one long day; do not treat the distance as a casual float.",
        "Use the documented Pruitt gauge check with current park conditions, and stand down for very low, rising, or above-NPS-unsafe water.",
        "Expect swift current, shoals or rapids, fresh wood, rough-road shuttle delays, limited cell service, and cold-water consequences across the upper-district corridor."
      ],
      "reviewStatus": "reviewed"
    },
    "summary": "Long upper Buffalo National River day from Steel Creek to Ozark, linking the exact Steel-Creek-to-Kyle's, Kyle's-to-Erbie, and Erbie-to-Ozark paddles into one guarded continuation. The Pruitt gauge remains the nearest official downstream check for a conservative low-water call.",
    "statusText": "Use the Buffalo River at Pruitt gauge as a downstream corridor check. Around 100 cfs is the conservative low-water floor; below that, the Buffalo float guide marks Pruitt as very low. NPS says levels above 2,000 cfs at Pruitt are unsafe.",
    "latitude": 36.040776,
    "longitude": -93.344048,
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS Buffalo National River Float Guide Pruitt gauge bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says upper Buffalo paddling is rainfall dependent and usually best in spring and early summer when recent water feeds the corridor. Treat this as a stable-or-falling-gauge trip rather than a dependable summer float.",
      "difficulty": "hard",
      "difficultyNotes": "This longer upper-district continuation stacks the classic Steel Creek to Kyle's rapids, the rough-road Erbie corridor, and the Ozark campground finish into one committed day. Swift current, wood, rough shuttles, and cold-water consequences keep it behind the whitewater route type.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes exact current route pages for Steel Creek to Kyle's Landing, Kyle's Landing to Erbie, and Erbie to Ozark; the Buffalo access mileage chart supports the combined corridor at 19.1 miles; NPS Getting Around supplies Steel Creek, Erbie, and Ozark coordinate anchors; and direct USGS 07055680 at Pruitt returned same-day values of 43.0 cfs and 3.26 ft at 2026-07-14 22:30 CDT during review. The app uses the NPS-linked Pruitt Float Guide's 100 cfs low-water floor as minimum-only scoring and keeps the NPS 2,000 cfs unsafe level as a caveat rather than an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Steel Creek to Ozark, about 19.1 miles",
        "note": "NPS publishes Steel Creek to Kyle's Landing as 8 miles, Kyle's Landing to Erbie as 5.7 miles, and Erbie to Ozark as 5.4 miles, while the Buffalo access mileage chart lists 19.1 river miles from Steel Creek to Ozark.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-steel-creek-to-kyles-landing.htm"
      },
      {
        "label": "Direct corridor gauge",
        "value": "USGS 07055680",
        "note": "Direct USGS Water Services for Buffalo River at Pruitt returned same-day values of 43.0 cfs and 3.26 ft at 2026-07-14 22:30 CDT during review. Paddle Today uses that downstream same-river gauge as the nearest official corridor check for this longer upper reach.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "The NPS-linked Buffalo National River Float Guide uses Pruitt bands of Very Low below 100 cfs, Low from 100 to 200 cfs, Moderate from 200 to 1,000 cfs, High from 1,000 to 2,000 cfs, and Flood above 2,000 cfs. Paddle Today uses only the start of Low as a conservative floor.",
        "sourceUrl": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af"
      },
      {
        "label": "Campground-backed endpoints",
        "value": "Steel Creek Campground to Ozark Campground",
        "note": "NPS campground and access pages describe both Steel Creek and Ozark as formal park campgrounds with river access support for float planning.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Steel Creek 36.040776, -93.344048; Ozark 36.062132, -93.159724",
        "note": "NPS Getting Around and Camping publish official coordinate anchors for both Steel Creek and Ozark.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Steel Creek to Kyle's Landing",
        "url": "https://www.nps.gov/thingstodo/paddle-steel-creek-to-kyles-landing.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Kyle's Landing to Erbie",
        "url": "https://www.nps.gov/thingstodo/paddle-kyles-landing-to-erbie.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Erbie to Ozark",
        "url": "https://www.nps.gov/thingstodo/paddle-erbie-to-ozark.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 Buffalo River at Pruitt",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055680 latest conditions",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-erbie-pruitt",
    "slug": "buffalo-river-erbie-pruitt",
    "name": "Buffalo River",
    "reach": "Erbie to Pruitt",
    "aliases": [
      "Buffalo National River - Erbie to Pruitt",
      "Buffalo River - Erbie to Highway 7 Pruitt",
      "Upper Buffalo River - Erbie to Pruitt"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Upper Buffalo continuation from Erbie to Pruitt, combining the exact NPS Erbie-to-Ozark and Ozark-to-Pruitt paddles into one compact campground-to-highway day. The Pruitt gauge is the direct same-corridor official check for the finish.",
    "statusText": "Use the Buffalo River at Pruitt gauge as the direct same-corridor check. Around 100 cfs is the conservative low-water floor; below that, the Buffalo float guide marks Pruitt as very low. NPS says levels above 2,000 cfs at Pruitt are unsafe.",
    "latitude": 36.070346,
    "longitude": -93.211886,
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "This route combines the Erbie-to-Ozark and Ozark-to-Pruitt upper Buffalo trips, so treat the whole day as swift, rain-sensitive moving water rather than a casual float.",
        "Scout current wood, sweepers, and landing conditions at Erbie, Ozark, and Pruitt because NPS warns the river can change too quickly for gauge data alone.",
        "Upper-district roads, unreliable GPS, limited cell service, and the mandatory finish at Pruitt Landing make daylight and shuttle margins part of the safety plan."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS Buffalo National River Float Guide Pruitt gauge bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says Buffalo paddling windows shift quickly with rainfall and that upper-district opportunities move downstream as the river drops. Treat this as a same-day level-and-trend decision rather than a dependable low-water float.",
      "difficulty": "moderate",
      "difficultyNotes": "This continuation links two short upper-Buffalo segments with riffles, bluff turns, shallow pools, and cold-water consequences, but it avoids the rougher Kyles start and stays shorter than the longer all-day upper continuations.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes exact current route pages for Erbie to Ozark and Ozark to Pruitt, the Buffalo access mileage chart supports the combined corridor, NPS Getting Around supplies coordinate anchors for Erbie, Ozark, and Pruitt, and direct USGS 07055680 at Pruitt returned same-day values during review. The app uses the NPS-linked Pruitt Float Guide 100 cfs low-water floor as minimum-only scoring and keeps the NPS 2,000 cfs unsafe level as a caveat rather than an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Erbie to Pruitt, 7.6 miles",
        "note": "NPS publishes Erbie to Ozark as a 5.4-mile trip and Ozark to Pruitt as a 2.1-mile trip, while the NPS access mileage chart lists 5.5 and 2.1 river miles between those access points.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-erbie-to-ozark.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055680",
        "note": "Direct USGS Water Services for Buffalo River at Pruitt showed same-day values of 41.7 cfs and 3.25 ft at 2026-07-14 20:30 CDT during review.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "The NPS-linked Buffalo National River Float Guide uses Pruitt bands of Very Low below 100 cfs, Low from 100 to 200 cfs, Moderate from 200 to 1,000 cfs, High from 1,000 to 2,000 cfs, and Flood above 2,000 cfs. Paddle Today uses only the start of Low as a conservative floor.",
        "sourceUrl": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af"
      },
      {
        "label": "Campground-backed put-in",
        "value": "Erbie Campground",
        "note": "NPS route and campground pages describe Erbie as a formal park campground with river access support for float planning.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Erbie 36.070346, -93.211886; Pruitt 36.057666, -93.135032",
        "note": "NPS Getting Around lists Erbie and Pruitt coordinate anchors. Use the signed landings and current park access conditions rather than GPS alone.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Erbie to Ozark",
        "url": "https://www.nps.gov/thingstodo/paddle-erbie-to-ozark.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Ozark to Pruitt",
        "url": "https://www.nps.gov/thingstodo/paddle-ozark-to-pruitt.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 Buffalo River at Pruitt",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055680 latest conditions",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-steel-creek-erbie",
    "slug": "buffalo-river-steel-creek-erbie",
    "name": "Buffalo River",
    "reach": "Steel Creek to Erbie",
    "aliases": [
      "Buffalo National River - Steel Creek to Erbie",
      "Buffalo River - Steel Creek Campground to Erbie",
      "Upper Buffalo River - Steel Creek to Erbie"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "cold_water",
        "remote"
      ],
      "safetyNotes": [
        "This route links the Steel Creek to Kyle's Landing whitewater day with the Kyle's Landing to Erbie continuation, so it needs a long upper-district shuttle and daylight margin.",
        "Use the Pruitt gauge as the route check already documented on this card, and stand down for very low, rising, or above-NPS-unsafe water.",
        "Expect swift current, repeated shoals or rapids, fresh flood wood, limited cell service, rough roads, and cold-water consequences if a swim or gear failure happens far from an access."
      ],
      "reviewStatus": "reviewed"
    },
    "summary": "Long upper Buffalo day from Steel Creek to Erbie, linking the classic Steel-Creek-to-Kyle's section with the Erbie continuation into one campground-backed trip. The direct Pruitt gauge remains the nearest official downstream check for a conservative low-water and unsafe-high call on this corridor.",
    "statusText": "Use the Buffalo River at Pruitt gauge as the nearest downstream corridor check. The NPS-linked Float Guide still marks Pruitt very low below 100 cfs and the park still says levels above 2,000 cfs at Pruitt / Highway 7 are unsafe, so this route keeps a conservative minimum-only low-water floor and high-water caveat.",
    "latitude": 36.040776,
    "longitude": -93.344048,
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS-linked Buffalo River Float Guide Pruitt bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
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
      "seasonNotes": "NPS still says upper-district Buffalo paddling is extremely dependent on rainfall and usually practical in spring or early summer when consistent rain feeds the watershed. Treat this as a recent-water, stable-or-falling-gauge trip rather than a dependable summer float.",
      "difficulty": "hard",
      "difficultyNotes": "This route stacks the classic Steel Creek to Kyle's rapids with the bluffy Kyles-to-Erbie continuation into one committed upper-district day. It stays behind the whitewater route type because swift current, wood, rough-road shuttles, and quick rises are first-class decisions.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS still publishes exact current route pages for Steel Creek to Kyle's Landing and Kyle's Landing to Erbie; the Buffalo access mileage chart supports the combined corridor at 13.6 miles; NPS camping still documents both Steel Creek and Erbie as formal campground-backed accesses; and direct USGS Water Services returned 36.9 cfs and 3.21 ft at Pruitt at 2026-07-16 09:30 CDT during this run. The app keeps the established Pruitt minimum-only floor from the NPS-linked Float Guide rather than inventing an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Steel Creek to Erbie, 13.6 miles",
        "note": "The current NPS Buffalo River mileage chart still lists Steel Creek to Erbie as 13.6 river miles, and the component NPS route pages still publish Steel Creek to Kyle's Landing and Kyle's Landing to Erbie as the exact corridor pieces.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm"
      },
      {
        "label": "Upper-district condition framing",
        "value": "Rainfall dependent upper-district route",
        "note": "The current NPS upper-district paddling page still says paddling conditions in the upper district are extremely dependent on rainfall and tells visitors to check gauges and current conditions before launching.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/upper-district-paddling.htm"
      },
      {
        "label": "Direct gauge reading",
        "value": "USGS 07055680 at 36.9 cfs / 3.21 ft",
        "note": "USGS Water Services returned direct Pruitt values of 36.9 cfs and 3.21 ft at 2026-07-16 09:30 CDT, which is below the conservative 100 cfs floor and supports explicit too-low / scraping-likely framing in this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold support",
        "value": "Pruitt minimum-only 100 cfs floor; 2,000 cfs unsafe high caveat",
        "note": "The current NPS-linked Buffalo Float Guide still marks Pruitt very low below 100 cfs and the NPS paddling guidance still says levels above 2,000 cfs at Pruitt / Highway 7 are unsafe.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/upper-district-paddling.htm"
      },
      {
        "label": "Campground-backed endpoints",
        "value": "Steel Creek Campground to Erbie Campground",
        "note": "Current NPS campground pages still document both Steel Creek and Erbie as formal public campground-backed river accesses for upper-district float planning.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Steel Creek 36.040776, -93.344048; Erbie 36.070346, -93.211886",
        "note": "Current NPS campground and getting-around pages still provide coordinate anchors for Steel Creek and Erbie.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Steel Creek to Kyle's Landing",
        "url": "https://www.nps.gov/thingstodo/paddle-steel-creek-to-kyles-landing.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Kyle's Landing to Erbie",
        "url": "https://www.nps.gov/thingstodo/paddle-kyles-landing-to-erbie.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo upper district paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/upper-district-paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo river accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055680 current discharge and gage height",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-steel-creek-pruitt",
    "slug": "buffalo-river-steel-creek-pruitt",
    "name": "Buffalo River",
    "reach": "Steel Creek to Pruitt",
    "aliases": [
      "Buffalo National River - Steel Creek to Pruitt",
      "Buffalo River - Steel Creek Campground to Pruitt",
      "Upper Buffalo River - Steel Creek to Pruitt"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "Steel Creek to Pruitt stacks the Steel-to-Kyle's, Kyles-to-Erbie, Erbie-to-Ozark, and Ozark-to-Pruitt upper Buffalo trips into one committed all-day route.",
        "Use the direct Pruitt gauge check already documented on this card, but still verify current park alerts, launch conditions, and wood before committing.",
        "Plan around swift Class I-II current, repeated shoals, fresh flood wood, rough roads, limited cell service, long mileage, and the mandatory finish at Pruitt Landing."
      ],
      "reviewStatus": "reviewed"
    },
    "summary": "Full upper Buffalo National River continuation from Steel Creek to Pruitt, linking the exact Steel-Creek-to-Kyle's, Kyle's-to-Erbie, Erbie-to-Ozark, and Ozark-to-Pruitt paddles into one guarded all-day route. The Pruitt gauge is the direct same-corridor official check for the finish.",
    "statusText": "Use the Buffalo River at Pruitt gauge as the direct same-corridor check. Around 100 cfs is the conservative low-water floor; below that, the Buffalo float guide marks Pruitt as very low. NPS says levels above 2,000 cfs at Pruitt are unsafe.",
    "latitude": 36.040776,
    "longitude": -93.344048,
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS Buffalo National River Float Guide Pruitt gauge bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says upper Buffalo paddling windows shift quickly with rainfall and usually start first in spring before moving downstream as the river drops. Treat this as a same-day level-and-trend decision rather than a dependable low-water float.",
      "difficulty": "hard",
      "difficultyNotes": "This route stacks the classic Steel Creek to Kyle's rapids with the Erbie and Ozark corridor before the Highway 7 finish at Pruitt. It is a long upper-district commitment with swift current, wood, rough-road shuttles, and cold-water consequences, so it stays behind the whitewater route type.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes exact current route pages for Steel Creek to Kyle's Landing, Kyle's Landing to Erbie, Erbie to Ozark, and Ozark to Pruitt; the Buffalo access mileage chart supports the combined corridor at 21.1 miles; NPS Getting Around supplies Steel Creek, Ozark, and Pruitt coordinate anchors; and direct USGS 07055680 at Pruitt returned same-day values of 43.0 cfs and 3.26 ft at 2026-07-14 22:30 CDT during review. The app uses the NPS-linked Pruitt Float Guide 100 cfs low-water floor as minimum-only scoring and keeps the NPS 2,000 cfs unsafe level as a caveat rather than an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Steel Creek to Pruitt, about 21.1 miles",
        "note": "NPS publishes Steel Creek to Kyle's Landing as 8 miles, Kyle's Landing to Erbie as 5.7 miles, Erbie to Ozark as 5.4 miles, and Ozark to Pruitt as 2.1 miles, while the Buffalo access mileage chart lists 21.1 river miles from Steel Creek to Pruitt.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-steel-creek-to-kyles-landing.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055680",
        "note": "Direct USGS Water Services for Buffalo River at Pruitt returned same-day values of 43.0 cfs and 3.26 ft at 2026-07-14 22:30 CDT during review.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "The NPS-linked Buffalo National River Float Guide uses Pruitt bands of Very Low below 100 cfs, Low from 100 to 200 cfs, Moderate from 200 to 1,000 cfs, High from 1,000 to 2,000 cfs, and Flood above 2,000 cfs. Paddle Today uses only the start of Low as a conservative floor.",
        "sourceUrl": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af"
      },
      {
        "label": "High-water cutoff",
        "value": "NPS unsafe above 2,000 cfs at Pruitt",
        "note": "NPS says Buffalo River levels greater than 2,000 cfs at the Pruitt / Highway 7 gage are unsafe. The app does not turn that into an ideal scoring range.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/paddling.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Steel Creek 36.040776, -93.344048; Pruitt 36.057666, -93.135032",
        "note": "NPS Getting Around and Camping publish coordinate anchors for Steel Creek and Pruitt. Use the signed landings and current park access conditions rather than GPS alone.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      },
      {
        "label": "Campground-backed put-in",
        "value": "Steel Creek Campground",
        "note": "NPS campground pages support Steel Creek as a formal campground-backed launch for upper-district float planning.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Steel Creek to Kyle's Landing",
        "url": "https://www.nps.gov/thingstodo/paddle-steel-creek-to-kyles-landing.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Kyle's Landing to Erbie",
        "url": "https://www.nps.gov/thingstodo/paddle-kyles-landing-to-erbie.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Erbie to Ozark",
        "url": "https://www.nps.gov/thingstodo/paddle-erbie-to-ozark.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Ozark to Pruitt",
        "url": "https://www.nps.gov/thingstodo/paddle-ozark-to-pruitt.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 Buffalo River at Pruitt",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055680 latest conditions",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-ponca-hasty",
    "slug": "buffalo-river-ponca-hasty",
    "name": "Buffalo River",
    "reach": "Ponca to Hasty",
    "aliases": [
      "Upper Buffalo - Ponca to Hasty",
      "Buffalo River - Ponca to Hasty access",
      "Ponca to Hasty full upper-district continuation"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Full upper Buffalo continuation from Ponca to Hasty through Steel Creek, Kyle's Landing, Erbie, Ozark, and Pruitt. NPS still publishes the current access ladder and mileage chart, and the direct Pruitt gauge keeps the lower-corridor low-water and unsafe-high warnings on one official source.",
    "statusText": "Use the Buffalo River at Pruitt gauge as the direct lower-corridor check. The NPS-linked Float Guide still marks Pruitt very low below 100 cfs and the park still says levels above 2,000 cfs at Pruitt / Highway 7 are unsafe, so this route keeps a conservative minimum-only low-water floor and high-water caveat.",
    "latitude": 36.0225,
    "longitude": -93.354722,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "Ponca to Hasty is a full upper-district commitment that should usually be planned as an overnight-capable corridor, not a casual day float.",
        "Use the Pruitt gauge as the lower-corridor check and treat the NPS 2,000 cfs Pruitt unsafe level as a hard warning, while still verifying upper-district conditions from Ponca.",
        "Expect repeated riffles, swift bends, fresh wood, cold water, rough shuttles, limited cell service, and remote rescue exposure across the full mileage."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS-linked Buffalo River Float Guide Pruitt bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
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
      "seasonNotes": "NPS still says upper-district Buffalo paddling is extremely dependent on rainfall and usually works best in spring or early summer, but the Pruitt fallback section can still open after shorter storm windows. Treat this as a same-day level-and-trend decision rather than a dependable low-water float.",
      "difficulty": "hard",
      "difficultyNotes": "The miles stack up into a very long whitewater-ish moving-water day with repeated riffles, bluff bends, rough-road shuttles, remote rescue exposure, and the Little Buffalo speed-up below Pruitt. Treat this as an advanced planning route, and for most groups it is more naturally an overnight-capable corridor than a casual day float.",
      "confidenceNotes": "Confidence is good for a conservative Arkansas add: NPS still publishes the official upper-district mileage chart with Ponca to Hasty at 30.7 miles, the upper-district paddling page still says the corridor is rainfall dependent and should be checked against gauges, and direct USGS Water Services returned 36.9 cfs and 3.21 ft at Pruitt at 2026-07-16 09:30 CDT during this run. The app keeps the established Pruitt minimum-only floor from the NPS-linked Float Guide rather than inferring a broader ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Ponca to Hasty, 30.7 miles",
        "note": "The current NPS Buffalo River mileage chart still lists Ponca to Hasty as 30.7 river miles and preserves the intermediate access ladder of Steel Creek, Kyle's Landing, Erbie, Ozark, and Pruitt.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm"
      },
      {
        "label": "Upper-district condition framing",
        "value": "Rainfall dependent upper-district route",
        "note": "The current NPS upper-district paddling page still says paddling conditions in the upper district are extremely dependent on rainfall and tells visitors to check gauges and current conditions before launching.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/upper-district-paddling.htm"
      },
      {
        "label": "Direct gauge reading",
        "value": "USGS 07055680 at 36.9 cfs / 3.21 ft",
        "note": "USGS Water Services returned direct Pruitt values of 36.9 cfs and 3.21 ft at 2026-07-16 09:30 CDT, which is below the conservative 100 cfs floor and supports explicit too-low / scraping-likely framing in this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold support",
        "value": "Pruitt minimum-only 100 cfs floor; 2,000 cfs unsafe high caveat",
        "note": "The current NPS-linked Buffalo Float Guide still marks Pruitt very low below 100 cfs and the NPS paddling guidance still says levels above 2,000 cfs at Pruitt / Highway 7 are unsafe.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/upper-district-paddling.htm"
      },
      {
        "label": "Camping support",
        "value": "Steel Creek, Kyle's Landing, Erbie, and Ozark campground corridor",
        "note": "Current NPS campground pages still confirm legal overnight support at the major intermediate campgrounds, which makes this 30.7-mile route legitimately overnight-capable without implying private-bank camping at the Hasty finish.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      },
      {
        "label": "Public endpoints",
        "value": "Ponca access to Hasty river access",
        "note": "Current NPS Buffalo access pages and corridor guidance still treat Ponca as an upper-district launch and Hasty as the common lower-water fallback take-out across from Chimney Rock Bluff.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-pruitt-to-hasty.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Ponca to Steel Creek",
        "url": "https://www.nps.gov/thingstodo/paddle-ponca-to-steel-creek.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Steel Creek to Kyle's Landing",
        "url": "https://www.nps.gov/thingstodo/paddle-steel-creek-to-kyles-landing.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Kyle's Landing to Erbie",
        "url": "https://www.nps.gov/thingstodo/paddle-kyles-landing-to-erbie.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Erbie to Ozark",
        "url": "https://www.nps.gov/thingstodo/paddle-erbie-to-ozark.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Ozark to Pruitt",
        "url": "https://www.nps.gov/thingstodo/paddle-ozark-to-pruitt.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Pruitt to Hasty",
        "url": "https://www.nps.gov/thingstodo/paddle-pruitt-to-hasty.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo upper district paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/upper-district-paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo river accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055680 current discharge and gage height",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-steel-creek-hasty",
    "slug": "buffalo-river-steel-creek-hasty",
    "name": "Buffalo River",
    "reach": "Steel Creek to Hasty",
    "aliases": [
      "Buffalo National River - Steel Creek to Hasty",
      "Buffalo River - Steel Creek Campground to Hasty",
      "Upper Buffalo River - Steel Creek to Hasty"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "Steel Creek to Hasty is a very long upper Buffalo continuation through Kyle's Landing, Erbie, Ozark, and Pruitt; reserve it for groups with daylight, shuttle, and bailout margins.",
        "Use the direct Pruitt gauge and current park conditions, and do not launch for very low, rising, or above-NPS-unsafe water.",
        "Expect swift Class I-II current, fresh wood, rough-road logistics, limited cell service, cold-water consequences, and faster current below the Little Buffalo confluence."
      ],
      "reviewStatus": "reviewed"
    },
    "summary": "Full upper Buffalo continuation from Steel Creek to Hasty, linking the exact Steel-Creek-to-Kyle's, Kyle's-to-Erbie, Erbie-to-Ozark, Ozark-to-Pruitt, and Pruitt-to-Hasty paddles into one very long fallback-friendly day. The direct Pruitt gauge remains the same-corridor low-water decision point for the finish.",
    "statusText": "Use the Buffalo River at Pruitt gauge as the direct same-corridor check. Around 100 cfs is the conservative low-water floor; below that, the Buffalo float guide marks Pruitt as very low. NPS says levels above 2,000 cfs at Pruitt are unsafe.",
    "latitude": 36.040776,
    "longitude": -93.344048,
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS Buffalo National River Float Guide Pruitt gauge bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says upper Buffalo opportunities move downstream as dry weather arrives, and this Steel-Creek-to-Hasty continuation is still a same-day rainfall-and-trend call rather than a dependable summer float.",
      "difficulty": "hard",
      "difficultyNotes": "This route stacks the classic Steel Creek to Kyle's rapids, the Erbie and Ozark corridor, and the quicker Pruitt-to-Hasty fallback into one very long upper-district commitment. Swift current, wood, rough-road shuttles, and cold-water consequences keep it behind the whitewater route type.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes exact current route pages for Steel Creek to Kyle's Landing, Kyle's Landing to Erbie, Erbie to Ozark, Ozark to Pruitt, and Pruitt to Hasty; the Buffalo access mileage chart supports the combined corridor at about 27.9 to 28.0 miles; NPS publishes Steel Creek coordinates and Hasty route wording; and direct USGS 07055680 at Pruitt returned 36.9 cfs and 3.21 ft at 2026-07-15 22:30 CDT during this July 16, 2026 run. The app uses the NPS-linked Pruitt Float Guide 100 cfs low-water floor as minimum-only scoring and keeps the NPS 2,000 cfs unsafe level as a caveat rather than an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Steel Creek to Hasty, about 27.9 to 28.0 miles",
        "note": "NPS publishes Steel Creek to Kyle's Landing as 8 miles, Kyle's Landing to Erbie as 5.7 miles, Erbie to Ozark as 5.4 miles, Ozark to Pruitt as 2.1 miles, and Pruitt to Hasty as 7 miles, while the Buffalo access mileage chart lists about 28.0 river miles from Steel Creek to Hasty.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-steel-creek-to-kyles-landing.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055680",
        "note": "Direct USGS Water Services for Buffalo River at Pruitt returned 36.9 cfs and 3.21 ft at 2026-07-15 22:30 CDT during this July 16, 2026 run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "The NPS-linked Buffalo National River Float Guide uses Pruitt bands of Very Low below 100 cfs, Low from 100 to 200 cfs, Moderate from 200 to 1,000 cfs, High from 1,000 to 2,000 cfs, and Flood above 2,000 cfs. Paddle Today uses only the start of Low as a conservative floor.",
        "sourceUrl": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af"
      },
      {
        "label": "Route character",
        "value": "Upper Buffalo continuation into the lower-water Pruitt-to-Hasty fallback",
        "note": "NPS says Pruitt to Hasty is a popular alternative when conditions upriver are too low for paddling and that the river typically gains velocity after the Little Buffalo River enters halfway through that lower section.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-pruitt-to-hasty.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Steel Creek 36.040776, -93.344048; Hasty 36.008993, -93.08242",
        "note": "NPS Camping publishes Steel Creek Campground GPS coordinates, and the NPS Pruitt-to-Hasty route page identifies Hasty as the sandy river-right take-out across from Chimney Rock Bluff.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Steel Creek to Kyle's Landing",
        "url": "https://www.nps.gov/thingstodo/paddle-steel-creek-to-kyles-landing.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Kyle's Landing to Erbie",
        "url": "https://www.nps.gov/thingstodo/paddle-kyles-landing-to-erbie.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Erbie to Ozark",
        "url": "https://www.nps.gov/thingstodo/paddle-erbie-to-ozark.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Ozark to Pruitt",
        "url": "https://www.nps.gov/thingstodo/paddle-ozark-to-pruitt.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Pruitt to Hasty",
        "url": "https://www.nps.gov/thingstodo/paddle-pruitt-to-hasty.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 Buffalo River at Pruitt",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055680 latest conditions",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-kyles-landing-hasty",
    "slug": "buffalo-river-kyles-landing-hasty",
    "name": "Buffalo River",
    "reach": "Kyle's Landing to Hasty",
    "aliases": [
      "Buffalo National River - Kyle's Landing to Hasty",
      "Buffalo River - Kyles Landing to Hasty",
      "Upper Buffalo River - Kyles to Hasty"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Long upper Buffalo continuation from Kyle's Landing to Hasty, linking the exact Kyles-to-Erbie, Erbie-to-Ozark, Ozark-to-Pruitt, and Pruitt-to-Hasty paddles into one low-water fallback-friendly day. The direct Pruitt gauge remains the same-corridor decision point.",
    "statusText": "Use the Buffalo River at Pruitt gauge as the direct same-corridor check. Around 100 cfs is the conservative low-water floor; below that, the Buffalo float guide marks Pruitt as very low. NPS says levels above 2,000 cfs at Pruitt are unsafe.",
    "latitude": 36.055756,
    "longitude": -93.2813,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "fast_rise",
        "strainers",
        "cold_water",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "This continuation keeps the not-for-beginners Kyle's corridor, adds the Ozark connector, and finishes on the quicker Pruitt-to-Hasty fallback.",
        "NPS still says upper-district paddling is extremely dependent on rainfall, many access roads are rough or unpaved, and GPS can be unreliable in the park.",
        "Use the direct Pruitt gauge and current park alerts before launching. Very low water can turn this into a long drag-heavy day, and NPS says flows above 2,000 cfs at Pruitt are unsafe."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS Buffalo National River Float Guide Pruitt gauge bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says Buffalo paddling windows shift downstream as the river drops, and this Kyles-to-Hasty continuation should still be treated as a same-day rainfall-and-trend decision rather than a dependable summer float.",
      "difficulty": "hard",
      "difficultyNotes": "This continuation keeps the not-for-beginners Kyles corridor, adds the Ozark connector, and finishes on the quicker Pruitt-to-Hasty fallback. Swift current, rough-road logistics, wood, and cold-water consequences keep it behind the whitewater route type.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes exact current route pages for Kyle's Landing to Erbie, Erbie to Ozark, Ozark to Pruitt, and Pruitt to Hasty; the Buffalo access mileage chart supports the combined corridor at about 19.9 to 20.0 miles; NPS publishes Kyle's coordinates and Hasty route wording; and direct USGS 07055680 at Pruitt returned 36.9 cfs and 3.21 ft at 2026-07-15 22:30 CDT during this July 16, 2026 run. The app uses the NPS-linked Pruitt Float Guide 100 cfs low-water floor as minimum-only scoring and keeps the NPS 2,000 cfs unsafe level as a caveat rather than an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Kyle's Landing to Hasty, about 19.9 to 20.0 miles",
        "note": "NPS publishes Kyle's Landing to Erbie as 5.7 miles, Erbie to Ozark as 5.4 miles, Ozark to Pruitt as 2.1 miles, and Pruitt to Hasty as 7 miles, while the Buffalo access mileage chart lists about 20.0 river miles from Kyle's Landing to Hasty.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-kyles-landing-to-erbie.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055680",
        "note": "Direct USGS Water Services for Buffalo River at Pruitt returned 36.9 cfs and 3.21 ft at 2026-07-15 22:30 CDT during this July 16, 2026 run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "The NPS-linked Buffalo National River Float Guide uses Pruitt bands of Very Low below 100 cfs, Low from 100 to 200 cfs, Moderate from 200 to 1,000 cfs, High from 1,000 to 2,000 cfs, and Flood above 2,000 cfs. Paddle Today uses only the start of Low as a conservative floor.",
        "sourceUrl": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af"
      },
      {
        "label": "Route character",
        "value": "Upper Buffalo continuation into the lower-water Pruitt-to-Hasty fallback",
        "note": "NPS says the Kyles route is not for beginners, and the lower Pruitt-to-Hasty section is a popular alternative when conditions above Pruitt are too low for paddling.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-pruitt-to-hasty.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Kyle's Landing 36.055756, -93.2813; Hasty 36.008993, -93.08242",
        "note": "NPS Camping publishes Kyles Landing Campground GPS coordinates, and the NPS Pruitt-to-Hasty route page identifies Hasty as the sandy river-right take-out across from Chimney Rock Bluff.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Kyle's Landing to Erbie",
        "url": "https://www.nps.gov/thingstodo/paddle-kyles-landing-to-erbie.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Erbie to Ozark",
        "url": "https://www.nps.gov/thingstodo/paddle-erbie-to-ozark.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Ozark to Pruitt",
        "url": "https://www.nps.gov/thingstodo/paddle-ozark-to-pruitt.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Pruitt to Hasty",
        "url": "https://www.nps.gov/thingstodo/paddle-pruitt-to-hasty.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 Buffalo River at Pruitt",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055680 latest conditions",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-erbie-hasty",
    "slug": "buffalo-river-erbie-hasty",
    "name": "Buffalo River",
    "reach": "Erbie to Hasty",
    "aliases": [
      "Buffalo National River - Erbie to Hasty",
      "Buffalo River - Erbie Campground to Hasty",
      "Upper Buffalo River - Erbie to Hasty"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Upper Buffalo continuation from Erbie to Hasty, linking the exact Erbie-to-Ozark, Ozark-to-Pruitt, and Pruitt-to-Hasty paddles into one longer fallback-friendly day. The direct Pruitt gauge remains the same-corridor low-water decision point.",
    "statusText": "Use the Buffalo River at Pruitt gauge as the direct same-corridor check. Around 100 cfs is the conservative low-water floor; below that, the Buffalo float guide marks Pruitt as very low. NPS says levels above 2,000 cfs at Pruitt are unsafe.",
    "latitude": 36.070346,
    "longitude": -93.211886,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "fast_rise",
        "strainers",
        "cold_water",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "This longer continuation starts on the bluff-lined Erbie corridor and finishes on the quicker Pruitt-to-Hasty fallback where the Little Buffalo adds speed.",
        "Cold water, wood, long mileage, and limited bail-out options make this more than a casual scenic float even when the whitewater is modest.",
        "Use the direct Pruitt gauge and current park alerts before launching. Very low water creates scraping and obstacle dodging, and NPS says flows above 2,000 cfs at Pruitt are unsafe."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS Buffalo National River Float Guide Pruitt gauge bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says Buffalo paddling windows shift downstream with dropping water, and this Erbie-to-Hasty continuation should still be treated as a same-day level-and-trend decision rather than a dependable low-water float.",
      "difficulty": "hard",
      "difficultyNotes": "This continuation starts on the bluff-lined Erbie corridor and finishes on the quicker Pruitt-to-Hasty fallback where the Little Buffalo adds speed. Cold water, wood, and longer mileage keep it behind the whitewater route type.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes exact current route pages for Erbie to Ozark, Ozark to Pruitt, and Pruitt to Hasty; the Buffalo access mileage chart supports the combined corridor at about 14.4 to 14.5 miles; NPS publishes Erbie coordinates and Hasty route wording; and direct USGS 07055680 at Pruitt returned 36.9 cfs and 3.21 ft at 2026-07-15 22:30 CDT during this July 16, 2026 run. The app uses the NPS-linked Pruitt Float Guide 100 cfs low-water floor as minimum-only scoring and keeps the NPS 2,000 cfs unsafe level as a caveat rather than an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Erbie to Hasty, about 14.4 to 14.5 miles",
        "note": "NPS publishes Erbie to Ozark as 5.4 miles, Ozark to Pruitt as 2.1 miles, and Pruitt to Hasty as 7 miles, while the Buffalo access mileage chart lists about 14.4 miles from Erbie to Hasty.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-erbie-to-ozark.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055680",
        "note": "Direct USGS Water Services for Buffalo River at Pruitt returned 36.9 cfs and 3.21 ft at 2026-07-15 22:30 CDT during this July 16, 2026 run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "The NPS-linked Buffalo National River Float Guide uses Pruitt bands of Very Low below 100 cfs, Low from 100 to 200 cfs, Moderate from 200 to 1,000 cfs, High from 1,000 to 2,000 cfs, and Flood above 2,000 cfs. Paddle Today uses only the start of Low as a conservative floor.",
        "sourceUrl": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af"
      },
      {
        "label": "Route character",
        "value": "Bluff-lined upper Buffalo continuation into the lower-water Pruitt-to-Hasty fallback",
        "note": "NPS says Pruitt to Hasty is a popular alternative when the river above Pruitt is too low for paddling and that the river typically gains velocity after the Little Buffalo River enters halfway through that lower section.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-pruitt-to-hasty.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Erbie 36.070346, -93.211886; Hasty 36.008993, -93.08242",
        "note": "NPS Getting Around lists Erbie coordinate anchors, and the NPS Pruitt-to-Hasty route page identifies Hasty as the sandy river-right take-out across from Chimney Rock Bluff.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Erbie to Ozark",
        "url": "https://www.nps.gov/thingstodo/paddle-erbie-to-ozark.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Ozark to Pruitt",
        "url": "https://www.nps.gov/thingstodo/paddle-ozark-to-pruitt.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Pruitt to Hasty",
        "url": "https://www.nps.gov/thingstodo/paddle-pruitt-to-hasty.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 Buffalo River at Pruitt",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055680 latest conditions",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-ozark-hasty",
    "slug": "buffalo-river-ozark-hasty",
    "name": "Buffalo River",
    "reach": "Ozark to Hasty",
    "aliases": [
      "Buffalo National River - Ozark to Hasty",
      "Buffalo River - Ozark Campground to Hasty",
      "Upper Buffalo River - Ozark to Hasty"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Upper-to-middle Buffalo continuation from Ozark to Hasty, combining the short Ozark-to-Pruitt connector with the popular lower-water Pruitt-to-Hasty day. The direct Pruitt gauge remains the same-corridor decision point.",
    "statusText": "Use the Buffalo River at Pruitt gauge as the direct same-corridor check. Around 100 cfs is the conservative low-water floor; below that, the Buffalo float guide marks Pruitt as very low. NPS says levels above 2,000 cfs at Pruitt are unsafe.",
    "latitude": 36.062132,
    "longitude": -93.159724,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "fast_rise",
        "strainers",
        "cold_water",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "The Ozark-to-Pruitt half is shorter and mellower, but the combined day still includes the not-for-beginners Pruitt-to-Hasty section with swift bends and increasing speed below the Little Buffalo inflow.",
        "Treat this as a same-day level-and-trend decision rather than a dependable low-water float, especially after rain or if the gauge is rising.",
        "Use the direct Pruitt gauge and current park alerts before launching. Very low water creates scraping and route-finding around obstructions, and NPS says flows above 2,000 cfs at Pruitt are unsafe."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055680",
      "provider": "usgs",
      "siteId": "07055680",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River at Pruitt, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "NPS Buffalo National River Float Guide Pruitt gauge bands",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        2,
        3,
        4,
        5,
        6,
        11,
        12
      ],
      "seasonNotes": "NPS says the Buffalo shifts downstream as dry weather arrives, and this Ozark-to-Hasty continuation can stay viable longer than routes above Pruitt when the gauge is low but still moving. Treat it as a stable-or-falling same-day decision, not a dependable all-summer float.",
      "difficulty": "hard",
      "difficultyNotes": "This continuation includes the not-for-beginners Pruitt-to-Hasty section with swift bends and increasing speed below the Little Buffalo inflow. Even though the Ozark-to-Pruitt half is shorter and mellower, the combined day stays behind the whitewater route type.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes exact current route pages for Ozark to Pruitt and Pruitt to Hasty, the Buffalo access mileage chart supports the combined corridor, NPS Getting Around supplies coordinate anchors for Ozark and Pruitt, and direct USGS 07055680 at Pruitt returned same-day values during review. The app uses the NPS-linked Pruitt Float Guide 100 cfs low-water floor as minimum-only scoring and keeps the NPS 2,000 cfs unsafe level as a caveat rather than an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Ozark to Hasty, 8.9 to 9.1 miles",
        "note": "NPS publishes Ozark to Pruitt as a 2.1-mile trip and Pruitt to Hasty as a 7-mile trip, while the NPS access mileage chart lists 2.1 and 6.8 river miles between those access points.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-ozark-to-pruitt.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055680",
        "note": "Direct USGS Water Services for Buffalo River at Pruitt showed same-day values of 41.7 cfs and 3.25 ft at 2026-07-14 20:30 CDT during review.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs minimum-only",
        "note": "The NPS-linked Buffalo National River Float Guide uses Pruitt bands of Very Low below 100 cfs, Low from 100 to 200 cfs, Moderate from 200 to 1,000 cfs, High from 1,000 to 2,000 cfs, and Flood above 2,000 cfs. Paddle Today uses only the start of Low as a conservative floor.",
        "sourceUrl": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af"
      },
      {
        "label": "Route character",
        "value": "Upper Buffalo connector into the lower-water Pruitt-to-Hasty fallback",
        "note": "NPS says Pruitt to Hasty is a popular alternative when the river above Pruitt is too low for paddling and that the river usually gains velocity after the Little Buffalo River enters halfway through the trip.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddle-pruitt-to-hasty.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Ozark 36.062132, -93.159724; Hasty 36.008993, -93.08242",
        "note": "NPS Getting Around lists Ozark and Pruitt coordinate anchors, and Hasty remains the signed public take-out identified by the NPS route page across from Chimney Rock Bluff.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddle Ozark to Pruitt",
        "url": "https://www.nps.gov/thingstodo/paddle-ozark-to-pruitt.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddle Pruitt to Hasty",
        "url": "https://www.nps.gov/thingstodo/paddle-pruitt-to-hasty.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River Float Guide",
        "url": "https://www.arcgis.com/apps/dashboards/3606e2401fdd428cbbdff9518cbe11af",
        "provider": "nps"
      },
      {
        "label": "USGS 07055680 Buffalo River at Pruitt",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055680/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07055680 latest conditions",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055680&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buffalo-river-tyler-bend-gilbert",
    "slug": "buffalo-river-tyler-bend-gilbert",
    "name": "Buffalo River",
    "reach": "Tyler Bend to Gilbert",
    "aliases": [
      "Buffalo National River - Tyler Bend to Gilbert",
      "Buffalo River - Tyler Bend to Grinder's Ferry and Gilbert",
      "Middle Buffalo River - Tyler Bend to Gilbert"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Popular middle Buffalo National River day from Tyler Bend to Gilbert, with Grinder's Ferry as an optional short take-out. NPS supports the route and the direct St. Joe gauge is live, but this is still rain-sensitive Ozark moving water with swift I-II current, wood, and high-water judgment.",
    "statusText": "Use the Buffalo River near St. Joe gauge. Around 120 cfs is the conservative low-water floor; below that, expect dragging and shortened float plans. Treat 2,000 cfs and higher as high or flood-stage water for casual paddlers.",
    "latitude": 35.986715,
    "longitude": -92.763903,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "American Whitewater rates Tyler Bend to Gilbert as Class I-II, while NPS frames this as a middle-district float whose timing and difficulty depend on changing river levels.",
        "Use the St. Joe gauge, weather, and level trend before launching; high or rising water, wood, and sharp bends can make this more consequential than a casual scenic float.",
        "NPS warns gauges cannot show every fresh sweeper or blocked side channel. Expect unreliable cell service, gravel-bar access, crowded peak-season launches, and cold-water swims."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07056000",
      "provider": "usgs",
      "siteId": "07056000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River near St. Joe, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07056000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 120,
      "thresholdSource": {
        "label": "Rivers.MOHERP Buffalo River St. Joe gauge bands and same-route trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07056000&hours=0",
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
        11
      ],
      "seasonNotes": "NPS says the Buffalo is largely rainfall dependent and that paddling seasons move downstream as dry weather arrives. The middle district usually holds water longer than the upper district, but same-day level and trend still matter.",
      "difficulty": "hard",
      "difficultyNotes": "NPS calls Tyler Bend to Gilbert the most popular middle-district float and describes Tyler Bend to Grinder's Ferry as mostly flat, but American Whitewater rates the full Tyler Bend-to-Gilbert reach I-II. The route is marked whitewater so casual discovery does not hide the swiftwater and high-stage hazards.",
      "confidenceNotes": "Confidence is good for a guarded minimum-only add: NPS identifies Tyler Bend to Gilbert as the popular 5.5-mile middle-district float, documents Tyler Bend launch logistics, and lists 5.4 miles from Tyler Bend to Gilbert in the access mileage chart; NPS coordinate tables identify Tyler Bend and Gilbert anchors; USGS 07056000 showed same-day May 31, 2026 discharge and gage-height values during review; AW matches the exact Tyler Bend-to-Gilbert I-II reach to the St. Joe gauge; and Rivers.MOHERP publishes St. Joe low/high bands plus same-route Tyler Bend-to-Gilbert good-condition evidence. The threshold remains community-calibrated, so the app uses only a conservative 120 cfs floor and does not claim an ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Tyler Bend to Gilbert, about 5.4 to 5.5 miles",
        "note": "NPS describes Tyler Bend to Gilbert as the most popular Middle District float and says it can take about 3 to 4 hours at moderate river levels.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/full-day-adventure-middle-district.htm"
      },
      {
        "label": "Access and mileage",
        "value": "Tyler Bend to Grinder's Ferry 1.1 miles; Tyler Bend to Gilbert 5.4 miles",
        "note": "NPS lists Tyler Bend, Grinder's Ferry, and Gilbert in the Buffalo River mileage chart, with Grinder's Ferry as the short optional access and Gilbert as the full-day take-out.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07056000",
        "note": "USGS Buffalo River near St. Joe showed same-day May 31, 2026 data during review, including 3,020 cfs and 7.75 ft at 18:45 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07056000"
      },
      {
        "label": "Low-water floor",
        "value": "120 cfs minimum-only",
        "note": "Rivers.MOHERP lists the St. Joe gauge Low band beginning at 120 cfs and records Tyler Bend-to-Gilbert as good at 2,470 cfs / 7.41 ft, plus nearby middle-Buffalo good-condition trips down to 778 cfs. Paddle Today uses only the 120 cfs floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07056000&hours=0"
      },
      {
        "label": "High-water caveat",
        "value": "2,000 cfs high; 4,313 cfs flood marker in MOHERP bands",
        "note": "MOHERP labels 2,000 cfs and higher as high water for the St. Joe gauge and describes high/flood conditions as potentially dangerous for young or inexperienced paddlers. The app preserves this as a hard caveat, not a two-sided scoring model.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07056000&hours=0"
      },
      {
        "label": "Route character",
        "value": "Class I-II middle Buffalo reach",
        "note": "American Whitewater lists Tyler Bend to Gilbert as a 5.3-mile I-II reach on the Buffalo River near St. Joe gauge, with Grinder's Ferry as an access point about 1.4 miles downstream.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3968/main"
      },
      {
        "label": "Access coordinates",
        "value": "Tyler Bend 35.986715, -92.763903; Gilbert 35.987738, -92.715563",
        "note": "NPS Getting Around lists Tyler Bend campground coordinates and a Gilbert trail/access coordinate. Use these as practical access-area anchors and make a same-day visual landing check.",
        "sourceUrl": "https://home.nps.gov/buff/planyourvisit/getting-around.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Full Day Adventure: Middle District",
        "url": "https://www.nps.gov/buff/planyourvisit/full-day-adventure-middle-district.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Paddling Tyler Bend to Grinder's Ferry",
        "url": "https://www.nps.gov/thingstodo/paddling-tyler-bend-to-grinder-s-ferry.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo getting around / coordinates",
        "url": "https://home.nps.gov/buff/planyourvisit/getting-around.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 07056000 Buffalo River near St. Joe",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07056000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07056000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07056000",
        "provider": "usgs"
      },
      {
        "label": "American Whitewater Tyler Bend to Gilbert",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3968/main",
        "provider": "american_whitewater"
      },
      {
        "label": "Rivers.MOHERP St. Joe gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07056000&hours=0",
        "provider": "local"
      }
    ]
  },
  {
    "id": "buffalo-river-tyler-bend-grinders-ferry",
    "slug": "buffalo-river-tyler-bend-grinders-ferry",
    "name": "Buffalo River",
    "reach": "Tyler Bend to Grinder's Ferry",
    "aliases": [
      "Buffalo National River - Tyler Bend to Grinder's Ferry",
      "Buffalo River - Tyler Bend to Grinders Ferry",
      "Middle Buffalo River - Tyler Bend short float"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Short middle Buffalo National River float from Tyler Bend to Grinder's Ferry. NPS documents the exact 1.1-mile route and the direct St. Joe gauge is live, but even this mostly flat reach stays rain-sensitive Ozark moving water with swift current when levels come up.",
    "statusText": "Use the Buffalo River near St. Joe gauge. Around 120 cfs is the conservative low-water floor; below that, expect dragging and shortened plans. NPS says levels above 8,000 cfs at Grinder's Ferry are unsafe.",
    "latitude": 35.986715,
    "longitude": -92.763903,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "cold_water"
      ],
      "safetyNotes": [
        "NPS describes Tyler Bend to Grinder's Ferry as a short mostly flat reach, but it is still free-flowing Buffalo current that changes with water level and rainfall.",
        "Use the St. Joe gauge for the low-water floor and respect the NPS Grinder's Ferry high-water cutoff; skip the float when water is high, rising, or storm-affected.",
        "Watch for fresh sweepers, swimmers, tubing traffic, cold-water swims, soft gravel-bar access, and Tyler Bend launch restrictions during busy periods."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07056000",
      "provider": "usgs",
      "siteId": "07056000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buffalo River near St. Joe, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07056000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 120,
      "thresholdSource": {
        "label": "Rivers.MOHERP Buffalo River St. Joe gauge bands and same-route trip evidence",
        "url": "https://rivers.moherp.org/gauge/?gauge=07056000&hours=0",
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
        11
      ],
      "seasonNotes": "NPS says the middle Buffalo usually holds water longer than the upper river but still rises and falls with rainfall. This remains a same-day level-and-trend decision, not a guaranteed summer float.",
      "difficulty": "moderate",
      "difficultyNotes": "NPS calls this a mostly flat reach often used for tubing because of the short access spacing, but it is still free-flowing Buffalo current that can change quickly with rain. The route stays in the guarded Buffalo whitewater family so rising water, wood, and poor judgment are not hidden.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: NPS publishes the exact Tyler-Bend-to-Grinder's-Ferry route page, the access mileage chart, official Tyler Bend and Grinder's Ferry coordinate anchors, and the current Buffalo paddling safety page; direct USGS 07056000 near St. Joe exposed same-day values during review; and the adjoining Tyler-Bend-to-Gilbert route already uses a conservative 120 cfs minimum-only St. Joe model. Paddle Today keeps that same floor here and treats the NPS 8,000 cfs Grinder's Ferry unsafe level as a route caveat rather than a full ideal band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Tyler Bend to Grinder's Ferry, about 1.1 miles",
        "note": "NPS publishes Tyler Bend to Grinder's Ferry as a 1-mile float, and the Buffalo River mileage chart lists 1.1 miles between those access points. Paddle Today uses the 1.1-mile chart value so the route length stays consistent with the mapped access spacing.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddling-tyler-bend-to-grinder-s-ferry.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07056000",
        "note": "Direct USGS Water Services for Buffalo River near St. Joe showed same-day values of 184 cfs and 3.37 ft at 2026-07-14 18:45 CDT during review.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07056000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Low-water floor",
        "value": "120 cfs minimum-only",
        "note": "Rivers.MOHERP lists the St. Joe gauge Low band beginning at 120 cfs. Paddle Today uses only that conservative floor and does not infer an ideal range.",
        "sourceUrl": "https://rivers.moherp.org/gauge/?gauge=07056000&hours=0"
      },
      {
        "label": "High-water cutoff",
        "value": "NPS unsafe above 8,000 cfs at Grinder's Ferry",
        "note": "NPS says Buffalo River levels greater than 8,000 cfs at the Grinder's Ferry / Highway 65 gauge are unsafe.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/paddling.htm"
      },
      {
        "label": "Access coordinates",
        "value": "Tyler Bend 35.986715, -92.763903; Grinder's Ferry 35.986017, -92.743686",
        "note": "NPS publishes Tyler Bend Campground and Grinders Ferry primitive camping GPS coordinates, which serve as practical launch and take-out anchors.",
        "sourceUrl": "https://www.nps.gov/buff/planyourvisit/camping.htm"
      },
      {
        "label": "Route character",
        "value": "Mostly flat short middle-Buffalo float",
        "note": "NPS says this reach is mostly flat, commonly used for tubing, and has a short shuttle of about 10 minutes between accesses.",
        "sourceUrl": "https://www.nps.gov/thingstodo/paddling-tyler-bend-to-grinder-s-ferry.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Paddling Tyler Bend to Grinder's Ferry",
        "url": "https://www.nps.gov/thingstodo/paddling-tyler-bend-to-grinder-s-ferry.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo River accesses and mileage",
        "url": "https://www.nps.gov/buff/planyourvisit/river-accesses-mileage.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo National River paddling",
        "url": "https://www.nps.gov/buff/planyourvisit/paddling.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Buffalo camping / Tyler Bend and Grinders Ferry coordinates",
        "url": "https://www.nps.gov/buff/planyourvisit/camping.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 07056000 Buffalo River near St. Joe",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07056000/",
        "provider": "usgs"
      },
      {
        "label": "USGS Water Services 07056000 latest conditions",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07056000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Rivers.MOHERP St. Joe gauge",
        "url": "https://rivers.moherp.org/gauge/?gauge=07056000&hours=0",
        "provider": "local"
      }
    ]
  },
  {
    "id": "cossatot-river-ed-banks-highway-278",
    "slug": "cossatot-river-ed-banks-highway-278",
    "name": "Cossatot River",
    "reach": "Ed Banks Access to Highway 278 Access",
    "aliases": [
      "Cossatot River - Falls Section",
      "Cossatot River - Ed Banks Road to Highway 278",
      "Cossatot River - Ed Banks to U.S. 278"
    ],
    "state": "Arkansas",
    "region": "Ouachita Mountains",
    "routeType": "whitewater",
    "summary": "Expert-only Cossatot Falls Section run from Ed Banks Access to the Highway 278 access. Arkansas State Parks publishes a stage table for the direct USGS gauge, and American Whitewater matches the exact reach, but this is remote Class III-IV+ water with low-water bridges, sieves, holes, and difficult rescue.",
    "statusText": "Use the Cossatot River near Vandervoort gauge. Around 3.3 ft is the guarded low-water floor, 3.8 to 4.8 ft is the conservative expert window, and 5.4 ft or higher is too high for a Paddle Today recommendation.",
    "latitude": 34.33975,
    "longitude": -94.25069,
    "gaugeSource": {
      "id": "usgs-07340300",
      "provider": "usgs",
      "siteId": "07340300",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Cossatot River near Vandervoort, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07340300/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3.8,
      "idealMax": 4.8,
      "tooLow": 3.3,
      "tooHigh": 5.4,
      "thresholdSource": {
        "label": "Arkansas State Parks Cossatot River floater stage table and American Whitewater Falls Section reach",
        "url": "https://www.arkansas.com/sites/default/files/2025-12/5e77db3f54c44ca91f583ef536aeab44_cossatotriverfloaterinformationbrochure.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        11,
        12
      ],
      "seasonNotes": "Arkansas State Parks says floatable levels depend on rain events and are generally limited to winter and spring. Summer and early fall are normally too low, while storms can make the river rise quickly and unpredictably.",
      "difficulty": "hard",
      "difficultyNotes": "American Whitewater rates the Falls Section II-IV, and Arkansas State Parks describes Cossatot Falls as Class III-IV+V water. This route is for experienced whitewater paddlers with rescue skills, proper cold-water and whitewater gear, and a no-solo plan.",
      "confidenceNotes": "Confidence is high enough only for a guarded expert-whitewater add: Arkansas State Parks documents the Ed Banks-to-U.S. 278 float distance, access areas, seasonal/rain-dependent safety rules, mandatory PFDs, low-water-bridge hazards, and a numeric Hwy 246 stage table tied to USGS 07340300; American Whitewater matches the exact Ed Banks Road-to-Highway 278 Falls Section to the same gauge; USGS exposed same-day May 31, 2026 discharge and stage values during review; and OSM/Mapcarta access-point records resolve Ed Banks Access and the Highway 278 access corridor against the state park map. The scoring is deliberately conservative and should be revisited if Arkansas State Parks publishes survey-grade access coordinates or updated stage guidance."
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "Arkansas State Parks says the Cossatot is not for beginners, can change levels quickly, and should never be attempted alone or without proper equipment.",
        "Treat the six-drop Cossatot Falls sequence, ledge holes, sieves, undercuts, and named Class III-IV+ rapids as scout-or-portage decisions for expert whitewater groups only.",
        "Low-water bridges can create dangerous hydraulics at high water. Confirm the Highway 278 take-out and interior road conditions before launching from Ed Banks."
      ],
      "reviewStatus": "reviewed"
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Ed Banks low-water bridge to U.S. 278, about 6 miles",
        "note": "Arkansas State Parks says the Cossatot is a 6-mile float from the Ed Banks low-water bridge to the U.S. 278 take-out, with the park corridor running from Highway 246 to U.S. 278.",
        "sourceUrl": "https://www.arkansasstateparks.com/sites/default/files/2025-10/cossatotriver_2014pibweb.pdf"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07340300",
        "note": "USGS Cossatot River near Vandervoort showed same-day May 31, 2026 data during review, including 92.5 cfs and 2.79 ft at 16:30 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07340300"
      },
      {
        "label": "Stage model",
        "value": "3.3 / 3.8-4.8 / 5.4 ft",
        "note": "Arkansas State Parks floater guidance lists 3.6-3.3 ft as lower levels, 4.0-3.8 ft as traditional normal levels, 4.2 ft as normal with routes in all six falls rapids, 4.5-4.8 ft for strong intermediates with those who know the river, and 5.4 ft and up as high to very high expert water. Paddle Today uses 5.4 ft as the conservative upper cutoff.",
        "sourceUrl": "https://www.arkansas.com/sites/default/files/2025-12/5e77db3f54c44ca91f583ef536aeab44_cossatotriverfloaterinformationbrochure.pdf"
      },
      {
        "label": "Whitewater reach match",
        "value": "6.4 mi II-IV Falls Section",
        "note": "American Whitewater identifies Ed Banks Road to Highway 278/4 as the Cossatot Falls Section, rates it II-IV, ties it to the Cossatot River near Vandervoort gauge, and lists the major rapids and access directions.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/92/main"
      },
      {
        "label": "Access coordinates",
        "value": "Ed Banks 34.33975, -94.25069; Highway 278 access 34.29388, -94.17704",
        "note": "Mapcarta/OpenStreetMap places Ed Banks Access as an Arkansas park access parking area, and Arkansas Natural Heritage Commission records place the developed Cossatot State Park / Highway 278 access corridor at 34.29388, -94.17704. Treat both as practical access-area anchors, not survey-grade ramp points.",
        "sourceUrl": "https://mapcarta.com/N12957921429"
      },
      {
        "label": "Safety posture",
        "value": "Not for beginners; no solo runs",
        "note": "Arkansas State Parks says the Cossatot is not recommended for inexperienced or ill-equipped paddlers, requires PFDs, highly recommends helmets, warns not to drive across low-water bridges during high water, and says paddlers should never attempt the river alone.",
        "sourceUrl": "https://www.arkansasstateparks.com/sites/default/files/2025-10/cossatotriver_2014pibweb.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Arkansas State Parks Cossatot River brochure",
        "url": "https://www.arkansasstateparks.com/sites/default/files/2025-10/cossatotriver_2014pibweb.pdf",
        "provider": "local"
      },
      {
        "label": "Arkansas State Parks Cossatot River floater information",
        "url": "https://www.arkansas.com/sites/default/files/2025-12/5e77db3f54c44ca91f583ef536aeab44_cossatotriverfloaterinformationbrochure.pdf",
        "provider": "local"
      },
      {
        "label": "American Whitewater Cossatot Falls Section",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/92/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 07340300 Cossatot River near Vandervoort",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07340300/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07340300 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07340300",
        "provider": "usgs"
      },
      {
        "label": "Ed Banks Access map record",
        "url": "https://mapcarta.com/N12957921429",
        "provider": "local"
      },
      {
        "label": "Arkansas Natural Heritage Commission Cossatot State Park record",
        "url": "https://www.arkleg.state.ar.us/Home/FTPDocument?path=%2FAssembly%2FMeeting+Attachments%2F000%2FI12184%2FExhibit+H.11+-+ANHC+Annual+Report+for+Fiscal+Year+2013.pdf",
        "provider": "local"
      }
    ]
  },
  {
    "id": "mulberry-river-redding-turner-bend",
    "slug": "mulberry-river-redding-turner-bend",
    "name": "Mulberry River",
    "reach": "Redding Recreation Area to Turner Bend",
    "aliases": [
      "Mulberry River - Redding to Turner Bend",
      "Mulberry River - Redding Campground to Highway 23",
      "Mulberry River - Redding Campground to Turner Bend Landing"
    ],
    "state": "Arkansas",
    "region": "Ozark Highlands",
    "routeType": "whitewater",
    "summary": "Short Wild and Scenic Mulberry River run from the Forest Service Redding Recreation Area to the private-fee Turner Bend landing. American Whitewater ties the exact reach to the USGS Mulberry gauge, but this is rain-sensitive Class I-III water with fast rises and fee-access logistics.",
    "statusText": "Use the Mulberry River near Mulberry gauge. American Whitewater marks roughly 1.55 to 6.0 ft as the runnable range for this reach; below that, expect scraping, and above that the route is too high for a Paddle Today recommendation.",
    "latitude": 35.68282778,
    "longitude": -93.78651111,
    "gaugeSource": {
      "id": "usgs-07252000",
      "provider": "usgs",
      "siteId": "07252000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Mulberry River near Mulberry, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07252000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.55,
      "idealMax": 6,
      "tooLow": 1.55,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "American Whitewater Redding-to-Turner-Bend reach gauge range",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=2583",
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
        10,
        11,
        12
      ],
      "seasonNotes": "The National Rivers Project says traditional floating months are late fall to June and conditions vary with local rainfall. Treat this as a recent-rain route; summer and early fall often need a fresh storm, while storms can push the river up quickly.",
      "difficulty": "hard",
      "difficultyNotes": "American Whitewater rates Redding Campground to Highway 23 / Turner Bend as Class I-III. Turner Bend local guidance says even moderate levels can become challenging for beginners, and higher water produces powerful current, big waves, and few pools.",
      "confidenceNotes": "Confidence is good for a protected whitewater add: the Forest Service confirms Redding Recreation Area has a rock canoe launch, river access, fees, and official coordinates; American Whitewater identifies the exact Redding Campground-to-Highway-23 / Turner Bend reach and publishes a USGS 07252000 stage range; official USGS current conditions showed same-day May 31, 2026 stage and discharge values during review; National Rivers Project documents Redding-to-Turner Bend route context, late-fall-to-June seasonality, and sudden-rise warnings; and Turner Bend documents private-boater shuttle, access wristband, parking, and local level hazards. Confidence is intentionally limited because the high-quality detailed local gauge ladder is Turner Bend staff-gauge based, while Paddle Today scores from the downstream USGS stage range published by American Whitewater."
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "American Whitewater rates this Redding-to-Turner-Bend reach Class I-III, and Turner Bend local guidance warns that higher water creates powerful current, large waves, and few recovery pools.",
        "The Mulberry is rain-sensitive and can rise quickly after Ozark storms; use the USGS gauge, visual checks at both landings, and same-day weather before committing.",
        "Turner Bend is a private-fee landing. Confirm wristband, parking, shuttle, and loading rules before launch, and do not depend on informal private-bank exits."
      ],
      "reviewStatus": "reviewed"
    },
    "evidenceNotes": [
      {
        "label": "Official put-in",
        "value": "Redding Recreation Area",
        "note": "The Forest Service says Redding Recreation Area sits next to the Wild and Scenic Mulberry River and offers a rock canoe launch and river access. The page lists the site as open all year with a day-use fee and official coordinates.",
        "sourceUrl": "https://www.fs.usda.gov/r08/ozark-stfrancis/recreation/redding-recreation-area"
      },
      {
        "label": "Route shape",
        "value": "Redding to Turner Bend, about 3.6 to 4.0 miles",
        "note": "American Whitewater identifies Redding Campground to Highway 23 / Turner Bend as a 3.6-mile Mulberry reach. National Rivers Project lists Redding to Turner Bend as a 4-mile section managed by the Ozark-St. Francis National Forest.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/2583/main"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07252000",
        "note": "USGS Mulberry River near Mulberry showed same-day May 31, 2026 data during review, including 1,050 cfs and 2.84 ft at 16:30 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07252000"
      },
      {
        "label": "Stage model",
        "value": "1.55 / 1.55-6.0 / 6.0 ft",
        "note": "American Whitewater ties the exact Redding-to-Turner-Bend reach to USGS 07252000 and lists 1.55 to 6.00 ft as barely runnable to high runnable for Class I-III water. Paddle Today uses that as a conservative two-sided stage envelope without adding a stronger ideal subrange.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=2583"
      },
      {
        "label": "Private-fee take-out",
        "value": "Turner Bend landing",
        "note": "Turner Bend documents private-boater shuttles, access wristbands, parking permits, a loading/unloading landing, and the requirement to buy access for use of its landings.",
        "sourceUrl": "https://www.turnerbend.com/BOATING-SHUTTLE.html"
      },
      {
        "label": "Local hazard context",
        "value": "Fast rises, technical water, and beginner limits",
        "note": "National Rivers Project warns that heavy rain can quickly transform the Mulberry into a rampaging torrent. Turner Bend local guidance says 2.7-2.8 ft is challenging for beginners, 2.9-3.0 ft is not a casual picnic float, and 4.5-5.0 ft is too much water for most boaters on its local staff gauge.",
        "sourceUrl": "https://www.turnerbend.com/WaterLevel.html"
      },
      {
        "label": "Coordinate anchors",
        "value": "Redding 35.68282778, -93.78651111; Turner Bend 35.671667, -93.829444",
        "note": "The put-in uses Forest Service Redding coordinates. The take-out uses the Turner Bend / Highway 23 bridge corridor coordinate from the Commons NRHP bridge record, backed by Turner Bend access pages that place the landing at the Highway 23 / Mulberry River junction.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Mulberry_River_Bridge.JPG"
      }
    ],
    "sourceLinks": [
      {
        "label": "Forest Service Redding Recreation Area",
        "url": "https://www.fs.usda.gov/r08/ozark-stfrancis/recreation/redding-recreation-area",
        "provider": "local"
      },
      {
        "label": "American Whitewater Redding to Turner Bend",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/2583/main",
        "provider": "american_whitewater"
      },
      {
        "label": "American Whitewater Mulberry gauge information",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=2583",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 07252000 Mulberry River near Mulberry",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07252000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07252000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07252000",
        "provider": "usgs"
      },
      {
        "label": "National Rivers Project Redding to Turner Bend",
        "url": "https://www.nationalriversproject.com/ar/mulberry-river-redding-to-turner-bend",
        "provider": "local"
      },
      {
        "label": "Turner Bend private boating shuttle and access",
        "url": "https://www.turnerbend.com/BOATING-SHUTTLE.html",
        "provider": "local"
      },
      {
        "label": "Turner Bend water level guidance",
        "url": "https://www.turnerbend.com/WaterLevel.html",
        "provider": "local"
      }
    ]
  },
  {
    "id": "ouachita-river-remmel-whitewater-park",
    "slug": "ouachita-river-remmel-whitewater-park",
    "name": "Ouachita River",
    "reach": "Remmel Dam to Ouachita River Whitewater Park",
    "aliases": [
      "Ouachita River - Remmel Dam to Rockport",
      "Ouachita River - Remmel Dam to I-30 at Malvern",
      "Lower Ouachita River - Remmel Dam to Malvern Whitewater Park"
    ],
    "state": "Arkansas",
    "region": "Ouachita Mountains",
    "routeType": "whitewater",
    "summary": "Dam-release Ouachita day from the Remmel Dam tailrace to the Whitewater Park at Rockport in Malvern. Entergy documents the public float logistics and release guidance, and American Whitewater ties the route to the direct Remmel Dam USGS gauge, but Rockport Ledge, cold tailwater, dam operations, and strong take-out current keep this out of casual discovery.",
    "statusText": "Use the Ouachita River at Remmel Dam gauge. Around 200 cfs is only a scrape-through floor, 3,500 to 4,000 cfs is the normal recreational release window, and flows above 4,000 cfs are not recommended for floating.",
    "latitude": 34.426111,
    "longitude": -92.890833,
    "gaugeSource": {
      "id": "usgs-07359002",
      "provider": "usgs",
      "siteId": "07359002",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Ouachita River at Remmel Dam above Jones Mill, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07359002/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam_release",
        "dam",
        "whitewater",
        "fast_rise",
        "cold_water"
      ],
      "safetyNotes": [
        "Dam-release route with strong tailwater current, undertows, cold water, and fast level changes; verify current Entergy release guidance before launching.",
        "Rockport Ledge and nearby chutes can flip, pin, or swamp boats near the take-out; scout and skip if the group cannot manage whitewater hazards.",
        "Move to the left bank when the I-30 bridge comes into view and make the signed take-out before conditions force a difficult upstream ferry."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3500,
      "idealMax": 4000,
      "tooLow": 200,
      "tooHigh": 4000,
      "thresholdSource": {
        "label": "Entergy recreational-flow guidance and American Whitewater Remmel-to-I-30 gauge notes",
        "url": "https://www.entergy.com/blog/great-day-for-float/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "Entergy says recreational releases normally run on summer weekends between Memorial Day and Labor Day, but the schedule can change for weather, system demand, or emergencies. Outside release windows, kayaks may still scrape through at much lower flows, but the route is slower and more technical.",
      "difficulty": "moderate",
      "difficultyNotes": "American Whitewater rates the reach Class I-II. Most of the run is moving Class I water, but Rockport Ledge at the take-out, the Lion's Den / Tiger chute, strong currents, cold dam-release water, and changing generation make this a guarded whitewater route rather than a casual float recommendation.",
      "confidenceNotes": "Confidence is good for a guarded Arkansas add: Entergy documents the Remmel Dam float, the 170 Remmel Dam Road / 489 McGuire Road access context, the Whitewater Park take-out at 904 Riverview Drive, summer release timing, 3,200 cfs low-float context, 3,500-4,000 cfs recreational guidance, and a >4,000 cfs not-recommended warning; American Whitewater matches the exact 5.9-mile Remmel Dam-to-I-30 reach to USGS 07359002 and supplies the 200-500 cfs scrape-through floor plus Rockport Ledge hazards; official USGS legacy current conditions exposed same-day June 1, 2026 discharge and stage; and Mapcarta/OpenStreetMap resolves the Whitewater Park coordinates. Coordinates are practical access-area anchors, so paddlers still need to follow posted Entergy and park signs on arrival."
    },
    "evidenceNotes": [
      {
        "label": "Official float logistics",
        "value": "Remmel Dam to Whitewater Park",
        "note": "Entergy says weekend summer floaters bring tubes, kayaks, and canoes to Remmel Dam and exit at Ouachita River Whitewater Park in Malvern, with the access gate just past the Remmel Dam operations entrance and the exit at 904 Riverview Drive.",
        "sourceUrl": "https://www.entergy.com/blog/great-day-for-float/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07359002",
        "note": "USGS Ouachita River at Remmel Dam above Jones Mill showed same-day June 1, 2026 values during review, including 363 cfs and 2.88 ft at 00:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07359002"
      },
      {
        "label": "Threshold model",
        "value": "200 / 3,500-4,000 / 4,000 cfs",
        "note": "American Whitewater says 200-500 cfs is enough to make it downriver with scraping and that normal generation is 3,500-4,000 cfs. Entergy says flows lower than 3,200 cfs may be too low for an enjoyable tube float, 3,500-4,000 cfs is good for recreation, and flows above 4,000 cfs are not recommended for floating.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3052/main"
      },
      {
        "label": "Whitewater reach match",
        "value": "5.9 mi Class I-II",
        "note": "American Whitewater identifies Remmel Dam to I-30 at Malvern as a 5.9-mile I-II reach on the Ouachita River, with Rockport Ledge near the take-out and a warning that some chutes can flip, pin, or swamp canoes.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3052/main"
      },
      {
        "label": "Access coordinates",
        "value": "Remmel gauge/access area 34.426111, -92.890833; Whitewater Park 34.39427, -92.84158",
        "note": "The put-in coordinate is the USGS/AW Remmel Dam gauge/access-area anchor adjacent to Entergy's below-dam access instructions. Mapcarta/OpenStreetMap places Ouachita River Whitewater Park at 904 Riverview Drive with coordinates 34.39427, -92.84158.",
        "sourceUrl": "https://mapcarta.com/W967690136"
      },
      {
        "label": "Dam-release safety",
        "value": "Gate hours, release changes, and cold tailwater",
        "note": "Entergy warns release plans can change without notice, the Remmel Dam gate closes nightly at 10 p.m., no-parking zones are marked at the dam, and the take-out current can push paddlers past the Whitewater Park ramp if they miss the left-bank exit.",
        "sourceUrl": "https://www.entergy.com/blog/great-day-for-float/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Entergy Remmel Dam float guidance",
        "url": "https://www.entergy.com/blog/great-day-for-float/",
        "provider": "local"
      },
      {
        "label": "Entergy hydro lake and flow news",
        "url": "https://www.entergy.com/operations/hydro/data",
        "provider": "local"
      },
      {
        "label": "Entergy hydro public safety addresses",
        "url": "https://www.entergy.com/operations/hydro/safety/",
        "provider": "local"
      },
      {
        "label": "American Whitewater Remmel Dam to I-30",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3052/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 07359002 Ouachita River at Remmel Dam",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07359002/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07359002 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07359002",
        "provider": "usgs"
      },
      {
        "label": "Ouachita River Whitewater Park map record",
        "url": "https://mapcarta.com/W967690136",
        "provider": "local"
      }
    ]
  },
  {
    "id": "saline-river-tony-kelly-lyle-park",
    "slug": "saline-river-tony-kelly-lyle-park",
    "name": "Saline River",
    "reach": "Tony Kelly Ford Access to Lyle Park Access",
    "aliases": [
      "Saline River - Tony Kelly to Lyle Park",
      "Saline River Water Trail upper Benton segment",
      "Arkansas Water Trails Tony Kelly to Lyle"
    ],
    "state": "Arkansas",
    "region": "Central Arkansas",
    "summary": "Rain-sensitive Benton-area Saline River day from Tony Kelly Ford to Lyle Park. AGFC documents the exact 8.2-mile segment, both public accesses, and the direct Benton gauge bands, making this a clean trust-first route when flows stay below the experienced-only window.",
    "statusText": "Use the Saline River at Benton gauge. Around 3.6 to 5.0 ft is the general paddle window for this segment; below about 3.5 ft expect more dragging, and above about 5.0 ft AGFC treats the river as faster experienced-only water.",
    "latitude": 34.5844,
    "longitude": -92.6938,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "The Saline can rise quickly after rain and shift from clear easy water to pushy current with little warning.",
        "Stay with the named public access points and avoid private banks along the corridor.",
        "Wood, strainers, and muddy exits become more consequential as the river climbs above the normal range."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07363000",
      "provider": "usgs",
      "siteId": "07363000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Saline River at Benton, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07363000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3.6,
      "idealMax": 5,
      "tooLow": 3.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Saline River Water Trail gauge bands",
        "url": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "AGFC frames the Saline as rainfall dependent year-round moving water. Spring through early fall is workable when the Benton gauge is in range, but flashier post-storm rises can quickly turn this into a stronger current day.",
      "difficulty": "moderate",
      "difficultyNotes": "This is not whitewater, but it is not a lazy pond float either. AGFC describes deep pools, fast chutes, riffles, and small waves, and the 8.2-mile distance makes it a real half-day to full-day moving-water trip.",
      "confidenceNotes": "Confidence is high for a general-audience Arkansas add: AGFC publishes Tony Kelly Ford to Lyle Park as an exact 8.2-mile Saline River Water Trail segment, exposes public-access coordinates for both endpoints, and gives direct USGS Benton gauge bands for the corridor. USGS Water Services returned same-day discharge and stage during this run, and the selected route finishes before the downstream spillway hazard that complicates lower Saline splits."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Tony Kelly Ford to Lyle Park, 8.2 miles",
        "note": "AGFC lists Tony Kelly Ford to Lyle Park as an exact Saline River Water Trail segment with a 4 to 6 hour float time under normal conditions.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07363000",
        "note": "USGS Water Services returned same-day Saline River at Benton values of 157 cfs and 3.64 ft at 2026-06-22 19:30 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07363000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Stage model",
        "value": "3.5 / 3.6-5.0 / 5.0 ft",
        "note": "AGFC labels 3.5 ft and below as low, 3.6-4.0 ft as typical, 4.1-5.0 ft as optimum, and 5.1-5.5 ft as high experienced-only water. Paddle Today uses 3.6-5.0 ft as the broad audience band and treats water above 5.0 ft as outside the general recommendation.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Put-in access",
        "value": "Tony Kelly Ford Access, 34.5844, -92.6938",
        "note": "AGFC publishes Tony Kelly Ford Access as a named public Saline River Water Trail access with a Google Maps coordinate link.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Take-out access",
        "value": "Lyle Park Access, 34.5873, -92.6051",
        "note": "AGFC publishes Lyle Park Access as a named public Saline River Water Trail access with a Google Maps coordinate link.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Route character",
        "value": "Deep pools, fast chutes, riffles, small waves",
        "note": "AGFC says paddlers can expect deep pools, fast chutes, riffles, and small waves on this Benton reach, with about two miles per hour travel under normal conditions.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Saline River Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "USGS 07363000 Saline River at Benton",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07363000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07363000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07363000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-illinois-river-chamber-springs-siloam-kayak-park",
    "slug": "upper-illinois-river-chamber-springs-siloam-kayak-park",
    "name": "Illinois River",
    "reach": "Chamber Springs Access to Siloam Springs Kayak Park",
    "aliases": [
      "Upper Illinois River - Chamber Springs to Siloam Springs Kayak Park",
      "Upper Illinois River Water Trail upper segment",
      "AGFC Upper Illinois Chamber Springs to Fisher Ford"
    ],
    "state": "Arkansas",
    "region": "Northwest Arkansas",
    "summary": "Upper Illinois River day from Chamber Springs Access to Siloam Springs Kayak Park. AGFC documents the exact 8.1-mile segment, the direct Siloam Springs gauge, and a clear 200 to 1,000 cfs broad-audience window, while the take-out still needs care around the kayak-park features.",
    "statusText": "Use the Illinois River near Siloam Springs gauge. Around 200 to 1,000 cfs is the broad paddle window; below 200 cfs may be too low to float well, and above 1,000 cfs AGFC says the river is for experienced floaters only.",
    "latitude": 36.166937,
    "longitude": -94.434458,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "The river is generally gentle between accesses, but the Siloam Springs Kayak Park take-out includes Class II+ features that less-experienced paddlers may want to carry around.",
        "Much of the river corridor is private property; avoid trespassing and use only the named public accesses.",
        "Heavy rain can raise the Illinois quickly and turn a mellow float into a pushier current day."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07195400",
      "provider": "usgs",
      "siteId": "07195400",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Illinois River at Hwy. 16 near Siloam Springs, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07195400/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 200,
      "idealMax": 1000,
      "tooLow": 200,
      "tooHigh": 1000,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Upper Illinois River Water Trail flow guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "AGFC presents this as a warm-season float with one direct gauge for the corridor. Recent rain can improve low water but can also push the river above the broad-audience band quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "Most of the run is a scenic Ozark stream float, but the distance, private-bank limits, and the Class II+ kayak-park take-out keep it above the easy bucket for brand-new paddlers.",
      "confidenceNotes": "Confidence is high: AGFC publishes Chamber Springs to Siloam Springs Kayak Park as an exact 8.1-mile Upper Illinois River Water Trail segment, provides public-access coordinates for both ends, ties the corridor to direct USGS gauge 07195400 near Siloam Springs, and gives a clear 200 to 1,000 cfs best-flow band with experienced-only language above that. The route also has practical nearby camping/outfitter support, though the selected current gauge reading in this run was well above the general recommendation."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Chamber Springs to Siloam Springs Kayak Park, 8.1 miles",
        "note": "AGFC lists Chamber Springs to Siloam Springs Kayak Park as one of the two official Upper Illinois River Water Trail segments.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07195400",
        "note": "USGS Water Services returned same-day Illinois River near Siloam Springs values of 4,920 cfs and 11.74 ft at 2026-06-22 19:00 CDT during this run, well above the broad public recommendation.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07195400&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Flow model",
        "value": "200 / 200-1,000 / 1,000 cfs",
        "note": "AGFC says the best level for floating the river is between 200 and 1,000 cfs, that levels below 200 cfs may be too low to float, and that water above 1,000 cfs is for experienced floaters only.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      },
      {
        "label": "Put-in access",
        "value": "Chamber Springs Access, 36.166937, -94.434458",
        "note": "AGFC publishes Chamber Springs Access as a named public water-trail access with a coordinate-linked map pin.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      },
      {
        "label": "Take-out access",
        "value": "Siloam Springs Kayak Park, 36.12361, -94.51751",
        "note": "AGFC publishes Siloam Springs Kayak Park as the downstream access for this route and notes the park has Class II+ features that can be carried around.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      },
      {
        "label": "Camping and basecamp context",
        "value": "Nearby campgrounds and outfitters",
        "note": "AGFC lists Gypsy Camp and Canoe plus Illinois River RV and Campground as nearby trip-support options for paddlers on the Upper Illinois corridor.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Upper Illinois River Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "USGS 07195400 Illinois River near Siloam Springs",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07195400/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07195400 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07195400&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Illinois River Watershed Partnership recreation guide",
        "url": "https://www.irwp.org/recreation-on-the-illinois-river",
        "provider": "local"
      }
    ]
  },
  {
    "id": "upper-illinois-river-siloam-kayak-park-woka",
    "slug": "upper-illinois-river-siloam-kayak-park-woka",
    "name": "Illinois River",
    "reach": "Siloam Springs Kayak Park to WOKA Whitewater Park",
    "aliases": [
      "Upper Illinois River - Siloam Springs Kayak Park to WOKA",
      "Upper Illinois River Water Trail lower segment",
      "AGFC Upper Illinois Fisher Ford to WOKA"
    ],
    "state": "Arkansas",
    "region": "Northwest Arkansas",
    "routeType": "whitewater",
    "summary": "Lower Upper-Illinois Water Trail segment from Siloam Springs Kayak Park to WOKA Whitewater Park. AGFC documents the exact 7.4-mile route and direct Siloam gauge, but both ends include Class II+ park features that make this a guarded whitewater-style add rather than a casual flatwater recommendation.",
    "statusText": "Use the Illinois River near Siloam Springs gauge. Around 200 to 1,000 cfs is the broad target band; above 1,000 cfs AGFC says this river is for experienced floaters only, and both whitewater-park features deserve extra caution.",
    "latitude": 36.12361,
    "longitude": -94.51751,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Siloam Springs Kayak Park and WOKA Whitewater Park both have Class II+ rapids; paddlers should scout and carry around features they do not want to run.",
        "The corridor still runs through mostly private banks, so use only the named public access points.",
        "High or rising water materially increases consequence at the park features and along faster bends."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07195400",
      "provider": "usgs",
      "siteId": "07195400",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Illinois River at Hwy. 16 near Siloam Springs, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07195400/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 200,
      "idealMax": 1000,
      "tooLow": 200,
      "tooHigh": 1000,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Upper Illinois River Water Trail flow guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "AGFC gives one Illinois River gauge and one shared flow ladder for the full two-state trail. Rain can make the reach work after lower periods, but it can also push this downstream segment into experienced-only current quickly.",
      "difficulty": "hard",
      "difficultyNotes": "Most of the mileage is easier moving water, but the route begins at Siloam Springs Kayak Park and ends at WOKA Whitewater Park, both of which AGFC says include Class II+ rapids. That makes this a protected whitewater-style route even though paddlers can carry around the features.",
      "confidenceNotes": "Confidence is good for a guarded add: AGFC publishes Siloam Springs Kayak Park to WOKA Whitewater Park as an exact 7.4-mile segment with coordinate-linked public endpoints, the direct USGS 07195400 gauge serves the corridor, and AGFC gives a clear 200 to 1,000 cfs best-flow band plus experienced-only language above 1,000 cfs. The current gauge reading during this run was far above the broad-audience band, so the route copy stays conservative and feature-focused."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Siloam Springs Kayak Park to WOKA Whitewater Park, 7.4 miles",
        "note": "AGFC lists Siloam Springs Kayak Park to WOKA Whitewater Park as the downstream segment of the Upper Illinois River Water Trail.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07195400",
        "note": "USGS Water Services returned same-day Illinois River near Siloam Springs values of 4,920 cfs and 11.74 ft at 2026-06-22 19:00 CDT during this run, well above the broad public recommendation.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07195400&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Flow model",
        "value": "200 / 200-1,000 / 1,000 cfs",
        "note": "AGFC says the best level for floating the river is between 200 and 1,000 cfs, that levels below 200 cfs may be too low to float, and that water above 1,000 cfs is for experienced floaters only.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      },
      {
        "label": "Access coordinates",
        "value": "Siloam Springs Kayak Park 36.12361, -94.51751; WOKA Whitewater Park 36.13388, -94.5661",
        "note": "AGFC publishes coordinate-linked public access pins for both whitewater parks on the Arkansas-Oklahoma corridor.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      },
      {
        "label": "Whitewater-park cautions",
        "value": "Class II+ rapids at both parks",
        "note": "AGFC says Siloam Springs Kayak Park (Fisher Ford) and WOKA Whitewater Park both have Class II+ rapids and paddlers should feel free to carry boats around both to avoid capsizing.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      },
      {
        "label": "Camping and basecamp context",
        "value": "Nearby campgrounds and outfitters",
        "note": "AGFC lists Gypsy Camp and Canoe, Illinois River RV and Campground, WOKA Whitewater Park, and Siloam Springs Whitewater Park as nearby support resources for paddlers on the trail.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Upper Illinois River Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "USGS 07195400 Illinois River near Siloam Springs",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07195400/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07195400 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07195400&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Illinois River Watershed Partnership recreation guide",
        "url": "https://www.irwp.org/recreation-on-the-illinois-river",
        "provider": "local"
      }
    ]
  },
  {
    "id": "ouachita-river-dragover-west-east",
    "slug": "ouachita-river-dragover-west-east",
    "name": "Ouachita River",
    "reach": "Dragover Day Use west access to east access",
    "aliases": [
      "Ouachita River - Dragover",
      "Upper Ouachita River - Dragover Day Use",
      "Upper Ouachita River near Mount Ida"
    ],
    "state": "Arkansas",
    "region": "Ouachita Mountains",
    "routeType": "whitewater",
    "summary": "Short upper Ouachita whitewater lap inside Dragover Day Use, from the upstream/west landing to the downstream/east landing. USFS confirms the public canoe-launching site, American Whitewater identifies the exact 2.9-mile Class I-II reach and landing coordinates, and the direct Mount Ida USGS gauge is live.",
    "statusText": "Use the Ouachita River near Mount Ida stage gauge. Around 3.0 ft is the conservative low-water floor; below that, expect scraping and more rock contact. American Whitewater lists the route runnable up to about 5.0 ft, but above that the short whitewater gets pushier and is outside this conservative recommendation.",
    "latitude": 34.6375007629395,
    "longitude": -93.6297988891602,
    "gaugeSource": {
      "id": "usgs-07356000",
      "provider": "usgs",
      "siteId": "07356000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Ouachita River near Mount Ida, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07356000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise"
      ],
      "safetyNotes": [
        "Short Class I-II whitewater run with steep access, rock gardens, and named features including Hungry Hole and Big Rock; scout first if anyone in the group is not comfortable reading current and recovering from a swim.",
        "Treat 3.0 ft as the conservative floor and be more careful as the gauge climbs toward or above 5.0 ft, when the run gets pushier than this recommendation is built for.",
        "The route stays inside Dragover Day Use, but the downstream/east landing still needs an exit plan. Confirm the take-out before putting on and do not assume rescue or cell coverage will be easy."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 3,
      "thresholdSource": {
        "label": "American Whitewater Dragover gauge range",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/2699/main",
        "provider": "american_whitewater"
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
      "seasonNotes": "USFS keeps Dragover Day Use open all year, but this short upper Ouachita run is highly rain-sensitive. Low summer water can get scrapey, while thunderstorms and fresh runoff can steepen the route quickly even though the mileage is short.",
      "difficulty": "moderate",
      "difficultyNotes": "American Whitewater rates Dragover Class I-II, but the run is still whitewater rather than a casual scenic float. Steep stair-and-roller access, rock contact at lower stages, and quick rises justify a moderate skill stance.",
      "confidenceNotes": "Confidence is good for a conservative Arkansas whitewater add: USFS confirms Dragover Day Use is a public Ouachita River canoe-launching site with no-fee day-use access; American Whitewater identifies the exact 2.9-mile west-access-to-east-access reach, exposes distinct endpoint coordinates, and ties it directly to USGS 07356000 with a current 3.0-5.0 ft runnable range; and Water Services IV returned same-day June 17, 2026 stage and discharge values for 07356000 in this workspace. The app uses only the 3.0 ft floor and does not infer a broader preferred window from AW's high-runnable ceiling."
    },
    "evidenceNotes": [
      {
        "label": "Official public access",
        "value": "Dragover Day Use canoe-launching site",
        "note": "USFS says Dragover Day Use is open all year, no fee, and provides Ouachita River access with canoe launching at the public day-use site.",
        "sourceUrl": "https://www.fs.usda.gov/r08/ouachita/recreation/dragover-day-use"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07356000 at 4.50 ft / 984 cfs",
        "note": "USGS Water Services IV returned same-day June 17, 2026 values for Ouachita River near Mount Ida during implementation, confirming the direct stage and discharge path used for the route.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07356000"
      },
      {
        "label": "Threshold floor",
        "value": "3.0 ft minimum-only",
        "note": "American Whitewater ties Dragover directly to USGS 07356000 and currently exposes a 3.0-5.0 ft runnable range. Paddle Today uses only the 3.0 ft low-water floor and keeps the higher end as a caveat rather than a scoring band.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/2699/main"
      },
      {
        "label": "Endpoint coordinates",
        "value": "34.6375007629395, -93.6297988891602 to 34.6383018493652, -93.6266021728516",
        "note": "American Whitewater feature data exposes exact upstream/west put-in and downstream/east take-out coordinates for the Dragover reach, while USFS independently confirms the shared Dragover Day Use public-site context.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/2699/main"
      },
      {
        "label": "Core hazards",
        "value": "2.9 mi Class I-II with Hungry Hole and Big Rock",
        "note": "American Whitewater describes Dragover as a 2.9-mile Class I-II reach with a steep stair-and-roller launch, Hungry Hole, Big Rock, and other short-feature hazards that still deserve whitewater judgment.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/2699/main"
      }
    ],
    "sourceLinks": [
      {
        "label": "USFS Dragover Day Use",
        "url": "https://www.fs.usda.gov/r08/ouachita/recreation/dragover-day-use",
        "provider": "local"
      },
      {
        "label": "American Whitewater Dragover reach",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/2699/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 07356000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07356000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07356000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=07356000",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "saline-river-peeler-bend-lyle-park",
    "slug": "saline-river-peeler-bend-lyle-park",
    "name": "Saline River",
    "reach": "Peeler Bend to Lyle Park Access",
    "aliases": [
      "Saline River - Peeler Bend to Lyle Park",
      "Saline River Water Trail mid Benton segment",
      "Arkansas Water Trails Peeler to Lyle"
    ],
    "state": "Arkansas",
    "region": "Central Arkansas",
    "summary": "Mid-Benton Saline split from Peeler Bend to Lyle Park. AGFC documents the exact 3.8-mile segment, both public accesses, and the direct Benton gauge bands, making this a shorter trust-first option before the lower-river spillway hazard.",
    "statusText": "Use the Saline River at Benton gauge. Around 3.6 to 5.0 ft is the broad paddle window for this segment; below about 3.5 ft expect more dragging, and above about 5.0 ft AGFC treats the river as experienced-only water.",
    "latitude": 34.5852,
    "longitude": -92.6467,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "The Saline can rise quickly after rain and shift from clear moving water to pushier current with little warning.",
        "Stay with the named public access points and avoid private banks along the corridor.",
        "Wood, strainers, and muddy exits become more consequential as the river climbs above the normal range."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07363000",
      "provider": "usgs",
      "siteId": "07363000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Saline River at Benton, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07363000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3.6,
      "idealMax": 5,
      "tooLow": 3.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Saline River Water Trail gauge bands",
        "url": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "AGFC frames the Saline as rainfall dependent year-round moving water. Spring through early fall is workable when the Benton gauge is in range, but flashy post-storm rises can quickly turn this shorter split into a stronger current day.",
      "difficulty": "easy",
      "difficultyNotes": "This is the shortest Benton Saline split being added in this run, but AGFC still describes deep pools, fast chutes, riffles, and small waves. Treat it as approachable moving water rather than as flatwater.",
      "confidenceNotes": "Confidence is high for a conservative Arkansas add: AGFC publishes Peeler Bend to Lyle Park as an exact 3.8-mile Saline River Water Trail segment, exposes public-access coordinates for both endpoints, and gives direct Benton gauge bands for the corridor. USGS Water Services returned same-day discharge and stage during this run, though the selected current reading sat below the preferred window."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Peeler Bend to Lyle Park, 3.8 miles",
        "note": "AGFC lists Peeler Bend to Lyle Park as an exact Saline River Water Trail segment and identifies it as a 2 to 3 hour float under normal conditions.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07363000",
        "note": "USGS Water Services returned same-day Saline River at Benton values of 72.0 cfs and 3.47 ft at 2026-06-25 03:30 CDT during this run, below the broad public recommendation.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07363000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Stage model",
        "value": "3.5 / 3.6-5.0 / 5.0 ft",
        "note": "AGFC labels 3.5 ft and below as low, 3.6-4.0 ft as typical, 4.1-5.0 ft as optimum, and 5.1-5.5 ft as high experienced-only water. Paddle Today uses 3.6-5.0 ft as the broad audience band and treats water above 5.0 ft as outside the general recommendation.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Put-in access",
        "value": "Peeler Bend, 34.5852, -92.6467",
        "note": "AGFC publishes Peeler Bend as a named public Saline River Water Trail access with a Google Maps coordinate link.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Take-out access",
        "value": "Lyle Park Access, 34.5873, -92.6051",
        "note": "AGFC publishes Lyle Park Access as a named public Saline River Water Trail access with a Google Maps coordinate link.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Route character",
        "value": "Deep pools, fast chutes, riffles, small waves",
        "note": "AGFC says paddlers can expect deep pools, fast chutes, riffles, and small waves on this Benton reach, with about two miles per hour travel under normal conditions.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Saline River Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "USGS 07363000 Saline River at Benton",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07363000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07363000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07363000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "saline-river-lyle-park-saline-crossing",
    "slug": "saline-river-lyle-park-saline-crossing",
    "name": "Saline River",
    "reach": "Lyle Park Access to Saline Crossing Access",
    "aliases": [
      "Saline River - Lyle Park to Saline Crossing",
      "Saline River Water Trail lower Benton segment",
      "Arkansas Water Trails Lyle to Saline Crossing"
    ],
    "state": "Arkansas",
    "region": "Central Arkansas",
    "summary": "Lower Benton Saline River day from Lyle Park to Saline Crossing. AGFC documents the exact 4.2-mile route, both public accesses, the direct Benton gauge ladder, and the low-dam / low-bridge hazard package, so this route ships with explicit mandatory-portage caveats rather than casual flatwater framing.",
    "statusText": "Use the Saline River at Benton gauge. Around 3.6 to 5.0 ft is the broad paddle window; below about 4.0 ft AGFC says to portage around the Benton Water Purification Plant spillway, and above about 5.0 ft the lower route becomes experienced-only with tighter bridge clearance.",
    "latitude": 34.5873,
    "longitude": -92.6051,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "low_head_dam",
        "mandatory_takeout",
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "A Benton Water Purification Plant spillway or low dam sits about 1.6 miles below Lyle Park. AGFC says to portage around it when the river is below 4 ft.",
        "AGFC also warns the downstream low-water bridge becomes a tighter hazard as the river rises; at 6 ft there is not enough air space to pass under it and portage becomes mandatory.",
        "The Saline can rise quickly after rain, and fresh wood or strainers can turn this short lower segment into a much more consequential run."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07363000",
      "provider": "usgs",
      "siteId": "07363000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Saline River at Benton, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07363000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3.6,
      "idealMax": 5,
      "tooLow": 3.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Saline River Water Trail gauge bands",
        "url": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "AGFC frames the Saline as rainfall dependent year-round moving water. Spring through early fall is workable when the Benton gauge is in range, but quick post-storm rises raise the lower-route hazard package quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is modest, but this is not a casual pond float. AGFC describes deep pools, fast chutes, riffles, and small waves, and the lower Benton hazard package requires active scouting and portage judgment.",
      "confidenceNotes": "Confidence is good for a guarded add: AGFC publishes Lyle Park to Saline Crossing as an exact 4.2-mile public Saline River Water Trail route, exposes source-backed access coordinates for both ends, ties the corridor to the direct Benton USGS gauge, and gives explicit spillway and low-water-bridge safety rules for the lower river."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Lyle Park to Saline Crossing, 4.2 miles",
        "note": "AGFC identifies Lyle Park to Saline Crossing as a reviewed lower Saline route with 2 to 3 hour timing in the typical and optimum bands.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07363000",
        "note": "USGS Water Services returned same-day Saline River at Benton values of 329 cfs and 4.00 ft at 2026-07-06 13:30 CDT during this run, inside AGFC's typical-to-optimum lower-route window.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07363000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Stage model",
        "value": "3.5 / 3.6-5.0 / 5.0 ft",
        "note": "AGFC labels 3.5 ft and below as low, 3.6-4.0 ft as typical, 4.1-5.0 ft as optimum, and 5.1-5.5 ft as high experienced-only water. Paddle Today uses 3.6-5.0 ft as the broad audience band and treats water above 5.0 ft as outside the general recommendation.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "Lyle Park Access 34.5873, -92.6051; Saline Crossing Access 34.54106, -92.60718",
        "note": "AGFC publishes both public lower-route accesses as named map-linked Saline River Water Trail points.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Lower-route hazard rules",
        "value": "Spillway portage below 4 ft; low bridge mandatory at 6 ft",
        "note": "AGFC says the Benton Water Purification Plant spillway or low dam is hazardous and should be portaged when the river is below 4 ft, and that the downstream low-water bridge has insufficient clearance at 6 ft.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Camping classification",
        "value": "none",
        "note": "The reviewed AGFC route materials did not identify legal route camping for Lyle Park or Saline Crossing, and nearby banks should be treated as private.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Saline River Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "USGS 07363000 Saline River at Benton",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07363000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07363000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07363000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "saline-river-peeler-bend-saline-crossing",
    "slug": "saline-river-peeler-bend-saline-crossing",
    "name": "Saline River",
    "reach": "Peeler Bend to Saline Crossing Access",
    "aliases": [
      "Saline River - Peeler Bend to Saline Crossing",
      "Saline River Water Trail middle-to-lower Benton segment",
      "Arkansas Water Trails Peeler to Saline Crossing"
    ],
    "state": "Arkansas",
    "region": "Central Arkansas",
    "summary": "Extended lower Benton Saline route from Peeler Bend to Saline Crossing. AGFC documents the public Peeler-to-Lyle and Lyle-to-Saline segments, the direct Benton gauge ladder, and the spillway / low-bridge caution package, so this combined route ships with explicit lower-river hazard messaging.",
    "statusText": "Use the Saline River at Benton gauge. Around 3.6 to 5.0 ft is the broad paddle window; below about 4.0 ft expect the spillway portage below Lyle Park, and above about 5.0 ft AGFC treats the lower river as experienced-only water.",
    "latitude": 34.5852,
    "longitude": -92.6467,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "low_head_dam",
        "mandatory_takeout",
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This route includes the lower Benton spillway or low dam below Lyle Park. AGFC says to portage around it when the river is below 4 ft.",
        "The downstream low-water bridge becomes a stronger clearance problem as water rises; AGFC says there is not enough air space at 6 ft and portage is mandatory.",
        "Because this route links the shorter mid-river and lower-river segments, fatigue and slower decision-making can turn a modest hazard into a real problem late in the day."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07363000",
      "provider": "usgs",
      "siteId": "07363000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Saline River at Benton, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07363000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3.6,
      "idealMax": 5,
      "tooLow": 3.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Saline River Water Trail gauge bands",
        "url": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "AGFC frames the Saline as rainfall dependent year-round moving water. Spring through early fall is workable, but this longer lower split should stay conservative because the spillway and bridge hazards get less forgiving after rain.",
      "difficulty": "moderate",
      "difficultyNotes": "The Saline here is still a moving-water run with deep pools, riffles, and quick turns rather than flatwater. The added mileage plus the lower-river portage rules make this more demanding than the short Peeler-to-Lyle split.",
      "confidenceNotes": "Confidence is good for a guarded combined route: AGFC publishes Peeler Bend to Lyle Park and Lyle Park to Saline Crossing as public lower-Saline route pieces under the same Benton gauge ladder, and the same route-manager page supplies the lower-river spillway and bridge hazard rules needed to keep the route defensible."
    },
    "evidenceNotes": [
      {
        "label": "Official route geometry",
        "value": "Peeler Bend to Lyle Park 3.8 miles plus Lyle Park to Saline Crossing 4.2 miles",
        "note": "AGFC publishes both public lower-Saline segments, supporting an 8.0-mile Peeler Bend to Saline Crossing route through the same reviewed corridor.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07363000",
        "note": "USGS Water Services returned same-day Saline River at Benton values of 329 cfs and 4.00 ft at 2026-07-06 13:30 CDT during this run, inside AGFC's typical-to-optimum lower-route window.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07363000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Stage model",
        "value": "3.5 / 3.6-5.0 / 5.0 ft",
        "note": "AGFC labels 3.5 ft and below as low, 3.6-4.0 ft as typical, 4.1-5.0 ft as optimum, and 5.1-5.5 ft as high experienced-only water. Paddle Today uses 3.6-5.0 ft as the broad audience band and treats water above 5.0 ft as outside the general recommendation.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "Peeler Bend 34.5852, -92.6467; Saline Crossing Access 34.54106, -92.60718",
        "note": "AGFC publishes both public route endpoints as named map-linked Saline River Water Trail accesses.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Lower-route hazard rules",
        "value": "Spillway portage below 4 ft; low bridge mandatory at 6 ft",
        "note": "AGFC says the Benton Water Purification Plant spillway or low dam is hazardous and should be portaged when the river is below 4 ft, and that the downstream low-water bridge has insufficient clearance at 6 ft.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Camping classification",
        "value": "none",
        "note": "The reviewed AGFC route materials did not identify legal route camping at Peeler Bend, Lyle Park, or Saline Crossing, and nearby banks should be treated as private.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Saline River Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "USGS 07363000 Saline River at Benton",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07363000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07363000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07363000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "saline-river-tony-kelly-saline-crossing",
    "slug": "saline-river-tony-kelly-saline-crossing",
    "name": "Saline River",
    "reach": "Tony Kelly Ford Access to Saline Crossing Access",
    "aliases": [
      "Saline River - Tony Kelly to Saline Crossing",
      "Saline River Water Trail extended Benton route",
      "Arkansas Water Trails Tony Kelly to Saline Crossing"
    ],
    "state": "Arkansas",
    "region": "Central Arkansas",
    "summary": "Long Benton Saline River day from Tony Kelly Ford to Saline Crossing. AGFC documents the public Tony Kelly-to-Lyle and Lyle-to-Saline pieces, the direct Benton gauge ladder, and the lower-river spillway / bridge hazard package, making this a longer guarded add rather than a casual float recommendation.",
    "statusText": "Use the Saline River at Benton gauge. Around 3.6 to 5.0 ft is the broad paddle window; below about 4.0 ft expect the spillway portage below Lyle Park, and above about 5.0 ft AGFC treats the lower river as experienced-only water.",
    "latitude": 34.5844,
    "longitude": -92.6938,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "low_head_dam",
        "mandatory_takeout",
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This route adds upper-mileage commitment before the same lower Benton spillway or low-dam portage. AGFC says to portage around that hazard when the river is below 4 ft.",
        "The downstream low-water bridge becomes a stronger clearance problem as water rises; AGFC says there is not enough air space at 6 ft and portage is mandatory.",
        "Longer mileage, heat, and fewer clean public exits after Lyle Park make this route less forgiving than the shorter Saline splits if weather or pace deteriorates."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07363000",
      "provider": "usgs",
      "siteId": "07363000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Saline River at Benton, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07363000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3.6,
      "idealMax": 5,
      "tooLow": 3.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Saline River Water Trail gauge bands",
        "url": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "AGFC frames the Saline as rainfall dependent year-round moving water. Spring through early fall is workable, but this longer downstream combination should stay conservative because the lower-route hazards and commitment stack up quickly after storms.",
      "difficulty": "moderate",
      "difficultyNotes": "The current stays in the recreational moving-water range when the gauge is right, but this is a longer 12-plus-mile commitment with riffles, shoals, fast chutes, and the same lower-river hazard package as the shorter downstream split.",
      "confidenceNotes": "Confidence is good for a guarded combined route: AGFC publishes Tony Kelly Ford to Lyle Park and Lyle Park to Saline Crossing as public route pieces under the same Benton gauge ladder, and the route-manager page also documents the spillway and low-water-bridge rules needed to keep the extended lower corridor defensible."
    },
    "evidenceNotes": [
      {
        "label": "Official route geometry",
        "value": "Tony Kelly Ford to Lyle Park 8.2 miles plus Lyle Park to Saline Crossing 4.2 miles",
        "note": "AGFC publishes both public route pieces, supporting a 12.4-mile Tony Kelly Ford to Saline Crossing day through the same reviewed Benton corridor.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07363000",
        "note": "USGS Water Services returned same-day Saline River at Benton values of 329 cfs and 4.00 ft at 2026-07-06 13:30 CDT during this run, inside AGFC's typical-to-optimum lower-route window.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07363000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Stage model",
        "value": "3.5 / 3.6-5.0 / 5.0 ft",
        "note": "AGFC labels 3.5 ft and below as low, 3.6-4.0 ft as typical, 4.1-5.0 ft as optimum, and 5.1-5.5 ft as high experienced-only water. Paddle Today uses 3.6-5.0 ft as the broad audience band and treats water above 5.0 ft as outside the general recommendation.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "Tony Kelly Ford Access 34.5844, -92.6938; Saline Crossing Access 34.54106, -92.60718",
        "note": "AGFC publishes both public route endpoints as named map-linked Saline River Water Trail accesses.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Lower-route hazard rules",
        "value": "Spillway portage below 4 ft; low bridge mandatory at 6 ft",
        "note": "AGFC says the Benton Water Purification Plant spillway or low dam is hazardous and should be portaged when the river is below 4 ft, and that the downstream low-water bridge has insufficient clearance at 6 ft.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      },
      {
        "label": "Camping classification",
        "value": "none",
        "note": "The reviewed AGFC route materials did not identify legal route camping at Tony Kelly Ford or Saline Crossing, and nearby banks should be treated as private.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Saline River Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/saline-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "USGS 07363000 Saline River at Benton",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07363000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07363000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07363000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-illinois-river-chamber-springs-woka",
    "slug": "upper-illinois-river-chamber-springs-woka",
    "name": "Illinois River",
    "reach": "Chamber Springs Access to WOKA Whitewater Park",
    "aliases": [
      "Upper Illinois River - Chamber Springs to WOKA",
      "Upper Illinois River Water Trail full Arkansas-to-Oklahoma segment",
      "AGFC Upper Illinois Chamber Springs to WOKA"
    ],
    "state": "Arkansas",
    "region": "Northwest Arkansas",
    "routeType": "whitewater",
    "summary": "Full Upper Illinois Water Trail route from Chamber Springs Access to WOKA Whitewater Park. AGFC documents the exact 15.5-mile corridor and direct Siloam gauge, but the long mileage plus Class II+ park features at the midpoint and finish make this a guarded whitewater-style add rather than a casual day float.",
    "statusText": "Use the Illinois River near Siloam Springs gauge. Around 200 to 1,000 cfs is the broad target band; below 200 cfs may be too low to float well, and above 1,000 cfs AGFC says the river is for experienced floaters only.",
    "latitude": 36.166937,
    "longitude": -94.434458,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "The route passes through Siloam Springs Kayak Park and ends at WOKA Whitewater Park, and AGFC says both parks include Class II+ rapids that paddlers may want to carry around.",
        "Much of the river corridor is private property; avoid trespassing and use only the named public accesses.",
        "Heavy rain can raise the Illinois quickly and turn a long scenic float into a pushier current day with more consequence at both park features."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07195400",
      "provider": "usgs",
      "siteId": "07195400",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Illinois River at Hwy. 16 near Siloam Springs, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07195400/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 200,
      "idealMax": 1000,
      "tooLow": 200,
      "tooHigh": 1000,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Upper Illinois River Water Trail flow guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "AGFC presents the Upper Illinois as a warm-season corridor with one direct gauge for the full route. Recent rain can improve low water but can also push this long run above the broad-audience band quickly.",
      "difficulty": "hard",
      "difficultyNotes": "Most of the corridor is scenic moving water, but 15.5 miles plus Class II+ park features at Siloam Springs and WOKA make this a committed route for groups that can manage a long day and scout or carry features as needed.",
      "confidenceNotes": "Confidence is good for a guarded add: AGFC publishes Chamber Springs to WOKA as an exact 15.5-mile Upper Illinois River Water Trail segment, provides coordinate-linked public access pins at both ends, ties the corridor to direct USGS gauge 07195400 near Siloam Springs, and gives a clear 200 to 1,000 cfs best-flow band with experienced-only language above that. The current gauge reading during this run was far above the broad-audience band, so the route copy stays conservative and feature-focused."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Chamber Springs to WOKA Whitewater Park, 15.5 miles",
        "note": "AGFC lists Chamber Springs to WOKA Whitewater Park as the full Upper Illinois River Water Trail route.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07195400",
        "note": "USGS Water Services returned same-day Illinois River near Siloam Springs values of 3,050 cfs and 9.92 ft at 2026-06-25 04:00 CDT during this run, well above the broad public recommendation.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07195400&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Flow model",
        "value": "200 / 200-1,000 / 1,000 cfs",
        "note": "AGFC says the best level for floating the river is between 200 and 1,000 cfs, that levels below 200 cfs may be too low to float, and that water above 1,000 cfs is for experienced floaters only.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      },
      {
        "label": "Access coordinates",
        "value": "Chamber Springs Access 36.166937, -94.434458; WOKA Whitewater Park 36.13388, -94.5661",
        "note": "AGFC publishes coordinate-linked public access pins for both ends of the full Arkansas-to-Oklahoma corridor.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      },
      {
        "label": "Whitewater-park cautions",
        "value": "Class II+ rapids at Siloam Springs and WOKA",
        "note": "AGFC says Siloam Springs Kayak Park and WOKA Whitewater Park both have Class II+ rapids and paddlers should feel free to carry boats around both to avoid capsizing.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      },
      {
        "label": "Camping and basecamp context",
        "value": "Nearby campgrounds and outfitters",
        "note": "AGFC lists Gypsy Camp and Canoe, Illinois River RV and Campground, and the two whitewater parks as nearby support resources for paddlers on the full corridor.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Upper Illinois River Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/upper-illinois-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "USGS 07195400 Illinois River near Siloam Springs",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07195400/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07195400 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07195400&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Illinois River Watershed Partnership recreation guide",
        "url": "https://www.irwp.org/recreation-on-the-illinois-river",
        "provider": "local"
      }
    ]
  },
  {
    "id": "crooked-creek-lower-pyatt-kelleys-slab",
    "slug": "crooked-creek-lower-pyatt-kelleys-slab",
    "name": "Crooked Creek",
    "reach": "Lower Pyatt Access to Kelley's Slab Access",
    "aliases": [
      "Crooked Creek - Lower Pyatt to Kelley's Slab",
      "Crooked Creek Water Trail access-planner corridor",
      "AGFC Crooked Creek Lower Pyatt to Kelley's Slab"
    ],
    "state": "Arkansas",
    "region": "Ozark Arkansas",
    "summary": "Crooked Creek access-planner corridor from Lower Pyatt Access through Snow and Mark Oliver to Kelley's Slab. AGFC documents the exact public access chain and the Kelly Crossing gauge, but the official numeric guidance is limited to a 12-12.5 ft moderate band, so this route ships with conservative minimum-only scoring.",
    "statusText": "Use the Crooked Creek at Kelly Crossing gauge. AGFC calls 12 to 12.5 ft a moderate floating level; below about 12 ft expect more dragging and slower riffles, and higher water deserves extra caution because the creek can rise fast and AGFC does not publish a full high-water ladder.",
    "latitude": 36.24665,
    "longitude": -92.83494,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Crooked Creek can rise quickly after heavy spring or summer rain and turn from a clear smallmouth float into a faster, pushier current day.",
        "Almost all property along the creek is private; use only the named public access points and camp only where AGFC explicitly allows it.",
        "Shoals, riffles, fresh wood, and muddy or gravelly exits become more consequential when the creek is below the moderate band or rising fast."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055607",
      "provider": "usgs",
      "siteId": "07055607",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Crooked Creek at Kelly Crossing at Yellville, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055607/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 12,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Crooked Creek moderate-level guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "AGFC frames Crooked Creek as rainfall dependent moving water. Spring through early fall is the main floating season, but quick rain-driven rises can change the route much faster than on larger regulated rivers.",
      "difficulty": "moderate",
      "difficultyNotes": "This is not whitewater, but AGFC still describes deep pools, fast chutes, riffles, and small waves. Treat it as a rural moving-water trip rather than a flatwater float.",
      "confidenceNotes": "Confidence is good for a conservative add: AGFC publishes Lower Pyatt, Snow, Mark Oliver, and Kelley's Slab as one documented Crooked Creek Water Trail access chain with exact segment mileages, exposes coordinate-linked public access pins, and ties the corridor to direct USGS gauge 07055607 near Kelly Crossing. Because AGFC only publishes a 12-12.5 ft moderate floating band rather than a full low/ideal/high ladder, Paddle Today uses a minimum-only floor at 12 ft and keeps higher-water messaging cautious."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Lower Pyatt Access to Kelley's Slab Access, about 18.5 miles",
        "note": "AGFC lists Lower Pyatt-to-Snow, Snow-to-Mark Oliver, and Mark Oliver-to-Kelley's Slab as exact Crooked Creek Water Trail segments.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055607",
        "note": "USGS Water Services returned same-day Crooked Creek at Kelly Crossing values of 513 cfs and 12.05 ft at 2026-07-02 02:45 CDT during this run, inside AGFC's moderate band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055607&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Level guidance",
        "value": "12-12.5 ft moderate floating band",
        "note": "AGFC says a moderate level for floating Crooked Creek is 12-12.5 ft at the Kelly Crossing gauge. Paddle Today treats 12 ft as the conservative minimum-only floor because AGFC does not publish a complete high-water ladder for this route family.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Put-in access",
        "value": "Lower Pyatt Access, 36.24665, -92.83494",
        "note": "AGFC publishes Lower Pyatt Access as a named public Crooked Creek Water Trail access with a Google Maps coordinate link.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Take-out access",
        "value": "Kelley's Slab Access, 36.22921, -92.71045",
        "note": "AGFC publishes Kelley's Slab Access as a named public Crooked Creek Water Trail access with a Google Maps coordinate link and hazard caveat.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Camping support",
        "value": "Snow, Brooksher, and Fred Berry camping support",
        "note": "AGFC identifies primitive camping at Snow Access, Brooksher Crooked Creek Preserve, and Fred Berry Crooked Creek Nature Center with limits and permission requirements.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Crooked Creek Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/",
        "provider": "local"
      },
      {
        "label": "AGFC Crooked Creek Water Trail brochure",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/crookedcreek-watertrailmap.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 07055607 Crooked Creek at Kelly Crossing",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055607/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07055607 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055607&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "crooked-creek-lower-pyatt-snow",
    "slug": "crooked-creek-lower-pyatt-snow",
    "name": "Crooked Creek",
    "reach": "Lower Pyatt Access to Snow Access",
    "aliases": [
      "Crooked Creek - Lower Pyatt to Snow",
      "AGFC Crooked Creek Lower Pyatt first segment",
      "Crooked Creek Lower Pyatt short float"
    ],
    "state": "Arkansas",
    "region": "Ozark Arkansas",
    "summary": "Short upper Crooked Creek float from Lower Pyatt to Snow. AGFC still documents the exact 6.7-mile public segment and ties the family to the direct Kelly Crossing gauge, but the only official numeric guidance remains the 12-12.5 ft moderate band, so this route stays conservative and minimum-only.",
    "statusText": "Use the Crooked Creek at Kelly Crossing gauge. AGFC calls 12 to 12.5 ft a moderate floating level; below about 12 ft expect more dragging and slower riffles, and higher water deserves extra caution because the creek can rise fast and AGFC does not publish a full high-water ladder.",
    "latitude": 36.24665,
    "longitude": -92.83494,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Crooked Creek can rise quickly after heavy spring or summer rain and turn from a clear smallmouth float into a faster, pushier current day.",
        "Almost all property along the creek is private; use only the named public access points and camp only where AGFC explicitly allows it.",
        "Shoals, riffles, fresh wood, and muddy or gravelly exits become more consequential when the creek is below the moderate band or rising fast."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055607",
      "provider": "usgs",
      "siteId": "07055607",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Crooked Creek at Kelly Crossing at Yellville, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055607/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 12,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Crooked Creek moderate-level guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "AGFC frames Crooked Creek as rainfall dependent moving water. Spring through early fall is the main floating season, but quick rain-driven rises can change the route much faster than on larger regulated rivers.",
      "difficulty": "moderate",
      "difficultyNotes": "This is not whitewater, but AGFC still describes deep pools, fast chutes, riffles, and small waves. Treat it as a rural moving-water trip rather than a flatwater float.",
      "confidenceNotes": "Confidence is good for a conservative add: AGFC still publishes Lower Pyatt and Snow as named public Crooked Creek Water Trail accesses with exact mileage, exposes coordinate-linked map pins for both endpoints, and ties the route family to direct USGS gauge 07055607 near Kelly Crossing. Because AGFC only publishes a 12-12.5 ft moderate floating band rather than a full low/ideal/high ladder, Paddle Today uses a minimum-only floor at 12 ft and keeps higher-water messaging cautious."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Lower Pyatt Access to Snow Access, 6.7 miles",
        "note": "AGFC lists Lower Pyatt-to-Snow as an exact Crooked Creek Water Trail segment.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055607 at 217 cfs / 10.84 ft",
        "note": "USGS Water Services returned same-day Crooked Creek at Kelly Crossing values of 217 cfs and 10.84 ft at 2026-07-11 17:45 CDT during this run, below AGFC's moderate band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055607&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Level guidance",
        "value": "12-12.5 ft moderate floating band",
        "note": "AGFC says a moderate level for floating Crooked Creek is 12-12.5 ft at the Kelly Crossing gauge. Paddle Today treats 12 ft as the conservative minimum-only floor because AGFC does not publish a complete high-water ladder for this route family.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Put-in access",
        "value": "Lower Pyatt Access, 36.24665, -92.83494",
        "note": "AGFC publishes Lower Pyatt Access as a named public Crooked Creek Water Trail access with a Google Maps coordinate link.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Take-out access",
        "value": "Snow Access, 36.24352, -92.79995",
        "note": "AGFC publishes Snow Access as a named public Crooked Creek Water Trail access with a Google Maps coordinate link and primitive campsites.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Camping support",
        "value": "Primitive campsites at Snow Access",
        "note": "AGFC says primitive campsites are available at Snow Access and limits camping to one night per campsite.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Crooked Creek Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/",
        "provider": "local"
      },
      {
        "label": "AGFC Crooked Creek Water Trail brochure",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/crookedcreek-watertrailmap.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 07055607 Crooked Creek at Kelly Crossing",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055607/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07055607 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055607&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "crooked-creek-lower-pyatt-mark-oliver",
    "slug": "crooked-creek-lower-pyatt-mark-oliver",
    "name": "Crooked Creek",
    "reach": "Lower Pyatt Access to Mark Oliver Access",
    "aliases": [
      "Crooked Creek - Lower Pyatt to Mark Oliver",
      "AGFC Crooked Creek upper-middle continuation",
      "Crooked Creek Lower Pyatt to Mark Oliver planner"
    ],
    "state": "Arkansas",
    "region": "Ozark Arkansas",
    "summary": "Upper-middle Crooked Creek continuation from Lower Pyatt to Mark Oliver. AGFC still documents the exact public access chain and the direct Kelly Crossing gauge, but the only official numeric guidance remains the 12-12.5 ft moderate band, so this route stays conservative and minimum-only.",
    "statusText": "Use the Crooked Creek at Kelly Crossing gauge. AGFC calls 12 to 12.5 ft a moderate floating level; below about 12 ft expect more dragging and slower riffles, and higher water deserves extra caution because the creek can rise fast and AGFC does not publish a full high-water ladder.",
    "latitude": 36.24665,
    "longitude": -92.83494,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Crooked Creek can rise quickly after heavy spring or summer rain and turn from a clear smallmouth float into a faster, pushier current day.",
        "Almost all property along the creek is private; use only the named public access points and camp only where AGFC explicitly allows it.",
        "Shoals, riffles, fresh wood, and muddy or gravelly exits become more consequential when the creek is below the moderate band or rising fast."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055607",
      "provider": "usgs",
      "siteId": "07055607",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Crooked Creek at Kelly Crossing at Yellville, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055607/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 12,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Crooked Creek moderate-level guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "AGFC frames Crooked Creek as rainfall dependent moving water. Spring through early fall is the main floating season, but quick rain-driven rises can change the route much faster than on larger regulated rivers.",
      "difficulty": "moderate",
      "difficultyNotes": "This is not whitewater, but AGFC still describes deep pools, fast chutes, riffles, and small waves. Treat it as a rural moving-water trip rather than a flatwater float.",
      "confidenceNotes": "Confidence is good for a conservative add: AGFC still publishes Lower Pyatt, Snow, and Mark Oliver as named public Crooked Creek Water Trail accesses with exact mileage, exposes coordinate-linked map pins for all three access points, and ties the route family to direct USGS gauge 07055607 near Kelly Crossing. Because AGFC only publishes a 12-12.5 ft moderate floating band rather than a full low/ideal/high ladder, Paddle Today uses a minimum-only floor at 12 ft and keeps higher-water messaging cautious."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Lower Pyatt Access to Mark Oliver Access, about 11.9 miles",
        "note": "AGFC lists Lower Pyatt-to-Snow as 6.7 miles and Snow-to-Mark Oliver as 5.2 miles, supporting this combined public Crooked Creek continuation.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055607 at 272 cfs / 11.17 ft",
        "note": "USGS Water Services returned same-day Crooked Creek at Kelly Crossing values of 272 cfs and 11.17 ft at 2026-07-15 19:45 CDT during this run, below AGFC's moderate band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055607&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Level guidance",
        "value": "12-12.5 ft moderate floating band",
        "note": "AGFC says a moderate level for floating Crooked Creek is 12-12.5 ft at the Kelly Crossing gauge. Paddle Today treats 12 ft as the conservative minimum-only floor because AGFC does not publish a complete high-water ladder for this route family.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Put-in access",
        "value": "Lower Pyatt Access, 36.24665, -92.83494",
        "note": "AGFC publishes Lower Pyatt Access as a named public Crooked Creek Water Trail access with a Google Maps coordinate link.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Take-out access",
        "value": "Mark Oliver Access, 36.24973, -92.7486",
        "note": "AGFC publishes Mark Oliver Access as a named public Crooked Creek Water Trail access with a Google Maps coordinate link.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Camping support",
        "value": "Snow Access and Brooksher camping support",
        "note": "AGFC says primitive campsites are available at Snow Access and at Brooksher Crooked Creek Preserve, which has no road access.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Crooked Creek Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/",
        "provider": "local"
      },
      {
        "label": "AGFC Crooked Creek Water Trail brochure",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/crookedcreek-watertrailmap.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 07055607 Crooked Creek at Kelly Crossing",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055607/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07055607 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055607&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "crooked-creek-snow-mark-oliver",
    "slug": "crooked-creek-snow-mark-oliver",
    "name": "Crooked Creek",
    "reach": "Snow Access to Mark Oliver Access",
    "aliases": [
      "Crooked Creek - Snow to Mark Oliver",
      "AGFC Crooked Creek middle segment",
      "Crooked Creek Snow Access float"
    ],
    "state": "Arkansas",
    "region": "Ozark Arkansas",
    "summary": "Middle Crooked Creek float from Snow to Mark Oliver. AGFC still documents the exact 5.2-mile public segment and uses the same direct Kelly Crossing gauge and 12-12.5 ft moderate guidance, so this route ships as a conservative minimum-only moving-water call.",
    "statusText": "Use the Crooked Creek at Kelly Crossing gauge. AGFC calls 12 to 12.5 ft a moderate floating level; below about 12 ft expect more dragging and slower riffles, and higher water deserves extra caution because the creek can rise fast and AGFC does not publish a full high-water ladder.",
    "latitude": 36.24352,
    "longitude": -92.79995,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Crooked Creek can rise quickly after heavy spring or summer rain and turn from a clear smallmouth float into a faster, pushier current day.",
        "Almost all property along the creek is private; use only the named public access points and camp only where AGFC explicitly allows it.",
        "Shoals, riffles, fresh wood, and muddy or gravelly exits become more consequential when the creek is below the moderate band or rising fast."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055607",
      "provider": "usgs",
      "siteId": "07055607",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Crooked Creek at Kelly Crossing at Yellville, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055607/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 12,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Crooked Creek moderate-level guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "AGFC frames Crooked Creek as rainfall dependent moving water. Spring through early fall is the main floating season, but quick rain-driven rises can change the route much faster than on larger regulated rivers.",
      "difficulty": "moderate",
      "difficultyNotes": "This is not whitewater, but AGFC still describes deep pools, fast chutes, riffles, and small waves. Treat it as a rural moving-water trip rather than a flatwater float.",
      "confidenceNotes": "Confidence is good for a conservative add: AGFC still publishes Snow and Mark Oliver as named public Crooked Creek Water Trail accesses with exact mileage, exposes coordinate-linked map pins for both endpoints, and ties the route family to direct USGS gauge 07055607 near Kelly Crossing. Because AGFC only publishes a 12-12.5 ft moderate floating band rather than a full low/ideal/high ladder, Paddle Today uses a minimum-only floor at 12 ft and keeps higher-water messaging cautious."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Snow Access to Mark Oliver Access, 5.2 miles",
        "note": "AGFC lists Snow-to-Mark Oliver as an exact Crooked Creek Water Trail segment.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055607 at 217 cfs / 10.84 ft",
        "note": "USGS Water Services returned same-day Crooked Creek at Kelly Crossing values of 217 cfs and 10.84 ft at 2026-07-11 17:45 CDT during this run, below AGFC's moderate band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055607&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Level guidance",
        "value": "12-12.5 ft moderate floating band",
        "note": "AGFC says a moderate level for floating Crooked Creek is 12-12.5 ft at the Kelly Crossing gauge. Paddle Today treats 12 ft as the conservative minimum-only floor because AGFC does not publish a complete high-water ladder for this route family.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Put-in access",
        "value": "Snow Access, 36.24352, -92.79995",
        "note": "AGFC publishes Snow Access as a named public Crooked Creek Water Trail access with a Google Maps coordinate link and primitive campsites.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Take-out access",
        "value": "Mark Oliver Access, 36.24973, -92.7486",
        "note": "AGFC publishes Mark Oliver Access as a named public Crooked Creek Water Trail access with a Google Maps coordinate link.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Camping support",
        "value": "Snow Access and Brooksher camping support",
        "note": "AGFC says primitive campsites are available at Snow Access and at Brooksher Crooked Creek Preserve, which has no road access.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Crooked Creek Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/",
        "provider": "local"
      },
      {
        "label": "AGFC Crooked Creek Water Trail brochure",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/crookedcreek-watertrailmap.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 07055607 Crooked Creek at Kelly Crossing",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055607/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07055607 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055607&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "crooked-creek-mark-oliver-kelleys-slab",
    "slug": "crooked-creek-mark-oliver-kelleys-slab",
    "name": "Crooked Creek",
    "reach": "Mark Oliver Access to Kelley's Slab Access",
    "aliases": [
      "Crooked Creek - Mark Oliver to Kelley's Slab",
      "AGFC Crooked Creek Kelley's finish segment",
      "Crooked Creek Mark Oliver lower float"
    ],
    "state": "Arkansas",
    "region": "Ozark Arkansas",
    "summary": "Lower middle Crooked Creek float from Mark Oliver to Kelley's Slab. AGFC still documents the exact 6.6-mile public segment and the direct Kelly Crossing gauge, but the only official numeric guidance remains the 12-12.5 ft moderate band, so this route stays conservative and minimum-only.",
    "statusText": "Use the Crooked Creek at Kelly Crossing gauge. AGFC calls 12 to 12.5 ft a moderate floating level; below about 12 ft expect more dragging and slower riffles, and higher water deserves extra caution because the creek can rise fast and AGFC does not publish a full high-water ladder.",
    "latitude": 36.24973,
    "longitude": -92.7486,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Crooked Creek can rise quickly after heavy spring or summer rain and turn from a clear smallmouth float into a faster, pushier current day.",
        "Almost all property along the creek is private; use only the named public access points and camp only where AGFC explicitly allows it.",
        "Shoals, riffles, fresh wood, and muddy or gravelly exits become more consequential when the creek is below the moderate band or rising fast, and Kelley’s Slab needs a cautious scout when the water is up or dirty."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055607",
      "provider": "usgs",
      "siteId": "07055607",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Crooked Creek at Kelly Crossing at Yellville, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055607/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 12,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Crooked Creek moderate-level guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "AGFC frames Crooked Creek as rainfall dependent moving water. Spring through early fall is the main floating season, but quick rain-driven rises can change the route much faster than on larger regulated rivers.",
      "difficulty": "moderate",
      "difficultyNotes": "This is not whitewater, but AGFC still describes deep pools, fast chutes, riffles, and small waves. Treat it as a rural moving-water trip rather than a flatwater float and scout the Kelley's Slab finish when conditions are pushier.",
      "confidenceNotes": "Confidence is good for a conservative add: AGFC still publishes Mark Oliver and Kelley's Slab as named public Crooked Creek Water Trail accesses with exact mileage, exposes coordinate-linked map pins for both endpoints, and ties the route family to direct USGS gauge 07055607 near Kelly Crossing. Because AGFC only publishes a 12-12.5 ft moderate floating band rather than a full low/ideal/high ladder, Paddle Today uses a minimum-only floor at 12 ft and keeps higher-water messaging cautious."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Mark Oliver Access to Kelley's Slab Access, 6.6 miles",
        "note": "AGFC lists Mark Oliver-to-Kelley's Slab as an exact Crooked Creek Water Trail segment.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055607 at 217 cfs / 10.84 ft",
        "note": "USGS Water Services returned same-day Crooked Creek at Kelly Crossing values of 217 cfs and 10.84 ft at 2026-07-11 17:45 CDT during this run, below AGFC's moderate band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055607&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Level guidance",
        "value": "12-12.5 ft moderate floating band",
        "note": "AGFC says a moderate level for floating Crooked Creek is 12-12.5 ft at the Kelly Crossing gauge. Paddle Today treats 12 ft as the conservative minimum-only floor because AGFC does not publish a complete high-water ladder for this route family.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Put-in access",
        "value": "Mark Oliver Access, 36.24973, -92.7486",
        "note": "AGFC publishes Mark Oliver Access as a named public Crooked Creek Water Trail access with a Google Maps coordinate link.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Take-out access",
        "value": "Kelley's Slab Access, 36.22921, -92.71045",
        "note": "AGFC publishes Kelley's Slab Access as a named public Crooked Creek Water Trail access with a Google Maps coordinate link and a hazard caveat under some conditions.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Camping support",
        "value": "Fred Berry nearby basecamp with permission",
        "note": "AGFC says paddlers may camp at Fred Berry Crooked Creek Nature Center with permission from the center manager and a one-night limit, but that support is separate from the river access endpoints.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Crooked Creek Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/",
        "provider": "local"
      },
      {
        "label": "AGFC Crooked Creek Water Trail brochure",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/crookedcreek-watertrailmap.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 07055607 Crooked Creek at Kelly Crossing",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055607/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07055607 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055607&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "crooked-creek-snow-kelleys-slab",
    "slug": "crooked-creek-snow-kelleys-slab",
    "name": "Crooked Creek",
    "reach": "Snow Access to Kelley's Slab Access",
    "aliases": [
      "Crooked Creek - Snow to Kelley's Slab",
      "AGFC Crooked Creek lower-middle continuation",
      "Crooked Creek Snow to Kelley access-planner route"
    ],
    "state": "Arkansas",
    "region": "Ozark Arkansas",
    "summary": "Lower Crooked Creek continuation from Snow to Kelley's Slab. AGFC still documents the exact public access chain and the direct Kelly Crossing gauge, but the only official numeric guidance remains the 12-12.5 ft moderate band, so this route stays conservative and minimum-only.",
    "statusText": "Use the Crooked Creek at Kelly Crossing gauge. AGFC calls 12 to 12.5 ft a moderate floating level; below about 12 ft expect more dragging and slower riffles, and higher water deserves extra caution because the creek can rise fast and AGFC does not publish a full high-water ladder.",
    "latitude": 36.24352,
    "longitude": -92.79995,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Crooked Creek can rise quickly after heavy spring or summer rain and turn from a clear smallmouth float into a faster, pushier current day.",
        "Almost all property along the creek is private; use only the named public access points and camp only where AGFC explicitly allows it.",
        "Shoals, riffles, fresh wood, and muddy or gravelly exits become more consequential when the creek is below the moderate band or rising fast, and Kelley's Slab deserves a cautious scout when the water is up or dirty."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-07055607",
      "provider": "usgs",
      "siteId": "07055607",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Crooked Creek at Kelly Crossing at Yellville, AR",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-07055607/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 12,
      "thresholdSource": {
        "label": "Arkansas Game and Fish Crooked Creek moderate-level guidance",
        "url": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "AGFC frames Crooked Creek as rainfall dependent moving water. Spring through early fall is the main floating season, but quick rain-driven rises can change the route much faster than on larger regulated rivers.",
      "difficulty": "moderate",
      "difficultyNotes": "This is not whitewater, but AGFC still describes deep pools, fast chutes, riffles, and small waves. Treat it as a rural moving-water trip rather than a flatwater float and scout the Kelley's Slab finish when conditions are pushier.",
      "confidenceNotes": "Confidence is good for a conservative add: AGFC still publishes Snow, Mark Oliver, and Kelley's Slab as named public Crooked Creek Water Trail accesses with exact mileage, and the current brochure preserves the same public access chain. AGFC ties the route family to direct USGS gauge 07055607 near Kelly Crossing. Because AGFC only publishes a 12-12.5 ft moderate floating band rather than a full low/ideal/high ladder, Paddle Today uses a minimum-only floor at 12 ft and keeps higher-water messaging cautious."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Snow Access to Kelley's Slab Access, about 11.8 miles",
        "note": "AGFC lists Snow-to-Mark Oliver as 5.2 miles and Mark Oliver-to-Kelley's Slab as 6.6 miles, supporting this combined public Crooked Creek continuation.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 07055607 at 186 cfs / 10.63 ft",
        "note": "USGS Water Services returned same-day Crooked Creek at Kelly Crossing values of 186 cfs and 10.63 ft at 2026-07-14 22:45 CDT during this run, below AGFC's moderate band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055607&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Level guidance",
        "value": "12-12.5 ft moderate floating band",
        "note": "AGFC says a moderate level for floating Crooked Creek is 12-12.5 ft at the Kelly Crossing gauge. Paddle Today treats 12 ft as the conservative minimum-only floor because AGFC does not publish a complete high-water ladder for this route family.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Put-in access",
        "value": "Snow Access, 36.24352, -92.79995",
        "note": "AGFC publishes Snow Access as a named public Crooked Creek Water Trail access with a Google Maps coordinate link and primitive campsites.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Take-out access",
        "value": "Kelley's Slab Access, 36.22921, -92.71045",
        "note": "AGFC publishes Kelley's Slab Access as a named public Crooked Creek Water Trail access with a Google Maps coordinate link and a hazard caveat under some conditions.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      },
      {
        "label": "Camping support",
        "value": "Snow Access and Brooksher camping support",
        "note": "AGFC says primitive campsites are available at Snow Access and at Brooksher Crooked Creek Preserve, which has no road access.",
        "sourceUrl": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/"
      }
    ],
    "sourceLinks": [
      {
        "label": "AGFC Crooked Creek Water Trail",
        "url": "https://www.agfc.com/things-to-do/water-trails/crooked-creek/",
        "provider": "local"
      },
      {
        "label": "AGFC Crooked Creek Water Trail brochure",
        "url": "https://www.agfc.com/wp-content/uploads/2023/05/crookedcreek-watertrailmap.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 07055607 Crooked Creek at Kelly Crossing",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-07055607/",
        "provider": "usgs"
      },
      {
        "label": "USGS 07055607 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055607&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  }
];
