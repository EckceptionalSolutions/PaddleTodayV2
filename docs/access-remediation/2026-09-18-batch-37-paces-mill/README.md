# Shared suspicious access-point correction — batch 37

This pass reviewed the Paces Mill take-out shared by seven Chattahoochee River routes. The prior point (33.870198, -84.453659) was a park/facility-area anchor about 394 ft from mapped water. NPS identifies Paces Mill as a canoe/kayak/small-boat launch and the final take-out in the recreation area. Current aerial imagery shows the public launch approach meeting the river at 33.870403, -84.452310; this selected water-entry point is imagery-derived with about 50 ft uncertainty and is not an NPS survey coordinate.

All seven corrected endpoints are on mapped water (0 ft waterbody distance) and within 100 ft of mapped water. Their nearest named NHD flowline is about 157 ft away, so the audit retains `review` status for generalized hydrography. Each route-scoped audit returned zero suspicious, failure, unknown, or source-issue results, and all seven route geometries were regenerated.

The affected routes are `chattahoochee-river-island-ford-paces-mill`, `chattahoochee-river-johnson-ferry-paces-mill`, `chattahoochee-river-johnson-ferry-south-paces-mill`, `chattahoochee-river-jones-bridge-paces-mill`, `chattahoochee-river-morgan-falls-park-paces-mill`, `chattahoochee-river-overlook-park-paces-mill`, and `chattahoochee-river-whitewater-creek-paces-mill`.

## Full refresh after Batch 39

The latest full-scope access audit generated 2026-09-18T16:38:12.920Z (cache-only) covers 2,752 public routes and 6,062 endpoint occurrences: 106 suspicious, 0 failures, 78 unknown, and 271 source issues. It groups 120 locations for follow-up. Batches 33–40 are included. See the [current full audit](../../access-point-quality-audit.md). The access registry has 4,042 entries. The regenerated overview covers 2,739 routes; canonical geometry validation passed for 2,739 of 2,752 routes.

## Repeatable steps

1. Group occurrences at the exact shared coordinate and enumerate every affected route.
2. Verify the public take-out identity with NPS; NPS's access page documents the canoe/kayak/small-boat launch and final take-out.
3. Follow the public approach in current aerial imagery to the river edge, recording coordinate uncertainty and avoiding any claim of survey precision.
4. Update the shared access chain, every route-specific endpoint, and its audit control to the same water-entry point.
5. Regenerate route geometry, target-audit every affected route, and include the batch in the next full audit, registry, and overview refresh.

The canonical full audit now includes this correction.
