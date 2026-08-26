# West Virginia Route Research Plan

Status: planning baseline

Prepared: 2026-08-25

Branch: `codex/west-virginia-research-plan`

## Strategic next tranche (2026-08-25)

The first expansion after the New/Greenbrier/Upper Cheat cohort is deliberately
small and evidence-led:

| Route | Why it clears the next gate | Remaining operational caveat |
| --- | --- | --- |
| Tygart Valley: Valley Falls State Park to Hammond / Twist and Shout | American Whitewater supplies a named 1.2-mile reach, Colfax stage gauge, endpoint protocol, and feature-level hazards; state-park material confirms the managed access context | Short does not mean easy: Valley Falls, Hamburger Helper, and Twist and Shout make this an expert-only whitewater card; the numeric stage band is community-derived and conservative |
| Cacapon: Capon Bridge to WV 127 (Bloomery) | American Whitewater and the Cacapon Water Trail guide agree on the 11.5–11.6-mile public endpoint pair; WVDNR publishes the access coordinates; Great Cacapon has continuous USGS telemetry | The gauge is downstream of this upper reach and the flow band is community-derived; pair the reading with rainfall, trend, and a local visual check; no public on-route camping is assumed |

These two routes intentionally broaden the product in different directions: one
adds a high-consequence, gauge-rich specialist reach, while the other adds a
scenic Class II water-trail route with a stronger public-access and camping
logistics package. Gauley remains a later release-aware tranche rather than a
scored route until a supported live release provider is proven.

## Decision

Research West Virginia gauge-first, but do not treat every gauge as a route lead.
The first pass should join fresh, route-scale telemetry to an official paddling
corridor, then qualify individual point-to-point routes against Paddle Today's
threshold, access, safety, camping, coordinate, and geometry gates.

The recommended launch backbone is:

1. New River
2. Greenbrier River
3. Upper Cheat River
4. Elk River
5. Cacapon River
6. Coal River system
7. West Fork River
8. Bluestone River

The Gauley is a seasonal showcase, but it is not an uncomplicated first scored
route. Its direct USGS discharge series below Summersville Dam is stale in Water
Services. Keep it in the research plan, but do not publish it until a supported
official live provider and release-aware threshold model are proven.

## Baseline Gauge Sweep

Source query:

- [USGS West Virginia instantaneous discharge and stage](https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=wv&parameterCd=00060,00065&siteStatus=active)

Snapshot at approximately 2026-08-25 12:15 America/New_York:

| Measure | Count | Interpretation |
| --- | ---: | --- |
| USGS discharge series returned | 114 | Nominal active inventory, not all product-live |
| Fresh valid discharge readings within two hours | 103 | Usable starting pool |
| Stale discharge readings | 9 | Do not use as live route gauges |
| Fresh series returning a no-data sentinel | 2 | Do not use until valid readings resume |
| Fresh gauges in the initial route-potential pool | 60 | Research candidates, not approved routes |
| Priority 1 backbone gauges | 24 | Official water-trail or NPS corridor fit |
| Priority 2 expansion gauges | 13 | Strong multi-gauge corridor fit |
| Specialist/exploratory gauges | 23 | Route evidence exists or is plausible, but risk/access work is heavier |

All 60 gauges in the initial route-potential pool returned both discharge
(`00060`) and gage height (`00065`) in the snapshot. That is a strong technical
fit for Paddle Today's current USGS adapter and for researching either flow- or
stage-based numeric thresholds.

The counts are a dated research snapshot, not a permanent claim about station
operation. Re-run the query at the start of each implementation batch.

## Gauge-to-Corridor Priorities

### Priority 1: launch backbone

These corridors combine fresh telemetry with an NPS-managed river or a state-
designated water trail. Research them before isolated whitewater creeks.

