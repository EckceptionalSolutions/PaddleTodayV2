# Alabama starter coverage

Campaign activated 2026-09-09. Initial public catalog count: 0.

## Work order

Follow [the campaign plan](../lower-48-starter-coverage-plan.md) and the live [campaign record](../operations/lower-48-starter-campaign.json). Targets: 3, then 6, then approximately 10 routes, rotating across all states between passes. Read the route addition and safety policies before qualification.

## Unreviewed corridor leads

- Autauga Creek
- Cahaba
- Flint near Huntsville
- Sipsey Fork
- selected Coosa and Bartram trail reaches

These are discovery leads, not verified endpoint pairs. No route has been qualified by this initial record. Screen 15–20 concrete reaches if sources support that many; retain distinct day trips rather than every endpoint combination.

## Sources and state-specific review

- [Outdoor Alabama canoe trails](https://www.outdooralabama.com/node/30)
- [Autauga Creek](https://www.outdooralabama.com/rivers-and-mobile-delta/autauga-creek)
- USGS current observations and station metadata. Confirm a station's actual reach relationship and stage datum before transferring guidance.
- Responsible local launch managers, trail organizations, and current closure notices.

Which officially documented trips offer straightforward access and broad recreational appeal? Separate delta navigation from river scoring.

Verify actual water-entry coordinates, access rights and parking, distance, hazards, camping, conditions posture, and route geometry. Planning status does not excuse unresolved access or safety.

## Research state

The first scored routes are implemented locally and validated but not deployed: **Hatchet Creek — Highway 280 Bridge to Highway 231 Bridge** (`hatchet-creek-highway-280-highway-231`), the longer **Highway 280 Bridge to Kings Bridge take-out** (`hatchet-creek-highway-280-kings-bridge`), and the lower **Highway 231 Bridge to Kings Bridge take-out** (`hatchet-creek-highway-231-kings-bridge`). Outdoor Alabama documents the corridor and warns of dragging below around 400 cfs; Alabama Scenic River Trail supplies the 12.8-mile day endpoint pair, the 24-mile overnight endpoint at Kings Bridge, the lower segment's named breached dam and primitive campsites, and a 600 cfs ideal reference; USGS 02408540 is the direct continuous discharge source. All scores use a conservative minimum-only 400 cfs floor. The short take-out trace is review-level (106 ft from the matched flowline, 67 ft from mapped water), and Kings Bridge is review-level at 261 ft. The generated NHD traces for the two Kings Bridge routes are shorter than their published source mileage (19.26 vs 24 mi; 6.46 vs approximately 11.3 mi), so those paths require reconciliation before deployment. The guide warns that adjacent banks may be private, so legal pull-off, parking, landing and campsite conditions remain release checks. Evidence: `docs/operations/starter-evidence/alabama-hatchet.json`.

Second batch qualified 2026-09-10: three scored upper Cahaba Blueway segments using direct USGS 02423380 near Mountain Brook: Moon River–Grants Mill, Grants Mill–Old Overton, and Old Overton–US 280. Cahaba Blueway documents the public or managed accesses, reach mileage and low-water/dam guidance; American Whitewater supplies the 200–5,000 cfs planning range. Four endpoints audit OK and two are review-level waterbody anchors with no severe findings. The US 280 route ends at the mapped river edge above the dangerous low-head dam; never continue under the bridge. Keep the six-route Alabama batch validated-not-deployed until the production build and current access, parking, storm, flow, wood and private-bank checks are complete. Next pass should screen distinct Coosa, Flint, Sipsey and delta-adjacent trips, with direct gauge and access evidence required.

Third batch qualified 2026-09-10: four scored Flint River segments using direct USGS 03575100 Brownsboro stage telemetry and the documented Ryland Pike–Talado–Little Cove–Hays/Cherokee access sequence. Outdoor Alabama describes the lower Flint as an easy float with blown-down trees as the main obstacle; the North Alabama paddling map supplies the coordinates and parking posture; the Huntsville guide quotes the Alabama Scenic River Trail preference for 7–8 ft on the Brownsboro gauge. Seven endpoints audit OK and Cherokee Landing is a documented waterbody anchor with an expected review classification; no endpoint is suspicious or failed. Keep the ten-route Alabama batch validated-not-deployed until the production build and current access, parking, rain, stage, wood and private-bank checks are complete. Next pass should screen distinct Sipsey, Coosa, delta or other direct-gauge corridors.

## 20-route expansion pass

The first expansion pass adds `sipsey-fork-county-route-60-highway-33`, a distinct 9.5-mile County Route 60 (Sipsey Recreational Area) to W.T. Mims Family Public Access / Alabama Highway 33 reach. American Whitewater names the exact Class II reach, ties it to direct USGS 02450250 near Grayson, and publishes a 200–350 cfs optimal band. Outdoor Alabama and Alabama Recreation Trails corroborate the public access sequence, low-water and rainfall behavior, and the broader Bankhead primitive-camping context. The route is treated as a day trip with nearby-basecamp camping only; no unverified river campsite is promoted. Rivers.gov provides the federal same-river context photograph. Alabama now has 11 routes (11 scored); continue only with distinct Sipsey, Mulberry, Coosa, or other corridors that clear the same direct-gauge, threshold, access, safety and image gates.

The second expansion pass adds two scored Upper Mulberry routes: CR 10 to Garden City and Blountville Road to CR 10. The full Blountville-to-Garden City reach (`mulberry-fork-blountville-garden-city`) joins those documented public endpoints with CR 10 as an intermediate bail-out, uses the direct Garden City stage gauge and preserves the American Whitewater 2-ft runnable cue with a conservative 4.5–6-ft preferred band. Alabama now has 14 routes (14 scored). Evidence: `docs/operations/starter-evidence/alabama-mulberry-expansion.json`.

The Sipsey expansion adds `sipsey-fork-highway-33-county-road-b15`, a documented 4.5-mile public canoe section from the W.T. Mims Highway 33 access to County Road B15. Outdoor Alabama and Alabama Recreation Trails document the access sequence and distance; the route keeps the direct USGS 02450250 gauge and conservative 200–350 cfs same-river planning cue, with explicit shoal, strainer, rain-rise, private-bank and nearby-camping controls. Alabama now has 15 routes (15 scored). Evidence: `docs/operations/starter-evidence/alabama-sipsey-expansion.json`.

The next expansion pass adds `locust-fork-five-points-hwy-79`, a scored 10.2-mile public Locust Fork section from Five Points Road to Kings Bend Scenic Overlook Park at Highway 79. Friends of the Locust Fork River documents the public endpoint pair, Difficulty 2 character, 1.5-foot float minimum, about 2-foot easy-float cue, one waterfall and two Class II rapids; its linked section map supplies water-entry coordinates. The route uses direct USGS 02455000 near Cleveland with conservative 1.8–2.4 ft preferred planning bounds and a 3 ft review ceiling, explicit private-access exclusions, day-use camping posture, and a river-specific CC BY-SA 4.0 Wikimedia image. NHD geometry is network-traced with a 6 ft endpoint snap. Alabama now has 16 routes (16 scored). Evidence: `docs/operations/starter-evidence/alabama-locust-fork-expansion.json`.

A follow-on short option, `locust-fork-five-points-taylor-ford`, uses the same documented Five Points public put-in and the mapped Taylor Ford public take-out for approximately 3 miles. The source map labels both endpoints public and the connected guide supplies the 1.5-foot minimum and approximately 2-foot easy-float cues. It is scored with the same direct 02455000 gauge, conservative bounds, day-use camping posture and explicit private-access exclusions. Alabama now has 17 routes (17 scored); evidence remains in `docs/operations/starter-evidence/alabama-locust-fork-expansion.json`.

A third Locust Fork addition, `locust-fork-county-14-cold-branch`, covers the source-documented 10-mile County Highway 14 to Cold Branch Road easy reach. Friends of the Locust Fork identifies both public water entries, the 8-mile Highway 14-to-26 section plus the 2-mile Cold Branch continuation, frequent small shoals, the 1.4-foot float minimum and about 2-foot easy-float cue. It is scored against direct USGS 02455000 with conservative bounds, day-use camping and explicit access controls. Alabama now has 18 routes (18 scored). Evidence: `docs/operations/starter-evidence/alabama-locust-fork-expansion.json`.

A fourth Locust Fork addition, `locust-fork-swann-nectar`, covers the source-mapped 4.1-mile Swann Covered Bridge to Covered Bridge Road near Nectar public section. Friends of the Locust Fork documents Difficulty 1–2, the Powell Falls waterfall, public parking/carries and stage guidance. The route is scored with direct USGS 02455000, conservative 1.8–2.2 ft preferred bounds, and mandatory waterfall scouting/portage controls. Its geometry uses a reviewed sample of the official linked map centerline because the named NHD query returned an unrelated fallback. Alabama now has 19 routes (19 scored); evidence: `docs/operations/starter-evidence/alabama-locust-fork-expansion.json`.

The fifth Locust Fork addition, `locust-fork-taylor-ford-hwy-79`, covers the source-mapped approximately 7-mile Taylor Ford Road to Kings Bend Scenic Overlook Park reach. The connected Friends of the Locust Fork guide documents the public endpoints, waterfall/Class II features and stage guidance. It is scored with direct USGS 02455000, conservative bounds, and explicit feature-scouting and portage controls. Alabama now has 20 routes (20 scored), completing this state’s current target. Evidence: `docs/operations/starter-evidence/alabama-locust-fork-expansion.json`.

## 30-route expansion — Coosa tailwater pass

The first pass toward the new 30-route target adds three distinct Wetumpka Coosa River reaches: `coosa-river-jordan-dam-corn-creek` (about 5.2 miles), `coosa-river-corn-creek-gold-star` (about 2.1 miles), and `coosa-river-jordan-dam-gold-star` (about 7.3 miles). The current City of Wetumpka whitewater map documents this high-demand Jordan Dam tailwater, public Corn Creek and Gold Star exits, Class II–III features and 2,000/4,000/6,000/10,000 cfs flow cues. Coosa River Adventures corroborates the 7-mile, 3–4 hour trip and feature sequence; USGS 02411600 provides direct Wetumpka stage telemetry. The routes include water-entry access anchors, dam/rapid/cold-water/strainer/private-bank safety information, day-use camping posture and a river-specific public-domain Pipeline Falls photograph. Alabama now has 23 routes (23 scored). Evidence: `docs/operations/starter-evidence/alabama-coosa.json`. Recheck Alabama Power releases, live gauge trend, park access and weather before deployment.
## 30-route expansion — Harold Banks Tallapoosa pass

The Tallapoosa pass adds seven scored sections on the official Harold Banks Canoe Trail: the three named sections, three longer combinations, and Peters Island to Jay Bird Creek (5.5 miles) using the Extension-listed public Peters Island access. Alabama Cooperative Extension documents the public access chain, float times, family-friendly Class I character, direct gauge locations, and the favorable 1,500–10,000 cfs range. Designated campsites are on private property and require landowner permission. The routes use direct USGS discharge telemetry at Wadley (02414500) and New Site/Horseshoe Bend (02414715), water-edge anchors checked against mapped Tallapoosa geometry, intermediate public bailouts, and a Tallapoosa-specific canoe image credited to Alabama Extension. Alabama now has 30 public scored routes, completing the current state target. Evidence: `docs/operations/starter-evidence/alabama-tallapoosa.json`.

Quality review 2026-09-13: the Tallapoosa Peters Island–Jay Bird Creek and Horseshoe Bend–Jay Bird Creek routes are intentionally retained as nearby public access alternatives, grouped in route consolidation metadata so users see an access choice rather than duplicate corridors.
