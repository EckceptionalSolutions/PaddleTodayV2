# B89 — McCrea Bridge Campground Take-Out (Idaho)

Date: 2026-09-19

## Decision

Retain `44.461326,-111.400613` and classify McCrea Bridge Campground Take-Out as a conditional, authoritative public access-area anchor. Do not move the endpoint onto the Henrys Fork flowline.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the route, endpoint role, stored coordinate, flowline distance, mapped-water distance, and hydrography completeness in `selection.json`.
3. Check the Henrys Fork access catalog for the named campground, coordinate, ramp, and parking.
4. Confirm Recreation.gov and Forest Service material for current public-facility and seasonal-water context.
5. Retain an exact facility coordinate when it matches the access catalog and mapped water is close; classify it as an access-area anchor instead of forcing it onto a connected-network flowline.
6. Add a route-scoped official control with seasonal access conditions.
7. Rerun the route audit, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [Henrys Fork Angler Access catalog](https://henrysfork.org/wp-content/uploads/Henrys-Fork-Angler-Access-Upper-River-Updated.pdf) publishes McCrea Bridge Campground at `44.46132608,-111.40061335` and documents a paved boat ramp and parking.
- [Recreation.gov McCrea Bridge](https://www.recreation.gov/camping/campgrounds/231926) confirms the campground ramp and warns that irrigation drawdown can eliminate reservoir access from the site by August.
- [U.S. Forest Service recreation guide](https://www.fs.usda.gov/media/248399) lists McCrea Bridge as a reservoir facility with a concrete ramp.

## Result

The route-specific audit changed McCrea Bridge Campground Take-Out from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. No route coordinate or geometry changed. The full public audit is now 2,046 ok, 3,902 review, 35 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,206 review, 88 suspicious, 51 failure, 86 unknown. The registry is conflict-free with 1,235 authoritative access matches.

Confirm current campground status, ramp access, reservoir level, and parking before relying on this take-out; Recreation.gov specifically warns that water access may disappear by August.