| Corridor | Fresh USGS gauges | Why it leads | First route question |
| --- | --- | --- | --- |
| New River | `03184500` Hinton; `03185400` Thurmond | NPS publishes river character, access points, safety distinctions, and a multi-reach trip map; AW has matching reaches and thresholds | Which NPS public-access pairs produce useful Class I-III day trips without crossing Sandstone Falls or collapsing advanced gorge reaches into recreational cards? |
| Greenbrier River Water Trail | `03180500` Durbin; `03182500` Buckeye; `03183500` Alderson; `03184000` Hilldale | Four direct gauges span a long designated water trail; state-park material documents river and trail access | Which official access chain yields 6-15 mile day trips and any defensible on-route camping classifications? |
| Upper Cheat River Water Trail | `03069500` Parsons; `0307020015` Rowlesburg; `03070260` Albright | Three fresh mainstem gauges, a designated water trail, and extensive AW reach information | Where does the recreational water trail end and the advanced Cheat Canyon package begin? |
| Elk River Water Trail | `03194700` below Webster Springs; `03196600` Frametown; `03197000` Queen Shoals; `03197950` Charleston | Four fresh gauges span an approved water trail and make direct-versus-proxy choices testable | Which public launches define safe segments, and where do dams or urban hazards require hard boundaries? |
| Cacapon River Water Trail | `01611500` near Great Cacapon | Designated water trail plus current AW reach maintenance | Can route-specific thresholds upstream be tied defensibly to the downstream gauge, or should only lower reaches be scored? |
| Walhonde/Coal River system | `03198500` Big Coal at Ashford; `03199000` Little Coal at Danville; `03200500` Coal at Tornado | Each branch and the combined river have a fresh gauge on a designated system | Can each gauge support a distinct public point-to-point route without bridge-shoulder or dam-adjacent access guesses? |
| West Fork River Water Trail | `03058000` below Stonewall Jackson Dam; `03058500` Butcherville; `03058975` Mount Clare; `03061000` Enterprise | Four fresh gauges cover a designated, regulated corridor | Which reaches have official public endpoints, and how should Stonewall Jackson Dam releases affect the scoring model? |
| Bluestone River | `03179000` near Pipestem | NPS publishes an unusually concrete 4-7 foot paddling range and an exact Pipestem-to-Bluestone corridor | Is the current Pipestem access/tram service operational for private boats, and can both endpoints be verified independently of the general park coordinates? |
| Upper Gauley | `03189100` near Craigsville | Fresh gauge with AW numeric guidance for upstream Gauley reaches | Which upstream, non-release reaches have public endpoints and route-specific Craigsville thresholds? Keep them separate from Gauley Season. |
| Lower Gauley system | `03192000` above Belva | Fresh downstream reading can corroborate the river system | Is it a defensible direct or calibrated proxy for any lower reach? Do not substitute it casually for the stale below-dam gauge. |

Priority 1 contains 24 fresh gauges.

### Priority 2: strong expansion corridors

These have good telemetry density and documented paddling potential, but the
official route/access package is less centralized or includes more dams and
cross-jurisdictional work.

| Corridor | Fresh USGS gauges | Research posture |
| --- | --- | --- |
| South Branch Potomac | `01605500` Franklin; `01606500` Petersburg; `01608500` Springfield | Strong day-trip potential. Join AW sections to WVDNR public access and verify every dam/portage boundary. |
| South Fork, South Branch Potomac | `01607500` Brandywine; `01608000` near Moorefield | Research as its own tributary corridor; do not conflate its thresholds with the South Branch mainstem. |
| Tygart Valley River | `03050000` Dailey; `03051000` Belington; `03054500` Philippi; `03056000` below Tygart Dam; `03057000` Colfax | Excellent gauge density. Split free-flowing, falls/whitewater, and regulated reaches before selecting endpoints. |
| Guyandotte River Water Trail | `03202300` Pineville; `03202400` Baileysville; `03203600` Logan | Approved water trail with three current gauges. Verify that the published water-trail access chain is current after flood and infrastructure changes. |

Priority 2 contains 13 fresh gauges.

### Specialist and exploratory corridors

These 23 gauges have plausible route value, but should follow the launch
backbone because the likely routes are more technical, remote, cross-state, or
weakly packaged by official managers.

