# Access point remediation batch 24

Reviewed September 17, 2026 using the [access-point remediation runbook](../../access-point-remediation-runbook.md). The remaining four eligible physical sites in the cache-only queue were reviewed; ranks are prioritization hints only.

## Result

Four access sites affecting five routes were checked against current agency and local-manager sources. Two official access-area controls were added for Fox River Landing Road and Haller Park. The existing Virginia DWR Route 710 and Eastern Park controls were confirmed. Route names and notes now make clear that bridge, road, and park coordinates are access-area anchors rather than exact water-entry points. No coordinates changed, no routes were withheld, and no records were deleted.

## Decisions

| Rank | Site | Decision |
|---:|---|---|
| 270 | Route 710 Alvarado bridge | retain DWR-named take-out crossing anchor; confirm lawful parking/carry and bank exit |
| 271 | Fox River Landing Road | retain DNR-named public access anchor; exact water-entry coordinate is not published |
| 274 | Haller Park | retain current City-documented public boat-launch area; confirm condition because reconstruction remains a potential improvement |
| 275 | Eastern Park Kayak Launch | retain City/Blueway public roller launch anchor; stored point is an area coordinate |

Ranks 272–273 were already source-reviewed in Batches 16 and 15, and rank 276 has no currently eligible route because all three routes are withheld. The queue ends at rank 276; no other new, eligible site remains in this cached audit.

## Validation limits

The selected sites and findings are recorded in [review.json](review.json) and [source-metadata.json](source-metadata.json). The last source controls are captured in [control-additions.json](control-additions.json). The generator completed with zero conflicts, but the generated registry still uses the separate authoritative-evidence artifact last generated September 5 and does not read source controls directly. The cache-only queue remains stale because `@paddletoday/geo` is missing; ranks are not current evidence. See [validation.json](validation.json) and [registry-control-snapshot.json](registry-control-snapshot.json).
