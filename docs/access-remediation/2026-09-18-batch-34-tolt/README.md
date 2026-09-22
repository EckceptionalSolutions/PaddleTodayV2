# Shared suspicious access-point correction — batch 34

This pass reviewed the Tolt-MacDonald Park endpoint reused by three Snoqualmie River routes. King County identifies Tolt-MacDonald as a public park with a boat launch, and its park map marks a boat-launch facility. The linked “Snoqualmie River Boat Launch” location and current aerial imagery place the launch on the Snoqualmie River bank at 47.6385904, -121.9263098. The coordinate is imagery/map-feature-derived, carries about 50 ft uncertainty, and is not a surveyed King County coordinate.

The previous point (47.644110, -121.924217) was about 282 ft from mapped water and 393 ft from the matched flowline, at the park interior. The replacement lies at the named water-entry feature; targeted audits of all three affected routes returned zero suspicious, failure, unknown, or source-issue results. The corrected launch endpoints remain `review` at about 120 ft from the generalized NHD flowline, while each is within 100 ft of mapped water or has a matching named water-entry control.

The affected routes are `snoqualmie-river-fall-city-tolt`, `snoqualmie-river-plum-tolt`, and `snoqualmie-river-neal-tolt`. Their route-scoped canonical geometry assets were regenerated. This correction is included in the post-Batch-39 full audit below.

## Full refresh after Batch 39

The latest full-scope access audit generated 2026-09-18T16:38:12.920Z (cache-only) covers 2,752 public routes and 6,062 endpoint occurrences: 106 suspicious, 0 failures, 78 unknown, and 271 source issues. It groups 120 locations for follow-up. Batches 33–40 are included. See the [current full audit](../../access-point-quality-audit.md). The access registry has 4,042 entries. The regenerated overview covers 2,739 routes; canonical geometry validation passed for 2,739 of 2,752 routes.

## Repeatable steps

1. Group suspicious occurrences by shared physical access and preserve every dependent route ID.
2. Confirm the site is public using the land manager’s page and park map.
3. Use the named ramp feature and aerial imagery to locate the actual river entry inside the public park.
4. Apply one shared point to every route using that same boat launch, while recording that its coordinate is not surveyed.
5. Target-audit each changed route and regenerate its canonical geometry before the next full audit and registry refresh.