| Corridor | Fresh USGS gauges | Main research risk |
| --- | --- | --- |
| Dry Fork / Black Fork Cheat | `03065000` Hendricks | Tributary-to-mainstem gauge relationships and endpoint legality |
| Shavers Fork | `03067510` Cheat Bridge; `03068800` Bowden | Several AW reaches range from recreational to Class V; High Falls is a hard route boundary |
| Big Sandy Creek | `03070500` Rockville | Class IV-V specialist route; access, waterfall consequence, and whitewater-only discovery rules |
| Middle Fork River | `03052000` Audra | Audra State Park provides a promising official anchor, but exact public endpoint pairs and thresholds remain to be selected |
| Buckhannon River | `03052120` Alton; `03052450` Buckhannon; `03053500` Hall | Multiple gauges but no selected official access chain yet |
| Little Kanawha River | `03151400` Wildcat; `03151600` Burnsville; `03152000` Glenville; `03155000` Palestine | Long corridor with dams/regulated water and a need for route-specific rather than basin-wide thresholds |
| Middle Island Creek | `03114500` Little | Upstream companion station currently returns invalid data; prove public endpoints and threshold coverage |
| Opequon Creek | `01616500` Martinsburg | Cross-jurisdictional lower corridor and access-legitimacy work |
| Potomac River | `01618000` Shepherdstown | Shared-state big-river corridor; current, dams, motor traffic, and jurisdiction-specific rules |
| Shenandoah River | `01636500` Millville | Shared-state corridor; confirm whether the WV gauge directly supports the selected WV route |
| Tug Fork | `03212750` Welch; `03213000` Litwar; `03213700` Williamson; `03214500` Kermit | Strong telemetry but thin known recreational route packaging and interstate-bank access complexity |
| Anthony Creek | `03182700` Anthony | Likely seasonal Class I-II route; prove official endpoints and numeric range |
| Cranberry River | `03187500` Richwood | Remote/managed-land access and likely specialist threshold work |
| Williams River | `03186500` Dyer | Remote Monongahela National Forest corridor; verify road, launch, camping, and seasonal access |

Additional exploratory gauges to revisit only after the 60-gauge pool is
worked include the Blackwater (`03066000`), Meadow (`03190000`), North Branch
Potomac (`01595800`), North Fork South Branch Potomac (`01606000`), Back Creek
(`01614000`), Kanawha (`03193000`, `03198000`), Twelvepole (`03207020`), South
Fork Hughes (`03155220`), and Wheeling Creek (`03112000`). They may produce
routes, but they do not improve the first-state launch as efficiently as the
designated-trail and NPS corridors.

## Known Gauge Exclusions and Blocks

Do not let `siteStatus=active` override actual sample freshness.

### Stale discharge series

| USGS site | Station | Last discharge sample in the 2026-08-25 sweep | Decision |
| --- | --- | --- | --- |
| `03178000` | Bluestone River near Spanishburg | 1998-08-19 | Exclude; use current Pipestem gauge only where the route relationship fits |
| `01608070` | South Branch Potomac near Moorefield | 2002-09-30 | Exclude; do not confuse with current South Fork station `01608000` |
| `03189600` | Gauley River below Summersville Dam | 2003-09-30 | Block as a USGS live source; investigate USACE/NPS release data and provider support |
| `03050500` | Tygart Valley River near Elkins | 2004-09-30 | Exclude; current Dailey/Belington/Philippi gauges remain available |
| `03196800` | Elk River at Clay | 2017-11-06 | Exclude; evaluate Frametown and Queen Shoals for adjacent reaches |
| `03203000` | Guyandotte River at Man | 2018-09-30 | Exclude; current Pineville/Baileysville/Logan gauges remain available |
| `03202928` | Little Huff Creek at Hanover | 2019-09-30 | Exclude; also a low-priority small-water specialist lead |
| `03177480` | Indian Creek at Red Sulphur Springs | 2020-01-31 | Exclude |
| `03207061` | Twelvepole Creek at Lavalette | 2022-11-02 | Exclude; the Wayne station is current |

