# Batch 30: ten access sites

Reviewed September 18, 2026. The frozen selection contains ten physical sites and twenty route records. Farm Field's access-area anchor and Mirabeau's water-entry coordinate were corrected, one invalid optional point was removed, and seven sites remain unresolved at the exact water-entry level. Thirteen routes are held; seven are public. No deployment was performed.

## Decisions

| # | Site | Decision | Route result |
| --- | --- | --- | --- |
| 1 | York Road, Gunpowder River (MD) | Reject invalid identity. York is a river-difficulty boundary; parking guidance for fishing/wading did not establish a paddle launch at this coordinate. | Removed optional York access point; Gunpowder route stays public. |
| 2 | Jamestown Falls (NY) | Keep DEC parking/carry anchor as evidence; reject it as a verified terminal water entry. | Hold Dead Creek–Jamestown take-out route; keep the optional waypoint on Piercefield–Parmenter. |
| 3 | Highway K, Plover River (WI) | County confirms canoe access, but the landing and lawful staging/carry are not georeferenced. | Hold Highway K–Jordan Park. |
| 4 | Fish Creek WMA / Pope Mills (NY) | DEC coordinate is for an access/carry area; its launch list describes a 0.8-mile hand carry, not the entry edge. | Hold Route 184–Pope Mills. |
| 5 | Sheep Crossing, Verde River (AZ) | Public access and difficult carry are documented; exact landing edge and approach remain unresolved. | Hold all seven selected routes using Sheep Crossing terminally. |
| 6 | Farm Field Park (SD) | Replace general park coordinate with mapped Boat ramp access-area anchor `43.5013198,-96.7504983`; estimated uncertainty 100 ft. | Keep both Sioux Falls routes public. This is not a surveyed water edge. |
| 7 | Bluffton Fir Stand (IA) | DNR confirms canoe-only parking; endpoint remains an access-area anchor, not a mapped landing. | Hold Kendallville–Bluffton; keep Cattle Creek–Malanaphy with Bluffton as optional waypoint. |
| 8 | McKay’s Bend (ID) | BLM confirms public river access and boat-launch operation; exact launch toe not published. | Hold McKay’s Bend–Pink House. |
| 9 | Mirabeau Park (WA) | City park plan and Conservation District confirm a public gravel path to the river for small craft; current aerial imagery georeferences its water-side toe at `47.68186,-117.22255` (estimated uncertainty 40 ft). | Release both Mirabeau take-out routes with the corrected landing and refreshed river traces. |
| 10 | Heath Canyon / La Linda (TX) | NPS/TPWD confirm take-out identity and current permit path; stored point is an access-area anchor, not an exact landing. | Hold Rio Grande Village–Heath Canyon. |

The detailed occurrence ledger, source findings, coordinates, holds and reopening criteria are in [review.json](review.json). Retrieval context and the GIS/imagery method are in [source-metadata.json](source-metadata.json). The frozen selection is [selection.json](selection.json); do not substitute a different group of ten during verification.

## Why a mapped-water distance is not enough

Hydrography distance only says that a point is away from mapped water. It does not identify a public launch, a legal carry, a safe landing, or which side of a dam/falls the route uses. A trailhead/site coordinate remains an access-area anchor unless a public carry and its water-side end can be located. Mirabeau is the evidence-backed imagery exception: the City locates the gravel path to the river, the Conservation District confirms small-craft access, and the current aerial shows the path toe. The coordinate remains reviewer-estimated with 40-foot uncertainty. The Farm Field point remains an access-area anchor with 100-foot uncertainty.

## Reproduce the edit and checks

Run from the repository root. The workspace has unrelated modified files and line-ending churn; preserve them. Check the batch's scoped source changes against its pre-edit snapshot under `node_modules/.cache/access-point-batch-30/pre-edit/`, and do not reset files to Git HEAD.

1. Regenerate route withholding from manual review holds:

   ```powershell
   node node_modules/tsx/dist/cli.mjs scripts/generate-withheld-route-slugs.ts
   ```

2. Run source/data checks:

   ```powershell
   node node_modules/tsx/dist/cli.mjs docs/access-remediation/2026-09-17-batch-30/verify.ts
   node node_modules/tsx/dist/cli.mjs scripts/audit-route-data.ts
   ```

   Also run `npm run typecheck:routes` (or direct `node node_modules/typescript/bin/tsc --noEmit -p tsconfig.route-data.json` if the npm shim fails). Report pre-existing workspace/dependency errors accurately.

