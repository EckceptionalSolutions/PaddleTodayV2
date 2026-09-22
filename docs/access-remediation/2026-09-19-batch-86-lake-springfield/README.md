# B86 — Lake Springfield Boathouse (Missouri)

Date: 2026-09-19

## Decision

Retain `37.1159741,-93.2517345` and classify Lake Springfield Boathouse as a conditional, authoritative public access-area anchor. Do not move the endpoint onto the upstream James River flowline.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the route, endpoint role, stored coordinate, flowline distance, mapped-water distance, and hydrography completeness in `selection.json`.
3. Check the official Park Board facility page for a named public Boathouse, shoreline, parking, and water-trail use.
4. Confirm that the route source distinguishes the Boathouse from the separate boat launch; this prevents substituting the wrong facility.
5. Treat the point as a lake-finish facility anchor when mapped lake water is close and the official source supports the named facility.
6. Add a route-scoped official control whose waterbody covers the connected `James River / Lake Springfield` pair.
7. Rerun the route audit, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [Springfield-Greene County Park Board](https://parkboard.org/LakeSpringfield) identifies the Boathouse as a public Lake Springfield shoreline facility with boat rentals, accessible parking, and James River Water Trail use; its trail information distinguishes the Boathouse from the separate boat launch.
- [Springfield City Water, Light and Power](https://www.cwlp.com/LakesParksHome/LakesParksInformation/Boating.aspx) lists public Lake Springfield launches and docks.
- [Missouri Department of Conservation Lake Springfield map](https://mdc.mo.gov/sites/default/files/mo_nature/downloads/conservation-areas/9410map.pdf) provides public recreation and ramp context.

## Result

The route-specific audit changed Lake Springfield Boathouse from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. No route coordinate or geometry changed. The full public audit is now 2,046 ok, 3,899 review, 38 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,203 review, 91 suspicious, 51 failure, 86 unknown. The registry is conflict-free with 1,233 authoritative access matches.

Confirm current Park Board hours, shoreline landing, parking, and any event or rental restrictions at arrival; do not substitute the separate boat launch without route review.
