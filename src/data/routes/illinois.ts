// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const illinoisRoutes: River[] = [
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
  }
];
