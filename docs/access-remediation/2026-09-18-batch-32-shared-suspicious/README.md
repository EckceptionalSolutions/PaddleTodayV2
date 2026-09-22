# Shared suspicious access-point corrections — batch 32

This batch ranks suspicious endpoint occurrences by shared physical location. It reviews each site once, then applies a supported correction to every route that reuses the same coordinate. The frozen queue and original measurements are in [selection.json](selection.json); decisions and route-level outcomes are in [review.json](review.json); source scope and coordinate limits are in [source-metadata.json](source-metadata.json).

Four repeated sites affected 24 public route endpoints across 24 routes. All four locations were confirmed as public access sites. No dependent route was rejected or held. The old pins were replaced with source-backed access points checked against current aerial imagery and USGS NHD water geometry:

| Site | Occurrences | Previous point | Corrected point | Target audit |
| --- | ---: | --- | --- | --- |
| Angevine Fishing Access Site, MT | 8 | 46.896590, -113.764270 | 46.895872, -113.763927 | 8 clear; about 55 ft to flowline; `ok` |
| Moody’s Landing, MS | 7 | 31.054500, -89.117600 | 31.053755, -89.117915 | 7 clear; on mapped waterbody; `review` |
| Jeanerette T.J. Viator City Park dock, LA | 5 | 29.917697, -91.667200 | 29.918431, -91.666810 | 5 clear; about 93 ft to waterbody; `review` |
| Redband Park boat slide, WA | 4 | 47.660252, -117.425334 | 47.660010, -117.432231 | 4 clear; about 50 ft to waterbody; `review` |

The initial full public-route audit had 153 suspicious endpoints. Angevine and Moody’s corrections removed 15 suspicious occurrences; Jeanerette and Redband removed another 9. The refreshed full audit completed at 129 suspicious endpoints across 2,752 routes and 6,062 endpoints (0 failures, 78 unknown). This run was completed before the separate Centerville batch began. Each of the 24 affected routes had a targeted audit with zero suspicious, failure, or unknown endpoints and zero source-query issues. All 24 corrected endpoints are within 100 feet of mapped water; eight Angevine occurrences meet the `ok` threshold, while the other sixteen remain `review` because the imagery point is not survey-grade or the NHD flowline is generalized. A review result does not mean the public site was rejected.

Route-scoped canonical geometry was regenerated for all 24 affected public routes. The full post-change audit and its Markdown summary are saved as [audit-after.json](audit-after.json) and [audit-after.md](audit-after.md). The public access registry and explore-map overview have now been regenerated and include this batch. The latest cache-only full-scope audit after Batch 40 reports 106 suspicious endpoints across 2,752 routes and 6,062 endpoints; batches 33–40 are included in the [current full audit](../../access-point-quality-audit.md).

## Repeatable steps

1. Read `docs/access-point-remediation-runbook.md` and inspect the working tree before editing. Treat audit distance as a research signal, not proof that a site is invalid.
2. Group suspicious endpoint records by exact shared coordinate and physical site; keep all dependent route IDs in the frozen queue.
3. Establish the site’s public identity and intended use from its manager or trail operator. Use aerial imagery and mapped water only to localize the visible carry, dock, ramp, stairs or landing.
4. Correct all repeated occurrences only when the same public access is supported. Record the coordinate role, uncertainty and what the source does not establish. Hold a route when access legality, continuity or intended entry cannot be supported.
5. Target-audit every changed route, regenerate route geometry, then refresh the complete audit, registry and overview. Keep incomplete hydrography or generalized flowline matches visible as review cases.
