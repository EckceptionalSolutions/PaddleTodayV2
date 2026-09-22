# Batch 81: Twist and Shout Railroad-Bridge Take-out

## Decision

Retain `39.40187, -80.09554` as the named Twist and Shout take-out anchor, but classify it as **conditional** rather than unrestricted public access. American Whitewater's Valley Falls to Hammond reach identifies the take-out beneath the railroad bridge and publishes the exact stored coordinate. Current route guidance repeats the location and warns that the bridge is active infrastructure; historical American Whitewater reports document access changes and possible gates.

The coordinate is therefore supported, while the legal landing, parking, carry path, and current permission remain day-of checks. Never use the active railroad line as a shuttle or return path. The coordinate is an access-area anchor, not a surveyed wet-toe point.

## Review steps

1. Froze the endpoint from the refreshed public suspicious queue before source review. See `selection.json` and `audit-before-public-cache-only.json`.
2. Checked American Whitewater's Valley Falls section. It identifies the lower take-out under the railroad bridge and publishes `39.40187, -80.09554`, exactly matching the stored point.
3. Checked current route guidance and West Virginia State Parks material. The route requires expert whitewater judgment, current park/access checks, and a separate shuttle plan; the state park confirms kayaking is an activity at Valley Falls.
4. Reviewed American Whitewater's historical access report, which documents that gates/access conditions have changed in the past. This supports a conditional-access classification rather than a blanket public-access claim.
5. Added a route-scoped conditional access control and reran targeted and full audits.

## Outcome and follow-up

The suspicious take-out moved to review with explicit conditional-access wording. The endpoint remains 484 feet from the named Tygart Valley River flowline but within 2 feet of Glady Creek and has complete hydrography coverage; the source-backed access identity explains why flowline distance is not sufficient to reject it. The route still has one access-review location because current legal access is not guaranteed.

The public suspicious count decreased from 44 to 43, and the full-inventory suspicious count decreased from 97 to 96. The public audit covers 2,750 routes / 6,058 endpoints: 2,046 okay, 3,894 review, 43 suspicious, and 75 unknown. The full inventory covers 2,998 routes / 6,641 endpoints: 2,210 okay, 4,198 review, 96 suspicious, 51 failures, and 86 unknown. Source issues remain 271 public and 314 inventory. The registry has 4,042 canonical entries, 1,201 repeated entries, no conflicts, and 1,229 authoritative access matches.

## Sources

- [American Whitewater Valley Falls reach](https://www.americanwhitewater.org/content/River/view/river-detail/2453/main)
- [American Whitewater Valley Falls access reports](https://www.americanwhitewater.org/content/River/view/river-detail/2453/reports)
- [West Virginia State Parks Valley Falls activities](https://wvstateparks.com/parks/valley-falls-state-park/activities/)
