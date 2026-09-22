# B82 — Spring Bar Campground and Ramp (Idaho)

Date: 2026-09-19

## Decision

Retain `45.426837,-116.152075` and move the endpoint from `suspicious` to `review` as a conditional, authoritative access-area anchor. Do not move the point to the Salmon River centerline. The point is the named Spring Bar Campground feature, while the ramp and carry are inside a campground/road access area.

## Why the original audit flagged it

The public audit had the `salmon-river-carey-creek-riggins` access point 427 ft from the matched Salmon River flowline. The nearest mapped waterway was Spring Creek at 104 ft, mapped-water distance was 104 ft, and hydrography coverage was complete. This is a geometry warning, not proof that the campground is the wrong access site.

## Verification runbook

1. Freeze the pre-change public and inventory audit files in this folder.
2. Record the exact route ID, endpoint role, stored coordinate, named flowline distance, nearest waterway, mapped-water distance, and hydrography completeness in `selection.json`.
3. Search the named location using a land-manager or state access source first. Prefer a source that explicitly says the site is a Salmon River take-out or ramp.
4. Cross-check the source against a second government source and a mapped feature. Do not use a map pin alone to prove public access.
5. Compare the published/mapped feature coordinate to the stored coordinate. If they match and the source identifies a ramp/take-out, retain the point as an access-area anchor even when it is away from the flowline.
6. Add a route-scoped official control with the source URLs, coordinate, uncertainty, and seasonal/conditional access language.
7. Re-run the route-specific audit. The endpoint should become `review` with `authoritative-access-anchor` evidence and zero source issues.
8. Regenerate the canonical access registry, then rerun both full public and full inventory audits.
9. Copy the refreshed full audits into this folder and record the before/after counts in `review.json`.

## Evidence

- [Recreation.gov Spring Bar Campground](https://www.recreation.gov/camping/poi/240698) identifies a popular Salmon River take-out with a boat-launching ramp and 18 tent campsites.
- [Forest Service destination listing](https://www.fs.usda.gov/visit/destinations?field_fs_states_tid_selective=All&field_rec_activities_target_id=All&field_rec_activities_tid_selective=11919&field_rec_forest_target_id=All&field_rec_forest_tid_selective=12023&page=709) places the site in the Nez Perce-Clearwater National Forests and repeats the take-out/ramp description.
- [Idaho Fish and Game](https://idfg.idaho.gov/article/fg-and-nez-perce-clearwater-national-forest-partnership-will-maintain-trails-and-increase) documents restoration of the Spring Bar boat ramp along the Salmon River.
- [Mapped Spring Bar Campground feature](https://mapcarta.com/23562536) corroborates the stored coordinate at approximately `45.42684,-116.15208`.

## Code and audit changes

- Added provider `id_usfs_recreationgov_spring_bar_campground_ramp_20260919` to `src/data/route-access-official-map-controls.json`.
- No route coordinate or route geometry changed.
- Regenerated `src/data/generated/route-access-registry.json`.
- Route-specific audit: 5 endpoints, 5 review, 0 suspicious, 0 source issues; Spring Bar is now a review endpoint with one access-review location.
- Full public audit after B82: 2,046 ok, 3,895 review, 42 suspicious, 0 failure, 75 unknown; 271 source issues.
- Full inventory audit after B82: 2,210 ok, 4,199 review, 95 suspicious, 51 failure, 86 unknown; 314 source issues.
- Registry after B82: 4,042 canonical entries, 1,201 repeated, 0 conflicts, 1,230 authoritative access matches.

The access remains conditional: confirm current Forest Service road/campground status, ramp condition, parking, and carry at arrival.
