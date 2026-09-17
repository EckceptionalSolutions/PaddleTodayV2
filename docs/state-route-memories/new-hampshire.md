# New Hampshire starter coverage

Campaign activated 2026-09-09. Initial public catalog count: 0.

## Work order

Follow [the campaign plan](../lower-48-starter-coverage-plan.md) and the live [campaign record](../operations/lower-48-starter-campaign.json). Targets: 3, then 6, then approximately 10 routes, rotating across all states between passes. Read the route addition and safety policies before qualification.

## Unreviewed corridor leads

- Saco
- Pemigewasset
- Merrimack
- Contoocook
- Androscoggin
- Connecticut

These are discovery leads, not verified endpoint pairs. No route has been qualified by this initial record. Screen 15–20 concrete reaches if sources support that many; retain distinct day trips rather than every endpoint combination.

## Sources and state-specific review

- [Visit NH paddling leads](https://www.visitnh.gov/blog/kayak-with-a-view)
- [public-access directory entry](https://www.visitnh.gov/things-to-do/boating-cruises)
- USGS current observations and station metadata. Confirm a station's actual reach relationship and stage datum before transferring guidance.
- Responsible local launch managers, trail organizations, and current closure notices.

Can official access managers substantiate these discovery leads and keep recreational segments separate from rapids and dams?

Verify actual water-entry coordinates, access rights and parking, distance, hazards, camping, conditions posture, and route geometry. Planning status does not excuse unresolved access or safety.

## First batch qualified

The first scored batch uses three access-to-access Pemigewasset reaches: Livermore Falls to Plymouth, Plymouth to Coolidge Woods, and Coolidge Woods to Shaw Cove. RiverScout supplies a 400–2,000 cfs community planning band tied to direct USGS gauge 01076500; Wilderness Portal adds a more conservative Bristol Gorge reference of 700–2,500 cfs. The 2024 Pemigewasset corridor plan documents the selected public walk-in and cartop facilities and dam portage paths, while the access directory supplied coordinate anchors. All six endpoint audits are review severity because access-center coordinates are on mapped waterbodies but not always on the NHD flowline; there were no suspicious, failure or unknown results.

Qualified route IDs:

- `pemigewasset-river-livermore-falls-plymouth`
- `pemigewasset-river-plymouth-coolidge-woods`
- `pemigewasset-river-coolidge-woods-shaw-cove`

The catalog now has six scored Pemigewasset routes, adding Livermore Falls–Coolidge Woods, Plymouth–Shaw Cove and Livermore Falls–Shaw Cove combinations while preserving dam-portage and access controls.

See [the batch evidence record](../operations/starter-evidence/new-hampshire-pemigewasset.json). Recheck current NH Fish and Game, municipal and federal access rules, walk-in craft suitability, parking, dam portages, weather and live gauge trend before deployment.

Pending: endpoint-pair discovery, current manager/closure review, gauge/threshold qualification, and overlap review. No exhausted-source or route-count-shortfall conclusion has been made. Record source attempts and exact retry conditions in the campaign candidate record; use the existing candidate ledger for qualified reach work.

## Contoocook third batch � 2026-09-10

The scored-first rotation added three Contoocook River routes while keeping the technical Freight Train section out of the public catalog:

- `contoocook-river-federal-riverway-park`
- `contoocook-riverway-park-canoe-company`
- `contoocook-river-federal-canoe-company`

The batch uses direct USGS stage station 01085000 near Henniker. American Whitewater documents the Henniker reach and 9-foot high-water cue; USACE publishes the 9-foot warning stage and 11.5-foot flood stage. A conservative 5�8.5 ft planning band is recorded as a planning aid, not a safety guarantee. The Forest Society guide documents the nine-mile Riverway Park to Contoocook River Canoe Company trip, while the NH access directory supplies the coordinate-backed Federal Corps launch. All six endpoint audits returned review with no suspicious, failure or unknown results; the Canoe Company endpoint is an outfitter/parking anchor offset from generalized NHD flowline and remains explicit in evidence.

See [the Contoocook batch evidence record](../operations/starter-evidence/new-hampshire-contoocook.json). Recheck current municipal/federal access rules, take-out hours, parking, broken-dam boundaries and live Henniker stage trend before deployment.


## Saco scored expansion

The current expansion adds `saco-river-bartlett-cooks-crossing`, a 5.3-mile Class I-II White Mountain day reach. Wilderness Portal documents the named reach, public route coordinates and a 200-1,000 cfs float band with a 2,000 cfs upper reference tied to direct USGS 01064500 near Conway; NH DES documents the managed Saco-Swift public access corridor. The route carries explicit sweeper, cold-water, rain-rise, access and day-use camping controls. Evidence: `docs/operations/starter-evidence/new-hampshire-saco.json`.

The Contoocook expansion adds `contoocook-river-river-road-riverway-park`, a 5.5-mile scored reach from the federal Army Corps River Road cartop launch to the documented Riverway Park endpoint. The NH public-access directory supplies the on-water River Road coordinates; the Forest Society guide supplies the downstream itinerary and access context. It retains the direct USGS 01085000 Henniker stage gauge, 5–8.5 ft planning band, cold-water/strainer controls and day-use camping posture. New Hampshire now has 11 routes (11 scored). Evidence: `docs/operations/starter-evidence/new-hampshire-contoocook.json`.

The follow-on `contoocook-river-river-road-canoe-company` itinerary extends the same documented chain to 14.5 miles, using Riverway Park as an intermediate bailout and the Canoe Company endpoint documented by the Forest Society guide. It remains scored on direct USGS 01085000 stage data with the established access, obstruction, cold-water and day-use controls. New Hampshire now has 12 routes (12 scored). Evidence: `docs/operations/starter-evidence/new-hampshire-contoocook.json`.

The Saco rotation adds two AMC-documented public-access reaches: `saco-river-first-bridge-davis-park` (8.5 miles, Class I) and `saco-river-davis-park-smith-eastman` (2.5 miles, Class II). AMC documents the popular North Conway float, Conway Rips and Powerline Rapid; the Town of Conway lists First Bridge, Davis Park and Smith-Eastman as public-use properties, while the NH access directory supplies coordinate-backed canoe-access anchors. Both routes use direct USGS 01064500 discharge data, carry crowding, cold-water, sweeper and rapid controls, and remain day-use only. A third scored itinerary, `saco-river-first-bridge-smith-eastman`, combines the two AMC sections into an 11-mile day with Davis Park as an intermediate bailout. New Hampshire now has 15 routes (15 scored). Evidence: `docs/operations/starter-evidence/new-hampshire-saco.json`.

The final New Hampshire pass adds `contoocook-river-federal-river-road` (4 miles) between two documented Henniker federal access anchors and four distinct Saco itineraries: `saco-river-bartlett-davis-park` (12.5 miles), `saco-river-bartlett-smith-eastman` (14.5 miles), `saco-river-cooks-crossing-davis-park` (8.5 miles), and `saco-river-cooks-crossing-smith-eastman` (10.5 miles). The combined trips retain Davis Park and Cooks Crossing as intermediate exits, flag Conway Rips/Powerline Rapid boundaries, and use direct USGS 01085000 or 01064500 telemetry with day-use camping controls. New Hampshire now has 20 routes (20 scored). Evidence: `docs/operations/starter-evidence/new-hampshire-contoocook.json` and `docs/operations/starter-evidence/new-hampshire-saco.json`.
The Saco gap-fill adds the two remaining forward access combinations among Bartlett River Street, Cooks Crossing and First Bridge: `saco-river-bartlett-first-bridge` and `saco-river-cooks-crossing-first-bridge`. Both use the direct USGS 01064500 Conway gauge, AMC/Town of Conway public water-entry sources, 200–1,000 cfs planning band, cold-water/strainer/rain-rise controls and no riverbank camping. New Hampshire now has 22 scored routes. The reviewed Contoocook, Pemigewasset and Saco endpoint sets are pair-complete; further routes require new source-backed public access points or distinct threshold evidence. Evidence: `docs/operations/starter-evidence/new-hampshire-saco.json`.

## Androscoggin North Woods planning pass — 2026-09-13

Added three researched planning-only routes: Errol–Dummer, Dummer–Shelburne and the full Errol–Shelburne itinerary. The Androscoggin River Watershed Council documents more than 50 public access sites, popular scenic day trips, remote North Woods character and named access sections; the New Hampshire public-access index supplies coordinate-backed Errol, Dummer and Shelburne water-entry anchors. Direct USGS 01052500/01053500 stations are recorded, but no route-specific numeric recreational cutoff was transferred, so these cards remain planning-only. Safety, cold-water, dam/rapid, private-shoreline, limited-exit and nearby-basecamp guidance is explicit. New Hampshire now has 25 routes (22 scored, 3 planning). Evidence: `docs/operations/starter-evidence/new-hampshire-androscoggin.json`.

Added three researched planning-only Connecticut River routes: Bedell Bridge State Park–Orford, Orford–Wilson Landing and Bedell–Wilson. The Connecticut River Paddlers Trail documents the public ramps, river-mile sequence, parking and campground context; New Hampshire access rules and direct USGS 01144500 telemetry provide additional evidence. The cards carry public water-entry coordinates, PFD/cold-water/wind/dam/private-bank controls, nearby-basecamp camping and a river-specific Commons gallery. No numeric recreational cutoff was transferred. New Hampshire now has 28 routes (22 scored, 6 planning). Evidence: `docs/operations/starter-evidence/new-hampshire-connecticut-river.json`.

Added the final two researched planning-only Connecticut River combinations: Wilson Landing–Ledyard Canoe Club and Ledyard–East Wilder. The Paddlers Trail confirms both public access sites and river-mile sequence; Ledyard’s limited paid parking and East Wilder’s unimproved ramp are explicit access caveats. Direct USGS 01144500 telemetry, public water-entry coordinates, cold-water/wind/dam/private-bank controls, nearby-basecamp camping and the river-specific gallery remain in place. New Hampshire now has 30 routes (22 scored, 8 planning). Evidence: `docs/operations/starter-evidence/new-hampshire-connecticut-river.json`.

## Merrimack Valley planning pass — 2026-09-16

Added three researched planning-only Merrimack River routes: Sewalls Falls–Everett Arena, Sewalls Falls–Ferry Street/Allenstown and Everett Arena–Ferry Street/Allenstown. The New Hampshire access directory, Concord park materials, Allenstown launch ordinance and Lower Merrimack corridor plan document the public water-entry facilities, dam and industrial-shoreline constraints, and water-quality posture. Direct USGS 01081500 telemetry is attached, with explicit PFD, strainer, bridge, dam, cold-water, private-bank and water-quality controls, nearby-basecamp camping and a river-specific Commons gallery. No route-specific recreational flow cutoff was transferred, so these cards remain planning-only. New Hampshire now has 33 routes (22 scored, 11 planning). Evidence: `docs/operations/starter-evidence/new-hampshire-merrimack.json`.

The Merrimack pass also adds `merrimack-river-ferry-street-lambert-park`, a short Ferry Street/Allenstown-to-Lambert Park connector. The state access directory supplies the Hooksett Lambert Park coordinate and headway-speed rule; the route stops before the downstream Amoskeag industrial and dam corridor. New Hampshire now has 34 routes (22 scored, 12 planning).

## Merrimack access-chain completion pass — 2026-09-16

Added six additional distinct planning pairs within the documented Boscawen–Canterbury–Concord–Bow–Hooksett access chain: `merrimack-river-boscawen-bow`, `merrimack-river-boscawen-lambert-park`, `merrimack-river-intervale-sewalls-falls`, `merrimack-river-intervale-bow`, `merrimack-river-intervale-lambert-park`, and `merrimack-river-sewalls-lambert-park`. The public-access directory and municipal ramp records support the named water-entry endpoints; each card retains proxy-gauge posture on USGS 01081500 because no route-specific recreational flow cutoff was established. Safety, nearby-basecamp camping, dam/industrial-shoreline controls, curated geometry and duplicate review remain explicit. New Hampshire now has 50 routes (27 scored, 23 planning), meeting the 50-route target with no unsupported endpoint padding. Evidence: `docs/operations/starter-evidence/new-hampshire-merrimack-expansion.json`.

## Merrimack Bow–Canterbury access-chain pass — 2026-09-16

Added five researched planning-only routes: `merrimack-river-sewalls-bow`, `merrimack-river-bow-lambert-park`, `merrimack-river-boscawen-intervale`, `merrimack-river-intervale-riverland`, and `merrimack-river-boscawen-riverland`. The New Hampshire public-access directory provides named water-entry coordinates for Sewalls Falls, Bow/PSNH, Lambert Park, Boscawen, Canterbury Intervale and Riverland; Bow and Concord municipal pages corroborate access context, and the Lower Merrimack corridor plan supplies the broader dam, industrial-shoreline and water-quality constraints. All cards retain explicit proxy-gauge posture on USGS 01081500 because no route-specific recreational flow cutoff was established. Safety, nearby-basecamp camping, access carry/parking caveats, curated corridor geometry, duplicate review and the existing Merrimack River Commons gallery remain in place. New Hampshire now has 39 routes (22 scored, 17 planning). Evidence: `docs/operations/starter-evidence/new-hampshire-merrimack-expansion.json`.

## Merrimack Franklin–Concord scored pass — 2026-09-16

Added `merrimack-river-franklin-boscawen` (about 12 miles), `merrimack-river-boscawen-sewalls-falls` (about 16 miles), `merrimack-river-boscawen-everett-arena` (about 17.5 miles), `merrimack-river-franklin-sewalls-falls` (about 18 miles) and `merrimack-river-franklin-everett-arena` (24 miles). How’s Your River, using American Whitewater and USGS data, documents the Franklin–Concord run, a 400 cfs runnable floor and a 1,500–2,000 cfs good recreational band; its directions identify Boscawen Depot, Sewalls Falls and Everett Arena, while the New Hampshire access directory and Concord guide provide public water-entry anchors. The cards include Sewalls Falls Class II scouting, dam and cold-water controls, nearby-basecamp camping, curated geometry, duplicate review and the river-specific Merrimack gallery. New Hampshire now has 44 routes (27 scored, 17 planning). Evidence: `docs/operations/starter-evidence/new-hampshire-merrimack-franklin-expansion.json`.