### Current timestamps with invalid discharge

- `03052500` Sand Run near Buckhannon: `-999999`
- `03114431` Middle Island Creek near Middlebourne: `-999999`

These stations remain blocked until the service returns valid current values.

### Low-priority monitor class

Small watershed and urban-monitor gauges should not become route leads merely
because they are current. Abram Creek, Bullskin Run, Hopewell Run, Hurricane
Creek, Knapp Creek, Little Sandy Creek, Middle Fork Mud River, Panther Creek,
Rockymarsh Run, Tuscarora Creek, Waites Run, and Warm Springs Run belong in a
deferred pool unless an official route or a well-matched AW reach supplies a
credible point-to-point corridor and numeric thresholds.

## Source Order

Use sources in this order for each corridor:

1. **Live conditions:** USGS instantaneous values, with a current discharge or
   stage series that the existing adapter supports.
2. **Official corridor and endpoints:** WVDNR designated-water-trail materials,
   WVDNR HuntFish access map/district guides, NPS maps, USFS recreation pages,
   state parks, and city/county launch pages.
3. **Numeric thresholds:** official river bands first; then a closely matching
   American Whitewater reach/gauge pair; then another credible route-specific
   published numeric source.
4. **Safety and closures:** route manager, dam operator, NPS/USFS alerts,
   WVDNR regulations, and current access-manager notices.
5. **Camping:** official campground or water-trail rules. Never generalize a
   nearby campground into on-route camping.
6. **Geometry and coordinates:** official GIS or named official access features,
   followed by coordinate audit and canonical geometry generation.
7. **Images:** only after a route clears gauge, threshold, access, and safety
   gates.

Core source families:

