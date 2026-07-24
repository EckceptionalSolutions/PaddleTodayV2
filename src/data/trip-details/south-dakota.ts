// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const southDakotaRiverTripDetails: Record<string, RiverTripDetails> = {
  "skunk-creek-legacy-park-farm-field": {
    "putIn": {
      "name": "Legacy Park boat/canoe/kayak access",
      "latitude": 43.5435603,
      "longitude": -96.8111739
    },
    "takeOut": {
      "name": "Farm Field Park kayak and canoe access",
      "latitude": 43.5028832,
      "longitude": -96.749131
    },
    "logistics": {
      "distanceLabel": "About 5 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr depending on level, scraping, and wind",
      "shuttle": "Use a short city shuttle between Legacy Park on W 12th St and Farm Field Park on S Western Ave. Both are Sioux Falls parks with posted hours; stage the Farm Field take-out first and use designated access areas.",
      "permits": "No route-specific paddling permit is known. Follow City of Sioux Falls park hours and posted rules at Legacy Park and Farm Field Park.",
      "camping": "No on-route camping applies. Treat this as a short city day paddle only.",
      "summary": "Launch at Legacy Park and take out at Farm Field Park for the short Sioux Falls Skunk Creek segment named by Sioux Empire Paddlers. The USGS Skunk Creek gauge is the direct same-creek low-water check.",
      "accessCaveats": [
        "Legacy Park and Farm Field Park are city-managed public parks with boat/canoe/kayak access, but park hours, events, construction, or temporary creek-bank conditions can affect parking and landing space.",
        "This route ends at Farm Field Park near the Big Sioux River corridor. Do not continue onto the Big Sioux, downtown channels, Falls Park, or any low-head-dam area without separate route planning and current local hazard information.",
        "Urban water quality is part of the go/no-go decision. Check the City of Sioux Falls water-quality dashboard when available, avoid immersion, and be especially cautious after heavy rain or visible pollution."
      ],
      "watchFor": [
        "Dragging, walking, and shallow riffles when the Skunk Creek gauge is below the 4.5 ft floor.",
        "Storm debris, strainers, bridge approaches, exposed rocks, trash, and tight bends after rain or high water.",
        "Limited-contact urban water, including E. coli risk during the May-to-September monitoring season.",
        "Fences or other obstructions can occur on South Dakota navigable streams; scout any unexpected obstruction rather than forcing it."
      ]
    }
  },
  "big-sioux-river-farm-field-rotary": {
    "putIn": {
      "name": "Farm Field Park kayak and canoe access",
      "latitude": 43.5028832,
      "longitude": -96.749131
    },
    "takeOut": {
      "name": "Rotary Park kayak and canoe access",
      "latitude": 43.5308299,
      "longitude": -96.6967328
    },
    "logistics": {
      "distanceLabel": "About 4.15 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr depending on level, wind, and scraping",
      "shuttle": "Use a short city shuttle between Farm Field Park on S Western Ave and Rotary Park on E 26th St. Both are Sioux Falls parks with posted hours; stage the take-out first and use the designated canoe/kayak access areas.",
      "permits": "No route-specific paddling permit is known. Follow City of Sioux Falls park hours and posted rules at Farm Field Park and Rotary Park.",
      "camping": "No on-route camping applies. Treat this as a short city day paddle only.",
      "summary": "Launch at Farm Field Park and take out at Rotary Park for the short Sioux Falls Big Sioux segment named by Sioux Empire Paddlers. The USGS Sioux Falls gauge is next to the put-in corridor, so use it as a direct same-day low-water check.",
      "accessCaveats": [
        "Farm Field Park and Rotary Park are city-managed public parks with kayak/canoe access, but park hours, events, construction, or temporary riverbank conditions can affect parking and landing space.",
        "This route intentionally stops at Rotary Park. Do not continue downstream into downtown, diversion channels, Falls Park, or any low-head-dam area without separate route planning and current local hazard information.",
        "Urban water quality is part of the go/no-go decision. Check the City of Sioux Falls water-quality dashboard when available, avoid immersion, and be especially cautious after heavy rain or visible pollution."
      ],
      "watchFor": [
        "Dragging, walking, and shallow riprap when the Sioux Falls gauge is below the 250 cfs floor.",
        "Storm debris, strainers, bridge approaches, exposed rocks, and trash after rain or high water.",
        "Limited-contact urban water, including E. coli risk during the May-to-September monitoring season.",
        "Fences or other obstructions can occur on South Dakota navigable streams; scout any unexpected obstruction rather than forcing it."
      ]
    }
  },
  "split-rock-creek-split-rock-park-palisades": {
    "putIn": {
      "name": "Split Rock Park canoe/kayak launch",
      "latitude": 43.713056,
      "longitude": -96.503056
    },
    "takeOut": {
      "name": "Palisades State Park / Split Rock Creek access",
      "latitude": 43.725833,
      "longitude": -96.509167
    },
    "logistics": {
      "distanceLabel": "About 2.8 mi",
      "estimatedPaddleTime": "Short moving-water run; time varies with level, scouting, and portages",
      "shuttle": "Use a short Garretson-area two-car shuttle between Split Rock Park and Palisades State Park. Check Palisades State Park entry requirements and scout the take-out before launching because state-park traffic and creek levels can change the practical landing.",
      "permits": "No route-specific paddling permit is known. Follow City of Garretson rules at Split Rock Park and pay any required South Dakota state park entrance fee at Palisades.",
      "camping": "Palisades State Park has separate campground and lodging options, but this route should be treated as a short day run unless you have a state-park reservation or other legal overnight plan.",
      "summary": "Launch from the city park access below the Split Rock Park dam and paddle the short quartzite creek corridor to Palisades State Park. Use the USGS Corson gauge as a direct same-creek low-water check, but make the final call by scouting ledges, fences, and wood.",
      "accessCaveats": [
        "Split Rock Park is a city park with a canoe/kayak launch downstream from the dam; do not launch above or near dam hydraulics without separate local scouting.",
        "Palisades State Park is a fee state park. Confirm the practical landing and parking location on arrival, especially during busy warm-weather weekends.",
        "Coordinates are practical access anchors derived from named park/access map context, not a substitute for on-site signs and current park rules."
      ],
      "watchFor": [
        "Shallow scraping below the 4.5 ft Corson-gauge floor used by the app.",
        "Class I-II ledges and riffles, with Class III behavior possible near high flows around 1,000 cfs.",
        "Fences, strainers, downed trees, tight banks, and fast rain-driven rises on a small creek.",
        "Cold water in spring and shoulder seasons, plus busy state-park users near the take-out."
      ]
    }
  }
};
