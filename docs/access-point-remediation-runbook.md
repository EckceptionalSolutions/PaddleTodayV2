# Access point remediation: repeatable operator instructions

This is a bounded research-and-edit procedure for a model that needs explicit steps. The worked example is [the first ten-site batch](access-remediation/2026-09-17-batch-01/README.md), reviewed September 17, 2026. Read its `review.json` before starting another batch. Review **physical sites**, not ten route rows: one corrected site can affect many routes.

## 1. Freeze the work and preserve existing changes

1. Read repository instructions. Run `git status --short`. Do not reset unrelated changes. This workspace can have widespread line-ending changes; use `git diff --ignore-space-at-eol` to inspect substantive edits.
   If shared packages disappear or unrelated deletions appear during the run, preserve your evidence, report the validation blocker, and do not restore or rewrite those files as part of the access batch without understanding the concurrent change.
2. Run `npm run routes:audit:access-quality -- --cache-only`. Read both `sourceIssues` and `accessReviewQueue` in `docs/access-point-quality-audit.json`. Treat this as a cache check, not a refresh: if water-distance results are `unknown`, endpoint counts are incomplete, or source issues say required hydrography is missing, do not treat an empty or short queue as evidence that the audit is complete. Run the network-backed audit to a separate path and wait for successful completion:

   ```powershell
   node node_modules/tsx/dist/cli.mjs scripts/audit-route-coordinate-river-distance.ts --output=docs/access-point-quality-audit-refreshed.json --concurrency=8
   ```

   Confirm the process exits successfully, its `routeCount` matches the current public-route input, and its `endpointCount`, `waterProximity`, and `sourceIssues` show whether hydrography actually loaded. Review that complete output before promoting it to the canonical audit file; never overwrite a useful prior report with a cache-only or interrupted run.
3. Select ten distinct sites affecting currently public routes, prioritizing larger water offsets and more affected routes. Public means returned by `listRivers()`; `publicRivers` alone includes coordinate-withheld routes.
4. Save a dated `selection.json` with original coordinates, names, all occurrences, and the audit distances. Freeze this list; do not replace hard cases with easy ones halfway through.
5. Snapshot relevant prior registry/control evidence and hash/back up every file you will edit. Keep bulky downloads and backups in `node_modules/.cache`; preserve the essential evidence and source metadata in the dated documentation folder.

## 2. Research each site in this order

1. **Identity:** find the named facility on a managing agency, municipality, land trust or water-trail operator page. Record the waterbody, bank, address and explicit access description. A search result or directory is a lead, not sufficient proof.
2. **Current access:** check closures, relocations and access restrictions. An old paddling guide cannot override a current operator closure. Do not infer that an entire former parcel is private solely because one operator closed.
3. **Exact water entry:** find the ramp, dock, stairs or carry trail end. Separate it from the parking lot, street address, property centroid and map camera center. If using Google Maps, do not copy `@latitude,longitude` viewport coordinates as the selected feature.
4. **Map evidence:** prefer an official launch GIS feature. Follow the official page to its map/app, inspect its data source, and query the named feature. Save feature ID, attributes, geometry, query URL and retrieval date. Confirm latitude/longitude order: ArcGIS `x` is longitude, `y` is latitude.
5. **Imagery:** corroborate the feature against the correct bank, access path and nearby structures. If deriving coordinates from an exported map, retain the image, its projected extent and the selected pixel. Use the map projection to convert the pixel; never estimate coordinates from a screenshot with no scale or georeferencing. Keep an honest uncertainty estimate. Decimal digits do not imply survey accuracy.
6. **Route fit:** establish which side of every nearby dam the launch occupies, and whether its put-in/take-out role makes sense. Verify legal portage exits and re-entry points separately. Two public launches do not prove a public route between them.
7. Stop once the evidence supports a decision. If exact entry or legal route continuity remains unresolved after checking the operator, its maps and usable imagery, record what is missing and withhold. Do not invent a coordinate to finish the batch. Do not contact anyone unless the user authorizes messages.

### Things that are not evidence of a correct launch

- A point close to any water, a river centerline, or an automatic nearest-water snap.
- A public park address, business geocode, parking feature, road crossing, or general state-park map pin.
- An interior route-shape waypoint that is not a public launch, landing, or access site. Mark that point with `accessPointRole: "navigation-waypoint"` so the quality audit does not treat it as an access candidate; existing intermediate access points remain included by default.
- A coordinate in a document without checking what it describes. The RI DEM spill-response point was **not** its boat-ramp coordinate.
- A historical guide establishing present permission. Phillips Wharf relocated after the Tilghman guide was published.
- A generic instruction to “portage dams.” The exact carry must be supported before a route depending on it is cleared.
- Increasing a route distance simply to make a geometry validation pass.

## 3. Make two decisions, not one

| Site decision | When to use it | Source-data action |
| --- | --- | --- |
| Keep | Existing coordinate, identity and public entry are supported | Retain coordinate; record evidence |
| Fix | A defensible replacement for the same intended access is established | Update all copies, record method and uncertainty |
| Reject: invalid | Evidence contradicts the stored identity or access premise | Retain source record; withhold dependent routes |
| Reject: unverified | Research did not establish a correct entry | Retain source record; withhold dependent routes; state what would reopen it |

Then decide **publication separately**. A coordinate fix can still require a hold because another endpoint, dam crossing or legal carry remains unresolved. Central Falls is the worked example. “Unverified” means insufficient evidence, not that the launch does not exist.

