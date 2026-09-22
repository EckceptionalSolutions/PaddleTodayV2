# B93 — NYSDEC Nineveh Bridge Susquehanna access (New York)

Date: 2026-09-19

## Decision

Retain `42.193440,-75.599460` and classify NYSDEC Nineveh Bridge Susquehanna access as a conditional, authoritative access-area anchor. Do not move the published launch coordinate onto the NHD flowline.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the route, endpoint role, stored coordinate, flowline distance, mapped-water distance, and hydrography completeness in `selection.json`.
3. Verify the exact coordinate against the current NYSDEC Broome County boat-launch directory.
4. Confirm the ramp type, parking, and bridge-side location through NYSDEC's Susquehanna River access page and fishing brochure.
5. Retain the state launch coordinate when it is an official public access point and the mapped-water offset is consistent with a bridge/shoreline facility; do not invent a wet-toe coordinate.
6. Add a route-scoped control with conditional access and arrival checks.
7. Rerun the route audit, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [NYSDEC Broome County boat-launch directory](https://dec.ny.gov/things-to-do/boating/launch-sites/broome-county) publishes Ninevah Bridge at `42.193440,-75.599460` as a DEC hard-surface launch with parking for eight cars and trailers.
- [NYSDEC Susquehanna River access page](https://dec.ny.gov/places/susquehanna-river) describes Nineveh as a concrete ramp on County Route 26.
- [NYSDEC Susquehanna River fishing brochure](https://extapps.dec.ny.gov/docs/fish_marine_pdf/r7susqhanbroc.pdf) identifies a hard-surface ramp and bank fishing at the northeast corner of the Nineveh bridge.

## Result

The route-specific audit changed Nineveh Bridge from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. The coordinate and route geometry were unchanged. The full public audit is now 2,046 ok, 3,906 review, 31 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,210 review, 84 suspicious, 51 failure, 86 unknown. The registry is conflict-free with 1,239 authoritative access matches.

Confirm current DEC parking, ramp condition, bridge-side carry route, and river conditions at arrival; this is a public launch-area anchor rather than a surveyed wet-toe point.
