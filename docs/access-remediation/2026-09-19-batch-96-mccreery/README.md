# B96 — McCreery New River access (West Virginia)

Date: 2026-09-19

## Decision

Retain `37.848591,-81.092046` and classify McCreery as a conditional, authoritative New River access-area anchor. Do not move the access point onto the NHD flowline.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the route, endpoint role, stored coordinate, flowline distance, mapped-water distance, and hydrography completeness in `selection.json`.
3. Verify that current NPS guidance lists McCreery as a public New River access.
4. Confirm the McCreery site and parking footprint through NPS public assembly material.
5. Retain the access-area point when official park guidance confirms public access and the mapped-water offset is consistent with a gorge road/parking facility; do not invent a wet-toe coordinate.
6. Add a route-scoped control with conditional access and arrival checks.
7. Rerun the route audit, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [NPS Fishing — New River Gorge](https://www.nps.gov/neri/planyourvisit/fishing.htm) lists McCreery among public New River access points off Hwy. 41 near Prince.
- [NPS public assembly maps](https://www.nps.gov/neri/planyourvisit/public-assembly-maps.htm) identifies McCreery River Access and its site footprint.
- [NPS access and driving guide](https://www.nps.gov/neri/planyourvisit/finding-your-way-around-the-park.htm) provides current McCreery/Grandview road and gorge access context.

## Result

The route-specific audit changed McCreery from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. The coordinate and route geometry were unchanged. The full public audit is now 2,046 ok, 3,909 review, 28 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,213 review, 81 suspicious, 51 failure, 86 unknown. The registry is conflict-free with 1,242 authoritative access matches.

Confirm current NPS road condition, parking, carry/ramp route, river level, and seasonal or safety restrictions at arrival; this is a public access-area anchor rather than a surveyed wet-toe point.
