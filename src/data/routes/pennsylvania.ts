// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const pennsylvaniaRoutes: River[] = [
  {
    "id": "redbank-creek-new-bethlehem-climax",
    "slug": "redbank-creek-new-bethlehem-climax",
    "name": "Redbank Creek",
    "reach": "New Bethlehem Kayak Launch to Climax",
    "aliases": ["Redbank Creek - New Bethlehem to Climax", "Redbank Creek New Bethlehem kayak launch to Climax", "Redbank Creek Trail Mile 20 to 17"],
    "state": "Pennsylvania",
    "region": "Western Pennsylvania",
    "summary": "A six-mile Redbank Creek float from the public New Bethlehem kayak launch below the dam to the Climax access at Trail Mile 17. The Pennsylvania Angler & Boater guide names the launch and take-out, gives a 2.7–under-6 ft runnable window, and the Redbank Valley Trails Association publishes endpoint coordinates, parking, camping, and access cautions.",
    "statusText": "Use USGS 03031882 at Brookville as the live gauge. Launch only when the gauge is at least 2.7 ft and below 6 ft, with a stable trend; confirm current access, shuttle, debris, and downstream hazards before putting in.",
    "latitude": 41.002551,
    "longitude": -79.337332,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "fast_rise", "strainers", "remote", "cold_water"],
      "safetyNotes": [
        "The Pennsylvania Angler & Boater guide recommends at least 2.7 ft and definitely less than 6 ft for an enjoyable Redbank float. Treat this as a conservative station-tied operating window, not a guarantee; stand down for rapidly rising water, debris, or poor visibility.",
        "Use the named New Bethlehem kayak launch below the dam and the Climax access at Trail Mile 17. Do not launch from private property, block driveways, or improvise roadside access; the Climax parking is very limited.",
        "The reach includes bridges, strainers, and a narrow valley. Wear a PFD, carry a shuttle plan, and scout conditions. Cell service is limited in parts of the corridor.",
        "Camping is only permitted in designated areas; Redbank Valley Trails Association identifies nearby designated camping, but this route is a day float and requires a separate logistics plan for overnight use.",
        "Follow current Pennsylvania Fish and Boat Commission registration/launch-permit rules and local closures."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {"id": "usgs-03031882", "provider": "usgs", "siteId": "03031882", "metric": "gage_height_ft", "unit": "ft", "kind": "direct", "siteName": "Redbank Creek at Brookville, PA", "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03031882/"},
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2.7,
      "idealMax": 6,
      "tooLow": 2.7,
      "tooHigh": 6,
      "thresholdSource": {"label": "Pennsylvania Angler & Boater Redbank Creek float window", "url": "https://www.pa.gov/content/dam/copapwp-pagov/en/fishandboat/documents/about-us/angler-and-boater/legacy-issues/2020s/documents/mayjune2023.pdf", "provider": "local"},
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [3, 4, 5, 6, 7, 8, 9, 10, 11],
      "seasonNotes": "The guide identifies the best float levels generally April–June and September–November; check the live gauge and trend immediately before launch.",
      "difficulty": "moderate",
      "difficultyNotes": "A moving-water float with low-water, wood, bridge, and cold-water considerations; suitable only for paddlers who can self-rescue and manage a shuttle.",
      "confidenceNotes": "High confidence for route identity, public endpoint names, coordinates, threshold, and logistics: the official Pennsylvania Angler & Boater article names New Bethlehem and Climax access, while the Redbank Valley Trails Association publishes matching coordinates, parking, camping, and permit/safety guidance. The route is distinct from any Brookville or lower Redbank opportunity because it uses the named New Bethlehem-to-Climax corridor."
    },
    "evidenceNotes": [
      {"label": "Official route and threshold", "value": "New Bethlehem to Climax; 2.7–under 6 ft", "note": "Pennsylvania Angler & Boater names the New Bethlehem kayak launch, Climax take-out, and the 2.7 ft minimum / under 6 ft window.", "sourceUrl": "https://www.pa.gov/content/dam/copapwp-pagov/en/fishandboat/documents/about-us/angler-and-boater/legacy-issues/2020s/documents/mayjune2023.pdf"},
      {"label": "Endpoint coordinates", "value": "New Bethlehem 41.0024,-79.3322; Climax 40.9859,-79.3751", "note": "Redbank Valley Trails Association publishes the municipal New Bethlehem launch/parking coordinate and the Climax access coordinate near 4365 Climax Road.", "sourceUrl": "https://www.redbankvalleytrails.org/parking/"},
      {"label": "Live direct gauge", "value": "USGS 03031882 at Brookville", "note": "USGS provides continuous discharge and stage telemetry for the Brookville station; the trail guide explicitly directs paddlers to use this gauge or St. Charles.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03031882"},
      {"label": "Camping and logistics", "value": "Designated camping near the Redbank Valley Trail; shuttle required", "note": "The Redbank Valley Trails Association map identifies designated camping, trail access, parking, and limited-service/cell-coverage cautions.", "sourceUrl": "https://www.redbankvalleytrails.org/wp-content/uploads/2025/09/RVTA-Map-2025Ed-Final-Web.pdf"}
    ],
    "sourceLinks": [
      {"label": "Pennsylvania Angler & Boater Redbank Creek guide", "url": "https://www.pa.gov/content/dam/copapwp-pagov/en/fishandboat/documents/about-us/angler-and-boater/legacy-issues/2020s/documents/mayjune2023.pdf", "provider": "local"},
      {"label": "Redbank Valley Trails map and guide", "url": "https://www.redbankvalleytrails.org/wp-content/uploads/2025/09/RVTA-Map-2025Ed-Final-Web.pdf", "provider": "local"},
      {"label": "Redbank Valley Trails parking/access", "url": "https://www.redbankvalleytrails.org/parking/", "provider": "local"},
      {"label": "USGS 03031882 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03031882/", "provider": "usgs"},
      {"label": "PA launch permit rules", "url": "https://www.pa.gov/services/fishandboat/buy-launch-permit", "provider": "local"}
    ]
  },
  {
    "id": "redbank-creek-climax-st-charles",
    "slug": "redbank-creek-climax-st-charles",
    "name": "Redbank Creek",
    "reach": "Climax to St. Charles Road",
    "aliases": ["Redbank Creek - Climax to St. Charles", "Redbank Creek Climax Tunnel to St. Charles Road", "Redbank Creek Trail Mile 17 to 12.5"],
    "state": "Pennsylvania",
    "region": "Western Pennsylvania",
    "summary": "A distinct 4.5-mile extension below the existing New Bethlehem-to-Climax float, from the named Climax access at Trail Mile 17 to the Saint Charles Road crossing at Trail Mile 12.5. The official Pennsylvania Angler & Boater guide describes this continuation and ties it to the Saint Charles gauge; the RVTA map documents the public trail/road corridor and low-water caution.",
    "statusText": "Use USGS 03032500 at St. Charles. The PA guide recommends at least 2.7 ft and definitely less than 6 ft for Redbank Creek; RVTA's current map uses a conservative 2.8 ft minimum. Launch at the named Climax access only when lawful and take out at the Saint Charles Road crossing only after confirming current parking, carry, road, debris, and downstream conditions.",
    "latitude": 40.985227,
    "longitude": -79.375191,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "fast_rise", "strainers", "remote", "cold_water", "private_banks"],
      "safetyNotes": [
        "Use a conservative minimum of 2.8 ft at USGS 03032500 St. Charles, with the official guide's upper caution at less than 6 ft. These are operating references, not guarantees; stand down for rising water, debris, or poor visibility.",
        "The guide names Climax as the launch context and Saint Charles Road at Trail Mile 12.5 as the continuation take-out. Verify current lawful parking and carry access at the road crossing; do not block driveways or use private banks.",
        "Expect a remote moving-water reach with bridges, strainers, cold water, and limited cell service. Wear a PFD, carry a shuttle plan, and scout the take-out before launching.",
        "Camping is only in designated areas identified by the Redbank Valley Trails Association; this route is a day float and requires a separate overnight logistics plan.",
        "Follow current Pennsylvania Fish and Boat Commission registration/launch-permit rules and all posted local closures."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {"id": "usgs-03032500", "provider": "usgs", "siteId": "03032500", "metric": "gage_height_ft", "unit": "ft", "kind": "direct", "siteName": "Redbank Creek at St. Charles, PA", "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03032500/"},
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2.8,
      "idealMax": 6,
      "tooLow": 2.8,
      "tooHigh": 6,
      "thresholdSource": {"label": "PA Angler & Boater and RVTA Redbank Creek float window", "url": "https://www.pa.gov/content/dam/copapwp-pagov/en/fishandboat/documents/about-us/angler-and-boater/legacy-issues/2020s/documents/mayjune2023.pdf", "provider": "local"},
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [3, 4, 5, 6, 7, 8, 9, 10, 11],
      "seasonNotes": "Best float levels are generally April–June and September–November; check the live gauge and trend immediately before launch.",
      "difficulty": "moderate",
      "difficultyNotes": "Moving-water extension with low-water, wood, bridge, cold-water, remote-access, and shuttle considerations.",
      "confidenceNotes": "High confidence for the distinct corridor, gauge, and threshold. The official guide explicitly describes the additional 4.5 miles from Climax to Saint Charles Road; USGS provides direct Saint Charles telemetry; RVTA publishes the trail corridor, named Climax access, low-water guidance, and local logistics. Take-out parking remains a same-day verification item rather than an invented guarantee."
    },
    "putIn": {"id": "redbank-climax-access", "name": "Climax access at Trail Mile 17", "latitude": 40.985227, "longitude": -79.375191},
    "takeOut": {"id": "redbank-st-charles-road", "name": "Saint Charles Road crossing at Trail Mile 12.5", "latitude": 40.99465, "longitude": -79.39304},
    "logistics": {
      "distanceLabel": "Approximately 4.5 river miles",
      "estimatedPaddleTime": "About 2–4 on-water hours, plus shuttle and access verification",
      "shuttle": "Use two vehicles or arrange a shuttle. Scout the Saint Charles Road crossing and parking before launching; do not leave a vehicle on private property or block the road.",
      "permits": "Follow current Pennsylvania Fish and Boat Commission registration and launch-permit rules and all posted local access restrictions.",
      "camping": "Designated camping is available near the Redbank Valley Trail; verify current rules and availability separately.",
      "campingClassification": "nearby_basecamp",
      "summary": "Treat this as a distinct downstream extension, not an automatic continuation: confirm both endpoints and shuttle logistics on the day of travel.",
      "accessCaveats": ["The Saint Charles Road take-out is a road crossing described by the official guide, not a maintained boat ramp; verify lawful parking and carry access before launch.", "Do not use private banks or unlisted roadside pull-offs as substitute access."],
      "watchFor": ["rapidly rising water", "strainers and bridge approaches", "cold water", "limited cell service", "private-bank and roadside access constraints"]
    },
    "evidenceNotes": [
      {"label": "Official continuation and threshold", "value": "Climax to Saint Charles Road; 2.7–under 6 ft, with 2.8 ft conservative minimum", "note": "PA Angler & Boater names the additional 4.5 miles and Saint Charles Road take-out; RVTA map directs paddlers to at least 2.8 ft at St. Charles or Brookville.", "sourceUrl": "https://www.pa.gov/content/dam/copapwp-pagov/en/fishandboat/documents/about-us/angler-and-boater/legacy-issues/2020s/documents/mayjune2023.pdf"},
      {"label": "Endpoint coordinates", "value": "Climax 40.985227,-79.375191; Saint Charles Road bridge 40.99465,-79.39304", "note": "Climax coordinates are published by RVTA; the Saint Charles Road crossing is the mapped public bridge on T-466/SR 1005 and is cross-checked against the USGS station vicinity.", "sourceUrl": "https://www.redbankvalleytrails.org/parking/"},
      {"label": "Live direct gauge", "value": "USGS 03032500 at St. Charles", "note": "USGS provides continuous discharge and stage telemetry; the official guide explicitly directs paddlers to monitor the Saint Charles gauge.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03032500"},
      {"label": "Camping and logistics", "value": "Designated Redbank Valley Trail camping; shuttle required", "note": "RVTA publishes trail, camping, limited cell service, and access cautions; endpoint parking must be verified on arrival.", "sourceUrl": "https://www.redbankvalleytrails.org/wp-content/uploads/2025/09/RVTA-Map-2025Ed-Final-Web.pdf"},
      {"label": "Image rights decision", "value": "No route-specific image added", "note": "Use existing rights-clean product imagery/default gallery treatment; do not copy source or map images."
      }
    ],
    "sourceLinks": [
      {"label": "Pennsylvania Angler & Boater Redbank Creek guide", "url": "https://www.pa.gov/content/dam/copapwp-pagov/en/fishandboat/documents/about-us/angler-and-boater/legacy-issues/2020s/documents/mayjune2023.pdf", "provider": "local"},
      {"label": "Redbank Valley Trails map and guide", "url": "https://www.redbankvalleytrails.org/wp-content/uploads/2025/09/RVTA-Map-2025Ed-Final-Web.pdf", "provider": "local"},
      {"label": "Redbank Valley Trails parking/access", "url": "https://www.redbankvalleytrails.org/parking/", "provider": "local"},
      {"label": "USGS 03032500 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03032500/", "provider": "usgs"},
      {"label": "PA launch permit rules", "url": "https://www.pa.gov/services/fishandboat/buy-launch-permit", "provider": "local"}
    ]
  },
  {
    "id": "loyalhanna-creek-tailwater-saltsburg-rivers-edge",
    "slug": "loyalhanna-creek-tailwater-saltsburg-rivers-edge",
    "name": "Loyalhanna Creek",
    "reach": "Loyalhanna Dam Tailwater to Saltsburg Rivers Edge",
    "aliases": ["Loyalhanna Creek - Dam to Saltsburg", "Loyalhanna Dam tailwater run", "Loyalhanna Creek Water Trail Tailwater to Saltsburg"],
    "state": "Pennsylvania",
    "region": "Laurel Highlands",
    "summary": "A distinct four-mile Loyalhanna Creek dam-release run from the PFBC/USACE Tailwater Access to Saltsburg Rivers Edge Park. CanoeDraft ties the reach to USGS 03047000 and documents a 1,040–1,770 cfs release-dependent band; PFBC names both access contexts and warns that the tailwater gate may require advance Corps arrangements.",
    "statusText": "Use USGS 03047000 at Loyalhanna Dam. CanoeDraft describes 1,040–1,770 cfs as the documented level band for the four-mile dam-to-Saltsburg run. This is release-dependent advanced whitewater; confirm the Corps gate/release status and take out before launching, and never run the dam or enter the tailrace without lawful access.",
    "latitude": 40.484444,
    "longitude": -79.453056,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": ["dam", "whitewater", "cold_water", "fast_rise", "access_uncertain"],
      "safetyNotes": [
        "This reach depends on releases from Loyalhanna Dam. Confirm the current release schedule, Corps gate status, and water level with the USACE resource manager before driving to the access.",
        "PFBC identifies Tailwater Access as a path access with advance arrangements needed to drive closer when staff are available. Do not trespass, improvise a dam/tailrace launch, or enter restricted areas.",
        "CanoeDraft's 1,040–1,770 cfs band is a release-specific paddling reference, not a guarantee. Stand down for rapidly rising water, cold water, debris, or conditions outside the documented band.",
        "Use the named Saltsburg Rivers Edge take-out and obey current Pennsylvania PFD, permit, navigation, and local access rules."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {"id": "usgs-03047000", "provider": "usgs", "siteId": "03047000", "metric": "discharge_cfs", "unit": "cfs", "kind": "direct", "siteName": "Loyalhanna Creek at Loyalhanna Dam, PA", "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03047000/"},
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1040,
      "idealMax": 1770,
      "tooLow": 1040,
      "tooHigh": 1770,
      "thresholdSource": {"label": "CanoeDraft Loyalhanna Dam to Saltsburg release band", "url": "https://canoedraft.shaw-weil.com/river/Loyalhanna%20Creek.php", "provider": "manual"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "low",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "The route is controlled primarily by dam releases rather than rainfall. Verify scheduled release windows, daylight, cold-water risk, and current access conditions.",
      "difficulty": "hard",
      "difficultyNotes": "CanoeDraft rates the dam-to-Saltsburg reach as an advanced release-dependent run. Use a whitewater-capable craft, helmet, PFD, rescue plan, and experienced group.",
      "confidenceNotes": "High confidence for a distinct route package: CanoeDraft names the four-mile dam-to-Saltsburg reach and a station-specific 1,040–1,770 cfs band tied to USGS 03047000; PFBC/USACE materials name Tailwater Access and Saltsburg Rivers Edge coordinates and explain gate/parking constraints. This is separate from the upstream Ligonier-to-Kingston scored route and the lower Latrobe corridor."
    },
    "evidenceNotes": [
      {"label": "Route and threshold", "value": "Loyalhanna Dam to Saltsburg, 4 mi; 1,040–1,770 cfs", "note": "CanoeDraft documents this distinct dam-release reach, its release-dependent behavior, and the station-specific level band.", "sourceUrl": "https://canoedraft.shaw-weil.com/river/Loyalhanna%20Creek.php"},
      {"label": "Live direct gauge", "value": "USGS 03047000 at Loyalhanna Dam", "note": "USGS provides continuous discharge and stage telemetry for the dam tailwater station.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03047000"},
      {"label": "Tailwater access", "value": "USACE/PFBC Tailwater Access", "note": "PFBC's water-trail guide names the path access and says advance arrangements may be needed to drive closer when staff are available.", "sourceUrl": "https://www.loyalhannawatershed.org/images/Documents/LoyalWaterTrailGuide.pdf"},
      {"label": "Public take-out", "value": "Saltsburg Rivers Edge Park", "note": "PFBC names the Saltsburg Rivers Edge Park paved ramp and publishes its approximate coordinates and directions.", "sourceUrl": "https://www.loyalhannawatershed.org/images/Documents/LoyalWaterTrailGuide.pdf"}
    ],
    "sourceLinks": [
      {"label": "CanoeDraft Loyalhanna Creek", "url": "https://canoedraft.shaw-weil.com/river/Loyalhanna%20Creek.php", "provider": "manual"},
      {"label": "USGS 03047000 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03047000/", "provider": "usgs"},
      {"label": "Loyalhanna Water Trail access guide", "url": "https://www.loyalhannawatershed.org/images/Documents/LoyalWaterTrailGuide.pdf", "provider": "local"},
      {"label": "PFBC boating regulations", "url": "https://pfbc.pa.gov/spbtregsx.htm", "provider": "local"}
    ]
  },
  {
    "id": "loyalhanna-creek-ligonier-nature-trail-kingston",
    "slug": "loyalhanna-creek-ligonier-nature-trail-kingston",
    "name": "Loyalhanna Creek",
    "reach": "Ligonier Nature Trail to Kingston",
    "aliases": ["Loyalhanna Creek Water Trail - Ligonier to Kingston", "Loyalhanna Creek - Ligonier Nature Trail to Kingston access"],
    "state": "Pennsylvania",
    "region": "Laurel Highlands",
    "summary": "A roughly seven-mile upper Loyalhanna Creek water-trail segment from the named Ligonier Nature Trail access to the Kingston access above the dam spillway. The Pennsylvania Fish and Boat Commission guide names both access points, publishes their coordinates, and recommends a minimum 250 cfs at the direct Kingston USGS gauge.",
    "statusText": "Use USGS 03045000 at Kingston and the PFBC water-trail guide's 250 cfs minimum as a conservative launch screen. The guide describes whitewater downstream to Kingston and a dam spillway at the Kingston take-out; take out upstream of the spillway and do not run or improvise around the dam.",
    "latitude": 40.291667,
    "longitude": -79.338611,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": ["low_water", "dam", "whitewater", "strainers", "cold_water"],
      "safetyNotes": [
        "PFBC identifies the Ligonier-to-Kingston section as whitewater downstream to Kingston. Use a suitable whitewater-capable craft, PFD, helmet, and competent group; scout before committing.",
        "The PFBC guide recommends a minimum 250 cfs at USGS 03045000. Treat that as a conservative access/runnable screen, not a guarantee; stand down for rapidly rising water, wood, poor visibility, or unfamiliar flows.",
        "Kingston access is about 300 feet upstream of the dam spillway. Take out there and portage/avoid the dam; never run the spillway or use an unverified downstream access.",
        "Confirm current PFBC, DCNR, USACE, parking, permit, and closure rules before launching."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {"id": "usgs-03045000", "provider": "usgs", "siteId": "03045000", "metric": "discharge_cfs", "unit": "cfs", "kind": "direct", "siteName": "Loyalhanna Creek at Kingston, PA", "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03045000/"},
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 250,
      "thresholdSource": {"label": "PFBC Loyalhanna Creek Water Trail minimum flow", "url": "https://www.pfbc.pa.gov/watertrails/loyalhanna/loyalhanna_guide_map.pdf", "provider": "local"},
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [3, 4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "The route is most appropriate during the open-water season and adequate-flow windows. Check gauge trend, rainfall, temperature, and access conditions immediately before launch.",
      "difficulty": "hard",
      "difficultyNotes": "The official guide identifies whitewater downstream to Kingston and the dam spillway hazard. Treat this as an advanced creek run, not a casual recreational float.",
      "confidenceNotes": "High confidence for a distinct route add: PFBC names the Loyalhanna Creek Water Trail, publishes named access points and coordinates for Ligonier Nature Trail and Kingston, and explicitly recommends a minimum 250 cfs at the direct Kingston gauge. The route ends above the Kingston dam spillway and is not duplicated by any existing Loyalhanna route in the inventory."
    },
    "evidenceNotes": [
      {"label": "Official route and access", "value": "Ligonier Nature Trail access to Kingston access, about 7 river miles", "note": "PFBC's official Loyalhanna guide lists the access sites, approximate river miles, coordinates, directions, and the Kingston dam-spillway warning.", "sourceUrl": "https://www.pfbc.pa.gov/watertrails/loyalhanna/loyalhanna_guide_map.pdf"},
      {"label": "Direct gauge and threshold", "value": "USGS 03045000; minimum 250 cfs", "note": "PFBC explicitly recommends a minimum of 250 cfs at the Kingston USGS gauge for the water trail.", "sourceUrl": "https://www.pfbc.pa.gov/watertrails/loyalhanna/loyalhanna_guide_map.pdf"},
      {"label": "Live USGS station", "value": "Loyalhanna Creek at Kingston, PA", "note": "USGS provides the live monitoring location and discharge telemetry for station 03045000.", "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03045000/"},
      {"label": "Dam hazard", "value": "Kingston spillway below take-out", "note": "PFBC places the Kingston take-out about 300 feet upstream from the dam spillway and identifies the downstream portage context.", "sourceUrl": "https://www.pfbc.pa.gov/watertrails/loyalhanna/loyalhanna_guide_map.pdf"}
    ],
    "sourceLinks": [
      {"label": "PFBC Loyalhanna Water Trail guide", "url": "https://www.pfbc.pa.gov/watertrails/loyalhanna/loyalhanna_guide_map.pdf", "provider": "local"},
      {"label": "USGS 03045000 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03045000/", "provider": "usgs"},
      {"label": "American Whitewater Loyalhanna section", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1631/main", "provider": "american_whitewater"}
    ]
  },
  {
    "id": "youghiogheny-river-lower-yough-ohiopyle-bruner-run",
    "slug": "youghiogheny-river-lower-yough-ohiopyle-bruner-run",
    "name": "Youghiogheny River",
    "reach": "Lower Yough: Ohiopyle to Bruner Run",
    "aliases": [
      "Lower Yough",
      "Lower Youghiogheny River - Ohiopyle to Bruner Run",
      "Youghiogheny River - Ohiopyle Falls Area to Bruner Run"
    ],
    "state": "Pennsylvania",
    "region": "Laurel Highlands",
    "summary": "Classic Lower Yough whitewater through Ohiopyle State Park, from the state-park launch below Ohiopyle Falls to Bruner Run. DCNR names the exact seven-mile route, American Whitewater ties it to the Ohiopyle USGS stage gauge, and the route is only for experienced whitewater boaters or guided groups.",
    "statusText": "Use the Youghiogheny at Ohiopyle stage gauge. American Whitewater lists 1.1 to 7.0 ft as the runnable range, with the broadest intermediate window from about 1.7 to 4.0 ft. Above 4.0 ft the route gets pushier, and around 7.0 ft and above it is too high for a general recommendation.",
    "latitude": 39.866528,
    "longitude": -79.493395,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "dam_release",
        "cold_water"
      ],
      "safetyNotes": [
        "DCNR describes the Lower Yough as a seven-mile Class III-IV run with undercut rocks, ledges, and swift currents that should be attempted only by experienced whitewater boaters or guided groups.",
        "Use a whitewater-designed craft, wear the required PFD and helmet, and check the Ohiopyle gauge plus current park alerts before launching because water level and dam-regulated flow changes can materially change the difficulty.",
        "American Whitewater documents cold water, the undercut and portage at Dimple Rock, pinning hazards at River's End, and the river-left Bruner Run take-out; confirm current launch-ticket, gate, shuttle, and take-out operations with the park before committing to the gorge."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03081500",
      "provider": "usgs",
      "siteId": "03081500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Youghiogheny River at Ohiopyle, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03081500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.7,
      "idealMax": 4,
      "tooLow": 1.1,
      "tooHigh": 7,
      "thresholdSource": {
        "label": "American Whitewater Lower Yough Ohiopyle gauge bands",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=1687",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "DCNR manages launch tickets between the second weekend in April and Columbus Day, and dam releases make this a dependable warm-season whitewater run. Cold water, high water, storms, and release changes can still make the gorge more consequential.",
      "difficulty": "hard",
      "difficultyNotes": "DCNR describes the Lower Yough as a Class III-IV route for experienced whitewater boaters, and American Whitewater lists the reach as Class III with higher-stage Class III-IV consequences. This is not a casual recreational float.",
      "confidenceNotes": "Confidence is high for a first Pennsylvania add: DCNR identifies the exact Lower Yough route from below Ohiopyle Falls to Bruner Run, AW identifies the same Ohiopyle-to-Bruner-Run reach and direct USGS 03081500 stage bands, and USGS Water Services returned same-day official stage and discharge values during the 2026-06-11 run. Endpoint coordinates are AW feature coordinates cross-checked against the DCNR route/access narrative; keep the coordinate caveat visible because DCNR names the sites but does not publish a coordinate table on the whitewater page."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Seven miles to Bruner Run",
        "note": "DCNR says the Lower Yough begins after Ohiopyle Falls and flows seven miles downstream to the Bruner Run Take-out, with numerous Class III-IV rapids.",
        "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/ohiopyle-state-park/whitewater-boating"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 03081500 at Ohiopyle",
        "note": "USGS operates Youghiogheny River at Ohiopyle, PA, 900 ft downstream from the Route 381 bridge and upstream from Meadow Run; Water Services returned same-day 2026-06-11 stage and discharge values during implementation.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03081500/"
      },
      {
        "label": "AW stage bands",
        "value": "1.1 / 1.7-4.0 / 7.0 ft",
        "note": "American Whitewater ties the Ohiopyle-to-Bruner-Run reach to USGS 03081500, lists 1.10-1.70 ft as barely to medium runnable, 1.70-4.00 ft as medium to a bit pushy runnable, 4.00-7.00 ft as pushy to high runnable, and 7.00 ft plus as high to extremely high Class IV-V.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=1687"
      },
      {
        "label": "Access and permit context",
        "value": "Launch ticket plus PA permit/registration context",
        "note": "DCNR says Lower Yough boaters must obtain a launch ticket during the managed season, and PFBC says unpowered boats need registration, a PFBC launch permit, or a DCNR State Parks launch permit to use PFBC or Pennsylvania State Parks and Forests access areas.",
        "sourceUrl": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg"
      },
      {
        "label": "Endpoint support",
        "value": "AW feature coordinates",
        "note": "American Whitewater places the Ohiopyle State Park put-in below the falls at 39.866528, -79.493395 and the Bruner Run take-out at 39.926672, -79.487236; DCNR independently names the same route endpoints.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1687/main"
      },
      {
        "label": "Core hazards",
        "value": "Class III-IV gorge whitewater",
        "note": "DCNR warns of undercut rocks, ledges, swift currents, injury and death potential, and required PFDs and helmets on the Lower Yough; AW highlights Dimple Rock entrapment risk and pushier hydraulics at higher stages.",
        "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/ohiopyle-state-park/whitewater-boating"
      }
    ],
    "sourceLinks": [
      {
        "label": "PA DCNR Ohiopyle whitewater boating",
        "url": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/ohiopyle-state-park/whitewater-boating",
        "provider": "local"
      },
      {
        "label": "PA DCNR Ohiopyle current alerts",
        "url": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/ohiopyle-state-park/alerts",
        "provider": "local"
      },
      {
        "label": "American Whitewater Lower Yough reach",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1687/main",
        "provider": "american_whitewater"
      },
      {
        "label": "American Whitewater Lower Yough gauge information",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=1687",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 03081500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03081500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC registration vs launch permit",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "lehigh-river-white-haven-rockport",
    "slug": "lehigh-river-white-haven-rockport",
    "name": "Lehigh River",
    "reach": "White Haven to Rockport",
    "aliases": [
      "Lehigh Gorge Upper",
      "Lehigh River - White Haven to Rockport",
      "Lehigh River Upper Section"
    ],
    "state": "Pennsylvania",
    "region": "Pocono Mountains",
    "summary": "Lehigh Gorge whitewater from the DCNR White Haven access to Rockport. DCNR names this 8.7-mile Class II-III trip, publishes official flow bands, and points paddlers to the USGS/USACE White Haven flow story below Francis E. Walter Dam.",
    "statusText": "Use the Lehigh River below Francis E. Walter Reservoir gauge near White Haven. DCNR says below 250 cfs is very low, 250 to 1,000 cfs is better for boating, difficulty rises above 1,000 cfs, and above 5,000 cfs is expert-only water.",
    "latitude": 41.05527,
    "longitude": -75.771581,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-01447800",
      "provider": "usgs",
      "siteId": "01447800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Lehigh River below Francis E. Walter Reservoir near White Haven, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01447800/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "dam_release",
        "cold_water"
      ],
      "safetyNotes": [
        "DCNR classifies the Lehigh Gorge as Class II-III whitewater and says inexperienced boaters should not attempt it without qualified guides.",
        "Check the White Haven outflow gauge and current park alerts before launching; Francis E. Walter Dam releases and tributary inflow control conditions and can change access traffic.",
        "Use only the designated White Haven and Rockport access areas, whitewater-designed craft, and the required whitewater PFD; DCNR also recommends helmets for canoe and kayak paddlers and cold-water gear in spring and fall."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 250,
      "idealMax": 1000,
      "tooLow": 250,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "PA DCNR Lehigh Gorge State Park flow rates",
        "url": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating",
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
      "seasonNotes": "USACE Francis E. Walter Dam releases for fishing and recreational whitewater occur spring through fall, and DCNR says release days can change parking and traffic patterns at White Haven, Rockport, and Glen Onoko. Tributary rain, cold spring and fall water, and release timing still require same-day judgment.",
      "difficulty": "hard",
      "difficultyNotes": "DCNR describes this Lehigh Gorge section as Class II-III whitewater through a steep-walled gorge. Inexperienced boaters should use qualified guides, and all private groups need whitewater craft, PFDs, helmets for canoe/kayak paddlers, and conservative release-day planning.",
      "confidenceNotes": "Confidence is high for a second Pennsylvania add: DCNR identifies White Haven to Rockport as an 8.7-mile Lehigh Gorge route, publishes official cfs bands for the state-park gauges, and states that flow rates are measured at White Haven, Rockport, and Glen Onoko. USGS Water Services returned same-day 2026-06-12 discharge and stage for 01447800 below Francis E. Walter Reservoir near White Haven, and USACE Lehigh Basin data independently showed same-day WhiteHaven outflow. Endpoint coordinates use DCNR White Haven South Access GPS and a Rockport access coordinate cross-check because the DCNR Rockport page appears to publish the correct longitude with an impossible latitude typo."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "White Haven to Rockport, 8.7 miles",
        "note": "DCNR lists White Haven to Rockport as an 8.7-mile private-trip option in Lehigh Gorge State Park, where boating is limited to designated access areas.",
        "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01447800 at White Haven outflow",
        "note": "USGS operates Lehigh River below Francis E. Walter Reservoir near White Haven, four miles northeast of White Haven and 0.7 miles below the dam; Water Services returned same-day 2026-06-12 discharge and gage-height values during implementation.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01447800/"
      },
      {
        "label": "DCNR flow bands",
        "value": "250 / 250-1,000 / 5,000 cfs",
        "note": "DCNR says flows below 250 cfs are very low and many parts are not deep enough, 250 to 1,000 cfs becomes better for boating, difficulty rises above 1,000 cfs, and above 5,000 cfs is expert-only water.",
        "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating"
      },
      {
        "label": "USACE basin corroboration",
        "value": "WhiteHaven outflow and Lehighton downstream gages",
        "note": "The U.S. Army Corps of Engineers Lehigh Basin page exposed same-day 2026-06-12 WhiteHaven outflow, Lehighton downstream flow, and update time during this run.",
        "sourceUrl": "https://www.nap-wc.usace.army.mil/nap/lehipub.html"
      },
      {
        "label": "Access and permit context",
        "value": "Designated state-park accesses",
        "note": "DCNR says boaters must put on and take off only at designated Lehigh River access areas, and PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need registration, a PFBC launch permit, or a DCNR State Parks launch permit.",
        "sourceUrl": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg"
      },
      {
        "label": "Core hazards",
        "value": "Class II-III gorge whitewater",
        "note": "DCNR highlights Class II-III whitewater, deep steep-walled gorge terrain, rock outcroppings, waterfalls, changing release traffic, whitewater craft rules, PFD requirements, helmets for canoes and kayaks, and cold-water gear recommendations for spring and fall.",
        "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating"
      }
    ],
    "sourceLinks": [
      {
        "label": "PA DCNR Lehigh Gorge whitewater boating",
        "url": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating",
        "provider": "local"
      },
      {
        "label": "PA DCNR Lehigh Gorge State Park access directions",
        "url": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park",
        "provider": "local"
      },
      {
        "label": "USGS 01447800 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01447800/",
        "provider": "usgs"
      },
      {
        "label": "USACE Lehigh Basin data summary",
        "url": "https://www.nap-wc.usace.army.mil/nap/lehipub.html",
        "provider": "local"
      },
      {
        "label": "PFBC registration vs launch permit",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "lehigh-river-rockport-glen-onoko",
    "slug": "lehigh-river-rockport-glen-onoko",
    "name": "Lehigh River",
    "reach": "Rockport to Glen Onoko",
    "aliases": [
      "Lehigh Gorge Lower",
      "Lehigh River - Rockport to Glen Onoko",
      "Lehigh River Lower Section"
    ],
    "state": "Pennsylvania",
    "region": "Pocono Mountains",
    "summary": "Lower Lehigh Gorge whitewater from the DCNR Rockport access to Glen Onoko. DCNR names this 12.2-mile Class II-III trip, publishes official flow bands, and points paddlers to the same USGS/USACE White Haven flow story below Francis E. Walter Dam.",
    "statusText": "Use the Lehigh River below Francis E. Walter Reservoir gauge near White Haven. DCNR says below 250 cfs is very low, 250 to 1,000 cfs is better for boating, difficulty rises above 1,000 cfs, and above 5,000 cfs is expert-only water.",
    "latitude": 40.966616,
    "longitude": -75.755074,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-01447800",
      "provider": "usgs",
      "siteId": "01447800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Lehigh River below Francis E. Walter Reservoir near White Haven, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01447800/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "dam_release",
        "cold_water"
      ],
      "safetyNotes": [
        "DCNR classifies the Lehigh Gorge as Class II-III whitewater and says inexperienced boaters should not attempt it without qualified guides.",
        "Check the White Haven outflow gauge and current park alerts before launching; Francis E. Walter Dam releases and tributary inflow control conditions and can change access traffic.",
        "Use only the designated Rockport and Glen Onoko access areas, whitewater-designed craft, and the required whitewater PFD; DCNR also recommends helmets for canoe and kayak paddlers and cold-water gear in spring and fall."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 250,
      "idealMax": 1000,
      "tooLow": 250,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "PA DCNR Lehigh Gorge State Park flow rates",
        "url": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating",
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
      "seasonNotes": "USACE Francis E. Walter Dam releases for fishing and recreational whitewater occur spring through fall, and DCNR says release days can change parking and traffic patterns at White Haven, Rockport, and Glen Onoko. Tributary rain, cold spring and fall water, and release timing still require same-day judgment.",
      "difficulty": "hard",
      "difficultyNotes": "DCNR describes this Lehigh Gorge section as Class II-III whitewater through a steep-walled gorge. Inexperienced boaters should use qualified guides, and all private groups need whitewater craft, PFDs, helmets for canoe/kayak paddlers, and conservative release-day planning.",
      "confidenceNotes": "Confidence is high for this Pennsylvania add: DCNR identifies Rockport to Glen Onoko as a 12.2-mile Lehigh Gorge route, publishes official cfs bands for the state-park gauges, and states that flow rates are measured at White Haven, Rockport, and Glen Onoko. USGS Water Services returned same-day July 16, 2026 discharge and stage of 294 cfs and 3.55 ft at 2026-07-16 12:30 EDT for site 01447800 below Francis E. Walter Reservoir near White Haven, and the Glen Onoko coordinate is cross-checked to 40.8835, -75.75914 because the current DCNR page appears to publish the correct longitude with a latitude typo."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Rockport to Glen Onoko, 12.2 miles",
        "note": "DCNR lists Rockport to Glen Onoko as a 12.2-mile private-trip option in Lehigh Gorge State Park, where boating is limited to designated access areas.",
        "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating"
      },
      {
        "label": "Access GPS",
        "value": "Rockport 40.9667, -75.7551 and Glen Onoko 40.8835, -75.75914",
        "note": "The current DCNR park page publishes Rockport GPS directly, and Glen Onoko is cross-checked to the long-used 40.8835, -75.75914 public park-access coordinate because the current DCNR page appears to carry a latitude typo.",
        "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01447800 at White Haven outflow",
        "note": "USGS Water Services returned same-day July 16, 2026 values of 294 cfs and 3.55 ft at 2026-07-16 12:30 EDT for Lehigh River below Francis E. Walter Reservoir near White Haven, PA.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01447800&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "DCNR flow bands",
        "value": "250 / 250-1,000 / 5,000 cfs",
        "note": "DCNR says flows below 250 cfs are very low and many parts are not deep enough for boating, 250 to 1,000 cfs becomes better for boating, difficulty rises above 1,000 cfs, and above 5,000 cfs is expert-only water.",
        "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating"
      },
      {
        "label": "Core hazards",
        "value": "Class II-III gorge whitewater",
        "note": "DCNR highlights Class II-III whitewater, deep steep-walled gorge terrain, rock outcroppings, waterfalls, changing release traffic, whitewater craft rules, PFD requirements, helmets for canoes and kayaks, and cold-water gear recommendations for spring and fall.",
        "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating"
      }
    ],
    "sourceLinks": [
      {
        "label": "PA DCNR Lehigh Gorge whitewater boating",
        "url": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating",
        "provider": "local"
      },
      {
        "label": "PA DCNR Lehigh Gorge State Park access directions",
        "url": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park",
        "provider": "local"
      },
      {
        "label": "USGS 01447800 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01447800/",
        "provider": "usgs"
      },
      {
        "label": "USACE Lehigh Basin data summary",
        "url": "https://www.nap-wc.usace.army.mil/nap/lehipub.html",
        "provider": "local"
      },
      {
        "label": "PFBC registration vs launch permit",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "lehigh-river-white-haven-glen-onoko",
    "slug": "lehigh-river-white-haven-glen-onoko",
    "name": "Lehigh River",
    "reach": "White Haven to Glen Onoko",
    "aliases": [
      "Lehigh Gorge Full Run",
      "Lehigh River - White Haven to Glen Onoko",
      "Lehigh River Full Gorge Section"
    ],
    "state": "Pennsylvania",
    "region": "Pocono Mountains",
    "summary": "Full Lehigh Gorge whitewater from the DCNR White Haven access to Glen Onoko. DCNR names this 20.9-mile Class II-III trip, warns that raft trips can take 10 to 12 hours at lower water, and publishes official flow bands tied to the White Haven gauge family.",
    "statusText": "Use the Lehigh River below Francis E. Walter Reservoir gauge near White Haven. DCNR says below 250 cfs is very low, 250 to 1,000 cfs is better for boating, difficulty rises above 1,000 cfs, and above 5,000 cfs is expert-only water.",
    "latitude": 41.05527,
    "longitude": -75.771581,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-01447800",
      "provider": "usgs",
      "siteId": "01447800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Lehigh River below Francis E. Walter Reservoir near White Haven, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01447800/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "dam_release",
        "cold_water"
      ],
      "safetyNotes": [
        "DCNR classifies the Lehigh Gorge as Class II-III whitewater and says inexperienced boaters should not attempt it without qualified guides.",
        "Check the White Haven outflow gauge and current park alerts before launching; Francis E. Walter Dam releases and tributary inflow control conditions can change both difficulty and access traffic.",
        "Use only the designated White Haven and Glen Onoko access areas, whitewater-designed craft, and the required whitewater PFD; this 20.9-mile run can take 10 to 12 hours at low water, so leave enough daylight and carry spring or fall cold-water gear."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 250,
      "idealMax": 1000,
      "tooLow": 250,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "PA DCNR Lehigh Gorge State Park flow rates",
        "url": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating",
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
      "seasonNotes": "USACE Francis E. Walter Dam releases for fishing and recreational whitewater occur spring through fall, and DCNR says release days can change parking and traffic patterns at White Haven, Rockport, and Glen Onoko. Tributary rain, cold spring and fall water, and release timing still require same-day judgment.",
      "difficulty": "hard",
      "difficultyNotes": "DCNR describes this full Lehigh Gorge run as Class II-III whitewater through a steep-walled gorge. The full-corridor length, release traffic, and cold-water consequence make it a major day even for qualified private groups.",
      "confidenceNotes": "Confidence is high for this Pennsylvania add: DCNR identifies White Haven to Glen Onoko as a 20.9-mile Lehigh Gorge route, warns that raft trips can take 10 to 12 hours at lower water levels, publishes official cfs bands for the state-park gauges, and states that flow rates are measured at White Haven, Rockport, and Glen Onoko. USGS Water Services returned same-day July 16, 2026 discharge and stage of 294 cfs and 3.55 ft at 2026-07-16 12:30 EDT for site 01447800 below Francis E. Walter Reservoir near White Haven, and the Glen Onoko coordinate is cross-checked to 40.8835, -75.75914 because the current DCNR page appears to publish the correct longitude with a latitude typo."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "White Haven to Glen Onoko, 20.9 miles",
        "note": "DCNR lists White Haven to Glen Onoko as a 20.9-mile private-trip option in Lehigh Gorge State Park and says the raft trip may take 10 to 12 hours at lower water levels.",
        "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating"
      },
      {
        "label": "Access GPS",
        "value": "White Haven 41.055270, -75.771581 and Glen Onoko 40.8835, -75.75914",
        "note": "The current DCNR park page publishes White Haven South Access GPS directly, and Glen Onoko is cross-checked to the long-used 40.8835, -75.75914 public park-access coordinate because the current DCNR page appears to carry a latitude typo.",
        "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01447800 at White Haven outflow",
        "note": "USGS Water Services returned same-day July 16, 2026 values of 294 cfs and 3.55 ft at 2026-07-16 12:30 EDT for Lehigh River below Francis E. Walter Reservoir near White Haven, PA.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01447800&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "DCNR flow bands",
        "value": "250 / 250-1,000 / 5,000 cfs",
        "note": "DCNR says flows below 250 cfs are very low and many parts are not deep enough for boating, 250 to 1,000 cfs becomes better for boating, difficulty rises above 1,000 cfs, and above 5,000 cfs is expert-only water.",
        "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating"
      },
      {
        "label": "Core hazards",
        "value": "Class II-III gorge whitewater over a full-day commitment",
        "note": "DCNR highlights Class II-III whitewater, deep steep-walled gorge terrain, rock outcroppings, waterfalls, changing release traffic, whitewater craft rules, PFD requirements, helmets for canoes and kayaks, and the long-day timing risk at lower water.",
        "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating"
      }
    ],
    "sourceLinks": [
      {
        "label": "PA DCNR Lehigh Gorge whitewater boating",
        "url": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating",
        "provider": "local"
      },
      {
        "label": "PA DCNR Lehigh Gorge State Park access directions",
        "url": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park",
        "provider": "local"
      },
      {
        "label": "USGS 01447800 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01447800/",
        "provider": "usgs"
      },
      {
        "label": "USACE Lehigh Basin data summary",
        "url": "https://www.nap-wc.usace.army.mil/nap/lehipub.html",
        "provider": "local"
      },
      {
        "label": "PFBC registration vs launch permit",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-sayre-towanda",
    "slug": "susquehanna-river-sayre-towanda",
    "name": "Susquehanna River",
    "reach": "North Branch: Sayre to Towanda",
    "aliases": [
      "North Branch Susquehanna - Sayre to Towanda",
      "Susquehanna River - Sayre PFBC to Towanda Riverfront",
      "North Branch Section 1 upper access planner corridor"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Upper North Branch Susquehanna corridor from the Sayre PFBC access to Towanda Riverfront Park. Use the access planner for shorter trips through Ulster and Hornbrook; the direct Towanda gauge keeps the corridor on one conservative same-day read.",
    "statusText": "Use the Susquehanna River at Towanda gauge. PFBC uses about 2 ft there as the safe-base planning level, says the river can still be paddled as low as about -0.5 ft, and says novice paddlers should stay off when Towanda is over about 5 ft.",
    "latitude": 41.988333,
    "longitude": -76.611667,
    "gaugeSource": {
      "id": "usgs-01531500",
      "provider": "usgs",
      "siteId": "01531500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Towanda, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags repeated fast riffle zones through the Section 1 corridor, including the Tioga Point, Towanda, and lower Bradford County miles.",
        "Use the access planner to match the day length to the group; Sayre to Towanda is a long day and the shorter Ulster or Hornbrook pairings are more casual.",
        "Stay with named public accesses, campgrounds, or official stopping points. Do not treat islands, bars, or private banks as backup exits."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": -0.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 1 Towanda stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
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
      "seasonNotes": "The North Branch usually has runnable windows from spring through fall, but thunderstorms, headwind, cold water, and floating wood can change a broad-river day quickly.",
      "difficulty": "easy",
      "difficultyNotes": "Short planner-selected sections are approachable in the conservative band, while the full Sayre-to-Towanda corridor can become a long exposed big-river day.",
      "confidenceNotes": "Confidence is good for a consolidated upper Section 1 corridor: PFBC publishes the Sayre, Ulster, Hornbrook, and Towanda access chain, coordinates, caution miles, and Towanda stage guidance, and V2 uses the direct Towanda gauge for the corridor."
    },
    "evidenceNotes": [
      {
        "label": "Official corridor",
        "value": "Sayre to Towanda, with intermediate public access choices",
        "note": "PFBC Section 1 and the North Branch guide family publish the Sayre, Ulster, Hornbrook, and Towanda access sequence.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01531500 at Towanda",
        "note": "The Towanda gauge is the direct product-supported reference for the Section 1 corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
      },
      {
        "label": "Planner model",
        "value": "Multiple access points on one corridor page",
        "note": "This route replaces overlapping upper Section 1 route cards with one Rice Creek-style access planner corridor.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 1",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01531500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01531500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-sayre-wysox-township-park",
    "slug": "susquehanna-river-sayre-wysox-township-park",
    "name": "Susquehanna River",
    "reach": "North Branch: Sayre PFBC to Wysox Township Park",
    "aliases": [
      "North Branch Susquehanna - Sayre to Wysox Township Park",
      "Susquehanna River - Sayre PFBC to Wysox Township Park",
      "North Branch Section 1 long Towanda approach day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Twenty-three-mile upper North Branch continuation from the Sayre PFBC ramp to Wysox Township Park. The official PFBC guide family publishes both access coordinates, supports the long distance with official river miles, and ties the whole corridor directly to the Towanda gauge for conservative same-day planning.",
    "statusText": "Use the Susquehanna River at Towanda gauge. PFBC says about 2 ft there is the safe-base planning level, the river can still be paddled as low as about -0.5 ft, and novice paddlers should stay off when Towanda is over about 5 ft.",
    "latitude": 41.879583,
    "longitude": -76.504722,
    "gaugeSource": {
      "id": "usgs-01531500",
      "provider": "usgs",
      "siteId": "01531500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Towanda, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags fast riffles at miles 286 and 277, the strainer-prone mile-274 fast-water zone, current under bridge arches at mile 272, and more quick water at miles 270, 269, and 268 inside this long route.",
        "This is a broad exposed mainstem day where headwind, thunderstorms, floating wood, and fatigue can matter as much as any single riffle or bridge line.",
        "Stay with the planned Wysox Township Park finish and do not substitute islands, bars, or private shoreline pull-offs for the named public landing."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": -0.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 1 Towanda stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
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
      "seasonNotes": "PFBC says the North Branch often stays paddleable through summer low water, but broad-river wind, thunderstorms, and flooded treelines still change the feel quickly on a long day like this.",
      "difficulty": "easy",
      "difficultyNotes": "This is still broad-audience flatwater in the conservative band, but the 23-mile length, exposed wind, and repeated quick-water zones make it a serious long-day commitment rather than a casual float.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: the PFBC North Branch guide family publishes exact coordinates for Sayre PFBC and Wysox Township Park, defines the corridor with official river miles, and flags the exact caution sequence that matters from the upper Bradford reach into Towanda. The threshold model is direct and official because PFBC writes the low-water and novice-high-water guidance around Towanda itself. USGS Water Services returned same-day July 13, 2026 values of 1,960 cfs and 0.55 ft at 2026-07-13 20:45 EDT for direct USGS 01531500 during this restore pass."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Sayre PFBC to Wysox Township Park, about 23 mi",
        "note": "The PFBC North Branch guide family places Sayre PFBC at river mile 290.5 and Wysox Township Park at river mile 267.5.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "The PFBC Section 1 access table publishes Sayre PFBC at 41 59 18 / -76 36 42 and Wysox Township Park at 41 46 15 / -76 23 52.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01531500 at Towanda",
        "note": "USGS Water Services returned same-day July 13, 2026 values of 1,960 cfs and 0.55 ft at 2026-07-13 20:45 EDT for Susquehanna River at Towanda, PA.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
      },
      {
        "label": "Official stage guidance",
        "value": "Towanda -0.5 ft low runnable, 2 ft safe base, 5 ft novice ceiling",
        "note": "PFBC says the river can be paddled with Towanda as low as about -0.5 ft, uses 2 ft as the safe paddle base level, and says novice paddlers should not paddle when Towanda is over 5 ft.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Primary cautions",
        "value": "Fast water near miles 286, 277, 274, 272, 270, 269, and 268",
        "note": "The PFBC Section 1 caution list flags the upper fast-riffle sequence, the mile-274 strainer area, and the quick-water sequence approaching and just below Towanda inside this route.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 1",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
        "provider": "local"
      },
      {
        "label": "2021 North Branch Susquehanna guide",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01531500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01531500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-hornbrook-wysox-township-park",
    "slug": "susquehanna-river-hornbrook-wysox-township-park",
    "name": "Susquehanna River",
    "reach": "North Branch: Larnard Hornbrook Park to Wysox Township Park",
    "aliases": [
      "North Branch Susquehanna - Hornbrook to Wysox Township Park",
      "Susquehanna River - Hornbrook Park to Wysox Township Park",
      "North Branch Section 1 Towanda approach public-access day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Eight-mile Bradford County North Branch day from Larnard Hornbrook Park to Wysox Township Park. The official PFBC Section 1 guide publishes both access coordinates, maps the Towanda bridge-corridor caution sequence, and uses the Towanda gauge directly for the same-day decision.",
    "statusText": "Use the Susquehanna River at Towanda gauge. PFBC says about 2 ft there is the safe-base planning level, the river can still be paddled as low as about -0.5 ft, and novice paddlers should stay off when Towanda is over about 5 ft.",
    "latitude": 41.80682166422598,
    "longitude": -76.48648638158845,
    "gaugeSource": {
      "id": "usgs-01531500",
      "provider": "usgs",
      "siteId": "01531500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Towanda, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags a strainer-prone fast-water zone near mile 274, current under bridge arches at mile 272, and more quick water at miles 270, 269, and 268 inside this route.",
        "Bridge current, headwind, and fresh wood can make this shorter segment feel more committed than the raw mileage suggests.",
        "Stay with the planned Wysox Township Park finish and do not substitute islands, bars, or private shoreline pull-offs for the named public landing."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": -0.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 1 Towanda stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
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
      "seasonNotes": "PFBC says this North Branch corridor often stays paddleable through lower summer water, but storm wood, wind, and bridge current still matter before you commit.",
      "difficulty": "easy",
      "difficultyNotes": "This is a broad-audience day in the conservative band, but the Towanda bridge corridor and the quick-water sequence keep it above a casual drift.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: the PFBC North Branch Section 1 guide publishes exact coordinates for Larnard Hornbrook Park and Wysox Township Park, defines the corridor with official river miles, and flags the exact caution sequence that matters between them. The threshold model is direct and official because PFBC writes the low-water and novice-high-water guidance around Towanda itself. USGS Water Services returned same-day July 13, 2026 values of 1,960 cfs and 0.55 ft at 2026-07-13 22:45 EDT for direct USGS 01531500 during this restore pass."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Larnard Hornbrook Park to Wysox Township Park, about 8 mi",
        "note": "The PFBC North Branch Section 1 guide places Larnard Hornbrook Park at river mile 275 and Wysox Township Park at river mile 267.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "The PFBC Section 1 access table publishes Larnard Hornbrook Park at 41 48 34 / -76 29 10 and Wysox Township Park at 41 46 15 / -76 23 52.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01531500 at Towanda",
        "note": "USGS Water Services returned same-day July 13, 2026 values of 1,960 cfs and 0.55 ft at 2026-07-13 22:45 EDT for Susquehanna River at Towanda, PA.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
      },
      {
        "label": "Official stage guidance",
        "value": "Towanda -0.5 ft low runnable, 2 ft safe base, 5 ft novice ceiling",
        "note": "PFBC says the river can be paddled with Towanda as low as about -0.5 ft, uses 2 ft as the safe paddle base level, and says novice paddlers should not paddle when Towanda is over 5 ft.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Primary cautions",
        "value": "Fast water near miles 274, 272, 270, 269, and 268",
        "note": "The PFBC Section 1 caution list flags the mile-274 strainer area, the bridge-arch current near mile 272, and the quick-water sequence approaching and just below Towanda inside this route.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 1",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
        "provider": "local"
      },
      {
        "label": "2021 North Branch Susquehanna guide",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01531500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01531500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-ulster-bridge-towanda",
    "slug": "susquehanna-river-ulster-bridge-towanda",
    "name": "Susquehanna River",
    "reach": "North Branch: Ulster Bridge to Towanda Riverfront Park",
    "aliases": [
      "North Branch Susquehanna - Ulster Bridge to Towanda",
      "Susquehanna River - Ulster Bridge access to Towanda Riverfront Park",
      "North Branch Section 1 Towanda bridge corridor day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Eight-mile North Branch Susquehanna day from Ulster Bridge to Towanda Riverfront Park. The official PFBC Section 1 guide publishes both access coordinates, maps the caution miles that matter before town, and ties the whole corridor directly to the Towanda gauge for conservative same-day planning.",
    "statusText": "Use the Susquehanna River at Towanda gauge. PFBC says about 2 ft there is the safe-base planning level, the river can still be paddled as low as about -0.5 ft, and novice paddlers should stay off when Towanda is over about 5 ft.",
    "latitude": 41.8525,
    "longitude": -76.497222,
    "gaugeSource": {
      "id": "usgs-01531500",
      "provider": "usgs",
      "siteId": "01531500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Towanda, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags fast riffles at mile 277, a strainer-prone fast-water zone near mile 274, current under bridge arches at mile 272, and more quick water before the Towanda bridge at mile 270 inside this route.",
        "The wide river still builds headwind, floating wood problems, and bridge-current consequence faster than the easy profile suggests.",
        "Stay with the planned Towanda Riverfront Park finish and do not assume islands, bars, or private shoreline pull-offs are acceptable substitutes."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": -0.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 1 Towanda stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
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
      "seasonNotes": "PFBC says this upper North Branch corridor often stays paddleable through summer low-water periods, but bridge current, storms, and broad-river wind still change the same-day feel quickly.",
      "difficulty": "easy",
      "difficultyNotes": "This is a broad-audience big-river day in the conservative band, but the Towanda bridge approach and the riffle / strainer sequence keep it above a casual flatwater float.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: the PFBC North Branch Section 1 guide publishes exact coordinates for Ulster Bridge and Towanda Riverfront Park, defines the corridor with official river miles, and flags the exact caution sequence that matters before town. The threshold model is direct and official because PFBC writes the low-water and novice-high-water guidance around Towanda itself. USGS Water Services returned same-day July 15, 2026 values of 1,690 cfs and 0.43 ft at 2026-07-15 15:45 EDT for direct USGS 01531500 during this restore pass."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Ulster Bridge to Towanda Riverfront Park, about 8.8 mi",
        "note": "The PFBC North Branch Section 1 guide places Ulster Bridge at river mile 279 and Towanda Riverfront Park at river mile 270.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "The PFBC Section 1 access table publishes Ulster Bridge at 41 51 09 / -76 29 50 and Towanda Riverfront Park at 41 46 07 / -76 26 19.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01531500 at Towanda",
        "note": "USGS Water Services returned same-day July 15, 2026 values of 1,690 cfs and 0.43 ft at 2026-07-15 15:45 EDT for Susquehanna River at Towanda, PA.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
      },
      {
        "label": "Official stage guidance",
        "value": "Towanda -0.5 ft low runnable, 2 ft safe base, 5 ft novice ceiling",
        "note": "PFBC says the river can be paddled with Towanda as low as about -0.5 ft, uses 2 ft as the safe paddle base level, and says novice paddlers should not paddle when Towanda is over 5 ft.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Primary cautions",
        "value": "Fast riffles near miles 277, 274, 272, and 270",
        "note": "The PFBC Section 1 caution list flags the mile-274 strainer area, the bridge-arch current near mile 272, and the quick-water sequence before Towanda inside this route.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 1",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
        "provider": "local"
      },
      {
        "label": "2021 North Branch Susquehanna guide",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01531500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01531500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-ulster-bridge-wysox-township-park",
    "slug": "susquehanna-river-ulster-bridge-wysox-township-park",
    "name": "Susquehanna River",
    "reach": "North Branch: Ulster Bridge to Wysox Township Park",
    "aliases": [
      "North Branch Susquehanna - Ulster Bridge to Wysox Township Park",
      "Susquehanna River - Ulster Bridge access to Wysox Township Park",
      "North Branch Section 1 Towanda upper approach day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Eleven-mile upper North Branch day from Ulster Bridge to Wysox Township Park. The official PFBC guide family publishes both access coordinates, lists this route as a favorite day trip, and ties the whole corridor directly to the Towanda gauge for conservative same-day planning.",
    "statusText": "Use the Susquehanna River at Towanda gauge. PFBC says about 2 ft at Towanda is the safe-base planning level, the river can still be paddled as low as about -0.5 ft, and novice paddlers should stay off when Towanda is over about 5 ft.",
    "latitude": 41.811667,
    "longitude": -76.4475,
    "gaugeSource": {
      "id": "usgs-01531500",
      "provider": "usgs",
      "siteId": "01531500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Towanda, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags fast riffles at mile 277, fast riffles with a strainer in the mile-274 area, fast riffles under bridge arches at mile 272, and more quick water at miles 270, 269, and 268 inside this route.",
        "The Towanda bridge corridor accelerates current toward structure, especially when the river is above the calmest planning band or when wind stacks against the flow.",
        "Stay with the planned Wysox Township Park finish and do not substitute informal banks, islands, or bridge shoulders for the named public accesses."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": -0.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 1 Towanda stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
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
      "seasonNotes": "PFBC says the North Branch in this corridor often stays paddleable in lower summer water, but the wide channel still reacts quickly to thunderstorms, wood, and headwind.",
      "difficulty": "easy",
      "difficultyNotes": "This remains broad-audience river mileage in the conservative band, but the bridge-current line near Towanda, the strainer-prone riffle zone, and the 11.3-mile length keep it above a casual float.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: the PFBC North Branch guide family publishes exact coordinates for Ulster Bridge and Wysox Township Park, labels the route as an 11.3-mile favorite trip, and flags the main caution miles that need to stay in product copy. The threshold model is direct and official because PFBC writes the low-water and novice-high-water guidance around Towanda itself. USGS Water Services returned same-day July 14, 2026 values of 1,940 cfs and 0.54 ft at 2026-07-14 01:45 EDT for direct USGS 01531500 during this restore pass."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Ulster Bridge to Wysox Township Park, 11.3 mi",
        "note": "The 2021 North Branch Susquehanna guide lists Ulster Bridge Municipal Access 278.8 to Wysox Township Park Municipal Access 267.5 as a favorite day trip.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "The PFBC Section 1 access table publishes Ulster Bridge at 41 51 09 / -76 29 50 and Wysox Township Park at 41 46 15 / -76 23 52.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01531500 at Towanda",
        "note": "USGS Water Services returned same-day July 14, 2026 values of 1,940 cfs and 0.54 ft for Susquehanna River at Towanda, PA.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
      },
      {
        "label": "Official stage guidance",
        "value": "Towanda -0.5 ft low runnable, 2 ft safe base, 5 ft novice ceiling",
        "note": "PFBC says the river can be paddled with Towanda as low as about -0.5 ft, uses 2 ft as the safe paddle base level, and says novice paddlers should not paddle when Towanda is over 5 ft.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Primary cautions",
        "value": "Fast riffles near miles 277, 274, 272, 270, 269, and 268",
        "note": "The PFBC Section 1 caution list flags the upper quick-water sequence and the Towanda bridge approach that remain the decisive same-day hazards on this route.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 1",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
        "provider": "local"
      },
      {
        "label": "2021 North Branch Susquehanna guide",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01531500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01531500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-ulster-bridge-terrytown",
    "slug": "susquehanna-river-ulster-bridge-terrytown",
    "name": "Susquehanna River",
    "reach": "North Branch: Ulster Bridge to Terrytown PFBC",
    "aliases": [
      "North Branch Susquehanna - Ulster Bridge to Terrytown",
      "Susquehanna River - Ulster Bridge access to Terrytown PFBC",
      "North Branch Section 1 long Bradford County continuation"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Twenty-five-mile North Branch Susquehanna continuation from Ulster Bridge to the Terrytown PFBC ramp. The official PFBC guide family publishes both access coordinates, supports the long distance with official river miles, and ties the whole route directly to the Towanda gauge for conservative same-day planning.",
    "statusText": "Use the Susquehanna River at Towanda gauge. PFBC uses about 2 ft as the safe-base planning level, says the river can still be paddled as low as about -0.5 ft, and says novice paddlers should stay off when Towanda is over about 5 ft.",
    "latitude": 41.783334,
    "longitude": -76.389445,
    "gaugeSource": {
      "id": "usgs-01531500",
      "provider": "usgs",
      "siteId": "01531500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Towanda, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags the mile-274 strainer area, current under bridge arches at mile 272, fast water around miles 270, 269, and 268, then more quick-water stretches at miles 267, 261, and 258 inside this long route.",
        "This is a long exposed mainstem day where wind, thunderstorms, and fatigue can become more important than any single riffle or bridge line.",
        "Stay with the planned Terrytown PFBC finish and do not treat broad bars, islands, or private shorelines as casual substitutes when the corridor starts to feel slow late in the day."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": -0.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 1 Towanda stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
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
      "seasonNotes": "PFBC says the North Branch often stays paddleable through summer low water, but broad-river wind, thunderstorms, and flooded treelines still change the feel quickly on a long day like this.",
      "difficulty": "easy",
      "difficultyNotes": "This is still broad-audience flatwater in the conservative band, but the 25-mile length, exposed wind, and repeated quick-water zones make it a serious long-day commitment rather than a casual float.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: the PFBC North Branch Section 1 guide publishes exact coordinates for Ulster Bridge and Terrytown PFBC, defines the corridor with official river miles, and flags the exact caution sequence that matters from Towanda down to the lower Bradford reach. The threshold model is direct and official because PFBC writes the low-water and novice-high-water guidance around Towanda itself. USGS Water Services returned same-day July 13, 2026 values of 1,960 cfs and 0.55 ft at 2026-07-13 20:45 EDT for direct USGS 01531500 during this restore pass."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Ulster Bridge to Terrytown PFBC, about 24.9 mi",
        "note": "The PFBC North Branch guide family places Ulster Bridge at river mile 278.8 and Terrytown PFBC at river mile 253.9.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "The PFBC Section 1 access table publishes Ulster Bridge at 41 51 09 / -76 29 50 and Terrytown PFBC at 41 42 51 / -76 16 54.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01531500 at Towanda",
        "note": "USGS Water Services returned same-day July 13, 2026 values of 1,960 cfs and 0.55 ft at 2026-07-13 20:45 EDT for Susquehanna River at Towanda, PA.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
      },
      {
        "label": "Official stage guidance",
        "value": "Towanda -0.5 ft low runnable, 2 ft safe base, 5 ft novice ceiling",
        "note": "PFBC says the river can be paddled with Towanda as low as about -0.5 ft, uses 2 ft as the safe paddle base level, and says novice paddlers should not paddle when Towanda is over 5 ft.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Primary cautions",
        "value": "Fast water near miles 274, 272, 270, 269, 268, 267, 261, and 258",
        "note": "The PFBC Section 1 caution list flags the strainer-prone upper riffle, the Towanda bridge sequence, and the lower Section 1 fast-water stretches that remain relevant all the way to Terrytown.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 1",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
        "provider": "local"
      },
      {
        "label": "2021 North Branch Susquehanna guide",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01531500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01531500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-hornbrook-terrytown",
    "slug": "susquehanna-river-hornbrook-terrytown",
    "name": "Susquehanna River",
    "reach": "North Branch: Larnard Hornbrook Park to Terrytown PFBC",
    "aliases": [
      "North Branch Susquehanna - Hornbrook to Terrytown",
      "Susquehanna River - Hornbrook Park to Terrytown PFBC",
      "North Branch Section 1 long Bradford County day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Twenty-one-mile North Branch Susquehanna continuation from Larnard Hornbrook Park to the Terrytown PFBC ramp. The official PFBC Section 1 guide publishes both access coordinates, supports the long distance with official river miles, and ties the whole route to the Towanda gauge for conservative same-day planning.",
    "statusText": "Use the Susquehanna River at Towanda gauge. PFBC uses about 2 ft as the safe-base planning level, says the river can still be paddled as low as about -0.5 ft, and says novice paddlers should stay off when Towanda is over about 5 ft.",
    "latitude": 41.80682166422598,
    "longitude": -76.48648638158845,
    "gaugeSource": {
      "id": "usgs-01531500",
      "provider": "usgs",
      "siteId": "01531500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Towanda, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags the mile-274 strainer area, current under bridge arches at mile 272, fast water around miles 270, 269, and 268, then more quick-water stretches at miles 267, 261, and 258 inside this long route.",
        "This is a long exposed mainstem day where wind, thunderstorms, and fatigue can become more important than any single riffle or bridge line.",
        "Stay with the planned Terrytown PFBC finish and do not treat broad bars, islands, or private shorelines as casual substitutes when the corridor starts to feel slow late in the day."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": -0.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 1 Towanda stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
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
      "seasonNotes": "PFBC says the North Branch often stays paddleable through summer low water, but broad-river wind, thunderstorms, and flooded treelines still change the feel quickly on a long day like this.",
      "difficulty": "easy",
      "difficultyNotes": "This is still broad-audience flatwater in the conservative band, but the 21.5-mile length, exposed wind, and repeated quick-water zones make it a serious long-day commitment rather than a casual float.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: the PFBC North Branch Section 1 guide publishes exact coordinates for Larnard Hornbrook Park and Terrytown PFBC, defines the corridor with official river miles, and flags the exact caution sequence that matters from Towanda down to the lower Bradford reach. The threshold model is direct and official because PFBC writes the low-water and novice-high-water guidance around Towanda itself. USGS Water Services returned same-day July 13, 2026 values of 1,960 cfs and 0.55 ft at 2026-07-13 20:45 EDT for direct USGS 01531500 during this restore pass."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Larnard Hornbrook Park to Terrytown PFBC, about 21.5 mi",
        "note": "The PFBC North Branch Section 1 guide places Larnard Hornbrook Park at river mile 275 and Terrytown PFBC at river mile 254.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "The PFBC Section 1 access table publishes Larnard Hornbrook Park at 41 48 34 / -76 29 10 and Terrytown PFBC at 41 42 51 / -76 16 54.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01531500 at Towanda",
        "note": "USGS Water Services returned same-day July 13, 2026 values of 1,960 cfs and 0.55 ft at 2026-07-13 20:45 EDT for Susquehanna River at Towanda, PA.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
      },
      {
        "label": "Official stage guidance",
        "value": "Towanda -0.5 ft low runnable, 2 ft safe base, 5 ft novice ceiling",
        "note": "PFBC says the river can be paddled with Towanda as low as about -0.5 ft, uses 2 ft as the safe paddle base level, and says novice paddlers should not paddle when Towanda is over 5 ft.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Primary cautions",
        "value": "Fast water near miles 274, 272, 270, 269, 268, 267, 261, and 258",
        "note": "The PFBC Section 1 caution list flags the strainer-prone upper riffle, the Towanda bridge sequence, and the lower Section 1 fast-water stretches that remain relevant all the way to Terrytown.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 1",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
        "provider": "local"
      },
      {
        "label": "2021 North Branch Susquehanna guide",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01531500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01531500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-towanda-terrytown",
    "slug": "susquehanna-river-towanda-terrytown",
    "name": "Susquehanna River",
    "reach": "North Branch: Towanda Riverfront Park to Terrytown PFBC",
    "aliases": [
      "North Branch Susquehanna - Towanda to Terrytown",
      "Susquehanna River - Towanda Riverfront to Terrytown PFBC",
      "North Branch Section 1 mid-Bradford County day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Sixteen-mile North Branch Susquehanna day from Towanda Riverfront Park to the Terrytown PFBC ramp. The official PFBC Section 1 guide publishes both access coordinates, marks the quick riffle miles in this reach, and gives direct Towanda stage guidance for low-water, planning-band, and novice high-water calls.",
    "statusText": "Use the Susquehanna River at Towanda gauge. PFBC uses about 2 ft as the safe-base planning level, says the river can still be paddled as low as about -0.5 ft, and says novice paddlers should stay off when Towanda is over about 5 ft.",
    "latitude": 41.741389,
    "longitude": -76.360139,
    "gaugeSource": {
      "id": "usgs-01531500",
      "provider": "usgs",
      "siteId": "01531500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Towanda, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags fast riffles before the bridge at mile 270, then more fast current at miles 269 and 268 inside this route.",
        "Low-water funneling can create wave trains in the narrowed lower riverbed, while headwind or thunderstorms can make the broad corridor feel much longer than the raw mileage.",
        "Stay with the planned Terrytown PFBC finish and do not assume broad gravel bars or private shoreline pull-offs are acceptable substitutes."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": -0.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 1 Towanda stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
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
      "seasonNotes": "PFBC says the North Branch in this corridor often remains paddleable in summer low-water periods, but the channel speeds up after rain and wide-open wind can dominate the day.",
      "difficulty": "easy",
      "difficultyNotes": "The route stays in the broad-audience day-trip bucket when Towanda is in the conservative band, but the 16-mile length, quick riffle miles, and changing wind/current are still real trip-planning factors.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: PFBC Section 1 publishes exact coordinates for Towanda Riverfront Park and Terrytown PFBC, lists the route as a clean 16-mile official access pair, and identifies the caution miles that matter for same-day scouting. The threshold model is direct and official because PFBC writes the base-level and novice ceiling around Towanda itself. USGS Water Services returned same-day July 13, 2026 values of 1,960 cfs and 0.55 ft at 2026-07-13 22:45 EDT for direct USGS 01531500 during this restore pass."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Towanda Riverfront Park to Terrytown PFBC, about 16 mi",
        "note": "The PFBC North Branch Section 1 guide places Towanda Riverfront Park at river mile 270 and Terrytown PFBC at river mile 254.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "The PFBC Section 1 access table publishes Towanda Riverfront Park at 41 46 07 / -76 26 19 and Terrytown PFBC at 41 42 51 / -76 16 54.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01531500 at Towanda",
        "note": "USGS Water Services returned same-day July 13, 2026 values of 1,960 cfs and 0.55 ft at 2026-07-13 22:45 EDT for Susquehanna River at Towanda, PA.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
      },
      {
        "label": "Official stage guidance",
        "value": "Towanda -0.5 ft low runnable, 2 ft safe base, 5 ft novice ceiling",
        "note": "PFBC says the river can be paddled with Towanda as low as about -0.5 ft, uses 2 ft as the safe paddle base level, and says novice paddlers should not paddle when Towanda is over 5 ft.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Primary cautions",
        "value": "Fast riffles around miles 270, 269, and 268",
        "note": "The PFBC Section 1 caution list flags fast riffles before the bridge at mile 270, then more fast current at miles 269 and 268 inside this route.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 1",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01531500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01531500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-wysox-township-park-terrytown",
    "slug": "susquehanna-river-wysox-township-park-terrytown",
    "name": "Susquehanna River",
    "reach": "North Branch: Wysox Township Park to Terrytown PFBC",
    "aliases": [
      "North Branch Susquehanna - Wysox Township Park to Terrytown",
      "Susquehanna River - Wysox Township Park to Terrytown PFBC",
      "North Branch Section 1 lower Bradford County public-access day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Fourteen-mile North Branch day from Wysox Township Park to the Terrytown PFBC ramp. The official PFBC guide family publishes both access coordinates, provides enough river-mile and caution support to define the segment cleanly, and uses the Towanda gauge directly for conservative same-day planning.",
    "statusText": "Use the Susquehanna River at Towanda gauge. PFBC uses about 2 ft as the safe-base planning level, says the river can still be paddled as low as about -0.5 ft, and says novice paddlers should stay off when Towanda is over about 5 ft.",
    "latitude": 41.7677028,
    "longitude": -76.39760080000001,
    "gaugeSource": {
      "id": "usgs-01531500",
      "provider": "usgs",
      "siteId": "01531500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Towanda, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags a long fast-riffle section at mile 267 plus more fast riffles at miles 261 and 258 inside this route.",
        "This lower Section 1 corridor looks wide and forgiving, but headwind, thunderstorms, floating wood, and shallow wave trains can still make it feel longer and faster than expected.",
        "Stay with the planned Terrytown PFBC finish and do not assume broad bars, islands, or private-bank pull-offs are legitimate take-out substitutes."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": -0.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 1 Towanda stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
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
      "seasonNotes": "PFBC says the North Branch in this section can stay paddleable through warmer low-water periods, but open-river wind and post-rain current still change the trip quickly.",
      "difficulty": "easy",
      "difficultyNotes": "The route stays in the broad-audience day-trip bucket when Towanda is in the conservative band, but the 13.6-mile length, fast-riffle miles, and wide-channel weather exposure still require real same-day judgment.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: PFBC and the 2021 North Branch guide publish exact coordinates for Wysox Township Park and Terrytown PFBC, and the official river-mile table cleanly defines this 13.6-mile public-access pair while the caution list flags the downstream riffle miles that matter here. The threshold model is direct and official because PFBC writes the low-water and novice-high-water guidance on the Towanda gauge itself. USGS Water Services returned same-day July 13, 2026 values of 1,960 cfs and 0.55 ft at 2026-07-13 22:45 EDT for direct USGS 01531500 during this restore pass."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Wysox Township Park to Terrytown PFBC, about 13.6 mi",
        "note": "The official North Branch access tables place Wysox Township Park at river mile 267.5 and Terrytown PFBC at river mile 253.9, which defines this public access-to-access segment.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "The PFBC Section 1 access table publishes Wysox Township Park at 41 46 15 / -76 23 52 and Terrytown PFBC at 41 42 51 / -76 16 54.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01531500 at Towanda",
        "note": "USGS Water Services returned same-day July 13, 2026 values of 1,960 cfs and 0.55 ft at 2026-07-13 22:45 EDT for Susquehanna River at Towanda, PA.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
      },
      {
        "label": "Official stage guidance",
        "value": "Towanda -0.5 ft low runnable, 2 ft safe base, 5 ft novice ceiling",
        "note": "PFBC says the river can be paddled with Towanda as low as about -0.5 ft, uses 2 ft as the safe paddle base level, and says novice paddlers should not paddle when Towanda is over 5 ft.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Primary cautions",
        "value": "Fast riffles near miles 267, 261, and 258",
        "note": "The PFBC Section 1 caution list flags a long fast-riffle section at mile 267 plus more fast riffles at miles 261 and 258 inside this route.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 1",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
        "provider": "local"
      },
      {
        "label": "2021 North Branch Susquehanna guide",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01531500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01531500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-hornbrook-towanda",
    "slug": "susquehanna-river-hornbrook-towanda",
    "name": "Susquehanna River",
    "reach": "North Branch: Larnard Hornbrook Park to Towanda Riverfront Park",
    "aliases": [
      "North Branch Susquehanna - Hornbrook to Towanda",
      "Susquehanna River - Hornbrook Park to Towanda Riverfront",
      "North Branch Section 1 short Bradford County day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Short Bradford County North Branch day from Larnard Hornbrook Park to Towanda Riverfront Park. The official PFBC Section 1 guide publishes both access coordinates, flags the mile-274 strainer area and the fast riffles before Towanda, and ties the route directly to the Towanda gauge.",
    "statusText": "Use the Susquehanna River at Towanda gauge. PFBC says about 2 ft there is the safe-base planning level, the river can still be paddled as low as about -0.5 ft, and novice paddlers should stay off when Towanda is over about 5 ft.",
    "latitude": 41.80682166422598,
    "longitude": -76.48648638158845,
    "gaugeSource": {
      "id": "usgs-01531500",
      "provider": "usgs",
      "siteId": "01531500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Towanda, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags fast riffles with a strainer near mile 274, then more fast riffles before the bridge at mile 270 inside this short route.",
        "Low water can expose sharper riffle lines, while headwind or thunderstorms can make this feel less casual than the short mileage suggests.",
        "Towanda Riverfront Park is the intended finish. Do not improvise on private banks or drift past the public landing into town traffic and bridge current."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": -0.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 1 Towanda stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
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
      "seasonNotes": "PFBC says this upper North Branch corridor usually stays paddleable through warm-season low water, but wide-channel wind, thunderstorms, and floating wood still change the same-day feel quickly.",
      "difficulty": "easy",
      "difficultyNotes": "This is a shorter big-river day in the conservative band, but the strainer-prone riffle zone and the Towanda bridge/current finish still require active same-day judgment.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: the PFBC North Branch Section 1 guide publishes exact coordinates for Larnard Hornbrook Park and Towanda Riverfront Park, defines the corridor with official river miles, and flags the main caution points inside it. The threshold model is direct and official because PFBC writes this low-water and novice-high-water guidance around Towanda itself. USGS Water Services returned same-day July 14, 2026 values of 1,940 cfs and 0.54 ft at 2026-07-14 01:45 EDT for direct USGS 01531500 during this restore pass."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Larnard Hornbrook Park to Towanda Riverfront Park, about 5 mi",
        "note": "The PFBC North Branch Section 1 guide places Larnard Hornbrook Park at river mile 275 and Towanda Riverfront Park at river mile 270.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "The PFBC Section 1 access table publishes Larnard Hornbrook Park at 41 48 34 / -76 29 10 and Towanda Riverfront Park at 41 46 07 / -76 26 19.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01531500 at Towanda",
        "note": "USGS Water Services returned same-day July 14, 2026 values of 1,940 cfs and 0.54 ft for Susquehanna River at Towanda, PA.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
      },
      {
        "label": "Official stage guidance",
        "value": "Towanda -0.5 ft low runnable, 2 ft safe base, 5 ft novice ceiling",
        "note": "PFBC says the river can be paddled with Towanda as low as about -0.5 ft, uses 2 ft as the safe paddle base level, and says novice paddlers should not paddle when Towanda is over 5 ft.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Primary cautions",
        "value": "Mile-274 strainer area and fast riffles before Towanda bridge",
        "note": "The PFBC Section 1 caution list flags fast riffles with a strainer in the mile-274 area and fast riffles before the bridge at mile 270 inside this route.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 1",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
        "provider": "local"
      },
      {
        "label": "2021 North Branch Susquehanna guide",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01531500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01531500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-towanda-laceyville",
    "slug": "susquehanna-river-towanda-laceyville",
    "name": "Susquehanna River",
    "reach": "North Branch: Towanda to Laceyville",
    "aliases": [
      "North Branch Susquehanna - Towanda to Laceyville",
      "Susquehanna River - Towanda Riverfront to Laceyville Borough",
      "North Branch Section 1 lower access planner corridor"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Lower Section 1 North Branch Susquehanna corridor from Towanda Riverfront Park to Laceyville Borough. Use the access planner for shorter trips through Wysox and Terrytown; the direct Towanda gauge keeps the corridor on one conservative same-day read.",
    "statusText": "Use the Susquehanna River at Towanda gauge. PFBC uses about 2 ft there as the safe-base planning level, says the river can still be paddled as low as about -0.5 ft, and says novice paddlers should stay off when Towanda is over about 5 ft.",
    "latitude": 41.768611,
    "longitude": -76.438611,
    "gaugeSource": {
      "id": "usgs-01531500",
      "provider": "usgs",
      "siteId": "01531500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Towanda, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags repeated fast riffle zones through the Section 1 corridor, including lower Bradford County miles.",
        "Use the access planner to match the day length to the group; Towanda to Laceyville is a long day and the Wysox or Terrytown pairings can shorten it.",
        "Stay with named public accesses, campgrounds, or official stopping points. Do not treat islands, bars, or private banks as backup exits."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": -0.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 1 Towanda stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
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
      "seasonNotes": "The North Branch usually has runnable windows from spring through fall, but thunderstorms, headwind, cold water, and floating wood can change a broad-river day quickly.",
      "difficulty": "easy",
      "difficultyNotes": "Short planner-selected sections are approachable in the conservative band, while the full Towanda-to-Laceyville corridor can become a long exposed big-river day.",
      "confidenceNotes": "Confidence is good for a consolidated lower Section 1 corridor: PFBC publishes the Towanda, Wysox, Terrytown, and Laceyville access chain, coordinates, caution miles, and Towanda stage guidance, and V2 uses the direct Towanda gauge for the corridor."
    },
    "evidenceNotes": [
      {
        "label": "Official corridor",
        "value": "Towanda to Laceyville, with intermediate public access choices",
        "note": "PFBC Section 1 and the North Branch guide family publish the Towanda, Wysox, Terrytown, and Laceyville access sequence.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01531500 at Towanda",
        "note": "The Towanda gauge is the direct product-supported reference for the Section 1 corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01531500/"
      },
      {
        "label": "Planner model",
        "value": "Multiple access points on one corridor page",
        "note": "This route replaces overlapping lower Section 1 route cards with one Rice Creek-style access planner corridor.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 1",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec1.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01531500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01531500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-laceyville-west-falls",
    "slug": "susquehanna-river-laceyville-west-falls",
    "name": "Susquehanna River",
    "reach": "North Branch: Laceyville to West Falls",
    "aliases": [
      "North Branch Susquehanna - Laceyville to West Falls",
      "Susquehanna River - Laceyville Borough to PFBC West Falls",
      "North Branch Section 2 access planner corridor"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Wyoming County North Branch Susquehanna corridor from Laceyville Borough to PFBC West Falls. Use the access planner for shorter trips through Meshoppen, Tunkhannock, and White's Ferry; the Meshoppen gauge is the section reference with a published stage relationship to the other North Branch gauges.",
    "statusText": "Use the Susquehanna River at Meshoppen as the published Section 2 same-river reference. PFBC says Meshoppen reads about 9 ft when Towanda, Wilkes-Barre, and Bloomsburg are about 2 ft, so V2 treats roughly 6.5 to 9 ft at Meshoppen as the easier planning window, with novice no-go water around 12 ft and up.",
    "latitude": 41.64342347378319,
    "longitude": -76.16322665126009,
    "gaugeSource": {
      "id": "usgs-01533400",
      "provider": "usgs",
      "siteId": "01533400",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Susquehanna River at Meshoppen, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01533400/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags boulder fields and fast riffles in the Tunkhannock-to-West-Falls portion of this corridor.",
        "The Meshoppen gauge is a same-section proxy. Make a visual current and landing check before launching when the reading is near the low or high edge.",
        "Stay with the named public accesses and do not improvise on private banks or islands."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 6.5,
      "idealMax": 9,
      "tooLow": 6.5,
      "tooHigh": 12,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 2 stage relationship",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec2.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "derived",
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
      "seasonNotes": "The North Branch usually has runnable windows from spring through fall, but thunderstorms, headwind, cold water, and floating wood can change a broad-river day quickly.",
      "difficulty": "easy",
      "difficultyNotes": "Short planner-selected sections are approachable in the conservative band, while the full corridor can become a long exposed big-river day.",
      "confidenceNotes": "Confidence is good for a consolidated corridor: PFBC publishes the Section 2 access chain, coordinates, caution miles, and Meshoppen/Towanda stage relationship, and V2 uses the product-supported Meshoppen gauge conservatively."
    },
    "evidenceNotes": [
      {
        "label": "Official corridor",
        "value": "Laceyville to West Falls, with intermediate public access choices",
        "note": "PFBC Section 2 publishes the Laceyville, Meshoppen, Tunkhannock, White's Ferry, and West Falls access sequence.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec2.pdf"
      },
      {
        "label": "Same-section gauge proxy",
        "value": "USGS 01533400 at Meshoppen",
        "note": "PFBC publishes the Meshoppen stage relationship that V2 uses for Section 2 route planning.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01533400/"
      },
      {
        "label": "Planner model",
        "value": "Multiple access points on one corridor page",
        "note": "This route replaces overlapping Section 2 route cards with one Rice Creek-style access planner corridor.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec2.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 2",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec2.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01533400 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01533400/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01531500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01531500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-canal-park-wetlands",
    "slug": "susquehanna-river-canal-park-wetlands",
    "name": "Susquehanna River",
    "reach": "North Branch: Canal Park to Wetlands Nature Area",
    "aliases": [
      "North Branch Susquehanna - Canal Park to Wetlands",
      "Susquehanna River - Canal Park to Wetlands Nature Area",
      "North Branch Section 3 full upper corridor day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Longer North Branch Susquehanna day from Canal Park in West Nanticoke to Wetlands Nature Area. The official PFBC Section 3 guide publishes both access coordinates, uses Wilkes-Barre stage guidance for the corridor, and makes the mile-180 rapid below the Nanticoke bridge the clearest route-specific hazard.",
    "statusText": "Use the Susquehanna River at Wilkes-Barre gauge. PFBC uses about 2 ft there as the safe-base planning level, says the river can still be paddled as low as about -0.5 ft, and says novice paddlers should stay off when Wilkes-Barre is over about 5 ft.",
    "latitude": 41.154722,
    "longitude": -76.070556,
    "gaugeSource": {
      "id": "usgs-01536500",
      "provider": "usgs",
      "siteId": "01536500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Wilkes-Barre, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01536500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags a long class I-II rapid on river right about one-half mile below the Nanticoke bridge early in this route.",
        "Once you leave Canal Park, this becomes a committed exposed-river day with headwind, floating wood, and fewer obvious public exits than the first miles suggest.",
        "Stay with the planned Wetlands Nature Area finish and do not improvise on private banks or islands between the named accesses."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": -0.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 3 Wilkes-Barre stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec3.pdf",
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
      "seasonNotes": "PFBC says the North Branch often stays paddleable in lower-water periods, but thunderstorms, valley wind, and floating wood still change the same-day feel quickly on this longer Section 3 run.",
      "difficulty": "easy",
      "difficultyNotes": "This is still an easier broad-river float with named public accesses, but the 14-mile length, exposed headwind risk, and early rapid make it a real day rather than a casual park paddle.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania restore: the PFBC North Branch Section 3 guide publishes exact Canal Park and Wetlands Nature Area coordinates, defines the corridor with official river miles, and writes the section guidance around the direct Wilkes-Barre stage gauge. USGS Water Services returned same-day July 16, 2026 values of 2,990 cfs and 0.74 ft at 2026-07-16 05:45 EDT for direct USGS 01536500 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Canal Park to Wetlands Nature Area, about 14 mi",
        "note": "The PFBC North Branch Section 3 guide places Canal Park at river mile 180 and Wetlands Nature Area at river mile 166.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec3.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "The PFBC Section 3 access table publishes Canal Park at 41 13 12 / -76 01 07 and Wetlands Nature Area at 41 05 22 / -76 07 21.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec3.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01536500 at Wilkes-Barre",
        "note": "USGS Water Services returned same-day July 16, 2026 values of 2,990 cfs and 0.74 ft at 2026-07-16 05:45 EDT for Susquehanna River at Wilkes-Barre, PA.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01536500/"
      },
      {
        "label": "Official stage guidance",
        "value": "Wilkes-Barre about 2 ft safe base, 5 ft novice ceiling",
        "note": "PFBC says the river can still be paddled as low as about -0.5 ft at Wilkes-Barre, uses about 2 ft as the safe paddle base level, and says novice paddlers should stay off above about 5 ft.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec3.pdf"
      },
      {
        "label": "Primary caution",
        "value": "Mile-180 rapid below the Nanticoke bridge",
        "note": "The PFBC Section 3 caution list flags a long class I-II rapid on river right about one-half mile downstream from the Nanticoke bridge.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec3.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 3",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec3.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01536500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01536500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-canal-park-test-track",
    "slug": "susquehanna-river-canal-park-test-track",
    "name": "Susquehanna River",
    "reach": "North Branch: Canal Park to Test Track Park",
    "aliases": [
      "North Branch Susquehanna - Canal Park to Test Track",
      "Susquehanna River - Canal Park to Test Track Park",
      "North Branch Section 3 access planner corridor"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Section 3 North Branch Susquehanna corridor from Canal Park to Test Track Park. Use the access planner for shorter trips through PFBC Union Township and Wetlands Nature Area; Wilkes-Barre is the conservative upper-section gauge, with Bloomsburg context for the downstream ledge near Berwick.",
    "statusText": "Use the Susquehanna River at Wilkes-Barre gauge. PFBC uses about 2 ft there as the safe-base planning level, says the river can still be paddled as low as about -0.5 ft, and says novice paddlers should stay off when Wilkes-Barre is over about 5 ft.",
    "latitude": 41.22,
    "longitude": -76.018611,
    "gaugeSource": {
      "id": "usgs-01536500",
      "provider": "usgs",
      "siteId": "01536500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Wilkes-Barre, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01536500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags a class I-II rapid below the Nanticoke bridge and a low-water ledge before the Berwick-Nescopeck bridge.",
        "Use the access planner to avoid turning a short day into an overlong exposed mainstem run.",
        "Stay with named public accesses and avoid private banks or islands as backup exits."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": -0.5,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 3 Wilkes-Barre stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec3.pdf",
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
      "seasonNotes": "The North Branch usually has runnable windows from spring through fall, but thunderstorms, headwind, cold water, and floating wood can change a broad-river day quickly.",
      "difficulty": "easy",
      "difficultyNotes": "Short planner-selected sections are approachable in the conservative band, while the full corridor can become a long exposed big-river day.",
      "confidenceNotes": "Confidence is good for a consolidated corridor: PFBC publishes the Section 3 access chain, coordinates, caution miles, and Wilkes-Barre stage guidance, and V2 uses the direct Wilkes-Barre gauge for the upper corridor."
    },
    "evidenceNotes": [
      {
        "label": "Official corridor",
        "value": "Canal Park to Test Track Park, with intermediate public access choices",
        "note": "PFBC Section 3 publishes the Canal Park, PFBC Union Township, Wetlands Nature Area, and Test Track Park access sequence.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec3.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01536500 at Wilkes-Barre",
        "note": "The Wilkes-Barre gauge is the direct product-supported reference for the upper Section 3 corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01536500/"
      },
      {
        "label": "Planner model",
        "value": "Multiple access points on one corridor page",
        "note": "This route replaces overlapping Section 3 route cards with one Rice Creek-style access planner corridor.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec3.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 3",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec3.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01536500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01536500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01538700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01538700/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-test-track-danville",
    "slug": "susquehanna-river-test-track-danville",
    "name": "Susquehanna River",
    "reach": "North Branch: Test Track Park to PFBC Danville",
    "aliases": [
      "North Branch Susquehanna - Test Track to Danville",
      "Susquehanna River - Test Track Park to PFBC Danville",
      "North Branch Section 4 access planner corridor"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Section 4 North Branch Susquehanna corridor from Test Track Park to PFBC Danville. Use the access planner for shorter trips through PFBC Bloomsburg and Indian Head Campground; the direct Bloomsburg gauge keeps the lower-corridor ledge and current-speed guidance on one same-day read.",
    "statusText": "Use the Susquehanna River at Bloomsburg stage gauge. The official section guide says the river can be paddled as low as 1 ft, about 1 to 4 ft is the calmer planning window, 4 to 5 ft moves faster, and novice paddlers should stay off if Bloomsburg rises above 6 ft.",
    "latitude": 41.04,
    "longitude": -76.261111,
    "gaugeSource": {
      "id": "usgs-01538700",
      "provider": "usgs",
      "siteId": "01538700",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Bloomsburg, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01538700/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags the Berwick bridge ledge below about 2 ft at Bloomsburg and faster current as stages climb.",
        "Indian Head is a managed campground access; confirm current launch expectations before planning it as a start, finish, or bailout.",
        "Stay with named public or managed accesses and avoid improvising on private banks or islands."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 4,
      "tooLow": 1,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 4 Bloomsburg stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf",
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
      "seasonNotes": "The North Branch usually has runnable windows from spring through fall, but thunderstorms, headwind, cold water, and floating wood can change a broad-river day quickly.",
      "difficulty": "easy",
      "difficultyNotes": "Short planner-selected sections are approachable in the conservative band, while the full corridor can become a long exposed big-river day.",
      "confidenceNotes": "Confidence is good for a consolidated corridor: PFBC publishes the Section 4 access chain, coordinates, caution context, and Bloomsburg stage guidance, and V2 uses the direct Bloomsburg gauge for the corridor."
    },
    "evidenceNotes": [
      {
        "label": "Official corridor",
        "value": "Test Track Park to PFBC Danville, with intermediate access choices",
        "note": "PFBC Section 4 publishes the Test Track Park, PFBC Bloomsburg, Indian Head Campground, and PFBC Danville access sequence.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01538700 at Bloomsburg",
        "note": "The Bloomsburg gauge is the direct product-supported reference for the Section 4 corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01538700/"
      },
      {
        "label": "Planner model",
        "value": "Multiple access points on one corridor page",
        "note": "This route replaces overlapping Section 4 route cards with one Rice Creek-style access planner corridor.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 4",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01538700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01538700/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01540500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01540500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-pfbc-danville-wrays",
    "slug": "susquehanna-river-pfbc-danville-wrays",
    "name": "Susquehanna River",
    "reach": "North Branch: PFBC Danville to Wray's Riverfront Campground",
    "aliases": [
      "North Branch Susquehanna - Danville to Wray's",
      "Susquehanna River - PFBC Danville to Wray's Riverfront Campground",
      "North Branch Section 14 short campground link"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Short North Branch Susquehanna campground link from the PFBC Danville ramp to Wray's Riverfront Campground. The current 2021 North Branch guide publishes both access coordinates, ties this lower corridor to the Danville gauge, and keeps the route in the broad-audience big-river bucket when stages stay under the novice ceiling.",
    "statusText": "Use the Susquehanna River at Danville gauge. The current guide says about 2 ft is the lower limit, around 4 ft is the better planning level, and novice paddlers should stay off when Danville rises above about 7 ft.",
    "latitude": 40.948317,
    "longitude": -76.631473,
    "gaugeSource": {
      "id": "usgs-01540500",
      "provider": "usgs",
      "siteId": "01540500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Danville, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01540500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": 2,
      "tooHigh": 7,
      "thresholdSource": {
        "label": "2021 North Branch Susquehanna guide Danville stage guidance",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
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
      "seasonNotes": "The lower Danville corridor usually stays paddleable through much of the warm season, but big-river headwind, thunderstorms, and faster post-rain current still change the day quickly.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short and comparatively forgiving Susquehanna link with straightforward named accesses, but it is still a mainstem river with wind, current, and private-bank judgment rather than flatwater certainty.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania restore: the current 2021 North Branch guide publishes exact coordinates for PFBC Danville and Wray's Riverfront Campground, lists Danville gauge thresholds for Section 14, and shows the campground as a named downstream access in the same official access table. USGS Water Services returned same-day July 16, 2026 values of 3,430 cfs and 2.89 ft at 2026-07-16 06:30 EDT for direct USGS 01540500 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "PFBC Danville to Wray's, about 4 mi",
        "note": "The current 2021 North Branch guide places PFBC Danville at river mile 137.9 and Wray's Riverfront Campground at river mile 133.6.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "Guide access-table coordinates",
        "note": "The same guide publishes PFBC Danville at 40.943490, -76.598507 and Wray's Riverfront Campground at 40.953143, -76.664439.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01540500 at Danville",
        "note": "USGS Water Services returned same-day July 16, 2026 values of 3,430 cfs and 2.89 ft at 2026-07-16 06:30 EDT for Susquehanna River at Danville, PA.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01540500/"
      },
      {
        "label": "Official stage guidance",
        "value": "Danville 2 / 4 / 7 ft",
        "note": "The current guide lists Section 13-14 paddling guidance at Danville with a 2 ft lower limit, 4 ft good paddling level, and 7 ft upper novice ceiling.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Campground endpoint",
        "value": "Wray's Riverfront Campground access",
        "note": "The current guide lists Wray's as a paved private campground access with parking, restroom, camping, water, and food support on river right.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "2021 North Branch Susquehanna guide",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
        "provider": "local"
      },
      {
        "label": "North Branch Susquehanna River Water Trail",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/where-to-boat/water-trails/north-branch-susquehanna-river",
        "provider": "local"
      },
      {
        "label": "USGS 01540500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01540500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-wrays-shikellamy-west",
    "slug": "susquehanna-river-wrays-shikellamy-west",
    "name": "Susquehanna River",
    "reach": "North Branch: Wray's Riverfront Campground to Shikellamy State Park West",
    "aliases": [
      "North Branch Susquehanna - Wray's to Shikellamy West",
      "Susquehanna River - Wray's Riverfront Campground to Shikellamy State Park West",
      "North Branch Section 14 lower day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Lower North Branch Susquehanna day from Wray's Riverfront Campground to Shikellamy State Park West. The current 2021 North Branch guide publishes both access coordinates, uses the Danville gauge for this Section 14 corridor, and makes the Lake Augusta powerboat zone plus the downstream Sunbury Fabridam the main same-day judgment points.",
    "statusText": "Use the Susquehanna River at Danville gauge as the published same-section proxy for this lower corridor. The current guide lists 2 ft as the lower limit, about 4 ft as the better planning level, and about 7 ft as the novice ceiling.",
    "latitude": 40.918275,
    "longitude": -76.728474,
    "gaugeSource": {
      "id": "usgs-01540500",
      "provider": "usgs",
      "siteId": "01540500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Susquehanna River at Danville, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01540500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam"
      ],
      "safetyNotes": [
        "The current guide marks Sunbury Fabridam downstream at river mile 122.6, so stay with the Shikellamy West finish or another planned state-park take-out instead of drifting into the dam corridor.",
        "The river widens and slows into Lake Augusta around mile 129.9, where wind and powerboat wakes can matter more than current alone.",
        "Treat the last miles as a committed downstream finish with few reasons to improvise on private banks or islands."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": 2,
      "tooHigh": 7,
      "thresholdSource": {
        "label": "2021 North Branch Susquehanna guide Danville stage guidance",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
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
      "seasonNotes": "This lower Sunbury corridor is broad and usually accessible through much of the warm season, but pooled Lake Augusta wind, thunderstorms, and faster high water still change the route character quickly.",
      "difficulty": "easy",
      "difficultyNotes": "This remains an easier big-river route with named campground and state-park endpoints, but the lower-lake feel, boat traffic, and Fabridam take-out discipline make it less casual than the mileage alone suggests.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania restore: the current 2021 North Branch guide publishes exact coordinates for Wray's and Shikellamy State Park West, lists Danville as the Section 14 gauge reference, and marks the Fabridam downstream of the state-park take-out. Confidence is intentionally tempered because the selected gauge sits upstream at Danville rather than inside the final Lake Augusta pool. USGS Water Services returned same-day July 16, 2026 values of 3,430 cfs and 2.89 ft at 2026-07-16 06:30 EDT for USGS 01540500 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Wray's to Shikellamy West, about 9 mi",
        "note": "The current 2021 guide places Wray's Riverfront Campground at river mile 133.6 and Shikellamy State Park West at river mile 125.1.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "Guide access-table coordinates",
        "note": "The same guide publishes Wray's at 40.953143, -76.664439 and Shikellamy State Park West at 40.883406, -76.792510.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Official section gauge proxy",
        "value": "USGS 01540500 at Danville",
        "note": "The current guide uses Danville for Section 13-14 thresholds, and USGS Water Services returned same-day July 16, 2026 values of 3,430 cfs and 2.89 ft at 2026-07-16 06:30 EDT there.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01540500/"
      },
      {
        "label": "Official stage guidance",
        "value": "Danville 2 / 4 / 7 ft",
        "note": "The current guide lists a 2 ft lower limit, 4 ft good paddling level, and 7 ft upper novice ceiling at Danville for Sections 13-14.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Primary caution",
        "value": "Lake Augusta and Sunbury Fabridam",
        "note": "The guide notes Lake Augusta begins near mile 129.9 and marks Sunbury Fabridam downstream at mile 122.6, making a planned state-park take-out important for this route.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "2021 North Branch Susquehanna guide",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
        "provider": "local"
      },
      {
        "label": "North Branch Susquehanna River Water Trail",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/where-to-boat/water-trails/north-branch-susquehanna-river",
        "provider": "local"
      },
      {
        "label": "USGS 01540500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01540500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-pfbc-danville-shikellamy-west",
    "slug": "susquehanna-river-pfbc-danville-shikellamy-west",
    "name": "Susquehanna River",
    "reach": "North Branch: PFBC Danville to Shikellamy State Park West",
    "aliases": [
      "North Branch Susquehanna - Danville to Shikellamy West",
      "Susquehanna River - PFBC Danville to Shikellamy State Park West",
      "North Branch Section 14 access planner corridor"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Lower North Branch Susquehanna corridor from PFBC Danville to Shikellamy State Park West. Use the access planner for a shorter campground-supported variant through Wray's Riverfront; the Danville gauge, Lake Augusta wind, and Sunbury Fabridam take-out discipline drive the same-day call.",
    "statusText": "Use the Susquehanna River at Danville gauge. The current guide lists 2 ft as the lower limit, around 4 ft as the better paddling level, and about 7 ft as the novice ceiling for this corridor.",
    "latitude": 40.94349,
    "longitude": -76.598507,
    "gaugeSource": {
      "id": "usgs-01540500",
      "provider": "usgs",
      "siteId": "01540500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Danville, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01540500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam"
      ],
      "safetyNotes": [
        "Lake Augusta wind and powerboat wakes can matter as much as stage once the route reaches the pooled lower corridor.",
        "Take out at Shikellamy West before the Sunbury Fabridam corridor. Do not drift downstream without a separate dam-aware plan.",
        "Wray's is a managed campground access; confirm current launch or landing expectations before using it as an alternate."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": 2,
      "tooHigh": 7,
      "thresholdSource": {
        "label": "2021 North Branch Susquehanna guide Danville stage guidance",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
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
      "seasonNotes": "The North Branch usually has runnable windows from spring through fall, but thunderstorms, headwind, cold water, and floating wood can change a broad-river day quickly.",
      "difficulty": "easy",
      "difficultyNotes": "Short planner-selected sections are approachable in the conservative band, while the full corridor can become a long exposed big-river day.",
      "confidenceNotes": "Confidence is good for a consolidated corridor: the current North Branch guide publishes the Danville, Wray's, and Shikellamy West access sequence and direct Danville stage guidance, and V2 uses the direct Danville gauge for the corridor."
    },
    "evidenceNotes": [
      {
        "label": "Official corridor",
        "value": "PFBC Danville to Shikellamy West, with Wray's as an intermediate option",
        "note": "The current North Branch guide publishes PFBC Danville, Wray's Riverfront Campground, and Shikellamy State Park West coordinates in the access table.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01540500 at Danville",
        "note": "The Danville gauge is the direct product-supported reference for this lower corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01540500/"
      },
      {
        "label": "Planner model",
        "value": "Multiple access points on one corridor page",
        "note": "This route replaces overlapping Danville-to-Shikellamy route cards with one Rice Creek-style access planner corridor.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "2021 North Branch Susquehanna guide",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
        "provider": "local"
      },
      {
        "label": "North Branch Susquehanna River Water Trail",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/where-to-boat/water-trails/north-branch-susquehanna-river",
        "provider": "local"
      },
      {
        "label": "USGS 01540500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01540500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-wetlands-bloomsburg",
    "slug": "susquehanna-river-wetlands-bloomsburg",
    "name": "Susquehanna River",
    "reach": "North Branch: Wetlands Nature Area to PFBC Bloomsburg",
    "aliases": [
      "North Branch Susquehanna - Wetlands Nature Area to Bloomsburg",
      "Susquehanna River - Wetlands Nature Area to PFBC Bloomsburg",
      "North Branch Section 3 to 4 long Bloomsburg approach day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Seventeen-mile lower North Branch continuation from Wetlands Nature Area to the PFBC Bloomsburg ramp. PFBC Sections 3 and 4 publish the public endpoints, official river-mile support, the direct Bloomsburg stage guidance, and the low-water Berwick ledge warning that matters most on this run.",
    "statusText": "Use the Susquehanna River at Bloomsburg gauge. PFBC says the river can be paddled as low as about 1 ft there, the calmer planning band is about 2 to 4 ft, and novice paddlers should stay off when Bloomsburg is above about 5 to 6 ft.",
    "latitude": 41.09095819224127,
    "longitude": -76.1309336974967,
    "gaugeSource": {
      "id": "usgs-01538700",
      "provider": "usgs",
      "siteId": "01538700",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Bloomsburg, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01538700/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC warns that about one-half mile before the Berwick-Nescopeck bridge the river drops over an exposed rock ledge when the Bloomsburg gauge is below 2 ft.",
        "This is a long exposed mainstem day where wind, thunderstorms, floating wood, and fatigue can matter more than the nominal easy rating.",
        "Stay with the named public accesses at Wetlands Nature Area and PFBC Bloomsburg rather than improvising on islands or private banks late in the day."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": 1,
      "tooHigh": 5.5,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 4 Bloomsburg stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf",
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
      "seasonNotes": "PFBC says this lower corridor can stay paddleable through warmer months, but broad-river wind and post-rain current shifts still matter on the longer Section 3 to 4 continuation.",
      "difficulty": "easy",
      "difficultyNotes": "This is still broad-audience Susquehanna water in the conservative band, but the 17-mile length, primitive upstream launch, and low-water ledge warning push it well beyond a casual park float.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania restore: PFBC Section 3 still publishes Wetlands Nature Area as a public paddler access at mile 166R, Section 4 still publishes the PFBC Bloomsburg access coordinates and Bloomsburg stage guidance directly, and the same guide family still calls out the Berwick-Nescopeck ledge under 2 ft. USGS Water Services returned same-day July 16, 2026 values of 3,690 cfs and 1.42 ft at 2026-07-16 12:15 EDT for direct USGS 01538700 during this restore pass."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Wetlands Nature Area to PFBC Bloomsburg, about 17 mi",
        "note": "PFBC Section 3 places Wetlands Nature Area at mile 166R and the Section 4 access table publishes PFBC Bloomsburg as the next clean downstream public finish for this longer continuation.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec3.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "PFBC Section 3 opens Wetlands Nature Area for paddlers and the Section 4 access table publishes PFBC Bloomsburg at 40 59 49 / -76 25 56.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01538700 at Bloomsburg",
        "note": "USGS Water Services returned same-day July 16, 2026 values of 3,690 cfs and 1.42 ft at 2026-07-16 12:15 EDT for Susquehanna River at Bloomsburg, PA.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01538700&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official stage guidance",
        "value": "Bloomsburg 1 ft low runnable, 2-4 ft easier band, 5-6 ft novice caution ceiling",
        "note": "PFBC says the river can be paddled as low as 1 ft at Bloomsburg, is usually paddled around 2 to 4 ft, and moves fast enough above about 5 ft that novice paddlers should stay off.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf"
      },
      {
        "label": "Primary caution",
        "value": "Berwick-Nescopeck low-water ledge under 2 ft",
        "note": "PFBC warns that about one-half mile before the Berwick-Nescopeck bridge the river drops over an exposed rock ledge when the Bloomsburg gauge is below 2 ft.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec3.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 3",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec3.pdf",
        "provider": "local"
      },
      {
        "label": "PFBC North Branch Susquehanna Section 4",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01538700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01538700/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-pfbc-bloomsburg-montgomery-park",
    "slug": "susquehanna-river-pfbc-bloomsburg-montgomery-park",
    "name": "Susquehanna River",
    "reach": "North Branch: PFBC Bloomsburg to Montgomery Park",
    "aliases": [
      "North Branch Susquehanna - Bloomsburg to Montgomery Park",
      "Susquehanna River - PFBC Bloomsburg to Montgomery Park Municipal Access",
      "North Branch Bloomsburg-to-Danville favorite day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Lower North Branch Susquehanna day from the PFBC Bloomsburg ramp to Montgomery Park in Danville. Susquehanna Greenway publishes this public 12.5-mile route directly, and the direct Bloomsburg gauge keeps the corridor in the broad-audience big-river bucket when levels stay below the novice ceiling.",
    "statusText": "Use the Susquehanna River at Bloomsburg stage gauge. Susquehanna Greenway says this route works between about 1 and 6 ft at Bloomsburg and about 2 to 7 ft at Danville, while the official Section 4 guide keeps the calmer planning window around 1 to 4 ft with novice no-go water above about 6 ft.",
    "latitude": 40.977921,
    "longitude": -76.526211,
    "gaugeSource": {
      "id": "usgs-01538700",
      "provider": "usgs",
      "siteId": "01538700",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Bloomsburg, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01538700/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks"
      ],
      "safetyNotes": [
        "Susquehanna Greenway says islands on this reach are privately owned and should not be used as casual stopping points.",
        "This is a broad open lower mainstem day where wind, thunderstorms, and floating wood can matter more than the nominal easy rating.",
        "Stay with the Montgomery Park finish and do not improvise on side channels, private islands, or informal banks if the current or wind slows the day down."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 4,
      "tooLow": 1,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 4 stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf",
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
      "seasonNotes": "Susquehanna Greenway and PFBC both frame this lower corridor as broadly runnable through much of the warm season, but broad-river wind, thunderstorms, and flooded treelines still change the same-day feel quickly.",
      "difficulty": "easy",
      "difficultyNotes": "This is an easier mainstem Susquehanna route in the conservative band, but the 12.5-mile length, private-island context, and open-water exposure make it more committed than a short park float.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Susquehanna Greenway publishes this exact PFBC-Bloomsburg-to-Montgomery-Park route as a 12.5-mile public trip, the current 2021 North Branch guide publishes the same endpoint coordinates in its access table, and the direct Bloomsburg gauge remains healthy for same-day planning. USGS Water Services returned same-day July 14, 2026 values of 4,320 cfs and 1.68 ft at Bloomsburg, with Greenway and guide guidance still keeping this inside the easy planning band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "PFBC Bloomsburg to Montgomery Park, about 12.5 mi",
        "note": "Susquehanna Greenway publishes this route as a 12.5-mile Bloomsburg-to-Danville trip from PFBC Bloomsburg Access at river mile 148.8 to Montgomery Park Municipal Access at river mile 136.4.",
        "sourceUrl": "https://susquehannagreenway.org/water-trails/pfbc-bloomsburg-to-danville-montgomery-park/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "Guide access-table coordinates",
        "note": "The current 2021 North Branch guide publishes PFBC Bloomsburg at 40.996681, -76.432782 and Montgomery Park Municipal Access at 40.959161, -76.619640.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01538700 at Bloomsburg",
        "note": "USGS Water Services returned same-day July 14, 2026 values of 4,320 cfs and 1.68 ft for Susquehanna River at Bloomsburg, PA.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01538700/"
      },
      {
        "label": "Official stage guidance",
        "value": "Bloomsburg 1 / 1-4 / 6 ft novice ceiling",
        "note": "Susquehanna Greenway recommends this route between 1 and 6 ft at Bloomsburg and 2 and 7 ft at Danville, while PFBC Section 4 says novice paddlers should stay off above about 6 ft at Bloomsburg.",
        "sourceUrl": "https://susquehannagreenway.org/water-trails/pfbc-bloomsburg-to-danville-montgomery-park/"
      },
      {
        "label": "Corridor support",
        "value": "Indian Head Campground and private-island warning",
        "note": "Susquehanna Greenway says Indian Head Campground sits along the route and warns that the islands on this stretch are privately owned and should not be used as casual stopping points.",
        "sourceUrl": "https://susquehannagreenway.org/water-trails/pfbc-bloomsburg-to-danville-montgomery-park/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Susquehanna Greenway Bloomsburg to Danville Montgomery Park route",
        "url": "https://susquehannagreenway.org/water-trails/pfbc-bloomsburg-to-danville-montgomery-park/",
        "provider": "local"
      },
      {
        "label": "PFBC North Branch Susquehanna Section 4",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf",
        "provider": "local"
      },
      {
        "label": "2021 North Branch Susquehanna guide",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01538700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01538700/",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-test-track-indian-head",
    "slug": "susquehanna-river-test-track-indian-head",
    "name": "Susquehanna River",
    "reach": "North Branch: Test Track Park to Indian Head Campground",
    "aliases": [
      "North Branch Susquehanna - Test Track to Indian Head",
      "Susquehanna River - Test Track Park to Indian Head Campground",
      "North Branch Section 4 full upper campground day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Longer North Branch Susquehanna day from Test Track Park to Indian Head Campground. The official Section 4 guide publishes both access coordinates, uses the Bloomsburg gauge for same-day planning, and keeps the exposed Berwick ledge warning visible when the gauge is below 2 ft.",
    "statusText": "Use the Susquehanna River at Bloomsburg stage gauge. The official section guide says the river can be paddled as low as 1 ft, about 1 to 4 ft is the calmer planning window, 4 to 5 ft moves faster, and novice paddlers should stay off if Bloomsburg rises above 6 ft.",
    "latitude": 41.0075,
    "longitude": -76.365278,
    "gaugeSource": {
      "id": "usgs-01538700",
      "provider": "usgs",
      "siteId": "01538700",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Susquehanna River at Bloomsburg, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01538700/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC warns that about one-half mile before the Berwick-Nescopeck bridge the river drops over an exposed rock ledge when the Bloomsburg gauge is below 2 ft.",
        "This longer open-water corridor can feel slower and more exposed than the map suggests once wind, thunderstorms, or broad-river current stack up.",
        "Indian Head is the intended finish. Respect campground rules and do not improvise on private banks or side landings near the lower miles."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 4,
      "tooLow": 1,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "PFBC North Branch Susquehanna Section 4 stage guidance",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf",
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
      "seasonNotes": "PFBC says this broad North Branch corridor often stays paddleable through lower-water periods, but headwind, thunderstorms, and floating wood still change the same-day feel quickly.",
      "difficulty": "easy",
      "difficultyNotes": "This is an easier mainstem Susquehanna route when Bloomsburg sits in the conservative band, but the 12-mile length, low-water ledge, and campground-finish discipline make it more than a casual short float.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania restore: the PFBC North Branch Section 4 guide publishes exact coordinates for Test Track Park and Indian Head Campground, defines the corridor with official river miles, and uses the direct Bloomsburg stage gauge for same-day planning. USGS Water Services returned same-day July 14, 2026 values of 4,250 cfs and 1.65 ft for direct USGS 01538700 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Test Track Park to Indian Head Campground, about 12 mi",
        "note": "The PFBC North Branch Section 4 guide places Test Track Park at river mile 158 and Indian Head Campground at river mile 146.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "The PFBC Section 4 access table publishes Test Track Park at 41 02 24 / -76 15 40 and Indian Head Campground at 40 58 30 / -76 28 10.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01538700 at Bloomsburg",
        "note": "USGS Water Services returned same-day July 14, 2026 values of 4,250 cfs and 1.65 ft for Susquehanna River at Bloomsburg, PA.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01538700&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official stage guidance",
        "value": "Bloomsburg 1 / 1-4 / 4-5 / 6 ft novice ceiling",
        "note": "The PFBC guide says the river can be paddled as low as 1 ft at Bloomsburg, 2 to 4 ft moves faster, and novice paddlers should stay off when Bloomsburg rises above 6 ft.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf"
      },
      {
        "label": "Campground endpoint",
        "value": "Indian Head Campground access",
        "note": "The PFBC Section 4 access table lists Indian Head Campground as a primitive-to-surfaced ramp with route directions and marks it on river right at mile 146.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC North Branch Susquehanna Section 4",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01538700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01538700/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01538700 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01538700&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      },
      {
        "label": "Indian Head Campground access context",
        "url": "https://pfbc.pa.gov/watertrails/susq_northbranch/nbranch_sec4.pdf",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-danville-montgomery-shikellamy-north",
    "slug": "susquehanna-river-danville-montgomery-shikellamy-north",
    "name": "Susquehanna River",
    "reach": "North Branch: Montgomery Park to Shikellamy State Park North",
    "aliases": [
      "North Branch Susquehanna - Montgomery Park to Shikellamy North",
      "Susquehanna River - Danville Montgomery Park to Shikellamy State Park North",
      "North Branch Section 14 favorite day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Lower Section 14 Susquehanna day from Montgomery Park in Danville to Shikellamy State Park North. The current 2021 North Branch guide lists this public pair as a favorite 11.2-mile day trip and uses the Danville gauge for same-day planning, while the finish still demands explicit Lake Augusta and Fabridam take-out discipline.",
    "statusText": "Use the Susquehanna River at Danville gauge as the official Section 14 planning reference. The current guide lists about 2 ft as the lower limit, around 4 ft as the better paddling level, and about 7 ft as the novice ceiling.",
    "latitude": 40.91986,
    "longitude": -76.704663,
    "gaugeSource": {
      "id": "usgs-01540500",
      "provider": "usgs",
      "siteId": "01540500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Susquehanna River at Danville, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01540500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam"
      ],
      "safetyNotes": [
        "The current guide says Lake Augusta begins in the lower part of this route, where wind and powerboat wakes can matter more than current alone.",
        "Shikellamy State Park North is the intended finish. Do not drift beyond the state-park access zone toward Sunbury Fabridam downstream.",
        "Treat the final state-park approach as a committed public take-out rather than a reason to improvise on private banks or islands late in the run."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 4,
      "tooLow": 2,
      "tooHigh": 7,
      "thresholdSource": {
        "label": "2021 North Branch Susquehanna guide Danville stage guidance",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
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
      "seasonNotes": "The lower Danville-to-Sunbury corridor usually stays accessible through much of the warm season, but Lake Augusta wind, thunderstorms, and faster post-rain current still change the route character quickly.",
      "difficulty": "easy",
      "difficultyNotes": "This remains a broad-audience mainstem Susquehanna route in the conservative band, but the 11-mile distance, pooled lower miles, and precise take-out discipline make it more serious than a casual float.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania restore: the current 2021 North Branch guide lists Montgomery Park to Shikellamy State Park North as a favorite 11.2-mile public day trip, publishes the exact endpoint coordinates in the access table, and writes Section 14 thresholds around the Danville gauge. USGS Water Services returned same-day July 14, 2026 values of 4,090 cfs and 3.10 ft at Danville, with upstream Bloomsburg corroboration at 4,250 cfs and 1.65 ft."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Montgomery Park to Shikellamy North, about 11.2 mi",
        "note": "The current 2021 North Branch guide lists Danville Montgomery Park Municipal Access at river mile 136.4 to Shikellamy State Park North Access at river mile 125.2 as a favorite day trip.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "Guide access-table coordinates",
        "note": "The same guide publishes Montgomery Park Municipal Access at 40.959161, -76.619640 and Shikellamy State Park North Access at 40.880559, -76.789685.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Official section gauge proxy",
        "value": "USGS 01540500 at Danville",
        "note": "The current guide uses Danville for Section 14 planning, and USGS Water Services returned same-day July 14, 2026 values of 4,090 cfs and 3.10 ft there.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01540500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official stage guidance",
        "value": "Danville 2 / 4 / 7 ft",
        "note": "The current guide lists a 2 ft lower limit, 4 ft good paddling level, and 7 ft upper novice ceiling at Danville for Sections 13 and 14.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Lower-corridor caution",
        "value": "Lake Augusta plus Fabridam take-out discipline",
        "note": "The current guide notes Lake Augusta in the lower corridor and marks Sunbury Fabridam downstream of the Shikellamy access zone, making the planned state-park take-out important.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "2021 North Branch Susquehanna guide",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
        "provider": "local"
      },
      {
        "label": "North Branch Susquehanna River Water Trail",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/where-to-boat/water-trails/north-branch-susquehanna-river",
        "provider": "local"
      },
      {
        "label": "USGS 01540500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01540500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01538700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01538700/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01540500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01540500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "DCNR Shikellamy State Park",
        "url": "https://www.dcnr.pa.gov/StateParks/FindAPark/ShikellamyStatePark/Pages/default.aspx",
        "provider": "local"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "susquehanna-river-riverside-borough-shikellamy-north",
    "slug": "susquehanna-river-riverside-borough-shikellamy-north",
    "name": "Susquehanna River",
    "reach": "North Branch: Riverside Borough to Shikellamy State Park North",
    "aliases": [
      "North Branch Susquehanna - Riverside to Shikellamy North",
      "Susquehanna River - Riverside Borough Access to Shikellamy State Park North",
      "North Branch Riverside-to-Shikellamy day trip"
    ],
    "state": "Pennsylvania",
    "region": "North Branch Susquehanna",
    "summary": "Moderate lower North Branch Susquehanna day from Riverside Borough Access to Shikellamy State Park North. Susquehanna Greenway publishes this exact 10.2-mile public route with route-specific hazard notes, and the Danville gauge gives it an official same-section water-level check.",
    "statusText": "Use the Susquehanna River at Danville gauge as the route page recommends. Susquehanna Greenway says this trip should read between about 2 and 7 ft there, with the main low-water issues coming from island banks and stones in the lower miles.",
    "latitude": 40.921474,
    "longitude": -76.711564,
    "gaugeSource": {
      "id": "usgs-01540500",
      "provider": "usgs",
      "siteId": "01540500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Susquehanna River at Danville, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01540500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam"
      ],
      "safetyNotes": [
        "Susquehanna Greenway warns about island banks, ledges, and stones in low water, especially as you approach the lower islands and Packers Island.",
        "Lake Augusta adds motorized boat traffic and wind exposure before the finish. Stay alert near the Shikellamy North take-out, especially around the final bridge approach.",
        "Finish at Shikellamy State Park North. Do not continue downstream toward Sunbury Fabridam if you miss the planned access."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 2,
      "thresholdSource": {
        "label": "Susquehanna Greenway Riverside to Shikellamy Danville water-level guidance",
        "url": "https://susquehannagreenway.org/water-trails/riverside-to-shikellamy-state-park/",
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
      "seasonNotes": "This lower route is broad and often paddleable through much of the warm season, but low water exposes ledges and stones while Lake Augusta wind and motorized traffic make the finish feel bigger than the map suggests.",
      "difficulty": "moderate",
      "difficultyNotes": "Susquehanna Greenway marks this route moderate. The mileage is reasonable, but the island-and-stone decisions in low water, the pooled lower miles, and the busy state-park finish keep it above the easy bucket.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania restore: Susquehanna Greenway publishes this exact Riverside-to-Shikellamy route with named public endpoints, mileage, low-water hazards, and a route-specific Danville water-level recommendation. The current 2021 North Branch guide publishes the exact Riverside Borough and Shikellamy North coordinates in its access table. USGS Water Services returned same-day July 14, 2026 values of 4,090 cfs and 3.10 ft at Danville."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Riverside Borough to Shikellamy North, about 10.2 mi",
        "note": "Susquehanna Greenway publishes this exact route at 10.2 miles from Riverside Municipal Access at river mile 135.3 to Shikellamy State Park North Access at river mile 125.1.",
        "sourceUrl": "https://susquehannagreenway.org/water-trails/riverside-to-shikellamy-state-park/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "Guide access-table coordinates",
        "note": "The current 2021 North Branch guide publishes Riverside Borough Access at 40.962389, -76.633444 and Shikellamy State Park North Access at 40.880559, -76.789685.",
        "sourceUrl": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf"
      },
      {
        "label": "Official section gauge proxy",
        "value": "USGS 01540500 at Danville",
        "note": "Susquehanna Greenway recommends this route when the Danville gauge reads between 2 and 7 ft, and USGS Water Services returned same-day July 14, 2026 values of 4,090 cfs and 3.10 ft there.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01540500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route-specific hazards",
        "value": "Island banks and stones in low water",
        "note": "Susquehanna Greenway says ledges, island banks, and stones become the key low-water issues as you approach the lower islands, Packers Island, and the Shikellamy finish.",
        "sourceUrl": "https://susquehannagreenway.org/water-trails/riverside-to-shikellamy-state-park/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Susquehanna Greenway Riverside to Shikellamy State Park route",
        "url": "https://susquehannagreenway.org/water-trails/riverside-to-shikellamy-state-park/",
        "provider": "local"
      },
      {
        "label": "2021 North Branch Susquehanna guide",
        "url": "https://www.emheritage.org/wp-content/uploads/2021/04/Water-Trail-Maps-Brochure-Section-op.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01540500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01540500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01540500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01540500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "DCNR Shikellamy State Park",
        "url": "https://www.dcnr.pa.gov/StateParks/FindAPark/ShikellamyStatePark/Pages/default.aspx",
        "provider": "local"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "juniata-river-greenwood-amity-hall",
    "slug": "juniata-river-greenwood-amity-hall",
    "name": "Juniata River",
    "reach": "Lower Section: Greenwood to Amity Hall",
    "aliases": [
      "Lower Juniata - Greenwood to Amity Hall",
      "Juniata River - Newport access planner corridor"
    ],
    "state": "Pennsylvania",
    "region": "Lower Juniata",
    "summary": "Lower Juniata planner corridor from Greenwood through Newport, Howe Township, and Green Valley to Amity Hall PFBC, using the Newport gauge model.",
    "statusText": "Use the Juniata River at Newport gauge. The official PFBC lower Juniata guide lists Newport among the useful gauges for this lower-section corridor and recommends at least 3.5 ft there.",
    "latitude": 40.530278,
    "longitude": -77.141944,
    "gaugeSource": {
      "id": "usgs-01567000",
      "provider": "usgs",
      "siteId": "01567000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Juniata River at Newport, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01567000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Use the access planner to choose between short Newport-area outings and the full Greenwood-to-Amity Hall corridor.",
        "Low water can expose bars and make the broad lower river slow.",
        "Stay with named public accesses and avoid private banks."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 3.5,
      "thresholdSource": {
        "label": "PFBC lower Juniata guide minimum Newport gauge level",
        "url": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf",
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
      "seasonNotes": "PFBC says low summer conditions can leave broad bars and shallow lines, while a recent rain usually improves this lower corridor without requiring a full high-water call.",
      "difficulty": "easy",
      "difficultyNotes": "Planner-selected sections are approachable in the official minimum band, but the lower river remains broad enough for wind, low-water bars, and fresh wood to matter.",
      "confidenceNotes": "Confidence is good for a consolidated Newport-area corridor because the replaced PFBC route cards used adjacent official access pairs and the same Newport gauge model."
    },
    "evidenceNotes": [
      {
        "label": "Planner corridor",
        "value": "Greenwood PFBC ramp to Amity Hall PFBC ramp, with intermediate access choices",
        "note": "This route replaces overlapping access-to-access cards with one access-planner corridor.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      },
      {
        "label": "Gauge model",
        "value": "Juniata River at Newport, PA",
        "note": "The consolidated route keeps the same reviewed gauge model used by the replaced route cards.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/01567000/"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC lower Juniata guide",
        "url": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01567000 current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=01567000",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      },
      {
        "label": "USGS 01567000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01567000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "juniata-river-millerstown-amity-hall",
    "slug": "juniata-river-millerstown-amity-hall",
    "name": "Juniata River",
    "reach": "Lower Section: Millerstown Community Park to Amity Hall PFBC",
    "aliases": [
      "Juniata River - Millerstown to Amity Hall",
      "Lower Juniata - Millerstown Community Park to Amity Hall PFBC",
      "Juniata River - Millerstown Community Park access to Amity Hall PFBC ramp"
    ],
    "state": "Pennsylvania",
    "region": "Lower Juniata",
    "summary": "Fifteen-mile lower-Juniata corridor from Millerstown Community Park to the Amity Hall PFBC ramp. The official PFBC lower guide publishes both access coordinates, defines the pair through its river-mile access table, and supports a conservative minimum-only model using the direct Newport gauge.",
    "statusText": "Use the Juniata River at Newport gauge. The official PFBC lower Juniata guide lists Newport among the useful lower-section gauges and recommends at least 3.5 ft there.",
    "latitude": 40.54,
    "longitude": -77.149722,
    "gaugeSource": {
      "id": "usgs-01567000",
      "provider": "usgs",
      "siteId": "01567000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Juniata River at Newport, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01567000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags rapid current falling over a ledge near mile 10.5 plus the lower outcrop-and-ledge zone near miles 5.5 and 5 on this Millerstown-to-Amity corridor.",
        "This is a broad lower-river day where low-water bars, fresh wood after storms, and open-valley headwind can make the route feel longer than the mileage suggests.",
        "Green Valley Campground is a legal support point, but stay disciplined about the intended Amity Hall finish rather than improvising on private banks."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 3.5,
      "thresholdSource": {
        "label": "PFBC lower Juniata guide minimum Newport gauge level",
        "url": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf",
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
      "seasonNotes": "PFBC says low summer conditions can leave broad bars and scratchy lower lines, while recent rain often improves this corridor without needing a full high-water recommendation.",
      "difficulty": "easy",
      "difficultyNotes": "This is an easy lower-river route in the product sense, but the ledge zones near miles 10.5, 5.5, and 5 plus the full-corridor length keep it from being a casual float.",
      "confidenceNotes": "Confidence is good: the PFBC lower Juniata guide publishes exact coordinates for Millerstown and Amity Hall, defines them as a 15-mile access pair, and lists Newport among the useful lower-Juniata gauges with a 3.5 ft minimum. Current direct USGS Water Services returned 1,460 cfs and 3.73 ft at Newport at 2026-07-16 14:15 EDT, inside the official minimum model used for this lower corridor."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Millerstown Community Park to Amity Hall PFBC, about 15 mi",
        "note": "The PFBC lower Juniata guide places Millerstown Community Park at river mile 27 and Amity Hall PFBC at river mile 12.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "The PFBC access table publishes Millerstown Community Park at 40 32 24 / 77 08 59 and Amity Hall PFBC at 40 25 51 / 77 00 48.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 01567000 at Newport",
        "note": "USGS Water Services returned same-day values of 1,460 cfs and 3.73 ft at 2026-07-16 14:15 EDT for Juniata River at Newport, PA.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01567000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official minimum level",
        "value": "Newport 3.5 ft minimum",
        "note": "PFBC lists Newport among the useful gauges for the lower Juniata and recommends a minimum level of 3.5 ft there.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      },
      {
        "label": "Camping context",
        "value": "Green Valley Campground on route",
        "note": "PFBC says Green Valley Campground sits on this corridor near mile 6 and can support a legal overnight split or bailout.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      },
      {
        "label": "Primary cautions",
        "value": "Miles 10.5, 5.5, and 5 caution features",
        "note": "PFBC flags rapid current falling over a ledge near mile 10.5 and the outcrop-and-ledge zone near miles 5.5 and 5 in the lower corridor.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC lower Juniata guide",
        "url": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01567000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01567000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01567000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01567000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "juniata-river-lewistown-narrows-newport",
    "slug": "juniata-river-lewistown-narrows-newport",
    "name": "Juniata River",
    "reach": "Lower Section: Lewistown Narrows PFBC to Newport",
    "aliases": [
      "Juniata River - Lewistown Narrows to Newport",
      "Lower Juniata - Lewistown Narrows ramp to Newport",
      "Juniata River - Lewistown Narrows PFBC to Newport access"
    ],
    "state": "Pennsylvania",
    "region": "Lower Juniata",
    "summary": "Twenty-eight-mile lower-Juniata corridor from the Lewistown Narrows PFBC ramp to the Newport access. The official PFBC lower guide publishes both access coordinates, defines the pair through its river-mile access table, and supports a conservative minimum-only model using the direct Newport gauge.",
    "statusText": "Use the Juniata River at Newport gauge. The official PFBC lower Juniata guide lists it among the useful lower-section gauges and recommends at least 3.5 ft there.",
    "latitude": 40.60404816274022,
    "longitude": -77.47089851431481,
    "gaugeSource": {
      "id": "usgs-01567000",
      "provider": "usgs",
      "siteId": "01567000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Juniata River at Newport, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01567000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags rapid current near mile 33 in the upper half of the route plus rapid current falling over a ledge near mile 10.5 as the river approaches Newport.",
        "This is a genuinely long broad-river day, and fresh wood after storms, open-river headwind, or low-water bars can stretch the plan well beyond the clean mileage.",
        "Use only the named public accesses at Lewistown Narrows and Newport rather than private banks, islands, or roadside pull-offs."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 3.5,
      "thresholdSource": {
        "label": "PFBC lower Juniata guide minimum Newport gauge level used as a downstream same-river proxy",
        "url": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf",
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
      "seasonNotes": "PFBC says low summer conditions can leave broad bars and scratchy lower lines, while recent rain often improves this longer corridor without needing a full high-water recommendation.",
      "difficulty": "easy",
      "difficultyNotes": "This is an easy lower-river route in the product sense, but its length plus the mile-33 current feature and the mile-10.5 ledge keep it from being a casual float.",
      "confidenceNotes": "Confidence is good: the PFBC lower Juniata guide publishes exact coordinates for Lewistown Narrows and Newport, defines them as a 28-mile access pair from river mile 40 to river mile 12, and lists Newport among the useful lower-Juniata gauges with a 3.5 ft minimum. Current direct USGS Water Services returned 1,460 cfs and 3.73 ft at Newport at 2026-07-16 14:15 EDT, which keeps the corridor inside the official minimum model used for this downstream reference."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Lewistown Narrows PFBC to Newport, about 28 mi",
        "note": "The PFBC lower Juniata guide places Lewistown Narrows PFBC at river mile 40 and Newport at river mile 12.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "The PFBC access table publishes Lewistown Narrows PFBC at 40 36 14 / 77 29 16 and Newport at 40 28 45 / 77 07 46.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      },
      {
        "label": "Gauge reference",
        "value": "USGS 01567000 at Newport",
        "note": "USGS Water Services returned same-day values of 1,460 cfs and 3.73 ft at 2026-07-16 14:15 EDT for Juniata River at Newport, PA, used here as the conservative downstream same-river reference.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01567000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official minimum level",
        "value": "Newport 3.5 ft minimum",
        "note": "PFBC lists Newport among the useful gauges for the lower Juniata and recommends a minimum level of 3.5 ft there.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      },
      {
        "label": "Camping context",
        "value": "Mexico and Newport corridor campgrounds",
        "note": "PFBC says Buttonwood Campground and River Rock Campground support the Mexico corridor, while Pittman's Riverside Campground and Little Buffalo Family Campground support the lower Newport half.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      },
      {
        "label": "Primary cautions",
        "value": "Miles 33 and 10.5 caution features",
        "note": "PFBC flags rapid current near mile 33 and rapid current falling over a ledge at mile 10.5 in the lower corridor.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC lower Juniata guide",
        "url": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01567000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01567000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01567000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01567000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "juniata-river-mifflintown-muskrat-springs",
    "slug": "juniata-river-mifflintown-muskrat-springs",
    "name": "Juniata River",
    "reach": "Lower Section: Mifflintown PFBC to Muskrat Springs PFBC",
    "aliases": [
      "Juniata River - Mifflintown to Muskrat Springs",
      "Lower Juniata - Mifflintown to Muskrat Springs PFBC",
      "Juniata River - Mifflintown PFBC to Muskrat Springs PFBC"
    ],
    "state": "Pennsylvania",
    "region": "Lower Juniata",
    "summary": "Ten-mile lower-Juniata float from the Mifflintown PFBC ramp to the Muskrat Springs PFBC ramp. The official PFBC lower guide publishes both access coordinates, defines the pair through its river-mile access table, and supports a conservative minimum-only model using the Lewistown gauge as the upstream same-river lower-section reference.",
    "statusText": "Use the Juniata River at Lewistown gauge as a conservative upstream same-river reference. The official PFBC lower Juniata guide lists Lewistown among the useful gauges for this lower-section corridor and recommends at least 3.1 ft there.",
    "latitude": 40.595,
    "longitude": -77.415278,
    "gaugeSource": {
      "id": "usgs-01564895",
      "provider": "usgs",
      "siteId": "01564895",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Juniata River at Lewistown, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/01564895/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "PFBC flags rapid current near mile 33 inside this Mifflintown-to-Muskrat corridor.",
        "The route stays otherwise beginner-friendly, but fresh wood, broad-river wind, and low-water bars can stretch the day out materially.",
        "Mexico corridor campgrounds are useful legal support, but stay disciplined about the intended Muskrat Springs finish rather than improvising on private banks."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 3.1,
      "thresholdSource": {
        "label": "PFBC lower Juniata guide minimum Lewistown gauge level used as an upstream same-river proxy",
        "url": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf",
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
      "seasonNotes": "PFBC says the lower Juniata often feels best after recent rain, while dry summer periods expose wide cobble bars and slower channels.",
      "difficulty": "easy",
      "difficultyNotes": "This is an easy public-access day when the corridor has enough depth, but the mile-33 rapid-current zone and the proxy-gauge posture justify a conservative read.",
      "confidenceNotes": "Confidence is good: the PFBC lower Juniata guide publishes exact coordinates for Mifflintown and Muskrat Springs and defines them as a 10-mile access pair, while listing Lewistown as a useful lower-Juniata gauge with a 3.1 ft minimum. Current direct USGS Water Services returned 1,200 cfs and 3.55 ft at Lewistown at 2026-07-16 13:30 EDT, but that gauge remains upstream of this route, so the app keeps only a conservative minimum floor."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Mifflintown PFBC to Muskrat Springs PFBC, about 10 mi",
        "note": "The PFBC lower Juniata guide places Mifflintown PFBC at river mile 36 and Muskrat Springs at river mile 26.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "PFBC access-site coordinates",
        "note": "The PFBC access table publishes Mifflintown PFBC at 40 35 42 / 77 24 55 and Muskrat Springs at 40 32 06 / 77 17 58.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      },
      {
        "label": "Proxy gauge support",
        "value": "USGS 01564895 at Lewistown",
        "note": "USGS Water Services returned same-day values of 1,200 cfs and 3.55 ft at 2026-07-16 13:30 EDT for Juniata River at Lewistown, PA. PFBC lists Lewistown as a useful lower-section gauge, but it remains upstream of this route.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01564895&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official minimum level",
        "value": "Lewistown 3.1 ft minimum",
        "note": "PFBC lists Lewistown among the useful gauges for the lower Juniata and recommends a minimum level of 3.1 ft there.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      },
      {
        "label": "Camping context",
        "value": "Buttonwood and River Rock campground corridor",
        "note": "PFBC says Mexico at mile 29 offers dining and camping opportunities, including Buttonwood Campground and River Rock Campground with shoreline river access for overnight paddlers.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "PFBC lower Juniata guide",
        "url": "https://pfbc.pa.gov/watertrails/juniata/juniata_lower/juniata_lower_guide_map.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 01564895 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/01564895/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01564895 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01564895&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "conodoguinet-creek-willow-mill-vincent-difilippo",
    "slug": "conodoguinet-creek-willow-mill-vincent-difilippo",
    "name": "Conodoguinet Creek",
    "reach": "Willow Mill Park to Vincent DiFilippo Nature Preserve",
    "aliases": [
      "Conodoguinet Creek - Willow Mill to Vincent DiFilippo",
      "Conodoguinet Creek - Willow Mill Park to DiFilippo Preserve",
      "Cumberland County Conodoguinet upper-central short day"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Short Cumberland County Conodoguinet day from Willow Mill Park to Vincent DiFilippo Nature Preserve. The county water-trail materials publish both named public launches, official mile markers, and direct Hogestown gauge guidance for when this creek is worth putting on the water.",
    "statusText": "Use the Conodoguinet Creek near Hogestown gauge. Cumberland County says boating should be above 1.7 ft there; the gauge was only 1.52 ft at 2026-07-10 15:30 EDT, so expect dragging and shallow bridge lines rather than a routine green-light day.",
    "latitude": 40.2567096,
    "longitude": -77.0411725,
    "gaugeSource": {
      "id": "usgs-01570000",
      "provider": "usgs",
      "siteId": "01570000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Conodoguinet Creek near Hogestown, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01570000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "The Cumberland County water-trail guide identifies trees as strainers that can trap boats and pin paddlers; check this short reach for fresh wood and bridge-area obstructions before committing.",
        "Check the direct Hogestown gauge before launching. The county recommends boating above 1.7 ft and identifies 6 ft as action stage and 8 ft as flood stage.",
        "Use only the named Willow Mill and Vincent DiFilippo launches and respect private property along the creek; current county materials list both as improved concrete ramps."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 1.7,
      "thresholdSource": {
        "label": "Cumberland County Water Trails Hogestown gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
        9,
        10
      ],
      "seasonNotes": "The county treats this as a warm-season creek route that needs enough depth at Hogestown to avoid scraping. Rain can quickly raise current, debris, and bridge-clearance consequences even when the baseline route is otherwise approachable.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short moving-water creek link with improved public launches, but it still needs a same-day check for wood, dragging, and stronger post-rain current.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still publishes Willow Mill Park and Vincent DiFilippo Nature Preserve as named public Conodoguinet launches with official mile markers of 23.2 and 18.8, which define this 4.4-mile access pair. The same county page still says boating should be above 1.7 ft at the direct Hogestown gauge, while USGS Water Services returned same-day July 10, 2026 values of 219 cfs and 1.52 ft at 2026-07-10 15:30 EDT, below the county floor. Endpoint coordinates are derived from the official access-table street addresses through the U.S. Census geocoder because the current county access table does not publish launch lat/longs."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Willow Mill Park to Vincent DiFilippo Nature Preserve, about 4.4 mi",
        "note": "The current Cumberland County access table places Willow Mill Park at mile 23.2 and Vincent DiFilippo Nature Preserve at mile 18.8 on the Conodoguinet.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024"
      },
      {
        "label": "Public access addresses",
        "value": "80 Willow Mill Park Road to 110 Sample Bridge Road",
        "note": "Cumberland County identifies Willow Mill Park and Vincent DiFilippo Nature Preserve as named public launch sites with those official street addresses. Route coordinates are derived from those exact access addresses using the U.S. Census geocoder.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01570000 at Hogestown",
        "note": "USGS Water Services returned same-day July 10, 2026 values of 219 cfs and 1.52 ft for Conodoguinet Creek near Hogestown at 2026-07-10 15:30 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01570000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official minimum guidance",
        "value": "Boat above 1.7 ft at Hogestown",
        "note": "Cumberland County says recommended stream levels for boating on the Conodoguinet are above 1.7 ft at the Hogestown gauge.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      },
      {
        "label": "High-water context",
        "value": "Action stage 6 ft, flood stage 8 ft",
        "note": "The county safety alert and the USGS station page both identify 6 ft as action stage and 8 ft as flood stage at Hogestown, which supports a conservative no-high-band posture rather than a broad all-level recommendation.",
        "sourceUrl": "https://waterdata.usgs.gov/pa/nwis/uv?site_no=01570000"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Conodoguinet Creek access table update",
        "url": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024",
        "provider": "local"
      },
      {
        "label": "USGS 01570000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01570000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01570000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01570000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "conodoguinet-creek-willow-mill-good-hope",
    "slug": "conodoguinet-creek-willow-mill-good-hope",
    "name": "Conodoguinet Creek",
    "reach": "Willow Mill Park to Good Hope Access",
    "aliases": [
      "Conodoguinet Creek - Willow Mill to Good Hope",
      "Conodoguinet Creek - Willow Mill Park to Good Hope Access",
      "Cumberland County Conodoguinet upper-middle day"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Longer upper-middle Conodoguinet day from Willow Mill Park to the PFBC Good Hope Access. Cumberland County still publishes both named public launches, official mile markers, and the direct Hogestown gauge floor needed to keep this creek scoreable without over-claiming a high-water comfort band.",
    "statusText": "Use the Conodoguinet Creek near Hogestown gauge. Cumberland County says boating should be above 1.7 ft there; the gauge was 1.69 ft at 2026-07-13 15:30 EDT, so expect a scrape-prone day and treat the route as below the county floor.",
    "latitude": 40.2567096,
    "longitude": -77.0411725,
    "gaugeSource": {
      "id": "usgs-01570000",
      "provider": "usgs",
      "siteId": "01570000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Conodoguinet Creek near Hogestown, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01570000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 1.7,
      "thresholdSource": {
        "label": "Cumberland County Water Trails Hogestown gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
        9,
        10
      ],
      "seasonNotes": "This upper-middle Conodoguinet corridor works best in the warm season when the creek stays above the county floor. Thunderstorms can quickly raise current, move wood, and make bridge approaches more consequential on the same day.",
      "difficulty": "moderate",
      "difficultyNotes": "This is still broad-audience moving water, but the 9.6-mile length, shallow-floor posture, and mixed launch character make it more committed than the shorter Conodoguinet split routes.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still lists Willow Mill Park and Good Hope Access as named public Conodoguinet launches at miles 23.2 and 13.6, which defines this 9.6-mile route. The county still says recommended boating is above 1.7 ft at the direct Hogestown gauge, and USGS Water Services returned same-day July 13, 2026 values of 275 cfs and 1.69 ft at 2026-07-13 15:30 EDT. The Good Hope endpoint legitimacy is especially strong because the county table identifies it as a PFBC access requiring the normal launch-permit or registration package. Endpoint coordinates are derived from the official access-table street addresses through the U.S. Census geocoder because the county table does not publish launch lat/longs."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Willow Mill Park to Good Hope Access, about 9.6 mi",
        "note": "The current Cumberland County access table places Willow Mill Park at mile 23.2 and Good Hope Access at mile 13.6 on the Conodoguinet.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024"
      },
      {
        "label": "Public access addresses",
        "value": "80 Willow Mill Park Road to 700 Good Hope Road",
        "note": "Cumberland County identifies both endpoints as named public launches with those official street addresses. Route coordinates are derived from those exact access addresses using the U.S. Census geocoder.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01570000 at Hogestown",
        "note": "USGS Water Services returned same-day July 13, 2026 values of 275 cfs and 1.69 ft for Conodoguinet Creek near Hogestown at 2026-07-13 15:30 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01570000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official minimum guidance",
        "value": "Boat above 1.7 ft at Hogestown",
        "note": "Cumberland County says recommended stream levels for boating on the Conodoguinet are above 1.7 ft at the Hogestown gauge.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      },
      {
        "label": "PFBC endpoint legitimacy",
        "value": "Good Hope Access is a PFBC launch site",
        "note": "The county access table identifies Good Hope as a PFBC-maintained site with a shallow earthen ramp improved by matting and says a PA DCNR launch permit or PFBC use permit is required.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Conodoguinet Creek access table update",
        "url": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024",
        "provider": "local"
      },
      {
        "label": "USGS 01570000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01570000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01570000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01570000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "conodoguinet-creek-vincent-difilippo-good-hope",
    "slug": "conodoguinet-creek-vincent-difilippo-good-hope",
    "name": "Conodoguinet Creek",
    "reach": "Vincent DiFilippo Nature Preserve to Good Hope Access",
    "aliases": [
      "Conodoguinet Creek - DiFilippo to Good Hope",
      "Conodoguinet Creek - Vincent DiFilippo Nature Preserve to Good Hope Access",
      "Cumberland County Conodoguinet mid-creek day"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Mid-creek Cumberland County Conodoguinet day from Vincent DiFilippo Nature Preserve to the PFBC Good Hope Access. The current county access table still defines the pair cleanly, and the same direct Hogestown gauge gives a current depth check for the whole corridor.",
    "statusText": "Use the Conodoguinet Creek near Hogestown gauge. Cumberland County says boating should be above 1.7 ft there; the gauge was only 1.52 ft at 2026-07-10 15:30 EDT, so expect dragging and shallow bridge approaches rather than a routine easy day.",
    "latitude": 40.2576825,
    "longitude": -77.0209403,
    "gaugeSource": {
      "id": "usgs-01570000",
      "provider": "usgs",
      "siteId": "01570000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Conodoguinet Creek near Hogestown, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01570000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "The Cumberland County water-trail guide identifies trees as strainers that can trap boats and pin paddlers; make a same-day obstruction check through bends and bridge approaches.",
        "Check the direct Hogestown gauge before launching. The county recommends boating above 1.7 ft and identifies 6 ft as action stage and 8 ft as flood stage.",
        "Use only the named Vincent DiFilippo and Good Hope launches and respect private property along the creek. Good Hope is a PFBC access that requires the applicable registration or launch permit."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 1.7,
      "thresholdSource": {
        "label": "Cumberland County Water Trails Hogestown gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
        9,
        10
      ],
      "seasonNotes": "This middle Conodoguinet corridor can work through much of the warm season when the creek is above the county low-water floor, but rain raises current and floating wood quickly on the same day.",
      "difficulty": "easy",
      "difficultyNotes": "The route stays in the easier creek-day bucket when Hogestown is above the county floor, but it still needs a real same-day check for wood, shallow bridge approaches, and the PFBC launch conditions at Good Hope.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still lists Vincent DiFilippo Nature Preserve and Good Hope Access as named public launches at miles 18.8 and 13.6, which defines this 5.2-mile route. The county still says recommended boating is above 1.7 ft at the direct Hogestown gauge, and USGS Water Services returned same-day July 10, 2026 values of 219 cfs and 1.52 ft at 2026-07-10 15:30 EDT, below the county floor. The Good Hope endpoint legitimacy is especially strong because the county table identifies it as a PFBC access requiring the normal launch-permit or registration package. Endpoint coordinates are derived from the official access-table street addresses through the U.S. Census geocoder because the county table does not publish launch lat/longs."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Vincent DiFilippo Nature Preserve to Good Hope Access, about 5.2 mi",
        "note": "The current Cumberland County access table places Vincent DiFilippo Nature Preserve at mile 18.8 and Good Hope Access at mile 13.6 on the Conodoguinet.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024"
      },
      {
        "label": "Public access addresses",
        "value": "110 Sample Bridge Road to 700 Good Hope Road",
        "note": "Cumberland County identifies both endpoints as named public launches with those street addresses. Route coordinates are derived from those official access addresses using the U.S. Census geocoder.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01570000 at Hogestown",
        "note": "USGS Water Services returned same-day July 10, 2026 values of 219 cfs and 1.52 ft for Conodoguinet Creek near Hogestown at 2026-07-10 15:30 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01570000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official minimum guidance",
        "value": "Boat above 1.7 ft at Hogestown",
        "note": "Cumberland County says recommended stream levels for boating on the Conodoguinet are above 1.7 ft at the Hogestown gauge.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      },
      {
        "label": "PFBC endpoint legitimacy",
        "value": "Good Hope Access is a PFBC launch site",
        "note": "The county access table identifies Good Hope as a PFBC-maintained site with a shallow earthen ramp improved by matting and says a PA DCNR launch permit or PFBC use permit is required.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Conodoguinet Creek access table update",
        "url": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024",
        "provider": "local"
      },
      {
        "label": "USGS 01570000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01570000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01570000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01570000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "conodoguinet-creek-vincent-difilippo-acri-meadow",
    "slug": "conodoguinet-creek-vincent-difilippo-acri-meadow",
    "name": "Conodoguinet Creek",
    "reach": "Vincent DiFilippo Nature Preserve to Acri Meadow Park",
    "aliases": [
      "Conodoguinet Creek - DiFilippo to Acri Meadow",
      "Conodoguinet Creek - Vincent DiFilippo Nature Preserve to Acri Meadow Park",
      "Cumberland County Conodoguinet middle-to-lower day"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Long middle-to-lower Conodoguinet day from Vincent DiFilippo Nature Preserve to Acri Meadow Park. Cumberland County still publishes both named public launches, official mile markers, and the same direct Hogestown gauge floor for deciding whether this creek has enough depth to justify a longer day.",
    "statusText": "Use the Conodoguinet Creek near Hogestown gauge. Cumberland County says boating should be above 1.7 ft there; the gauge was 1.69 ft at 2026-07-13 15:30 EDT, so expect a slow scrape-prone run and treat the route as below the county floor.",
    "latitude": 40.2576825,
    "longitude": -77.0209403,
    "gaugeSource": {
      "id": "usgs-01570000",
      "provider": "usgs",
      "siteId": "01570000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Conodoguinet Creek near Hogestown, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01570000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 1.7,
      "thresholdSource": {
        "label": "Cumberland County Water Trails Hogestown gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
        9,
        10
      ],
      "seasonNotes": "This longer middle-to-lower corridor depends on enough depth at Hogestown to avoid repeated dragging. Rain can quickly add current, muddy banks, and bridge-area consequences on the same day.",
      "difficulty": "moderate",
      "difficultyNotes": "The route stays in the easier moving-water category when conditions are right, but the 13-mile length and shallow-floor posture make it a committed day rather than a casual park float.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still lists Vincent DiFilippo Nature Preserve and Acri Meadow Park as named public Conodoguinet launches at miles 18.8 and 5.8, which defines this 13-mile route. The county still says recommended boating is above 1.7 ft at the direct Hogestown gauge, and USGS Water Services returned same-day July 13, 2026 values of 275 cfs and 1.69 ft at 2026-07-13 15:30 EDT. The route intentionally stays minimum-only because the county publishes a launch recommendation floor plus action and flood stages, not a route-specific ideal band. Endpoint coordinates are derived from the official access-table street addresses through the U.S. Census geocoder because the county table does not publish launch lat/longs."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Vincent DiFilippo Nature Preserve to Acri Meadow Park, about 13 mi",
        "note": "The current Cumberland County access table places Vincent DiFilippo Nature Preserve at mile 18.8 and Acri Meadow Park at mile 5.8 on the Conodoguinet.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024"
      },
      {
        "label": "Public access addresses",
        "value": "110 Sample Bridge Road to 55 Acri Meadow Drive",
        "note": "Cumberland County identifies both endpoints as named public launches with those official street addresses. Route coordinates are derived from those exact access addresses using the U.S. Census geocoder.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01570000 at Hogestown",
        "note": "USGS Water Services returned same-day July 13, 2026 values of 275 cfs and 1.69 ft for Conodoguinet Creek near Hogestown at 2026-07-13 15:30 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01570000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official minimum guidance",
        "value": "Boat above 1.7 ft at Hogestown",
        "note": "Cumberland County says recommended stream levels for boating on the Conodoguinet are above 1.7 ft at the Hogestown gauge.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      },
      {
        "label": "High-water context",
        "value": "Action stage 6 ft, flood stage 8 ft",
        "note": "The county safety alert and the USGS station page identify 6 ft as action stage and 8 ft as flood stage at Hogestown, supporting a conservative minimum-only scoring posture rather than an expansive upper band.",
        "sourceUrl": "https://waterdata.usgs.gov/pa/nwis/uv?site_no=01570000"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Conodoguinet Creek access table update",
        "url": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024",
        "provider": "local"
      },
      {
        "label": "USGS 01570000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01570000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01570000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01570000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "conodoguinet-creek-good-hope-acri-meadow",
    "slug": "conodoguinet-creek-good-hope-acri-meadow",
    "name": "Conodoguinet Creek",
    "reach": "Good Hope Access to Acri Meadow Park",
    "aliases": [
      "Conodoguinet Creek - Good Hope to Acri Meadow",
      "Conodoguinet Creek - Good Hope Access to Acri Meadow Park",
      "Cumberland County Conodoguinet lower-central day"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Longer lower-central Conodoguinet day from the PFBC Good Hope Access to Acri Meadow Park. Cumberland County still publishes both launches, the official mile spacing, and the same direct Hogestown gauge recommendation that keeps the route scoreable without over-claiming a high-water comfort band.",
    "statusText": "Use the Conodoguinet Creek near Hogestown gauge. Cumberland County says boating should be above 1.7 ft there; the gauge was only 1.52 ft at 2026-07-10 15:30 EDT, so expect scraping, slower travel, and a more conditional lower-creek day.",
    "latitude": 40.2546304,
    "longitude": -76.9753045,
    "gaugeSource": {
      "id": "usgs-01570000",
      "provider": "usgs",
      "siteId": "01570000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Conodoguinet Creek near Hogestown, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01570000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "The Cumberland County water-trail guide identifies trees as strainers that can trap boats and pin paddlers; inspect fresh wood, bridge approaches, and the longer downstream corridor before committing.",
        "Check the direct Hogestown gauge before launching. The county recommends boating above 1.7 ft and identifies 6 ft as action stage and 8 ft as flood stage.",
        "Use only the named Good Hope and Acri Meadow launches and respect private property along the creek. Good Hope requires the applicable PFBC permit or registration, and Acri Meadow has an unimproved launch with a short steep slope."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 1.7,
      "thresholdSource": {
        "label": "Cumberland County Water Trails Hogestown gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
        9,
        10
      ],
      "seasonNotes": "The lower-central creek stays usable in the warm season when depth clears the county floor, but rain raises current and bridge-area consequences quickly while broad urban-edge banks stay muddy after floods.",
      "difficulty": "easy",
      "difficultyNotes": "This is a straightforward creek day when Hogestown is above the minimum, but the 7.8-mile length, mixed launch quality, and bridge/wood scouting still make it more committed than a park pond outing.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still lists Good Hope Access and Acri Meadow Park as named public launches at miles 13.6 and 5.8, which defines this 7.8-mile lower-central route. The county still says recommended boating is above 1.7 ft at the direct Hogestown gauge, and USGS Water Services returned same-day July 10, 2026 values of 219 cfs and 1.52 ft at 2026-07-10 15:30 EDT, below the county floor. The route intentionally stays minimum-only because the county publishes a launch recommendation floor plus action and flood stages, not a route-specific ideal high band. Endpoint coordinates are derived from the official access-table street addresses through the U.S. Census geocoder because the county table does not publish launch lat/longs."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Good Hope Access to Acri Meadow Park, about 7.8 mi",
        "note": "The current Cumberland County access table places Good Hope Access at mile 13.6 and Acri Meadow Park at mile 5.8 on the Conodoguinet.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024"
      },
      {
        "label": "Public access addresses",
        "value": "700 Good Hope Road to 55 Acri Meadow Drive",
        "note": "Cumberland County identifies both endpoints as named public launches with those street addresses. Route coordinates are derived from those official access addresses using the U.S. Census geocoder.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01570000 at Hogestown",
        "note": "USGS Water Services returned same-day July 10, 2026 values of 219 cfs and 1.52 ft for Conodoguinet Creek near Hogestown at 2026-07-10 15:30 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01570000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official minimum guidance",
        "value": "Boat above 1.7 ft at Hogestown",
        "note": "Cumberland County says recommended stream levels for boating on the Conodoguinet are above 1.7 ft at the Hogestown gauge.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      },
      {
        "label": "High-water context",
        "value": "Action stage 6 ft, flood stage 8 ft",
        "note": "The county safety alert and the USGS station page identify 6 ft as action stage and 8 ft as flood stage at Hogestown, supporting a conservative minimum-only scoring posture rather than an expansive upper band.",
        "sourceUrl": "https://waterdata.usgs.gov/pa/nwis/uv?site_no=01570000"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Conodoguinet Creek access table update",
        "url": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024",
        "provider": "local"
      },
      {
        "label": "USGS 01570000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01570000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01570000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01570000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "PFBC launch permit vs boat registration",
        "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "conodoguinet-creek-willow-mill-acri-meadow",
    "slug": "conodoguinet-creek-willow-mill-acri-meadow",
    "name": "Conodoguinet Creek",
    "reach": "Willow Mill Park to Acri Meadow Park",
    "aliases": [
      "Conodoguinet Creek - Willow Mill to Acri Meadow",
      "Conodoguinet Creek - Willow Mill Park to Acri Meadow Park",
      "Cumberland County Conodoguinet central full day"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Full central Conodoguinet day from Willow Mill Park to Acri Meadow Park. Cumberland County still publishes both named public launches, official mile markers, and the direct Hogestown gauge floor, which is enough to score this longer creek card conservatively without pretending the county has a polished ideal high band.",
    "statusText": "Use the Conodoguinet Creek near Hogestown gauge. Cumberland County says boating should be above 1.7 ft there; the gauge was only 1.71 ft at 2026-07-06 19:30 EDT, so this 17.4-mile route should be treated as a marginal low-water day rather than a casual green-light recommendation.",
    "latitude": 40.2567096,
    "longitude": -77.0411725,
    "gaugeSource": {
      "id": "usgs-01570000",
      "provider": "usgs",
      "siteId": "01570000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Conodoguinet Creek near Hogestown, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01570000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 1.7,
      "thresholdSource": {
        "label": "Cumberland County Water Trails Hogestown gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
        9,
        10
      ],
      "seasonNotes": "The central creek can work in the warm season when the county floor is met, but this longer route amplifies same-day consequences from thunderstorms, bridge current, and debris shifts.",
      "difficulty": "moderate",
      "difficultyNotes": "This remains broad-audience moving water, but the 17.4-mile length, scrape-prone floor, and longer shuttle make it a serious full-day creek plan rather than a casual outing.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still lists Willow Mill Park and Acri Meadow Park as named public Conodoguinet launches at miles 23.2 and 5.8, which defines this 17.4-mile route. The county still says recommended boating is above 1.7 ft at the direct Hogestown gauge, and USGS Water Services returned same-day July 6, 2026 values of 282 cfs and 1.71 ft at 2026-07-06 19:30 EDT. The route intentionally stays minimum-only because the county publishes a launch recommendation floor plus action and flood stages, not a route-specific ideal band. Endpoint coordinates are derived from the official access-table street addresses through the U.S. Census geocoder because the county table does not publish launch lat/longs."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Willow Mill Park to Acri Meadow Park, about 17.4 mi",
        "note": "The current Cumberland County access table places Willow Mill Park at mile 23.2 and Acri Meadow Park at mile 5.8 on the Conodoguinet.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024"
      },
      {
        "label": "Public access addresses",
        "value": "80 Willow Mill Park Road to 55 Acri Meadow Drive",
        "note": "Cumberland County identifies both endpoints as named public launches with those official street addresses. Route coordinates are derived from those exact access addresses using the U.S. Census geocoder.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 01570000 at Hogestown",
        "note": "USGS Water Services returned same-day July 6, 2026 values of 282 cfs and 1.71 ft for Conodoguinet Creek near Hogestown at 2026-07-06 19:30 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01570000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official minimum guidance",
        "value": "Boat above 1.7 ft at Hogestown",
        "note": "Cumberland County says recommended stream levels for boating on the Conodoguinet are above 1.7 ft at the Hogestown gauge.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      },
      {
        "label": "High-water context",
        "value": "Action stage 6 ft, flood stage 8 ft",
        "note": "The county safety alert and the USGS station page identify 6 ft as action stage and 8 ft as flood stage at Hogestown, supporting a conservative minimum-only scoring posture rather than a broad all-level recommendation.",
        "sourceUrl": "https://waterdata.usgs.gov/pa/nwis/uv?site_no=01570000"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Conodoguinet Creek access table update",
        "url": "https://www.cumberlandcountypa.gov/DocumentCenter/View/49065/CCWT-Guide-with-Updated-Table-2024",
        "provider": "local"
      },
      {
        "label": "USGS 01570000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01570000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01570000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01570000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "yellow-breeches-creek-simpson-park-lower-allen-community-park",
    "slug": "yellow-breeches-creek-simpson-park-lower-allen-community-park",
    "name": "Yellow Breeches Creek",
    "reach": "Simpson Park to Lower Allen Community Park",
    "aliases": [
      "Yellow Breeches Creek - Simpson Park to Lower Allen Community Park",
      "Yellow Breeches Creek - Bowmansdale to Lower Allen",
      "Yellow Breeches Creek middle township segment"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Middle Yellow Breeches township-to-township day from Simpson Park to Lower Allen Community Park. Cumberland County still publishes both named public launches and the Camp Hill gauge guidance, which is enough to ship this short creek route with conservative low-water and downstream-blockage messaging.",
    "statusText": "Use the Yellow Breeches Creek near Camp Hill gauge as an official same-creek proxy. Cumberland County recommends boating at about 1.4 to 2.0 ft there; the gauge was 1.38 ft at 2026-07-10 08:13 EDT, so expect scraping and slower lines rather than a clean beginner green-light.",
    "latitude": 40.164151,
    "longitude": -76.976192,
    "gaugeSource": {
      "id": "usgs-01571500",
      "provider": "usgs",
      "siteId": "01571500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Yellow Breeches Creek near Camp Hill, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Cumberland County says Yellow Breeches conditions can change quickly and that paddlers should check the Camp Hill gauge before every outing.",
        "The county currently warns of a complete blockage upstream of B7 / Slate Hill Road and recommends taking out at B6 instead; do not assume a safe continuation below these upstream segments.",
        "Stay with named public launches and respect private-bank limits along the creek corridor."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.4,
      "idealMax": 2,
      "tooLow": 1.4,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "Cumberland County Yellow Breeches Camp Hill gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
      "seasonNotes": "Spring through early fall is the clearest fit, but summer thunderstorms can raise this small creek quickly and low summer water can turn even a short route into a scrape-and-drag day.",
      "difficulty": "easy",
      "difficultyNotes": "This is easy moving water in ordinary conditions, but the route still needs same-day judgment when the proxy gauge is low, wood has shifted, or storms have pushed current above the usual township-float feel.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still publishes Simpson Park and Lower Allen Community Park as named public Yellow Breeches launches, and the county story map still gives exact endpoint coordinates plus the 1.1-mile Simpson-to-McCormick and 3.6-mile McCormick-to-Lower-Allen legs that define this 4.7-mile route. The county still recommends boating at 1.4 to 2.0 ft on the Camp Hill gauge, and same-day USGS Water Services returned 175 cfs and 1.38 ft at 2026-07-10 08:13 EDT for USGS 01571500. The gauge is a downstream official same-creek proxy rather than an exact on-route station, so the route copy stays conservative and keeps the current downstream B7 blockage visible."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Simpson Park to Lower Allen Community Park, about 4.7 mi",
        "note": "The county story map lists Simpson Park to McCormick Park as 1.1 miles and McCormick Park to Lower Allen Community Park as 3.6 miles.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "40.164151, -76.976192 to 40.172373, -76.913787",
        "note": "Cumberland County still publishes Simpson Park and Lower Allen Community Park as official Yellow Breeches access points with those coordinates.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Official same-creek proxy gauge",
        "value": "USGS 01571500 at Camp Hill",
        "note": "USGS Water Services returned same-day 2026-07-10 values of 175 cfs and 1.38 ft for Yellow Breeches Creek near Camp Hill at 08:13 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official level guidance",
        "value": "Recommended 1.4 to 2.0 ft; action stage 6 ft; flood stage 7 ft",
        "note": "Cumberland County says the Camp Hill gauge should read between 1.4 and 2.0 feet for boating, with action stage at 6 feet and flood stage at 7 feet.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      },
      {
        "label": "Current downstream advisory",
        "value": "Complete blockage upstream of B7; county recommends taking out at B6",
        "note": "The county water-trails page currently warns of a large fallen tree and logjam upstream of Slate Hill Road and specifically recommends B6 Yellow Breeches Park to avoid the hazard.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Yellow Breeches story map",
        "url": "https://gis.ccpa.net/storymaps/yellowbreeches/",
        "provider": "local"
      },
      {
        "label": "PFBC Water Trail Guides and Maps",
        "url": "https://pfbc.pa.gov/WaterTrail.htm",
        "provider": "local"
      },
      {
        "label": "USGS 01571500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01571500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "yellow-breeches-creek-mccormick-park-liberty-forge",
    "slug": "yellow-breeches-creek-mccormick-park-liberty-forge",
    "name": "Yellow Breeches Creek",
    "reach": "McCormick Park to Liberty Forge",
    "aliases": [
      "Yellow Breeches Creek - McCormick Park to Liberty Forge",
      "Yellow Breeches Creek - Mechanicsburg to Old Forge Road",
      "Yellow Breeches Creek middle bridge-access segment"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Short Yellow Breeches middle segment from McCormick Park to the public Liberty Forge bridge access. Cumberland County still documents the access pair, the bridge-side public-use terms at Liberty Forge, and the same Camp Hill gauge guidance used for the whole trail.",
    "statusText": "Use the Yellow Breeches Creek near Camp Hill gauge as an official same-creek proxy. Cumberland County recommends boating at about 1.4 to 2.0 ft there; the gauge was 1.38 ft at 2026-07-10 08:13 EDT, so expect scrape-prone shallows and slower pool-to-riffle progress.",
    "latitude": 40.165436,
    "longitude": -76.95508,
    "gaugeSource": {
      "id": "usgs-01571500",
      "provider": "usgs",
      "siteId": "01571500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Yellow Breeches Creek near Camp Hill, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Cumberland County classifies Yellow Breeches as Class I-II moving water and says flow conditions can change rapidly.",
        "Liberty Forge is a public boating access only at the Old Forge Road bridge area; follow posted access rules and do not treat the golf-resort grounds as an unrestricted take-out zone.",
        "The county currently warns of a full blockage near B7 farther downstream, so keep this route as a self-contained middle segment rather than assuming a safe continuation."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.4,
      "idealMax": 2,
      "tooLow": 1.4,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "Cumberland County Yellow Breeches Camp Hill gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
      "seasonNotes": "Warm-season windows are the easiest fit, but the creek is quick to rise after thunderstorms and quick to get scratchy when the Camp Hill proxy falls below the county floor.",
      "difficulty": "easy",
      "difficultyNotes": "The route is short and approachable at normal summer levels, but low water, fresh wood, or a sloppy Liberty Forge finish can make it feel less casual than the mileage suggests.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still publishes McCormick Park and Liberty Forge as named public Yellow Breeches access points, and the county story map still gives exact endpoint coordinates plus the 3.6-mile McCormick-to-Lower-Allen and 0.5-mile Lower-Allen-to-Liberty legs that define this 4.1-mile route. The story map also still says the public may access the creek for boating at the Old Forge Road bridge at Liberty Forge while following posted rules. The county still recommends boating at 1.4 to 2.0 ft on the Camp Hill gauge, and same-day USGS Water Services returned 175 cfs and 1.38 ft at 2026-07-10 08:13 EDT for USGS 01571500."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "McCormick Park to Liberty Forge, about 4.1 mi",
        "note": "The county story map lists McCormick Park to Lower Allen Community Park as 3.6 miles and Lower Allen Community Park to Liberty Forge as 0.5 miles.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "40.165436, -76.955080 to 40.177495, -76.924172",
        "note": "Cumberland County still publishes McCormick Park and Liberty Forge as official Yellow Breeches access points with those coordinates.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public-use access terms",
        "value": "Bridge-side boating access at Liberty Forge",
        "note": "The county story map says the public may access the creek for boating at the bridge at Old Forge Road, with parking at the miniature-golf area and posted access rules controlling use.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Official same-creek proxy gauge",
        "value": "USGS 01571500 at Camp Hill",
        "note": "USGS Water Services returned same-day 2026-07-10 values of 175 cfs and 1.38 ft for Yellow Breeches Creek near Camp Hill at 08:13 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official level guidance",
        "value": "Recommended 1.4 to 2.0 ft; action stage 6 ft; flood stage 7 ft",
        "note": "Cumberland County says the Camp Hill gauge should read between 1.4 and 2.0 feet for boating, with action stage at 6 feet and flood stage at 7 feet.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Yellow Breeches story map",
        "url": "https://gis.ccpa.net/storymaps/yellowbreeches/",
        "provider": "local"
      },
      {
        "label": "PFBC Water Trail Guides and Maps",
        "url": "https://pfbc.pa.gov/WaterTrail.htm",
        "provider": "local"
      },
      {
        "label": "USGS 01571500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01571500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "yellow-breeches-creek-lower-allen-community-park-liberty-forge",
    "slug": "yellow-breeches-creek-lower-allen-community-park-liberty-forge",
    "name": "Yellow Breeches Creek",
    "reach": "Lower Allen Community Park to Liberty Forge",
    "aliases": [
      "Yellow Breeches Creek - Lower Allen Community Park to Liberty Forge",
      "Yellow Breeches Creek - Lower Allen to Old Forge Road",
      "Yellow Breeches Creek short Lower Allen bridge-access connector"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Very short Yellow Breeches connector from the campground-supported Lower Allen launch to the public Liberty Forge bridge access. Cumberland County still documents the access pair, the bridge-side public-use terms at Liberty Forge, and the same Camp Hill gauge guidance used for the whole trail.",
    "statusText": "Use the Yellow Breeches Creek near Camp Hill gauge as an official same-creek proxy. Cumberland County recommends boating at about 1.4 to 2.0 ft there; the gauge was 1.12 ft at 2026-07-14 00:45 EDT, so expect a scrape-prone low-water connector rather than a broad green-light.",
    "latitude": 40.172373,
    "longitude": -76.913787,
    "gaugeSource": {
      "id": "usgs-01571500",
      "provider": "usgs",
      "siteId": "01571500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Yellow Breeches Creek near Camp Hill, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Cumberland County classifies Yellow Breeches as Class I-II moving water and says flow conditions can change rapidly.",
        "Liberty Forge is a public boating access only at the Old Forge Road bridge area; follow posted access rules and do not treat the golf-resort grounds as an unrestricted take-out zone.",
        "The county currently warns of a full blockage near B7 farther downstream, so keep this route as a self-contained Lower Allen connector rather than assuming a safe continuation."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.4,
      "idealMax": 2,
      "tooLow": 1.4,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "Cumberland County Yellow Breeches Camp Hill gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
      "seasonNotes": "Short warm-season floats are the natural fit, but this creek can rise fast after storms and still get annoyingly shallow when the Camp Hill proxy slips below the county recommendation.",
      "difficulty": "easy",
      "difficultyNotes": "The route is very short and normally easy, but low water, fresh wood, and the bridge-side public finish can still make it feel less casual than the mileage suggests.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still publishes Lower Allen Community Park and Liberty Forge as named public Yellow Breeches access points, and the county story map still gives exact endpoint coordinates for the short Lower-Allen-to-Liberty bridge-access leg that defines this route. The story map also still says the public may access the creek for boating at the bridge at Old Forge Road while following posted rules. Paddle Today carries the leg as about 0.8 miles so the mapped route stays longer than the straight-line endpoint geometry. The county still recommends boating at 1.4 to 2.0 ft on the Camp Hill gauge, and same-day USGS Water Services returned 120 cfs and 1.12 ft at 2026-07-14 00:45 EDT for USGS 01571500."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Lower Allen Community Park to Liberty Forge, about 0.8 mi",
        "note": "Cumberland County still publishes the Lower Allen Community Park and Liberty Forge endpoints on the story map, and the mapped bridge-access leg is carried here as about 0.8 miles so the route remains consistent with the published endpoint geometry.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "40.172373, -76.913787 to 40.177495, -76.924172",
        "note": "Cumberland County still publishes Lower Allen Community Park and Liberty Forge as official Yellow Breeches access points with those coordinates.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public-use access terms",
        "value": "Bridge-side boating access at Liberty Forge",
        "note": "The county story map says the public may access the creek for boating at the bridge at Old Forge Road, with parking at the miniature-golf area and posted access rules controlling use.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Official same-creek proxy gauge",
        "value": "USGS 01571500 at Camp Hill",
        "note": "USGS Water Services returned same-day 2026-07-14 values of 120 cfs and 1.12 ft for Yellow Breeches Creek near Camp Hill at 00:45 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official level guidance",
        "value": "Recommended 1.4 to 2.0 ft; action stage 6 ft; flood stage 7 ft",
        "note": "Cumberland County says the Camp Hill gauge should read between 1.4 and 2.0 feet for boating, with action stage at 6 feet and flood stage at 7 feet.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Yellow Breeches story map",
        "url": "https://gis.ccpa.net/storymaps/yellowbreeches/",
        "provider": "local"
      },
      {
        "label": "PFBC Water Trail Guides and Maps",
        "url": "https://pfbc.pa.gov/WaterTrail.htm",
        "provider": "local"
      },
      {
        "label": "USGS 01571500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01571500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "yellow-breeches-creek-lower-allen-community-park-yellow-breeches-park",
    "slug": "yellow-breeches-creek-lower-allen-community-park-yellow-breeches-park",
    "name": "Yellow Breeches Creek",
    "reach": "Lower Allen Community Park to Yellow Breeches Park",
    "aliases": [
      "Yellow Breeches Creek - Lower Allen Community Park to Yellow Breeches Park",
      "Yellow Breeches Creek - Lower Allen to Sheepford Road",
      "Yellow Breeches Creek lower middle segment"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Lower-middle Yellow Breeches segment from the campground-supported Lower Allen launch to Yellow Breeches Park. This route intentionally stops above the currently flagged B7 blockage and dam-portage area instead of pretending the downstream continuation is routine.",
    "statusText": "Use the Yellow Breeches Creek near Camp Hill gauge as an official same-creek proxy. Cumberland County recommends boating at about 1.4 to 2.0 ft there; the gauge was 1.38 ft at 2026-07-10 08:13 EDT, so treat this as a scrape-prone low-water day, not a broad green-light.",
    "latitude": 40.172373,
    "longitude": -76.913787,
    "gaugeSource": {
      "id": "usgs-01571500",
      "provider": "usgs",
      "siteId": "01571500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Yellow Breeches Creek near Camp Hill, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "The county currently warns of a complete blockage just upstream of B7 / Slate Hill Road and recommends B6 Yellow Breeches Park to avoid the hazard, which is why this route ends at B6.",
        "Do not treat the B7 dam portage area as an automatic continuation. The downstream problem is a current posted hazard, not just a generic caution.",
        "Stay with named public launches and avoid private-bank pull-offs if wood, mud, or low water make the short route less pleasant than expected."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.4,
      "idealMax": 2,
      "tooLow": 1.4,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "Cumberland County Yellow Breeches Camp Hill gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
      "seasonNotes": "Short warm-season floats are the natural fit, but this creek can rise fast after storms and still get annoyingly shallow when the Camp Hill proxy slips below the county recommendation.",
      "difficulty": "easy",
      "difficultyNotes": "The route is short and normally easy, but the low-water scrape potential and the need to finish before the posted downstream blockage keep it from being a mindless drift.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still publishes Lower Allen Community Park and Yellow Breeches Park as named public access points, and the county story map still gives exact endpoint coordinates plus the 0.5-mile Lower-Allen-to-Liberty and 1.9-mile Liberty-to-Yellow-Breeches legs that define this 2.4-mile route. The county still recommends boating at 1.4 to 2.0 ft on the Camp Hill gauge, same-day USGS Water Services returned 175 cfs and 1.38 ft at 2026-07-10 08:13 EDT for USGS 01571500, and the current county advisory explicitly recommends B6 as the safer downstream finish because of the blockage above B7."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Lower Allen Community Park to Yellow Breeches Park, about 2.4 mi",
        "note": "The county story map lists Lower Allen Community Park to Liberty Forge as 0.5 miles and Liberty Forge to Yellow Breeches Park as 1.9 miles.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "40.172373, -76.913787 to 40.183811, -76.912682",
        "note": "Cumberland County still publishes Lower Allen Community Park and Yellow Breeches Park as official Yellow Breeches access points with those coordinates.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Official same-creek proxy gauge",
        "value": "USGS 01571500 at Camp Hill",
        "note": "USGS Water Services returned same-day 2026-07-10 values of 175 cfs and 1.38 ft for Yellow Breeches Creek near Camp Hill at 08:13 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official level guidance",
        "value": "Recommended 1.4 to 2.0 ft; action stage 6 ft; flood stage 7 ft",
        "note": "Cumberland County says the Camp Hill gauge should read between 1.4 and 2.0 feet for boating, with action stage at 6 feet and flood stage at 7 feet.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      },
      {
        "label": "Current finish rationale",
        "value": "County recommends B6 instead of continuing toward B7",
        "note": "The county page currently warns that a large fallen tree and logjam completely block the creek upstream of the Slate Hill Road take-out and specifically recommends taking out at B6 Yellow Breeches Park to avoid the hazard.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Yellow Breeches story map",
        "url": "https://gis.ccpa.net/storymaps/yellowbreeches/",
        "provider": "local"
      },
      {
        "label": "PFBC Water Trail Guides and Maps",
        "url": "https://pfbc.pa.gov/WaterTrail.htm",
        "provider": "local"
      },
      {
        "label": "USGS 01571500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01571500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "yellow-breeches-creek-simpson-park-liberty-forge",
    "slug": "yellow-breeches-creek-simpson-park-liberty-forge",
    "name": "Yellow Breeches Creek",
    "reach": "Simpson Park to Liberty Forge",
    "aliases": [
      "Yellow Breeches Creek - Simpson Park to Liberty Forge",
      "Yellow Breeches Creek - Bowmansdale to Old Forge Road",
      "Yellow Breeches Creek upper-middle continuation"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Longer upper-middle Yellow Breeches day from Simpson Park to the public Liberty Forge bridge access. Cumberland County still documents the full access chain, the bridge-side public-use terms at Liberty Forge, and the Camp Hill gauge guidance used for the whole trail.",
    "statusText": "Use the Yellow Breeches Creek near Camp Hill gauge as an official same-creek proxy. Cumberland County recommends boating at about 1.4 to 2.0 ft there; the gauge was 1.26 ft at 2026-07-10 23:45 EDT, so expect frequent scraping and slower pool-to-riffle progress rather than a smooth beginner green-light.",
    "latitude": 40.164151,
    "longitude": -76.976192,
    "gaugeSource": {
      "id": "usgs-01571500",
      "provider": "usgs",
      "siteId": "01571500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Yellow Breeches Creek near Camp Hill, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Cumberland County says Yellow Breeches conditions can change quickly and that paddlers should check the Camp Hill gauge before every outing.",
        "Liberty Forge is a public boating access only at the Old Forge Road bridge area; follow posted access rules and do not treat the golf-resort grounds as an unrestricted take-out zone.",
        "The county currently warns of a full blockage near B7 farther downstream, so do not assume a safe continuation beyond the intended bridge-side finish."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.4,
      "idealMax": 2,
      "tooLow": 1.4,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "Cumberland County Yellow Breeches Camp Hill gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
      "seasonNotes": "Spring through early fall is the clearest fit, but summer thunderstorms can raise this small creek quickly and low summer water can turn even a moderate day into a scrape-and-drag outing.",
      "difficulty": "easy",
      "difficultyNotes": "This is easy moving water in ordinary conditions, but the longer distance, shallow low-water bends, bridge-side finish, and limited legal bailout options make it more serious than the shortest township segments.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still publishes Simpson Park and Liberty Forge as named public Yellow Breeches access points, and the county story map still gives exact endpoint coordinates plus the 1.1-mile Simpson-to-McCormick, 3.6-mile McCormick-to-Lower-Allen, and 0.5-mile Lower-Allen-to-Liberty legs that define this 5.2-mile route. The story map also still says the public may access the creek for boating at the Old Forge Road bridge at Liberty Forge while following posted rules. The county still recommends boating at 1.4 to 2.0 ft on the Camp Hill gauge, and same-day USGS Water Services returned 149 cfs and 1.26 ft at 2026-07-10 23:45 EDT for USGS 01571500."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Simpson Park to Liberty Forge, about 5.2 mi",
        "note": "The county story map lists Simpson Park to McCormick Park as 1.1 miles, McCormick Park to Lower Allen Community Park as 3.6 miles, and Lower Allen Community Park to Liberty Forge as 0.5 miles.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "40.164151, -76.976192 to 40.177495, -76.924172",
        "note": "Cumberland County still publishes Simpson Park and Liberty Forge as official Yellow Breeches access points with those coordinates.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public-use access terms",
        "value": "Bridge-side boating access at Liberty Forge",
        "note": "The county story map says the public may access the creek for boating at the bridge at Old Forge Road, with parking at the miniature-golf area and posted access rules controlling use.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Official same-creek proxy gauge",
        "value": "USGS 01571500 at 149 cfs / 1.26 ft",
        "note": "USGS Water Services returned same-day 2026-07-10 values of 149 cfs and 1.26 ft for Yellow Breeches Creek near Camp Hill at 23:45 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official level guidance",
        "value": "Recommended 1.4 to 2.0 ft; action stage 6 ft; flood stage 7 ft",
        "note": "Cumberland County says the Camp Hill gauge should read between 1.4 and 2.0 feet for boating, with action stage at 6 feet and flood stage at 7 feet.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Yellow Breeches story map",
        "url": "https://gis.ccpa.net/storymaps/yellowbreeches/",
        "provider": "local"
      },
      {
        "label": "PFBC Water Trail Guides and Maps",
        "url": "https://pfbc.pa.gov/WaterTrail.htm",
        "provider": "local"
      },
      {
        "label": "USGS 01571500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01571500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "yellow-breeches-creek-simpson-park-yellow-breeches-park",
    "slug": "yellow-breeches-creek-simpson-park-yellow-breeches-park",
    "name": "Yellow Breeches Creek",
    "reach": "Simpson Park to Yellow Breeches Park",
    "aliases": [
      "Yellow Breeches Creek - Simpson Park to Yellow Breeches Park",
      "Yellow Breeches Creek - Bowmansdale to Sheepford Road",
      "Yellow Breeches Creek long B6 continuation"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Longest currently shippable Yellow Breeches public day from Simpson Park to Yellow Breeches Park. Cumberland County still documents the full access chain, the Camp Hill gauge guidance, and the current B6 finish that stays above the posted B7 blockage.",
    "statusText": "Use the Yellow Breeches Creek near Camp Hill gauge as an official same-creek proxy. Cumberland County recommends boating at about 1.4 to 2.0 ft there; the gauge was 1.26 ft at 2026-07-10 23:45 EDT, so treat this as a scrape-prone low-water outing rather than a broad green-light.",
    "latitude": 40.164151,
    "longitude": -76.976192,
    "gaugeSource": {
      "id": "usgs-01571500",
      "provider": "usgs",
      "siteId": "01571500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Yellow Breeches Creek near Camp Hill, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Cumberland County says Yellow Breeches conditions can change quickly and that paddlers should check the Camp Hill gauge before every outing.",
        "The county currently warns of a complete blockage just upstream of B7 / Slate Hill Road and recommends taking out at B6 Yellow Breeches Park instead, which is why this route stops there.",
        "Stay with named public launches and do not treat the B7 dam-portage area or private banks downstream as a routine continuation."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.4,
      "idealMax": 2,
      "tooLow": 1.4,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "Cumberland County Yellow Breeches Camp Hill gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
      "seasonNotes": "Spring through early fall is the clearest fit, but summer thunderstorms can raise this small creek quickly and low summer water can turn a longer route into a scratchy, slower day.",
      "difficulty": "easy",
      "difficultyNotes": "This is easy moving water in ordinary conditions, but seven-plus miles, low-water scrape potential, wood movement after storms, and the need to stop before the posted downstream hazard make it a real day plan rather than a casual drift.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still publishes Simpson Park and Yellow Breeches Park as named public Yellow Breeches access points, and the county story map still gives exact endpoint coordinates plus the 1.1-mile Simpson-to-McCormick, 3.6-mile McCormick-to-Lower-Allen, 0.5-mile Lower-Allen-to-Liberty, and 1.9-mile Liberty-to-Yellow-Breeches legs that define this 7.1-mile route. The county still recommends boating at 1.4 to 2.0 ft on the Camp Hill gauge, same-day USGS Water Services returned 149 cfs and 1.26 ft at 2026-07-10 23:45 EDT for USGS 01571500, and the current county advisory explicitly recommends B6 as the safer downstream finish because of the blockage above B7."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Simpson Park to Yellow Breeches Park, about 7.1 mi",
        "note": "The county story map lists Simpson Park to McCormick Park as 1.1 miles, McCormick Park to Lower Allen Community Park as 3.6 miles, Lower Allen Community Park to Liberty Forge as 0.5 miles, and Liberty Forge to Yellow Breeches Park as 1.9 miles.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "40.164151, -76.976192 to 40.183811, -76.912682",
        "note": "Cumberland County still publishes Simpson Park and Yellow Breeches Park as official Yellow Breeches access points with those coordinates.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Official same-creek proxy gauge",
        "value": "USGS 01571500 at 149 cfs / 1.26 ft",
        "note": "USGS Water Services returned same-day 2026-07-10 values of 149 cfs and 1.26 ft for Yellow Breeches Creek near Camp Hill at 23:45 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official level guidance",
        "value": "Recommended 1.4 to 2.0 ft; action stage 6 ft; flood stage 7 ft",
        "note": "Cumberland County says the Camp Hill gauge should read between 1.4 and 2.0 feet for boating, with action stage at 6 feet and flood stage at 7 feet.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      },
      {
        "label": "Current finish rationale",
        "value": "County recommends B6 instead of continuing toward B7",
        "note": "The county page currently warns that a large fallen tree and logjam completely block the creek upstream of the Slate Hill Road take-out and specifically recommends taking out at B6 Yellow Breeches Park to avoid the hazard.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Yellow Breeches story map",
        "url": "https://gis.ccpa.net/storymaps/yellowbreeches/",
        "provider": "local"
      },
      {
        "label": "PFBC Water Trail Guides and Maps",
        "url": "https://pfbc.pa.gov/WaterTrail.htm",
        "provider": "local"
      },
      {
        "label": "USGS 01571500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01571500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "yellow-breeches-creek-mccormick-park-yellow-breeches-park",
    "slug": "yellow-breeches-creek-mccormick-park-yellow-breeches-park",
    "name": "Yellow Breeches Creek",
    "reach": "McCormick Park to Yellow Breeches Park",
    "aliases": [
      "Yellow Breeches Creek - McCormick Park to Yellow Breeches Park",
      "Yellow Breeches Creek - Mechanicsburg to Sheepford Road",
      "Yellow Breeches Creek middle-lower continuation"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Middle-lower Yellow Breeches continuation from McCormick Park to Yellow Breeches Park. Cumberland County still documents the full access chain, the bridge-side Liberty Forge public-use terms, and the B6 finish that stays above the current downstream blockage.",
    "statusText": "Use the Yellow Breeches Creek near Camp Hill gauge as an official same-creek proxy. Cumberland County recommends boating at about 1.4 to 2.0 ft there; the gauge was 1.26 ft at 2026-07-10 23:45 EDT, so expect scrape-prone shallows and slower-than-normal travel.",
    "latitude": 40.165436,
    "longitude": -76.95508,
    "gaugeSource": {
      "id": "usgs-01571500",
      "provider": "usgs",
      "siteId": "01571500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Yellow Breeches Creek near Camp Hill, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Cumberland County classifies Yellow Breeches as Class I-II moving water and says flow conditions can change rapidly.",
        "Liberty Forge is a public boating access only at the Old Forge Road bridge area; follow posted access rules and do not treat the golf-resort grounds as an unrestricted stop or take-out.",
        "The county currently warns of a complete blockage just upstream of B7 / Slate Hill Road and recommends taking out at B6 Yellow Breeches Park instead."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.4,
      "idealMax": 2,
      "tooLow": 1.4,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "Cumberland County Yellow Breeches Camp Hill gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
      "seasonNotes": "Warm-season windows are the easiest fit, but the creek is quick to rise after thunderstorms and quick to get scratchy when the Camp Hill proxy falls below the county floor.",
      "difficulty": "easy",
      "difficultyNotes": "The route is approachable at normal summer levels, but six miles of moving water, low-water scraping, fresh wood, and the need to finish before the posted downstream hazard keep it from being a mindless drift.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still publishes McCormick Park and Yellow Breeches Park as named public Yellow Breeches access points, and the county story map still gives exact endpoint coordinates plus the 3.6-mile McCormick-to-Lower-Allen, 0.5-mile Lower-Allen-to-Liberty, and 1.9-mile Liberty-to-Yellow-Breeches legs that define this 6.0-mile route. The story map also still says the public may access the creek for boating at the Old Forge Road bridge at Liberty Forge while following posted rules. The county still recommends boating at 1.4 to 2.0 ft on the Camp Hill gauge, same-day USGS Water Services returned 149 cfs and 1.26 ft at 2026-07-10 23:45 EDT for USGS 01571500, and the current county advisory explicitly recommends B6 as the safer downstream finish because of the blockage above B7."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "McCormick Park to Yellow Breeches Park, about 6.0 mi",
        "note": "The county story map lists McCormick Park to Lower Allen Community Park as 3.6 miles, Lower Allen Community Park to Liberty Forge as 0.5 miles, and Liberty Forge to Yellow Breeches Park as 1.9 miles.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "40.165436, -76.955080 to 40.183811, -76.912682",
        "note": "Cumberland County still publishes McCormick Park and Yellow Breeches Park as official Yellow Breeches access points with those coordinates.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public-use access terms",
        "value": "Bridge-side boating access at Liberty Forge",
        "note": "The county story map says the public may access the creek for boating at the bridge at Old Forge Road, with parking at the miniature-golf area and posted access rules controlling use.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Official same-creek proxy gauge",
        "value": "USGS 01571500 at 149 cfs / 1.26 ft",
        "note": "USGS Water Services returned same-day 2026-07-10 values of 149 cfs and 1.26 ft for Yellow Breeches Creek near Camp Hill at 23:45 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Current finish rationale",
        "value": "County recommends B6 instead of continuing toward B7",
        "note": "The county page currently warns that a large fallen tree and logjam completely block the creek upstream of the Slate Hill Road take-out and specifically recommends taking out at B6 Yellow Breeches Park to avoid the hazard.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Yellow Breeches story map",
        "url": "https://gis.ccpa.net/storymaps/yellowbreeches/",
        "provider": "local"
      },
      {
        "label": "PFBC Water Trail Guides and Maps",
        "url": "https://pfbc.pa.gov/WaterTrail.htm",
        "provider": "local"
      },
      {
        "label": "USGS 01571500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01571500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "yellow-breeches-creek-simpson-park-mccormick-park",
    "slug": "yellow-breeches-creek-simpson-park-mccormick-park",
    "name": "Yellow Breeches Creek",
    "reach": "Simpson Park to McCormick Park",
    "aliases": [
      "Yellow Breeches Creek - Simpson Park to McCormick Park",
      "Yellow Breeches Creek - Bowmansdale to South Sporting Hill Road",
      "Yellow Breeches Creek upper middle warm-up segment"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Shortest current Yellow Breeches public segment between Simpson Park and McCormick Park. Cumberland County still publishes both named launches, the exact 1.1-mile spacing, and the same Camp Hill gauge guidance used for the rest of the trail, which is enough for a cautious low-water add.",
    "statusText": "Use the Yellow Breeches Creek near Camp Hill gauge as an official same-creek proxy. Cumberland County recommends boating at about 1.4 to 2.0 ft there; the gauge was 1.25 ft at 2026-07-11 00:45 EDT, so expect a scrape-prone short outing rather than an automatic beginner green-light.",
    "latitude": 40.164151,
    "longitude": -76.976192,
    "gaugeSource": {
      "id": "usgs-01571500",
      "provider": "usgs",
      "siteId": "01571500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Yellow Breeches Creek near Camp Hill, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Cumberland County classifies Yellow Breeches as Class I-II moving water and says conditions can change rapidly.",
        "This short route still deserves a same-day wood and depth check because the Camp Hill proxy sat below the county boating floor during review.",
        "Stay with the named public launches and respect private-bank limits along this residential creek corridor."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.4,
      "idealMax": 2,
      "tooLow": 1.4,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "Cumberland County Yellow Breeches Camp Hill gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
      "seasonNotes": "Warm-season windows are the easiest fit, but the route is still sensitive to summer scrape levels and quick thunderstorm rises.",
      "difficulty": "easy",
      "difficultyNotes": "This is an easy short creek run at ordinary levels, but a low proxy reading can turn even 1.1 miles into repeated scraping and awkward eddy-hopping.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still publishes Simpson Park and McCormick Park as named public Yellow Breeches access points, the county story map still gives exact endpoint coordinates and the direct 1.1-mile route shape, and same-day USGS Water Services returned 147 cfs and 1.25 ft at 2026-07-11 00:45 EDT for the official Camp Hill proxy gauge. The route copy stays conservative because that proxy reading sat below the county boating floor of 1.4 ft."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Simpson Park to McCormick Park, about 1.1 mi",
        "note": "The county story map lists Simpson Park to McCormick Park as a 1.1-mile public segment.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "40.164151, -76.976192 to 40.165436, -76.955080",
        "note": "Cumberland County still publishes Simpson Park and McCormick Park as official Yellow Breeches access points with those coordinates.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Official same-creek proxy gauge",
        "value": "USGS 01571500 at Camp Hill",
        "note": "USGS Water Services returned same-day 2026-07-11 values of 147 cfs and 1.25 ft for Yellow Breeches Creek near Camp Hill at 00:45 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official level guidance",
        "value": "Recommended 1.4 to 2.0 ft; action stage 6 ft; flood stage 7 ft",
        "note": "Cumberland County says the Camp Hill gauge should read between 1.4 and 2.0 feet for boating, with action stage at 6 feet and flood stage at 7 feet.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Yellow Breeches story map",
        "url": "https://gis.ccpa.net/storymaps/yellowbreeches/",
        "provider": "local"
      },
      {
        "label": "PFBC Water Trail Guides and Maps",
        "url": "https://pfbc.pa.gov/WaterTrail.htm",
        "provider": "local"
      },
      {
        "label": "USGS 01571500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01571500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "yellow-breeches-creek-mccormick-park-lower-allen-community-park",
    "slug": "yellow-breeches-creek-mccormick-park-lower-allen-community-park",
    "name": "Yellow Breeches Creek",
    "reach": "McCormick Park to Lower Allen Community Park",
    "aliases": [
      "Yellow Breeches Creek - McCormick Park to Lower Allen Community Park",
      "Yellow Breeches Creek - South Sporting Hill Road to Lower Allen",
      "Yellow Breeches Creek lower middle township segment"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Middle Yellow Breeches public segment from McCormick Park to Lower Allen Community Park. Cumberland County still publishes both launches, the exact 3.6-mile route shape, and the campground-supported take-out, while the same Camp Hill gauge story keeps low-water caution explicit.",
    "statusText": "Use the Yellow Breeches Creek near Camp Hill gauge as an official same-creek proxy. Cumberland County recommends boating at about 1.4 to 2.0 ft there; the gauge was 1.25 ft at 2026-07-11 00:45 EDT, so expect shallow scraping and slower lines rather than a normal summer sweet spot.",
    "latitude": 40.165436,
    "longitude": -76.95508,
    "gaugeSource": {
      "id": "usgs-01571500",
      "provider": "usgs",
      "siteId": "01571500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Yellow Breeches Creek near Camp Hill, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Cumberland County says Yellow Breeches conditions can change rapidly and that paddlers should check the Camp Hill gauge before every outing.",
        "The current county B6/B7 blockage advisory is downstream of this route, but it still means this segment should be treated as a self-contained day float rather than a casual continuation.",
        "Stay with the named public launches and respect private-bank limits through the township corridor."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.4,
      "idealMax": 2,
      "tooLow": 1.4,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "Cumberland County Yellow Breeches Camp Hill gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
      "seasonNotes": "Spring through early fall is the clearest fit, but the creek is quick to rise after thunderstorms and quick to get bony when the proxy gauge falls under the county floor.",
      "difficulty": "easy",
      "difficultyNotes": "This is easy moving water at ordinary levels, but low water, fresh wood, and a muddy campground-backed finish can make it feel less trivial than the short mileage suggests.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still publishes McCormick Park and Lower Allen Community Park as named public Yellow Breeches access points, the county story map still gives exact endpoint coordinates and the direct 3.6-mile route shape, and same-day USGS Water Services returned 147 cfs and 1.25 ft at 2026-07-11 00:45 EDT for the official Camp Hill proxy gauge. The route keeps explicit low-water caution because that gauge reading sat below the county boating floor."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "McCormick Park to Lower Allen Community Park, about 3.6 mi",
        "note": "The county story map lists McCormick Park to Lower Allen Community Park as a 3.6-mile public segment.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "40.165436, -76.955080 to 40.172373, -76.913787",
        "note": "Cumberland County still publishes McCormick Park and Lower Allen Community Park as official Yellow Breeches access points with those coordinates.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Official same-creek proxy gauge",
        "value": "USGS 01571500 at Camp Hill",
        "note": "USGS Water Services returned same-day 2026-07-11 values of 147 cfs and 1.25 ft for Yellow Breeches Creek near Camp Hill at 00:45 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official level guidance",
        "value": "Recommended 1.4 to 2.0 ft; action stage 6 ft; flood stage 7 ft",
        "note": "Cumberland County says the Camp Hill gauge should read between 1.4 and 2.0 feet for boating, with action stage at 6 feet and flood stage at 7 feet.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      },
      {
        "label": "Endpoint camping support",
        "value": "Lower Allen Community Park camping by reservation",
        "note": "Cumberland County still identifies Lower Allen Community Park as a public Yellow Breeches access with camping available by reservation at the park.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Yellow Breeches story map",
        "url": "https://gis.ccpa.net/storymaps/yellowbreeches/",
        "provider": "local"
      },
      {
        "label": "PFBC Water Trail Guides and Maps",
        "url": "https://pfbc.pa.gov/WaterTrail.htm",
        "provider": "local"
      },
      {
        "label": "USGS 01571500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01571500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "yellow-breeches-creek-liberty-forge-yellow-breeches-park",
    "slug": "yellow-breeches-creek-liberty-forge-yellow-breeches-park",
    "name": "Yellow Breeches Creek",
    "reach": "Liberty Forge to Yellow Breeches Park",
    "aliases": [
      "Yellow Breeches Creek - Liberty Forge to Yellow Breeches Park",
      "Yellow Breeches Creek - Old Forge Road to Sheepford Road",
      "Yellow Breeches Creek lower bridge-to-park segment"
    ],
    "state": "Pennsylvania",
    "region": "South Central Pennsylvania",
    "summary": "Short lower-middle Yellow Breeches segment from the public Liberty Forge bridge access to Yellow Breeches Park. Cumberland County still documents both endpoints, the exact 1.9-mile route shape, and the current B6 finish logic above the downstream blockage.",
    "statusText": "Use the Yellow Breeches Creek near Camp Hill gauge as an official same-creek proxy. Cumberland County recommends boating at about 1.4 to 2.0 ft there; the gauge was 1.25 ft at 2026-07-11 00:45 EDT, so treat this as a scrape-prone short float instead of a broad green-light.",
    "latitude": 40.177495,
    "longitude": -76.924172,
    "gaugeSource": {
      "id": "usgs-01571500",
      "provider": "usgs",
      "siteId": "01571500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Yellow Breeches Creek near Camp Hill, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "The county story map says the public may use the bridge-side boating access at Liberty Forge while following posted rules and small-group parking limits.",
        "Cumberland County currently recommends taking out at B6 Yellow Breeches Park because the creek is blocked upstream of B7 / Slate Hill Road.",
        "Stay with named public launches and avoid private-bank pull-offs if low water, wood, or the bridge-area access feels less straightforward than expected."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1.4,
      "idealMax": 2,
      "tooLow": 1.4,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "Cumberland County Yellow Breeches Camp Hill gauge guidance",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
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
      "seasonNotes": "Short warm-season paddles are the natural fit, but the creek can rise quickly after storms and still run annoyingly shallow below the county floor.",
      "difficulty": "easy",
      "difficultyNotes": "This is normally easy short moving water, but low-water scraping, a bridge-side put-in, and the need to finish before the posted downstream blockage keep the route from being a thoughtless drift.",
      "confidenceNotes": "Confidence is good for a conservative Pennsylvania add: Cumberland County still publishes Liberty Forge and Yellow Breeches Park as named public Yellow Breeches access points, the county story map still gives exact endpoint coordinates and the direct 1.9-mile route shape, and same-day USGS Water Services returned 147 cfs and 1.25 ft at 2026-07-11 00:45 EDT for the official Camp Hill proxy gauge. The route also keeps the county's current B6-over-B7 finish advisory explicit rather than pretending the lower continuation is routine."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Liberty Forge to Yellow Breeches Park, about 1.9 mi",
        "note": "The county story map lists Liberty Forge to Yellow Breeches Park as a 1.9-mile public segment.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public endpoint coordinates",
        "value": "40.177495, -76.924172 to 40.183811, -76.912682",
        "note": "Cumberland County still publishes Liberty Forge and Yellow Breeches Park as official Yellow Breeches access points with those coordinates.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Public-use access terms",
        "value": "Bridge-side boating access at Liberty Forge",
        "note": "The county story map says the public may access the creek for boating at the bridge at Old Forge Road, with parking at the miniature-golf area and posted access rules controlling use.",
        "sourceUrl": "https://gis.ccpa.net/storymaps/yellowbreeches/"
      },
      {
        "label": "Official same-creek proxy gauge",
        "value": "USGS 01571500 at Camp Hill",
        "note": "USGS Water Services returned same-day 2026-07-11 values of 147 cfs and 1.25 ft for Yellow Breeches Creek near Camp Hill at 00:45 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Current finish rationale",
        "value": "County recommends B6 instead of continuing toward B7",
        "note": "The county page currently warns that a large fallen tree and logjam completely block the creek upstream of the Slate Hill Road take-out and specifically recommends taking out at B6 Yellow Breeches Park to avoid the hazard.",
        "sourceUrl": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cumberland County Water Trails",
        "url": "https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails",
        "provider": "local"
      },
      {
        "label": "Yellow Breeches story map",
        "url": "https://gis.ccpa.net/storymaps/yellowbreeches/",
        "provider": "local"
      },
      {
        "label": "PFBC Water Trail Guides and Maps",
        "url": "https://pfbc.pa.gov/WaterTrail.htm",
        "provider": "local"
      },
      {
        "label": "USGS 01571500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-01571500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 01571500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01571500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "little-pine-creek-north-park-lake-allison-park",
    "slug": "little-pine-creek-north-park-lake-allison-park",
    "name": "Little Pine Creek",
    "reach": "North Park Lake to Allison Park",
    "aliases": ["Little Pine Creek - North Park Lake to Allison Park", "Pine Creek (Allegheny County) - North Park to Allison Park"],
    "state": "Pennsylvania",
    "region": "Allegheny County",
    "summary": "A 6.6-mile seasonal Little Pine Creek run from the named North Park Lake boat-launch area to the public ballfield/take-out area on Duncan Avenue in Allison Park. CanoeDraft documents the reach and ties its gauge guidance to USGS 03049800; the gauge is downstream near Etna, so this remains a proxy planning route rather than a scored recommendation.",
    "statusText": "Use USGS 03049800 near Etna as a conservative downstream proxy. CanoeDraft lists 2.2 ft as the minimum and 3.0 ft as an ideal upper reference for the North Park Lake-to-Allison Park reach; the tiny creek is normally runnable only after heavy rain or spring snowmelt. Inspect the entire line, including the old Wildwood Mine dam/spillway, before committing.",
    "latitude": 40.56033,
    "longitude": -79.95993,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": ["low_water", "dam", "whitewater", "strainers", "cold_water", "private_banks"],
      "safetyNotes": [
        "CanoeDraft describes Little Pine Creek as a tiny creek that is normally runnable only after heavy rain or spring snowmelt; never treat the proxy gauge as a launch guarantee.",
        "The North Park-to-Allison Park reach may include an old approximately three-foot dam at the Wildwood Mine area, ledges, wood, narrow channels, and urban/industrial debris. Scout from shore where possible and portage any unsafe feature; do not run a dam.",
        "Use the named North Park boat-launch area and the public ballfield/take-out area opposite St Ursula Church on Duncan Avenue. Do not use private banks, driveways, or the separate Allison Park-to-Etna take-out described by CanoeDraft.",
        "Wear a properly fitted PFD and protective clothing for cold water. Check park notices, current gauge, weather, and downstream conditions immediately before launch."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {"id": "usgs-03049800", "provider": "usgs", "siteId": "03049800", "metric": "gage_height_ft", "unit": "ft", "kind": "proxy", "siteName": "Little Pine Creek near Etna, PA", "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03049800/"},
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2.2,
      "idealMax": 3,
      "tooLow": 2.2,
      "tooHigh": 3,
      "thresholdSource": {"label": "CanoeDraft Little Pine Creek gauge bands", "url": "https://canoedraft.shaw-weil.com/gauge/", "provider": "manual"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [3, 4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "A narrow seasonal creek; heavy-rain and spring-snowmelt windows are the primary opportunity. Confirm park access and actual water at the put-in.",
      "difficulty": "hard",
      "difficultyNotes": "CanoeDraft describes small ledges and possible dam hazards on the upper reach. Treat this as advanced creek boating requiring scouting and a suitable whitewater-capable craft, not a casual flatwater float.",
      "confidenceNotes": "The route endpoints and six-point-six-mile reach are documented by CanoeDraft; North Park's official page confirms the park boating context and launch area; Hampton Township materials locate the public ballfield opposite St Ursula Church on Duncan Avenue. USGS 03049800 is a downstream proxy near Etna, so the route is planning-only and excluded from scored coverage."
    },
    "evidenceNotes": [
      {"label": "Route and threshold", "value": "North Park Lake to Allison Park, 6.6 mi; 2.2 ft minimum and 3 ft ideal upper reference", "note": "CanoeDraft documents the reach, access context, hazards, seasonal runnable conditions, and station-specific gauge table for USGS 03049800.", "sourceUrl": "https://canoedraft.shaw-weil.com/river/Pine%20Creek%20%28Allegheny%20County%29.php"},
      {"label": "Live proxy gauge", "value": "USGS 03049800 Little Pine Creek near Etna", "note": "USGS provides the live stage telemetry and monitoring-location metadata; it is downstream of the reviewed reach.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03049800"},
      {"label": "North Park boating context", "value": "North Park Lake boat-launch area", "note": "Allegheny County identifies North Park Lake boating and the park location at 303 Pearce Mill Road; follow current park signs and notices for the exact launch.", "sourceUrl": "https://www.alleghenycounty.us/parks/activities/boating/north-park"},
      {"label": "Allison Park take-out context", "value": "Public ballfield opposite St Ursula Church on Duncan Avenue", "note": "Hampton Township event materials identify the ballfield opposite St Ursula Church off Duncan Avenue; use the public ballfield area only and verify current parking/access.", "sourceUrl": "https://www.hampton-pa.gov/DocumentCenter/View/1135/Pine-Creek-Cleanup-Day-PDF"},
      {"label": "Hazards", "value": "Old Wildwood Mine dam/spillway and small ledges", "note": "CanoeDraft flags a possible old three-foot dam at Wildwood Mine and other ledges/wood; inspect and portage rather than run unknown features.", "sourceUrl": "https://canoedraft.shaw-weil.com/river/Pine%20Creek%20%28Allegheny%20County%29.php"}
    ],
    "sourceLinks": [
      {"label": "CanoeDraft Little Pine Creek route", "url": "https://canoedraft.shaw-weil.com/river/Pine%20Creek%20%28Allegheny%20County%29.php", "provider": "manual"},
      {"label": "CanoeDraft gauge table", "url": "https://canoedraft.shaw-weil.com/gauge/", "provider": "manual"},
      {"label": "USGS 03049800 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03049800/", "provider": "usgs"},
      {"label": "Allegheny County North Park boating", "url": "https://www.alleghenycounty.us/parks/activities/boating/north-park", "provider": "local"},
      {"label": "Hampton Township ballfield context", "url": "https://www.hampton-pa.gov/DocumentCenter/View/1135/Pine-Creek-Cleanup-Day-PDF", "provider": "local"}
    ]
  },
  {
    "id": "youghiogheny-river-connellsville-dawson",
    "slug": "youghiogheny-river-connellsville-dawson",
    "name": "Youghiogheny River",
    "reach": "Connellsville River Park to River Road, Dawson",
    "aliases": [
      "Lower Yough Northern Water Trail",
      "Youghiogheny River - Connellsville to Dawson",
      "Connellsville to Dawson family float"
    ],
    "state": "Pennsylvania",
    "region": "Laurel Highlands",
    "summary": "A 5.4-mile, family-oriented lower Yough float from the surfaced Yough River Park ramp under the US 119 bridge in Connellsville to the unimproved River Road access beneath the Dawson road bridge. The Great Allegheny Passage parallels the reach and provides emergency egress, while PFBC and the Mountain Watershed Association identify the corridor as part of the northern Youghiogheny Water Trail.",
    "statusText": "Use the direct USGS Connellsville gauge. American Whitewater describes this reach as Class I-II and medium runnable at 2,100 cfs; conservative local guide data places the broader Connellsville-to-Dawson corridor around 1,350-2,580 cfs. Check same-day flow, weather, water temperature, and local trail/access notices before launching.",
    "latitude": 40.020833,
    "longitude": -79.597222,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "cold_water",
        "access_uncertain"
      ],
      "safetyNotes": [
        "This is a moving-water route, not a lake float. Wear a properly fitted PFD, keep boats clear of bridge piers and strainers, and scout any unusually high or debris-laden flow before committing.",
        "The Dawson take-out is an unimproved river-left access under the road bridge with shared Great Allegheny Passage parking; confirm the walking carry, parking conditions, and any local closures on arrival.",
        "PFBC guidance requires a wearable PFD on all boats and additional cold-weather PFD-wear requirements from November 1 through April 30. Follow posted water-trail and rail-trail rules.",
        "The gauge is regulated by upstream reservoirs, but releases and rainfall can still change current and water level quickly; do not treat the threshold as a substitute for visual assessment."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03082500",
      "provider": "usgs",
      "siteId": "03082500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Youghiogheny River at Connellsville, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03082500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 1350,
      "tooLow": 1350,
      "thresholdSource": {
        "label": "American Whitewater and Western Pennsylvania river guide flow guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/11677/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "The water trail is usable across much of the warm season, but cold water, reservoir releases, rainfall, and late-season weather require same-day judgment. Camping and services are available along the broader Great Allegheny Passage corridor, subject to current site rules.",
      "difficulty": "easy",
      "difficultyNotes": "American Whitewater rates the 5.4-mile reach Class I-II. Small rapids and current remain present, and the route should not be treated as risk-free for children or inexperienced paddlers without appropriate supervision.",
      "confidenceNotes": "Confidence is sufficient for publication: American Whitewater directly names the Connellsville River Park-to-Dawson reach and ties it to USGS 03082500; PFBC and Mountain Watershed Association identify the northern Youghiogheny Water Trail; PFBC publishes the Connellsville ramp and Dawson access context; and independent launch sources provide practical endpoint coordinates. The minimum-only threshold is intentionally conservative because the strongest sources describe runnable conditions but do not publish a formal upper limit for this family float."
    },
    "putIn": {
      "id": "yough-river-park-connellsville",
      "name": "Yough River Park, Connellsville surfaced ramp",
      "latitude": 40.020833,
      "longitude": -79.597222
    },
    "takeOut": {
      "id": "river-road-dawson",
      "name": "River Road, Dawson unimproved access",
      "latitude": 40.0453,
      "longitude": -79.6562
    },
    "logistics": {
      "distanceLabel": "Approximately 5.4 river miles",
      "estimatedPaddleTime": "About 3-4 on-water hours, longer with stops and shuttle logistics",
      "shuttle": "Use two vehicles or arrange a shuttle. The Great Allegheny Passage parallels the reach and can support emergency egress, but it is not a substitute for a vehicle shuttle.",
      "permits": "Follow Pennsylvania Fish and Boat Commission registration/launch-permit rules and all posted city, water-trail, and Great Allegheny Passage requirements.",
      "camping": "Camping and hiker-biker facilities are available at selected Great Allegheny Passage sites near the broader Youghiogheny Water Trail; verify current campground rules and availability before planning an overnight trip.",
      "campingClassification": "nearby_basecamp",
      "summary": "Plan as a family-oriented moving-water float with a surfaced city ramp, an unimproved Dawson take-out, and a short vehicle shuttle.",
      "accessCaveats": [
        "The Dawson access is unimproved and shares parking with the Great Allegheny Passage; verify carry distance, parking, and any closure signs on arrival.",
        "Do not use unlisted private banks or rail-trail property as substitute launch points."
      ],
      "watchFor": [
        "rapidly changing reservoir-regulated flow",
        "bridge piers and low-clearance structures",
        "strainers and debris after storms",
        "cold water",
        "Great Allegheny Passage and road crossings"
      ]
    },
    "evidenceNotes": [
      {
        "label": "Direct route and gauge",
        "value": "Connellsville River Park to River Road, Dawson; USGS 03082500",
        "note": "American Whitewater identifies this exact 5.4-mile reach and direct Connellsville gauge; the USGS station provides current discharge, stage, and NAVD88 stream level.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/11677/main"
      },
      {
        "label": "Public endpoints",
        "value": "Yough River Park surfaced ramp; Dawson unimproved access",
        "note": "PFBC identifies Yough River Park as a surfaced ramp at 40°01'15 N, 79°35'50 W; the Water Trail map identifies Dawson as river-left under the road bridge, and independent launch data places the access near 40.0453, -79.6562.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/yough/yough_north_map.pdf"
      },
      {
        "label": "Threshold and current conditions",
        "value": "Conservative minimum-only guidance: 1,350 cfs; AW reported 2,100 cfs medium runnable",
        "note": "American Whitewater reports this reach medium runnable at 2,100 cfs; the Western Pennsylvania river guide lists the broader South Connellsville-to-Dawson corridor around 1,350-2,580 cfs. The product uses the lower value as a conservative minimum and does not assert an unsupported upper limit.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03082500"
      },
      {
        "label": "Water trail, camping, and safety",
        "value": "PFBC northern Youghiogheny Water Trail and Great Allegheny Passage",
        "note": "PFBC and Mountain Watershed Association identify the water trail, access ownership, camping symbols, and trail services; the map warns that PFDs are required and cold-weather wear rules apply.",
        "sourceUrl": "https://mtwatershed.com/wp-content/uploads/2022/08/YRtrailmapSectionC.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Connellsville to Dawson",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/11677/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 03082500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03082500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC Youghiogheny northern water-trail map",
        "url": "https://pfbc.pa.gov/watertrails/yough/yough_north_map.pdf",
        "provider": "local"
      },
      {
        "label": "Mountain Watershed Association water-trail map",
        "url": "https://mtwatershed.com/wp-content/uploads/2022/08/YRtrailmapSectionC.pdf",
        "provider": "local"
      },
      {
        "label": "PFBC water-trail guides",
        "url": "https://pfbc.pa.gov/WaterTrail.htm",
        "provider": "local"
      }
    ]
  },
  {
    "id": "youghiogheny-river-dawson-port-vue",
    "slug": "youghiogheny-river-dawson-port-vue",
    "name": "Youghiogheny River",
    "reach": "River Road, Dawson to Port Vue Launch, McKeesport (multi-day corridor)",
    "aliases": [
      "Lower Yough Northern Water Trail",
      "Youghiogheny River - Dawson to McKeesport",
      "Dawson to Port Vue family float"
    ],
    "state": "Pennsylvania",
    "region": "Laurel Highlands",
    "summary": "A long, 38-mile multi-day Class I-II northern Yough water-trail corridor from the River Road access in Dawson to the PFBC Port Vue/McKeesport ramp. The reach has multiple documented intermediate access and camping points, including RoundBottom, Smithton Beach, Cedar Creek Park, West Newton, Sutersville, Buena Vista, and Boston.",
    "statusText": "Use the direct USGS Sutersville gauge. American Whitewater lists this 38-mile reach as Class I-II and medium runnable at about 2,370 cfs. This is a full-day or multi-day undertaking; check same-day flow, weather, water temperature, access notices, and the PFBC launch-permit rules before committing.",
    "latitude": 40.0453,
    "longitude": -79.6562,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "cold_water",
        "access_uncertain"
      ],
      "safetyNotes": [
        "This is a long moving-water route with changing current, bridge structures, strainers, and urban/industrial river margins. Wear a properly fitted PFD and plan intermediate exits rather than treating the 38 miles as one uninterrupted day trip.",
        "The Dawson start is an unimproved access beneath the road bridge; the Port Vue/McKeesport finish is a PFBC ramp. Confirm parking, carry distance, permits, and any closure or construction notices at both ends.",
        "PFBC identifies multiple access sites and hazard markers on the northern Youghiogheny Water Trail. Respect private access labels, railroad and road crossings, and all posted boating restrictions near the mouth.",
        "The gauge is regulated by upstream reservoirs, but releases, rainfall, and debris can still change conditions quickly. The American Whitewater flow reference is a planning threshold, not a safety guarantee."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03083500",
      "provider": "usgs",
      "siteId": "03083500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Youghiogheny River at Sutersville, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03083500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 1500,
      "tooLow": 1500,
      "thresholdSource": {
        "label": "American Whitewater Dawson to Port Vue reach",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/11740/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10, 11],
      "seasonNotes": "The northern water trail is usable across much of the warm season, but cold water, reservoir releases, rainfall, debris, and late-season weather require same-day judgment. RoundBottom and other Great Allegheny Passage facilities support staged or overnight planning subject to current rules.",
      "difficulty": "easy",
      "difficultyNotes": "American Whitewater rates the 38-mile reach Class I-II. Its length, moving current, access logistics, and changing urban/river conditions make it substantially more demanding logistically than a short family float.",
      "confidenceNotes": "Confidence is sufficient for publication: American Whitewater directly names the 38-mile Dawson-to-Port Vue reach and ties it to USGS 03083500; PFBC publishes the Sutersville and McKeesport ramps and intermediate access table; the PFBC and Mountain Watershed Association maps document the water trail, camping/access context, and hazards. The product uses a conservative minimum-only threshold because AW supplies the medium-runnable reference but no formal upper limit."
    },
    "putIn": {
      "id": "river-road-dawson",
      "name": "River Road, Dawson unimproved access",
      "latitude": 40.0453,
      "longitude": -79.6562
    },
    "takeOut": {
      "id": "pfbc-port-vue-mckeesport",
      "name": "PFBC Port Vue Launch, Atlantic Avenue, McKeesport",
      "latitude": 40.352222,
      "longitude": -79.871389
    },
    "logistics": {
      "distanceLabel": "Approximately 38 river miles (multi-day staged corridor)",
      "estimatedPaddleTime": "Full day for strong paddlers or a multi-day itinerary with planned intermediate exits",
      "shuttle": "Use a two-vehicle shuttle or arrange a commercial shuttle. Intermediate access at McKee Road, Smithton Beach, Cedar Creek Park, West Newton, Sutersville, Buena Vista, and Boston allows shorter staged trips.",
      "permits": "Follow Pennsylvania Fish and Boat Commission registration and launch-permit rules, PFBC access-site rules, and all posted Great Allegheny Passage and local-park requirements.",
      "camping": "RoundBottom hiker-biker campground and other Great Allegheny Passage facilities are documented along the corridor; verify current reservations, camping rules, and access before planning an overnight trip.",
      "campingClassification": "overnight_capable",
      "summary": "Plan as a long northern Yough water-trail itinerary with a documented unimproved Dawson start, a surfaced Port Vue finish, and multiple intermediate access/camping options.",
      "accessCaveats": [
        "Dawson access is unimproved and must be confirmed on arrival; do not substitute unlisted private banks.",
        "PFBC identifies access-site types and permit requirements; confirm current parking and closure notices at every intended stop.",
        "The Port Vue/McKeesport ramp is near the Yough-Monongahela urban confluence; follow local slow/no-wake and traffic rules."
      ],
      "watchFor": [
        "rapidly changing reservoir-regulated flow",
        "bridge piers and road/rail crossings",
        "strainers and debris after storms",
        "cold water and long self-rescue distances",
        "urban/industrial river margins near McKeesport"
      ]
    },
    "evidenceNotes": [
      {
        "label": "Direct route and gauge",
        "value": "River Road, Dawson to Port Vue Launch, McKeesport; USGS 03083500",
        "note": "American Whitewater identifies this exact 38-mile reach, names the intermediate access points, and ties it directly to the Sutersville gauge.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/11740/main"
      },
      {
        "label": "Public endpoints",
        "value": "River Road, Dawson unimproved access; PFBC Port Vue/McKeesport surfaced ramp",
        "note": "PFBC's northern water-trail map identifies the Dawson/Sutersville/Port Vue access context and publishes endpoint coordinates; the Dawson coordinate is retained from the existing verified Dawson package.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/yough/yough_north_map.pdf"
      },
      {
        "label": "Threshold and current conditions",
        "value": "Conservative minimum-only guidance: 1,500 cfs; AW reports about 2,370 cfs medium runnable",
        "note": "American Whitewater provides the station-specific medium-runnable reference for this reach. The product intentionally omits an unsupported upper limit and requires same-day visual assessment.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03083500"
      },
      {
        "label": "Water trail, camping, and safety",
        "value": "PFBC northern Youghiogheny Water Trail, Great Allegheny Passage, and RoundBottom campground",
        "note": "PFBC and Mountain Watershed Association maps document the access-site table, camping symbols, permit/PFD context, and hazards along the corridor.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/yough/yough_north_guide.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Dawson to Port Vue",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/11740/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 03083500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03083500/",
        "provider": "usgs"
      },
      {
        "label": "PFBC Youghiogheny northern water-trail map",
        "url": "https://pfbc.pa.gov/watertrails/yough/yough_north_map.pdf",
        "provider": "local"
      },
      {
        "label": "PFBC northern water-trail guide",
        "url": "https://pfbc.pa.gov/watertrails/yough/yough_north_guide.pdf",
        "provider": "local"
      },
      {
        "label": "Mountain Watershed Association section D map",
        "url": "https://mtwatershed.com/wp-content/uploads/2022/08/YRtrailmapSectionD.pdf",
        "provider": "local"
      }
    ]
  },
  {
    "id": "youghiogheny-river-middle-ramcat-ohiopyle",
    "slug": "youghiogheny-river-middle-ramcat-ohiopyle",
    "name": "Youghiogheny River",
    "reach": "Middle Yough: Ramcat Launch to Ohiopyle Middle Yough Take-out",
    "aliases": [
      "Middle Yough",
      "Confluence to Ohiopyle",
      "Youghiogheny River - Ramcat to Ohiopyle"
    ],
    "state": "Pennsylvania",
    "region": "Laurel Highlands",
    "summary": "A roughly 9-10-mile Class I-II Middle Yough run from the state-park Ramcat launch near Confluence to the regulated Middle Yough take-out upstream of Ohiopyle's bike-trail bridge. This is a distinct beginner/intermediate corridor with named park access, not the Lower Yough whitewater reach.",
    "statusText": "Use the direct USGS 03081000 stage gauge below Confluence. Conservative local guidance places the Middle Yough around 1.8 ft and above; check current stage, releases, water temperature, park rules, and same-day hazards. At higher water the Class II character becomes substantially more forceful.",
    "latitude": 39.82632,
    "longitude": -79.37891,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "cold_water",
        "dam_release"
      ],
      "safetyNotes": [
        "The Middle Yough has Class I-II rapids, including Ramcat, but changing release and rainfall conditions can make waves and hydraulics much stronger. Wear a properly fitted PFD and use a craft appropriate to current conditions.",
        "Pennsylvania regulations require launch at Ramcat and take-out only at the designated Middle Yough take-out upstream of the bike-trail bridge; do not run downstream into Ohiopyle Falls or the Lower Yough from this route.",
        "Water is cold and self-rescue can be difficult. Follow park instructions, carry communication and emergency gear, and check current closures and outfitter/park notices.",
        "The direct gauge is below Confluence and flow is affected by upstream reservoir releases; the threshold is a planning aid, not a safety guarantee."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03081000",
      "provider": "usgs",
      "siteId": "03081000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Youghiogheny River below Confluence, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03081000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 1.8,
      "tooLow": 1.8,
      "thresholdSource": {
        "label": "Canoe Draft western Pennsylvania gauge guide",
        "url": "https://canoedraft.shaw-weil.com/gauge/",
        "provider": "manual"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10, 11],
      "seasonNotes": "The state-park corridor is primarily a warm-season run, but reservoir releases, rainfall, cold water, and changing park operations require same-day checks.",
      "difficulty": "easy",
      "difficultyNotes": "DCNR describes the Middle Yough as Class I-II and suitable for beginning whitewater kayakers or experienced canoeists. The route is not a flatwater beginner guarantee; Ramcat and higher water require active boat control.",
      "confidenceNotes": "Confidence is sufficient for publication: DCNR and Pennsylvania regulations define the exact Ramcat-to-Middle-Yough-take-out corridor and its launch restrictions; the Ohiopyle park map publishes Ramcat and park coordinates; American Whitewater documents the distinct Middle Yough reach and direct Confluence gauge context; and independent water-trail material supports the 9-10-mile itinerary."
    },
    "putIn": {
      "id": "ramcat-launch",
      "name": "Ramcat Launch, Ohiopyle State Park",
      "latitude": 39.82632,
      "longitude": -79.37891
    },
    "takeOut": {
      "id": "middle-yough-ohiopyle-takeout",
      "name": "Middle Yough Boater Take-out and Trailhead, Ohiopyle",
      "latitude": 39.868889,
      "longitude": -79.486944
    },
    "logistics": {
      "distanceLabel": "Approximately 9-10 river miles",
      "estimatedPaddleTime": "About 3-5 hours on water, plus shuttle and park logistics",
      "shuttle": "Leave a vehicle at the designated Middle Yough take-out and shuttle to Ramcat, or use a licensed outfitter. Do not substitute the Lower Yough or Bruner Run take-out.",
      "permits": "Follow Pennsylvania State Park and Fish and Boat Commission launch, registration, and watercraft rules. State regulations restrict launch and take-out to the designated Middle Yough sites.",
      "camping": "Kentuck Campground and Ohiopyle basecamp facilities are nearby; verify current reservations and rules before planning an overnight trip.",
      "campingClassification": "nearby_basecamp",
      "summary": "Plan as a regulated state-park Middle Yough run with a fixed Ramcat launch, fixed Ohiopyle take-out, and an organized shuttle.",
      "accessCaveats": [
        "Ramcat is a state-park launch with parking and access rules; verify current park notices before arrival.",
        "The Middle Yough take-out is upstream of the bike-trail bridge; downstream continuation enters different regulated and more difficult reaches.",
        "Do not use informal riverbank access as a substitute for the designated launch or take-out."
      ],
      "watchFor": [
        "Ramcat and Drake rapids",
        "rapid release or rainfall changes",
        "cold water and long swims",
        "bike-trail bridge and downstream no-go boundary",
        "strainers and bridge/shore hazards"
      ]
    },
    "evidenceNotes": [
      {
        "label": "Direct route and gauge",
        "value": "Ramcat Launch to Middle Yough Take-out; USGS 03081000",
        "note": "DCNR and Pennsylvania regulations define the route boundaries; American Whitewater identifies the distinct Middle Yough reach and Confluence gauge context; USGS provides the direct stage and discharge series.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03081000/"
      },
      {
        "label": "Public endpoints and geometry",
        "value": "Ramcat Launch 39.82632,-79.37891; Middle Yough take-out 39.868889,-79.486944",
        "note": "The Ohiopyle State Park map publishes Ramcat coordinates and identifies the Middle Yough boater take-out; independent access documentation confirms the take-out location.",
        "sourceUrl": "https://elibrary.dcnr.pa.gov/PDFProvider.ashx?PromptToSave=False&Size=3849767&ViewerMode=2&action=PDFStream&chksum=&docID=1737407&docName=OHIO_ParkMap&nativeExt=pdf&overlay=0&revision=2"
      },
      {
        "label": "Threshold and safety rules",
        "value": "Conservative minimum-only stage guidance: 1.8 ft; designated launch/take-out rules",
        "note": "Canoe Draft provides the station-specific planning range; DCNR and Pennsylvania regulations define the Middle Yough class, permitted endpoints, and downstream boundary. The product omits an unsupported upper threshold.",
        "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/ohiopyle-state-park/whitewater-boating"
      },
      {
        "label": "Camping and route context",
        "value": "Ohiopyle State Park, Kentuck Campground, and Middle Yough water trail",
        "note": "Park maps and water-trail materials document nearby camping, trailhead logistics, and the distinct Middle Yough corridor.",
        "sourceUrl": "https://mtwatershed.com/wp-content/uploads/2022/08/YRtrailmapSectionA.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "USGS 03081000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03081000/",
        "provider": "usgs"
      },
      {
        "label": "PA DCNR Middle Yough boating guidance",
        "url": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/ohiopyle-state-park/whitewater-boating",
        "provider": "local"
      },
      {
        "label": "PA whitewater boating regulations",
        "url": "https://www.law.cornell.edu/regulations/pennsylvania/17-Pa-Code-SS-11-220",
        "provider": "local"
      },
      {
        "label": "Ohiopyle State Park map",
        "url": "https://elibrary.dcnr.pa.gov/PDFProvider.ashx?PromptToSave=False&Size=3849767&ViewerMode=2&action=PDFStream&chksum=&docID=1737407&docName=OHIO_ParkMap&nativeExt=pdf&overlay=0&revision=2",
        "provider": "local"
      },
      {
        "label": "American Whitewater Middle Yough reports",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1686/reports",
        "provider": "american_whitewater"
      }
    ]
  },
  {
    "id": "blacklick-creek-route-259-saylor-park",
    "slug": "blacklick-creek-route-259-saylor-park",
    "name": "Blacklick Creek",
    "reach": "PA 259 Heshbon to Saylor Park",
    "aliases": [
      "Blacklick Creek - Route 259 to Saylor Park",
      "Blacklick Creek Heshbon to Blacklick",
      "Blacklick Creek Chestnut Ridge whitewater"
    ],
    "state": "Pennsylvania",
    "region": "Indiana County",
    "summary": "A 6.8-mile Class II-III(IV) Blacklick Creek reach from the Ghost Town Trail access near the PA 259 bridge at Heshbon to the Saylor Park/Blacklick take-out. American Whitewater ties the named corridor directly to USGS 03042000 and documents the access, rapids, portage options, and current hazards.",
    "statusText": "Use USGS 03042000 discharge. American Whitewater reports approximately 780 cfs as close to a minimum fun level and about 1,000 cfs as a good level; verify current discharge, strainers, acid-mine drainage conditions, and legal access before launching. This is an advanced moving-water route, not a casual float.",
    "latitude": 40.47345,
    "longitude": -79.09512,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "urban_water_quality",
        "cold_water",
        "access_uncertain"
      ],
      "safetyNotes": [
        "American Whitewater rates the reach Class II-III(IV), with ledges, boulder gardens, Auld's Run, and documented entrapment hazards around Jacks Rock and wood. Scout major features and portage when conditions or debris make the line uncertain.",
        "The Heshbon put-in is described from the Ghost Town Trail beyond a gate; verify current landowner, trail, gate, parking, and carry rules before using it. Do not use private banks or the old dam at the gauge as a substitute launch.",
        "Blacklick has a coal-mining and acid-mine-drainage history. Avoid contact with discolored tributary discharges and follow current local water-quality advisories. Wear a properly fitted PFD and use a whitewater-capable boat and helmet.",
        "The gauge is downstream/near the route corridor but not a safety guarantee. Flow, debris, mine releases, and weather can change rapidly; visually inspect the reach and never rely on a numeric threshold alone."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03042000",
      "provider": "usgs",
      "siteId": "03042000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Blacklick Creek at Josephine, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03042000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 1000,
      "tooLow": 780,
      "thresholdSource": {
        "label": "American Whitewater Blacklick Creek flow guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1582/main",
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
      "seasonNotes": "The reach is most likely to have runnable water during spring and rainfall events. Cold water, high flows, debris, and rapidly changing mine-influenced tributary conditions require same-day assessment.",
      "difficulty": "hard",
      "difficultyNotes": "Class II-III(IV) whitewater with a steep technical section, short pools, wood/strainer exposure, and a documented III+ feature at Auld's Run. Suitable only for experienced paddlers with appropriate craft and rescue skills.",
      "confidenceNotes": "Publication confidence is sufficient but intentionally conservative: American Whitewater names the exact 6.8-mile reach, direct USGS gauge, endpoint logistics, and hazards; the Ghost Town Trail access is corroborated by regional trail material; and independent watershed/DEP sources establish the Saylor Park and Heshbon locations. Thresholds remain community-derived and are presented as planning guidance, not a safety guarantee."
    },
    "putIn": {
      "id": "blacklick-creek-heshbon-ghost-town-trail",
      "name": "Ghost Town Trail Heshbon access near PA 259 bridge",
      "latitude": 40.47345,
      "longitude": -79.09512
    },
    "takeOut": {
      "id": "blacklick-creek-saylor-park",
      "name": "Saylor Park / Blacklick take-out",
      "latitude": 40.478162,
      "longitude": -79.187222
    },
    "logistics": {
      "distanceLabel": "Approximately 6.8 river miles",
      "estimatedPaddleTime": "About 3-5 on-water hours, plus scouting, shuttle, and possible portage time",
      "shuttle": "Arrange a two-vehicle shuttle. The Ghost Town Trail and local roads provide the approach, but do not assume every trail segment or bridge is a legal boat access point.",
      "permits": "Follow Pennsylvania Fish and Boat Commission registration/launch-permit requirements and all posted Indiana County, Ghost Town Trail, and access-owner rules.",
      "camping": "No on-route campsite was verified. Treat this as a day run and arrange lodging or camping separately; confirm current park and trail rules before planning an overnight.",
      "campingClassification": "none",
      "summary": "Plan as a technical day-run with a documented Heshbon access and Saylor Park finish, conservative flow guidance, and a shuttle arranged before launch.",
      "accessCaveats": [
        "American Whitewater describes driving to a gate to unload at the Heshbon access and parking back at the gravel lot; verify the gate and carry arrangement has not changed.",
        "The Saylor Park area provides parking and trail access, but creek-side carry/launch conditions and current public access must be confirmed on arrival.",
        "Do not use the Josephine gauge structure, private mine property, or unlisted riverbank as a launch or take-out."
      ],
      "watchFor": [
        "Auld's Run and other ledges",
        "Jacks Rock undercut and documented wood",
        "strainers after storms",
        "acid-mine-drainage tributaries and discolored water",
        "cold water and changing flow",
        "road, trail, and coal-truck crossings"
      ]
    },
    "evidenceNotes": [
      {
        "label": "Direct route and gauge",
        "value": "PA 259 Heshbon to Saylor Park; USGS 03042000",
        "note": "American Whitewater names this 6.8-mile reach, rates it Class II-III(IV), and ties it directly to Blacklick Creek at Josephine.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1582/main"
      },
      {
        "label": "Public endpoint support",
        "value": "Ghost Town Trail Heshbon access and Saylor Park/Blacklick finish",
        "note": "AW documents the Heshbon access and Saylor Park take-out; the Heshbon access location is corroborated by the regional trail waymark and the Saylor Park coordinate by the Ohio River Trail Council and DEP watershed records.",
        "sourceUrl": "https://www.waymarking.com/waymarks/WMF7HT"
      },
      {
        "label": "Threshold and live conditions",
        "value": "Conservative minimum-only planning guidance: 780 cfs; good level around 1,000 cfs",
        "note": "AW trip reports identify approximately 780 cfs as close to a minimum fun level and 1,000 cfs as a good level. The product uses these community references conservatively and requires current USGS discharge plus visual inspection.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03042000"
      },
      {
        "label": "Hazards and corridor condition",
        "value": "Technical ledges, wood, mine legacy, and rapidly changing conditions",
        "note": "AW documents Auld's Run, Jacks Rock, undercut/wood hazards, and changing access; the watershed association documents acid-mine-drainage history and difficult lower access.",
        "sourceUrl": "https://blacklickcreekwatershed.org/bcwa-history/about-blacklick-creek-watershed/"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Blacklick Creek route",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1582/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 03042000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03042000/",
        "provider": "usgs"
      },
      {
        "label": "Ghost Town Trail Heshbon access",
        "url": "https://www.waymarking.com/waymarks/WMF7HT",
        "provider": "local"
      },
      {
        "label": "Saylor Park coordinate and trail context",
        "url": "https://ohiorivertrail.org/attachments/Directors%20Information/268_ORTC%20Ghost%20Town%20Trail%20Ride%202012.pdf",
        "provider": "local"
      },
      {
        "label": "Blacklick Creek watershed access and condition context",
        "url": "https://blacklickcreekwatershed.org/bcwa-history/about-blacklick-creek-watershed/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "french-creek-cambridge-springs-conneautee",
    "slug": "french-creek-cambridge-springs-conneautee",
    "name": "French Creek",
    "reach": "Cambridge Springs to Conneauttee",
    "aliases": ["French Creek Water Trail - Cambridge Springs to Conneauttee", "French Creek Cambridge Springs Access to Conneauttee Access"],
    "state": "Pennsylvania",
    "region": "French Creek Valley",
    "summary": "A named public-access section of the French Creek Water Trail from Cambridge Springs to Conneauttee access, with mostly flat water, shallow riffles, oxbows, cottages, and woods. The official French Creek Paddling Guide directly ties this corridor to the Cambridge Springs USGS gauge.",
    "statusText": "Use USGS 03021890 at Cambridge Springs. The French Creek Paddling Guide describes 3-5 ft as ideal and warns that below 2 ft may be too shallow while above 5 ft may be unsafe; check for strainers and scout the Broadford Bridge area.",
    "latitude": 41.807222,
    "longitude": -80.043611,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["cold_water", "strainers", "low_water", "private_banks"],
      "safetyNotes": [
        "The official guide calls this section mostly flat and shallow with riffles, but specifically warns of strainers at Broadford Bridge and possible portage.",
        "Use a properly fitted PFD and whistle, check weather and water temperature, and do not launch when the gauge or river conditions exceed the published safe operating guidance.",
        "Use only the named Cambridge Springs and Conneauttee public access points; do not substitute private banks or bridge shoulders."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03021890",
      "provider": "usgs",
      "siteId": "03021890",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "French Creek at Cambridge Springs, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03021890/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3,
      "idealMax": 5,
      "tooLow": 2,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "French Creek Conservancy Paddling Guide water-level guidance",
        "url": "https://www.frenchcreekconservancy.org/wp-content/uploads/2025/06/250420-paddling-guide-625-final-proof.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "The guide recommends checking the gauge, temperature, and weather immediately before launching; cold water and sudden rain can change conditions quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "Mostly flat water but shallow riffles, strainers, and bridge hazards require competent boat control, scouting, and portage judgment.",
      "confidenceNotes": "Confidence is high for endpoint identity, direct gauge mapping, threshold guidance, access, and hazards because the French Creek Conservancy guide documents this exact water trail and names the Cambridge Springs gauge."
    },
    "evidenceNotes": [
      {"label": "Official route and access", "value": "Cambridge Springs access to Conneauttee access", "note": "The French Creek Paddling Guide names both public access points and describes the section as mostly flat, shallow water with riffles and oxbows.", "sourceUrl": "https://www.frenchcreekconservancy.org/wp-content/uploads/2025/06/250420-paddling-guide-625-final-proof.pdf"},
      {"label": "Direct live gauge", "value": "USGS 03021890 at Cambridge Springs", "note": "The guide lists the Cambridge Springs gauge for French Creek water-level checks.", "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03021890/"},
      {"label": "Water-level bands", "value": "3-5 ft ideal; 2-5 ft operating envelope", "note": "The official guide says French Creek is ideal between 3 and 5 ft and warns that under 2 ft may be too shallow and above 5 ft too high.", "sourceUrl": "https://www.frenchcreekconservancy.org/wp-content/uploads/2025/06/250420-paddling-guide-625-final-proof.pdf"},
      {"label": "Hazards", "value": "Broadford Bridge strainers and possible portage", "note": "Scout ahead for strainers, bridge current, shallow riffles, and changing river conditions.", "sourceUrl": "https://www.frenchcreekconservancy.org/wp-content/uploads/2025/06/250420-paddling-guide-625-final-proof.pdf"}
    ],
    "sourceLinks": [
      {"label": "French Creek Paddling Guide", "url": "https://www.frenchcreekconservancy.org/wp-content/uploads/2025/06/250420-paddling-guide-625-final-proof.pdf", "provider": "local"},
      {"label": "USGS 03021890 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03021890/", "provider": "usgs"},
      {"label": "French Creek Conservancy", "url": "https://www.frenchcreekconservancy.org/", "provider": "local"}
    ]
  },
  {
    "id": "french-creek-cochranton-utica",
    "slug": "french-creek-cochranton-utica",
    "name": "French Creek",
    "reach": "Cochranton Borough to Utica",
    "aliases": ["French Creek Water Trail - Cochranton to Utica", "French Creek Cochranton Borough to Utica Access"],
    "state": "Pennsylvania",
    "region": "French Creek Valley",
    "summary": "A documented lower French Creek Water Trail reach from Cochranton Borough to Utica Access, with mostly flat water, islands, riffles, forested views, and a documented approximately eight-mile paddle to the Utica take-out.",
    "statusText": "Use USGS 03024000 at Utica. The official French Creek guide describes 3-5 ft as ideal and warns that below 2 ft may be too shallow while above 5 ft may be unsafe; scout Saegertown Dam, Mile 19 rapids, and Polly's Rapids and portage when needed.",
    "latitude": 41.518768,
    "longitude": -80.053506,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["cold_water", "strainers", "low_water", "dam", "whitewater", "private_banks"],
      "safetyNotes": [
        "The official guide describes the reach as mostly flat and slow but warns about Saegertown Dam, Mile 19 rapids, Polly's Rapids, strainers, shallow water, and possible portage.",
        "Use a properly fitted PFD and whistle, check weather and water temperature, and do not launch when the gauge or river conditions exceed the published safe operating guidance.",
        "Use only the named Cochranton Borough and Utica public access points; do not substitute private banks or bridge shoulders."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03024000",
      "provider": "usgs",
      "siteId": "03024000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "French Creek at Utica, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03024000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3,
      "idealMax": 5,
      "tooLow": 2,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "French Creek Conservancy Paddling Guide water-level guidance",
        "url": "https://www.frenchcreekconservancy.org/wp-content/uploads/2025/06/250420-paddling-guide-625-final-proof.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "The guide recommends checking the gauge, temperature, and weather immediately before launching; cold water and sudden rain can change conditions quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "Mostly flat water, but the reach includes a dam, borderline Class I rapids, strainers, and possible portage decisions requiring competent boat control and scouting.",
      "confidenceNotes": "Confidence is high for endpoint identity, direct gauge mapping, threshold guidance, access, and hazards because the French Creek Conservancy guide and PFBC water-trail map document this exact corridor and the Utica gauge."
    },
    "evidenceNotes": [
      {"label": "Official route and access", "value": "Cochranton Borough to Utica Access", "note": "The French Creek Paddling Guide names both access points and describes approximately eight miles to Utica with flat water, islands, riffles, and forested views.", "sourceUrl": "https://www.frenchcreekconservancy.org/wp-content/uploads/2025/06/250420-paddling-guide-625-final-proof.pdf"},
      {"label": "Direct live gauge", "value": "USGS 03024000 at Utica", "note": "The guide lists the Utica gauge for French Creek water-level checks and the USGS monitoring page provides live gage height.", "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03024000/"},
      {"label": "Water-level bands", "value": "3-5 ft ideal; 2-5 ft operating envelope", "note": "The official guide says French Creek is ideal between 3 and 5 ft and warns that under 2 ft may be too shallow and above 5 ft too high.", "sourceUrl": "https://www.frenchcreekconservancy.org/wp-content/uploads/2025/06/250420-paddling-guide-625-final-proof.pdf"},
      {"label": "Hazards", "value": "Saegertown Dam, Mile 19 rapids, Polly's Rapids, strainers", "note": "Scout hazards ahead and portage whenever passage is uncertain.", "sourceUrl": "https://www.frenchcreekconservancy.org/wp-content/uploads/2025/06/250420-paddling-guide-625-final-proof.pdf"}
    ],
    "sourceLinks": [
      {"label": "French Creek Paddling Guide", "url": "https://www.frenchcreekconservancy.org/wp-content/uploads/2025/06/250420-paddling-guide-625-final-proof.pdf", "provider": "local"},
      {"label": "Lower French Creek Water Trail map", "url": "https://pfbc.pa.gov/watertrails/french/french-creek-lower.pdf", "provider": "local"},
      {"label": "USGS 03024000 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03024000/", "provider": "usgs"},
      {"label": "Utica Access coordinates", "url": "https://waterlandlife.org/watershed-conservation/canoe-access-development-fund-cadf/utica-access/", "provider": "local"}
    ]
  },
  {
    "id": "french-creek-union-city-dam-route-6n-19",
    "slug": "french-creek-union-city-dam-route-6n-19",
    "name": "French Creek",
    "reach": "Union City Dam to Routes 6N/19",
    "aliases": ["French Creek Water Trail - Union City Dam to Routes 6N/19", "French Creek Union City Dam to Route 6N/19 access"],
    "state": "Pennsylvania",
    "region": "French Creek Upper Water Trail",
    "summary": "An official upper French Creek Water Trail reach beginning at the below-dam Union City access and continuing to the public access near the US Routes 6N/19 junction, with a remote forested corridor and approximately twelve miles of paddling.",
    "statusText": "Use USGS 03021520 near Union City. The French Creek guide says 3-5 ft is ideal and warns that below 2 ft may be too shallow while above 5 ft may be unsafe. The Union City Dam is not passable; launch only below it and confirm the downstream access is open.",
    "latitude": 41.919722,
    "longitude": -79.901667,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["dam", "cold_water", "strainers", "low_water", "private_banks"],
      "safetyNotes": [
        "The Union City Dam is explicitly not passable. Use the mapped below-dam access and never approach or run the dam structure.",
        "The upper reach is narrow and can accumulate downed trees and strainers; scout ahead and portage whenever passage is uncertain.",
        "Use only the named Union City Dam and Routes 6N/19 public access points, follow posted parking rules, and do not substitute private banks or bridge shoulders."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03021520",
      "provider": "usgs",
      "siteId": "03021520",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "French Creek near Union City, PA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03021520/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3,
      "idealMax": 5,
      "tooLow": 2,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "French Creek Conservancy Paddling Guide water-level guidance",
        "url": "https://www.frenchcreekconservancy.org/wp-content/uploads/2025/06/250420-paddling-guide-625-final-proof.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "The guide recommends checking the gauge, temperature, and weather immediately before launching; the upper creek is narrower and more sensitive to downed trees and fast changes.",
      "difficulty": "moderate",
      "difficultyNotes": "Remote upper corridor with a dam-exclusion requirement, narrow channel, possible strainers, and a long day distance requiring competent boat control and a shuttle.",
      "confidenceNotes": "Confidence is high for the named upper-trail endpoints, direct Union City gauge association, threshold guidance, and dam hazard because the PFBC upper water-trail map and French Creek guide document this corridor and access pair."
    },
    "evidenceNotes": [
      {"label": "Official route and access", "value": "Union City Dam below-dam access to Routes 6N/19 access", "note": "The PFBC upper water-trail map names the below-dam launch, the Routes 6N/19 access, and approximately twelve miles of downstream trail context.", "sourceUrl": "https://pfbc.pa.gov/watertrails/french/french-creek-upper.pdf"},
      {"label": "Direct live gauge", "value": "USGS 03021520 near Union City", "note": "The station is the direct French Creek gauge for the upper Union City corridor.", "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03021520/"},
      {"label": "Water-level bands", "value": "3-5 ft ideal; 2-5 ft operating envelope", "note": "The official guide says French Creek is ideal between 3 and 5 ft and warns that under 2 ft may be too shallow and above 5 ft too high.", "sourceUrl": "https://www.frenchcreekconservancy.org/wp-content/uploads/2025/06/250420-paddling-guide-625-final-proof.pdf"},
      {"label": "Dam and strainer hazards", "value": "Union City Dam not passable; scout upper-creek strainers", "note": "The PFBC map marks the dam as not passable and warns that upper French Creek is susceptible to downed trees and changing strainers.", "sourceUrl": "https://pfbc.pa.gov/watertrails/french/french-creek-upper.pdf"}
    ],
    "sourceLinks": [
      {"label": "Upper French Creek Water Trail map", "url": "https://pfbc.pa.gov/watertrails/french/french-creek-upper.pdf", "provider": "local"},
      {"label": "French Creek Paddling Guide", "url": "https://www.frenchcreekconservancy.org/wp-content/uploads/2025/06/250420-paddling-guide-625-final-proof.pdf", "provider": "local"},
      {"label": "USGS 03021520 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03021520/", "provider": "usgs"}
    ]
  },
  {
    "id": "laurel-hill-creek-laurel-hill-state-park-kings-covered-bridge",
    "slug": "laurel-hill-creek-laurel-hill-state-park-kings-covered-bridge",
    "name": "Laurel Hill Creek",
    "reach": "Laurel Hill State Park Beach Area to King's Covered Bridge",
    "aliases": ["Laurel Hill Creek - Laurel Hill State Park to King's Bridge", "Laurel Hill State Park six-mile water trail", "Laurel Hill Creek - Beach Area to King's Covered Bridge"],
    "state": "Pennsylvania",
    "region": "Laurel Highlands",
    "summary": "A six-mile Laurel Hill Creek water trail from the named canoe/kayak launch in Laurel Hill State Park's Beach Area to the improved take-out at historic King's Covered Bridge. Pennsylvania DCNR names the water trail and both access contexts; the downstream USGS Ursina gauge is used conservatively with a station-specific 2.2 ft minimum from CanoeDraft.",
    "statusText": "Use the Laurel Hill Creek at Ursina gauge as a conservative same-creek reference. CanoeDraft identifies 2.2 ft as the minimum for the Laurel Hill State Park to Whipkey Dam run; this shorter upstream water-trail card keeps the same minimum-only floor and requires visual inspection because the gauge is downstream of King's Bridge.",
    "latitude": 39.9375,
    "longitude": -79.2711111,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "strainers", "cold_water", "private_banks"],
      "safetyNotes": [
        "The DCNR route begins at the Beach Area canoe/kayak launch and ends at an improved take-out at King's Covered Bridge; use only those named facilities and verify seasonal access, parking, and take-out conditions before launching.",
        "The 2.2 ft floor is a conservative minimum, not a guarantee of safe passage. Laurel Hill Creek is narrow and can change quickly after rain; scout wood, bridge approaches, shallow riffles, and any reach that looks different from the guide.",
        "The Ursina gauge is downstream of King's Bridge and is used as a same-creek proxy. Do not launch on a falling or rapidly rising hydrograph, and wear a PFD in the lake/creek transition and cold spring water.",
        "Carry the required Pennsylvania boat registration or launch permit and obey all state-park, PFBC, closure, and private-property rules."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {"id": "usgs-03080000", "provider": "usgs", "siteId": "03080000", "metric": "gage_height_ft", "unit": "ft", "kind": "proxy", "siteName": "Laurel Hill Creek at Ursina, PA", "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03080000/"},
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 2.2,
      "thresholdSource": {"label": "CanoeDraft Laurel Hill Creek minimum level", "url": "https://www.canoedraft.shaw-weil.com/gauge/", "provider": "manual"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "The state park water trail is a warm-season route, but spring-fed water remains cold and rainfall can change a narrow creek quickly. Confirm park opening, access, and current gauge conditions immediately before launch.",
      "difficulty": "moderate",
      "difficultyNotes": "The named six-mile trail is not presented as whitewater, but the narrow creek, shallow sections, wood, cold water, and downstream proxy gauge make this a moderate route requiring competent boat control and a current visual check.",
      "confidenceNotes": "Confidence is good for the route shape and access: Pennsylvania DCNR explicitly identifies the Beach Area canoe/kayak launch as part of a six-mile water trail ending at an improved King's Covered Bridge take-out. King's Bridge coordinates are independently published by a USGS water-quality station with mapping-grade GPS. The live USGS Ursina gauge and CanoeDraft's 2.2 ft station-specific floor support only a conservative proxy minimum; no official ideal or high-water band is claimed."
    },
    "evidenceNotes": [
      {"label": "Official route and endpoint names", "value": "Beach Area launch to King's Covered Bridge, six miles", "note": "Pennsylvania DCNR names the additional canoe/kayak launch in Beach Area and says it is part of a six-mile water trail ending at an improved take-out at historic King's Covered Bridge.", "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/laurel-hill-state-park/boating"},
      {"label": "King's Bridge coordinates", "value": "39.937500, -79.271111", "note": "The USGS Water Quality Portal identifies the named Laurel Hill Creek at King's Bridge site and reports mapping-grade GPS coordinates at the bridge.", "sourceUrl": "https://www.waterqualitydata.us/provider/NWIS/USGS-PA/USGS-03079744/"},
      {"label": "Live same-creek gauge", "value": "USGS 03080000 at Ursina, PA", "note": "The product uses the live Ursina stage gauge as a downstream same-creek proxy rather than implying that the gauge is at either route endpoint.", "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03080000/"},
      {"label": "Conservative minimum", "value": "2.2 ft minimum-only", "note": "CanoeDraft maps the Laurel Hill State Park to Whipkey Dam run to USGS 03080000 and identifies 2.2 ft as the minimum; PaddleToday applies it conservatively to this shorter upstream trail and does not claim an ideal/high band.", "sourceUrl": "https://canoedraft.shaw-weil.com/gauge/"},
      {"label": "Park access and permits", "value": "Beach Area launch; state-park/PFBC permits apply", "note": "DCNR says the Beach Area has a canoe/kayak launch and lists the registration and launch-permit options for non-powered boats.", "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/laurel-hill-state-park/boating"}
    ],
    "sourceLinks": [
      {"label": "DCNR Laurel Hill boating", "url": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/laurel-hill-state-park/boating", "provider": "local"},
      {"label": "USGS 03080000 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03080000/", "provider": "usgs"},
      {"label": "USGS King's Bridge coordinates", "url": "https://www.waterqualitydata.us/provider/NWIS/USGS-PA/USGS-03079744/", "provider": "usgs"},
      {"label": "CanoeDraft Laurel Hill gauge guidance", "url": "https://canoedraft.shaw-weil.com/gauge/", "provider": "manual"},
      {"label": "PA boat registration and launch rules", "url": "https://www.pa.gov/agencies/fishandboat/boating/paddlesports/launch-permit-vs-boat-reg", "provider": "local"}
    ]
  },
  {
    "id": "slippery-rock-creek-eckert-harris",
    "slug": "slippery-rock-creek-eckert-harris",
    "name": "Slippery Rock Creek",
    "reach": "Eckert Bridge to Harris Bridge",
    "aliases": ["Slippery Rock Creek - Eckert Bridge to Harris Bridge", "Lower Slippery Rock Creek", "Slippery Rock Creek Lower Run"],
    "state": "Pennsylvania",
    "region": "Western Pennsylvania",
    "summary": "A documented 3.5-mile lower Slippery Rock Creek run from Eckert Bridge to Harris Bridge in McConnells Mill State Park. Pennsylvania DCNR names the reach and endpoints; American Whitewater and local boater guidance tie runnable conditions to the Wurtemburg gauge.",
    "statusText": "Use USGS 03106500 at Wurtemburg. American Whitewater describes 400–1000 cfs as a strong intermediate window and below 150 cfs as too low; stand down for rising water, wood, bridge hazards, or conditions beyond your skill.",
    "latitude": 40.9404957,
    "longitude": -80.1764598,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["whitewater", "low_water", "fast_rise", "strainers", "cold_water", "mandatory_takeout"],
      "safetyNotes": [
        "This is a Class II–IV whitewater corridor whose difficulty changes with water level; it is for experienced paddlers with appropriate craft and rescue skills.",
        "Use the named Eckert Bridge access and Harris Bridge access. The lower run is downstream of the historic mill dam, but the broader corridor includes a mandatory dam portage; never run the dam and obey the park’s 50-foot boil exclusion.",
        "Treat 400–1000 cfs as an intermediate operating reference and below 150 cfs as too low; higher flows increase difficulty and hazards. These are not guarantees—inspect the live trend, weather, wood, and bridge approaches.",
        "Spring and fall are the documented boating seasons. Wear a PFD, use a shuttle, and do not attempt the reach alone or in a recreational boat unsuited to moving whitewater.",
        "No on-route camping was verified for this 3.5-mile reach; use only separately verified legal lodging or camping and follow Pennsylvania launch/registration rules."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {"id": "usgs-03106500", "provider": "usgs", "siteId": "03106500", "metric": "discharge_cfs", "unit": "cfs", "kind": "direct", "siteName": "Slippery Rock Creek at Wurtemburg, PA", "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03106500/"},
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 400,
      "idealMax": 1000,
      "tooLow": 150,
      "tooHigh": 1600,
      "thresholdSource": {"label": "American Whitewater Lower Slippery Rock gauge guidance", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/2504/main", "provider": "american_whitewater"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [3, 4, 5, 6, 9, 10, 11],
      "seasonNotes": "Pennsylvania DCNR identifies spring and fall as the best boating seasons; shoulder-season rainfall and releases can change difficulty quickly.",
      "difficulty": "hard",
      "difficultyNotes": "Experienced whitewater route with Class II–IV conditions, bridge hazards, wood, and a narrow decision window at low or high flow.",
      "confidenceNotes": "High confidence for route identity, named endpoints, direct gauge, and operating guidance: Pennsylvania DCNR names Rose Point-to-Harris as approximately six miles and explicitly identifies Eckert-to-Harris as an additional 3.5 miles; American Whitewater and Keel Hauler provide matching gauge guidance and endpoint coordinates."
    },
    "evidenceNotes": [
      {"label": "Official route and endpoints", "value": "Eckert Bridge to Harris Bridge, approximately 3.5 miles", "note": "Pennsylvania DCNR’s McConnells Mill boating page explicitly identifies the extension from Eckert Bridge to Harris Bridge.", "sourceUrl": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/mcconnells-mill-state-park/whitewater-boating"},
      {"label": "Live direct gauge and runnable window", "value": "USGS 03106500; 400–1000 cfs preferred, below 150 cfs too low", "note": "USGS supplies continuous discharge and stage telemetry; American Whitewater publishes the operating guidance for the lower run.", "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03106500"},
      {"label": "Endpoint coordinates", "value": "Eckert Bridge 40.940496,-80.176460; Harris Bridge 40.912008,-80.216728", "note": "Keel Hauler publishes the Eckert and Harris bridge coordinates; Harris Bridge coordinates are independently corroborated by topographic mapping.", "sourceUrl": "https://www.keelhauler.org/khcc/slip.pdf"},
      {"label": "Public access and safety", "value": "McConnells Mill State Park access; Class II–IV; mandatory dam portage in broader corridor", "note": "The Lawrence County water-trails brochure names Eckert and Harris access; DCNR publishes the whitewater and dam warnings.", "sourceUrl": "https://lawrencecountypa.gov/getmedia/5ea2d291-3ef6-4a0d-9cc1-d9ff38f32da4/LCWaterTrailsBrochure.pdf"},
      {"label": "Image rights decision", "value": "No route-specific image copied", "note": "Use existing rights-clean product imagery/default gallery treatment; do not copy source or map images."}
    ],
    "sourceLinks": [
      {"label": "Pennsylvania DCNR McConnells Mill whitewater boating", "url": "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/mcconnells-mill-state-park/whitewater-boating", "provider": "local"},
      {"label": "Lawrence County water-trails brochure", "url": "https://lawrencecountypa.gov/getmedia/5ea2d291-3ef6-4a0d-9cc1-d9ff38f32da4/LCWaterTrailsBrochure.pdf", "provider": "local"},
      {"label": "American Whitewater Lower Slippery Rock", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/2504/main", "provider": "american_whitewater"},
      {"label": "Keel Hauler Slippery Rock guide", "url": "https://www.keelhauler.org/khcc/slip.pdf", "provider": "manual"},
      {"label": "USGS 03106500 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03106500/", "provider": "usgs"}
    ]
  },
  {
    "id": "south-fork-tenmile-creek-beagle-club-clarksville",
    "slug": "south-fork-tenmile-creek-beagle-club-clarksville",
    "name": "South Fork Tenmile Creek",
    "reach": "Beagle Club Road Launch to Clarksville Kayak Launch",
    "aliases": ["Ten Mile Creek South Fork - Jefferson to Clarksville", "Tenmile Creek Beagle Club Road to Clarksville", "South Fork Tenmile Creek Jefferson to Clarksville"],
    "state": "Pennsylvania",
    "region": "Southwestern Pennsylvania",
    "summary": "A documented nine-mile South Fork Tenmile Creek water-trail reach from the named Beagle Club Road launch near Jefferson to the Clarksville Kayak Launch. Kayak Greene County publishes both endpoint names and the trip distance; CanoeDraft identifies the same Jefferson-to-Clarksville reach as canoeable with a conservative 2.0 ft minimum at the direct USGS gauge.",
    "statusText": "Use USGS 03073000 at Jefferson and treat 2.0 ft as a conservative minimum-only launch screen from the CanoeDraft gauge table. Check the live stage and trend, April–June seasonal guidance, weather, debris, and current access/permit rules before launching.",
    "latitude": 39.9723626,
    "longitude": -80.0462378,
    "routeType": "recreational",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["low_water", "fast_rise", "strainers", "cold_water", "private_banks", "access_uncertain"],
      "safetyNotes": [
        "CanoeDraft identifies 2.0 ft at USGS 03073000 as the lowest reported runnable stage for the Jefferson-to-Clarksville reach. This is an old, conservative minimum-only reference rather than a guarantee; stand down for rising water, debris, poor visibility, or unfamiliar conditions.",
        "Kayak Greene County names Beagle Club Road Launch and Clarksville Kayak Launch and notes that kayak registration or a launch-use permit may be required. Verify current parking, carry paths, permits, and any closure before using either endpoint.",
        "The reach is moving water with possible strainers, bridge approaches, cold water, and changing access conditions. Wear a PFD, carry a shuttle plan, and do not use private banks or unlisted roadside pull-offs.",
        "A local trip guide says April through June generally offers the best flow; weather and rainfall can change conditions quickly. Inspect the live gauge trend immediately before launch.",
        "No on-route camping was verified; use only separately verified legal campgrounds or lodging and follow Pennsylvania Fish and Boat Commission rules."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {"id": "usgs-03073000", "provider": "usgs", "siteId": "03073000", "metric": "gage_height_ft", "unit": "ft", "kind": "direct", "siteName": "South Fork Tenmile Creek at Jefferson, PA", "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03073000/"},
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 2,
      "thresholdSource": {"label": "CanoeDraft Western Pennsylvania gauge table", "url": "https://canoedraft.shaw-weil.com/gauge/", "provider": "manual"},
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [3, 4, 5, 6, 7, 8, 9, 10, 11],
      "seasonNotes": "A local Greene County trip guide says April–June generally has the best flow; check stage, trend, rainfall, debris, and access immediately before launch.",
      "difficulty": "moderate",
      "difficultyNotes": "Moving-water day run with low-water, fast-rise, wood, bridge, cold-water, shuttle, and access-verification considerations.",
      "confidenceNotes": "High confidence for a distinct named route, endpoint coordinates, direct live gauge, and conservative minimum-only threshold. Kayak Greene County publishes the nine-mile Beagle Club Road-to-Clarksville trip and both launch names; CanoeDraft maps the same Jefferson-to-Clarksville reach to USGS 03073000 and reports a 2.0 ft minimum. The threshold source is older and community-authored, so it is intentionally modeled as minimum-only rather than an ideal/high band."
    },
    "evidenceNotes": [
      {"label": "Named trip and endpoints", "value": "Beagle Club Road Launch to Clarksville Kayak Launch, 9 miles", "note": "Kayak Greene County lists the nine-mile Tenmile Creek trip and separately lists both launch areas.", "sourceUrl": "https://www.kayakgreenecounty.com/trip-ideas.html"},
      {"label": "Endpoint coordinates", "value": "Beagle Club Road 39.921925,-80.082823; Clarksville launch vicinity 39.972363,-80.046238", "note": "The launch-point page links named map pins for both endpoints; the links resolve to Google Maps coordinates.", "sourceUrl": "https://www.kayakgreenecounty.com/launch-points.html"},
      {"label": "Live direct gauge and minimum", "value": "USGS 03073000; 2.0 ft minimum-only", "note": "CanoeDraft maps both Jefferson-to-Clarksville reaches to the direct South Fork Tenmile Creek gauge and reports 2.0 ft as the lowest runnable stage; USGS provides continuous stage telemetry.", "sourceUrl": "https://canoedraft.shaw-weil.com/gauge/"},
      {"label": "Access, season, and permits", "value": "Kayak Greene County launch guidance; April–June best flow; permit may be required", "note": "The local guide names the launch areas, warns that registration or a launch-use permit may be required, and reports the seasonal flow guidance.", "sourceUrl": "https://www.kayakgreenecounty.com/trip-ideas.html"},
      {"label": "Image rights decision", "value": "No route-specific image copied", "note": "Use existing rights-clean product imagery/default gallery treatment; do not copy source or map images."}
    ],
    "sourceLinks": [
      {"label": "Kayak Greene County trip ideas", "url": "https://www.kayakgreenecounty.com/trip-ideas.html", "provider": "local"},
      {"label": "Kayak Greene County launch points", "url": "https://www.kayakgreenecounty.com/launch-points.html", "provider": "local"},
      {"label": "CanoeDraft Western Pennsylvania gauge table", "url": "https://canoedraft.shaw-weil.com/gauge/", "provider": "manual"},
      {"label": "USGS 03073000 monitoring location", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03073000/", "provider": "usgs"},
      {"label": "PFBC special boating regulations", "url": "https://pfbc.pa.gov/spbtregsx.htm", "provider": "local"}
    ]
  }
];
