# B94 — Rowlesburg City Park Cheat River access (West Virginia)

Date: 2026-09-19

## Decision

Retain `39.349000,-79.671000` and classify Rowlesburg City Park as a conditional, authoritative Cheat River access-area anchor. Do not move the published park coordinate onto the NHD flowline.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the route, endpoint role, stored coordinate, flowline distance, mapped-water distance, and hydrography completeness in `selection.json`.
3. Verify the exact coordinate and boat-access classification against the WVDNR District 1 river-access table.
4. Confirm the current WVDNR public-access program and county parks' description of Cheat River access.
5. Retain the DNR park/access coordinate when it is an official public access point and the mapped-water offset is consistent with a park/shoreline facility; do not invent a wet-toe coordinate.
6. Add a route-scoped control with conditional access and arrival checks.
7. Rerun the route audit, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [WVDNR District 1 Fishing Guide](https://wvdnr.gov/wp-content/uploads/2021/06/DNR_Wildlife_District1_FishingGuide.pdf) lists Rowlesburg City Park, Preston County, Cheat River, lot, boat access, `39.349,-79.671`.
- [WVDNR public fishing and boating access sites](https://wvdnr.gov/lands-waters/stream-access-points/) describes the current state public access-site program and says the interactive map contains all public fishing and boating access sites.
- [Preston County Parks resources](https://www.pcparc.org/park-resources.html) documents Rowlesburg Community Park and Cheat River access.

## Result

The route-specific audit changed Rowlesburg City Park from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. The coordinate and route geometry were unchanged. The full public audit is now 2,046 ok, 3,907 review, 30 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,211 review, 83 suspicious, 51 failure, 86 unknown. The registry is conflict-free with 1,240 authoritative access matches.

Confirm current WVDNR/park status, parking, carry route, whitewater level, and any closure or event restrictions at arrival; this is a public park/access-area anchor rather than a surveyed wet-toe point.
