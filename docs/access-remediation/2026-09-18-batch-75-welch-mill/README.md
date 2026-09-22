# Batch 75: Welch Mill on the Cannon River

## Decision

Keep `44.5679337, -92.7385579` as a conditional access-area anchor for Welch Mill, not as a surveyed water-entry coordinate or unrestricted public access. MN DNR says Welch has no formal/developed public water access. Welch Mill's current operator describes trips that start at its site, shuttle customers upstream, and return them to the mill. The coordinate agrees with the public map position for the Welch Mill business within about 16 feet and sits about 144 feet from mapped water, consistent with a business/access-area pin rather than a water-edge survey.

The Cannon Falls-to-Welch itinerary now clearly requires a current Welch Mill reservation or explicit permission, and confirmation of operating hours, landing, carry, parking, and fees. The point on the longer Byllesby-to-Highway 61 route is no longer described as a routine public bailout or emergency exit. No coordinate was moved because available evidence supports the named mill access area but does not establish a more precise wet-toe location.

## Review steps

1. Froze the shared-coordinate candidate from the public suspicious queue before researching this location. See `selection.json` and `audit-before-public-cache-only.json`.
2. Confirmed the access status in the MN DNR Cannon River segments page and virtual tour. Both distinguish the Welch area from formal public water accesses and direct paddlers toward outfitter service; the segments page also notes limited parking and the County Road 7 bridge drop-off option.
3. Checked the operator's current page. Welch Mill says its trips begin at the mill, it shuttles customers upstream, and customers paddle back to the mill; reservations are recommended.
4. Compared the stored coordinate with the public map point for the Welch Mill shop and checked the access against the frozen hydrography result. The map point and coordinate align closely, while the point lies near rather than directly on mapped water.
5. Preserved the coordinate as a conditional access-area anchor, revised route instructions to encode the permission/reservation requirement, then reran the two affected route audits. Results are in `audit-after-byllesby-targeted.json` and `audit-after-welch-targeted.json`.

## Outcome and follow-up

The suspicious Welch Mill intermediate access occurrence now classifies as review because the documented coordinate is an access-area anchor and access is conditional. The Welch Mill take-out occurrence also classifies as review for the same reason. The take-out on `cannon-river-welch` remains conditional and must not be presented as a public-access-to-public-access trip.

The targeted Welch route audit also exposes a separate suspicious Riverside Park put-in at `44.5148835, -92.8990298`. That is a different coordinate and remains unresolved in this batch; carry it forward as a separate public-launch review instead of treating the Welch Mill decision as having cleared it.

Across the full refreshed audits, the public suspicious count decreased from 50 to 49 and the full inventory count decreased from 103 to 102. The public audit has 2,750 routes and 6,058 endpoints: 2,047 okay, 3,887 review, 49 suspicious, and 75 unknown. The full inventory has 2,998 routes and 6,641 endpoints: 2,211 okay, 4,191 review, 102 suspicious, 51 failures, and 86 unknown. Source issues remain 271 public and 314 inventory. The registry now has 4,042 canonical entries, 1,201 repeated entries, no conflicts, and 1,225 authoritative access matches.

No source issue was reported by either targeted audit. Since the access coordinate was not moved, route geometry did not need regeneration. The full public and inventory audit snapshots and registry are refreshed after this batch.

## Sources

- [MN DNR Cannon River segments and maps](https://www.dnr.state.mn.us/state-water-trails/cannon-river/segments-maps.html)
- [MN DNR Cannon River State Water Trail virtual tour](https://www.dnr.state.mn.us/state-water-trails/virtual-tour/cannon-river/snapshot.html)
- [Welch Mill canoe and kayak service](https://www.welchmill.com/canoeing-kayaking)
- [Welch Mill mapped business point](https://mapcarta.com/N1411658044), based on OpenStreetMap node [1411658044](https://www.openstreetmap.org/node/1411658044)
