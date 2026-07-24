// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const texasRiverTripDetails: Record<string, RiverTripDetails> = {
  "village-creek-fm418-sh327": {
    "putIn": {
      "id": "fm-418-boat-launch",
      "name": "FM 418 Boat Launch",
      "latitude": 30.397794,
      "longitude": -94.265024
    },
    "takeOut": {
      "id": "tx-327-boat-launch",
      "name": "TX 327 Boat Launch",
      "latitude": 30.346944,
      "longitude": -94.239385
    },
    "logistics": {
      "distanceLabel": "About 8.6 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr at ordinary levels, slower near the floor or when sandbars, logjams, heat, or shuttle delays stack up",
      "shuttle": "Stage the TX 327 take-out first, then drive back north to FM 418. Inspect both launches before leaving vehicles because they are simple unpaved bridge-side access points rather than staffed ramps or park marinas.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey current Big Thicket National Preserve regulations and any posted bridge-access signs.",
      "camping": "Treat the standard FM 418 to TX 327 run as a day trip. For longer multi-segment Village Creek trips, Big Thicket says overnight camping permits are free through the visitor center, and Village Creek State Park is a nearby base-camp option farther downstream.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at FM 418 and take out at TX 327 for the easiest upper Village Creek day in Big Thicket. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on water level, wood, weather, and private-boundary discipline before committing.",
      "accessCaveats": [
        "NPS identifies both FM 418 and TX 327 as TxDOT-managed canoe/kayak/small-boat launches with auto and trailer parking, but both are still unpaved bridge accesses rather than improved ramps.",
        "The preserve does not provide boat rentals or shuttles. Arrange a self-shuttle or local outfitter plan before launching.",
        "TPWD says Village Creek water quality is variable and not recommended for drinking. Bring your own water even on a short family-style paddle.",
        "Big Thicket boundaries can sit just above the high-water line in places. Respect preserve boundary markers and do not treat private banks as casual picnic or bailout stops.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more shallow routing, sandbar scraping, and log avoidance."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when NPS says exposed sandbars and logs become more common.",
        "Stage around or above about 10 ft, rising water, or fresh heavy rain, when NPS warns the creek can become swift and hazardous despite the flatwater setting.",
        "Snags, logjams, overhanging limbs, sandbars, and short portages around obstructions, especially after storms or on low summer water.",
        "Summer heat, insects, thunderstorms, cold water outside the warm season, and a longer half-day than the calm scenery first suggests.",
        "Private banks between the launches and the temptation to wander above the ordinary high-water line instead of staying with the public access points and legal stream corridor."
      ]
    }
  },
  "guadalupe-river-fm766-sh72": {
    "putIn": {
      "id": "fm-766-hells-gate",
      "name": "FM 766 (Hell's Gate)",
      "latitude": 29.1472,
      "longitude": -97.3177
    },
    "takeOut": {
      "id": "sh-72-access-point",
      "name": "SH 72",
      "latitude": 29.0903,
      "longitude": -97.3296
    },
    "logistics": {
      "distanceLabel": "About 6.6 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr at ordinary levels, longer if low water, wood, weather, or the dam-remnant portage slows the day",
      "shuttle": "Stage the SH 72 take-out first, then drive back to FM 766. Inspect both bridge-side access points before leaving vehicles because they are simple highway accesses rather than staffed ramps or park marinas.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey posted bridge-access signs and any current TPWD guidance.",
      "camping": "Treat this as a day trip. No established route camping or endpoint campground is documented in the current TPWD trail material for FM 766 to SH 72.",
      "campingClassification": "none",
      "summary": "Launch at Hell's Gate and take out at SH 72 for the shorter Cuero segment of the Guadalupe Valley Paddling Trail. Use USGS 08175800 at Cuero with a conservative 200 cfs floor, then make a same-day call on weather, current, wood, and the remnant-dam portage before committing.",
      "accessCaveats": [
        "TPWD identifies FM 766 and SH 72 as public access points with posted GPS coordinates, but both are still bridge-side highway accesses rather than improved park ramps.",
        "TPWD identifies Hwy 183 as an emergency take-out about 2.6 miles below SH 72 if the planned exit becomes unusable or the group continues only with a separate downstream plan.",
        "The Cuero Guadalupe can see rainfall-driven high flows and undesirable water-quality conditions. Bring your own drinking water and treat storm runoff conservatively.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. Even at moderate readings, the remnant-dam portage and low-water wood still require attention."
      ],
      "watchFor": [
        "Mandatory portage around the remnants of a dam about 2.5 miles below FM 766; scout early, land with margin, and do not run it blindly.",
        "Flows near or below about 200 cfs, when TPWD warns snags can be more prominent and the run can get scrape-prone.",
        "High or rising water after rainfall, when current speeds up, water quality can degrade, and the portage line becomes less forgiving.",
        "Faster riffles, floating wood, sweepers, strainers, and changing lines around bridge approaches and bends.",
        "Private banks outside the public launches and any narrow legal portage corridor around hazards."
      ]
    }
  },
  "guadalupe-river-sh72-fm236": {
    "putIn": {
      "id": "sh-72-access-point",
      "name": "SH 72",
      "latitude": 29.0903,
      "longitude": -97.3296
    },
    "takeOut": {
      "id": "fm-236-access-point",
      "name": "FM 236",
      "latitude": 29.0514,
      "longitude": -97.2647
    },
    "logistics": {
      "distanceLabel": "About 7.2 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr at ordinary levels, longer if low water, weather, or wood slows the day",
      "shuttle": "Stage FM 236 first, then drive back to SH 72. Inspect both bridge-side access points before leaving vehicles because they are simple highway accesses rather than staffed ramps or park marinas.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey posted bridge-access signs and any current TPWD guidance.",
      "camping": "Treat this as a day trip. No established route camping or endpoint campground is documented in the current TPWD trail material for SH 72 to FM 236.",
      "campingClassification": "none",
      "summary": "Launch at SH 72 and take out at FM 236 for the lower official Guadalupe Valley segment. Use USGS 08175800 at Cuero with a conservative 200 cfs floor, then make a same-day call on weather, current, wood, and water quality before committing.",
      "accessCaveats": [
        "TPWD identifies SH 72 and FM 236 as public access points with posted GPS coordinates, but both are still bridge-side highway accesses rather than improved park ramps.",
        "TPWD identifies Hwy 183 as an emergency take-out about 2.6 miles below SH 72 if the planned exit becomes unusable or the group needs to shorten the trip.",
        "The Cuero Guadalupe can see rainfall-driven high flows and undesirable water-quality conditions. Bring your own drinking water and treat storm runoff conservatively.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more shallow routing, sandbar scraping, and log avoidance."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, when shallow riffles, exposed gravel, and wood become more likely.",
        "High or rising water after rainfall, when current speeds up, bridge-side landings get less forgiving, and water quality can degrade.",
        "Snags, floating wood, overhanging limbs, and changing lines around bends and bridge approaches.",
        "Heat, wind on open bends, private banks outside the public launches, and a longer downstream finish than the quiet scenery first suggests."
      ]
    }
  },
  "guadalupe-river-fm766-fm236": {
    "putIn": {
      "id": "fm-766-hells-gate",
      "name": "FM 766 (Hell's Gate)",
      "latitude": 29.1472,
      "longitude": -97.3177
    },
    "takeOut": {
      "id": "fm-236-access-point",
      "name": "FM 236",
      "latitude": 29.0514,
      "longitude": -97.2647
    },
    "logistics": {
      "distanceLabel": "About 13.8 mi",
      "estimatedPaddleTime": "About 4 hr to 8 hr depending on level, weather, the dam-remnant portage, and how efficiently the group moves",
      "shuttle": "Stage FM 236 first, then drive back to FM 766. Inspect both bridge-side access points before leaving vehicles because they are simple highway accesses rather than staffed ramps or park marinas.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey posted bridge-access signs and any current TPWD guidance.",
      "camping": "Treat this as a long day trip. No established route camping or endpoint campground is documented in the current TPWD trail material for the full FM 766 to FM 236 run.",
      "campingClassification": "none",
      "summary": "Launch at Hell's Gate and take out at FM 236 for the full official Guadalupe Valley trail. Use USGS 08175800 at Cuero with a conservative 200 cfs floor, then make a same-day call on weather, current, wood, and the remnant-dam portage before committing to the full distance.",
      "accessCaveats": [
        "TPWD identifies FM 766, SH 72, and FM 236 as public access points with posted GPS coordinates, but all are still bridge-side highway accesses rather than improved park ramps.",
        "TPWD identifies Hwy 183 as an emergency take-out between SH 72 and FM 236 if the planned finish becomes impractical or the group needs to shorten the day.",
        "The Cuero Guadalupe can see rainfall-driven high flows and undesirable water-quality conditions. Bring your own drinking water and treat storm runoff conservatively.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. Even at moderate readings, the remnant-dam portage and long shuttle still require attention."
      ],
      "watchFor": [
        "Mandatory portage around the remnants of a dam about 2.5 miles below FM 766; scout early, land with margin, and do not run it blindly.",
        "Flows near or below about 200 cfs, when TPWD warns snags can be more prominent and the run can get scrape-prone.",
        "High or rising water after rainfall, when current speeds up, water quality can degrade, and the portage line becomes less forgiving.",
        "Faster riffles, floating wood, sweepers, strainers, and changing lines around bridge approaches and bends.",
        "Private banks outside the public launches and a long downstream finish that can punish a late start in heat or headwind."
      ]
    }
  },
  "village-creek-sh327-baby-galvez": {
    "putIn": {
      "id": "tx-327-boat-launch",
      "name": "TX 327 Boat Launch",
      "latitude": 30.346944,
      "longitude": -94.239385
    },
    "takeOut": {
      "id": "baby-galvez-road-boat-launch",
      "name": "Baby Galvez Road Boat Launch",
      "latitude": 30.3345,
      "longitude": -94.20391
    },
    "logistics": {
      "distanceLabel": "About 3.4 mi",
      "estimatedPaddleTime": "About 1 hr to 2.5 hr at ordinary levels, longer if the creek is low, woody, stormy, or the group wants a slower beginner outing",
      "shuttle": "Stage the Baby Galvez take-out first, then drive back to TX 327. Check both bridge-side launches before leaving vehicles because one is an unpaved highway launch and the other is a simple paved ramp at the end of a local road.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey current Big Thicket National Preserve regulations and any posted access signs.",
      "camping": "Treat this short segment as a day trip. Big Thicket allows year-round sandbar camping on Village Creek for larger through-trips, and Village Creek State Park is a stronger downstream base-camp option if you want more than a quick paddle.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at TX 327 and take out at Baby Galvez for the shortest named Village Creek public segment. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on wood, current, weather, and private-boundary discipline before launching.",
      "accessCaveats": [
        "NPS identifies TX 327 as a TxDOT-managed launch and Baby Galvez Road as a paved public boat ramp, but neither endpoint is a staffed park marina.",
        "This route is short enough to look casual, which makes it easy to underestimate rain-driven current or assume any bank stop is acceptable. Stay with the named public launches.",
        "TPWD says Village Creek water quality is variable and not recommended for drinking. Bring your own water even on a short paddle.",
        "Big Thicket boundary markers and private banks still matter on this middle segment. Do not plan casual picnics or bailouts above the ordinary high-water line.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more shallow weaving around sandbars and wood."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when sandbars, logs, and shallow route-finding become more common.",
        "Stage around or above about 10 ft, rising water, or fresh heavy rain, when the creek can become swift and hazardous despite the short mileage.",
        "Snags, logjams, overhanging limbs, sandbars, insects, thunderstorms, and muddy or slick footing at the launches.",
        "Private banks between the launches and the temptation to turn a short family paddle into an unsupported off-route stop."
      ]
    }
  },
  "village-creek-fm418-baby-galvez": {
    "putIn": {
      "id": "village-creek-fm-418-boat-launch",
      "name": "FM 418 Boat Launch",
      "latitude": 30.397794,
      "longitude": -94.265024
    },
    "takeOut": {
      "id": "baby-galvez-road-boat-launch",
      "name": "Baby Galvez Road Boat Launch",
      "latitude": 30.3345,
      "longitude": -94.20391
    },
    "logistics": {
      "distanceLabel": "About 12.0 mi",
      "estimatedPaddleTime": "About 4.5 hr to 7 hr at ordinary levels, longer near the floor or when heat, wood, or a slower group stretch out the day",
      "shuttle": "Stage the Baby Galvez take-out first, then drive back to FM 418. Inspect both launches before leaving vehicles because the trip starts at an unpaved bridge launch, crosses the TX 327 midpoint, and ends at a simpler paved road-end ramp.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey current Big Thicket National Preserve regulations and any posted access signs.",
      "camping": "Treat this as a long day trip by default. Big Thicket allows year-round sandbar camping on Village Creek for larger through-trips, and Village Creek State Park is a stronger downstream base-camp option if you want legal campground support beyond the route itself.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at FM 418 and take out at Baby Galvez Road for a longer upper-to-middle Village Creek float with TX 327 as the midpoint bailout. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on current, weather, wood, and heat before committing.",
      "accessCaveats": [
        "NPS identifies FM 418 as an unpaved bridge launch and Baby Galvez as a paved public boat ramp, but neither endpoint is a staffed park marina.",
        "TX 327 is the clean midpoint bailout. Reassess there instead of forcing the continuation if the gauge, weather, wood load, or group pace is not matching the plan.",
        "TPWD says Village Creek water quality is variable and not recommended for drinking. Carry enough water for a longer East Texas day.",
        "Big Thicket boundary markers and private banks still matter on this longer segment. Do not plan casual picnics or bailouts above the ordinary high-water line.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more dragging, shallow weaving, and wood dodging across a longer day."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when exposed sandbars, logs, and shallow route-finding become more common over the longer mileage.",
        "Stage around or above about 10 ft, rising water, or fresh heavy rain, when the creek can become swift and hazardous despite the flatwater character.",
        "Snags, logjams, overhanging limbs, sandbars, insects, thunderstorms, and muddy or slick footing at the FM 418 and TX 327 bridge launches.",
        "Private banks between the launches and the temptation to turn a long but easy-looking creek day into an unsupported off-route stop."
      ]
    },
    "accessPoints": [
      {
        "id": "village-creek-fm-418-boat-launch",
        "name": "FM 418 Boat Launch",
        "latitude": 30.397794,
        "longitude": -94.265024,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upper Village Creek put-in."
      },
      {
        "id": "tx-327-boat-launch",
        "name": "TX 327 Boat Launch",
        "latitude": 30.346944,
        "longitude": -94.239385,
        "mileFromStart": 8.6,
        "segmentKind": "creek",
        "note": "Primary midpoint bailout and the shortest official restart option."
      },
      {
        "id": "baby-galvez-road-boat-launch",
        "name": "Baby Galvez Road Boat Launch",
        "latitude": 30.3345,
        "longitude": -94.20391,
        "mileFromStart": 12,
        "segmentKind": "creek",
        "note": "Default longer upper-to-middle finish at the paved public ramp."
      }
    ]
  },
  "village-creek-baby-galvez-us-96": {
    "putIn": {
      "id": "baby-galvez-road-boat-launch",
      "name": "Baby Galvez Road Boat Launch",
      "latitude": 30.3345,
      "longitude": -94.20391
    },
    "takeOut": {
      "id": "us-96-boat-launch",
      "name": "US 96 Boat Launch",
      "latitude": 30.2857,
      "longitude": -94.19145
    },
    "logistics": {
      "distanceLabel": "About 7.1 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr at ordinary levels, longer near the floor or when heat, sandbars, wood, or a slow group stretch out the day",
      "shuttle": "Stage the US 96 take-out first, then drive back to Baby Galvez Road. Inspect both paved public ramps and parking areas before leaving vehicles because storms, mud, debris, or local maintenance can change how easy the access feels on arrival.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey current Big Thicket National Preserve regulations and any posted county or preserve access notices.",
      "camping": "Treat this as a long day trip by default. Big Thicket says camping is allowed year-round on sandbars along Village Creek, and Village Creek State Park is a stronger downstream base-camp option if you want legal campground support instead of primitive sandbar choices.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Baby Galvez Road and take out at US 96 for a longer lower-middle Village Creek float with public launches at both ends. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on current, weather, wood, and heat before committing.",
      "accessCaveats": [
        "NPS identifies Baby Galvez and US 96 as public boat ramps tied to the Village Creek trail; US 96 is managed by Hardin County and Baby Galvez is a local road-end launch in preserve country.",
        "The preserve does not provide boat rentals or shuttles. Arrange your own shuttle before launching.",
        "TPWD says Village Creek water quality is variable and not recommended for drinking. Carry enough water for a longer East Texas day.",
        "Big Thicket says sandbar camping is allowed on Village Creek, but this route still works best as a planned day float unless you have a clear overnight plan and are comfortable managing rising water risk.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more scraping, wood dodging, and slow travel."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when exposed sandbars and logs become more common and the longer mileage gets slower.",
        "Stage around or above about 10 ft, rising water, or fresh heavy rain, when the creek can become swift and hazardous on an otherwise mellow corridor.",
        "Snags, logjams, overhanging limbs, floating debris, insects, thunderstorms, sun exposure, and a longer self-supported shuttle than the short Village Creek links.",
        "Private banks between the launches and overconfidence from the route's generally calm flatwater character."
      ]
    }
  },
  "village-creek-sh327-us-96": {
    "putIn": {
      "id": "tx-327-boat-launch",
      "name": "TX 327 Boat Launch",
      "latitude": 30.346944,
      "longitude": -94.239385
    },
    "takeOut": {
      "id": "us-96-boat-launch",
      "name": "US 96 Boat Launch",
      "latitude": 30.2857,
      "longitude": -94.19145
    },
    "logistics": {
      "distanceLabel": "About 10.5 mi",
      "estimatedPaddleTime": "About 4 hr to 6.5 hr at ordinary levels, longer near the floor or when heat, wood, or a slow group stretch out the day",
      "shuttle": "Stage the US 96 take-out first, then drive back to TX 327. Inspect all three named public launches before committing because Baby Galvez is the key midpoint bailout if conditions change after launch.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey current Big Thicket National Preserve regulations and any posted county or preserve access notices.",
      "camping": "Treat this as a long day trip by default. Big Thicket says camping is allowed year-round on sandbars along Village Creek, and Village Creek State Park is a stronger downstream base-camp option if you want legal campground support instead of primitive sandbar choices.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at TX 327 and take out at US 96 for a longer middle-corridor Village Creek float with Baby Galvez as the midpoint bailout. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on current, weather, wood, and heat before committing.",
      "accessCaveats": [
        "NPS identifies TX 327 as a TxDOT-managed bridge launch, Baby Galvez as a paved public ramp, and US 96 as a paved Hardin County launch tied to the same public trail.",
        "Baby Galvez is the clean midpoint reassessment point. Do not force the continuation to US 96 just because the first miles felt calm.",
        "TPWD says Village Creek water quality is variable and not recommended for drinking. Carry enough water for a longer East Texas day.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more scraping, wood dodging, and slow travel."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when exposed sandbars and logs become more common and the longer mileage gets slower.",
        "Stage around or above about 10 ft, rising water, or fresh heavy rain, when the creek can become swift and hazardous on an otherwise mellow corridor.",
        "Snags, logjams, overhanging limbs, floating debris, insects, thunderstorms, sun exposure, and a longer self-supported shuttle than the short Village Creek links.",
        "Private banks between the launches and overconfidence from the route's generally calm flatwater character."
      ]
    },
    "accessPoints": [
      {
        "id": "tx-327-boat-launch",
        "name": "TX 327 Boat Launch",
        "latitude": 30.346944,
        "longitude": -94.239385,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default middle-corridor put-in below the highway bridge."
      },
      {
        "id": "baby-galvez-road-boat-launch",
        "name": "Baby Galvez Road Boat Launch",
        "latitude": 30.3345,
        "longitude": -94.20391,
        "mileFromStart": 3.4,
        "segmentKind": "creek",
        "note": "Primary midpoint bailout before the longer lower continuation."
      },
      {
        "id": "us-96-boat-launch",
        "name": "US 96 Boat Launch",
        "latitude": 30.2857,
        "longitude": -94.19145,
        "mileFromStart": 10.5,
        "segmentKind": "creek",
        "note": "Default longer middle-corridor finish near Lumberton."
      }
    ]
  },
  "village-creek-us-96-state-park": {
    "putIn": {
      "id": "us-96-boat-launch",
      "name": "US 96 Boat Launch",
      "latitude": 30.2857,
      "longitude": -94.19145
    },
    "takeOut": {
      "id": "village-creek-state-park-canoe-launch",
      "name": "Village Creek State Park canoe launch",
      "latitude": 30.2553,
      "longitude": -94.171
    },
    "logistics": {
      "distanceLabel": "About 3.2 mi",
      "estimatedPaddleTime": "About 1 hr to 3 hr at ordinary levels, longer if low water, flooding, wildlife delays, or family pacing slow the trip",
      "shuttle": "Stage the Village Creek State Park take-out first, then drive back to the US 96 launch. Confirm current state-park launch status, fees, and flooding impacts before leaving vehicles because the park access can change after high water.",
      "permits": "No route-specific private paddling permit is known for a same-day trip, but you may need to pay any current state-park entrance fee at the take-out. Follow Texas boating and PFD rules, use the named public launches, and obey current Big Thicket and TPWD park notices.",
      "camping": "This is the strongest lower Village Creek segment for legal campground support. Village Creek State Park has campsites, a cabin, and direct canoe-launch access at the take-out. Big Thicket also allows year-round sandbar camping on Village Creek for paddlers who have a more primitive overnight plan.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at the US 96 public ramp and finish at Village Creek State Park for the short downstream state-park segment. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on current, flood impacts, wildlife, and launch conditions before committing.",
      "accessCaveats": [
        "NPS identifies the US 96 launch as a paved public ramp and says the next launch is Village Creek State Park 3.2 miles downstream; TPWD separately publishes the state-park canoe-launch coordinate and paddling access.",
        "Check with Village Creek State Park on the status of the canoe launch after flooding or storm damage. Do not assume the normal take-out path is usable on every visit.",
        "TPWD says alligators live in the area. Give wildlife space, keep pets and food controlled, and do not create shoreline conflicts at the park launch.",
        "TPWD says Village Creek water quality is variable and not recommended for drinking. Bring your own water even on this short segment.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more shallow sandbars and wood near the park finish."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when exposed sandbars, logs, and shallow routing become more common.",
        "Stage around or above about 10 ft, rising water, fresh heavy rain, or park-launch flood impacts that can turn an easy short float into a poor access decision.",
        "Snags, logjams, floating debris, insects, thunderstorms, muddy footing, alligators, and other wildlife near the lower corridor and park take-out.",
        "Private banks between the launches and the temptation to treat state-park access as proof that any stop along the way is equally public."
      ]
    }
  },
  "village-creek-baby-galvez-state-park": {
    "putIn": {
      "id": "baby-galvez-road-boat-launch",
      "name": "Baby Galvez Road Boat Launch",
      "latitude": 30.3345,
      "longitude": -94.20391
    },
    "takeOut": {
      "id": "village-creek-state-park-canoe-launch",
      "name": "Village Creek State Park canoe launch",
      "latitude": 30.2553,
      "longitude": -94.171
    },
    "logistics": {
      "distanceLabel": "About 10.3 mi",
      "estimatedPaddleTime": "About 4 hr to 6.5 hr at ordinary levels, longer near the floor or when heat, wildlife delays, or flooding-sensitive access stretch out the day",
      "shuttle": "Stage the Village Creek State Park take-out first, then drive back to Baby Galvez Road. Inspect the US 96 midpoint launch and the state-park finish before leaving vehicles because both are the clean contingency points if conditions or pace change.",
      "permits": "No route-specific private paddling permit is known for a same-day trip, but you may need to pay any current state-park entrance fee at the take-out. Follow Texas boating and PFD rules, use the named public launches, and obey current Big Thicket and TPWD park notices.",
      "camping": "This is the strongest longer lower Village Creek segment for legal campground support. Village Creek State Park has campsites, a cabin, and direct canoe-launch access at the take-out. Big Thicket also allows year-round sandbar camping on Village Creek for paddlers who have a more primitive overnight plan.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Baby Galvez Road and finish at Village Creek State Park for a longer lower Village Creek continuation with US 96 as the midpoint bailout. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on current, flood impacts, weather, and wildlife before committing.",
      "accessCaveats": [
        "NPS identifies Baby Galvez and US 96 as public boat ramps tied to the Village Creek trail, and TPWD separately publishes the state-park canoe-launch coordinate and paddling access.",
        "Check with Village Creek State Park on the status of the canoe launch after flooding or storm damage. Do not assume the normal take-out path is usable on every visit.",
        "TPWD says alligators live in the area. Give wildlife space, keep pets and food controlled, and do not create shoreline conflicts at the park launch.",
        "TPWD says Village Creek water quality is variable and not recommended for drinking. Bring your own water even on a route that finishes inside the park.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more shallow sandbars and wood on the lower miles."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when exposed sandbars, logs, and shallow routing become more common.",
        "Stage around or above about 10 ft, rising water, fresh heavy rain, or park-launch flood impacts that can turn a scenic lower day into a poor access decision.",
        "Snags, logjams, floating debris, insects, thunderstorms, muddy footing, alligators, and other wildlife near the lower corridor and park take-out.",
        "Private banks between the launches and the temptation to treat state-park access as proof that any stop along the way is equally public."
      ]
    },
    "accessPoints": [
      {
        "id": "baby-galvez-road-boat-launch",
        "name": "Baby Galvez Road Boat Launch",
        "latitude": 30.3345,
        "longitude": -94.20391,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default lower-corridor put-in at the paved public ramp."
      },
      {
        "id": "us-96-boat-launch",
        "name": "US 96 Boat Launch",
        "latitude": 30.2857,
        "longitude": -94.19145,
        "mileFromStart": 7.1,
        "segmentKind": "creek",
        "note": "Primary midpoint bailout before the state-park finish."
      },
      {
        "id": "village-creek-state-park-canoe-launch",
        "name": "Village Creek State Park canoe launch",
        "latitude": 30.2553,
        "longitude": -94.171,
        "mileFromStart": 10.3,
        "segmentKind": "creek",
        "note": "Default longer lower finish with direct campground support."
      }
    ]
  },
  "village-creek-fm418-state-park": {
    "putIn": {
      "id": "village-creek-fm-418-boat-launch",
      "name": "FM 418 Boat Launch",
      "latitude": 30.3978,
      "longitude": -94.2647
    },
    "takeOut": {
      "id": "village-creek-state-park-canoe-launch",
      "name": "Village Creek State Park canoe launch",
      "latitude": 30.2553,
      "longitude": -94.171
    },
    "logistics": {
      "distanceLabel": "About 20.9 mi",
      "estimatedPaddleTime": "Too long for one day for most groups; plan a very strong all-day push or an overnight with a legal camping plan",
      "shuttle": "Stage the state-park take-out first, then drive back to FM 418. This is a long shuttle through the Big Thicket corridor, so verify park hours, preserve permit plans, launch conditions, and vehicle security before committing.",
      "permits": "TPWD says overnight camping permits for the preserve corridor are free and available at the Big Thicket National Preserve Visitor Center. Follow current Big Thicket, Texas boating, PFD, and state-park entry and camping rules.",
      "camping": "TPWD says the full trail is too long to paddle in one day and that free overnight camping permits are available through Big Thicket National Preserve; Village Creek State Park also has campsites and a cabin at the take-out.",
      "campingClassification": "overnight_capable",
      "summary": "Launch at FM 418 and finish at Village Creek State Park for the full public Village Creek trail. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on water level, weather, wood, and whether the trip should be split overnight.",
      "accessCaveats": [
        "TPWD publishes five access points along this trail, so groups should not force the entire route into one day unless they have the pace, weather window, and shuttle discipline for it.",
        "TPWD says water quality is variable and not recommended for drinking. Bring your own water even if you plan to stop overnight.",
        "The entire corridor sits within Big Thicket National Preserve boundaries, but preserve limits can be just above the high-water line in places. Respect boundary markers and private-bank limits.",
        "The downstream Village Creek State Park canoe launch can be affected by flooding, and the lower corridor is where alligator awareness matters most even though sightings are uncommon."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when TPWD says snags, logjams, and sandbars become more prominent and low-water delays compound over a 20.9-mile route.",
        "High or rising water, especially around 10 ft or higher, when TPWD warns that the creek can become swift and hazardous despite the flatwater setting.",
        "Heat, thunderstorms, insects, private-bank discipline, and fatigue from treating an easy-looking creek like a casual short float.",
        "Snags, overhanging limbs, strainers, and the need to re-evaluate at SH 327, Baby Galvez, or US 96 instead of pressing on with a tired group."
      ]
    }
  },
  "south-llano-river-cupgrass-state-park": {
    "putIn": {
      "name": "TPWD Cupgrass Access",
      "latitude": 30.393543,
      "longitude": -99.886693
    },
    "takeOut": {
      "name": "South Llano River State Park paddling access",
      "latitude": 30.4498,
      "longitude": -99.8128
    },
    "logistics": {
      "distanceLabel": "About 9.3 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr at a casual kayak or canoe pace, longer at lower water or with fishing stops",
      "shuttle": "Stage the take-out at South Llano River State Park first, then drive back to the gated Cupgrass lease site. Confirm Cupgrass parking by text before launch and reserve state-park entry or camping ahead of time during busy periods.",
      "permits": "No route-specific paddling permit is published. Cupgrass parking must be arranged with TPWD, and South Llano River State Park often recommends advance reservations for day use and camping.",
      "camping": "South Llano River State Park has developed campsites with hookups, walk-in sites, and primitive hike-in sites. This route can finish directly into that campground setting.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch through Bailey Creek at the TPWD Cupgrass access and paddle down to South Llano River State Park for a spring-fed Hill Country day with quiet pools, riffles, wildlife, and a campground finish.",
      "accessCaveats": [
        "TPWD says Cupgrass parking is by advance text reservation and that boats launch via Bailey Creek before entering the South Llano proper.",
        "South Llano River State Park is a popular destination that can reach capacity, so day-use or camping reservations are the cleanest way to secure the take-out plan.",
        "Use only the named public access points and direct river-portage paths because most of the shoreline between them remains private."
      ],
      "watchFor": [
        "Shallow riffles, scrape spots, and woody edges when the Flat Rock gauge is near the conservative 65 cfs floor.",
        "Fresh strainers after storms, plus faster current and murkier water when runoff reaches the corridor.",
        "Bright sun, long mileage for casual groups, and limited mid-route public exits compared with the short trail splits near Junction."
      ]
    }
  },
  "south-llano-river-state-park-flatrock-lane": {
    "putIn": {
      "name": "South Llano River State Park paddling access",
      "latitude": 30.4498,
      "longitude": -99.8128
    },
    "takeOut": {
      "name": "Flatrock Lane Crossing",
      "latitude": 30.4789,
      "longitude": -99.7778
    },
    "logistics": {
      "distanceLabel": "About 4.7 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr at an easy recreational pace",
      "shuttle": "Use a short Junction-area shuttle between South Llano River State Park and Flatrock Lane Crossing. If you are entering the park only to launch, reserve day use first during the busy season.",
      "permits": "No route-specific paddling permit is published. South Llano River State Park charges normal park entry and often recommends reservations for day use; follow current park and PFD rules.",
      "camping": "South Llano River State Park has developed and primitive campsites at the put-in, making this a simple campground-based half-day float.",
      "campingClassification": "endpoint_campground",
      "summary": "Put in at South Llano River State Park and float to Flatrock Lane for the upper split of the official paddling trail. This is a short spring-fed run with clear pools, easy riffles, and a required state-park bridge portage near the start.",
      "accessCaveats": [
        "TPWD says the damaged state-park bridge apron is closed and that paddlers must exit at the designated location, portage around the bridge, and reenter downstream.",
        "Use the marked state-park launch and the named Flatrock take-out rather than improvised bank stops.",
        "Private shoreline begins quickly outside the park corridor, so keep rests brief and at the named public access points."
      ],
      "watchFor": [
        "The required bridge portage at South Llano River State Park.",
        "Low-water scraping and minor route reading through shallow riffles when the gauge is near the conservative floor.",
        "Strainers, changing current after rain, and slippery rocks at either access."
      ]
    }
  },
  "south-llano-river-flatrock-lane-junction-city-park": {
    "putIn": {
      "name": "Flatrock Lane Crossing",
      "latitude": 30.4789,
      "longitude": -99.7778
    },
    "takeOut": {
      "name": "Junction City Park",
      "latitude": 30.4879,
      "longitude": -99.7617
    },
    "logistics": {
      "distanceLabel": "About 1.6 mi",
      "estimatedPaddleTime": "About 45 min to 1.5 hr",
      "shuttle": "This is a very short in-town shuttle between Flatrock Lane Crossing and Junction City Park. Many paddlers will prefer to stage one vehicle at Junction City Park and keep the second trip simple.",
      "permits": "No route-specific paddling permit is published. Use the named public accesses, follow local parking rules, and bring the normal Texas PFD and weather judgment even though the mileage is short.",
      "camping": "Treat this as a short day float. South Llano River State Park and Junction lodging work as nearby basecamps, but the route itself does not include an on-route campsite.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Flatrock Lane Crossing and drift down to Junction City Park for the lower split of the official South Llano paddling trail. This is the quickest Junction-area option, but it still deserves the same same-day wood and flow check as the longer segments.",
      "accessCaveats": [
        "TPWD publishes both access points and expects paddlers to stay off private banks except for direct hazard portages.",
        "Junction City Park is the intended public finish; do not improvise a take-out along nearby private or bridge-adjacent banks.",
        "Because the route is short, groups sometimes underestimate weather changes and same-day wood. Check the gauge anyway."
      ],
      "watchFor": [
        "Shallow riffles and scraping when the gauge falls toward the 65 cfs floor.",
        "Snags and fresh wood after rain.",
        "Faster current and murkier water during runoff pulses, even though the route normally feels gentle."
      ]
    }
  },
  "south-llano-river-state-park-junction-city-park": {
    "putIn": {
      "name": "South Llano River State Park paddling access",
      "latitude": 30.4498,
      "longitude": -99.8128
    },
    "takeOut": {
      "name": "Junction City Park",
      "latitude": 30.4879,
      "longitude": -99.7617
    },
    "logistics": {
      "distanceLabel": "About 6.3 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr at an easy recreational pace",
      "shuttle": "Use a short Junction-area shuttle between South Llano River State Park and Junction City Park. If you are entering the park only to launch, reserve day use first during busy periods and leave time for the required bridge portage near the start.",
      "permits": "No route-specific paddling permit is published. South Llano River State Park charges normal park entry and often recommends reservations for day use; follow current park, parking, and PFD rules.",
      "camping": "South Llano River State Park campsites sit directly at the put-in, so this route works well as a campground-based half-day float into town.",
      "campingClassification": "endpoint_campground",
      "summary": "Put in at South Llano River State Park and continue all the way to Junction City Park for the full official TPWD paddling trail. This is a simple state-park-to-town float with a required bridge portage near the start and the same same-day flow check as the shorter splits.",
      "accessCaveats": [
        "TPWD says the damaged state-park bridge apron is closed and that paddlers must exit at the designated location, portage around the bridge, and reenter downstream.",
        "Use the marked state-park launch and the named Junction City Park finish rather than improvised bank stops.",
        "Private shoreline begins quickly outside the park corridor, so keep rests brief and at the named public access points."
      ],
      "watchFor": [
        "The required bridge portage at South Llano River State Park.",
        "Low-water scraping and minor route reading through shallow riffles when the gauge is near the conservative floor.",
        "Strainers, changing current after rain, and slippery rocks at either access."
      ]
    },
    "accessPoints": [
      {
        "id": "south-llano-river-state-park",
        "name": "South Llano River State Park paddling access",
        "latitude": 30.4498,
        "longitude": -99.8128,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Canonical upstream launch for the full official TPWD trail."
      },
      {
        "id": "flatrock-lane-crossing",
        "name": "Flatrock Lane Crossing",
        "latitude": 30.4789,
        "longitude": -99.7778,
        "mileFromStart": 4.7,
        "segmentKind": "creek",
        "note": "Official midpoint access and former short-split take-out."
      },
      {
        "id": "junction-city-park",
        "name": "Junction City Park",
        "latitude": 30.4879,
        "longitude": -99.7617,
        "mileFromStart": 6.3,
        "segmentKind": "creek",
        "note": "Canonical downstream finish for the full TPWD trail."
      }
    ]
  },
  "south-llano-river-cupgrass-junction-city-park": {
    "putIn": {
      "name": "TPWD Cupgrass Access",
      "latitude": 30.393543,
      "longitude": -99.886693
    },
    "takeOut": {
      "name": "Junction City Park",
      "latitude": 30.4879,
      "longitude": -99.7617
    },
    "logistics": {
      "distanceLabel": "About 15.6 mi",
      "estimatedPaddleTime": "About 6 hr to 8.5 hr at a casual kayak or canoe pace, longer at lower water or with fishing stops",
      "shuttle": "Stage the take-out at Junction City Park first, then drive back to the gated Cupgrass lease site. This is the longest South Llano day route in the current app, so start early and leave real margin for the midpoint state-park bridge portage.",
      "permits": "No route-specific paddling permit is published. Cupgrass parking must be arranged with TPWD by text, and South Llano River State Park or Junction-area logistics still depend on current public-hours and normal Texas boating rules.",
      "camping": "South Llano River State Park sits directly on the route corridor with developed and primitive campsites, so this long continuation has real on-route overnight support even if most paddlers treat it as a big day float.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch through Bailey Creek at TPWD Cupgrass Access and continue to Junction City Park for the longest current public South Llano day route. The spring-fed water stays gentle overall, but the long mileage and midpoint state-park portage make this a real planning route rather than a casual hour float.",
      "accessCaveats": [
        "TPWD says Cupgrass parking is by advance text reservation and that boats launch via Bailey Creek before entering the South Llano proper.",
        "At South Llano River State Park, paddlers must exit at the designated location before the damaged bridge, portage around it, and reenter downstream.",
        "Use Junction City Park as the intended public finish and avoid treating nearby private or bridge-adjacent banks as alternate take-outs."
      ],
      "watchFor": [
        "The required bridge portage at South Llano River State Park.",
        "Long low-water scrape stretches, fresh wood after storms, and quicker current during runoff pulses.",
        "Heat, fatigue, and fewer convenient public exits than the short official trail splits."
      ]
    },
    "accessPoints": [
      {
        "id": "cupgrass-access",
        "name": "TPWD Cupgrass Access",
        "latitude": 30.393543,
        "longitude": -99.886693,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Canonical upstream start for the longest current South Llano route."
      },
      {
        "id": "south-llano-river-state-park",
        "name": "South Llano River State Park paddling access",
        "latitude": 30.4498,
        "longitude": -99.8128,
        "mileFromStart": 9.3,
        "segmentKind": "creek",
        "note": "Mid-route campground and mandatory bridge-portage access."
      },
      {
        "id": "flatrock-lane-crossing",
        "name": "Flatrock Lane Crossing",
        "latitude": 30.4789,
        "longitude": -99.7778,
        "mileFromStart": 14,
        "segmentKind": "creek",
        "note": "Official lower midpoint access and former chained-route finish."
      },
      {
        "id": "junction-city-park",
        "name": "Junction City Park",
        "latitude": 30.4879,
        "longitude": -99.7617,
        "mileFromStart": 15.6,
        "segmentKind": "creek",
        "note": "Canonical downstream finish for the full Cupgrass continuation."
      }
    ]
  }
};