For an unresolved terminal, add every dependent route to `src/data/route-access-review-holds.ts`. Preserve earlier hold reasons; combine reasons if a route has two rejected sites. For an optional intermediate access, remove it only when the route remains independently valid. Never erase a route merely to clear the queue.

After a rejected coordinate is fixed and all dependent public route geometries pass review, remove its manual holds. If a stale `docs/route-coordinate-suggestions.json` snapshot still withholds those route IDs, record the human-reviewed release and its batch-document link in `src/data/route-coordinate-review-releases.ts`; the withholding generator applies these explicit releases while manual holds continue to take precedence. Do not edit the old suggestion snapshot just to make the catalog regenerate.

## 4. Edit the actual source of truth

1. Use `rg` to find the old name and coordinate in `src/data/routes`, `src/data/trip-details`, official controls and generated assets.
2. Inspect route factories and `riverTripDetails` overrides. Shared constants can feed terminals, route-center coordinates and `accessPoints`; changing a literal in one generated report does not fix them.
3. The existing correction CLI recognizes double-quoted literal records and is not a general TypeScript editor. These three fixes required source edits because the routes use shared constants or single-quoted factory calls. Confirm the intended number of replacements before writing.
4. Update provenance for the changed endpoint, without claiming that every other endpoint in the file was reviewed. Correct contradictory route text. Retain holds for facts still unresolved.
5. Do not turn an imagery-derived coordinate into an “official surveyed coordinate.” Preserve official access identity and coordinate derivation as separate facts.

## 5. Validate and regenerate in this order

Run commands from the repository root. Replace example route IDs and output directory deliberately.

```powershell
npm run routes:withholding:generate
npm run typecheck:routes
npm run routes:audit
npx vitest run src/lib/access-water-quality.test.ts src/lib/access-registry-status.test.ts src/lib/access-name-match.test.ts
npx tsx scripts/audit-route-coordinate-river-distance.ts --route=catawba-river-landsford-sc9 --output=docs/access-remediation/2026-09-17-batch-01/sc9-after.json
```

Inspect the corrected endpoint's `waterProximity`, distance, named waterbody and `sourceIssues`. In the access review queue, `documented-access-anchor-offset` means a source-backed public access-area coordinate (often parking or a carry trailhead) is separated from mapped water; keep it reviewable, but do not describe it as an unexplained pin or auto-snap it to water. `mapped-water-offset` means no access-anchor role explains the separation. A successful command exit alone is not approval. Missing/truncated hydrography means unknown evidence. Water proximity is a secondary check, not proof of access or a safe dam crossing.

For every changed, still-public route, regenerate its geometry, then assemble the catalog assets:

```powershell
npx tsx scripts/generate-canonical-river-geometries.ts --route-id catawba-river-landsford-sc9
# Repeat the preceding command for EVERY changed, still-public route first.
npm run routes:geometries:generate -- --reuse-existing
npm run routes:geometries:audit
npm run routes:overview:generate
```

The route-specific command returns after writing its individual geometry; it does **not** update the catalog manifest or state bundles. Do not use `--reuse-existing` until all changed public route assets have been freshly regenerated and checked. At that point it assembles those updated assets with the unchanged assets and removes withheld routes. If any changed asset is stale, regenerate it first or perform full generation without reuse. Do not parallelize assembly/manifest writers. Withheld routes need no new public geometry; ensure they are absent from the served catalog, manifest, state bundles and route assets.

Refresh the **full network-backed** quality report, then the registry using that full report. Use a separate output path and promote the report only after checking completion and data coverage as described in Step 2:

```powershell
node node_modules/tsx/dist/cli.mjs scripts/audit-route-coordinate-river-distance.ts --output=docs/access-point-quality-audit-refreshed.json --concurrency=8
# After the process succeeds and the report passes the completeness checks, promote it to docs/access-point-quality-audit.json.
npm run routes:access-registry:generate -- --audit=docs/access-point-quality-audit.json
```

The registry's `--audit` flag avoids overwriting the legacy correction-workflow report. Never pass a one-route audit as the registry's full evidence source. Do not run `routes:audit:coordinates:workflow` during a manual batch: it includes automatic corrections outside the reviewed batch. Legacy suggestion/review artifacts are dated snapshots, not authorization to restore an old coordinate.

Finally, check the effective enriched inventory and `listRivers()` rather than source text alone. Verify:

- Every original occurrence exists and has the selected old-or-new coordinate.
- Terminals, duplicate access entries and route-center coordinates agree where applicable.
- No corrected route retains the old coordinate through a trip-detail override.
- Every rejected site's dependent routes are withheld, including shared routes.
- Inventory records remain available for later review; unrelated holds remain intact.
- Changed public geometry follows the intended reach, has the correct endpoints and passes the geometry audit.

The first batch includes a runnable `verify.ts` demonstrating these assertions. Adapt it for the next batch; do not merely change the expected counts until a failing check passes.

## 6. Deliver an auditable result

For each site save: original coordinate, decision, replacement if any, uncertainty/method, source URLs and findings, affected route IDs/roles, publication action, rejection reason and reopening condition. Save validation results and retrieval metadata. Keep summaries of source content brief; link the original source rather than copying whole articles.

Report physical sites fixed/rejected and unique routes affected separately. Distinguish local changes from deployment. Name unresolved source or validation limitations. A smaller honest set of fixes is preferable to an apparently complete set of guessed launches.
