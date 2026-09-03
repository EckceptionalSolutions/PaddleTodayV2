# New York Route Memory

Updated: 2026-09-02

Use this memory with:

- [`../route-addition-requirements.md`](../route-addition-requirements.md)
- [`../../src/data/routes/new-york.ts`](../../src/data/routes/new-york.ts)
- [`../../src/data/route-access-official-map-controls.json`](../../src/data/route-access-official-map-controls.json)

## Inventory status

The NY Susquehanna Basin Water Trail publishes 11 itinerary entries. Two hundred ninety-nine
bounded route records are implemented in `src/data/routes/new-york.ts`, with two hundred ninety-eight
currently public in the state inventory. The additional upper Boquet, Little River, Saranac
Lake-to-Moose Pond, Route 458-to-St. Regis Falls, Five Mile West Branch St. Regis, and Lows Lake–Oswegatchie Inlet cards are planning-only: Boquet uses a DEC
riverbank/campsite endpoint above Split Rock Falls rather than a scored launch listing, Little River
has a current temporary closure at the Youngs Road launch and no current route-local gauge, Saranac
Lake-to-Moose Pond uses a historical Saranac gauge plus a limited-parking footbridge finish and
managed outfitter alternative, Route 458-to-St. Regis Falls uses a public NYSDEC upstream
launch but a permission-gated Town of Waverly campsite finish, and Five Mile uses seasonal NYSDEC
conservation-easement hand launches with high-water-only navigation, while Lows–Oswegatchie is a multi-day wilderness traverse with a signed 3.5-mile carry. The remaining statewide candidates
are being screened separately because their water character, access, or gauge posture does not yet
justify a route card.

The current canonical-geometry audit covers the public New York route geometry assets.
New York’s route traces are represented by the NHD matches or explicit American Whitewater /
curated geometry assets recorded in the source; two unmatched entries remain in the global
manifest. The New York entry is the separate planning-only Waterford-to-Lansingburgh Hudson
record, which remains outside the public geometry bundle because its geometry is not yet
resolved; the other unmatched entry is the non-New-York Eau Claire River record.
The separate Powerhouse-to-Lock 4 Hoosic record remains planning-only and is excluded
from the public geometry bundle because its proxy-gauge whitewater posture does not
meet the publication gate. The other two unmatched records are non-New-York and remain
outside this state rotation.

