# B87 — Stone Cliff River Access (West Virginia)

Date: 2026-09-19

## Decision

Retain `37.933013,-81.063513` and classify Stone Cliff River Access as a conditional, authoritative public access-area anchor. Do not move the endpoint onto the New River flowline.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the route, endpoint role, stored coordinate, flowline distance, mapped-water distance, and hydrography completeness in `selection.json`.
3. Check the official WVDNR access table for the named Stone Cliff lot and boat access with a published coordinate.
4. Confirm NPS independently lists Stone Cliff as public New River access near Thurmond.
5. Retain the stored point when it falls within the published access corridor and mapped water is close; classify the facility anchor rather than forcing a gorge road/parking point onto the flowline.
6. Add a route-scoped official control with uncertainty and current road/parking/ramp checks.
7. Rerun the route audit, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [WVDNR District 4 Fishing Guide](https://wvdnr.gov/wp-content/uploads/2023/04/Pub_District4FishingGuide_DNR_WILD_digital.pdf) lists Stone Cliff in Fayette County on the New River with a lot and boat access at 37.9337, -81.0639.
- [NPS New River Gorge fishing access](https://www.nps.gov/neri/planyourvisit/fishing.htm) lists Stone Cliff near Thurmond among the park's public river access points.
- [NPS New River Gorge river trips map](https://parkplanning.nps.gov/showFile.cfm?projectID=11040&sfid=74563) labels Stone Cliff as a public New River trip endpoint.

## Result

The route-specific audit changed Stone Cliff from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. No route coordinate or geometry changed. The full public audit is now 2,046 ok, 3,900 review, 37 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,204 review, 90 suspicious, 51 failure, 86 unknown. The registry is conflict-free with 1,234 authoritative access matches.

Confirm current NPS/WVDNR road approach, parking, ramp, and safe carry at arrival; gorge access can be seasonal or weather-affected.
