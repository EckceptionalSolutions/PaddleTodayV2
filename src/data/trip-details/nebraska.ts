// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const nebraskaRiverTripDetails: Record<string, RiverTripDetails> = {
  "logan-creek-pender-oakland": {
    "putIn": {"id":"pender-logan-creek-canoe-access","name":"Pender Logan Creek canoe access (east side of town)","latitude":42.113332,"longitude":-96.712814},
    "takeOut": {"id":"oakland-logan-creek-canoe-access","name":"Oakland Logan Creek canoe access","latitude":41.8263,"longitude":-96.4931},
    "logistics": {
      "distanceLabel":"About 32 river miles; verify the active channel and current water-trail map",
      "estimatedPaddleTime":"About 8 to 12 hours at ordinary current, longer with low-water dragging, scouting, wind, breaks, or a slower group",
      "shuttle":"Stage the Oakland finish first, then drive back to the Pender east-side canoe access. Treat this as a full-day shuttle and confirm current road, parking, and river-edge access before launching.",
      "permits":"No route-specific private-paddling permit is identified by the cited public sources. Follow Nebraska boating and PFD rules, posted access restrictions, and current seasonal advisories.",
      "camping":"Daylight-only planning is preferred. Do not camp on private banks, sandbars, or the stream bed without permission; confirm any town campground or lodging separately before treating it as route support.",
      "campingClassification":"nearby_basecamp",
      "summary":"Launch at the Pender canoe access and finish at the Oakland canoe access on the designated Logan Creek water trail. This is a committed shuttle with Bancroft as a named public intermediate access; plan daylight, food, water, and a conservative turnaround option.",
      "accessCaveats":["The official map identifies the Pender and Oakland canoe-access sites, but practical water-edge conditions and parking can change; inspect both endpoints before committing.","Bancroft access is described north of Highway 16 on County Road 24, directly north of Ru-De’s Mini Mart. Verify legal approach, parking, and landing before relying on it as a bailout.","Most intervening banks are private. Remain in the channel and use only named public access unless permission or an emergency requires otherwise.","The Wakefield gauge supplies direct live context but cannot certify every upstream reach; local rain, wood, and channel changes can dominate."],
      "watchFor":["Discharge below the conservative 55 cfs reference, when shallow-channel uncertainty and dragging become more likely.","Strainers, fresh wood, fast rises, private-bank constraints, storms, and missed daylight.","Unclear Pender, Bancroft, or Oakland access, changed road conditions, or inability to reach the take-out safely."]
    }
  },
  "platte-river-north-bend-valley": {
    "putIn": {"id":"north-bend-highway-79-bridge","name":"Nebraska 79 bridge south of North Bend","latitude":41.45295,"longitude":-96.77601},
    "takeOut": {"id":"platte-river-landing-highway-64","name":"Platte River Landing at Nebraska 64","latitude":41.31893,"longitude":-96.40321},
    "logistics": {
      "distanceLabel":"About 24 river miles",
      "estimatedPaddleTime":"About 8 to 12 hours in ordinary conditions, longer with low-water dragging, wind, scouting, breaks, or a slower group",
      "shuttle":"Stage the Platte River Landing finish first, then drive back to the Highway 79 bridge south of North Bend. Treat this as a full-day shuttle and confirm the current ramp, parking, and seasonal access conditions before launching.",
      "permits":"No route-specific private paddling permit is identified for the named public endpoints. Follow Nebraska boating and PFD rules, Papio/NGPC park rules, posted access restrictions, and current water-trail advisories.",
      "camping":"Treat this as a daylight run. Platte River Landing has public park facilities, but Hormel Park is currently closed and no intervening camping is assumed. Do not camp on private banks, sandbars, or the stream bed without permission.",
      "campingClassification":"endpoint_campground",
      "summary":"Launch at the Nebraska 79 bridge south of North Bend and finish at Platte River Landing on Nebraska 64. The official trail is a long committed day with Hormel Park as a currently closed intermediate landmark; plan daylight, food, water, shuttle support, and a conservative turnaround plan.",
      "accessCaveats":["The official trail identifies the Highway 79 launch, but the north-side dirt-road approach and short south-side portage can change; inspect the launch before committing.","Hormel Park’s boat ramp is currently closed after flood damage. Do not use it as a bailout or take-out unless the managing NRD confirms reopening.","Platte River Landing is a named public finish, but practical ramp, parking, and seasonal hours can change; follow Papio NRD signs on arrival.","Most intervening banks are private. Remain in the channel and use only named public access except for emergency portage."],
      "watchFor":["Discharge below the conservative 5,000 cfs reference, especially when sandbars and shallow braided channels make progress uncertain.","Bridge pilings, strainers, fresh wood, rapidly rising water, flood warnings, strong crosswinds, and severe weather.","Hormel Park closure, changed road access, missing daylight, or inability to reach the Platte River Landing take-out safely."]
    }
  },
  "north-loup-river-burwell-ord": {
    "putIn": {"id":"burwell-riverside-park","name":"Burwell Riverside Park","latitude":41.78900058,"longitude":-99.134},
    "takeOut": {"id":"anderson-island-ord","name":"Anderson Island, Ord","latitude":41.604454,"longitude":-98.9178651},
    "logistics": {
      "distanceLabel":"About 18.5 mi",
      "estimatedPaddleTime":"About 7 to 10 hours in ordinary conditions, longer with low-water walking, scouting, wind, breaks, or a slower group",
      "shuttle":"Stage the Anderson Island finish first, then drive back to Riverside Park in Burwell. Treat the route as a full-day shuttle and confirm current road, parking, and river-edge access conditions before launching.",
      "permits":"No route-specific private paddling permit is identified by the cited public sources. Follow Nebraska boating and PFD rules, park rules, posted access restrictions, and current seasonal advisories.",
      "camping":"Anderson Island provides public camping and river access near the finish. Burwell Riverside Park is the published start. Do not treat intervening private banks, sandbars, or the stream bed as campsites without permission.",
      "campingClassification":"endpoint_campground",
      "summary":"Launch at Burwell Riverside Park and finish at city-owned Anderson Island in Ord. The official trail is a committed day with one potential intermediate access at the Elyria county bridge; plan daylight, food, water, a real shuttle, and a conservative turnaround option.",
      "accessCaveats":["Nebraska Game and Parks identifies Riverside Park as the start and Anderson Island as the finish, but practical water-edge conditions can change; inspect both endpoints on the day of launch.","The Elyria county bridge is the only potential intermediate access named by the official trail material. Verify legal approach, parking, and landing before relying on it.","Most intervening banks are private. Remain in the channel and use only named public access unless permission or an emergency requires otherwise.","The downstream USGS gauge is direct live context but cannot certify upstream conditions; irrigation diversions and local rain can change the Burwell reach."],
      "watchFor":["Discharge below the conservative 275 cfs reference, especially summer irrigation periods when walking and channel hunting become more likely.","The 18-24 inch low rapids and fast water near the start; scout and wear a PFD.","Strainers, fresh wood, private-bank constraints, storms, rising water, and missed daylight.","Unclear Anderson Island or Riverside Park access, road closures, or a changed intermediate bridge approach."]
    }
  },
  "elkhorn-river-wisner-west-point": {
    "putIn": {"id":"wisner-river-park-boat-dock","name":"Wisner River Park boat dock","latitude":41.9796,"longitude":-96.9158},
    "takeOut": {"id":"neligh-park-west-point-river-access","name":"Neligh Park, West Point","latitude":41.8426,"longitude":-96.7170},
    "logistics": {
      "distanceLabel":"About 15 river miles; verify the active channel and current water-trail map",
      "estimatedPaddleTime":"About 5 to 8 hours at ordinary current, longer with low-water dragging, wind, scouting, or a slow group",
      "shuttle":"Stage the vehicle at Neligh Park in West Point, then drive back to the Wisner River Park boat dock. Confirm current city access, parking, and seasonal conditions before launching.",
      "permits":"No separate private-paddling permit is identified by the cited public access sources. Follow Nebraska boating and PFD rules, local park rules, and any posted water-trail advisories.",
      "camping":"Wisner River Park and Neligh Park both document campground facilities. Reserve or confirm current site availability before treating either endpoint as an overnight base; do not camp on private banks, sandbars, or the stream bed without permission.",
      "campingClassification":"endpoint_campground",
      "summary":"Use Wisner River Park as the public launch and Neligh Park as the public West Point finish. This is a long Lower Elkhorn water-trail segment, so plan a full daylight window, shuttle, food and water, and a conservative turnaround or bailout plan.",
      "accessCaveats":["Wisner River Park's city page documents a boat dock but does not promise a specific river-stage operating window; inspect the dock and approach before launching.","Neligh Park is a public campground and park, but the practical water-edge landing may not be identical to the campground coordinate. Confirm the legal take-out on arrival and follow posted park boundaries.","The route is bounded by named public endpoints, but most intervening banks are private. Do not land, camp, or portage on private property without permission except where emergency safety requires it.","The 575 cfs floor is community guidance. A rising river, flood warning, high wind, fresh wood, or poor daylight plan overrides the score."],
      "watchFor":["Discharge below 575 cfs, when shallow-channel uncertainty and dragging become more likely.","Rapidly rising water, flood warnings, or discharge materially above the community guidance band; no official high-water cfs ceiling is claimed.","Strainers, downed trees, debris and channel changes after spring floods or storms.","Strong crosswinds and long exposed reaches.","Missing the West Point take-out or attempting an unplanned private-bank landing."]
    }
  },
  "platte-river-schramm-louisville": {
    "putIn": {
      "id": "schramm-park-sra-canoe-kayak-access",
      "name": "Schramm Park SRA canoe/kayak access",
      "latitude": 41.02036,
      "longitude": -96.24974
    },
    "takeOut": {
      "id": "louisville-sra-platte-river-boat-ramp",
      "name": "Louisville SRA Platte River boat ramp",
      "latitude": 41.01471,
      "longitude": -96.15787
    },
    "logistics": {
      "distanceLabel": "About 6 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr at ordinary current, longer with low-water dragging, channel scouting, wind, or a slow group",
      "shuttle": "Stage the take-out at Louisville State Recreation Area, then drive back to the Schramm Park canoe/kayak access off Highway 31. Inspect both access points before launching because flood repairs, mud, shifted sand, park rules, or local closures can change the practical ramp or graded-bank layout.",
      "permits": "A valid Nebraska state park vehicle permit is required for state park and recreation area vehicle access. No separate private-paddling permit is known for this water-trail segment. Follow Nebraska boating and PFD rules, posted NGPC access rules, and current park closure notices.",
      "camping": "Treat this as a daylight water-trail run unless you have a legal, reserved campsite at Louisville SRA or another managed campground. NGPC/Nebraskaland warns that paddlers need permission to stop on banks, sandbars, or the stream bed, except where necessary to portage around obstacles or walk through shallow water.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from Schramm Park SRA and take out at Louisville SRA for the short lower-Platte water-trail segment through Schramm, Platte River State Park, and Louisville. Use USGS 06805500 at Louisville and Nebraska Game and Parks/Nebraskaland flow guidance for the same-day go/no-go call.",
      "accessCaveats": [
        "NGPC says Schramm has a canoe/kayak access point with graded bank and parking off Highway 31, but the launch was flood-damaged in 2019 and the bank drops off quickly. Make a same-day visual access check.",
        "Louisville SRA has canoe/kayak access to the Platte River and a boat-ramp/parking area at the end of the water trail. Use current park signs, parking rules, and ramp conditions on arrival.",
        "Endpoint coordinates are practical public-access anchors from named NGPC access context and public map records, not survey-grade ramp points. Follow current on-site signage and obvious public access boundaries.",
        "The Nebraska Game and Parks private-bed/sandbar rule is stricter than many paddlers expect: do not stop on banks, sandbars, or the stream bed without permission except when necessary for shallow-water walking or obstacle portage.",
        "The Platte is braided and sandy. The main channel can shift, and the best line can change after floods, summer low water, or wind-driven sand movement."
      ],
      "watchFor": [
        "Flows below about 5,000 cfs at Louisville, when NGPC/Nebraskaland says there is too little water and low-channel choices can turn into dragging.",
        "Flows above about 16,000 cfs, when NGPC/Nebraskaland says extreme caution is required; do not treat the route as an easy water-trail day at high water.",
        "Flows near or above 18,000 cfs, which the NGPC/Nebraskaland source says to avoid.",
        "Bridge pilings, especially the Lied Bridge area, where NGPC/Nebraskaland warns trees and debris can collect.",
        "Shifting sandbars, shallow braided side channels, floating wood, private banks, wind across open bends, storms, fast rises after rain, anglers, and missing the Louisville take-out."
      ]
    }
  },
  "platte-river-schramm-platte-river-state-park": {
    "putIn": {
      "id": "schramm-park-sra-canoe-kayak-access",
      "name": "Schramm Park SRA canoe/kayak access",
      "latitude": 41.02036,
      "longitude": -96.24974
    },
    "takeOut": {
      "id": "platte-river-state-park-decker-creek-access",
      "name": "Platte River State Park Decker Creek canoe/kayak access",
      "latitude": 40.99302,
      "longitude": -96.20843000000001
    },
    "logistics": {
      "distanceLabel": "About 2.9 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr at ordinary current, longer with low-water dragging, channel scouting, wind, or a slow group",
      "shuttle": "Confirm current Platte River State Park rules for wheeling a boat down the maintenance road to the Decker Creek stop; NGPC says the stop was not built as a normal vehicle put-in/take-out and has no adjacent public parking. Then stage the permitted carry or pickup and drive back to the Schramm Park canoe/kayak access off Highway 31.",
      "permits": "A valid Nebraska state park vehicle permit is required for state park and recreation area vehicle access. No separate private-paddling permit is known for this water-trail segment. Follow Nebraska boating and PFD rules, posted NGPC access rules, and current park closure notices.",
      "camping": "Treat this as a short day run. Platte River State Park has nearby cabins and campground options for a base-camp stay, but the Decker Creek access itself is a water-trail stop rather than a river campsite.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch from Schramm Park SRA and take out at the Decker Creek access at Platte River State Park for the upstream half of the improved lower-Platte water trail. Use USGS 06805500 at Louisville and Nebraska Game and Parks/Nebraskaland flow guidance for the same-day go/no-go call.",
      "accessCaveats": [
        "NGPC says Schramm has a canoe/kayak access point with graded bank and parking off Highway 31, but the launch was flood-damaged in 2019 and the bank drops off quickly. Make a same-day visual access check.",
        "Outdoor Nebraska says Platte River State Park has a canoe and kayak stop a few yards from the mouth of Decker Creek. NGPC's water-trail article says it was not built as a normal put-in/take-out because it is distant from the nearest park road, though a canoe or kayak may be wheeled down a maintenance road. Confirm current park permission, route, and pickup logistics before relying on it.",
        "The coordinate is the photo-matched water edge of the graded landing on Decker Creek, immediately south of the footbridge—not a parking pin. The route leaves the Platte, passes under the railroad bridge, and continues about 1,100 feet up Decker Creek to the stop.",
        "The Nebraska Game and Parks private-bed/sandbar rule is stricter than many paddlers expect: do not stop on banks, sandbars, or the stream bed without permission except when necessary for shallow-water walking or obstacle portage.",
        "The Platte is braided and sandy. The main channel can shift, and the best line can change after floods, summer low water, or wind-driven sand movement."
      ],
      "watchFor": [
        "Flows below about 5,000 cfs at Louisville, when NGPC/Nebraskaland says there is too little water and low-channel choices can turn into dragging.",
        "Flows above about 16,000 cfs, when NGPC/Nebraskaland says extreme caution is required; do not treat the route as an easy water-trail day at high water.",
        "Flows near or above 18,000 cfs, which the NGPC/Nebraskaland source says to avoid.",
        "Bridge pilings, especially the Lied Bridge area, where NGPC/Nebraskaland warns trees and debris can collect.",
        "Shifting sandbars, shallow braided side channels, floating wood, private banks, wind across open bends, storms, fast rises after rain, and missing the Decker Creek turn."
      ]
    }
  },
  "platte-river-platte-river-state-park-louisville": {
    "putIn": {
      "id": "platte-river-state-park-decker-creek-access",
      "name": "Platte River State Park Decker Creek canoe/kayak access",
      "latitude": 40.99302,
      "longitude": -96.20843000000001
    },
    "takeOut": {
      "id": "louisville-sra-platte-river-boat-ramp",
      "name": "Louisville SRA Platte River boat ramp",
      "latitude": 41.01471,
      "longitude": -96.15787
    },
    "logistics": {
      "distanceLabel": "About 2.8 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr at ordinary current, longer with low-water dragging, braided-channel scouting, wind, or a slow group",
      "shuttle": "Stage the take-out at Louisville State Recreation Area, then confirm current Platte River State Park permission to wheel a boat down the maintenance road to the Decker Creek stop. NGPC says that stop was not built as a normal vehicle put-in/take-out and has no adjacent public parking, so do not assume a curbside launch or ordinary shuttle staging area.",
      "permits": "A valid Nebraska state park vehicle permit is required for state park and recreation area vehicle access. No separate private-paddling permit is known for this water-trail segment. Follow Nebraska boating and PFD rules, posted NGPC access rules, and current park closure notices.",
      "camping": "Louisville State Recreation Area has a special campsite on the river and nearby campground options, but same-day route access still depends on current bank, ramp, and reservation conditions rather than assuming a casual walk-up overnight.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from the Decker Creek access at Platte River State Park and take out at Louisville SRA for the downstream half of the improved lower-Platte water trail. Use USGS 06805500 at Louisville and Nebraska Game and Parks/Nebraskaland flow guidance for the same-day go/no-go call.",
      "accessCaveats": [
        "Outdoor Nebraska says Platte River State Park has a canoe and kayak stop a few yards from the mouth of Decker Creek. NGPC's water-trail article says it was not built as a normal put-in/take-out because it is distant from the nearest park road, though a canoe or kayak may be wheeled down a maintenance road. Confirm current park permission before using it as this route's start.",
        "Louisville SRA has canoe/kayak access to the Platte River and a boat-ramp/parking area at the end of the water trail. Use current park signs, parking rules, and ramp conditions on arrival.",
        "The coordinate is the photo-matched water edge of the graded landing on Decker Creek, immediately south of the footbridge—not a parking pin. Paddle about 1,100 feet down Decker Creek, pass under the railroad bridge, and join the Platte before continuing to Louisville.",
        "The Nebraska Game and Parks private-bed/sandbar rule is stricter than many paddlers expect: do not stop on banks, sandbars, or the stream bed without permission except when necessary for shallow-water walking or obstacle portage.",
        "The Platte is braided and sandy. The main channel can shift, and the best line can change after floods, summer low water, or wind-driven sand movement."
      ],
      "watchFor": [
        "Flows below about 5,000 cfs at Louisville, when NGPC/Nebraskaland says there is too little water and low-channel choices can turn into dragging.",
        "Flows above about 16,000 cfs, when NGPC/Nebraskaland says extreme caution is required; do not treat the route as an easy water-trail day at high water.",
        "Flows near or above 18,000 cfs, which the NGPC/Nebraskaland source says to avoid.",
        "Shifting sandbars, shallow braided side channels, floating wood, private banks, wind across open bends, storms, fast rises after rain, and missing the Louisville finish.",
        "Steep bank or muddy footing around the river-side campsite or campground approach if you are using Louisville for a larger overnight plan rather than a pure day shuttle."
      ]
    }
  },
  "loup-river-george-syas-monroe": {
    "putIn": {
      "id": "george-d-syas-wma-fishing-access",
      "name": "George D. Syas WMA fishing access",
      "latitude": 41.43328221,
      "longitude": -97.68464875
    },
    "takeOut": {
      "id": "monroe-county-access",
      "name": "Monroe county access south of Monroe",
      "latitude": 41.46117475580161,
      "longitude": -97.59934674467611
    },
    "logistics": {
      "distanceLabel": "About 8 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr in ordinary conditions, longer near the conservative floor with low-water channel hunting, dragging, wind, or a slow group",
      "shuttle": "Stage the Monroe county access first, then drive back upstream to the George D. Syas WMA fishing access. The official city directions say to travel south of Monroe on 370th Avenue over the Loup River bridge, continue about one-eighth mile, then turn east and follow the road to its end. Inspect the take-out before launching because the coordinate is a practical public-access anchor from those directions and satellite verification rather than a published county GIS point.",
      "permits": "No route-specific private paddling permit is known for this segment. Follow Nebraska boating and PFD rules, obey posted WMA and county-access rules, and respect any same-day closures, muddy-road issues, or parking limits at either endpoint.",
      "camping": "Nebraska Game and Parks' current fishing guide lists primitive camping at Loup River WMAs, so George D. Syas WMA can support a primitive endpoint overnight when current WMA rules allow it. Do not treat that as route camping: Outdoor Nebraska / Nebraskaland still warns paddlers not to camp, picnic, or otherwise stop on private banks or the stream bed without permission except when necessary for safety, shallow-water walking, or obstacle avoidance.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at George D. Syas WMA and take out at the Monroe county access for the short upstream Loup River water-trail segment. Use USGS 06793000 near Genoa as the direct same-river gauge and treat 350 cfs as a conservative minimum-only floor rather than a full ideal-range recommendation.",
      "accessCaveats": [
        "The George D. Syas coordinate is the NGPC Public Access Atlas anchor for the named WMA fishing access. Use current WMA signs and parking layout on arrival rather than assuming a polished ramp.",
        "The Monroe county access is supported by the City of Columbus directions, designated-parking language, and same-run satellite verification of the end-of-road access area. Follow current local signs and obvious public boundaries on arrival.",
        "This route uses a conservative official minimum-only threshold, not a full preferred range. If the Genoa gauge is below about 350 cfs, expect deep-channel searching and occasional dragging.",
        "Nebraska private-bank and stream-bed rules are stricter than many paddlers expect. Stay with the named public endpoints and do not plan lunch stops, scouting stops, or casual bank exits on private land.",
        "Wind can make this short sandy reach feel slower than the clock suggests, especially when the broad braided channel spreads out at lower water."
      ],
      "watchFor": [
        "Flows below about 350 cfs at Genoa, when NGPC / Nebraskaland says the George D. Syas-to-Monroe segment can require deep-channel work and occasional dragging.",
        "High or rising water, thunderstorms, or unclear take-out conditions, because the route has no official high-water band and should stay conservative outside the known low-water guidance.",
        "Wide braided channels, shallow bars, wrong-channel choices, wind across open bends, and private-bank temptation when the obvious line gets thin.",
        "Fresh wood, strainers, snags after high water, muddy footing at the county access, and irrigation or diversion-related channel changes.",
        "Missing the Monroe take-out because the final approach is a simple county-access road end rather than a developed marina or state-park ramp."
      ]
    }
  },
  "loup-river-george-syas-columbus": {
    "putIn": {
      "id": "george-d-syas-wma-fishing-access",
      "name": "George D. Syas WMA fishing access",
      "latitude": 41.43328221,
      "longitude": -97.68464875
    },
    "takeOut": {
      "id": "columbus-hotel-side-finish",
      "name": "Columbus hotel-side finish near Pawnee Park Trail",
      "latitude": 41.4195401,
      "longitude": -97.3672208
    },
    "logistics": {
      "distanceLabel": "About 24 mi",
      "estimatedPaddleTime": "About 8 hr to 10 hr in ordinary conditions, longer with headwind, low-water channel hunting, breaks, or a slower group",
      "shuttle": "Stage the Columbus finish first, then drive back to the George D. Syas WMA fishing access. Treat the route as a real all-day shuttle: the finish uses the hotel-side parking and Pawnee Park Trail walk described by Nebraskaland and the City of Columbus, while the put-in is a simple WMA fishing access rather than a developed park ramp.",
      "permits": "No route-specific private paddling permit is known for this segment. Follow Nebraska boating and PFD rules, obey posted WMA, county, hotel-side, and city-trail rules, and respect same-day closures, muddy-road issues, or parking limits.",
      "camping": "Nebraska Game and Parks' current fishing guide lists primitive camping at Loup River WMAs, so George D. Syas WMA can support a primitive endpoint overnight when current WMA rules allow it. Do not treat that as route camping: Outdoor Nebraska / Nebraskaland still warns paddlers not to camp, picnic, or otherwise stop on private banks or the stream bed without permission except when safety, shallow-water walking, or obstacle avoidance requires it.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at George D. Syas WMA and finish at Columbus for the full Loup River Water Trail continuation. Use USGS 06793000 near Genoa as the direct same-river gauge and treat 350 cfs as a conservative minimum-only floor rather than a full ideal-range recommendation.",
      "accessCaveats": [
        "Monroe is the clearest intermediate bailout and should be treated as a real checkpoint before you commit to the final 16 miles toward Columbus.",
        "The George D. Syas coordinate is the NGPC Public Access Atlas anchor for the named fishing access rather than a polished concrete ramp.",
        "The Columbus finish is a hotel-side parking and trail walk arrangement, not a staffed marina. Follow current local signs and obvious public boundaries on arrival.",
        "The Pawnee Park underpass connecting East and West Pawnee Park has been closed since June 9, 2025, so expect a current detour or changed trail circulation near the finish."
      ],
      "watchFor": [
        "Flows below about 350 cfs at Genoa, when the upper eight miles can require deep-channel work and the full day gets dramatically slower.",
        "Headwind across open bends, wrong-channel choices, fresh wood, and fatigue stacking up over the two-segment continuation.",
        "High or rising water, thunderstorms, or unclear finish access conditions, because the route has no official high-water band and should stay conservative outside the known low-water guidance."
      ]
    },
    "accessPoints": [
      {
        "id": "monroe-county-access",
        "name": "Monroe county access south of Monroe",
        "latitude": 41.46117475580161,
        "longitude": -97.59934674467611,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Best named bailout and midpoint checkpoint before committing to the final Columbus run."
      }
    ]
  },
  "loup-river-monroe-columbus": {
    "putIn": {
      "id": "monroe-county-access",
      "name": "Monroe county access south of Monroe",
      "latitude": 41.46117475580161,
      "longitude": -97.59934674467611
    },
    "takeOut": {
      "id": "columbus-hotel-side-finish",
      "name": "Columbus hotel-side finish near Pawnee Park Trail",
      "latitude": 41.4195401,
      "longitude": -97.3672208
    },
    "logistics": {
      "distanceLabel": "About 16 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr in ordinary conditions, longer with headwind, low-water channel hunting, breaks, or a slower group",
      "shuttle": "Stage the Columbus finish first, then drive back to the Monroe county access south of Monroe. The official city directions say the Monroe public access sits south of Monroe on 370th Avenue, about one-eighth mile past the Loup River bridge, then east to the end of the road. The Columbus finish uses the hotel-side parking and Pawnee Park Trail arrangement described by the City of Columbus and Nebraskaland.",
      "permits": "No route-specific private paddling permit is known for this segment. Follow Nebraska boating and PFD rules, obey posted county, hotel-side, and city-trail rules, and respect same-day closures, muddy-road issues, or parking limits.",
      "camping": "Treat this as a committed day trip, not a camping route. Outdoor Nebraska / Nebraskaland warns paddlers not to camp, picnic, or otherwise stop on private banks or the stream bed without permission except when safety, shallow-water walking, or obstacle avoidance requires it.",
      "campingClassification": "none",
      "summary": "Launch at the Monroe county access and finish at Columbus for the core middle Loup River water-trail day. Use USGS 06793000 near Genoa as the direct same-river gauge and treat 350 cfs as a conservative minimum-only floor rather than a full ideal-range recommendation.",
      "accessCaveats": [
        "The Monroe coordinate is a practical public-access anchor based on the official city directions and prior map verification rather than a published county GIS ramp point.",
        "The Columbus finish is a hotel-side parking and trail walk arrangement, not a staffed marina. Follow current local signs and obvious public boundaries on arrival.",
        "The Pawnee Park underpass connecting East and West Pawnee Park has been closed since June 9, 2025, so expect current detours or changed trail circulation near the finish.",
        "Nebraska private-bank and stream-bed rules are stricter than many paddlers expect. Stay with the named public endpoints and do not plan casual bank stops on private land."
      ],
      "watchFor": [
        "Flows below about 350 cfs at Genoa, when channel hunting and occasional dragging become more likely.",
        "Headwind across open bends, wrong-channel choices, fresh wood, and fatigue over a long sandy-river day.",
        "High or rising water, thunderstorms, or unclear finish access conditions, because the route has no official high-water band and should stay conservative outside the known low-water guidance."
      ]
    }
  },
  "loup-river-columbus-adm-access": {
    "putIn": {
      "id": "columbus-hotel-side-access",
      "name": "Columbus hotel-side access near Pawnee Park Trail",
      "latitude": 41.4195401,
      "longitude": -97.3672208
    },
    "takeOut": {
      "id": "adm-access-site",
      "name": "ADM access site south of Southeast 9th Street",
      "latitude": 41.40165,
      "longitude": -97.2893
    },
    "logistics": {
      "distanceLabel": "About 4.5 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr in ordinary conditions, longer with headwind, shallow bars, or slower groups",
      "shuttle": "Stage the downstream ADM access site area first, then return to the Columbus hotel-side access. The upstream endpoint uses the established Ramada / Quality Inn parking arrangement and Pawnee Park Trail approach; the downstream endpoint is a leased access area on ADM property south of Southeast 9th Street, so inspect current signage, fencing, and riverbank footing before launching.",
      "permits": "No route-specific private paddling permit is known for this segment. Follow Nebraska boating and PFD rules, obey posted city-trail, hotel-side, and ADM-site access rules, and respect any same-day closures, muddy-road issues, or parking limits.",
      "camping": "Treat this as a short daylight float. Outdoor Nebraska / Nebraskaland warns paddlers not to camp, picnic, or otherwise stop on private banks or the stream bed without permission except when safety, shallow-water walking, or obstacle avoidance requires it.",
      "campingClassification": "none",
      "summary": "Launch at the Columbus hotel-side access and finish at the ADM access site for the final short Loup River Water Trail float. Use USGS 06793000 near Genoa as the direct same-river gauge and treat 350 cfs as a conservative minimum-only floor rather than a full ideal-range recommendation.",
      "accessCaveats": [
        "The Columbus put-in is the same hotel-side access described by the City of Columbus and Nebraskaland, not a staffed park marina.",
        "The ADM endpoint is a leased access area on industrial property. The coordinate is a nearby practical plant anchor rather than a surveyed launch pin, so same-day signs and obvious public boundaries control.",
        "Nebraska private-bank and stream-bed rules are stricter than many paddlers expect. Stay with the named public endpoints and do not plan casual bank stops on private land."
      ],
      "watchFor": [
        "Flows below about 350 cfs at Genoa, when shallow-channel choices and dragging become more likely.",
        "Wind across open bends, wrong-channel choices around sandbars, fresh wood, and muddy or awkward footing at the simple downstream finish.",
        "High or rising water, thunderstorms, or unclear industrial-site access conditions, because the route has no official high-water band and should stay conservative outside the known low-water guidance."
      ]
    }
  },
  "loup-river-monroe-adm-access": {
    "putIn": {
      "id": "monroe-county-access",
      "name": "Monroe county access south of Monroe",
      "latitude": 41.46117475580161,
      "longitude": -97.59934674467611
    },
    "takeOut": {
      "id": "adm-access-site",
      "name": "ADM access site south of Southeast 9th Street",
      "latitude": 41.40165,
      "longitude": -97.2893
    },
    "logistics": {
      "distanceLabel": "About 20.5 mi",
      "estimatedPaddleTime": "About 8 hr to 10 hr in ordinary conditions, longer with headwind, low-water channel hunting, breaks, or slower groups",
      "shuttle": "Stage the downstream ADM access area first, then drive back to the Monroe county access south of Monroe. The Monroe endpoint is the same county access described by the official city directions, while the downstream finish is a leased access area on ADM property south of Southeast 9th Street and should be inspected for current signage, fencing, and riverbank footing before launch.",
      "permits": "No route-specific private paddling permit is known for this segment. Follow Nebraska boating and PFD rules, obey posted county, city-trail, hotel-side, and ADM-site rules, and respect same-day closures, muddy-road issues, or parking limits.",
      "camping": "Treat this as a committed day trip, not a camping route. Outdoor Nebraska / Nebraskaland warns paddlers not to camp, picnic, or otherwise stop on private banks or the stream bed without permission except when safety, shallow-water walking, or obstacle avoidance requires it.",
      "campingClassification": "none",
      "summary": "Launch at the Monroe county access and finish at the ADM access site for a long lower-Loup continuation past Columbus. Use USGS 06793000 near Genoa as the direct same-river gauge and treat 350 cfs as a conservative minimum-only floor rather than a full ideal-range recommendation.",
      "accessCaveats": [
        "The Monroe coordinate is a practical public-access anchor based on the official city directions and prior map verification rather than a published county GIS ramp point.",
        "Columbus is the clearest intermediate bailout and should be treated as a real checkpoint before committing to the final 4.5 miles toward the ADM access.",
        "The ADM endpoint is a leased access area on industrial property. The coordinate is a nearby practical plant anchor rather than a surveyed launch pin, so same-day signs and obvious public boundaries control.",
        "The Pawnee Park underpass connecting East and West Pawnee Park has been closed since June 9, 2025, so expect changed trail circulation if you use Columbus as a checkpoint or backup finish."
      ],
      "watchFor": [
        "Flows below about 350 cfs at Genoa, when shallow-channel choices and dragging become more likely.",
        "Headwind across open bends, wrong-channel choices, fresh wood, and fatigue before the industrial-style downstream finish.",
        "High or rising water, thunderstorms, or unclear ADM-site access conditions, because the route has no official high-water band and should stay conservative outside the known low-water guidance."
      ]
    },
    "accessPoints": [
      {
        "id": "columbus-hotel-side-finish",
        "name": "Columbus hotel-side finish near Pawnee Park Trail",
        "latitude": 41.4195401,
        "longitude": -97.3672208,
        "mileFromStart": 16,
        "segmentKind": "creek",
        "note": "Best named checkpoint and bailout before committing to the final 4.5-mile ADM continuation."
      }
    ]
  },
  "loup-river-george-syas-adm-access": {
    "putIn": {
      "id": "george-d-syas-wma-fishing-access",
      "name": "George D. Syas WMA fishing access",
      "latitude": 41.43328221,
      "longitude": -97.68464875
    },
    "takeOut": {
      "id": "adm-access-site",
      "name": "ADM access site south of Southeast 9th Street",
      "latitude": 41.40165,
      "longitude": -97.2893
    },
    "logistics": {
      "distanceLabel": "About 28.5 mi",
      "estimatedPaddleTime": "About 10 hr to 12 hr in ordinary conditions, longer with headwind, low-water channel hunting, breaks, or slower groups",
      "shuttle": "Stage the downstream ADM access area first, then drive back to the George D. Syas WMA fishing access. Treat this as a full-day shuttle and not a casual extension of the shorter Loup routes: the put-in is a simple WMA fishing access, Columbus is only an intermediate checkpoint, and the final access is a leased industrial-edge site.",
      "permits": "No route-specific private paddling permit is known for this segment. Follow Nebraska boating and PFD rules, obey posted WMA, county, city-trail, hotel-side, and ADM-site rules, and respect same-day closures, muddy-road issues, or parking limits.",
      "camping": "Nebraska Game and Parks' current fishing guide lists primitive camping at Loup River WMAs, so George D. Syas WMA can support a primitive endpoint overnight when current WMA rules allow it. Do not treat that as route camping: Outdoor Nebraska / Nebraskaland still warns paddlers not to camp, picnic, or otherwise stop on private banks or the stream bed without permission except when safety, shallow-water walking, or obstacle avoidance requires it.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at George D. Syas WMA and finish at the ADM access site for the longest public Loup River Water Trail continuation in the app. Use USGS 06793000 near Genoa as the direct same-river gauge and treat 350 cfs as a conservative minimum-only floor rather than a full ideal-range recommendation.",
      "accessCaveats": [
        "Monroe is the clearest first bailout and Columbus is the clearest second checkpoint before you commit to the final 4.5 miles toward the ADM access.",
        "The George D. Syas coordinate is the NGPC Public Access Atlas anchor for the named fishing access rather than a polished concrete ramp.",
        "The ADM endpoint is a leased access area on industrial property. The coordinate is a nearby practical plant anchor rather than a surveyed launch pin, so same-day signs and obvious public boundaries control.",
        "The Pawnee Park underpass connecting East and West Pawnee Park has been closed since June 9, 2025, so expect changed trail circulation if Columbus becomes your finish fallback."
      ],
      "watchFor": [
        "Flows below about 350 cfs at Genoa, when the upper eight miles can require deep-channel work and the full day gets dramatically slower.",
        "Headwind across open bends, wrong-channel choices, fresh wood, and fatigue stacking up over the entire three-segment continuation.",
        "High or rising water, thunderstorms, or unclear downstream access conditions, because the route has no official high-water band and should stay conservative outside the known low-water guidance."
      ]
    },
    "accessPoints": [
      {
        "id": "monroe-county-access",
        "name": "Monroe county access south of Monroe",
        "latitude": 41.46117475580161,
        "longitude": -97.59934674467611,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Best first bailout and checkpoint before the longer Monroe-to-Columbus day begins."
      },
      {
        "id": "columbus-hotel-side-finish",
        "name": "Columbus hotel-side finish near Pawnee Park Trail",
        "latitude": 41.4195401,
        "longitude": -97.3672208,
        "mileFromStart": 24,
        "segmentKind": "creek",
        "note": "Best second checkpoint and fallback finish before the final 4.5-mile ADM continuation."
      }
    ]
  },
  "niobrara-river-fort-niobrara-smith-falls": {
    "putIn": {"id":"fort-niobrara-nwr-launch","name":"Fort Niobrara NWR Launch Site near Cornell Bridge","latitude":42.893222,"longitude":-100.476967},
    "takeOut": {"id":"nichols-landing-smith-falls","name":"Nichols Landing, Smith Falls State Park","latitude":42.887811,"longitude":-100.315761},
    "logistics": {
      "distanceLabel":"About 10–12 river miles; verify the active channel and current outfitter map",
      "estimatedPaddleTime":"About 3 to 4 hours at ordinary flow, longer with scouting, portage, wind, or a slow group",
      "shuttle":"Stage the take-out at Nichols Landing / Smith Falls State Park, then use an outfitter shuttle or drive back to the Fort Niobrara NWR launch near Cornell Bridge. Confirm current launch access, parking, and park passes before committing.",
      "permits":"A $1 launch fee applies at Fort Niobrara NWR; Nebraska State Park vehicle/day permits apply at Smith Falls State Park. Follow NPS, USFWS, Nebraska boating, PFD, and posted river regulations.",
      "camping":"Smith Falls State Park provides endpoint camping and facilities. Private outfitters also operate campgrounds along the corridor; reserve or confirm current availability. Do not camp or land on private banks without permission.",
      "campingClassification":"endpoint_campground",
      "summary":"Use the Fort Niobrara NWR launch for the NPS-recommended day float to Nichols Landing at Smith Falls. Build a daylight plan around the current flow band, shuttle timing, route scouting, and a conservative portage plan.",
      "accessCaveats":[
        "The Fort Niobrara launch is popular and may be busy; NPS/USFWS ask private parties to stage efficiently and respect outfitter lanes.",
        "Nichols Landing is a sand landing with a sandy approach; confirm current access, park pass, and landing conditions on arrival.",
        "The direct Sparks gauge supports the official flow bands, but no gauge can guarantee obstacle-free passage. Scout rapids and wood and follow all posted closures or portage instructions.",
        "Most intervening banks are private or managed refuge/state lands. Stay within public access rules and do not improvise landings or camping.",
        "Smith Falls is a waterfall attraction immediately near the landing; stay on the designated landing/trail system and do not approach falls from the river."
      ],
      "watchFor":[
        "Discharge below 340 cfs, which the official study classifies as unboatable for the studied recreation reach.",
        "Flows 340–460 cfs, which may be boatable but lower quality with more shallow-water stops; use a conservative craft and inspect the route.",
        "Flows above 1,200 cfs, which the official study classifies as high and outside its acceptable boating band; do not treat the route as a casual float.",
        "Rapid rises, storms, thunderstorms, strainers, short rapids, and any temporary closure or landing damage.",
        "Missing the Smith Falls take-out or attempting to continue downstream without a separately reviewed endpoint and hazard package."
      ]
    }
  }
};
