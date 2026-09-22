# Batch 69 — Highway 142 River Access / The Narrows

Reviewed 2026-09-18. The frozen candidate was suspicious on one of four shared public route occurrences because its stored coordinate, `36.550194, -91.191532`, sat about 308 feet from the matched Eleven Point River flowline and 218 feet from mapped water. The selected Cane Bluff-to-Narrows route also had incomplete NHD coverage because its route-network response exceeded the transfer limit.

The coordinate already matches Forest Service EDW Recreation Opportunities feature objectid 6729 / recarea 21706. The official site identifies an open, non-motorized boating access at The Narrows and describes the single-lane concrete ramp, paved parking, and vault toilet. MoDOT independently confirms this developed east-side public access and ramp; Missouri Department of Conservation also lists The Narrows (142) among lower-river accesses. No coordinate move was justified. Added the shared Forest Service point as an authoritative access-area control, changing the suspicious occurrence to review while keeping the exact water-edge point explicitly unverified.

All four targeted reports now classify the shared endpoint as review. Three have complete NHD coverage and no source issues; the Cane Bluff route still has two truncated NHD queries, so its network evidence remains incomplete. MoDOT also notes temporary access closures during planned construction; check current status before visiting.

Evidence: [Forest Service recreation GIS feature](https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer/0/query?objectIds=6729&outFields=*&returnGeometry=true&outSR=4326&f=pjson), [MoDOT Route 142 access project](https://www.modot.org/projects/route142oregon), and [Missouri Department of Conservation access guide](https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river). The targeted reports and full before/after audits are included in this folder.

See `selection.json`, `review.json`, and `source-metadata.json` for the frozen candidate, evidence, and remaining limits.

The refreshed public audit covers 2,750 routes and 6,058 endpoints: 55 suspicious, down from 56; 3,877 review, 2,048 okay, and 78 unknown. The full inventory covers 2,998 routes and 6,641 endpoints: 109 suspicious, down from 110; 51 failure and 89 unknown classifications remain. Cache-only source issues are unchanged at 271 public and 314 inventory. The access registry has 4,042 canonical entries, 1,201 repeated entries, zero conflicts, and 1,219 authoritative access matches.
