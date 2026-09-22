# B88 — Canoe Creek Access (Iowa)

Date: 2026-09-19

## Decision

Move Canoe Creek Access from `43.3673,-91.6189` to the Iowa DNR paddling-access coordinate `43.367178379845065,-91.61657052093616`. Keep it conditional because current parking, carry, and bank conditions still need an arrival check.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the old coordinate, official DNR coordinate, river distances, mapped-water distance, and hydrography completeness in `selection.json`.
3. Query the Iowa DNR Paddling Access Sites layer for the named Canoe Creek Access feature.
4. Confirm the Upper Iowa paddler guide places Canoe Creek Access in this reach and mile sequence.
5. Move the intermediate access point to the current DNR GIS coordinate and add a route-scoped control.
6. Do not regenerate canonical route geometry because the geometry generator uses only put-in and take-out endpoints; the corrected point is an intermediate access reference.
7. Rerun the route audit, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [Iowa DNR Paddling Access Sites layer](https://programs.iowadnr.gov/geospatial/rest/services/Recreation/Recreation/MapServer/4/query?where=OBJECTID%3D38117&outFields=*&returnGeometry=true&outSR=4326&f=pjson) identifies OBJECTID 38117 / WA-163 as Canoe Creek Access at `43.367178379845065,-91.61657052093616`.
- [Upper Iowa River Paddler's Guide](https://northeastiowarcd.org/wp-content/uploads/2016/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf) places Canoe Creek Access at mile 35.8 in the same access chain.
- [Iowa DNR Where to Paddle](https://www.iowadnr.gov/things-do/paddling-river-recreation/where-paddle) documents the state's official paddling map and access-planning workflow.

## Result

The corrected point moved 619 feet to the authoritative DNR coordinate. The route-specific audit changed Canoe Creek Access from `suspicious` to `review`; it is now 100 feet from the named Upper Iowa River flowline and 34 feet from mapped water, with zero source issues. No canonical route geometry changed because this is an intermediate access point. The full public audit is now 2,046 ok, 3,901 review, 36 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,205 review, 89 suspicious, 51 failure, 86 unknown. The registry is conflict-free with 1,234 authoritative access matches.

Confirm current Iowa DNR access-site parking, carry, and bank conditions at arrival.