| Official itinerary | Product disposition | Reason |
| --- | --- | --- |
| Otsego Lake | Hold | Lake/flatwater source entry, not a moving-water corridor |
| Cooperstown to Phoenix Mills | Implemented as planning-only transition route | Susquehanna headwaters, 5.5 miles, Fish Road Launch to Compton Bridge DEC access, mandatory Otsego Lake Dam portage, shallow-water/downed-tree/rocky-take-out hazards; nearby historical USGS site has no current data, so no numeric threshold or score |
| Warnerville to Central Bridge | Implemented as planning-only moving-water route | Cobleskill Creek, approximately 13 planning miles within the broader American Whitewater Warnerville-to-Sidney Corners corridor, Montgomery County-published paddling access to the current NYSDEC Central Bridge hand launch, direct USGS 01351298, visual runnable-water guidance rather than a fixed cfs cutoff, strainers/ledges/Bramanville Falls/cold-water hazards, conditional upstream access verification, and nearby-basecamp-only camping posture |
| Crumhorn Pond to Goodyear Lake | Implemented as planning-only flatwater route | Susquehanna, 3.25–6 miles, Crumhorn Pond/Susquehanna State Forest to Portlandville or Goodyear Lake/Silliman Cove, three public access points, accessible-launch context, nearly undetectable current, and Colliers Dam boundary; nearby USGS site is historical/no current data, so no numeric threshold or score |
| Colliersville to Emmons | Implemented as planning-only moving-flatwater section | Susquehanna, approximately 3 miles, current NYSDEC Colliersville and Emmons hand launches with 10- and 20-car parking, downstream live USGS 01500500 proxy, no numeric cutoff, rain/shallow/debris/cold-water controls, and hard boundary before the separate Oneonta-to-Otego sequence |
| Emmons to West Oneonta | Implemented as planning-only moving-flatwater gap section | Susquehanna, approximately 5.5 planning miles between current Emmons and West Oneonta public hand launches, downstream live USGS 01500500 proxy, no numeric cutoff, shallow/debris/flood/cold-water/private-bank controls, and hard boundary before the existing West Oneonta-to-Otego route |
| Otego to Unadilla | Implemented as planning-only moving-flatwater gap section | Susquehanna, approximately 9 planning miles between current Otego/Wells Bridge and Unadilla public hand launches, direct USGS 01500500 near the downstream endpoint, parent Class I/300–6,000-cfs context without a separate cutoff, shallow/debris/flood/cold-water controls, and hard boundary before the existing Unadilla-to-Sidney route |
| New Berlin to Mount Upton | Implemented as planning-only moving-flatwater section | Unadilla, approximately 3.5 planning miles between two current NYSDEC New Berlin hand launches with 8- and 10-car parking, downstream live USGS 01502500 proxy, historical local gauge context, seasonal rising/muddy/low-water controls, nearby-basecamp-only camping, and hard boundary before the separate Rockdale-to-Sidney card |
| Guilford to Rockdale | Implemented as planning-only moving-flatwater connector | Unadilla, approximately 2 planning miles from the current NYSDEC Guilford hand launch to the established Rockdale access area, live USGS 01502500 direct at the downstream boundary, seasonal rising/muddy/low-water controls, nearby-basecamp-only camping, and hard boundary before the separate Rockdale-to-Sidney card |
| West River Marsh Sunnyside out-and-back | Implemented as planning-only lazy moving-water outing | West River/Canandaigua Lake inlet, about 4 planning miles round trip from the current Sunnyside Road paddle launch toward the South Hill marsh turnaround, direct USGS 04234398, no invented cutoff, shallow/vegetation/wood/fast-rise/cold-water controls, nearby-basecamp-only camping, and no South Hill vehicle take-out claim |
| Elmira to Chemung | Implemented as planning-only Class I moving-water route | Chemung River, approximately 12.5 planning miles by current endpoint geometry (CanWePaddle source lists 10), current NYSDEC Elmira and White Wagon public launch areas, direct USGS 01531000, informational 400–8,000 cfs estimate, shallow/debris/bridge/cold-water/water-quality controls, nearby-basecamp-only camping, and handoff before the existing Lowman-to-White-Wagon card |
| Herkimer to Little Falls | Implemented as planning-only canalized flatwater route | Mohawk, 8 miles, Herkimer and Little Falls Rotary Park public launches, live downstream USGS 01347000 context, no numeric runnable range because canal/lock control is not captured by flow, and Lock 17 hard boundary |
| Second Pond to Lake Flower | Implemented as planning-only lock and lake transition | Saranac River, approximately 6 miles, NYSDEC Second Pond and Lake Flower launches, lower-lock passage or portage, Oseetah Lake transition, historical USGS 04272512 context only, no numeric threshold, and separate campground reservation context at the Second Pond end |
| Foot of Kent Falls to Military Turnpike | Implemented as planning-only moving-water segment | Saranac River, approximately 7 miles of Class I water from the Fisherman’s parking/access area below the Kent Falls Powerhouse to the Military Turnpike dam parking/access, same-river downstream USGS 04273500 proxy, no invented numeric cutoff, Kent Falls exclusion, dam/intake/wood/cold-water hazards, nearby-basecamp-only camping, and current carry/landing/operator verification at both facility-adjacent endpoints |
| Military Turnpike to Imperial Mill | Implemented as advanced planning-only whitewater | Saranac River, approximately 2.5 miles of Class II–III water, American Whitewater’s approximately 5-foot minimum-only planning reference with dam-operation caveat, route-map access anchors at the Military Turnpike split and Imperial Mill river-left portage, old crib/broken concrete dam hazards, current NYSDEC/NFCT portage context, and nearby-basecamp-only camping |
| Imperial Mill to Lake Champlain | Implemented as advanced planning-only whitewater | Saranac River, approximately 3 miles of Class II water, American Whitewater’s 5-foot minimum-only planning reference with below-4-foot and high-water context, Imperial Mill river-left portage put-in, current NYSDEC Plattsburgh Lake Champlain launch take-out, bridge/mouth/wake/wind/water-quality hazards, and nearby-basecamp-only camping |
| Downsville to Shinhopple | Implemented as planning-only managed-access flatwater | East Branch Delaware River, 6 miles, current Al’s Sport Store itinerary with one-way vehicle transport, current NYS Parks Shinhopple-area hand launch with ten-car parking, direct USGS 01417000 Downsville gauge, outfitter depth/season context without an invented numeric cutoff, private-bank/cold-water/strainer/rapid-rise hazards, nearby campground/lodging context, and explicit confirmation required for the managed Downsville start |
| Wilmington to Au Sable Forks | Implemented as advanced planning-only whitewater | West Branch Ausable, 11 miles, Lake Placid-published endpoint water-entry pins, Class I–III+ character, spring/heavy-rain guidance, downstream USGS 04275500 proxy, no numeric threshold, dam/boulder/strainer/cold-water hazards, and conditional access because NYSDEC warns much of the branch is inaccessible or unsuitable for general paddling |
| Hulls Falls to Keene | Implemented as advanced planning-only whitewater | East Branch Ausable, 6.3 miles, Lake Placid-published endpoint pins, American Whitewater IV(V) index classification, downstream USGS 04275500 proxy, no numeric threshold, Hulls Falls/wood/bridge/cold-water hazards, and conditional below-falls access requiring field verification |
| Keene to Upper Jay | Implemented as advanced planning-only whitewater | East Branch Ausable, 6.3 miles, Lake Placid-published endpoint water-entry pins, Class II–III water-level-dependent rapids, downstream USGS 04275500 proxy, no numeric threshold, shallow-rock/strainer/cold-water hazards, and conditional access requiring field verification |
| Fort Jackson to Buckton | Implemented as planning-only moderate moving water | Middle Branch St. Regis, approximately 5.3 miles (AW take-out feature at about 6), Fort Jackson Park and Buckton State Forest access context, West Branch USGS 04268800 proxy with 450 cfs lower planning reference, Class I–II with standout Class III features, gorge/wood/cold-water/barbed-wire/bull-field hazards, primitive-camping rules, and field verification at both carries |
| Sidney to Bainbridge | Implemented | Susquehanna, 3.25 miles, direct Bainbridge gauge, public endpoint access, stage guidance, endpoint camping |
| Fairport to Bushnell’s Basin | Implemented as planning-only canal day trip | Erie Canal, 7.7 Canalway miles round trip, accessible Erie Canal Boat Company dock, Ayrault Road bailout, Bushnell’s Basin public dock, Rochester Erie Canal USGS proxy, no numeric threshold, vertical-wall/wake/bridge/cold-water hazards, and nearby-basecamp-only camping posture |
| Moreau Boat Launch to Lock C5 | Implemented as planning-only canal day trip | Champlain Canal, 10.51 Canalway miles one way, Rogers Island Pool/Moreau public ramp to Lock C5 upper launch, Route 4 and Lock C6 intermediate anchors, Fort Edward Hudson River USGS proxy, no numeric threshold, Crocker’s Reef/guard-gate/lock/current/vertical-wall hazards, and nearby-basecamp-only camping posture |
| Fort Edward to Lock C5 Schuylerville | Covered/held as a duplicate official section | Official Section 35 is 11.1 miles from Fort Edward Dock to Lock C5, but the existing Moreau Boat Launch to Lock C5 route covers the substantial downstream corridor; the residual Fort Edward Dock–Moreau segment is approximately 0.6 mile and includes Lock C7, Canal maintenance/workboat activity, vertical walls, and no compelling independent paddling endpoint pair |
| Lock C5 to Stillwater Riverfront Park | Implemented as planning-only canal day trip | Champlain Canal, 8.94 Canalway miles one way, Alfred Z. Solomon gravel-beach launch to Stillwater public park, Fort Hardy and Saratoga bailouts, Fort Edward Hudson River USGS proxy, no numeric threshold, bridge/traffic/wind/current/Stillwater dam hazards, hard take-out before Lock C4, and nearby-basecamp-only camping posture |
| Genesee Waterways Center to Corn Hill Landing | Implemented as planning-only urban river day trip | Genesee River, 6.8 miles round trip, low floating dock at Genesee Waterways Center to Corn Hill car-top launch, direct Rochester USGS gauge with no numeric threshold, rowing/cross-current/dredge/urban-water-quality hazards, hard boundary before Court Street Dam and High Falls, and nearby-basecamp-only camping posture |
| Turning Point Park to Port of Rochester | Implemented as planning-only lower-river connector | Genesee River, approximately 1.8 downstream Blueway miles, current City of Rochester Turning Point and Port public launch locations with Petten Street intermediate hand-carry access, direct Ford Street gauge as upstream trend context, no numeric cutoff, harbor/wake/wind/cold-water/water-quality hazards, hard boundary before Lake Ontario and upstream falls/dams, nearby-basecamp-only camping posture, and USGS same-river imagery |
| Petten Street to Lower Falls boundary out-and-back | Implemented as planning-only urban moving-water outing | Genesee River, approximately 5 planning miles out and back from the seasonal Petten Street car-top dock, direct Ford Street gauge, Lower Falls/Seth Green boundary from American Whitewater, local current/debris/wind/water-quality controls, same-dock return, no Seth Green fishing-access launch claim, and nearby-basecamp-only camping posture |
| Lee’s Landing to St. Helena / Letchworth Gorge | Implemented as permit-only advanced planning route | Genesee River, approximately 5 miles, American Whitewater Class II–III reach with direct Portageville gauge, Letchworth Trail 5 and Trail 13 permitted kayaking access, 9 ft technical / 10.5 ft stronger Class III / 14 ft closure context, steep carries, railroad/waterfall exclusions, and endpoint park camping/lodging context |
| Brockport to Holley Canal Park | Implemented as planning-only canal day trip | Erie Canal, 9.16 Canalway miles round trip, accessible Harvester Park launch to Holley floating dock/kayak launch, Rochester Erie Canal USGS proxy, no numeric threshold, lift-bridge/guard-gate/wake/cold-water hazards, endpoint camping context governed by Village of Holley rules, and current-access verification required |
| Canalside Buffalo to Smith Street / Red Jacket Riverfront Park | Implemented as planning-only urban river day trip | Buffalo River, 6.6 miles round trip, Canalside public low dock to Erie County/Blueway Red Jacket kayak launch, Buffalo River mouth USGS proxy, no numeric threshold, lake-wind/wake/commercial-traffic/industrial/water-quality hazards, and nearby-basecamp-only camping posture |
| Ransom Creek Kayak Launch to Nelson Goehle Public Marina | Implemented as planning-only canal day trip | Erie Canal, 9.38 miles one way, public Ransom Creek beach launch to Lockport Upper Terminal and Nelson Goehle marina, Tonawanda Creek USGS proxy, no numeric threshold, two-lock/hydraulic-race/vertical-wall/bridge hazards, hard portage boundary, and nearby-basecamp-only camping posture |
| Whitehall to Fort Ann | Implemented as planning-only Champlain Canal section | Champlain Canal, approximately 11.1 miles one way, Skenesborough Waterfront Park to Fort Ann Landing, Comstock/Lock C11 intermediate access, Fort Edward Hudson River USGS proxy, no numeric threshold, C11 overflow-dam/turbulence/lock/vertical-wall hazards, and nearby-basecamp-only camping posture |
| Fort Ann to Fort Edward | Implemented as planning-only Champlain Canal section | Champlain Canal, approximately 12 miles one way, Fort Ann Landing to Fort Edward Dock, Lock C9 and C8 intermediate access, Fort Edward Hudson River USGS proxy, no numeric threshold, C9 spillway/C8 vertical-wall/lock/current hazards, Fort Edward hard boundary before C7, and Lock C9 campground context |
| Stillwater to Mechanicville | Implemented as planning-only Champlain Canal section | Champlain Canal, approximately 8 miles one way, Stillwater Riverfront Park to Mechanicville Terminal, Lock C4 and C3 access/hazard controls, Fort Edward Hudson River USGS proxy, no numeric threshold, Stillwater dam/C3 safety-cable/powerplant cross-current hazards, and nearby-basecamp-only camping posture |
| Mechanicville to Waterford | Implemented as planning-only Champlain Canal section | Champlain Canal, approximately 9 miles one way, Mechanicville Terminal to Waterford Point at the Erie–Champlain confluence, Lock C2/Lighthouse/Lock C1 access chain, Fort Edward Hudson River USGS proxy, no numeric threshold, Quack Island/C2/C1 dam and confluence hazards, conservative Lock C1 fallback, and nearby-basecamp-only camping posture |
| Waterford Flight | Implemented as planning-only Erie Canal day trip | Erie Canal, 2.74 Canalway miles one way, Alcathy’s Boat Launch through Locks E6–E2 to Waterford Point, two guard gates, 169-foot total lift, Green Island Hudson River USGS proxy, no numeric threshold, no take-out after Guard Gate 2, lock/workboat/vertical-wall/Crescent dam hazards, and Waterford Harbor endpoint camping context |
| Lock E7 to Waterford Flight | Implemented as planning-only Erie Canal section | Erie Canal, approximately 9.95 miles one way, Lock E7/Vischer Ferry to Alcathy’s Boat Launch, Vischer Ferry dam and lock boundary, Vischer Ferry/Vandenburgh/Mohawk Riverside access, Green Island Hudson River USGS proxy, no numeric threshold, water-chestnut and navigation hazards, and Lock E7 camping context |
| Tonawanda to Amherst | Implemented as planning-only Erie Canal section | Erie Canal, approximately 7 miles one way, Gateway Harbor to Amherst Veterans Canal Park, Niagara Street/Service Drive/Botanical Gardens public access, Tonawanda Creek USGS proxy, no numeric threshold, harbor-event/bridge/wake/channel hazards, and nearby-basecamp-only camping posture |
| Amherst to Lockport | Implemented as planning-only Erie Canal section | Erie Canal, approximately 10.6 miles one way, Amherst Veterans Canal Park to Lockport Upper Terminal, Ransom Creek and Guard Gate 18 access context, Tonawanda Creek USGS proxy, no numeric threshold, Deep Cut no-exit/vertical-wall/Lockport hydraulic hazards, and nearby-basecamp-only camping posture |
| Lockport to Gasport | Implemented as planning-only Erie Canal section | Erie Canal, approximately 8 miles one way, Lockport Upper Terminal to the current Gasport Bolton Road/Marina ramp, Wide Waters/Goehle and Gasport Landing access context, Tonawanda Creek USGS proxy, no numeric threshold, Lockport hydraulic/traffic/lift-bridge/Guard Gate 17 hazards, and endpoint overnight context requiring current permission |
| Gasport to Medina | Implemented as planning-only Erie Canal section | Erie Canal, approximately 10.5 miles one way, Gasport ramp to Bates Road Ramp in Medina, Middleport Guard Gate Boat Ramp and Canal Port Marina access context, Tonawanda Creek USGS proxy, no numeric threshold, bridge/guard-gate/vertical-wall/Medina waste-weir/hydroelectric hazards, and Middleport/Gasport/Medina overnight context requiring current permission |
| Medina to Albion | Implemented as planning-only Erie Canal section | Erie Canal, approximately 8.5 miles one way, Bates Road/Guard Gate 15 boundary to Albion Boat Launch, Culvert 96 and lift-bridge/gate navigation landmarks, Tonawanda Creek USGS proxy, no numeric threshold, limited-egress/bridge/guard-gate/workboat hazards, and nearby managed basecamp only because Albion has no overnight parking |
| Albion to San Souci Canal Park | Implemented as planning-only Erie Canal section | Erie Canal, approximately 11.9 miles one way, Albion Boat Launch to San Souci Canal Park, Holley Canal Park bailout and camping context, Tonawanda Creek USGS proxy, no numeric threshold, high-traffic/lift-bridge/Guard Gate 13/workboat hazards, and Holley camping subject to current park rules |
| Brockport to Spencerport | Implemented as planning-only Erie Canal section | Erie Canal, approximately 7.7 accessible launch-to-launch miles within official Section 7’s 10.7-mile boundary, Brockport Welcome Center/Harvester Park to Spencerport Village Docks, Arrowhead/Heritage bailout context, same-canal USGS proxy, no numeric threshold, high-traffic/lift-bridge/Guard Gate 11 hazards, and nearby managed basecamp only |
| Spencerport to Genesee River | Implemented as planning-only Erie Canal section | Erie Canal, approximately 10.8 miles from the Spencerport boundary to Genesee Waterways Center, Heritage/Henpeck public access context, same-canal USGS proxy, no numeric threshold, urban traffic/bridge/guard-gate/rowing hazards, and hard take-out before the Genesee River/Court Street Dam boundary |
| Genesee River to Bushnell’s Basin | Implemented as planning-only Erie Canal section | Erie Canal, 9.3 official Canalway miles, East Guard Lock boundary through Brighton Reserve, Lock E33/E32 controls, DEC Pittsford, Port of Pittsford, Great Embankment, and Bushnell’s Basin, same-canal USGS proxy, no numeric threshold, lock/spillway/rowing/wake/Great Embankment hazards, and nearby managed basecamp only |
| Bushnell’s Basin to Macedon | Implemented as planning-only Erie Canal section | Erie Canal, approximately 11.5 official Canalway miles, Bushnell’s Basin through Ayrault Road, Perinton Park, Fairport Harbor, eastern Monroe County, and Macedon Canal Park/Lock E30, same-canal USGS proxy, no numeric threshold, Fairport lift-bridge/vertical-wall/wake/guard-gate hazards, Lock E30 take-out, and Red’s Twilight endpoint campground context |
| Macedon to Newark | Implemented as planning-only Erie Canal section | Erie Canal, approximately 10.2 official Canalway miles, Lock E30 through Lock 60/E29, Pal-Mac, Port of Palmyra, Palmyra Boat Launch, and Widewaters Canal Park, same-canal USGS proxy, no numeric threshold, lock/aqueduct/spillway/widewater hazards, Widewaters mandatory take-out, and nearby managed basecamp only |
| Tuxedo to H. Pierson Mapes Flat Rock Park | Implemented as planning-only moving-water route | Ramapo, about 6 miles, mostly Class I–II with higher-consequence dams/drops and wood, conditional Tuxedo DEC launch to Rockland County Flat Rock canoe access, downstream USGS 01387420 proxy, 2.9 ft recent runnable reference with no upper threshold, cold-water/strainer/low-head-dam hazards, nearby-basecamp-only camping posture |
| Croton Dam to Echo Canoe Launch | Implemented as advanced planning-only whitewater | Croton River, about 3 planning miles, American Whitewater Class II–III with Class IV consequences, direct New Croton Dam gauge, approximately 3 ft shallow-water screen with no upper threshold, conditional dam-side access, mandatory Echo public take-out, low-head-dam/wood/cold-water hazards, nearby-basecamp-only camping posture |
| Boquet River Nature Preserve to Noblewood Park | Implemented | Lower Boquet, approximately 3 miles, public Nature Preserve boat-launch area to Noblewood Park cartop launch at the Lake Champlain mouth, direct Willsboro gauge, shallow/slow visual low-water posture, private-bank/strainer/cold-water/mouth-wind hazards, and seasonal endpoint camping context |
| Beaver Meadow Brook to Northway | Implemented as advanced planning-only whitewater | Upper Boquet, 17.6 miles, current Lake Placid endpoint pins, Class II–III, downstream Willsboro USGS proxy, no numeric cutoff, conditional access, explicit cold-water/wood/private-bank/mandatory-takeout safeguards, and nearby-basecamp-only camping posture |
| Northway to Boquet | Implemented as advanced planning-only whitewater | Upper Boquet, 16.6 miles, current Lake Placid endpoint pins, Class II–IV, downstream Willsboro USGS proxy, no numeric cutoff, conditional access, explicit cold-water/wood/private-bank/mandatory-takeout safeguards, and nearby-basecamp-only camping posture |
| Route 73 to Split Rock Falls boundary | Implemented as advanced planning-only whitewater | Upper Boquet, approximately 3.9 miles from the DEC Boquet River Parking Area / Route 73 North Fork access to the DEC primitive tent-site riverbank above Split Rock Falls, American Whitewater Class IV–V hazards, Ausable River proxy gauge, no numeric threshold, expert-only cold-water/wood/rescue controls, and a hard take-out before Split Rock Falls |
| Bailey Road to Donnattsburg Road | Implemented as advanced planning-only whitewater | Independence River, 5.7 miles, American Whitewater Class I–III(IV), Bailey Road public-road/water crossing to Donnattsburg bridge, direct USGS 04256000 context, current route-status guidance rather than an invented fixed cutoff, wood/continuous-whitewater/cold-water/limited-bailout hazards, lower-section hard boundary, and nearby DEC roadside camping context |
| Lows Lower Dam to western Lows Lake | Implemented as planning-only wilderness canoe route | Bog River Flow/Lows Lake, approximately 14.5 water miles with the Upper Dam carry, official DEC hand launches, 39 designated shoreline campsites, wind/whitecap/dam/private-shore/loon/bear hazards, same-basin Raquette proxy only, and expedition-style turnaround/shuttle safeguards |
| Lows Lower Dam to Bog River Falls | Implemented as advanced planning-only whitewater | Lower Bog River / Round Lake Outlet, approximately 8.5 planning miles, DEC Lower Dam hand launch to Bog River Falls public-entry context, American Whitewater Class IV–V route and 4.5–7 ft North Creek proxy band, spring-only rapids, three named carries, dam/tree/cold-water/remote hazards, nearby designated-campsite context, and AW/DEC naming discrepancy explicitly bounded |
| Inlet to Wanakena | Implemented as advanced planning-only whitewater | East Branch Oswegatchie, approximately 2.2 miles, American Whitewater Class II–IV reach, DEC Inlet Road hand launch to Wanakena town-beach launch context, downstream same-river USGS 04262000 proxy, Moore Trail carry/scouting context, cold-water/wood/limited-rescue hazards, and nearby-basecamp-only camping posture |
| Union Falls to Casey Road Carry | Implemented as advanced planning-only whitewater | Saranac River, approximately 4.2 miles, American Whitewater Class II–III reach, DEC Union Falls Dam hand launch to state-land Casey Road canoe carry, downstream dam-affected USGS 04273500 proxy, dam/wood/cold-water hazards, disputed Silver Lake Road exclusion, and nearby-basecamp-only camping posture |
| Kirkwood to Binghamton | Implemented | Susquehanna, 4–7 miles, public three-point chain, direct Conklin gauge, flow band and dam warning |
| William Hill Park to Grippen Park | Implemented | Susquehanna, 2.35–6 miles, public four-point chain, direct Vestal gauge, segment options |
| Apalachin to Hickories Park | Implemented | Susquehanna, 5.25–6.4 miles, public three-point chain, direct Owego gauge, endpoint camping |
| Marshland Road | Hold | Short Hiawatha Island loop/flatwater itinerary; overlaps the Apalachin-to-Hickories corridor and does not yet have a separate route boundary |
| Kinsella Park to Cohocton Street | Implemented | Chemung, 4.25 miles, experienced rating, direct Corning gauge, confluence/bridge hazards |
| Cohocton Street to Bottcher’s Landing | Implemented | Chemung, 6 miles, public DEC intermediate and endpoint access, direct Corning gauge, dam-remnant/braid/strainer warnings |
| Lowman to Waverly | Implemented | Chemung, 11.45 miles, experienced rating, direct Chemung gauge, cross-border segment, nearby camping context |
| Greene to Chenango Forks | Implemented | Chenango, 12 miles, direct Chenango Forks-area gauge, NYSDEC hand-launch endpoints, published flow band, confluence caveat |
| North Norwich to Greene | Implemented as planning-only moving-water route | Chenango, approximately 22 planning miles, current NYSDEC North Norwich/Norwich/Greene hand-launch chain, Greene same-river proxy gauge, no invented numeric cutoff, private-water/access warning, shallow-water/strainer/cold-water hazards, and nearby-basecamp-only camping posture |
| Sherburne to North Norwich | Implemented as planning-only moving-water route | Chenango, approximately 5.3 planning miles, current NYSDEC/NYS Parks Sherburne and North Norwich hand launches, direct Sherburne gauge, historical stage context without an invented cutoff, quickwater/strainer/wood/bridge hazards, and nearby-basecamp-only camping posture; bounded before the separate North Norwich-to-Greene route |
| Central Bridge to Esperance | Implemented as planning-only public-launch gap section | Schoharie Creek, approximately 3 planning miles between current NYSDEC Central Bridge and Esperance hand launches, direct Esperance stage gauge, no numeric cutoff, shallow-riffle/bridge/debris/cold-water/flash-flood hazards, 200- and 500-foot carry controls, and no on-route camping claim |
| Jean Van Pelt to Sarah Taylor | Implemented as planning-only moving-water route | Fishkill Creek, approximately 3.5 planning miles, current watershed guide plus Town/Village/Dutchess County park access, historical same-river USGS context with no current data, no numeric cutoff, rapid-rise/strainer/cold-water/private-bank/dam hazards, and nearby-basecamp-only camping posture |
| Rockdale to Sidney | Implemented | Unadilla, 8 miles, direct Rockdale gauge, public Route 8/Batterson and Sidney confluence access, published 150–3,000 cfs band, low-water and strainer warnings |
| Hale Eddy to Balls Eddy | Implemented | West Branch Delaware, 6 miles, direct Hale Eddy gauge, NYSDEC/PFBC cross-border access, published 150–2,500 cfs band, cold-water/private-bank/bridge warnings |
| Delhi to Walton | Implemented as planning-only moving-water route | West Branch Delaware, 18.7 miles, current Delhi Riverwalk, Hamden, and Walton hand launches, direct Delhi gauge, published 300–1,200 cfs band, cold-water/low-water/strainer/bridge/private-bank warnings, nearby Bear Spring Mountain DEC campground context |
| Fish's Eddy to Hancock | Implemented as planning-only proxy route | East Branch Delaware, 9 miles to the forks, live Hancock same-river proxy, NYSDEC Fish's Eddy and Cadosia hand launches, published 200–3,000 cfs band, cold-water/low-water/private-bank warnings; Cadosia is the verified take-out |
| Hancock to Callicoon | Implemented as planning-only long-distance corridor | Main-stem Upper Delaware, approximately 27 miles between public Hancock and Callicoon access areas, Lordville and Long Eddy intermediate exits, direct Callicoon stage/discharge context, NPS 6-foot mandatory-PFD and 8–12-foot skilled-paddler guidance, strainers/eel-weir/cold-water/private-bank/limited-cell hazards, and nearby-basecamp-only camping posture |
| Hancock to Lordville | Implemented as planning-only access-to-access section | Main-stem Upper Delaware, approximately 9 miles between designated Hancock and Lordville NYSDEC canoe/kayak accesses, downstream Callicoon gauge clearly labeled as a same-river proxy, NPS height/PFD/current/strainer guidance, small-lot and hand-carry logistics, no shoreline camping, and route-specific proxy-gauge image |
| Lordville to Long Eddy | Implemented as planning-only access-to-access section | Main-stem Upper Delaware, approximately 9.5 miles between designated Lordville and Long Eddy public accesses, downstream Callicoon gauge clearly labeled as a same-river proxy, NPS height/PFD/current/strainer guidance, gravel-landing and shuttle logistics, no shoreline camping, and route-specific proxy-gauge image |
| Callicoon to Narrowsburg | Implemented | Main-stem Delaware, about 14 miles by NPS access-distance table (CanWePaddle listing says 9), direct Callicoon gauge, Callicoon NY and Narrowsburg public access, published 400–8,000 cfs band, Skinners Falls/cold-water/private-bank warnings, nearby camping context |
| Port Jervis to Milford | Implemented | Main-stem Delaware, 8 miles, direct Port Jervis gauge, West End Beach and NPS Milford Beach public access, published 700–12,000 cfs band, cold-water/wind/wake/private-bank warnings, nearby NPS camping context |
| Gowanda to Sunset Bay | Implemented conditionally | Cattaraugus Creek, 13 miles, direct Gowanda gauge, Gowanda Gateway Park and Sunset Bay public water-entry anchors, published 150–3,000 cfs band, rapid-rise/strainer/cold-water/Lake Erie warnings; route intersects Seneca Nation Cattaraugus Territory and requires current permission/restriction verification |
| Zoar Bridge to Gowanda | Implemented as advanced planning-only whitewater | Main-branch Cattaraugus Creek, approximately 9.5 miles from the DEC North Otto Road hand launch to the Gowanda/Aldrich Street take-out, direct Gowanda gauge, NYSDEC stage-based guidance from mostly floatable above 2.0 ft through expert-only above 4.0 ft, Class II–III/variable Class II–IV gorge hazards, 250-foot carry/no-motor rule, strainers/rapid-rise/cold-water/remote-rescue risks, and nearby-basecamp-only camping posture |
| Inlet to High Falls | Implemented as planning-only wilderness out-and-back | Oswegatchie, 8 miles, DEC Inlet Road hand launch, High Falls portage/turnaround boundary, downstream same-river proxy gauge, published 80–1,500 cfs band, designated river campsites/lean-tos, remote-rescue and wilderness logistics |
| Heuvelton to Ogdensburg | Implemented as planning-only flatwater corridor | Oswegatchie River, approximately 10 miles, current municipal Heuvelton launch and Eel Weir State Park launch, recurring St. Lawrence Valley Paddlers course to the Lafayette Spring Street bridge, direct near-Heuvelton USGS gauge, shallow section and short Eel Weir Dam portage, urban-mouth finish, and nearby-basecamp-only camping posture |
| Axton Landing to The Crusher | Implemented as planning-only context route | Raquette River, 9 miles, DEC Axton Landing and Crusher launches, downstream same-river proxy gauge, no published numeric threshold for the lake-regulated reach, Adirondack river-camping context, cold-water/wind/motorboat/private-shoreline cautions |
| Dead Creek to Jamestown Falls | Implemented as advanced planning-only whitewater | Raquette River, 14.5 miles, NYSDEC Dead Creek Route 3 access, Moody Falls intermediate hand launch, Jamestown Falls hand launch/campsite, Class II–IV broader-section guidance, dangerous falls and long portages, regulated South Colton proxy gauge with no numeric threshold, and private-bank/bridge/cold-water hazards |
| Forked Lake Campground to Deerland | Implemented as advanced planning-only whitewater | Raquette River, approximately 4.5 planning miles, current NYSDEC Forked Lake campground hand launch and state-land Deerland carry/take-out context, Class II–III rock gardens, mandatory Buttermilk Falls portage, Piercefield downstream proxy with approximately 4.5 ft low runnable planning reference, endpoint campground context, and cold-water/wood/access hazards |
| Starbuckville to Riverbank | Implemented as advanced direct-gauge whitewater | Schroon River, 6.7 miles, American Whitewater Class II–III reach, NYSDEC Starbuckville public hand launch, Riverbank Warren County canoe access, direct Riverbank stage gauge, approximately 3.9 ft minimum planning guidance, Big Drop/private-bank/dam/cold-water hazards, and nearby basecamp-only camping posture |
| Warrensburg to Thurman Station | Implemented as advanced planning-only whitewater | Schroon River, approximately 0.6 mile, American Whitewater Class II–III reach, River Street public canoe access and small-park endpoint anchor, direct downstream Riverbank stage context, bridge/wood/cold-water/private-bank hazards, conditional landing verification, and nearby basecamp-only camping posture |
| Beaches Corners to Jewett Center | Implemented as advanced direct-gauge whitewater | East Kill, 5.4 miles, American Whitewater Class II–IV bridge-to-bridge reach, Riverfacts route-specific water-adjacent endpoint anchors, direct Jewett Center gauge with 300–1,200 cfs planning band, Mill Hollow Class III feature, rain/bridge/strainer hazards, conditional public carry verification, and nearby Catskills basecamp-only camping posture |
| Dolgeville to Route 5 | Implemented as direct-gauge moving water | East Canada Creek, approximately 8 miles, Montgomery County route and endpoint coordinates, Brookfield access-study Class I–III classification, direct East Creek gauge near the take-out with no invented numeric threshold, Dolgeville dam/bridge/ice-debris hazards, conditional public carry verification, and nearby road-access campground posture |
| Powley Place out-and-back | Implemented as planning-only short access outing | East Canada Creek, approximately 4 round-trip water miles from the current DEC Powley Place undeveloped hand launch to the island/head-of-rapids turn-around, same-river USGS 01348000 proxy with no numeric cutoff, beaver-dam/shallow-water/cold-water/strainer hazards, DEC Ferris Lake Wild Forest camping context, and hard boundary before the unsupported Powley-to-Stratford through-route |
| Middleville to Kast Bridge | Implemented as regulated direct-gauge moving water | West Canada Creek, about 5.7 miles, American Whitewater Class II–II+ teaching section, NYSDEC Rec Site 9 and Kast Bridge access-study anchors, direct Kast Bridge gauge with 600–10,000 cfs planning band, Hinckley/power-operation surges, low-head dam and bridge hazards, nearby riverfront basecamp, and conditional landing verification |
| Route 95 to Route 11 (Lorraine Gulf) | Implemented as advanced planning-only whitewater | South Sandy Creek, 11.6 miles per American Whitewater but about 15.5 planning miles by published endpoint geometry, conditional Route 95 access-area anchor, NYSDEC Lakeview WMA cartop launch, direct Sandy Creek gauge near Adams, bridge-based waterline guidance with no standardized maximum, remote/strainer/cold-water hazards, and no route camping claim |
| St. Regis Falls to Fort Jackson (Silver Staircase) | Implemented as advanced planning-only whitewater | Middle Branch St. Regis River, 11.1 miles, American Whitewater Class III+(IV) reach, Town of Waverly riverfront campground put-in, conditional Nicholville bailout and Fort Jackson take-out anchors, West Branch USGS proxy gauge, spring/high-water scouting, dam/slide/strainer/cold-water hazards, and endpoint campground context |
| Route 458 to St. Regis Falls | Implemented as permission-gated advanced planning-only whitewater | Middle Branch St. Regis River, approximately 4.1 miles, current NYSDEC Santa Clara Flow public upstream launch, Town of Waverly campsite finish requiring permission, American Whitewater Class II–V+ flow-dependent character, West Branch USGS proxy, dam/wood/bedrock/cold-water/rescue controls, and endpoint campground context |
| Five Mile Hand Launch #4 to #1 | Implemented as seasonal high-water planning-only moving water | West Branch St. Regis River, approximately 5 planning miles, four current NYSDEC Five Mile hand-launch parking/access areas, May 1–September 30 public-use window, high-water-only navigation, Main Camp and Saunders Camp signed portages, direct USGS 04268800 context, logging/road/cold-water/wood hazards, and nearby-basecamp-only camping |
| Lows Lower Dam to Oswegatchie Inlet | Implemented as planning-only wilderness traverse | Bog River/Lows Lake/Oswegatchie, approximately 30 route miles with a source-documented 3.5-mile Oswegatchie Canoe Carry, public NYSDEC Lower Dam and Inlet hand launches, designated Lows Lake and Oswegatchie camping, same-river USGS 04262000 proxy, wind/whitecaps, cold-water, beaver, wood, High Falls, private-shoreline, and remote-rescue controls |
| Cortland to Marathon | Implemented | Tioughnioga, 10 miles, direct Cortland gauge, Yaman Park/Marathon public access, published 100–2,500 cfs band, rapid-rise/strainer/cold-water warnings |
| Willet to Landers Corners | Implemented as planning-only moving-water section | Otselic River, approximately 5.5 planning miles between the current NYS Parks Route 41/26 and Landers Corners public hand launches, direct Cincinnatus USGS gauge context, no invented numeric cutoff, shallow-water/rock/bridge/wood/cold-water hazards, and nearby-basecamp-only camping posture |
| Esperance to Burtonsville | Implemented | Schoharie Creek, 7 miles, direct Burtonsville gauge, NYSDEC endpoint launches, published 100–1,500 cfs band, advanced whitewater classification for reported Class II+ gorge/ledge features |
| Rotterdam Junction to Freeman’s Bridge | Implemented as planning-only Erie Canal/Mohawk section | Erie Canal/Mohawk, approximately 9.0 miles, official Section 27, E9 upper through Mabee Farm, Rotterdam Kiwanis, Maalwyck/E8, Freedom Park, Gateway Landing, and Freeman’s Bridge, same-basin USGS proxy, no numeric threshold, E9/E8 movable-dam and carry/island-channel hazards, and nearby private Arrowhead RV basecamp requiring permission |
| Freeman’s Bridge to Lock E7 | Implemented as planning-only Erie Canal/Mohawk section | Erie Canal/Mohawk, approximately 7.0 miles, official Section 28, Freeman’s Bridge through Mohawk Harbor, Aqueduct Park, Mohawk Landing, and Lock E7 Boat Ramp, same-basin USGS proxy, no numeric threshold, Vischer Ferry Dam 100-foot exclusion/direct-channel/strong-current hazards, and Lock E7 endpoint camping permitted subject to current rules |
| Lock E7 to Waterford Flight, south side | Implemented as planning-only Erie Canal section | Erie Canal/Mohawk, approximately 8.0 miles, official Section 30, Lock E7 through Niskayuna Lions Park and Mohawk Riverside to Freddie’s Park, same-basin USGS proxy, no numeric threshold, Vischer Ferry dam/100-foot exclusion, water-chestnut, vegetated landing, and Waterford Flight boundary hazards |
| Waterford / Lansingburgh crossing | Implemented as planning-only Hudson–Mohawk confluence route | Hudson/Mohawk, approximately 1.0 mile, official Section 31, Waterford Point Boat Ramp to Lansingburgh Boat Ramp, Green Island USGS proxy, no numeric threshold, high-traffic powerboat/tug/barge/confluence hazards, and nearby Waterford services without a camping claim |
| Glens Falls Feeder Canal: Queensbury to Hudson Falls | Implemented as planning-only feeder-canal route | Glens Falls Feeder Canal, approximately 5 miles, official Section 34, Feeder Dam/Overlook Park through Shermantown Road to Martindale Boat Basin, Fort Edward Hudson River proxy, no numeric threshold, Feeder Dam/low-structure/industrial/private-bank hazards, and mandatory take-out before the Five Combines locks |
| Paul T. Given to Nissequogue River State Park | Implemented as planning-only tidal route | Nissequogue River, approximately 5.5 miles, Paul T. Given to Nissequogue River State Park with conditional Sunken Meadow mouth access, historical USGS 01304000 same-river context, NOAA Northport Bay tide planning, no numeric threshold, reversing-current/mud-flat/shallow-water/park-access hazards, and nearby-basecamp-only camping posture |
| Montauk Highway to Beaver Dam Road | Implemented as planning-only tidal route | Carmans River, approximately 2 miles, NYSDEC Montauk Highway hand launch with 300-yard carry and cooperative Wertheim access to the Town of Brookhaven Beaver Dam Road kayak launch, USGS 01305000 Yaphank freshwater proxy, NOAA Great River tide context, low-bridge/shallow-water/wind/refuge/water-quality hazards, and nearby-basecamp-only camping posture |
| Peconic River River Road to Edwards Avenue | Implemented as planning-only upper reach | Peconic River, approximately 2 miles, NYSDEC River Road East/West hand launches to the Mill Road/Edwards Avenue access, downstream USGS 01304500 proxy, no numeric threshold, shallow-water/vegetation/debris/dam hazards, and mandatory take-out before the Edwards Avenue dam/weir |
| Peconic River Forge Pond to Upper Mills | Implemented as planning-only lower-freshwater reach | Peconic River, approximately 3 miles, NYSDEC Forge Pond launch to the Suffolk County Peconic River Canoe Launch/Upper Mills, direct USGS 01304500 context, no numeric threshold, shallow-water/vegetation/structure/urban-water-quality hazards, and nearby-basecamp-only camping posture |
| Peconic River Upper Mills to Weeping Willow | Implemented as planning-only lower-river gap section | Peconic River, approximately 1.5 planning miles, official Upper Mills canoe launch through the lower DEC access to Weeping Willow Park, direct USGS 01304500 context, no numeric threshold, shallow-water/vegetation/debris/water-quality/wind hazards, Upper Mills dam and downstream estuary boundaries, and nearby-basecamp-only camping posture |
| Peconic River Weeping Willow to Indian Island | Implemented as planning-only tidal/estuarine reach | Peconic River, approximately 3 tidal miles, Weeping Willow Park through lower Riverhead to Indian Island County Park, direct USGS 01304500 river-stage context plus NOAA tide planning, no numeric threshold, shallow-channel/wind/marina/water-quality hazards, area-representative Indian Island endpoint coordinate, and endpoint campground posture |
| Avon to Scottsville | Implemented | Genesee, 13 miles, direct Avon gauge, NYSDEC endpoint launches, published 400–6,000 cfs band, Blueway logjam/bridge/rock and downstream dam/waterfall boundary warnings |
| Mount Morris to Avon | Implemented | Genesee, 14 miles, direct Mount Morris gauge, John Wesley Powell Park and NYSDEC Avon hand launch, published 300–5,000 cfs band, below-dam/woody-debris/long-day warnings |
| Fishell Road Honeoye Creek out-and-back | Implemented as planning-only out-and-back | Honeoye Creek, about 7 round-trip miles, official NYSDEC/NYS Parks Fishell Road hand launch used as both start and finish, direct Honeoye Falls gauge context, shallow-water/wood/fast-rise/cold-water hazards, Golah railroad bridge as turnaround landmark only, and no on-route camping claim |
| Gardiner to New Paltz | Implemented | Wallkill, 7 miles, direct Gardiner gauge, active Gardiner water-trail launch plus NYSDEC New Paltz hand launch, published 150–3,000 cfs band, low-water/water-quality/sturgeon-pool dam warnings |
| New Paltz to Rosendale | Implemented as planning-only public-launch gap section | Wallkill River, approximately 5.5 planning miles, current NYSDEC New Paltz and Rosendale hand launches, active Wallkill Water Trail access sequence, direct Gardiner gauge as upstream trend context, under-1,000 cfs shallow / 1,000–2,000 cfs navigable / above-2,000 cfs swift-water context, bloom/wood/private-bank hazards, and hard boundary before Sturgeon Pool |
| Eagleville to Battenville | Implemented as planning-only upper float | Batten Kill, approximately 11 miles from the current NYSDEC Batten Kill State Forest Eagleville Road hand launch to the named CR 61/Battenville access, direct Battenville stage context, field-observed 4.4–4.8 ft planning references without a fixed cutoff, Class I riffle/flatwater/current character, strainer/downed-tree/private-bank/congestion hazards, and nearby-basecamp-only camping posture |
| Lower Owego Creek out-and-back | Implemented as planning-only public-launch loop | Owego Creek, approximately 3.5 river miles round trip from the NYSDEC Canal Street hand launch at the mouth toward the USGS 01514000 gauge corridor and back, American Whitewater 2–5 ft planning screen, direct active gauge, bridge/railroad/wood/shallow-water/urban-water-quality hazards, no public Dr. Knapp take-out claim, and nearby Hickories Park basecamp context |
| Battenville to Clarks Mills | Implemented with access caveats | Batten Kill, route source estimates 6 miles while endpoint anchors span 7.4 miles straight-line, direct Battenville gauge, named route access plus DEC public-fishing-rights mapping and lower-falls access context, published 150–1,500 cfs band, generalized-coordinate/private-bank/lower-falls warnings |
| Cooks Falls to Peakville | Implemented with access caveats | Beaver Kill, 4 miles, direct Cooks Falls gauge, named Cooks Falls/Peakville access pins and regional access context, published 150–1,500 cfs band, Class II/low-water/strainer/private-bank warnings, nearby DEC campground |
| West Falls to Mill Road | Implemented as planning-only event-dependent whitewater | Cazenovia Creek, approximately 10 planning miles between the public West Falls/JP Nicely and Mill Road creek-side park anchors, within the American Whitewater Aurora–West Seneca Class II–III corridor, direct Ebenezer gauge, about 6.5 ft planning reference, dam/ledge/wood/rapid-rise/cold-water/private-bank hazards, and nearby-basecamp-only camping posture |
| Mount Marion to Saugerties | Implemented with access caveats | Esopus Creek, 5 miles, direct Mount Marion gauge, route-source Mount Marion area access plus permitted NYSDEC/Village Saugerties endpoint, published 100–2,000 cfs band, low-water/bridge/private-bank/tidal-transition warnings |
| Altmar to Pineville | Implemented as advanced whitewater | Salmon River, 3.5 miles, direct Pineville gauge, NYSDEC Lower Fly/Altmar and Route 48 drift-boat launches, published 150–1,200 cfs band, Lighthouse Hill release/cold-water/fishing-pressure/gravel-deposition warnings |
| Pineville to Compactor Pool | Implemented as advanced planning-only moving water | Salmon River, approximately 3.6 planning miles between current NYSDEC Route 48 and County Route 2A drift-boat launches, direct Pineville gauge, adjacent 150 cfs planning reference without a separate local cutoff, Lighthouse Hill release/cold-water/fishing-pressure/wood hazards, and hard boundary before the separate Pulaski-to-Black-Hole card |
| Route 28 Overlook to Middleville | Implemented as planning-only moving water | West Canada Creek, approximately 6 miles between access-study Route 28 Overlook north of Poland and NYSDEC Route 28 North Middleville, Class I–II context, Kast Bridge USGS proxy, 300 cfs/301–900 cfs tubing planning screen without a local safety cutoff, reservoir-release/cold-water/strainer/traffic hazards, conditional carry-in access, and hard handoff before the separate Middleville-to-Kast card |
| Lyons Falls to Carthage | Implemented as planning-only proxy route | Black River, approximately 41 miles across the official canoe-trail segment chain, public Lyons Falls and Carthage launches, Watertown gauge explicitly marked as downstream same-river proxy, published 500–8,000 cfs band, multi-day portage/dam/low-water/camping posture |
| Forestport Reservoir to Hawkinsville | Implemented as advanced planning-only whitewater | Black River, 6.6 miles, current NYSDEC Forestport Reservoir public launch to Hawkinsville access, distinct American Whitewater Class II with standout Class III opening slides, direct USGS 04252500 with approximately 4.5–14 ft planning context, regulated-release/wood/cold-water/dam hazards, Hawkinsville boundary, and nearby-basecamp-only camping posture |
| Hawkinsville to Norton Road | Implemented as advanced planning-only whitewater | Black River, 5.6 miles, current NYSDEC Hawkinsville and Norton Road canoe-access context, distinct American Whitewater Class III reach with opening hydraulic, continuous boulder rapids, power-line and undercut limestone features, direct USGS 04252500 with approximately 4.5–12 ft planning context and 7.3 ft optimum reference, mandatory Norton Road finish, and nearby-basecamp-only camping posture |
| South Lake to South Branch Black River confluence loop | Implemented as advanced planning-only whitewater | South Branch Black River, approximately 10.4 miles round trip, current NYSDEC South Lake hand launch to the American Whitewater confluence boundary and back, downstream USGS 04252500 proxy with no local cutoff, Class II–IV lake-crossing/boulder-garden/dam/wood/cold-water hazards, confluence water-only turnaround, designated South Lake camping context, and no claimed Farr Road vehicle take-out |
| Rio Powerhouse to Upper Delaware | Implemented as advanced release-dependent whitewater | Mongaup River, approximately 3 miles, American Whitewater Class II+–III Rio Reach from the Rio Powerhouse to the NPS/DEC Route 97 hand-carry access, direct USGS 01433500 with AW 400–1,200 cfs planning correlation, Eagle Creek’s official 435-cfs-per-unit scheduled-release gate, powerhouse/dam/wood/bridge/cold-water hazards, nearby-basecamp-only camping posture, and no unrestricted non-release access claim |
| Piercefield to Parmenter Site | Implemented as advanced planning-only whitewater | Raquette River, 17.6 American Whitewater miles from the Piercefield public beach to the NYSDEC Parmenter Hand Launch, direct USGS 04266500 with approximately 1,700–8,000 cfs planning context and powerplant-driven fluctuation, Class II–V Sols/Moosehead/Moody/Jamestown hazards, public Sevey/Moody/Jamestown portage chain, expert-only guidance, Carry Falls boundary, and nearby-basecamp-only camping posture |
| Raymondville to Massena Springs | Implemented as planning-only lower-Raquette corridor | Raquette River, 7.8 canoe miles within NYSDEC’s 8.4-mile river-section listing, River Road access below Raymondville Dam to Massena Springs Town Park boat launch, direct USGS 04268000 with no asserted numeric cutoff, four named rapid/portage areas, shallow-water and power-generation-change warnings, downstream St. Regis Indian Reservation permission boundary, and nearby-basecamp-only camping posture |
| Watertown to Dexter / Fish Island | Implemented as advanced planning-only whitewater | Black River, 7.4-mile DEC Watertown-to-Dexter boundary with the distinct 4-mile American Whitewater canyon inside it, Waterworks/Route 3 public access context to municipal Fish Island Park launch, direct Watertown USGS 04260500, 1,000–6,000 cfs American Whitewater planning band, Glen Park portage/dam/strainer/cold-water/urban-access hazards, and nearby-basecamp-only camping posture |
| Penn Yan to Dresden | Implemented as advanced planning-only whitewater | Keuka Outlet, 9.25-mile American Whitewater feature sequence from the public Keuka Street/Outlet access context to the Dresden take-out area, direct Dresden USGS 04232482, 250–1,000 cfs American Whitewater planning band, mandatory Keuka Falls and Cascade Falls carries, water-quality/strainer/cold-water hazards, and nearby-basecamp-only camping posture |
| Orleans to Phelps | Implemented as advanced planning-only whitewater | Flint Creek, approximately 6.7 river miles from the Waddell Road/Orleans water-entry anchor to the Phelps take-out, direct USGS 04235250, about 250 cfs American Whitewater runnable-but-low planning context, seasonal ledges/low bridges/strainer/Old Mill Falls hazards, conditional road/trail access, and nearby-basecamp-only camping posture |
| East Nassau to Valatie | Implemented as planning-only moving-water route | Kinderhook Creek, 18.7 American Whitewater miles, East Nassau fishing-access/preserve context to Valatie River Street Park/Beaver Mill context, direct USGS 01361000, no asserted numeric cutoff, scenic Class I–II with occasional Class III/strainer/private-bank hazards, conditional boat-entry verification, and nearby-basecamp-only camping posture |
| Gray’s Crossing to Driscoll Road Landing | Implemented as planning-only recreational blueway | Kayaderosseras Creek, 4.1 miles of flat water, public Gray’s Crossing and Driscoll Road canoe/kayak access, historical same-river USGS 01330500 context with no numeric cutoff, shallow-water/wood/strainer/cold-water/access-carry hazards, Saratoga Spa State Park camping/lodging context, credited route image, and curated geometry |
| Stuyvesant Falls to Stockport / Station Road | Implemented as advanced planning-only whitewater | Lower Kinderhook Creek, approximately 6.7 planning miles, Stuyvesant Falls public cartop-launch/portage context to the NYSDEC Station Road public boat launch, direct USGS 01361000 trend context, mandatory falls/dam portages, shallow/tidal/railroad/private-bank hazards, nearby-basecamp-only camping posture, credited same-river image, and curated geometry |
| Schodack Island State Park to Dutchman’s Landing | Implemented as advanced planning-only tidal water-trail route | Hudson River, approximately 23 estuary miles, public State Parks/Greenway launches at both ends, direct USGS 01361450 Catskill stage context, no cfs cutoff, tide/wind/wave/wake/commercial-traffic/cold-water hazards, Stockport/Coeymans bailout context, Schodack endpoint campground posture, credited same-river image, and curated geometry |
| RamsHorn–Livingston Sanctuary to Dutchman’s Landing | Implemented as advanced planning-only tidal connector | RamsHorn Creek/Hudson estuary, approximately 2 planning miles, official Hudson River Greenway cartop launch at the sanctuary and public Dutchman’s Landing exit, Catskill Hudson stage proxy, no cfs cutoff, carry/mud/tide/wind/wake/cold-water hazards, nearby-basecamp-only camping posture, credited same-estuary image, and curated geometry |
| Pyrites to Canton | Implemented as planning-only proxy route | Grass/Grasse River, 6 miles, public Route 21 Pyrites kayak/canoe launch and NYSDEC Canton launch, Chase Mills gauge explicitly marked as downstream same-river proxy, published 150–2,500 cfs band, small-dam/low-water/private-bank warnings |
| Spruce Mountain to First Brook | Implemented as advanced planning-only high-water route | South Branch Grass River, about 6.5 planning miles, current NYSDEC Spruce Mountain Road and First Brook hand launches, NYSDEC high-water-only whitewater guidance, American Whitewater Class II–IV+(V) feature context, Chase Mills gauge as downstream same-river proxy, no numeric threshold, falls/strainer/cold-water/remote-rescue hazards, and designated river-access camping context |
| Middle Branch Hand Launch to Lampson Falls | Implemented as moderate planning-only flatwater route | Middle Branch Grass River, about 4 planning miles, current NYSDEC Middle Branch and Lampson Falls access-area anchors with documented 300-foot and 0.4-mile carries, downstream Chase Mills gauge proxy, no numeric threshold, mandatory take-out before the falls/rapids, cold-water/strainer/remote-access hazards, and nearby designated-camping context |
| Vanderwalker Road to Everton Falls | Implemented as moderate planning-only flatwater route | East Branch St. Regis River, about 9 planning miles, current NYSDEC Vanderwalker and Everton Falls launch corridors with documented 0.4-mile carry and one-way shuttle context, West Branch St. Regis gauge proxy, no numeric threshold, cold-water/wind/wood/remote-access hazards, private easement/logging/leased-camp restrictions, and nearby basecamp context |
| Indian Rock to Four Mile Road | Implemented as advanced planning-only moving-water route | Middle Branch St. Regis River, about 7 planning miles including approximately 5 miles of moving water/whitewater, current NYSDEC Indian Rock and Four Mile access anchors with documented 0.6-mile carry and four marked carries, West Branch gauge proxy, no numeric threshold, greater-than-150-foot drop/rapid/strainer/cold-water hazards, mandatory downstream boundary, and nearby basecamp context |
| Lampson Falls to Downerville | Implemented as advanced planning-only whitewater route | Grass River, 4.1 miles, American Whitewater Class IV+ seasonal reach, current NYSDEC Lampson Falls 0.4-mile carry and Downerville State Forest access-area anchors, Chase Mills gauge as downstream same-river proxy, no numeric threshold, named rapid/wood/cold-water/remote-rescue hazards, mandatory boundary before Downerville-to-Russell continuation, and nearby designated-camping context |
| Twin Falls / State Put-in to DeGrasse | Implemented as advanced planning-only whitewater route | South Branch Grass River, 6.9 miles, American Whitewater Class IV–V seasonal pool-and-big-drop reach, current NYSDEC Route 3 access and DeGrasse State Forest hand launch, Chase Mills gauge as downstream same-river proxy, no numeric threshold, Rainbow/Twin/Sinclair/Basford Falls and wood/cold-water/rescue hazards, mandatory DeGrasse boundary, and endpoint primitive camping/lean-to context |
| Clare Road to Downerville | Implemented as advanced planning-only whitewater route | North Branch Grass River, 4.7 planning miles, American Whitewater Class II–III route with mandatory Harper Falls carry, current NYSDEC North Branch public recreation area and Downerville State Forest access/camping context, Chase Mills gauge as downstream same-river proxy, no numeric threshold, wood/shallow landing/cold-water/seasonal-access hazards, and mandatory Downerville boundary |
| Hadley to Lake Luzerne | Implemented with mandatory take-out | Hudson River, 4 miles, direct Hadley gauge, Hadley Canoe Take-Out and Warren County Canoe Access above Rockwell Falls, published 400–6,000 cfs band, downstream falls boundary/cold-water/strainer warnings, nearby DEC campground |
| Riparius to The Glen | Implemented as advanced planning-only whitewater | Hudson River Lower Gorge, 7.3 miles, current Riparius hand launch and The Glen public canoe access, direct USGS 01316031 at The Glen, American Whitewater Class III Z Ledges/pour-over/wave/rock-island hazards, wooded take-out, and nearby-basecamp-only camping posture |
| Hope to Northville | Implemented with access caveats | Sacandaga, 8 miles, direct Hope gauge, Hope Route 30/Town Garage access-area anchor and DEC Northville launch, published 150–2,000 cfs band, low-water/rapid-rise/reservoir-wind/private-bank warnings, nearby DEC campground |
| Speculator to Duck Bay loop | Implemented as planning-only flatwater out-and-back | Sacandaga River, almost 5 round-trip miles, current NYSDEC Speculator Ball Field and Duck Bay hand launches, USGS 01321000 near Hope as a clearly labeled downstream proxy, no numeric cutoff, shallow-water/beaver-dam/wind/cold-water hazards, hard boundary before the hydropower dam and downstream rapids/cascades, nearby designated-camping context |
| Kunjamuk River Speculator to Elm Lake loop | Implemented as planning-only flatwater out-and-back | Kunjamuk River, approximately 12 water miles round trip from the current Speculator Ball Field hand launch to the north side of Elm Lake and back, current DEC village launch, USGS 01318779 same-river historical/proxy context, no numeric cutoff, slow meanders/shallow water/beaver-dam/strainer/cold-water hazards, Elm Lake objective only (not a vehicle take-out), nearby designated-camping context |
| Nelson Lake out-and-back | Implemented as planning-only flatwater and short moving-water outing | Middle Branch Moose River, approximately 3.6 planning miles from the current DEC informal hand-launch area to Nelson Lake and back, mapped waterline endpoint at the documented carry, McKeever USGS proxy context, shallow outlet/beaver-dam/downstream-rapids boundary, informal-access/rail-crossing safeguards, and nearby-basecamp-only camping posture |
| Route 10/Big Bay to Piseco Outlet confluence loop | Implemented as planning-only moderate whitewater out-and-back | Piseco Outlet, approximately 9 water miles round trip, American Whitewater Class II–III Route 10-to-West Branch Sacandaga reach, current NYSDEC Big Bay hand launch, USGS 01321000 far-downstream regulated proxy with no numeric cutoff, water-only confluence turnaround, low-water/wood/cold-water/remote-rescue hazards, and nearby designated-camping context |
| Blue Mountain Lake to Raquette Lake via Marion River | Implemented as planning-only linked-lake transition | Marion River, approximately 12.5 water miles one way through Blue Mountain, Eagle, Utowana, Marion, and Raquette waters, current public Blue Mountain Town Beach and Raquette Village launch anchors, mandatory 0.4–0.5-mile Bassett Carry around Utowana dam/rapids, USGS 04267500 distant downstream proxy, no numeric cutoff, exposed-lake wind/wave/cold-water/private-bank hazards, shuttle-dependent finish, designated camping and Golden Beach campground context |
| Dead Creek Route 3 to headwaters loop | Implemented as planning-only marsh out-and-back | Dead Creek, approximately 6 miles round trip from the current Route 3 pull-off/picnic-area access toward the headwaters and back, official DEC three-mile paddling corridor, informal 20-yard carry with no formal hand launch, USGS 04267500 distant Raquette proxy, no numeric cutoff, shallow-water/beaver-dam/vegetation/cold-water hazards, nearby designated-camping context |
| Stewarts Bridge Reservoir to Hudson River | Implemented as advanced release-dependent whitewater | Sacandaga, 2.9 miles, direct Stewarts Bridge gauge 01325000, Brookfield-provided put-in/take-out managed by Sacandaga Outdoor Center, scheduled-release context commonly around 4,000 cfs, dam-release/cold-water/bridge/private-utility-shoreline warnings, mandatory exit at the Hudson confluence, nearby DEC campground |
| Fayle Road to Nobleboro | Implemented as advanced planning-only whitewater | South Branch West Canada Creek, 5.3 miles, NYSDEC Fayle Road hand launch and Nobleboro/Fort Noble Trail waterline anchor, Wilmurt gauge 01343060 as clearly labeled downstream proxy, historical 2,000 cfs planning context, fast Class II–III+ water with low-water rock/high-flow push/cable/strainer/cold-water warnings, nearby Ferris Lake Wild Forest primitive camping |
| Chub Lake / NY Route 10 to Shaker Place | Implemented as planning-only flatwater route | West Branch Sacandaga, approximately 8 miles, current NYSDEC Chub Lake bridge hand launch and Shaker Place take-out anchors, downstream Hope gauge 01321000 as broad-trend proxy, no numeric threshold, meandering flatwater with shallow-water/wood/beaver/wind/cold-water/remote-rescue posture, designated West Branch/Chub Lake camping context, and strict no-camping/no-fire rules at the Shaker/Oxbow Tract |
| Whitehouse to Blackbridge / Sacandaga Campsite reach | Implemented as advanced planning-only whitewater | West Branch Sacandaga, approximately 7.6 miles, American Whitewater Whitehouse and Blackbridge river-level anchors with nearby NYSDEC wilderness parking context, Hope gauge 01321000 proxy, approximately 1,800–10,000 cfs planning correlation, continuous boulder-garden/wood/cold-water/remote-rescue hazards, Blackbridge boundary before the further campground continuation, designated West Branch camping context, and route-specific American Whitewater image |
| East Branch Sacandaga Moose Mountain to Route 30 / Griffin Gorge | Implemented as advanced planning-only whitewater | East Branch Sacandaga, approximately 8.2 miles, American Whitewater Route 8/Route 30 roadside-water anchors, NYSDEC spring/high-water and roadside-access context, Hope gauge 01321000 broad proxy with no numeric cutoff, Griffin Gorge/large-hole/continuous-boulder/cold-water/remote-rescue hazards, Route 30 boundary, designated East Branch camping context, and route-specific American Whitewater image |
| Pelon Road to Outer Gooley / Hudson River | Implemented as planning-only wilderness whitewater | Cedar River, approximately 18 miles, NYSDEC Pelon/Benton and Outer Gooley access anchors, Hudson at North Creek 01315500 as clearly labeled downstream proxy, approximately 4 ft historical low-water screen, mixed flatwater/Class II–III with a possible Class IV confluence drop, golf-course bridge portage, one long mid-route egress, spring road/gate constraints, and designated Essex Chain camping context |
| Abanakee Dam / Rafters to Outer Gooley / Hudson River | Implemented as advanced planning-only whitewater | Indian River, approximately 2.3 American Whitewater miles (NYSDEC describes roughly 3.5 miles from Rafters), direct USGS 01315000, no invented universal cutoff, dam-release/Otter Slide/Class III+ sequence/undercut/strainer/cold-water hazards, NYSDEC Rafters and Outer Gooley access, mandatory take-out above the Indian confluence, and nearby Essex Chain/Blue Mountain camping context |
| Churchville Park to Black Creek Park | Implemented as planning-only moderate moving water | Black Creek, at least 10.8 straight-line miles between the official Monroe County Churchville Park and NYSDEC Black Creek launch anchors; exact channel mileage is not reconciled, direct USGS 04231000 at Churchville, no universal numeric cutoff, low-water dragging/fast-rise/wood/strainer/dam/water-quality hazards, nearby managed basecamp posture, and federal gauge-area imagery |
| Route 30 Jessup River Hand Launch to Indian Lake Islands Campground | Implemented as planning-only river-to-lake route | Jessup River to Indian Lake, about 10 planning miles including approximately 2.5 river miles, the Indian Lake arm, and the DEC campground launch, direct USGS 01314200, shallow-rock/beaver-dam/bridge-portage hazards, Indian Lake wind/wave/motorboat exposure, endpoint campground context, and route-specific imagery |
| Lewey Lake Campground to Miami River and return | Implemented as planning-only lake-and-stream out-and-back | Miami River/Lewey Lake, about 5 round-trip miles and 2–3 hours, NYSDEC Lewey Lake Campground public launch, approximately one-mile Miami reach with substantial-beaver-dam turnaround, nearby Jessup proxy gauge, shallow-launch/lake-wind/cold-water/wood hazards, endpoint campground context, and route-specific imagery |
| Littleville to Manchester (Shortsville Run) | Implemented as advanced planning-only whitewater | Canandaigua Outlet, about 2.3 miles, American Whitewater Class II–III reach with the 5-foot Old Mill waterfall and controlled releases, Littleville and Jones-Blunt Park access-area anchors, same-river Chapin gauge proxy, no fixed universal cfs threshold, strainer/cold-water/release hazards, and nearby basecamp-only camping posture |
| Oakland Valley to US 209 | Implemented as advanced direct-gauge whitewater | Neversink, about 4.5 miles, American Whitewater Class II–III reach, Riverfacts endpoint anchors, direct Godeffroy gauge with 1,200 cfs minimum and 1,500 cfs preferred guidance, downstream-of-route/Bashakill and reservoir caveats, conditional Oakland Valley access, D&H Canal Park/US 209 take-out context, cold-water/strainer/remote/take-out hazards, and nearby basecamp-only camping posture |
| Corbett’s Glen | Implemented as advanced direct-gauge whitewater | Allens Creek, 0.21-mile American Whitewater Class II–III ledge run, direct Rochester-area gauge with about 180 cfs minimum and no claimed upper safety limit, Choo Choo Falls/slide/Ragnar Falls, public Brighton park and trail-access context with conditional boat carry/landing, wood/rapid-rise/cold-water/private-property hazards, and nearby Rochester basecamp-only camping posture |
| Route 10 (Ephratah) to Route 5 | Implemented as advanced planning-only proxy-gauge whitewater | Caroga Creek, 9.5 miles, American Whitewater Class I–III corridor, American Whitewater/Sacandaga proxy gauge 01321000 with about 5,000 cfs planning floor and 15,000 cfs upper-flow caution, Montgomery County Ephratah and Route 5 access-area context, cold-water/rapid-rise/strainer/private-bank hazards, conditional endpoint verification, and nearby NYSDEC Caroga Lake campground basecamp context |
| Newcomb to Indian River confluence | Implemented as advanced planning-only wilderness approach | Upper Hudson, nearly 12 miles from the public Harris Lake launch to the Outer Gooley take-out above the Indian River confluence, direct North Creek stage screen, Polaris intermediate hand launch, DEC low-water portage warning below 4 ft, water-only designated campsites, and mandatory boundary before the Hudson Gorge |
| Indian River confluence to North River | Implemented as advanced planning-only whitewater | Hudson Gorge, 15.4 miles, American Whitewater Class III–IV reach, Old Outer Gooley and North River carry/parking anchors, release-dependent start, North Creek stage context, designated water-only campsite context, and private-rafter-pullout/take-out restrictions |
| Buskirk Covered Bridge to Johnsonville Dam | Implemented as planning-only moving-water route | Hoosic River, 5.1 miles, current NYSDEC Buskirk hand launch to the signed public car-top take-out above Johnsonville Dam, direct Eagle Bridge USGS context, slow-moving backwaters with shallow-water/water-chestnut/strainer/cold-water hazards, hard dam boundary, and no on-route camping claim |
| Powerhouse to Lock 4 | Implemented as planning-only proxy route | Lower Hoosic, 5 miles, American Whitewater Class I–II reach, Brookfield/American Whitewater signed powerhouse access, seasonal Lock 4 State Canal Park take-out, Eagle Bridge USGS proxy, spring/rain and local-visual flow posture, powerhouse/low-water/strainer/private-bank hazards, and designated-lock camping context |
| Mumford to Scottsville | Implemented as planning-only moving-water route | Lower Oatka Creek, about 8 miles, NYSDEC Mumford hand launch to Canawaugus Park, direct Garbutt gauge with no invented numeric threshold, low-water/strainer/Sabin low-head-dam portage hazards, public park access-area anchors, and no on-route camping claim |
| Le Roy Red Bridge to Mumford | Implemented as advanced planning-only connector | Oatka Creek, approximately 9 planning miles, public Red Bridge Munson Street canoe/kayak launch to the NYSDEC Mumford hand launch, direct Garbutt gauge, American Whitewater 4.5-foot lower screen and roughly 6-foot upper-feature reference, mandatory non-runnable Buttermilk Falls portage, shallow/wood/cold-water/private-bank hazards, and no on-route camping claim |
| North Blenheim to Middleburgh | Implemented as planning-only moving water | Upper Schoharie Creek, about 14–15 miles, NYSDEC North Blenheim hand launch to Timothy Murphy Park, direct North Blenheim gauge with no invented numeric threshold, early Class II followed by mostly Class I water, cold-water/strainer/shallow/bridge hazards, municipal access-area finish, and no on-route camping claim |
| Middleburgh to Central Bridge | Implemented as planning-only moving water | Schoharie Creek, approximately 9 miles, Timothy Murphy Park to the NYSDEC Route 7 Central Bridge access, direct stage-only Schoharie gauge 01350750, route-specific Class I riffle/flatwater and cold-water/wind/strainer guidance, public access-area anchors, and no on-route camping claim |
| Phoenicia to Boiceville | Implemented as planning-only Class II+ moving water | Upper Esopus Creek, approximately 6.3 miles from the public Mt. Tremper–Phoenicia Road DEC fishing-access area to the Boiceville pullout above Route 28A, direct Coldbrook USGS 01362500 discharge/stage context, release/storm/wood/cold-water guidance, nearby campground basecamp posture, and permission-sensitive take-out logistics |
| Cady/Pleasant Valley to Greenvale Park | Implemented as planning-only moving water | Wappinger Creek, approximately 7–8 miles, municipal Cady/Pleasant Valley canoe-and-kayak ramp to the Greenvale Park water-area endpoint used by the Water Derby, direct USGS 01372500 context, dam/portage/wood/flashy-water/cold-water guidance, no on-route camping claim, and field verification required for the Greenvale landing |
| Popp Park to Gardiner | Implemented as planning-only moving water | Wallkill River, approximately 6–7 miles, active Popp Park and Gardiner launches from the Wallkill Water Trail inventory and Orange County Section 07, direct USGS 01371500 at Gardiner, under-1,000 cfs shallow / 1,000–2,000 cfs navigable / above-2,000 cfs swift-water context, low-head-dam/wood/water-quality/cold-water warnings, no camping claim, and generalized coordinate verification |
| Lassiter to Carry Falls | Implemented as advanced planning-only whitewater | Lower Jordan River, about 3.1 river miles plus the 1.5-mile public canoe carry, NYSDEC-published Jordan-side and Carry Falls Reservoir-side carry anchors, Class IV–V Tebo Falls/high-water guidance, regulated South Colton proxy gauge with no numeric threshold, remote/cold-water/strainer/dam hazards, nearby Parmenter basecamp context, and no claim on the remote Marsh Pond extension |
| Round Lake Preserve to Mechanicville City Dock | Implemented as advanced planning-only moving water | Anthony Kill/Tenandeho, about 7 miles from the public Saratoga PLAN car-top launch to the public City Dock cartop take-out, direct Coons gauge, spring/rain whitewater guidance, log-jam/beaver-obstruction/strainer/cold-water hazards, nearby basecamp posture, and no universal full-route threshold |
| Bath to Campbell | Implemented | Cohocton River, about 9 miles, Babcock Hollow Road and Campbell/Wood Road public launch context, direct Campbell gauge, informational 100–2,500 cfs range, April–July window, shallow gravel/strainer/bridge/private-bank hazards, nearby campground posture, and no riverbank camping claim |
| Corning Preserve to Hudson Shores | Implemented as planning-only urban-water route | Lower Hudson, about 5.5 miles, official Hudson River Greenway cartop launches at Albany Corning Preserve and Hudson Shores Park, nearby Green Island USGS proxy, no numeric cfs threshold, tide/current/wind/wake/commercial-traffic/water-quality hazards, hard boundary before the Troy lock/dam, and nearby basecamp-only camping posture |
| Swift’s Landing to Norsen Bridge | Implemented as planning-only blueway route | Ganargua Creek, about 12.6 miles, regional blueway car-top access at Swift’s Landing, current Wayne County kayak launch at Norsen Bridge Park, same-creek USGS proxy near Macedon, no universal cfs threshold, canal-inflow/current/spillway/strainer/downed-tree hazards, day-use-only park posture, and separate boundary before the Erie Canal continuation |
| Ellison Park to LaSalle’s Landing | Implemented as planning-only flatwater waterway | Irondequoit Creek, about 3.85 miles, current Monroe County non-motorized launch by Ellison Park’s Circle Shelter, current NYSDEC-listed LaSalle’s Landing hand launch, current Town of Penfield canoe/kayak waterway map, historical/no-data USGS Fishers station, no numeric threshold, wetland/strainer/mud/urban-water-quality hazards, bay wind and wake exposure, and nearby-basecamp-only camping posture |
| Meachem Field to Inner Harbor Bear Street | Implemented as planning-only urban moving-water route | Onondaga Creek, about 7.2 channel miles, current City of Syracuse Meachem/Inner Harbor access context, Creek Rats canoe/kayak map and safety guidance, direct live USGS Spencer Street station, below-liner/no-heavy-rain visual rule with no numeric threshold, bridge/channel/debris/concrete-weir/limited-exit/urban-water-quality hazards, and nearby-basecamp-only camping posture |
| Allan H. Treman to Cass Park | Implemented as planning-only flatwater waterfront route | Cayuga Inlet, about 1.1 inlet miles, current NYS Parks Treman launch and City of Ithaca Cass Park human-powered launch, state/county Blueway context, same-inlet USGS 04233255 proxy, no universal cfs threshold, rowing/marina/weed/lake-mouth/water-quality hazards, and nearby-basecamp-only camping posture |
| Route 63 to Knowlesville Road | Implemented as planning-only refuge water trail | Oak Orchard Creek, approximately 5.5 miles, FWS-authorized non-motorized daylight corridor with Route 63 and Knowlesville access, direct USGS 0422018610 context, variable levels/beaver dams/downed trees/traffic hazards, and nearby-basecamp-only camping posture |
| Glenwood Lake / Medina to Lake Ontario | Implemented as advanced planning-only mixed corridor | Oak Orchard Creek, approximately 20.8 American Whitewater miles, public Glenwood/North Gravel and Slade access plus Oak Orchard State Marine Park, direct lower-creek USGS 0422018610 context, mandatory Medina Falls/dam portages, bridge/wood/cold-water/lake-mouth hazards, and nearby-basecamp-only camping posture |
| Harlem Road to Ohio Street | Implemented as planning-only urban canoe trail | Buffalo River, approximately 5.6 miles, current NYSDEC hand launches and Buffalo Blueway access/egress, direct USGS 0421560108 context, wake/commercial-traffic/wind/water-quality hazards, and nearby-basecamp-only camping posture |
| Phoenix to Fulton | Implemented as planning-only canalized day trip | Oswego Canal, 10.57 Canalway miles, current Lock Island Park, Stop 28, and Indian Point public access, two-lock sequence, downstream USGS 04249000 proxy, dam/intake/safety-cable/working-canal hazards, and nearby-basecamp-only camping posture |
| Fulton to Oswego | Implemented as planning-only canalized day trip | Oswego Canal, 9.99 Canalway miles, current Indian Point and Lock O8 public access, four-lock sequence with Minetto break, USGS 04249000 route-context proxy, dam/intake/safety-cable/working-canal hazards, and nearby-basecamp-only camping posture |
| Waterloo to Seneca Falls | Implemented as planning-only canalized day trip | Cayuga-Seneca Canal, 4.4 Canalway miles, current Oak Island Park and Locks CS2–3 public access with Seneca Falls alternate ramp, one-lock sequence, regulated USGS 04232730 proxy, Lock CS4 tailrace/intake/dam/cold-water/working-canal hazards, and nearby-basecamp-only camping posture |
| Cedar Bay Park to Chittenango Landing | Implemented as planning-only historic-canal day trip | Old Erie Canal, 9.4 Canalway miles, current Cedar Bay Park and Chittenango Landing public access context with Poolsbrook intermediate anchor, two stone aqueduct crossings, regulated Chittenango Creek USGS 04244000 proxy, shallow-water/strainer/cold-water hazards, and nearby-basecamp-only camping posture |
| Celoron to McCrea Point | Implemented as planning-only lake-outlet moving water | Chautauqua Lake outlet / Chadakoin River, approximately 3.25 miles from Lucille Ball Memorial Park to McCrea Point Park, current NYSDEC-listed municipal launches, 2026 Chautauqua Watershed guided-paddle itinerary, downstream Falconer USGS 03014500 proxy, lake-wind/wake/bridge/urban-water-quality hazards, and nearby-basecamp-only camping posture |
| Ellicott Creek Park to Eastern Park | Implemented as planning-only blueway route | Ellicott Creek, approximately 3 miles between Erie County’s seasonal kayak launch and Tonawanda’s Eastern Park roller launch, current Erie County/Buffalo Blueway access, Great Falls Council itinerary, same-creek USGS 04218518 proxy, shallow-water/bridge/marina/wake/urban-water-quality hazards, and nearby-basecamp-only camping posture |
| Moshier to High Falls | Implemented as planning-only multi-day canoe route | Beaver River Canoe Route, approximately 14 miles through regulated reservoirs and channels, NYSDEC route-wide launch network, Moshier powerhouse and High Falls Old State Road access anchors, downstream Croghan USGS 04258000 proxy, six-portage/dam/remote/cold-water/wind hazards, designated Soft Maple/High Falls camping context, and nearby-basecamp-only camping posture |
| Munro Park to Pumphouse Road | Implemented as planning-only lower-creek moving-water route | Nine Mile Creek, approximately 5 planning miles, creek-adjacent Munro Park put-in and Pumphouse Road/Honeywell Canoe and Kayak Launch take-out context, historical same-creek USGS 04240180 with no current data or numeric cutoff, dam/culvert/wood/urban-water-quality/posted-boundary hazards, nearby-basecamp-only camping posture, and approved Aqueduct feature image |
| Pumphouse Road to Onondaga Lake outlet | Implemented as planning-only creek-to-lake continuation | Nine Mile Creek, approximately 2.5 planning miles, documented Pumphouse Road/Honeywell launch area to the seasonal Onondaga County outlet kayak launch, historical same-creek USGS 04240200 with no current data or numeric cutoff, local-depth/recent-rain/outlet-current/lake-wind/wake/water-quality controls, nearby-basecamp-only camping posture, seasonal access caveats, and approved Aqueduct feature image |
| Mattituck Creek DEC Waterway Access Site to Route 48 | Implemented as planning-only tidal-inlet section | Mattituck Creek/Mattituck Inlet, approximately 2.8 planning miles, current DEC Naugles Road waterway access to the permit-governed Southold Route 48/Love Lane head-of-inlet ramp, Peconic River USGS 01304500 regional proxy, tide/current/wind/Sound/channel-depth/traffic controls, nearby-basecamp-only camping posture, and approved Mattituck Inlet image |
| Old Place Creek Gulf Avenue to Arthur Kill out-and-back | Implemented as planning-only tidal-wetland outing | Old Place Creek, approximately 4 round-trip planning miles from the current NYSDEC Gulf Avenue hand launch to the Arthur Kill connection and back, current DEC launch coordinate, connected-estuary USGS 01396060 proxy, NOAA Port Ivory tide planning, shallow/mud/cold-water/traffic/water-quality controls, no camping, and approved Old Place Creek mouth image |
| Lemon Creek Bayview to Raritan Bay out-and-back | Implemented as planning-only high-tide tidal-wetland outing | Lemon Creek, approximately 2 conservative planning miles round trip from the current NYSDEC Bayview hand launch toward the Raritan Bay mouth and back, current DEC launch coordinate, connected-estuary USGS 01396060 proxy, NOAA Bergen Point tide planning, shallow/mud/cold-water/mouth-current/water-quality controls, no camping, and approved public-domain Lemon Creek channel image |
| Braddock Bay hand launch to Lake Ontario connection out-and-back | Implemented as planning-only protected-bay/marsh outing | Braddock Bay, approximately 2.5 conservative planning miles round trip from the official DEC hand launch through the bay/marsh toward the Lake Ontario connection and back, current state boat-launch coordinate, USGS 0423205342 Lake Ontario elevation proxy, local wind/wave/channel/visibility/water-temperature controls, no on-route camping, and approved public-domain USGS aerial image |
| Mays Point to Montezuma Heritage Park | Implemented as planning-only canal/river round trip | Erie Canal, 4.6 Canalway miles round trip, current Mays Point access above Lock E25 and Montezuma Heritage Park canoe/kayak landing, Richmond Aqueduct objective with woody-debris warning, Seneca River USGS 04237496 proxy, lock/wind/strainer/cold-water hazards, and nearby-basecamp-only camping posture |
| Northern Montezuma Howland Island loop | Implemented as planning-only Seneca River loop | Approximately 9 miles from the NYSDEC Seneca River North Boat Launch beside Carncross Road around Howland Island and back, public Howland docking context, variable-level/slow-water route guidance, Seneca River USGS 04237496 proxy, wind/wake/shallow-channel/vegetation/wildlife-area hazards, and nearby-basecamp-only camping posture |
| Tivoli North Bay loop | Implemented as planning-only tidal marsh loop | Approximately 3.5 planning miles from the current NYSDEC Kidd Lane car-top canoe launch through Tivoli North Bay and return, all-tide spring-through-fall access, Hudson River Greenway/NERR public paddle context, NOAA Tivoli tide predictions, Hudson USGS 01358000 proxy, mud/vegetation/wind/wildlife-area hazards, and nearby-basecamp-only camping posture |
| Kingston to Eddyville Rondout loop | Implemented as planning-only lower-creek out-and-back | Approximately 7 total paddling miles from the Hudson River Greenway T.R. Gallo Park cartop launch to the Eddyville Dam boundary and return, current same-creek Rosendale USGS 01367500 proxy, tide/current/wind/traffic/dam guidance, working-waterfront and cold-water hazards, and nearby-basecamp-only camping posture |
| Roe-Jan Kill Park out-and-back | Implemented as planning-only out-and-back | Roeliff Jansen Kill, about 4.5 round-trip miles toward Route 9G, current Town of Germantown canoe/kayak launch and public tent platforms, American Whitewater moving-water hazard context, 01197000 East Branch Housatonic proxy, no numeric threshold, and bridge turnaround only |

