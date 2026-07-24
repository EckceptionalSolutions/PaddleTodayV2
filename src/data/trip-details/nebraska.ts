// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const nebraskaRiverTripDetails: Record<string, RiverTripDetails> = {
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
      "camping": "Treat this as a daylight water-trail run unless you have a legal, reserved campsite. NGPC/Nebraskaland warns that paddlers need permission to stop on banks, sandbars, or the stream bed, except where necessary to portage around obstacles or walk through shallow water.",
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
      "latitude": 41.0175,
      "longitude": -96.2038
    },
    "logistics": {
      "distanceLabel": "About 2.9 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr at ordinary current, longer with low-water dragging, channel scouting, wind, or a slow group",
      "shuttle": "Stage the Platte River State Park access first, then drive back to the Schramm Park canoe/kayak access off Highway 31. Inspect both access points before launching because flood repairs, mud, shifted sand, park rules, or local closures can change the practical ramp or graded-bank layout.",
      "permits": "A valid Nebraska state park vehicle permit is required for state park and recreation area vehicle access. No separate private-paddling permit is known for this water-trail segment. Follow Nebraska boating and PFD rules, posted NGPC access rules, and current park closure notices.",
      "camping": "Treat this as a short day run. Platte River State Park has nearby cabins and campground options for a base-camp stay, but the Decker Creek access itself is a water-trail stop rather than a river campsite.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch from Schramm Park SRA and take out at the Decker Creek access at Platte River State Park for the upstream half of the improved lower-Platte water trail. Use USGS 06805500 at Louisville and Nebraska Game and Parks/Nebraskaland flow guidance for the same-day go/no-go call.",
      "accessCaveats": [
        "NGPC says Schramm has a canoe/kayak access point with graded bank and parking off Highway 31, but the launch was flood-damaged in 2019 and the bank drops off quickly. Make a same-day visual access check.",
        "Outdoor Nebraska says Platte River State Park has a canoe and kayak access point a few yards from the mouth of Decker Creek. The access functions mainly as a stop on the water trail, so inspect the carry, bank, and current before committing.",
        "The Platte River State Park coordinate is a practical park-access anchor for the named Decker Creek stop rather than a surveyed launch pin. Follow current on-site signs and obvious public access boundaries on arrival.",
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
      "latitude": 41.0175,
      "longitude": -96.2038
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
      "shuttle": "Stage the take-out at Louisville State Recreation Area, then drive back to the Decker Creek access at Platte River State Park. Inspect both access points before launching because flood repairs, mud, shifted sand, park rules, or local closures can change the practical ramp, bank, or parking layout.",
      "permits": "A valid Nebraska state park vehicle permit is required for state park and recreation area vehicle access. No separate private-paddling permit is known for this water-trail segment. Follow Nebraska boating and PFD rules, posted NGPC access rules, and current park closure notices.",
      "camping": "Louisville State Recreation Area has a special campsite on the river and nearby campground options, but same-day route access still depends on current bank, ramp, and reservation conditions rather than assuming a casual walk-up overnight.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from the Decker Creek access at Platte River State Park and take out at Louisville SRA for the downstream half of the improved lower-Platte water trail. Use USGS 06805500 at Louisville and Nebraska Game and Parks/Nebraskaland flow guidance for the same-day go/no-go call.",
      "accessCaveats": [
        "Outdoor Nebraska says Platte River State Park has a canoe and kayak access point a few yards from the mouth of Decker Creek. The access functions mainly as a stop on the water trail, so inspect the carry, bank, and current before committing.",
        "Louisville SRA has canoe/kayak access to the Platte River and a boat-ramp/parking area at the end of the water trail. Use current park signs, parking rules, and ramp conditions on arrival.",
        "The Platte River State Park coordinate is a practical park-access anchor for the named Decker Creek stop rather than a surveyed launch pin. Follow current on-site signs and obvious public access boundaries on arrival.",
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
      "latitude": 41.471508,
      "longitude": -97.602729
    },
    "logistics": {
      "distanceLabel": "About 8 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr in ordinary conditions, longer near the conservative floor with low-water channel hunting, dragging, wind, or a slow group",
      "shuttle": "Stage the Monroe county access first, then drive back upstream to the George D. Syas WMA fishing access. The official city directions say to travel south of Monroe on 370th Avenue over the Loup River bridge, continue about one-eighth mile, then turn east and follow the road to its end. Inspect the take-out before launching because the coordinate is a practical public-access anchor from those directions and satellite verification rather than a published county GIS point.",
      "permits": "No route-specific private paddling permit is known for this segment. Follow Nebraska boating and PFD rules, obey posted WMA and county-access rules, and respect any same-day closures, muddy-road issues, or parking limits at either endpoint.",
      "camping": "Treat this as a daylight day trip. Outdoor Nebraska / Nebraskaland warns paddlers not to camp, picnic, or otherwise stop on private banks or the stream bed without permission except when necessary for safety, shallow-water walking, or obstacle avoidance.",
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
      "camping": "Treat this as a daylight day trip. Outdoor Nebraska / Nebraskaland warns paddlers not to camp, picnic, or otherwise stop on private banks or the stream bed without permission except when safety, shallow-water walking, or obstacle avoidance requires it.",
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
        "latitude": 41.471508,
        "longitude": -97.602729,
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
      "latitude": 41.471508,
      "longitude": -97.602729
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
      "latitude": 41.41603951,
      "longitude": -97.2865376
    },
    "logistics": {
      "distanceLabel": "About 4.5 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr in ordinary conditions, longer with headwind, shallow bars, or slower groups",
      "shuttle": "Stage the downstream ADM access site area first, then return to the Columbus hotel-side access. The upstream endpoint uses the established Ramada / Quality Inn parking arrangement and Pawnee Park Trail approach; the downstream endpoint is a leased access area on ADM property south of Southeast 9th Street, so inspect current signage, fencing, and riverbank footing before launching.",
      "permits": "No route-specific private paddling permit is known for this segment. Follow Nebraska boating and PFD rules, obey posted city-trail, hotel-side, and ADM-site access rules, and respect any same-day closures, muddy-road issues, or parking limits.",
      "camping": "Treat this as a short daylight float. Outdoor Nebraska / Nebraskaland warns paddlers not to camp, picnic, or otherwise stop on private banks or the stream bed without permission except when safety, shallow-water walking, or obstacle avoidance requires it.",
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
      "latitude": 41.471508,
      "longitude": -97.602729
    },
    "takeOut": {
      "id": "adm-access-site",
      "name": "ADM access site south of Southeast 9th Street",
      "latitude": 41.41603951,
      "longitude": -97.2865376
    },
    "logistics": {
      "distanceLabel": "About 20.5 mi",
      "estimatedPaddleTime": "About 8 hr to 10 hr in ordinary conditions, longer with headwind, low-water channel hunting, breaks, or slower groups",
      "shuttle": "Stage the downstream ADM access area first, then drive back to the Monroe county access south of Monroe. The Monroe endpoint is the same county access described by the official city directions, while the downstream finish is a leased access area on ADM property south of Southeast 9th Street and should be inspected for current signage, fencing, and riverbank footing before launch.",
      "permits": "No route-specific private paddling permit is known for this segment. Follow Nebraska boating and PFD rules, obey posted county, city-trail, hotel-side, and ADM-site rules, and respect same-day closures, muddy-road issues, or parking limits.",
      "camping": "Treat this as a committed day trip, not a camping route. Outdoor Nebraska / Nebraskaland warns paddlers not to camp, picnic, or otherwise stop on private banks or the stream bed without permission except when safety, shallow-water walking, or obstacle avoidance requires it.",
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
      "latitude": 41.41603951,
      "longitude": -97.2865376
    },
    "logistics": {
      "distanceLabel": "About 28.5 mi",
      "estimatedPaddleTime": "About 10 hr to 12 hr in ordinary conditions, longer with headwind, low-water channel hunting, breaks, or slower groups",
      "shuttle": "Stage the downstream ADM access area first, then drive back to the George D. Syas WMA fishing access. Treat this as a full-day shuttle and not a casual extension of the shorter Loup routes: the put-in is a simple WMA fishing access, Columbus is only an intermediate checkpoint, and the final access is a leased industrial-edge site.",
      "permits": "No route-specific private paddling permit is known for this segment. Follow Nebraska boating and PFD rules, obey posted WMA, county, city-trail, hotel-side, and ADM-site rules, and respect same-day closures, muddy-road issues, or parking limits.",
      "camping": "Treat this as a very long day trip, not a camping route. Outdoor Nebraska / Nebraskaland warns paddlers not to camp, picnic, or otherwise stop on private banks or the stream bed without permission except when safety, shallow-water walking, or obstacle avoidance requires it.",
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
        "latitude": 41.471508,
        "longitude": -97.602729,
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
  }
};
