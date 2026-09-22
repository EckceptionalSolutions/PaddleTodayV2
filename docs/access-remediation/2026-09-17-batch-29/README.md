# Public access-point review: batch 29

This batch reviews the first ten distinct public access sites in the frozen queue after batches 1–28. The frozen input came from the 2,761-route / 6,082-endpoint public audit. Site order and original offsets are preserved in `selection.json`.

Two coordinates were corrected. Columbus now points to Nebraska Game and Parks' published Loup River Water Trail endpoint at the river; the hotel lot remains a separate approach about 250 yards away, and parking permission must be checked. Esmond Park now uses ExploreRI's published coordinate for the named portage/access site. Those changes affect nine unique public routes and nine public endpoint occurrences. Both coordinates identify an access or portage area, not a surveyed wet edge.

The other eight sites were retained as public access anchors. Official sources verify the facility or route function, while the published/map coordinates identify the park, parking, ramp approach, carry, or take-out area rather than a surveyed water-entry point. Interstate Park needed the clearest route qualification: the county identifies its east-end access as a public canoe/kayak launch, but Iowa DNR says there is no developed launch below the dam. The downstream route now directs paddlers to take out, scout the natural-path carry, and relaunch only when the path is open and a suitable entry is available. Esmond Park notes likewise identify a portage/access site, not an exact launch point.

No site was invalid or unverified enough to reject, and no new route hold was added. The audit retains a visible uncertainty for access anchors that lie away from the mapped wet edge. The review does not treat proximity to mapped water as proof of a safe entry.

## Repeatable steps for the next model

1. Read `docs/access-point-remediation-runbook.md` and this batch's `review.json` and `source-metadata.json`. Preserve unrelated worktree changes.
2. Use the frozen `selection.json`; do not substitute easier sites. Keep each physical site separate from its route occurrences.
3. For each point, verify the named facility and current public use with its manager or trail operator. Record what its coordinate locates and what it does not locate.
4. Prefer a published coordinate for the same site. Do not move a point to the nearest water line or a nearby GIS feature when that feature may describe a different access or side of a dam.
5. Update all shared endpoints, route centers, duplicate access entries, provider aliases, and trip instructions that rely on a corrected site. Preserve separate parking and water-entry locations.
6. Refresh each changed public route against hydrography and inspect source coverage, named waterbody, distance, and endpoint role. Regenerate each changed route geometry before catalog assembly.
7. Regenerate the full audit and access registry from the completed full report. Keep public route totals and evidence mode in the validation record.
8. Run the batch verifier and relevant type/catalog/access checks. Record unrelated existing failures and environment blockers without attributing them to this batch.
9. If further evidence cannot establish a usable access or a required dam-side carry, reject that access for the dependent public route and record the hold and reopening evidence. Keep source inventory records for later review.

`review.json` records decisions and changed route occurrences; `source-metadata.json` captures evidence limits. `validation.json` and the adjacent audit artifacts are updated after route refresh and regeneration.
