# Ten access sites reviewed — September 17, 2026

**Three sites corrected; seven rejected for publication.** These ten shared sites affect 39 unique routes. All 39 source routes were retained. Seven affected routes remain public; 32 are withheld, including routes whose Central Falls pin was fixed but whose dam/portage configuration still needs review. No deployment was performed.

The batch was selected from publicly visible water-offset failures, prioritizing the number of affected routes. `selection.json` freezes the ten sites and their original occurrences. `prior-evidence.json` preserves the starting audit, registry and control evidence. “Rejected: unverified” means that this review could not establish a defensible replacement; it does not mean the physical launch is nonexistent or permanently inaccessible.

| # | Site | Result | Reason / follow-up |
| --- | --- | --- | --- |
| 1 | Poche’s Bridge, LA | Reject: unverified | Official dock is behind Poche’s Market, several miles from the stored point. Available imagery did not resolve the installed dock. Need a georeferenced dock position. |
| 2 | Central Falls Landing, RI | Fix; dependent routes held | Correct ramp is upstream of Valley Falls Dam. Verify upstream carries, duplicated Pratt above/below-dam coordinates, and the proposed Chocolateville portage. |
| 3 | Riverside State Park, WA | Reject: invalid identity | Stored point is the general park location. Substituting the named launch below Nine Mile Dam would change the intended route chain. |
| 4 | Baldwin / Charenton Road Park, LA | Fix | Operator identifies the park dock; historical map and imagery locate the shore ramp at the correct park. |
| 5 | Quaker Village Road, VT | Reject: unverified | Cited map begins below Weybridge Dam; stored location and itinerary do not establish the correct launch or dam side. |
| 6 | SC 9 Catawba landing, SC | Fix | SCDNR’s active/open concrete-ramp feature BR506 supplies the corrected location. |
| 7 | Floodplain Preserve, Richmond, VT | Reject: unverified | Town description, preserve names and seasonal parking do not resolve one exact legal water entry. |
| 8 | Vergennes “Main Street town dock,” VT | Reject: conflated identity | Above-falls Main Street take-out and below-falls MacDonough municipal docks must be separated before assigning route endpoints. |
| 9 | Mississippi River Overlook Park, MN | Reject: unverified | Existing point is a street-address geocode with 2,500-foot uncertainty. Need the public carry trail’s river end. |
| 10 | Phillips Wharf, Tilghman, MD | Reject: closed operator location | Operator confirms Tilghman closure and Easton relocation. Historical guide does not establish current permission at the former campus. |

## Coordinate changes

| Site | Old latitude, longitude | New latitude, longitude | Method / estimated uncertainty |
| --- | --- | --- | --- |
| Central Falls | 41.8873726, -71.3876472 | 41.898833, -71.390615 | Official ramp identity/photos + imagery, about 50 ft |
| Baldwin | 29.8420027, -91.5422904 | 29.833138, -91.542615 | Official park identity + mapped shore ramp, about 50 ft |
| SC 9 | 34.71042, -80.86222 | 34.709133, -80.866015 | Official SCDNR BR506 ramp GIS feature, conservative 75 ft estimate |

These uncertainty values are reviewer estimates, not statistical confidence bounds or agency accuracy claims. Six decimal places preserve the selected location; they do not indicate survey precision. Floating docks and water levels can change the exact boarding edge.

The edits update shared factory inputs and all seven Central Falls literals. The effective data check verifies 42 terminal occurrences and 42 corresponding access-point copies, including retained rejected coordinates. Four Baldwin routes and three SC 9 routes remain public; all seven Central Falls routes are held. Holds are reversible and retain the source records for later research.

## Evidence and reproducibility

- [review.json](review.json): complete ten-site ledger, original/new coordinates, source findings, publication decisions, affected routes and reopening requirements.
- [source-metadata.json](source-metadata.json): retrieved-document metadata and hashes of the preserved coordinate evidence. Bulky downloaded PDFs remain in the local cache; original links are retained.
- [central-aerial.png](central-aerial.png) and [map extent](central-aerial.json): selected ramp-water-end pixel `(570,596)` in a 1200 × 1200 Esri World Imagery export. RI DEM ramp photographs and Watershed Council guidance corroborate identity.
- [baldwin-aerial.png](baldwin-aerial.png) and [map extent](baldwin-aerial.json): selected shore-ramp pixel `(613,610)`. TECHE’s current dock listing and historical park map corroborate identity.
- [sc9-official.json](sc9-official.json): exact SCDNR query response, including distinct boat-ramp BR506 and paddle-launch PL022 records. BR506 matches this boat-landing identity; they are not interchangeable anonymous points.
- [validation.json](validation.json), [geometry-validation.json](geometry-validation.json), and the three `*-after.json` reports record the checks.

Imagery exports were retrieved on the review date; their capture date was not established. Pixel-to-coordinate conversion uses each saved EPSG:3857 extent: `x = xmin + pixelX / width * (xmax - xmin)` and `y = ymax - pixelY / height * (ymax - ymin)`, then inverse Web Mercator. Do not use the center of an exported image as the launch unless the selected entry actually occupies that pixel.

## Lessons for the next reviewer

Use the [step-by-step runbook](../../access-point-remediation-runbook.md). In particular:

1. Current operator information overrides an obsolete facility guide.
2. A named public park is not an exact launch coordinate.
3. Dam side and legal portage continuity are separate from water proximity. A corrected pin can still need a route hold.
4. Shared constants and factory-generated access copies must be checked through the enriched runtime inventory.
5. Route-specific geometry generation only writes an individual asset. After regenerating every changed public route, assemble the full manifest and state bundles, then audit them.
6. The audit covers withheld inventory too. Rejected points remaining in its research queue are expected; their publication holds are the remediation.

Run the batch consistency check from the repository root:

```powershell
npx tsx docs/access-remediation/2026-09-17-batch-01/verify.ts
```

The full quality audit is a cache-based catalog snapshot, not a claim that every route was researched. Its source issues remain visible. The focused audits of the three replacements have no source issues and each replacement is within 100 feet of mapped water; that secondary check does not establish launch permission by itself.

## Validation completed

These results were obtained before a later workspace change. During the final compiler check, shared package files including `packages/api-contract/package.json` and `src/index.ts` were missing and appeared as deletions in `git status`. The final rerun therefore failed on unresolved workspace imports. Those unrelated deletions were not restored by this task. Re-run the documented checks after the shared packages are available again; the earlier successful results below are preserved, not presented as a clean check of the later workspace state.

- Route TypeScript check passed before the missing-package issue; 30 focused access-audit/registry/name-matching tests passed.
- Full route-data audit passed for 2,998 inventory routes. Existing planning issues remain tracked separately.
- Batch consistency check passed: 42 terminals, 42 access copies, 39 retained inventory routes, 32 withheld and seven public.
- All seven changed public route geometries were regenerated. Full geometry audit passed: 2,854 of 2,867 public routes have matched assets across 48 states; 13 unmatched routes remain reported.
- Public map overview regenerated; generated registry refreshed from the full quality audit. Whitespace checks passed for the edited source files.
- Corrected-site mapped-water distances in the focused reports: Central Falls 0 ft, Baldwin 0 ft, SC 9 about 49 ft. Polygon containment accounts for the zeroes; these are not measurements of dock boarding height or distance.

The full cache-only snapshot reports 365 source issues and 116 unknown occurrences. Some changed-route query extents do not have cached evidence even though the same physical site has a complete focused audit. Do not interpret missing cache coverage as a failed correction, or the focused checks as validation of every other endpoint on those routes. No catalog-wide publication clearance is claimed.
