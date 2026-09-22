# B90 — Marge Cline Whitewater Course take-out (Illinois)

Date: 2026-09-19

## Decision

Retain `41.641998,-88.443001` and classify the Marge Cline downstream portage as a conditional, authoritative public access-area anchor. Do not move it onto the Fox River flowline.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the route, endpoint role, stored coordinate, flowline distance, mapped-water distance, and hydrography completeness in `selection.json`.
3. Check Yorkville's official facility page for open-use status, the east-end launch, and portage locations.
4. Corroborate the public whitewater bypass with Illinois DNR and regional water-trail material.
5. Retain the facility point when it represents the designated downstream portage and mapped water is close; classify it as an access-area anchor rather than forcing it onto the connected Fox River trace.
6. Add a route-scoped official control with event, parking, and portage-condition checks.
7. Rerun the route audit, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [City of Yorkville facility page](https://www.yorkville.il.us/facilities/facility/details/marge-cline-whitewater-course-37) says the course is free and open-use, has an east-end boat launch, portage points at both ends, and a designated downstream canoe portage west of Route 47.
- [Illinois DNR dam-safety page](https://dnr.illinois.gov/waterresources/safetyatdams.html) identifies the Marge Cline Whitewater Bypass Channel as open to the public.
- [Fabulous Fox Water Trail](https://fabulousfoxwatertrail.org/access-sites/) corroborates city ownership, parking, carry-in access, and the Fox River location.

## Result

The route-specific audit changed the Marge Cline downstream portage from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. No route coordinate or geometry changed. The full public audit is now 2,046 ok, 3,903 review, 34 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,207 review, 87 suspicious, 51 failure, 86 unknown. The registry is conflict-free with 1,236 authoritative access matches.

Confirm current course status, event activity, parking, and downstream portage signage at arrival.
