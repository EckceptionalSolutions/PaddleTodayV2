# Shared suspicious access-point correction — batch 33

This pass reviewed the Centerville Schwan Park dock once and propagated the supported correction to all three routes that share it. TECHE Project identifies the official National Paddle Trail dock at Schwan Park, 514 Parish Road 131. Current aerial imagery shows the park-side landing at the Bayou Teche shoreline. The replacement coordinate is an imagery estimate with about 50 ft uncertainty, not a surveyed TECHE coordinate.

The previous coordinate (29.7599302, -91.4191962) was about 253 ft from mapped water and 408 ft from the matched NHD flowline. The replacement (29.760737, -91.419060) lies on mapped water; the NHD named-flowline distance is about 112 ft. Targeted audits of all three routes returned zero suspicious, failure, unknown, or source-issue results. The corrected dock endpoints remain `review` because the NHD flowline is generalized or incomplete at the landing; this does not undermine TECHE’s identification of the public dock.

The affected routes are `bayou-teche-franklin-centerville`, `bayou-teche-charenton-centerville`, and `bayou-teche-baldwin-centerville`. Their canonical geometry assets were regenerated. This correction is included in the post-Batch-39 full audit below.

## Full refresh after batch 37

The latest full-scope access audit generated 2026-09-18T16:38:12.920Z (cache-only) covers 2,752 public routes and 6,062 endpoint occurrences: 106 suspicious, 0 failures, 78 unknown, and 271 source issues. It groups 120 locations for follow-up. Batches 33–40 are included. See the [current full audit](../../access-point-quality-audit.md). The access registry has 4,042 entries. The regenerated overview covers 2,739 routes; canonical geometry validation passed for 2,739 of 2,752 routes.

## Repeatable steps

1. Group the suspicious occurrences by coordinate and confirm which routes reuse the point.
2. Check the named site and public-access identity with the trail operator or land manager.
3. Compare the access parcel, route approach, aerial imagery, and mapped water to locate the actual landing.
4. Move the shared coordinate only when the evidence supports the same public entry for every route. Record uncertainty and avoid claiming the point is surveyed.
5. Target-audit each affected route and regenerate its canonical geometry. Refresh the full audit and generated registry after the shared-location pass.
