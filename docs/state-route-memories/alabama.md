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
