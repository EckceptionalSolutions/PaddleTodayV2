# Access point remediation batch 21

Reviewed September 17, 2026 under the [access-point remediation runbook](../../access-point-remediation-runbook.md). The ten-site list in [selection.json](selection.json) is frozen; cached audit ranks are research priority only because the current audit cannot load the missing @paddletoday/geo package.

## Result

Ten physical sites were reviewed across 20 unique, previously unwithheld route IDs. Three site coordinates were corrected: Marco Flats now uses Montana FWP's published FAS point, Cameron Mills' longitude now matches the published degrees/minutes coordinate, and Rochester Park uses EPA's published site-center anchor because the old point was outside the park. These remain access-area coordinates rather than surveyed water-entry points. Ten source-backed access-anchor controls were added.

The eight Blackfoot routes whose Marco Flats endpoint changed have now been regenerated and inspected against Montana FWP's published access-area anchor. Their trace endpoints are within 560 feet of that anchor; five use connected network traces and three use named-flowline fallback traces. Marco Flats–Johnsrud was corrected from 8.0 to 9.3 miles to match the connected NHD trace and adjacent access-chain mileage. Those eight routes are released. The Rochester Park route remains held pending current confirmation that the carry and parking are outside the cleanup closure and a route-geometry review. Eleven other selected routes remain eligible. No routes were deleted and no optional waypoints were removed.

Mirabeau, Chautauqua, Oak Township, Trego, Heath Canyon, Three Forks, and Riverdale remain as access-area anchors with carry, parking, permit, or road caveats. Cameron Mills remains an intermediate public launch-area anchor; its coordinate was corrected from the regional guide's published DMS value and current local event use corroborates the site.

## Decisions

| Rank | Site | Decision |
|---:|---|---|
| 236 | Mirabeau Park small-craft access | keep-access-anchor |
| 237 | Chautauqua Park accessible launch | keep-access-anchor |
| 238 | Oak Township County Park canoe access | keep-access-anchor |
| 239 | Rochester Park | correct-park-anchor-and-hold |
| 240 | Marco Flats FAS | correct-to-current-FWP-anchor-and-release-eight-routes-after-geometry-audit |
| 241 | Cameron Mills CR 110 | correct-coordinate-transcription-and-keep-anchor |
| 242 | Trego Town Park Landing | keep-access-anchor |
| 243 | Heath Canyon / La Linda | keep-permit-limited-access-anchor |
| 244 | Three Forks Recreation Site, Oregon | keep-BLM-access-anchor |
| 246 | Riverdale Lane | keep-address-access-anchor |

## Validation limits

All eight Marco routes now have regenerated USGS NHD geometry and pass the canonical geometry audit; the updated full quality audit covers all 2,755 public routes and 6,068 endpoints. The access registry was regenerated from that report and the current official controls. Rochester Park remains held because its public carry and parking have not been confirmed outside the cleanup closure; the eight Marco routes are released. See [geometry-repair.json](geometry-repair.json) for per-route trace checks, [validation.json](validation.json) for commands and catalog-wide limits, and [review.json](review.json) for the remaining hold condition.