- [WVDNR boating and approved water trails](https://wvdnr.gov/lands-waters/boating/)
- [WVDNR public river, stream, and lake access guide](https://wvdnr.gov/wvdnrs-guide-to-public-river-stream-and-lake-access-sites/)
- [NPS New River whitewater and reach character](https://www.nps.gov/neri/planyourvisit/whitewater.htm)
- [NPS New River public access list](https://www.nps.gov/neri/planyourvisit/fishing.htm)
- [NPS Gauley whitewater](https://www.nps.gov/gari/planyourvisit/whitewater.htm)
- [NPS Bluestone paddling guidance](https://www.nps.gov/blue/planyourvisit/paddling-the-bluestone.htm)
- [American Whitewater West Virginia river index](https://www.americanwhitewater.org/content/River/view/river-index/state/USA-WVR)

## Research Workflow

### Phase 0: refresh and normalize gauges

For every research run:

1. Query WV USGS instantaneous values for discharge and stage.
2. Record station ID, name, coordinates, latest timestamp, units, current value,
   and whether recent samples support trend/chart behavior.
3. Reject stale, sentinel, discontinued, lake-only, and obviously tiny-monitor
   stations before route research.
4. Group remaining stations by river and order them upstream to downstream.
5. Flag regulated corridors and stations whose published gauge name no longer
   reflects a live product feed.

Deliverable: a dated gauge snapshot and changed-station note. Do not commit
rapidly aging current flow values into route data.

### Phase 1: gauge-to-route join

For each Priority 1 corridor:

1. Collect the official water-trail/NPS access chain.
2. List candidate adjacent access pairs, approximate mileage, difficulty,
   route-defining hazards, and the nearest direct gauge.
3. Mark the gauge relationship `direct`, `same-river upstream proxy`,
   `same-river downstream proxy`, or `unsupported`.
4. Drop candidates that cross an unprotected dam, mandatory portage, waterfall,
   advanced gorge boundary, or unresolved private access.
5. Avoid publishing a long card when shorter official access-pair cards and
   planner access points describe the corridor better.

Deliverable: two to four bounded candidate reaches per backbone corridor, not a
statewide dump of every AW reach.

### Phase 2: threshold qualification

For each candidate reach:

1. Find numeric guidance tied to the selected gauge and substantially matching
   the reach.
2. Capture the source, metric, low floor, ideal range, high cutoff if supported,
   publication/update date, and any seasonal or dam-release assumptions.
3. Prefer two-sided thresholds; use minimum-only only when the evidence truly
   supports no upper bound.
4. Reject anecdotal “after rain” guidance and do not transfer a range across a
   tributary, dam, or materially different reach.
5. For whitewater, set `routeType: 'whitewater'` and preserve AW difficulty and
   consequence language rather than translating it into a casual route.

Deliverable: candidates either become `threshold-qualified` or receive one
specific threshold blocker and next action.

### Phase 3: endpoints, safety, and camping

1. Confirm public put-in and take-out names with the managing agency.
2. Resolve coordinates from official GIS/map evidence; do not infer a launch
   from a bridge centerline or broad park coordinate.
3. Check current closures, road seasonality, parking, fees, hours, shuttle
   feasibility, dams, strainers, undercuts, ledges, and missed-takeout
   consequences.
4. Classify camping using the repository vocabulary: `none`,
   `nearby_basecamp`, `endpoint_campground`, `on_route_campsite`,
   `sandbar_or_gravel_bar`, `overnight_capable`, or `unknown`.
5. Reject routes whose access or safety failures cannot be fixed with stronger
   evidence. Warning copy is not a substitute for a safe route package.

Deliverable: implementation-ready route dossier with source links and explicit
remaining caveats.

### Phase 4: initial implementation cohort

Target 8-12 routes across at least four corridors, with a balanced mix of
recreational and explicitly filtered whitewater routes. A sensible target mix
is:

- 2-3 New River routes
- 2-3 Greenbrier River routes
- 1-2 Upper Cheat, Elk, Cacapon, Coal, or West Fork routes
- 1 Bluestone route if current access and the NPS threshold clear
- 0-1 Gauley route only if live-provider and release-model gates clear

Do not let Gauley Season drive a rushed provider workaround. It can be promoted
as planning content before it becomes a scored route, provided the UI clearly
distinguishes scheduled-release information from Paddle Today live scoring.

### Phase 5: implementation and verification

When a cohort clears research:

1. Add `src/data/routes/west-virginia.ts` and the matching trip-details module.
2. Register the state without hand-editing unrelated route order or generated
   artifacts.
3. Add candidate-ledger evidence and source links.
4. Run route-data typecheck, route audit, coordinate audit, access-registry
   generation, geometry review/generation, overlap audit, safety audit, and the
   relevant unit tests.
5. Visually inspect state, map, card, route-detail, and mobile/API behavior.

## Route Research Record Template

Use one record per selected access pair:

```text
River / reach:
State: West Virginia
USGS gauge:
Gauge relationship: direct | upstream proxy | downstream proxy
Live parameters: discharge | stage
Official corridor source:
Put-in / manager / coordinates:
Take-out / manager / coordinates:
Distance:
Difficulty / route type:
Numeric threshold source:
Threshold model:
Dam or release dependency:
Major safety blockers:
Camping classification / source:
Current closure check:
Geometry source:
Image decision:
Decision: advance | blocked | reject
Next action:
```

## Completion Criteria for the Research Plan

The West Virginia research phase is complete when:

- every Priority 1 gauge has a route-capable, proxy-only, or no-route decision;
- at least 12 bounded access-pair candidates have been screened;
- at least 8 candidates across four corridors have numeric threshold decisions;
- every advancing candidate has two verified public endpoints and a safety
  review;
- Gauley has an explicit provider/release decision rather than an implicit
  assumption;
- the initial implementation cohort is small enough to verify as one state
  launch and diverse enough not to present West Virginia as expert-only.

### Completion record — 2026-08-25

The research phase met these criteria on the dedicated West Virginia branch.
The [research ledger](./west-virginia-route-research-ledger.json) records 24 of
24 Priority 1 gauge decisions, 18 bounded candidates, 18 numeric threshold
decisions across six corridor groupings, and a 12-route initial cohort. It also
records the explicit decision to defer release-dependent Gauley scoring until
the application supports USACE CWMS data and a release-aware model.
