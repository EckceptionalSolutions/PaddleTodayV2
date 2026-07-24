// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const michiganRiverTripDetails: Record<string, RiverTripDetails> = {
  "pine-river-edgetts-lincoln": {
    "putIn": {
      "id": "edgetts",
      "name": "Edgetts Pine River launch",
      "latitude": 44.062496,
      "longitude": -85.583206
    },
    "takeOut": {
      "id": "lincoln-bridge",
      "name": "Lincoln Bridge Campground Boat Launch",
      "latitude": 44.13303,
      "longitude": -85.69622
    },
    "logistics": {
      "distanceLabel": "About 13.1 mi",
      "estimatedPaddleTime": "Long day, roughly 4 hr to 5.5 hr depending on level, wood, and stops",
      "shuttle": "Use a two-car upper Pine shuttle from Lincoln Bridge back to Edgetts. Meadow Brook Bridge, Skookum, and Walker Bridge are intermediate Pine River access landmarks, but plan the route as a committed moving-water day unless you have confirmed shorter access and parking.",
      "permits": "American Whitewater says Edgetts to Lincoln Bridge does not require the downstream Pine National Scenic River permit. Still check current Michigan DNR, Forest Service, and local access signage before launch, especially if continuing below Lincoln.",
      "camping": "Lincoln Bridge State Forest Campground is at the take-out, with Silver Creek State Forest Campground nearby upstream. Use those legal campground options rather than assuming riverbank camping or private-shore stops.",
      "summary": "Launch at Edgetts and take out at Lincoln Bridge for the upper Pine River moving-water reach above the federal permit corridor. Use the Hoxeyville USGS gauge as a conservative low-water check, then make same-day decisions from access signage, wood, and weather.",
      "accessCaveats": [
        "Edgetts is mapped and coordinate-backed by the Cadillac Area Visitors Bureau / Forest Service Pine River map and named by American Whitewater, but it is not as cleanly documented as Lincoln in Outdoor Michigan. Follow current signs and do not use private land if access has changed.",
        "Lincoln Bridge is a Michigan DNR carry-in launch with limited parking in Outdoor Michigan. Stage the take-out first so the exit and parking are clear before launch.",
        "The Hoxeyville gauge is downstream on the same Pine River corridor. American Whitewater says it may vary slightly from the upper reach, so treat 170 cfs as a low-water screen rather than a full quality guarantee."
      ],
      "watchFor": [
        "Shallow fast current, tight bends, occasional low Class II spots, and logs or stumps piled into turns.",
        "Scraping and harder boat control when the Hoxeyville gauge falls below the 170 cfs floor used by the app.",
        "Sweepers, logjams, cold water, storm damage, and limited legal stops away from named public access points.",
        "Do not continue below Lincoln without checking the downstream Pine Scenic River permit rules and route plan."
      ]
    }
  },
  "pine-river-peterson-low-bridge": {
    "putIn": {
      "id": "peterson-bridge",
      "name": "Peterson Bridge River Access",
      "latitude": 44.203235,
      "longitude": -85.799124
    },
    "takeOut": {
      "id": "low-bridge",
      "name": "Low Bridge River Access",
      "latitude": 44.218493,
      "longitude": -85.901885
    },
    "logistics": {
      "distanceLabel": "About 8.25 to 8.6 mi",
      "estimatedPaddleTime": "About 3.5 hr on-water time, plus scouting, wood delays, and landing congestion",
      "shuttle": "Use a two-car Manistee National Forest shuttle between Peterson Bridge River Access and Low Bridge River Access. The corridor uses forest roads and permit-managed landings, so stage the Low Bridge take-out before launching.",
      "permits": "A Pine National Scenic River permit is required during the Forest Service permit season. Recreation.gov manages Pine River permits and lists both Peterson Bridge and Low Bridge as access choices; check current availability, parking limits, and launch timing before the trip.",
      "camping": "Peterson Bridge Campground is at the put-in, including paddle- or walk-in sites under Forest Service rules. Use designated sites or separately reserved campgrounds rather than assuming informal on-route camping.",
      "summary": "Launch at Peterson Bridge River Access and take out at Low Bridge River Access for a permit-managed Pine River day in the Huron-Manistee National Forests. Use the Hoxeyville USGS gauge as a conservative low-water check, not a full ideal-range promise.",
      "accessCaveats": [
        "Both endpoints are official Pine River access points, but permit rules, launch windows, parking capacity, and temporary storm-damage notices can change the practical plan.",
        "Published Pine River maps and route guides list Peterson Bridge to Low Bridge at roughly 8.25 to 8.6 miles, with travel time varying substantially by level, wood, stops, and boat traffic.",
        "The Hoxeyville gauge is a direct same-river gauge downstream of the route. It is useful for same-day flow, but local wood and storm damage can matter as much as the number."
      ],
      "watchFor": [
        "Fast current, sharp bends, narrow passages, sweepers, downed trees, and logjams.",
        "Scraping and more difficult maneuvering when the Hoxeyville gauge is below the 170 cfs floor used by the app.",
        "Cold water, strainers after storms, busy summer permit traffic, and limited quick exits between access sites.",
        "Do not launch without checking current Forest Service alerts, permit status, and recent Pine River hazard reports."
      ]
    }
  },
  "huron-river-argo-gallup": {
    "putIn": {
      "id": "argo-park-canoe-livery",
      "name": "Argo Park Canoe Livery public launch",
      "latitude": 42.29148,
      "longitude": -83.74444
    },
    "takeOut": {
      "id": "gallup-park-livery",
      "name": "Gallup Park Livery public launch",
      "latitude": 42.277699,
      "longitude": -83.699883
    },
    "logistics": {
      "distanceLabel": "3.5 mi",
      "estimatedPaddleTime": "About 1.5 hr, longer with crowds, low water, or repeated Cascades laps",
      "shuttle": "Use the City of Ann Arbor livery shuttle when operating, or stage a two-car shuttle between Gallup Park and Argo. Parking at Argo is limited, so check city parking guidance before unloading on busy weekends.",
      "permits": "No route-specific paddling permit is known for private boats. Follow City of Ann Arbor livery, launch, parking, and park rules, and confirm seasonal hours if relying on rentals or shuttle service.",
      "camping": "Treat this as a short urban day trip. No on-route camping plan is assumed between Argo and Gallup.",
      "summary": "Launch at Argo Park Canoe Livery, run the Argo Cascades or use the appropriate city launch option for your craft, then continue through Ann Arbor parkland to Gallup Park Livery. Use the Ann Arbor USGS gauge and make a visual check because the Cascades are dam-adjacent and can be crowded.",
      "accessCaveats": [
        "Argo and Gallup are City of Ann Arbor facilities with seasonal livery operations, launches, parking, restrooms, and rentals; hours and shuttle availability change by season.",
        "Canoes may be launched downstream of the Cascades under city livery operations, while kayaks, rafts, tubes, and properly skilled private paddlers use the Cascades according to current rules and signage.",
        "The Barton Dam / Barton Pond closure is upstream of this route, but it affects longer Huron River trip planning and should not be treated as a usable upstream portage."
      ],
      "watchFor": [
        "Argo Cascades drops, rock chutes, and pools; scout from the adjacent path if you have not run them before.",
        "Crowded summer weekends with kayaks, rafts, tubes, paddleboards, rowboats, and livery traffic sharing a short corridor.",
        "Erratic gauge changes from dam operations; American Whitewater says visual confirmation is required even with the Ann Arbor gauge.",
        "PFAS advisories on the Huron River include avoiding contact with foam and washing hands, pets, and gear after exposure."
      ]
    }
  },
  "clinton-river-downtown-utica-budd": {
    "putIn": {
      "id": "downtown-utica",
      "name": "Downtown Utica water-trail access",
      "latitude": 42.625576,
      "longitude": -83.037665
    },
    "takeOut": {
      "id": "budd-park",
      "name": "Budd Park carry-in launch",
      "latitude": 42.586506,
      "longitude": -82.927598
    },
    "logistics": {
      "distanceLabel": "About 11.8 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "About 4 hr to 6 hr for the full corridor, shorter with North Clinton River Park or Rotary Park pairings.",
      "shuttle": "Choose a water-trail access pair, stage the downstream vehicle first, and inspect both launches before committing.",
      "permits": "No route-specific paddling permit is known. Follow City of Utica and City of Sterling Heights park, launch, parking, and posted water-trail rules at the public access sites.",
      "camping": "Treat this as an urban day-trip corridor. No on-route camping plan is assumed.",
      "summary": "Use this as the upper Macomb Clinton River access-planner corridor from Downtown Utica to Budd Park, with North Clinton River Park and Rotary Park options.",
      "accessCaveats": [
        "Public access rules, park hours, and construction can change quickly in this urban corridor.",
        "The full corridor is a planning envelope; shorter access pairs are usually more practical.",
        "Stay with mapped water-trail accesses rather than private banks."
      ],
      "watchFor": [
        "High, fast water and woody debris after rain.",
        "Bridge current, blind bends, and urban stormwater.",
        "Low-water scraping near the low warning."
      ]
    },
    "accessPoints": [
      {
        "id": "downtown-utica",
        "name": "Downtown Utica water-trail access",
        "latitude": 42.625576,
        "longitude": -83.037665,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default corridor put-in."
      },
      {
        "id": "north-clinton-river-park",
        "name": "North Clinton River Park accessible launch",
        "latitude": 42.607767,
        "longitude": -83.024447,
        "mileFromStart": 2.2,
        "segmentKind": "creek",
        "note": "Short urban access option."
      },
      {
        "id": "rotary-park-sterling-heights",
        "name": "Rotary Park accessible launch",
        "latitude": 42.570595,
        "longitude": -82.971459,
        "mileFromStart": 8.2,
        "segmentKind": "creek",
        "note": "Accessible launch and common corridor split point."
      },
      {
        "id": "budd-park",
        "name": "Budd Park carry-in launch",
        "latitude": 42.586506,
        "longitude": -82.927598,
        "mileFromStart": 11.8,
        "segmentKind": "creek",
        "note": "Default corridor finish."
      }
    ]
  },
  "clinton-river-macarthur-harley-ensign": {
    "putIn": {
      "id": "neil-dempsey-macarthur-park",
      "name": "Neil Dempsey Launch at MacArthur Park",
      "latitude": 42.597338,
      "longitude": -82.871104
    },
    "takeOut": {
      "id": "harley-ensign-dnr",
      "name": "Harley Ensign DNR launch",
      "latitude": 42.593327,
      "longitude": -82.774834
    },
    "logistics": {
      "distanceLabel": "About 7.2 mi",
      "estimatedPaddleTime": "About 2.5 hr to 3.5 hr, longer with wind, current, or motorboat traffic",
      "shuttle": "Stage the take-out at Harley Ensign in Harrison Township, then drive back to MacArthur Park in Mount Clemens. Check the Harley Ensign landing, wind direction, and Lake St. Clair conditions before leaving a vehicle because this finish is close to open water.",
      "permits": "No route-specific paddling permit is known. Follow Mount Clemens, Harrison Township, DNR, and Clinton River Water Trail access rules, plus any posted launch or parking requirements at Harley Ensign.",
      "camping": "Treat this as a day trip. No on-route camping plan is assumed between MacArthur Park and Harley Ensign.",
      "summary": "Launch at the Neil Dempsey launch in MacArthur Park and follow the lower Clinton River to Harley Ensign at the Lake St. Clair end of the water trail. Use the Sterling Heights USGS stage as a warning check, then make a separate wind, waves, boat-traffic, and water-quality decision for the mouth section.",
      "accessCaveats": [
        "CRWC maps Neil Dempsey at MacArthur Park and Harley Ensign (DNR) as Clinton River Water Trail access points with coordinates and a 7.2-mile access spacing.",
        "Harley Ensign is at the Lake St. Clair end of the route, so inspect the take-out and do not let river current push the group into open-water exposure without an intentional plan.",
        "Stay with public launches and avoid private banks; CRWC specifically tells paddlers to plan exits at public access points."
      ],
      "watchFor": [
        "Low-water scraping or slow travel when the Sterling Heights gauge is at or below the CRWC 8 ft low-water warning.",
        "High, fast water, strainers, and woody debris when the gauge approaches or exceeds the 10 ft high-water warning, especially after rain.",
        "Urban stormwater and possible sewage-overflow water-quality concerns after high-flow events.",
        "Motorboat traffic, wind, waves, marina or channel traffic, and open-water consequences near Lake St. Clair.",
        "Do not continue onto Lake St. Clair unless your group has the weather window, craft, navigation, and rescue plan for open-water paddling."
      ]
    }
  },
  "clinton-river-shadyside-macarthur": {
    "putIn": {
      "id": "shadyside-park",
      "name": "Shadyside Park boat and canoe launch",
      "latitude": 42.582529,
      "longitude": -82.880104
    },
    "takeOut": {
      "id": "neil-dempsey-macarthur-park",
      "name": "Neil Dempsey Launch at MacArthur Park",
      "latitude": 42.597338,
      "longitude": -82.871104
    },
    "logistics": {
      "distanceLabel": "About 2.0 mi",
      "estimatedPaddleTime": "About 45 min to 1 hr, longer with low water, wood, or launch congestion",
      "shuttle": "Stage the take-out at MacArthur Park, then drive back to Shadyside Park. Inspect MacArthur before launching because downtown events, docks, or riverfront activity can slow the finish.",
      "permits": "No route-specific paddling permit is known. Follow Mount Clemens park, launch, and parking rules at both public access sites.",
      "camping": "Treat this as a short day trip. No on-route camping plan is assumed between Shadyside Park and MacArthur Park.",
      "summary": "Launch at Shadyside Park and take out at the Neil Dempsey launch in MacArthur Park for a very short Mount Clemens lower-Clinton link. Use the Sterling Heights gauge as a conservative warning check, then make a same-day call on wood, signage, and any lower-river obstructions before committing.",
      "accessCaveats": [
        "Mount Clemens says Shadyside Park has a handicapped accessible pier with a boat and canoe launch.",
        "Mount Clemens says MacArthur Park includes the Neil Dempsey universally accessible kayak launch.",
        "Do not continue downstream beyond MacArthur without a separate lower-river and Lake St. Clair plan."
      ],
      "watchFor": [
        "Low-water scraping or muddy landings when the Sterling Heights gauge is below the CRWC 8 ft low-water warning.",
        "Fast rises after rain, floating wood, strainers, and any posted dam or weir warning signage in the Mount Clemens reach.",
        "Urban stormwater and sewer-overflow water-quality concerns after wet weather."
      ]
    }
  }
};
