// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const illinoisRoutes: River[] = [
  {
    "id": "lusk-creek-saltpeter-eddyville",
    "slug": "lusk-creek-saltpeter-eddyville",
    "name": "Lusk Creek",
    "reach": "Saltpeter Cave Crossing to Eddyville Blacktop Road",
    "aliases": ["Lusk Creek Canyon", "Lusk Creek Wilderness paddle", "Lusk Creek Eddyville"],
    "state": "Illinois",
    "region": "Southern Illinois",
    "summary": "An advanced 8.1-mile Shawnee National Forest whitewater run from the Saltpeter Cave / Trail 481 access area to the improved Eddyville Blacktop Road bridge landing, with canyon scenery, fast-rising water, strainers, and limited wilderness exits.",
    "statusText": "Use USGS 03384450 at Lusk Creek near Eddyville. American Whitewater and trip reports describe roughly 250–400 cfs as a lower-to-moderate planning window; flows above 1,000 cfs are serious whitewater and are not recommended for a broad route listing.",
    "latitude": 37.53557,
    "longitude": -88.54647,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": ["whitewater", "fast_rise", "flash_flood", "strainers", "access_uncertain", "remote", "cold_water"],
      "safetyNotes": [
        "This is an advanced Class II–III wilderness run. American Whitewater reports serious whitewater above 1,000 cfs and higher hazards around 400 cfs and above; scout, portage, and carry rescue equipment appropriate to the level.",
        "The upstream access is a difficult public-road/trail approach through the Lusk Creek Wilderness area, not a developed ramp. Do not assume Stone Bottom Road is passable or that a vehicle can reach the water; confirm current Forest Service rules and conditions before carrying boats in.",
        "The Eddyville Blacktop Road bridge is the practical improved landing, but the route has very limited intermediate exits. Lusk Creek can double or triple in height within hours after rain; check the direct gauge, rainfall, debris, and water temperature immediately before launch."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03384450",
      "provider": "usgs",
      "siteId": "03384450",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Lusk Creek Near Eddyville, IL",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03384450/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv/?site_no=03384450"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 250,
      "idealMax": 400,
      "tooLow": 150,
      "tooHigh": 1000,
      "thresholdSource": {"label": "American Whitewater Lusk Creek flow guidance", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3887/main", "provider": "american_whitewater"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [3,4,5,6,7,8,9,10,11],
      "seasonNotes": "Rain-responsive and often too low outside wet periods. Check the direct hydrograph, recent rainfall, debris, water temperature, and same-day Forest Service access conditions.",
      "difficulty": "hard",
      "difficultyNotes": "Class II–III whitewater with boulder gardens, strainers, mandatory portage areas, and very limited road access or emergency exits.",
      "confidenceNotes": "American Whitewater ties this named reach directly to USGS 03384450 and gives flow context; Miles Paddled documents endpoint names, coordinates, distance, shuttle, and access caveats. Thresholds are community planning guidance, not a safety guarantee."
    },
    "putIn": {"id": "lusk-saltpeter-cave-crossing", "name": "Saltpeter Cave Crossing / Trail 481 access area", "latitude": 37.53557, "longitude": -88.54647},
    "takeOut": {"id": "lusk-eddyville-blacktop-bridge", "name": "Eddyville Blacktop Road bridge landing", "latitude": 37.47259, "longitude": -88.54769},
    "logistics": {
      "distanceLabel": "8.1 river miles",
      "estimatedPaddleTime": "About 5 hours including wilderness carry-in, scouting, and portage decisions",
      "shuttle": "Arrange a vehicle shuttle of roughly 7.5 road miles; Stone Bottom Road can become impassable mud and the upstream access may require a 1.5-mile carry from Trail 481.",
      "permits": "Verify current Shawnee National Forest wilderness, road, trail, parking, and boating rules before staging. No route-specific paddling permit was confirmed.",
      "camping": "Day route; no on-route camping is assumed. Use only designated Shawnee National Forest sites and confirm current wilderness rules.",
      "campingClassification": "nearby_basecamp",
      "summary": "Treat this as a weather-dependent advanced day run, not a casual float. Scout the upstream access and have a conservative turn-around plan before committing.",
      "accessCaveats": ["Trail 481 and Stone Bottom Road are difficult wilderness approaches; do not infer a drive-to launch from a map pin.", "Intermediate exits are scarce and the creek can rise or fall rapidly after rain.", "Use the improved Eddyville Blacktop Road bridge landing only after confirming current parking and carry-out conditions."],
      "watchFor": ["rapidly rising water", "debris and strainers", "boulder gardens and portage sections", "limited emergency exits", "muddy or impassable access roads", "cold water"]
    },
    "evidenceNotes": [
      {"label": "Named route corridor", "value": "Saltpeter Cave Crossing / Trail 481 to Eddyville Blacktop Road bridge; 8.1 mi", "note": "Miles Paddled documents the endpoint names, coordinates, distance, shuttle, and wilderness-access limitations.", "sourceUrl": "https://milespaddled.com/lusk-creek/"},
      {"label": "Direct live gauge", "value": "USGS 03384450 Lusk Creek near Eddyville", "note": "USGS publishes current continuous discharge and gage-height data for the exact reach.", "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03384450/"},
      {"label": "Flow guidance", "value": "250–400 cfs planning window; 1,000+ cfs serious/not broadly recommended", "note": "American Whitewater and trip reports describe the runnable character and hazards across these ranges; this is community guidance, not a safety certification.", "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3887/main"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use rights-clean map/route presentation."
      }
    ],
    "sourceLinks": [
      {"label": "USGS 03384450 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03384450/", "provider": "usgs"},
      {"label": "American Whitewater Lusk Creek Canyon", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3887/main", "provider": "american_whitewater"},
      {"label": "Miles Paddled Lusk Creek route report", "url": "https://milespaddled.com/lusk-creek/", "provider": "miles_paddled"},
      {"label": "Shawnee National Forest", "url": "https://www.fs.usda.gov/shawnee", "provider": "local"}
    ]
  },
  {
    "id": "south-branch-kishwaukee-kingston-irene",
    "slug": "south-branch-kishwaukee-kingston-irene",
    "name": "South Branch Kishwaukee River",
    "reach": "Kingston Park to Irene Road",
    "aliases": [
      "South Branch Kishwaukee - Kingston to Kirkland",
      "Kishwaukee River South Branch Kingston to Irene Road",
      "Kingston to Irene Road Kishwaukee paddle"
    ],
    "state": "Illinois",
    "region": "Northern Illinois",
    "summary": "An 11.5-mile South Branch Kishwaukee day paddle from the documented Kingston Park launch to the Irene Road take-out, with riffles, forest preserves, deadfall, and a mandatory portage on the lower reach.",
    "statusText": "Use the Fairdale USGS gauge as the direct reach reference. The source trip recommends keeping the Fairdale gage below 3.50 ft and notes that lower water is safer through the deadfall-heavy downstream section; this is conservative planning guidance, not a safety guarantee.",
    "latitude": 42.10284,
    "longitude": -88.75875,
    "routeType": "recreational",
    "gaugeSource": {
      "id": "usgs-05439500",
      "provider": "usgs",
      "siteId": "05439500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "South Branch Kishwaukee River near Fairdale, IL",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05439500/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?site_no=05439500"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "strainers",
        "access_uncertain",
        "access_uncertain",
        "private_banks"
      ],
      "safetyNotes": [
        "The Kingston-to-Irene report documents a mandatory log-jam portage and numerous deadfall hazards in Potawatomi Woods and MacQueen Forest Preserve; this is not a beginner route at higher water.",
        "Use the named Kingston Park launch and Irene Road take-out only. Irene is a rough, muddy exit, and alternate forest-preserve take-outs may be difficult to access or lack a launch.",
        "Keep the Fairdale gage below 3.50 ft, inspect current conditions immediately before departure, and be prepared to turn around or portage. Stay in the craft beside private banks and respect preserve rules."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2.0,
      "idealMax": 3.0,
      "tooLow": 1.5,
      "tooHigh": 3.5,
      "thresholdSource": {
        "label": "South Branch Kishwaukee Fairdale gauge float guidance",
        "url": "https://duckdodge62.wixsite.com/tdsmh/post/float-route-south-branch-winnebago-co",
        "provider": "miles_paddled"
      },
      "thresholdSourceStrength": "community",
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
      "seasonNotes": "Spring through fall is practical, but deadfall and shallow sections can change after storms and during low water. Check local preserve and river conditions before launching.",
      "difficulty": "moderate",
      "difficultyNotes": "The upper reach has gentle riffles and beginner-friendly character, but downstream forest preserves include strainers, strong current at higher levels, and a mandatory log-jam portage.",
      "confidenceNotes": "The route clears the evidence bar for a conservative listing because an independent paddle report provides named endpoints, coordinates, direct Fairdale gauge guidance, distance, hazards, and a real-time trip context; DeKalb County confirms public canoe/kayak access at Kishwaukee Forest Preserve. The threshold is community guidance and must not be presented as a safety certification."
    },
    "putIn": {
      "id": "kingston-park-launch",
      "name": "Kingston Park launch",
      "latitude": 42.10284,
      "longitude": -88.75875
    },
    "takeOut": {
      "id": "irene-road-takeout",
      "name": "Irene Road take-out",
      "latitude": 42.10995,
      "longitude": -88.90054
    },
    "logistics": {
      "distanceLabel": "11.5 river miles",
      "estimatedPaddleTime": "About 3 hours on-water, longer with portages and scouting",
      "shuttle": "Approximately 9 road miles; arrange a vehicle shuttle before launching",
      "permits": "No special permit identified; verify current park and preserve rules",
      "camping": "Day route; no on-route camping is assumed. Confirm any separate campground or preserve rules before planning overnight use.",
      "campingClassification": "none",
      "summary": "Plan as a one-day paddle with a pre-arranged shuttle and contingency for portage or an early take-out.",
      "accessCaveats": [
        "Irene Road is a rough, muddy take-out rather than a developed launch.",
        "Forest-preserve access points may be carry-in or difficult exits; do not infer vehicle access from a map pin alone."
      ],
      "watchFor": [
        "deadfall and strainers",
        "mandatory log-jam portage",
        "rising water and pushy current",
        "private banks and muddy exits"
      ]
    },
    "evidenceNotes": [
      {
        "label": "Named endpoint pair",
        "value": "Kingston Park launch to Irene Road take-out",
        "note": "Miles Paddled documents the 11.5-mile reach, exact endpoint names, coordinates, distance, and shuttle context.",
        "sourceUrl": "https://milespaddled.com/kishwaukee-river-south-branch/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 05439500 Fairdale gage height",
        "note": "USGS publishes discharge and gage height for the South Branch Kishwaukee near Fairdale; the paddle report uses this station as the reach reference.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05439500/"
      },
      {
        "label": "Conservative flow guidance",
        "value": "Fairdale gage below 3.50 ft; normal reference about 2.35 ft",
        "note": "A local float report publishes the threshold and warns that lower water is preferable through the deadfall-heavy downstream section.",
        "sourceUrl": "https://duckdodge62.wixsite.com/tdsmh/post/float-route-south-branch-winnebago-co"
      },
      {
        "label": "Public access context",
        "value": "Kishwaukee Forest Preserve canoe and kayak access",
        "note": "DeKalb County confirms public canoe, kayak, and fishing access along the South Branch.",
        "sourceUrl": "https://dekalbcounty.org/departments/forest-preserve/kishwaukee/"
      }
    ],
    "sourceLinks": [
      {
        "label": "USGS 05439500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05439500/",
        "provider": "usgs"
      },
      {
        "label": "Miles Paddled route report",
        "url": "https://milespaddled.com/kishwaukee-river-south-branch/",
        "provider": "miles_paddled"
      },
      {
        "label": "Fairdale gage float guidance",
        "url": "https://duckdodge62.wixsite.com/tdsmh/post/float-route-south-branch-winnebago-co",
        "provider": "miles_paddled"
      },
      {
        "label": "DeKalb County Kishwaukee Forest Preserve",
        "url": "https://dekalbcounty.org/departments/forest-preserve/kishwaukee/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "pecatonica-river-wes-block-tuttys",
    "slug": "pecatonica-river-wes-block-tuttys",
    "name": "Pecatonica River",
    "reach": "Wes Block Trail Access to Tutty's Crossing Trailhead",
    "aliases": [
      "Pecatonica River - Wes Block to Tutty's Crossing",
      "Pecatonica River Water Trail - Wes Block to downtown Freeport",
      "Pecatonica River - Wes Block Trailhead to Tutty's Crossing"
    ],
    "state": "Illinois",
    "region": "Northwest Illinois",
    "summary": "Freeport water-trail day from the Wes Block public launch to downtown Tutty's Crossing, with two named public boat launches and a conservative lower-Pec proxy gauge from Darlington.",
    "statusText": "Use the Pecatonica River at Darlington gauge as a lower-Pec proxy. Treat 101 to 250 cfs as the best window, 251 to 350 cfs as high but usually manageable, 351 to 500 cfs as experienced-only high water, and 501+ cfs as too high and muddy for a broad recommendation.",
    "latitude": 42.330992586134,
    "longitude": -89.666227460683,
    "gaugeSource": {
      "id": "usgs-05432500",
      "provider": "usgs",
      "siteId": "05432500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Pecatonica River at Darlington, WI",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05432500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "The Freeport water trail is gentle by paddling standards, but storms can move fresh wood into the channel and make muddy banks or exits more awkward than the launch photos suggest.",
        "Use only the named public launches at Wes Block and Tutty's Crossing. Outside the trailheads, banks are often muddy and may be private or unsuitable for casual exits.",
        "Skip the route when the Darlington proxy is pushing into the high-water bands or when current blockages, footings, or recent cleanup reports make the lower Pec look less forgiving than usual."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 101,
      "idealMax": 250,
      "tooLow": 100,
      "tooHigh": 501,
      "thresholdSource": {
        "label": "Wisconsin River Trips lower-Pec Darlington-gauge ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/pecatonica-river/roller-coaster-road",
        "provider": "wisconsin_river_trips"
      },
      "thresholdSourceStrength": "community",
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
      "seasonNotes": "Spring through fall is the practical season. The route is gentle enough for warm-weather day trips, but the lower Pecatonica is naturally muddy and becomes pushier, browner, and less pleasant as the Darlington proxy climbs.",
      "difficulty": "easy",
      "difficultyNotes": "Mostly gentle current and a short-to-medium shuttle, but muddy banks, occasional strainers, and a few miles without easy emergency exits keep it from being a pure beginner pond paddle.",
      "confidenceNotes": "Confidence is good for a conservative Illinois add: Jane Addams Trail and Illinois Paddling Council document both public launches, Wisconsin River Trips places Wes Block Trailhead to Tutty's Crossing in the lower-Pec segment list and publishes a Darlington-gauge ladder for that lower river, and USGS 05432500 is a live same-river upstream gauge. Confidence is moderate for scoring because the gauge is a lower-Pec proxy upstream in Darlington rather than on the exact Freeport stretch."
    },
    "evidenceNotes": [
      {
        "label": "Official access pair",
        "value": "Wes Block to Tutty's Crossing",
        "note": "Jane Addams Trail lists Wes Block Trail Access at 2636 W Fairview Road and Tutty's Crossing Trailhead at 250 E Stephenson Street, both with parking and boat-launch amenities on the Pecatonica corridor.",
        "sourceUrl": "https://janeaddamstrail.com/"
      },
      {
        "label": "Exact route shape",
        "value": "6.4 river miles",
        "note": "Wisconsin River Trips identifies Wes Block Trailhead to Tutty's Crossing as a 6.4-mile lower-Pecatonica segment entering Freeport with nicer woods and attractive trail bridges.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/pecatonica-river/roller-coaster-road"
      },
      {
        "label": "Published lower-Pec ladder",
        "value": "101 to 250 cfs target range",
        "note": "Wisconsin River Trips uses the Pecatonica River at Darlington gauge for the lower Pec and rates under 100 cfs as still generally navigable, 101-210 cfs as very ideal, 211-250 cfs as average and fine, 251-290 cfs as above average but manageable, 291-350 cfs as high, 351-500 cfs as very high and experienced-only, and 501+ cfs as too high and muddy for enjoyable paddling.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/pecatonica-river/roller-coaster-road"
      },
      {
        "label": "Proxy gauge",
        "value": "USGS 05432500",
        "note": "USGS operates Pecatonica River at Darlington, WI with current discharge and gage-height observations. Wisconsin River Trips uses this gauge for lower-Pec route planning, including the Freeport-bound segment list.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05432500/"
      },
      {
        "label": "Freeport trip context",
        "value": "Half-mile / 3-mile / 9-mile combinations",
        "note": "Greater Freeport Partnership says local paddlers use Tutty's Crossing to Hancock Marina as a half-mile trip, Tutty's Crossing to the VFW as a 3-mile trip, and Wes Block to the VFW as a 9-mile trip, which supports the Wes Block-to-downtown Freeport water-trail corridor as a normal public shuttle.",
        "sourceUrl": "https://greaterfreeport.com/2018/01/all-in-kayaking-on-the-pecatonica-river/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Jane Addams Trail official trailheads and amenities",
        "url": "https://janeaddamstrail.com/",
        "provider": "local"
      },
      {
        "label": "Illinois Paddling Council Wes Block Landing article",
        "url": "https://illinoispaddling.org/newest-boat-launch-completed-at-wes-block-landing-on-the-pecatonica-river/",
        "provider": "local"
      },
      {
        "label": "Greater Freeport Partnership Pecatonica paddling overview",
        "url": "https://greaterfreeport.com/2018/01/all-in-kayaking-on-the-pecatonica-river/",
        "provider": "local"
      },
      {
        "label": "Wisconsin River Trips Pecatonica lower-Pec gauge guide",
        "url": "https://www.wisconsinrivertrips.com/segments/pecatonica-river/roller-coaster-road",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05432500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05432500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "vermilion-river-lowell-oglesby",
    "slug": "vermilion-river-lowell-oglesby",
    "name": "Vermilion River",
    "reach": "Lowell to Oglesby Boat Launch",
    "aliases": [
      "Big Vermilion River",
      "Vermillion River"
    ],
    "state": "Illinois",
    "region": "North-Central Illinois",
    "summary": "Illinois whitewater run from the Lowell / N.2249th Road rafting put-in to the Oglesby boat launch below Ed Hand Highway. This is a real II-III route with Wildcat and other named rapids, not a casual flatwater float.",
    "statusText": "Use the Leonore USGS gauge. Treat 1,000 to 3,000 cfs as the best broad whitewater window, 500 cfs as the low runnable floor, and anything much above 12,000 cfs as beyond the American Whitewater high-runnable range.",
    "latitude": 41.255211,
    "longitude": -89.014118,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "fast_rise",
        "strainers",
        "access_uncertain",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "American Whitewater rates this Wildcat Canyon reach Class II-III. Private boaters should have whitewater rescue, scouting, and swim-recovery skills before launching.",
        "Use the Lowell rafting access and the Oglesby boat launch. Do not use the older N.2219th Road access or side-canyon land for routine scouting because source guidance flags private-property and unopened-land concerns.",
        "The Leonore gauge can change quickly after rain. Stay inside the route-specific whitewater range, avoid cold or rising water, and expect wood, pushy wave trains, and harder swims above the conservative target window."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05555300",
      "provider": "usgs",
      "siteId": "05555300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Vermilion River Near Leonore, IL",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05555300/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1000,
      "idealMax": 3000,
      "tooLow": 500,
      "tooHigh": 12000,
      "thresholdSource": {
        "label": "American Whitewater Vermilion / Wildcat Canyon flow correlation",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/651/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "This rain-responsive whitewater reach can be runnable outside the usual summer recreation pattern. Check the Leonore hydrograph, recent rain, water temperature, outfitter status, and local closure or access notices before committing.",
      "difficulty": "hard",
      "difficultyNotes": "American Whitewater rates the reach II-III, with Wildcat as the signature Class III feature. The route is pool-drop, but high water gets pushy and private boaters should be comfortable scouting, swimming, and recovering gear in moving water.",
      "confidenceNotes": "Confidence is high enough for a conservative whitewater listing: American Whitewater ties the exact reach to USGS 05555300, publishes a 500 to 12,000 cfs runnable correlation, and lists the public take-out at the Oglesby boat launch. The app narrows the best window to 1,000 to 3,000 cfs because the source narrative says the river becomes good and pushy over 1,000 cfs, while older trip evidence treats 3,000 cfs as a high-water day rather than a broad recommendation."
    },
    "evidenceNotes": [
      {
        "label": "Whitewater reach",
        "value": "8.15 miles, Class II-III",
        "note": "American Whitewater lists the route as N.2249th Road to the landing off Ed Hand Highway, with II-III difficulty and named features including Wildcat, Railroad, and The Narrows.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/651/main"
      },
      {
        "label": "Gauge range",
        "value": "500 to 12,000 cfs runnable correlation",
        "note": "American Whitewater ties the reach to USGS 05555300 at Leonore and exposes a low-runnable to high-runnable flow correlation in cfs.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/651/main"
      },
      {
        "label": "Best-zone rationale",
        "value": "1,000 to 3,000 cfs conservative target",
        "note": "The app uses a narrower target than the full AW runnable range: AW says the river becomes good and pushy over 1,000 cfs, and trip-report evidence at roughly 3,000 cfs reads as high-water whitewater rather than a normal broad recommendation.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/651/main"
      },
      {
        "label": "Take-out access",
        "value": "Oglesby Vermilion River Boat Ramp",
        "note": "The City of Oglesby describes the lower Vermilion boat ramp as a take-out for rafting, canoeing, and kayaking, with a launch and parking.",
        "sourceUrl": "https://oglesbyil.gov/vermilion-river-boat-ramp/"
      },
      {
        "label": "Public-facing route context",
        "value": "14 rapids, 9.5-mile outfitter trip",
        "note": "Enjoy Illinois and Vermillion River Rafting describe guided/self-guided rafting on this Lowell-to-Oglesby corridor, supporting the route as a normal local paddling use pattern rather than a speculative line.",
        "sourceUrl": "https://www.enjoyillinois.com/explore/listing/vermillion-river-rafting/"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Vermilion / Wildcat Canyon",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/651/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 05555300 Vermilion River Near Leonore",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05555300/",
        "provider": "usgs"
      },
      {
        "label": "City of Oglesby Vermilion River Boat Ramp",
        "url": "https://oglesbyil.gov/vermilion-river-boat-ramp/",
        "provider": "local"
      },
      {
        "label": "Enjoy Illinois Vermillion River Rafting",
        "url": "https://www.enjoyillinois.com/explore/listing/vermillion-river-rafting/",
        "provider": "local"
      },
      {
        "label": "Vermillion River Rafting",
        "url": "https://vermillionriverrafting.com/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "kishwaukee-river-hickory-bills-distillery",
    "slug": "kishwaukee-river-hickory-bills-distillery",
    "name": "Kishwaukee River",
    "reach": "Hickory Bills Canoe Launch to Distillery Road Conservation Area",
    "aliases": [
      "Kishwaukee River - Belvidere to Distillery Road",
      "Kishwaukee River - Hickory Bills to Distillery Road",
      "Kishwaukee River Water Trail - Hickory Bills to Distillery"
    ],
    "state": "Illinois",
    "region": "Northern Illinois",
    "summary": "Short lower-Belvidere Kishwaukee River Water Trail run from Hickory Bills Canoe Launch to Distillery Road Conservation Area. Public access is unusually well documented for Illinois, and the Belvidere USGS gauge has route-specific local flow bands.",
    "statusText": "Use the Belvidere USGS gauge. The most useful window is roughly 201 to 600 cfs. Below 200 cfs, expect low but usually passable water with scraping; above 600 cfs, the river is very high, less attractive, and less appropriate for a broad recommendation.",
    "latitude": 42.255487,
    "longitude": -88.861792,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "access_uncertain",
        "private_banks",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Use only the established Hickory Bills and Distillery Road public launches. Do not assume permission to land on private banks except for emergency safety needs.",
        "Stage and inspect the Distillery Road take-out before launching because it is a natural conservation-area landing with posted hours and possible hunting-season or winter closures.",
        "Stay inside the Belvidere-gauge planning window and skip high, dirty, or rising water after storms, when strainers, wood, and water-quality concerns become less beginner-friendly."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05438500",
      "provider": "usgs",
      "siteId": "05438500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Kishwaukee River at Belvidere, IL",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05438500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 201,
      "idealMax": 600,
      "tooLow": 200,
      "tooHigh": 600,
      "thresholdSource": {
        "label": "Wisconsin River Trips Belvidere-gauge navigability estimates for the Kishwaukee River",
        "url": "https://www.wisconsinrivertrips.com/segments/kishwaukee-river/belvidere",
        "provider": "wisconsin_river_trips"
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
        10,
        11
      ],
      "seasonNotes": "Spring through fall is the normal paddling window, with late fall still possible when water temperature and daylight are managed. The Kishwaukee responds to rain, and high water can make this normally easy reach dirty, pushy, and less suitable for casual paddlers.",
      "difficulty": "easy",
      "difficultyNotes": "This short reach is generally calm with gravel bars, wooded banks, and only easy riffles, but it is still a natural Illinois river. Strainers, shallow riffles, high-water current, wind, and limited legal exits keep the easy rating conditional.",
      "confidenceNotes": "Confidence is high enough for a conservative Illinois add: the BCCD/Openlands water-trail materials identify Hickory Bills Island and Distillery Road as established public access points, Boone County Conservation District tells paddlers at its Distillery-area sites to use USGS 05438500 at Belvidere for real-time flow and stage, and Wisconsin River Trips gives numeric Belvidere-gauge bands for the lower Belvidere corridor including the Hickory Bills-to-Distillery segment. The main limits are Illinois public-water complexity and threshold precision: the app treats the water-trail/access package as the public-use authority and does not imply permission to land on private banks."
    },
    "evidenceNotes": [
      {
        "label": "Water-trail segment",
        "value": "4.35 to 4.7 miles",
        "note": "The BCCD/Openlands Kishwaukee water-trail map lists Hickory Bills Island to Distillery Road as a 4.35-mile trip, while Wisconsin River Trips rounds the Hickory Bills-to-Distillery segment to 4.7 miles.",
        "sourceUrl": "https://www.bccdil.org/wp-content/uploads/2016/05/Kishwaukee_112906_LowRes2-2016_01_19-17_26_45-UTC.pdf"
      },
      {
        "label": "Public access",
        "value": "Belvidere Park District and BCCD launches",
        "note": "The water-trail map identifies Hickory Bills Island as a Belvidere Park District launch and Distillery Road as a Boone County Conservation District launch with public access amenities.",
        "sourceUrl": "https://www.bccdil.org/wp-content/uploads/2016/05/Kishwaukee_112906_LowRes2-2016_01_19-17_26_45-UTC.pdf"
      },
      {
        "label": "Take-out authority",
        "value": "Distillery Road canoe launch",
        "note": "Boone County Conservation District lists Distillery Road Conservation Area with a canoe launch, parking, portable restroom, picnic tables, and public access to fishing on the Kishwaukee River.",
        "sourceUrl": "https://www.bccdil.org/explore/kishwaukee-bottoms-conservation-area/distillery-road-conservation-area/"
      },
      {
        "label": "Gauge tie",
        "value": "USGS 05438500 at Belvidere",
        "note": "BCCD tells paddlers using Distillery Road or County Line East to check real-time data from the Belvidere stream gage for current water level and flow conditions.",
        "sourceUrl": "https://www.bccdil.org/wp-content/uploads/2017/04/USGS-Information-for-Paddling-post-on-website-04-2017-Rev1.pdf"
      },
      {
        "label": "Flow bands",
        "value": "201-600 cfs target, 600+ very high",
        "note": "Wisconsin River Trips estimates 0-200 cfs as low but mostly navigable, 201-400 cfs as average/good, 401-600 cfs as high but likely navigable, 601-1000 cfs as very high and less attractive, and 1001+ cfs as possible flood level.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/kishwaukee-river/belvidere"
      },
      {
        "label": "Closure check",
        "value": "Lower Kishwaukee open effective 2026-04-24",
        "note": "IDNR River Closures currently lists the lower Kishwaukee closure reach downstream of Cherry Valley as open. This Hickory Bills-to-Distillery route is upstream of that notice, but closure checks remain important for Kishwaukee trips.",
        "sourceUrl": "https://dnr.illinois.gov/closures/riverclosures.html"
      }
    ],
    "sourceLinks": [
      {
        "label": "BCCD / Openlands Kishwaukee River Water Trail map",
        "url": "https://www.bccdil.org/wp-content/uploads/2016/05/Kishwaukee_112906_LowRes2-2016_01_19-17_26_45-UTC.pdf",
        "provider": "local"
      },
      {
        "label": "BCCD Distillery Road Conservation Area",
        "url": "https://www.bccdil.org/explore/kishwaukee-bottoms-conservation-area/distillery-road-conservation-area/",
        "provider": "local"
      },
      {
        "label": "BCCD Kishwaukee USGS paddling guidance",
        "url": "https://www.bccdil.org/wp-content/uploads/2017/04/USGS-Information-for-Paddling-post-on-website-04-2017-Rev1.pdf",
        "provider": "local"
      },
      {
        "label": "Wisconsin River Trips Kishwaukee River - Belvidere",
        "url": "https://www.wisconsinrivertrips.com/segments/kishwaukee-river/belvidere",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05438500 Kishwaukee River at Belvidere",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05438500/",
        "provider": "usgs"
      },
      {
        "label": "IDNR River Closures",
        "url": "https://dnr.illinois.gov/closures/riverclosures.html",
        "provider": "local"
      }
    ]
  },
  {
    "id": "kishwaukee-river-marengo-siems-hwy23",
    "slug": "kishwaukee-river-marengo-siems-hwy23",
    "name": "Kishwaukee River",
    "reach": "Woodbine Launch to Highway 23 Bridge",
    "aliases": [
      "Kishwaukee River - Marengo",
      "North Branch Kishwaukee - Siems Park to Highway 23",
      "Kishwaukee River Water Trail - Woodbine to Route 23"
    ],
    "state": "Illinois",
    "region": "Northern Illinois",
    "routeType": "recreational",
    "summary": "North Branch Kishwaukee day-run from the named Woodbine Launch in Marengo to the Highway 23 bridge. The reach is documented by local paddling organizers and a 2026 outfitter event, and uses the direct Marengo USGS gauge rather than the downstream Belvidere station.",
    "statusText": "Use USGS 05438170 at Marengo. A local Kishwaukee paddling guide recommends roughly 60-700 cfs; current readings should be checked immediately before launch because the reach is narrow, treefall-prone, and rain-responsive.",
    "latitude": 42.26555,
    "longitude": -88.6027,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "access_uncertain",
        "private_banks",
        "low_water"
      ],
      "safetyNotes": [
        "Launch only at the named Woodbine Launch and use the Highway 23 endpoint only when current local access and closure signage permit it; do not enter or exit at unverified private banks.",
        "Paddle the reach as a day trip with a shuttle. No overnight camping at either endpoint is verified, and the local organizers warn about treefalls and changing bridge conditions.",
        "Check the direct Marengo gauge immediately before launching, wear a properly fitted PFD, and skip the trip for rising, muddy, or posted-closed conditions. Scout bridge and obstruction conditions from shore where possible."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05438170",
      "provider": "usgs",
      "siteId": "05438170",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Kishwaukee River at Marengo, IL",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05438170/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 60,
      "idealMax": 700,
      "tooLow": 60,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "McHenry County Environmental Defenders Kishwaukee paddling guidance",
        "url": "https://mcdef.org/wp-content/uploads/2025/09/EDMC_Fall_QuarterlyNewsletter_2025.pdf",
        "provider": "local"
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
        10,
        11
      ],
      "seasonNotes": "Spring through fall is the normal window. The North Branch responds quickly to rain and can carry new wood or pushy current outside the local paddling band.",
      "difficulty": "easy",
      "difficultyNotes": "A generally calm natural-river reach with limited legal exits; the easy rating is conditional on the local flow band, current access, and a fresh obstruction check.",
      "confidenceNotes": "The direct USGS Marengo gauge, named Woodbine and Highway 23 endpoints, 2026 outfitter shuttle event, local water-trail documentation, and local 60-700 cfs guidance clear the conservative add threshold. Access and obstruction conditions remain dynamic, so the route is deliberately published with caution notes and no camping claim."
    },
    "evidenceNotes": [
      {
        "label": "Named public endpoints",
        "value": "Woodbine Launch, 860 Woodbine Lane, Marengo to Highway 23 Bridge, 4394 IL-23, Marengo",
        "note": "Paddle On's 2026 event uses the Woodbine/Marengo area and Highway 23 bridge as the shuttle endpoints; the local Kish group documents Woodbine Launch and Highway 23 access.",
        "sourceUrl": "https://www.paddleonoutfitters.com/current-events/2026/6/13/environment-defenders-kayak-paddle"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05438170 Kishwaukee River at Marengo",
        "note": "The direct station is on the reviewed North Branch corridor; the live listing showed 69.8 cfs and 7.57 ft on the research pass.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05438170/"
      },
      {
        "label": "Local flow band",
        "value": "60-700 cfs",
        "note": "McHenry County Environmental Defenders' local Kishwaukee guidance gives a 60-700 cfs paddling window; Paddle Today treats it as a conservative community threshold, not a government safety certification.",
        "sourceUrl": "https://mcdef.org/wp-content/uploads/2025/09/EDMC_Fall_QuarterlyNewsletter_2025.pdf"
      },
      {
        "label": "Obstruction and closure check",
        "value": "Dynamic treefall and bridge conditions",
        "note": "The local Kish group documents treefall clearing and warns paddlers not to use the Millstream bridge area while conditions or construction signage require closure.",
        "sourceUrl": "https://paddlethekishinmarengo.com/"
      },
      {
        "label": "Camping and logistics",
        "value": "Day trip; shuttle required; no endpoint camping verified",
        "note": "The 2026 outfitter event describes a shuttle between the named endpoints; no overnight camping authorization was found for either endpoint.",
        "sourceUrl": "https://www.paddleonoutfitters.com/current-events/2026/6/13/environment-defenders-kayak-paddle"
      }
    ],
    "sourceLinks": [
      {
        "label": "USGS 05438170 at Marengo",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05438170/",
        "provider": "usgs"
      },
      {
        "label": "Paddle On 2026 Marengo paddle",
        "url": "https://www.paddleonoutfitters.com/current-events/2026/6/13/environment-defenders-kayak-paddle",
        "provider": "local"
      },
      {
        "label": "Paddle the Kish in Marengo",
        "url": "https://paddlethekishinmarengo.com/",
        "provider": "local"
      },
      {
        "label": "Kishwaukee water trail map",
        "url": "https://www.bccdil.org/wp-content/uploads/2016/05/Kishwaukee_112906_LowRes2-2016_01_19-17_26_45-UTC.pdf",
        "provider": "local"
      },
      {
        "label": "McHenry County Environmental Defenders paddling guidance",
        "url": "https://mcdef.org/wp-content/uploads/2025/09/EDMC_Fall_QuarterlyNewsletter_2025.pdf",
        "provider": "local"
      }
    ]
  },
  {
    "id": "fox-river-yorkville-whitewater-course",
    "slug": "fox-river-yorkville-whitewater-course",
    "name": "Fox River",
    "reach": "Marge Cline Whitewater Course",
    "aliases": [
      "Fox River - Yorkville whitewater",
      "Marge Cline Whitewater Course",
      "Bicentennial Riverfront Park whitewater course"
    ],
    "state": "Illinois",
    "region": "Northern Illinois",
    "summary": "Short downtown Yorkville whitewater-play and bypass course around Glen D. Palmer Dam, with public access at both ends, a walk-back lap option, and a direct Yorkville gauge.",
    "statusText": "Use the Fox River at Yorkville gauge. Around 250 cfs is the conservative minimum floor for the course. American Whitewater maps the reach runnable up to about 5,000 cfs, but Paddle Today keeps this as a minimum-only whitewater route rather than claiming a preferred band.",
    "latitude": 41.643002,
    "longitude": -88.445,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "whitewater",
        "fast_rise"
      ],
      "safetyNotes": [
        "This is a dam-bypass whitewater course, not a casual Fox River float. Stay inside the official course and portage layout, and scout features before laps.",
        "Use the designated downstream portage and take-out west of the Route 47 bridge on the south bank; do not improvise lines around the Glen D. Palmer Dam area.",
        "Higher or rising water makes the short course pushier and more consequential, especially for novice whitewater paddlers or crowded warm-weather sessions."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05551580",
      "provider": "usgs",
      "siteId": "05551580",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Fox River at Yorkville, IL",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05551580/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 250,
      "thresholdSource": {
        "label": "American Whitewater Yorkville / Marge Cline Whitewater Course flow range",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4680/flow",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "The city keeps the course open, but Yorkville levels still respond quickly to rain and warm-season usage. Winter ice, cold water, and storm pulses can all change usability on a short timeline.",
      "difficulty": "moderate",
      "difficultyNotes": "American Whitewater rates the course I-II at normal levels, but eddy lines, play features, crowding, and the dam-bypass setting keep it in the whitewater bucket rather than the casual-float bucket.",
      "confidenceNotes": "Confidence is high enough for a conservative whitewater-play add: the City of Yorkville confirms the public open-use bypass chute, east-end boat launch, and designated downstream portage; American Whitewater maps exact put-in and take-out coordinates for the same reach and ties it directly to USGS 05551580; and USGS Water Services returned same-day gauge values during implementation. Paddle Today still scores it minimum-only because the best numeric support is American Whitewater's runnable envelope rather than a manager-published preferred band."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 05551580 at 3,360 cfs / 13.58 ft",
        "note": "USGS Water Services returned same-day June 22, 2026 discharge and stage values for Fox River at Yorkville, confirming the direct live gauge path used for this route.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05551580/"
      },
      {
        "label": "Conservative low-water floor",
        "value": "250 cfs minimum-only",
        "note": "Current American Whitewater flow data for the exact Yorkville reach exposes a 250-5,000 cfs runnable envelope. Paddle Today uses only the 250 cfs floor and does not infer a preferred or upper scoring band from that envelope alone.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4680/flow"
      },
      {
        "label": "Official route shape",
        "value": "About 0.23 mi / 1,100-foot bypass chute",
        "note": "The City of Yorkville describes the Marge Cline course as a free open-use 1,100-foot bypass chute at Bicentennial Riverfront Park with portage points at both ends and about six feet of drop across the facility.",
        "sourceUrl": "https://www.yorkville.il.us/facilities/facility/details/marge-cline-whitewater-course-37"
      },
      {
        "label": "Exact public access coordinates",
        "value": "41.643002, -88.445 to 41.641998, -88.443001",
        "note": "American Whitewater's current map page for the Yorkville reach exposes exact Put In and Take Out coordinates. The city page independently confirms the east-end boat launch and the designated downstream portage west of the Route 47 bridge on the south bank next to the Parks and Recreation building.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4680/map"
      },
      {
        "label": "Public park access",
        "value": "Riverfront Park boat launch and course access",
        "note": "The current Riverfront Park page still identifies Riverfront Park at 131 E Hydraulic Ave as home to the course and lists a public boat launch among the park features.",
        "sourceUrl": "https://www.yorkville.il.us/facilities/facility/details/riverfront-park-2"
      }
    ],
    "sourceLinks": [
      {
        "label": "City of Yorkville Marge Cline Whitewater Course",
        "url": "https://www.yorkville.il.us/facilities/facility/details/marge-cline-whitewater-course-37",
        "provider": "local"
      },
      {
        "label": "City of Yorkville Riverfront Park",
        "url": "https://www.yorkville.il.us/facilities/facility/details/riverfront-park-2",
        "provider": "local"
      },
      {
        "label": "American Whitewater Yorkville reach",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4680/main",
        "provider": "american_whitewater"
      },
      {
        "label": "American Whitewater Yorkville map",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4680/map",
        "provider": "american_whitewater"
      }
    ]
  },
  {
    "id": "middle-fork-vermilion-kinneys-ford-kickapoo",
    "riverId": "middle-fork-vermilion-river",
    "slug": "middle-fork-vermilion-kinneys-ford-kickapoo",
    "name": "Middle Fork Vermilion River",
    "reach": "Kinney's Ford Canoe Access to Kickapoo Bridge Access",
    "state": "Illinois",
    "region": "East-Central Illinois",
    "summary": "A 12.8–13.5-mile National Scenic River corridor from the public Kinney's Ford canoe access through Kennekuk County Park to the Kickapoo Bridge take-out, with direct USGS 03336645 stage/discharge context and a published outfitter flow ladder.",
    "statusText": "Use USGS 03336645 at the Kickapoo State Park Road bridge. Kickapoo Adventures identifies 1.5–2.5 ft as ideal, warns that shallows increase below 1.5 ft, fast water and strainers increase above 2.5 ft, and treats above 3.5 ft as flood-stage/dangerous. These are planning bands, not a safety guarantee; inspect the river and heed closures.",
    "latitude": 40.1369694444444,
    "longitude": -87.7446944444444,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "fast_rise", "strainers", "cold_water", "private_banks", "access_uncertain"],
      "safetyNotes": [
        "Kinney's Ford and the Kickapoo Bridge take-out are named public access points, but confirm current parking, footpath, shuttle, and any seasonal closure conditions before launching.",
        "The direct gauge-linked outfitter bands are planning guidance: below 1.5 ft expect shallow sections and more walking; above 2.5 ft expect faster water, covered gravel bars, and more debris/strainer risk; above 3.5 ft is dangerous/flood-stage context.",
        "The Middle Fork is shallow with frequent riffles and known capsize hazards. Wear a properly fitted PFD, scout wood, and do not continue beyond the named take-out without a separate route plan.",
        "Camping is only at designated facilities; do not camp on river frontage or assume informal access along the National Scenic River."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03336645",
      "provider": "usgs",
      "siteId": "03336645",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Middle Fork Vermilion River above Oakwood, IL",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03336645/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?site_no=03336645"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.5,
      "idealMax": 2.5,
      "tooLow": 1.5,
      "tooHigh": 3.5,
      "thresholdSource": {"label": "Kickapoo Adventures Middle Fork River Info", "url": "https://kickapooadventures.com/river-info/", "provider": "local"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Late spring through early fall is the practical paddling season. Rain can raise the direct gauge quickly; cold water and debris remain concerns in spring and after storms.",
      "difficulty": "moderate",
      "difficultyNotes": "A family-friendly scenic river at normal levels, but the long corridor, shallow sections, riffles, downed-tree hazards, and shuttle logistics require competent boat control and conservative same-day judgment.",
      "confidenceNotes": "Confidence is strong for the route package: Illinois DNR and Kickapoo Adventures identify the named access corridor and outfitter shuttle, Kickapoo publishes direct gauge-linked numeric bands, the VCCD identifies the National Scenic River access network, and USGS provides current direct stage/discharge telemetry at the downstream take-out bridge. Endpoint coordinates use public access mapping and are retained with access caveats."
    },
    "putIn": {"id": "kinneys-ford-canoe-access", "name": "Kinney's Ford public canoe access", "latitude": 40.24229, "longitude": -87.77591},
    "takeOut": {"id": "kickapoo-bridge-access", "name": "Kickapoo Bridge public canoe take-out", "latitude": 40.13753, "longitude": -87.74532},
    "evidenceNotes": [
      {"label": "Official access corridor", "value": "Kinney's Ford to Kickapoo State Park", "note": "Illinois DNR identifies Kinney's Ford access and the west entrance bridge at Kickapoo as the canoe corridor's public access/take-out points.", "sourceUrl": "https://dnr.illinois.gov/parks/activity/park.middlefork.html"},
      {"label": "Exact route and distance", "value": "About 12.8–13.5 river miles", "note": "Kickapoo Adventures documents the full Kinney's Ford-to-Kickapoo trip; its map describes almost 13 miles and the corridor management plan describes 12.8 miles.", "sourceUrl": "https://kickapooadventures.com/paddling-trips/"},
      {"label": "Direct gauge and threshold", "value": "USGS 03336645; ideal 1.5–2.5 ft, dangerous above 3.5 ft", "note": "Kickapoo Adventures publishes the numeric gauge-height bands and links directly to the USGS station; treat them as conservative planning guidance, not a guarantee.", "sourceUrl": "https://kickapooadventures.com/river-info/"},
      {"label": "Safety and river character", "value": "National Scenic River; shallow gravel-bottom channel with riffles, strainers, and covered bars at high water", "note": "Kickapoo's trip information and river map identify frequent riffles, wood/debris hazards, shallow walking sections, and changing gravel-bar availability.", "sourceUrl": "https://kickapooadventures.com/trip-info/"},
      {"label": "Camping and logistics", "value": "Designated camping at Middle Fork State Fish and Wildlife Area and nearby Kickapoo facilities; outfitter shuttle available", "note": "Illinois DNR documents designated camping and access facilities; Kickapoo Adventures documents shuttle transportation for river trips.", "sourceUrl": "https://dnr.illinois.gov/parks/park.middlefork.html"},
      {"label": "Endpoint coordinates", "value": "Kinney's Ford 40.24229,-87.77591; Kickapoo Bridge 40.13753,-87.74532", "note": "Coordinates are tied to the named public access features in public map data and should be confirmed against current signs/parking on arrival.", "sourceUrl": "https://mapcarta.com/N12571703977"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 03336645 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03336645/", "provider": "usgs"},
      {"label": "Kickapoo Adventures river conditions", "url": "https://kickapooadventures.com/river-info/", "provider": "local"},
      {"label": "Kickapoo Adventures paddling trips", "url": "https://kickapooadventures.com/paddling-trips/", "provider": "local"},
      {"label": "Illinois DNR Middle Fork access and camping", "url": "https://dnr.illinois.gov/parks/activity/park.middlefork.html", "provider": "local"},
      {"label": "Vermilion County Conservation District National Scenic River", "url": "https://vccd.org/national-scenic-river/", "provider": "local"},
      {"label": "Kickapoo Bridge access coordinates", "url": "https://mapcarta.com/N12571657825", "provider": "local"}
    ],
    "aliases": ["Middle Fork Vermilion Kinney's Ford to Kickapoo", "Middle Fork River Kinney's Ford full trip"]
  },
  {
    "id": "mississippi-river-piasa-harbor-alton-riverfront",
    "riverId": "mississippi-river",
    "slug": "mississippi-river-piasa-harbor-alton-riverfront",
    "name": "Mississippi River",
    "reach": "Piasa Harbor to Alton Riverfront",
    "state": "Illinois",
    "region": "Metro-East Illinois",
    "summary": "A guarded 7-mile Pool 26 Mississippi River Water Trail reach from the named Piasa Harbor launch to the public Alton Riverfront take-out. The Mississippi River Water Trail documents the itinerary, shuttle, and finish; USACE and USGS provide direct Pool 26 live level context.",
    "statusText": "Use USGS 05587498 / USACE Alton Pool 26 stage as a launch-floor check. Treat 14.0 ft as the conservative minimum planning floor tied to USACE low-water reference; below that, ramps and harbor access can become unusable. This is a big-river route: stay out of the navigation channel and away from tows, wing dikes, bridges, debris, and the Melvin Price lock complex.",
    "latitude": 38.8855000354463,
    "longitude": -90.1759188990604,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "fast_rise", "cold_water", "access_uncertain"],
      "safetyNotes": [
        "Piasa Harbor and Alton Riverfront are named public access points in the Pool 26 water-trail and USACE recreation materials; confirm parking, ramp condition, shuttle, and any temporary closure before launching.",
        "Use USGS 05587498 / USACE Alton Pool 26 stage as a conservative planning check. Below 14.0 ft, low-water drawdown can compromise ramps and harbor access; above the floor, conditions still require same-day visual judgment.",
        "Commercial tows have right-of-way and may be very large. Stay out of the navigation channel, give vessels extensive room, avoid blind spots, and never assume a tow can maneuver around a paddle craft.",
        "Stay clear of wing dikes, bridge approaches, floating debris, lock-and-dam structures, and strong cross-channel currents. Wear a properly fitted PFD and carry communication and rescue equipment.",
        "This is a day route with no on-route camping assumption. Use designated nearby camping or lodging and do not land on private or restricted frontage."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05587498",
      "provider": "usgs",
      "siteId": "05587498",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Mississippi River Pool Lock and Dam 26 at Alton, IL",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05587498/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?site_no=05587498"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 14.0,
      "tooLow": 14.0,
      "thresholdSource": {"label": "USACE Alton Pool 26 low-water reference", "url": "https://www.mvs-wc.usace.army.mil/trans/mi/mial_30e.html", "provider": "local"},
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Late spring through fall is the practical recreational season, subject to wind, storms, river rise, navigation conditions, and seasonal ramp status.",
      "difficulty": "hard",
      "difficultyNotes": "The route follows a broad commercial navigation pool. It is appropriate only for paddlers with big-river judgment, boat control, rescue planning, and willingness to stay away from the navigation channel and lock structures.",
      "confidenceNotes": "Confidence is strong for the named access itinerary and safety framing: the Mississippi River Water Trail documents the 7-mile Piasa Harbor-to-Alton finish, USACE lists both access areas, the USGS/USACE station provides direct Pool 26 level telemetry, and the Water Trail publishes commercial-traffic and structure hazards. The 14.0-ft floor is an operational low-water reference, not an agency-certified paddling guarantee."
    },
    "putIn": {"id": "piasa-harbor-access", "name": "Piasa Harbor public access", "latitude": 38.9370857212856, "longitude": -90.2867113839149},
    "takeOut": {"id": "alton-riverfront-access", "name": "Alton Riverfront public boat launch", "latitude": 38.8855000354463, "longitude": -90.1759188990604},
    "evidenceNotes": [
      {"label": "Exact route and distance", "value": "Piasa Harbor to Alton Riverfront; about 7 miles", "note": "The Mississippi River Water Trail's Great Rivers itinerary documents the 7-mile Piasa Harbor launch and Alton Boat Launch finish with shuttle logistics.", "sourceUrl": "https://mississippiriverwatertrail.org/great-rivers-rendezvous/"},
      {"label": "Public endpoints", "value": "Piasa Harbor Area to Alton Riverfront Recreation Area", "note": "USACE recreation and Pool 26 access inventories identify Piasa Harbor/Piasa Creek access and the Alton Riverfront boat ramp as public facilities.", "sourceUrl": "https://www.mvs.army.mil/Missions/Recreation/Rivers-Project-Office/Recreation/"},
      {"label": "Direct gauge and threshold", "value": "USGS 05587498; 14.0 ft conservative minimum planning floor", "note": "USGS supplies current Pool 26 gage-height telemetry; USACE's Alton Pool data publish a 14.0-ft low-water reference, and launch closures at approximately 413 ft elevation document the practical low-water risk.", "sourceUrl": "https://www.mvs-wc.usace.army.mil/trans/mi/mial_30e.html"},
      {"label": "Safety and river character", "value": "Broad commercial navigation pool with tows, wing dikes, bridges, debris, and lock/dam hazards", "note": "The Mississippi River Water Trail gives explicit commercial-traffic, wake, obstruction, and PFD rules for paddlers.", "sourceUrl": "https://mississippiriverwatertrail.org/safety/"},
      {"label": "Camping and logistics", "value": "Day route; nearby Pere Marquette and regional camping/lodging; shuttle recommended", "note": "The Water Trail lists nearby camping/lodging and a shuttle-based itinerary; no informal on-route camping is assumed.", "sourceUrl": "https://mississippiriverwatertrail.org/great-rivers-rendezvous/"},
      {"label": "Endpoint coordinates", "value": "Piasa Harbor 38.93709,-90.28671; Alton Riverfront 38.88550,-90.17592", "note": "Coordinates are derived from the USACE Pool 26 access-inventory UTM locations and should be confirmed against current launch signage.", "sourceUrl": "https://www.mvs.army.mil/Portals/54/docs/recreation/rivers/MasterPlan/2015MasterPlan/Rivers%20Project%20Master%20Plan%202015%20-%20Pool%2026%20Maps.pdf"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 05587498 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05587498/", "provider": "usgs"},
      {"label": "USACE Alton Pool 26 level data", "url": "https://www.mvs-wc.usace.army.mil/trans/mi/mial_30e.html", "provider": "local"},
      {"label": "Mississippi River Water Trail itinerary", "url": "https://mississippiriverwatertrail.org/great-rivers-rendezvous/", "provider": "local"},
      {"label": "Mississippi River Water Trail safety", "url": "https://mississippiriverwatertrail.org/safety/", "provider": "local"},
      {"label": "USACE Rivers Project recreation access", "url": "https://www.mvs.army.mil/Missions/Recreation/Rivers-Project-Office/Recreation/", "provider": "local"},
      {"label": "USACE Pool 26 access inventory", "url": "https://www.mvs.army.mil/Portals/54/docs/recreation/rivers/MasterPlan/2015MasterPlan/Rivers%20Project%20Master%20Plan%202015%20-%20Pool%2026%20Maps.pdf", "provider": "local"}
    ],
    "aliases": ["Mississippi River Piasa Harbor to Alton", "Pool 26 Piasa Harbor to Alton Riverfront"]
  },
  {
    "id": "west-branch-dupage-mcdowell-knoch-knolls",
    "riverId": "west-branch-dupage-river",
    "slug": "west-branch-dupage-mcdowell-knoch-knolls",
    "name": "West Branch Du Page River",
    "reach": "McDowell Grove to Knoch Knolls Park",
    "aliases": [
      "DuPage River Water Trail McDowell Grove to Knoch Knolls",
      "West DuPage River McDowell Grove Knoch Knolls",
      "Naperville DuPage River paddle"
    ],
    "state": "Illinois",
    "region": "Northeastern Illinois",
    "summary": "An approximately 8.1-mile West Branch DuPage River water trail from the McDowell Grove launch through the Fawell Dam portage and Naperville public canoe accesses to Knoch Knolls Park.",
    "statusText": "Use USGS 05540130 near Naperville as a conservative direct reach check. A local paddling report documents a successful West Branch trip at 400 cfs and 6.0 ft, while the water-trail guidance warns that low water can make passage difficult and high water or fast current increases risk. Treat 400 cfs as a conservative minimum-only planning floor, not a safety certification.",
    "latitude": 41.796111,
    "longitude": -88.185446,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "fast_rise", "strainers", "dam", "cold_water", "access_uncertain"],
      "safetyNotes": [
        "The McDowell Grove-to-Knoch Knolls water trail is an intermediate-to-expert corridor. Scout current conditions, wear a properly fitted PFD, and do not launch during flood conditions or after a rapid storm rise.",
        "Fawell Dam requires the documented portage on river right when heading south. Never run the dam or approach its hydraulic features; use the signed portage and inspect the launch back into the river.",
        "The 400-cfs/6.0-ft reference comes from a local paddle report and is conservative planning guidance only. Low water can expose shallow riffles and require dragging or walking; higher water can create pushy current and debris.",
        "Use only the named public launches at McDowell Grove, Pioneer Park, Weigand Riverfront Park, and Knoch Knolls Park. Do not infer public landing rights from the river trail or private frontage between them.",
        "Illinois DNR closure notices and DuPage County conditions can change. Check the current closure/status pages immediately before departure."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05540130",
      "provider": "usgs",
      "siteId": "05540130",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "West Branch Du Page River near Naperville, IL",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05540130/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?site_no=05540130"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 400,
      "tooLow": 400,
      "thresholdSource": {"label": "Prairie State Canoeists Naperville gauge trip report", "url": "https://prairiestatecanoeists.wildapricot.org/events-stories/6140527?tpg=3", "provider": "miles_paddled"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Late spring through fall is the practical season. The river responds quickly to storms, and cold water, low-water shallows, and debris remain concerns outside stable warm-weather conditions.",
      "difficulty": "moderate",
      "difficultyNotes": "The named water trail has ordinary moving-water character but includes shallow sections, a mandatory dam portage, potential strainers, and changing urban access conditions. It is not a beginner route at high or rapidly rising water.",
      "confidenceNotes": "Confidence is sufficient for a conservative scored-route add: Openlands publishes the named 8.1-mile water trail, exact endpoint/access coordinates, and Fawell Dam portage; DuPage County and Naperville confirm public river access; Prairie State Canoeists tie a completed paddle to USGS 05540130 at 400 cfs and 6.0 ft. The threshold remains community guidance and is intentionally minimum-only."
    },
    "putIn": {"id": "mcdowell-grove-launch", "name": "McDowell Grove public launch", "latitude": 41.796111, "longitude": -88.185446},
    "takeOut": {"id": "knoch-knolls-park-launch", "name": "Knoch Knolls Park canoe launch", "latitude": 41.712496, "longitude": -88.141763},
    "logistics": {
      "distanceLabel": "Approximately 8.1 river miles",
      "estimatedPaddleTime": "About 3–5 hours including scouting, the Fawell Dam portage, and access stops",
      "shuttle": "Arrange a vehicle shuttle between McDowell Grove and Knoch Knolls Park; verify parking and preserve hours before launching.",
      "permits": "DuPage Forest Preserve District says no permit is required for boating on its rivers; follow current preserve, Naperville Park District, and Illinois boating rules.",
      "camping": "Day route; no on-route camping is assumed. Use separate designated campgrounds or lodging and do not camp on preserve or private river frontage.",
      "campingClassification": "none",
      "summary": "Plan as a full-day moving-water paddle with a pre-arranged shuttle and a mandatory dam portage.",
      "accessCaveats": [
        "McDowell Grove, Pioneer Park, Weigand Riverfront Park, and Knoch Knolls are named access sites, but parking, hours, paths, and launch conditions can change.",
        "Fawell Dam portage and downstream re-entry must be inspected on arrival; do not substitute an unverified bank exit."
      ],
      "watchFor": ["Fawell Dam and portage", "low-water shallows", "fast rise after storms", "strainers and debris", "private banks and preserve rules"]
    },
    "evidenceNotes": [
      {"label": "Named water-trail corridor", "value": "McDowell Grove to Knoch Knolls Park; approximately 8.1 miles", "note": "Openlands publishes the DuPage River Water Trail map, route length, skill level, named access sites, and dam-portage warning.", "sourceUrl": "https://openlands.org/wp-content/uploads/2024/02/DRWT_McDowellGrove_to_KnochKnollsPark_TripMap_021524.pdf"},
      {"label": "Direct live gauge and threshold", "value": "USGS 05540130; 400 cfs and 6.0 ft minimum-only planning reference", "note": "The USGS station is on the West Branch near Naperville. Prairie State Canoeists document a completed paddle at 400 cfs and 6.0 ft; treat this community reference as conservative planning guidance, not a safety guarantee.", "sourceUrl": "https://prairiestatecanoeists.wildapricot.org/events-stories/6140527?tpg=3"},
      {"label": "Official public access", "value": "McDowell Grove, Warrenville Grove, Pioneer Park, Weigand Riverfront Park, and Knoch Knolls Park", "note": "DuPage Forest Preserve District and Naperville Park District identify public river access and canoe launches; Knoch Knolls confirms its accessible canoe launch.", "sourceUrl": "https://www.dupageforest.org/things-to-do/recreational-activities/boating"},
      {"label": "Dam and safety evidence", "value": "Fawell Dam portage required; intermediate-to-expert water trail", "note": "Openlands' map marks Fawell Dam and the developed portage; its safety disclaimer warns against low water, high water, fast currents, and uninspected conditions.", "sourceUrl": "https://openlands.org/wp-content/uploads/2024/02/DRWT_McDowellGrove_to_KnochKnollsPark_TripMap_021524.pdf"},
      {"label": "Endpoint coordinates", "value": "McDowell Grove 41.796111,-88.185446; Knoch Knolls 41.712496,-88.141763", "note": "Coordinates are published on the Openlands water-trail map and should be confirmed against current signs and access conditions.", "sourceUrl": "https://openlands.org/wp-content/uploads/2024/02/DRWT_McDowellGrove_to_KnochKnollsPark_TripMap_021524.pdf"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use the product's rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 05540130 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05540130/", "provider": "usgs"},
      {"label": "Openlands DuPage River Water Trail map", "url": "https://openlands.org/wp-content/uploads/2024/02/DRWT_McDowellGrove_to_KnochKnollsPark_TripMap_021524.pdf", "provider": "local"},
      {"label": "Prairie State Canoeists gauge trip report", "url": "https://prairiestatecanoeists.wildapricot.org/events-stories/6140527?tpg=3", "provider": "miles_paddled"},
      {"label": "DuPage Forest Preserve boating access", "url": "https://www.dupageforest.org/things-to-do/recreational-activities/boating", "provider": "local"},
      {"label": "Knoch Knolls Park canoe launch", "url": "https://napervilleparks.org/location/knochknollspark", "provider": "local"},
      {"label": "Illinois DNR river closures", "url": "https://dnr.illinois.gov/closures/riverclosures.html", "provider": "local"}
    ]
  },
  {
    "id": "big-bureau-creek-red-covered-bridge-county-road-1150",
    "riverId": "big-bureau-creek",
    "slug": "big-bureau-creek-red-covered-bridge-county-road-1150",
    "name": "Big Bureau Creek",
    "reach": "Red Covered Bridge Park to County Road 1150",
    "aliases": ["Big Bureau Creek Princeton to Tiskilwa", "Big Bureau Creek Red Covered Bridge to Tiskilwa"],
    "state": "Illinois",
    "region": "North-central Illinois",
    "summary": "A documented approximately 13-mile Big Bureau Creek run from Red Covered Bridge Park near Princeton to County Road 1790 E/County Road 1150 N north of Tiskilwa, with riffles, a Class I(II) aqueduct drop, and a logjam hazard near the take-out.",
    "statusText": "Use USGS 05556500 as the direct reach gauge. Miles Paddled reports 350 cfs as an absolute minimum and 450 cfs as ideal based on local paddlers; these are minimum-only planning references, not safety guarantees.",
    "latitude": 41.41657,
    "longitude": -89.47836,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": ["low_water", "fast_rise", "strainers", "whitewater", "access_uncertain", "private_banks"],
      "safetyNotes": [
        "This is an intermediate Class I(II) moving-water route. Scout current conditions, wear a properly fitted PFD, and do not launch during flood conditions or after a rapid rise.",
        "The Hennepin Canal aqueduct has a documented Class I(II) drop; inspect and portage if the line is not clearly safe. A logjam is reported near the take-out.",
        "350 cfs is an absolute minimum and 450 cfs is ideal according to the cited local guidance. Treat both as conservative planning references only; current, debris, and access can change.",
        "Use only the named public endpoints and verify parking, road access, and any landowner or closure changes before launching or taking out."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05556500",
      "provider": "usgs",
      "siteId": "05556500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Bureau Creek at Princeton, IL",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05556500/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv/?site_no=05556500"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 450,
      "tooLow": 350,
      "thresholdSource": {"label": "Big Bureau Creek paddle report", "url": "https://milespaddled.com/big-bureau-creek/", "provider": "miles_paddled"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Late spring through fall is the practical season; verify stable levels and same-day weather before departure.",
      "difficulty": "hard",
      "difficultyNotes": "Intermediate moving water with a Class I(II) feature, debris/logjam exposure, and changing access conditions.",
      "confidenceNotes": "The route clears the evidence bar because the direct USGS station, named public endpoints, exact endpoint coordinates, station-specific 350/450 cfs guidance, route hazards, and logistics are documented by the cited sources."
    },
    "putIn": {"id": "red-covered-bridge-park", "name": "Red Covered Bridge Park public access", "latitude": 41.41657, "longitude": -89.47836},
    "takeOut": {"id": "county-road-1790e-1150n", "name": "County Road 1790 E / County Road 1150 N", "latitude": 41.31386, "longitude": -89.51863},
    "logistics": {
      "distanceLabel": "Approximately 13 river miles",
      "estimatedPaddleTime": "About 5–8 hours depending on level, scouting, and portage decisions",
      "shuttle": "Arrange a vehicle shuttle between Red Covered Bridge Park and the County Road 1790 E/1150 N take-out; verify road and bank access before launch.",
      "permits": "No route-specific paddling permit is identified; follow Illinois boating/PFD rules and all posted park, county, and canal restrictions.",
      "camping": "Use designated Hennepin Canal State Park or nearby campground/lodging options only; no private-bank or on-route camping is assumed.",
      "campingClassification": "nearby_basecamp",
      "summary": "Plan as a full-day moving-water paddle with a pre-arranged shuttle, conservative level check, and scouting at the aqueduct and take-out.",
      "accessCaveats": ["Named endpoints and coordinates come from the cited paddle report; confirm current parking, road, bank, and landowner conditions immediately before departure.", "Do not infer public landing rights from intervening private frontage."],
      "watchFor": ["Low water below 350 cfs", "rapid rises and debris", "Class I(II) Hennepin Canal aqueduct drop", "logjam near take-out", "private banks and access changes"]
    },
    "evidenceNotes": [
      {"label": "Named route corridor", "value": "Red Covered Bridge Park to County Road 1150; approximately 13 miles", "note": "Miles Paddled documents the route, endpoints, skill level, and hazards.", "sourceUrl": "https://milespaddled.com/big-bureau-creek/"},
      {"label": "Direct live gauge and thresholds", "value": "USGS 05556500; 350 cfs absolute minimum and 450 cfs ideal", "note": "Community/local threshold guidance tied to this creek and route; not a safety guarantee.", "sourceUrl": "https://milespaddled.com/big-bureau-creek/"},
      {"label": "Endpoint coordinates", "value": "Put-in 41.41657,-89.47836; take-out 41.31386,-89.51863", "note": "Published by the route report; verify current access on arrival.", "sourceUrl": "https://milespaddled.com/big-bureau-creek/"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 05556500 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05556500/", "provider": "usgs"},
      {"label": "USGS 05556500 current conditions", "url": "https://waterdata.usgs.gov/nwis/uv/?site_no=05556500", "provider": "usgs"},
      {"label": "Big Bureau Creek paddle report", "url": "https://milespaddled.com/big-bureau-creek/", "provider": "miles_paddled"},
      {"label": "Illinois DNR canoe and kayak guidance", "url": "https://dnr.illinois.gov/recreation/canoekayak.html", "provider": "local"}
    ]
  },
  {
    "id": "blackberry-creek-jaycee-pond-river-road",
    "riverId": "blackberry-creek",
    "slug": "blackberry-creek-jaycee-pond-river-road",
    "name": "Blackberry Creek",
    "reach": "Jaycee Pond Park to River Road",
    "aliases": ["Blackberry Creek Jaycee Pond Park", "Blackberry Creek Yorkville whitewater reach"],
    "state": "Illinois",
    "region": "Northeastern Illinois",
    "summary": "A documented 0.34-mile Blackberry Creek training reach from public Jaycee Pond Park to the River Road bridge in Yorkville, with three rock-arch drops and a bridge ledge.",
    "statusText": "Use USGS 05551700 near Yorkville as the direct reach gauge. American Whitewater reports the reach at approximately 70 cfs and describes roughly 250 cfs trips; these community observations are planning guidance only, not a safety guarantee.",
    "latitude": 41.64704,
    "longitude": -88.45286,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": ["low_water", "fast_rise", "whitewater", "dam", "access_uncertain"],
      "safetyNotes": [
        "This is a short Class II training reach, not a beginner float. Scout all rock-arch drops and the River Road bridge ledge before committing.",
        "American Whitewater describes the reach at approximately 70 cfs and reports higher-flow trips near 250 cfs. Treat those observations as local planning guidance only; debris, feature condition, and bridge hydraulics change.",
        "Use the public Jaycee Pond Park access and verify the downstream take-out and current bridge/park conditions before launching."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05551700",
      "provider": "usgs",
      "siteId": "05551700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Blackberry Creek near Yorkville, IL",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05551700/",
      "hydrographUrl": "https://waterdata.usgs.gov/il/nwis/uv/?PARAmeter_cd=00065%2C00060&site_no=05551700"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 250,
      "tooLow": 70,
      "thresholdSource": {"label": "American Whitewater Blackberry Creek trip reports", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/10906/main", "provider": "american_whitewater"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [3, 4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Short spring and storm-dependent season; verify stable levels and same-day weather before departure.",
      "difficulty": "hard",
      "difficultyNotes": "Short Class II pool-drop reach with three rock-arch features and a bridge ledge; intended for competent paddlers and scouting practice.",
      "confidenceNotes": "The route clears the evidence bar as a specialized short training reach because American Whitewater documents the named public Jaycee Pond access, take-out, length, hazards, and gauge-linked observations, while USGS provides direct telemetry."
    },
    "putIn": {"id": "jaycee-pond-park", "name": "Jaycee Pond Park public access", "latitude": 41.64704, "longitude": -88.45286},
    "takeOut": {"id": "blackberry-creek-river-road", "name": "River Road bridge take-out", "latitude": 41.64527, "longitude": -88.45000},
    "logistics": {
      "distanceLabel": "Approximately 0.34 river miles",
      "estimatedPaddleTime": "About 30–90 minutes including scouting and repeated feature runs",
      "shuttle": "No vehicle shuttle is assumed; arrange a short carry or verify the documented downstream access before launching.",
      "permits": "No route-specific permit is identified; follow Yorkville park rules and Illinois boating/PFD requirements.",
      "camping": "Day-use training reach; no on-route camping is assumed.",
      "campingClassification": "none",
      "summary": "Plan as a short, technical training run with scouting, a safety boat/rescue plan, and a conservative flow check.",
      "accessCaveats": ["Jaycee Pond Park is public, but downstream take-out access and bridge conditions must be confirmed immediately before use.", "Do not run the bridge ledge or rock features without a current scouting and rescue plan."],
      "watchFor": ["Rock-arch drops", "River Road bridge ledge", "low water and exposed rock", "rapid rise/debris", "changing park and take-out access"]
    },
    "evidenceNotes": [
      {"label": "Named route corridor", "value": "Jaycee Pond Park to River Road; approximately 0.34 mile", "note": "American Whitewater documents the reach, access points, feature sequence, and Class II rating.", "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/10906/main"},
      {"label": "Direct live gauge and observations", "value": "USGS 05551700; approximately 70 cfs observed and 250 cfs trip reports", "note": "Community observations tied to the Yorkville gauge; not a safety guarantee.", "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/10906/main"},
      {"label": "Public access", "value": "Jaycee Pond Park, 410 West Center Street, Yorkville", "note": "The City of Yorkville identifies the park and adjacent Blackberry Creek natural area.", "sourceUrl": "https://www.yorkville.il.us/facilities/facility/details/Jaycee-Pond-18"},
      {"label": "Image decision", "value": "No external image copied", "note": "Use rights-clean map/route presentation until a permissioned image is separately cleared."}
    ],
    "sourceLinks": [
      {"label": "USGS 05551700 current conditions", "url": "https://waterdata.usgs.gov/il/nwis/uv/?PARAmeter_cd=00065%2C00060&site_no=05551700", "provider": "usgs"},
      {"label": "American Whitewater reach page", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/10906/main", "provider": "american_whitewater"},
      {"label": "Yorkville Jaycee Pond facility", "url": "https://www.yorkville.il.us/facilities/facility/details/Jaycee-Pond-18", "provider": "local"}
    ]
  },
  {
    "id": "hickory-creek-pilcher-park-south-joliet-street",
    "riverId": "hickory-creek",
    "slug": "hickory-creek-pilcher-park-south-joliet-street",
    "name": "Hickory Creek",
    "reach": "Pilcher Park to S. Joliet Street",
    "aliases": ["Hickory Creek Joliet", "Hickory Creek Corcoran Park to S. Joliet Street"],
    "state": "Illinois",
    "region": "Northeastern Illinois",
    "summary": "A documented approximately 4.2-mile Class II urban whitewater reach from the public Pilcher Park area to the S. Joliet Street bridge, with a direct Hickory Creek gauge and dam, bridge, concrete-channel, and strainer hazards.",
    "statusText": "Use USGS 05539000 as the direct reach gauge. American Whitewater community guidance treats about 300 cfs as a minimum planning reference; this is not a safety guarantee.",
    "latitude": 41.5355868,
    "longitude": -88.0136675,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": ["low_water", "fast_rise", "dam", "whitewater", "strainers", "urban_water_quality", "access_uncertain"],
      "safetyNotes": ["Launch only below the Pilcher Park dam area and never run the dam; inspect and portage all dam, bridge, and concrete-channel features.", "American Whitewater reports roughly 300 cfs as a minimum planning reference. Flow, debris, strainers, and features change; scout immediately before committing.", "Use named public access only and verify the S. Joliet Street carry-out, parking, and local rules. Do not infer landing rights from the EPA monitoring location or private frontage.", "This urban Class II route is for competent paddlers with a rescue plan, PFDs, and a willingness to turn around or portage."],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {"id": "usgs-05539000", "provider": "usgs", "siteId": "05539000", "metric": "discharge_cfs", "unit": "cfs", "kind": "direct", "siteName": "Hickory Creek at Joliet, IL", "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05539000/", "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv/?site_no=05539000"},
    "profile": {"thresholdModel": "minimum-only", "idealMin": 345, "tooLow": 300, "thresholdSource": {"label": "American Whitewater Hickory Creek trip reports", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/6801/main", "provider": "american_whitewater"}, "thresholdSourceStrength": "community", "rainfallSensitivity": "high", "seasonMonths": [3,4,5,6,7,8,9,10], "seasonNotes": "Storm- and spring-dependent; verify stable flow, debris, and same-day weather.", "difficulty": "hard", "difficultyNotes": "Class II urban whitewater with a dam, bridge hydraulics, strainers, and concrete walls; competent paddlers and scouting required.", "confidenceNotes": "American Whitewater documents the named reach, direct gauge, length, hazards, and community flow guidance; Illinois DNR confirms public Pilcher Park water access including kayaking; USGS provides direct telemetry."},
    "putIn": {"id": "pilcher-park-hickory-creek", "name": "Pilcher Park below-dam public access", "latitude": 41.5355868, "longitude": -88.0136675},
    "takeOut": {"id": "south-joliet-street-hickory-creek", "name": "S. Joliet Street bridge take-out", "latitude": 41.5076556, "longitude": -88.0838861},
    "logistics": {"distanceLabel": "Approximately 4.2 river miles", "estimatedPaddleTime": "About 2–4 hours including scouting and portage decisions", "shuttle": "Arrange a short vehicle shuttle between Pilcher Park and S. Joliet Street; verify parking and carry-out conditions first.", "permits": "No route-specific permit identified; follow Joliet Park District, Illinois DNR, and Illinois boating/PFD rules.", "camping": "Day-use urban route; no on-route camping is assumed.", "campingClassification": "none", "summary": "Plan as a short urban whitewater run with a conservative flow check and mandatory dam/feature scouting.", "accessCaveats": ["Verify exact below-dam carry-in and S. Joliet Street carry-out points on arrival; do not infer access from a monitoring location."], "watchFor": ["Pilcher Park dam", "railroad and road bridges", "strainers and debris", "concrete walls", "rapid rise", "changing take-out access"]},
    "evidenceNotes": [{"label": "Named route corridor", "value": "Pilcher Park to S. Joliet Street; approximately 3.75 miles", "note": "American Whitewater documents the reach, Class II character, length, gauge, and hazard sequence; its title uses Corcoran Park but the trip narrative identifies Pilcher Park as the usual put-in.", "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/6801/main"}, {"label": "Direct live gauge and threshold", "value": "USGS 05539000; about 300 cfs minimum planning reference", "note": "Community reports describe 300 cfs as a minimum; not a safety guarantee.", "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05539000/"}, {"label": "Public access", "value": "Pilcher Park, Joliet", "note": "Illinois DNR and Joliet Park District identify public park water access.", "sourceUrl": "https://dnr.illinois.gov/inpc/lwr-display.pilcher-park%C2%A0.html"}, {"label": "Endpoint coordinates", "value": "Pilcher Park 41.5355868,-88.0136675; S. Joliet Street 41.5076556,-88.0838861", "note": "Verify exact carry-in/carry-out points.", "sourceUrl": "https://www.waterqualitydata.us/provider/STORET/IL_EPA_WQX/IL_EPA_WQX-GG-22/"}, {"label": "Image decision", "value": "No external image copied", "note": "Use rights-clean map/route presentation."}],
    "sourceLinks": [{"label": "USGS 05539000 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05539000/", "provider": "usgs"}, {"label": "American Whitewater reach page", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/6801/main", "provider": "american_whitewater"}, {"label": "Illinois DNR Pilcher Park", "url": "https://dnr.illinois.gov/inpc/lwr-display.pilcher-park%C2%A0.html", "provider": "local"}, {"label": "Joliet Park District Pilcher Park", "url": "https://jolietpark.org/pilcher-park-nature-center", "provider": "local"}, {"label": "Illinois EPA Hickory Creek monitoring location", "url": "https://www.waterqualitydata.us/provider/STORET/IL_EPA_WQX/IL_EPA_WQX-GG-22/", "provider": "local"}]
  }
];
