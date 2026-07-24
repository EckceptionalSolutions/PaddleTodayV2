// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const kentuckyRiverTripDetails: Record<string, RiverTripDetails> = {
  "russell-creek-hatcher-todd-ford-milltown": {
    "putIn": {
      "id": "hatcher-todd-ford",
      "name": "Hatcher Road / Todd Ford Road Access",
      "latitude": 37.1242,
      "longitude": -85.3395
    },
    "takeOut": {
      "id": "milltown-road-bridge",
      "name": "Milltown Road Bridge Access",
      "latitude": 37.1237,
      "longitude": -85.4049
    },
    "logistics": {
      "distanceLabel": "About 7.8 mi",
      "estimatedPaddleTime": "Half-day to full-day creek trip, longer below the good band or with wood, scouting, and dragging",
      "shuttle": "Stage the take-out at Milltown Road Bridge Access, then drive back to Hatcher Road / Todd Ford Road Access. Both are limited, no-amenity rural accesses; keep vehicles tight, avoid blocking the ford or road approaches, and confirm there is enough water before committing to the shuttle.",
      "permits": "No route-specific private paddling permit is known. Use only the KDFWR-listed public access areas, follow Kentucky boating and PFD rules, obey posted signs, and respect private property around both access points.",
      "camping": "Treat this as a daylight day trip. KDFWR notes private-adjacent banks around the accesses, and no public camping is known on this segment.",
      "summary": "Launch at Hatcher Road / Todd Ford Road and take out at Milltown Road Bridge for the 7.8-mile KDFWR Russell Creek segment. Use the Columbia USGS gauge and skip or shorten the day when the creek is below the KDFWR good band.",
      "accessCaveats": [
        "Hatcher Road / Todd Ford Road is a ford access with limited parking that can depend on water level and bank condition. Do not block the ford.",
        "Milltown Road Bridge Access has limited parking, no amenities, and private-adjacent banks; use only the immediate public access area.",
        "This is a rural creek with access points far apart. Have a complete shuttle and daylight margin before launching.",
        "Low water can turn the route into a scrape-and-drag day before the gauge fully fails."
      ],
      "watchFor": [
        "Shallow riffles, rock bars, ford approaches, and narrow bends below about 100 cfs.",
        "Wood, strainers, floating debris, and blind corners, especially after rain.",
        "High or rising water above KDFWR's good band, which can make a narrow creek pushy and reduce eddy and landing options.",
        "Private banks and limited legal stops; stay with ordinary navigation and documented public access.",
        "No amenities, limited parking, rural road approaches, and weak cell coverage in spots."
      ]
    }
  },
  "russell-creek-milltown-russell-creek-road": {
    "putIn": {
      "id": "milltown-road-bridge",
      "name": "Milltown Road Bridge Access",
      "latitude": 37.1237,
      "longitude": -85.4049
    },
    "takeOut": {
      "id": "russell-creek-road",
      "name": "Russell Creek Road Access",
      "latitude": 37.1701,
      "longitude": -85.4354
    },
    "logistics": {
      "distanceLabel": "About 13.2 mi",
      "estimatedPaddleTime": "Long daylight day, often 5 hr to 8 hr depending on level, wood, and scraping",
      "shuttle": "Stage the take-out at Russell Creek Road Access, then drive back to Milltown Road Bridge Access. Both are rural, no-amenity accesses; confirm the slab-crossing take-out and leave a daylight margin before committing to the shuttle.",
      "permits": "No route-specific private paddling permit is known. Use only the KDFWR-listed public access areas, follow Kentucky boating and PFD rules, obey posted signs, and respect private property around both access points.",
      "camping": "Treat this as a daylight day trip. KDFWR lists no camping at either access, and no legal on-route overnight support was verified for this segment.",
      "summary": "Launch at Milltown Road Bridge Access and take out at Russell Creek Road Access for the 13.2-mile middle Russell Creek segment. Use the Columbia USGS gauge and expect a much slower day below the KDFWR good band.",
      "accessCaveats": [
        "Milltown Road Bridge Access has limited parking, no amenities, and private-adjacent banks; use only the immediate public access area.",
        "Russell Creek Road Access uses gravel pull-offs and a large gravel bar above the slab crossing. The take-out is simple but still rural and low-amenity.",
        "This longer middle segment leaves few easy bailout conveniences, so inspect the shuttle and weather before launching.",
        "Low water can add repeated dragging long before the route becomes truly unrunnable."
      ],
      "watchFor": [
        "Shallow riffles, rock bars, and dragging below about 100 cfs.",
        "Wood, strainers, blind corners, and floating debris after rain.",
        "High or rising water above KDFWR's good band, which can make a narrow creek pushier and reduce landing options.",
        "Private banks and limited legal stops; stay with ordinary navigation and documented public accesses.",
        "Long daylight commitment, weak services, and the need to line up the slab-crossing take-out cleanly at the end of the day."
      ]
    }
  },
  "russell-creek-hatcher-todd-ford-russell-creek-road": {
    "putIn": {
      "id": "hatcher-todd-ford",
      "name": "Hatcher Road / Todd Ford Road Access",
      "latitude": 37.1242,
      "longitude": -85.3395
    },
    "takeOut": {
      "id": "russell-creek-road",
      "name": "Russell Creek Road Access",
      "latitude": 37.1701,
      "longitude": -85.4354
    },
    "logistics": {
      "distanceLabel": "About 21 mi",
      "estimatedPaddleTime": "Very long dawn-to-dusk creek day, often 8 hr to 11 hr depending on level, wood, and dragging",
      "shuttle": "Stage the take-out at Russell Creek Road Access, then drive back to Hatcher Road / Todd Ford Road Access. This is a long rural shuttle and a big on-water commitment; confirm weather, water, daylight, and vehicle placement before launching.",
      "permits": "No route-specific private paddling permit is known. Use only the KDFWR-listed public access areas, follow Kentucky boating and PFD rules, obey posted signs, and respect private property around all access points.",
      "camping": "Treat this as a serious daylight-only challenge run. KDFWR lists no camping at the public accesses, and no legal on-route overnight plan was verified for this 21-mile creek chain.",
      "summary": "Launch at Hatcher Road / Todd Ford Road and stay on Russell Creek all the way to Russell Creek Road Access for about 21 miles. This combines the first two KDFWR public segments and needs solid water, an early start, and conservative decision-making.",
      "accessCaveats": [
        "Hatcher Road / Todd Ford Road is a ford access with limited parking that can depend on water level and bank condition. Do not block the ford.",
        "The route passes the Milltown public access mid-corridor, but otherwise legal public exits are limited and private banks dominate much of the creek.",
        "Russell Creek Road Access uses pull-offs and a slab crossing with no amenities. Inspect the take-out before the shuttle.",
        "The length means low water, wood, thunderstorms, or a late start can turn this into an uncomfortably long day."
      ],
      "watchFor": [
        "Shallow riffles, rock bars, ford approaches, and repeated dragging below about 100 cfs.",
        "Wood, strainers, blind corners, and debris piles that matter more on a long narrow-creek commitment.",
        "High or rising water above KDFWR's good band, which raises consequences on a route with limited exits and many miles still ahead.",
        "Private banks, fatigue, heat, hydration issues, and weak cell coverage in a rural corridor.",
        "No amenities, limited parking, and the need to preserve enough daylight to reach the slab-crossing take-out safely."
      ]
    }
  },
  "russell-creek-russell-creek-road-green-river-russell-creek-vpa": {
    "putIn": {
      "id": "russell-creek-road",
      "name": "Russell Creek Road Access",
      "latitude": 37.1701,
      "longitude": -85.4354
    },
    "takeOut": {
      "id": "green-river-russell-creek-vpa",
      "name": "Green River-Russell Creek VPA",
      "latitude": 37.2283,
      "longitude": -85.5096
    },
    "logistics": {
      "distanceLabel": "About 12.6 mi",
      "estimatedPaddleTime": "Long daylight day, often 5 hr to 8 hr depending on level, wood, and mouth-current conditions",
      "shuttle": "Stage the take-out at the Green River-Russell Creek VPA gate, then drive back to Russell Creek Road Access. The mouth take-out is a low-amenity walk-in VPA site with limited parking, so inspect the landing and parking plan before launching.",
      "permits": "No route-specific private paddling permit is known. Use only the KDFWR-listed public access areas, follow Kentucky boating and PFD rules, obey posted VPA regulations, and respect private property around the corridor.",
      "camping": "Treat this as a daylight day trip. The Green River-Russell Creek VPA is private property enrolled in KDFWR's VPA program with daylight-hours-only access and no camping.",
      "summary": "Launch at Russell Creek Road Access and take out at the Green River-Russell Creek VPA at the mouth for the 12.6-mile lower Russell Creek segment. Use the Columbia USGS gauge and respect the VPA daylight-only, no-camping rules at the take-out.",
      "accessCaveats": [
        "Russell Creek Road Access uses gravel pull-offs and a large gravel bar above the slab crossing; there are no other amenities.",
        "Green River-Russell Creek VPA is private property under KDFWR's Voluntary Public Access Program. Park at the gate, walk in, and follow the posted daylight-hours-only rules.",
        "The VPA detail explicitly prohibits camping, fires, alcohol, swimming, ATV use, and other off-purpose use.",
        "This lower segment still has few services and limited legal stopping points away from the named public accesses."
      ],
      "watchFor": [
        "Shallow riffles, gravel bars, and scraping below about 100 cfs.",
        "Wood, strainers, blind corners, and debris near the lower bends and the mouth approach.",
        "High or rising water above KDFWR's good band, especially where the lower creek pushes through bends with fewer easy exits.",
        "Private banks, VPA rules, and the need to finish before dark because the mouth access is daylight-hours-only.",
        "Limited parking, no amenities, and the possibility of Green River backwater or mouth turbulence affecting the take-out zone."
      ]
    }
  },
  "tygarts-creek-olive-hill-carter-caves": {
    "putIn": {
      "id": "olive-hill-carrydown",
      "name": "Olive Hill Depot Trailhead and Campground Access",
      "latitude": 38.2993,
      "longitude": -83.1745
    },
    "takeOut": {
      "id": "carter-caves-state-park",
      "name": "Carter Caves State Park / KY 182 bridge access",
      "latitude": 38.3676,
      "longitude": -83.1089
    },
    "logistics": {
      "distanceLabel": "About 12.5 mi",
      "estimatedPaddleTime": "Long daylight day, often dawn-to-dusk at low water and faster but more demanding above 300 cfs",
      "shuttle": "Stage the take-out at the Carter Caves State Park carry-down access by the KY 182 bridge, then drive back to Olive Hill Depot Trailhead and Campground Access on Tygart Street. This is a long one-way gorge shuttle; confirm the take-out steps and parking before launching.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow Kentucky boating and PFD rules, obey Carter Caves State Resort Park rules, and respect private property along the corridor.",
      "camping": "The route starts at the Olive Hill Depot Trailhead and Campground Access and ends at Carter Caves State Resort Park, which has campground and lodging options. Treat it as endpoint campground staging, not a mid-route camping plan.",
      "summary": "Launch at Olive Hill Depot Trailhead and Campground Access and take out 12.5 miles downstream at Carter Caves State Park near the KY 182 bridge. KDFWR warns that below 150 cfs the route is hard to finish in a day and above 300 cfs the gorge becomes more challenging.",
      "accessCaveats": [
        "Olive Hill Carrydown is a KDFWR public carry-down site through Tygarts Creek Rail Trail Park with paved parking but no listed restrooms, dock, or ramp amenities.",
        "Carter Caves State Park is a KDFWR public carry-down access with unpaved parking near the KY 182 bridge. Use the access area and wooden-step take-out cue rather than spreading out on park or private banks.",
        "KDFWR says the take-out steps are on river left about 150 yards upstream of the KY 182 bridge after the Devil's Backbone turns and Smoky Creek confluence. Missing them can complicate the exit.",
        "The 12.5-mile length leaves little margin for late starts, low-water dragging, fishing delays, or scouting stops."
      ],
      "watchFor": [
        "Shallow riffles, shoals, and boat dragging below about 150 cfs.",
        "Borderline Class II rapids, faster current, and harder ferry/eddy moves above about 300 cfs.",
        "Strong current pushing into overhanging bluffs, especially through tight bends in the gorge.",
        "Wood, fallen treetops, strainers, blind corners, and fresh storm debris.",
        "Remote gorge logistics, limited intermediate exits, daylight pressure, and park/access rules at Carter Caves."
      ]
    }
  },
  "floyds-fork-fisherville-cane-run": {
    "putIn": {
      "id": "fisherville-canoe-access",
      "name": "Fisherville Canoe Access",
      "latitude": 38.1887,
      "longitude": -85.4779
    },
    "takeOut": {
      "id": "cane-run-canoe-access",
      "name": "Cane Run Canoe Access",
      "latitude": 38.1519,
      "longitude": -85.5026
    },
    "logistics": {
      "distanceLabel": "About 4.2 mi",
      "estimatedPaddleTime": "About 2.5 hr to 3.5 hr, longer with low water, scouting, fishing, or wood",
      "shuttle": "Stage the take-out at Cane Run Canoe Access off Echo Trail, then drive back to Fisherville Canoe Access on Old Taylorsville Road. Inspect Cane Run first because The Parklands describes the final take-out as a signed side-channel exit that can be easy to miss.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a short day trip. No camping plan is assumed between Fisherville and Cane Run, and banks away from public access areas should be treated as private or managed park land unless clearly posted otherwise.",
      "summary": "Launch at Fisherville Canoe Access and take out 4.2 miles downstream at Cane Run Canoe Access for a short Floyds Fork day in The Parklands corridor. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs.",
      "accessCaveats": [
        "Fisherville is a KDFWR carry-down site off Old Taylorsville Road with unpaved parking and no listed amenities. Make a same-day visual check before unloading boats.",
        "Cane Run is a KDFWR carry-down site off Echo Trail with unpaved parking. The Parklands route notes say the take-out is reached by going about 50 yards up the Cane Run side channel after the Fork bends hard right.",
        "The Parklands says Floyds Fork levels rise and fall quickly. Do not treat the gauge as a substitute for checking rain, trend, and the launch channel before committing.",
        "Stay on the creek and use named public accesses. Respect private property and managed park boundaries; do not climb banks, scout through yards, or assume gravel bars are legal stopping points."
      ],
      "watchFor": [
        "Class I+ moving water, narrow chutes, small ledges, small waves, and pool-and-drop sections that require boat control.",
        "Strainers, log jams, root balls, overhanging brush, sharp bends, bridge debris, and fresh storm wood.",
        "Low water below 50 cfs or 1.3 ft, when shallow chutes, islands, and dragging become likely.",
        "High water above 300 cfs or 2.5 ft, when KDFWR moves the creek out of the good band and The Parklands cautions that current can be swift with fewer landing beaches.",
        "Water-quality and runoff concerns after storms in the Louisville metro watershed; avoid paddling after heavy rain or visible contamination."
      ]
    }
  },
  "floyds-fork-fisherville-seaton-valley": {
    "putIn": {
      "id": "fisherville-canoe-access",
      "name": "Fisherville Canoe Access",
      "latitude": 38.1887,
      "longitude": -85.4779
    },
    "takeOut": {
      "id": "seaton-valley-paddling-access",
      "name": "Seaton Valley Paddling Access",
      "latitude": 38.1323,
      "longitude": -85.5191
    },
    "logistics": {
      "distanceLabel": "About 7.3 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Seaton Valley Paddling Access in Turkey Run Park, then drive back to Fisherville Canoe Access on Old Taylorsville Road. Inspect both carry-downs before launching because the Parklands corridor uses marked landings rather than broad beaches.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a Parklands day trip. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at Fisherville Canoe Access and take out 7.3 miles downstream at Seaton Valley Paddling Access for a longer Parklands Floyds Fork float. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs, while the route guidance adds low-water shoals, waves, wood, and marked-landings-only discipline.",
      "accessCaveats": [
        "Fisherville is a KDFWR carry-down site off Old Taylorsville Road with unpaved parking and no listed amenities.",
        "Seaton Valley is a KDFWR carry-down access in Turkey Run Park with shoreline access and no camping listed.",
        "The Parklands instructs paddlers to use marked landings only and not to take out on private property.",
        "The current Fisherville gauge reading during this run sat just above the discharge floor but below the official stage floor, so expect more scraping and slower shoals than the mileage alone suggests."
      ],
      "watchFor": [
        "Class I+ moving water with shallow gravel shoals that often require walking at low water.",
        "Waves, root wads, downed limbs, and swifter current through bends and bridge pinch points.",
        "The signed Cane Run side-channel area, followed by more pushy lower-corridor current into Turkey Run.",
        "High water above the good band, when current speeds up and recovery spots become scarcer.",
        "Water-quality and runoff concerns after storms in the Floyds Fork watershed."
      ]
    }
  },
  "floyds-fork-north-beckley-creekside": {
    "putIn": {
      "id": "north-beckley-canoe-access",
      "name": "North Beckley Canoe Access",
      "latitude": 38.2308,
      "longitude": -85.4682
    },
    "takeOut": {
      "id": "creekside-canoe-access",
      "name": "Creekside Canoe Access",
      "latitude": 38.2158,
      "longitude": -85.4778
    },
    "logistics": {
      "distanceLabel": "About 2.1 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Creekside Canoe Access near the Egg Lawn, then drive back to North Beckley Canoe Access off Miles Park Road. Walk the Creekside stairs first so the take-out is obvious from the water.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a short urban day float. No camping plan is assumed between North Beckley and Creekside, and Parklands property should be treated as day-use access unless clearly posted otherwise.",
      "summary": "Launch at North Beckley Canoe Access and take out 2.1 miles downstream at Creekside Canoe Access for the shortest Parklands Floyds Fork segment. KDFWR ties the corridor to the Fisherville gauge and The Parklands describes this reach as a small, intimate moving-water float.",
      "accessCaveats": [
        "North Beckley is a KDFWR carry-down site in Beckley Creek Park with limited-hours shoreline access, unpaved parking, and no ramp surface.",
        "Creekside is a KDFWR carry-down site reached from the south side of the Egg Lawn. The education route write-up says the take-out is on river right just past the Gheens Foundation Lodge at large tan stone steps.",
        "The Parklands says Floyds Fork levels rise and fall quickly. Do not treat the gauge as a substitute for checking weather, trend, and the launch channel before committing.",
        "Use marked landings only and respect private property. Do not assume side channels, gravel bars, or park banks outside the designated accesses are legal stopping points."
      ],
      "watchFor": [
        "Class I+ moving water with shallow riffles, braided chutes, and gravel bars that can require dragging at lower flows.",
        "Downed timber, strainers, woody cover, and blind bends around The Oxbow.",
        "A small side channel on river left around The Oxbow that the KDFWR write-up says to avoid in favor of the main current.",
        "Higher current and fewer recovery options once the Fisherville gauge climbs beyond the good band, especially after storms.",
        "Water-quality and runoff concerns after heavy rain in the Louisville metro watershed."
      ]
    }
  },
  "floyds-fork-creekside-fisherville": {
    "putIn": {
      "id": "creekside-canoe-access",
      "name": "Creekside Canoe Access",
      "latitude": 38.2158,
      "longitude": -85.4778
    },
    "takeOut": {
      "id": "fisherville-canoe-access",
      "name": "Fisherville Canoe Access",
      "latitude": 38.1887,
      "longitude": -85.4779
    },
    "logistics": {
      "distanceLabel": "About 4.3 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Fisherville Canoe Access on Old Taylorsville Road, then drive back to Creekside Canoe Access. Inspect the Fisherville bridge landing before launching so the right-bank take-out just below KY 155 is easy to spot.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a Parklands day trip. No camping plan is assumed between Creekside and Fisherville, and banks away from public access areas should be treated as private or managed park land unless clearly posted otherwise.",
      "summary": "Launch at Creekside Canoe Access and take out 4.3 miles downstream at Fisherville Canoe Access for the middle Parklands Floyds Fork float. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs, while the route description adds low-water shoals and bluff-lined moving water.",
      "accessCaveats": [
        "Creekside is a KDFWR carry-down access near the Egg Lawn with no listed amenities. Confirm parking rules and the carry path before unloading boats.",
        "Fisherville is a KDFWR carry-down site off Old Taylorsville Road with unpaved parking and no listed amenities.",
        "The Parklands says Floyds Fork levels rise and fall quickly and that lower water can expose shoals requiring wading.",
        "Stay on the creek and use named public accesses only. Respect private property and managed park boundaries throughout the corridor."
      ],
      "watchFor": [
        "Class I+ moving water with shallow gravel shoals that often require walking at low water.",
        "Undercut banks, root wads, downed limbs, and faster water near Distillery Bend and bridge pinch points.",
        "Bridge approaches at Echo Trail, the railroad trestle, Taylorsville Road, and KY 155.",
        "High water above the good band, when current speeds up through bends and recovery spots become scarcer.",
        "Water-quality and runoff concerns after storms in the Floyds Fork watershed."
      ]
    }
  },
  "floyds-fork-creekside-cane-run": {
    "putIn": {
      "id": "creekside-canoe-access",
      "name": "Creekside Canoe Access",
      "latitude": 38.2158,
      "longitude": -85.4778
    },
    "takeOut": {
      "id": "cane-run-canoe-access",
      "name": "Cane Run Canoe Access",
      "latitude": 38.1519,
      "longitude": -85.5026
    },
    "logistics": {
      "distanceLabel": "About 8.5 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Cane Run Canoe Access off Echo Trail, then drive back to Creekside Canoe Access. Inspect the signed Cane Run side-channel exit before launching because drifting past it creates an avoidable downstream access problem.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a Parklands day trip. No camping plan is assumed between Creekside and Cane Run, and banks away from public access areas should be treated as private or managed park land unless clearly posted otherwise.",
      "summary": "Launch at Creekside Canoe Access and take out 8.5 miles downstream at Cane Run Canoe Access for a longer middle-corridor Floyds Fork float. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs, while route guidance adds bluff-lined moving water, bridge landmarks, and the Cane Run side-channel finish.",
      "accessCaveats": [
        "Creekside is a KDFWR carry-down access near the Egg Lawn with no listed amenities. Confirm parking rules and the carry path before unloading boats.",
        "Cane Run is a KDFWR carry-down site off Echo Trail with unpaved parking.",
        "The Parklands says Floyds Fork levels rise and fall quickly and that lower water can expose shoals requiring wading.",
        "Stay on the creek and use named public accesses only. Respect private property and managed park boundaries throughout the corridor."
      ],
      "watchFor": [
        "Class I+ moving water with shallow gravel shoals that often require walking at low water.",
        "Undercut banks, root wads, downed limbs, and faster water near Distillery Bend and bridge pinch points.",
        "Bridge approaches, the Cane Run side-channel take-out, and fewer easy recovery spots as flows rise.",
        "High water above the good band, when current speeds up through bends and recovery spots become scarcer.",
        "Water-quality and runoff concerns after storms in the Floyds Fork watershed."
      ]
    }
  },
  "floyds-fork-creekside-seaton-valley": {
    "putIn": {
      "id": "creekside-canoe-access",
      "name": "Creekside Canoe Access",
      "latitude": 38.2158,
      "longitude": -85.4778
    },
    "takeOut": {
      "id": "seaton-valley-paddling-access",
      "name": "Seaton Valley Paddling Access",
      "latitude": 38.1323,
      "longitude": -85.5191
    },
    "logistics": {
      "distanceLabel": "About 11.6 mi",
      "estimatedPaddleTime": "About 5.5 hr to 7.5 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Seaton Valley Paddling Access in Turkey Run Park, then drive back to Creekside Canoe Access. Walk both carry-downs before launching because the Parklands corridor uses marked landings instead of broad public beaches.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a long Parklands day trip. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at Creekside Canoe Access and take out 11.6 miles downstream at Seaton Valley Paddling Access for a middle-to-lower Parklands Floyds Fork float. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs, while route guidance adds low-water shoals, moving-water bends, and marked-landings-only discipline.",
      "accessCaveats": [
        "Creekside is a KDFWR carry-down access near the Egg Lawn with no listed camping and limited parking detail.",
        "Seaton Valley is a KDFWR carry-down site in Turkey Run Park with shoreline access and no listed camping.",
        "The Parklands says Floyds Fork levels rise and fall quickly and instructs paddlers to use marked landings only and not to take out on private property.",
        "The current Fisherville gauge reading during this run sat below the official cfs and stage good-band floors, so expect more scraping and a slower day than the mileage alone suggests."
      ],
      "watchFor": [
        "Class I+ moving water with shallow gravel shoals, root wads, and wood that can require dragging at lower flows.",
        "Bridge landmarks, bluff-lined bends, and the signed Cane Run side-channel area as you pass into the lower corridor.",
        "Fewer easy recovery spots once the creek pushes above the official good band.",
        "Private-bank and managed-park boundary issues if you miss the designated take-out.",
        "Water-quality and runoff concerns after storms in the Floyds Fork watershed."
      ]
    }
  },
  "floyds-fork-creekside-broad-run-valley": {
    "putIn": {
      "id": "creekside-canoe-access",
      "name": "Creekside Canoe Access",
      "latitude": 38.2158,
      "longitude": -85.4778
    },
    "takeOut": {
      "id": "broad-run-valley-paddling-access",
      "name": "Broad Run Valley Paddling Access",
      "latitude": 38.1039,
      "longitude": -85.5455
    },
    "logistics": {
      "distanceLabel": "About 15.1 mi",
      "estimatedPaddleTime": "About 6.5 hr to 9 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Broad Run Valley Paddling Access, then drive back to Creekside Canoe Access. Inspect both carry-downs before launching because this long Parklands route depends on designated landings rather than broad public beaches.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a long Parklands day trip. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at Creekside Canoe Access and take out 15.1 miles downstream at Broad Run Valley Paddling Access for a long Parklands Floyds Fork float. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs, while the lower-route guidance adds the Cane Run zone, Marys Island, bedrock shelves, wood, and marked-landings-only discipline.",
      "accessCaveats": [
        "Creekside is a KDFWR carry-down access near the Egg Lawn with no listed amenities beyond the access itself.",
        "Broad Run Valley is a KDFWR carry-down access with year-round limited-hours shoreline access and no listed camping.",
        "The Parklands instructs paddlers to use marked landings only and not to take out on private property.",
        "The same-day Fisherville gauge reading during this run sat inside the official good band, but Floyds Fork still rises and falls quickly after rain."
      ],
      "watchFor": [
        "Class I+ moving water with shallow gravel shoals, bedrock shelves, and longer stretches where low water can force dragging.",
        "The signed Cane Run side-channel area, followed by more pushy lower-corridor current into Turkey Run and Broad Run.",
        "Strainers, fallen wood, bluff-side current, and the mile-long Mary's Island split where the KDFWR PDF says to stay left.",
        "Longer recovery swims and fewer easy eddies once the creek pushes above the official good band.",
        "Water-quality and runoff concerns after storms in the Floyds Fork watershed."
      ]
    }
  },
  "floyds-fork-cane-run-seaton-valley": {
    "putIn": {
      "id": "cane-run-canoe-access",
      "name": "Cane Run Canoe Access",
      "latitude": 38.1519,
      "longitude": -85.5026
    },
    "takeOut": {
      "id": "seaton-valley-paddling-access",
      "name": "Seaton Valley Paddling Access",
      "latitude": 38.1323,
      "longitude": -85.5191
    },
    "logistics": {
      "distanceLabel": "About 3.1 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, longer with high water, scouting, or fishing",
      "shuttle": "Stage the take-out at Seaton Valley Paddling Access in Turkey Run Park, then drive back to Cane Run Canoe Access off Echo Trail. Walk both carry-downs before launching because the Parklands corridor uses marked landings rather than broad beaches.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a short Parklands day trip. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at Cane Run Canoe Access and take out 3.1 miles downstream at Seaton Valley Paddling Access for a short lower-Parklands Floyds Fork float. KDFWR documents the public access pair and Fisherville gauge bands, while The Parklands supplies the moving-water and use-marked-landings safety posture.",
      "accessCaveats": [
        "Cane Run is a KDFWR carry-down site off Echo Trail with unpaved parking.",
        "Seaton Valley is a KDFWR carry-down access in Turkey Run Park with limited parking details and no camping listed.",
        "The Parklands instructs paddlers to use marked landings only and not to take out on private property.",
        "Floyds Fork rises and falls quickly after rain. Check the gauge trend, weather, and launch current before committing."
      ],
      "watchFor": [
        "Class I+ moving water, shallow shoals, and swift bends that become less forgiving as levels rise.",
        "Strainers, fallen wood, overhanging brush, and fresh storm debris.",
        "Longer recovery swims and fewer eddies when flows push above the official good band.",
        "Private-bank and managed-park boundary issues if you miss the designated take-out.",
        "Water-quality and runoff concerns after heavy rain in the Louisville metro watershed."
      ]
    }
  },
  "floyds-fork-cane-run-broad-run-valley": {
    "putIn": {
      "id": "cane-run-canoe-access",
      "name": "Cane Run Canoe Access",
      "latitude": 38.1519,
      "longitude": -85.5026
    },
    "takeOut": {
      "id": "broad-run-valley-paddling-access",
      "name": "Broad Run Valley Paddling Access",
      "latitude": 38.1039,
      "longitude": -85.5455
    },
    "logistics": {
      "distanceLabel": "About 6.6 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Broad Run Valley Paddling Access, then drive back to Cane Run Canoe Access off Echo Trail. Walk both carry-downs before launching because the Parklands corridor uses marked landings instead of broad public beaches.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a lower-Parklands day trip. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at Cane Run Canoe Access and take out 6.6 miles downstream at Broad Run Valley Paddling Access for a longer lower-Parklands Floyds Fork float. KDFWR documents the exact route pieces and the same Fisherville gauge bands used upstream.",
      "accessCaveats": [
        "Cane Run is a KDFWR carry-down site off Echo Trail with unpaved parking.",
        "Broad Run Valley is a KDFWR carry-down access with year-round limited-hours shoreline access and no listed camping.",
        "The Parklands instructs paddlers to use marked landings only and not to take out on private property.",
        "The current Fisherville gauge reading during this run sat just above the discharge floor but below the official stage floor, so expect more scraping and slower shoals than the mileage alone suggests."
      ],
      "watchFor": [
        "Class I+ moving water, shallow bedrock rapids, and braid choices around islands and chutes.",
        "Strainers, fallen wood, and the mile-long Mary's Island split where the KDFWR PDF says to stay left.",
        "Longer recovery swims and fewer easy eddies once the creek pushes above the official good band.",
        "Undercut banks, bluff-side current, and bedrock shelves through the lower Parklands section.",
        "Water-quality and runoff concerns after heavy rain in the Louisville metro watershed."
      ]
    }
  },
  "floyds-fork-north-beckley-cane-run": {
    "putIn": {
      "id": "north-beckley-canoe-access",
      "name": "North Beckley Canoe Access",
      "latitude": 38.2308,
      "longitude": -85.4682
    },
    "takeOut": {
      "id": "cane-run-canoe-access",
      "name": "Cane Run Canoe Access",
      "latitude": 38.1519,
      "longitude": -85.5026
    },
    "logistics": {
      "distanceLabel": "About 10.7 mi",
      "estimatedPaddleTime": "About 5.25 hr to 7.5 hr, longer with low water, scouting, or wood",
      "shuttle": "Stage the take-out at Cane Run Canoe Access off Echo Trail, then drive back to North Beckley Canoe Access in Beckley Creek Park. Inspect the signed Cane Run side-channel exit before launching because drifting past it creates an avoidable downstream access problem.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a long day float. No camping plan is assumed between North Beckley and Cane Run, and Parklands property should be treated as day-use access unless clearly posted otherwise.",
      "summary": "Launch at North Beckley Canoe Access and take out 10.7 miles downstream at Cane Run Canoe Access for the full upper Parklands Floyds Fork route. KDFWR ties the corridor to the Fisherville gauge and the Parklands/KDFWR route notes make the moving-water and take-out discipline explicit.",
      "accessCaveats": [
        "North Beckley is a KDFWR carry-down site in Beckley Creek Park with limited-hours shoreline access, unpaved parking, and no ramp surface.",
        "Cane Run is a KDFWR carry-down site off Echo Trail with unpaved parking. The Parklands route notes say the take-out is about 50 yards up the Cane Run side channel on river right and can be easy to miss.",
        "The Parklands says Floyds Fork levels rise and fall quickly. Do not treat the gauge as a substitute for checking recent rain, gauge trend, and the creek at the launch.",
        "Use marked landings only and respect private property throughout the corridor. Do not assume gravel bars, side channels, or park banks outside the designated accesses are legal stopping points."
      ],
      "watchFor": [
        "Class I+ moving water with shallow riffles, braided chutes, and gravel bars that can require dragging at lower flows.",
        "Downed timber, strainers, woody cover, and blind bends around The Oxbow, Distillery Bend, and bridge pinch points.",
        "A long day commitment with fewer easy bailout options than the shorter Parklands segments.",
        "High water above the corridor good band, when current speeds up through bends and fewer beaches remain for recovery.",
        "Water-quality and runoff concerns after heavy rain in the Louisville metro watershed."
      ]
    }
  },
  "floyds-fork-north-beckley-seaton-valley": {
    "putIn": {
      "id": "north-beckley-canoe-access",
      "name": "North Beckley Canoe Access",
      "latitude": 38.2308,
      "longitude": -85.4682
    },
    "takeOut": {
      "id": "seaton-valley-paddling-access",
      "name": "Seaton Valley Paddling Access",
      "latitude": 38.1323,
      "longitude": -85.5191
    },
    "logistics": {
      "distanceLabel": "About 13.7 mi",
      "estimatedPaddleTime": "About 6.5 hr to 8.5 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Seaton Valley Paddling Access in Turkey Run Park, then drive back to North Beckley Canoe Access in Beckley Creek Park. Inspect both carry-downs before launching because the Parklands corridor uses designated landings rather than broad public beaches.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a long Parklands day float. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at North Beckley Canoe Access and take out 13.7 miles downstream at Seaton Valley Paddling Access for a long Parklands Floyds Fork route. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs, while route guidance adds The Oxbow, bridge landmarks, wood, and take-out discipline.",
      "accessCaveats": [
        "North Beckley is a KDFWR carry-down site in Beckley Creek Park with limited-hours shoreline access, unpaved parking, and no ramp surface.",
        "Seaton Valley is a KDFWR carry-down site in Turkey Run Park with shoreline access and no listed camping.",
        "The Parklands says Floyds Fork levels rise and fall quickly. Do not treat the gauge as a substitute for checking recent rain, gauge trend, and visible current at the launch.",
        "The current Fisherville gauge reading during this run sat below the official cfs and stage good-band floors, so expect more scraping and a slower day than the mileage alone suggests."
      ],
      "watchFor": [
        "Class I+ moving water with shallow riffles, braided chutes, and gravel bars that can require dragging at lower flows.",
        "Downed timber, strainers, woody cover, and blind bends around The Oxbow, Distillery Bend, and bridge pinch points.",
        "A long day commitment with fewer easy bailout options than the shorter Parklands segments.",
        "Faster current and fewer easy recovery spots once the creek pushes above the official good band.",
        "Water-quality and runoff concerns after heavy rain in the Louisville metro watershed."
      ]
    }
  },
  "floyds-fork-seaton-valley-broad-run-valley": {
    "putIn": {
      "id": "seaton-valley-paddling-access",
      "name": "Seaton Valley Paddling Access",
      "latitude": 38.1323,
      "longitude": -85.5191
    },
    "takeOut": {
      "id": "broad-run-valley-paddling-access",
      "name": "Broad Run Valley Paddling Access",
      "latitude": 38.1039,
      "longitude": -85.5455
    },
    "logistics": {
      "distanceLabel": "About 3.5 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Broad Run Valley Paddling Access, then drive back to Seaton Valley Paddling Access in Turkey Run Park. Walk both carry-downs before launching because the Parklands corridor uses marked landings instead of broad public beaches.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a lower-Parklands day trip. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at Seaton Valley Paddling Access and take out 3.5 miles downstream at Broad Run Valley Paddling Access for a scenic lower-Parklands Floyds Fork float. KDFWR documents the exact route and the same Fisherville gauge bands used upstream.",
      "accessCaveats": [
        "Seaton Valley is a KDFWR carry-down site in Turkey Run Park with year-round limited-hours shoreline access and no listed camping.",
        "Broad Run Valley is a KDFWR carry-down access with year-round limited-hours shoreline access and no listed camping.",
        "The Parklands instructs paddlers to use marked landings only and not to take out on private property.",
        "Floyds Fork rises and falls quickly after rain. Check the gauge trend, weather, and creek current before committing."
      ],
      "watchFor": [
        "Class I+ moving water, shallow bedrock rapids, and braid choices around islands and chutes.",
        "Strainers, fallen wood, and the mile-long Mary’s Island split where the KDFWR PDF says to stay left.",
        "Longer recovery swims and fewer easy eddies once the creek pushes above the official good band.",
        "Undercut banks, bluff-side current, and bedrock shelves through the lower Parklands section.",
        "Water-quality and runoff concerns after heavy rain in the Louisville metro watershed."
      ]
    }
  },
  "floyds-fork-seaton-valley-cliffside": {
    "putIn": {
      "id": "seaton-valley-paddling-access",
      "name": "Seaton Valley Paddling Access",
      "latitude": 38.1323,
      "longitude": -85.5191
    },
    "takeOut": {
      "id": "cliffside-paddling-access",
      "name": "Cliffside Paddling Access",
      "latitude": 38.0864,
      "longitude": -85.552
    },
    "logistics": {
      "distanceLabel": "About 6.0 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Cliffside Paddling Access in Broad Run Park, then drive back to Seaton Valley Paddling Access in Turkey Run Park. Walk both carry-downs before launching because the Parklands corridor uses marked landings instead of broad public beaches.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a lower-Parklands day trip. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at Seaton Valley Paddling Access and take out 6.0 miles downstream at Cliffside Paddling Access for a lower-Parklands Floyds Fork float. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs, while the lower-route guidance adds Mary's Island, bedrock shelves, wood, and marked-landings-only discipline.",
      "accessCaveats": [
        "Seaton Valley is a KDFWR carry-down site in Turkey Run Park with shoreline access and no listed camping.",
        "Cliffside is a KDFWR carry-down site in Broad Run Park with year-round limited-hours shoreline access and no listed camping.",
        "The Parklands says to use marked landings only and not to take out on private property.",
        "The current Fisherville gauge reading during this run sat below the official cfs and stage good-band floors, so expect more scraping and slower shoals than the mileage alone suggests."
      ],
      "watchFor": [
        "Class I+ moving water, shallow bedrock rapids, and braid choices around islands and chutes.",
        "Strainers, fallen wood, and the mile-long Mary's Island split where the KDFWR PDF says to stay left.",
        "Longer recovery swims and fewer easy eddies once the creek pushes above the official good band.",
        "Private-bank and managed-park boundary issues if you miss the designated take-out.",
        "Water-quality and runoff concerns after heavy rain in the Louisville metro watershed."
      ]
    }
  },
  "floyds-fork-broad-run-valley-cliffside": {
    "putIn": {
      "id": "broad-run-valley-paddling-access",
      "name": "Broad Run Valley Paddling Access",
      "latitude": 38.1039,
      "longitude": -85.5455
    },
    "takeOut": {
      "id": "cliffside-paddling-access",
      "name": "Cliffside Paddling Access",
      "latitude": 38.0864,
      "longitude": -85.552
    },
    "logistics": {
      "distanceLabel": "About 2.5 mi",
      "estimatedPaddleTime": "About 1.25 hr to 2.5 hr, longer with low water, scouting, or wood",
      "shuttle": "Stage the take-out at Cliffside Paddling Access in Broad Run Park, then drive back to Broad Run Valley Paddling Access. Walk the Cliffside carry-down before launching so the finish is obvious from the water.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a short lower-Floyds Fork day float. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at Broad Run Valley Paddling Access and take out 2.5 miles downstream at Cliffside Paddling Access for a short lower-Floyds Fork Parklands run. KDFWR documents the exact route and the same Fisherville gauge guidance used for the wider corridor.",
      "accessCaveats": [
        "Broad Run Valley is a KDFWR carry-down access with year-round limited-hours shoreline access and no listed camping.",
        "Cliffside is a KDFWR carry-down site in Broad Run Park with year-round limited-hours shoreline access and no listed camping.",
        "The Parklands says to use marked landings only and not to take out on private property.",
        "Floyds Fork rises and falls quickly after rain. Check trend, weather, and visible current before committing to this short but still moving-water run."
      ],
      "watchFor": [
        "Class I+ moving water, shallow shoals, and quick bends that become less forgiving as levels rise.",
        "Strainers, fallen wood, overhanging brush, and fresh storm debris.",
        "Faster current and fewer easy recovery spots once the corridor pushes above the official good band.",
        "Private-bank and managed-park boundary issues if you miss the designated take-out.",
        "Water-quality and runoff concerns after heavy rain in the Louisville metro watershed."
      ]
    }
  },
  "floyds-fork-north-beckley-fisherville": {
    "putIn": {
      "id": "north-beckley-canoe-access",
      "name": "North Beckley Canoe Access",
      "latitude": 38.2308,
      "longitude": -85.4682
    },
    "takeOut": {
      "id": "fisherville-canoe-access",
      "name": "Fisherville Canoe Access",
      "latitude": 38.1887,
      "longitude": -85.4779
    },
    "logistics": {
      "distanceLabel": "About 6.4 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Fisherville Canoe Access on Old Taylorsville Road, then drive back to North Beckley Canoe Access in Beckley Creek Park. Inspect the Fisherville landing before launching so the right-bank finish just below KY 155 is easy to spot.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a Parklands day trip. No camping plan is assumed between North Beckley and Fisherville, and banks away from public access areas should be treated as private or managed park land unless clearly posted otherwise.",
      "summary": "Launch at North Beckley Canoe Access and take out 6.4 miles downstream at Fisherville Canoe Access for a mid-length Parklands Floyds Fork float. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs, while route guidance adds Oxbow braid choices, bluff-lined current, and low-water shoal walking.",
      "accessCaveats": [
        "North Beckley is a KDFWR carry-down site in Beckley Creek Park with limited-hours shoreline access, unpaved parking, and no ramp surface.",
        "Fisherville is a KDFWR carry-down site off Old Taylorsville Road with unpaved parking and no listed amenities.",
        "The Parklands says Floyds Fork levels rise and fall quickly. Do not treat the gauge as a substitute for checking recent rain, gauge trend, and the creek at the launch.",
        "Use marked landings only and respect private property throughout the corridor. Do not assume gravel bars, side channels, or park banks outside the designated accesses are legal stopping points."
      ],
      "watchFor": [
        "Class I+ moving water with shallow riffles, braided chutes, and gravel bars that can require dragging at lower flows.",
        "Downed timber, strainers, woody cover, and blind bends around The Oxbow, Distillery Bend, and bridge pinch points.",
        "Bridge approaches at I-64, Beckley Creek Parkway, Echo Trail, the railroad trestle, Taylorsville Road, and KY 155.",
        "High water above the corridor good band, when current speeds up through bends and fewer beaches remain for recovery.",
        "Water-quality and runoff concerns after heavy rain in the Louisville metro watershed."
      ]
    }
  },
  "floyds-fork-north-beckley-broad-run-valley": {
    "putIn": {
      "id": "north-beckley-canoe-access",
      "name": "North Beckley Canoe Access",
      "latitude": 38.2308,
      "longitude": -85.4682
    },
    "takeOut": {
      "id": "broad-run-valley-paddling-access",
      "name": "Broad Run Valley Paddling Access",
      "latitude": 38.1039,
      "longitude": -85.5455
    },
    "logistics": {
      "distanceLabel": "About 17.2 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Broad Run Valley Paddling Access, then drive back to North Beckley Canoe Access in Beckley Creek Park. Inspect both carry-downs before launching because the Parklands corridor uses marked landings rather than broad public beaches.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a very long Parklands day trip. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at North Beckley Canoe Access and take out 17.2 miles downstream at Broad Run Valley Paddling Access for a near-full Parklands Floyds Fork float. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs, while the full-corridor route guidance adds The Oxbow, the Cane Run side-channel zone, Mary's Island, bedrock shelves, and marked-landings-only discipline.",
      "accessCaveats": [
        "North Beckley is a KDFWR carry-down site in Beckley Creek Park with limited-hours shoreline access, unpaved parking, and no ramp surface.",
        "Broad Run Valley is a KDFWR carry-down access with year-round limited-hours shoreline access and no listed camping.",
        "The Parklands says Floyds Fork levels rise and fall quickly. Do not treat the gauge as a substitute for checking recent rain, gauge trend, and visible current at the launch.",
        "The current Fisherville gauge reading during this run sat below the official cfs and stage good-band floors, so expect more scraping and a slower day than the mileage alone suggests."
      ],
      "watchFor": [
        "Class I+ moving water with shallow riffles, braided chutes, gravel bars, and long stretches where low water can force dragging.",
        "Downed timber, strainers, woody cover, and blind bends around The Oxbow, Distillery Bend, the Cane Run zone, and the lower Parklands bluffs.",
        "Bridge approaches at I-64, Beckley Creek Parkway, Echo Trail, the railroad trestle, Taylorsville Road, and the lower park roads.",
        "The mile-long Mary's Island split where the KDFWR PDF says to stay left, plus bedrock shelves and braid choices farther downstream.",
        "Water-quality and runoff concerns after heavy rain in the Louisville metro watershed."
      ]
    }
  },
  "floyds-fork-fisherville-broad-run-valley": {
    "putIn": {
      "id": "fisherville-canoe-access",
      "name": "Fisherville Canoe Access",
      "latitude": 38.1887,
      "longitude": -85.4779
    },
    "takeOut": {
      "id": "broad-run-valley-paddling-access",
      "name": "Broad Run Valley Paddling Access",
      "latitude": 38.1039,
      "longitude": -85.5455
    },
    "logistics": {
      "distanceLabel": "About 10.8 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Broad Run Valley Paddling Access, then drive back to Fisherville Canoe Access on Old Taylorsville Road. Inspect both carry-downs before launching because the Parklands corridor uses marked landings rather than broad public beaches.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a long Parklands day trip. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at Fisherville Canoe Access and take out 10.8 miles downstream at Broad Run Valley Paddling Access for a long lower-Parklands Floyds Fork float. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs, while the lower-route guidance adds Mary's Island, bedrock shelves, wood, and marked-landings-only discipline.",
      "accessCaveats": [
        "Fisherville is a KDFWR carry-down site off Old Taylorsville Road with unpaved parking and no listed amenities.",
        "Broad Run Valley is a KDFWR carry-down access with year-round limited-hours shoreline access and no listed camping.",
        "The Parklands instructs paddlers to use marked landings only and not to take out on private property.",
        "The current Fisherville gauge reading during this run sat just below the official cfs and stage good-band floors, so expect more scraping and slower shoals than the mileage alone suggests."
      ],
      "watchFor": [
        "Class I+ moving water with shallow gravel shoals, waves, and faster current through bends and bridge pinch points.",
        "The signed Cane Run side-channel area, followed by more pushy lower-corridor current into Turkey Run and Broad Run.",
        "Strainers, fallen wood, bluff-side current, and the mile-long Mary's Island split where the KDFWR PDF says to stay left.",
        "Longer recovery swims and fewer easy eddies once the creek pushes above the official good band.",
        "Water-quality and runoff concerns after storms in the Floyds Fork watershed."
      ]
    }
  },
  "floyds-fork-fisherville-cliffside": {
    "putIn": {
      "id": "fisherville-canoe-access",
      "name": "Fisherville Canoe Access",
      "latitude": 38.1887,
      "longitude": -85.4779
    },
    "takeOut": {
      "id": "cliffside-paddling-access",
      "name": "Cliffside Paddling Access",
      "latitude": 38.0864,
      "longitude": -85.552
    },
    "logistics": {
      "distanceLabel": "About 13.3 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Cliffside Paddling Access in Broad Run Park, then drive back to Fisherville Canoe Access on Old Taylorsville Road. Inspect both carry-downs before launching because the Parklands corridor uses marked landings instead of broad public beaches.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a long lower-Parklands day trip. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at Fisherville Canoe Access and take out 13.3 miles downstream at Cliffside Paddling Access for an extended lower-Parklands Floyds Fork float. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs, while the lower-route guidance adds the signed Cane Run side-channel area, Mary's Island, bedrock shelves, wood, and marked-landings-only discipline.",
      "accessCaveats": [
        "Fisherville is a KDFWR carry-down site off Old Taylorsville Road with unpaved parking and no listed amenities.",
        "Cliffside is a KDFWR carry-down site in Broad Run Park with year-round limited-hours shoreline access and no listed camping.",
        "The Parklands instructs paddlers to use marked landings only and not to take out on private property.",
        "The current Fisherville gauge reading during this run sat below the official cfs and stage good-band floors, so expect more scraping and slower shoals than the mileage alone suggests."
      ],
      "watchFor": [
        "Class I+ moving water with shallow gravel shoals, bedrock shelves, waves, and faster current through bends and bridge pinch points.",
        "The signed Cane Run side-channel area, followed by more pushy lower-corridor current into Turkey Run and Broad Run.",
        "Strainers, fallen wood, bluff-side current, and the mile-long Mary's Island split where the KDFWR PDF says to stay left.",
        "Longer recovery swims and fewer easy eddies once the creek pushes above the official good band.",
        "Water-quality and runoff concerns after storms in the Floyds Fork watershed."
      ]
    }
  },
  "floyds-fork-creekside-cliffside": {
    "putIn": {
      "id": "creekside-canoe-access",
      "name": "Creekside Canoe Access",
      "latitude": 38.2158,
      "longitude": -85.4778
    },
    "takeOut": {
      "id": "cliffside-paddling-access",
      "name": "Cliffside Paddling Access",
      "latitude": 38.0864,
      "longitude": -85.552
    },
    "logistics": {
      "distanceLabel": "About 17.6 mi",
      "estimatedPaddleTime": "About 7.5 hr to 10 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Cliffside Paddling Access in Broad Run Park, then drive back to Creekside Canoe Access. Inspect both carry-downs before launching because this near-full Parklands route depends on the designated landings rather than broad public beaches.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a full-day Parklands commitment, not an overnight route. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at Creekside Canoe Access and take out 17.6 miles downstream at Cliffside Paddling Access for a near-full public Parklands Floyds Fork route. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs, while the route guidance adds the Cane Run side-channel zone, Marys Island, bedrock shelves, wood, and marked-landings-only discipline.",
      "accessCaveats": [
        "Creekside is a KDFWR carry-down access near the Egg Lawn with no listed amenities beyond the access itself.",
        "Cliffside is a KDFWR carry-down site in Broad Run Park with year-round limited-hours shoreline access and no listed camping.",
        "The Parklands instructs paddlers to use marked landings only and not to take out on private property.",
        "The same-day Fisherville gauge reading during this run sat inside the official good band, but Floyds Fork still rises and falls quickly after rain."
      ],
      "watchFor": [
        "Class I+ moving water with shallow gravel shoals, bedrock shelves, waves, and long stretches where low water can force dragging.",
        "The signed Cane Run side-channel area, followed by more pushy lower-corridor current into Turkey Run and Broad Run.",
        "Strainers, fallen wood, bluff-side current, and the mile-long Mary's Island split where the KDFWR PDF says to stay left.",
        "Longer recovery swims and fewer easy eddies once the creek pushes above the official good band.",
        "Water-quality and runoff concerns after storms in the Floyds Fork watershed."
      ]
    }
  },
  "floyds-fork-cane-run-cliffside": {
    "putIn": {
      "id": "cane-run-canoe-access",
      "name": "Cane Run Canoe Access",
      "latitude": 38.1519,
      "longitude": -85.5026
    },
    "takeOut": {
      "id": "cliffside-paddling-access",
      "name": "Cliffside Paddling Access",
      "latitude": 38.0864,
      "longitude": -85.552
    },
    "logistics": {
      "distanceLabel": "About 9.1 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Cliffside Paddling Access in Broad Run Park, then drive back to Cane Run Canoe Access off Echo Trail. Walk both carry-downs before launching because the Parklands corridor uses marked landings instead of broad public beaches.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a long lower-Parklands day trip. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at Cane Run Canoe Access and take out 9.1 miles downstream at Cliffside Paddling Access for the full lower-Parklands Floyds Fork float. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs, while the lower-route guidance adds Mary's Island, bedrock shelves, wood, and marked-landings-only discipline.",
      "accessCaveats": [
        "Cane Run is a KDFWR carry-down site off Echo Trail with unpaved parking.",
        "Cliffside is a KDFWR carry-down site in Broad Run Park with year-round limited-hours shoreline access and no listed camping.",
        "The Parklands instructs paddlers to use marked landings only and not to take out on private property.",
        "The current Fisherville gauge reading during this run sat just below the official cfs and stage good-band floors, so expect more scraping and slower shoals than the mileage alone suggests."
      ],
      "watchFor": [
        "Class I+ moving water, shallow bedrock rapids, and braid choices around islands and chutes.",
        "Strainers, fallen wood, and the mile-long Mary's Island split where the KDFWR PDF says to stay left.",
        "Longer recovery swims and fewer easy eddies once the creek pushes above the official good band.",
        "Private-bank and managed-park boundary issues if you miss the designated take-out.",
        "Water-quality and runoff concerns after heavy rain in the Louisville metro watershed."
      ]
    }
  },
  "floyds-fork-north-beckley-cliffside": {
    "putIn": {
      "id": "north-beckley-canoe-access",
      "name": "North Beckley Canoe Access",
      "latitude": 38.2308,
      "longitude": -85.4682
    },
    "takeOut": {
      "id": "cliffside-paddling-access",
      "name": "Cliffside Paddling Access",
      "latitude": 38.0864,
      "longitude": -85.552
    },
    "logistics": {
      "distanceLabel": "About 19.7 mi",
      "estimatedPaddleTime": "About 8 hr to 11 hr, longer with low water, scouting, or fishing",
      "shuttle": "Stage the take-out at Cliffside Paddling Access in Broad Run Park, then drive back to North Beckley Canoe Access in Beckley Creek Park. Inspect both carry-downs before launching because this full-corridor route depends on the designated landings rather than broad public beaches.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public carry-down accesses, follow posted Parklands and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a full-day Parklands commitment, not an overnight route. KDFWR lists no camping at either access, and no legal on-route overnight plan was verified for this managed park corridor.",
      "summary": "Launch at North Beckley Canoe Access and take out 19.7 miles downstream at Cliffside Paddling Access for the full public Parklands Floyds Fork corridor. KDFWR gives a good Fisherville gauge band of 50 to 300 cfs, while the full-route guidance adds The Oxbow, Distillery Bend, the Cane Run side-channel zone, Mary's Island, bedrock shelves, and marked-landings-only discipline.",
      "accessCaveats": [
        "North Beckley is a KDFWR carry-down site in Beckley Creek Park with limited-hours shoreline access, unpaved parking, and no ramp surface.",
        "Cliffside is a KDFWR carry-down site in Broad Run Park with year-round limited-hours shoreline access and no listed camping.",
        "The Parklands says Floyds Fork levels rise and fall quickly. Do not treat the gauge as a substitute for checking recent rain, gauge trend, and visible current at the launch.",
        "The current Fisherville gauge reading during this run sat below the official cfs and stage good-band floors, so expect more scraping and a slower day than the mileage alone suggests."
      ],
      "watchFor": [
        "Class I+ moving water with shallow riffles, braided chutes, gravel bars, and long stretches where low water can force dragging.",
        "Downed timber, strainers, woody cover, and blind bends around The Oxbow, Distillery Bend, the Cane Run zone, and the lower Parklands bluffs.",
        "Bridge approaches at I-64, Beckley Creek Parkway, Echo Trail, the railroad trestle, Taylorsville Road, and the lower park roads.",
        "The mile-long Mary's Island split where the KDFWR PDF says to stay left, plus bedrock shelves and braid choices farther downstream.",
        "Fatigue, weather shifts, and water-quality/runoff concerns on a full-park corridor with few convenient early exits once you commit."
      ]
    }
  },
  "slate-creek-lions-club-old-slate-furnace": {
    "putIn": {
      "id": "lions-club-park",
      "name": "Lions Club Park carry-down access",
      "latitude": 38.1305,
      "longitude": -83.7665
    },
    "takeOut": {
      "id": "old-slate-furnace-park",
      "name": "Old Slate Furnace Park carry-down access",
      "latitude": 38.1148,
      "longitude": -83.7475
    },
    "logistics": {
      "distanceLabel": "3.7 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, longer with low water, fishing stops, or wood",
      "shuttle": "Stage the take-out at Old Slate Furnace Park on KY 36 south of Owingsville, then drive back to the Lions Club / Kendall Springs Road access. Inspect the launch first because KDFWR notes a low-head dam at Lions Club Park and the downstream launch line uses the access below the dam.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed carry-down accesses, follow posted park and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a short day trip. No camping plan is assumed between Lions Club Park and Old Slate Furnace Park, and banks away from public access areas should be treated as private unless clearly posted otherwise.",
      "summary": "Launch from the Lions Club Park carry-down access below the low-head-dam area and take out 3.7 miles downstream at Old Slate Furnace Park. KDFWR gives a good Slate Creek boating and fishing band of 100 to 200 cfs.",
      "accessCaveats": [
        "Lions Club Park sits by a low-head dam visible from the Kendall Springs Road bridge. Use the KDFWR-listed carry-down access below the dam and do not launch above the dam for this route.",
        "Old Slate Furnace Park is a KDFWR carry-down site with unpaved parking, picnic tables, and a historic furnace. Land at the park access rather than spreading onto nearby banks.",
        "KDFWR describes Slate Creek as shallow with abundant rock bars and water willow beds, so low water can turn this short float into a draggy creek walk.",
        "KDFWR notes limited hours or event restrictions at Lions Club Park. Check same-day park access before leaving a shuttle vehicle."
      ],
      "watchFor": [
        "Low-head-dam hydraulics and boils near Lions Club Park; stay below the dam for this segment and avoid fishing or scouting close to the structure.",
        "Low water below 100 cfs, when rock bars, shallow shoals, and dragging become likely.",
        "High water above 200 cfs, when KDFWR moves the creek out of the good band and current, wood, and landings deserve extra caution.",
        "Woody debris, strainers, stained water, and quick rain response on this small creek.",
        "Private-bank limits away from KDFWR access sites; use public parks and legal gravel-bar stops rather than climbing banks or yards."
      ]
    }
  },
  "levisa-fork-jubilee-island-creek": {
    "putIn": {
      "id": "jubilee-christian-church-ramp",
      "name": "Jubilee Christian Church Ramp",
      "latitude": 37.4445,
      "longitude": -82.5057
    },
    "takeOut": {
      "id": "island-creek-ramp",
      "name": "Island Creek Ramp",
      "latitude": 37.4646,
      "longitude": -82.5284
    },
    "logistics": {
      "distanceLabel": "About 3.8 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with low water, family stops, or fishing",
      "shuttle": "Stage the take-out at Island Creek Ramp behind the South Mayo Trail corridor, then drive back to Jubilee Christian Church Ramp south of Pikeville. Walk the Island Creek landing first so the right-bank take-out is obvious from the water.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any local parking or loading instructions.",
      "camping": "Treat this as an urban day float. KDFWR lists no camping at Jubilee Christian Church Ramp or Island Creek Ramp, and no legal overnight plan was verified for this Pikeville corridor.",
      "campingClassification": "none",
      "summary": "Launch at Jubilee Christian Church Ramp and take out 3.8 miles downstream at Island Creek Ramp for the upper Hatfield-McCoy River Trail float. KDFWR gives a good Pikeville gauge band of 800 to 1,400 cfs, or 7.4 to 8.5 ft.",
      "accessCaveats": [
        "KDFWR says parking near Jubilee is limited and that paddlers should ask permission before using the church paved lot.",
        "Island Creek is a carry-down access behind the South Mayo Trail commercial corridor with unpaved parking and no amenities.",
        "The current Pikeville gauge reading was below the official good discharge band during this run, though the stage was just above the official 7.4 ft floor. Expect slower current, shallower shoals, and more route-finding around exposed gravel or mussel-shell areas until levels rise further.",
        "Stay with the named public accesses and do not assume commercial lots or private banks along the corridor are general river-user parking or stopping points."
      ],
      "watchFor": [
        "Low water below 800 cfs or 7.4 ft, when shoals get shallower and dragging becomes more likely.",
        "High water above 1,400 cfs or 8.5 ft, when KDFWR moves the route out of the good band and swift current plus woody debris become much less forgiving.",
        "Mussel shells on the river bottom, woody debris, bridge-area current, and fishing traffic in the Pikeville corridor.",
        "Urban corridor hazards and private banks outside the documented ramps."
      ]
    }
  },
  "levisa-fork-island-creek-cedar-creek": {
    "putIn": {
      "id": "island-creek-ramp",
      "name": "Island Creek Ramp",
      "latitude": 37.4646,
      "longitude": -82.5284
    },
    "takeOut": {
      "id": "cedar-creek-canoe-access",
      "name": "Cedar Creek Canoe Access",
      "latitude": 37.4802,
      "longitude": -82.5446
    },
    "logistics": {
      "distanceLabel": "About 1.5 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low water, family stops, or fishing",
      "shuttle": "Stage the take-out at Cedar Creek Canoe Access under the KY 1384 bridge, then drive back to Island Creek Ramp behind the South Mayo Trail corridor. Walk the Cedar Creek landing first so the bridge-side take-out is obvious from the water.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any local parking or loading instructions.",
      "camping": "Treat this as an urban day float. KDFWR lists no camping at Island Creek Ramp or Cedar Creek Canoe Access, and no legal overnight plan was verified for this Pikeville corridor.",
      "campingClassification": "none",
      "summary": "Launch at Island Creek Ramp and take out about 1.5 miles downstream at Cedar Creek Canoe Access for a very short Pikeville Levisa Fork float. KDFWR gives a good Pikeville gauge band of 800 to 1,400 cfs, or 7.4 to 8.5 ft.",
      "accessCaveats": [
        "Island Creek is a carry-down access behind the South Mayo Trail commercial corridor with unpaved parking and no amenities.",
        "Cedar Creek is a carry-down access under the KY 1384 bridge with unpaved parking and no amenities.",
        "The current Pikeville gauge reading was below the official good discharge band during this run, though the stage just touched the official 7.4 ft floor. Expect slower current, shallower shoals, and more route-finding around exposed gravel or mussel-shell areas until levels rise further.",
        "Stay with the named public accesses and do not assume commercial lots or private banks along the corridor are general river-user parking or stopping points."
      ],
      "watchFor": [
        "Low water below 800 cfs or 7.4 ft, when shoals get shallower and dragging becomes more likely.",
        "High water above 1,400 cfs or 8.5 ft, when KDFWR moves the route out of the good band and swift current plus woody debris become much less forgiving.",
        "Mussel shells on the river bottom, woody debris, bridge-area current, and fishing traffic in the Pikeville corridor.",
        "Urban corridor hazards and private banks outside the documented ramps."
      ]
    }
  },
  "levisa-fork-cedar-creek-thompson-road": {
    "putIn": {
      "id": "cedar-creek-canoe-access",
      "name": "Cedar Creek Canoe Access",
      "latitude": 37.4802,
      "longitude": -82.5446
    },
    "takeOut": {
      "id": "thompson-road-canoe-access",
      "name": "Thompson Road Canoe Access",
      "latitude": 37.5096,
      "longitude": -82.5435
    },
    "logistics": {
      "distanceLabel": "3.0 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer with low water, wood, or a slow take-out",
      "shuttle": "Stage the take-out at Thompson Road behind the Texas Roadhouse / nearby business area, then drive back to Cedar Creek under the KY 1384 bridge. Inspect both ramps before launching because Cedar Creek is a carry-down site and Thompson Road is the required take-out before the lower access gap.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public access sites, follow posted city and KDFWR rules, and carry required Kentucky boating safety gear.",
      "camping": "Treat this as a short urban day trip. No camping plan is assumed between Cedar Creek and Thompson Road.",
      "summary": "Launch at Cedar Creek Canoe Access and take out three miles downstream at Thompson Road Canoe Access for the short Pikeville / Hatfield-McCoy River Trail segment through the Cut-Through corridor. KDFWR gives a good Pikeville gauge band of 800 to 1,400 cfs.",
      "accessCaveats": [
        "Cedar Creek is a KDFWR carry-down access under the KY 1384 bridge with unpaved parking and no amenities.",
        "Thompson Road is a KDFWR single-lane ramp with year-round availability, but land around the ramp is private or thickly vegetated; land at the signed access rather than spreading onto nearby banks.",
        "KDFWR notes bank and wade fishing are limited at these sites because surrounding land is private, steep, rocky, or heavily vegetated. Stay with the documented public ramps and do not assume private-bank stops are allowed.",
        "The app uses USGS 03209500 as the direct gauge. The official USGS inventory page was stale during review, so same-day live confirmation came from RiverApp text that says it imports this station from USGS Water Services."
      ],
      "watchFor": [
        "Woody debris, root wads, strainers, and bridge approaches, especially after storms or release changes.",
        "Low water below 800 cfs or 7.4 ft, when shallow shoals and dragging become more likely.",
        "High water above 1,400 cfs or 8.5 ft, when KDFWR moves the Pikeville reach out of the good band and swift current can make wood and landings dangerous.",
        "Fishtrap Lake release changes and Russell Fork inflow upstream; do not treat a stable-looking ramp as a substitute for checking the gauge trend.",
        "Private banks and urban corridor hazards; keep the trip to the named access points unless there is an emergency."
      ]
    }
  },
  "levisa-fork-jubilee-cedar-creek": {
    "putIn": {
      "id": "jubilee-christian-church-ramp",
      "name": "Jubilee Christian Church Ramp",
      "latitude": 37.4445,
      "longitude": -82.5057
    },
    "takeOut": {
      "id": "cedar-creek-canoe-access",
      "name": "Cedar Creek Canoe Access",
      "latitude": 37.4802,
      "longitude": -82.5446
    },
    "logistics": {
      "distanceLabel": "About 5.5 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low water, family stops, or fishing",
      "shuttle": "Stage the take-out at Cedar Creek Canoe Access under the KY 1384 bridge, then drive back to Jubilee Christian Church Ramp south of Pikeville. Walk the Cedar Creek landing first so the bridge-side take-out is obvious from the water.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect local parking or loading instructions at both ramps.",
      "camping": "Treat this as an urban day float. KDFWR lists no camping at Jubilee Christian Church Ramp or Cedar Creek Canoe Access, and no legal overnight plan was verified for this Pikeville corridor.",
      "campingClassification": "none",
      "summary": "Launch at Jubilee Christian Church Ramp and take out 5.5 miles downstream at Cedar Creek Canoe Access for the longer upper Pikeville Levisa Fork float. KDFWR gives a good Pikeville gauge band of 800 to 1,400 cfs, or 7.4 to 8.5 ft.",
      "accessCaveats": [
        "KDFWR says parking near Jubilee is limited and that paddlers should ask permission before using the church paved lot.",
        "Cedar Creek is a carry-down access under the KY 1384 bridge with unpaved parking and no amenities.",
        "The current Pikeville gauge reading was below the official good discharge band during this run, though the stage just touched the official 7.4 ft floor. Expect slower current, shallower shoals, and more route-finding around exposed gravel or mussel-shell areas until levels rise further.",
        "Stay with the named public accesses and do not assume commercial lots or private banks along the corridor are general river-user parking or stopping points."
      ],
      "watchFor": [
        "Low water below 800 cfs or 7.4 ft, when shoals get shallower and dragging becomes more likely.",
        "High water above 1,400 cfs or 8.5 ft, when KDFWR moves the route out of the good band and swift current plus woody debris become much less forgiving.",
        "Mussel shells on the river bottom, woody debris, bridge-area current, and fishing traffic in the Pikeville corridor.",
        "Urban corridor hazards, private banks, and a slower finish through the Cut-Through approach if the river is scrape-prone."
      ]
    }
  },
  "levisa-fork-island-creek-thompson-road": {
    "putIn": {
      "id": "island-creek-ramp",
      "name": "Island Creek Ramp",
      "latitude": 37.4646,
      "longitude": -82.5284
    },
    "takeOut": {
      "id": "thompson-road-canoe-access",
      "name": "Thompson Road Canoe Access",
      "latitude": 37.5096,
      "longitude": -82.5435
    },
    "logistics": {
      "distanceLabel": "About 4.5 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with low water, wood, or a slower take-out",
      "shuttle": "Stage the take-out at Thompson Road behind the Texas Roadhouse / nearby business area, then drive back to Island Creek Ramp behind the South Mayo Trail corridor. Inspect both accesses before launching because the lower ramp is the required finish.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect local parking or loading instructions at both ramps.",
      "camping": "Treat this as an urban day float. KDFWR lists no camping at Island Creek Ramp or Thompson Road Canoe Access, and no legal overnight plan was verified for this Pikeville corridor.",
      "campingClassification": "none",
      "summary": "Launch at Island Creek Ramp and take out 4.5 miles downstream at Thompson Road Canoe Access for the longer Pikeville Cut-Through continuation. KDFWR keeps the same good Pikeville gauge band of 800 to 1,400 cfs, or 7.4 to 8.5 ft.",
      "accessCaveats": [
        "Island Creek is a carry-down access behind the South Mayo Trail commercial corridor with unpaved parking and no amenities.",
        "Thompson Road is a KDFWR single-lane ramp with year-round availability, but nearby banks are private or thickly vegetated; land at the signed access rather than spreading onto nearby banks.",
        "The current Pikeville gauge reading was below the official good discharge band during this run, though the stage just touched the official 7.4 ft floor. Expect slower current, shallower shoals, and more route-finding around exposed gravel or mussel-shell areas until levels rise further.",
        "KDFWR limits bank and wade fishing at these sites because surrounding land is private, steep, rocky, or heavily vegetated. Stay with the documented public ramps."
      ],
      "watchFor": [
        "Low water below 800 cfs or 7.4 ft, when shoals get shallower and dragging becomes more likely.",
        "High water above 1,400 cfs or 8.5 ft, when KDFWR moves the route out of the good band and swift current plus woody debris become much less forgiving.",
        "Mussel shells on the river bottom, woody debris, bridge-area current, and fishing traffic in the Pikeville corridor.",
        "Urban corridor hazards, private banks, and complacency near the busy Thompson Road finish after a longer easy-looking float."
      ]
    }
  },
  "levisa-fork-jubilee-thompson-road": {
    "putIn": {
      "id": "jubilee-christian-church-ramp",
      "name": "Jubilee Christian Church Ramp",
      "latitude": 37.4445,
      "longitude": -82.5057
    },
    "takeOut": {
      "id": "thompson-road-canoe-access",
      "name": "Thompson Road Canoe Access",
      "latitude": 37.5096,
      "longitude": -82.5435
    },
    "logistics": {
      "distanceLabel": "About 8.5 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr, longer with low water, family pacing, or fishing",
      "shuttle": "Stage the take-out at Thompson Road behind the Texas Roadhouse / nearby business area, then drive back to Jubilee Christian Church Ramp south of Pikeville. Inspect both landings before launching because this is the longest Pikeville Levisa route in the chain and the lower finish is easy to underscout.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect local parking or loading instructions at both ramps.",
      "camping": "Treat this as an urban day float. KDFWR lists no camping at Jubilee Christian Church Ramp or Thompson Road Canoe Access, and no legal overnight plan was verified for this Pikeville corridor.",
      "campingClassification": "none",
      "summary": "Launch at Jubilee Christian Church Ramp and take out about 8.5 miles downstream at Thompson Road Canoe Access for the full Pikeville Hatfield-McCoy River Trail day. KDFWR keeps the same good Pikeville gauge band of 800 to 1,400 cfs, or 7.4 to 8.5 ft.",
      "accessCaveats": [
        "KDFWR says parking near Jubilee is limited and that paddlers should ask permission before using the church paved lot.",
        "Thompson Road is a KDFWR single-lane ramp with year-round availability and a larger parking area, but the surrounding banks remain private or heavily vegetated.",
        "The current Pikeville gauge reading was below the official good band during this run. Expect slower current, shallower shoals, and a longer day than the mileage suggests until levels rise.",
        "Stay with the named public accesses and do not assume commercial lots or private banks along the corridor are general river-user parking or stopping points."
      ],
      "watchFor": [
        "Low water below 800 cfs or 7.4 ft, when shoals get shallower and dragging can stack up over the course of a longer day.",
        "High water above 1,400 cfs or 8.5 ft, when KDFWR moves the route out of the good band and swift current plus woody debris become much less forgiving.",
        "Mussel shells on the river bottom, woody debris, bridge-area current, and fishing traffic in the Pikeville corridor.",
        "Fatigue, private-bank limits, and urban corridor distractions near the Thompson Road finish after a full Pikeville float."
      ]
    },
    "accessPoints": [
      {
        "id": "jubilee-christian-church-ramp",
        "name": "Jubilee Christian Church Ramp",
        "latitude": 37.4445,
        "longitude": -82.5057,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access for the full Pikeville corridor."
      },
      {
        "id": "island-creek-ramp",
        "name": "Island Creek Ramp",
        "latitude": 37.47,
        "longitude": -82.5144,
        "mileFromStart": 3,
        "segmentKind": "creek",
        "note": "Intermediate public access for the shorter Jubilee-to-Island or Island-to-Thompson planning split."
      },
      {
        "id": "cedar-creek-canoe-access",
        "name": "Cedar Creek Canoe Access",
        "latitude": 37.4869,
        "longitude": -82.5313,
        "mileFromStart": 5.5,
        "segmentKind": "creek",
        "note": "Official mid-route access where the shorter Cedar-to-Thompson baseline route begins."
      },
      {
        "id": "thompson-road-canoe-access",
        "name": "Thompson Road Canoe Access",
        "latitude": 37.5096,
        "longitude": -82.5435,
        "mileFromStart": 8.5,
        "segmentKind": "creek",
        "note": "Default downstream access for the full Pikeville corridor."
      }
    ]
  },
  "levisa-fork-prestonsburg-airport": {
    "putIn": {
      "id": "prestonsburg-ramp",
      "name": "Prestonsburg Ramp",
      "latitude": 37.6663,
      "longitude": -82.7759
    },
    "takeOut": {
      "id": "airport-ramp",
      "name": "Airport Ramp",
      "latitude": 37.7427,
      "longitude": -82.7702
    },
    "logistics": {
      "distanceLabel": "About 8.2 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with low water, fishing, or upstream wind",
      "shuttle": "Stage the Airport Ramp vehicle first, then drive back to Prestonsburg Ramp at River Park. Inspect both ramps before launching because lower-river mud lines, park traffic, or bridge-area changes can affect how easy the landings feel on a given day.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public ramps, follow Kentucky boating and PFD rules, and obey any posted local parking or launch restrictions at Prestonsburg and Airport.",
      "camping": "Treat this as a day float. Current KDFWR access pages do not document route camping or campground support at Prestonsburg Ramp or Airport Ramp.",
      "campingClassification": "none",
      "summary": "Launch at Prestonsburg Ramp and take out about 8.2 miles downstream at Airport Ramp for the first lower-Levisa segment. KDFWR uses the Prestonsburg gauge here and rates 800 to 1,500 cfs, or 3.5 to 5.0 ft, as the good boating band.",
      "accessCaveats": [
        "Prestonsburg Ramp is a paved public River Park launch with year-round availability, but it sits in an active town setting. Scout parking and ramp traffic before committing to the shuttle.",
        "Airport Ramp is the downstream public KDFWR take-out near the Paintsville-Prestonsburg-Combs Air Field. Stay with the signed ramp and parking area rather than informal banks.",
        "The current Prestonsburg gauge reading was below the official good band during this run. Expect slower pools, shallower shoals, and more patience than the broad-river appearance suggests until levels rise.",
        "KDFWR does not document an overnight plan at either endpoint, so do not assume camping or private-bank stopping rights along the corridor."
      ],
      "watchFor": [
        "Low water below 800 cfs or 3.5 ft, when shoals and gravel bars slow progress and can force dragging.",
        "High water above 1,500 cfs or 5.0 ft, when KDFWR moves the route out of the good band and the broader mainstem current gets much less forgiving.",
        "Woody debris, bridge current, motorboat or fishing traffic, and long exposed pools on warm days.",
        "Private banks and limited easy exits away from the documented public ramps."
      ]
    }
  },
  "levisa-fork-airport-boat-ramp": {
    "putIn": {
      "id": "airport-ramp",
      "name": "Airport Ramp",
      "latitude": 37.7427,
      "longitude": -82.7702
    },
    "takeOut": {
      "id": "levisa-fork-boat-ramp",
      "name": "Levisa Fork Boat Ramp",
      "latitude": 37.8141,
      "longitude": -82.7913
    },
    "logistics": {
      "distanceLabel": "About 8.1 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with low water, fishing, or downstream headwinds",
      "shuttle": "Stage the Levisa Fork Boat Ramp vehicle first, then drive back to Airport Ramp. Inspect both landings before launching because the lower river can expose mud, drift, or changed shoreline angles as levels move around.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public ramps, follow Kentucky boating and PFD rules, and obey any posted launch or parking restrictions at Airport Ramp and Levisa Fork Boat Ramp.",
      "camping": "Treat this as a day float. Current KDFWR access pages do not document route camping, and no campground-backed overnight plan was verified for Airport Ramp or Levisa Fork Boat Ramp.",
      "campingClassification": "none",
      "summary": "Launch at Airport Ramp and take out about 8.1 miles downstream at Levisa Fork Boat Ramp near Paintsville. KDFWR still uses the Prestonsburg gauge here and rates 800 to 1,500 cfs, or 3.5 to 5.0 ft, as the good boating band.",
      "accessCaveats": [
        "Airport Ramp is a paved public launch with unpaved parking and no camping listed. Inspect the lot and shoreline before leaving vehicles.",
        "Levisa Fork Boat Ramp is a paved public Paintsville-area take-out with nearby town services, but KDFWR does not document it as a campground or overnight paddle endpoint.",
        "The current Prestonsburg gauge reading was below the official good band during this run. Expect slower current, shallower shoals, and more dragging than the wider lower-river profile might suggest.",
        "Stay with the named public accesses and do not assume open stopping rights on private banks or side properties along the corridor."
      ],
      "watchFor": [
        "Low water below 800 cfs or 3.5 ft, when broad shoals, gravel, and slow pools can stretch the day.",
        "High water above 1,500 cfs or 5.0 ft, when KDFWR moves the route out of the good band and the larger river becomes pushier around bends, wood, and bridge structures.",
        "Woody debris, fishing traffic, occasional motorboat wakes, and heat or wind exposure on the wider lower river.",
        "Longer spacing between easy public exits than the developed ramps might suggest."
      ]
    }
  },
  "levisa-fork-prestonsburg-boat-ramp": {
    "putIn": {
      "id": "prestonsburg-ramp",
      "name": "Prestonsburg Ramp",
      "latitude": 37.6663,
      "longitude": -82.7759
    },
    "takeOut": {
      "id": "levisa-fork-boat-ramp",
      "name": "Levisa Fork Boat Ramp",
      "latitude": 37.8141,
      "longitude": -82.7913
    },
    "logistics": {
      "distanceLabel": "About 16.3 mi",
      "estimatedPaddleTime": "About 6 hr to 9 hr, longer with low water, fishing, or warm-weather breaks",
      "shuttle": "Stage the Levisa Fork Boat Ramp vehicle first, then drive back to Prestonsburg Ramp at River Park. This is the full lower-Levisa commitment, so inspect both endpoints, check the gauge trend and weather, and make sure the group is ready for a long day before leaving vehicles.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public ramps, follow Kentucky boating and PFD rules, and obey any posted local parking or launch restrictions at Prestonsburg, Airport, and Levisa Fork Boat Ramp.",
      "camping": "Treat this as a committed day float. Current KDFWR access pages do not document route camping or campground support at the three linked lower-Levisa public ramps.",
      "campingClassification": "none",
      "summary": "Launch at Prestonsburg Ramp and take out about 16.3 miles downstream at Levisa Fork Boat Ramp for the full lower-Levisa continuation. KDFWR still uses the Prestonsburg gauge and rates 800 to 1,500 cfs, or 3.5 to 5.0 ft, as the good boating band.",
      "accessCaveats": [
        "Prestonsburg Ramp and Levisa Fork Boat Ramp are both developed public launches, but this longer route still has only one clean intermediate public ramp at Airport if the day is going slower than planned.",
        "The current Prestonsburg gauge reading was below the official good band during this run. Expect a slower and more tiring day than the mileage alone suggests until levels rise into band.",
        "KDFWR does not document a route-camping plan for these lower-Levisa accesses. Do not assume legal private-bank overnight stops along the corridor.",
        "This is a full-day lower-river shuttle rather than a casual town float. Check weather, daylight, and heat exposure before committing."
      ],
      "watchFor": [
        "Low water below 800 cfs or 3.5 ft, when the long route can stack up dragging, shallow shoals, and slow pool mileage.",
        "High water above 1,500 cfs or 5.0 ft, when KDFWR moves the route out of the good band and the broader river current becomes much less forgiving over a full-day commitment.",
        "Woody debris, bridge current, occasional motorboat or fishing traffic, and fatigue on a long warmwater mainstem day.",
        "Private banks, limited informal exits, and complacency on the middle or lower half because the water is nontechnical."
      ]
    }
  },
  "elkhorn-creek-vpa-3-aw-access": {
    "putIn": {
      "id": "elkhorn-creek-vpa-3",
      "name": "Elkhorn Creek VPA #3",
      "latitude": 38.2517,
      "longitude": -84.8158
    },
    "takeOut": {
      "id": "american-whitewater-elkhorn-acres",
      "name": "American Whitewater / Elkhorn Acres Access",
      "latitude": 38.2676,
      "longitude": -84.8155
    },
    "logistics": {
      "distanceLabel": "2.6 mi",
      "estimatedPaddleTime": "Short run; allow extra time for scouting, traffic, and access carries",
      "shuttle": "Stage the take-out at the American Whitewater / Elkhorn Acres access downstream of Knight's Bridge, then drive back to Elkhorn Creek VPA #3 on KY 1900 / Peaks Mill Road. Both lots are small and unpaved, so keep the shuttle tight and avoid blocking signs, drives, or local traffic.",
      "permits": "No route-specific paddling permit is known, but this route depends on posted access rules. VPA #3 is private land open through KDFWR Voluntary Public Access rules, and the American Whitewater access is for boating access, not general bank use.",
      "camping": "No camping plan is assumed. VPA #3 rules prohibit camping, fires, alcohol, swimming, littering, ATVs, firearm discharge, and commercial use; treat this as a daylight-only day run.",
      "summary": "Launch at KDFWR Elkhorn Creek VPA #3 and take out 2.6 miles downstream at the American Whitewater / Elkhorn Acres access. KDFWR gives a good boating band of 100 to 600 cfs at the Frankfort gauge, while American Whitewater frames the gorge as Class II with occasional Class III features.",
      "accessCaveats": [
        "Elkhorn Creek VPA #3 is private property opened through KDFWR; continuing access depends on users following posted rules, daylight-hours limits, and boundary markers.",
        "The American Whitewater / Elkhorn Acres take-out is a carry-down boating access with no bank or wade fishing; use the signed parking and do not spread onto neighboring private land.",
        "KDFWR lists some nearby Elkhorn access sites as bank/wade-only with boats prohibited. Use only the named VPA #3 and American Whitewater access pair for this route.",
        "The current app uses USGS 03289500 as the direct gauge. The local workspace could not fetch USGS Water Services during review, so same-day live confirmation came from RiverApp text that says it imports USGS Water Services data."
      ],
      "watchFor": [
        "Class II ledges, wave trains, pushy bends, and occasional Class III moves in the Elkhorn Gorge.",
        "Fast rises after rain, fresh wood, strainers, and limited eddies along private banks.",
        "Low water below 100 cfs or 2.5 ft, when scraping and pinning risk increase.",
        "High water above 600 cfs or 4.0 ft, when KDFWR moves the creek out of the good band and casual paddling judgment is not enough.",
        "Respect private-bank boundaries and ordinary access limits; do not scout, picnic, or exit on private land away from documented access points unless there is an emergency."
      ]
    }
  },
  "big-south-fork-blue-heron-yamacraw": {
    "putIn": {
      "id": "blue-heron-canoe-ramp",
      "name": "Blue Heron Canoe Ramp",
      "latitude": 36.6683,
      "longitude": -84.5474
    },
    "takeOut": {
      "id": "yamacraw-access",
      "name": "Yamacraw",
      "latitude": 36.7255,
      "longitude": -84.5446
    },
    "logistics": {
      "distanceLabel": "About 5.0 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with fishing stops, low water, or extra scouting",
      "shuttle": "Stage the Yamacraw take-out first, then drive back to Blue Heron via KY 92 and the signed Blue Heron mine-road corridor. Inspect both accesses before launching because the gorge roads are rural and the bridge-area parking layouts can change with storms or maintenance.",
      "permits": "No route-specific private paddling permit is known for this normal Big South Fork day float. Follow KDFWR and NPS rules, carry required safety gear and PFDs, check current park alerts, and obey any posted access or parking restrictions at Blue Heron and Yamacraw.",
      "camping": "Blue Heron and Alum Ford campgrounds can support an endpoint campground plan, but this route is normally a half-day float. Treat camping as a separate NPS campground decision rather than an assumed part of the paddle.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Blue Heron and take out at Yamacraw for the gentler 5-mile Big South Fork float below Devil's Jump. Use the Stearns gauge as a direct official flow check and stand down when storms or rising water push the river out of the lower bands.",
      "accessCaveats": [
        "Blue Heron is the correct put-in for the easier family float. Do not continue upstream into the Devil's Jump / wilderness section unless your group has a separate advanced whitewater plan.",
        "Yamacraw is the downstream bridge access on KY 92. Inspect the ramp and parking before committing because bridge-area mud, cleanup, or local traffic can change the landing.",
        "The route lies in a publicly managed NPS corridor, but same-day closures, storm damage, or event traffic can still affect access. Check park alerts before leaving vehicles."
      ],
      "watchFor": [
        "Fast rises after rain in the Clear Fork and New River headwaters, even if the local sky looks better at launch time.",
        "Woody debris, boulder shoals, pushier current above 500 cfs, and more serious rescue consequences once the river climbs past the family band.",
        "Dragging or scraping below 100 cfs, especially across shallow riffles and shoals.",
        "Cold-water exposure, limited cell service, remote-gorge shuttle timing, and the temptation to drift upstream or scout too close to the Devil's Jump section."
      ]
    }
  },
  "big-south-fork-blue-heron-worley": {
    "putIn": {
      "id": "blue-heron-canoe-ramp",
      "name": "Blue Heron Canoe Ramp",
      "latitude": 36.6683,
      "longitude": -84.5474
    },
    "takeOut": {
      "id": "worley-canoe-access",
      "name": "Worley Canoe Access",
      "latitude": 36.6982,
      "longitude": -84.5374
    },
    "logistics": {
      "distanceLabel": "About 2.5 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low water, fishing stops, or extra scouting",
      "shuttle": "Stage the Worley take-out first, then drive back to Blue Heron through Stearns and the mine-road corridor. Inspect Worley before launching because the final gravel road is rougher, narrower, and less forgiving than the developed Blue Heron put-in.",
      "permits": "No route-specific private paddling permit is known for this normal Big South Fork day float. Follow KDFWR and NPS rules, carry required safety gear and PFDs, check current park alerts, and obey any posted access or parking restrictions at Blue Heron and Worley.",
      "camping": "Blue Heron Campground can support an endpoint campground plan, but this is normally the shortest half-day Big South Fork option. Treat camping as a separate NPS campground decision rather than part of the float itself.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Blue Heron and take out at Worley for the shortest KDFWR-documented Big South Fork family float. Use the Stearns gauge as a direct official flow check and stand down when storms or rising water push the river out of the lower bands.",
      "accessCaveats": [
        "Blue Heron is the correct put-in for the easier lower corridor. Do not continue upstream into the Devil's Jump / wilderness section unless your group has a separate advanced whitewater plan.",
        "Worley is a carry-down access at the end of a rough gravel road. Inspect the road, shoulder, and shoreline landing before committing because two-wheel-drive comfort can change with washouts or mud.",
        "The route lies in a publicly managed NPS corridor, but same-day closures, storm damage, or event traffic can still affect access. Check park alerts before leaving vehicles."
      ],
      "watchFor": [
        "Fast rises after rain in the Clear Fork and New River headwaters, even if conditions look calm at Blue Heron.",
        "Woody debris, boulder shoals, pushier current above 500 cfs, and more serious rescue consequences once the river climbs past the family band.",
        "Dragging or scraping below 100 cfs, especially across shallow riffles and near Worley.",
        "Cold-water exposure, limited cell service, remote-gorge shuttle timing, and steep or private banks away from the named accesses."
      ]
    }
  },
  "big-south-fork-yamacraw-alum-ford": {
    "putIn": {
      "id": "yamacraw-access",
      "name": "Yamacraw",
      "latitude": 36.7255,
      "longitude": -84.5446
    },
    "takeOut": {
      "id": "alum-ford",
      "name": "Alum Ford",
      "latitude": 36.7639,
      "longitude": -84.5471
    },
    "logistics": {
      "distanceLabel": "About 8.0 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr, longer with low water, fishing stops, or lake-headwater wind",
      "shuttle": "Stage the Alum Ford take-out first, then drive back to Yamacraw on KY 92. Inspect both ramps before launching because lower-river mud, lake-level changes, or vehicle traffic can change how easy the landings feel on a given day.",
      "permits": "No route-specific private paddling permit is known for this normal Big South Fork day float. Follow KDFWR and NPS rules, carry required safety gear and PFDs, check current park alerts, and obey any posted access or parking restrictions at Yamacraw and Alum Ford.",
      "camping": "Alum Ford Campground sits beside the take-out and works as an endpoint campground plan. Treat that campground as a separate NPS reservation decision rather than assuming overnight use is built into the paddle.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Yamacraw and take out at Alum Ford for the easier lower Big South Fork float into the headwaters of Lake Cumberland. Use the Stearns gauge as a direct official flow check and expect a flatter, more open finish than the upstream Blue Heron split.",
      "accessCaveats": [
        "Yamacraw is the upstream bridge-area access on KY 92. Inspect the ramp and parking before committing because mud, cleanup work, or traffic can change the landing.",
        "Alum Ford is a paved NPS/KDFWR ramp beside the campground, but the route finishes in a more lake-influenced section where motorboats and changing lake levels can affect the feel of the final miles.",
        "The route lies in a publicly managed NPS corridor, but same-day closures, storm damage, or campground traffic can still affect access. Check park alerts before leaving vehicles."
      ],
      "watchFor": [
        "Fast rises after rain in the Clear Fork and New River headwaters, even if the lower section looks gentler or lake-like.",
        "Dragging or scraping below 100 cfs, especially on shoals before the route slows into the lower pool-like miles.",
        "Motorboats, wind, exposed sun, and slower-than-expected progress in the headwaters of Lake Cumberland.",
        "Woody debris, private banks outside the named accesses, and limited cell coverage in the gorge corridor."
      ]
    }
  },
  "big-south-fork-blue-heron-alum-ford": {
    "putIn": {
      "id": "blue-heron-canoe-ramp",
      "name": "Blue Heron Canoe Ramp",
      "latitude": 36.6683,
      "longitude": -84.5474
    },
    "takeOut": {
      "id": "alum-ford",
      "name": "Alum Ford",
      "latitude": 36.7639,
      "longitude": -84.5471
    },
    "logistics": {
      "distanceLabel": "About 12.2 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with low water, fishing stops, or wind on the lower miles",
      "shuttle": "Stage the Alum Ford take-out first, then drive back to Blue Heron through Stearns. This is a longer commitment than the shorter Big South Fork family splits, so inspect both endpoints, check weather and gauge trend, and make sure the group is comfortable with a full lower-river day before leaving vehicles.",
      "permits": "No route-specific private paddling permit is known for this normal Big South Fork day float. Follow KDFWR and NPS rules, carry required safety gear and PFDs, check current park alerts, and obey any posted access or parking restrictions at Blue Heron and Alum Ford.",
      "camping": "Blue Heron and Alum Ford campgrounds can support an endpoint campground plan, but this route is still a long single-day float rather than an implied overnight run. Treat camping as a separate NPS reservation or backcountry-permit decision.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Blue Heron and take out at Alum Ford for the full easier Big South Fork day below Devil's Jump. Use the Stearns gauge as a direct official flow check and expect the lower half to flatten toward Lake Cumberland compared with the upstream Blue Heron-to-Yamacraw section.",
      "accessCaveats": [
        "Blue Heron is the correct put-in for the easier lower corridor. Do not continue upstream into the Devil's Jump / wilderness section unless your group has a separate advanced whitewater plan.",
        "Alum Ford is the planned downstream finish beside the campground and paved boat launch. Identify the take-out plan before launching because the lower headwaters section feels broader and slower than the upper part of the route.",
        "The route lies in a publicly managed NPS corridor, but same-day closures, storm damage, or campground traffic can still affect access. Check park alerts before leaving vehicles."
      ],
      "watchFor": [
        "Fast rises after rain in the Clear Fork and New River headwaters, even if only the lower Kentucky section is on the plan.",
        "Woody debris, boulder shoals, pushier current above 500 cfs, and more serious rescue consequences once the river climbs past the family band.",
        "Dragging or scraping below 100 cfs in the upper miles, followed by slower pace, wind, and occasional motorboats in the lower lake-headwater section.",
        "Cold-water exposure, limited cell service, fatigue on the long day, and steep or private banks away from the named public accesses."
      ]
    }
  },
  "north-fork-kentucky-river-watts-hazard-city-ramp": {
    "putIn": {
      "id": "watts-ramp",
      "name": "Watts Ramp",
      "latitude": 37.1283,
      "longitude": -83.0519
    },
    "takeOut": {
      "id": "hazard-city-ramp",
      "name": "Hazard City Ramp and Fishing Pier",
      "latitude": 37.2513,
      "longitude": -83.1962
    },
    "logistics": {
      "distanceLabel": "About 22.2 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr, longer with low water, wood scouting, or fishing stops",
      "shuttle": "Long Perry County shuttle from Ulvah back to downtown Hazard. Stage the Hazard City finish first because the take-out sits directly upstream from a low-head dam and should already be identified before anyone launches from Watts.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public launches, follow Kentucky boating and PFD rules, and respect any posted city, bridge-access, or parking limits.",
      "camping": "Treat this as a committed day trip. No public riverside camping is documented on the route, and most banks away from the named accesses should be treated as private or unsuitable for an overnight stop.",
      "campingClassification": "none",
      "summary": "Launch at Watts Ramp and finish 22.2 miles downstream at Hazard City Ramp for the full upper-Hazard North Fork day. KDFWR gives the Hazard gauge a good band of 4.25 to 5.0 ft and describes this reach as a shallow-riffle float that becomes serious mainly because of the mileage and dam-adjacent finish.",
      "accessCaveats": [
        "Watts is a paved bridge-side launch with unpaved parking rather than a fully serviced park ramp, so inspect footing and vehicle placement before committing to the shuttle.",
        "Hazard City Ramp is the planned take-out directly upstream from a low-head dam. Know the landing, exit left cleanly, and do not drift below the city ramp while regrouping.",
        "The Hazard gauge read slightly below the official band during this run, so expect slower current and more scrape-prone riffles than the ideal KDFWR day."
      ],
      "watchFor": [
        "Shallow riffles and dragging once the Hazard stage falls below 4.25 ft.",
        "Fast rain-driven rises, muddy current, and fresh wood or strainers moving into outside bends.",
        "Fatigue, sparse developed exits, and the mandatory low-head-dam-aware finish in Hazard."
      ]
    }
  },
  "north-fork-kentucky-river-hazard-city-ramp-perry-county-park": {
    "putIn": {
      "id": "hazard-city-ramp",
      "name": "Hazard City Ramp and Fishing Pier",
      "latitude": 37.2513,
      "longitude": -83.1962
    },
    "takeOut": {
      "id": "perry-county-park-ramp",
      "name": "Perry County Park Ramp",
      "latitude": 37.2783,
      "longitude": -83.2088
    },
    "logistics": {
      "distanceLabel": "About 4.8 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with low water, fishing stops, or access checks",
      "shuttle": "Stage the Perry County Park take-out first, then drive back to Hazard City Hall for the downtown put-in. Both accesses are public and developed, but inspect the launch and landing before committing because riverfront events, maintenance, or muddy conditions can tighten room at the ramp.",
      "permits": "No route-specific paddling permit is known. Use the named public launches, follow Kentucky boating and PFD rules, and respect any posted city or park parking limits.",
      "camping": "No camping plan is assumed on this in-town float. Use it as a day trip and treat banks outside the public access points as private or unsuitable for overnight use.",
      "campingClassification": "none",
      "summary": "Launch behind Hazard City Hall and take out at Perry County Park for the short North Fork River Trail float through Hazard. KDFWR gives a good Hazard gauge band of 4.25 to 5.0 ft, while Perry County frames the route as an easy 2-to-3-hour paddle.",
      "accessCaveats": [
        "The Hazard City launch is directly upstream from a low-head dam. Launch efficiently, stay out of boil-affected water, and do not drift back toward the dam while organizing gear.",
        "Perry County Park is the clean public take-out with parking, restrooms, and family facilities. Do not assume steep or private banks elsewhere are legal exit spots.",
        "The Hazard gauge was slightly below the official good band during this run, so expect slower current and occasional scrape-prone shallows rather than ideal push."
      ],
      "watchFor": [
        "Fast rises after rain, muddy current, and fresh wood moving into outside bends.",
        "The low-head-dam launch context at Hazard and any swirl or boil near the ramp.",
        "Steep or private banks outside the named accesses, especially if someone wants an unscheduled stop."
      ]
    }
  },
  "north-fork-kentucky-river-douthitt-park-roy-spencer": {
    "putIn": {
      "id": "douthitt-park-ramp",
      "name": "Douthitt Park Ramp",
      "latitude": 37.5598,
      "longitude": -83.4004
    },
    "takeOut": {
      "id": "roy-spencer-ramp",
      "name": "Roy Spencer Ramp",
      "latitude": 37.6016,
      "longitude": -83.4476
    },
    "logistics": {
      "distanceLabel": "About 10.4 mi",
      "estimatedPaddleTime": "About 4.5 hr to 6.5 hr, longer with low water, scouting, or fishing stops",
      "shuttle": "Stage the Roy Spencer take-out first, then drive back to Douthitt Park in Jackson. Douthitt is the more developed park access, but Roy Spencer has a smaller parking area and simpler landing, so inspect the finish before launching.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and obey any same-day park-hours or parking restrictions.",
      "camping": "Carr Creek Campground can work as a separate nearby basecamp, but this route is normally a long day float. Do not assume any riverside camping between Douthitt and Roy Spencer.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Douthitt Park in Jackson and take out 10.4 miles downstream at Roy Spencer Ramp for a longer North Fork Kentucky River day. KDFWR gives the Jackson gauge a good band of 200 to 500 cfs, or 1.6 to 2.5 ft.",
      "accessCaveats": [
        "KDFWR warns that the Douthitt ramp does not extend all the way into the water during low summer and fall flows, so muddy launch conditions are possible even when the gauge still looks technically runnable.",
        "A large rapid or waterfall lies 0.9 miles upstream of Douthitt Park. This route starts at Douthitt and goes downstream; do not turn the access into an upstream scouting mission unless you have a separate advanced plan.",
        "Roy Spencer is a simpler bridge-area take-out with only a small paved lot and picnic shelter. Inspect it before committing to the full 10-mile day."
      ],
      "watchFor": [
        "Low water below 200 cfs or 1.6 ft, when the launch gets awkward and shallow riffles can slow the day.",
        "High water above 500 cfs or 2.5 ft, when the broad river gets faster, muddier, and less forgiving.",
        "Fresh wood, strainers, steep banks, sparse mid-route exits, and rain-driven rises in the eastern Kentucky drainage."
      ]
    }
  },
  "north-fork-kentucky-river-roy-spencer-beattyville": {
    "putIn": {
      "id": "roy-spencer-ramp",
      "name": "Roy Spencer Ramp",
      "latitude": 37.6016,
      "longitude": -83.4476
    },
    "takeOut": {
      "id": "beattyville-ramp",
      "name": "Beattyville Ramp",
      "latitude": 37.5707,
      "longitude": -83.7027
    },
    "logistics": {
      "distanceLabel": "About 34.0 mi",
      "estimatedPaddleTime": "About 9 hr to 12 hr, longer with low water, fishing, or cleanup stops",
      "shuttle": "Very long eastern Kentucky shuttle from the KY 541 bridge access at Roy Spencer to the developed Beattyville riverfront ramp. Stage Beattyville first because the finish is easier to identify and has the larger parking footprint.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public launches, follow Kentucky boating and PFD rules, and obey any posted local parking or boat-ramp instructions.",
      "camping": "Treat this as a very long day float, not an assumed overnight. No general public river-camping program is documented on this corridor, and most banks away from the named public accesses should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Roy Spencer Ramp and finish 34.0 miles downstream at Beattyville for the lower North Fork Kentucky River marathon day. KDFWR gives the Jackson gauge a good band of 200 to 500 cfs, or 1.6 to 2.5 ft, and the same-day USGS reading landed inside that band during this run.",
      "accessCaveats": [
        "Roy Spencer is a smaller bridge-area launch with a limited paved lot and simpler landing than the downstream finish. Inspect it before the shuttle commitment feels locked in.",
        "Beattyville is the intended finish near the confluence area. Do not casually continue downstream toward the main Kentucky River corridor or the downstream lock-and-dam pool.",
        "This route is long enough that weather changes, fatigue, and slow low-water miles matter more than the non-technical character of the current on a normal day."
      ],
      "watchFor": [
        "Low water below 200 cfs or 1.6 ft, when long broad sections slow down and shallow shoals become more tedious.",
        "High water above 500 cfs or 2.5 ft, when the lower North Fork gets faster, muddier, and less forgiving over a very long distance.",
        "Fresh wood, strainers, limited mid-route exits, and private or muddy banks away from the named ramps."
      ]
    },
    "accessPoints": [
      {
        "id": "roy-spencer-ramp",
        "name": "Roy Spencer Ramp",
        "latitude": 37.6016,
        "longitude": -83.4476,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Bridge-area put-in and the only clean upstream public start for this long lower-North-Fork route."
      },
      {
        "id": "beattyville-ramp",
        "name": "Beattyville Ramp",
        "latitude": 37.5707,
        "longitude": -83.7027,
        "mileFromStart": 34,
        "segmentKind": "creek",
        "note": "Developed downstream finish near the North and South Fork confluence area."
      }
    ]
  },
  "north-fork-kentucky-river-watts-perry-county-park": {
    "putIn": {
      "id": "watts-ramp",
      "name": "Watts Ramp",
      "latitude": 37.1283,
      "longitude": -83.0519
    },
    "takeOut": {
      "id": "perry-county-park-ramp",
      "name": "Perry County Park Ramp",
      "latitude": 37.2783,
      "longitude": -83.2088
    },
    "logistics": {
      "distanceLabel": "About 27.0 mi",
      "estimatedPaddleTime": "About 8 hr to 11 hr, longer with low water, wood scouting, or fishing stops",
      "shuttle": "Long Perry County shuttle from Ulvah to the Perry County Park finish. Stage the park take-out first because it is the cleaner developed finish, then return to Watts only after you are confident the group and forecast support a full-day effort.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public launches, follow Kentucky boating and PFD rules, and respect any posted city, park, or bridge-access parking limits.",
      "camping": "Treat this as a committed day float. No public riverside camping plan is documented on the corridor, and banks away from the named accesses should be treated as private or unsuitable for overnight use.",
      "campingClassification": "none",
      "summary": "Launch at Watts Ramp and continue all the way to Perry County Park for the full extended Hazard corridor on the North Fork Kentucky River. The route uses the official Hazard gauge band, but the length and below-band slowdown risk still make it a deliberate all-day plan.",
      "accessCaveats": [
        "Watts is a simpler bridge-side launch with unpaved parking rather than a full park facility, so confirm footing and vehicle placement before leaving the shuttle car downstream.",
        "Hazard City Ramp is the only clearly developed midpoint. It can work as a bailout, but do not miss the main route line while approaching the city corridor and its dam-adjacent riverfront context.",
        "The Hazard gauge sat slightly below the official 4.25 to 5.0 ft band during this run, so expect slower current and more scrape-prone riffles than on an ideal day."
      ],
      "watchFor": [
        "Shallow riffles and dragging once the Hazard stage falls below 4.25 ft.",
        "Fast rain-driven rises, muddy current, and fresh wood or strainers moving into outside bends.",
        "Fatigue, sparse developed exits, and the commitment of a long rural day with only one obvious midpoint bailout."
      ]
    },
    "accessPoints": [
      {
        "id": "watts-ramp",
        "name": "Watts Ramp",
        "latitude": 37.1283,
        "longitude": -83.0519,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Bridge-side upstream launch in Ulvah and the start of the full extended Hazard corridor."
      },
      {
        "id": "hazard-city-ramp",
        "name": "Hazard City Ramp and Fishing Pier",
        "latitude": 37.2513,
        "longitude": -83.1962,
        "mileFromStart": 22.2,
        "segmentKind": "creek",
        "note": "Primary developed midpoint and bailout in the downtown Hazard corridor."
      },
      {
        "id": "perry-county-park-ramp",
        "name": "Perry County Park Ramp",
        "latitude": 37.2783,
        "longitude": -83.2088,
        "mileFromStart": 27,
        "segmentKind": "creek",
        "note": "Canonical downstream finish at the developed county park launch."
      }
    ]
  },
  "south-fork-licking-river-lair-ramp-terry-dam": {
    "putIn": {
      "id": "lair-ramp",
      "name": "Lair Ramp",
      "latitude": 38.3412,
      "longitude": -84.3014
    },
    "takeOut": {
      "id": "terry-dam-ramp",
      "name": "Terry Dam Ramp",
      "latitude": 38.3693,
      "longitude": -84.2919
    },
    "logistics": {
      "distanceLabel": "About 5.0 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low-water dragging, fishing, or wood scouting",
      "shuttle": "Stage the Terry Dam / Airport Ramp take-out first, then drive back to Lair Ramp south of Cynthiana. Inspect the take-out before launching so the final left-bank exit above Terry Dam does not become an avoidable miss.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public ramps, follow Kentucky boating and PFD rules, and respect any posted parking or launch instructions.",
      "camping": "Kincaid Lake Campground is a separate nearby basecamp option, but this route is normally a half-day float. Do not assume camping is part of the paddle itself.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Lair Ramp and take out 5 miles downstream at Terry Dam Ramp for the South Fork Licking River float KDFWR highlights on its Blue Water Trails page. Use the Cynthiana gauge as the stage check and treat high water or a missed Terry take-out as stand-down conditions.",
      "accessCaveats": [
        "The Blue Water Trails page says the river braids considerably near the start, and low water can mean dragging through shallow bars before the deeper Terry pool begins.",
        "The take-out is on river left above Terry Dam. KDFWR warns that a low-head dam sits 2.5 miles downstream of the ramp, so do not drift past the named take-out.",
        "The same-day Cynthiana and Hayes gauge readings were above the official good bands during this run, so the route ships with honest high-water caution rather than ideal-family-flow framing."
      ],
      "watchFor": [
        "Braided shallows, downed wood, and low-water dragging early in the route.",
        "High water above 5.0 ft at Cynthiana or above 400 cfs at Hayes, when the gentle family posture no longer applies.",
        "Private or muddy banks outside the public ramps and the downstream Terry Dam hazard if the take-out is missed."
      ]
    }
  },
  "tradewater-river-bellville-montezuma": {
    "putIn": {
      "id": "bellville-road-access",
      "name": "Bellville Road Access",
      "latitude": 37.381,
      "longitude": -87.8001
    },
    "takeOut": {
      "id": "montezuma-bridge-ramp",
      "name": "Montezuma Bridge Ramp",
      "latitude": 37.3967,
      "longitude": -87.8446
    },
    "logistics": {
      "distanceLabel": "9.2 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with wood, braided-channel scouting, or low-water slowdowns",
      "shuttle": "Stage the Montezuma take-out first, then drive back to Bellville through Providence. Inspect both accesses before launching because the parking areas are small, rural, and can change with storms, mud, or local use.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow posted local and state rules, carry Kentucky boating safety gear, and respect fishing-license requirements if you plan to fish.",
      "camping": "No camping plan is assumed. KDFWR lists Bellville and Montezuma as simple access sites with no camping amenities, so treat this as a day trip.",
      "campingClassification": "none",
      "summary": "Launch at Bellville Road Access and take out at Montezuma Bridge Ramp for the official 9.2-mile Providence-area Tradewater segment. Use the Providence gauge as the route check, and stand down quickly when the river leaves the official band because this drainage rises fast.",
      "accessCaveats": [
        "Bellville is a carry-down access with unpaved parking beside private property. Keep vehicles and banks tight to the documented access area.",
        "Montezuma Bridge Ramp has only a few parking spots and limited room around the bridge. Inspect the take-out first so the final exit does not turn into an avoidable scramble.",
        "KDFWR says bank and wade fishing at both accesses is limited to the access area because the adjacent property is private. Do not treat the banks between the accesses as public lunch or camping ground."
      ],
      "watchFor": [
        "Flashy post-rain rises, muddy current, fresh wood, and strainers on bends or in braided channels.",
        "Low water below the official KDFWR band, when shallow riffles and side channels can slow progress and increase dragging.",
        "High water above 50 cfs or 15 ft at Providence, when KDFWR moves the route out of the good band and the river can become too pushy for casual paddling.",
        "Sparse services, limited cell coverage, private banks, and rural shuttle roads that can get slick after storms."
      ]
    }
  },
  "tradewater-river-bellville-fishtrap": {
    "putIn": {
      "id": "bellville-road-access",
      "name": "Bellville Road Access",
      "latitude": 37.381,
      "longitude": -87.8001
    },
    "takeOut": {
      "id": "fishtrap-bridge-ramp",
      "name": "Fishtrap Bridge Ramp",
      "latitude": 37.3988,
      "longitude": -87.9049
    },
    "logistics": {
      "distanceLabel": "About 15.9 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr 30 min, longer with wood scouting, soft current, or a slower group pace",
      "shuttle": "Stage the take-out at Fishtrap first, then drive back to Bellville through Providence. This is a committed rural shuttle, so inspect both bridge accesses before launching and leave enough daylight for a full-day Tradewater plan.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect fishing-license requirements if you plan to fish.",
      "camping": "No camping plan is assumed. KDFWR lists Bellville and Fishtrap as simple public accesses with no camping amenities, so treat this as a long day trip rather than an overnight route.",
      "campingClassification": "none",
      "summary": "Launch at Bellville Road Access and take out at Fishtrap Bridge Ramp for a longer Providence-area Tradewater day. Use the Providence gauge as the route check, but stay conservative whenever recent rain leaves discharge elevated or fresh wood moving through the channel.",
      "accessCaveats": [
        "Bellville is a carry-down access with unpaved parking beside private property. Keep vehicles and banks tight to the documented access area.",
        "Fishtrap is a simple bridge landing with a small gravel lot and no amenities. Confirm the final take-out line before you launch so the lower bridge exit does not turn into an avoidable scramble.",
        "KDFWR limits bank and wade fishing to the public access areas because adjacent property is private. Do not plan on informal bank stops or camping along the route.",
        "This route effectively combines the official Bellville-to-Montezuma and Montezuma-to-Fishtrap segments, so it needs a fuller daylight, hydration, and fatigue plan than either shorter float alone."
      ],
      "watchFor": [
        "Flashy post-rain rises, muddy current, fresh wood, and strainers on bends or in braided channels.",
        "High water above 50 cfs or 15 ft at Providence, when KDFWR moves the route out of the good band and the Tradewater becomes too pushy for casual paddling.",
        "The current Providence stage can still look reasonable while discharge is elevated, so treat recent weather as a real hazard signal rather than relying on one number.",
        "Longer-mileage fatigue, sparse services, slick bridge landings, and private banks across a full rural day."
      ]
    }
  },
  "tradewater-river-bellville-vfw-bridge": {
    "putIn": {
      "id": "bellville-road-access",
      "name": "Bellville Road Access",
      "latitude": 37.381,
      "longitude": -87.8001
    },
    "takeOut": {
      "id": "vfw-bridge-ramp",
      "name": "VFW Bridge Ramp",
      "latitude": 37.4794,
      "longitude": -87.9539
    },
    "logistics": {
      "distanceLabel": "About 25.4 mi",
      "estimatedPaddleTime": "About 8 hr to 10 hr 30 min, longer with wood scouting, soft current mileage, or a slower group pace",
      "shuttle": "Stage the take-out at VFW Bridge first, then drive back to Bellville through Providence. This is a serious full-day rural shuttle and float, so confirm both landings before launch and leave enough daylight to finish without a dusk take-out.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect fishing-license requirements if you plan to fish.",
      "camping": "No camping plan is assumed. KDFWR lists Bellville and VFW as simple public accesses with no camping amenities, so treat this as a very long day trip rather than an overnight route.",
      "campingClassification": "none",
      "summary": "Launch at Bellville Road Access and take out at VFW Bridge Ramp for a very long lower Tradewater combination day. Use the Providence gauge as the route check, but stay conservative whenever recent rain leaves discharge elevated or fresh wood moving through the channel.",
      "accessCaveats": [
        "Bellville is a carry-down access with unpaved parking beside private property. Keep vehicles and banks tight to the documented access area.",
        "VFW Bridge Ramp is the easiest access in this lower chain, but it still sits in a rural corridor where storms can leave mud, debris, or confusing shoreline conditions.",
        "KDFWR limits bank and wade fishing to the public access areas because adjacent property is private. Do not plan on informal bank stops or camping along the route.",
        "This route effectively combines the official Bellville-to-Montezuma, Montezuma-to-Fishtrap, and Fishtrap-to-VFW segments, so it should be reserved for groups comfortable with a very full day on a flashy rural river."
      ],
      "watchFor": [
        "Flashy post-rain rises, muddy current, fresh wood, and strainers on bends or in braided channels.",
        "High water above 50 cfs or 15 ft at Providence, when KDFWR moves the route out of the good band and the Tradewater becomes too pushy for a route this long.",
        "The current Providence stage can still look reasonable while discharge is elevated, so treat recent weather as a real hazard signal rather than relying on one number.",
        "Very long-day fatigue, heat, sparse services, private banks, and the risk of arriving at the take-out late if the group underestimates the mileage."
      ]
    }
  },
  "tradewater-river-montezuma-fishtrap": {
    "putIn": {
      "id": "montezuma-bridge-ramp",
      "name": "Montezuma Bridge Ramp",
      "latitude": 37.3967,
      "longitude": -87.8446
    },
    "takeOut": {
      "id": "fishtrap-bridge-ramp",
      "name": "Fishtrap Bridge Ramp",
      "latitude": 37.3988,
      "longitude": -87.9049
    },
    "logistics": {
      "distanceLabel": "6.7 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr 30 min, longer with wood scouting or slow muddy current",
      "shuttle": "Stage the Fishtrap take-out first, then drive back to Montezuma through Providence. Inspect both bridge accesses before launching because parking is limited and muddy shoulders can change after storms.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow posted local and state rules, carry Kentucky boating safety gear, and respect fishing-license requirements if you plan to fish.",
      "camping": "No camping plan is assumed. KDFWR lists Montezuma and Fishtrap as simple access sites with no camping amenities, so treat this as a day trip.",
      "campingClassification": "none",
      "summary": "Launch at Montezuma Bridge Ramp and take out at Fishtrap Bridge Ramp for the official 6.7-mile lower Tradewater continuation. Use the Providence gauge at the put-in as the route check, and stand down quickly when the river leaves the official band because this drainage rises fast.",
      "accessCaveats": [
        "Montezuma is a carry-down bridge access with only a few parking spots, so inspect the launch before leaving a vehicle.",
        "Fishtrap is a simple bridge landing with a small gravel lot and no amenities. Confirm the final take-out line before you launch so the lower bridge exit does not turn into an avoidable scramble.",
        "KDFWR says bank and wade fishing at both accesses is limited to the access area because the adjacent property is private. Do not treat the banks between the accesses as public lunch or camping ground."
      ],
      "watchFor": [
        "Flashy post-rain rises, muddy current, fresh wood, and strainers on bends or in braided channels.",
        "High water above 50 cfs or 15 ft at Providence, when KDFWR moves the route out of the good band and the Tradewater becomes too pushy for casual paddling.",
        "Private banks, slick mud at bridge landings, and sparse services once you leave Providence."
      ]
    }
  },
  "tradewater-river-fishtrap-vfw-bridge": {
    "putIn": {
      "id": "fishtrap-bridge-ramp",
      "name": "Fishtrap Bridge Ramp",
      "latitude": 37.3988,
      "longitude": -87.9049
    },
    "takeOut": {
      "id": "vfw-bridge-ramp",
      "name": "VFW Bridge Ramp",
      "latitude": 37.4794,
      "longitude": -87.9539
    },
    "logistics": {
      "distanceLabel": "9.5 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with wood scouting, braided-channel decisions, or muddy current",
      "shuttle": "Stage the VFW Bridge take-out first, then drive back to Fishtrap. This is a longer rural shuttle with limited mid-route services, so inspect both access roads before committing and keep the day conservative after recent rain.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow posted local and state rules, carry Kentucky boating safety gear, and respect fishing-license requirements if you plan to fish.",
      "camping": "No camping plan is assumed. KDFWR lists Fishtrap and VFW as simple public accesses rather than campgrounds, so treat this as a committed day trip.",
      "campingClassification": "none",
      "summary": "Launch at Fishtrap Bridge Ramp and take out at VFW Bridge Ramp for the official 9.5-mile lower Tradewater day. Because no gauge sits on this exact reach, use the upstream Providence gauge as a conservative same-river check and stand down quickly when flashy weather pushes the river out of band.",
      "accessCaveats": [
        "Fishtrap is a small bridge landing with minimal parking and no amenities, so settle the vehicle plan before launching.",
        "VFW Bridge Ramp is the easiest access in this chain, with a larger parking area and paved ramp, but it still sits in a rural corridor where storms can leave mud, debris, or confusing shoreline conditions.",
        "KDFWR limits bank and wade fishing to the public access areas because adjacent property is private. Do not plan on informal bank stops along the route."
      ],
      "watchFor": [
        "Flashy post-rain rises, muddy current, fresh wood, and strainers on bends or in braided channels.",
        "The Providence gauge is upstream of this route, so treat it as a conservative proxy rather than a perfect lower-reach forecast.",
        "Longer-mileage fatigue, sparse services, and muddy bridge or ramp exits after storms."
      ]
    }
  },
  "tradewater-river-vfw-bridge-granger-landing": {
    "putIn": {
      "id": "vfw-bridge-ramp",
      "name": "VFW Bridge Ramp",
      "latitude": 37.4794,
      "longitude": -87.9539
    },
    "takeOut": {
      "id": "granger-landing-ramp",
      "name": "Granger Landing Ramp",
      "latitude": 37.5463,
      "longitude": -88.0189
    },
    "logistics": {
      "distanceLabel": "10.6 mi",
      "estimatedPaddleTime": "About 4 hr 30 min to 6 hr 30 min, longer with wood scouting or soft-current mileage",
      "shuttle": "Stage the Granger Landing take-out first, then drive back to VFW Bridge near Sullivan. This is a full rural Tradewater shuttle with few services, so inspect both ramps before launching and keep the plan conservative after recent rain.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow posted local and state rules, carry Kentucky boating safety gear, and respect fishing-license requirements if you plan to fish.",
      "camping": "No camping plan is assumed. KDFWR lists VFW Bridge and Granger Landing as simple public accesses rather than campgrounds, so treat this as a day trip.",
      "campingClassification": "none",
      "summary": "Launch at VFW Bridge Ramp and take out at Granger Landing Ramp for the official 10.6-mile Sturgis-area Tradewater segment. Because no gauge sits on this exact reach, use the upstream Providence gauge as a conservative same-river check and stand down quickly when flashy weather pushes the river out of band.",
      "accessCaveats": [
        "VFW Bridge Ramp is a larger paved access with better staging room than the upstream bridge landings, but it still deserves a same-day mud and debris check after storms.",
        "Granger Landing is an uncomplicated public ramp near Sturgis, yet the lower river still runs past private banks and limited shoreline services. Do not assume open stopping points away from the ramp.",
        "KDFWR treats both endpoints as access sites rather than destination parks or campgrounds, so keep the day framed as a simple launch-to-ramp float."
      ],
      "watchFor": [
        "Flashy post-rain rises, muddy current, fresh wood, and strainers on bends or in braided channels.",
        "The Providence gauge is upstream of this route, so treat it as a conservative proxy rather than a perfect Sturgis-area forecast.",
        "Longer-mileage fatigue, private banks, and sparse services on a lower river that can feel remote despite easy current."
      ]
    }
  },
  "tradewater-river-montezuma-vfw-bridge": {
    "putIn": {
      "id": "montezuma-bridge-ramp",
      "name": "Montezuma Bridge Ramp",
      "latitude": 37.3967,
      "longitude": -87.8446
    },
    "takeOut": {
      "id": "vfw-bridge-ramp",
      "name": "VFW Bridge Ramp",
      "latitude": 37.4794,
      "longitude": -87.9539
    },
    "logistics": {
      "distanceLabel": "About 16.2 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr 30 min, longer with wood scouting, soft current, or a slower group pace",
      "shuttle": "Stage the take-out at VFW Bridge first, then drive back to Montezuma through Providence. This is a committed rural shuttle, so inspect both bridge accesses before launching and leave enough daylight for a full-day lower Tradewater plan.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect fishing-license requirements if you plan to fish.",
      "camping": "No camping plan is assumed. KDFWR lists Montezuma and VFW as simple public accesses with no camping amenities, so treat this as a long day trip rather than an overnight route.",
      "campingClassification": "none",
      "summary": "Launch at Montezuma Bridge Ramp and take out at VFW Bridge Ramp for a longer lower Tradewater day. Use the Providence gauge at the put-in as the route check, but stay conservative when recent rain leaves the discharge high or fresh wood moving through the channel.",
      "accessCaveats": [
        "Montezuma is a carry-down bridge access with only a few parking spots, so inspect the launch before leaving a vehicle.",
        "VFW Bridge Ramp is the easiest access in this lower chain, but it still sits in a rural corridor where storms can leave mud, debris, or confusing shoreline conditions.",
        "KDFWR limits bank and wade fishing to the public access areas because adjacent property is private. Do not plan on informal bank stops or camping along the route.",
        "This route effectively combines the official Montezuma-to-Fishtrap and Fishtrap-to-VFW segments, so it needs a fuller daylight, hydration, and fatigue plan than either shorter float alone."
      ],
      "watchFor": [
        "Flashy post-rain rises, muddy current, fresh wood, and strainers on bends or in braided channels.",
        "High water above 50 cfs or 15 ft at Providence, when KDFWR moves the route out of the good band and the Tradewater becomes too pushy for casual paddling.",
        "The current Providence stage can still look reasonable while discharge is elevated, so treat recent weather as a real hazard signal rather than relying on one number.",
        "Longer-mileage fatigue, sparse services, slick bridge landings, and private banks across a full rural day."
      ]
    }
  },
  "tradewater-river-fishtrap-granger-landing": {
    "putIn": {
      "id": "fishtrap-bridge-ramp",
      "name": "Fishtrap Bridge Ramp",
      "latitude": 37.3988,
      "longitude": -87.9049
    },
    "takeOut": {
      "id": "granger-landing-ramp",
      "name": "Granger Landing Ramp",
      "latitude": 37.5463,
      "longitude": -88.0189
    },
    "logistics": {
      "distanceLabel": "About 20.1 mi",
      "estimatedPaddleTime": "About 7 hr to 9 hr 30 min, longer with wood scouting, soft current mileage, or a slower group pace",
      "shuttle": "Stage the take-out at Granger Landing first, then drive back to Fishtrap. This is a long lower-Tradewater shuttle with few services, so inspect both access roads before committing and leave enough daylight for an all-day float.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect fishing-license requirements if you plan to fish.",
      "camping": "No camping plan is assumed. KDFWR lists Fishtrap and Granger as simple public accesses rather than campgrounds, so treat this as a committed day trip.",
      "campingClassification": "none",
      "summary": "Launch at Fishtrap Bridge Ramp and take out at Granger Landing Ramp for a long lower Tradewater day. Because no gauge sits on this exact reach, use the upstream Providence gauge as a conservative same-river check and stand down quickly when flashy weather pushes the river out of band.",
      "accessCaveats": [
        "Fishtrap is a small bridge landing with minimal parking and no amenities, so settle the vehicle plan before launching.",
        "Granger Landing is an uncomplicated public ramp near Sturgis, yet the lower river still runs past private banks and limited shoreline services. Do not assume open stopping points away from the ramp.",
        "KDFWR limits bank and wade fishing to the public access areas because adjacent property is private. Do not plan on informal bank stops or camping along the route.",
        "This route effectively combines the official Fishtrap-to-VFW and VFW-to-Granger segments, so it needs a fuller daylight, hydration, and fatigue plan than either shorter float alone."
      ],
      "watchFor": [
        "Flashy post-rain rises, muddy current, fresh wood, and strainers on bends or in braided channels.",
        "The Providence gauge is upstream of this route, so treat it as a conservative proxy rather than a perfect lower-reach forecast.",
        "Longer-mileage fatigue, sparse services, slick bridge or ramp exits after storms, and limited legal bailout options.",
        "Private banks across most of the corridor and the temptation to over-commit just because the river itself is gentle at ordinary flows."
      ]
    }
  },
  "tradewater-river-montezuma-granger-landing": {
    "putIn": {
      "id": "montezuma-bridge-ramp",
      "name": "Montezuma Bridge Ramp",
      "latitude": 37.3967,
      "longitude": -87.8446
    },
    "takeOut": {
      "id": "granger-landing-ramp",
      "name": "Granger Landing Ramp",
      "latitude": 37.5463,
      "longitude": -88.0189
    },
    "logistics": {
      "distanceLabel": "About 26.8 mi",
      "estimatedPaddleTime": "About 8 hr 30 min to 11 hr, longer with wood scouting, soft current mileage, or a slower group pace",
      "shuttle": "Stage the take-out at Granger Landing first, then drive back to Montezuma through Providence. This is a serious full-day rural shuttle and float, so confirm both landings before launch and leave enough daylight to finish without a dusk take-out.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect fishing-license requirements if you plan to fish.",
      "camping": "No camping plan is assumed. KDFWR lists Montezuma and Granger as simple public accesses with no camping amenities, so treat this as a very long day trip rather than an overnight route.",
      "campingClassification": "none",
      "summary": "Launch at Montezuma Bridge Ramp and take out at Granger Landing Ramp for the full lower Tradewater combination day. Use the Providence gauge at the put-in as the route check, but stay conservative whenever recent rain leaves discharge elevated or fresh wood moving through the channel.",
      "accessCaveats": [
        "Montezuma is a carry-down bridge access with only a few parking spots, so inspect the launch before leaving a vehicle.",
        "Granger Landing is a straightforward public ramp near Sturgis, but it comes at the end of a 26.8-mile day with sparse services and no guaranteed easy bailout points upstream.",
        "KDFWR limits bank and wade fishing to the public access areas because adjacent property is private. Do not plan on informal bank stops or camping along the route.",
        "This route effectively combines all three official downstream Tradewater segments from Montezuma through Granger, so it should be reserved for groups comfortable with a very full day on a flashy rural river."
      ],
      "watchFor": [
        "Flashy post-rain rises, muddy current, fresh wood, and strainers on bends or in braided channels.",
        "High water above 50 cfs or 15 ft at Providence, when KDFWR moves the route out of the good band and the Tradewater becomes too pushy for a route this long.",
        "The current Providence stage can still look reasonable while discharge is elevated, so treat recent weather as a real hazard signal rather than relying on one number.",
        "Very long-day fatigue, heat, sparse services, private banks, and the risk of arriving at the take-out late if the group underestimates the mileage."
      ]
    }
  },
  "drakes-creek-romanza-johnson-phil-moore": {
    "putIn": {
      "id": "romanza-johnson-park",
      "name": "Romanza Johnson Park creek access",
      "latitude": 36.873116,
      "longitude": -86.372368
    },
    "takeOut": {
      "id": "phil-moore-park",
      "name": "Phil Moore Park carry-down access",
      "latitude": 36.8954,
      "longitude": -86.3807
    },
    "logistics": {
      "distanceLabel": "About 6 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr depending on water level, current, wood, and stops",
      "shuttle": "Stage the take-out at Phil Moore Park, then drive to Romanza Johnson Park. Both parks close at dark, and Warren County warns vehicles left unattended may be locked in until morning, so leave a conservative daylight margin.",
      "permits": "No route-specific private paddling permit is known. Use the public park accesses, follow Warren County park rules and Kentucky boating/PFD requirements, and obey any flag-system, weather, or access warnings.",
      "camping": "Treat this as a daylight county-park float. No camping is known at the access parks for this route.",
      "summary": "Launch at Romanza Johnson Park on Trammel Fork and take out at Phil Moore Park on Drakes Creek for a common Warren County Blueways trip. Use the Drakes Creek near Alvaton USGS gauge as the same-day water check.",
      "accessCaveats": [
        "Romanza Johnson Park and Phil Moore Park close at dark; do not leave the take-out vehicle past posted hours.",
        "The Romanza ford hydraulic is dangerous when water flows over the ford. Avoid the downstream side and skip the route if the ford or current looks wrong.",
        "Phil Moore Park has more than one carry-down/landing area. Make sure the group agrees on the exact take-out before launching.",
        "County flag information is helpful but does not replace USGS gauge, weather, flood, and same-day visual checks."
      ],
      "watchFor": [
        "Low water below about 100 cfs, when dragging over shoals becomes likely.",
        "Strainers, downed trees, rocks, brush piles, and collected debris between islands or bends.",
        "Romanza ford hydraulic, swift current after rain, high or rising water, and thunderstorms.",
        "Park users, anglers, private-adjacent banks, and limited legal stops outside public access areas.",
        "Water-quality concerns after storms and any county, weather-service, or emergency-management warnings."
      ]
    }
  },
  "green-river-dennison-ferry-houchins-ferry": {
    "putIn": {
      "id": "dennison-ferry",
      "name": "Dennison Ferry",
      "latitude": 37.2174,
      "longitude": -86.0493
    },
    "takeOut": {
      "id": "houchins-ferry",
      "name": "Houchins Ferry",
      "latitude": 37.2024,
      "longitude": -86.2376
    },
    "logistics": {
      "distanceLabel": "About 19.8 mi",
      "estimatedPaddleTime": "About 6.5 hr to 10 hr, longer with ferry delays, gravel-bar breaks, or a slower group pace",
      "shuttle": "Stage the take-out at Houchins Ferry Campground, then drive back to Dennison Ferry Day Use Area. Build in extra shuttle time for park roads and verify current ferry and road status before leaving vehicles because access conditions can change without notice.",
      "permits": "No permit is required for a same-day paddle, but this route is inside Mammoth Cave National Park and follows NPS boating rules. If you intend to break the route into an overnight, use only legal campsites and carry the required riverside camping permit.",
      "camping": "This is the strongest Green River combination in the park for overnight flexibility. NPS says lower-water gravel bars and low riverbanks can support paddler camping with a valid riverside camping permit, and Houchins Ferry Campground also offers legal endpoint camping with toilets, picnic facilities, and vehicle access.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at Dennison Ferry and continue all the way to Houchins Ferry for a long Mammoth Cave Green River day. The direct Mammoth Cave gauge anchors the route, but the current July 1 reading sits just below the park's 20-foot launch closure, so same-day judgment matters more than the mileage table.",
      "accessCaveats": [
        "Dennison Ferry is day-use only with a carry-down launch. Do not plan to camp or leave gear spread across the access.",
        "The route passes the Green River Ferry crossing midway. NPS says paddlers must stay back, wait for eye contact from the operator, and use the canoe/kayak access on the south side if stopping there.",
        "On-route camping requires a valid riverside permit and is flow-dependent. Use only legal gravel-bar or low-bank sites allowed by park rules.",
        "Houchins Ferry has the best endpoint support in this route family, but the campground and ramp still operate inside a managed park setting with posted quiet-hour and facility rules."
      ],
      "watchFor": [
        "Current levels near 20 ft, when the route is still open but much more consequential than the park's broad beginner-friendly band.",
        "Swift current, submerged trees, logjams, drifting debris, gravel-bar shifts, back channels, and muddy or slick access surfaces.",
        "Ferry traffic at Green River Ferry, limited cell service, exposed sun, and fewer nearby bailout options than the shorter park segments.",
        "Camping mistakes: rising overnight water, unsecured boats, and unauthorized stops without a valid permit."
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
        "mileFromStart": 7.5,
        "segmentKind": "creek",
        "note": "Mid-corridor access and ferry crossing; follow NPS ferry-contact guidance."
      },
      {
        "id": "houchins-ferry",
        "name": "Houchins Ferry",
        "latitude": 37.2024,
        "longitude": -86.2376,
        "mileFromStart": 19.8,
        "segmentKind": "creek",
        "note": "Default full-corridor take-out with campground support nearby."
      }
    ]
  },
  "green-river-dennison-green-river-ferry": {
    "putIn": {
      "id": "dennison-ferry",
      "name": "Dennison Ferry",
      "latitude": 37.2174,
      "longitude": -86.0493
    },
    "takeOut": {
      "id": "green-river-ferry",
      "name": "Green River Ferry",
      "latitude": 37.1795,
      "longitude": -86.1123
    },
    "logistics": {
      "distanceLabel": "About 7.5 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with side explorations, ferry delays, or lower-water gravel-bar stops",
      "shuttle": "Stage the take-out at Green River Ferry, then drive back to Dennison Ferry Day Use Area. Check the current Mammoth Cave road and ferry status before committing the shuttle because access conditions and operating hours can change without notice.",
      "permits": "No permit is required for a normal day paddle, but this route is inside Mammoth Cave National Park. Follow NPS boating rules, wear required USCG-approved PFDs, and keep the Green River Ferry crossing clear of unsafe approaches or unauthorized bank use.",
      "camping": "Green River Ferry has endpoint camping support rather than on-route overnight planning. KDFWR notes Mammoth Cave Campground at the top of the hill by the take-out, while Dennison Ferry is a day-use-only access with no camping allowed.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Dennison Ferry and take out at Green River Ferry for the park's popular scenic Green River day trip. The direct Mammoth Cave gauge is in the same park corridor, but the current July 14 reading sits above the broad beginner-friendly band and should be treated as experienced-water caution rather than a casual green light.",
      "accessCaveats": [
        "Dennison Ferry is day-use only with a carry-down launch. Do not plan to camp or leave gear spread across the access.",
        "NPS says canoe and kayak users should use the access ramp just upstream from the ferry on the south side when finishing at Green River Ferry.",
        "The ferry status can change without notice. Check current conditions or call the ferry hotline before shuttling.",
        "Cell service can be limited in the park, so do not rely on last-minute online rerouting once the group is on the road."
      ],
      "watchFor": [
        "Swift current, submerged trees and rocks, drifting debris, logjams, and muddy or slick carry-down surfaces.",
        "Green River Ferry traffic. Stay back, wait for eye contact from the operator, and never linger upriver of the ferry vessel.",
        "Higher water above about 15 ft, when the river becomes more consequential for casual paddlers, and launch closures at or above 20 ft.",
        "Heat, limited rescue access, and slower emergency response times in the park."
      ]
    }
  },
  "green-river-green-river-ferry-brownsville-city-park": {
    "putIn": {
      "id": "green-river-ferry",
      "name": "Green River Ferry",
      "latitude": 37.1795,
      "longitude": -86.1123
    },
    "takeOut": {
      "id": "brownsville-city-park",
      "name": "Brownsville City Park",
      "latitude": 37.1964,
      "longitude": -86.2757
    },
    "logistics": {
      "distanceLabel": "About 16.0 mi",
      "estimatedPaddleTime": "About 5.5 hr to 8 hr, longer with ferry delays at the start, gravel-bar breaks, or slower groups",
      "shuttle": "Stage the take-out at Brownsville City Park, then drive back to Green River Ferry. Build in extra shuttle time for park roads and verify current ferry and road status before leaving vehicles.",
      "permits": "No permit is required for a same-day paddle, but this route is inside Mammoth Cave National Park for most of the day and follows NPS boating rules. If you intend to camp on gravel bars or low banks en route, NPS requires a valid riverside camping permit.",
      "camping": "This route still keeps the lower-park overnight flexibility of the Green River Ferry to Houchins segment. NPS says lower-water gravel bars and low riverbanks can support paddler camping with a valid riverside permit, and Houchins Ferry Campground remains the cleanest legal midpoint overnight support.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch below Green River Ferry and continue downstream to Brownsville City Park for the full lower-park Green continuation. The direct Mammoth Cave gauge anchors the route, but the current July 14 stage sits above the broad beginner-friendly band and the Brownsville finish raises the consequence beyond a casual flatwater day.",
      "accessCaveats": [
        "Launch and load on the downstream side of Green River Ferry so you do not interfere with ferry operations.",
        "Houchins Ferry is the clearest legal midpoint stop and campground support if the group does not want the full Brownsville finish in one push.",
        "Brownsville City Park is the intended public take-out. NPS says private land begins after the park boundary, so do not improvise extra stops or a longer continuation without fresh access research.",
        "This stretch is less traveled than the popular Green River Ferry day float, so groups should be more self-sufficient about shuttle, weather, and emergency planning."
      ],
      "watchFor": [
        "Ferry traffic at the launch, plus submerged trees, logjams, gravel-bar shifts, back channels, and drifting debris throughout the run.",
        "Higher water above about 15 ft, when the route becomes more consequential, and launch closures at or above 20 ft.",
        "The class 2 rapid left by former Lock and Dam 6 shortly before Brownsville Boat Ramp.",
        "Cold springs, exposed sun, limited cell service, and the temptation to relax too early because the finish is still moving water."
      ]
    },
    "accessPoints": [
      {
        "id": "green-river-ferry",
        "name": "Green River Ferry",
        "latitude": 37.1795,
        "longitude": -86.1123,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default lower-park put-in below the ferry crossing."
      },
      {
        "id": "houchins-ferry",
        "name": "Houchins Ferry",
        "latitude": 37.2024,
        "longitude": -86.2376,
        "mileFromStart": 12.4,
        "segmentKind": "creek",
        "note": "Primary midpoint campground, bailout, and the former shorter continuation finish."
      },
      {
        "id": "brownsville-city-park",
        "name": "Brownsville City Park",
        "latitude": 37.1964,
        "longitude": -86.2757,
        "mileFromStart": 16,
        "segmentKind": "creek",
        "note": "Default full lower-corridor take-out at the public Brownsville ramp."
      }
    ]
  },
  "green-river-green-river-ferry-houchins": {
    "putIn": {
      "id": "green-river-ferry",
      "name": "Green River Ferry",
      "latitude": 37.1795,
      "longitude": -86.1123
    },
    "takeOut": {
      "id": "houchins-ferry",
      "name": "Houchins Ferry",
      "latitude": 37.2024,
      "longitude": -86.2376
    },
    "logistics": {
      "distanceLabel": "About 12.3 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with side channels, gravel-bar breaks, or camping logistics",
      "shuttle": "Stage the take-out at Houchins Ferry Campground, then drive back to Green River Ferry. Build in extra shuttle time for park roads and verify current ferry and road status before leaving vehicles.",
      "permits": "No permit is required for a same-day paddle, but this route is inside Mammoth Cave National Park and follows NPS boating rules. If you intend to camp on gravel bars or low banks en route, NPS requires a valid riverside camping permit; do not assume spontaneous camping is legal.",
      "camping": "This is the strongest Green River route in this pass for overnight flexibility. NPS says lower-water gravel bars and low riverbanks can support paddler camping with a valid riverside camping permit, and Houchins Ferry Campground also offers legal endpoint camping with campsites, toilets, and picnic facilities.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch below Green River Ferry and continue downstream to Houchins Ferry for a quieter, longer Mammoth Cave Green River run. The direct Mammoth Cave gauge anchors the route, but the current July 14 stage sits above the broad beginner-friendly band and should be treated as consequential experienced water.",
      "accessCaveats": [
        "Launch and load on the downstream side of Green River Ferry so you do not interfere with ferry operations.",
        "Houchins Ferry has the easiest overnight support in this route family, but the ramp and campground still sit inside a managed park setting with posted quiet-hour and facility rules.",
        "On-route camping requires a valid riverside permit and is flow-dependent. Use only legal gravel-bar or low-bank sites allowed by park rules.",
        "This longer stretch is less traveled than Dennison-to-Green River Ferry, so groups should be more self-sufficient about shuttle, weather, and emergency planning."
      ],
      "watchFor": [
        "Ferry traffic at the launch, plus submerged trees, logjams, gravel-bar shifts, back channels, and drifting debris throughout the run.",
        "Higher water above about 15 ft, when the route becomes more consequential, and launch closures at or above 20 ft.",
        "Cold springs, exposed sun, limited cell service, and fewer nearby bailout options than the shorter park segment.",
        "Camping mistakes: rising overnight water, unsecured boats, and unauthorized stops without a valid permit."
      ]
    }
  },
  "barren-river-vpa-3-martinsville": {
    "putIn": {
      "id": "barren-river-vpa-3",
      "name": "Barren River VPA #3",
      "latitude": 36.9333,
      "longitude": -86.2043
    },
    "takeOut": {
      "id": "martinsville-ford-claypool-ramp",
      "name": "Martinsville Ford / Claypool Ramp",
      "latitude": 36.9134,
      "longitude": -86.2293
    },
    "logistics": {
      "distanceLabel": "About 3.9 mi",
      "estimatedPaddleTime": "About 1 hr to 3 hr, longer in low water or with fishing stops",
      "shuttle": "Leave the take-out vehicle at Martinsville Ford / Claypool Ramp, then drive back to Barren River VPA #3 on Highway 101. The road shuttle is short, but the VPA access has less room than the downstream ramp.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and obey the voluntary public access rules at VPA #3.",
      "camping": "Treat this as a short day trip. KDFWR does not document public route camping on this segment, and the private-land VPA launch specifically prohibits camping and fires.",
      "campingClassification": "none",
      "summary": "Launch at Barren River VPA #3 and take out at Martinsville Ford / Claypool Ramp for a short lower-Barren float. Use the Finney stage gauge and expect shoals or scraping whenever the river sits below KDFWR's 78.0 to 78.5 ft good band.",
      "accessCaveats": [
        "Barren River VPA #3 is on private property opened to the public. KDFWR says no camping, no fires, no alcohol, and no swimming at the site.",
        "Martinsville Ford / Claypool Ramp is the cleaner public take-out, but nearby private property still means boaters should stay tight to the named access area.",
        "This short segment is easier to fit into a partial day, but low water can slow it down more than the mileage suggests.",
        "The route uses the direct Finney stage gauge. Stage trend and local weather still matter more than a single number."
      ],
      "watchFor": [
        "Low water below about 78.0 ft, when broad shoals and slow current can force dragging.",
        "High water above about 78.5 ft, when current at bends and the downstream landing becomes less forgiving.",
        "Rocky pools, bridge-adjacent current near the downstream access, and woody debris after rain.",
        "Private banks and limited legal stopping options away from the two named accesses."
      ]
    }
  },
  "barren-river-vpa-3-potter-combs": {
    "putIn": {
      "id": "barren-river-vpa-3",
      "name": "Barren River VPA #3",
      "latitude": 36.9333,
      "longitude": -86.2043
    },
    "takeOut": {
      "id": "potter-combs-ramp",
      "name": "Potter/Combs Ramp",
      "latitude": 37.0027,
      "longitude": -86.4184
    },
    "logistics": {
      "distanceLabel": "About 27.9 mi",
      "estimatedPaddleTime": "About 8 hr to 11 hr, longer in low water, wind, or with fishing stops",
      "shuttle": "Stage the downstream vehicle at Potter/Combs Ramp in Weldon Pete Park, then drive back to Barren River VPA #3 on Highway 101. The road shuttle is simple, but the route itself is a long lower-Barren commitment from a constrained VPA launch to a pooled park finish.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and obey the voluntary public access rules at VPA #3.",
      "camping": "Treat this as a full day trip. KDFWR documents no camping or fires at the private-land VPA launch, and Potter/Combs is a public park ramp rather than a campground corridor.",
      "campingClassification": "none",
      "summary": "Launch at Barren River VPA #3 and take out at Potter/Combs Ramp for a long lower-Barren continuation. Use the Finney stage gauge and plan conservatively whenever the river is outside KDFWR's 78.0 to 78.5 ft good band.",
      "accessCaveats": [
        "Barren River VPA #3 is a voluntary public access site on private property. KDFWR says no camping, no fires, no alcohol, and no swimming at the access.",
        "Martinsville Ford / Claypool Ramp is the only clean public intermediate bailout in the middle of this route, so note it before launching.",
        "Potter/Combs Ramp sits in Weldon Pete Park above a dam-influenced pooled section. Treat it as the planned finish rather than a casual pass-through.",
        "This is one of the longest lower-Barren routes now in the tree. Start early enough to avoid finishing at dusk if the current drags."
      ],
      "watchFor": [
        "Low water below about 78.0 ft, when shoals, slow pools, and dragging become more likely across a very long day.",
        "High water above about 78.5 ft, when current at bends and the park take-out becomes less forgiving.",
        "Broad-river wind, heat exposure, woody debris after rain, and limited legal stopping options away from the named accesses.",
        "Private banks and the tighter VPA launch footprint at the upstream end of a long shuttle."
      ]
    },
    "accessPoints": [
      {
        "id": "barren-river-vpa-3",
        "name": "Barren River VPA #3",
        "latitude": 36.9333,
        "longitude": -86.2043,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the long VPA-to-Potter/Combs continuation."
      },
      {
        "id": "martinsville-ford-claypool-ramp",
        "name": "Martinsville Ford / Claypool Ramp",
        "latitude": 36.9134,
        "longitude": -86.2293,
        "mileFromStart": 3.9,
        "segmentKind": "creek",
        "note": "Intermediate public bailout and split point."
      },
      {
        "id": "potter-combs-ramp",
        "name": "Potter/Combs Ramp",
        "latitude": 37.0027,
        "longitude": -86.4184,
        "mileFromStart": 27.9,
        "segmentKind": "creek",
        "note": "Default take-out at Weldon Pete Park."
      }
    ]
  },
  "buck-creek-rainey-road-stab-road": {
    "putIn": {
      "id": "rainey-road-fishing-access",
      "name": "Rainey Road Fishing Access",
      "latitude": 37.1792,
      "longitude": -84.4564
    },
    "takeOut": {
      "id": "ky-1675-fishing-access",
      "name": "KY-1675 Fishing Access",
      "latitude": 37.1516,
      "longitude": -84.4392
    },
    "logistics": {
      "distanceLabel": "About 4.2 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with low-water dragging, fishing stops, or a slow first-time shuttle",
      "shuttle": "Leave the downstream vehicle at the KY-1675 / Stab bridge, then drive back to Rainey Road. Both accesses are simple carry-downs with unpaved parking, so check footing and parking space before launching.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and stay off private banks between the endpoints.",
      "camping": "Treat this as a day route. KDFWR lists no public camping or overnight support at either Buck Creek access.",
      "campingClassification": "none",
      "summary": "Launch at Rainey Road and finish at the KY-1675 / Stab bridge for the first official Buck Creek float. Use the Shopville gauge and expect dragging whenever the creek stays below the same-gauge 100 cfs / 2.0 ft local floor.",
      "accessCaveats": [
        "Rainey Road is a simple carry-down access with unpaved parking and no amenities.",
        "The Stab / KY-1675 take-out is at the bridge only. Do not assume extra public staging room beyond the marked access footprint.",
        "Most shoreline between the endpoints is private, so launch, land, and regroup only at the named public accesses."
      ],
      "watchFor": [
        "Low water near or below about 100 cfs, when shallow shoals can turn the short float into a scrape-and-walk day.",
        "Faster current after rain, especially through bluff turns and around woody cover.",
        "Fresh strainers, slick footing at both carry-downs, and private-bank limits away from the named accesses."
      ]
    }
  },
  "buck-creek-stab-road-bent-road": {
    "putIn": {
      "id": "ky-1675-fishing-access",
      "name": "KY-1675 Fishing Access",
      "latitude": 37.1516,
      "longitude": -84.4392
    },
    "takeOut": {
      "id": "bent-road-fishing-access",
      "name": "Bent Road Fishing Access",
      "latitude": 37.1038,
      "longitude": -84.435
    },
    "logistics": {
      "distanceLabel": "About 7.5 mi",
      "estimatedPaddleTime": "About 3 hr to 5.5 hr, longer with low-water dragging, scout pauses, or a careful carry-out at Bent Road",
      "shuttle": "Stage the take-out at Bent Road, then drive back to the KY-1675 / Stab bridge. Bent Road is public but the final carry-out is steep enough that many paddlers leave vehicles at the top and walk boats up.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and avoid stopping on private banks through the gorge.",
      "camping": "Treat this as a day route. KDFWR lists no public camping or overnight support at the Stab or Bent Road accesses.",
      "campingClassification": "none",
      "summary": "Launch at the Stab / KY-1675 bridge and finish at Bent Road for the scenic Buck Creek middle-gorge float through the Bent. Use the Shopville gauge and expect a scratchier day whenever the creek stays below the same-gauge 100 cfs / 2.0 ft floor.",
      "accessCaveats": [
        "The KY-1675 bridge access is a basic carry-down with no restroom, dock, or staging pad.",
        "KDFWR says Bent Road is the legal take-out, but the final carry-out is steep and rocky enough that some paddlers will want to park at the top and walk boats up.",
        "This is a bluff-walled private-bank corridor. Use only the named public launches for launching, landing, and breaks."
      ],
      "watchFor": [
        "Low water near or below about 100 cfs, when long shoals and rocky runs become slower and more scrape-prone.",
        "Higher post-rain current that can push boats toward strainers and cliff bases through the Bent.",
        "Fresh wood, tight turns, and a strenuous finish carry at Bent Road."
      ]
    }
  },
  "buck-creek-bent-road-poplarville-road": {
    "putIn": {
      "id": "bent-road-fishing-access",
      "name": "Bent Road Fishing Access",
      "latitude": 37.1038,
      "longitude": -84.435
    },
    "takeOut": {
      "id": "poplarville-road-fishing-access",
      "name": "Poplarville Road Fishing Access",
      "latitude": 37.0469,
      "longitude": -84.4314
    },
    "logistics": {
      "distanceLabel": "About 6 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with low-water walking, scout stops at drops, or a slow finish below Dykes Cave",
      "shuttle": "Stage the take-out at Poplarville Road first, then drive back to Bent Road. Poplarville is the easier public finish; KDFWR says the Dykes Bridge carry-out a mile upstream is steeper and more strenuous.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and stay off private banks through the gorge.",
      "camping": "Treat this as a day route. KDFWR lists no public camping or overnight support at Bent Road or Poplarville Road.",
      "campingClassification": "none",
      "summary": "Launch at Bent Road and finish at Poplarville Road for the lower Buck Creek gorge float. Use the Shopville gauge and expect to walk more of the shallow drops whenever the creek stays below the same-gauge 100 cfs / 2.0 ft floor.",
      "accessCaveats": [
        "Bent Road is a basic carry-down start with unpaved parking and no services.",
        "Poplarville is the recommended easier finish. Do not assume Dykes Bridge is the default take-out just because it appears first on some older guide references.",
        "The Poplarville parking area is small and roadside. Keep vehicles tight and fully clear of local traffic."
      ],
      "watchFor": [
        "Low water near or below about 100 cfs, when shallow drops and the post-Dykes stretch can require boat walking.",
        "Several lower-route drops and small waterfalls that KDFWR says can become dicey at higher flows.",
        "The island line where KDFWR recommends staying left because the right chute may still be blocked by a fallen tree.",
        "Fresh strainers, cold spring inflows, and private-bank limits away from the two named accesses."
      ]
    }
  },
  "buck-creek-rainey-road-bent-road": {
    "putIn": {
      "id": "rainey-road-fishing-access",
      "name": "Rainey Road Fishing Access",
      "latitude": 37.1792,
      "longitude": -84.4564
    },
    "takeOut": {
      "id": "bent-road-fishing-access",
      "name": "Bent Road Fishing Access",
      "latitude": 37.1038,
      "longitude": -84.435
    },
    "logistics": {
      "distanceLabel": "About 11.7 mi",
      "estimatedPaddleTime": "About 4.5 hr to 7 hr, longer with low-water dragging, scout pauses, or a careful carry-out at Bent Road",
      "shuttle": "Leave the downstream vehicle at Bent Road, then drive back to Rainey Road. This is a real point-to-point Buck Creek day, and the steep Bent carry-out is worth scouting before you commit the full chain.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and stay off private banks throughout the corridor.",
      "camping": "Treat this as a day route. KDFWR lists no public camping or overnight support at Rainey Road, the Stab bridge, or Bent Road.",
      "campingClassification": "none",
      "summary": "Launch at Rainey Road and continue to Bent Road for the full upper-plus-middle Buck Creek chain. Use the Shopville gauge and expect a slower day whenever the creek stays below the same-gauge 100 cfs / 2.0 ft local floor.",
      "accessCaveats": [
        "Rainey Road is a simple carry-down start with unpaved parking and no amenities.",
        "The Stab / KY-1675 bridge is the only clean public midpoint stop before the Bent section. Do not assume extra legal staging room beyond the marked access footprint.",
        "Bent Road is the intended finish, but KDFWR says the carry-out is steep and rocky enough that many paddlers leave vehicles at the top and walk boats up."
      ],
      "watchFor": [
        "Low water near or below about 100 cfs, when shallow shoals can turn the route into a long scrape-and-walk day.",
        "Higher post-rain current that can push boats toward cliff bases and strainers through the Bent.",
        "Fresh wood, fatigue late in the run, and a strenuous finish carry at Bent Road."
      ]
    }
  },
  "buck-creek-stab-road-poplarville-road": {
    "putIn": {
      "id": "ky-1675-fishing-access",
      "name": "KY-1675 Fishing Access",
      "latitude": 37.1516,
      "longitude": -84.4392
    },
    "takeOut": {
      "id": "poplarville-road-fishing-access",
      "name": "Poplarville Road Fishing Access",
      "latitude": 37.0469,
      "longitude": -84.4314
    },
    "logistics": {
      "distanceLabel": "About 13.5 mi",
      "estimatedPaddleTime": "About 5 hr to 8 hr, longer with low-water dragging, scouting at drops, or a careful full-day pace",
      "shuttle": "Stage the take-out at Poplarville Road first, then drive back to the KY-1675 / Stab bridge. This is a full middle-to-lower Buck Creek commitment, not a short after-work run.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and avoid stopping on private banks through the gorge.",
      "camping": "Treat this as a day route. KDFWR lists no public camping or overnight support at the Stab bridge, Bent Road, or Poplarville Road.",
      "campingClassification": "none",
      "summary": "Launch at the Stab / KY-1675 bridge and finish at Poplarville Road for the full middle-and-lower Buck Creek gorge chain. Use the Shopville gauge and expect more scraping whenever the creek stays below the same-gauge 100 cfs / 2.0 ft floor.",
      "accessCaveats": [
        "The KY-1675 bridge access is a basic carry-down with no dock, restroom, or developed staging pad.",
        "Bent Road is the only clean public midpoint bailout, but KDFWR says the carry-out is steep and rocky enough that it should not be treated as effortless.",
        "Poplarville is the recommended easier finish. Do not assume the steeper Dykes Bridge access upstream is the normal take-out just because it appears in older descriptions."
      ],
      "watchFor": [
        "Low water near or below about 100 cfs, when rocky runs and lower drops become a long scrape-heavy day.",
        "Higher-water current through the Bent, plus the lower-route drops and the island line where KDFWR recommends staying left.",
        "Fresh strainers, fatigue over the long day, and limited public stop options away from the named accesses."
      ]
    }
  },
  "buck-creek-rainey-road-poplarville-road": {
    "putIn": {
      "id": "rainey-road-fishing-access",
      "name": "Rainey Road Fishing Access",
      "latitude": 37.1792,
      "longitude": -84.4564
    },
    "takeOut": {
      "id": "poplarville-road-fishing-access",
      "name": "Poplarville Road Fishing Access",
      "latitude": 37.0469,
      "longitude": -84.4314
    },
    "logistics": {
      "distanceLabel": "About 17.7 mi",
      "estimatedPaddleTime": "About 6.5 hr to 9.5 hr, longer with low-water dragging, scouting at drops, or a conservative all-day pace",
      "shuttle": "Leave the downstream vehicle at Poplarville Road, then drive back to Rainey Road. This is the full public Buck Creek chain, so check weather, daylight, and the easier Poplarville finish before launching.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and stay off private banks throughout the corridor.",
      "camping": "Treat this as a long day route. KDFWR lists no public camping or overnight support at Rainey Road, the Stab bridge, Bent Road, or Poplarville Road.",
      "campingClassification": "none",
      "summary": "Launch at Rainey Road and finish at Poplarville Road for the full Buck Creek public chain. Use the Shopville gauge and expect a long scrape-prone day whenever the creek stays below the same-gauge 100 cfs / 2.0 ft floor.",
      "accessCaveats": [
        "Rainey Road is a basic carry-down start with no developed amenities.",
        "Stab and Bent are the only clean public midpoint exits, and Bent itself can be a steep rocky carry-out rather than a casual bailout.",
        "Poplarville is the intended easier public finish. Keep vehicles tight in the small roadside lot and clear of local traffic."
      ],
      "watchFor": [
        "Low water near or below about 100 cfs, when the full chain becomes a very long scrape-and-walk day.",
        "Higher post-rain current through the Bent, plus the lower-route drops and left-island line choice closer to Poplarville.",
        "Fresh wood, cumulative fatigue, and private-bank limits over a full-day creek commitment."
      ]
    }
  },
  "upper-salt-river-dry-branch-road-salt-river-ramp-3": {
    "putIn": {
      "id": "dry-branch-road-access",
      "name": "Dry Branch Road Access",
      "latitude": 37.7348,
      "longitude": -84.8637
    },
    "takeOut": {
      "id": "salt-river-ramp-3-access",
      "name": "Salt River Ramp 3 Access",
      "latitude": 37.7562,
      "longitude": -84.8723
    },
    "logistics": {
      "distanceLabel": "About 3.1 mi",
      "estimatedPaddleTime": "About 1 hr to 2.5 hr, longer in low water or with careful scouting at the finish",
      "shuttle": "Leave the downstream vehicle at Salt River Ramp 3 in Harrodsburg, then drive back to Dry Branch Road. Inspect Ramp 3 before launching because it is the mandatory finish above the low-head-dam hazard.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and avoid blocking the narrow parking or nearby private drives.",
      "camping": "Treat this as a short day route. KDFWR lists no public camping or overnight support at either access, and the take-out sits immediately above a low-head dam rather than a campsite corridor.",
      "campingClassification": "none",
      "summary": "Launch at Dry Branch Road and finish at Salt River Ramp 3 for the official short Upper Salt River segment near Harrodsburg. Use the Glensboro gauge and do not drift past the Ramp 3 take-out.",
      "accessCaveats": [
        "Dry Branch Road Access has limited parking and no amenities. Keep the vehicle compact and fully clear of the road edge.",
        "Salt River Ramp 3 is the required finish. KDFWR says a low-head dam sits directly downstream of the access.",
        "Both endpoints sit close to private property and should be treated as simple access footprints rather than general staging areas."
      ],
      "watchFor": [
        "The low-head dam directly downstream of Salt River Ramp 3.",
        "Low water near or below about 130 cfs, when riffles can scrape and slow the short route.",
        "Higher water above about 400 cfs, when the narrow channel pushes faster into the finish approach.",
        "Fresh wood, muddy footing, and private-bank limits away from the named accesses."
      ]
    }
  },
  "upper-salt-river-rice-road-ford-drydock-road": {
    "putIn": {
      "id": "rice-road-ford-access",
      "name": "Rice Road Ford Access",
      "latitude": 37.9904,
      "longitude": -84.9194
    },
    "takeOut": {
      "id": "drydock-road-access",
      "name": "Drydock Road Access",
      "latitude": 38.007,
      "longitude": -84.9813
    },
    "logistics": {
      "distanceLabel": "About 7.5 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with scrape lines, wood scouting, or a slow shuttle day",
      "shuttle": "Stage the take-out at Drydock Road first, then drive back to Rice Road Ford near Lawrenceburg. Both accesses are limited roadside carries, so check footing and parking before launching.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and stay off private banks between the endpoints.",
      "camping": "Treat this as a day route. KDFWR lists no public camping or overnight support at Rice Road Ford or Drydock Road.",
      "campingClassification": "none",
      "summary": "Launch at Rice Road Ford and finish at Drydock Road for the official 7.5-mile Upper Salt segment west of Lawrenceburg. Use the Glensboro gauge and expect a scratchier day whenever the river sits below the 130 to 400 cfs good band.",
      "accessCaveats": [
        "Rice Road Ford parking depends on water level and bank space at the ford. Keep vehicles tight and do not block the crossing.",
        "Drydock Road is a simple carry-down access with no amenities and very little staging room.",
        "Most shoreline between the endpoints is private. Use only the named access areas for launching, landing, and rest stops."
      ],
      "watchFor": [
        "Low water near or below about 130 cfs, when riffles and shallow runs become slower and scratchier.",
        "Higher water above about 400 cfs, when bends and wood become less forgiving.",
        "Fresh strainers after rain, muddy footing, and limited bailout options away from the two named public accesses."
      ]
    }
  },
  "barren-river-tailwater-martinsville": {
    "putIn": {
      "id": "barren-river-lake-tailwater",
      "name": "Barren River Lake Tailwater",
      "latitude": 36.8947,
      "longitude": -86.1348
    },
    "takeOut": {
      "id": "martinsville-ford-claypool-ramp",
      "name": "Martinsville Ford / Claypool Ramp",
      "latitude": 36.9134,
      "longitude": -86.2293
    },
    "logistics": {
      "distanceLabel": "About 17.2 mi",
      "estimatedPaddleTime": "About 5.5 hr to 8.5 hr, longer with low-water dragging, headwind, or fishing stops",
      "shuttle": "Leave the downstream vehicle at Martinsville Ford / Claypool Ramp, then drive back to the Barren River Lake Tailwater launch. This is a full-day lower-Barren commitment, so check weather and daylight before you launch.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect the VPA landowner rules at the midpoint access if you stop there.",
      "camping": "The tailwater launch includes campground amenities, but the route itself should still be treated as a long day float unless you have separate legal overnight plans away from the river. The VPA midpoint specifically prohibits camping, fires, and alcohol.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch below Barren River Lake and finish at Martinsville Ford for the longer tailwater continuation on the lower Barren. Use the Finney stage gauge and expect a slower day whenever the river stays below the 78.0 to 78.5 ft good band.",
      "accessCaveats": [
        "The tailwater launch has campground-style amenities, but Martinsville is a simpler ford-side finish with fewer services.",
        "Barren River VPA #3 is a legal public midpoint access, not a campsite. KDFWR says no camping, fires, alcohol, or swimming there.",
        "This route is long enough that wind, release changes, and low-water drag can matter more than the easy difficulty label suggests."
      ],
      "watchFor": [
        "Low water below about 78.0 ft, when shoals and slow pools can turn the route into a grind.",
        "High water above about 78.5 ft, when bends, bridge current, and the downstream landing become less forgiving.",
        "Broad-river wind, woody debris after rain, boat traffic near the tailwater, and private-bank limits along the corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "barren-river-lake-tailwater",
        "name": "Barren River Lake Tailwater",
        "latitude": 36.8947,
        "longitude": -86.1348,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream launch below Barren River Lake."
      },
      {
        "id": "barren-river-vpa-3",
        "name": "Barren River VPA #3",
        "latitude": 36.9333,
        "longitude": -86.2043,
        "mileFromStart": 13.3,
        "segmentKind": "creek",
        "note": "Mid-route legal access point on voluntary public access land; no camping or fires."
      },
      {
        "id": "martinsville-ford-claypool-ramp",
        "name": "Martinsville Ford / Claypool Ramp",
        "latitude": 36.9134,
        "longitude": -86.2293,
        "mileFromStart": 17.2,
        "segmentKind": "creek",
        "note": "Default downstream finish at the ford-side public ramp."
      }
    ]
  },
  "goose-creek-jacks-tobacco-road": {
    "putIn": {
      "id": "jacks-bowling-branch-bridge-access",
      "name": "Jacks / Bowling Branch Bridge Access",
      "latitude": 37.2052,
      "longitude": -83.7372
    },
    "takeOut": {
      "id": "tobacco-road-bridge-ramp",
      "name": "Tobacco Road Bridge Ramp",
      "latitude": 37.2163,
      "longitude": -83.7175
    },
    "logistics": {
      "distanceLabel": "About 2.2 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low-water scraping or wood scouting",
      "shuttle": "Stage the take-out at Tobacco Road, then drive back upstream to the Jacks / Bowling Branch bridge access. Both accesses are small roadside carry-down sites, so park compactly and fully off the road edge.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed roadside accesses, follow Kentucky boating and PFD rules, and avoid treating private creek banks as public stopovers.",
      "camping": "Treat this as a short day float. KDFWR does not document public camping at either bridge access.",
      "campingClassification": "none",
      "summary": "Launch at Jacks / Bowling Branch and take out at Tobacco Road for the short upper lower-Manchester Goose Creek split. Use the Manchester gauge and expect scraping whenever flows sit below KDFWR's 175 to 514 cfs good band.",
      "accessCaveats": [
        "Both endpoints are simple carry-down bridge accesses with limited unpaved parking and no amenities.",
        "This split starts below the Rawlings / Stinson access so it avoids the upstream low-head-dam warning attached to that Manchester ramp.",
        "Goose Creek is a flashy small stream. Rain-driven rises can change the feel quickly even when the gauge was low earlier in the day."
      ],
      "watchFor": [
        "Low water below about 175 cfs or 7.4 ft, when rock bars, riffles, and dragging become likely.",
        "High water above about 514 cfs or 8.5 ft, when the narrow creek gets pushier and bridge landings are less forgiving.",
        "Strainers, fresh wood after storms, shallow riffles, and slick footing at both bridge accesses.",
        "Private banks and limited roadside parking if someone wants an unscheduled stop."
      ]
    }
  },
  "goose-creek-jacks-dump-hollow": {
    "putIn": {
      "id": "jacks-bowling-branch-bridge-access",
      "name": "Jacks / Bowling Branch Bridge Access",
      "latitude": 37.2052,
      "longitude": -83.7372
    },
    "takeOut": {
      "id": "dump-hollow-ramp",
      "name": "Dump Hollow Ramp",
      "latitude": 37.2127,
      "longitude": -83.704
    },
    "logistics": {
      "distanceLabel": "About 3.0 mi",
      "estimatedPaddleTime": "About 1 hr 15 min to 2 hr 30 min, longer with low-water scraping, wood scouting, or a cautious ford-side finish",
      "shuttle": "Stage the take-out at Dump Hollow, then drive back upstream to the Jacks / Bowling Branch bridge access. Both accesses are small roadside carry-down sites, so park compactly and fully off the road edge.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed roadside accesses, follow Kentucky boating and PFD rules, and avoid treating private creek banks as public stopovers.",
      "camping": "Treat this as a short day float. KDFWR does not document public camping at either bridge access.",
      "campingClassification": "none",
      "summary": "Launch at Jacks / Bowling Branch and take out at Dump Hollow for a short Goose Creek connector that stays below the Rawlings / Stinson low-head-dam warning. Use the Manchester gauge and expect marginal low-water scraping whenever flows sit below KDFWR's 175 to 514 cfs good band.",
      "accessCaveats": [
        "Both endpoints are simple carry-down bridge or ford-side accesses with limited unpaved parking and no amenities.",
        "This split starts below the Rawlings / Stinson access so it avoids the upstream low-head-dam warning attached to that Manchester ramp.",
        "The route was reviewed when the direct Manchester gauge was 191 cfs and 7.32 ft at 2026-07-14 00:45 EDT, which is just above the KDFWR good-flow floor and still vulnerable to scrape-prone shallow bars.",
        "Dump Hollow is a ford-side access. Inspect the landing and vehicle approach before launching because mud, washouts, or local traffic can change the easiest finish."
      ],
      "watchFor": [
        "Low water below about 175 cfs or 7.4 ft, when rock bars, riffles, and dragging become likely.",
        "High water above about 514 cfs or 8.5 ft, when the narrow creek gets pushier and bridge landings are less forgiving.",
        "Strainers, fresh wood after storms, shallow riffles, and slick footing at both accesses.",
        "Private banks and limited roadside parking if someone wants an unscheduled stop."
      ]
    }
  },
  "goose-creek-tobacco-road-dump-hollow": {
    "putIn": {
      "id": "tobacco-road-bridge-ramp",
      "name": "Tobacco Road Bridge Ramp",
      "latitude": 37.2163,
      "longitude": -83.7175
    },
    "takeOut": {
      "id": "dump-hollow-ford-road",
      "name": "Dump Hollow Ford",
      "latitude": 37.2127,
      "longitude": -83.704
    },
    "logistics": {
      "distanceLabel": "About 0.8 mi",
      "estimatedPaddleTime": "About 30 min to 1 hr, longer with low-water scraping, wood, or ford scouting",
      "shuttle": "Stage the take-out at Dump Hollow Ford, then drive back to Tobacco Road. Both accesses are small carry-down roadside sites with limited parking and no amenities.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed roadside accesses, follow Kentucky boating and PFD rules, and avoid treating private creek banks as public stopovers.",
      "camping": "Treat this as a very short day float. KDFWR does not document public camping at Tobacco Road or Dump Hollow.",
      "campingClassification": "none",
      "summary": "Launch at Tobacco Road and take out at Dump Hollow for the shortest Goose Creek split in the lower Manchester chain. Use the Manchester gauge and treat below-band days as scrape-prone even on this short reach.",
      "accessCaveats": [
        "Both endpoints are simple carry-down accesses with limited unpaved parking and no amenities.",
        "Dump Hollow is a ford-style take-out. KDFWR warns it can be difficult or dangerous at high water, so inspect the landing before launching.",
        "Goose Creek is a flashy small stream. Rain-driven rises can change the feel quickly even when the gauge was low earlier in the day."
      ],
      "watchFor": [
        "Low water below about 175 cfs or 7.4 ft, when scraping can dominate a very short trip.",
        "High water above about 514 cfs or 8.5 ft, when the ford-style finish gets less forgiving.",
        "Strainers, fresh wood after storms, and slick footing at the ford exit.",
        "Private banks and limited roadside parking outside the named accesses."
      ]
    }
  },
  "goose-creek-dump-hollow-laurel-branch": {
    "putIn": {
      "id": "dump-hollow-ford-road",
      "name": "Dump Hollow Ford",
      "latitude": 37.2127,
      "longitude": -83.704
    },
    "takeOut": {
      "id": "laurel-branch-road-access",
      "name": "Laurel Branch Road Access",
      "latitude": 37.237,
      "longitude": -83.6703
    },
    "logistics": {
      "distanceLabel": "About 4.8 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with low-water scraping or scouting around wood",
      "shuttle": "Stage the take-out at Laurel Branch Road, then drive back upstream to Dump Hollow Ford. Both accesses are roadside carry-down sites with limited parking and no amenities.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed roadside accesses, follow Kentucky boating and PFD rules, and avoid treating private creek banks as public stopovers.",
      "camping": "Treat this as a day float. KDFWR does not document public camping at Dump Hollow or Laurel Branch.",
      "campingClassification": "none",
      "summary": "Launch at Dump Hollow Ford and take out at Laurel Branch for the lower Goose Creek split below Manchester. Use the Manchester gauge and expect scraping whenever flows sit below KDFWR's 175 to 514 cfs good band.",
      "accessCaveats": [
        "Both endpoints are simple roadside carry-down accesses with limited parking and no amenities.",
        "Dump Hollow works as a ford-style put-in and can be difficult or dangerous at high water, so inspect footing and current before committing.",
        "Goose Creek is a flashy small stream. Rain-driven rises can change the feel quickly even when the gauge was low earlier in the day."
      ],
      "watchFor": [
        "Low water below about 175 cfs or 7.4 ft, when rock bars, riffles, and dragging become likely.",
        "High water above about 514 cfs or 8.5 ft, when the narrow creek gets pushier and roadside landings are less forgiving.",
        "Strainers, fresh wood after storms, shallow riffles, and slick footing at the ford launch.",
        "Private banks and limited roadside parking if someone wants an unscheduled stop."
      ]
    }
  },
  "goose-creek-jacks-laurel-branch": {
    "putIn": {
      "id": "jacks-bowling-branch-bridge-access",
      "name": "Jacks / Bowling Branch Bridge Access",
      "latitude": 37.2052,
      "longitude": -83.7372
    },
    "takeOut": {
      "id": "laurel-branch-road-access",
      "name": "Laurel Branch Road Access",
      "latitude": 37.237,
      "longitude": -83.6703
    },
    "logistics": {
      "distanceLabel": "About 7.8 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with low-water scraping or scouting around wood",
      "shuttle": "Stage the take-out at Laurel Branch Road, then drive back upstream to the Jacks / Bowling Branch bridge access. Parking at both ends is limited, so keep vehicles compact and fully off the road edge.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed roadside accesses, follow Kentucky boating and PFD rules, and avoid treating private creek banks as public stopovers.",
      "camping": "Treat this as a day float. KDFWR does not document public camping at Jacks, Tobacco Road, Dump Hollow, or Laurel Branch, and the route relies on small roadside carry-down accesses rather than overnight sites.",
      "campingClassification": "none",
      "summary": "Launch at Jacks / Bowling Branch and take out at Laurel Branch for the cleaner lower-Manchester Goose Creek route. Use the Manchester gauge and expect scraping whenever flows sit below KDFWR's 175 to 514 cfs good band.",
      "accessCaveats": [
        "All four accesses in this corridor are simple carry-down or ford-style roadside sites with limited parking and no amenities.",
        "Dump Hollow works as a mid-route bailout, but KDFWR warns the ford can be difficult or dangerous at high water.",
        "This combined route intentionally starts below the Rawlings / Stinson access so it avoids the low-head-dam warning attached to that upstream point.",
        "Goose Creek is a flashy small stream. Rain-driven rises can change the feel quickly even when the gauge was low earlier in the day."
      ],
      "watchFor": [
        "Low water below about 175 cfs or 7.4 ft, when rock bars, riffles, and dragging become likely.",
        "High water above about 514 cfs or 8.5 ft, when the narrow creek gets pushier and roadside landings are less forgiving.",
        "Strainers, fresh wood after storms, shallow riffles, and slick footing at the bridge and ford accesses.",
        "Private banks, limited bailout parking, and fast weather swings in a narrow eastern Kentucky drainage."
      ]
    },
    "accessPoints": [
      {
        "id": "jacks-bowling-branch-bridge-access",
        "name": "Jacks / Bowling Branch Bridge Access",
        "latitude": 37.2052,
        "longitude": -83.7372,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access below the Rawlings / Stinson low-head-dam warning."
      },
      {
        "id": "tobacco-road-bridge-ramp",
        "name": "Tobacco Road Bridge Ramp",
        "latitude": 37.2163,
        "longitude": -83.7175,
        "mileFromStart": 2.2,
        "segmentKind": "creek",
        "note": "Intermediate bridge access for the upper short split."
      },
      {
        "id": "dump-hollow-ford-road",
        "name": "Dump Hollow Ford",
        "latitude": 37.2127,
        "longitude": -83.704,
        "mileFromStart": 3,
        "segmentKind": "creek",
        "note": "Ford-style intermediate access; verify high-water road and turnaround conditions."
      },
      {
        "id": "laurel-branch-road-access",
        "name": "Laurel Branch Road Access",
        "latitude": 37.237,
        "longitude": -83.6703,
        "mileFromStart": 7.8,
        "segmentKind": "creek",
        "note": "Default downstream access for the full lower Goose Creek corridor."
      }
    ]
  },
  "south-fork-kentucky-river-rocky-branch-fish-creek": {
    "putIn": {
      "id": "rocky-branch-road-access",
      "name": "Rocky Branch Road Access",
      "latitude": 37.3206,
      "longitude": -83.6648
    },
    "takeOut": {
      "id": "fish-creek-boat-ramp",
      "name": "Fish Creek Boat Ramp",
      "latitude": 37.4906,
      "longitude": -83.6894
    },
    "logistics": {
      "distanceLabel": "About 26.9 mi",
      "estimatedPaddleTime": "About 8 hr to 11 hr, longer with low water, fishing, or scouting",
      "shuttle": "Stage the take-out at Fish Creek Boat Ramp north of Booneville, then drive back to Rocky Branch Road Access. Rocky Branch is a simple carry-down put-in, so inspect both ends first and make sure the group is prepared for a long downstream commitment.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day roadside parking limits.",
      "camping": "Treat this as a committed day trip. KDFWR lists no camping at Rocky Branch, Kay Wood, or Fish Creek, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Rocky Branch Road Access and take out about 26.9 miles downstream at Fish Creek Boat Ramp for a long lower South Fork Kentucky River float. KDFWR gives a good Booneville gauge band of 350 to 900 cfs, or 4.8 to 6.0 ft.",
      "accessCaveats": [
        "Rocky Branch is a carry-down-only gravel access with limited parking and no developed amenities.",
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
        "id": "rocky-branch-road-access",
        "name": "Rocky Branch Road Access",
        "latitude": 37.3206,
        "longitude": -83.6648,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for this long lower-chain route."
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
        "note": "Intermediate carry-down access."
      },
      {
        "id": "hacker-branch-road-access",
        "name": "Hacker Branch Road Access",
        "latitude": 37.3743,
        "longitude": -83.6708,
        "mileFromStart": 10.5,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "upper-wolf-creek-ramp",
        "name": "Upper Wolf Creek Ramp",
        "latitude": 37.3964,
        "longitude": -83.6767,
        "mileFromStart": 13.4,
        "segmentKind": "creek",
        "note": "Developed ramp access in the lower corridor."
      },
      {
        "id": "kay-wood-road-access",
        "name": "Kay Wood Road Access",
        "latitude": 37.4594,
        "longitude": -83.6509,
        "mileFromStart": 19,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "fish-creek-boat-ramp",
        "name": "Fish Creek Boat Ramp",
        "latitude": 37.4906,
        "longitude": -83.6894,
        "mileFromStart": 26.9,
        "segmentKind": "creek",
        "note": "Default take-out for this route."
      }
    ]
  },
  "south-fork-kentucky-river-rocky-branch-kay-wood": {
    "putIn": {
      "id": "rocky-branch-road-access",
      "name": "Rocky Branch Road Access",
      "latitude": 37.3206,
      "longitude": -83.6648
    },
    "takeOut": {
      "id": "kay-wood-road-access",
      "name": "Kay Wood Road Access",
      "latitude": 37.4594,
      "longitude": -83.6509
    },
    "logistics": {
      "distanceLabel": "About 19.0 mi",
      "estimatedPaddleTime": "About 6 hr to 8.5 hr, longer with low water, fishing, or scouting",
      "shuttle": "Stage the take-out at Kay Wood Road Access, then drive back to Rocky Branch Road Access. Inspect both carry-down landings first because limited parking, mud, and repeated low-water shoals make this a full-day South Fork commitment.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day ramp or roadside parking limits.",
      "camping": "Treat this as a day trip. KDFWR lists no camping at Rocky Branch, Cedar Valley, Bishop Bend, Hacker Branch, Upper Wolf Creek, or Kay Wood, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Rocky Branch Road Access and take out about 19.0 miles downstream at Kay Wood Road Access for a long middle-to-lower South Fork Kentucky River float. KDFWR gives a good Booneville gauge band of 350 to 900 cfs, or 4.8 to 6.0 ft.",
      "accessCaveats": [
        "Rocky Branch is a gravel-and-dirt canoe and kayak access with limited parking and no amenities.",
        "Kay Wood is a carry-down-only access with roadside-style unpaved parking and no amenities.",
        "The current Booneville gauge reading was above the official good band during this run, so expect faster current, muddier landings, and a longer day than the mileage alone suggests.",
        "Stay with the named public access points and do not assume side banks, bars, or private-adjacent ground are legal stopping points."
      ],
      "watchFor": [
        "Low water below 350 cfs or 4.8 ft, when shallow shoals, rock bars, and dragging become more likely over a long day.",
        "High water above 900 cfs or 6.0 ft, when the broad river moves faster and muddy landings become less forgiving around bends and wood.",
        "Wood, strainers, mud banks, occasional riffles, private banks outside the access sites, and fatigue from repeated line scouting."
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
        "note": "Default put-in for this middle-to-lower South Fork chain."
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
        "note": "Intermediate carry-down access."
      },
      {
        "id": "hacker-branch-road-access",
        "name": "Hacker Branch Road Access",
        "latitude": 37.3743,
        "longitude": -83.6708,
        "mileFromStart": 10.5,
        "segmentKind": "creek",
        "note": "Intermediate carry-down access."
      },
      {
        "id": "upper-wolf-creek-ramp",
        "name": "Upper Wolf Creek Ramp",
        "latitude": 37.3964,
        "longitude": -83.6767,
        "mileFromStart": 13.4,
        "segmentKind": "creek",
        "note": "Developed ramp access in the lower corridor."
      },
      {
        "id": "kay-wood-road-access",
        "name": "Kay Wood Road Access",
        "latitude": 37.4594,
        "longitude": -83.6509,
        "mileFromStart": 19,
        "segmentKind": "creek",
        "note": "Default take-out for this route."
      }
    ]
  },
  "green-river-american-legion-lynn-camp-creek": {
    "putIn": {
      "id": "american-legion-park-ramp",
      "name": "American Legion Park Ramp",
      "latitude": 37.2441,
      "longitude": -85.4795
    },
    "takeOut": {
      "id": "lynn-camp-creek-vpa-1",
      "name": "Lynn Camp Creek Ramp",
      "latitude": 37.3533,
      "longitude": -85.7098
    },
    "logistics": {
      "distanceLabel": "About 34.9 mi",
      "estimatedPaddleTime": "About 9.5 hr to 12.5 hr, longer with low water, headwind, or slower group pacing",
      "shuttle": "Stage the take-out at Lynn Camp Creek Ramp, then drive back to American Legion Park below Highway 417. This is a true dawn-to-dusk Green River day, so inspect both accesses first and leave serious daylight margin before committing.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect the public-use rules at Lynn Camp Creek.",
      "camping": "Greensburg supports nearby overnights better than on-route camping. KDFWR lists no camping at American Legion, Glenview, or Lynn Camp, and private banks between them should not be treated as legal campsites even though the mileage is long.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at American Legion Park and continue all the way to Lynn Camp Creek Ramp for one of the longest current Greensburg-gauge routes in the app. Use the Greensburg gauge and expect a very long, scrape-prone day whenever the stage stays below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "American Legion Park uses a graded muddy and gravel bank below Highway 417 rather than a clean concrete city ramp. Save some energy for a messier launch routine.",
        "Greensburg City Ramp is the clean early bailout, and Glenview Road Carrydown is the last clean midpoint bailout before the lower Lynn Camp commitment.",
        "Lynn Camp Creek VPA #1 is privately owned but open to the public through KDFWR. Continuing access depends on respectful parking and staying within the access footprint.",
        "The Lynn Camp ramp is steep and KDFWR says it is better used as a carry-down site, especially when the river is low."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when exposed shoals and long slow pools can turn this into an all-day grind.",
        "High water above about 1.75 ft, when bends, private-bank edges, and the steep Lynn Camp finish become less forgiving.",
        "Broad-river wind, exposed sun, limited legal bailout options after Glenview, and fresh wood after rain.",
        "Slick footing at the muddy American Legion launch, the Glenview bailout, and the steep Lynn Camp ramp at the finish."
      ]
    },
    "accessPoints": [
      {
        "id": "american-legion-park-ramp",
        "name": "American Legion Park Ramp",
        "latitude": 37.2441,
        "longitude": -85.4795,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Full upper-Greensburg continuation start."
      },
      {
        "id": "greensburg-city-ramp",
        "name": "Greensburg City Ramp",
        "latitude": 37.2581,
        "longitude": -85.5057,
        "mileFromStart": 2,
        "segmentKind": "creek",
        "note": "Town bailout and the last easy public landing before the Glenview reach."
      },
      {
        "id": "glenview-road-carrydown",
        "name": "Glenview Road Carrydown",
        "latitude": 37.291,
        "longitude": -85.5913,
        "mileFromStart": 15.7,
        "segmentKind": "creek",
        "note": "Last clean midpoint bailout before the lower Lynn Camp commitment."
      },
      {
        "id": "lynn-camp-creek-vpa-1",
        "name": "Lynn Camp Creek Ramp",
        "latitude": 37.3533,
        "longitude": -85.7098,
        "mileFromStart": 34.9,
        "segmentKind": "creek",
        "note": "Default downstream finish at the steep publicly open private ramp."
      }
    ]
  },
  "green-river-roachville-glenview-road": {
    "putIn": {
      "id": "roachville-ford",
      "name": "Roachville Ford",
      "latitude": 37.2353,
      "longitude": -85.4241
    },
    "takeOut": {
      "id": "glenview-road-carrydown",
      "name": "Glenview Road Carrydown",
      "latitude": 37.291,
      "longitude": -85.5913
    },
    "logistics": {
      "distanceLabel": "About 24.8 mi",
      "estimatedPaddleTime": "About 7.5 hr to 10.5 hr, longer with low water, fishing stops, or a slower shuttle day",
      "shuttle": "Stage the take-out at Glenview Road, then drive back to Roachville Ford via Thunder Road. This is a real full-day Green River commitment, so keep both access areas compact and leave daylight margin for the no-amenity finish.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and obey any local or landowner signage at Glenview.",
      "camping": "Treat this as a day trip with Greensburg corridor lodging support rather than route camping. Greensburg City Park cabins and town services sit on the corridor, but KDFWR lists no camping at Roachville or Glenview and private banks should not be treated as legal campsites.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Roachville Ford and continue to Glenview Road for the longest current Upper Green continuation above Lynn Camp. Use the Greensburg gauge and expect a slower, more scrape-prone day whenever the stage stays below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "Roachville Ford is a low-water ford with limited roadside parking and may require brief carry or drag moves during very low flows.",
        "Russell Ford, American Legion Park, and Greensburg City Ramp all sit on the corridor and can shorten the day if conditions or group energy change, but this route assumes the full Roachville-to-Glenview chain.",
        "Glenview Road Carrydown ends in the water and is surrounded by private land. Use only the obvious public road-end access and obey posted signs.",
        "KDFWR treats the named endpoints as public, but the banks between them are not general-use public parks. Stay with the named access points."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when shoals, sticky mud, and slower pools can turn this into a grind.",
        "High water above about 1.75 ft, when current at bends and the Glenview finish gets less forgiving.",
        "Islands, chutes, bridge-adjacent current, private-bank limits, broad-river wind, and fresh wood after rain.",
        "Slippery gravel or mud at Roachville and steep or slick footing at the Glenview road-end carrydown."
      ]
    },
    "accessPoints": [
      {
        "id": "roachville-ford",
        "name": "Roachville Ford",
        "latitude": 37.2353,
        "longitude": -85.4241,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default full-corridor put-in."
      },
      {
        "id": "russell-ford-access",
        "name": "Russell Ford Access",
        "latitude": 37.2738,
        "longitude": -85.4784,
        "mileFromStart": 6.6,
        "segmentKind": "creek",
        "note": "Early legal access option if the upper miles feel slower than planned."
      },
      {
        "id": "american-legion-park-ramp",
        "name": "American Legion Park Ramp",
        "latitude": 37.2441,
        "longitude": -85.4795,
        "mileFromStart": 8.9,
        "segmentKind": "creek",
        "note": "Greensburg-corridor park access and shorter bailout point."
      },
      {
        "id": "greensburg-city-ramp",
        "name": "Greensburg City Ramp",
        "latitude": 37.2581,
        "longitude": -85.5057,
        "mileFromStart": 11.1,
        "segmentKind": "creek",
        "note": "Town access option for a shorter route choice and the cleanest legal bailout."
      },
      {
        "id": "glenview-road-carrydown",
        "name": "Glenview Road Carrydown",
        "latitude": 37.291,
        "longitude": -85.5913,
        "mileFromStart": 24.8,
        "segmentKind": "creek",
        "note": "Default downstream finish at the public road-end carrydown."
      }
    ]
  },
  "green-river-tailwater-roachville-ford": {
    "putIn": {
      "id": "green-river-lake-tailwater",
      "name": "Green River Lake Tailwater",
      "latitude": 37.2416,
      "longitude": -85.3441
    },
    "takeOut": {
      "id": "roachville-ford",
      "name": "Roachville Ford",
      "latitude": 37.2353,
      "longitude": -85.4241
    },
    "logistics": {
      "distanceLabel": "About 12.5 mi",
      "estimatedPaddleTime": "About 4 hr to 6.5 hr, longer with low-water dragging, fishing stops, or headwind",
      "shuttle": "Stage the downstream vehicle at Roachville Ford, then drive back to the Green River Lake Tailwater ramp. Check the ford landing before launching because lower water can make the finish muddier and slower than the mileage suggests.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and stay off private banks between the endpoints.",
      "camping": "Treat this as a day route. KDFWR does not document public camping or normal overnight support at the Tailwater ramp or Roachville Ford.",
      "campingClassification": "none",
      "summary": "Launch at the public Green River Lake Tailwater ramp and finish at Roachville Ford for the first full Upper Green split. Use the Greensburg gauge and expect a scrape-prone day whenever the river sits below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "KDFWR says boats are not permitted upstream of the Tailwater ramp. Launch downstream only and do not drift back toward the dam area.",
        "The first shoal lies about a quarter mile below the Highway 55 bridge at the launch, so treat the opening stretch as moving river rather than flat tailwater idling.",
        "Roachville Ford is a low-water gravel ford with limited roadside parking and no amenities. Lower stages can require brief carry or drag moves at the finish.",
        "Most shoreline between the named accesses is private and should not be treated as a casual stop or backup exit."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when shoals, sticky mud, and dragging become more common.",
        "High water above about 1.75 ft, when current at bends and the ford landing gets less forgiving.",
        "Fresh wood after rain, bridge-adjacent current, and the first shoal below Highway 55."
      ]
    }
  },
  "green-river-tailwater-american-legion": {
    "putIn": {
      "id": "green-river-lake-tailwater",
      "name": "Green River Lake Tailwater",
      "latitude": 37.2416,
      "longitude": -85.3441
    },
    "takeOut": {
      "id": "american-legion-park-ramp",
      "name": "American Legion Park Ramp",
      "latitude": 37.2441,
      "longitude": -85.4795
    },
    "logistics": {
      "distanceLabel": "About 21.4 mi",
      "estimatedPaddleTime": "About 6.5 hr to 9.5 hr, longer with low water, fishing stops, or scouting at intermediate landings",
      "shuttle": "Stage the downstream vehicle at American Legion Park Ramp, then drive back to the Green River Lake Tailwater launch. This is a full Upper Green day, so confirm daylight, weather, and group pace before committing to the entire distance.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and stay off private banks between the endpoints.",
      "camping": "Treat this as a long day route. KDFWR does not document public camping or normal overnight support at the Tailwater ramp, Roachville Ford, Russell Ford, or American Legion Park.",
      "campingClassification": "none",
      "summary": "Launch at the public Green River Lake Tailwater ramp and finish at American Legion Park for the longer Upper Green continuation. Use the Greensburg gauge and expect a slower day whenever the river sits below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "KDFWR says boats are not permitted upstream of the Tailwater ramp. Launch downstream only and do not drift back toward the dam area.",
        "Roachville Ford is the clearest first midpoint bailout if the opening miles are slower than planned, and Russell Ford is the last major upstream public landing before the American Legion finish.",
        "American Legion Park is a simpler unpaved park access than the Greensburg City Ramp farther downstream. Finish efficiently and watch footing at the landing.",
        "Most shoreline between the named accesses is private and should not be treated as a casual stop or backup exit."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when shoals, mud edges, and dragging become more likely across a long day.",
        "High water above about 1.75 ft, when current through islands, chutes, and the park landing gets less forgiving.",
        "Fresh wood after rain, the first shoal below Highway 55, and take-out confusion around the Russell and American Legion access sequence."
      ]
    },
    "accessPoints": [
      {
        "id": "green-river-lake-tailwater",
        "name": "Green River Lake Tailwater",
        "latitude": 37.2416,
        "longitude": -85.3441,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream launch below the no-upstream-boating tailwater zone."
      },
      {
        "id": "roachville-ford",
        "name": "Roachville Ford",
        "latitude": 37.2353,
        "longitude": -85.4241,
        "mileFromStart": 12.5,
        "segmentKind": "creek",
        "note": "Mid-route legal bailout at the low-water ford."
      },
      {
        "id": "russell-ford-access",
        "name": "Russell Ford Access",
        "latitude": 37.2738,
        "longitude": -85.4784,
        "mileFromStart": 19.1,
        "segmentKind": "creek",
        "note": "Late-route developed bailout on river left before the final park finish."
      },
      {
        "id": "american-legion-park-ramp",
        "name": "American Legion Park Ramp",
        "latitude": 37.2441,
        "longitude": -85.4795,
        "mileFromStart": 21.4,
        "segmentKind": "creek",
        "note": "Default downstream finish at the public park ramp."
      }
    ]
  },
  "green-river-tailwater-russell-ford": {
    "putIn": {
      "id": "green-river-lake-tailwater",
      "name": "Green River Lake Tailwater",
      "latitude": 37.2416,
      "longitude": -85.3441
    },
    "takeOut": {
      "id": "russell-ford-access",
      "name": "Russell Ford Access",
      "latitude": 37.2738,
      "longitude": -85.4784
    },
    "logistics": {
      "distanceLabel": "About 19.1 mi",
      "estimatedPaddleTime": "About 6 hr to 9 hr, longer with low-water dragging, fishing stops, or scouting at the take-out",
      "shuttle": "Stage the downstream vehicle at Russell Ford, then drive back to the Green River Lake Tailwater ramp. This is a real full-day upper-Green commitment, so check daylight, wind, and the Russell landing before launching.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and stay off private banks between the endpoints.",
      "camping": "Treat this as a long day route. KDFWR does not document public camping or normal overnight support at the Tailwater ramp, Roachville Ford, or Russell Ford.",
      "campingClassification": "none",
      "summary": "Launch at the public Green River Lake Tailwater ramp and finish at Russell Ford for the longer Upper Green tailwater continuation. Use the Greensburg gauge and expect a slower day whenever the river sits below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "KDFWR says boats are not permitted upstream of the Tailwater ramp. Launch downstream only and do not drift back toward the dam area.",
        "Roachville Ford is the clearest midpoint bailout if the first twelve miles are slower than planned, but it is still a muddy low-water ford rather than a polished ramp.",
        "Russell Ford sits on river left in the middle of a shoal, and KDFWR warns unfamiliar paddlers can drift past it if they stay in the main right channel.",
        "Most shoreline between the named accesses is private and should not be treated as a casual stop or backup exit."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when shoals, mud edges, and dragging become more likely across a long day.",
        "High water above about 1.75 ft, when current through islands, chutes, and the Russell landing gets less forgiving.",
        "Fresh wood after rain, the first shoal below Highway 55, and take-out confusion at Russell Ford."
      ]
    },
    "accessPoints": [
      {
        "id": "green-river-lake-tailwater",
        "name": "Green River Lake Tailwater",
        "latitude": 37.2416,
        "longitude": -85.3441,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream launch below the no-upstream-boating tailwater zone."
      },
      {
        "id": "roachville-ford",
        "name": "Roachville Ford",
        "latitude": 37.2353,
        "longitude": -85.4241,
        "mileFromStart": 12.5,
        "segmentKind": "creek",
        "note": "Mid-route legal bailout at the low-water ford."
      },
      {
        "id": "russell-ford-access",
        "name": "Russell Ford Access",
        "latitude": 37.2738,
        "longitude": -85.4784,
        "mileFromStart": 19.1,
        "segmentKind": "creek",
        "note": "Default downstream finish on river left in the shoal."
      }
    ]
  },
  "green-river-tailwater-greensburg-city-ramp": {
    "putIn": {
      "id": "green-river-lake-tailwater",
      "name": "Green River Lake Tailwater",
      "latitude": 37.2416,
      "longitude": -85.3441
    },
    "takeOut": {
      "id": "greensburg-city-ramp",
      "name": "Greensburg City Ramp",
      "latitude": 37.2581,
      "longitude": -85.5057
    },
    "logistics": {
      "distanceLabel": "About 23.4 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr, longer with low water, fishing stops, or slower loading at the city ramp",
      "shuttle": "Stage the take-out at Greensburg City Ramp, then drive back to the Green River Lake Tailwater launch. This is a full Upper Green day, so confirm daylight, weather, and group pace before committing to the full distance.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and obey city-park signage at Greensburg.",
      "camping": "Greensburg supports endpoint overnights better than on-route camping. KDFWR says the city-ramp take-out sits in a park with cabins and nearby RV hookups, but private banks between the accesses should not be treated as legal overnight stops.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at the public Green River Lake Tailwater ramp and continue to Greensburg City Ramp for the full Upper Green public route. Use the Greensburg gauge and expect a very long scrape-prone day whenever the river sits below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "KDFWR says boats are not permitted upstream of the Tailwater ramp. Launch downstream only and do not drift back toward the dam area.",
        "Roachville Ford, Russell Ford, and American Legion Park all lie on the corridor and can shorten the day if pace or conditions change, but this route assumes the full Tailwater-to-Greensburg commitment.",
        "Greensburg City Ramp is the cleanest landing in this family, but it still sits in an active public city park with cabins, anglers, and other local users. Keep the ramp area clear and efficient.",
        "Most shoreline between the named accesses is private and should not be treated as a casual stop or backup exit."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when shoals, mud edges, and dragging become more likely across a very long day.",
        "High water above about 1.75 ft, when current at bends and landings becomes less forgiving for casual paddlers.",
        "Fresh wood after rain, the first shoal below Highway 55, islands and chutes above Russell Ford, and broad-river wind on exposed pools."
      ]
    },
    "accessPoints": [
      {
        "id": "green-river-lake-tailwater",
        "name": "Green River Lake Tailwater",
        "latitude": 37.2416,
        "longitude": -85.3441,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream launch below the no-upstream-boating tailwater zone."
      },
      {
        "id": "roachville-ford",
        "name": "Roachville Ford",
        "latitude": 37.2353,
        "longitude": -85.4241,
        "mileFromStart": 12.5,
        "segmentKind": "creek",
        "note": "Early legal bailout at the low-water ford."
      },
      {
        "id": "russell-ford-access",
        "name": "Russell Ford Access",
        "latitude": 37.2738,
        "longitude": -85.4784,
        "mileFromStart": 19.1,
        "segmentKind": "creek",
        "note": "Mid-route legal bailout on river left in the shoal."
      },
      {
        "id": "american-legion-park-ramp",
        "name": "American Legion Park Ramp",
        "latitude": 37.2441,
        "longitude": -85.4795,
        "mileFromStart": 21.4,
        "segmentKind": "creek",
        "note": "Late legal bailout at the public park ramp below Highway 417."
      },
      {
        "id": "greensburg-city-ramp",
        "name": "Greensburg City Ramp",
        "latitude": 37.2581,
        "longitude": -85.5057,
        "mileFromStart": 23.4,
        "segmentKind": "creek",
        "note": "Default downstream finish at the paved city-ramp take-out."
      }
    ]
  },
  "green-river-roachville-russell-ford": {
    "putIn": {
      "id": "roachville-ford",
      "name": "Roachville Ford",
      "latitude": 37.2353,
      "longitude": -85.4241
    },
    "takeOut": {
      "id": "russell-ford-access",
      "name": "Russell Ford Access",
      "latitude": 37.2738,
      "longitude": -85.4784
    },
    "logistics": {
      "distanceLabel": "About 6.6 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4.5 hr, longer with low-water dragging, fishing stops, or scouting around the shoals",
      "shuttle": "Stage the downstream vehicle at Russell Ford first, then drive back to Roachville Ford. The shuttle is simple, but both accesses are limited roadside or gravel-bar setups with no amenities.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and stay off private banks between the endpoints.",
      "camping": "Treat this as a day route. KDFWR does not document camping or normal overnight support at Roachville or Russell Ford.",
      "campingClassification": "none",
      "summary": "Launch at Roachville Ford and take out at Russell Ford for the manageable 6.6-mile Upper Green float. Use the Greensburg gauge and expect a slower, scrape-prone ride whenever the stage sits below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "Roachville Ford is a low-water gravel ford with limited roadside parking and no services. Be ready for muddy footing and brief carry or drag moves at lower water.",
        "Russell Ford sits in the middle of a shoal on river left. KDFWR warns that paddlers unfamiliar with the route can drift past the take-out if they stay in the main right channel.",
        "Both endpoints are public, but most shoreline between them is private and should not be treated as a casual stop or backup exit."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when shoals, sticky mud, and dragging become more common.",
        "High water above about 1.75 ft, when current through islands, chutes, and bends gets pushier.",
        "Fresh wood, bridge-adjacent current, and take-out confusion at Russell Ford."
      ]
    }
  },
  "green-river-roachville-american-legion": {
    "putIn": {
      "id": "roachville-ford",
      "name": "Roachville Ford",
      "latitude": 37.2353,
      "longitude": -85.4241
    },
    "takeOut": {
      "id": "american-legion-park-ramp",
      "name": "American Legion Park Ramp",
      "latitude": 37.2441,
      "longitude": -85.4795
    },
    "logistics": {
      "distanceLabel": "About 8.9 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with low-water dragging, fishing stops, or route-finding around the shoals",
      "shuttle": "Stage the take-out at American Legion Park first, then drive back to Roachville Ford. The shuttle is simple, but both accesses are compact and the launch can be muddy at lower water.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and stay off private banks between the endpoints.",
      "camping": "Treat this as a day route. KDFWR does not document camping or normal overnight support at Roachville Ford or American Legion Park.",
      "campingClassification": "none",
      "summary": "Launch at Roachville Ford and finish at American Legion Park for a longer Upper Green split into the Greensburg corridor. Use the Greensburg gauge and expect more scraping whenever the stage sits near or below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "Roachville Ford is a low-water gravel ford with limited roadside parking and no services. Be ready for muddy footing and brief carry or drag moves at lower water.",
        "Russell Ford sits on the corridor as the clearest early bailout if the islands and chutes are slower than planned.",
        "American Legion Park is the intended public finish, but the graded gravel-and-mud bank can be slick and busy with local anglers or park users.",
        "The named endpoints are public, but most shoreline between them is private and should not be treated as a casual stop or backup exit."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when shoals, sticky mud, and dragging become more common.",
        "High water above about 1.75 ft, when current through islands, chutes, and the park approach gets pushier.",
        "Fresh wood after rain, take-out confusion at Russell Ford if you plan to reassess there, and bridge-adjacent current near Greensburg."
      ]
    },
    "accessPoints": [
      {
        "id": "roachville-ford",
        "name": "Roachville Ford",
        "latitude": 37.2353,
        "longitude": -85.4241,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream launch at the low-water ford."
      },
      {
        "id": "russell-ford-access",
        "name": "Russell Ford Access",
        "latitude": 37.2738,
        "longitude": -85.4784,
        "mileFromStart": 6.6,
        "segmentKind": "creek",
        "note": "Early legal bailout if the upper miles are slower than expected."
      },
      {
        "id": "american-legion-park-ramp",
        "name": "American Legion Park Ramp",
        "latitude": 37.2441,
        "longitude": -85.4795,
        "mileFromStart": 8.9,
        "segmentKind": "creek",
        "note": "Default downstream finish at the public park ramp below Highway 417."
      }
    ]
  },
  "green-river-roachville-greensburg-city-ramp": {
    "putIn": {
      "id": "roachville-ford",
      "name": "Roachville Ford",
      "latitude": 37.2353,
      "longitude": -85.4241
    },
    "takeOut": {
      "id": "greensburg-city-ramp",
      "name": "Greensburg City Ramp",
      "latitude": 37.2581,
      "longitude": -85.5057
    },
    "logistics": {
      "distanceLabel": "About 11.1 mi",
      "estimatedPaddleTime": "About 4.5 hr to 7 hr, longer with low water, fishing stops, or slow loading at the city ramp",
      "shuttle": "Stage the take-out at Greensburg City Ramp, then drive back to Roachville Ford. Use the south side of Roachville via Thunder Road for the shorter shuttle, and leave extra daylight because this full upper-Green day is noticeably longer than the split floats.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and obey city-park signage at Greensburg.",
      "camping": "Greensburg supports endpoint overnights better than on-route camping. KDFWR says the city-ramp take-out sits in a park with cabins, nearby RV hookups, and shuttle help, but private banks between the accesses should not be treated as legal overnight stops.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Roachville Ford and continue to Greensburg City Ramp for the full upper-Green public float. Use the Greensburg gauge and expect a scrape-prone day whenever the river sits below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "Roachville Ford is a low-water ford with limited roadside parking and may require brief carry or drag moves during very low flows.",
        "Russell Ford and American Legion Park both lie on the corridor and can shorten the day if conditions or group energy change, but this route assumes the full Roachville-to-Greensburg float.",
        "Greensburg City Ramp is the easiest landing in this family, but it still sits in a public city park with cabins, anglers, and other local users. Keep the ramp area clear and efficient.",
        "KDFWR notes private-property concerns around Green River accesses. Use the named public accesses only and avoid treating intermediate banks as public."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when shoals, mud edges, and dragging become more likely.",
        "High water above about 1.75 ft, when current at bends and landings becomes less forgiving for casual paddlers.",
        "Bridge-adjacent current, anglers, woody debris after rain, and broad-river wind on exposed pools.",
        "City-park activity at Greensburg and limited legal stopping options away from the named accesses."
      ]
    }
  },
  "green-river-russell-ford-american-legion": {
    "putIn": {
      "id": "russell-ford-access",
      "name": "Russell Ford Access",
      "latitude": 37.2738,
      "longitude": -85.4784
    },
    "takeOut": {
      "id": "american-legion-park-ramp",
      "name": "American Legion Park Ramp",
      "latitude": 37.2441,
      "longitude": -85.4795
    },
    "logistics": {
      "distanceLabel": "About 2.3 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low-water dragging, fishing stops, or a slower group",
      "shuttle": "Stage the take-out at American Legion Park first, then drive back to Russell Ford on Ralph Vaughn Road. The shuttle is short, but both accesses are compact and can be busy with local users.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and stay off private banks between the endpoints.",
      "camping": "Treat this as a day route. KDFWR does not document camping or normal overnight support at Russell Ford or American Legion Park.",
      "campingClassification": "none",
      "summary": "Launch at Russell Ford and finish at American Legion Park for the short 2.3-mile Upper Green split. Use the Greensburg gauge and expect a scrape-prone ride whenever the stage sits below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "Russell Ford is a simple gravel-bar carry-down with limited unpaved parking and no amenities.",
        "American Legion Park is the intended public finish on this split. Keep the ramp area clear for anglers and other park users.",
        "Even on this short route, private banks between the endpoints should not be treated as casual take-outs."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when shallow shoals and muddy edges become more noticeable.",
        "High water above about 1.75 ft, when current at bends and the park landing gets less forgiving.",
        "Bridge-adjacent current, fresh wood after rain, and other users at both public accesses."
      ]
    }
  },
  "green-river-russell-ford-greensburg-city-ramp": {
    "putIn": {
      "id": "russell-ford-access",
      "name": "Russell Ford Access",
      "latitude": 37.2738,
      "longitude": -85.4784
    },
    "takeOut": {
      "id": "greensburg-city-ramp",
      "name": "Greensburg City Ramp",
      "latitude": 37.2581,
      "longitude": -85.5057
    },
    "logistics": {
      "distanceLabel": "About 4.5 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with fishing stops, shoal scouting, or low water",
      "shuttle": "Stage the take-out at Greensburg City Ramp, then drive back to Russell Ford on Ralph Vaughn Road. The shuttle is short, but Russell Ford parking is limited and Greensburg can have city-park traffic.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and obey city-park signage at Greensburg.",
      "camping": "Greensburg supports endpoint overnights better than on-route camping. KDFWR says the city-ramp take-out sits in a park with cabins, nearby RV hookups, and shuttle help, but private banks between the accesses should not be treated as legal overnight stops.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Russell Ford and take out about 4.5 miles downstream at Greensburg City Ramp for the full upper-Green public float. Use the Greensburg gauge and expect a scrape-prone day whenever the river sits below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "Russell Ford is a carry-down gravel-bar access with limited unpaved parking and no amenities. Keep the approach clear for other users.",
        "Greensburg City Ramp is the easier landing, but it sits in a public city park with cabins, anglers, and other local users. Keep the ramp area clear and efficient.",
        "American Legion Park lies between the endpoints and can shorten the day if conditions or group energy change, but this route assumes the full Russell-to-Greensburg float.",
        "KDFWR notes private-property concerns around Pool 6 access sites. Use the named public accesses only and avoid treating intermediate banks as public."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when shoals, mud edges, and dragging become more likely.",
        "High water above about 1.75 ft, when current at bends and landings becomes less forgiving for casual paddlers.",
        "Bridge-adjacent current, anglers, woody debris after rain, and broad-river wind on exposed pools.",
        "City-park activity at Greensburg and limited legal stopping options away from the named accesses."
      ]
    }
  },
  "green-river-american-legion-greensburg": {
    "putIn": {
      "id": "american-legion-park-ramp",
      "name": "American Legion Park Ramp",
      "latitude": 37.2441,
      "longitude": -85.4795
    },
    "takeOut": {
      "id": "greensburg-city-ramp",
      "name": "Greensburg City Ramp",
      "latitude": 37.2581,
      "longitude": -85.5057
    },
    "logistics": {
      "distanceLabel": "About 2.0 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low-water dragging, fishing stops, or a slower group",
      "shuttle": "Stage the take-out at Greensburg City Ramp, then drive back to American Legion Park. The shuttle is very short, but both accesses can have local park or angler traffic.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and obey city-park signage at Greensburg.",
      "camping": "Greensburg supports endpoint overnights better than on-route camping. KDFWR says the city-ramp take-out sits in a park with cabins, nearby RV hookups, and shuttle help, but private banks between the accesses should not be treated as legal overnight stops.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at American Legion Park and finish at Greensburg City Ramp for the short 2-mile in-town Upper Green segment. Use the Greensburg gauge and expect a scrape-prone ride whenever the stage sits below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "American Legion Park is a public ramp, but the gravel and muddy bank can be slick at lower water.",
        "Greensburg City Ramp is the cleanest landing in this family, but it sits in an active public city park with cabins, anglers, and other local users.",
        "Private banks between the endpoints should not be treated as casual take-outs even though town stays close by."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when shoals and mud edges become more noticeable.",
        "High water above about 1.75 ft, when current at bends and the city-ramp landing gets less forgiving.",
        "Anglers, bridge-adjacent current, and fresh wood after rain on the broad in-town corridor."
      ]
    }
  },
  "green-river-american-legion-glenview-road": {
    "putIn": {
      "id": "american-legion-park-ramp",
      "name": "American Legion Park Ramp",
      "latitude": 37.2441,
      "longitude": -85.4795
    },
    "takeOut": {
      "id": "glenview-road-carrydown",
      "name": "Glenview Road Carrydown",
      "latitude": 37.291,
      "longitude": -85.5913
    },
    "logistics": {
      "distanceLabel": "About 15.7 mi",
      "estimatedPaddleTime": "About 5 hr to 7.5 hr, longer with low-water dragging, fishing stops, or a slower shuttle day",
      "shuttle": "Stage the take-out at Glenview Road Carrydown, then drive back to American Legion Park. The shuttle is short, but the Glenview landing has no amenities, so inspect the road-end access before committing.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and obey any landowner signage at Glenview.",
      "camping": "Treat this as a day trip with nearby Greensburg lodging support rather than route camping. KDFWR lists no camping at either endpoint, and private banks between them should not be treated as legal campsites.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at American Legion Park and continue to Glenview Road for a longer Upper Green float below town. Use the Greensburg gauge and expect a slower, more scrape-prone day whenever the stage stays near or below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "American Legion Park uses a graded muddy and gravel bank below Highway 417 rather than a clean concrete city ramp.",
        "Greensburg City Ramp is the clearest serviced midpoint bailout if the group does not want to commit past town.",
        "Glenview Road Carrydown ends in the water and is surrounded by private land. Use only the obvious public road-end carrydown and obey posted signs.",
        "This route uses the direct Greensburg stage gauge. Trend, recent rain, and broad-river wind still matter more than a single number across a route this long."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when shoals, mud edges, and slower pools can turn this into a draggy full-day float.",
        "High water above about 1.75 ft, when current along bends and at the Glenview finish gets less forgiving.",
        "Broad-river wind, bridge-adjacent current leaving town, private-bank limits, and fresh wood after storms."
      ]
    },
    "accessPoints": [
      {
        "id": "american-legion-park-ramp",
        "name": "American Legion Park Ramp",
        "latitude": 37.2441,
        "longitude": -85.4795,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream launch on the Greensburg corridor."
      },
      {
        "id": "greensburg-city-ramp",
        "name": "Greensburg City Ramp",
        "latitude": 37.2581,
        "longitude": -85.5057,
        "mileFromStart": 2,
        "segmentKind": "creek",
        "note": "Serviced town bailout before the lower Glenview reach."
      },
      {
        "id": "glenview-road-carrydown",
        "name": "Glenview Road Carrydown",
        "latitude": 37.291,
        "longitude": -85.5913,
        "mileFromStart": 15.7,
        "segmentKind": "creek",
        "note": "Default downstream finish at the no-amenity private-bank road end."
      }
    ]
  },
  "green-river-russell-ford-glenview-road": {
    "putIn": {
      "id": "russell-ford-access",
      "name": "Russell Ford Access",
      "latitude": 37.2738,
      "longitude": -85.4784
    },
    "takeOut": {
      "id": "glenview-road-carrydown",
      "name": "Glenview Road Carrydown",
      "latitude": 37.291,
      "longitude": -85.5913
    },
    "logistics": {
      "distanceLabel": "About 18.0 mi",
      "estimatedPaddleTime": "About 6 hr to 9 hr, longer with low water, fishing stops, or a slower group pace",
      "shuttle": "Stage the take-out at Glenview Road, then drive back to Russell Ford on Ralph Vaughn Road. This is a committed Upper Green day, so keep both access areas compact and leave daylight margin for a long finish at the no-amenity road end.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and obey any local or landowner signage at Glenview.",
      "camping": "Treat this as a day trip with Greensburg corridor lodging support rather than route camping. Greensburg City Park cabins and town services sit on the corridor, but KDFWR lists no camping at Russell Ford or Glenview and private banks should not be treated as legal campsites.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Russell Ford and continue to Glenview Road for a longer Upper Green float. Use the Greensburg gauge and expect a slower, more scrape-prone day whenever the stage stays near or below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "Russell Ford is a simple gravel-bar carry-down with limited parking and no amenities. Keep the approach clear for other users.",
        "American Legion Park and Greensburg City Ramp both sit on the corridor and can shorten the day if the group needs an earlier legal take-out.",
        "Glenview Road Carrydown ends in the water and is surrounded by private land. Use only the obvious public road-end access and obey posted signs.",
        "This route uses the direct Greensburg stage gauge. Trend, recent rain, and broad-river wind still matter more than a single number across a route this long."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when shoals, mud edges, and slower pools can turn this into a draggy full-day float.",
        "High water above about 1.75 ft, when current along bends and at the Glenview finish gets less forgiving.",
        "Shallow riffles, deep rocky pools, bridge-adjacent current, private-bank limits, broad-river wind, and woody debris after storms.",
        "Slippery gravel or mud at Russell Ford and steep footing at the Glenview road-end carrydown."
      ]
    }
  },
  "green-river-greensburg-city-ramp-glenview-road": {
    "putIn": {
      "id": "greensburg-city-ramp",
      "name": "Greensburg City Ramp",
      "latitude": 37.2581,
      "longitude": -85.5057
    },
    "takeOut": {
      "id": "glenview-road-carrydown",
      "name": "Glenview Road Carrydown",
      "latitude": 37.291,
      "longitude": -85.5913
    },
    "logistics": {
      "distanceLabel": "About 13.7 mi",
      "estimatedPaddleTime": "About 4 hr to 6.5 hr, longer with low-water dragging, fishing stops, or upstream wind",
      "shuttle": "Leave the downstream vehicle at Glenview Road Carrydown, then drive back to Greensburg City Park. The shuttle is short, but the Glenview landing has no amenities, so inspect it before committing.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and obey any posted landowner signage at Glenview.",
      "camping": "Treat this as a day route with nearby Greensburg lodging support rather than route camping. KDFWR lists no camping at either endpoint, and private banks between them should not be treated as legal campsites.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Greensburg City Ramp and finish at Glenview Road Carrydown for the exact 13.7-mile upper Green segment that extends beyond the city ramp. Use the Greensburg gauge and expect a lower, scrape-prone day whenever the stage stays below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "Greensburg City Ramp is the cleanest serviced launch in this upper Green cluster, with paved parking and restrooms before you leave town.",
        "Glenview Road ends in the water and is surrounded by private land. Use only the obvious public road-end carrydown and obey posted signs.",
        "There are no amenities at Glenview and no general-use public banks between the endpoints, so keep rests and the take-out inside the access footprint."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when shoals and broad pools can slow the route more than the mileage suggests.",
        "High water above about 1.75 ft, when current at bends and the private-bank Glenview finish become less forgiving.",
        "Broad-river wind, bridge-adjacent current leaving town, and fresh wood after rain."
      ]
    },
    "accessPoints": [
      {
        "id": "greensburg-city-ramp",
        "name": "Greensburg City Ramp",
        "latitude": 37.2581,
        "longitude": -85.5057,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default city-park put-in with the best services on this upper Green segment."
      },
      {
        "id": "glenview-road-carrydown",
        "name": "Glenview Road Carrydown",
        "latitude": 37.291,
        "longitude": -85.5913,
        "mileFromStart": 13.7,
        "segmentKind": "creek",
        "note": "Default downstream finish at the no-amenity private-bank road-end carrydown."
      }
    ]
  },
  "green-river-stovall-park-dennison-ferry": {
    "putIn": {
      "id": "munfordville-stovall-park-ramp",
      "name": "Munfordville-Stovall Park Ramp",
      "latitude": 37.2663,
      "longitude": -85.8892
    },
    "takeOut": {
      "id": "dennison-ferry",
      "name": "Dennison Ferry",
      "latitude": 37.2174,
      "longitude": -86.0493
    },
    "logistics": {
      "distanceLabel": "About 21.0 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr, longer in lower water, broad-river wind, or with a slower group pace",
      "shuttle": "Stage the take-out at Dennison Ferry in Mammoth Cave National Park, then drive back to Stovall Park in Munfordville. Build in extra road time, confirm park access before leaving vehicles, and start early enough to avoid finishing the carry-out at dusk.",
      "permits": "No permit is required for a same-day paddle, but this route finishes inside Mammoth Cave National Park. Follow Kentucky boating rules, park signs, and standard USCG PFD requirements, and do not assume improvised bankside camping is legal.",
      "camping": "Both endpoints offer the clearest legal overnight support in this pair. KDFWR lists primitive camping at Stovall Park, while Dennison Ferry remains day-use only and private banks downstream should not be treated as legal campsites.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Munfordville-Stovall Park and take out at Dennison Ferry for the official 21-mile Green River run into Mammoth Cave. Use the Munfordville gauge, and note that the current July 6 reading is well above KDFWR's 300 to 600 cfs good band, so this should be treated as a higher-water route today.",
      "accessCaveats": [
        "Stovall Park is the easiest side of this route: paved ramp, restrooms, primitive camping, and park amenities. Use the ramp efficiently because it also serves local anglers and park users.",
        "Dennison Ferry is day-use only and finishes with a carry-down and carry-up park access rather than a simple motorboat ramp. Save real energy for the take-out.",
        "This route finishes inside Mammoth Cave National Park, so check park access status and stay within the marked public footprint at Dennison.",
        "Private banks between the named accesses are not general-purpose bailout or camping areas even when sandbars are exposed."
      ],
      "watchFor": [
        "Discharge below about 300 cfs, when this long route slows down and gets more consequential for a same-day plan.",
        "Discharge above about 600 cfs, when broad-river current, wood, and the park carry-down finish become less forgiving.",
        "Broad-river wind, exposed sun, muddy footing, fresh strainers after rain, and reduced cell coverage closer to Mammoth Cave.",
        "The park carry-down and carry-up at Dennison Ferry, especially when the banks are slick or the river is high."
      ]
    },
    "accessPoints": [
      {
        "id": "munfordville-stovall-park-ramp",
        "name": "Munfordville-Stovall Park Ramp",
        "latitude": 37.2663,
        "longitude": -85.8892,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream launch with park amenities and primitive camping support."
      },
      {
        "id": "dennison-ferry",
        "name": "Dennison Ferry",
        "latitude": 37.2174,
        "longitude": -86.0493,
        "mileFromStart": 21,
        "segmentKind": "creek",
        "note": "Default downstream finish at the Mammoth Cave day-use carry-down."
      }
    ]
  },
  "green-river-greensburg-city-ramp-lynn-camp-creek": {
    "putIn": {
      "id": "greensburg-city-ramp",
      "name": "Greensburg City Ramp",
      "latitude": 37.2581,
      "longitude": -85.5057
    },
    "takeOut": {
      "id": "lynn-camp-creek-vpa-1",
      "name": "Lynn Camp Creek Ramp",
      "latitude": 37.3533,
      "longitude": -85.7098
    },
    "logistics": {
      "distanceLabel": "About 32.9 mi",
      "estimatedPaddleTime": "About 9 hr to 12 hr, longer with low water, headwind, scouting, or a slower shuttle day",
      "shuttle": "Stage the take-out at Lynn Camp Creek Ramp, then drive back to Greensburg City Park. This is a true all-day commitment, so inspect both landings first and leave substantial daylight margin before launching.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect the public-use restrictions at Lynn Camp Creek VPA #1.",
      "camping": "Treat this as a long day route with Greensburg lodging support rather than route camping. KDFWR lists no camping at Greensburg, Glenview, or Lynn Camp, and private banks along the corridor should not be treated as legal campsites.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Greensburg City Ramp and continue to Lynn Camp Creek Ramp for one of the longest current Greensburg-gauge routes in the app. Use the Greensburg gauge and expect a very long, scrape-prone day whenever the stage stays below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "Greensburg City Ramp is the last serviced launch before the long lower commitment below town.",
        "Glenview Road Carrydown is the only clear midpoint bailout on this route before the steep Lynn Camp finish. If the day is going sideways, use it instead of forcing the final 19.2 miles.",
        "Lynn Camp Creek VPA #1 is private property opened to public use through KDFWR. Continuing access depends on respectful parking and staying inside the marked access footprint.",
        "The Lynn Camp ramp is steep and better treated as a carry-down, especially when the river is low."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when exposed shoals and long slow pools can turn this into a dawn-to-dusk grind.",
        "High water above about 1.75 ft, when current, muddy landings, and the steep Lynn Camp finish become less forgiving.",
        "Broad-river wind, exposed sun, limited legal bailout options after Glenview, and fresh wood after rain."
      ]
    },
    "accessPoints": [
      {
        "id": "greensburg-city-ramp",
        "name": "Greensburg City Ramp",
        "latitude": 37.2581,
        "longitude": -85.5057,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream launch with the best services in the corridor."
      },
      {
        "id": "glenview-road-carrydown",
        "name": "Glenview Road Carrydown",
        "latitude": 37.291,
        "longitude": -85.5913,
        "mileFromStart": 13.7,
        "segmentKind": "creek",
        "note": "Last clean midpoint bailout before the long Lynn Camp commitment."
      },
      {
        "id": "lynn-camp-creek-vpa-1",
        "name": "Lynn Camp Creek Ramp",
        "latitude": 37.3533,
        "longitude": -85.7098,
        "mileFromStart": 32.9,
        "segmentKind": "creek",
        "note": "Default downstream finish at the steep publicly open private ramp."
      }
    ]
  },
  "green-river-glenview-road-lynn-camp-creek": {
    "putIn": {
      "id": "glenview-road-carrydown",
      "name": "Glenview Road Carrydown",
      "latitude": 37.291,
      "longitude": -85.5913
    },
    "takeOut": {
      "id": "lynn-camp-creek-vpa-1",
      "name": "Lynn Camp Creek Ramp",
      "latitude": 37.3533,
      "longitude": -85.7098
    },
    "logistics": {
      "distanceLabel": "About 19.2 mi",
      "estimatedPaddleTime": "About 6 hr to 9 hr, longer with low water, fishing, or broad-river wind",
      "shuttle": "Stage the take-out at Lynn Camp Creek Ramp, then drive back to Glenview Road. This is a committed day with limited services at both ends, so leave extra daylight and keep both access areas compact.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect the public-use rules at both road-end launches.",
      "camping": "Treat this as a full day float with no established camping at either endpoint. KDFWR lists no camping at Glenview or Lynn Camp, and private banks between them should not be treated as legal overnight stops.",
      "campingClassification": "none",
      "summary": "Launch at Glenview Road Carrydown and take out at Lynn Camp Creek Ramp for a long upper-to-mid Pool 6 float. Use the Greensburg gauge and expect a slower all-day run whenever the stage stays below KDFWR's 1.0 to 1.75 ft good band.",
      "accessCaveats": [
        "Glenview Road Carrydown ends in the water and is surrounded by private land. Use only the obvious public road-end access and obey posted signs.",
        "Lynn Camp Creek VPA #1 is privately owned but open to the public through KDFWR. Continuing access depends on respectful parking and staying within the access footprint.",
        "The Lynn Camp ramp is steep and KDFWR says it is better used as a carry-down site, especially when the river is low.",
        "This route uses the direct Greensburg stage gauge for the upper Pool 6 corridor, but same-day rain, wind, and debris still matter across a 19-mile day."
      ],
      "watchFor": [
        "Low water below about 1.0 ft, when exposed shoals and long slow pools can turn this into a scrape-and-drag day.",
        "High water above about 1.75 ft, when bends, private-bank edges, and the steep Lynn Camp finish become less forgiving.",
        "Broad-river wind, exposed sun, fishing lines, limited legal bailout options, and fresh wood after rain.",
        "Slick footing at both road-end accesses and the steep Lynn Camp ramp at the finish."
      ]
    }
  },
  "green-river-hh-wilson-park-green-river-ferry": {
    "putIn": {
      "id": "hh-wilson-park-ramp",
      "name": "H.H. Wilson Park Ramp",
      "latitude": 37.2979,
      "longitude": -85.8506
    },
    "takeOut": {
      "id": "green-river-ferry",
      "name": "Green River Ferry",
      "latitude": 37.1795,
      "longitude": -86.1123
    },
    "logistics": {
      "distanceLabel": "About 32.1 mi",
      "estimatedPaddleTime": "About 9.5 hr to 12.5 hr, longer in higher current, wind, or with a slower shuttle day",
      "shuttle": "Stage the take-out at Green River Ferry in Mammoth Cave National Park, then drive back to H.H. Wilson Park Ramp. Build in extra road time, confirm park access and ferry status before leaving vehicles, and start early enough to avoid finishing the carry-out at dusk.",
      "permits": "No permit is required for a same-day paddle, but this route finishes inside Mammoth Cave National Park. Follow Kentucky boating rules, park signs, and standard USCG PFD requirements, and do not assume improvised bankside camping is legal.",
      "camping": "Treat this as endpoint-supported rather than improvised camping. Stovall Park primitive camping sits on the corridor, and Green River Ferry has endpoint campground support near Mammoth Cave Campground, but private banks farther downstream should not be treated as automatic legal campsites.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at H.H. Wilson Park and continue to Green River Ferry for a long Green River day bridging Hart County and Mammoth Cave. Use the Munfordville gauge and note that the current July 3 reading is well above KDFWR's 300 to 600 cfs good band, so this should be treated as a higher-water route today.",
      "accessCaveats": [
        "H.H. Wilson Park Ramp has a drop at the end of the concrete. Launch carefully and do not back farther than the waterline allows.",
        "Stovall Park and Dennison Ferry sit on the corridor as the clearest legal bailout points if the group does not want to commit all the way to Green River Ferry.",
        "NPS says canoe and kayak users should use the access ramp just upstream from the ferry on the south side when finishing at Green River Ferry.",
        "This route effectively combines the official Wilson-to-Stovall, Stovall-to-Dennison, and Dennison-to-Green-River-Ferry segments, so use the shorter Green River family routes instead if the group is not comfortable with an all-day commitment."
      ],
      "watchFor": [
        "Discharge above about 600 cfs, when broad-river current, debris, and the park ferry finish become substantially less forgiving.",
        "Fatigue, exposed sun, broad-river wind, limited bailout options after Dennison, and reduced cell service closer to Mammoth Cave.",
        "Ferry traffic and launch etiquette at the Green River Ferry finish, plus muddy or slick footing at park access points.",
        "Fresh strainers, floating debris, and changing shoal lines after recent rain or releases."
      ]
    },
    "accessPoints": [
      {
        "id": "hh-wilson-park-ramp",
        "name": "H.H. Wilson Park Ramp",
        "latitude": 37.2979,
        "longitude": -85.8506,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default full-corridor put-in."
      },
      {
        "id": "munfordville-stovall-park-ramp",
        "name": "Munfordville-Stovall Park Ramp",
        "latitude": 37.2663,
        "longitude": -85.8892,
        "mileFromStart": 3.6,
        "segmentKind": "creek",
        "note": "Early park bailout and clearest legal overnight support on the corridor."
      },
      {
        "id": "dennison-ferry",
        "name": "Dennison Ferry",
        "latitude": 37.2174,
        "longitude": -86.0493,
        "mileFromStart": 24.6,
        "segmentKind": "creek",
        "note": "Day-use-only midpoint bailout inside Mammoth Cave National Park."
      },
      {
        "id": "green-river-ferry",
        "name": "Green River Ferry",
        "latitude": 37.1795,
        "longitude": -86.1123,
        "mileFromStart": 32.1,
        "segmentKind": "creek",
        "note": "Default downstream finish at the managed Mammoth Cave ferry access."
      }
    ]
  },
  "green-river-houchins-ferry-brownsville-city-park": {
    "putIn": {
      "id": "houchins-ferry",
      "name": "Houchins Ferry",
      "latitude": 37.2024,
      "longitude": -86.2376
    },
    "takeOut": {
      "id": "brownsville-city-park",
      "name": "Brownsville City Park",
      "latitude": 37.1964,
      "longitude": -86.2757
    },
    "logistics": {
      "distanceLabel": "About 3.6 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2 hr, longer if the group scouts the former lock-and-dam rapid or moves cautiously in higher current",
      "shuttle": "Stage the take-out at Brownsville City Park, then drive back to Houchins Ferry. The road shuttle is short, but check current park and ferry conditions before leaving vehicles because Mammoth Cave access status can change without notice.",
      "permits": "No permit is required for a normal day paddle, but this route starts inside Mammoth Cave National Park and finishes near private land outside the park boundary. Follow NPS boating rules, wear required USCG-approved PFDs, and use only the named public accesses.",
      "camping": "Houchins Ferry offers endpoint campground support at the launch, but Brownsville City Park is not a campground and NPS does not present this short segment as an overnight route. Treat it as a day trip.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Houchins Ferry and take out at Brownsville City Park for the short lower Green continuation below the ferry crossing. The direct Mammoth Cave gauge still governs the route, but the current July 14 reading sits above the broad beginner-friendly band and the former Lock and Dam 6 rapid near Brownsville raises the consequence beyond a casual novice float.",
      "accessCaveats": [
        "Houchins Ferry is the clean public launch and still provides the best legal pre-trip camping support in this corridor.",
        "Brownsville City Park is the intended public take-out. NPS says private land begins after the park boundary, so do not improvise extra stops or a longer continuation without fresh access research.",
        "The route is short enough to look easy on paper, but the lower end deserves deliberate boat spacing and scouting if the group is unfamiliar with the former Lock and Dam 6 rapid near Brownsville.",
        "Ferry, road, and river conditions can change without notice. Check current Mammoth Cave conditions before the shuttle."
      ],
      "watchFor": [
        "Swift current, submerged wood, and muddy or slick access surfaces even on this short leg.",
        "The class 2 rapid left by former Lock and Dam 6 shortly before Brownsville Boat Ramp. Scout or portage conservatively if the group is uncertain.",
        "Higher water above about 15 ft, when the route becomes more consequential, and launch closures at or above 20 ft.",
        "Private banks, limited bailout room, exposed sun, and the temptation to relax too early because the mileage is short."
      ]
    }
  },
  "green-river-hh-wilson-stovall": {
    "putIn": {
      "id": "hh-wilson-park-ramp",
      "name": "H.H. Wilson Park Ramp",
      "latitude": 37.2979,
      "longitude": -85.8506
    },
    "takeOut": {
      "id": "munfordville-stovall-park-ramp",
      "name": "Munfordville-Stovall Park Ramp",
      "latitude": 37.2663,
      "longitude": -85.8892
    },
    "logistics": {
      "distanceLabel": "About 3.6 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, longer with fishing stops, wind, or slower ramp loading",
      "shuttle": "Stage the take-out at Munfordville-Stovall Park, then drive back to H.H. Wilson Park Ramp. Both are KDFWR-listed public ramps, but H.H. Wilson has limited unpaved parking and Stovall is a busy city park access; keep the ramp clear for other boaters.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public ramps, follow Kentucky boating and PFD rules, obey city park rules at Stovall Park, and carry required safety gear.",
      "camping": "Treat this as a short day trip. Stovall Park lists seasonal camping, but this route does not assume overnight use or any private-bank stopping between the ramps.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at H.H. Wilson Park Ramp and take out about 3.6 miles downstream at Munfordville-Stovall Park Ramp. KDFWR gives a good Munfordville gauge band of 300 to 600 cfs for Green River Pool 6, and today sits far above that range.",
      "accessCaveats": [
        "H.H. Wilson Park Ramp is a single-lane paved ramp with a small gravel parking area. KDFWR warns that the end of the ramp does not extend far into the water and there is a drop at the end of the concrete.",
        "Stovall Park Ramp is a city-owned single-lane paved ramp with paved parking, restrooms, picnic areas, and park traffic. Use the ramp efficiently and avoid blocking trailers or local park users.",
        "KDFWR notes private-property concerns around Pool 6 access sites. Stay with the named public ramps and do not use private banks for lunch stops, scouting, or parking.",
        "The Munfordville gauge is direct for this Hart County segment, but local wind, release timing, rain, and ramp conditions still control the launch decision."
      ],
      "watchFor": [
        "High water above KDFWR's 600 cfs good band, when a broad river can push much harder at ramps, rocky banks, and bends.",
        "Low water below 300 cfs, which can expose shoals, ramp drops, and shallow edges around access points.",
        "Motorboats, anglers, fishing lines, swimmers near parks, and other ramp users on a popular Pool 6 corridor.",
        "Wind on open pools, hot-weather exposure, muddy banks, and limited legal stopping options away from public access.",
        "Fresh woody debris, storm runoff, and changing release or lake-tailwater conditions upstream of the Munfordville reach."
      ]
    }
  },
  "green-river-hh-wilson-park-dennison-ferry": {
    "putIn": {
      "id": "hh-wilson-park-ramp",
      "name": "H.H. Wilson Park Ramp",
      "latitude": 37.2979,
      "longitude": -85.8506
    },
    "takeOut": {
      "id": "dennison-ferry",
      "name": "Dennison Ferry",
      "latitude": 37.2174,
      "longitude": -86.0493
    },
    "logistics": {
      "distanceLabel": "About 24.6 mi",
      "estimatedPaddleTime": "About 8 hr to 11 hr, longer in low water or with wind, fishing, or group delays",
      "shuttle": "Stage the take-out at Dennison Ferry in Mammoth Cave National Park, then drive back to H.H. Wilson Park Ramp. Build in extra road time, confirm park access before leaving vehicles, and start early enough to avoid finishing the carry-out at dusk.",
      "permits": "No permit is required for a same-day paddle, but this route finishes inside Mammoth Cave National Park. Follow Kentucky boating rules, park signs, and standard USCG PFD requirements, and do not assume improvised bankside camping is legal.",
      "camping": "Treat this as an overnight-capable route only if you plan around real legal support. Stovall Park primitive camping sits on the corridor early in the run, but Dennison Ferry is day-use only and private banks farther downstream should not be treated as legal campsites.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at H.H. Wilson Park and take out at Dennison Ferry for a very long Green River day bridging Hart County and Mammoth Cave. Use the Munfordville gauge and expect a slower, more consequential outing whenever the discharge sits below KDFWR's 300 to 600 cfs good band.",
      "accessCaveats": [
        "H.H. Wilson Park Ramp has a drop at the end of the concrete. Launch carefully and do not back farther than the waterline allows.",
        "Dennison Ferry is day-use only and finishes with a carry-down/carry-up park access rather than a simple motorboat ramp. Save energy for the take-out.",
        "This route effectively combines the official Wilson-to-Stovall and Stovall-to-Dennison Pool 6 segments, so use the shorter Green River family routes instead if the group is not comfortable with an all-day commitment.",
        "The route uses the direct Munfordville gauge for the upstream corridor, but weather trend, fresh wood, and daylight are decisive on a float this long."
      ],
      "watchFor": [
        "Low water below 300 cfs, when this long route can become unreasonably slow for a same-day plan.",
        "High water above 600 cfs, when broad-river current, debris, and the Mammoth Cave finish become less forgiving.",
        "Fatigue, exposed sun, broad-river wind, limited bailout options, and reduced cell service closer to Mammoth Cave.",
        "Muddy or slick footing at Dennison Ferry plus any fresh strainers or floating debris after rain."
      ]
    }
  },
  "green-river-rio-carrydown-dennison-ferry": {
    "putIn": {
      "id": "rio-carrydown-access",
      "name": "Rio Carrydown Access",
      "latitude": 37.3183,
      "longitude": -85.7692
    },
    "takeOut": {
      "id": "dennison-ferry",
      "name": "Dennison Ferry",
      "latitude": 37.2174,
      "longitude": -86.0493
    },
    "logistics": {
      "distanceLabel": "About 33 mi",
      "estimatedPaddleTime": "About 10 hr to 14 hr as a single push, longer in low water or with wind, fishing, or a slower group pace",
      "shuttle": "Stage the take-out at Dennison Ferry in Mammoth Cave National Park, then drive back to Rio Carrydown Access. Build in extra road time, confirm park access before leaving vehicles, and do not treat this as a casual same-day plan unless the group is comfortable with a sunrise-to-sunset effort.",
      "permits": "No permit is required for a same-day paddle, but this route finishes inside Mammoth Cave National Park. Follow Kentucky boating rules, park signs, and standard USCG PFD requirements, and do not assume improvised bankside camping is legal.",
      "camping": "Treat this as overnight-capable only when you plan around real legal support. Stovall Park primitive camping sits on the corridor, but Dennison Ferry is day-use only and private banks farther downstream should not be treated as legal campsites.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Rio Carrydown Access and take out at Dennison Ferry for a very long Green River route linking Hart County and Mammoth Cave. Use the Munfordville gauge and expect a slower, more consequential outing whenever the discharge sits below KDFWR's 300 to 600 cfs good band.",
      "accessCaveats": [
        "Rio is a carry-down-only access with unpaved parking and no amenities. Pack efficiently and avoid spreading gear onto adjacent private ground.",
        "Stovall Park lies on the corridor and is the clearest legal overnight support if you break this route into two days. It is not the finish for this slug.",
        "Dennison Ferry is day-use only and finishes with a carry-down and carry-up park access rather than a simple motorboat ramp. Save real energy for the take-out.",
        "This route effectively combines the official Rio-to-Wilson, Wilson-to-Stovall, and Stovall-to-Dennison segments, so use the shorter Green River family routes instead if the group is not comfortable with a very long commitment."
      ],
      "watchFor": [
        "Low water below 300 cfs, when this long route can become unreasonably slow for a same-day plan.",
        "High water above 600 cfs, when broad-river current, debris, and the Mammoth Cave finish become less forgiving.",
        "Fatigue, exposed sun, broad-river wind, limited bailout options, and reduced cell service closer to Mammoth Cave.",
        "Slippery footing at Rio and Dennison, plus any fresh strainers or floating debris after rain."
      ]
    }
  },
  "green-river-rio-carrydown-hh-wilson-park": {
    "putIn": {
      "id": "rio-carrydown-access",
      "name": "Rio Carrydown Access",
      "latitude": 37.3183,
      "longitude": -85.7692
    },
    "takeOut": {
      "id": "hh-wilson-park-ramp",
      "name": "H.H. Wilson Park Ramp",
      "latitude": 37.2979,
      "longitude": -85.8506
    },
    "logistics": {
      "distanceLabel": "About 8 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with sandbar stops, fishing, or lower water",
      "shuttle": "Stage the take-out at H.H. Wilson Park Ramp, then drive back to Rio Carrydown Access. Rio has limited unpaved parking and Wilson has a short paved ramp with a gravel lot, so keep both access areas tight and efficient.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and carry normal hot-weather and river-rescue essentials.",
      "camping": "Treat this as a day trip. KDFWR lists no camping at Rio, and private banks or sandbars between Rio and H.H. Wilson should not be assumed legal overnight stops.",
      "campingClassification": "none",
      "summary": "Launch at Rio Carrydown Access and take out about 8 miles downstream at H.H. Wilson Park Ramp for the upper Hart County Blue Water Trail float. KDFWR gives a good Munfordville gauge band of 300 to 600 cfs for this Green River corridor.",
      "accessCaveats": [
        "Rio is a carry-down-only access with unpaved parking and no amenities. Keep the launch compact and avoid spilling onto nearby private ground.",
        "H.H. Wilson Park Ramp is a paved launch, but KDFWR warns that the concrete does not extend far into the water and drops off at the end.",
        "KDFWR notes private-property concerns around Green River Pool 6 access sites. Stay with the named public accesses and do not use mid-route banks for parking or casual trespass stops.",
        "The Munfordville gauge is direct for this Hart County segment, but same-day rain, wind, wood, and ramp conditions still control the launch decision."
      ],
      "watchFor": [
        "Low water below 300 cfs, when shoals, gravel, and dragging become more likely.",
        "High water above 600 cfs, when current, wood, and landings get less forgiving on this broad river.",
        "Fresh strainers, fallen trees, fishing lines, open-river sun and wind, and long pool sections between riffles.",
        "Slippery footing at the Rio launch and the ramp drop at H.H. Wilson on exit."
      ]
    }
  },
  "green-river-rio-carrydown-stovall-park": {
    "putIn": {
      "id": "rio-carrydown-access",
      "name": "Rio Carrydown Access",
      "latitude": 37.3183,
      "longitude": -85.7692
    },
    "takeOut": {
      "id": "munfordville-stovall-park-ramp",
      "name": "Munfordville-Stovall Park Ramp",
      "latitude": 37.2663,
      "longitude": -85.8892
    },
    "logistics": {
      "distanceLabel": "About 12.0 mi",
      "estimatedPaddleTime": "About 4 hr to 6.5 hr, longer with high water, wood scouting, or a slower group pace",
      "shuttle": "Stage the downstream vehicle at Stovall Park in Munfordville, then drive back to Rio Carrydown Access. Inspect both landings first because Rio is simple and Stovall has a ramp drop at the waterline.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect Stovall Park and Hart County access rules.",
      "camping": "This route can use legal endpoint camping at Stovall Park. Rio has no camping, but KDFWR lists seasonal camping and park amenities at the downstream Stovall finish.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Rio Carrydown Access and finish at Munfordville-Stovall Park Ramp for the 12-mile Hart County continuation. Use the Munfordville gauge, and note that the current July 3 reading is far above KDFWR's 300 to 600 cfs good band.",
      "accessCaveats": [
        "Rio is a simple road-end launch with unpaved parking and no amenities. Pack efficiently and avoid spreading gear onto adjacent private ground.",
        "H.H. Wilson Park sits 8 miles downstream as the cleanest legal bailout if the current, weather, or group pace changes mid-route.",
        "Stovall Park is a developed finish with restrooms and camping, but KDFWR says the concrete ramp ends with a drop into the water. Finish under control.",
        "Private banks between the named accesses are not general-purpose bailout or camping areas."
      ],
      "watchFor": [
        "Low water below about 300 cfs, when sandbars and shoals slow the route noticeably.",
        "High water above about 600 cfs, when current, wood, and the developed Stovall finish become less forgiving.",
        "Broad-river wind, slick footing at simple carry-downs, and fresh floating debris after rain."
      ]
    },
    "accessPoints": [
      {
        "id": "rio-carrydown-access",
        "name": "Rio Carrydown Access",
        "latitude": 37.3183,
        "longitude": -85.7692,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream start at the road-end carrydown."
      },
      {
        "id": "hh-wilson-park-ramp",
        "name": "H.H. Wilson Park Ramp",
        "latitude": 37.2979,
        "longitude": -85.8506,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Mid-route developed bailout with the cleaner launch if the group shortens the day."
      },
      {
        "id": "munfordville-stovall-park-ramp",
        "name": "Munfordville-Stovall Park Ramp",
        "latitude": 37.2663,
        "longitude": -85.8892,
        "mileFromStart": 12,
        "segmentKind": "creek",
        "note": "Default downstream finish with park amenities and legal camping support."
      }
    ]
  },
  "green-river-stovall-park-green-river-ferry": {
    "putIn": {
      "id": "munfordville-stovall-park-ramp",
      "name": "Munfordville-Stovall Park Ramp",
      "latitude": 37.2663,
      "longitude": -85.8892
    },
    "takeOut": {
      "id": "green-river-ferry",
      "name": "Green River Ferry",
      "latitude": 37.1795,
      "longitude": -86.1123
    },
    "logistics": {
      "distanceLabel": "About 28.5 mi",
      "estimatedPaddleTime": "About 9 hr to 12 hr, longer in higher current, wind, or with a slower shuttle day",
      "shuttle": "Stage the take-out at Green River Ferry in Mammoth Cave National Park, then drive back to Stovall Park in Munfordville. Build in extra road time, confirm park access and ferry status before leaving vehicles, and start early enough to avoid finishing the carry-out at dusk.",
      "permits": "No permit is required for a same-day paddle, but this route finishes inside Mammoth Cave National Park. Follow Kentucky boating rules, park signs, and standard USCG PFD requirements, and do not assume improvised bankside camping is legal.",
      "camping": "Both endpoints offer the clearest legal overnight support in this pair. KDFWR lists primitive camping at Stovall Park, and Green River Ferry has endpoint campground support near Mammoth Cave Campground rather than informal riverbank camping.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Munfordville-Stovall Park and continue to Green River Ferry for a long Green River day bridging Hart County and Mammoth Cave. Use the Munfordville gauge and note that the current July 3 reading is well above KDFWR's 300 to 600 cfs good band, so this should be treated as a higher-water route today.",
      "accessCaveats": [
        "Stovall Park is the easiest side of this route: paved ramp, restrooms, primitive camping, and park amenities. Use the ramp efficiently because it also serves local anglers and park users.",
        "Dennison Ferry sits on the corridor as the day-use-only midpoint bailout if the group does not want to commit all the way to Green River Ferry.",
        "NPS says canoe and kayak users should use the access ramp just upstream from the ferry on the south side when finishing at Green River Ferry.",
        "This is a very long day for a flatwater-style Green River trip. Use the shorter Green River family routes instead if the group is not comfortable with an all-day commitment."
      ],
      "watchFor": [
        "Discharge above about 600 cfs, when broad-river current, debris, and the park ferry finish become substantially less forgiving.",
        "Fatigue, exposed sun, broad-river wind, limited bailout options after Dennison, and reduced cell service closer to Mammoth Cave.",
        "Ferry traffic and launch etiquette at the Green River Ferry finish, plus muddy or slick footing at park access points.",
        "Fresh strainers, floating debris, and changing shoal lines after recent rain or releases."
      ]
    },
    "accessPoints": [
      {
        "id": "munfordville-stovall-park-ramp",
        "name": "Munfordville-Stovall Park Ramp",
        "latitude": 37.2663,
        "longitude": -85.8892,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default full-corridor put-in with park amenities."
      },
      {
        "id": "dennison-ferry",
        "name": "Dennison Ferry",
        "latitude": 37.2174,
        "longitude": -86.0493,
        "mileFromStart": 21,
        "segmentKind": "creek",
        "note": "Day-use-only midpoint bailout inside Mammoth Cave National Park."
      },
      {
        "id": "green-river-ferry",
        "name": "Green River Ferry",
        "latitude": 37.1795,
        "longitude": -86.1123,
        "mileFromStart": 28.5,
        "segmentKind": "creek",
        "note": "Default downstream finish at the managed Mammoth Cave ferry access."
      }
    ]
  },
  "green-river-lynn-camp-creek-rio-carrydown": {
    "putIn": {
      "id": "lynn-camp-creek-vpa-1",
      "name": "Lynn Camp Creek Ramp",
      "latitude": 37.3533,
      "longitude": -85.7098
    },
    "takeOut": {
      "id": "rio-carrydown-access",
      "name": "Rio Carrydown Access",
      "latitude": 37.3183,
      "longitude": -85.7692
    },
    "logistics": {
      "distanceLabel": "About 10.2 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr, longer in low water or with fishing, wood scouting, or a slower shuttle day",
      "shuttle": "Stage the take-out at Rio Carrydown Access before driving back to Lynn Camp Creek. Inspect both landings first because Lynn Camp is steep and Rio is a simple road-end carrydown with limited amenities.",
      "permits": "No route-specific paddling permit is known. Use only the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, respect the public-use terms at Lynn Camp Creek, and obey local access signage.",
      "camping": "Treat this as a day trip. Stovall Park farther downstream is the clearest legal overnight support in the broader corridor, but this shorter Lynn Camp to Rio pairing does not need it and private banks between the named accesses should not be treated as campsites.",
      "campingClassification": "none",
      "summary": "Launch at Lynn Camp Creek and take out at Rio Carrydown Access for the shorter upper Hart County Green River split that stays above H.H. Wilson Park. Use the Munfordville gauge, and note that the current July 3 reading is far above KDFWR's 300 to 600 cfs good band.",
      "accessCaveats": [
        "Lynn Camp Creek VPA #1 is privately owned but open to the public through KDFWR. Continuing access depends on respectful parking and staying within the access footprint.",
        "Rio Carrydown is a simple road-end access with unpaved parking and no amenities. Pack efficiently and avoid spreading gear onto adjacent private ground.",
        "This route uses the shorter official Hart County split implied by KDFWR's Lynn Camp to H.H. Wilson and Rio to H.H. Wilson mileage. Use the longer corridor planner route instead if you need H.H. Wilson or Stovall as a developed finish.",
        "Use only the named public access points. Private banks between them are not general-purpose bailout or camping areas."
      ],
      "watchFor": [
        "Low water below about 300 cfs, when shoals and slower pools make progress noticeably slower.",
        "Higher water above about 600 cfs, when current, muddy landings, and the steeper Lynn Camp carry-down become less forgiving.",
        "Fresh wood, floating debris, broad-river wind, and slick footing at Rio after rain.",
        "Limited legal bailout options between the named public accesses and private-bank boundaries along the corridor."
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
        "note": "Default downstream finish at the road-end carrydown access."
      }
    ]
  },
  "green-river-lynn-camp-creek-hh-wilson-park": {
    "putIn": {
      "id": "lynn-camp-creek-vpa-1",
      "name": "Lynn Camp Creek Ramp",
      "latitude": 37.3533,
      "longitude": -85.7098
    },
    "takeOut": {
      "id": "hh-wilson-park-ramp",
      "name": "H.H. Wilson Park Ramp",
      "latitude": 37.2979,
      "longitude": -85.8506
    },
    "logistics": {
      "distanceLabel": "About 18.2 mi",
      "estimatedPaddleTime": "About 6 hr to 9 hr, longer with low water, family pacing, or sandbar and fishing stops",
      "shuttle": "Stage the take-out at H.H. Wilson Park Ramp, then drive back to Lynn Camp Creek Ramp. This is a committed day, so leave extra daylight and keep both access areas tight because Lynn Camp and Wilson each have limited space and no built-in shuttle services.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect the private-land terms at Lynn Camp Creek VPA #1.",
      "camping": "Treat this as a full day float, not a camping route. KDFWR lists no camping at either endpoint, and the private banks and sandbars between Lynn Camp and H.H. Wilson should not be assumed legal overnight stops.",
      "campingClassification": "none",
      "summary": "Launch at Lynn Camp Creek Ramp and take out at H.H. Wilson Park for the longer upper Hart County Green River segment. Use the Munfordville gauge and treat today as above-band higher water rather than comfort flow.",
      "accessCaveats": [
        "Lynn Camp Creek VPA #1 is privately owned but open to the public through KDFWR. Continuing access depends on respectful use, clean parking, and staying within the obvious access footprint.",
        "The Lynn Camp ramp is steep and KDFWR says it is better used as a carry-down site. Launch carefully and avoid blocking the narrow approach.",
        "H.H. Wilson Park Ramp has a drop at the end of the concrete. Expect a less forgiving finish than a typical city-park ramp, especially when the river is high or the group is tired.",
        "This route uses the direct Munfordville gauge for the Hart County corridor, but same-day weather, debris, and daylight matter as much as the cfs reading on a float this long."
      ],
      "watchFor": [
        "Low water below 300 cfs, when the longer mileage can turn into a slow scrape-and-drag day.",
        "High water above 600 cfs, when broad-river current, fresh wood, and the Wilson landing become less forgiving.",
        "Fatigue, exposed sun, broad-river wind, fishing lines, and limited legal bailout options away from the named accesses.",
        "Slippery footing at Lynn Camp, the ramp drop at Wilson, and any fresh strainers or downed trees after rain."
      ]
    }
  },
  "cumberland-river-redbird-thunderstruck": {
    "putIn": {
      "id": "redbird-ramp",
      "name": "Redbird Ramp",
      "latitude": 36.7621,
      "longitude": -84.2216
    },
    "takeOut": {
      "id": "thunderstruck-ramp",
      "name": "Thunderstruck Ramp",
      "latitude": 36.8077,
      "longitude": -84.3546
    },
    "logistics": {
      "distanceLabel": "About 11 mi",
      "estimatedPaddleTime": "About 4 hr to 6.5 hr, longer with scouting, fishing, or low-water scraping",
      "shuttle": "Stage the Thunderstruck take-out first, then drive back to Redbird on KY 204 and KY 478. Do not count on Long Bottom or Mouth of Indian Creek as routine shuttle points because KDFWR describes those roads as extremely rough.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public ramps, follow Kentucky boating and PFD rules, and keep emergency plans realistic for a remote gorge float.",
      "camping": "KDFWR says float campers use the banks downstream of Bee Shoals on this route. Treat that as primitive on-route overnight context rather than developed campground support, and avoid private banks outside the commonly used river corridor.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Redbird Ramp and take out at Thunderstruck for the first official upstream Cumberland Falls float. Use the Williamsburg gauge and treat water above the 1,100 cfs preferred band as a more technical skilled-paddler day.",
      "accessCaveats": [
        "Redbird and Thunderstruck are the clean public endpoints. Long Bottom and Mouth of Indian Creek are route-context accesses only and are not dependable normal shuttle points.",
        "The float is remote enough that daylight, weather, and group self-rescue capacity matter more than on a town-edge run.",
        "Same-day USGS flow on this run was above the official preferred band, so expect a firmer-water gorge day than a lower-band outing."
      ],
      "watchFor": [
        "Summer Shoals, Bee Shoals, Crow Shoals, and Thunderstruck Shoals.",
        "Fresh wood, limited bailout options, and fast rises after rain.",
        "Private banks and rough gorge exits away from the named ramps."
      ]
    }
  },
  "cumberland-river-thunderstruck-cumberland-falls": {
    "putIn": {
      "id": "thunderstruck-ramp",
      "name": "Thunderstruck Ramp",
      "latitude": 36.8077,
      "longitude": -84.3546
    },
    "takeOut": {
      "id": "cumberland-falls-carrydown",
      "name": "Cumberland Falls Carrydown",
      "latitude": 36.8421,
      "longitude": -84.3435
    },
    "logistics": {
      "distanceLabel": "About 5 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4.5 hr, longer with scouting or higher-water caution",
      "shuttle": "Stage the Cumberland Falls vehicle first, then drive back to Thunderstruck by KY 90, US 27, and KY 700. Inspect the take-out before launching because the finish above the falls is the core safety gate for the route.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR put-in and Cumberland Falls Carrydown only, follow Kentucky boating and PFD rules, and do not launch if your group is not prepared for a mandatory take-out above the falls.",
      "camping": "Cumberland Falls State Resort Park has campground, cabin, and lodge support at the take-out area, so this works best as a campground-based gorge day rather than a wilderness overnight.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Thunderstruck and finish at Cumberland Falls Carrydown for the shorter official gorge float. The route is only about five miles, but the mandatory right-bank take-out above the falls makes it more serious than the mileage suggests.",
      "accessCaveats": [
        "KDFWR says to work to the right side of the river before the KY 90 bridge and take out at the falls parking and carrydown area. Missing that move is a stand-down failure, not a recoverable inconvenience.",
        "This run includes the Pitch Rapids, Slick Shoals gorge, and several drops before the bridge. Treat it as a whitewater route even though KDFWR also frames it as a good angling float.",
        "Same-day flow on this run was above the preferred band, and the mandatory-take-out hazard still makes the route advanced."
      ],
      "watchFor": [
        "Pitch Rapids, Slick Shoals gorge current, and the drop sequence below Blue Bend.",
        "The mandatory take-out above Cumberland Falls.",
        "Rain-driven rises, private gorge banks, and sparse mid-route exits."
      ]
    }
  },
  "cumberland-river-redbird-longbottom": {
    "putIn": {
      "id": "redbird-ramp",
      "name": "Redbird Ramp",
      "latitude": 36.7621,
      "longitude": -84.2216
    },
    "takeOut": {
      "id": "long-bottom-access",
      "name": "Long Bottom Access",
      "latitude": 36.7772,
      "longitude": -84.3455
    },
    "logistics": {
      "distanceLabel": "About 9 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr, longer with fishing, low-water scraping, or a careful Long Bottom shuttle",
      "shuttle": "Stage the Long Bottom vehicle first, then drive back to Redbird on KY 204 and KY 478. Scout the final Forest Service Road 536 approach before committing because KDFWR says the last stretch down to Long Bottom is extremely rugged.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public access points, follow Kentucky boating and PFD rules, and keep emergency plans realistic for a remote gorge float.",
      "camping": "KDFWR says float campers use the banks downstream of Bee Shoals on this corridor. Treat that as primitive on-route overnight context rather than developed campground support, and avoid private banks outside the commonly used river corridor.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Redbird Ramp and take out at Long Bottom for the first half of the official upstream Cumberland Falls corridor. Use the Williamsburg gauge and treat the rough Long Bottom road plus remote shoals as part of the difficulty, not just the mileage.",
      "accessCaveats": [
        "Redbird is the easy public ramp; Long Bottom is a legitimate public access but the road and carry are much rougher than a normal paved take-out.",
        "The route is remote enough that daylight, weather, and self-rescue capacity matter more than on a town-edge river.",
        "Same-day USGS flow on this run was above the official preferred band, so expect more push than a lower-band beginner day."
      ],
      "watchFor": [
        "Summer Shoals, Bee Shoals, Crow Shoals, and fresh wood after rain.",
        "Muddy footing, rough carry-down logistics, and very rugged road access at Long Bottom.",
        "Private banks and sparse bailout options away from the named public endpoints."
      ]
    }
  },
  "cumberland-river-longbottom-thunderstruck": {
    "putIn": {
      "id": "long-bottom-access",
      "name": "Long Bottom Access",
      "latitude": 36.7772,
      "longitude": -84.3455
    },
    "takeOut": {
      "id": "thunderstruck-ramp",
      "name": "Thunderstruck Ramp",
      "latitude": 36.8077,
      "longitude": -84.3546
    },
    "logistics": {
      "distanceLabel": "About 2.5 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, longer with scouting, low-water scraping, or a slow Long Bottom carry",
      "shuttle": "Stage the Thunderstruck vehicle first, then drive back to Long Bottom. Scout both accesses before launching because Long Bottom is a rough carry-down and Thunderstruck is easy to miss if you drift past the left-bank ramp.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public access points, follow Kentucky boating and PFD rules, and do not assume private banks are acceptable backup exits.",
      "camping": "Treat this as a short day route. KDFWR documents primitive float-camping on the broader corridor, but this middle split is better planned as a direct shuttle between the two named accesses.",
      "campingClassification": "none",
      "summary": "Launch at Long Bottom and take out at Thunderstruck for the short middle split on the official Cumberland-above-the-falls chain. The mileage is modest, but the rough put-in, shoals, and remote setting still make it a moving-water route.",
      "accessCaveats": [
        "Long Bottom is a real public access, but KDFWR says the final road approach is extremely rugged and best suited to high-clearance four-wheel-drive vehicles.",
        "Thunderstruck is the intended finish. KDFWR warns it is easy to miss once you drop through Thunderstruck Shoals unless you are watching the left bank closely.",
        "Same-day USGS flow on this run was above the official preferred band, so expect a stronger-water feel than a lower-band casual outing."
      ],
      "watchFor": [
        "Long Branch shoals, Thunderstruck Shoals, and fresh wood after rain.",
        "Muddy footing and rough access logistics at Long Bottom.",
        "Private banks and the temptation to drift past Thunderstruck instead of finishing at the named public ramp."
      ]
    }
  },
  "cumberland-river-longbottom-cumberland-falls": {
    "putIn": {
      "id": "long-bottom-access",
      "name": "Long Bottom Access",
      "latitude": 36.7772,
      "longitude": -84.3455
    },
    "takeOut": {
      "id": "cumberland-falls-carrydown",
      "name": "Cumberland Falls Carrydown",
      "latitude": 36.8421,
      "longitude": -84.3435
    },
    "logistics": {
      "distanceLabel": "About 7.6 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with scouting, stronger water, or careful take-out setup above the falls",
      "shuttle": "Stage the Cumberland Falls vehicle first, then drive back to Long Bottom. Inspect the falls-side carrydown before launching because the mandatory right-bank take-out above the falls is the core safety gate for the route.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and do not launch if your group is not prepared for a mandatory take-out above Cumberland Falls.",
      "camping": "Cumberland Falls State Resort Park has seasonal campground space and year-round lodging at the take-out. Treat this as a campground-based gorge day rather than a wilderness overnight.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Long Bottom and finish at Cumberland Falls Carrydown for the lower half of the official upstream Cumberland Falls corridor. The route is longer than Thunderstruck-to-Falls and still ends at a mandatory take-out above the 68-foot drop, so it deserves full whitewater attention.",
      "accessCaveats": [
        "Long Bottom is a legitimate public access, but KDFWR says the final road approach is extremely rugged and best suited to high-clearance four-wheel-drive vehicles.",
        "KDFWR says to work to the right side of the river before the KY 90 bridge and take out at the public falls parking/carrydown area. Missing that move is a stand-down failure, not a recoverable inconvenience.",
        "Same-day USGS flow on this run was above the official preferred band, so treat this as a firmer-water gorge day even before any extra rain arrives."
      ],
      "watchFor": [
        "Thunderstruck Shoals, Pitch Rapids, Slick Shoals gorge current, and the drop sequence below Blue Bend.",
        "The mandatory take-out above Cumberland Falls.",
        "Rough access logistics at Long Bottom, rain-driven rises, private gorge banks, and sparse mid-route exits."
      ]
    }
  },
  "cumberland-river-redbird-cumberland-falls": {
    "putIn": {
      "id": "redbird-ramp",
      "name": "Redbird Ramp",
      "latitude": 36.7621,
      "longitude": -84.2216
    },
    "takeOut": {
      "id": "cumberland-falls-carrydown",
      "name": "Cumberland Falls Carrydown",
      "latitude": 36.8421,
      "longitude": -84.3435
    },
    "logistics": {
      "distanceLabel": "About 16.6 mi",
      "estimatedPaddleTime": "About 6 hr to 9 hr, longer with scouting, stronger water, or careful take-out setup above the falls",
      "shuttle": "Stage the Cumberland Falls vehicle first, then drive back to Redbird on KY 700, US 27, and KY 204. Inspect the falls-side carrydown before launching because the mandatory right-bank take-out above the falls is the core safety gate for the full route.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and do not launch if your group is not prepared for a mandatory take-out above Cumberland Falls.",
      "camping": "KDFWR says float campers use the banks downstream of Bee Shoals on this corridor, and Cumberland Falls State Resort Park adds seasonal campground space and year-round lodging at the take-out. Treat that as managed corridor support rather than permission to camp on undeveloped private banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Redbird Ramp and finish at Cumberland Falls Carrydown for the full official upstream Cumberland Falls corridor. The route combines the remote upper gorge with the lower rapid sequence and ends at a mandatory take-out above the 68-foot drop, so it deserves full whitewater attention even on a gauge-friendly day.",
      "accessCaveats": [
        "Redbird is the clean upstream public launch. Long Bottom is a legitimate mid-route access, but KDFWR says the final road approach is extremely rugged and not a normal easy bailout.",
        "KDFWR says to work to the right side of the river before the KY 90 bridge and take out at the public falls parking/carrydown area. Missing that move is a stand-down failure, not a recoverable inconvenience.",
        "Same-day USGS flow on this run sat at the top of the official preferred band, so treat this as a firmer-water gorge day even before any extra rain arrives."
      ],
      "watchFor": [
        "Summer Shoals, Bee Shoals, Crow Shoals, Thunderstruck Shoals, Pitch Rapids, Slick Shoals gorge current, and the drop sequence below Blue Bend.",
        "The mandatory take-out above Cumberland Falls.",
        "Fresh wood, rain-driven rises, private gorge banks, sparse mid-route exits, and fatigue over a long whitewater corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "redbird-ramp",
        "name": "Redbird Ramp",
        "latitude": 36.7621,
        "longitude": -84.2216,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream launch for the full Cumberland gorge corridor."
      },
      {
        "id": "long-bottom-access",
        "name": "Long Bottom Access",
        "latitude": 36.7967,
        "longitude": -84.2797,
        "mileFromStart": 9,
        "segmentKind": "creek",
        "note": "Rugged intermediate public access and bailout, not a casual easy exit."
      },
      {
        "id": "thunderstruck-ramp",
        "name": "Thunderstruck Ramp",
        "latitude": 36.8207,
        "longitude": -84.328,
        "mileFromStart": 11.5,
        "segmentKind": "creek",
        "note": "Lower intermediate public access above the final falls approach."
      },
      {
        "id": "cumberland-falls-carrydown",
        "name": "Cumberland Falls Carrydown",
        "latitude": 36.8421,
        "longitude": -84.3435,
        "mileFromStart": 16.6,
        "segmentKind": "creek",
        "note": "Mandatory right-bank downstream finish above Cumberland Falls."
      }
    ]
  },
  "kinniconick-creek-leatherwood-branch-mcdowells-creek": {
    "putIn": {
      "id": "leatherwood-branch-park-access",
      "name": "Leatherwood Branch Park Access",
      "latitude": 38.5105,
      "longitude": -83.3274
    },
    "takeOut": {
      "id": "mcdowells-creek-park-access",
      "name": "McDowells Creek Park Access",
      "latitude": 38.5746,
      "longitude": -83.1896
    },
    "logistics": {
      "distanceLabel": "About 27.2 mi",
      "estimatedPaddleTime": "About 8 hr to 11 hr, longer with low-water scraping, fishing, or wood scouting",
      "shuttle": "Stage the downstream vehicle at McDowells Creek Park Access, then drive back to Leatherwood Branch Park Access. This is a real all-day creek shuttle, not a casual short float, and the middle route passes through long private-bank stretches.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day county park or roadside parking limits.",
      "camping": "Treat this as a committed day trip. KDFWR lists camping as None at Leatherwood Branch Park Access and McDowells Creek Park Access, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Leatherwood Branch Park Access and take out about 27.2 miles downstream at McDowells Creek Park Access for a very long Kinniconick Creek day. KDFWR says to use the Tygarts Creek gauge as the Kinniconick proxy, with a good band of 2.5 to 3.5 ft or 50 to 130 cfs.",
      "accessCaveats": [
        "Leatherwood Branch and McDowells Creek are both public KDFWR accesses, but neither is documented as a campground or service-heavy overnight facility.",
        "This route includes the Puncheon / Pipe Lick intermediate segment even though the middle stop is not treated here as a primary endpoint with source-backed coordinates.",
        "The proxy gauge stage sat inside the official good band during this run, but the same official reading showed discharge below the cfs floor, so expect scrape-prone shoals and a slower day than the mileage alone suggests.",
        "Stay with the named public access points and do not assume side banks, bars, or private-adjacent ground are legal stopping points."
      ],
      "watchFor": [
        "Low water below 2.5 ft or 50 cfs, when shallow riffles, rock bars, and dragging become more likely over a very long creek day.",
        "High water above 3.5 ft or 130 cfs, when rain-driven rises, wood, and muddy landings make the creek less forgiving.",
        "Wood, strainers, private banks outside the access sites, and fatigue from an all-day lower-eastern-Kentucky shuttle."
      ]
    },
    "accessPoints": [
      {
        "id": "leatherwood-branch-park-access",
        "name": "Leatherwood Branch Park Access",
        "latitude": 38.5105,
        "longitude": -83.3274,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the long upper Kinniconick route."
      },
      {
        "id": "mcdowells-creek-park-access",
        "name": "McDowells Creek Park Access",
        "latitude": 38.5746,
        "longitude": -83.1896,
        "mileFromStart": 27.2,
        "segmentKind": "creek",
        "note": "Default take-out for the upper-to-mid chain route."
      }
    ]
  },
  "kinniconick-creek-leatherwood-branch-mill-pond-creek": {
    "putIn": {
      "id": "leatherwood-branch-park-access",
      "name": "Leatherwood Branch Park Access",
      "latitude": 38.5105,
      "longitude": -83.3274
    },
    "takeOut": {
      "id": "mill-pond-creek-access",
      "name": "Mill Pond Creek Access",
      "latitude": 38.5882,
      "longitude": -83.1919
    },
    "logistics": {
      "distanceLabel": "About 28.8 mi",
      "estimatedPaddleTime": "About 8.5 hr to 11.5 hr, longer with low-water scraping, fishing, or wood scouting",
      "shuttle": "Stage the downstream vehicle at Mill Pond Creek Access, then drive back to Leatherwood Branch Park Access. This is one of the longest Kinniconick public combinations and needs real daylight, shuttle, and weather planning.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day county park or roadside parking limits.",
      "camping": "Treat this as a committed day trip. KDFWR lists camping as None at Leatherwood Branch Park Access and Mill Pond Creek Access, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Leatherwood Branch Park Access and take out about 28.8 miles downstream at Mill Pond Creek Access for the longest Kinniconick Creek route added in this pass. KDFWR says to use the Tygarts Creek gauge as the Kinniconick proxy, with a good band of 2.5 to 3.5 ft or 50 to 130 cfs.",
      "accessCaveats": [
        "Leatherwood Branch and Mill Pond are public KDFWR accesses, but neither is documented as a campground or service-heavy overnight facility.",
        "This route passes the Puncheon / Pipe Lick and McDowells Creek chain before the Mill Pond finish, so missing daylight or underestimating low-water speed can create a much longer day than expected.",
        "The proxy gauge stage sat inside the official good band during this run, but the same official reading showed discharge below the cfs floor, so expect scrape-prone shoals and slower progress.",
        "Stay with the named public access points and do not assume side banks, bars, or private-adjacent ground are legal stopping points."
      ],
      "watchFor": [
        "Low water below 2.5 ft or 50 cfs, when shallow riffles, rock bars, and dragging become more likely over a very long creek day.",
        "High water above 3.5 ft or 130 cfs, when rain-driven rises, wood, and muddy landings make the creek less forgiving.",
        "Wood, strainers, private banks outside the access sites, and fatigue from a nearly 29-mile creek commitment."
      ]
    },
    "accessPoints": [
      {
        "id": "leatherwood-branch-park-access",
        "name": "Leatherwood Branch Park Access",
        "latitude": 38.5105,
        "longitude": -83.3274,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the full chained Kinniconick route."
      },
      {
        "id": "mcdowells-creek-park-access",
        "name": "McDowells Creek Park Access",
        "latitude": 38.5746,
        "longitude": -83.1896,
        "mileFromStart": 27.2,
        "segmentKind": "creek",
        "note": "Intermediate public bailout and split point late in the route."
      },
      {
        "id": "mill-pond-creek-access",
        "name": "Mill Pond Creek Access",
        "latitude": 38.5882,
        "longitude": -83.1919,
        "mileFromStart": 28.8,
        "segmentKind": "creek",
        "note": "Default take-out for the longest Kinniconick chain in this pass."
      }
    ]
  },
  "kinniconick-creek-mcdowells-creek-mill-pond-creek": {
    "putIn": {
      "id": "mcdowells-creek-park-access",
      "name": "McDowells Creek Park Access",
      "latitude": 38.5746,
      "longitude": -83.1896
    },
    "takeOut": {
      "id": "mill-pond-creek-access",
      "name": "Mill Pond Creek Access",
      "latitude": 38.5882,
      "longitude": -83.1919
    },
    "logistics": {
      "distanceLabel": "About 1.6 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low-water scraping, fishing, or wood scouting",
      "shuttle": "Stage the downstream vehicle at Mill Pond Creek Access, then drive back to McDowells Creek Park Access. The shuttle is short, but the creek still deserves a quick wood and gauge check before launching.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day county park or roadside parking limits.",
      "camping": "Treat this as a day route. KDFWR lists camping as None at McDowells Creek Park Access and Mill Pond Creek Access, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at McDowells Creek Park Access and take out about 1.6 miles downstream at Mill Pond Creek Access for the shortest current Kinniconick Creek split. KDFWR says to use the Tygarts Creek gauge as the Kinniconick proxy, with a good band of 2.5 to 3.5 ft or 50 to 130 cfs.",
      "accessCaveats": [
        "McDowells Creek and Mill Pond are both public KDFWR accesses, but neither is documented as a campground or service-heavy overnight facility.",
        "This is a short route, not a stillwater park loop. Wood, shoals, and muddy banks can still turn a quick float into a boat-handling exercise when the creek is low or rising.",
        "The current proxy gauge sat inside the official good band during this run, so the route ships as runnable rather than scrape-framed.",
        "Stay with the named public access points and do not assume side banks, bars, or private-adjacent ground are legal stopping points."
      ],
      "watchFor": [
        "Low water below 2.5 ft or 50 cfs, when shallow riffles, rock bars, and dragging become more likely even on a short route.",
        "High water above 3.5 ft or 130 cfs, when rain-driven rises, wood, and muddy landings make the creek less forgiving.",
        "Wood, strainers, private banks outside the access sites, and complacency from the short mileage."
      ]
    },
    "accessPoints": [
      {
        "id": "mcdowells-creek-park-access",
        "name": "McDowells Creek Park Access",
        "latitude": 38.5746,
        "longitude": -83.1896,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the middle Kinniconick split."
      },
      {
        "id": "mill-pond-creek-access",
        "name": "Mill Pond Creek Access",
        "latitude": 38.5882,
        "longitude": -83.1919,
        "mileFromStart": 1.6,
        "segmentKind": "creek",
        "note": "Default take-out for the shortest current Kinniconick split."
      }
    ]
  },
  "kinniconick-creek-mill-pond-creek-garrison": {
    "putIn": {
      "id": "mill-pond-creek-access",
      "name": "Mill Pond Creek Access",
      "latitude": 38.5882,
      "longitude": -83.1919
    },
    "takeOut": {
      "id": "garrison-ramp",
      "name": "Garrison Ramp",
      "latitude": 38.6083,
      "longitude": -83.1637
    },
    "logistics": {
      "distanceLabel": "About 2.7 mi",
      "estimatedPaddleTime": "About 1 hr to 2.5 hr, longer with low-water scraping, fishing, or wood scouting",
      "shuttle": "Stage the downstream vehicle at Garrison Ramp, then drive back to Mill Pond Creek Access. The shuttle is short, but the route still deserves a fresh look for wood, mud, and gauge trend before launching.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day county park or roadside parking limits.",
      "camping": "Treat this as a day route. KDFWR lists camping as None at Mill Pond Creek Access and Garrison Ramp, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Mill Pond Creek Access and take out about 2.7 miles downstream at Garrison Ramp for a short lower Kinniconick Creek float. KDFWR says to use the Tygarts Creek gauge as the Kinniconick proxy, with a good band of 2.5 to 3.5 ft or 50 to 130 cfs.",
      "accessCaveats": [
        "Mill Pond and Garrison are both public KDFWR accesses, but neither is documented as a campground or service-heavy overnight facility.",
        "The current proxy gauge sat inside the official good band during this run, so the route ships as runnable rather than scrape-framed.",
        "Garrison is the intended public finish. Land at the named ramp rather than drifting past town in search of a more informal exit.",
        "Stay with the named public access points and do not assume side banks, bars, or private-adjacent ground are legal stopping points."
      ],
      "watchFor": [
        "Low water below 2.5 ft or 50 cfs, when shallow riffles, rock bars, and dragging become more likely even on a short route.",
        "High water above 3.5 ft or 130 cfs, when rain-driven rises, wood, and muddy landings make the creek less forgiving.",
        "Wood, strainers, private banks outside the access sites, and take-out discipline at Garrison."
      ]
    },
    "accessPoints": [
      {
        "id": "mill-pond-creek-access",
        "name": "Mill Pond Creek Access",
        "latitude": 38.5882,
        "longitude": -83.1919,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the short lower Kinniconick split."
      },
      {
        "id": "garrison-ramp",
        "name": "Garrison Ramp",
        "latitude": 38.6083,
        "longitude": -83.1637,
        "mileFromStart": 2.7,
        "segmentKind": "creek",
        "note": "Default take-out for the lower Kinniconick split."
      }
    ]
  },
  "kinniconick-creek-mcdowells-creek-garrison": {
    "putIn": {
      "id": "mcdowells-creek-park-access",
      "name": "McDowells Creek Park Access",
      "latitude": 38.5746,
      "longitude": -83.1896
    },
    "takeOut": {
      "id": "garrison-ramp",
      "name": "Garrison Ramp",
      "latitude": 38.6083,
      "longitude": -83.1637
    },
    "logistics": {
      "distanceLabel": "About 4.3 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, longer with low-water scraping, fishing, or wood scouting",
      "shuttle": "Stage the downstream vehicle at Garrison Ramp, then drive back to McDowells Creek Park Access. The shuttle is short, but the route still deserves a fresh look for wood, mud, and gauge trend before launching.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day county park or roadside parking limits.",
      "camping": "Treat this as a day route. KDFWR lists camping as None at McDowells Creek Park Access and Garrison Ramp, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at McDowells Creek Park Access and take out about 4.3 miles downstream at Garrison Ramp for a shorter lower Kinniconick Creek float. KDFWR says to use the Tygarts Creek gauge as the Kinniconick proxy, with a good band of 2.5 to 3.5 ft or 50 to 130 cfs.",
      "accessCaveats": [
        "McDowells Creek and Garrison are both public KDFWR accesses, but neither is documented as a campground or service-heavy overnight facility.",
        "Mill Pond Creek is the intermediate public access in the middle of this route; it is useful as a bailout or split point rather than something to ignore.",
        "The proxy gauge stage sat inside the official good band during this run, but the same official reading showed discharge below the cfs floor, so expect scrape-prone riffles and more boat handling around shoals.",
        "Stay with the named public access points and do not assume side banks, bars, or private-adjacent ground are legal stopping points."
      ],
      "watchFor": [
        "Low water below 2.5 ft or 50 cfs, when shallow riffles, rock bars, and dragging become more likely even on a shorter route.",
        "High water above 3.5 ft or 130 cfs, when rain-driven rises, wood, and muddy landings make the creek less forgiving.",
        "Wood, strainers, private banks outside the access sites, and take-out discipline at Garrison."
      ]
    },
    "accessPoints": [
      {
        "id": "mcdowells-creek-park-access",
        "name": "McDowells Creek Park Access",
        "latitude": 38.5746,
        "longitude": -83.1896,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the shorter lower route."
      },
      {
        "id": "mill-pond-creek-access",
        "name": "Mill Pond Creek Access",
        "latitude": 38.5882,
        "longitude": -83.1919,
        "mileFromStart": 1.6,
        "segmentKind": "creek",
        "note": "Intermediate public bailout and split point."
      },
      {
        "id": "garrison-ramp",
        "name": "Garrison Ramp",
        "latitude": 38.6083,
        "longitude": -83.1637,
        "mileFromStart": 4.3,
        "segmentKind": "creek",
        "note": "Default take-out for the lower Kinniconick route."
      }
    ]
  },
  "kinniconick-creek-leatherwood-branch-garrison": {
    "putIn": {
      "id": "leatherwood-branch-park-access",
      "name": "Leatherwood Branch Park Access",
      "latitude": 38.5105,
      "longitude": -83.3274
    },
    "takeOut": {
      "id": "garrison-ramp",
      "name": "Garrison Ramp",
      "latitude": 38.6083,
      "longitude": -83.1637
    },
    "logistics": {
      "distanceLabel": "About 31.5 mi",
      "estimatedPaddleTime": "About 9 hr to 12 hr, longer with low-water scraping, fishing, or repeated wood scouting",
      "shuttle": "Stage the downstream vehicle at Garrison Ramp, then drive back to Leatherwood Branch Park Access near Vanceburg. The road shuttle is manageable, but the route itself is a very long creek commitment and should be started early.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect any same-day county park or roadside parking limits.",
      "camping": "Treat this as a full-day route rather than an overnight assumption. KDFWR lists camping as None at Leatherwood Branch, McDowells Creek, Mill Pond Creek, and Garrison, and banks outside the named access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Leatherwood Branch Park Access and take out about 31.5 miles downstream at Garrison Ramp for the full public Kinniconick Creek chain. KDFWR says to use the Tygarts Creek gauge as the Kinniconick proxy, with a good band of 2.5 to 3.5 ft or 50 to 130 cfs.",
      "accessCaveats": [
        "Leatherwood Branch and Garrison are both public KDFWR accesses, but neither is documented as a campground or overnight facility.",
        "McDowells Creek and Mill Pond Creek are the only intermediate public split points late in the route. Have them marked before launching rather than treating the day as one blind push.",
        "The proxy gauge stage sat inside the official good band during this run, but the same official reading showed discharge below the cfs floor, so expect scrape-prone riffles and a longer day than the map mileage alone suggests.",
        "Stay with the named public access points and do not assume side banks, bars, or private-adjacent ground are legal stopping points."
      ],
      "watchFor": [
        "Low water below 2.5 ft or 50 cfs, when shallow riffles, rock bars, and dragging become more likely over a very long day.",
        "High water above 3.5 ft or 130 cfs, when rain-driven rises, wood, and muddy landings make the creek less forgiving.",
        "Wood, strainers, fatigue, and private banks outside the access sites on the longest Kinniconick chain now in the tree."
      ]
    },
    "accessPoints": [
      {
        "id": "leatherwood-branch-park-access",
        "name": "Leatherwood Branch Park Access",
        "latitude": 38.5105,
        "longitude": -83.3274,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the full chained Kinniconick route."
      },
      {
        "id": "mcdowells-creek-park-access",
        "name": "McDowells Creek Park Access",
        "latitude": 38.5746,
        "longitude": -83.1896,
        "mileFromStart": 27.2,
        "segmentKind": "creek",
        "note": "Intermediate public bailout and split point late in the route."
      },
      {
        "id": "mill-pond-creek-access",
        "name": "Mill Pond Creek Access",
        "latitude": 38.5882,
        "longitude": -83.1919,
        "mileFromStart": 28.8,
        "segmentKind": "creek",
        "note": "Intermediate public bailout and shorter split finish."
      },
      {
        "id": "garrison-ramp",
        "name": "Garrison Ramp",
        "latitude": 38.6083,
        "longitude": -83.1637,
        "mileFromStart": 31.5,
        "segmentKind": "creek",
        "note": "Default take-out for the full Kinniconick chain."
      }
    ]
  },
  "upper-cumberland-river-varilla-4-mile": {
    "putIn": {
      "id": "varilla-ramp",
      "name": "Varilla Ramp",
      "latitude": 36.7447,
      "longitude": -83.6103
    },
    "takeOut": {
      "id": "4-mile-ramp",
      "name": "4 Mile Ramp",
      "latitude": 36.793,
      "longitude": -83.7534
    },
    "logistics": {
      "distanceLabel": "About 13.8 mi",
      "estimatedPaddleTime": "About 4.5 hr to 7 hr, longer with scouting, higher water, or low-water scraping",
      "shuttle": "Stage the downstream vehicle at 4 Mile Ramp first, then drive back to Varilla by US-25E and US-119. This is a real point-to-point upper-river shuttle, not a quick roadside lap.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public ramps, follow Kentucky boating and PFD rules, and do not pass the planned take-out.",
      "camping": "Treat this as a day route. KDFWR does not document developed camping or normal overnight support at either access.",
      "campingClassification": "none",
      "summary": "Launch at Varilla Ramp and finish at 4 Mile Ramp for the official 13.8-mile Upper Cumberland segment above Pineville. Use the Williamsburg gauge and plan conservatively whenever the river is outside the 300 to 700 cfs good band.",
      "accessCaveats": [
        "4 Mile Ramp is the required take-out. KDFWR says a low-head dam lies about three-quarters of a mile downstream of the ramp, so missing the finish is not acceptable.",
        "Varilla has only a small gravel parking area and no other services. Start with shuttle and emergency plans already sorted out.",
        "Most shoreline between the ramps is private, and the corridor is remote enough that improvised bank exits may be unrealistic."
      ],
      "watchFor": [
        "The low-head dam below 4 Mile Ramp.",
        "Fresh wood, rain-driven rises, and shallow riffles that become pushier above the official good band.",
        "Fatigue or take-out confusion late in the run when the US-25E bridge at 4 Mile comes into view."
      ]
    }
  },
  "upper-cumberland-river-4-mile-artemus": {
    "putIn": {
      "id": "4-mile-ramp",
      "name": "4 Mile Ramp",
      "latitude": 36.793,
      "longitude": -83.7534
    },
    "takeOut": {
      "id": "artemus-rock-access",
      "name": "Artemus Rock Access",
      "latitude": 36.824,
      "longitude": -83.844
    },
    "logistics": {
      "distanceLabel": "About 9.8 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr, longer with fishing stops, low-water scraping, or higher-water caution",
      "shuttle": "Stage the downstream vehicle at Artemus Rock Access first, then drive back to 4 Mile Ramp. The shuttle is short, but the rough gravel-bar finish is worth scouting before you commit the run.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and stay off private banks between the endpoints.",
      "camping": "Treat this as a day route. KDFWR documents no developed camping at 4 Mile and does not treat Artemus as an overnight facility.",
      "campingClassification": "none",
      "summary": "Launch at 4 Mile Ramp and finish at Artemus Rock Access for the official 9.8-mile Upper Cumberland segment north of Pineville. Use the Williamsburg gauge and expect a quicker push whenever the river is above the 300 to 700 cfs good band.",
      "accessCaveats": [
        "Artemus is a rough gravel-bar access that KDFWR says may be muddy or unsuitable for some vehicles. Confirm the take-out before launching upstream.",
        "This segment has clean public endpoints, but most shoreline between them is private. Do not count on random bars or bridge shoulders as substitute stops.",
        "Higher-water days can make the route feel simpler at first and more pushy later, especially if wood has shifted into bends."
      ],
      "watchFor": [
        "Shallow riffles and rock gardens during lower water.",
        "Fresh wood, strainers, and faster current after rain.",
        "Muddy footing and awkward recovery at Artemus."
      ]
    }
  },
  "upper-cumberland-river-varilla-artemus": {
    "putIn": {
      "id": "varilla-ramp",
      "name": "Varilla Ramp",
      "latitude": 36.7447,
      "longitude": -83.6103
    },
    "takeOut": {
      "id": "artemus-rock-access",
      "name": "Artemus Rock Access",
      "latitude": 36.824,
      "longitude": -83.844
    },
    "logistics": {
      "distanceLabel": "About 23.6 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr, longer with low-water scraping, scouting, or higher-water caution",
      "shuttle": "Leave the downstream vehicle at Artemus Rock Access, then drive back to Varilla Ramp. This is a real upper-river commitment with a long day on the water rather than a casual split float.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public access points, follow Kentucky boating and PFD rules, and respect private banks throughout the corridor.",
      "camping": "Treat this as a long day route. KDFWR does not document developed camping or normal overnight support at Varilla, 4 Mile, or Artemus.",
      "campingClassification": "none",
      "summary": "Launch at Varilla Ramp and finish at Artemus Rock Access for a long Upper Cumberland corridor route built from the official Varilla-to-4-Mile and 4-Mile-to-Artemus segments. Use the Williamsburg gauge and plan conservatively whenever the river is outside the 300 to 700 cfs good band.",
      "accessCaveats": [
        "This is a long committed route with sparse services and few realistic legal stop options away from the named accesses.",
        "Artemus is a rough gravel-bar take-out that may be muddy or awkward. Do not assume the finish will be easy to improvise at the end of a tiring day.",
        "Low water can turn this route into a much longer grind, while high water can make the long downstream push feel more consequential than the mild rapids suggest."
      ],
      "watchFor": [
        "Fresh wood, rain-driven rises, and mild rapids that stack up over a long day.",
        "Private banks and limited bailout quality between the named accesses.",
        "Fatigue, daylight management, and a muddy finish at Artemus."
      ]
    }
  },
  "upper-cumberland-river-varilla-barbourville": {
    "putIn": {
      "id": "varilla-ramp",
      "name": "Varilla Ramp",
      "latitude": 36.7447,
      "longitude": -83.6103
    },
    "takeOut": {
      "id": "barbourville-ramp",
      "name": "Barbourville Ramp",
      "latitude": 36.8603,
      "longitude": -83.8893
    },
    "logistics": {
      "distanceLabel": "About 28.7 mi",
      "estimatedPaddleTime": "About 8.5 hr to 11.5 hr, longer with low-water scraping, scouting, or higher-water caution",
      "shuttle": "Leave the downstream vehicle at Thompson Park in Barbourville, then drive back to Varilla Ramp. This is a full upper-river commitment with a long day on the water rather than a casual split float.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public access points, follow Kentucky boating and PFD rules, and respect private banks throughout the corridor.",
      "camping": "Barbourville Ramp sits in Thompson Park, where KDFWR says an RV campground with full hookups is available. Most paddlers will still treat the route itself as a very long day float into a campground-supported finish.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Varilla Ramp and finish at Barbourville Ramp for a full Upper Cumberland corridor route built from the official Varilla-to-4-Mile, 4-Mile-to-Artemus, and Artemus-to-Barbourville segments. Use the Williamsburg gauge and plan conservatively whenever the river is outside the 300 to 700 cfs good band.",
      "accessCaveats": [
        "This is a long committed route with sparse services and few realistic legal stop options away from the named accesses.",
        "Artemus sits mid-corridor as a rough gravel-bar access rather than a clean casual bailout. Do not assume it will solve problems easily once the route is underway.",
        "Barbourville is the intended public finish with the cleanest downstream services, including Thompson Park campground support."
      ],
      "watchFor": [
        "Fresh wood, rain-driven rises, and mild rapids that stack up over a long day.",
        "Private banks and limited bailout quality between the named accesses.",
        "Fatigue, daylight management, and faster approach speed into Barbourville on higher-water days."
      ]
    }
  },
  "upper-cumberland-river-artemus-barbourville": {
    "putIn": {
      "id": "artemus-rock-access",
      "name": "Artemus Rock Access",
      "latitude": 36.824,
      "longitude": -83.844
    },
    "takeOut": {
      "id": "barbourville-ramp",
      "name": "Barbourville Ramp",
      "latitude": 36.8603,
      "longitude": -83.8893
    },
    "logistics": {
      "distanceLabel": "About 5.1 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with fishing stops, scouting, or higher water",
      "shuttle": "Leave the downstream vehicle at Thompson Park in Barbourville, then drive back to Artemus. The shuttle is short, but the rough gravel-bar put-in is worth scouting before you commit the carry and parking.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public access points, follow Kentucky boating and PFD rules, and respect private banks between them.",
      "camping": "Barbourville Ramp sits in Thompson Park, where KDFWR says an RV campground with full hookups is available. This route works best as a short campground-based day float rather than as river-camping travel.",
      "campingClassification": "endpoint_campground",
      "summary": "Put in at Artemus Rock Access and take out at Barbourville Ramp for the short official Upper Cumberland segment into Thompson Park. The route is manageable at normal water, but the rough put-in and rain-sensitive current still deserve attention.",
      "accessCaveats": [
        "KDFWR says the path to Artemus can be rough and muddy, and the gravel bar may not suit every vehicle. Confirm shuttle practicality before you launch.",
        "Barbourville is the clean public finish. Do not rely on bridge shoulders or private banks between Artemus and town as substitute take-outs.",
        "Even on this shorter segment, higher water above the official good band can hide more of the shallow features and make the current feel pushier than expected."
      ],
      "watchFor": [
        "Shallow rapids and rock gardens during low water.",
        "Fresh strainers or wood after rain.",
        "Muddy footing at Artemus and faster current around bends on higher-water days."
      ]
    }
  },
  "upper-cumberland-river-4-mile-barbourville": {
    "putIn": {
      "id": "4-mile-ramp",
      "name": "4 Mile Ramp",
      "latitude": 36.793,
      "longitude": -83.7534
    },
    "takeOut": {
      "id": "barbourville-ramp",
      "name": "Barbourville Ramp",
      "latitude": 36.8603,
      "longitude": -83.8893
    },
    "logistics": {
      "distanceLabel": "About 14.9 mi",
      "estimatedPaddleTime": "About 4.5 hr to 7 hr, longer with low-water scraping, scouting, or higher-water caution",
      "shuttle": "Leave the downstream vehicle at Thompson Park in Barbourville, then drive back to 4 Mile Ramp. The shuttle is reasonable, but this is still a meaningful river day rather than an in-town park loop.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and respect private banks between them.",
      "camping": "Barbourville Ramp sits in Thompson Park, where KDFWR says an RV campground with full hookups is available. Most paddlers will still treat the route itself as a day float into a campground-supported finish.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at 4 Mile Ramp and finish at Barbourville Ramp for an Upper Cumberland combination built from the official 4-Mile-to-Artemus and Artemus-to-Barbourville segments. Use the Williamsburg gauge and expect stronger current whenever the river is above the 300 to 700 cfs good band.",
      "accessCaveats": [
        "Artemus sits mid-corridor and is a rough gravel-bar access rather than a clean casual bailout. Do not assume it will solve problems easily once the route is underway.",
        "Barbourville is the intended public finish with the cleanest downstream services. Do not count on bridge shoulders or private banks as substitute exits.",
        "At higher water the route can feel straightforward at the start and noticeably pushier later, especially when landing at Thompson Park."
      ],
      "watchFor": [
        "Shallow rapids and scrape-prone riffles during lower water.",
        "Fresh wood, faster current, and muddy mid-corridor landings after rain.",
        "Fatigue on the longer day and approach speed into Barbourville at higher water."
      ]
    }
  },
  "upper-cumberland-river-williamsburg-redbird": {
    "putIn": {
      "id": "williamsburg-ramp",
      "name": "Williamsburg Ramp",
      "latitude": 36.7452,
      "longitude": -84.158
    },
    "takeOut": {
      "id": "redbird-ramp",
      "name": "Redbird Ramp",
      "latitude": 36.7621,
      "longitude": -84.2216
    },
    "logistics": {
      "distanceLabel": "About 11.5 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with fishing stops, wind, or higher-water caution",
      "shuttle": "Stage the downstream vehicle at Redbird Ramp first, then drive back into Williamsburg to launch beside the Main Street Bridge. The shuttle is simple, but the route still covers enough river that weather and daylight matter.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public ramps, follow Kentucky boating and PFD rules, and stay off private banks between the accesses.",
      "camping": "Treat this as a day route. KDFWR documents public ramps at Williamsburg and Redbird but does not document route camping or campground support for this exact segment.",
      "campingClassification": "none",
      "summary": "Launch in Williamsburg and finish at Redbird Ramp for the official 11.5-mile Upper Cumberland segment downstream of town. Use the Williamsburg gauge and expect a stronger push when the river is above the 300 to 700 cfs good band.",
      "accessCaveats": [
        "The route starts in town but quickly feels more isolated, so plan food, daylight, and shuttle timing before launching.",
        "Redbird is the intended public finish. Do not assume bridge areas or private banks beyond it are normal casual exits.",
        "Higher-water days can make the long downstream glide feel easier at first and more consequential later, especially if fresh wood has moved into bends."
      ],
      "watchFor": [
        "Mild rapids, fresh wood, and quicker current after rain.",
        "Private banks and sparse legal stop options away from the named ramps.",
        "Wind, fatigue, and finish-ramp approach speed on higher-water days."
      ]
    }
  },
  "upper-cumberland-river-williamsburg-longbottom": {
    "putIn": {
      "id": "williamsburg-ramp",
      "name": "Williamsburg Ramp",
      "latitude": 36.7452,
      "longitude": -84.158
    },
    "takeOut": {
      "id": "long-bottom-access",
      "name": "Long Bottom Access",
      "latitude": 36.7772,
      "longitude": -84.3455
    },
    "logistics": {
      "distanceLabel": "About 20.5 mi",
      "estimatedPaddleTime": "About 6.5 hr to 9 hr, longer with fishing, low-water scraping, or a careful Long Bottom shuttle",
      "shuttle": "Stage the Long Bottom vehicle first, then drive back into Williamsburg for the launch beside the Main Street Bridge. Scout the final Forest Service Road 536 approach before committing because KDFWR says the last stretch down to Long Bottom is extremely rugged.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public access points, follow Kentucky boating and PFD rules, and keep emergency plans realistic for a remote gorge float.",
      "camping": "KDFWR says float campers use the banks downstream of Bee Shoals on this corridor. Treat that as primitive on-route overnight context rather than developed campground support, and avoid private banks outside the commonly used river corridor.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch in Williamsburg and continue past Redbird to Long Bottom for a longer Upper Cumberland gorge day. Use the direct Williamsburg gauge, but score the route against the stricter upstream Cumberland Falls band because the Long Bottom finish sits in the same rougher gorge corridor.",
      "accessCaveats": [
        "Williamsburg is the easy public launch; Long Bottom is a legitimate public access but the road and carry are much rougher than a normal paved take-out.",
        "The route is remote enough that daylight, weather, and self-rescue capacity matter more than on a town-edge river.",
        "Same-day USGS flow on this run was above the official 2,000 cfs skilled-paddler ceiling, so treat current conditions as too high rather than just sporty."
      ],
      "watchFor": [
        "Summer Shoals, Bee Shoals, Crow Shoals, and fresh wood after rain.",
        "Muddy footing, rough carry-down logistics, and very rugged road access at Long Bottom.",
        "Private banks and sparse bailout options away from the named public endpoints."
      ]
    }
  },
  "upper-cumberland-river-williamsburg-thunderstruck": {
    "putIn": {
      "id": "williamsburg-ramp",
      "name": "Williamsburg Ramp",
      "latitude": 36.7452,
      "longitude": -84.158
    },
    "takeOut": {
      "id": "thunderstruck-ramp",
      "name": "Thunderstruck Ramp",
      "latitude": 36.8077,
      "longitude": -84.3546
    },
    "logistics": {
      "distanceLabel": "About 22.5 mi",
      "estimatedPaddleTime": "About 7 hr to 9.5 hr, longer with scouting, fishing, or low-water scraping through the gorge half",
      "shuttle": "Stage the Thunderstruck take-out first, then drive back into Williamsburg to launch beside the Main Street Bridge. Do not count on Long Bottom or Mouth of Indian Creek as routine shuttle points because KDFWR describes those roads as extremely rough.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public ramps, follow Kentucky boating and PFD rules, and keep emergency plans realistic for a remote gorge float.",
      "camping": "KDFWR says float campers use the banks downstream of Bee Shoals on this route. Treat that as primitive on-route overnight context rather than developed campground support, and avoid private banks outside the commonly used river corridor.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch in Williamsburg and finish at Thunderstruck for a full first-gorge Upper Cumberland continuation. The gauge is still the direct Williamsburg station, but once the route drops below Redbird it should be judged by the tougher upstream Cumberland Falls flow band.",
      "accessCaveats": [
        "Williamsburg and Thunderstruck are the clean public endpoints. Long Bottom and Mouth of Indian Creek are route-context accesses only and are not dependable normal shuttle points.",
        "The float is remote enough that daylight, weather, and group self-rescue capacity matter more than on a town-edge run.",
        "Same-day USGS flow on this run was above the official 2,000 cfs skilled-paddler ceiling, so current conditions are outside the normal recommendation band."
      ],
      "watchFor": [
        "Summer Shoals, Bee Shoals, Crow Shoals, and Thunderstruck Shoals.",
        "Fresh wood, limited bailout options, and fast rises after rain.",
        "Private banks and rough gorge exits away from the named ramps."
      ]
    }
  },
  "upper-cumberland-river-williamsburg-cumberland-falls": {
    "putIn": {
      "id": "williamsburg-ramp",
      "name": "Williamsburg Ramp",
      "latitude": 36.7452,
      "longitude": -84.158
    },
    "takeOut": {
      "id": "cumberland-falls-carrydown",
      "name": "Cumberland Falls Carrydown",
      "latitude": 36.8421,
      "longitude": -84.3435
    },
    "logistics": {
      "distanceLabel": "About 28.1 mi",
      "estimatedPaddleTime": "About 9 hr to 12 hr, longer with scouting, stronger water, or careful setup for the mandatory carrydown above the falls",
      "shuttle": "Stage the Cumberland Falls vehicle first, then drive back into Williamsburg for the launch beside the Main Street Bridge. Inspect the falls-side carrydown before launching because the mandatory right-bank take-out above the falls is the core safety gate for the full route.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and do not launch if your group is not prepared for a mandatory take-out above Cumberland Falls.",
      "camping": "KDFWR says float campers use the banks downstream of Bee Shoals on this corridor, and Cumberland Falls State Resort Park adds seasonal campground space and year-round lodging at the take-out. Treat that as managed corridor support rather than permission to camp on undeveloped private banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch in Williamsburg and continue all the way to Cumberland Falls Carrydown for the full Upper Cumberland gorge planner. The route begins with an easier town launch but finishes as an advanced above-the-falls whitewater day with a mandatory take-out.",
      "accessCaveats": [
        "Williamsburg is the clean upstream public launch. Long Bottom is a legitimate mid-route access, but KDFWR says the final road approach is extremely rugged and not a normal easy bailout.",
        "KDFWR says to work to the right side of the river before the KY 90 bridge and take out at the public falls parking/carrydown area. Missing that move is a stand-down failure, not a recoverable inconvenience.",
        "Same-day USGS flow on this run was above the official 2,000 cfs skilled-paddler ceiling, so treat current conditions as too high even before any extra rain arrives."
      ],
      "watchFor": [
        "Summer Shoals, Bee Shoals, Crow Shoals, Thunderstruck Shoals, Pitch Rapids, Slick Shoals gorge current, and the drop sequence below Blue Bend.",
        "The mandatory take-out above Cumberland Falls.",
        "Fresh wood, rain-driven rises, private gorge banks, sparse mid-route exits, and fatigue over a long whitewater corridor."
      ]
    }
  },
  "barren-river-martinsville-potter-combs": {
    "putIn": {
      "id": "martinsville-ford-claypool-ramp",
      "name": "Martinsville Ford / Claypool Ramp",
      "latitude": 36.9134,
      "longitude": -86.2293
    },
    "takeOut": {
      "id": "potter-combs-ramp",
      "name": "Potter/Combs Ramp",
      "latitude": 37.0027,
      "longitude": -86.4184
    },
    "logistics": {
      "distanceLabel": "About 24.0 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr, longer with low-water scraping, upstream wind, or fishing stops",
      "shuttle": "Leave the downstream vehicle at Potter/Combs Ramp in Weldon Pete Park, then drive back to Martinsville Ford / Claypool Ramp. This is a real full-day shuttle-and-commitment route, not a casual short float.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public ramps, follow Kentucky boating and PFD rules, and respect private banks between the endpoints.",
      "camping": "Treat this as a long day route unless you have separate legal camping plans away from the river. KDFWR does not document public camping support on this exact segment.",
      "campingClassification": "none",
      "summary": "Launch at Martinsville Ford / Claypool Ramp and finish at Potter/Combs Ramp for the official 24-mile lower-Barren middle segment. Use the Bowling Green gauge and expect a slow low-water day whenever the river stays below 350 cfs.",
      "accessCaveats": [
        "This is a very long lower-Barren day. Start early enough that low water, fishing, or wind does not push the take-out into dusk.",
        "Potter/Combs sits above a dam-influenced pooled section near Weldon Pete Park. Use the named park ramp rather than drifting downstream looking for another city-bank exit.",
        "Most of the shoreline between the two ramps is private. Do not treat sand or mud banks as public rest stops just because the river is broad."
      ],
      "watchFor": [
        "Low water below about 350 cfs, when shoals and long pools can turn the route into a grind.",
        "High water above about 700 cfs, when bends, wood, and landings become less forgiving.",
        "Bridge-area current, upstream wind on open pools, and fresh debris after rain."
      ]
    }
  },
  "barren-river-state-street-beech-bend": {
    "putIn": {
      "id": "state-street-bridge-access",
      "name": "State Street Bridge Access",
      "latitude": 37.0017,
      "longitude": -86.4296
    },
    "takeOut": {
      "id": "beech-bend-campground-ramp",
      "name": "Beech Bend Campground Ramp",
      "latitude": 37.0192,
      "longitude": -86.3933
    },
    "logistics": {
      "distanceLabel": "About 3.1 mi",
      "estimatedPaddleTime": "About 1 hr to 2.5 hr, longer with higher current, scouting, or upstream wind on broad pools",
      "shuttle": "Leave the downstream vehicle at Beech Bend Campground Ramp only if your group has legal campground access, then drive back to State Street Bridge Access. Do not plan this route around an informal campground landing.",
      "permits": "No state paddling permit is known, but KDFWR says the Beech Bend ramp and bank access are for registered campers only. Follow campground rules, Kentucky boating and PFD rules, and the posted access signs at both ends.",
      "camping": "Beech Bend offers campground-backed overnight support at the take-out, but KDFWR says the ramp is only for registered campers. Treat this as an endpoint campground option rather than a general public camping route.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at State Street Bridge Access and finish at Beech Bend Campground Ramp for the official 3.1-mile lower-Barren segment. Use the Bowling Green gauge and expect an above-band faster day whenever the river rises above 700 cfs.",
      "accessCaveats": [
        "This route is only legitimate if you can legally use the Beech Bend campground ramp. KDFWR says it is for registered campers only.",
        "State Street and Beech Bend are the intended endpoints. Most shoreline between them is not public stopover space.",
        "The route is short, but high water or wind can still make the open pools feel less casual than the mileage suggests."
      ],
      "watchFor": [
        "Flows above about 700 cfs, when current at the campground landing becomes less forgiving.",
        "Private banks, bridge-area current, and fresh debris after rain.",
        "Any last-minute campground access restrictions that would invalidate the Beech Bend take-out plan."
      ]
    }
  },
  "barren-river-beech-bend-james-r-hines": {
    "putIn": {
      "id": "beech-bend-campground-ramp",
      "name": "Beech Bend Campground Ramp",
      "latitude": 37.0192,
      "longitude": -86.3933
    },
    "takeOut": {
      "id": "james-r-hines-boat-landing-ramp",
      "name": "James R. Hines Boat Landing Ramp",
      "latitude": 37.0161,
      "longitude": -86.4449
    },
    "logistics": {
      "distanceLabel": "About 4.6 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3.5 hr, longer with upstream wind, fishing stops, or higher water caution",
      "shuttle": "Leave the downstream vehicle at James R. Hines Boat Landing Ramp, then return to Beech Bend Campground Ramp only if your group has legal registered-camper access there.",
      "permits": "No route-specific paddling permit is known, but KDFWR says the Beech Bend ramp and bank access are for registered campers only. Follow campground rules, Kentucky boating and PFD rules, and the posted signs at both accesses.",
      "camping": "Beech Bend provides campground-backed overnight support at the put-in, but only for registered campers. Treat this as an endpoint campground route rather than a general public overnight float.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Beech Bend Campground Ramp and finish at James R. Hines Boat Landing Ramp for the official 4.6-mile lower-Barren segment. Use the Bowling Green gauge and expect stronger current than the usual good band when the river rises above 700 cfs.",
      "accessCaveats": [
        "Do not use this route unless Beech Bend campground access is legitimately arranged. KDFWR says the ramp is for registered campers only.",
        "James R. Hines is the clean public downstream finish. Do not plan on private-bank bailout options between the ramps.",
        "Even this shorter city-edge corridor can feel pushier at above-band flow than the mileage implies."
      ],
      "watchFor": [
        "Flows above about 700 cfs, when the broad current and landing moves become less forgiving.",
        "Private banks, fresh wood after rain, and upstream wind on slower pools.",
        "Any same-day campground access change that would make the Beech Bend launch invalid."
      ]
    }
  },
  "barren-river-beech-bend-lonnie-white": {
    "putIn": {
      "id": "beech-bend-campground-ramp",
      "name": "Beech Bend Campground Ramp",
      "latitude": 37.0192,
      "longitude": -86.3933
    },
    "takeOut": {
      "id": "lonnie-white-boat-ramp",
      "name": "Lonnie White Boat Ramp",
      "latitude": 37.0348,
      "longitude": -86.4984
    },
    "logistics": {
      "distanceLabel": "About 11.3 mi",
      "estimatedPaddleTime": "About 3.5 hr to 6.5 hr, longer with pooled finish drag, wind, or above-band caution stops",
      "shuttle": "Stage the take-out at Lonnie White Boat Ramp / Thomas Landing, then return to Beech Bend Campground Ramp only if your group has legal registered-camper access there. Leave margin for the slower pooled finish and Thomas Landing dusk closure.",
      "permits": "No route-specific paddling permit is known, but KDFWR says the Beech Bend ramp is for registered campers only. Follow campground rules, Kentucky boating and PFD rules, and use only the named public/authorized accesses.",
      "camping": "Beech Bend provides campground-backed overnight support at the put-in, but only for registered campers. The route itself does not have documented public on-river camping, so keep the classification at endpoint campground.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Beech Bend Campground Ramp and finish at Lonnie White Boat Ramp for the longer downstream lower-Barren continuation. Use the Bowling Green gauge and expect a faster-than-normal day above 700 cfs plus a slower pooled Thomas Landing finish.",
      "accessCaveats": [
        "This route only works if your Beech Bend launch is legal. KDFWR says the campground ramp is for registered campers only.",
        "Lonnie White / Thomas Landing is the intended finish and the park closes at dusk, so leave extra margin on slower or windier days.",
        "Most shoreline between the endpoints is private and should not be treated as a public rest-stop or bailout network."
      ],
      "watchFor": [
        "Flows above about 700 cfs, when current picks up and the longer route feels more consequential.",
        "Pooled finish water near Thomas Landing, upstream wind, and fresh debris after rain.",
        "Any same-day campground or access change that would invalidate the Beech Bend launch plan."
      ]
    }
  },
  "barren-river-state-street-james-r-hines": {
    "putIn": {
      "id": "state-street-bridge-access",
      "name": "State Street Bridge Access",
      "latitude": 37.0017,
      "longitude": -86.4296
    },
    "takeOut": {
      "id": "james-r-hines-boat-landing-ramp",
      "name": "James R. Hines Boat Landing Ramp",
      "latitude": 37.0161,
      "longitude": -86.4449
    },
    "logistics": {
      "distanceLabel": "About 7.7 mi",
      "estimatedPaddleTime": "About 2.5 hr to 5 hr, longer with low-water scraping, fishing stops, or upstream wind",
      "shuttle": "Leave the downstream vehicle at James R. Hines Boat Landing Ramp, then drive back to State Street Bridge Access. The shuttle is simple, but the route still covers enough broad-river water that weather and daylight matter.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and do not treat private banks or the campers-only Beech Bend ramp as public route facilities.",
      "camping": "Treat this as a day route. KDFWR says Beech Bend access is available only to registered campers, so it should not be treated as normal route camping or a public overnight endpoint.",
      "campingClassification": "none",
      "summary": "Launch at State Street Bridge Access and finish at James R. Hines Boat Landing Ramp for a mid-length lower-Barren city route. Use the Bowling Green gauge and expect a slower day whenever the river sits below 350 cfs.",
      "accessCaveats": [
        "State Street and James R. Hines are the clean public endpoints for this route. KDFWR says Beech Bend is for registered campers only, so do not count on it as a routine public shuttle or bailout.",
        "Most shoreline outside the named accesses is private. Keep rest stops and the take-out strictly inside the public access footprint.",
        "Even though this corridor stays near Bowling Green, it is still a point-to-point river day rather than a park loop."
      ],
      "watchFor": [
        "Low water below about 350 cfs, when shoals and broad slow pools can drag out the trip.",
        "High water above about 700 cfs, when current at bends, bridge areas, and the downstream landing becomes less forgiving.",
        "Upstream wind on open pools, fresh wood after rain, and bridge-adjacent current."
      ]
    }
  },
  "barren-river-james-r-hines-lonnie-white": {
    "putIn": {
      "id": "james-r-hines-boat-landing-ramp",
      "name": "James R. Hines Boat Landing Ramp",
      "latitude": 37.0161,
      "longitude": -86.4449
    },
    "takeOut": {
      "id": "lonnie-white-boat-ramp",
      "name": "Lonnie White Boat Ramp",
      "latitude": 37.0348,
      "longitude": -86.4984
    },
    "logistics": {
      "distanceLabel": "About 6.7 mi",
      "estimatedPaddleTime": "About 2 hr to 4.5 hr, longer with low-water scraping, fishing stops, or upstream wind",
      "shuttle": "Leave the downstream vehicle at Lonnie White Boat Ramp / Thomas Landing, then drive back to James R. Hines Boat Landing Ramp. Start early enough that a slow pooled finish does not run into the Thomas Landing dusk closure.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public ramps, follow Kentucky boating and PFD rules, and respect private banks between the named accesses.",
      "camping": "Treat this as a day route. KDFWR does not document public route camping on this segment, and Thomas Landing is a park access rather than an overnight site.",
      "campingClassification": "none",
      "summary": "Launch at James R. Hines Boat Landing Ramp and finish at Lonnie White Boat Ramp for the official 6.7-mile lower-Barren segment. Use the Bowling Green gauge and expect slower pooled water whenever the river stays below 350 cfs.",
      "accessCaveats": [
        "Lonnie White / Thomas Landing is the intended finish. KDFWR says the park closes at dusk, so do not launch late on a marginal-flow day.",
        "The lower reach is pooled by Lock and Dam 1 influence near Greencastle, which can make the finish feel slower and more wind-exposed than the mileage suggests.",
        "Most shoreline between the ramps is private and should not be treated as public rest-stop space."
      ],
      "watchFor": [
        "Low water below about 350 cfs, when shoals, slack pools, and upstream wind can slow the route.",
        "High water above about 700 cfs, when bridge current, bends, and landings get less forgiving.",
        "Pooled finish water near Thomas Landing, fresh debris after rain, and sparse services away from the ramps."
      ]
    }
  },
  "barren-river-state-street-lonnie-white": {
    "putIn": {
      "id": "state-street-bridge-access",
      "name": "State Street Bridge Access",
      "latitude": 37.0017,
      "longitude": -86.4296
    },
    "takeOut": {
      "id": "lonnie-white-boat-ramp",
      "name": "Lonnie White Boat Ramp",
      "latitude": 37.0348,
      "longitude": -86.4984
    },
    "logistics": {
      "distanceLabel": "About 14.4 mi",
      "estimatedPaddleTime": "About 4.5 hr to 8 hr, longer with low water, upstream wind, or fishing stops",
      "shuttle": "Stage the take-out at Lonnie White Boat Ramp / Thomas Landing, then drive back to State Street Bridge Access. This is a real full-day downstream commitment, not a short after-work paddle.",
      "permits": "No route-specific paddling permit is known. Use the KDFWR-listed public accesses, follow Kentucky boating and PFD rules, and do not count on private banks or the campers-only Beech Bend ramp as route facilities.",
      "camping": "Treat this as a long day route. KDFWR does not document public camping support on this exact corridor, and Beech Bend access is limited to registered campers rather than general route users.",
      "campingClassification": "none",
      "summary": "Launch at State Street Bridge Access and finish at Lonnie White Boat Ramp for the longer downstream lower-Barren city segment. Use the Bowling Green gauge and expect a long slow day whenever the river stays below 350 cfs.",
      "accessCaveats": [
        "This route passes Beech Bend and James R. Hines, but only State Street and Lonnie White are the intended public endpoints. KDFWR says Beech Bend is for registered campers only.",
        "The lower finish at Thomas Landing is pooled by Lock and Dam 1 influence, so leave margin for a slower final stretch and the park dusk closure.",
        "Most shoreline between the endpoints is private. Do not assume wide banks or bars are legal public stops."
      ],
      "watchFor": [
        "Low water below about 350 cfs, when shoals, broad pools, and wind can turn the day into a grind.",
        "High water above about 700 cfs, when bridge current, bends, and landings become less forgiving across a long day.",
        "Upstream wind, fresh wood after rain, and fatigue on the pooled Thomas Landing finish."
      ]
    }
  }
};
