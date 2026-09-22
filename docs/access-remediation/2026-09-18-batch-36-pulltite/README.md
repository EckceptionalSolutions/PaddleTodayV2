# Shared suspicious access-point correction — batch 36

This pass reviewed the Pulltite landing shared by three Current River routes. NPS lists Pulltite as an Upper Current River put-in and documents the Pulltite-to-Round-Spring float. The existing coordinate was a campground-area anchor rather than the landing. Aerial imagery shows the County Road EE-356 approach reaching the Current River at 37.335123, -91.477444. The replacement is imagery-derived with about 75 ft uncertainty and is not a surveyed NPS coordinate.

The old point (37.335050, -91.479590) was about 403 ft from mapped water and 485 ft from the matched flowline. The replacement lies on mapped water and is about 66 ft from the NHD flowline. Targeted audits of all three routes returned zero suspicious, failure, unknown, or source-issue results; every corrected endpoint is `ok`. Their canonical geometry assets were regenerated.

The affected routes are `current-river-cedar-grove-pulltite`, `current-river-akers-ferry-pulltite`, and `current-river-pulltite-round-spring`. This correction is included in the post-Batch-39 full audit below.

## Full refresh after Batch 39

The latest full-scope access audit generated 2026-09-18T16:38:12.920Z (cache-only) covers 2,752 public routes and 6,062 endpoint occurrences: 106 suspicious, 0 failures, 78 unknown, and 271 source issues. It groups 120 locations for follow-up. Batches 33–40 are included. See the [current full audit](../../access-point-quality-audit.md). The access registry has 4,042 entries. The regenerated overview covers 2,739 routes; canonical geometry validation passed for 2,739 of 2,752 routes.

## Repeatable steps

1. Group endpoint occurrences by shared coordinates and list every dependent route.
2. Confirm the landing is a public NPS river access and use the NPS GPS point only as an access-area anchor when it represents the campground.
3. Follow the visible public approach in current aerial imagery to the river entry.
4. Apply one shared imagery-derived point to every route, with an explicit uncertainty and no claim of survey precision.
5. Target-audit each route, regenerate its route geometry, and refresh the full audit after the shared-location pass.
