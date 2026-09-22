# B92 — East River Flats Park (Minnesota)

Date: 2026-09-19

## Decision

Retain `44.9703514,-93.2350599` and classify East River Flats Park as a conditional, authoritative Mississippi River shoreline/carry-in access-area anchor. Do not move the park point onto the Mississippi River flowline.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the route, endpoint role, stored coordinate, flowline distance, mapped-water distance, and hydrography completeness in `selection.json`.
3. Check Minneapolis Park Board planning for boat launch, river access, parking, and the rowing-facility context.
4. Confirm Minnesota DNR independently lists East River Flats as a carry-in access.
5. Retain the park point when it represents a documented shoreline access area and mapped water is close; classify it as an access anchor rather than forcing a broad riverbank point onto the flowline.
6. Add a route-scoped control with current project, carry, rowing-conflict, parking, and river-condition checks.
7. Rerun the route audit, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [Minneapolis Park Board Mississippi Gorge plan](https://www.minneapolisparks.org/wp-content/uploads/2019/01/MSRG-2_Conditions-Analysis-Opps_B.pdf) identifies East River Flats as one of the best river-access locations and lists a boat launch, river access, pay parking, and the University rowing facility.
- [Minnesota DNR Metro Area Rivers Guide](https://files.dnr.state.mn.us/education_safety/safety/boatwater/metro_river_guide.pdf) identifies East River Flats as a carry-in access.
- [Current East River Flats Park page](https://www.minneapolisparks.org/parks-destinations/parks-lakes/east_river_flats_park/) documents the park location, hours, parking, and rowing boathouse.

## Result

The route-specific audit changed East River Flats Park from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. No route coordinate or geometry changed. The full public audit is now 2,046 ok, 3,905 review, 32 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,209 review, 85 suspicious, 51 failure, 86 unknown. The registry is conflict-free with 1,238 authoritative access matches.

Confirm current Park Board project status, shoreline carry route, rowing-facility conflicts, parking, and river conditions at arrival; this is a carry-in/shoreline access area rather than a guaranteed trailer ramp.
