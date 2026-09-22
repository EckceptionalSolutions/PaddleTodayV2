# B83 — Bisset Park Boat Ramp / Dudley’s Landing (Virginia)

Date: 2026-09-19

## Decision

Retain `37.142947,-80.561986` and classify the put-in as a conditional, authoritative public access-area anchor. Do not move it onto the New River centerline.

## Verification runbook

1. Freeze the public and inventory audits before editing.
2. Record the exact route, endpoint role, coordinate, flowline distance, mapped-water distance, and hydrography mode in `selection.json`.
3. Prefer state or municipal access sources. Confirm that the named location is a launch or take-out on the named river.
4. Cross-check with a second public source and, where available, an access map or whitewater reach guide.
5. If the coordinate represents the park/ramp facility and mapped water is nearby, retain it as an access-area anchor instead of forcing centerline precision.
6. Add a route-scoped official control with a conditional status and current parking/carry check.
7. Re-run the route audit, regenerate the registry, rerun the full public/inventory audits, and record the aggregate change.

## Evidence

- [Virginia DWR New River guide](https://dwr.es.virginia.gov/waterbody/new-river/) identifies the Bisset Park Boat Ramp, also known as Dudley’s Landing, as a New River launch/take-out.
- [City of Radford](https://www.radfordva.gov/514/The-New-River) lists boat launches at Dudley’s Landing and river access in Bisset Park.
- [New River Valley Regional Commission](https://nrvrc.org/news/public-notifications/fonsi-bisset-park) documents a public Bisset Park Shelter #3 boat-access facility with parking and a connecting footpath.
- [American Whitewater](https://www.americanwhitewater.org/content/River/view/river-detail/4620/main) lists Bisset Park/Dudley’s Landing as a boat ramp and parking access point.

## Result

The route-specific audit changed the endpoint from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. No route coordinate or geometry changed. The refreshed full public audit is 2,046 ok, 3,896 review, 41 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,200 review, 94 suspicious, 51 failure, 86 unknown. The registry now has 1,231 authoritative access matches.

Confirm current City of Radford ramp, parking, and carry conditions at arrival and use the marked facility.
