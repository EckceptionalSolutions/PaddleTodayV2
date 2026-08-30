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
  "upper-colorado-state-bridge-catamount": {
    "putIn": { "id": "upper-colorado-state-bridge-put-in", "name": "BLM State Bridge Recreation Site boat launch", "latitude": 39.85743, "longitude": -106.64848 },
    "takeOut": { "id": "upper-colorado-catamount-take-out", "name": "BLM Catamount Bridge Boat Launch", "latitude": 39.89047, "longitude": -106.83205 },
    "logistics": {
      "distanceLabel": "Approximately 16 river miles",
      "estimatedPaddleTime": "Plan 6–7 hours in a full daylight window, allowing for moving-water scouting, breaks, changing flow, and shuttle timing.",
      "shuttle": "Stage the Catamount take-out, then drive Colorado River Road / Trough Road to State Bridge. Confirm road, parking, ramp, and seasonal congestion before launch.",
      "permits": "Follow current BLM recreation-site rules, posted parking and access requirements, fees if posted, and any commercial-use restrictions. Catamount parking may be unavailable during high day-use periods.",
      "camping": "Designated Catamount endpoint camping is available at the take-out area; confirm current availability and rules. Do not infer dispersed or private-bank camping along the reach.",
      "campingClassification": "endpoint_campground",
      "summary": "A public BLM-to-BLM Upper Colorado reach with direct Catamount telemetry, a conservative 700–9,000 cfs planning band, Class II/II+ moving water, designated Catamount camping, and a mandatory Catamount take-out before the harder downstream reach.",
      "accessCaveats": ["Use only State Bridge Recreation Site and Catamount Bridge Boat Launch as endpoints; do not substitute private ranch, commercial, or unmarked riverbank access.", "State Bridge has paved and small-craft launches; Catamount has a concrete ramp but limited parking during the May–September day-use season. Confirm suitable launch and parking conditions on the day of travel.", "Catamount camping is designated-site camping; confirm availability and current BLM limits before relying on it."],
      "watchFor": ["USGS 09060799 below 700 cfs, above 9,000 cfs, rapidly rising, unavailable, or inconsistent with local conditions", "moving current, cold water, strainers/wood, bridge and commercial-traffic hazards, and failure to stop at Catamount", "Catamount parking saturation, road/access changes, weather or debris, private-bank temptation, and camping-rule violations"]
    },
    "accessPoints": [
      { "id": "upper-colorado-state-bridge-put-in", "name": "BLM State Bridge Recreation Site boat launch", "latitude": 39.85743, "longitude": -106.64848, "mileFromStart": 0, "segmentKind": "transition", "note": "BLM identifies State Bridge as a public river-access site with paved and small-craft launches." },
      { "id": "upper-colorado-catamount-take-out", "name": "BLM Catamount Bridge Boat Launch", "latitude": 39.89047, "longitude": -106.83205, "mileFromStart": 16, "segmentKind": "transition", "note": "BLM documents a concrete boat ramp, vault toilets, and designated campsites at Catamount; exit before the separate downstream reach." }
    ]
  },
  "eagle-river-camp-hale-red-cliff": {
    "putIn": { "id": "eagle-river-camp-hale-put-in", "name": "Camp Hale historical-site access / 100-yard carry to river", "latitude": 39.466812, "longitude": -106.33931 },
    "takeOut": { "id": "eagle-river-red-cliff-take-out", "name": "Red Cliff / Gilman Gorge put-in access at Homestake confluence", "latitude": 39.507498, "longitude": -106.378315 },
    "logistics": {
      "distanceLabel": "Approximately 4.7 river miles",
      "estimatedPaddleTime": "Plan a full daylight window for Class IV(V) scouting, the 100-yard boat carry, waterfall scouting, rescue readiness, breaks, and shuttle timing.",
      "shuttle": "Stage the Red Cliff/Gilman take-out, then drive south on US Highway 24 to the Camp Hale historical-site access. Confirm the current road, parking, carry, and seasonal conditions before leaving the shuttle vehicle.",
      "permits": "Follow current White River National Forest and Camp Hale–Continental Divide National Monument access rules, posted closures, fire restrictions, parking limits, and private-property boundaries.",
      "camping": "Camp Hale Memorial Campground provides designated Forest Service camping near the put-in; confirm reservations, road opening, fire restrictions, and water availability. No riverbank or take-out camping is implied.",
      "campingClassification": "endpoint_campground",
      "summary": "An expert-only public Camp Hale-to-Red Cliff reach with direct USGS 09063000 telemetry, conservative 200–1,000 cfs planning bounds, designated Camp Hale camping nearby, a documented historical-site carry, and a mandatory Red Cliff take-out before Gilman Gorge.",
      "accessCaveats": ["The original Camp Hale put-in is no longer available according to American Whitewater; use the historical-site parking and approximately 100-yard carry only after confirming current Forest Service/monument access and conditions.", "Use the Red Cliff/Gilman put-in access as the take-out and do not continue into the separate Gilman Gorge reach. Do not substitute private mine, ranch, railroad, or unmarked riverbank access.", "Camp Hale Memorial is designated camping near the put-in, not a claim that the boat access itself is a campground or that a site will be available. Confirm the reservation and seasonal road conditions.", "The 200–1,000 cfs band and inferred 300–700 cfs preferred window are planning references only; require expert judgment and current visual scouting."],
      "watchFor": ["USGS 09063000 below 200 cfs, above 1,000 cfs, rapidly rising, unavailable, or inconsistent with the local river visual", "beaver dams, wood/strainers, no-eddy micro-creeking, twin waterfalls, shallow landings, cold water, and limited recovery", "Camp Hale road or parking closures, monument/Forest Service rules, private-property temptation, fire restrictions, and failure to exit before Gilman Gorge"]
    },
    "accessPoints": [
      { "id": "eagle-river-camp-hale-put-in", "name": "Camp Hale historical-site access / 100-yard carry to river", "latitude": 39.466812, "longitude": -106.33931, "mileFromStart": 0, "segmentKind": "transition", "note": "American Whitewater publishes this Camp Hale access coordinate and says the original put-in is unavailable; park at the historical site and walk approximately 100 yards to the river after verifying current public access and conditions." },
      { "id": "eagle-river-red-cliff-take-out", "name": "Red Cliff / Gilman Gorge put-in access at Homestake confluence", "latitude": 39.507498, "longitude": -106.378315, "mileFromStart": 4.7, "segmentKind": "transition", "note": "American Whitewater publishes this as the Camp Hale-to-Red Cliff take-out and the put-in for the separate Gilman Gorge reach. Exit here and do not continue downstream without a separate expert plan." }
    ]
  },
  "homestake-creek-gold-park": {
    "putIn": { "id": "homestake-creek-gold-park-put-in", "name": "Homestake Creek roadside access near Eagle River confluence", "latitude": 39.5069999694824, "longitude": -106.378997802734 },
    "takeOut": { "id": "homestake-creek-gold-park-take-out", "name": "Homestake Creek roadside access 1/4 mile above Eagle River confluence", "latitude": 39.5009994506836, "longitude": -106.375999450684 },
    "logistics": {
      "distanceLabel": "Approximately 0.51 river miles",
      "estimatedPaddleTime": "Plan a full daylight window for Class V scouting, rescue readiness, photo/scouting pauses, and a careful shuttle; the short reach is not a short-commitment run.",
      "shuttle": "Stage the documented lower Homestake Creek access, then use the public Highway 24 corridor to reach the upper access. Confirm safe pull-offs, parking, road conditions, and current restrictions before unloading or walking the bank.",
      "permits": "Follow current White River National Forest, Eagle County, and transportation rules, posted closures, fire restrictions, parking limits, and private-property boundaries. Use only the documented public roadside access context after current verification.",
      "camping": "Gold Park Campground provides designated Forest Service camping along Homestake Creek near the direct gauge and upstream valley access. Confirm a lawful site separately; no on-route or riverbank camping is implied.",
      "campingClassification": "nearby_basecamp",
      "summary": "A short but consequential Class V Homestake Creek steep-creek run with direct USGS 09064000 telemetry, conservative 60–200 cfs planning bounds, documented Highway 24 roadside access, and nearby designated Gold Park camping.",
      "accessCaveats": ["American Whitewater describes roadside access along Highway 24 and a dirt road to the Eagle River confluence, but roadside access is not permission to stop or unload anywhere. Confirm legal pull-offs, shoulder safety, current road work, and land boundaries before travel.", "Use the exact AWA put-in and take-out coordinates as planning references only; verify the physical bank, current access, and a safe exit on site.", "Gold Park Campground is nearby basecamp context and is not an endpoint, shuttle staging guarantee, or permission to launch from a campsite. Confirm current reservation, road opening, fire restrictions, food storage order, and water availability.", "The 60–200 cfs band and inferred 80–150 cfs preferred window are planning references only; require current visual scouting and expert judgment."],
      "watchFor": ["USGS 09064000 below 60 cfs, above 200 cfs, rapidly rising, unavailable, or inconsistent with the local river visual", "Class V steep-creek drops, sharp rock, narrow channels, strainers/wood, cold water, limited recovery, and the rarely run lower section", "Highway 24 traffic, unsafe shoulders, road or campground closures, private-property boundaries, railroad corridor, fire restrictions, and accidental continuation into Gilman Gorge"]
    },
    "accessPoints": [
      { "id": "homestake-creek-gold-park-put-in", "name": "Homestake Creek roadside access near Eagle River confluence", "latitude": 39.5069999694824, "longitude": -106.378997802734, "mileFromStart": 0, "segmentKind": "transition", "note": "American Whitewater publishes this exact put-in coordinate and describes a dirt road to the Homestake Creek/Eagle River confluence. Verify current legal pull-off, shoulder, bank, and land conditions before unloading." },
      { "id": "homestake-creek-gold-park-take-out", "name": "Homestake Creek roadside access 1/4 mile above Eagle River confluence", "latitude": 39.5009994506836, "longitude": -106.375999450684, "mileFromStart": 0.25, "segmentKind": "transition", "note": "American Whitewater publishes this exact take-out coordinate at 0.25 miles. Exit before the Eagle River/Gilman Gorge corridor and confirm a safe legal bank exit on site." }
    ]
  },
  "eagle-river-minturn-town-run": {
    "putIn": { "id": "eagle-river-minturn-town-run-put-in", "name": "FR 707 / Tigiwon Road Eagle River access", "latitude": 39.554354, "longitude": -106.402845 },
    "takeOut": { "id": "eagle-river-minturn-town-run-take-out", "name": "Forest Service Visitor Center Eagle River access", "latitude": 39.605688, "longitude": -106.442242 },
    "logistics": {
      "distanceLabel": "Approximately 4.6 river miles",
      "estimatedPaddleTime": "Plan a full daylight window for Class III–IV scouting, bridge and wood assessment, rescue readiness, breaks, and shuttle timing.",
      "shuttle": "Stage the Forest Service Visitor Center take-out, then use the US Highway 24 / FR 707 corridor to reach the upper access. Confirm seasonal road opening, legal parking, shoulder safety, and current traffic conditions before unloading.",
      "permits": "Follow current White River National Forest, Minturn, Eagle County, and Colorado Parks and Wildlife access rules, posted closures, bridge restrictions, fire restrictions, and private-property boundaries. Use only the named access locations after current verification.",
      "camping": "Half Moon Campground is a separately designated Forest Service basecamp near FR 707; the Forest Service campground map lists seven sites. Confirm current road opening, site availability, seasonal wildlife restrictions, fire rules, and water conditions; no riverbank or endpoint camping is implied.",
      "campingClassification": "nearby_basecamp",
      "summary": "An experienced-paddler Eagle River town reach with direct USGS 09064600 telemetry, conservative 100–2,000 cfs planning bounds, named AWA endpoints, nearby Forest Service camping context, and a mandatory bridge/wood/access verification step.",
      "accessCaveats": ["American Whitewater publishes the exact FR 707 and Forest Service Visitor Center coordinates, while Minturn describes several public river-access points along Highway 24. Treat the coordinates as planning references and verify the physical bank, signage, parking, and land boundaries on arrival.", "FR 707/Tigiwon Road has seasonal motor-vehicle restrictions; confirm road opening and a lawful shuttle plan before relying on the upper endpoint.", "The May 2026 bridge hazard report is an active safety input: do not paddle beneath the hazardous Minturn Road bridge. Confirm a lawful portage or safe route alternative before committing; postpone if none exists.", "Half Moon Campground is nearby basecamp context only and is not permission to launch from a campsite or land on private banks. Confirm reservations or first-come rules, closures, fire restrictions, and water availability separately.", "The 100–2,000 cfs band and inferred 250–800 cfs preferred window are planning references only; require current visual scouting and experienced judgment."],
      "watchFor": ["USGS 09064600 below 100 cfs, above 2,000 cfs, rapidly rising, unavailable, or inconsistent with the local river visual", "Class III–IV current, logs/strainers, the reported hazardous Minturn Road bridge, cold water, shallow recovery, and traffic or limited landing options", "FR 707 seasonal restrictions, Forest Service or Minturn closures, private-property boundaries, fire restrictions, and accidental continuation into the separate Dowd Chute reach"]
    },
    "accessPoints": [
      { "id": "eagle-river-minturn-town-run-put-in", "name": "FR 707 / Tigiwon Road Eagle River access", "latitude": 39.554354, "longitude": -106.402845, "mileFromStart": 0, "segmentKind": "transition", "note": "American Whitewater point 112545 identifies the put-in for the FR 707-to-Forest Service Visitor Center reach. Verify seasonal FR 707 vehicle access, legal parking, bank conditions, and current public signage before unloading." },
      { "id": "eagle-river-minturn-town-run-take-out", "name": "Forest Service Visitor Center Eagle River access", "latitude": 39.605688, "longitude": -106.442242, "mileFromStart": 4.6, "segmentKind": "transition", "note": "American Whitewater point 117833 identifies the Forest Service take-out. Confirm current public river access, parking, signage, and a safe bank exit on site; do not continue into the separate Dowd Chute reach without a separate access plan." }
    ]
  },
  "eagle-river-riverbend-edwards": {
    "putIn": { "id": "eagle-river-riverbend-edwards-put-in", "name": "Riverbend Bus Stop Eagle River access", "latitude": 39.61837124, "longitude": -106.46343648 },
    "takeOut": { "id": "eagle-river-riverbend-edwards-take-out", "name": "Edwards Water Treatment Plant Eagle River take-out", "latitude": 39.654168, "longitude": -106.62650943 },
    "logistics": {
      "distanceLabel": "Approximately 9 river miles for planning (American Whitewater lists 8 miles; verified endpoints are approximately 9.0 straight-line miles apart)",
      "estimatedPaddleTime": "Plan a full daylight window for sustained Class III current, diversion and bridge scouting, breaks, cold-water preparation, rescue readiness, and shuttle timing.",
      "shuttle": "Stage the Edwards Water Treatment Plant take-out, then use the Highway 6 / I-70 corridor to reach the Riverbend Bus Stop put-in. Confirm current parking, traffic, shoulder safety, signage, and the physical bank before unloading.",
      "permits": "Follow current Eagle County, Avon, Edwards, Colorado Parks and Wildlife, and posted river-access rules. Confirm lawful public access at both named endpoints; Colorado river use does not authorize stepping onto private banks or river bottoms.",
      "camping": "Neither documented endpoint allows camping. Use separate lawful lodging or a designated campground reservation; do not camp at the bus stop, treatment plant, city park, or along unmarked riverbank land.",
      "campingClassification": "none",
      "summary": "A guarded approximately 9-mile planning reach on the Eagle River with direct USGS 09067020 telemetry, a conservative 1,000–3,000 cfs planning band, named Riverbend and Edwards access points, sustained diversion/bridge hazards, and no endpoint camping.",
      "accessCaveats": [
        "RiverBrain identifies the Riverbend Bus Stop put-in at 39.61837124,-106.46343648 and the Edwards Water Treatment Plant take-out at 39.654168,-106.62650943. Treat these as planning coordinates and verify current signage, parking, bank condition, and lawful carry/exit on site.",
        "The Town of Eagle watershed plan says access amenities vary and Colorado property law prohibits stepping onto privately owned riverbank or river bottom. Do not substitute informal handshake access, private-bank landings, or unmarked pullouts.",
        "The Edwards treatment-plant access is listed as a take-out with no ramp, camping, or water. Confirm the current public access arrangement and a safe exit before launch; postpone if the endpoint is closed or the carry route is not lawful and practical.",
        "RiverBrain lists Avon Take Out as a downstream alternative and separately marks New Park as illegal for launching. This route is bounded at the Edwards treatment-plant take-out; do not improvise an alternative endpoint.",
        "No endpoint camping is assumed. Arrange separate lawful lodging or campground use, and never treat an access point or riverbank as an overnight site."
      ],
      "watchFor": [
        "USGS 09067020 below 1,000 cfs, above 3,000 cfs, rapidly rising, unavailable, or inconsistent with the local river visual",
        "Diversion Dams 1–4, Bob and the Avon playpark, the golf-course bridge wrap/pin hazard, High School Rapid, the continuous Edwards Mile, cold water, strainers, and difficult recovery from a swim",
        "Highway 6/I-70 traffic, treatment-plant or bus-stop access changes, private-property boundaries, city/county closures, parking restrictions, and failure to exit at Edwards before the separate Lower Eagle reach"
      ]
    },
    "accessPoints": [
      { "id": "eagle-river-riverbend-edwards-put-in", "name": "Riverbend Bus Stop Eagle River access", "latitude": 39.61837124, "longitude": -106.46343648, "mileFromStart": 0, "segmentKind": "transition", "note": "RiverBrain identifies this as the Riverbend-to-Edwards put-in, with all-vehicle approach from I-70/Highway 6 but no boat ramp, water, or camping. Verify current public signage, shoulder safety, parking, bank access, and lawful carry before unloading." },
      { "id": "eagle-river-riverbend-edwards-take-out", "name": "Edwards Water Treatment Plant Eagle River take-out", "latitude": 39.654168, "longitude": -106.62650943, "mileFromStart": 9, "segmentKind": "transition", "note": "RiverBrain identifies the Edwards Water Treatment Plant as the take-out and provides the Hilcrest Drive approach. It lists no ramp, water, or camping; confirm current lawful public access, parking, bank condition, and safe exit before launch. The source run is listed as 8 miles, but the verified endpoint coordinates are approximately 9.0 straight-line miles apart, so planning uses the longer distance." }
    ]
  },
  "cross-creek-minturn": {
    "putIn": { "id": "cross-creek-minturn-put-in", "name": "Cross Creek Trailhead / above Snap", "latitude": 39.565, "longitude": -106.416 },
    "takeOut": { "id": "cross-creek-minturn-take-out", "name": "Cross Creek confluence access", "latitude": 39.5699, "longitude": -106.41 },
    "logistics": {
      "distanceLabel": "Approximately 0.68 river miles",
      "estimatedPaddleTime": "Allow a full daylight window for scouting, waterfall and granite-drop assessment, rescue readiness, portage decisions, and a confirmed carry/exit.",
      "shuttle": "No vehicle shuttle is assumed. Stage only at the documented Cross Creek Trailhead/Tigiwon Road context and verify the lawful foot/carry route from the take-out before launching; do not use informal or private-bank access.",
      "permits": "Follow current White River National Forest, Holy Cross Wilderness, Minturn, Colorado boating, posted closure, fire, parking, and seasonal road rules. Overnight wilderness stays require the current Forest Service self-registration process; no commercial use or endpoint camping is implied.",
      "camping": "Half Moon Campground is the separately designated nearby Forest Service basecamp at the top of Tigiwon Road. Confirm current road opening, availability, seasonal restrictions, fire rules, and water conditions; do not camp at the creek endpoints or on unmarked riverbank land.",
      "campingClassification": "nearby_basecamp",
      "summary": "An expert-only 0.68-mile Cross Creek Class V+ run with direct 09065100 telemetry, a 140–250 cfs station-linked correlation, Tigiwon Road trailhead context, and strict waterfall, access, carry/exit, and mandatory-takeout gates.",
      "accessCaveats": [
        "American Whitewater publishes the exact put-in and take-out coordinates but no endpoint prose. Treat the names as planning references and verify the bank, parking, signage, land boundaries, and lawful carry/exit route in person.",
        "Minturn identifies Cross Creek access from Tigiwon Road and says the road is closed to motor vehicles annually May 1 through June 21, reopening June 21 only if snow-free. Verify current road status before relying on vehicle access.",
        "The route lies in the Holy Cross Wilderness corridor. Follow current Forest Service wilderness, sanitation, overnight-registration, fire, group-size, and closure rules; a trailhead does not authorize off-trail or private-property access.",
        "Half Moon Campground is nearby basecamp context only and is not permission to camp, launch, land, or stage gear at the creek endpoints.",
        "End at the documented Cross Creek take-out before the Eagle River and do not improvise a downstream continuation or private-bank landing."
      ],
      "watchFor": [
        "USGS 09065100 below 140 cfs, above 250 cfs, rapidly rising, unavailable, or inconsistent with the local channel",
        "Snap, 90 Degree Falls, Triple Drop, Super Cross, granite constrictions, waterfalls, wood/strainers, cold water, limited recovery, and a failed rescue or carry plan",
        "Tigiwon Road seasonal closure, snow, wilderness and fire restrictions, parking/signage changes, private boundaries, and failure to exit at the documented take-out"
      ]
    },
    "accessPoints": [
      { "id": "cross-creek-minturn-put-in", "name": "Cross Creek Trailhead / above Snap", "latitude": 39.565, "longitude": -106.416, "mileFromStart": 0, "segmentKind": "creek", "note": "American Whitewater point 111833 is the exact put-in coordinate. Minturn identifies the Cross Creek Trailhead two miles up Tigiwon Road; verify the trailhead sign, parking, lawful carry to the water, and current road status before unloading." },
      { "id": "cross-creek-minturn-take-out", "name": "Cross Creek confluence access", "latitude": 39.5699, "longitude": -106.41, "mileFromStart": 0.68, "segmentKind": "transition", "note": "American Whitewater point 117105 is the exact take-out coordinate. The endpoint page provides no landing prose; confirm a safe, lawful exit and carry route before launching, and do not continue into the Eagle River reach." }
    ]
  },
  "upper-roaring-fork-weller-difficult": {
    "putIn": { "id": "upper-roaring-fork-weller-difficult-put-in", "name": "Weller Lake downstream pull-off / trailhead access", "latitude": 39.119559, "longitude": -106.722465 },
    "takeOut": { "id": "upper-roaring-fork-weller-difficult-take-out", "name": "Difficult Campground hikers bridge", "latitude": 39.1413774, "longitude": -106.7739261 },
    "logistics": {
      "distanceLabel": "Approximately 4.1 river miles",
      "estimatedPaddleTime": "Plan a full daylight window for continuous Class V+ scouting, rope-assisted access, rescue setup, wood assessment, breaks, and shuttle timing.",
      "shuttle": "Stage the Difficult Campground hikers-bridge exit, then shuttle to the Weller Lake downstream pull-off near the trailhead. Confirm current Highway 82, parking, campground, trail, and access conditions before unloading.",
      "permits": "Follow current White River National Forest, campground, parking, fire, seasonal-road, and Colorado boating/PFD rules. The public access anchor does not grant permission to cross closed roads or private land.",
      "camping": "Weller Campground and Difficult Campground are separate developed-camping contexts, not permission to camp at the river endpoints. Reserve or confirm a lawful site separately and follow current Forest Service restrictions; do not camp on the riverbank or at the bridge.",
      "campingClassification": "nearby_basecamp",
      "summary": "A guarded expert-only Upper Roaring Fork reach with direct 09073300 telemetry, station-tied 100–600 cfs planning bounds, a 300–400 cfs preferred band, named Forest Service access context, and no endpoint camping.",
      "accessCaveats": [
        "Use the documented Weller Lake downstream pull-off/trailhead access and Difficult Campground hikers bridge only. The put-in requires a steep rope-assisted carry; inspect the carry and water entry before committing.",
        "Weller and Difficult are high-elevation Forest Service/campground contexts. Verify current Highway 82, parking, campground, trail, seasonal, fire, and closure conditions before staging boats or vehicles.",
        "The reach assessment notes that gauge thresholds may not exactly represent each rapid. Keep the route unavailable below 100 cfs, above 600 cfs, rapidly changing, unavailable, wood-obstructed, or inconsistent with the local visual and team plan.",
        "Exit at the Difficult Campground hikers bridge. Do not continue downstream into a different Roaring Fork reach or substitute an unmarked private-bank landing."
      ],
      "watchFor": [
        "USGS 09073300 below 100 cfs, above 600 cfs, rapidly rising/falling, unavailable, or inconsistent with the local river visual",
        "Class V+ drops, tight entries, shifting and river-wide wood, steep gradient, cold water, strainers, limited recovery, and a failed expert/rescue plan",
        "Highway 82 and Forest Service access/campground closures, rope-assisted carry conditions, parking, fire restrictions, and failure to exit at Difficult Campground"
      ]
    },
    "accessPoints": [
      { "id": "upper-roaring-fork-weller-difficult-put-in", "name": "Weller Lake downstream pull-off / trailhead access", "latitude": 39.119559, "longitude": -106.722465, "mileFromStart": 0, "segmentKind": "transition", "note": "Public Weller Lake trailhead planning coordinate. American Whitewater describes parking at the pull-off downstream of Weller Lake trailhead and a steep rope-assisted carry to the river; verify the physical pull-off, parking, carry, and water entry on site." },
      { "id": "upper-roaring-fork-weller-difficult-take-out", "name": "Difficult Campground hikers bridge", "latitude": 39.1413774, "longitude": -106.7739261, "mileFromStart": 4.1, "segmentKind": "transition", "note": "Approximate Difficult Campground access anchor near the hikers bridge. Use the documented bridge exit only after confirming a safe, lawful landing and carry; do not assume the campground centroid is the waterline." }
    ]
  },
  "roaring-fork-south-gate-north-star": {
    "putIn": { "id": "roaring-fork-south-gate-north-star-put-in", "name": "South Gate designated river access", "latitude": 39.168008, "longitude": -106.789942 },
    "takeOut": { "id": "roaring-fork-south-gate-north-star-take-out", "name": "North Star Pedestrian Bridge / Stillwater Bridge take-out", "latitude": 39.1768333, "longitude": -106.7961111 },
    "logistics": {
      "distanceLabel": "Approximately 1.3 river miles",
      "estimatedPaddleTime": "Allow a daylight window for unloading, a gentle float, wildlife-aware passage, designated-beach rules, cold-water preparation, and active loading at the take-out.",
      "shuttle": "Shuttle first: drop gear at South Gate, unload within 10 minutes, park legally at South Gate or the North Lot, then walk or bike back. At the North Star Pedestrian Bridge, use only the signed loading area and retrieve the vehicle promptly; do not idle or park on Highway 82.",
      "permits": "Private paddlers must follow current Pitkin County Open Space and Trails, North Star Nature Preserve, White River National Forest, CDOT, parking, closure, wildlife, and Colorado boating/PFD rules. Commercial operators require the applicable county/Forest Service permissions and outfitter licensing.",
      "camping": "No endpoint or on-route camping is established. North Star is a protected day-use preserve; use separate lawful lodging or a designated campground reservation and never camp on the riverbank, at the beach, or beneath the bridge.",
      "campingClassification": "none",
      "summary": "A guarded South Gate-to-North Star Pedestrian Bridge float with direct 09073400 telemetry, an official 20 cfs mandatory-closure floor, 60–600 cfs normal planning band, designated public access, wildlife/private-bank restrictions, and no endpoint camping.",
      "accessCaveats": [
        "Use South Gate as the route’s designated launch and the North Star Pedestrian Bridge as the designated take-out. The county’s current page identifies these access corridors and prohibits exiting elsewhere except at the signed beach.",
        "The current Pitkin County page reports a mandatory closure below 20 cfs and says closure triggers may change. Check the live county page and all posted signs immediately before launch; do not enter during any closure.",
        "Parking is extremely limited. Drop gear quickly, park legally at the named lots, and plan to walk or bike back. The take-out has short active-loading spaces; do not leave a vehicle or block Highway 82.",
        "Stay on the water through private-property sections, maintain a quiet wildlife-aware float, keep dogs off land and water, and exit before nightfall. Do not continue past the pedestrian bridge into the separate downstream corridor."
      ],
      "watchFor": [
        "USGS 09073400 below 20 cfs, rapidly changing, unavailable, or inconsistent with the current Pitkin County closure page and local water visual",
        "Cold water, low-water contact/trespass risk, fast-rising weather, beaver dams, downed trees, moose, wildlife closures, private banks, and failure to stay within designated access corridors",
        "South Gate/North Star parking limits, active-loading-only take-out, Highway 82 traffic, nightfall closure, and mandatory exit at the North Star Pedestrian Bridge"
      ]
    },
    "accessPoints": [
      { "id": "roaring-fork-south-gate-north-star-put-in", "name": "South Gate designated river access", "latitude": 39.168008, "longitude": -106.789942, "mileFromStart": 0, "segmentKind": "transition", "note": "Approximate South Gate access anchor from the rights-clean Commons access photograph and Pitkin County map context. Confirm the signed launch corridor, parking, closure status, and water entry on site." },
      { "id": "roaring-fork-south-gate-north-star-take-out", "name": "North Star Pedestrian Bridge / Stillwater Bridge take-out", "latitude": 39.1768333, "longitude": -106.7961111, "mileFromStart": 1.3, "segmentKind": "transition", "note": "Approximate North Star take-out anchor from upper-North-Star monitoring coordinates and Pitkin County’s designated pedestrian-bridge take-out. Use the signed active-loading area only; do not park or cross Highway 82 casually." }
    ]
  },
  "roaring-fork-slaughterhouse": {
    "putIn": { "id": "roaring-fork-slaughterhouse-put-in", "name": "Henry Stein Park / Slaughterhouse Bridge river access", "latitude": 39.2108556, "longitude": -106.8395917 },
    "takeOut": { "id": "roaring-fork-slaughterhouse-take-out", "name": "Wilton Jaffee Sr. Park boat ramp", "latitude": 39.2582333, "longitude": -106.8822167 },
    "logistics": {
      "distanceLabel": "Approximately 4.5 river miles",
      "estimatedPaddleTime": "Plan a full daylight window for continuous Class IV–V scouting, Slaughterhouse Falls assessment, bridge and wood review, cold-water preparation, rescue readiness, breaks, and shuttle timing.",
      "shuttle": "Stage the Wilton Jaffee Sr. Park take-out, then use the Highway 82/Cemetery Lane and Rio Grande Trail corridor to reach Henry Stein Park. Confirm current parking, traffic, park hours, boat-loading space, and river access before unloading.",
      "permits": "Follow current City of Aspen, Pitkin County Open Space and Trails, Colorado Parks and Wildlife, posted river-access, parking, closure, and boating/PFD rules. Commercial operators using the Stein or Jaffee launches require the applicable permits and outfitter permissions.",
      "camping": "No endpoint or on-route camping is established. Henry Stein and Wilton Jaffee are public park/boat-launch contexts; use separate lawful lodging or a designated campground reservation and never camp on the gorge bank, at a ramp, or within a conservation easement.",
      "campingClassification": "none",
      "summary": "A guarded expert-only Roaring Fork Gorge reach with direct 09076300 telemetry, station-tied 100–3,000 cfs planning bounds and an 800–1,700 cfs preferred band, named public park endpoints, consequential Slaughterhouse Falls, commercial-launch rules, and no endpoint camping.",
      "accessCaveats": [
        "Use Henry Stein Park as the documented upstream access and Wilton Jaffee Sr. Park as the documented downstream boat ramp. Verify the physical water entry, loading space, signs, parking, and any current closures rather than treating a park centroid as a launch point.",
        "Pitkin County regulations require commercial raft and kayak use at the Jaffee boat ramp only, prohibit long-term trailer/vehicle parking at the ramp, and require applicable outfitter permits. Private paddlers must follow posted park rules and current access instructions.",
        "The Rio Grande Trail and gorge have heavy summer use, wildlife, conservation easements, fishing easements, private parcels, and congestion near points of interest. Stay on lawful public access corridors and do not leave the river except at documented public locations or for a lawful scout/portage.",
        "The route ends at Wilton Jaffee Sr. Park. Do not continue into the separate Woody Creek or Toothache route, and do not land at the wastewater plant, private banks, or unmarked pullouts."
      ],
      "watchFor": [
        "USGS 09076300 below 100 cfs, above 3,000 cfs, rapidly rising/falling, unavailable, or inconsistent with the local channel and assessment context",
        "Entrance Exam, Slaughterhouse Falls, Triple Drop, technical channelized Class IV–V current, bridge hazards, wood/strainers, cold water, limited recovery, and a failed expert/rescue plan",
        "Stein/Jaffee parking and loading congestion, commercial permit rules, Highway 82/Cemetery Lane traffic, wildlife and conservation restrictions, private banks, and failure to exit at Jaffee Park"
      ]
    },
    "accessPoints": [
      { "id": "roaring-fork-slaughterhouse-put-in", "name": "Henry Stein Park / Slaughterhouse Bridge river access", "latitude": 39.2108556, "longitude": -106.8395917, "mileFromStart": 0, "segmentKind": "transition", "note": "Approximate river-access anchor from the Henry Stein Park gaging/access report and City of Aspen park context. Confirm the signed river entry, parking/loading area, bridge conditions, and current park rules on site." },
      { "id": "roaring-fork-slaughterhouse-take-out", "name": "Wilton Jaffee Sr. Park boat ramp", "latitude": 39.2582333, "longitude": -106.8822167, "mileFromStart": 4.5, "segmentKind": "transition", "note": "Approximate Jaffee Park boat-ramp anchor from the county park description and mapped park access context. Use the signed ramp only, follow loading/no-overnight rules, and verify congestion or closure status before launch." }
    ]
  },
  "roaring-fork-basalt-carbondale": {
    "putIn": { "id": "roaring-fork-basalt-carbondale-put-in", "name": "Fisherman’s Park public boat ramp / Basalt Whitewater Park east end", "latitude": 39.367508, "longitude": -107.035886 },
    "takeOut": { "id": "roaring-fork-basalt-carbondale-take-out", "name": "Bob Terrell State Wildlife Area non-motorized boat ramp", "latitude": 39.4152, "longitude": -107.224 },
    "logistics": {
      "distanceLabel": "Approximately 11.5 river miles",
      "estimatedPaddleTime": "Plan a full daylight window for Class III+ scouting, whitewater-park boundary review, bridge and wood review, cold-water preparation, breaks, and shuttle timing.",
      "shuttle": "Stage the Bob Terrell SWA take-out, then shuttle to Fisherman’s Park through the Basalt/Carbondale corridor. Confirm current CPW access, license/pass, parking, ramp conditions, construction, traffic, and daylight before unloading.",
      "permits": "Follow current Colorado Parks and Wildlife license/pass and State Wildlife Area rules, Town of Basalt/Pitkin County park and access rules, posted whitewater-park restrictions, commercial-use rules, and Colorado boating/PFD requirements. Bob Terrell allows non-motorized vessel launch/takeout but prohibits personal watercraft launch/takeout.",
      "camping": "No endpoint or on-route camping is established. The named parks, ramp, and river guide are day-use access contexts, and camping is prohibited in the documented lower Roaring Fork corridor. Use separate lawful lodging or a designated campground reservation; never camp on private banks, at the ramp, or in the whitewater park.",
      "campingClassification": "none",
      "summary": "A guarded public Basalt-to-Carbondale reach with direct 09081000 telemetry, station-tied 100–5,000 cfs planning bounds and an 800–3,000 cfs preferred band, named public endpoints, whitewater-park and bridge hazards, CPW take-out rules, and no endpoint camping.",
      "accessCaveats": [
        "Use Fisherman’s Park as the documented upstream public ramp and Bob Terrell SWA as the documented downstream non-motorized ramp. The Fisherman’s coordinate is an approximate Basalt riverfront mapping anchor, not a surveyed ramp coordinate; verify the signed launch, parking, water entry, and current construction or closure status on site.",
        "Fisherman’s Park sits at the east end of Basalt Whitewater Park. The reach assessment excludes the park structures while safety modifications were ongoing; do not assume every feature is open or appropriate. Scout, portage, or postpone under current signage and local direction.",
        "Bob Terrell is a CPW State Wildlife Area access. Carry the current required license/pass for visitors age 16 and older, follow posted parking and vessel rules, and do not launch or take out personal watercraft there.",
        "The Roaring Fork corridor includes private banks, bridges, diversions, commercial traffic, and limited intermediate public access. Stay on the water except at documented lawful access, do not trespass for scouting or portage, and end at Bob Terrell before the separate lower Roaring Fork/Colorado River corridors."
      ],
      "watchFor": [
        "USGS 09081000 below 100 cfs, above 5,000 cfs, rapidly rising/falling, unavailable, or inconsistent with the reach assessment and local visual check",
        "Class III+ current, Basalt Whitewater Park structures or construction, bridge/pier hazards, strainers, cold water, debris, commercial traffic, private banks, and limited recovery",
        "Fisherman’s Park parking/access changes, CPW license/pass and Bob Terrell vessel restrictions, closures, and failure to exit at the named SWA ramp before continuing downstream"
      ]
    },
    "accessPoints": [
      { "id": "roaring-fork-basalt-carbondale-put-in", "name": "Fisherman’s Park public boat ramp / Basalt Whitewater Park east end", "latitude": 39.367508, "longitude": -107.035886, "mileFromStart": 0, "segmentKind": "transition", "note": "Approximate Basalt riverfront mapping anchor for the Fisherman’s Park access context; it is not a surveyed ramp coordinate. Pitkin County and Basalt identify public river access and a boat launch; confirm the signed launch corridor, parking, water entry, and current whitewater-park construction or closure status on site." },
      { "id": "roaring-fork-basalt-carbondale-take-out", "name": "Bob Terrell State Wildlife Area non-motorized boat ramp", "latitude": 39.4152, "longitude": -107.224, "mileFromStart": 11.5, "segmentKind": "transition", "note": "Approximate CPW mapping/directions anchor for the Bob Terrell non-motorized boat ramp. Carry the current CPW license/pass where required, obey posted vessel and parking rules, and verify the physical ramp and take-out before committing to the reach." }
    ]
  },
  "roaring-fork-pink-to-black": {
    "putIn": { "id": "roaring-fork-pink-to-black-put-in", "name": "Bob Terrell State Wildlife Area non-motorized boat ramp", "latitude": 39.41490657, "longitude": -107.22222269 },
    "takeOut": { "id": "roaring-fork-pink-to-black-take-out", "name": "Black Bridge / County Road 109 access", "latitude": 39.47949268, "longitude": -107.28640661 },
    "logistics": {
      "distanceLabel": "Approximately 7 river miles",
      "estimatedPaddleTime": "Plan a full daylight window for moving-water scouting, cold-water preparation, wood and bridge review, breaks, and shuttle timing.",
      "shuttle": "Stage the Black Bridge take-out, then shuttle to the Bob Terrell SWA ramp. Confirm current CPW access, license/pass, ramp conditions, high-clearance/4WD needs, shoulder parking, and daylight before unloading.",
      "permits": "Follow current Colorado Parks and Wildlife State Wildlife Area rules, license/pass requirements, Colorado boating/PFD rules, county and posted access rules, and any current closure or private-property notices. Black Bridge parking and approach conditions must be checked on site.",
      "camping": "Neither endpoint establishes route camping. RiverBrain identifies no camping at Bob Terrell and Black Bridge; the lower Roaring Fork user guide prohibits camping in the managed corridor. Use separate lawful lodging or designated campground reservations and never camp on private banks, at the ramp, or on the shoulder.",
      "campingClassification": "none",
      "summary": "A guarded public Pink-to-Black lower Roaring Fork reach with direct 09085000 telemetry, station-tied 100–8,000 cfs planning bounds and an 800–6,000 cfs preferred band, named endpoints, cold-water/wood/private-bank hazards, high-clearance Black Bridge access, and no endpoint camping.",
      "accessCaveats": [
        "Use the documented Bob Terrell concrete ramp and Black Bridge dirt/rock access only. Bob Terrell is a CPW State Wildlife Area and Black Bridge has limited shoulder parking; verify signs, ramp condition, vehicle suitability, parking, and lawful access before launch.",
        "The lower Roaring Fork passes private or gated shoreline areas. Stay on the river except at documented lawful access, do not trespass for scouting or portage, and do not treat a visible bank, bridge, or fishing easement as public landing permission.",
        "Black Bridge is the mandatory take-out for this route. The downstream Cemetery route is a separate package with higher-flow consequences and separate Veltus Park/Two Rivers logistics; do not drift past the take-out while relying on this route’s review.",
        "No endpoint or on-route camping is established. Reserve separate lodging or designated camping and follow current CPW, county, and campground restrictions."
      ],
      "watchFor": [
        "USGS 09085000 below 100 cfs, above 8,000 cfs, rapidly rising/falling, unavailable, or inconsistent with the reach assessment and local visual check",
        "Class II/III current, cold water, wood/strainers, bridge hazards, changing river traffic, private/gated shoreline, and limited recovery",
        "CPW license/pass and Bob Terrell rules, Black Bridge high-clearance/4WD and shoulder parking limitations, closures, and failure to exit before the separate Cemetery reach"
      ]
    },
    "accessPoints": [
      { "id": "roaring-fork-pink-to-black-put-in", "name": "Bob Terrell State Wildlife Area non-motorized boat ramp", "latitude": 39.41490657, "longitude": -107.22222269, "mileFromStart": 0, "segmentKind": "transition", "note": "RiverBrain identifies a wide concrete ramp with all-vehicle access, large parking, no camping, and approximate coordinates. CPW rules, current license/pass requirements, posted parking, and the physical launch corridor must be confirmed on site." },
      { "id": "roaring-fork-pink-to-black-take-out", "name": "Black Bridge / County Road 109 access", "latitude": 39.47949268, "longitude": -107.28640661, "mileFromStart": 7, "segmentKind": "transition", "note": "RiverBrain identifies a dirt/rock ramp to a small rocky eddy, high-clearance/4WD access, no camping, and limited shoulder parking. Use this as the mandatory take-out only after scouting the landing and confirming lawful roadside parking." }
    ]
  },
  "crystal-river-marble-redstone": {
    "putIn": { "id": "crystal-river-marble-redstone-put-in", "name": "Yule Quarry Bridge / Marble-area public access", "latitude": 39.069053, "longitude": -107.18738 },
    "takeOut": { "id": "crystal-river-marble-redstone-take-out", "name": "Redstone Crystal River take-out", "latitude": 39.17658, "longitude": -107.240505 },
    "logistics": {
      "distanceLabel": "Approximately 11.5 river miles",
      "estimatedPaddleTime": "Plan a full daylight window for continuous Class III–IV scouting, two mandatory culvert portages, wood checks, cold-water preparation, breaks, and shuttle timing.",
      "shuttle": "Stage the Redstone take-out, then shuttle to the Yule Quarry Bridge/Marble access via the Crystal River valley. Verify road, parking, carry-down, private-property, and seasonal conditions before unloading.",
      "permits": "Follow current Gunnison County, Pitkin County, White River National Forest, Colorado boating/PFD, campground, and posted access rules. Do not treat a roadside pullout or private bank as public access.",
      "camping": "Bogan Flats Campground is a separate designated White River National Forest campground along the Crystal River and may support an overnight itinerary when reserved or otherwise lawfully available. It is not permission to camp on the riverbank or to use unmarked shoreline.",
      "campingClassification": "on_route_campsite",
      "summary": "A guarded public Marble-to-Redstone Crystal River whitewater reach with direct 09081600 telemetry, station-tied 100–3,000 cfs planning bounds and an 800–2,000 cfs preferred band, named access references, mandatory culvert portages, cold-water and wood hazards, and designated Bogan Flats camping support.",
      "accessCaveats": [
        "Use the Yule Quarry Bridge/Marble-area access and Redstone take-out only after confirming current signs, parking, carry-down, and lawful shoreline access. Coordinates are approximate planning anchors, not surveyed ramp points.",
        "The Crystal valley includes private parcels and restricted fishing or shoreline areas. Do not trespass for a better put-in, scout, portage, take-out, or campsite; use only marked public access or a separately verified permission.",
        "Scout both highway culverts from the road before launch. Treat each as a mandatory portage and carry around any wood, debris, or unsafe current; keep the crew together and preserve an alternate exit above the first culvert when feasible.",
        "Bogan Flats is a designated campground with river-adjacent sites, but reservations, seasonal operations, fire restrictions, bear rules, and river-entry conditions change. Confirm the current Recreation.gov listing and do not assume a campsite is available or a formal boat ramp exists.",
        "The route must end at the named Redstone take-out before the separate downstream Crystal reaches. Do not continue through private or unverified access areas."
      ],
      "watchFor": [
        "USGS 09081600 below 100 cfs, above 3,000 cfs, rapidly rising, unavailable, or inconsistent with the reach assessment and local visual check",
        "Class III–IV current, blind curves, undercuts, boulders, wood/strainers, cold water, mandatory culvert portages, high-water Class V escalation, and limited recovery",
        "Gunnison County Road 3/Highway 133 access changes, private-property boundaries, campground reservations/fire restrictions, road closures, and failure to exit at Redstone"
      ]
    },
    "accessPoints": [
      { "id": "crystal-river-marble-redstone-put-in", "name": "Yule Quarry Bridge / Marble-area public access", "latitude": 39.069053, "longitude": -107.18738, "mileFromStart": 0, "segmentKind": "transition", "note": "American Whitewater and RiverBrain identify the Yule Quarry Bridge/Marble access for the Bogan Canyon reach. The coordinate is an approximate mapping anchor; confirm the signed public access, parking, carry-down, and current private-property boundaries before launch." },
      { "id": "crystal-river-marble-redstone-take-out", "name": "Redstone Crystal River take-out", "latitude": 39.17658, "longitude": -107.240505, "mileFromStart": 11.5, "segmentKind": "transition", "note": "American Whitewater and RiverBrain identify Redstone as the standard longer-run take-out. The coordinate is an approximate mapping anchor; verify the lawful public exit, parking, and current signs before committing to the full reach." }
    ]
  },
  "grizzly-creek-two-rivers": {
    "putIn": {
      "id": "grizzly-creek-two-rivers-put-in",
      "name": "Grizzly Creek Boat Ramp / I-70 Exit 121",
      "latitude": 39.5601,
      "longitude": -107.251
    },
    "takeOut": {
      "id": "grizzly-creek-two-rivers-take-out",
      "name": "Two Rivers Park Colorado River boat ramp",
      "latitude": 39.551,
      "longitude": -107.334
    },
    "logistics": {
      "distanceLabel": "Approximately 5.9 river miles",
      "estimatedPaddleTime": "Plan a full daylight window for moving-water scouting, commercial-traffic spacing, breaks, cold-water preparation, and shuttle timing.",
      "shuttle": "Stage the Two Rivers Park take-out, then use the I-70 corridor to reach Grizzly Creek Exit 121. Confirm current rest-area, boat-ramp, parking, and canyon-closure conditions before unloading.",
      "permits": "Private boaters may use the City of Glenwood Springs Two Rivers ramp; commercial users must follow the current city boat-ramp permit process. Follow current CDOT, Forest Service, city, and posted I-70 access rules at Grizzly Creek.",
      "camping": "Neither endpoint establishes route camping. Grizzly Creek is a rest-area/boat-launch context and Two Rivers is a city day-use ramp; use a separate lawful campground or lodging reservation and never camp on the riverbank or in the canyon access areas.",
      "campingClassification": "none",
      "summary": "A guarded public Grizzly Creek-to-Two Rivers Colorado River float with direct 09070500 telemetry, station-linked 900–8,600 cfs planning bounds, named ramps, commercial-traffic and cold-water hazards, and no endpoint camping.",
      "accessCaveats": [
        "Use the documented Grizzly Creek Boat Ramp at I-70 Exit 121 and the City of Glenwood Springs Two Rivers concrete ramp only. The Grizzly Creek ramp is reached by stairs/boat-launch access; do not unload from a travel lane or substitute an unmarked bank.",
        "Glenwood Canyon access can close for fire, debris-flow, construction, rockfall, traffic, or weather conditions. Check current CDOT/Forest Service notices and do not launch during a closure.",
        "Two Rivers is a high-use city facility: follow current hours, ramp-parking limits, commercial-permit rules, and no-overnight-camping/parking restrictions. Stage the shuttle lawfully before entering the canyon.",
        "The 900–8,600 cfs band is planning guidance only. Keep the route unavailable when discharge is outside the band, rapidly changing, unavailable, or inconsistent with the canyon visual; stop at Two Rivers before the separate South Canyon reach."
      ],
      "watchFor": [
        "USGS 09070500 below 900 cfs, above 8,600 cfs, rapidly rising, unavailable, or inconsistent with the local visual check",
        "Class II/III current, commercial rafts, cold water, strainers/sweepers, bridge and canyon hazards, debris, and limited recovery options",
        "CDOT/Forest Service/city closures, I-70 traffic, ramp parking and permit rules, and failure to exit at Two Rivers before the separate downstream route"
      ]
    },
    "accessPoints": [
      {
        "id": "grizzly-creek-two-rivers-put-in",
        "name": "Grizzly Creek Boat Ramp / I-70 Exit 121",
        "latitude": 39.5601,
        "longitude": -107.251,
        "mileFromStart": 0,
        "segmentKind": "transition",
        "note": "American Whitewater publishes this exact Grizzly Creek access coordinate. Glenwood Springs and CDOT identify Grizzly Creek as a public Colorado River boat launch adjacent to the I-70 rest area; verify current closure, stairs, parking, and carry conditions before unloading."
      },
      {
        "id": "grizzly-creek-two-rivers-take-out",
        "name": "Two Rivers Park Colorado River boat ramp",
        "latitude": 39.551,
        "longitude": -107.334,
        "mileFromStart": 5.9,
        "segmentKind": "transition",
        "note": "American Whitewater publishes this exact Two Rivers endpoint coordinate. Glenwood Springs documents the city-operated concrete ramp; commercial users need the current permit and all users must follow posted hours, parking, and no-camping rules."
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
  "colorado-river-big-sur": {
    "putIn": {
      "id": "colorado-river-big-sur-put-in",
      "name": "Beavertail Mountain cutoff / Beaver Tail Tunnel parking access",
      "latitude": 39.1945,
      "longitude": -108.265
    },
    "takeOut": {
      "id": "colorado-river-big-sur-take-out",
      "name": "Roller Dam take-out access",
      "latitude": 39.1959,
      "longitude": -108.28
    },
    "logistics": {
      "distanceLabel": "Approximately 1.2 river miles",
      "estimatedPaddleTime": "Plan a daylight window for high-water scouting, safety-boat positioning, repeated feature review, cold-water preparation, and an immediate take-out before the dam.",
      "shuttle": "Stage the Roller Dam take-out first and confirm a legal return route. The put-in is reached from an eastbound I-70 parking area; never use active lanes, railroad tracks, or an unmarked shoreline for the shuttle or walk-back.",
      "permits": "Follow current Colorado boating/PFD rules, CDOT/I-70 access and parking rules, posted landowner or facility restrictions, and any current high-flow event or safety closures. Do not enter the Roller Dam or diversion facility.",
      "camping": "Neither endpoint establishes camping. The accesses are a roadside/highway and dam-adjacent day-use context; use separate lawful lodging or designated campground reservations and never camp on the bank, at the access, or near the diversion structure.",
      "campingClassification": "none",
      "summary": "A guarded expert Big Sur high-water wave reach with direct 09095500 telemetry, 18,000–30,000 cfs planning bounds and a 20,000–24,000 cfs preferred band, named access points, a hard Roller Dam take-out, and no endpoint camping.",
      "accessCaveats": [
        "Use only the American Whitewater Beavertail/Beaver Tail Tunnel parking access and Roller Dam take-out contexts after confirming current signs, legal parking, river entry, and the physical landing. Coordinates are approximate planning anchors.",
        "American Whitewater’s put-in directions require an eastbound I-70 parking area and a walk under the overpass on the concrete bike path. Do not stop in travel lanes, cross I-70, walk active railroad tracks, or substitute private access.",
        "The Roller Dam is the mandatory endpoint boundary. Exit before the structure; a high-flow wave is not permission to approach, run, or swim toward the dam.",
        "No on-route camping is established. Stage a lawful shuttle and separate lodging/campground plan before the high-flow window; do not rely on an overnight vehicle or riverbank camp."
      ],
      "watchFor": [
        "USGS 09095500 below 18,000 cfs, above 30,000 cfs, rapidly rising/falling, unavailable, or inconsistent with the feature’s current visual shape and local advice",
        "Powerful high-water current, wave hydraulics, cold water, floating debris, strainers, limited recovery, I-70/railroad exposure, and the Roller Dam",
        "Eastbound parking/path legality, access closures, take-out visibility, safety-boat positioning, daylight, and failure to exit before the dam"
      ]
    },
    "accessPoints": [
      { "id": "colorado-river-big-sur-put-in", "name": "Beavertail Mountain cutoff / Beaver Tail Tunnel parking access", "latitude": 39.1945, "longitude": -108.265, "mileFromStart": 0, "segmentKind": "transition", "note": "American Whitewater publishes an approximate access coordinate and directs boaters to the signed eastbound I-70 parking area, then under the overpass on the concrete bike path. Confirm the legal parking and river entry on site; never stop in traffic lanes or use the railroad as a path." },
      { "id": "colorado-river-big-sur-take-out", "name": "Roller Dam take-out access", "latitude": 39.1959, "longitude": -108.28, "mileFromStart": 1.2, "segmentKind": "transition", "note": "American Whitewater publishes an approximate take-out coordinate 0.1 miles from the reach endpoint. Treat this as a mandatory exit before Roller Dam; scout the landing from a legal location and verify current access, parking, and dam warnings before launching." }
    ]
  },
  "colorado-river-riverbend-corn-lake": {
    "putIn": {
      "id": "colorado-river-riverbend-corn-lake-put-in",
      "name": "Riverbend Park / Harky's Launch boat ramp",
      "latitude": 39.1010701,
      "longitude": -108.3614943
    },
    "takeOut": {
      "id": "colorado-river-riverbend-corn-lake-take-out",
      "name": "Corn Lake State Park Colorado River boat ramp",
      "latitude": 39.0552223,
      "longitude": -108.460575
    },
    "logistics": {
      "distanceLabel": "Approximately 6.5–7 river miles",
      "estimatedPaddleTime": "Plan a daylight window of roughly 2–4 hours, with extra time for low-water dragging, current scouting, breaks, changing wind, and shuttle timing.",
      "shuttle": "Stage the take-out at the Corn Lake State Park river ramp, then shuttle to Riverbend Park via the Palisade/Clifton road network. Confirm park hours, vehicle pass, parking, ramp carry, construction, and current traffic conditions before unloading.",
      "permits": "Follow current Colorado boating and PFD rules, CPW James M. Robb State Park vehicle-pass and access rules, Town of Palisade park notices, posted ramp restrictions, and aquatic-nuisance-species requirements.",
      "camping": "Riverbend Park and Corn Lake are day-use access contexts; Corn Lake expressly prohibits camping. Use separate lawful lodging or a designated campground such as the CPW overnight sections, and never camp on a private bank, at a ramp, or beside irrigation infrastructure.",
      "campingClassification": "none",
      "summary": "A guarded public Riverbend-to-Corn-Lake Colorado River float with direct 09106150 telemetry, conservative 500–30,000 cfs planning bounds and a 1,500–15,000 cfs preferred band, named public ramps, low-water/debris and bridge hazards, and no endpoint camping.",
      "accessCaveats": [
        "Use the public Riverbend Park / Harky's Launch ramp below the Grand Valley Diversion and the CPW Corn Lake river ramp only. The local guide's Rapid Creek Road launch is upstream of the diversion and is not interchangeable with this route.",
        "Riverbend access coordinates are derived from the mapped River Bend Park boat-ramp feature; Corn Lake coordinates are the mapped river slipway. Confirm the physical carry, water level, parking, signs, and any construction or seasonal closure on site.",
        "The Corn Lake section requires the applicable CPW vehicle pass and is day-use only. Stage the shuttle legally and do not leave vehicles overnight at either endpoint.",
        "No private-bank landing, irrigation-canal access, or side-channel shortcut is authorized by this route. If the main channel is blocked by debris or the take-out cannot be reached safely, exit only at a verified lawful alternative and treat the route as unavailable."
      ],
      "watchFor": [
        "USGS 09106150 below 500 cfs, above 30,000 cfs, rapidly rising/falling, unavailable, or inconsistent with the actual river and ramp conditions",
        "Low-water gravel bars, submerged farm equipment near 39.075720, -108.418334, downed trees, strainers, bridge pilings, the boulder diversion, cold water, and high-flow changes to otherwise mellow water",
        "PFD and river-equipment failures, board-leash entanglement, private-bank temptation, CPW vehicle-pass/parking rules, construction, ramp access, and failure to make the Corn Lake take-out before dark"
      ]
    },
    "accessPoints": [
      { "id": "colorado-river-riverbend-corn-lake-put-in", "name": "Riverbend Park / Harky's Launch boat ramp", "latitude": 39.1010701, "longitude": -108.3614943, "mileFromStart": 0, "segmentKind": "transition", "note": "The Colorado Mesa guide identifies Riverbend Park as the preferred public launch below the Grand Valley Diversion; the Riverbend riverfront map and mapped ramp feature identify the boat ramp and nearby parking/toilets. Verify the carry and current legal access before launching." },
      { "id": "colorado-river-riverbend-corn-lake-take-out", "name": "Corn Lake State Park Colorado River boat ramp", "latitude": 39.0552223, "longitude": -108.460575, "mileFromStart": 6.5, "segmentKind": "transition", "note": "Colorado Parks and Wildlife identifies the Corn Lake river ramp at the southeast corner of Corn Lake, reached from 32 Road. The section is day-use only and prohibits camping; confirm the applicable vehicle pass, ramp condition, and take-out access." }
    ]
  },
  "colorado-river-corn-lake-redlands": {
    "putIn": {
      "id": "colorado-river-corn-lake-redlands-put-in",
      "name": "Corn Lake State Park Colorado River boat ramp",
      "latitude": 39.0552223,
      "longitude": -108.460575
    },
    "takeOut": {
      "id": "colorado-river-corn-lake-redlands-take-out",
      "name": "Redlands Parkway Boat Ramp / Blue Heron access",
      "latitude": 39.05424545,
      "longitude": -108.54589965
    },
    "logistics": {
      "distanceLabel": "Approximately 10 river miles",
      "estimatedPaddleTime": "Plan a daylight window of roughly 3–5 hours, with extra time for confluence scouting, the 29 Road rapid, current changes, breaks, and shuttle timing.",
      "shuttle": "Stage the Redlands Parkway take-out first, then drive to the CPW Corn Lake ramp via 32 Road and the Grand Junction road network. Confirm the City ramp, parking, current signs, and CPW hours before unloading.",
      "permits": "Follow current Colorado boating and PFD rules, CPW James M. Robb State Park vehicle-pass and access rules, City of Grand Junction park/ramp notices, posted river flags or closures, and aquatic-nuisance-species requirements.",
      "camping": "Corn Lake is day-use only and the Redlands Parkway ramp is a city day-use facility; no endpoint or on-route camping is established. Use separate lawful lodging or a designated CPW campground and never camp on a private bank, ramp, island, or riverfront trail.",
      "campingClassification": "none",
      "summary": "A guarded public Corn Lake-to-Redlands Colorado River float with direct 09106485 telemetry near the take-out, conservative 810–30,000 cfs planning bounds and a 1,500–15,000 cfs preferred band, a mandatory confluence/29 Road hazard review, and no endpoint camping.",
      "accessCaveats": [
        "Use the CPW Corn Lake southeast-corner river ramp and the City of Grand Junction Redlands Parkway/Blue Heron ramp only. Verify current hours, pass requirements, parking, construction, signs, and physical carry before launching.",
        "The 09106485 station is above the Gunnison confluence. Do not treat its discharge as the downstream flow after the Gunnison joins; compare the Gunnison gauge and inspect the confluence line and downstream bridge hydraulics.",
        "Do not use the guide’s informal bridge scramble, private banks, canal edges, or Connected Lakes trail as an improvised endpoint. If the named Redlands ramp is closed or blocked, treat the route as unavailable unless a separately verified lawful take-out is selected.",
        "No private-bank landing, island stop, or camping is authorized by this route. Stage the shuttle legally and finish within the public ramp and park hours."
      ],
      "watchFor": [
        "USGS 09106485 below 810 cfs, above 30,000 cfs, rapidly changing, unavailable, or inconsistent with the Gunnison contribution and actual river conditions",
        "Gunnison confluence waves, the 29 Road rapid, bridge hydraulics, low-water rocks/gravel bars, strainers, floating debris, cold water, high-water trail impacts, and private-bank temptations",
        "PFD and equipment failures, city/CPW flags or closures, CPW vehicle-pass rules, Redlands ramp parking/carry, daylight, and failure to reach the mandatory take-out"
      ]
    },
    "accessPoints": [
      { "id": "colorado-river-corn-lake-redlands-put-in", "name": "Corn Lake State Park Colorado River boat ramp", "latitude": 39.0552223, "longitude": -108.460575, "mileFromStart": 0, "segmentKind": "transition", "note": "CPW identifies the river ramp at the southeast corner of the Corn Lake section, reached from 32 Road, with park hours and a vehicle-pass requirement. Confirm current access and carry before unloading." },
      { "id": "colorado-river-corn-lake-redlands-take-out", "name": "Redlands Parkway Boat Ramp / Blue Heron access", "latitude": 39.05424545, "longitude": -108.54589965, "mileFromStart": 10, "segmentKind": "transition", "note": "The City of Grand Junction lists the Redlands Parkway Boat Ramp and directions to its parking lot before the bridge. OpenStreetMap maps the concrete slipway at this planning coordinate; verify current public access, ramp condition, and any closure on site." }
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
  },
  "taylor-river-748-pieplant": {
    "putIn": { "id": "taylor-river-748-pieplant-put-in", "name": "CR 748 / Rocky Brook Road bridge access", "latitude": 38.924594, "longitude": -106.601111 },
    "takeOut": { "id": "taylor-river-748-pieplant-take-out", "name": "Pieplant Ranch / CR 742.8 access", "latitude": 38.894754, "longitude": -106.572554 },
    "logistics": {
      "distanceLabel": "Approximately 3 river miles",
      "estimatedPaddleTime": "Allow a daylight window of roughly 2–3 hours, including scouting, cold-water preparation, breaks, and a remote-road shuttle.",
      "shuttle": "Stage the Pieplant Ranch / CR 742.8 take-out first, then follow CR 742 and CR 748 to the bridge put-in as described by American Whitewater. Confirm road surface, seasonal opening, parking, and the physical landing before unloading.",
      "permits": "American Whitewater lists no permit required for the reach. Follow current Colorado boating/PFD and aquatic-nuisance-species rules, Forest Service orders, posted Gunnison County road/access restrictions, and any current closure or landowner notices.",
      "camping": "No endpoint or on-route camping is established. The Forest Service restricts dispersed camping in the Taylor River Canyon corridor and within 100 feet of the Taylor River in the upper area; use a separately verified developed campground or lawful lodging and never camp at the access points or on private banks.",
      "campingClassification": "none",
      "summary": "A guarded 3-mile high-alpine Taylor River whitewater reach with direct 09107000 discharge, a conservative 450 cfs low-water stop and 500 cfs preferred minimum, named access points, cold-water/wood/private-bank hazards, and no route camping.",
      "accessCaveats": [
        "American Whitewater identifies the CR 748 bridge put-in and Pieplant Ranch take-out with exact access coordinates. Treat both as planning anchors: verify current signage, parking, road condition, river landing, and lawful access before launching.",
        "The take-out is mandatory. Do not continue downstream into the broader Taylor corridor, where sources identify low bridges, barbed wire, private-bank constraints, and different whitewater/access conditions.",
        "No informal shoreline, private ranch, South Bank, or reservoir landing is included. If either named access is closed, occupied, unsafe, or unclear, the route is unavailable.",
        "Use a separate lawful campground or lodging reservation. The Taylor River corridor is not a dispersed-camping exception, and the route does not authorize camping on public-looking banks or at bridges."
      ],
      "watchFor": [
        "USGS 09107000 below 450 cfs, rapidly changing, unavailable, or inconsistent with the 500 cfs preferred minimum and the actual river",
        "cataracts, Class III features, cold water, strainers/wood, shallow rough water, storms, snow, road closures, and limited recovery",
        "private-bank boundaries, low bridges and barbed wire downstream of the route, parking/landing changes, and failure to exit at Pieplant before extending into a separate corridor"
      ]
    },
    "accessPoints": [
      { "id": "taylor-river-748-pieplant-put-in", "name": "CR 748 / Rocky Brook Road bridge access", "latitude": 38.924594, "longitude": -106.601111, "mileFromStart": 0, "segmentKind": "transition", "note": "American Whitewater identifies the CR 748 bridge as the put-in for the core 748 Bridge to Pieplant Ranch reach. Verify current road access, parking, signage, and the bridge-side river landing before unloading." },
      { "id": "taylor-river-748-pieplant-take-out", "name": "Pieplant Ranch / CR 742.8 access", "latitude": 38.894754, "longitude": -106.572554, "mileFromStart": 3, "segmentKind": "transition", "note": "American Whitewater identifies this access as the 3-mile take-out. Use it as the mandatory exit after scouting the landing and confirming current lawful parking and downstream boundaries." }
    ]
  },
  "taylor-river-todds-slot": {
    "putIn": { "id": "taylor-river-todds-slot-put-in", "name": "Put-in above Todd’s Slot", "latitude": 38.751335, "longitude": -106.695672 },
    "takeOut": { "id": "taylor-river-todds-slot-take-out", "name": "Take-out below Todd’s Slot", "latitude": 38.74868679181054, "longitude": -106.70309838554716 },
    "logistics": {
      "distanceLabel": "Approximately 0.54 river miles from above Todd’s Slot to below Todd’s Slot",
      "estimatedPaddleTime": "Allow a daylight window for shuttle, cold-water preparation, detailed scouting, portage decisions, and a remote mountain-road exit; the short mileage does not reduce the consequence of the feature.",
      "shuttle": "Stage the below-Todd’s-Slot access first, then follow the Taylor Canyon road to the above-Todd’s-Slot access. Confirm current parking, signage, landing, road condition, and posted landowner restrictions before unloading.",
      "permits": "No route-specific permit claim is made. Follow current Colorado boating/PFD rules, Forest Service orders, posted access restrictions, and any current landowner or road notices.",
      "camping": "No on-route camping is included. Use a separately verified developed campground or lawful lodging; do not camp at the river landing, bridge, private bank, or within restricted riparian areas.",
      "campingClassification": "nearby_basecamp",
      "summary": "A guarded technical Todd’s Slot feature with direct 09109000 discharge, conservative 200 cfs minimum-only planning, named above/below access records, Class IV/wood/private-bank hazards, and a mandatory exit below the feature.",
      "accessCaveats": [
        "American Whitewater provides named access records and exact coordinates for the access above and below Todd’s Slot. Treat them as planning anchors and verify current parking, signage, road condition, landing, and access permission on site.",
        "The below-Todd’s-Slot access is mandatory. Do not extend downstream through the South Bank, Harmels, or lower private-property corridor from this route; the broader source description identifies private banks and manmade obstacles beyond the bounded endpoint.",
        "The route is remote and road conditions can change seasonally. If either endpoint is closed, occupied, unsafe, or unclear, the route is unavailable.",
        "Use a separately verified campground or lodging reservation. This route does not authorize riverside or private-bank camping."
      ],
      "watchFor": [
        "USGS 09109000 below 200 cfs, rapidly changing, unavailable, or inconsistent with the actual river; 250 cfs is a preferred planning reference, not a guarantee",
        "Todd’s Slot, Class IV moves, wood/strainers, cold water, limited recovery, and changing dam-release conditions",
        "private-bank boundaries, cables/low obstacles downstream of the takeout, road closures, and failure to exit below Todd’s Slot"
      ]
    },
    "accessPoints": [
      { "id": "taylor-river-todds-slot-put-in", "name": "Put-in above Todd’s Slot", "latitude": 38.751335, "longitude": -106.695672, "mileFromStart": 0, "segmentKind": "transition", "note": "American Whitewater identifies this access above Todd’s Slot. Verify current road access, parking, signage, river landing, and posted restrictions before unloading." },
      { "id": "taylor-river-todds-slot-take-out", "name": "Take-out below Todd’s Slot", "latitude": 38.74868679181054, "longitude": -106.70309838554716, "mileFromStart": 0.54, "segmentKind": "transition", "note": "American Whitewater identifies this access below Todd’s Slot. Treat it as the mandatory exit and confirm the landing, parking, and downstream private-property boundary before launching." }
    ]
  },
  "taylor-river-five-mile-almont": {
    "putIn": { "id": "taylor-river-five-mile-almont-put-in", "name": "Five Mile Access boat launch", "latitude": 38.7089919159467, "longitude": -106.801771245825 },
    "takeOut": { "id": "taylor-river-five-mile-almont-take-out", "name": "Almont highway takeout", "latitude": 38.663285834603855, "longitude": -106.84742186733735 },
    "logistics": {
      "distanceLabel": "Approximately 5 river miles from Five Mile Access to Almont",
      "estimatedPaddleTime": "Allow a daylight window of roughly 2–4 hours depending on flow, craft, group pace, scouting, cold-water preparation, and the Almont exit; mileage is approximate and does not remove river hazards.",
      "shuttle": "Stage the Almont takeout first, then follow County Road 742 to the Five Mile Access boat launch. Confirm current parking, signage, landing, road condition, and any posted landowner restrictions before unloading.",
      "permits": "No route-specific permit claim is made. Follow current Colorado boating/PFD rules, Forest Service orders, posted access restrictions, and current landowner or road notices.",
      "camping": "No on-route camping is included. Use a separately verified developed campground or lawful lodging; GMUG restrictions prohibit dispersed camping in the Lower Taylor corridor, and the route does not authorize camping at the river, landing, bridge, or private bank.",
      "campingClassification": "nearby_basecamp",
      "summary": "A guarded Lower Taylor Class II float with direct 09110000 discharge, conservative 250 cfs minimum-only planning, named Five Mile and Almont access anchors, cold-water/wood/private-bank hazards, and a mandatory Almont exit.",
      "accessCaveats": [
        "Natural Atlas identifies Five Mile Access as a Taylor River boat launch in the Gunnison National Forest, and local guidance identifies it as the Class II boating start. Reconfirm current parking, launch condition, signage, and lawful access on site.",
        "American Whitewater identifies the Almont takeout record; local guidance places Almont Access below the Taylor/East River confluence. Treat it as the mandatory exit and do not continue onto the Gunnison without a separate plan.",
        "The gauge is on Taylor River at Almont, upstream of the East River confluence; use it as the direct Taylor-route gauge and account for the final confluence/takeout transition in planning.",
        "If either endpoint is closed, occupied, unsafe, unclear, or inconsistent with current access signs, the route is unavailable. Use a separately verified campground or lodging reservation."
      ],
      "watchFor": [
        "USGS 09110000 below 250 cfs, rapidly changing, unavailable, or inconsistent with the physical river; 300–1500 cfs is a preferred planning reference, not a guarantee",
        "Class II current, wood/strainers, cold water, bridge and bend hazards, storms, and limited recovery",
        "private-bank boundaries, changing road/parking conditions, the Taylor/East River confluence, and failure to exit at Almont"
      ]
    },
    "accessPoints": [
      { "id": "taylor-river-five-mile-almont-put-in", "name": "Five Mile Access boat launch", "latitude": 38.7089919159467, "longitude": -106.801771245825, "mileFromStart": 0, "segmentKind": "transition", "note": "Natural Atlas identifies this named Taylor River boat launch in the Gunnison National Forest, and local guidance identifies Five Mile Access as the Lower Taylor boating start. Verify current parking, signage, landing, and access conditions before unloading." },
      { "id": "taylor-river-five-mile-almont-take-out", "name": "Almont highway takeout", "latitude": 38.663285834603855, "longitude": -106.84742186733735, "mileFromStart": 5, "segmentKind": "transition", "note": "American Whitewater identifies this Almont takeout record, and local guidance places Almont Access downstream of the Taylor/East River confluence. Treat it as the mandatory exit and confirm current landing, parking, and downstream boundaries." }
    ]
  },
  "east-river-cb-south-almont": {
    "putIn": { "id": "east-river-cb-south-almont-put-in", "name": "Crested Butte South wastewater-treatment-plant access", "latitude": 38.806111, "longitude": -106.8855 },
    "takeOut": { "id": "east-river-cb-south-almont-take-out", "name": "Almont River Access Area", "latitude": 38.6633, "longitude": -106.8475 },
    "logistics": {
      "distanceLabel": "Approximately 12 river miles from CB South to Almont, with an optional Roaring Judy exit around 7.5 miles",
      "estimatedPaddleTime": "Allow a daylight window of roughly 4–7 hours depending on flow, craft, group pace, scouting, wood, bridge decisions, and the final Almont exit; source mileage is approximate.",
      "shuttle": "Stage the Almont takeout first, then drive north on Highway 135 to the Crested Butte South treatment-plant access. Confirm current parking, permission, signage, shoulder safety, landing, and road conditions before unloading.",
      "permits": "No route-specific permit claim is made. The treatment-plant access has been described as sensitive; follow current operator permission, posted private-property boundaries, Colorado boating/PFD rules, and road notices.",
      "camping": "No on-route camping is included. Use separately verified developed camping or lodging; do not camp at the treatment plant, Roaring Judy, Almont landing, bridge, or private bank.",
      "campingClassification": "nearby_basecamp",
      "summary": "A guarded Lower East Class I–III run with direct 09112200 discharge, 800 cfs minimum-only planning, optional Roaring Judy exit, increasing wood toward Almont, sensitive CB South access, and a mandatory Almont exit.",
      "accessCaveats": [
        "American Whitewater identifies the CB South wastewater-treatment plant as the put-in but says access has been sensitive. Confirm current permission, signage, parking, landing, and operator restrictions before launching.",
        "The Roaring Judy fish hatchery is an optional exit around 7.5 miles; the selected endpoint is the Almont access area near the Taylor/East confluence. Verify the landing and exit in person.",
        "The entire run is surrounded by private property according to American Whitewater. Do not use unverified shorelines, cross fences, or continue downstream without a separate lawful access plan.",
        "If wood, barbed wire, low bridges, closure signs, unsafe landing, or unclear permission blocks either endpoint, the route is unavailable. Use a separately verified campground or lodging reservation."
      ],
      "watchFor": [
        "USGS 09112200 below 800 cfs, rapidly changing, unavailable, or inconsistent with the physical river; 800–3000 cfs is planning context, not a safe-runnable certification",
        "wood increasing toward Almont, strainers, barbed wire, low bridges, wave trains, cold water, private banks, and limited recovery",
        "CB South treatment-plant permission, optional Roaring Judy exit, Taylor/East confluence, and failure to exit at Almont"
      ]
    },
    "accessPoints": [
      { "id": "east-river-cb-south-almont-put-in", "name": "Crested Butte South wastewater-treatment-plant access", "latitude": 38.806111, "longitude": -106.8855, "mileFromStart": 0, "segmentKind": "transition", "note": "American Whitewater identifies this as the Lower East put-in and a local news report documents conditional watercraft access. Confirm current operator permission, parking, signage, and landing before unloading." },
      { "id": "east-river-cb-south-almont-take-out", "name": "Almont River Access Area", "latitude": 38.6633, "longitude": -106.8475, "mileFromStart": 12, "segmentKind": "transition", "note": "American Whitewater identifies the Almont access area below the Taylor/East confluence. Treat it as the mandatory exit and confirm current landing, parking, and downstream boundaries." }
    ]
  },
  "gunnison-river-almont-north-bridge": {
    "putIn": { "id": "gunnison-river-almont-north-bridge-put-in", "name": "Almont access", "latitude": 38.664833463427186, "longitude": -106.84638183912354 },
    "takeOut": { "id": "gunnison-river-almont-north-bridge-take-out", "name": "Garlic Mike’s / North Bridge / Shady Island Boat Ramp", "latitude": 38.58286013426891, "longitude": -106.92154660259921 },
    "logistics": {
      "distanceLabel": "Approximately 8.2 river miles from Almont to Garlic Mike’s / North Bridge",
      "estimatedPaddleTime": "Allow a daylight window of roughly 2–4 hours depending on flow, craft, group pace, scouting, cold-water preparation, and the takeout; source mileage is approximate.",
      "shuttle": "Stage the North Bridge / Shady Island takeout first, then drive back to the Almont access. Confirm current parking, landing, signage, private-property boundaries, and road conditions before unloading.",
      "permits": "No route-specific permit claim is made. Follow current Colorado boating/PFD rules, posted access notices, private-property restrictions, and local road or facility rules.",
      "camping": "No on-route camping is included. Use separately verified developed camping or lawful lodging; do not camp at either access, bridge, whitewater feature, or private bank.",
      "campingClassification": "nearby_basecamp",
      "summary": "A guarded Class II Gunnison town-run segment with direct 09114500 discharge, 350–3000 cfs runnable planning context, named Almont and North Bridge accesses, and a mandatory exit before the whitewater park.",
      "accessCaveats": [
        "American Whitewater identifies Almont as the put-in and Garlic Mike’s / North Bridge / Shady Island as the 8.17-mile downstream access. Verify current landing, parking, signs, and lawful access on site.",
        "End at the North Bridge / Shady Island access. The Gunnison Whitewater Park and downstream Psychedelic Falls are separate route features and are not included in this scored segment.",
        "The local boating guide states that many Gunnison Valley rivers run through private property and that riverbed ownership can be private. Do not scout, stop, or exit on unverified banks.",
        "If either endpoint is closed, occupied, unsafe, unclear, or inconsistent with current access signs, the route is unavailable. Use a separately verified campground or lodging reservation."
      ],
      "watchFor": [
        "USGS 09114500 below 350 cfs, above 3000 cfs, rapidly changing, unavailable, or inconsistent with the physical river; the AW band is planning context, not a guarantee",
        "cold water, wood/strainers, fast current, bridge clearance, private banks, limited recovery, and changing weather",
        "the North Bridge / Shady Island takeout and the boundary before the Gunnison Whitewater Park"
      ]
    },
    "accessPoints": [
      { "id": "gunnison-river-almont-north-bridge-put-in", "name": "Almont access", "latitude": 38.664833463427186, "longitude": -106.84638183912354, "mileFromStart": 0, "segmentKind": "transition", "note": "American Whitewater identifies this as the town-run put-in. Verify current landing, parking, signage, and private-property boundaries before unloading." },
      { "id": "gunnison-river-almont-north-bridge-take-out", "name": "Garlic Mike’s / North Bridge / Shady Island Boat Ramp", "latitude": 38.58286013426891, "longitude": -106.92154660259921, "mileFromStart": 8.17, "segmentKind": "transition", "note": "American Whitewater identifies this named access approximately 8.17 miles downstream. Treat it as the mandatory exit before the Gunnison Whitewater Park and confirm current landing and parking conditions." }
    ]
  },
  "gunnison-river-whitewater-park": {
    "putIn": { "id": "gunnison-river-whitewater-park-put-in", "name": "Gunnison Whitewater Park put-in", "latitude": 38.533, "longitude": -106.949 },
    "takeOut": { "id": "gunnison-river-whitewater-park-take-out", "name": "Gunnison Whitewater Park downstream exit", "latitude": 38.531, "longitude": -106.951 },
    "logistics": {
      "distanceLabel": "Approximately 0.2 engineered river miles; American Whitewater lists the downstream access at approximately 0.5 miles",
      "estimatedPaddleTime": "Allow a daylight window for parking, carrying, feature inspection, scouting, repeated laps, and a conservative exit; this is a short park course rather than a through-float.",
      "shuttle": "No vehicle shuttle is required. Use the documented park parking and access, stage equipment before launching, and confirm the downstream exit and walk-back route before entering.",
      "permits": "Follow current Gunnison County and park access rules, posted fees or closures, event controls, Colorado boating/PFD requirements, and all current river-use signs.",
      "camping": "No route camping is included. The nearby Shady Island River Park has separate camping rules; do not camp at the whitewater course, riverbank, access, or downstream feature.",
      "campingClassification": "nearby_basecamp",
      "summary": "A short public Gunnison Whitewater Park play reach with direct 09114520 telemetry, survey-backed 600–5000 cfs acceptable flow guidance, named park access, and a mandatory conservative exit.",
      "accessCaveats": [
        "American Whitewater identifies the park put-in and downstream take-out access records; verify current parking, carry, landing, signs, fees, and any construction or event closure before unloading.",
        "The course is a series of engineered features, not a casual float. Scout the top, middle, and bottom features and keep swimmers, surfers, downstream traffic, and rescue lanes clear.",
        "Exit at the named downstream access before extending into the larger town-run reach or Psychedelic Falls. Do not infer a route extension from the nearby Almont-to-North-Bridge route.",
        "If the park is closed, crowded beyond safe control, physically changed, inaccessible, or inconsistent with the current gauge and scouting, treat the route as unavailable."
      ],
      "watchFor": [
        "USGS 09114520 below 600 cfs, above 5000 cfs, rapidly changing, unavailable, or inconsistent with feature inspection; the AW range is planning guidance, not a guarantee",
        "sticky holes, rock structures, diversion behavior, cold water, strainers/debris, swimmers, surfers, crowding, and fast changes after storms or releases",
        "posted closures, event traffic, parking or fee changes, private-bank boundaries, and failure to take out before downstream town-run hazards"
      ]
    },
    "accessPoints": [
      { "id": "gunnison-river-whitewater-park-put-in", "name": "Gunnison Whitewater Park put-in", "latitude": 38.533, "longitude": -106.949, "mileFromStart": 0, "segmentKind": "transition", "note": "American Whitewater identifies the named park put-in at 38.53300, -106.94900. Confirm current carry, parking, signs, and park operating conditions before launching." },
      { "id": "gunnison-river-whitewater-park-take-out", "name": "Gunnison Whitewater Park downstream exit", "latitude": 38.531, "longitude": -106.951, "mileFromStart": 0.5, "segmentKind": "transition", "note": "American Whitewater identifies the downstream take-out access at 38.53100, -106.95100. Treat it as the mandatory exit and do not continue into the downstream town-run features without a separate plan." }
    ]
  }
};
