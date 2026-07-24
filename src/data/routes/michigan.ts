// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const michiganRoutes: River[] = [
  {
    "id": "pine-river-edgetts-lincoln",
    "slug": "pine-river-edgetts-lincoln",
    "name": "Pine River",
    "reach": "Edgetts to Lincoln Bridge",
    "state": "Michigan",
    "region": "Northern Lower Michigan",
    "summary": "Upper Pine River moving-water day from Edgetts to Lincoln Bridge, above the federal permit corridor. American Whitewater documents the exact reach, and the Hoxeyville USGS gauge gives it the same conservative Pine River flow check used by the downstream Pine routes.",
    "statusText": "Use the Pine River at High School Bridge gauge near Hoxeyville as the live check. Treat 170 cfs as the conservative low-water floor; below that, expect shallow fast turns, scraping, and harder wood avoidance.",
    "latitude": 44.062496,
    "longitude": -85.583206,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-04125460",
      "provider": "usgs",
      "siteId": "04125460",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Pine River at High School Bridge near Hoxeyville, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04125460/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 170,
      "thresholdSource": {
        "label": "American Whitewater Pine River flow correlation for the Hoxeyville gauge",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3223",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Spring through fall is the main practical window. This upper Pine section is less permit-crowded than the Scenic River corridor downstream, but rain can quickly make the fast wooded turns, sweepers, and logjams more consequential.",
      "difficulty": "moderate",
      "difficultyNotes": "American Whitewater rates Edgetts to Lincoln Bridge Class I-II and describes shallow fast current, tight turns, occasional low Class II spots, and logs or stumps piled into bends. It is a skilled moving-water route, not a casual tube float.",
      "confidenceNotes": "Confidence is good but intentionally caveated: American Whitewater publishes the exact Edgetts-to-Lincoln reach, route character, Class I-II rating, and Hoxeyville gauge relationship; the Cadillac Area Visitors Bureau / Forest Service Pine map gives named launch coordinates from Edgetts through Lincoln; Outdoor Michigan confirms Lincoln Bridge as a Michigan DNR carry-in boat launch; and the same USGS 04125460 / AW 170 cfs floor is already used by the downstream Pine implementations. The main caveat is that Edgetts is supported by the Pine map and AW route notes rather than a standalone Outdoor Michigan access page, so same-day access signage should control."
    },
    "evidenceNotes": [
      {
        "label": "Exact AW reach",
        "value": "Edgetts to Lincoln Bridge",
        "note": "American Whitewater documents the Pine River Edgetts-to-Lincoln Bridge reach, rates it Class I-II, lists it at 13.1 miles, and says this upper section does not require the downstream permit.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3223/main"
      },
      {
        "label": "Map coordinates",
        "value": "Edgetts 44.062496, -85.583206; Lincoln 44.133377, -85.695248",
        "note": "The Cadillac Area Visitors Bureau / Forest Service Pine River map names Edgetts, Meadow Brook, Skookum, Walker, and Lincoln Bridge and provides GPS coordinates for each launch location.",
        "sourceUrl": "https://cadillacmichigan.com/wp-content/uploads/2018/10/CAVB-Trailmaps_2019-pineriver-update.pdf"
      },
      {
        "label": "Public take-out",
        "value": "Lincoln Bridge DNR carry-in launch",
        "note": "Outdoor Michigan identifies Lincoln Bridge Campground Boat Launch as a Michigan DNR carry-in boat launch on the Pine River with parking.",
        "sourceUrl": "https://outdoormichigan.org/feature/5315"
      },
      {
        "label": "Gauge and threshold",
        "value": "170 cfs low floor",
        "note": "American Whitewater ties Pine River conditions to USGS 04125460 and lists 170 cfs as the lower runnable floor. The gauge is downstream of this reach and may vary slightly, so the app uses only a conservative minimum floor.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3223"
      },
      {
        "label": "Route character",
        "value": "Fast shallow turns and wood",
        "note": "AW describes this section as shallow fast current with many tight turns, a sand/clay bottom with occasional rock, and logs or stumps jammed into bends that can be hazardous for paddlers with little moving-water experience.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3223/main"
      },
      {
        "label": "Downstream context",
        "value": "Scenic River corridor begins at Lincoln",
        "note": "Rivers.gov says the federally designated Pine River reach begins at Lincoln Bridge and describes Forest Service permit, access-fee, and designated-camping controls downstream. This route ends at Lincoln before entering that managed downstream corridor.",
        "sourceUrl": "https://www.rivers.gov/rivers/river/pine"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Pine River Edgetts to Lincoln",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3223/main",
        "provider": "american_whitewater"
      },
      {
        "label": "American Whitewater Pine River gauge detail",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3223",
        "provider": "american_whitewater"
      },
      {
        "label": "Cadillac Area Visitors Bureau / Forest Service Pine River map",
        "url": "https://cadillacmichigan.com/wp-content/uploads/2018/10/CAVB-Trailmaps_2019-pineriver-update.pdf",
        "provider": "local"
      },
      {
        "label": "Lincoln Bridge Campground Boat Launch",
        "url": "https://outdoormichigan.org/feature/5315",
        "provider": "local"
      },
      {
        "label": "Outdoor Michigan Meadow Brook Bridge Boat Launch",
        "url": "https://outdoormichigan.org/feature/5375",
        "provider": "local"
      },
      {
        "label": "Outdoor Michigan Skookum South Bank Boat Launch",
        "url": "https://outdoormichigan.org/feature/5376",
        "provider": "local"
      },
      {
        "label": "Rivers.gov Pine River profile",
        "url": "https://www.rivers.gov/rivers/river/pine",
        "provider": "nps"
      },
      {
        "label": "USGS 04125460 Pine River at High School Bridge",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04125460/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "pine-river-peterson-low-bridge",
    "slug": "pine-river-peterson-low-bridge",
    "name": "Pine River",
    "reach": "Peterson Bridge to Low Bridge",
    "state": "Michigan",
    "region": "Northern Lower Michigan",
    "summary": "National Scenic River day through the Huron-Manistee National Forests from Peterson Bridge to Low Bridge. This is a permit-managed, fast, wooded Pine River run with a direct downstream USGS gauge and American Whitewater flow guidance.",
    "statusText": "Use the Pine River at High School Bridge gauge near Hoxeyville as the live check. Treat 170 cfs as the conservative low-water floor; below that, expect scraping and more difficult boat control. Higher flows make this wooded Class I-II river faster and less forgiving.",
    "latitude": 44.203235,
    "longitude": -85.799124,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-04125460",
      "provider": "usgs",
      "siteId": "04125460",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Pine River at High School Bridge near Hoxeyville, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04125460/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 170,
      "thresholdSource": {
        "label": "American Whitewater Pine River flow correlation for the Hoxeyville gauge",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3223",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "The Pine is commonly paddleable spring through fall, but it responds to rain and recent storm damage. Check the Forest Service river permit page, same-day gauge, and recent logjam reports before launching.",
      "difficulty": "moderate",
      "difficultyNotes": "The Forest Service describes the Pine as swift with challenging rapids, sharp turns, and narrow passages. Treat Peterson to Low Bridge as a skilled moving-water trip, especially for canoes, loaded boats, cold water, or groups unfamiliar with quick wood-choked turns.",
      "confidenceNotes": "Confidence is good for a guarded first Michigan add: the Huron-Manistee National Forests publish the Peterson Bridge and Low Bridge access points, the official Pine River map gives coordinates and travel-time context, permits are managed through Recreation.gov, and American Whitewater ties the Pine River flow guidance to USGS 04125460. The app uses only a conservative minimum floor because the strongest numeric source is AW community guidance for the Pine gauge family rather than a Forest Service route-specific band for Peterson-to-Low Bridge."
    },
    "evidenceNotes": [
      {
        "label": "Public route context",
        "value": "Peterson Bridge to Low Bridge",
        "note": "Published Pine River maps identify Peterson Bridge and Low Bridge as river access sites and list the reach at roughly 8.25 to 8.6 miles, with Forest Service permit rules applying in this corridor.",
        "sourceUrl": "https://outdoormichigan.org/trails/PineScenicRiverMap.pdf"
      },
      {
        "label": "Permit-managed river",
        "value": "Forest Service Pine River permits",
        "note": "Recreation.gov administers Pine National Scenic River permits and lists Peterson Bridge and Low Bridge among the selectable access points.",
        "sourceUrl": "https://www.recreation.gov/permits/233336/registration/detailed-availability"
      },
      {
        "label": "Gauge and threshold",
        "value": "170 cfs low floor",
        "note": "American Whitewater publishes Pine River gauge guidance for USGS 04125460, with 170 cfs as the lower runnable floor and higher bands above that. The app uses the lower floor only and avoids claiming an ideal range for this specific Forest Service day trip.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3223"
      },
      {
        "label": "Route character",
        "value": "Fast wooded Class I-II river",
        "note": "Forest Service Pine River material warns about swift current, sharp turns, narrow passages, downed trees, and logjams; American Whitewater characterizes the Pine as a beginner to intermediate whitewater river with downstream sections continuing toward Low Bridge.",
        "sourceUrl": "https://www.recreation.gov/permits/249990"
      },
      {
        "label": "Current-data caveat",
        "value": "USGS 04125460 product-supported",
        "note": "USGS publishes Pine River at High School Bridge near Hoxeyville as monitoring location 04125460, and product code supports USGS gauges by site ID. Same-day gauge freshness, Forest Service alerts, and local wood reports should still be checked before launch.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04125460/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Pine National Scenic River permit page",
        "url": "https://www.recreation.gov/permits/249990",
        "provider": "local"
      },
      {
        "label": "Pine National Scenic River map PDF",
        "url": "https://outdoormichigan.org/trails/PineScenicRiverMap.pdf",
        "provider": "local"
      },
      {
        "label": "Recreation.gov Pine National Scenic River permit",
        "url": "https://www.recreation.gov/permits/233336",
        "provider": "local"
      },
      {
        "label": "American Whitewater Pine River gauge detail",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3223",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 04125460 Pine River at High School Bridge",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04125460/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "huron-river-argo-gallup",
    "slug": "huron-river-argo-gallup",
    "name": "Huron River",
    "reach": "Argo Park Canoe Livery to Gallup Park Livery",
    "state": "Michigan",
    "region": "Southeast Michigan",
    "summary": "Popular Ann Arbor Huron River trip from city-managed Argo Park to Gallup Park. The route includes the Argo Cascades bypass channel, public liveries at both ends, and a direct USGS Ann Arbor gauge in the urban river corridor.",
    "statusText": "Use the Huron River at Ann Arbor gauge. American Whitewater lists 400 to 1,700 cfs as the runnable/play range for the Ann Arbor / Argo Cascades gauge family; below 400 cfs, expect shallow, less useful drops, and above 1,700 cfs the feature is generally washed out.",
    "latitude": 42.29148,
    "longitude": -83.74444,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-04174500",
      "provider": "usgs",
      "siteId": "04174500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Huron River at Ann Arbor, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04174500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 400,
      "idealMax": 1700,
      "tooLow": 80,
      "tooHigh": 1700,
      "thresholdSource": {
        "label": "American Whitewater Huron River at Ann Arbor gauge bands",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3801",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "The city livery season generally runs spring through fall. Summer weekends can be crowded, and rain or dam operations can change the Argo Cascades and downstream current quickly enough that paddlers should still make a visual check before committing.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a short urban river trip, but the Argo Cascades are a manmade series of drops, rock chutes, and pools. HRWC calls the Cascades a moderate rapid run, and American Whitewater treats the Ann Arbor feature as Class I(II), so the route is hidden from casual Explore discovery.",
      "confidenceNotes": "Confidence is high enough for a guarded whitewater-style route: the City of Ann Arbor operates both Argo and Gallup liveries and lists boat launches, parking, restrooms, rentals, and public paddling use; the Huron River Water Trail names Argo-to-Gallup as the city's most popular 1.5-hour trip; HRWC documents the Argo Cascades as a moderate rapid run; and USGS 04174500 is the Ann Arbor Huron River gauge used by American Whitewater for the Ann Arbor / Argo Cascades gauge family. Unlike the upstream Dexter-Huron-to-Delhi lead, this route starts below Argo Dam and uses the Ann Arbor gauge as a same-city corridor gauge; still, AW warns that dam operations can cause erratic readings, so visual confirmation remains part of the route copy."
    },
    "evidenceNotes": [
      {
        "label": "Official trip shape",
        "value": "3.5 miles / about 1.5 hours",
        "note": "The Huron River Water Trail / HRWC Washtenaw trips page lists Argo to Gallup as a 3.5-mile, 1.5-hour trip, and the Ann Arbor page says it is the Huron River's most popular trip with a paddle down the Cascades drops and pools to Gallup Livery.",
        "sourceUrl": "https://huronriverwatertrail.org/trail-towns/ann-arbor/"
      },
      {
        "label": "Public endpoints",
        "value": "City of Ann Arbor liveries",
        "note": "City pages identify Argo Park Canoe Livery at 1055 Longshore Drive and Gallup Park Livery at 3000 Fuller Road, with boat launches, canoe/kayak rentals, parking, and restrooms.",
        "sourceUrl": "https://www.a2gov.org/parks-and-recreation/parks-and-places/argo-park-canoe-livery/"
      },
      {
        "label": "Gauge bands",
        "value": "80 / 400-1,700 / 1,700 cfs",
        "note": "American Whitewater lists 80-400 cfs as less ideal, 400-1,700 cfs as runnable/playable, and 1,700 cfs and above as generally washed out for the Huron River at Ann Arbor gauge family.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3801"
      },
      {
        "label": "Whitewater feature",
        "value": "Argo Cascades",
        "note": "HRWC describes Argo Cascades as a moderate manmade series of 1.5- to 2-foot drops between pools that bypass Argo Dam, with a paved path for walking back to the top.",
        "sourceUrl": "https://huronriverwatertrail.org/trip-planner/trip-wash/"
      },
      {
        "label": "Current-condition support",
        "value": "USGS 04174500",
        "note": "The City of Ann Arbor points paddlers and residents to the USGS Huron River gauge for discharge, gauge height, temperature, dissolved oxygen, pH, conductivity, and turbidity.",
        "sourceUrl": "https://www.a2gov.org/systems-planning/stream-gauges/"
      },
      {
        "label": "Closures and advisories",
        "value": "Barton closure upstream; PFAS foam advisory",
        "note": "HRWC river conditions list the Barton Dam / Barton Pond access closure through 2027 upstream of this route and PFAS advisories that include avoiding contact with river foam.",
        "sourceUrl": "https://huronriverwatertrail.org/river-conditions/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Huron River Water Trail Ann Arbor",
        "url": "https://huronriverwatertrail.org/trail-towns/ann-arbor/",
        "provider": "local"
      },
      {
        "label": "Huron River Water Trail Washtenaw trips",
        "url": "https://huronriverwatertrail.org/trip-planner/trip-wash/",
        "provider": "local"
      },
      {
        "label": "Huron River Water Trail river conditions",
        "url": "https://huronriverwatertrail.org/river-conditions/",
        "provider": "local"
      },
      {
        "label": "City of Ann Arbor Argo Park Canoe Livery",
        "url": "https://www.a2gov.org/parks-and-recreation/parks-and-places/argo-park-canoe-livery/",
        "provider": "local"
      },
      {
        "label": "City of Ann Arbor Gallup Park Livery",
        "url": "https://www.a2gov.org/parks-and-recreation/parks-and-places/gallup-park-livery/",
        "provider": "local"
      },
      {
        "label": "American Whitewater Huron River Ann Arbor gauge",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3801",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 04174500 Huron River at Ann Arbor",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04174500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "clinton-river-downtown-utica-budd",
    "slug": "clinton-river-downtown-utica-budd",
    "name": "Clinton River",
    "reach": "Downtown Utica to Budd Park",
    "state": "Michigan",
    "region": "Southeast Michigan",
    "summary": "Macomb County Clinton River planner corridor from Downtown Utica through North Clinton River Park and Rotary Park to Budd Park.",
    "statusText": "Use the Clinton River at Sterling Heights gauge near the take-out. CRWC warns of low water at 8.0 ft and high water at 10.0 ft; between those marks, still check the launch for wood, fast current, and urban stormwater effects.",
    "latitude": 42.625576,
    "longitude": -83.037665,
    "gaugeSource": {
      "id": "usgs-04161820",
      "provider": "usgs",
      "siteId": "04161820",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Clinton River at Sterling Heights, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04161820/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 8,
      "idealMax": 10,
      "tooLow": 8,
      "tooHigh": 10,
      "thresholdSource": {
        "label": "Clinton River Watershed Council Sterling Heights gauge warnings",
        "url": "https://www.crwc.org/recreation/paddling",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Spring through fall is the practical paddling season. This urban section can rise quickly after rain, and CRWC warns that high water can carry woody debris, create blocked passages, and raise water-quality concerns from sewage overflows.",
      "difficulty": "moderate",
      "difficultyNotes": "This urban corridor remains moderate because CRWC warns that wood, swift current, bridges, and stormwater can change conditions quickly.",
      "confidenceNotes": "Confidence is good for a consolidated Clinton River corridor because the replaced route cards shared the same Sterling Heights gauge warning model and adjacent water-trail accesses."
    },
    "evidenceNotes": [
      {
        "label": "Planner corridor",
        "value": "Downtown Utica water-trail access to Budd Park carry-in launch, with intermediate access choices",
        "note": "This route replaces overlapping access-to-access cards with one access-planner corridor.",
        "sourceUrl": "https://www.crwc.org/recreation/paddling"
      },
      {
        "label": "Gauge model",
        "value": "Clinton River at Sterling Heights, MI",
        "note": "The consolidated route keeps the same reviewed gauge model used by the replaced route cards.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04161820/"
      }
    ],
    "sourceLinks": [
      {
        "label": "CRWC paddling and gauge warnings",
        "url": "https://www.crwc.org/recreation/paddling",
        "provider": "local"
      },
      {
        "label": "2024 Clinton River Water Trail map PDF",
        "url": "https://static1.squarespace.com/static/64525a62c1226a7b4e5e5281/t/6645fc9f9ba06909adb2c097/1729861989526/2024%2BClinton%2BRiver%2BWatertrail%2BMap.pdf",
        "provider": "local"
      },
      {
        "label": "Michigan Water Trails Downtown Utica",
        "url": "https://www.michiganwatertrails.org/location.asp?aid=1893&ait=av",
        "provider": "local"
      },
      {
        "label": "Michigan Water Trails Clinton River Water Trail",
        "url": "https://www.michiganwatertrails.org/trail.asp?ait=cv&cid=242",
        "provider": "local"
      },
      {
        "label": "City of Sterling Heights canoe and kayak page",
        "url": "https://www.sterlingheights.gov/1434/Come-Explore-the-Clinton-River",
        "provider": "local"
      },
      {
        "label": "Macomb County Clinton River overview",
        "url": "https://www.macombgov.org/make-macomb-your-home/outdoor-activities/water/clinton-river",
        "provider": "local"
      },
      {
        "label": "USGS 04161820 Clinton River at Sterling Heights",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04161820/",
        "provider": "usgs"
      },
      {
        "label": "CRWC Clinton River Water Trail guide book",
        "url": "https://www.crwc.org/s/Clinton_Paddling_Guide_Final-2.pdf",
        "provider": "local"
      },
      {
        "label": "Outdoor Michigan Clinton River",
        "url": "https://outdoormichigan.org/feature/7986",
        "provider": "local"
      }
    ],
    "aliases": [
      "Clinton River - Downtown Utica to Budd Park",
      "Upper Macomb Clinton River access planner corridor"
    ],
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [],
      "reviewStatus": "reviewed",
      "safetyNotes": [
        "Use the access planner to choose a short urban section instead of assuming the full corridor fits the day.",
        "Wood, bridge current, stormwater, and high-water warnings matter throughout this corridor.",
        "Stay with mapped public water-trail accesses."
      ]
    }
  },
  {
    "id": "clinton-river-macarthur-harley-ensign",
    "slug": "clinton-river-macarthur-harley-ensign",
    "name": "Clinton River",
    "reach": "MacArthur Park to Harley Ensign",
    "state": "Michigan",
    "region": "Southeast Michigan",
    "summary": "Lower Clinton River water-trail finish from the Neil Dempsey launch at MacArthur Park to the DNR Harley Ensign access at Lake St. Clair. CRWC maps both access points and publishes a Sterling Heights USGS low/high warning ladder, but this mouth section also needs a wind, waves, and motorboat check.",
    "statusText": "Use the Clinton River at Sterling Heights gauge as CRWC's warning check. CRWC warns of low water at 8.0 ft and high water at 10.0 ft; also check Lake St. Clair wind, waves, boat traffic, and the Harley Ensign landing before committing.",
    "latitude": 42.597338,
    "longitude": -82.871104,
    "gaugeSource": {
      "id": "usgs-04161820",
      "provider": "usgs",
      "siteId": "04161820",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Clinton River at Sterling Heights, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04161820/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 8,
      "idealMax": 10,
      "tooLow": 8,
      "tooHigh": 10,
      "thresholdSource": {
        "label": "Clinton River Watershed Council Sterling Heights gauge warnings",
        "url": "https://www.crwc.org/recreation/paddling",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Spring through fall is the practical paddling season. This lowest Clinton reach is slower than upstream swiftwater, but rain can still push wood and stormwater through the river while Lake St. Clair conditions can add wind, waves, and motorboat exposure near the finish.",
      "difficulty": "moderate",
      "difficultyNotes": "The river mileage is straightforward, but this is not the same beginner call as the protected Budd-to-Mount-Clemens reach. Treat the final approach to Harley Ensign as exposed lower-river paddling where motorboat traffic, wind, waves, open-water proximity, and urban water quality matter.",
      "confidenceNotes": "Confidence is high for a guarded water-trail add: the 2024 CRWC Clinton River Water Trail map lists Neil Dempsey at MacArthur Park and Harley Ensign (DNR) with coordinates, river miles, and a 7.2-mile spacing; Michigan Water Trails lists both as Clinton River Water Trail assets; Macomb County identifies Harley Ensign as a county launch location; and CRWC publishes USGS 04161820 low/high warning stages. The gauge is treated as a proxy warning gauge because this route is downstream from Sterling Heights and ends at Lake St. Clair; the app does not claim a precise ideal range."
    },
    "evidenceNotes": [
      {
        "label": "Access map",
        "value": "Neil Dempsey Launch RM 7.2 to Harley Ensign RM 0.0",
        "note": "The 2024 CRWC water-trail map lists Neil Dempsey at MacArthur Park and Harley Ensign (DNR) as launch sites, with 7.2 miles from Neil Dempsey to Harley Ensign at the river mouth.",
        "sourceUrl": "https://static1.squarespace.com/static/64525a62c1226a7b4e5e5281/t/6645fc9f9ba06909adb2c097/1729861989526/2024%2BClinton%2BRiver%2BWatertrail%2BMap.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "42.597338, -82.871104 to 42.593327, -82.774834",
        "note": "The 2024 CRWC water-trail map table gives coordinates for Neil Dempsey at MacArthur Park and Harley Ensign (DNR).",
        "sourceUrl": "https://static1.squarespace.com/static/64525a62c1226a7b4e5e5281/t/6645fc9f9ba06909adb2c097/1729861989526/2024%2BClinton%2BRiver%2BWatertrail%2BMap.pdf"
      },
      {
        "label": "Water-trail assets",
        "value": "MacArthur Park and Harley Ensign",
        "note": "Michigan Water Trails lists MacArthur Park and Harley Ensign as Clinton River Water Trail access assets.",
        "sourceUrl": "https://www.michiganwatertrails.org/trail.asp?ait=cv&cid=242"
      },
      {
        "label": "Lower-river character",
        "value": "Slow-moving lower Clinton to Lake St. Clair",
        "note": "CRWC describes the lower Clinton as slow-moving waters through forested riverbanks and parks before emptying into Lake St. Clair, while warning that the river can still run high and carry woody debris after rain.",
        "sourceUrl": "https://www.crwc.org/recreation/paddling"
      },
      {
        "label": "Gauge warnings",
        "value": "8.0 ft low warning / 10.0 ft high warning",
        "note": "CRWC bases water-level warnings on the USGS Sterling Heights gauge and publishes a low-water warning at 8 ft and high-water warning at 10 ft. The app uses this as a conservative proxy warning window for the downstream mouth reach.",
        "sourceUrl": "https://www.crwc.org/recreation/paddling"
      },
      {
        "label": "Launch context",
        "value": "Macomb County launch list",
        "note": "Macomb County paddling guidance identifies MacArthur Park and Harley Ensign Memorial among county-area kayak, canoe, and paddleboard launch locations.",
        "sourceUrl": "https://www.macombgov.org/make-macomb-your-home/outdoor-activities/water/clinton-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "CRWC paddling and gauge warnings",
        "url": "https://www.crwc.org/recreation/paddling",
        "provider": "local"
      },
      {
        "label": "2024 Clinton River Water Trail map PDF",
        "url": "https://static1.squarespace.com/static/64525a62c1226a7b4e5e5281/t/6645fc9f9ba06909adb2c097/1729861989526/2024%2BClinton%2BRiver%2BWatertrail%2BMap.pdf",
        "provider": "local"
      },
      {
        "label": "Michigan Water Trails Clinton River Water Trail",
        "url": "https://www.michiganwatertrails.org/trail.asp?ait=cv&cid=242",
        "provider": "local"
      },
      {
        "label": "Macomb County Clinton River overview",
        "url": "https://www.macombgov.org/make-macomb-your-home/outdoor-activities/water/clinton-river",
        "provider": "local"
      },
      {
        "label": "USGS 04161820 Clinton River at Sterling Heights",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04161820/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "clinton-river-shadyside-macarthur",
    "slug": "clinton-river-shadyside-macarthur",
    "name": "Clinton River",
    "reach": "Shadyside Park to MacArthur Park",
    "state": "Michigan",
    "region": "Southeast Michigan",
    "summary": "Very short Mount Clemens lower Clinton link from Shadyside Park to the Neil Dempsey launch at MacArthur Park. The CRWC map and Mount Clemens parks page still support both public endpoints, and this works as a cautious extension below the beginner Budd-to-Shadyside segment.",
    "statusText": "Use the Clinton River at Sterling Heights gauge as a conservative downstream proxy. CRWC warns of low water at 8.0 ft and high water at 10.0 ft; the latest official USGS reading available during this run was 7.56 ft and 105 cfs at 2026-07-15T15:00:00-05:00, so expect slow water, shallow lines, and more landing inspection than speed.",
    "latitude": 42.582529,
    "longitude": -82.880104,
    "gaugeSource": {
      "id": "usgs-04161820",
      "provider": "usgs",
      "siteId": "04161820",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Clinton River at Sterling Heights, MI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/04161820/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 8,
      "idealMax": 10,
      "tooLow": 8,
      "tooHigh": 10,
      "thresholdSource": {
        "label": "Clinton River Watershed Council Sterling Heights gauge warnings",
        "url": "https://www.crwc.org/recreation/paddling",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Spring through fall is the practical season. This short city reach is still sensitive to rain spikes, floating wood, and water-quality issues despite its modest mileage.",
      "difficulty": "easy",
      "difficultyNotes": "Mileage is short and the corridor is slower than the open-water mouth section, but the Mount Clemens finish still demands attention to signage, obstructions, and any posted dam or weir warnings.",
      "confidenceNotes": "Confidence is good for a conservative Michigan add: the current CRWC water-trail map still places Shadyside Park at river mile 9.2 and Neil Dempsey at MacArthur Park at river mile 7.2, the current Mount Clemens parks page still says Shadyside has a boat and canoe launch and MacArthur has a universally accessible kayak launch, and USGS Water Services returned 7.56 ft and 105 cfs at 2026-07-15T15:00:00-05:00 for the Sterling Heights warning gauge during this run."
    },
    "evidenceNotes": [
      {
        "label": "Access map",
        "value": "Shadyside Park RM 9.2 to Neil Dempsey RM 7.2",
        "note": "The 2024 CRWC water-trail map lists Shadyside Park and Neil Dempsey at MacArthur Park as consecutive public launches about 2 river miles apart.",
        "sourceUrl": "https://pufferfish-dolphin-5bdb.squarespace.com/s/2024-Clinton-River-Watertrail-Map.pdf"
      },
      {
        "label": "Public launches",
        "value": "Shadyside Park and MacArthur Park",
        "note": "Mount Clemens says Shadyside Park has a handicapped accessible pier with a boat and canoe launch, and MacArthur Park has a universally accessible kayak launch.",
        "sourceUrl": "https://mountclemens.gov/parks/"
      },
      {
        "label": "Proxy gauge",
        "value": "USGS 04161820 at Sterling Heights",
        "note": "USGS Water Services returned 7.56 ft and 105 cfs at 2026-07-15T15:00:00-05:00 for Clinton River at Sterling Heights, MI. This lower Mount Clemens reach uses that same official warning gauge conservatively as a proxy.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=04161820&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Lower-river context",
        "value": "Macomb County public launch network",
        "note": "Macomb County says the main branch of the Clinton River has eight public paddle launches across Utica, Sterling Heights, Clinton Township, Mount Clemens, and Harrison Township.",
        "sourceUrl": "https://www.macombgov.org/make-macomb-your-home/outdoor-activities/trail-network/water-trails/main-branch-clinton-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "CRWC paddling and gauge warnings",
        "url": "https://www.crwc.org/recreation/paddling",
        "provider": "local"
      },
      {
        "label": "2024 Clinton River Water Trail map PDF",
        "url": "https://pufferfish-dolphin-5bdb.squarespace.com/s/2024-Clinton-River-Watertrail-Map.pdf",
        "provider": "local"
      },
      {
        "label": "Mount Clemens city parks",
        "url": "https://mountclemens.gov/parks/",
        "provider": "local"
      },
      {
        "label": "Macomb County main branch Clinton River",
        "url": "https://www.macombgov.org/make-macomb-your-home/outdoor-activities/trail-network/water-trails/main-branch-clinton-river",
        "provider": "local"
      },
      {
        "label": "USGS 04161820 Water Services",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=04161820&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Michigan Water Trails Clinton River Water Trail",
        "url": "https://www.michiganwatertrails.org/trail.asp?ait=cv&cid=242",
        "provider": "local"
      }
    ],
    "aliases": [
      "Clinton River - Shadyside Park to MacArthur Park",
      "Lower Clinton River Shadyside to Neil Dempsey Launch",
      "Shadyside Park to MacArthur Park in Mount Clemens"
    ],
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "urban_water_quality"
      ],
      "reviewStatus": "reviewed",
      "safetyNotes": [
        "This short lower-city segment still needs a same-day scan for wood, strainers, and any posted Mount Clemens dam or weir warning signage.",
        "Urban stormwater and sewer-overflow concerns remain part of the call after rain or high water.",
        "Finish at Neil Dempsey and do not continue toward Lake St. Clair or the lower mouth corridor without a separate wind, waves, and motorboat plan."
      ]
    }
  }
];
