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
  "big-sioux-river-highway-42-grandview": {
    "putIn": {
      "name": "SD Highway 42 / Mary Jo Wegner Arboretum canoe access",
      "latitude": 43.524737736047783,
      "longitude": -96.600618160195765
    },
    "takeOut": {
      "name": "Grandview canoe site",
      "latitude": 43.4484919862431,
      "longitude": -96.6024966707481
    },
    "logistics": {
      "distanceLabel": "About 8.7 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr depending on level, wind, scouting, and wood",
      "shuttle": "Stage the take-out at the SD GFP-managed Grandview access, then drive to the SD Highway 42 / Mary Jo Wegner Arboretum access. Use signed parking and access areas; the Highway 42 coordinate is an access anchor and users should identify the actual water-entry point on arrival.",
      "permits": "No route-specific paddling permit is known. Follow Mary Jo Wegner Arboretum posted hours and rules, South Dakota GFP Jay Heath access rules, Good Earth State Park reservation requirements if using the canoe-in campsite, and any temporary access or high-water guidance.",
      "camping": "On-route canoe-in camping is reservation-limited, not informal river camping. GFP's Jay Heath access layer marks the Good Earth State Park canoe-in campsite as Camping Yes with no parking and reservation instructions, while the public Good Earth park page says the park is day-use with no regular campground. The SD Highway 42 and Grandview endpoints are Camping No.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch near the Highway 42 bridge / Mary Jo Wegner Arboretum access and paddle downstream past the Good Earth / Gitchie Manitou corridor to the SD GFP-managed Grandview canoe site. Use USGS 06482020 at North Cliff Avenue as the same-river corridor check and treat 300 cfs as the conservative low-water floor.",
      "accessCaveats": [
        "GFP's Jay Heath access layer marks SD Hwy 42 as a canoe-site parking anchor but Launch No; Mary Jo Wegner Arboretum separately documents practical canoe/kayak launch access next to the Highway 42 bridge. Treat the stored put-in coordinate as an access anchor, not a guarantee of the exact water-entry point.",
        "GFP's layer marks Gitchie Manitou State Preserve as Parking Yes but Launch No. Do not use Gitchie Manitou as a substitute launch or landing for this route.",
        "GFP's layer marks Grandview as Parking Yes, Launch Yes, Camping No, concrete launch surface, and SD GFP owned/managed.",
        "Stay within legal public access and respect private banks; this route does not imply casual intermediate egress outside source-backed Jay Heath access points."
      ],
      "watchFor": [
        "Shallow bars, scraping, and slow current when the North Cliff Avenue corridor gauge is below the 300 cfs community floor.",
        "Wood, strainers, bridge debris, bank mud, and fences or wire after rain or high water.",
        "Limited-contact urban and agricultural water-quality concerns, especially after heavy rain or visible runoff.",
        "Longer mileage and limited intermediate public egress. Scout the Highway 42 access, the Grandview landing, and any campsite logistics before committing."
      ]
    },
    "accessPoints": [
      {
        "id": "sd-highway-42-mary-jo-wegner",
        "name": "SD Highway 42 / Mary Jo Wegner Arboretum canoe access",
        "latitude": 43.524737736047783,
        "longitude": -96.600618160195765,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 18 is a parking canoe-site anchor; Mary Jo Wegner Arboretum documents practical canoe/kayak launch access on the park edge next to the Highway 42 bridge."
      },
      {
        "id": "good-earth-canoe-in-campsite",
        "name": "Good Earth State Park canoe-in campsite",
        "latitude": 43.484487,
        "longitude": -96.586867,
        "mileFromStart": 3.8,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 36; Canoe/Kayak Only Campsite, Camping Yes, no parking, reservation instructions through Good Earth State Park. Verify reservation and current park rules before planning overnight use."
      },
      {
        "id": "grandview-canoe-site",
        "name": "Grandview canoe site",
        "latitude": 43.4484919862431,
        "longitude": -96.6024966707481,
        "mileFromStart": 8.7,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 16; Parking Yes, Launch Yes, Camping No, concrete launch surface, SD GFP owned/managed."
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
  "big-sioux-river-oak-ridge-oak-grove": {
    "putIn": {
      "name": "Oak Ridge Public Water Access concrete launch",
      "latitude": 43.1706166664578,
      "longitude": -96.4694000002021
    },
    "takeOut": {
      "name": "Oak Grove County Park concrete launch",
      "latitude": 43.0618556830408,
      "longitude": -96.4709710186444
    },
    "logistics": {
      "distanceLabel": "About 11.1 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr depending on level, wind, scouting, and stops",
      "shuttle": "Stage the take-out at Oak Grove County Park / Big Sioux Park near Hawarden, then drive to Oak Ridge Public Water Access near Hudson. Use the signed public access and parking areas at both ends.",
      "permits": "No route-specific paddling permit is known. Follow SD GFP access rules at Oak Ridge, Sioux County Conservation / Oak Grove park hours and campground rules, and any temporary closure or high-water guidance.",
      "camping": "Endpoint campground only. GFP's Jay Heath access layer marks Oak Ridge Public Water Access as Camping No and Oak Grove County Park as Camping Yes; MyCountyParks documents fee camping at Oak Grove / Big Sioux Park. Do not infer informal river camping or private-bank camping from the water trail.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from Oak Ridge Public Water Access and take out at Oak Grove County Park for the 11.1-mile lower Jay Heath Trail segment named by Sioux Empire Paddlers and supported by GFP access records. Use USGS 06485500 at Akron as the lower-corridor gauge and treat 400 cfs as the conservative low-water floor.",
      "accessCaveats": [
        "GFP's Jay Heath access layer marks Oak Ridge Public Water Access as Parking Yes, Launch Yes, Camping No, and a concrete launch surface owned and managed by SD GFP.",
        "GFP's layer marks Oak Grove County Park as Parking Yes, Launch Yes, Camping Yes, and a concrete launch surface managed by Sioux County Conservation.",
        "MyCountyParks says Oak Grove / Big Sioux Park has boat-ramp access to the Big Sioux River, fee camping, and daily park hours; verify current rules before relying on campground or rental services.",
        "The route follows the Big Sioux border corridor. Stay within legal public access, respect private banks, and do not treat nearby road crossings or private ramps as casual bailout points."
      ],
      "watchFor": [
        "Shallow bars, scraping, and slow current when the Akron gauge is below the 400 cfs community floor.",
        "Wood, strainers, bridge debris, bank mud, fences, or wire after rain or high water.",
        "Agricultural and urban water-quality concerns on the lower Big Sioux, especially after heavy rain or visible runoff.",
        "An 11-mile open border-river day with wind exposure, limited intermediate public egress, and muddy landings."
      ]
    },
    "accessPoints": [
      {
        "id": "oak-ridge-public-water-access",
        "name": "Oak Ridge Public Water Access concrete launch",
        "latitude": 43.1706166664578,
        "longitude": -96.4694000002021,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 8; Parking Yes, Launch Yes, Camping No, concrete launch surface, SD GFP-owned/managed."
      },
      {
        "id": "oak-grove-county-park",
        "name": "Oak Grove County Park concrete launch",
        "latitude": 43.0618556830408,
        "longitude": -96.4709710186444,
        "mileFromStart": 11.1,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 7; Parking Yes, Launch Yes, Camping Yes, concrete launch surface, Sioux County Conservation-managed."
      }
    ]
  },
  "big-sioux-river-oak-grove-carrs-landing": {
    "putIn": {
      "name": "Oak Grove County Park concrete launch",
      "latitude": 43.0618556830408,
      "longitude": -96.4709710186444
    },
    "takeOut": {
      "name": "Carr's Landing concrete launch",
      "latitude": 43.0108833331488,
      "longitude": -96.4913666666382
    },
    "logistics": {
      "distanceLabel": "About 6.2 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr depending on level, wind, and wood",
      "shuttle": "Stage the take-out at Carr's Landing near Hawarden, then drive to Oak Grove County Park / Big Sioux Park. Use the signed county/city access and parking areas at both ends.",
      "permits": "No route-specific paddling permit is known. Follow Sioux County Conservation / Oak Grove park hours and campground rules, City of Hawarden access rules at Carr's Landing, and any temporary closure or high-water guidance.",
      "camping": "Endpoint campground only. GFP's Jay Heath access layer marks Oak Grove County Park as Camping Yes and Carr's Landing as Camping No; MyCountyParks documents fee camping at Oak Grove / Big Sioux Park. Do not infer informal river camping or private-bank camping from the water trail.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from Oak Grove County Park and take out at Carr's Landing for the 6.2-mile lower Jay Heath Trail segment named by Sioux Empire Paddlers and supported by GFP access records. Use USGS 06485500 at Akron as the lower-corridor gauge and treat 400 cfs as the conservative low-water floor.",
      "accessCaveats": [
        "GFP's Jay Heath access layer marks Oak Grove County Park as Parking Yes, Launch Yes, Camping Yes, and a concrete launch surface managed by Sioux County Conservation.",
        "GFP's layer marks Carr's Landing as Parking Yes, Launch Yes, Camping No, and a concrete launch surface managed by the City of Hawarden.",
        "The route follows the Big Sioux border corridor. Stay within legal public access, respect private banks, and do not treat nearby road crossings or private ramps as casual bailout points.",
        "Do not extend this card toward Big Sioux County Park, Akron, or Sioux City without fresh route-distance, access, camping, and hazard review."
      ],
      "watchFor": [
        "Shallow bars, scraping, and slow current when the Akron gauge is below the 400 cfs community floor.",
        "Wood, strainers, bridge debris, bank mud, fences, or wire after rain or high water.",
        "Agricultural and urban water-quality concerns on the lower Big Sioux, especially after heavy rain or visible runoff.",
        "Open-border-river wind exposure, limited intermediate public egress, and muddy landings."
      ]
    },
    "accessPoints": [
      {
        "id": "oak-grove-county-park",
        "name": "Oak Grove County Park concrete launch",
        "latitude": 43.0618556830408,
        "longitude": -96.4709710186444,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 7; Parking Yes, Launch Yes, Camping Yes, concrete launch surface, Sioux County Conservation-managed."
      },
      {
        "id": "carrs-landing",
        "name": "Carr's Landing concrete launch",
        "latitude": 43.0108833331488,
        "longitude": -96.4913666666382,
        "mileFromStart": 6.2,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 6; Parking Yes, Launch Yes, Camping No, concrete launch surface, City of Hawarden-managed."
      }
    ]
  },
  "big-sioux-river-carrs-landing-big-sioux-county-park": {
    "putIn": {
      "name": "Carr's Landing concrete launch",
      "latitude": 43.0108833331488,
      "longitude": -96.4913666666382
    },
    "takeOut": {
      "name": "Big Sioux County Park concrete launch",
      "latitude": 42.8510666668239,
      "longitude": -96.5436833336961
    },
    "logistics": {
      "distanceLabel": "About 19 mi",
      "estimatedPaddleTime": "Long day; about 6 hr to 9 hr depending on level, wind, scouting, and stops",
      "shuttle": "Stage the take-out at Big Sioux County Park near Akron, then drive to Carr's Landing near Hawarden. Use signed county/city access and parking areas at both ends, and verify the Big Sioux Park road has not closed for flood or seasonal conditions before launching.",
      "permits": "No route-specific paddling permit is known. Follow City of Hawarden access rules at Carr's Landing, Plymouth County Conservation rules at Big Sioux County Park, posted road or hunting-season closures, and any temporary flood or high-water guidance.",
      "camping": "Nearby basecamp only. GFP's Jay Heath access layer marks Carr's Landing and Big Sioux County Park as Camping No. Nearby River's Bend Wildlife Area and Akron City Park have separate campground support, but do not infer informal river camping, private-bank camping, or endpoint camping for this route.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch from Carr's Landing and paddle the long lower Big Sioux border-river day segment to Big Sioux County Park near Akron. Use USGS 06485500 at Akron as the lower-corridor gauge and treat 400 cfs as the conservative low-water floor.",
      "accessCaveats": [
        "GFP's Jay Heath access layer marks Carr's Landing as Parking Yes, Launch Yes, Camping No, and a concrete launch surface managed by the City of Hawarden.",
        "GFP's layer marks Big Sioux County Park as Parking Yes, Launch Yes, Camping No, and a concrete launch surface managed by Plymouth County Conservation Board.",
        "MyCountyParks says Big Sioux Park's ramp is always open, but the road can close during some hunting seasons and during floods; verify the take-out road and ramp before committing to this long segment.",
        "The route follows the Big Sioux border corridor. Stay within legal public access, respect private banks, and do not treat road crossings, private ramps, or informal banks as casual bailout points."
      ],
      "watchFor": [
        "Shallow bars, scraping, and slow current when the Akron gauge is below the 400 cfs community floor.",
        "Wood, strainers, bridge debris, bank mud, fences, or wire after rain or high water.",
        "Agricultural and urban water-quality concerns on the lower Big Sioux, especially after heavy rain or visible runoff.",
        "A committed 19-mile day with open wind exposure, limited public egress, and muddy or flood-shifted landings."
      ]
    },
    "accessPoints": [
      {
        "id": "carrs-landing",
        "name": "Carr's Landing concrete launch",
        "latitude": 43.0108833331488,
        "longitude": -96.4913666666382,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 6; Parking Yes, Launch Yes, Camping No, concrete launch surface, City of Hawarden-managed."
      },
      {
        "id": "big-sioux-county-park",
        "name": "Big Sioux County Park concrete launch",
        "latitude": 42.8510666668239,
        "longitude": -96.5436833336961,
        "mileFromStart": 19,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 5; Parking Yes, Launch Yes, Camping No, concrete launch surface, Plymouth County Conservation Board-managed."
      }
    ]
  },
  "big-sioux-river-big-sioux-county-park-akron": {
    "putIn": {
      "name": "Big Sioux County Park concrete launch",
      "latitude": 42.85107412010523,
      "longitude": -96.54369171079088
    },
    "takeOut": {
      "name": "Akron concrete launch",
      "latitude": 42.829938010040166,
      "longitude": -96.56098008136513
    },
    "logistics": {
      "distanceLabel": "About 3.2 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr depending on level, wind, and wood",
      "shuttle": "Stage the take-out at the City of Akron concrete launch, then drive to Big Sioux County Park north of Akron. Use the signed county/city access and parking areas at both ends, and verify the Big Sioux Park road has not closed for flood or seasonal conditions before launching.",
      "permits": "No route-specific paddling permit is known. Follow Plymouth County Conservation rules at Big Sioux County Park, City of Akron access rules at the Akron launch, posted road or hunting-season closures, and any temporary flood or high-water guidance.",
      "camping": "Nearby basecamp only. GFP's Jay Heath access layer marks the selected Big Sioux County Park and Akron launch records as Camping No. Nearby River's Bend Wildlife Area and Akron City Park have separate campground support, but do not infer informal river camping, private-bank camping, or endpoint camping for this route.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch from Big Sioux County Park and paddle the short lower Big Sioux border-river segment to the City of Akron concrete launch. USGS 06485500 sits inside this reach, so use the Akron gauge as the direct same-day check and treat 400 cfs as the conservative low-water floor.",
      "accessCaveats": [
        "GFP's Jay Heath access layer marks Big Sioux County Park as Parking Yes, Launch Yes, Camping No, and a concrete launch surface managed by Plymouth County Conservation Board.",
        "GFP's layer marks Akron as Parking Yes, Launch Yes, Camping No, and a concrete launch surface managed by the City of Akron.",
        "MyCountyParks says Big Sioux Park's ramp is always open, but the road can close during some hunting seasons and during floods; verify the put-in road and ramp before committing.",
        "The route follows the Big Sioux border corridor. Stay within legal public access, respect private banks, and do not treat nearby road crossings, fee/private facilities, or informal banks as casual bailout points."
      ],
      "watchFor": [
        "Shallow bars, scraping, and slow current when the Akron gauge is below the 400 cfs community floor.",
        "Wood, strainers, bridge debris, bank mud, fences, or wire after rain or high water.",
        "Agricultural and urban water-quality concerns on the lower Big Sioux, especially after heavy rain or visible runoff.",
        "Short mileage but limited public egress, open wind exposure, muddy or flood-shifted landings, and a no-extension boundary at Akron."
      ]
    },
    "accessPoints": [
      {
        "id": "big-sioux-county-park",
        "name": "Big Sioux County Park concrete launch",
        "latitude": 42.85107412010523,
        "longitude": -96.54369171079088,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 5; Parking Yes, Launch Yes, Camping No, concrete launch surface, Plymouth County Conservation Board-managed."
      },
      {
        "id": "akron-concrete-launch",
        "name": "Akron concrete launch",
        "latitude": 42.829938010040166,
        "longitude": -96.56098008136513,
        "mileFromStart": 3.2,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 54; Parking Yes, Launch Yes, Camping No, concrete launch surface, City of Akron-managed."
      }
    ]
  },
  "big-sioux-river-akron-ron-wilmot": {
    "putIn": {
      "name": "Akron concrete launch",
      "latitude": 42.829938010040166,
      "longitude": -96.56098008136513
    },
    "takeOut": {
      "name": "Ron Wilmot River Access concrete launch",
      "latitude": 42.793412144267485,
      "longitude": -96.59396920107712
    },
    "logistics": {
      "distanceLabel": "About 7.5 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4.5 hr depending on level, wind, scouting, and wood",
      "shuttle": "Stage the take-out at Ron Wilmot River Access, then drive to the City of Akron concrete launch. Use signed city/county parking and access areas at both ends, and verify local flood, road, or hunting-season conditions before committing.",
      "permits": "No route-specific paddling permit is known. Follow City of Akron access rules, Plymouth County Conservation rules at Ron Wilmot River Access and nearby River's Bend Wildlife Area if camping, posted road or hunting-season closures, and any temporary flood or high-water guidance.",
      "camping": "Nearby basecamp only. GFP's Jay Heath access layer marks the selected Akron and Ron Wilmot launch records as Camping No. Nearby River's Bend Wildlife Area and Akron City Park have separate campground support, but do not infer endpoint, informal river, or private-bank camping for this route.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch from the City of Akron concrete launch and paddle the lower Big Sioux border-river segment to Ron Wilmot River Access. USGS 06485500 is near the put-in, so use the Akron gauge as the same-day check and treat 400 cfs as the conservative low-water floor.",
      "accessCaveats": [
        "GFP's Jay Heath access layer marks Akron as Parking Yes, Launch Yes, Camping No, and a concrete launch surface managed by the City of Akron.",
        "GFP's layer marks Ron Wilmot as Parking Yes, Launch Yes, Camping No, and a concrete launch surface managed by Plymouth County Conservation Board; MyCountyParks separately confirms a boat ramp and parking for Big Sioux River access.",
        "GFP maps River's Bend Wildlife Area as a campground record rather than a launch-supported Big Sioux river access. Use Ron Wilmot as the take-out and treat River's Bend only as separate nearby camping support.",
        "Do not substitute SD Highway 48, Lazy H Campground, River's Bend, IA-3/SD 50, private ramps, or informal banks as launch or take-out points without separate access and hazard review."
      ],
      "watchFor": [
        "Shallow bars, scraping, and slow current when the Akron gauge is below the 400 cfs community floor.",
        "Wood, strainers, bridge debris, bank mud, fences, or wire after rain or high water.",
        "Agricultural and urban water-quality concerns on the lower Big Sioux, especially after heavy rain or visible runoff.",
        "Open border-river wind exposure, limited public egress, muddy or flood-shifted landings, and a no-extension boundary at Ron Wilmot."
      ]
    },
    "accessPoints": [
      {
        "id": "akron-concrete-launch",
        "name": "Akron concrete launch",
        "latitude": 42.829938010040166,
        "longitude": -96.56098008136513,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 54; Parking Yes, Launch Yes, Camping No, concrete launch surface, City of Akron-managed."
      },
      {
        "id": "ron-wilmot-river-access",
        "name": "Ron Wilmot River Access concrete launch",
        "latitude": 42.793412144267485,
        "longitude": -96.59396920107712,
        "mileFromStart": 7.5,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 52; Parking Yes, Launch Yes, Camping No, concrete launch surface, Plymouth County Conservation Board-managed. MyCountyParks independently confirms a boat ramp and parking for Big Sioux River access."
      }
    ]
  },
  "big-sioux-river-ron-wilmot-ia-3-sd-50": {
    "putIn": {
      "name": "Ron Wilmot River Access concrete launch",
      "latitude": 42.793412144267485,
      "longitude": -96.59396920107712
    },
    "takeOut": {
      "name": "IA-3 / SD Hwy 50 concrete launch",
      "latitude": 42.7613907676865,
      "longitude": -96.63169172215292
    },
    "logistics": {
      "distanceLabel": "About 5.4 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr depending on level, wind, scouting, and wood",
      "shuttle": "Stage the take-out at the IA-3 / SD Hwy 50 concrete launch near Westfield, then drive to Ron Wilmot River Access south of Akron. Use signed county parking and access areas at both ends, and verify local flood, road, or hunting-season conditions before committing.",
      "permits": "No route-specific paddling permit is known. Follow Plymouth County Conservation rules at Ron Wilmot River Access, the IA-3 / SD Hwy 50 access, and nearby River's Bend Wildlife Area if camping, plus posted road or hunting-season closures and any temporary flood or high-water guidance.",
      "camping": "Nearby basecamp only. GFP's Jay Heath access layer marks the selected Ron Wilmot and IA-3 / SD Hwy 50 launch records as Camping No. Nearby River's Bend Wildlife Area and Lazy H Campground have separate campground support, but do not infer endpoint, informal river, or private-bank camping for this route.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch from Ron Wilmot River Access and paddle the lower Big Sioux border-river segment to the IA-3 / SD Hwy 50 concrete launch. USGS 06485500 at Akron is just upstream, so use that gauge as the same-day check and treat 400 cfs as the conservative low-water floor.",
      "accessCaveats": [
        "GFP's Jay Heath access layer marks Ron Wilmot as Parking Yes, Launch Yes, Camping No, and a concrete launch surface managed by Plymouth County Conservation Board; MyCountyParks separately confirms a boat ramp and parking for Big Sioux River access.",
        "GFP's layer marks IA-3 / SD Hwy 50 as Parking Yes, Launch Yes, Camping No, and a concrete launch surface managed by Plymouth County Conservation Board.",
        "GFP maps River's Bend Wildlife Area and Lazy H Campground as campground records rather than launch-supported Big Sioux river accesses. Treat them only as separate nearby camping support.",
        "Do not substitute IA-12, Missouri River Boat Club, Sioux City, the Missouri confluence, private ramps, fee/private accesses, or informal banks as launch or take-out points without separate access and hazard review."
      ],
      "watchFor": [
        "Shallow bars, scraping, and slow current when the Akron gauge is below the 400 cfs community floor.",
        "Wood, strainers, bridge debris, bank mud, fences, or wire after rain or high water.",
        "Agricultural and urban water-quality concerns on the lower Big Sioux, especially after heavy rain or visible runoff.",
        "Open border-river wind exposure, limited public egress, muddy or flood-shifted landings, and a no-extension boundary at IA-3 / SD Hwy 50."
      ]
    },
    "accessPoints": [
      {
        "id": "ron-wilmot-river-access",
        "name": "Ron Wilmot River Access concrete launch",
        "latitude": 42.793412144267485,
        "longitude": -96.59396920107712,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 52; Parking Yes, Launch Yes, Camping No, concrete launch surface, Plymouth County Conservation Board-managed. MyCountyParks independently confirms a boat ramp and parking for Big Sioux River access."
      },
      {
        "id": "ia-3-sd-highway-50",
        "name": "IA-3 / SD Hwy 50 concrete launch",
        "latitude": 42.7613907676865,
        "longitude": -96.63169172215292,
        "mileFromStart": 5.4,
        "segmentKind": "creek",
        "note": "GFP ArcGIS access record OID 3; Parking Yes, Launch Yes, Camping No, concrete launch surface, Plymouth County Conservation Board-managed."
      }
    ]
  },
  "split-rock-creek-split-rock-park-palisades": {
    "putIn": {
      "name": "Garretson Dam-below / Split Rock Park downstream canoe site",
      "latitude": 43.72150302399171,
      "longitude": -96.50201018523772
    },
    "takeOut": {
      "name": "Palisades-Cliffs canoe site",
      "latitude": 43.68815948689258,
      "longitude": -96.5202633017925
    },
    "logistics": {
      "distanceLabel": "About 3 mi",
      "estimatedPaddleTime": "Short moving-water run; time varies with level, scouting, and portages",
      "shuttle": "Use a short Garretson-area two-car shuttle between the Garretson Dam-below access at Split Rock Park and the Palisades-Cliffs canoe site inside Palisades State Park. Check Palisades State Park entry requirements and scout the take-out before launching because state-park traffic and creek levels can change the practical landing.",
      "permits": "No route-specific paddling permit is known. Follow City of Garretson rules at Split Rock Park and pay any required South Dakota state park entrance fee at Palisades.",
      "camping": "Endpoint-basecamp only. GFP's access layer lists Split Rock Park Campground and Palisades Campground as campground records, but this route should be treated as a short day run unless you have a separate campground reservation or legal overnight plan.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from the Garretson Dam-below access at Split Rock Park and paddle the short quartzite creek corridor to the Palisades-Cliffs canoe site. Use the USGS Corson gauge as a direct same-creek low-water check, but make the final call by scouting ledges, fences, and wood.",
      "accessCaveats": [
        "South Dakota GFP's CanoeTrails FeatureServer marks Garretson Dam-below as Parking Yes, Launch Yes, and a rock launch surface; do not launch above or near dam hydraulics without separate local scouting.",
        "South Dakota GFP's CanoeTrails FeatureServer marks Palisades-Cliffs as Parking Yes, Launch Yes, and a rock launch surface inside Palisades State Park. Confirm the practical landing and parking location on arrival, especially during busy warm-weather weekends.",
        "The stored coordinates are manager-published access anchors, not a substitute for on-site signs, current park rules, and same-day water-entry choices."
      ],
      "watchFor": [
        "Shallow scraping below the 4.5 ft Corson-gauge floor used by the app.",
        "Class I-II ledges and riffles, with Class III behavior possible near high flows around 1,000 cfs.",
        "Fences, strainers, downed trees, tight banks, and fast rain-driven rises on a small creek.",
        "Cold water in spring and shoulder seasons, plus busy state-park users near the take-out."
      ]
    },
    "accessPoints": [
      {
        "id": "garretson-dam-below",
        "name": "Garretson Dam-below / Split Rock Park downstream canoe site",
        "latitude": 43.72150302399171,
        "longitude": -96.50201018523772,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "GFP CanoeTrails FeatureServer access record OID 56; Parking Yes, Launch Yes, rock launch surface."
      },
      {
        "id": "palisades-cliffs-canoe-site",
        "name": "Palisades-Cliffs canoe site",
        "latitude": 43.68815948689258,
        "longitude": -96.5202633017925,
        "mileFromStart": 3,
        "segmentKind": "creek",
        "note": "GFP CanoeTrails FeatureServer access record OID 59; Parking Yes, Launch Yes, rock launch surface inside Palisades State Park."
      }
    ]
  },
  "spearfish-creek-city-park-jorgensen": {
    "putIn": {
      "name": "Spearfish City Park creek access",
      "latitude": 44.4829812,
      "longitude": -103.86117
    },
    "takeOut": {
      "name": "Jorgensen Park creek access",
      "latitude": 44.5048079,
      "longitude": -103.8663964
    },
    "logistics": {
      "distanceLabel": "About 3.3 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr depending on level, scouting, portages, and obstructions",
      "shuttle": "Stage the Jorgensen Park take-out first, then launch at the signed creek access near Spearfish City Park. Confirm current park hours, landing conditions, and any event or construction closures.",
      "permits": "No route-specific paddling permit is known. Follow City of Spearfish park rules and posted access restrictions.",
      "camping": "Endpoint camping only at the Spearfish City Campground; do not infer creek-bank camping or overnight access from the city park corridor.",
      "campingClassification": "endpoint_campground",
      "summary": "Use the Spearfish Creek town section only as a conditional, scouted Class II run. The direct USGS gauge and public city-park creek access make it searchable, but the park waterfall, low-head structures, fences, cold water, and limited bailout options require a conservative go/no-go decision.",
      "accessCaveats": [
        "City Park and Jorgensen Park list creek access, but landing space and bank conditions can change; use signed access and do not cross private property.",
        "The City Park waterfall and other ledges require scouting and may require a portage. Never assume a feature is runnable from a web description.",
        "Spearfish Creek can be diverted or altered by upstream infrastructure; use the direct gauge and local conditions rather than relying on seasonal averages.",
        "This route does not authorize continuation into Spearfish Canyon or downstream farmland; those reaches need separate access and hazard review."
      ],
      "watchFor": [
        "Shallow scraping below the 50 cfs minimum-only screen.",
        "The City Park waterfall, low-head structures, ledges, fences, strainers, and narrow banks.",
        "Cold water, fast rain-driven rises, and changing bridge or landing conditions.",
        "Private banks and limited bailout points downstream of the parks."
      ]
    }
  }
};
