# Batch 76: Horse Shoe Boating Access Area

## Decision

Retain `35.3293739, -82.5747687` as the public access-area pin for Horse Shoe on the French Broad River. The point is linked directly from the French Broad Paddle Trail access list's Horse Shoe entry at river mile 41.5, and the adjacent route occurrence independently falls 33 feet from a topology-connected French Broad trace. NCWRC's access inventory lists the named facility as a public boat ramp/canoe access at 5437 Brevard Road; Henderson County describes parking and a boat put-in. The NCWRC inventory's alternate facility coordinate is about 230 feet away, so these records support the same access area but do not establish a surveyed wet-toe point.

No coordinate move is justified. The endpoint should remain a mapped access-area anchor with the existing post-storm/closure checks. This is a public access, not a private or permission-based site.

## Review steps

1. Froze the shared-coordinate candidate from the refreshed public suspicious queue before point-specific research. See `selection.json` and `audit-before-public-cache-only.json`.
2. Checked the current French Broad Paddle Trail access list. It names Horse Shoe Boating Access Area at mile 41.5, names Henderson County as manager, lists the point open, and links to a Google Maps place resolving to the stored route coordinate.
3. Cross-checked NCWRC's access inventory, which names Horse Shoe, lists a boat ramp and canoe access, and publishes a nearby facility coordinate. Henderson County's facility page identifies parking and a boat put-in at the park.
4. Compared the shared point against the route-specific audit evidence. The Blantyre take-out is 306 feet from the named NHD flowline with incomplete hydrography coverage, while the same point on the downstream route is 33 feet from its connected French Broad trace.
5. Added a public authoritative access-area control for the exact trail map pin and reran both affected routes. See `audit-after-blantyre-targeted.json` and `audit-after-lazy-otter-targeted.json`.

## Outcome and follow-up

The location is verified as a real, public, county-managed boating access area. The coordinate is supported as the map pin/access-area anchor, not as a surveyed waterline point. Verify post-storm conditions and any current closure notices before paddling; the French Broad Paddle Trail page warns that access amenities and river conditions can change during Hurricane Helene recovery.

The targeted audit moved the previously suspicious take-out to review based on this access evidence. The downstream occurrence also moved from okay to review because the audit now correctly labels its coordinate as an access-area anchor rather than a surveyed water-entry point. Hydrography coverage for the Blantyre route remains incomplete, so the access decision does not remove that data-quality limitation. No route geometry changed because the coordinate was retained.

Across the full refreshed audits, public suspicious endpoints decreased from 49 to 48, and full-inventory suspicious endpoints decreased from 102 to 101. The public audit still covers 2,750 routes and 6,058 endpoints: 2,046 okay, 3,889 review, 48 suspicious, and 75 unknown. The full inventory covers 2,998 routes and 6,641 endpoints: 2,210 okay, 4,193 review, 101 suspicious, 51 failures, and 86 unknown. Source issues remain 271 public and 314 inventory. The registry has 4,042 canonical entries, 1,201 repeated entries, no conflicts, and 1,226 authoritative access matches.

## Sources

- [French Broad Paddle Trail access points](https://frenchbroadpaddle.com/en/access-points)
- [French Broad Paddle Trail map pin for Horse Shoe River Bend Access](https://www.google.com/maps/place/Horse+Shoe+River+Bend+Access/@35.3274933,-82.5788787,16z/data=!4m6!3m5!1s0x8859bf8343c5db9d:0xa971d58fd4f07e35!8m2!3d35.3293739!4d-82.5747687!16s%2Fg%2F11hbkfb__b)
- [NCWRC public Horse Shoe boat ramp and canoe access listing](https://ncpaws.org/RsReports/IMAP/FishingAreasPDF.aspx?BoatRamp=0&CanoeAccess=0&FishingPier=0&ShorelineAccess=0&Universal=0)
- [NCWRC Boating Access Area locator and terms](https://ncpaws.org/ncwrcmaps/boatingaccessareas)
- [Henderson County US 64 River Bend Access Park](https://henderson.recdesk.com/Community/Facility/Detail?facilityId=64)
