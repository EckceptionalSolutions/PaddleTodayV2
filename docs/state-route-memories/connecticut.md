# Connecticut starter coverage

Campaign activated 2026-09-09. Initial public catalog count: 0.

## Work order

Follow [the campaign plan](../lower-48-starter-coverage-plan.md) and the live [campaign record](../operations/lower-48-starter-campaign.json). Targets: 3, then 6, then approximately 10 routes, rotating across all states between passes. Read the route addition and safety policies before qualification.

## Unreviewed corridor leads

- Farmington
- Connecticut
- Housatonic
- Quinnipiac
- Quinebaug
- Shetucket

These are discovery leads, not verified endpoint pairs. No route has been qualified by this initial record. Screen 15–20 concrete reaches if sources support that many; retain distinct day trips rather than every endpoint combination.

## Sources and state-specific review

- [CT DEEP boat launches](https://portal.ct.gov/DEEP/Boating/Boat-Launches)
- USGS current observations and station metadata. Confirm a station's actual reach relationship and stage datum before transferring guidance.
- Responsible local launch managers, trail organizations, and current closure notices.

Which access chains have clear dam boundaries and non-tidal options appropriate for initial discovery?

Verify actual water-entry coordinates, access rights and parking, distance, hazards, camping, conditions posture, and route geometry. Planning status does not excuse unresolved access or safety.

## First scored pass (2026-09-10)

Qualified three upper Farmington day reaches using the Wild & Scenic recreation map’s named Access Points 6, 7, 8 and 9. All three use direct USGS 01186000 telemetry and the same-corridor Riverton guidance of 250 cfs minimum and 360–980 cfs optimum for downriver canoeing. Access Points 6–8 form the safer first corridor; the short Access Point 8–9 connector carries reservoir and dam-boundary cautions. Cold water, strainers and fast rises remain explicit hazards.

Route IDs: `farmington-river-riverton-peoples-forest`, `farmington-river-peoples-forest-181-318`, `farmington-river-181-318-lake-mcdonough`.

The batch is validated-not-deployed pending canonical geometry and endpoint checks. Keep the community threshold band tied to 01186000; do not transfer it to lower Farmington, Connecticut River or another basin reach.

## Second scored-first pass (2026-09-10)

Added three documented upper Housatonic reaches tied to direct USGS 01199000 at Falls Village. The Route 7/112 canoe launch to Housatonic Meadows State Park reach is the scored addition: the paddling guide and Connecticut DEEP access page support the public endpoints, and the route is conservatively estimated at 8.2 river miles from the documented access chain. The Falls Village station to Housatonic Meadows route is retained as planning-only because Rattlesnake begins below the hydro station. Housatonic Meadows to the North Kent Road Wildlife Management Area is also planning-only because Swift’s Bridge can become a Class III–IV feature and the take-out is primitive.

Wilderness Portal supplies the route-specific 1000 cfs minimum, 2500 cfs good and 8000 cfs maximum cues for the Falls Village gauge. All six endpoints are tied to documented public access anchors; four audit OK and two return informational review because they sit within the NHD waterbody at a launch edge. Avoid Bull’s Bridge, Bleachery Dam, impoundments and tidal water. Evidence: `docs/operations/starter-evidence/connecticut-housatonic.json`.

## Third scored-first pass (2026-09-10)

Added three Quinebaug River Water Trail reaches, all scored against direct telemetry. Fabyan Dam Canoe Launch to West Thompson Lake Boat Ramp is 5.8 miles and uses USGS 01124000 with the guide’s 225 cfs minimum cue. Simonzi Park to Cotton Bridge Road is about 4.9 miles, and Cotton Bridge to Route 101 is about 1.0 mile; both use USGS 01125500 with the guide’s 300–600 cfs moderate-flow band and 200 cfs low-flow floor. The Route 101 take-out is the last documented public access before Rogers Dam, which is explicitly excluded.

The Quinebaug River Water Trail and The Last Green Valley guide document public launches, distances, flow cues, dam boundaries and access carries. Coordinate audits returned two OK and four informational waterbody-edge reviews with no suspicious or failure findings. Keep all three routes validated-not-deployed pending full audits and current access/release checks. Evidence: `docs/operations/starter-evidence/connecticut-quinebaug.json`.

## 20-route expansion pass

The first expansion adds the 11-mile Riverton-to-Route 181/318 upper Farmington reach, joining the documented Access Point 6, People’s State Forest and Access Point 8 chain. It remains scored against direct USGS 01186000 telemetry using the established 250 cfs floor and 360–980 cfs community band, with explicit dam, cold-water, strainer and private-bank controls. Evidence: `docs/operations/starter-evidence/connecticut-farmington-expansion.json`.

The second expansion pass adds the full 13.7-mile Riverton-to-Lake McDonough Farmington reach (`farmington-river-riverton-lake-mcdonough`) with People’s State Forest and Route 181/318 as intermediate access points. It reuses the direct Riverton gauge and same-corridor 250 cfs minimum / 360–980 cfs optimum planning band, while keeping every dam, portage and Lake McDonough boundary explicit. Connecticut now has 12 routes (10 scored, 2 planning). Evidence: `docs/operations/starter-evidence/connecticut-farmington-expansion.json`.

The Farmington expansion also adds the 8.5-mile People’s State Forest-to-Lake McDonough reach (`farmington-river-peoples-forest-lake-mcdonough`), retaining the documented Route 181/318 intermediate access and the same direct-gauge flow band. Connecticut now has 13 routes (11 scored, 2 planning). Evidence: `docs/operations/starter-evidence/connecticut-farmington-expansion.json`.

Added seven scored Willimantic River Water Trail reaches from the Route 32 Stafford Springs commuter lot through Nye-Holman, Heron Cove, Peck's Mill, Merrow Meadow, River Park and the Eagleville-to-Route 66 corridor. The Willimantic River Alliance / Last Green Valley guide documents the access coordinates, river-mile sequence, Class II features, novice River Park ramp, Eagleville Dam portage and Route 66 terminus. Upper routes use direct USGS 01119382 with the guide's 2.1 ft minimum; lower routes use direct 01119500 with the 4.2 ft minimum. Every route includes explicit dam, strainer, cold-water, private-bank and access controls. Evidence: `docs/operations/starter-evidence/connecticut-willimantic.json`.

The 2026-09-13 Willimantic expansion adds ten scored chain combinations: commuter–Heron Cove, commuter–Peck's Mill, commuter–Merrow Meadow, commuter–River Park, commuter–Eagleville Lake, Nye-Holman–Peck's Mill, Nye-Holman–Merrow Meadow, Nye-Holman–River Park, Heron Cove–Merrow Meadow and Heron Cove–River Park. Each keeps the guide's named public water entries and intermediate bailouts, direct Merrow or Coventry telemetry, 2.1/4.2 ft minimum cues, dam portage rules, camping posture and safety controls. Connecticut now has 30 public routes (28 scored, 2 planning). See the updated [Willimantic evidence record](../operations/starter-evidence/connecticut-willimantic.json).

## 40-route expansion pass (2026-09-13)

Added ten scored Willimantic chain combinations to the Eagleville corridor: Nye-Holman–Eagleville Lake, Heron Cove–Eagleville Lake, Peck's Mill–River Park, Peck's Mill–Eagleville Lake, Merrow Meadow–Eagleville Lake, plus five reaches ending at the documented downstream Eagleville Preserve portage access. Each route retains the guide's named public access chain, direct Merrow or Coventry telemetry, conservative 2.1/4.2 ft minimum cues, mandatory dam-carry language, camping posture, safety hazards and gallery inheritance. Connecticut now has 40 public routes (38 scored, 2 planning). The downstream combinations are intentionally bounded at the portage access and must not be interpreted as permission to run Eagleville Dam or continue toward the downtown dams.

## 50-route expansion pass (2026-09-13)

Added seven scored Willimantic chain combinations ending at the documented downstream Eagleville portage access or Route 66 terminus: commuter–downstream, commuter–Route 66, Nye-Holman–Route 66, Heron Cove–Route 66, Peck's Mill–Route 66, Merrow Meadow–Route 66 and River Park–Route 66. They retain the named public water-entry chain, direct Coventry telemetry, conservative 4.2 ft minimum cue, mandatory Eagleville Dam carry, Route 66 stop, camping posture and inherited safety controls. Connecticut now has 47 public routes (45 scored, 2 planning); no route crosses the dam or continues into the documented downtown hazard reach.

## 50-route completion pass (2026-09-16)

Added three scored lower Quinebaug Water Trail reaches: `quinebaug-river-lafreniere-fish-hatchery` (5.3 miles), `quinebaug-river-lafreniere-robert-manship` (9.9 miles) and `quinebaug-river-lafreniere-butts-bridge` (15.5 miles). The Connecticut Trail Finder and The Last Green Valley guide document the LaFreniere public launch, CT DEEP Fish Hatchery, Robert Manship Park and Butts Bridge/Aspinook Pond access sequence, distances and challenging Class II/dam-remnant character. These cards use direct USGS 01125500 telemetry with a conservative 400 cfs floor and 500–1,000 cfs preferred band, and preserve exposed-metal, rapid, broad-current, cold-water, limited-bailout and full-day controls. Every endpoint is labeled as a water-entry edge, with camping posture, route-specific gallery coverage and canonical geometry. Connecticut now has 50 public routes (48 scored, 2 planning). Evidence: `docs/operations/starter-evidence/connecticut-quinebaug.json`.