## Evidence and implementation rules

- Keep the official water-trail map pins as the endpoint coordinates. They are
  public access-area anchors and must not be replaced with town-center
  geocodes.
- Each implemented route must have at least two named water access points,
  direct USGS telemetry or an explicitly labeled proxy, route-specific flow
  guidance, safety hazards, shuttle/access caveats, camping classification,
  and an approved same-river or route image.
- The Chemung routes use USGS `01529950` at Corning for the Corning reaches and
  `01531000` at Chemung for Lowman–Waverly. CanWePaddle's `300–6,000 cfs`
  Corning-to-Big-Flats and `400–8,000 cfs` Elmira-to-Chemung bands are
  conservative informational planning estimates, not launch authority.
- The Wyncoop Creek Road point on Lowman–Waverly is an unofficial rest stop,
  not a guaranteed public take-out, evacuation access, or campsite.
- Do not merge the Marshland loop into the existing Apalachin card until a
  distinct route boundary and independent product value are established.
- Revisit the Cooperstown–Phoenix Mills route only with an explicit lake-to-
  river transition and dam-portage model; do not present it as an ordinary
  continuous river float.
- The East Branch Delaware Fishs Eddy-to-Hancock route is implemented as
  planning-only because USGS 01421000 is not currently returning a usable
  route-local reading. USGS 01421500 at Hancock supplies live same-river
  telemetry near the take-out; keep the proxy label, route-source 200–3,000
  cfs estimate, and local visual/rainfall/trend checks explicit.
- The Delaware River Callicoon-to-Narrowsburg route uses direct USGS
  01427510 at Callicoon and the route source's 400–8,000 cfs estimate. CanWePaddle
  labels the reach 9 miles, while NPS lists about 14 miles between the named
  accesses; the endpoint geometry and generated river trace support treating it
  as a full-day roughly 14-mile route. Skinners Falls is a Class II feature
  within the reach and must be scouted or portaged according to current
  conditions and ability. Callicoon is a cartop/beach access-area anchor;
  Narrowsburg is the DEC-managed public ramp. NPS limits launches and take-outs
  to public DEC/PFBC accesses and does not permit general shoreline camping.
- The Delaware River Port Jervis-to-Milford route uses direct USGS 01434000
  at Port Jervis and the route source's 700–12,000 cfs estimate. West End Beach
  is a public Port Jervis access-area anchor; Milford Beach is an NPS public
  boat/canoe launch with seasonal fee and capacity constraints. The route crosses
  into Pennsylvania and the Delaware Water Gap area, so confirm park access,
  wind/wake conditions, and any camping reservation separately.
- The Cattaraugus Creek Gowanda-to-Sunset Bay route uses direct USGS 04213500
  at Gowanda and the route source's 150–3,000 cfs estimate. New York planning
  documents identify the Gateway Park watercraft launch in Gowanda, while NYS
  Parks and Chautauqua County identify the Sunset Bay public launch. The
  downstream corridor intersects the Seneca Nation Cattaraugus Territory, so
  the route is conditional: confirm current Nation permission or restrictions,
  water-quality advisories, launch hours/fees, and Lake Erie conditions before
  treating it as launch-ready. Do not substitute the North Otto DEC gorge
  access; DEC describes that as a separate, substantially harder run.
- The Oswegatchie Inlet-to-High Falls route uses USGS 04262000 only as a
  downstream same-river planning proxy and preserves CanWePaddle's 80–1,500 cfs
  estimate. NYSDEC publishes the Inlet Road hand launch and the Five Ponds
  wilderness canoe-route/camping context. High Falls is a major obstruction and
  the route is an out-and-back to a portage/turnaround boundary, not a through-
  falls run or vehicle take-out. Keep the remote rescue, first-come campsite,
  weather, carry, and offline-navigation requirements explicit.
- The Schoharie Creek route is intentionally classified as advanced whitewater:
  the route-level source calls it Class I, but American Whitewater reports a
  sustained Class II+ gorge/ledge sequence. Do not expose it as a casual float
  or infer safety from the cfs band alone.
- The Genesee Avon-to-Scottsville route ends at the Wheatland/Scottsville-area
  DEC hand launch. Do not extend the route downstream toward Rochester
  waterfalls or dams without a separate hazard and access review.
- The Tioughnioga Cortland endpoint is on the Yaman Park East Branch access
  system; the connected-water relationship is explicit in the route and access
  registry rather than being silently normalized.
- The Wallkill Gardiner endpoint is sourced from an active community water-trail
  launch inventory and route pin, while the New Paltz endpoint is NYSDEC-listed.
  The Gardiner coordinate is intentionally treated as an access-area anchor with
  a larger uncertainty; do not present it as a surveyed ramp coordinate.
- The Batten Kill route is useful coverage but has a more conservative access
  posture than the DEC-listed routes. The Battenville and Clarks Mills/Rexleigh
  pins are named access-area anchors supported by route-specific and DEC public-
  fishing-rights sources, not surveyed launch ramps. Reconfirm current parking,
  permission signage, and the lower-falls boundary before treating it as a trip
  recommendation.
- The Esopus route uses the route source's Mount Marion area description and the
  nearby USGS Glasco Turnpike bridge/gauge as an access-area anchor; it is not a
  surveyed ramp coordinate. Saugerties Village Beach is a documented lower-Esopus
  endpoint but requires current permit and fee verification.
- The Salmon Altmar-to-Pineville route is intentionally advanced whitewater:
  DEC documents release-controlled water, active drift-boat launches, Altmar
  gravel deposition, and seasonal fishing restrictions. Check the release,
  gauge, access, and congestion together.
- The Black River Lyons Falls-to-Carthage route is planning-only because the
  Watertown USGS station is downstream of the long corridor. Treat the 500–8,000
  cfs band as a conservative proxy and plan the official canoe-trail portages,
  intermediate access, day segments, and Carthage boundary explicitly.
- The Genesee Mount Morris-to-Avon route begins below Mount Morris Dam at John
  Wesley Powell Park and ends at the NYSDEC Avon hand launch. Do not infer
  access through the dam recreation area or extend the route toward Rochester
  waterfalls and dams.
- The Genesee Letchworth Gorge route is a separate permit-only whitewater card
  from Lee’s Landing to St. Helena. American Whitewater supplies the Class II–III
  reach, direct Portageville stage context, feature-level guidance, and steep
  carries; current Letchworth guidance limits gorge kayaking to the two named
  park access areas. Keep the 9–10.5 ft planning context and 14 ft closure rule
  visible, avoid the railroad bridge and waterfall system, and treat park camping
  as separately reserved endpoint lodging rather than riverbank camping.
- The Beaver Kill Cooks Falls-to-Peakville route uses named access-area pins
  rather than surveyed ramp coordinates. Great Western Catskills provides the
  regional access context and NYSDEC Beaverkill Campground provides a separate
  nearby basecamp option; neither authorizes private-bank access or endpoint
  camping.
- The Grass/Grasse River Pyrites-to-Canton route is planning-only because USGS
  04265432 at Chase Mills is downstream of the reach. Grasse River Heritage
  documents the Route 21 Pyrites facility and NYSDEC lists the Canton launch;
  take out above the Canton small dams and preserve the common Grass/Grasse
  naming when searching source material.
- The Hudson Hadley-to-Lake-Luzerne route resolves the prior boundary hold with
  the Hadley Canoe Take-Out and Warren County Canoe Access mapped as public
  cartop launches. The Lake Luzerne endpoint is above Rockwell Falls; do not
  substitute the separate downstream DEC trailer launch or continue past the
  falls boundary.
- The Sacandaga Hope-to-Northville route is an Adirondack moving-water reach,
  not a Great Sacandaga Lake crossing. CanWePaddle supplies the direct Hope
  gauge and 150–2,000 cfs estimate; NYSDEC confirms the Northville launch and
  seasonal high-water paddling context. The Hope Town Garage/Town Hall point
  remains a larger-uncertainty access-area anchor and must be reconfirmed
  before launch.
- The Hudson Newcomb-to-Indian-confluence route is the upper-Hudson wilderness
  approach, not the Hudson Gorge itself. NYSDEC publishes the Harris Lake,
  Polaris, and Outer Gooley access chain, the nearly 12-mile corridor, the
  below-4-foot North Creek stage screen, and designated water-only campsites.
  Keep the Outer Gooley parking coordinate labeled as a 0.1-mile carry anchor,
  preserve the advanced planning-only posture, and do not continue into the
  gorge without a separate expert whitewater and release plan.
- The Hudson Indian-confluence-to-North-River route is the distinct Hudson Gorge
  whitewater run. American Whitewater documents the 15.4-mile Class III–IV
  reach and release-dependent access, while NYSDEC supplies the Outer Gooley
  and North River parking/carry anchors, wilderness camping context, and the
  expert-only safety boundary. Keep it planning-only and do not treat the
  North Creek stage as a complete go/no-go decision.
- The Hudson North-River-to-Riparius route is a separate 13-mile Class II–III
  reach below the gorge. American Whitewater supplies the route identity,
  boulder-rapid and commitment notes, and Riparius take-out description;
  NYSDEC lists the Bridge at Riparius hand launch and the North River access
  corridor. Keep the upstream trail access conditional, preserve the
  North-Creek gauge as context rather than a universal threshold, and do not
  merge this section into the gorge card.
- The Oriskany Creek Clinton route is a separate 1.1-mile Class II(III) bridge-
  to-bridge run with an optional Norton Avenue extension. American Whitewater
  supplies the matching reach, ledge/wave/strainer notes, bridge access sequence,
  and direct USGS 01338000 correlation; Oneida County supplies watershed and
  public-access inventory context. Keep the bridge endpoints labeled as
  conditional water-adjacent access anchors rather than maintained ramps, retain
  the approximately 350–2,500 cfs planning band, and do not treat fishing access,
  private banks, or bridge shoulders as general-use launches.

## Current statewide research holds

- **Cattaraugus Creek — Gowanda to Sunset Bay:** Implemented conditionally.
  Gateway Park and Sunset Bay now have documented public water-entry anchors,
  and the direct Gowanda gauge plus route-specific flow band are in the route
  record. The remaining launch-day gate is confirmation of current Seneca
  Nation permission/restrictions for the intervening corridor, together with
  water-quality and Lake Erie mouth checks. Keep the route visibly conditional.
- **Oswegatchie River — Inlet to High Falls:** Implemented as a planning-only
  wilderness out-and-back. DEC now supplies the Inlet Road launch, High Falls
  obstruction/lean-to context, designated canoe-route camping, and the remote
  access rules. Keep the downstream proxy label and the High Falls
  portage/turnaround boundary visible; it is not a conventional shuttle route.
