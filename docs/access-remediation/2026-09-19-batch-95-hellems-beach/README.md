# B95 — Hellems Beach New River access (West Virginia)

Date: 2026-09-19

## Decision

Retain `37.724596,-80.896656` and classify Hellems Beach as a conditional, authoritative New River access-area anchor. Do not move the access point onto the NHD flowline.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the route, endpoint role, stored coordinate, flowline distance, mapped-water distance, and hydrography completeness in `selection.json`.
3. Verify that current NPS guidance lists Hellems Beach as a public New River access.
4. Confirm the upper-gorge access context through independent NPS planning material.
5. Retain the access-area point when official park guidance confirms public access and the mapped-water offset is consistent with a gorge road/shoreline facility; do not invent a wet-toe coordinate.
6. Add a route-scoped control with conditional access and arrival checks.
7. Rerun the route audit, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [NPS Fishing — New River Gorge](https://www.nps.gov/neri/planyourvisit/fishing.htm) lists Hellems Beach among public New River access points via River Road at Hinton.
- [NPS New River Gorge planning material](https://parkplanning.nps.gov/showFile.cfm?projectID=11040&sfid=191065) independently groups Tug Creek, Hellems Beach, and Camp Brookside as upper-gorge public river accesses.
- [NPS access and driving guide](https://home.nps.gov/neri/planyourvisit/finding-your-way-around-the-park.htm) provides current park road/access context.

## Result

The route-specific audit changed Hellems Beach from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. The coordinate and route geometry were unchanged. The full public audit is now 2,046 ok, 3,908 review, 29 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,212 review, 82 suspicious, 51 failure, 86 unknown. The registry is conflict-free with 1,241 authoritative access matches.

Confirm current NPS road condition, parking/carry route, shoreline access, river level, and seasonal or safety restrictions at arrival; this is a public access-area anchor rather than a surveyed wet-toe point.
