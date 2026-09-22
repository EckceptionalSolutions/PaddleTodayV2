# Shared suspicious access-point review — batch 39

This batch reviewed two repeated locations from the refreshed access audit, each used by three public route endpoints. The selection and old audit findings are frozen in [selection.json](selection.json); source fields and direct query URLs are recorded in [source-metadata.json](source-metadata.json).

At Leatherwood Branch Park Access, the KDFWR coordinate already matched the shared route points. KDFWR describes the site as carry-down only, with no constructed ramp, and says users walk their equipment a short distance from the parking area to the creek. I retained the coordinate and classified it as an authoritative access-area anchor. The route copy now reflects the carry-down access rather than calling it a ramp. The audit keeps all three starts in `review` at 331 ft from the generalized matched flowline; mapped water is within 300 ft and source-control matching is exact.

At Davis Park, the old public-route point came from an older convenience directory. The UNH GRANIT New Hampshire public-water layer identifies Town of Conway's Davis Park on the Saco River and publishes a different site point. Conway separately confirms the park has a canoe launch. I moved all three public endpoint records to the GIS point, renamed them as access-area anchors, and kept the precise launch toe unclaimed because the inventory records a Beach/Picnic and shorebank site rather than a surveyed canoe-launch coordinate. The three corrected endpoints now fall within 300 ft of mapped water and are classified `review` as access anchors.

The separate `saco-river-cooks-crossing-davis-park` route remains withheld because its Cooks Crossing endpoint is unverified; it was not included in the public-route corrections. No access point was rejected in this batch because both shared sites have credible public-access evidence.

## Process

1. Rank the current full audit by shared endpoint occurrence count, then inspect all routes using a selected coordinate.
2. Query the managing agency or maintained state access inventory for the named site, public-use details, and point geometry.
3. Distinguish a published site/parking point from a water-entry edge. Retain a supported access anchor when the source does not locate a launch toe.
4. Update every public route that shares the site. Keep separately withheld route endpoints out of the public correction batch unless the held route itself is under review.
5. Add a coordinate-role control and a route-specific mapped-water tolerance only when the source explains the observed offset. Leave exact water entry unresolved when no source or imagery supports it.
6. Run targeted audits, regenerate changed route geometry, then refresh aggregate geometry, full audit, registry, and overview.

## Validation

Targeted audits cover all six public routes. They report 0 suspicious, 0 failure, 0 unknown, and 0 source issues among the six target site occurrences; the two corrected site groups are `review` access anchors. Three Davis Park route geometry files were regenerated. The cache-only full audit generated 2026-09-18T16:38:12.920Z covers 2,752 public routes and 6,062 endpoints: 106 suspicious, 0 failures, 78 unknown, 271 source issues, and 120 review locations. It used the existing USGS NHD evidence cache and explicitly reports `evidenceMode: cache-only`. The canonical geometry audit passed for 2,739 of 2,752 routes; the registry has 4,042 entries and the overview has 31,010 points. See [review.json](review.json) for the refreshed outputs and [the current full audit](../../access-point-quality-audit.md).