- **Raquette River — Axton Landing to The Crusher:** Implemented as a
  planning-only context route. DEC supplies both public water-entry endpoints and
  the Adirondack access context, while CanWePaddle supplies the bounded nine-mile
  flatwater corridor and live downstream gauge. The source intentionally omits a
  numeric threshold because the reach is lake-regulated, so the route remains
  unscored until a defensible level policy exists.
- **Susquehanna River — Cooperstown to Phoenix Mills:** Implemented as a
  planning-only lake-to-river transition route. The water-trail itinerary
  supplies the 5.5-mile boundary, Fish Road and Compton Bridge map pins,
  experienced rating, shallow-water/downed-tree warnings, and mandatory
  river-left Otsego Lake Dam portage. The nearby USGS Cooperstown station is
  historical with no current continuous or daily data, so no numeric threshold
  or score is exposed; keep the lake wind, portage, and rocky take-out checks
  prominent.
- **Susquehanna River — Crumhorn Pond to Goodyear Lake:** Implemented as a
  planning-only flatwater route. The itinerary supplies the 3.25–6-mile range,
  Crumhorn, Portlandville, and Silliman Cove public access pins, the
  intermediate take-out, nearly undetectable-current posture, slow-no-wake
  coves, accessible launches, and the Colliers Dam boundary. Nearby USGS
  01497500 is historical with no current continuous or daily data, so no
  numeric threshold or score is exposed.
- **Mohawk River — Herkimer to Little Falls:** Implemented as a planning-only
  canalized flatwater route. CanWePaddle publishes an eight-mile reach with a
  live downstream USGS context gauge but no numeric runnable range. NYSDEC
  supplies the Herkimer and Little Falls Rotary Park public launches; keep the
  route planning-only, inspect wind/wakes/cold water and lock conditions, and
  stop at the Lock 17 boundary.
- **Saranac River — Second Pond to Lake Flower:** Implemented as a planning-only
  lock and lake transition route. ADK Lakes & Trails publishes the approximately
  six-mile trip through the lower lock and Oseetah Lake; NYSDEC supplies the
  Second Pond and Lake Flower public launches and identifies the lock/winter
  rules. USGS 04272512 is historical only, so no numeric threshold or score is
  exposed; keep the portage, wind, wakes, cold-water, channel, and motorboat
  checks prominent.
- **West Branch Ausable River — Wilmington to Au Sable Forks:** Implemented as
  advanced planning-only whitewater. Lake Placid publishes the 11-mile Class
  I–III+ reach and exact endpoint pins; American Whitewater describes continuous
  Class II, later Class III features, and spring/heavy-rain use. USGS 04275500
  is a live downstream proxy after the branches join, with no numeric route
  threshold. Keep the dam exclusion, boulders, shallow rock, strainers,
  cold-water, scouting, evacuation, and conditional public-access checks
  prominent; NYSDEC says most of the branch is not suitable for general
  paddling.
- **East Branch Ausable River — Keene to Upper Jay:** Implemented as advanced
  planning-only whitewater. Lake Placid publishes the 6.3-mile Class II–III
  reach and exact endpoint pins; the APA describes the East Branch as shallow
  and slow in normal conditions but more challenging during spring high water.
  USGS 04275500 is a live downstream proxy after the branches join, with no
  numeric route threshold. Keep scouting, cold-water, shallow-rock, strainer,
  private-bank, and conditional access checks prominent.
- **Raquette River — Dead Creek Flow to Jamestown Falls:** Implemented as
  advanced planning-only whitewater. NYSDEC publishes the distinct 14.5-mile
  itinerary, named access/carry points, dangerous rapids and falls, and the
  novice exclusion; the Raquette Boreal Complex adds Class II–IV guidance and
  camping context. USGS 04267500 is downstream and regulated by Carry Falls
  Reservoir, so it is a trend proxy only and the route has no numeric threshold.
  Keep the informal Dead Creek access anchor, long portages, dam-release,
  strainer, cold-water, shuttle, and campsite checks prominent.
- **Hudson River — Newcomb to Indian River confluence:** Implemented as
  advanced planning-only wilderness whitewater. NYSDEC publishes the public
  Harris Lake, Polaris, and Outer Gooley access/carry sequence, the low-water
  screen at the North Creek gauge, and designated primitive water-only camping.
  Keep the 4-foot context threshold, portages, dam-release timing, remoteness,
  and mandatory pre-gorge endpoint visible.
- **Hudson Gorge — Indian River confluence to North River:** Implemented as
  advanced planning-only whitewater. American Whitewater documents the 15.4-mile
  Class III–IV release-dependent reach; NYSDEC supplies the Outer Gooley and
  North River anchors, camping context, and expert-only safety boundary. The
  North Creek gauge is context only, not a complete local go/no-go decision;
  keep private pullouts, the mandatory takeout, and release timing prominent.
- **South Sandy Creek — Route 95 to Route 11 (Lorraine Gulf):** Implemented as
  advanced planning-only whitewater. American Whitewater publishes the 11.6-mile
  Class III–IV reach, while the published endpoint anchors span 15.2 miles
  straight-line; use about 15.5 planning miles until a surveyed trace reconciles
  the difference. The source also publishes March/April or post-rain timing, the Route 178 bridge
  waterline observation, strainers, and remote rescue posture. NYSDEC supplies
  the Lakeview WMA cartop launch and public-rights context; the Route 95 entry
  remains a conditional map-derived anchor. USGS 04250750 is direct same-river
  gauge context, but there is no standardized maximum or feature-level cutoff.
- **Middle Branch St. Regis River — St. Regis Falls to Fort Jackson (Silver
  Staircase):** Implemented as advanced planning-only whitewater. American
  Whitewater publishes the 11.1-mile Class III+(IV) reach, continuous rapids,
  dam/slide/slot hazards, and spring/high-water character. The Town of Waverly
  documents the riverfront St. Regis Falls Scenic Campsite at the upper end;
  Nicholville and Fort Jackson remain conditional map/report-based bailout and
  take-out anchors. USGS 04268800 is a live West Branch proxy, not a local
  Middle Branch waterline, so no numeric threshold or score is exposed.
- **West Canada Creek — Middleville to Kast Bridge:** Implemented as a bounded
  direct-gauge Class II–II+ section. American Whitewater publishes the teaching
  reach, 600–10,000 cfs Kast Bridge range, reservoir/power-operation changes,
  low-head dam, bridge, private-bank, and harder-Kast-rapid warnings. The West
  Canada access study identifies NYSDEC Rec Site 9 north of Middleville and the
  Kast Bridge access area; both stored endpoints remain conditional access-area
  anchors requiring current field verification. Nearby West Canada Creek
  Campground is treated as a separate basecamp option, not route camping.
- **East Kill — Beaches Corners to Jewett Center:** Implemented as a bounded
  5.4-mile Catskills whitewater reach. American Whitewater provides the Class
  II–IV rating, Mill Hollow Class III feature, direct USGS 01349700 correlation,
  and 300–1,200 cfs planning band. Riverfacts supplies the route-specific
  Beaches Corners and Route 23A endpoint anchors; NYSDEC PFR mapping and NYSDOT
  bridge records corroborate the water/bridge corridor. Treat both endpoints as
  conditional access-area anchors until public parking, carry, and landing are
  confirmed. The gauge is a planning screen, not a substitute for local visual
  inspection. Use a separate Catskills basecamp and do not infer shoreline
  camping permission from PFR or bridge access.
- **East Canada Creek — Dolgeville to Route 5:** Implemented as an
  approximately 8-mile lower East Canada Creek moving-water route. Montgomery
  County publishes the endpoint coordinates and mildly difficult route, while
  the Brookfield access-study filing records the reach as Class I–III. USGS
  01348000 is a direct same-river station near the downstream end, but no
  defensible numeric threshold is published, so use stage/discharge trend and
  local inspection only. The Dolgeville dam/bridge/wall complex, ice/debris
  jams, shallow rock, strainers, private parcels, and conditional route-map
  access remain explicit. The DEC PFR map is fishing-rights context, not blanket
  boat-launch or camping permission; use a separate road-access basecamp.
- **Hoosic River — Powerhouse to Lock 4:** Implemented as a five-mile
  planning-only lower Hoosic route. American Whitewater publishes the Class I–II
  reach and the Hoosic River Watershed Association documents the signed
  Brookfield access, limited Powerhouse Road parking, Lock 4 river path, and
  seasonal gate. USGS 01334500 near Eagle Bridge is a live upstream same-river
  proxy; use its trend with local rainfall, powerhouse discharge, and visual
  inspection rather than exposing an invented numeric threshold. Keep the
  shallow lower channel, changing current, strainers, private banks, and the
  mandatory Lock 4/canal boundary visible. Lock C4 camping is an endpoint
  option only when confirmed open with the Canal Corporation.
- **Black Creek — Churchville Park to Black Creek Park:** Implemented as a
  planning-only moderate moving-water route. Monroe County's Churchville Park
  launch and NYSDEC's Black Creek launch close a public endpoint chain, while
  USGS 04231000 supplies direct stage/discharge context. Keep the no-universal-
  cutoff posture, shallow-water dragging, storm rise, dam/bridge, wood,
  water-quality, and downstream log-jam boundary warnings visible; the local
  7.8-mile reference does not reconcile with the official endpoint coordinates,
  so plan from a conservative 10.8+ straight-line minimum until a channel trace
  is verified. Camping is nearby basecamp only.
- **Peconic River — Upper Mills to Weeping Willow:** Implemented as a
  planning-only short lower-river gap section. NYSDEC lists the Upper Mills and
  Weeping Willow public hand launches plus the lower DEC access, Suffolk County
  confirms direct canoe/kayak access at the Route 25 canoe launch, and the
  Peconic Estuary Partnership maps the sequence on the 9.5-mile Blueway. Use
  direct USGS 01304500 as context only; keep shallow water, vegetation, debris,
  water quality, wind/tide transition, the Upper Mills dam boundary, and the
  downstream estuary boundary visible. Camping is nearby basecamp only.
- **Jessup River — Route 30 Hand Launch to Indian Lake Islands Campground:**
  Implemented as a planning-only river-to-lake route. NYSDEC lists both public
  water-entry points and its Wild Forest plan documents the navigable Jessup
  reach, shallow rocky section, bridge/stone-dam constraint, and portage issue.
  Keep direct USGS 01314200 as river-only context, with beaver/wood, cold-water,
  lake wind/wave, motorboat, campground-operation, and daylight safeguards. The
  approximately 10-mile length includes Indian Lake travel and is a planning
  estimate, not a surveyed wetted-channel trace.
- **Miami River — Lewey Lake Campground and return:** Implemented as a
  planning-only lake-and-stream out-and-back. NYSDEC confirms the Lewey Lake
  Campground launch and seasonal camping facilities; current Hamilton County
  paddling guidance publishes the five-mile, 2–3 hour route, and Miami River
  guidance describes the shallow, twisting stream and beaver-dam turnaround.
  Keep the Jessup station as a clearly labeled nearby proxy only; no Miami-
  specific numeric threshold is asserted, and the turnaround is not a public
  take-out or portage authorization.
- **Roeliff Jansen Kill — Roe-Jan Kill Park and return:** Implemented as a
  planning-only lower-creek out-and-back. The current Town of Germantown page
  identifies Roe-Jan Kill Park as a canoe/kayak launch with public tent
  platforms, while American Whitewater supplies the named moving-water hazard
  context. Keep the Route 9G bridge as a turnaround landmark only, use USGS
  01197000 as a clearly labeled regional proxy with no numeric cutoff, and
  verify the park carry, parking, water entry, hours, and return margin on site.
- **Batten Kill — Eagleville to Battenville:** Implemented as a planning-only
  upper float. NYSDEC currently identifies the Eagleville Road parking area and
  hand launch on the Batten Kill, and the route-specific field report documents
  the approximately 11-mile trip to CR 61 in Battenville with easy rapids,
  riffles, flatwater, strainers, and downed-tree cautions. Use USGS 01329490 as
  direct stage/discharge context, retain the field reports’ 4.4–4.8 ft readings
  as observations rather than a universal cutoff, and confirm the Battenville
  landing, private-bank boundaries, congestion, and shuttle before launch.
- **Owego Creek — lower Owego out-and-back:** Implemented as a conservative
  planning-only public-launch loop. NYSDEC identifies the Canal Street hand
  launch at the Owego Creek mouth, the Village of Owego documents the lower
  creek launch network, American Whitewater supplies the broader Owego Creek
  Class I–II(III) context and approximate 2–5 ft stage screen, and USGS 01514000
  is an active direct station. The route turns around near the gauge corridor
  and returns to Canal Street; it does not claim the upstream Dr. Knapp endpoint,
  bridge/railroad landings, private banks, or continuation into the Susquehanna.

## Next rotation

Continue screening the held Otsego/upper Susquehanna, Marshland,
Jordan River, and remaining Adirondack Rock systems for
distinct moving-water value. Add only when a complete public access chain,
water/near-water coordinates, route-specific flow posture, safety and camping
logistics, imagery, and geometry clear; otherwise record a durable hold. Mohawk,
Saranac, both Ausable branches, upper Hudson, and Hudson Gorge
now have planning-only cards; keep their proxy, historical, conditional-access, or release-dependent
limitations visible while the remaining inventory is reviewed.
Keep the goal active until the remaining viable New York corridor inventory is
either implemented or has a documented blocker.
The Marion River rotation is now represented by the distinct Blue Mountain
Lake-to-Raquette Lake linked-water itinerary: DEC identifies the five-mile
Scenic Marion reach, the Northern Forest Canoe Trail documents the flatwater
route and Bassett Carry, and the route uses current public-launch anchors at
both ends. It remains planning-only because the trip crosses exposed lakes,
requires a shuttle and mandatory carry, and uses a distant Raquette proxy
gauge with no numeric cutoff.
The Dead Creek rotation is now represented by a conservative Route 3
headwaters out-and-back. Current DEC material identifies the distinct three-mile
marsh paddle and the unit-management plan identifies the roadside pull-off and
informal water entry; the route keeps the 20-yard carry, shallow water, beaver
dams, protected marsh, limited egress, and no-formal-launch caveat explicit.
The Upper Susquehanna rotation is now represented by two additional public-launch
gap sections: Emmons to West Oneonta and Otego to Unadilla. Current state launch
listings close both endpoint pairs, while the live Unadilla gauge and parent Class I
guidance provide flow context; both remain planning-only because the exact split
mileage and local river conditions require field confirmation.
The Finger Lakes rotation now adds the West River Marsh Sunnyside out-and-back.
The current Cayuga Trails Club paddle identifies the Sunnyside bridge-side launch,
lazy marsh character, and approximately 2.5-hour loop, while NYSDEC High Tor WMA
material supplies the current Sunnyside and South Hill access-area context plus a
direct West River gauge. The route keeps Sunnyside as both start and finish, treats
South Hill as a turnaround rather than a vehicle take-out, claims no numeric cutoff,
and retains shallow-water, vegetation, wood, fast-rise, cold-water, and wildlife-
management access controls.
The Chemung rotation now adds the distinct Elmira-to-Chemung section. Current NYSDEC
launch listings identify the Elmira and White Wagon public water entries, while the
current CanWePaddle page publishes the matching 10-mile Class I route, direct Chemung
gauge, and informational 400–8,000 cfs planning range. The card remains planning-only
with explicit shallow-water, debris, bridge, cold-water, water-quality, access, and
daylight controls, and hands off at White Wagon before the existing Lowman-to-White-
Wagon route.
The Cohocton rotation now fills the distinct Campbell/Wood Road-to-Kinsella Park gap
between the existing Bath-to-Campbell Cohocton card and the Kinsella-to-Corning
Chemung itinerary. Current Paddle607 material identifies Kinsella as an active public
river launch and documents shallow water, a strong narrow-channel current, and carry
decisions, while Campbell access and watershed records document Wood Road and the
regional Campbell-to-Kinsella float. The new approximately 8.5-mile card uses direct
USGS 01529500 trend context, asserts no numeric cutoff for the connector, keeps
nearby-basecamp-only camping, and retains conservative checks for low water, rain,
wood, bridges, private banks, endpoint landing, and the mandatory handoff at Kinsella.
The Niagara lower-creek rotation now adds the distinct Burt-to-Newfane Marina
Eighteenmile Creek section. Current Town of Newfane material identifies Fisherman’s
Park as an Eighteenmile Creek access point and the Town Marina as an active boating
launch, while NYSDEC lists the Marina with current coordinates and USGS 04219768 gives
direct telemetry immediately below Burt Dam. The route remains planning-only because
Fisherman’s Park is an access-area anchor rather than a documented dedicated paddle
ramp, Burt flow is power-generation regulated, the lower creek enters a working Lake
Ontario harbor, and the Area of Concern/water-quality review must remain visible. No
numeric cutoff or free camping claim is exposed.
The Saranac rotation now promotes the distinct Moose Pond Road Bridge-to-Permanent
Rapids boundary. Current NYSDEC guidance names the bridge as the start of an easy
2.5-mile flatwater paddle and the take-out before the downstream Class II–III rapids;
the current Northern Forest Canoe Trail page adds the Permanent Rapids class, The
Narrows hazard, water-level sensitivity, and portage boundary. The route remains
planning-only because both stored endpoint coordinates are bridge/portage-waterway
anchors rather than surveyed ramps, the Plattsburgh gauge is a far-downstream
dam-affected proxy, and the take-out must be located before current accelerates. The
longer American Whitewater Riverside Road endpoint concept remains held separately.
The Saranac town-water rotation now also promotes the distinct Saranac Lake Hand
Launch/Dorsey Street-to-Moose Pond Road footbridge section. Current NYSDEC guidance names
the Saranac Lake Hand Launch, while the current Saranac Lake itinerary
documents the five-mile one-way easy-Class-I paddle, no-motor posture, limited finish
parking, and outfitter shuttle option. It remains planning-only because the local USGS
station is historical rather than live, the Dorsey outfitter launch is managed access,
and the footbridge/hand-launch finish requires same-day landing and parking confirmation.
The New York City rotation now adds the distinct Bronx River Blueway 219th Street-to-
Soundview section. The current Bronx River Alliance guide and access pages document the
named moving-water corridor, three mandatory portage decisions, changing upper-river
conditions, the tidal/urban lower reach, and no-return-shuttle logistics; the current
Empire State Water Trail inventory supplies the Soundview launch context, NYC Parks
requires a kayak/canoe launch permit and designated launch/landing sites, and USGS
01302020 provides live upper-river context. The approximately seven-mile card is
planning-only with a clearly labeled proxy gauge, nearby-basecamp-only camping, no
numeric cutoff, and explicit controls for the gated 182nd Street passage, Bronx Zoo
portage, debris/boom, tide, water quality, weather, and one-way vehicle staging.

## Current research holds

