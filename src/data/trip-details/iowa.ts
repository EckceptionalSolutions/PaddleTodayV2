// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const iowaRiverTripDetails: Record<string, RiverTripDetails> = {
  "north-raccoon-river-richey-hyde-park": {
    "putIn": {
      "id": "richey-access",
      "name": "Richey Access",
      "latitude": 42.09136,
      "longitude": -94.62949
    },
    "takeOut": {
      "id": "hyde-park-access",
      "name": "Hyde Park Access",
      "latitude": 42.1112,
      "longitude": -94.5758
    },
    "logistics": {
      "distanceLabel": "About 7.3 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr, longer with wood or low-water scouting",
      "shuttle": "Stage at Hyde Park Access and confirm the rock-dam boundary from land, then launch from Richey Access. Use Wright Access only after confirming it from land.",
      "permits": "No route-specific paddling permit is known. Use marked public accesses only, follow Iowa boating/PFD rules, and respect non-meandered-stream private-property limits.",
      "camping": "DNR describes both Richey and Hyde Park as campground-supported endpoints. Do not assume legal bank or sandbar camping between public areas.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Richey Access and paddle the Greene County North Raccoon through the Wright Access area to Hyde Park, ending before the rock dam.",
      "accessCaveats": [
        "Hyde Park is the planned take-out because DNR says paddlers should exit there to avoid the rock dam.",
        "The North Raccoon is non-meandered. Stay within public access areas and avoid informal exits on private banks."
      ],
      "watchFor": [
        "Downed trees and strainers.",
        "Low-water riffles or scraping.",
        "The Hyde Park rock-dam boundary."
      ]
    },
    "accessPoints": [
      {
        "id": "richey-access",
        "name": "Richey Access",
        "latitude": 42.09136,
        "longitude": -94.62949,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR identifies Richey as campground-supported public access."
      },
      {
        "id": "hyde-park-access",
        "name": "Hyde Park Access",
        "latitude": 42.1112,
        "longitude": -94.5758,
        "mileFromStart": 7.3,
        "segmentKind": "creek",
        "note": "Default take-out before the rock dam; DNR describes a cement ramp and campground support."
      }
    ]
  },
  "north-raccoon-river-hyde-park-mcmahon": {
    "putIn": {
      "id": "hyde-park-access",
      "name": "Hyde Park Access",
      "latitude": 42.1112,
      "longitude": -94.5758
    },
    "takeOut": {
      "id": "mcmahon-access",
      "name": "McMahon Access",
      "latitude": 42.022803252,
      "longitude": -94.4732312045
    },
    "logistics": {
      "distanceLabel": "About 13.5 mi",
      "estimatedPaddleTime": "Long day; plan 5 hr to 7 hr plus rock-dam and wood scouting",
      "shuttle": "Stage at McMahon Access east of Scranton on 230th Street, then launch from Hyde Park. Confirm Brown Bridge from land if using it as a bail-out.",
      "permits": "No route-specific paddling permit is known. Use marked public accesses only, follow Iowa boating/PFD rules, and respect non-meandered-stream private-property limits.",
      "camping": "Hyde Park provides endpoint campground support at the put-in. McMahon is documented as a day-use boat-ramp and fishing-riffle access.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Hyde Park and paddle the longer Greene County North Raccoon split through Brown Bridge to McMahon Access.",
      "accessCaveats": [
        "Start below or otherwise avoid the Hyde Park rock dam unless a land scout and skill assessment make conditions clearly appropriate.",
        "Brown Bridge is an official intermediate access and rock-dam area; confirm current public access from land.",
        "DNR places McMahon below another rock dam and notes no obvious portage on the map."
      ],
      "watchFor": [
        "Rock dams at Hyde Park, Brown Bridge, and near McMahon.",
        "Downed trees and log piles.",
        "Long rural mileage and limited alternate exits."
      ]
    },
    "accessPoints": [
      {
        "id": "hyde-park-access",
        "name": "Hyde Park Access",
        "latitude": 42.1112,
        "longitude": -94.5758,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR describes a cement ramp and campground support."
      },
      {
        "id": "brown-bridge-access",
        "name": "Brown Bridge Access",
        "latitude": 42.0673,
        "longitude": -94.5383,
        "mileFromStart": 6.7,
        "segmentKind": "creek",
        "note": "Intermediate access and rock-dam area named by DNR."
      },
      {
        "id": "mcmahon-access",
        "name": "McMahon Access",
        "latitude": 42.022803252,
        "longitude": -94.4732312045,
        "mileFromStart": 13.5,
        "segmentKind": "creek",
        "note": "Default take-out; MyCountyParks and Paddle Guide document McMahon as a public concrete boat ramp."
      }
    ]
  },
  "north-raccoon-river-henderson-squirrel-hollow": {
    "putIn": {
      "id": "henderson-park-access",
      "name": "Henderson Park Access",
      "latitude": 41.9698,
      "longitude": -94.3766
    },
    "takeOut": {
      "id": "squirrel-hollow-park",
      "name": "Squirrel Hollow Park",
      "latitude": 41.9822,
      "longitude": -94.3192
    },
    "logistics": {
      "distanceLabel": "About 8.2 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr, longer if the Squirrel Hollow portage or wood needs scouting",
      "shuttle": "Stage at Squirrel Hollow Park and identify the river-left portage/take-out corridor before launching from Henderson Park.",
      "permits": "No route-specific paddling permit is known. Use marked public accesses only, follow Iowa boating/PFD rules, and respect non-meandered-stream private-property limits.",
      "camping": "Squirrel Hollow Park has county park camping context near the take-out. Treat this as a day run unless current county rules confirm an overnight plan.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Henderson Park and paddle the missing Greene County North Raccoon connector to Squirrel Hollow Park.",
      "accessCaveats": [
        "DNR says no access signs are visible from the river; confirm Squirrel Hollow from land before launch.",
        "A rock dam sits above Squirrel Hollow with a signed river-left portage trail.",
        "Do not continue toward Adkins Bridge unless that downstream shuttle is also staged."
      ],
      "watchFor": [
        "The Squirrel Hollow rock dam and signed portage.",
        "Downed trees and log piles.",
        "Unsigned public accesses and private banks."
      ]
    },
    "accessPoints": [
      {
        "id": "henderson-park-access",
        "name": "Henderson Park Access",
        "latitude": 41.9698,
        "longitude": -94.3766,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR describes Henderson as a maintained public access with a cement ramp and large parking area."
      },
      {
        "id": "squirrel-hollow-park",
        "name": "Squirrel Hollow Park",
        "latitude": 41.9822,
        "longitude": -94.3192,
        "mileFromStart": 8.2,
        "segmentKind": "creek",
        "note": "Default take-out; DNR says a rock dam above the park has a signed portage trail on river left."
      }
    ]
  },
  "north-raccoon-river-rainbow-bend-richey": {
    "putIn": {
      "id": "rainbow-bend-access",
      "name": "Rainbow Bend Access",
      "latitude": 42.22859,
      "longitude": -94.75616
    },
    "takeOut": {
      "id": "richey-access",
      "name": "Richey Access",
      "latitude": 42.09136,
      "longitude": -94.62949
    },
    "logistics": {
      "distanceLabel": "About 18.1 mi",
      "estimatedPaddleTime": "Long day; plan 6 hr to 8 hr plus scouting and access carries",
      "shuttle": "Stage the take-out at Richey Access north of Ralston, then drive back to Rainbow Bend south of Lake City. Confirm the take-out from land because DNR says it is difficult to see from the river.",
      "permits": "No route-specific paddling permit is known. Use the marked public accesses only, follow Iowa boating/PFD rules, and respect non-meandered-stream private-property limits.",
      "camping": "Endpoint camping support is available at Rainbow Bend and Richey Access according to the DNR guide, with toilets noted at both. Do not assume legal sandbar or bank camping between accesses.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Rainbow Bend and paddle the long upper North Raccoon stretch through Hobbs, North Raccoon River, and Merritt access context to Richey. This is a scenic but committed water-trail day with wood, riffles, unsigned accesses, and private-bank limits.",
      "accessCaveats": [
        "Rainbow Bend no longer has the older ramp; DNR says paddlers should carry a short distance to the sand/silt beach.",
        "Hobbs and Merritt are heavily riprapped with cement waste and are difficult for entry or exit; do not plan them as easy bailout points.",
        "North Raccoon River Access has the best ramp/eddy in the middle of the route, but Richey is hard to spot from the water and its mowed path ends in a vertical drop."
      ],
      "watchFor": [
        "Numerous downed trees, especially when the current is high and swift.",
        "Riffles, rock-dam context, unsigned accesses, and private banks outside public areas.",
        "Long mileage, rural rescue exposure, and no easy alternate take-out if you miss Richey."
      ]
    },
    "accessPoints": [
      {
        "id": "rainbow-bend-access",
        "name": "Rainbow Bend Access",
        "latitude": 42.22859,
        "longitude": -94.75616,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR says camping and toilets are available but the old ramp is gone and boats must be carried to the sand/silt beach."
      },
      {
        "id": "north-raccoon-river-access-carroll",
        "name": "North Raccoon River Access",
        "latitude": 42.159,
        "longitude": -94.692,
        "mileFromStart": 9,
        "segmentKind": "creek",
        "note": "Intermediate access named by DNR as excellent, with a protected eddy to the cement ramp; mileage is approximate within the 18.1-mile section."
      },
      {
        "id": "richey-access",
        "name": "Richey Access",
        "latitude": 42.09136,
        "longitude": -94.62949,
        "mileFromStart": 18.1,
        "segmentKind": "creek",
        "note": "Default take-out; DNR says camping and toilets are available, but the access is difficult to see from the river."
      }
    ]
  },
  "iowa-river-tailwater-east-sturgis-ferry": {
    "putIn": {
      "id": "tailwater-east-public-boat-ramp",
      "name": "Tailwater East public boat ramp below Coralville Dam",
      "latitude": 41.7249,
      "longitude": -91.5257
    },
    "takeOut": {
      "id": "sturgis-ferry-park",
      "name": "Sturgis Ferry Park boat ramp",
      "latitude": 41.64132,
      "longitude": -91.53877
    },
    "logistics": {
      "distanceLabel": "About 7 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, faster with higher releases",
      "shuttle": "Stage at Sturgis Ferry Park in Iowa City, then launch only from the Tailwater East ramp below Coralville Dam. Check USACE recreation status and current releases before unloading.",
      "permits": "No route-specific paddling permit is known. Tailwater East may require Corps day-use or camping fees; follow USACE postings, Iowa City park rules, and Iowa boating/PFD requirements.",
      "camping": "Tailwater East Campground has campsites, restrooms, showers, and the boat ramp near the put-in. Treat the Sturgis Ferry finish as day-use; do not assume on-route camping.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at the public Corps ramp below Coralville Dam and take out at Sturgis Ferry Park before the longer Johnson County water-trail segment. Keep this framed as a below-dam connector with release checks and a firm downstream take-out.",
      "accessCaveats": [
        "Do not launch above the dam or paddle upstream toward the dam tailwater. Use only the public ramp below the dam.",
        "USACE recreation status lists the Tailwater East public boat ramp open but notes no courtesy dock; expect a practical ramp launch rather than a dock launch.",
        "Sturgis Ferry is a city park boat-ramp take-out; orient inside the park because the saved point is an access-area anchor."
      ],
      "watchFor": [
        "Changing dam releases, cold water, debris, and stronger current after rain or reservoir operations.",
        "Urban bridges and developed river edges approaching Iowa City.",
        "Missing Sturgis Ferry and unintentionally continuing into the longer Sturgis-to-Hills segment."
      ]
    },
    "accessPoints": [
      {
        "id": "tailwater-east-public-boat-ramp",
        "name": "Tailwater East public boat ramp below Coralville Dam",
        "latitude": 41.7249,
        "longitude": -91.5257,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Public Corps ramp for the Iowa River below Coralville Dam; no courtesy dock per USACE status."
      },
      {
        "id": "sturgis-ferry-park",
        "name": "Sturgis Ferry Park boat ramp",
        "latitude": 41.64132,
        "longitude": -91.53877,
        "mileFromStart": 7,
        "segmentKind": "creek",
        "note": "Default take-out before the existing Sturgis Ferry to Hills Access route."
      }
    ]
  },
  "shell-rock-river-strand-wilkinson": {
    "putIn": {
      "id": "strand-park-canoe-access",
      "name": "Strand Park canoe access",
      "latitude": 43.2541296,
      "longitude": -93.1218702
    },
    "takeOut": {
      "id": "wilkinson-pioneer-park-launch",
      "name": "Wilkinson Pioneer Park canoe/kayak launch",
      "latitude": 43.1916328,
      "longitude": -93.0668688
    },
    "logistics": {
      "distanceLabel": "About 8 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr, longer if low-water riffles require wading",
      "shuttle": "Stage at Wilkinson Pioneer Park near Rock Falls, then drive back to Strand Park north of Plymouth. Check both county park access points before launching because the gauge is downstream at Shell Rock.",
      "permits": "No route-specific paddling permit is known. Follow Cerro Gordo County park rules, Iowa boating/PFD requirements, and private-property boundaries along the river.",
      "camping": "Wilkinson Pioneer Park has campground support near the take-out, and the broader Shellrock River Greenbelt has primitive camping areas. Do not assume legal camping on private banks between parks.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Strand Park and paddle through the upper Shellrock River Greenbelt corridor to Wilkinson Pioneer Park. This is a county-access day run with limestone scenery, shallow ledges at lower flows, and same-day wood checks.",
      "accessCaveats": [
        "Strand Park and Wilkinson Pioneer Park are named public access areas, but the Shell Rock gauge is far downstream and should be treated as a same-river proxy.",
        "Wilkinson has campground and canoe/kayak launch context; confirm current campground rules and seasonal reservation requirements before relying on overnight support.",
        "Use public parks and signed access corridors only; avoid informal bank exits on private land."
      ],
      "watchFor": [
        "Scraping and short wades when the Shell Rock gauge is below the 1,000 cfs low-water floor from prior route guidance.",
        "Downed trees, bridge debris, and faster current after rain.",
        "Limestone shelves, cobble shallows, and limited public exits between Strand and Wilkinson."
      ]
    },
    "accessPoints": [
      {
        "id": "strand-park-canoe-access",
        "name": "Strand Park canoe access",
        "latitude": 43.2541296,
        "longitude": -93.1218702,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default public put-in north of Plymouth on the Shellrock River."
      },
      {
        "id": "wilkinson-pioneer-park-launch",
        "name": "Wilkinson Pioneer Park canoe/kayak launch",
        "latitude": 43.1916328,
        "longitude": -93.0668688,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Default take-out and campground support area near Rock Falls."
      }
    ]
  },
  "lizard-creek-lentsch-cunningham": {
    "putIn": {
      "id": "lentsch-access",
      "name": "Lentsch Access",
      "latitude": 42.53987,
      "longitude": -94.34342
    },
    "takeOut": {
      "id": "cunningham-access",
      "name": "Cunningham Access",
      "latitude": 42.53134,
      "longitude": -94.30474
    },
    "logistics": {
      "distanceLabel": "About 3.1 mi",
      "estimatedPaddleTime": "Short run; allow extra time for scouting, bony riffles, and access carries",
      "shuttle": "Stage the take-out at Cunningham Access on Hayes Avenue, then drive back to Lentsch Access at Fairbanks Avenue and 175th Street. Inspect both gravel trails and the gauge trend before unloading because Lizard Creek can rise or drop quickly.",
      "permits": "No route-specific paddling permit is known. Use only the public water-trail accesses, follow Iowa boating and PFD rules, and obey posted Webster County / Iowa DNR access rules.",
      "camping": "No on-route camping. Iowa DNR says Lizard Creek is non-meandered and adjacent land and streambed outside public areas are private; do not camp or picnic on banks or bars between accesses.",
      "campingClassification": "none",
      "summary": "Launch at Lentsch Access and take out three miles downstream at Cunningham Access. This is the shortest Lizard Creek split, but Iowa DNR still describes it as fast, rocky, and not for beginners.",
      "accessCaveats": [
        "Both Lentsch and Cunningham are well-marked public water-trail accesses with parking and graveled trails, but same-day mud, debris, or high-water damage can still affect usability.",
        "The Fort Dodge gauge is direct but located downstream near Rasch / Johnson Avenue, so make a visual check at Lentsch before committing.",
        "Do not use private banks for routine scouting, breaks, or camping. The DNR brochure explicitly says Lizard Creek is non-meandered and private outside public accesses."
      ],
      "watchFor": [
        "Low stages below 5 ft, when boulders and riffles can scrape, pin boats, or require short carries.",
        "Fast rises after rain, hidden boulders at higher water, strainers, overhanging trees, cold water, and abrupt bends.",
        "Large glacial erratics, shallow ledges, 4- to 5-foot holes, and limited legal exits between the named public accesses."
      ]
    },
    "accessPoints": [
      {
        "id": "lentsch-access",
        "name": "Lentsch Access",
        "latitude": 42.53987,
        "longitude": -94.34342,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at Fairbanks Avenue and 175th Street."
      },
      {
        "id": "cunningham-access",
        "name": "Cunningham Access",
        "latitude": 42.53134,
        "longitude": -94.30474,
        "mileFromStart": 3.1,
        "segmentKind": "creek",
        "note": "Default take-out downstream of the Hayes Avenue bridge."
      }
    ]
  },
  "lizard-creek-cunningham-rasch": {
    "putIn": {
      "id": "cunningham-access",
      "name": "Cunningham Access",
      "latitude": 42.53134,
      "longitude": -94.30474
    },
    "takeOut": {
      "id": "rasch-access",
      "name": "Rasch Access",
      "latitude": 42.529,
      "longitude": -94.25635
    },
    "logistics": {
      "distanceLabel": "About 5.2 to 5.5 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with fence scouting, low water, or wood",
      "shuttle": "Stage the take-out at Rasch Access on Johnson Avenue, then drive back to Cunningham Access on Hayes Avenue. Identify the take-out before launching because the creek is twisty and private banks limit informal exits.",
      "permits": "No route-specific paddling permit is known. Use only the public water-trail accesses, follow Iowa boating and PFD rules, and obey posted Webster County / Iowa DNR access rules.",
      "camping": "No on-route camping. Iowa DNR says Lizard Creek is non-meandered and adjacent land and streambed outside public areas are private; do not camp or stop on pasture banks or bars except in an emergency.",
      "campingClassification": "none",
      "summary": "Launch at Cunningham Access and take out at Rasch Access for the middle Lizard Creek split. This reach has swift riffles, electric-fence hazards, a debris-prone railroad bridge, cattle-pasture water-quality caveats, and private-bank constraints.",
      "accessCaveats": [
        "Cunningham and Rasch are both documented public accesses with parking, signage, and graveled paths, but same-day access condition still controls.",
        "The DNR brochure says there are marked and unmarked electric fences downstream of Cunningham. Be prepared to stop safely where legal and portage or duck only when conditions are clearly safe.",
        "The selected USGS gauge is at the downstream Johnson Avenue / Rasch corridor, so it is direct for the take-out area but cannot show fence clearance, logs, or cattle in the creek."
      ],
      "watchFor": [
        "Electric fences over the stream, rocky riffles, a sharp bend, and a railroad bridge with brush and logs piled against supports.",
        "Low stages below 5 ft, when riffles become bony, and high/rising water, when fences, bridge piers, and strainers become harder to avoid.",
        "Cattle in the creek, warmer or more turbid water below pasture, private banks, cold-water exposure, and limited legal exits."
      ]
    },
    "accessPoints": [
      {
        "id": "cunningham-access",
        "name": "Cunningham Access",
        "latitude": 42.53134,
        "longitude": -94.30474,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in downstream of Hayes Avenue."
      },
      {
        "id": "rasch-access",
        "name": "Rasch Access",
        "latitude": 42.529,
        "longitude": -94.25635,
        "mileFromStart": 5.2,
        "segmentKind": "creek",
        "note": "Default take-out at Johnson Avenue and the direct USGS gauge corridor."
      }
    ]
  },
  "lizard-creek-rasch-phinney": {
    "putIn": {
      "id": "rasch-access",
      "name": "Rasch Access",
      "latitude": 42.529,
      "longitude": -94.25635
    },
    "takeOut": {
      "id": "phinney-park",
      "name": "Phinney Park",
      "latitude": 42.51154,
      "longitude": -94.20464
    },
    "logistics": {
      "distanceLabel": "About 5.6 to 6 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with low water, scouting, or portages",
      "shuttle": "Stage the take-out at Phinney Park off Phinney Park Drive, then drive back to Rasch Access on Johnson Avenue. Treat Phinney as the planned finish just above the Des Moines River confluence unless your group has a separate lower-river plan.",
      "permits": "No route-specific paddling permit is known. Use only the public water-trail accesses, follow Iowa boating and PFD rules, and obey posted Webster County / Iowa DNR access rules.",
      "camping": "No on-route camping. Iowa DNR says Lizard Creek is non-meandered and private outside public areas, and this lower reach finishes in the Fort Dodge corridor rather than a camping corridor.",
      "campingClassification": "none",
      "summary": "Launch at Rasch Access and take out at Phinney Park for the hardest Lizard Creek split. Iowa DNR rates this reach advanced, with at least 25 rocky riffles or rapids and a final approach just above the Des Moines River.",
      "accessCaveats": [
        "Rasch is the preferred put-in for the lower challenge reach and sits near the selected direct USGS gauge. Confirm the gauge trend and the creek visually before launching.",
        "Phinney Park is on river right a few hundred yards above the Des Moines River confluence. Identify the landing and do not drift past it unless intentionally continuing on a separate Des Moines River plan.",
        "The lower corridor passes highway bridges and an industrial Fort Dodge zone. Expect more debris and water-quality uncertainty than the upper wooded reaches."
      ],
      "watchFor": [
        "At least 25 rocky riffles or rapids, including Class 2-style features in the final mile noted by American Whitewater.",
        "Fallen trees, sweepers, bridge abutments, rock gardens, hidden boulders, and fast post-rain rises.",
        "Low stages below 5 ft, when carries and pinning risk increase, and stages above 8 ft, when AW guidance no longer supports a normal app recommendation."
      ]
    },
    "accessPoints": [
      {
        "id": "rasch-access",
        "name": "Rasch Access",
        "latitude": 42.529,
        "longitude": -94.25635,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at Johnson Avenue and the direct USGS gauge corridor."
      },
      {
        "id": "phinney-park",
        "name": "Phinney Park",
        "latitude": 42.51154,
        "longitude": -94.20464,
        "mileFromStart": 5.6,
        "segmentKind": "creek",
        "note": "Default river-right take-out just above the Des Moines River confluence."
      }
    ]
  },
  "iowa-river-sturgis-ferry-hills-access": {
    "putIn": {
      "name": "Sturgis Ferry Park boat ramp (Iowa City)",
      "latitude": 41.640199994977,
      "longitude": -91.538966712124
    },
    "takeOut": {
      "name": "Hills Access & Campground (Johnson County Conservation)",
      "latitude": 41.5544618,
      "longitude": -91.5257829
    },
    "logistics": {
      "distanceLabel": "9.25 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr 30 min",
      "shuttle": "Two-car shuttle is the practical choice. The road shuttle is simple, so stage the take-out vehicle at Hills before launching from Iowa City.",
      "permits": "No route-specific paddling permit is known. Follow posted Iowa City park rules at Sturgis Ferry and Johnson County access and camping rules at Hills.",
      "camping": "Hills Access offers 13 electric and 7 non-electric campsites, with the campground typically open from April 15 to October 15.",
      "summary": "Launch at Sturgis Ferry Park and finish at Hills Access for the first Johnson County Iowa River Water Trail segment. Expect a more developed Iowa City start, then quieter bottomland miles before the county-ramp finish at Hills.",
      "accessCaveats": [
        "Sturgis Ferry Park is an official city boat-ramp park, but the saved point is tied to the park address rather than a separate launch GIS record, so expect to orient inside the park on arrival.",
        "Hills Access has stronger endpoint detail than most county take-outs, including a published coordinate, boat-ramp confirmation, campground operations information, and vault toilets.",
        "Johnson County notes that the area east of the river at Hills is archery- or falconry-only for hunting, so treat side exploration near the take-out conservatively during hunting seasons."
      ],
      "watchFor": [
        "Fresh sweepers, downed trees, or floating debris after rain.",
        "Muddy or soft banks at breaks and at the Hills take-out.",
        "A longer-feeling day than the difficulty label suggests if the gauge is hovering near the floor."
      ]
    }
  },
  "des-moines-river-bentonsport-bonaparte": {
    "putIn": {
      "name": "Bentonsport Park / Bentonsport Boat Ramp",
      "latitude": 40.72454,
      "longitude": -91.85125
    },
    "takeOut": {
      "name": "Bonaparte Riverfront Park / Bonaparte Boat Ramp",
      "latitude": 40.69785,
      "longitude": -91.80552
    },
    "logistics": {
      "distanceLabel": "3.6 to 5 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, plus time for rock bars and historic stops",
      "shuttle": "Use a short two-car shuttle between Bentonsport Park and Bonaparte Riverfront / City Park. The road shuttle follows local roads in Van Buren County and is short enough that most groups will spend more time staging boats than driving.",
      "permits": "No route-specific paddling permit is known. Follow Van Buren County, City of Bonaparte, and posted Lower Des Moines River Water Trail access rules at both ramps.",
      "camping": "Bentonsport Park has county campground facilities nearby, but treat camping as a separate reservation or county-park plan rather than part of the day paddle. Bonaparte is best treated as a take-out and town stop.",
      "summary": "Launch at Bentonsport Park and paddle the Lower Des Moines River downstream to Bonaparte Riverfront Park. This short historic-village segment is best when lower water exposes riffles, rock bars, and geode-hunting stops without making the route a scrape-heavy walk.",
      "accessCaveats": [
        "Bentonsport Park is a county park with a public boat ramp on the Lower Des Moines River Water Trail, but the saved coordinate is park/access-area context rather than a ramp-survey point.",
        "Bonaparte Riverfront / City Park is the public riverfront take-out context; use posted local signs for the exact boat-ramp approach and parking.",
        "The Des Moines River is meandered here, but private property begins above the ordinary high-water mark. Keep stops to legal bars, public parkland, and clearly public access areas."
      ],
      "watchFor": [
        "Old lock-and-dam remnants and riffles near Bentonsport and Bonaparte, especially when low water exposes more rock.",
        "Walking or dragging boats when the Keosauqua gauge is around 700 to 800 cfs or lower.",
        "Rock bars disappearing and current getting less beginner-friendly above roughly 6,000 cfs on the Keosauqua gauge.",
        "Large-river wind, floating debris after rain, motorboat traffic, and soft or muddy landings."
      ]
    }
  },
  "des-moines-river-keosauqua-bentonsport": {
    "putIn": {
      "id": "keosauqua-boat-ramp",
      "name": "Keosauqua Boat Ramp",
      "latitude": 40.7291,
      "longitude": -91.962
    },
    "takeOut": {
      "id": "bentonsport-boat-ramp",
      "name": "Bentonsport Park / Bentonsport Boat Ramp",
      "latitude": 40.72454,
      "longitude": -91.85125
    },
    "logistics": {
      "distanceLabel": "8.6 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with sandbar stops or low water",
      "shuttle": "Stage the take-out at Bentonsport Park, then drive back to the Keosauqua riverfront boat ramp near Hotel Manning. Inspect the Keosauqua launch first because rock and old dam remains just downstream can change the start line.",
      "permits": "No route-specific paddling permit is known. Follow posted Keosauqua, Van Buren County, and Lower Des Moines River Water Trail access rules, and carry required Iowa boating safety gear.",
      "camping": "Iowa DNR says sandbar camping is allowed on meandered streams such as the Lower Des Moines, and Lacey-Keosauqua/Bentonsport park camping can support a basecamp. Keep any river camping below the high-water mark and away from private uplands.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at Keosauqua and paddle the official Lower Des Moines River Water Trail around the 8.6-mile horseshoe bend to Bentonsport. The reach has bluff and rock scenery, but release-driven flow, old dam remains, and private uplands require a current gauge and landing check.",
      "accessCaveats": [
        "Keosauqua is the named public boat-ramp start in the Iowa DNR guide; the saved coordinate is a practical access-area anchor near the riverfront ramp rather than a survey point.",
        "Bentonsport Park is the same county water-trail access used by the existing downstream Bentonsport-to-Bonaparte card.",
        "Use legal sandbars and public land only. Iowa DNR says private property begins at the high-water mark on the Lower Des Moines."
      ],
      "watchFor": [
        "Old dam remains, rough water, and rock obstructions just below Keosauqua, especially at lower water.",
        "High or fast water from Red Rock release management; current can change without local rainfall.",
        "Bridge pilings, floating wood, silver carp, muddy landings, wind, and cold-water exposure.",
        "The current model is borrowed from adjacent lower-river Keosauqua-gauge guidance, so make a same-day visual call before launching."
      ]
    },
    "accessPoints": [
      {
        "id": "keosauqua-boat-ramp",
        "name": "Keosauqua Boat Ramp",
        "latitude": 40.7291,
        "longitude": -91.962,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Official Lower Des Moines water-trail put-in near Hotel Manning."
      },
      {
        "id": "bentonsport-boat-ramp",
        "name": "Bentonsport Park / Bentonsport Boat Ramp",
        "latitude": 40.72454,
        "longitude": -91.85125,
        "mileFromStart": 8.6,
        "segmentKind": "creek",
        "note": "County park and Lower Des Moines River Water Trail access."
      }
    ]
  },
  "south-skunk-river-lekwa-sopers-mill": {
    "putIn": {
      "name": "Lekwa Access #242",
      "latitude": 42.1819,
      "longitude": -93.5708
    },
    "takeOut": {
      "name": "Soper's Mill Access #235",
      "latitude": 42.1044299,
      "longitude": -93.5754935
    },
    "logistics": {
      "distanceLabel": "About 7.3 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, plus scouting or portage time",
      "shuttle": "Use a two-car shuttle between Lekwa Access on 130th Street / E-18 south of Story City and Soper's Mill on 170th Street north of Ames. The road shuttle is straightforward, but scout the Soper's Mill take-out and riffle before launching.",
      "permits": "No route-specific paddling permit is known. Follow posted Story County Conservation rules and park hours at both access areas.",
      "camping": "Treat this as a day route. No on-route camping is assumed, and most adjoining land outside public access and greenbelt areas is private.",
      "summary": "Launch at Lekwa Access and paddle the official South Skunk River Water Trail downstream through the Story County greenbelt to Soper's Mill. This is a scenic but guarded above-Ames run where enough water, wood scouting, and private-bank discipline matter more than mileage.",
      "accessCaveats": [
        "Lekwa Access is a public county water-trail access near the E-18 / 130th Street bridge; the saved point is an access-area coordinate anchored to the named access, address, and bridge corridor rather than a ramp-survey point.",
        "Soper's Mill is a public Story County access with launch options above or below the constructed riffle; decide where to land based on level, skill, and posted access signs.",
        "The South Skunk is non-meandered through this corridor; stay with public accesses and confirmed greenbelt or parkland rather than assuming banks are public."
      ],
      "watchFor": [
        "Log jams and fresh strainers, which county guidance says are usual between Story City and Soper's Mill.",
        "Shallow rock riffles and scraping when the Ames gauge is below the local 125 cfs floor.",
        "The constructed Soper's Mill riffle at the take-out, especially if the gauge is high, rising, or muddy.",
        "Limited intermediate exits and private-bank constraints between public access points."
      ]
    }
  },
  "south-skunk-river-sleepy-hollow-river-valley": {
    "putIn": {
      "name": "Sleepy Hollow access / W Riverside Road",
      "latitude": 42.06658,
      "longitude": -93.62025
    },
    "takeOut": {
      "name": "River Valley Park access, Ames",
      "latitude": 42.03535,
      "longitude": -93.59895
    },
    "logistics": {
      "distanceLabel": "About 2.9 mi",
      "estimatedPaddleTime": "About 1 hr to 1 hr 45 min",
      "shuttle": "Use a short two-car shuttle between Sleepy Hollow on W Riverside Road and River Valley Park on 13th Street. The road shuttle is simple, but parking can compete with park and ballfield use.",
      "permits": "No route-specific paddling permit is known. Follow Story County / City of Ames access rules and posted park hours.",
      "camping": "Treat this as a short day run. No route camping is indicated, and much adjoining land is private.",
      "summary": "Launch at Sleepy Hollow beside the South Skunk near Ames gauge and finish at River Valley Park. This is a compact north Ames water-trail segment with enough riffle and dam-mitigation context to deserve a same-day gauge and hazard check.",
      "accessCaveats": [
        "Sleepy Hollow is listed as a public water-trail access at W Riverside Road, and the saved coordinate is anchored to the adjacent USGS gauge / bridge corridor.",
        "River Valley Park is an official City of Ames park with boat access, but the saved take-out point is an access-area coordinate from named park and map context rather than a published ramp GIS point.",
        "The South Skunk is non-meandered through this corridor; use public accesses and confirmed public parkland rather than assuming banks are public."
      ],
      "watchFor": [
        "Shallow rock riffles and scraping when the gauge is below the local 125 cfs floor.",
        "Fresh wood, sweepers, and fast-changing muddy banks after storms.",
        "The 13th Street mitigated-dam / paddler-passage feature at River Valley Park; scout if levels or skills are uncertain."
      ]
    }
  },
  "south-skunk-river-sopers-mill-peterson-park": {
    "putIn": {
      "name": "Soper's Mill Access #235",
      "latitude": 42.1044299,
      "longitude": -93.5754935
    },
    "takeOut": {
      "name": "Peterson Park West Access #233",
      "latitude": 42.0847077,
      "longitude": -93.5974389
    },
    "logistics": {
      "distanceLabel": "About 2.9 mi",
      "estimatedPaddleTime": "About 1 hr to 1.5 hr",
      "shuttle": "Use a short two-car shuttle between Soper's Mill on 170th Street and Peterson Park West on 180th Street. The road shuttle is simple, but scout Peterson's river access before launching because the broader park also includes ponds and a beach.",
      "permits": "No route-specific paddling permit is known. Follow posted Story County Conservation rules and park hours at both access areas.",
      "camping": "Treat this as a short day route. No on-route camping is assumed, and much adjoining land is private.",
      "summary": "Launch at Soper's Mill Access and paddle the official South Skunk River Water Trail downstream to Peterson Park West Access. This short wooded Story County leg has a renovated launch, a constructed riffle at Soper's Mill, gravel riffles, and enough wood potential to require a same-day gauge and hazard check.",
      "accessCaveats": [
        "Soper's Mill has north and south parking areas; use the south/water-trail access for the paddle launch, and choose above or below the constructed riffle based on level and skill.",
        "Peterson Park West is a public Story County park with Skunk River Water Trail Canoe Access, but the saved coordinate is park/access-area context rather than a published ramp GIS point.",
        "The South Skunk is non-meandered through this corridor; stay with public accesses and confirmed parkland rather than assuming banks are public."
      ],
      "watchFor": [
        "The constructed Soper's Mill riffle and other shallow rock riffles, especially below the 125 cfs local floor.",
        "Trees, sweepers, and strainers that can change after storms or volunteer clearing work.",
        "Faster, muddier current when the Ames gauge is high or rising; no trusted source found gives a broad recreational upper band for this route."
      ]
    }
  },
  "south-skunk-river-ames-13th-street": {
    "putIn": {
      "name": "River Valley Park / 13th Street play feature",
      "latitude": 42.03535,
      "longitude": -93.59895
    },
    "takeOut": {
      "name": "River Valley Park / walk-back access",
      "latitude": 42.03535,
      "longitude": -93.59895
    },
    "logistics": {
      "distanceLabel": "0.074 mi / play-park laps",
      "estimatedPaddleTime": "Play-park session; laps vary by level and skill",
      "shuttle": "No vehicle shuttle is needed for normal play sessions. Park at River Valley Park on 13th Street, scout from shore, and use the public park access and walk-back paths for repeated laps.",
      "permits": "No route-specific paddling permit is known. Follow City of Ames park hours, posted signs, and South Skunk River Water Trail access rules.",
      "camping": "Treat this as a short day-use play feature. No on-route camping is assumed, and nearby banks outside public parkland may be private.",
      "summary": "Use the 13th Street mitigated low-head-dam feature in North River Valley Park for a compact South Skunk whitewater skills session. American Whitewater ties the feature to the South Skunk near Ames gauge and describes 400+ cfs as the level where surfing and spins appear.",
      "accessCaveats": [
        "This is a play feature inside River Valley Park rather than a downstream shuttle route; use the same public park area for launch, take-out, scouting, and walking back.",
        "The saved coordinate is an access-area coordinate from the existing River Valley Park / Story County #227 route context, not a surveyed eddy or ramp point.",
        "City of Ames lists boat access at River Valley Park, and Story County lists River Valley Park #227 as a South Skunk River Water Trail access, but paddlers should still follow posted signs and avoid informal private-bank exits."
      ],
      "watchFor": [
        "Shallow rock features that can punish missed rolls or upside-down impacts, even when the gauge is high enough for play.",
        "Fast rises, muddy water, and debris after rain on the South Skunk watershed.",
        "Tubers, casual swimmers, anglers, and park users near the 13th Street feature; American Whitewater reports specifically caution against tubing this feature.",
        "Low-water scraping below the 400 cfs play threshold and pushier, less forgiving hydraulics during high or rising water."
      ]
    }
  },
  "south-skunk-river-river-valley-cj-shreck": {
    "putIn": {
      "name": "River Valley Park access, Ames",
      "latitude": 42.03535,
      "longitude": -93.59895
    },
    "takeOut": {
      "name": "C.J. Shreck Access",
      "latitude": 41.9053,
      "longitude": -93.5314
    },
    "logistics": {
      "distanceLabel": "About 13 mi",
      "estimatedPaddleTime": "About 4 hr 30 min to 6 hr, longer with low water, portages, or wood scouting",
      "shuttle": "Use a vehicle shuttle from C.J. Shreck Access on Highway 210 back to River Valley Park in Ames. Inspect C.J. Shreck first because the lower access is a simple county water-trail landing and 2026 access work may affect parking or the carry path.",
      "permits": "No route-specific paddling permit is known. Follow City of Ames, Story County Conservation, and posted South Skunk River Water Trail access rules.",
      "camping": "Treat this as a day trip. Story County lists the lower water-trail accesses as day-use access points, and no on-route camping is assumed.",
      "campingClassification": "none",
      "summary": "Launch at River Valley Park and take out at C.J. Shreck for the lower Ames-to-Cambridge South Skunk run. This route uses the direct Ames gauge, but dams, constructed riffles, private banks, and fresh wood still drive the safety call.",
      "accessCaveats": [
        "River Valley Park is also the 13th Street play-feature area. Start below or downstream of the feature unless your group has intentionally scouted and chosen the whitewater line.",
        "The lower route passes the South 16th Street, 265th Street, and Askew Bridge / Cambridge Pond access chain; use signed public access points only.",
        "C.J. Shreck is on the north side of Highway 210 at the Skunk River. Confirm current parking, construction, and shoreline conditions before committing to the shuttle.",
        "The South Skunk is non-meandered here. Do not treat banks outside signed public access and park areas as public land."
      ],
      "watchFor": [
        "Ames dam and rock-riffle features, especially around River Valley Park and the lower city corridor.",
        "Sharp turns, fresh sweepers, logjams, and muddy banks after storms.",
        "Low-water scraping below the CanWePaddle floor and faster, colder, debris-laden current above the selected high-water ceiling."
      ]
    },
    "accessPoints": [
      {
        "id": "river-valley-park",
        "name": "River Valley Park access, Ames",
        "latitude": 42.03535,
        "longitude": -93.59895,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in and the upstream end of the lower Ames route."
      },
      {
        "id": "south-16th-street",
        "name": "South 16th Street access",
        "latitude": 42.0106,
        "longitude": -93.5818,
        "mileFromStart": 3,
        "segmentKind": "creek",
        "note": "Intermediate Story County water-trail access; verify same-day signage and parking."
      },
      {
        "id": "askew-bridge-cambridge-pond",
        "name": "Askew Bridge / Cambridge Pond access",
        "latitude": 41.9278,
        "longitude": -93.5436,
        "mileFromStart": 9,
        "segmentKind": "creek",
        "note": "Intermediate public access near Cambridge Pond."
      },
      {
        "id": "cj-shreck-access",
        "name": "C.J. Shreck Access",
        "latitude": 41.9053,
        "longitude": -93.5314,
        "mileFromStart": 13,
        "segmentKind": "creek",
        "note": "Default take-out on Highway 210 south of Cambridge."
      }
    ]
  },
  "north-raccoon-river-squirrel-hollow-adkins": {
    "putIn": {
      "name": "Squirrel Hollow Park boat ramp",
      "latitude": 41.9822,
      "longitude": -94.3192
    },
    "takeOut": {
      "name": "Adkins Bridge Access",
      "latitude": 41.9596,
      "longitude": -94.2676
    },
    "logistics": {
      "distanceLabel": "About 3.8 mi",
      "estimatedPaddleTime": "About 1 hr 30 min to 2 hr 30 min, longer with low water or wood scouting",
      "shuttle": "Short Greene County shuttle. Stage Adkins Bridge first, then launch from Squirrel Hollow Park. Confirm the take-out before launching because the route is short but private banks limit improvising.",
      "permits": "No route-specific paddling permit is known. Follow Greene County Conservation access rules, Iowa boating/PFD requirements, and any posted park or hunting-season restrictions.",
      "camping": "Squirrel Hollow Park has county park camping near the put-in, so it can support a base-camp trip. Do not assume riverbank camping along the route.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Squirrel Hollow Park and take out at Adkins Bridge for a short North Raccoon bluff-country split. The route is accessible, but DNR non-meandered-stream rules, wood, and rock-dam-style riffles keep it from being a casual no-check float.",
      "accessCaveats": [
        "Use the Squirrel Hollow public boat ramp / park access, not informal wildlife-area banks.",
        "Adkins Bridge is the planned take-out 3.8 miles downstream; verify it before launching because missing it turns a short trip into a longer private-bank problem.",
        "The North Raccoon is non-meandered in this corridor. Stay with public accesses and marked public areas."
      ],
      "watchFor": [
        "Downed trees and log piles, especially on sharp wooded bends.",
        "Fishing riffles or rock-dam remnants that may need scouting or portaging at some levels.",
        "Fast rises after rain and colder, pushier water when the Jefferson gauge climbs toward the upper end of the selected band."
      ]
    },
    "accessPoints": [
      {
        "id": "squirrel-hollow-park",
        "name": "Squirrel Hollow Park boat ramp",
        "latitude": 41.9822,
        "longitude": -94.3192,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in with county park camping and public river access."
      },
      {
        "id": "adkins-bridge-access",
        "name": "Adkins Bridge Access",
        "latitude": 41.9596,
        "longitude": -94.2676,
        "mileFromStart": 3.8,
        "segmentKind": "creek",
        "note": "Default take-out 3.8 miles downstream of Squirrel Hollow."
      }
    ]
  },
  "middle-river-forest-park-schildberg": {
    "putIn": {
      "name": "Middle River Forest Park Access #89",
      "latitude": 41.352351,
      "longitude": -94.281724
    },
    "takeOut": {
      "name": "Schildberg Access #78 / Highway 92",
      "latitude": 41.31736,
      "longitude": -94.213296
    },
    "logistics": {
      "distanceLabel": "About 11 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr depending on level and scouting",
      "shuttle": "Use a rural two-car shuttle between Middle River Forest Area near 200th Street and Schildberg Access on Highway 92. Expect gravel-road approaches and confirm parking layout at both access areas before unloading.",
      "permits": "No route-specific paddling permit is known. Follow Adair County, Madison County, and posted water-trail access rules.",
      "camping": "Middle River Forest Area has primitive camping support near the put-in, but this route should still be planned as a day paddle unless camping is separately confirmed with Adair County Conservation.",
      "summary": "Launch from Middle River Forest Park Access #89 and take out at Schildberg Access #78. This is the first developed Middle River Water Trail leg, with a real official flow band but enough riffles, bends, and ledges to require same-day judgment.",
      "accessCaveats": [
        "Middle River Forest Park is the official water-trail trailhead and has a carry-down canoe access; the saved point is converted from the official UTM access table.",
        "Schildberg Access is a Highway 92 walk-down access on river left near the northeast bridge corner; identify the take-out before continuing toward Roseman Covered Bridge.",
        "The Indianola gauge is the official flow reference for Adair / Madison County, but it is downstream of this first leg, so recent local rain and visual scouting still matter."
      ],
      "watchFor": [
        "Numerous bends, riffles, occasional chutes, and ledges, especially outside the 600-900 cfs optimum band.",
        "Fallen trees, strainers, and changing gravel or rock lines after high water.",
        "Low-water dragging and high-water push that can make this moderate route more consequential than the mileage suggests."
      ]
    }
  },
  "middle-river-schildberg-roseman": {
    "putIn": {
      "name": "Schildberg Access #78 / Highway 92",
      "latitude": 41.31736,
      "longitude": -94.213296
    },
    "takeOut": {
      "name": "Roseman Covered Bridge Access #71",
      "latitude": 41.292917,
      "longitude": -94.149879
    },
    "logistics": {
      "distanceLabel": "About 6.9 mi",
      "estimatedPaddleTime": "About 1 hr 45 min to 3 hr 30 min depending on level and scouting",
      "shuttle": "Use a short rural vehicle shuttle between the Highway 92 Schildberg access and Roseman Bridge Road / Elmwood Avenue. Follow posted water-trail signs and confirm parking before unloading.",
      "permits": "No route-specific paddling permit is known. Follow Madison County and posted Middle River Water Trail access rules.",
      "camping": "No on-route camping is documented for this short leg. Nearby Pammel Park has developed camping, but plan this as a day paddle unless you reserve separate lodging.",
      "summary": "Launch from Schildberg Access #78 and take out at Roseman Covered Bridge Access #71. This official Middle River Water Trail section is short enough for a focused half-day, but the chutes, riffles, and shale ledge keep it more technical than a simple float.",
      "accessCaveats": [
        "Schildberg is a walk-down canoe/kayak access on river left near the northeast corner of the Highway 92 bridge.",
        "Roseman is a paved carry-down access at the covered bridge area; use the signed water-trail access rather than informal bridge-bank paths.",
        "The Indianola gauge is the official flow reference for Adair / Madison County but is downstream, so local rainfall and on-site scouting still matter."
      ],
      "watchFor": [
        "Scattered chutes and riffles across timbered valleys and pasture bends.",
        "A moderately challenging shale ledge a few hundred yards upstream of the P53 bridge.",
        "Fallen trees, strainers, low-water dragging, and high-water push outside the 600-900 cfs optimum band."
      ]
    }
  },
  "black-hawk-creek-hudson-waterloo": {
    "putIn": {
      "name": "Franck Park (Access 15), Hudson",
      "latitude": 42.40404,
      "longitude": -92.46443
    },
    "takeOut": {
      "name": "Ranchero Road / Katoski Greenbelt (Access 8), Waterloo",
      "latitude": 42.45749,
      "longitude": -92.41535
    },
    "logistics": {
      "distanceLabel": "7.5 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 3 hr 30 min",
      "shuttle": "Car shuttle is recommended between Franck Park and Ranchero Road / Katoski Greenbelt.",
      "permits": "None noted by Iowa DNR for a standard day paddle on this reach.",
      "camping": "None noted by Iowa DNR for this urban/suburban reach.",
      "summary": "Use Franck Park (Access 15) as the put-in and Ranchero Road / Katoski Greenbelt (Access 8) as the take-out. Treat the official 100 to 500 cfs band as necessary, not sufficient.",
      "accessCaveats": [
        "Access coordinates were geocoded from public map data, not an official access GIS record.",
        "This is a skilled-creek call. Fresh storm damage can make a known access pair unusable even when the gauge is in range."
      ],
      "watchFor": [
        "Strainers, sweepers, deadfalls, and logjams are common.",
        "Two fords can behave like low-head dam hazards at certain water levels.",
        "Be ready to scout and portage around fresh wood."
      ]
    }
  },
  "shell-rock-river-renning-shell-rock": {
    "putIn": {
      "id": "rennings-landing",
      "name": "Renning's Landing",
      "latitude": 42.6996,
      "longitude": -92.6487
    },
    "takeOut": {
      "id": "shell-rock-recreation-area",
      "name": "Shell Rock Recreation Area boat ramp",
      "latitude": 42.711884,
      "longitude": -92.582209
    },
    "logistics": {
      "distanceLabel": "About 5 mi",
      "estimatedPaddleTime": "About 1 hr 30 min to 3 hr by canoe or kayak",
      "shuttle": "Use a short Butler County road shuttle between Renning's Landing and Shell Rock Recreation Area. Scout the Shell Rock take-out before launching because the county float finishes near the city dam corridor.",
      "permits": "No route-specific paddling permit is known. Follow Butler County Conservation rules at both parks, posted park hours, Iowa boating/PFD rules, and any same-day closure signs.",
      "camping": "Shell Rock Recreation Area has seasonal campground support at the take-out park, so this works as an endpoint-campground day route. Do not assume gravel bars or private banks are legal campsites.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Renning's Landing and paddle the county-described five-mile float to Shell Rock Recreation Area. The Shell Rock USGS gauge is direct but the county route still needs a visual check for wood, ramp usability, and dam separation at the finish.",
      "accessCaveats": [
        "Renning's Landing is a Butler County boat-ramp and canoe/kayak access on 205th Street; use the park access rather than road-shoulder bank routes.",
        "Shell Rock Recreation Area is the planned take-out. Identify the ramp and stay clear of the Shell Rock low-head dam area downstream or adjacent to the park corridor.",
        "Butler County lists this as a popular Renning-to-Shell Rock float, but fresh wood, high water, or park closures can change whether the short route is appropriate."
      ],
      "watchFor": [
        "The Shell Rock dam at the finish corridor; take out at the park ramp and do not drift into the dam hydraulic.",
        "Fast current, bridge current, sweepers, and newly fallen trees, especially when the Shell Rock gauge is above the published 2,000 cfs ceiling.",
        "Low-water scraping and walking risk below about 150 cfs on the direct Shell Rock gauge.",
        "Private banks outside county access areas and cold-water exposure outside summer conditions."
      ]
    },
    "accessPoints": [
      {
        "id": "rennings-landing",
        "name": "Renning's Landing",
        "latitude": 42.6996,
        "longitude": -92.6487,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Butler County put-in for the five-mile float to Shell Rock Recreation Area."
      },
      {
        "id": "shell-rock-recreation-area",
        "name": "Shell Rock Recreation Area boat ramp",
        "latitude": 42.711884,
        "longitude": -92.582209,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Take-out park with seasonal campground support; identify the ramp before the dam corridor."
      }
    ]
  },
  "shell-rock-river-heery-woods-renning": {
    "putIn": {
      "id": "heery-woods-below-dam",
      "name": "Heery Woods State Park below-dam launch",
      "latitude": 42.7718,
      "longitude": -92.67323
    },
    "takeOut": {
      "id": "rennings-landing",
      "name": "Renning's Landing",
      "latitude": 42.6996,
      "longitude": -92.6487
    },
    "logistics": {
      "distanceLabel": "About 6 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with wood scouting or low water",
      "shuttle": "Stage Renning's Landing first, then drive back to Heery Woods North Side near Clarksville. Confirm a below-dam launch or portage setup at Heery Woods before unloading boats; do not launch above the dam for this route.",
      "permits": "No route-specific paddling permit is known. Follow Butler County Conservation park hours, access signs, Iowa boating/PFD rules, and any same-day closure notices.",
      "camping": "Heery Woods has campground facilities at the put-in park, so this can work as an endpoint-basecamp day route. No on-route gravel-bar camping is assumed between Heery and Renning.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch only after confirming a safe below-dam Heery Woods start, then paddle the missing Shell Rock connector to Renning's Landing. This keeps the existing Renning-to-Shell-Rock card as the downstream continuation rather than duplicating it.",
      "accessCaveats": [
        "Heery Woods has a boat ramp above the dam and dam-adjacent access. This app route depends on a confirmed safe below-dam launch line or portage setup.",
        "Renning's Landing is the planned take-out and the start of the existing downstream Shell Rock card.",
        "The Shell Rock gauge is downstream in Shell Rock, so combine it with same-day visual checks for wood, ramp condition, and dam separation at Heery Woods."
      ],
      "watchFor": [
        "The Heery Woods low-head dam and any boulder-riffle or dam-remnant current near the launch area.",
        "Sweepers, downed trees, bridge current, and private banks between public access points.",
        "High or rising water above the 2,000 cfs corridor ceiling, when the short connector can become pushy.",
        "Low-water dragging below about 150 cfs on the direct Shell Rock gauge."
      ]
    },
    "accessPoints": [
      {
        "id": "heery-woods-below-dam",
        "name": "Heery Woods State Park below-dam launch",
        "latitude": 42.7718,
        "longitude": -92.67323,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Use only a confirmed below-dam launch or portage setup; do not launch above the dam."
      },
      {
        "id": "rennings-landing",
        "name": "Renning's Landing",
        "latitude": 42.6996,
        "longitude": -92.6487,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "Butler County boat ramp and canoe access; downstream continuation starts here."
      }
    ]
  },
  "upper-iowa-river-kendallville-bluffton": {
    "putIn": {
      "name": "Kendallville Park Canoe Access",
      "latitude": 43.44202,
      "longitude": -92.03809
    },
    "takeOut": {
      "name": "Bluffton Fir Stand Access / Bluffton Road-W20 canoe ramp",
      "latitude": 43.3996,
      "longitude": -91.8884
    },
    "logistics": {
      "distanceLabel": "16.5 mi",
      "estimatedPaddleTime": "About 5 hr 30 min to 7 hr 30 min",
      "shuttle": "Arrange a car shuttle between Kendallville and Bluffton or use an outfitter. The road shuttle is scenic but narrow, winding, and poor for casual bike shuttles.",
      "permits": "No permit is known for a basic day paddle. Follow county-park, water-trail, and state-preserve access rules at Kendallville and Bluffton Fir Stand.",
      "camping": "Kendallville is a convenient campground at the put-in for base-camp staging. Other overnight options exist along the corridor if you plan ahead.",
      "campingClassification": "endpoint_campground",
      "summary": "This is a long Driftless day with county-park staging at Kendallville and a Bluffton Palisades finish. Low water hurts trip quality well before it becomes unsafe.",
      "accessCaveats": [
        "Kendallville is a strong staging access with county campground support, and the Upper Iowa River Paddler's Guide identifies Bluffton Fir Stand Access at the downstream end of this segment.",
        "This is a long day for beginners, so consider splitting it if your group is new."
      ],
      "watchFor": [
        "Strainers or logjams after high water.",
        "Cold-water exposure in spring or fall.",
        "Faster current and fewer margins when levels rise."
      ]
    },
    "accessPoints": [
      {
        "id": "kendallville-park-canoe-access",
        "name": "Kendallville Park Canoe Access",
        "latitude": 43.44202,
        "longitude": -92.03809,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in with county-park campground support in the Upper Iowa guide corridor."
      },
      {
        "id": "bluffton-fir-stand-access",
        "name": "Bluffton Fir Stand Access / Bluffton Road-W20 canoe ramp",
        "latitude": 43.3996,
        "longitude": -91.8884,
        "mileFromStart": 16.5,
        "segmentKind": "creek",
        "note": "Default public take-out at the Bluffton / W20 access corridor near the selected gauge."
      }
    ]
  },
  "upper-iowa-river-malanaphy-trout-run": {
    "putIn": {
      "name": "Malanaphy Springs / Bluffton Road bridge access",
      "latitude": 43.34508,
      "longitude": -91.843
    },
    "takeOut": {
      "name": "Trout Run Park boat access",
      "latitude": 43.29092,
      "longitude": -91.75884
    },
    "logistics": {
      "distanceLabel": "11 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr, plus stops in the Decorah corridor",
      "shuttle": "Use a car or local outfitter shuttle between the Malanaphy Springs / Bluffton Road access area and Trout Run Park. The route runs into Decorah, but the road shuttle still uses hilly rural roads and city-edge traffic.",
      "permits": "No route-specific paddling permit is known. Iowa registration rules can apply to longer boats; follow posted state-preserve, county-road, city-park, and private-bank rules.",
      "camping": "Treat this as a day route. Private campgrounds and Decorah lodging are nearby, but no public watercraft campsite is assumed along this leg.",
      "summary": "Launch at the Malanaphy Springs / Bluffton Road bridge area and take out at Trout Run Park for an Upper Iowa route that starts rural, passes Chattahoochie Park and Decorah bluffs, and finishes at a city park with boat access.",
      "accessCaveats": [
        "Malanaphy Springs access is usable but limited; expect a small lot, a muddy or steep carry, and conflicts with hikers on busy days.",
        "If the Malanaphy lot is full, the downstream Pole Line Road bridge access is the cleaner fallback, but it shortens the route.",
        "Trout Run Park is the planned take-out because it has published boat access and parking where Trout Run enters the Upper Iowa River."
      ],
      "watchFor": [
        "Scraping and dragging in riffles when the Bluffton gauge is near or below 125 cfs.",
        "Class I riffles, shallow rock, bridge approaches, and city-park traffic through Decorah.",
        "Fresh strainers after storms, faster current on rising water, cold spring inflows, and private-bank boundaries along the corridor."
      ]
    }
  },
  "black-hawk-creek-ranchero-hope-martin": {
    "putIn": {
      "name": "Ranchero Road / Katoski Greenbelt Area (Access 8)",
      "latitude": 42.45749,
      "longitude": -92.41535
    },
    "takeOut": {
      "name": "Hope Martin Park (Access 2)",
      "latitude": 42.4912408,
      "longitude": -92.3697993
    },
    "logistics": {
      "distanceLabel": "6 mi",
      "estimatedPaddleTime": "About 2 hr to 2 hr 45 min",
      "shuttle": "Short car shuttle is easiest. Bike shuttle is possible but requires multiple bridge crossings and city traffic awareness.",
      "permits": "None noted for standard day paddling on this reach.",
      "camping": "No camping noted for this urban/suburban creek reach.",
      "summary": "Use Ranchero Road / Katoski Greenbelt as the put-in and Hope Martin Park as the take-out. A good Hudson gauge reading is necessary, but not enough by itself.",
      "accessCaveats": [
        "Ranchero Road parking is small, so confirm where to stage before leaving a vehicle.",
        "Hope Martin Park can be hard to spot from upstream; the downstream bridge is the clearest visual landmark."
      ],
      "watchFor": [
        "Frequent deadfalls, sweepers, and logjams on tight bends.",
        "Two creek fords that can behave like low-head dam hazards at some levels.",
        "Storm damage can change the route even when the gauge is inside the official range."
      ]
    }
  },
  "upper-iowa-river-trout-run-lower-dam": {
    "putIn": {
      "name": "Trout Run Park (Decorah)",
      "latitude": 43.29095,
      "longitude": -91.75879
    },
    "takeOut": {
      "name": "Lower Dam access",
      "latitude": 43.34052,
      "longitude": -91.64307
    },
    "logistics": {
      "distanceLabel": "13 mi",
      "estimatedPaddleTime": "About 4 hr 15 min to 6 hr",
      "shuttle": "Expect about a 9.7-mile vehicle or bike shuttle. Miles Paddled treats this as a real full-day reach, so set the pickup plan and turnaround time before launching.",
      "permits": "No permit is noted for standard day paddling. Follow city-park rules at Trout Run and any posted county or state access rules at Lower Dam.",
      "camping": "No on-route camping is documented for this segment. Plan lodging or camping separately rather than assuming a legal overnight stop.",
      "summary": "Launch at Trout Run Park and finish at the Lower Dam access below Decorah. This is a scenic beginner-friendly Upper Iowa day, but the 13-mile length, low-water scraping risk, and the marked dam portage still make it a real commitment.",
      "accessCaveats": [
        "Decorah park materials show canoe access in the Trout Run corridor, but the park is still big enough that you should locate the launch before unloading.",
        "Iowa DNR treats Lower Dam as a real public access, but Miles Paddled reports weak signage and a rougher take-out approach, so identify the exit before committing.",
        "Treat this as a full-day shuttle-and-portage plan, not a casual quick float."
      ],
      "watchFor": [
        "Heavy scraping in riffles below about 150 cfs at the Decorah gauge.",
        "Dam safety, the marked river-right carry around Upper Dam, and the mandatory Lower Dam take-out before the dam face.",
        "Strainers, logjams, long-day fatigue, and cold water outside midsummer."
      ]
    }
  },
  "wapsipinicon-river-state-park-newport-mills": {
    "putIn": {
      "name": "Wapsipinicon State Park boat launch",
      "latitude": 42.09819,
      "longitude": -91.28755
    },
    "takeOut": {
      "name": "Newport Mills Access",
      "latitude": 42.04515,
      "longitude": -91.20014
    },
    "logistics": {
      "distanceLabel": "9 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr",
      "shuttle": "Plan an 11.5-mile vehicle shuttle. Bike shuttle is possible, but it mixes gravel roads with a short highway shoulder section.",
      "permits": "No route-specific paddling permit is known. Follow Iowa DNR and county access rules at both endpoints.",
      "camping": "Treat this as a day trip unless you have already confirmed a legal overnight plan and sandbar conditions.",
      "summary": "Start at the Wapsipinicon State Park launch near Anamosa and take out at Newport Mills Access. The main quality call is low water: below the Anamosa floor, expect repeated scraping in riffles.",
      "accessCaveats": [
        "The state-park launch sits close enough to the Anamosa dam that you should scout the launch area and keep all dam awareness fresh before unloading.",
        "Newport Mills is a simple rural access, so confirm parking condition and turnaround space before committing to the shuttle."
      ],
      "watchFor": [
        "Frequent scraping below about 4.77 ft at Anamosa.",
        "Riffles around bridge remnants and rock outcrops.",
        "Wind on the wider bends and fresh strainers after storms."
      ]
    }
  },
  "maquoketa-river-canton-royertown": {
    "putIn": {
      "name": "Canton Bridge Access / Canton County Park",
      "latitude": 42.1627901,
      "longitude": -90.8918068
    },
    "takeOut": {
      "name": "Royertown Bridge Access / Water Trail Access #45",
      "latitude": 42.1198989,
      "longitude": -90.828304
    },
    "logistics": {
      "distanceLabel": "8.9 mi",
      "estimatedPaddleTime": "About 4 hr at normal recreational levels",
      "shuttle": "Use a two-car shuttle between Canton and the 50th Ave / Royertown bridge access. Wisconsin River Trips describes the bike shuttle as about 5.9 miles with notable hills but paved roads.",
      "permits": "No route-specific paddling permit is known. Follow posted Jackson County Conservation and water-trail rules at Canton, Buzzard Ridge, Millertown, and Royertown accesses.",
      "camping": "Jackson County lists primitive paddle-in camping along the Maquoketa River Water Trail, including Buzzard Ridge; treat camping as a separate water-trail plan and confirm current county rules before relying on it.",
      "summary": "Launch at Canton Bridge Access by Canton County Park and paddle the South Fork Maquoketa through the Buzzard Ridge bluff corridor, past the Millertown option, and down to Royertown Bridge Access on 50th Ave.",
      "accessCaveats": [
        "Canton is the clean upstream public access for this route; Jackson County signs the water-trail accesses along the road and at the landings.",
        "Royertown is also called 50th Ave, Royertown Canoe Access, or Water Trail Access #45. The access drive can be steep and rutted, so scout vehicle clearance before committing.",
        "Millertown Access at 30th Ave is a public intermediate take-out about 2.9 miles upstream from Royertown if weather, flow, or time argues for a shorter day."
      ],
      "watchFor": [
        "Shallow gravel riffles and grounding below about 500 cfs on the Maquoketa near Maquoketa gauge.",
        "Open reaches where a strong headwind can slow an otherwise straightforward current-assisted trip.",
        "Pushier, dirtier water above about 2,000 cfs, especially around outside bends, bridge landings, and strainers after storms."
      ]
    }
  },
  "maquoketa-river-dundee-manchester": {
    "putIn": {
      "id": "dundee-access",
      "name": "Dundee Access / Dundee Wildlife Area",
      "latitude": 42.5816,
      "longitude": -91.5461
    },
    "takeOut": {
      "id": "manchester-whitewater-park",
      "name": "Manchester Whitewater Park / Tirrill Park finish",
      "latitude": 42.482137,
      "longitude": -91.458424
    },
    "logistics": {
      "distanceLabel": "About 11.8 mi",
      "estimatedPaddleTime": "About 4 hr 30 min to 6 hr, longer with low water, wood, or scouting",
      "shuttle": "Use a two-car shuttle between Dundee and the Manchester Whitewater Park / Tirrill Park finish. Scout the Manchester finish and the Quaker Mill dam-remnant area before launching if the Manchester gauge is rising or outside the normal recreational band.",
      "permits": "No route-specific paddling permit is known. Use designated Delaware County and city access points, follow Iowa boating/PFD rules, and obey posted park and whitewater-park rules.",
      "camping": "No on-route river campsite is assumed for this day route. Nearby Dundee, Backbone-area, and Manchester lodging or camping should be planned separately rather than treated as river-corridor camping.",
      "summary": "Launch at the Dundee access and paddle the Delaware County Maquoketa water trail to Manchester. This longer moving-water day uses the direct Manchester USGS gauge and includes riffles, wood, the Quaker Mill dam-remnant decision, and the whitewater-park finish.",
      "accessCaveats": [
        "Dundee is the clean upstream public access for this route. Do not substitute dam-adjacent Backbone launches unless separately scouting that shorter segment.",
        "Delaware County describes Lindsey Bridge and Tirrill Park as intermediate public accesses, making them practical bailout or shortened-trip options if level, weather, or time deteriorates.",
        "The Quaker Mill dam has a breached/passable route at some levels, but local guidance still calls for scouting and a south-bank portage option when conditions or skill make the line inappropriate.",
        "The finish enters the Manchester whitewater-park corridor. Beginners should decide in advance whether to take out before features or run only the features that match their skill."
      ],
      "watchFor": [
        "Riffles, shallow gravel, and possible dragging below about 120 cfs on the Manchester gauge.",
        "Pushy current, reduced eddies, and more consequential wood above about 1,500 cfs on the Manchester gauge.",
        "Downed trees, outside-bend strainers, bridge current, private banks, and cold shoulder-season water.",
        "Quaker Mill dam remnants and whitewater-park features near Manchester that require scouting rather than blind floating."
      ]
    },
    "accessPoints": [
      {
        "id": "dundee-access",
        "name": "Dundee Access / Dundee Wildlife Area",
        "latitude": 42.5816,
        "longitude": -91.5461,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Upper Delaware County public access for the Dundee-to-Manchester day section."
      },
      {
        "id": "manchester-whitewater-park",
        "name": "Manchester Whitewater Park / Tirrill Park finish",
        "latitude": 42.482137,
        "longitude": -91.458424,
        "mileFromStart": 11.8,
        "segmentKind": "creek",
        "note": "Planned finish at the city whitewater-park corridor; scout take-out and feature choice before committing."
      }
    ]
  },
  "volga-river-osborne-mederville": {
    "putIn": {
      "name": "Osborne Canoe Access",
      "latitude": 42.7897657,
      "longitude": -91.442417
    },
    "takeOut": {
      "name": "Mederville Canoe Access",
      "latitude": 42.7637267,
      "longitude": -91.4218817
    },
    "logistics": {
      "distanceLabel": "About 4.8 to 5.3 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr depending on level and stops",
      "shuttle": "Use a short rural two-car shuttle between Osborne Canoe Access and the hidden Mederville landing. The road shuttle is manageable for northeast Iowa, but both ends are easy to miss, so scout the Mederville take-out before launching.",
      "permits": "No route-specific paddling permit is known. Follow Clayton County Conservation rules at Osborne Canoe Access and use only established bridge-area or canoe-access landings at Mederville.",
      "camping": "No on-route campsite is documented for this short day route. Osborne Park and nearby Clayton County areas should be treated as separate camping or base-camp planning.",
      "summary": "Launch at Clayton County's Osborne Canoe Access and paddle the lower Volga to Mederville Canoe Access. Expect clear water, gravel bars, wooded hills, light Class I riffles, and a scenic gorge/bridge finish at Mederville.",
      "accessCaveats": [
        "Osborne Canoe Access is the cleaner public put-in than the rougher Highway 13 bridge launch, but the access road can still be hard to identify inside the broader Osborne Park complex.",
        "Mederville Canoe Access is hidden below the Evergreen Road / Eclipse Road bridge corridor and uses a steep path to the river.",
        "Much of the corridor is rural and privately bordered. Stay with established access points and do not assume sandbars or banks are public picnic sites."
      ],
      "watchFor": [
        "Several light Class I riffles below Osborne and again near the Mederville gorge.",
        "Shallow riffles and scrape risk when the Littleport gauge falls below the target band.",
        "Low branches, faster current around bends, slippery banks at Mederville, cold shoulder-season water, and fast rises after heavy rain."
      ]
    }
  },
  "maquoketa-river-mon-maq-pictured-rocks": {
    "putIn": {
      "name": "Mon-Maq Dam Access / Lower Mon-Maq sandbar launch",
      "latitude": 42.24511929,
      "longitude": -91.17077245
    },
    "takeOut": {
      "name": "Pictured Rocks Park Access",
      "latitude": 42.20569962,
      "longitude": -91.10253825
    },
    "logistics": {
      "distanceLabel": "8 to 8.1 mi",
      "estimatedPaddleTime": "About 3.5 hr to 4.5 hr depending on level and stops",
      "shuttle": "Use a two-car shuttle between Mon-Maq Dam Access northeast of Monticello and Pictured Rocks Park southeast of town. The road shuttle is short enough for a bike shuttle, but the Pictured Rocks park road is steep and can be seasonally gated after snow.",
      "permits": "No route-specific paddling permit is known. Follow posted Jones County Conservation and Iowa DNR water-trail rules at Mon-Maq Dam, Pictured Rocks, and the surrounding wildlife areas.",
      "camping": "Do not plan on river camping for this day route unless a separate legal campsite or county permission is confirmed. Pictured Rocks is best treated as a day-use take-out and hiking/climbing area.",
      "summary": "Launch from the sandbar access below Mon-Maq Dam and paddle the classic lower-Maquoketa bluff section to the hard-surface Pictured Rocks Park access. Expect steady current, wooded banks, limestone outcrops, public wildlife-area scenery, and a popular take-out with parking and restrooms.",
      "accessCaveats": [
        "The practical put-in is below the Mon-Maq Dam, not above it. Use the lower sandbar/access area and stay clear of dam hydraulics.",
        "Pictured Rocks has hard-surface river access, parking, restrooms, and water in the water-trail guide, but Jones County notes the steep access road is typically closed after the first snowfall.",
        "Summer weekends can be busy because this is one of the better-known lower-Maquoketa bluff runs and Pictured Rocks also draws hikers and climbers."
      ],
      "watchFor": [
        "Shallow gravel bars and grounding risk below about 500 cfs on the Maquoketa near Maquoketa gauge.",
        "Eight miles of moving water, which the official guide says can be long for beginners even though the section is not technical.",
        "Pushier, dirtier current above about 2,000 cfs, especially around outside bends, wood, bridge areas, and the Pictured Rocks landing.",
        "Private-property boundaries between public access areas and wildlife-area frontage."
      ]
    }
  },
  "volga-river-klocks-island-heron-road": {
    "putIn": {
      "name": "Klock's Island Park",
      "latitude": 42.84288,
      "longitude": -91.81917
    },
    "takeOut": {
      "name": "Heron Road Access / Volga River Access",
      "latitude": 42.86453,
      "longitude": -91.74071
    },
    "logistics": {
      "distanceLabel": "About 11 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr depending on level and scouting",
      "shuttle": "Use a two-car shuttle between Klock's Island Park in Fayette and the Heron Road bridge east of Volga River State Recreation Area. The bike shuttle is possible but hilly and partly gravel/trail; most paddlers should treat this as a vehicle shuttle.",
      "permits": "No route-specific paddling permit is known. Follow posted City of Fayette and Iowa DNR Volga River State Recreation Area rules, and use only established river access points or confirmed public parkland for stops.",
      "camping": "Klock's Island Park and Volga River State Recreation Area have campground options nearby, but treat camping as a separate city or Iowa DNR reservation/fee plan rather than part of the river route.",
      "summary": "Launch at Klock's Island Park on the edge of Fayette and paddle the upper Volga into Volga River State Recreation Area to the Heron Road access. This is a clear, scenic, shallow-water route with steady riffles, limestone bluffs, public-land scenery, and a narrow strainer-prone finish.",
      "accessCaveats": [
        "Klock's Island has public kayak/canoe access, but the saved point comes from route-report GPS rather than a city GIS launch point; orient inside the park before unloading.",
        "Heron Road is a dedicated but subtle landing downstream of the bridge on river left. The named Volga River Access topo feature corroborates the corridor, but scout the take-out before launching.",
        "A state-park picnic-area access roughly a mile upstream of Heron Road can shorten the trip and avoid the messier final mile if levels, wood, or daylight are unfavorable."
      ],
      "watchFor": [
        "Scraping and boat abuse when the Littleport gauge drops below the 5.0 ft route floor; below 4.5 ft should be avoided.",
        "Fast narrow bends, concrete debris from old railroad/bridge features, and strainers in the last mile above Heron Road.",
        "Cold shoulder-season water, spring access/trail issues in Volga River State Recreation Area, and fast rises after northeast Iowa storms."
      ]
    }
  },
  "volga-river-mederville-littleport": {
    "putIn": {
      "name": "Mederville Canoe Access",
      "latitude": 42.7637267,
      "longitude": -91.4218817
    },
    "takeOut": {
      "name": "Littleport Canoe Access",
      "latitude": 42.7536533,
      "longitude": -91.3690117
    },
    "logistics": {
      "distanceLabel": "5.7 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr depending on level and stops",
      "shuttle": "Use a short rural two-car shuttle between the hidden Mederville access and the Littleport bridge. Wisconsin River Trips describes the bike shuttle as about 4.6 miles with gravel roads, one steep climb, and possible loose-dog friction.",
      "permits": "No route-specific paddling permit is known. Use only established bridge-area and canoe-access landings, follow posted Clayton County or local parking rules, and respect private banks along the corridor.",
      "camping": "No on-route campsite is documented for this short day route. Treat nearby parks or campgrounds as separate base-camp planning rather than river-camp permission.",
      "summary": "Launch at Mederville Canoe Access below the Evergreen Road / Eclipse Road bridge corridor and take out at Littleport Canoe Access by the Bridge Street / X21 bridge. This short Volga River leg has limestone outcrops, wooded banks, sandbars, and quick Class I riffles.",
      "accessCaveats": [
        "Mederville Canoe Access is hidden below the bridge corridor and reached from Eclipse Road; the path to the water is steep enough that rope or a second person is useful.",
        "Littleport Canoe Access uses steep stairs near the southeast corner of the bridge, and boats may need to be carried or dragged under the bridge because of the guardrail and shoulder parking pattern.",
        "Both endpoints are named public-access locations in route and water-quality records, but they are not polished ramp launches. Scout the take-out before launching if you have not used it before."
      ],
      "watchFor": [
        "About 15 easy Class I riffle pitches that become scrape-prone near the low band and pushier above the broad target window.",
        "Low branches over faster current, especially after storms or when the Littleport gauge is in the high band.",
        "Steep, slippery banks and stairs at both landings, cold spring/fall water, and fast rises after heavy rain in the Driftless hills."
      ]
    }
  },
  "turkey-river-big-spring-elkader": {
    "putIn": {
      "name": "Big Spring Campground / Water Trail Access #47",
      "latitude": 42.91229,
      "longitude": -91.483
    },
    "takeOut": {
      "name": "Elkader Access #39A / Sandpit Road",
      "latitude": 42.8618,
      "longitude": -91.40877
    },
    "logistics": {
      "distanceLabel": "7.25 to 7.6 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 3 hr 30 min",
      "shuttle": "Use a rural paved-and-gravel shuttle between Big Spring Campground northwest of Elkader and Elkader Access #39A off Sandpit Road. Avoid bike shuttles unless the rider is comfortable with hilly gravel roads and local traffic.",
      "permits": "No route-specific paddling permit is known. Big Spring Campground is a Clayton County / MyCountyParks facility, so follow posted campground, parking, and day-use rules.",
      "camping": "Big Spring Campground has primitive reservable campsites near the put-in. Frieden Park just downstream has rough camping and canoe access; confirm current Clayton County rules before planning an overnight.",
      "summary": "Launch at Big Spring Campground / Access #47 and take out at Elkader Access #39A for the official lower pre-dam Turkey River water-trail leg. This is the shorter, more reliable half of the Elgin-to-Elkader corridor because Big Spring adds coldwater flow before the river bends into Elkader.",
      "accessCaveats": [
        "Big Spring Campground is the cleaner public put-in for this route; nearby Frieden Park #46 is another official access about a half mile downstream if logistics require it.",
        "Elkader Access #39A is upstream of the Elkader dam. Watch for water-trail signs, land on river left, and do not continue toward the dam unless you are intentionally portaging around it.",
        "The Elkader landing can be a skinny sand-and-mud path rather than a developed ramp, so carrying boats up the bank may be awkward at low or high water."
      ],
      "watchFor": [
        "Scrapey riffles and gravel bars near and below 220 cfs on the Elkader gauge.",
        "Abandoned car debris, wood piles, and strainers along outside bends.",
        "Wind through the wider valley, shallow side channels, and the current slowing as the Elkader dam pool begins.",
        "Mandatory take-out / portage behavior at Elkader; never pass posted dam warnings."
      ]
    }
  },
  "turkey-river-elkader-motor-mill": {
    "putIn": {
      "name": "Elkader Whitewater Park / Elkader Access #39B",
      "latitude": 42.853356,
      "longitude": -91.402402
    },
    "takeOut": {
      "name": "Motor Mill Access #32",
      "latitude": 42.8088,
      "longitude": -91.3531
    },
    "logistics": {
      "distanceLabel": "6.5 to 7 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr depending on level and stops",
      "shuttle": "Use a two-car shuttle between downtown Elkader and Motor Mill, or arrange a local livery shuttle. The road shuttle is hilly enough that a bike shuttle is a bigger commitment than the river mileage suggests.",
      "permits": "No route-specific paddling permit is known. Follow posted City of Elkader, water-trail, and Clayton County Conservation rules at the whitewater park, Elkader Access, and Motor Mill.",
      "camping": "Motor Mill has primitive county campground options across the road from the access area. Treat camping as a separate county-park reservation or first-come plan rather than an assumed part of the day trip.",
      "summary": "Launch at Elkader Whitewater Park or the adjacent Elkader Access corridor and take out at Motor Mill Access. This is a popular Turkey River Water Trail section with riffles, wooded bluffs, Robert Creek, and a historic mill finish.",
      "accessCaveats": [
        "Casual paddlers can launch below or away from the whitewater feature; the engineered ledges at Elkader should be scouted before running.",
        "The water-trail guide names the corridor as Elkader Access #39B, while route reports often use Elkader Whitewater Park as the cleaner scenic put-in.",
        "Motor Mill Access is downstream of the historic mill on river left. Identify it before continuing, because the next water-trail take-out at Garber is a much longer 12-plus-mile extension."
      ],
      "watchFor": [
        "The Elkader whitewater-park ledges at the start, including more consequential lines that are not appropriate for unprepared flatwater paddlers.",
        "Frequent Class I riffles that become bumpy near the low band and pushier as the Elkader gauge rises.",
        "High-water loss of clarity, stronger current around outside bends, and more consequential landings at Motor Mill."
      ]
    }
  },
  "turkey-river-gilbertson-big-spring": {
    "putIn": {
      "name": "Gilbertson Park / Elgin access corridor",
      "latitude": 42.95817,
      "longitude": -91.62423
    },
    "takeOut": {
      "name": "Big Spring Campground / Water Trail Access #47",
      "latitude": 42.91229,
      "longitude": -91.483
    },
    "logistics": {
      "distanceLabel": "11.9 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr depending on level and stops",
      "shuttle": "Use a rural two-car shuttle between the Elgin / Gilbertson corridor and Big Spring Campground. The road return is hilly and indirect enough that a bike shuttle is a bigger commitment than the river mileage suggests.",
      "permits": "No route-specific paddling permit is known. Follow posted Fayette County and Clayton County rules at Gilbertson Park, Big Spring Campground, and any intermediate bridge pull-offs.",
      "camping": "Gilbertson Park has modern campground facilities near Elgin, and Big Spring Campground has primitive riverside sites at the take-out. Treat overnight use as a separate campground plan rather than an automatic part of the paddle.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from the Gilbertson Park / Elgin access corridor and take out at Big Spring Campground for the long upper-middle Turkey River day well upstream of Elkader. This is the cleaner all-day public route for paddlers who want a longer Driftless float without finishing in town.",
      "accessCaveats": [
        "The practical Elgin launch is the Highway B64 bridge corridor by Gilbertson Park rather than a polished ramp. Walk the bank before unloading if you have not used the access before.",
        "Big Spring Campground is the official Water Trail Access #47 take-out. Frieden Park is another official access about a half mile farther downstream, but use it only if you intentionally want the extra mileage and rougher finish.",
        "Bridge or gravel-bar pauses do not guarantee legal long stops on private banks. Keep breaks to public access points or obvious riverbed areas below the high-water line when conditions allow."
      ],
      "watchFor": [
        "Long shallow riffles and gravel bars when the Elkader proxy gauge falls toward the 250 cfs floor.",
        "Outside-bend wood, farm-fence remnants, and shifting channels after storms in the broad valley above Big Spring.",
        "Headwinds, hot exposed sections, and limited easy bail-out points once you leave the Gilbertson / Narrows access area."
      ]
    }
  },
  "turkey-river-gilbertson-elkader": {
    "putIn": {
      "name": "Gilbertson Park / Elgin access corridor",
      "latitude": 42.95817,
      "longitude": -91.62423
    },
    "takeOut": {
      "name": "Elkader Access #39A / Sandpit Road",
      "latitude": 42.8618,
      "longitude": -91.40877
    },
    "logistics": {
      "distanceLabel": "19.5 mi",
      "estimatedPaddleTime": "About 6 hr 30 min to 8 hr 30 min",
      "shuttle": "Use a two-car shuttle between the Elgin / Gilbertson corridor and Elkader Access #39A off Sandpit Road. This is a real full-day route, so many groups will prefer an early launch and a pre-scouted take-out.",
      "permits": "No route-specific paddling permit is known. Follow posted Fayette County, Clayton County, and Elkader access rules, and respect private banks away from named public access points.",
      "camping": "Gilbertson Park has campground facilities at the put-in. Big Spring Campground and rougher Frieden Park camping are mid-route options only if you intentionally split the trip; do not assume legal overnight use elsewhere on private banks.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from the Gilbertson Park / Elgin corridor and stay on the Turkey River all the way to Elkader Access #39A for the full upper Turkey River day. The route combines the broad upper valley, the Big Spring corridor, and the mandatory pre-dam Elkader take-out in one long trip.",
      "accessCaveats": [
        "The practical Elgin launch is the Highway B64 bridge corridor by Gilbertson Park rather than a polished ramp. Walk the bank before unloading if you have not used it before.",
        "Big Spring Campground and Frieden Park are the main mid-route public decision points if the group needs to shorten or split the day.",
        "Elkader Access #39A is upstream of the dam. Land on river left at the marked access and do not continue toward the dam unless you are intentionally portaging with current local guidance."
      ],
      "watchFor": [
        "Long shallow riffles and gravel bars when the Elkader gauge falls toward the 250 cfs floor.",
        "Outside-bend wood, abandoned debris, and shifting channels after storms in the broad valley above Big Spring.",
        "Headwinds, heat, and fatigue late in the day as the current slows into the Elkader dam pool.",
        "Mandatory take-out behavior at Elkader; never drift past posted dam warnings."
      ]
    }
  },
  "turkey-river-motor-mill-garber": {
    "putIn": {
      "name": "Motor Mill Access #32",
      "latitude": 42.80692,
      "longitude": -91.35124
    },
    "takeOut": {
      "name": "Garber Access #20",
      "latitude": 42.74002,
      "longitude": -91.26159
    },
    "logistics": {
      "distanceLabel": "12.4 mi",
      "estimatedPaddleTime": "About 4 hr to 5.5 hr depending on level and stops",
      "shuttle": "Use a two-car shuttle between Motor Mill and Garber before launching. The take-out comes late in a remote stretch, so confirm the Garber access and parking before committing to the day.",
      "permits": "No route-specific paddling permit is known. Follow posted Clayton County and local access rules at Motor Mill and Garber, and respect private banks along the lower river corridor.",
      "camping": "Motor Mill has county-managed campground options near the put-in. Treat camping as a separate site plan rather than an assumed part of the day trip.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Motor Mill and take out at Garber for a long scenic lower Turkey River float through wooded bluffs, limestone outcrops, and the Volga confluence. This is one of the cleanest direct-gauge Turkey River routes because the Garber USGS station sits at the downstream end.",
      "accessCaveats": [
        "Motor Mill is a developed public access, but identify the carry path and parking before unloading because the historic-site layout spreads visitors across multiple areas.",
        "Garber Access #20 is on river left just past the second bridge in town. If you miss it, the next practical public exit is not immediate.",
        "This corridor has few easy public exits in between, so do not launch unless the group can finish a full 12-plus-mile day at the current level and weather."
      ],
      "watchFor": [
        "Continuous Class I riffles that get scrapier near the 550 cfs floor and noticeably pushier as the river rises.",
        "Floating wood, blind outside bends, and stronger current where the Volga River enters from river right.",
        "Wind, sun exposure, and private-bank limits that make mid-route rest or emergency take-outs less flexible than upstream Turkey segments."
      ]
    }
  },
  "turkey-river-elkader-garber": {
    "putIn": {
      "name": "Elkader Whitewater Park / Elkader Access #39B",
      "latitude": 42.853356,
      "longitude": -91.402402
    },
    "takeOut": {
      "name": "Garber Access #20",
      "latitude": 42.74002,
      "longitude": -91.26159
    },
    "logistics": {
      "distanceLabel": "18.9 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr depending on level, scouting, and breaks",
      "shuttle": "Set the Garber vehicle first and treat this as a true full-day shuttle. Many groups will prefer an early launch because the route effectively combines the Elkader-to-Motor-Mill and Motor-Mill-to-Garber days.",
      "permits": "No route-specific paddling permit is known. Follow posted City of Elkader, water-trail, and Clayton County rules at the whitewater park, Motor Mill corridor, and Garber take-out.",
      "camping": "Motor Mill campground sits near the midpoint and can support a split overnight if the group does not want a single long day. Do not assume legal camping anywhere else along private banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Elkader Whitewater Park and stay on the Turkey River all the way to Garber for the full lower-river day. This route combines the engineered Elkader start, the wooded Motor Mill middle, and the remote canyon-like lower river under one direct Garber gauge story.",
      "accessCaveats": [
        "The Elkader put-in sits by the whitewater feature. Flatwater groups should scout and choose a conservative launch line rather than blindly entering the ledges.",
        "Motor Mill is the natural midpoint and easiest bail-out. If anyone in the group is fading there, end the day instead of forcing the lower 12.4-mile continuation.",
        "Garber Access #20 arrives late and on river left after the second bridge. Missing it can turn a long day into an unnecessarily difficult retrieval problem."
      ],
      "watchFor": [
        "The Elkader whitewater-park ledges at the start and any stronger hydraulics or recovery moves they create at higher water.",
        "A long sequence of riffles, outside-bend wood, and fatigue-related mistakes late in the day as the route continues below Motor Mill.",
        "Fast rises, muddy landings, and more consequential current when the Garber gauge is well above the conservative 550 cfs floor."
      ]
    }
  },
  "little-turkey-river-gouldsburg-eldorado": {
    "putIn": {
      "name": "Gouldsburg Park Access #98",
      "latitude": 43.012796,
      "longitude": -91.958595
    },
    "takeOut": {
      "name": "Eldorado Bridge Access #86 / Highway 150",
      "latitude": 43.0513,
      "longitude": -91.83966
    },
    "logistics": {
      "distanceLabel": "12.2 mi",
      "estimatedPaddleTime": "About 4 hr to 5.5 hr depending on level and scouting",
      "shuttle": "Use a rural two-car shuttle between Gouldsburg Park on Sunset Road and the Highway 150 / 292nd Street bridge access at Eldorado. Scout the Eldorado take-out before launching because the river confluence and bridge come up quickly near the end.",
      "permits": "No route-specific paddling permit is known. Follow posted Fayette County park, Turkey River Water Trail, and bridge/access parking rules at Gouldsburg Park and Eldorado.",
      "camping": "Gouldsburg Park has county campground facilities, but treat camping as a separate Fayette County park plan rather than an assumed part of the paddle.",
      "summary": "Launch at Gouldsburg Park, the official upper end of the Turkey River Water Trail, and follow the Little Turkey River downstream to Eldorado Bridge Access shortly after the confluence with the main Turkey River.",
      "accessCaveats": [
        "Gouldsburg Park is the official water-trail start, but Miles Paddled notes the practical launch inside the park can be ambiguous; identify the carry path near the campground before unloading boats.",
        "The Highway 150 / 292nd Street take-out at Eldorado replaced older nearby access references that are no longer public. Use the signed/current public access, not older bridge or private-bank descriptions.",
        "The Eldorado gauge is downstream of the Little Turkey confluence, so use it as a conservative route-corridor indicator rather than a perfect reach-specific forecast."
      ],
      "watchFor": [
        "Seasonal barbed-wire or fence strands around Gouldsburg Park and downstream pasture crossings; portage rather than ducking under wire in current.",
        "Scrapey riffles and shallow gravel bars when the Eldorado gauge falls below the 6 ft floor.",
        "Fast rises, debris, low branches, and stronger bridge/confluence current after storms in this small Driftless watershed."
      ]
    }
  },
  "north-fork-maquoketa-river-ozark-caven": {
    "putIn": {
      "name": "Ozark Bridge / 21st Ave access area",
      "latitude": 42.19,
      "longitude": -90.87
    },
    "takeOut": {
      "name": "Caven Bridge Access / 60th Ave",
      "latitude": 42.18,
      "longitude": -90.83
    },
    "logistics": {
      "distanceLabel": "4.4 mi",
      "estimatedPaddleTime": "About 2 hr, longer with bluff stops or low water",
      "shuttle": "Use a short but hilly gravel-road two-car shuttle between the 21st Ave / 185th Street access area and the east-bank Caven Bridge Access at 60th Ave. Scout the take-out first because the old bridge is gone and west-bank use is private.",
      "permits": "No route-specific paddling permit is known. Follow Jackson County water-trail signs, posted road-right-of-way rules, and Ozark Wildlife Area restrictions.",
      "camping": "Do not assume legal river camping on this short route. Jackson County lists primitive camping for some water-trail contexts, but site permission and land ownership should be confirmed separately before planning an overnight.",
      "summary": "Launch from the Ozark Bridge / 21st Ave access area near 185th Street and take out at the east-bank Caven Bridge Access on 60th Ave. This short Ozark Wildlife Area route has fast current, easy riffles, boulders, and steep Driftless bluffs.",
      "accessCaveats": [
        "Ozark Bridge is an undeveloped access rather than a managed ramp. Jackson County marks it as not managed by JCCB, and WRT describes using a public pull-off and faint trail near 185th Street instead of the tall bridge bank.",
        "Caven Bridge Access is the named public take-out at 60th Ave, but the bridge has been removed. Use the east-bank public side; WRT notes the west bank is private and requires permission.",
        "Coordinates come from Jackson County water-trail table coordinates rounded to two decimals. Use road names, signs, and same-day scouting to pinpoint the practical launch and carry-out paths."
      ],
      "watchFor": [
        "Swift current and light Class I riffles immediately downstream of the put-in that become pushier above the target range.",
        "Muddy undeveloped banks at both ends, plus steep bridge-area approaches and limited roadside maneuvering on gravel roads.",
        "Cold shoulder-season water, fast rises after heavy rain, and private-property boundaries around road-right-of-way and west-bank access."
      ]
    }
  },
  "north-fork-maquoketa-river-cascade-d61": {
    "putIn": {
      "name": "Cascade Historic Limestone Silo / Cascade landing",
      "latitude": 42.29902,
      "longitude": -91.01244
    },
    "takeOut": {
      "name": "D61 Access / Whitewater Creek bridge access",
      "latitude": 42.27778,
      "longitude": -90.9371
    },
    "logistics": {
      "distanceLabel": "7.8 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr",
      "shuttle": "Use a paved but hilly two-car shuttle between the Cascade silo launch and D61 east of Cascade. The shuttle is short enough for a strong bike option, but the county roads have limited shoulders.",
      "permits": "No route-specific paddling permit is known. Follow posted City of Cascade and county bridge-access parking rules, and use only the named public launch and take-out areas.",
      "camping": "Do not assume legal river camping on this route. Nearby campgrounds and private tubing accesses are separate arrangements and should not be treated as route camping permission.",
      "summary": "Launch at the concrete ramp by the Cascade Historic Limestone Silo and paddle to the D61 bridge access on Whitewater Creek. This is a scenic North Fork drift with bluffs, boulders, riffles, and a short final move up Whitewater Creek to the take-out.",
      "accessCaveats": [
        "Use the public ramp below the Cascade dam, not an improvised launch in the dam zone or above the structure.",
        "The D61 take-out is on Whitewater Creek rather than the main river. Watch for the creek mouth and save enough energy to paddle or wade the short final distance upstream to the bridge access.",
        "The bridge access can be muddy and the bank is not a polished ramp, so scout the landing before committing to the route with heavier boats."
      ],
      "watchFor": [
        "Light rapids and stronger eddy lines near Cascade, especially if you launch above the preferred concrete-ramp entry point.",
        "Outside-bend boulders, wood, and faster current as levels climb above the broad 231-400 cfs target range.",
        "Private campground access points that are not public exits unless you have separate permission."
      ]
    }
  },
  "north-fork-maquoketa-river-d61-ozark": {
    "putIn": {
      "name": "D61 Access / Whitewater Creek bridge access",
      "latitude": 42.27778,
      "longitude": -90.9371
    },
    "takeOut": {
      "name": "Ozark Bridge / 21st Ave access area",
      "latitude": 42.19,
      "longitude": -90.87
    },
    "logistics": {
      "distanceLabel": "About 12.1 mi",
      "estimatedPaddleTime": "About 4.5 hr to 6 hr depending on level and breaks",
      "shuttle": "Set the Ozark vehicle first and treat this as a wilderness shuttle rather than a casual bike-back route. The county-road return is long, hilly, and slower than the map may suggest.",
      "permits": "No route-specific paddling permit is known. Follow posted county bridge-access parking rules, and use only the named public D61 and Ozark access areas.",
      "camping": "Do not assume legal river camping on this route. No verified on-route campsite was cleared in this pass, and private banks should not be treated as informal overnight stops.",
      "summary": "Launch at D61 Access on Whitewater Creek, work out to the North Fork, and continue through the bluff-heavy wilderness corridor to Ozark Bridge. This is the longer middle reach between the shorter Cascade-to-D61 and Ozark-to-Caven records.",
      "accessCaveats": [
        "The D61 put-in is on Whitewater Creek rather than the main river. Expect a short final move downstream into the North Fork, and scout the muddy bridge-bank entry before unloading heavier boats.",
        "Once you leave Whitewater Creek, practical public bailout options become scarce until Ozark Bridge. Do not launch late or with a group that is uncertain about covering the mileage.",
        "Ozark Bridge is an undeveloped bridge access with a roadside pull-off and carry path rather than a polished ramp."
      ],
      "watchFor": [
        "Long sequences of riffles, outside-bend boulders, and faster current when the Fulton gauge rises above the broad 231-400 cfs target range.",
        "Fatigue, wood, blind bends, and limited easy exits in the middle miles of the corridor.",
        "Private banks and private campground accesses that should not be treated as normal public stops or take-outs."
      ]
    }
  },
  "north-fork-maquoketa-river-cascade-ozark": {
    "putIn": {
      "name": "Cascade Historic Limestone Silo / Cascade landing",
      "latitude": 42.29902,
      "longitude": -91.01244
    },
    "takeOut": {
      "name": "Ozark Bridge / 21st Ave access area",
      "latitude": 42.19,
      "longitude": -90.87
    },
    "logistics": {
      "distanceLabel": "About 18 to 20 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr depending on level and breaks",
      "shuttle": "Set the Ozark vehicle first and treat this as a committed full-day shuttle. The road return is long and hilly enough that a bike shuttle is unrealistic for most groups.",
      "permits": "No route-specific paddling permit is known. Follow posted City of Cascade and county bridge-access parking rules, and use named public access areas only.",
      "camping": "Some paddlers treat this as a two-day corridor, but no verified legal on-route campsite was cleared in this pass. Plan it as a long day unless you independently confirm legal overnight options.",
      "summary": "Launch at Cascade and stay on the North Fork all the way to Ozark Bridge for the long wilderness continuation. This route strings together the scenic Cascade reach and the bluff-heavy Whitewater-to-Ozark corridor with very few practical public exits in between.",
      "accessCaveats": [
        "Use the public ramp below the Cascade dam, not an improvised launch in the dam zone or above the structure.",
        "Once you pass the Whitewater Creek mouth, public bailout options become scarce until Ozark Bridge. Do not launch late or with a group that is uncertain about covering the mileage.",
        "Ozark Bridge is an undeveloped bridge access. Expect a basic roadside pull-off and a carry path rather than a polished county ramp."
      ],
      "watchFor": [
        "A long sequence of riffles, outside-bend boulders, wood, and fatigue-related mistakes late in the day.",
        "Fast rises and muddier current after storms, which make this isolated corridor significantly more consequential than the short Ozark-to-Caven route.",
        "Private banks and private campground accesses that should not be treated as normal public take-outs."
      ]
    }
  },
  "north-fork-maquoketa-river-d61-caven": {
    "putIn": {
      "name": "D61 Access / Whitewater Creek bridge access",
      "latitude": 42.27778,
      "longitude": -90.9371
    },
    "takeOut": {
      "name": "Caven Bridge Access / 60th Ave",
      "latitude": 42.18,
      "longitude": -90.83
    },
    "logistics": {
      "distanceLabel": "About 16.5 mi",
      "estimatedPaddleTime": "About 5.5 hr to 7.5 hr depending on level and breaks",
      "shuttle": "Set the Caven vehicle first and treat this as a committed long-day shuttle. The return is long, hilly, and rural enough that a same-day shuttle check is worth the extra time.",
      "permits": "No route-specific paddling permit is known. Follow posted county bridge-access parking rules, and use only the named public D61 and Caven access areas.",
      "camping": "Some groups may be tempted to split this route, but no verified legal on-route campsite was cleared in this pass. Plan it as a long day unless you separately confirm a legal overnight option.",
      "summary": "Launch at D61 Access on Whitewater Creek and continue all the way to Caven Bridge for the full lower North Fork continuation below Whitewater Creek. This route adds the short Ozark Wildlife Area finish onto the longer D61-to-Ozark wilderness day.",
      "accessCaveats": [
        "The D61 put-in is on Whitewater Creek rather than the main river. Scout the muddy bridge-bank launch and expect a short move into the North Fork before the route settles into the main corridor.",
        "Public bailout options remain scarce until Ozark Bridge, and the final Caven access is still an undeveloped east-bank bridge corridor rather than a polished county ramp.",
        "Use the east-bank Caven Bridge Access only; the west bank is private and should not be treated as a public take-out."
      ],
      "watchFor": [
        "A long sequence of riffles, outside-bend boulders, and fatigue-related mistakes late in the day.",
        "Fast rises after storms, muddier current, and harder landings throughout the isolated lower corridor.",
        "Private banks, steep gravel-road approaches, and narrow roadside maneuvering at the undeveloped bridge accesses."
      ]
    }
  },
  "north-fork-maquoketa-river-cascade-caven": {
    "putIn": {
      "name": "Cascade Historic Limestone Silo / Cascade landing",
      "latitude": 42.29902,
      "longitude": -91.01244
    },
    "takeOut": {
      "name": "Caven Bridge Access / 60th Ave",
      "latitude": 42.18,
      "longitude": -90.83
    },
    "logistics": {
      "distanceLabel": "About 24.3 mi",
      "estimatedPaddleTime": "About 8 hr to 10+ hr depending on level, stops, and daylight",
      "shuttle": "Set the Caven vehicle first and treat this as a full-day or strongly preplanned long-route shuttle. The return is long and hilly enough that most groups should not treat it as a casual add-on after the paddle.",
      "permits": "No route-specific paddling permit is known. Follow posted City of Cascade and county bridge-access parking rules, and use named public access areas only.",
      "camping": "This route reads like an overnight-capable corridor, but no verified legal on-route campsite was cleared in this pass. Do not assume gravel bars or private banks are legal overnight options.",
      "summary": "Launch at Cascade and stay on the North Fork all the way to Caven Bridge for the full wilderness planner route. This strings together the scenic Cascade opener, the isolated Whitewater-to-Ozark middle, and the short Ozark Wildlife Area finish into one long serious day.",
      "accessCaveats": [
        "Use the public ramp below the Cascade dam, not an improvised launch in the dam zone or above the structure.",
        "Once you pass the Whitewater Creek mouth, practical public bailout options become scarce until Ozark or Caven. Do not launch late or with a group that is uncertain about the mileage.",
        "Caven Bridge Access is an undeveloped east-bank access at the old bridge corridor rather than a polished ramp. Plan the finish and parking before committing to the route."
      ],
      "watchFor": [
        "A very long sequence of riffles, outside-bend boulders, wood, and fatigue-related mistakes late in the day.",
        "Fast rises and muddy water after storms, which make this full corridor much more consequential than the shorter live North Fork routes.",
        "Private banks and private campground accesses that should not be treated as public stops or fallback take-outs."
      ]
    }
  },
  "boone-river-riverside-albright": {
    "putIn": {
      "name": "Riverside Park Access",
      "latitude": 42.4677519,
      "longitude": -93.8118872
    },
    "takeOut": {
      "name": "Albright's Canoe Access",
      "latitude": 42.4054,
      "longitude": -93.8099
    },
    "logistics": {
      "distanceLabel": "About 8.1 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr depending on level and stops",
      "shuttle": "Use a two-car shuttle from Riverside Park in Webster City to Albright's Canoe Access on Inkpaduta Avenue. Briggs Woods is a logical mid-route exit if the full eight-mile day is too long.",
      "permits": "No route-specific paddling permit is known. Use established water-trail accesses and respect private land outside marked public sites.",
      "camping": "Do not assume gravel-bar camping on this navigable non-meandered stream. Briggs Woods Park has separate camping/cabin options, but those require normal park planning.",
      "summary": "Launch at Riverside Park Access in Webster City and paddle through the Boone River Trail / Briggs Woods corridor to Albright's Canoe Access. Expect wooded banks, riffles, boulders, and a faster second half below Briggs Woods.",
      "accessCaveats": [
        "Riverside Park is a city park access rather than a large outfitter landing. Locate the river access and parking before unloading.",
        "Albright's Canoe Access is managed by Hamilton County Conservation for Iowa DNR and is the cleanest public endpoint for the full Webster City-to-Albright day.",
        "The Boone is navigable, but adjacent land and streambed outside public access areas can be private. Stay with marked public sites for launching, stopping, and taking out."
      ],
      "watchFor": [
        "Strainers in the Riverside-to-Briggs Woods section, especially after storms and high water.",
        "Rocks, boulders, riffles, and moderately swift current between Briggs Woods and Albright at normal levels.",
        "Low-head dam and ledge hazards in the broader Webster City / Briggs Woods corridor; scout and portage any structure that is not clearly safe at the day's flow."
      ]
    }
  },
  "boone-river-albright-tunnel-mill": {
    "putIn": {
      "id": "albrights-canoe-access",
      "name": "Albright's Canoe Access",
      "latitude": 42.4054,
      "longitude": -93.8099
    },
    "takeOut": {
      "id": "tunnel-mill-canoe-access",
      "name": "Tunnel Mill Canoe Access",
      "latitude": 42.3537,
      "longitude": -93.8189
    },
    "logistics": {
      "distanceLabel": "About 7.5 mi",
      "estimatedPaddleTime": "About 3.5 hr, longer with low water, scouting, wood, or portage delays",
      "shuttle": "Stage the take-out at Tunnel Mill Canoe Access before driving back to Albright's Canoe Access. Do not plan to use Bevers Bridge as a normal bailout because Hamilton County notes that access is on private property.",
      "permits": "No route-specific paddling permit is known. Use public water-trail accesses, follow Iowa boating/PFD rules, and respect posted hunting, parking, and wildlife-area rules.",
      "camping": "Treat this as a day route. Bell's Mill Park downstream has campground context for a base-camp trip, but no legal on-route campsite was confirmed between Albright and Tunnel Mill.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Albright's Canoe Access and take out at Tunnel Mill for the remote, faster-gradient lower-Boone continuation. Use the Webster City gauge conservatively, avoid private Bevers Bridge access, and be ready for Class I-II rapids, boulders, wood, and the Tunnel Mill Dam remains.",
      "accessCaveats": [
        "Albright's Canoe Access is an Iowa DNR-owned / Hamilton County-managed canoe access. Inspect the landing before launch because this route begins immediately in a faster-gradient section.",
        "Tunnel Mill provides river access and parking for vehicles and canoe trailers, but it is a rural wildlife-management access rather than a staffed park.",
        "Bevers Bridge is not a routine access for this route. Hamilton County specifically notes that its canoe access is private property.",
        "The selected gauge is direct and same-river but upstream of this lower segment. Make a visual call for depth and wood before leaving Albright."
      ],
      "watchFor": [
        "Class I-II rapids, boulder gardens, outside-bend strainers, and fast current during the first two miles below Albright.",
        "The abrupt shallow drop and old Tunnel Mill Dam remains near the lower part of the route. Scout or carry if the line is not obvious.",
        "Low water below about 120 cfs at Webster City, when bony riffles and the Tunnel Mill drop become more likely.",
        "High water around or above 1,500 cfs at Webster City, when Hamilton County recommends the river only for advanced canoeists.",
        "Private banks, limited exits, cold water, and delayed rescue in the remote valley."
      ]
    },
    "accessPoints": [
      {
        "id": "albrights-canoe-access",
        "name": "Albright's Canoe Access",
        "latitude": 42.4054,
        "longitude": -93.8099,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the lower-Boone continuation below Webster City."
      },
      {
        "id": "tunnel-mill-canoe-access",
        "name": "Tunnel Mill Canoe Access",
        "latitude": 42.3537,
        "longitude": -93.8189,
        "mileFromStart": 7.5,
        "segmentKind": "creek",
        "note": "Default take-out at the Iowa DNR-owned Tunnel Mill wildlife-management access."
      }
    ]
  },
  "boone-river-tunnel-mill-bells-mill": {
    "putIn": {
      "id": "tunnel-mill-canoe-access",
      "name": "Tunnel Mill Canoe Access",
      "latitude": 42.3537,
      "longitude": -93.8189
    },
    "takeOut": {
      "id": "bells-mill-park",
      "name": "Bell's Mill Park",
      "latitude": 42.3464,
      "longitude": -93.8847
    },
    "logistics": {
      "distanceLabel": "About 5.1 mi",
      "estimatedPaddleTime": "About 2.5 hr, longer with low water, wood, or relaxed stops",
      "shuttle": "Stage the take-out at Bell's Mill Park, then drive back to Tunnel Mill. Both endpoints are rural Hamilton County access points, so confirm road, parking, and ramp conditions before unloading.",
      "permits": "No route-specific paddling permit is known. Use public access areas, follow Iowa boating/PFD rules, and obey county park and wildlife-area postings.",
      "camping": "Bell's Mill Park has endpoint campground context with restrooms and a concrete ramp, making this a base-camp-friendly day route. Do not assume informal riverbank camping between endpoints.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Tunnel Mill and take out at Bell's Mill Park for a short remote Boone River day through dense hardwood banks. The route is calmer than Albright-to-Tunnel Mill but still requires wood, low-water, and private-bank judgment.",
      "accessCaveats": [
        "Tunnel Mill is a rural wildlife-management access with parking for vehicles and canoe trailers, not a full-service launch park.",
        "Bell's Mill has a concrete boat ramp, parking, restrooms, and campground context, but it is reached by gravel-road park access. Inspect the ramp before launch.",
        "The selected Webster City gauge is upstream of this lower segment. Use it as the product gauge, then make a same-day visual check for wood and depth.",
        "Stay with public accesses and marked public land. The surrounding Boone River corridor includes private banks."
      ],
      "watchFor": [
        "Downed trees, tight wooded bends, and flood-deposited debris in a remote section with limited exits.",
        "Low water below about 120 cfs at Webster City, when sandy shallows and shallow riffles slow the route.",
        "High or rising water near or above 1,500 cfs at Webster City, when reaction time around strainers shrinks.",
        "Cold water, insects, rural-road shuttle delays, and weak cell coverage."
      ]
    },
    "accessPoints": [
      {
        "id": "tunnel-mill-canoe-access",
        "name": "Tunnel Mill Canoe Access",
        "latitude": 42.3537,
        "longitude": -93.8189,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the Iowa DNR-owned Tunnel Mill access."
      },
      {
        "id": "bells-mill-park",
        "name": "Bell's Mill Park",
        "latitude": 42.3464,
        "longitude": -93.8847,
        "mileFromStart": 5.1,
        "segmentKind": "creek",
        "note": "Default take-out with county park ramp, restroom, and campground context."
      }
    ]
  },
  "boone-river-bells-mill-boone-forks": {
    "putIn": {
      "id": "bells-mill-park",
      "name": "Bell's Mill Park",
      "latitude": 42.3464,
      "longitude": -93.8847
    },
    "takeOut": {
      "id": "boone-forks-canoe-ramp",
      "name": "Boone Forks Wildlife Area Canoe Ramp",
      "latitude": 42.312497,
      "longitude": -93.933272
    },
    "logistics": {
      "distanceLabel": "About 5.1 mi",
      "estimatedPaddleTime": "About 2.5 hr, longer with low water, wood, or take-out scouting",
      "shuttle": "Stage the take-out at Boone Forks Wildlife Area before launching at Bell's Mill. Walk down to identify the ramp and landing from shore because Iowa DNR warns the take-out can be hidden by vegetation or dead wood.",
      "permits": "No route-specific paddling permit is known. Use public county/DNR accesses, follow Iowa boating/PFD rules, and respect wildlife-area and park postings.",
      "camping": "Bell's Mill Park has endpoint campground context, but the paddle itself should be treated as a day route. Do not plan improvised camping on private banks or below Boone Forks.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Bell's Mill Park and take out at Boone Forks Wildlife Area for the final Boone water-trail segment above the Des Moines River. The take-out discipline matters: there are no take-out opportunities after Boone Forks for this route.",
      "accessCaveats": [
        "Bell's Mill is the campground-backed put-in with a concrete boat ramp and restrooms.",
        "Boone Forks is a walk-down canoe ramp with DNR-published project coordinates, but Iowa DNR says vegetation or dead wood can hide the take-out.",
        "The route ends at Boone Forks. Do not continue toward the Des Moines River confluence unless the group has a separate downstream plan.",
        "The selected Webster City gauge is upstream of this lower finish. Make a visual call for wood, water level, and landing visibility before committing."
      ],
      "watchFor": [
        "Strainers and flood-deposited wood in sandy-bottom bends, especially after rain.",
        "Missing Boone Forks take-out; there are no take-out opportunities after it according to Iowa DNR.",
        "Low water below about 120 cfs at Webster City, when dragging and sandy shallows become more likely.",
        "High water around or above 1,500 cfs at Webster City, when the hidden take-out and wood become more consequential.",
        "Private banks, limited rescue access, and the nearby Des Moines River confluence beyond the planned exit."
      ]
    },
    "accessPoints": [
      {
        "id": "bells-mill-park",
        "name": "Bell's Mill Park",
        "latitude": 42.3464,
        "longitude": -93.8847,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in with county park ramp, restroom, and campground context."
      },
      {
        "id": "boone-forks-canoe-ramp",
        "name": "Boone Forks Wildlife Area Canoe Ramp",
        "latitude": 42.312497,
        "longitude": -93.933272,
        "mileFromStart": 5.1,
        "segmentKind": "creek",
        "note": "Required take-out before the Des Moines River confluence; DNR warns no take-outs follow this point."
      }
    ]
  },
  "cedar-river-road-t38-idlewild": {
    "putIn": {
      "name": "Road T38 Access",
      "latitude": 43.253006,
      "longitude": -92.811759
    },
    "takeOut": {
      "name": "Idlewild Park Access",
      "latitude": 43.1633388,
      "longitude": -92.7540921
    },
    "logistics": {
      "distanceLabel": "10.1 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr, longer with wind, low water, or scouting",
      "shuttle": "Use a rural two-car shuttle between Road T38 south of Osage and Idlewild Park north of Floyd. Scout Idlewild before launch because the landing is a county-park access rather than a downtown ramp.",
      "permits": "No route-specific paddling permit is known. Follow posted city, county, Iowa DNR, and Iowa boating/PFD rules at public accesses.",
      "camping": "Treat this as a day trip. Idlewild is a public park access, but no legal on-route watercraft campsite was confirmed for this exact leg; Mitchell County says adjacent land is private and sandbar camping is not permitted.",
      "campingClassification": "none",
      "summary": "Launch at Road T38 south of Osage and take out at Idlewild Park north of Floyd for a longer free-flowing Cedar River leg above Charles City. Use the Charles City gauge only as a conservative corridor signal and make a same-day visual call at the put-in.",
      "accessCaveats": [
        "Road T38 and Idlewild coordinates come from the Cedar River Paddling Trips guide; follow posted access signs and parking limits rather than broad bridge shoulders.",
        "The Charles City gauge is downstream of this segment. Tributary inflow and local storms can make the upstream leg differ from the gauge reading.",
        "This is private-bank country between named public accesses. Do not assume shore stops or camping are legal away from public areas."
      ],
      "watchFor": [
        "Faster current below Road T38, bridge eddies, outside-bend wood, and shallow riffles if the gauge approaches the 200 cfs floor.",
        "High or rising water that makes landings faster and reduces reaction time around strainers.",
        "Cold shoulder-season water, limited bailouts, agricultural runoff after storms, and long rural shuttle exposure."
      ]
    },
    "accessPoints": [
      {
        "id": "road-t38-access",
        "name": "Road T38 Access",
        "latitude": 43.253006,
        "longitude": -92.811759,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for this Cedar River segment."
      },
      {
        "id": "idlewild-park-access",
        "name": "Idlewild Park Access",
        "latitude": 43.1633388,
        "longitude": -92.7540921,
        "mileFromStart": 10.1,
        "segmentKind": "creek",
        "note": "Default take-out for this Cedar River segment."
      }
    ]
  },
  "cedar-river-idlewild-rotary": {
    "putIn": {
      "name": "Idlewild Park Access",
      "latitude": 43.1633388,
      "longitude": -92.7540921
    },
    "takeOut": {
      "name": "Rotary Park Access",
      "latitude": 43.1164289,
      "longitude": -92.706542
    },
    "logistics": {
      "distanceLabel": "5.6 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with low water or stops",
      "shuttle": "Use a short rural two-car shuttle between Idlewild Park north of Floyd and Rotary Park east/south of Floyd. Check both landings before unloading because access roads and parking can be muddy after rain.",
      "permits": "No route-specific paddling permit is known. Follow posted city, county, Iowa DNR, and Iowa boating/PFD rules at public accesses.",
      "camping": "No on-route campsite was confirmed for this short day leg. Treat nearby county or city campground options as separate base-camp planning, not river-camping permission.",
      "campingClassification": "none",
      "summary": "Launch at Idlewild Park and take out at Rotary Park for a compact Floyd County Cedar River day with limestone-country scenery above Charles City. The app uses the downstream Charles City gauge as a conservative minimum-only signal.",
      "accessCaveats": [
        "Both endpoints are named in the Cedar River Paddling Trips guide with coordinates, but same-day access conditions and parking remain local/posted decisions.",
        "The Charles City gauge is downstream of the route, so use the score as a corridor check and inspect depth/current at Idlewild before launching.",
        "Private banks dominate outside public accesses. Keep stops to legal public areas unless landowner permission is explicit."
      ],
      "watchFor": [
        "Outside-bend strainers, bridge current near Floyd, shallow gravel at low water, and faster landings after rain.",
        "Wildlife/fishing use, bank anglers, and limited mid-route exit options.",
        "Rising water above the guide-published better range, especially if local storms are still moving through the watershed."
      ]
    },
    "accessPoints": [
      {
        "id": "idlewild-park-access",
        "name": "Idlewild Park Access",
        "latitude": 43.1633388,
        "longitude": -92.7540921,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for this Cedar River segment."
      },
      {
        "id": "rotary-park-access",
        "name": "Rotary Park Access",
        "latitude": 43.1164289,
        "longitude": -92.706542,
        "mileFromStart": 5.6,
        "segmentKind": "creek",
        "note": "Default take-out for this Cedar River segment."
      }
    ]
  },
  "cedar-river-rotary-charles-city-dock": {
    "putIn": {
      "name": "Rotary Park Access",
      "latitude": 43.1164289,
      "longitude": -92.706542
    },
    "takeOut": {
      "name": "Charles City Dock above Main Street Dam",
      "latitude": 43.0663169,
      "longitude": -92.6811147
    },
    "logistics": {
      "distanceLabel": "6.6 mi",
      "estimatedPaddleTime": "About 2.5 hr to 3.5 hr, longer with low water or wind",
      "shuttle": "Stage the downtown Charles City vehicle first and identify the river-right dock above Main Street Dam before driving to Rotary Park. The take-out is mandatory for this flatwater route unless the group has a separate whitewater/portage plan.",
      "permits": "No route-specific paddling permit is known. Follow posted city, county, Iowa DNR, and Iowa boating/PFD rules at public accesses.",
      "camping": "Treat this as a day trip. Downtown Charles City has services nearby, but no on-route legal camping was confirmed and the route ends in an urban dam/whitewater corridor.",
      "campingClassification": "none",
      "summary": "Launch at Rotary Park and finish at the Charles City Dock above Main Street Dam for the last flatwater Cedar River leg into town. This card intentionally ends before the dam and before the existing Charles City whitewater route.",
      "accessCaveats": [
        "Take out on river right above Main Street Dam. Do not drift past the dock toward the dam unless intentionally portaging with current local guidance.",
        "The guide notes the whitewater course below the dam, but that is represented separately in the app as a whitewater route.",
        "Downtown events, parking, or construction can affect the dock area; inspect the take-out before launching from Rotary Park."
      ],
      "watchFor": [
        "Mandatory take-out timing above Main Street Dam, especially when the Charles City gauge is above the guide-published better range.",
        "Outside-bend wood, bridge traffic/current, anglers and downtown river users, and stronger current after storms.",
        "Low water below 200 cfs that can make riffles draggy and high/rising water that narrows recovery options near the finish."
      ]
    },
    "accessPoints": [
      {
        "id": "rotary-park-access",
        "name": "Rotary Park Access",
        "latitude": 43.1164289,
        "longitude": -92.706542,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for this Cedar River segment."
      },
      {
        "id": "charles-city-dock-above-main-street-dam",
        "name": "Charles City Dock above Main Street Dam",
        "latitude": 43.0663169,
        "longitude": -92.6811147,
        "mileFromStart": 6.6,
        "segmentKind": "creek",
        "note": "Default take-out for this Cedar River segment."
      }
    ]
  },
  "cedar-river-charles-city-whitewater": {
    "putIn": {
      "name": "Charles City Whitewater Park put-in / Riverside Park",
      "latitude": 43.064968,
      "longitude": -92.677829
    },
    "takeOut": {
      "name": "Charles City Whitewater Park take-out / Riverside Park",
      "latitude": 43.064968,
      "longitude": -92.677829
    },
    "logistics": {
      "distanceLabel": "0.3 mi / 1,200 ft",
      "estimatedPaddleTime": "Play-park session; laps vary by level and skill",
      "shuttle": "No road shuttle is needed for normal park laps. Stage at Riverside Park / Riverfront Park in downtown Charles City and use the signed park exits and eddies to lap the features.",
      "permits": "No route-specific paddling fee is known. The park is free to use; follow posted Riverside Park and whitewater-course signs.",
      "camping": "Riverside camping is available nearby through R Campground, but treat that as a separate lodging reservation rather than an assumed route amenity.",
      "summary": "Use the downtown Charles City Whitewater Park access at Riverside Park for a compact Cedar River play session. The course has three constructed features, large eddies, and a direct Charles City gauge.",
      "accessCaveats": [
        "This is a whitewater play park, not a beginner float route. Wear a properly fitted PFD and helmet and match the feature to your skill level.",
        "Iowa Whitewater publishes the same GPS coordinate for put-in and take-out because normal use is a park session with repeated feature laps.",
        "Read posted signage and scout from shore before entering; course hydraulics and eddy access change substantially across the gauge range."
      ],
      "watchFor": [
        "A large dangerous dam upstream of the whitewater park; do not paddle upstream into the dam hazard.",
        "Minimal eddy access and random waves/holes above 8,000 cfs, which Iowa Whitewater describes as solid-whitewater-skill territory.",
        "Shallow feature impacts at low levels, fast rises after rain, tubers and spectators in warm weather, and aging feature performance noted by American Whitewater."
      ]
    }
  },
  "cedar-river-charles-city-nashua": {
    "putIn": {
      "name": "Charles City Dock / Riverside Park",
      "latitude": 43.064968,
      "longitude": -92.677829
    },
    "takeOut": {
      "name": "Nashua Access / Cedar Lake Park",
      "latitude": 42.95638,
      "longitude": -92.535427
    },
    "logistics": {
      "distanceLabel": "About 12 mi",
      "estimatedPaddleTime": "About 5 hr to 6 hr 30 min, longer with low water or Cedar Lake wind",
      "shuttle": "Stage the take-out at Nashua Access / Cedar Lake Park before launching from downtown Charles City. Inspect the Nashua dam area and the intended above-dam exit first; do not rely on a rushed landing at the end of the day.",
      "permits": "No route-specific paddling permit is known. Follow Charles City, Chickasaw County, Nashua, and Iowa boating/PFD rules at public accesses.",
      "camping": "Howard Woods Recreation Area has primitive camping near the downstream end of the route, and Nashua has local park amenities nearby. Treat this as base-camp support rather than an assumed mid-route overnight.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch from the downtown Charles City riverfront and take out at Nashua Access above the dam. The route continues the Cedar flatwater corridor downstream of the whitewater park, then slows into the Nashua impoundment.",
      "accessCaveats": [
        "The whitewater course and upstream dam corridor sit immediately above the put-in area; use the normal flatwater launch below that corridor unless your group is intentionally paddling whitewater.",
        "Take out at Nashua Access / Cedar Lake Park on river left above the Nashua dam. Do not drift into the dam or treat the below-dam access as part of this route.",
        "Howard Woods is a useful late-route access / primitive-camping context point, but this route is scored to the Nashua above-dam take-out."
      ],
      "watchFor": [
        "Mandatory Nashua dam take-out discipline.",
        "Wind and slower current on the Cedar Lake / Nashua impoundment approach.",
        "Fresh wood, bridge current, private banks, low-water gravel, and fast rises after storms."
      ]
    },
    "accessPoints": [
      {
        "id": "charles-city-dock",
        "name": "Charles City Dock / Riverside Park",
        "latitude": 43.064968,
        "longitude": -92.677829,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in below the downtown whitewater-course context."
      },
      {
        "id": "howard-woods",
        "name": "Howard Woods Recreation Area",
        "latitude": 42.983259,
        "longitude": -92.56122,
        "mileFromStart": 10,
        "segmentKind": "creek",
        "note": "Intermediate access and primitive-camping context about 2.5 miles above Nashua Access."
      },
      {
        "id": "nashua-access",
        "name": "Nashua Access / Cedar Lake Park",
        "latitude": 42.95638,
        "longitude": -92.535427,
        "mileFromStart": 12.5,
        "segmentKind": "creek",
        "note": "Default take-out above the Nashua dam; portage left if continuing on a separate downstream plan."
      }
    ]
  },
  "maquoketa-river-manchester-whitewater": {
    "putIn": {
      "name": "Manchester Whitewater Park access / 300 West Main Street",
      "latitude": 42.482137,
      "longitude": -91.458424
    },
    "takeOut": {
      "name": "Manchester Whitewater Park take-out / walk-back trail",
      "latitude": 42.482137,
      "longitude": -91.458424
    },
    "logistics": {
      "distanceLabel": "About 0.15 to 0.2 mi / 800 to 1,000 ft",
      "estimatedPaddleTime": "Play-park session; laps vary by level and skill",
      "shuttle": "No vehicle shuttle is needed for normal park laps. Park at 300 West Main Street, use the access near the first feature, and walk the paved trail back upstream between laps.",
      "permits": "No route-specific paddling fee is known. The city says the park is open to the public with no cost or admission; follow posted park, river, and safety signs.",
      "camping": "No on-route camping is assumed for this downtown play-park session. Use separate local lodging or campground plans if staying overnight.",
      "summary": "Use Manchester Whitewater Park for a short Maquoketa River play session through six constructed drops in downtown Manchester. The direct Manchester gauge is about one mile downstream and has a published American Whitewater flow ladder.",
      "accessCaveats": [
        "This is a whitewater play park rather than a downstream float route; use it as repeated laps unless you separately plan a longer Maquoketa trip.",
        "The city says recreational users need to judge when the river is too much for them and specifically advises proper water shoes, a secured PFD, and a helmet.",
        "Iowa Whitewater publishes a single park coordinate, and the city describes flexible access along the course, so the app uses the public parking/first-feature access as both the put-in anchor and take-out anchor."
      ],
      "watchFor": [
        "Very shallow, scrapey constructed features below about 100 cfs on the Manchester gauge.",
        "Pushier eddies and increasingly flushy, irregular features above about 1,200 cfs.",
        "High-water Class III behavior above about 5,000 cfs; keep this outside the broad recreational recommendation.",
        "Tubers, swimmers, SUPs, anglers, spectators, rocks, and changing feature hydraulics in a busy downtown river park."
      ]
    }
  },
  "north-skunk-river-delta-sigourney": {
    "putIn": {
      "id": "delta-north-skunk-access",
      "name": "Delta / North Skunk River access",
      "latitude": 41.323,
      "longitude": -92.329
    },
    "takeOut": {
      "id": "sigourney-skunk-river-access",
      "name": "Sigourney / South Skunk River Access corridor",
      "latitude": 41.3008,
      "longitude": -92.2046
    },
    "logistics": {
      "distanceLabel": "About 10 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr, longer with wood or low water",
      "shuttle": "Stage the Sigourney take-out corridor first, then drive back to Delta. Confirm the exact signed access and parking at both ends before launching because the app uses access-corridor coordinates from DNR map and gauge context.",
      "permits": "No route-specific paddling permit is known. Use only signed public access areas, follow Iowa boating/PFD requirements, and respect local parking or conservation-area rules.",
      "camping": "Treat this as a day trip. No verified on-route campground or legal bank-camping plan was found for the Delta-to-Sigourney reach; adjoining rural banks should be treated as private unless posted public.",
      "campingClassification": "none",
      "summary": "Launch near Delta and paddle the North Skunk toward the Sigourney access corridor. The direct Sigourney gauge and CanWePaddle range make this scoreable, but endpoint signs, wood, and rural private-bank boundaries need same-day confirmation.",
      "accessCaveats": [
        "Endpoint coordinates are practical access-corridor anchors, not surveyed ramp points. Use posted access signs and current local conditions.",
        "The DNR Skunk River map shows the North Skunk / Skunk River access corridor and Sigourney access context, but the exact launch/landing line should be verified before boats are unloaded.",
        "Do not improvise private-bank take-outs between Delta and Sigourney unless there is clear public access or landowner permission."
      ],
      "watchFor": [
        "Fresh logjams, sweepers, and blocked bridge openings after rain.",
        "Low-water dragging below about 100 cfs on the North Skunk near Sigourney gauge.",
        "Fast, muddy, debris-laden water above about 1,500 cfs or on a rising hydrograph.",
        "Rural shuttle exposure, limited bailout options, private banks, and cold-water conditions outside summer."
      ]
    },
    "accessPoints": [
      {
        "id": "delta-north-skunk-access",
        "name": "Delta / North Skunk River access",
        "latitude": 41.323,
        "longitude": -92.329,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Practical Delta access-corridor anchor; verify the signed launch before committing."
      },
      {
        "id": "sigourney-skunk-river-access",
        "name": "Sigourney / South Skunk River Access corridor",
        "latitude": 41.3008,
        "longitude": -92.2046,
        "mileFromStart": 10,
        "segmentKind": "creek",
        "note": "Take-out corridor near the direct North Skunk at Sigourney gauge; verify posted access."
      }
    ]
  },
  "yellow-river-volney-sixteen-bridge": {
    "putIn": {
      "name": "Volney Canoe Access",
      "latitude": 43.13022,
      "longitude": -91.37586
    },
    "takeOut": {
      "name": "Bridge Sixteen Canoe Access",
      "latitude": 43.1277592,
      "longitude": -91.3140227
    },
    "logistics": {
      "distanceLabel": "About 4.6 to 5 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr depending on level and stops",
      "shuttle": "Use a rural two-car shuttle between Volney Canoe Access and Bridge Sixteen. Roads are steep and gravelly enough that bike shuttles are a commitment; local shuttle/rental services commonly serve this corridor.",
      "permits": "No route-specific paddling permit is known. Follow Iowa DNR fishing/access rules and respect private property along the Yellow River.",
      "camping": "No on-route camping assumed for this short day run. Use established campground or state-forest options only with separate planning.",
      "summary": "Launch at Volney Canoe Access and take out at Bridge Sixteen. This is the popular short Yellow River leg with clear water, fast riffles, trout-stream character, and limestone outcrops.",
      "accessCaveats": [
        "Volney is the cleaner public put-in than the upstream Volney Road bridge used for the longer WRT trip report.",
        "Use the public Bridge Sixteen access downstream of the bridge. Do not use nearby Scenic View Campground facilities unless you are a customer.",
        "Much of the river corridor is private. Stay with established access points and do not assume gravel bars or banks are public picnic sites."
      ],
      "watchFor": [
        "Frequent Class I riffles and fast current; at high water some rapids can approach Class II consequences.",
        "Three or four strainers are noted on the route, including at least one that may require an easy portage at normal levels.",
        "Cold water, trout anglers, cloudy post-rain water, and fast rises after heavy rain."
      ]
    }
  },
  "cedar-river-nashua-pearl-rock": {
    "putIn": {
      "id": "nashua-below-dam-access",
      "name": "Nashua below-dam access / Veterans Memorial Park portage",
      "latitude": 42.95638,
      "longitude": -92.535427
    },
    "takeOut": {
      "id": "pearl-rock-access",
      "name": "Pearl Rock access",
      "latitude": 42.910715,
      "longitude": -92.543001
    },
    "logistics": {
      "distanceLabel": "6.1 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with low water or headwind",
      "shuttle": "Stage the small Pearl Rock take-out first, then return to Nashua. Launch only from the public below-dam side of the Nashua portage corridor; do not start above the dam for this downstream route.",
      "permits": "No route-specific paddling permit is known. Follow Nashua, Chickasaw County, Iowa DNR, and Iowa boating/PFD rules at public accesses.",
      "camping": "Treat this as a short day route. Howard Woods and North Cedar Park can support nearby/base-camp planning on the broader corridor, but no on-route campsite was verified for the Nashua-to-Pearl split.",
      "campingClassification": "none",
      "summary": "Launch below the Nashua dam and paddle the short downstream Cedar River leg to Pearl Rock. This fills the first gap below the existing Charles City-to-Nashua card while keeping dam exposure explicit.",
      "accessCaveats": [
        "Use the Veterans Memorial Park / Nashua Access portage system to get below the dam; do not drift over or launch upstream of the dam.",
        "Pearl Rock has a small parking lot that the guide says holds only a couple of vehicles. Confirm parking and the landing before launching.",
        "The Waverly gauge is downstream of the route and should be paired with same-day visual checks at Nashua."
      ],
      "watchFor": [
        "Dam-adjacent launch discipline at Nashua and swift water if the river is high or rising.",
        "Fresh wood, low-water gravel, bridge current, private banks, and limited public exits.",
        "Small take-out capacity at Pearl Rock and possible agricultural runoff after storms."
      ]
    },
    "accessPoints": [
      {
        "id": "nashua-below-dam-access",
        "name": "Nashua below-dam access / Veterans Memorial Park portage",
        "latitude": 42.95638,
        "longitude": -92.535427,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Public Nashua access/portage corridor; launch only below the dam for this route."
      },
      {
        "id": "pearl-rock-access",
        "name": "Pearl Rock access",
        "latitude": 42.910715,
        "longitude": -92.543001,
        "mileFromStart": 6.1,
        "segmentKind": "creek",
        "note": "Guide-listed take-out with only a small parking lot; verify capacity from land."
      }
    ]
  },
  "cedar-river-pearl-rock-north-cedar": {
    "putIn": {
      "id": "pearl-rock-access",
      "name": "Pearl Rock access",
      "latitude": 42.910715,
      "longitude": -92.543001
    },
    "takeOut": {
      "id": "north-cedar-park",
      "name": "North Cedar Park boat ramp / canoe access",
      "latitude": 42.849516,
      "longitude": -92.522648
    },
    "logistics": {
      "distanceLabel": "6.5 mi",
      "estimatedPaddleTime": "About 2.5 hr to 3.5 hr, longer with low water, wind, or wood",
      "shuttle": "Stage at North Cedar Park east of Plainfield, then return to Pearl Rock. Keep the Pearl Rock vehicle count low and use only the public access footprint.",
      "permits": "No route-specific paddling permit is known. Follow posted county park rules, Iowa DNR rules, and Iowa boating/PFD requirements.",
      "camping": "North Cedar Park has campground support at the take-out, including first-come camping, water, restrooms, and showers according to Bremer County / MyCountyParks. Do not assume private-bank camping between accesses.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Pearl Rock and take out at North Cedar Park for a compact Cedar River day ending at a county park with verified river access and camping.",
      "accessCaveats": [
        "Pearl Rock parking is limited; do not block roads or private drives.",
        "North Cedar Park is the normal downstream access and campground anchor; use the park boat ramp/canoe access and follow posted camping rules.",
        "The selected gauge is downstream at Waverly, so visual checks at Pearl Rock still control the launch decision."
      ],
      "watchFor": [
        "Wood on outside bends, shallow gravel near the 200 cfs floor, and faster current after rain.",
        "Private banks and old river oxbows outside the public park and wildlife-area corridor.",
        "Cold shoulder-season water and limited public bailout options."
      ]
    },
    "accessPoints": [
      {
        "id": "pearl-rock-access",
        "name": "Pearl Rock access",
        "latitude": 42.910715,
        "longitude": -92.543001,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; small parking area noted by the paddling guide."
      },
      {
        "id": "north-cedar-park",
        "name": "North Cedar Park boat ramp / canoe access",
        "latitude": 42.849516,
        "longitude": -92.522648,
        "mileFromStart": 6.5,
        "segmentKind": "creek",
        "note": "Default take-out with Bremer County boat ramp, canoe access, and campground support."
      }
    ]
  },
  "cedar-river-north-cedar-cedar-bend": {
    "putIn": {
      "id": "north-cedar-park",
      "name": "North Cedar Park boat ramp / canoe access",
      "latitude": 42.849516,
      "longitude": -92.522648
    },
    "takeOut": {
      "id": "cedar-bend-park",
      "name": "Cedar Bend Park access",
      "latitude": 42.760425,
      "longitude": -92.493585
    },
    "logistics": {
      "distanceLabel": "8.3 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with wind, low water, or scouting",
      "shuttle": "Stage the take-out at Cedar Bend Park northwest of Waverly, then return to North Cedar Park. Confirm Cedar Bend gate/vehicle access during shoulder season before committing.",
      "permits": "No route-specific paddling permit is known. Follow Bremer County park rules, Iowa DNR rules, and Iowa boating/PFD requirements.",
      "camping": "Both endpoints have campground context. North Cedar Park has first-come camping and Cedar Bend Park has more than 60 campground sites with seasonal gate limits; reserve or verify locally before relying on overnight support.",
      "campingClassification": "endpoint_campground",
      "summary": "Paddle from North Cedar Park to Cedar Bend Park through the Bremer County Cedar corridor. The route is a longer county-park connector and intentionally stops before the Waverly dam-portage sequence.",
      "accessCaveats": [
        "North Cedar and Cedar Bend coordinates come from the Cedar River Paddling Trips guide and county park context; follow posted park access and camping rules.",
        "Cedar Bend vehicle access is seasonal, with the park gate normally open May 1 through October 31 according to Bremer County.",
        "Do not treat this route as a through-Waverly dam run unless you separately plan Cedar Bend-to-Three-Rivers and the Kohlmann/Brookwood portage."
      ],
      "watchFor": [
        "Longer rural exposure, outside-bend wood, bridge current, private banks, and limited bailouts.",
        "High or rising water that makes wooded bends and landings pushier despite the minimum-only score.",
        "Low-water gravel and slower travel if the Waverly gauge approaches 200 cfs."
      ]
    },
    "accessPoints": [
      {
        "id": "north-cedar-park",
        "name": "North Cedar Park boat ramp / canoe access",
        "latitude": 42.849516,
        "longitude": -92.522648,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in with Bremer County boat ramp, canoe access, and campground support."
      },
      {
        "id": "cedar-bend-park",
        "name": "Cedar Bend Park access",
        "latitude": 42.760425,
        "longitude": -92.493585,
        "mileFromStart": 8.3,
        "segmentKind": "creek",
        "note": "Default take-out at Bremer County park; confirm seasonal gate and campground status."
      }
    ]
  },
  "cedar-river-cedar-bend-three-rivers": {
    "putIn": {
      "id": "cedar-bend-park",
      "name": "Cedar Bend Park access",
      "latitude": 42.760425,
      "longitude": -92.493585
    },
    "takeOut": {
      "id": "three-rivers-park",
      "name": "Three Rivers Park boat ramp",
      "latitude": 42.73722,
      "longitude": -92.469794
    },
    "logistics": {
      "distanceLabel": "4.2 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer with wind, low water, or scouting",
      "shuttle": "Stage at Three Rivers Park on the north edge of Waverly, then launch from Cedar Bend Park. Confirm Cedar Bend gate and vehicle access before unloading, especially outside the May-through-October park season.",
      "permits": "No route-specific paddling permit is known. Follow Bremer County and City of Waverly park rules, Iowa DNR rules, and Iowa boating/PFD requirements.",
      "camping": "Cedar Bend Park has campground support near the put-in, but this route is a short day connector. Use campground reservations or county rules rather than assuming on-river overnight use.",
      "campingClassification": "endpoint_campground",
      "summary": "Paddle the short Cedar Bend-to-Three Rivers connector into Waverly and take out before the dam-portage corridor. This fills the official guide gap between the North Cedar/Cedar Bend cards and the Waverly/Brookwood downstream card.",
      "accessCaveats": [
        "Cedar Bend and Three Rivers coordinates come from the Cedar River Paddling Trips guide; use posted park/ramp signs for final boat handling.",
        "Three Rivers Park has a double boat ramp and dock according to the guide, and is the required take-out for this card.",
        "Do not continue into the Waverly dam sequence unless your group separately plans the Kohlmann portage and below-dam relaunch."
      ],
      "watchFor": [
        "Waverly dam approach discipline after Three Rivers Park.",
        "Outside-bend wood, bridge debris, faster current after rain, and cold shoulder-season water.",
        "Private banks outside public parks and public land boundaries."
      ]
    },
    "accessPoints": [
      {
        "id": "cedar-bend-park",
        "name": "Cedar Bend Park access",
        "latitude": 42.760425,
        "longitude": -92.493585,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at Bremer County Cedar Bend Park; confirm seasonal gate and campground status."
      },
      {
        "id": "three-rivers-park",
        "name": "Three Rivers Park boat ramp",
        "latitude": 42.73722,
        "longitude": -92.469794,
        "mileFromStart": 4.2,
        "segmentKind": "creek",
        "note": "Default take-out before the Waverly dam-portage corridor; guide notes double ramp and dock."
      }
    ]
  },
  "cedar-river-three-rivers-kohlmann": {
    "putIn": {
      "id": "three-rivers-park",
      "name": "Three Rivers Park boat ramp",
      "latitude": 42.73722,
      "longitude": -92.469794
    },
    "takeOut": {
      "id": "kohlmann-park-portage",
      "name": "Kohlmann Park portage take-out",
      "latitude": 42.726601,
      "longitude": -92.47203
    },
    "logistics": {
      "distanceLabel": "1.3 mi",
      "estimatedPaddleTime": "Short connector; allow extra time to scout and execute the dam portage",
      "shuttle": "Stage a vehicle or carry plan at Kohlmann Park before launching at Three Rivers Park. Walk the Kohlmann landing first because the guide says it is commonly used for the dam portage but is not an official access.",
      "permits": "No route-specific paddling permit is known. Follow City of Waverly park rules, Iowa DNR rules, and Iowa boating/PFD requirements.",
      "camping": "No on-route camping. This is a short Waverly dam-portage connector through city-park context.",
      "campingClassification": "none",
      "summary": "Use this as the upstream approach from Three Rivers Park to the Kohlmann Park portage take-out above the Waverly dam. It is short, but the take-out is mandatory and should be scouted from land.",
      "accessCaveats": [
        "Kohlmann Park is described by the guide as the common dam-portage take-out, not an official access. Confirm the landing, current, and carry path before launching.",
        "Do not pass the Kohlmann take-out or paddle toward the dam. Stand down if high water, debris, or crowding makes the landing uncertain.",
        "Three Rivers has a double ramp and dock, but the downstream endpoint is a portage landing rather than a routine ramp take-out."
      ],
      "watchFor": [
        "Mandatory take-out above the Waverly dam on river right.",
        "Short decision window, urban debris, slippery banks, and fast current at higher stages.",
        "Pedestrian and park traffic around downtown Waverly."
      ]
    },
    "accessPoints": [
      {
        "id": "three-rivers-park",
        "name": "Three Rivers Park boat ramp",
        "latitude": 42.73722,
        "longitude": -92.469794,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in with guide-documented double ramp and dock."
      },
      {
        "id": "kohlmann-park-portage",
        "name": "Kohlmann Park portage take-out",
        "latitude": 42.726601,
        "longitude": -92.47203,
        "mileFromStart": 1.3,
        "segmentKind": "creek",
        "note": "Mandatory river-right portage take-out above the Waverly dam; commonly used but not an official access per the guide."
      }
    ]
  },
  "cedar-river-kohlmann-brookwood": {
    "putIn": {
      "id": "kohlmann-park-below-dam-relaunch",
      "name": "Kohlmann Park below-dam relaunch corridor",
      "latitude": 42.726601,
      "longitude": -92.47203
    },
    "takeOut": {
      "id": "brookwood-park",
      "name": "Brookwood Park non-motorized boat ramp",
      "latitude": 42.720963,
      "longitude": -92.464754
    },
    "logistics": {
      "distanceLabel": "1.1 mi",
      "estimatedPaddleTime": "Short connector; plan more time for the dam portage than for paddling",
      "shuttle": "Complete the Waverly dam portage and relaunch only below the dam from the Kohlmann corridor, then take out at Brookwood Park south of the Green Bridge. Identify the Brookwood non-motorized ramp before launching.",
      "permits": "No route-specific paddling permit is known. Follow City of Waverly park rules, Iowa DNR rules, and Iowa boating/PFD requirements.",
      "camping": "No on-route camping. This is a short downtown Waverly connector between city parks.",
      "campingClassification": "none",
      "summary": "Relaunch below the Waverly dam after the Kohlmann portage and paddle the short downtown connector to Brookwood Park. This card keeps the dam run out of scope and uses Brookwood as the first normal downstream take-out.",
      "accessCaveats": [
        "Do not run the Waverly dam. This route begins only after a completed portage and below-dam relaunch.",
        "Brookwood Park has a City of Waverly non-motorized boat ramp and paved parking; use the signed park access rather than informal banks.",
        "Because the route is short, missed take-out or high-water errors compound quickly into the longer Brookwood-to-Janesville route."
      ],
      "watchFor": [
        "Dam hydraulics and turbulent current near the below-dam relaunch corridor.",
        "Urban debris, bridge current, strainers, and cold water.",
        "Brookwood take-out timing before unintentionally continuing downstream."
      ]
    },
    "accessPoints": [
      {
        "id": "kohlmann-park-below-dam-relaunch",
        "name": "Kohlmann Park below-dam relaunch corridor",
        "latitude": 42.726601,
        "longitude": -92.47203,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Relaunch only below the Waverly dam after completing the portage; verify the safe relaunch point locally."
      },
      {
        "id": "brookwood-park",
        "name": "Brookwood Park non-motorized boat ramp",
        "latitude": 42.720963,
        "longitude": -92.464754,
        "mileFromStart": 1.1,
        "segmentKind": "creek",
        "note": "Default take-out; City of Waverly documents a non-motorized boat ramp and paved parking."
      }
    ]
  },
  "yellow-river-sixteen-bridge-highway-76": {
    "putIn": {
      "name": "Bridge Sixteen Canoe Access",
      "latitude": 43.1277592,
      "longitude": -91.3140227
    },
    "takeOut": {
      "name": "Highway 76 / Yellow River mouth access",
      "latitude": 43.08612,
      "longitude": -91.18213
    },
    "logistics": {
      "distanceLabel": "16.75 mi",
      "estimatedPaddleTime": "Long day, about 5 hr to 6.5 hr depending on level and stops",
      "shuttle": "Use a two-car or local outfitter shuttle between Bridge Sixteen and the Highway 76 mouth-area access. Avoid a bike shuttle unless you are comfortable with a long hilly Highway 76 shoulder route.",
      "permits": "No route-specific paddling permit is known. Follow Iowa DNR, Yellow River State Forest, Effigy Mounds, railroad-area, and posted access rules; use only established public access points.",
      "camping": "Yellow River State Forest has designated camping options, including canoe-in context on DNR maps. Do not assume informal riverbank camping is allowed; Miles Paddled notes state forest camping is limited to designated areas.",
      "summary": "Launch from the public Bridge Sixteen access below the bridge and paddle the long lower Yellow River to the Highway 76 / railroad bridge area near the Mississippi. Expect fast early miles, bluffs, riffles, public-land solitude, and a floodplain finish near Effigy Mounds.",
      "accessCaveats": [
        "Use the public Bridge Sixteen launch downstream and river left of the bridge. Do not use Scenic View Campground take-outs, bathrooms, or private banks unless you are a paying customer or have permission.",
        "The Highway 76 finish is a mouth-area access near railroad and highway infrastructure. Scout the take-out before launching, especially if the Mississippi is high or debris is present.",
        "The route is almost 17 miles and becomes harder to shorten once committed below the Ion Road area; plan daylight and shuttle carefully."
      ],
      "watchFor": [
        "Frequent riffles and Class I+ current, with stronger rapids in the Sixteen-to-Ion stretch and pushier behavior as the Ion gauge rises.",
        "Sweepers, strainers, tight bends, rock walls, and occasional portage-worthy wood.",
        "Mississippi River backwater, floating debris, and confusing banks near the mouth at high river stages.",
        "Cold water, trout anglers, private campground banks at the put-in, and posted land-management rules through Yellow River State Forest and Effigy Mounds."
      ]
    }
  },
  "yellow-river-ion-highway-76": {
    "putIn": {
      "id": "ion-bridge-access",
      "name": "Ion Bridge Access / Old Mission Road canoe access",
      "latitude": 43.11191667,
      "longitude": -91.2651389
    },
    "takeOut": {
      "id": "highway-76-yellow-river-access",
      "name": "Highway 76 / Yellow River access",
      "latitude": 43.08612,
      "longitude": -91.18213
    },
    "logistics": {
      "distanceLabel": "About 7 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low-water scraping or wood scouting",
      "shuttle": "Stage at the Highway 76 lower-river access first, then launch from the Ion Bridge / Old Mission Road canoe access. Confirm both landings from the road because this short split has fast water and limited clean alternates.",
      "permits": "No route-specific paddling permit is known. Follow Iowa DNR, Yellow River State Forest, Effigy Mounds, railroad-area, and posted access rules.",
      "camping": "Yellow River State Forest has designated camping and canoe-in campsite context nearby, but this short access-pair route should be treated as a day run unless a separate legal state-forest camping plan is confirmed.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at the Ion Bridge / Old Mission Road canoe access and paddle the lower-Yellow split to the Highway 76 access, using the direct Ion gauge and the official water-trail low-water floor.",
      "accessCaveats": [
        "Highway 76 and Ion access coordinates are practical access anchors; use signed parking and launch paths rather than railroad, highway, or private banks.",
        "Highway 76 is the planned take-out. Missing it changes the trip into a different lower-Yellow plan with more public-land and Mississippi-backwater exposure.",
        "The water-trail guide and CanWePaddle support the broader Volney-to-Ion family, so make a visual check for local wood, depth, and take-out conditions before launching."
      ],
      "watchFor": [
        "Class I riffles, shallow rocks, tight bends, and occasional portage-worthy strainers.",
        "Fast rises and pushier current above the selected 900 cfs ceiling.",
        "Private banks, trout anglers, cold water, and designated-only camping rules in the state forest corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "ion-bridge-access",
        "name": "Ion Bridge Access / Old Mission Road canoe access",
        "latitude": 43.11191667,
        "longitude": -91.2651389,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in near the direct USGS Ion gauge and DNR-mapped canoe access / parking corridor."
      },
      {
        "id": "highway-76-yellow-river-access",
        "name": "Highway 76 / Yellow River access",
        "latitude": 43.08612,
        "longitude": -91.18213,
        "mileFromStart": 7,
        "segmentKind": "creek",
        "note": "Default take-out at the lower Yellow River Highway 76 access corridor."
      }
    ]
  },
  "wapsipinicon-river-independence-quasqueton": {
    "putIn": {
      "id": "knotts-landing-independence",
      "name": "Knott's Landing / Three Elms launch corridor",
      "latitude": 42.4576,
      "longitude": -91.8948
    },
    "takeOut": {
      "id": "quasqueton-campground-access",
      "name": "Quasqueton Campground / Wapsipinicon River access",
      "latitude": 42.3956,
      "longitude": -91.7587
    },
    "logistics": {
      "distanceLabel": "About 9 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, sandbar stops, or wind",
      "shuttle": "Stage the take-out in Quasqueton, then drive back to the Independence launch corridor. Knott's Landing and Three Elms are both below the Independence dam complex; use same-day signs and ramp conditions to choose the cleaner put-in.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Iowa boating and PFD rules, and respect local park hours and parking signs.",
      "camping": "Quasqueton has campground/river-access support and the guide notes camping in Independence or nearby county parks, so this works as a base-camp day route. Do not imply private-bank camping; use public campgrounds or legal sandbar stops only where conditions and Iowa meandered-stream rules allow.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch below Independence and take out at Quasqueton for the most popular Buchanan County Wapsi canoeing stretch. Use the direct Independence gauge and avoid quickly rising or flood-stage water.",
      "accessCaveats": [
        "This route starts below the Independence dam complex. Do not drift through or launch above the dams as part of this card.",
        "Iron Bridge Access is a source-backed midway split point if the group wants a shorter trip or needs a bailout.",
        "The route uses practical map anchors for the Independence and Quasqueton launch corridors. On-site signs, current ramps, and park rules control the exact launch and landing.",
        "Powerboats and jet skis can appear near Independence, especially around the wider reservoir-style water above town."
      ],
      "watchFor": [
        "Quick rises, flood-stage water, logs, cutbank strainers, rocks just below the surface, and shifting sandbars.",
        "Private banks outside public access points, public lands, or legal sandbar stops.",
        "Low water below about 150 cfs at Independence, when bony shallows and dragging become likely.",
        "High water above about 2,000 cfs at Independence, when the published range says the river becomes pushy and then dangerous."
      ]
    },
    "accessPoints": [
      {
        "id": "knotts-landing-independence",
        "name": "Knott's Landing / Three Elms launch corridor",
        "latitude": 42.4576,
        "longitude": -91.8948,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in corridor below the Independence dams; the guide also names Three Elms as a downstream launch option."
      },
      {
        "id": "iron-bridge-access",
        "name": "Iron Bridge Access",
        "latitude": 42.4238,
        "longitude": -91.8162,
        "mileFromStart": 4.5,
        "segmentKind": "creek",
        "note": "Official shorter-trip split point with parking and a concrete ramp."
      },
      {
        "id": "quasqueton-campground-access",
        "name": "Quasqueton Campground / Wapsipinicon River access",
        "latitude": 42.3956,
        "longitude": -91.7587,
        "mileFromStart": 9,
        "segmentKind": "creek",
        "note": "Default take-out in the Quasqueton campground and city river-access corridor."
      }
    ]
  },
  "raccoon-river-van-meter-walnut-woods": {
    "putIn": {
      "id": "van-meter-access",
      "name": "Van Meter Access",
      "latitude": 41.5355,
      "longitude": -93.9557
    },
    "takeOut": {
      "id": "walnut-woods-state-park-ramp",
      "name": "Walnut Woods State Park boat ramp",
      "latitude": 41.53808,
      "longitude": -93.74811
    },
    "logistics": {
      "distanceLabel": "About 10 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, wind, or ledge scouting",
      "shuttle": "Stage the take-out at the west-end Walnut Woods boat ramp, then drive back to Van Meter. Inspect Commerce Ledges and the Walnut Woods landing plan before launching when the Van Meter gauge is rising or above moderate levels.",
      "permits": "No route-specific paddling permit is known. Follow Iowa boating and PFD rules, use the named public access points, and obey state-park and city parking rules.",
      "camping": "Walnut Woods State Park has a campground at the take-out park, making this an endpoint-campground day route. Do not continue downstream toward Water Works as a camping or casual extension; that is a separate urban dam corridor.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Van Meter and take out at Walnut Woods for a lower-Raccoon greenbelt route above the Water Works dam corridor. The direct Van Meter gauge controls the score.",
      "accessCaveats": [
        "Take out at Walnut Woods for this route. Downstream Water Works and Scott Street dam handling is not included.",
        "Commerce Ledges at Walnut Woods can be challenging at moderate to high water and may require a river-right portage.",
        "Walnut Woods is a state park; use the west-end ramp and current park parking rules rather than landing on informal banks.",
        "The Van Meter put-in coordinate is a practical access anchor for the city access corridor and should be checked against current local signage."
      ],
      "watchFor": [
        "Commerce Ledges waves, exposed ledges at lower water, strainers, bridge current, fishing lines, and fast urban-watershed rises.",
        "Low water below about 300 cfs at Van Meter, when shallow spots and slow scraping become likely.",
        "High water above about 5,000 cfs at Van Meter, when the published range becomes pushy and the ledges and eddies get less forgiving.",
        "Private banks and a mandatory route end above downstream dam infrastructure."
      ]
    },
    "accessPoints": [
      {
        "id": "van-meter-access",
        "name": "Van Meter Access",
        "latitude": 41.5355,
        "longitude": -93.9557,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default lower-Raccoon put-in in the Van Meter access corridor."
      },
      {
        "id": "walnut-woods-state-park-ramp",
        "name": "Walnut Woods State Park boat ramp",
        "latitude": 41.53808,
        "longitude": -93.74811,
        "mileFromStart": 10,
        "segmentKind": "creek",
        "note": "Default take-out at the state-park ramp above the more urban Water Works corridor."
      }
    ]
  },
  "south-raccoon-river-redfield-van-meter": {
    "putIn": {
      "id": "south-raccoon-river-access-redfield",
      "name": "South Raccoon River Access / Redfield corridor",
      "latitude": 41.58944,
      "longitude": -94.15111
    },
    "takeOut": {
      "id": "van-meter-access",
      "name": "Van Meter Access",
      "latitude": 41.5355,
      "longitude": -93.9557
    },
    "logistics": {
      "distanceLabel": "About 13 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, wind, or wood scouting",
      "shuttle": "Use a two-car shuttle between the South Raccoon River Access south of Redfield and Van Meter Access. Check the Van Meter gauge and make a visual call at the put-in because the Dallas County corridor can rise quickly after rain.",
      "permits": "No route-specific paddling permit is known. Use the public Dallas County and Van Meter accesses, follow Iowa boating/PFD rules, and respect posted parking or park-hour limits.",
      "camping": "No on-route public campsite is documented for this Redfield-to-Van Meter day section. Treat nearby parks or lodging as separate base-camp planning, not river-corridor camping.",
      "summary": "Launch from the Dallas County South Raccoon River Access near Redfield and paddle the South Raccoon to Van Meter before the lower Raccoon greenbelt route begins. The direct Van Meter gauge controls the score, with the conservative floor set at the route-specific 150 cfs minimum.",
      "accessCaveats": [
        "Dallas County describes the South Raccoon River Access as a small gravel carry-down access south of Redfield near the F-60 corridor. Confirm the signed access and parking before unloading.",
        "Van Meter Access is the required take-out for this route. Continuing to Walnut Woods is a separate lower-Raccoon route with additional ledge and urban-water hazards.",
        "Pleasant Valley and Earlham Bridge are useful official corridor names for shortening or bailout planning, but the default app route uses Redfield-to-Van Meter endpoints.",
        "Most banks are private outside public access points. Do not assume sandbars, farm banks, or bridge rights-of-way are legal stops."
      ],
      "watchFor": [
        "Shallow riffles and dragging below about 150 cfs on the Van Meter gauge.",
        "Fast current, fewer recovery eddies, wood, and harder bridge approaches above about 2,500 cfs on the Van Meter gauge.",
        "Sweepers, logjams, strainers, fishing lines, confluence currents, and rapidly changing water after thunderstorms.",
        "Commerce Ledges and downstream dam corridors are not part of this route; take out at Van Meter as planned."
      ]
    },
    "accessPoints": [
      {
        "id": "south-raccoon-river-access-redfield",
        "name": "South Raccoon River Access / Redfield corridor",
        "latitude": 41.58944,
        "longitude": -94.15111,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Dallas County carry-down access south of Redfield in the South Raccoon water-trail corridor."
      },
      {
        "id": "van-meter-access",
        "name": "Van Meter Access",
        "latitude": 41.5355,
        "longitude": -93.9557,
        "mileFromStart": 13,
        "segmentKind": "creek",
        "note": "Planned take-out before the separate Van Meter-to-Walnut Woods lower-Raccoon route."
      }
    ]
  },
  "north-raccoon-river-eureka-henderson": {
    "putIn": {
      "id": "eureka-bridge-access",
      "name": "Eureka Bridge Access",
      "latitude": 42.0156,
      "longitude": -94.4384
    },
    "takeOut": {
      "id": "henderson-park-access",
      "name": "Henderson Park Access",
      "latitude": 41.9698,
      "longitude": -94.3766
    },
    "logistics": {
      "distanceLabel": "About 4.5 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with low water, wood, or scouting",
      "shuttle": "Stage the take-out at Henderson Park south of Jefferson, then drive back to Eureka Bridge Access west of Jefferson. Make a visual gauge check at Eureka because the numeric range is for the broader Jefferson corridor rather than this exact short split.",
      "permits": "No route-specific paddling permit is known. Use the Greene County public accesses, follow Iowa boating and PFD rules, and observe posted county park hours and ramp rules.",
      "camping": "Treat this as a day route. Nearby Greene County and Whiterock-area camping can support a base-camp trip, but the normal Eureka-to-Henderson paddle does not include an on-route campsite.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Eureka Bridge Access and take out at Henderson Park for the shorter half of the official McMahon-to-Henderson North Raccoon water-trail section. Use the Jefferson gauge conservatively and scout wood and the Henderson rock-dam area.",
      "accessCaveats": [
        "Greene County says Eureka Bridge is 4.5 miles upstream of Henderson Park, matching the short split from the DNR guide.",
        "The DNR guide warns about a rock dam above Henderson Park Access. Identify the take-out and any required carry before relaxing near the finish.",
        "The threshold range is route-adjacent rather than exact. Make a same-day visual call for wood, depth, and current at Eureka.",
        "Most banks are private outside public accesses; do not use farm banks as routine stops."
      ],
      "watchFor": [
        "Downed trees and log piles at sharp bends, especially when current is up.",
        "Rock-dam current near Henderson Park, riffles, shallow bony lines, and bank-swallows/bluff erosion zones.",
        "Low water below about 150 cfs at Jefferson, when dragging and bony riffles become likely.",
        "High water above about 2,000 cfs at Jefferson, when the broader published range becomes pushy and rescue margins shrink."
      ]
    },
    "accessPoints": [
      {
        "id": "eureka-bridge-access",
        "name": "Eureka Bridge Access",
        "latitude": 42.0156,
        "longitude": -94.4384,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; Greene County identifies this as a public boating access on the North Raccoon."
      },
      {
        "id": "henderson-park-access",
        "name": "Henderson Park Access",
        "latitude": 41.9698,
        "longitude": -94.3766,
        "mileFromStart": 4.5,
        "segmentKind": "creek",
        "note": "Default take-out at the county park ramp south of Jefferson."
      }
    ]
  },
  "des-moines-river-fort-dodge-lehigh": {
    "putIn": {
      "id": "south-river-district-access",
      "name": "South River District Access",
      "latitude": 42.4892,
      "longitude": -94.1856
    },
    "takeOut": {
      "id": "lehigh-des-moines-river-access",
      "name": "Lehigh Des Moines River access",
      "latitude": 42.3583,
      "longitude": -94.0525
    },
    "logistics": {
      "distanceLabel": "About 14 to 15 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with low water, riffle scouting, or bluff stops",
      "shuttle": "Stage the Lehigh take-out first, then drive back to South River District Access in Fort Dodge. Check Dolliver State Park as a mid-route contingency during the shuttle if your group may need to shorten the day.",
      "permits": "No route-specific paddling permit is known. Use the named Iowa DNR / Webster County water-trail accesses, follow Iowa boating and PFD rules, and obey posted state-park, county, and city access rules.",
      "camping": "Dolliver Memorial State Park provides nearby corridor camping, but this selected route should be treated as a long day trip unless the group separately reserves and plans a state-park overnight.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at South River District Access and paddle the Webster County Des Moines River water-trail corridor toward Lehigh. Use the Fort Dodge gauge, leave daylight margin, and expect rocky riffles, boulders, wooded banks, and limited public exits.",
      "accessCaveats": [
        "Iowa DNR maps South River District Access, Dolliver State Park, and Lehigh in this water-trail corridor, but the saved endpoints are practical access-area anchors rather than ramp-survey coordinates.",
        "The official map uses river-mile access numbers; do not improvise private farm-bank exits just because the road is nearby.",
        "High water can affect access roads and campgrounds between Fort Dodge and Lehigh, so confirm ramp and road conditions before committing."
      ],
      "watchFor": [
        "Rocky riffles, glacial boulders, old bridge remains, and wood in current.",
        "Fast rises after storms, cold water in spring, muddy launches, and strainers on wooded bends.",
        "Long-day fatigue and limited legal bailout options if the group underestimates the 14- to 15-mile paddle."
      ]
    },
    "accessPoints": [
      {
        "id": "south-river-district-access",
        "name": "South River District Access",
        "latitude": 42.4892,
        "longitude": -94.1856,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default Fort Dodge put-in for the selected water-trail day; practical access-area coordinate."
      },
      {
        "id": "dolliver-state-park",
        "name": "Dolliver Memorial State Park river access",
        "latitude": 42.3887,
        "longitude": -94.0817,
        "mileFromStart": 15,
        "segmentKind": "creek",
        "note": "Iowa DNR map names Dolliver State Park in the access chain; use as a corridor campground or contingency only after confirming access."
      },
      {
        "id": "lehigh-des-moines-river-access",
        "name": "Lehigh Des Moines River access",
        "latitude": 42.3583,
        "longitude": -94.0525,
        "mileFromStart": 15,
        "segmentKind": "creek",
        "note": "Default downstream staging area for this Fort Dodge-to-Lehigh planning card; confirm exact ramp and parking on arrival."
      }
    ]
  },
  "iowa-river-marengo-amana": {
    "putIn": {
      "id": "marengo-gateway-big-bend-access",
      "name": "Marengo / Gateway Park Iowa River access corridor",
      "latitude": 41.813,
      "longitude": -92.065
    },
    "takeOut": {
      "id": "amana-iowa-river-access",
      "name": "Amana-area Iowa River access",
      "latitude": 41.7884,
      "longitude": -91.8798
    },
    "logistics": {
      "distanceLabel": "About 18 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr, longer with low water, headwind, or take-out scouting",
      "shuttle": "Stage the Amana-area take-out first, then drive back to the Marengo access corridor. Confirm the exact Amana landing and parking before launching because this is a long rural day with limited public exits.",
      "permits": "No route-specific paddling permit is known. Use public access points only, follow Iowa boating/PFD rules, and respect Amana, county, WMA, and private-bank postings.",
      "camping": "Treat this as a long day trip. No on-route public watercraft campsite was confirmed for the selected Marengo-to-Amana segment; do not camp on private banks or canal property.",
      "campingClassification": "none",
      "summary": "Launch from the Marengo Iowa River access corridor and take out in the Amana area for a long rural Iowa River day. The Marengo gauge is direct, but the route needs conservative take-out planning around private banks and Amana dam/canal context.",
      "accessCaveats": [
        "Gateway Park and Big Bend support public Iowa River access near Marengo, but flooding can affect roads and access quality.",
        "The Amana take-out is modeled as a named public-access corridor rather than a ramp-survey point; verify the landing before putting on.",
        "Older Iowa River guide material notes the Amana society dam and canal system downstream of Marengo. Do not extend casually into dam, diversion, or private canal infrastructure."
      ],
      "watchFor": [
        "Shallow bars and scraping when the Marengo gauge drops toward the 300 cfs floor.",
        "Pushy current, covered bars, floating debris, and fewer stops above the selected 5,000 cfs ceiling.",
        "Private banks, soft mud, sweepers, strainers, and the need to identify the Amana take-out early."
      ]
    },
    "accessPoints": [
      {
        "id": "marengo-gateway-big-bend-access",
        "name": "Marengo / Gateway Park Iowa River access corridor",
        "latitude": 41.813,
        "longitude": -92.065,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in corridor near the Marengo gauge; use the public river access that is open and practical on arrival."
      },
      {
        "id": "amana-iowa-river-access",
        "name": "Amana-area Iowa River access",
        "latitude": 41.7884,
        "longitude": -91.8798,
        "mileFromStart": 18,
        "segmentKind": "creek",
        "note": "Default take-out corridor; confirm exact legal landing before launching from Marengo."
      }
    ]
  },
  "cedar-river-brookwood-janesville": {
    "putIn": {
      "id": "brookwood-park-waverly",
      "name": "Brookwood Park non-motorized boat ramp",
      "latitude": 42.720963,
      "longitude": -92.464754
    },
    "takeOut": {
      "id": "janesville-city-park",
      "name": "Janesville City Park / Janesville access",
      "latitude": 42.64831667,
      "longitude": -92.4651861
    },
    "logistics": {
      "distanceLabel": "About 10.1 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr, longer in wind or low water",
      "shuttle": "Stage a vehicle at Janesville City Park or the signed Janesville access corridor, then drive back to Brookwood Park in Waverly. Verify local ramp and park status before launching.",
      "permits": "No route-specific paddling permit is known. Use public park accesses only, follow Iowa boating/PFD rules, and obey Waverly/Janesville park postings.",
      "camping": "Treat this as a day route. No on-route camping is assumed between Brookwood Park and Janesville City Park.",
      "campingClassification": "none",
      "summary": "Launch from Brookwood Park in Waverly and paddle the Cedar River downstream to Janesville. The Janesville gauge is direct for this reach, but same-day wood and bridge conditions still matter.",
      "accessCaveats": [
        "Brookwood Park is downstream of Waverly dam exposure; do not launch above the dam or paddle upstream toward dam hydraulics.",
        "The Janesville coordinate is anchored to the Janesville USGS / city-park access corridor because a surveyed ramp point was not published in the sources reviewed.",
        "Use only signed public accesses and respect private banks between towns."
      ],
      "watchFor": [
        "High or fast-rising water above the 3,000 cfs range top.",
        "Bridge current, sweepers, floating wood, shallow gravel at low water, and cold spring flows.",
        "Changing take-out conditions around Janesville after storms."
      ]
    },
    "accessPoints": [
      {
        "id": "brookwood-park-waverly",
        "name": "Brookwood Park non-motorized boat ramp",
        "latitude": 42.720963,
        "longitude": -92.464754,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default Waverly-area put-in; City of Waverly documents the park, parking, and non-motorized boat ramp."
      },
      {
        "id": "janesville-city-park",
        "name": "Janesville City Park / Janesville access",
        "latitude": 42.64831667,
        "longitude": -92.4651861,
        "mileFromStart": 10.1,
        "segmentKind": "creek",
        "note": "Default downstream take-out corridor; coordinate anchored to the Janesville gauge/city-park access area."
      }
    ]
  },
  "little-sioux-river-linn-grove-peterson": {
    "putIn": {
      "id": "linn-grove-dam-area",
      "name": "Linn Grove Dam Area below-dam launch",
      "latitude": 42.89630556,
      "longitude": -95.243
    },
    "takeOut": {
      "id": "riverside-little-sioux-access",
      "name": "Riverside Little Sioux Access",
      "latitude": 42.9205,
      "longitude": -95.343
    },
    "logistics": {
      "distanceLabel": "About 9 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr, longer in low water or headwind",
      "shuttle": "Stage a vehicle at Riverside Little Sioux Access on the west edge of Peterson, then return to Linn Grove. Launch only from a confirmed below-dam point at Linn Grove Dam Area.",
      "permits": "No route-specific paddling permit is known. Use public county accesses only, follow Iowa boating/PFD rules, and obey county park and camping rules.",
      "camping": "Endpoint camping is available at Linn Grove Dam Area according to Buena Vista County. Do not assume camping at Peterson unless separately reserved or posted.",
      "campingClassification": "endpoint_campground",
      "summary": "Paddle the Little Sioux River from Linn Grove to Peterson using the direct Linn Grove gauge. The route starts beside a documented low-head dam area, so below-dam launch discipline is mandatory.",
      "accessCaveats": [
        "The Linn Grove Dam Area includes a low-head dam. Never approach the dam from upstream and do not launch where current feeds toward the dam.",
        "The Peterson take-out coordinate is an address/park-area anchor for Riverside Little Sioux Access, not a surveyed ramp point.",
        "Respect private banks and use public access areas only."
      ],
      "watchFor": [
        "Low-head dam hydraulics at Linn Grove, especially during higher water.",
        "Fast rises after rain, floating wood, cutbank strainers, shallow riffles near the low end of the range, and cold spring water.",
        "Remote-feeling bends where road access and rescue options are limited."
      ]
    },
    "accessPoints": [
      {
        "id": "linn-grove-dam-area",
        "name": "Linn Grove Dam Area below-dam launch",
        "latitude": 42.89630556,
        "longitude": -95.243,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Put-in area anchored to the Linn Grove gauge and county park address; launch only below the low-head dam."
      },
      {
        "id": "riverside-little-sioux-access",
        "name": "Riverside Little Sioux Access",
        "latitude": 42.9205,
        "longitude": -95.343,
        "mileFromStart": 9,
        "segmentKind": "creek",
        "note": "Clay County documents canoe/kayak access and parking at Riverside Little Sioux Access near Peterson."
      }
    ]
  },
  "winnebago-river-fertile-mason-city": {
    "putIn": {
      "id": "william-rhodes-island-park",
      "name": "William Rhodes Island Park below-dam access",
      "latitude": 43.266,
      "longitude": -93.424
    },
    "takeOut": {
      "id": "mason-city-east-park",
      "name": "Mason City East Park / Winnebago River corridor",
      "latitude": 43.1546609,
      "longitude": -93.1832896
    },
    "logistics": {
      "distanceLabel": "About 15 mi by the mapped endpoint anchors; CanWePaddle lists the nominal town-to-town reach as 13 mi",
      "estimatedPaddleTime": "About 4.5 hr to 6 hr, longer with low water, wind, or wood",
      "shuttle": "Stage the Mason City vehicle first, then return to Fertile. Confirm the exact Mason City take-out and parking status before launching because this card uses a practical East Park corridor anchor.",
      "permits": "No route-specific paddling permit is known. Follow Iowa boating/PFD rules and use only public, signed access points.",
      "camping": "Treat this as a day route. No on-route camping is assumed between Fertile and Mason City.",
      "campingClassification": "none",
      "summary": "Paddle the Winnebago River from Fertile toward Mason City using the direct Mason City gauge. Dam proximity at Fertile and take-out verification at Mason City are the key planning controls.",
      "accessCaveats": [
        "William Rhodes Island Park is at the Fertile Dam. Launch only from a confirmed safe below-dam location and avoid dam hydraulics.",
        "Mason City endpoint access should be verified locally on the day of the trip; East Park is used as the practical endpoint anchor from available public mapping.",
        "Private banks, wood, and shallow riffles can limit emergency exits."
      ],
      "watchFor": [
        "Fast water or dam turbulence around Fertile after rain.",
        "Strainers, cutbanks, shallow gravel below the 100 cfs floor, and cold spring flows.",
        "Urban debris, bridges, and take-out uncertainty near Mason City."
      ]
    },
    "accessPoints": [
      {
        "id": "william-rhodes-island-park",
        "name": "William Rhodes Island Park below-dam access",
        "latitude": 43.266,
        "longitude": -93.424,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "City of Fertile documents William Rhodes Island Park along the Winnebago River at the Fertile Dam; use only safe below-dam access."
      },
      {
        "id": "mason-city-east-park",
        "name": "Mason City East Park / Winnebago River corridor",
        "latitude": 43.1546609,
        "longitude": -93.1832896,
        "mileFromStart": 13,
        "segmentKind": "creek",
        "note": "Practical Mason City endpoint anchor; verify exact public landing and access status before launching."
      }
    ]
  },
  "cedar-river-chain-lakes-ellis-harbor": {
    "putIn": {
      "id": "chain-lakes-boat-landing",
      "name": "Chain Lakes / Palo boat landing",
      "latitude": 42.074,
      "longitude": -91.803
    },
    "takeOut": {
      "id": "ellis-harbor-boat-launch",
      "name": "Ellis Harbor public boat launch",
      "latitude": 41.9944,
      "longitude": -91.7086
    },
    "logistics": {
      "distanceLabel": "About 14 mi",
      "estimatedPaddleTime": "About 4.5 hr to 6.5 hr, longer with wind, high water, or motorboat traffic",
      "shuttle": "Stage Ellis Harbor first, then drive back to Chain Lakes / Palo. Check Cedar Rapids ramp status before launching because city boat ramps can close during high water.",
      "permits": "No route-specific paddling permit is known. Use public ramps only, follow Iowa boating/PFD rules, and obey Linn County and Cedar Rapids park, harbor, and high-water closure postings.",
      "camping": "Treat this as a day route. No on-route campsite is assumed between Chain Lakes and Ellis Harbor, and the Cedar Rapids finish is a public ramp/harbor rather than an overnight stop.",
      "campingClassification": "none",
      "summary": "Launch from the Chain Lakes / Palo access corridor and take out at Ellis Harbor for a lower Cedar River run into Cedar Rapids. Use the Cedar Rapids gauge and keep the finish disciplined before the downstream urban dam corridor.",
      "accessCaveats": [
        "Chain Lakes Natural Area and the Chain Lakes Bridge corridor support the Palo-area public boat-landing context, but same-day water depth near Chain Lakes can vary.",
        "Ellis Harbor is a City of Cedar Rapids public boat launch with restrooms, but closures can occur during high-water events.",
        "This route intentionally ends at Ellis Harbor. Do not continue toward downtown dams or flood-control work without a separate local plan."
      ],
      "watchFor": [
        "High water above the selected 8,000 cfs ceiling, which CanWePaddle flags as high-caution for this reach.",
        "Motorboat wakes, wind on broad bends, bridge current, floating wood, and fewer safe stops at high water.",
        "Urban ramp closures, debris after storms, and the need to make the Ellis Harbor take-out cleanly."
      ]
    },
    "accessPoints": [
      {
        "id": "chain-lakes-boat-landing",
        "name": "Chain Lakes / Palo boat landing",
        "latitude": 42.074,
        "longitude": -91.803,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in near Palo; practical access-area coordinate for the Chain Lakes boat-landing corridor."
      },
      {
        "id": "ellis-harbor-boat-launch",
        "name": "Ellis Harbor public boat launch",
        "latitude": 41.9944,
        "longitude": -91.7086,
        "mileFromStart": 14,
        "segmentKind": "creek",
        "note": "Default Cedar Rapids take-out; City of Cedar Rapids documents a public boat launch and restrooms at Ellis Harbor."
      }
    ]
  },
  "middle-raccoon-river-lenon-mill-p28": {
    "putIn": {
      "id": "lenon-mill-park-access",
      "name": "Lenon Mill Park Access",
      "latitude": 41.6867975,
      "longitude": -94.3692621
    },
    "takeOut": {
      "id": "p28-access",
      "name": "P-28 Access",
      "latitude": 41.6675,
      "longitude": -94.3569
    },
    "logistics": {
      "distanceLabel": "About 2.1 mi",
      "estimatedPaddleTime": "About 45 min to 1.5 hr, longer if low-water riffles require walking",
      "shuttle": "Stage the take-out at P-28 Access, then launch from Lenon Mill Park below the dam in Panora. Check the Panora gauge and walk the P-28 take-out before launching.",
      "permits": "No route-specific paddling permit is known. Follow Guthrie County park rules, Iowa boating/PFD requirements, and non-meandered-stream private-property limits.",
      "camping": "Lenon Mill Park has primitive and RV camping, restrooms, water, and picnic facilities at the put-in. Do not assume camping is legal on private banks between Lenon and P-28.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch below Lenon Mill Dam and take out at P-28 for the short first Middle Raccoon Route A split. The distance is beginner-sized, but riffles, sweepers, a below-dam start, and today-low water require a cautious moving-water plan.",
      "accessCaveats": [
        "Use the Lenon Mill public access below the dam only; do not launch above the dam or linger in dam-influenced current.",
        "P-28 is a named public access in the DNR/Guthrie County access chain. Confirm the ramp, eddy, and parking before leaving the shuttle vehicle.",
        "The Panora gauge is direct and just upstream, but it cannot show fresh wood, boulder exposure, or bank access condition at P-28."
      ],
      "watchFor": [
        "Low water below 400 cfs, when riffles become scrape-prone and may require walking.",
        "Sweepers, boulders, sandstone blocks, bridge current, and rock wing dams below P-28 if continuing downstream.",
        "Private banks and cold-water exposure outside warm summer conditions."
      ]
    },
    "accessPoints": [
      {
        "id": "lenon-mill-park-access",
        "name": "Lenon Mill Park Access",
        "latitude": 41.6867975,
        "longitude": -94.3692621,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in below Lenon Mill Dam; endpoint campground support is at the park."
      },
      {
        "id": "p28-access",
        "name": "P-28 Access",
        "latitude": 41.6675,
        "longitude": -94.3569,
        "mileFromStart": 2.1,
        "segmentKind": "creek",
        "note": "Default take-out and second official Route A access downstream of Lenon Mill."
      }
    ]
  },
  "middle-raccoon-river-p28-cowles": {
    "putIn": {
      "id": "p28-access",
      "name": "P-28 Access",
      "latitude": 41.6675,
      "longitude": -94.3569
    },
    "takeOut": {
      "id": "cowles-river-access",
      "name": "Cowles River Access",
      "latitude": 41.6196,
      "longitude": -94.2869
    },
    "logistics": {
      "distanceLabel": "About 6.6 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low water or wood scouting",
      "shuttle": "Stage Cowles River Access first, then drive back to P-28. Treat the 248th Street / Middle Raccoon River Access as an intermediate public access only after confirming it from land.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Iowa boating/PFD requirements, and respect private banks outside marked public areas.",
      "camping": "No on-route camping is assumed between P-28 and Cowles. Lenon Mill upstream has campground support if used as a nearby basecamp, but this route itself is a day trip.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at P-28 and take out at Cowles for a compact protected Middle Raccoon day through riffles, boulders, sandstone bluffs, public-land bends, and the 248th Street access corridor.",
      "accessCaveats": [
        "P-28 and Cowles are named public ramps in the DNR/Guthrie County access chain, but the middle 248th Street access should be verified before being counted on as a bailout.",
        "The selected P-28 and Cowles coordinates come from paddling/boat-ramp indexes matched against DNR/Guthrie County access names; use posted signs and ramps on arrival.",
        "At low flow, the route may be slower and shallower than the mileage suggests. At high/rising flow, riffle sweepers and bridge debris become more consequential."
      ],
      "watchFor": [
        "Tree sweepers in riffles, constructed rock wing dams below P-28, and boulders or sandstone blocks in the channel.",
        "Sharp bends with wood, exposed riffles below the 400 cfs floor, and cold-water exposure in shoulder seasons.",
        "Private-bank limits; stop only at public accesses or where clearly legal."
      ]
    },
    "accessPoints": [
      {
        "id": "p28-access",
        "name": "P-28 Access",
        "latitude": 41.6675,
        "longitude": -94.3569,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in and second official Route A access downstream of Lenon Mill."
      },
      {
        "id": "middle-raccoon-river-access-248th",
        "name": "Middle Raccoon River Access / 248th Trail",
        "latitude": 41.641,
        "longitude": -94.321,
        "mileFromStart": 3.2,
        "segmentKind": "creek",
        "note": "Intermediate DNR/Guthrie County access; coordinates are a practical corridor anchor and should be verified from land before relying on it."
      },
      {
        "id": "cowles-river-access",
        "name": "Cowles River Access",
        "latitude": 41.6196,
        "longitude": -94.2869,
        "mileFromStart": 6.6,
        "segmentKind": "creek",
        "note": "Default take-out at the fourth official Route A access."
      }
    ]
  },
  "middle-raccoon-river-cowles-redfield-dam": {
    "putIn": {
      "id": "cowles-river-access",
      "name": "Cowles River Access",
      "latitude": 41.6196,
      "longitude": -94.2869
    },
    "takeOut": {
      "id": "redfield-dam-upper-access",
      "name": "Redfield Dam Upper Access",
      "latitude": 41.5904,
      "longitude": -94.2034
    },
    "logistics": {
      "distanceLabel": "About 7.8 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with low water, wood, or take-out scouting",
      "shuttle": "Stage the Redfield Dam Upper Access take-out first and confirm the above-dam landing before driving back to Cowles. This is a mandatory stop before the low-head dam.",
      "permits": "No route-specific paddling permit is known. Follow county/DNR access rules, Iowa boating/PFD requirements, and posted Redfield Dam access instructions.",
      "camping": "Treat this as a day trip. No legal on-route camping was verified between Cowles and Redfield Dam, and private banks should not be used for overnight stops.",
      "campingClassification": "none",
      "summary": "Launch at Cowles and take out at Redfield Dam Upper Access for the lower protected Middle Raccoon section. The finish must be treated as an above-dam take-out, not an optional waypoint.",
      "accessCaveats": [
        "Identify the Redfield Dam Upper Access from land before launching. Missing the take-out creates low-head-dam exposure.",
        "Cowles, Shearer, and Redfield Dam Upper Access are DNR-named public ramps, but same-day mud, high water, or debris can affect ramp usability.",
        "The Panora gauge is upstream of this split. It is the best direct same-river gauge, but it should be paired with local checks for wood and dam-area conditions."
      ],
      "watchFor": [
        "The Redfield low-head dam at the finish corridor; take out above it and do not paddle into the dam zone.",
        "Numerous rock riffles, sweepers, sharp-bend logs, and places where trees may partially block the river.",
        "Low-water dragging below 400 cfs, high/rising-water wood exposure, rural rescue spacing, and private-bank limits."
      ]
    },
    "accessPoints": [
      {
        "id": "cowles-river-access",
        "name": "Cowles River Access",
        "latitude": 41.6196,
        "longitude": -94.2869,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the fourth official Route A access."
      },
      {
        "id": "shearer-access",
        "name": "Shearer Access",
        "latitude": 41.602,
        "longitude": -94.245,
        "mileFromStart": 4.3,
        "segmentKind": "creek",
        "note": "DNR-named intermediate cement-ramp access; coordinates are a practical corridor anchor and should be verified from land."
      },
      {
        "id": "redfield-dam-upper-access",
        "name": "Redfield Dam Upper Access",
        "latitude": 41.5904,
        "longitude": -94.2034,
        "mileFromStart": 7.8,
        "segmentKind": "creek",
        "note": "Mandatory take-out above Redfield Dam; confirm the landing before launching from Cowles."
      }
    ]
  },
  "des-moines-river-lehigh-deception-hollow": {
    "putIn": {
      "id": "lehigh-access",
      "name": "Lehigh Access",
      "latitude": 42.3605,
      "longitude": -94.0478
    },
    "takeOut": {
      "id": "deception-hollow-access",
      "name": "Deception Hollow carry-down access",
      "latitude": 42.3273,
      "longitude": -94.0206
    },
    "logistics": {
      "distanceLabel": "About 3 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low water or scouting",
      "shuttle": "Stage the take-out at Deception Hollow, then launch from Lehigh Access. Both are mapped water-trail accesses, but verify the signed carry-downs and parking before unloading.",
      "permits": "No route-specific paddling permit is known. Use public access points, follow Iowa boating/PFD rules, and obey posted Webster County or Iowa DNR restrictions.",
      "camping": "Treat this short split as a day route. Dolliver State Park campground is nearby in the same corridor, and Iowa DNR notes beach-camping context on the meandered Webster County river, but this route does not assume an overnight stop.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Lehigh and paddle the short intermediate water-trail split to Deception Hollow. The route is useful as a low-commitment downstream continuation below the existing Fort Dodge-to-Lehigh card, with the Stratford gauge used as the downstream corridor check.",
      "accessCaveats": [
        "Lehigh and Deception Hollow are practical access anchors from Iowa DNR / Webster County water-trail mapping; confirm the exact signed landing from land.",
        "The Stratford gauge is downstream of this short reach. It is same-river and current, but it cannot replace a visual check for local wood, bank condition, or launch depth.",
        "Do not continue into the long Deception-to-Skillet reach unless the group has planned that separate 15.5-mile day."
      ],
      "watchFor": [
        "Boulders, old bridge debris, woody strainers, and riffles that scrape at lower flows.",
        "Fast current, covered beaches, floating debris, and harder exits during high or rising water.",
        "Private uplands above legal river beaches and limited public exits between named accesses."
      ]
    },
    "accessPoints": [
      {
        "id": "lehigh-access",
        "name": "Lehigh Access",
        "latitude": 42.3605,
        "longitude": -94.0478,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; shown as Lehigh Access on the Webster County Des Moines River water-trail map."
      },
      {
        "id": "deception-hollow-access",
        "name": "Deception Hollow carry-down access",
        "latitude": 42.3273,
        "longitude": -94.0206,
        "mileFromStart": 3,
        "segmentKind": "creek",
        "note": "Default take-out; DNR names the downstream reach from here and access-directory context resolves the Deception Hollow coordinates."
      }
    ]
  },
  "des-moines-river-deception-hollow-skillet": {
    "putIn": {
      "id": "deception-hollow-access",
      "name": "Deception Hollow carry-down access",
      "latitude": 42.3273,
      "longitude": -94.0206
    },
    "takeOut": {
      "id": "skillet-creek-access",
      "name": "Skillet Creek Access",
      "latitude": 42.2523,
      "longitude": -93.9975
    },
    "logistics": {
      "distanceLabel": "About 15.5 mi",
      "estimatedPaddleTime": "Long day; plan 5 hr to 8 hr depending on wind, level, and stops",
      "shuttle": "Stage Skillet Creek Access first, then drive back to Deception Hollow. This is a long rural day, so confirm take-out visibility, weather, and the Stratford gauge trend before committing.",
      "permits": "No route-specific paddling permit is known. Follow Iowa boating/PFD rules, use mapped public accesses, and keep stops legal on the meandered river without trespassing on adjacent private land.",
      "camping": "Iowa DNR says the meandered Webster County Des Moines River has abundant beaches suitable for en-route beach camping, but private uplands remain off limits. Use only legal beaches, avoid high water, pack out all trash, and do not assume developed facilities between Deception Hollow and Skillet.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at Deception Hollow for the long downstream Webster County water-trail reach to Skillet Creek Access. This is an advanced-by-length flatwater day with beaches, wooded bends, limited exits, and same-day access checks.",
      "accessCaveats": [
        "Deception Hollow and Skillet Creek are mapped carry-down accesses, not full-service ramps. Walk both before launch.",
        "The Stratford gauge is direct for the lower corridor but does not show sandbar availability, wood, or bank steepness.",
        "Because this reach is long, a late start, headwind, rising water, or missed take-out can materially increase exposure."
      ],
      "watchFor": [
        "Long bends with wind exposure, woody debris, bridge current, and private banks.",
        "Beaches that may be usable at moderate levels but disappear or become unsafe at higher water.",
        "Fast rises after rain, cold-water swims in shoulder season, and limited rescue access."
      ]
    },
    "accessPoints": [
      {
        "id": "deception-hollow-access",
        "name": "Deception Hollow carry-down access",
        "latitude": 42.3273,
        "longitude": -94.0206,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the DNR-named Deception Hollow-to-Skillet Creek reach."
      },
      {
        "id": "skillet-creek-access",
        "name": "Skillet Creek Access",
        "latitude": 42.2523,
        "longitude": -93.9975,
        "mileFromStart": 15.5,
        "segmentKind": "creek",
        "note": "Default take-out; shown on the Webster County Des Moines River water-trail map near the Stratford gauge corridor."
      }
    ]
  },
  "des-moines-river-skillet-north-fraser": {
    "putIn": {
      "id": "skillet-creek-access",
      "name": "Skillet Creek Access",
      "latitude": 42.2523,
      "longitude": -93.9975
    },
    "takeOut": {
      "id": "north-fraser-ramp",
      "name": "North Fraser Ramp",
      "latitude": 42.161,
      "longitude": -93.968
    },
    "logistics": {
      "distanceLabel": "About 11.4 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with headwind, low water, or fishing stops",
      "shuttle": "Stage North Fraser Ramp first, then drive back to Skillet Creek Access. Confirm both landings and do not continue downstream toward the Boone dam sequence unless that separate route is planned.",
      "permits": "No route-specific paddling permit is known. Use the signed public accesses, follow Iowa boating/PFD rules, and obey Boone County, Webster County, or Corps access postings.",
      "camping": "Treat this as a day route. Boone County and Webster County mapping support public access but no on-route campsite was verified for this exact Skillet-to-North-Fraser split.",
      "campingClassification": "none",
      "summary": "Launch at Skillet Creek Access and paddle into the Boone County Des Moines River water-trail chain to North Fraser Ramp. Terrain360 documents the route and ties it to the direct Stratford gauge, while official maps support both endpoint names.",
      "accessCaveats": [
        "Skillet Creek Access is a Webster County mapped carry-down; North Fraser is a Boone County mapped ramp. Confirm current road, parking, and bank conditions at both.",
        "The saved North Fraser coordinate is a practical ramp-area anchor from official map context; use local signage and current maps for the exact landing.",
        "Downstream Boone Waterworks and Fort Dodge Hydro dam/portage context belongs to other Boone County segments. Do not drift past the intended take-out without a plan."
      ],
      "watchFor": [
        "Rural strainers, floating logs, private banks, and stronger current during rises.",
        "Longer open bends where wind can slow canoes and loaded kayaks.",
        "Access-road mud or flood impacts after rain, especially at less-developed landings."
      ]
    },
    "accessPoints": [
      {
        "id": "skillet-creek-access",
        "name": "Skillet Creek Access",
        "latitude": 42.2523,
        "longitude": -93.9975,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; mapped by Webster County and used by the Terrain360 Skillet-to-North-Fraser route."
      },
      {
        "id": "north-fraser-ramp",
        "name": "North Fraser Ramp",
        "latitude": 42.161,
        "longitude": -93.968,
        "mileFromStart": 11.4,
        "segmentKind": "creek",
        "note": "Default take-out; shown on the Boone County Des Moines River Water Trail map."
      }
    ]
  },
  "turkey-river-clermont-gilbertson": {
    "putIn": {
      "id": "clermont-canoe-access",
      "name": "Clermont Canoe Access #64B",
      "latitude": 42.9969,
      "longitude": -91.6487
    },
    "takeOut": {
      "id": "gilbertson-park-elgin",
      "name": "Gilbertson Park / Elgin access corridor",
      "latitude": 42.95812,
      "longitude": -91.62421
    },
    "logistics": {
      "distanceLabel": "About 8 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with low water, scouting, or stops at Valley Access",
      "shuttle": "Stage the downstream vehicle at Gilbertson Park / Elgin before returning to Clermont Canoe Access. Confirm that you are launching below the Clermont dam and not from the upstream river-park take-out.",
      "permits": "No route-specific paddling permit is known. Use the signed Turkey River Water Trail accesses, follow Iowa boating and PFD rules, and respect posted city, county, and campground rules.",
      "camping": "Gilbertson Park has campground facilities at the take-out corridor, making this an endpoint-campground day route. Do not assume private-bank camping between Clermont and Elgin.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch below the Clermont dam and take out at Gilbertson Park / Elgin for the upstream Turkey River Water Trail connector. The direct Eldorado gauge controls the score, while the official guide supplies the access and dam context.",
      "accessCaveats": [
        "Clermont has separate upstream dam take-out and downstream canoe-access context. Use Access #64B below the dam for this route.",
        "The water-trail guide places Valley Access between Clermont and Elgin; use it only when signs and parking are clear on the day of the trip.",
        "Gilbertson has more than one access-bank option in the guide. Pick the signed landing that matches current local use and water level."
      ],
      "watchFor": [
        "The Clermont dam and portage boundary upstream of the put-in.",
        "Swift Class I riffles, fresh wood, bridge current, and fast rain-driven rises.",
        "Private banks outside signed public accesses and campground areas."
      ]
    },
    "accessPoints": [
      {
        "id": "clermont-canoe-access",
        "name": "Clermont Canoe Access #64B",
        "latitude": 42.9969,
        "longitude": -91.6487,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in below the Clermont dam; do not launch upstream of the dam for this card."
      },
      {
        "id": "valley-access",
        "name": "Valley Access",
        "latitude": 42.9866,
        "longitude": -91.6368,
        "mileFromStart": 2.5,
        "segmentKind": "creek",
        "note": "Official intermediate water-trail access between Clermont and Elgin; verify signs and parking before relying on it."
      },
      {
        "id": "gilbertson-park-elgin",
        "name": "Gilbertson Park / Elgin access corridor",
        "latitude": 42.95812,
        "longitude": -91.62421,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Default take-out and endpoint campground corridor near Elgin."
      }
    ]
  },
  "maquoketa-river-monmouth-maquoketa": {
    "putIn": {
      "id": "millertown-bridge-access",
      "name": "Millertown Bridge Access / Monmouth corridor",
      "latitude": 42.084,
      "longitude": -90.762
    },
    "takeOut": {
      "id": "bridgeport-access",
      "name": "Bridgeport Access",
      "latitude": 42.0834,
      "longitude": -90.6329
    },
    "logistics": {
      "distanceLabel": "About 12 mi",
      "estimatedPaddleTime": "About 4.5 hr to 6 hr, longer with low water, wind, or wood scouting",
      "shuttle": "Stage Bridgeport first, then drive back to the Millertown / Monmouth access corridor. Check Jackson County access signs before unloading because this lower chain has multiple named bridge and park accesses.",
      "permits": "No route-specific paddling permit is known. Use Jackson County water-trail accesses, follow Iowa boating and PFD rules, and respect posted park hours and parking limits.",
      "camping": "Treat this as a day trip. Jackson County lists many lower-river accesses, but no on-route public camping plan was verified for this specific Monmouth-to-Maquoketa card.",
      "campingClassification": "none",
      "summary": "Launch from the Monmouth-area Millertown access chain and take out at Bridgeport near Maquoketa for a lower Maquoketa flatwater day. The direct Maquoketa gauge is fresh and route-specific enough for scoring.",
      "accessCaveats": [
        "Endpoint coordinates are practical access-corridor anchors from the named Jackson County access chain, not surveyed ramp points.",
        "Bridgeport is the intended take-out for this card. Do not drift downstream into Maquoketa town or flood-control structures without a separate route plan.",
        "Use only named public accesses such as Millertown, Joinerville, or Bridgeport; the lower river is bordered by private land in places."
      ],
      "watchFor": [
        "Wood and strainers on outside bends, bridge current, muddy banks, and fast rises after upstream rain.",
        "Low water below about 200 cfs at Maquoketa, when shallow gravel and slow water become likely.",
        "High water above about 2,500 cfs at Maquoketa, when the lower river becomes pushy for casual groups."
      ]
    },
    "accessPoints": [
      {
        "id": "millertown-bridge-access",
        "name": "Millertown Bridge Access / Monmouth corridor",
        "latitude": 42.084,
        "longitude": -90.762,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access anchor; confirm the signed bridge access before launching."
      },
      {
        "id": "joinerville-park",
        "name": "Joinerville Park",
        "latitude": 42.078,
        "longitude": -90.69,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "Named Jackson County access and practical bailout in the lower Maquoketa access chain."
      },
      {
        "id": "bridgeport-access",
        "name": "Bridgeport Access",
        "latitude": 42.0834,
        "longitude": -90.6329,
        "mileFromStart": 12,
        "segmentKind": "creek",
        "note": "Default take-out near the Maquoketa gauge corridor."
      }
    ]
  },
  "west-nishnabotna-river-oakland-macedonia": {
    "putIn": {
      "id": "chautauqua-park-oakland",
      "name": "Chautauqua Park / Oakland Water Trail Access",
      "latitude": 41.30695,
      "longitude": -95.40363
    },
    "takeOut": {
      "id": "olde-town-park-macedonia",
      "name": "Olde Town Park / Macedonia Water Trail Access",
      "latitude": 41.19627,
      "longitude": -95.44651
    },
    "logistics": {
      "distanceLabel": "About 14 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with low water, wind, or sandbar stops",
      "shuttle": "Stage Olde Town Park first, then return to Chautauqua Park in Oakland. Carson / Millstone City Park is the main intermediate town access if the day needs to be shortened.",
      "permits": "No route-specific paddling permit is known. Use the signed West Nishnabotna River Water Trail accesses, follow Iowa boating and PFD rules, and obey county park hours.",
      "camping": "Treat this as a day trip. The water trail has sandbars for picnic stops, but no verified legal on-route overnight camping was selected for this route.",
      "campingClassification": "none",
      "summary": "Launch at Oakland and take out at Olde Town Park near Macedonia for a southwest-Iowa water-trail day on the West Nishnabotna. The Randolph gauge is downstream on the same river and gives the live scoring feed.",
      "accessCaveats": [
        "This route intentionally stops at Olde Town Park, the documented public water-trail access, rather than using the unverified Randolph take-out named by the broader gauge page.",
        "Olde Town Park can be easy to miss from rural roads; identify the park and landing before leaving the shuttle car.",
        "Most banks between signed accesses are private or muddy. Use Chautauqua, Carson/Millstone, and Olde Town access areas for planned stops."
      ],
      "watchFor": [
        "Rapid rises after heavy rain or snowmelt; official brochure guidance says not to canoe when the river is quickly rising or near flood stage.",
        "Mud, sandbars, sweepers, log piles, agricultural runoff, and poor visibility in brown water.",
        "Long rural spacing between developed exits and possible cell-service gaps."
      ]
    },
    "accessPoints": [
      {
        "id": "chautauqua-park-oakland",
        "name": "Chautauqua Park / Oakland Water Trail Access",
        "latitude": 41.30695,
        "longitude": -95.40363,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; local tourism sources identify Chautauqua Park as West Nishnabotna Water Trail access."
      },
      {
        "id": "millstone-city-park-carson",
        "name": "Millstone City Park / Carson access",
        "latitude": 41.2379,
        "longitude": -95.4219,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Intermediate water-trail town access; verify current signs and landing conditions before relying on it."
      },
      {
        "id": "olde-town-park-macedonia",
        "name": "Olde Town Park / Macedonia Water Trail Access",
        "latitude": 41.19627,
        "longitude": -95.44651,
        "mileFromStart": 14,
        "segmentKind": "creek",
        "note": "Default take-out; county and tourism sources document West Nishnabotna river access and canoe/tube launching here."
      }
    ]
  },
  "east-nishnabotna-river-red-oak-essex": {
    "putIn": {
      "id": "coolbaugh-street-red-oak",
      "name": "Coolbaugh Street / Red Oak access corridor",
      "latitude": 41.0082,
      "longitude": -95.2418
    },
    "takeOut": {
      "id": "essex-bridge-access",
      "name": "Essex Bridge Access",
      "latitude": 40.8288,
      "longitude": -95.3047
    },
    "logistics": {
      "distanceLabel": "About 12 mi",
      "estimatedPaddleTime": "About 4.5 hr to 6 hr, longer with low water, wind, wood, or muddy landings",
      "shuttle": "Stage the Essex Bridge take-out first, then return to the Red Oak / Coolbaugh Street access corridor. Inspect both banks before committing because this is a muddy rural river with limited developed exits.",
      "permits": "No route-specific paddling permit is known. Use public access corridors, follow Iowa boating/PFD rules, and obey posted city, county, and bridge-access parking limits.",
      "camping": "No on-route public campsite is documented for this Red Oak-to-Essex section. Montgomery County notes camping is not permitted at river access points such as Bonds Landing, so treat this as a day trip.",
      "campingClassification": "none",
      "summary": "Launch from the Red Oak / Coolbaugh Street corridor and take out at Essex Bridge for a 12-mile East Nishnabotna day. Use the direct Red Oak gauge and stand down quickly when the river is rising or muddy banks look unsafe.",
      "accessCaveats": [
        "The put-in coordinate is a practical Red Oak / Coolbaugh Street access anchor near the USGS gauge. Confirm the legal launch and parking area on arrival.",
        "The Essex Bridge coordinate is an access-corridor anchor from paddling/access directories and DNR map context. Verify signs, bank slope, and parking before leaving the shuttle vehicle.",
        "The East Nishnabotna has few clean public exits on this reach. Do not treat bridge rights-of-way, farm fields, or muddy private banks as routine bailout points."
      ],
      "watchFor": [
        "Low water below about 100 cfs at Red Oak, when shallow bars and dragging become likely.",
        "High or fast-rising water above about 1,500 cfs at Red Oak, especially after thunderstorms or snowmelt.",
        "Muddy banks, sweepers, logjams, floating debris, agricultural runoff, bridge current, and poor water clarity."
      ]
    },
    "accessPoints": [
      {
        "id": "coolbaugh-street-red-oak",
        "name": "Coolbaugh Street / Red Oak access corridor",
        "latitude": 41.0082,
        "longitude": -95.2418,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in near the direct Red Oak USGS gauge; verify current public launch signs and parking."
      },
      {
        "id": "essex-bridge-access",
        "name": "Essex Bridge Access",
        "latitude": 40.8288,
        "longitude": -95.3047,
        "mileFromStart": 12,
        "segmentKind": "creek",
        "note": "Default take-out corridor; confirm bank condition and legal parking before launching upstream."
      }
    ]
  },
  "maquoketa-river-pictured-rocks-ebys-mill": {
    "putIn": {
      "id": "pictured-rocks-access",
      "name": "Pictured Rocks Park Access",
      "latitude": 42.17256,
      "longitude": -91.10471
    },
    "takeOut": {
      "id": "ebys-mill-access",
      "name": "Eby's Mill Access",
      "latitude": 42.19804,
      "longitude": -91.05659
    },
    "logistics": {
      "distanceLabel": "About 6 to 6.5 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low water, wind, or bluff stops",
      "shuttle": "Stage Eby's Mill first, then drive back to Pictured Rocks Park. This shortens the official Pictured-Rocks-to-Highway-136 section to the strongest public take-out and avoids relying on Supples Bridge.",
      "permits": "No route-specific paddling permit is known. Use Jones County public accesses, follow Iowa boating/PFD rules, and obey Pictured Rocks and Eby’s Mill posted rules.",
      "camping": "Treat this as a day trip. Pictured Rocks and nearby Jones County facilities can support separate base-camp planning, but no on-route overnight site is selected for this short section.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch from Pictured Rocks and take out at the rebuilt Eby's Mill ramp for a compact scenic Maquoketa day through the public-land bluff corridor. The Manchester gauge supports a low-water floor but not a high-water ceiling.",
      "accessCaveats": [
        "This card starts below the Mon-Maq/Monticello dam corridor. Do not include any upstream dam approach as part of the route.",
        "Eby's Mill is the planned take-out. The downstream Supples Bridge access is explicitly weaker in the Iowa DNR/Jones County guide and is not used as the default finish.",
        "Use public park and access lands only. Pictured Rocks has public land along the river, but adjacent downstream banks can still be private."
      ],
      "watchFor": [
        "Scraping below the Manchester-gauge floor, wind across broad sandy reaches, and shallow gravel bars.",
        "Overhanging trees, logjams, bridge abutments, big rocks, and strainers called out in the Iowa DNR/Jones County guide.",
        "Cold water, fishing pressure, and faster current after upstream rain."
      ]
    },
    "accessPoints": [
      {
        "id": "pictured-rocks-access",
        "name": "Pictured Rocks Park Access",
        "latitude": 42.17256,
        "longitude": -91.10471,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the county park ramp in the scenic public-land corridor."
      },
      {
        "id": "ebys-mill-access",
        "name": "Eby's Mill Access",
        "latitude": 42.19804,
        "longitude": -91.05659,
        "mileFromStart": 6.3,
        "segmentKind": "creek",
        "note": "Default take-out at the rebuilt Jones County hard-surface ramp."
      }
    ]
  },
  "upper-iowa-river-lower-dam-iverson-bridge": {
    "putIn": {
      "id": "lower-dam-access",
      "name": "Lower Dam Access",
      "latitude": 43.33998,
      "longitude": -91.64203
    },
    "takeOut": {
      "id": "iverson-bridge-access",
      "name": "Iverson Bridge Access",
      "latitude": 43.41256,
      "longitude": -91.5769
    },
    "logistics": {
      "distanceLabel": "15.75 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr, longer with low water, wind, or access stops",
      "shuttle": "Stage Iverson Bridge first, then drive back to Lower Dam Access. Decide before launch whether Canoe Creek or Iverson Bottoms are acceptable bailout points for the group.",
      "permits": "No route-specific paddling permit is known. Use the Upper Iowa River guide accesses, follow Iowa boating/PFD rules, and respect posted county, city, and private-property boundaries.",
      "camping": "Treat this as a long day trip with nearby private campground or livery base-camp options. No public on-route campsite is selected for Lower Dam to Iverson Bridge.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch below Lower Dam and take out at Iverson Bridge for the downstream Upper Iowa continuation east of Decorah. Use the direct Decorah gauge as a low-water check and avoid rising-water wood exposure.",
      "accessCaveats": [
        "Use the Lower Dam Access below the dam. Do not launch upstream or include the dam portage in this route.",
        "Canoe Creek and Iverson Bottoms are mapped intermediate accesses, but verify current road, parking, and bank condition before relying on either as a bailout.",
        "The route is long enough that wind, low-water scraping, and daylight can matter more than the Class I rating suggests."
      ],
      "watchFor": [
        "Scraping around 245 cfs and below on the Decorah gauge; 300 to 400 cfs was the published smoother target, not a high-water ceiling.",
        "Fresh wood, strainers, bridge current, private banks, cold spring-fed water, and fast rises after rain.",
        "Dam-adjacent hazards at the start if the group launches in the wrong place or paddles upstream toward Lower Dam."
      ]
    },
    "accessPoints": [
      {
        "id": "lower-dam-access",
        "name": "Lower Dam Access",
        "latitude": 43.33998,
        "longitude": -91.64203,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in below the Lower Dam hazard; verify signed access and launch below the structure."
      },
      {
        "id": "canoe-creek-access",
        "name": "Canoe Creek Access",
        "latitude": 43.3673,
        "longitude": -91.6189,
        "mileFromStart": 4.5,
        "segmentKind": "creek",
        "note": "Mapped intermediate access in the Upper Iowa guide; verify current landing conditions before relying on it."
      },
      {
        "id": "iverson-bottoms-access",
        "name": "Iverson Bottoms Access",
        "latitude": 43.4038,
        "longitude": -91.5884,
        "mileFromStart": 14.2,
        "segmentKind": "creek",
        "note": "Mapped late-route access/bailout before the Iverson Bridge finish."
      },
      {
        "id": "iverson-bridge-access",
        "name": "Iverson Bridge Access",
        "latitude": 43.41256,
        "longitude": -91.5769,
        "mileFromStart": 15.75,
        "segmentKind": "creek",
        "note": "Default take-out documented by Miles Paddled and the Upper Iowa guide."
      }
    ]
  },
  "upper-iowa-river-iverson-bridge-kumpf": {
    "putIn": {
      "id": "iverson-bridge-access",
      "name": "Iverson Bridge Access",
      "latitude": 43.41256,
      "longitude": -91.5769
    },
    "takeOut": {
      "id": "kumpf-access",
      "name": "Kumpf Access",
      "latitude": 43.41165,
      "longitude": -91.45962
    },
    "logistics": {
      "distanceLabel": "About 8.5 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with low-water scraping or stops",
      "shuttle": "Stage Kumpf Access first, then launch from Iverson Bridge. Confirm the Kumpf take-out from land because lower-river access points can be easy to miss from the water.",
      "permits": "No route-specific paddling permit is known. Follow Iowa boating/PFD rules, Upper Iowa access postings, and private-property boundaries.",
      "camping": "Treat this as a day route with nearby private campground or livery base-camp options. No public on-route campsite was selected for the Iverson-to-Kumpf split.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Iverson Bridge and paddle the lower Upper Iowa toward Kumpf Access. This is the downstream continuation from the existing Lower-Dam-to-Iverson card and uses the direct Dorchester gauge.",
      "accessCaveats": [
        "Iverson Bridge is the start of this card and the take-out for the upstream existing route; avoid leaving vehicles where they block bridge or access traffic.",
        "Kumpf Access is the planned take-out. Do not continue into the final lower Upper Iowa corridor without staging a separate downstream shuttle.",
        "The Dorchester gauge is downstream and direct for the lower corridor, but make a visual check for wood, depth, and landing condition before launching."
      ],
      "watchFor": [
        "Scraping in riffles below the 300 cfs selected floor and smoother water around the 300-350 cfs target.",
        "Fresh wood, strainers, bridge current, fast rises after rain, and private banks.",
        "Cold spring-fed water, long rural response times, and limited alternate exits."
      ]
    },
    "accessPoints": [
      {
        "id": "iverson-bridge-access",
        "name": "Iverson Bridge Access",
        "latitude": 43.41256,
        "longitude": -91.5769,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in and endpoint shared with the existing Lower-Dam-to-Iverson route."
      },
      {
        "id": "kumpf-access",
        "name": "Kumpf Access",
        "latitude": 43.41165,
        "longitude": -91.45962,
        "mileFromStart": 8.5,
        "segmentKind": "creek",
        "note": "Default take-out documented by Miles Paddled and the Upper Iowa guide access chain."
      }
    ]
  },
  "maquoketa-river-ebys-mill-supples-bridge": {
    "putIn": {
      "id": "ebys-mill-access",
      "name": "Eby's Mill Access",
      "latitude": 42.19803,
      "longitude": -91.0566
    },
    "takeOut": {
      "id": "supples-bridge-access",
      "name": "Supples Bridge Access / Temple Hill Road",
      "latitude": 42.18482,
      "longitude": -90.9769
    },
    "logistics": {
      "distanceLabel": "About 8.25 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr depending on wind, water, and stops",
      "shuttle": "Stage Supples Bridge / Temple Hill Road first, then drive back to Eby's Mill. Most shuttle roads are paved, but verify the sandy downstream access and parking before leaving a vehicle.",
      "permits": "No route-specific paddling permit is known. Follow Iowa boating/PFD rules and posted Jones County Conservation / Iowa DNR water-trail rules at both accesses and public wildlife areas.",
      "camping": "Treat this as a day route. Nearby Jones County parks can support separate base-camp planning, but no legal on-route river campsite is selected between Eby's Mill and Supples Bridge.",
      "campingClassification": "none",
      "summary": "Launch from the rebuilt Eby's Mill ramp and take out at Supples Bridge / Temple Hill Road for a quiet lower-Maquoketa connector with good wildlife, broad sand-lined water, and fewer bluffs than the Pictured Rocks section.",
      "accessCaveats": [
        "Eby's Mill was rebuilt after earlier construction closures, but access status can still change after high water, grading, or road work.",
        "Supples Bridge access sits downstream of the bridge on river right and is mostly sandy rather than a full-service ramp; confirm exit visibility from the road before launching.",
        "This route starts well below Mon-Maq Dam and does not include any dam approach or portage."
      ],
      "watchFor": [
        "Wide shallow channel, sandbars, and gravel grounding near the 150 cfs floor.",
        "Wind on open bends, outside-bend wood, tree-debris obstacle courses, and stronger bridge current after storms.",
        "Private banks outside public wildlife areas and limited bailout options between the two rural access points."
      ]
    },
    "accessPoints": [
      {
        "id": "ebys-mill-access",
        "name": "Eby's Mill Access",
        "latitude": 42.19803,
        "longitude": -91.0566,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the improved Jones County lower-Maquoketa ramp."
      },
      {
        "id": "highway-136-access",
        "name": "Highway 136 access",
        "latitude": 42.1895,
        "longitude": -91.0097,
        "mileFromStart": 5.5,
        "segmentKind": "creek",
        "note": "Rougher intermediate access noted in lower-Maquoketa route descriptions; verify current bank and parking conditions before relying on it."
      },
      {
        "id": "supples-bridge-access",
        "name": "Supples Bridge Access / Temple Hill Road",
        "latitude": 42.18482,
        "longitude": -90.9769,
        "mileFromStart": 8.25,
        "segmentKind": "creek",
        "note": "Default take-out; Miles Paddled describes it as legitimate, mostly flat, and sandy."
      }
    ]
  },
  "maquoketa-river-backbone-dundee": {
    "putIn": {
      "id": "backbone-lake-dam-landing",
      "name": "Backbone Lake Dam Landing",
      "latitude": 42.600692,
      "longitude": -91.536757
    },
    "takeOut": {
      "id": "dundee-access",
      "name": "Dundee Access / Dundee Wildlife Area",
      "latitude": 42.5816,
      "longitude": -91.5461
    },
    "logistics": {
      "distanceLabel": "About 1.8 to 2.1 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with scouting, wood, or low water",
      "shuttle": "Use a short shuttle from Dundee Access back to the Backbone dam corridor. Confirm park road and gate status before staging, because the app route starts below the dam and does not include private upstream access or dam passage.",
      "permits": "No route-specific paddling permit is known. Follow Backbone State Park, Delaware County water-trail, and Iowa boating/PFD rules, plus any posted park gate, parking, or lake-area instructions.",
      "camping": "Backbone State Park camping, water, and restrooms can support this short route as a base-camp outing. No on-route river campsite is assumed between the dam and Dundee.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch below Backbone Lake Dam and take out at Dundee for the short official upper Maquoketa water-trail opener. The route is scenic but intentionally dam-aware and scout-heavy.",
      "accessCaveats": [
        "Do not launch above Backbone Lake Dam for this card. The optional upstream reach in DNR guide material requires private permission and is outside this route.",
        "The exact below-dam launch can be controlled by park roads, gates, water level, and same-day signage. Walk the carry before unloading.",
        "Dundee is the default take-out before the longer Dundee-to-Manchester water-trail chain."
      ],
      "watchFor": [
        "Split below-dam channels, low branches, a two-foot ledge below 129th Street, and wood that can force scouting or portage.",
        "Bumpy low water near the 51 cfs floor and pushy strainers when the Manchester gauge climbs toward 451 cfs or higher.",
        "Cold water, park gate changes, algae/bacteria caveats in the lake area, and private banks away from public access points."
      ]
    },
    "accessPoints": [
      {
        "id": "backbone-lake-dam-landing",
        "name": "Backbone Lake Dam Landing",
        "latitude": 42.600692,
        "longitude": -91.536757,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default below-dam put-in; do not include the dam or private upstream reach."
      },
      {
        "id": "dundee-access",
        "name": "Dundee Access / Dundee Wildlife Area",
        "latitude": 42.5816,
        "longitude": -91.5461,
        "mileFromStart": 1.8,
        "segmentKind": "creek",
        "note": "Default take-out for the Backbone-to-Dundee water-trail opener."
      }
    ]
  },
  "maquoketa-river-quaker-mill-baileys-ford": {
    "putIn": {
      "id": "quaker-mill-dam",
      "name": "Quaker Mill Dam / 195th Street",
      "latitude": 42.50796,
      "longitude": -91.47395
    },
    "takeOut": {
      "id": "baileys-ford-access",
      "name": "Bailey's Ford Access",
      "latitude": 42.44239,
      "longitude": -91.4085
    },
    "logistics": {
      "distanceLabel": "About 7.75 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with whitewater scouting, low-water scraping, or fishing stops",
      "shuttle": "Stage Bailey's Ford first, then drive back to the Quaker Mill / Manchester corridor. Decide before launching whether the group will run, portage, or bypass the Manchester whitewater features.",
      "permits": "No route-specific paddling permit is known. Follow Delaware County water-trail guidance, Manchester park rules, Iowa boating/PFD rules, and posted access instructions at Quaker Mill and Bailey's Ford.",
      "camping": "Treat this as a day route. No legal on-route camping plan was verified between Manchester and Bailey's Ford, and the lower corridor approaches private Lake Delhi frontage.",
      "campingClassification": "none",
      "summary": "Launch at Quaker Mill Dam and take out at Bailey's Ford for a Manchester-area Maquoketa day that includes the whitewater park, Schram/Pine Oak corridor, and the final river-focused take-out before Lake Delhi influence.",
      "accessCaveats": [
        "Quaker Mill and Manchester whitewater features require a deliberate line or portage decision. This route is whitewater-filtered because the normal source route includes those features.",
        "Schram Park and Pin Oak Park are official downstream access/bailout points, but use them only when current signs, parking, and bank conditions are clear.",
        "Bailey's Ford is the planned finish. Delaware County warns the river below Bailey's Ford begins to become impounded by Delhi Dam and recommends ending or restarting trips around that dam boundary."
      ],
      "watchFor": [
        "Class I-II rapids at the put-in, Class II Manchester whitewater-park features, bridge current, shallow riffles, and scraping near or below 195 cfs.",
        "Fast rises, woody debris, cattle/pasture edges, bait-container litter, and private banks away from public access points.",
        "Lake Delhi stillwater influence and no-portage Delhi Dam logistics downstream of Bailey's Ford."
      ]
    },
    "accessPoints": [
      {
        "id": "quaker-mill-dam",
        "name": "Quaker Mill Dam / 195th Street",
        "latitude": 42.50796,
        "longitude": -91.47395,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in from the exact Miles Paddled route; scout dam-remnant and rapid behavior before launching."
      },
      {
        "id": "manchester-whitewater-park",
        "name": "Manchester Whitewater Park",
        "latitude": 42.482137,
        "longitude": -91.458424,
        "mileFromStart": 2.4,
        "segmentKind": "creek",
        "note": "Whitewater feature corridor; run only with appropriate skill and gear or portage/bypass."
      },
      {
        "id": "schram-park",
        "name": "Schram Park",
        "latitude": 42.4679,
        "longitude": -91.4448,
        "mileFromStart": 3.5,
        "segmentKind": "creek",
        "note": "Official alternate access shortly downstream of Manchester; verify current landing conditions."
      },
      {
        "id": "pin-oak-park",
        "name": "Pin Oak Park Access",
        "latitude": 42.4564,
        "longitude": -91.4256,
        "mileFromStart": 5.5,
        "segmentKind": "creek",
        "note": "Official downstream access and practical bailout before the Bailey's Ford finish."
      },
      {
        "id": "baileys-ford-access",
        "name": "Bailey's Ford Access",
        "latitude": 42.44239,
        "longitude": -91.4085,
        "mileFromStart": 7.75,
        "segmentKind": "creek",
        "note": "Default take-out before the river becomes impounded toward Lake Delhi."
      }
    ]
  },
  "des-moines-river-eldon-shidepoke": {
    "putIn": {
      "id": "eldon-water-street-ramp",
      "name": "Eldon Water Street boat ramp",
      "latitude": 40.92085,
      "longitude": -92.2299
    },
    "takeOut": {
      "id": "shidepoke-access",
      "name": "Shidepoke Access / Selma boat ramp",
      "latitude": 40.86891,
      "longitude": -92.15889
    },
    "logistics": {
      "distanceLabel": "About 5.2 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer with low water, wind, or higher Red Rock releases",
      "shuttle": "Stage the Shidepoke / Selma access first, then launch from the cement ramp on Water Street in Eldon. Confirm the Keosauqua gauge trend and inspect the Shidepoke landing before putting on.",
      "permits": "No route-specific paddling permit is known. Use the public ramps, follow Iowa boating/PFD rules, and respect Lower Des Moines River water-trail, county, city, and private-property postings.",
      "camping": "Treat this as a day route. Iowa DNR says sandbar camping is allowed on this meandered Lower Des Moines corridor below the ordinary high-water mark, but this short starter reach should not need an overnight stop.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at Eldon and take out at Shidepoke for the first short Lower Des Moines River water-trail segment. The route is beginner-friendly only at normal release-controlled levels; silver carp, steep banks, bridge current, and fast or low water still need same-day judgment.",
      "accessCaveats": [
        "Iowa DNR identifies the Eldon put-in as the cement boat ramp on Water Street and the Shidepoke take-out as a signed cement ramp with a protected eddy downstream near Selma. The DNR guide labels the segment 4.5 miles, but source-backed access coordinates put the endpoints about 5.1 miles apart straight-line, so the app uses a conservative 5.2-mile planning label.",
        "The Keosauqua USGS gauge is downstream on the same Lower Des Moines water-trail corridor. Use it as a conservative proxy and confirm local depth and current at Eldon before committing.",
        "Sandbars may be legal below the ordinary high-water mark, but upland banks are private unless otherwise posted or managed as public access."
      ],
      "watchFor": [
        "Release changes from Red Rock Dam, low-water dragging, high/fast water, steep muddy banks, and exposed bridge or shoreline debris.",
        "Silver carp that can leap into boats or paddlers, especially when startled by noise or motor traffic.",
        "Private banks and limited mid-route bailout options despite the short mileage."
      ]
    },
    "accessPoints": [
      {
        "id": "eldon-water-street-ramp",
        "name": "Eldon Water Street boat ramp",
        "latitude": 40.92085,
        "longitude": -92.2299,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; Iowa DNR identifies the Lower Des Moines trail start as the cement ramp on Water Street in Eldon."
      },
      {
        "id": "shidepoke-access",
        "name": "Shidepoke Access / Selma boat ramp",
        "latitude": 40.86891,
        "longitude": -92.15889,
        "mileFromStart": 5.2,
        "segmentKind": "creek",
        "note": "Default take-out; Iowa DNR describes a signed cement ramp with a protected eddy near Shidepoke."
      }
    ]
  },
  "des-moines-river-shidepoke-douds": {
    "putIn": {
      "id": "shidepoke-access",
      "name": "Shidepoke Access / Selma boat ramp",
      "latitude": 40.86891,
      "longitude": -92.15889
    },
    "takeOut": {
      "id": "douds-des-moines-river-access",
      "name": "Douds County Park & Des Moines River Access",
      "latitude": 40.83613,
      "longitude": -92.08879
    },
    "logistics": {
      "distanceLabel": "About 4.6 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer with low water, wind, fishing, or release-driven current",
      "shuttle": "Stage Douds County Park / Des Moines River Access first, then launch at Shidepoke. Walk the Douds ramp and parking area before launch because the river bends and bridge area can change with debris.",
      "permits": "No route-specific paddling permit is known. Use the signed public accesses, follow Iowa boating/PFD rules, and obey Lower Des Moines River water-trail, county-park, bridge, pipeline, and private-property postings.",
      "camping": "Douds County Park lists two gravel campsites with electric hookups near the access. Sandbar camping is also generally allowed on the meandered Lower Des Moines below the ordinary high-water mark, but confirm current county rules before planning an overnight.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Shidepoke and take out at Douds for a short Lower Des Moines connector between two public water-trail accesses. The main route-specific cautions are bridge pilings, logs, pipeline no-docking signs, release-driven current, and silver carp.",
      "accessCaveats": [
        "Iowa DNR maps Shidepoke as the upstream access and Douds as the next downstream access at about 4.6 miles.",
        "Villages of Van Buren lists Douds County Park / Des Moines River Access at 14367 Walnut Street with boat ramp and limited camping context.",
        "The Keosauqua USGS gauge is downstream on the same corridor, so pair the proxy reading with a visual check at Shidepoke and Douds."
      ],
      "watchFor": [
        "Bridge pilings and log/debris piles near the Douds-area bridges.",
        "Pipeline no-docking signs, private banks, and limited legal stopping options away from public access or legal sandbars.",
        "Release changes from Red Rock Dam, high/fast water, low-water bars, and jumping silver carp."
      ]
    },
    "accessPoints": [
      {
        "id": "shidepoke-access",
        "name": "Shidepoke Access / Selma boat ramp",
        "latitude": 40.86891,
        "longitude": -92.15889,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; signed cement Lower Des Moines water-trail ramp near Selma."
      },
      {
        "id": "douds-des-moines-river-access",
        "name": "Douds County Park & Des Moines River Access",
        "latitude": 40.83613,
        "longitude": -92.08879,
        "mileFromStart": 4.6,
        "segmentKind": "creek",
        "note": "Default take-out; public county-park river access with boat ramp and limited camping context."
      }
    ]
  },
  "des-moines-river-douds-austin-park": {
    "putIn": {
      "id": "douds-des-moines-river-access",
      "name": "Douds County Park & Des Moines River Access",
      "latitude": 40.83613,
      "longitude": -92.08879
    },
    "takeOut": {
      "id": "austin-park-access",
      "name": "Austin Park boat access",
      "latitude": 40.7715,
      "longitude": -91.976
    },
    "logistics": {
      "distanceLabel": "About 9.75 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with low water, headwind, fishing stops, or slow release conditions",
      "shuttle": "Stage Austin Park first, then launch from Douds County Park. This is the first longer reach in the Eldon-to-Keosauqua sequence, so set a firm turn-back decision before leaving Douds.",
      "permits": "No route-specific paddling permit is known. Use the public access areas, follow Iowa boating/PFD rules, and obey county-park, water-trail, campsite, and private-property rules.",
      "camping": "Douds County Park has limited electric campsite context and Iowa DNR / Villages of Van Buren materials identify Austin Park as a river access with campground amenities. Confirm current reservations, seasonal services, and flood cleanup status before using either endpoint overnight.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Douds and take out at Austin Park for a longer Lower Des Moines River day through wooded bends and bluff-country scenery. Iowa DNR describes few special hazards on this reach, but the distance, release-controlled levels, private banks, and rescue exposure make it less forgiving than the two upstream starter segments.",
      "accessCaveats": [
        "Iowa DNR gives Douds to Austin Park as about 9.75 miles and lists Austin Park as the next downstream access before Keosauqua.",
        "Austin Park is described by local water-trail materials as about two miles northeast of Pittsburg with boat access and campground amenities; verify the exact ramp and parking condition before leaving a shuttle vehicle.",
        "The Keosauqua USGS gauge is downstream of Austin Park on the same Lower Des Moines corridor. Use it as a proxy with same-day visual checks at Douds and Austin Park."
      ],
      "watchFor": [
        "Longer mileage, headwind, fewer easy exits, and slower rescue response than the shorter Eldon-to-Douds segments.",
        "Release changes from Red Rock Dam, high/fast water, low-water bars, muddy banks, and jumping silver carp.",
        "Wood on outside bends, bridge current, private banks, and overnight assumptions that depend on current county or park rules."
      ]
    },
    "accessPoints": [
      {
        "id": "douds-des-moines-river-access",
        "name": "Douds County Park & Des Moines River Access",
        "latitude": 40.83613,
        "longitude": -92.08879,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public county-park access on the Lower Des Moines River."
      },
      {
        "id": "austin-park-access",
        "name": "Austin Park boat access",
        "latitude": 40.7715,
        "longitude": -91.976,
        "mileFromStart": 9.75,
        "segmentKind": "creek",
        "note": "Default take-out; public river access and campground context in the Villages of Van Buren / Iowa DNR water-trail materials."
      }
    ]
  },
  "des-moines-river-austin-park-keosauqua": {
    "putIn": {
      "id": "austin-park-access",
      "name": "Austin Park boat access",
      "latitude": 40.7715,
      "longitude": -91.976
    },
    "takeOut": {
      "id": "keosauqua-boat-ramp",
      "name": "Keosauqua Boat Ramp",
      "latitude": 40.7291,
      "longitude": -91.962
    },
    "logistics": {
      "distanceLabel": "About 5.8 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with low water, wind, or state-park stops",
      "shuttle": "Stage at the Keosauqua riverfront boat ramp near Hotel Manning, then drive back to Austin Park northeast of Pittsburg. Walk both ramps before launching because release-driven levels can change ramp edge conditions.",
      "permits": "No route-specific paddling permit is known. Use the public water-trail accesses, follow Iowa boating/PFD rules, and obey county, city, state-park, and private-property boundaries.",
      "camping": "Austin Park and Keosauqua / Lacey-Keosauqua have endpoint camping and lodging support in the local water-trail brochure. Treat reservations, state-park rules, and seasonal services as separate trip planning.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Austin Park and paddle the official Lower Des Moines River Water Trail around the Lacey-Keosauqua bend to the Keosauqua boat ramp. The reach is beginner-appropriate only at normal levels and still deserves bridge, release, and private-bank checks.",
      "accessCaveats": [
        "Austin Park is a named water-trail access with camping context, but the saved coordinate is a practical access-area anchor; verify the ramp and parking from land before leaving a vehicle.",
        "Keosauqua is the named public boat-ramp finish near Hotel Manning and the direct USGS gauge town.",
        "The Lower Des Moines is meandered, but private property begins at the high-water mark. Keep breaks to legal bars, riverbed, and clearly public lands."
      ],
      "watchFor": [
        "Bridge pilings at Pittsburg and Keosauqua, especially when releases make current faster.",
        "Red Rock release changes, low-water bars, muddy banks, wind, cold water, floating debris, and jumping silver carp.",
        "Residential/private banks between Austin Park and Keosauqua; do not assume informal exits are legal."
      ]
    },
    "accessPoints": [
      {
        "id": "austin-park-access",
        "name": "Austin Park boat access",
        "latitude": 40.7715,
        "longitude": -91.976,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public river access and campground context in Iowa DNR / Villages of Van Buren water-trail materials."
      },
      {
        "id": "keosauqua-boat-ramp",
        "name": "Keosauqua Boat Ramp",
        "latitude": 40.7291,
        "longitude": -91.962,
        "mileFromStart": 5.8,
        "segmentKind": "creek",
        "note": "Default take-out; public Lower Des Moines water-trail ramp near Hotel Manning and the direct USGS gauge town."
      }
    ]
  },
  "des-moines-river-bonaparte-des-moines-access": {
    "putIn": {
      "id": "bonaparte-boat-ramp",
      "name": "Bonaparte Riverfront Park / Bonaparte Boat Ramp",
      "latitude": 40.69785,
      "longitude": -91.80552
    },
    "takeOut": {
      "id": "des-moines-river-access-van-buren",
      "name": "Des Moines River Access",
      "latitude": 40.6712974,
      "longitude": -91.7580091
    },
    "logistics": {
      "distanceLabel": "About 3.4 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low-water scouting below Bonaparte",
      "shuttle": "Stage the county Des Moines River Access south/east of Bonaparte, then launch from Bonaparte Riverfront Park. Confirm the old-dam line below Bonaparte before committing from the ramp.",
      "permits": "No route-specific paddling permit is known. Follow city, county, water-trail, and Iowa boating/PFD rules, and keep routine stops to public access land or legal river bars.",
      "camping": "Des Moines River Access has primitive camping and a boat ramp according to Villages of Van Buren. Confirm current county rules, flood cleanup, and seasonal service status before relying on it overnight.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Bonaparte and paddle the short official Lower Des Moines River Water Trail reach to the county Des Moines River Access. The first half-mile below Bonaparte carries the main decision: old dam remains and cross-current can be hazardous when low or pushy.",
      "accessCaveats": [
        "Bonaparte Riverfront Park is the same public ramp used by the upstream Bentonsport card; use posted local signs for parking and ramp approach.",
        "The Des Moines River Access coordinate comes from the named launch record and should be treated as a practical access coordinate, not a surveyed ramp point.",
        "This short segment starts below old dam remains. Do not launch if the group cannot safely make the DNR-described move away from the put-in side."
      ],
      "watchFor": [
        "Old dam remains, rough water, and shallow rock immediately below Bonaparte.",
        "Fast release-driven current, floating debris, strainers, bridge or bank turbulence, and jumping silver carp.",
        "Private cabins, agricultural banks, and limited legal exits between the public endpoints."
      ]
    },
    "accessPoints": [
      {
        "id": "bonaparte-boat-ramp",
        "name": "Bonaparte Riverfront Park / Bonaparte Boat Ramp",
        "latitude": 40.69785,
        "longitude": -91.80552,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public riverfront park ramp just above the old-dam-remnant hazard zone."
      },
      {
        "id": "des-moines-river-access-van-buren",
        "name": "Des Moines River Access",
        "latitude": 40.6712974,
        "longitude": -91.7580091,
        "mileFromStart": 3.4,
        "segmentKind": "creek",
        "note": "Default take-out; county-maintained cement boat ramp with primitive camping context. Coordinate is a practical launch anchor."
      }
    ]
  },
  "des-moines-river-access-farmington": {
    "putIn": {
      "id": "des-moines-river-access-van-buren",
      "name": "Des Moines River Access",
      "latitude": 40.6712974,
      "longitude": -91.7580091
    },
    "takeOut": {
      "id": "farmington-access",
      "name": "Farmington Access",
      "latitude": 40.6387977,
      "longitude": -91.7438861
    },
    "logistics": {
      "distanceLabel": "About 3 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, faster with high releases",
      "shuttle": "Stage at Farmington Access below the Highway 2 bridge, then drive back to Des Moines River Access. Identify the take-out from land because continuing downstream leaves the Iowa water-trail finish and requires a separate plan.",
      "permits": "No route-specific paddling permit is known. Follow Van Buren County, Farmington, and Iowa boating/PFD rules, and use only public accesses or legal river bars for stops.",
      "camping": "The county Des Moines River Access has primitive camping, while Farmington is listed with camping, cabins, restrooms, water, food, kiosk, and shelter. Confirm current local rules and seasonal availability before using either endpoint overnight.",
      "campingClassification": "endpoint_campground",
      "summary": "Finish the Van Buren County Lower Des Moines water-trail chain by paddling from Des Moines River Access to Farmington Access. It is a short, straight reach, but high releases, debris, private banks, and missing the town take-out can still turn it into a bigger problem.",
      "accessCaveats": [
        "Des Moines River Access and Farmington Access are named public water-trail launches; saved coordinates are practical launch records and should be verified against posted signs.",
        "Farmington Access is below the Highway 2 bridge on river left/east side in the Iowa DNR guide.",
        "Treat adjacent residential and agricultural banks as private unless clearly posted public."
      ],
      "watchFor": [
        "High, fast, or debris-laden water from Red Rock release management or upstream storms.",
        "Strainers, bridge current near Farmington, cold-water exposure, wind, motorboats, and jumping silver carp.",
        "Drifting past Farmington without a downstream shuttle or Missouri/Lee County access plan."
      ]
    },
    "accessPoints": [
      {
        "id": "des-moines-river-access-van-buren",
        "name": "Des Moines River Access",
        "latitude": 40.6712974,
        "longitude": -91.7580091,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; county-maintained Lower Des Moines access with primitive camping context."
      },
      {
        "id": "farmington-access",
        "name": "Farmington Access",
        "latitude": 40.6387977,
        "longitude": -91.7438861,
        "mileFromStart": 3,
        "segmentKind": "creek",
        "note": "Default take-out; Farmington boat launch below the Highway 2 bridge on the east side of the river."
      }
    ]
  },
  "iowa-river-hills-river-junction": {
    "putIn": {
      "id": "hills-access-campground",
      "name": "Hills Access & Campground",
      "latitude": 41.5544618,
      "longitude": -91.5257829
    },
    "takeOut": {
      "id": "river-junction-access-campground",
      "name": "River Junction Access & Campground",
      "latitude": 41.4912969,
      "longitude": -91.5017984
    },
    "logistics": {
      "distanceLabel": "About 9.8 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr, longer with low water, wind, or wood scouting",
      "shuttle": "Stage the take-out at River Junction Access and Campground, then drive back to Hills Access. Check Johnson County closure notices before leaving a vehicle because River Junction can close during high water.",
      "permits": "No route-specific paddling permit is known. Follow Johnson County Conservation rules, campground rules, posted park hours, and Iowa boating/PFD requirements.",
      "camping": "Both endpoints support camping: Hills has electric and non-electric sites, and River Junction has primitive non-electric campsites. Treat camping as a separate county-park plan, not as permission to camp on private banks.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Hills Access and paddle the official Johnson County Iowa River Water Trail segment to River Junction Access. This is a wooded, sinuous bottomland reach with campground endpoints, a direct upstream gauge, and closure-prone floodplain logistics.",
      "accessCaveats": [
        "Hills Access is a Johnson County boat-ramp and campground access on the Iowa River; use the signed ramp and public parkland for staging.",
        "River Junction Access has a county-published coordinate, boat ramp, primitive campsites, and restrooms, but it can close to vehicle traffic when the Iowa and English Rivers rise.",
        "The Iowa River Water Trail continues downstream, but this card ends at River Junction. Do not drift into the remote Tri-County Bridge / River Forks gap without a separate long-route plan."
      ],
      "watchFor": [
        "Fresh strainers, floating debris, and soft or muddy landings after storms.",
        "Sinuous bottomland bends with fewer simple exits than the upstream Iowa City segment.",
        "High or rising water that can flood River Junction access roads and campground areas.",
        "Private banks and farm edges away from public access sites."
      ]
    },
    "accessPoints": [
      {
        "id": "hills-access-campground",
        "name": "Hills Access & Campground",
        "latitude": 41.5544618,
        "longitude": -91.5257829,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; Johnson County identifies Hills as an Iowa River Water Trail entry/take-out point with ramp and campground support."
      },
      {
        "id": "river-junction-access-campground",
        "name": "River Junction Access & Campground",
        "latitude": 41.4912969,
        "longitude": -91.5017984,
        "mileFromStart": 9.8,
        "segmentKind": "creek",
        "note": "Default take-out; county-published campground/access coordinate with primitive campsites and boat-ramp access."
      }
    ]
  },
  "south-skunk-river-peterson-park-sleepy-hollow": {
    "putIn": {
      "id": "peterson-park-west-access",
      "name": "Peterson Park West Access",
      "latitude": 42.0847077,
      "longitude": -93.5974389
    },
    "takeOut": {
      "id": "sleepy-hollow-access",
      "name": "Sleepy Hollow access / W Riverside Road",
      "latitude": 42.06658,
      "longitude": -93.62025
    },
    "logistics": {
      "distanceLabel": "About 3 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low-water riffles or wood scouting",
      "shuttle": "Use a short two-car shuttle between Peterson Park West and Sleepy Hollow on W Riverside Road. Inspect Sleepy Hollow first because it is also the direct Ames gauge corridor and may show same-day depth and debris clearly.",
      "permits": "No route-specific paddling permit is known. Follow Story County / City of Ames access rules, posted park hours, and Iowa boating/PFD requirements.",
      "camping": "Treat this as a short day route. No on-route camping is assumed, and the non-meandered corridor means adjoining banks and streambed outside public areas may be private.",
      "campingClassification": "none",
      "summary": "Launch at Peterson Park West and fill the official South Skunk water-trail gap to Sleepy Hollow. This above-Ames connector is short, but riffles, wood, private banks, and rain-sensitive current still require a real gauge and visual check.",
      "accessCaveats": [
        "Peterson Park West is a public Story County South Skunk River Water Trail access, but use the signed river access rather than pond or beach areas inside the broader park.",
        "Sleepy Hollow is the planned take-out near W Riverside Road and the USGS South Skunk near Ames gauge; orient from land before launching.",
        "The South Skunk is non-meandered through this corridor. Use public accesses and confirmed parkland only for normal stops."
      ],
      "watchFor": [
        "Shallow riffles and scraping when the Ames gauge is near or below the local 125 cfs above-Ames floor.",
        "Fresh trees, sweepers, and bridge debris after storms.",
        "Faster, muddier current when the gauge is high or rising; do not rely on the short mileage to offset wood hazards.",
        "Private banks between the two public access points."
      ]
    },
    "accessPoints": [
      {
        "id": "peterson-park-west-access",
        "name": "Peterson Park West Access",
        "latitude": 42.0847077,
        "longitude": -93.5974389,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in and official Story County South Skunk water-trail access."
      },
      {
        "id": "sleepy-hollow-access",
        "name": "Sleepy Hollow access / W Riverside Road",
        "latitude": 42.06658,
        "longitude": -93.62025,
        "mileFromStart": 3,
        "segmentKind": "creek",
        "note": "Default take-out beside the direct Ames USGS gauge corridor."
      }
    ]
  },
  "cedar-river-otranto-acorn": {
    "putIn": {
      "id": "otranto-park-below-dam",
      "name": "Otranto Park below-dam access",
      "latitude": 43.458242,
      "longitude": -92.97915
    },
    "takeOut": {
      "id": "acorn-park",
      "name": "Acorn Park",
      "latitude": 43.388574,
      "longitude": -92.938811
    },
    "logistics": {
      "distanceLabel": "6.6 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with dam scouting or low water",
      "shuttle": "Stage at Acorn Park near St. Ansgar, then launch from the signed Otranto Park below-dam access. Identify the Acorn broken-dam area from land before launch and treat the park as the planned exit unless a separate downstream portage plan is staged.",
      "permits": "No route-specific paddling permit is known. Use only public park/access areas, follow posted county and Iowa boating/PFD rules, and avoid private banks.",
      "camping": "No on-route campsite was confirmed for this short leg. Use nearby public campground options only if current park rules allow them, and do not assume bank or gravel-bar camping.",
      "campingClassification": "none",
      "summary": "Launch below the Otranto dam and paddle the upper Cedar River to Acorn Park. This is a source-backed Mitchell County access pair, but the broken-dam finish and stale Osage gauge require conservative same-day judgment.",
      "accessCaveats": [
        "Otranto launch discipline matters: put in below the dam only and stay out of dam hydraulics.",
        "The guide says the Acorn broken dam may be runnable for experienced paddlers after scouting, but also warns it is fast water with little margin for error and old metal can be exposed at low water. Treat Acorn as the planned take-out/portage boundary.",
        "USGS 05457505 at Osage returned stale 2017 Water Services data during this run, so the app uses downstream USGS 05457700 at Charles City plus a required visual check at Otranto."
      ],
      "watchFor": [
        "Broken-dam current, exposed metal or rock at low water, old dumpsite debris, and shallow riffles.",
        "Strainers, outside-bend wood, private banks, agricultural runoff after storms, and limited mid-route exits.",
        "Fast rises after rain, cold shoulder-season water, and the consequence of missing the Acorn boundary."
      ]
    },
    "accessPoints": [
      {
        "id": "otranto-park-below-dam",
        "name": "Otranto Park below-dam access",
        "latitude": 43.458242,
        "longitude": -92.97915,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in on the east bank below the Otranto dam; coordinate published in the Cedar River Paddling Trips guide."
      },
      {
        "id": "acorn-park",
        "name": "Acorn Park",
        "latitude": 43.388574,
        "longitude": -92.938811,
        "mileFromStart": 6.6,
        "segmentKind": "creek",
        "note": "Default take-out and broken-dam scout/portage boundary near St. Ansgar."
      }
    ]
  },
  "cedar-river-acorn-halvorson": {
    "putIn": {
      "id": "acorn-park",
      "name": "Acorn Park",
      "latitude": 43.388574,
      "longitude": -92.938811
    },
    "takeOut": {
      "id": "halvorson-park",
      "name": "Halvorson Park",
      "latitude": 43.356685,
      "longitude": -92.925215
    },
    "logistics": {
      "distanceLabel": "2.8 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, plus dam take-out/portage scouting",
      "shuttle": "Stage at Halvorson Park south of St. Ansgar and identify the river-right St. Ansgar dam portage/take-out zone before launching from Acorn Park.",
      "permits": "No route-specific paddling permit is known. Follow posted Mitchell County and Iowa boating/PFD rules, and keep routine landings to public access areas.",
      "camping": "Halvorson County Park has camping according to the Cedar River guide, so this can support endpoint campground staging. Do not assume camping on private banks between Acorn and Halvorson.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Acorn Park and paddle the short St. Ansgar-area Cedar River connector to Halvorson Park, ending before the St. Ansgar dam portage.",
      "accessCaveats": [
        "The guide says the St. Ansgar dam must be carried around and identifies the best portage on river right about 50 yards above the dam.",
        "This route should stop at Halvorson unless the downstream dam-portage plan is staged and conditions are clearly appropriate.",
        "The Charles City gauge is downstream and route-family-level. Inspect current and depth at Acorn before committing."
      ],
      "watchFor": [
        "The St. Ansgar dam approach, faster current near the take-out, and low-water scrape points.",
        "Wood, strainers, private banks, and bridge or access debris after rain.",
        "Endpoint campground rules and seasonal park conditions at Halvorson."
      ]
    },
    "accessPoints": [
      {
        "id": "acorn-park",
        "name": "Acorn Park",
        "latitude": 43.388574,
        "longitude": -92.938811,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in below the Acorn broken-dam boundary."
      },
      {
        "id": "halvorson-park",
        "name": "Halvorson Park",
        "latitude": 43.356685,
        "longitude": -92.925215,
        "mileFromStart": 2.8,
        "segmentKind": "creek",
        "note": "Default take-out and campground-supported county park above the St. Ansgar dam portage."
      }
    ]
  },
  "cedar-river-halvorson-interstate": {
    "putIn": {
      "id": "halvorson-park",
      "name": "Halvorson Park",
      "latitude": 43.356685,
      "longitude": -92.925215
    },
    "takeOut": {
      "id": "interstate-park-mitchell",
      "name": "Interstate Park / Mitchell",
      "latitude": 43.319134,
      "longitude": -92.879648
    },
    "logistics": {
      "distanceLabel": "4.7 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with wind or dam-portage scouting",
      "shuttle": "Stage at Interstate Park on the west edge of Mitchell and confirm the left-bank power-dam portage area before launching from Halvorson Park.",
      "permits": "No route-specific paddling permit is known. Follow posted Mitchell County Conservation and Iowa boating/PFD rules, and use public areas only.",
      "camping": "The Cedar River guide identifies camping at both Halvorson County Park and Interstate Park, making this an endpoint-campground staging route rather than a bank-camping route.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Halvorson Park and paddle the impounded upper Cedar River toward Interstate Park at Mitchell, stopping before the Mitchell power-dam portage.",
      "accessCaveats": [
        "The Interstate Power dam at Mitchell is the route boundary. The guide says the portage is about 100 yards on river left, starting near the powerhouse and ending above the Mitchell Bridge.",
        "Wind can matter on the more lake-like impounded water above Mitchell, and higher water increases dam-approach consequence.",
        "USGS 05457700 at Charles City is a downstream proxy for this upper leg; verify local current, depth, wind, and access conditions at Halvorson."
      ],
      "watchFor": [
        "Mitchell dam approach, wind on impounded water, shoreline debris, and private banks.",
        "Low-water shallows and high/rising water that shortens decision time above the portage.",
        "Seasonal campground/access rules at both endpoint parks."
      ]
    },
    "accessPoints": [
      {
        "id": "halvorson-park",
        "name": "Halvorson Park",
        "latitude": 43.356685,
        "longitude": -92.925215,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in and campground-supported county park south of St. Ansgar."
      },
      {
        "id": "interstate-park-mitchell",
        "name": "Interstate Park / Mitchell",
        "latitude": 43.319134,
        "longitude": -92.879648,
        "mileFromStart": 4.7,
        "segmentKind": "creek",
        "note": "Default take-out and Mitchell dam portage boundary with campground/picnic context."
      }
    ]
  },
  "cedar-river-interstate-bennett": {
    "putIn": {
      "id": "interstate-park-mitchell",
      "name": "Interstate Park / Mitchell",
      "latitude": 43.319134,
      "longitude": -92.879648
    },
    "takeOut": {
      "id": "bennett-access",
      "name": "Bennett Access",
      "latitude": 43.30228,
      "longitude": -92.871666
    },
    "logistics": {
      "distanceLabel": "About 1.3 mi",
      "estimatedPaddleTime": "Short connector; allow extra time for Mitchell dam portage/relaunch checks",
      "shuttle": "Stage at Bennett Access on River Road, then confirm the Interstate Park dam-portage and below-dam relaunch area before unloading at Mitchell.",
      "permits": "No route-specific paddling permit is known. Follow posted Mitchell County Conservation and Iowa boating/PFD rules, and use public access areas only.",
      "camping": "Interstate Park has camping and picnic-table context in the Cedar River guide. Bennett is treated as a day-use access; do not assume legal bank camping on this one-mile connector.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch only below the Mitchell dam after the Interstate Park portage/relaunch decision and paddle the short connector to Bennett Access.",
      "accessCaveats": [
        "Do not run the Mitchell power dam. This route begins after the left-bank portage/relaunch described by the guide.",
        "The route is short, so confirm Bennett from land before launching and avoid drifting into the next riffle-heavy section without that plan.",
        "USGS 05457700 at Charles City is a downstream proxy; inspect local depth and current below Mitchell."
      ],
      "watchFor": [
        "Mitchell dam/relaunch discipline, shoreline debris, fast rises, and private banks.",
        "Short mileage that can make the Bennett take-out arrive quickly.",
        "Low-water shallows below the dam and post-rain wood."
      ]
    },
    "accessPoints": [
      {
        "id": "interstate-park-mitchell",
        "name": "Interstate Park / Mitchell",
        "latitude": 43.319134,
        "longitude": -92.879648,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in after the Mitchell dam portage/relaunch boundary; the guide identifies camping at Interstate Park."
      },
      {
        "id": "bennett-access",
        "name": "Bennett Access",
        "latitude": 43.30228,
        "longitude": -92.871666,
        "mileFromStart": 1,
        "segmentKind": "creek",
        "note": "Default take-out at 3791 River Road, Osage, per the Cedar River guide."
      }
    ]
  },
  "cedar-river-bennett-highway-9": {
    "putIn": {
      "id": "bennett-access",
      "name": "Bennett Access",
      "latitude": 43.30228,
      "longitude": -92.871666
    },
    "takeOut": {
      "id": "highway-9-bridge-osage",
      "name": "Highway 9 Bridge access",
      "latitude": 43.28395372212963,
      "longitude": -92.85249710083008
    },
    "logistics": {
      "distanceLabel": "2.7 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low-water riffle walking",
      "shuttle": "Stage at the Highway 9 Bridge access west of Osage, then launch from Bennett Access on River Road. Confirm parking and take-out footing at both ends.",
      "permits": "No route-specific paddling permit is known. Follow Mitchell County and Iowa boating/PFD rules, and keep stops to public access areas.",
      "camping": "No on-route camping is assumed. Use nearby county or city camping only if separately confirmed; do not camp on private banks or bars along this short reach.",
      "campingClassification": "none",
      "summary": "Launch at Bennett Access and paddle the riffle-heavy upper Cedar section past Iron Springs and Falk Wildlife Area to the Highway 9 Bridge.",
      "accessCaveats": [
        "The guide identifies Bennett and Highway 9 as access-pair anchors, but the Charles City gauge is downstream and must be paired with a local visual check.",
        "Highway 9 is a bridge access west of Osage. Confirm the practical landing and parking before launch.",
        "Do not continue to Osage Spring Park unless that downstream shuttle and fish-riffle plan are also staged."
      ],
      "watchFor": [
        "Frequent riffles, shallow rock, and possible scraping below the guide floor.",
        "Wood, bridge debris, faster current after rain, and private banks.",
        "Bluff bends around Iron Springs and Falk Wildlife Area where strainers can be consequential."
      ]
    },
    "accessPoints": [
      {
        "id": "bennett-access",
        "name": "Bennett Access",
        "latitude": 43.30228,
        "longitude": -92.871666,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at 3791 River Road, Osage, per the Cedar River guide."
      },
      {
        "id": "highway-9-bridge-osage",
        "name": "Highway 9 Bridge access",
        "latitude": 43.28395372212963,
        "longitude": -92.85249710083008,
        "mileFromStart": 2.7,
        "segmentKind": "creek",
        "note": "Default take-out about one mile west of Osage on Highway 9."
      }
    ]
  },
  "cedar-river-highway-9-osage-spring": {
    "putIn": {
      "id": "highway-9-bridge-osage",
      "name": "Highway 9 Bridge access",
      "latitude": 43.28395372212963,
      "longitude": -92.85249710083008
    },
    "takeOut": {
      "id": "osage-spring-park",
      "name": "Osage Spring Park",
      "latitude": 43.275409,
      "longitude": -92.849622
    },
    "logistics": {
      "distanceLabel": "1.9 mi",
      "estimatedPaddleTime": "About 1 hr, longer if the fish riffle needs scouting or walking",
      "shuttle": "Stage at Osage Spring Park on Spring Park Road, then launch from the Highway 9 Bridge access west of Osage. Walk the park take-out and riffle approach first.",
      "permits": "No route-specific paddling permit is known. Follow posted city/county park rules and Iowa boating/PFD requirements.",
      "camping": "Treat this as a short day run. No verified on-route or endpoint camping was selected for this access pair.",
      "campingClassification": "none",
      "summary": "Launch at Highway 9 and paddle the short limestone-outcrop reach to Osage Spring Park, using the guide-described extreme-right line at the fish riffle just above the take-out.",
      "accessCaveats": [
        "The fish riffle crosses the river just before Osage Spring Park; scout from shore or portage if the extreme-right route is not obvious or appropriate.",
        "The Charles City gauge is a downstream same-guide-corridor proxy and does not remove the need for local depth checks at Highway 9.",
        "Osage Spring Park is the planned take-out. Do not continue toward the low pontoon footbridge below Spring Park without staging the T38 route."
      ],
      "watchFor": [
        "Fish riffle above Osage Spring Park, shallow rocks, and potential pinning or scraping at low water.",
        "Limestone outcrops, wood, faster current after rain, and private banks.",
        "Take-out discipline before continuing into the Spring-Park-to-T38 low-footbridge section."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-9-bridge-osage",
        "name": "Highway 9 Bridge access",
        "latitude": 43.28395372212963,
        "longitude": -92.85249710083008,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in about one mile west of Osage on Highway 9."
      },
      {
        "id": "osage-spring-park",
        "name": "Osage Spring Park",
        "latitude": 43.275409,
        "longitude": -92.849622,
        "mileFromStart": 1.9,
        "segmentKind": "creek",
        "note": "Default take-out at 3540 Spring Park Road, Osage; fish riffle immediately above the park requires attention."
      }
    ]
  },
  "cedar-river-osage-spring-road-t38": {
    "putIn": {
      "id": "osage-spring-park",
      "name": "Osage Spring Park",
      "latitude": 43.275409,
      "longitude": -92.849622
    },
    "takeOut": {
      "id": "road-t38-access",
      "name": "Road T38 Access",
      "latitude": 43.253006,
      "longitude": -92.811759
    },
    "logistics": {
      "distanceLabel": "2.9 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, plus footbridge scouting or a short carry",
      "shuttle": "Stage at Road T38 south of Osage, then launch from Osage Spring Park. Identify the Sunny Brae low pontoon footbridge from land or satellite before committing.",
      "permits": "No route-specific paddling permit is known. Follow posted city/county access rules and Iowa boating/PFD requirements.",
      "camping": "Treat this as a short day run. No verified on-route or endpoint camping was selected for this access pair.",
      "campingClassification": "none",
      "summary": "Launch at Osage Spring Park and paddle the short Cedar connector to Road T38. The route fills the gap between the Osage Spring card and the existing T38-to-Idlewild card while foregrounding the low footbridge hazard.",
      "accessCaveats": [
        "The guide says shallow rock riffles are frequent at the beginning of the reach.",
        "Sunny Brae Country Club has a low pontoon footbridge that may require a short carry depending on water level and is specifically described as a sweeper hazard.",
        "Road T38 is the planned take-out unless the downstream Idlewild route is also staged."
      ],
      "watchFor": [
        "Low pontoon footbridge, shallow rock riffles, and possible scraping.",
        "Wood, bridge debris, faster current after rain, and private banks.",
        "Proxy-gauge limitations because Charles City is downstream of this short Osage-area reach."
      ]
    },
    "accessPoints": [
      {
        "id": "osage-spring-park",
        "name": "Osage Spring Park",
        "latitude": 43.275409,
        "longitude": -92.849622,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at 3540 Spring Park Road, Osage."
      },
      {
        "id": "road-t38-access",
        "name": "Road T38 Access",
        "latitude": 43.253006,
        "longitude": -92.811759,
        "mileFromStart": 2.9,
        "segmentKind": "creek",
        "note": "Default take-out and start of the existing T38-to-Idlewild segment."
      }
    ]
  },
  "upper-iowa-river-cattle-creek-malanaphy": {
    "putIn": {
      "name": "Cattle Creek Road / Daley Bridge canoe access area",
      "latitude": 43.4149,
      "longitude": -91.95874
    },
    "takeOut": {
      "name": "Malanaphy Springs / Bluffton Road bridge access",
      "latitude": 43.34508,
      "longitude": -91.843
    },
    "logistics": {
      "distanceLabel": "About 18.2 mi",
      "estimatedPaddleTime": "About 6.5 hr to 10 hr; plan a full day and add time for low water, bluffs, or access stops",
      "shuttle": "Stage Malanaphy Springs / Bluffton Road first, then run the longer shuttle to Cattle Creek Road / Daley Bridge. Confirm the Bluffton Fir Stand and Malanaphy landings before committing because both can be limited or crowded.",
      "permits": "No route-specific paddling permit is known. Iowa registration rules can apply to longer boats; follow posted county-road, park, and private-land rules.",
      "camping": "Treat this as a day route. Nearby private campgrounds and liveries can support a separate base-camp plan, but no public watercraft campsite is assumed on this short split.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Cattle Creek Road / Daley Bridge and take out at Malanaphy Springs, with Chimney Rock Park and Bluffton Fir Stand as named intermediate access and bailout points. This family card replaces three overlapping short cards.",
      "accessCaveats": [
        "Cattle Creek access conditions have changed over time; confirm parking, bank condition, and posted signs before unloading.",
        "Chimney Rock and Bluffton Fir Stand are useful intermediate access points, but nearby private campground or livery launches are not automatically public.",
        "Malanaphy Springs has limited parking and landing space. Inspect the take-out and keep a fallback shuttle plan before launch.",
        "Use the Bluffton corridor guidance conservatively: about 150 cfs is scrape-prone, 200 to 500 cfs is the broad target, and 700+ cfs is too pushy for a normal recreational recommendation. Pair the gauge with same-day visual checks and local guidance."
      ],
      "watchFor": [
        "Scraping and dragging in riffles near or below 150 cfs at the Bluffton gauge.",
        "Storm wood, strainers, bridge approaches, shallow rock, and faster current on rising water.",
        "Cold spring inflows, private banks, long-route fatigue, and limited clean bailouts between the named access points."
      ]
    },
    "accessPoints": [
      {
        "id": "cattle-creek-road-daley-bridge",
        "name": "Cattle Creek Road / Daley Bridge canoe access area",
        "latitude": 43.4149,
        "longitude": -91.95874,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the consolidated family route."
      },
      {
        "id": "chimney-rock-park-access",
        "name": "Chimney Rock Road bridge / Chimney Rock Park access",
        "latitude": 43.42156,
        "longitude": -91.93467,
        "mileFromStart": 4.5,
        "segmentKind": "creek",
        "note": "Intermediate access or bailout after the first scenic bluff reach."
      },
      {
        "id": "bluffton-fir-stand-access",
        "name": "Bluffton Fir Stand Access / Bluffton Road-W20 canoe ramp",
        "latitude": 43.3996,
        "longitude": -91.8884,
        "mileFromStart": 9.8,
        "segmentKind": "creek",
        "note": "Intermediate public access before the downstream spring corridor."
      },
      {
        "id": "malanaphy-springs-access",
        "name": "Malanaphy Springs / Bluffton Road bridge access",
        "latitude": 43.34508,
        "longitude": -91.843,
        "mileFromStart": 18.2,
        "segmentKind": "creek",
        "note": "Default take-out; inspect parking and landing conditions before launch."
      }
    ]
  }
};
