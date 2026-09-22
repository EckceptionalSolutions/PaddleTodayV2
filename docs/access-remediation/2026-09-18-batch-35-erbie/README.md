# Shared suspicious access-point correction — batch 35

This pass reviewed the Erbie Campground / Buffalo River access shared across the Buffalo River route family. NPS names Erbie as a river access and publishes a GPS point for the campground/access area. That point is not the water-entry coordinate: aerial imagery shows the campground approach reaching the Buffalo River at 36.070784, -93.211779. The replacement is imagery-derived with about 75 ft uncertainty, not a surveyed NPS coordinate.

The previous published campground anchor was 36.070346, -93.211886, about 306 ft from mapped water and 307 ft from the matched flowline in the public audit. The replacement is within 100 ft of mapped water; its 148 ft offset from the named NHD flowline remains `review` because NHD coverage is generalized at the access. Targeted public audits of the three affected routes returned zero suspicious, failure, unknown, or source-issue results. The same shared access is referenced by four withheld route records; those were also targeted with `--include-withheld` so this single shared source is corrected consistently.

The public routes are `buffalo-river-ponca-erbie`, `buffalo-river-erbie-pruitt`, and `buffalo-river-erbie-hasty`. Their canonical geometry assets were regenerated. Some all-inventory route audits still report separate suspicious intermediate access points, including the unresolved Ozark campground landing; those are outside this Erbie correction and remain follow-up items.

## Full refresh after Batch 39

The latest full-scope access audit generated 2026-09-18T16:38:12.920Z (cache-only) covers 2,752 public routes and 6,062 endpoint occurrences: 106 suspicious, 0 failures, 78 unknown, and 271 source issues. It groups 120 locations for follow-up. Batches 33–40 are included. See the [current full audit](../../access-point-quality-audit.md). The access registry has 4,042 entries. The regenerated overview covers 2,739 routes; canonical geometry validation passed for 2,739 of 2,752 routes.

## Repeatable steps

1. Group suspicious route endpoints by the shared access record and capture every dependent route.
2. Use NPS access information to confirm public identity and use the NPS GPS point as an access-area anchor only.
3. Follow the visible campground approach in current aerial imagery to the river edge; record uncertainty and avoid calling the point surveyed.
4. Update the shared trip-detail record and public route-map anchors, then audit all public routes and any withheld routes that reuse it.
5. Regenerate route geometry and refresh the full audit, registry, and overview after the shared-location pass.
