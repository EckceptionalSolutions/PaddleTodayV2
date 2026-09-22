# B84 — Gambril Access (Iowa)

Date: 2026-09-19

## Decision

Retain `41.7653717,-90.5340683` and classify Gambril Access as a conditional, authoritative public access-area anchor. Do not move the endpoint onto the Wapsipinicon River flowline.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the route, endpoint role, stored coordinate, flowline distance, mapped-water distance, and hydrography completeness in `selection.json`.
3. Search Iowa DNR and county water-trail sources for the named access.
4. Confirm that the source explicitly describes a ramp, eddy, or launch/take-out—not just a nearby town or park.
5. Treat the stored point as a facility/access-area anchor when mapped water is close and the source supports the named ramp.
6. Add a route-scoped official control with uncertainty and current parking/ramp/carry checks.
7. Rerun the route audit, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [Iowa DNR Wapsipinicon River Water Trail guide](https://www.iowadnr.gov/media/8702/download?inline=) identifies Gambril Access as a cement ramp pointed downriver with a good eddy and places it on the Sherman-to-Gambril route.
- [Scott County Conservation](https://www.scottcountyiowa.gov/conservation/allens-grove/wapsipinicon-river) corroborates public boat-ramp access on the Wapsipinicon corridor.
- [Iowa DNR lower Wapsi route PDF](https://publications.iowa.gov/28032/1/watertrail_wapsi_cs.pdf) documents the Gambril-to-McCausland continuation.

## Result

The route-specific audit changed Gambril from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. No route coordinate or geometry changed. The full public audit is now 2,046 ok, 3,897 review, 40 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,201 review, 93 suspicious, 51 failure, 86 unknown. The registry remains conflict-free with 1,231 authoritative access matches.

Confirm current parking, ramp surface, eddy, and safe carry at arrival; Iowa DNR notes that Gambril has no bathrooms or other facilities.
