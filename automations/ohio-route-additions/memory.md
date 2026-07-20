# Ohio Route Additions Automation Memory

Use this file to continue Ohio expansion without re-researching already-added routes or weak water-trail clusters.

## Setup Notes

- Created 2026-05-30 as one of five next state automations.
- Start every run by reading this file, `docs/ohio-route-candidate-queue.md`, `src/data/rivers.ts`, `src/data/river-trip-details.ts`, `docs/midwest-route-automation-memory.md`, `docs/route-candidate-ledger.json`, `docs/route-addition-requirements.md`, and `docs/river-image-source-audit.csv`.
- Existing Ohio routes were already added from the Ohio queue. Reconcile Grand, Great Miami, Little Miami, Vermilion, and Cuyahoga records before researching new candidates.

## State Quirks

- ODNR water-trail PDFs are high-value for official access, hazards, lowhead dams, stream gauges, and public/private access notes.
- Ohio has many designated water trails, scenic rivers, park-district access chains, and AW-supported swiftwater reaches. Public access is often good, but route-specific numeric thresholds are uneven.
- Lowhead dams are common and should be treated as primary route hazards. Do not ship urban or water-trail routes unless dam/portage handling is explicit.
- Many ODNR PDFs direct paddlers to USGS real-time flow but do not publish low/ideal/high bands. Those are `threshold_weak` unless AW, park managers, race rules, or another credible source supplies numeric guidance tied to the selected gauge.
- Lake Erie/coastal and Ohio River big-water routes need wind, commercial traffic, lock/dam, and water-quality logic; defer unless the product explicitly supports those conditions.

## Source Stack

- Live gauge: USGS Water Services.
- Access/route authority: ODNR water-trail/scenic-river maps, county/city park districts, NPS Cuyahoga Valley, MetroParks, MWCD, official water-trail partners.
- Threshold support: AW exact reaches, ODNR/park manager numeric guidance, race cancellation rules only as supplemental high-water evidence, route-specific local guidance when corroborated.

## Early Targets

- 2026-07-19: Added user-requested `little-miami-river-rogers-ballpark-carl-rahe` from South Lebanon Roger's Ballpark Access to Carl A. Rahe Access. Evidence: Warren County Park District documented the exact public event shuttle, Buckeye United Fly Fishers listed the two access river miles/GPS points, USGS `03245500` is the product-supported lower Little Miami gauge, and RiverScout / CanWePaddle provide numeric community lower-corridor context. Keep as minimum-only at `300 cfs`; no route-specific official band was found. A same-river Wikimedia Commons CC BY-SA 4.0 Little Miami near Loveland image is wired for gallery context.
- 2026-07-19: Audited the other Little Miami-family pages because they are high-traffic and higher risk. Keep `little-miami-river-kelley-milford` as whitewater/advanced; AW documents 4.9 miles Class I-II, the 4.6-9.0 ft Milford stage ladder, Boathouse Rapid old low-head-dam remnants, and a 2021 near-drowning at the hydraulic. Mark `east-fork-little-miami-river-williamsburg-tunnel-mill` as `routeType: 'whitewater'`; AW is the threshold source for a Class I-II reach with rapids/strainers, and a May 2026 trip report around 400 cfs supports the app's conservative 350-900 cfs preferred window.
- Continue from `docs/ohio-route-candidate-queue.md`.
- Recheck Cuyahoga Lock 29-to-Station Road only after current NPS closure/hazard context clears and a defensible Jaite/Independence threshold model emerges.
- Review Mahoning, Little Beaver, Tuscarawas, Maumee, Mohican/Kokosing, Mad/Stillwater, and Olentangy as gauge-first clusters.
- Do not add broad water-trail corridors without selecting one clean public endpoint pair and one honest gauge model.

## Validation

- If app code changes, run `npm.cmd run typecheck`, `npm.cmd test` if viable, `npm.cmd run build` if available, and `git diff --check`.
- If only docs/ledger/memory changed, validate the ledger JSON and run `git diff --check`.
