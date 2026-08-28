// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const coloradoRiverTripDetails: Record<string, RiverTripDetails> = {
  "arkansas-river-parkdale-royal-gorge": {
    "putIn": { "id": "arkansas-royal-gorge-parkdale-put-in", "name": "Parkdale Recreation Site public access", "latitude": 38.48648, "longitude": -105.39004 },
    "takeOut": { "id": "arkansas-royal-gorge-centennial-take-out", "name": "Centennial Park Cañon City take-out", "latitude": 38.4368403, "longitude": -105.2405462 },
    "logistics": {
      "distanceLabel": "Approximately 10.3 river miles",
      "estimatedPaddleTime": "Plan a full daylight window for continuous Class IV–V scouting, rescue readiness, breaks, and shuttle timing.",
      "shuttle": "Stage the Centennial Park take-out, then shuttle to Parkdale via US Highway 50. Confirm current parking, fees, closures, and road conditions before launch.",
      "permits": "Follow current AHRA/CPW access rules, posted fees, closures, fire restrictions, and any commercial-use restrictions.",
      "camping": "No endpoint camping is assumed. Use only separately confirmed lawful AHRA/BLM or private lodging options; do not camp on unmarked riverbank land.",
      "campingClassification": "none",
      "summary": "An advanced public Royal Gorge reach with direct Parkdale telemetry, named CPW and city access, a standard Centennial Park take-out, and conservative flow guidance.",
      "accessCaveats": ["Use Parkdale Recreation Site and the named Centennial Park river access only; do not substitute private-bank pullouts.", "Centennial Park is a public city facility with river access, but verify current hours, parking, closures, and river-user rules.", "The route must end at Centennial Park before the separate Cañon City Town Run; treat the 400–3,200 cfs values as planning guidance only."],
      "watchFor": ["USGS 07094500 below 400 cfs, above 3,200 cfs, rapidly rising, unavailable, or inconsistent with visual conditions", "Class IV–V rapids, railroad and bridge hazards, strainers, cold water, debris, limited recovery, and failure to run the full reach", "AHRA/CPW closures, fees, fire restrictions, public-access changes, and Centennial Park hours or river-use restrictions"]
    },
    "accessPoints": [
      { "id": "arkansas-royal-gorge-parkdale-put-in", "name": "Parkdale Recreation Site public access", "latitude": 38.48648, "longitude": -105.39004, "mileFromStart": 0, "segmentKind": "transition", "note": "American Whitewater identifies Parkdale as the public put-in for the Royal Gorge reach; CPW manages the AHRA access site." },
      { "id": "arkansas-royal-gorge-centennial-take-out", "name": "Centennial Park Cañon City take-out", "latitude": 38.4368403, "longitude": -105.2405462, "mileFromStart": 10.3, "segmentKind": "transition", "note": "American Whitewater identifies Centennial Park as the standard river-right take-out. OpenStreetMap maps a canoe access link within the city park; verify the marked ramp and current river-user rules on site." }
    ]
  },
  "arkansas-river-browns-canyon-fishermans-stone": {
    "putIn": { "id": "arkansas-browns-canyon-fishermans-put-in", "name": "Fisherman's Bridge AHRA access", "latitude": 38.767306, "longitude": -106.094928 },
    "takeOut": { "id": "arkansas-browns-canyon-stone-bridge-take-out", "name": "Stone Bridge Recreation Site boat launch", "latitude": 38.611481, "longitude": -106.063342 },
    "logistics": {
      "distanceLabel": "Approximately 13.3 river miles",
      "estimatedPaddleTime": "Plan a full daylight window for continuous Class III scouting, breaks, cold-water preparation, and shuttle timing.",
      "shuttle": "Stage the Stone Bridge take-out, then shuttle to Fisherman's Bridge via the AHRA/US-285 corridor. Confirm current road, parking, fee, and closure conditions before launch.",
      "permits": "Follow current AHRA and BLM rules, posted site fees, access requirements, closures, and commercial/event restrictions.",
      "camping": "Designated camping is available at Ruby Mountain and Hecla Junction along the Browns Canyon corridor; reserve or confirm a lawful site separately.",
      "campingClassification": "on_route_campsite",
      "summary": "An advanced public Browns Canyon whitewater reach with direct 07091200 telemetry, designated AHRA access, station-referenced flow guidance, and optional designated camping.",
      "accessCaveats": ["Use the named Fisherman's Bridge access and Stone Bridge Recreation Site launch only; do not improvise private-bank landings.", "Confirm AHRA fees, parking, road, fire restrictions, and seasonal closures before launch.", "The 300–5,000 cfs band is planning guidance only; require current scouting, trend, weather, debris, and skill judgment."],
      "watchFor": ["USGS 07091200 below 300 cfs, above 5,000 cfs, rapidly rising, unavailable, or inconsistent with local conditions", "Pinball, Zoom Flume, Big Drop, Staircase, Widowmaker, Seidel’s Suckhole, strainers, cold water, and bridge/railroad hazards", "AHRA/BLM closure or fee changes, fire restrictions, road conditions, commercial traffic, and failure to exit at Stone Bridge"]
    },
    "accessPoints": [
      { "id": "arkansas-browns-canyon-fishermans-put-in", "name": "Fisherman's Bridge AHRA access", "latitude": 38.767306, "longitude": -106.094928, "mileFromStart": 0, "segmentKind": "transition", "note": "AHRA/river guides identify Fisherman's Bridge off CR 301 as the public start of the Browns Canyon reach." },
      { "id": "arkansas-browns-canyon-stone-bridge-take-out", "name": "Stone Bridge Recreation Site boat launch", "latitude": 38.611481, "longitude": -106.063342, "mileFromStart": 13.3, "segmentKind": "transition", "note": "AHRA/BLM identify Stone Bridge as the public Browns Canyon take-out and boat launch; exit before the separate Salida reach." }
    ]
  },
  "upper-colorado-pumphouse-state-bridge": {
    "putIn": {
      "id": "upper-colorado-pumphouse-put-in",
      "name": "BLM Pumphouse Recreation Area Boat Ramp",
      "latitude": 39.98727778,
      "longitude": -106.50846667
    },
    "takeOut": {
      "id": "upper-colorado-state-bridge-take-out",
      "name": "BLM State Bridge Recreation Site boat launch",
      "latitude": 39.856779,
      "longitude": -106.648539
    },
    "logistics": {
      "distanceLabel": "Approximately 15 river miles",
      "estimatedPaddleTime": "Variable; plan a full daylight window for Class III scouting, breaks, changing flow, and shuttle timing.",
      "shuttle": "Stage the take-out at State Bridge, then drive Trough Road / Colorado River Headwaters Scenic Byway to Pumphouse. Confirm road, parking, fee, access, and commercial-use conditions before launch.",
      "permits": "BLM day-use fees apply at Pumphouse and State Bridge. Follow current federal recreation-site rules, posted access requirements, and any commercial/private-boater restrictions.",
      "camping": "Designated camping is available at Pumphouse only; State Bridge is day use only. Camping is not assumed as part of the route; reserve or confirm a lawful BLM campsite separately and never camp outside designated sites.",
      "campingClassification": "endpoint_campground",
      "summary": "A guarded public BLM-to-BLM Upper Colorado reach with a 900 cfs minimum-only check at USGS 09058000, Class III hazards, designated Pumphouse camping, and a day-use State Bridge take-out.",
      "accessCaveats": [
        "Use only the BLM Pumphouse and State Bridge sites as endpoints. Do not substitute private Rancho Del Rio access or an unmarked riverbank.",
        "Pumphouse has multiple ramps and heavy use; State Bridge has paved and small-craft launches. Confirm the suitable launch and parking conditions on the day of travel.",
        "Pumphouse camping requires reservation/fee compliance, while State Bridge is day-use only. Keep camping and shuttle plans separate from the river-access decision.",
        "The 900 cfs value is a conservative low-acceptable planning floor, not a runnable guarantee or upper limit. Keep the route unavailable below that threshold and require current scouting and rescue readiness."
      ],
      "watchFor": [
        "USGS 09058000 below 900 cfs, rapidly rising, unavailable, or inconsistent with the local river visual",
        "Eye of the Needle, Red Gorge, Yarmony, Boneyard, strainers, cold water, and State Bridge remnants",
        "Commercial traffic, limited cell service, fee/parking or road closures, private-bank temptation, and a failed daylight or rescue plan"
      ]
    },
    "accessPoints": [
      {
        "id": "upper-colorado-pumphouse-put-in",
        "name": "BLM Pumphouse Recreation Area Boat Ramp",
        "latitude": 39.98727778,
        "longitude": -106.50846667,
        "mileFromStart": 0,
        "segmentKind": "transition",
        "note": "BLM documents three boat-ramp sites, restrooms, parking, fees, heavy use, and designated camping at Pumphouse."
      },
      {
        "id": "upper-colorado-state-bridge-take-out",
        "name": "BLM State Bridge Recreation Site boat launch",
        "latitude": 39.856779,
        "longitude": -106.648539,
        "mileFromStart": 15,
        "segmentKind": "transition",
        "note": "BLM documents paved and unpaved small-craft launches, toilets, parking, a federal fee, and day-use-only status at State Bridge."
      }
    ]
  },
  "lower-colorado-two-rivers-south-canyon": {
    "putIn": {
      "id": "lower-colorado-two-rivers-put-in",
      "name": "Two Rivers Park Colorado River boat ramp",
      "latitude": 39.551094,
      "longitude": -107.333683
    },
    "takeOut": {
      "id": "lower-colorado-south-canyon-take-out",
      "name": "BLM South Canyon River Access boat ramp",
      "latitude": 39.56517,
      "longitude": -107.41627
    },
    "logistics": {
      "distanceLabel": "Approximately 5 river miles",
      "estimatedPaddleTime": "Variable; plan a full daylight window for Class II+/III scouting, breaks, changing flow, and shuttle timing.",
      "shuttle": "Stage the take-out at BLM South Canyon, then drive I-70 east to Two Rivers Park. Confirm road, parking, ramp, and seasonal-access conditions before launch.",
      "permits": "Private boaters may use the city-operated Two Rivers ramp; commercial river users must obtain the City of Glenwood Springs boat-ramp permit. Follow posted BLM rules at South Canyon.",
      "camping": "Neither endpoint allows overnight camping. Use a separate lawful Glenwood Springs-area campground or lodging reservation; do not camp on riverbanks.",
      "campingClassification": "none",
      "summary": "A public city-to-BLM lower Colorado reach with a 1,000 cfs minimum-only check at USGS 09085100, Class II+/III hazards, seasonal South Canyon access, no endpoint camping, and a short I-70 shuttle.",
      "accessCaveats": [
        "Use only the City of Glenwood Springs Two Rivers concrete ramp and the BLM South Canyon ramp as endpoints.",
        "Two Rivers is a high-use city park: follow 6 a.m.–10 p.m. hours, 30-minute ramp parking, no overnight parking/camping, and current commercial-permit rules.",
        "South Canyon is closed November 15 through May 15 and is 4WD-recommended; park in the upper parking area as BLM directs.",
        "The 1,000 cfs value is a conservative low-acceptable planning floor, not a runnable guarantee or upper limit. Require current scouting and rescue readiness."
      ],
      "watchFor": [
        "USGS 09085100 below 1,000 cfs, rapidly rising, unavailable, or inconsistent with the local river visual",
        "Glenwood whitewater-park features, bridge columns, South Canyon Rapid, bridge pylons, cold water, wood/debris, and strong current",
        "South Canyon seasonal closure, 4WD road conditions, city ramp parking/permit rules, commercial traffic, and a failed daylight or rescue plan"
      ]
    },
    "accessPoints": [
      {
        "id": "lower-colorado-two-rivers-put-in",
        "name": "Two Rivers Park Colorado River boat ramp",
        "latitude": 39.551094,
        "longitude": -107.333683,
        "mileFromStart": 0,
        "segmentKind": "transition",
        "note": "Glenwood Springs documents this city-operated concrete ramp at the Colorado/Roaring Fork confluence with parking, restrooms, and river access."
      },
      {
        "id": "lower-colorado-south-canyon-take-out",
        "name": "BLM South Canyon River Access boat ramp",
        "latitude": 39.56517,
        "longitude": -107.41627,
        "mileFromStart": 5,
        "segmentKind": "transition",
        "note": "BLM documents a concrete boat ramp, ample parking, restroom, no camping, and November 15–May 15 seasonal closure; 4WD is recommended for the access road."
      }
    ]
  },
  "arkansas-river-pueblo-whitewater-park": {
    "putIn": { "id": "arkansas-pueblo-whitewater-pillars-put-in", "name": "Pillar Park / Chapa Place public access", "latitude": 38.26684492803721, "longitude": -104.62262304680479 },
    "takeOut": { "id": "arkansas-pueblo-whitewater-union-take-out", "name": "Union Avenue Bridge river exit", "latitude": 38.261366, "longitude": -104.617241 },
    "logistics": {
      "distanceLabel": "Approximately 0.5 river miles",
      "estimatedPaddleTime": "Allow a daylight window for parking, feature inspection, scouting, repeated laps, and a conservative exit at Union Avenue.",
      "shuttle": "No vehicle shuttle is required. Use lawful downtown parking and the established river trail to walk between the Union Avenue exit and Pillar Park access.",
      "permits": "Follow current City of Pueblo park rules, posted restrictions, event closures, parking rules, and Colorado boating/PFD requirements.",
      "camping": "No endpoint camping is established. Use separate lawful lodging or a designated campground; do not camp in Pillar Park, the whitewater park, or along the levee.",
      "campingClassification": "none",
      "summary": "A short public downtown whitewater park with direct Moffat Street telemetry, named city access, no endpoint camping, and a mandatory Union Avenue exit.",
      "accessCaveats": ["Use Pillar Park via Chapa Place/Pearl Street and exit immediately upstream of Union Avenue as documented by the City and American Whitewater.", "Confirm current parking, construction, events, water-use restrictions, and any temporary river closure before entering.", "Do not continue below Union Avenue or use private-bank access; this route ends at the named public city exit."],
      "watchFor": ["USGS 07099970 below 300 cfs, above 5,700 cfs, rapidly rising, unavailable, or inconsistent with the feature inspection", "powerful eddies, engineered drops, rocks, cold water, swimmers, crowding, debris, and changing dam-release conditions", "city/county restrictions, event closures, parking changes, and failure to exit at Union Avenue"]
    },
    "accessPoints": [
      { "id": "arkansas-pueblo-whitewater-pillars-put-in", "name": "Pillar Park / Chapa Place public access", "latitude": 38.26684492803721, "longitude": -104.62262304680479, "mileFromStart": 0, "segmentKind": "transition", "note": "City of Pueblo identifies Pillar Park via Chapa Place and Pearl Street as the main public access to the Whitewater Park." },
      { "id": "arkansas-pueblo-whitewater-union-take-out", "name": "Union Avenue Bridge river exit", "latitude": 38.261366, "longitude": -104.617241, "mileFromStart": 0.5, "segmentKind": "transition", "note": "The City and American Whitewater identify Union Avenue as the take-out; walk the established trail back upstream and do not continue below the bridge." }
    ]
  }
  ,"upper-clear-creek-kermits-county-line": {
    "putIn": {
      "id": "upper-clear-creek-kermits-put-in",
      "name": "CDOT Kermit's Access",
      "latitude": 39.7465013417319,
      "longitude": -105.436538876718
    },
    "takeOut": {
      "id": "upper-clear-creek-county-line-take-out",
      "name": "Clear Creek County Line / Highway 119 Access",
      "latitude": 39.7460434638573,
      "longitude": -105.39815197355
    },
    "logistics": {
      "distanceLabel": "Approximately 5.4 river miles",
      "estimatedPaddleTime": "Variable; plan a full daylight window for continuous Class IV scouting, rescue setup, breaks, and shuttle timing.",
      "shuttle": "Stage the take-out at County Line / Highway 119, then shuttle west along US 6/I-70 frontage roads to Kermit's Access. Confirm road, parking, construction, and access conditions before leaving the vehicle.",
      "permits": "The county map identifies Kermit's under CDOT and County Line under county access. Follow current CDOT and Clear Creek County parking, construction, and boating rules; do not trespass at commercial/private rafting accesses.",
      "camping": "No endpoint camping is established by the cited access sources. Use a separate lawful campground or lodging reservation and never camp at the access pullouts or on private banks.",
      "campingClassification": "none",
      "summary": "An expert-only CDOT-to-county Clear Creek whitewater reach with a station-linked 200–1,000 cfs planning range, cold-water hazards, and roadside access that must be rechecked before every run.",
      "accessCaveats": [
        "Use only the mapped CDOT Kermit's boating access and Clear Creek County Line access. Do not substitute Clear Creek Outpost, Mile Hi, or other private/commercial access points.",
        "The county GIS coordinates are map-derived access-point centroids, not survey monuments. Verify the physical launch/take-out, parking, construction, and any seasonal restrictions on site.",
        "The USGS station is at Lawson, upstream from Kermit's; use the station-linked guidance as a flow reference, not as a guarantee that conditions at every rapid are equivalent."
      ],
      "watchFor": [
        "USGS 06716500 below 200 cfs, above 1,000 cfs, rapidly rising, unavailable, or inconsistent with the local river visual",
        "Beaver One, Beaver Two, continuous Class IV rapids, cold snowmelt, strainers, bridge/roadside hazards, and limited recovery options",
        "CDOT construction or parking changes at Kermit's, county access changes at County Line, private-bank temptation, and a failed expert/rescue plan"
      ]
    },
    "accessPoints": [
      {
        "id": "upper-clear-creek-kermits-put-in",
        "name": "CDOT Kermit's Access",
        "latitude": 39.7465013417319,
        "longitude": -105.436538876718,
        "mileFromStart": 0,
        "segmentKind": "transition",
        "note": "Clear Creek County's GIS access layer locates Kermit's Access and the county access map identifies it as a boating access under CDOT. Confirm current parking and construction conditions before launch."
      },
      {
        "id": "upper-clear-creek-county-line-take-out",
        "name": "Clear Creek County Line / Highway 119 Access",
        "latitude": 39.7460434638573,
        "longitude": -105.39815197355,
        "mileFromStart": 5.4,
        "segmentKind": "transition",
        "note": "Clear Creek County GIS locates County Line Access at the Highway 119 end of the named reach. Verify the physical take-out and current parking conditions on site."
      }
    ]
  },
  "clear-creek-golden-whitewater-park": {
    "putIn": {
      "id": "clear-creek-golden-whitewater-put-in",
      "name": "Golden Whitewater Park / Lions Park access",
      "latitude": 39.7549101,
      "longitude": -105.2293095
    },
    "takeOut": {
      "id": "clear-creek-golden-vanover-take-out",
      "name": "Vanover Park mandatory creek exit",
      "latitude": 39.7582138,
      "longitude": -105.2199586
    },
    "logistics": {
      "distanceLabel": "Approximately 0.56 river miles",
      "estimatedPaddleTime": "Short park-and-play reach; allow a daylight window for parking, feature inspection, cold-water preparation, and lawful laps only when safe.",
      "shuttle": "No vehicle shuttle is needed. Leave the vehicle in lawful public parking and walk the designated corridor.",
      "permits": "Follow City of Golden park rules, posted access hours, event closures, parking restrictions, and temporary construction or water-safety notices.",
      "camping": "No endpoint camping is established. Use separate lawful lodging or a designated campground; do not camp in Lions Park, Vanover Park, or along the creek corridor.",
      "campingClassification": "none",
      "summary": "A short public urban whitewater course with no endpoint camping, designated Golden access, and a mandatory Vanover exit before downstream diversion structures.",
      "accessCaveats": [
        "Use the Golden Whitewater Park/Lions Park access and exit at Vanover Park as documented public areas; do not substitute private banks or downstream diversion access.",
        "Confirm current parking, events, construction, and access signage on the day of travel.",
        "Vanover is a mandatory take-out before diversion structures. Continuing downstream is outside this route."
      ],
      "watchFor": [
        "USGS 06719505 below 70 cfs, above 300 cfs, rapidly rising, unavailable, or inconsistent with the local visual check",
        "Engineered features, cold water, debris, swimmers, crowding, and fast changes after storms or snowmelt",
        "Park/event closures, parking restrictions, construction, and failure to exit at Vanover"
      ]
    },
    "accessPoints": [
      {
        "id": "clear-creek-golden-whitewater-put-in",
        "name": "Golden Whitewater Park / Lions Park access",
        "latitude": 39.7549101,
        "longitude": -105.2293095,
        "mileFromStart": 0,
        "segmentKind": "transition",
        "note": "City and Colorado course-evaluation sources identify the Golden Whitewater Park beside Lions Park as the public park course access. Confirm the marked launch and current signs on site."
      },
      {
        "id": "clear-creek-golden-vanover-take-out",
        "name": "Vanover Park mandatory creek exit",
        "latitude": 39.7582138,
        "longitude": -105.2199586,
        "mileFromStart": 0.56,
        "segmentKind": "transition",
        "note": "City and Clear Creek Corridor materials identify Vanover Park as the creek exit before downstream diversion structures. Exit here; do not continue downstream."
      }
    ]
  },
  "cache-la-poudre-fort-collins-shields-legacy": {
    "putIn": {
      "id": "cache-la-poudre-fort-collins-shields-put-in",
      "name": "Shields Street River Access",
      "latitude": 40.6032575,
      "longitude": -105.0956363
    },
    "takeOut": {
      "id": "cache-la-poudre-fort-collins-legacy-take-out",
      "name": "Legacy Park Bridge take-out",
      "latitude": 40.5993032,
      "longitude": -105.080687
    },
    "logistics": {
      "distanceLabel": "Approximately 1.0–1.4 river miles",
      "estimatedPaddleTime": "Allow 1–2 hours for a short moving-water reach, inspection, breaks, and a conservative exit before downstream hazards.",
      "shuttle": "No vehicle shuttle is required. Use lawful city parking and designated public paths for any walking or bike shuttle.",
      "permits": "Follow current Fort Collins park hours, parking rules, closures, and posted river notices.",
      "camping": "No endpoint camping is established. Use separate lawful lodging or a designated campground; do not camp in the city parks or on riverbanks.",
      "campingClassification": "none",
      "summary": "A public city-access Class II reach with no endpoint camping and a mandatory Legacy Park Bridge exit before downstream diversion hazards.",
      "accessCaveats": [
        "Use only the named Shields Street public river access and Legacy Park Bridge/Legacy Park exit. Confirm the marked water entry and exit on site.",
        "Confirm current hours, parking, construction, and temporary closures before launching.",
        "Legacy Park is the end of this route. Lake Canal Dam and downstream low-head dams are outside the route and must not be approached."
      ],
      "watchFor": [
        "USGS 06752260 below approximately 50 cfs, rapidly rising, unavailable, or inconsistent with the local visual check",
        "cold water, debris, engineered features, low-head dams, swimmers, and urban obstructions",
        "city closures, parking changes, thunderstorms, and failure to exit at Legacy Park Bridge"
      ]
    },
    "accessPoints": [
      {
        "id": "cache-la-poudre-fort-collins-shields-put-in",
        "name": "Shields Street River Access",
        "latitude": 40.6032575,
        "longitude": -105.0956363,
        "mileFromStart": 0,
        "segmentKind": "transition",
        "note": "City of Fort Collins identifies this public natural-area access for kayak, canoe, and tube use. Confirm the marked launch and current signs."
      },
      {
        "id": "cache-la-poudre-fort-collins-legacy-take-out",
        "name": "Legacy Park Bridge take-out",
        "latitude": 40.5993032,
        "longitude": -105.080687,
        "mileFromStart": 1.2,
        "segmentKind": "transition",
        "note": "Legacy Park Bridge is the documented exit before Lake Canal Dam and downstream low-head dams. Exit here; do not continue downstream."
      }
    ]
  },
  "arkansas-river-granite-boat-chute-buena-vista": {
    "putIn": { "id": "arkansas-granite-boat-chute-put-in", "name": "Granite Boat Chute AHRA river access", "latitude": 39.025903, "longitude": -106.244336 },
    "takeOut": { "id": "arkansas-buena-vista-whitewater-park-take-out", "name": "Buena Vista Whitewater Park public boat ramp", "latitude": 38.842, "longitude": -106.131 },
    "logistics": {
      "distanceLabel": "Approximately 18 river miles; verify the selected AHRA segment distance against the current park map",
      "estimatedPaddleTime": "Plan a full daylight window with scouting, portage time, breaks, and shuttle timing; no fixed trip time is promised.",
      "shuttle": "Use a legal vehicle shuttle between Granite Boat Chute and Buena Vista Whitewater Park. Confirm current parking, road, fee, closures, and boat-ramp conditions before staging.",
      "permits": "Follow current AHRA and Colorado Parks and Wildlife rules, posted site requirements, fees, and any commercial or event restrictions.",
      "camping": "AHRA documents camping at selected access sites including Railroad Bridge; reserve or confirm a lawful site separately and do not treat dispersed or private-bank camping as available.",
      "campingClassification": "on_route_campsite",
      "summary": "Advanced Class III-V whitewater corridor with managed public access, CPW station-tied flow advisories, optional AHRA camping, and a required portage/scouting plan.",
      "accessCaveats": ["Use only the named AHRA Granite Boat Chute and Buena Vista Whitewater Park accesses.","Granite Boat Chute includes a diversion structure, spillway, boat chute, and portage trail; follow posted directions.","Camping requires current reservation or site compliance and is not a substitute for endpoint access."],
      "watchFor": ["USGS 07087050 below 900 cfs, above CPW advisories, rapidly rising, unavailable, or inconsistent with local conditions.","Pine Creek Class V-VI, Numbers and Fractions, diversion structures, strainers, cold water, and changing hydraulics.","Road, fee, parking, fire-restriction, access, and daylight changes."]
    },
    "accessPoints": [
      { "id": "arkansas-granite-boat-chute-put-in", "name": "Granite Boat Chute AHRA river access", "latitude": 39.025903, "longitude": -106.244336, "mileFromStart": 0, "segmentKind": "transition", "note": "CPW lists Granite Boat Chute as a public AHRA river-access site with a boat ramp/slide and portage trail." },
      { "id": "arkansas-buena-vista-whitewater-park-take-out", "name": "Buena Vista Whitewater Park public boat ramp", "latitude": 38.842, "longitude": -106.131, "mileFromStart": 18, "segmentKind": "transition", "note": "CPW lists Buena Vista Whitewater Park as a public river-access site managed by the Town of Buena Vista." }
    ]
  }
};
