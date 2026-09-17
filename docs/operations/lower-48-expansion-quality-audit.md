# Lower 48 expansion quality audit

Superseded on 2026-09-16 by the [updated 832-route audit](lower-48-expansion-quality-audit-2026-09-16.md). This earlier report remains as a historical snapshot.

Prepared: 2026-09-13

This audit covers the 17-state expansion queue: Alabama, Arizona, California, Connecticut, Florida, Louisiana, Massachusetts, Mississippi, Montana, Nevada, New Hampshire, New Mexico, Oregon, Rhode Island, South Carolina, Vermont, and Washington.

## Required route fields

The audit checked all 497 routes currently published in these states. Every route has:

- a safety profile and non-empty safety guidance;
- a camping classification and camping guidance;
- put-in and take-out records with water-entry access points;
- gallery image metadata that resolves to a non-placeholder image.

Result: **0 missing required fields** and **0 placeholder gallery mappings**. Gallery reuse is limited to same-river imagery where a route-specific photograph is not available; route cards retain river-specific captions and attribution.

## Consolidation and deduplication review

The overlap audit initially found two exact or near-exact endpoint candidates. Both were reviewed against public access evidence and retained as explicit alternatives rather than silently presenting them as unrelated corridors. The overlap checker now recognizes those declared alternative relationships, so they do not remain duplicate findings:

- Tallapoosa River: Peters Island–Jay Bird Creek remains a shorter island-carry option near Horseshoe Bend–Jay Bird Creek. The route now carries consolidation metadata linking the two access choices.
- Pawcatuck River: Bradford Landing–Main Street remains the state-owned Main Street naming/coordinate variant alongside the canonical Westerly municipal/Main Street route. Both are grouped as alternatives to the same public take-out facility.

Other overlap findings are endpoint-chain combinations on the same river (for example, Black Creek, Salt, Truckee, and Woonasquatucket). They represent distinct launch/take-out choices and are kept where the access pair, safety treatment, and scored conditions add practical value. The final overlap run reports 0 `duplicate_or_reversed` findings; remaining chain, crossing, collinear, and shared-endpoint findings are review signals for route families rather than automatic deletion candidates.

The source review supports these decisions: [Alabama Extension's Harold Banks canoe-trail materials](https://www.aces.edu/blog/topics/tallapoosa/canoe-trail-tallapoosa-river/) identify both Tallapoosa access points, while [Rhode Island DEM's public boat-launching list](https://dem.ri.gov/natural-resources-bureau/fish-wildlife/freshwater-fishing/public-boat-launching-sites) and [ExploreRI](https://exploreri.org/) identify the public Main Street/Westerly facility and its access context.

## Access-coordinate review

The coordinate workflow checked 1,008 endpoints across the 17 states against the National Hydrography Dataset and the access evidence registry. It classified 400 endpoints as on or near the matched flowline, 492 as review-level access/parking anchors, 88 as suspicious for source-map review, and 28 as failures. The failures cluster around documented park, dock, confluence, floodplain, or tributary facilities (including Poche's Bridge, Central Falls, Idlewild, Floodplain Preserve, and Riverside State Park) where a parking or carry coordinate is not the NHD centerline. Those endpoints remain explicitly named in route notes and are retained as field-verification items in `docs/route-coordinate-river-audit.json`; no coordinate was moved to an arbitrary centerline point without authoritative access evidence.

## Validation commands

The following checks are run after the cleanup:

```text
npm run routes:audit
npm run routes:audit:overlap
npm run routes:geometries:audit
npm run gallery:audit
npm run typecheck:routes
npm run build
```
