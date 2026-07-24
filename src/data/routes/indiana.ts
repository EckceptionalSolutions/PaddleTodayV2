// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const indianaRoutes: River[] = [
  {
    "id": "big-pine-creek-450-harrison-twin-bridges",
    "slug": "big-pine-creek-450-harrison-twin-bridges",
    "name": "Big Pine Creek",
    "reach": "450 \"Harrison\" Bridge Access Point to Twin Bridges Access Point",
    "aliases": [
      "Big Pine Creek - 450 Harrison to Twin Bridges",
      "Big Pine Creek lower public pair",
      "Big Pine Creek Honey Branch Bluff access pair"
    ],
    "state": "Indiana",
    "region": "Wabash Valley Indiana",
    "routeType": "whitewater",
    "summary": "Lower Big Pine Creek day from NICHES' 450 \"Harrison\" Bridge Access Point to Twin Bridges Access Point. Current NICHES pages and Warren County's live boat-access lease support the public pair, and the Pine Village USGS gauge gives a direct same-creek condition check.",
    "statusText": "Use the Big Pine Creek at Pine Village gauge. Around 200 cfs is the conservative low-water floor; below that expect scraping and partial walk-on-rock lines. No route-specific upper band is claimed for this shorter public pair.",
    "latitude": 40.382053,
    "longitude": -87.332652,
    "gaugeSource": {
      "id": "usgs-033356848",
      "provider": "usgs",
      "siteId": "033356848",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Pine Creek at Pine Village, IN",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-033356848/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a lower Big Pine whitewater/swiftwater route with class I ledges, waves, and bedrock current lines. Scout first if anyone in the group is not comfortable reading current and self-rescuing.",
        "American Whitewater's lower-section reports support the 200 cfs floor, but no route-specific upper cutoff is published for the 450 Harrison public pair. Skip the route when the creek is muddy, pushy, or rising beyond the group's comfort.",
        "Use only the named public accesses. Warren County's lease supports single-day public use at 450N and forbids overnight parking, and banks away from named access points may be private."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "American Whitewater Big Pine lower-section trip reports",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/2563/reports",
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
      "seasonNotes": "Spring through fall is the practical window, but Big Pine is highly rain-sensitive. The lower Harrison-to-Twin-Bridges section can stay runnable after the upper Rocky Ford reach drops out, while thunderstorms and fresh runoff can quickly turn the creek pushy and debris-heavy.",
      "difficulty": "moderate",
      "difficultyNotes": "Guarded novice-whitewater / swiftwater route. Lower-section reports describe class I rapids and ledges with easy surfing potential, but low-water rock contact, fast rises, private-bank limits, and simple bridge-access landings keep it out of casual-float territory.",
      "confidenceNotes": "Confidence is good for a conservative Indiana add: current NICHES pages name the exact 450 Harrison to Twin Bridges public pair and provide direct map links for both coordinates; the live Warren County lease PDF still supports NICHES' boat-access operation with associated parking at County Road 450N and no overnight parking; American Whitewater currently ties the corridor to direct USGS 033356848 and includes lower-section Harrison-to-Twin-Bridges runnable-floor reports; and USGS Water Services returned same-day discharge and stage during implementation. Confidence stays conservative because the threshold source is community trip-report evidence and the shorter public pair has no manager-published high-water band or mileage table."
    },
    "evidenceNotes": [
      {
        "label": "Public endpoint pair",
        "value": "450 \"Harrison\" Bridge Access Point to Twin Bridges Access Point",
        "note": "Current NICHES pages explicitly name 450 \"Harrison\" Bridge Access Point as the upstream start and Twin Bridges Access Point as the downstream finish for current Big Pine Creek access work.",
        "sourceUrl": "https://www.nicheslandtrust.org/calendar/big-pine-creek-access-site-cleanup"
      },
      {
        "label": "Preserve route context",
        "value": "Put in at 450 N and take out at Twin Bridges",
        "note": "NICHES says Honey Branch Bluff is only accessible from Big Pine Creek and directs paddlers to put in upstream at 450 N and take out at the Twin Bridges.",
        "sourceUrl": "https://nicheslandtrust.org/warren-county/honey-branch-bluff"
      },
      {
        "label": "Public day-use rules",
        "value": "Single-day use; no overnight parking",
        "note": "The current Warren County lease for Big Pine Creek boat access lets NICHES operate the access with associated parking and says the county does not extend rights for overnight camping, equipment storage beyond single-day use, or overnight parking.",
        "sourceUrl": "https://www.warrencounty.in.gov/Documents/How%20Do%20I/Documents%20and%20Forms/Government%20Document%20Center/Ordinances/2019/Lease%20Big%20Pine%20Creek%20Boat%20Access.pdf?t=202602250609300"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 033356848 at 1,920 cfs / 11.84 ft",
        "note": "USGS legacy current conditions showed same-day June 19, 2026 readings for Big Pine Creek at Pine Village, confirming the direct discharge and stage path used for this route.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=033356848"
      },
      {
        "label": "Conservative low-water floor",
        "value": "200 cfs minimum-only",
        "note": "American Whitewater trip reports for the lower section say Harrison Bridge to Twin Bridges can run down to around 200 cfs, while a separate lower-section Twin Bridges park-and-play report at 173 cfs called it the bare minimum and said 200 cfs would be better. Paddle Today uses only the conservative 200 cfs floor and does not infer an upper band.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/2563/reports"
      },
      {
        "label": "Lower-section character",
        "value": "Lower section class I rapids and ledges",
        "note": "American Whitewater's current Big Pine page lists the adjacent corridor as II+(III) overall, and its lower-section report specifically describes Harrison Bridge to Twin Bridges as scenic class I rapids and ledges that remain runnable after the upper section gets too low.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/2563/main"
      },
      {
        "label": "Endpoint coordinates",
        "value": "40.382053, -87.332652 to 40.339953, -87.314311",
        "note": "NICHES' current map links for the cleanup start and finish resolve to these exact public access coordinates for 450 Harrison and Twin Bridges.",
        "sourceUrl": "https://www.nicheslandtrust.org/calendar/big-pine-creek-access-site-cleanup"
      }
    ],
    "sourceLinks": [
      {
        "label": "NICHES Big Pine Creek Access Site Cleanup",
        "url": "https://www.nicheslandtrust.org/calendar/big-pine-creek-access-site-cleanup",
        "provider": "local"
      },
      {
        "label": "NICHES Honey Branch Bluff",
        "url": "https://nicheslandtrust.org/warren-county/honey-branch-bluff",
        "provider": "local"
      },
      {
        "label": "Warren County Big Pine Creek boat access lease",
        "url": "https://www.warrencounty.in.gov/Documents/How%20Do%20I/Documents%20and%20Forms/Government%20Document%20Center/Ordinances/2019/Lease%20Big%20Pine%20Creek%20Boat%20Access.pdf?t=202602250609300",
        "provider": "local"
      },
      {
        "label": "American Whitewater Big Pine reach",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/2563/main",
        "provider": "american_whitewater"
      },
      {
        "label": "American Whitewater Big Pine trip reports",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/2563/reports",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 033356848 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-033356848/",
        "provider": "usgs"
      },
      {
        "label": "USGS 033356848 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=033356848",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "sugar-creek-deers-mill-cox-ford",
    "slug": "sugar-creek-deers-mill-cox-ford",
    "name": "Sugar Creek",
    "reach": "Deer's Mill Public Access to Cox Ford Public Access",
    "aliases": [
      "Sugar Creek - Deer's Mill to Cox Ford",
      "Sugar Creek - Deer's Mill Covered Bridge to Cox Ford Covered Bridge",
      "Sugar Creek Shades to Turkey Run classic day trip"
    ],
    "state": "Indiana",
    "region": "West Central Indiana",
    "summary": "Classic scenic Sugar Creek day from Deer's Mill to Cox Ford through the Shades and Turkey Run corridor. Current Indiana DNR maps confirm the public access pair, and the Crawfordsville USGS gauge gives a direct same-creek condition check.",
    "statusText": "Use the Sugar Creek at Crawfordsville gauge. Around 75 cfs is the conservative low-water floor for Deer's Mill starts. No route-specific upper cfs band is claimed; about 3 ft of stage is only high-side livery-stop context, not a full scoring range.",
    "latitude": 39.946497,
    "longitude": -87.059065,
    "gaugeSource": {
      "id": "usgs-03339500",
      "provider": "usgs",
      "siteId": "03339500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Sugar Creek at Crawfordsville, IN",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03339500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "IndianaOutfitters says Sugar Creek can rise quickly and become dangerous. Skip the route when the river is muddy, rapidly rising, or clearly stronger than the group wants.",
        "Use only the named public access points. Deer's Mill has limited loading parking, and the current Turkey Run map says a parking permit is required at Cox Ford public access.",
        "Banks away from the named access points may be private or otherwise unsuitable for casual stopping. Plan the full shuttle and do not assume mid-route exits."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 75,
      "thresholdSource": {
        "label": "IndianaOutfitters Sugar Creek streamflow guidance",
        "url": "https://www.indianaoutfitters.com/data_sugar.html",
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
        10
      ],
      "seasonNotes": "Spring through fall is the practical season. Sugar Creek is one of Indiana's most popular scenic paddles, but the corridor gets crowded in warm weather and can rise quickly after rain.",
      "difficulty": "easy",
      "difficultyNotes": "Mostly gentle current and a well-known shuttle, but the 14-mile length, limited long-term parking at the landings, slippery banks, and fast-rise behavior mean this is still a real river day rather than a lazy pond float.",
      "confidenceNotes": "Confidence is good for a conservative Indiana add: current Indiana DNR maps still name Deer's Mill Creek Access and label Cox Ford Covered Bridge as Public Access with permit parking, IndianaOutfitters still publishes a route-specific 75 cfs minimum for Deer's Mill starts plus exact public-access KML pins for both landings, Visit Montgomery County still anchors the Deer's Mill area at the bridge address, and USGS Water Services returned same-day June 20, 2026 current values for 03339500. Confidence stays conservative because the threshold source is community guidance and no exact-route upper discharge band is published."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 03339500 at 907 cfs / 5.16 ft",
        "note": "USGS Water Services returned same-day June 20, 2026 discharge and stage values for Sugar Creek at Crawfordsville, confirming the direct live gauge path used for this route.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03339500/"
      },
      {
        "label": "Conservative low-water floor",
        "value": "75 cfs minimum-only",
        "note": "IndianaOutfitters says the lower bound of possible canoeing is about 75 cfs assuming a start no higher than Deer Mill Covered Bridge, and adds that canoe liveries stop renting at about 3 ft. Paddle Today uses only the 75 cfs floor and does not infer a full upper scoring band.",
        "sourceUrl": "https://www.indianaoutfitters.com/data_sugar.html"
      },
      {
        "label": "Official public access pair",
        "value": "Deer's Mill Creek Access to Cox Ford Public Access",
        "note": "The current Shades State Park map says the Deer's Mill Covered Bridge Area is maintained as access to Sugar Creek for canoeists, and the current Turkey Run map labels Cox Ford Covered Bridge as Public Access with a parking-permit note.",
        "sourceUrl": "https://www.in.gov/dnr/state-parks/files/turkey_run_trail.pdf"
      },
      {
        "label": "Exact access coordinates",
        "value": "39.946497, -87.059065 to 39.885608, -87.223917",
        "note": "The public Sugar Creek KML linked from IndianaOutfitters' map page resolves named placemarks for Deers Mill Access point and Cox Ford Covered Bridge at these exact coordinates, matching the same named public access points used by the route.",
        "sourceUrl": "https://www.google.com/maps/d/kml?mid=1qfBTXchM01cuZZUZfTDyLOScA84&forcekml=1"
      },
      {
        "label": "Route length and take-out context",
        "value": "About 14 mi to the second Turkey Run take-out",
        "note": "IndianaOutfitters says the second take-out site is immediately downstream of Cox Ford Covered Bridge, about 14 miles from Deer's Mill, and usually takes about 3 to 4.5 hours at average water.",
        "sourceUrl": "https://www.indianaoutfitters.com/sugar_creek.html"
      }
    ],
    "sourceLinks": [
      {
        "label": "Indiana DNR Shades State Park map",
        "url": "https://www.in.gov/dnr/state-parks/files/shades_trail.pdf",
        "provider": "local"
      },
      {
        "label": "Indiana DNR Turkey Run State Park map",
        "url": "https://www.in.gov/dnr/state-parks/files/turkey_run_trail.pdf",
        "provider": "local"
      },
      {
        "label": "IndianaOutfitters Sugar Creek streamflow page",
        "url": "https://www.indianaoutfitters.com/data_sugar.html",
        "provider": "local"
      },
      {
        "label": "IndianaOutfitters Sugar Creek overview",
        "url": "https://www.indianaoutfitters.com/sugar_creek.html",
        "provider": "local"
      },
      {
        "label": "IndianaOutfitters Deer's Mill access page",
        "url": "https://www.indianaoutfitters.com/riveraccesspoints/sugar_creek/deers_mill.htm",
        "provider": "local"
      },
      {
        "label": "IndianaOutfitters Cox Ford access page",
        "url": "https://www.indianaoutfitters.com/riveraccesspoints/sugar_creek/cox_ford.htm",
        "provider": "local"
      },
      {
        "label": "IndianaOutfitters Sugar Creek public-access KML",
        "url": "https://www.google.com/maps/d/kml?mid=1qfBTXchM01cuZZUZfTDyLOScA84&forcekml=1",
        "provider": "local"
      },
      {
        "label": "Visit Montgomery County Deer's Mill Covered Bridge",
        "url": "https://www.visitmoco.com/directory-attractions/listing/deers-mill-covered-bridge/",
        "provider": "local"
      },
      {
        "label": "USGS 03339500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03339500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "wildcat-creek-knop-lake-mis-so-lah",
    "slug": "wildcat-creek-knop-lake-mis-so-lah",
    "name": "Wildcat Creek",
    "reach": "Knop Lake Public Fishing Site access to Mis-So-Lah access site",
    "aliases": [
      "Wildcat Creek - Knop Lake to Mis-So-La",
      "Wildcat Creek - Knop Lake to Mis-So-Lah",
      "North Fork Wildcat - Knop Lake to Mis-So-Lah"
    ],
    "state": "Indiana",
    "region": "North Central Indiana",
    "summary": "North Fork Wildcat day from the DNR-managed Knop Lake access to the Mis-So-Lah take-out. Current Wildcat Creek and NICHES pages confirm the named public endpoints, the Owasco USGS gauge gives a direct same-creek condition check, and current community trip guidance preserves a conservative route-specific low-water floor.",
    "statusText": "Use the Wildcat Creek at Owasco gauge. Around 180 cfs is the conservative low-water floor, with 180 to 200 cfs described as a comfortable minimum for the Knop Lake run. No route-specific upper band is claimed, so treat high or rising water cautiously.",
    "latitude": 40.4595504,
    "longitude": -86.66416152,
    "gaugeSource": {
      "id": "usgs-03334000",
      "provider": "usgs",
      "siteId": "03334000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Wildcat Creek at Owasco, IN",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03334000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "private_banks"
      ],
      "safetyNotes": [
        "About a half-mile below Knop Lake the route reaches the old Pyrmont Dam. Wildcat Creek says paddlers should take the right-hand channel that diverts around the dam rather than drifting toward the structure.",
        "Wildcat Creek says the Pyrmont bypass channel is narrow, has a few sharp turns, and tends to funnel water. Higher or rising flow deserves extra caution there even when the rest of the route looks gentle.",
        "Use only the named public access sites. The straight road past the Knop Lake clearing is private property, and banks away from Knop Lake and Mis-So-Lah may be private or unsuitable for casual stopping."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 180,
      "thresholdSource": {
        "label": "Hoosier Canoe and Kayak Club Knop Lake Wildcat trip notice",
        "url": "https://hoosiercanoeandkayakclub.wildapricot.org/event-4156726",
        "provider": "local"
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
      "seasonNotes": "Spring through fall is the practical window. Wildcat Creek calls this one of the better canoeing sections in the valley with reliable water, but low water, fresh wood, and higher or rising flow can still change the feel of the riffles and Pyrmont bypass quickly.",
      "difficulty": "easy",
      "difficultyNotes": "Mostly a gentle scenic canoe route with short riffles and better-than-average depth for the corridor, but the old Pyrmont Dam bypass, 9-plus-mile length, simple carry-down accesses, and private-bank limits still require prepared same-day judgment.",
      "confidenceNotes": "Confidence is good for a conservative Indiana add: current Wildcat Creek pages name the exact 9.3-mile Knop Lake-to-Mis-So-La section, the Pyrmont bypass hazard, and both public access sites; Indiana DNR's current Fish Access layer exposes a named Knop Lake Wildcat Creek Access point with carry-down and parking attributes; NICHES still states Mis-So-Lah is a public put-in/take-out and embeds a map centered on the site; Hoosier Canoe and Kayak Club still preserves a route-specific 180 to 200 cfs comfortable minimum tied to the Owasco gauge; and USGS Water Services returned same-day 2026-06-21 discharge and stage values for 03334000 during implementation. Confidence stays conservative because the threshold evidence is community guidance and the Mis-So-Lah coordinate is an embed-centered public-access anchor rather than a surveyed government ramp point."
    },
    "evidenceNotes": [
      {
        "label": "Direct live gauge",
        "value": "USGS 03334000 at 458 cfs / 2.89 ft",
        "note": "USGS Water Services returned same-day June 21, 2026 discharge and stage values for Wildcat Creek at Owasco, confirming the direct live gauge path used for this route.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03334000/"
      },
      {
        "label": "Conservative low-water floor",
        "value": "180 to 200 cfs comfortable minimum",
        "note": "Hoosier Canoe and Kayak Club's current preserved Wildcat trip notice says 180 to 200 cfs at Owasco is the comfortable minimum flow for the Knop Lake run, with Mis-So-La as the 9-mile short-timer take-out. Paddle Today uses a conservative 180 cfs minimum-only floor and does not infer an upper band.",
        "sourceUrl": "https://hoosiercanoeandkayakclub.wildapricot.org/event-4156726"
      },
      {
        "label": "Official route shape",
        "value": "9.3 mi, about 3 to 5 hr",
        "note": "Wildcat Creek says Knop Lake to Mis-So-La is a 9.3-mile section that takes about 3 to 5 hours, has reliable water, and includes short riffle stretches.",
        "sourceUrl": "https://www.wildcatcreek.net/river_segments/north_fork/knoplake_to_mis-so-la/index.htm"
      },
      {
        "label": "Public put-in",
        "value": "Knop Lake Wildcat Creek Access",
        "note": "Indiana DNR's current Fish Access layer names Knop Lake Wildcat Creek Access on Wildcat Creek with carry-down launch type, parking-lot access, and Division of Fish & Wildlife public-access management. The current Wildcat Creek access page also says the site is at Knop Lake Public Fishing Site and is operated by the Indiana Department of Natural Resources.",
        "sourceUrl": "https://gisdata.in.gov/server/rest/services/Hosted/Fish_Access_RO/FeatureServer/0/query?where=site_name%20%3D%20%27Knop%20Lake%20Wildcat%20Creek%20Access%27&outFields=site_name,waterbody,boat_ramp,parking_info,lat_y,long_x,property_m,type_of_la,type_of_ra,restrooms,campground,county,location&returnGeometry=false&f=json"
      },
      {
        "label": "Public take-out",
        "value": "Mis-So-Lah access site",
        "note": "NICHES says Mis-So-Lah serves as an access point where paddlers can put in or take out after a float, and the current Wildcat Creek access page says the site sits just downstream of the CR 725 E bridge on the left bank with parking and a short dirt path.",
        "sourceUrl": "https://nicheslandtrust.org/tippecanoe-county/mis-so-lah"
      },
      {
        "label": "Endpoint coordinates",
        "value": "40.4595504, -86.66416152 to 40.44428906, -86.76371068",
        "note": "The upstream coordinate comes from Indiana DNR's current Knop Lake Wildcat Creek Access record. The downstream coordinate comes from the current NICHES Mis-So-Lah Google Maps embed centered on the public access site, paired with Wildcat Creek's bridge-side left-bank access description.",
        "sourceUrl": "https://gisdata.in.gov/server/rest/services/Hosted/Fish_Access_RO/FeatureServer/0/query?where=site_name%20%3D%20%27Knop%20Lake%20Wildcat%20Creek%20Access%27&outFields=site_name,waterbody,boat_ramp,parking_info,lat_y,long_x,property_m,type_of_la,type_of_ra,restrooms,campground,county,location&returnGeometry=false&f=json"
      },
      {
        "label": "Dam bypass hazard",
        "value": "Take the right channel around Pyrmont Dam",
        "note": "Wildcat Creek says paddlers encounter the old Pyrmont Dam about one-half mile below Knop Lake and should take the channel to the right because it diverts around the dam; it also warns that the bypass is narrow, has a few sharp turns, and tends to funnel water.",
        "sourceUrl": "https://www.wildcatcreek.net/river_segments/north_fork/knoplake_to_mis-so-la/index.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "Indiana DNR Fish Access record for Knop Lake Wildcat Creek Access",
        "url": "https://gisdata.in.gov/server/rest/services/Hosted/Fish_Access_RO/FeatureServer/0/query?where=site_name%20%3D%20%27Knop%20Lake%20Wildcat%20Creek%20Access%27&outFields=site_name,waterbody,boat_ramp,parking_info,lat_y,long_x,property_m,type_of_la,type_of_ra,restrooms,campground,county,location&returnGeometry=false&f=json",
        "provider": "local"
      },
      {
        "label": "Indiana DNR Where to Fish interactive map",
        "url": "https://www.in.gov/dnr/fish-and-wildlife/fishing/where-to-fish-interactive-map",
        "provider": "local"
      },
      {
        "label": "Wildcat Creek Knop Lake to Mis-So-La",
        "url": "https://www.wildcatcreek.net/river_segments/north_fork/knoplake_to_mis-so-la/index.htm",
        "provider": "local"
      },
      {
        "label": "Wildcat Creek Knop Lake Access Site",
        "url": "https://www.wildcatcreek.net/access_points/north_fork/knop_lake/index.htm",
        "provider": "local"
      },
      {
        "label": "Wildcat Creek Mis-So-La Access Site",
        "url": "https://www.wildcatcreek.net/access_points/north_fork/mis-so-la/index.htm",
        "provider": "local"
      },
      {
        "label": "NICHES Mis-So-Lah",
        "url": "https://nicheslandtrust.org/tippecanoe-county/mis-so-lah",
        "provider": "local"
      },
      {
        "label": "Hoosier Canoe and Kayak Club Wildcat Creek trip notice",
        "url": "https://hoosiercanoeandkayakclub.wildapricot.org/event-4156726",
        "provider": "local"
      },
      {
        "label": "USGS 03334000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03334000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "wabash-river-linn-grove-white-bridge",
    "slug": "wabash-river-linn-grove-white-bridge",
    "name": "Wabash River",
    "reach": "Linn Grove Park to White Bridge Picnic Area",
    "aliases": [
      "Wabash River - Linn Grove to White Bridge",
      "Wells County Wabash Linn Grove to White Bridge"
    ],
    "state": "Indiana",
    "region": "Northeast Indiana",
    "summary": "Longer Wells County Wabash day from Linn Grove Park to White Bridge Picnic Area. The river is still broad-audience at ordinary levels, but the local stage window stays strict at 1.5 to 3 ft.",
    "statusText": "Wells County Trails calls 1.5 to 3 ft the ideal kayaking height. The latest official USGS reading available during this run was 1.41 ft at 2026-07-16 02:45 EDT, so expect shallow dragging and slower progress on this longer run.",
    "latitude": 40.645752,
    "longitude": -85.031219,
    "gaugeSource": {
      "id": "usgs-03323000",
      "provider": "usgs",
      "siteId": "03323000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Wabash River at Bluffton, IN"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.5,
      "idealMax": 3,
      "tooLow": 1.5,
      "tooHigh": 3,
      "thresholdSource": {
        "label": "Wells County Trails Wabash River kayaking stage guidance",
        "url": "https://www.wellscountytrails.org/kayaking"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "Spring through fall can work when the Bluffton stage is inside the local kayaking band. Heavy rain can turn this longer rural run into a debris-heavy commitment.",
      "difficulty": "easy",
      "difficultyNotes": "The current is generally mellow, but 9.5 miles of river with limited legal exits make this more of a real day plan than the shorter Wells County links.",
      "confidenceNotes": "Confidence is good for a conservative Indiana add: Wells County Trails supports the route by combining its 5.3-mile Linn Grove-to-Vera Cruz leg and 4.2-mile Vera Cruz-to-White Bridge leg under the same Bluffton gauge guidance, Northeast Indiana Water Trails exposes both endpoint coordinates, and USGS Water Services returned the latest official values available during this run as 1.41 ft and 33.7 cfs at 2026-07-16 02:45 EDT for 03323000."
    },
    "evidenceNotes": [
      {
        "label": "Local stage band",
        "value": "1.5 to 3 ft",
        "note": "Wells County Trails says this is the ideal river height for kayaking and warns never to enter during Action or Flood Stages.",
        "sourceUrl": "https://www.wellscountytrails.org/kayaking"
      },
      {
        "label": "Public route shape",
        "value": "9.5 mi total",
        "note": "Wells County Trails lists Linn Grove Park to Vera Cruz as 5.3 miles and Vera Cruz to White Bridge Picnic Area as 4.2 miles, supporting the combined Linn Grove-to-White Bridge route.",
        "sourceUrl": "https://www.wellscountytrails.org/kayaking"
      },
      {
        "label": "Endpoint coordinates",
        "value": "40.645752, -85.031219 to 40.728082, -85.136707",
        "note": "The Northeast Indiana Water Trails map lists Linn Grove Park at 40.645752, -85.031219 and Wabash / White Bridge at 40.728082, -85.136707.",
        "sourceUrl": "https://neiwatertrails.com/map"
      },
      {
        "label": "Live gauge",
        "value": "1.41 ft / 33.7 cfs",
        "note": "USGS Water Services returned the latest official values available during this run at 2026-07-16 02:45 EDT for Wabash River at Bluffton, IN.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03323000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Indiana water-trail context",
        "value": "DNR points to NEI Water Trails",
        "note": "Indiana DNR says its old canoe-guide material was removed as outdated and lists Northeast Indiana Water Trails as a current regional resource that includes the Wabash River.",
        "sourceUrl": "https://www.in.gov/dnr/state-parks/recreation/water-trails/water-trails-guide"
      }
    ],
    "sourceLinks": [
      {
        "label": "Wells County Trails kayaking",
        "url": "https://www.wellscountytrails.org/kayaking"
      },
      {
        "label": "Northeast Indiana Water Trails map",
        "url": "https://neiwatertrails.com/map"
      },
      {
        "label": "Indiana DNR Water Trails Guide",
        "url": "https://www.in.gov/dnr/state-parks/recreation/water-trails/water-trails-guide"
      },
      {
        "label": "USGS 03323000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03323000/"
      },
      {
        "label": "USGS 03323000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03323000&parameterCd=00060,00065&siteStatus=all"
      }
    ]
  },
  {
    "id": "wabash-river-vera-cruz-kehoe-park",
    "slug": "wabash-river-vera-cruz-kehoe-park",
    "name": "Wabash River",
    "reach": "Vera Cruz Paddlesports Launch to Kehoe Park",
    "aliases": [
      "Wabash River - Vera Cruz to Kehoe Park",
      "Wells County Wabash Vera Cruz to Kehoe"
    ],
    "state": "Indiana",
    "region": "Northeast Indiana",
    "summary": "Mid-length Wells County Wabash route from Vera Cruz Paddlesports Launch into Bluffton at Kehoe Park. Use the Bluffton stage gauge and stay inside the same local 1.5 to 3 ft kayaking band.",
    "statusText": "Wells County Trails still calls 1.5 to 3 ft the ideal kayaking height. The latest official USGS reading available during this run was 1.39 ft at 2026-07-16 07:45 EDT, so expect shallow dragging rather than a clean green-light.",
    "latitude": 40.69890779,
    "longitude": -85.0828222,
    "gaugeSource": {
      "id": "usgs-03323000",
      "provider": "usgs",
      "siteId": "03323000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Wabash River at Bluffton, IN",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03323000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.5,
      "idealMax": 3,
      "tooLow": 1.5,
      "tooHigh": 3,
      "thresholdSource": {
        "label": "Wells County Trails Wabash River kayaking stage guidance",
        "url": "https://www.wellscountytrails.org/kayaking"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "Spring through fall can work when the Bluffton stage is inside the local kayaking band. Heavy rain can push this slow rural-to-town river into stronger current, debris, and flood-stage hazards.",
      "difficulty": "easy",
      "difficultyNotes": "The reach remains a straightforward flatwater day, but it is longer than the White Bridge segment and finishes in town where footing, current, and take-out traffic need attention.",
      "confidenceNotes": "Confidence is good for a conservative Indiana add: the NEI Water Trails event page still calls Vera Cruz to Kehoe Park a 6-mile Wabash route, Wells County Trails confirms Vera Cruz as a public improved concrete launch and uses the same Bluffton-linked 1.5 to 3 ft kayaking band, Bluffton still lists Kehoe Park as a public riverfront park, NEI Water Trails still exposes Vera Cruz and Kehoe coordinates, and USGS Water Services returned 31.3 cfs and 1.39 ft at 2026-07-16 07:45 EDT for 03323000 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Local stage band",
        "value": "1.5 to 3 ft",
        "note": "Wells County Trails says this is the ideal river height for kayaking and warns never to enter during Action or Flood Stages.",
        "sourceUrl": "https://www.wellscountytrails.org/kayaking"
      },
      {
        "label": "Public route shape",
        "value": "6 mi",
        "note": "The Northeast Indiana Water Trails Wabash River Challenge page lists Vera Cruz to Kehoe Park as a 6-mile segment.",
        "sourceUrl": "https://neiwatertrails.com/get-involved/event-calendar/wabash-river-challenge"
      },
      {
        "label": "Endpoint coordinates",
        "value": "NEI Water Trails map",
        "note": "The Northeast Indiana Water Trails map lists Vera Cruz - Wabash River at 40.69890779, -85.0828222 and Wabash ~ Kehoe Park at 40.74237, -85.171271.",
        "sourceUrl": "https://neiwatertrails.com/map"
      },
      {
        "label": "Live gauge",
        "value": "31.3 cfs / 1.39 ft",
        "note": "USGS Water Services returned the latest official values available during this run at 2026-07-16 07:45 EDT for Wabash River at Bluffton, IN.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03323000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Take-out legitimacy",
        "value": "Kehoe Park riverfront access",
        "note": "Bluffton describes Kehoe Park as a public riverfront park with direct access to the River Greenway trail system, matching the NEI Water Trails mapped Wabash access.",
        "sourceUrl": "https://blufftonindiana.net/380/Kehoe-Park"
      }
    ],
    "sourceLinks": [
      {
        "label": "Wells County Trails kayaking",
        "url": "https://www.wellscountytrails.org/kayaking"
      },
      {
        "label": "Northeast Indiana Water Trails map",
        "url": "https://neiwatertrails.com/map"
      },
      {
        "label": "Northeast Indiana Water Trails Wabash River Challenge",
        "url": "https://neiwatertrails.com/get-involved/event-calendar/wabash-river-challenge"
      },
      {
        "label": "Bluffton Kehoe Park",
        "url": "https://blufftonindiana.net/380/Kehoe-Park"
      },
      {
        "label": "USGS 03323000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03323000/"
      },
      {
        "label": "USGS 03323000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03323000&parameterCd=00060,00065&siteStatus=all"
      }
    ]
  },
  {
    "id": "wabash-river-vera-cruz-hale-street",
    "slug": "wabash-river-vera-cruz-hale-street",
    "name": "Wabash River",
    "reach": "Vera Cruz Paddlesports Launch to Hale Street access",
    "aliases": [
      "Wabash River - Vera Cruz to Hale Street",
      "Wells County Wabash Vera Cruz to Hale"
    ],
    "state": "Indiana",
    "region": "Northeast Indiana",
    "summary": "Mid-length Wells County Wabash link from Vera Cruz Paddlesports Launch into Bluffton at the public east-end Hale Street access. Use the Bluffton stage gauge and keep the same conservative 1.5 to 3 ft posture.",
    "statusText": "Wells County Trails calls 1.5 to 3 ft the ideal kayaking height. The latest official USGS reading available during this run was 1.41 ft at 2026-07-16 02:45 EDT, so expect scraping and slower lines instead of a clean easy-day call.",
    "latitude": 40.69890779,
    "longitude": -85.0828222,
    "gaugeSource": {
      "id": "usgs-03323000",
      "provider": "usgs",
      "siteId": "03323000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Wabash River at Bluffton, IN"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.5,
      "idealMax": 3,
      "tooLow": 1.5,
      "tooHigh": 3,
      "thresholdSource": {
        "label": "Wells County Trails Wabash River kayaking stage guidance",
        "url": "https://www.wellscountytrails.org/kayaking"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "Spring through fall can work when the Bluffton stage is inside the local kayaking band. Heavy rain can tighten the current, increase debris, and make the simple Hale finish more awkward.",
      "difficulty": "easy",
      "difficultyNotes": "The current is usually mellow, but the route still needs attention for wood, private banks, and the simpler earthen Hale finish once you enter the Bluffton corridor.",
      "confidenceNotes": "Confidence is good for a conservative Indiana add: Wells County Trails supports the route by combining its public 4.2-mile Vera Cruz-to-White Bridge leg with the public 2.4-mile White Bridge-to-Hale connector under the same Bluffton gauge guidance, Northeast Indiana Water Trails exposes the Vera Cruz coordinate, and the existing Hale endpoint package already anchors the public east-end access used by the live downstream route. USGS Water Services returned the latest official values available during this run as 1.41 ft and 33.7 cfs at 2026-07-16 02:45 EDT for 03323000."
    },
    "evidenceNotes": [
      {
        "label": "Local stage band",
        "value": "1.5 to 3 ft",
        "note": "Wells County Trails says this is the ideal river height for kayaking and warns never to enter during Action or Flood Stages.",
        "sourceUrl": "https://www.wellscountytrails.org/kayaking"
      },
      {
        "label": "Public route shape",
        "value": "6.6 mi total",
        "note": "Wells County Trails lists Vera Cruz Paddlesports Launch to White Bridge Picnic Area as 4.2 miles, then White Bridge to Hale Street access as another 2.4 miles through the public Bluffton access chain.",
        "sourceUrl": "https://www.wellscountytrails.org/kayaking"
      },
      {
        "label": "Endpoint coordinates",
        "value": "40.69890779, -85.0828222 to 40.7448153, -85.1745966",
        "note": "The Vera Cruz coordinate comes from the Northeast Indiana Water Trails map. The Hale Street coordinate uses the existing product access anchor at the mapped east end of West Hale Street, matching Wells County Trails public-access wording.",
        "sourceUrl": "https://neiwatertrails.com/map"
      },
      {
        "label": "Live gauge",
        "value": "1.41 ft / 33.7 cfs",
        "note": "USGS Water Services returned the latest official values available during this run at 2026-07-16 02:45 EDT for Wabash River at Bluffton, IN.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03323000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Indiana water-trail context",
        "value": "DNR points to NEI Water Trails",
        "note": "Indiana DNR says its old canoe-guide material was removed as outdated and lists Northeast Indiana Water Trails as a current regional resource that includes the Wabash River.",
        "sourceUrl": "https://www.in.gov/dnr/state-parks/recreation/water-trails/water-trails-guide"
      }
    ],
    "sourceLinks": [
      {
        "label": "Wells County Trails kayaking",
        "url": "https://www.wellscountytrails.org/kayaking"
      },
      {
        "label": "Northeast Indiana Water Trails map",
        "url": "https://neiwatertrails.com/map"
      },
      {
        "label": "Indiana DNR Water Trails Guide",
        "url": "https://www.in.gov/dnr/state-parks/recreation/water-trails/water-trails-guide"
      },
      {
        "label": "USGS 03323000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03323000/"
      },
      {
        "label": "USGS 03323000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03323000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "OpenStreetMap West Hale Street geometry",
        "url": "https://api.openstreetmap.org/api/0.6/way/17590121/full.json"
      }
    ]
  },
  {
    "id": "wabash-river-linn-grove-hale-street",
    "slug": "wabash-river-linn-grove-hale-street",
    "name": "Wabash River",
    "reach": "Linn Grove Park to Hale Street access",
    "aliases": [
      "Wabash River - Linn Grove to Hale Street",
      "Wells County Wabash Linn Grove to Hale"
    ],
    "state": "Indiana",
    "region": "Northeast Indiana",
    "summary": "Longest current Wells County Wabash day from Linn Grove Park to the public east-end Hale Street access in Bluffton. Use the Bluffton stage gauge and keep the same strict 1.5 to 3 ft posture.",
    "statusText": "Wells County Trails calls 1.5 to 3 ft the ideal kayaking height. Below that means shallow dragging, and above 3 ft this app turns conservative because higher water adds stronger flow, debris, and obstacle hazards.",
    "latitude": 40.645752,
    "longitude": -85.031219,
    "gaugeSource": {
      "id": "usgs-03323000",
      "provider": "usgs",
      "siteId": "03323000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Wabash River at Bluffton, IN"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.5,
      "idealMax": 3,
      "tooLow": 1.5,
      "tooHigh": 3,
      "thresholdSource": {
        "label": "Wells County Trails Wabash River kayaking stage guidance",
        "url": "https://www.wellscountytrails.org/kayaking"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "Spring through fall can work when the Bluffton stage is inside the local kayaking band. Heavy rain can push this rural-to-town river into stronger current, debris, and flood-stage hazards.",
      "difficulty": "easy",
      "difficultyNotes": "The current stays relatively mellow, but nearly 12 miles of river, sparse legal exits, and the simple Hale Street finish make this a more serious day-planning route than the shorter Wells County slugs.",
      "confidenceNotes": "Confidence is good for a conservative Indiana add: Wells County Trails names Linn Grove Park, Vera Cruz Paddlesports Launch, White Bridge Picnic Area, and Hale Street as public Wabash access points, with the full Linn Grove-to-Hale route supported by the 5.3-mile Linn Grove-to-Vera Cruz leg, the 4.2-mile Vera Cruz-to-White Bridge leg, and the 2.4-mile White Bridge-to-Hale public connector. NEI Water Trails exposes the Linn Grove coordinate, the existing product endpoint package already anchors Hale to the public east-end access, and USGS Water Services returned same-day 2026-06-25 values of 2.65 ft and 300 cfs for 03323000 at 2026-06-25 10:45 EDT during implementation."
    },
    "evidenceNotes": [
      {
        "label": "Local stage band",
        "value": "1.5 to 3 ft",
        "note": "Wells County Trails says this is the ideal river height for kayaking and warns never to enter during Action or Flood Stages.",
        "sourceUrl": "https://www.wellscountytrails.org/kayaking"
      },
      {
        "label": "Public route shape",
        "value": "11.9 mi total",
        "note": "Wells County Trails lists Linn Grove Park to Vera Cruz as 5.3 miles, Vera Cruz to White Bridge as 4.2 miles, and White Bridge to Hale Street access as 2.4 miles, supporting the combined Linn Grove-to-Hale day route.",
        "sourceUrl": "https://www.wellscountytrails.org/kayaking"
      },
      {
        "label": "Endpoint coordinates",
        "value": "40.645752, -85.031219 to 40.7448153, -85.1745966",
        "note": "The Linn Grove coordinate comes from the Northeast Indiana Water Trails map. The Hale Street coordinate uses the existing product access anchor at the mapped east end of West Hale Street, matching Wells County Trails public-access wording.",
        "sourceUrl": "https://neiwatertrails.com/map"
      },
      {
        "label": "Live gauge",
        "value": "USGS 03323000",
        "note": "USGS Water Services returned same-day 2026-06-25 values of 2.65 ft and 300 cfs for Wabash River at Bluffton, IN at 2026-06-25 10:45 EDT during implementation.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03323000/"
      },
      {
        "label": "Indiana water-trail context",
        "value": "DNR points to NEI Water Trails",
        "note": "Indiana DNR says its old canoe-guide material was removed as outdated and lists Northeast Indiana Water Trails as a current regional resource that includes the Wabash River.",
        "sourceUrl": "https://www.in.gov/dnr/state-parks/recreation/water-trails/water-trails-guide"
      }
    ],
    "sourceLinks": [
      {
        "label": "Wells County Trails kayaking",
        "url": "https://www.wellscountytrails.org/kayaking"
      },
      {
        "label": "Northeast Indiana Water Trails map",
        "url": "https://neiwatertrails.com/map"
      },
      {
        "label": "Indiana DNR Water Trails Guide",
        "url": "https://www.in.gov/dnr/state-parks/recreation/water-trails/water-trails-guide"
      },
      {
        "label": "USGS 03323000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03323000/"
      },
      {
        "label": "OpenStreetMap West Hale Street geometry",
        "url": "https://api.openstreetmap.org/api/0.6/way/17590121/full.json"
      }
    ]
  }
];
