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

- Continue from `docs/ohio-route-candidate-queue.md`.
- Recheck Cuyahoga Lock 29-to-Station Road only after current NPS closure/hazard context clears and a defensible Jaite/Independence threshold model emerges.
- Review Mahoning, Little Beaver, Tuscarawas, Maumee, Mohican/Kokosing, Mad/Stillwater, and Olentangy as gauge-first clusters.
- Do not add broad water-trail corridors without selecting one clean public endpoint pair and one honest gauge model.

## Validation

- If app code changes, run `npm.cmd run typecheck`, `npm.cmd test` if viable, `npm.cmd run build` if available, and `git diff --check`.
- If only docs/ledger/memory changed, validate the ledger JSON and run `git diff --check`.
