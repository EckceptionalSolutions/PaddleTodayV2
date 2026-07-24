// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const illinoisRiverTripDetails: Record<string, RiverTripDetails> = {
  "pecatonica-river-wes-block-tuttys": {
    "putIn": {
      "name": "Wes Block Trail Access",
      "latitude": 42.330992586134,
      "longitude": -89.666227460683
    },
    "takeOut": {
      "name": "Tutty's Crossing Trailhead",
      "latitude": 42.300190474464,
      "longitude": -89.615848288175
    },
    "logistics": {
      "distanceLabel": "6.4 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 4 hr",
      "shuttle": "Use a two-car shuttle between the Wes Block trailhead west of Freeport and Tutty's Crossing downtown. The Jane Addams Trail links the two access areas for bikes and walkers, but the simplest shuttle is still by vehicle.",
      "permits": "No route-specific paddling permit is known. Follow posted Freeport Park District, trailhead, and parking rules at both public launches.",
      "camping": "Treat this as a day route. No legal on-route overnight stop was confirmed between Wes Block and Tutty's Crossing, but Lake Le-Aqua-Na State Recreation Area is a nearby official campground base if you want to stay in Stephenson County.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Wes Block Trail Access and take out at Tutty's Crossing for a gentle Pecatonica day entering Freeport. The route is shorter and friendlier than the long rural lower-Pec shuttles, but the Darlington gauge is still only a same-river proxy and muddy banks are part of the experience.",
      "accessCaveats": [
        "Both endpoints are official trailheads with boat-launch amenities, but they are trailhead-style accesses rather than large paved-ramp complexes. Scout unloading and parking before staging a shuttle.",
        "Wes Block is the cleaner upstream public start. Tutty's Crossing is the logical downtown finish before longer Freeport combinations continue toward Hancock or the VFW.",
        "The Pecatonica is navigable, but banks outside public access areas are private and often muddy. Stay with named public launches for staging and take-out."
      ],
      "watchFor": [
        "Muddy banks, slippery footing, and awkward exits after recent high water.",
        "Downed trees, strainers, and changing current lines after storms even though the lower Pec is usually gentle.",
        "High, muddy water and shoreside strainers as the Darlington proxy pushes above about 291 cfs; above 501 cfs the lower river may be too high and unattractive for a broad recreational recommendation."
      ]
    }
  },
  "vermilion-river-lowell-oglesby": {
    "putIn": {
      "name": "Lowell / Vermillion River Rafting put-in",
      "latitude": 41.255211,
      "longitude": -89.014118
    },
    "takeOut": {
      "name": "Oglesby Vermilion River Boat Launch",
      "latitude": 41.302108,
      "longitude": -89.038255
    },
    "logistics": {
      "distanceLabel": "8.2 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr for a competent whitewater group",
      "shuttle": "Use a two-car shuttle from the Lowell / N.2249th Road rafting access to the City of Oglesby boat launch below Ed Hand Highway. Commercial rafting traffic may affect launch timing and parking.",
      "permits": "No separate app-known paddling permit is assumed, but private boaters should verify current access rules, outfitter requirements, and any Illinois DNR or local closure notices before launching.",
      "camping": "Treat this as a day run. Do not assume legal riverside camping or scouting access on private or not-yet-open state land along the corridor.",
      "summary": "Launch at the Lowell-side rafting put-in and take out at the Oglesby Vermilion River Boat Launch. The route follows American Whitewater's Wildcat Canyon reach through Matthiessen-area bluffs, pool-drop rapids, and the former cement-dam corridor.",
      "accessCaveats": [
        "American Whitewater specifically says access from N.2219th Road is no longer advised because of private-property concerns; use the Lowell rafting access instead.",
        "The take-out is a city-built public boat ramp with limited parking, so leave room for other boaters and rafting groups.",
        "Some side canyons and former industrial/state-addition lands are not necessarily open for public hiking, scouting, or portaging even when the river itself is runnable."
      ],
      "watchFor": [
        "Wildcat, a Class III rapid that changes character with flow and has multiple lines depending on level.",
        "Pushy current, large wave trains, and harder swims when the Leonore gauge climbs above the conservative target window.",
        "Cold water, strainers, wood piles, limited legal scout/portage options, and commercial rafting traffic."
      ]
    }
  },
  "kishwaukee-river-hickory-bills-distillery": {
    "putIn": {
      "id": "hickory-bills-canoe-launch",
      "name": "Hickory Bills Canoe Launch",
      "latitude": 42.255487,
      "longitude": -88.861792
    },
    "takeOut": {
      "id": "distillery-road-conservation-area",
      "name": "Distillery Road Conservation Area canoe launch",
      "latitude": 42.25686,
      "longitude": -88.9112
    },
    "logistics": {
      "distanceLabel": "About 4.4 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer in low water or headwind",
      "shuttle": "Use a short Belvidere-area shuttle from Distillery Road Conservation Area back to Hickory Bills Canoe Launch. Stage the Distillery Road take-out first because the conservation area can close during hunting seasons or winter conditions.",
      "permits": "No route-specific paddling permit is known. Follow Belvidere Park District and Boone County Conservation District rules, posted hours, parking limits, hunting-season closures, and any current Illinois DNR river notices.",
      "camping": "Treat this as a short day trip. No legal on-route camping plan is assumed, and paddlers should not land on private banks except for emergency safety needs.",
      "summary": "Launch at Hickory Bills Canoe Launch in Belvidere and take out at the Distillery Road Conservation Area canoe launch. This avoids the upstream Belvidere Dam portage and uses the Belvidere USGS gauge that local Kishwaukee access managers point paddlers toward.",
      "accessCaveats": [
        "Illinois public-water access rules are stricter and more confusing than many nearby states. Use the established public launches and do not assume permission to land on private banks along the route.",
        "The BCCD/Openlands water-trail map identifies Hickory Bills and Distillery Road as established launch sites, but Distillery Road is a conservation area with posted hours and hunting-season closures.",
        "Inspect the Distillery Road take-out before launching if you have not used it before; the shoreline is natural rather than a large concrete ramp."
      ],
      "watchFor": [
        "Shallow riffles and gravel-bar scraping when the Belvidere gauge is 200 cfs or lower.",
        "Very high, dirty, pushier water when the gauge rises above 600 cfs, especially after storms.",
        "Strainers, wood, blind bends, wind on open bends, and changing natural-bank landings.",
        "Wastewater-treatment-plant discharge context near Belvidere; avoid paddling after heavy rain or when water quality looks poor."
      ]
    }
  },
  "fox-river-yorkville-whitewater-course": {
    "putIn": {
      "id": "marge-cline-course-put-in",
      "name": "Marge Cline Whitewater Course put-in / upstream launch",
      "latitude": 41.643002,
      "longitude": -88.445
    },
    "takeOut": {
      "id": "marge-cline-course-take-out",
      "name": "Marge Cline Whitewater Course take-out / downstream portage",
      "latitude": 41.641998,
      "longitude": -88.443001
    },
    "logistics": {
      "distanceLabel": "0.23 mi / about 1,100 ft",
      "estimatedPaddleTime": "Play-park session; laps vary by level and skill",
      "shuttle": "No road shuttle is needed for normal laps. Use downtown Yorkville or Riverfront Park parking, launch at the course put-in, and walk the concrete path back upstream between laps or exit at the designated downstream portage.",
      "permits": "No route-specific paddling fee is known. The city describes the course as open-use; follow posted park, parking, boating, and safety signs and bring your own whitewater-appropriate PFD and gear.",
      "camping": "Treat this as a short day-use whitewater session. Use separate local lodging or campground plans if staying overnight.",
      "campingClassification": "none",
      "summary": "Use Marge Cline Whitewater Course for short Fox River laps around the Glen D. Palmer Dam bypass. Score it off USGS 05551580 with a conservative 250 cfs floor, then make a same-day call on crowding, feature shape, and high-water push before committing.",
      "accessCaveats": [
        "The city says the course is open-use and identifies an east-end boat launch plus a designated downstream portage point west of the Route 47 bridge on the south bank next to the Yorkville Parks and Recreation building.",
        "This is a whitewater play park rather than a downstream Fox River float. Normal use is repeated laps with the on-site concrete walk-back path, not a one-way river trip.",
        "American Whitewater maps exact put-in and take-out points for the same reach, but use current city signs and the obvious portage layout on arrival because warm-weather crowds, tubers, and events can change how the park feels on the day.",
        "Most public parking is in nearby municipal lots rather than directly beside the chute. Carry boats accordingly and use only the city lots that allow the needed parking duration."
      ],
      "watchFor": [
        "Glen D. Palmer Dam context, the short engineered whitewater course, bridge-adjacent current, and any temptation to improvise lines outside the official bypass and portage setup.",
        "Flows near or below about 250 cfs, when the course gets shallower, scrapier, and more technical for hull contact.",
        "High or rising water, when American Whitewater still marks the reach runnable but the short course becomes pushier and less forgiving for novice whitewater paddlers.",
        "Tubers, swimmers, anglers near the park, strong eddy lines, rocks, slippery concrete or shoreline footing, and no on-site lifeguard."
      ]
    }
  }
};
