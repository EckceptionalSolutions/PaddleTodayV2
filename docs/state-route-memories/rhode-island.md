# Rhode Island starter coverage

Campaign activated 2026-09-09. Initial public catalog count: 0.

## Work order

Follow [the campaign plan](../lower-48-starter-coverage-plan.md) and the live [campaign record](../operations/lower-48-starter-campaign.json). Targets: 3, then 6, then approximately 10 routes, rotating across all states between passes. Read the route addition and safety policies before qualification.

## Unreviewed corridor leads

- Wood
- Pawcatuck
- Pawtuxet
- selected Blackstone and Branch reaches

These are discovery leads, not verified endpoint pairs. No route has been qualified by this initial record. Screen 15–20 concrete reaches if sources support that many; retain distinct day trips rather than every endpoint combination.

## Sources and state-specific review

- [ExploreRI water trails and access maps](https://exploreri.org/)
- USGS current observations and station metadata. Confirm a station's actual reach relationship and stage datum before transferring guidance.
- Responsible local launch managers, trail organizations, and current closure notices.

How many distinct inland trips survive dam, access, and overlap review? ExploreRI also includes neighboring-state waters; verify attribution.

Verify actual water-entry coordinates, access rights and parking, distance, hazards, camping, conditions posture, and route geometry. Planning status does not excuse unresolved access or safety.

## First batch qualified

The first scored batch covers the Wood-Pawcatuck watershed: Bradford Landing to Westerly Municipal, Switch Road Wood River to Bradford, and Bradford to Main Street. RiverScout provides a 200–600 cfs Class I–II planning band tied to USGS 01118500; ExploreRI and RIDEM document the named public launches. Three endpoints are OK and three are review because ramp or bank anchors sit on mapped waterbodies away from the NHD centerline; none are suspicious, failed or unknown.

Qualified route IDs:

- `pawcatuck-river-bradford-westerly`
- `wood-river-switch-bradford`
- `pawcatuck-river-bradford-main-street`

See [the batch evidence record](../operations/starter-evidence/rhode-island-wood-pawcatuck.json). Recheck DEM access, parking, dam and fish-weir portages, the freshwater-to-tidal transition, and live 01118500 trend before deployment.

Pending: endpoint-pair discovery, current manager/closure review, gauge/threshold qualification, and overlap review. No exhausted-source or route-count-shortfall conclusion has been made. Record source attempts and exact retry conditions in the campaign candidate record; use the existing candidate ledger for qualified reach work.

## Second batch implemented - 2026-09-10

Added `wood-river-switch-westerly`, a longer 16-mile scored itinerary joining the already audited Switch Road Wood River launch to Westerly Municipal. It reuses the direct USGS 01118500 gauge and RiverScout's 200–600 cfs Class I–II planning band, while preserving confluence, portage, strainer, private-bank and tidal cautions. Rhode Island now has four scored routes. Blackstone and Pawtuxet remain discovery leads until their access pairs and conditions evidence are reviewed to the same standard.

## Blackstone scored extension - 2026-09-10

Added `blackstone-river-rivers-edge-manville` (about 3 miles) and `blackstone-river-sycamore-albion` (about 1.5 miles). RiverScout publishes a direct-gauge 200–1,200 cfs Class I–II window for USGS 01112500; the Blackstone River Watershed Council documents the public launches and dam-portage boundaries. Both routes stop at managed above-dam access and carry explicit portage, water-quality, rapid-rise and private-property cautions. Rhode Island now has six scored routes pending final coordinate-audit completion and release verification.

## Blackstone scored extension — 2026-09-10 (second pass)

Added `blackstone-river-rivers-edge-sycamore` (about 4.5 miles), `blackstone-river-manville-albion` (about 2.5 miles), and `blackstone-river-rivers-edge-albion` (about 6 miles). The routes use the documented Rivers Edge, Manville, Sycamore and Albion above-dam access sequence, direct USGS 01112500 telemetry, and RiverScout's 200–1,200 cfs Class I–II planning window. All dam and mill structures remain mandatory portages, and the route boundaries stop above Albion Dam. Endpoint audits returned six ok and six informational review results with no suspicious or failure findings. Rhode Island now has nine scored public starter routes pending current parking, portage, water-quality and gauge checks.

## Blackstone gap-fill expansion - 2026-09-12

Added `blackstone-river-manville-sycamore`, a distinct approximately 1.2-mile connector between the documented Manville and Sycamore public landings. It uses the direct USGS 01112500 Woonsocket gauge and RiverScout's 200–1,200 cfs Class I–II planning window, stops above Albion Dam, and retains mandatory portage, mill-structure, water-quality and private-property controls. Rhode Island now has 10 scored routes. Evidence: `docs/operations/starter-evidence/rhode-island-wood-pawcatuck.json`.

## Pawtuxet saturation screen — 2026-09-12

The next corridor screen reviewed the Pawtuxet River Authority, ExploreRI, RIDEM and RICKA material. The documented Pontiac-to-Rhodes trip is approximately 6.5 miles, but the current ExploreRI access record reports that the Howard Conservation Area parking lot may be blocked and that Rhodes on the Pawtuxet is a private facility allowing public access by permission. The Upper Pawtuxet Hope Landing trip is a popular 4-mile out-and-back toward the Scituate Reservoir, without a distinct downstream public take-out. USGS 01116500 at Cranston and 01116000 at Washington provide direct telemetry, but no new route cleared the combined public-endpoint, distinct-reach and threshold bar. Hold Rhode Island at 10 scored routes until a current manager-backed take-out and route-specific scoring evidence are available.
## Woonasquatucket expansion — 2026-09-12

Added eight scored Woonasquatucket River reaches from the Woonasquatucket River Watershed Council paddling guide: Georgiaville–Whipple, Georgiaville–Esmond, Georgiaville–Cricket/Greystone, Esmond–Cricket, Manton–Riverside, Manton–Waterplace, Riverside–Waterplace and Waterplace–South Water Street. The WRWC documents the public launch sequence, distances, dam portages and 50–75 cfs rocky versus approximately 200 cfs smoother conditions tied to direct USGS 01114500 at Centerdale. The routes include strong contamination, tide, urban-access, low-water, strainer and camping cautions and a river-specific Commons gallery. Rhode Island now has eighteen scored routes. See the [Woonasquatucket evidence record](../operations/starter-evidence/rhode-island-woonasquatucket.json).

Added two scored Blackstone reaches: Sycamore Landing to Captain Wilbur Kelly House and Kelly House to Central Falls Landing. The Blackstone River Watershed Council documents the public granite-stair accesses and the Albion, Pratt and Valley Falls dam portages; RiverScout's direct USGS 01112500 window remains 200–1,200 cfs. Both routes retain mandatory portage, urban-current, water-quality and private-property controls. Rhode Island now has twenty scored starter routes.

The 30-route expansion adds seven distinct Blackstone combinations from Rivers Edge, Manville, Sycamore and Albion to Kelly House and Central Falls, plus three Woonasquatucket combinations from Georgiaville and Cricket through Riverside to Waterplace and South Water. Every route uses a direct gauge, documented public water-entry anchor, explicit dam/portage, urban-water-quality, tide and strainer controls, and day-use camping guidance. Canonical geometry and safety audits pass with the route asset bundle at the repository size limit. Rhode Island now has 30 scored routes. Evidence: `docs/operations/starter-evidence/rhode-island-wood-pawcatuck.json` and `docs/operations/starter-evidence/rhode-island-woonasquatucket.json`.

Quality review 2026-09-13: Bradford Landing–Main Street and Bradford Landing–Westerly Municipal/Main Street are retained as explicit access-facility alternatives. They share the same public take-out context and are grouped in consolidation metadata to avoid implying separate Pawcatuck corridors.
## Woonasquatucket expansion pass (2026-09-13)

Added ten scored Woonasquatucket water-trail combinations using the WRWC access sequence: Whipple–Esmond, Whipple–Cricket, Cricket–Manton, Cricket–Riverside, Cricket–South Water, Esmond–Waterplace, Esmond–South Water, Manton–South Water, Whipple–Waterplace and Whipple–South Water. Each route retains the direct Centerdale gauge, 50 cfs minimum planning cue, named public access and dam-portage controls, urban water-quality guidance, no-bank-camping posture and gallery inheritance. The routes are bounded at documented public landings and the tidal Providence corridor remains subject to tide, event and contamination notices.

The 2026-09-13 50-route screen adds seven further scored Woonasquatucket reaches: Georgiaville–Manton, Georgiaville–Riverside, Whipple–Manton, Whipple–Riverside, Esmond–Manton, Esmond–Riverside and Riverside–South Water Street. Each is a contiguous public-access itinerary with named intermediate bailouts and the existing dam, strainer, tide, contamination, access and camping controls. Rhode Island now has 47 scored routes; the remaining three-route gap requires a distinct source-backed public reach rather than duplicating the reviewed access alternatives.
