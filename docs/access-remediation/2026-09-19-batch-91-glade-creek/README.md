# B91 — Glade Creek River Access (West Virginia)

Date: 2026-09-19

## Decision

Retain `37.82912,-81.014533` and classify Glade Creek River Access as a conditional, authoritative public access-area anchor. Do not move the endpoint onto the New River flowline.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the route, endpoint role, stored coordinate, flowline distance, mapped-water distance, and hydrography completeness in `selection.json`.
3. Check NPS park guidance for a named Glade Creek campground, trailhead, and river access reached by Glade Creek Road.
4. Confirm NPS fishing guidance independently lists Glade Creek as public New River access.
5. Retain the facility point when mapped water is close and the source supports the named campground/access area; classify the access anchor instead of forcing a gorge road point onto the flowline.
6. Add a route-scoped NPS control with current road, parking, carry, and river-condition checks.
7. Rerun the route audit, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [NPS Finding Your Way Around the Park](https://www.nps.gov/neri/planyourvisit/finding-your-way-around-the-park.htm) describes Glade Creek as a New River access area with a primitive campground and trailhead reached from Glade Creek Road.
- [NPS New River Gorge fishing access](https://www.nps.gov/neri/planyourvisit/fishing.htm) lists Glade Creek among public New River access points near Prince.
- [NPS Glade Creek / Hamlet](https://home.nps.gov/neri/learn/historyculture/glade-creek-hamlet.htm) documents the campground, boating, river access, and route to the access area.

## Result

The route-specific audit changed Glade Creek River Access from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. No route coordinate or geometry changed. The full public audit is now 2,046 ok, 3,904 review, 33 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,208 review, 86 suspicious, 51 failure, 86 unknown. The registry is conflict-free with 1,237 authoritative access matches.

Confirm current NPS Glade Creek Road, campground, parking, carry, and river conditions at arrival; gorge roads can be seasonal or weather-affected.
