# Shared suspicious access-point correction — batch 38

This pass reviewed Good Hope Access on the Conodoguinet Creek, shared by three routes. The stored point (40.2546304, -76.9753045) was a geocoded road-address position. The current PFBC-verified access GIS places the named PFBC-owned access area at 40.258898, -76.976392. Cumberland County's current guide identifies Good Hope as a public unpowered-boat access with a shallow earthen ramp, matting, a short carry, and a shallow slope to the creek.

The agency point is recorded as an **access-area anchor**, not a surveyed water-entry coordinate. Targeted audits now match that PFBC record for all three Good Hope occurrences; each remains `review` pending confirmation of the exact wet edge. Each corrected point is 71.6 ft from mapped water and about 200 ft from the matched named/connected flowline. The targeted reports contain no source issues. One unrelated Willow Mill endpoint remains `suspicious` in its route-scoped report.

Affected routes: `conodoguinet-creek-willow-mill-good-hope`, `conodoguinet-creek-vincent-difilippo-good-hope`, and `conodoguinet-creek-good-hope-acri-meadow`.

## Repeatable steps

1. Group the exact shared endpoint and list every route occurrence before editing.
2. Query the PFBC-verified GIS layer for the named site; verify its owner, waterbody, access classification, and point geometry. Cross-check public-use and launch details in Cumberland County's updated water-trail guide.
3. Replace a road-address geocode with the PFBC point, but preserve the source's access-area role. Do not snap it to the nearest mapped water or call it the wet edge.
4. Update all route trip endpoints and the route-center point when it represents that same start access. Add a named audit control using the GIS point and an explicit uncertainty.
5. Run a targeted audit for every affected route, regenerate each public route geometry, then rebuild the aggregate geometry assets, registry, overview, and full audit.

The water-entry edge should be refined only when a site plan, field coordinate, or clear imagery identifies the public ramp toe. Until then, the point remains a defensible official access anchor with review status.

The cache-only full audit generated 2026-09-18T16:38:12.920Z covers all 2,752 public routes and 6,062 endpoints. It reports 106 suspicious, 0 failures, 78 unknown, 271 source issues, and 120 review locations; the three Good Hope occurrences remain non-suspicious access anchors. See the [current full audit](../../access-point-quality-audit.md).
