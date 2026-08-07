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
  "big-sioux-river-rec-area-south-highway-42": {
    "putIn": {
      "name": "Big Sioux Recreation Area South canoe site",
      "latitude": 43.573140888085128,
      "longitude": -96.600475153291086
    },
    "takeOut": {
      "name": "SD Highway 42 / Mary Jo Wegner Arboretum canoe access",
      "latitude": 43.524737736047783,
      "longitude": -96.600618160195765
    },
    "logistics": {
      "distanceLabel": "About 4.8 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr depending on level, wind, and wood",
      "shuttle": "Stage the take-out near the Highway 42 / Mary Jo Wegner Arboretum access, then drive to the Big Sioux Recreation Area South canoe site near Brandon. Use signed parking and access areas; South Dakota state park entrance, vehicle, or posted access rules may apply at Big Sioux Recreation Area.",
      "permits": "No route-specific paddling permit is known. Follow South Dakota GFP Big Sioux Recreation Area rules and fees, Mary Jo Wegner Arboretum posted hours and rules, and any temporary launch or parking restrictions.",
      "camping": "Endpoint-basecamp only. Big Sioux Recreation Area supports camping, but SD Hwy 42 is not a camping access; Jay Heath canoe-in sites elsewhere in the corridor require separate reservations and should not be inferred for this short day route.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from the SD GFP-managed Big Sioux Recreation Area South canoe site and take out near the Highway 42 bridge / Mary Jo Wegner Arboretum access for the 4.8-mile Jay Heath Trail segment named by GFP. Use USGS 06482020 at North Cliff Avenue as the direct same-river corridor check and treat 300 cfs as the conservative low-water floor.",
      "accessCaveats": [
        "GFP's Jay Heath access layer marks Big Sioux Rec Area South as Parking Yes, Launch Yes, Camping Yes, and a rock launch surface managed by South Dakota GFP.",
        "GFP's layer marks SD Hwy 42 as a canoe site with parking but Launch No, while Mary Jo Wegner Arboretum separately documents kayak/canoe launching next to the Highway 42 bridge. Treat the stored take-out coordinate as an access anchor and identify the signed water-entry or landing point on arrival.",
        "Do not substitute Big Sioux Recreation Area North, Lien Park, downtown Sioux Falls, or a longer Jay Heath segment without fresh access, dam, and hazard review.",
        "Stay within legal public access and respect private banks; this short route does not imply intermediate public egress."
      ],
      "watchFor": [
        "Shallow bars, scraping, and slow current when the North Cliff Avenue corridor gauge is below the 300 cfs community floor.",
        "Wood, strainers, bridge debris, bank mud, and fences or wire after rain or high water.",
        "Limited-contact urban and agricultural water-quality concerns, especially after heavy rain or visible runoff.",
        "Low-head-dam and diversion hazards elsewhere on the Big Sioux/Jay Heath corridor; this card starts below the upstream Sioux Falls hazard cluster and should not be extended without separate planning."
      ]
    },
    "accessPoints": [
      {
        "id": "big-sioux-rec-area-south",
        "name": "Big Sioux Recreation Area South canoe site",
        "latitude": 43.573140888085128,
        "longitude": -96.600475153291086,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 19; Parking Yes, Launch Yes, Camping Yes, rock launch surface, SD GFP owned/managed."
      },
      {
        "id": "sd-highway-42-mary-jo-wegner",
        "name": "SD Highway 42 / Mary Jo Wegner Arboretum canoe access",
        "latitude": 43.524737736047783,
        "longitude": -96.600618160195765,
        "mileFromStart": 4.8,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 18 is a parking canoe-site anchor; Mary Jo Wegner Arboretum documents practical canoe/kayak launch access on the park edge next to the Highway 42 bridge."
      }
    ]
  },
  "big-sioux-river-grandview-klondike-south": {
    "putIn": {
      "name": "Grandview canoe site",
      "latitude": 43.4484919862431,
      "longitude": -96.6024966707481
    },
    "takeOut": {
      "name": "Klondike South canoe site",
      "latitude": 43.3848345366483,
      "longitude": -96.5221598039014
    },
    "logistics": {
      "distanceLabel": "About 7.8 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr depending on level, wind, and wood",
      "shuttle": "Stage the take-out at Klondike South, then drive to the Grandview access. Use the signed GFP access and parking areas at both ends and do not substitute Klondike North or Klondike East without a separate access check.",
      "permits": "No route-specific paddling permit is known. Follow South Dakota GFP access rules, posted parking limits, and any temporary closure or high-water guidance.",
      "camping": "No route camping. GFP's Jay Heath access layer marks both Grandview and Klondike South as Camping No; do not infer upstream canoe-in campsites or nearby parks as part of this day route.",
      "campingClassification": "none",
      "summary": "Launch from the SD GFP-managed Grandview canoe site and take out at Klondike South for the 7.8-mile Jay Heath Trail segment named by GFP. Use USGS 06482020 at North Cliff Avenue as the same-river corridor check and treat 300 cfs as the conservative low-water floor.",
      "accessCaveats": [
        "GFP's Jay Heath access layer marks Grandview as Parking Yes, Launch Yes, Camping No, and SD GFP owned/managed.",
        "GFP's layer marks Klondike South as Parking Yes, Launch Yes, Camping No, and SD GFP owned/managed. Treat the stored coordinate as the access anchor and choose the signed water-entry or landing point on arrival.",
        "Do not substitute Gitchie Manitou, Good Earth canoe-in campsite, Klondike North, Klondike East, or a longer lower Big Sioux segment without fresh access, camping, and hazard review.",
        "Stay within legal public access and respect private banks; this short route does not imply intermediate public egress."
      ],
      "watchFor": [
        "Shallow bars, scraping, and slow current when the North Cliff Avenue corridor gauge is below the 300 cfs community floor.",
        "Wood, strainers, bridge debris, bank mud, and fences or wire after rain or high water.",
        "Limited-contact urban and agricultural water-quality concerns, especially after heavy rain or visible runoff.",
        "Rock-crossing and landing complexity in the broader Klondike corridor; identify Klondike South before launching and take out as planned."
      ]
    },
    "accessPoints": [
      {
        "id": "grandview-canoe-site",
        "name": "Grandview canoe site",
        "latitude": 43.4484919862431,
        "longitude": -96.6024966707481,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 16; Parking Yes, Launch Yes, Camping No, SD GFP owned/managed."
      },
      {
        "id": "klondike-south-canoe-site",
        "name": "Klondike South canoe site",
        "latitude": 43.3848345366483,
        "longitude": -96.5221598039014,
        "mileFromStart": 7.8,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 14; Parking Yes, Launch Yes, Camping No, SD GFP owned/managed."
      }
    ]
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
