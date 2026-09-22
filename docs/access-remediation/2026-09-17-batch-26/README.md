# Ten-site access-point quality review

This batch applies the [access-point remediation runbook](../../access-point-remediation-runbook.md) to ten previously unreviewed locations selected from the full network-backed quality queue. The compact [selection audit snapshot](selection-audit-queue.json) freezes the queue used for selection; selection favored the largest mapped-water offsets among locations with at least one route still in the public inventory.

## Decisions

Only Riverside Park needed a coordinate correction. The prior point was a park-area pin about 621 feet from mapped water. Milwaukee Riverkeeper publishes a GPS point for the concrete canoe ramp, Milwaukee County lists the designated East Bank launch, and the Urban Ecology Center describes the path from parking to the landing. The route and trip detail now use the mapped launch at **43.06739422, -87.89480066**.

The other nine points remain useful access-area anchors. Current sources confirm public canoe access or a riverside recreation site, while also showing why these coordinates should not be mistaken for exact water-entry edges: published carries range from 150 yards to 0.8 mile, several sources map only parking or a campground, and the County Highway K record does not publish a surveyed point. Those anchors and limitations are now explicit in the source-control records. Perception Park remains labeled as a campground access area; the Forest Service record does not designate a paddlecraft launch there.

The registry builder now carries `authoritative-access-anchor` through audit records and excludes both access-area and property-area anchors from wet-edge consensus. It still retains those points as access sites, so a supported parking/carry location no longer becomes an inferred river-entry coordinate just because several route records repeat it.

The Syas geometry follow-up is also recorded: the corrected Syas-to-Monroe route now has a continuous network trace and is released. Syas-to-Columbus and Syas-to-ADM still produce disconnected named-flowline fallbacks, so both remain withheld and have no served geometry assets.

## Runbook sequence

1. Refresh the full audit with network hydrography and check route/endpoint coverage before using its queue.
2. Select ten unreviewed public access locations. Record the audit coordinate and route dependencies before researching.
3. For each location, identify whether the published point means parking, a carry trailhead, a campground, a launch area, or the water-entry edge. Do not snap a source-backed access anchor to nearby hydrography.
4. Compare current manager or route-map records. Correct coordinates only when a source identifies the actual launch point; otherwise preserve the anchor and record the carry or uncertainty.
5. Regenerate and inspect geometry for each corrected public route. Release a previously held route only after its geometry passes; leave unresolved routes held.
6. Rebuild and audit served geometry, then refresh the full network-backed quality report.

The records in this folder preserve the selected sites, decision evidence, source metadata, and checks for a weaker model to repeat. `verify.mjs` provides a small executable assertion set.
