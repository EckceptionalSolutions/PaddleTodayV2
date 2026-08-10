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
  "guadalupe-river-state-park-nichols-landing": {
    "putIn": {
      "id": "guadalupe-river-state-park-paddling-access",
      "name": "Guadalupe River State Park paddling access",
      "latitude": 29.872,
      "longitude": -98.49
    },
    "takeOut": {
      "id": "nichols-landing-spechts-crossing",
      "name": "Nichol's Landing (Specht's Crossing)",
      "latitude": 29.879,
      "longitude": -98.448
    },
    "logistics": {
      "distanceLabel": "About 5.0 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr at ordinary levels, longer if low-water dragging, the mandatory carry, scouting, wind, or shuttle delays stack up",
      "shuttle": "Stage Nichol's Landing first, then drive back to Guadalupe River State Park. Confirm state-park entry, river access, and any current Nichol's Landing parking or access fees before leaving vehicles.",
      "permits": "No route-specific paddling permit is published. Normal Guadalupe River State Park entrance or camping fees may apply at the put-in, and Nichol's Landing can have access or parking fees. Follow Texas boating/PFD rules and current posted access rules.",
      "camping": "Guadalupe River State Park has drive-up electric campsites, walk-in tent sites, and primitive sites at the put-in, so this route works as an endpoint-campground basecamp trip. Do not infer legal camping from private banks, gravel bars, or the low-water-crossing portage corridor.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Guadalupe River State Park and take out at Nichol's Landing for TPWD's five-mile state-park Upper Guadalupe trail. Use USGS 08167500 near Spring Branch with TRPA's conservative Upper Guadalupe range, then make a same-day call on low-water dragging, the mandatory carry, rising water, wood, and private-bank limits.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates, but the state-park access is fee-controlled and Nichol's Landing is a simple river-access site rather than a staffed paddling center.",
        "The Spring Branch gauge is the product-supported Upper Guadalupe flow check used by this route family and the downstream Nichol's Landing trail. It sits just below this five-mile segment, so still scout the low-water crossing and visible level before launching.",
        "TPWD says private-property use outside portaging hazards can be trespassing. Keep stops to public access points or direct hazard-portage corridors.",
        "This route uses broad Upper Guadalupe TRPA flow guidance rather than a manager-published rapid-by-rapid band for the state-park reach. Downgrade the day if weather, gauge trend, or local access conditions are moving the wrong way."
      ],
      "watchFor": [
        "The mandatory exit and carry around the low-water crossing about 0.5 mile below the park boundary.",
        "Flows near or below 100 cfs, when TRPA's Upper Guadalupe minimum is not met and dragging or exposed limestone hazards become more likely.",
        "High or rising water after rain, when Hill Country current, strainers, and private-bank portage choices become more consequential.",
        "Wood, sweepers, slick limestone, hot-weather exposure, crowded access areas, and the temptation to continue below Nichol's Landing without the separate downstream route plan."
      ]
    },
    "accessPoints": [
      {
        "id": "guadalupe-river-state-park-paddling-access",
        "name": "Guadalupe River State Park paddling access",
        "latitude": 29.872,
        "longitude": -98.49,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in at Guadalupe River State Park; state-park entry or camping fees may apply."
      },
      {
        "id": "nichols-landing-spechts-crossing",
        "name": "Nichol's Landing (Specht's Crossing)",
        "latitude": 29.879,
        "longitude": -98.448,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Default TPWD take-out for the state-park paddling trail and put-in for the downstream Upper Guadalupe route."
      }
    ]
  },
  "guadalupe-river-nichols-landing-rebecca-creek": {
    "putIn": {
      "id": "nichols-landing-spechts-crossing",
      "name": "Nichol's Landing (Specht's Crossing)",
      "latitude": 29.8794,
      "longitude": -98.4483
    },
    "takeOut": {
      "id": "rebecca-creek-crossing",
      "name": "Rebecca Creek Crossing",
      "latitude": 29.8881,
      "longitude": -98.3685
    },
    "logistics": {
      "distanceLabel": "About 9.9 mi",
      "estimatedPaddleTime": "About 3 hr to 6 hr at ordinary levels, longer if scouting, low-water dragging, portages, or shuttle delays stack up",
      "shuttle": "Stage the Rebecca Creek Crossing take-out first, then drive back to Nichol's Landing. FM 311 is an official alternate access 5.4 miles below the put-in and can be used as a shorter take-out or bailout when the full reach is too much.",
      "permits": "No route-specific paddling permit is published. Nichol's Landing has seasonal/weekend parking fees, Rebecca Creek and FM 311 have uphill shuttle parking, and groups should follow Texas boating/PFD rules plus current posted access rules.",
      "camping": "Treat the route itself as a day trip. TPWD lists nearby outfitters and campgrounds in the Spring Branch corridor, but the route package does not treat private banks, portage areas, or visible gravel bars as legal on-route campsites.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Nichol's Landing and take out at Rebecca Creek Crossing for the official Upper Guadalupe whitewater trail. Use USGS 08167500 near Spring Branch with TRPA's conservative 100 cfs floor and 300-1,200 cfs ideal window, then make a same-day call on rapids, wood, weather, and group skill.",
      "accessCaveats": [
        "TPWD publishes all three access coordinates, but the parking areas are simple river-access and shuttle sites rather than staffed take-outs.",
        "Nichol's Landing can charge seasonal or weekend access/parking fees, while FM 311 and Rebecca Creek parking sit uphill from the water.",
        "Private shoreline is a major constraint on this navigable reach. Use public accesses and direct hazard portages only; do not treat banks as casual rest, scouting, or camping areas.",
        "This route uses TRPA's broad Upper Guadalupe guidance as a conservative two-sided model, not a manager-published rapid-by-rapid band. Scout visually and downgrade if the gauge trend or weather is moving the wrong way."
      ],
      "watchFor": [
        "Mueller Falls about 1.5 miles below FM 311 and Rust Falls about 5 miles below FM 311; inspect chutes and portage hazards with margin.",
        "Flows near or below 100 cfs, when TRPA's minimum is not met and TPWD's drought warning can mean dragging and exposed hazards.",
        "High or rising water after rain, which can make Hill Country rapids, strainers, and private-bank portage choices more consequential.",
        "Wood, sweepers, strainers, slick limestone shelves, hot-weather exposure, locked or crowded access areas, and the temptation to improvise a take-out before Rebecca Creek."
      ]
    },
    "accessPoints": [
      {
        "id": "nichols-landing-spechts-crossing",
        "name": "Nichol's Landing (Specht's Crossing)",
        "latitude": 29.8794,
        "longitude": -98.4483,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in for the Upper Guadalupe Nichol's Landing trail."
      },
      {
        "id": "fm-311-crossing",
        "name": "FM 311 Crossing",
        "latitude": 29.8608,
        "longitude": -98.3839,
        "mileFromStart": 5.4,
        "segmentKind": "creek",
        "note": "Official alternate access and shorter take-out with uphill shuttle parking."
      },
      {
        "id": "rebecca-creek-crossing",
        "name": "Rebecca Creek Crossing",
        "latitude": 29.8881,
        "longitude": -98.3685,
        "mileFromStart": 9.9,
        "segmentKind": "creek",
        "note": "Default TPWD take-out for the full Nichol's Landing trail."
      }
    ]
  },
  "san-antonio-river-mission-reach": {
    "putIn": {
      "id": "roosevelt-park-mission-reach",
      "name": "Roosevelt Park",
      "latitude": 29.4015,
      "longitude": -98.4883
    },
    "takeOut": {
      "id": "camino-coahuilteca-mission-espada",
      "name": "Camino Coahuilteca",
      "latitude": 29.3196,
      "longitude": -98.4489
    },
    "logistics": {
      "distanceLabel": "About 8.0 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr by TPWD's full-route estimate, or 2 hr to 8 hr in SARA's broader Mission Reach planning window depending on level, chutes, portage timing, heat, and group pace",
      "shuttle": "Stage the Camino Coahuilteca take-out near Mission Espada first, then drive back to Roosevelt Park near Lone Star Boulevard. Concepcion Park, VFW Boulevard, Padre Park, Espada Park, and Mission Parkway are official coordinate-backed access or bailout points if the group wants a shorter route.",
      "permits": "The City says no permit is required for non-motorized water recreation in the Mission Reach zone, but use is sunrise to sunset only. Follow Texas boating/PFD rules, stay inside the published boundaries, obey posted signs, avoid body contact with the water, and remove watercraft at the end of each day.",
      "camping": "Treat Mission Reach as a day-use urban paddling trail only. City rules require vessels to be removed at the end of each day and limit use to sunrise-to-sunset water recreation; nearby parks and missions are not evidence of legal route camping.",
      "campingClassification": "none",
      "summary": "Launch at Roosevelt Park and finish at Camino Coahuilteca for the full official Mission Reach route through San Antonio's restored river corridor. Use USGS 08178000 with a conservative 200 cfs San Antonio River floor, then check SARA current conditions, recent rain, bacteria context, and the Espada Dam portage before committing.",
      "accessCaveats": [
        "TPWD publishes Roosevelt Park, Concepcion Park, VFW Boulevard, Padre Park, Espada Park, Mission Parkway, and Camino Coahuilteca as access points with GPS coordinates; SARA says access points are marked by blue poles and may be steps or natural paths.",
        "The City defines the Mission Reach boundary from Lone Star Boulevard by Roosevelt Park to Camino Coahuilteca by Mission Espada and says boundaries may change, so posted local signs control on arrival.",
        "SARA and the City both require a portage around Espada Dam about 1,200 feet south of SE Military Drive, with reentry below Mission Parkway.",
        "The Mission Reach is urban and largely exposed. SARA explicitly says there is no shade, cell access is available, and paddlers should bring ample drinking water.",
        "This route uses conservative corridor-level TRPA flow guidance, not a manager-authored exact Mission Reach gauge table. When USGS 08178000 is below about 200 cfs, expect a below-floor score and verify chute/portage conditions visually."
      ],
      "watchFor": [
        "The mandatory Espada Dam portage around mile 5; land early, carry around the dam, and reenter below Mission Parkway.",
        "Flows near or below about 200 cfs, when the current implementation reading was below the conservative floor and chutes or riffles may be shallow or awkward.",
        "Rain in the previous 72 hours, rising water, or SARA current-condition warnings because TPWD links the Mission Reach to urban runoff, high flows, and undesirable water quality after storms.",
        "Canoe chutes, riffles, low bridges, crowded access points, no shade, heat, alcohol/body-contact restrictions, and the need to stay within the posted city paddling boundary.",
        "Daily-use limits: remove boats at the end of the day and do not treat parks, trails, missions, or visible banks as camping permission."
      ]
    },
    "accessPoints": [
      {
        "id": "roosevelt-park-mission-reach",
        "name": "Roosevelt Park",
        "latitude": 29.4015,
        "longitude": -98.4883,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD/SARA upstream Mission Reach launch near Lone Star Boulevard."
      },
      {
        "id": "concepcion-park",
        "name": "Concepcion Park",
        "latitude": 29.3907,
        "longitude": -98.4982,
        "mileFromStart": 1.2,
        "segmentKind": "creek",
        "note": "Official TPWD access at the dead end of Theo Parkway."
      },
      {
        "id": "vfw-boulevard",
        "name": "VFW Boulevard",
        "latitude": 29.3702,
        "longitude": -98.4761,
        "mileFromStart": 3.1,
        "segmentKind": "creek",
        "note": "Official TPWD access with parking at the northwest corner of VFW Boulevard and the San Antonio River."
      },
      {
        "id": "padre-park",
        "name": "Padre Park",
        "latitude": 29.3622,
        "longitude": -98.4698,
        "mileFromStart": 4,
        "segmentKind": "creek",
        "note": "Official TPWD access before the lower Mission Reach and Espada Dam area."
      },
      {
        "id": "espada-park",
        "name": "Espada Park",
        "latitude": 29.3477,
        "longitude": -98.4663,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Official access near SE Military Drive; portage planning is required around Espada Dam."
      },
      {
        "id": "mission-parkway",
        "name": "Mission Parkway",
        "latitude": 29.3463,
        "longitude": -98.4633,
        "mileFromStart": 5.2,
        "segmentKind": "creek",
        "note": "Official TPWD access and reentry context below the Espada Dam portage."
      },
      {
        "id": "camino-coahuilteca-mission-espada",
        "name": "Camino Coahuilteca",
        "latitude": 29.3196,
        "longitude": -98.4489,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Default TPWD/SARA take-out near Mission Espada and the southern Mission Reach boundary."
      }
    ]
  },
  "san-antonio-river-river-crossing-helton": {
    "putIn": {
      "id": "river-crossing-park-loop-1604",
      "name": "River Crossing Park / Loop 1604 River Access Site",
      "latitude": 29.222,
      "longitude": -98.3554
    },
    "takeOut": {
      "id": "helton-san-antonio-river-nature-park",
      "name": "John William Helton - San Antonio River Nature Park",
      "latitude": 29.2153,
      "longitude": -98.2628
    },
    "logistics": {
      "distanceLabel": "About 12.1 mi",
      "estimatedPaddleTime": "About 4 hr to 8 hr depending on water level, flow rate, wind, log jams, mud, and group pace",
      "shuttle": "Stage the Helton Nature Park take-out first, then drive back to River Crossing Park / Loop 1604. CR 125 is the coordinate-backed midpoint access around mile 5.63 if the group wants a shorter day or a bailout.",
      "permits": "No route-specific paddling permit is published. River Crossing Park is free and open dawn to dusk, Helton Nature Park has free day use, and campground reservations are separate. Follow Texas boating/PFD rules, use only the named public access sites, and check SARA current conditions before launching.",
      "camping": "Helton Nature Park has SARA-managed campgrounds at the take-out, with reservations and an overnight fee. Treat camping as an endpoint campground plan, not permission to camp on private banks, soft mud bars, or the closed downstream SASPAMCO section.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at River Crossing Park / Loop 1604 and take out at Helton Nature Park for the upper official SASPAMCO day route. Use USGS 08181800 near Elmendorf with a conservative 200 cfs floor, then make a same-day call on low water, log jams, rainfall, water quality, soft banks, and the firm Helton finish.",
      "accessCaveats": [
        "TPWD publishes the Loop 1604, CR 125, and Helton coordinates for the 12.1-mile SASPAMCO option, and SARA confirms River Crossing Park and Helton as public River Authority park accesses.",
        "SARA's current alert keeps the southern SASPAMCO section downstream of Helton temporarily closed because of large log jams. Do not continue past Helton toward CR 117 or Floresville until SARA lifts that closure.",
        "SARA says River Crossing Park is the first SASPAMCO access and is open daily from dawn to dusk; confirm posted hours and gate status before leaving a vehicle.",
        "Helton Nature Park has day-use amenities, river access, and campground reservations, but overnight use needs a separate campground booking rather than an informal riverbank plan.",
        "This route uses conservative corridor-level TRPA flow guidance, not a manager-authored exact-segment gauge table. If the Elmendorf gauge is below about 200 cfs, expect a slower, scrape-prone, debris-sensitive trip."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, when the current implementation reading was below the conservative floor and low-water snags or shallow lines are more likely.",
        "Fresh rain, rising water, or readings approaching TRPA's 2,000 cfs maximum cue, when the unrestrained lower San Antonio can produce temporary high flows and poorer water quality.",
        "Log jams, sweepers, strainers, soft mud banks, variable cell coverage, heat, limited bailouts, and long quiet pools that can stretch the day.",
        "The required Helton take-out boundary; do not drift into the temporarily closed downstream SASPAMCO section.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "river-crossing-park-loop-1604",
        "name": "River Crossing Park / Loop 1604 River Access Site",
        "latitude": 29.222,
        "longitude": -98.3554,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD/SARA put-in and first SASPAMCO access at River Crossing Park."
      },
      {
        "id": "cr-125-river-access-site",
        "name": "CR 125 River Access Site",
        "latitude": 29.2114,
        "longitude": -98.3126,
        "mileFromStart": 5.63,
        "segmentKind": "creek",
        "note": "TPWD alternate midpoint access for a shorter Loop 1604-to-CR 125 or CR 125-to-Helton trip."
      },
      {
        "id": "helton-san-antonio-river-nature-park",
        "name": "John William Helton - San Antonio River Nature Park",
        "latitude": 29.2153,
        "longitude": -98.2628,
        "mileFromStart": 12.1,
        "segmentKind": "creek",
        "note": "Default take-out and endpoint campground; do not continue into the currently closed downstream SASPAMCO section."
      }
    ]
  },
  "san-antonio-river-riverdale-goliad-state-park": {
    "putIn": {
      "id": "riverdale-lane-access",
      "name": "Riverdale Lane Access",
      "latitude": 28.67067,
      "longitude": -97.54198
    },
    "takeOut": {
      "id": "goliad-state-park-takeout",
      "name": "Goliad State Park",
      "latitude": 28.6527,
      "longitude": -97.3817
    },
    "logistics": {
      "distanceLabel": "About 18 mi",
      "estimatedPaddleTime": "About 8 hr to 9 hr at ordinary levels, longer if low flow, log jams, soft mud banks, heat, or a late shuttle slows the day",
      "shuttle": "Stage the Goliad State Park take-out first, pay or arrange required park day-use/camping access, then drive to Riverdale Lane. Ferry Street near Branch Nature Park is the documented midpoint take-out around mile 5 and is the only clean shorter exit in the current route package.",
      "permits": "No route-specific paddling permit is published, but SARA says users must pay the Goliad State Park day-use fee to take out there. Follow Texas boating/PFD rules, use only the named public landings, and check SARA alerts before launching.",
      "camping": "Goliad State Park is an endpoint basecamp with walk-in water sites, developed water/electric sites, full-hookup options, and shelters. Do not infer legal camping from soft mud banks, sandbars, or private shoreline along the 18-mile route.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Riverdale Lane and take out at Goliad State Park for the current full Goliad Paddling Trail. Use USGS 08188500 at Goliad with a conservative 200 cfs floor, then make a same-day call on route length, log jams, no cell service, heat, weather, and the required state-park finish.",
      "accessCaveats": [
        "SARA's current access page says the Hwy 59 landing is closed until further notice because of TxDOT bridge construction. Do not plan the older Hwy 59-to-state-park six-mile route unless that closure is officially lifted.",
        "The Riverdale coordinate is an access-address anchor for SARA's published 1777 N. Riverdale Lane trail start, cross-checked by Census and OSM public geocoding. Follow posted local signs to the actual ramp or launch point on arrival.",
        "SARA labels the Riverdale start available but says launching there requires a significant commitment of time and energy because the full trail is about 18 miles.",
        "SARA says there is no cell phone access, the landscape is rural, log jams may be present, banks are mostly soft mud, and paddlers should bring ample drinking water.",
        "Goliad State Park is the planned finish. Confirm current park hours, fee payment, and capacity before leaving vehicles, and do not continue downstream without a separate route plan because TPWD says no other downstream take-outs are documented from the park page context."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, when the conservative minimum is barely met and the long rural route can slow down around bars, wood, and soft banks.",
        "Readings approaching TRPA's 2,000 cfs maximum cue, rising water, or fresh rain, when log jams, current, and muddy landings become less forgiving.",
        "Log jams, floating wood, sweepers, strainers, soft mud banks, no cell service, long heat exposure, and limited bailout options between Riverdale, Ferry Street, and the state park.",
        "The required state-park take-out and fee-controlled access at the finish.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "riverdale-lane-access",
        "name": "Riverdale Lane Access",
        "latitude": 28.67067,
        "longitude": -97.54198,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Current SARA put-in address anchor at 1777 N. Riverdale Lane, where Riverdale Lane meets the San Antonio River."
      },
      {
        "id": "ferry-street-branch-nature-park",
        "name": "Ferry Street / Branch Nature Park",
        "latitude": 28.661,
        "longitude": -97.3927,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "SARA midpoint take-out near Branch Nature Park; TPWD describes limited parking."
      },
      {
        "id": "goliad-state-park-takeout",
        "name": "Goliad State Park",
        "latitude": 28.6527,
        "longitude": -97.3817,
        "mileFromStart": 18,
        "segmentKind": "creek",
        "note": "Planned state-park take-out; day-use fee applies and camping can be reserved separately."
      }
    ]
  },
  "san-marcos-river-sh90-zedler-mill": {
    "putIn": {
      "id": "sh-90-river-crossing",
      "name": "SH 90 River Crossing",
      "latitude": 29.6679,
      "longitude": -97.6999
    },
    "takeOut": {
      "id": "zedler-mill-park",
      "name": "Zedler Mill Park",
      "latitude": 29.6671,
      "longitude": -97.6519
    },
    "logistics": {
      "distanceLabel": "About 6.0 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr at ordinary levels, longer if low water, snags, weather, or a slower group stretches the day",
      "shuttle": "Stage the Zedler Mill Park take-out first, then drive back to the SH 90 River Crossing west of Luling. TPWD says parking is available at both locations, but both should still be checked before leaving vehicles.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the named public access points, and obey posted park, parking, and bridge-access signs.",
      "camping": "Treat this as a day trip. Current TPWD Luling Zedler Mill trail material does not document established route camping or an endpoint campground as part of the six-mile trail.",
      "campingClassification": "none",
      "summary": "Launch at the SH 90 River Crossing and take out at Zedler Mill Park for the official Luling Zedler Mill Paddling Trail. Use USGS 08172000 at Luling with a conservative 100 cfs floor, then make a same-day call on wood, weather, private-bank discipline, and the mandatory Zedler Mill exit.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates and says parking is available at both locations, but this remains a simple public trail access plan rather than a staffed livery take-out.",
        "Zedler Mill Park is the planned finish. TPWD warns that a dam lies beyond the mill, so do not drift past the take-out.",
        "The San Marcos River is navigable here, but TPWD says private-bank use outside direct hazard portages can be trespassing.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the Luling gauge is near or below 100 cfs, expect more shallow route-finding and wood avoidance."
      ],
      "watchFor": [
        "The firm Zedler Mill Park take-out above the downstream dam.",
        "Numerous snags and logjams, especially when water levels are low.",
        "Small Class I riffles, clear pools, overhanging trees, floating wood, and slick banks at access points.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "sh-90-river-crossing",
        "name": "SH 90 River Crossing",
        "latitude": 29.6679,
        "longitude": -97.6999,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in for the Luling Zedler Mill trail."
      },
      {
        "id": "zedler-mill-park",
        "name": "Zedler Mill Park",
        "latitude": 29.6671,
        "longitude": -97.6519,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "Default take-out above the downstream dam warning."
      }
    ]
  },
  "colorado-river-utley-bridge-fishermans-park": {
    "putIn": {
      "id": "utley-fm-969-bridge",
      "name": "Utley (FM 969) Bridge",
      "latitude": 30.1683,
      "longitude": -97.4023
    },
    "takeOut": {
      "id": "fishermans-park-bastrop",
      "name": "Fisherman's Park",
      "latitude": 30.1119,
      "longitude": -97.325
    },
    "logistics": {
      "distanceLabel": "About 14 mi",
      "estimatedPaddleTime": "About 5 hr to 8 hr on the water depending on flow, wind, heat, stops, and low-water dragging",
      "shuttle": "Stage Fisherman's Park first, then drive upstream to the Utley / FM 969 Bridge access. This is a full-day shuttle; local outfitter service is common, but private groups should confirm parking, daylight, and weather before committing.",
      "permits": "No route-specific public paddling permit is published. Follow Texas boating and PFD rules, use the named public accesses, respect posted park and bridge-access signs, and make any outfitter camping or shuttle arrangements separately.",
      "camping": "Treat the normal Wilbarger route as a long day trip. Bastrop River Co. offers a primitive Wilbarger river-camping option near Scout Island by arrangement, but Paddle Today does not treat islands, sandbars, or private banks as generally legal public campsites. Bastrop State Park is a nearby basecamp option with developed campsites and cabins.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Utley / FM 969 and paddle 14 miles to Fisherman's Park for the official Wilbarger Paddling Trail. Use USGS 08159200 at Bastrop with a conservative 200 cfs lower-Colorado floor, then make a same-day call on low-water dragging, full-day pace, wood, heat, wind, and private-bank discipline.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates, while LCRA identifies FM 969 / Utley Bridge as a TxDOT-managed access and Fisherman's Park as a City of Bastrop access.",
        "Bastrop River Co. calls Wilbarger a full-day trip and not for beginners. Do not launch late or assume the mostly calm water makes the distance casual.",
        "This route uses a conservative minimum-only threshold from broad lower-Colorado guidance. If the Bastrop gauge is near the floor, expect slower travel, shallow dragging, and harder-to-avoid wood.",
        "Do not infer legal public camping from Scout Island, sandbars, or visible banks. Use a nearby campground or a separately arranged outfitter/permission-based overnight plan.",
        "Rainfall runoff and upstream release changes can alter current, debris, water quality, and sandbar availability on this lower Colorado reach."
      ],
      "watchFor": [
        "Low-water shallows, sandbar scraping, and slow travel across a 14-mile day when the Bastrop gauge approaches the 200 cfs floor.",
        "High or rising water after rain or upstream release changes, especially where bends, islands, and side channels collect wood.",
        "Snags, overhanging limbs, hidden rocks, soft banks, summer heat, thunderstorms, headwinds on open bends, and fatigue from a long flatwater day.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "utley-fm-969-bridge",
        "name": "Utley (FM 969) Bridge",
        "latitude": 30.1683,
        "longitude": -97.4023,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in for the Bastrop Wilbarger trail."
      },
      {
        "id": "fishermans-park-bastrop",
        "name": "Fisherman's Park",
        "latitude": 30.1119,
        "longitude": -97.325,
        "mileFromStart": 14,
        "segmentKind": "creek",
        "note": "Default TPWD take-out in downtown Bastrop."
      }
    ]
  },
  "colorado-river-fishermans-park-lost-pines": {
    "putIn": {
      "id": "fishermans-park-bastrop",
      "name": "Fisherman's Park",
      "latitude": 30.1119,
      "longitude": -97.325
    },
    "takeOut": {
      "id": "lost-pines-recreational-trails",
      "name": "Lost Pines Recreational Trails / Colorado River Refuge",
      "latitude": 30.0735,
      "longitude": -97.3106
    },
    "logistics": {
      "distanceLabel": "About 6.0 mi",
      "estimatedPaddleTime": "About 1.5 hr to 4 hr depending on flow, stops, shallow dragging, wind, and how much time the group spends on sandbars",
      "shuttle": "Stage the Lost Pines / Colorado River Refuge take-out first, then drive back to Fisherman's Park in downtown Bastrop. TPWD flags flood impacts at the take-out, so verify current access after recent rain before leaving vehicles.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the named public access points, respect posted park hours and signs, and check current flow and weather before launching.",
      "camping": "Treat this as a day trip. TPWD El Camino Real material does not document established route camping, and informal sandbar or bank camping is not used for Paddle Today filters. Bastrop State Park is a nearby basecamp option with developed campsites and cabins.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Fisherman's Park and take out at Lost Pines / Colorado River Refuge for the official Bastrop El Camino Real Paddling Trail. Use USGS 08159200 at Bastrop with a conservative 800 cfs practical floor, then make a same-day call on shallow water, wood, regulated releases, weather, and take-out access.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates, but the downstream Lost Pines take-out can be affected by floods and should be checked after recent rain.",
        "The local take-out is also described as Colorado River Refuge, a public nature park, but route users should still follow current park hours, parking rules, and any posted access signs.",
        "This route uses a conservative minimum-only threshold from local route notes. If the Bastrop gauge is below about 800 cfs, expect shallow dragging and more route-finding around sandbars.",
        "TPWD says rainfall runoff and regulated flows from upstream Highland Lakes infrastructure can change current and water quality on this lower Colorado reach.",
        "Do not infer legal camping from visible sandbars or islands. Use nearby established campgrounds or a separately verified river-camping plan instead."
      ],
      "watchFor": [
        "Low-water shallows, sandbar scraping, and dragging when the Bastrop gauge is below the local 800 cfs floor.",
        "High or rising water after rain or upstream release changes, especially where side channels collect wood or logjams.",
        "Snags, overhanging limbs, hidden rocks, prop scars, soft banks, summer heat, thunderstorms, and headwinds on open bends.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "fishermans-park-bastrop",
        "name": "Fisherman's Park",
        "latitude": 30.1119,
        "longitude": -97.325,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in for the Bastrop El Camino Real trail."
      },
      {
        "id": "lost-pines-recreational-trails",
        "name": "Lost Pines Recreational Trails / Colorado River Refuge",
        "latitude": 30.0735,
        "longitude": -97.3106,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "Default TPWD take-out; verify flood-sensitive access after recent rain."
      }
    ]
  },
  "colorado-river-business-71-beasons-park": {
    "putIn": {
      "id": "business-71-crossing-columbus",
      "name": "71 Business Crossing",
      "latitude": 29.7128,
      "longitude": -96.5466
    },
    "takeOut": {
      "id": "beasons-park-columbus",
      "name": "Beason's Park",
      "latitude": 29.7055,
      "longitude": -96.536
    },
    "logistics": {
      "distanceLabel": "About 6.5 mi",
      "estimatedPaddleTime": "About 2 hr to 5 hr depending on flow, wind, island stops, shallow spots, heat, and group pace",
      "shuttle": "Stage Beason's Park first, then drive back to the 71 Business Crossing / North River Bridge put-in. TPWD describes Beason's Park as the improved take-out with parking, restrooms, picnic tables, and a pavilion, but the put-in is still a bridge-side boat-ramp access that should be checked before leaving vehicles.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the named public access points, respect park hours and posted signs, and check same-day flow and weather before launching.",
      "camping": "Treat this as a day trip. Current TPWD Columbus trail material does not document established route camping or an endpoint campground; use separately reserved Columbus-area campgrounds or lodging instead of inferring legal sandbar or private-bank camping from proximity to the river.",
      "campingClassification": "none",
      "summary": "Launch at the 71 Business Crossing and take out at Beason's Park for the official Columbus Paddling Trail around the Colorado River horseshoe. Use USGS 08161000 at Columbus with a conservative 200 cfs floor, then make a same-day call on shallow spots, wind, heat, private banks, and rising water.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates, but the 71 Business Crossing put-in is a simple bridge-side boat-ramp access rather than a staffed livery launch.",
        "Beason's Park is the planned public finish and has parking, restrooms, picnic tables, and a pavilion. Do not drift past the take-out assuming downstream banks are public.",
        "This route uses a conservative minimum-only threshold from broad lower-Colorado guidance plus local same-gauge reports. If the Columbus gauge is near or below about 200 cfs, expect shallow route-finding around islands and sandy bars.",
        "TPWD says private-bank use outside direct hazard portages can be trespassing. Keep stops on clearly public access points or within the navigable streambed rules.",
        "Do not infer legal route camping from islands, sandbars, or historic Beason's Crossing camping references. The Paddle Today route package treats official Columbus trail use as day-only."
      ],
      "watchFor": [
        "Low-water shallows, sandy islands, and occasional scraping when the Columbus gauge falls toward the 200 cfs floor.",
        "High or rising water after rain, when broad calm-looking bends can gain current and make simple park or bridge landings less forgiving.",
        "Wind on open bends, summer heat, thunderstorms, soft banks, floating wood, and shifting lines around islands in the first third of the trail.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "business-71-crossing-columbus",
        "name": "71 Business Crossing",
        "latitude": 29.7128,
        "longitude": -96.5466,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in under the North River Bridge."
      },
      {
        "id": "beasons-park-columbus",
        "name": "Beason's Park",
        "latitude": 29.7055,
        "longitude": -96.536,
        "mileFromStart": 6.5,
        "segmentKind": "creek",
        "note": "Default TPWD take-out with parking, restrooms, picnic tables, and pavilion."
      }
    ]
  },
  "brazos-river-county-park-bells-landing": {
    "putIn": {
      "id": "brazos-river-county-park",
      "name": "Brazos River County Park",
      "latitude": 29.201,
      "longitude": -95.5642
    },
    "takeOut": {
      "id": "bells-landing",
      "name": "Bells Landing",
      "latitude": 29.1408,
      "longitude": -95.6153
    },
    "logistics": {
      "distanceLabel": "About 8.3 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr at ordinary levels, longer with headwind, tidal influence, low-water snags, heat, or slow bank access at Bells Landing",
      "shuttle": "Stage Bells Landing first, then drive back to Brazos River County Park. TPWD says the county-park access is near the pavilion and about 400 feet from parking, while Bells Landing is down the bank at the end of CR 300-F; scout both arrival paths before leaving vehicles.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the named public access points, respect Brazos River County Park hours and posted rules, and keep private-bank use limited to direct hazard portages within the navigable corridor.",
      "camping": "BRA says Brazos River sandbars can be used for camping because the riverbed is public up to the gradient boundary, but this short route is still planned as a day trip. Camp only on clearly exposed public sand or gravel bars, avoid quicksand-prone banks and private uplands, and skip camping when water is rising or high.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at Brazos River County Park and take out at Bells Landing for the official Columbia Bottomland Waterway segment of the Stephen F. Austin Paddling Trail. Use USGS 08116850 near West Columbia with BRA's Brazos flow chart, then make a same-day call on runoff, wind, tide, snags, quicksand banks, and private-property limits.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates; Brazoria County separately confirms the county park has a canoe launch, paved parking, restrooms, and day-use amenities.",
        "The county-park GPS is an official access anchor near the pavilion, and TPWD says the access is about 400 feet from parking. Follow posted park paths to the actual water-entry point on arrival.",
        "Bells Landing is a simple bank take-out at the end of CR 300-F, not a staffed ramp. Identify the old bridge-abutment landmark and the right-bank exit before floating past it.",
        "This route uses a river-wide BRA flow chart rather than a route-specific local paddling band. Treat the gauge reading as a decision aid and still check wind, tide, rain, water quality, and visible bank conditions.",
        "TPWD says private-bank use outside direct hazard portages can be trespassing. Do not treat the Columbia Bottomlands shoreline as a casual picnic, bailout, or camping area above the public streambed."
      ],
      "watchFor": [
        "Flows at or below about 200 cfs, when BRA says the Brazos is below the minimum needed for paddling and TPWD warns snags can be more common.",
        "Flows above about 1,200 cfs, rising water, or basin-wide rainfall runoff, when BRA and TPWD both point to higher current, reduced water quality, and more consequential landings.",
        "Wind on broad bends, tidal lower-river effects, summer heat, thunderstorms, alligators, livestock near the bank, and soft or quicksand-prone landing areas.",
        "Low-water drift piles, strainers, floating wood, and the need to stay oriented for the Bells Landing right-bank take-out after passing under SH 35.",
        "Private banks outside named access points and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "brazos-river-county-park",
        "name": "Brazos River County Park",
        "latitude": 29.201,
        "longitude": -95.5642,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in; official access anchor near the pavilion, about 400 feet from parking."
      },
      {
        "id": "bells-landing",
        "name": "Bells Landing",
        "latitude": 29.1408,
        "longitude": -95.6153,
        "mileFromStart": 8.3,
        "segmentKind": "creek",
        "note": "Default TPWD take-out down the bank at the end of CR 300-F, marked after the SH 35 bridge by old bridge-abutment context."
      }
    ]
  },
  "brazos-river-fm2004-freeport-municipal-park": {
    "putIn": {
      "id": "fm-2004-boat-ramp",
      "name": "FM 2004 boat ramp",
      "latitude": 29.0316,
      "longitude": -95.4771
    },
    "takeOut": {
      "id": "freeport-municipal-park-boat-ramp",
      "name": "Freeport Municipal Park boat ramp",
      "latitude": 28.9646,
      "longitude": -95.3743
    },
    "logistics": {
      "distanceLabel": "About 9.8 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr at ordinary levels, longer with coastal headwind, tidal pushback, low-water snags, heat, or slow shell-road access at Freeport",
      "shuttle": "Stage the Freeport Municipal Park take-out first, then drive back to the FM 2004 boat ramp. TPWD says the Freeport ramp is reached by crossing the levee and following a shell road; scout that exit and current parking before leaving vehicles.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the named public boat ramps, respect any Freeport or FM 2004 parking signs, and keep private-bank use limited to direct hazard portages within the navigable corridor.",
      "camping": "Treat Gulf Prairie Run as a day trip. TPWD does not document route camping or an endpoint campground for the FM 2004-to-Freeport segment; do not infer legal camping from levee banks, visible bars, or private shoreline.",
      "campingClassification": "none",
      "summary": "Launch at the FM 2004 boat ramp and take out at Freeport Municipal Park for the official Gulf Prairie Run segment of the Stephen F. Austin Paddling Trail. Use USGS 08116850 near West Columbia with BRA's Brazos flow chart, then make a same-day call on runoff, wind, tide, snags, quicksand banks, and private-property limits.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates and driving directions, but the downstream Freeport ramp is reached by a shell road behind the levee rather than a staffed paddling trail center.",
        "The product-supported gauge is USGS 08116850 upstream at West Columbia. The Freeport flood-gate gauge can show tidal or reverse-flow behavior, so this route uses the upstream lower-Brazos discharge check plus same-day visual, wind, tide, and weather judgment.",
        "This route uses a river-wide BRA flow chart rather than a route-specific local paddling band. Treat the gauge reading as a decision aid and still check wind, tide, rain, water quality, and visible bank conditions.",
        "TPWD says private-bank use outside direct hazard portages can be trespassing. Do not treat levee banks or Gulf Prairie shoreline as casual rest, bailout, or camping areas.",
        "Coastal heat, thunderstorms, and headwinds can make the last miles into Freeport slower than the 9.8-mile distance suggests."
      ],
      "watchFor": [
        "Flows at or below about 200 cfs, when BRA says the Brazos is below the minimum needed for paddling and TPWD warns snags can be more common.",
        "Flows above about 1,200 cfs, rising water, or basin-wide rainfall runoff, when BRA and TPWD both point to higher current, reduced water quality, and more consequential landings.",
        "Coastal headwinds, tide-influenced current, levee-bounded banks, summer heat, thunderstorms, alligators, and soft or quicksand-prone landing areas.",
        "Low-water drift piles, strainers, floating wood, and the need to identify the Freeport left-bank take-out before the river opens farther toward industrial and Gulf-adjacent water.",
        "Private banks outside named access points and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "fm-2004-boat-ramp",
        "name": "FM 2004 boat ramp",
        "latitude": 29.0316,
        "longitude": -95.4771,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in for Gulf Prairie Run at the FM 2004 / FM 2611 bridge access."
      },
      {
        "id": "freeport-municipal-park-boat-ramp",
        "name": "Freeport Municipal Park boat ramp",
        "latitude": 28.9646,
        "longitude": -95.3743,
        "mileFromStart": 9.8,
        "segmentKind": "creek",
        "note": "Default TPWD take-out reached by shell road after crossing the levee in Freeport."
      }
    ]
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
  },
  "buffalo-bayou-woodway-sabine-street": {
    "putIn": {
      "id": "woodway-memorial-park",
      "name": "Woodway Memorial Park",
      "latitude": 29.7647,
      "longitude": -95.4569
    },
    "takeOut": {
      "id": "sabine-street-access",
      "name": "Sabine Street Access",
      "latitude": 29.7622,
      "longitude": -95.3736
    },
    "logistics": {
      "distanceLabel": "About 7.4 to 8.3 mi",
      "estimatedPaddleTime": "Several hours at ordinary base flow; TPWD's segment estimates from Woodway through Hogg Bird Sanctuary, Eleanor Tinsley Park, and Sabine Street add up to roughly 4.75 hr to 6.75 hr depending on water level, obstructions, mud, heat, and group pace",
      "shuttle": "Stage the Sabine Street take-out first, then drive back to Woodway Memorial Park by Loop 610. Hogg Bird Sanctuary and Eleanor Tinsley Park are official coordinate-backed downstream bailout points, but each has its own parking and bank-access constraints.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check USGS 08074000 and recent rainfall or reservoir-release context before launching, use only public access points or direct hazard portages, and obey current City of Houston and park rules.",
      "camping": "Treat this as a day-use urban route only. Houston Parks says camping is permitted only at Lake Houston Wilderness Park in the city park system, so Memorial Park, Buffalo Bayou Park, and the Sabine Street corridor are not route-camping evidence.",
      "campingClassification": "none",
      "summary": "Launch at Woodway Memorial Park and finish at Sabine Street for the most practical downtown Buffalo Bayou paddling-trail segment. Use USGS 08074000 with a conservative 150 cfs base-flow floor, then make a same-day call on storm runoff, reservoir releases, water quality, strainers, and muddy access.",
      "accessCaveats": [
        "TPWD publishes Woodway Memorial Park, Hogg Bird Sanctuary, Eleanor Tinsley Park, Sabine Street, and Allen's Landing as official downstream access points with GPS coordinates, but access quality varies from ramps to steep or muddy banks.",
        "Save Buffalo Bayou says the Woodway launch has parking and a sloped concrete ramp, but also notes mud at the bottom; it identifies the take-out just below Sabine Bridge as the easiest parking-supported finish.",
        "The stored Woodway and Sabine coordinates are public access anchors, not projected mid-channel points. Coordinate audit found them within about 418 ft and 329 ft of the Buffalo Bayou hydrography, so follow the signed ramp or bank path to the actual water entry on arrival.",
        "The bayou is navigable, but TPWD says private-bank use outside direct hazard portages can be trespassing. Do not turn visible lawns or banks into casual stops.",
        "This route uses a local minimum-only threshold source. Around 150 cfs is treated as the floor, while flows above about 2,000 cfs require experienced paddlers and a separate high-water judgment.",
        "Check park access, parking limits, and any post-storm closures before leaving vehicles because Houston bayou access points can change after floods, erosion, or construction."
      ],
      "watchFor": [
        "Flows near or below about 150 cfs, when Save Buffalo Bayou describes base flow as very low and slow and muddy launches or shallow obstructions can slow the day.",
        "Storm runoff, Addicks/Barker Reservoir releases, rising hydrographs, or flows over about 2,000 cfs, when the same local guidance says the bayou can be fast and dangerous.",
        "Log jams, strainers, pipelines, downed trees, low bridges, muddy banks, steep take-outs, and the need to portage obstructions with private-bank discipline.",
        "Urban water quality: TPWD says Buffalo Bayou is generally unsuitable for swimming, so avoid body contact where possible, wash hands, and do not paddle after sewage, bacteria, or heavy-rain alerts.",
        "Heat, limited shade on park sections, variable cell/parking logistics, fishing lines, wildlife, and the temptation to continue below Sabine Street without a separate downtown/Allen's Landing take-out plan."
      ]
    },
    "accessPoints": [
      {
        "id": "woodway-memorial-park",
        "name": "Woodway Memorial Park",
        "latitude": 29.7647,
        "longitude": -95.4569,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in and Save Buffalo Bayou's recommended Woodway launch."
      },
      {
        "id": "hogg-bird-sanctuary",
        "name": "Hogg Bird Sanctuary",
        "latitude": 29.7583,
        "longitude": -95.4217,
        "mileFromStart": 3.2,
        "segmentKind": "creek",
        "note": "Official TPWD midpoint access with parking-hours and steep-bank caveats."
      },
      {
        "id": "eleanor-tinsley-park",
        "name": "Eleanor Tinsley Park",
        "latitude": 29.7617,
        "longitude": -95.3783,
        "mileFromStart": 6.9,
        "segmentKind": "creek",
        "note": "Official TPWD access just upstream of the short final segment to Sabine Street."
      },
      {
        "id": "sabine-street-access",
        "name": "Sabine Street Access",
        "latitude": 29.7622,
        "longitude": -95.3736,
        "mileFromStart": 7.4,
        "segmentKind": "creek",
        "note": "Default TPWD take-out and Save Buffalo Bayou's practical parking-supported finish below Sabine Bridge."
      }
    ]
  },
  "elm-fork-trinity-river-llela-hebron-parkway": {
    "putIn": {
      "id": "llela-lewisville-lake-dam-launch",
      "name": "LLELA / Lewisville Lake Dam launch",
      "latitude": 33.067109,
      "longitude": -96.964697
    },
    "takeOut": {
      "id": "hebron-parkway-kayak-launch",
      "name": "Hebron Parkway Kayak Launch",
      "latitude": 33.0126,
      "longitude": -96.950689
    },
    "logistics": {
      "distanceLabel": "About 6 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr for most recreational groups, with time varying by dam release, strainers, and shuttle pace",
      "shuttle": "Stage a vehicle at Hebron Parkway / Trinity Fork Park first, then drive to LLELA and launch early enough to retrieve any vehicle left inside LLELA before closing. LLELA specifically advises against trying to paddle back upstream to the put-in.",
      "permits": "No route-specific paddling permit is published. LLELA charges daily vehicle entry, requires vehicles to be picked up before closing, and tells paddlers to check current release and conditions before launching. Follow Texas PFD rules and all LLELA access restrictions.",
      "camping": "LLELA has primitive campsites near, but not along, the river. Treat the route as a campground-supported day paddle from the put-in area; camping is designated-only and LLELA says there are no longer river campsites because of flooding.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from LLELA below Lewisville Lake Dam and run downstream to Hebron Parkway for the short official northern Elm Fork segment of the Trinity River National Water Trail. The live decision hinges on dam release, LLELA's current-conditions note, and whether the group has enough margin for strainers and a committed shuttle.",
      "accessCaveats": [
        "LLELA's launch is primitive: it uses a gravel/dirt parking area, a pipe fence or gate, and a 50-100 yard sandy carry to a gentle shoreline rather than a formal ramp.",
        "Hebron Parkway is the first public downstream take-out and has a kayak launch; do not treat private banks between the endpoints as casual stops.",
        "LLELA requires any vehicle left at its parking area to be retrieved before closing, and after-hours admission is not available for a missed shuttle.",
        "This route uses LLELA's conservative 80-600 cfs public guidance for scoring. Above 600 cfs is swift-water territory for experienced paddlers; above 3,000 cfs boating is closed."
      ],
      "watchFor": [
        "Strong dam-tailwater current just below LLELA, especially after release changes.",
        "The tree hazard past the trestle bridge flagged on LLELA's current-conditions page.",
        "Strainers, fallen trees, bank erosion, and fresh wood after storms.",
        "Low-water dragging or shallow bars below about 80 cfs, plus fast pushy current above the 600 cfs public caution point.",
        "Camping and access limits: campsites are designated-only, there are no riverbank campsites, and no swimming or wading is allowed at LLELA."
      ]
    },
    "accessPoints": [
      {
        "id": "llela-lewisville-lake-dam-launch",
        "name": "LLELA / Lewisville Lake Dam launch",
        "latitude": 33.067109,
        "longitude": -96.964697,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Public upstream access anchor from the Trinity Coalition launch map and LLELA route guidance."
      },
      {
        "id": "hebron-parkway-kayak-launch",
        "name": "Hebron Parkway Kayak Launch",
        "latitude": 33.0126,
        "longitude": -96.950689,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "Public downstream launch/take-out named by LLELA and coordinate-backed on the current-conditions page."
      }
    ]
  },
  "west-fork-trinity-river-panther-island-handley-ederville": {
    "putIn": {
      "id": "panther-island-launch",
      "name": "Panther Island",
      "latitude": 32.759716,
      "longitude": -97.338446
    },
    "takeOut": {
      "id": "handley-ederville-road-launch",
      "name": "Handley Ederville Road",
      "latitude": 32.782252,
      "longitude": -97.221388
    },
    "logistics": {
      "distanceLabel": "About 13.75 mi",
      "estimatedPaddleTime": "Long urban day; expect several hours depending on flow, wind, wood, mud, heat, and shuttle pace",
      "shuttle": "Stage the Handley Ederville Road take-out first, then drive back to Panther Island. Beach Street is the mapped intermediate launch about seven miles downstream and can be used as a shorter take-out or bailout when the full Panther-to-Handley day is too much.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check USGS 08048000 and same-day Trinity Trails or event closures before launching, and use only public launch sites or direct hazard portages.",
      "camping": "Treat this as a day-use urban river route. Fort Worth park code does not support informal camping in city parks or recreation areas, and the Trinity Trails material provides public-use hours rather than overnight river-camping support.",
      "campingClassification": "none",
      "summary": "Launch at Panther Island and finish at Handley Ederville Road for the Fort Worth West Fork segment of the Trinity River National Water Trail. Use USGS 08048000 with TRPA's conservative 100 cfs floor, then make a same-day call on mud, wood, water quality, dam awareness, and access closures.",
      "accessCaveats": [
        "The Trinity Coalition map publishes Panther Island, Beach Street, and Handley Ederville Road coordinates as launch-site anchors. Follow current signs and launch paths on arrival rather than projecting mid-channel coordinates.",
        "This is a long urban route. Beach Street is a legitimate midpoint public launch and should be treated as the practical shorter option if the Fort Worth gauge is low, the group starts late, or the weather is unstable.",
        "Trinity Coalition says river conditions, access sites, infrastructure, and dams can change and that users must investigate current conditions while planning a trip.",
        "TRWD and Trinity Trails tell paddlers to check USGS water conditions before launching; trail hours, parking, and event closures can vary by location.",
        "TRPA's 100 cfs minimum and 200 cfs ideal cue are broad West Fork guidance. At very low readings, expect scraping, mud, slow travel, and more effort than the mileage alone suggests."
      ],
      "watchFor": [
        "Flows below about 100 cfs, when TRPA's minimum is not met and the long urban reach can become slow, muddy, or scrape-prone.",
        "High or rising water, urban runoff, poor water quality, and storm-driven debris after rain.",
        "Log jams, strainers, steep muddy banks, low bridges, narrow-channel current, and difficult exits away from the mapped public launches.",
        "Dam and low-head-dam context on the broader Trinity River Paddling Trail; review the current interactive map before launching and avoid every dam unless a manager-marked chute or portage is clearly appropriate.",
        "Heat, limited shade in exposed floodway sections, trail or event closures around Panther Island, and private-bank discipline between public access points."
      ]
    },
    "accessPoints": [
      {
        "id": "panther-island-launch",
        "name": "Panther Island",
        "latitude": 32.759716,
        "longitude": -97.338446,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream launch from the Trinity Coalition Panther-to-Handley map."
      },
      {
        "id": "beach-street-launch",
        "name": "Beach Street",
        "latitude": 32.753179,
        "longitude": -97.287571,
        "mileFromStart": 7,
        "segmentKind": "creek",
        "note": "Mapped midpoint launch and practical shorter take-out for the first Panther-to-Beach Street half."
      },
      {
        "id": "handley-ederville-road-launch",
        "name": "Handley Ederville Road",
        "latitude": 32.782252,
        "longitude": -97.221388,
        "mileFromStart": 13.75,
        "segmentKind": "creek",
        "note": "Default downstream take-out from the Trinity Coalition Panther-to-Handley map."
      }
    ]
  },
  "trinity-river-trammell-crow-loop-12": {
    "putIn": {
      "id": "trammell-crow-park-sylvan-boat-ramp",
      "name": "Trammell Crow Park / Sylvan Boat Ramp",
      "latitude": 32.789872,
      "longitude": -96.834669
    },
    "takeOut": {
      "id": "loop-12-boat-ramp",
      "name": "Loop 12 Boat Ramp",
      "latitude": 32.707197,
      "longitude": -96.735997
    },
    "logistics": {
      "distanceLabel": "About 10.2 mi",
      "estimatedPaddleTime": "About 4 hr to 8 hr for the full trail, or 2 hr to 4 hr per TPWD section, with pace depending on water level, wind, wood, Dallas Wave handling, heat, and shuttle time",
      "shuttle": "Stage the Loop 12 take-out first, then drive back to Trammell Crow Park / Sylvan Boat Ramp. Moore Park / Dallas Wave is the official midpoint access and a practical early take-out if the full urban-to-forest day is too much.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the named public accesses, scout or portage Dallas Wave unless prepared for it, and check the Trinity Coalition map plus Dallas park conditions before launching.",
      "camping": "Treat this as a day-use urban river route. Dallas city code prohibits overnight camping on park property except by special permit, and no TPWD, Trinity Coalition, or city source supports informal riverbank camping on the route.",
      "campingClassification": "none",
      "summary": "Launch from Trammell Crow Park and finish at Loop 12 for the official Dallas Trinity Paddling Trail through downtown floodway and Great Trinity Forest. Use the Dallas USGS gauge with a conservative 100 cfs floor, then make a same-day call on Dallas Wave, dam hazards, runoff, water quality, wood, and shuttle timing.",
      "accessCaveats": [
        "TPWD and Trinity Coalition both identify Trammell Crow Park, Dallas Wave / Moore Park, and Loop 12 as public access anchors. Follow current signs and launch paths on arrival rather than projecting mid-channel coordinates.",
        "TPWD's page still carries an old 2014 note about the Trammell Crow/Sylvan launch being temporarily out of service; this route relies on Trinity Coalition's current National Water Trail map and water-level tiles for the modern access chain.",
        "Moore Park / Dallas Wave is an official midpoint access and the normal place to scout or portage the whitewater feature. Do not continue through the feature just because the route card exists.",
        "Trinity Coalition says access sites, infrastructure, and dams can change. Check the current interactive launch-site map and dam icons before paddling.",
        "TRPA's 100 cfs minimum and 400 cfs ideal cue are broad Dallas main-stem guidance. Near the floor, expect shallow, slow, or muddy travel; near the 2,000 cfs maximum cue or on a rising hydrograph, treat the route as high-consequence urban water."
      ],
      "watchFor": [
        "Dallas Wave / Santa Fe Avenue: scout early, portage if there is any doubt, and avoid every dam or low-head-dam feature unless current manager guidance clearly supports the move.",
        "Urban runoff, poor water quality, fish-consumption advisory context, and rising water after storms or spills.",
        "Strainers, log jams, steep muddy banks, low bridges, channelized current in the first half, wood-lined meanders below Moore Park, and difficult exits away from mapped public launches.",
        "Heat, limited shade in the open floodway, wind, construction or event closures, and the long 10.2-mile commitment if the group misses the Moore Park midpoint option.",
        "Private-bank limits: TPWD says the navigable streambed is public but ordinary private-bank use away from direct hazard portages can be trespassing."
      ]
    },
    "accessPoints": [
      {
        "id": "trammell-crow-park-sylvan-boat-ramp",
        "name": "Trammell Crow Park / Sylvan Boat Ramp",
        "latitude": 32.789872,
        "longitude": -96.834669,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream public access from TPWD and the Trinity Coalition Trammell-to-Loop-12 map."
      },
      {
        "id": "moore-park-dallas-wave",
        "name": "Moore Park / Dallas Wave",
        "latitude": 32.753207,
        "longitude": -96.792298,
        "mileFromStart": 3.75,
        "segmentKind": "creek",
        "note": "Official midpoint access and scout/portage decision point for the Dallas Wave / Santa Fe Avenue feature."
      },
      {
        "id": "loop-12-boat-ramp",
        "name": "Loop 12 Boat Ramp",
        "latitude": 32.707197,
        "longitude": -96.735997,
        "mileFromStart": 10.2,
        "segmentKind": "creek",
        "note": "Default downstream public take-out from TPWD and Trinity Coalition."
      }
    ]
  },
  "rio-grande-rio-grande-village-heath-canyon": {
    "putIn": {
      "id": "rio-grande-village-river-access",
      "name": "Rio Grande Village River Access",
      "latitude": 29.17984,
      "longitude": -102.96085
    },
    "takeOut": {
      "id": "heath-canyon-la-linda",
      "name": "Heath Canyon / La Linda take-out",
      "latitude": 29.45025,
      "longitude": -102.82346
    },
    "logistics": {
      "distanceLabel": "About 33 mi to 35 mi",
      "estimatedPaddleTime": "Usually 2 to 3 days, with NPS noting three days at most levels and a possible two-day pace above about 800 cfs",
      "shuttle": "Stage the Heath Canyon take-out on the U.S. side downstream from La Linda only after confirming current TPWD Black Gap / Heath Canyon Limited Use Permit requirements, road conditions, vehicle security, and border-area logistics. Then drive back to Rio Grande Village inside Big Bend National Park for launch.",
      "permits": "An NPS backcountry use permit is required before putting any watercraft on the Rio Grande, including day and overnight river trips. Heath Canyon take-out access is TPWD-operated and requires a Limited Use Permit with self-registration at Black Gap WMA headquarters.",
      "camping": "This is an overnight-capable canyon route only with the required NPS river permit and a legal camp plan. NPS prohibits or discourages camping in developed, private, vehicle-accessible, and sensitive areas, including the early Boquillas Canyon Trail vicinity, private Heath Canyon ranch areas without approval, Black Gap fish camps, and other inhabited or cultivated areas. Use legal river camps above the high-water mark; do not infer camping from any random bank.",
      "campingClassification": "overnight_capable",
      "summary": "Launch at Rio Grande Village and paddle the remote Boquillas Canyon corridor to Heath Canyon / La Linda. The route is Class I-II but high-commitment because of heat, permits, water logistics, sudden rises, limited exits, camping restrictions, and the long take-out shuttle.",
      "accessCaveats": [
        "American Whitewater coordinates are access anchors, not a promise that the current wetted launch line is at the coordinate. Follow NPS signs, current riverbank conditions, and ranger guidance on arrival.",
        "NPS says Rio Grande Village is the normal put-in for Boquillas Canyon; do not use private land, Mexican-bank landings, or informal roads as alternate access except for immediate safety needs.",
        "NPS says Heath Canyon is now owned and operated by TPWD and requires Limited Use Permit handling through Black Gap WMA. Confirm the access is open, drivable, and permitted before committing to the canyon.",
        "At low water below the 150 cfs recommendation, expect dragging, exposed boulders, slower travel, and higher risk at shallow rock gardens. At rising or storm-driven levels, treat camps, side canyons, and narrow canyon sections as flash-flood hazards.",
        "The route is remote and border-adjacent. Carry required safety gear, repair supplies, extra water treatment capacity, waste system, firepan when fires are allowed, and reliable emergency communication."
      ],
      "watchFor": [
        "Arroyo del Veinte, the lower-canyon Class II boulder feature American Whitewater flags as capable of flipping canoes at lower flows.",
        "Extreme heat, limited shade, dehydration, treated-water planning, sudden storms, and flash flooding during the summer rainy season.",
        "Strainers, boulders, rock gardens, shallow dragging, strong wind in open reaches, and difficult rescue due to limited road access.",
        "NPS camping restrictions near Boquillas Canyon Trail, developed or vehicle-accessible areas, private ranch lands, Heath Canyon, Black Gap fish camps, and cultivated or inhabited areas.",
        "Current NPS river regulations, private group size limits, required PFDs/spare gear, overnight waste-system rules, and water-quality concerns."
      ]
    },
    "accessPoints": [
      {
        "id": "rio-grande-village-river-access",
        "name": "Rio Grande Village River Access",
        "latitude": 29.17984,
        "longitude": -102.96085,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default NPS Boquillas Canyon put-in; American Whitewater publishes this river-left Rio Grande Village access anchor."
      },
      {
        "id": "heath-canyon-la-linda",
        "name": "Heath Canyon / La Linda take-out",
        "latitude": 29.45025,
        "longitude": -102.82346,
        "mileFromStart": 34.6,
        "segmentKind": "creek",
        "note": "Default downstream take-out below La Linda; American Whitewater publishes this access anchor and NPS notes TPWD Limited Use Permit requirements."
      }
    ]
  }
};
