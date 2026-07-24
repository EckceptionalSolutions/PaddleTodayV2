// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const retiredRiverTripDetails: Record<string, RiverTripDetails> = {
  "kansas-river-de-soto-kaw-point": {
    "putIn": {
      "name": "De Soto Access Ramp / Riverfest Park",
      "latitude": 38.98496,
      "longitude": -94.9746
    },
    "takeOut": {
      "name": "Kaw Point Park Access Ramp",
      "latitude": 39.11601,
      "longitude": -94.61203
    },
    "logistics": {
      "distanceLabel": "About 31.3 mi",
      "estimatedPaddleTime": "Best planned as a very long day; roughly 10 hr to 13 hr including the WaterOne portage, wind delays, and the final Kaw Point approach",
      "shuttle": "Stage the take-out at Kaw Point Park before driving back to the De Soto ramp. Check park hours, event closures, and the upper parking requirement first, then inspect the WaterOne portage plan before committing to the launch.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "Treat this as a committed day route, not an overnight plan. Friends of the Kaw says the lower controlled reach has almost no sandbars, and the final Kaw Point approach is a busy urban finish rather than a camping corridor.",
      "campingClassification": "none",
      "summary": "Launch at De Soto and take out at Kaw Point for the full lower-Kaw continuation into Kansas City. The route requires the WaterOne low-head-dam portage and ends before the Missouri River; do not treat the Missouri confluence as part of this route.",
      "accessCaveats": [
        "The De Soto ramp is public, but Friends of the Kaw notes city-event closures and a sandbar that can form at the toe of the ramp.",
        "Edwardsville is the last simple public access before the mandatory WaterOne portage. Inspect that contingency before launch rather than assuming you can improvise on private banks.",
        "The WaterOne portage is a rough 100+ yard carry over large loose rocks. Wheels and carts are not useful, and high water can require an earlier landing on slick mud upstream.",
        "Kaw Point Park closes nightly from 10:00 pm to 7:00 am, may close for special events, and requires parking in the upper lot while keeping the ramp clear.",
        "Make the Kaw Point take-out cleanly. The Missouri River is about 200 yards downstream and is a separate, faster, big-river environment."
      ],
      "watchFor": [
        "WaterOne low-head dam at river mile 14.8. Land river left well above the structure, avoid the river-right low-water notch, and do not enter the dam hydraulic.",
        "Low flows below about 1,000 cfs can expose mud, slow the lower channel, and make landings more awkward.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "This lower reach has well-defined banks and almost no sandbars, so do not count on easy mid-route stops.",
        "Wind in the open lower valley, storms, rising water, floating wood, strainers, bridge current, bank hooks and fishing lines, and industrial riverfront traffic.",
        "Private banks along the Kaw; stay with public ramps, the documented portage, and legal stops rather than climbing banks or using private land."
      ]
    },
    "accessPoints": [
      {
        "id": "de-soto-riverfest-park",
        "name": "De Soto Access Ramp / Riverfest Park",
        "latitude": 38.98496,
        "longitude": -94.9746,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the full lower-Kaw corridor."
      },
      {
        "id": "edwardsville-river-front-park",
        "name": "Edwardsville Access Ramp / River Front Park",
        "latitude": 39.05056,
        "longitude": -94.81665,
        "mileFromStart": 14.7,
        "segmentKind": "creek",
        "note": "Last simple public access before the WaterOne dam portage."
      },
      {
        "id": "turner-bridge-access",
        "name": "Turner Bridge Access Ramp",
        "latitude": 39.09396,
        "longitude": -94.71176,
        "mileFromStart": 22.1,
        "segmentKind": "creek",
        "note": "Downstream access option after the WaterOne portage."
      },
      {
        "id": "kaw-point-park",
        "name": "Kaw Point Park Access Ramp",
        "latitude": 39.11601,
        "longitude": -94.61203,
        "mileFromStart": 31.3,
        "segmentKind": "creek",
        "note": "Default full-corridor take-out before the Missouri River confluence."
      }
    ]
  },
  "kansas-river-manhattan-belvue": {
    "putIn": {
      "name": "Manhattan K-177 / Fairmont Access Ramp",
      "latitude": 39.17428,
      "longitude": -96.55318
    },
    "takeOut": {
      "name": "Belvue Access Ramp",
      "latitude": 39.20284,
      "longitude": -96.17552
    },
    "logistics": {
      "distanceLabel": "About 30.5 mi",
      "estimatedPaddleTime": "Best planned as a very long day or conservative overnight; roughly 9.5 hr to 13 hr depending on wind, low water, and stop strategy",
      "shuttle": "Stage the take-out at Belvue before driving back to the Manhattan K-177 / Fairmont access. Inspect Belvue first because the take-out comes just below the partial low-head dam hazard and the ramp can change with sand, mud, or high-water cleanup.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "This route is long enough that conservative sandbar camping may make more sense than a single push. Friends of the Kaw says you can camp on public sandbars between the high-water marks without a special permit, but private banks above that line are off-limits and sandbars become scarce above about 8,000 cfs.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch below the K-177 bridge in Manhattan and take out at Belvue for a full upper-Kaw continuation through St. George and Wamego. The Wamego USGS gauge is direct in the route corridor, but the finish still requires careful Belvue dam planning.",
      "accessCaveats": [
        "The Manhattan K-177 / Fairmont ramp has limited parking and nearby Blue River current can change when Tuttle Creek releases rise.",
        "At Wamego, Friends of the Kaw says it is often advisable to pass under the K-99 bridge and turn upstream next to the bank to reach the ramp; keep that line in mind if you stop or regroup there.",
        "The Belvue partial low-head dam is at river mile 120, about one mile above the Belvue ramp. Friends of the Kaw says the dam begins on river right and extends more than halfway across the river; stay river left and watch for exposed or submerged rocks.",
        "Stay with public ramps and legal sandbar stops between the high-water marks. The banks above the river are private property."
      ],
      "watchFor": [
        "The partial low-head dam and associated exposed or submerged rocks near Belvue. Do not run right-side dam structures, and do not attempt this finish if visibility, flow, or group skill makes the left-side line uncertain.",
        "Low flows below about 1,000 cfs can make the channel narrow and sandbar or rock navigation slow and technical.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "Wind across open bends, storms, rising water, floating wood, strainers, and bank hooks or fishing lines left in shoreline trees.",
        "Private banks along the Kaw; do not plan on using them for rest, camping, or bailout access."
      ]
    },
    "accessPoints": [
      {
        "id": "manhattan-fairmont-access",
        "name": "Manhattan K-177 / Fairmont Access Ramp",
        "latitude": 39.17428,
        "longitude": -96.55318,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access for the full upper-Kaw corridor."
      },
      {
        "id": "st-george-boggs-landing",
        "name": "St. George / Boggs Landing Access Ramp",
        "latitude": 39.18726,
        "longitude": -96.42202,
        "mileFromStart": 13.5,
        "segmentKind": "creek",
        "note": "Intermediate public access for a shorter Belvue run."
      },
      {
        "id": "wamego-access",
        "name": "Wamego Access Ramp",
        "latitude": 39.19828,
        "longitude": -96.30537,
        "mileFromStart": 22,
        "segmentKind": "creek",
        "note": "Public ramp below K-99 and a practical checkpoint before the Belvue dam reach."
      },
      {
        "id": "belvue-access",
        "name": "Belvue Access Ramp",
        "latitude": 39.20284,
        "longitude": -96.17552,
        "mileFromStart": 30.5,
        "segmentKind": "creek",
        "note": "Default downstream access just below the partial low-head-dam hazard."
      }
    ]
  },
  "kansas-river-blue-river-belvue": {
    "putIn": {
      "name": "Linear Park / Blue River Access Ramp",
      "latitude": 39.19331,
      "longitude": -96.55763
    },
    "takeOut": {
      "name": "Belvue Access Ramp",
      "latitude": 39.20284,
      "longitude": -96.17552
    },
    "logistics": {
      "distanceLabel": "About 29.5 mi",
      "estimatedPaddleTime": "Best planned as a very long day or conservative overnight; roughly 9 hr to 12.5 hr depending on wind, low water, and stop strategy",
      "shuttle": "Stage the take-out at Belvue before driving back to the Linear Park / Blue River access. Inspect Belvue first because the take-out comes just below the partial low-head dam hazard and the ramp can change with sand, mud, or high-water cleanup.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "This route is long enough that conservative sandbar camping may make more sense than a single push. Friends of the Kaw says you can camp on public sandbars between the high-water marks without a special permit, but private banks above that line are off-limits and sandbars become scarce above about 8,000 cfs.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch from Linear Park on the Blue River, join the Kansas River almost immediately downstream, and take out at Belvue for a full upper-Kaw continuation through St. George and Wamego. The Wamego USGS gauge is direct in the route corridor, but the finish still requires careful Belvue dam planning.",
      "accessCaveats": [
        "The Blue River launch sits just upstream of the Kansas confluence, so release-driven current can change the feel of the first reach before the river opens up into the Kaw.",
        "At Wamego, Friends of the Kaw says it is often advisable to pass under the K-99 bridge and turn upstream next to the bank to reach the ramp; keep that line in mind if you stop or regroup there.",
        "The Belvue partial low-head dam is at river mile 120, about one mile above the Belvue ramp. Friends of the Kaw says the dam begins on river right and extends more than halfway across the river; stay river left and watch for exposed or submerged rocks.",
        "Stay with public ramps and legal sandbar stops between the high-water marks. The banks above the river are private property."
      ],
      "watchFor": [
        "The partial low-head dam and associated exposed or submerged rocks near Belvue. Do not run right-side dam structures, and do not attempt this finish if visibility, flow, or group skill makes the left-side line uncertain.",
        "Low flows below about 1,000 cfs can make the channel narrow and sandbar or rock navigation slow and technical.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "Wind across open bends, storms, rising water, floating wood, strainers, and bank hooks or fishing lines left in shoreline trees.",
        "Private banks along the Kaw; do not plan on using them for rest, camping, or bailout access."
      ]
    },
    "accessPoints": [
      {
        "id": "blue-river-linear-park-access",
        "name": "Linear Park / Blue River Access Ramp",
        "latitude": 39.19331,
        "longitude": -96.55763,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access just above the Kansas River confluence."
      },
      {
        "id": "st-george-boggs-landing",
        "name": "St. George / Boggs Landing Access Ramp",
        "latitude": 39.18726,
        "longitude": -96.42202,
        "mileFromStart": 11.5,
        "segmentKind": "creek",
        "note": "Intermediate public access for the shorter St. George day route."
      },
      {
        "id": "wamego-access",
        "name": "Wamego Access Ramp",
        "latitude": 39.19828,
        "longitude": -96.30537,
        "mileFromStart": 20,
        "segmentKind": "creek",
        "note": "Public ramp below K-99 and a practical checkpoint before the Belvue dam reach."
      },
      {
        "id": "belvue-access",
        "name": "Belvue Access Ramp",
        "latitude": 39.20284,
        "longitude": -96.17552,
        "mileFromStart": 29.5,
        "segmentKind": "creek",
        "note": "Default downstream access just below the partial low-head-dam hazard."
      }
    ]
  },
  "kansas-river-st-george-belvue": {
    "putIn": {
      "id": "st-george-boggs-landing",
      "name": "St. George / Boggs Landing Access Ramp",
      "latitude": 39.18726,
      "longitude": -96.42202
    },
    "takeOut": {
      "id": "belvue-access",
      "name": "Belvue Access Ramp",
      "latitude": 39.20284,
      "longitude": -96.17552
    },
    "logistics": {
      "distanceLabel": "About 18 mi",
      "estimatedPaddleTime": "About 5.5 hr to 8 hr, longer with wind, low water, sandbar scouting, or a long regroup at Wamego",
      "shuttle": "Stage the take-out at Belvue before driving back to St. George / Boggs Landing. Inspect Belvue first because the take-out comes just below the partial low-head dam hazard and the ramp can change with sand, mud, or high-water cleanup.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "This can stay a long day trip, but conservative sandbar camping is sometimes possible on public sandbars between the high-water marks. Friends of the Kaw says private banks above that line are off-limits and sandbars become scarce above about 8,000 cfs.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at St. George / Boggs Landing and take out at Belvue for a shorter upper-Kaw route that still includes the Wamego checkpoint and the Belvue partial dam hazard. The Wamego USGS gauge is direct for this corridor, and the current July 3 reading sits well above the ideal band.",
      "accessCaveats": [
        "St. George / Boggs Landing is a basic public ramp. Confirm ramp condition and parking before leaving a vehicle because mud, flood cleanup, or local access work can change usability.",
        "At Wamego, Friends of the Kaw says it is often advisable to pass under the K-99 bridge and turn upstream next to the bank to reach the ramp; keep that line in mind if you stop or regroup there.",
        "The Belvue partial low-head dam is at river mile 120, about one mile above the Belvue ramp. Friends of the Kaw says the dam begins on river right and extends more than halfway across the river; stay river left and watch for exposed or submerged rocks.",
        "Stay with public ramps and legal sandbar stops between the high-water marks. The banks above the river are private property."
      ],
      "watchFor": [
        "The partial low-head dam and associated exposed or submerged rocks near Belvue. Do not run right-side dam structures, and do not attempt this finish if visibility, flow, or group skill makes the left-side line uncertain.",
        "Low flows below about 1,000 cfs can make the channel narrow and sandbar or rock navigation slow and technical.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "Wind across open bends, storms, rising water, floating wood, strainers, and bank hooks or fishing lines left in shoreline trees.",
        "Private banks along the Kaw; do not plan on using them for rest, camping, or bailout access."
      ]
    },
    "accessPoints": [
      {
        "id": "st-george-boggs-landing",
        "name": "St. George / Boggs Landing Access Ramp",
        "latitude": 39.18726,
        "longitude": -96.42202,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access for the shorter St. George to Belvue corridor."
      },
      {
        "id": "wamego-access",
        "name": "Wamego Access Ramp",
        "latitude": 39.19828,
        "longitude": -96.30537,
        "mileFromStart": 8.5,
        "segmentKind": "creek",
        "note": "Public ramp below K-99 and the clearest mid-route checkpoint before the Belvue dam reach."
      },
      {
        "id": "belvue-access",
        "name": "Belvue Access Ramp",
        "latitude": 39.20284,
        "longitude": -96.17552,
        "mileFromStart": 18,
        "segmentKind": "creek",
        "note": "Default downstream access just below the partial low-head-dam hazard."
      }
    ]
  },
  "kansas-river-belvue-kaw-river-state-park": {
    "putIn": {
      "name": "Belvue Access Ramp",
      "latitude": 39.20284,
      "longitude": -96.17552
    },
    "takeOut": {
      "name": "Kaw River State Park Access Ramp",
      "latitude": 39.06907,
      "longitude": -95.75342
    },
    "logistics": {
      "distanceLabel": "About 29 mi",
      "estimatedPaddleTime": "Best planned as an overnight; roughly 9.5 hr to 11 hr of moving time before wind, low water, scouting, or camp logistics",
      "shuttle": "Stage the take-out at Kaw River State Park in Topeka before driving back to Belvue. This is the longest normal access gap on the Kansas River Water Trail, so confirm both ramps, vehicle access, weather, and the group plan before launching.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted state-park and city/county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "Plan overnight stops only on exposed sandbars and only when current law and same-day river conditions support it. Banks above the river are private; do not camp, picnic, portage, or climb banks without permission. High flows can remove sandbar camp options entirely.",
      "summary": "Launch at Belvue and take out at Kaw River State Park in Topeka for a 29-mile public Kansas River Water Trail segment. Friends of the Kaw describes this as non-novice and suitable as an overnight when sandbars are available; the Topeka Weir USGS gauge is near the downstream end.",
      "accessCaveats": [
        "Friends of the Kaw says Belvue to Kaw River State Park is a 29-mile stretch with no normal intermediate access. Do not launch unless the group can complete the distance or has a legal emergency plan.",
        "Kaw River State Park gates are locked at night even though Friends of the Kaw says parking is allowed 24 hours; verify current state-park access, parking, and retrieval logistics before leaving a vehicle.",
        "The Kaw River State Park ramp can have a sandbar at its base after high water, and low water may require carrying boats and gear across sand.",
        "The Topeka Water Plant low-head dam is two miles below Kaw River State Park. End at the state park unless your group has a separate dam portage or paddler-chute plan.",
        "All access and parking are subject to same-day city, county, state-park, and ramp conditions. Mud, silt, high-water closures, locked gates, and shifted sand can change ramp usability."
      ],
      "watchFor": [
        "Long exposed mileage, fatigue, heat, storms, and wind across open bends. This is not a novice day-trip distance.",
        "Low flows below about 1,000 cfs can make the channel narrow and make sandbar navigation slow, while very low water can turn 29 miles into a much longer effort.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops are scarce, which also undermines overnight camp planning.",
        "Floating wood, strainers, bank hooks and fishing lines, changing sandbars, and private banks along the Kaw.",
        "Use only public ramps and legal sandbar stops; do not rely on private banks or road bridges as planned exits."
      ]
    }
  },
  "pine-river-lincoln-peterson": {
    "putIn": {
      "id": "lincoln-bridge",
      "name": "Lincoln Bridge Campground Boat Launch",
      "latitude": 44.13303,
      "longitude": -85.69622
    },
    "takeOut": {
      "id": "peterson-bridge",
      "name": "Peterson Bridge Boat Launch",
      "latitude": 44.20708,
      "longitude": -85.80027
    },
    "logistics": {
      "distanceLabel": "15.8 mi",
      "estimatedPaddleTime": "Long day, about 5.25 hr on-water before stops, wood delays, or scouting",
      "shuttle": "Use a two-car Pine River shuttle from Peterson Bridge back to Lincoln Bridge. This is a long forest-road day with intermediate access at Elm Flats and Dobson Bridge if the group needs shorter options.",
      "permits": "Check current Pine National Scenic River permit and day-use rules before launch. Rivers.gov describes a Forest Service watercraft permit system and access fees in the corridor, and Recreation.gov/Forest Service rules can change by season and access point.",
      "camping": "Treat this as a long day trip unless you have separately confirmed legal camping. Rivers.gov says camping on National Forest lands within the corridor is allowed only at designated sites, and access/campground fees may apply.",
      "summary": "Launch at Lincoln Bridge Campground Boat Launch and take out at Peterson Bridge Boat Launch for the upper half of the managed Pine Scenic River corridor. Use the Hoxeyville USGS gauge as a conservative low-water check and plan around fast current, wood, and a long shuttle.",
      "accessCaveats": [
        "Lincoln Bridge is a Michigan DNR carry-in launch with limited parking; Peterson Bridge is a U.S. Forest Service carry-in launch with larger parking, restroom, and fee details in Outdoor Michigan.",
        "Elm Flats and Dobson Bridge are official U.S. Forest Service carry-in launches between the endpoints and can be used to shorten the day if permits, parking, and group logistics allow.",
        "The Hoxeyville gauge is downstream on the same Pine River corridor. It is useful for same-day flow, but storm damage, wood, and landing congestion still need a same-day local check."
      ],
      "watchFor": [
        "Fast current, tight bends, shallow riffles, sweepers, logjams, and stumps piled into outside turns.",
        "Scraping and more technical boat control when the Hoxeyville gauge falls below the 170 cfs floor used by the app.",
        "Busy summer permit traffic, cold water, narrow passages, limited quick exits, and private land away from designated access points.",
        "Do not launch without checking current Forest Service / Recreation.gov rules, access fees, and recent Pine River hazard reports."
      ]
    }
  },
  "shiawassee-river-byron-brady-street": {
    "putIn": {
      "id": "byron-high-school-ball-fields",
      "name": "Byron High School Ball Fields concrete launch",
      "latitude": 42.840348,
      "longitude": -83.945658
    },
    "takeOut": {
      "id": "brady-street",
      "name": "Brady Street dirt launch",
      "latitude": 42.9766,
      "longitude": -84.116539
    },
    "logistics": {
      "distanceLabel": "About 29.1 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "Full corridor is a long day or staged series. Common planner pairings are about 3 to 8 mi.",
      "shuttle": "Choose a public or managed access pair, stage the downstream vehicle first, then inspect both landings before launching.",
      "permits": "No route-specific paddling permit is known, but Walnut Hills is private campground access. Confirm current public launch/take-out availability, seasonal dates, parking fee, and campground rules before leaving a vehicle there.",
      "camping": "Walnut Hills is managed campground context, but the corridor should be treated as staged day trips unless overnight arrangements are confirmed.",
      "campingClassification": "nearby_basecamp",
      "summary": "Use this as the upper Shiawassee access-planner corridor from Byron to Brady Street, with Walnut Hills, Geeck Road, Shiatown, and Lytle Road options.",
      "accessCaveats": [
        "The full corridor is a planning envelope, not the default casual day trip.",
        "Shiatown requires attention to the dam-adjacent launch and take-out context.",
        "Confirm campground, county park, and landing rules before leaving vehicles."
      ],
      "watchFor": [
        "Dam-adjacent logistics and faster current around Shiatown.",
        "Wood, strainers, and tight bends after rain.",
        "Low-water scraping when the Owosso gauge is near the minimum floor."
      ]
    },
    "accessPoints": [
      {
        "id": "byron-high-school-ball-fields",
        "name": "Byron High School Ball Fields concrete launch",
        "latitude": 42.840348,
        "longitude": -83.945658,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default corridor put-in."
      },
      {
        "id": "walnut-hills-family-campground",
        "name": "Walnut Hills Family Campground dirt launch",
        "latitude": 42.840348,
        "longitude": -84.009418,
        "mileFromStart": 4.87,
        "segmentKind": "creek",
        "note": "Campground access and shorter-trip endpoint."
      },
      {
        "id": "geeck-road-county-park",
        "name": "Geeck Road County Park cement ramp",
        "latitude": 42.884522,
        "longitude": -84.045106,
        "mileFromStart": 11.85,
        "segmentKind": "creek",
        "note": "County park access and midpoint option."
      },
      {
        "id": "shiatown-county-park",
        "name": "Shiatown County Park take-out above the dam",
        "latitude": 42.929408,
        "longitude": -84.071308,
        "mileFromStart": 18.06,
        "segmentKind": "creek",
        "note": "Dam-adjacent park access; inspect before launching."
      },
      {
        "id": "lytle-road-county-park",
        "name": "Lytle Road County Park bank launch",
        "latitude": 42.9766,
        "longitude": -84.069441,
        "mileFromStart": 25.89,
        "segmentKind": "creek",
        "note": "Lower upper-corridor access."
      },
      {
        "id": "brady-street",
        "name": "Brady Street dirt launch",
        "latitude": 42.9766,
        "longitude": -84.116539,
        "mileFromStart": 29.09,
        "segmentKind": "creek",
        "note": "Default corridor finish."
      }
    ]
  },
  "shiawassee-river-mccurdy-cole-park": {
    "putIn": {
      "id": "mccurdy-park",
      "name": "Corunna McCurdy Park carry-in launch",
      "latitude": 42.98614,
      "longitude": -84.124008
    },
    "takeOut": {
      "id": "cole-park",
      "name": "Cole Park launch",
      "latitude": 43.185325,
      "longitude": -84.112656
    },
    "logistics": {
      "distanceLabel": "About 29 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "Full corridor is a long day or staged series. Common planner pairings are about 5.5 to 9.2 mi.",
      "shuttle": "Choose a public access pair, stage the downstream vehicle first, then inspect both landings before launching.",
      "permits": "No route-specific paddling permit is known. Follow City of Corunna, City of Owosso, and water-trail access rules, and use only designated launches or landings.",
      "camping": "Treat this as a day-trip corridor. No on-route camping plan is assumed.",
      "summary": "Use this as the lower Shiawassee access-planner corridor from McCurdy Park to Cole Park, with Harmon Patridge, Henderson, and Ditch Road options.",
      "accessCaveats": [
        "The full corridor is a planning envelope; choose shorter park-to-park sections for ordinary day trips.",
        "Confirm county park, city park, and landing rules before leaving vehicles.",
        "Stay with public accesses rather than using private banks as backup exits."
      ],
      "watchFor": [
        "Wood and strainers after rain.",
        "High, fast water above the warning band.",
        "Low-water scraping and muddy banks."
      ]
    },
    "accessPoints": [
      {
        "id": "mccurdy-park",
        "name": "Corunna McCurdy Park carry-in launch",
        "latitude": 42.98614,
        "longitude": -84.124008,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default corridor put-in."
      },
      {
        "id": "harmon-patridge",
        "name": "Harmon Patridge Park launch",
        "latitude": 43.020112,
        "longitude": -84.184547,
        "mileFromStart": 6.49,
        "segmentKind": "creek",
        "note": "Park access and shorter-trip endpoint."
      },
      {
        "id": "henderson-county-park",
        "name": "Henderson County Park cement launch",
        "latitude": 43.087788,
        "longitude": -84.181933,
        "mileFromStart": 14.27,
        "segmentKind": "creek",
        "note": "County park access for mid-corridor plans."
      },
      {
        "id": "ditch-road",
        "name": "Ditch Road gravel launch",
        "latitude": 43.143842,
        "longitude": -84.13413,
        "mileFromStart": 23.47,
        "segmentKind": "creek",
        "note": "Lower corridor access."
      },
      {
        "id": "cole-park",
        "name": "Cole Park launch",
        "latitude": 43.185325,
        "longitude": -84.112656,
        "mileFromStart": 28.95,
        "segmentKind": "creek",
        "note": "Default corridor finish."
      }
    ]
  },
  "clinton-river-rotary-budd": {
    "putIn": {
      "id": "rotary-park-sterling-heights",
      "name": "Rotary Park accessible launch",
      "latitude": 42.570595,
      "longitude": -82.971459
    },
    "takeOut": {
      "id": "budd-park",
      "name": "Budd Park carry-in launch",
      "latitude": 42.586506,
      "longitude": -82.927598
    },
    "logistics": {
      "distanceLabel": "About 3.6 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2 hr, longer with low water, wood, or scouting",
      "shuttle": "Stage the take-out at Budd Park in Clinton Township, then drive back to Rotary Park in Sterling Heights. Check both landings before launching because riverbank conditions and access signage can change after high water.",
      "permits": "No route-specific paddling permit is known. Follow Sterling Heights and Clinton Township park, launch, and parking rules at both public access sites.",
      "camping": "Treat this as a short day trip. No on-route camping plan is assumed on this lower Clinton connector.",
      "summary": "Launch from Rotary Park and take out at Budd Park for a short lower Clinton connector between the Sterling Heights and Clinton Township public launches. Use the Sterling Heights gauge as a same-day warning check and expect more scraping than speed when the gauge sits below the CRWC low-water warning.",
      "accessCaveats": [
        "Rotary Park is a free public accessible launch in Sterling Heights with an EZDock system and riverside parking.",
        "Clinton Township lists Budd Park as a public canoe/kayak launch with parking and park amenities.",
        "Stay with the named public launches and do not substitute private banks or roadside spots if wood blocks the main line."
      ],
      "watchFor": [
        "Low-water scraping and slower travel when the Sterling Heights gauge is below the CRWC 8 ft warning floor.",
        "Fast rises after rain, bridge-current lines, floating wood, and fresh strainers in the urban corridor.",
        "Urban stormwater and sewer-overflow water-quality concerns after wet weather."
      ]
    }
  },
  "clinton-river-budd-macarthur": {
    "putIn": {
      "id": "budd-park",
      "name": "Budd Park carry-in launch",
      "latitude": 42.586506,
      "longitude": -82.927598
    },
    "takeOut": {
      "id": "neil-dempsey-macarthur-park",
      "name": "Neil Dempsey Launch at MacArthur Park",
      "latitude": 42.597338,
      "longitude": -82.871104
    },
    "logistics": {
      "distanceLabel": "About 6.4 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "About 2 hr to 3 hr for the full corridor, shorter when ending at Shadyside Park.",
      "shuttle": "Choose Budd, Shadyside, or MacArthur as the selected endpoints, stage the downstream vehicle first, and inspect the take-out.",
      "permits": "No route-specific paddling permit is known. Follow Clinton Township, Mount Clemens, and Clinton River Water Trail access rules at both public launches.",
      "camping": "Treat this as an urban day-trip corridor. No on-route camping plan is assumed.",
      "summary": "Use this as the Mount Clemens lower Clinton access-planner corridor from Budd Park to MacArthur Park, with Shadyside Park as the midpoint.",
      "accessCaveats": [
        "Shadyside Park is the practical split point for shorter beginner-oriented outings.",
        "Identify posted weir or dam warnings before continuing into the Mount Clemens reach.",
        "Stay with mapped water-trail accesses and avoid private banks."
      ],
      "watchFor": [
        "Mount Clemens weir or dam-warning signage and any required portage or avoidance line.",
        "High water, woody debris, and urban stormwater after rain.",
        "Do not continue toward Harley Ensign or Lake St. Clair without a separate open-water and boat-traffic plan."
      ]
    },
    "accessPoints": [
      {
        "id": "budd-park",
        "name": "Budd Park carry-in launch",
        "latitude": 42.586506,
        "longitude": -82.927598,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default corridor put-in."
      },
      {
        "id": "shadyside-park",
        "name": "Shadyside Park boat and canoe launch",
        "latitude": 42.582529,
        "longitude": -82.880104,
        "mileFromStart": 4.4,
        "segmentKind": "creek",
        "note": "Midpoint and shorter-trip finish option."
      },
      {
        "id": "neil-dempsey-macarthur-park",
        "name": "Neil Dempsey Launch at MacArthur Park",
        "latitude": 42.597338,
        "longitude": -82.871104,
        "mileFromStart": 6.4,
        "segmentKind": "creek",
        "note": "Default corridor finish."
      }
    ]
  },
  "clinton-river-budd-shadyside": {
    "putIn": {
      "id": "budd-park",
      "name": "Budd Park carry-in launch",
      "latitude": 42.586506,
      "longitude": -82.927598
    },
    "takeOut": {
      "id": "shadyside-park",
      "name": "Shadyside Park boat and canoe launch",
      "latitude": 42.582529,
      "longitude": -82.880104
    },
    "logistics": {
      "distanceLabel": "About 4.4 mi",
      "estimatedPaddleTime": "About 2 hr, longer with low water, wood, or landing checks",
      "shuttle": "Stage the take-out at Shadyside Park in Mount Clemens, then return to Budd Park to launch. Inspect the Shadyside landing first because riverbank wood and park activity can change the finish.",
      "permits": "No route-specific paddling permit is known. Follow Clinton Township, Mount Clemens, and posted Clinton River Water Trail access rules at both public parks.",
      "camping": "Treat this as a day trip. No on-route camping plan is assumed between Budd Park and Shadyside Park.",
      "summary": "Launch at Budd Park and take out at Shadyside Park for a slower lower-Clinton day that CRWC still frames as the best beginner stretch on the river. Use the Sterling Heights gauge as a conservative warning check and keep rain-driven wood or water-quality issues visible in the same-day call.",
      "accessCaveats": [
        "Clinton Township lists Budd Park as a public canoe/kayak launch.",
        "Mount Clemens says Shadyside Park has a handicapped accessible pier with a boat and canoe launch.",
        "Shadyside is the intended finish. Do not improvise on private banks if the current is slower or the launch is busy."
      ],
      "watchFor": [
        "Low-water scraping and slower current below the CRWC 8 ft low-water warning.",
        "High, fast water, wood, strainers, and bridge-current hazards after rain.",
        "Urban stormwater and sewer-overflow water-quality concerns after wet weather."
      ]
    }
  },
  "green-river-dennison-ferry-brownsville-city-park": {
    "putIn": {
      "id": "dennison-ferry",
      "name": "Dennison Ferry",
      "latitude": 37.2174,
      "longitude": -86.0493
    },
    "takeOut": {
      "id": "brownsville-city-park",
      "name": "Brownsville City Park",
      "latitude": 37.1964,
      "longitude": -86.2757
    },
    "logistics": {
      "distanceLabel": "About 23.6 mi",
      "estimatedPaddleTime": "About 8 hr to 11 hr as a single push, longer with ferry delays, gravel-bar breaks, scouting, or a slower group pace",
      "shuttle": "Stage the take-out at Brownsville City Park, then drive back to Dennison Ferry Day Use Area. Build in real road time, verify current ferry and road status before leaving vehicles, and start early enough that the Brownsville finish does not happen at dusk.",
      "permits": "No permit is required for a same-day paddle, but this route is inside Mammoth Cave National Park for most of the day and follows NPS boating rules. If you intend to break it into an overnight, use only legal campsites and carry the required riverside camping permit.",
      "camping": "This is the longest Mammoth Cave Green route currently added in this pass. NPS says lower-water gravel bars and low riverbanks can support paddler camping with a valid riverside permit, and Houchins Ferry Campground is the cleanest legal midpoint stop if the group splits the route.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at Dennison Ferry and continue all the way to Brownsville City Park for a very long lower Green River day. The direct Mammoth Cave gauge still anchors the route, but the current July 14 reading sits above the broad beginner-friendly band and the downstream Brownsville rapid keeps the finish consequential.",
      "accessCaveats": [
        "Dennison Ferry is day-use only with a carry-down launch. Do not plan to camp or leave gear spread across the access.",
        "The route passes the Green River Ferry crossing and then Houchins Ferry Campground before the final Brownsville leg. Those are the clearest legal checkpoints if the group does not want to commit to the full finish.",
        "Brownsville City Park is the intended public take-out. NPS says private land begins after the park boundary, so do not improvise a longer continuation without fresh access research.",
        "Cell service can be limited in the park and ferry, road, or river conditions can change without notice. Set the plan before launching."
      ],
      "watchFor": [
        "Current levels near or above 15 ft, when this long route becomes meaningfully more consequential for casual paddlers, and launch closures at or above 20 ft.",
        "Swift current, submerged trees, logjams, gravel-bar shifts, drifting debris, and muddy or slick access surfaces.",
        "Ferry traffic at Green River Ferry, fatigue over a full-day commitment, exposed sun, and fewer practical bailout options than the shorter Mammoth Cave segments.",
        "The class 2 rapid left by former Lock and Dam 6 shortly before Brownsville Boat Ramp. Scout or portage conservatively if the group is uncertain."
      ]
    },
    "accessPoints": [
      {
        "id": "dennison-ferry",
        "name": "Dennison Ferry",
        "latitude": 37.2174,
        "longitude": -86.0493,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default full-corridor put-in."
      },
      {
        "id": "green-river-ferry",
        "name": "Green River Ferry",
        "latitude": 37.1795,
        "longitude": -86.1123,
        "mileFromStart": 7.6,
        "segmentKind": "creek",
        "note": "Mid-corridor access and ferry crossing; follow NPS ferry-contact guidance."
      },
      {
        "id": "houchins-ferry",
        "name": "Houchins Ferry",
        "latitude": 37.2024,
        "longitude": -86.2376,
        "mileFromStart": 20,
        "segmentKind": "creek",
        "note": "Best legal midpoint campground and bailout before the final Brownsville leg."
      },
      {
        "id": "brownsville-city-park",
        "name": "Brownsville City Park",
        "latitude": 37.1964,
        "longitude": -86.2757,
        "mileFromStart": 23.6,
        "segmentKind": "creek",
        "note": "Default downstream finish at the public Brownsville ramp."
      }
    ]
  },
  "barren-river-tailwater-vpa-3": {
    "putIn": {
      "id": "barren-river-lake-tailwater",
      "name": "Barren River Lake Tailwater",
      "latitude": 36.8947,
      "longitude": -86.1348
    },
    "takeOut": {
      "id": "barren-river-vpa-3",
      "name": "Barren River VPA #3",
      "latitude": 36.9333,
      "longitude": -86.2043
    },
    "logistics": {
      "distanceLabel": "About 13.3 mi",
      "estimatedPaddleTime": "About 4 hr to 7 hr, longer with fishing stops, low-water dragging, or upstream-wind slowdown",
      "shuttle": "Stage the take-out at Barren River VPA #3 on Highway 101, then drive back to the Barren River Lake Tailwater campground launch. The shuttle is straightforward, but the float itself is long enough that daylight and weather matter.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and obey the VPA landowner rules at the downstream access.",
      "camping": "The tailwater launch sits at a KDFWR access with campground amenities, but the route itself should still be planned as a long day float. Barren River VPA #3 is private property opened for public access and does not allow camping, fires, or alcohol.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch below Barren River Lake and take out at Barren River VPA #3 for the longer lower-Barren segment. Use the Finney stage gauge and expect the route to feel low whenever the river sits below KDFWR's 78.0 to 78.5 ft good band.",
      "accessCaveats": [
        "The tailwater access is a public ramp with campground-style amenities, but release changes and open-water wind can make the day feel bigger than a casual flatwater float.",
        "Barren River VPA #3 is a voluntary public access site on private property. KDFWR says no camping, no fires, no alcohol, and no swimming at the access.",
        "This is the longest of the three adds in this batch. Start early enough to avoid finishing the carry-out at dusk if the current is low.",
        "The route uses a stage gauge rather than a cfs gauge, so trend, recent rain, and release context still matter."
      ],
      "watchFor": [
        "Low water below about 78.0 ft, when shoals, slow pools, and dragging become more likely across a long day.",
        "High water above about 78.5 ft, when current at bends and the VPA landing becomes less forgiving.",
        "Broad-river wind, heat exposure, boat traffic near the tailwater area, and changing current after releases or rain.",
        "Private banks, woody debris, and the limited-room VPA take-out at the end of a long float."
      ]
    }
  },
  "juniata-river-granville-mifflin": {
    "putIn": {
      "id": "granville-pfbc-ramp",
      "name": "Granville PFBC ramp",
      "latitude": 40.558333,
      "longitude": -77.603056
    },
    "takeOut": {
      "id": "mifflin-ramp",
      "name": "Mifflin ramp",
      "latitude": 40.569167,
      "longitude": -77.401111
    },
    "logistics": {
      "distanceLabel": "About 17 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "Full corridor is a long day. Common access-planner pairings are about 5 to 11 mi.",
      "shuttle": "Choose a public access pair, stage the downstream vehicle first, and inspect both landings before committing.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, boating, and PFD rules.",
      "camping": "Treat this as a day-trip corridor. Nearby campground context does not make private banks or islands open camping.",
      "campingClassification": "nearby_basecamp",
      "summary": "Use this as the Lewistown-area lower Juniata access-planner corridor from Granville to Mifflin with Victory Park, Lewistown Narrows, and Mifflintown options.",
      "accessCaveats": [
        "The full corridor is a planning envelope; many users should choose a shorter pair such as Granville to Victory Park or Victory Park to Lewistown Narrows.",
        "Inspect the selected take-out before launching because broad-river current and mud can make a missed landing consequential.",
        "Stay with public accesses rather than using private banks or islands as backup exits."
      ],
      "watchFor": [
        "The PFBC mile-43 ledge and rough water pushing toward a cut bank.",
        "Low-water scraping below the Lewistown gauge floor.",
        "Bridge remnants, fresh wood, open-bend wind, and private shorelines."
      ]
    },
    "accessPoints": [
      {
        "id": "granville-pfbc-ramp",
        "name": "Granville PFBC ramp",
        "latitude": 40.558333,
        "longitude": -77.603056,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default corridor put-in."
      },
      {
        "id": "victory-park-access",
        "name": "Victory Park access",
        "latitude": 40.595,
        "longitude": -77.578889,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Lewistown-area short-trip access."
      },
      {
        "id": "lewistown-narrows-pfbc-ramp",
        "name": "Lewistown Narrows PFBC ramp",
        "latitude": 40.603889,
        "longitude": -77.487778,
        "mileFromStart": 11,
        "segmentKind": "creek",
        "note": "PFBC access below the mile-43 ledge area."
      },
      {
        "id": "mifflintown-pfbc-ramp",
        "name": "Mifflintown PFBC ramp",
        "latitude": 40.595,
        "longitude": -77.415278,
        "mileFromStart": 15,
        "segmentKind": "creek",
        "note": "Mifflintown option before the Mifflin finish."
      },
      {
        "id": "mifflin-ramp",
        "name": "Mifflin ramp",
        "latitude": 40.569167,
        "longitude": -77.401111,
        "mileFromStart": 17,
        "segmentKind": "creek",
        "note": "Default corridor finish."
      }
    ]
  },
  "juniata-river-lewistown-narrows-walker": {
    "putIn": {
      "id": "lewistown-narrows-pfbc-ramp",
      "name": "Lewistown Narrows PFBC ramp",
      "latitude": 40.603889,
      "longitude": -77.487778
    },
    "takeOut": {
      "id": "walker-pfbc-ramp",
      "name": "Walker PFBC ramp",
      "latitude": 40.531944,
      "longitude": -77.357222
    },
    "logistics": {
      "distanceLabel": "About 10 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr in ordinary conditions, longer if low water forces channel picking or if headwind stalls progress through the exposed middle bends",
      "shuttle": "Stage the take-out at Walker PFBC first, then drive back upstream to the Lewistown Narrows PFBC ramp. Check both ramp edges before leaving a vehicle because mud and current angle can shift after rain.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, boating, and PFD rules.",
      "camping": "No established camping is identified for this Narrows-to-Walker segment. Treat it as a day trip.",
      "campingClassification": "none",
      "summary": "Launch at Lewistown Narrows and take out at Walker PFBC for a longer middle lower-Juniata link. The app uses the Lewistown gauge conservatively as an upstream same-river proxy and expects scraping whenever that corridor sits under PFBC's 3.1 ft minimum.",
      "accessCaveats": [
        "PFBC publishes both Lewistown Narrows and Walker coordinates directly in the official lower Juniata access table.",
        "The gauge story here stays conservative because Lewistown is upstream of this route, not on top of it.",
        "Use only the named public accesses rather than bridge shoulders or private banks.",
        "This segment is broad enough for wind to matter more than the mileage suggests on an exposed day."
      ],
      "watchFor": [
        "Rapid current near mile 33, the main caution point PFBC flags in this corridor.",
        "Low water under the conservative Lewistown 3.1 ft proxy floor, when broad cobble bars and slower channels can force dragging.",
        "Fresh wood after storms, muddy landing edges, and broad-river wind across exposed bends.",
        "Private shorelines away from the named public accesses and the temptation to improvise on bars because the route looks simple."
      ]
    }
  },
  "juniata-river-mifflin-muskrat-springs": {
    "putIn": {
      "id": "mifflin-ramp",
      "name": "Mifflin ramp",
      "latitude": 40.569167,
      "longitude": -77.401111
    },
    "takeOut": {
      "id": "muskrat-springs-pfbc-ramp",
      "name": "Muskrat Springs PFBC ramp",
      "latitude": 40.535,
      "longitude": -77.299444
    },
    "logistics": {
      "distanceLabel": "About 8 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "About 3 hr to 5 hr for the full corridor, shorter if using Walker PFBC as a midpoint.",
      "shuttle": "Stage the take-out at Walker or Muskrat Springs, then drive back to the selected upstream access.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, boating, and PFD rules.",
      "camping": "Treat this as a day-trip corridor unless separate legal camping arrangements are confirmed.",
      "summary": "Use this as the short lower Juniata access-planner corridor from Mifflin to Muskrat Springs, with Walker PFBC as the midpoint.",
      "accessCaveats": [
        "Walker PFBC is the practical split point for shorter plans.",
        "Confirm ramp mud, parking, and same-day current direction before leaving vehicles.",
        "Stay with public accesses rather than using private banks or islands as backup exits."
      ],
      "watchFor": [
        "Low-water bars and slow pools.",
        "Fresh wood and bridge current after storms.",
        "Broad-river wind on exposed bends."
      ]
    },
    "accessPoints": [
      {
        "id": "mifflin-ramp",
        "name": "Mifflin ramp",
        "latitude": 40.569167,
        "longitude": -77.401111,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default corridor put-in."
      },
      {
        "id": "walker-pfbc-ramp",
        "name": "Walker PFBC ramp",
        "latitude": 40.531944,
        "longitude": -77.357222,
        "mileFromStart": 4,
        "segmentKind": "creek",
        "note": "Midpoint access for shorter outings."
      },
      {
        "id": "muskrat-springs-pfbc-ramp",
        "name": "Muskrat Springs PFBC ramp",
        "latitude": 40.535,
        "longitude": -77.299444,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Default corridor finish."
      }
    ]
  },
  "south-fork-kentucky-river-oneida-fish-creek": {
    "putIn": {
      "id": "oneida-ramp",
      "name": "Oneida Ramp",
      "latitude": 37.2726,
      "longitude": -83.6532
    },
    "takeOut": {
      "id": "fish-creek-boat-ramp",
      "name": "Fish Creek Boat Ramp",
      "latitude": 37.4906,
      "longitude": -83.6894
    },
    "logistics": {
      "distanceLabel": "About 33.7 mi",
      "estimatedPaddleTime": "About 9 hr to 12 hr, longer with low water, fishing, or scouting",
      "shuttle": "Stage the take-out at Fish Creek Boat Ramp north of Booneville, then drive back to Oneida Ramp. This is the full KDFWR South Fork access-chain commitment, so inspect both endpoints first and make sure the group is prepared for an all-day river shuttle.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day ramp or roadside parking limits.",
      "camping": "Treat this as a very long day trip. KDFWR lists no camping at Oneida, Kay Wood, or Fish Creek, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Oneida Ramp and take out about 33.7 miles downstream at Fish Creek Boat Ramp for the full South Fork Kentucky River access-chain float. KDFWR gives a good Booneville gauge band of 350 to 900 cfs, or 4.8 to 6.0 ft.",
      "accessCaveats": [
        "Oneida Ramp is a free single-lane concrete launch with paved parking, but no listed amenities or camping.",
        "Fish Creek is a free single-lane paved ramp with gravel parking and no listed amenities or camping.",
        "The current Booneville gauge reading was below the official good band during this run, so expect more scraping, slower shoals, and a longer day than the official mileage alone suggests.",
        "Stay with the named public access points and do not assume side banks, bars, or private-adjacent ground are legal stopping points."
      ],
      "watchFor": [
        "Low water below 350 cfs or 4.8 ft, when shallow shoals, rock bars, and dragging become more likely over a very long full-corridor day.",
        "High water above 900 cfs or 6.0 ft, when the broad river moves faster and muddy landings become less forgiving around bends, wood, and ramps.",
        "Wood, strainers, mud banks, occasional riffles, private banks outside the access sites, and fatigue from repeated low-water line scouting over a dawn-to-dusk route."
      ]
    },
    "accessPoints": [
      {
        "id": "oneida-ramp",
        "name": "Oneida Ramp",
        "latitude": 37.2726,
        "longitude": -83.6532,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the full South Fork chain."
      },
      {
        "id": "rocky-branch-road-access",
        "name": "Rocky Branch Road Access",
        "latitude": 37.3206,
        "longitude": -83.6648,
        "mileFromStart": 6.8,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "cedar-valley-road-access",
        "name": "Cedar Valley Road Access",
        "latitude": 37.3363,
        "longitude": -83.656,
        "mileFromStart": 9.3,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "bishop-bend-school-road-access",
        "name": "Bishop Bend School Road Access",
        "latitude": 37.3377,
        "longitude": -83.6882,
        "mileFromStart": 14,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "hacker-branch-road-access",
        "name": "Hacker Branch Road Access",
        "latitude": 37.3743,
        "longitude": -83.6708,
        "mileFromStart": 17.3,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "upper-wolf-creek-ramp",
        "name": "Upper Wolf Creek Ramp",
        "latitude": 37.3964,
        "longitude": -83.6767,
        "mileFromStart": 20.2,
        "segmentKind": "creek",
        "note": "Developed ramp access in the lower corridor."
      },
      {
        "id": "kay-wood-road-access",
        "name": "Kay Wood Road Access",
        "latitude": 37.4594,
        "longitude": -83.6509,
        "mileFromStart": 25.8,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "fish-creek-boat-ramp",
        "name": "Fish Creek Boat Ramp",
        "latitude": 37.4906,
        "longitude": -83.6894,
        "mileFromStart": 33.7,
        "segmentKind": "creek",
        "note": "Default take-out for the full South Fork chain."
      }
    ]
  },
  "south-fork-kentucky-river-cedar-valley-fish-creek": {
    "putIn": {
      "id": "cedar-valley-road-access",
      "name": "Cedar Valley Road Access",
      "latitude": 37.3363,
      "longitude": -83.656
    },
    "takeOut": {
      "id": "fish-creek-boat-ramp",
      "name": "Fish Creek Boat Ramp",
      "latitude": 37.4906,
      "longitude": -83.6894
    },
    "logistics": {
      "distanceLabel": "About 24.4 mi",
      "estimatedPaddleTime": "About 7.5 hr to 10.5 hr, longer with low water, fishing, or scouting",
      "shuttle": "Stage the take-out at Fish Creek Boat Ramp north of Booneville, then drive back to Cedar Valley Road Access. Cedar Valley is a simple carry-down launch, so inspect both ends first and make sure the group is ready for a long downstream commitment.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day roadside parking limits.",
      "camping": "Treat this as a committed day trip. KDFWR lists no camping at Cedar Valley, Kay Wood, or Fish Creek, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Cedar Valley Road Access and take out about 24.4 miles downstream at Fish Creek Boat Ramp for a long lower South Fork Kentucky River float. KDFWR gives a good Booneville gauge band of 350 to 900 cfs, or 4.8 to 6.0 ft.",
      "accessCaveats": [
        "Cedar Valley is a carry-down-only gravel-and-dirt access with limited parking and no amenities.",
        "Fish Creek is a free single-lane paved ramp with gravel parking and no listed amenities or camping.",
        "The current Booneville gauge reading was above the official good band during this run, so expect faster current, muddier landings, and a longer day than the official mileage alone suggests.",
        "Stay with the named public access points and do not assume side banks, bars, or private-adjacent ground are legal stopping points."
      ],
      "watchFor": [
        "Low water below 350 cfs or 4.8 ft, when shallow shoals, rock bars, and dragging become more likely over a very long lower-corridor day.",
        "High water above 900 cfs or 6.0 ft, when the broad river moves faster and muddy landings become less forgiving around bends, wood, and ramps.",
        "Wood, strainers, mud banks, occasional riffles, private banks outside the access sites, and fatigue from repeated line scouting over an all-day route."
      ]
    },
    "accessPoints": [
      {
        "id": "cedar-valley-road-access",
        "name": "Cedar Valley Road Access",
        "latitude": 37.3363,
        "longitude": -83.656,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for this long lower-chain route."
      },
      {
        "id": "bishop-bend-school-road-access",
        "name": "Bishop Bend School Road Access",
        "latitude": 37.3377,
        "longitude": -83.6882,
        "mileFromStart": 4.7,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "hacker-branch-road-access",
        "name": "Hacker Branch Road Access",
        "latitude": 37.3743,
        "longitude": -83.6708,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "upper-wolf-creek-ramp",
        "name": "Upper Wolf Creek Ramp",
        "latitude": 37.3964,
        "longitude": -83.6767,
        "mileFromStart": 10.9,
        "segmentKind": "creek",
        "note": "Developed ramp access in the lower corridor."
      },
      {
        "id": "kay-wood-road-access",
        "name": "Kay Wood Road Access",
        "latitude": 37.4594,
        "longitude": -83.6509,
        "mileFromStart": 16.5,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "fish-creek-boat-ramp",
        "name": "Fish Creek Boat Ramp",
        "latitude": 37.4906,
        "longitude": -83.6894,
        "mileFromStart": 24.4,
        "segmentKind": "creek",
        "note": "Default take-out for this route."
      }
    ]
  },
  "south-fork-kentucky-river-oneida-upper-wolf-creek": {
    "putIn": {
      "id": "oneida-ramp",
      "name": "Oneida Ramp",
      "latitude": 37.2726,
      "longitude": -83.6532
    },
    "takeOut": {
      "id": "upper-wolf-creek-ramp",
      "name": "Upper Wolf Creek Ramp",
      "latitude": 37.3964,
      "longitude": -83.6767
    },
    "logistics": {
      "distanceLabel": "About 20.2 mi",
      "estimatedPaddleTime": "About 6.5 hr to 9 hr, longer with low water, fishing, or scouting",
      "shuttle": "Stage the take-out at Upper Wolf Creek Ramp, then drive back to Oneida Ramp. Oneida is the easier paved launch, while Upper Wolf Creek is the more developed paved-ramp finish; the middle chain between them still has limited bailout comfort and simple dirt-road accesses.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day ramp or roadside parking limits.",
      "camping": "Treat this as a committed day trip. KDFWR lists no camping at Oneida or Upper Wolf Creek, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Oneida Ramp and take out about 20.2 miles downstream at Upper Wolf Creek Ramp for a full upper-middle South Fork Kentucky River float. KDFWR gives a good Booneville gauge band of 350 to 900 cfs, or 4.8 to 6.0 ft.",
      "accessCaveats": [
        "Oneida Ramp is a free single-lane concrete launch with paved parking, but no listed amenities or camping.",
        "Upper Wolf Creek is a free single-lane paved ramp with year-round 24-hour availability, unpaved parking, and no camping.",
        "The current Booneville gauge reading during this run sat just below the official good band, so expect scrape-prone shoals, slower progress, and muddier line choices than on a cleaner green-light day.",
        "Stay with the named public access points and do not assume side banks, bars, or private-adjacent ground are legal stopping points."
      ],
      "watchFor": [
        "Low water below 350 cfs or 4.8 ft, when shallow shoals, rock bars, and dragging become more likely over a long chained day.",
        "High water above 900 cfs or 6.0 ft, when the broad river moves faster and muddy landings become less forgiving.",
        "Wood, strainers, mud banks, occasional riffles, private banks outside the access sites, and fatigue from repeated low-water line scouting."
      ]
    },
    "accessPoints": [
      {
        "id": "oneida-ramp",
        "name": "Oneida Ramp",
        "latitude": 37.2726,
        "longitude": -83.6532,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the long upper-middle route."
      },
      {
        "id": "rocky-branch-road-access",
        "name": "Rocky Branch Road Access",
        "latitude": 37.3206,
        "longitude": -83.6648,
        "mileFromStart": 6.8,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "cedar-valley-road-access",
        "name": "Cedar Valley Road Access",
        "latitude": 37.3363,
        "longitude": -83.656,
        "mileFromStart": 9.3,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "bishop-bend-school-road-access",
        "name": "Bishop Bend School Road Access",
        "latitude": 37.3377,
        "longitude": -83.6882,
        "mileFromStart": 14,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "hacker-branch-road-access",
        "name": "Hacker Branch Road Access",
        "latitude": 37.3743,
        "longitude": -83.6708,
        "mileFromStart": 17.3,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "upper-wolf-creek-ramp",
        "name": "Upper Wolf Creek Ramp",
        "latitude": 37.3964,
        "longitude": -83.6767,
        "mileFromStart": 20.2,
        "segmentKind": "creek",
        "note": "Default take-out for the long upper-middle route."
      }
    ]
  },
  "south-fork-kentucky-river-rocky-branch-bishop-bend": {
    "putIn": {
      "id": "rocky-branch-road-access",
      "name": "Rocky Branch Road Access",
      "latitude": 37.3206,
      "longitude": -83.6648
    },
    "takeOut": {
      "id": "bishop-bend-school-road-access",
      "name": "Bishop Bend School Road Access",
      "latitude": 37.3377,
      "longitude": -83.6882
    },
    "logistics": {
      "distanceLabel": "About 7.2 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low water, fishing, or scouting",
      "shuttle": "Stage the take-out at Bishop Bend School Road Access, then drive back to Rocky Branch Road Access. Both landings are simple carry-down sites, so inspect parking, mud, and footing before leaving the shuttle.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day roadside parking limits.",
      "camping": "Treat this as a day trip. KDFWR lists no camping at Rocky Branch, Cedar Valley, or Bishop Bend, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Rocky Branch Road Access and take out about 7.2 miles downstream at Bishop Bend School Road Access for a shorter South Fork Kentucky River split. KDFWR gives a good Booneville gauge band of 350 to 900 cfs, or 4.8 to 6.0 ft.",
      "accessCaveats": [
        "Rocky Branch is a carry-down-only gravel-and-dirt access with limited parking and no amenities.",
        "Bishop Bend is a gravel-and-dirt carry-down with only a small dirt parking area and no amenities.",
        "The current Booneville gauge reading was inside the official good band during this run, but same-day mud, wood, and changed shoal lines still control the real launch call.",
        "Stay with the named public access points and do not assume side banks, bars, or private-adjacent ground are legal stopping points."
      ],
      "watchFor": [
        "Low water below 350 cfs or 4.8 ft, when shallow shoals, rock bars, and dragging become more likely.",
        "High water above 900 cfs or 6.0 ft, when the broad river moves faster and muddy landings become less forgiving.",
        "Wood, strainers, mud banks, occasional riffles, and private banks outside the access sites."
      ]
    },
    "accessPoints": [
      {
        "id": "rocky-branch-road-access",
        "name": "Rocky Branch Road Access",
        "latitude": 37.3206,
        "longitude": -83.6648,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for this upper-middle South Fork split."
      },
      {
        "id": "cedar-valley-road-access",
        "name": "Cedar Valley Road Access",
        "latitude": 37.3363,
        "longitude": -83.656,
        "mileFromStart": 2.5,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "bishop-bend-school-road-access",
        "name": "Bishop Bend School Road Access",
        "latitude": 37.3377,
        "longitude": -83.6882,
        "mileFromStart": 7.2,
        "segmentKind": "creek",
        "note": "Default take-out for this route."
      }
    ]
  },
  "south-fork-kentucky-river-bishop-bend-hacker-branch": {
    "putIn": {
      "id": "bishop-bend-school-road-access",
      "name": "Bishop Bend School Road Access",
      "latitude": 37.3377,
      "longitude": -83.6882
    },
    "takeOut": {
      "id": "hacker-branch-road-access",
      "name": "Hacker Branch Road Access",
      "latitude": 37.3743,
      "longitude": -83.6708
    },
    "logistics": {
      "distanceLabel": "About 3.3 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer with low water, fishing, or scouting",
      "shuttle": "Stage the take-out at Hacker Branch Road Access, then drive back to Bishop Bend School Road Access. Both are simple carry-down accesses, so inspect parking, mud, and bank footing before leaving the shuttle.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day roadside parking limits.",
      "camping": "Treat this as a short day trip. KDFWR lists no camping at Bishop Bend or Hacker Branch, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Bishop Bend School Road Access and take out about 3.3 miles downstream at Hacker Branch Road Access for a short South Fork Kentucky River split. KDFWR gives a good Booneville gauge band of 350 to 900 cfs, or 4.8 to 6.0 ft.",
      "accessCaveats": [
        "Bishop Bend is a gravel-and-dirt carry-down with only a small dirt parking area and no amenities.",
        "Hacker Branch is a bridge-side carry-down with unpaved roadside parking and no amenities.",
        "The current Booneville gauge reading was inside the official good band during this run, but same-day mud, wood, and changed shoal lines still control the real launch call.",
        "Stay with the named public access points and do not assume side banks, bars, or private-adjacent ground are legal stopping points."
      ],
      "watchFor": [
        "Low water below 350 cfs or 4.8 ft, when shallow shoals and dragging become more likely.",
        "High water above 900 cfs or 6.0 ft, when the broad river moves faster and the short split becomes less forgiving.",
        "Wood, strainers, mud banks, occasional riffles, and private banks outside the access sites."
      ]
    },
    "accessPoints": [
      {
        "id": "bishop-bend-school-road-access",
        "name": "Bishop Bend School Road Access",
        "latitude": 37.3377,
        "longitude": -83.6882,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for this short lower split."
      },
      {
        "id": "hacker-branch-road-access",
        "name": "Hacker Branch Road Access",
        "latitude": 37.3743,
        "longitude": -83.6708,
        "mileFromStart": 3.3,
        "segmentKind": "creek",
        "note": "Default take-out for this route."
      }
    ]
  },
  "south-fork-kentucky-river-hacker-branch-fish-creek": {
    "putIn": {
      "id": "hacker-branch-road-access",
      "name": "Hacker Branch Road Access",
      "latitude": 37.3743,
      "longitude": -83.6708
    },
    "takeOut": {
      "id": "fish-creek-boat-ramp",
      "name": "Fish Creek Boat Ramp",
      "latitude": 37.4906,
      "longitude": -83.6894
    },
    "logistics": {
      "distanceLabel": "About 16.4 mi",
      "estimatedPaddleTime": "About 5.5 hr to 8 hr, longer with low water, fishing, or scouting",
      "shuttle": "Stage the take-out at Fish Creek Boat Ramp, then drive back to Hacker Branch Road Access. Hacker Branch is a simpler bridge-side carry-down with unpaved parking, while Fish Creek is the easier paved-ramp finish.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day roadside parking limits.",
      "camping": "Treat this as a committed day trip. KDFWR lists no camping at Hacker Branch, Upper Wolf Creek, Kay Wood, or Fish Creek, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Hacker Branch Road Access and take out about 16.4 miles downstream at Fish Creek Boat Ramp for a full lower South Fork Kentucky River float. KDFWR gives a good Booneville gauge band of 350 to 900 cfs, or 4.8 to 6.0 ft.",
      "accessCaveats": [
        "Hacker Branch is a bridge-side carry-down with unpaved parking and no developed amenities.",
        "Fish Creek is a free single-lane paved ramp with gravel parking and no listed amenities or camping.",
        "The current Booneville gauge reading was just below the official good band during this run, so expect more scraping, slower shoals, and a longer day than the official mileage alone suggests.",
        "Stay with the named public access points and do not assume side banks, bars, or private-adjacent ground are legal stopping points."
      ],
      "watchFor": [
        "Low water below 350 cfs or 4.8 ft, when shallow shoals, rock bars, and dragging become more likely over a long lower-corridor day.",
        "High water above 900 cfs or 6.0 ft, when the broad river moves faster and muddy landings become less forgiving around bends and ramps.",
        "Wood, strainers, mud banks, occasional riffles, private banks outside the access sites, and fatigue from repeated low-water line scouting."
      ]
    },
    "accessPoints": [
      {
        "id": "hacker-branch-road-access",
        "name": "Hacker Branch Road Access",
        "latitude": 37.3743,
        "longitude": -83.6708,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the lower full-chain route."
      },
      {
        "id": "upper-wolf-creek-ramp",
        "name": "Upper Wolf Creek Ramp",
        "latitude": 37.3964,
        "longitude": -83.6767,
        "mileFromStart": 2.9,
        "segmentKind": "creek",
        "note": "Intermediate paved-ramp access."
      },
      {
        "id": "kay-wood-road-access",
        "name": "Kay Wood Road Access",
        "latitude": 37.4594,
        "longitude": -83.6509,
        "mileFromStart": 8.5,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "fish-creek-boat-ramp",
        "name": "Fish Creek Boat Ramp",
        "latitude": 37.4906,
        "longitude": -83.6894,
        "mileFromStart": 16.4,
        "segmentKind": "creek",
        "note": "Default take-out for the lower full-chain route."
      }
    ]
  },
  "south-fork-kentucky-river-upper-wolf-creek-kay-wood": {
    "putIn": {
      "id": "upper-wolf-creek-ramp",
      "name": "Upper Wolf Creek Ramp",
      "latitude": 37.3964,
      "longitude": -83.6767
    },
    "takeOut": {
      "id": "kay-wood-road-access",
      "name": "Kay Wood Road Access",
      "latitude": 37.4594,
      "longitude": -83.6509
    },
    "logistics": {
      "distanceLabel": "About 5.6 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with low water, fishing, or scouting",
      "shuttle": "Stage the take-out at Kay Wood Road Access, then drive back to Upper Wolf Creek Ramp. Upper Wolf Creek is the more developed paved-ramp put-in, while Kay Wood is a simpler carry-down finish.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day ramp or roadside parking limits.",
      "camping": "Treat this as a day trip. KDFWR lists no camping at Upper Wolf Creek or Kay Wood, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Upper Wolf Creek Ramp and take out about 5.6 miles downstream at Kay Wood Road Access for a short lower South Fork Kentucky River split. KDFWR gives a good Booneville gauge band of 350 to 900 cfs, or 4.8 to 6.0 ft.",
      "accessCaveats": [
        "Upper Wolf Creek is a free single-lane paved ramp with unpaved parking and year-round 24-hour availability.",
        "Kay Wood is a carry-down-only access with roadside-style unpaved parking and no amenities.",
        "The current Booneville gauge reading was just above the official good band during this run, so expect slightly quicker current and muddier landings than a clean mid-band day.",
        "Stay with the named public access points and do not assume side banks, bars, or private-adjacent ground are legal stopping points."
      ],
      "watchFor": [
        "Low water below 350 cfs or 4.8 ft, when shallow shoals and dragging become more likely.",
        "High water above 900 cfs or 6.0 ft, when the broad river moves faster and the lower carry-down finish becomes less forgiving.",
        "Wood, strainers, mud banks, occasional riffles, and private banks outside the access sites."
      ]
    },
    "accessPoints": [
      {
        "id": "upper-wolf-creek-ramp",
        "name": "Upper Wolf Creek Ramp",
        "latitude": 37.3964,
        "longitude": -83.6767,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for this short lower-ramp split."
      },
      {
        "id": "kay-wood-road-access",
        "name": "Kay Wood Road Access",
        "latitude": 37.4594,
        "longitude": -83.6509,
        "mileFromStart": 5.6,
        "segmentKind": "creek",
        "note": "Default take-out for this route."
      }
    ]
  },
  "saline-river-tony-kelly-peeler-bend": {
    "putIn": {
      "id": "tony-kelly-ford-access",
      "name": "Tony Kelly Ford Access",
      "latitude": 34.5844,
      "longitude": -92.6938
    },
    "takeOut": {
      "id": "peeler-bend",
      "name": "Peeler Bend",
      "latitude": 34.5852,
      "longitude": -92.6467
    },
    "logistics": {
      "distanceLabel": "About 4.4 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low water, swimming, or fishing stops",
      "shuttle": "Stage the take-out at Peeler Bend, then drive back to Tony Kelly Ford Access. Inspect both launches before leaving vehicles because gravel, mud, and recent rain can change the approach and footing.",
      "permits": "No route-specific paddling permit is known. Use the named public Arkansas Water Trails accesses, follow Arkansas boating and PFD rules, and respect any same-day city, county, or wildlife-agency parking signs.",
      "camping": "Treat this as a day trip. The reviewed AGFC route materials did not identify route camping at Tony Kelly Ford or Peeler Bend, and adjacent banks outside the public access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Tony Kelly Ford Access and take out at Peeler Bend for the shorter upper-middle Saline River water-trail split. The direct Benton gauge works well here because the route stays above the lower Benton spillway and low-water-bridge hazard package.",
      "accessCaveats": [
        "Tony Kelly Ford is a simple public river access with no developed campground support in the reviewed source set.",
        "Peeler Bend is a straightforward public access, but parking and launch conditions can change quickly with rain and runoff.",
        "The current Benton gauge reading during this run sat below the broad paddle band, so expect more scraping and slower shoals than on stronger flow days.",
        "Stay with the named public access points and avoid private banks, fences, signs, and purple-painted property lines along the corridor."
      ],
      "watchFor": [
        "Low water around and below 3.5 ft, when dragging across shoals and slower pools becomes more likely.",
        "Higher water above about 5.0 ft, when AGFC says the river becomes experienced-only with faster current and less forgiving eddies.",
        "Fast chutes, riffles, strainers, fresh flood wood, muddy exits, and pushier current after thunderstorms.",
        "Private banks, anglers, swimmers near town, and late-day heat on the longer pools."
      ]
    }
  },
  "crooked-creek-snow-yellville": {
    "putIn": {
      "id": "snow-access",
      "name": "Snow Access",
      "latitude": 36.24352,
      "longitude": -92.79995
    },
    "takeOut": {
      "id": "yellville-access",
      "name": "Yellville Access",
      "latitude": 36.22259,
      "longitude": -92.67944
    },
    "logistics": {
      "distanceLabel": "About 15.3 mi",
      "estimatedPaddleTime": "About 6 hr to 8.5 hr depending on level, wood scouting, fishing stops, and whether you pause to inspect Kelley's Slab before continuing to Yellville",
      "shuttle": "Stage the take-out at Yellville City Park, then drive back to Snow Access. Mark Oliver and Kelleys Slab are the clean public split points if the lower corridor feels too long for the day or the creek looks pushier than expected.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC access points, follow Arkansas boating and PFD rules, and respect posted parking signs at each access.",
      "camping": "Snow Access campsites and Brooksher Crooked Creek Preserve give this reach real designated-campsite support, but private banks remain off-limits and Yellville should not be treated as a corridor campsite.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Snow Access and take out at Yellville City Park for the longest lower-corridor Crooked Creek continuation. This is a rain-sensitive Ozark creek float keyed to the Kelly Crossing gauge rather than to a broad flatwater assumption.",
      "accessCaveats": [
        "Snow, Mark Oliver, Kelley's Slab, and Yellville are named public AGFC Crooked Creek Water Trail accesses with simple launches rather than full-service park ramps.",
        "The current Kelly Crossing gauge reading during this run was below AGFC's moderate band, so expect more scraping and slower riffles than the best Crooked Creek days.",
        "Stay with the named public access points and avoid private banks, fences, signs, and purple-painted property along the creek.",
        "This route passes through Kelley's Slab before the city-park finish, so do not let the Yellville take-out make the middle of the route feel more casual than it is."
      ],
      "watchFor": [
        "Water below about 12 ft, when scraping and slower riffles become more likely.",
        "Fast post-rain rises, fresh wood, strainers, muddy exits, and stronger current than the clear-water appearance suggests.",
        "Shoals, riffles, small waves, rural self-rescue conditions, and the need to scout Kelley's Slab when the creek is up or dirty."
      ]
    },
    "accessPoints": [
      {
        "id": "snow-access",
        "name": "Snow Access",
        "latitude": 36.24352,
        "longitude": -92.79995,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream put-in for the lower-corridor continuation."
      },
      {
        "id": "mark-oliver-access",
        "name": "Mark Oliver Access",
        "latitude": 36.24973,
        "longitude": -92.7486,
        "mileFromStart": 5.2,
        "segmentKind": "creek",
        "note": "Primary midpoint split point before the Kelley section."
      },
      {
        "id": "kelleys-slab-access",
        "name": "Kelley's Slab Access",
        "latitude": 36.22921,
        "longitude": -92.71045,
        "mileFromStart": 11.8,
        "segmentKind": "creek",
        "note": "Scout point and intermediate split before the city-park finish."
      },
      {
        "id": "yellville-access",
        "name": "Yellville Access",
        "latitude": 36.22259,
        "longitude": -92.67944,
        "mileFromStart": 15.3,
        "segmentKind": "creek",
        "note": "Default take-out at Yellville City Park."
      }
    ]
  },
  "crooked-creek-mark-oliver-yellville": {
    "putIn": {
      "id": "mark-oliver-access",
      "name": "Mark Oliver Access",
      "latitude": 36.24973,
      "longitude": -92.7486
    },
    "takeOut": {
      "id": "yellville-access",
      "name": "Yellville Access",
      "latitude": 36.22259,
      "longitude": -92.67944
    },
    "logistics": {
      "distanceLabel": "About 10.1 mi",
      "estimatedPaddleTime": "About 4.5 hr to 6.5 hr depending on level, wood scouting, and whether you pause to inspect Kelley's Slab before continuing to Yellville",
      "shuttle": "Stage the take-out at Yellville City Park, then drive back to Mark Oliver Access. Kelleys Slab is the obvious public split if the lower corridor feels too long for the day or the creek looks pushier than expected.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC access points, follow Arkansas boating and PFD rules, and respect posted parking signs at each access.",
      "camping": "Fred Berry Crooked Creek Nature Center can support a nearby basecamp with manager permission and a one-night limit, but no campsite is documented directly at Mark Oliver or Yellville Access.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Mark Oliver Access and take out at Yellville City Park for the final long Crooked Creek continuation into town. This is a rain-sensitive Ozark creek float keyed to the Kelly Crossing gauge rather than to a broad flatwater assumption.",
      "accessCaveats": [
        "Mark Oliver, Kelley's Slab, and Yellville are named public AGFC Crooked Creek Water Trail accesses with simple launches rather than full-service park ramps.",
        "The current Kelly Crossing gauge reading during this run was below AGFC's moderate band, so expect more scraping and slower riffles than the best Crooked Creek days.",
        "Stay with the named public access points and avoid private banks, fences, signs, and purple-painted property along the creek.",
        "This route passes through Kelley's Slab before the city-park finish, so do not let the Yellville take-out make the middle of the route feel more casual than it is."
      ],
      "watchFor": [
        "Water below about 12 ft, when scraping and slower riffles become more likely.",
        "Fast post-rain rises, fresh wood, strainers, muddy exits, and stronger current than the clear-water appearance suggests.",
        "Shoals, riffles, small waves, rural self-rescue conditions, and the need to scout Kelley's Slab when the creek is up or dirty."
      ]
    }
  },
  "crooked-creek-lower-pyatt-yellville": {
    "putIn": {
      "id": "lower-pyatt-access",
      "name": "Lower Pyatt Access",
      "latitude": 36.24665,
      "longitude": -92.83494
    },
    "takeOut": {
      "id": "yellville-access",
      "name": "Yellville Access",
      "latitude": 36.22259,
      "longitude": -92.67944
    },
    "logistics": {
      "distanceLabel": "22.0 mi",
      "estimatedPaddleTime": "About 8 hr to 11 hr depending on level, fishing stops, shoal scouting, and whether you pause to inspect Kelley's Slab before the final run to Yellville",
      "shuttle": "Stage the take-out at Yellville City Park, then drive back to Lower Pyatt Access. Snow, Mark Oliver, and Kelleys Slab are the only clean public split points if the full 22-mile trail feels too long for the day or the creek looks pushier than expected.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC access points, follow Arkansas boating and PFD rules, and respect posted parking signs at each access.",
      "camping": "Snow Access, Brooksher Crooked Creek Preserve, and Fred Berry Crooked Creek Nature Center give this corridor real designated-campsite support, but AGFC limits camping and private banks remain off-limits.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Lower Pyatt Access and take out at Yellville City Park for the full Crooked Creek Water Trail corridor. This is a rain-sensitive Ozark creek float keyed to the Kelly Crossing gauge rather than to a broad flatwater assumption.",
      "accessCaveats": [
        "Lower Pyatt, Snow, Mark Oliver, Kelley's Slab, and Yellville are named public AGFC Crooked Creek Water Trail accesses with simple rural launches rather than full-service park ramps.",
        "The current Kelly Crossing gauge reading during this run was below AGFC's moderate band, so expect more scraping and slower riffles than the best Crooked Creek days.",
        "Stay with the named public access points and avoid private banks, fences, signs, and purple-painted property along the creek.",
        "The Yellville finish is easier to identify than Kelley's Slab, but the route still passes through Kelley's hazard zone and stays a serious all-day rural creek commitment."
      ],
      "watchFor": [
        "Water below about 12 ft, when scraping and slower riffles become more likely.",
        "Fast post-rain rises, fresh wood, strainers, muddy exits, and stronger current than the clear-water appearance suggests.",
        "Shoals, riffles, small waves, rural self-rescue conditions, and the need to scout Kelley's Slab when the creek is up or dirty."
      ]
    },
    "accessPoints": [
      {
        "id": "lower-pyatt-access",
        "name": "Lower Pyatt Access",
        "latitude": 36.24665,
        "longitude": -92.83494,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default full-corridor put-in."
      },
      {
        "id": "snow-access",
        "name": "Snow Access",
        "latitude": 36.24352,
        "longitude": -92.79995,
        "mileFromStart": 6.7,
        "segmentKind": "creek",
        "note": "First major split point with primitive campsites."
      },
      {
        "id": "mark-oliver-access",
        "name": "Mark Oliver Access",
        "latitude": 36.24973,
        "longitude": -92.7486,
        "mileFromStart": 11.9,
        "segmentKind": "creek",
        "note": "Middle public split point before the Kelley section."
      },
      {
        "id": "kelleys-slab-access",
        "name": "Kelley's Slab Access",
        "latitude": 36.22921,
        "longitude": -92.71045,
        "mileFromStart": 18.5,
        "segmentKind": "creek",
        "note": "Scout point and final major split before the city-park finish."
      },
      {
        "id": "yellville-access",
        "name": "Yellville Access",
        "latitude": 36.22259,
        "longitude": -92.67944,
        "mileFromStart": 22,
        "segmentKind": "creek",
        "note": "Default full-corridor take-out at Yellville City Park."
      }
    ]
  },
  "crooked-creek-kelleys-slab-yellville": {
    "putIn": {
      "id": "kelleys-slab-access",
      "name": "Kelley's Slab Access",
      "latitude": 36.22921,
      "longitude": -92.71045
    },
    "takeOut": {
      "id": "yellville-access",
      "name": "Yellville Access",
      "latitude": 36.22259,
      "longitude": -92.67944
    },
    "logistics": {
      "distanceLabel": "3.5 mi",
      "estimatedPaddleTime": "About 1.75 hr to 3 hr depending on level, launch scouting, and how slowly the group works through the final downstream bends",
      "shuttle": "Stage the take-out at Yellville City Park, then drive back to Kelley's Slab Access. Scout the Kelley launch first when water is up, dirty, or unfamiliar because the short mileage does not remove the route's main hazard cue.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC access points, follow Arkansas boating and PFD rules, and respect posted parking signs at each access.",
      "camping": "Fred Berry Crooked Creek Nature Center can support a nearby basecamp with manager permission and a one-night limit, but no campsite is documented directly at Kelleys Slab or Yellville Access.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Kelley's Slab Access and take out at Yellville City Park for the final official Crooked Creek segment. This is still a rain-sensitive moving-water route keyed to the Kelly Crossing gauge, not a flatwater town shuttle.",
      "accessCaveats": [
        "Kelley's Slab and Yellville are named public AGFC Crooked Creek Water Trail accesses rather than improved marina-style ramps.",
        "The current Kelly Crossing gauge reading during this run was below AGFC's moderate band, so expect more scraping and slower riffles than the best Crooked Creek days.",
        "Stay with the named public access points and avoid private banks, fences, signs, and purple-painted property along the creek.",
        "AGFC says Kelley's Slab can be hazardous under some conditions, so scout the launch and commit only if the group is comfortable with the current level and footing."
      ],
      "watchFor": [
        "Water below about 12 ft, when scraping and slower riffles become more likely.",
        "Fast post-rain rises, fresh wood, strainers, muddy exits, and stronger current than the clear-water appearance suggests.",
        "Shoals, riffles, small waves, rural self-rescue conditions, and the route-specific Kelley launch hazard before the easier Yellville finish."
      ]
    }
  },
  "green-river-lynn-camp-creek-stovall-park": {
    "putIn": {
      "id": "lynn-camp-creek-vpa-1",
      "name": "Lynn Camp Creek Ramp",
      "latitude": 37.3533,
      "longitude": -85.7098
    },
    "takeOut": {
      "id": "munfordville-stovall-park-ramp",
      "name": "Munfordville-Stovall Park Ramp",
      "latitude": 37.2663,
      "longitude": -85.8892
    },
    "logistics": {
      "distanceLabel": "About 21.8 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "Full corridor is about 7 hr to 10 hr. Shorter access-planner pairings are available at Rio Carrydown Access and H.H. Wilson Park.",
      "shuttle": "Pick a put-in and take-out from the access planner, stage the downstream vehicle first, then inspect both landings before launching. The full Lynn Camp to Stovall line is a long Hart County day, while Rio and H.H. Wilson provide cleaner shorter splits.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, respect the public-use terms at Lynn Camp Creek, and obey local park rules at H.H. Wilson and Stovall.",
      "camping": "Stovall Park offers the clearest legal overnight support in this corridor. KDFWR lists primitive camping and park amenities at the downstream finish, but private banks between the named accesses should not be treated as automatic campsites.",
      "campingClassification": "endpoint_campground",
      "summary": "Use this as the upper Hart County Green River access-planner corridor from Lynn Camp Creek to Stovall Park. Rio Carrydown and H.H. Wilson remain preserved as mid-route public access options instead of separate same-gauge duplicate cards.",
      "accessCaveats": [
        "Lynn Camp Creek VPA #1 is privately owned but open to the public through KDFWR. Continuing access depends on respectful parking and staying within the access footprint.",
        "Rio Carrydown is a simple road-end access. H.H. Wilson Park is the cleaner developed split point if the group wants a shorter day with easier facilities.",
        "Stovall Park is the full-corridor finish with the best amenities and legal overnight support in this cluster.",
        "Use only the named public access points from the planner. Private banks between them are not general-purpose bailout or camping areas."
      ],
      "watchFor": [
        "Low water below about 300 cfs, when shoals and slower pools make the full corridor much more of a grind.",
        "Higher water above about 600 cfs, when current, muddy landings, and the steeper Lynn Camp carry-down become less forgiving.",
        "Broad-river wind, exposed sun, private-bank limits, and limited legal bailout options once you commit past the chosen access pair.",
        "Fresh wood, floating debris, and slick footing at Rio and other simple carry-down landings after rain."
      ]
    },
    "accessPoints": [
      {
        "id": "lynn-camp-creek-vpa-1",
        "name": "Lynn Camp Creek Ramp",
        "latitude": 37.3533,
        "longitude": -85.7098,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream start at the steep publicly open private ramp."
      },
      {
        "id": "rio-carrydown-access",
        "name": "Rio Carrydown Access",
        "latitude": 37.3183,
        "longitude": -85.7692,
        "mileFromStart": 10.2,
        "segmentKind": "creek",
        "note": "Mid-corridor road-end split point for a shorter Hart County day."
      },
      {
        "id": "hh-wilson-park-ramp",
        "name": "H.H. Wilson Park Ramp",
        "latitude": 37.2979,
        "longitude": -85.8506,
        "mileFromStart": 18.2,
        "segmentKind": "creek",
        "note": "Developed public park access and the cleanest shorter downstream finish."
      },
      {
        "id": "munfordville-stovall-park-ramp",
        "name": "Munfordville-Stovall Park Ramp",
        "latitude": 37.2663,
        "longitude": -85.8892,
        "mileFromStart": 21.8,
        "segmentKind": "creek",
        "note": "Default downstream finish with park amenities and legal overnight support."
      }
    ]
  },
  "juniata-river-victory-park-mifflintown": {
    "putIn": {
      "id": "victory-park-access",
      "name": "Victory Park access",
      "latitude": 40.595,
      "longitude": -77.578889
    },
    "takeOut": {
      "id": "mifflintown-pfbc-ramp",
      "name": "Mifflintown PFBC ramp",
      "latitude": 40.595,
      "longitude": -77.415278
    },
    "logistics": {
      "distanceLabel": "About 10 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr in ordinary conditions, longer with low-water line picking, headwind, or time spent scouting the mile-43 ledge zone",
      "shuttle": "Stage the take-out at the Mifflintown PFBC ramp first, then drive back to Victory Park in Lewistown. Check both ramps before launching because muddy edges and river angle can change after rain.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, boating, and PFD rules.",
      "camping": "Treat this as a day trip. The broader Juniata trail has island and primitive-camping context, but the official guide does not identify a specific legal campsite committed to this Lewistown-to-Mifflintown segment.",
      "campingClassification": "unknown",
      "summary": "Launch at Victory Park and take out at Mifflintown PFBC for a longer lower-Juniata town-to-ramp float. Use the direct Lewistown gauge and expect scraping whenever the river sits under PFBC's 3.1 ft minimum.",
      "accessCaveats": [
        "PFBC publishes both Victory Park and Mifflintown PFBC coordinates directly in the official lower Juniata access table.",
        "The Mifflintown PFBC ramp is the intended public finish. Do not assume private banks, bridge shoulders, or islands are legitimate substitutes.",
        "Ten broad-river miles can feel longer than they look when the valley wind turns upstream or the channel gets scratchy.",
        "If the river is near the low floor, scout from legal public vantage points before committing to the ledge zone."
      ],
      "watchFor": [
        "A ledge stretching across the river at mile 43, followed by rough water pushing into a cut bank, as flagged by PFBC.",
        "Lewistown stages below about 3.1 ft, when shallow bars and ledge lines become slower and more technical.",
        "Fresh wood after storms, bridge-current changes, and muddy landing edges at either public access.",
        "Private shorelines away from the named public accesses and the chance of drifting past the Mifflintown finish if you relax late in the run."
      ]
    }
  },
  "juniata-river-mifflintown-walker": {
    "putIn": {
      "id": "mifflintown-pfbc-ramp",
      "name": "Mifflintown PFBC ramp",
      "latitude": 40.595,
      "longitude": -77.415278
    },
    "takeOut": {
      "id": "walker-pfbc-ramp",
      "name": "Walker PFBC ramp",
      "latitude": 40.531944,
      "longitude": -77.357222
    },
    "logistics": {
      "distanceLabel": "About 6 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr in ordinary conditions, longer if low water forces channel picking or if you pause to inspect the mile-33 current zone",
      "shuttle": "Stage the take-out at Walker PFBC first, then drive back upstream to the Mifflintown PFBC ramp. Check both ramp edges before leaving a vehicle because mud and current angle can shift after rain.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, boating, and PFD rules.",
      "camping": "Treat this as a day trip. The guide identifies lodging support in Mifflintown and Mifflin, but it does not identify a committed on-route campground for this exact slug.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Mifflintown and take out at Walker PFBC for a middle lower-Juniata link. The app uses the Lewistown gauge conservatively as an upstream same-river proxy and expects scraping whenever that corridor sits under PFBC's 3.1 ft minimum.",
      "accessCaveats": [
        "PFBC publishes both Mifflintown and Walker coordinates directly in the official lower Juniata access table.",
        "The gauge story here stays conservative because Lewistown is upstream of this route, not on top of it.",
        "Use only the named public accesses rather than bridge shoulders or private banks.",
        "This segment is broad enough for wind to matter more than the mileage suggests on an exposed day."
      ],
      "watchFor": [
        "Rapid current near mile 33, the main caution point PFBC flags in this corridor.",
        "Low water under the conservative Lewistown 3.1 ft proxy floor, when broad cobble bars and slower channels can force dragging.",
        "Fresh wood after storms, muddy landing edges, and broad-river wind across exposed bends.",
        "Private shorelines away from the named public accesses and the temptation to improvise on bars because the route looks simple."
      ]
    }
  },
  "juniata-river-portstown-park-newton-hamilton": {
    "putIn": {
      "id": "portstown-park-access",
      "name": "Portstown Park access",
      "latitude": 40.485833,
      "longitude": -78.014167
    },
    "takeOut": {
      "id": "newton-hamilton-ramp",
      "name": "Newton-Hamilton ramp",
      "latitude": 40.391944,
      "longitude": -77.834444
    },
    "logistics": {
      "distanceLabel": "About 21 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "About 8 hr to 11 hr for the full corridor, longer with low-water bars, headwind, or extra time easing through the mile-90, Mapleton, mile-75, and Newton-Hamilton caution zones",
      "shuttle": "Stage the take-out at Newton-Hamilton first, then drive back upstream to Portstown Park in Huntingdon. This is a genuine all-day shuttle plan, so use Juniata Point, Riverside, Mt. Union, or Shawmut as shorter access-planner choices when daylight or conditions are tighter.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, boating, and PFD rules.",
      "camping": "The upper-Juniata guide says small groups may camp overnight at the Mapleton community park, and Aqueduct Campground sits near the lower end of the corridor. Confirm same-day local rules before turning either support point into an overnight split.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Portstown Park and use the upper Juniata access chain through Newton-Hamilton as the selected corridor. Use the direct Mapleton Depot gauge and expect scraping whenever the river sits under PFBC's 2.5 ft minimum.",
      "accessCaveats": [
        "PFBC publishes Portstown Park, Juniata Point, Riverside Park, Mt. Union, Shawmut, and Newton-Hamilton coordinates directly in the official upper Juniata access table.",
        "Mapleton community-park camping and Aqueduct Campground support are useful on-route, but the selected access-planner finish should still be staged deliberately before launch.",
        "This is a long broad-river route even at friendly levels. Do not underrate the time commitment just because the gradient stays modest.",
        "Use only the named public accesses rather than private banks, islands, or bridge shoulders."
      ],
      "watchFor": [
        "Hazardous current with waves near mile 90, the Mapleton caution features at miles 86.5 and 85.5, waves with hidden rocks near mile 75, and the mile-73 Newton-Hamilton current/rock features flagged by PFBC.",
        "Mapleton stages below about 2.5 ft, when broad bars and shallow inside lines slow the route down quickly.",
        "Fresh wood after storms, broad-river headwind, and fatigue late in the day after the Mapleton midpoint is behind you.",
        "Private shorelines away from the named public accesses and the temptation to settle for an informal bank instead of holding the planned finish."
      ]
    },
    "accessPoints": [
      {
        "id": "portstown-park-access",
        "name": "Portstown Park access",
        "latitude": 40.485833,
        "longitude": -78.014167,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default full-corridor put-in."
      },
      {
        "id": "juniata-point-ramp",
        "name": "Juniata Point ramp",
        "latitude": 40.458333,
        "longitude": -77.980833,
        "mileFromStart": 3,
        "segmentKind": "creek",
        "note": "Intermediate public access near the Raystown Branch mouth."
      },
      {
        "id": "riverside-park-mapleton-ramp",
        "name": "Riverside Park access",
        "latitude": 40.386111,
        "longitude": -77.938333,
        "mileFromStart": 9,
        "segmentKind": "creek",
        "note": "Mapleton access with community-park camping context."
      },
      {
        "id": "mt-union-access",
        "name": "Mt. Union access",
        "latitude": 40.386111,
        "longitude": -77.873333,
        "mileFromStart": 13,
        "segmentKind": "creek",
        "note": "Intermediate access for shorter Jacks Narrows approaches."
      },
      {
        "id": "shawmut-access",
        "name": "Shawmut access",
        "latitude": 40.364722,
        "longitude": -77.812222,
        "mileFromStart": 18,
        "segmentKind": "creek",
        "note": "Intermediate access near the mile-75 wave and hidden-rock caution zone."
      },
      {
        "id": "newton-hamilton-ramp",
        "name": "Newton-Hamilton ramp",
        "latitude": 40.391944,
        "longitude": -77.834444,
        "mileFromStart": 21,
        "segmentKind": "creek",
        "note": "Default full-corridor take-out."
      }
    ]
  },
  "french-creek-union-city-dam-cambridge-springs": {
    "putIn": {
      "name": "Union City Dam access",
      "latitude": 41.919722,
      "longitude": -79.901667
    },
    "takeOut": {
      "name": "Cambridge Springs access",
      "latitude": 41.807222,
      "longitude": -80.043611
    },
    "logistics": {
      "distanceLabel": "About 24 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr in ordinary conditions, longer with lower water, strainers, or extra time managing the long shuttle and carries",
      "shuttle": "Stage the take-out at Cambridge Springs first, then drive back to Union City Dam. Check the Union City launch carry before you leave a vehicle because the PFBC guide puts the access below the dam with a carry down the gravel road.",
      "permits": "PFBC says unpowered boats using PFBC launches need boat registration, a PFBC launch permit, or a Pennsylvania state-park launch permit. Follow current PFBC boating and PFD rules.",
      "camping": "Treat this as a long day float. The PFBC guide says Union City has campsites and Cambridge Springs has a historic inn and dining, so nearby base-camp support exists without implying legal creek-bank camping on this slug.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch below Union City Dam and take out at Cambridge Springs for a long upper French Creek day. The app uses the Meadville gauge conservatively as the upper-corridor planning reference and expects scraping, slower progress, and tighter wood lines whenever the creek falls toward the official 2 ft floor.",
      "accessCaveats": [
        "The PFBC upper French Creek guide publishes both Union City Dam and Cambridge Springs coordinates directly in the official access chart.",
        "Union City Dam is the named public launch, but the put-in requires a carry from the parking area below the structure rather than a big developed ramp.",
        "This is a long headwater day between named public accesses. Do not assume quick bailouts exist off private banks or farm edges.",
        "Use only the named public accesses rather than bridge shoulders, islands, or private banks."
      ],
      "watchFor": [
        "Narrow headwaters, downed trees, and shifting strainers, which the PFBC guide says are a potentially serious hazard on upper French Creek.",
        "Current pushing toward bridge abutments and the need to stay off the upstream side of bridge structure.",
        "Low water near the conservative Meadville 2 ft floor, when gravel bars and shallow riffles stretch the day materially.",
        "Fatigue, thunderstorms, private shorelines, and the chance of underestimating the mileage because the river is otherwise novice-friendly."
      ]
    },
    "accessPoints": [
      {
        "id": "union-city-dam",
        "name": "Union City Dam access",
        "latitude": 41.919722,
        "longitude": -79.901667,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Full upstream start below the dam."
      },
      {
        "id": "cambridge-springs",
        "name": "Cambridge Springs access",
        "latitude": 41.807222,
        "longitude": -80.043611,
        "mileFromStart": 24,
        "segmentKind": "creek",
        "note": "Main downstream finish and the first short-split option for the upper corridor."
      },
      {
        "id": "conneautee",
        "name": "Conneautee access",
        "latitude": 41.811111,
        "longitude": -80.078889,
        "mileFromStart": 27,
        "segmentKind": "creek",
        "note": "Shorter upper-corridor access three miles below Cambridge Springs."
      }
    ]
  },
  "french-creek-conneautee-bicentennial-park": {
    "putIn": {
      "name": "Conneautee access",
      "latitude": 41.811111,
      "longitude": -80.078889
    },
    "takeOut": {
      "name": "Bicentennial Park access",
      "latitude": 41.637222,
      "longitude": -80.162222
    },
    "logistics": {
      "distanceLabel": "About 16 mi",
      "estimatedPaddleTime": "About 5 hr to 8 hr in ordinary conditions, longer with lower water, strainers, or time spent scouting the Saegertown dam feature",
      "shuttle": "Stage the take-out at Bicentennial Park first, then drive back to Conneautee. Check both public landings before launching because mud, current angle, and same-day wood can change how straightforward the shuttle feels.",
      "permits": "PFBC says unpowered boats using PFBC launches need boat registration, a PFBC launch permit, or a Pennsylvania state-park launch permit. Follow current PFBC boating and PFD rules.",
      "camping": "Treat this as a long day float. Cambridge Springs offers nearby lodging just upstream of the put-in and Meadville has commercial hotels and restaurants, so nearby base-camp support exists without implying legal creek-bank camping on this slug.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Conneautee and take out at Bicentennial Park in Meadville for a longer upper French Creek day. Use the direct Meadville gauge and expect more scraping, tighter lines, and a more consequential Saegertown dam decision whenever the creek falls toward the official 2 ft floor.",
      "accessCaveats": [
        "The PFBC upper French Creek guide publishes both Conneautee and Bicentennial Park coordinates directly in the official access chart.",
        "Scout ahead at the breached low-head dam near Saegertown and use the river-left portage if the feature is outside the group skill set.",
        "Bicentennial Park is the intended public finish in Meadville. Do not treat city banks outside the park as interchangeable take-outs.",
        "This route uses the direct Meadville gauge, but fresh wood, bridge-abutment current, and longer mileage still require an active same-day river read."
      ],
      "watchFor": [
        "The breached low-head dam near Saegertown, including the need to scout ahead and choose the river-left portage if conditions or skill do not support running it.",
        "Downed trees, shifting strainers, and bridge-abutment current on the approach into Meadville.",
        "Low water near the direct Meadville 2 ft floor, when gravel and shallow riffles tighten the available lines.",
        "Private shorelines, same-day storm wood, and the temptation to end early on non-public banks once town comes into view."
      ]
    },
    "accessPoints": [
      {
        "id": "conneautee",
        "name": "Conneautee access",
        "latitude": 41.811111,
        "longitude": -80.078889,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Full upstream start for the middle upper corridor."
      },
      {
        "id": "saegertown",
        "name": "Saegertown access",
        "latitude": 41.708611,
        "longitude": -80.145833,
        "mileFromStart": 10,
        "segmentKind": "creek",
        "note": "Public split point just below the breached low-head dam decision area."
      },
      {
        "id": "bicentennial-park",
        "name": "Bicentennial Park access",
        "latitude": 41.637222,
        "longitude": -80.162222,
        "mileFromStart": 16,
        "segmentKind": "creek",
        "note": "Full Meadville finish six miles below Saegertown."
      }
    ]
  },
  "french-creek-wilson-chutes-utica": {
    "putIn": {
      "name": "Wilson Chutes PFBC access",
      "latitude": 41.589167,
      "longitude": -80.149722
    },
    "takeOut": {
      "name": "Utica PFBC access",
      "latitude": 41.438056,
      "longitude": -79.955278
    },
    "logistics": {
      "distanceLabel": "About 16 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr in ordinary conditions, longer with low-water gravel, strainers, or a cautious line through the mile-19 rapid zone",
      "shuttle": "Stage the take-out at the Utica PFBC access first, then drive back to the Wilson Chutes PFBC access. Check both public landings before launching because mud, current angle, and same-day wood can change how straightforward the long shuttle feels.",
      "permits": "PFBC says unpowered boats using PFBC launches need boat registration, a PFBC launch permit, or a Pennsylvania state-park launch permit. Follow current PFBC boating and PFD rules.",
      "camping": "Treat this as a long day float. The official lower French Creek guide does not identify a named campground tied to this exact Wilson-Chutes-to-Utica pair, so do not assume legal creek-bank camping.",
      "campingClassification": "none",
      "summary": "Launch at the Wilson Chutes PFBC access and take out at the Utica PFBC access for a fuller lower French Creek day. Use the direct Utica gauge and expect the route to get scrapier and more wood-sensitive whenever the creek falls toward the official 2.5 ft floor.",
      "accessCaveats": [
        "The PFBC lower French Creek guide publishes both Wilson Chutes and Utica coordinates directly in the official access chart.",
        "Utica is the intended public finish and the location of the selected gauge. Check the landing edge before leaving a vehicle because rail-side mud and current angle can change after rain.",
        "This route starts just above the mile-19 borderline Class I rapid identified in the guide, so scout and line up early if the current or wood looks less friendly than expected.",
        "Stay within the named public accesses and avoid improvising on private banks or field edges if the trip feels slower than expected."
      ],
      "watchFor": [
        "The borderline Class I rapid near mile 19, plus the PFBC warning to avoid the upstream side of bridge abutments.",
        "Downed trees and shifting strainers, which the PFBC guide says are a potentially serious lower-French hazard.",
        "Low water near the official Utica 2.5 ft floor, when gravel and shallow riffles tighten the available lines.",
        "Headwind, fresh wood after storms, and private shorelines away from the named public accesses."
      ]
    },
    "accessPoints": [
      {
        "id": "wilson-chutes",
        "name": "Wilson Chutes PFBC access",
        "latitude": 41.589167,
        "longitude": -80.149722,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Full upstream start for the lower corridor."
      },
      {
        "id": "shaws-landing",
        "name": "Shaw's Landing",
        "latitude": 41.540833,
        "longitude": -80.104167,
        "mileFromStart": 4,
        "segmentKind": "creek",
        "note": "Short first split before the longer middle miles."
      },
      {
        "id": "cochranton",
        "name": "Cochranton Borough access",
        "latitude": 41.519167,
        "longitude": -80.053889,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Useful public split point for the middle of the lower corridor."
      },
      {
        "id": "utica",
        "name": "Utica PFBC access",
        "latitude": 41.438056,
        "longitude": -79.955278,
        "mileFromStart": 16,
        "segmentKind": "creek",
        "note": "Full finish for the first canonical lower route and the direct-gauge access."
      }
    ]
  },
  "french-creek-utica-franklin": {
    "putIn": {
      "name": "Utica PFBC access",
      "latitude": 41.438056,
      "longitude": -79.955278
    },
    "takeOut": {
      "name": "Franklin PFBC access",
      "latitude": 41.381389,
      "longitude": -79.82
    },
    "logistics": {
      "distanceLabel": "About 10 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr in ordinary conditions, longer with low-water gravel, strainers, or a cautious lower-confluence finish",
      "shuttle": "Stage the take-out at the Franklin PFBC access on Elk Street first, then drive back to the Utica PFBC access. Check both public landings before launching because mud, bank angle, and same-day wood can change how straightforward the carry feels.",
      "permits": "PFBC says unpowered boats using PFBC launches need boat registration, a PFBC launch permit, or a Pennsylvania state-park launch permit. Follow current PFBC boating and PFD rules.",
      "camping": "Treat this as a day float. Franklin has nearby overnight options and the Cranberry Township trailhead primitive camping area is close to town, but the route itself should not imply open creek-bank camping between Utica and Franklin.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at the Utica PFBC access and take out at the Franklin PFBC access at the Allegheny confluence. Use the direct Utica gauge and expect more gravel, wood, and bridge-current consequence whenever the creek falls toward the official 2.5 ft floor.",
      "accessCaveats": [
        "The PFBC lower French Creek guide publishes both Utica and Franklin coordinates directly in the official access chart.",
        "Franklin is the intended public finish at Elk Street. Do not drift past the take-out and into the broader Allegheny corridor because the confluence opens up.",
        "Nearby Franklin lodging and the Cranberry Township trailhead camping context can support a basecamp plan, but they are not on-route campsites for this exact slug.",
        "Stay within the named public accesses and avoid private banks or casual confluence stops away from the Elk Street landing."
      ],
      "watchFor": [
        "The borderline Class I rapid at mile 3, plus the PFBC warning to avoid the upstream side of bridge abutments.",
        "Downed trees and shifting strainers in the narrower bends of lower French Creek.",
        "Low water near the official Utica 2.5 ft floor, when the lower miles get slower, scrapier, and less forgiving around wood.",
        "Fresh wood after storms, private shorelines, and missing the Franklin take-out at the Allegheny confluence."
      ]
    },
    "accessPoints": [
      {
        "id": "utica",
        "name": "Utica PFBC access",
        "latitude": 41.438056,
        "longitude": -79.955278,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Full upstream start for the final lower corridor."
      },
      {
        "id": "franklin",
        "name": "Franklin PFBC access",
        "latitude": 41.381389,
        "longitude": -79.82,
        "mileFromStart": 10,
        "segmentKind": "creek",
        "note": "Full downstream finish at the Allegheny confluence landing on Elk Street."
      }
    ]
  }
};