3. Regenerate canonical geometry separately for each changed route that remains public: `gunpowder-falls-masemore-monkton`, `big-sioux-river-farm-field-rotary`, `skunk-creek-legacy-park-farm-field`, `spokane-river-barker-mirabeau`, and `spokane-river-harvard-mirabeau`.

   ```powershell
   node node_modules/tsx/dist/cli.mjs scripts/generate-canonical-river-geometries.ts --route-id gunpowder-falls-masemore-monkton
   node node_modules/tsx/dist/cli.mjs scripts/generate-canonical-river-geometries.ts --route-id big-sioux-river-farm-field-rotary
   node node_modules/tsx/dist/cli.mjs scripts/generate-canonical-river-geometries.ts --route-id skunk-creek-legacy-park-farm-field
   node node_modules/tsx/dist/cli.mjs scripts/generate-canonical-river-geometries.ts --route-id spokane-river-barker-mirabeau
   node node_modules/tsx/dist/cli.mjs scripts/generate-canonical-river-geometries.ts --route-id spokane-river-harvard-mirabeau
   node node_modules/tsx/dist/cli.mjs scripts/generate-canonical-river-geometries.ts --reuse-existing
   node node_modules/tsx/dist/cli.mjs scripts/audit-canonical-river-geometries.ts
   node node_modules/tsx/dist/cli.mjs scripts/generate-explore-map-overview.ts
   ```

   Do not assemble with `--reuse-existing` until the route-specific writes finish. It assembles assets; it does not repair a stale route trace. Held routes must be absent from public geometry outputs.

4. Refresh the full, network-backed access quality report. Wait for all routes to finish, confirm route and endpoint coverage, hydrography coverage, and source issues, then refresh the registry from that complete report:

   ```powershell
   node node_modules/tsx/dist/cli.mjs scripts/audit-route-coordinate-river-distance.ts --output=docs/access-point-quality-audit.json --concurrency=8
   node node_modules/tsx/dist/cli.mjs scripts/generate-route-access-registry.ts --audit=docs/access-point-quality-audit.json
   ```

   Do not pass a one-route audit as registry input.

5. Run route-data typecheck, focused access tests, and the batch verifier again. Save command results in `validation.json`. A successful audit exit code does not override unresolved landing evidence. `listAllRiversForAudit()` retains all 20 affected inventory routes; `listRivers()` shows seven selected routes and hides the thirteen manually held routes.

## Validation results for this run

- Batch verifier passed: 10 sites, 20 route occurrences, 20 retained inventory records, 7 public routes, 13 held routes, two Farm Field trip-detail endpoint copies, two refreshed authoritative-evidence matches, and the generated registry coordinate agree. All five changed public route geometries were regenerated. Mirabeau's two traces end within 371 feet of the imagery-georeferenced shoreline point. The full water-distance audit places that point 224 feet from mapped water (`review` / `within-300ft`); the City plan, Conservation District access source, and aerial imagery supply the landing evidence.
- The refreshed access audit covers 2,755 public routes and 6,068 access occurrences. The two Farm Field endpoints are each 41.3 ft from mapped water with complete hydrography coverage. It reports 276 truncated NHD queries, 74 unknown proximity results, 78 unknown severity outcomes, and no failure-severity endpoints. The review and unknown results remain visible in the report for separate follow-up.
- Canonical geometry audit passed for 2,742 of 2,755 public routes, with 13 previously unmatched routes still listed. No held route from this batch has a public route-geometry file. The map overview contains 2,742 routes.
- Route-corridor audit passed for 216 definitions and 508 covered routes after the York access edit.
- `npm run typecheck:routes` did not pass: six errors remain in unrelated files (`src/data/routes/new-york.ts`, `src/data/routes/wisconsin.ts`, and `src/data/trip-details/iowa.ts`). The route-data audit reports one unrelated blocking mileage issue on `south-skunk-river-ames-13th-street` (0.074 mi label vs 0.1 mi straight-line) and 137 tracked planning issues.
- Focused Vitest checks could not start because the workspace lacks `@jridgewell/sourcemap-codec`, imported by `magic-string`. No install or repair of unrelated workspace dependencies was made.
- The full report retains its hydrography coverage caveat. Do not interpret unknown results as verified access, or the 13 unmatched geometry routes as route failures. No deployment was performed.

## Next evidence that would reopen a hold

Prefer the current land manager's GIS/map coordinate or a georeferenced map with the carry drawn to the river. If using imagery, save its source, retrieval date, extent, selected water-side pixel, conversion method, and uncertainty in `source-metadata.json`. Separately confirm parking/access permissions and route continuity around falls, dams, portages, private land, or seasonal closures. Update every endpoint and matching access-point copy, regenerate all changed public geometry, then remove a hold only after its independent blocker is cleared.
