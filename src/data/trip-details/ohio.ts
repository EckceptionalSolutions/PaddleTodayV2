// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const ohioRiverTripDetails: Record<string, RiverTripDetails> = {
  "vermilion-river-schoepfle-mill-hollow": {
    "putIn": {
      "name": "Birmingham Community Center / Schoepfle Garden river access",
      "latitude": 41.326667,
      "longitude": -82.357333
    },
    "takeOut": {
      "name": "Mill Hollow / Vermilion River Reservation",
      "latitude": 41.381833,
      "longitude": -82.3155
    },
    "logistics": {
      "distanceLabel": "8.1 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr depending on stage and scouting",
      "shuttle": "Use a two-car shuttle between Birmingham / Schoepfle Garden and Mill Hollow. Confirm current park access and parking before staging because the put-in is tied to the Birmingham public-access context rather than a polished boat ramp.",
      "permits": "No route-specific paddling permit is known. Follow Lorain County Metro Parks, ODNR water-trail, and posted local access rules at both ends.",
      "camping": "Treat this as a day trip. No on-route camping is assumed for the Schoepfle Garden to Mill Hollow run.",
      "summary": "Launch from the Birmingham / Schoepfle Garden access context and take out at Mill Hollow in Vermilion River Reservation. American Whitewater documents this as an 8.1-mile middle Vermilion run with mostly Class I water and a couple light Class II sections.",
      "accessCaveats": [
        "ODNR publishes Schoepfle Garden / Birmingham coordinates for the Vermilion River access area, but the exact riverbank launch should be confirmed on arrival with local signage and current park rules.",
        "Mill Hollow is an official Vermilion River Reservation / water-trail access area, but shoreline conditions can change after high water.",
        "Do not continue downstream into the lower Vermilion or Lake Erie unless you have a separate open-water and take-out plan."
      ],
      "watchFor": [
        "Low, scrapable water below the AW runnable floor and during dry summer spells.",
        "Light Class II riffles after the SR 113 crossing and before Dean Hollow Bridge when the river is in the preferred stage range.",
        "Wood, strainers, fast rises after rain, and stronger current or bridge hazards at high water."
      ]
    }
  },
  "vermilion-river-mill-hollow-vermilion-boat-ramp": {
    "putIn": {
      "name": "Mill Hollow / Vermilion River Reservation access",
      "latitude": 41.38278,
      "longitude": -82.315
    },
    "takeOut": {
      "name": "South Street Municipal Public Boat Ramp",
      "latitude": 41.420188,
      "longitude": -82.356651
    },
    "logistics": {
      "distanceLabel": "5.3 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr depending on stage, wind, and flatwater pace",
      "shuttle": "Use a short two-car shuttle between Mill Hollow and the South Street public boat ramp in Vermilion. The take-out is easy to identify, but downtown/event traffic can slow pickup logistics on busy summer weekends.",
      "permits": "No route-specific paddling permit is known. Follow Lorain County Metro Parks, City of Vermilion launch-fee, parking, and posted access rules.",
      "camping": "Treat this as a day trip. No on-route camping is assumed for the lower Vermilion into town.",
      "summary": "Launch from Mill Hollow in Vermilion River Reservation and take out at the South Street Municipal Public Boat Ramp. This follows the AW lower Vermilion reach and keeps the run inside the official public river-access pair.",
      "accessCaveats": [
        "Mill Hollow is an official metro-park river access, but river-edge conditions can change after floods.",
        "The South Street ramp is a formal city facility with kayak/canoe launching and parking; check current local fees or event restrictions before staging.",
        "Do not drift past the planned take-out into the Lake Erie mouth unless open-water conditions and your shuttle plan both support it."
      ],
      "watchFor": [
        "Low water and scrapier current near the upstream half if the gauge is only barely above the AW floor.",
        "Log jams, bridge abutments, and faster current after rain or at high water.",
        "Flatwater wind, marina traffic, and motorboat wakes near the final miles into Vermilion."
      ]
    }
  },
  "grand-river-harpersfield-hidden-valley": {
    "putIn": {
      "name": "Harpersfield Covered Bridge access",
      "latitude": 41.75649,
      "longitude": -80.946408
    },
    "takeOut": {
      "name": "Hidden Valley Park paddle access",
      "latitude": 41.741864,
      "longitude": -81.047837
    },
    "logistics": {
      "distanceLabel": "8.4 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr depending on level and stops",
      "shuttle": "Use a two-car shuttle from Harpersfield Covered Bridge to Hidden Valley Park. Lake Metroparks lists both as Grand River Water Trail paddle accesses with short carries from drop-off to water.",
      "permits": "No route-specific day paddling permit is known. Follow Lake Metroparks, Ashtabula Metroparks, and posted access rules; reserve campsites separately if using any water-trail camping.",
      "camping": "Treat this app entry as a day route. Nearby water-trail campsites exist elsewhere on the corridor, but camping requires separate planning and reservation.",
      "summary": "Put in below Harpersfield Covered Bridge and take out at Hidden Valley Park. This keeps the route to the AW-documented 8.4-mile Class I-II reach and the Lake Metroparks water-trail access pair.",
      "accessCaveats": [
        "The Harpersfield put-in is just below the covered bridge and ledge/play-spot area; scout the launch and current before committing.",
        "Hidden Valley Park is a public paddle access, but use the signed access and current park parking rules rather than informal banks.",
        "The downstream Grand River corridor has additional accesses, but continuing past Hidden Valley changes the mileage, hazards, and shuttle plan."
      ],
      "watchFor": [
        "Harpersfield ledge/drop features and standing waves, especially once levels rise above the easy end of the gauge band.",
        "Large wave trains and stronger eddy lines above the AW 1500 cfs intermediate-skills threshold.",
        "Wood, fast current, cold water in shoulder seasons, and floodplain closure risk during high or rising water."
      ]
    }
  },
  "great-miami-river-heritage-dravo": {
    "putIn": {
      "name": "Heritage Park canoe ramp",
      "latitude": 39.291548,
      "longitude": -84.661803
    },
    "takeOut": {
      "name": "Obergiesing Soccer Complex at Dravo Park canoe ramp",
      "latitude": 39.26157,
      "longitude": -84.68773
    },
    "logistics": {
      "distanceLabel": "6.1 mi by AW route listing; Colerain describes the ramps as just over 4 nautical miles apart",
      "estimatedPaddleTime": "Roughly 1.5 hr to 3.5 hr for skilled groups, depending heavily on flow and play stops",
      "shuttle": "Use a short two-car shuttle between Heritage Park and Obergiesing Soccer Complex at Dravo Park. Many whitewater boaters shorten the flatwater by using Blue Rock Road instead, but this V2 route keeps the official Colerain ramp-to-ramp pairing.",
      "permits": "No route-specific paddling permit is known. Follow Colerain Township park hours and posted ramp rules at both parks.",
      "camping": "No on-route camping assumed. Treat this as a short whitewater-training day run.",
      "summary": "Launch from the Heritage Park canoe ramp and take out at the Dravo Park canoe ramp. American Whitewater documents the Heritage/Blue Rock to Dravo reach as a dependable Cincinnati-area training run with Class I-II features and serious wood/strainer caveats.",
      "accessCaveats": [
        "The official sources found in this pass confirm named canoe ramps and addresses, but not ramp-level GIS coordinates; verify exact ramp locations on arrival.",
        "Blue Rock Road is a common alternate whitewater put-in that skips the first couple miles, but parking and access should be independently confirmed before using it instead of Heritage Park.",
        "At low levels the Dravo take-out can require following a maze of water, tree branches, and gravel-island channels to reach the ramp."
      ],
      "watchFor": [
        "Denny's Run strainers, wrapped-boat history, and rescues; scout or avoid if wood is present.",
        "Pushy current, strong eddylines, wave trains, and whirlpools as flow rises into the 3500-to-5000 cfs range.",
        "Floating wood and debris around 8000 cfs and after storms; this should be treated as stay-off water.",
        "This is not a casual recreational-kayak recommendation even when the gauge is in range."
      ]
    }
  },
  "little-beaver-creek-pioneer-village-sprucevale": {
    "putIn": {
      "name": "Pioneer Village Launch",
      "latitude": 40.727423,
      "longitude": -80.611394
    },
    "takeOut": {
      "name": "Sprucevale Launch",
      "latitude": 40.704704,
      "longitude": -80.585233
    },
    "logistics": {
      "distanceLabel": "About 3.2 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr depending on level and scouting",
      "shuttle": "Use a short Echo Dell Road shuttle between Pioneer Village in Beaver Creek State Park and the Sprucevale bridge launch. Stage Sprucevale first because it is a simple road-edge take-out rather than a large developed ramp.",
      "permits": "Ohio registration rules apply to recreational boats on this Ohio section. Follow current state-park, launch, and PFD rules at Beaver Creek State Park and the Sprucevale bridge access.",
      "camping": "Beaver Creek State Park Campground makes this a practical camp-and-paddle route at the put-in. Reserve separately, and do not assume legal overnight stopping on private banks between the launches.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Pioneer Village in Beaver Creek State Park and take out at Sprucevale for the short upper-Little-Beaver training run. The official guide uses 300 cfs on the East Liverpool USGS gauge as the minimum and treats the upper rapids as a beginner/intermediate whitewater section.",
      "accessCaveats": [
        "Pioneer Village is the named public launch inside Beaver Creek State Park. Campground and day-use traffic can tighten parking on busy weekends.",
        "Sprucevale is a straightforward bridge launch rather than a full-service park. Keep the road shoulder and access area clear for other users.",
        "This route intentionally stops above Fredericktown and Eagle Rapid. Continuing farther changes the hazard profile and should be treated as a different trip."
      ],
      "watchFor": [
        "Lock Ledge and Piano Rapid on the upper section, especially if the creek is rising or the group is still learning to read current.",
        "Fresh wood, strainers, and faster current after rain on a creek the official guide describes as flashy.",
        "Cold water outside the hottest part of summer and limited legal stopping options away from the named launches."
      ]
    }
  },
  "little-beaver-creek-sprucevale-lock-57-park": {
    "putIn": {
      "name": "Sprucevale Launch",
      "latitude": 40.704704,
      "longitude": -80.585233
    },
    "takeOut": {
      "name": "Lock 57 Park Launch",
      "latitude": 40.645913,
      "longitude": -80.512518
    },
    "logistics": {
      "distanceLabel": "About 10.9 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr depending on level, scouting, and group pace",
      "shuttle": "Use a longer shuttle between Sprucevale and Lock 57 Park near Ohioville. Stage Lock 57 first because it sits at the mouth of Little Beaver Creek just upstream from the Ohio River.",
      "permits": "Check current Ohio and Pennsylvania boating, launch, and PFD rules before using this border-section route. Follow posted access rules at Sprucevale and Lock 57 Park and do not assume any informal bank is public.",
      "camping": "Treat this as a day trip. The official guide points to Beaver Creek State Park and Raccoon Creek State Park for camping, but neither sits at these endpoints and no on-route public campsite is documented.",
      "campingClassification": "none",
      "summary": "Launch at Sprucevale and take out at Lock 57 Park for the lower Little Beaver run to the Ohio River mouth. The official guide keeps the same 300 cfs minimum, but it also says the lower section is intermediate/advanced and that Eagle Rapid approaches Class III at high water.",
      "accessCaveats": [
        "Sprucevale is a simple bridge launch with less staging room than Pioneer Village. Keep vehicles tight and avoid blocking local traffic.",
        "Lock 57 Park is the planned exit at the creek mouth. Missing the take-out pushes you into the Ohio River environment and changes the trip materially.",
        "The route includes the Fredericktown / Eagle Rapid corridor. Scout and shorten the day if wood, weather, or group skill do not line up with the official lower-section warning level."
      ],
      "watchFor": [
        "Eagle Rapid just downstream of Fredericktown, where the guide says the feature approaches Class III at high water.",
        "Wider, deeper current on the lower section, plus wood, strainers, and fast rises after storms.",
        "Cold water, fatigue on a longer day, and private-bank limits in the rural lower corridor."
      ]
    }
  },
  "little-beaver-creek-pioneer-village-lock-57-park": {
    "putIn": {
      "name": "Pioneer Village Launch",
      "latitude": 40.727423,
      "longitude": -80.611394
    },
    "takeOut": {
      "name": "Lock 57 Park Launch",
      "latitude": 40.645913,
      "longitude": -80.512518
    },
    "logistics": {
      "distanceLabel": "About 14.1 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr depending on level, scouting, and group pace",
      "shuttle": "Use the full Beaver Creek State Park to Ohioville shuttle and leave extra daylight. This is a more committed day than either split section because it combines the upper training run with the lower Eagle-Rapid corridor.",
      "permits": "Check current Ohio and Pennsylvania boating, launch, and PFD rules before using this border-section route. Follow posted state-park and Lock 57 access rules and stay with the named public launches.",
      "camping": "Beaver Creek State Park Campground supports an endpoint-campground plan at the put-in. Reserve separately, and do not assume legal overnight use of private banks or the lower creek mouth corridor.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Pioneer Village in Beaver Creek State Park and continue all the way to Lock 57 Park for the full Little Beaver day. The official guide uses 300 cfs as the minimum, but this longer route includes both the upper rapids and Eagle Rapid downstream, so it is a conservative whitewater day rather than a casual scenic float.",
      "accessCaveats": [
        "Pioneer Village is the cleanest staging area in this family, but this route is long enough that a borderline gauge or late start can become a real problem by the lower section.",
        "Sprucevale is a mid-route bailout if the group decides not to continue into the lower Eagle-Rapid section, but the planned route assumes the full mouth finish at Lock 57 Park.",
        "Lock 57 Park is the mandatory planned exit. Do not continue into the Ohio River without a separate open-water and shuttle plan."
      ],
      "watchFor": [
        "Lock Ledge, Piano Rapid, Eagle Rapid, and any fresh downed wood on blind bends.",
        "Fast post-rain rises, cold water, and the cumulative fatigue of a 14-mile whitewater day.",
        "Private-bank limits, limited legal stops away from the named launches, and busier water near the Ohio River mouth."
      ]
    }
  },
  "little-miami-river-rogers-ballpark-carl-rahe": {
    "putIn": {
      "name": "South Lebanon Roger's Ballpark Access",
      "latitude": 39.3676,
      "longitude": -84.215533
    },
    "takeOut": {
      "name": "Carl A. Rahe Access",
      "latitude": 39.3182,
      "longitude": -84.2526
    },
    "logistics": {
      "distanceLabel": "5.5 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr depending on flow, stops, and wind",
      "shuttle": "Use a two-car shuttle between Carl A. Rahe Access at Foster and South Lebanon Roger's Ballpark Access. Warren County used this exact pattern for a public kayaking event, staging vehicles at Rahe and shuttling paddlers upstream.",
      "permits": "No route-specific paddling permit is known. Follow Ohio boating law, Little Miami State Park / scenic-river access rules, and any posted Warren County or local park restrictions.",
      "camping": "No on-route camping assumed. Treat this as a short day route with public access at the endpoints only.",
      "campingClassification": "none",
      "summary": "Launch from Roger's Ballpark Access in South Lebanon and take out at Carl A. Rahe Access near Foster. This is the requested 5.5-mile scenic-river reach, separate from the downstream Kelley-to-Milford whitewater/play card.",
      "accessCaveats": [
        "Roger's Ballpark and Carl A. Rahe are the planned public endpoints; nearby bridges in this corridor are emergency or non-launch context, not substitute access points.",
        "Carl A. Rahe is the planned take-out. Continuing downstream changes the trip into the Foster-to-Loveland corridor and should be planned separately.",
        "The scoring uses a downstream Milford gauge proxy and broad lower-Little-Miami flow guidance, so check local water clarity, recent rain, and posted access conditions before launch."
      ],
      "watchFor": [
        "Fresh strainers, downed trees, bridge current, shallow gravel bars, and changing channels after storms.",
        "Fast, muddy, or rising water after rain; this reach can feel much more consequential than a summer scenic float when the river is up.",
        "Private banks outside the named public accesses, plus busy warm-weather traffic from liveries and anglers."
      ]
    },
    "accessPoints": [
      {
        "id": "south-lebanon-rogers-ballpark-access",
        "name": "South Lebanon Roger's Ballpark Access",
        "latitude": 39.3676,
        "longitude": -84.215533,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the requested South Lebanon-to-Rahe float."
      },
      {
        "id": "carl-a-rahe-access",
        "name": "Carl A. Rahe Access",
        "latitude": 39.3182,
        "longitude": -84.2526,
        "mileFromStart": 5.5,
        "segmentKind": "creek",
        "note": "Default take-out at Foster, with parking and restroom context in the access sources."
      }
    ]
  },
  "little-miami-river-kelley-milford": {
    "putIn": {
      "name": "Kelley Nature Preserve canoe/kayak access",
      "latitude": 39.20997,
      "longitude": -84.30608
    },
    "takeOut": {
      "name": "Jim Terrell Park canoe launch",
      "latitude": 39.17041,
      "longitude": -84.29856
    },
    "logistics": {
      "distanceLabel": "4.9 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr depending on level, play stops, and wind",
      "shuttle": "Use a short two-car shuttle between Kelley Nature Preserve and Jim Terrell Park in Milford. The route can be extended downstream, but this entry ends at the AW-listed Milford take-out.",
      "permits": "No route-specific paddling permit is known. Follow Clermont County Parks, Milford, ODNR scenic-river, and posted access rules.",
      "camping": "No on-route camping assumed. Treat this as a short day route.",
      "campingClassification": "none",
      "summary": "Launch at Kelley Nature Preserve and take out at Jim Terrell Park. This follows the AW Kelley-to-Milford reach and the ODNR Little Miami Scenic River access sequence.",
      "accessCaveats": [
        "Kelley Nature Preserve is an official park access with a canoe/kayak launch, but parking can fill on busy warm weekends.",
        "Jim Terrell Park is the planned take-out; continuing below Milford changes the route and adds more access planning.",
        "The app score is calibrated to AW Class I-II feature levels, not to minimum-depth commercial tubing or livery-style floating."
      ],
      "watchFor": [
        "Boathouse Rapid, old low-head-dam remnants, shallow ledges, small holes, and possible rebar/manmade-structure hazards.",
        "Low-water walking in shallows below the AW floor and washed-out, pushier conditions above the preferred range.",
        "Strainers, floating debris after rain, and cold-water risk outside warm months."
      ]
    },
    "accessPoints": [
      {
        "id": "kelley-nature-preserve-canoe-kayak-access",
        "name": "Kelley Nature Preserve canoe/kayak access",
        "latitude": 39.20997,
        "longitude": -84.30608,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the AW Kelley-to-Milford reach."
      },
      {
        "id": "jim-terrell-park-canoe-launch",
        "name": "Jim Terrell Park canoe launch",
        "latitude": 39.17041,
        "longitude": -84.29856,
        "mileFromStart": 4.9,
        "segmentKind": "creek",
        "note": "Default take-out for the Kelley-to-Milford route; AW spells the park name Jim Tarrell, while ODNR/local references use Jim Terrell."
      }
    ]
  },
  "east-fork-little-miami-river-williamsburg-tunnel-mill": {
    "putIn": {
      "name": "Williamsburg Community Park",
      "latitude": 39.0519,
      "longitude": -84.0504
    },
    "takeOut": {
      "name": "Tunnel Mill Boat Ramp / Twin Bridges Road launch",
      "latitude": 39.0344,
      "longitude": -84.0682
    },
    "logistics": {
      "distanceLabel": "4.9 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr depending on flow, scouting, and lake-edge wind",
      "shuttle": "Use a short two-car shuttle between Williamsburg Community Park and the Tunnel Mill / Twin Bridges Road launch on East Fork Lake. The take-out is simple once you commit to it, but do not overshoot into broader lake water without a separate plan.",
      "permits": "No route-specific paddling permit is known. Follow East Fork State Park, USACE, and posted local access rules at both ends.",
      "camping": "Nearby basecamp is strong: East Fork State Park Campground is a large developed campground. Reserve separately if you want to turn this into a camp-and-paddle trip.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Williamsburg Community Park and take out at the Tunnel Mill / Twin Bridges Road launch above East Fork Lake. This keeps the route on the exact AW moving-water segment rather than turning it into a longer lake paddle.",
      "accessCaveats": [
        "The route uses American Whitewater's exact endpoint coordinates, but the public-launch proof is stronger at the park/lake level than as a polished river-specific GIS launch record; verify the final shoreline path on arrival.",
        "The Tunnel Mill finish sits at the lake edge. Wind, lake chop, and nearby powerboat traffic matter more near the take-out than they do upstream.",
        "Continuing beyond the take-out changes the route into lake boating and should be treated as a separate trip plan."
      ],
      "watchFor": [
        "Islands, small rapids, and strainers, especially after storms or at higher flows.",
        "Low-water scraping and tight lines around islands below the preferred range.",
        "Pushier current, fresh wood, and changing eddies if the Williamsburg gauge rises quickly after rain."
      ]
    },
    "accessPoints": [
      {
        "id": "williamsburg-community-park",
        "name": "Williamsburg Community Park",
        "latitude": 39.0519,
        "longitude": -84.0504,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the AW Williamsburg-to-Twin-Bridges reach."
      },
      {
        "id": "tunnel-mill-boat-ramp-twin-bridges-road",
        "name": "Tunnel Mill Boat Ramp / Twin Bridges Road launch",
        "latitude": 39.0344,
        "longitude": -84.0682,
        "mileFromStart": 4.9,
        "segmentKind": "lake",
        "note": "Default take-out at the lake edge; stop here unless the group has a separate lake plan."
      }
    ]
  },
  "cuyahoga-river-ira-lock-29": {
    "putIn": {
      "name": "Ira Road / Ira Trailhead put-in corridor",
      "latitude": 41.184583,
      "longitude": -81.58335
    },
    "takeOut": {
      "name": "Lock 29 Trailhead river access / Route 303",
      "latitude": 41.2428,
      "longitude": -81.55067
    },
    "logistics": {
      "distanceLabel": "6.9 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr depending on level, scouting, and flatwater pace",
      "shuttle": "Use a short Cuyahoga Valley shuttle between Ira Trailhead and Lock 29 Trailhead in Peninsula. A bike shuttle on the Towpath Trail is practical for some groups, but keep bikes and boats clear of busy trail traffic.",
      "permits": "No route-specific paddling permit is known. Follow Cuyahoga Valley National Park, Cuyahoga River Water Trail, parking, and posted access rules.",
      "camping": "No on-route camping assumed. Treat this as a day run through Cuyahoga Valley National Park.",
      "summary": "Launch from the Ira Road / Ira Trailhead corridor and take out at the official Lock 29 river access near Route 303 in Peninsula. This matches the AW Ira-to-303 reach while using the official Peninsula access for the take-out.",
      "accessCaveats": [
        "AW identifies the Ira Road put-in and nearby Towpath Trail parking, but the exact riverbank launch is less developed than Lock 29; verify the legal and practical path to the water on arrival.",
        "Lock 29 is the official Cuyahoga River Water Trail access at Route 303. Portage left around the upstream waterfall/dam-remnant area if approaching from above.",
        "Do not continue downstream into later Cuyahoga Valley sections without checking current NPS closures, wood reports, and separate gauge assumptions."
      ],
      "watchFor": [
        "Strainers and fresh wood, especially after storms and on blind bends.",
        "Poor or variable urban river water quality; avoid after heavy rain or sewage/water-quality alerts.",
        "Training/play features, shallow attainments, and changing difficulty as the Old Portage gauge rises through the AW range.",
        "Busy Towpath and Lock 29 parking areas during peak park hours."
      ]
    }
  },
  "cuyahoga-river-lock-29-boston-store": {
    "putIn": {
      "name": "Lock 29 Trailhead river access",
      "latitude": 41.2428,
      "longitude": -81.55067
    },
    "takeOut": {
      "name": "Boston Store Trailhead river access",
      "latitude": 41.2627,
      "longitude": -81.55948
    },
    "logistics": {
      "distanceLabel": "2.4 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr depending on level, scouting, and shuttle style",
      "shuttle": "Use a very short Cuyahoga Valley shuttle between Lock 29 and Boston Store. The Towpath Trail, nearby parking areas, and seasonal scenic-rail shuttle options make this one of the simpler Ohio river shuttles.",
      "permits": "No route-specific paddling permit is known. Follow Cuyahoga Valley National Park, water-trail, parking, and posted access rules.",
      "camping": "No on-route camping is assumed. Treat this as a short day run inside Cuyahoga Valley National Park.",
      "summary": "Put in at Lock 29 in Peninsula and take out at Boston Store Trailhead. This follows the exact AW Peninsula reach while using the two current NPS river-access sites.",
      "accessCaveats": [
        "Lock 29 is below the main hazard area, but if you scout upstream or accidentally continue above the access, stay away from the mill race, waterfall, and dam remnant.",
        "Both ends are busy public trailheads. Plan around peak visitor hours and use the signed launch paths rather than inventing shorter lines down the banks.",
        "Do not continue below Boston Store without checking the next access pair, gauge assumptions, and any current NPS closures separately."
      ],
      "watchFor": [
        "The initial Class II current below Lock 29 before the run settles into easier Class I water.",
        "Fresh strainers, cold water, and post-rain push that the gauge alone may not fully price in.",
        "Rocky carry paths, crowded parking, and bicyclist/pedestrian traffic around the shuttle."
      ]
    }
  }
};