- **Ouleout Creek — Wagner Hollow Road Bridge to Route 357:** Hold the distinct
  4.8-mile Class I–III corridor pending a permission-backed endpoint chain.
  [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1375/main)
  describes the run as starting as close to East Sidney Dam as possible and
  finishing after the campground, with minimal put-in parking and uncertainty
  around the dam-adjacent access; those descriptions do not establish current
  public water-entry, parking/carry, or take-out permission. The direct
  [USGS 01500000 station](https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=01500000)
  is useful same-creek flow context but is downstream of East Sidney Lake and
  cannot cure the access gap. Reopen only with current public endpoint
  evidence, dam/regulated-flow handling, and a complete vehicle and rescue plan.
  The September 2026 screen checked current [Town of Sidney recreation
  information](https://townofsidneyny.gov/east-sidney-lake/) and the [Corps
  Lakes project listing](https://corpslakes.erdc.dren.mil/visitors/projects.cfm?ID=E105230):
  they confirm lake-side boating, camping, and a reservoir launch, but do not
  establish a below-dam public paddling entry or a complete downstream
  take-out/vehicle chain. Keep the AW moving-water reach held.
- **East Branch Delaware River — Halcottsville to Margaretville:** Hold the
  distinct 11.5-mile Class I–II reach pending current public paddling endpoints
  above Pepacton Reservoir. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1292/main)
  publishes the corridor and the [USGS Margaretville station](https://waterdata.usgs.gov/monitoring-location/USGS-01413500/)
  provides current same-river telemetry, but the current [NYSDEC Delaware
  County launch directory](https://dec.ny.gov/things-to-do/boating/launch-sites/delaware-county)
  lists East Branch launches only in the Hancock/Fish's Eddy area, not
  Halcottsville or Margaretville. [NYSDEC's Pepacton Reservoir guidance](https://dec.ny.gov/places/pepacton-reservoir)
  confirms NYC DEP permit, registration, inspection, and no-motor rules for
  the reservoir, but does not establish a river-to-reservoir take-out for this
  AW reach. Keep this as a durable no-add until both upstream water entry and
  the reservoir transition are independently verified.
  The September 2, 2026 recheck found the current NYSDEC directory still
  listing East Branch hand launches in the Hancock/Fish's Eddy area, not at
  Halcottsville or Margaretville. Current outfitter material documents the
  advertised three- and six-mile trips from Corbett or Downsville to
  Shinhopple below Pepacton Reservoir, while regional material describes
  Halcottsville as a rental/scenic area rather than a maintained public launch.
  That evidence does not establish the AW reach's upstream public carry,
  parking, or reservoir-transition take-out; keep the hold in place.
- **Schoharie Creek — Gilboa to Mine Kill:** Hold the distinct 4.7-mile
  Class II–III reach pending a public Wyckoff Road water entry and a
  confirmed river-to-reservoir take-out. [American
  Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1420/main)
  describes an approximate start where Wyckoff Road crosses Schoharie Creek
  and an ending at the Mine Kill State Park reservoir, connecting Schoharie
  and Mine Kill reservoirs. The current [NYS Parks boating launch
  directory](https://staffportal.parks.ny.gov/boating/launch-sites.aspx?cnty=&sort=4&way=)
  lists reservoir launches but not a maintained canoe/kayak launch at
  Wyckoff; the current [NYPA access
  notice](https://www.nypa.gov/News/Press-Releases/2025/20250331-bg)
  confirms public fishing access below the lower reservoir rather than a
  documented river-to-reservoir paddle endpoint. USGS
  [01350101](https://waterdata.usgs.gov/monitoring-location/USGS-01350101/)
  supplies current same-reach telemetry and NYPA cooperation, but cannot
  cure the missing public launch/carry and lower exit. Keep this as a
  durable no-add until the complete endpoint and portage chain is
  independently verified. A current 2026 [Mine Kill State Park
  notice](https://parks.ny.gov/visit/state-parks/mine-kill-state-park) confirms
  the lower-reservoir launch is open seasonally with boat-washing and sign-in
  requirements, while the current [NYS Parks launch
  directory](https://staffportal.parks.ny.gov/boating/launch-sites.aspx?cnty=&sort=4&way=)
  still labels the launch as requiring a no-charge NYPA boating permit. That
  policy conflict, plus the absence of a documented Wyckoff-to-reservoir
  public carry and river exit, keeps this hold in place.
- **Rondout Creek — High Falls Dam to Rosendale:** Hold the distinct 6.4-mile
  Class III–V(V+) reach pending a complete public endpoint, dam/portage, and
  rescue package. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1396/main)
  documents High Falls, Little Falls, multiple ledges, hydropower diversion,
  and difficulty that changes with the level, but its route description does
  not establish a current maintained public start and finish for the full
  reach. The current [NYSDEC Ulster County launch directory](https://dec.ny.gov/things-to-do/boating/launch-sites/ulster-county)
  lists a Rondout Creek launch in Kingston, but that listing does not by itself
  close the High Falls-to-Rosendale endpoint or vehicle-access gap. The direct
  [USGS 01367500 station](https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=01367500)
  is useful flow context, including reservoir conservation releases, but cannot
  replace access permission or feature-specific scouting.
- **Saranac River — Silver Lake Road to Clayburg:** Hold the distinct high-consequence
  reach pending permission-backed endpoints and a current carry/rescue plan. The
  current [Northern Forest Canoe Trail description](https://www.northernforestcanoetrail.org/suggested-trips/saranac-river-silver-lake-to-clayburg/)
  documents Teft Pond Falls as a solid Class IV waterfall, private and posted banks
  that complicate scouting, an unmaintained left-bank portage, continued Class II+
  to III water, and a river-left Clayburg take-out reached by a small herd path.
  NFCT recommends levels above 4.5 feet/1,400 cfs for the section below Casey Road,
  with higher levels adding further consequence. The Silver Lake Road start remains
  disputed/permission-sensitive and the Clayburg landing is not a current maintained
  public canoe launch; USGS [04273500](https://waterdata.usgs.gov/nwis/uv/?legacy=1&site_no=04273500)
  is only a far-downstream, dam-affected proxy. Keep the reach held rather than
  converting private-bank or road anchors into public endpoints.
- **Rochester Creek — Doug Road bridge (Liebhardt) to Mill Brook:** Hold the
  distinct approximately 5.1-mile Class II–III Catskill creek reach pending a
  current legal endpoint chain. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1390/main)
  publishes the named reach, small-creek character, strainer and dam context,
  and the Rondout Creek gauge as a broad proxy, but its current record does not
  establish maintained public parking, carries, or water entry at both ends;
  its trip-report notes also describe alternate bridge/road access rather than
  a verified public launch system. The current [NYSDEC Ulster County launch
  directory](https://dec.ny.gov/things-to-do/boating/launch-sites/ulster-county)
  lists Rondout, Wallkill, Esopus, and Hudson launches but no Rochester Creek
  paddling launch. Do not convert Doug Road, DeWitt Road, Boodle Hole Road,
  Mill Brook, bridge shoulders, or fishing access into public endpoints. Reopen
  only with permission-backed or official public access at both ends, a current
  flow/wood review, and a complete shuttle and rescue plan.
- **Moodna Creek — Pleasant Hill Road to 9W / Forge Hill:** Hold the distinct
  approximately 5.4-mile Class II–III+(IV) reach pending a normal public
  endpoint chain. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1350/main)
  and the current [Kayak and Canoe Club of New York river page](https://kccny.org/locations/moodna-creek/)
  provide useful route-specific flow, dam, bridge, wood, combined-sewer,
  evacuation, and current camera guidance, and the club identifies Pleasant
  Hill Road, Route 32, and Forge Hill as operating launch/take-out meeting
  locations. Those locations are club/roadside staging descriptions rather
  than independently verified public boat launches: the Forge Hill page warns
  that rocks now block the river carry, while the current [NYSDEC Orange County
  launch directory](https://dec.ny.gov/things-to-do/boating/launch-sites/orange-county)
  does not list a Moodna Creek paddling launch. Keep the route held until a
  current permission-backed or official public entry and exit, parking/carry
  chain, and route-local flow/safety package are confirmed; do not promote a
  bridge, private driveway, old rail-bed, or fishing pull-off into an endpoint.
- **Rushford Lake Outlet — Rushford Lake to the Genesee River:** Hold the
  distinct 1.8-mile Class II–IV outlet pending a current lawful launch and
  managed-release package. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1397/main)
  describes an October drawdown-dependent run with a steep, slippery ravine,
  a roughly 250-foot descent, rope-assisted boat handling, and a confluence
  take-out bridge; those are hazard and route notes, not maintained public
  paddle endpoints. Public Rushford Lake access information confirms lake
  boating and dam-area fishing context, but does not establish permission for
  the dam-top descent or the downstream bridge landing. Reopen only with
  current owner/manager permission, release timing, a safe rope/egress plan,
  and a direct or defensible proxy gauge package.
- **Otter Creek — Eatonville Road to Pine Grove Road:** Hold the distinct
  2.1-mile Class III–V reach pending permission-backed water-entry and exit
  evidence. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1374/main)
  identifies the Eatonville bridge and Pine Grove Road turnout, but describes
  rough/limited road access, a dam-adjacent Class V portage, severe wood and
  cold-water hazards, and a take-out at a roadside sandy turnout rather than a
  maintained paddle facility. [NYSDEC Otter Creek State Forest](https://dec.ny.gov/places/otter-creek-state-forest)
  confirms public state-land parking, recreation, and camping context near the
  creek, but does not establish that either road anchor is a public boat launch
  or landing. The Independence River gauge used by American Whitewater is only
  a clearly labeled downstream proxy. Reopen only with current access
  permission, feature/portage review, and a complete rescue and vehicle plan.
- **Peters Kill — Alligerville Swim Hole to Rondout Creek:** Hold the distinct
  Class II–IV(V) lower Peterskill reach pending a lawful paddle-access chain and
  usable current evidence. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/4304/main)
  identifies the reach as a moving-water corridor, but the available
  [Minnewaska State Park Preserve material](https://parks.ny.gov/documents/inside-our-agency/MasterPlans/MinnewaskaStatePark/MinnewaskaStateParkAppendixB.pdf)
  documents trail/climbing access rather than a public canoe launch or landing.
  The [North Peters Kill USGS site](https://waterdata.usgs.gov/monitoring-location/01366900/)
  does not presently provide a continuous current-data package. Reopen only
  with manager-backed water entry/exit permission, route-specific flow
  guidance, and a complete high-consequence rescue/portage review.
- **Platte Kill — New Kingston / Dave Taylor Farm to Dunraven:** Hold the
  distinct Catskills corridor pending confirmed paddling endpoints and current
  flow support. NYCDEP maps show public access areas along the watershed, but
  those are not automatically boat launches, and the [USGS Platte Kill at
  Dunraven station](https://waterdata.usgs.gov/monitoring-location/01414000/)
  currently has no continuous data available. Do not convert fishing, hiking,
  or road anchors into paddle access until the public carry, landing, parking,
  and route-specific water-safety package is documented.
- **Canajoharie Creek — McEwan Road to Incinerator Road:** Hold the distinct
  Class III–V(V+) reach pending a lawful endpoint chain. American Whitewater
  identifies the route and its 35–40-foot gorge drop, but its access record does
  not establish maintained public paddling launches at the McEwan Road start or
  Incinerator Road finish. The current NYSDEC Montgomery County directory lists
  public Mohawk River/Barge Canal and Schoharie Creek launches, not Canajoharie
  Creek. USGS 01349150 is a useful same-creek gauge, but telemetry cannot cure
  the missing access and high-consequence portage evidence.
- **North Chuctanunda Creek — Hagaman to Amsterdam:** Hold the distinct 4.8-mile
  Class IV–V(V+) corridor pending a public access and rescue plan. American
  Whitewater documents a 10-foot dam, abandoned dam, low-head dam, wood, tight
  bridge sequence, and a take-out eddy behind the Amsterdam post office, but
  does not establish a current maintained public launch/landing chain. The
  Canajoharie Creek gauge is only a regional proxy, and the source's expert-only
  hazard posture is not enough to promote bridge or parking references into
  public access controls. The September 2, 2026 recheck of the current
  [American Whitewater reach page](https://www.americanwhitewater.org/content/River/view/river-detail/10884/main)
  still reports the same lethal low-head-dam, wood, bridge, and expert-only
  sequence, while the current [NYSDEC Montgomery County launch directory](https://dec.ny.gov/things-to-do/boating/launch-sites/montgomery-county)
  continues to list Mohawk River/Barge Canal and Schoharie Creek launches but
  no North Chuctanunda paddling launch. Keep this corridor held until a lawful
  endpoint and rescue package is independently established.
- **Nowadaga Creek — Newville to Indian Castle:** Hold the distinct 4.3-mile
  Class II–III reach pending a lawful endpoint chain. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/5034/main)
  identifies the Newville Road bridge put-in, the bike-path bridge below I-90,
  and several road crossings, but these are bridge/road anchors rather than
  current maintained public canoe launches or a confirmed vehicle-access and
  take-out chain. The Canajoharie Creek station roughly 10 miles east is a
  clearly labeled regional proxy, and the reach requires spring or heavy-rain
  flow, shale-ledges scouting, and an explicit portage plan. Do not promote the
  bridge references until a current public water-entry, parking/carry, and
  downstream exit package is documented.
- **Normans Kill — Normansville to Route 32 and upstream AW sections:** Hold
  the remaining distinct Albany-area whitewater sections pending a complete
  public endpoint and corridor-access chain. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1362/main) provides the
  lower 2.5-mile Class II(V) reach, exact route anchors, and a 1,000–5,000-cfs
  local-gauge correlation, while the [current NYSDEC launch directory](https://staffportal.parks.ny.gov/boating/launch-sites.aspx?cnty=&sort=4&way=) confirms
  only the New Scotland Road hand launch. The Route 32 parking-lot finish and
  the upstream river-park/Watervliet sections are not yet supported by a
  current general-use launch, carry, parking, and rescue chain; older planning
  documents also identify rifle-range and informal-access constraints. Keep
  this as a hold rather than converting bridge parking or informal river parks
  into public endpoints.
- **Sacandaga River — Christine Falls to East Branch:** Hold the Middle Branch
  whitewater reach pending a lawful below-dam endpoint chain. American Whitewater
  publishes the distinct 7.6-mile Class III–V+ corridor and warns not to trespass
  around the Christine Falls dam; it also says that finding a starting point below
  the dam at high water is very tricky. NYSDEC and local waterfall sources document
  public sightseeing parking/trails and nearby state-land context, but they do not
  establish a dedicated paddling launch below the dam or a complete downstream
  vehicle-access chain. Reopen only with current access permission, a safe dam/falls
  portage and take-out plan, and route-specific flow evidence.
- **West Canada Creek — Ohio Gorge:** Hold the short Class III gorge pending a
  public endpoint chain. American Whitewater publishes the distinct 1.3-mile
  continuous-rapid reach and a Wilmurt proxy gauge, but says the upper start is
  scouted from a road above the gorge and that the coordinates are approximate
  TopoZone points. Current NYSDEC Ferris Lake material identifies public South
  Branch and other hand launches, including the Fayle Road hand launch on the
  West Branch, but does not establish a dedicated Ohio Gorge put-in, take-out,
  parking/carry, or lawful downstream exit. Reopen only when current public
  access permission and a complete vehicle-access chain are documented; do not
  promote a roadside scout point into a launch.
- **West Canada Creek — Trenton Falls to Middleville / Comstock continuation:**
  Hold the remaining upper main-stem continuation pending a complete public
  paddling endpoint chain. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1453/main)
  describes the broad 25.8-mile Trenton Falls-to-Herkimer Class II corridor,
  but identifies the Trenton start just below a release dam and notes that most
  boaters put in farther downstream near Middleville. Current [NYSDEC Herkimer
  County launch listings](https://dec.ny.gov/things-to-do/boating/launch-sites/herkimer-county)
  do not list a West Canada Creek paddling launch, while the [current DEC Ferris
  Lake guidance](https://dec.ny.gov/places/ferris-lake-wild-forest) and relicensing
  access study document only specific lower/branch hand-launch or carry-in sites.
  NYSDOT bridge and fishing-access references are not sufficient to turn the
  Trenton dam, bridge, or angler sites into public canoe endpoints. Reopen only
  with permission-backed water entry, parking/carry, a downstream exit boundary,
  and release-aware flow/safety evidence; keep the already implemented
  Partridge Hill and Middleville-to-Kast cards as separate bounded corridors.
 - **East Canada Creek — Powley Place to Stratford:** Hold the upper 12.6-mile
   Class II–IV through-route separately from the implemented lower section and
   the new short Powley Place out-and-back. American
  Whitewater describes a seasonal-road start, a possible government gate,
  bushwhack/carry access, a major strainer report, and a downstream broken-dam
  take-out that is not yet supported by a complete public vehicle-access chain.
  [NYSDEC's current Ferris Lake Wild Forest guidance](https://dec.ny.gov/places/ferris-lake-wild-forest)
  documents the Powley Place hand launch as an undeveloped access where paddlers
  can go almost two miles downstream until rapids, then turn around; it does not
  establish the upper reach's seasonal-road start or a through-route take-out.
 Resolve the seasonal-road, downstream landing, gauge-locality, and portage
 evidence before adding it.
- **Oswegatchie Middle Branch — Long Pond Road to Old Camp at Mullins Flow:** Hold
  the distinct Class II–IV+ reach pending a complete lawful endpoint and
  vehicle-access chain. [American Whitewater's New York index](https://www.americanwhitewater.org/content/River/view/river-index/state/USA-NYO)
  lists the section, while [NYSDEC's current Watson's East Triangle Complex
  guidance](https://dec.ny.gov/places/watsons-east-triangle-complex) confirms that
  the Middle Branch is expert-only high-water whitewater and allows restricted
  motor-vehicle access along Mullins Flow Road for recreational canoeing. DEC
  also says the Oswegatchie Conservation Easement has no designated boat launches
  or access routes to its waters and is otherwise closed to public use except for
  specified canoe/portage travel. The Long Pond Road and Old Camp references
  therefore do not yet establish a normal public put-in/take-out with current
  parking, carry, downstream exit, and route-local flow package. Reopen only with
  permission-backed current endpoints and feature/portage review; do not promote
  the scenic-river designation or a lease-road point into a public launch.
- **South Branch West Canada Creek — Fayle Road to Nobleboro:** Implemented as
  a separate advanced planning-only route after the current DEC screen confirmed
  that the South Branch follows NY Route 8 from the Fayle Road hand launch to
  the Nobleboro bridge and that the route has a documented Class II–III sequence.
  Keep the Wilmurt station clearly labeled as a downstream proxy, retain the
  historical 2,000-cfs planning context, and do not treat the Nobleboro bridge
  or Fort Noble Trail as a universal ramp beyond the named access corridor.
- **Cobleskill Creek — Warnerville to Central Bridge:** Implemented as a
  planning-only approximately 13-mile moving-water route. The current
  Montgomery County whitewater page publishes the Warnerville/SUNY Cobleskill
  paddling coordinate and a Central Bridge take-out coordinate; NYSDEC
  independently lists the Central Bridge hand launch with eight-car parking and
  a 200-foot carry. American Whitewater supplies the distinct Class I–III
  route, strainers, shallow sections, Bramanville Falls, the ledge above
  Central Bridge, and the visual water-level screen, while USGS 01351298 gives
  direct live Cobleskill Creek telemetry. The county source disclaims monitoring,
  so the upstream carry, parking, school/campus restrictions, and exact
  waterline remain conditional and require field verification; the route stops
  at the Central Bridge launch before the Schoharie Creek continuation.
- **Esopus Creek — Allaben Portal to Phoenicia:** Hold pending a current
  general-use paddling endpoint pair. American Whitewater publishes the distinct
  Class II–III release-dependent reach, approximately 100-cfs/5–8-foot planning
  context, cemetery put-in, angler take-out, and serious strainer history.
  NYSDEC confirms Allaben Cemetery parking, fishing-access context, portal-driven
  flow changes, and nearby camping, but the current Ulster County boat-launch
  directory does not establish that the cemetery or angler landing is a general
  canoe/kayak launch and current local reporting documents access restrictions.
  Reopen only with permission-backed boat entry, a normal public take-out, and a
  current release/safety package; do not convert DEC fishing access into a
  paddling endpoint.
- **West Kill — Albinos Pizzeria to Schoharie Creek:** Hold the distinct
  lower-Catskills Class II–IV reach pending a public put-in and lawful exit
  chain. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1458/main)
  continues to publish the corridor and current West Kill gauge context, but
  the current [Hunter-West Kill Wilderness guidance](https://dec.ny.gov/places/hunter-west-kill-wilderness)
  describes the creek primarily as a fishing resource and does not identify a
  maintained canoe/kayak launch at Albinos Pizzeria or a public take-out at the
  Schoharie confluence. The [DEC Public Fishing Rights map](https://extapps.dec.ny.gov/docs/fish_marine_pdf/pfrwestkill.pdf)
  expressly limits those easements to fishing and bank walking, so they cannot
  be used as paddle-access permission. Keep this as a durable no-add until
  current public water-entry, parking/carry, and downstream landing evidence is
  available. The September 2, 2026 recheck of the current [American Whitewater
  New York index](https://www.americanwhitewater.org/content/River/view/river-index/state/USA-NYO)
  still lists the Albinos Pizzeria reach and current West Kill gauge context,
  while the current [Hunter-West Kill Wilderness guidance](https://dec.ny.gov/places/hunter-west-kill-wilderness)
  still describes the creek primarily as a fishing resource and does not add a
  maintained canoe/kayak launch or public confluence take-out. Keep the route
  held until that endpoint chain changes.
- **Oatka Creek — Le Roy to Mumford:** Implemented as a bounded advanced
  planning-only connector. The public Le Roy Red Bridge canoe/kayak launch on
  Munson Street now pairs with the named NYSDEC Mumford hand launch, resolving
  the earlier unnamed Route 383 finish without promoting a roadside or fishing
  point. Keep the direct Garbutt gauge, American Whitewater’s approximately
  4.5-foot lower screen and roughly 6-foot upper-feature reference, the
  non-runnable Buttermilk Falls portage, shallow/wood/cold-water hazards, and
  private-bank/railroad boundaries visible. The broader downstream Fort Hill or
  Canawaugus continuation remains governed by its separate route boundary and
  access package.
- **Schroon River — Warrensburg to Thurman Station:** Implemented as a short
  advanced planning-only whitewater card. American Whitewater supplies the
  distinct Class II–III reach, feature and private-bank warnings, and route
  geometry; the current Warrensburg canoe-access inventory independently lists
  River Street and nearby Schroon access sites. The small-park finish remains a
  map-derived waterline anchor: field-confirm its public carry, parking, landing,
  and downstream boundary before launch, and keep the direct Riverbank gauge as
  trend context rather than a universal numeric threshold.
- **Rock River — Lake Durant to Cedar River:** Hold. NYSDEC's Blue Mountain
  Wild Forest guidance says there is no designated or maintained portage trail
  and no downstream take-out point; its unit-management material also describes
  an 8.1-mile section, while American Whitewater publishes a materially
  different 29.4-mile Lake Durant-to-Cedar River reach. Resolve the boundary,
  portage, and take-out chain before creating a public route card.
- **West Branch St. Regis River — Five Mile Conservation Easement:** Implemented
  as a seasonal high-water planning-only moving-water route. The current [NYSDEC
  Raquette Boreal Complex guidance](https://dec.ny.gov/places/raquette-boreal-complex)
  names four Five Mile hand-launch parking areas, publishes their coordinates,
  documents the 0.4-mile carry at #3, and permits paddling on the designated
  West Branch section from May 1 through September 30. The river is navigable
  only during high water, with required portages around Main Camp and Saunders
  Camp exclusions; seasonal roads, logging, camp leases, cold water, wood, and
  limited rescue remain explicit. [USGS 04268800](https://waterdata.usgs.gov/monitoring-location/USGS-04268800/)
  supplies direct same-branch telemetry, but no numeric cutoff is asserted.
- **St. Regis River — Route 458 to St. Regis Falls:** Implemented as a
  permission-gated, planning-only advanced whitewater reach, kept separate from
  the existing Silver Staircase record. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1430/main)
  names the approximately 4.1-mile Route 458-to-St. Regis Falls section and its
  dam, rapid, bedrock, wood, and branch-junction hazards. The current [NYSDEC
  Franklin County launch directory](https://dec.ny.gov/things-to-do/boating/launch-sites/franklin-county)
  resolves the public Santa Clara Flow/St. Regis River upstream launch, while
  the [Town of Waverly campsite](https://www.townofwaverlyny.org/campsite)
  resolves a managed riverfront finish that requires current permission for
  landing, parking, staging, and camping. [USGS 04268800](https://waterdata.usgs.gov/monitoring-location/USGS-04268800/)
  remains a West Branch same-watershed proxy only; retain local scouting,
  dam/wood/portage review, route-specific flow guidance, and the hard boundary
  before Silver Staircase.
- **Cedar River — Wakely Dam to Sprague Brook:** Hold. The current [Blue
  Mountain Wild Forest guidance](https://dec.ny.gov/places/blue-mountain-wild-forest)
  identifies paddling on the Cedar/Rock system but says Rock River has no
  maintained portage trails or downstream take-out; the current [Moose River
  Plains guidance](https://dec.ny.gov/places/moose-river-plains-complex)
  provides trailhead context rather than a maintained Cedar whitewater launch
  chain. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1280/main)
  describes the distinct 13.9-mile Class II–V reach, uses the Hudson at North
  Creek as a proxy, and requires a seasonal/non-plowed Wakely Dam Road start
  plus a downstream cable/parking-lot exit. Those road and cable references do
  not establish a current public boat carry, vehicle-accessible take-out, or
  route-local rescue chain. Keep this as a durable no-add until the dam,
  intermediate portage, and take-out access are independently confirmed.
- **Boreas River — Route 28N to Hudson:** Hold. American Whitewater describes
  a distinct Adirondack whitewater corridor with a Route 28N start and a
  North Woods Club Road/Hudson-side take-out sequence, but NYSDEC says the
  Blue Ridge Road access is historically fishing access and that water
  conditions rarely allow canoe or kayak use. The current evidence does not
  establish a complete public vehicle-access chain or a route-specific live
  threshold tied to the North Creek proxy; do not promote roadside or fishing
  access into a paddling launch without a current public-access confirmation.
- **Ninemile Creek — Stittville to Feeder Canal:** Hold pending a current
  public endpoint chain. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1361/main) describes a distinct roughly
  6.5-mile Class II corridor and recommends the current USGS 01337005 station
  near Stittville, but its access notes rely on Mill Street/John Street and a
  canal-feeder take-out rather than named maintained canoe launches. The current
  [USGS 01337005 station near Stittville](https://waterdata.usgs.gov/monitoring-location/01337005/)
  supplies direct continuous/daily discharge and gage-height context
  (2022–current), improving the flow screen but not curing the access gap.
  [current NYSDEC boat-launch directory](https://extapps.dec.ny.gov/docs/fish_marine_pdf/nyboatlaunching.pdf)
  does not list Ninemile Creek as a public launch, while other NYSDEC material
  confirms fishing/public-water context,
  but does not establish that the roadside start, canal-feeder landing, parking,
  and carry are lawful general-use paddling endpoints. Reopen only with
  permission-backed access, current water-entry coordinates, and a route-local
  safety/portage package; do not substitute the similarly named Onondaga
  County Ninemile Creek launch for this Oneida County reach.
  The September 2, 2026 recheck of current NYSDEC material still describes
  Ninemile Creek public access as PFR parking areas, unofficial pull-offs,
  Marcellus County Park, and the separate Amboy canoe/kayak launch in
  Onondaga County; it does not establish the Stittville Mill Street/John
  Street start or the Feeder Canal finish as general-use paddle launches.
  Keep the direct 01337005 gauge lead, but do not promote this Oneida County
  reach until both endpoint carries and vehicle staging are permission-backed.
- **Woodhull Creek — Horton Road to Meekerville Road bridges:** Hold pending
  corrected public endpoint evidence. American Whitewater’s current route page
  describes a distinct 2.5-mile Class I–II beginner corridor and a current
  Black River near Boonville proxy, but explicitly warns that its map and
  directions show the wrong creek and its access instructions use a road bridge
  and a gate before closed bridges. Those are not yet authoritative maintained
  canoe launches or a complete lawful carry/parking chain. Reopen only after
  current public endpoint confirmation and corrected route geometry/access
  controls are available.
- **West Stony Creek — Pinnacle to Route 30:** Hold pending current public
  endpoint evidence. The older Shaker Mountain Wild Forest UMP records a distinct
  Class II–III corridor and an access label from Pinnacle to Route 30, but the
  current NYSDEC Shaker Mountain page does not publish a maintained river
  hand-launch/take-out chain for that reach. Its current paddling guidance lists
  lake launches and boat launches, while the creek is mentioned for a hiking
  ford. Reopen only after current lawful parking, water-entry, take-out, and
  route-specific safety evidence are confirmed.
- **Hague Brook — McCoy Road to Town Beach:** Hold pending a lawful upstream
  access confirmation. American Whitewater publishes the distinct 3.8-mile
  Class II–III(V) reach and a Schroon River Riverbank gauge proxy with a
  7–12-foot planning band, and the Town of Hague confirms public Town Beach
  access at the finish. The proposed McCoy Road bridge start is described as a
  roadside put-in rather than a maintained public boat launch, while the local
  Hague Brook USGS record does not currently provide a usable live route
  threshold. Do not turn the roadside description into an access claim.

  The current [NYSDEC Lake George Wild Forest record](https://dec.ny.gov/places/lake-george-wild-forest)
  does identify a Hague Brook Parking Area at 43.749436, -73.504378 with a
  path to a bridge, which is useful for lower-reach viewing/scouting and
  confirms public parking context. It does not identify the McCoy Road bridge
  as a canoe launch, carry, or public vehicle staging area, so the parking-area
  evidence does not close the upstream access gate. Keep the route held until
  that specific start and a current-water package are independently verified.
- **Batavia Kill — Swinging Bridge to Route 23A:** Hold. American Whitewater
  publishes the distinct 8.6-mile Class II–III+(V) reach and a Red Falls gauge
  with approximately 400 cfs low / 600 cfs good historical planning context,
  but the current [NYSDEC Batavia Kill access map](https://extapps.dec.ny.gov/docs/fish_marine_pdf/pfrbataviak.pdf)
  documents public-fishing-rights easements rather than canoe launches, and
  fishing access cannot be treated as a general paddling endpoint. The [NYC
  DEP current notice](https://www.nyc.gov/site/dep/recreation/fishing.page)
  also says the Red Falls Recreation Unit is closed for stream-restoration
  construction from May 26 through November 30, 2026. Reopen only after a
  current lawful launch/take-out chain, construction status, and route-specific
  flow/safety package are verified.
- **Honeoye Creek — Highway 20 to Big Eddy Park:** Hold pending a complete
  public put-in chain. American Whitewater documents the 6.3-mile Class II–III
  reach, the direct Honeoye Falls gauge, the 12-foot downtown dam boundary,
  and the strong ledge hazards, but its preferred Highway 65 start requires
  permission to cross private farmland; the Highway 5/20 bridge alternative
  adds 3.5 miles of flatwater and still needs current public water-entry
  confirmation. The current NYSDEC Monroe County directory confirms a public
  Honeoye Creek hand launch at Fishell Road in Rush, while the live USGS
  04229500 station is at Honeoye Falls; neither source closes the upstream
  Highway 20/65 access gap or proves that the DEC site bounds this whitewater
  reach. A separate Fishell Road out-and-back card now uses that verified
   launch without claiming the Highway 20/65 whitewater corridor or a Golah
   railroad-bridge take-out. Reopen the through-route only when a lawful,
   field-usable start and finish are independently verified.
   The September 2, 2026 recheck found the current NYS Parks launch directory
   still lists Fishell Road as the Honeoye Creek hand launch, while the current
   Honeoye Creek WMA access material documents managed-land trails and parking,
   not a maintained Highway 20/65 canoe entry or a lawful downstream paddle
   finish. Keep the through-route held and do not reinterpret the Fishell card
   as access to the separate American Whitewater corridor.
 - **Nine Mile Creek — Amboy/Munro Park to Onondaga Lake:** Hold pending a
  complete contiguous public endpoint chain. NYSDEC currently confirms the
  Amboy parking area and canoe/kayak launch and lists Marcellus County Park,
  while the Nine Mile Creek Conservation Council identifies Munro Park as the
  practical downstream paddling start and describes the lower half as usable.
  The [Onondaga County paddling directory](https://onondagacountyparks.com/activity/canoeing-kayaking/)
  documents a seasonal free kayak launch on the Onondaga Lake outlet, but the
  county's [current boat-launch notice](https://onondagacountyparks.com/parks/onondaga-lake-park/boat-launchmarina/)
  says the main marina launch is closed for construction; the current sources
  still do not establish that the Amboy or Munro access can be legally
  connected to a usable downstream take-out as one bounded route. The
	[Ninemile Creek near Marietta USGS station](https://waterdata.usgs.gov/nwis/inventory/?site_no=04240180)
	reports no continuous, daily, or field-measurement data, and the Lakeland
	record is likewise historical. The lower Munro Park-to-Pumphouse corridor is
	now implemented separately as a planning-only route because the watershed
	council names Munro Park as the practical lower-half start and DEC emergency
	material plus recurring public paddling events corroborate the Pumphouse
 launch area. The separate Pumphouse-to-outlet continuation is also bounded as
 planning-only because the County documents a seasonal outlet kayak launch.
 Keep the historical gauges, access-area coordinates, industrial boundaries,
 seasonal outlet status, and current permission caveats visible; do not merge
 either card with an unverified Amboy-to-Onondaga Lake through-route or invent a
 numeric cutoff.
  The September 2, 2026 recheck found the county's current launch notice still
  marks the Onondaga Lake Park marina and boat launch closed for construction,
  with reopening anticipated in fall 2026; the separate seasonal outlet kayak
  launch remains useful public access context but does not cure the missing
  contiguous route chain or historical-gauge problem.
- **Jordan River — Marsh Pond outlet to Carry Falls Reservoir:** The lower
  Lassiter-to-Carry Falls segment is implemented as an advanced planning-only
  card using NYSDEC's signed 1.5-mile canoe carry and published access anchors.
  Keep the upstream Marsh Pond extension on hold: it remains a separate remote
  flatwater/portage and high-water route question without a complete bounded
  endpoint and local gauge package.
- **Indian River — Abanakee Dam to Hudson:** Implemented as an advanced
  planning-only whitewater card. American Whitewater's distinct 2.3-mile
  Abanakee Dam-to-Hudson reach and NYSDEC's Rafters/Outer Gooley access context
  are paired with direct USGS 01315000 discharge data. Keep the dam-release,
  Otter Slide/Class III+ sequence, cold-water, strainer, and mandatory
  above-confluence take-out warnings visible; do not invent a universal
  numeric cutoff, and keep the historical dam image clearly labeled.
- **Independence River — Donnattsburg to Old Pine Grove:** Hold as a separate
  lower-section project. American Whitewater identifies this as a distinct,
  substantially harder Class II–V reach with direct Donnattsburg gauge context,
  but the current route card stops at the Donnattsburg bridge to preserve a hard
  boundary. Reopen only with a permission-backed public take-out/vehicle chain,
  feature-level rescue and portage review, and explicit separation from the
  upper Bailey-to-Donnattsburg card.
- **East Branch Oswegatchie — Inlet to Wanakena:** Implemented as a separate
  short Class II–IV planning-only reach. American Whitewater identifies the
  distinct 2.2-mile section, NYSDEC confirms the Inlet Road hand launch and
  Moore Trail carry context, and the St. Lawrence County Center for History and
  Culture documents launching at the Wanakena town beach. Keep the Wanakena
  point as an access-area anchor requiring current municipal confirmation, use
   USGS 04262000 only as a downstream proxy, and stop before the separate
   Cranberry Lake continuation.
- **Saranac River — Union Falls to Casey Road Carry:** Implemented as a separate
  advanced planning-only whitewater reach. American Whitewater identifies the
  4.2-mile Class II–III Union Falls section and says Silver Lake Road access is
  disputed; the Casey Road state-land canoe carry is used as the publication
  boundary. NYSDEC confirms the Union Falls hand launch, nearby Union Falls Pond
  camping, and higher-water Class III character below the dam. Keep USGS 04273500
  clearly labeled as a downstream dam-affected proxy, confirm the carry from the
  river before launch, and do not merge this card with the harder Silver Lake-to-
  Redford continuation.
- **Bog River — Lows Lower Dam to Bog River Falls:** Implemented as a separate
  advanced planning-only whitewater reach. American Whitewater lists the distinct
  Round Lake Outlet/Bog River Class IV–V section, its North Creek stage proxy,
  approximate route geometry, tree hazards, and Bog River Falls finale. NYSDEC
  confirms the Lower Dam hand launch, spring-only lower rapids, the Split Rock,
  Winding Falls, and Round Lake Outlet carries, and public entry at Bog River
  Falls. The product card deliberately uses the DEC-confirmed Lower Dam start,
  keeps the AW Round Lake title as an alias, stops before Bog River Falls, and
  claims only nearby designated camping rather than an on-route campsite.
- **Anthony Kill / Tenandeho — Round Lake Preserve to Mechanicville City Dock:**
  Implemented as an advanced planning-only moving-water route. Saratoga PLAN
  publishes the public preserve car-top launch and Anthony Kill recreation
  context, while the City of Mechanicville and Hudson River Greenway Water Trail
  publish the public City Dock cartop take-out. American Whitewater and the
  Tenandeho Canoe Association establish the distinct spring Class II corridor,
  and USGS 01335698 provides a direct Coons gauge. Keep the preserve waterline
  coordinate, log-jam/beaver-obstruction carries, no-universal-threshold
  posture, City Dock boundary, and no-bank-camping claim visible.
- **East Branch Fish Creek — Point Rock to Taberg:** Hold. American Whitewater
  provides a compelling Class II–IV route description, Point Rock access
  coordinates, feature-level hazards, and approximate stage observations, but
  the current USGS 04242500 record reports data only through October 1, 2024
  and no current values, while the lower take-out is explicitly on private
  property dependent on landowner generosity. Reopen only after a current
  gauge posture and permission-backed public vehicle/access chain are
  established; DEC's unrelated Fish Creek State Forest and pond-launch records
  are not evidence for this Oneida Lake tributary reach. The September 2026
  recheck found no change: the current AW record still marks the Taberg take-out
  as private-property access dependent on the landowner, and the current [DEC East
  Branch Fish Creek State Forest page](https://dec.ny.gov/places/east-branch-fish-creek-state-forest) documents adjacent state-land parcels and
  general recreation rules but no maintained canoe/kayak launch or public
  take-out for this reach. Keep this as a durable no-add until the lower endpoint
  and gauge posture change.
- **Hannacrois Creek — Deans Mill to the Hudson:** Hold. American Whitewater
  describes a distinct Class III–IV gorge, but notes that the run was scouted
  rather than completely run, with large drops, shallow landings, and limited
  portage options. The [USGS Hannacrois Creek near New Baltimore station](https://waterdata.usgs.gov/monitoring-location/USGS-01359924/)
  has only 1967–1977 daily data and no continuous or current field data; the
  live gauge used by American Whitewater is therefore a Normans Kill proxy.
  Current evidence also does not establish a complete public Deans Mill-to-
  Hudson endpoint chain. Reopen after public access, current-water, and
  field-scouting evidence can support a bounded route card.
- **Chittenango Creek — Cazenovia to Chittenango Falls:** Implemented as an
  advanced direct-gauge whitewater route. This is a 3.7-mile American
  Whitewater Class II–III reach from the Cazenovia outlet to the fishing
  access before Chittenango Falls, with direct USGS 04244000 and a 150–1,500
  cfs planning band. Lakeland Park public kayak/canoe launch and feeder-
  connection context, NYSDOT Route 13/Chittenango Creek fishing-access
  context, broken-dam/strainer/cold-water hazards, the mandatory take-out
  before the two 60-foot falls, and nearby Green Lakes State Park basecamp
  context are documented; launch permits and exact below-dam landing remain
  conditional.
- **Butternut Creek — Jamesville Reservoir to Route 481:** Implemented as a
  planning-only advanced 2-mile American Whitewater I–III+(IV) run. The card
  uses the NYSDEC Jamesville Reservoir hand launch and NYSDOT Route 481 /
  Jamesville Road fishing-access site as water-adjacent endpoint anchors,
  clearly labels USGS 04244000 as a Chittenango Creek watershed proxy, keeps
  the American Whitewater 150–800 cfs band, and documents Dunlop Falls, the
  Jamesville Road dam, trees, private-bank, landing, parking, and current-use
  caveats. Green Lakes State Park is nearby-basecamp context only.
- **Chittenango Creek — Chittenango Falls to Recognition Park:** Implemented
  as a planning-only Class II(III) downstream section. The card starts at the
  American Whitewater below-falls anchor, retains its 150–1,500 cfs direct
  USGS 04244000 band, includes the American Whitewater village-side anchor,
  and finishes at the Village of Chittenango’s currently advertised
  Recognition Park kayak launch. Trees, cold water, the two 60-foot falls'
  hard upstream boundary, village hours, parking, landing, and local-rule
  checks remain explicit.
- **Catskill Creek — upstream/West Main Street to the Hudson:** Hold pending a
  current general-use paddling endpoint pair. The current NYSDEC public-fishing-
  rights map documents angler parking and stream easements, not a canoe/kayak
  launch, while the State’s current Catskill downtown improvement application
  describes the West Main Street small-craft launch as a 2026 project still in
  design and says the existing gravel paths are difficult and limited. The
  Hudson River Greenway does provide public cartop-launch context at
  RamsHorn–Livingston and Dutchman’s Landing, so the bounded RamsHorn-to-
  Dutchman’s connector is implemented separately; do not stretch it into an
  upstream Catskill Creek route without a lawful water-entry chain, current
  channel/portage evidence, and route-specific water guidance.
- **Kaaterskill Creek — Palenville to High Falls:** Hold the distinct lower
  Catskills Class II–III reach pending a lawful maintained paddling endpoint
  chain. [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/4236/main)
  describes a route-source pull-in, bushwhack, waterfall portages, private
  banks, and a bridge take-out rather than a current public canoe/kayak launch
  pair. Current [NYSDEC Kaaterskill Wild Forest
  guidance](https://dec.ny.gov/places/kaaterskill-wild-forest) prohibits parking
  in the Route 23A pull-offs during the main season, identifies a restricted
  Fawn’s Leap riparian area, and warns of flash floods. The nearby North Lake
  campground and boat launch are lake facilities, not proof of a creek
  through-route. Reopen only when a current public or permission-backed water
  entry, legal landing/carry, and route-specific gauge and rescue package are
  documented.
- **Taughannock Creek — upstream creek or falls-to-lake through-route:** Hold as
  not currently established as a distinct moving-water route. Current NYS Parks
  material identifies the Taughannock boat launch as a Cayuga Lake facility,
  while the Finger Lakes Blueway pocket guide describes the Taughannock trip as
  launching at the creek’s north point, crossing Cayuga Lake, and continuing
  along the lake to Myers Park. The creek’s waterfall boundary, lake exposure,
  and lack of a separate creek endpoint/gauge package do not support a
  through-route card; keep it separate from the implemented Cayuga Inlet route.
- **Oatka Creek — Mumford to Scottsville:** Implemented as a planning-only
  moving-water route. The lower-section study identifies the Mumford-to-Genesee
  corridor and active Garbutt USGS 04230500; NYSDEC lists the Mumford hand launch
  and Scottsville identifies Canawaugus Park along Oatka Creek. Keep direct
  telemetry as context only, with visual depth/wood checks, the Sabin low-head
  dam portage, overhead-wire/strainer hazards, public/private shoreline limits,
  and the Canawaugus take-out verification visible. No on-route camping is
  claimed.
- **Schoharie Creek — North Blenheim to Middleburgh:** Implemented as a
  planning-only moving-water route distinct from the existing Esperance–
  Burtonsville card. NYSDEC lists the six-car North Blenheim hand launch, the
  Village of Middleburgh identifies Timothy Murphy Park as creek-side access,
  and USGS 01350180 provides direct North Blenheim telemetry. Route-specific
  reports describe an early Class II sequence followed by mostly Class I water,
  with cold water, strainers, shallow gravel, bridges, and flood-response
  concerns; no numeric threshold or on-route camping is claimed.
- **Schoharie Creek — Burtonsville to Fort Hunter:** Implemented as a
  planning-only approximately 14-mile downstream section that completes the
  public Schoharie launch sequence after the existing Esperance–Burtonsville
  card. The current NYS Parks/NYSDEC directory lists the Burtonsville hand
  launch and the Dufel Road / Schoharie Crossing launch, while American
  Whitewater reports Class I–II ledges, wave trains, changing channels, and a
  strainer below Mill Point. USGS 01351500 is direct context at Burtonsville;
  the route stops at Dufel before the Schoharie–Mohawk confluence and claims
  nearby-basecamp-only camping.
- **Jordan River — Lassiter to Carry Falls:** Implemented as an advanced
  planning-only lower segment. NYSDEC publishes the two ends of the signed
  1.5-mile Jordan River Canoe Carry and identifies high-water whitewater below
  the Lassiter bridge, including Class IV–V Tebo Falls. The route uses regulated
  USGS 04267500 only as a same-river trend proxy, exposes no numeric threshold,
  keeps the Carry Falls dam/reservoir as a mandatory take-out, and documents
  remote rescue, cold-water, strainer, private-bank, carry, and nearby Parmenter
  campground caveats. The Marsh Pond headwater extension remains held.
- **Peconic River — Downstream Blueway after Weeping Willow:** Hold the further
  downstream extension as a separate review. The Peconic Estuary Partnership
  maps a 9.5-mile Blueway with eight launch locations, including the downtown
  Riverhead launch and Indian Island. The current four Peconic cards already
  cover that moving-water chain; the downtown launch is an intermediate access
  within the implemented Weeping Willow-to-Indian Island reach, not a distinct
  corridor to publish as another route. PEP also identifies four dams and says
  paddlers must carry across streets to continue, while NYSDEC and PEP identify
  Upper Mills Dam and the USGS weir as active barriers. Keep the downstream
  continuation as a review hold unless a genuinely separate reach beyond the
  covered Blueway gains independently verified public water entry, portage,
  tidal/water-quality conditions, endpoint coordinates, and vehicle logistics.
  The September 2026 screen checked the [current PEP recreation
  page](https://www.peconicestuary.org/news-and-events/maps-gis/maps-recreation/),
  [Suffolk County canoe/kayak access](https://www.suffolkcountyny.gov/Departments/Parks/Activities-and-Attractions/Canoeing-and-Kayaking),
  and [NYSDEC’s Suffolk County launch inventory](https://dec.ny.gov/things-to-do/boating/launch-sites/boat-launch-suffolk):
  they confirm the same Riverhead-to-Indian Island Blueway and public endpoint
  chain already represented in the four cards. No distinct beyond-Indian-Island
  reach clears the access/portage gate, so do not duplicate the covered route.
- **Jessup River Wild Forest fastwater inventory:** Jessup and the Lewey Lake/
  Miami River out-and-back are now implemented as bounded planning routes,
  with direct Jessup-gauge context for the former and a clearly labeled nearby
  proxy for the latter. Hold
  the remaining Cedar, Indian, and Fall Stream candidates until each has
  its own bounded public endpoint pair and route-local current-water evidence;
  do not promote a single launch or roadside access point into a through-route
  without that chain. The September 2026 Cedar screen checked [NYSDEC’s Blue
  Ridge Wilderness access notes](https://dec.ny.gov/places/blue-ridge-wilderness),
  [NYSDEC’s Moose River Plains paddling context](https://dec.ny.gov/places/moose-river-plains-complex),
  and the [American Whitewater Cedar-1 description](https://www.americanwhitewater.org/content/River/view/river-detail/1280/main):
  these confirm the Wakely-area public road, campsites, and lake launch
  context, but the moving-water reach still relies on seasonal/unplowed access
  and a remote informal cable/parking take-out. Keep Wakeley Dam to Sprague
  Brook held until a complete public endpoint and vehicle/carry chain is
  independently verified.
- **Fall Stream / Fall Lake access:** Hold as a separate remote flatwater and
  carry review. NYSDEC currently names Fall Stream among the Jessup River Wild
  Forest paddling destinations and identifies one primitive campsite at Fall
  Stream, but its current access inventory lists no public Fall Stream hand
  launch. The Jessup Unit Management Plan records Fall Stream/Fall Lake access
  as via private land and makes securing an easement for a canoe launch and
  parking an investigation, not an established public endpoint. The current
  evidence therefore cannot support a route card with a lawful vehicle-access
  chain, route-local flow evidence, or a defensible take-out. Reopen only after
  DEC or the landowner establishes current public water entry and parking, then
  verify the full carry/portage and water-condition package independently.
- **Owasco Outlet — Canoga Road to Turnpike Road:** Hold. American Whitewater
  publishes a distinct 3.1-mile Class II(III) reach, but the Canoga start
  lacks confirmed public access and carries private-owner, citation, and
  municipal-ordinance concerns. The Turnpike finish is described as a small
  shoulder/herd-path landing, with a low-head dam and wood/bridge hazards
  nearby, rather than a clean fully official endpoint chain. The [current
  USGS Owasco Outlet station](https://waterdata.usgs.gov/monitoring-location/USGS-04235440/)
  does provide live direct-gauge data, but it also confirms flow regulation by
  the State Dam; that improves the water-condition evidence without resolving
  the access gate. Reopen only after lawful water entry, take-out, and current
  access conditions are verified.

  A bounded continuation below Turnpike toward Port Byron/Mosquito Point was
  screened in the same pass. American Whitewater describes the downstream
  Class II mileage and a state-launch destination, but the current source set
  does not provide a route-specific public Turnpike launch record or a clean
  current endpoint/portage chain for the full continuation. The [City of
  Auburn boating restriction](https://ecode360.com/8969937) and the [current
  USGS station record](https://waterdata.usgs.gov/nwis/uv?site_no=04235440)
  reinforce the need to keep the upstream boundary and regulated flow visible;
  no separate Owasco card is promoted until the Turnpike access and the
  downstream public landing are independently verified. The September 2026
  screen checked the [current Cayuga County Emerson Park
  listing](https://www.cayugacounty.gov/facilities/facility/details/Emerson-Park-1),
  the [NYSDEC Cayuga County launch inventory](https://dec.ny.gov/things-to-do/boating/launch-sites/cayuga-county),
  and the [current Owasco Outlet waterbody assessment](https://extapps.dec.ny.gov/data/WQP/PWL/0706-0001.html):
  these confirm public Owasco Lake access and outlet waterbody context, but do
  not establish a public moving-water entry at Canoga/Turnpike or a clean
  downstream vehicle-access and portage chain. Keep the AW Owasco reach held.
- **Salmon Creek — Ludlowville Falls to Cayuga Lake / Myers Park:** Implemented
  as a planning-only short moving-water reach. American Whitewater publishes the
  Class I–II feature sequence, rapid rain response, mandatory Ludlowville Falls
  portage, and Myers/Cayuga endpoint; USGS 0423401815 provides current same-creek
  discharge and stage context. The Town of Lansing confirms Myers Park’s public
  lake frontage, ramps, and paddle-craft facilities, while NYSDEC maps the lower
  creek and Ludlowville Park context. Keep the falls carry, shallow-water/wood/
  cold-water hazards, park rules, and the explicit fishing-only limit of NYSDEC
  PFR evidence visible; the stored endpoints remain access-area anchors requiring
  current water-entry and creek-side exit confirmation.
- **Raquette River — Helenbrooks Hole:** Implemented as a planning-only 0.29-mile
  Class II park-and-play reach. American Whitewater publishes the Stowe Lane
  put-in, Cold Brook Drive bay take-out, direct South Colton gauge, named wave
  train, and immediate Higley Flow reservoir boundary. USGS 04267500 documents
  large diurnal fluctuations from the South Colton powerhouse, while NYSDEC and
  New York State Parks provide nearby launch, recreation, and camping context.
  Keep utility release timing, the short reach’s limited rescue margin, exact
  carry/landing permission, and the mandatory reservoir take-out visible; the
  dynamic 2,180–5,050 cfs observations are context rather than a fixed threshold.
- **Raquette River — Forked Lake Campground to Deerland:** Implemented as an
  advanced planning-only whitewater reach. American Whitewater publishes the
  distinct Class II–III section, the 3.6-mile header versus 4.5-mile feature
  mileage discrepancy, exact reach geometry, mandatory Buttermilk Falls carry,
  and the Deerland lean-to access description. NYSDEC currently publishes the
  Forked Lake Campground and Day Use Area launch, an intermediate Raquette River
  hand launch, North Point Road/Buttermilk Falls access, and the public
  Sargent Ponds state-land/camping context. Keep the Piercefield station
  clearly labeled as a far-downstream proxy, treat approximately 4.5 feet as
  historical low-runnable planning context rather than a guarantee, and verify
  the yellow-gated 100-yard Deerland carry, campground season/day-use fee,
  local wood, and the mandatory falls portage before launch.
- **Ausable River — Ausable Chasm to US Route 9:** Implemented as a planning-only
  3.3-mile Class IV+ whitewater reach with the designated NYSEG Rainbow Falls
  put-in context and designated Route 9 public take-out. American Whitewater
  documents the committing canyon, feature hazards, low-runnable context, and
  access limits; NYSEG publishes the seasonal gate, four-car parking area,
  access-road trail, and powerhouse stairs. USGS 04275500 is explicitly labeled
  as an upstream same-system proxy rather than a route-local gauge. The route
  uses nearby-basecamp camping posture, no on-route camping claim, mandatory
  Route 9 exit, and a route-specific American Whitewater image plus curated
  canonical geometry. Confirm current gate status, proxy trend, rain, debris,
  landing, and private/utility boundaries before launch.
- **Salmon River (Lake Champlain) — Military Turnpike to Lake Champlain:** Hold.
  American Whitewater describes a distinct six-mile Class IV reach with a
  Military Road Bridge start and lake finish, but also states that the surrounding
  land is privately owned and that the stream is not classified as navigable,
  leaving scouting, portage, and emergency-exit rights uncertain. The available
  Great Chazy gauge is a same-region proxy rather than a route-local station, and
  the current evidence does not establish a complete public vehicle/access chain.
  Reopen only with permission-backed endpoint and portage evidence plus a clearly
  labeled current flow package.
- **North and South Sandy Creek whitewater variants:** Hold as a grouped western
  New York screen. American Whitewater documents distinct Class II–IV sections,
  but the North Sandy reach uses a Black River proxy and describes shoulder/
  roadside access with landowner uncertainty, while the South Sandy descriptions
  rely on roadside or bridge-area starts and limited endpoint detail. Do not
  promote these into public route cards until a contiguous lawful endpoint chain,
  current local or defensible proxy gauge, and route-specific hazard/portage
  evidence are independently verified.
- **Carmans River — Montauk Highway to Beaver Dam Road:** Implemented as a
  planning-only tidal route. NYSDEC lists the Montauk Highway hand launch with
  its 300-yard carry and cooperative Wertheim access, while the Town of
  Brookhaven documents the public Beaver Dam Road kayak launch. Use the Yaphank
  USGS station only as a same-river freshwater proxy; NOAA tide context, wind,
  low-bridge clearance, local depth, refuge rules, and the difficult floating
  dock control the day-of decision. No bank-camping claim is made.
- **Connetquot River — Johnson Avenue to Sunrise Highway:** Hold. DEC classifies
  approximately 5.75 miles as a Recreational River, but the current Suffolk
  County public-launch directory does not establish a public launch/take-out pair
  on that corridor, and no current route-specific gauge or permission-backed
  vehicle chain was verified. Reopen only with lawful water-entry evidence and a
  complete access, safety, and gauge package.
- **Connetquot River — Great River Ramp to Heckscher Field 7:** Implemented as a
  planning-only lower-estuary route. The Town of Islip lists Great River Ramp as
  a public boat-launching ramp, and the current NYS Parks Long Island guide
  explicitly identifies Field 7 as an access point for the lower Connetquot River
  and Great South Bay. Use the current USGS 01306495 stage/quality feed only as a
  same-river proxy; NOAA tide, wind, shallow water, bay exposure, water quality,
  park/ramp permits, and actual waterline inspection control the trip. Heckscher
  camping is nearby managed-basecamp context only. This lower card does not open
  the protected Johnson Avenue–Sunrise Highway reach.
- **Catatonk Creek — Candor to Owego:** Implemented as a planning-only 11.7-mile
  moving-water route. American Whitewater publishes the endpoint geometry, Class
  I–II(III) character, opening dam/broken-dam cautions, and a 2–5 ft screen on
  USGS 01514000; Tioga County and the Village of Owego document canoe/kayak access
  context at the Candor and Owego ends. Keep the stored endpoints as access-area
  anchors requiring current carry, parking, and landing confirmation, and stop at
  the Owego Creek endpoint before the Susquehanna confluence.
- **Canisteo River — Canisteo to Addison:** Implemented as a planning-only
  long-distance Class I–II corridor. American Whitewater publishes the named reach,
  endpoint geometry, 4–17 ft West Cameron correlation, and route mileage; Chemung
  River Friends provides a more conservative 5–7 ft planning window and warns that
  upstream dam operations can change levels quickly. Regional river-trail/access
  sources identify Canisteo Park, Cameron Mills, Rathbone, and Addison access areas.
  Preserve the 20-mile versus 28.9-mile source discrepancy, intermediate bailouts,
  and current landing/parking verification in the route card.
- **Flint Creek — Orleans to Phelps:** Implemented as an advanced planning-only
  seasonal whitewater route. American Whitewater publishes the Class II–III+(IV)
  reach, Waddell Road/Wheat Road/Phelps water-entry anchors, bridge and strainer
  hazards, and the Old Mill Falls boundary; USGS 04235250 supplies direct Phelps
  telemetry. Ontario Pathways provides public creek-side trail context, but the
  stored road/trail access points are not treated as automatic boat launches.
  Keep the 250 cfs runnable-but-low trip-report screen, high-water escalation,
  legal carry/parking checks, and mandatory Old Mill Falls scouting explicit.
- **Kinderhook Creek — East Nassau to Valatie:** Implemented as a planning-only
  scenic moving-water route. American Whitewater publishes the 18.7-mile I–II(III)
  corridor and endpoint anchors; Hudson Taconic Lands, the East Nassau fishing
  access, and Valatie’s River Street/Beaver Mill public creek-side context support
  the access review; USGS 01361000 supplies direct Rossman telemetry. No numeric
  cutoff is asserted. Preserve the conditional boat-entry posture, private-bank
  permission warnings, strainer/bridge checks, and the boundary before the lower
  Valatie-to-Columbiaville falls section.
- **South Branch Grass River — Spruce Mountain to First Brook:** Implemented as
  an advanced planning-only high-water section. NYSDEC supplies both current
  hand-launch coordinates, identifies the branch as challenging whitewater used
  during high water, and documents the named falls and state-land rules. American
  Whitewater adds the upper-branch Class II–IV+(V) feature context, while USGS
  04265432 at Chase Mills provides only a downstream same-river trend proxy.
  The route ends at First Brook and deliberately does not claim the gated or
  permission-sensitive New Bridge/Copper Rock take-out; keep local visual flow,
  wood, scouting, portage, cold-water, and remote-rescue checks controlling.
- **Middle Branch Grass River — Middle Branch Hand Launch to Lampson Falls:**
  Implemented as a moderate planning-only flatwater reach. NYSDEC documents the
  approximate four-mile flatwater section, the Middle Branch 300-foot carry,
  the Lampson Falls 0.4-mile carry, nearby designated primitive camping, and
  the harder water/falls boundary. USGS 04265432 remains only a downstream
  same-river trend proxy; the stored coordinates are access-area anchors rather
  than surveyed waterline points, and the Lampson Falls take-out is mandatory.
- **Grass River — Lampson Falls to Downerville:** Implemented as an advanced
  planning-only 4.1-mile Class IV+ seasonal section. American Whitewater names
  the exact reach, feature sequence, high-consequence drops, and the Downerville
  take-out path. NYSDEC confirms the Lampson Falls 0.4-mile carry and the
  Downerville State Forest River PFAR parking/kiosk near the North Branch
  confluence, with designated primitive camping nearby. USGS 04265432 at Chase
  Mills is a downstream same-river proxy only; no numeric threshold is exposed.
  Carry below Lampson Falls, inspect the current 2026 wood report, scout every
  feature, and stop at Downerville before the separate Russell continuation.
- **South Branch Grass River — Twin Falls / State Put-in to DeGrasse:**
  Implemented as an advanced planning-only 6.9-mile Class IV–V seasonal section.
  American Whitewater documents the State Put-in-to-DeGrasse reach, the
  Rainbow/Large Marge, Twin Falls, Sinclair Falls, Basford Falls, and final
  DeGrasse hazards. NYSDEC currently lists the Route 3 South Branch access and
  the DeGrasse State Forest hand launch with a lean-to, primitive camping, and
  river frontage. USGS 04265432 at Chase Mills is a downstream same-river
  proxy only; no numeric threshold is exposed. Require expert rescue capability,
  feature-by-feature scouting, and a hard take-out at DeGrasse.
- **North Branch Grass River — Clare Road to Downerville:** Implemented as an
  advanced planning-only 4.7-mile Class II–III section with a mandatory carry
  around 40–50-foot Harper Falls. American Whitewater supplies the distinct
  endpoint anchors, route character, wood warning, and downstream boundary;
  current NYSDEC Church Pond and Grass River plans establish seasonal public
  paddling rights in the North Branch public recreation area and public
  Downerville access/camping. USGS 04265432 is the downstream same-river proxy;
  the historical route-local 0426475505 station has no current discharge series,
  so no numeric threshold is exposed. Keep the conservation-easement season,
  mud/road closures, private-lease limits, Harper Falls carry, and Downerville
  boundary visible.
- **Fall Creek — Route 13 Bridge to Flat Rock / Cornell Botanic Gardens:**
  Implemented as a planning-only 4.7-mile Class II moving-water reach.
  American Whitewater publishes the distinct endpoint anchors, direct USGS
  04234000 gauge, 350–5,000 cfs planning band, strainer/shallow-rock hazards,
  and mandatory Flat Rock boundary before the low-head dam and rougher/private
  downstream reach. NYSDEC’s Fall Creek PFR map and Cornell Botanic Gardens
  materials provide public corridor, natural-area, and Forest Home parking
  context, but do not establish a dedicated Route 13 launch or blanket paddling
  permission; retain planning-only status and verify entry, landing, parking,
  closures, and the dam boundary in the field. No on-route camping is claimed;
  use a nearby legal basecamp.
- **Salmon River — Route 2A / Compactor Pool to Black Hole through Pulaski:**
  Implemented as an advanced planning-only 3.8-mile Class II–III reach.
  American Whitewater publishes the distinct endpoint names, feature sequence,
  primary Pineville gauge, 750–10,000 cfs planning band, release context, and
  Black Hole boundary. NYSDEC confirms Compactor Pool as a drift-boat launch and
  Black Hole as a parking/access point; Oswego County identifies the public
  north bank and the private/paid DSR opposite bank. Keep fishing lines/hooks,
  bridge/wood/cold-water/release hazards, wastewater discharge below the take-out,
  and nearby-basecamp-only camping visible; coordinates remain access-area
  anchors requiring field verification.
- **Grass River — Downerville to Russell:** Implemented as a planning-only
  2.7-mile Class I–II section. American Whitewater publishes the endpoint pair
  and moving-water character; NYSDEC confirms Downerville State Forest parking,
  river frontage, campsites, and high-water/ford cautions, while regional access
  guidance identifies the Russell Route 24 bridge context. Keep the Chase Mills
  gauge as downstream proxy context only, preserve access-area uncertainty at
  both ends, and verify the Russell landing, traffic, private banks, and current
  road conditions.
- **South Branch Moose River — Rock Dam to McKeever:** Implemented as an
  advanced planning-only 22.1-mile Class II–IV reach. American Whitewater
  publishes the endpoint anchors, direct McKeever gauge, 2.65-foot ALC traverse
  condition, private-land boundary, portage option, and remote-rescue hazards;
  NYSDEC documents public Rock Dam Road end-of-road parking and the seasonal
  gate/road system. Keep the May–October navigation window, registration,
  navigation-only ALC terms, one-day/daylight objective, no-camping/no-bank-entry
  limits, cold-water/wood/rapid hazards, and McKeever landing verification
  prominent.
- **Moose River — McKeever to Iron Bridge / Above Tannery:** Implemented as an
  advanced planning-only 3.5-mile Class III reach. American Whitewater publishes
  the direct McKeever gauge, geometry, named features from Initiation through
  Ledge Rapids, and Iron Bridge/Above Tannery access options; NYSDEC provides
  surrounding public access/parking context. Treat the reported 2.60-foot
  runnable observation as dynamic context rather than a fixed threshold, and
  verify both the river-road start and small downstream landing before launch.
- **Moose River — Nelson Lake out-and-back:** Implemented as a planning-only
  3.6-mile flatwater and short moving-water outing. Current NYSDEC Black River
  Wild Forest guidance identifies the informal Nelson Lake Hand Launch on the
  Middle Branch and the flatwater/outlet connection to Nelson Lake; a local
  paddling report adds the short carry, shallow weedy outlet, small beaver dam,
  and route distance. The route returns to the same hand launch before the
  downstream rapids and does not claim a through-route to McKeever. Use the
  current McKeever gauge only as broad same-river context, follow railroad and
  seasonal-road safety rules, and use nearby designated camping only.
- **Grass River — DeGrasse to Pyrites:** Implemented as an advanced
  planning-only high-water continuation. Current NYSDEC guidance identifies the
  DeGrasse State Forest hand launch, the South Branch's high-water/portage and
  whitewater character, and the surrounding falls; a current NYS DPS access
  document identifies the public ADA-accessible Pyrites Route 21 kayak/canoe
  launch. The route remains bounded before the Pyrites hydropower dam, uses the
  live Chase Mills station only as a downstream proxy, and retains the long
  shuttle, multiple-carry, cold-water, wood, and private-bank controls.
- **East and Middle Branch St. Regis Santa Clara sections:** Implemented two
  distinct DEC-documented corridors. The East Branch Vanderwalker–Everton
  section is a nine-mile flatwater shuttle with a 0.4-mile upstream carry. The
  Middle Branch Indian Rock–Four Mile section is a separate approximately
  seven-mile downstream moving-water/whitewater continuation with four marked
  carries and more than 150 feet of drop. Both retain the West Branch 04268800
  station as a clearly labeled same-watershed proxy, access-area coordinates,
  private-easement/logging/leased-camp restrictions, and strict field checks.
- **Cazenovia Creek — West Falls to Mill Road:** Implemented as a planning-only
  event-dependent whitewater route. American Whitewater publishes the distinct
  Class II–III Aurora–West Seneca corridor, the West Falls start, the Mill Road
  preferred take-out, a roughly 6.5-foot Ebenezer planning reference, and the
  short post-rain runnable window. The Town of Aurora and Town of West Seneca
  provide public creek-side park context at the two endpoints, while USGS
  04215500 provides direct lower-corridor telemetry. Keep the approximately
  10-mile anchor-to-anchor planning distance, dam/ledge/wood/rapid-rise/cold-
  water/private-bank hazards, carry and landing uncertainty, and nearby-
  basecamp-only camping posture visible.
- **West Canada Creek — Partridge Hill Road to Route 28 overlook:** Implemented
  as the access-study's approximately 3-mile Class I–II upper Section 1
  segment. The relicensing study identifies NYSDEC Downstream Recreation Sites
  3 and 5 as public carry-in access, while American Whitewater supplies the
  broader moving-water character and Newport Dam boundary. USGS 01346000 at
  Kast Bridge is retained as a clearly labeled downstream proxy because the
  upper segment has no feature-local current station. Keep the 300 cfs tubing
  planning screen, release-driven rise, cold-water, wood, bridge, traffic,
  private-bank, carry, and nearby-basecamp caveats visible.
- **Basic Creek — Swartout Road Bridge to Freehold:** Hold. American
  Whitewater lists a distinct Class II–IV reach, but the current source set
  does not establish a permission-backed canoe endpoint chain or a current
  direct gauge. DEC's Basic Creek material documents reservoir/fishing context,
  not a moving-water launch; the historical American Whitewater accident record
  also reinforces the high-water/cold-water/private-access risk. Reopen only
  after public endpoints, current-water guidance, and a route-specific safety
  package are verified.
- **Bear Kill — Route 30 bridge to Intake Road bridge:** Hold. American
  Whitewater lists a distinct Class II–IV section and USGS 01350035 provides
  current same-river telemetry at the Intake Road bridge near the mouth, but
  NYSDOT bridge records document crossings rather than paddling launches and
  the current source set does not establish a lawful public put-in/take-out
  chain. Reopen after access, parking/carry, and endpoint landing evidence are
  confirmed.
- **Chautauqua Creek — Putnam Road to Lake Erie:** Hold. American Whitewater
  lists a distinct Class III–IV reach, but the current NYSDEC PFR map documents
  fishing-and-bank-walking easements only, and the Chautauqua Gorge management
  plan warns that much stream access is likely trespass. Current Westfield
  material confirms Chautauqua Creek reaches Lake Erie and that Barcelona Harbor
  has a public Lake Erie launch, while the county Putnam Road listing does not
  identify a paddling launch, parking/carry rule, or vehicle-access chain for the
  creek reach. Do not substitute the Lake Erie harbor for the creek mouth or
  convert fishing access or a scenic gorge into a paddling endpoint; reopen after
  a lawful launch/take-out chain and route-specific water/safety package are
  established. The September 2, 2026 recheck found that the current [NYSDEC
  Chautauqua County launch directory](https://dec.ny.gov/things-to-do/boating/launch-sites/chautauqua-county)
  still lists Lake Erie/Cattaraugus Creek and lake facilities but no Chautauqua
  Creek paddle launch, while the current [USGS Chautauqua Creek station
  04213319](https://waterdata.usgs.gov/monitoring-location/USGS-04213319/)
  confirms live same-creek monitoring. The gauge improves flow context but does
  not cure the missing lawful Putnam Road access and take-out chain.
- **Chateaugay River — Lower Chateaugay Lake to Cooks Mill:** Hold. American
  Whitewater and the current Visit Malone route page describe a distinct 12.2-mile
  Class II–V+ reach with put-in/take-out coordinates, and a 2025 trip report
  documents a powerline-lot carry and multiple dams/wood hazards. The current
  NYSDEC/Franklin County material confirms public lake and fishing access but does
  not establish a permission-backed general-use paddling launch, vehicle chain,
  or legal take-out at the named river endpoints. Keep the reach held until the
  Cromp/Bunker Hill start and Hartnett/Healy finish are independently verified
  for paddling, with a current high-water/safety package. The September 2, 2026
  recheck found the current [Visit Malone route page](https://www.visitmalone.com/paddling/lower-chateaugay-lake-to-cooks-mill)
  still supplies the approximate 12.2-mile route and endpoint coordinates, and
  the current [NYSDEC Franklin County launch directory](https://dec.ny.gov/things-to-do/boating/launch-sites/franklin-county)
  still does not list a Chateaugay River paddle launch. The newer route report
  remains useful hazard evidence, but its powerline-lot carry is not public-access
  authorization; keep the route held until both endpoints and the high-water
  rescue/portage plan are independently cleared.
- **Mettawee River — Truthville to Upper Turnpike / North Granville:** Hold.
  [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/1343/main)
  describes an I–V reach with a documented dangerous sieve, property-access
  concerns, and a local-expert/permission posture; the current
  [Washington County tourism source](https://www.adirondack.net/things-to-do/paddling-in-washington-county/)
  mentions only a small launch area near the Truthville bridge and does not
  establish a complete public vehicle/carry chain to the Upper Turnpike finish.
  The current [USGS Middle Granville station](https://waterdata.usgs.gov/monitoring-location/USGS-04280450/)
  is useful flow context but has no current continuous observations in the
  current record. Do not promote this high-consequence reach until the exact
  public endpoints, live/recent water guidance, rescue plan, and permission
  status are independently verified.
- **West Branch Cazenovia Creek — Glenwood to Lackawanna:** Hold. American
  Whitewater describes a distinct II(IV) reach and a very short heavy-rain
  window, but its access description is approximate and the current NYSDEC
  Cazenovia Creek property page identifies fishing access rather than a public
  paddling launch. Bridge, park, and road references do not establish a lawful
  put-in/take-out or private-bank landing chain. Reopen only after named public
  water entries, current rainfall/flow guidance, and a route-specific rescue and
  dam/wood plan are verified.
- **Cayuta Creek — Gulf Road near Odessa to Milltown:** Hold. American
  Whitewater lists a cross-state Class II(III) reach and NYSDEC/NYSDOT identify
  public fishing-access context near Route 224, but those sources do not verify
  a general-use paddling launch at the New York start or a clean state-boundary
  endpoint. Reopen only after a permission-backed launch, take-out/portage
  plan, and current-water source are available.
- **Beaver Kill — Turnwood to East Branch (Delaware River):** Hold. American
  Whitewater publishes a distinct 33.5-mile Class II–III reach and a direct
  Cooks Falls gauge correlation, while NYSDEC documents state-land and public
  fishing access in the wider Beaver Kill system. The current evidence does not
  yet establish a dedicated public paddling launch and vehicle chain at the
  Turnwood start, and the AW Fish Road/East Branch finish is not the same as the
  current DEC-listed East Branch hand launch. Reopen only after the exact public
  water-entry and take-out parcels, any intervening portage/landing rights, and
  the long-route camping/shuttle plan are independently verified.
- **Batten Kill — Greenwich to Hudson River:** Hold as substantially covered.
  American Whitewater publishes a distinct 7.3-mile Greenwich-to-Hudson reach
  with a 600–2,000 cfs planning correlation, but the route overlaps the existing
  Battenville-to-Clarks Mills card through the Greenwich and lower-falls corridor.
  Rock Street Park and Hudson Crossing provide useful public paddling context,
  yet a second card would duplicate the covered water and still require a
  separate lower-falls/mouth boundary review. Reopen only if a non-overlapping
  Greenwich-to-mouth product boundary and independent public endpoint value are
  established.

The Northern Montezuma rotation now adds a bounded Seneca River loop around
Howland Island. The NYSDEC WMA plan supplies the current public North Boat
Launch coordinate, the public-docking context at Howland Island, and the
approximately 9-mile loop concept. The record intentionally returns to the
same launch, uses USGS 04237496 near Baldwinsville only as broad same-river
proxy context, and does not infer island camping, refuge access, or private
shoreline landing rights.

The lower Genesee rotation now adds the short, downstream Turning Point Park
to Port of Rochester connector. The current City boating map lists Turning
Point and Petten Street as hand-carry locations and the Port as a ramp/docking
location; NYSDEC independently lists the Port as a municipal Genesee River/
Lake Ontario launch. The Blueway map places the three sites on the navigable
lower main stem, while the City map marks the separate upstream dam and
waterfall area as non-navigable. This record remains planning-only: use the
Ford Street gauge as upstream trend context, preserve the Petten bailout only
after confirming its seasonal dock, and stop at the Port before open-lake
exposure or upstream falls/dams.

The next lower Genesee rotation adds a distinct upstream out-and-back from the
current seasonal Petten Street car-top dock toward Lower Falls. City and
Genesee RiverWatch material support Petten as the public water entry; American
Whitewater supplies the named Lower Falls feature and hazard context. This
record returns to Petten, uses the direct Ford Street gauge only as upstream
trend context, treats Lower Falls/the lower gorge as a hard boundary, and does
not promote the Seth Green fishing access as an unverified paddling launch.

The Hudson estuary rotation now adds a bounded Tivoli North Bay loop. Current
NYSDEC material identifies the Kidd Lane canoe launch, spring-through-fall
car-top access at all tides, no-motor WMA rules, and boat-accessible islands;
the Hudson River Reserve and Hudson River Greenway independently corroborate
public paddling and water-trail context. The route returns to Kidd Lane and
uses NOAA's Tivoli tide predictions plus a distant Hudson USGS proxy; it does
not claim island, marsh-bank, railroad, private-shore, or open-Hudson landing
rights, and it makes no on-route camping claim.

The Rondout rotation now adds a bounded Kingston-to-Eddyville out-and-back.
The Hudson River Greenway identifies T.R. Gallo Park as a City of Kingston
cartop launch with tide information and waterfront services, while a current
Mid-Hudson Adirondack Mountain Club account documents the paddle to the
Eddyville Dam and return. NYSDEC separately lists a public Creek Locks Road
launch above Eddyville, but that site is retained as context rather than a
through-route endpoint. The record uses the active Rosendale USGS station as a
clearly labeled upstream proxy, stops before the dam, and makes no claim for
private waterfront landing or overnight access.

The lower Catskill Creek village connector is now implemented as a bounded
planning-only tidal route from the NYSDEC-listed Kiwanis Park/Catskill Middle
School hand-launch area to Dutchman’s Landing. The official Hudson Estuary
access map identifies both public endpoints; current regional and
school-district material corroborate the school-side launch. The route uses
historical USGS 01362090 only as clearly labeled same-creek context, keeps tide,
wind, wakes, mud, debris, urban water quality, and private-dock hazards visible,
and stops at Dutchman’s Landing before the exposed Hudson continuation. The
school-side coordinate remains an access-area anchor requiring field
confirmation, and the proposed 2026 West Main Street ADA launch is not treated
as operational without a current construction/use check.

The Itaska-to-Chenango Forks Tioughnioga section is now implemented as a
planning-only approximately 5.5-mile route. Broome County’s 2024 river guide
names Itaska as the alternate start for the Chenango Forks trail, and current
NYSDEC/NYS Parks directories list both public hand launches. The route uses
USGS 01512500 near Chenango Forks only as a clearly labeled downstream proxy,
keeps low water, strainers, cold water, private banks, and the mandatory Route
12 finish visible, and claims nearby basecamp only rather than shoreline
camping.

The lower Lakeview South Sandy Creek boat route is now implemented separately
from the existing Route 95-to-Lakeview whitewater card. It is a bounded
planning-only approximately 3.8-mile out-and-back from the current DEC South
Sandy Creek car-top launch to the New York Sea Grant-documented Lake Ontario
outlet and back. The outlet is stored only as a turnaround landmark, not a
take-out; the route keeps shallow marsh channels, vegetation, wind, outlet
surf, wildlife-management rules, and nearby-basecamp-only camping visible.

## Next systematic frontier

The next review rotation now continues through the remaining distinct
whitewater and moving-water candidates in the official American Whitewater New
York index before returning to already-covered Hudson/Champlain launch chains.
The [American Whitewater New York index](https://www.americanwhitewater.org/content/River/view/river-index/state/USA-NYO)
and current NYSDEC/NYSDOT/municipal access sources provide the next screening
set; review remaining candidates in this order so the statewide expansion keeps
adding new water rather than subdividing already-covered launch areas:

1. **Black River / Keuka Outlet follow-up** — the Watertown–Dexter canyon boundary
   and Penn Yan–Dresden Outlet route are now implemented with explicit access,
   gauge, safety, camping, imagery, and geometry posture. Re-audit their municipal
   launches, mandatory carries, and event/season conditions as current sources change;
   do not treat either card as blanket permission for private banks or utility paths.
2. **Peconic River downstream Blueway** — resolve the Grangabel/remaining dam,
   Riverhead launch, tidal transition, and any missing portage/endpoint chain
   beyond the implemented Upper Mills-to-Weeping-Willow section; do not treat
   the existing Weeping Willow-to-Indian Island card as permission for an
   unreviewed through-route.
3. **Cedar and Owasco screen** — retain the remaining Cedar River branches and
   Owasco Outlet holds above unless a complete public endpoint and current-water
   package emerges; these are evidence checks, not invitations to add thin
   launch-only cards. Jessup now has a bounded public river-to-lake card with
   direct river gauge context.
4. **Connetquot River** — keep the protected Johnson Avenue-to-Sunrise corridor
   on hold because it still lacks a lawful general-use endpoint pair. The lower
   Great River Ramp-to-Heckscher Field 7 estuary card is now implemented with
   separate public access evidence; do not treat it as permission for the upper
   preserve or open-bay continuation.
5. **Additional Erie Canal and water-trail corridors** — rotate west-to-east
   from Albion toward San Souci Canal Park and Rochester through any remaining
   official guide gaps. Sections 5 through 8 are implemented; Sections 9 through
   31 are implemented; Section 32 is represented by the existing Champlain route;
   Section 34 is implemented; and Section 35 is held as substantially covered by
   the existing Moreau–Lock C5 route. The Weeping Willow–Indian Island tidal
   reach and the Upper Mills–Weeping Willow gap are now implemented; the
   remaining Grangabel/downstream continuation remains held until its
   dam/portage chain is independently verified.
6. **Champlain follow-up and gap review** — audit the full Champlain chain for
   any remaining guidebook access gaps that can be safely separated without
   duplicating the covered Stillwater–Waterford launch areas.
7. **Adirondack high-water branches** — the Middle and South Branch Grass River
   reaches, including the new Twin Falls–DeGrasse section and the Lampson
   Falls–Downerville main Grass section, plus the two Santa Clara St. Regis
   corridors are now represented as separate bounded routes. The DeGrasse–Pyrites continuation remains held
   because the corridor is remote, portage-heavy, and its current intermediate
   access/vehicle chain is not yet complete. The lower Bog River Lower Dam–Bog
   River Falls reach is now represented separately; continue with remaining
   East-Canada/Rock/Bog systems, retaining holds for any candidate whose
   endpoints or portage/camping chain is not public and current. The Middle
   Branch Oswegatchie screen is now explicitly held pending permission-backed
   endpoints and a complete lawful vehicle/carry chain.
8. **Northern and western short whitewater screens** — revisit the Lake Champlain
   Salmon and Sandy Creek variants only if public endpoint, portage, and current
   flow evidence improves; keep them as holds while rotating toward other distinct
   New York watersheds.
9. **Finger Lakes and Hudson tributary rotation** — Flint Creek and Kinderhook
   Creek are now represented with direct gauges and guarded access anchors;
   Kayaderosseras Creek now adds a public Saratoga blueway segment with historical
   gauge context, the lower Kinderhook rotation now adds a bounded
   Stuyvesant Falls-to-Stockport corridor with an official NYSDEC downstream launch,
   and the Hudson estuary rotation adds the public Schodack-to-Catskill water-trail
   section with a direct Catskill gauge context plus the RamsHorn–Livingston tidal
   connector to Dutchman’s Landing. The lower Catskill Creek village connector is
   now implemented as a bounded planning-only route with the Kiwanis/Catskill
   Middle School to Dutchman’s Landing access chain; the Itaska-to-Chenango Forks
   Tioughnioga section is now also implemented with current DEC/NYS Parks hand
   launches and a downstream proxy; the lower Lakeview South Sandy Creek
   outlet out-and-back is now implemented separately from the upstream Lorraine
   Gulf whitewater card; the upstream Catskill Creek extension and Taughannock Creek remain holds for missing moving-water endpoint
   packages. Continue with
   remaining Kinderhook/Catskill branches only when the
   endpoint chain is public or permission-backed and the route-specific hazard
   package is complete. Keep bridge,
   fishing-only, private-bank, and proposed-access evidence as holds rather than
   treating them as launches.

Every candidate stays in screening until it has the standard package: public
on/near-water access controls, route-specific safety and logistics, a clearly
labeled direct or proxy gauge, camping posture, an image, curated geometry,
registry wiring, and focused validation. Candidates that fail one of those
gates should be recorded as **Hold** with the missing evidence rather than
promoted as thin route cards.

Latest screening notes for the active rotation: the current DEC Lakeview WMA
plan and launch directory confirm South Sandy Creek, Lakeview Pond, and the
marsh channels as public boating access, and New York Sea Grant describes a
short South Sandy Creek route to the Lake Ontario outlet. The lower South Sandy
Creek route is now implemented as a single-launch out-and-back to the mapped
outlet approach; the remaining Lakeview Pond, internal marsh, and exposed Lake
Ontario extensions remain held where they lack a clean second public finish or
require separate open-water review. The corridor still carries shallow-channel,
wind, and wildlife-management restrictions.
The Burtonsville-to-Fort Hunter Schoharie section is now implemented as the
downstream continuation of the existing Esperance-to-Burtonsville card; the
remaining Schoharie-to-Mohawk confluence continuation stays outside this route
until its separate open-water and lock/confluence safety package is reviewed.
The Riparius-to-The-Glen Hudson Lower Gorge section is also now implemented as
the distinct American Whitewater Class III reach between the current Riparius
and The Glen canoe-access sites; it remains bounded before the separate
Thurman/Warrensburg and Hadley corridors, with direct USGS 01316031 context and
nearby-basecamp-only camping.
Oneida County Ninemile Creek remains on hold because the American Whitewater
Stittville-to-Feeder-Canal reach has no verified public vehicle-access chain at
both endpoints, despite the current USGS station near Stittville. Ouleout Creek
also remains on hold: American Whitewater publishes the Wagner Hollow Road
Bridge-to-Route 357 reach and a gauge, but no current official public paddling
endpoint chain has been confirmed. These are screening results, not route
records; revisit them only when the missing public endpoint evidence improves.
The Black River rotation now adds two adjacent but separately published upper
reaches: Forestport Reservoir to Hawkinsville (American Whitewater Section 4,
6.6 miles, Class II with standout Class III slides) and Hawkinsville to Norton
Road (Section 5, 5.6 miles, Class III). Current NYSDEC guidance identifies
Forestport-to-Hawkinsville as good canoeing and names Hawkinsville and Norton
Road among the upper-river access locations; the current Oneida County launch
directory supplies the Forestport Reservoir launch and parking context. Both
cards use direct USGS 04252500 near Boonville, retain the 4.5-foot low-water
planning floor and conservative upper contexts from American Whitewater, and
stop at their documented boundaries before the downstream Denley/Port Leyden
structures. The route-specific features, regulated release, cold-water, wood,
dam, and landing caveats remain mandatory day-of checks.
The Raquette rotation now adds the distinct Piercefield-to-Parmenter Site reach
(American Whitewater Section 2, 17.6 miles, Class II–V) using the current public
Piercefield, Sevey, Moody Falls, Jamestown Falls, and Parmenter access chain. The
current NYSDEC Raquette Boreal Complex page confirms the named whitewater corridor,
public hand launches, long portages, and expert-only posture; USGS 04266500 is the
direct Piercefield station and records powerplant-driven fluctuation. The new card
keeps Moody Falls and both Jamestown Falls as conservative portage boundaries,
requires same-day release/wood/rescue checks, and ends before Carry Falls Reservoir.
Current live-index screening keeps several nearby candidates held. The Owasco
Outlet continuation below Turnpike is described by American Whitewater as a
pleasant Class II section to Port Byron and then Class I to the State launch at
Mosquito Point, but current access references describe Turnpike as a steep,
unofficial entry; no route is promoted until that upstream endpoint is confirmed.
The longer American Whitewater Riverside Road Permanent Rapids concept remains held
because those endpoints are not matched by a current general-paddling launch chain;
the shorter Moose Pond Bridge-to-Permanent Rapids boundary is now promoted from the
current DEC/NFCT description, with its bridge/portage anchors and mandatory pre-rapids
take-out caveats visible. DEC still describes the nearby Franklin Falls hand launch as
anglers-only. Hoosic
Petersburgh Park and Play remains held because its access requires a track
crossing and informal path, while current DEC listings show other Hoosic launches.
Irondequoit Creek Channing Philbrick remains held because the route uses a park
trail and historical park guidance disputes paddling access; current Monroe
County launch listings do not identify Philbrick as a public boat launch.
The Wallkill rotation now adds the distinct New Paltz-to-Rosendale public-launch
gap. Current NYSDEC Ulster County listings identify hand launches at both ends,
the Wallkill River Watershed Alliance access inventory marks the same sites active,
and its community annual report records a New Paltz-to-Rosendale paddle. The card
uses the direct Gardiner USGS station as upstream same-river trend context, keeps
the local 1,000 cfs shallow-water screen and bloom/wood/private-bank hazards
visible, and ends at Rosendale before the Sturgeon Pool hydroelectric boundary.
The same rotation screened three additional candidates and kept them held: the
Kinderhook Creek Valatie-to-Columbiaville reach has a documented Class IV-V
sequence and is not normally run in its entirety, while the current public
endpoint and portage chain is incomplete; Claverack Creek Stottville-to-
Kinderhook Creek lacks a current general-paddling endpoint chain; and the
Rondout High Falls-to-Rosendale reach has major American Whitewater hazards
without a verified current upstream public launch/control package. These remain
research targets rather than route cards until the access and safety evidence is
strong enough.
The Oneida River follow-up was also checked against the current NYSDEC Oneida
River map and launch directory. The existing Three Rivers Point/Bonstead Road-
to-Brewerton Section 17 card already covers the verified Oneida River launch,
Lock E23, Caughdenoy Dam, and Oneida Lake boundary, so no duplicate Oneida
River card is warranted.
The Oswegatchie lower-main-stem rotation now adds the distinct Heuvelton-to-
Ogdensburg corridor. The current St. Lawrence Valley Paddlers Remington I
course documents the 10-mile flatwater trip, Eel Weir shallow section, short dam
portage, and Lafayette Spring Street finish; current NYSDEC listings confirm the
Heuvelton and Eel Weir public launches. The Ogdensburg finish remains a
community-documented access-area anchor and requires current municipal landing
and parking confirmation.
The lower Raquette rotation now adds the distinct Raymondville-to-Massena Springs
corridor. The current NYSDEC Raquette River page publishes the 7.8 canoe-mile
route, River Road put-in 0.6 mile below Raymondville Dam, Massena Springs Town
Park take-out, four rapid/portage areas, shallow-water warning, and power-generation
level-change caution. USGS 04268000 is a direct Raymondville station with
continuous telemetry but substantial regulated/diurnal fluctuation, so the card
keeps a qualitative route-specific flow posture rather than inventing a numeric
cutoff. The route ends at Massena Springs before the downstream segment that
requires permission to cross the St. Regis Indian Reservation; both endpoint
coordinates remain access-area anchors requiring same-day carry, parking,
water-entry, landing, and municipal-status confirmation.
The East Canada rotation now adds the DEC-supported Powley Place short
out-and-back. The current Ferris Lake Wild Forest page identifies the undeveloped
Powley Place Hand Launch, says paddlers can go almost two miles downstream until
the rapids, and directs the island/head-of-rapids turn-around; it also documents
nearby designated and roadside camping. The card uses USGS 01348000 only as a
far-downstream same-river proxy and keeps the full Powley-to-Stratford
Class II–IV through-route held because its seasonal-road/gate access and
downstream take-out remain unresolved.
The Speculator-area Sacandaga rotation now adds the DEC-supported Duck Bay
flatwater loop. The current Perkins Clearing and Speculator Tree Farm page
identifies the Speculator Ball Field and Duck Bay hand launches, describes the
almost-5-mile round trip, and separates it from the hydropower dam and the
rapids/cascades downstream. USGS 01321000 near Hope is retained only as a
clearly labeled downstream same-river proxy; no numeric cutoff is asserted,
and the route remains a conservative out-and-back with designated-camping and
closed-gate/logging/leased-camp safeguards.
The Kunjamuk branch rotation now adds the DEC-supported Speculator-to-Elm-Lake
out-and-back. Current DEC guidance describes the village Ball Field launch,
the Kunjamuk branch, almost four miles to Elm Lake, beaver-dam/obstacle
conditions, and the approximately 12-mile return outing. The route deliberately
uses Speculator for both vehicle endpoints: current DEC recreation-management
material says the proposed Elm Lake car-top launch is no longer accessible, so
Elm Lake remains a water objective/turn-around rather than a take-out. USGS
01318779 is retained as same-river historical/proxy context with no numeric
cutoff, and nearby designated camping plus closed-gate/logging/leased-camp rules
remain explicit.
The Marion River/linked-lake rotation now adds the Blue Mountain Lake-to-
Raquette Lake itinerary. Current DEC material identifies the distinct five-mile
Scenic Marion River reach; the Northern Forest Canoe Trail and Hamilton College
corroborate the linked lakes, easy flatwater character, route mileage context,
and the required Bassett Carry around the Utowana dam/rapids. The current
regional Blue Mountain guide identifies the Town Beach as the lake’s only
public boat launch, while the Raquette Lake management plan and regional launch
listing identify the public Village General Store launch. The route remains a
planning-only shuttle trip with exposed-lake wind/wave hazards, private-bank
and carry restrictions, designated-camping context, and USGS 04267500 retained
only as a distant downstream proxy with no numeric cutoff.
The Dead Creek rotation now adds the distinct Route 3 pull-off-to-headwaters
marsh loop. Current DEC guidance identifies the three-mile secluded paddle
through shallow, winding marshland, and the DEC UMP confirms the DOT pull-off
and informal put-in at State Route 3; the current regional guide documents the
roughly 20-yard carry and protected character. The route returns to the same
roadside access, claims no headwaters take-out or formal hand launch, uses
04267500 only as a distant Raquette proxy, and keeps shallow-water, beaver-dam,
vegetation, cold-water, private-bank, and designated-camping controls visible.
The Osgood River rotation now adds the distinct Osgood Pond-to-river out-and-back.
Current NYSDEC pages identify the Osgood Pond Hand Launch and its access to the
Osgood River, while the current regional guide documents the pond crossing,
narrow sheltered river, roughly 2.75-mile river portion, obstructions, and two
primitive river tent sites. The route returns to the DEC launch, keeps the
Meacham Lake mouth as a water-only objective, and uses USGS 0426859505 only as
named context because the current station page has no continuous, daily, or
field data; no numeric threshold is claimed.
The North Branch Saranac rotation now adds the distinct North Branch Road-to-Lake
Kushaqua approach out-and-back. Current NYSDEC guidance identifies the public
non-motorized hand launch, access path, dock, and exact access-area coordinate,
while DEC's Sable Highlands guidance warns that the section is fast-moving and
not recommended for beginners. The Kushaqua recreation plan and current regional
waterway guidance add the stream-valley, obstruction/beaver-dam, connected-lake,
and nearby camping context. The route returns to the DEC launch, keeps the Lake
Kushaqua approach as a water-only objective, and uses USGS 04273500 only as a
far-downstream Saranac proxy with no numeric local cutoff.
The Grass River rotation now adds the distinct DeGrasse-to-Pyrites continuation.
Current NYSDEC guidance identifies the DeGrasse State Forest hand launch and says
the South Branch is challenging whitewater used during high water, with multiple
falls and designated portage trails. A current NYS DPS access document identifies
the public ADA-accessible Pyrites Route 21 launch with safe roadside loading and
unloading. The route is bounded before the Pyrites hydropower dam, uses USGS
04265432 at Chase Mills only as a live downstream proxy, and keeps the route
planning-only with no numeric local cutoff.
The upper Boquet rotation now adds the distinct Route 73-to-Split Rock Falls
boundary. American Whitewater's current route record identifies the 3.9-mile
Class IV–V reach, Route 73 North Fork start, Shoebox, Andy's Hole, and Split
Rock Falls hazards. Current NYSDEC pages identify the Boquet River Parking Area,
public Route 73 access, and a primitive tent site on the Boquet bank immediately
upstream of Split Rock Falls. The route ends at that public DEC riverbank/campsite
anchor, treats the falls as a mandatory boundary, uses the Ausable 04275500 station
only as a proxy, and remains planning-only pending field confirmation of the exact
landing and carry.
The next Boquet review adds two longer, distinct Lake Placid route cards: Beaver
Meadow Brook to Northway (17.6 miles, Class II–III) and Northway to Boquet
(16.6 miles, Class II–IV). Their current route pages publish water-aligned
endpoint pins, mileage, and class descriptions, while the Willsboro USGS station
provides only a clearly labeled downstream proxy. Because the pages do not fully
describe launch parking, carries, or legal public use, both cards remain advanced
planning-only with conditional access, no invented numeric cutoff, nearby-basecamp
camping, and a hard boundary between each reach and the adjacent Boquet cards.
The Aldrich Pond rotation now adds the distinct nearly 7-mile Youngs Road-to-
Streeter Lake Road Little River canoe route. Current NYSDEC guidance identifies
both public hand launches, the flatwater corridor, and the short carry around
Schuler Fall; the Aldrich Pond UMP amendment documents the public canoe-route
purpose and public-land carry/access work. The Youngs Road launch is currently
listed as temporarily closed for a culvert-related road reroute, so the card is
planning-only and must not be used until DEC posts the access as reopened. USGS
04262000 is retained only as a downstream Oswegatchie proxy because the historic
Little River 04261975 site has no current continuous or daily data; no numeric
cutoff is asserted.
The upper Susquehanna rotation now adds the distinct West Oneonta-to-Otego
moving-flatwater itinerary. Current Otsego Outdoors guidance publishes the nine-mile
one-way route, easy difficulty, and spring-through-fall season, while the current
NYSDEC Otsego County directory identifies the Oneonta and Otego hand launches. The
historical USGS 01498620 station has no current continuous or daily data, so the card
uses it only as location/history context, claims no numeric threshold, and ends at
Otego/Wells Bridge before the separate downstream launch sequence.
The same rotation also adds the distinct Unadilla-to-Sidney upstream segment. Current
NYSDEC listings identify both hand launches, and CanWePaddle publishes the parent
Unadilla-to-Bainbridge Class I corridor with direct USGS 01500500 context and a
300–6,000 cfs informational planning range. The new card conservatively splits at
the existing Sidney-to-Bainbridge boundary, labels its roughly 6.75-mile length as
a planning estimate, keeps Sidney as the mandatory handoff, and does not duplicate
the downstream card or claim camping outside the named access areas.
The East Branch Ausable rotation now adds the distinct Hulls Falls-to-Keene reach.
Current Lake Placid material publishes the 6.3-mile endpoint pins and broad Class
II–V+ water-level-dependent character, while the American Whitewater New York index
identifies the reach as IV(V). The route shares the Keene boundary with the existing
Keene-to-Upper-Jay card, uses USGS 04275500 only as a downstream same-system proxy,
and remains planning-only because the Hulls Falls pin requires field confirmation
of a legal below-falls boat entry, carry, parking, and local rescue margin.
The Colliersville-to-Emmons Susquehanna gap is now implemented as a short,
planning-only moving-flatwater section. Current NYSDEC listings confirm public hand
launches at both ends with 10- and 20-car parking, while current NYSDEC river
guidance supplies the route-specific rain/flood screen and USGS 01500500 provides
live downstream same-river trend context. The approximately three-mile distance is
kept as a planning estimate rather than a surveyed trace; the record retains
shallow-water, debris, cold-water, private-bank, and hard-handoff controls and does
not invent a numeric local cutoff.
The Unadilla rotation now adds a short New Berlin-to-Mount Upton planning
section between the two current NYSDEC New Berlin hand launches. The Chenango
County directory gives the named waterbody coordinates and 8- and 10-car
parking capacities; the live Rockdale station is retained only as a downstream
same-river proxy because the former near-New Berlin station is historical. The
current basin guidance supplies the seasonal rising-water, muddy-water, debris,
and summer-shallow controls, and the record ends at the downstream hand launch
before the separate Rockdale-to-Sidney card. The approximately 3.5-mile length
is a planning estimate, not a surveyed wetted trace, and no numeric local cutoff
is asserted.
The same Unadilla rotation now closes the short Guilford-to-Rockdale gap before
the existing Rockdale-to-Sidney card. Current NYSDEC data confirms the Guilford
hand launch, while the current Rockdale paddling listing supplies the downstream
public access area and USGS 01502500 sits at that boundary. The connector keeps
the basin's rising-water, muddy-water, debris, and shallow-gravel guidance,
retains nearby-basecamp-only camping, and treats the approximately two-mile
length as a planning estimate rather than a surveyed wetted trace.
The Piseco Outlet rotation now adds a distinct Class II–III moving-water corridor
from the current NY Route 10/Big Bay hand launch toward the West Branch Sacandaga
confluence and back. American Whitewater publishes the 4.5-mile route, while
current NYSDEC Ferris Lake guidance supplies the public Big Bay water entry and
designated-camping posture. The confluence is intentionally a water-only
turnaround, the Hope gauge is a far-downstream regulated proxy with no local
cutoff, and the card remains planning-only with no claimed shuttle or vehicle
take-out at the river boundary.
The South Branch Black River rotation now adds a bounded South Lake-to-confluence
out-and-back. American Whitewater publishes the distinct Class II–IV reach and
the current NYSDEC Black River Wild Forest page identifies the South Lake
hand-carry launch and designated camping. The route uses the confluence only as
a water boundary, labels USGS 04252500 as a downstream proxy with no local
cutoff, and deliberately excludes the AW-described Farr Road bridge as a
vehicle take-out until current maintained public-launch evidence is established.
The Mongaup River rotation now adds the distinct Rio Powerhouse-to-Upper Delaware
release reach. American Whitewater publishes the approximately 3-mile Class II+–III
Rio Reach and direct 01433500 flow correlation, Eagle Creek publishes the current
scheduled one-unit/two-unit release program, and NPS/DEC confirms the public Route 97
hand-carry access at the downstream end. The Rio Powerhouse is treated as conditional
release-day/operator-managed access only; the card requires current release confirmation,
operator instructions, and a hard take-out at the Upper Delaware access.
The same frontier pass screened Schaghticoke Gorge on the Hoosic, the Middle Branch
Moose River Singing Waters-to-McKeever reach, the North Hudson-to-Schroon Falls
Schroon section, and the upper Great Chazy. Each remains held rather than promoted:
current access evidence is fenced/scheduled-release-only at Schaghticoke, private or
unclear at the Moose and Schroon upstream endpoints, and incomplete at the Great Chazy
Miner Lake finish. These holds preserve the next research queue without converting
bridge, campground, or informal shoreline points into public launches.
The latest American Whitewater/DEC sweep rechecked Woodhull Creek and West Stony
Creek as distinct Adirondack candidates. Woodhull remains held because the
current AW page warns its map pins are wrong and its bridge/gate directions are
not maintained canoe-launch evidence; current DEC identifies Horton only as
public angler parking. West Stony remains held because the current DEC Shaker
Mountain page does not publish a current river hand-launch/take-out chain, even
though the older UMP records a Class II–III corridor. Neither candidate cleared
the public endpoint gate in this pass.
The lower Saranac rotation now adds the distinct Foot of Kent Falls-to-Military
Turnpike segment. American Whitewater publishes the seven-mile Class I section,
the Fisherman’s parking/access start below the Kent Falls Powerhouse, and the
parking-area take-out between the Military Turnpike dam and power-plant intake.
Current NYSDEC PFR and Saranac River Trail Greenway materials provide public
access/facility context, while USGS 04273500 supplies same-river downstream trend
data. The card is planning-only: it explicitly excludes the no-legal-access Kent
Falls bypass, requires current below-powerhouse and dam-area access confirmation,
uses no invented numeric cutoff, and hands off before the separate downstream
Class II–III section.
The lower Saranac rotation now also separates the Military Turnpike-to-Imperial
Mill reach. American Whitewater publishes the distinct 2.5-mile Class II–III
section, its approximately 5-foot minimum-only planning reference, the
dam-operation caveat, the old crib and broken-concrete dam hazards, and the
river-left Imperial Mill take-out/carry. Current NYSDEC and Northern Forest
Canoe Trail materials corroborate the DEC portage and warn that construction
can change the carry, so both endpoint coordinates remain route-map/access-area
anchors requiring current public, landing, and operator confirmation.
The lower Saranac rotation now completes the separately documented Imperial Mill
Dam-to-Lake Champlain section. American Whitewater publishes the distinct
approximately 3-mile Class II reach, below-4-foot and around-5-foot flow context,
bridge and wave features, and a river-right boat-launch finish. Current NYSDEC
Clinton County launch information supplies the Plattsburgh municipal hard-surface
launch coordinate, while NYSDEC/NFCT portage guidance keeps the Imperial start
conditional. The card remains advanced planning-only with a minimum-only proxy
gauge posture, explicit mouth/wake/wind/water-quality safeguards, nearby-basecamp
camping, and field confirmation of the connected river landing and current lake
launch status.
The East Branch Delaware rotation now adds the distinct Downsville-to-Shinhopple
six-mile itinerary. Al’s current 2026 rental page publishes the named route,
three-to-four-hour duration, one-way vehicle transport, and mostly quiet-water
character, while the current NYS Parks directory lists the downstream East Branch
hand launch 0.68 miles upstream of the Shinhopple bridge with ten-car parking.
USGS 01417000 provides direct Downsville telemetry. The upstream point is recorded
as a managed outfitter/water anchor rather than an unrestricted DEC launch, and the
card remains planning-only with no invented numeric flow cutoff, private-bank
restrictions, nearby-basecamp posture, and explicit operator/landing confirmation.
The current Boquet frontier review also screened the American Whitewater North
Branch Reber-to-Boquet reach (5.8 miles, Class III–IV, current East Branch Ausable
proxy correlation). It remains held: the AW page supplies route pins, but the
current North Branch Boquet public-fishing-rights map says its easements are for
fishing and walking only and are not paddling authorization. The regional access
page identifies good angler access near Reber, not a public boat-launch chain.
Reopen only if a current paddling-specific public entry and legal landing are
independently documented; do not convert PFR parking, bridges, or private banks
into launches.
The Boreas frontier was screened in parallel. Current NYSDEC guidance confirms
public paddling access to LaBier Flow and Boreas Ponds, and identifies Class IV–V
rapids below Lester Flow Dam, but does not publish a maintained public river
put-in/take-out chain for that whitewater reach. It remains held as a lake/flow
inventory item until current river-specific access and endpoint evidence exists;
the existing Hudson/Adirondack cards remain separate and no route is inferred
from a dam, bridge, fishing pull-off, or informal shoreline.
The upper Great Chazy was screened as another distinct moving-water candidate.
American Whitewater currently describes the Chazy Lake-to-Miner Lake reach as
approximately 5.6 miles of Class II–III(IV), best in spring or after heavy rain,
with a direct gauge correlation and a 1,550–4,500 cfs runnable window. Its route
notes direct paddlers away from the first woody miles toward an informal Jerhico
Road entry and identify a Rabideau Road bridge take-out, with a downstream
Mohawk Territory warning. Current NYSDEC material confirms a public Chazy Lake
boat launch, but does not independently establish a legal paddling entry at
Jerhico Road or a maintained landing at Rabideau Road. The Route 9B mouth launch
is not a substitute because it is downstream of the required take-out boundary.
Hold this reach until a current route-specific public water-entry/carry and
legal landing chain is documented; do not promote bridge or informal shoreline
points as launches.
The upper Chenango rotation now adds the distinct Sherburne-to-North-Norwich
section. Current NYSDEC and NYS Parks directories identify both endpoint hand
launches and parking, while a current USGS/American Whitewater station listing
provides direct Sherburne stage/discharge context. A route-specific paddling
report describes the longer Sherburne-to-Norwich corridor as mostly quickwater
with riffles, river-wide wood, strainers, and short carry decisions; its single
approximately 2.95-foot Sherburne observation is retained only as historical
context, not a universal cutoff. The new card is a conservative approximately
5.3-mile planning section ending at North Norwich before the existing
North-Norwich-to-Greene record, with no private-bank or bridge/railroad access
inferred and nearby-basecamp-only camping.
The lower Salmon rotation now adds the distinct Pineville-to-Compactor Pool
section between the existing Altmar-to-Pineville and Compactor-to-Black-Hole
cards. Current NYSDEC Salmon River material identifies both Pineville Route 48
and County Route 2A Compactor Pool as drift-boat launch areas. American
Whitewater’s current Altmar-to-Route-2A record supplies the parent Class I–II(III)
moving-water, cold-water, fishing, and Lighthouse Hill release context, while
USGS 04250200 provides direct Pineville telemetry. The approximately 3.6-mile
split retains the adjacent 150-cfs planning reference only as context, keeps a
nearby-basecamp camping posture, and stops at Compactor before the separate
Pulaski/Black-Hole hazards.
The West Canada Creek rotation now fills the distinct Route 28 Overlook
north-of-Poland to North Middleville gap. The current access-study map names
the Route 28 Overlook and NYSDEC Route 28 North Middleville recreation sites,
and American Whitewater describes the broader Class I–II moving-water corridor,
regulated releases, and downstream Middleville-to-Kast handoff. The approximately
6-mile card remains planning-only because the access points are roadside/carry-in
anchors rather than guaranteed maintained ramps; USGS 01346000 is a downstream
proxy, the 300-cfs tubing reference is not promoted to a local safety cutoff, and
the route stops at Middleville before the existing downstream card.
The southern Susquehanna/Chenango rotation now adds three bounded planning
sections: Bainbridge-to-Afton and Afton-to-Nineveh on the Susquehanna, plus the
approximately 5-mile Chenango Forks-to-Port Crane trip. Current NYSDEC launch
directories establish endpoint access and parking for each section; Terrain360
shows the connected Bainbridge-to-Nineveh parent corridor, and a current local
outfitter publishes the Chenango Forks trip with a Port Crane shuttle. USGS
01502632 is direct for the Bainbridge section and a clearly labeled upstream
same-river proxy for Afton-to-Nineveh; USGS 01512500 supplies direct Chenango
Forks-area telemetry. The Chenango record retains a confluence-side caveat because
DEC lists the Route 12 Bridge under Tioughnioga while the outfitter names the
Chenango Forks trip; field confirmation is still required before publication as
a fully qualified public route. All three use nearby-basecamp-only camping and
retain route-specific current, cold-water, bridge/wood, and shuttle/logistics
notes rather than implying a universal flow cutoff.
The Genesee frontier now fills the moving-water gap from the Wheatland/Scottsville
DEC hand launch to the Genesee Waterways Center in Genesee Valley Park. Current
NYSDEC Monroe County access data, the Genesee River Blueway safety map, and the
center's current river-access/livery page support the two endpoint areas; the
existing Avon-to-Scottsville CanWePaddle page and USGS 04228500 are retained only
as a clearly labeled upstream proxy for the approximately 10.5-mile section.
The route remains planning-only, uses nearby-basecamp camping, and stops before
the existing Genesee Valley Park-to-Corn Hill record and the Court Street Dam/
High Falls boundary. The Black River Carthage-to-Felts Mills and Felts Mills-to-
Huntingtonville sections were also rechecked: NYSDEC describes the moving-water
reaches and access context, but the current endpoint chain depends on industrial,
hydropower, or dam-area points rather than a clean current public paddling pair,
so those sections remain holds rather than inferred launches.
The Tioga frontier now adds the distinct Lindley-to-Mulholland moving-water
section. The official state boating directory lists hand launches at Lindley
Road and the Mulholland Road/Route 417 bridge, a current Friends of the Chemung
River Watershed guided paddle confirms active use of the Mulholland area, USGS
01520500 provides direct Lindley stage/discharge data, and Chemung River Friends
recommends 4–7 feet at Lindley while warning about rapid changes from upstream
dam operations. The new approximately 7.5-mile planning card keeps both
coordinates as access-area anchors requiring field confirmation, uses nearby-
basecamp-only camping, and stops at Mulholland before the existing
Kinsella/Chemung itinerary.
The next watershed rotation adds two more distinct planning sections. The Otselic
record now continues from the existing Landers Corners hand launch to the current
Upper Lisle Road Fishing Access near the Whitney Point Reservoir transition. A
current 2026 Cayuga Trails Club paddle confirms active use of the Upper Lisle lot,
while the direct Cincinnatus USGS station remains trend context and the Whitney
Point Reservoir/Dam boundary is a mandatory downstream stop. Upper Lisle is not
treated as a current campground, so the route uses nearby-basecamp-only camping.
The West Branch Fish Creek record now covers Westdale to Camden. NYSDEC lists the
Westdale hand launch, NYSDOT lists the Route 69/Fish Creek access, a current Tug
Hill conservation event confirms active paddling at Westdale, and USGS 04242640 is
retained as a clearly labeled downstream proxy. The older local route description
provides the approximately 9.5-mile line and low-water warning; it is explicitly
planning context rather than current permission or a safety certification. Both
routes preserve field-confirmation gates for access-area coordinates, wood, local
depth, private shoreline, and legal take-out conditions.
The Tioughnioga rotation now also fills the documented Marathon-to-Whitney Point
gap. Current Cortland County material documents the Marathon Civic Center launch,
while Broome County's 2024 waterfront plan and Tioughnioga River Trail identify
the Route 206 Bridge as a public dirt-ramp access in Whitney Point. The new
approximately 13-mile planning record uses direct USGS 01509305 at Marathon,
keeps the private Lighthouse Landing and Whitney Point Dam boundaries explicit,
and ends before the existing Itaska-to-Chenango Forks record. It uses nearby-
basecamp-only camping and treats the Route 206 coordinate as a bridge/access-area
anchor requiring field confirmation.

The Adirondack rotation now adds a bounded Cedar River Flow out-and-back. The
current NYSDEC Hamilton County launch directory identifies the public hand launch
above Wakely Dam, while the local Inlet paddling guide publishes the approximately
8.5-mile round trip, the three-mile Cedar River objective, the lean-to turnaround,
and the surrounding campsite context. The route uses historical USGS 01313000 only
as clearly labeled same-river context because the station has no current continuous
data, returns to the confirmed Flow launch, and does not claim a downstream vehicle
take-out or passage below Wakely Dam. Designated water-access camping is retained
as an optional endpoint-area posture under current DEC rules; the separate
Wakely-to-Sprague moving-water reach remains held pending its own public endpoint
and access chain.

The Delaware County frontier was screened again during this pass. American
Whitewater currently lists Kortright Creek's Route 10 bridge-to-Charlotte Creek
reach and a live-index status, and USGS 01497985 provides same-creek monitoring
context. However, the current public sources found NYSDOT bridge crossings and
DEC fishing-rights material rather than a permission-backed general paddling
put-in/take-out chain at the Route 10 start or Charlotte Creek finish. Keep Kortright
Creek held until a maintained public launch/carry and legal landing are verified;
do not turn bridge records, PFR parking, or road shoulders into paddle endpoints.
Kline Kill remains held for the same reason: American Whitewater's County Route 9
to Ghent reach uses a Punsit Creek/roadside start, while current Columbia Land
Conservancy material describes fishing access by permit only at Siegel-Kline Kill,
not a general-use boat launch. NYSDEC's navigation policy requires the specific
access and landing rights to be established independently.

The Blue Mountain rotation now adds the bounded `fishing-brook-pickwickett-county-line-flow` connector. Current NYSDEC guidance publishes the 0.9-mile downstream paddle from the Pickwickett Pond Road Hand Launch to the County Line Flow Hand Launch, both endpoint coordinates, the low-water warning, and the Township 20 Easement Lands shoreline restriction. USGS 0131199050 is retained as direct same-reach location/history context only because its published continuous and daily series end in 2010. The card uses nearby-basecamp-only camping, a one-way shuttle, and strict no-shore-access controls at County Line Flow; it does not extend into Pickwickett Pond, downstream waters, private camps, or unmarked banks.

The lower La Chute River in Ticonderoga is now published as `la-chute-river-bicentennial-fort-ticonderoga`: the regional paddling guide describes the below-the-falls reach as an easy paddle with slight current toward a marshy Lake Champlain approach, the Town of Ticonderoga community profile identifies the Bicentennial Park canoe/kayak launch, NYSDEC supplies the public Lake Champlain launch at Route 74/ferry landing, and USGS 04279015 provides direct same-river flow context. The route is intentionally bounded below the Lower Falls; the upper Lake George-to-Bicentennial reach has multiple falls, dams, penstocks, cascades, and ledges and remains a separate technical/portage review. Treat water quality, wind, lake chop, boat traffic, marsh navigation, and the one-way shuttle as route controls; no camping is claimed at either endpoint.

The current New York rotation adds two more bounded moving-water records. `wallkill-river-walden-popp` fills the short public-access gap between the Village of Walden's Marcus “Mickey” Millspaugh River Front Park launch and the active Popp Memorial Park launch, ending before the separate Popp-to-Gardiner record and its next low-head-dam portage. `batten-kill-greenwich-schuylerville` represents the American Whitewater Greenwich-to-Hudson reach and continues the last short distance on the Hudson to the public Fort Hardy Park launch in Schuylerville; it does not claim the AW mouth coordinate as a public landing. Both records use clearly labeled same-river USGS proxy images, route-specific hazards, nearby-basecamp camping, and planning-only status.

The Oswegatchie Oxbow-to-Elmdale candidate remains held. The current American Whitewater index still lists the Class II reach, and NYSDEC confirms a public Oxbow hand launch plus public Oswegatchie launches farther east around Edwards, but no current source establishes a lawful public Elmdale paddling take-out, parking, or vehicle/carry chain. Keep the candidate out of route data until that endpoint is permission-backed; do not substitute a fishing-area pin, bridge shoulder, or the more distant Edwards launch without a new corridor and access review.

The southern Cattaraugus rotation now adds two adjacent Allegheny River floats:
Allegany River Park to Olean (approximately 5 miles) and Olean to Linn Launch in
Portville (approximately 5.5 miles). Current NYSDEC Cattaraugus County launch
data identifies the public hand launches at Allegany, Olean, and Portville, while
the current Cattaraugus County tourism page names both floats and describes Linn's
paved water-edge access, parking, and seasonal facilities. USGS 03010820 at Olean
provides direct same-river stage/discharge context; the cards retain DEC's
shallow-riffle, private-bank, water-quality, wind, and downstream-jurisdiction
warnings, use nearby-basecamp-only camping, and stop at the named public launches
before any unreviewed Salamanca or Seneca Nation corridor.

The Schenectady Mohawk rotation now adds two adjacent public-launch sections:
Lock 9 State Canal Park to Freeman's Bridge (approximately 9 water-trail miles)
and Freeman's Bridge to Lock 7 Park (approximately 6.9 miles). Current NYSDEC
Schenectady County data identifies the endpoint launches; Erie Canalway's current
water-trail stewardship inventory names the Lock E9-to-Freeman's Bridge segment,
and the Schenectady County waterfront plan supplies the Freeman's/Rexford/Lock 7
distance sequence. USGS 01354330 at Lock 8 and 01354500 at Freeman's Bridge provide
direct stage/discharge context, but both cards remain planning-only because canal
and hydroelectric regulation, locks, spillways, workboats, wakes, bridges, wood,
and water-quality conditions cannot be reduced to a universal cutoff. The cards
use nearby-basecamp-only camping, public launches only, and hard boundaries at
Freeman's Bridge and Lock 7; they do not authorize entering locks, crossing dams,
or using private, railroad, industrial, or bridge property for bailout or portage.

The Deposit frontier now adds west-branch-delaware-river-airport-hale-eddy, a bounded
approximately 3.9-mile West Branch Delaware tailwater section from the current NYSDEC
Airport Road hand launch to the current Hale Eddy hand launch. The current Delaware County
launch directory also identifies a separate downstream Airport Road unimproved trailer
launch, while the West Branch access guide places Airport Road and Hale Eddy in sequence and
describes the reach as Class I moving water with swift sections, riffles, cold tailwater, and
fishing traffic. USGS 01426500 at Hale Eddy supplies direct stage/discharge and temperature
context; the source's at-least-3.0-foot reference is retained as minimum-only planning
guidance with no invented upper cutoff because Cannonsville releases can change conditions.
Camping is nearby-basecamp-only, private banks and roadside pull-offs are not access, and the
route ends at Hale Eddy before the existing Hale Eddy-to-Balls Eddy section. The separate
Walton-to-Deposit reservoir/backwater gap remains out of scope until a distinct moving-water
endpoint chain and route-specific evidence clear the same gates.

The Upper Delaware connector rotation now adds
`delaware-river-balls-eddy-hancock`, a planning-only approximately 5-mile public-to-public
section from the PFBC Balls Eddy access through the West Branch confluence to the NYSDEC
Hancock hand launch. The current Upper Delaware Sojourn itinerary uses Balls Eddy as the
public launch, identifies Hancock Fishing Access as the on-river stop, and continues only
to a separate private Stockport finish; the route therefore stops at Hancock and does not
infer a private continuation. USGS 01427000 at Hancock supplies direct stage/discharge
context, but the route intentionally exposes no universal numeric cutoff. Preserve the
cross-state access check, cold regulated water, shallow riffles, confluence current,
strainers, private banks, no-general-riverbank-camping posture, and separate boundaries
with the existing Hale Eddy-to-Balls Eddy and Hancock-to-Lordville cards.

The St. Lawrence frontier now adds `st-lawrence-river-louisville-massena`, a
planning-only approximately 3–5-mile open-water paddle from the public Wilson Hill
Wildlife Management Area launch near Louisville to the public NYPA launch near Massena.
Current NYSDEC launch data supports both hard-surface endpoints, and Visit St. Lawrence
County specifically recommends the Louisville-to-Massena paddle. USGS 04264331 is retained
as clearly labeled same-river coordinated-discharge context because USGS states that the
station has no gage and derives discharge from power-dam, diversion, municipal, and
navigation-canal flows; no universal numeric cutoff is exposed. Preserve open-water craft,
wind/wave, cold-water, commercial-vessel, navigation-channel, dam/intake, NYPA notice,
cross-border, and early-turnaround controls, with nearby managed camping only.

The western New York frontier now adds `niagara-river-lewiston-fort-niagara`, a
planning-only approximately seven-mile one-way lower Niagara River paddle from the
public Lewiston Landing launch to Fort Niagara State Park, with the public Youngstown /
Porter launch retained as an approximately six-mile conditional bailout. NYSDEC's
current Niagara County directory supports the three public hard-surface launch contexts,
Nightingale Paddles names the Lewiston-to-Fort Niagara itinerary as a 2–3-hour,
no-portage outing, and USGS 04219501 supplies direct Lewiston stage context. No universal
numeric cutoff is exposed: hydropower releases, local current, wind/waves, commercial
traffic, cold water, and the Lake Ontario mouth control the launch decision. Preserve the
hard downstream boundary before the gorge and Whirlpool, exclude power facilities,
navigation channels, private or Canadian shoreline, and international-border waters,
and keep nearby managed camping only. Route imagery is the CC BY-SA 2.0 Ken Lund
Youngstown photograph via Wikimedia Commons, explicitly labeled as route context.

The Adirondack rotation now adds `st-regis-middle-branch-route-458-st-regis-falls`,
a planning-only approximately 4.1-mile Middle Branch St. Regis River whitewater
reach from the current NYSDEC Santa Clara Flow launch near Route 458 to the Town
of Waverly St. Regis Falls Scenic Campsite. The finish is permission-gated, the
USGS 04268800 reading is a West Branch proxy, and American Whitewater's flow-
dependent Class II–V+ description, dam/wood/bedrock hazards, local scouting,
portage, cold-water, rescue, and campground check-in controls remain explicit.

The same Adirondack rotation also adds `west-branch-st-regis-five-mile-hand-launches`,
an approximately five-mile West Branch St. Regis high-water corridor between the
current NYSDEC Five Mile Hand Launch #4 and #1 access areas. Hand Launches #3 and
#2 remain in the route as intermediate access/bailout controls, while the current
NYSDEC page supplies the seasonal public-use window, the signed Main Camp and
Saunders Camp portages, high-water-only navigation rule, and logging/road closure
posture. The route carries direct USGS 04268800 context and nearby-basecamp-only
camping, with no claim of on-route camping or unmarked shoreline access.

The Adirondack traverse rotation now also adds `bog-river-lows-oswegatchie-inlet`,
the current NYSDEC-described Lows Lower Dam through Lows Lake and down the upper
Oswegatchie to the public Inlet Road hand launch. This planning-only multi-day
route preserves the source's approximately 30-mile total, 14.5-mile Lows waterway,
signed approximately 3.5-mile Oswegatchie Canoe Carry, and approximately 16-mile river descent while acknowledging the component-distance discrepancy. It includes
current public endpoint coordinates, the Lows Upper Dam and High Falls carry
boundaries, designated wilderness camping, wind/whitecap, cold-water, beaver,
private-shoreline, and remote-rescue controls, plus a same-river USGS 04262000 proxy
with no invented numeric cutoff. The route is intentionally separate from the
shorter Lower Dam-to-Lows Lake and Inlet-to-High Falls cards and does not claim
private-road shortcuts or a vehicle-accessible wilderness shuttle.

The current Central New York rotation also adds `sangerfield-river-nine-mile-park-out-and-back`,
a planning-only approximately six-mile same-launch paddle from the Town of Hamilton’s public
9-Mile Park kayak launch into Nine Mile Swamp and back. The Town identifies public river access,
off-street parking, and the kayak launch, while NYSDEC’s completed application authorizes the
public launch and parking improvements. Current local material describes roughly three miles each
way of gentle Sangerfield River water. The route uses a clearly labeled Chenango River USGS 01505000
proxy with no invented cutoff, preserves approximate address-to-water-entry uncertainty, adds a
same-launch turnaround boundary, and records day-use/nearby-basecamp-only camping, wetland/wood/
low-water/cold-water/private-bank controls, and a credited Chesapeake Bay Program Sangerfield image.

The September 2 systematic screen of the current New York Susquehanna Basin itinerary
index found the published Cooperstown-to-Phoenix Mills, Crumhorn-to-Goodyear Lake,
Kirkwood-to-Binghamton, William Hill-to-Grippen, Kinsella-to-Cohocton Street,
Cohocton Street-to-Bottcher's, Lowman-to-Waverly, and related itineraries already
represented by current route records. Marshland Road remains a durable hold because
the source describes a short Hiawatha Island loop/return that overlaps the existing
Apalachin-to-Hickories corridor rather than establishing a separate public endpoint
boundary. Continue the next rotation through the remaining Adirondack and tributary
holds only when a distinct public water-entry chain and complete evidence package clear.

The next St. Lawrence County rotation adds `fish-creek-wma-route-184-pope-mills`,
a planning-only approximately 4.2-mile Fish Creek Wildlife Management Area corridor
between two current NYSDEC hand-launch areas near Route 184 and Pope Mills/Route 58.
DEC identifies the fee-free WMA, small-cartop launches, and no special permit requirement,
while also warning that water levels depend on beaver dams and that beaver dams and cattail
mats can obstruct the wetland drainage. The record therefore treats the endpoints as public
access-area anchors, preserves a 0.8-mile hand-carry warning at the southern launch, and
does not promise through-passage on a given day. It uses historical USGS 04263350 Indian
River-at-Rossie data only as clearly labeled same-watershed context with no numeric cutoff,
records nearby-basecamp/day-use-only camping, and uses a credited current NYSDEC Fish Creek
WMA image as route-context imagery.

The same St. Lawrence County rotation also adds `indian-river-hall-road-rossie-falls-out-and-back`,
a planning-only approximately 3.2-mile same-launch paddle based on DEC’s 1.6-mile Hall Road-to-
Rossie description. The current DEC launch directory supplies the ten-car Hall Road hand-launch
coordinate, while DEC identifies a rocky rapid below Hall Road Bridge and a privately owned
Rossie Falls access/carry boundary. The card therefore uses two controls at the same public
launch—put-in and planned return—rather than inventing a downstream landing, and it stops before
the private boundary. It records the historical 04263350 Rossie gauge as context only, nearby-
basecamp/day-use camping, low-water/rock/cold-water/private-bank controls, and the public-domain
USGS Indian River image.

The same St. Lawrence County screen also reviewed the current DEC launch directory and
the Indian River canoe guidance for additional corridors. Indian River Rossie-to-Black Lake
remains a hold: DEC describes the Rossie connection across from the hotel as privately owned
and potentially fee-based, so the nearby public launch listing does not by itself establish a
clean public endpoint chain through the Rossie Falls boundary. Upper and Lower Lakes WMA
remains a separate hold because its Route 14 and Route 68 access areas sit in a large wetland
with refuge/restricted-use zones, seasonal closures, and camping permits; the Route 68 Grass
River endpoint is already represented by the Pyrites-to-Canton record. Grass Lake and the
Edwards Oswegatchie launch pair were advanced separately: the new
`oswegatchie-east-branch-flat-rock-edwards` card captures American Whitewater's distinct
15.4-mile IV–V+ reach while keeping the DEC endpoint-role match conditional, the live West
Branch gauge explicitly proxy-only, and the camping posture day-use/nearby-basecamp only.
Grass Lake remains an inventory candidate without a reviewed route-specific distance, channel,
and flow package. These are durable research holds, not route additions, until the public
water-entry, distinct-boundary, and current conditions gates clear.

The Ulster County rotation now adds `rondout-creek-high-falls-rosendale`, a planning-only
6.4-mile American Whitewater High Falls Dam-to-Rosendale whitewater reach. Riverfacts supplies
the mapped High Falls and Rosendale endpoint anchors, while American Whitewater documents the
Class III–V(V+) character, approximately 12-foot Little Falls, low-head dam, strong eddy lines,
holes, and Eye Ripper. The direct USGS 01367500 Rosendale station is retained as trend context
without inventing a numeric cutoff. The record keeps both endpoints conditional until field
verified, includes explicit dam/utility/private-bank/wood/cold-water controls, and limits camping
to separate nearby legal basecamp or lodging.

The St. Lawrence County rotation also adds `grass-river-woods-bridge-route47`, a planning-only
6.6-mile American Whitewater Woods Bridge Road-to-Route 47 reach below Harrison Creek. American
Whitewater rates it Class II–V+ and publishes a 400–4,000 cfs planning correlation using the
West Branch Oswegatchie gauge 04262500; that station is explicitly treated as a proxy rather than
a Grass River safety certification. Riverfacts supplies the endpoint anchors, and the record
keeps both access points conditional, separates this reach from the existing Downerville/Russell
and Pyrites/Canton cards, records advanced whitewater/wood/cold-water/private-bank controls, and
limits camping to separate nearby legal basecamp or lodging.

The next northern Lake Champlain rotation adds two connected public-launch blueway segments:
`lake-champlain-rouses-point-great-chazy` (approximately 10 miles) and
`great-chazy-river-point-au-roche` (approximately 12.2 miles). Lakes to Locks Passage publishes
both launch pairs, distances, shallow marsh shoreline, limited shore access, wildlife, marina,
and wind context, while current NYSDEC launch listings corroborate the facilities. The cards
remain planning-only with day-use/nearby-basecamp camping posture, direct or clearly labeled
proxy gauge context, and explicit wind, wave, cold-water, traffic, private-shoreline, and
weather-exit controls.

The same rotation adds `st-regis-river-winthrop-route-92`, a planning-only 10.1-mile American
Whitewater Class I–III reach with a direct Brasher Center gauge and a 1,000 cfs lower planning
screen plus approximately 2,500 cfs cautionary context. American Whitewater supplies the exact
Winthrop and Route 92 access anchors and current route context; NYSDEC supplies the official
Brasher Center intermediate hand launch as a conditional bailout. The AW endpoint pair remains
conditional until current permission, parking, carry, landing, and private-boundary conditions
are verified, and the record keeps camping at separate nearby managed facilities only.

The upper West Branch Ausable rotation now adds two distinct advanced whitewater planning
reaches: `ausable-west-branch-adirondak-loj-route-73` (approximately 6.6 miles from the
Adirondak Loj Road area to Route 73) and `ausable-west-branch-monument-high-falls` (3.5 miles
from Monument Falls to High Falls Gorge). Current Lake Placid route pages and American
Whitewater provide the reach pins, class, mileage, and whitewater context. The first record
keeps the Adirondack Mountain Reserve access posture explicit: public boating and shoreline
use cannot be inferred from a roadside or trail-area pin. The second treats Monument Falls as
a conditional roadside water-entry anchor and High Falls Gorge as operator-managed finish
access requiring current permission. Both use USGS 04275500 only as clearly labeled same-system
proxy flow context, include cold-water/strainer/rapid-rise and mandatory-takeout controls, and
limit camping to nearby legal basecamp or lodging rather than on-route camping.

New York now has 286 route records, 285 public records, and a documented inventory of the
remaining holds. Continue rotating through the unrepresented AW/DEC corridors; do not promote
the Great Chazy upper whitewater, Schoharie Hunter–Prattsville, Black River bridge/road sections,
or the remaining Catskill/Adirondack holds until their public endpoint and safety evidence gates
clear.

The Upper Hudson rotation now adds two bounded records. `hudson-river-thurman-station-hadley`
captures the documented approximately 14-mile Thurman Station/Warrensburg-to-Hadley day trip,
using the current NYSDEC Thurman Station, Buttermilk, Darling's Ford, Pike's Beach, and Hadley
canoe-access chain. Current regional guidance describes mostly slow, wide water with slight
current, riffles, gravel bars, occasional Class I character, wind, strainers, and long-day
logistics; USGS 01318500 is direct same-river context downstream of much of the section, with
no universal numeric cutoff claimed. The route ends at Hadley before the separate Rockwell Falls
boundary and retains nearby-basecamp-only camping.

`hudson-river-spier-falls-out-and-back` is a same-launch planning outing from the current Spier
Falls Road public launch. Current ECOS programming documents active calm-water paddling between
the Spier Falls and Sherman Island hydro projects, while NYS Parks and the Hudson River Greenway
Water Trail provide the public launch context. The card uses a conservative non-landing
turnaround, a downstream USGS 01327750 proxy, no invented flow cutoff, and explicit wind,
cold-water, dam/intake, utility-boundary, and return-margin controls. It does not claim access
to Sherman Island, a dam face, or private shoreline.

The lower Cazenovia rotation now adds two distinct planning-only sections. `cazenovia-creek-
mill-road-cazenovia-park` covers approximately 5.2 miles from Mill Road Park in West Seneca to
the Cazenovia Park public shoreline context in Buffalo. `cazenovia-creek-cazenovia-park-thomas-
higgins` continues approximately 2.6 miles to the current Thomas F. Higgins Natural Habitat Park
paddle egress at the Buffalo River confluence. The current Cazenovia Creek access inventory,
Buffalo Blueway, and Erie County Parks provide the park and egress evidence; USGS 04215500 at
Ebenezer is direct same-river trend context. Neither card claims a constructed ramp at Cazenovia
Park or Mill Road, and the lower route ends at the Higgins egress rather than implying access
into the separate Buffalo River route set. Both records include low-water, rapid-rise, wood,
low-falls/culvert, private-bank, urban-water-quality, and daylight/alternate-extraction controls,
with nearby legal basecamp or lodging only and no on-route camping.

New York now has 302 route records, 301 public records, and a documented inventory of the
remaining holds. Continue rotating through unrepresented AW/DEC corridors while preserving the
conditional access posture on park-shoreline sections.

The current Upper Hudson rotation adds `hudson-river-fish-hatchery-thurman-station`, a distinct
approximately 2.5-mile connector from the current NYSDEC-listed Warren County Fish Hatchery
municipal hand launch to the current Thurman Station Bridge municipal hand launch. Both
endpoints are on the Hudson and sit upstream of the existing Thurman Station-to-Hadley card.
The route uses direct same-river USGS 01318500 Hadley telemetry as downstream trend context,
keeps no universal numeric cutoff, records current/strainer/cold-water/private-bank hazards,
and limits overnight use to nearby managed basecamp or lodging. The two municipal endpoints
remain field checks for carry, waterline, parking, shuttle staging, and current local rules.

The South Branch Grass River rotation also adds `balsam-pond-carry-south-branch-grass-river`,
an advanced planning-only approximately 2.1-mile upstream connector from the NYSDEC-described
0.4-mile Balsam Pond Canoe Carry to the Route 3 South Branch State Fishing Access Site. The
current NYSDEC Cranberry Lake and Grass River Complex pages establish the carry, rocky Route 3
hand-launch context, high-water character, and named portage areas. USGS 04265432 at Chase
Mills remains a downstream proxy only; no numeric cutoff is invented. The card requires local
scouting, whitewater/portage capability, and a nearby-basecamp posture, and ends before the
existing Twin Falls-to-DeGrasse route. Neither record claims private shoreline, unlisted
bailouts, or endpoint camping.

The current Southern Tier rotation adds `catharine-creek-wma-marsh-connector`, a distinct
approximately 1.8-mile planning-only marsh connector inside Catharine Creek Wildlife
Management Area between the south Airport/Rock Cabin Road hand-carry context and the
observation-tower cartop launch. Current NYSDEC WMA guidance keeps the area open year-round,
and the Great Divide Unit plan identifies these as the two primary canoe/kayak launch points;
the WMA map establishes the hand-launch, parking, bridge, and marsh-road context. Direct USGS
04232200 Catharine Creek telemetry is carried as trend evidence without inventing a numeric
cutoff. The route uses low-water, rapid-rise, cold-water, strainer, private-bank, uncertain-
access, and mandatory-takeout controls, with nearby legal basecamp or lodging only and no
endpoint camping claim. Both water entries still require field verification of carry, parking,
waterline, signage, and seasonal/current conditions.

Batavia Kill remains a documented hold rather than a route promotion. The corridor has a
credible whitewater identity and public-project history, but the current Red Falls recreation
unit closure for stream restoration and the lack of a clean, current general-paddling endpoint
chain make it fail the present evidence gate. Reopen it after the closure and access status are
resolved, with a route-specific public put-in/take-out package; do not infer paddling access
from fishing-rights or project references alone.
The current rotation adds one distinct West Branch Oswegatchie planning route: the NYSDEC-described paddle from the Jerden Falls Road bridge just north of Dutton Road to the Kimballs Mills Road fishing access in Frank E. Jadwin Memorial State Forest. The bridge coordinate is retained as an on-water bridge anchor from the USGS survey, while the Kimballs Mills endpoint uses the current DEC access coordinate. Both endpoints remain conditional: verify legal carry, waterline, parking, road condition, landing, seasonal access, and public-use signage in the field. The route uses USGS 04262500 as branch/proxy trend context without asserting a numeric cutoff, carries a nearby-basecamp/no-endpoint-camping posture, and uses a clearly labeled same-branch USGS image. The route is recreational and planning-only, distinct from the existing Oswegatchie East Branch, remote Inlet–High Falls, and lower main-stem cards.

The current [State of New York boat-launch dataset](https://catalog.data.gov/dataset/boat-launch-sites-by-waterbody) was screened alongside the route inventory. West Branch Oswegatchie is now represented; the remaining waterbodies with multiple listed launch facilities that are not yet route records are Lake George, Upper Saranac Lake, Long Pond, Conesus Lake, Sacandaga Reservoir, Whitney Point Reservoir, Clear Pond, Payne Lake, and Salmon River Reservoir. These remain explicit holds for this moving-water rotation because the dataset supplies facility listings but not, by itself, a distinct current-moving-water itinerary, route-specific flow package, or complete endpoint/portage boundary. Reopen them only when a separate public water-trail or river corridor clears the full evidence gate; do not promote launch-only lake or reservoir facilities as river routes.

The current Schroon rotation adds `schroon-river-schroon-falls-schroon-lake`, a distinct
approximately 10-mile river-to-lake continuation from the NYSDEC Schroon Falls Hand Launch
below the falls to the municipal Dock Street launch on Schroon Lake. Current NYSDEC Hammond
Pond guidance identifies the Schroon Falls access, current Essex County launch data identifies
the municipal lake launch, and regional Upper Schroon guidance describes the broader Class I
river cruise and its single falls carry. The new card begins below that carry, retains the
public endpoint and river-to-lake landing checks, uses USGS 01317000 only as a downstream
same-river proxy, adds nearby-basecamp camping posture, and keeps the upper North Hudson
section, private shore, and lake wind/traffic boundaries explicit.

The same rotation also adds `schroon-river-south-horicon-starbuckville`, a distinct
approximately 2.6-mile moving-water subsection from the municipal South Horicon Bridge
hand launch to the public Starbuckville Dam hand launch above the dam. Current launch
listings identify both water-access anchors, while municipal planning material describes
the intervening Class II corridor and bridge/choke-point concerns. The route uses the
Riverbank USGS station only as a same-river proxy, adds a nearby-basecamp-only camping
posture, and makes the Starbuckville dam a hard take-out boundary rather than opening the
downstream whitewater reach.

The current Susquehanna-basin rotation also adds `chenango-river-port-crane-chenango-bridge`,
a distinct approximately three-mile downstream section from the current NYSDEC Port Crane DOT
Park and Ride hand launch to the Chenango Bridge Route 12A hand launch. Broome County’s River
Guide places Port Crane near mile 5 and Chenango Bridge near mile 8 of the same itinerary, and
the current DEC Broome County directory lists both public hand launches. The route uses the
same-river USGS Port Crane station, records spring-rise/debris/shallow-water, bridge,
private-bank, water-quality, and downstream urban-dam controls, and limits camping to nearby
legal basecamp or lodging. Chenango Bridge is the hard finish; do not substitute Port Dickinson,
Goudey Power Station, a restaurant/outfitter bank, or an unlisted shoreline exit.

The same Chenango rotation now adds `chenango-river-chenango-bridge-port-dickinson`, a distinct
approximately two-mile continuation from the Chenango Bridge Route 12A hand launch to the
current Jeanne and John D. Wilfley Community Park/Port Dickinson hand-launch context. The
county guide places these endpoints near cumulative miles 8 and 10, while the DEC directory
lists both public water-entry sites. The route remains recreational and planning-only, uses
the Port Crane USGS station only as an upstream same-river proxy, carries explicit shallow-water,
debris, private-bank, urban-water-quality, and mandatory-takeout controls, and ends before the
Goudey Power Station dam and Chenango–Susquehanna confluence. Camping remains nearby legal
basecamp or lodging only; do not infer a downtown or private-bank exit.
