// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const missouriRiverTripDetails: Record<string, RiverTripDetails> = {
  "current-river-cedar-grove-akers": {
    "putIn": {
      "name": "Cedar Grove Boat Launch / access",
      "latitude": 37.42238,
      "longitude": -91.6083
    },
    "takeOut": {
      "name": "Akers Lower / Akers Ferry access",
      "latitude": 37.37591,
      "longitude": -91.55148
    },
    "logistics": {
      "distanceLabel": "7.7 mi",
      "estimatedPaddleTime": "About 3 hr for canoes and kayaks; longer with stops, low water, wind, rafts, or tubes",
      "shuttle": "Use a two-car or authorized outfitter shuttle between Cedar Grove and Akers Ferry. Cell service is limited in the park, so set the take-out vehicle and pickup plan before launching.",
      "permits": "No route-specific private-vessel paddling fee is known inside Ozark National Scenic Riverways. Follow NPS rules, posted signs, designated access layouts, parking limits, no-glass/no-polystyrene rules, and any current river closure notices.",
      "camping": "Treat this as a day float unless you have a separate legal camping plan. Cedar Grove has a small NPS campground, and gravel-bar camping has NPS rules and location limits; do not assume any bank is public just because it is reachable from the river.",
      "summary": "Launch at Cedar Grove and take out at Akers Ferry for the NPS-listed 7.7-mile Upper Current River day float. Use the Akers USGS gauge as a direct same-day low-water check, with the app using only a conservative 230 cfs minimum floor.",
      "accessCaveats": [
        "Cedar Grove and Akers are standard Ozark National Scenic Riverways access points, but practical launch lanes, parking, outfitter traffic, and temporary flood or maintenance restrictions can change. Follow current NPS signs on arrival.",
        "Endpoint coordinates are practical access anchors from Mapcarta / OpenStreetMap slipway records paired with NPS route and access confirmation, not a substitute for on-site signs.",
        "NPS private-vessel guidance says to use designated river access points, unload promptly, and park only in designated areas; extended parking in loading zones can lead to towing or fines."
      ],
      "watchFor": [
        "Shallow riffles, scraping, and possible dragging when the Akers gauge is near or below the 230 cfs floor.",
        "High or rising water, fresh wood, cloudy water, and faster current after rain. NPS lists Akers at 4.00 ft as a non-motorized closure level in flood conditions.",
        "Cold spring-fed water, crowding on warm weekends, motorized-boat interactions under park horsepower rules, and limited cell service.",
        "Federal river rules: PFD requirements, children under 7 wearing PFDs, no glass or polystyrene, no vessel lashing, cave closures, and leash rules for dogs when on land."
      ]
    }
  },
  "current-river-cedar-grove-pulltite": {
    "putIn": {
      "name": "Cedar Grove Boat Launch / access",
      "latitude": 37.42238,
      "longitude": -91.6083
    },
    "takeOut": {
      "name": "Pulltite river access / campground area",
      "latitude": 37.33505,
      "longitude": -91.47959
    },
    "logistics": {
      "distanceLabel": "17.3 mi",
      "estimatedPaddleTime": "Long day, about 7 hr in canoes and kayaks; longer with low water, wind, stops, rafts, or tubes",
      "shuttle": "Use a two-car or authorized outfitter shuttle between Cedar Grove and Pulltite. Cell service is limited in the park, so stage the take-out and settle the pickup plan before launching.",
      "permits": "No route-specific private-vessel paddling fee is known inside Ozark National Scenic Riverways. Follow NPS rules, posted signs, designated access layouts, parking limits, no-glass/no-polystyrene rules, and any current river closure notices.",
      "camping": "This continuation is long enough that many groups should treat it as an overnight-capable route rather than force a one-day push. Akers and Pulltite both have NPS campground support, and gravel-bar camping has NPS rules and location limits; do not assume any bank is public just because it is reachable from the river.",
      "campingClassification": "overnight_capable",
      "summary": "Launch at Cedar Grove and take out at Pulltite for the combined NPS-listed 17.3-mile Upper Current continuation. Use the Akers USGS gauge as a same-day route check, with the app keeping the score conservative at a 230 cfs minimum-only floor.",
      "accessCaveats": [
        "Cedar Grove, Akers, and Pulltite are standard Ozark National Scenic Riverways access areas, but flood repairs, construction zones, parking, outfitter traffic, and temporary closure notices can change the practical launch or landing.",
        "Pulltite remains the most flood-damaged Upper Current campground. Inspect the take-out before launching and follow current NPS signs rather than assuming every facility is fully normal.",
        "This route is much longer than the individual Upper Current day floats. Daylight, weather, and a realistic bailout plan at Akers matter more than on a short scenic float."
      ],
      "watchFor": [
        "Shallow riffles, scraping, and dragging when the Akers gauge is near or below the 230 cfs floor, especially over a 17.3-mile day.",
        "High or rising water, fresh wood, cloudy water, and faster current after rain. NPS lists Akers at 4.00 ft and Pulltite at 4.20 ft as non-motorized closure levels in flood conditions.",
        "Cold spring-fed water, crowding on warm weekends, motorized-boat interactions under park horsepower rules, and limited cell service.",
        "Federal river rules: PFD requirements, children under 7 wearing PFDs, no glass or polystyrene, no vessel lashing, cave closures, and leash rules for dogs when on land."
      ]
    }
  },
  "current-river-akers-ferry-pulltite": {
    "putIn": {
      "name": "Akers Lower / Akers Ferry access",
      "latitude": 37.37591,
      "longitude": -91.55148
    },
    "takeOut": {
      "name": "Pulltite river access / campground area",
      "latitude": 37.33505,
      "longitude": -91.47959
    },
    "logistics": {
      "distanceLabel": "9.6 mi",
      "estimatedPaddleTime": "About 4 hr for canoes and kayaks; longer with stops, low water, wind, rafts, or tubes",
      "shuttle": "Use a two-car or authorized outfitter shuttle between Akers Ferry and Pulltite. Cell service is limited in the park, so stage the Pulltite take-out and confirm the pickup plan before launching.",
      "permits": "No route-specific private-vessel paddling fee is known inside Ozark National Scenic Riverways. Follow NPS rules, posted signs, designated access layouts, parking limits, no-glass/no-polystyrene rules, and any current river closure notices.",
      "camping": "Treat this as a day float unless you have a separate legal camping plan. Pulltite has developed NPS camping context but flood damage has reduced facilities, and gravel-bar camping has park rules and location limits; do not assume any bank is public just because it is reachable from the river.",
      "summary": "Launch at Akers Ferry and take out at Pulltite for the NPS-listed 9.6-mile Upper Current River day float. Use the Akers USGS gauge as a direct same-day low-water check, with the app using only a conservative 230 cfs minimum floor.",
      "accessCaveats": [
        "Akers and Pulltite are standard Ozark National Scenic Riverways access areas, but flood repairs, construction zones, parking, outfitter traffic, and temporary closure notices can change the practical launch or landing.",
        "Recreation.gov currently describes Pulltite as year-round with flood-damaged facilities reduced after October 15, 2025. Inspect the take-out before launching and follow current NPS signs rather than assuming every facility is normal.",
        "The coordinates reuse practical access-area anchors from adjacent implemented Current River routes, not official ramp-coordinate tables. Current NPS signs and ramp layout should control on arrival."
      ],
      "watchFor": [
        "Shallow riffles, scraping, and possible dragging when the Akers gauge is near or below the 230 cfs floor.",
        "High or rising water, fresh wood, cloudy water, and faster current after rain. NPS lists Akers at 4.00 ft and Pulltite at 4.20 ft as non-motorized closure levels in flood conditions.",
        "Cold spring-fed water, crowding on warm weekends, motorized-boat interactions under park horsepower rules, and limited cell service.",
        "Federal river rules: PFD requirements, children under 7 wearing PFDs, no glass or polystyrene, no vessel lashing, cave closures, and leash rules for dogs when on land."
      ]
    }
  },
  "current-river-akers-ferry-round-spring": {
    "putIn": {
      "name": "Akers Lower / Akers Ferry access",
      "latitude": 37.37591,
      "longitude": -91.55148
    },
    "takeOut": {
      "name": "Round Spring river access / campground area",
      "latitude": 37.27996,
      "longitude": -91.40792
    },
    "logistics": {
      "distanceLabel": "18.5 mi",
      "estimatedPaddleTime": "Long day, about 8 hr in canoes and kayaks; longer with low water, wind, stops, rafts, or tubes",
      "shuttle": "Use a two-car or authorized outfitter shuttle between Akers Ferry and Round Spring. Cell service is limited in the park, so stage the take-out and confirm the pickup plan before launching.",
      "permits": "No route-specific private-vessel paddling fee is known inside Ozark National Scenic Riverways. Follow NPS rules, posted signs, designated access layouts, parking limits, no-glass/no-polystyrene rules, and any current river closure notices.",
      "camping": "This continuation is long enough that many groups should treat it as an overnight-capable route rather than a casual day float. Pulltite and Round Spring have NPS campground support, and gravel-bar camping has park rules and location limits; do not assume any bank is public just because it is reachable from the river.",
      "campingClassification": "overnight_capable",
      "summary": "Launch at Akers Ferry and take out at Round Spring for the combined NPS-listed 18.5-mile Upper Current continuation. Use the upstream Akers USGS gauge as a conservative same-day route check, with the app keeping the score at a 300 cfs minimum-only floor.",
      "accessCaveats": [
        "Akers, Pulltite, and Round Spring are standard Ozark National Scenic Riverways access areas, but flood repairs, construction zones, parking, outfitter traffic, and temporary closure notices can change the practical launch or landing.",
        "The Akers gauge is upstream of much of this route. Treat it as a proxy and pair it with a visual check at Akers and again at Pulltite if conditions look questionable.",
        "This route is much longer than the standard NPS day segments. Daylight, weather, and a realistic bailout plan at Pulltite matter more than on a short easy float."
      ],
      "watchFor": [
        "Shallow riffles, scraping, and dragging when the Akers gauge is near or below the 300 cfs floor, especially over an 18.5-mile day.",
        "High or rising water, fresh wood, cloudy water, and faster current after rain. NPS lists Akers at 4.00 ft, Pulltite at 4.20 ft, and Round Spring Bridge at 5.20 ft as flood-closure markers.",
        "Cold spring-fed water, crowding on warm weekends, motorized-boat interactions under park horsepower rules, and limited cell service.",
        "Federal river rules: PFD requirements, children under 7 wearing PFDs, no glass or polystyrene, no vessel lashing, cave closures, and leash rules for dogs when on land."
      ]
    }
  },
  "current-river-pulltite-round-spring": {
    "putIn": {
      "name": "Pulltite river access / campground area",
      "latitude": 37.33505,
      "longitude": -91.47959
    },
    "takeOut": {
      "name": "Round Spring river access / campground area",
      "latitude": 37.27996,
      "longitude": -91.40792
    },
    "logistics": {
      "distanceLabel": "8.9 mi",
      "estimatedPaddleTime": "About 4 hr for canoes and kayaks; longer with stops, low water, wind, rafts, or tubes",
      "shuttle": "Use a two-car or authorized outfitter shuttle between Pulltite and Round Spring. Cell service is limited in the park, so stage the take-out and confirm the pickup plan before launching.",
      "permits": "No route-specific private-vessel paddling fee is known inside Ozark National Scenic Riverways. Follow NPS rules, posted signs, designated access layouts, parking limits, no-glass/no-polystyrene rules, and any current river closure notices.",
      "camping": "Treat this as a day float unless you have a separate legal camping plan. Pulltite and Round Spring have developed NPS camping areas, and gravel-bar camping has park rules and location limits; do not assume any bank is public just because it is reachable from the river.",
      "summary": "Launch at Pulltite and take out at Round Spring for the NPS-listed 8.9-mile Upper Current River day float. Use the upstream Akers USGS gauge as a conservative same-day low-water check, with the app using only a 300 cfs minimum floor.",
      "accessCaveats": [
        "Pulltite and Round Spring are standard Ozark National Scenic Riverways access areas, but flood repairs, construction zones, parking, outfitter traffic, and temporary closure notices can change the practical launch or landing.",
        "The coordinates are practical access-area anchors from Mapcarta / GeoNames / OpenStreetMap records paired with NPS route and access confirmation, not official ramp-coordinate tables. Follow current NPS signs and ramp layout on arrival.",
        "The Akers gauge is upstream of this route. It is supported by MoHERP Pulltite-to-Round-Spring reports, but it should still be treated as a proxy and paired with a visual check at Pulltite."
      ],
      "watchFor": [
        "Shallow riffles, scraping, and slower travel when the Akers gauge is near or below the 300 cfs floor.",
        "High or rising water, fresh wood, cloudy water, and faster current after rain. NPS lists Pulltite at 4.20 ft and Round Spring Bridge at 5.20 ft as non-motorized closure levels during flood conditions.",
        "Cold spring-fed water, crowding on warm weekends, motorized-boat interactions under park horsepower rules, and limited cell service.",
        "Federal river rules: PFD requirements, children under 7 wearing PFDs, no glass or polystyrene, no vessel lashing, cave closures, and leash rules for dogs when on land."
      ]
    }
  },
  "current-river-cedar-grove-round-spring": {
    "putIn": {
      "name": "Cedar Grove Boat Launch / access",
      "latitude": 37.42238,
      "longitude": -91.6083
    },
    "takeOut": {
      "name": "Round Spring river access / campground area",
      "latitude": 37.27996,
      "longitude": -91.40792
    },
    "logistics": {
      "distanceLabel": "26.2 mi",
      "estimatedPaddleTime": "Very long day, roughly 11 hr in canoes and kayaks; many groups should split it overnight rather than force one push",
      "shuttle": "Use a two-car or authorized outfitter shuttle between Cedar Grove and Round Spring. Cell service is limited in the park, so stage the take-out and settle the pickup plan before launching.",
      "permits": "No route-specific private-vessel paddling fee is known inside Ozark National Scenic Riverways. Follow NPS rules, posted signs, designated access layouts, parking limits, no-glass/no-polystyrene rules, and any current river closure notices.",
      "camping": "This full Upper Current continuation is long enough that many groups should plan it as an overnight-capable route. Akers, Pulltite, and Round Spring all have NPS campground support, and gravel-bar camping has park rules and location limits; do not assume any bank is public just because it is reachable from the river.",
      "campingClassification": "overnight_capable",
      "summary": "Launch at Cedar Grove and take out at Round Spring for the full NPS-listed 26.2-mile Upper Current continuation. Use the upstream Akers USGS gauge as a conservative route check, with the app keeping the score at a 300 cfs minimum-only floor because the downstream half is not directly gauged.",
      "accessCaveats": [
        "Cedar Grove, Akers, Pulltite, and Round Spring are standard Ozark National Scenic Riverways access areas, but flood repairs, construction zones, parking, outfitter traffic, and temporary closure notices can change the practical launch or landing.",
        "The Akers gauge is upstream of much of this route. Treat it as a proxy and re-evaluate at Akers or Pulltite instead of forcing the full continuation if water, weather, or fatigue looks wrong.",
        "This route is too long for a casual scenic float. Daylight, pace, weather, and whether the group has a legal overnight plan matter before leaving Cedar Grove."
      ],
      "watchFor": [
        "Shallow riffles, scraping, and dragging when the Akers gauge is near or below the 300 cfs floor, especially over a 26.2-mile route.",
        "High or rising water, fresh wood, cloudy water, and faster current after rain. NPS lists Akers at 4.00 ft, Pulltite at 4.20 ft, and Round Spring Bridge at 5.20 ft as flood-closure markers.",
        "Cold spring-fed water, crowding on warm weekends, motorized-boat interactions under park horsepower rules, limited cell service, and fatigue from treating a full-river continuation like a routine day float.",
        "Federal river rules: PFD requirements, children under 7 wearing PFDs, no glass or polystyrene, no vessel lashing, cave closures, and leash rules for dogs when on land."
      ]
    }
  },
  "jacks-fork-river-buck-hollow-rymers": {
    "putIn": {
      "name": "Buck Hollow / Highway 17 Bridge Access",
      "latitude": 37.057183,
      "longitude": -91.664061
    },
    "takeOut": {
      "name": "Rymers Access",
      "latitude": 37.061386,
      "longitude": -91.559117
    },
    "logistics": {
      "distanceLabel": "About 9.4 mi",
      "estimatedPaddleTime": "About 5 hr, longer if low water forces dragging, poling, or lining",
      "shuttle": "Use a rural two-car or authorized outfitter shuttle between the Highway 17 bridge access north of Mountain View and Rymers at the end of the Highway M gravel access road. Scout the Rymers take-out before launching because it is remote and gravel-road dependent.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, posted access signs, no-glass/no-polystyrene river rules, and any current park river closures or advisories.",
      "camping": "Rymers has primitive NPS camping context, but treat this app route as a day float unless you have checked current park camping rules and have a legal overnight plan. Do not assume private banks away from public accesses or lawful gravel-bar stops are available.",
      "summary": "Launch at Buck Hollow where Highway 17 crosses the Jacks Fork and take out at Rymers for the NPS-listed upper Jacks Fork day float. Use the Mountain View gauge as a same-river low-water check, and be ready for shallow riffles if the gauge is near or below the 100 cfs floor.",
      "accessCaveats": [
        "NPS names both Buck Hollow and Rymers as Jacks Fork river access points, but the published coordinates used here come from paddling-location guides rather than an NPS coordinate table. Follow park signs and road-end access layout on arrival.",
        "Buck Hollow is the Highway 17 bridge access north of Mountain View. Do not confuse it with the upstream Prongs / Highway Y section, which is a separate, more seasonal reach.",
        "Rymers is a remote access at the end of the Highway M gravel road system. Weather, washboarding, flood damage, or temporary park management can change practical access conditions."
      ],
      "watchFor": [
        "Dragging, shallow shoals, and possible poling or lining when the Mountain View gauge is below the 100 cfs floor.",
        "Fast riffles, tight bends, boulder runs, strainers, and Class I-II moving-water consequences on a remote upper-river route.",
        "Rapid rises after thunderstorms, especially in the narrow upper Jacks Fork valley.",
        "Cold spring-fed water, limited cell service, long rural shuttle friction, and private land away from public accesses or lawful gravel-bar stops."
      ]
    }
  },
  "jacks-fork-river-highway-17-blue-spring": {
    "putIn": {
      "name": "Buck Hollow / Highway 17 Bridge Access",
      "latitude": 37.057183,
      "longitude": -91.664061
    },
    "takeOut": {
      "name": "Blue Spring River Access",
      "latitude": 37.054497,
      "longitude": -91.638198
    },
    "logistics": {
      "distanceLabel": "About 2.6 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low water, scouting, or dragging",
      "shuttle": "Use a short rural shuttle between Buck Hollow / Highway 17 and Blue Spring. Blue Spring is reached from the Highway OO side west of Mountain View and uses a steep remote road, so inspect the take-out before committing.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, posted access signs, no-glass/no-polystyrene river rules, and any current park river closures or advisories.",
      "camping": "Blue Spring has primitive NPS camping context, but treat this as a day float unless you have checked current park camping rules and have a legal overnight plan. Do not assume private banks or unsanctioned gravel bars are available.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Buck Hollow and take out at Blue Spring for the shortest official upper Jacks Fork split. Use the Mountain View gauge as the same conservative low-water check already used on adjacent upper-Jacks routes.",
      "accessCaveats": [
        "Buck Hollow and Blue Spring are official NPS river accesses, but the coordinates here are practical access anchors rather than an NPS coordinate table. Follow signed access roads and current parking layout on arrival.",
        "Blue Spring on the Jacks Fork is the river access across from the geologic feature, not the separate Blue Spring on the Current River.",
        "Blue Spring uses a steep dirt-road approach and can feel rougher than the short mileage suggests. Scout the landing and turnaround before leaving a vehicle."
      ],
      "watchFor": [
        "Dragging, shallow riffles, and possible short lining when the Mountain View gauge is near or below the 100 cfs conservative floor.",
        "Fast riffles, tight bends, wood, strainers, bluff ledges, and Class I-II moving-water consequences on a short but remote upper-river route.",
        "Rapid rises after thunderstorms, cold spring-fed water, limited cell service, and confusion between the Jacks Fork Blue Spring access and the better-known Current River Blue Spring site."
      ]
    }
  },
  "jacks-fork-river-highway-17-bay-creek": {
    "putIn": {
      "name": "Buck Hollow / Highway 17 Bridge Access",
      "latitude": 37.057183,
      "longitude": -91.664061
    },
    "takeOut": {
      "name": "Bay Creek River Access",
      "latitude": 37.1231,
      "longitude": -91.5018
    },
    "logistics": {
      "distanceLabel": "About 18.2 mi",
      "estimatedPaddleTime": "About 8 hr to 10 hr depending on level, scouting, and low-water dragging",
      "shuttle": "Use a rural two-car or authorized outfitter shuttle between Buck Hollow / Highway 17 and Bay Creek. The take-out uses a remote Highway 106 gravel-road approach, so inspect the landing before launching and do not assume navigation apps will choose the right road-end turn.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, posted access signs, no-glass/no-polystyrene river rules, and any current park river closures or advisories.",
      "camping": "Bay Creek has primitive NPS camping context, but treat this app route as a long day float unless you have checked current park camping rules and have a legal overnight plan. Do not assume private banks or informal gravel bars are available.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Buck Hollow and take out at Bay Creek for a longer official upper Jacks Fork day built from the current NPS float-time rows. Use the Mountain View gauge as the same conservative low-water check already used on adjacent upper-Jacks routes.",
      "accessCaveats": [
        "Buck Hollow and Bay Creek are official NPS river accesses, but the coordinates here are practical access anchors rather than an NPS coordinate table. Follow current park signs and actual landing layout on arrival.",
        "Buck Hollow is the Highway 17 bridge access north of Mountain View. Do not confuse it with the upstream Prongs / Highway Y section, which is a separate, more seasonal reach.",
        "Bay Creek is a remote road-end access near primitive backcountry camping. Weather, washboarding, flood damage, or temporary park management can change practical access conditions."
      ],
      "watchFor": [
        "Repeated scraping, dragging, and possible short lining when the Mountain View gauge is near or below the 100 cfs conservative floor.",
        "Fast riffles, wood, strainers, blind bends, bluff ledges, and Class I-II moving-water consequences on a longer remote upper-river route.",
        "Rapid rises after thunderstorms, cold spring-fed water, limited cell service, and longer-than-expected shuttle friction on rural gravel roads."
      ]
    }
  },
  "jacks-fork-river-blue-spring-rymers": {
    "putIn": {
      "name": "Blue Spring River Access",
      "latitude": 37.054497,
      "longitude": -91.638198
    },
    "takeOut": {
      "name": "Rymers Access",
      "latitude": 37.061386,
      "longitude": -91.559117
    },
    "logistics": {
      "distanceLabel": "About 6.6 mi",
      "estimatedPaddleTime": "About 4 hr, longer if low water forces dragging, lining, or longer cave and spring stops",
      "shuttle": "Use a rural two-car or authorized outfitter shuttle between Blue Spring and Rymers. Blue Spring comes in from the Highway OO side west of Mountain View, while Rymers uses the Highway M gravel-road approach; inspect the take-out before launching because both approaches are remote and road-condition dependent.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, posted access signs, no-glass/no-polystyrene river rules, and any current park river closures or advisories.",
      "camping": "Blue Spring and Rymers both have primitive NPS camping context, but treat this as a day float unless you have checked current park camping rules and have a legal overnight plan. Do not assume private banks or unsanctioned gravel bars are available.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Blue Spring and take out at Rymers for the current NPS-listed upper Jacks Fork day float. Use the Mountain View gauge as a conservative low-water check and expect the route to feel remote, seasonal, and more technical than the short mileage suggests.",
      "accessCaveats": [
        "Blue Spring and Rymers are official NPS river accesses, but the exact coordinates used here are practical topo-derived access anchors rather than an NPS coordinate table. Follow signed access roads and parking layout on arrival.",
        "Blue Spring on the Jacks Fork is the river access across from the geologic feature, not the separate Blue Spring on the Current River.",
        "Rymers is a remote access at the end of the Highway M gravel road system. Weather, washboarding, flood damage, or temporary park management can change practical access conditions."
      ],
      "watchFor": [
        "Dragging, shallow riffles, and possible short lining or poling when the Mountain View gauge is near or below the 100 cfs conservative floor.",
        "Fast riffles, tight bends, wood, strainers, bluff ledges, and Class I-II moving-water consequences on a short but remote upper-river route.",
        "Rapid rises after thunderstorms, cold spring-fed water, limited cell service, and long rural shuttle friction."
      ]
    }
  },
  "jacks-fork-river-blue-spring-bay-creek": {
    "putIn": {
      "name": "Blue Spring River Access",
      "latitude": 37.054497,
      "longitude": -91.638198
    },
    "takeOut": {
      "name": "Bay Creek River Access",
      "latitude": 37.1231,
      "longitude": -91.5018
    },
    "logistics": {
      "distanceLabel": "About 15.6 mi",
      "estimatedPaddleTime": "About 7 hr to 9 hr depending on level, stops, and low-water dragging",
      "shuttle": "Use a rural two-car or authorized outfitter shuttle between Blue Spring and Bay Creek. Both accesses rely on remote gravel-road approaches off Highway OO or Highway 106, so inspect the take-out before launching and allow more shuttle time than the mileage suggests.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, posted access signs, no-glass/no-polystyrene river rules, and any current park river closures or advisories.",
      "camping": "Blue Spring and Bay Creek both have primitive NPS camping context, but treat this as a long day float unless you have checked current park camping rules and have a legal overnight plan. Do not assume private banks or unsanctioned gravel bars are available.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Blue Spring and take out at Bay Creek for a long upper Jacks Fork day built from the current NPS float-time rows. Use the Mountain View gauge as the same conservative low-water check already used on adjacent upper-Jacks routes.",
      "accessCaveats": [
        "Blue Spring and Bay Creek are official NPS river accesses, but the exact coordinates used here are practical topo-derived access anchors rather than an NPS coordinate table. Follow signed access roads and parking layout on arrival.",
        "Blue Spring on the Jacks Fork is the river access across from the geologic feature, not the separate Blue Spring on the Current River.",
        "Bay Creek is a remote road-end access near primitive backcountry camping. Scout the take-out and parking before committing, especially after storms."
      ],
      "watchFor": [
        "Prolonged scraping, dragging, and possible short lining or poling when the Mountain View gauge is near or below the 100 cfs conservative floor.",
        "Fast riffles, wood, strainers, bluff ledges, and a long remote access-to-access day with few easy exits between named landings.",
        "Rapid rises after thunderstorms, cold spring-fed water, limited cell service, and long rural shuttle friction."
      ]
    }
  },
  "jacks-fork-river-rymers-bay-creek": {
    "putIn": {
      "name": "Rymers Access",
      "latitude": 37.061386,
      "longitude": -91.559117
    },
    "takeOut": {
      "name": "Bay Creek River Access",
      "latitude": 37.1231,
      "longitude": -91.5018
    },
    "logistics": {
      "distanceLabel": "About 8 mi by NPS river miles",
      "estimatedPaddleTime": "About 4 hr to 5.5 hr depending on level, stops, and low-water dragging",
      "shuttle": "Use a rural two-car or authorized outfitter shuttle between Rymers and Bay Creek. Both accesses rely on gravel-road approaches off Highway M or Highway 106, so inspect the Bay Creek take-out before launching and do not assume navigation apps will choose the right road-end turn.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, posted access signs, no-glass/no-polystyrene river rules, and any current park river closures or advisories.",
      "camping": "Rymers and Bay Creek both have primitive NPS camping context, but treat this as a day float unless you have checked current park camping rules and have a legal overnight plan. Do not assume private banks or informal gravel bars are available.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Rymers and take out at Bay Creek for the upper Jacks Fork gap between the already-live Buck Hollow and Bay Creek downstream segments. Use the Mountain View gauge as the same conservative low-water check already used on the adjacent upper-Jacks routes.",
      "accessCaveats": [
        "This route shape is supported by the current NPS river-mile access inventory rather than a standalone float-time row. Treat the app mileage and paddle-time guidance as conservative planning numbers, not an official promise.",
        "Rymers and Bay Creek are official NPS river accesses, but the coordinates here are carried forward from the adjacent implemented upper-Jacks routes. Follow current park signs and the actual landing layout on arrival.",
        "Bay Creek is a remote road-end access near primitive backcountry camping. Scout the take-out and parking before committing, especially after storms."
      ],
      "watchFor": [
        "Regular scraping, poling, or short lining when the Mountain View gauge is near or below the 100 cfs conservative floor.",
        "Fast riffles, wood, strainers, blind bends, and remote access-to-access travel with few easy exits between the named landings.",
        "Rapid rises after thunderstorms, limited cell service, private land away from the public accesses, and longer-than-expected shuttle time on rural gravel roads."
      ]
    }
  },
  "jacks-fork-river-rymers-alley-spring": {
    "putIn": {
      "name": "Rymers Access",
      "latitude": 37.061386,
      "longitude": -91.559117
    },
    "takeOut": {
      "name": "Alley Spring River Access",
      "latitude": 37.1484,
      "longitude": -91.4499
    },
    "logistics": {
      "distanceLabel": "About 14.8 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr depending on level, stops, and low-water dragging",
      "shuttle": "Use a rural two-car or authorized outfitter shuttle between Rymers and Alley Spring. The shuttle mixes remote gravel-road access with the busier Alley Spring developed area, so inspect the take-out and current parking layout before launching.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, posted access signs, no-glass/no-polystyrene river rules, and any current park river closures or advisories.",
      "camping": "Rymers has primitive camping context and Alley Spring has developed campground context, but treat this as a day float unless you have checked current park camping rules and have a legal overnight plan. Do not assume private banks or informal gravel bars are available.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Rymers and take out at Alley Spring for a long upper Jacks Fork day built from the current NPS float-time rows. Use the direct Alley Spring gauge as the same conservative 100 cfs low-water check already used on the downstream Bay-Creek-to-Alley split.",
      "accessCaveats": [
        "Rymers and Alley Spring are official NPS river accesses, but the coordinates here are practical access anchors rather than an NPS coordinate table. Follow signed access roads and current landing layout on arrival.",
        "Alley Spring is a developed park access with campground and ranger-station context; use the signed river access rather than improvised banks near the spring area.",
        "This is a long remote corridor between named accesses. Plan the shuttle before launching and do not assume quick mid-route bailouts if storms build."
      ],
      "watchFor": [
        "Frequent scraping, dragging, and slower travel when the Alley Spring gauge is near the 100 cfs conservative floor.",
        "Fast riffles, wood, strainers, blind bends, and Class I-II moving-water consequences on a long upper-river route.",
        "Rapid rises after thunderstorms, cold spring-fed water, limited cell service, and crowding or parking friction once you reach Alley Spring."
      ]
    }
  },
  "jacks-fork-river-highway-17-alley-spring": {
    "putIn": {
      "name": "Buck Hollow / Highway 17 Bridge Access",
      "latitude": 37.057183,
      "longitude": -91.664061
    },
    "takeOut": {
      "name": "Alley Spring River Access",
      "latitude": 37.1484,
      "longitude": -91.4499
    },
    "logistics": {
      "distanceLabel": "About 24 mi by current NPS segment totals",
      "estimatedPaddleTime": "About 10 hr to 16 hr depending on level, stops, scouting, and low-water dragging",
      "shuttle": "Use a rural two-car or authorized outfitter shuttle between Buck Hollow / Highway 17 and Alley Spring. Stage the Alley Spring take-out first, then inspect the Buck Hollow launch because this route commits you to the longest current upper-Jacks continuation in the app.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, posted access signs, no-glass/no-polystyrene river rules, and any current park river closures, alerts, or advisories.",
      "camping": "Blue Spring, Rymers, and Bay Creek all have primitive camping context and Alley Spring has developed campground context, but treat this route as a very long day planner unless you have checked current NPS rules and made a separate legal overnight plan.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Buck Hollow and take out at Alley Spring for the full upper Jacks Fork continuation supported by the current NPS float-time rows and the legacy NPS Hwy 17-to-Alley timing line. Use the direct Alley Spring gauge conservatively and expect scrape-prone travel when conditions are near or below the 100 cfs floor.",
      "accessCaveats": [
        "Buck Hollow, Blue Spring, Rymers, Bay Creek, and Alley Spring are official NPS river accesses, but the coordinates used here are practical access anchors rather than an NPS coordinate table. Follow signed access roads and the current landing layout on arrival.",
        "Buck Hollow is the Highway 17 bridge access north of Mountain View. Do not confuse it with the upstream Prongs / Highway Y section, which is a separate, more seasonal reach.",
        "This is an all-day remote corridor with long gaps between easy exits. Plan the shuttle, food, and timing before launching and do not assume you can improvise mid-route on private banks.",
        "The current park alerts feed showed no live closure naming these Jacks Fork endpoints on the review date, but same-day alert and road-condition checks still matter before you leave vehicles."
      ],
      "watchFor": [
        "Repeated scraping, dragging, and possible short lining when the Alley Spring gauge is below the 100 cfs conservative floor.",
        "Fast riffles, wood, strainers, bluff ledges, and Class I-II moving-water consequences over a very long upper-river day.",
        "Rapid rises after thunderstorms, cold spring-fed water, limited cell service, and long rural shuttle friction on gravel roads.",
        "Fatigue, daylight management, and the temptation to press on after missing the best water window. Treat a below-floor reading as a reason to shorten the day, not to force the full route."
      ]
    }
  },
  "jacks-fork-river-blue-spring-alley-spring": {
    "putIn": {
      "name": "Blue Spring River Access",
      "latitude": 37.054497,
      "longitude": -91.638198
    },
    "takeOut": {
      "name": "Alley Spring River Access",
      "latitude": 37.1484,
      "longitude": -91.4499
    },
    "logistics": {
      "distanceLabel": "About 21.4 mi by current NPS segment totals",
      "estimatedPaddleTime": "About 9 hr to 11 hr depending on level, stops, scouting, and low-water dragging",
      "shuttle": "Use a rural two-car or authorized outfitter shuttle between Blue Spring and Alley Spring. Stage the Alley Spring take-out first, then inspect the Blue Spring road and landing because both endpoints can take more time than the map distance suggests.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, posted access signs, no-glass/no-polystyrene river rules, and any current park river closures, alerts, or advisories.",
      "camping": "Blue Spring, Rymers, and Bay Creek all have primitive camping context and Alley Spring has developed campground context, but treat this route as a long day planner unless you have checked current NPS rules and made a separate legal overnight plan.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Blue Spring and take out at Alley Spring for a long upper Jacks Fork continuation built from the current NPS float-time rows. Use the direct Alley Spring gauge conservatively and expect scrape-prone travel when conditions are near or below the 100 cfs floor.",
      "accessCaveats": [
        "Blue Spring, Rymers, Bay Creek, and Alley Spring are official NPS river accesses, but the coordinates used here are practical access anchors rather than an NPS coordinate table. Follow signed access roads and current parking layout on arrival.",
        "Blue Spring on the Jacks Fork is the river access across from the geologic feature, not the separate Blue Spring on the Current River.",
        "This is a long remote corridor between named accesses. Plan the shuttle and bailout logic before launching and do not assume quick road access if weather turns.",
        "The current park alerts feed showed no live closure naming these Jacks Fork endpoints on the review date, but same-day alert and road-condition checks still matter before you leave vehicles."
      ],
      "watchFor": [
        "Prolonged scraping, dragging, and possible short lining or poling when the Alley Spring gauge is below the 100 cfs conservative floor.",
        "Fast riffles, wood, strainers, bluff ledges, and a long remote access-to-access day with few easy exits between named landings.",
        "Rapid rises after thunderstorms, cold spring-fed water, limited cell service, and long rural shuttle friction.",
        "Fatigue, daylight management, and the temptation to continue when the upper corridor is obviously too shallow. Treat a below-floor reading as a reason to shorten the day."
      ]
    }
  },
  "jacks-fork-river-alley-spring-chilton": {
    "putIn": {
      "name": "Alley Spring Access",
      "latitude": 37.147975,
      "longitude": -91.444906
    },
    "takeOut": {
      "name": "Joshua T. Chilton Memorial Landing / Eminence",
      "latitude": 37.152717,
      "longitude": -91.353486
    },
    "logistics": {
      "distanceLabel": "About 6.6 mi",
      "estimatedPaddleTime": "About 4 hr, longer with stops, crowds, wind, or low water",
      "shuttle": "Stage the take-out at Joshua T. Chilton Memorial Landing in Eminence, then drive west on Highway 106 to the Alley Spring access area. Summer weekends can be crowded, so inspect parking, landing room, and any posted park or city rules before launching.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules at Alley Spring, MDC/cooperative-area rules at Joshua T. Chilton, Missouri boating laws, no-glass/no-polystyrene rules, and any posted closures or advisories.",
      "camping": "Treat this as a day float. Alley Spring has developed campground context, but this route ends at Eminence; do not assume private banks, commercial campgrounds, or gravel bars near town are available for camping without a separate legal plan.",
      "summary": "Launch at Alley Spring and take out at Joshua T. Chilton Memorial Landing in Eminence for the NPS-listed classic lower Jacks Fork day. Use the direct Eminence gauge as a conservative low-water check and expect heavy recreation traffic in peak season.",
      "accessCaveats": [
        "Alley Spring is an NPS river access with campground and ranger-station context; follow the signed launch and parking layout rather than informal bank paths.",
        "Joshua T. Chilton is an MDC-listed Jacks Fork access operated under a cooperative agreement; posted owner or local rules may apply beyond the MDC-listed boating regulations.",
        "The Jacks Fork has a park-boundary gap around Eminence. Stay with public accesses and lawful stops rather than using private banks near town."
      ],
      "watchFor": [
        "Shallow riffles and scraping when the Eminence gauge is near or below the 200 cfs conservative floor.",
        "Heavy canoe, kayak, raft, tube, and motorboat traffic in summer, especially between Alley Spring and Eminence.",
        "High or rising water, fresh wood, faster bridge approaches, and harder landings after storms.",
        "Cold spring water, bluff jumps and swimmers, fishing lines, private banks near Eminence, and changing gravel at the take-out."
      ]
    }
  },
  "current-river-waymeyer-van-buren": {
    "putIn": {
      "name": "Waymeyer Access",
      "latitude": 37.054302,
      "longitude": -91.055459
    },
    "takeOut": {
      "name": "Van Buren Riverfront Park Access",
      "latitude": 36.9939,
      "longitude": -91.014
    },
    "logistics": {
      "distanceLabel": "About 7.2 mi",
      "estimatedPaddleTime": "About 3 hr, longer with low water, stops, wind, crowds, or motorboat traffic",
      "shuttle": "Stage the take-out at Van Buren Riverfront Park before driving north on State Route M to Waymeyer. Waymeyer has documented erosion and crowding limits, so inspect the signed access layout and unloading room before committing.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules at Waymeyer, MDC/cooperative-area and city rules at Van Buren Riverfront Park, Missouri boating laws, no-glass/no-polystyrene rules, and any posted NPS closure or access notices.",
      "camping": "Treat this as a day float. Do not assume private banks near Van Buren, commercial campgrounds, or gravel bars are available for camping without a separate legal plan and current NPS rules.",
      "summary": "Launch at Waymeyer and take out at Van Buren Riverfront Park for the NPS-listed lower Current River day section. Use the direct Van Buren gauge as a conservative low-water check and expect a busier, more motorized lower-river character than the upper Current.",
      "accessCaveats": [
        "NPS has described Waymeyer as a non-commercial floater access, but also warned that erosion leaves limited safe unloading room on summer weekends. Follow current NPS signs and avoid blocking the access.",
        "Van Buren Riverfront Park is MDC-listed under a cooperative agreement rather than MDC-owned land; posted city or owner rules may apply beyond the MDC-listed boating regulations.",
        "The Van Buren coordinate is a practical ramp anchor from MDC map/directions context, not an official coordinate table. Use the signed ramp, parking, and loading zones on arrival."
      ],
      "watchFor": [
        "Shallow shoals, scraping, and slower travel when the Van Buren gauge is near or below the 700 cfs conservative floor.",
        "Motorboat wakes, summer crowds, tubes, slick ramps, swimmers, fishing lines, and crowded loading at Van Buren.",
        "High or rising water, floating wood, stronger current, and NPS non-motorized closure levels after storms. The compendium lists Van Buren Bridge at a 5.00 ft closed level.",
        "Private banks near town and limited cell service outside Van Buren; arrange the shuttle before launching."
      ]
    }
  },
  "current-river-van-buren-big-spring": {
    "putIn": {
      "name": "Van Buren Riverfront Park Access",
      "latitude": 36.9939,
      "longitude": -91.014
    },
    "takeOut": {
      "name": "Big Spring Upper River Landing",
      "latitude": 36.9475519,
      "longitude": -90.9901267
    },
    "logistics": {
      "distanceLabel": "About 4.3 to 5 mi",
      "estimatedPaddleTime": "About 2 hr, longer with low water, stops, wind, crowds, or motorboat traffic",
      "shuttle": "Stage the take-out in the Big Spring river-access/campground area before driving back to Van Buren Riverfront Park. Use current NPS signs at Big Spring and do not confuse the upper river landing with the lower trailered-boat ramp.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, Van Buren city/cooperative-area rules, Missouri boating laws, no-glass/no-polystyrene rules, and any posted NPS closure or access notices.",
      "camping": "Treat this as a short day float unless you have a separate legal camping plan. Big Spring has NPS campground facilities, but campground reservations, loop closures, hunt closures, and posted rules can change.",
      "summary": "Launch at Van Buren Riverfront Park and take out at the Big Spring upper river landing for a short lower Current River day section. Use the direct Van Buren gauge as a conservative low-water check and expect lower-river motorboat traffic and summer crowds.",
      "accessCaveats": [
        "NPS distinguishes Big Spring (upper) as a Current River landing from Big Spring Boat Ramp (lower), which is trailered boats only with no floater access. Confirm the signed upper landing before leaving a vehicle.",
        "The Big Spring coordinate is the USGS-topo-derived Big Spring River Access point in the access/campground area, not the spring overlook, natural-area point, or lower motorized-only boat ramp.",
        "Van Buren Riverfront Park is MDC-listed under a cooperative agreement rather than MDC-owned land; posted city or owner rules may apply beyond the MDC-listed boating regulations."
      ],
      "watchFor": [
        "Shallow shoals, scraping, and slower travel when the Van Buren gauge is near or below the 700 cfs conservative floor.",
        "Motorboat wakes, summer crowds, tubes, slick ramps, swimmers, fishing lines, and crowded loading near Van Buren and Big Spring.",
        "High or rising water, floating wood, stronger current, and NPS non-motorized closure levels after storms. The compendium lists Van Buren Bridge at a 5.00 ft closed level.",
        "Private banks, limited cell service outside Van Buren, and confusion between the Big Spring upper landing and the lower motorized-only ramp."
      ]
    }
  },
  "current-river-big-spring-cataract": {
    "putIn": {
      "name": "Big Spring Upper River Landing",
      "latitude": 36.9475519,
      "longitude": -90.9901267
    },
    "takeOut": {
      "name": "Cataract Landing",
      "latitude": 36.8964418,
      "longitude": -90.9073471
    },
    "logistics": {
      "distanceLabel": "About 8.8 mi",
      "estimatedPaddleTime": "About 4 hr, longer with low water, stops, wind, crowds, or motorboat traffic",
      "shuttle": "Stage the take-out at Cataract Landing before driving back to the Big Spring river-access area. Verify the signed Cataract landing and road approach before launching because this lower-river access is simpler and less developed than the Big Spring area.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, Big Spring day-use and campground rules, Missouri boating laws, no-glass/no-polystyrene rules, and any posted NPS closure or access notices.",
      "camping": "Treat this as a day float unless you have a separate legal camping plan. Big Spring has formal campground support before launch, but do not assume private banks or informal gravel bars are legal overnight stops downstream.",
      "summary": "Launch at the Big Spring upper river landing and take out at Cataract for a mid-length lower Current River day. Use the direct Van Buren gauge as a conservative low-water check and expect the lower-river mix of motorboats, crowds, and private-bank constraints.",
      "accessCaveats": [
        "NPS distinguishes Big Spring (upper) as a Current River landing from Big Spring Boat Ramp (lower), which is trailered boats only with no floater access. Start from the signed upper landing.",
        "The Cataract coordinate is a topo-derived landing point, not an official NPS GIS table. Follow the signed landing, parking, and turnaround layout on arrival.",
        "Do not assume services, restrooms, or staffed oversight at Cataract comparable to the Big Spring area."
      ],
      "watchFor": [
        "Shallow shoals, scraping, and slower travel when the Van Buren gauge is near or below the 700 cfs conservative floor.",
        "Motorboat wakes, summer crowds, tubes, slick landings, swimmers, fishing lines, and wind on the lower-river pools.",
        "High or rising water, floating wood, stronger current, and NPS non-motorized closure levels after storms. The compendium lists Van Buren Bridge at a 5.00 ft closed level.",
        "Private banks, limited cell service outside Van Buren, and confusion between the signed Cataract landing and nearby private property."
      ]
    }
  },
  "current-river-van-buren-cataract": {
    "putIn": {
      "name": "Van Buren Riverfront Park Access",
      "latitude": 36.9939,
      "longitude": -91.014
    },
    "takeOut": {
      "name": "Cataract Landing",
      "latitude": 36.8964418,
      "longitude": -90.9073471
    },
    "logistics": {
      "distanceLabel": "About 13.1 mi",
      "estimatedPaddleTime": "About 6 hr, longer with low water, stops, wind, crowds, or motorboat traffic",
      "shuttle": "Stage the take-out at Cataract before driving back to Van Buren Riverfront Park. This is a longer lower-river shuttle and day, so verify access roads, parking, daylight, and the signed Cataract landing before launching.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, Van Buren cooperative-area rules, Missouri boating laws, no-glass/no-polystyrene rules, and any posted NPS closure or access notices.",
      "camping": "Treat this as a long day unless you have a separate legal campground plan before or after the float. Do not assume private banks or informal gravel bars are legal overnight stops.",
      "summary": "Launch at Van Buren Riverfront Park and take out at Cataract for a longer lower Current continuation. Use the direct Van Buren gauge as a conservative low-water check and plan for motorboats, crowds, limited exits, and a lower-river shuttle.",
      "accessCaveats": [
        "Van Buren Riverfront Park is MDC-listed under a cooperative agreement rather than MDC-owned land; posted city or owner rules may apply beyond the MDC-listed boating regulations.",
        "The Cataract coordinate is a topo-derived landing point, not an official NPS GIS table. Follow the signed landing, parking, and turnaround layout on arrival.",
        "This route passes the Big Spring area mid-run; do not confuse the signed upper river landing with the lower trailered-boat-only ramp if you stop there."
      ],
      "watchFor": [
        "Shallow shoals, scraping, and a slower six-hour day when the Van Buren gauge is near or below the 700 cfs conservative floor.",
        "Motorboat wakes, summer crowds, tubes, slick ramps, swimmers, fishing lines, and busy lower-river access zones.",
        "High or rising water, floating wood, stronger current, and NPS non-motorized closure levels after storms. The compendium lists Van Buren Bridge at a 5.00 ft closed level.",
        "Private banks, limited cell service outside Van Buren, and confusion between the signed Cataract landing and nearby private property."
      ]
    }
  },
  "current-river-big-spring-gooseneck": {
    "putIn": {
      "name": "Big Spring Upper River Landing",
      "latitude": 36.9475519,
      "longitude": -90.9901267
    },
    "takeOut": {
      "name": "Gooseneck / Hawes Recreation Area",
      "latitude": 36.8194989,
      "longitude": -90.9470707
    },
    "logistics": {
      "distanceLabel": "About 16 mi",
      "estimatedPaddleTime": "About 6 hr, longer with low water, stops, wind, crowds, or motorboat traffic",
      "shuttle": "Stage the take-out at Gooseneck / Hawes before driving back to the Big Spring river-access area. This is a long lower-river shuttle near the Current River mouth, so verify roads, parking, signed river access, and campground rules before launching.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, campground and day-use rules at Big Spring and Gooseneck / Hawes, Missouri boating laws, no-glass/no-polystyrene rules, and any posted NPS closure or access notices.",
      "camping": "Treat this as a long day unless you have a separate legal camping plan. Gooseneck / Hawes has primitive NPS campground context, but campsite availability, closures, fees, and river conditions can change.",
      "summary": "Launch at the Big Spring upper river landing and take out at Gooseneck / Hawes for the final long lower Current River section. Use the Van Buren gauge as a conservative low-water check and plan for motorboats, private banks, limited exits, and end-of-river logistics.",
      "accessCaveats": [
        "NPS materials use both Gooseneck and Hawes naming for the lower-river endpoint. Confirm the signed Gooseneck / Hawes river access before leaving a vehicle.",
        "The Gooseneck coordinate is a USGS-topo-derived Hawes Recreation Area point, not an NPS GIS landing table. Use current NPS signs and the actual river landing on arrival.",
        "NPS distinguishes Big Spring (upper) as a Current River landing from Big Spring Boat Ramp (lower), which is trailered boats only with no floater access. Start from the signed upper landing.",
        "This route ends near the Current River mouth. Do not continue onto the Black River or downstream big-river water without a separate plan."
      ],
      "watchFor": [
        "Shallow shoals, scraping, and a slower six-hour day when the Van Buren gauge is near or below the 700 cfs conservative floor.",
        "Motorboat wakes, long pool sections, wind, summer crowds, tubes, slick landings, swimmers, fishing lines, and crowded access areas.",
        "High or rising water, floating wood, stronger current, and NPS non-motorized closure levels after storms. The compendium lists Van Buren Bridge at a 5.00 ft closed level.",
        "Private banks, limited cell service, few easy exits, and confusion between Gooseneck and Hawes naming at the take-out."
      ]
    }
  },
  "current-river-cataract-gooseneck": {
    "putIn": {
      "name": "Cataract Landing",
      "latitude": 36.8964418,
      "longitude": -90.9073471
    },
    "takeOut": {
      "name": "Gooseneck / Hawes Recreation Area",
      "latitude": 36.8194989,
      "longitude": -90.9470707
    },
    "logistics": {
      "distanceLabel": "About 6.2 mi",
      "estimatedPaddleTime": "About 3 hr, longer with low water, stops, wind, crowds, or motorboat traffic",
      "shuttle": "Stage the take-out at Gooseneck / Hawes before driving back to Cataract Landing. Verify both signed landings before launch because this lower-river pair uses simpler downstream accesses and ends near the river mouth.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, Gooseneck / Hawes day-use and campground rules, Missouri boating laws, no-glass/no-polystyrene rules, and any posted NPS closure or access notices.",
      "camping": "This can work as a short day float, with the clearest formal overnight support at the primitive camping area near Gooseneck / Hawes after the take-out. Do not assume private banks or informal gravel bars are legal overnight stops upstream.",
      "summary": "Launch at Cataract and finish at Gooseneck / Hawes for the last public lower Current section. Use the Van Buren gauge as a conservative low-water check and expect lower-river motorboats, private-bank constraints, and end-of-river logistics.",
      "accessCaveats": [
        "The Cataract coordinate is a topo-derived landing point, not an official NPS GIS table. Follow the signed landing, parking, and turnaround layout on arrival.",
        "NPS materials use both Gooseneck and Hawes naming for the downstream endpoint. Confirm the signed river landing before leaving a vehicle.",
        "This route ends near the Current River mouth. Do not continue onto the Black River or other downstream big-river water without a separate plan."
      ],
      "watchFor": [
        "Shallow shoals, scraping, and slower travel when the Van Buren gauge is near or below the 700 cfs conservative floor.",
        "Motorboat wakes, summer crowds, tubes, slick landings, swimmers, fishing lines, and wind on the lower-river pools.",
        "High or rising water, floating wood, stronger current, and NPS non-motorized closure levels after storms. The compendium lists Van Buren Bridge at a 5.00 ft closed level.",
        "Private banks, limited cell service, and confusion between Gooseneck and Hawes naming at the take-out."
      ]
    }
  },
  "current-river-waymeyer-cataract": {
    "putIn": {
      "name": "Waymeyer Access",
      "latitude": 37.054302,
      "longitude": -91.055459
    },
    "takeOut": {
      "name": "Cataract Landing",
      "latitude": 36.8964418,
      "longitude": -90.9073471
    },
    "logistics": {
      "distanceLabel": "About 19.6 mi",
      "estimatedPaddleTime": "About 8.5 hr to 10 hr, longer with low water, stops, wind, crowds, or motorboat traffic",
      "shuttle": "Stage the take-out at Cataract before driving back north to Waymeyer. This is a long lower-river shuttle, so verify roads, parking, daylight, and the signed landing before launching.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules at both accesses, Missouri boating laws, no-glass/no-polystyrene rules, and any posted NPS closure or access notices.",
      "camping": "Plan this as a very long day or an intentionally staged overnight. The clearest formal camping support on the corridor is at Big Spring, not at the Cataract finish, and private-bank camping should not be assumed.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Waymeyer and finish at Cataract for a long lower Current River continuation. Use the direct Van Buren gauge as a conservative low-water check and expect the same busier, more motorized lower-river character as the adjacent split sections.",
      "accessCaveats": [
        "NPS has described Waymeyer as a non-commercial floater access while warning about erosion and limited safe unloading room on summer weekends. Follow current NPS signs and avoid blocking the access.",
        "Big Spring is an on-route landmark and campground, not the finish. Keep downstream mileage, daylight, and shuttle timing in mind before leaving Waymeyer.",
        "The Cataract coordinate is a topo-derived landing point already used in this lower-Current family, not an official NPS GIS table. Follow the signed landing, parking, and turnaround layout on arrival."
      ],
      "watchFor": [
        "Shallow shoals, scraping, and slower travel when the Van Buren gauge is near or below the 700 cfs conservative floor.",
        "Motorboat wakes, summer crowds, tubes, slick landings, swimmers, fishing lines, and wind on the lower-river pools.",
        "High or rising water, floating wood, stronger current, and NPS non-motorized closure levels after storms. The compendium lists Van Buren Bridge at a 5.00 ft closed level.",
        "Private banks, limited cell service, and confusion between Big Spring midpoint facilities and the downstream Cataract finish."
      ]
    }
  },
  "current-river-waymeyer-big-spring": {
    "putIn": {
      "name": "Waymeyer Access",
      "latitude": 37.054302,
      "longitude": -91.055459
    },
    "takeOut": {
      "name": "Big Spring Upper River Landing",
      "latitude": 36.9475519,
      "longitude": -90.9901267
    },
    "logistics": {
      "distanceLabel": "About 10.8 mi",
      "estimatedPaddleTime": "About 5 hr, longer with low water, stops, wind, crowds, or motorboat traffic",
      "shuttle": "Stage the take-out in the Big Spring river-access/campground area before driving back north to Waymeyer. Inspect the signed access layout at both ends because Waymeyer can be crowded and eroded and Big Spring has separate upper and lower boat-ramp areas.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules at both accesses, Missouri boating laws, no-glass/no-polystyrene rules, and any posted NPS closure or access notices.",
      "camping": "This can work as a long day float, but the clearest formal camping support is at Big Spring after the take-out. Do not assume private banks or informal gravel bars are legal overnight stops without a separate plan and current NPS rules.",
      "summary": "Launch at Waymeyer and finish at the Big Spring upper river landing for a longer lower Current River day. Use the direct Van Buren gauge as a conservative low-water check and expect the same busier, more motorized lower-river character as the adjacent split sections.",
      "accessCaveats": [
        "NPS has described Waymeyer as a non-commercial floater access while warning about erosion and limited safe unloading room on summer weekends. Follow current NPS signs and avoid blocking the access.",
        "NPS distinguishes Big Spring (upper) as a Current River landing from Big Spring Boat Ramp (lower), which is trailered boats only with no floater access. Confirm the signed upper landing before leaving a vehicle.",
        "The Big Spring coordinate is the existing USGS-topo-derived upper river access point already used in the adjacent route, not the spring overlook, natural-area point, or lower motorized-only ramp."
      ],
      "watchFor": [
        "Shallow shoals, scraping, and slower travel when the Van Buren gauge is near or below the 700 cfs conservative floor.",
        "Motorboat wakes, summer crowds, tubes, slick ramps, swimmers, fishing lines, and crowded loading at Waymeyer, Van Buren, and Big Spring.",
        "High or rising water, floating wood, stronger current, and NPS non-motorized closure levels after storms. The compendium lists Van Buren Bridge at a 5.00 ft closed level.",
        "Private banks, limited cell service outside Van Buren, and confusion between the Big Spring upper landing and the lower motorized-only ramp."
      ]
    }
  },
  "current-river-van-buren-gooseneck": {
    "putIn": {
      "name": "Van Buren Riverfront Park Access",
      "latitude": 36.9939,
      "longitude": -91.014
    },
    "takeOut": {
      "name": "Gooseneck / Hawes Recreation Area",
      "latitude": 36.8194989,
      "longitude": -90.9470707
    },
    "logistics": {
      "distanceLabel": "About 19.3 mi",
      "estimatedPaddleTime": "About 8 hr, longer with low water, stops, wind, crowds, or motorboat traffic",
      "shuttle": "Stage the take-out at Gooseneck / Hawes before driving back to Van Buren Riverfront Park. This is a long lower-river shuttle, so verify roads, parking, daylight, and the signed river landing before launching.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, campground and day-use rules at Gooseneck / Hawes, Van Buren cooperative-area rules, Missouri boating laws, and any posted NPS closure or access notices.",
      "camping": "Plan this as a very long day or an intentionally staged overnight. Gooseneck / Hawes has primitive NPS campground context at the finish, but campsite availability, closures, fees, and river conditions can change.",
      "summary": "Launch at Van Buren Riverfront Park and finish at Gooseneck / Hawes for a long lower Current River continuation. Use the direct Van Buren gauge as a conservative low-water check and expect motorboats, long pool sections, limited exits, and end-of-river logistics.",
      "accessCaveats": [
        "Van Buren Riverfront Park is MDC-listed under a cooperative agreement rather than MDC-owned land; posted city or owner rules may apply beyond the MDC-listed boating regulations.",
        "NPS materials use both Gooseneck and Hawes naming for the downstream endpoint. Confirm the signed Gooseneck / Hawes river access before leaving a vehicle.",
        "The Gooseneck coordinate is the existing USGS-topo-derived Hawes Recreation Area point already used by the adjacent route, not an official NPS GIS landing table.",
        "This route ends near the Current River mouth. Do not continue onto the Black River or other downstream big-river water without a separate plan."
      ],
      "watchFor": [
        "Shallow shoals, scraping, and a slower all-day float when the Van Buren gauge is near or below the 700 cfs conservative floor.",
        "Motorboat wakes, long pool sections, wind, summer crowds, tubes, slick landings, swimmers, fishing lines, and crowded access areas.",
        "High or rising water, floating wood, stronger current, and NPS non-motorized closure levels after storms. The compendium lists Van Buren Bridge at a 5.00 ft closed level.",
        "Private banks, limited cell service, few easy exits, and confusion between Gooseneck and Hawes naming at the take-out."
      ]
    }
  },
  "current-river-waymeyer-gooseneck": {
    "putIn": {
      "name": "Waymeyer Access",
      "latitude": 37.054302,
      "longitude": -91.055459
    },
    "takeOut": {
      "name": "Gooseneck / Hawes Recreation Area",
      "latitude": 36.8194989,
      "longitude": -90.9470707
    },
    "logistics": {
      "distanceLabel": "About 25.8 mi",
      "estimatedPaddleTime": "About 11 hr, longer with low water, stops, wind, crowds, or motorboat traffic",
      "shuttle": "Stage the take-out at Gooseneck / Hawes before driving north to Waymeyer. This is the full lower-Current continuation, so verify access hours, parking, daylight, and whether you are treating it as a very long day or a staged overnight.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, campground and day-use rules at Gooseneck / Hawes, Missouri boating laws, no-glass/no-polystyrene rules, and any posted NPS closure or access notices.",
      "camping": "Do not treat this as casual roadside gravel-bar camping. The clearest legal overnight support is the primitive camping context at Gooseneck / Hawes or a separate compliant plan made before launch.",
      "summary": "Launch at Waymeyer and finish at Gooseneck / Hawes for the full public lower Current continuation. Use the direct Van Buren gauge as a conservative low-water check and plan for a very long day or staged overnight with motorboats, long pools, limited exits, and end-of-river logistics.",
      "accessCaveats": [
        "NPS has described Waymeyer as a non-commercial floater access while warning about erosion and limited unloading room on summer weekends. Follow current NPS signs and avoid blocking the access.",
        "NPS materials use both Gooseneck and Hawes naming for the downstream endpoint. Confirm the signed river landing before leaving a vehicle.",
        "The Gooseneck coordinate is the existing USGS-topo-derived Hawes Recreation Area point already used by the adjacent route, not an official NPS GIS landing table.",
        "This route passes the lower Current access chain and ends near the river mouth. Do not continue onto the Black River without a separate plan."
      ],
      "watchFor": [
        "Shallow shoals, scraping, and an exceptionally long day when the Van Buren gauge is near or below the 700 cfs conservative floor.",
        "Motorboat wakes, long pool sections, wind, summer crowds, tubes, slick landings, swimmers, fishing lines, and crowded access areas.",
        "High or rising water, floating wood, stronger current, and NPS non-motorized closure levels after storms. The compendium lists Van Buren Bridge at a 5.00 ft closed level.",
        "Private banks, limited cell service, few easy exits, heat exposure, and fatigue if trying to force the full continuation into one day."
      ]
    }
  },
  "eleven-point-river-cane-bluff-greer-crossing": {
    "putIn": {
      "name": "Cane Bluff River Access",
      "latitude": 36.796246,
      "longitude": -91.405675
    },
    "takeOut": {
      "name": "Greer Crossing Recreation Area",
      "latitude": 36.79356389,
      "longitude": -91.32854167
    },
    "logistics": {
      "distanceLabel": "About 7.3 mi by Forest Service river miles",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr depending on level, stops, and shuttle timing",
      "shuttle": "Use a two-car or local outfitter shuttle between Cane Bluff and Greer Crossing. Both approaches use rural Forest Service and gravel-road access, so inspect the take-out and parking before committing.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, no-glass/no-polystyrene river rules, campground/day-use rules at Greer, and posted parking signs.",
      "camping": "Cane Bluff allows dispersed camping and Greer Crossing has a campground, but treat this as a day float unless you have a separate legal overnight plan and have checked current Forest Service rules.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Cane Bluff and take out at Greer Crossing for a spring-favored upper Eleven Point float. Use the Bardley gauge as a conservative low-water estimate, but expect the river above Greer Spring to feel shallower and slower than the downstream gauge suggests.",
      "accessCaveats": [
        "Cane Bluff and Greer Crossing are official Forest Service river accesses with published coordinates, but road conditions, parking limits, and site rules can change.",
        "The Bardley gauge is downstream of Greer Spring, so this upper section can require more scraping and local judgment than the gauge alone suggests.",
        "The Eleven Point corridor includes private lands under scenic easement. Do not assume banks away from public accesses, designated float camps, or legal gravel-bar stops are public."
      ],
      "watchFor": [
        "Shallow riffles, scraping, and occasional short portages when the Bardley gauge is near the 300 cfs floor, especially above Greer Spring.",
        "Fresh wood, blind bends, rapid rises after rain, and a remote-feeling stretch with limited easy exits.",
        "Motorized users are allowed on this part of the National Wild and Scenic River under the 25 hp limit, and the water gets colder and swifter near Greer Spring."
      ]
    }
  },
  "eleven-point-river-cane-bluff-turner-mill": {
    "putIn": {
      "name": "Cane Bluff River Access",
      "latitude": 36.796246,
      "longitude": -91.405675
    },
    "takeOut": {
      "name": "Turner Mill South River Access",
      "latitude": 36.76456,
      "longitude": -91.26653037
    },
    "logistics": {
      "distanceLabel": "About 12.2 mi by Forest Service river miles",
      "estimatedPaddleTime": "About 5.5 hr to 8 hr depending on level, breaks, and shuttle timing",
      "shuttle": "Use a two-car or local outfitter shuttle between Cane Bluff and Turner Mill South. Both accesses use rural Forest Service roads, so inspect the Turner side before committing and confirm you are staging at the river-right South landing rather than the separate North day-use area.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, no-glass/no-polystyrene river rules, campground and day-use rules, and posted parking signs.",
      "camping": "Cane Bluff allows dispersed camping and Turner Mill South has limited dispersed campsites, but treat this as a day float unless you have checked current Forest Service rules and built a separate legal overnight plan.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Cane Bluff and take out at Turner Mill South for a longer Eleven Point day that starts on the smaller upper river and finishes on the more dependable Greer Spring-supported flow. Use the Bardley gauge as a conservative low-water check, then make a same-day visual call at the launch.",
      "accessCaveats": [
        "Cane Bluff and Turner Mill South are official Forest Service river accesses with published coordinates, but road conditions, parking limits, and site rules can change after storms.",
        "The Bardley gauge is downstream of the upper half, so Cane Bluff-to-Greer can still feel shallower and slower than the gauge alone suggests even when the Turner half improves below Greer Spring.",
        "The Eleven Point corridor includes private lands under scenic easement. Do not assume banks away from public accesses, designated float camps, or legal gravel-bar stops are public."
      ],
      "watchFor": [
        "Shallow riffles, scraping, and occasional short portages above Greer Spring when the Bardley gauge is near the 300 cfs floor.",
        "Mary Decker Shoal, fresh wood, blind bends, and rapid rises after rain on a long route with limited easy exits.",
        "Cold spring-fed water below Greer, motorized users under the 25 hp limit, and Turner Mill North versus Turner Mill South take-out confusion at the finish."
      ]
    }
  },
  "eleven-point-river-cane-bluff-whitten": {
    "putIn": {
      "name": "Cane Bluff River Access",
      "latitude": 36.796246,
      "longitude": -91.405675
    },
    "takeOut": {
      "name": "Whitten River Access",
      "latitude": 36.732356,
      "longitude": -91.214837
    },
    "logistics": {
      "distanceLabel": "About 18.3 mi by Forest Service river miles",
      "estimatedPaddleTime": "About 7.5 hr to 10.5 hr depending on level, breaks, and group pace",
      "shuttle": "Use a two-car or local outfitter shuttle between Cane Bluff and Whitten. Both approaches use rural Forest Service roads, and the Whitten descent is steep enough that it is worth scouting before launching.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, no-glass/no-polystyrene river rules, float-camp rules, and posted parking signs.",
      "camping": "Cane Bluff allows dispersed camping and the Forest Service river-mile notes identify designated float camps between Greer, Turner, and Whitten, so this corridor can support a conservative legal overnight plan. Do not assume private banks or informal gravel bars are open for camping.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Cane Bluff and take out at Whitten for a long Eleven Point continuation that starts on the smaller upper river and finishes on the colder spring-fed lower corridor. Use the Bardley gauge as a conservative low-water estimate, then make a same-day visual call at the launch.",
      "accessCaveats": [
        "Cane Bluff and Whitten are official Forest Service river accesses with published coordinates, but rural road conditions, parking limits, and site rules can change after storms.",
        "The Bardley gauge is downstream of the Cane Bluff half, so the upper miles can still feel shallower and slower than the gauge alone suggests near the 300 cfs floor.",
        "The Eleven Point corridor includes private lands under scenic easement. Do not assume banks away from public accesses, designated float camps, or legal gravel-bar stops are public."
      ],
      "watchFor": [
        "Shallow riffles, scraping, and occasional short portages above Greer Spring when the Bardley gauge is near the 300 cfs floor.",
        "Mary Decker Shoal, fresh wood, blind bends, cold-water transition below Greer Spring, and limited easy exits on a long route.",
        "Motorized users under the 25 hp limit, weekend congestion near Whitten, and fatigue if the full continuation is forced into one push."
      ]
    }
  },
  "eleven-point-river-cane-bluff-riverton": {
    "putIn": {
      "name": "Cane Bluff River Access",
      "latitude": 36.796246,
      "longitude": -91.405675
    },
    "takeOut": {
      "name": "Riverton East River Access / Highway 160",
      "latitude": 36.649183,
      "longitude": -91.199614
    },
    "logistics": {
      "distanceLabel": "About 26.3 mi by Forest Service river miles",
      "estimatedPaddleTime": "About 9 hr to 12.5 hr depending on level, stops, wind, and whether you split the route overnight",
      "shuttle": "Use a two-car or local outfitter shuttle between Cane Bluff and Riverton East. Inspect the Highway 160 finish before launching because Riverton East is the default river-left take-out and Riverton West is the nearby river-right alternate just downstream.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, no-glass/no-polystyrene river rules, float-camp rules, Missouri boating rules, and posted parking signs.",
      "camping": "Cane Bluff allows dispersed camping and the Forest Service corridor includes designated float camps between Greer, Turner, Whitten, and Riverton, so this route can support a legal overnight split. Do not assume private banks or informal gravel bars are open for camping.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Cane Bluff and take out at Riverton East for a full-corridor Eleven Point continuation that starts on the smaller upper river and finishes at the classic Highway 160 lower-river landing. Use the Bardley gauge as a conservative low-water estimate, then make a same-day visual call at the launch.",
      "accessCaveats": [
        "Cane Bluff and Riverton East are official Forest Service river accesses with published coordinates, but rural roads, parking limits, and site rules can change after storms.",
        "The Bardley gauge is downstream of the Cane Bluff half, so the upper miles can still feel shallower and slower than the gauge alone suggests near the 300 cfs floor.",
        "Riverton East is the preferred river-left finish just above Highway 160; do not confuse it with other Riverton access points or assume private banks between public accesses are legal substitutes."
      ],
      "watchFor": [
        "Shallow riffles, scraping, and occasional short portages above Greer Spring when the Bardley gauge is near the 300 cfs floor.",
        "Mary Decker Shoal, Halls Bay near the end, fresh wood, blind bends, thunderstorms, and cold spring-fed water on a very long route.",
        "Fatigue, wind on wider lower stretches, motorized users under the 25 hp limit, and limited developed bailouts if you force the whole continuation into one push."
      ]
    }
  },
  "eleven-point-river-cane-bluff-narrows": {
    "putIn": {
      "name": "Cane Bluff River Access",
      "latitude": 36.796246,
      "longitude": -91.405675
    },
    "takeOut": {
      "name": "Highway 142 River Access / The Narrows",
      "latitude": 36.550194,
      "longitude": -91.191532
    },
    "logistics": {
      "distanceLabel": "About 35.0 mi by Forest Service river miles",
      "estimatedPaddleTime": "About 12 hr to 18 hr total; treat it as an overnight-capable corridor rather than a casual one-day float",
      "shuttle": "Use a two-car or local outfitter shuttle between Cane Bluff and Highway 142. The Narrows is the last Forest Service access in the scenic-river corridor, so inspect the finish before launching and do not plan on floating past it without a separate downstream plan.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, no-glass/no-polystyrene river rules, float-camp rules, Missouri boating rules, and posted parking signs.",
      "camping": "This corridor is long enough that the safer conservative plan is usually an overnight split using designated float camps or another clearly legal Forest Service option. The Eleven Point corridor includes float camps, but private banks and informal gravel bars should not be assumed to be legal campsites.",
      "campingClassification": "overnight_capable",
      "summary": "Launch at Cane Bluff and take out at Highway 142 / The Narrows for a full scenic-river continuation that spans the upper Eleven Point, the Greer-to-Turner trout water, and the last access above Arkansas. Use the Bardley gauge as a conservative low-water estimate and build a real overnight plan instead of improvising one on river.",
      "accessCaveats": [
        "Cane Bluff and Highway 142 are official Forest Service accesses with published coordinates, but road, parking, and site rules can change after storms.",
        "The Bardley gauge is downstream of the Cane Bluff half, so the upper miles can still feel shallower and slower than the gauge alone suggests near the 300 cfs floor.",
        "Highway 142 / The Narrows is the last access on the southern end of the Eleven Point National Scenic River Area. Missing it pushes the trip toward Arkansas and changes the route plan materially."
      ],
      "watchFor": [
        "Shallow riffles and occasional short portages above Greer Spring when the Bardley gauge is near the 300 cfs floor.",
        "Mary Decker Shoal, Halls Bay, fresh flood wood, blind bends, thunderstorms, and cold-water swims on a long multi-section route.",
        "Overnight logistics, fatigue, motorized users under the 25 hp limit, and the need to use legal float camps or another source-backed overnight option rather than informal stops."
      ]
    }
  },
  "eleven-point-river-thomasville-cane-bluff": {
    "putIn": {
      "name": "Thomasville River Access",
      "latitude": 36.78548,
      "longitude": -91.528058
    },
    "takeOut": {
      "name": "Cane Bluff River Access",
      "latitude": 36.796246,
      "longitude": -91.405675
    },
    "logistics": {
      "distanceLabel": "About 9.3 mi",
      "estimatedPaddleTime": "About 4.5 hr to 7 hr depending on level, walking, and spring or cave stops",
      "shuttle": "Use a two-car or local outfitter shuttle between Thomasville and Cane Bluff. Both approaches use rural Forest Service and county roads, so scout the take-out first and do not assume the upper access roads recover quickly after storms.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, posted parking signs, no-glass/no-polystyrene river rules, and any current Forest Service alerts or area closures.",
      "camping": "Thomasville and Cane Bluff both have camping context, but treat this as a day float unless you have checked current Forest Service rules and have a separate legal overnight plan. Cane Bluff dispersed camping and any primitive upper-river stops come with Leave No Trace, private-land, and water-level constraints.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Thomasville and take out at Cane Bluff for the uppermost public Eleven Point float. Use the Bardley gauge only as a conservative same-river estimate and expect this warmer, smaller reach to need more local judgment than the lower spring-fed Eleven Point routes.",
      "accessCaveats": [
        "The current Forest Service Thomasville page now shows the site open, but this access was closed earlier in June after flood damage. Recheck current Forest Service alerts before making the shuttle.",
        "The Bardley gauge is well downstream, so this route can scrape, require walking, or feel more marginal than the gauge alone suggests.",
        "Cane Bluff is the first public access below Thomasville. Do not assume other gravel bars, primitive pull-offs, or private-bank openings on this upper river are legal substitutes for the named accesses."
      ],
      "watchFor": [
        "Shallow riffles, walking, or short portages when the river is low, especially in late spring or early summer dry spells.",
        "Old low-water bridge remnants, fresh wood, blind bends, rain-driven rises, and Class I-II upper-river consequences on a remote corridor.",
        "Motorized boats are not recommended here, potable water is not available at the accesses, and dispersed-camping rules at Cane Bluff come with extra responsibility if you are not treating the route as a straight day float."
      ]
    }
  },
  "eleven-point-river-thomasville-greer-crossing": {
    "putIn": {
      "name": "Thomasville River Access",
      "latitude": 36.78548,
      "longitude": -91.528058
    },
    "takeOut": {
      "name": "Greer Crossing Recreation Area",
      "latitude": 36.79356389,
      "longitude": -91.32854167
    },
    "logistics": {
      "distanceLabel": "About 16.6 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr depending on level, walking, and how long you stop around springs or shoals",
      "shuttle": "Use a two-car or local outfitter shuttle between Thomasville and Greer Crossing. Both approaches use rural roads, and Greer Crossing is the cleaner downstream finish with campground and day-use support.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, posted parking signs, no-glass/no-polystyrene river rules, campground rules at Greer, and any current Forest Service alerts or closures.",
      "camping": "Thomasville has dispersed-camping context and Greer Crossing has a campground, but treat this as a long day float unless you have checked current Forest Service rules and built a separate legal overnight plan.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Thomasville and take out at Greer Crossing for the full upper-Eleven public continuation to Greer Spring. Use the Bardley gauge only as a conservative same-river estimate and expect the upper miles to need more local judgment than the colder finish near Greer.",
      "accessCaveats": [
        "The current Forest Service Thomasville page says this section is usually best from March through June and can require walking or portages in drought season.",
        "The Bardley gauge is well downstream, so the Thomasville half can scrape or feel more marginal than the gauge alone suggests.",
        "Thomasville and Greer Crossing are the named public accesses for this route. Do not assume private banks, informal gravel bars, or roadside pull-offs are legal substitutes."
      ],
      "watchFor": [
        "Old low-water bridge remnants, shallow riffles, walking or short portages, and fresh wood on the upper half.",
        "Rapid rises after rain, blind bends, and a colder, faster finish where Greer Spring enters just above the take-out.",
        "A long shuttle day with limited easy exits between official accesses."
      ]
    }
  },
  "eleven-point-river-thomasville-turner-mill-south": {
    "putIn": {
      "name": "Thomasville River Access",
      "latitude": 36.78548,
      "longitude": -91.528058
    },
    "takeOut": {
      "name": "Turner Mill South River Access",
      "latitude": 36.76456,
      "longitude": -91.26653037
    },
    "logistics": {
      "distanceLabel": "About 21.5 mi by Forest Service river miles",
      "estimatedPaddleTime": "About 8.5 hr to 12 hr depending on level, walking, breaks, and shuttle timing",
      "shuttle": "Use a two-car or local outfitter shuttle between Thomasville and Turner Mill South. Inspect the Turner finish before launching and confirm you are staging at the river-right South landing rather than the separate North day-use area.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, posted parking signs, no-glass/no-polystyrene river rules, float-camp rules, and any current Forest Service alerts or closures.",
      "camping": "This corridor can support a conservative legal overnight plan using designated float camps or another clearly legal Forest Service option. Turner Mill South itself has limited campsite context, but private banks and informal gravel bars should not be assumed to be legal campsites.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Thomasville and take out at Turner Mill South for a very long upper-to-mid Eleven Point continuation. Use the Bardley gauge only as a conservative same-river estimate and build real margin for the smaller upper-river start before Greer Spring improves the flow.",
      "accessCaveats": [
        "The current Forest Service Thomasville page says the upper miles are usually best from March through June and can require walking or portages in drought season.",
        "The Bardley gauge is downstream of the upper half, so the Thomasville-to-Greer portion can still feel shallower and slower than the gauge alone suggests.",
        "Turner Mill North and Turner Mill South are separate landings. Confirm the intended river-right South take-out before staging vehicles and avoid crossing private land."
      ],
      "watchFor": [
        "Old bridge remnants, shallow riffles, and short walking or portage moments before Greer Spring.",
        "Mary Decker Shoal, colder spring-fed water below Greer, fresh wood, blind bends, and rapid rises after rain.",
        "Fatigue, limited easy exits, and the need to use legal float camps or another source-backed overnight plan instead of improvising one on river."
      ]
    }
  },
  "eleven-point-river-thomasville-whitten": {
    "putIn": {
      "name": "Thomasville River Access",
      "latitude": 36.78548,
      "longitude": -91.528058
    },
    "takeOut": {
      "name": "Whitten River Access",
      "latitude": 36.732356,
      "longitude": -91.214837
    },
    "logistics": {
      "distanceLabel": "About 27.6 mi by Forest Service river miles",
      "estimatedPaddleTime": "About 10 hr to 14 hr total; treat it as an overnight-capable corridor rather than a casual one-day float",
      "shuttle": "Use a two-car or local outfitter shuttle between Thomasville and Whitten. Both approaches use rural Forest Service roads, and the Whitten descent is steep enough that it is worth scouting before launch day.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, posted parking signs, no-glass/no-polystyrene river rules, float-camp rules, and any current Forest Service alerts or closures.",
      "camping": "This corridor is long enough that the safer conservative plan is usually an overnight split using designated float camps or another clearly legal Forest Service option. Thomasville has dispersed-camping context, Whitten is day-use focused, and private banks or informal gravel bars should not be assumed to be legal campsites.",
      "campingClassification": "overnight_capable",
      "summary": "Launch at Thomasville and take out at Whitten for a full upper-to-lower Eleven Point continuation. Use the Bardley gauge only as a conservative same-river estimate and build a real overnight or all-day plan instead of assuming the lower Whitten finish makes the upper miles easy.",
      "accessCaveats": [
        "The current Forest Service Thomasville page says the upper miles are usually best from March through June and can require walking or portages in drought season.",
        "The Bardley gauge is downstream of much of the route, so the Thomasville half can still feel scrape-prone near the 300 cfs floor even if the lower miles look more comfortable.",
        "Whitten can be busy on weekends with both motorized and nonmotorized users. Do not assume private banks, informal pull-offs, or undesignated gravel bars are legal substitutes for a planned finish or overnight stop."
      ],
      "watchFor": [
        "Old bridge remnants, shallow riffles, and possible walking or short portages before Greer Spring.",
        "Mary Decker Shoal, cold-water transition, fresh wood, blind bends, and rapid rises after rain on a very long route.",
        "Fatigue, limited developed exits, and the need to use legal float camps or another source-backed overnight plan rather than forcing the continuation without margin."
      ]
    }
  },
  "eleven-point-river-greer-crossing-turner-mill": {
    "putIn": {
      "name": "Greer Crossing Recreation Area",
      "latitude": 36.79356389,
      "longitude": -91.32854167
    },
    "takeOut": {
      "name": "Turner Mill North River Access",
      "latitude": 36.765748,
      "longitude": -91.266931
    },
    "logistics": {
      "distanceLabel": "4.9 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr depending on level, stops, and shuttle timing",
      "shuttle": "Use a two-car or local outfitter shuttle between Greer Crossing and Turner Mill. Roads to Turner Mill are rural Forest Service roads, so inspect the take-out and parking before committing.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, day-use restrictions, no-glass/no-polystyrene river rules, campground rules at Greer, and posted parking signs.",
      "camping": "Treat this as a day trip unless you have a separate legal camping plan. Greer Crossing has campground facilities, Turner Mill North is day-use only, and designated float camps have separate rules.",
      "summary": "Launch at Greer Crossing and take out at Turner Mill for a short spring-fed Eleven Point run through Mary Decker Shoal and the Blue Ribbon Trout Area. Use the Bardley gauge as a conservative low-water check, then make a visual call at the launch.",
      "accessCaveats": [
        "Greer Crossing and Turner Mill North are official Forest Service river accesses with published coordinates, but road, parking, campground, and day-use rules can change.",
        "Turner Mill North is on river left and Turner Mill South is the larger landing on river right. Confirm the intended side before staging vehicles and avoid crossing private land.",
        "The Eleven Point corridor includes private lands under scenic easement. Do not assume banks away from public accesses, designated float camps, or legal gravel-bar stops are public."
      ],
      "watchFor": [
        "Mary Decker Shoal and shallow bouldery spots, especially when the Bardley gauge is near the 300 cfs floor.",
        "Cold spring-fed water, rapid rises after rain, fresh wood, blind bends, and remote-feeling gaps between accesses.",
        "Motorized users are allowed on this part of the National Wild and Scenic River under the 25 hp limit."
      ]
    }
  },
  "eleven-point-river-greer-crossing-turner-mill-south": {
    "putIn": {
      "name": "Greer Crossing Recreation Area",
      "latitude": 36.79356389,
      "longitude": -91.32854167
    },
    "takeOut": {
      "name": "Turner Mill South River Access",
      "latitude": 36.76456,
      "longitude": -91.26653037
    },
    "logistics": {
      "distanceLabel": "4.9 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr depending on level, stops, and shuttle timing",
      "shuttle": "Use a two-car or local outfitter shuttle between Greer Crossing and Turner Mill South. Roads to Turner Mill are rural Forest Service roads, so inspect the landing, parking, and turnaround before committing.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, day-use restrictions, no-glass/no-polystyrene river rules, campground rules at Greer, and posted parking signs.",
      "camping": "Treat this as a day trip unless you have a separate legal camping plan. Greer Crossing has campground facilities, while Turner Mill South is mainly a day-use launch with limited campsite context and designated float camps have separate rules.",
      "summary": "Launch at Greer Crossing and take out at Turner Mill South for a short spring-fed Eleven Point run through Mary Decker Shoal and the Blue Ribbon Trout Area. Use the Bardley gauge as a conservative low-water check, then make a visual call at the launch.",
      "accessCaveats": [
        "Greer Crossing and Turner Mill South are official Forest Service river accesses with published coordinates, but road, parking, campground, and day-use rules can change.",
        "Turner Mill South is the larger river-right landing below Greer. Do not confuse it with Turner Mill North on river left or cross private land between the two accesses.",
        "The Eleven Point corridor includes private lands under scenic easement. Do not assume banks away from public accesses, designated float camps, or legal gravel-bar stops are public."
      ],
      "watchFor": [
        "Mary Decker Shoal and shallow bouldery spots, especially when the Bardley gauge is near the 300 cfs floor.",
        "Cold spring-fed water, rapid rises after rain, fresh wood, blind bends, and remote-feeling gaps between accesses.",
        "Motorized users are allowed on this part of the National Wild and Scenic River under the 25 hp limit."
      ]
    }
  },
  "eleven-point-river-greer-crossing-whitten": {
    "putIn": {
      "name": "Greer Crossing Recreation Area",
      "latitude": 36.79356389,
      "longitude": -91.32854167
    },
    "takeOut": {
      "name": "Whitten River Access",
      "latitude": 36.732356,
      "longitude": -91.214837
    },
    "logistics": {
      "distanceLabel": "About 11 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr depending on level, stops, and shuttle timing",
      "shuttle": "Use a two-car or local outfitter shuttle between Greer Crossing and Whitten. Both approaches use rural Forest Service roads, and the Whitten descent is steep enough that it is worth scouting before launching.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, campground and day-use restrictions, no-glass/no-polystyrene river rules, and posted parking signs.",
      "camping": "Greer Crossing has campground facilities, but treat this as a day float unless you have a separate legal overnight plan that uses designated float camps or another approved camping option.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Greer Crossing and take out at Whitten for a longer spring-fed Eleven Point run through the Blue and White Ribbon trout water. Use the Bardley gauge as a conservative low-water check, then make a same-day visual call at the launch.",
      "accessCaveats": [
        "Greer Crossing and Whitten are official Forest Service river accesses with published coordinates, but road, parking, campground, and site rules can change.",
        "This is longer than the split sections and still has limited easy exits. Treat the 11-mile distance, shuttle timing, and weather as part of the go or no-go decision.",
        "The Eleven Point corridor includes private lands under scenic easement. Do not assume banks away from public accesses, designated float camps, or legal gravel-bar stops are public."
      ],
      "watchFor": [
        "Mary Decker Shoal, shallow shoals, and occasional dragging when the Bardley gauge falls near the 300 cfs floor.",
        "Cold spring-fed water, fresh wood, blind bends, and rapid rises after rain.",
        "Motorized users under the 25 hp limit and weekend congestion near Greer or Whitten."
      ]
    }
  },
  "eleven-point-river-greer-crossing-riverton": {
    "putIn": {
      "name": "Greer Crossing Recreation Area",
      "latitude": 36.79356389,
      "longitude": -91.32854167
    },
    "takeOut": {
      "name": "Riverton East River Access / Highway 160",
      "latitude": 36.649183,
      "longitude": -91.199614
    },
    "logistics": {
      "distanceLabel": "About 19 mi",
      "estimatedPaddleTime": "About 8 hr to 11 hr depending on level, stops, wind, and group pace",
      "shuttle": "Use a two-car or local outfitter shuttle between Greer Crossing and Riverton East at Highway 160. Inspect the take-out before launching because this is a long route and the Riverton corridor has separate east-bank and west-bank day-use landings around the bridge.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, campground and day-use restrictions, no-glass/no-polystyrene river rules, Missouri boating rules, and posted parking signs.",
      "camping": "Greer Crossing has campground facilities, but Riverton East is day-use only. Treat this as a long day float or a separate overnight plan using designated float camps or another legal camping option rather than assuming riverbank camping is allowed.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Greer Crossing and take out at Riverton East for a long lower Eleven Point day that the Forest Service also frames as an excellent easy overnighter. Use the Bardley gauge as a conservative low-water check and keep extra margin for distance, weather, and cold water.",
      "accessCaveats": [
        "Greer Crossing and Riverton East are official Forest Service river accesses with published coordinates, but road, parking, campground, and day-use rules can change.",
        "Riverton East is the river-left take-out just above Highway 160; Riverton West is a separate day-use area on river right and is not the default finish for this route.",
        "The Eleven Point corridor includes private lands under scenic easement. Do not assume banks away from public accesses, designated float camps, or legal gravel-bar stops are public."
      ],
      "watchFor": [
        "A full-day commitment, slow shoals and occasional scraping when the Bardley gauge is near the 300 cfs floor, and wind or fatigue on the long middle miles.",
        "Mary Decker Shoal early in the route, then cold spring-fed water, fresh wood, blind bends, and rapid rises after rain.",
        "Halls Bay near the end of the route, weekend traffic, and motorized users under the 25 hp limit."
      ]
    }
  },
  "eleven-point-river-greer-crossing-narrows": {
    "putIn": {
      "name": "Greer Crossing Recreation Area",
      "latitude": 36.79356389,
      "longitude": -91.32854167
    },
    "takeOut": {
      "name": "Highway 142 River Access / The Narrows",
      "latitude": 36.550194,
      "longitude": -91.191532
    },
    "logistics": {
      "distanceLabel": "About 27.7 mi by combined Forest Service mileage notes",
      "estimatedPaddleTime": "About 10 hr to 15 hr depending on level, stops, wind, and whether you split the route overnight",
      "shuttle": "Use a two-car or local outfitter shuttle between Greer Crossing and Highway 142. The Narrows is the last Forest Service access in the scenic-river corridor, so inspect the finish before launching and do not plan on drifting past it without a separate downstream plan.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, campground and day-use restrictions, no-glass/no-polystyrene river rules, Missouri boating rules, and posted parking signs.",
      "camping": "Greer Crossing has campground facilities and the corridor includes designated float camps between Whitten, Riverton, and the lower river, so this route can support a legal overnight split. Highway 142 itself is day-use only and private banks should not be assumed for camping.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Greer Crossing and take out at Highway 142 / The Narrows for a long lower Eleven Point continuation to the last scenic-river access. Use the Bardley gauge as a conservative low-water check and keep extra margin for distance, weather, and take-out discipline.",
      "accessCaveats": [
        "Greer Crossing and Highway 142 are official Forest Service river accesses with published coordinates, but road, parking, campground, and site rules can change after storms.",
        "Highway 142 / The Narrows is the last access on the southern end of the Eleven Point National Scenic River Area. Missing it pushes the trip toward Arkansas and materially changes the route plan.",
        "The Eleven Point corridor includes private lands under scenic easement. Do not assume banks away from public accesses, designated float camps, or legal gravel-bar stops are public."
      ],
      "watchFor": [
        "A full-day or overnight commitment, slow shoals when the Bardley gauge is near the 300 cfs floor, and fatigue if the route is forced into one push.",
        "Mary Decker Shoal early, then cold spring-fed water, fresh wood, blind bends, Halls Bay, and rapid rises after rain.",
        "Motorized users under the 25 hp limit, limited developed exits below Riverton, and the need to stage a clear finish plan at Highway 142 before launching."
      ]
    }
  },
  "eleven-point-river-turner-mill-south-whitten": {
    "putIn": {
      "name": "Turner Mill South River Access",
      "latitude": 36.76456,
      "longitude": -91.26653037
    },
    "takeOut": {
      "name": "Whitten River Access",
      "latitude": 36.732356,
      "longitude": -91.214837
    },
    "logistics": {
      "distanceLabel": "About 6.1 mi by Forest Service river miles",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr depending on level, stops, and shuttle timing",
      "shuttle": "Use a two-car or local outfitter shuttle between Turner Mill South and Whitten. Both approaches include rural Forest Service roads, and the Whitten descent is steep, so inspect the take-out before committing.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, day-use restrictions, no-glass/no-polystyrene river rules, and posted parking signs.",
      "camping": "Treat this as a day trip unless you have a separate legal camping plan. Turner Mill South has limited campsites, but the Forest Service prohibits overnight camping in day-use access areas and designated float camps have separate rules.",
      "summary": "Launch at Turner Mill South and take out at Whitten for the spring-fed Eleven Point link above the existing Whitten-to-Riverton route. Use the Bardley USGS gauge as a conservative low-water check, then make a same-day visual call at the launch.",
      "accessCaveats": [
        "Turner Mill South and Whitten are official Forest Service river accesses with published coordinates, but access roads are rural and conditions can change after storms.",
        "The Forest Service river-mile notes imply about 6.1 miles from Turner Mill to Whitten, while MoHERP exact-trip evidence rounds Turner Mill to Whitten to 8.0 miles. Plan time conservatively.",
        "The Eleven Point corridor includes private lands under scenic easement. Do not assume banks away from public accesses, designated float camps, or legal gravel-bar stops are public."
      ],
      "watchFor": [
        "Shallow shoals and occasional dragging when the Bardley gauge falls near the 300 cfs floor.",
        "Cold spring-fed water, rapid rises after rain, fresh wood, blind bends, and remote-feeling gaps between accesses.",
        "Motorized users are allowed on this part of the National Wild and Scenic River under the 25 hp limit."
      ]
    }
  },
  "eleven-point-river-turner-mill-south-riverton": {
    "putIn": {
      "name": "Turner Mill South River Access",
      "latitude": 36.76456,
      "longitude": -91.26653037
    },
    "takeOut": {
      "name": "Riverton East River Access / Highway 160",
      "latitude": 36.649183,
      "longitude": -91.199614
    },
    "logistics": {
      "distanceLabel": "About 14.1 mi by Forest Service river miles",
      "estimatedPaddleTime": "About 6 hr to 8.5 hr depending on level, stops, wind, and shuttle timing",
      "shuttle": "Use a two-car or local outfitter shuttle between Turner Mill South and Riverton East. Inspect the Highway 160 finish before launching because Riverton East is the default river-left take-out and Riverton West is the nearby river-right alternate below the bridge.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, no-glass/no-polystyrene river rules, float-camp rules, Missouri boating rules, and posted parking signs.",
      "camping": "Turner Mill South has limited campsites and the Forest Service river-mile notes identify designated float camps between Whitten and Riverton, so this corridor can support a legal overnight split. Riverton East itself is day-use only.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Turner Mill South and take out at Riverton East for a long lower Eleven Point continuation through the White Ribbon trout water. Use the Bardley gauge as a conservative low-water check and keep extra margin for distance, weather, and cold water.",
      "accessCaveats": [
        "Turner Mill South and Riverton East are official Forest Service river accesses with published coordinates, but road, parking, and day-use rules can change after storms.",
        "Riverton East is the preferred river-left finish just above Highway 160; Riverton West is a separate day-use area on river right and is not the default take-out for this route.",
        "The Eleven Point corridor includes private lands under scenic easement. Do not assume banks away from public accesses, designated float camps, or legal gravel-bar stops are public."
      ],
      "watchFor": [
        "A full-day commitment, shoals and slower travel when the Bardley gauge is near the 300 cfs floor, and wind or fatigue on the long middle miles.",
        "Cold spring-fed water, fresh wood, blind bends, Halls Bay near the end of the route, and rapid rises after rain.",
        "Motorized users under the 25 hp limit and limited developed bailouts between Turner Mill South and Riverton East."
      ]
    }
  },
  "eleven-point-river-turner-mill-south-narrows": {
    "putIn": {
      "name": "Turner Mill South River Access",
      "latitude": 36.76456,
      "longitude": -91.26653037
    },
    "takeOut": {
      "name": "Highway 142 River Access / The Narrows",
      "latitude": 36.550194,
      "longitude": -91.191532
    },
    "logistics": {
      "distanceLabel": "About 22.8 mi by Forest Service river miles",
      "estimatedPaddleTime": "About 8.5 hr to 12 hr depending on level, stops, wind, and whether you split the route overnight",
      "shuttle": "Use a two-car or local outfitter shuttle between Turner Mill South and Highway 142. The Narrows is the last Forest Service access in the scenic-river corridor, so inspect the finish before launching and do not plan on drifting past it without a separate downstream plan.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, no-glass/no-polystyrene river rules, float-camp rules, Missouri boating rules, and posted parking signs.",
      "camping": "Turner Mill South has limited campsites and the Forest Service corridor includes designated float camps between Whitten, Riverton, and the lower river, so this route can support a legal overnight split. Highway 142 itself is day-use only and private banks should not be assumed to be legal campsites.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Turner Mill South and take out at Highway 142 / The Narrows for a long lower-Eleven continuation through the White Ribbon trout water and the widening scenic corridor below Riverton. Use the Bardley gauge as a conservative low-water check and keep extra margin for weather, distance, and take-out discipline.",
      "accessCaveats": [
        "Turner Mill South and Highway 142 are official Forest Service accesses with published coordinates, but road, parking, and site rules can change after storms.",
        "Highway 142 / The Narrows is the last access on the southern end of the Eleven Point National Scenic River Area. Missing it pushes the trip toward Arkansas and changes the route plan materially.",
        "The Eleven Point corridor includes private lands under scenic easement. Do not assume banks away from public accesses, designated float camps, or legal gravel-bar stops are public."
      ],
      "watchFor": [
        "A full-day commitment, shoals and slower travel when the Bardley gauge is near the 300 cfs floor, and fatigue if the route is forced into one push.",
        "Halls Bay, fresh flood wood, blind bends, cold spring-fed water, thunderstorms, and rapid rises after rain.",
        "Motorized users under the 25 hp limit, limited developed exits below Riverton, and the need to stage a clear finish plan at Highway 142 before launching."
      ]
    }
  },
  "eleven-point-river-whitten-riverton": {
    "putIn": {
      "name": "Whitten River Access",
      "latitude": 36.732356,
      "longitude": -91.214837
    },
    "takeOut": {
      "name": "Riverton East River Access / Highway 160",
      "latitude": 36.649183,
      "longitude": -91.199614
    },
    "logistics": {
      "distanceLabel": "About 8 mi",
      "estimatedPaddleTime": "About 4 hr to 5.5 hr depending on level, stops, and wind",
      "shuttle": "Use a two-car or local outfitter shuttle between Whitten Access and Riverton East at Highway 160. The Forest Service route to Whitten includes gravel and a steep descent into the access, and Riverton West is the nearby river-right alternate if that shuttle staging works better.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, day-use restrictions, no-glass/no-polystyrene river rules, and posted parking signs.",
      "camping": "Treat this as a day trip unless you have a separate legal camping plan. The Forest Service prohibits overnight camping in day-use access areas, while designated float camps and dispersed camping have separate rules.",
      "summary": "Launch at Whitten River Access and take out at Riverton East River Access for the Forest Service-supported lower Eleven Point day float. Expect clear cold water, shoals, spring-fed current, and a direct Bardley gauge used conservatively as a low-water check.",
      "accessCaveats": [
        "Whitten and Riverton East are official Forest Service river accesses, but day-use access areas have posted rules and no overnight camping.",
        "Riverton East is the cleaner canoe/kayak take-out on river left just above the Highway 160 bridge; Riverton West is a separate river-right day-use area.",
        "The Eleven Point corridor includes private lands under scenic easement. Do not assume banks away from public accesses, designated float camps, or legal gravel-bar stops are public."
      ],
      "watchFor": [
        "Shallow shoals and occasional scraping when the Bardley gauge falls near the 300 cfs floor.",
        "Halls Bay near the end of the route: the right channel is a fast ledge line above normal water, while the left is a tricky shallow S-curve with swift current.",
        "Cold spring-fed water, rapid rises after rain, fresh wood, boat traffic, and the 25 hp motor allowance on this part of the National Wild and Scenic River."
      ]
    }
  },
  "eleven-point-river-whitten-narrows": {
    "putIn": {
      "name": "Whitten River Access",
      "latitude": 36.732356,
      "longitude": -91.214837
    },
    "takeOut": {
      "name": "Highway 142 River Access / The Narrows",
      "latitude": 36.550194,
      "longitude": -91.191532
    },
    "logistics": {
      "distanceLabel": "About 16.3 to 16.7 mi by Forest Service mileage notes",
      "estimatedPaddleTime": "About 6.5 hr to 9 hr depending on level, stops, and wind",
      "shuttle": "Use a two-car or local outfitter shuttle between Whitten and Highway 142 River Access. Riverton East is the default midway public landing above Highway 160, and Riverton West is the nearby river-right alternate below the bridge if you need a same-corridor bailout or shorter shuttle. The Narrows is still the only planned finish.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest access rules, no-glass/no-polystyrene river rules, float-camp rules, Missouri boating rules, and posted parking signs.",
      "camping": "Treat this as a long day trip or a separate legal overnight plan. The corridor includes designated float-camp support between Whitten and Riverton, but Highway 142 itself is day-use only and private banks should not be assumed for camping.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Whitten and take out at Highway 142 / The Narrows for the long lower-Eleven continuation to the last scenic-river access. Use the Bardley gauge as a conservative low-water check and keep extra margin for cold water, weather, and distance.",
      "accessCaveats": [
        "Whitten and Highway 142 are official Forest Service river accesses with published coordinates, ramps, parking, and day-use rules.",
        "Riverton East is the default midway public landing above Highway 160, and Riverton West is the nearby river-right alternate below the bridge if you need a same-corridor bailout or shorter shuttle.",
        "Highway 142 / The Narrows is the last access on the southern end of the Eleven Point National Scenic River Area. Missing it pushes the trip toward Arkansas and changes the route plan.",
        "The Eleven Point corridor includes private lands under scenic easement. Do not assume banks away from public accesses, designated float camps, or legal gravel-bar stops are public."
      ],
      "watchFor": [
        "Shallow shoals and slower travel when the Bardley gauge falls near the 300 cfs floor.",
        "Halls Bay, fresh flood wood, blind bends, thunderstorms, and cold-water swims on a long lower-river reach.",
        "Limited developed exits below Riverton and motorized users under the 25 hp limit upstream from The Narrows."
      ]
    }
  },
  "eleven-point-river-riverton-narrows": {
    "putIn": {
      "name": "Riverton East River Access / Highway 160",
      "latitude": 36.649183,
      "longitude": -91.199614
    },
    "takeOut": {
      "name": "Highway 142 River Access / The Narrows",
      "latitude": 36.550194,
      "longitude": -91.191532
    },
    "logistics": {
      "distanceLabel": "About 8 to 8.7 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr depending on level, stops, wind, and wood",
      "shuttle": "Use a two-car or local outfitter shuttle between Riverton East at Highway 160 and Highway 142 River Access. Riverton West is the nearby river-right alternate below the bridge if that shuttle setup works better, but Highway 142 remains the only planned take-out.",
      "permits": "No route-specific private paddling permit is known. Follow Mark Twain National Forest access rules, day-use restrictions, no-glass/no-polystyrene river rules, Missouri boating rules, and posted parking signs.",
      "camping": "Treat this as a day trip unless you have a separate legal camping plan. The Forest Service prohibits overnight camping in day-use access areas; Morgan Spring and other float-camp or dispersed options have separate rules.",
      "summary": "Launch at Riverton East and take out at Highway 142 / The Narrows for the lower Eleven Point day float. Use the Bardley USGS gauge as a conservative low-water check and keep extra margin for the full-day distance, cold water, shoals, and limited developed exits.",
      "accessCaveats": [
        "Riverton East and Highway 142 are official Forest Service river accesses with published coordinates, ramps, parking, and day-use rules.",
        "Riverton West is the nearby river-right alternate below the Highway 160 bridge, but Riverton East remains the default launch because it is the cleaner canoe/kayak staging area above the bridge.",
        "Highway 142 / Narrows is the last access on the southern end of the Eleven Point National Scenic River Area. Missing it pushes the trip toward Myrtle or Arkansas and changes the route plan.",
        "The Eleven Point corridor includes private lands under scenic easement. Do not assume banks away from public accesses, designated float camps, or legal gravel-bar stops are public."
      ],
      "watchFor": [
        "Shallow shoals and slower travel when the Bardley gauge falls near the 300 cfs floor.",
        "Snags, root wads, trees, fresh flood wood, blind bends, and cold-water swims on a full-day lower-river reach.",
        "Rapid rises after rain, thunderstorms, limited developed bailouts, and motorized users under the 25 hp limit upstream from The Narrows."
      ]
    }
  },
  "north-fork-white-river-north-fork-blair": {
    "putIn": {
      "name": "North Fork Recreation Area / Hammond Camp",
      "latitude": 36.758606,
      "longitude": -92.152801
    },
    "takeOut": {
      "name": "Blair Bridge Access",
      "latitude": 36.65403,
      "longitude": -92.22959
    },
    "logistics": {
      "distanceLabel": "About 10 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr depending on level, stops, and scouting",
      "shuttle": "Use a two-car or local outfitter shuttle between North Fork Recreation Area on Route CC and MDC Blair Bridge Access. Roads are rural and partly narrow, so scout the Blair Bridge take-out before launching.",
      "permits": "No route-specific paddling permit is known. Pay any posted Forest Service day-use or launch fee at North Fork Recreation Area, and follow MDC rules and posted signs at Blair Bridge.",
      "camping": "North Fork Recreation Area has a seasonal first-come campground, and Blair Bridge has designated MDC camping context. Treat camping as a separate plan and do not assume overnight use in day-use parking or undesignated riverbank areas.",
      "summary": "Launch at the Forest Service North Fork Recreation Area, locally known as Hammond Camp, and take out at MDC Blair Bridge Access for the official 10-mile North Fork day float. Expect cold spring-fed water, bluffs, shoals, Blue Spring access, The Falls, and a downstream Tecumseh gauge used as a conservative low-water proxy.",
      "accessCaveats": [
        "North Fork Recreation Area is open and has a boat access, but the Forest Service notes a ramp-to-steps transition and a drop between the ramp end and riverbed, so expect a carry-down style launch rather than an easy trailer ramp.",
        "Blair Bridge is public MDC floating access with a concrete boat ramp, but summer demand can be high and local signage should control parking and camping choices.",
        "The Tecumseh gauge is downstream of the route and below additional inflow. Use it as a same-river proxy, not a perfect measure of every shoal between North Fork and Blair."
      ],
      "watchFor": [
        "Dragging and slow shoals when the Tecumseh gauge falls near the 300 cfs floor.",
        "The Falls about 7 miles below North Fork Recreation Area; scout if the level, group skill, or boat load makes the two-foot drop feel questionable.",
        "Cold spring-fed water, swift riffles, fresh wood, strainers on bends, and faster current after rain."
      ]
    }
  },
  "north-fork-white-river-blair-dawt": {
    "putIn": {
      "name": "Blair Bridge Access",
      "latitude": 36.65403,
      "longitude": -92.22959
    },
    "takeOut": {
      "name": "Dawt Mill Resort private-fee river access",
      "latitude": 36.609853,
      "longitude": -92.27757
    },
    "logistics": {
      "distanceLabel": "About 7.6 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr depending on level, stops, and dam/bridge scouting",
      "shuttle": "Use a two-car shuttle or arrange Dawt Mill service before launching. This route ends at private-fee Dawt Mill Resort access, so confirm current reservation, parking, fee, and take-out terms before leaving Blair Bridge.",
      "permits": "No route-specific public paddling permit is known. Follow MDC rules at Blair Bridge, Missouri boating/PFD rules, and Dawt Mill posted access, parking, shuttle, and fee requirements at the take-out.",
      "camping": "Treat this as a day trip unless you have a separate Dawt Mill lodging or camping reservation. Do not assume private-bank camping or access away from public Blair Bridge, the river, legal gravel bars, or arranged resort property.",
      "summary": "Launch at MDC Blair Bridge Access and take out at private-fee Dawt Mill Resort for a 7.6-mile lower North Fork day. Use the downstream Tecumseh USGS gauge as a conservative low-water proxy, then make same-day calls around riffles, wood, Dawt Mill Dam, and the Dawt low-water bridge.",
      "accessCaveats": [
        "Blair Bridge is public MDC floating access, but the route starts immediately around bridge current and old bridge-pier remnants. Inspect the launch and bridge approach before committing.",
        "Dawt Mill is a private resort take-out. Current permission, reservation, shuttle, parking, and fee terms control; do not treat it as an unmanaged public access.",
        "Dawt Mill Dam and the Dawt low-water bridge are near the finish. Low water can make the dam/bridge area awkward, while high water can make the bridge clearance and dam hydraulics dangerous.",
        "The Tecumseh gauge is downstream of this route and near additional inflow/backwater influence. Treat it as a supported proxy, not a perfect reading for every Blair-to-Dawt shoal."
      ],
      "watchFor": [
        "Dragging and slow shoals when the Tecumseh gauge falls near the 300 cfs floor.",
        "Blair Bridge current, old bridge-pier remnants, swift riffles, root wads, fresh wood, and strainers on outside bends.",
        "Dawt Mill Dam, the low-water bridge at Dawt, and possible Norfork Lake backwater effects near the lower end of the reach.",
        "High or rising water after rain, when the dam, bridge, strainers, and resort landing become much less forgiving."
      ]
    }
  },
  "pomme-de-terre-river-outlet-cross-timbers": {
    "putIn": {
      "name": "Outlet Park / Outlet Boat Ramp",
      "latitude": 37.906056,
      "longitude": -93.328917
    },
    "takeOut": {
      "name": "Cross Timbers Access",
      "latitude": 38.020623,
      "longitude": -93.303582
    },
    "logistics": {
      "distanceLabel": "About 13.6 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr when releases are in the USACE floating window, longer with low water, wind, stops, or debris",
      "shuttle": "Use a two-car shuttle between Outlet Park below Pomme de Terre Dam and Cross Timbers Access off Route Y and County Road 281. Inspect Cross Timbers first because it is a rural gravel-road access and flood debris, lake backwater, or high releases can change the landing.",
      "permits": "No route-specific private paddling permit is known. Follow MDC area rules at Hermitage and Cross Timbers, Missouri boating and PFD requirements, and any posted USACE, MDC, parking, camping, or temporary-closure signs.",
      "camping": "Treat this as a long day float unless you have a separate legal camping plan. Outlet Park is a USACE campground by reservation or posted rules, and MDC says Cross Timbers allows camping in the northeast corner of the parking lot with vehicles kept on gravel.",
      "summary": "Launch at Outlet Park below Pomme de Terre Dam and take out at MDC Cross Timbers Access for a 13.6-mile lower Pomme de Terre day. USACE publishes the 100-800 cfs optimal floating release window, and the app uses the direct Hermitage USGS gauge when current observations are fresh enough for a same-day decision.",
      "accessCaveats": [
        "Outlet Park is a USACE recreation area below Pomme de Terre Dam with the Outlet Boat Ramp accessing the river. The coordinate is anchored to the USGS 06921350 / Outlet Park corridor; follow USACE signs for the exact ramp, parking, and any campground or day-use rules.",
        "Cross Timbers Access is an MDC-managed, USACE-leased public access with a boat ramp and parking lot. The coordinate is a practical ramp-area anchor from public map context; follow MDC signs and the area map for exact parking and launch position.",
        "This is a dam-release route. USACE says optimal floating is when the lake releases 100 to 800 cfs into the river, and high release rates can cause sudden rises and turbulence. Verify that the Hermitage USGS value is fresh before relying on it for a same-day go/no-go call."
      ],
      "watchFor": [
        "Flows below about 100 cfs, when the USACE optimal floating window is not met and low-water dragging or slow travel becomes more likely.",
        "Flows above about 800 cfs, high or changing dam releases, sudden rises, turbulence, stronger current, and harder take-out conditions.",
        "Flood debris, strainers, rural access roads, limited services, hot-weather powerboat or angler traffic near accesses, and Truman Reservoir backwater effects near the lower end.",
        "Private land away from public accesses and lawful gravel-bar stops; do not assume banks are public picnic or camping areas."
      ]
    }
  },
  "niangua-river-bennett-spring-barclay": {
    "putIn": {
      "name": "Bennett Spring Access / Bennett Spring boat launch",
      "latitude": 37.733683,
      "longitude": -92.861233
    },
    "takeOut": {
      "name": "Barclay Conservation Area canoe launch",
      "latitude": 37.7872,
      "longitude": -92.86154
    },
    "logistics": {
      "distanceLabel": "About 6.3 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr depending on level, stops, and traffic",
      "shuttle": "Use a short two-car shuttle between Bennett Spring Access on Highway 64 and Barclay Conservation Area via Corkery Road and Barclay Spring Road. Inspect Barclay first because the access roads are rural and same-day parking, ramp, and flood-cleanup conditions control.",
      "permits": "No route-specific paddling permit is known. Follow Missouri State Parks and MDC rules at Bennett Spring, MDC rules at Barclay Conservation Area, Missouri boating and PFD requirements, no-glass/no-polystyrene rules, and any posted trout-area or day-use signs.",
      "camping": "Treat this as a day float unless you have a separate legal camping reservation or plan. Bennett Spring Access is day-use only, and private banks or campground land along the Niangua should not be used without permission.",
      "summary": "Launch at Bennett Spring Access and take out at Barclay Conservation Area for a short 6.3-mile Niangua day below Bennett Spring. Use the upstream Windyville USGS gauge as a conservative low-water proxy, then make a same-day visual call for riffles, crowding, and rising water.",
      "accessCaveats": [
        "Bennett Spring Access is a public MDC access with parking, a concrete ramp, and privies, while Missouri State Parks publishes the boat-launch coordinate inside the Bennett Spring park corridor.",
        "Barclay Conservation Area is a public MDC access with a concrete boat ramp, canoe launching area, and parking, but the mapped canoe-launch coordinate is from OpenStreetMap/Mapcarta rather than an MDC coordinate table. Follow MDC signs and the area map on arrival.",
        "The Windyville gauge is upstream of the route and upstream of Bennett Spring Branch inflow. MoHERP ties the gauge to exact Bennett Spring-to-Barclay trips, but the app still treats it as a proxy rather than a perfect reach reading."
      ],
      "watchFor": [
        "Shallow riffles, scraping, and slower travel when the Windyville gauge is near or below the 40 cfs floor.",
        "High or rising water after storms, cloudy water, fresh wood, swift bends, and stronger current around bridge or ramp approaches.",
        "Cold spring water, trout anglers, tubers, private campgrounds and banks, loud summer weekend traffic, and limited legal exits away from public accesses."
      ]
    }
  },
  "meramec-river-scotts-ford-riverview": {
    "putIn": {
      "name": "Scotts Ford Access",
      "latitude": 37.9783,
      "longitude": -91.4563
    },
    "takeOut": {
      "name": "Riverview Access",
      "latitude": 37.9924,
      "longitude": -91.4255
    },
    "logistics": {
      "distanceLabel": "About 7 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr depending on level, stops, and weekend traffic",
      "shuttle": "Use a two-car shuttle between MDC Scotts Ford Access off Thurman Lake Road and MDC Riverview Access off Route O. Inspect Riverview first because the access road continues past the end of state maintenance and same-day ramp conditions control.",
      "permits": "No route-specific paddling permit is known. Follow MDC area rules, posted signs, hours, parking restrictions, and boat-use rules at both public access areas.",
      "camping": "Treat this as a day float. No legal on-route campsite is assumed between Scotts Ford and Riverview, and private banks should not be used without permission.",
      "summary": "Launch at MDC Scotts Ford Access and take out at MDC Riverview Access for a 7-mile upper Meramec day near Steelville. MDC documents the route, and the Steelville USGS gauge is used as a conservative low-water check.",
      "accessCaveats": [
        "Scotts Ford is an MDC department area with posted 4 a.m. to 10 p.m. hours and local signs or area maps controlling exact use.",
        "Riverview is an MDC access with a concrete boat ramp and small parking lot; the final road segment is beyond state maintenance, so inspect it before leaving a vehicle.",
        "Coordinates are practical public paddling-location anchors paired with MDC access confirmation; follow on-site signs for exact ramp, parking, and closure conditions."
      ],
      "watchFor": [
        "Shallow riffles, dragging, and a slower day when the Steelville gauge is near or below the 343 cfs floor.",
        "High or rising water after rain, fresh wood, pushy bends, cloudy water, and harder landings at small access areas.",
        "Warm-weather crowding from private paddlers, outfitters, anglers, swimmers, and gravel-bar users in the Steelville-area corridor.",
        "Private land away from public accesses and lawful gravel-bar stops; do not assume banks are public picnic or camping areas."
      ]
    }
  },
  "meramec-river-onondaga-campbell-bridge": {
    "putIn": {
      "name": "Onondaga Cave State Park canoe launch / boat launch",
      "latitude": 38.059859,
      "longitude": -91.221584
    },
    "takeOut": {
      "name": "Campbell Bridge Access",
      "latitude": 38.08113567,
      "longitude": -91.14989519
    },
    "logistics": {
      "distanceLabel": "About 5 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr depending on level, stops, and weekend traffic",
      "shuttle": "Use a short two-car shuttle between Onondaga Cave State Park and MDC Campbell Bridge Access on Highway N. Check Onondaga Cave State Park status and inspect the Campbell Bridge landing before launching.",
      "permits": "No route-specific paddling permit is known. Follow Missouri State Parks rules at Onondaga Cave State Park, MDC rules at Campbell Bridge Access, and any posted launch, parking, hours, or temporary-closure signs.",
      "camping": "Onondaga Cave State Park has camping by reservation or park rules, but this river reach should be treated as a day float unless you have a separate legal overnight plan.",
      "summary": "Launch at the Onondaga Cave State Park Meramec River canoe launch or boat ramp and take out at MDC Campbell Bridge Access. MDC documents this as a five-mile canoe float, with the downstream Sullivan USGS gauge used as a conservative low-water check.",
      "accessCaveats": [
        "Missouri State Parks says the canoe launch is downstream from the Meramec River bridge and the boat ramp is upstream from the bridge; choose the signed launch that matches your craft and current park rules.",
        "Campbell Bridge is an MDC river access with a concrete boat ramp, dedicated canoe launch, restroom, and parking, but same-day signs and local conditions still control use.",
        "The Campbell Bridge coordinate is a practical public paddling-location anchor paired with MDC route and map evidence; verify the take-out from the road before launching."
      ],
      "watchFor": [
        "Shallow riffles and dragging when the Sullivan gauge falls near or below the 200 cfs floor.",
        "High water, fresh wood, bridge current, and faster bends after rain; MoHERP high and flood categories are not broad casual-float conditions.",
        "Bluff-lined bends, gravel bars, swimmers, anglers, rental traffic, and motorized users in the broader Sullivan-area Meramec corridor.",
        "Private land away from public accesses and legal gravel-bar stops; stay within Missouri stream-access rules and respect posted land."
      ]
    }
  },
  "meramec-river-campbell-bridge-sappington-bridge": {
    "putIn": {
      "name": "Campbell Bridge Access",
      "latitude": 38.08113567,
      "longitude": -91.14989519
    },
    "takeOut": {
      "name": "Sappington Bridge Access",
      "latitude": 38.157948,
      "longitude": -91.109295
    },
    "logistics": {
      "distanceLabel": "About 10 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr depending on level, stops, wind, and weekend traffic",
      "shuttle": "Use a two-car shuttle between MDC Campbell Bridge Access on Highway N and MDC Sappington Bridge Access near Sullivan. Inspect Sappington first because it is the mandatory public take-out before deciding whether the group has enough daylight for the full ten miles.",
      "permits": "No route-specific paddling permit is known. Follow MDC area rules at Campbell Bridge and Sappington Bridge, plus any posted launch, parking, hours, or temporary-closure signs.",
      "camping": "Treat this as a day float. No on-route legal campsite is assumed between Campbell Bridge and Sappington Bridge, and private banks should not be used without permission.",
      "summary": "Launch at MDC Campbell Bridge Access and take out at MDC Sappington Bridge Access for the middle Meramec link through Blue Springs Creek. MDC documents the access spacing as two five-mile legs, and the app uses the Sullivan USGS gauge at the take-out corridor as a conservative low-water check.",
      "accessCaveats": [
        "Campbell Bridge and Sappington Bridge are MDC river accesses with concrete ramps, dedicated canoe launches, restrooms, and parking, but same-day signs and local access conditions still control use.",
        "Blue Springs Creek is an intermediate route landmark, not a recommended take-out in this app route. Plan to continue to Sappington unless you have a separate legal access plan.",
        "Coordinates are practical public paddling-location anchors paired with MDC route and map evidence; verify both landings from the road before leaving vehicles."
      ],
      "watchFor": [
        "Shallow riffles and dragging when the Sullivan gauge falls near or below the 200 cfs floor.",
        "High water, fresh wood, bridge current, pushy bends, and harder landings after rain; MoHERP high and flood categories are not broad casual-float conditions.",
        "Ten-mile pacing, warm-weather crowds, anglers, swimmers, rental traffic, and occasional motorized users in the Sullivan-area Meramec corridor.",
        "Private land away from public accesses and legal gravel-bar stops; stay within Missouri stream-access rules and respect posted land."
      ]
    }
  },
  "meramec-river-sappington-bridge-meramec-state-park": {
    "putIn": {
      "name": "Sappington Bridge Access",
      "latitude": 38.157948,
      "longitude": -91.109295
    },
    "takeOut": {
      "name": "Meramec State Park River Stop Store / river launch",
      "latitude": 38.20379,
      "longitude": -91.099735
    },
    "logistics": {
      "distanceLabel": "About 5 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr depending on level and stops",
      "shuttle": "Use a short Sullivan-area two-car shuttle between MDC Sappington Bridge Access and the Meramec State Park River Stop Store launch area. Meramec State Park also operates rentals and shuttles seasonally, but confirm availability before relying on concession service.",
      "permits": "No route-specific paddling permit is known. Follow MDC area rules at Sappington Bridge, Missouri State Parks day-use and launch rules at Meramec State Park, and all posted parking or river-use signs.",
      "camping": "Meramec State Park has a campground at the take-out plus lodging options, but treat overnight use as a separate reservation or park-rule question rather than an assumed float-camp stop.",
      "summary": "Launch at MDC Sappington Bridge Access and take out at the Meramec State Park river launch near River Stop Store. This is a short, state-supported Meramec day float with a direct Sullivan gauge used as a conservative low-water check.",
      "accessCaveats": [
        "Sappington Bridge is an MDC river access with public boating and fishing access, but same-day signs and area rules still control parking, hours, and use.",
        "Meramec State Park has both a concrete boat launch and canoe launch near River Stop Store. Use the public launch area rather than campground-only gravel launches unless you are a camping patron.",
        "Coordinates are practical access anchors from public paddling/location records and Missouri State Parks River Stop Store context; follow on-site signs for the exact ramp or canoe-launch landing."
      ],
      "watchFor": [
        "Shallow riffles and dragging when the Sullivan gauge falls near or below the 200 cfs floor.",
        "High water, fresh wood, pushy bends, and harder landings after rain; MoHERP high and flood categories are not broad casual-float conditions.",
        "Busy summer weekend traffic from rentals, tubes, anglers, swimmers, and motorized users near state park access areas.",
        "Private land away from public accesses and legal gravel-bar stops; stay within Missouri stream-access rules and respect posted land."
      ]
    }
  },
  "meramec-river-state-park-sand-ford": {
    "putIn": {
      "name": "Meramec State Park River Stop Store / river launch",
      "latitude": 38.20379,
      "longitude": -91.099735
    },
    "takeOut": {
      "name": "Sand Ford Access",
      "latitude": 38.2527,
      "longitude": -91.0798
    },
    "logistics": {
      "distanceLabel": "About 7 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr depending on level, stops, and traffic",
      "shuttle": "Stage the take-out at MDC Sand Ford Access near Stanton, then drive back to the Meramec State Park river launch near River Stop Store. Confirm park hours, launch signs, and Sand Ford parking before leaving vehicles.",
      "permits": "No route-specific paddling permit is known. Follow Missouri State Parks day-use and launch rules at Meramec State Park, MDC area rules at Sand Ford Access, and all posted parking or river-use signs.",
      "camping": "Treat this as a day trip unless you have separate Meramec State Park reservations or another legal camping plan. Do not assume camping is allowed at Sand Ford Access or on private banks.",
      "summary": "Launch from the Meramec State Park public river launch near River Stop Store and take out downstream at MDC Sand Ford Access. This is a public-access Sullivan-area Meramec continuation with a direct Sullivan gauge used as a conservative low-water check.",
      "accessCaveats": [
        "Meramec State Park has a concrete boat launch and canoe launch near River Stop Store. Use the public launch area rather than campground-only gravel launches unless you are a camping patron.",
        "Sand Ford is an MDC river access with public boat and fishing access, but same-day signs and area rules still control parking, hours, and use.",
        "The mileage is an approximate access-to-access derivation from MDC planning material. Inspect both landings and leave enough daylight rather than treating the distance as a precise outfitter schedule."
      ],
      "watchFor": [
        "Shallow riffles and dragging when the Sullivan gauge falls near or below the 200 cfs floor.",
        "High water, fresh wood, pushy bends, and harder landings after rain; MoHERP high and flood categories are not broad casual-float conditions.",
        "Busy warm-season traffic from state park rentals, tubes, anglers, swimmers, Meramec Caverns-area users, and occasional motorized boats.",
        "Private land away from public accesses and legal gravel-bar stops; stay within Missouri stream-access rules and respect posted land."
      ]
    }
  },
  "bryant-creek-sycamore-warren-bridge": {
    "putIn": {
      "name": "Sycamore Access / Hodgson Mill",
      "latitude": 36.70778,
      "longitude": -92.26639
    },
    "takeOut": {
      "name": "Warren Bridge Access",
      "latitude": 36.6678,
      "longitude": -92.28198
    },
    "logistics": {
      "distanceLabel": "About 7 to 7.6 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr depending on level, stops, and shoal scraping",
      "shuttle": "Use a rural two-car or local outfitter shuttle between MDC Sycamore Access on Highway 181 and MDC Warren Bridge Access on County Road 328. Roads are narrow and remote, so look at the Warren Bridge take-out before launching.",
      "permits": "No route-specific paddling permit is known. Follow MDC area rules at Sycamore and Warren Bridge, respect posted access hours and signs, and do not leave watercraft unattended overnight.",
      "camping": "Treat this as a day trip. MDC area rules prohibit camping at Warren Bridge, and no on-route legal campsite is assumed for this short Bryant Creek run.",
      "summary": "Launch at MDC Sycamore Access just downstream of the Highway 181 bridge by Hodgson Mill and take out at MDC Warren Bridge Access. This is the standard upper-to-middle Bryant Creek day float, with a direct Tecumseh gauge used as a conservative low-water check.",
      "accessCaveats": [
        "Sycamore Access is the public MDC launch; nearby Hodgson Water Mill is private, so use the access area and posted signs rather than mill property.",
        "Warren Bridge Access is currently listed by MDC as fishing and floating access, but older flood-damage reporting described rough or closed conditions there. Scout the take-out before committing and obey any current closures or signs.",
        "Put-in coordinates are anchored to the adjacent Hodgson-Aid Mill / Highway 181 crossing context because MDC describes Sycamore Access by its position below that bridge; use on-site signage for the exact gravel launch."
      ],
      "watchFor": [
        "Shallow shoals, gravel scraping, and slower travel when the Tecumseh gauge falls near or below the 300 cfs floor.",
        "Swift narrow-channel current, tight bends, limestone bluffs, low-water bridge areas, and possible strainers or fresh wood after storms.",
        "Loose gravel, deep sand, changed banks, and limited recovery options at access roads after floods or high-water events.",
        "Private property along Bryant Creek away from public access points and lawful gravel-bar stops."
      ]
    }
  },
  "bryant-creek-warren-flo-cook": {
    "putIn": {
      "name": "Warren Bridge Access",
      "latitude": 36.6674,
      "longitude": -92.2817
    },
    "takeOut": {
      "name": "Flo Cook Access",
      "latitude": 36.6081,
      "longitude": -92.3063
    },
    "logistics": {
      "distanceLabel": "About 6.7 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr depending on level, shoals, and the final take-out walk",
      "shuttle": "Use a rural two-car shuttle between MDC Warren Bridge Access on County Road 328 and MDC Flo Cook Access on County Road 308 off Highway 160. Look at Flo Cook before launching because the landing is unimproved and easier to miss than a standard concrete ramp.",
      "permits": "No route-specific paddling permit is known. Follow MDC area rules, posted access hours and signs at Warren Bridge and Flo Cook, and do not leave watercraft or commercial vehicles on department areas during closed hours except where launching and landing rules allow it.",
      "camping": "Treat this as a day trip. Do not assume legal camping at either small MDC access or on private banks near the North Fork junction and Norfork Lake backwater.",
      "summary": "Launch at MDC Warren Bridge Access and take out at MDC Flo Cook Access for the lower Bryant day segment just upstream of the North Fork and Norfork Lake. Use the direct Tecumseh gauge as a conservative low-water check, and do not drift past Flo Cook unless you have a separate North Fork / lake plan.",
      "accessCaveats": [
        "Warren Bridge Access is a current MDC fishing and floating access, but the lower Bryant still deserves a same-day scout because flood changes and gravel-bank shifts have affected this corridor before.",
        "Flo Cook Access is current MDC public access, but the landing remains an unimproved dirt/no-ramp take-out with limited parking and a short walk to the water. Do not expect a standard concrete launch.",
        "If you miss Flo Cook, Bryant Creek reaches the North Fork junction and Norfork Lake context quickly. Treat Flo Cook as the intended last Bryant Creek take-out for this route, not Tecumseh or a lake-shore improvisation."
      ],
      "watchFor": [
        "Shallow shoals, scraping, and slower travel when the Tecumseh gauge is near or below the 300 cfs conservative floor.",
        "Swift narrow-channel current, blind bends, fresh wood after storms, and a shorter reaction window than broad pool-and-drop rivers give you.",
        "The final riffle and approach into Flo Cook, especially if low water exposes more bank walking or if the lake-influenced lower water slows the finish.",
        "Private property away from the two MDC accesses and confusion around the downstream North Fork / Norfork Lake access family."
      ]
    }
  },
  "beaver-creek-brownbranch-bradleyville": {
    "putIn": {
      "name": "Beaver Creek Campground / Brownbranch",
      "latitude": 36.79540057,
      "longitude": -92.83080082
    },
    "takeOut": {
      "name": "Highway 76 Bridge at Bradleyville",
      "latitude": 36.77963889,
      "longitude": -92.90727778
    },
    "logistics": {
      "distanceLabel": "About 7.9 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, portages, wood, or slow fishing stops",
      "shuttle": "Use a rural two-car or campground-supported shuttle between Beaver Creek Campground in Brownbranch and the Highway 76 bridge area in Bradleyville. Inspect the Bradleyville take-out before launching because flood changes, gravel, private drives, and bridge-area access can make the landing less obvious than the route name suggests.",
      "permits": "No route-specific paddling permit is known. Budget for the campground access or parking fee at Brownbranch, follow campground rules, obey posted signs at the Highway 76 bridge area, and follow Missouri boating and fishing rules.",
      "camping": "Beaver Creek Campground is at the put-in, so this can work as endpoint campground staging if you separately reserve or arrange camping. Do not assume private banks or bridge approaches are legal campsites.",
      "summary": "Launch at Beaver Creek Campground in Brownbranch and take out at the Highway 76 bridge area in Bradleyville for a 7.9-mile Beaver Creek day. Use the Bradleyville USGS gauge with MoHERP bands, and skip the route when the gauge is high, rising, or below the low-water floor.",
      "accessCaveats": [
        "Brownbranch is a private fee-access campground, not an MDC area. Confirm current access fees, parking, shuttle options, and launch conditions before counting on it.",
        "MDC currently describes the Highway 76 bridge in Bradleyville as a launch option, but MoHERP trip notes flag post-flood degradation and past confusion around MO 76 access. Scout the take-out first and obey any posted private-property limits.",
        "The Bradleyville coordinate is anchored to the USGS gauge / Highway 76 bridge corridor rather than a separate managed-ramp coordinate. Use it for navigation to the take-out corridor, then follow current on-site access conditions."
      ],
      "watchFor": [
        "Dragging, wading, slick riffles, and long shallow sections when the Bradleyville gauge is near or below 100 cfs.",
        "High or rising water above the MoHERP high-water line, when this narrow creek can become pushy, muddy, and debris-prone.",
        "Strainers, flood-deposited trees, braided gravel channels, and possible portages, especially after recent high water.",
        "The final riffle into Bradleyville, bridge approaches, gravel-mining disturbance near the lower reach, and tight landing options.",
        "Private land away from the fee campground, public bridge area, and lawful gravel-bar stops."
      ]
    }
  },
  "big-piney-river-east-gate-bookers-bend": {
    "putIn": {
      "name": "East Gate Access",
      "latitude": 37.764515,
      "longitude": -92.058539
    },
    "takeOut": {
      "name": "Bookers Bend Access",
      "latitude": 37.80746153,
      "longitude": -92.0702596
    },
    "logistics": {
      "distanceLabel": "11 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, dragging, wind, or stops",
      "shuttle": "Use a rural two-car shuttle between East Gate Access and Bookers Bend Access. Both Forest Service sites have small gravel launches and limited parking, so inspect Bookers Bend before launching and avoid blocking the short ramp area.",
      "permits": "No route-specific paddling permit or Forest Service day-use fee is listed for these accesses. Follow Mark Twain National Forest site rules, Missouri boating laws, posted signs, no-glass/no-polystyrene rules, leash rules, and current access hours.",
      "camping": "Treat this as a day trip. East Gate lists no camping, and Bookers Bend says no overnight camping in day-use areas; Slabtown is a nearby campground/base-camp option only if you separately confirm legal camping.",
      "summary": "Launch at Forest Service East Gate Access and take out at Forest Service Bookers Bend Access for the official 11-mile Big Piney day float. Use the Big Piney USGS gauge as a same-river level check, but keep the decision conservative because the level model is community-calibrated.",
      "accessCaveats": [
        "East Gate and Bookers Bend are small Forest Service gravel boat/canoe accesses with limited parking for about three vehicles with trailers.",
        "Bookers Bend has no restroom or potable water. East Gate also lists no restroom or potable water.",
        "Most land along the lower Big Piney corridor is private. Stay with public accesses and clearly legal gravel-bar stops rather than climbing banks or using private land.",
        "The Forest Service notes that there are no outfitters authorized to operate at these locations, so private shuttle logistics need to be settled before launch."
      ],
      "watchFor": [
        "Shallow riffles, dragging, and a slower 11-mile day when the Big Piney gauge is below the MoHERP low-water floor.",
        "Runs, riffles, pools, gravel-bottom shoals, and occasional murky water after rain.",
        "Rapid rises after storms, fresh wood, harder landings, and no defended high-water cutoff in the current model.",
        "Small gravel ramps, limited parking, motorized users, fishing traffic, and private shorelines between the accesses."
      ]
    }
  },
  "big-piney-river-sandy-shoals-boiling-spring": {
    "putIn": {
      "name": "Sandy Shoals Ford access",
      "latitude": 37.4108792,
      "longitude": -91.9501555
    },
    "takeOut": {
      "name": "Boiling Spring Access",
      "latitude": 37.4594894,
      "longitude": -91.9893237
    },
    "logistics": {
      "distanceLabel": "Just over 6 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low water, dragging, fishing, or stops",
      "shuttle": "Use a two-car shuttle between Sandy Shoals Ford and MDC Boiling Spring Access. Inspect the Boiling Spring take-out first, because the saved coordinate is a practical spring/access anchor and paddlers should follow the posted MDC ramp and parking layout on arrival.",
      "permits": "No route-specific paddling permit is known. Follow Missouri boating laws, posted MDC area rules at Boiling Spring Access, no-glass/no-polystyrene rules, vehicle hours, and any current signs at Sandy Shoals Ford.",
      "camping": "Treat this as a day trip. MDC lists camping as prohibited at Boiling Spring Access, and private land borders parts of the corridor; no route camping is indicated unless you separately confirm legal camping.",
      "summary": "Launch at Sandy Shoals Ford access and take out at MDC Boiling Spring Access for the MDC-described quick Big Piney day float. Use the Big Piney USGS gauge as a same-river level check, but keep the decision conservative because the level model is community-calibrated.",
      "accessCaveats": [
        "MDC names Sandy Shoals Ford access as the put-in for this day trip, but the coordinate is anchored from topo/GeoNames-style ford mapping rather than an MDC-published latitude and longitude.",
        "Boiling Spring Access is an MDC public area with a boat ramp, picnic area, privy, parking, and disabled-accessible features shown on the area map.",
        "Camping is prohibited at Boiling Spring Access, and vehicle use is limited to roads and established parking areas unless posted otherwise.",
        "Private land borders portions of the Big Piney corridor. Stay with the public access, lawful gravel-bar stops, and posted rules rather than climbing banks or using private land."
      ],
      "watchFor": [
        "Shallow riffles, dragging, and slower travel when the Big Piney gauge is below the MoHERP low-water floor.",
        "Mostly Class I Ozark floating water, with MDC noting occasional Class II sections on the Big Piney after a good rain.",
        "Rapid rises after storms, murky water, fresh wood, and harder landings. The current model has no defended high-water cutoff.",
        "Ford-area access judgment at the put-in, ramp traffic at Boiling Spring, fishing traffic, and limited cell service."
      ]
    }
  },
  "big-piney-river-boiling-spring-mason-bridge": {
    "putIn": {
      "name": "Boiling Spring Access",
      "latitude": 37.4594894,
      "longitude": -91.9893237
    },
    "takeOut": {
      "name": "Mason Bridge Access",
      "latitude": 37.50581,
      "longitude": -91.98319
    },
    "logistics": {
      "distanceLabel": "About 6 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low water, fishing, or stops",
      "shuttle": "Use a two-car shuttle between MDC Boiling Spring Access and Mason Bridge Access. Inspect Mason Bridge first because the saved coordinate is an OSM-derived ramp anchor paired with MDC map confirmation, not an MDC-published latitude and longitude.",
      "permits": "No route-specific paddling permit is known. Follow Missouri boating laws, posted MDC area rules, no-glass/no-polystyrene rules, access hours, and current signs at both access areas.",
      "camping": "Treat this as a day trip. MDC lists camping as prohibited at Boiling Spring Access; do not assume on-route camping without separately confirmed legal access.",
      "summary": "Launch at MDC Boiling Spring Access and take out at Mason Bridge Access for the MDC-described six-mile Big Piney day float. Use the Big Piney USGS gauge as a same-river level check, but keep the decision conservative because the level model is community-calibrated.",
      "accessCaveats": [
        "Boiling Spring Access is an MDC public area with a boat ramp, picnic area, privy, parking, and disabled-accessible features shown on the area map.",
        "MDC map material confirms Mason Bridge Access has a parking lot and boat ramp, but the coordinate is sourced from Mapcarta / OpenStreetMap rather than an MDC coordinate feed.",
        "Camping is prohibited at Boiling Spring Access, and vehicle use is limited to roads and established parking areas unless posted otherwise.",
        "Private land borders portions of the Big Piney corridor. Stay with public accesses, lawful gravel-bar stops, and posted rules rather than climbing banks or using private land."
      ],
      "watchFor": [
        "Shallow riffles, dragging, and slow pools when the Big Piney gauge is below the MoHERP low-water floor.",
        "Mostly Class I Ozark floating water, with higher-water push and occasional Class II-style current after rain.",
        "Rapid rises after storms, murky water, fresh wood, and harder landings. The current model has no defended high-water cutoff.",
        "Ramp and gravel-bar congestion at Boiling Spring, Mason Bridge parking limits, fishing traffic, and limited cell service."
      ]
    }
  },
  "big-piney-river-mason-bridge-slabtown": {
    "putIn": {
      "name": "Mason Bridge Access",
      "latitude": 37.50581,
      "longitude": -91.98319
    },
    "takeOut": {
      "name": "Slabtown Recreation Area",
      "latitude": 37.561549,
      "longitude": -92.03214279
    },
    "logistics": {
      "distanceLabel": "About 9 to 9.5 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, fishing, wind, or stops",
      "shuttle": "Use a rural two-car shuttle between MDC Mason Bridge Access and Forest Service Slabtown Recreation Area. Stage and inspect Slabtown first because parking is limited and the gravel launch can be shallow from gravel build-up.",
      "permits": "No route-specific paddling permit is known. Follow Missouri boating laws, posted MDC area rules at Mason Bridge, Mark Twain National Forest rules at Slabtown, no-glass/no-polystyrene rules, day-use hours, and current signs at both access areas.",
      "camping": "Slabtown has Forest Service tent-camping sites at the take-out, so this can work as endpoint campground staging if availability, day-use hours, fire rules, and posted restrictions support your plan.",
      "summary": "Launch at MDC Mason Bridge Access and take out at Forest Service Slabtown Recreation Area for the next Big Piney link below Mason Bridge. Use the Big Piney USGS gauge as a same-river level check, but keep the decision conservative because the level model is community-calibrated.",
      "accessCaveats": [
        "MDC map material confirms Mason Bridge Access has a parking lot and boat ramp, but the coordinate is sourced from Mapcarta / OpenStreetMap rather than an MDC coordinate feed.",
        "Slabtown is a Forest Service access and camping area with a single-lane launch, limited boat-launch parking, vault toilet, picnic tables, and no potable water.",
        "The Forest Service warns the bottom of the Slabtown ramp can be shallow from gravel build-up and that the river at the launch can be swift moving.",
        "Private land borders portions of the Big Piney corridor. Stay with public accesses, lawful gravel-bar stops, and posted rules rather than climbing banks or using private land."
      ],
      "watchFor": [
        "Shallow riffles, dragging, and slow pools when the Big Piney gauge is below the MoHERP low-water floor.",
        "Mostly Class I Ozark floating water, but the longer mileage, remote roads, and limited take-out parking make pacing matter.",
        "Rapid rises after storms, murky water, fresh wood, swift launch current, and harder landings. The current model has no defended high-water cutoff.",
        "Gravel build-up at the Slabtown ramp, fishing traffic, limited cell service, no potable water, and campground/day-use conflicts at the take-out."
      ]
    }
  },
  "big-piney-river-slabtown-ross": {
    "putIn": {
      "name": "Slabtown Recreation Area",
      "latitude": 37.561549,
      "longitude": -92.03214279
    },
    "takeOut": {
      "name": "Ross Access",
      "latitude": 37.66414,
      "longitude": -92.05157
    },
    "logistics": {
      "distanceLabel": "About 15.5 to 17 mi",
      "estimatedPaddleTime": "Long day or light overnight; allow 7 hr to 10 hr depending on level, load, stops, fishing, and wind",
      "shuttle": "Use a rural two-car shuttle between Forest Service Slabtown Recreation Area and MDC Ross Access. Stage Ross first, then inspect the Slabtown launch before leaving a vehicle because both endpoints are small access areas with limited services.",
      "permits": "No route-specific paddling permit is known. Follow Mark Twain National Forest rules at Slabtown, MDC area rules at Ross Access, Missouri boating laws, no-glass/no-polystyrene rules, day-use hours, and all posted signs.",
      "camping": "Treat this as a long day unless you have a legal overnight plan. Slabtown has three Forest Service tent sites, and the MoHERP exact route row was recorded as a two-day sandbar trip, but private land and manager rules still control where you can camp or stop.",
      "summary": "Launch at Forest Service Slabtown Recreation Area and take out at MDC Ross Access for a long lower Big Piney link. The route uses the Big Piney USGS gauge with a conservative low-water floor, but the mileage and shallow riffles make same-day judgment important.",
      "accessCaveats": [
        "Slabtown is a Forest Service access and camping area with a single-lane launch, limited boat-launch parking, vault toilet, picnic tables, and no potable water.",
        "The Forest Service warns the bottom of the Slabtown ramp can be shallow from gravel build-up and that the river at the launch can be swift moving.",
        "MDC confirms Ross Access as public floating and fishing access with parking, but the coordinate is an OSM-derived slipway anchor paired with MDC access authority rather than an MDC survey coordinate.",
        "Private land borders portions of the Big Piney corridor. Stay with public accesses, lawful gravel-bar stops, and posted rules rather than climbing banks or using private land."
      ],
      "watchFor": [
        "Long mileage and reduced daylight margin; low flows can turn the route into a very slow trip with dragging and portages.",
        "Narrower, shallower, riffly water between Slabtown and Ross, with long pools and limited public bailout options.",
        "Rapid rises after storms, murky water, fresh wood, strainers, swift launch current, and more difficult landings. The current model has no defended high-water cutoff.",
        "Limited services, limited cell coverage, rural shuttle roads, fishing traffic, and legal-camping boundaries if the group turns this into an overnight."
      ]
    }
  },
  "big-piney-river-dogs-bluff-mineral-springs": {
    "putIn": {
      "name": "Dogs Bluff Access",
      "latitude": 37.327222,
      "longitude": -92.001944
    },
    "takeOut": {
      "name": "Mineral Springs Access",
      "latitude": 37.36307014,
      "longitude": -91.96981655
    },
    "logistics": {
      "distanceLabel": "About 4.9 to 6 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr depending on level, stops, and wood",
      "shuttle": "Use a short Houston-area two-car shuttle between MDC Dogs Bluff Access off Highway 17 and MDC Mineral Springs Access off Mineral Drive. Stage Mineral Springs first, then inspect Dogs Bluff before leaving a vehicle because both landings are small river-access areas.",
      "permits": "No route-specific paddling permit is known. Follow MDC area rules, posted signs, Missouri boating laws, day-use restrictions, and boat-use rules at Dogs Bluff and Mineral Springs.",
      "camping": "Treat this as a short day float. Do not plan to camp at either MDC access unless current area rules and posted signs specifically allow your use.",
      "summary": "Launch at MDC Dogs Bluff Access and take out at MDC Mineral Springs Access for a short upper Big Piney day near Houston. Use the Big Piney USGS gauge as a conservative low-water check, then make a same-day call for shallow riffles, wood, and rising water.",
      "accessCaveats": [
        "Dogs Bluff is an MDC public access with a boat ramp, picnic area, privy, and directions from Houston, but posted signs and area maps control exact use.",
        "Mineral Springs is an MDC public access with a boat ramp and parking, but same-day ramp, road, and crowding conditions still matter.",
        "The endpoint coordinates are practical access anchors from public location records paired with MDC access authority, not survey-grade ramp points. Follow on-site signs and the current ramp layout on arrival.",
        "Private land borders portions of the Big Piney corridor. Stay with public accesses, lawful gravel-bar stops, and posted rules rather than climbing banks or using private land."
      ],
      "watchFor": [
        "Dragging, shallow riffles, and slower pools when the Big Piney gauge is near or below the 309 cfs floor.",
        "High or rising water after rain. MoHERP has an exact Dogs Bluff-to-Mineral Springs row marked High at 1,840 cfs, but Paddle Today does not claim a defended high-water cutoff.",
        "Fresh wood, strainers, root wads, gravel-bar turns, rural shuttle roads, anglers, and limited services at the accesses.",
        "Private banks away from public accesses and lawful gravel-bar stops; do not assume banks are public picnic or camping areas."
      ]
    }
  },
  "james-river-joe-crighton-lake-springfield": {
    "putIn": {
      "name": "Joe Crighton Access",
      "latitude": 37.1557274593,
      "longitude": -93.1993452603
    },
    "takeOut": {
      "name": "Lake Springfield Boathouse",
      "latitude": 37.1159741,
      "longitude": -93.2517345
    },
    "logistics": {
      "distanceLabel": "About 4.5 to 6 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr depending on level, wind, and how much lakewater you paddle",
      "shuttle": "Use a short Springfield-area two-car shuttle between Joe Crighton Access and Lake Springfield Boathouse. Stage the boathouse take-out first, then drive back through the Kissick Avenue / Farm Road 166 corridor to Joe Crighton.",
      "permits": "No route-specific paddling permit is known. Follow MDC and Park Board day-use rules, posted signs, Missouri boating laws, and any same-day rental or event operations at Lake Springfield Park.",
      "camping": "Do not plan to camp at either endpoint. Joe Crighton is a day-use MDC access, and the Lake Springfield Boathouse finish is a public park shoreline facility rather than an overnight river access.",
      "summary": "Launch at Joe Crighton Access and take out at Lake Springfield Boathouse for a Springfield-area James River Water Trail float that finishes in Lake Springfield. Use the Springfield gauge as a conservative low-water check only; the app does not claim a defended high-water ceiling.",
      "accessCaveats": [
        "Joe Crighton is an MDC public day-use access with river stairs and parking, but same-day signs and shoreline layout still control.",
        "The official Park Board trail map separates the Boathouse from the separate Boat Launch. This route ends at the boathouse shoreline/facility area rather than the downstream boat-launch ramp.",
        "Lake Springfield Boathouse is a public park facility with accessible parking, rentals, restrooms, and trailheads, but same-day events, shoreline conditions, and park traffic still matter at the take-out.",
        "Source mileage varies between about 4.5 and 6 miles depending on how the route is measured through the lake finish, so expect a modestly variable distance rather than a survey-grade mile count."
      ],
      "watchFor": [
        "Very low or stagnant conditions near or below the 40 cfs floor, with mud, bugs, and slow pools before the lake.",
        "High or rising water after rain. MoHERP currently rates 1,140 cfs High and 1,400 cfs Flood on the Springfield gauge, but Paddle Today does not publish a defended high-water cutoff for this route.",
        "Fallen wood, tight bends, bridge current, murky urban runoff, anglers near road crossings, and private banks away from public accesses.",
        "Wind and open-water chop once you reach Lake Springfield, especially if you finish during afternoon boat traffic or storm outflow."
      ]
    }
  },
  "james-river-delaware-town-shelvin-rock": {
    "putIn": {
      "name": "Delaware Town Access",
      "latitude": 37.0511,
      "longitude": -93.3914
    },
    "takeOut": {
      "name": "Shelvin Rock Access",
      "latitude": 36.99564609,
      "longitude": -93.3697183
    },
    "logistics": {
      "distanceLabel": "About 6.5 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr depending on level, stops, and wind",
      "shuttle": "Use a short two-car shuttle between MDC Delaware Town Access and MDC Shelvin Rock Access. Stage the Shelvin Rock take-out first, then drive back through the Highway 14 / Route M corridor to Delaware Town.",
      "permits": "No route-specific paddling permit is known. Follow MDC area rules, posted signs, day-use restrictions, and boat-use rules at Delaware Town and Shelvin Rock.",
      "camping": "Do not plan to camp at either endpoint. MDC lists both Delaware Town and Shelvin Rock as day-use access areas, and camping is not allowed on those areas.",
      "summary": "Launch at MDC Delaware Town Access and take out at MDC Shelvin Rock Access for a 6.5-mile middle-James day float. Use the Boaz gauge as a conservative low-water check, and make a same-day visual call because the scoring model has no defended high-water cutoff.",
      "accessCaveats": [
        "Delaware Town and Shelvin Rock are MDC public day-use accesses with boat ramps and parking, but posted signs and area maps control exact use.",
        "Both endpoints prohibit camping, and MDC rules prohibit leaving boats unattended overnight on department areas.",
        "The Delaware Town coordinate is a practical access anchor from a public paddling directory paired with MDC access confirmation; follow MDC signs and the current ramp layout on arrival."
      ],
      "watchFor": [
        "Dragging, slow pools, and shallow riffles when the Boaz gauge is near or below the 275 cfs floor.",
        "Two ledge-rock drops noted in route evidence; scout or walk if the level, load, or group skill makes them questionable.",
        "High or rising water after rain, cloudy water, fresh wood, strainers on bends, and more difficult landings.",
        "Private land away from public accesses and lawful gravel-bar stops; do not assume banks are public picnic or camping areas."
      ]
    }
  },
  "james-river-shelvin-rock-hooten-town": {
    "putIn": {
      "name": "Shelvin Rock Access",
      "latitude": 36.99564609,
      "longitude": -93.3697183
    },
    "takeOut": {
      "name": "Hooten Town Access",
      "latitude": 36.939901,
      "longitude": -93.386162
    },
    "logistics": {
      "distanceLabel": "About 6.2 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr depending on level, stops, and boat traffic",
      "shuttle": "Use a short two-car or local outfitter shuttle between MDC Shelvin Rock Access and MDC Hooten Town Access. Stage the Hooten Town take-out first, because warm-weather weekends can bring heavy river traffic and busy parking.",
      "permits": "No route-specific paddling permit is known. Follow MDC area rules, posted signs, day-use restrictions, and boat-use rules at Shelvin Rock and Hooten Town.",
      "camping": "Do not plan to camp at either endpoint. MDC lists both Shelvin Rock and Hooten Town as day-use access areas, and camping is not allowed on those areas.",
      "summary": "Launch at MDC Shelvin Rock Access and take out at MDC Hooten Town Access for the 6.2-mile lower James segment tracked by Rivers.MOHERP. Use the Galena gauge as a conservative low-water check rather than a full preferred-range recommendation.",
      "accessCaveats": [
        "Shelvin Rock and Hooten Town are MDC public day-use accesses with boat ramps and parking, but posted signs and area maps control exact use.",
        "Both endpoints prohibit camping, and MDC rules prohibit leaving boats unattended overnight on department areas.",
        "Coordinates are practical access anchors from public paddling/location records paired with MDC access confirmation; follow on-site signs for the exact ramp and parking layout."
      ],
      "watchFor": [
        "Dragging, slow pools, and shallow riffles when the Galena gauge is near or below the 200 cfs floor.",
        "High or rising water after rain, fresh wood, strainers on bends, cloudy water, and more difficult landings.",
        "Busy summer boat, tube, rental, swimming, and angling traffic around Shelvin Rock, Hooten Town, and downstream James River Outfitters corridors.",
        "Private land away from public accesses and lawful gravel-bar stops; do not assume banks are public picnic or camping areas."
      ]
    }
  },
  "james-river-hl-kerr-ralph-cox": {
    "putIn": {
      "name": "H.L. Kerr Access",
      "latitude": 36.832233,
      "longitude": -93.446571
    },
    "takeOut": {
      "name": "Ralph Cox Memorial Access",
      "latitude": 36.8069331518,
      "longitude": -93.4617516103
    },
    "logistics": {
      "distanceLabel": "About 4.8 to 5.5 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr depending on level, stops, and boat traffic",
      "shuttle": "Use a short Galena-area two-car or local outfitter shuttle between MDC H.L. Kerr Access and MDC Ralph Cox Memorial Access. Stage the Cox take-out first, because the access is close to town and can be busy on warm weekends.",
      "permits": "No route-specific paddling permit is known. Follow MDC area rules, posted signs, day-use restrictions, and boat-use rules at H.L. Kerr and Ralph Cox Memorial Access.",
      "camping": "Do not plan to camp at either endpoint. MDC lists both H.L. Kerr and Ralph Cox Memorial as day-use access areas, and camping is not allowed on those areas.",
      "summary": "Launch at MDC H.L. Kerr Access and take out at MDC Ralph Cox Memorial Access near Galena for a short lower-James float. Use the Galena gauge as a conservative low-water check rather than a full preferred-range recommendation.",
      "accessCaveats": [
        "H.L. Kerr and Ralph Cox Memorial are MDC public day-use accesses with boat ramps and parking, but posted signs and area maps control exact use.",
        "Both endpoints prohibit camping, and MDC rules prohibit leaving boats unattended overnight on department areas.",
        "Coordinates are practical access anchors from public paddling/location records paired with MDC access confirmation; follow on-site signs for the exact ramp and parking layout."
      ],
      "watchFor": [
        "Dragging, slow pools, and shallow riffles when the Galena gauge is near or below the 200 cfs floor.",
        "High or rising water after rain, fresh wood, strainers on bends, cloudy water, and more difficult landings.",
        "Busy summer boat, tube, rental, swimming, and angling traffic around Galena, the Y-Bridge, and local outfitter corridors.",
        "Private land away from public accesses and lawful gravel-bar stops; do not assume banks are public picnic or camping areas."
      ]
    }
  },
  "jacks-fork-river-bay-creek-alley-spring": {
    "putIn": {
      "name": "Bay Creek River Access / Backcountry Campground",
      "latitude": 37.1231,
      "longitude": -91.5018
    },
    "takeOut": {
      "name": "Alley Spring River Access",
      "latitude": 37.1484,
      "longitude": -91.4499
    },
    "logistics": {
      "distanceLabel": "About 5.8 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr, longer with low water, poling, scouting, or high-water caution",
      "shuttle": "Use a rural two-car shuttle between Bay Creek and Alley Spring. Stage the Alley Spring take-out first, then drive west on Highway 106 and County Road 106-425 to Bay Creek. The Bay Creek road is gravel and remote; inspect the access before leaving a vehicle.",
      "permits": "No private-vessel route permit is known. Follow Ozark National Scenic Riverways rules, NPS closure notices, no-glass/no-polystyrene rules, fishing regulations, posted campground/access rules, and any current parking or launch signs.",
      "camping": "Treat this as a day trip unless you have a separate NPS backcountry campsite reservation. Bay Creek is a reservable backcountry campground, and NPS rules and current availability control any overnight plan.",
      "summary": "Launch at Bay Creek and take out at Alley Spring for the NPS-listed upper Jacks Fork day float. Use the Alley Spring USGS gauge as a direct low-water check, but keep the decision conservative because this reach is shallow above the spring and can get pushy after rain.",
      "accessCaveats": [
        "Bay Creek is a remote NPS backcountry campground/access reached by about two miles of gravel road from Highway 106; low-clearance vehicles and wet roads can complicate the shuttle.",
        "Alley Spring is a busy NPS access area with campground, visitor, swimming, hiking, and paddling traffic; inspect the landing and parking before launching upstream.",
        "Endpoint coordinates are USGS-topo-derived access anchors rather than an NPS ramp-coordinate table. Follow park signs, posted closures, and the current access layout on arrival.",
        "Only use designated access points and lawful gravel-bar stops. Private lands and scenic-easement boundaries in the Riverways corridor still matter."
      ],
      "watchFor": [
        "Frequent dragging, poling, or lining when the Alley Spring gauge is below the 100 cfs floor.",
        "Wide, shallow riffles in the few miles above Alley Spring, plus slick shelf rock, gravel bars, and occasional wood.",
        "High or rising water after storms. MoHERP currently treats high/flood Alley Spring readings as unsuitable for casual or inexperienced trips.",
        "Cold spring water near the take-out, limited cell service, remote-road shuttle logistics, and busy summer access traffic."
      ]
    }
  },
  "jacks-fork-river-bay-creek-chilton": {
    "putIn": {
      "name": "Bay Creek River Access / Backcountry Campground",
      "latitude": 37.1231,
      "longitude": -91.5018
    },
    "takeOut": {
      "name": "Joshua T. Chilton Memorial Landing / Eminence",
      "latitude": 37.152717,
      "longitude": -91.353486
    },
    "logistics": {
      "distanceLabel": "About 12.1 mi by current NPS segment totals",
      "estimatedPaddleTime": "About 5 hr to 8 hr depending on level, stops, and low-water dragging above Alley Spring",
      "shuttle": "Stage the take-out at Joshua T. Chilton Memorial Landing in Eminence, then drive west on Highway 106 and County Road 106-425 to Bay Creek. Inspect Bay Creek first because the gravel road, remote campground layout, and weather can add friction before an already longer day.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, MDC/cooperative-area rules at Joshua T. Chilton, no-glass/no-polystyrene rules, and any current park closures, alerts, or advisories.",
      "camping": "Bay Creek is a reservable backcountry campground, but treat this app route as a day float unless you have a separate legal overnight plan and current NPS reservation. Do not assume private banks or informal gravel bars are available.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Bay Creek and take out at Joshua T. Chilton Memorial Landing in Eminence for the continuation that links the upper Bay Creek float into the classic lower Jacks finish. Use the direct Eminence gauge conservatively and expect the route to feel scrape-prone when the gauge is near or below the 200 cfs floor.",
      "accessCaveats": [
        "Bay Creek is a remote NPS backcountry campground/access reached by gravel road from Highway 106, while Joshua T. Chilton is an MDC-listed cooperative landing in the Eminence town corridor. Inspect both endpoints before launching.",
        "The route passes through the developed Alley Spring area before continuing to Eminence. Stay with the signed public accesses and lawful river corridor rather than using private banks near town.",
        "Endpoint coordinates are carried from the adjacent implemented Bay Creek and Joshua T. Chilton routes rather than an NPS coordinate table. Follow current signs, posted closures, and the actual landing layout on arrival.",
        "The current park alerts feed showed no live closure naming Bay Creek, Alley Spring, or Joshua T. Chilton on the review date, but same-day alert and road-condition checks still matter before you leave vehicles."
      ],
      "watchFor": [
        "Dragging and shallow riffles when the Eminence gauge is below the 200 cfs conservative floor, especially on the upper Bay-Creek-to-Alley part of the day.",
        "Fast riffles, wood, strainers, and limited easy exits above Alley Spring, followed by heavier canoe, tube, and motorboat traffic into Eminence.",
        "High or rising water after storms, cold spring water near Alley Spring, fishing lines, swimmers, and crowded landings in peak season.",
        "Private banks near Eminence and long-day fatigue if you start the route in marginal water or too late in the day."
      ]
    }
  },
  "jacks-fork-river-highway-17-chilton": {
    "putIn": {
      "name": "Buck Hollow / Highway 17 Bridge Access",
      "latitude": 37.057183,
      "longitude": -91.664061
    },
    "takeOut": {
      "name": "Joshua T. Chilton Memorial Landing / Eminence",
      "latitude": 37.152717,
      "longitude": -91.353486
    },
    "logistics": {
      "distanceLabel": "About 30.3 mi by current NPS segment totals",
      "estimatedPaddleTime": "About 13 hr to 20 hr depending on level, stops, and low-water dragging above Alley Spring",
      "shuttle": "Stage the take-out at Joshua T. Chilton Memorial Landing in Eminence, then drive to Buck Hollow on Highway 17. This is the longest current Jacks Fork continuation in the app, so inspect both endpoints, shuttle timing, and weather before committing.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, MDC/cooperative-area rules at Joshua T. Chilton, no-glass/no-polystyrene rules, and any current park closures, alerts, or advisories.",
      "camping": "Blue Spring, Rymers, and Bay Creek all have primitive camping context and Alley Spring has developed campground context, but treat this route as an overnighter or exceptional long day only if you have checked current NPS rules and made a separate legal overnight plan.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Buck Hollow and take out at Joshua T. Chilton Memorial Landing in Eminence for the full Buck-Hollow-to-town continuation. Use the direct Eminence gauge conservatively and treat below-floor readings as a reason to shorten or break up the trip, not force the whole route.",
      "accessCaveats": [
        "Buck Hollow, Blue Spring, Rymers, Bay Creek, Alley Spring, and Joshua T. Chilton are all named public accesses, but the coordinates used here are practical access anchors rather than one official coordinate table. Follow signed access roads and current landing layouts on arrival.",
        "Buck Hollow is the Highway 17 bridge access north of Mountain View. Do not confuse it with the upstream Prongs / Highway Y section, which is a separate and even more seasonal reach.",
        "This route passes from remote upper-river gravel roads into the developed Alley Spring area and finally the Eminence town corridor. Stay with signed public accesses and lawful stops rather than private banks.",
        "The current park alerts feed showed no live closure naming these Jacks Fork endpoints on the review date, but same-day alert and road-condition checks still matter before you leave vehicles."
      ],
      "watchFor": [
        "Repeated scraping, dragging, and possible short lining when the Eminence gauge is below the 200 cfs conservative floor, especially before you reach Alley Spring.",
        "Fast riffles, wood, strainers, bluff ledges, and Class I-II moving-water consequences over an extremely long mixed upper-lower river day.",
        "Rapid rises after thunderstorms, cold spring-fed water, limited cell service, long rural shuttle friction, and busy lower-river traffic into Eminence.",
        "Fatigue, daylight management, and the temptation to press on after the upper corridor is obviously too shallow. Treat a below-floor reading as a signal to shorten the objective."
      ]
    }
  },
  "jacks-fork-river-blue-spring-chilton": {
    "putIn": {
      "name": "Blue Spring River Access",
      "latitude": 37.054497,
      "longitude": -91.638198
    },
    "takeOut": {
      "name": "Joshua T. Chilton Memorial Landing / Eminence",
      "latitude": 37.152717,
      "longitude": -91.353486
    },
    "logistics": {
      "distanceLabel": "About 27.7 mi by current NPS segment totals",
      "estimatedPaddleTime": "About 12 hr to 16 hr depending on level, stops, and low-water dragging above Alley Spring",
      "shuttle": "Stage the take-out at Joshua T. Chilton Memorial Landing in Eminence, then drive to Blue Spring. Inspect the Blue Spring road and the Chilton landing first because this route combines remote upper-river access with a long lower-river finish.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, MDC/cooperative-area rules at Joshua T. Chilton, no-glass/no-polystyrene rules, and any current park closures, alerts, or advisories.",
      "camping": "Blue Spring, Rymers, and Bay Creek all have primitive camping context and Alley Spring has developed campground context, but treat this route as an overnighter or exceptional long day only if you have checked current NPS rules and made a separate legal overnight plan.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Blue Spring and take out at Joshua T. Chilton Memorial Landing in Eminence for the long Blue-Spring-to-town continuation. Use the direct Eminence gauge conservatively and expect the upper half to feel scrape-prone when conditions are near or below the 200 cfs floor.",
      "accessCaveats": [
        "Blue Spring, Rymers, Bay Creek, Alley Spring, and Joshua T. Chilton are all named public accesses, but the coordinates used here are practical access anchors rather than one official coordinate table. Follow signed access roads and current landing layouts on arrival.",
        "Blue Spring on the Jacks Fork is the river access across from the geologic feature, not the separate Blue Spring on the Current River.",
        "This route stays remote for much of the upper half before entering the developed Alley Spring area and the Eminence town corridor. Stay with signed public accesses and lawful stops rather than private banks.",
        "The current park alerts feed showed no live closure naming these Jacks Fork endpoints on the review date, but same-day alert and road-condition checks still matter before you leave vehicles."
      ],
      "watchFor": [
        "Prolonged scraping, dragging, and possible short lining when the Eminence gauge is below the 200 cfs conservative floor, especially before you reach Alley Spring.",
        "Fast riffles, wood, strainers, bluff ledges, and a very long mixed upper-lower river day with limited easy exits before Alley Spring.",
        "Rapid rises after thunderstorms, cold spring-fed water, limited cell service, and the sudden shift from remote upper river to heavier traffic into town.",
        "Fatigue, daylight management, and the temptation to continue when the upper corridor is obviously too shallow. Treat a below-floor reading as a reason to shorten the day."
      ]
    }
  },
  "jacks-fork-river-rymers-chilton": {
    "putIn": {
      "name": "Rymers Access",
      "latitude": 37.061386,
      "longitude": -91.559117
    },
    "takeOut": {
      "name": "Joshua T. Chilton Memorial Landing / Eminence",
      "latitude": 37.152717,
      "longitude": -91.353486
    },
    "logistics": {
      "distanceLabel": "About 21.1 mi by current NPS segment totals",
      "estimatedPaddleTime": "About 9 hr to 12 hr depending on level, stops, and low-water dragging above Alley Spring",
      "shuttle": "Stage the take-out at Joshua T. Chilton Memorial Landing in Eminence, then drive to Rymers. The shuttle mixes remote upper-river access with the busier town landing, so inspect both endpoints and current parking before launching.",
      "permits": "No route-specific private-vessel paddling permit is known. Follow Ozark National Scenic Riverways rules, MDC/cooperative-area rules at Joshua T. Chilton, no-glass/no-polystyrene rules, and any current park closures, alerts, or advisories.",
      "camping": "Rymers has primitive camping context, Bay Creek has backcountry camping context, and Alley Spring has developed campground context, but treat this route as a long day or separate legal overnight plan rather than assuming informal camps are available.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Rymers and take out at Joshua T. Chilton Memorial Landing in Eminence for the long upper-to-lower Jacks continuation. Use the direct Eminence gauge conservatively and expect more scraping above Alley Spring when conditions are near or below the 200 cfs floor.",
      "accessCaveats": [
        "Rymers, Bay Creek, Alley Spring, and Joshua T. Chilton are named public accesses, but the coordinates here are practical access anchors rather than one official coordinate table. Follow signed access roads and current landing layout on arrival.",
        "This route transitions from the remote upper corridor into the developed Alley Spring area and then the Eminence town-access corridor. Stay with signed public accesses and lawful stops rather than private banks.",
        "The current park alerts feed showed no live closure naming these Jacks Fork endpoints on the review date, but same-day alert and road-condition checks still matter before you leave vehicles."
      ],
      "watchFor": [
        "Frequent scraping, dragging, and slower travel when the Eminence gauge is below the 200 cfs conservative floor, especially before you reach Alley Spring.",
        "Fast riffles, wood, strainers, blind bends, and Class I-II moving-water consequences on a long route that still starts on the upper Jacks Fork.",
        "Rapid rises after thunderstorms, cold spring-fed water, limited cell service on the upper half, and busier boat traffic once you pass Alley Spring.",
        "Long-day fatigue and the temptation to keep going in marginal water just because the lower finish is closer to town."
      ]
    }
  },
  "gasconade-river-rollins-ferry-pointers-creek": {
    "putIn": {
      "name": "Rollins Ferry Access",
      "latitude": 38.393528,
      "longitude": -91.820729
    },
    "takeOut": {
      "name": "Pointers Creek Access",
      "latitude": 38.424847,
      "longitude": -91.742545
    },
    "logistics": {
      "distanceLabel": "About 7.0 to 7.4 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr depending on level, wind, stops, and boat traffic",
      "shuttle": "Use a two-car shuttle between MDC Rollins Ferry Access near Highway 89 and MDC Pointers Creek Access off Route RA. Stage and inspect Pointers Creek first because Route RA can be affected by flood-stage conditions on Pointers Creek.",
      "permits": "No route-specific paddling permit is known. Follow MDC area rules, posted signs, boat-use rules, camping rules, and parking restrictions at both department access areas.",
      "camping": "Primitive camping at the Rollins Ferry put-in and Pointers Creek take-out can support an endpoint campground plan, but this route is intended as a day float. Confirm current MDC rules, posted signs, and campsite availability before treating either endpoint as overnight-ready.",
      "summary": "Launch at MDC Rollins Ferry Access and take out at MDC Pointers Creek Access for a 7-mile lower Gasconade day. Use the Rich Fountain gauge as a conservative low-water check rather than a full preferred-range recommendation.",
      "accessCaveats": [
        "Rollins Ferry and Pointers Creek are MDC public access areas with Gasconade River boat-ramp context, but posted signs and area maps control exact use.",
        "MDC notes that Route RA to Pointers Creek is impassable when Pointers Creek is at flood stage; inspect the take-out and road access before launching upstream.",
        "Coordinates are practical public paddling/location anchors paired with MDC access confirmation; follow on-site signs for the exact ramp, parking, camping, and closure conditions."
      ],
      "watchFor": [
        "Dragging, shallow riffles, and slow pools when the Rich Fountain gauge is near or below the 1,100 cfs floor.",
        "High or rising water after rain, floating wood, muddy current, island splits, strainers on bends, and harder landings.",
        "Motorboats, anglers, gravel bars, private banks, and long exposed pools where wind can slow the trip.",
        "Private land away from public accesses and lawful gravel-bar stops; do not assume banks are public picnic or camping areas."
      ]
    }
  },
  "gasconade-river-pointers-creek-cooper-hill": {
    "putIn": {
      "name": "Pointers Creek Access",
      "latitude": 38.424847,
      "longitude": -91.742545
    },
    "takeOut": {
      "name": "Cooper Hill Conservation Area hand launch",
      "latitude": 38.4325614,
      "longitude": -91.6578519
    },
    "logistics": {
      "distanceLabel": "About 5.8 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr depending on level, wind, stops, and boat traffic",
      "shuttle": "Use a two-car shuttle between MDC Pointers Creek Access off Route RA and Cooper Hill Conservation Area near the village of Cooper Hill. Stage and inspect Cooper Hill first because it is a hand launch with a short carry from the parking area or CR 821 rather than a trailer ramp.",
      "permits": "No route-specific paddling permit is known. Follow MDC area rules, posted signs, boat-use rules, camping rules, and parking restrictions at both department areas.",
      "camping": "Treat this as a short day float. Primitive camping at the Pointers Creek put-in can support endpoint campground staging, but Cooper Hill has limited parking and hand-launch access; confirm current MDC rules and posted signs before using either endpoint as part of an overnight plan.",
      "summary": "Launch at MDC Pointers Creek Access and take out at Cooper Hill Conservation Area for a short lower Gasconade day. Use the Rich Fountain gauge as a conservative low-water check rather than a full preferred-range recommendation.",
      "accessCaveats": [
        "Pointers Creek is an MDC public access with Gasconade River boat-ramp context, but posted signs and area maps control exact use.",
        "Cooper Hill is a hand-launch access. MDC says floaters can access the river from the parking lot and CR 821, but there is no trailered-boat access.",
        "MDC notes that Route RA to Pointers Creek is impassable when Pointers Creek is at flood stage; inspect the put-in road and river conditions before committing.",
        "The Cooper Hill coordinate is a practical conservation-area/access anchor paired with MDC hand-launch confirmation. Follow on-site signs for the exact carry, parking, and any temporary restrictions."
      ],
      "watchFor": [
        "Dragging, shallow riffles, and slow pools when the Rich Fountain gauge is near or below the 1,100 cfs floor.",
        "High or rising water after rain, floating wood, muddy current, island splits, strainers on bends, and harder hand-launch landings.",
        "Motorboats, anglers, gravel bars, private banks, and open pools where wind can slow the trip.",
        "Private land away from public accesses and lawful gravel-bar stops; do not assume banks are public picnic or camping areas."
      ]
    }
  },
  "big-river-mammoth-merrill-horse": {
    "putIn": {
      "name": "Mammoth Access",
      "latitude": 38.121076,
      "longitude": -90.676055
    },
    "takeOut": {
      "name": "Merrill Horse Access / Highway H bridge",
      "latitude": 38.159611,
      "longitude": -90.706056
    },
    "logistics": {
      "distanceLabel": "About 5.4 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr depending on level, stops, and wood",
      "shuttle": "Use a short two-car shuttle between MDC Mammoth Access off Mammoth Road and MDC Merrill Horse Access / the Highway H bridge west of De Soto. Stage and inspect Merrill Horse first because it is the planned take-out and also the Richwoods gauge corridor.",
      "permits": "No route-specific paddling permit is known. Follow MDC area rules, posted signs, department-area boat-use rules, access hours, and parking restrictions at both public accesses.",
      "camping": "Treat this as a short day float. Do not plan on camping at either access unless current MDC signage and area rules explicitly allow it, and do not use private banks without permission.",
      "summary": "Launch at MDC Mammoth Access and take out at MDC Merrill Horse Access for a 5.4-mile Big River day west of De Soto. Use the Richwoods USGS gauge as the direct corridor gauge and skip this route when it is above the local high-water cutoff.",
      "accessCaveats": [
        "Mammoth and Merrill Horse are MDC public access areas, but posted signs, road conditions, parking areas, and area maps control exact use.",
        "The Mammoth coordinate is a public paddling-location coordinate paired with MDC access confirmation; the Merrill Horse coordinate uses the USGS Richwoods / Highway H gauge corridor as the practical take-out anchor. Follow on-site signs for the actual ramp or landing.",
        "The app uses community threshold guidance from OzarkAnglers, not an official MDC paddling band. Make a same-day visual call before committing."
      ],
      "watchFor": [
        "Scraping and shallow riffles when the Richwoods gauge is near or below 100 cfs.",
        "High or rising water above about 800 cfs, with strong current, muddy water, floating wood, and harder landings.",
        "Flows over 1,200 cfs at Richwoods; local guidance calls this section too high.",
        "Anglers, jetboats or small motorboats, gravel bars, wooded bends, root wads, strainers, and private banks away from public accesses."
      ]
    }
  },
  "shoal-creek-tipton-ford-wildcat": {
    "putIn": {
      "name": "Tipton Ford Access",
      "latitude": 36.98367,
      "longitude": -94.441028
    },
    "takeOut": {
      "name": "Wildcat Access",
      "latitude": 37.02972461,
      "longitude": -94.5209093
    },
    "logistics": {
      "distanceLabel": "About 6.9 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr depending on level, wood, stops, and bridge scouting",
      "shuttle": "Use a Joplin-area two-car shuttle between MDC Tipton Ford Access off Old Highway 71 and MDC Wildcat Access through the Shoal Creek Conservation Education Center / Wildcat Glade corridor. Stage and inspect Wildcat first because it is the planned public take-out and local park traffic can affect parking.",
      "permits": "No route-specific paddling permit is known. Follow MDC area rules, posted signs, day-use restrictions, and boat-use rules at Tipton Ford and Wildcat Access.",
      "camping": "Treat this as a day float. Do not plan to camp at either MDC access, and do not use private banks without permission.",
      "summary": "Launch at MDC Tipton Ford Access and take out at MDC Wildcat Access for a 6.9-mile lower Shoal Creek day in the Joplin area. Use the Joplin USGS gauge as a conservative low-water check, then make a same-day call for wood, high-water current, and bridge approaches.",
      "accessCaveats": [
        "Tipton Ford is an MDC public access with a small-boat concrete ramp and parking, but posted signs and area maps control exact use.",
        "Wildcat Access is an MDC / City of Joplin public access with a boat ramp and parking, but it sits in a busy recreation corridor; inspect the landing before launching upstream.",
        "Coordinates are practical access anchors from public paddling/location records paired with MDC access confirmation; follow on-site signs for the exact ramp, parking, and any temporary restrictions."
      ],
      "watchFor": [
        "Dragging, shallow chert riffles, and possible walking when the Joplin gauge is near or below the 225 cfs floor.",
        "High or rising water after rain, especially split channels, pushy bridge current, strainers, and log jams.",
        "The Highway 171 area, where MoHERP high-water trip notes warn of a treacherous split channel and capsizes.",
        "Class I-II riffles, chert ledges, brush piles, root wads, anglers, swimmers, and local park users near Wildcat.",
        "Private land away from public accesses and lawful gravel-bar stops; do not assume banks are public picnic or camping areas."
      ]
    }
  }
};
