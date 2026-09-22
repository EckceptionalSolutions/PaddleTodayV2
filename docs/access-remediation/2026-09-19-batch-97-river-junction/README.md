# B97 — River Junction Access & Campground (Iowa)

Date: 2026-09-19

## Decision

Retain `41.4912969,-91.5017984` and classify River Junction as a conditional, authoritative Iowa River access-area anchor. The coordinate is valid, but Johnson County currently reports the access closed until further notice.

## Verification runbook

1. Freeze public and inventory audits before editing.
2. Record the route, endpoint role, stored coordinate, flowline distance, mapped-water distance, and hydrography completeness in `selection.json`.
3. Verify the exact coordinate and boat-ramp description against Johnson County's current camping record.
4. Confirm the site, water-trail reach, and campground access through the county's independent site guide.
5. Check current county closure notices and preserve them as an availability condition.
6. Retain the county access-site coordinate when it is an official public endpoint; do not invent a wet-toe coordinate or treat a closed site as currently usable.
7. Add a route-scoped control, regenerate the registry, rerun public and inventory audits, and record the count delta.

## Evidence

- [Johnson County camping information](https://www.johnsoncountyiowa.gov/conservation/camping) publishes River Junction at `41.4912969,-91.5017984` and confirms Iowa River boat-ramp access.
- [River Junction Access & Campground site guide](https://www.johnsoncountyiowa.gov/sites/default/files/2021-07/River%20Junction.pdf) describes the primitive campground, boat ramp, Iowa River Water Trail, and the Hills-to-River-Junction reach.
- [Johnson County closure notice](https://www.johnsoncountyiowa.gov/news/conservation/flooding/2026-06-12/river-junction-access-closed) reports River Junction Access closed until further notice because flooding at the Iowa/English River confluence affects access.

## Result

The route-specific audit changed River Junction from `suspicious` to `review` with `authoritative-access-anchor` evidence and zero source issues. The coordinate and route geometry were unchanged. The full public audit is now 2,046 ok, 3,910 review, 27 suspicious, 0 failure, 75 unknown; inventory is 2,210 ok, 4,214 review, 80 suspicious, 51 failure, 86 unknown. The registry is conflict-free with 1,243 authoritative access matches.

Verify county reopening, road/site status, parking, ramp, and water conditions before using River Junction as a take-out; the point is documented but currently closed.
