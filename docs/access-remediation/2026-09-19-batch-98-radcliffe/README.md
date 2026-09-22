# B98 — John J. Radcliffe Conservation Area canoe launch (Virginia)

Date: 2026-09-19

## Decision

Retain `37.220040,-77.523390` and classify the Radcliffe canoe launch as a conditional, authoritative Appomattox River access-area anchor. Do not move the county facility point onto the NHD flowline.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the route, endpoint role, stored coordinate, flowline distance, mapped-water distance, and hydrography completeness in `selection.json`.
3. Verify the public canoe launch, parking area, and boat slide against Chesterfield County's current facility page.
4. Confirm the site layout and independent water-access listing through county records.
5. Retain the official access-site point when the mapped-water offset is consistent with the parking/boat-slide facility below Brasfield Dam; do not invent a wet-toe coordinate.
6. Add a route-scoped control, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [Chesterfield County John J. Radcliffe Conservation Area](https://www.chesterfield.gov/facilities/facility/details/John-J-Radcliffe-Conservation-Area-440) identifies the public Appomattox River Canoe Launch, parking area, and boat slide for small non-powered craft.
- [Official Radcliffe launch layout](https://www.chesterfield.gov/DocumentCenter/View/1923/John-J-Radcliffe-Conservation-Area-and-Appomattox-River-Canoe-Launch-Layout-PDF?bidId=) provides the county site layout.
- [Chesterfield County water-access page](https://www.chesterfield.gov/5097/Water-Access-and-Fishing) independently lists the Appomattox River Canoe Launch and Radcliffe Conservation Area.

## Result

The route-specific audit changed the Radcliffe put-in from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. The coordinate and route geometry were unchanged. The downstream Patton Park endpoint remains a separate suspicious case. The full public audit is now 2,046 ok, 3,911 review, 26 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,215 review, 79 suspicious, 51 failure, 86 unknown. The registry is conflict-free with 1,244 authoritative access matches.

Confirm current park hours, parking, hand-carry slide condition, downstream whitewater/dam hazards, and river level before launching.
