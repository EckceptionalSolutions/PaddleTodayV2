# B85 — Talcott access (West Virginia)

Date: 2026-09-19

## Decision

Retain `37.6500,-80.7511` and classify Talcott access as a conditional, authoritative public access-area anchor. Do not move the endpoint onto the Greenbrier River flowline.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the route, endpoint role, stored coordinate, flowline distance, mapped-water distance, and hydrography completeness in `selection.json`.
3. Check the official WVDNR access table for a named Talcott boat access and published coordinate.
4. Confirm the source describes a public lot/ramp/boat access, then corroborate with independent river guidance.
5. Retain the facility point when it matches the authoritative access coordinate and mapped water is close; classify it as an access-area anchor instead of forcing it onto the flowline.
6. Add a route-scoped official control with uncertainty and current parking/ramp/carry checks.
7. Rerun the route audit, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [WVDNR District 4 Fishing Guide](https://wvdnr.gov/wp-content/uploads/2023/04/Pub_District4FishingGuide_DNR_WILD_digital.pdf) lists Talcott on the Greenbrier River as lot and boat access at 37.6500, -80.7511.
- [WVU DIY Outdoors](https://diyoutdoors.wvu.edu/canoeing/greenbrier-river-canoe) places the Talcott public access at 37.650054, -80.750994.
- [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/4199/main) describes a river-right ramp and parking near the Barger Springs bridge.

## Result

The route-specific audit changed Talcott from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. No route coordinate or geometry changed. The full public audit is now 2,046 ok, 3,898 review, 39 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,202 review, 92 suspicious, 51 failure, 86 unknown. The registry is conflict-free with 1,232 authoritative access matches.

Confirm current parking, ramp condition, river access, and safe carry at arrival; WVDNR's table is an access listing rather than a guarantee of current on-site conditions.
