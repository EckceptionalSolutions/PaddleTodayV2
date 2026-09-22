# Batch 77: Keosauqua Boat Ramp

## Decision

Move the shared Keosauqua Boat Ramp point from `40.7291, -91.962` to Iowa DNR's published Keosauqua Ramp feature coordinate, `40.73062147, -91.95994375`. The official Recreation GIS identifies the feature as a Boat Ramp in Van Buren County (WA-535 / WT-535). Iowa DNR's Lower Des Moines River Water Trail guide and Villages of Van Buren independently identify the Keosauqua ramp as a public access near Hotel Manning.

The DNR coordinate is an access-area anchor, not a surveyed wet-toe point. The new point lies within 88 feet of mapped NHD waterbody and 369 feet from the named flowline, with complete hydrography coverage. Preserve the distinction in the data and tell paddlers to confirm the landing and carry at the site.

## Review steps

1. Froze the shared-coordinate candidate from the refreshed public suspicious queue before point-specific review. See `selection.json` and `audit-before-public-cache-only.json`.
2. Queried Iowa DNR Recreation MapServer layer 4, described as Paddling Access Sites. The Keosauqua Ramp feature is in Van Buren County, has type Boat Ramp, WA-535 / WT-535, and publishes `40.73062147, -91.95994375`.
3. Checked Iowa DNR's Lower Des Moines River Water Trail guide. It names the Keosauqua-to-Bentonsport reach as 8.6 miles beginning at the Keosauqua boat ramp near Hotel Manning, and identifies Austin Park to Keosauqua as a separate 5.8-mile reach.
4. Cross-checked the Villages of Van Buren water-trail page, which lists Keosauqua among the public river access points and places the boat ramp across from Hotel Manning.
5. Moved all route and trip-detail references for the shared site, registered the official public access anchor, regenerated both affected route geometry assets, and reran targeted and full cache-backed audits. Targeted results are in `audit-after-keosauqua-targeted.json` and `audit-after-austin-park-targeted.json`.

## Outcome and follow-up

Both route occurrences now match the named Iowa DNR access-area control and classify as review rather than suspicious. The coordinates are within 88 feet of mapped water; the remaining review status is appropriate because a boat-ramp GIS feature does not identify the exact wet edge. Both affected routes have complete hydrography coverage and no source issues after refresh.

The public suspicious count decreased from 48 to 47, and the full-inventory suspicious count decreased from 101 to 100. The public audit covers 2,750 routes / 6,058 endpoints: 2,046 okay, 3,890 review, 47 suspicious, and 75 unknown. The full inventory covers 2,998 routes / 6,641 endpoints: 2,210 okay, 4,194 review, 100 suspicious, 51 failures, and 86 unknown. Source issues remain 271 public and 314 inventory. The registry has 4,042 canonical entries, 1,201 repeated entries, no conflicts, and 1,226 authoritative access matches.

## Sources

- [Iowa DNR Recreation GIS layer 4: Paddling Access Sites](https://programs.iowadnr.gov/geospatial/rest/services/Recreation/Recreation/MapServer/4)
- [Iowa DNR Keosauqua Ramp feature query (WA-535)](https://programs.iowadnr.gov/geospatial/rest/services/Recreation/Recreation/MapServer/4/query?where=Name%20LIKE%20%27%25Keosauqua%25%27&outFields=Name%2CCounty%2Clat%2Clong%2CWA_id%2CWT_id%2CType&returnGeometry=true&outSR=4326&f=pjson)
- [Iowa DNR Lower Des Moines River Water Trail guide](https://www.iowadnr.gov/media/8889/download?inline=)
- [Villages of Van Buren Des Moines River Trail](https://villagesofvanburen.com/explore/des_moines_river_trail)
